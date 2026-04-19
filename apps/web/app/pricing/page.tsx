import { FeatureCard, Section } from "@company/ui";

import { pricingHighlights } from "../../lib/content";

export default function PricingPage() {
  return (
    <Section
      eyebrow="Pricing"
      title="Flexible pricing across software products, managed deployments, and APIs."
      description="The platform supports one-time, recurring, usage-based, hybrid, and enterprise-custom models with GST-aware invoicing."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {pricingHighlights.map((item) => (
          <FeatureCard description={item.detail} key={item.name} title={item.name} />
        ))}
      </div>
    </Section>
  );
}

