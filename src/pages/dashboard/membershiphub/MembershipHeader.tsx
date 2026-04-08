// components/MembershipHeader.jsx - Phase 2

export default function MembershipHeader() {
  return (
    <div className="mb-12 flex items-center justify-between border-b border-white/10 pb-6">
      <div>
        <div className="mb-2 font-mono text-xs tracking-wider text-white/40 uppercase">
          Your Plan
        </div>
        <h1 className="text-4xl font-light tracking-tight sm:text-5xl lg:text-6xl">
          Membership
        </h1>
      </div>
      <div className="flex gap-3">
        <button className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:bg-white hover:text-black">
          Change Plan
        </button>
        <button className="rounded-full border border-red-500/50 px-5 py-2.5 text-sm font-medium text-red-400 transition-all duration-300 hover:bg-red-500 hover:text-white">
          Cancel Subscription
        </button>
      </div>
    </div>
  );
}
