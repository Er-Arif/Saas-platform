import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import { SiteShell } from "../components/site-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Acme SaaS Labs",
  description: "Parent SaaS company platform for products, APIs, billing, licensing, and support."
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}

