from sqlalchemy.orm import Session

from app.models.catalog import Product, Service


def list_featured_products(db: Session) -> list[Product]:
    return db.query(Product).filter(Product.featured.is_(True), Product.status == "active").all()


def list_featured_services(db: Session) -> list[Service]:
    return db.query(Service).filter(Service.featured.is_(True), Service.status == "active").all()

