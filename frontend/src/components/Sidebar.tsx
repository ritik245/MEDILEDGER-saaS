import { NavLink } from 'react-router-dom';
import { Role } from '@/types/auth';

const common = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/records', label: 'Records' },
  { to: '/upload', label: 'Upload' },
  { to: '/permissions', label: 'Permissions' },
  { to: '/profile', label: 'Profile' }
];

const roleRoutes: Record<Role, { to: string; label: string }> = {
  PATIENT: { to: '/dashboard/patient', label: 'Patient Hub' },
  DOCTOR: { to: '/dashboard/doctor', label: 'Doctor Hub' },
  ADMIN: { to: '/dashboard/admin', label: 'Admin Hub' }
};

export function Sidebar({ role }: { role: Role }) {
  return (
    <aside className="glass-card p-4 h-fit sticky top-4">
      <h2 className="mb-4 text-accent font-semibold">MediLedger</h2>
      <nav className="space-y-2">
        {[roleRoutes[role], ...common].map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `block rounded-lg px-3 py-2 text-sm transition ${isActive ? 'bg-sky-500/30 text-white' : 'text-slate-300 hover:bg-white/10'}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
