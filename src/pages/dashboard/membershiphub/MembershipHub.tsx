import MembershipHeader from "./MembershipHeader";
import CancellationBanner from "./CancellationBanner";
import CurrentMembershipCard from "./CurrentMembershipCard";
import UsageInsights from "./UsageInsights";
import ChangePlanModal from "./ChangePlanModal";
import CancelConfirmModal from "./CancelConfirmModal";

export default function MembershipHub() {
  return (
    <div>
      <div>
        <MembershipHeader />
        <CancellationBanner />
        <CurrentMembershipCard />
        <UsageInsights />
        <ChangePlanModal />
        <CancelConfirmModal />
      </div>
    </div>
  );
}
