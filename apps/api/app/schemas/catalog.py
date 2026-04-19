import uuid

from pydantic import BaseModel


class ProductSummaryResponse(BaseModel):
    id: uuid.UUID
    slug: str
    name: str
    short_description: str
    access_model: str
    pricing_model: str


class ServiceSummaryResponse(BaseModel):
    id: uuid.UUID
    slug: str
    name: str
    short_description: str
    billing_model: str
    service_exposure_type: str

