import type { CustomerBooking } from '../bookingsStore';
import { MpCard } from './MpCard';

const statusLabel: Record<string, string> = {
  requested: 'Requested',
  confirmed: 'Confirmed',
  in_progress: 'In progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

const statusStyle: Record<string, string> = {
  requested: 'bg-amber-50 text-amber-900 border-amber-200/80',
  confirmed: 'bg-[#E6FAF9] text-[#0B6B68] border-[#0CB8B3]/25',
  in_progress: 'bg-blue-50 text-blue-900 border-blue-200/80',
  completed: 'bg-emerald-50 text-emerald-900 border-emerald-200/80',
  cancelled: 'bg-[#F4F4F5] text-[#71717A] border-[#E4E4E7]',
};

type Props = {
  booking: CustomerBooking;
  onPress?: () => void;
};

export function BookingRow({ booking, onPress }: Props) {
  const chip = statusStyle[booking.status] ?? statusStyle.requested;
  const body = (
    <>
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F4F6FA] text-lg" aria-hidden>
        📅
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="truncate text-[13px] font-bold text-[#0B0D12]">{booking.serviceTitle}</p>
          <span className={`rounded-md border px-1.5 py-0.5 text-[9px] font-semibold ${chip}`}>
            {statusLabel[booking.status] ?? booking.status}
          </span>
        </div>
        <p className="mt-0.5 text-[11px] text-[#5C6578]">
          with {booking.proName} · {booking.scheduledLabel}
        </p>
        <p className="mt-1 text-[11px] font-semibold text-[#0B0D12]">{booking.priceLabel}</p>
      </div>
    </>
  );
  return (
    <MpCard padding="sm" interactive={!!onPress} className={onPress ? 'cursor-pointer' : ''}>
      {onPress ? (
        <button type="button" className="flex w-full gap-3 text-left" onClick={onPress}>
          {body}
        </button>
      ) : (
        <div className="flex gap-3">{body}</div>
      )}
    </MpCard>
  );
}
