export default function ChooseMembership() {
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
    <div className="space-y-6 sm:space-y-8">
      <div>
        <div>
          <h2 className="mb-6 text-lg leading-tight font-bold sm:mb-8 sm:text-xl md:text-2xl lg:text-3xl">
            Unlimited classes, guest passes, complimentary fitness assessments,
            and so much more.
          </h2>

          <div className="space-y-3 sm:space-y-4">
            {membershipData.map((item, index) => (
              <div
                key={index}
                className="w-full cursor-pointer rounded-lg border border-gray-200 transition-colors hover:border-black"
              >
                <div className="flex items-center gap-3 p-3 sm:gap-4 sm:p-4">
                  <div className="shrink-0">
                    <div className="h-14 w-20 overflow-hidden rounded-md sm:h-16 sm:w-24">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col justify-center">
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
              </div>
            ))}
          </div>

          <div className="mt-6 sm:mt-8">
            <button className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-400 transition-colors duration-300 hover:border-black hover:text-black sm:px-6 sm:py-4 sm:text-base">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
