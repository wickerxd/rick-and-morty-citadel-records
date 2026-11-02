export const CHARACTER_STATUSES = ["Alive", "Dead", "unknown"] as const;
export type CharacterStatus = (typeof CHARACTER_STATUSES)[number];

export const CHARACTER_GENDERS = [
  "Female",
  "Male",
  "Genderless",
  "unknown",
] as const;
export type CharacterGender = (typeof CHARACTER_GENDERS)[number];

export type CharacterStatusFilter = "All" | CharacterStatus;

export interface LocationRef {
  name: string;
  url: string;
}

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

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface ApiInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface PaginatedResponse<T> {
  info: ApiInfo;
  results: T[];
}

export interface CharacterFilters {
  name?: string;
  status?: CharacterStatus;
}

export const ButtonType = {
  Primary: "primary",
  Secondary: "secondary",
} as const;

export type ButtonType = (typeof ButtonType)[keyof typeof ButtonType];
