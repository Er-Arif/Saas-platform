import Link from "next/link";

import { Section } from "@company/ui";

import { getCatalogProducts } from "../../lib/platform";

export default async function ProductsPage() {
  const products = await getCatalogProducts();
  return (
    <Section
      eyebrow="Products"
      title="Software products ready for sales, licensing, release delivery, and renewals."
      description="This storefront is designed to grow into your own product marketplace for installable business software."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {products.map((product) => (
          <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm" key={product.slug}>
            <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
              <span>Catalog product</span>
              <span>{product.access_model.replaceAll("_", " ")}</span>
            </div>
            <h2 className="mt-4 font-display text-3xl font-semibold text-slate-950">{product.name}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">{product.short_description}</p>
            <Link className="mt-6 inline-flex text-sm font-semibold text-brand-700" href={`/products/${product.slug}`}>
              Open product page
            </Link>
          </article>
        ))}
      </div>
    </Section>
  );
}
