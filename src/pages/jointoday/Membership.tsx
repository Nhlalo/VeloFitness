import { useContext, useState } from "react";
import { X } from "lucide-react";
import { VisibilityContext } from "./JoinToday";
import { MembershipData } from "../../types/membershipdata.interface";
import { membershipData } from "../../data/constants/membershipfee";

export default function Membership() {
  const { isVisible, setIsVisible, setSelectedMembership, selectedMembership } =
    useContext(VisibilityContext);
  const [selectedId, setSelectedId] = useState<number | null>(
    selectedMembership?.id || null,
  );

  const handleSelectMembership = (item: MembershipData) => {
    setSelectedId(item.id);
    setSelectedMembership(item);
  };

  const handleNext = () => {
    if (selectedId) {
      setIsVisible({
        personalInformation: false,
        membership: false,
        review: true,
      });
    }
  };

  const handleGoBack = () => {
    setIsVisible({
      personalInformation: true,
      membership: false,
      review: false,
    });
  };

  return (
    <div
      className={`transition-all duration-500 ${
        isVisible.membership
          ? "visible translate-x-0 opacity-100"
          : isVisible.review
            ? "pointer-events-none invisible absolute inset-0 -translate-x-full opacity-0"
            : "pointer-events-none invisible absolute inset-0 translate-x-full opacity-0"
      }`}
    >
      <div className="p-6 sm:p-8">
        <div className="mb-4 flex justify-end">
          <button
            onClick={handleGoBack}
            className="rounded-full p-2 transition-colors hover:bg-gray-100"
            aria-label="Go back"
          >
            <X aria-hidden="true" size={20} className="text-black" />
          </button>
        </div>

        <div>
          <h2 className="mb-6 text-lg leading-tight font-bold sm:mb-8 sm:text-xl md:text-2xl lg:text-3xl">
            Unlimited classes, guest passes, complimentary fitness assessments,
            and so much more.
          </h2>

          <div className="space-y-3 sm:space-y-4">
            {membershipData.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelectMembership(item)}
                className={`w-full cursor-pointer rounded-lg border transition-all ${
                  selectedId === item.id
                    ? "border-black ring-2 ring-black"
                    : "border-gray-200 hover:border-black"
                }`}
              >
                <div className="flex items-center gap-3 p-3 sm:gap-4 sm:p-4">
                  <div className="shrink-0">
                    <div className="h-14 w-20 overflow-hidden rounded-md sm:h-16 sm:w-24">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col justify-center text-left">
                    <div className="text-sm font-bold text-black sm:text-base">
                      {item.title}
                    </div>
                    <div className="text-xs text-gray-400 sm:text-sm">
                      {item.club}
                    </div>
                  </div>

                  <div className="flex flex-col justify-center text-right">
                    <div className="text-base font-bold text-black sm:text-lg">
                      {item.price}
                    </div>
                    <div className="text-xs text-gray-400">Month</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 sm:mt-8">
            <button
              onClick={handleNext}
              disabled={!selectedId}
              className={`w-full rounded-lg border-2 bg-white px-4 py-3 text-sm font-bold transition-colors duration-300 sm:px-6 sm:py-4 sm:text-base ${
                selectedId
                  ? "border-black text-black hover:bg-black hover:text-white"
                  : "cursor-not-allowed border-gray-200 text-gray-400"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
