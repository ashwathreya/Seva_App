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
    'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  const styles: Record<Variant, string> = {
    primary:
      'bg-brand-600 text-white shadow-md hover:bg-brand-700 hover:shadow-lg active:scale-[0.98]',
    secondary:
      'bg-slate-100 text-slate-900 hover:bg-slate-200 active:scale-[0.98]',
    ghost: 'text-slate-700 hover:bg-slate-100',
    outline:
      'border-2 border-slate-200 bg-white text-slate-800 hover:border-brand-600 hover:text-brand-700',
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
