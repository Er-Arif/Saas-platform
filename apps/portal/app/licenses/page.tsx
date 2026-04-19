import { DataTable, Section } from "@company/ui";

import { licenses } from "../../lib/content";

export default function LicensesPage() {
  return (
    <Section
      eyebrow="Licenses"
      title="Software license and activation management."
      description="Track keys, activation counts, expiry windows, machine binding, and linked service tenants without mixing them into product-internal user systems."
    >
      <DataTable title="Active licenses" columns={["Identifier", "Status", "Usage", "Expiry", "Notes"]} rows={licenses} />
    </Section>
  );
}

