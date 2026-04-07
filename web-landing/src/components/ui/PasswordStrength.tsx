type Props = { password: string };

/** 0–4 maps to label index; bar fill uses min(s, 4) segments lit */
function score(pw: string): number {
  if (pw.length < 6) return 0;
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return Math.min(s, 4);
}

const labels = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong'];

export function PasswordStrength({ password }: Props) {
  if (!password) return null;
  const s = score(password);
  const label = labels[s];
  return (
    <div className="mt-2 space-y-1">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
              i < s ? (s >= 3 ? 'bg-emerald-500' : 'bg-amber-400') : 'bg-slate-200'
            }`}
          />
        ))}
      </div>
      <p className="text-xs font-medium text-slate-600">
        Password strength: <span className="text-slate-900">{label}</span>
      </p>
    </div>
  );
}
