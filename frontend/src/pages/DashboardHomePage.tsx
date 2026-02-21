import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';

export function DashboardHomePage() {
  const user = useAuthStore((s) => s.user);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-4 md:grid-cols-3">
      {['Security', 'Records', 'Audit'].map((title) => (
        <div key={title} className="glass-card p-4">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-slate-300 mt-2">High-integrity {title.toLowerCase()} tools for {user?.role?.toLowerCase()} workflow.</p>
        </div>
      ))}
    </motion.div>
  );
}
