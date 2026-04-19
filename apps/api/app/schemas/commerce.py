from pydantic import BaseModel


class BillingProviderInfo(BaseModel):
    provider: str
    supports_upi: bool
    supports_gst: bool

