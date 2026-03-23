import { useNavigate } from "react-router";
import { LoaderCircle } from "lucide-react";
import useFindClub from "../../hooks/useFindClub";
import { Gym, Description } from "../../types/club.interface";

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
}: {
  data: Gym[] | Description[] | string;
  hoverBG: string;
}) {
  const navigate = useNavigate();

  function determinePathRedirection(country: string): string {
    const lowercaseCountry = country.toLowerCase();

    if (lowercaseCountry == "usa") return "USA";
    else if (lowercaseCountry == "south africa") return "SouthAfrica";
    return "Canada";
  }

  function handleClick(name: string) {
    navigate(determinePathRedirection(name));
  }
  return (
    <>
      {typeof data !== "string" &&
        data?.map((content) => {
          const isGym = "name" in content;
          const isDescription = "country" in content;

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

          const country = content.country;

          return (
            <button
              type="button"
              className={`flex w-full gap-6 px-6 py-8 hover:${hoverBG}`}
              key={key}
              onClick={() => handleClick(country)}
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
}: {
  location: string;
  mainBG: string;
  hoverBG: string;
}) {
  const { loading, data, error } = useFindClub(location);
  return (
    <div className={`absolute mt-1 max-h-80 w-full rounded-xl ${mainBG}`}>
      {loading && <Loading />}
      {data && <Data data={data} hoverBG={hoverBG} />}
      {error && <Error />}
    </div>
  );
}
