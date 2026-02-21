import { apiClient } from './apiClient';
import { RecordItem } from '@/types/record';

export const recordService = {
  upload: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await apiClient.post('/records/upload', formData);
    return data;
  },
  list: async (): Promise<RecordItem[]> => {
    const { data } = await apiClient.get('/records');
    return data.records ?? data ?? [];
  },
  download: async (id: number): Promise<Blob> => {
    const { data } = await apiClient.get(`/records/${id}`, { responseType: 'blob' });
    return data;
  }
};
