import type { AppLink, MarketingStat, ProductSummary, ServiceSummary } from "@company/types";

export const navigation: AppLink[] = [
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Support", href: "/support" },
  { label: "Contact", href: "/contact" }
];

export const stats: MarketingStat[] = [
  { label: "Organizations served", value: "120+", detail: "Growing portfolio across retail, healthcare, and developer tooling." },
  { label: "Platform-ready workflows", value: "9", detail: "Commerce, billing, licensing, support, docs, and service access under one hub." },
  { label: "API requests/month", value: "18M+", detail: "Architecture prepared for productized public APIs and private service routing." }
];

export const products: ProductSummary[] = [
  {
    id: "product-restaurant-pos",
    slug: "restaurant-pos",
    name: "Restaurant POS Software",
    shortDescription: "POS, kitchen, inventory, franchise reporting, and GST-ready billing for restaurants.",
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
    id: "service-auth",
    slug: "authentication-service",
    name: "Authentication Service",
    shortDescription: "Hosted auth APIs for sign-in, OTP, identity verification, and tenant-aware security flows.",
    category: "Identity & Access",
    billingModel: "hybrid",
    serviceExposureType: "public_api",
    featured: true
  }
];

export const valueProps = [
  "Centralized commerce and billing without forcing a shared end-user identity across unrelated products.",
  "Private download delivery, license entitlements, and organization-level account ownership designed for serious B2B operations.",
  "Developer service monetization with API keys, gateway routing, usage visibility, and future-ready webhook foundations."
];

export const pricingHighlights = [
  { name: "Product subscriptions", detail: "Monthly and yearly software plans, renewals, and entitlement-aware downloads." },
  { name: "One-time licensing", detail: "License-based delivery for installable business software and enterprise rollouts." },
  { name: "Hosted service billing", detail: "Subscription, usage-based, and hybrid models for APIs and managed services." }
];

