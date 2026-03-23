import { X, Search } from "lucide-react";
import { gymDescription } from "../../data/constants/gymlocation";

export default function ClubSelection() {
  return (
    <div className="h-full w-full">
      <div className="flex h-full items-start justify-center pt-12">
        <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-xl">
          <div className="flex justify-end">
            <button className="rounded-full p-1 transition-colors hover:bg-gray-100">
              <X size={20} className="text-black" />
            </button>
          </div>

          <h1 className="mt-2 text-3xl font-bold tracking-wide uppercase">
            114 CLUBS WORLDWIDE
          </h1>

          <p className="mt-3 text-gray-500">
            Choose your ideal home base. If you're torn between a few, a
            membership advisor can help find a perfect fit.
          </p>

          <div className="relative mt-6 w-full">
            <Search
              className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="City, Zip Code, Postal Code"
              className="w-full rounded-md border border-gray-200 p-3 pl-10 placeholder-gray-400 transition-colors focus:border-black focus:outline-none"
            />
          </div>

          {/* Rows container - full width */}
          <div className="mt-6 w-full divide-y divide-gray-200">
            {gymDescription.map((content) => {
              return (
                <button
                  type="button"
                  className="w-full py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex w-full items-center justify-between">
                    <div className="font-medium">{content.country}</div>
                    <div className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-50">
                      View all clubs
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
