import { LoaderCircle } from "lucide-react";
import useFindClub from "../../hooks/useFindClub";
import { Gym, Description } from "../../types/club.interface";

function Error() {
  return (
    <div>
      <p>
        An unexpected error occurred. Please refresh the page and try again. If
        the problem persists, contact support.
      </p>
    </div>
  );
}
function Loading() {
  return (
    <div className="flex items-center justify-center py-8">
      <LoaderCircle className="animate-spin" aria-hidden="true" />
    </div>
  );
}

function Data({ data }: { data: Gym[] | Description[] | string }) {
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

          return (
            <button
              type="button"
              className="flex w-full gap-6 px-6 py-8 hover:bg-[#282828]"
              key={key}
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
        <div>
          <p>{data}</p>
        </div>
      )}
    </>
  );
}
