import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { authService } from '../services/authService';
import { session } from '../lib/api';
import type { SignInPayload, SignUpOutcome, SignUpPayload, User } from '../types';

interface AuthContextValue {
  user: User | null;
  signIn: (payload: SignInPayload) => Promise<void>;
  /** Resolves 'signed_in' (token saved) or 'created' (account made, user must sign in). */
  signUp: (payload: SignUpPayload) => Promise<SignUpOutcome>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Restore the saved session on page refresh (token + user are stored together)
  const [user, setUser] = useState<User | null>(() => (session.token() ? session.user<User>() : null));

  const signIn = useCallback(async (payload: SignInPayload) => {
    const res = await authService.signIn(payload);
    session.save(res.token, res.user, payload.remember);
    setUser(res.user);
  }, []);

  const signUp = useCallback(async (payload: SignUpPayload): Promise<SignUpOutcome> => {
    const res = await authService.signUp(payload);
    if (res.status === 'signed_in') {
      session.save(res.token, res.user, payload.remember);
      setUser(res.user);
    }
    return res;
  }, []);

  const signOut = useCallback(() => {
    session.clear();
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, signIn, signUp, signOut }), [user, signIn, signUp, signOut]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}