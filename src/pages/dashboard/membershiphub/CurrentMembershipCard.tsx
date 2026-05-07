import { Sparkle } from "lucide-react";
import { MembershipData } from "../../../data/constants/membershipSubscription";
import Img from "../../../components/shared/Img";

interface CurrentMembershipCardProps {
  membership: MembershipData | null | undefined;
  isCancelled: boolean;
  nextBillingDate: string | null | undefined;
}

export default function CurrentMembershipCard({
  membership,
  isCancelled,
  nextBillingDate,
}: CurrentMembershipCardProps) {
  return (
    <div className="mb-12">
      <div
        className={`rounded-3xl border p-8 backdrop-blur-sm ${
          isCancelled
            ? "border-yellow-500/30 bg-linear-to-br from-yellow-500/5 to-transparent"
            : "border-white/20 bg-linear-to-br from-white/8 to-transparent"
        }`}
      >
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center">
          <div className="shrink-0">
            <div
              className={`h-32 w-32 overflow-hidden rounded-2xl border lg:h-40 lg:w-40 ${
                isCancelled
                  ? "border-yellow-500/30 opacity-70"
                  : "border-white/20"
              }`}
            >
              <Img
                src={membership?.image as string}
                alt={membership?.title as string}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-light tracking-tight lg:text-3xl">
                {membership?.title}
              </h2>
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 font-mono text-xs tracking-wide ${
                  isCancelled
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-white/10"
                }`}
              >
                {isCancelled ? "Pending Cancellation" : "Active"}
              </span>
            </div>
            <p className="mb-4 text-sm text-white/60">{membership?.club}</p>
            <div className="mb-6 grid gap-4 sm:grid-cols-2">
              {membership?.features.slice(0, 4).map((feature, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-2 text-sm ${
                    isCancelled ? "text-white/40" : "text-white/70"
                  }`}
                >
                  <span
                    className={isCancelled ? "text-white/20" : "text-white/40"}
                  >
                    <Sparkle aria-hidden="true" />
                  </span>
                  {feature}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
              <div>
                <div className="text-3xl font-light">{membership?.price}</div>
                <div className="text-xs text-white/40">billed monthly</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-xs text-white/40">
                  Next billing
                </div>
                <div className="text-sm">
                  {isCancelled
                    ? "No further billing"
                    : nextBillingDate?.split("T")[0]}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
