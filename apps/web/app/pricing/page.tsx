import { FeatureCard, Section } from "@company/ui";

import { pricingHighlights } from "../../lib/content";

export default function PricingPage() {
  return (
    <Section
      eyebrow="Pricing"
      title="Flexible pricing for licensed software, installer access, and support."
      description="The platform supports one-time, recurring, hybrid, and enterprise-custom product billing with GST-aware invoicing."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {pricingHighlights.map((item) => (
          <FeatureCard description={item.detail} key={item.name} title={item.name} />
        ))}
      </div>
    </Section>
  );
}
