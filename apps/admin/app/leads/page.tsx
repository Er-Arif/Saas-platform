import { DataTable, Section } from "@company/ui";

import { leads } from "../../lib/content";

export default function LeadsPage() {
  return (
    <Section
      eyebrow="Leads"
      title="Contact, sales, and demo pipeline management."
      description="Keep commercial follow-up visible inside the same platform that owns pricing, subscriptions, and deployment workflows."
    >
      <DataTable title="Lead pipeline" columns={["Contact", "Type", "Interest", "Status"]} rows={leads} />
    </Section>
  );
}

