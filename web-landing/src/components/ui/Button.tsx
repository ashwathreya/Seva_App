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
    'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-seva-gold focus-visible:ring-offset-2 focus-visible:ring-offset-seva-deep disabled:opacity-50 disabled:pointer-events-none';
  const styles: Record<Variant, string> = {
    primary:
      'bg-seva-gold text-seva-night shadow-md hover:brightness-105 hover:shadow-goldGlow active:scale-[0.98]',
    secondary:
      'border border-white/20 bg-white/10 text-seva-ink backdrop-blur-sm hover:bg-white/15 active:scale-[0.98]',
    ghost: 'text-seva-ink hover:bg-white/10',
    outline:
      'border-2 border-seva-gold/50 bg-transparent text-seva-gold hover:bg-seva-gold/10',
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
