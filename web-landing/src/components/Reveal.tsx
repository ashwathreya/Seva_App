import type { ReactNode } from 'react';
import { useReveal } from '../hooks/useReveal';

type Props = { children: ReactNode; className?: string };

export function Reveal({ children, className = '' }: Props) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-[720ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      } ${className}`}>
      {children}
    </div>
  );
}
