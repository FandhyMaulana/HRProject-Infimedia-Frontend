import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const result = await login(email, password);
    if (!result.success) {
      setError(result.message);
    } else {
      // AuthContext sudah menangani navigasi
      // navigate(from, { replace: true });
    }
    setIsLoading(false);
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h3>HR Management</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className="form-footer">
              <a href="#" className="forgot-password">
                Forgot password?
              </a>
              <button type="submit" className="btn-login" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Log In'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
