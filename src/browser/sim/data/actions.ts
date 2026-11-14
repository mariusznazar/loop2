import type { Revelation } from "./revelations.js";
import type { ItemId } from "./items.js";

export type ActionDef = {
  label: string;
  /** The group of the program editor's pick the action stands in; a new action names one. */
  group: ActionGroupId;
  /** Status text; for walkTo the resource name follows it. */
  status: string;
  /** Fixed duration in game minutes; null = taken from the target tile. */
  minutes: number | null;
  /**
   * The event that reveals the action to the player; absent for an action the Understanding holds
   * from the start of a new game.
   */
  revealedBy?: Revelation;
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
  /** Title of the icon, as its page on game-icons.net gives it; the section of credits names it. */
  iconTitle: string;
};

/**
 * The name of the nature energy a spell costs in the forms its count takes in a price: „1 energia
 * natury”, „2 energie natury”, „10 energii natury”. The form after 2 to 4 (and 22 to 24, not 12 to
 * 14) is `few`, after 0, 5 and more `many`.
 */
export const NATURE_ENERGY_NAME = {
  one: "energia natury",
  few: "energie natury",
  many: "energii natury",
} as const;

export type ActionId = keyof typeof ACTIONS;

/**
 * The groups the program editor's pick sets the actions in, in the order it shows them; within a
 * group the actions stand in the order of `ACTIONS`.
 */
export const ACTION_GROUPS = {
  move: { label: "Ruch" },
  gather: { label: "Zbieranie" },
  fire: { label: "Ogień" },
  foodAndCombat: { label: "Żywność i walka" },
} as const satisfies Record<string, { label: string }>;

export type ActionGroupId = keyof typeof ACTION_GROUPS;

/**
 * The closed list of actions of the character. What an action uses and gives — which item is
 * fuel, food or can be lit, how many pieces crafting and lighting a campfire use — stands in
 * items.ts and campfire.ts; the simulation picks the pieces from the backpack.
 */
export const ACTIONS = {
  explore: {
    label: "Eksploruj",
    group: "move",
    status: "Eksploruje",
    minutes: 20,
    icon: "binoculars",
    iconTitle: "Binoculars icon",
  },
  wander: {
    label: "Wędruj",
    group: "move",
    status: "Wędruje",
    minutes: null,
    revealedBy: { kind: "chilled" },
    icon: "hiking",
    iconTitle: "Hiking icon",
  },
  walkTo: {
    label: "Idź",
    group: "move",
    status: "Idzie po",
    minutes: null,
    revealedBy: { kind: "explored" },
    icon: "direction-sign",
    iconTitle: "Direction sign icon",
  },
  walkToCampfire: {
    label: "Idź — ognisko",
    group: "move",
    status: "Idzie do ogniska",
    minutes: null,
    revealedBy: { kind: "campfireCrafted" },
    icon: "direction-sign",
    iconTitle: "Direction sign icon",
  },
  gather: {
    label: "Zbierz",
    group: "gather",
    status: "Zbiera",
    minutes: 10,
    revealedBy: { kind: "explored" },
    icon: "grab",
    iconTitle: "Grab icon",
  },
  patrol: {
    label: "Obchód",
    group: "gather",
    status: "Robi obchód po",
    minutes: 40,
    revealedBy: { kind: "treeDiscovered", skill: "smallItemGathering" },
    icon: "grab",
    iconTitle: "Grab icon",
  },
  craftCampfire: {
    label: "Wytwórz — ognisko",
    group: "fire",
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
    group: "fire",
    status: "Zapala ognisko",
    minutes: 5,
    revealedBy: { kind: "gathered", item: "stick" },
    natureEnergy: 10,
    icon: "match-tip",
    iconTitle: "Match tip icon",
  },
  lightItem: {
    label: "Zapal — patyk",
    group: "fire",
    status: "Zapala patyk",
    minutes: 5,
    revealedBy: { kind: "gathered", item: "stick" },
    natureEnergy: 10,
    icon: "match-tip",
    iconTitle: "Match tip icon",
  },
  feedCampfire: {
    label: "Zasil — ognisko",
    group: "fire",
    status: "Zasila ognisko",
    minutes: 5,
    revealedBy: { kind: "lit" },
    icon: "logging",
    iconTitle: "Logging icon",
  },
  eat: {
    label: "Zjedz — jagoda",
    group: "foodAndCombat",
    status: "Je jagodę",
    minutes: 5,
    revealedBy: { kind: "gathered", item: "berry" },
    icon: "meal",
    iconTitle: "Meal icon",
  },
  strikeWithStick: {
    label: "Uderz — patyk",
    group: "foodAndCombat",
    status: "Uderza patykiem",
    minutes: null,
    revealedBy: { kind: "attacked", creature: "wolf" },
    combat: { damage: 6, item: "stick" },
    icon: "deadly-strike",
    iconTitle: "Deadly strike icon",
  },
  kick: {
    label: "Kopnij",
    group: "foodAndCombat",
    status: "Kopie",
    minutes: null,
    revealedBy: { kind: "attacked", creature: "wolf" },
    combat: { damage: 3 },
    icon: "boot-kick",
    iconTitle: "Boot kick icon",
  },
  dodge: {
    label: "Odskocz",
    group: "foodAndCombat",
    status: "Odskakuje",
    minutes: null,
    revealedBy: { kind: "attacked", creature: "wolf" },
    combat: { reducesNextDamageBy: 5 },
    icon: "dodge",
    iconTitle: "Dodge icon",
  },
} as const satisfies Record<string, ActionDef>;
