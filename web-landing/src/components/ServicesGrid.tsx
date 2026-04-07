import { Button } from './ui/Button';

const services = [
  { name: 'Cleaning', price: 'From $98', emoji: '🧹', tint: 'bg-sky-50 text-sky-800 ring-sky-100' },
  { name: 'Plumbing', price: 'From $95', emoji: '🔧', tint: 'bg-amber-50 text-amber-900 ring-amber-100' },
  { name: 'Electrical', price: 'From $105', emoji: '⚡', tint: 'bg-violet-50 text-violet-900 ring-violet-100' },
  { name: 'AC repair', price: 'From $89', emoji: '❄️', tint: 'bg-cyan-50 text-cyan-900 ring-cyan-100' },
  { name: 'Handyman', price: 'From $65', emoji: '🛠️', tint: 'bg-orange-50 text-orange-900 ring-orange-100' },
  { name: 'Painting', price: 'From $120', emoji: '🎨', tint: 'bg-rose-50 text-rose-900 ring-rose-100' },
  { name: 'Moving help', price: 'From $118', emoji: '📦', tint: 'bg-indigo-50 text-indigo-900 ring-indigo-100' },
  { name: 'Mounting', price: 'From $69', emoji: '📺', tint: 'bg-slate-100 text-slate-800 ring-slate-200' },
];

type Props = { onBook: () => void };

export function ServicesGrid({ onBook }: Props) {
  return (
    <section id="services" className="scroll-mt-20 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Popular services</h2>
          <p className="mt-3 text-lg text-slate-600">
            Upfront starting prices for standard visits. Final quotes are locked before work begins.
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <article
              key={s.name}
              className="flex flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-cardHover">
              <div
                className={`inline-flex h-12 w-12 items-center justify-center rounded-xl text-2xl ring-1 ${s.tint}`}>
                <span aria-hidden>{s.emoji}</span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">{s.name}</h3>
              <p className="mt-1 text-sm font-semibold text-brand-700">{s.price}</p>
              <Button className="mt-5 w-full" variant="secondary" onClick={onBook}>
                Book now
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
