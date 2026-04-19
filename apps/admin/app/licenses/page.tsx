import { DataTable, Section } from "@company/ui";

import { licenses } from "../../lib/content";

export default function LicensesPage() {
  return (
    <Section
      eyebrow="Licenses"
      title="Activation limits, device binding, and entitlement oversight."
      description="Internal teams can issue, reissue, inspect, and audit product licenses without changing the product-specific user systems customers may run."
    >
      <DataTable title="License registry" columns={["Asset", "Identifier", "Usage", "Status", "Organization"]} rows={licenses} />
    </Section>
  );
}
