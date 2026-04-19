import { DataTable, FeatureCard, Section } from "@company/ui";

import { services } from "../../lib/content";

export default function ServicesPage() {
  return (
    <Section
      eyebrow="Future Scope"
      title="Services and APIs are reserved for a later product phase."
      description="The platform keeps room for future hosted services, but the active business workflow is now focused on software products, installers, updates, and licenses."
    >
      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <FeatureCard title="Product-first now" description="Current operations center on catalog, licensing, renewals, downloads, and support." />
        <FeatureCard title="Future-ready later" description="Service modules remain possible without changing the product-store architecture." />
        <FeatureCard title="No active service entitlements" description="This area is intentionally quiet until you launch your first hosted service." />
      </div>
      <DataTable title="Future scope registry" columns={["Area", "Status", "Notes", "Scope"]} rows={services} />
    </Section>
  );
}
