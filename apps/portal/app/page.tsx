import { DataTable, MetricCard, Section } from "@company/ui";

import { invoices, overviewCards, tickets } from "../lib/content";

export default function PortalOverviewPage() {
  return (
    <div className="space-y-8">
      <Section
        eyebrow="Overview"
        title="Your company platform command center."
        description="See subscription health, product access, billing activity, API usage, and support status in one place."
      >
        <div className="grid gap-4 lg:grid-cols-4">
          {overviewCards.map((card) => (
            <MetricCard detail={card.detail} key={card.label} label={card.label} value={card.value} />
          ))}
        </div>
      </Section>
      <DataTable title="Recent invoices" columns={["Invoice", "Status", "Amount", "Collection"]} rows={invoices} />
      <DataTable title="Support summary" columns={["Ticket", "Status", "Priority", "Category"]} rows={tickets} />
    </div>
  );
}

