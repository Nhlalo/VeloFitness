// components/CancellationBanner.jsx - Phase 2

export default function CancellationBanner() {
  return (
    <div className="mb-8 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-6 backdrop-blur-sm">
      <div className="flex items-start gap-4">
        <div className="text-2xl">⚠️</div>
        <div className="flex-1">
          <h3 className="font-semibold text-yellow-400">
            Membership Cancelled
          </h3>
          <p className="mt-1 text-sm text-white/70">
            Your membership was cancelled on [date]. You will have access until
            [date].
          </p>
          <p className="mt-2 text-xs text-white/50">
            Click "Reactivate Membership" to restore your benefits.
          </p>
        </div>
      </div>
    </div>
  );
}
