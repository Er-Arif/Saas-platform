from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.catalog import PricingPlan, Product, ProductCategory, ProductFile, ProductVersion, Service
from app.schemas.catalog import ProductDetailResponse

router = APIRouter()


@router.get("/products")
def list_products(db: Session = Depends(get_db)) -> list[dict[str, str]]:
    products = db.query(Product).order_by(Product.featured.desc(), Product.name.asc()).all()
    return [
        {
            "id": str(product.id),
            "slug": product.slug,
            "name": product.name,
            "short_description": product.short_description,
            "access_model": product.access_model.value,
            "pricing_model": product.pricing_model.value,
        }
        for product in products
    ]


@router.get("/products/{slug}", response_model=ProductDetailResponse)
def get_product(slug: str, db: Session = Depends(get_db)) -> ProductDetailResponse:
    product = db.query(Product).filter(Product.slug == slug).first()
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")

    category = db.get(ProductCategory, product.category_id) if product.category_id else None
    versions = (
        db.query(ProductVersion)
        .filter(ProductVersion.product_id == product.id)
        .order_by(ProductVersion.is_latest.desc(), ProductVersion.created_at.desc())
        .all()
    )
    files = (
        db.query(ProductFile)
        .filter(ProductFile.product_id == product.id)
        .order_by(ProductFile.created_at.desc())
        .all()
    )
    plans = (
        db.query(PricingPlan)
        .filter(PricingPlan.product_id == product.id)
        .order_by(PricingPlan.amount.asc())
        .all()
    )
    return ProductDetailResponse(
        id=product.id,
        slug=product.slug,
        name=product.name,
        short_description=product.short_description,
        long_description=product.long_description,
        category=category.name if category else None,
        access_model=product.access_model.value,
        pricing_model=product.pricing_model.value,
        deployment_type=product.deployment_type.value,
        platform_compatibility=list(product.platform_compatibility or []),
        support_model=product.support_model,
        documentation_link=product.documentation_link,
        featured=product.featured,
        versions=[
            {
                "id": version.id,
                "version": version.version,
                "release_notes": version.release_notes,
                "is_latest": version.is_latest,
                "released_at": version.released_at,
            }
            for version in versions
        ],
        files=[
            {
                "id": file.id,
                "filename": file.filename,
                "platform": file.platform,
                "checksum": file.checksum,
                "file_size_bytes": file.file_size_bytes,
            }
            for file in files
        ],
        plans=[
            {
                "id": plan.id,
                "slug": plan.slug,
                "name": plan.name,
                "billing_interval": plan.billing_interval,
                "currency": plan.currency,
                "amount": plan.amount,
            }
            for plan in plans
        ],
    )


@router.get("/services")
def list_services(db: Session = Depends(get_db)) -> list[dict[str, str]]:
    services = db.query(Service).order_by(Service.featured.desc(), Service.name.asc()).all()
    return [
        {
            "id": str(service.id),
            "slug": service.slug,
            "name": service.name,
            "short_description": service.short_description,
            "billing_model": service.billing_model.value,
            "service_exposure_type": service.service_exposure_type.value,
        }
        for service in services
    ]


@router.get("/pricing")
def list_pricing(db: Session = Depends(get_db)) -> list[dict[str, str | int | None]]:
    plans = db.query(PricingPlan).order_by(PricingPlan.amount.asc()).all()
    return [
        {
            "id": str(plan.id),
            "name": plan.name,
            "slug": plan.slug,
            "currency": plan.currency,
            "amount": plan.amount,
            "billing_interval": plan.billing_interval,
        }
        for plan in plans
    ]

