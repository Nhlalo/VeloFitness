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

type City = "boston" | "johannesburg" | "canada";

const gymZipsPostals = new Map<string, City>([
  ["02108", "boston"],
  ["02116", "boston"],
  ["02118", "boston"],
  ["02135", "boston"],
  ["02110", "boston"],
  ["2196", "johannesburg"],
  ["2001", "johannesburg"],
  ["M5L 1G9", "canada"],
  ["M5R 0L2", "canada"],
  ["M5V 0N8", "canada"],
]);

type Gym = {
  name: string;
  address: string;
  neighborhood: string;
  zip?: string;
  postal?: string;
  cellNumber: string;
  image?: string;
};

const bostonGyms: Gym[] = [
  {
    name: "Back Bay Gym",
    address: "300 Dartmouth St, Boston, MA 02116",
    neighborhood: "Back Bay",
    zip: "02116",
    cellNumber: "(647) 555-0167",
    image: backBayImg,
  },
  {
    name: "Financial District Fitness",
    address: "50 Franklin St, Boston, MA 02110",
    neighborhood: "Downtown",
    zip: "02110",
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
    cellNumber: "(011) 555-1234",
    image: sandtonCityImg,
  },
  {
    name: "Maboneng Urban Fitness",
    address: "280 Fox Street, Maboneng Precinct",
    postal: "2001",
    neighborhood: "Johannesburg CBD/City Center",
    cellNumber: "011) 555-2345",
    image: mabonengImg,
  },
];

const canadaGyms: Gym[] = [
  {
    name: "Bay Street Fitness",
    address: "199 Bay Street, Commerce Court West",
    postal: "M5L 1G9",
    neighborhood: "Ontario",
    cellNumber: "(647) 555-0167",
    image: bayStreetImg,
  },
  {
    name: "Yorkville Urban Fitness",
    address: "55 Avenue Road",
    postal: " M5R 0L2",
    neighborhood: "Yorkville",
    cellNumber: "(778) 555-0456",
    image: yorkvilleImg,
  },
  {
    name: "King West Fitness",
    address: "70 Bathurst Street",
    postal: "M5V 0N8",
    neighborhood: "King West",
    cellNumber: "(416) 555-0123",
    image: kingWestImg,
  },
];

type Description = {
  location: string;
  description: string;
  image: string; //images are interpreted as strings by TypeScript
  clubs: Gym[];
};

const gymDescription: Description[] = [
  {
    location: "Boston",
    description:
      "From the heart of Back Bay to the tree-lined streets of Chestnut Hill, our Boston clubs are crafted for an unparalleled experience. Every location provides the essential elements of well-being, including innovative classes, expert trainers, and now The Stacked Studio, our dedicated space for strength training, only at Vélo Fitness Chestnut Hill.",
    image: bostonGymImg,
    clubs: bostonGyms,
  },
  {
    location: "Johannesburg",
    description:
      "From the vibrant energy of Maboneng to the sophisticated heart of Sandton, our Johannesburg clubs are crafted for excellence. Every location delivers the key pillars of wellness, including dynamic group training, elite personal coaching, and now the Altitude Conditioning Zone, our exclusive high-performance training studio, only at Vélo Fitness Sandton.",
    image: johannesburgGymImg,
    clubs: johannesburgGyms,
  },
  {
    location: "Canada",
    description:
      "From the waterfront energy of Vancouver to the sophisticated core of Toronto, our Canadian clubs are built for optimal performance. Every location provides the fundamental elements of fitness, including cutting-edge classes, world-class trainers, and now the Hot Yoga Sanctuary, our dedicated studio for heat-based practice, only at Vélo Fitness Toronto.",
    image: canadaGymImg,
    clubs: canadaGyms,
  },
];

function acquireLocalGyms(location: string): Gym[] | null {
  const locationLower = location.toLowerCase().trim();

  if (locationLower === "boston") return bostonGyms;
  if (locationLower === "johannesburg") return johannesburgGyms;
  if (locationLower === "canada") return canadaGyms;

  const cityFromZip = gymZipsPostals.get(location);
  if (cityFromZip === "boston") return bostonGyms;
  if (cityFromZip === "johannesburg") return johannesburgGyms;
  if (cityFromZip === "canada") return canadaGyms;

  return null;
}

function acquireNumberGyms(): number {
  return gymZipsPostals.size;
}

export { acquireLocalGyms, acquireNumberGyms, gymDescription };
