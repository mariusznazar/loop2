import type { Revelation } from "./revelations.js";

export type ActionDef = {
  label: string;
  /** Status text; for walkTo the resource name follows it. */
  status: string;
  /** Fixed duration in game minutes; null = taken from the target tile. */
  minutes: number | null;
  /** The event that reveals the action to the player. */
  revealedBy: Revelation;
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
  },
  wander: {
    label: "Wędruj",
    status: "Wędruje",
    minutes: null,
    revealedBy: { kind: "chilled" },
  },
  walkTo: {
    label: "Idź",
    status: "Idzie po",
    minutes: null,
    revealedBy: { kind: "explored" },
  },
  walkToCampfire: {
    label: "Idź — ognisko",
    status: "Idzie do ogniska",
    minutes: null,
    revealedBy: { kind: "campfireCrafted" },
  },
  gather: {
    label: "Zbierz",
    status: "Zbiera",
    minutes: 10,
    revealedBy: { kind: "explored" },
  },
  craftCampfire: {
    label: "Wytwórz — ognisko",
    status: "Wytwarza ognisko",
    minutes: 20,
    revealedBy: { kind: "gathered", item: "stick" },
  },
  lightCampfire: {
    label: "Zapal — ognisko",
    status: "Zapala ognisko",
    minutes: 5,
    revealedBy: { kind: "gathered", item: "stick" },
  },
  lightItem: {
    label: "Zapal — patyk",
    status: "Zapala patyk",
    minutes: 5,
    revealedBy: { kind: "gathered", item: "stick" },
  },
  feedCampfire: {
    label: "Zasil — ognisko",
    status: "Zasila ognisko",
    minutes: 5,
    revealedBy: { kind: "lit" },
  },
  eat: {
    label: "Zjedz — jagoda",
    status: "Je jagodę",
    minutes: 5,
    revealedBy: { kind: "gathered", item: "berry" },
  },
} as const satisfies Record<string, ActionDef>;
