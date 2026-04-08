import type { ReactNode } from 'react';
import { useReveal } from '../hooks/useReveal';

type Props = { children: ReactNode; className?: string };

export function Reveal({ children, className = '' }: Props) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-250 ease-out ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      } ${className}`}>
      {children}
    </div>
  );
}
