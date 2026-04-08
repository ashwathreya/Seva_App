import type { ReactNode } from 'react';
import { MpButton } from './MpButton';
import { MpCard } from './MpCard';

type Props = {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: ReactNode;
  secondaryLabel?: string;
  onSecondary?: () => void;
};

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon,
  secondaryLabel,
  onSecondary,
}: Props) {
  return (
    <MpCard className="border-dashed border-[#D1D5DB] bg-[#FAFBFD]">
      <div className="flex flex-col items-center py-2 text-center">
        {icon ? <div className="mb-3 text-3xl opacity-90">{icon}</div> : null}
        <p className="text-sm font-bold text-[#0B0D12]">{title}</p>
        <p className="mt-1 max-w-[260px] text-xs leading-relaxed text-[#6B7280]">{description}</p>
        {actionLabel && onAction ? (
          <MpButton variant="primary" className="mt-4 min-w-[200px]" onClick={onAction}>
            {actionLabel}
          </MpButton>
        ) : null}
        {secondaryLabel && onSecondary ? (
          <button
            type="button"
            className="mt-3 text-xs font-semibold text-[#0CB8B3] transition hover:underline"
            onClick={onSecondary}>
            {secondaryLabel}
          </button>
        ) : null}
      </div>
    </MpCard>
  );
}
