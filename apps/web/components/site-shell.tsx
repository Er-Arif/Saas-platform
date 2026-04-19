import Link from "next/link";
import { Manrope, Sora } from "next/font/google";
import type { PropsWithChildren } from "react";

import { Button, cn } from "@company/ui";

import { navigation } from "../lib/content";

const sans = Manrope({ subsets: ["latin"], variable: "--font-sans" });
const display = Sora({ subsets: ["latin"], variable: "--font-display" });

export function SiteShell({ children }: PropsWithChildren) {
  return (
    <div className={cn(sans.variable, display.variable, "min-h-screen bg-sand text-ink")}>
      <div className="absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top,_rgba(49,127,220,0.18),_transparent_56%)]" />
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link className="font-display text-xl font-semibold tracking-tight text-slate-950" href="/">
          Acme SaaS Labs
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {navigation.map((item) => (
            <Link className="text-sm font-medium text-slate-600 transition hover:text-slate-950" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button href="/login" tone="ghost">
            Login
          </Button>
          <Button href="/request-demo">Talk to Sales</Button>
        </div>
      </header>
      {children}
      <footer className="border-t border-slate-200/80 bg-white/70">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-4 lg:px-10">
          <div>
            <p className="font-display text-lg font-semibold">Acme SaaS Labs</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Your own software store for product sales, private downloads, machine licensing, renewals, and support.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Products</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>Restaurant POS</li>
              <li>Hospital Information System</li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Platform Capabilities</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>Signed downloads</li>
              <li>License verification and updates</li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Company</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>hello@company.local</li>
              <li>Bengaluru, India</li>
              <li>GST-ready billing and enterprise onboarding</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
