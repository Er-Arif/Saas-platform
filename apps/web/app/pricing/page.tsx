import { FeatureCard, Section } from "@company/ui";

import { getPricingPlans } from "../../lib/platform";

export default async function PricingPage() {
  const plans = await getPricingPlans();
  return (
    <Section
      eyebrow="Pricing"
      title="Flexible pricing for licensed software, installer access, and support."
      description="The platform supports one-time, recurring, hybrid, and enterprise-custom product billing with GST-aware invoicing."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <FeatureCard
            description={`${plan.currency} ${(plan.amount / 100).toFixed(2)}${plan.billing_interval ? ` per ${plan.billing_interval}` : ""}`}
            key={plan.id}
            title={plan.name}
          />
        ))}
      </div>
    </Section>
  );
}
