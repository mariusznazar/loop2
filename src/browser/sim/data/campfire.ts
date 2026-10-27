import type { ItemId } from "./items.js";
import type { Revelation } from "./revelations.js";

export type CampfireDef = {
  /**
   * The identifier under which the Understanding records the campfire as a discoverable thing.
   * The campfire is no item of the backpack.
   */
  id: string;
  /** Name shown to the player. */
  name: string;
  /** The event that reveals the campfire to the player. */
  revealedBy: Revelation;
  /** What crafting a campfire uses up. */
  craft: { item: ItemId; count: number };
  /** What lighting it uses up. */
  light: { item: ItemId; count: number };
  /** Minutes a lit campfire burns. */
  burnMinutes: number;
  /** Degrees Celsius a minute it warms the character standing on its tile. */
  warmth: number;
  /** File name in assets/icons, without the extension. */
  icon: string;
  /** Title of the icon, as its page on game-icons.net gives it; the footer's credit names it. */
  iconTitle: string;
};

export const CAMPFIRE = {
  id: "campfire",
  name: "ognisko",
  revealedBy: { kind: "gathered", item: "stick" },
  craft: { item: "stick", count: 6 },
  light: { item: "stick", count: 2 },
  burnMinutes: 60,
  warmth: 0.5,
  icon: "campfire",
  iconTitle: "Campfire icon",
} as const satisfies CampfireDef;
