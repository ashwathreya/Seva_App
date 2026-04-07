import { useAdmin } from '../state';
import { fmtDate } from '../util';

export default function UsersPage() {
  const { state, dispatch } = useAdmin();

  return (
    <div>
      <h1 className="admin-h1">Users</h1>
      <p className="admin-lead">Customers and pros — account status.</p>
      <div className="table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Status</th>
              <th>Vetting</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {state.users.map((u) => (
              <tr key={u.id}>
                <td>{u.displayName}</td>
                <td className="mono">{u.phone}</td>
                <td>{u.role}</td>
                <td>{u.accountStatus}</td>
                <td>{u.vettingStatus}</td>
                <td className="muted">{fmtDate(u.createdAt)}</td>
                <td className="actions">
                  {u.role === 'pro' && u.vettingStatus === 'pending' ? (
                    <>
                      <button
                        type="button"
                        className="btn btn-sm btn-ok"
                        onClick={() => dispatch({ type: 'APPROVE_PRO', userId: u.id })}>
                        Approve
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-bad"
                        onClick={() => dispatch({ type: 'REJECT_PRO', userId: u.id })}>
                        Reject
                      </button>
                    </>
                  ) : null}
                  {u.accountStatus === 'active' ? (
                    <button
                      type="button"
                      className="btn btn-sm"
                      onClick={() => dispatch({ type: 'SUSPEND_USER', userId: u.id })}>
                      Suspend
                    </button>
                  ) : u.accountStatus === 'suspended' ? (
                    <button
                      type="button"
                      className="btn btn-sm btn-ok"
                      onClick={() => dispatch({ type: 'ACTIVATE_USER', userId: u.id })}>
                      Activate
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
