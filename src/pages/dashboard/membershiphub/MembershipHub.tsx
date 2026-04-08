import { useState } from "react";
import {
  mockMembershipData,
  MockMembershipData,
} from "../../../data/mock/mockMembershipSubscription";
import MembershipHeader from "./MembershipHeader";
import CancellationBanner from "./CancellationBanner";
import CurrentMembershipCard from "./CurrentMembershipCard";
import UsageInsights from "./UsageInsights";
import ChangePlanModal from "./ChangePlanModal";
import CancelConfirmModal from "./CancelConfirmModal";

interface CancellationStatus {
  isCancelled: boolean;
  cancellationDate: null | string;
  membershipEndsOn: null | string;
}
export default function MembershipHub() {
  const [currentMembership, setCurrentMembership] =
    useState<MockMembershipData>(mockMembershipData[0]);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancellationStatus, setCancellationStatus] =
    useState<CancellationStatus>({
      isCancelled: false,
      cancellationDate: null,
      membershipEndsOn: null,
    });

  const availablePlans = mockMembershipData.filter(
    (plan) => plan.title !== currentMembership.title,
  );

  const handleChangePlanClick = () => setIsPlanModalOpen(true);
  const handleClosePlanModal = () => setIsPlanModalOpen(false);

  const handleSelectPlan = (plan: MockMembershipData) => {
    setCurrentMembership({
      ...plan,
      nextBilling: currentMembership.nextBilling,
      renewalStatus: "Active",
    });
    setCancellationStatus({
      isCancelled: false,
      cancellationDate: null,
      membershipEndsOn: null,
    });
    setIsPlanModalOpen(false);
  };

  const handleCancelClick = () => setIsCancelModalOpen(true);
  const handleCloseCancelModal = () => setIsCancelModalOpen(false);

  const handleConfirmCancel = () => {
    const today = new Date();
    const endDate = new Date();
    endDate.setDate(today.getDate() + 30);

    setCancellationStatus({
      isCancelled: true,
      cancellationDate: today.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      membershipEndsOn: endDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    });
    setIsCancelModalOpen(false);
  };

  const handleReactivateClick = () => {
    setCancellationStatus({
      isCancelled: false,
      cancellationDate: null,
      membershipEndsOn: null,
    });
  };

  const membershipEndsOn = new Date(
    Date.now() + 30 * 24 * 60 * 60 * 1000,
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative overflow-hidden">
        <div className="absolute top-0 right-0 h-125 w-125 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-100 w-100 rounded-full bg-white/5 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
          <MembershipHeader
            onChangePlanClick={handleChangePlanClick}
            onCancelClick={handleCancelClick}
            isCancelled={cancellationStatus.isCancelled}
            onReactivateClick={handleReactivateClick}
          />

          <CancellationBanner
            cancellationDate={cancellationStatus.cancellationDate}
            membershipEndsOn={cancellationStatus.membershipEndsOn}
          />

          <CurrentMembershipCard
            membership={currentMembership}
            isCancelled={cancellationStatus.isCancelled}
          />

          <UsageInsights
            isCancelled={cancellationStatus.isCancelled}
            nextBillingDate={currentMembership.nextBilling}
          />

          <ChangePlanModal
            isOpen={isPlanModalOpen}
            onClose={handleClosePlanModal}
            onSelectPlan={handleSelectPlan}
            availablePlans={availablePlans}
            // currentPlanTitle={currentMembership.title}
          />

          <CancelConfirmModal
            isOpen={isCancelModalOpen}
            onClose={handleCloseCancelModal}
            onConfirm={handleConfirmCancel}
            membershipTitle={currentMembership.title}
            membershipEndsOn={membershipEndsOn}
          />
        </div>
      </div>
    </div>
  );
}
