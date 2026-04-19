import { DataTable, Section } from "@company/ui";

import { services } from "../../lib/content";

export default function ServicesPage() {
  return (
    <Section
      eyebrow="Future Scope"
      title="Hosted services and APIs are reserved for a later launch phase."
      description="The data model remains extensible, but the current business platform is intentionally product-first."
    >
      <DataTable title="Reserved scope" columns={["Area", "Exposure", "Host", "Billing", "Visibility"]} rows={services} />
    </Section>
  );
}
