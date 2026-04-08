import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
  loading?: boolean;
};

export function Button({
  variant = 'primary',
  className = '',
  children,
  loading,
  disabled,
  ...rest
}: Props) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium tracking-wide transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-ds-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-ds-base disabled:pointer-events-none disabled:opacity-45';
  const styles: Record<Variant, string> = {
    primary:
      'bg-ds-gold text-ds-base shadow-goldGlow hover:bg-ds-goldHi hover:shadow-goldGlowHover hover:scale-[1.02] active:scale-[0.98]',
    secondary:
      'border border-ds-line bg-ds-elevated text-ds-text hover:border-ds-gold/35 hover:bg-ds-surface active:scale-[0.98]',
    ghost: 'text-ds-text hover:bg-ds-surface/80 active:scale-[0.98]',
    outline:
      'border border-ds-gold/55 bg-transparent text-ds-gold hover:border-ds-gold hover:bg-ds-goldSoft/50 hover:scale-[1.02] active:scale-[0.98]',
  };

  return (
    <button
      type="button"
      className={`${base} ${styles[variant]} ${className}`}
      disabled={disabled || loading}
      {...rest}>
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </button>
  );
}
