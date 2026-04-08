import { Button } from './ui/Button';
import { Reveal } from './Reveal';

const services = [
  {
    name: 'Cleaning',
    price: 'From $98',
    rating: 4.9,
    img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=85',
    alt: 'Immaculate home interior',
  },
  {
    name: 'Plumbing',
    price: 'From $95',
    rating: 4.8,
    img: 'https://images.unsplash.com/photo-1585704032919-ce89e91875c4?w=800&q=85',
    alt: 'Professional plumbing work',
  },
  {
    name: 'Electrical',
    price: 'From $105',
    rating: 4.9,
    img: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=85',
    alt: 'Electrical installation',
  },
  {
    name: 'AC repair',
    price: 'From $89',
    rating: 4.8,
    img: 'https://images.unsplash.com/photo-1631545846186-c09538dbfe5b?w=800&q=85',
    alt: 'Climate control service',
  },
  {
    name: 'Handyman',
    price: 'From $65',
    rating: 4.9,
    img: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&q=85',
    alt: 'Handyman at work',
  },
  {
    name: 'Painting',
    price: 'From $120',
    rating: 4.8,
    img: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&q=85',
    alt: 'Interior painting',
  },
  {
    name: 'Moving help',
    price: 'From $118',
    rating: 4.9,
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=85',
    alt: 'Moving and delivery',
  },
  {
    name: 'Mounting',
    price: 'From $69',
    rating: 4.8,
    img: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=85',
    alt: 'TV and fixture mounting',
  },
];

type Props = { onBook: () => void };

export function ServicesGrid({ onBook }: Props) {
  return (
    <section id="services" className="scroll-mt-20 bg-lux-charcoal py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-lux-muted">Services</p>
            <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-lux-parchment sm:text-4xl lg:text-[2.75rem]">
              Curated for your home
            </h2>
            <p className="mt-4 text-base leading-relaxed text-lux-muted sm:text-lg">
              Clear starting prices. Final quotes are fixed before any work begins — no surprises.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {services.map((s) => (
            <Reveal key={s.name}>
              <article className="group flex h-full flex-col overflow-hidden rounded-sm border border-white/[0.06] bg-lux-surface shadow-card transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:border-lux-gold/25 hover:shadow-goldGlowHover">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.alt}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    width={800}
                    height={600}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-lux-charcoal/80 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-lux-charcoal/70 px-2.5 py-1 text-[11px] text-lux-parchment backdrop-blur-sm">
                    <span className="text-lux-gold">★</span>
                    {s.rating}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-serif text-xl font-semibold text-lux-parchment">{s.name}</h3>
                  <p className="mt-1 text-sm text-lux-gold/95">{s.price}</p>
                  <Button variant="secondary" className="mt-5 w-full" onClick={onBook}>
                    Book
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
