export const sidebar = [
  { label: "Overview", href: "/" },
  { label: "My Products", href: "/products" },
  { label: "Downloads", href: "/downloads" },
  { label: "Licenses", href: "/licenses" },
  { label: "Billing", href: "/billing" },
  { label: "Support", href: "/support" },
  { label: "Profile", href: "/profile" },
  { label: "Sales Requests", href: "/sales" }
];

export const overviewCards = [
  { label: "Active licenses", value: "1", detail: "Restaurant POS license with 3 machine activations" },
  { label: "Available downloads", value: "3", detail: "Installers and release notes delivered with signed access" },
  { label: "Current rollout", value: "3.2.0", detail: "Latest stable version available for your organization" },
  { label: "Open tickets", value: "1", detail: "Licensing support is already in progress" }
];

export const products = [
  ["Restaurant POS Software", "Active", "Hybrid", "3.2.0", "3 machine licenses"],
  ["Hospital Information System", "Quoted", "External deployment", "Planned", "Awaiting proposal"]
];

export const downloads = [
  ["restaurant-pos-3.2.0-x64.exe", "Windows", "3.2.0", "Signed download"],
  ["restaurant-pos-3.1.0-x64.exe", "Windows", "3.1.0", "Previous stable build"],
  ["restaurant-pos-3.2.0-release-notes.txt", "Any", "3.2.0", "Release notes"]
];

export const licenses = [
  ["POS-ACME-2026-DEMO-KEY", "Active", "1 / 3", "2027-04-18", "Machine-bound stable channel"],
  ["Starter Outlet Plan", "Renewing", "Updates included", "Monthly", "Next renewal 2026-05-18"]
];

export const invoices = [
  ["INV-2026-0001", "Paid", "INR 176,882", "Razorpay / UPI"],
  ["INV-2026-0002", "Upcoming", "INR 149,900", "Auto-renewal queued"]
];

export const services = [
  ["Future services", "Not enabled", "No tenants yet", "Platform scope reserved"]
];

export const tickets = [
  ["Need help activating second terminal", "Open", "High", "Licensing"],
  ["Request installer for backup machine", "Resolved", "Medium", "Downloads"]
];
