export type ResourceDef = {
  /** Name shown to the player. */
  name: string;
  /** File name in assets/icons, without the extension. */
  icon: string;
  /**
   * Title of the icon, as its page on game-icons.net gives it; the footer's credit names it.
   * Icon titles are game content, so they stand here in the data, not in the view's credits.ts:
   * content-identifiers keeps the names of resources out of the view, and a title such as
   * "Wood stick icon" holds the resource identifier `stick` as a word.
   */
  iconTitle: string;
};

export const RESOURCES = {
  stick: { name: "patyk", icon: "wood-stick", iconTitle: "Wood stick icon" },
  berry: { name: "jagoda", icon: "berry-bush", iconTitle: "Berry bush icon" },
  moss: { name: "mech", icon: "fern", iconTitle: "Fern icon" },
  fiber: { name: "włókno", icon: "flax", iconTitle: "Flax icon" },
} as const satisfies Record<string, ResourceDef>;

export type ResourceId = keyof typeof RESOURCES;
