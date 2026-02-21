import { useRecords } from '@/hooks/useRecords';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';

export function PatientDashboardPage() {
  const { data, isLoading } = useRecords();
  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className="space-y-4">
      <div className="glass-card p-4"><h2 className="font-semibold">Patient Dashboard</h2><p className="text-slate-300 text-sm">View records, access requests, permissions, and activity history.</p></div>
      <div className="glass-card p-4">
        <h3 className="mb-2">Your Records</h3>
        <ul className="space-y-2 text-sm text-slate-300">
          {(data || []).map((r) => <li key={r.id}>#{r.id} • {r.filename || 'Encrypted Record'} • CID {r.cid?.slice(0, 12)}...</li>)}
        </ul>
      </div>
    </div>
  );
}
