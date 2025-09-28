const CreateLeaveRequest = () => {
  const powerAppsUrl =
    'https://apps.powerapps.com/play/e/default-9dc900c0-9581-44f9-b16a-b93a608e104a/a/21c07ace-df27-4d2a-a560-94c0480ee3bd?tenantId=9dc900c0-9581-44f9-b16a-b93a608e104a&hint=af844380-f1a0-42ed-81cd-42a2ecfbdc57&source=sharebutton&sourcetime=1758514140040#';

  return (
    <div>
      <h3>Submit a New Leave Request</h3>
      <p>Please use the form below to submit your leave request.</p>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '80vh',
          border: '1px solid #ccc',
        }}
      >
        <iframe
          src={powerAppsUrl}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          allowFullScreen={true}
        ></iframe>
      </div>
    </div>
  );
};

export default CreateLeaveRequest;
