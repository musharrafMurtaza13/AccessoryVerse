import { request, tokenStore, USE_MOCK } from '../lib/api';
import type { AuthResponse, SignInPayload, SignUpPayload, User } from '../types';

/**
 * Expected Go endpoints (change the paths here if yours differ):
 *   POST /api/auth/signup  {name,email,password} -> {user:{name,email}, token}
 *   POST /api/auth/signin  {email,password}      -> {user:{name,email}, token}
 *   GET  /api/auth/me      (Bearer token)        -> {name,email}
 */
const realAuth = {
  signUp: ({ name, email, password }: SignUpPayload) =>
    request<AuthResponse>('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),
  signIn: ({ email, password }: SignInPayload) =>
    request<AuthResponse>('/api/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  me: () => request<User>('/api/auth/me'),
};

// ---- Mock (runs without backend) ----
const MOCK_USER_KEY = 'coders_shop_mock_user';
const mockAuth = {
  signUp: async ({ name, email }: SignUpPayload): Promise<AuthResponse> => {
    const user = { name, email };
    localStorage.setItem(MOCK_USER_KEY, JSON.stringify(user));
    return { user, token: 'mock-token' };
  },
  signIn: async ({ email }: SignInPayload): Promise<AuthResponse> => {
    const user = { name: email.split('@')[0], email };
    localStorage.setItem(MOCK_USER_KEY, JSON.stringify(user));
    return { user, token: 'mock-token' };
  },
  me: async (): Promise<User> => {
    const raw = localStorage.getItem(MOCK_USER_KEY);
    if (!raw) throw new Error('Not signed in');
    return JSON.parse(raw) as User;
  },
};

export const authService = {
  ...(USE_MOCK ? mockAuth : realAuth),
  signOut: () => {
    tokenStore.clear();
    localStorage.removeItem(MOCK_USER_KEY);
  },
};
