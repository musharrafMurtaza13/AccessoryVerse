/**
 * Fetch wrapper for the Go API on Render.
 * Sends the saved Neon token as "Authorization: Bearer <token>" when signed in.
 */
export const API_URL: string = (
  import.meta.env.VITE_API_URL ?? 'https://online-api-with-golang-monolith.onrender.com'
).replace(/\/$/, '');

export const NEON_AUTH_URL: string = import.meta.env.VITE_NEON_AUTH_URL ?? '';
export const USE_MOCK_AUTH: boolean = !NEON_AUTH_URL;
// If USE_MOCK_AUTH is true, the app will not use Neon for authentication and will instead use a mock auth flow.
export const USE_MOCK_LISTINGS: boolean = import.meta.env.VITE_USE_MOCK_LISTINGS === 'true';

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

  if (res.status === 204) return undefined as T;
  const text = await res.text();
  return (text ? JSON.parse(text) : undefined) as T;
}