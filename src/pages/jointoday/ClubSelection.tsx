import { useContext, useEffect } from "react";
import { X, Search } from "lucide-react";
import useClubSearch from "../../hooks/useClubSearch";
import { Gym } from "../../types/club.interface";
import Results from "../../components/shared/Result";
import { ClubDataContext } from "./ClubOptions";

interface ClubSelectionProps {
  isDisplay: boolean;
  onClose: () => void;
  returnToJoinTodayPage: () => void;
  clubsData: Gym[] | [];
  onSelectClub?: (clubName: string) => void;
}

export default function ClubSelection({
  isDisplay,
  onClose,
  returnToJoinTodayPage,
  clubsData,
  onSelectClub,
}: ClubSelectionProps) {
  const { selectedClubs } = useContext(ClubDataContext);

  const {
    handleChange,
    adjustClubData,
    inputValue,
    inputRef,

    setClubs,
  } = useClubSearch();

  // Reset clubs when component mounts with new data
  useEffect(() => {
    if (isDisplay && clubsData && clubsData.length > 0) {
      setClubs(clubsData);
    }
  }, [isDisplay, clubsData, setClubs]);

  // Use local clubs if available, otherwise use passed data
  const clubsToRender = selectedClubs.length > 0 ? selectedClubs : clubsData;

  const handleSelectClub = (clubName: string) => {
    if (onSelectClub) {
      onSelectClub(clubName);
    }
    onClose();
    returnToJoinTodayPage();
  };

  const handleBack = () => {
    onClose();
  };

  if (!isDisplay) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-white transition-transform duration-300 ease-out ${
        isDisplay ? "visible translate-x-0" : "invisible translate-x-full"
      }`}
      role="dialog"
      aria-modal="true"
    >
      <div className="no-scrollbar flex h-full flex-col overflow-y-auto">
        <div className="flex-1">
          <div className="flex h-full items-start justify-center px-4 py-8 sm:px-6 sm:py-10 md:py-12 lg:px-8">
            <div className="w-full rounded-lg bg-white">
              <div className="flex items-center justify-between">
                <button
                  onClick={handleBack}
                  aria-label="Go back"
                  className="rounded-full p-1 transition-colors hover:bg-gray-100"
                >
                  <svg
                    aria-hidden="true"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    onClose();
                    returnToJoinTodayPage();
                  }}
                  aria-label="Close"
                  className="rounded-full p-1 transition-colors hover:bg-gray-100"
                >
                  <X size={20} className="text-black" aria-hidden="true" />
                </button>
              </div>

              <h1 className="mt-4 text-2xl font-bold tracking-wide uppercase sm:text-3xl md:text-3xl lg:text-4xl">
                SELECT YOUR CLUB
              </h1>

              <p className="mt-2 text-sm text-gray-500 sm:mt-3 sm:text-base">
                Choose your preferred location
              </p>

              {/* Search Input */}
              <div className="relative mt-4 w-full sm:mt-6">
                <div className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2">
                  <Search
                    size={18}
                    className="text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Search by city or zip code"
                  onChange={handleChange}
                  ref={inputRef}
                  className="w-full rounded-md border border-gray-200 py-2 pr-3 pl-10 text-sm placeholder-gray-400 transition-colors focus:border-black focus:outline-none sm:py-3 sm:text-base"
                />
                {inputValue && inputValue.trim().length > 0 && (
                  <Results
                    location={inputValue}
                    mainBG="bg-white"
                    hoverBG="bg-gray-100"
                    adjustClubData={adjustClubData}
                  />
                )}
              </div>

              <div className="mt-6 w-full divide-y divide-gray-200">
                {clubsToRender && clubsToRender.length > 0 ? (
                  clubsToRender.map((club, index) => (
                    <div
                      key={club.cellNumber || index}
                      className="py-6 first:pt-0"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                        <div className="flex flex-1 flex-col items-start">
                          <div className="text-lg font-bold">{club.name}</div>
                          <div className="mt-1 text-sm text-gray-500">
                            {club.address}
                          </div>
                          <button
                            onClick={() => handleSelectClub(club.name)}
                            className="mt-4 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-50"
                          >
                            Select Club
                          </button>
                        </div>

                        <div className="sm:w-1/3">
                          {club.image && (
                            <img
                              src={club.image}
                              alt={`${club.name} gym`}
                              className="h-32 w-full rounded-lg object-cover"
                              loading="lazy"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center text-gray-500">
                    No clubs found. Try searching for a different location.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
