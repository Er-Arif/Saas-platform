from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import require_organization_membership
from app.models.catalog import ProductFile, ProductVersion
from app.models.commerce import Invoice, Subscription
from app.models.developer import ApiClient, ApiUsageSummary, OrganizationServiceAccount
from app.models.identity import OrganizationMembership
from app.models.licensing import License
from app.models.support import SupportTicket
from app.services.dashboard import get_portal_overview

router = APIRouter()


@router.get("/overview")
def overview(
    membership: OrganizationMembership = Depends(require_organization_membership),
    db: Session = Depends(get_db),
) -> dict[str, object]:
    organization_id = str(membership.organization_id)
    return {
        "summary": get_portal_overview(db, organization_id),
        "organization_id": organization_id,
    }


@router.get("/downloads")
def downloads(
    membership: OrganizationMembership = Depends(require_organization_membership),
    db: Session = Depends(get_db),
) -> dict[str, list[dict[str, str | None]]]:
    files = (
        db.query(ProductFile, ProductVersion)
        .outerjoin(ProductVersion, ProductVersion.id == ProductFile.product_version_id)
        .limit(20)
        .all()
    )
    return {
        "items": [
            {
                "filename": file.filename,
                "platform": file.platform,
                "version": version.version if version else None,
                "checksum": file.checksum,
            }
            for file, version in files
        ]
    }


@router.get("/billing")
def billing(
    membership: OrganizationMembership = Depends(require_organization_membership),
    db: Session = Depends(get_db),
) -> dict[str, list[dict[str, str]]]:
    invoices = db.query(Invoice).filter(Invoice.organization_id == membership.organization_id).all()
    subscriptions = db.query(Subscription).filter(Subscription.organization_id == membership.organization_id).all()
    return {
        "invoices": [{"invoice_number": invoice.invoice_number, "status": invoice.status.value} for invoice in invoices],
        "subscriptions": [{"id": str(subscription.id), "status": subscription.status.value} for subscription in subscriptions],
    }


@router.get("/licenses")
def licenses(
    membership: OrganizationMembership = Depends(require_organization_membership),
    db: Session = Depends(get_db),
) -> list[dict[str, str | int | None]]:
    rows = db.query(License).filter(License.organization_id == membership.organization_id).all()
    return [
        {
            "license_key": item.license_key,
            "status": item.status.value,
            "max_activations": item.max_activations,
            "expires_at": item.expires_at,
        }
        for item in rows
    ]


@router.get("/services")
def service_access(
    membership: OrganizationMembership = Depends(require_organization_membership),
    db: Session = Depends(get_db),
) -> dict[str, list[dict[str, str | int | None]]]:
    accounts = (
        db.query(OrganizationServiceAccount)
        .filter(OrganizationServiceAccount.organization_id == membership.organization_id)
        .all()
    )
    usage = db.query(ApiUsageSummary).filter(ApiUsageSummary.organization_id == membership.organization_id).all()
    clients = db.query(ApiClient).filter(ApiClient.organization_id == membership.organization_id).all()
    tickets = db.query(SupportTicket).filter(SupportTicket.organization_id == membership.organization_id).all()
    return {
        "service_accounts": [
            {
                "service_id": str(account.service_id),
                "environment": account.environment.value,
                "tenant_reference": account.customer_tenant_reference,
                "status": account.status,
            }
            for account in accounts
        ],
        "usage": [
            {
                "service_id": str(record.service_id),
                "period": record.period,
                "request_count": record.request_count,
                "quota_limit": record.quota_limit,
            }
            for record in usage
        ],
        "api_clients": [
            {
                "id": str(client.id),
                "name": client.name,
                "environment": client.environment.value,
            }
            for client in clients
        ],
        "support_ticket_count": len(tickets),
    }

