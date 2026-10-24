import { ITEMS, type ItemId } from "./data/items.js";
import { TRAITS } from "./data/traits.js";
import type { Backpack, RunCharacter, Traits } from "./types.js";

/** The traits of a new character, from the data; the one place traits are made. */
export function newTraits(): Traits {
  return { ...TRAITS };
}

/** An empty backpack: 0 pieces of every item. */
export function newBackpack(): Backpack {
  return Object.fromEntries(
    (Object.keys(ITEMS) as ItemId[]).map((id) => [id, 0]),
  ) as Backpack;
}

/** Pieces in the backpack, all items together. */
export function backpackCount(backpack: Backpack): number {
  return Object.values(backpack).reduce((sum, pieces) => sum + pieces, 0);
}

/** The backpack's cap: the character's carrying capacity. */
export function backpackCap(character: Pick<RunCharacter, "traits">): number {
  return character.traits.carryingCapacity;
}
