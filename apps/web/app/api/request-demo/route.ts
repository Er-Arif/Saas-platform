import { NextResponse } from "next/server";

import { apiPost } from "../../../lib/server-api";

export async function POST(request: Request) {
  const formData = await request.formData();
  const payload = {
    product_id: formData.get("product_id") ? String(formData.get("product_id")) : null,
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    company_name: String(formData.get("company_name") ?? ""),
    preferred_date: String(formData.get("preferred_date") ?? ""),
    notes: String(formData.get("notes") ?? ""),
  };

  try {
    await apiPost("/support/demo-requests", payload, { accessToken: "" });
    return NextResponse.redirect(new URL("/request-demo?success=1", request.url));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Demo request failed";
    return NextResponse.redirect(new URL(`/request-demo?error=${encodeURIComponent(message)}`, request.url));
  }
}
