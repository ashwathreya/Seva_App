const items = [
  { icon: '★', title: '4.8 / 5', sub: 'Average service rating' },
  { icon: '✓', title: '10,000+', sub: 'Bookings completed' },
  { icon: '◎', title: 'Verified', sub: 'ID & background checks' },
  { icon: '♥', title: 'Satisfaction', sub: 'We make it right or refund' },
];

export function TrustBar() {
  return (
    <section className="border-y border-slate-100 bg-slate-50/80 py-10">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
        {items.map((it) => (
          <div
            key={it.title}
            className="group rounded-2xl border border-slate-200/80 bg-white p-4 text-center shadow-sm transition-all duration-200 hover:border-brand-200 hover:shadow-md sm:p-5">
            <span className="text-lg text-brand-600" aria-hidden>
              {it.icon}
            </span>
            <p className="mt-2 text-lg font-bold text-slate-900">{it.title}</p>
            <p className="text-xs font-medium text-slate-500 sm:text-sm">{it.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
