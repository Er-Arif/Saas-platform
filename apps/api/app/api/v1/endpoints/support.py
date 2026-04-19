from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import require_organization_membership
from app.models.identity import OrganizationMembership
from app.models.enums import LeadStatus, SupportTicketPriority, SupportTicketStatus
from app.models.support import ContactRequest, DemoRequest, SupportMessage, SupportTicket
from app.schemas.common import MessageResponse
from app.schemas.support import ContactRequestCreate, DemoRequestCreate, SupportTicketCreate

router = APIRouter()


@router.post("/contact-requests", response_model=MessageResponse)
def create_contact_request(payload: ContactRequestCreate, db: Session = Depends(get_db)) -> MessageResponse:
    db.add(
        ContactRequest(
            name=payload.name,
            email=payload.email,
            company_name=payload.company_name,
            message=payload.message,
            status=LeadStatus.NEW,
        )
    )
    db.commit()
    return MessageResponse(message="Contact request submitted")


@router.post("/demo-requests", response_model=MessageResponse)
def create_demo_request(payload: DemoRequestCreate, db: Session = Depends(get_db)) -> MessageResponse:
    db.add(
        DemoRequest(
            product_id=payload.product_id,
            name=payload.name,
            email=payload.email,
            company_name=payload.company_name,
            preferred_date=payload.preferred_date,
            notes=payload.notes,
            status=LeadStatus.NEW,
        )
    )
    db.commit()
    return MessageResponse(message="Demo request submitted")


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


@router.post("/tickets", response_model=MessageResponse)
def create_ticket(
    payload: SupportTicketCreate,
    membership: OrganizationMembership = Depends(require_organization_membership),
    db: Session = Depends(get_db),
) -> MessageResponse:
    try:
        priority = SupportTicketPriority(payload.priority)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid ticket priority") from exc

    ticket = SupportTicket(
        organization_id=membership.organization_id,
        requester_user_id=membership.user_id,
        product_id=payload.product_id,
        subject=payload.subject,
        category=payload.category,
        priority=priority,
        status=SupportTicketStatus.OPEN,
    )
    db.add(ticket)
    db.flush()
    db.add(
        SupportMessage(
            support_ticket_id=ticket.id,
            sender_user_id=membership.user_id,
            is_internal_note=False,
            message=payload.message,
        )
    )
    db.commit()
    return MessageResponse(message="Support ticket created")


@router.get("/messages/count")
def message_count(db: Session = Depends(get_db)) -> dict[str, int]:
    return {"count": db.query(SupportMessage).count()}

