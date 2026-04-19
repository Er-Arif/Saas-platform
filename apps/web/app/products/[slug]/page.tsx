import { notFound } from "next/navigation";

import { Button, FeatureCard, Section } from "@company/ui";

import { products } from "../../../lib/content";

export default async function ProductDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) {
    notFound();
  }

  return (
    <Section
      eyebrow={product.category}
      title={product.name}
      description={product.shortDescription}
      actions={<Button href="/request-demo">Request a demo</Button>}
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <FeatureCard title="Access model" description={product.accessModel.replaceAll("_", " ")} />
        <FeatureCard title="Pricing model" description={product.pricingModel.replaceAll("_", " ")} />
        <FeatureCard title="Deployment path" description="Configured in the platform for licensing, renewals, documentation, and support visibility." />
      </div>
    </Section>
  );
}

