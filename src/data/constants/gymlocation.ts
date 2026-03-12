import { Gym, Description } from "../../types/club.interface";
import bostonGymImg from "../../assets/images/boston.jpg";
import johannesburgGymImg from "../../assets/images/Johannesburg.jpg";
import canadaGymImg from "../../assets/images/canada.jpg";
import backBayImg from "../../assets/images/back-bay-gym.jpg";
import financialDistrictImg from "../../assets/images/financial-district-fitness.jpg";
import sandtonCityImg from "../../assets/images/sandton-city-fitness.jpg";
import mabonengImg from "../../assets/images/maboneng-urban-fitness.jpg";
import bayStreetImg from "../../assets/images/bay-street-fitness.jpg";
import yorkvilleImg from "../../assets/images/yorkville-urban-fitness.jpg";
import kingWestImg from "../../assets/images/king-west-fitness.jpg";

const bostonGyms: Gym[] = [
  {
    name: "Back Bay Gym",
    address: "300 Dartmouth St, Boston, MA 02116",
    neighborhood: "Back Bay",
    zip: "02116",
    state: "Boston",
    cellNumber: "(647) 555-0167",
    image: backBayImg,
  },
  {
    name: "Financial District Fitness",
    address: "50 Franklin St, Boston, MA 02110",
    neighborhood: "Downtown",
    zip: "02110",
    state: "Boston",
    cellNumber: "(857) 555-0567",
    image: financialDistrictImg,
  },
];

const johannesburgGyms: Gym[] = [
  {
    name: "Sandton City Fitness",
    address: "5th Street, Sandton, Johannesburg",
    postal: "2196",
    neighborhood: "Sandton",
    city: "Johannesburg",
    cellNumber: "(011) 555-1234",
    image: sandtonCityImg,
  },
  {
    name: "Maboneng Urban Fitness",
    address: "280 Fox Street, Maboneng Precinct",
    postal: "2001",
    neighborhood: "Johannesburg CBD/City Center",
    city: "Johannesburg",
    cellNumber: "011) 555-2345",
    image: mabonengImg,
  },
];

const canadaGyms: Gym[] = [
  {
    name: "Bay Street Fitness",
    address: "199 Bay Street, Commerce Court West",
    postal: "M5L 1G9",
    neighborhood: "Yorkville",
    city: "Toronto",
    cellNumber: "(647) 555-0167",
    image: bayStreetImg,
  },
  {
    name: "Yorkville Urban Fitness",
    address: "55 Avenue Road",
    postal: " M5R 0L2",
    neighborhood: "Yorkville",
    cellNumber: "(778) 555-0456",
    city: "Toronto",
    image: yorkvilleImg,
  },
  {
    name: "King West Fitness",
    address: "70 Bathurst Street",
    postal: "M5V 0N8",
    neighborhood: "King West",
    city: "Toronto",
    cellNumber: "(416) 555-0123",
    image: kingWestImg,
  },
];

const gymDescription: Description[] = [
  {
    country: "USA",
    description:
      "From the heart of Back Bay to the tree-lined streets of Chestnut Hill, our Boston clubs are crafted for an unparalleled experience. Every location provides the essential elements of well-being, including innovative classes, expert trainers, and now The Stacked Studio, our dedicated space for strength training, only at Vélo Fitness Chestnut Hill.",
    image: bostonGymImg,
    clubs: bostonGyms,
  },
  {
    country: "South Africa",
    description:
      "From the vibrant energy of Maboneng to the sophisticated heart of Sandton, our Johannesburg clubs are crafted for excellence. Every location delivers the key pillars of wellness, including dynamic group training, elite personal coaching, and now the Altitude Conditioning Zone, our exclusive high-performance training studio, only at Vélo Fitness Sandton.",
    image: johannesburgGymImg,
    clubs: johannesburgGyms,
  },
  {
    country: "Canada",
    description:
      "From the waterfront energy of Vancouver to the sophisticated core of Toronto, our Canadian clubs are built for optimal performance. Every location provides the fundamental elements of fitness, including cutting-edge classes, world-class trainers, and now the Hot Yoga Sanctuary, our dedicated studio for heat-based practice, only at Vélo Fitness Toronto.",
    image: canadaGymImg,
    clubs: canadaGyms,
  },
];

function acquireLocalGyms(
  location: string,
): Promise<Description[] | Gym[] | string> {
  const gyms: Gym[] = [...bostonGyms, ...johannesburgGyms, ...canadaGyms];

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
          gym.country.includes(locationLowerCase),
        );

        if (match) {
          resolve(match);
          return;
        }

        // Find match according to matching zip, postal or name
        const result = gyms.filter(
          (gym) =>
            gym.name.includes(locationLowerCase) ||
            gym.zip?.includes(locationLowerCase) ||
            gym.postal?.includes(locationLowerCase) ||
            gym.neighborhood.includes(locationLowerCase) ||
            gym.city?.includes(locationLowerCase) ||
            gym.state?.includes(locationLowerCase),
        );

        resolve(
          result || "There are no gym facilities in the immediate vicinity.",
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

export { acquireLocalGyms, acquireNumberGyms, gymDescription };
