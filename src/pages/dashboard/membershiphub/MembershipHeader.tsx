interface Props {
  onChangePlanClick: () => void;
  onCancelClick: () => void;
  isCancelled: boolean;
  onReactivateClick: () => void;
}

export default function MembershipHeader({
  onChangePlanClick,
  onCancelClick,
  isCancelled,
  onReactivateClick,
}: Props) {
  return (
    <div className="mb-12 flex flex-col gap-6 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="mb-2 font-mono text-xs tracking-wider text-white/40 uppercase">
          Your Plan
        </div>
        <h1 className="text-4xl font-light tracking-tight sm:text-5xl lg:text-6xl">
          Membership
        </h1>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        {!isCancelled && (
          <button
            onClick={onChangePlanClick}
            className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:bg-white hover:text-black"
          >
            Change Plan
          </button>
        )}

        {!isCancelled ? (
          <button
            onClick={onCancelClick}
            className="rounded-full border border-red-500/50 px-5 py-2.5 text-sm font-medium text-red-400 transition-all duration-300 hover:bg-red-500 hover:text-white"
          >
            Cancel Subscription
          </button>
        ) : (
          <button
            onClick={onReactivateClick}
            className="rounded-full border border-green-500/50 px-5 py-2.5 text-sm font-medium text-green-400 transition-all duration-300 hover:bg-green-500 hover:text-white"
          >
            Reactivate Membership
          </button>
        )}
      </div>
    </div>
  );
}
