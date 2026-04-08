import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'dangerOutline';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
};

const ON_GOLD = '#09090E';
const TEAL = '#0CB8B3';

export function MpButton({
  variant = 'primary',
  className = '',
  children,
  loading,
  disabled,
  fullWidth,
  ...rest
}: Props) {
  const base =
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0CB8B3]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F1F3F8] disabled:pointer-events-none disabled:opacity-45 active:scale-[0.98]';
  const styles: Record<Variant, string> = {
    primary: 'text-[#09090E] shadow-[0_1px_0_rgba(0,0,0,0.06)] hover:brightness-105',
    secondary: 'border border-[#D8DCE6] bg-white text-[#0B0D12] hover:border-[#0CB8B3]/40 hover:bg-[#FAFBFD]',
    ghost: 'text-[#5C6578] hover:bg-black/[0.04] hover:text-[#0B0D12]',
    dangerOutline: 'border border-red-200 bg-white text-red-700 hover:bg-red-50',
  };

  const style =
    variant === 'primary' ? { background: '#F0A500', color: ON_GOLD } : undefined;

  return (
    <button
      type="button"
      className={`${base} ${styles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      style={style}
      disabled={disabled || loading}
      {...rest}>
      {loading ? (
        <span
          className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-t-transparent"
          style={{
            borderColor: variant === 'primary' ? `${ON_GOLD}40` : `${TEAL}40`,
            borderTopColor: 'transparent',
          }}
        />
      ) : null}
      {children}
    </button>
  );
}
