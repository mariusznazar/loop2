import assert from "node:assert/strict";
import { test } from "node:test";
import { loopBalance, loopOnce, loopSweep } from "../../balance/loop.mjs";
import { runOnce } from "../../balance/engine.mjs";
import { forestBest, forestLoopWithStock } from "../sim/reference-programs.mjs";

// The loop mode of the instrument, checked against relations the loop code does not compute: a loop
// of zero hours leaves the chest as the take list left it, the counts of one loop agree with each
// other and with the chest, and the summary per checkpoint agrees with the readings it sums.

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
