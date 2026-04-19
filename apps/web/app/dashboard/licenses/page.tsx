import { ConsoleShell } from "../../../components/console-shell";
import { getPortalLicenses } from "../../../lib/platform";

export default async function DashboardLicensesPage() {
  const licenses = await getPortalLicenses();

  return (
    <ConsoleShell
      title="License management"
      description="Track active keys, renewal dates, and activation policies for each product license owned by your organization."
    >
      <div className="space-y-4">
        {licenses.map((license) => (
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm" key={license.license_key}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">{license.status}</p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-slate-950">{license.license_key}</h2>
            <p className="mt-3 text-sm text-slate-600">
              Max activations: {license.max_activations} • Expires: {license.expires_at ?? "No expiry"}
            </p>
          </div>
        ))}
      </div>
    </ConsoleShell>
  );
}
