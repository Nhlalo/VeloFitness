import { MockMembershipData } from "../../../data/mock/mockMembershipSubscription";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (plan: MockMembershipData) => void;
  availablePlans: MockMembershipData[];
}

export default function ChangePlanModal({
  isOpen,
  onClose,
  onSelectPlan,
  availablePlans,
}: Props) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="pointer-events-auto flex h-auto max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/20 bg-black shadow-2xl">
          <div className="flex shrink-0 items-center justify-between border-b border-white/10 p-6 pb-4">
            <div>
              <h3 className="text-xl font-light">Change Membership Plan</h3>
              <p className="mt-1 text-xs text-white/40">
                Select a plan that fits your lifestyle
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-2xl leading-none text-white/60 transition-colors hover:text-white"
            >
              ×
            </button>
          </div>
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-6 pb-8">
            <div className="grid gap-5 md:grid-cols-2">
              {availablePlans.map((plan) => (
                <div
                  key={plan.id}
                  className="relative rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-white/30 hover:bg-white/10"
                >
                  <div className="p-6">
                    <div className="mb-4 flex justify-center">
                      <div className="h-24 w-24 overflow-hidden rounded-xl border border-white/10">
                        <img
                          src={plan.image}
                          alt={plan.title}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <h4 className="mb-1 text-center text-xl font-light">
                      {plan.title}
                    </h4>
                    <p className="mb-4 text-center text-xs text-white/40">
                      {plan.club}
                    </p>
                    <div className="mb-4 text-center">
                      <span className="text-3xl font-light">{plan.price}</span>
                      <span className="text-xs text-white/40">
                        {" "}
                        /{plan.billing}
                      </span>
                    </div>
                    <div className="mb-6 space-y-2">
                      {plan.features.slice(0, 4).map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-xs text-white/60"
                        >
                          <span className="text-white/30">✓</span>
                          {feature}
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => onSelectPlan(plan)}
                      className="w-full rounded-full border border-white/20 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-white hover:text-black"
                    >
                      Select Plan
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="shrink-0 border-t border-white/10 p-6 pt-4">
            <button
              onClick={onClose}
              className="w-full rounded-full border border-white/20 px-4 py-2.5 text-sm font-medium transition-all duration-300 hover:bg-white/10"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
