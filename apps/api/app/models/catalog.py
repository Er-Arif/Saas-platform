import uuid

from sqlalchemy import Boolean, Enum, ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.models.base import TimestampMixin, UUIDPrimaryKeyMixin
from app.models.enums import (
    DeploymentType,
    PricingModel,
    ProductAccessModel,
    ProductStatus,
    ProductType,
    ServiceBillingModel,
    ServiceExposureType,
    ServiceStatus,
)


class ProductCategory(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "product_categories"

    slug: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)


class Product(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "products"

    category_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("product_categories.id", ondelete="SET NULL"))
    slug: Mapped[str] = mapped_column(String(160), unique=True, nullable=False, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    short_description: Mapped[str] = mapped_column(String(500), nullable=False)
    long_description: Mapped[str] = mapped_column(Text, nullable=False)
    type: Mapped[ProductType] = mapped_column(Enum(ProductType, name="product_type", native_enum=False), nullable=False)
    status: Mapped[ProductStatus] = mapped_column(
        Enum(ProductStatus, name="product_status", native_enum=False), nullable=False, default=ProductStatus.ACTIVE
    )
    pricing_model: Mapped[PricingModel] = mapped_column(
        Enum(PricingModel, name="pricing_model", native_enum=False), nullable=False
    )
    deployment_type: Mapped[DeploymentType] = mapped_column(
        Enum(DeploymentType, name="deployment_type", native_enum=False), nullable=False
    )
    access_model: Mapped[ProductAccessModel] = mapped_column(
        Enum(ProductAccessModel, name="product_access_model", native_enum=False), nullable=False
    )
    platform_compatibility: Mapped[list | None] = mapped_column(JSONB, nullable=True)
    documentation_link: Mapped[str | None] = mapped_column(String(255), nullable=True)
    support_model: Mapped[str | None] = mapped_column(String(120), nullable=True)
    versioning_enabled: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    licensing_enabled: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    download_enabled: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    enterprise_custom: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    featured: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    seo_title: Mapped[str | None] = mapped_column(String(255), nullable=True)
    seo_description: Mapped[str | None] = mapped_column(String(255), nullable=True)


class ProductMedia(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "product_media"

    product_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("products.id", ondelete="CASCADE"), nullable=False)
    media_type: Mapped[str] = mapped_column(String(50), nullable=False)
    url: Mapped[str] = mapped_column(String(500), nullable=False)
    alt_text: Mapped[str | None] = mapped_column(String(255), nullable=True)
    sort_order: Mapped[int] = mapped_column(default=0, nullable=False)


class ProductVersion(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "product_versions"

    product_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("products.id", ondelete="CASCADE"), nullable=False)
    version: Mapped[str] = mapped_column(String(50), nullable=False)
    release_notes: Mapped[str] = mapped_column(Text, nullable=False)
    system_requirements: Mapped[dict | None] = mapped_column(JSONB, nullable=True)
    is_latest: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    released_at: Mapped[str | None] = mapped_column(String(64), nullable=True)


class ProductFile(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "product_files"

    product_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("products.id", ondelete="CASCADE"), nullable=False)
    product_version_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("product_versions.id", ondelete="SET NULL"))
    filename: Mapped[str] = mapped_column(String(255), nullable=False)
    storage_key: Mapped[str] = mapped_column(String(500), nullable=False, unique=True)
    platform: Mapped[str | None] = mapped_column(String(64), nullable=True)
    checksum: Mapped[str | None] = mapped_column(String(128), nullable=True)
    file_size_bytes: Mapped[int | None] = mapped_column(nullable=True)
    is_private: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)


class ServiceCategory(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "service_categories"

    slug: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)


class Service(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "services"

    category_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("service_categories.id", ondelete="SET NULL"))
    slug: Mapped[str] = mapped_column(String(160), unique=True, nullable=False, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    short_description: Mapped[str] = mapped_column(String(500), nullable=False)
    long_description: Mapped[str] = mapped_column(Text, nullable=False)
    status: Mapped[ServiceStatus] = mapped_column(
        Enum(ServiceStatus, name="service_status", native_enum=False), nullable=False, default=ServiceStatus.ACTIVE
    )
    billing_model: Mapped[ServiceBillingModel] = mapped_column(
        Enum(ServiceBillingModel, name="service_billing_model", native_enum=False), nullable=False
    )
    public_base_url: Mapped[str | None] = mapped_column(String(255), nullable=True)
    docs_link: Mapped[str | None] = mapped_column(String(255), nullable=True)
    api_available: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    api_key_required: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    sandbox_support: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    rate_limit_policy: Mapped[dict | None] = mapped_column(JSONB, nullable=True)
    featured: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    service_exposure_type: Mapped[ServiceExposureType] = mapped_column(
        Enum(ServiceExposureType, name="service_exposure_type", native_enum=False), nullable=False
    )
    seo_title: Mapped[str | None] = mapped_column(String(255), nullable=True)
    seo_description: Mapped[str | None] = mapped_column(String(255), nullable=True)


class PricingPlan(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "pricing_plans"

    product_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("products.id", ondelete="CASCADE"), nullable=True)
    service_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("services.id", ondelete="CASCADE"), nullable=True)
    slug: Mapped[str] = mapped_column(String(160), unique=True, nullable=False)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    billing_interval: Mapped[str | None] = mapped_column(String(32), nullable=True)
    currency: Mapped[str] = mapped_column(String(8), default="INR", nullable=False)
    amount: Mapped[int] = mapped_column(nullable=False)
    usage_unit: Mapped[str | None] = mapped_column(String(64), nullable=True)
    is_public: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    metadata_json: Mapped[dict | None] = mapped_column(JSONB, nullable=True)

