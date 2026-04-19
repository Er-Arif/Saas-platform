from __future__ import annotations

from datetime import UTC, datetime, timedelta
from pathlib import Path

from app.core.config import get_settings
from app.core.database import SessionLocal
from app.core.security import hash_password
from app.models.catalog import PricingPlan, Product, ProductCategory, ProductFile, ProductVersion
from app.models.commerce import Invoice, InvoiceItem, Order, OrderItem, Payment, Subscription, SubscriptionItem, TaxProfile
from app.models.enums import (
    DeploymentType,
    InvoiceStatus,
    LicenseStatus,
    OrderStatus,
    PaymentStatus,
    PricingModel,
    ProductAccessModel,
    ProductStatus,
    ProductType,
    SubscriptionStatus,
    SupportTicketPriority,
    SupportTicketStatus,
)
from app.models.identity import Organization, OrganizationMembership, Permission, Role, User, UserProfile, UserRole
from app.models.licensing import ActivationDevice, License, LicenseActivation, LicenseEvent
from app.models.platform import CmsContentBlock, FeatureFlag, SystemSetting
from app.models.support import ContactRequest, DemoRequest, SalesInquiry, SupportMessage, SupportTicket


def ensure_demo_private_files() -> None:
    settings = get_settings()
    root = Path(settings.private_storage_path)
    samples = {
        "products/restaurant-pos/3.1.0/restaurant-pos-3.1.0-x64.exe": b"demo installer payload v3.1.0",
        "products/restaurant-pos/3.2.0/restaurant-pos-3.2.0-x64.exe": b"demo installer payload v3.2.0",
        "products/restaurant-pos/3.2.0/release-notes.txt": (
            b"Restaurant POS 3.2.0\n- Improved kitchen routing\n- Faster offline sync\n- Better GST exports\n"
        ),
    }
    for key, content in samples.items():
        target = root / key
        target.parent.mkdir(parents=True, exist_ok=True)
        if not target.exists():
            target.write_bytes(content)


