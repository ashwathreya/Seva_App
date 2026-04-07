import { Button } from './ui/Button';

const SERVICES = [
  'Home cleaning',
  'Plumbing',
  'Electrical',
  'AC repair',
  'Handyman',
  'Painting',
];

type Props = {
  location: string;
  service: string;
  onLocationChange: (v: string) => void;
  onServiceChange: (v: string) => void;
  onBook: () => void;
  onBrowse: () => void;
};

export function Hero({
  location,
  service,
  onLocationChange,
  onServiceChange,
  onBook,
  onBrowse,
}: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white pt-24 pb-16 sm:pt-28 sm:pb-24 lg:pt-32 lg:pb-28">
      <div
        className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-100">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Live in North Jersey · Same-day slots
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
            Book trusted home services in minutes
          </h1>
          <p className="mt-4 max-w-xl text-lg text-slate-600 sm:text-xl">
            Verified professionals. Transparent pricing. Instant booking.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button className="w-full min-w-[200px] sm:w-auto" onClick={onBook}>
              Book a Service
            </Button>
            <Button variant="outline" className="w-full min-w-[200px] sm:w-auto" onClick={onBrowse}>
              Browse Services
            </Button>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="loc" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Your location
              </label>
              <input
                id="loc"
                type="text"
                value={location}
                onChange={(e) => onLocationChange(e.target.value)}
                placeholder="ZIP or neighborhood"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm transition-colors placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
            <div>
              <label htmlFor="svc" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                What do you need?
              </label>
              <select
                id="svc"
                value={service}
                onChange={(e) => onServiceChange(e.target.value)}
                className="w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20">
                {SERVICES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="relative lg:justify-self-end">
          <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-card ring-1 ring-slate-200/80 transition-shadow duration-300 hover:shadow-cardHover">
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900&q=80"
              alt="Professional home cleaner preparing supplies in a bright living room"
              className="h-full w-full object-cover"
              width={900}
              height={675}
            />
          </div>
          <div className="absolute -bottom-4 -left-4 max-w-[220px] rounded-xl bg-white p-4 shadow-card ring-1 ring-slate-100 sm:-bottom-6 sm:-left-6 sm:max-w-xs sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">Typical response</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">&lt; 15 min</p>
            <p className="text-sm text-slate-600">Avg. pro reply time in your area today</p>
          </div>
        </div>
      </div>
    </section>
  );
}
