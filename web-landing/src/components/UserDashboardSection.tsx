import { useCallback, useMemo, useState } from 'react';
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

function QuickActionCard({
  icon,
  title,
  sub,
  onClick,
}: {
  icon: string;
  title: string;
  sub: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group rounded-xl border border-[#222] bg-[#151515] p-4 text-left shadow-[0_6px_18px_rgba(0,0,0,0.22)] transition duration-200 hover:-translate-y-0.5 hover:border-[#c9a96e]/40 hover:shadow-[0_14px_30px_rgba(0,0,0,0.35)]">
      <p className="text-lg">{icon}</p>
      <p className="mt-2 text-sm font-semibold text-[#f0ece2]">{title}</p>
      <p className="mt-1 text-xs text-[#9ea3ad]">{sub}</p>
    </button>
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
  const [activeNav, setActiveNav] = useState<'dashboard' | 'book' | 'bookings' | 'saved' | 'payments' | 'support' | 'settings'>(
    'dashboard',
  );

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
  const first = useMemo(() => (user ? firstName(user.displayName) : 'Guest'), [user]);
  const userInitial = first.charAt(0).toUpperCase();
  const nextBooking = upcoming[0] ?? null;

  return (
    <section id="dashboard" className="scroll-mt-24 border-t border-[#222] bg-[#0f0f0f] py-16 sm:py-20">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <Reveal>
          <p className="text-center text-[11px] font-medium uppercase tracking-[0.25em] text-[#8f96a3]">Dashboard</p>
          <p className="mx-auto mt-4 max-w-2xl text-center font-serif text-3xl font-semibold tracking-tight text-[#f5f1e7] sm:text-4xl">
            {user ? `Control center for ${first}` : 'Everything in one place'}
          </p>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-[#9ea3ad]">
            Professional booking operations with trust, clarity, and status at every step.
          </p>
        </Reveal>

        {user ? (
          <Reveal>
            <div className="mt-10 grid gap-6 xl:grid-cols-12">
              <aside className="xl:col-span-3">
                <div className="sticky top-24 rounded-2xl border border-[#222] bg-[#151515] p-6 shadow-[0_12px_28px_rgba(0,0,0,0.28)]">
                  <img src="/seva_logo_new.png" alt="SEVA" className="h-8 w-auto opacity-95" />
                  <div className="mt-6 flex items-center gap-3">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#c9a96e]/30 bg-[#c9a96e]/10 font-serif text-lg text-[#c9a96e]"
                      aria-hidden>
                      {userInitial}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#f0ece2]">{user.displayName}</p>
                      <p className="truncate text-xs text-[#9ea3ad]">{user.email}</p>
                    </div>
                  </div>
                  <p className="mt-4 inline-flex rounded-full border border-[#c9a96e]/30 bg-[#c9a96e]/10 px-2.5 py-1 text-[10px] font-medium text-[#e9d2a8]">
                    {accountLabel}
                  </p>

                  <nav className="mt-6 space-y-1.5">
                    {[
                      ['dashboard', 'Dashboard'],
                      ['book', 'Book a Service'],
                      ['bookings', 'My Bookings'],
                      ['saved', 'Saved Services'],
                      ['payments', 'Payments'],
                      ['support', 'Support'],
                      ['settings', 'Settings'],
                    ].map(([key, label]) => {
                      const k = key as typeof activeNav;
                      const active = activeNav === k;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setActiveNav(k)}
                          className={`flex w-full items-center rounded-lg border-l-2 px-3 py-2 text-left text-sm transition ${
                            active
                              ? 'border-l-[#c9a96e] bg-[#1d1d1d] text-[#f5f1e7]'
                              : 'border-l-transparent text-[#9ea3ad] hover:bg-[#1a1a1a] hover:text-[#f0ece2]'
                          }`}>
                          {label}
                        </button>
                      );
                    })}
                  </nav>

                  <Button variant="ghost" className="mt-6 w-full" onClick={onLogout}>
                    Log out
                  </Button>
                </div>
              </aside>

              <main className="xl:col-span-9">
                <div className="space-y-6">
                  <div className="rounded-2xl border border-[#222] bg-[#151515] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.24)]">
                    <p className="text-sm text-[#9ea3ad]">Hi, {first} 👋</p>
                    <h2 className="mt-2 font-serif text-[32px] font-semibold leading-tight text-[#f5f1e7]">
                      What do you need done today?
                    </h2>
                    <p className="mt-2 text-sm text-[#9ea3ad]">Book a trusted professional in minutes.</p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-4">
                    <QuickActionCard icon="🔧" title="Book Service" sub="Start a new request" onClick={onRequestBooking} />
                    <QuickActionCard icon="📅" title="Upcoming Bookings" sub={`${stats.upcoming} active`} onClick={onOpenHome} />
                    <QuickActionCard icon="⭐" title="Saved Providers" sub="View your favorites" onClick={onBrowseServices} />
                    <QuickActionCard
                      icon="💬"
                      title="Support"
                      sub="Chat or email support"
                      onClick={() => (window.location.href = 'mailto:support@seva.app?subject=SEVA%20—%20Help')}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <StatBox label="Total bookings" value={stats.total} loading={phase === 'loading'} />
                    <StatBox label="Upcoming" value={stats.upcoming} loading={phase === 'loading'} />
                    <StatBox label="Completed" value={stats.completed} loading={phase === 'loading'} />
                  </div>

                  {phase === 'error' ? (
                    <div className="rounded-xl border border-red-300/30 bg-red-900/10 p-4">
                      <p className="text-sm text-red-300/90">{errorMessage}</p>
                      <Button variant="secondary" className="mt-4" onClick={() => refresh()}>
                        Retry
                      </Button>
                    </div>
                  ) : null}

                  <div className="grid gap-4 xl:grid-cols-3">
                    <div className="xl:col-span-2 space-y-4">
                      <div className="rounded-2xl border border-[#222] bg-[#151515] p-6">
                        <div className="mb-4 flex items-center justify-between">
                          <h3 className="font-serif text-2xl font-semibold text-[#f5f1e7]">Upcoming bookings</h3>
                          <button
                            type="button"
                            onClick={onOpenHome}
                            className="text-sm font-semibold text-[#c9a96e] transition hover:text-[#f1e0bf]">
                            View all
                          </button>
                        </div>
                        {nextBooking ? (
                          <div className="rounded-xl border border-[#2a2a2a] bg-[#191919] p-4">
                            <div className="flex flex-col gap-4 sm:flex-row">
                              <div className="h-24 w-full rounded-lg bg-[url('https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600&q=80')] bg-cover bg-center sm:w-40" />
                              <div className="min-w-0 flex-1">
                                <p className="text-sm text-[#9ea3ad]">Service</p>
                                <p className="text-lg font-semibold text-[#f5f1e7]">{nextBooking.serviceTitle}</p>
                                <p className="mt-1 text-sm text-[#9ea3ad]">Provider: {nextBooking.proName} ⭐ 4.8</p>
                                <p className="text-sm text-[#9ea3ad]">Date: {nextBooking.scheduledLabel}</p>
                                <p className="mt-2 inline-flex rounded-full border border-emerald-400/25 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-200">
                                  Status: Confirmed
                                </p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                  <Button variant="secondary" className="px-4 py-2 text-xs" onClick={onOpenHome}>
                                    View details
                                  </Button>
                                  <Button variant="ghost" className="px-4 py-2 text-xs" onClick={onRequestBooking}>
                                    Reschedule
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="rounded-xl border border-dashed border-[#333] bg-[#181818] px-6 py-10 text-center">
                            <p className="text-3xl">🧰</p>
                            <p className="mt-3 text-base font-medium text-[#f5f1e7]">You haven&apos;t booked a service yet</p>
                            <p className="mt-2 text-sm text-[#9ea3ad]">Start your first booking in under 2 minutes.</p>
                            <Button className="mt-5" onClick={onRequestBooking}>
                              Book your first service
                            </Button>
                          </div>
                        )}
                      </div>

                      <div className="rounded-2xl border border-[#222] bg-[#151515] p-6">
                        <h3 className="font-serif text-2xl font-semibold text-[#f5f1e7]">Booking history</h3>
                        <div className="mt-4 overflow-x-auto">
                          <table className="w-full min-w-[540px] border-collapse text-left text-sm">
                            <thead>
                              <tr className="border-b border-[#2a2a2a] text-[#9ea3ad]">
                                <th className="pb-3 font-medium">Service</th>
                                <th className="pb-3 font-medium">Date</th>
                                <th className="pb-3 font-medium">Status</th>
                                <th className="pb-3 font-medium">Rating</th>
                              </tr>
                            </thead>
                            <tbody>
                              {past.length > 0 ? (
                                past.slice(0, 5).map((row) => (
                                  <tr key={row.id} className="border-b border-[#222] text-[#f0ece2]">
                                    <td className="py-3">{row.serviceTitle}</td>
                                    <td className="py-3 text-[#9ea3ad]">{row.scheduledLabel}</td>
                                    <td className="py-3 text-[#9ea3ad] capitalize">{row.status.replace('_', ' ')}</td>
                                    <td className="py-3">
                                      <button type="button" className="text-[#c9a96e] hover:text-[#f1e0bf]">
                                        {row.status === 'completed' ? 'Rate now' : '—'}
                                      </button>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan={4} className="py-8 text-center text-[#9ea3ad]">
                                    No history yet.
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-[#222] bg-[#151515] p-6">
                        <h3 className="font-serif text-2xl font-semibold text-[#f5f1e7]">Recommended services</h3>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                          {[
                            ['Home Cleaning', '$49+', '4.9', 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&q=80'],
                            ['Plumbing Repair', '$79+', '4.8', 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=500&q=80'],
                            ['Deep Kitchen Clean', '$99+', '4.7', 'https://images.unsplash.com/photo-1556911220-bda9f7f7597e?w=500&q=80'],
                          ].map(([name, price, rating, image]) => (
                            <article key={name} className="rounded-xl border border-[#262626] bg-[#181818] p-3 transition hover:-translate-y-0.5 hover:border-[#c9a96e]/35">
                              <div className="h-28 rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
                              <p className="mt-3 font-medium text-[#f5f1e7]">{name}</p>
                              <p className="text-xs text-[#9ea3ad]">Starting at {price}</p>
                              <p className="mt-1 text-xs text-[#9ea3ad]">⭐ {rating}</p>
                              <Button className="mt-3 w-full py-2 text-xs" onClick={onRequestBooking}>
                                Book again
                              </Button>
                            </article>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-2xl border border-[#222] bg-[#151515] p-5">
                        <h4 className="font-serif text-xl text-[#f5f1e7]">Trust & status</h4>
                        <ul className="mt-4 space-y-3 text-sm text-[#9ea3ad]">
                          <li className="rounded-lg border border-[#2a2a2a] bg-[#181818] px-3 py-2">✅ Verified account</li>
                          <li className="rounded-lg border border-[#2a2a2a] bg-[#181818] px-3 py-2">⚡ Fast booking enabled</li>
                          <li className="rounded-lg border border-[#2a2a2a] bg-[#181818] px-3 py-2">🛡️ Priority support active</li>
                        </ul>
                        <div className="mt-5 rounded-lg border border-[#2a2a2a] bg-[#181818] p-3">
                          <p className="text-xs uppercase tracking-widest text-[#9ea3ad]">Service area</p>
                          <p className="mt-1 text-sm text-[#f0ece2]">{location || 'Not set'}</p>
                          <p className="mt-3 text-xs uppercase tracking-widest text-[#9ea3ad]">Preferred service</p>
                          <p className="mt-1 text-sm text-[#f0ece2]">{service || 'Not set'}</p>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-[#222] bg-[#151515] p-5">
                        <h4 className="font-serif text-xl text-[#f5f1e7]">Need help now?</h4>
                        <p className="mt-2 text-sm text-[#9ea3ad]">Our team can assist with booking changes, payments, and provider concerns.</p>
                        <Button
                          className="mt-4 w-full"
                          loading={actionKey === 'support'}
                          onClick={() =>
                            runAction('support', () => {
                              window.location.href = 'mailto:support@seva.app?subject=SEVA%20—%20Help';
                            })
                          }>
                          Contact support
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </Reveal>
        ) : (
          <Reveal>
            <div className="mx-auto mt-10 max-w-lg border border-[#222] bg-[#151515] p-10 text-center">
              <p className="text-sm leading-relaxed text-[#9ea3ad]">
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
