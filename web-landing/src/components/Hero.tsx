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
  userDisplayName?: string | null;
  onLocationChange: (v: string) => void;
  onServiceChange: (v: string) => void;
  onBook: () => void;
  onBrowse: () => void;
};

export function Hero({
  location,
  service,
  userDisplayName,
  onLocationChange,
  onServiceChange,
  onBook,
  onBrowse,
}: Props) {
  return (
    <section className="relative overflow-hidden bg-lux-deep pt-24 pb-20 sm:pt-28 sm:pb-24 lg:min-h-[min(92vh,920px)] lg:pt-32 lg:pb-28">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-lux-teal/20 via-transparent to-lux-deep" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-lux-hero" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-lux-hero-floor" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(201,169,110,0.07),transparent)]" aria-hidden />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <div className="max-w-xl lg:max-w-none">
          <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.25em] text-lux-muted">
            North Jersey · White-glove matching
          </p>
          <h1 className="font-serif text-display-sm font-semibold tracking-tight text-lux-parchment sm:text-display sm:text-display-lg">
            Premium Home Services, On Demand
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-lux-muted sm:text-lg">
            Verified professionals. Transparent pricing. Seamless experience.
          </p>
          {userDisplayName ? (
            <p className="mt-4 text-sm text-lux-parchment/80">
              Signed in as <span className="text-lux-parchment">{userDisplayName}</span> — open{' '}
              <span className="text-lux-parchment">Dashboard</span> for your home or booking.
            </p>
          ) : null}

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button className="w-full sm:w-auto" onClick={onBook}>
              Book a Service
            </Button>
            <Button variant="ghost" className="w-full sm:w-auto" onClick={onBrowse}>
              Browse services
            </Button>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="loc" className="mb-2 block text-[11px] font-medium uppercase tracking-[0.2em] text-lux-muted">
                Location
              </label>
              <input
                id="loc"
                type="text"
                value={location}
                onChange={(e) => onLocationChange(e.target.value)}
                placeholder="ZIP or neighborhood"
                className="w-full rounded-lg border border-white/[0.08] bg-lux-surface px-4 py-3.5 text-sm text-lux-parchment placeholder:text-lux-muted/70 shadow-innerLight transition-colors focus:border-lux-gold/35 focus:outline-none focus:ring-1 focus:ring-lux-gold/35"
              />
            </div>
            <div>
              <label htmlFor="svc" className="mb-2 block text-[11px] font-medium uppercase tracking-[0.2em] text-lux-muted">
                Service
              </label>
              <select
                id="svc"
                value={service}
                onChange={(e) => onServiceChange(e.target.value)}
                className="w-full cursor-pointer rounded-lg border border-white/[0.08] bg-lux-surface px-4 py-3.5 text-sm text-lux-parchment shadow-innerLight focus:border-lux-gold/35 focus:outline-none focus:ring-1 focus:ring-lux-gold/35">
                {SERVICES.map((s) => (
                  <option key={s} value={s} className="bg-lux-surface text-lux-parchment">
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="relative lg:justify-self-end">
          <div className="group relative aspect-[4/5] overflow-hidden rounded-sm sm:aspect-[4/5] lg:max-h-[640px] lg:max-w-[520px]">
            <div className="absolute inset-0 bg-lux-teal/45 mix-blend-multiply" aria-hidden />
            <div className="absolute inset-0 bg-gradient-to-t from-lux-deep via-lux-teal/35 to-transparent" aria-hidden />
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000&q=85"
              alt="Refined living space"
              className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
              width={1000}
              height={1250}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <p className="font-serif text-xl text-lux-parchment sm:text-2xl">Your home, expertly cared for.</p>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-lux-muted">
                Every professional is identity-verified and backed by our satisfaction promise.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
