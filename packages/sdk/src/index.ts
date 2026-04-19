const DEFAULT_HEADERS = {
  "Content-Type": "application/json"
};

export class ApiClient {
  constructor(private readonly baseUrl: string) {}

  async get<T>(path: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      headers: DEFAULT_HEADERS,
      credentials: "include"
    });
    return this.handle<T>(response);
  }

  async post<T>(path: string, body: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: DEFAULT_HEADERS,
      credentials: "include",
      body: JSON.stringify(body)
    });
    return this.handle<T>(response);
  }

  private async handle<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const payload = await response.text();
      throw new Error(payload || `Request failed with status ${response.status}`);
    }
    return (await response.json()) as T;
  }
}

export function createApiClient(baseUrl: string) {
  return new ApiClient(baseUrl);
}

