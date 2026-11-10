import { useState, type FormEvent } from 'react';
import { ArrowRight, Lock, Mail, User as UserIcon } from 'lucide-react';
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
}

const emptyForm = { name: '', email: '', password: '', remember: true };

export function AuthModal({ mode, onClose, onSwitchMode }: AuthModalProps) {
  const { signIn, signUp } = useAuth();
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const isSignIn = mode === 'signin';
  const update = (patch: Partial<typeof form>) => setForm((f) => ({ ...f, ...patch }));

  const close = () => {
    setForm(emptyForm);
    setError('');
    onClose();
  };

  const switchMode = (next: AuthMode) => {
    setError('');
    onSwitchMode(next);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password) return setError('Please fill in all required fields.');
    if (!isSignIn && !form.name) return setError('Please enter your name.');

    setSubmitting(true);
    try {
      if (isSignIn) await signIn(form);
      else await signUp(form);
      close();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={mode !== null}
      onClose={close}
      heavyBackdrop
      leading={<PandaLogo size={28} />}
      title={isSignIn ? "Sign In to Coder's Shop" : 'Create an Account'}
    >
      <Alert message={error} />

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isSignIn && (
          <Input
            label="Full Name"
            icon={UserIcon}
            type="text"
            placeholder="John Doe"
            value={form.name}
            onChange={(e) => update({ name: e.target.value })}
          />
        )}

        <Input
          label="Email Address"
          icon={Mail}
          type="email"
          required
          placeholder="name@example.com"
          value={form.email}
          onChange={(e) => update({ email: e.target.value })}
        />

        <Input
          label="Password"
          icon={Lock}
          type="password"
          required
          placeholder="••••••••"
          value={form.password}
          onChange={(e) => update({ password: e.target.value })}
        />

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
