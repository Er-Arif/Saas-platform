import { Button, Section } from "@company/ui";

export default function DocsPage() {
  return (
    <Section
      eyebrow="Documentation"
      title="Developer docs live on a dedicated subdomain."
      description="The company site acts as the discovery layer, while the full docs experience is hosted separately for desktop-product integration, license verification, and release delivery guides."
      actions={<Button href="http://localhost:3003">Open docs site</Button>}
    />
  );
}
