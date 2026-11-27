import type { ActionId } from "./actions.js";
import type { ItemId } from "./items.js";
import type { Revelation } from "./revelations.js";

/**
 * A pair of verb and target that a character skill grows (D-193): an action and, for an action that
 * takes an item as its target, optionally that item. A pair with no item covers every target of its
 * verb.
 */
export type GrownPair = {
  action: ActionId;
  item?: ItemId;
};

export type SkillDef = {
  /** Name shown to the player. */
  name: string;
  /** The pairs of verb and target that the skill grows. */
  grownBy: readonly GrownPair[];
  thresholds: readonly number[];
  /**
   * The event that reveals the skill's tree where its first pair is no event of its own: present
   * only for a skill whose first action the Understanding holds from the start of a new game. A
   * tree of any other skill enters the Understanding with the first pair it grows.
   */
  revealedBy?: Revelation;
};

/**
 * The character skills. An action whose pair no skill grows stands in none and is open to every
 * character: the walks "Wędruj", "Idź" and "Idź — ognisko".
 */
const skills = {
  exploration: {
    name: "Eksploracja",
    grownBy: [{ action: "explore" }],
    thresholds: [15, 45, 100, 200],
    revealedBy: { kind: "explored" },
  },
  smallItemGathering: {
    name: "Zbieranie małych przedmiotów",
    grownBy: [{ action: "gather" }, { action: "patrol" }],
    thresholds: [30, 80, 160, 280, 450],
  },
  campfireCrafting: {
    name: "Wytwarzanie ogniska",
    grownBy: [{ action: "craftCampfire" }, { action: "feedCampfire" }],
    thresholds: [20, 55, 110, 190],
  },
  eating: {
    name: "Jedzenie",
    grownBy: [{ action: "eat" }],
    thresholds: [15, 40, 80],
  },
  flameSpell: {
    name: "Rzucanie czaru Płomyk",
    grownBy: [{ action: "lightCampfire" }, { action: "lightItem" }],
    thresholds: [2, 6, 14],
  },
  oneHandedCombat: {
    name: "Walka bronią jednoręczną",
    grownBy: [{ action: "strikeWithStick" }],
    thresholds: [15, 40, 100, 300],
  },
  kicking: {
    name: "Kopanie",
    grownBy: [{ action: "kick" }],
    thresholds: [10, 30],
  },
  dodging: {
    name: "Unik przed ciosem",
    grownBy: [{ action: "dodge" }],
    thresholds: [4, 15],
  },
  tending: {
    name: "Opatrywanie małych ran",
    grownBy: [
      { action: "craft", item: "bandage" },
      { action: "tend", item: "bandage" },
    ],
    thresholds: [10, 28, 60, 110],
  },
} as const;

export type SkillId = keyof typeof skills;
export const SKILLS = skills satisfies Record<string, SkillDef>;

export type BranchEffect =
  | { kind: "duration"; actions: readonly ActionId[]; amount: number }
  | { kind: "damage"; actions: readonly ActionId[]; amount: number }
  | {
      kind:
        | "gatherChance"
        | "gatherAmount"
        | "fuel"
        | "reduction"
        | "healing"
        | "healthRegain";
      amount: number;
    }
  | { kind: "cleanFlame" | "scout" }
  | { kind: "action"; action: ActionId };

export type BranchDef = {
  skill: SkillId;
  name: string;
  description: string;
  costs: readonly number[];
  effect: BranchEffect;
  /** Numeric preview: its initial value, change per rank and displayed unit. */
  preview?: { base: number; step: number; unit: string; minimum?: number };
};

