import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLogin } from '@/hooks/useAuth';
import { useAuthStore } from '@/store/authStore';
import { useUiStore } from '@/store/uiStore';
import { roleHomePath } from '@/utils/roleHome';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useLogin();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const addToast = useUiStore((s) => s.addToast);

  useEffect(() => {
    if (user) navigate(roleHomePath(user.role));
  }, [user, navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await login.mutateAsync({ email, password });
      addToast({ type: 'success', message: 'Logged in successfully' });
      navigate(roleHomePath(res.user.role));
    } catch {
      addToast({ type: 'error', message: 'Login failed. Check credentials.' });
    }
  };

  return (
    <div className="min-h-screen grid place-items-center p-4">
      <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={submit} className="glass-card w-full max-w-md p-6 space-y-4">
        <h1 className="text-2xl font-semibold">Login</h1>
        <input className="w-full rounded-lg border border-border bg-slate-900/70 p-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full rounded-lg border border-border bg-slate-900/70 p-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full rounded-lg bg-sky-500 py-2">Sign in</button>
        <p className="text-sm text-slate-300">No account? <Link to="/signup" className="text-accent">Sign up</Link></p>
      </motion.form>
    </div>
  );
}
