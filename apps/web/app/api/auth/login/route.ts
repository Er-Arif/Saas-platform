import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { apiPost } from "../../../../lib/server-api";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  try {
    const payload = await apiPost<{ access_token: string; refresh_token: string; token_type: string }>(
      "/auth/login",
      { email, password },
      { accessToken: "" },
    );
    const profile = await apiGet<{ user_id: string; email: string; organization_id: string }>("/auth/me", {
      accessToken: payload.access_token,
    });
    const store = await cookies();
    store.set("platform_access_token", payload.access_token, { httpOnly: true, sameSite: "lax", path: "/" });
    store.set("platform_refresh_token", payload.refresh_token, { httpOnly: true, sameSite: "lax", path: "/" });
    store.set("platform_user_email", profile.email, { sameSite: "lax", path: "/" });
    store.set("platform_organization_id", profile.organization_id, { sameSite: "lax", path: "/" });
    return NextResponse.redirect(new URL("/dashboard", request.url));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed";
    return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(message)}`, request.url));
  }
}

async function apiGet<T>(path: string, options?: { accessToken?: string }): Promise<T> {
  const response = await fetch(`${process.env.COMPANY_API_URL ?? "http://localhost:8000/api/v1"}${path}`, {
    cache: "no-store",
    headers: options?.accessToken ? { Authorization: `Bearer ${options.accessToken}` } : undefined,
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response.json() as Promise<T>;
}
