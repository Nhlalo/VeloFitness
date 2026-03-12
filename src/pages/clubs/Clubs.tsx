import { Link } from "react-router";
import { Search, ArrowRight } from "lucide-react";
import { acquireNumberGyms } from "../../data/constants/gymlocation";
import { gymDescription } from "../../data/constants/gymlocation";
import Container from "../../components/shared/Container";

function Header() {
  return (
    <header className="flex justify-center bg-black pb-22 text-white">
      <div className="flex w-[90%] flex-col justify-center">
        <h1 className="mb-12 flex items-center pt-22 text-4xl font-semibold uppercase lg:text-[4rem]">
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
function GymLocations() {
  return (
    <Container>
      <div className="pb-24">
        {gymDescription.map((content) => {
          const linkDescription = `view the information about the ${content.location} clubs`;
          return (
            <Link
              to=""
              aria-label={linkDescription}
              key={content.location}
              className="flex border-t border-solid border-white px-6 py-8 text-white hover:bg-white hover:text-black"
            >
              <div className="flex grow-2 flex-col items-center lg:flex-1">
                <span className="w-full text-xl lg:text-2xl">
                  {content.location}
                </span>
                <p className="pt-4 pr-6 text-sm">{content.description}</p>
                <button
                  type="button"
                  className="flex items-center self-start pt-4 text-sm font-semibold"
                >
                  View all {content.clubs.length} clubs{" "}
                  <ArrowRight aria-hidden="true" />
                </button>
              </div>
              <div className="hidden flex-1 flex-col items-center lg:flex">
                <span className="mr-24 text-sm">Featured Clubs</span>
                <ul className="list-disc">
                  {content.clubs.map((clubs) => {
                    return (
                      <li key={clubs.name} className="text-sm">
                        {clubs.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="hidden aspect-3/2 grow flex-col items-center md:flex lg:flex-1">
                <img
                  src={content.image}
                  alt="Gym club"
                  className="h-full w-full object-cover"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </Container>
  );
}

export default function Clubs() {
  return (
    <>
      <Header />
      <main className="bg-black">
        <GymLocations />
      </main>
    </>
  );
}
