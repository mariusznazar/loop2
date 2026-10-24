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
};

export const CAMPFIRE = {
  name: "ognisko",
  craft: { item: "stick", count: 6 },
  light: { item: "stick", count: 2 },
  burnMinutes: 60,
  warmth: 0.5,
} as const satisfies CampfireDef;
