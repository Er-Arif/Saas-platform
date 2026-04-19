import { FeatureCard, Section } from "@company/ui";

export default function SettingsPage() {
  return (
    <Section
      eyebrow="Settings"
      title="Domain-aware settings, feature flags, and platform controls."
      description="Settings prepare the platform for subdomain-aware deployment, content management, and staged feature releases."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <FeatureCard title="Domain matrix" description="Configure company.com, app.company.com, admin.company.com, docs.company.com, auth.company.com, and api.company.com." />
        <FeatureCard title="Feature flags" description="Turn on service launches, onboarding flows, and future modules without redeploying every app." />
        <FeatureCard title="Content blocks" description="Manage reusable website content like homepage hero copy, pricing notes, and announcement bars." />
      </div>
    </Section>
  );
}
