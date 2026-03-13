import { Link, useNavigate, useParams } from "react-router";
import { ArrowRight } from "lucide-react";
import { SAGyms, canadaGyms, USAGyms } from "../../data/constants/gymlocation";
import { Gym } from "../../types/club.interface";
import Header from "./Header";
import Container from "../../components/shared/Container";
import { useRef } from "react";

export default function CountryClub() {
  const { country } = useParams() as { country: string };

  // Calculate the value first
  const Gym = (() => {
    if (country.toLowerCase() === "usa") {
      return USAGyms;
    }
    if (country.toLowerCase() === "south africa") {
      return SAGyms;
    }
    return canadaGyms;
  })();

  const gymClubsRef = useRef<Gym[]>(Gym);

  const navigate = useNavigate();

  function determinePathRedirection(club: string): string {
    return `/clubs/${country}/${club}`;
  }

  function handleClick(club: string) {
    navigate(determinePathRedirection(club));
  }
  return (
    <div className="bg-black text-white">
      <Header heading={`${country} Clubs`} extraHeading="" showViewAll={true} />
      <Container>
        <div className="pb-24">
          {gymClubsRef.current.map((content) => {
            const clubName = content.name;
            const linkDescription = `view the information about the ${country} clubs`;
            return (
              <Link
                to={determinePathRedirection(clubName)}
                aria-label={linkDescription}
                key={country}
                className="flex border-t border-solid border-white px-6 py-8 text-white hover:bg-white hover:text-black"
              >
                <div className="flex grow-2 flex-col lg:flex-1">
                  <span className="w-full text-xl lg:text-2xl">{clubName}</span>
                  <span className="pt-4 pr-6 text-sm">{content.address}</span>
                  <span className="pt-4 pr-6 text-sm">
                    {content.neighborhood}
                  </span>
                  <span className="pt-4 pr-6 text-sm">
                    {content.cellNumber}
                  </span>
                  <button
                    type="button"
                    className="flex items-center self-start pt-4 text-sm font-semibold"
                    onClick={() => handleClick(clubName)}
                  >
                    View this club
                    <ArrowRight aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-6 hidden flex-1 flex-col items-center lg:flex">
                  <span className="mr-8 w-full text-sm">Featured Amenties</span>
                  <ul className="w-full list-disc">
                    {content.amenties.map((amenty) => {
                      return (
                        <li key={content.cellNumber} className="text-sm">
                          {amenty}
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
    </div>
  );
}
