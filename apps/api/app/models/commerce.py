import uuid

from sqlalchemy import Enum, ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.models.base import TimestampMixin, UUIDPrimaryKeyMixin
from app.models.enums import InvoiceStatus, OrderStatus, PaymentStatus, SubscriptionStatus


class Order(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "orders"

    organization_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    order_number: Mapped[str] = mapped_column(String(40), unique=True, nullable=False)
    status: Mapped[OrderStatus] = mapped_column(Enum(OrderStatus, name="order_status", native_enum=False), nullable=False)
    currency: Mapped[str] = mapped_column(String(8), default="INR", nullable=False)
    subtotal: Mapped[int] = mapped_column(nullable=False)
    tax_total: Mapped[int] = mapped_column(default=0, nullable=False)
    grand_total: Mapped[int] = mapped_column(nullable=False)
    billing_metadata: Mapped[dict | None] = mapped_column(JSONB, nullable=True)


class OrderItem(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "order_items"

    order_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    product_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("products.id", ondelete="SET NULL"), nullable=True)
    service_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("services.id", ondelete="SET NULL"), nullable=True)
    pricing_plan_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("pricing_plans.id", ondelete="SET NULL"), nullable=True
    )
    quantity: Mapped[int] = mapped_column(default=1, nullable=False)
    unit_amount: Mapped[int] = mapped_column(nullable=False)
    total_amount: Mapped[int] = mapped_column(nullable=False)
    metadata_json: Mapped[dict | None] = mapped_column(JSONB, nullable=True)


class Subscription(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "subscriptions"

    organization_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    status: Mapped[SubscriptionStatus] = mapped_column(
        Enum(SubscriptionStatus, name="subscription_status", native_enum=False), nullable=False
    )
    external_reference: Mapped[str | None] = mapped_column(String(120), nullable=True)
    current_period_start: Mapped[str | None] = mapped_column(String(64), nullable=True)
    current_period_end: Mapped[str | None] = mapped_column(String(64), nullable=True)
    cancel_at_period_end: Mapped[bool] = mapped_column(default=False, nullable=False)
    metadata_json: Mapped[dict | None] = mapped_column(JSONB, nullable=True)


class SubscriptionItem(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "subscription_items"

    subscription_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("subscriptions.id", ondelete="CASCADE"), nullable=False)
    product_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("products.id", ondelete="SET NULL"), nullable=True)
    service_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("services.id", ondelete="SET NULL"), nullable=True)
    pricing_plan_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("pricing_plans.id", ondelete="SET NULL"), nullable=True
    )
    quantity: Mapped[int] = mapped_column(default=1, nullable=False)


class Invoice(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "invoices"

    organization_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    order_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("orders.id", ondelete="SET NULL"), nullable=True)
    subscription_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("subscriptions.id", ondelete="SET NULL"), nullable=True
    )
    invoice_number: Mapped[str] = mapped_column(String(40), unique=True, nullable=False)
    status: Mapped[InvoiceStatus] = mapped_column(
        Enum(InvoiceStatus, name="invoice_status", native_enum=False), nullable=False
    )
    currency: Mapped[str] = mapped_column(String(8), default="INR", nullable=False)
    subtotal: Mapped[int] = mapped_column(nullable=False)
    tax_total: Mapped[int] = mapped_column(default=0, nullable=False)
    grand_total: Mapped[int] = mapped_column(nullable=False)
    issue_date: Mapped[str] = mapped_column(String(64), nullable=False)
    due_date: Mapped[str | None] = mapped_column(String(64), nullable=True)
    gstin: Mapped[str | None] = mapped_column(String(32), nullable=True)
    legal_business_name: Mapped[str | None] = mapped_column(String(255), nullable=True)
    place_of_supply: Mapped[str | None] = mapped_column(String(64), nullable=True)
    cgst_amount: Mapped[int] = mapped_column(default=0, nullable=False)
    sgst_amount: Mapped[int] = mapped_column(default=0, nullable=False)
    igst_amount: Mapped[int] = mapped_column(default=0, nullable=False)
    pdf_path: Mapped[str | None] = mapped_column(String(500), nullable=True)
    snapshot_json: Mapped[dict | None] = mapped_column(JSONB, nullable=True)


class InvoiceItem(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "invoice_items"

    invoice_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("invoices.id", ondelete="CASCADE"), nullable=False)
    description: Mapped[str] = mapped_column(String(255), nullable=False)
    quantity: Mapped[int] = mapped_column(default=1, nullable=False)
    unit_amount: Mapped[int] = mapped_column(nullable=False)
    tax_amount: Mapped[int] = mapped_column(default=0, nullable=False)
    total_amount: Mapped[int] = mapped_column(nullable=False)
    metadata_json: Mapped[dict | None] = mapped_column(JSONB, nullable=True)


class Payment(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "payments"

    organization_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    order_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("orders.id", ondelete="SET NULL"), nullable=True)
    invoice_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("invoices.id", ondelete="SET NULL"), nullable=True)
    provider: Mapped[str] = mapped_column(String(50), nullable=False)
    provider_reference: Mapped[str | None] = mapped_column(String(120), nullable=True)
    status: Mapped[PaymentStatus] = mapped_column(
        Enum(PaymentStatus, name="payment_status", native_enum=False), nullable=False
    )
    currency: Mapped[str] = mapped_column(String(8), default="INR", nullable=False)
    amount: Mapped[int] = mapped_column(nullable=False)
    payment_method: Mapped[str | None] = mapped_column(String(50), nullable=True)
    metadata_json: Mapped[dict | None] = mapped_column(JSONB, nullable=True)


class Discount(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "discounts"

    code: Mapped[str] = mapped_column(String(80), unique=True, nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    percentage_off: Mapped[int | None] = mapped_column(nullable=True)
    amount_off: Mapped[int | None] = mapped_column(nullable=True)
    metadata_json: Mapped[dict | None] = mapped_column(JSONB, nullable=True)


class TaxProfile(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "tax_profiles"

    organization_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, unique=True
    )
    country_code: Mapped[str] = mapped_column(String(8), default="IN", nullable=False)
    state_code: Mapped[str | None] = mapped_column(String(8), nullable=True)
    gstin: Mapped[str | None] = mapped_column(String(32), nullable=True)
    metadata_json: Mapped[dict | None] = mapped_column(JSONB, nullable=True)

