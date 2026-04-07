const items = [
  { icon: '★', title: '4.8 / 5', sub: 'Average service rating' },
  { icon: '✓', title: '10,000+', sub: 'Bookings completed' },
  { icon: '◎', title: 'Verified', sub: 'ID & background checks' },
  { icon: '♥', title: 'Satisfaction', sub: 'We make it right or refund' },
];

export function TrustBar() {
  return (
    <section className="border-y border-white/10 bg-seva-soft py-10">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
        {items.map((it) => (
          <div
            key={it.title}
            className="group rounded-2xl border border-white/10 bg-seva-deep/50 p-4 text-center shadow-sm transition-all duration-200 hover:border-seva-gold/30 hover:bg-seva-deep sm:p-5">
            <span className="text-lg text-seva-gold" aria-hidden>
              {it.icon}
            </span>
            <p className="mt-2 text-lg font-bold text-white">{it.title}</p>
            <p className="text-xs font-medium text-seva-muted sm:text-sm">{it.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
