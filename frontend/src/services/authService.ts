import { apiClient } from './apiClient';
import { AuthResponse, Role } from '@/types/auth';

export const authService = {
  signup: async (payload: { name: string; email: string; password: string; role: Role }) => {
    const { data } = await apiClient.post('/user/signup', payload);
    return data;
  },
  login: async (payload: { email: string; password: string }): Promise<AuthResponse> => {
    try {
      const { data } = await apiClient.post('/user/login', payload);
      return data;
    } catch {
      const { data } = await apiClient.post('/user/signin', payload);
      return data;
    }
  }
};
