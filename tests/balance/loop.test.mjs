import assert from "node:assert/strict";
import { test } from "node:test";
import { resurrectionAt } from "../../dist/browser/sim/game.js";
import {
  LOOP_START_MS,
  loopBalance,
  loopOnce,
  loopSweep,
} from "../../balance/loop.mjs";
import { buildGear, runOnce } from "../../balance/engine.mjs";
import { parseArgs, runCommand } from "../../balance/cli.mjs";
import { forestBest, forestLoopWithStock } from "../sim/reference-programs.mjs";

// The loop mode of the instrument, checked against relations the loop code does not compute: a loop
// of zero hours leaves the chest as the take list left it, the counts of one loop agree with each
// other and with the chest, and the summary per checkpoint agrees with the readings it sums. The
// resurrection is read through the game's own `resurrectionAt`, which holds the uses and the clock.

/** The real time one use of the resurrection takes to return: four hours, the game's start value. */
const RENEWAL_MS = 4 * 60 * 60 * 1000;

/** The sum of the counts of a record of pieces, an item with no count left out. */
function total(pieces) {
  return Object.values(pieces).reduce((sum, count) => sum + count, 0);
}

/** The record of pieces without the items it holds no piece of. */
function present(pieces) {
  return Object.fromEntries(
    Object.entries(pieces).filter(([, count]) => count > 0),
  );
}

test("a loop of zero hours starts one map run and leaves the chest with what the take list did not take", () => {
  const chest = { stick: 8, berry: 7 };
  const once = loopOnce({
    mapId: "forest",
    program: forestLoopWithStock,
    seed: 1,
    chest,
    checkpoints: [0],
  });
  const [reading] = once.readings;
  const taken = runOnce({
    mapId: "forest",
    program: forestLoopWithStock,
    seed: 1,
    chest,
  }).taken;
  assert.equal(reading.alive, true);
  assert.equal(reading.runNumber, 1);
  assert.equal(reading.completed, 0);
  assert.deepEqual(
    present(reading.chest),
    present(
      Object.fromEntries(
        Object.keys(chest).map((item) => [
          item,
          chest[item] - (taken[item] ?? 0),
        ]),
      ),
    ),
  );
});

test("on each seed the readings of a loop never fall in completions or in the count of its map runs", () => {
  for (const seed of [1, 2, 3]) {
    const { readings } = loopOnce({
      mapId: "forest",
      program: forestBest,
      seed,
      checkpoints: [1, 8, 24],
    });
    assert.equal(readings[0].alive, true, `seed ${seed}`);
    for (let index = 1; index < readings.length; index += 1) {
      const before = readings[index - 1];
      const after = readings[index];
      if (!after.alive) continue;
      assert.ok(after.completed >= (before.completed ?? 0), `seed ${seed}`);
      assert.ok(after.runNumber >= (before.runNumber ?? 1), `seed ${seed}`);
    }
    const last = readings.at(-1);
    if (last.alive) assert.ok(last.runNumber - 1 >= last.completed);
  }
});

test("the loop balance of each seed agrees with the game's own count: completions and the final chest", () => {
  const seeds = [1, 2, 3];
  const { perSeed } = loopBalance({
    mapId: "forest",
    program: forestLoopWithStock,
    seeds,
    chest: { stick: 8, berry: 7 },
    hours: 24,
  });
  seeds.forEach((seed, index) => {
    const [reading] = loopOnce({
      mapId: "forest",
      program: forestLoopWithStock,
      seed,
      chest: { stick: 8, berry: 7 },
      checkpoints: [24],
    }).readings;
    const counted = perSeed[index];
    assert.equal(counted.completed, reading.completed ?? 0, `seed ${seed}`);
    assert.equal(
      total(reading.chest),
      total({ stick: 8, berry: 7 }) - counted.taken + counted.put,
      `seed ${seed}`,
    );
  });
});

test("the balance of a loop of zero hours is one map run that took its pieces and put none", () => {
  const { perSeed } = loopBalance({
    mapId: "forest",
    program: forestLoopWithStock,
    seeds: [1],
    chest: { stick: 8, berry: 7 },
    hours: 0,
  });
  const taken = runOnce({
    mapId: "forest",
    program: forestLoopWithStock,
    seed: 1,
    chest: { stick: 8, berry: 7 },
  }).taken;
  assert.equal(perSeed[0].mapRuns, 1);
  assert.equal(perSeed[0].ended, 0);
  assert.equal(perSeed[0].deaths, 0);
  assert.equal(perSeed[0].put, 0);
  assert.equal(perSeed[0].taken, total(taken));
});

