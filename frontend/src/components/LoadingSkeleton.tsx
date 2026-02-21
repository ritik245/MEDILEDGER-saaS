export function LoadingSkeleton() {
  return (
    <div className="glass-card p-4 animate-pulse space-y-3">
      <div className="h-4 rounded bg-white/10" />
      <div className="h-4 rounded bg-white/10 w-5/6" />
      <div className="h-4 rounded bg-white/10 w-4/6" />
    </div>
  );
}
