import { CreditCard, Calendar, Lock, Mail } from "lucide-react";

function SelectClub() {
  return (
    <div className="space-y-8">
      <div>
        <div>
          <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl">
            3 Steps you are in
          </h2>

          <form className="mt-6 space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row">
              <input
                type="text"
                placeholder="Name"
                className="flex-1 rounded-md border border-gray-300 p-3 placeholder-gray-400 transition-colors focus:border-black focus:outline-none"
              />
              <input
                type="text"
                placeholder="Surname"
                className="flex-1 rounded-md border border-gray-300 p-3 placeholder-gray-400 transition-colors focus:border-black focus:outline-none"
              />
            </div>

            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-md border border-gray-300 p-3 placeholder-gray-400 transition-colors focus:border-black focus:outline-none"
            />

            <input
              type="text"
              placeholder="Zip Code"
              className="w-full rounded-md border border-gray-300 p-3 placeholder-gray-400 transition-colors focus:border-black focus:outline-none"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full rounded-md border border-gray-300 p-3 placeholder-gray-400 transition-colors focus:border-black focus:outline-none"
            />

            <button
              type="submit"
              className="w-full rounded-md border-2 border-black bg-white px-6 py-4 text-center font-bold transition-colors duration-300 hover:bg-black hover:text-white"
            >
              Select a club +
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function ChooseMembership() {
  const membershipData = [
    {
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      title: "Premium Club Access",
      club: "Downtown Fitness",
      price: "$79",
    },
    {
      image:
        "https://images.unsplash.com/photo-1570829460005-c840387bb1ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      title: "Elite Member Benefits",
      club: "Harbor Sports Club",
      price: "$99",
    },
    {
      image:
        "https://images.unsplash.com/photo-1540496905036-5937c10647cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      title: "Signature Experience",
      club: "Central Park Gym",
      price: "$129",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <div>
          <h2 className="mb-8 text-xl leading-tight font-bold md:text-2xl lg:text-3xl">
            Unlimited classes, guest passes, complimentary fitness assessments,
            and so much more.
          </h2>

          <div className="space-y-4">
            {membershipData.map((item, index) => (
              <div
                key={index}
                className="w-full cursor-pointer rounded-lg border border-gray-200 transition-colors hover:border-black"
              >
                <div className="flex items-center gap-4 p-4">
                  <div className="flex-shrink-0">
                    <div className="h-16 w-24 overflow-hidden rounded-md">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col justify-center">
                    <div className="font-bold text-black">{item.title}</div>
                    <div className="text-sm text-gray-400">{item.club}</div>
                  </div>

                  <div className="flex flex-col justify-center text-right">
                    <div className="text-lg font-bold text-black">
                      {item.price}
                    </div>
                    <div className="text-xs text-gray-400">Month</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Next button - full width */}
          <div className="mt-8">
            <button className="w-full rounded-lg border-2 border-gray-200 bg-white px-6 py-4 font-bold text-gray-400 transition-colors duration-300 hover:border-black hover:text-black">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Review() {
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
                <div className="flex-shrink-0">
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
              <input type="checkbox" className="mt-1 h-4 w-4 flex-shrink-0" />
              <div className="text-sm text-gray-600">
                I agree to the{" "}
                <span className="cursor-pointer font-medium text-black underline">
                  Membership Terms and conditions
                </span>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex gap-3">
              <input type="checkbox" className="mt-1 h-4 w-4 flex-shrink-0" />
              <div className="text-sm text-gray-600">
                I agree that my membership will renew automatically and I will
                be charged the monthly dues of $260.00 (excluding taxes) every
                month on the 23rd day of the month beginning March 2026 until I
                cancel, price subject to change
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex gap-3">
              <input type="checkbox" className="mt-1 h-4 w-4 flex-shrink-0" />
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
function JoinToday() {
  return (
    <div className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:py-6">
        <div className="flex flex-col lg:flex-row lg:gap-8">
          {/* Left column - Fixed on desktop only */}
          <div className="w-full lg:sticky lg:top-6 lg:w-1/2 lg:self-start">
            <div className="relative h-[400px] w-full overflow-hidden rounded-lg sm:h-[500px] lg:h-[calc(100vh-3rem)]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')",
                }}
              >
                <div className="absolute inset-0 bg-black/40" />

                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white">
                  <h1 className="mb-4 text-4xl font-bold md:text-5xl">
                    Vélo Fitness Discount
                  </h1>
                  <p className="mb-6 max-w-md text-lg">
                    Join now and receive a complementary suite of services.
                  </p>
                  <ul className="space-y-2 text-left">
                    <li className="flex items-start">
                      <span className="mr-2 text-xl">•</span>
                      <span>1 Vélo Assessment</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-xl">•</span>
                      <span>2 Personal Training r 2 Pilate Sessions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Always scrollable */}
          <div className="w-full lg:w-1/2">
            <div className="space-y-6 py-6 lg:py-0 lg:pl-4">
              <div>
                <div className="flex w-full">
                  <button className="group relative flex-1 px-2 py-4 transition-colors hover:bg-gray-50">
                    <span className="absolute top-1 left-1 text-xs text-gray-400">
                      01
                    </span>
                    <span className="block font-medium">Select Club</span>
                  </button>

                  <div className="my-2 w-px bg-gray-300"></div>

                  <button className="group relative flex-1 px-2 py-4 transition-colors hover:bg-gray-50">
                    <span className="absolute top-1 left-1 text-xs text-gray-400">
                      02
                    </span>
                    <span className="block font-medium">Choose Membership</span>
                  </button>

                  <div className="my-2 w-px bg-gray-300"></div>

                  <button className="group relative flex-1 px-2 py-4 transition-colors hover:bg-gray-50">
                    <span className="absolute top-1 left-1 text-xs text-gray-400">
                      03
                    </span>
                    <span className="block font-medium">Review and Pay</span>
                  </button>
                </div>

                <div className="h-px w-full bg-gray-300"></div>
              </div>

              <Review />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinToday;
