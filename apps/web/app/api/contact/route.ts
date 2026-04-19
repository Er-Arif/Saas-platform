import { NextResponse } from "next/server";

import { apiPost } from "../../../lib/server-api";

export async function POST(request: Request) {
  const formData = await request.formData();
  const payload = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    company_name: String(formData.get("company_name") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  try {
    await apiPost("/support/contact-requests", payload, { accessToken: "" });
    return NextResponse.redirect(new URL("/contact?success=1", request.url));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Contact request failed";
    return NextResponse.redirect(new URL(`/contact?error=${encodeURIComponent(message)}`, request.url));
  }
}
