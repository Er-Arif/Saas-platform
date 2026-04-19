import uuid

from sqlalchemy import Boolean, Enum, ForeignKey, String
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.models.base import TimestampMixin, UUIDPrimaryKeyMixin
from app.models.enums import LicenseStatus


class License(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "licenses"

    organization_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    product_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("products.id", ondelete="CASCADE"), nullable=False)
    order_item_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("order_items.id", ondelete="SET NULL"), nullable=True)
    license_key: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    status: Mapped[LicenseStatus] = mapped_column(
        Enum(LicenseStatus, name="license_status", native_enum=False), nullable=False
    )
    max_activations: Mapped[int] = mapped_column(default=1, nullable=False)
    activation_count: Mapped[int] = mapped_column(default=0, nullable=False)
    expires_at: Mapped[str | None] = mapped_column(String(64), nullable=True)
    machine_binding_required: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    metadata_json: Mapped[dict | None] = mapped_column(JSONB, nullable=True)


class ActivationDevice(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "activation_devices"

    organization_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    fingerprint: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    machine_name: Mapped[str | None] = mapped_column(String(255), nullable=True)
    platform: Mapped[str | None] = mapped_column(String(64), nullable=True)
    metadata_json: Mapped[dict | None] = mapped_column(JSONB, nullable=True)


class LicenseActivation(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "license_activations"

    license_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("licenses.id", ondelete="CASCADE"), nullable=False)
    activation_device_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("activation_devices.id", ondelete="CASCADE"), nullable=False
    )
    activated_at: Mapped[str] = mapped_column(String(64), nullable=False)
    deactivated_at: Mapped[str | None] = mapped_column(String(64), nullable=True)
    status: Mapped[str] = mapped_column(String(32), nullable=False, default="active")


class LicenseEvent(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "license_events"

    license_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("licenses.id", ondelete="CASCADE"), nullable=False)
    actor_user_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    event_type: Mapped[str] = mapped_column(String(64), nullable=False)
    detail: Mapped[dict | None] = mapped_column(JSONB, nullable=True)

