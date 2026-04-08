import { Button } from './ui/Button';
import { Reveal } from './Reveal';
import type { SessionUser } from '../session';
import { firstName } from '../session';

type Props = {
  user: SessionUser | null;
  location: string;
  service: string;
  onSignIn: () => void;
  onOpenHome: () => void;
  onRequestBooking: () => void;
  onBrowseServices: () => void;
  onLogout: () => void;
};

export function UserDashboardSection({
  user,
  location,
  service,
  onSignIn,
  onOpenHome,
  onRequestBooking,
  onBrowseServices,
  onLogout,
}: Props) {
  return (
    <section id="dashboard" className="scroll-mt-24 border-t border-white/[0.06] bg-lux-surface py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <Reveal>
          <p className="text-center text-[11px] font-medium uppercase tracking-[0.25em] text-lux-muted">Account</p>
          <p className="mx-auto mt-4 max-w-2xl text-center font-serif text-3xl font-semibold tracking-tight text-lux-parchment sm:text-4xl">
            {user ? `Welcome back, ${firstName(user.displayName)}` : 'Your private dashboard'}
          </p>
        </Reveal>

        {user ? (
          <Reveal>
            <div className="mx-auto mt-10 max-w-3xl overflow-hidden border border-white/[0.08] bg-lux-charcoal/80 shadow-card">
              <div className="border-b border-white/[0.06] bg-gradient-to-r from-lux-gold/[0.08] to-transparent px-6 py-5 sm:px-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-lux-gold/25 bg-lux-gold/10 font-serif text-xl text-lux-gold"
                      aria-hidden>
                      {firstName(user.displayName).charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-medium text-lux-parchment">{user.displayName}</p>
                      <p className="truncate text-sm text-lux-muted">{user.email}</p>
                    </div>
                  </div>
                  <Button variant="ghost" className="shrink-0 self-start sm:self-center" onClick={onLogout}>
                    Log out
                  </Button>
                </div>
              </div>
              <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-8">
                <div className="border border-white/[0.06] bg-lux-surface/40 p-5">
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-lux-muted">Saved location</p>
                  <p className="mt-2 text-lux-parchment">{location || '—'}</p>
                </div>
                <div className="border border-white/[0.06] bg-lux-surface/40 p-5">
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-lux-muted">Service focus</p>
                  <p className="mt-2 text-lux-parchment">{service || '—'}</p>
                </div>
              </div>
              <div className="grid gap-3 border-t border-white/[0.06] p-6 sm:grid-cols-3 sm:p-8">
                <Button variant="secondary" className="w-full" onClick={onOpenHome}>
                  Open home
                </Button>
                <Button className="w-full" onClick={onRequestBooking}>
                  Request booking
                </Button>
                <Button variant="secondary" className="w-full" onClick={onBrowseServices}>
                  Browse services
                </Button>
              </div>
              <p className="border-t border-white/[0.04] px-6 py-4 text-center text-xs text-lux-muted sm:px-8">
                Demo — preferences stay on this device until you connect the mobile app.
              </p>
            </div>
          </Reveal>
        ) : (
          <Reveal>
            <div className="mx-auto mt-10 max-w-lg border border-white/[0.08] bg-lux-charcoal/60 p-8 text-center">
              <p className="text-sm leading-relaxed text-lux-muted">
                Sign in to open your SEVA home, browse matched professionals, and manage bookings in one calm place.
              </p>
              <Button className="mt-8" onClick={onSignIn}>
                Sign in or create account
              </Button>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
