from __future__ import annotations

from datetime import UTC, datetime, timedelta

from app.core.database import SessionLocal
from app.core.security import hash_password
from app.models.catalog import (
    PricingPlan,
    Product,
    ProductCategory,
    ProductFile,
    ProductVersion,
    Service,
    ServiceCategory,
)
from app.models.commerce import Invoice, InvoiceItem, Order, OrderItem, Payment, Subscription, SubscriptionItem, TaxProfile
from app.models.developer import ApiClient, ApiKey, ApiUsageSummary, OrganizationServiceAccount, WebhookEndpoint
from app.models.enums import (
    ApiKeyEnvironment,
    DeploymentType,
    InvoiceStatus,
    LicenseStatus,
    OrderStatus,
    PaymentStatus,
    PricingModel,
    ProductAccessModel,
    ProductStatus,
    ProductType,
    ServiceBillingModel,
    ServiceExposureType,
    ServiceStatus,
    SubscriptionStatus,
    SupportTicketPriority,
    SupportTicketStatus,
)
from app.models.identity import Organization, OrganizationMembership, Permission, Role, User, UserProfile, UserRole
from app.models.licensing import ActivationDevice, License, LicenseActivation, LicenseEvent
from app.models.platform import CmsContentBlock, FeatureFlag, SystemSetting
from app.models.support import ContactRequest, DemoRequest, SalesInquiry, SupportMessage, SupportTicket


