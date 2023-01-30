export interface Character {
    id: number;
    name: string;
    status: "Dead" | "Alive" | "unknown";
    species: string;
    type: string;
    gender: "Male" | "Female";
    image: string;
  }