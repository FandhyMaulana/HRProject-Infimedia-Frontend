import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LuLayoutDashboard, LuUsers, LuFileText, LuLogOut, LuDatabase, LuFilePlus } from 'react-icons/lu';
import { IoClose } from 'react-icons/io5';
import styles from './Sidebar.module.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const roleBasedLinks = {
    Superadmin: [
      { path: '/', icon: <LuLayoutDashboard />, label: 'Overview' },
      { path: '/employees', icon: <LuUsers />, label: 'Employee' },
      { path: '/leave-requests', icon: <LuFileText />, label: 'Leave Request' },
      { path: '/master-data', icon: <LuDatabase />, label: 'Master Data' },
    ],
    HR: [
      { path: '/', icon: <LuLayoutDashboard />, label: 'Overview' },
      { path: '/employees', icon: <LuUsers />, label: 'Employee' },
      { path: '/leave-requests', icon: <LuFileText />, label: 'Leave Request' },
    ],
    Manager: [
      { path: '/', icon: <LuLayoutDashboard />, label: 'Overview' },
      { path: '/leave-requests', icon: <LuFileText />, label: 'Leave Request' },
    ],
    Employee: [{ path: '/leave-requests', icon: <LuFileText />, label: 'Leave Request' }],
  };

  //pemilihan menu
  const links = user ? roleBasedLinks[user.roleName] || [] : [];

  return (
    <>
      <div className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`} onClick={toggleSidebar}></div>
      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.header}>
          <h1 className={styles.logo}>QuickHR</h1>
          <button onClick={toggleSidebar} className={styles.closeButton}>
            <IoClose size={28} />
          </button>
        </div>
        <nav className={styles.nav}>
          <ul>
            {links.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
                  onClick={window.innerWidth < 768 ? toggleSidebar : undefined}
                  end={link.path === '/'} // Agar 'Overview' tidak selalu aktif
                >
                  <span className={styles.icon}>{link.icon}</span>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <button onClick={handleLogout} className={styles.logoutButton}>
          <span className={styles.icon}>
            <LuLogOut />
          </span>
          Logout
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
