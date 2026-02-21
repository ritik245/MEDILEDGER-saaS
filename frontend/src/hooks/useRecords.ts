import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { recordService } from '@/services/recordService';

export const useRecords = () =>
  useQuery({
    queryKey: ['records'],
    queryFn: recordService.list,
    staleTime: 30000,
    retry: false
  });

export const useUploadRecord = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: recordService.upload,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['records'] })
  });
};
