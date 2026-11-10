/**
 * Fetch wrapper for your Go API on Render.
 * Sends the saved token as "Authorization: Bearer <token>" when signed in.
 */
export const API_URL: string = (
  import.meta.env.VITE_API_URL ?? 'https://online-api-with-golang-monolith.onrender.com'
).replace(/\/$/, '');

export const SIGNUP_PATH: string = import.meta.env.VITE_SIGNUP_PATH ?? '/signup';
export const SIGNIN_PATH: string = import.meta.env.VITE_SIGNIN_PATH ?? '/signin';
export const USE_MOCK_AUTH: boolean = import.meta.env.VITE_USE_MOCK_AUTH === 'true';
export const USE_MOCK_LISTINGS: boolean = import.meta.env.VITE_USE_MOCK_LISTINGS === 'true';

const TOKEN_KEY = 'coders_shop_token';
const USER_KEY = 'coders_shop_user';

/** Saves token + user together. remember=true -> localStorage, else sessionStorage. */
export const session = {
  token: () => localStorage.getItem(TOKEN_KEY) ?? sessionStorage.getItem(TOKEN_KEY),
  user: <T>(): T | null => {
    const raw = localStorage.getItem(USER_KEY) ?? sessionStorage.getItem(USER_KEY);
    try {
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  },
  save: (token: string, user: unknown, remember: boolean) => {
    session.clear();
    const store = remember ? localStorage : sessionStorage;
    store.setItem(TOKEN_KEY, token);
    store.setItem(USER_KEY, JSON.stringify(user));
  },
  clear: () => {
    for (const store of [localStorage, sessionStorage]) {
      store.removeItem(TOKEN_KEY);
      store.removeItem(USER_KEY);
    }
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
  const token = session.token();
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });
  } catch {
    // Network error, server asleep, or CORS blocked
    throw new ApiError('Could not reach the server. Please try again in a moment.', 0);
  }

  const text = await res.text();
  let body: unknown;
  try {
    body = text ? JSON.parse(text) : undefined;
  } catch {
    body = undefined; // plain-text response
  }

  if (!res.ok) {
    const b = body as { error?: string; message?: string } | undefined;
    const plain = text && text.length < 200 && !text.trim().startsWith('<') ? text.trim() : '';
    throw new ApiError(b?.error ?? b?.message ?? (plain || `Request failed (${res.status})`), res.status);
  }

  return body as T;
}