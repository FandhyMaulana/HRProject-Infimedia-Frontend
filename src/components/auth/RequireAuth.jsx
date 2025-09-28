import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const RequireAuth = ({ allowedRoles }) => {
  const { user } = useAuth();
  const location = useLocation();

  // Jika ada daftar peran yang diizinkan, cek apakah peran pengguna ada di dalamnya
  if (allowedRoles) {
    return allowedRoles.includes(user?.role) ? (
      <Outlet />
    ) : user ? ( // Jika user sudah login tapi rolenya tidak cocok
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  }

  // Jika tidak ada daftar peran, cukup cek apakah user sudah login
  return user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
