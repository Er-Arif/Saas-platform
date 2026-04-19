import { DataTable, Section } from "@company/ui";

import { auditLogs } from "../../lib/content";

export default function SupportPage() {
  return (
    <Section
      eyebrow="Support Operations"
      title="Operational visibility for ticketing and escalations."
      description="Support agents and admins can correlate ticket activity with customers, orders, licenses, and service subscriptions."
    >
      <DataTable title="Support activity" columns={["Actor", "Action", "Resource", "Timestamp"]} rows={auditLogs} />
    </Section>
  );
}

