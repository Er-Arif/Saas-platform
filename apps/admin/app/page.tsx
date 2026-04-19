import { DataTable, MetricCard, Section } from "@company/ui";

import { adminCards, auditLogs } from "../lib/content";

export default function AdminOverviewPage() {
  return (
    <div className="space-y-8">
      <Section
        eyebrow="Overview"
        title="Run the software product business from one internal console."
        description="Keep catalog, billing, release delivery, licensing, and support aligned without collapsing customer-facing product identities into one global account system."
      >
        <div className="grid gap-4 lg:grid-cols-4">
          {adminCards.map((card) => (
            <MetricCard detail={card.detail} key={card.label} label={card.label} value={card.value} />
          ))}
        </div>
      </Section>
      <DataTable title="Recent audit logs" columns={["Actor", "Action", "Resource", "Timestamp"]} rows={auditLogs} />
    </div>
  );
}
