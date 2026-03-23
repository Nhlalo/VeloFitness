import { X, Search } from "lucide-react";

export default function ClubSelection({
  isDisplay,
  onClose,
}: {
  isDisplay: boolean;
  onClose: () => void;
}) {
  const clubsData = [
    {
      street: "123 Fitness Avenue",
      address: "123 Fitness Avenue, New York, NY 10001, United States",
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      street: "456 Wellness Boulevard",
      address: "456 Wellness Boulevard, Los Angeles, CA 90001, United States",
      image:
        "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      street: "789 Health Drive",
      address: "789 Health Drive, Chicago, IL 60601, United States",
      image:
        "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div
      className={`absolute top-0 right-0 h-full transition-all duration-300 ease-out ${
        isDisplay
          ? "pointer-events-auto translate-x-0 opacity-100"
          : "pointer-events-none translate-x-full opacity-0"
      }`}
    >
      {/* Overlay behind panel but within right column area */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          isDisplay ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Slide panel */}
      <div
        className={`relative h-full w-full transform overflow-y-auto bg-white shadow-xl transition-transform duration-300 ease-out ${
          isDisplay ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="relative h-full w-full">
          <div className="flex h-full items-start justify-center pt-12">
            <div className="w-full max-w-4xl rounded-lg bg-white p-8">
              {/* Close button - top right */}
              <div className="flex justify-end">
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="rounded-full p-1 transition-colors hover:bg-gray-100"
                >
                  <X size={20} className="text-black" aria-hidden="true" />
                </button>
              </div>

              {/* Heading */}
              <h1 className="mt-2 text-3xl font-bold tracking-wide uppercase">
                114 CLUBS WORLDWIDE
              </h1>

              {/* Paragraph */}
              <p className="mt-3 text-gray-500">
                Choose your ideal home base. If you're torn between a few, a
                membership advisor can help find a perfect fit.
              </p>

              {/* Search input with icon - full width */}
              <div className="relative mt-6 w-full">
                <Search
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                  size={18}
                  aria-hidden="true"
                />
                <input
                  type="text"
                  placeholder="City, Zip Code, Postal Code"
                  className="w-full rounded-md border border-gray-200 p-3 pl-10 placeholder-gray-400 transition-colors focus:border-black focus:outline-none"
                />
              </div>

              {/* Clubs rows container */}
              <div className="mt-8 w-full">
                {clubsData.map((club, index) => (
                  <div key={index}>
                    {/* Row with two columns */}
                    <div className="flex gap-6 py-6">
                      {/* Left column - Club info */}
                      <div className="flex w-1/2 flex-col items-start">
                        <div className="text-lg font-bold">{club.street}</div>
                        <div className="mt-1 text-sm text-gray-500">
                          {club.address}
                        </div>
                        <button className="mt-4 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-50">
                          Select Club
                        </button>
                      </div>

                      {/* Right column - Image */}
                      <div className="w-1/2">
                        <img
                          src={club.image}
                          alt={club.street}
                          className="h-32 w-full rounded-lg object-cover"
                        />
                      </div>
                    </div>

                    {/* Divider (except after last item) */}
                    {index < clubsData.length - 1 && (
                      <div className="h-px w-full bg-gray-200"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
