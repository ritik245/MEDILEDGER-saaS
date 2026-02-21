import { apiClient } from './apiClient';

export const permissionService = {
  requestAccess: async (recordId: number) => apiClient.post('/permissions/request', { recordId }),
  grantAccess: async (recordId: number, doctorId: number) => apiClient.post('/permissions/grant', { recordId, doctorId }),
  revokeAccess: async (recordId: number, doctorId: number) => apiClient.post('/permissions/revoke', { recordId, doctorId })
};
