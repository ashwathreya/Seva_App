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
    'inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-lux-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-lux-deep disabled:pointer-events-none disabled:opacity-45';
  const styles: Record<Variant, string> = {
    primary:
      'bg-lux-gold text-lux-charcoal shadow-goldGlow hover:bg-lux-gold-hover hover:shadow-goldGlowHover active:scale-[0.98]',
    secondary:
      'border border-white/[0.12] bg-white/[0.04] text-lux-parchment hover:border-white/[0.18] hover:bg-white/[0.07] active:scale-[0.98]',
    ghost: 'text-lux-parchment/90 hover:bg-white/[0.06]',
    outline:
      'border border-lux-gold/40 bg-transparent text-lux-gold hover:border-lux-gold/60 hover:bg-lux-gold/[0.08]',
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
