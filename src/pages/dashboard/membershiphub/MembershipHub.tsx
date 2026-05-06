import { useState } from "react";
import { useAuth } from "../../../context/authContext";
import {
  membershipData,
  MembershipData,
} from "../../../data/constants/membershipSubscription";
import apiRequest from "../../../service/appApi";
import MembershipHeader from "./MembershipHeader";
import CancellationBanner from "./CancellationBanner";
import CurrentMembershipCard from "./CurrentMembershipCard";
import UsageInsights from "./UsageInsights";
import ChangePlanModal from "./ChangePlanModal";
import CancelConfirmModal from "./CancelConfirmModal";

function findMembershipData(
  membershipsData: MembershipData[],
  userMembership: string,
) {
  return membershipsData.find(
    (membershipData) =>
      membershipData.title.toLowerCase() == userMembership.toLowerCase(),
  );
}

interface CancellationStatus {
  isCancelled: boolean;
  cancellationDate: null | string;
  membershipEndsOn: null | string;
}

export default function MembershipHub() {
  const { user, setUser } = useAuth();

  const userMembership = user?.membershipTitle
    ? findMembershipData(membershipData, user.membershipTitle)
    : null;

  const membershipStatus = user?.membershipStatus.toLowerCase() == "active";

  const [currentMembership, setCurrentMembership] = useState<
    MembershipData | null | undefined
  >(userMembership);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancellationStatus, setCancellationStatus] =
    useState<CancellationStatus>({
      isCancelled: !membershipStatus,
      cancellationDate: null,
      membershipEndsOn: null,
    });
  const [loading, setLoading] = useState<boolean>(false);

  const availablePlans = membershipData.filter(
    (plan) =>
      plan?.title?.toLowerCase() !== user?.membershipTitle?.toLowerCase(),
  );

  const handleChangePlanClick = () => setIsPlanModalOpen(true);
  const handleClosePlanModal = () => setIsPlanModalOpen(false);

  const handleSelectPlan = async (membershipTitle: string) => {
    if (loading) return;
    try {
      const response = await apiRequest(
        "membership",
        {
          membershipTitle: membershipTitle,
        },
        "PATCH",
      );

      if (!response.ok) {
        throw new Error("Membership change failed");
      }
      const data = await response.json();

      console.log(data);
      const membershipPlan = findMembershipData(
        membershipData,
        data.user.membershipTitle,
      );

      setCurrentMembership(membershipPlan);

      setCancellationStatus({
        isCancelled: false,
        cancellationDate: null,
        membershipEndsOn: null,
      });
      setUser((prev) => {
        if (!prev) return null;

        return {
          ...prev,
          membershipTitle: data.user.membershipTitle,
          membershipStatus: "active".toLowerCase(),
          nextBillingDate: data.user.nextBillingDate,
        };
      });
      setLoading(false);
      setIsPlanModalOpen(false);
    } catch (error) {
      setLoading(false);
      console.error("Membership change error:", error);
    }
  };

  const handleCancelClick = () => setIsCancelModalOpen(true);
  const handleCloseCancelModal = () => setIsCancelModalOpen(false);

  const handleConfirmCancel = async () => {
    if (loading) return;
    try {
      const response = await apiRequest("membership/cancel");

      if (!response.ok) {
        throw new Error("Cancellation failed");
      }

      const data = await response.json();

      const cancellationDate = data.user.cancelledAt
        ? new Date(data.cancelledAt)
        : new Date();

      const membershipEndDate = user?.membershipEndDate
        ? new Date(user.membershipEndDate)
        : new Date();

      setCancellationStatus({
        isCancelled: true,
        cancellationDate: cancellationDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        membershipEndsOn: membershipEndDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      });

      setUser((prev) => {
        if (!prev) return null;

        return {
          ...prev,
          membershipStatus: "Inactive",
          nextBillingDate: "",
        };
      });

      setLoading(false);
      setIsCancelModalOpen(false);
    } catch (error) {
      setLoading(false);
      console.error("Cancellation error:", error);
    }
  };

  const handleReactivateClick = async () => {
    if (loading) return;
    try {
      const response = await apiRequest("membership/reactivate");

      if (!response.ok) {
        throw new Error("Reactivation failed");
      }
      const data = await response.json();
      console.log("DATA", data);

      setCancellationStatus({
        isCancelled: false,
        cancellationDate: null,
        membershipEndsOn: null,
      });
      setUser((prev) => {
        if (!prev) return null;

        return {
          ...prev,
          membershipTitle: data.user.membershipTitle,
          membershipStatus: "active".toLowerCase(),
          nextBillingDate: data.user.nextBillingDate,
        };
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Reactivation  error:", error);
    }
  };

  return (
    <div className="mt-6 min-h-screen bg-black text-white md:mt-0">
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
            nextBillingDate={
              !cancellationStatus.isCancelled ? user?.nextBillingDate : null
            }
          />

          <UsageInsights
            isCancelled={cancellationStatus.isCancelled}
            nextBillingDate={
              !cancellationStatus.isCancelled ? user?.nextBillingDate : null
            }
          />

          <ChangePlanModal
            isOpen={isPlanModalOpen}
            onClose={handleClosePlanModal}
            onSelectPlan={handleSelectPlan}
            availablePlans={availablePlans}
          />

          <CancelConfirmModal
            isOpen={isCancelModalOpen}
            onClose={handleCloseCancelModal}
            onConfirm={handleConfirmCancel}
            membershipTitle={currentMembership?.title}
            membershipEndsOn={user?.membershipEndDate}
          />
        </div>
      </div>
    </div>
  );
}
