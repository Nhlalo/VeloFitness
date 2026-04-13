import { useLocation } from "react-router";
import { LoaderCircle } from "lucide-react";
import useFindClub from "../../hooks/useFindClub";
import useNavigateClubPage from "../../hooks/useNavigateClubPage";
import { Gym, Description } from "../../types/club.interface";
import { ClubDataContext } from "../../pages/jointoday/ClubOptions";
import { useContext } from "react";

interface ResultsProps {
  location: string;
  mainBG: string;
  hoverBG: string;
  adjustClubData?: (data: Gym[]) => void;
}

function Error() {
  return (
    <p className="flex items-center justify-center py-8">
      An unexpected error occurred. Please refresh the page and try again. If
      the problem persists, contact support.
    </p>
  );
}

function Loading() {
  return (
    <div className="flex items-center justify-center py-8">
      <LoaderCircle className="animate-spin" aria-hidden="true" />
    </div>
  );
}

function Data({
  data,
  hoverBG,
  adjustClubData,
}: {
  data: Gym[] | Description[] | string;
  hoverBG: string;
  adjustClubData?: (data: Gym[]) => void;
}) {
  const { setSelectedClubs, setIsClubClicked } = useContext(ClubDataContext);
  const location = useLocation();

  //checks if the params contain jointoday
  const pathname = location.pathname.includes("jointoday");

  //Will navigate to a new page. The url of the new page will contain the updated country and encoded clubs data.
  const { handleClick } = useNavigateClubPage();

  return (
    <>
      {typeof data !== "string" &&
        data?.map((content) => {
          const isGym = "name" in content;
          const isDescription = "country" in content;
          const isClub = "clubs" in content;

          const displayName = isGym
            ? content.name
            : isDescription
              ? content.country
              : "";

          const key = isGym
            ? content.name
            : isDescription
              ? content.country
              : "unknown";

          const clubs = isClub ? content.clubs : [content];

          const country = content.country;

          return (
            <button
              type="button"
              className={`flex w-full gap-6 px-6 py-8 hover:${hoverBG}`}
              key={key}
              onClick={() =>
                pathname
                  ? (setSelectedClubs(clubs),
                    setIsClubClicked(true),
                    adjustClubData?.(clubs))
                  : handleClick(country.toLowerCase(), clubs)
              }
            >
              <div className="aspect-2/1 w-14" aria-hidden="true">
                <img
                  src={content.image}
                  alt="Gym Club"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex grow flex-col items-start">
                <span>{displayName}</span>
                <span>Club</span>
              </div>
            </button>
          );
        })}
      {typeof data == "string" && (
        <p className="flex items-center justify-center py-8">{data}</p>
      )}
    </>
  );
}

export default function Results({
  location,
  mainBG,
  hoverBG,
  adjustClubData,
}: ResultsProps) {
  const { loading, data, error } = useFindClub(location);
  return (
    <div className={`absolute mt-1 max-h-80 w-full rounded-xl ${mainBG}`}>
      {loading && <Loading />}
      {data && (
        <Data data={data} hoverBG={hoverBG} adjustClubData={adjustClubData} />
      )}
      {error && <Error />}
    </div>
  );
}
