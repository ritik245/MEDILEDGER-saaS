import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/store/authStore';

export const useLogin = () => {
  const setAuth = useAuthStore((s) => s.setAuth);
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => setAuth(data)
  });
};

export const useSignup = () => useMutation({ mutationFn: authService.signup });
