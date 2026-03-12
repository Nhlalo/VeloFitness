import { LoaderCircle } from "lucide-react";
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
    <div>
      <LoaderCircle />
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
              className="flex w-full gap-6 bg-[#282828] px-6 py-8"
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
