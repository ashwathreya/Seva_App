import { useMemo, useState } from 'react';
import { useAdmin } from '../state';
import type { BookingStatus } from '../types';
import { fmtDate, money } from '../util';

const STATUSES: BookingStatus[] = [
  'draft',
  'requested',
  'assigned',
  'in_progress',
  'completed',
  'approved',
  'cancelled',
];

export default function BookingsPage() {
  const { state, dispatch } = useAdmin();
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [selectedBookingId, setSelectedBookingId] = useState<string>('');

  const name = (id: string) =>
    state.users.find((u) => u.id === id)?.displayName ?? id;

  const rows = useMemo(() => {
    return state.bookings.filter((b) => {
      if (statusFilter && b.status !== statusFilter) return false;
      const t = new Date(b.createdAt).getTime();
      if (from && t < new Date(from).getTime()) return false;
      if (to && t > new Date(to).getTime() + 864e5) return false;
      return true;
    });
  }, [state.bookings, statusFilter, from, to]);

  const approvedPros = state.users.filter(
    (u) => u.role === 'pro' && u.vettingStatus === 'approved' && u.accountStatus === 'active',
  );
  const selectedBooking = rows.find((b) => b.id === selectedBookingId) ?? rows[0];

  return (
    <div>
      <h1 className="admin-h1">Bookings</h1>
      <p className="admin-lead">Filter, inspect, assign pro, cancel.</p>

      <div className="filters row gap wrap">
        <label className="filter">
          Status
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input">
            <option value="">All</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <label className="filter">
          From
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="input"
          />
        </label>
        <label className="filter">
          To
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="input" />
        </label>
      </div>

      <div className="table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th>Customer</th>
              <th>Pro</th>
              <th>Title</th>
              <th>Price</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((b) => (
              <tr
                key={b.id}
                onClick={() => setSelectedBookingId(b.id)}
                className={selectedBooking?.id === b.id ? 'row-selected' : ''}>
                <td className="mono">{b.id}</td>
                <td>
                  {b.status}
                  {b.flagged ? <span className="badge">flagged</span> : null}
                </td>
                <td>{name(b.customerId)}</td>
                <td>{b.proId ? name(b.proId) : '—'}</td>
                <td>
                  <div>{b.title}</div>
                  <div className="muted small">{b.description.slice(0, 80)}…</div>
                </td>
                <td>{money(b.estimateCents)}</td>
                <td className="muted">{fmtDate(b.createdAt)}</td>
                <td className="actions">
                  {b.status !== 'cancelled' && b.status !== 'approved' ? (
                    <>
                      <AssignSelect
                        bookingId={b.id}
                        pros={approvedPros}
                        onAssign={(proId) =>
                          dispatch({ type: 'ASSIGN_BOOKING', bookingId: b.id, proId })
                        }
                      />
                      {b.status === 'completed' ? (
                        <button
                          type="button"
                          className="btn btn-sm btn-ok"
                          onClick={() =>
                            dispatch({ type: 'APPROVE_COMPLETION', bookingId: b.id })
                          }>
                          Approve completion
                        </button>
                      ) : null}
                      <button
                        type="button"
                        className="btn btn-sm btn-bad"
                        onClick={() => dispatch({ type: 'CANCEL_BOOKING', bookingId: b.id })}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <span className="muted">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedBooking ? (
        <div className="panel" style={{ marginTop: 14 }}>
          <h2 className="admin-h2">Booking status timeline</h2>
          <p className="muted small">
            {selectedBooking.id} · {selectedBooking.title}
          </p>
          <div className="timeline">
            {(
              [
                'draft',
                'requested',
                'assigned',
                'in_progress',
                'completed',
                'approved',
                'cancelled',
              ] as BookingStatus[]
            ).map((step, idx, arr) => {
              const stepIndex = arr.indexOf(selectedBooking.status);
              const isActive = step === selectedBooking.status;
              const isDone = stepIndex >= idx && selectedBooking.status !== 'cancelled';
              const isCancelledFuture =
                selectedBooking.status === 'cancelled' && step !== 'cancelled';
              return (
                <div key={step} className="timeline-item">
                  <span
                    className={
                      'timeline-dot' +
                      (isActive ? ' timeline-dot-active' : '') +
                      (isDone ? ' timeline-dot-done' : '') +
                      (isCancelledFuture ? ' timeline-dot-off' : '')
                    }
                  />
                  <span className={'timeline-label' + (isActive ? ' timeline-label-active' : '')}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function AssignSelect({
  bookingId,
  pros,
  onAssign,
}: {
  bookingId: string;
  pros: { id: string; displayName: string }[];
  onAssign: (proId: string) => void;
}) {
  const [v, setV] = useState('');
  return (
    <span className="inline">
      <select
        className="input input-sm"
        value={v}
        onChange={(e) => setV(e.target.value)}
        aria-label={`Assign pro ${bookingId}`}>
        <option value="">Assign…</option>
        {pros.map((p) => (
          <option key={p.id} value={p.id}>
            {p.displayName}
          </option>
        ))}
      </select>
      <button
        type="button"
        className="btn btn-sm"
        disabled={!v}
        onClick={() => {
          onAssign(v);
          setV('');
        }}>
        Set
      </button>
    </span>
  );
}
