import { ConsoleShell } from "../../../components/console-shell";
import { getPortalBilling } from "../../../lib/platform";

export default async function DashboardBillingPage() {
  const billing = await getPortalBilling();

  return (
    <ConsoleShell
      title="Billing and subscriptions"
      description="Review invoice status and current subscription posture for your organization."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="font-display text-2xl font-semibold text-slate-950">Invoices</h2>
          <div className="mt-5 space-y-3">
            {billing.invoices.map((invoice) => (
              <div className="rounded-2xl border border-slate-200 p-4" key={invoice.invoice_number}>
                <p className="text-sm font-semibold text-slate-950">{invoice.invoice_number}</p>
                <p className="mt-1 text-sm text-slate-500">{invoice.status}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="font-display text-2xl font-semibold text-slate-950">Subscriptions</h2>
          <div className="mt-5 space-y-3">
            {billing.subscriptions.map((subscription) => (
              <div className="rounded-2xl border border-slate-200 p-4" key={subscription.id}>
                <p className="text-sm font-semibold text-slate-950">{subscription.id}</p>
                <p className="mt-1 text-sm text-slate-500">{subscription.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ConsoleShell>
  );
}
