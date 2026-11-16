import type { Condition } from "../types.js";

export type CreatureAction = { kind: "strike" } | { kind: "dodge" };

export type CreatureRule = {
  condition: Condition;
  action: CreatureAction;
};

export type CreatureDef = {
  name: string;
  /** File name in assets/icons, without the extension. */
  icon: string;
  /** Title of the icon, as its page on game-icons.net gives it; the section of credits names it. */
  iconTitle: string;
  /** The event that reveals the creature to the player. */
  revealedBy: { kind: "attacked"; creature: string };
  health: number;
  strikeDamage: number;
  rules: readonly CreatureRule[];
};

/** The creatures that can attack the character, with their ordered combat rules. */
export const CREATURES = {
  wolf: {
    name: "wilk",
    icon: "wolf-head",
    iconTitle: "Wolf head icon",
    revealedBy: { kind: "attacked", creature: "wolf" },
    health: 24,
    strikeDamage: 7,
    rules: [
      {
        condition: { kind: "healthBelow", value: 8 },
        action: { kind: "dodge" },
      },
      { condition: { kind: "always" }, action: { kind: "strike" } },
    ],
  },
} as const satisfies Record<string, CreatureDef>;

export type CreatureId = keyof typeof CREATURES;
