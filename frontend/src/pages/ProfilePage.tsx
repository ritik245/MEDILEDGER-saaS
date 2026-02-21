import { useQuery } from '@tanstack/react-query';
import { userService } from '@/services/userService';
import { useAuthStore } from '@/store/authStore';

export function ProfilePage() {
  const authUser = useAuthStore((s) => s.user);
  const { data } = useQuery({ queryKey: ['profile'], queryFn: userService.profile, retry: false });
  const profile = data?.user ?? authUser;

  return (
    <div className="glass-card p-4">
      <h2 className="font-semibold mb-3">Profile</h2>
      <div className="text-sm text-slate-300 space-y-1">
        <p>Name: {profile?.name}</p>
        <p>Email: {profile?.email}</p>
        <p>Role: {profile?.role}</p>
      </div>
    </div>
  );
}
