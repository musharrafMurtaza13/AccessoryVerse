import { useState, type FormEvent } from 'react';
import { ArrowRight, CheckCircle2, Lock, Mail, User as UserIcon } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/FormField';
import { Button } from '../ui/Button';
import { Alert } from '../ui/Alert';
import { PandaLogo } from '../layout/Logo';
import { useAuth } from '../../context/AuthContext';
import type { AuthMode } from '../../types';

interface AuthModalProps {
  mode: AuthMode | null;
  onClose: () => void;
  onSwitchMode: (mode: AuthMode) => void;
  /** Called after a successful sign in or sign up (e.g. to go to the Listings page). */
  onAuthenticated?: () => void;
}

const MIN_PASSWORD = 8; // Neon Auth (Better Auth) default minimum
const emptyForm = { name: '', email: '', password: '', confirm: '', remember: true };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function AuthModal({ mode, onClose, onSwitchMode, onAuthenticated }: AuthModalProps) {
  const { signIn, signUp } = useAuth();
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  /** set after sign up when Neon requires the user to verify their email */
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);

  const isSignIn = mode === 'signin';
  const update = (patch: Partial<typeof form>) => setForm((f) => ({ ...f, ...patch }));

  const close = () => {
    setForm(emptyForm);
    setError('');
    setPendingEmail(null);
    onClose();
  };

  const switchMode = (next: AuthMode) => {
    setError('');
    setPendingEmail(null);
    onSwitchMode(next);
  };

  /** Returns an error message, or '' if the form is valid. */
  const validate = (): string => {
    if (!EMAIL_RE.test(form.email.trim())) return 'Please enter a valid email address.';
    if (isSignIn) return form.password ? '' : 'Please enter your password.';
    if (form.name.trim().length < 2) return 'Please enter your name.';
    if (form.password.length < MIN_PASSWORD) return `Password must be at least ${MIN_PASSWORD} characters.`;
    if (form.password !== form.confirm) return 'Passwords do not match.';
    return '';
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const problem = validate();
    if (problem) return setError(problem);

    setError('');
    setSubmitting(true);
    try {
      const payload = { ...form, email: form.email.trim(), name: form.name.trim() };
      if (isSignIn) {
        await signIn(payload);
      } else {
        const outcome = await signUp(payload);
        if (outcome.status === 'created') {
          setPendingEmail(outcome.email);
          return;
        }
      }
      close();
      onAuthenticated?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // ---- "Check your email" screen ----
  if (mode !== null && pendingEmail) {
    return (
      <Modal open onClose={close} heavyBackdrop leading={<PandaLogo size={28} />} title="Account created">
        <div className="text-center space-y-4 py-2">
          <CheckCircle2 className="mx-auto text-emerald-400" size={40} />
          <p className="text-sm text-gray-400">
            Your account for <span className="font-semibold text-gray-200">{pendingEmail}</span> is ready.
            Please sign in to continue.
          </p>
          <Button fullWidth className="!rounded-lg" onClick={() => switchMode('signin')}>
            Go to Sign In
          </Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      open={mode !== null}
      onClose={close}
      heavyBackdrop
      leading={<PandaLogo size={28} />}
      title={isSignIn ? "Sign In to Coder's Shop" : 'Create an Account'}
    >
      <Alert message={error} />

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {!isSignIn && (
          <Input
            label="Full Name"
            icon={UserIcon}
            type="text"
            autoComplete="name"
            placeholder="John Doe"
            value={form.name}
            onChange={(e) => update({ name: e.target.value })}
          />
        )}

        <Input
          label="Email Address"
          icon={Mail}
          type="email"
          autoComplete="email"
          placeholder="name@example.com"
          value={form.email}
          onChange={(e) => update({ email: e.target.value })}
        />

        <Input
          label="Password"
          icon={Lock}
          type="password"
          autoComplete={isSignIn ? 'current-password' : 'new-password'}
          placeholder={isSignIn ? '••••••••' : `At least ${MIN_PASSWORD} characters`}
          value={form.password}
          onChange={(e) => update({ password: e.target.value })}
        />

        {!isSignIn && (
          <Input
            label="Confirm Password"
            icon={Lock}
            type="password"
            autoComplete="new-password"
            placeholder="Repeat your password"
            value={form.confirm}
            onChange={(e) => update({ confirm: e.target.value })}
          />
        )}

        <div className="flex items-center justify-between text-xs pt-1">
          <label className="flex items-center space-x-2 text-gray-400 cursor-pointer">
            <input
              type="checkbox"
              checked={form.remember}
              onChange={(e) => update({ remember: e.target.checked })}
              className="rounded border-zinc-700 focus:ring-0"
            />
            <span>Remember me</span>
          </label>
          {isSignIn && (
            <a href="#forgot" className="text-gray-400 hover:text-white underline">
              Forgot password?
            </a>
          )}
        </div>

        <Button type="submit" fullWidth disabled={submitting} className="mt-2 !rounded-lg shadow-md">
          <span>{submitting ? 'Please wait…' : isSignIn ? 'Sign In' : 'Create Account'}</span>
          <ArrowRight size={16} />
        </Button>
      </form>

      <div className="mt-5 text-center text-xs text-gray-400 border-t border-zinc-800/80 pt-4">
        {isSignIn ? (
          <p>
            Don't have an account?{' '}
            <button onClick={() => switchMode('signup')} className="font-semibold underline">
              Sign up
            </button>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <button onClick={() => switchMode('signin')} className="font-semibold underline">
              Sign in
            </button>
          </p>
        )}
      </div>
    </Modal>
  );
}