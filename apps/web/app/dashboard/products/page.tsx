import Link from "next/link";

import { ConsoleShell } from "../../../components/console-shell";
import { getPortalProducts } from "../../../lib/platform";

export default async function DashboardProductsPage() {
  const products = await getPortalProducts();

  return (
    <ConsoleShell
      title="My products"
      description="See every licensed product owned by your organization, including current activation and renewal posture."
    >
      <div className="space-y-4">
        {products.map((product) => (
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm" key={product.license_key}>
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h2 className="font-display text-2xl font-semibold text-slate-950">{product.product_name}</h2>
                <p className="mt-2 text-sm text-slate-600">
                  License status: {product.license_status} • Activations: {product.activation_count}/{product.max_activations}
                </p>
                <p className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">{product.license_key}</p>
              </div>
              <Link className="text-sm font-semibold text-brand-700" href={`/products/${product.product_slug}`}>
                View product page
              </Link>
            </div>
          </div>
        ))}
      </div>
    </ConsoleShell>
  );
}
