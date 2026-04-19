export type ProductAccessModel =
  | "license_based"
  | "subscription_based"
  | "hybrid"
  | "external_deployment";

export type ServiceExposureType =
  | "public_api"
  | "internal_managed_service"
  | "hybrid";

export type ApiKeyEnvironment = "test" | "live";

export interface AppLink {
  label: string;
  href: string;
  description?: string;
}

export interface MarketingStat {
  label: string;
  value: string;
  detail?: string;
}

export interface ProductSummary {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  category: string;
  accessModel: ProductAccessModel;
  pricingModel: string;
  featured?: boolean;
}

export interface ServiceSummary {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  category: string;
  billingModel: string;
  serviceExposureType: ServiceExposureType;
  featured?: boolean;
}