export const BRANCHES = {
  keenEye: {
    skill: "smallItemGathering",
    name: "Wprawne oko",
    description: "Większa szansa zebrania przedmiotu",
    costs: [1, 1, 1],
    effect: { kind: "gatherChance", amount: 0.05 },
    preview: { base: 70, step: 5, unit: "%" },
  },
  fullHand: {
    skill: "smallItemGathering",
    name: "Pełna garść",
    description: "Więcej sztuk przy udanym zbieraniu",
    costs: [3],
    effect: { kind: "gatherAmount", amount: 1 },
    preview: { base: 1, step: 1, unit: "szt." },
  },
  patrol: {
    skill: "smallItemGathering",
    name: "Obchód",
    description: "Zbiera do 12 sztuk bez losowania przez 40 minut",
    costs: [3],
    effect: { kind: "action", action: "patrol" },
  },
  carefulFeeding: {
    skill: "campfireCrafting",
    name: "Oszczędne dorzucanie",
    description: "Dłuższe palenie po dorzuceniu patyka",
    costs: [1, 1, 2],
    effect: { kind: "fuel", amount: 5 },
    preview: { base: 20, step: 5, unit: "min" },
  },
  neatConstruction: {
    skill: "campfireCrafting",
    name: "Zgrabna konstrukcja",
    description: "Krótsze wytwarzanie ogniska",
    costs: [1, 2, 2],
    effect: { kind: "duration", actions: ["craftCampfire"], amount: 5 },
    preview: { base: 20, step: -5, unit: "min", minimum: 1 },
  },
  quickHand: {
    skill: "flameSpell",
    name: "Szybka ręka",
    description: "Krótsze rzucanie Płomyka",
    costs: [1, 1, 1],
    effect: {
      kind: "duration",
      actions: ["lightCampfire", "lightItem"],
      amount: 1,
    },
    preview: { base: 5, step: -1, unit: "min", minimum: 1 },
  },
  cleanFlame: {
    skill: "flameSpell",
    name: "Czysty płomień",
    description: "Zapala ognisko bez zużywania patyków",
    costs: [3],
    effect: { kind: "cleanFlame" },
  },
  practicedStep: {
    skill: "exploration",
    name: "Wprawny krok",
    description: "Krótsza eksploracja",
    costs: [1, 1, 1],
    effect: { kind: "duration", actions: ["explore"], amount: 3 },
    preview: { base: 20, step: -3, unit: "min", minimum: 1 },
  },
  longStep: {
    skill: "exploration",
    name: "Długi krok",
    description: "Krótsze przejście między polami",
    costs: [1, 1, 2],
    effect: {
      kind: "duration",
      actions: ["wander", "walkTo", "walkToCampfire"],
      amount: 2,
    },
    preview: { base: 5, step: -2, unit: "min", minimum: 1 },
  },
  scout: {
    skill: "exploration",
    name: "Zwiad",
    description: "Odkrywa również sąsiednie pola",
    costs: [3],
    effect: { kind: "scout" },
  },
  strongerStrike: {
    skill: "oneHandedCombat",
    name: "Mocniejszy cios",
    description: "Większe obrażenia patykiem",
    costs: [1, 1, 1, 1],
    effect: { kind: "damage", actions: ["strikeWithStick"], amount: 2 },
    preview: { base: 6, step: 2, unit: "obrażeń" },
  },
  heavierKick: {
    skill: "kicking",
    name: "Cięższy kop",
    description: "Większe obrażenia kopnięciem",
    costs: [1, 1],
    effect: { kind: "damage", actions: ["kick"], amount: 1 },
    preview: { base: 3, step: 1, unit: "obrażeń" },
  },
  agileDodge: {
    skill: "dodging",
    name: "Zwinny odskok",
    description: "Większa redukcja obrażeń kolejnego ciosu",
    costs: [1, 1],
    effect: { kind: "reduction", amount: 1 },
    preview: { base: 5, step: 1, unit: "obrażeń" },
  },
  quickMeal: {
    skill: "eating",
    name: "Szybki posiłek",
    description: "Krótsze jedzenie",
    costs: [1, 1, 1],
    effect: { kind: "duration", actions: ["eat"], amount: 1 },
    preview: { base: 5, step: -1, unit: "min", minimum: 1 },
  },
  strongerRoll: {
    skill: "tending",
    name: "Mocniejszy zwój",
    description: "Opatrunek leczy więcej.",
    costs: [1, 1, 2],
    effect: { kind: "healing", amount: 5 },
    preview: { base: 25, step: 5, unit: "zdrowia" },
  },
  deftHand: {
    skill: "tending",
    name: "Wprawna dłoń",
    description: "Opatrujesz szybciej.",
    costs: [1, 1, 2],
    effect: { kind: "duration", actions: ["tend"], amount: 2 },
    preview: { base: 10, step: -2, unit: "min", minimum: 1 },
  },
  quickHealing: {
    skill: "tending",
    name: "Szybkie gojenie",
    description: "Rany schodzą same szybciej — cecha, działa zawsze.",
    costs: [2, 3],
    effect: { kind: "healthRegain", amount: 0.05 },
    preview: { base: 0.05, step: 0.05, unit: "zdrowia na minutę" },
  },
} as const satisfies Record<string, BranchDef>;

export type BranchId = keyof typeof BRANCHES;
export const MINIMUM_ACTION_MINUTES = 1;
export const PATROL_LIMIT = 12;
