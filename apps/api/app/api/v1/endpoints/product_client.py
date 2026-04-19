from __future__ import annotations

import uuid

from fastapi import APIRouter, HTTPException, Query, status
from fastapi.responses import FileResponse

from app.core.database import SessionLocal
from app.models.catalog import ProductFile
from app.models.enums import LicenseStatus
from app.schemas.product_client import (
    LicenseActivationResponse,
    LicenseVerificationResponse,
    ProductClientContextRequest,
    ProductUpdateResponse,
)
from app.services.product_distribution import (
    create_download_token,
    ensure_activation,
    get_distribution_context,
    is_version_newer,
    parse_download_token,
    resolve_storage_path,
    verify_machine_binding,
)

router = APIRouter()


@router.post("/products/{product_slug}/license/activate", response_model=LicenseActivationResponse)
def activate_product_license(product_slug: str, payload: ProductClientContextRequest) -> LicenseActivationResponse:
    db = SessionLocal()
    try:
        context = get_distribution_context(db, product_slug, payload.license_key)
        if context is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="License or product not found")
        if context.license.status != LicenseStatus.ACTIVE:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="License is not active")

        activation, already_active = ensure_activation(
            db,
            context,
            machine_fingerprint=payload.machine_fingerprint,
            machine_name=payload.machine_name,
            platform=payload.platform,
        )
        if activation is None and not already_active:
            db.rollback()
            return LicenseActivationResponse(
                product_slug=context.product.slug,
                product_name=context.product.name,
                license_key=context.license.license_key,
                license_status=context.license.status.value,
                activation_granted=False,
                already_active=False,
                machine_binding_required=context.license.machine_binding_required,
                activations_used=context.license.activation_count,
                activations_allowed=context.license.max_activations,
                expires_at=context.license.expires_at,
                latest_version=context.latest_version.version if context.latest_version else None,
                message="Activation limit reached for this license.",
            )

        db.commit()
        db.refresh(context.license)
        return LicenseActivationResponse(
            product_slug=context.product.slug,
            product_name=context.product.name,
            license_key=context.license.license_key,
            license_status=context.license.status.value,
            activation_granted=True,
            already_active=already_active,
            machine_binding_required=context.license.machine_binding_required,
            activations_used=context.license.activation_count,
            activations_allowed=context.license.max_activations,
            expires_at=context.license.expires_at,
            latest_version=context.latest_version.version if context.latest_version else None,
            message="License activation confirmed." if not already_active else "Machine already activated.",
        )
    finally:
        db.close()


@router.post("/products/{product_slug}/license/verify", response_model=LicenseVerificationResponse)
def verify_product_license(product_slug: str, payload: ProductClientContextRequest) -> LicenseVerificationResponse:
    db = SessionLocal()
    try:
        context = get_distribution_context(db, product_slug, payload.license_key)
        if context is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="License or product not found")

        machine_valid = verify_machine_binding(db, context, payload.machine_fingerprint)
        valid = context.license.status == LicenseStatus.ACTIVE and machine_valid
        return LicenseVerificationResponse(
            product_slug=context.product.slug,
            product_name=context.product.name,
            valid=valid,
            license_status=context.license.status.value,
            activation_required=context.license.machine_binding_required and not machine_valid,
            activations_used=context.license.activation_count,
            activations_allowed=context.license.max_activations,
            expires_at=context.license.expires_at,
            current_version=payload.current_version,
            latest_version=context.latest_version.version if context.latest_version else None,
            update_available=is_version_newer(payload.current_version, context.latest_version.version if context.latest_version else None),
            download_enabled=bool(context.product.download_enabled and context.latest_file),
            message="License verified." if valid else "Activation required for this device.",
        )
    finally:
        db.close()


@router.post("/products/{product_slug}/updates/check", response_model=ProductUpdateResponse)
def check_product_updates(product_slug: str, payload: ProductClientContextRequest) -> ProductUpdateResponse:
    db = SessionLocal()
    try:
        context = get_distribution_context(db, product_slug, payload.license_key)
        if context is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="License or product not found")
        if context.license.status != LicenseStatus.ACTIVE:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="License is not active")
        if not verify_machine_binding(db, context, payload.machine_fingerprint):
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Device activation required")

        latest_version = context.latest_version.version if context.latest_version else None
        update_available = is_version_newer(payload.current_version, latest_version)
        download_url = None
        if update_available and context.latest_file is not None:
            token = create_download_token(context.latest_file.id, context.license.id, payload.machine_fingerprint)
            download_url = f"/api/v1/product-client/downloads/{context.latest_file.id}?token={token}"

        return ProductUpdateResponse(
            product_slug=context.product.slug,
            product_name=context.product.name,
            current_version=payload.current_version,
            latest_version=latest_version,
            update_available=update_available,
            release_notes=context.latest_version.release_notes if context.latest_version else None,
            checksum=context.latest_file.checksum if context.latest_file else None,
            platform=context.latest_file.platform if context.latest_file else payload.platform,
            download_url=download_url,
            file_name=context.latest_file.filename if context.latest_file else None,
            file_size_bytes=context.latest_file.file_size_bytes if context.latest_file else None,
            message="Update available." if update_available else "You already have the latest release.",
        )
    finally:
        db.close()


@router.get("/downloads/{file_id}")
def download_product_file(file_id: uuid.UUID, token: str = Query(..., min_length=16)) -> FileResponse:
    payload = parse_download_token(token)
    if payload["file_id"] != str(file_id):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Download token does not match file")

    db = SessionLocal()
    try:
        product_file = db.get(ProductFile, file_id)
        if product_file is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product file not found")
        path = resolve_storage_path(product_file.storage_key)
        if not path.exists():
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="File is not available in storage")
        return FileResponse(path=path, filename=product_file.filename, media_type="application/octet-stream")
    finally:
        db.close()
