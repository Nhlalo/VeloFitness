import { CreditCard, Calendar, Lock } from "lucide-react";
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

          {/* Main container with border */}
          <div className="overflow-hidden rounded-lg border border-gray-200">
            {/* Row 1 - Selected membership block */}
            <div className="p-5">
              <div className="flex items-center gap-4">
                {/* Image column */}
                <div className="shrink-0">
                  <img
                    src={selectedMembership.image}
                    alt={selectedMembership.title}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                </div>

                {/* Text column */}
                <div className="flex-1">
                  <div className="font-bold text-black">
                    {selectedMembership.title}
                  </div>
                  <div className="text-sm text-gray-400">
                    {selectedMembership.club}
                  </div>
                </div>

                {/* Price column */}
                <div className="text-right">
                  <div className="text-lg font-bold text-black">
                    {selectedMembership.price}
                  </div>
                  <div className="text-xs text-gray-400">Month</div>
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-gray-200"></div>

            {/* Row 2 - Membership start */}
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

            {/* Row 3 - March */}
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

            {/* Row 4 - Initiation fee */}
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

            {/* Row 5 - Subtotal */}
            <div className="flex items-center justify-between p-5">
              <div className="font-medium">Subtotal</div>
              <div>$360.00</div>
            </div>

            <div className="h-px w-full bg-gray-200"></div>

            {/* Row 6 - Taxes */}
            <div className="flex items-center justify-between p-5">
              <div className="font-medium">Taxes</div>
              <div>$28.80</div>
            </div>

            <div className="h-px w-full bg-gray-200"></div>

            {/* Row 7 - Total Due Today */}
            <div className="flex items-center justify-between bg-gray-50 p-5">
              <div className="font-bold">Total Due Today</div>
              <div className="font-bold">$388.80</div>
            </div>
          </div>

          {/* Payment and billing container */}
          <div className="mt-8">
            <h3 className="mb-4 text-xl font-bold">Payment and billing</h3>

            {/* Row 1 - Name and card */}
            <div className="mb-4 flex flex-col gap-4 sm:flex-row">
              <input
                type="text"
                placeholder="Name"
                className="flex-1 rounded-md border border-gray-300 p-3 placeholder-gray-400 focus:border-black focus:outline-none"
              />
              <div className="relative flex-1">
                <CreditCard
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Credit/debit card"
                  className="w-full rounded-md border border-gray-300 p-3 pl-10 placeholder-gray-400 focus:border-black focus:outline-none"
                />
              </div>
            </div>

            {/* Row 2 - Expiration, CVC, Postal */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Calendar
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Expiration"
                  className="w-full rounded-md border border-gray-300 p-3 pl-10 placeholder-gray-400 focus:border-black focus:outline-none"
                />
              </div>
              <div className="relative flex-1">
                <Lock
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="CVC"
                  className="w-full rounded-md border border-gray-300 p-3 pl-10 placeholder-gray-400 focus:border-black focus:outline-none"
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Postal"
                  className="w-full rounded-md border border-gray-300 p-3 placeholder-gray-400 focus:border-black focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Terms container */}
          <div className="mt-8 space-y-4">
            {/* Row 1 */}
            <div className="flex gap-3">
              <input type="checkbox" className="mt-1 h-4 w-4 shrink-0" />
              <div className="text-sm text-gray-600">
                I agree to the{" "}
                <span className="cursor-pointer font-medium text-black underline">
                  Membership Terms and conditions
                </span>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex gap-3">
              <input type="checkbox" className="mt-1 h-4 w-4 shrink-0" />
              <div className="text-sm text-gray-600">
                I agree that my membership will renew automatically and I will
                be charged the monthly dues of $260.00 (excluding taxes) every
                month on the 23rd day of the month beginning March 2026 until I
                cancel, price subject to change
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex gap-3">
              <input type="checkbox" className="mt-1 h-4 w-4 shrink-0" />
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
        </div>
      </div>
    </div>
  );
}
