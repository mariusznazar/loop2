import type { ItemId } from "./items.js";

export type CampfireDef = {
  /** Name shown to the player. */
  name: string;
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
  name: "ognisko",
  craft: { item: "stick", count: 6 },
  light: { item: "stick", count: 2 },
  burnMinutes: 60,
  warmth: 0.5,
  icon: "campfire",
  iconTitle: "Campfire icon",
} as const satisfies CampfireDef;
