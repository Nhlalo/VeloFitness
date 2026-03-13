import { Link, useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";
import { gymDescription } from "../../data/constants/gymlocation";
import { acquireNumberGyms } from "../../utils/acquireGymData";
import Header from "./Header";
import Container from "../../components/shared/Container";

function GymLocations() {
  const navigate = useNavigate();

  function determinePathRedirection(country: string): string {
    const lowercaseCountry = country.toLowerCase();

    if (lowercaseCountry == "usa") return "/clubs/USA";
    else if (lowercaseCountry == "south africa") return "/clubs/South Africa";
    return "/clubs/Canada";
  }

  function handleClick(name: string) {
    navigate(determinePathRedirection(name));
  }
  return (
    <Container>
      <div className="pb-24">
        {gymDescription.map((content) => {
          const country = content.country;
          const linkDescription = `view the information about the ${country} clubs`;
          return (
            <Link
              to={determinePathRedirection(country)}
              aria-label={linkDescription}
              key={country}
              className="flex border-t border-solid border-white px-6 py-8 text-white hover:bg-white hover:text-black"
            >
              <div className="flex grow-2 flex-col items-center lg:flex-1">
                <span className="w-full text-xl lg:text-2xl">{country}</span>
                <p className="pt-4 pr-6 text-sm">{content.description}</p>
                <button
                  type="button"
                  className="flex items-center self-start pt-4 text-sm font-semibold"
                  onClick={() => handleClick(country)}
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
      <Header
        heading={`${acquireNumberGyms()} Clubs Worldwide:`}
        extraHeading="Find A Club Near
          You"
      />
      <main className="bg-black">
        <GymLocations />
      </main>
    </>
  );
}
