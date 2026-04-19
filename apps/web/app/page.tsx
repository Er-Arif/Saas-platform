import Link from "next/link";

import { Button, FeatureCard, MetricCard, Section } from "@company/ui";

import { products, services, stats, valueProps } from "../lib/content";

export default function HomePage() {
  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:px-10 lg:py-24">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-600">SaaS company platform</p>
          <h1 className="mt-6 max-w-4xl font-display text-5xl font-semibold tracking-tight text-slate-950 lg:text-7xl">
            Sell software, manage licenses, and grow API services from one serious business hub.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Acme SaaS Labs gives your software business a premium public presence plus the operational platform behind
            products, hosted services, billing, downloads, licenses, and customer support.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/products">Explore Products</Button>
            <Button href="/services" tone="secondary">
              Browse Services
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
        title="Purpose-built for software companies with both products and services."
        description="The platform keeps company commerce centralized while respecting that each downstream product may have its own independent user model."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {valueProps.map((item, index) => (
            <FeatureCard
              description={item}
              key={item}
              meta={`Capability 0${index + 1}`}
              title={["Business-ready platform auth", "Private software delivery", "Monetized developer services"][index] ?? "Capability"}
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
        eyebrow="Featured Services"
        title="Hosted capabilities that developers and businesses can subscribe to under your company domain."
        actions={<Button href="/services" tone="secondary">View all services</Button>}
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((service) => (
            <FeatureCard
              description={service.shortDescription}
              key={service.slug}
              meta={service.serviceExposureType.replaceAll("_", " ")}
              title={service.name}
            />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Testimonials"
        title="Proof blocks are ready for live customer stories."
        description="Keep these placeholders during implementation, then replace them with verified testimonials and logos as your portfolio grows."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <FeatureCard title="Multi-outlet operations" description="Placeholder for a restaurant group expanding from 3 to 25 outlets with POS, kitchen, and franchise reporting." />
          <FeatureCard title="Healthcare modernization" description="Placeholder for a hospital network replacing manual workflows with a centralized HIS deployment." />
          <FeatureCard title="Developer onboarding" description="Placeholder for an engineering team integrating the Authentication Service through the gateway and portal." />
        </div>
      </Section>
    </>
  );
}

