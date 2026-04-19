import uuid

from pydantic import BaseModel


class ProductSummaryResponse(BaseModel):
    id: uuid.UUID
    slug: str
    name: str
    short_description: str
    access_model: str
    pricing_model: str


class ProductVersionResponse(BaseModel):
    id: uuid.UUID
    version: str
    release_notes: str
    is_latest: bool
    released_at: str | None = None


class ProductFileResponse(BaseModel):
    id: uuid.UUID
    filename: str
    platform: str | None = None
    checksum: str | None = None
    file_size_bytes: int | None = None


class PricingPlanResponse(BaseModel):
    id: uuid.UUID
    slug: str
    name: str
    billing_interval: str | None = None
    currency: str
    amount: int


class ProductDetailResponse(BaseModel):
    id: uuid.UUID
    slug: str
    name: str
    short_description: str
    long_description: str
    category: str | None = None
    access_model: str
    pricing_model: str
    deployment_type: str
    platform_compatibility: list[str]
    support_model: str | None = None
    documentation_link: str | None = None
    featured: bool
    versions: list[ProductVersionResponse]
    files: list[ProductFileResponse]
    plans: list[PricingPlanResponse]


class ServiceSummaryResponse(BaseModel):
    id: uuid.UUID
    slug: str
    name: str
    short_description: str
    billing_model: str
    service_exposure_type: str

