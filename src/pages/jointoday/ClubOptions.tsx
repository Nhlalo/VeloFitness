import { useState, useMemo, ChangeEvent, useRef } from "react";
import { X, Search } from "lucide-react";
import { Gym } from "../../types/club.interface";
import { gymDescription } from "../../data/constants/gymlocation";
import debounce from "../../utils/debounce";
import Results from "../../components/shared/Result";
import ClubSelection from "./ClubSelection";

export default function ClubOptions({
  isDisplay,
  onClose,
}: {
  isDisplay: boolean;
  onClose: () => void;
}) {
  const [inputValue, setInputValue] = useState<string>("");
  const [isClubClicked, setIsClubClicked] = useState<boolean>(false);

  const [clubs, setClubs] = useState<Gym[] | []>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const debouncedSetInput = useMemo(
    () =>
      debounce((value: string) => {
        setInputValue(value);
      }, 300),
    [],
  );

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    debouncedSetInput(value);
  }

  function handleClick(data: Gym[]) {
    setIsClubClicked(true);
    setClubs(data);
  }

  function handleClose() {
    setIsClubClicked(false);
  }

  //This will be passed to the Result component so that when the result of the input search is pressed it can affect this component by causing rerendering.
  function adjustClubData(data: Gym[]) {
    setIsClubClicked(true);
    setClubs(data);
    setInputValue("");

    //Clear the input search after button click
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div
      className={`fixed top-0 right-0 z-20 h-full w-1/2 transform bg-white shadow-xl transition-transform duration-300 ease-out ${
        isDisplay
          ? "pointer-events-auto translate-x-0"
          : "pointer-events-none translate-x-full"
      }`}
      aria-atomic="true"
      aria-live="polite"
      aria-hidden={!isDisplay}
    >
      <div className="no-scrollbar flex h-full flex-col overflow-y-auto">
        <div className="flex-1">
          <div className="flex h-full items-start justify-center pt-12">
            <div className="w-full rounded-lg bg-white p-8">
              <div className="flex justify-end">
                <button
                  aria-label="Go back"
                  onClick={onClose}
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
                  onChange={handleChange}
                  ref={inputRef}
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

              {/* Rows container - full width */}
              <div className="mt-6 w-full divide-y divide-gray-200">
                {gymDescription.map((content) => {
                  const country = content.country;

                  return (
                    <button
                      type="button"
                      className="w-full py-4 text-left transition-colors first:pt-0 last:pb-0 hover:bg-gray-50"
                      onClick={() => handleClick(content.clubs)}
                      key={country}
                    >
                      <div className="flex w-full items-center justify-between">
                        <div className="font-medium">{country}</div>
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
      </div>
      <ClubSelection
        isDisplay={isClubClicked}
        onClose={handleClose}
        clubsData={clubs}
      />
    </div>
  );
}