def seed() -> None:
    db = SessionLocal()
    try:
        super_admin = User(email="admin@company.local", password_hash=hash_password("AdminPass123!"), is_superuser=True)
        billing_admin = User(email="billing@company.local", password_hash=hash_password("BillingPass123!"))
        customer_user = User(email="ops@sunrisefoods.example", password_hash=hash_password("CustomerPass123!"))
        db.add_all([super_admin, billing_admin, customer_user])
        db.flush()

        db.add_all(
            [
                UserProfile(user_id=super_admin.id, full_name="Platform Super Admin"),
                UserProfile(user_id=billing_admin.id, full_name="Billing Admin"),
                UserProfile(user_id=customer_user.id, full_name="Aisha Khan"),
            ]
        )

        organization = Organization(
            slug="sunrise-foods",
            name="Sunrise Foods Pvt Ltd",
            legal_name="Sunrise Foods Private Limited",
            gstin="29ABCDE1234F1Z5",
            billing_email="accounts@sunrisefoods.example",
            billing_address={"city": "Bengaluru", "state": "KA", "country": "IN"},
        )
        db.add(organization)
        db.flush()

        roles = [
            Role(name="super_admin", description="Global internal administrator"),
            Role(name="billing_admin", description="Finance operations"),
            Role(name="support_agent", description="Support operations"),
            Role(name="customer_owner", description="Customer organization owner"),
        ]
        permissions = [
            Permission(key="catalog.manage", description="Manage products and services"),
            Permission(key="billing.manage", description="Manage billing"),
            Permission(key="support.manage", description="Manage support"),
        ]
        db.add_all(roles + permissions)
        db.flush()

        db.add_all(
            [
                OrganizationMembership(organization_id=organization.id, user_id=customer_user.id, is_owner=True),
                UserRole(user_id=super_admin.id, role_id=roles[0].id),
                UserRole(user_id=billing_admin.id, role_id=roles[1].id),
                UserRole(user_id=customer_user.id, role_id=roles[3].id, organization_id=organization.id),
            ]
        )

        product_category = ProductCategory(slug="business-ops", name="Business Operations")
        service_category = ServiceCategory(slug="identity", name="Identity & Access")
        db.add_all([product_category, service_category])
        db.flush()

        pos = Product(
            category_id=product_category.id,
            slug="restaurant-pos",
            name="Restaurant POS Software",
            short_description="Cloud-managed restaurant POS for billing, kitchen, and inventory.",
            long_description="A production-ready restaurant platform for outlets, franchises, and delivery-first brands.",
            type=ProductType.DESKTOP_SOFTWARE,
            status=ProductStatus.ACTIVE,
            pricing_model=PricingModel.MONTHLY_SUBSCRIPTION,
            deployment_type=DeploymentType.DOWNLOADABLE,
            access_model=ProductAccessModel.HYBRID,
            platform_compatibility=["Windows", "Android"],
            documentation_link="https://docs.company.local/products/restaurant-pos",
            support_model="business-hours",
            featured=True,
        )
        his = Product(
            category_id=product_category.id,
            slug="hospital-information-system",
            name="Hospital Information System",
            short_description="Integrated patient, billing, pharmacy, and operations suite.",
            long_description="Enterprise healthcare management system for hospitals and clinics.",
            type=ProductType.ENTERPRISE_SOLUTION,
            status=ProductStatus.ACTIVE,
            pricing_model=PricingModel.CUSTOM_QUOTE,
            deployment_type=DeploymentType.CUSTOM_DEPLOYMENT,
            access_model=ProductAccessModel.EXTERNAL_DEPLOYMENT,
            platform_compatibility=["Web", "Windows"],
            documentation_link="https://docs.company.local/products/his",
            support_model="dedicated-csm",
            enterprise_custom=True,
            featured=True,
        )
        auth_service = Service(
            category_id=service_category.id,
            slug="authentication-service",
            name="Authentication Service",
            short_description="Hosted identity APIs for sign-in, OTP, and token management.",
            long_description="A separately deployable auth product sold to customers and exposed under auth.company.com.",
            status=ServiceStatus.ACTIVE,
            billing_model=ServiceBillingModel.HYBRID,
            public_base_url="https://auth.company.local",
            docs_link="https://docs.company.local/auth-service",
            api_available=True,
            api_key_required=True,
            sandbox_support=True,
            rate_limit_policy={"rpm": 600, "burst": 60},
            featured=True,
            service_exposure_type=ServiceExposureType.PUBLIC_API,
        )
        db.add_all([pos, his, auth_service])
        db.flush()

        starter_plan = PricingPlan(
            product_id=pos.id,
            slug="restaurant-pos-starter",
            name="Starter Outlet",
            billing_interval="monthly",
            currency="INR",
            amount=149900,
            is_public=True,
        )
        auth_growth = PricingPlan(
            service_id=auth_service.id,
            slug="auth-growth",
            name="Auth Growth",
            billing_interval="monthly",
            currency="INR",
            amount=59900,
            usage_unit="requests",
            is_public=True,
        )
        db.add_all([starter_plan, auth_growth])
        db.flush()

        version = ProductVersion(
            product_id=pos.id,
            version="3.2.0",
            release_notes="Improved kitchen routing, GST invoice export, and offline sync resiliency.",
            system_requirements={"os": "Windows 10+", "ram": "8GB"},
            is_latest=True,
            released_at=datetime.now(UTC).isoformat(),
        )
        db.add(version)
        db.flush()

        file = ProductFile(
            product_id=pos.id,
            product_version_id=version.id,
            filename="restaurant-pos-3.2.0-x64.exe",
            storage_key="products/restaurant-pos/3.2.0/restaurant-pos-3.2.0-x64.exe",
            platform="Windows",
            checksum="sha256:demo-checksum",
            file_size_bytes=128_000_000,
            is_private=True,
        )
        db.add(file)

        order = Order(
            organization_id=organization.id,
            order_number="ORD-2026-0001",
            status=OrderStatus.PAID,
            currency="INR",
            subtotal=209800,
            tax_total=37764,
            grand_total=247564,
            billing_metadata={"provider": "razorpay", "upi_enabled": True},
        )
        db.add(order)
        db.flush()

        order_items = [
            OrderItem(order_id=order.id, product_id=pos.id, pricing_plan_id=starter_plan.id, quantity=1, unit_amount=149900, total_amount=149900),
            OrderItem(order_id=order.id, service_id=auth_service.id, pricing_plan_id=auth_growth.id, quantity=1, unit_amount=59900, total_amount=59900),
        ]
        db.add_all(order_items)
        db.flush()

        subscription = Subscription(
            organization_id=organization.id,
            status=SubscriptionStatus.ACTIVE,
            external_reference="sub_demo_001",
            current_period_start=datetime.now(UTC).isoformat(),
            current_period_end=(datetime.now(UTC) + timedelta(days=30)).isoformat(),
        )
        db.add(subscription)
        db.flush()
        db.add_all(
            [
                SubscriptionItem(subscription_id=subscription.id, product_id=pos.id, pricing_plan_id=starter_plan.id, quantity=1),
                SubscriptionItem(subscription_id=subscription.id, service_id=auth_service.id, pricing_plan_id=auth_growth.id, quantity=1),
            ]
        )

        invoice = Invoice(
            organization_id=organization.id,
            order_id=order.id,
            subscription_id=subscription.id,
            invoice_number="INV-2026-0001",
            status=InvoiceStatus.PAID,
            currency="INR",
            subtotal=209800,
            tax_total=37764,
            grand_total=247564,
            issue_date=datetime.now(UTC).date().isoformat(),
            due_date=(datetime.now(UTC) + timedelta(days=7)).date().isoformat(),
            gstin=organization.gstin,
            legal_business_name=organization.legal_name,
            place_of_supply="Karnataka",
            cgst_amount=18882,
            sgst_amount=18882,
            igst_amount=0,
            pdf_path="invoices/INV-2026-0001.pdf",
        )
        db.add(invoice)
        db.flush()
        db.add_all(
            [
                InvoiceItem(invoice_id=invoice.id, description="Restaurant POS Starter Outlet", quantity=1, unit_amount=149900, tax_amount=26982, total_amount=176882),
                InvoiceItem(invoice_id=invoice.id, description="Authentication Service Growth", quantity=1, unit_amount=59900, tax_amount=10782, total_amount=70682),
            ]
        )

        payment = Payment(
            organization_id=organization.id,
            order_id=order.id,
            invoice_id=invoice.id,
            provider="razorpay",
            provider_reference="pay_demo_001",
            status=PaymentStatus.SUCCEEDED,
            currency="INR",
            amount=247564,
            payment_method="upi",
            metadata_json={"upi_app": "gpay"},
        )
        tax_profile = TaxProfile(organization_id=organization.id, country_code="IN", state_code="KA", gstin=organization.gstin)
        db.add_all([payment, tax_profile])

        license_row = License(
            organization_id=organization.id,
            product_id=pos.id,
            order_item_id=order_items[0].id,
            license_key="POS-ACME-2026-DEMO-KEY",
            status=LicenseStatus.ACTIVE,
            max_activations=3,
            activation_count=1,
            expires_at=(datetime.now(UTC) + timedelta(days=365)).date().isoformat(),
        )
        db.add(license_row)
        db.flush()
        device = ActivationDevice(
            organization_id=organization.id,
            fingerprint="device-fingerprint-demo",
            machine_name="SUNRISE-POS-01",
            platform="Windows",
        )
        db.add(device)
        db.flush()
        db.add_all(
            [
                LicenseActivation(
                    license_id=license_row.id,
                    activation_device_id=device.id,
                    activated_at=datetime.now(UTC).isoformat(),
                    status="active",
                ),
                LicenseEvent(
                    license_id=license_row.id,
                    actor_user_id=customer_user.id,
                    event_type="license_activated",
                    detail={"device": "SUNRISE-POS-01"},
                ),
            ]
        )

        org_service_account = OrganizationServiceAccount(
            organization_id=organization.id,
            service_id=auth_service.id,
            environment=ApiKeyEnvironment.LIVE,
            customer_tenant_reference="tenant_sunrisefoods_001",
            service_metadata={"tenant_region": "in-south-1"},
        )
        db.add(org_service_account)
        db.flush()

        api_client = ApiClient(
            organization_id=organization.id,
            service_id=auth_service.id,
            name="Sunrise Foods Production",
            environment=ApiKeyEnvironment.LIVE,
        )
        db.add(api_client)
        db.flush()
        db.add_all(
            [
                ApiKey(api_client_id=api_client.id, key_prefix="live_sk_demo", key_hash="hashed-demo-key", environment=ApiKeyEnvironment.LIVE),
                ApiUsageSummary(
                    organization_id=organization.id,
                    service_id=auth_service.id,
                    period="2026-04",
                    request_count=182340,
                    success_count=181940,
                    error_count=400,
                    quota_limit=250000,
                ),
                WebhookEndpoint(
                    organization_id=organization.id,
                    service_id=auth_service.id,
                    event_scope="payment.*",
                    target_url="https://customer.example/webhooks/payments",
                    secret_hash="whsec_hashed_demo",
                ),
            ]
        )

        ticket = SupportTicket(
            organization_id=organization.id,
            requester_user_id=customer_user.id,
            product_id=pos.id,
            subject="Need help activating second terminal",
            category="licensing",
            priority=SupportTicketPriority.HIGH,
            status=SupportTicketStatus.OPEN,
        )
        db.add(ticket)
        db.flush()
        db.add(
            SupportMessage(
                support_ticket_id=ticket.id,
                sender_user_id=customer_user.id,
                is_internal_note=False,
                message="We added a second billing counter and need to activate another device.",
            )
        )

        db.add_all(
            [
                ContactRequest(
                    name="Rahul Nair",
                    email="rahul@greenkitchen.example",
                    company_name="Green Kitchen",
                    message="Need pricing for five outlets.",
                    status="new",
                ),
                SalesInquiry(
                    product_id=his.id,
                    name="Dr. Sharma",
                    email="it@citycare.example",
                    company_name="City Care Hospitals",
                    requirements="Need HIS for a 150-bed hospital with lab and pharmacy integration.",
                    status="qualified",
                ),
                DemoRequest(
                    product_id=pos.id,
                    name="Maya Patel",
                    email="maya@sunrisefoods.example",
                    company_name="Sunrise Foods Pvt Ltd",
                    preferred_date=(datetime.now(UTC) + timedelta(days=3)).date().isoformat(),
                    notes="Please show kitchen display and franchise reporting.",
                    status="new",
                ),
                FeatureFlag(key="portal.2fa_ready", description="Expose 2FA readiness banner", enabled=True),
                SystemSetting(key="domains", value={"web": "company.local", "portal": "app.company.local"}),
                CmsContentBlock(
                    key="homepage.hero",
                    title="Homepage hero",
                    content_json={"headline": "Commerce, licensing, and developer access for serious software businesses."},
                ),
            ]
        )

        db.commit()
    finally:
        db.close()


if __name__ == "__main__":
    seed()

