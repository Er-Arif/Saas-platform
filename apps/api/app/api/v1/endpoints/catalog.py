from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.catalog import PricingPlan, Product, Service

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

