import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { TopNavbar } from '@/components/TopNavbar';
import { useAuthStore } from '@/store/authStore';

export function DashboardLayout() {
  const role = useAuthStore((s) => s.user?.role ?? 'PATIENT');

  return (
    <div className="min-h-screen p-4 lg:p-6">
      <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[240px_1fr]">
        <Sidebar role={role} />
        <div>
          <TopNavbar />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
