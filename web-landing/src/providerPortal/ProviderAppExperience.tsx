import { useCallback, useMemo, useState } from 'react';
import { Button } from '../components/ui/Button';
import { topProviders, type ProviderCandidate } from './data/matching';

type Tab = 'jobs' | 'earnings' | 'availability' | 'profile' | 'settings';
type OnboardStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

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

const SERVICES = ['Cleaning', 'Plumbing', 'Electrical', 'AC Repair'];

const CANDIDATES: ProviderCandidate[] = [
  {
    id: 'p_1',
    name: 'John Doe',
    lat: 40.742,
    lng: -74.034,
    rating: 4.8,
    totalJobs: 122,
    avgResponseMinutes: 9,
    isAvailable: true,
  },
  {
    id: 'p_2',
    name: 'Maya Chen',
    lat: 40.731,
    lng: -74.044,
    rating: 4.9,
    totalJobs: 186,
    avgResponseMinutes: 7,
    isAvailable: true,
  },
  {
    id: 'p_3',
    name: 'Carlos M',
    lat: 40.712,
    lng: -74.078,
    rating: 4.7,
    totalJobs: 89,
    avgResponseMinutes: 18,
    isAvailable: false,
  },
  {
    id: 'p_4',
    name: 'Anita S',
    lat: 40.755,
    lng: -73.994,
    rating: 4.6,
    totalJobs: 214,
    avgResponseMinutes: 13,
    isAvailable: true,
  },
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

  const [step, setStep] = useState<OnboardStep>(1);
  const [name, setName] = useState(proDisplayName ?? '');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState<string[]>(['Cleaning']);
  const [servicePrices, setServicePrices] = useState<Record<string, string>>({
    Cleaning: '55',
    Plumbing: '85',
    Electrical: '95',
    'AC Repair': '110',
  });
  const [days, setDays] = useState<string[]>(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
  const [timeSlot, setTimeSlot] = useState('09:00 - 17:00');
  const [area, setArea] = useState('Jersey City, Hoboken');
  const [idVerified, setIdVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);

  const ranked = useMemo(
    () =>
      topProviders({
        customerLat: 40.7282,
        customerLng: -74.0776,
        providers: CANDIDATES,
      }, 3),
    [],
  );

  const onboardingComplete = step === 8;

  const handleJobAction = useCallback((action: 'accept' | 'reject') => {
    setJobLoading(action);
    window.setTimeout(() => setJobLoading(null), 600);
  }, []);

  if (!open) return null;

  const displayName = proDisplayName?.trim() || 'Provider';

  return (
    <div className="fixed inset-0 z-[90] flex flex-col bg-ds-base text-ds-text" role="dialog" aria-modal="true" aria-label="SEVA Pro workspace">
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-ds-line bg-ds-surface/95 px-4 py-3 backdrop-blur-xl transition-shadow duration-200 ease-out sm:px-6">
        <button type="button" onClick={onClose} className="text-sm font-medium text-ds-text2 transition-colors duration-200 ease-out hover:text-ds-gold">
          ← Exit
        </button>
        <div className="flex items-center gap-2">
          <span className="rounded-md border border-ds-gold/25 bg-ds-goldSoft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ds-gold">Pro</span>
          <span className="hidden text-sm font-medium text-ds-text sm:inline">SEVA Supply</span>
        </div>
        <span className="max-w-[120px] truncate text-xs text-ds-text2 sm:max-w-[200px]">{displayName}</span>
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
                    active ? 'border-l-ds-gold bg-ds-goldSoft/40 text-ds-text' : 'border-l-transparent text-ds-text2 hover:bg-ds-surface hover:text-ds-text'
                  }`}>
                  {item.id === 'jobs' ? <ThinIcon d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /> : null}
                  {item.id === 'earnings' ? <ThinIcon d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> : null}
                  {item.id === 'availability' ? <ThinIcon d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /> : null}
                  {item.id === 'profile' ? <ThinIcon d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /> : null}
                  {item.id === 'settings' ? <ThinIcon d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" /> : null}
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-content space-y-8">
            {tab === 'jobs' ? (
              <>
                <div>
                  <h1 className="font-serif text-3xl font-semibold tracking-tight text-ds-text sm:text-4xl">Job dashboard</h1>
                  <p className="mt-2 max-w-2xl text-base leading-relaxed text-ds-text2">
                    Incoming job requests, accepted visits, and completed work. Supply side drives revenue.
                  </p>
                </div>

                <section className="rounded-2xl border border-ds-line bg-ds-surface p-6 shadow-card">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-ds-gold">Incoming request</p>
                      <h2 className="mt-2 font-serif text-xl text-ds-text">Move-out clean · Hoboken</h2>
                      <p className="mt-1 text-sm text-ds-text2">Today 4:00 PM · $189 fixed · Auto-expires in 18 min</p>
                    </div>
                    <span className="self-start rounded-md border border-ds-line bg-ds-elevated px-2 py-1 text-xs text-ds-text2">New</span>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button className="min-w-[120px]" loading={jobLoading === 'accept'} onClick={() => handleJobAction('accept')}>
                      Accept
                    </Button>
                    <Button variant="outline" className="min-w-[120px]" loading={jobLoading === 'reject'} onClick={() => handleJobAction('reject')}>
                      Reject
                    </Button>
                  </div>
                </section>

                <section className="rounded-2xl border border-ds-line bg-ds-surface p-6 shadow-card">
                  <h3 className="font-serif text-xl text-ds-text">Matching engine preview</h3>
                  <p className="mt-1 text-sm text-ds-text2">Top providers ranked by availability, distance, rating, experience, and response time.</p>
                  <div className="mt-4 space-y-2">
                    {ranked.map((p, idx) => (
                      <div key={p.id} className="rounded-xl border border-ds-line bg-ds-elevated px-4 py-3 text-sm">
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-medium text-ds-text">#{idx + 1} {p.name}</p>
                          <p className="font-semibold text-ds-gold">Score {(p.score * 100).toFixed(1)}</p>
                        </div>
                        <p className="mt-1 text-xs text-ds-text2">
                          ⭐ {p.rating} · Jobs {p.totalJobs} · Response {p.avgResponseMinutes} min · {p.isAvailable ? 'Available' : 'Unavailable'}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            ) : null}

            {tab === 'earnings' ? (
              <>
                <h1 className="font-serif text-3xl font-semibold text-ds-text sm:text-4xl">Earnings dashboard</h1>
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    ['Total earnings', '$12,480', 'All time'],
                    ['Pending payouts', '$640', 'Escrow hold'],
                    ['Completed payouts', '$11,840', 'Released'],
                  ].map(([title, value, sub]) => (
                    <div key={title} className="rounded-2xl border border-ds-line bg-ds-surface p-6 shadow-card">
                      <p className="text-xs uppercase tracking-wider text-ds-text2">{title}</p>
                      <p className="mt-2 font-serif text-2xl text-ds-text">{value}</p>
                      <p className="mt-1 text-xs text-ds-quiet">{sub}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {tab === 'availability' ? (
              <>
                <h1 className="font-serif text-3xl font-semibold text-ds-text sm:text-4xl">Availability system</h1>
                <div className="rounded-2xl border border-ds-line bg-ds-surface p-6 shadow-card">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-medium text-ds-text">Auto-availability toggle</p>
                      <p className="text-sm text-ds-text2">When off, you manually accept every incoming booking.</p>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={availabilityOn}
                      onClick={() => setAvailabilityOn((v) => !v)}
                      className={`flex h-8 w-14 items-center rounded-full border p-1 transition duration-200 ease-out ${availabilityOn ? 'border-ds-gold/40 bg-ds-goldSoft' : 'border-ds-line bg-ds-elevated'}`}>
                      <span className={`h-6 w-6 rounded-full bg-ds-gold transition-[margin] duration-200 ease-out ${availabilityOn ? 'ml-auto' : 'ml-0'}`} />
                    </button>
                  </div>
                  <p className="mt-4 text-sm text-ds-text2">Working days: {days.join(', ')} · Slot: {timeSlot}</p>
                </div>
              </>
            ) : null}

            {tab === 'profile' ? (
              <>
                <h1 className="font-serif text-3xl font-semibold text-ds-text sm:text-4xl">Provider onboarding</h1>
                <p className="text-sm text-ds-text2">Goal: "Joining this platform will make me money".</p>

                <div className="rounded-2xl border border-ds-line bg-ds-surface p-6 shadow-card">
                  <div className="mb-5 grid grid-cols-8 gap-2">
                    {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
                      <div key={n} className={`h-2 rounded ${n <= step ? 'bg-ds-gold' : 'bg-ds-elevated'}`} />
                    ))}
                  </div>

                  {step === 1 ? (
                    <div className="space-y-4">
                      <h2 className="font-serif text-2xl text-ds-text">Step 1: Sign up</h2>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="rounded-xl border border-ds-line bg-ds-elevated px-3 py-2 text-sm" />
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="rounded-xl border border-ds-line bg-ds-elevated px-3 py-2 text-sm" />
                        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="rounded-xl border border-ds-line bg-ds-elevated px-3 py-2 text-sm" />
                        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="rounded-xl border border-ds-line bg-ds-elevated px-3 py-2 text-sm" />
                      </div>
                    </div>
                  ) : null}

                  {step === 2 ? (
                    <div className="space-y-4">
                      <h2 className="font-serif text-2xl text-ds-text">Step 2: Professional profile</h2>
                      <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio" className="min-h-24 w-full rounded-xl border border-ds-line bg-ds-elevated px-3 py-2 text-sm" />
                      <p className="text-xs text-ds-text2">Profile image upload can be wired to cloud storage later.</p>
                    </div>
                  ) : null}

                  {step === 3 ? (
                    <div className="space-y-4">
                      <h2 className="font-serif text-2xl text-ds-text">Step 3: Service selection</h2>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {SERVICES.map((s) => {
                          const active = skills.includes(s);
                          return (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setSkills((prev) => (prev.includes(s) ? prev.filter((v) => v !== s) : [...prev, s]))}
                              className={`rounded-xl border px-4 py-2 text-left text-sm ${active ? 'border-ds-gold bg-ds-goldSoft text-ds-text' : 'border-ds-line bg-ds-elevated text-ds-text2'}`}>
                              {s}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}

                  {step === 4 ? (
                    <div className="space-y-4">
                      <h2 className="font-serif text-2xl text-ds-text">Step 4: Pricing</h2>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {SERVICES.map((s) => (
                          <label key={s} className="rounded-xl border border-ds-line bg-ds-elevated p-3 text-sm">
                            <p className="mb-1 text-ds-text">{s}</p>
                            <input
                              value={servicePrices[s] ?? ''}
                              onChange={(e) => setServicePrices((prev) => ({ ...prev, [s]: e.target.value }))}
                              className="w-full rounded-lg border border-ds-line bg-ds-base px-2 py-1 text-sm"
                              placeholder="Price"
                            />
                          </label>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {step === 5 ? (
                    <div className="space-y-4">
                      <h2 className="font-serif text-2xl text-ds-text">Step 5: Availability</h2>
                      <div className="flex flex-wrap gap-2">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => {
                          const active = days.includes(d);
                          return (
                            <button
                              key={d}
                              type="button"
                              onClick={() => setDays((prev) => (prev.includes(d) ? prev.filter((v) => v !== d) : [...prev, d]))}
                              className={`rounded-lg border px-3 py-1 text-sm ${active ? 'border-ds-gold bg-ds-goldSoft text-ds-text' : 'border-ds-line bg-ds-elevated text-ds-text2'}`}>
                              {d}
                            </button>
                          );
                        })}
                      </div>
                      <input value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} className="w-full rounded-xl border border-ds-line bg-ds-elevated px-3 py-2 text-sm" />
                    </div>
                  ) : null}

                  {step === 6 ? (
                    <div className="space-y-4">
                      <h2 className="font-serif text-2xl text-ds-text">Step 6: Location</h2>
                      <input value={area} onChange={(e) => setArea(e.target.value)} className="w-full rounded-xl border border-ds-line bg-ds-elevated px-3 py-2 text-sm" />
                      <p className="text-xs text-ds-text2">Map picker integration can be added with Google Maps API.</p>
                    </div>
                  ) : null}

                  {step === 7 ? (
                    <div className="space-y-4">
                      <h2 className="font-serif text-2xl text-ds-text">Step 7: Verification</h2>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" checked={idVerified} onChange={(e) => setIdVerified(e.target.checked)} /> ID verification complete
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" checked={phoneVerified} onChange={(e) => setPhoneVerified(e.target.checked)} /> Phone verification complete
                      </label>
                    </div>
                  ) : null}

                  {step === 8 ? (
                    <div className="space-y-3">
                      <h2 className="font-serif text-2xl text-ds-text">Step 8: Onboarding complete</h2>
                      <p className="text-sm text-ds-text2">You are ready to start receiving bookings.</p>
                      <Button onClick={() => setTab('jobs')}>Go to dashboard</Button>
                    </div>
                  ) : null}

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button variant="secondary" disabled={step === 1} onClick={() => setStep((s) => (s > 1 ? ((s - 1) as OnboardStep) : s))}>
                      Back
                    </Button>
                    <Button
                      disabled={(step === 7 && (!idVerified || !phoneVerified)) || (step === 1 && (!name || !email || !password))}
                      onClick={() => setStep((s) => (s < 8 ? ((s + 1) as OnboardStep) : s))}>
                      {onboardingComplete ? 'Done' : 'Continue'}
                    </Button>
                  </div>
                </div>
              </>
            ) : null}

            {tab === 'settings' ? (
              <>
                <h1 className="font-serif text-3xl font-semibold text-ds-text sm:text-4xl">Settings</h1>
                <p className="text-sm text-ds-text2">Notifications, payouts, insurance, and tax docs.</p>
                <div className="rounded-2xl border border-ds-line bg-ds-surface p-6">
                  <ul className="space-y-3 text-sm text-ds-text2">
                    <li className="flex justify-between border-b border-ds-line pb-3"><span>Payout account</span><span className="text-ds-gold">Manage</span></li>
                    <li className="flex justify-between border-b border-ds-line pb-3"><span>Notifications</span><span className="text-ds-gold">Configure</span></li>
                    <li className="flex justify-between pt-1"><span>Sign out of devices</span><span className="text-ds-gold">Review</span></li>
                  </ul>
                </div>
              </>
            ) : null}
          </div>
        </main>
      </div>
    </div>
  );
}
