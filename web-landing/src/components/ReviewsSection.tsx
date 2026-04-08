import { Reveal } from './Reveal';

const reviews = [
  {
    name: 'Priya N.',
    loc: 'Jersey City',
    text: 'Booked a deep clean before family flew in. The pro arrived on time, the home looked immaculate, and the invoice matched the quote exactly.',
    rating: 5,
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=85',
  },
  {
    name: 'David M.',
    loc: 'Hoboken',
    text: 'Sunday leak under the sink — matched within twenty minutes, resolved same day. Finally a service that respects both my time and my home.',
    rating: 5,
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=85',
  },
  {
    name: 'Elena R.',
    loc: 'Newark',
    text: 'Mounting, small repairs, and honest pricing. Escrow meant I paid only when the work met my standard. That’s the trust I was looking for.',
    rating: 5,
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=85',
  },
];

export function ReviewsSection() {
  return (
    <section className="border-t border-white/[0.06] bg-lux-surface py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-lux-muted">Testimonials</p>
            <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-lux-parchment sm:text-4xl">
              Trusted by discerning households
            </h2>
            <p className="mt-4 text-base text-lux-muted sm:text-lg">North Jersey homeowners who expect more.</p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
          {reviews.map((r) => (
            <Reveal key={r.name}>
              <blockquote className="flex h-full flex-col border border-white/[0.06] bg-lux-charcoal/50 p-8 transition-all duration-300 hover:border-lux-gold/15 hover:shadow-innerLight">
                <div className="flex items-center gap-4">
                  <img
                    src={r.img}
                    alt=""
                    className="h-14 w-14 rounded-full object-cover ring-1 ring-lux-gold/20"
                    width={56}
                    height={56}
                  />
                  <div>
                    <cite className="not-italic font-serif text-lg font-medium text-lux-parchment">{r.name}</cite>
                    <p className="text-xs uppercase tracking-wider text-lux-muted">{r.loc}</p>
                  </div>
                </div>
                <div className="mt-5 text-lux-gold/90" aria-label={`${r.rating} out of 5 stars`}>
                  {'★'.repeat(r.rating)}
                  <span className="sr-only">{r.rating} stars</span>
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-lux-parchment/85">“{r.text}”</p>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
