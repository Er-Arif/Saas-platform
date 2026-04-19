import { DataTable, Section } from "@company/ui";

import { downloads } from "../../lib/content";

export default function DownloadsPage() {
  return (
    <Section
      eyebrow="Downloads Center"
      title="Private downloads, version history, and release artifacts."
      description="In production, these rows resolve to short-lived signed URLs once the platform confirms purchase, subscription, and license entitlements."
    >
      <DataTable title="Available downloads" columns={["Filename", "Platform", "Version", "Access"]} rows={downloads} />
    </Section>
  );
}

