import { useCallback, useState } from 'react';
import { useCustomerBookings } from '../customerPortal/useCustomerBookings';
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

function StatBox({
  label,
  value,
  loading,
}: {
  label: string;
  value: number | string;
  loading?: boolean;
}) {
  return (
    <div className="border border-white/[0.08] bg-lux-charcoal/50 p-5 transition duration-300 hover:border-lux-gold/15">
      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-lux-muted">{label}</p>
      {loading ? (
        <div className="mt-3 h-9 w-16 animate-pulse rounded bg-lux-parchment/10" aria-hidden />
      ) : (
        <p className="mt-2 font-serif text-3xl font-semibold tabular-nums tracking-tight text-lux-parchment">{value}</p>
      )}
    </div>
  );
}

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
  const { stats, upcoming, past, phase, errorMessage, refresh } = useCustomerBookings();
  const [actionKey, setActionKey] = useState<string | null>(null);

  const runAction = useCallback(async (key: string, fn: () => void) => {
    setActionKey(key);
    await new Promise((r) => setTimeout(r, 280));
    try {
      fn();
    } finally {
      setActionKey(null);
    }
  }, []);

  const accountLabel =
    user?.onboardingComplete === false ? 'Finish onboarding in app' : 'Account in good standing';

  return (
    <section id="dashboard" className="scroll-mt-24 border-t border-white/[0.06] bg-lux-surface py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <Reveal>
          <p className="text-center text-[11px] font-medium uppercase tracking-[0.25em] text-lux-muted">Your hub</p>
          <p className="mx-auto mt-4 max-w-2xl text-center font-serif text-3xl font-semibold tracking-tight text-lux-parchment sm:text-4xl">
            {user ? `Welcome back, ${firstName(user.displayName)}` : 'Everything in one place'}
          </p>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-lux-muted">
            Bookings, pros, and support — the same experience customers get in our native apps.
          </p>
        </Reveal>

        {user ? (
          <Reveal>
            <div className="mx-auto mt-10 max-w-4xl overflow-hidden border border-white/[0.08] bg-lux-charcoal/80 shadow-card">
              <div className="border-b border-white/[0.06] bg-gradient-to-r from-lux-gold/[0.08] to-transparent px-6 py-6 sm:px-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-lux-gold/25 bg-lux-gold/10 font-serif text-2xl text-lux-gold shadow-innerLight"
                      aria-hidden>
                      {firstName(user.displayName).charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-lg font-medium text-lux-parchment">{user.displayName}</p>
                      <p className="truncate text-sm text-lux-muted">{user.email}</p>
                      <p className="mt-2 inline-flex items-center rounded-full border border-lux-teal/25 bg-lux-teal/10 px-3 py-1 text-[11px] font-medium text-lux-parchment/90">
                        {accountLabel}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" className="shrink-0 self-start sm:self-center" onClick={onLogout}>
                    Log out
                  </Button>
                </div>
              </div>

              <div className="grid gap-px bg-white/[0.06] sm:grid-cols-3">
                <StatBox label="Total bookings" value={stats.total} loading={phase === 'loading'} />
                <StatBox label="Upcoming" value={stats.upcoming} loading={phase === 'loading'} />
                <StatBox label="Completed" value={stats.completed} loading={phase === 'loading'} />
              </div>

              {phase === 'error' ? (
                <div className="border-t border-white/[0.06] px-6 py-5 sm:px-8">
                  <p className="text-sm text-red-300/90">{errorMessage}</p>
                  <Button variant="secondary" className="mt-4" onClick={() => refresh()}>
                    Retry
                  </Button>
                </div>
              ) : null}

              <div className="grid gap-4 border-t border-white/[0.06] p-6 sm:grid-cols-2 sm:p-8">
                <div className="border border-white/[0.06] bg-lux-surface/40 p-5">
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-lux-muted">Service area</p>
                  <p className="mt-2 text-lux-parchment">{location || '—'}</p>
                </div>
                <div className="border border-white/[0.06] bg-lux-surface/40 p-5">
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-lux-muted">Last interest</p>
                  <p className="mt-2 text-lux-parchment">{service || '—'}</p>
                </div>
              </div>

              <div className="border-t border-white/[0.06] px-6 py-6 sm:px-8">
                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-lux-muted">Upcoming</h3>
                    <p className="mt-1 text-sm text-lux-muted">Confirmed and in-progress visits</p>
                  </div>
                  <button
                    type="button"
                    onClick={onOpenHome}
                    className="text-left text-xs font-semibold text-lux-gold transition hover:text-lux-parchment">
                    Open in app →
                  </button>
                </div>
                {phase === 'loading' ? (
                  <div className="space-y-3">
                    <div className="h-16 animate-pulse rounded-lg bg-lux-parchment/5" />
                    <div className="h-16 animate-pulse rounded-lg bg-lux-parchment/5" />
                  </div>
                ) : upcoming.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-white/[0.12] bg-lux-surface/30 px-5 py-8 text-center">
                    <p className="text-sm text-lux-muted">No upcoming bookings yet.</p>
                    <p className="mt-2 text-xs text-lux-muted/80">Request a fixed-price job — your dashboard updates instantly.</p>
                    <Button className="mt-6" onClick={onRequestBooking}>
                      Book a service
                    </Button>
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {upcoming.slice(0, 3).map((b) => (
                      <li
                        key={b.id}
                        className="flex flex-col gap-1 border border-white/[0.06] bg-lux-surface/25 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="font-medium text-lux-parchment">{b.serviceTitle}</p>
                          <p className="text-xs text-lux-muted">
                            {b.scheduledLabel} · {b.proName}
                          </p>
                        </div>
                        <span className="text-sm font-semibold text-lux-gold">{b.priceLabel}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="border-t border-white/[0.06] px-6 py-6 sm:px-8">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-lux-muted">History</h3>
                {phase === 'loading' ? (
                  <div className="mt-4 h-14 animate-pulse rounded-lg bg-lux-parchment/5" />
                ) : past.length === 0 ? (
                  <p className="mt-3 text-sm text-lux-muted">Completed jobs and receipts will appear here after your first visit.</p>
                ) : (
                  <ul className="mt-4 space-y-2">
                    {past.slice(0, 2).map((b) => (
                      <li key={b.id} className="text-sm text-lux-muted">
                        <span className="text-lux-parchment">{b.serviceTitle}</span> · {b.priceLabel}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="grid gap-3 border-t border-white/[0.06] p-6 sm:grid-cols-3 sm:p-8">
                <Button
                  variant="secondary"
                  className="w-full"
                  loading={actionKey === 'home'}
                  onClick={() => runAction('home', onOpenHome)}>
                  Open app home
                </Button>
                <Button className="w-full" loading={actionKey === 'book'} onClick={() => runAction('book', onRequestBooking)}>
                  Book a service
                </Button>
                <Button
                  variant="secondary"
                  className="w-full"
                  loading={actionKey === 'browse'}
                  onClick={() => runAction('browse', onBrowseServices)}>
                  Browse services
                </Button>
              </div>

              <div className="border-t border-white/[0.06] px-6 py-4 sm:px-8">
                <button
                  type="button"
                  disabled={actionKey === 'support'}
                  onClick={() =>
                    runAction('support', () => {
                      window.location.href = 'mailto:support@seva.app?subject=SEVA%20—%20Help';
                    })
                  }
                  className="text-sm font-medium text-lux-gold transition hover:text-lux-parchment disabled:opacity-50">
                  {actionKey === 'support' ? 'Opening…' : 'Contact support'}
                </button>
              </div>

              <p className="border-t border-white/[0.04] px-6 py-4 text-center text-xs text-lux-muted sm:px-8">
                Demo — bookings sync on this device. Sign in on mobile for notifications and live pro chat.
              </p>
            </div>
          </Reveal>
        ) : (
          <Reveal>
            <div className="mx-auto mt-10 max-w-lg border border-white/[0.08] bg-lux-charcoal/60 p-10 text-center">
              <p className="text-sm leading-relaxed text-lux-muted">
                Sign in to see your real-time booking counts, upcoming visits, and matched professionals in one place.
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
