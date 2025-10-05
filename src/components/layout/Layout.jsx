import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import styles from './Layout.module.css';

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className={styles.layout}>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={styles.mainContent}>
        <Header toggleSidebar={toggleSidebar} />
        <main className={styles.pageContent}>
          <div className={styles.pageContainer}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
