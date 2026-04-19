import { DataTable, Section } from "@company/ui";

import { tickets } from "../../lib/content";

export default function SupportPage() {
  return (
    <Section
      eyebrow="Support"
      title="Track tickets, replies, and operational context."
      description="Support stays tied to your organization, products, service accounts, and billing records so teams can resolve issues faster."
    >
      <DataTable title="Support tickets" columns={["Ticket", "Status", "Priority", "Category"]} rows={tickets} />
    </Section>
  );
}

