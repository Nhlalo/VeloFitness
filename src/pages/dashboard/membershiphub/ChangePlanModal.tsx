// components/ChangePlanModal.jsx - Phase 2

export default function ChangePlanModal() {
  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity" />
      <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="pointer-events-auto flex h-auto max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/20 bg-black shadow-2xl">
          <div className="flex shrink-0 items-center justify-between border-b border-white/10 p-6 pb-4">
            <div>
              <h3 className="text-xl font-light">Change Membership Plan</h3>
              <p className="mt-1 text-xs text-white/40">
                Select a plan that fits your lifestyle
              </p>
            </div>
            <button className="text-2xl leading-none text-white/60 transition-colors hover:text-white">
              ×
            </button>
          </div>
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-6 pb-8">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="mb-4 flex justify-center">
                  <div className="h-24 w-24 overflow-hidden rounded-xl border border-white/10">
                    <img
                      src="/api/placeholder/96/96"
                      alt="Plan"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <h4 className="mb-1 text-center text-xl font-light">
                  Standard
                </h4>
                <p className="mb-4 text-center text-xs text-white/40">
                  Single Club Access
                </p>
                <div className="mb-4 text-center">
                  <span className="text-3xl font-light">$149</span>
                  <span className="text-xs text-white/40"> /month</span>
                </div>
                <button className="w-full rounded-full border border-white/20 py-2.5 text-sm font-medium text-white">
                  Select Plan
                </button>
              </div>
            </div>
          </div>
          <div className="shrink-0 border-t border-white/10 p-6 pt-4">
            <button className="w-full rounded-full border border-white/20 px-4 py-2.5 text-sm font-medium">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
