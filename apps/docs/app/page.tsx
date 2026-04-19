import Link from "next/link";

import { FeatureCard, Section } from "@company/ui";

export default function DocsHomePage() {
  return (
    <Section
      eyebrow="Product Docs"
      title="Connect desktop products to licensing, updates, and secure distribution."
      description="These docs focus on software products sold through the company platform, starting with the Restaurant POS integration path."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <FeatureCard title="Desktop Product Integration" description="Activate machines, verify licenses, check updates, and fetch entitled installers from the platform." />
        <FeatureCard title="Future Services Scope" description="The architecture still leaves room for hosted services later, but today's docs stay product-first." />
      </div>
      <div className="mt-8 flex gap-4">
        <Link className="rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white" href="/desktop-products">
          Read product integration docs
        </Link>
        <Link className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white" href="/api-gateway">
          Read roadmap notes
        </Link>
      </div>
    </Section>
  );
}
