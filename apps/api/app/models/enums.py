from enum import StrEnum


class ProductType(StrEnum):
    DESKTOP_SOFTWARE = "desktop_software"
    WEB_SOFTWARE = "web_software"
    ENTERPRISE_SOLUTION = "enterprise_solution"
    DOWNLOADABLE_TOOL = "downloadable_tool"


class PricingModel(StrEnum):
    ONE_TIME = "one_time"
    MONTHLY_SUBSCRIPTION = "monthly_subscription"
    YEARLY_SUBSCRIPTION = "yearly_subscription"
    CUSTOM_QUOTE = "custom_quote"
    FREEMIUM = "freemium"


class DeploymentType(StrEnum):
    DOWNLOADABLE = "downloadable"
    HOSTED = "hosted"
    ON_PREMISE = "on_premise"
    CUSTOM_DEPLOYMENT = "custom_deployment"


class ProductAccessModel(StrEnum):
    LICENSE_BASED = "license_based"
    SUBSCRIPTION_BASED = "subscription_based"
    HYBRID = "hybrid"
    EXTERNAL_DEPLOYMENT = "external_deployment"


class ProductStatus(StrEnum):
    DRAFT = "draft"
    ACTIVE = "active"
    ARCHIVED = "archived"


class ServiceBillingModel(StrEnum):
    MONTHLY_SUBSCRIPTION = "monthly_subscription"
    YEARLY_SUBSCRIPTION = "yearly_subscription"
    USAGE_BASED = "usage_based"
    HYBRID = "hybrid"
    ENTERPRISE_CUSTOM = "enterprise_custom"


class ServiceExposureType(StrEnum):
    PUBLIC_API = "public_api"
    INTERNAL_MANAGED_SERVICE = "internal_managed_service"
    HYBRID = "hybrid"


class ServiceStatus(StrEnum):
    DRAFT = "draft"
    ACTIVE = "active"
    ARCHIVED = "archived"


class OrderStatus(StrEnum):
    PENDING = "pending"
    PAID = "paid"
    FAILED = "failed"
    CANCELLED = "cancelled"


class SubscriptionStatus(StrEnum):
    TRIALING = "trialing"
    ACTIVE = "active"
    PAST_DUE = "past_due"
    CANCELLED = "cancelled"
    EXPIRED = "expired"


class InvoiceStatus(StrEnum):
    DRAFT = "draft"
    ISSUED = "issued"
    PAID = "paid"
    VOID = "void"
    OVERDUE = "overdue"


class PaymentStatus(StrEnum):
    PENDING = "pending"
    SUCCEEDED = "succeeded"
    FAILED = "failed"
    REFUNDED = "refunded"


class LicenseStatus(StrEnum):
    ACTIVE = "active"
    EXPIRED = "expired"
    SUSPENDED = "suspended"
    REVOKED = "revoked"


class ApiKeyEnvironment(StrEnum):
    TEST = "test"
    LIVE = "live"


class SupportTicketStatus(StrEnum):
    OPEN = "open"
    IN_PROGRESS = "in_progress"
    WAITING_FOR_CUSTOMER = "waiting_for_customer"
    RESOLVED = "resolved"
    CLOSED = "closed"


class SupportTicketPriority(StrEnum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    URGENT = "urgent"


class LeadStatus(StrEnum):
    NEW = "new"
    QUALIFIED = "qualified"
    WON = "won"
    LOST = "lost"

