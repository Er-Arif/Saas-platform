import { DataTable, FeatureCard, Section } from "@company/ui";

import { invoices } from "../../lib/content";

export default function BillingPage() {
  return (
    <Section
      eyebrow="Billing"
      title="Subscriptions, invoices, GST details, and payment history."
      description="India-first billing flows support Razorpay, UPI-aware checkouts, GST breakdowns, and future Cashfree integration."
    >
      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <FeatureCard title="Primary provider" description="Razorpay adapter is the default payment implementation." />
        <FeatureCard title="GST-ready invoices" description="Invoice models support GSTIN, place of supply, and CGST/SGST/IGST amounts." />
        <FeatureCard title="Subscription controls" description="Plan renewals, upgrades, downgrades, and dunning-ready lifecycle tracking." />
      </div>
      <DataTable title="Invoice history" columns={["Invoice", "Status", "Amount", "Collection"]} rows={invoices} />
    </Section>
  );
}

