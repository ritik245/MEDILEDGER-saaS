import { apiClient } from './apiClient';

export const userService = {
  profile: async () => {
    const { data } = await apiClient.get('/users/profile');
    return data;
  },
  allUsers: async () => {
    const { data } = await apiClient.get('/users');
    return data.users ?? data ?? [];
  }
};
