from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    api_env: str = Field(default="development", alias="API_ENV")
    api_debug: bool = Field(default=True, alias="API_DEBUG")
    api_host: str = Field(default="0.0.0.0", alias="API_HOST")
    api_port: int = Field(default=8000, alias="API_PORT")
    secret_key: str = Field(alias="API_SECRET_KEY")
    access_token_ttl_minutes: int = Field(default=15, alias="API_ACCESS_TOKEN_TTL_MINUTES")
    refresh_token_ttl_days: int = Field(default=30, alias="API_REFRESH_TOKEN_TTL_DAYS")
    database_url: str = Field(alias="DATABASE_URL")
    redis_url: str = Field(alias="REDIS_URL")
    private_storage_path: str = Field(alias="PRIVATE_STORAGE_PATH")
    public_storage_path: str = Field(alias="PUBLIC_STORAGE_PATH")
    signed_url_secret: str = Field(alias="SIGNED_URL_SECRET")
    allowed_origins_raw: str = Field(default="", alias="API_ALLOWED_ORIGINS")
    root_domain: str = Field(default="company.local", alias="ROOT_DOMAIN")
    razorpay_key_id: str = Field(default="", alias="RAZORPAY_KEY_ID")
    razorpay_key_secret: str = Field(default="", alias="RAZORPAY_KEY_SECRET")
    cashfree_client_id: str = Field(default="", alias="CASHFREE_CLIENT_ID")
    cashfree_client_secret: str = Field(default="", alias="CASHFREE_CLIENT_SECRET")
    gst_default_country: str = Field(default="IN", alias="GST_DEFAULT_COUNTRY")
    gst_default_currency: str = Field(default="INR", alias="GST_DEFAULT_CURRENCY")

    @property
    def allowed_origins(self) -> list[str]:
        return [origin.strip() for origin in self.allowed_origins_raw.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()

