import type { Condition } from "../types.js";

export type CreatureAction = { kind: "strike" } | { kind: "dodge" };

export type CreatureRule = {
  condition: Condition;
  action: CreatureAction;
};

export type CreatureDef = {
  name: string;
  health: number;
  strikeDamage: number;
  rules: readonly CreatureRule[];
};

/** The creatures that can attack the character, with their ordered combat rules. */
export const CREATURES = {
  wolf: {
    name: "wilk",
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
