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

function JoinToday() {
  return (
    <div className="h-screen w-full overflow-hidden bg-white">
      <div className="mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8 lg:py-6">
        <div className="flex h-full flex-col lg:flex-row lg:gap-8">
          {/* Left column - Fixed image column */}
          <div className="lg:w-1/2">
            <div className="h-full lg:sticky lg:top-6 lg:flex lg:h-[calc(100vh-3rem)] lg:items-center">
              <div
                className="relative w-full overflow-hidden rounded-lg"
                style={{ height: "min(100%, calc(100vh - 3rem))" }}
              >
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
          </div>

          {/* Right column - Scrollable content */}
          <div className="mt-6 lg:mt-0 lg:w-1/2 lg:overflow-y-auto">
            <div className="space-y-6 lg:pr-4">
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

              <ChooseMembership />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default JoinToday;
