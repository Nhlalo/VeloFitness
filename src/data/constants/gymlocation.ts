import { Gym, Description } from "../../types/club.interface";

const gymUSAAmenties: string[] = [
  "Boxing Studio",
  "Bodywork and Skincare Services at The Spa",
  "Men's and Women's Executive Locker Rooms",
  "Outdoor Fitness Terrace",
  "Private Pilates Studio",
];
const gymSAAmenties: string[] = [
  "Bodywork and Skincare Services at The Spa",
  "Men's and Women's Executive Locker Rooms",
  "The Shop by  Vélo",
  "Indoor Lap Pool",
  "Private Pilates Studio",
];
const gymCanadaAmenties: string[] = [
  "Boxing Studio",
  "Bodywork and Skincare Services at The Spa",
  "Eucalyptus Steam Rooms",
  "Heated Yoga Studio",
  "Private Pilates Studio",
];

const USAGyms: Gym[] = [
  {
    name: "Back Bay Gym",
    address: "300 Dartmouth St, Boston, MA 02116",
    neighborhood: "Back Bay",
    zip: "02116",
    state: "Boston",
    country: "USA",
    cellNumber: "(647) 555-0167",
    image: "/back-bay-gym.jpg",
    amenties: gymUSAAmenties,
  },
  {
    name: "Financial District Fitness",
    address: "50 Franklin St, Boston, MA 02110",
    neighborhood: "Downtown",
    zip: "02110",
    state: "Boston",
    country: "USA",
    cellNumber: "(857) 555-0567",
    image: "/financial-district-fitness.jpg",
    amenties: gymUSAAmenties,
  },
];

const SAGyms: Gym[] = [
  {
    name: "Sandton City Fitness",
    address: "5th Street, Sandton, Johannesburg",
    postal: "2196",
    neighborhood: "Sandton",
    city: "Johannesburg",
    country: "South Africa",
    cellNumber: "(011) 555-1234",
    image: "/sandton-city-fitness.jpg",
    amenties: gymSAAmenties,
  },
  {
    name: "Maboneng Urban Fitness",
    address: "280 Fox Street, Maboneng Precinct",
    postal: "2001",
    neighborhood: "Johannesburg CBD/City Center",
    city: "Johannesburg",
    country: "South Africa",
    cellNumber: "011) 555-2345",
    image: "/maboneng-urban-fitness.jpg",
    amenties: gymSAAmenties,
  },
];

const canadaGyms: Gym[] = [
  {
    name: "Bay Street Fitness",
    address: "199 Bay Street, Commerce Court West",
    postal: "M5L 1G9",
    neighborhood: "Yorkville",
    city: "Toronto",
    country: "Canada",
    cellNumber: "(647) 555-0167",
    image: "/bay-street-fitness.jpg",
    amenties: gymCanadaAmenties,
  },
  {
    name: "Yorkville Urban Fitness",
    address: "55 Avenue Road",
    postal: " M5R 0L2",
    neighborhood: "Yorkville",
    cellNumber: "(778) 555-0456",
    country: "Canada",
    city: "Toronto",
    image: "/yorkville-urban-fitness.jpg",
    amenties: gymCanadaAmenties,
  },
  {
    name: "King West Fitness",
    address: "70 Bathurst Street",
    postal: "M5V 0N8",
    neighborhood: "King West",
    city: "Toronto",
    country: "Canada",
    cellNumber: "(416) 555-0123",
    image: "/king-west-fitness.jpg",
    amenties: gymCanadaAmenties,
  },
];

const gymDescription: Description[] = [
  {
    country: "USA",
    description:
      "From the heart of Back Bay to the tree-lined streets of Chestnut Hill, our Boston clubs are crafted for an unparalleled experience. Every location provides the essential elements of well-being, including innovative classes, expert trainers, and now The Stacked Studio, our dedicated space for strength training, only at Vélo Fitness Chestnut Hill.",
    image: "/boston.jpg",
    clubs: USAGyms,
  },
  {
    country: "South Africa",
    description:
      "From the vibrant energy of Maboneng to the sophisticated heart of Sandton, our Johannesburg clubs are crafted for excellence. Every location delivers the key pillars of wellness, including dynamic group training, elite personal coaching, and now the Altitude Conditioning Zone, our exclusive high-performance training studio, only at Vélo Fitness Sandton.",
    image: "/Johannesburg.jpg",
    clubs: SAGyms,
  },
  {
    country: "Canada",
    description:
      "From the waterfront energy of Vancouver to the sophisticated core of Toronto, our Canadian clubs are built for optimal performance. Every location provides the fundamental elements of fitness, including cutting-edge classes, world-class trainers, and now the Hot Yoga Sanctuary, our dedicated studio for heat-based practice, only at Vélo Fitness Toronto.",
    image: "/canada.jpg",
    clubs: canadaGyms,
  },
];

export { gymDescription, USAGyms, SAGyms, canadaGyms };
