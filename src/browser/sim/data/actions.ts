import type { Revelation } from "./revelations.js";
import type { ItemId } from "./items.js";

export type ActionDef = {
  label: string;
  /** Status text; for walkTo the resource name follows it. */
  status: string;
  /** Fixed duration in game minutes; null = taken from the target tile. */
  minutes: number | null;
  /** The event that reveals the action to the player. */
  revealedBy: Revelation;
  /**
   * The nature energy the action costs: a spell. The character can start it with at least this much
   * energy, and the energy is taken when the action finishes, together with the pieces it uses.
   * Absent for an action that costs none.
   */
  natureEnergy?: number;
  /** Combat-only effect; absent actions belong to ordinary map time. */
  combat?: { damage: number; item?: ItemId } | { reducesNextDamageBy: number };
  /** File name in assets/icons, without the extension: the icon the action shows wherever it stands. */
  icon: string;
  /** Title of the icon, as its page on game-icons.net gives it; the footer's credit names it. */
  iconTitle: string;
};

export type ActionId = keyof typeof ACTIONS;

/**
 * The closed list of actions of the character. What an action uses and gives — which item is
 * fuel, food or can be lit, how many pieces crafting and lighting a campfire use — stands in
 * items.ts and campfire.ts; the simulation picks the pieces from the backpack.
 */
export const ACTIONS = {
  explore: {
    label: "Eksploruj",
    status: "Eksploruje",
    minutes: 20,
    revealedBy: { kind: "chilled" },
    icon: "binoculars",
    iconTitle: "Binoculars icon",
  },
  wander: {
    label: "Wędruj",
    status: "Wędruje",
    minutes: null,
    revealedBy: { kind: "chilled" },
    icon: "hiking",
    iconTitle: "Hiking icon",
  },
  walkTo: {
    label: "Idź",
    status: "Idzie po",
    minutes: null,
    revealedBy: { kind: "explored" },
    icon: "direction-sign",
    iconTitle: "Direction sign icon",
  },
  walkToCampfire: {
    label: "Idź — ognisko",
    status: "Idzie do ogniska",
    minutes: null,
    revealedBy: { kind: "campfireCrafted" },
    icon: "direction-sign",
    iconTitle: "Direction sign icon",
  },
  gather: {
    label: "Zbierz",
    status: "Zbiera",
    minutes: 10,
    revealedBy: { kind: "explored" },
    icon: "grab",
    iconTitle: "Grab icon",
  },
  patrol: {
    label: "Obchód",
    status: "Robi obchód po",
    minutes: 40,
    revealedBy: { kind: "treeDiscovered", skill: "smallItemGathering" },
    icon: "grab",
    iconTitle: "Grab icon",
  },
  craftCampfire: {
    label: "Wytwórz — ognisko",
    status: "Wytwarza ognisko",
    minutes: 20,
    revealedBy: { kind: "gathered", item: "stick" },
    icon: "claw-hammer",
    iconTitle: "Claw hammer icon",
  },
  // „Zapal — ognisko” and „Zapal — patyk” are the spell Płomyk, paid with nature energy besides
  // their sticks.
  lightCampfire: {
    label: "Zapal — ognisko",
    status: "Zapala ognisko",
    minutes: 5,
    revealedBy: { kind: "gathered", item: "stick" },
    natureEnergy: 10,
    icon: "match-tip",
    iconTitle: "Match tip icon",
  },
  lightItem: {
    label: "Zapal — patyk",
    status: "Zapala patyk",
    minutes: 5,
    revealedBy: { kind: "gathered", item: "stick" },
    natureEnergy: 10,
    icon: "match-tip",
    iconTitle: "Match tip icon",
  },
  feedCampfire: {
    label: "Zasil — ognisko",
    status: "Zasila ognisko",
    minutes: 5,
    revealedBy: { kind: "lit" },
    icon: "logging",
    iconTitle: "Logging icon",
  },
  eat: {
    label: "Zjedz — jagoda",
    status: "Je jagodę",
    minutes: 5,
    revealedBy: { kind: "gathered", item: "berry" },
    icon: "meal",
    iconTitle: "Meal icon",
  },
  strikeWithStick: {
    label: "Uderz — patyk",
    status: "Uderza patykiem",
    minutes: null,
    revealedBy: { kind: "attacked", creature: "wolf" },
    combat: { damage: 6, item: "stick" },
    icon: "deadly-strike",
    iconTitle: "Deadly strike icon",
  },
  kick: {
    label: "Kopnij",
    status: "Kopie",
    minutes: null,
    revealedBy: { kind: "attacked", creature: "wolf" },
    combat: { damage: 3 },
    icon: "boot-kick",
    iconTitle: "Boot kick icon",
  },
  dodge: {
    label: "Odskocz",
    status: "Odskakuje",
    minutes: null,
    revealedBy: { kind: "attacked", creature: "wolf" },
    combat: { reducesNextDamageBy: 5 },
    icon: "dodge",
    iconTitle: "Dodge icon",
  },
} as const satisfies Record<string, ActionDef>;
