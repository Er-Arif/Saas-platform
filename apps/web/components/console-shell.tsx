import Link from "next/link";
import type { PropsWithChildren } from "react";

const dashboardLinks = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/products", label: "My Products" },
  { href: "/dashboard/downloads", label: "Downloads" },
  { href: "/dashboard/licenses", label: "Licenses" },
  { href: "/dashboard/billing", label: "Billing" },
  { href: "/dashboard/support", label: "Support" },
];

export function ConsoleShell({
  title,
  description,
  scope = "dashboard",
  children,
}: PropsWithChildren<{
  title: string;
  description: string;
  scope?: "dashboard" | "admin";
}>) {
  const links =
    scope === "admin"
      ? [
          { href: "/dashboard", label: "Customer dashboard" },
          { href: "/admin/products", label: "Manage products" },
          { href: "/docs", label: "Docs" },
        ]
      : dashboardLinks;

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
            {scope === "admin" ? "Admin" : "Workspace"}
          </p>
          <nav className="mt-4 grid gap-2">
            {links.map((link) => (
              <Link
                className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="space-y-6">
          <div>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-slate-950">{title}</h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">{description}</p>
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}
