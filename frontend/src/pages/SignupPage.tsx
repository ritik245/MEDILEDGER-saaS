import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignup } from '@/hooks/useAuth';
import { Role } from '@/types/auth';
import { useUiStore } from '@/store/uiStore';

export function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'PATIENT' as Role });
  const signup = useSignup();
  const navigate = useNavigate();
  const addToast = useUiStore((s) => s.addToast);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await signup.mutateAsync(form);
      addToast({ type: 'success', message: 'Signup successful. Please login.' });
      navigate('/login');
    } catch {
      addToast({ type: 'error', message: 'Signup failed.' });
    }
  };

  return (
    <div className="min-h-screen grid place-items-center p-4">
      <form onSubmit={submit} className="glass-card w-full max-w-md p-6 space-y-4">
        <h1 className="text-2xl font-semibold">Create Account</h1>
        <input className="w-full rounded-lg border border-border bg-slate-900/70 p-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="w-full rounded-lg border border-border bg-slate-900/70 p-2" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full rounded-lg border border-border bg-slate-900/70 p-2" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <select className="w-full rounded-lg border border-border bg-slate-900/70 p-2" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as Role })}>
          <option value="PATIENT">PATIENT</option>
          <option value="DOCTOR">DOCTOR</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <button className="w-full rounded-lg bg-indigo-500 py-2">Sign up</button>
        <p className="text-sm text-slate-300">Already have account? <Link to="/login" className="text-accent">Login</Link></p>
      </form>
    </div>
  );
}
