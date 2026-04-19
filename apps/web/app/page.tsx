import Link from "next/link";

import { Button, FeatureCard, MetricCard, Section } from "@company/ui";

import { products, stats, valueProps } from "../lib/content";

export default function HomePage() {
  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:px-10 lg:py-24">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-600">Software product platform</p>
          <h1 className="mt-6 max-w-4xl font-display text-5xl font-semibold tracking-tight text-slate-950 lg:text-7xl">
            Build your own software store for product sales, licensing, updates, and secure distribution.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Acme SaaS Labs now acts as the commercial backbone for installable and enterprise software. Sell your
            products, issue licenses, publish releases, deliver installers privately, and support customers from one
            polished platform.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/products">Explore Products</Button>
            <Button href="/docs" tone="secondary">
              View Integration Docs
            </Button>
          </div>
        </div>
        <div className="grid gap-4">
          {stats.map((stat) => (
            <MetricCard detail={stat.detail} key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </div>
      </section>

      <Section
        eyebrow="Why choose us"
        title="Purpose-built for companies shipping licensed desktop and enterprise software."
        description="The platform centralizes billing, downloads, renewals, and support while each downstream product keeps its own internal runtime and user model."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {valueProps.map((item, index) => (
            <FeatureCard
              description={item}
              key={item}
              meta={`Capability 0${index + 1}`}
              title={["Product store presence", "Private software delivery", "Product update lifecycle"][index] ?? "Capability"}
            />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Featured Products"
        title="Software products that can be sold, deployed, renewed, and supported at scale."
        actions={<Button href="/products" tone="secondary">View all products</Button>}
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {products.map((product) => (
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm" key={product.slug}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">{product.category}</p>
              <h3 className="mt-4 font-display text-2xl font-semibold text-slate-950">{product.name}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">{product.shortDescription}</p>
              <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                <span>{product.accessModel.replaceAll("_", " ")}</span>
                <span>{product.pricingModel.replaceAll("_", " ")}</span>
              </div>
              <Link className="mt-6 inline-flex text-sm font-semibold text-brand-700" href={`/products/${product.slug}`}>
                View product details
              </Link>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="How it works"
        title="A release and licensing workflow built around real desktop software."
        description="This platform is ready to work like your own Microsoft Store or Play Store for business software, starting with Restaurant POS."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <FeatureCard title="1. Sell the product" description="Showcase a product page, pricing, deployment path, and sales/demo CTA from the public website." />
          <FeatureCard title="2. Issue entitlements" description="Grant organization-owned licenses, invoices, renewals, and download access after purchase." />
          <FeatureCard title="3. Verify and update" description="Desktop products can call the platform to activate machines, verify licenses, and fetch the newest entitled release." />
        </div>
      </Section>
    </>
  );
}
