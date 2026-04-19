import { notFound } from "next/navigation";

import { Button, FeatureCard, Section } from "@company/ui";

import { getCatalogProduct } from "../../../lib/platform";

export default async function ProductDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let product;
  try {
    product = await getCatalogProduct(slug);
  } catch {
    notFound();
  }

  return (
    <Section
      eyebrow={product.category ?? "Product"}
      title={product.name}
      description={product.short_description}
      actions={<Button href="/request-demo">Request a demo</Button>}
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <FeatureCard title="Access model" description={product.access_model.replaceAll("_", " ")} />
        <FeatureCard title="Pricing model" description={product.pricing_model.replaceAll("_", " ")} />
        <FeatureCard title="Deployment path" description={product.deployment_type.replaceAll("_", " ")} />
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h3 className="font-display text-2xl font-semibold text-slate-950">Product overview</h3>
          <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">{product.long_description}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            {product.platform_compatibility.map((item) => (
              <span className="rounded-full bg-slate-100 px-3 py-2" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="font-display text-2xl font-semibold text-slate-950">Release history</h3>
            <div className="mt-4 space-y-4">
              {product.versions.map((version) => (
                <div className="rounded-2xl border border-slate-200 p-4" key={version.id}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-slate-950">{version.version}</p>
                    {version.is_latest ? (
                      <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">Latest</span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{version.release_notes}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="font-display text-2xl font-semibold text-slate-950">Pricing plans</h3>
            <div className="mt-4 space-y-3">
              {product.plans.length ? (
                product.plans.map((plan) => (
                  <div className="flex items-center justify-between rounded-2xl border border-slate-200 p-4" key={plan.id}>
                    <div>
                      <p className="text-sm font-semibold text-slate-950">{plan.name}</p>
                      <p className="text-sm text-slate-500">{plan.billing_interval ?? "custom"}</p>
                    </div>
                    <p className="text-sm font-semibold text-brand-700">
                      {plan.currency} {(plan.amount / 100).toFixed(2)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-600">Pricing is managed through quote or offline sales for this product.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

