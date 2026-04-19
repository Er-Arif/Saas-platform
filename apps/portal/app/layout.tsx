import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import { PortalShell } from "../components/portal-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Customer Portal",
  description: "Organization dashboard for products, billing, downloads, and support."
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <PortalShell>{children}</PortalShell>
      </body>
    </html>
  );
}

