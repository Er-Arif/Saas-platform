import Link from "next/link";

import { Section } from "@company/ui";

import { products } from "../../lib/content";

export default function ProductsPage() {
  return (
    <Section
      eyebrow="Products"
      title="Business software products ready for sales, delivery, and renewals."
      description="Filterable catalog patterns can expand here later; this starter ships the real information architecture and content structure."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {products.map((product) => (
          <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm" key={product.slug}>
            <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
              <span>{product.category}</span>
              <span>{product.accessModel.replaceAll("_", " ")}</span>
            </div>
            <h2 className="mt-4 font-display text-3xl font-semibold text-slate-950">{product.name}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">{product.shortDescription}</p>
            <Link className="mt-6 inline-flex text-sm font-semibold text-brand-700" href={`/products/${product.slug}`}>
              Open product page
            </Link>
          </article>
        ))}
      </div>
    </Section>
  );
}

