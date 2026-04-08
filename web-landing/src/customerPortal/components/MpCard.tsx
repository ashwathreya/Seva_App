import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md';
  interactive?: boolean;
};

const pad = { none: '', sm: 'p-3', md: 'p-4' };

export function MpCard({ children, className = '', padding = 'md', interactive }: Props) {
  return (
    <div
      className={`rounded-2xl border border-[#E6E9F0] bg-white shadow-[0_1px_0_rgba(15,23,42,0.04)] ${pad[padding]} ${
        interactive
          ? 'transition duration-200 hover:border-[#0CB8B3]/35 hover:shadow-[0_8px_24px_rgba(15,61,62,0.08)] active:scale-[0.995]'
          : ''
      } ${className}`}>
      {children}
    </div>
  );
}
