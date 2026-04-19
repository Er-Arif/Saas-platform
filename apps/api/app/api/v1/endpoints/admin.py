from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import require_admin_user
from app.models.catalog import Product, Service
from app.models.commerce import Invoice, Order, Payment, Subscription
from app.models.identity import Organization, User
from app.models.licensing import License
from app.models.platform import AuditLog, FeatureFlag, SystemSetting
from app.models.support import ContactRequest, DemoRequest, SalesInquiry, SupportTicket

router = APIRouter()


@router.get("/stats")
def stats(
    _: User = Depends(require_admin_user),
    db: Session = Depends(get_db),
) -> dict[str, int]:
    return {
        "customers": db.query(Organization).count(),
        "users": db.query(User).count(),
        "products": db.query(Product).count(),
        "services": db.query(Service).count(),
        "orders": db.query(Order).count(),
        "subscriptions": db.query(Subscription).count(),
        "invoices": db.query(Invoice).count(),
        "payments": db.query(Payment).count(),
        "licenses": db.query(License).count(),
        "tickets": db.query(SupportTicket).count(),
        "leads": db.query(ContactRequest).count() + db.query(SalesInquiry).count() + db.query(DemoRequest).count(),
        "feature_flags": db.query(FeatureFlag).count(),
        "settings": db.query(SystemSetting).count(),
        "audit_logs": db.query(AuditLog).count(),
    }
