import { DataTable, FeatureCard, Section } from "@company/ui";

import { services } from "../../lib/content";

export default function ServicesPage() {
  return (
    <Section
      eyebrow="Services / API Access"
      title="Developer-facing subscriptions, API credentials, and tenant mapping."
      description="This portal manages customer-facing access for hosted services while the services themselves remain independently deployable."
    >
      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <FeatureCard title="Environment-aware keys" description="Each API client can issue separate test and live keys." />
        <FeatureCard title="Tenant reference" description="Platform organizations map to service-side tenants through customer tenant references." />
        <FeatureCard title="Gateway visibility" description="Usage and quotas are modeled so `api.company.com` can enforce routing and rate policies." />
      </div>
      <DataTable title="Service accounts" columns={["Service", "Environment", "Tenant reference", "Usage"]} rows={services} />
    </Section>
  );
}

