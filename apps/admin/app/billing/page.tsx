import { DataTable, FeatureCard, Section } from "@company/ui";

import { payments } from "../../lib/content";

export default function BillingPage() {
  return (
    <Section
      eyebrow="Billing"
      title="Orders, invoices, payments, taxes, and provider operations."
      description="Track India-first payment flows, GST-ready invoice states, and lifecycle events from one finance workspace."
    >
      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <FeatureCard title="Provider routing" description="Razorpay is the primary adapter, with Cashfree-ready support for future rollout." />
        <FeatureCard title="UPI awareness" description="Payment method metadata keeps UPI and collection modes visible across the billing domain." />
        <FeatureCard title="Webhook handling" description="Payment callbacks are modeled for verification, retries, and later reconciliation flows." />
      </div>
      <DataTable title="Payments" columns={["Invoice", "Provider", "Method", "Status", "Amount"]} rows={payments} />
    </Section>
  );
}

