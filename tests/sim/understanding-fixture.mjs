import { ACTIONS } from "../../dist/public/sim/data/actions.js";
import { CAMPFIRE } from "../../dist/public/sim/data/campfire.js";
import { CONDITIONS } from "../../dist/public/sim/data/conditions.js";
import { ITEMS } from "../../dist/public/sim/data/items.js";
import { newGame } from "../../dist/public/sim/game.js";

/**
 * An Understanding that holds everything the data lists: every action, every condition, every
 * item and the campfire. Read from the data, so it stays full as the data grows.
 */
export function fullUnderstanding() {
  return {
    actions: Object.keys(ACTIONS),
    conditions: Object.keys(CONDITIONS),
    items: [...Object.keys(ITEMS), CAMPFIRE.id],
  };
}

/** A new game whose Understanding holds everything: the start of a test of the other rules. */
export function newKnowingGame() {
  return { ...newGame(), understanding: fullUnderstanding() };
}
