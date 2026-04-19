from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import require_organization_membership
from app.models.identity import OrganizationMembership
from app.models.support import SupportMessage, SupportTicket

router = APIRouter()


@router.get("/tickets")
def tickets(
    membership: OrganizationMembership = Depends(require_organization_membership),
    db: Session = Depends(get_db),
) -> list[dict[str, object]]:
    rows = db.query(SupportTicket).filter(SupportTicket.organization_id == membership.organization_id).all()
    return [
        {
            "id": str(ticket.id),
            "subject": ticket.subject,
            "status": ticket.status.value,
            "priority": ticket.priority.value,
        }
        for ticket in rows
    ]


@router.get("/messages/count")
def message_count(db: Session = Depends(get_db)) -> dict[str, int]:
    return {"count": db.query(SupportMessage).count()}

