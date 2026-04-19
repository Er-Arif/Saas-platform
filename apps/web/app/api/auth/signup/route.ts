import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { apiPost } from "../../../../lib/server-api";

export async function POST(request: Request) {
  const formData = await request.formData();
  const payload = {
    full_name: String(formData.get("full_name") ?? ""),
    email: String(formData.get("email") ?? ""),
    organization_name: String(formData.get("organization_name") ?? ""),
    password: String(formData.get("password") ?? ""),
  };

  try {
    const tokens = await apiPost<{ access_token: string; refresh_token: string; token_type: string }>(
      "/auth/signup",
      payload,
      { accessToken: "" },
    );
    const profile = await fetch(`${process.env.COMPANY_API_URL ?? "http://localhost:8000/api/v1"}/auth/me`, {
      cache: "no-store",
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    }).then(async (response) => {
      if (!response.ok) {
        throw new Error(await response.text());
      }
      return response.json() as Promise<{ email: string; organization_id: string }>;
    });
    const store = await cookies();
    store.set("platform_access_token", tokens.access_token, { httpOnly: true, sameSite: "lax", path: "/" });
    store.set("platform_refresh_token", tokens.refresh_token, { httpOnly: true, sameSite: "lax", path: "/" });
    store.set("platform_user_email", profile.email, { sameSite: "lax", path: "/" });
    store.set("platform_organization_id", profile.organization_id, { sameSite: "lax", path: "/" });
    return NextResponse.redirect(new URL("/dashboard", request.url));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Signup failed";
    return NextResponse.redirect(new URL(`/signup?error=${encodeURIComponent(message)}`, request.url));
  }
}
