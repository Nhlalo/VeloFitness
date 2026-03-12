//Used within the gymlocation file and useFindClub file

export interface Gym {
  name: string;
  address: string;
  neighborhood: string;
  zip?: string;
  postal?: string;
  city?: string;
  state?: string;
  cellNumber: string;
  image?: string;
}

export interface Description {
  location: string;
  description: string;
  image: string; //images are interpreted as strings by TypeScript
  clubs: Gym[];
}
