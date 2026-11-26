import type { GearPlace } from "./gear.js";
import type { Revelation } from "./revelations.js";
import { RESOURCES, type ResourceId } from "./resources.js";

export type ItemDef = {
  /** Name shown to the player: the nominative singular, as it follows "1" in a price. */
  name: string;
  /** The plural forms of the name, for a count; as `plural` of a resource row gives them. */
  plural: { few: string; many: string };
  /** File name in assets/icons, without the extension. */
  icon: string;
  /** Title of the icon, as its page on game-icons.net gives it; the section of credits names it. */
  iconTitle: string;
  /** The event that reveals the item to the player. */
  revealedBy: Revelation;
  /** Present for an item that can be fed to a burning campfire. */
  fuel?: {
    /** Minutes of burning one piece adds to the campfire. */
    burnMinutes: number;
  };
  /** Present for an item that can be eaten. */
  food?: {
    /** Satiety one piece gives. */
    satiety: number;
  };
  /** Present for an item that can be lit and held to burn on its own. */
  lightable?: {
    /** Minutes the lit piece burns. */
    burnMinutes: number;
    /** Degrees Celsius a minute it warms the character standing on its tile. */
    warmth: number;
  };
  /**
   * Present for an item that is made with „Wytwórz”: the pieces one making uses up and the game
   * minutes it takes. One making gives one piece of the item. It uses at least one piece, so a
   * making never raises the count of the backpack.
   */
  recipe?: {
    /** The pieces used, at least one entry, in the order of the reasons a rule gives for lacking them. */
    uses: readonly { item: ItemId; count: number }[];
    /** Game minutes one making takes. */
    minutes: number;
  };
  /** Present for an item that can be used with „Opatrz”. */
  healing?: {
    /** Health one piece restores. */
    health: number;
  };
  /** Present for an item a slot of the gear can hold: the one place of the gear it fits (D-456). */
  fits?: GearPlace;
};

/**
 * The properties of an item's row that give an action its item targets: the items an action takes
 * as its target are those whose row holds the property its row in actions.ts names. `fits`, the
 * place of the gear an item fits, gives „Załóż” its targets (D-458).
 */
export type TargetProperty = "recipe" | "healing" | "fits";

/** The words of an item that is a resource, taken from its resource row, so no word stands twice. */
function wordsOf(resource: ResourceId) {
  const { name, plural, icon, iconTitle } = RESOURCES[resource];
  return { name, plural, icon, iconTitle };
}

/**
 * What a row of `ITEM_ROWS` is checked against, which cannot be `ItemDef` itself: `ItemId` is read
 * from the keys of the rows, and the revelation of `ItemDef` names an `ItemId`.
 */
type ItemRow = Omit<ItemDef, "revealedBy" | "recipe"> & {
  revealedBy: { kind: string; item: string };
  recipe?: {
    uses: readonly { item: string; count: number }[];
    minutes: number;
  };
};

/**
 * The rows of the items; the type checker holds that every resource has one. The bandage is an item
 * no map holds, so it has no resource row and carries its own words. Fiber has no use yet.
 */
const ITEM_ROWS = {
  stick: {
    ...wordsOf("stick"),
    revealedBy: { kind: "tileHolds", item: "stick" },
    fuel: { burnMinutes: 20 },
    lightable: { burnMinutes: 3, warmth: 0.15 },
    fits: "mainHand",
  },
  berry: {
    ...wordsOf("berry"),
    revealedBy: { kind: "tileHolds", item: "berry" },
    food: { satiety: 25 },
  },
  moss: {
    ...wordsOf("moss"),
    revealedBy: { kind: "tileHolds", item: "moss" },
  },
  fiber: {
    ...wordsOf("fiber"),
    revealedBy: { kind: "tileHolds", item: "fiber" },
  },
  bandage: {
    name: "opatrunek",
    plural: { few: "opatrunki", many: "opatrunków" },
    icon: "first-aid-kit",
    iconTitle: "First aid kit icon",
    revealedBy: { kind: "gathered", item: "moss" },
    recipe: { uses: [{ item: "moss", count: 2 }], minutes: 10 },
    healing: { health: 25 },
    fits: "pocket",
  },
} as const satisfies Record<ResourceId, ItemRow> & Record<string, ItemRow>;

/** The identifier of an item: a key of `ITEMS`. */
export type ItemId = keyof typeof ITEM_ROWS;

/** The items of the game: everything the backpack can hold, whether or not some map lays it on a tile. */
export const ITEMS: Record<ItemId, ItemDef> = ITEM_ROWS;
