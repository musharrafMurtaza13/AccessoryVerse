import { request, SIGNIN_PATH, SIGNUP_PATH, USE_MOCK_AUTH } from '../lib/api';
import type { AuthResponse, SignInPayload, SignUpOutcome, SignUpPayload, User } from '../types';

/**
 * Go API:
 *   POST {SIGNUP_PATH}  body: { name, email, password }
 *   POST {SIGNIN_PATH}  body: { email, password }
 *
 * The response can be any of these shapes, we accept all of them:
 *   { token, user: {name,email} }  |  { access_token: "..." }  |  { data: { token, user } }
 * If sign up returns no token, the user is told to sign in.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseAuth(res: any, fallback: User): AuthResponse | null {
  const root = res?.data ?? res ?? {};
  const token: string | undefined = root.token ?? root.access_token ?? root.jwt ?? res?.token;
  if (!token) return null;
  const u = root.user ?? res?.user ?? {};
  return {
    token,
    user: {
      name: u.name ?? u.full_name ?? root.name ?? fallback.name,
      email: u.email ?? root.email ?? fallback.email,
    },
  };
}

const goAuthService = {
  signUp: async ({ name, email, password }: SignUpPayload): Promise<SignUpOutcome> => {
    const res = await request<unknown>(SIGNUP_PATH, {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    const auth = parseAuth(res, { name, email });
    return auth ? { status: 'signed_in', ...auth } : { status: 'created', email };
  },

  signIn: async ({ email, password }: SignInPayload): Promise<AuthResponse> => {
    const res = await request<unknown>(SIGNIN_PATH, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    const auth = parseAuth(res, { name: email.split('@')[0], email });
    if (!auth) throw new Error('Sign in worked but the server did not return a token.');
    return auth;
  },
};

// ---- Fake auth (VITE_USE_MOCK_AUTH=true) ----
const mockAuthService = {
  signUp: async ({ name, email }: SignUpPayload): Promise<SignUpOutcome> => ({
    status: 'signed_in',
    user: { name, email },
    token: 'mock-token',
  }),
  signIn: async ({ email }: SignInPayload): Promise<AuthResponse> => ({
    user: { name: email.split('@')[0], email },
    token: 'mock-token',
  }),
};

export const authService = USE_MOCK_AUTH ? mockAuthService : goAuthService;