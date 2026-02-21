import { useState } from 'react';
import { permissionService } from '@/services/permissionService';
import { useUiStore } from '@/store/uiStore';

export function PermissionsPage() {
  const [recordId, setRecordId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const addToast = useUiStore((s) => s.addToast);

  const run = async (type: 'request' | 'grant' | 'revoke') => {
    try {
      if (type === 'request') await permissionService.requestAccess(Number(recordId));
      if (type === 'grant') await permissionService.grantAccess(Number(recordId), Number(doctorId));
      if (type === 'revoke') await permissionService.revokeAccess(Number(recordId), Number(doctorId));
      addToast({ type: 'success', message: `${type} action submitted` });
    } catch {
      addToast({ type: 'error', message: `${type} action failed` });
    }
  };

  return (
    <div className="glass-card p-4 space-y-3">
      <h2 className="font-semibold">Permissions</h2>
      <input className="w-full rounded-lg border border-border bg-slate-900/70 p-2" placeholder="Record ID" value={recordId} onChange={(e) => setRecordId(e.target.value)} />
      <input className="w-full rounded-lg border border-border bg-slate-900/70 p-2" placeholder="Doctor ID (for grant/revoke)" value={doctorId} onChange={(e) => setDoctorId(e.target.value)} />
      <div className="flex gap-2">
        <button className="rounded bg-sky-600 px-3 py-2" onClick={() => run('request')}>Request</button>
        <button className="rounded bg-emerald-600 px-3 py-2" onClick={() => run('grant')}>Grant</button>
        <button className="rounded bg-rose-600 px-3 py-2" onClick={() => run('revoke')}>Revoke</button>
      </div>
    </div>
  );
}
