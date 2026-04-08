import type { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
  /** `onDark`: inputs on charcoal surfaces (gold focus). `onLight`: auth modal / light cards. */
  surface?: 'onLight' | 'onDark';
};

export function Input({ label, error, hint, id, className = '', surface = 'onLight', ...rest }: Props) {
  const inputId = id ?? label.replace(/\s/g, '-').toLowerCase();

  const labelCls =
    surface === 'onDark' ? 'text-ds-text2' : 'text-slate-700';

  const inputCls =
    surface === 'onDark'
      ? `w-full rounded-xl border bg-ds-surface px-4 py-3 text-ds-text shadow-innerLight transition duration-200 ease-out placeholder:text-ds-quiet focus:border-ds-gold focus:outline-none focus:shadow-inputFocus ${
          error ? 'border-red-400/80' : 'border-ds-line'
        }`
      : `w-full rounded-xl border bg-white px-4 py-3 text-slate-900 shadow-sm transition duration-200 ease-out placeholder:text-slate-400 focus:border-ds-gold focus:outline-none focus:ring-2 focus:ring-ds-gold/20 ${
          error ? 'border-red-400' : 'border-slate-200'
        }`;

  return (
    <div className="w-full">
      <label htmlFor={inputId} className={`mb-2 block text-sm font-medium ${labelCls}`}>
        {label}
      </label>
      <input
        id={inputId}
        className={`${inputCls} ${className}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-err` : hint ? `${inputId}-hint` : undefined}
        {...rest}
      />
      {hint && !error ? (
        <p id={`${inputId}-hint`} className={`mt-2 text-xs ${surface === 'onDark' ? 'text-ds-quiet' : 'text-slate-500'}`}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${inputId}-err`} className="mt-2 text-sm font-medium text-red-500" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
