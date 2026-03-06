import { useMatches } from "react-router";

interface RouteColors {
  default: {
    bg: string;
    color: string;
    logoBG: string;
    btnBG: string;
  };
  scrolled: {
    bg: string;
    color: string;
    logoBG: string;
    btnBG: string;
  };
}

interface RouteHandle {
  colors?: RouteColors;
  title?: string;
  description?: string;
}

//Track the handle property of the web page the use is in. This will aid in making the header design depend on the web page.
export default function useRouteHandle() {
  const matches = useMatches();

  // Type assertion for the current match
  const currentMatch = matches[matches.length - 1] as
    | {
        handle?: RouteHandle;
      }
    | undefined;

  const colors = currentMatch?.handle?.colors;

  return colors;
}
