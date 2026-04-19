import { Manrope, Sora } from "next/font/google";
import type { Metadata } from "next";
import Link from "next/link";
import type { PropsWithChildren } from "react";

import { cn } from "@company/ui";

import "./globals.css";

const sans = Manrope({ subsets: ["latin"], variable: "--font-sans" });
const display = Sora({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Developer Docs",
  description: "Desktop product integration docs for licensing, updates, and secure downloads."
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={cn(sans.variable, display.variable, "bg-slate-950 text-white")}>
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-10">
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
            <Link className="font-display text-xl font-semibold" href="/">
              Acme Docs
            </Link>
            <nav className="flex flex-wrap gap-5 text-sm text-slate-300">
              <Link href="/">Overview</Link>
              <Link href="/desktop-products">Desktop Products</Link>
              <Link href="/api-gateway">Future Scope</Link>
            </nav>
          </header>
          <main className="py-12">{children}</main>
        </div>
      </body>
    </html>
  );
}
