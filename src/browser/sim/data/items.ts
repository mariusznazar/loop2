import type { Revelation } from "./revelations.js";
import { RESOURCES, type ResourceId } from "./resources.js";

export type ItemDef = {
  /** Name shown to the player. */
  name: string;
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
};

/** The items of the backpack: the resources of Las, gathered as items. Moss and fiber have no use yet. */
export type ItemId = ResourceId;

export const ITEMS: Record<ItemId, ItemDef> = {
  stick: {
    name: RESOURCES.stick.name,
    revealedBy: { kind: "tileHolds", item: "stick" },
    fuel: { burnMinutes: 20 },
    lightable: { burnMinutes: 3, warmth: 0.15 },
  },
  berry: {
    name: RESOURCES.berry.name,
    revealedBy: { kind: "tileHolds", item: "berry" },
    food: { satiety: 25 },
  },
  moss: {
    name: RESOURCES.moss.name,
    revealedBy: { kind: "tileHolds", item: "moss" },
  },
  fiber: {
    name: RESOURCES.fiber.name,
    revealedBy: { kind: "tileHolds", item: "fiber" },
  },
};
