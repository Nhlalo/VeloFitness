type City = "boston" | "johannesburg";

const gymZipsPostals = new Map<string, City>([
  ["02108", "boston"],
  ["02116", "boston"],
  ["02118", "boston"],
  ["02135", "boston"],
  ["02110", "boston"],
  ["2196", "johannesburg"],
  ["2001", "johannesburg"],
]);

type Gym = {
  name: string;
  address: string;
  neighborhood: string;
  zip?: string;
  postal?: string;
};

const bostonGyms: Gym[] = [
  {
    name: "Back Bay Gym",
    address: "300 Dartmouth St, Boston, MA 02116",
    neighborhood: "Back Bay",
    zip: "02116",
  },
  {
    name: "Financial District Fitness",
    address: "50 Franklin St, Boston, MA 02110",
    neighborhood: "Downtown",
    zip: "02110",
  },
];

const johannesburgGyms: Gym[] = [
  {
    name: "Sandton City Fitness",
    address: "5th Street, Sandton, Johannesburg",
    postal: "2196",
    neighborhood: "Sandton",
  },
  {
    name: "Maboneng Urban Fitness",
    address: "280 Fox Street, Maboneng Precinct",
    postal: "2001",
    neighborhood: "Johannesburg CBD/City Center",
  },
];

function acquireLocalGyms(location: string): Gym[] | null {
  const locationLower = location.toLowerCase().trim();

  if (locationLower === "boston") return bostonGyms;
  if (locationLower === "johannesburg") return johannesburgGyms;

  const cityFromZip = gymZipsPostals.get(location);
  if (cityFromZip === "boston") return bostonGyms;
  if (cityFromZip === "johannesburg") return johannesburgGyms;

  return null;
}
