from __future__ import annotations

import base64
import hashlib
import hmac
import json
import uuid
from dataclasses import dataclass
from datetime import UTC, datetime, timedelta
from pathlib import Path

from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.models.catalog import Product, ProductFile, ProductVersion
from app.models.licensing import ActivationDevice, License, LicenseActivation, LicenseEvent


@dataclass
class ProductDistributionContext:
    product: Product
    license: License
    latest_version: ProductVersion | None
    latest_file: ProductFile | None
    activation: LicenseActivation | None


def normalize_version(value: str | None) -> tuple[int | str, ...]:
    if not value:
        return tuple()
    normalized = value.replace("-", ".").replace("_", ".")
    parts: list[int | str] = []
    for piece in normalized.split("."):
        if not piece:
            continue
        if piece.isdigit():
            parts.append(int(piece))
        else:
            parts.append(piece.lower())
    return tuple(parts)


def is_version_newer(current_version: str | None, latest_version: str | None) -> bool:
    if not latest_version:
        return False
    if not current_version:
        return True
    return normalize_version(latest_version) > normalize_version(current_version)


def create_download_token(file_id: uuid.UUID, license_id: uuid.UUID, machine_fingerprint: str, ttl_minutes: int = 10) -> str:
    settings = get_settings()
    payload = {
        "file_id": str(file_id),
        "license_id": str(license_id),
        "machine_fingerprint": machine_fingerprint,
        "exp": int((datetime.now(UTC) + timedelta(minutes=ttl_minutes)).timestamp()),
    }
    serialized = json.dumps(payload, sort_keys=True, separators=(",", ":")).encode("utf-8")
    body = base64.urlsafe_b64encode(serialized).decode("utf-8").rstrip("=")
    signature = hmac.new(settings.signed_url_secret.encode("utf-8"), body.encode("utf-8"), hashlib.sha256).hexdigest()
    return f"{body}.{signature}"


def parse_download_token(token: str) -> dict[str, str | int]:
    settings = get_settings()
    try:
        body, signature = token.split(".", 1)
    except ValueError as exc:
        raise ValueError("Malformed download token.") from exc
    expected_signature = hmac.new(
        settings.signed_url_secret.encode("utf-8"),
        body.encode("utf-8"),
        hashlib.sha256,
    ).hexdigest()
    if not hmac.compare_digest(signature, expected_signature):
        raise ValueError("Invalid download token signature.")
    padded = body + "=" * (-len(body) % 4)
    payload = json.loads(base64.urlsafe_b64decode(padded.encode("utf-8")).decode("utf-8"))
    if int(payload["exp"]) < int(datetime.now(UTC).timestamp()):
        raise ValueError("Download token has expired.")
    return payload


def resolve_storage_path(storage_key: str) -> Path:
    settings = get_settings()
    return Path(settings.private_storage_path) / storage_key


def get_distribution_context(db: Session, product_slug: str, license_key: str) -> ProductDistributionContext | None:
    product = db.query(Product).filter(Product.slug == product_slug).first()
    if product is None:
        return None

    license_row = (
        db.query(License)
        .filter(License.product_id == product.id, License.license_key == license_key)
        .first()
    )
    if license_row is None:
        return None

    latest_version = (
        db.query(ProductVersion)
        .filter(ProductVersion.product_id == product.id)
        .order_by(ProductVersion.is_latest.desc(), ProductVersion.created_at.desc())
        .first()
    )
    latest_file = None
    if latest_version is not None:
        latest_file = (
            db.query(ProductFile)
            .filter(ProductFile.product_id == product.id, ProductFile.product_version_id == latest_version.id)
            .order_by(ProductFile.created_at.desc())
            .first()
        )
    return ProductDistributionContext(
        product=product,
        license=license_row,
        latest_version=latest_version,
        latest_file=latest_file,
        activation=None,
    )


def ensure_activation(
    db: Session,
    context: ProductDistributionContext,
    machine_fingerprint: str,
    machine_name: str | None,
    platform: str | None,
) -> tuple[LicenseActivation | None, bool]:
    device = db.query(ActivationDevice).filter(ActivationDevice.fingerprint == machine_fingerprint).first()
    if device is None:
        device = ActivationDevice(
            organization_id=context.license.organization_id,
            fingerprint=machine_fingerprint,
            machine_name=machine_name,
            platform=platform,
        )
        db.add(device)
        db.flush()

    activation = (
        db.query(LicenseActivation)
        .filter(
            LicenseActivation.license_id == context.license.id,
            LicenseActivation.activation_device_id == device.id,
            LicenseActivation.status == "active",
        )
        .first()
    )
    if activation is not None:
        context.activation = activation
        return activation, True

    if context.license.activation_count >= context.license.max_activations:
        return None, False

    activation = LicenseActivation(
        license_id=context.license.id,
        activation_device_id=device.id,
        activated_at=datetime.now(UTC).isoformat(),
        status="active",
    )
    context.license.activation_count += 1
    db.add(activation)
    db.add(
        LicenseEvent(
            license_id=context.license.id,
            actor_user_id=None,
            event_type="client_activation",
            detail={"machine_fingerprint": machine_fingerprint, "machine_name": machine_name, "platform": platform},
        )
    )
    db.flush()
    context.activation = activation
    return activation, False


def verify_machine_binding(db: Session, context: ProductDistributionContext, machine_fingerprint: str) -> bool:
    if not context.license.machine_binding_required:
        return True

    activation = (
        db.query(LicenseActivation)
        .join(ActivationDevice, ActivationDevice.id == LicenseActivation.activation_device_id)
        .filter(
            LicenseActivation.license_id == context.license.id,
            LicenseActivation.status == "active",
            ActivationDevice.fingerprint == machine_fingerprint,
        )
        .first()
    )
    context.activation = activation
    return activation is not None
