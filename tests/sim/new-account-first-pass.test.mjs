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
import { forestBest } from "./reference-programs.mjs";
import { newKnowingGame } from "./understanding-fixture.mjs";

// The first pass of a new account on the first map: a program written from the start, on an
// account with nothing discovered yet, solves Skraj lasu on at least ACCEPTED_SEEDS of the 300 named
// seeds. The figure is the measurement the human accepted for now (D-404), to be revised when the
// balance is worked on. The account with everything discovered is played on the same seeds and its
// count is reported beside the other, for that revision; it is not asserted. The map runs start from
// the entrance. The seeds are the first 300 sends at consecutive real moments from FIRST_REAL_MS,
// one millisecond apart, as in tests/sim/first-map-balance.test.mjs.

const mapId = "forestEdge";
const SENT = { mapId, characterId: 1 };
const FIRST_REAL_MS = 1760000000000;
const SEED_COUNT = 300;
/** The least number of the named seeds the new account must solve (D-404). */
const ACCEPTED_SEEDS = 289;
/**
 * A streak that a loss of health breaks starts again, so a map run ends in a completion or a death
 * long after minute 480. A map run still open after this many game minutes counts as not solved.
 */
const MINUTES = 5000;

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

test("precondition: the program has the 21 rules in 5 groups it is named for, and takes nothing from the chest", () => {
  assert.equal(forestBest.groups.length, 5);
  assert.deepEqual(
    forestBest.groups.map((each) => each.rules.length),
    [1, 2, 2, 7, 9],
  );
  assert.deepEqual(forestBest.tripPlan.take, []);
  assert.equal(
    forestBest.groups
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
test("on Skraj lasu the best program solves the first pass of an account with nothing discovered on at least the accepted number of the 300 named seeds", () => {
  const knowing = solvedSeeds(newKnowingGame(), forestBest);
  const fresh = solvedSeeds(newGame(), forestBest);
  assert.ok(
    fresh >= ACCEPTED_SEEDS,
    `the new account solved ${fresh} of ${SEED_COUNT} seeds, fewer than the ${ACCEPTED_SEEDS} accepted; the account with everything discovered solved ${knowing}`,
  );
});
