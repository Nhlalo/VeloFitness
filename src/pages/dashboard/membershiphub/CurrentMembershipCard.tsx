// components/CurrentMembershipCard.jsx - Phase 2

export default function CurrentMembershipCard() {
  return (
    <div className="mb-12">
      <div className="rounded-3xl border border-white/20 bg-linear-to-br from-white/8 to-transparent p-8 backdrop-blur-sm">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center">
          <div className="shrink-0">
            <div className="h-32 w-32 overflow-hidden rounded-2xl border border-white/20 lg:h-40 lg:w-40">
              <img
                src="/api/placeholder/160/120"
                alt="Plan"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-light tracking-tight lg:text-3xl">
                Premium Plus
              </h2>
              <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 font-mono text-xs tracking-wide">
                Active
              </span>
            </div>
            <p className="mb-4 text-sm text-white/60">All Velo Clubs</p>
            <div className="mb-6 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-2 text-sm text-white/70">
                <span className="text-white/40">✦</span>
                Unlimited classes
              </div>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <span className="text-white/40">✦</span>8 guest passes / month
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
              <div>
                <div className="text-3xl font-light">$199</div>
                <div className="text-xs text-white/40">billed monthly</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-xs text-white/40">
                  Next billing
                </div>
                <div className="text-sm">April 15, 2026</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
