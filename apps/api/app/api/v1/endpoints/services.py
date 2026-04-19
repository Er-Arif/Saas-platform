from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.developer import ApiRequestLog, WebhookEndpoint

router = APIRouter()


@router.get("/gateway-readiness")
def gateway_readiness(db: Session = Depends(get_db)) -> dict[str, int]:
    return {
        "registered_webhooks": db.query(WebhookEndpoint).count(),
        "logged_requests": db.query(ApiRequestLog).count(),
    }


@router.get("/api-key-environments")
def api_key_environments() -> dict[str, list[str]]:
    return {"environments": ["test", "live"]}


@router.get("/tenant-mapping")
def tenant_mapping() -> dict[str, str]:
    return {
        "customer_tenant_reference": "Maps platform organizations to independently managed service-side tenants."
    }
