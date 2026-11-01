export interface Character {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: LocationRef;
  location: LocationRef;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

type CharacterStatus = "Alive" | "Dead" | "unknown";
type CharacterGender = "Female" | "Male" | "Genderless" | "unknown";

export interface LocationRef {
  id: number;
  name: string;
}

export interface Location extends LocationRef {
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface Location extends LocationRef {
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

const Menu = {
  Home: { label: "Home", path: "/" },
  Episodes: { label: "Episodes", path: "/episode" },
  Characters: { label: "Characters", path: "/character" },
  Location: { label: "Locations", path: "/location" },
} as const;

export type MenuItem = keyof typeof Menu;

export const ButtonType = {
  Primary: "primary",
  Secondary: "secondary",
} as const;

export type ButtonType = (typeof ButtonType)[keyof typeof ButtonType];
