import { Section } from "@company/ui";

import { getCatalogProducts } from "../../lib/platform";

export default async function RequestDemoPage({
  searchParams,
}: {
  searchParams?: Promise<{ success?: string; error?: string }>;
}) {
  const [params, products] = await Promise.all([
    (searchParams ?? Promise.resolve({} as { success?: string; error?: string })),
    getCatalogProducts(),
  ]);
  return (
    <Section
      eyebrow="Request demo"
      title="Book a guided walkthrough for your team."
      description="Demo requests feed directly into the lead pipeline so your team can qualify product fit, rollout size, and licensing requirements."
    >
      <form action="/api/request-demo" className="max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="font-display text-2xl font-semibold text-slate-950">Request a demo</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Choose a product and we’ll store the request directly in the platform for follow-up.
        </p>
        {params.success ? (
          <p className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            Your demo request was submitted.
          </p>
        ) : null}
        {params.error ? (
          <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {params.error}
          </p>
        ) : null}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <select className="rounded-2xl border border-slate-200 px-4 py-3 text-sm md:col-span-2" name="product_id">
            <option value="">Choose a product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
          <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm" name="name" placeholder="Name" required />
          <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm" name="email" placeholder="Work email" required type="email" />
          <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm" name="company_name" placeholder="Company" />
          <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm" name="preferred_date" type="date" />
          <textarea
            className="min-h-36 rounded-2xl border border-slate-200 px-4 py-3 text-sm md:col-span-2"
            name="notes"
            placeholder="What do you want to evaluate in the demo?"
          />
        </div>
        <button className="mt-6 rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white" type="submit">
          Request demo
        </button>
      </form>
    </Section>
  );
}
