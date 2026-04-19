import Link from "next/link";
import { Manrope, Sora } from "next/font/google";
import type { PropsWithChildren } from "react";

import { cn } from "@company/ui";

import { sidebar } from "../lib/content";

const sans = Manrope({ subsets: ["latin"], variable: "--font-sans" });
const display = Sora({ subsets: ["latin"], variable: "--font-display" });

export function PortalShell({ children }: PropsWithChildren) {
  return (
    <div className={cn(sans.variable, display.variable, "min-h-screen bg-slate-100 text-slate-950")}>
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-r border-slate-200 bg-slate-950 px-6 py-8 text-white">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-300">Customer Portal</p>
            <h1 className="mt-4 font-display text-2xl font-semibold">Sunrise Foods Pvt Ltd</h1>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Organization-owned purchases, downloads, billing, API access, and support.
            </p>
          </div>
          <nav className="mt-10 grid gap-2">
            {sidebar.map((item) => (
              <Link
                className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="px-6 py-8 lg:px-10">{children}</main>
      </div>
    </div>
  );
}

