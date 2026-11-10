import { tokenStore, USE_MOCK_AUTH } from '../lib/api';
import { neonAuth } from '../lib/neon';
import type { AuthResponse, SignInPayload, SignUpPayload, User } from '../types';

/**
 * REAL MODE: email + password go straight to Neon Auth (no Go involved).
 * Neon returns a session; its token is returned here and saved by AuthContext.
 */
async function readSession(): Promise<AuthResponse> {
  const { data } = await neonAuth.getSession();
  if (!data?.session || !data?.user) {
    throw new Error('Account created, but no session was started. Verify your email, then sign in.');
  }
  return {
    token: data.session.token,
    user: { name: data.user.name ?? data.user.email.split('@')[0], email: data.user.email },
  };
}

const neonAuthService = {
  signUp: async ({ name, email, password }: SignUpPayload): Promise<AuthResponse> => {
    const result = await neonAuth.signUp.email({ name, email, password });
    if (result.error) throw new Error(result.error.message ?? 'Sign up failed');
    return readSession();
  },
  signIn: async ({ email, password }: SignInPayload): Promise<AuthResponse> => {
    const result = await neonAuth.signIn.email({ email, password });
    if (result.error) throw new Error(result.error.message ?? 'Sign in failed');
    return readSession();
  },
  me: async (): Promise<User> => (await readSession()).user,
  signOut: async () => {
    await neonAuth.signOut();
  },
};

// ---- Fake auth (only when VITE_NEON_AUTH_URL is empty) ----
const MOCK_USER_KEY = 'coders_shop_mock_user';
const mockAuthService = {
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
  signOut: async () => {
    localStorage.removeItem(MOCK_USER_KEY);
  },
};

const impl = USE_MOCK_AUTH ? mockAuthService : neonAuthService;

export const authService = {
  ...impl,
  signOut: async () => {
    tokenStore.clear();
    await impl.signOut().catch(() => undefined);
  },
};