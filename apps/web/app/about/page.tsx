import { FeatureCard, Section } from "@company/ui";

export default function AboutPage() {
  return (
    <Section
      eyebrow="About"
      title="We build software businesses around durable operations, not fragile demos."
      description="This company platform exists to help Acme SaaS Labs market, sell, deliver, support, and scale software products with a single commercial backbone."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <FeatureCard title="Commercial backbone" description="Orders, invoices, subscriptions, licenses, downloads, and support all live on the parent company platform." />
        <FeatureCard title="Independent products" description="Downstream products can keep their own user models, tenants, and auth systems without being forced into a super-app identity." />
        <FeatureCard title="India-ready operations" description="Razorpay-first billing, UPI-aware payment support, and GST invoice structure are built into the platform foundation." />
      </div>
    </Section>
  );
}
