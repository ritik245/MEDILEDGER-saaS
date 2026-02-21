export function AdminDashboardPage() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="glass-card p-4"><h3>Total Users</h3><p className="text-3xl font-bold mt-2">--</p></div>
      <div className="glass-card p-4"><h3>Audit Events</h3><p className="text-3xl font-bold mt-2">--</p></div>
      <div className="glass-card p-4"><h3>System Health</h3><p className="text-3xl font-bold mt-2">99%</p></div>
      <div className="glass-card p-4 md:col-span-3 text-slate-300 text-sm">Admin controls: role management, users, audit logs, and overview charts.</div>
    </div>
  );
}
