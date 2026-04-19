import { FeatureCard, Section } from "@company/ui";

export default function SupportPage() {
  return (
    <Section
      eyebrow="Support"
      title="Support intake that connects directly to customer, product, license, and download records."
      description="Customers can continue into the portal for tracked tickets, threaded replies, attachments, and entitlement-linked support workflows."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <FeatureCard title="Ticket categories" description="Billing, licensing, deployment, bug report, feature request, and installer/update support." />
        <FeatureCard title="Organization-aware context" description="Support is tied to purchases, subscriptions, licenses, downloads, and machines owned by the organization." />
        <FeatureCard title="Threaded communication" description="Customer replies, internal notes, and attachment-ready architecture are handled in the platform backend." />
      </div>
    </Section>
  );
}
