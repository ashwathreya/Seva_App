import { useMemo } from 'react';
import { useAdmin } from '../state';
import { money } from '../util';

export default function MetricsPage() {
  const { state } = useAdmin();

  const metrics = useMemo(() => {
    const bookings = state.bookings.length;
    const activeJobs = state.jobs.filter(
      (j) => j.status === 'assigned' || j.status === 'in_progress',
    ).length;
    const completed = state.bookings.filter(
      (b) => b.status === 'approved' || b.status === 'completed',
    ).length;
    const revenueCents = state.bookings
      .filter((b) => b.status === 'approved')
      .reduce((s, b) => s + b.estimateCents, 0);
    const openDisputes = state.disputes.filter((d) => d.status === 'open').length;
    const pendingVet = state.users.filter(
      (u) => u.role === 'pro' && u.vettingStatus === 'pending',
    ).length;
    return {
      bookings,
      activeJobs,
      completed,
      revenueCents,
      openDisputes,
      pendingVet,
    };
  }, [state]);

  const cards = [
    { k: 'Total bookings', v: String(metrics.bookings) },
    { k: 'Active jobs', v: String(metrics.activeJobs) },
    { k: 'Completed / approved', v: String(metrics.completed) },
    { k: 'Revenue (mock, approved only)', v: money(metrics.revenueCents) },
    { k: 'Open disputes', v: String(metrics.openDisputes) },
    { k: 'Pros pending vetting', v: String(metrics.pendingVet) },
  ];

  return (
    <div>
      <h1 className="admin-h1">Overview</h1>
      <p className="admin-lead">Manual ops control — numbers from in-memory seed.</p>
      <div className="metric-grid">
        {cards.map((c) => (
          <div key={c.k} className="metric-card">
            <div className="metric-label">{c.k}</div>
            <div className="metric-value">{c.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
