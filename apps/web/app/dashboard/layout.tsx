import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

import { getSession } from "../../lib/server-api";

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const session = await getSession();
  if (!session.accessToken) {
    redirect("/login");
  }
  return children;
}
