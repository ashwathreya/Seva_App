type Props = {
  label: string;
  value: number | string;
  sub?: string;
  accent?: 'default' | 'teal' | 'gold';
};

const accentBorder = {
  default: 'border-[#E6E9F0]',
  teal: 'border-[#0CB8B3]/25 bg-gradient-to-br from-[#E6FAF9] to-white',
  gold: 'border-[#F0A500]/22 bg-gradient-to-br from-[#FFFBF0] to-white',
};

export function StatTile({ label, value, sub, accent = 'default' }: Props) {
  return (
    <div
      className={`flex min-h-[88px] flex-col justify-center rounded-xl border px-3 py-3 transition duration-200 hover:border-[#0CB8B3]/30 ${accentBorder[accent]}`}>
      <p className="text-[10px] font-semibold uppercase tracking-wide text-[#8892A6]">{label}</p>
      <p className="mt-1 font-serif text-2xl font-bold tabular-nums tracking-tight text-[#0B0D12]">{value}</p>
      {sub ? <p className="mt-0.5 text-[9px] leading-tight text-[#9CA3AF]">{sub}</p> : null}
    </div>
  );
}
