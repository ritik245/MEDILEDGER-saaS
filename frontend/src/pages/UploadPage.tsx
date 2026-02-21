import { FormEvent, useState } from 'react';
import { useUploadRecord } from '@/hooks/useRecords';
import { useUiStore } from '@/store/uiStore';

export function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const upload = useUploadRecord();
  const addToast = useUiStore((s) => s.addToast);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return addToast({ type: 'info', message: 'Select a file first' });
    try {
      await upload.mutateAsync(file);
      addToast({ type: 'success', message: 'Record uploaded to IPFS successfully' });
      setFile(null);
    } catch {
      addToast({ type: 'error', message: 'Upload failed' });
    }
  };

  return (
    <form onSubmit={onSubmit} className="glass-card p-4 space-y-4">
      <h2 className="font-semibold">Upload Record</h2>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="block w-full text-sm" />
      <button className="rounded-lg bg-indigo-500 px-4 py-2" disabled={upload.isPending}>Upload</button>
    </form>
  );
}
