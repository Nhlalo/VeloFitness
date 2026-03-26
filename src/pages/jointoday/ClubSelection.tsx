import { useContext } from "react";
import { X, Search } from "lucide-react";
import { ChosenClubContext } from "./PersonalInformation";
import useClubSearch from "../../hooks/useClubSearch";
import { Gym } from "../../types/club.interface";
import Results from "../../components/shared/Result";

export default function ClubSelection({
  isDisplay,
  onClose,
  returnToJoinTodayPage,
  clubsData,
}: {
  isDisplay: boolean;
  onClose: () => void;
  returnToJoinTodayPage: () => void;
  clubsData: Gym[] | [];
}) {
  const { setUserClub } = useContext(ChosenClubContext);

  const { handleChange, adjustClubData, inputValue, inputRef, clubs } =
    useClubSearch();

  // Use local clubs if on this page, otherwise use passed data(clubsData), coming from another page.
  const clubsToRender = clubs.length ? clubs : clubsData;

  function handleClick(clubName: string) {
    setUserClub(clubName);
    onClose();
    returnToJoinTodayPage();
  }

  return (
    <div
      className={`fixed top-0 right-0 z-30 h-full w-full transform bg-white shadow-xl transition-transform duration-300 ease-out ${
        isDisplay
          ? "pointer-events-auto translate-x-0"
          : "pointer-events-none translate-x-full"
      }`}
    >
      <div className="no-scrollbar flex h-full flex-col overflow-y-auto">
        <div className="flex-1">
          <div className="flex h-full items-start justify-center pt-12">
            <div className="w-full rounded-lg bg-white p-8">
              <div className="flex justify-end">
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="rounded-full p-1 transition-colors hover:bg-gray-100"
                >
                  <X size={20} className="text-black" aria-hidden="true" />
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
                  aria-hidden="true"
                />
                <input
                  type="text"
                  placeholder="City, Zip Code, Postal Code"
                  ref={inputRef}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-200 p-3 pl-10 placeholder-gray-400 transition-colors focus:border-black focus:outline-none"
                />
                {inputValue.trim().length > 0 && (
                  <Results
                    location={inputValue}
                    mainBG="bg-white"
                    hoverBG="bg-gray-100"
                    adjustClubData={adjustClubData}
                  />
                )}
              </div>

              <div className="mt-8 w-full">
                {clubsToRender?.map((club, index) => (
                  <div key={club.cellNumber}>
                    <div className="flex gap-6 py-6">
                      <div className="flex w-1/2 flex-col items-start">
                        <div className="text-lg font-bold">{club.name}</div>
                        <div className="mt-1 text-sm text-gray-500">
                          {club.address}
                        </div>
                        <button
                          onClick={() => handleClick(club.name)}
                          className="mt-4 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-50"
                        >
                          Select Club
                        </button>
                      </div>

                      <div className="w-1/2">
                        <img
                          src={club.image}
                          alt={`${club.name} gym`}
                          className="h-32 w-full rounded-lg object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
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
