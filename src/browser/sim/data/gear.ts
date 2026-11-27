/**
 * The row of a place of the gear: the name the player reads for a slot of that place, the words
 * that name the place in the line of gear on the screen of a map run, absent where no item of the
 * data fits the place yet, and the words of an action that takes a piece from the backpack into an
 * empty slot of the place when it uses it (D-457), after the name of the one who acts in the paragraph
 * of an encounter and with its first letter capitalized, with no actor, in the chronicle (D-340),
 * absent where no action of the data takes a piece from the place yet.
 */
type PlaceRow = { name: string; line?: string; refill?: string };

/**
 * The places of the gear (D-456): what a character wields in its main hand and its second hand, what
 * it has on its head, its torso and its legs, and what it has at hand in a pocket of its belt. The row
 * of an item names the one place it fits (`fits` in items.ts).
 */
export const GEAR_PLACES = {
  mainHand: {
    name: "Ręka główna",
    line: "w ręku",
    refill: "bierze patyk z plecaka do ręki",
  },
  secondHand: { name: "Druga ręka" },
  head: { name: "Głowa" },
  torso: { name: "Tułów" },
  legs: { name: "Nogi" },
  pocket: {
    name: "Kieszeń",
    line: "pod ręką",
    refill: "bierze opatrunek z plecaka do kieszeni",
  },
} as const satisfies Record<string, PlaceRow>;

/** A place of the gear: a key of `GEAR_PLACES`. */
export type GearPlace = keyof typeof GEAR_PLACES;

/**
 * The slot a combat action that uses an item, „Uderz — patyk”, takes its piece from, and no other
 * (D-456): the main hand.
 */
export const WIELDING_SLOT = "mainHand" satisfies GearSlot;

/** The pockets of the belt, each a slot of the place „Kieszeń” holding one piece (D-456). */
export const POCKETS = 3;

/** A slot of the gear: one of the five slots of their own places, or a pocket by its number from 1. */
export type GearSlot =
  "mainHand" | "secondHand" | "head" | "torso" | "legs" | `pocket${number}`;

/**
 * The slots of the gear in their order, each with its place: the main hand, the second hand, the
 * head, the torso, the legs and the pockets of the belt, `POCKETS` of them, numbered from 1. Each
 * slot holds one piece.
 */
export const GEAR_SLOTS: Readonly<Record<GearSlot, GearPlace>> = {
  mainHand: "mainHand",
  secondHand: "secondHand",
  head: "head",
  torso: "torso",
  legs: "legs",
  ...(Object.fromEntries(
    Array.from({ length: POCKETS }, (_, index) => [
      `pocket${index + 1}`,
      "pocket",
    ]),
  ) as Record<`pocket${number}`, GearPlace>),
};
