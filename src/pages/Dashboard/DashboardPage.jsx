import React from 'react';
import styles from './DashboardPage.module.css';

const DashboardPage = () => {
  const powerBiLink = 'https://app.powerbi.com/reportEmbed?reportId=71c89d57-f92a-4320-a71b-c200a232bc29&autoAuth=true&ctid=9dc900c0-9581-44f9-b16a-b93a608e104a&filterPaneEnabled=false&navContentPaneEnabled=false';

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Dashboard Overview</h1>
      <p className={styles.subtitle}>Here's a summary of your workspace.</p>
      <div className={styles.iframeContainer}>
        {powerBiLink.startsWith('https://') ? (
          <iframe title="Power BI Dashboard" src={powerBiLink} frameBorder="0" allowFullScreen={true} className={styles.iframeContent}></iframe>
        ) : (
          <div className={styles.placeholder}>Please configure the Power BI link to view the dashboard.</div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
