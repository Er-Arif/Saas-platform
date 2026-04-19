import Link from "next/link";

import { ConsoleShell } from "../../../components/console-shell";
import { getPortalDownloads } from "../../../lib/platform";

export default async function DashboardDownloadsPage() {
  const downloads = await getPortalDownloads();

  return (
    <ConsoleShell
      title="Downloads center"
      description="Download entitled installers and release assets using organization-aware signed links."
    >
      <div className="space-y-4">
        {downloads.items.map((item) => (
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm" key={`${item.product_name}-${item.filename}`}>
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="font-display text-2xl font-semibold text-slate-950">{item.filename}</h2>
                <p className="mt-2 text-sm text-slate-600">
                  {item.product_name} • {item.version ?? "current release"} • {item.platform ?? "Any"}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500">{item.checksum ?? "Checksum pending"}</p>
              </div>
              {item.download_url ? (
                <Link className="text-sm font-semibold text-brand-700" href={item.download_url}>
                  Download file
                </Link>
              ) : (
                <span className="text-sm text-slate-500">No active entitlement</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </ConsoleShell>
  );
}
