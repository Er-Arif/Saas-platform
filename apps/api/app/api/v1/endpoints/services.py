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

