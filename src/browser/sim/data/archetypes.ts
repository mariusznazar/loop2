import type { SkillId } from "./skills.js";

export type ArchetypeDef = {
  name: string;
  /**
   * File name in assets/icons, without the extension: the sign of the archetype beside its name on
   * the screen Postać (D-446).
   */
  icon: string;
  /** Title of the icon, as its page on game-icons.net gives it; the section of credits names it. */
  iconTitle: string;
  /** The character skills the archetype lets a character learn. */
  predispositions: SkillId[];
};

export const ARCHETYPES = {
  elementalMage: {
    name: "Mag żywiołów",
    icon: "cultist",
    iconTitle: "Cultist icon",
    predispositions: [
      "exploration",
      "smallItemGathering",
      "campfireCrafting",
      "eating",
      "flameSpell",
      "oneHandedCombat",
      "kicking",
      "dodging",
      "tending",
    ],
  },
} as const satisfies Record<string, ArchetypeDef>;

export type ArchetypeId = keyof typeof ARCHETYPES;

/** The archetype of every character the player creates. */
export const CREATED_ARCHETYPE: ArchetypeId = "elementalMage";
