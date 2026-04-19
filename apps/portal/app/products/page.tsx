import { DataTable, Section } from "@company/ui";

import { products } from "../../lib/content";

export default function ProductsPage() {
  return (
    <Section
      eyebrow="My Products"
      title="Purchased products and organization entitlements."
      description="Each asset belongs to the organization and can expose installers, licenses, update eligibility, and renewal state."
    >
      <DataTable title="Purchased products" columns={["Product", "Status", "Access", "Version", "Entitlements"]} rows={products} />
    </Section>
  );
}
