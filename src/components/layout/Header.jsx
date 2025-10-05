import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { FaBars } from 'react-icons/fa';
import Modal from '../common/Modal';
import styles from './Header.module.css';

const Header = ({ toggleSidebar }) => {
  const { user } = useAuth();

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const displayName = user?.fullName || user?.Email || 'User';
  const avatarInitial = displayName ? displayName[0].toUpperCase() : 'U';

  return (
    <>
      <header className={styles.header}>
        <button onClick={toggleSidebar} className={styles.menuButton}>
          <FaBars />
        </button>
        <div className={styles.headerTitleMobile}>QuickHR</div>
        <div className={styles.welcomeMessage}>
          <h2>Welcome, {displayName}!</h2>
        </div>

        <div className={styles.avatar} onClick={() => setIsProfileModalOpen(true)} title="View Profile">
          {avatarInitial}
        </div>
      </header>

      <Modal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} title="My Profile">
        {user && (
          <div className={styles.profileDetailContainer}>
            <div className={styles.detailGroup}>
              <label>Full Name</label>
              <p>{user.fullName}</p>
            </div>
            <div className={styles.detailGroup}>
              <label>Email</label>
              <p>{user.email}</p>
            </div>
            <div className={styles.detailGroup}>
              <label>Position</label>
              <p>{user.position || '-'}</p>
            </div>
            <div className={styles.detailGroup}>
              <label>Department</label>
              <p>{user.departmentName}</p>
            </div>
            <div className={styles.detailGroup}>
              <label>Role</label>
              <p>{user.roleName}</p>
            </div>
            <div className={styles.detailGroup}>
              <label>Leave Balance</label>
              <p>{user.leaveBalance} days</p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Header;
