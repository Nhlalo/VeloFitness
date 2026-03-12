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
