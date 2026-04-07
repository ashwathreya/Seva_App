import { useAdmin } from '../state';
import { fmtDate } from '../util';

export default function VettingPage() {
  const { state, dispatch } = useAdmin();
  const pending = state.users.filter(
    (u) => u.role === 'pro' && u.vettingStatus === 'pending',
  );

  return (
    <div>
      <h1 className="admin-h1">Provider vetting</h1>
      <p className="admin-lead">Pending applications — documents are mock file names.</p>
      {pending.length === 0 ? (
        <p className="muted">No pending providers.</p>
      ) : (
        <div className="stack">
          {pending.map((u) => (
            <div key={u.id} className="panel">
              <div className="panel-head">
                <strong>{u.displayName}</strong>
                <span className="mono muted">{u.phone}</span>
              </div>
              <p className="muted">{u.locationLabel ?? '—'}</p>
              <p>
                <strong>Documents:</strong>{' '}
                {(u.mockDocuments ?? []).join(', ') || '—'}
              </p>
              <p className="muted small">Applied {fmtDate(u.createdAt)}</p>
              <div className="row gap">
                <button
                  type="button"
                  className="btn btn-ok"
                  onClick={() => dispatch({ type: 'APPROVE_PRO', userId: u.id })}>
                  Approve provider
                </button>
                <button
                  type="button"
                  className="btn btn-bad"
                  onClick={() => dispatch({ type: 'REJECT_PRO', userId: u.id })}>
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
