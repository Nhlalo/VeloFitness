// components/CancelConfirmModal.jsx - Phase 2

export default function CancelConfirmModal() {
  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm transition-opacity" />
      <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="pointer-events-auto w-full max-w-md rounded-2xl border border-red-500/30 bg-black shadow-2xl">
          <div className="border-b border-red-500/30 p-6">
            <div className="flex items-center gap-3">
              <div className="text-3xl">⚠️</div>
              <div>
                <h3 className="text-xl font-light">Cancel Subscription</h3>
                <p className="mt-1 text-xs text-white/40">
                  This action cannot be undone
                </p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <p className="text-sm text-white/80">
              Are you sure you want to cancel your membership?
            </p>
            <div className="mt-4 rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4">
              <p className="text-xs text-yellow-400">
                ⚠️ You will lose access to:
              </p>
              <ul className="mt-2 space-y-1 text-xs text-white/60">
                <li>• All remaining guest passes</li>
                <li>• Class booking privileges</li>
                <li>• Club access after 30 days</li>
              </ul>
            </div>
          </div>
          <div className="flex gap-3 border-t border-red-500/30 p-6 pt-4">
            <button className="flex-1 rounded-full border border-white/20 px-4 py-2.5 text-sm font-medium">
              Keep Membership
            </button>
            <button className="flex-1 rounded-full bg-red-500 px-4 py-2.5 text-sm font-medium text-white">
              Yes, Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
