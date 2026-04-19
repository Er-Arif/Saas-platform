import uuid

from pydantic import BaseModel, Field

from app.models.enums import DeploymentType, PricingModel, ProductAccessModel, ProductStatus, ProductType


class AdminProductRequest(BaseModel):
    name: str = Field(min_length=2, max_length=255)
    slug: str = Field(min_length=2, max_length=160)
    short_description: str = Field(min_length=10, max_length=500)
    long_description: str = Field(min_length=20)
    category_name: str = Field(min_length=2, max_length=255)
    type: ProductType
    pricing_model: PricingModel
    deployment_type: DeploymentType
    access_model: ProductAccessModel
    support_model: str | None = Field(default=None, max_length=120)
    documentation_link: str | None = Field(default=None, max_length=255)
    platform_compatibility: list[str] = Field(default_factory=list)
    featured: bool = False
    enterprise_custom: bool = False
    status: ProductStatus = ProductStatus.ACTIVE


class AdminProductResponse(BaseModel):
    id: uuid.UUID
    slug: str
    name: str
    short_description: str
    pricing_model: str
    access_model: str
    deployment_type: str
    status: str
    featured: bool


class AdminReleaseResponse(BaseModel):
    version_id: uuid.UUID
    file_id: uuid.UUID
    version: str
    filename: str
    checksum: str
    file_size_bytes: int
