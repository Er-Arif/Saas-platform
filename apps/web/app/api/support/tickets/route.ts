import { NextResponse } from "next/server";

import { apiPost } from "../../../../lib/server-api";

export async function POST(request: Request) {
  const formData = await request.formData();
  const payload = {
    product_id: formData.get("product_id") ? String(formData.get("product_id")) : null,
    subject: String(formData.get("subject") ?? ""),
    category: String(formData.get("category") ?? ""),
    priority: String(formData.get("priority") ?? "medium"),
    message: String(formData.get("message") ?? ""),
  };

  try {
    await apiPost("/support/tickets", payload);
    return NextResponse.redirect(new URL("/dashboard/support?success=1", request.url));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Ticket creation failed";
    return NextResponse.redirect(new URL(`/dashboard/support?error=${encodeURIComponent(message)}`, request.url));
  }
}
