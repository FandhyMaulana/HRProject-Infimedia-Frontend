import React from 'react';
import styles from './LeaveRequestsPage.module.css';
import { useAuth } from '../../hooks/useAuth';

const CreateLeaveRequestPage = () => {
  const powerAppsLink =
    'https://apps.powerapps.com/play/e/default-9dc900c0-9581-44f9-b16a-b93a608e104a/a/21c07ace-df27-4d2a-a560-94c0480ee3bd?tenantId=9dc900c0-9581-44f9-b16a-b93a608e104a&hint=af844380-f1a0-42ed-81cd-42a2ecfbdc57&source=sharebutton&sourcetime=1758514140040#';
  const { user } = useAuth();

  return (
    <div className={styles.page}>
      <h1>Create New Leave Request</h1>
      <p>Please fill out the form below to submit your request.</p>
      {user && (
        <div className={styles.balanceInfo}>
          Your Leave Balance: <strong>{user.leaveBalance} days</strong>
        </div>
      )}
      <div className={styles.iframeContainer}>
        {' '}
        {powerAppsLink.startsWith('https://') ? (
          <iframe title="Create Leave Request Form" src={powerAppsLink} frameBorder="0" allowFullScreen={true} className={styles.iframeContent}></iframe>
        ) : (
          <div className={styles.placeholder}>Leave request form is not configured.</div>
        )}
      </div>
    </div>
  );
};
export default CreateLeaveRequestPage;
