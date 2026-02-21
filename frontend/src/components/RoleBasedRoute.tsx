import { Navigate, Outlet } from 'react-router-dom';
import { Role } from '@/types/auth';
import { useAuthStore } from '@/store/authStore';

export function RoleBasedRoute({ allow }: { allow: Role[] }) {
  const user = useAuthStore((s) => s.user);
  if (!user) return <Navigate to="/login" replace />;
  return allow.includes(user.role) ? <Outlet /> : <Navigate to="/dashboard" replace />;
}
