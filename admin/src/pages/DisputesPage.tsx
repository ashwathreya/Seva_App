import { useState } from 'react';
import { useAdmin } from '../state';
import { fmtDate } from '../util';

export default function DisputesPage() {
  const { state, dispatch } = useAdmin();
  const [notesDraft, setNotesDraft] = useState<Record<string, string>>({});

  const flagged = state.bookings.filter((b) => b.flagged);
  const name = (id: string) =>
    state.users.find((u) => u.id === id)?.displayName ?? id;

  return (
    <div>
      <h1 className="admin-h1">Disputes</h1>
      <p className="admin-lead">Flagged bookings + dispute records — notes and resolution.</p>

      <h2 className="admin-h2">Open disputes</h2>
      {state.disputes.length === 0 ? (
        <p className="muted">None.</p>
      ) : (
        <div className="stack">
          {state.disputes.map((d) => (
            <div key={d.id} className="panel">
              <div className="row spread">
                <strong>{d.id}</strong>
                <span className="badge">{d.status}</span>
              </div>
              <p>Booking: {d.bookingId}</p>
              <p>Customer: {name(d.customerId)}</p>
              <p>{d.reason}</p>
              <label className="block">
                Internal notes
                <textarea
                  className="input textarea"
                  rows={3}
                  value={notesDraft[d.id] ?? d.notes}
                  onChange={(e) =>
                    setNotesDraft((x) => ({ ...x, [d.id]: e.target.value }))
                  }
                />
              </label>
              <div className="row gap">
                <button
                  type="button"
                  className="btn"
                  onClick={() =>
                    dispatch({
                      type: 'SET_DISPUTE_NOTES',
                      disputeId: d.id,
                      notes: notesDraft[d.id] ?? d.notes,
                    })
                  }>
                  Save notes
                </button>
                <button
                  type="button"
                  className="btn btn-bad"
                  disabled={d.status !== 'open'}
                  onClick={() => dispatch({ type: 'RESOLVE_REFUND', disputeId: d.id })}>
                  Resolve · full refund
                </button>
                <button
                  type="button"
                  className="btn btn-ok"
                  disabled={d.status !== 'open'}
                  onClick={() => dispatch({ type: 'RESOLVE_PARTIAL', disputeId: d.id })}>
                  Resolve · partial payout
                </button>
              </div>
              <p className="muted small">{fmtDate(d.createdAt)}</p>
            </div>
          ))}
        </div>
      )}

      <h2 className="admin-h2" style={{ marginTop: 24 }}>
        Flagged bookings (reference)
      </h2>
      <div className="table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {flagged.map((b) => (
              <tr key={b.id}>
                <td className="mono">{b.id}</td>
                <td>{name(b.customerId)}</td>
                <td>{b.status}</td>
                <td>{b.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {flagged.length === 0 ? <p className="muted">No flagged rows.</p> : null}
    </div>
  );
}
