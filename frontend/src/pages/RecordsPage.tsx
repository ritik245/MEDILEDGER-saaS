import { useRecords } from '@/hooks/useRecords';
import { recordService } from '@/services/recordService';
import { useUiStore } from '@/store/uiStore';

export function RecordsPage() {
  const { data = [], isLoading } = useRecords();
  const addToast = useUiStore((s) => s.addToast);

  const onDownload = async (id: number) => {
    try {
      const blob = await recordService.download(id);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `record-${id}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      addToast({ type: 'error', message: 'Unable to download record' });
    }
  };

  if (isLoading) return <div className="glass-card p-4">Loading records...</div>;

  return (
    <div className="glass-card p-4">
      <h2 className="font-semibold mb-3">Records</h2>
      <div className="space-y-2 text-sm">
        {data.map((record) => (
          <div key={record.id} className="rounded-lg border border-border p-3 flex items-center justify-between">
            <span>#{record.id} {record.filename || 'Encrypted File'}</span>
            <button className="rounded bg-sky-500/80 px-3 py-1" onClick={() => onDownload(record.id)}>Download</button>
          </div>
        ))}
      </div>
    </div>
  );
}
