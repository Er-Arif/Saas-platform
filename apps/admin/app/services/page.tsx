import { DataTable, Section } from "@company/ui";

import { services } from "../../lib/content";

export default function ServicesPage() {
  return (
    <Section
      eyebrow="Services"
      title="Public APIs, internal managed services, and service tenant readiness."
      description="Use service exposure type and customer tenant references to keep public products and internal-managed capabilities organized."
    >
      <DataTable title="Service catalog" columns={["Service", "Exposure", "Host", "Billing", "Visibility"]} rows={services} />
    </Section>
  );
}

