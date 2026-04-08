import {
  gymDescription,
  USAGyms,
  SAGyms,
  canadaGyms,
} from "../data/constants/gymlocation";
import { Description, Gym } from "../types/club.interface";

function acquireLocalGyms(
  location: string,
): Promise<Description[] | Gym[] | string> {
  const gyms: Gym[] = [...USAGyms, ...SAGyms, ...canadaGyms];

  return new Promise((resolve, reject) => {
    if (typeof location !== "string") {
      reject("Incorrect Datatype - location must be a string");
      return; // Stop execution immediately
    }

    // This setTimeout will ONLY run if validation passes
    setTimeout(() => {
      try {
        const locationLowerCase = location.toLowerCase().trim();

        // Find match in gymDescription
        const match = gymDescription.filter((gym) =>
          gym.country.toLowerCase().includes(locationLowerCase),
        );

        if (match.length) {
          resolve(match);
          return;
        }

        // Find match according to matching zip, postal or name
        const result = gyms.filter(
          (gym) =>
            gym.name.toLowerCase().includes(locationLowerCase) ||
            gym.zip?.toLowerCase().includes(locationLowerCase) ||
            gym.postal?.toLowerCase().includes(locationLowerCase) ||
            gym.neighborhood.toLowerCase().includes(locationLowerCase) ||
            gym.city?.toLowerCase().includes(locationLowerCase) ||
            gym.state?.toLowerCase().includes(locationLowerCase),
        );

        resolve(
          result.length
            ? result
            : "There are no gym facilities in the immediate vicinity.",
        );
      } catch (error) {
        reject(error);
      }
    }, 1000); // Added to display the loading state, mimic real api calls
  });
}

function acquireNumberGyms(): number {
  const numberOfClubs = gymDescription.reduce((acc, content) => {
    acc += content.clubs.length;
    return acc;
  }, 0);
  return numberOfClubs;
}

function acquireNewGym(location: string) {
  const locationLowerCase = location.toLowerCase().trim();
  const gyms: Gym[] = [...USAGyms, ...SAGyms, ...canadaGyms];

  // Find match according to matching zip, postal or name
  const result = gyms.filter(
    (gym) =>
      gym.name.toLowerCase().includes(locationLowerCase) ||
      gym.zip?.toLowerCase().includes(locationLowerCase) ||
      gym.postal?.toLowerCase().includes(locationLowerCase) ||
      gym.neighborhood.toLowerCase().includes(locationLowerCase) ||
      gym.city?.toLowerCase().includes(locationLowerCase) ||
      gym.state?.toLowerCase().includes(locationLowerCase),
  );

  if (!result.length) return [];

  return result;
}

export { acquireLocalGyms, acquireNumberGyms, acquireNewGym };
