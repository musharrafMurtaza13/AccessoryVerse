/**
 * Tiny fetch wrapper for the Go backend.
 * - Base URL comes from VITE_API_URL
 * - Sends the JWT as "Authorization: Bearer <token>"
 * - VITE_USE_MOCK=true (default) makes services use fake in-browser data
 */
export const API_URL: string = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';
export const USE_MOCK: boolean = import.meta.env.VITE_USE_MOCK !== 'false';

const TOKEN_KEY = 'coders_shop_token';

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY) ?? sessionStorage.getItem(TOKEN_KEY),
  set: (token: string, remember: boolean) => {
    tokenStore.clear();
    (remember ? localStorage : sessionStorage).setItem(TOKEN_KEY, token);
  },
  clear: () => {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
  },
};

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = tokenStore.get();
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      message = body.error ?? body.message ?? message;
    } catch {
      /* response had no JSON body */
    }
    throw new ApiError(message, res.status);
  }

  return res.status === 204 ? (undefined as T) : ((await res.json()) as T);
}
