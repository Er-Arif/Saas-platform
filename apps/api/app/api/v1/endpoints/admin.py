import hashlib
from pathlib import Path

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.core.database import get_db
from app.core.dependencies import require_admin_user
from app.models.catalog import PricingPlan, Product, ProductCategory, ProductFile, ProductVersion, Service
from app.models.commerce import Invoice, Order, Payment, Subscription
from app.models.identity import Organization, User
from app.models.licensing import License
from app.models.platform import AuditLog, FeatureFlag, SystemSetting
from app.schemas.admin_catalog import AdminProductRequest, AdminProductResponse, AdminReleaseResponse
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


@router.get("/products", response_model=list[AdminProductResponse])
def list_admin_products(
    _: User = Depends(require_admin_user),
    db: Session = Depends(get_db),
) -> list[AdminProductResponse]:
    products = db.query(Product).order_by(Product.created_at.desc()).all()
    return [
        AdminProductResponse(
            id=product.id,
            slug=product.slug,
            name=product.name,
            short_description=product.short_description,
            pricing_model=product.pricing_model.value,
            access_model=product.access_model.value,
            deployment_type=product.deployment_type.value,
            status=product.status.value,
            featured=product.featured,
        )
        for product in products
    ]


@router.post("/products", response_model=AdminProductResponse)
def create_product(
    payload: AdminProductRequest,
    _: User = Depends(require_admin_user),
    db: Session = Depends(get_db),
) -> AdminProductResponse:
    existing = db.query(Product).filter(Product.slug == payload.slug).first()
    if existing is not None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Product slug already exists")

    category_slug = payload.category_name.lower().replace(" ", "-")
    category = db.query(ProductCategory).filter(ProductCategory.slug == category_slug).first()
    if category is None:
        category = ProductCategory(slug=category_slug, name=payload.category_name)
        db.add(category)
        db.flush()

    product = Product(
        category_id=category.id,
        slug=payload.slug,
        name=payload.name,
        short_description=payload.short_description,
        long_description=payload.long_description,
        type=payload.type,
        status=payload.status,
        pricing_model=payload.pricing_model,
        deployment_type=payload.deployment_type,
        access_model=payload.access_model,
        support_model=payload.support_model,
        documentation_link=payload.documentation_link,
        platform_compatibility=payload.platform_compatibility,
        featured=payload.featured,
        enterprise_custom=payload.enterprise_custom,
        versioning_enabled=True,
        licensing_enabled=payload.access_model.value in {"license_based", "hybrid"},
        download_enabled=payload.deployment_type.value == "downloadable",
    )
    db.add(product)
    db.flush()

    if payload.pricing_model.value in {"monthly_subscription", "yearly_subscription"}:
        amount = 149900 if payload.pricing_model.value == "monthly_subscription" else 1499000
        plan = PricingPlan(
            product_id=product.id,
            slug=f"{payload.slug}-default",
            name=f"{payload.name} Default",
            billing_interval="monthly" if payload.pricing_model.value == "monthly_subscription" else "yearly",
            currency="INR",
            amount=amount,
            is_public=True,
        )
        db.add(plan)

    db.commit()
    return AdminProductResponse(
        id=product.id,
        slug=product.slug,
        name=product.name,
        short_description=product.short_description,
        pricing_model=product.pricing_model.value,
        access_model=product.access_model.value,
        deployment_type=product.deployment_type.value,
        status=product.status.value,
        featured=product.featured,
    )


@router.post("/products/{product_id}/releases", response_model=AdminReleaseResponse)
async def create_release(
    product_id: str,
    version: str = Form(...),
    release_notes: str = Form(...),
    platform: str = Form(...),
    is_latest: bool = Form(True),
    installer: UploadFile = File(...),
    _: User = Depends(require_admin_user),
    db: Session = Depends(get_db),
) -> AdminReleaseResponse:
    settings = get_settings()
    product = db.get(Product, product_id)
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")

    version_row = ProductVersion(
        product_id=product.id,
        version=version,
        release_notes=release_notes,
        system_requirements={"platform": platform},
        is_latest=is_latest,
        released_at=str(product.updated_at),
    )
    if is_latest:
        db.query(ProductVersion).filter(ProductVersion.product_id == product.id).update({"is_latest": False})
    db.add(version_row)
    db.flush()

    contents = await installer.read()
    checksum = hashlib.sha256(contents).hexdigest()
    relative_key = Path("products") / product.slug / version / installer.filename
    output_path = Path(settings.private_storage_path) / relative_key
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_bytes(contents)

    file_row = ProductFile(
        product_id=product.id,
        product_version_id=version_row.id,
        filename=installer.filename,
        storage_key=str(relative_key).replace("\\", "/"),
        platform=platform,
        checksum=f"sha256:{checksum}",
        file_size_bytes=len(contents),
        is_private=True,
    )
    db.add(file_row)
    db.commit()
    return AdminReleaseResponse(
        version_id=version_row.id,
        file_id=file_row.id,
        version=version_row.version,
        filename=file_row.filename,
        checksum=file_row.checksum or "",
        file_size_bytes=file_row.file_size_bytes or 0,
    )
