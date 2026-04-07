import { Button } from './ui/Button';

const services = [
  { name: 'Cleaning', price: 'From $98', emoji: '🧹', tint: 'bg-sky-500/15 text-sky-100 ring-sky-400/30' },
  { name: 'Plumbing', price: 'From $95', emoji: '🔧', tint: 'bg-amber-500/15 text-amber-100 ring-amber-400/30' },
  { name: 'Electrical', price: 'From $105', emoji: '⚡', tint: 'bg-violet-500/15 text-violet-100 ring-violet-400/30' },
  { name: 'AC repair', price: 'From $89', emoji: '❄️', tint: 'bg-cyan-500/15 text-cyan-100 ring-cyan-400/30' },
  { name: 'Handyman', price: 'From $65', emoji: '🛠️', tint: 'bg-orange-500/15 text-orange-100 ring-orange-400/30' },
  { name: 'Painting', price: 'From $120', emoji: '🎨', tint: 'bg-rose-500/15 text-rose-100 ring-rose-400/30' },
  { name: 'Moving help', price: 'From $118', emoji: '📦', tint: 'bg-indigo-500/15 text-indigo-100 ring-indigo-400/30' },
  { name: 'Mounting', price: 'From $69', emoji: '📺', tint: 'bg-white/10 text-seva-ink ring-white/20' },
];

type Props = { onBook: () => void };

export function ServicesGrid({ onBook }: Props) {
  return (
    <section id="services" className="scroll-mt-20 bg-seva-deep py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Popular services</h2>
          <p className="mt-3 text-lg text-seva-muted">
            Upfront starting prices for standard visits. Final quotes are locked before work begins.
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <article
              key={s.name}
              className="flex flex-col rounded-2xl border border-white/10 bg-seva-soft/40 p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-seva-gold/35 hover:shadow-cardHover">
              <div
                className={`inline-flex h-12 w-12 items-center justify-center rounded-xl text-2xl ring-1 ${s.tint}`}>
                <span aria-hidden>{s.emoji}</span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-white">{s.name}</h3>
              <p className="mt-1 text-sm font-semibold text-seva-gold">{s.price}</p>
              <Button variant="secondary" className="mt-5 w-full" onClick={onBook}>
                Book now
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
