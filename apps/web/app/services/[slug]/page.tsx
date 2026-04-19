import { notFound } from "next/navigation";

import { Button, FeatureCard, Section } from "@company/ui";

import { services } from "../../../lib/content";

export default async function ServiceDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) {
    notFound();
  }

  return (
    <Section
      eyebrow={service.category}
      title={service.name}
      description={service.shortDescription}
      actions={<Button href="/docs">Documentation entry</Button>}
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <FeatureCard title="Launch status" description="Not active yet. The current platform focus is your software product marketplace." />
        <FeatureCard title="Exposure type" description={service.serviceExposureType.replaceAll("_", " ")} />
        <FeatureCard title="Future readiness" description="The schema and gateway starter remain available when you decide to launch APIs later." />
      </div>
    </Section>
  );
}
