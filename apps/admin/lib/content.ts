export const adminNav = [
  { label: "Overview", href: "/" },
  { label: "Customers", href: "/customers" },
  { label: "Catalog", href: "/catalog" },
  { label: "Billing", href: "/billing" },
  { label: "Licenses", href: "/licenses" },
  { label: "Services", href: "/services" },
  { label: "Support", href: "/support" },
  { label: "Leads", href: "/leads" },
  { label: "Settings", href: "/settings" }
];

export const adminCards = [
  { label: "Organizations", value: "48", detail: "Active customer organizations across products and services" },
  { label: "MRR", value: "INR 8.4L", detail: "Recurring billing across products and APIs" },
  { label: "Open support tickets", value: "14", detail: "3 require billing admin review" },
  { label: "Gateway traffic", value: "4.8M", detail: "Tracked requests via api.company.com this month" }
];

export const customers = [
  ["Sunrise Foods Pvt Ltd", "Customer owner", "Restaurant POS + Auth Service", "Active"],
  ["City Care Hospitals", "Sales pipeline", "Hospital Information System", "Qualified"]
];

export const catalog = [
  ["Restaurant POS Software", "Product", "Hybrid", "Featured", "Active"],
  ["Hospital Information System", "Product", "External deployment", "Featured", "Active"],
  ["Authentication Service", "Service", "Public API", "Featured", "Active"]
];

export const payments = [
  ["INV-2026-0001", "Razorpay", "UPI", "Paid", "INR 247,564"],
  ["INV-2026-0002", "Razorpay", "Auto-collect", "Issued", "INR 59,900"]
];

export const licenses = [
  ["Restaurant POS Software", "POS-ACME-2026-DEMO-KEY", "1 / 3", "Active", "Sunrise Foods Pvt Ltd"],
  ["Authentication Service", "tenant_sunrisefoods_001", "Live", "Managed", "Sunrise Foods Pvt Ltd"]
];

export const services = [
  ["Authentication Service", "public_api", "auth.company.local", "Hybrid billing", "Enabled"],
  ["Notification Service", "internal_managed_service", "future", "Planned", "Hidden"]
];

export const leads = [
  ["Dr. Sharma", "Sales inquiry", "Hospital Information System", "Qualified"],
  ["Rahul Nair", "Contact request", "Restaurant POS Software", "New"]
];

export const auditLogs = [
  ["billing_admin", "invoice.issued", "INV-2026-0002", "2026-04-18 09:00"],
  ["support_agent", "ticket.updated", "Need help activating second terminal", "2026-04-18 09:14"]
];

