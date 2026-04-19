import { Button, Section } from "@company/ui";

export default async function SignupPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const params = (await searchParams) ?? {};
  return (
    <Section
      eyebrow="Platform Auth"
      title="Create your organization account."
      description="Signing up creates a company-platform account and a default organization for billing, purchases, downloads, licenses, and support."
    >
      <form action="/api/auth/signup" className="max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="font-display text-2xl font-semibold text-slate-950">Create account</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          This creates your company account and a default organization workspace inside the software store.
        </p>
        {params.error ? (
          <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {params.error}
          </p>
        ) : null}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Full name
            <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm" name="full_name" required />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Work email
            <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm" name="email" required type="email" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700 md:col-span-2">
            Organization name
            <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm" name="organization_name" required />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700 md:col-span-2">
            Password
            <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm" name="password" required type="password" />
          </label>
        </div>
        <Button className="mt-6" tone="primary">
          Create organization account
        </Button>
      </form>
    </Section>
  );
}
