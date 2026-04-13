import { useState, useMemo, createContext } from "react";
import { X, Search } from "lucide-react";
import useClubSearch from "../../hooks/useClubSearch";
import { Gym } from "../../types/club.interface";
import { gymDescription } from "../../data/constants/gymlocation";
import Results from "../../components/shared/Result";
import ClubSelection from "./ClubSelection";

interface ClubOptionsProps {
  isDisplay: boolean;
  onClose: () => void;
  onSelectClub?: (clubName: string) => void; // Add this prop for parent communication
}
interface ClubDataMemo {
  selectedClubs: Gym[];
  setSelectedClubs: React.Dispatch<React.SetStateAction<Gym[]>>;
  setIsClubClicked: React.Dispatch<React.SetStateAction<boolean>>;
}
const ClubDataContext = createContext<ClubDataMemo>({
  selectedClubs: [],
  setSelectedClubs: () => {},
  setIsClubClicked: () => {},
});

export default function ClubOptions({
  isDisplay,
  onClose,
  onSelectClub,
}: ClubOptionsProps) {
  const [isClubClicked, setIsClubClicked] = useState<boolean>(false);
  const [selectedClubs, setSelectedClubs] = useState<Gym[]>([]);

  const { handleChange, adjustClubData, inputValue, setClubs, inputRef } =
    useClubSearch(setIsClubClicked);

  const contextValue = useMemo(
    () => ({
      selectedClubs,
      setSelectedClubs,
      setIsClubClicked,
    }),
    [selectedClubs],
  );

  const handleCountryClick = (clubsData: Gym[]) => {
    setIsClubClicked(true);
    setSelectedClubs(clubsData);
    setClubs(clubsData); // Set clubs for search results
  };

  const handleCloseClubSelection = () => {
    setIsClubClicked(false);
    setSelectedClubs([]);
  };

  const handleFinalClubSelect = (clubName: string) => {
    if (onSelectClub) {
      onSelectClub(clubName);
    }
    onClose(); // Close the entire club options modal
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-30 bg-black/50 transition-opacity duration-300 ${
          isDisplay
            ? "pointer-events-auto visible opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
        onClick={() => {
          onClose();
          handleCloseClubSelection();
        }}
      />
      <ClubDataContext.Provider value={contextValue}>
        <div
          className={`fixed right-0 bottom-0 z-40 h-full w-full transform bg-white shadow-xl transition-transform duration-300 ease-out sm:w-3/4 md:w-2/3 lg:w-1/2 ${
            isDisplay
              ? "pointer-events-auto visible translate-x-0"
              : "pointer-events-none invisible translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
        >
          <div className="no-scrollbar flex h-full flex-col overflow-y-auto">
            <div className="flex-1">
              <div className="flex h-full items-start justify-center px-4 py-8 sm:px-6 sm:py-10 md:py-12 lg:px-8">
                <div className="w-full rounded-lg bg-white">
                  <div className="flex justify-end">
                    <button
                      aria-label="Close"
                      onClick={() => {
                        onClose();
                        handleCloseClubSelection();
                      }}
                      className="rounded-full p-1 transition-colors hover:bg-gray-100"
                    >
                      <X size={20} className="text-black" aria-hidden="true" />
                    </button>
                  </div>

                  <h1 className="mt-2 text-2xl font-bold tracking-wide uppercase sm:text-3xl md:text-3xl lg:text-4xl">
                    114 CLUBS WORLDWIDE
                  </h1>

                  <p className="mt-2 text-sm text-gray-500 sm:mt-3 sm:text-base">
                    Choose your ideal home base. If you're torn between a few, a
                    membership advisor can help find a perfect fit.
                  </p>

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
                      placeholder="City, Zip Code, Postal Code"
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

                  <div className="mt-4 w-full divide-y divide-gray-200 sm:mt-6">
                    {gymDescription.map((content) => {
                      const country = content.country;
                      return (
                        <button
                          type="button"
                          className="w-full py-3 text-left transition-colors first:pt-0 last:pb-0 hover:bg-gray-50 sm:py-4"
                          onClick={() => handleCountryClick(content.clubs)}
                          key={country}
                        >
                          <div className="flex w-full flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
                            <div className="text-sm font-medium sm:text-base">
                              {country}
                            </div>
                            <div className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-black transition-colors hover:bg-gray-50 sm:px-4 sm:py-2 sm:text-sm">
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
          </div>

          <ClubSelection
            isDisplay={isClubClicked}
            onClose={handleCloseClubSelection}
            returnToJoinTodayPage={() => {
              // Don't close everything, just go back to country list
              handleCloseClubSelection();
            }}
            clubsData={selectedClubs}
            onSelectClub={handleFinalClubSelect}
          />
        </div>
      </ClubDataContext.Provider>
    </>
  );
}

export { ClubDataContext };
