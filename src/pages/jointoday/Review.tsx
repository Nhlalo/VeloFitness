import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { VisibilityContext } from "./JoinToday";
import { X } from "lucide-react";

import StripeProvider from "../../components/payment/StripeProvider";
import PaymentForm from "../../components/payment/PaymentForm";

export default function Review() {
  const { isVisible, setIsVisible, formData, selectedMembership } =
    useContext(VisibilityContext);
  const [termsAccepted, setTermsAccepted] = useState({
    terms1: false,
    terms2: false,
    terms3: false,
  });

  const navigate = useNavigate();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date();
  const monthName = months[date.getMonth()];
  const today = date.toISOString().split("T")[0];
  const shortDay = date.toLocaleDateString("en-US", { weekday: "short" });
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    .toISOString()
    .split("T")[0];

  const allTermsAccepted =
    termsAccepted.terms1 && termsAccepted.terms2 && termsAccepted.terms3;

  // Calculate totals
  const membershipPrice = selectedMembership
    ? parseFloat(selectedMembership.price.replace("$", ""))
    : 79;
  const initiationFee = 100;
  const subtotal = membershipPrice + initiationFee;
  const taxes = subtotal * 0.08; // 8% tax
  const totalDue = subtotal + taxes;

  const handleCheckboxChange = (name: string) => {
    setTermsAccepted((prev) => ({
      ...prev,
      [name]: !prev[name as keyof typeof prev],
    }));
  };
  const handleGoBack = () => {
    setIsVisible({
      personalInformation: false,
      membership: true,
      review: false,
    });
  };

  const handlePaymentSuccess = async (token: string) => {
    navigate(`/set-password?email=${formData.email}&token=${token}`, {
      replace: true,
    });
  };

  const handlePaymentError = (error: string) => {
    console.error("Payment failed:", error);
  };

  console.log("SELECTED MEMBERSHIP", selectedMembership);
  return (
    <div
      className={`transition-all duration-500 ${
        isVisible.review
          ? "visible translate-x-0 opacity-100"
          : "pointer-events-none invisible absolute inset-0 translate-x-full opacity-0"
      }`}
    >
      <div className="pb-8">
        <div className="mb-4 flex justify-end px-6 pt-6 sm:px-8 sm:pt-8">
          <button
            onClick={handleGoBack}
            className="rounded-full p-2 transition-colors hover:bg-gray-100"
            aria-label="Go back"
          >
            <X size={20} className="text-black" />
          </button>
        </div>

        <div className="px-6 sm:px-8">
          <h2 className="mb-6 text-2xl font-bold md:text-3xl">Membership</h2>

          <div className="overflow-hidden rounded-lg border border-gray-200">
            <div className="p-5">
              <div className="flex items-center gap-4">
                <div className="shrink-0">
                  <img
                    src={selectedMembership?.image}
                    alt={selectedMembership?.title || "Membership"}
                    className="h-12 w-12 rounded-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-bold text-black">
                    {selectedMembership?.title}
                  </div>
                  <div className="text-sm text-gray-400">
                    {selectedMembership?.club}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-black">
                    {selectedMembership?.price}
                  </div>
                  <div className="text-xs text-gray-400">Month</div>
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-gray-200" />
            <div className="p-5">
              <div className="text-left">
                <div className="font-medium">
                  Member: {formData.name} {formData.surname}
                </div>
                <div className="mt-1 text-sm text-gray-400">
                  Email: {formData.email}
                </div>
                <div className="mt-1 text-sm text-gray-400">
                  Phone: {formData.phoneNumber}
                </div>
                <div className="mt-1 text-sm text-gray-400">
                  Club: {formData.clubName}
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-gray-200" />
            <div className="p-5">
              <div className="text-left">
                <div className="font-medium">
                  Membership start:{shortDay} - {today}
                </div>
                <div className="mt-1 text-sm text-gray-400">
                  12 mo-commitment
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-gray-200" />
            <div className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-left">
                <div className="font-medium">March</div>
                <div className="text-sm text-gray-400">
                  Prorated {today} - {lastDayOfMonth}
                </div>
              </div>
              <div className="font-medium sm:text-right">
                ${membershipPrice.toFixed(2)}
              </div>
            </div>

            <div className="h-px w-full bg-gray-200" />
            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1 text-left">
                <div className="font-medium">Initiation fee</div>
                <div className="mt-1 text-sm text-gray-500">
                  Join today for $100 initiation and receive an additional
                  complimentary PT session + a $250 credit to The Shop or Spa.
                </div>
              </div>
              <div className="font-medium whitespace-nowrap sm:text-right">
                ${initiationFee.toFixed(2)}
              </div>
            </div>

            <div className="h-px w-full bg-gray-200" />
            <div className="flex items-center justify-between p-5">
              <div className="font-medium">Subtotal</div>
              <div>${subtotal.toFixed(2)}</div>
            </div>

            <div className="h-px w-full bg-gray-200" />
            <div className="flex items-center justify-between p-5">
              <div className="font-medium">Taxes</div>
              <div>${taxes.toFixed(2)}</div>
            </div>

            <div className="h-px w-full bg-gray-200" />
            <div className="flex items-center justify-between bg-gray-50 p-5">
              <div className="font-bold">Total Due Today</div>
              <div className="font-bold">${totalDue.toFixed(2)}</div>
            </div>
          </div>

          <div className="mt-8 space-y-4 text-left">
            <div className="flex gap-3">
              <input
                type="checkbox"
                checked={termsAccepted.terms1}
                onChange={() => handleCheckboxChange("terms1")}
                className="mt-1 h-4 w-4 shrink-0"
              />
              <div className="text-sm text-gray-600">
                I agree to the{" "}
                <span className="cursor-pointer font-medium text-black underline">
                  Membership Terms and conditions
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <input
                type="checkbox"
                checked={termsAccepted.terms2}
                onChange={() => handleCheckboxChange("terms2")}
                className="mt-1 h-4 w-4 shrink-0"
              />
              <div className="text-sm text-gray-600">
                I agree that my membership will renew automatically and I will
                be charged the monthly dues of ${membershipPrice.toFixed(2)}{" "}
                (excluding taxes) every month on the 23rd day of the month
                beginning {monthName} 2026 until I cancel, price subject to
                change
              </div>
            </div>

            <div className="flex gap-3">
              <input
                type="checkbox"
                checked={termsAccepted.terms3}
                onChange={() => handleCheckboxChange("terms3")}
                className="mt-1 h-4 w-4 shrink-0"
              />
              <div className="text-sm text-gray-600">
                I agree to pay the "Total Due Today" and commit to a minimum
                purchase of 12 months of membership, subject to certain
                exceptions.
              </div>
            </div>
          </div>

          <StripeProvider>
            <PaymentForm
              amount={totalDue}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
              buttonText={`Pay $${totalDue.toFixed(2)}`}
              disabled={!allTermsAccepted}
              userInfor={{
                ...formData,
                membershipTitle: selectedMembership?.title,
              }}
            />
          </StripeProvider>
        </div>
      </div>
    </div>
  );
}
