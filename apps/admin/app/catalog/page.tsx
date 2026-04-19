import { DataTable, Section } from "@company/ui";

import { catalog } from "../../lib/content";

export default function CatalogPage() {
  return (
    <Section
      eyebrow="Catalog"
      title="Products, services, pricing, and visibility controls."
      description="This module is where product managers and service managers shape what is publicly sold and how entitlements are expressed."
    >
      <DataTable title="Catalog entries" columns={["Name", "Type", "Access / Exposure", "Featured", "Status"]} rows={catalog} />
    </Section>
  );
}

