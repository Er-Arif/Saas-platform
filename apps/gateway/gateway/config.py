from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class GatewaySettings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    gateway_url: str = Field(default="http://localhost:8100", alias="GATEWAY_URL")
    redis_url: str = Field(default="redis://localhost:6379/0", alias="REDIS_URL")
    auth_service_url: str = Field(default="https://auth.company.local", alias="AUTH_SERVICE_URL")
    api_url: str = Field(default="http://localhost:8000", alias="API_URL")


@lru_cache
def get_gateway_settings() -> GatewaySettings:
    return GatewaySettings()
