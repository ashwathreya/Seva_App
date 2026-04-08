import { useCallback, useState } from 'react';
import { Button } from '../components/ui/Button';

type Tab = 'jobs' | 'earnings' | 'availability' | 'profile' | 'settings';

type Props = {
  open: boolean;
  onClose: () => void;
  proDisplayName?: string | null;
};

const NAV: { id: Tab; label: string }[] = [
  { id: 'jobs', label: 'Jobs' },
  { id: 'earnings', label: 'Earnings' },
  { id: 'availability', label: 'Availability' },
  { id: 'profile', label: 'Profile' },
  { id: 'settings', label: 'Settings' },
];

function ThinIcon({ d }: { d: string }) {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}

export function ProviderAppExperience({ open, onClose, proDisplayName = null }: Props) {
  const [tab, setTab] = useState<Tab>('jobs');
  const [jobLoading, setJobLoading] = useState<'accept' | 'reject' | null>(null);
  const [availabilityOn, setAvailabilityOn] = useState(true);

  const handleJobAction = useCallback((action: 'accept' | 'reject') => {
    setJobLoading(action);
    window.setTimeout(() => setJobLoading(null), 600);
  }, []);

  if (!open) return null;

  const name = proDisplayName?.trim() || 'Pro';

  return (
    <div
      className="fixed inset-0 z-[90] flex flex-col bg-ds-base text-ds-text"
      role="dialog"
      aria-modal="true"
      aria-label="SEVA Pro workspace">
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-ds-line bg-ds-surface/95 px-4 py-3 backdrop-blur-xl transition-shadow duration-200 ease-out sm:px-6">
        <button
          type="button"
          onClick={onClose}
          className="text-sm font-medium text-ds-text2 transition-colors duration-200 ease-out hover:text-ds-gold">
          ← Exit
        </button>
        <div className="flex items-center gap-2">
          <span className="rounded-md border border-ds-gold/25 bg-ds-goldSoft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ds-gold">
            Pro
          </span>
          <span className="hidden text-sm font-medium text-ds-text sm:inline">SEVA Supply</span>
        </div>
        <span className="max-w-[120px] truncate text-xs text-ds-text2 sm:max-w-[200px]">{name}</span>
      </header>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <aside className="flex shrink-0 border-b border-ds-line bg-ds-elevated lg:w-[260px] lg:flex-col lg:border-b-0 lg:border-r">
          <nav className="flex gap-1 overflow-x-auto p-2 lg:flex-col lg:overflow-visible lg:p-4" aria-label="Pro navigation">
            {NAV.map((item) => {
              const active = tab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={`flex min-w-[100px] items-center gap-2 rounded-lg border-l-2 px-3 py-2.5 text-left text-sm transition duration-200 ease-out lg:min-w-0 ${
                    active
                      ? 'border-l-ds-gold bg-ds-goldSoft/40 text-ds-text'
                      : 'border-l-transparent text-ds-text2 hover:bg-ds-surface hover:text-ds-text'
                  }`}>
                  {item.id === 'jobs' ? (
                    <ThinIcon d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  ) : item.id === 'earnings' ? (
                    <ThinIcon d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  ) : item.id === 'availability' ? (
                    <ThinIcon d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  ) : item.id === 'profile' ? (
                    <ThinIcon d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  ) : (
                    <ThinIcon d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  )}
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-content space-y-8">
            {tab === 'jobs' && (
              <>
                <div>
                  <h1 className="font-serif text-3xl font-semibold tracking-tight text-ds-text sm:text-4xl">Job dashboard</h1>
                  <p className="mt-2 max-w-2xl text-base leading-relaxed text-ds-text2">
                    Incoming requests, active visits, and completed jobs — your supply engine in one place.
                  </p>
                </div>

                <section className="rounded-2xl border border-ds-line bg-ds-surface p-6 shadow-card transition duration-200 ease-out hover:shadow-cardLift">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-ds-gold">Incoming</p>
                      <h2 className="mt-2 font-serif text-xl text-ds-text">Move-out clean · Hoboken</h2>
                      <p className="mt-1 text-sm text-ds-text2">Today 4:00 PM · $189 fixed · Auto-expires in 18 min</p>
                    </div>
                    <span className="self-start rounded-md border border-ds-line bg-ds-elevated px-2 py-1 text-xs text-ds-text2">
                      New
                    </span>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button
                      className="min-w-[120px] hover:scale-[1.02]"
                      loading={jobLoading === 'accept'}
                      onClick={() => handleJobAction('accept')}>
                      Accept
                    </Button>
                    <Button
                      variant="outline"
                      className="min-w-[120px] hover:scale-[1.02]"
                      loading={jobLoading === 'reject'}
                      onClick={() => handleJobAction('reject')}>
                      Decline
                    </Button>
                  </div>
                </section>

                <div className="grid gap-6 lg:grid-cols-2">
                  <section className="rounded-2xl border border-ds-line bg-ds-surface p-6 shadow-card">
                    <h3 className="font-serif text-xl text-ds-text">Accepted</h3>
                    <ul className="mt-4 space-y-3 text-sm text-ds-text2">
                      <li className="rounded-xl border border-ds-line bg-ds-elevated px-4 py-3">
                        <p className="font-medium text-ds-text">AC tune-up</p>
                        <p className="text-xs">Tomorrow 10 AM · Jersey City</p>
                      </li>
                      <li className="rounded-xl border border-ds-line bg-ds-elevated px-4 py-3">
                        <p className="font-medium text-ds-text">Furniture assembly</p>
                        <p className="text-xs">Sat 2 PM · Weehawken</p>
                      </li>
                    </ul>
                  </section>
                  <section className="rounded-2xl border border-ds-line bg-ds-surface p-6 shadow-card">
                    <h3 className="font-serif text-xl text-ds-text">Completed</h3>
                    <ul className="mt-4 space-y-3 text-sm text-ds-text2">
                      <li className="flex items-center justify-between rounded-xl border border-ds-line bg-ds-elevated px-4 py-3">
                        <span>Deep clean</span>
                        <span className="text-ds-gold">$164</span>
                      </li>
                      <li className="flex items-center justify-between rounded-xl border border-ds-line bg-ds-elevated px-4 py-3">
                        <span>Errand run</span>
                        <span className="text-ds-gold">$72</span>
                      </li>
                    </ul>
                  </section>
                </div>

                <section className="rounded-2xl border border-ds-line bg-ds-surface p-6 shadow-card">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-serif text-xl text-ds-text">Messages</h3>
                      <p className="text-sm text-ds-text2">Direct chat with customers — real-time updates (demo).</p>
                    </div>
                    <Button variant="secondary" className="hover:scale-[1.02]">
                      Open inbox
                    </Button>
                  </div>
                </section>
              </>
            )}

            {tab === 'earnings' && (
              <>
                <h1 className="font-serif text-3xl font-semibold text-ds-text sm:text-4xl">Earnings</h1>
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    ['Total earnings', '$12,480', 'All time'],
                    ['Pending payouts', '$640', 'In escrow'],
                    ['Paid out', '$11,840', 'To your bank'],
                  ].map(([t, v, s]) => (
                    <div
                      key={t}
                      className="rounded-2xl border border-ds-line bg-ds-surface p-6 shadow-card transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-goldGlow">
                      <p className="text-xs uppercase tracking-wider text-ds-text2">{t}</p>
                      <p className="mt-2 font-serif text-2xl text-ds-text">{v}</p>
                      <p className="mt-1 text-xs text-ds-quiet">{s}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {tab === 'availability' && (
              <>
                <h1 className="font-serif text-3xl font-semibold text-ds-text sm:text-4xl">Availability</h1>
                <div className="rounded-2xl border border-ds-line bg-ds-surface p-6 shadow-card">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-medium text-ds-text">Accept new jobs automatically</p>
                      <p className="text-sm text-ds-text2">When off, you only receive invites you manually accept.</p>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={availabilityOn}
                      onClick={() => setAvailabilityOn((v) => !v)}
                      className={`flex h-8 w-14 items-center rounded-full border p-1 transition duration-200 ease-out ${
                        availabilityOn ? 'border-ds-gold/40 bg-ds-goldSoft' : 'border-ds-line bg-ds-elevated'
                      }`}>
                      <span
                        className={`h-6 w-6 rounded-full bg-ds-gold transition-[margin] duration-200 ease-out ${
                          availabilityOn ? 'ml-auto' : 'ml-0'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="mt-8 grid grid-cols-7 gap-2 text-center text-xs text-ds-text2">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d) => (
                      <div key={d} className="font-semibold text-ds-text">
                        {d}
                      </div>
                    ))}
                    {Array.from({ length: 28 }, (_, i) => (
                      <div
                        key={i}
                        className={`rounded-lg py-2 ${
                          i % 5 === 0 ? 'border border-ds-gold/30 bg-ds-goldSoft text-ds-gold' : 'border border-ds-line bg-ds-elevated'
                        }`}>
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {tab === 'profile' && (
              <>
                <h1 className="font-serif text-3xl font-semibold text-ds-text sm:text-4xl">Provider onboarding</h1>
                <div className="grid gap-4 lg:grid-cols-2">
                  {[
                    ['Profile creation', 'done'],
                    ['Identity verification', 'done'],
                    ['Skills selection', 'action'],
                    ['Service categories', 'action'],
                    ['Pricing setup', 'pending'],
                  ].map(([label, state]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between rounded-2xl border border-ds-line bg-ds-surface px-5 py-4 shadow-card transition duration-200 ease-out hover:shadow-goldGlow">
                      <span className="text-sm font-medium text-ds-text">{label}</span>
                      <span
                        className={`text-xs font-semibold uppercase tracking-wide ${
                          state === 'done'
                            ? 'text-ds-gold'
                            : state === 'action'
                              ? 'text-ds-text'
                              : 'text-ds-quiet'
                        }`}>
                        {state === 'done' ? 'Complete' : state === 'action' ? 'Continue' : 'Pending'}
                      </span>
                    </div>
                  ))}
                </div>
                <section className="rounded-2xl border border-ds-line bg-ds-surface p-6 shadow-card">
                  <h2 className="font-serif text-xl text-ds-text">Ratings & reputation</h2>
                  <p className="mt-2 text-sm text-ds-text2">This becomes your identity on the marketplace.</p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border border-ds-line bg-ds-elevated p-4">
                      <p className="text-xs text-ds-text2">Average rating</p>
                      <p className="mt-1 font-serif text-2xl text-ds-text">4.9</p>
                    </div>
                    <div className="rounded-xl border border-ds-line bg-ds-elevated p-4">
                      <p className="text-xs text-ds-text2">Jobs completed</p>
                      <p className="mt-1 font-serif text-2xl text-ds-text">186</p>
                    </div>
                    <div className="rounded-xl border border-ds-line bg-ds-elevated p-4">
                      <p className="text-xs text-ds-text2">Completion rate</p>
                      <p className="mt-1 font-serif text-2xl text-ds-text">98%</p>
                    </div>
                  </div>
                </section>
              </>
            )}

            {tab === 'settings' && (
              <>
                <h1 className="font-serif text-3xl font-semibold text-ds-text sm:text-4xl">Settings</h1>
                <p className="text-sm text-ds-text2">Notifications, payouts, insurance, and tax documents — production wiring comes next.</p>
                <div className="rounded-2xl border border-ds-line bg-ds-surface p-6">
                  <ul className="space-y-3 text-sm text-ds-text2">
                    <li className="flex justify-between border-b border-ds-line pb-3">
                      <span>Payout account</span>
                      <span className="text-ds-gold">Manage</span>
                    </li>
                    <li className="flex justify-between border-b border-ds-line pb-3">
                      <span>Notifications</span>
                      <span className="text-ds-gold">Configure</span>
                    </li>
                    <li className="flex justify-between pt-1">
                      <span>Sign out of devices</span>
                      <span className="text-ds-gold">Review</span>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
