import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const setUserAndToken = useAuthStore((state) => state.setUserAndToken);
  const logout = useAuthStore((state) => state.logout);

  return { user, token, setUserAndToken, logout, isAuthenticated: !!token };
};
