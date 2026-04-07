const reviews = [
  {
    name: 'Priya N.',
    loc: 'Jersey City',
    text: 'Booked a deep clean before family flew in. Pro showed up on time, brought supplies, and the place looked magazine-level. Price matched the quote in the app.',
    rating: 5,
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
  },
  {
    name: 'David M.',
    loc: 'Hoboken',
    text: 'Had a leak under the sink on a Sunday. Matched with someone in under 20 minutes, fixed same day. Way less stress than calling random numbers from search.',
    rating: 5,
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
  },
  {
    name: 'Elena R.',
    loc: 'Newark',
    text: 'Used SEVA for TV mounting and a few odd jobs. Every pro had reviews I could actually trust. Escrow meant I wasn’t paying until I was happy.',
    rating: 5,
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
  },
];

export function ReviewsSection() {
  return (
    <section className="border-t border-slate-100 bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Customers stick with SEVA</h2>
          <p className="mt-3 text-lg text-slate-600">Real bookings from busy households across North Jersey.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <blockquote
              key={r.name}
              className="flex flex-col rounded-2xl border border-slate-100 bg-slate-50/50 p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-center gap-3">
                <img
                  src={r.img}
                  alt=""
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-white"
                  width={48}
                  height={48}
                />
                <div>
                  <cite className="not-italic font-bold text-slate-900">{r.name}</cite>
                  <p className="text-xs text-slate-500">{r.loc}</p>
                </div>
              </div>
              <div className="mt-3 text-amber-500" aria-label={`${r.rating} out of 5`}>
                {'★'.repeat(r.rating)}
                <span className="sr-only">{r.rating} stars</span>
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-700">“{r.text}”</p>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