// decision: D-428 "The earning loop of the map check and the command of the loop start with the full number of uses of the resurrection"
test("a loop that starts with the resurrection ready starts with its full stock of three uses", () => {
  const { finalState } = loopOnce({
    mapId: "forest",
    program: forestLoopWithStock,
    seed: 1,
    chest: { stick: 8, berry: 7 },
    checkpoints: [0],
  });
  assert.deepEqual(resurrectionAt(finalState.team, LOOP_START_MS), {
    usesLeft: 3,
    nextReturnMs: null,
  });
});

// decision: D-428 "The earning loop of the map check and the command of the loop start with the full number of uses of the resurrection, the switch `--no-resurrection` starts the loop with every use spent and the clock of the returns started at the start of the loop"
test("a loop with the resurrection not ready starts with every use spent, and the first use returns four hours after the loop's start", () => {
  const { finalState } = loopOnce({
    mapId: "forest",
    program: forestLoopWithStock,
    seed: 1,
    chest: { stick: 8, berry: 7 },
    checkpoints: [0],
    resurrectionReady: false,
  });
  const { team } = finalState;
  assert.deepEqual(resurrectionAt(team, LOOP_START_MS), {
    usesLeft: 0,
    nextReturnMs: LOOP_START_MS + RENEWAL_MS,
  });
  assert.deepEqual(resurrectionAt(team, LOOP_START_MS + RENEWAL_MS - 1), {
    usesLeft: 0,
    nextReturnMs: LOOP_START_MS + RENEWAL_MS,
  });
  assert.deepEqual(resurrectionAt(team, LOOP_START_MS + RENEWAL_MS), {
    usesLeft: 1,
    nextReturnMs: LOOP_START_MS + 2 * RENEWAL_MS,
  });
});

test("the summary per checkpoint counts the seeds and takes its stopped share from the readings it sums", () => {
  const seeds = [1, 2, 3];
  const checkpoints = [4, 24];
  const { perCheckpoint } = loopSweep({
    mapId: "forest",
    program: forestBest,
    seeds,
    checkpoints,
  });
  const runs = seeds.map((seed) =>
    loopOnce({ mapId: "forest", program: forestBest, seed, checkpoints }),
  );
  assert.equal(perCheckpoint.length, checkpoints.length);
  perCheckpoint.forEach((row, index) => {
    assert.equal(row.hours, checkpoints[index]);
    assert.equal(row.loops, seeds.length);
    const stopped = runs.filter((run) => !run.readings[index].alive).length;
    assert.equal(
      row.stoppedShare,
      Math.round((stopped / seeds.length) * 1000) / 10,
    );
  });
});

test("a loop given gear starts its character with that gear in the slots given, and a loop given none starts with the empty gear of a new character", () => {
  const started = (gear) => {
    const { finalState } = loopOnce({
      mapId: "forest",
      program: forestLoopWithStock,
      seed: 1,
      gear,
      checkpoints: [0],
    });
    const [character] = finalState.team.characters;
    return finalState.loops[character.id].run.character.gear;
  };
  const withGear = started(buildGear({ mainHand: "stick" }));
  assert.equal(withGear.mainHand, "stick");
  for (const slot of ["secondHand", "head", "torso", "legs", "pocket1"])
    assert.equal(withGear[slot], null, slot);
  assert.deepEqual(
    started(undefined),
    Object.fromEntries(
      [
        "mainHand",
        "secondHand",
        "head",
        "torso",
        "legs",
        "pocket1",
        "pocket2",
        "pocket3",
      ].map((slot) => [slot, null]),
    ),
  );
});

test("the loop command takes the flag --gear and names the gear in its header", () => {
  const { options } = parseArgs([
    "loop",
    "--map",
    "forest",
    "--program",
    "forestLoopWithStock",
    "--seeds",
    "1",
    "--hours",
    "1",
    "--gear",
    "mainHand=stick",
  ]);
  const { header } = JSON.parse(runCommand("loop", options).printed);
  assert.deepEqual(header.gear, { mainHand: "stick" });
});
