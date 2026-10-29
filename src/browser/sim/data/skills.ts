import type { ActionId } from "./actions.js";

export type SkillDef = {
  /** Name shown to the player. */
  name: string;
  /** The actions, each a pair of verb and target, that the skill grows. */
  actions: ActionId[];
};

/**
 * The character skills. An action that no skill grows stands in none and is open to every
 * character: the walks "Wędruj", "Idź" and "Idź — ognisko".
 */
export const SKILLS = {
  exploration: { name: "Eksploracja", actions: ["explore"] },
  smallItemGathering: {
    name: "Zbieranie małych przedmiotów",
    actions: ["gather"],
  },
  campfireCrafting: {
    name: "Wytwarzanie ogniska",
    actions: ["craftCampfire", "feedCampfire"],
  },
  eating: { name: "Jedzenie", actions: ["eat"] },
  flameSpell: {
    name: "Rzucanie czaru Płomyk",
    actions: ["lightCampfire", "lightItem"],
  },
  oneHandedCombat: {
    name: "Walka bronią jednoręczną",
    actions: ["strikeWithStick"],
  },
  kicking: { name: "Kopanie", actions: ["kick"] },
  dodging: { name: "Unik przed ciosem", actions: ["dodge"] },
} as const satisfies Record<string, SkillDef>;

export type SkillId = keyof typeof SKILLS;
