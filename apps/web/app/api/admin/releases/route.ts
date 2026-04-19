import { NextResponse } from "next/server";

import { apiPostForm } from "../../../../lib/server-api";

export async function POST(request: Request) {
  const formData = await request.formData();
  const productId = String(formData.get("product_id") ?? "");
  try {
    await apiPostForm(`/admin/products/${productId}/releases`, formData);
    return NextResponse.redirect(new URL("/admin/products?success=release-uploaded", request.url));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Release upload failed";
    return NextResponse.redirect(new URL(`/admin/products?error=${encodeURIComponent(message)}`, request.url));
  }
}
