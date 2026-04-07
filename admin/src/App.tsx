import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AdminProvider } from './state';
import Layout from './components/Layout';
import MetricsPage from './pages/MetricsPage';
import UsersPage from './pages/UsersPage';
import VettingPage from './pages/VettingPage';
import BookingsPage from './pages/BookingsPage';
import DisputesPage from './pages/DisputesPage';
import CustomerPortalPage from './pages/CustomerPortalPage';

export default function App() {
  const [role, setRole] = useState<'admin' | 'customer'>(() => {
    const saved = localStorage.getItem('seva_demo_role');
    return saved === 'customer' ? 'customer' : 'admin';
  });

  useEffect(() => {
    localStorage.setItem('seva_demo_role', role);
  }, [role]);

  return (
    <AdminProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout role={role} setRole={setRole} />}>
            <Route path="portal" element={<CustomerPortalPage />} />
            <Route
              index
              element={
                role === 'admin' ? <MetricsPage /> : <Navigate to="/portal" replace />
              }
            />
            <Route
              path="users"
              element={role === 'admin' ? <UsersPage /> : <Navigate to="/portal" replace />}
            />
            <Route
              path="vetting"
              element={role === 'admin' ? <VettingPage /> : <Navigate to="/portal" replace />}
            />
            <Route
              path="bookings"
              element={role === 'admin' ? <BookingsPage /> : <Navigate to="/portal" replace />}
            />
            <Route
              path="disputes"
              element={role === 'admin' ? <DisputesPage /> : <Navigate to="/portal" replace />}
            />
            <Route path="*" element={<Navigate to={role === 'admin' ? '/' : '/portal'} replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  );
}
