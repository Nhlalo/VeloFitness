//Used in gymlocation, useFindClub and Resultfile

export interface Gym {
  name: string;
  address: string;
  neighborhood: string;
  zip?: string;
  postal?: string;
  city?: string;
  country: string;
  state?: string;
  cellNumber: string;
  image?: string;
}

export interface Description {
  country: string;
  description: string;
  image: string; //images are interpreted as strings by TypeScript
  clubs: Gym[];
}
