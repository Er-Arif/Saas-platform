import { NextResponse } from "next/server";

import { apiPost } from "../../../../lib/server-api";

export async function POST(request: Request) {
  const formData = await request.formData();
  const payload = {
    name: String(formData.get("name") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    short_description: String(formData.get("short_description") ?? ""),
    long_description: String(formData.get("long_description") ?? ""),
    category_name: String(formData.get("category_name") ?? ""),
    type: String(formData.get("type") ?? "desktop_software"),
    pricing_model: String(formData.get("pricing_model") ?? "monthly_subscription"),
    deployment_type: String(formData.get("deployment_type") ?? "downloadable"),
    access_model: String(formData.get("access_model") ?? "license_based"),
    support_model: String(formData.get("support_model") ?? ""),
    documentation_link: String(formData.get("documentation_link") ?? ""),
    platform_compatibility: String(formData.get("platform_compatibility") ?? "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    featured: formData.get("featured") === "on",
    enterprise_custom: formData.get("enterprise_custom") === "on",
    status: String(formData.get("status") ?? "active"),
  };
  try {
    await apiPost("/admin/products", payload);
    return NextResponse.redirect(new URL("/admin/products?success=product-created", request.url));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Product creation failed";
    return NextResponse.redirect(new URL(`/admin/products?error=${encodeURIComponent(message)}`, request.url));
  }
}
