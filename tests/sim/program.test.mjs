import assert from "node:assert/strict";
import { test } from "node:test";
import { BALANCE } from "../../dist/public/sim/data/balance.js";
import { MAPS } from "../../dist/public/sim/data/maps.js";
import { sameHex } from "../../dist/public/sim/hex.js";
import {
  actionFeasible,
  chooseActivity,
  conditionHolds,
} from "../../dist/public/sim/program.js";
import { newMapRun } from "../../dist/public/sim/run.js";

const [mapId, map] = Object.entries(MAPS)[0];
// The id of a character of the team, which the map run carries.
const characterId = 1;
const [stick, berry] = map.resources.map((resource) => resource.id);

const ALWAYS = { kind: "always" };
const EXPLORE = { kind: "explore" };
const WANDER = { kind: "wander" };
const below = (resource, value) => ({ kind: "hereBelow", resource, value });
const walkTo = (resource) => ({ kind: "walkTo", resource });
const rule = (condition, action) => ({ condition, action });
const program = (...rules) => ({ rules });

/** A fresh map run of the first map at minute 0, its first activity chosen by `startProgram`. */
function freshRun(seed = 3, startProgram = program()) {
  return newMapRun(map, seed, startProgram, { mapId, characterId }).run;
}

/** The run with the character's tile replaced by `change(tile)`. */
function withHere(run, change) {
  return {
    ...run,
    tiles: run.tiles.map((tile) =>
      sameHex(tile.at, run.character.at) ? change({ ...tile }) : tile,
    ),
  };
}

/** The run with every tile revealed or not and without stock. */
function cleared(run, revealed) {
  return {
    ...run,
    tiles: run.tiles.map((tile) => ({ ...tile, revealed, stock: {} })),
  };
}

test("always holds", () => {
  assert.equal(conditionHolds(freshRun(), map, ALWAYS), true);
});

test("hereBelow reads 0 on an unrevealed tile, whatever lies there", () => {
  const run = withHere(freshRun(), (tile) => ({
    ...tile,
    revealed: false,
    stock: { [stick]: 12 },
  }));
  assert.equal(conditionHolds(run, map, below(stick, 1)), true);
});

test("hereBelow compares the true stock of a revealed tile", () => {
  const run = withHere(freshRun(), (tile) => ({
    ...tile,
    revealed: true,
    stock: { [stick]: 12 },
  }));
  assert.equal(conditionHolds(run, map, below(stick, 12)), false);
  assert.equal(conditionHolds(run, map, below(stick, 13)), true);
  assert.equal(
    conditionHolds(run, map, below(berry, 1)),
    true,
    "a lacking resource counts 0",
  );
});

test("hereBelow with N = 0 never holds", () => {
  const run = withHere(freshRun(), (tile) => ({
    ...tile,
    revealed: true,
    stock: {},
  }));
  assert.equal(conditionHolds(run, map, below(stick, 0)), false);
});

test("the first rule whose condition holds and whose action is feasible wins", () => {
  const run = freshRun();
  const chosen = chooseActivity(
    run,
    map,
    program(rule(ALWAYS, EXPLORE), rule(ALWAYS, WANDER)),
  );
  assert.deepEqual(chosen, { kind: "rule", ruleIndex: 0, action: EXPLORE });
});

test("a rule whose condition does not hold is skipped", () => {
  const run = freshRun();
  const chosen = chooseActivity(
    run,
    map,
    program(rule(below(stick, 0), WANDER), rule(ALWAYS, EXPLORE)),
  );
  assert.deepEqual(chosen, { kind: "rule", ruleIndex: 1, action: EXPLORE });
});

test("a rule whose action is not feasible is skipped", () => {
  const run = withHere(freshRun(), (tile) => ({ ...tile, revealed: true }));
  const chosen = chooseActivity(
    run,
    map,
    program(rule(ALWAYS, EXPLORE), rule(ALWAYS, WANDER)),
  );
  assert.deepEqual(chosen, { kind: "rule", ruleIndex: 1, action: WANDER });
});

test("with no applicable rule the character waits", () => {
  const run = cleared(freshRun(), true);
  assert.deepEqual(chooseActivity(run, map, program()), { kind: "wait" });
  assert.deepEqual(
    chooseActivity(
      run,
      map,
      program(rule(ALWAYS, EXPLORE), rule(ALWAYS, walkTo(stick))),
    ),
    {
      kind: "wait",
    },
  );
});

test("a wait lasts waitMinutes, one game minute", () => {
  assert.equal(BALANCE.waitMinutes, 1);
  const { run } = newMapRun(map, 3, program(), { mapId, characterId });
  assert.deepEqual(run.current, {
    activity: { kind: "wait" },
    startMinute: 0,
    endMinute: 1,
    stepTo: null,
  });
});

test("feasibility and choice do not draw from the wander generator", () => {
  const run = freshRun();
  const before = JSON.stringify(run);
  actionFeasible(run, map, WANDER);
  actionFeasible(run, map, WANDER);
  chooseActivity(run, map, program(rule(ALWAYS, WANDER)));
  chooseActivity(run, map, program(rule(ALWAYS, WANDER)));
  assert.equal(JSON.stringify(run), before);
});

test("the chosen action is a copy, not the program rule itself", () => {
  const rules = program(rule(ALWAYS, EXPLORE));
  const chosen = chooseActivity(freshRun(), map, rules);
  assert.notEqual(chosen.action, rules.rules[0].action);
});
