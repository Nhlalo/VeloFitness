import MembershipHeader from "./MembershipHeader";
import CancellationBanner from "./CancellationBanner";
import CurrentMembershipCard from "./CurrentMembershipCard";
import UsageInsights from "./UsageInsights";
import ChangePlanModal from "./ChangePlanModal";
import CancelConfirmModal from "./CancelConfirmModal";
export default function MembershipHub() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative overflow-hidden">
        <div className="absolute top-0 right-0 h-125 w-125 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-100 w-100 rounded-full bg-white/5 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
          <MembershipHeader />
          <CancellationBanner />
          <CurrentMembershipCard />
          <UsageInsights />
          <ChangePlanModal />
          <CancelConfirmModal />
        </div>
      </div>
    </div>
  );
}
