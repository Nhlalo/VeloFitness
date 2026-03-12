import { Search } from "lucide-react";
import { acquireNumberGyms } from "../../data/constants/gymlocation";
import { gymDescription } from "../../data/constants/gymlocation";

function Header() {
  return (
    <header className="flex justify-center bg-black pb-22 text-white">
      <div className="flex w-[90%] flex-col justify-center">
        <h1 className="mb-6 flex items-center pt-22 text-4xl font-semibold uppercase lg:text-[4rem]">
          {acquireNumberGyms()} Clubs Worldwide:{" "}
          <br aria-hidden="true" className="hidden lg:block" /> Find A Club Near
          You
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
          />
        </div>
      </div>
    </header>
  );
}
export default function Clubs() {
  return (
    <>
      <Header />
    </>
  );
}
