import { useEffect, useState } from "react";
import { acquireLocalGyms } from "../data/constants/gymlocation";
import { Gym, Description } from "../types/club.interface";

export default function useFindClub(location: string) {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Gym[] | Description[] | string | null>(null);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchLocalClub = async () => {
      setLoading(true);
      setData(null);
      try {
        const result = await acquireLocalGyms(location);
        setData(result);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else if (typeof error === "string") {
          setError(error);
        }
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchLocalClub();
  }, [location]);

  return { loading, data, error };
}
