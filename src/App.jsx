import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Spinner from './components/common/Spinner';

import LoginPage from './pages/Auth/LoginPage';
import ResetPasswordPage from './pages/Auth/ResetPasswordPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import EmployeesPage from './pages/Employees/EmployeesPage';
import LeaveRequestsPage from './pages/LeaveRequests/LeaveRequestsPage';
import CreateLeaveRequestPage from './pages/LeaveRequests/CreateLeaveRequestPage';
import MasterDataPage from './pages/MasterData/MasterDataPage';
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';

// halaman utama
const HomePageRedirector = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Spinner fullscreen={true} />;
  }

  // employee -> leave requests
  if (user?.roleName === 'Employee') {
    return <Navigate to="/leave-requests" replace />;
  }
  // selain employee -> dashboard
  return <Navigate to="/dashboard" replace />;
};

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        {/* public route */}
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* protected */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<HomePageRedirector />} />

          {/* public route(semua role) */}
          <Route path="leave-requests" element={<LeaveRequestsPage />} />
          <Route path="leave-requests/new" element={<CreateLeaveRequestPage />} />

          {/* role (Superadmin, HR, Manager) */}
          <Route element={<ProtectedRoute allowedRoles={['Superadmin', 'HR', 'Manager']} />}>
            <Route path="dashboard" element={<DashboardPage />} />
          </Route>

          {/* role (HR, Superadmin) */}
          <Route element={<ProtectedRoute allowedRoles={['Superadmin', 'HR']} />}>
            <Route path="employees" element={<EmployeesPage />} />
            {/* <Route path="employees/detail/:id" element={<EmployeeDetailPage />} /> */}
          </Route>

          {/* Superadmin */}
          <Route element={<ProtectedRoute allowedRoles={['Superadmin']} />}>
            <Route path="master-data" element={<MasterDataPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
