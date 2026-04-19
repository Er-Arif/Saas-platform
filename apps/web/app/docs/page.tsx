import { FeatureCard, Section } from "@company/ui";

export default function DocsPage() {
  return (
    <Section
      eyebrow="Documentation"
      title="Use one connected product platform for licensing, distribution, and updates."
      description="This documentation is now embedded into the main website so you can stay on one domain and still understand how product releases and desktop integrations work."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <FeatureCard
          title="Desktop product integration"
          description="Your POS or future desktop apps call the platform to activate a license, verify device entitlement, and check for updates."
        />
        <FeatureCard
          title="Release publishing"
          description="Create a product in admin, upload a release build, mark the latest version, and customers immediately see it in their downloads center."
        />
        <FeatureCard
          title="Private delivery"
          description="Files stay private in storage, and the platform issues short-lived download links only for customers with valid organization entitlements."
        />
      </div>
    </Section>
  );
}
