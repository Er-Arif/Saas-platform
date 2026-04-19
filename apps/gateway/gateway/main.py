import uuid

from fastapi import FastAPI, Header, HTTPException

from gateway.config import get_gateway_settings

settings = get_gateway_settings()
app = FastAPI(title="Company Platform Gateway", version="0.1.0")


SERVICE_REGISTRY = {
    "auth": {
        "base_url": settings.auth_service_url,
        "rate_limit_per_minute": 600,
        "version_prefixes": ["v1"],
    }
}


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "gateway"}


@app.api_route("/v1/{service_slug}/{path:path}", methods=["GET", "POST", "PUT", "PATCH", "DELETE"])
def route_service(
    service_slug: str,
    path: str,
    x_api_key: str | None = Header(default=None),
) -> dict[str, object]:
    service = SERVICE_REGISTRY.get(service_slug)
    if service is None:
        raise HTTPException(status_code=404, detail="Unknown service")
    if not x_api_key:
        raise HTTPException(status_code=401, detail="Missing API key")
    request_id = str(uuid.uuid4())
    return {
        "request_id": request_id,
        "service_slug": service_slug,
        "target_url": f"{service['base_url']}/{path}",
        "versioning": service["version_prefixes"],
        "rate_limit_per_minute": service["rate_limit_per_minute"],
        "message": "Gateway starter resolved route. Replace this stub with signed upstream forwarding.",
    }

