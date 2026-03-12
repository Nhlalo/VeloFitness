import { useEffect, useState } from "react";
import { acquireLocalGyms } from "../../data/constants/gymlocation";
import { Gym, Description } from "../../types/club.interface";

export default function useFindClub(location: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Gym[] | Description[] | string | boolean>(
    false,
  );
  const [error, SetError] = useState<boolean>(false);

  useEffect(() => {
    const fetchLocalClub = async () => {
      setLoading(true);
      try {
        const result = await acquireLocalGyms(location);
        setData(result);
      } catch (error) {
        SetError(true);
        setData(false);
      } finally {
        setLoading(false);
      }
    };
    fetchLocalClub();
  }, [location]);

  return { loading, data, error };
}
