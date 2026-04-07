import { Button } from './ui/Button';

const pros = [
  {
    name: 'Jordan Kim',
    rating: 4.9,
    jobs: 128,
    price: 'From $52/hr',
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
    skills: 'Handyman · Mounts · Assembly',
  },
  {
    name: 'Sam Okonkwo',
    rating: 4.85,
    jobs: 90,
    price: 'From $48/hr',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    skills: 'Moving · Delivery · Crew lead',
  },
  {
    name: 'Anita Patel',
    rating: 4.95,
    jobs: 210,
    price: 'From $44/hr',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a14a?w=400&q=80',
    skills: 'Deep clean · Move-out',
  },
  {
    name: 'Marcus Chen',
    rating: 4.88,
    jobs: 156,
    price: 'From $58/hr',
    img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
    skills: 'Electrical · Smart home',
  },
];

type Props = { onViewProfile: () => void; onBecomePro: () => void };

export function FeaturedPros({ onViewProfile, onBecomePro }: Props) {
  return (
    <section id="providers" className="scroll-mt-20 bg-seva-deep py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Featured professionals</h2>
            <p className="mt-3 text-lg text-seva-muted">
              Top-rated locals with verified credentials and real job history — not anonymous listings.
            </p>
          </div>
          <Button variant="outline" onClick={onBecomePro} className="shrink-0 self-start sm:self-auto">
            Become a provider
          </Button>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pros.map((p) => (
            <article
              key={p.name}
              className="overflow-hidden rounded-2xl border border-white/10 bg-seva-soft/30 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-seva-gold/25 hover:shadow-cardHover">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.img} alt="" className="h-full w-full object-cover" width={400} height={300} />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-white">{p.name}</h3>
                <p className="mt-0.5 text-xs text-seva-muted">{p.skills}</p>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="font-semibold text-seva-gold">★ {p.rating}</span>
                  <span className="text-seva-muted">{p.jobs} jobs</span>
                </div>
                <p className="mt-2 text-sm font-bold text-seva-gold">{p.price}</p>
                <Button variant="secondary" className="mt-4 w-full" onClick={onViewProfile}>
                  View profile
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