def seed() -> None:
    db = SessionLocal()
    try:
        ensure_demo_private_files()

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
            Permission(key="catalog.manage", description="Manage products"),
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
        db.add(product_category)
        db.flush()

        pos = Product(
            category_id=product_category.id,
            slug="restaurant-pos",
            name="Restaurant POS Software",
            short_description="Windows-first restaurant POS with store-managed downloads, licensing, and version rollout.",
            long_description=(
                "A productized restaurant platform for outlets, franchises, and multi-terminal billing teams. "
                "The company platform handles purchases, installer delivery, version rollout, machine-bound licensing, "
                "renewals, and support while the POS keeps its own operational workflow."
            ),
            type=ProductType.DESKTOP_SOFTWARE,
            status=ProductStatus.ACTIVE,
            pricing_model=PricingModel.MONTHLY_SUBSCRIPTION,
            deployment_type=DeploymentType.DOWNLOADABLE,
            access_model=ProductAccessModel.HYBRID,
            platform_compatibility=["Windows"],
            documentation_link="https://docs.company.local/products/restaurant-pos",
            support_model="business-hours",
            featured=True,
        )
        his = Product(
            category_id=product_category.id,
            slug="hospital-information-system",
            name="Hospital Information System",
            short_description="Integrated patient, billing, pharmacy, and operations suite for hospitals.",
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
        db.add_all([pos, his])
        db.flush()

        starter_plan = PricingPlan(
            product_id=pos.id,
            slug="restaurant-pos-starter",
            name="Starter Outlet",
            billing_interval="monthly",
            currency="INR",
            amount=149900,
            is_public=True,
            metadata_json={"license_count": 3, "includes_updates": True, "release_channel": "stable"},
        )
        db.add(starter_plan)
        db.flush()

        legacy_version = ProductVersion(
            product_id=pos.id,
            version="3.1.0",
            release_notes="Stable production branch for existing dine-in and cashier installations.",
            system_requirements={"os": "Windows 10+", "ram": "8GB"},
            is_latest=False,
            released_at=(datetime.now(UTC) - timedelta(days=30)).isoformat(),
        )
        latest_version = ProductVersion(
            product_id=pos.id,
            version="3.2.0",
            release_notes="Improved kitchen routing, GST invoice export, and offline sync resiliency.",
            system_requirements={"os": "Windows 10+", "ram": "8GB"},
            is_latest=True,
            released_at=datetime.now(UTC).isoformat(),
        )
        db.add_all([legacy_version, latest_version])
        db.flush()

        db.add_all(
            [
                ProductFile(
                    product_id=pos.id,
                    product_version_id=legacy_version.id,
                    filename="restaurant-pos-3.1.0-x64.exe",
                    storage_key="products/restaurant-pos/3.1.0/restaurant-pos-3.1.0-x64.exe",
                    platform="Windows",
                    checksum="sha256:restaurant-pos-3-1-0",
                    file_size_bytes=122_000_000,
                    is_private=True,
                ),
                ProductFile(
                    product_id=pos.id,
                    product_version_id=latest_version.id,
                    filename="restaurant-pos-3.2.0-x64.exe",
                    storage_key="products/restaurant-pos/3.2.0/restaurant-pos-3.2.0-x64.exe",
                    platform="Windows",
                    checksum="sha256:restaurant-pos-3-2-0",
                    file_size_bytes=128_000_000,
                    is_private=True,
                ),
                ProductFile(
                    product_id=pos.id,
                    product_version_id=latest_version.id,
                    filename="restaurant-pos-3.2.0-release-notes.txt",
                    storage_key="products/restaurant-pos/3.2.0/release-notes.txt",
                    platform="Any",
                    checksum="sha256:restaurant-pos-3-2-0-notes",
                    file_size_bytes=88,
                    is_private=True,
                ),
            ]
        )

        order = Order(
            organization_id=organization.id,
            order_number="ORD-2026-0001",
            status=OrderStatus.PAID,
            currency="INR",
            subtotal=149900,
            tax_total=26982,
            grand_total=176882,
            billing_metadata={"provider": "razorpay", "upi_enabled": True, "product_store": True},
        )
        db.add(order)
        db.flush()

        order_item = OrderItem(
            order_id=order.id,
            product_id=pos.id,
            pricing_plan_id=starter_plan.id,
            quantity=1,
            unit_amount=149900,
            total_amount=149900,
            metadata_json={"license_count": 3, "product_slug": "restaurant-pos"},
        )
        db.add(order_item)
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
        db.add(SubscriptionItem(subscription_id=subscription.id, product_id=pos.id, pricing_plan_id=starter_plan.id, quantity=1))

        invoice = Invoice(
            organization_id=organization.id,
            order_id=order.id,
            subscription_id=subscription.id,
            invoice_number="INV-2026-0001",
            status=InvoiceStatus.PAID,
            currency="INR",
            subtotal=149900,
            tax_total=26982,
            grand_total=176882,
            issue_date=datetime.now(UTC).date().isoformat(),
            due_date=(datetime.now(UTC) + timedelta(days=7)).date().isoformat(),
            gstin=organization.gstin,
            legal_business_name=organization.legal_name,
            place_of_supply="Karnataka",
            cgst_amount=13491,
            sgst_amount=13491,
            igst_amount=0,
            pdf_path="invoices/INV-2026-0001.pdf",
        )
        db.add(invoice)
        db.flush()
        db.add(
            InvoiceItem(
                invoice_id=invoice.id,
                description="Restaurant POS Starter Outlet",
                quantity=1,
                unit_amount=149900,
                tax_amount=26982,
                total_amount=176882,
                metadata_json={"includes_updates": True, "license_count": 3},
            )
        )

        payment = Payment(
            organization_id=organization.id,
            order_id=order.id,
            invoice_id=invoice.id,
            provider="razorpay",
            provider_reference="pay_demo_001",
            status=PaymentStatus.SUCCEEDED,
            currency="INR",
            amount=176882,
            payment_method="upi",
            metadata_json={"upi_app": "gpay"},
        )
        tax_profile = TaxProfile(organization_id=organization.id, country_code="IN", state_code="KA", gstin=organization.gstin)
        db.add_all([payment, tax_profile])

        license_row = License(
            organization_id=organization.id,
            product_id=pos.id,
            order_item_id=order_item.id,
            license_key="POS-ACME-2026-DEMO-KEY",
            status=LicenseStatus.ACTIVE,
            max_activations=3,
            activation_count=1,
            expires_at=(datetime.now(UTC) + timedelta(days=365)).date().isoformat(),
            metadata_json={"release_channel": "stable", "supports_remote_verification": True},
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
                    detail={"device": "SUNRISE-POS-01", "channel": "stable"},
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
                    notes="Please show kitchen display, franchise reporting, and update delivery flow.",
                    status="new",
                ),
                FeatureFlag(key="portal.2fa_ready", description="Expose 2FA readiness banner", enabled=True),
                SystemSetting(key="domains", value={"web": "company.local", "portal": "app.company.local"}),
                CmsContentBlock(
                    key="homepage.hero",
                    title="Homepage hero",
                    content_json={"headline": "Your own software store for licenses, releases, and product distribution."},
                ),
            ]
        )

        db.commit()
    finally:
        db.close()


if __name__ == "__main__":
    seed()
