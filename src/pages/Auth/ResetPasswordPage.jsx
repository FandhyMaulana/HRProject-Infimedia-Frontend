import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import styles from './LoginPage.module.css';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!token) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.loginBox}>
          <h1 className={styles.title}>Invalid Link</h1>
          <p className={styles.error}>The password reset link is missing a token. Please try the 'Forgot Password' process again.</p>
          <Link to="/login">Back to Login</Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    setMessage('');
    setLoading(true);
    try {
      await axiosInstance.post('/auth/reset-password', { token, newPassword: password });
      setMessage('Your password has been reset successfully! You can now log in.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password. The link may be invalid or expired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Set New Password</h1>
        {message ? (
          <div>
            <p style={{ color: 'var(--success)' }}>{message}</p>
            <Link to="/login">Proceed to Login</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New Password" required minLength={6} />
            <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm New Password" required />
            {error && <p className={styles.error}>{error}</p>}
            <Button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
