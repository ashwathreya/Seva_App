import { Button } from './ui/Button';
import type { SessionUser } from '../session';
import { firstName } from '../session';

type Props = {
  user: SessionUser | null;
  location: string;
  service: string;
  onSignIn: () => void;
  onRequestBooking: () => void;
  onBrowseServices: () => void;
  onLogout: () => void;
};

export function UserDashboardSection({
  user,
  location,
  service,
  onSignIn,
  onRequestBooking,
  onBrowseServices,
  onLogout,
}: Props) {
  return (
    <section id="dashboard" className="scroll-mt-24 border-t border-white/10 bg-seva-soft/30 py-12 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-seva-gold">Your account</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-2xl font-bold tracking-tight text-seva-ink sm:text-3xl">
          {user ? `Welcome back, ${firstName(user.displayName)}` : 'Sign in for your dashboard'}
        </p>

        {user ? (
          <div className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-seva-deep/80 shadow-card backdrop-blur-sm">
            <div className="border-b border-white/10 bg-gradient-to-r from-seva-teal/20 to-transparent px-5 py-4 sm:px-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-seva-gold/20 text-lg font-bold text-seva-gold"
                    aria-hidden>
                    {firstName(user.displayName).charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-white">{user.displayName}</p>
                    <p className="truncate text-sm text-seva-muted">{user.email}</p>
                  </div>
                </div>
                <Button variant="ghost" className="shrink-0 self-start sm:self-center" onClick={onLogout}>
                  Log out
                </Button>
              </div>
            </div>
            <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-seva-muted">Saved location</p>
                <p className="mt-1 font-medium text-seva-ink">{location || '—'}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-seva-muted">Service focus</p>
                <p className="mt-1 font-medium text-seva-ink">{service || '—'}</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 border-t border-white/10 p-5 sm:flex-row sm:p-6">
              <Button className="flex-1" onClick={onRequestBooking}>
                Continue to booking
              </Button>
              <Button variant="secondary" className="flex-1" onClick={onBrowseServices}>
                Browse services
              </Button>
            </div>
            <p className="border-t border-white/5 px-5 py-3 text-center text-xs text-seva-muted sm:px-6">
              Demo mode — preferences are stored on this device only. Real accounts will sync with the SEVA app.
            </p>
          </div>
        ) : (
          <div className="mx-auto mt-8 max-w-lg rounded-2xl border border-white/10 bg-seva-deep/60 p-6 text-center shadow-card">
            <p className="text-seva-muted">
              After you sign in, your name appears here with quick links to book and browse — same flow as the mobile app preview.
            </p>
            <Button className="mt-5" onClick={onSignIn}>
              Sign in or create account
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
