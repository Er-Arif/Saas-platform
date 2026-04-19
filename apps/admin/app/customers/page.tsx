import { DataTable, Section } from "@company/ui";

import { customers } from "../../lib/content";

export default function CustomersPage() {
  return (
    <Section
      eyebrow="Customers"
      title="Manage organizations, memberships, and commercial relationships."
      description="Customer assets belong to organizations, while users act through memberships and role assignments."
    >
      <DataTable title="Organizations" columns={["Organization", "Primary contact", "Portfolio", "Status"]} rows={customers} />
    </Section>
  );
}

