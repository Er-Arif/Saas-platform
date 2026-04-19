import { cookies } from "next/headers";

const apiBaseUrl = process.env.COMPANY_API_URL ?? "http://localhost:8000/api/v1";

async function parseError(response: Response) {
  const text = await response.text();
  return text || `Request failed with status ${response.status}`;
}

export async function apiGet<T>(path: string, options?: { accessToken?: string; cache?: RequestCache }): Promise<T> {
  const token = options?.accessToken ?? (await cookies()).get("platform_access_token")?.value;
  const response = await fetch(`${apiBaseUrl}${path}`, {
    cache: options?.cache ?? "no-store",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  if (!response.ok) {
    throw new Error(await parseError(response));
  }
  return response.json() as Promise<T>;
}

export async function apiPost<T>(path: string, body: unknown, options?: { accessToken?: string }): Promise<T> {
  const token = options?.accessToken ?? (await cookies()).get("platform_access_token")?.value;
  const response = await fetch(`${apiBaseUrl}${path}`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(await parseError(response));
  }
  return response.json() as Promise<T>;
}

export async function apiPostForm<T>(path: string, formData: FormData, options?: { accessToken?: string }): Promise<T> {
  const token = options?.accessToken ?? (await cookies()).get("platform_access_token")?.value;
  const response = await fetch(`${apiBaseUrl}${path}`, {
    method: "POST",
    cache: "no-store",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: formData,
  });
  if (!response.ok) {
    throw new Error(await parseError(response));
  }
  return response.json() as Promise<T>;
}

export async function getSession() {
  const store = await cookies();
  return {
    accessToken: store.get("platform_access_token")?.value,
    refreshToken: store.get("platform_refresh_token")?.value,
    userEmail: store.get("platform_user_email")?.value,
    organizationId: store.get("platform_organization_id")?.value,
  };
}
