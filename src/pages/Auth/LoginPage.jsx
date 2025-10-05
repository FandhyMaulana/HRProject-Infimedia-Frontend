import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { useAuthStore } from '../../store/authStore';
import { jwtDecode } from 'jwt-decode';
import styles from './LoginPage.module.css';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import { FaUser } from 'react-icons/fa';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setUserAndToken = useAuthStore((state) => state.setUserAndToken);

  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const loginResponse = await axiosInstance.post('/auth/login', { email, password });
      const { token } = loginResponse.data;

      const decodedToken = jwtDecode(token);
      const employeeId = decodedToken.nameid;
      if (!employeeId) {
        throw new Error('Token is missing Employee ID.');
      }

      const employeeResponse = await axiosInstance.get(`/employees/${employeeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const fullUserData = employeeResponse.data;
      setUserAndToken(fullUserData, token);

      // jika employee -> hanya tampilkan leave requests
      if (fullUserData.roleName === 'Employee') {
        navigate('/leave-requests');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed or could not fetch employee data.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setModalMessage('');
    try {
      await axiosInstance.post('/auth/forgot-password', { Email: forgotEmail });
      setModalMessage('If an account with that email exists, a password reset link has been sent.');
    } catch (error) {
      setModalMessage('If an account with that email exists, a password reset link has been sent.');
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.loginBox}>
        <div className={styles.iconWrapper}>
          <FaUser size={32} color="var(--accent)" />
        </div>
        <h1 className={styles.title}>HR Management</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.forgotLinkWrapper}>
            <button type="button" onClick={() => setIsForgotModalOpen(true)} className={styles.forgotLink}>
              Forgot password?
            </button>
          </div>
          <Button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </Button>
        </form>
      </div>

      <Modal
        isOpen={isForgotModalOpen}
        onClose={() => {
          setIsForgotModalOpen(false);
          setModalMessage('');
          setForgotEmail('');
        }}
        title="Reset Your Password"
      >
        {modalMessage ? (
          <p>{modalMessage}</p>
        ) : (
          <form onSubmit={handleForgotPassword}>
            <p>Enter your email address and we will send you a link to reset your password.</p>
            <Input type="email" placeholder="Your email address" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} required />
            <div className={styles.formActions}>
              <Button type="submit" style={{ width: '100%', marginTop: '1rem' }}>
                Send Reset Link
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};
export default LoginPage;
