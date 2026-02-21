import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="glass-card p-6 text-center">
        <h1 className="text-2xl font-semibold mb-2">404</h1>
        <Link to="/" className="text-accent">Go Home</Link>
      </div>
    </div>
  );
}
