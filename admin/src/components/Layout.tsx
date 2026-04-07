import { NavLink, Outlet } from 'react-router-dom';
import { useAdmin } from '../state';

const links: { to: string; label: string }[] = [
  { to: '/portal', label: 'Customer Web' },
  { to: '/', label: 'Metrics' },
  { to: '/users', label: 'Users' },
  { to: '/vetting', label: 'Provider vetting' },
  { to: '/bookings', label: 'Bookings' },
  { to: '/disputes', label: 'Disputes' },
];

export default function Layout({
  role,
  setRole,
}: {
  role: 'admin' | 'customer';
  setRole: (role: 'admin' | 'customer') => void;
}) {
  const { dispatch } = useAdmin();
  const visibleLinks =
    role === 'admin' ? links : links.filter((l) => l.to === '/portal');
  return (
    <div className="admin-shell">
      <aside className="admin-nav">
        <div className="admin-brand">SEVA Admin</div>
        <div className="role-box">
          <div className="small">Role</div>
          <div className="row gap">
            <button
              type="button"
              className={'btn btn-sm role-btn' + (role === 'admin' ? ' role-btn-active' : '')}
              onClick={() => setRole('admin')}>
              Admin
            </button>
            <button
              type="button"
              className={
                'btn btn-sm role-btn' + (role === 'customer' ? ' role-btn-active' : '')
              }
              onClick={() => setRole('customer')}>
              Customer
            </button>
          </div>
          <div className="small" style={{ marginTop: 8 }}>Scenario</div>
          <div className="row gap">
            <button
              type="button"
              className="btn btn-sm role-btn"
              onClick={() => dispatch({ type: 'LOAD_SCENARIO', scenario: 'light' })}>
              Light
            </button>
            <button
              type="button"
              className="btn btn-sm role-btn"
              onClick={() => dispatch({ type: 'LOAD_SCENARIO', scenario: 'heavy' })}>
              Heavy
            </button>
          </div>
        </div>
        <nav>
          {visibleLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                'admin-nav-link' + (isActive ? ' admin-nav-link-active' : '')
              }>
              {label}
            </NavLink>
          ))}
        </nav>
        <p className="admin-nav-foot">
          {role === 'admin' ? 'Internal ops mode' : 'Customer demo mode'}
        </p>
        {role === 'admin' ? (
          <button
            type="button"
            className="btn btn-sm nav-reset-btn"
            onClick={() => dispatch({ type: 'RESET_DEMO' })}>
            Reset demo data
          </button>
        ) : null}
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
