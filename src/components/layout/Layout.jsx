import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import useAuth from '../../hooks/useAuth';

const Layout = () => {
  const { logout } = useAuth();
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <main style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        <header
          style={{
            backgroundColor: '#fff',
            borderBottom: '1px solid #dcdcdc',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            height: '3.5rem',
            padding: '0 1.5rem',
            flexShrink: 0,
          }}
        >
          <button
            onClick={logout}
            style={{
              border: 'none',
              background: 'none',
              color: '#3498db',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            Log out
          </button>
        </header>
        <div className="page-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
