from fastapi import APIRouter

from app.api.v1.endpoints import admin, auth, billing, catalog, health, portal, product_client, services, support

api_router = APIRouter()
api_router.include_router(health.router, prefix="/health", tags=["health"])
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(catalog.router, prefix="/catalog", tags=["catalog"])
api_router.include_router(product_client.router, prefix="/product-client", tags=["product-client"])
api_router.include_router(portal.router, prefix="/portal", tags=["portal"])
api_router.include_router(billing.router, prefix="/billing", tags=["billing"])
api_router.include_router(services.router, prefix="/services", tags=["services"])
api_router.include_router(support.router, prefix="/support", tags=["support"])
api_router.include_router(admin.router, prefix="/admin", tags=["admin"])
