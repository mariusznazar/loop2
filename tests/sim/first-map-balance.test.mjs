import assert from "node:assert/strict";
import { test } from "node:test";
import { ACTIONS } from "../../dist/browser/sim/data/actions.js";
import { CONDITIONS } from "../../dist/browser/sim/data/conditions.js";
import {
  advanceMinutes,
  createCharacter,
  send,
  setProgram,
} from "../../dist/browser/sim/game.js";
import { forestDecent, forestNaive } from "./reference-programs.mjs";
import { newKnowingGame } from "./understanding-fixture.mjs";

// What a player who writes a program must be able to rely on in the first map: a loss there is a
// fault of the program. On Skraj lasu a decent program solves the map on at least 95 % of the seeds
// named here and a naive one, which never leaves the entrance tile, on at most half of them. The
// map runs start from a game whose Understanding holds everything, so every action and condition
// of the closed lists is at hand. The seeds are the 500 sends at consecutive real moments from
// FIRST_REAL_MS, one millisecond apart.

const mapId = "forestEdge";
const SENT = { mapId, characterId: 1 };
const FIRST_REAL_MS = 1760000000000;
const SEED_COUNT = 500;
/**
 * A streak that a loss of health breaks starts again, so a map run ends in a completion or a death
 * long after minute 480. A map run still open after this many game minutes counts as not solved.
 */
const MINUTES = 5000;

/** How many of the named seeds the program solves Skraj lasu on, each map run played from the entrance. */
function solvedSeeds(program) {
  const ready = createCharacter(
    setProgram(newKnowingGame(), program).state,
    "Ala",
  ).state;
  let solved = 0;
  for (let index = 0; index < SEED_COUNT; index += 1) {
    const sent = send(ready, SENT, FIRST_REAL_MS + index).state;
    const { run } = advanceMinutes(sent, MINUTES).state;
    if (run.completion !== null) solved += 1;
  }
  return solved;
}

test("precondition: the game these map runs start from holds every action and condition of the closed lists and no solved map", () => {
  const { understanding, solvedMaps } = newKnowingGame();
  assert.deepEqual(
    Object.keys(ACTIONS).filter((a) => !understanding.actions.includes(a)),
    [],
  );
  assert.deepEqual(
    Object.keys(CONDITIONS).filter(
      (c) => !understanding.conditions.includes(c),
    ),
    [],
  );
  assert.deepEqual(solvedMaps, []);
});

test("precondition: the two programs have the six and the twelve rules they are named for", () => {
  assert.equal(forestNaive.groups[0].rules.length, 6);
  assert.equal(forestDecent.groups[0].rules.length, 12);
});

test("a map run on each of the named seeds takes its own seed", () => {
  const ready = createCharacter(newKnowingGame(), "Ala").state;
  const seeds = new Set();
  for (let index = 0; index < SEED_COUNT; index += 1) {
    seeds.add(send(ready, SENT, FIRST_REAL_MS + index).state.run.seed);
  }
  assert.equal(seeds.size, SEED_COUNT);
});

// invariant: first-map-balance
test("on Skraj lasu the decent program solves the map on at least 95 % of the named seeds", () => {
  const solved = solvedSeeds(forestDecent);
  assert.ok(
    solved >= 0.95 * SEED_COUNT,
    `solved ${solved} of ${SEED_COUNT} seeds`,
  );
});

// invariant: first-map-balance
test("on Skraj lasu the naive program solves the map on at most half of the named seeds", () => {
  const solved = solvedSeeds(forestNaive);
  assert.ok(
    solved <= 0.5 * SEED_COUNT,
    `solved ${solved} of ${SEED_COUNT} seeds`,
  );
});
