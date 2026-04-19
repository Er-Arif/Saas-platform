import type { AppLink, MarketingStat, ProductSummary, ServiceSummary } from "@company/types";

export const navigation: AppLink[] = [
  { label: "Products", href: "/products" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Support", href: "/support" },
  { label: "Contact", href: "/contact" }
];

export const stats: MarketingStat[] = [
  { label: "Products ready to ship", value: "2", detail: "Launch installable and enterprise software from one branded platform." },
  { label: "Private release workflow", value: "4 layers", detail: "Catalog, checkout, license issuance, and signed distribution work together." },
  { label: "Licensed devices tracked", value: "3 per plan", detail: "Machine-bound activation and renewals are modeled from day one." }
];

export const products: ProductSummary[] = [
  {
    id: "product-restaurant-pos",
    slug: "restaurant-pos",
    name: "Restaurant POS Software",
    shortDescription: "Windows-first restaurant POS with store-managed downloads, machine licensing, version rollout, and renewal support.",
    category: "Business Operations",
    accessModel: "hybrid",
    pricingModel: "monthly_subscription",
    featured: true
  },
  {
    id: "product-his",
    slug: "hospital-information-system",
    name: "Hospital Information System",
    shortDescription: "Integrated patient, pharmacy, billing, OT, and ward management for hospitals and clinics.",
    category: "Healthcare Systems",
    accessModel: "external_deployment",
    pricingModel: "custom_quote",
    featured: true
  }
];

export const services: ServiceSummary[] = [
  {
    id: "future-scope",
    slug: "future-services-scope",
    name: "Future API and Service Scope",
    shortDescription: "Reserved architecture for APIs and managed services once the product marketplace is fully established.",
    category: "Roadmap",
    billingModel: "hybrid",
    serviceExposureType: "hybrid",
    featured: false
  }
];

export const valueProps = [
  "Sell downloadable and deployable business software from your own branded store instead of a generic marketplace.",
  "Deliver installers privately, issue licenses per organization, and control machine activations without exposing raw files publicly.",
  "Roll out product updates, release notes, and renewal flows from one platform while keeping each product's internal auth independent."
];

export const pricingHighlights = [
  { name: "License subscriptions", detail: "Monthly and yearly software plans with activation limits, renewals, and update eligibility." },
  { name: "One-time deployments", detail: "License-based delivery for installable products and enterprise rollout packages." },
  { name: "Future-ready expansion", detail: "The platform keeps room for services and APIs later without cluttering today's product-first experience." }
];
