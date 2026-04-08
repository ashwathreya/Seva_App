const STROKE_PATHS: Record<string, string[]> = {
  shield: ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10'],
  check: ['M20 6L9 17l-5-5'],
  msg: ['M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z'],
  lock: ['M19 11H5a2 2 0 00-2 2v6a2 2 0 002 2h14a2 2 0 002-2v-6a2 2 0 00-2-2', 'M7 11V7a5 5 0 0110 0v4'],
  pin: ['M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z', 'M12 10m-3 0a3 3 0 106 0 3 3 0 00-6 0'],
  search: ['M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0'],
  home: ['M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z', 'M9 22V12h6v10'],
  bell: ['M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9', 'M13.73 21a2 2 0 01-3.46 0'],
  user: ['M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2', 'M12 11a4 4 0 100-8 4 4 0 000 8'],
  life: ['M22 12h-4l-3 9L9 3l-3 9H2'],
};

export function StrokeIcon({
  name,
  size,
  color,
  className,
}: {
  name: string;
  size: number;
  color: string;
  className?: string;
}) {
  const paths = STROKE_PATHS[name] ?? [];
  return (
    <svg
      className={`shrink-0 ${className ?? ''}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden>
      {paths.map((d) => (
        <path key={d.slice(0, 24)} d={d} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </svg>
  );
}
