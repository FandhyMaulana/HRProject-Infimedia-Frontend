import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';

const Unauthorized = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const pageStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#f3f4f6',
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 1rem 0',
  };

  const textStyle = {
    fontSize: '1.125rem',
    color: '#6b7280',
    marginBottom: '2rem',
  };

  return (
    <div style={pageStyle}>
      <h1 style={titleStyle}>403 - Access Denied</h1>
      <p style={textStyle}>You do not have permission to view this page.</p>
      <Button onClick={goBack}>Go Back</Button>
    </div>
  );
};

export default Unauthorized;
