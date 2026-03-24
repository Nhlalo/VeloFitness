import { useNavigate } from "react-router";
import { Gym, Description } from "../types/club.interface";

export default function useNavigateClubPage() {
  const navigate = useNavigate();

  function determinePathRedirection(
    country: string,
    clubs: (Gym | Description)[],
  ): string {
    // Encoded this way as the data contained is not sensitive
    const encoded = btoa(JSON.stringify(clubs));

    return `/clubs/${country}?clubs=${encoded}`;
  }

  function handleClick(country: string, clubs: Gym[]) {
    navigate(determinePathRedirection(country, clubs));
  }
  return { determinePathRedirection, handleClick };
}
