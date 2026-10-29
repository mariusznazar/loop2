import type { ItemId } from "./items.js";
import type { CreatureId } from "./creatures.js";

/**
 * An event that reveals actions, conditions, items or creatures to the player. The events name
 * content by its data identifiers, so no identifier of the content leaves the data.
 */
export type Revelation =
  /** The first game minute in which the body temperature is below the chill threshold. */
  | { kind: "chilled" }
  /** The first finished exploration. */
  | { kind: "explored" }
  /** A revealed tile that holds the item; each further revealed tile adds its own. */
  | { kind: "tileHolds"; item: ItemId }
  /** The first piece of the item gathered. */
  | { kind: "gathered"; item: ItemId }
  /** The first campfire crafted. */
  | { kind: "campfireCrafted" }
  /** The first finished lighting, of a campfire or of an item. */
  | { kind: "lit" }
  /** A creature attack, which reveals combat conditions and actions. */
  | { kind: "attacked"; creature: CreatureId };
