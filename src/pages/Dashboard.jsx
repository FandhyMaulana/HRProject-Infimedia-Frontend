const Dashboard = () => {
  const publicReportUrl = 'https://app.powerbi.com/reportEmbed?reportId=71c89d57-f92a-4320-a71b-c200a232bc29&autoAuth=true&ctid=9dc900c0-9581-44f9-b16a-b93a608e104a';

  return (
    <div>
      <h3>Dashboard Overview</h3>

      <iframe title="QuickHR Power BI Report" width="100%" height="700px" src={publicReportUrl} frameBorder="0" allowFullScreen={true}></iframe>
    </div>
  );
};

export default Dashboard;
