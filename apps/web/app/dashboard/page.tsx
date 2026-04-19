import { MetricCard } from "@company/ui";

import { ConsoleShell } from "../../components/console-shell";
import { getPortalBilling, getPortalDownloads, getPortalOverview, getPortalProducts, getPortalServices } from "../../lib/platform";

export default async function DashboardPage() {
  const [overview, products, downloads, billing, services] = await Promise.all([
    getPortalOverview(),
    getPortalProducts(),
    getPortalDownloads(),
    getPortalBilling(),
    getPortalServices(),
  ]);

  return (
    <ConsoleShell
      title="Customer workspace"
      description="Manage organization-owned products, licenses, updates, downloads, billing, and support from this single connected portal."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard label="Active subscriptions" value={String(overview.summary.active_subscriptions)} />
        <MetricCard label="Product licenses" value={String(overview.summary.product_licenses)} />
        <MetricCard label="Available downloads" value={String(overview.summary.available_downloads)} />
        <MetricCard label="API clients" value={String(services.api_clients.length)} />
        <MetricCard label="Open tickets" value={String(overview.summary.open_tickets)} />
        <MetricCard label="Invoices" value={String(billing.invoices.length)} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="font-display text-2xl font-semibold text-slate-950">Purchased products</h2>
          <div className="mt-5 space-y-4">
            {products.map((product) => (
              <div className="rounded-2xl border border-slate-200 p-4" key={product.license_key}>
                <p className="text-sm font-semibold text-slate-950">{product.product_name}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {product.license_status} • {product.activation_count}/{product.max_activations} activations used
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="font-display text-2xl font-semibold text-slate-950">Latest downloads</h2>
          <div className="mt-5 space-y-4">
            {downloads.items.map((item) => (
              <div className="rounded-2xl border border-slate-200 p-4" key={`${item.product_name}-${item.filename}`}>
                <p className="text-sm font-semibold text-slate-950">{item.filename}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {item.product_name} • {item.version ?? "current release"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ConsoleShell>
  );
}
