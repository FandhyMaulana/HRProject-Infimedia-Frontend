import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import useAuth from '../../hooks/useAuth';

const Sidebar = () => {
  const { user } = useAuth();
  const userRole = user?.role;

  const showAdminAndHR = ['Superadmin', 'HR'].includes(userRole);
  const showManagement = ['Superadmin', 'HR', 'Manager'].includes(userRole);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="sidebar-brand">QuickHR</span>
      </div>
      <nav className="sidebar-nav">
        {showAdminAndHR && (
          <>
            <NavLink to="/dashboard" className="nav-link">
              Dashboard
            </NavLink>
            <NavLink to="/employees" className="nav-link">
              Employee Mng.
            </NavLink>
          </>
        )}
        {showManagement && (
          <NavLink to="/leave-approval" className="nav-link">
            Leave Approval
          </NavLink>
        )}
        <NavLink to="/my-requests" className="nav-link">
          My Leave Requests
        </NavLink>
        <NavLink to="/create-request" className="nav-link">
          Create Request
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
