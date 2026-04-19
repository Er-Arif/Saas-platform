export const sidebar = [
  { label: "Overview", href: "/" },
  { label: "My Products", href: "/products" },
  { label: "Downloads", href: "/downloads" },
  { label: "Licenses", href: "/licenses" },
  { label: "Billing", href: "/billing" },
  { label: "Services", href: "/services" },
  { label: "Support", href: "/support" },
  { label: "Profile", href: "/profile" },
  { label: "Sales Requests", href: "/sales" }
];

export const overviewCards = [
  { label: "Active subscriptions", value: "2", detail: "Restaurant POS and Authentication Service" },
  { label: "Available downloads", value: "4", detail: "Signed private installers and release packages" },
  { label: "API usage", value: "182k", detail: "Authentication Service requests this month" },
  { label: "Open tickets", value: "1", detail: "Licensing support is being handled by the team" }
];

export const products = [
  ["Restaurant POS Software", "Active", "Hybrid", "3.2.0", "3 licenses"],
  ["Authentication Service", "Active", "Public API", "v1", "1 live tenant"]
];

export const downloads = [
  ["restaurant-pos-3.2.0-x64.exe", "Windows", "3.2.0", "sha256:demo-checksum"],
  ["restaurant-pos-3.2.0-release-notes.pdf", "Any", "3.2.0", "Signed link"],
  ["auth-service-postman-collection.json", "Any", "v1", "Signed link"]
];

export const licenses = [
  ["POS-ACME-2026-DEMO-KEY", "Active", "1 / 3", "2027-04-18", "Machine-bound"],
  ["AUTH-TENANT-001", "Managed", "Tenant linked", "Subscription", "Live environment"]
];

export const invoices = [
  ["INV-2026-0001", "Paid", "INR 247,564", "Razorpay / UPI"],
  ["INV-2026-0002", "Issued", "INR 59,900", "Awaiting auto-collection"]
];

export const services = [
  ["Authentication Service", "live", "tenant_sunrisefoods_001", "182,340 / 250,000"],
  ["Authentication Service", "test", "tenant_sunrisefoods_sandbox", "12,882 / 100,000"]
];

export const tickets = [
  ["Need help activating second terminal", "Open", "High", "Licensing"],
  ["Webhook signature validation", "Resolved", "Medium", "API integration"]
];

