function Stats() {
  return (
    <div className="grid grid-cols-2 gap-4 pt-4">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
        <div className="mb-1 text-2xl font-light">0</div>
        <div className="font-mono text-xs tracking-wide text-white/40 uppercase">
          Classes Attended
        </div>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
        <div className="mb-1 text-2xl font-light">0</div>
        <div className="font-mono text-xs tracking-wide text-white/40 uppercase">
          Guest Passes Used
        </div>
      </div>
    </div>
  );
}

function QuickStats() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="mb-3 font-mono text-xs tracking-wide text-white/40 uppercase">
        Quick Stats
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/60">Check-ins this month</span>
          <span className="text-lg font-light">0</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/60">Favorite class</span>
          <span className="font-mono text-sm text-white/80">Cycling</span>
        </div>
      </div>
    </div>
  );
}

export { Stats, QuickStats };
