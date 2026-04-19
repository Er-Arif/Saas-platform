export const adminNav = [
  { label: "Overview", href: "/" },
  { label: "Customers", href: "/customers" },
  { label: "Catalog", href: "/catalog" },
  { label: "Billing", href: "/billing" },
  { label: "Licenses", href: "/licenses" },
  { label: "Support", href: "/support" },
  { label: "Leads", href: "/leads" },
  { label: "Settings", href: "/settings" }
];

export const adminCards = [
  { label: "Organizations", value: "48", detail: "Active customer organizations buying your software products" },
  { label: "Monthly product revenue", value: "INR 8.4L", detail: "Recurring revenue from active product subscriptions and renewals" },
  { label: "Open support tickets", value: "14", detail: "Licensing, downloads, and update rollout are the busiest queues" },
  { label: "Latest rollout adoption", value: "76%", detail: "Organizations already moved to Restaurant POS 3.2.0" }
];

export const customers = [
  ["Sunrise Foods Pvt Ltd", "Customer owner", "Restaurant POS", "Active"],
  ["City Care Hospitals", "Sales pipeline", "Hospital Information System", "Qualified"]
];

export const catalog = [
  ["Restaurant POS Software", "Product", "Hybrid", "Featured", "Active"],
  ["Hospital Information System", "Product", "External deployment", "Featured", "Active"],
  ["Future services scope", "Reserved", "Hidden", "Roadmap", "Not launched"]
];

export const payments = [
  ["INV-2026-0001", "Razorpay", "UPI", "Paid", "INR 176,882"],
  ["INV-2026-0002", "Razorpay", "Auto-collect", "Queued", "INR 149,900"]
];

export const licenses = [
  ["Restaurant POS Software", "POS-ACME-2026-DEMO-KEY", "1 / 3", "Active", "Sunrise Foods Pvt Ltd"],
  ["Restaurant POS Software", "Stable channel", "3.2.0", "Latest release", "Download gated"]
];

export const services = [
  ["Future API scope", "reserved", "not public", "Roadmap only", "Hidden"]
];

export const leads = [
  ["Dr. Sharma", "Sales inquiry", "Hospital Information System", "Qualified"],
  ["Rahul Nair", "Contact request", "Restaurant POS Software", "New"]
];

export const auditLogs = [
  ["billing_admin", "invoice.issued", "INV-2026-0002", "2026-04-18 09:00"],
  ["support_agent", "license.verified", "POS-ACME-2026-DEMO-KEY", "2026-04-18 09:14"]
];
