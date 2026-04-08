import { Button } from './ui/Button';
import { Reveal } from './Reveal';

const pros = [
  {
    name: 'Jordan Kim',
    rating: 4.9,
    jobs: 128,
    price: 'From $52/hr',
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=85',
    skills: 'Handyman · Mounts · Assembly',
  },
  {
    name: 'Sam Okonkwo',
    rating: 4.85,
    jobs: 90,
    price: 'From $48/hr',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&q=85',
    skills: 'Moving · Delivery · Crew lead',
  },
  {
    name: 'Anita Patel',
    rating: 4.95,
    jobs: 210,
    price: 'From $44/hr',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a14a?w=500&q=85',
    skills: 'Deep clean · Move-out',
  },
  {
    name: 'Marcus Chen',
    rating: 4.88,
    jobs: 156,
    price: 'From $58/hr',
    img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&q=85',
    skills: 'Electrical · Smart home',
  },
];

type Props = { onViewProfile: () => void; onBecomePro: () => void };

export function FeaturedPros({ onViewProfile, onBecomePro }: Props) {
  return (
    <section id="providers" className="scroll-mt-20 bg-lux-charcoal py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <div className="max-w-xl">
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-lux-muted">Professionals</p>
              <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-lux-parchment sm:text-4xl lg:text-[2.75rem]">
                The best in your neighborhood
              </h2>
              <p className="mt-4 text-base leading-relaxed text-lux-muted sm:text-lg">
                Vetted credentials, real job history — never anonymous listings.
              </p>
            </div>
            <Button variant="outline" onClick={onBecomePro} className="shrink-0 self-start sm:self-auto">
              Become a provider
            </Button>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {pros.map((p) => (
            <Reveal key={p.name}>
              <article className="group flex h-full flex-col overflow-hidden rounded-sm border border-white/[0.06] bg-lux-surface transition-all duration-500 hover:-translate-y-1 hover:border-lux-gold/20 hover:shadow-goldGlow">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={p.img}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    width={500}
                    height={625}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-lux-charcoal via-transparent to-transparent opacity-90" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-serif text-lg font-semibold text-lux-parchment">{p.name}</h3>
                  <p className="mt-1 text-xs text-lux-muted">{p.skills}</p>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-lux-gold/95">★ {p.rating}</span>
                    <span className="text-lux-muted">{p.jobs} jobs</span>
                  </div>
                  <p className="mt-2 text-sm font-medium text-lux-parchment">{p.price}</p>
                  <Button variant="secondary" className="mt-5 w-full" onClick={onViewProfile}>
                    View profile
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
