export type ResourceDef = {
  /** Name shown to the player: the nominative singular, as it follows "1" in a price. */
  name: string;
  /**
   * The plural forms of the name, for a count: `few` follows 2 to 4 (and 22 to 24, and so on, but
   * not 12 to 14), `many` follows 0, 5 and more, 12 to 14 and every count not covered by `few`.
   */
  plural: { few: string; many: string };
  /** File name in assets/icons, without the extension. */
  icon: string;
  /**
   * Title of the icon, as its page on game-icons.net gives it; the section of credits names it.
   * Icon titles are game content, so they stand here in the data, not in the view's credits.ts:
   * content-identifiers keeps the names of resources out of the view, and a title such as
   * "Wood stick icon" holds the resource identifier `stick` as a word.
   */
  iconTitle: string;
};

export const RESOURCES = {
  stick: {
    name: "patyk",
    plural: { few: "patyki", many: "patyków" },
    icon: "wood-stick",
    iconTitle: "Wood stick icon",
  },
  berry: {
    name: "jagoda",
    plural: { few: "jagody", many: "jagód" },
    icon: "berry-bush",
    iconTitle: "Berry bush icon",
  },
  moss: {
    name: "mech",
    plural: { few: "mchy", many: "mchów" },
    icon: "fern",
    iconTitle: "Fern icon",
  },
  fiber: {
    name: "włókno",
    plural: { few: "włókna", many: "włókien" },
    icon: "flax",
    iconTitle: "Flax icon",
  },
} as const satisfies Record<string, ResourceDef>;

export type ResourceId = keyof typeof RESOURCES;
