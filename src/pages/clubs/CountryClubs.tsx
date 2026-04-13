import { Link, useParams, useSearchParams } from "react-router";
import { ArrowRight } from "lucide-react";
import useNavigateBasedOnLogin from "../../hooks/useNavigateBasedOnLogIn";
import { useAuth } from "../../context/authContext";
import { Gym } from "../../types/club.interface";
import Header from "./Header";
import Container from "../../components/shared/Container";

export default function CountryClub() {
  const [searchParams] = useSearchParams();

  const { handleClick } = useNavigateBasedOnLogin("/profile");

  const { isLoggedIn } = useAuth();
  //Need to decode as the param was encoded to reduce the url length
  const encodedData = searchParams.get("clubs") as string;

  const { country } = useParams() as { country: string };

  const gymClubs: Gym[] = JSON.parse(atob(encodedData));

  function determinePathRedirection(): string {
    const ifLoggedIn = isLoggedIn ? "/profile" : "jointoday";
    return ifLoggedIn;
  }

  return (
    <div className="bg-black text-white">
      <Header heading={`${country} Clubs`} extraHeading="" showViewAll={true} />
      <Container>
        <div className="pb-24">
          {gymClubs.map((content) => {
            const clubName = content.name;
            const linkDescription = `view the information about the ${country} clubs`;
            return (
              <Link
                to={determinePathRedirection()}
                aria-label={linkDescription}
                key={clubName || country}
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
                    onClick={handleClick}
                  >
                    View this club
                    <ArrowRight aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-6 hidden flex-1 flex-col items-center lg:flex">
                  <span className="mr-8 w-full text-sm">Featured Amenties</span>
                  <ul className="w-full list-disc">
                    {content.amenties.map((amenty, index) => {
                      return (
                        <li key={index} className="text-sm">
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
