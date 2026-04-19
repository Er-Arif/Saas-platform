import { Button, Section } from "@company/ui";

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const params = (await searchParams) ?? {};
  return (
    <Section
      eyebrow="Platform Auth"
      title="Log in to the company platform."
      description="This login is only for company.com, app.company.com, and admin.company.com. It is separate from any customer-facing Auth Service you sell as a product."
    >
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <form action="/api/auth/login" className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="font-display text-2xl font-semibold text-slate-950">Platform login</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Sign in to manage your products, downloads, licenses, billing, and support from one workspace.
          </p>
          {params.error ? (
            <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {params.error}
            </p>
          ) : null}
          <div className="mt-6 grid gap-4">
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Work email
              <input
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none ring-brand-200 transition focus:ring-4"
                name="email"
                placeholder="admin@company.local"
                required
                type="email"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Password
              <input
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none ring-brand-200 transition focus:ring-4"
                name="password"
                placeholder="Enter your password"
                required
                type="password"
              />
            </label>
          </div>
          <Button className="mt-6" tone="primary">
            Log in
          </Button>
        </form>
        <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-300">Demo access</p>
          <h3 className="mt-4 font-display text-3xl font-semibold">Use the seeded accounts to test the live flows.</h3>
          <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-200">
            <li>
              <strong>Admin:</strong> admin@company.local / AdminPass123!
            </li>
            <li>
              <strong>Billing:</strong> billing@company.local / BillingPass123!
            </li>
            <li>
              <strong>Customer:</strong> ops@sunrisefoods.example / CustomerPass123!
            </li>
          </ul>
        </div>
      </div>
    </Section>
  );
}

