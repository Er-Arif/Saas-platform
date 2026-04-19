import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import { AdminShell } from "../components/admin-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Internal operations console for the company platform."
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}

