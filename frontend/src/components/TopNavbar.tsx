import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

export function TopNavbar() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  return (
    <header className="glass-card flex items-center justify-between p-4 mb-4">
      <div>
        <p className="text-xs text-slate-400">Blockchain Healthcare Console</p>
        <h1 className="font-semibold">Welcome, {user?.name}</h1>
      </div>
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-indigo-500/30 px-3 py-1 text-xs">{user?.role}</span>
        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="rounded-lg bg-rose-500/80 px-3 py-1.5 text-sm"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
