import assert from "node:assert/strict";
import { test } from "node:test";
import { BALANCE } from "../../dist/browser/sim/data/balance.js";
import { send } from "../../dist/browser/sim/game.js";
import {
  DEFAULT_CAP_MINUTES,
  buildSkills,
  makeState,
  prerequisitesOf,
  runOnce,
  seedRange,
  summarize,
  sweep,
} from "../../balance/engine.mjs";
import { forestBest } from "../sim/reference-programs.mjs";
import { fullUnderstanding } from "../sim/understanding-fixture.mjs";

// What the engine does beside running one map run, which the agreement test checks against the
// game: it makes the state a measurement starts from, sums a list of map runs up and sweeps seeds.

test("the state of a measurement holds one character, a full Understanding, the chest given and lets the game send the map", () => {
  for (const mapId of ["forestEdge", "forest", "forestDeep"]) {
    const state = makeState({
      program: forestBest,
      chest: { stick: 3 },
      solvedMaps: prerequisitesOf(mapId),
    });
    assert.equal(state.team.characters.length, 1);
    assert.deepEqual(state.understanding, fullUnderstanding());
    assert.deepEqual(state.team.chest.pieces, { stick: 3 });
    const sent = send(state, { mapId, characterId: 1 }, 1).state;
    assert.equal(sent.run.mapId, mapId);
  }
});

test("skills built from practice and ranks name a skill and a branch of the data, and refuse any other", () => {
  assert.throws(() => buildSkills({ practice: { noSuchSkill: 1 } }));
  assert.throws(() => buildSkills({ ranks: { noSuchBranch: 1 } }));
  const skills = buildSkills({
    practice: { eating: 7 },
    ranks: { keenEye: 2 },
  });
  assert.equal(skills.eating.practice, 7);
  assert.equal(skills.smallItemGathering.ranks.keenEye, 2);
  assert.equal(skills.exploration.practice, 0);
});

test("a map run on a map the data lacks is refused", () => {
  assert.throws(
    () => runOnce({ mapId: "noSuchMap", program: forestBest, seed: 1 }),
    /no map noSuchMap/,
  );
});

test("a map run that stands at the cap is a run at the cap, at the minute of the cap", () => {
  const result = runOnce({
    mapId: "forest",
    program: forestBest,
    seed: 1,
    capMinutes: 10,
  });
  assert.equal(result.outcome, "cap");
  assert.equal(result.minute, 10);
  assert.equal(result.cause, null);
});

test("the default cap of a map run is the judging cap the built game holds, not a number of the instrument", () => {
  assert.equal(DEFAULT_CAP_MINUTES, BALANCE.judgingCapMinutes);
});

test("the summary of hand-made results counts, shares, distributes and averages as written out", () => {
  const solvedAt = (minute, firstFire, eating, stick) => ({
    outcome: "solved",
    minute,
    cause: null,
    firstFire,
    practice: { eating },
    loot: { stick },
    backpack: { stick },
    minutesBy: { gather: minute - 100, wait: 100 },
  });
  const summary = summarize([
    solvedAt(700, 90, 2, 4),
    solvedAt(800, 100, 4, 6),
    {
      outcome: "death",
      minute: 300,
      cause: "cold",
      firstFire: null,
      minutesBy: { gather: 300 },
    },
    {
      outcome: "cap",
      minute: 4000,
      cause: null,
      firstFire: 120,
      minutesBy: { wait: 4000 },
    },
  ]);
  assert.equal(summary.runs, 4);
  assert.equal(summary.solved, 2);
  assert.equal(summary.solvedShare, 50);
  assert.deepEqual(summary.solveMinute, {
    n: 2,
    min: 700,
    p10: 710,
    median: 750,
    p90: 790,
    max: 800,
  });
  assert.deepEqual(summary.deaths, {
    cold: {
      n: 1,
      minute: { n: 1, min: 300, p10: 300, median: 300, p90: 300, max: 300 },
    },
  });
  assert.equal(summary.capped, 1);
  assert.deepEqual(summary.firstFire, {
    n: 3,
    min: 90,
    p10: 92,
    median: 100,
    p90: 116,
    max: 120,
  });
  assert.equal(summary.noFire, 1);
  assert.deepEqual(summary.practicePerSolved, { eating: 3 });
  assert.deepEqual(summary.lootPerSolved, { stick: 5 });
  assert.deepEqual(summary.backpackAtSolve, { stick: 5 });
  // Of 5800 game minutes in all, 1600 were gathering and 4200 waiting.
  assert.deepEqual(summary.timeShare, { gather: 27.6, wait: 72.4 });
});

test("the summary of no results has no share and no distribution", () => {
  const summary = summarize([]);
  assert.equal(summary.runs, 0);
  assert.equal(summary.solvedShare, null);
  assert.equal(summary.solveMinute, null);
  assert.deepEqual(summary.deaths, {});
});

test("a sweep is the map run of each seed, and every map run of it ends solved, in a death or at the cap", () => {
  const seeds = seedRange(1, 6);
  assert.deepEqual(seeds, [1, 2, 3, 4, 5, 6]);
  const once = { mapId: "forest", program: forestBest };
  const swept = sweep({ ...once, seeds });
  assert.deepEqual(
    swept.results,
    seeds.map((seed) => runOnce({ ...once, seed })),
  );
  const deaths = Object.values(swept.summary.deaths).reduce(
    (sum, { n }) => sum + n,
    0,
  );
  assert.equal(
    swept.summary.solved + deaths + swept.summary.capped,
    seeds.length,
  );
  assert.equal(swept.summary.runs, seeds.length);
});
