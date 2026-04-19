import { apiGet } from "./server-api";

export type CatalogProduct = {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  access_model: string;
  pricing_model: string;
};

export type ProductDetail = {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  long_description: string;
  category: string | null;
  access_model: string;
  pricing_model: string;
  deployment_type: string;
  platform_compatibility: string[];
  support_model: string | null;
  documentation_link: string | null;
  featured: boolean;
  versions: Array<{
    id: string;
    version: string;
    release_notes: string;
    is_latest: boolean;
    released_at: string | null;
  }>;
  files: Array<{
    id: string;
    filename: string;
    platform: string | null;
    checksum: string | null;
    file_size_bytes: number | null;
  }>;
  plans: Array<{
    id: string;
    slug: string;
    name: string;
    billing_interval: string | null;
    currency: string;
    amount: number;
  }>;
};

export type PortalOverview = {
  summary: {
    active_subscriptions: number;
    product_licenses: number;
    available_downloads: number;
    api_clients: number;
    open_tickets: number;
    unpaid_invoices: number;
  };
  organization_id: string;
};

export type PortalProduct = {
  product_id: string;
  product_name: string;
  product_slug: string;
  license_key: string;
  license_status: string;
  max_activations: number;
  activation_count: number;
  expires_at: string | null;
};

export type PortalDownload = {
  product_name: string;
  filename: string;
  platform: string | null;
  version: string | null;
  checksum: string | null;
  download_url: string | null;
};

export type PortalLicense = {
  license_key: string;
  status: string;
  max_activations: number;
  expires_at: string | null;
};

export type PortalBilling = {
  invoices: Array<{ invoice_number: string; status: string }>;
  subscriptions: Array<{ id: string; status: string }>;
};

export type PortalServiceData = {
  service_accounts: Array<{
    service_id: string;
    environment: string;
    tenant_reference: string | null;
    status: string;
  }>;
  usage: Array<{
    service_id: string;
    period: string;
    request_count: number;
    quota_limit: number | null;
  }>;
  api_clients: Array<{
    id: string;
    name: string;
    environment: string;
  }>;
  support_ticket_count: number;
};

export type PortalTicket = {
  id: string;
  subject: string;
  status: string;
  priority: string;
};

export type AdminProduct = {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  pricing_model: string;
  access_model: string;
  deployment_type: string;
  status: string;
  featured: boolean;
};

export type AdminStats = {
  customers: number;
  users: number;
  products: number;
  services: number;
  orders: number;
  subscriptions: number;
  invoices: number;
  payments: number;
  licenses: number;
  tickets: number;
  leads: number;
  feature_flags: number;
  settings: number;
  audit_logs: number;
};

export type PricingPlan = {
  id: string;
  name: string;
  slug: string;
  currency: string;
  amount: number;
  billing_interval: string | null;
};

export async function getCatalogProducts() {
  return apiGet<CatalogProduct[]>("/catalog/products");
}

export async function getCatalogProduct(slug: string) {
  return apiGet<ProductDetail>(`/catalog/products/${slug}`);
}

export async function getPricingPlans() {
  return apiGet<PricingPlan[]>("/catalog/pricing");
}

export async function getPortalOverview() {
  return apiGet<PortalOverview>("/portal/overview");
}

export async function getPortalProducts() {
  return apiGet<PortalProduct[]>("/portal/products");
}

export async function getPortalDownloads() {
  return apiGet<{ items: PortalDownload[] }>("/portal/downloads");
}

export async function getPortalLicenses() {
  return apiGet<PortalLicense[]>("/portal/licenses");
}

export async function getPortalBilling() {
  return apiGet<PortalBilling>("/portal/billing");
}

export async function getPortalServices() {
  return apiGet<PortalServiceData>("/portal/services");
}

export async function getPortalTickets() {
  return apiGet<PortalTicket[]>("/support/tickets");
}

export async function getAdminProducts() {
  return apiGet<AdminProduct[]>("/admin/products");
}

export async function getAdminStats() {
  return apiGet<AdminStats>("/admin/stats");
}
