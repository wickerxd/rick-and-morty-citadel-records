import type { Character } from "@/types";

function withIndefiniteArticle(value: string): string {
  return `${/^[aeiou]/i.test(value) ? "an" : "a"} ${value}`;
}

export function buildCharacterBio(character: Character): string {
  const origin =
    character.origin.name === "unknown"
      ? "an unknown origin"
      : character.origin.name;
  const location =
    character.location.name === "unknown"
      ? "an unknown location"
      : character.location.name;
  const species = (character.type || character.species).toLowerCase();
  const status =
    character.status === "Alive"
      ? "currently alive"
      : character.status === "Dead"
        ? "deceased"
        : "of unknown status";

  return `${character.name} is ${withIndefiniteArticle(species)} from ${origin}. ${character.name} is ${status} and was last seen at ${location}.`;
}
