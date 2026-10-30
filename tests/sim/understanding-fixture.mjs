import { ACTIONS } from "../../dist/public/sim/data/actions.js";
import { CAMPFIRE } from "../../dist/public/sim/data/campfire.js";
import { CONDITIONS } from "../../dist/public/sim/data/conditions.js";
import { CREATURES } from "../../dist/public/sim/data/creatures.js";
import { ITEMS } from "../../dist/public/sim/data/items.js";
import { SKILLS } from "../../dist/public/sim/data/skills.js";
import { newGame } from "../../dist/public/sim/game.js";

/**
 * An Understanding that holds everything the data lists: every action, every condition, every
 * item and the campfire. Read from the data, so it stays full as the data grows.
 */
export function fullUnderstanding() {
  return {
    trees: Object.keys(SKILLS),
    actions: Object.keys(ACTIONS),
    conditions: Object.keys(CONDITIONS),
    items: [...Object.keys(ITEMS), CAMPFIRE.id],
    creatures: Object.keys(CREATURES),
  };
}

/** A new game whose Understanding holds everything: the start of a test of the other rules. */
export function newKnowingGame() {
  return { ...newGame(), understanding: fullUnderstanding() };
}
