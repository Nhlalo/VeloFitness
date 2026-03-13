import { useState, ChangeEvent, useMemo } from "react";
import { Search } from "lucide-react";
import debounce from "../../utils/debounce";
import Results from "./Result";

export default function Header({
  heading,
  extraHeading,
}: {
  heading: string;
  extraHeading: string;
}) {
  const [inputValue, setInputValue] = useState<string>("");

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
  return (
    <header className="flex justify-center bg-black pb-22 text-white">
      <div className="flex w-[90%] flex-col justify-center">
        <h1 className="mb-12 flex items-center pt-22 text-4xl font-semibold uppercase lg:text-[4rem]">
          {heading}
          <br aria-hidden="true" className="hidden lg:block" />
          {extraHeading}
        </h1>
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
