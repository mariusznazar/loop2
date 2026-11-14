import assert from "node:assert/strict";
import { test } from "node:test";
import { ACTIONS } from "../../dist/browser/sim/data/actions.js";
import {
  advanceMinutes,
  createCharacter,
  newGame,
  send,
  setProgram,
} from "../../dist/browser/sim/game.js";
import { programWithRules } from "./program-fixture.mjs";
import { newKnowingGame } from "./understanding-fixture.mjs";

// The first pass of a new account on the first map: a program written from the start, on an
// account with nothing discovered yet, solves Skraj lasu on at least as many seeds as the same
// program on an account with everything discovered. The map runs start from the entrance. The seeds
// are the first 300 sends at consecutive real moments from FIRST_REAL_MS, one millisecond apart, as
// in tests/sim/first-map-balance.test.mjs.

const mapId = "forestEdge";
const SENT = { mapId, characterId: 1 };
const FIRST_REAL_MS = 1760000000000;
const SEED_COUNT = 300;
/**
 * A streak that a loss of health breaks starts again, so a map run ends in a completion or a death
 * long after minute 480. A map run still open after this many game minutes counts as not solved.
 */
const MINUTES = 5000;

const ALWAYS = { kind: "always" };
const satietyBelow = (value) => ({ kind: "satietyBelow", value });
const temperatureBelow = (value) => ({ kind: "temperatureBelow", value });
const itemBelow = (item, value) => ({ kind: "itemBelow", item, value });
const gather = (resource) => ({ kind: "gather", resource });
const walkTo = (resource) => ({ kind: "walkTo", resource });
const rule = (condition, action) => ({ condition, action });
const group = (id, name, condition, rules) => ({ id, name, condition, rules });

const STICK = "stick";
const BERRY = "berry";
const EXPLORE = { kind: "explore" };
const WANDER = { kind: "wander" };

/**
 * A program of 21 rules in 5 groups with an empty take list: it eats, keeps a campfire and goes
 * back to it when cold, and looks for sticks and berries when low, exploring and wandering when
 * there is nothing known to go to.
 */
const BEST_PROGRAM = (() => {
  const rules = [
    // „Jedzenie”, when „Zawsze”.
    rule(satietyBelow(75), { kind: "eat" }),
    // „Głód”, when „Sytość poniżej 65 %”.
    rule(itemBelow(BERRY, 1), gather(BERRY)),
    rule(itemBelow(BERRY, 1), walkTo(BERRY)),
    // „Szukaj jedzenia”, when „Sytość poniżej 60 %”.
    rule(itemBelow(BERRY, 1), EXPLORE),
    rule(itemBelow(BERRY, 1), WANDER),
    // „Zimno”, when „Temperatura poniżej 36 °C”.
    rule(ALWAYS, { kind: "lightCampfire" }),
    rule(itemBelow(STICK, 2), gather(STICK)),
    rule(itemBelow(STICK, 2), walkTo(STICK)),
    rule(ALWAYS, { kind: "walkToCampfire" }),
    rule(ALWAYS, { kind: "craftCampfire" }),
    rule(itemBelow(STICK, 6), gather(STICK)),
    rule(itemBelow(STICK, 6), walkTo(STICK)),
    // „Zapasy”, when „Zawsze”.
    rule(itemBelow(STICK, 2), gather(STICK)),
    rule(itemBelow(BERRY, 2), gather(BERRY)),
    rule(itemBelow(STICK, 8), gather(STICK)),
    rule(itemBelow(BERRY, 4), gather(BERRY)),
    rule(itemBelow(STICK, 2), walkTo(STICK)),
    rule(itemBelow(BERRY, 2), walkTo(BERRY)),
    rule(ALWAYS, EXPLORE),
    rule(itemBelow(STICK, 2), WANDER),
    rule(itemBelow(BERRY, 2), WANDER),
  ];
  const numbered = rules.map((each, index) => ({ ...each, id: index + 1 }));
  const grouped = [
    group(1, "Jedzenie", ALWAYS, numbered.slice(0, 1)),
    group(2, "Głód", satietyBelow(65), numbered.slice(1, 3)),
    group(3, "Szukaj jedzenia", satietyBelow(60), numbered.slice(3, 5)),
    group(4, "Zimno", temperatureBelow(36), numbered.slice(5, 12)),
    group(5, "Zapasy", ALWAYS, numbered.slice(12)),
  ];
  return {
    ...programWithRules([]),
    groups: grouped,
    nextGroupId: 6,
    nextRuleId: 22,
  };
})();

/**
 * How many of the named seeds the program solves Skraj lasu on from `game`, each map run played
 * from the entrance. A discovery stops the span it falls in, so the map run goes on from there.
 */
function solvedSeeds(game, program) {
  const ready = createCharacter(setProgram(game, program).state, "Ala").state;
  let solved = 0;
  for (let index = 0; index < SEED_COUNT; index += 1) {
    let state = send(ready, SENT, FIRST_REAL_MS + index).state;
    while (
      state.run.completion === null &&
      state.run.death === null &&
      state.run.minute < MINUTES
    ) {
      state = advanceMinutes(state, MINUTES - state.run.minute).state;
    }
    if (state.run.completion !== null) solved += 1;
  }
  return solved;
}

test("precondition: the program has the 21 rules in 5 groups it is named for, and an empty take list", () => {
  assert.equal(BEST_PROGRAM.groups.length, 5);
  assert.deepEqual(
    BEST_PROGRAM.groups.map((each) => each.rules.length),
    [1, 2, 2, 7, 9],
  );
  assert.deepEqual(BEST_PROGRAM.tripPlan, { take: [], bring: [] });
  assert.equal(
    BEST_PROGRAM.groups
      .flatMap((each) => each.rules)
      .filter((each) => each.action.kind === "explore").length,
    2,
  );
});

test("precondition: the new account knows „Eksploruj” and none of the other actions, the other account all of them", () => {
  assert.deepEqual(newGame().understanding.actions, ["explore"]);
  assert.deepEqual(
    Object.keys(ACTIONS).filter(
      (kind) => !newKnowingGame().understanding.actions.includes(kind),
    ),
    [],
  );
});

// invariant: new-account-first-pass
test("on Skraj lasu the best program solves the first pass of an account with nothing discovered on at least as many of the 300 named seeds as on an account with everything discovered", () => {
  const knowing = solvedSeeds(newKnowingGame(), BEST_PROGRAM);
  const fresh = solvedSeeds(newGame(), BEST_PROGRAM);
  assert.ok(
    fresh >= knowing,
    `the new account solved ${fresh} of ${SEED_COUNT} seeds, the account with everything discovered ${knowing}`,
  );
});
