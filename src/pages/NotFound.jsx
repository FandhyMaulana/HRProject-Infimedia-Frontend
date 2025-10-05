import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const NotFound = () => {
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
      <h1 style={titleStyle}>404 - Page Not Found</h1>
      <p style={textStyle}>The page you are looking for does not exist.</p>
      <Link to="/">
        <Button>Go to Homepage</Button>
      </Link>
    </div>
  );
};

export default NotFound;
