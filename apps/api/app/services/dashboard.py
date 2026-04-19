from sqlalchemy.orm import Session

from app.models.commerce import Invoice, Subscription
from app.models.developer import ApiUsageSummary
from app.models.licensing import License
from app.models.support import SupportTicket


def get_portal_overview(db: Session, organization_id: str) -> dict[str, int]:
    return {
        "active_subscriptions": db.query(Subscription).filter(Subscription.organization_id == organization_id).count(),
        "licenses": db.query(License).filter(License.organization_id == organization_id).count(),
        "recent_invoices": db.query(Invoice).filter(Invoice.organization_id == organization_id).count(),
        "support_tickets": db.query(SupportTicket).filter(SupportTicket.organization_id == organization_id).count(),
        "api_usage_records": db.query(ApiUsageSummary).filter(ApiUsageSummary.organization_id == organization_id).count(),
    }

