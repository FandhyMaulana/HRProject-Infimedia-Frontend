import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1); // Kembali ke halaman sebelumnya

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Access Denied</h1>
      <p>You do not have permission to view this page.</p>
      <button onClick={goBack} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Go Back
      </button>
    </div>
  );
};

export default Unauthorized;
