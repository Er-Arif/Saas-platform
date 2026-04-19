import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const store = await cookies();
  store.delete("platform_access_token");
  store.delete("platform_refresh_token");
  store.delete("platform_user_email");
  store.delete("platform_organization_id");
  return NextResponse.redirect(new URL("/", request.url));
}
