import { useState, ChangeEvent, useMemo } from "react";
import { useNavigate } from "react-router";
import { Search, ArrowRight } from "lucide-react";
import debounce from "../../utils/debounce";
import Results from "../../components/shared/Result";

export default function Header({
  heading,
  extraHeading,
  showViewAll,
}: {
  heading: string;
  extraHeading: string;
  showViewAll: boolean;
}) {
  const [inputValue, setInputValue] = useState<string>("");

  const navigate = useNavigate();

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
  function onClick() {
    navigate("/clubs");
  }
  return (
    <header className="flex justify-center bg-black pb-22 text-white">
      <div className="flex w-[90%] flex-col justify-center">
        <h1 className="mb-12 flex items-center pt-22 text-4xl font-semibold uppercase lg:text-[4rem]">
          {heading}
          <br aria-hidden="true" className="hidden lg:block" />
          {extraHeading}
        </h1>
        {showViewAll && (
          <button
            type="button"
            onClick={onClick}
            className="mb-8 flex items-center gap-2 text-sm text-white"
          >
            View all <ArrowRight aria-hidden="true" />
          </button>
        )}
        <div className="relative">
          <Search
            aria-hidden="true"
            className="text-6 absolute top-1/2 ml-4 -translate-y-1/2 text-white/30"
          />
          <input
            type="text"
            className="flex h-16 w-full min-w-9 items-center rounded-full border-2 border-solid border-white/50 px-14 text-base text-white lg:text-lg"
            placeholder="City, ZIP Code, or Postal Code"
            onChange={handleChange}
          />
          {inputValue.trim().length > 0 && <Results location={inputValue} />}
        </div>
      </div>
    </header>
  );
}
