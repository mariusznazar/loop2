import type { Revelation } from "./revelations.js";

export type ConditionDef = {
  label: string;
  unit?: string;
  /**
   * Present only for a condition that takes a number: the number a new condition starts with,
   * and the range and step of the numbers it takes, counted from `min`.
   */
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  /** The event that reveals the condition; absent for a condition known from the start of a new game. */
  revealedBy?: Revelation;
};

/**
 * The closed list of conditions. „Tu leży mniej niż” names a resource of the map, „Zapas poniżej”
 * an item of the backpack; the conditions on the campfire name none — the simulation reads the
 * nearest campfire, or the one on the character's tile.
 */
export const CONDITIONS = {
  always: { label: "Zawsze" },
  hereBelow: {
    label: "Tu leży mniej niż",
    revealedBy: { kind: "explored" },
    unit: "szt.",
    defaultValue: 1,
    min: 0,
    max: 50,
    step: 1,
  },
  temperatureBelow: {
    label: "Temperatura poniżej",
    revealedBy: { kind: "chilled" },
    unit: "°C",
    defaultValue: 36.5,
    min: 30.0,
    max: 37.0,
    step: 0.1,
  },
  satietyBelow: {
    label: "Sytość poniżej",
    revealedBy: { kind: "gathered", item: "berry" },
    unit: "%",
    defaultValue: 50,
    min: 0,
    max: 100,
    step: 1,
  },
  itemBelow: {
    label: "Zapas poniżej",
    revealedBy: { kind: "explored" },
    unit: "szt.",
    defaultValue: 8,
    min: 0,
    max: 50,
    step: 1,
  },
  campfireLeftBelow: {
    label: "Zostało mniej niż — ognisko",
    revealedBy: { kind: "campfireCrafted" },
    unit: "min",
    defaultValue: 20,
    min: 0,
    max: 120,
    step: 1,
  },
  healthBelow: {
    label: "Zdrowie poniżej",
    revealedBy: { kind: "attacked", creature: "wolf" },
    unit: "pkt",
    defaultValue: 50,
    min: 0,
    max: 100,
    step: 1,
  },
  opponentHealthBelow: {
    label: "Przeciwnik ma poniżej",
    revealedBy: { kind: "attacked", creature: "wolf" },
    unit: "pkt",
    defaultValue: 10,
    min: 0,
    max: 100,
    step: 1,
  },
  awayFromCampfire: {
    label: "Z dala od — ognisko",
    revealedBy: { kind: "campfireCrafted" },
  },
} as const satisfies Record<string, ConditionDef>;
