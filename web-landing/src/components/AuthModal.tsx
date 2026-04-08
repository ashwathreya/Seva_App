import { useEffect, useState } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { PasswordStrength } from './ui/PasswordStrength';
import { GoogleButton } from './GoogleButton';
import type { SessionUser } from '../session';
import { displayNameFromLoginId, emailFromLoginId } from '../session';

export type AuthMode = 'closed' | 'login' | 'signup' | 'forgot' | 'reset';

export type AuthSuccessMeta = { isNewSignup: boolean };

type Props = {
  mode: AuthMode;
  onClose: () => void;
  onSuccess: (msg: string) => void;
  onAuthenticated?: (user: SessionUser, meta: AuthSuccessMeta) => void;
};

export function AuthModal({ mode, onClose, onSuccess, onAuthenticated }: Props) {
  const [internal, setInternal] = useState<'login' | 'signup' | 'forgot' | 'reset'>('login');
  const [loading, setLoading] = useState(false);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const [resetPassword, setResetPassword] = useState('');
  const [resetConfirm, setResetConfirm] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (mode === 'login') setInternal('login');
    if (mode === 'signup') setInternal('signup');
    if (mode === 'forgot') setInternal('forgot');
    if (mode === 'reset') setInternal('reset');
  }, [mode]);

  useEffect(() => {
    if (mode !== 'closed') {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [mode]);

  if (mode === 'closed') return null;

  const clearErrors = () => setErrors({});

  const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const submitLogin = async () => {
    clearErrors();
    const e: Record<string, string> = {};
    if (!loginEmail.trim()) e.loginEmail = 'Enter your email or phone';
    else if (loginEmail.includes('@') && !validateEmail(loginEmail)) e.loginEmail = 'Invalid email';
    if (!loginPassword) e.loginPassword = 'Enter your password';
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    const user: SessionUser = {
      displayName: displayNameFromLoginId(loginEmail),
      email: emailFromLoginId(loginEmail),
    };
    onAuthenticated?.(user, { isNewSignup: false });
    onSuccess('Welcome back — you’re signed in.');
    onClose();
  };

  const submitSignup = async () => {
    clearErrors();
    const e: Record<string, string> = {};
    if (!signupName.trim()) e.signupName = 'Enter your full name';
    if (!validateEmail(signupEmail)) e.signupEmail = 'Enter a valid email';
    if (!/^\+?[\d\s-]{10,}$/.test(signupPhone.replace(/\s/g, '')))
      e.signupPhone = 'Enter a valid phone number';
    if (signupPassword.length < 8) e.signupPassword = 'Use at least 8 characters';
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    const user: SessionUser = {
      displayName: signupName.trim(),
      email: signupEmail.trim().toLowerCase(),
    };
    onAuthenticated?.(user, { isNewSignup: true });
    onSuccess('Account created — next, a quick intro to how SEVA protects your home.');
    onClose();
  };

  const submitForgot = async () => {
    clearErrors();
    if (!validateEmail(forgotEmail)) {
      setErrors({ forgotEmail: 'Enter a valid email' });
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setForgotSent(true);
  };

  const submitReset = async () => {
    clearErrors();
    const e: Record<string, string> = {};
    if (resetPassword.length < 8) e.resetPassword = 'Use at least 8 characters';
    if (resetPassword !== resetConfirm) e.resetConfirm = 'Passwords don’t match';
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    onSuccess('Password updated — sign in with your new password.');
    setInternal('login');
  };

  const divider = (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center" aria-hidden>
        <div className="w-full border-t border-slate-200" />
      </div>
      <div className="relative flex justify-center text-xs font-medium uppercase tracking-wide">
        <span className="bg-white px-3 text-slate-500">Or continue with</span>
      </div>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-label="Close"
      />
      <div className="relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl transition-all duration-200 sm:rounded-3xl sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          aria-label="Close dialog">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {internal === 'login' && (
          <>
            <h2 id="auth-modal-title" className="pr-10 text-2xl font-bold tracking-tight text-slate-900">
              Welcome back
            </h2>
            <p className="mt-1 text-sm text-slate-600">Sign in to book and manage your services.</p>
            <div className="mt-6 space-y-4">
              <Input
                label="Email or phone"
                type="text"
                autoComplete="username"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                error={errors.loginEmail}
                placeholder="you@email.com"
              />
              <Input
                label="Password"
                type="password"
                autoComplete="current-password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                error={errors.loginPassword}
              />
              <button
                type="button"
                onClick={() => {
                  setForgotSent(false);
                  setInternal('forgot');
                }}
                className="text-sm font-semibold text-[#0F3D3E] hover:text-[#0a2f30]">
                Forgot password?
              </button>
            </div>
            {divider}
            <GoogleButton
              label="Continue with Google"
              onClick={() => {
                onAuthenticated?.({ displayName: 'Alex Rivera', email: 'alex.rivera@gmail.com' }, { isNewSignup: false });
                onSuccess('Signed in with Google (demo).');
                onClose();
              }}
            />
            <Button className="mt-6 w-full" onClick={submitLogin} loading={loading}>
              Sign in
            </Button>
            <p className="mt-4 text-center text-sm text-slate-600">
              New to SEVA?{' '}
              <button
                type="button"
                className="font-semibold text-[#0F3D3E] hover:text-[#0a2f30]"
                onClick={() => setInternal('signup')}>
                Create an account
              </button>
            </p>
          </>
        )}

        {internal === 'signup' && (
          <>
            <h2 id="auth-modal-title" className="pr-10 text-2xl font-bold tracking-tight text-slate-900">
              Create your account
            </h2>
            <p className="mt-1 text-sm text-slate-600">Book faster next time with one saved profile.</p>
            <div className="mt-6 space-y-4">
              <Input
                label="Full name"
                autoComplete="name"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                error={errors.signupName}
                placeholder="Jordan Rivera"
              />
              <Input
                label="Email"
                type="email"
                autoComplete="email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                error={errors.signupEmail}
              />
              <Input
                label="Phone number"
                type="tel"
                autoComplete="tel"
                value={signupPhone}
                onChange={(e) => setSignupPhone(e.target.value)}
                error={errors.signupPhone}
                hint="We’ll text booking updates and ETA."
                placeholder="+1 201 555 0142"
              />
              <div>
                <Input
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  error={errors.signupPassword}
                />
                <PasswordStrength password={signupPassword} />
              </div>
            </div>
            {divider}
            <GoogleButton
              label="Continue with Google"
              onClick={() => {
                onAuthenticated?.({ displayName: 'Alex Rivera', email: 'alex.rivera@gmail.com' }, { isNewSignup: true });
                onSuccess('Account linked with Google (demo).');
                onClose();
              }}
            />
            <Button className="mt-6 w-full" onClick={submitSignup} loading={loading}>
              Create account
            </Button>
            <p className="mt-3 text-center text-xs text-slate-500">
              By continuing you agree to our Terms and Privacy Policy.
            </p>
            <p className="mt-4 text-center text-sm text-slate-600">
              Already have an account?{' '}
              <button
                type="button"
                className="font-semibold text-[#0F3D3E] hover:text-[#0a2f30]"
                onClick={() => setInternal('login')}>
                Sign in
              </button>
            </p>
          </>
        )}

        {internal === 'forgot' && (
          <>
            <h2 id="auth-modal-title" className="pr-10 text-2xl font-bold tracking-tight text-slate-900">
              Reset your password
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {forgotSent
                ? 'Check your inbox for a reset link. It expires in 1 hour.'
                : 'We’ll email you a link to choose a new password.'}
            </p>
            {!forgotSent ? (
              <div className="mt-6 space-y-4">
                <Input
                  label="Email"
                  type="email"
                  autoComplete="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  error={errors.forgotEmail}
                />
                <Button className="w-full" onClick={submitForgot} loading={loading}>
                  Send reset link
                </Button>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                <Button className="w-full" variant="primary" onClick={() => setInternal('reset')}>
                  I have a reset link — set new password
                </Button>
                <Button variant="ghost" className="w-full" onClick={() => setForgotSent(false)}>
                  Use a different email
                </Button>
              </div>
            )}
            <button
              type="button"
              onClick={() => setInternal('login')}
              className="mt-6 text-sm font-semibold text-[#0F3D3E] hover:text-[#0a2f30]">
              ← Back to sign in
            </button>
          </>
        )}

        {internal === 'reset' && (
          <>
            <h2 id="auth-modal-title" className="pr-10 text-2xl font-bold tracking-tight text-slate-900">
              New password
            </h2>
            <p className="mt-1 text-sm text-slate-600">Choose a strong password you haven’t used before.</p>
            <div className="mt-6 space-y-4">
              <div>
                <Input
                  label="New password"
                  type="password"
                  autoComplete="new-password"
                  value={resetPassword}
                  onChange={(e) => setResetPassword(e.target.value)}
                  error={errors.resetPassword}
                />
                <PasswordStrength password={resetPassword} />
              </div>
              <Input
                label="Confirm password"
                type="password"
                autoComplete="new-password"
                value={resetConfirm}
                onChange={(e) => setResetConfirm(e.target.value)}
                error={errors.resetConfirm}
              />
              <Button className="w-full" onClick={submitReset} loading={loading}>
                Update password
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setInternal('login')}
              className="mt-4 text-sm font-semibold text-[#0F3D3E] hover:text-[#0a2f30]">
              ← Back to sign in
            </button>
          </>
        )}
      </div>
    </div>
  );
}
