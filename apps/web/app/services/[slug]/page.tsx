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
        <FeatureCard title="Billing model" description={service.billingModel.replaceAll("_", " ")} />
        <FeatureCard title="Exposure type" description={service.serviceExposureType.replaceAll("_", " ")} />
        <FeatureCard title="Gateway readiness" description="Designed to route through api.company.com with rate limits, logging, and versioning." />
      </div>
    </Section>
  );
}

