import { FeatureCard, Section } from "@company/ui";

export default function ApiGatewayDocsPage() {
  return (
    <Section
      eyebrow="Future Services Scope"
      title="The platform still leaves room for hosted APIs later."
      description="Gateway and service concepts stay in the architecture, but they are intentionally downscoped until product distribution and licensing are fully established."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <FeatureCard title="Preserved in schema" description="Service, gateway, and webhook models stay available for future expansion." />
        <FeatureCard title="Not front-and-center" description="The active customer and admin experience is now centered on products, not APIs." />
        <FeatureCard title="Safe to revisit later" description="You can add auth, OTP, or notification services later without redesigning the product store." />
      </div>
    </Section>
  );
}
