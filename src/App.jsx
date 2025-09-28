import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import RequireAuth from './components/auth/RequireAuth';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EmployeeManagement from './pages/EmployeeManagement';
import LeaveApproval from './pages/LeaveApproval';
import MyLeaveRequests from './pages/MyLeaveRequests';
import CreateLeaveRequest from './pages/CreateLeaveRequest';
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected Routes */}
      <Route path="/" element={<Layout />}>
        <Route element={<RequireAuth allowedRoles={['Superadmin', 'HR']} />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employees" element={<EmployeeManagement />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={['Superadmin', 'HR', 'Manager']} />}>
          <Route path="leave-approval" element={<LeaveApproval />} />
        </Route>

        <Route element={<RequireAuth />}>
          {' '}
          {/* Semua role yang login */}
          <Route index element={<MyLeaveRequests />} /> {/* Halaman default setelah login */}
          <Route path="my-requests" element={<MyLeaveRequests />} />
          <Route path="create-request" element={<CreateLeaveRequest />} />
        </Route>
      </Route>

      {/* Catch all for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
