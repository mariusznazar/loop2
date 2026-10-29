import type { SkillId } from "./skills.js";

export type ArchetypeDef = {
  name: string;
  /** The character skills the archetype lets a character learn. */
  predispositions: SkillId[];
};

export const ARCHETYPES = {
  elementalMage: {
    name: "Mag żywiołów",
    predispositions: [
      "exploration",
      "smallItemGathering",
      "campfireCrafting",
      "eating",
      "flameSpell",
      "oneHandedCombat",
      "kicking",
      "dodging",
    ],
  },
} as const satisfies Record<string, ArchetypeDef>;

export type ArchetypeId = keyof typeof ARCHETYPES;

/** The archetype of every character the player creates. */
export const CREATED_ARCHETYPE: ArchetypeId = "elementalMage";
