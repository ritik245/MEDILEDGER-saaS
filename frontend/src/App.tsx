import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { AuthRole, AuthUser, SignUpPayload, downloadRecord, signin, signup, uploadRecord } from './api';

const roles: AuthRole[] = ['PATIENT', 'DOCTOR', 'ADMIN'];

type AuthMode = 'signin' | 'signup';

function App() {
  const [authMode, setAuthMode] = useState<AuthMode>('signin');
  const [authForm, setAuthForm] = useState<SignUpPayload>({ name: '', email: '', password: '', role: 'PATIENT' });
  const [token, setToken] = useState<string>(localStorage.getItem('mediledger.token') || '');
  const [user, setUser] = useState<AuthUser | null>(JSON.parse(localStorage.getItem('mediledger.user') || 'null'));
  const [recordFile, setRecordFile] = useState<File | null>(null);
  const [recordId, setRecordId] = useState<string>('');
  const [status, setStatus] = useState<string>('Ready');

  const userBadge = useMemo(() => {
    if (!user) return 'Guest Session';
    return `${user.name} • ${user.role}`;
  }, [user]);

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setAuthForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAuth = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('Authenticating...');

    try {
      if (authMode === 'signup') {
        await signup(authForm);
        setStatus('Account created. Sign in now.');
        setAuthMode('signin');
        return;
      }

      const result = await signin({ email: authForm.email, password: authForm.password });
      localStorage.setItem('mediledger.token', result.token);
      localStorage.setItem('mediledger.user', JSON.stringify(result.user));
      setToken(result.token);
      setUser(result.user);
      setStatus('Signed in securely.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Authentication failed');
    }
  };

  const handleUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!recordFile) {
      setStatus('Pick a file to upload first.');
      return;
    }

    try {
      setStatus('Encrypting + uploading to IPFS...');
      const result = await uploadRecord(recordFile, token);
      setStatus(`Record uploaded with ID ${result.record.id} and CID ${result.record.cid}`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Upload failed');
    }
  };

  const handleDownload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!recordId) {
      setStatus('Enter a record ID first.');
      return;
    }

    try {
      setStatus('Fetching encrypted record...');
      const blob = await downloadRecord(recordId, token);
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `record-${recordId}`;
      anchor.click();
      URL.revokeObjectURL(url);
      setStatus(`Record ${recordId} downloaded.`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Download failed');
    }
  };

  const handleSignout = () => {
    localStorage.removeItem('mediledger.token');
    localStorage.removeItem('mediledger.user');
    setToken('');
    setUser(null);
    setStatus('Session cleared.');
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <h1>MediLedger Command Center</h1>
          <p>Secure healthcare records with blockchain-traceable activity.</p>
        </div>
        <div className="badge">{userBadge}</div>
      </header>

      <main className="grid">
        <section className="panel">
          <div className="panel-title-row">
            <h2>{authMode === 'signin' ? 'Sign In' : 'Create Account'}</h2>
            <button className="ghost" type="button" onClick={() => setAuthMode((m) => (m === 'signin' ? 'signup' : 'signin'))}>
              Switch to {authMode === 'signin' ? 'Sign Up' : 'Sign In'}
            </button>
          </div>

          <form onSubmit={handleAuth} className="stack">
            {authMode === 'signup' && (
              <>
                <label>
                  Name
                  <input name="name" value={authForm.name} onChange={onChange} required />
                </label>
                <label>
                  Role
                  <select name="role" value={authForm.role} onChange={onChange}>
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </label>
              </>
            )}
            <label>
              Email
              <input name="email" type="email" value={authForm.email} onChange={onChange} required />
            </label>
            <label>
              Password
              <input name="password" type="password" value={authForm.password} onChange={onChange} required />
            </label>
            <button type="submit" className="primary">
              {authMode === 'signin' ? 'Authenticate' : 'Create user'}
            </button>
          </form>
        </section>

        <section className="panel">
          <h2>Patient Record Vault</h2>
          <form onSubmit={handleUpload} className="stack">
            <label>
              Upload medical file
              <input type="file" onChange={(e: ChangeEvent<HTMLInputElement>) => setRecordFile(e.target.files?.[0] || null)} />
            </label>
            <button type="submit" className="primary" disabled={!token}>
              Upload to IPFS
            </button>
          </form>

          <form onSubmit={handleDownload} className="stack compact">
            <label>
              Download by record ID
              <input value={recordId} onChange={(e: ChangeEvent<HTMLInputElement>) => setRecordId(e.target.value)} placeholder="e.g. 1" />
            </label>
            <button type="submit" className="primary" disabled={!token}>
              Download Record
            </button>
          </form>

          <button className="danger" type="button" onClick={handleSignout}>
            Clear Session
          </button>
        </section>
      </main>

      <footer className="status">Status • {status}</footer>
    </div>
  );
}

export default App;
