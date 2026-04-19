import { FeatureCard, Section } from "@company/ui";

export default function SalesPage() {
  return (
    <Section
      eyebrow="Sales / Demo Requests"
      title="Keep enterprise conversations visible after the first inquiry."
      description="For customers evaluating custom deployments or premium add-ons, the portal can surface request history and handoff progress."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <FeatureCard title="Request history" description="Track submitted demo requests, sales inquiries, and enterprise follow-ups tied to your organization." />
        <FeatureCard title="Commercial continuity" description="Conversations can turn directly into quotes, subscriptions, deployments, and support records on the same platform." />
      </div>
    </Section>
  );
}
