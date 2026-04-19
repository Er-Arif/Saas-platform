import { Section } from "@company/ui";

export default async function ContactPage({
  searchParams,
}: {
  searchParams?: Promise<{ success?: string; error?: string }>;
}) {
  const params = (await searchParams) ?? {};
  return (
    <Section
      eyebrow="Contact"
      title="Talk to our team about products, rollouts, licensing, or support."
      description="This form maps to the platform contact request workflow so leads can be triaged from the admin panel."
    >
      <form action="/api/contact" className="max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="font-display text-2xl font-semibold text-slate-950">Contact us</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Share your use case and the platform will save it directly for admin follow-up.
        </p>
        {params.success ? (
          <p className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            Your contact request was submitted.
          </p>
        ) : null}
        {params.error ? (
          <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {params.error}
          </p>
        ) : null}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm" name="name" placeholder="Name" required />
          <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm" name="email" placeholder="Work email" required type="email" />
          <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm md:col-span-2" name="company_name" placeholder="Company name" />
          <textarea
            className="min-h-36 rounded-2xl border border-slate-200 px-4 py-3 text-sm md:col-span-2"
            name="message"
            placeholder="Tell us what product or rollout you need help with."
            required
          />
        </div>
        <button className="mt-6 rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white" type="submit">
          Send inquiry
        </button>
      </form>
    </Section>
  );
}
