import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import { SiteShell } from "../components/site-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Acme SaaS Labs",
  description: "Software product platform for catalog, billing, licensing, secure downloads, and updates."
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
