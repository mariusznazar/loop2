import type { ActionId } from "./actions.js";

export type SkillDef = {
  /** Name shown to the player. */
  name: string;
  /** The actions, each a pair of verb and target, that the skill grows. */
  actions: readonly ActionId[];
  thresholds: readonly number[];
};

/**
 * The character skills. An action that no skill grows stands in none and is open to every
 * character: the walks "Wędruj", "Idź" and "Idź — ognisko".
 */
const skills = {
  exploration: {
    name: "Eksploracja",
    actions: ["explore"],
    thresholds: [15, 45, 100, 200],
  },
  smallItemGathering: {
    name: "Zbieranie małych przedmiotów",
    actions: ["gather", "patrol"],
    thresholds: [30, 80, 160, 280, 450],
  },
  campfireCrafting: {
    name: "Wytwarzanie ogniska",
    actions: ["craftCampfire", "feedCampfire"],
    thresholds: [20, 55, 110, 190],
  },
  eating: { name: "Jedzenie", actions: ["eat"], thresholds: [15, 40, 80] },
  flameSpell: {
    name: "Rzucanie czaru Płomyk",
    actions: ["lightCampfire", "lightItem"],
    thresholds: [2, 6, 14],
  },
  oneHandedCombat: {
    name: "Walka bronią jednoręczną",
    actions: ["strikeWithStick"],
    thresholds: [30, 90, 200],
  },
  kicking: { name: "Kopanie", actions: ["kick"], thresholds: [20] },
  dodging: {
    name: "Unik przed ciosem",
    actions: ["dodge"],
    thresholds: [10, 30],
  },
} as const;

export type SkillId = keyof typeof skills;
export const SKILLS = skills satisfies Record<string, SkillDef>;

export type BranchEffect =
  | { kind: "duration"; actions: readonly ActionId[]; amount: number }
  | { kind: "damage"; actions: readonly ActionId[]; amount: number }
  | {
      kind: "gatherChance" | "gatherAmount" | "fuel" | "reduction";
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
    costs: [1, 1, 1],
    effect: { kind: "damage", actions: ["strikeWithStick"], amount: 2 },
    preview: { base: 6, step: 2, unit: "obrażeń" },
  },
  heavierKick: {
    skill: "kicking",
    name: "Cięższy kop",
    description: "Większe obrażenia kopnięciem",
    costs: [1, 1, 1],
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
} as const satisfies Record<string, BranchDef>;

export type BranchId = keyof typeof BRANCHES;
export const MINIMUM_ACTION_MINUTES = 1;
export const PATROL_LIMIT = 12;
