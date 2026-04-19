import uuid

from time import perf_counter

from fastapi import FastAPI, Header, HTTPException, Request

from gateway.config import get_gateway_settings

settings = get_gateway_settings()
app = FastAPI(title="Company Platform Gateway", version="0.1.0")
REQUEST_LOGS: list[dict[str, object]] = []


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


@app.middleware("http")
async def request_logger(request: Request, call_next):
    started = perf_counter()
    response = await call_next(request)
    request_id = str(uuid.uuid4())
    duration_ms = round((perf_counter() - started) * 1000)
    response.headers["X-Request-Id"] = request_id
    REQUEST_LOGS.append(
        {
            "request_id": request_id,
            "path": request.url.path,
            "method": request.method,
            "status_code": response.status_code,
            "duration_ms": duration_ms,
        }
    )
    return response


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


@app.get("/logs")
def logs() -> dict[str, list[dict[str, object]]]:
    return {"items": REQUEST_LOGS[-50:]}
