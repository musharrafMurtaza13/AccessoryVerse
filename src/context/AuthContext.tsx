import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { authService } from '../services/authService';
import { tokenStore } from '../lib/api';
import type { SignInPayload, SignUpPayload, User } from '../types';

interface AuthContextValue {
  user: User | null;
  /** true while we check for an existing session on first load */
  initializing: boolean;
  signIn: (payload: SignInPayload) => Promise<void>;
  signUp: (payload: SignUpPayload) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  // Restore session on page refresh
  useEffect(() => {
    if (!tokenStore.get()) {
      setInitializing(false);
      return;
    }
    authService
      .me()
      .then(setUser)
      .catch(() => tokenStore.clear())
      .finally(() => setInitializing(false));
  }, []);

  const signIn = useCallback(async (payload: SignInPayload) => {
    const res = await authService.signIn(payload);
    tokenStore.set(res.token, payload.remember);
    setUser(res.user);
  }, []);

  const signUp = useCallback(async (payload: SignUpPayload) => {
    const res = await authService.signUp(payload);
    tokenStore.set(res.token, payload.remember);
    setUser(res.user);
  }, []);

  const signOut = useCallback(() => {
    authService.signOut();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, initializing, signIn, signUp, signOut }),
    [user, initializing, signIn, signUp, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
