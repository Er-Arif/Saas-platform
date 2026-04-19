from pydantic import BaseModel, Field


class ProductClientContextRequest(BaseModel):
    license_key: str = Field(min_length=8, max_length=120)
    machine_fingerprint: str = Field(min_length=8, max_length=255)
    machine_name: str | None = Field(default=None, max_length=255)
    platform: str | None = Field(default=None, max_length=64)
    current_version: str | None = Field(default=None, max_length=50)


class LicenseActivationResponse(BaseModel):
    product_slug: str
    product_name: str
    license_key: str
    license_status: str
    activation_granted: bool
    already_active: bool
    machine_binding_required: bool
    activations_used: int
    activations_allowed: int
    expires_at: str | None = None
    latest_version: str | None = None
    message: str


class LicenseVerificationResponse(BaseModel):
    product_slug: str
    product_name: str
    valid: bool
    license_status: str
    activation_required: bool
    activations_used: int
    activations_allowed: int
    expires_at: str | None = None
    current_version: str | None = None
    latest_version: str | None = None
    update_available: bool = False
    download_enabled: bool = False
    message: str


class ProductUpdateResponse(BaseModel):
    product_slug: str
    product_name: str
    current_version: str | None = None
    latest_version: str | None = None
    update_available: bool
    release_notes: str | None = None
    checksum: str | None = None
    platform: str | None = None
    download_url: str | None = None
    file_name: str | None = None
    file_size_bytes: int | None = None
    message: str
