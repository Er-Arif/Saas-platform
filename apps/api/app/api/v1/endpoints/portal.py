from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import require_organization_membership
from app.models.catalog import Product, ProductFile, ProductVersion
from app.models.commerce import Invoice, Subscription
from app.models.developer import ApiClient, ApiUsageSummary, OrganizationServiceAccount
from app.models.identity import OrganizationMembership
from app.models.licensing import License
from app.models.support import SupportTicket
from app.services.dashboard import get_portal_overview
from app.services.product_distribution import create_download_token

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
    licenses = db.query(License).filter(License.organization_id == membership.organization_id).all()
    product_ids = [license.product_id for license in licenses]
    license_by_product = {license.product_id: license for license in licenses}
    files = (
        db.query(ProductFile, ProductVersion, Product)
        .join(Product, Product.id == ProductFile.product_id)
        .outerjoin(ProductVersion, ProductVersion.id == ProductFile.product_version_id)
        .filter(ProductFile.product_id.in_(product_ids))
        .order_by(ProductFile.created_at.desc())
        .all()
    )
    return {
        "items": [
            {
                "product_name": product.name,
                "filename": file.filename,
                "platform": file.platform,
                "version": version.version if version else None,
                "checksum": file.checksum,
                "download_url": (
                    f"/api/v1/product-client/downloads/{file.id}?token={create_download_token(file.id, license_by_product[product.id].id, 'portal-download')}"
                    if product.id in license_by_product
                    else None
                ),
            }
            for file, version, product in files
        ]
    }


@router.get("/products")
def products(
    membership: OrganizationMembership = Depends(require_organization_membership),
    db: Session = Depends(get_db),
) -> list[dict[str, str | int | None]]:
    rows = (
        db.query(License, Product)
        .join(Product, Product.id == License.product_id)
        .filter(License.organization_id == membership.organization_id)
        .all()
    )
    return [
        {
            "product_id": str(product.id),
            "product_name": product.name,
            "product_slug": product.slug,
            "license_key": license_row.license_key,
            "license_status": license_row.status.value,
            "max_activations": license_row.max_activations,
            "activation_count": license_row.activation_count,
            "expires_at": license_row.expires_at,
        }
        for license_row, product in rows
    ]


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

