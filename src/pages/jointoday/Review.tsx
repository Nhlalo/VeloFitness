import { Info } from "lucide-react";

export default function Review() {
  const selectedMembership = {
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Premium Club Access",
    club: "Downtown Fitness",
    price: "$79",
  };

  return (
    <div className="space-y-8 pb-8">
      <div>
        <div>
          <h2 className="mb-6 text-2xl font-bold md:text-3xl">Membership</h2>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <div className="p-5">
              <div className="flex items-center gap-4">
                <div className="shrink-0">
                  <img
                    src={selectedMembership.image}
                    alt={selectedMembership.title}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-black">
                    {selectedMembership.title}
                  </div>
                  <div className="text-sm text-gray-400">
                    {selectedMembership.club}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-black">
                    {selectedMembership.price}
                  </div>
                  <div className="text-xs text-gray-400">Month</div>
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-gray-200"></div>
            <div className="p-5">
              <div>
                <div className="font-medium">
                  Membership start: Thursday - 03/19/26
                </div>
                <div className="mt-1 text-sm text-gray-400">
                  12 mo-commitment
                </div>
              </div>
            </div>
            <div className="h-px w-full bg-gray-200"></div>
            <div className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="font-medium">March</div>
                <div className="text-sm text-gray-400">
                  Procrated 03/09/26 - 03/31/26
                </div>
              </div>
              <div className="font-medium sm:text-right">$260.00</div>
            </div>

            <div className="h-px w-full bg-gray-200"></div>
            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1">
                <div className="font-medium">Initiation fee</div>
                <div className="mt-1 text-sm text-gray-500">
                  Join today for $100 initiation and receive an additional
                  complimentary PT session + a $250 credit to The Shop or Spa.
                  Credits will be dropped into member accounts on April 15th.
                </div>
              </div>
              <div className="font-medium whitespace-nowrap sm:text-right">
                $100.00
              </div>
            </div>

            <div className="h-px w-full bg-gray-200"></div>

            <div className="flex items-center justify-between p-5">
              <div className="font-medium">Subtotal</div>
              <div>$360.00</div>
            </div>

            <div className="h-px w-full bg-gray-200"></div>

            <div className="flex items-center justify-between p-5">
              <div className="font-medium">Taxes</div>
              <div>$28.80</div>
            </div>

            <div className="h-px w-full bg-gray-200"></div>

            <div className="flex items-center justify-between bg-gray-50 p-5">
              <div className="font-bold">Total Due Today</div>
              <div className="font-bold">$388.80</div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex gap-3">
              <input
                type="checkbox"
                name="terms1"
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
                name="terms2"
                className="mt-1 h-4 w-4 shrink-0"
              />
              <div className="text-sm text-gray-600">
                I agree that my membership will renew automatically and I will
                be charged the monthly dues of $260.00 (excluding taxes) every
                month on the 23rd day of the month beginning March 2026 until I
                cancel, price subject to change
              </div>
            </div>

            <div className="flex gap-3">
              <input
                type="checkbox"
                name="terms3"
                className="mt-1 h-4 w-4 shrink-0"
              />
              <div className="text-sm text-gray-600">
                I agree to pay the "Total Due Today" and commit to a minimum
                purchase of 12 months of membership, subject to certain
                exceptions. As detailed in my{" "}
                <span className="cursor-pointer font-medium text-black underline">
                  Membership Terms & Conditions
                </span>
                , cancellations require advance notice, and no full or partial
                refunds will be provided except as required by law.
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-start gap-2 rounded-md border border-blue-200 bg-blue-50 p-3">
            <Info size={18} className="mt-0.5 shrink-0 text-blue-500" />
            <div className="text-xs text-blue-700">
              <span className="font-bold">Test Mode:</span> This is a Stripe
              demo. Use{" "}
              <span className="font-mono font-bold">4242 4242 4242 4242</span>{" "}
              for testing with any future expiry and CVC.
            </div>
          </div>

          <button className="mt-4 w-full rounded-md bg-gray-200 py-4 text-center font-medium text-gray-700 transition-colors hover:bg-gray-300">
            Purchase Membership
          </button>
        </div>
      </div>
    </div>
  );
}
