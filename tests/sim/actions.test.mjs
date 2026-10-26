import assert from "node:assert/strict";
import { test } from "node:test";
import { ACTIONS } from "../../dist/public/sim/data/actions.js";
import { MAPS } from "../../dist/public/sim/data/maps.js";
import {
  hexDistance,
  nearestTile,
  neighbours,
  offsetToAxial,
  sameHex,
  tileAt,
} from "../../dist/public/sim/hex.js";
import { actionFeasible } from "../../dist/public/sim/program.js";
import { streamState } from "../../dist/public/sim/random.js";
import { newMapRun, stepMinute } from "../../dist/public/sim/run.js";
import { programFromRules } from "./program-fixture.mjs";

const [mapId, map] = Object.entries(MAPS)[0];
// The id of a character of the team, which the map run carries.
const characterId = 1;
const [stick] = map.resources.map((resource) => resource.id);
const entrance = offsetToAxial(map.entrance.col, map.entrance.row);

const ALWAYS = { kind: "always" };
const EXPLORE = { kind: "explore" };
const WANDER = { kind: "wander" };
const walkTo = (resource) => ({ kind: "walkTo", resource });
const rule = (condition, action) => ({ condition, action });
const EXPLORING = programFromRules(rule(ALWAYS, EXPLORE));
const WANDERING = programFromRules(rule(ALWAYS, WANDER));

function start(seed = 3, startProgram = EXPLORING) {
  return newMapRun(map, seed, startProgram, { mapId, characterId });
}

/** The run with every tile changed by `change(tile)` (a copy). */
function mapTiles(run, change) {
  return {
    ...run,
    tiles: run.tiles.map((tile) =>
      change({ ...tile, stock: { ...tile.stock } }),
    ),
  };
}

/** The run at a free minute: its current activity is a wait ending at the next minute. */
function freeNextMinute(run) {
  return {
    ...run,
    current: {
      activity: { kind: "wait" },
      startMinute: run.minute,
      endMinute: run.minute + 1,
      stepTo: null,
    },
  };
}

/** Steps the run `minutes` times with one program, collecting the events. */
function steps(run, minutes, stepProgram) {
  let current = run;
  const events = [];
  for (let i = 0; i < minutes; i += 1) {
    const step = stepMinute(current, map, stepProgram);
    current = step.run;
    events.push(...step.events);
  }
  return { run: current, events };
}

const hereOf = (run) => tileAt(run.tiles, run.character.at);

test("a map run starts at minute 0 on the entrance with the first activity chosen", () => {
  const { run, events } = start(5);
  assert.equal(run.mapId, mapId);
  assert.equal(run.seed, 5);
  assert.equal(run.minute, 0);
  assert.equal(run.character.id, characterId);
  assert.deepEqual(run.character.at, entrance);
  assert.equal(run.wanderRandom, streamState(5, "wander"));
  assert.equal(hereOf(run).revealed, false);
  assert.deepEqual(
    events.map(({ kind, minute, activity, stepTo }) => [
      kind,
      minute,
      activity?.action,
      stepTo,
    ]),
    [["activityStarted", 0, EXPLORE, null]],
  );
});

test("explore takes 20 minutes, reveals the tile and brings nothing", () => {
  assert.equal(ACTIONS.explore.minutes, 20);
  const { run } = start();
  assert.deepEqual(run.current.activity.action, EXPLORE);
  assert.equal(run.current.startMinute, 0);
  assert.equal(run.current.endMinute, 20);
  assert.equal(run.current.stepTo, null);
  const at19 = steps(run, 19, EXPLORING);
  assert.equal(at19.run.minute, 19);
  assert.equal(hereOf(at19.run).revealed, false);
  assert.deepEqual(at19.events, []);
  assert.deepEqual(at19.run.current, run.current);

  const at20 = stepMinute(at19.run, map, EXPLORING);
  assert.equal(at20.run.minute, 20);
  assert.equal(hereOf(at20.run).revealed, true);
  assert.deepEqual(
    hereOf(at20.run).stock,
    hereOf(run).stock,
    "exploring changes no stock",
  );
  assert.deepEqual(at20.run.character, run.character);
  assert.deepEqual(
    at20.events
      .slice(0, 2)
      .map(({ kind, minute, activity, at }) => [
        kind,
        minute,
        activity?.action,
        at,
      ]),
    [
      ["activityFinished", 20, EXPLORE, undefined],
      ["tileRevealed", 20, undefined, entrance],
    ],
  );
  const others = run.tiles.filter((tile) => !sameHex(tile.at, entrance));
  assert.deepEqual(
    at20.run.tiles.filter((tile) => !sameHex(tile.at, entrance)),
    others,
  );
});

test("explore is not feasible on a revealed tile, so the next choice is a wait", () => {
  const at20 = steps(start().run, 20, EXPLORING).run;
  assert.equal(actionFeasible(at20, map, EXPLORE), false);
  assert.deepEqual(at20.current, {
    activity: { kind: "wait" },
    startMinute: 20,
    endMinute: 21,
    stepTo: null,
  });
});

test("the next activity is chosen in the finishing minute by the program current then", () => {
  const at19 = steps(start().run, 19, EXPLORING).run;
  const at20 = stepMinute(at19, map, WANDERING);
  assert.equal(at20.run.current.startMinute, 20);
  assert.deepEqual(at20.run.current.activity.action, WANDER);
  assert.equal(at20.events.at(-1).kind, "activityStarted");
  assert.equal(at20.events.at(-1).minute, 20);
});

test("a program change during an explore does not interrupt it", () => {
  const { run } = start();
  const later = steps(steps(run, 5, EXPLORING).run, 14, WANDERING).run;
  assert.equal(later.minute, 19);
  assert.deepEqual(later.current, run.current);
  assert.deepEqual(later.character.at, entrance);
});

test("Wędruj prefers an unrevealed neighbour", () => {
  // Accepted task przewodnik_testow_loop2.md, Q7c: a hidden neighbour takes precedence.
  // The six neighbours of axial (1, 1) are written independently of product helpers.
  const neighbours = [
    { q: 2, r: 1 },
    { q: 2, r: 0 },
    { q: 1, r: 0 },
    { q: 0, r: 1 },
    { q: 0, r: 2 },
    { q: 1, r: 2 },
  ];
  for (const [seed, hidden] of [
    [1, { q: 2, r: 1 }],
    [2, { q: 2, r: 0 }],
    [3, { q: 1, r: 0 }],
    [4, { q: 0, r: 1 }],
    [5, { q: 0, r: 2 }],
    [6, { q: 1, r: 2 }],
    [7, { q: 2, r: 1 }],
    [8, { q: 0, r: 2 }],
  ]) {
    const run = start(seed).run;
    const tiles = [{ q: 1, r: 1 }, ...neighbours].map((at) => ({
      at,
      col: at.q + Math.floor(at.r / 2),
      row: at.r,
      stock: {},
      stepMinutes: 5,
      revealed: !(at.q === hidden.q && at.r === hidden.r),
    }));
    const prepared = {
      ...run,
      tiles,
      character: { ...run.character, at: { q: 1, r: 1 } },
    };
    const next = stepMinute(freeNextMinute(prepared), map, WANDERING).run;
    assert.deepEqual(next.current.stepTo, hidden, `seed ${seed}`);
  }
});

test("Wędruj goes to some neighbour when all are revealed", () => {
  // Six allowed axial neighbours, independently enumerated; neither neighbours()
  // nor hexDistance() supplies the expected result of the product's selection.
  const neighbours = [
    { q: 2, r: 1 },
    { q: 2, r: 0 },
    { q: 1, r: 0 },
    { q: 0, r: 1 },
    { q: 0, r: 2 },
    { q: 1, r: 2 },
  ];
  for (const seed of [1, 2, 3, 4, 5]) {
    const initial = start(seed).run;
    const tiles = [{ q: 1, r: 1 }, ...neighbours].map((at) => ({
      at,
      col: at.q + Math.floor(at.r / 2),
      row: at.r,
      stock: {},
      stepMinutes: 5,
      revealed: true,
    }));
    const run = {
      ...initial,
      tiles,
      character: { ...initial.character, at: { q: 1, r: 1 } },
    };
    const next = stepMinute(freeNextMinute(run), map, WANDERING).run;
    assert.ok(
      neighbours.some(
        (at) =>
          at.q === next.current.stepTo.q && at.r === next.current.stepTo.r,
      ),
      `seed ${seed}: target must be one of the six neighbours on this map`,
    );
  }
});

test("starting Wędruj consumes exactly one draw", () => {
  // Accepted task przewodnik_testow_loop2.md, Q7c quotes concept line 1261 for one draw.
  // Independent Mulberry32 fixture: state advances by 0x6d2b79f5 modulo 2^32, so
  // starting from 0 gives 0x6d2b79f5 after one draw. No product helper computes it.
  // Source: https://github.com/bryc/code/blob/master/jshash/PRNGs.md#mulberry32
  // A different generator may replace this fixture; it does not fix target selection.
  const run = { ...start(9).run, wanderRandom: 0 };
  const next = stepMinute(freeNextMinute(run), map, WANDERING).run;
  assert.equal(next.wanderRandom, 0x6d2b79f5);
});

test("Wędruj is not feasible with no neighbour on the map", () => {
  const run = start().run;
  assert.equal(actionFeasible(run, map, WANDER), true);
  const alone = { ...run, tiles: [hereOf(run)] };
  assert.equal(actionFeasible(alone, map, WANDER), false);
});

test("a step lasts the target tile stepMinutes and moves the character at its end", () => {
  const run = start().run;
  const target = neighbours(run.tiles, entrance)[2].at;
  const prepared = mapTiles(run, (tile) =>
    sameHex(tile.at, target)
      ? { ...tile, revealed: false, stepMinutes: 9 }
      : { ...tile, revealed: true },
  );
  const begun = stepMinute(freeNextMinute(prepared), map, WANDERING);
  assert.deepEqual(begun.run.current.activity.action, WANDER);
  assert.equal(begun.run.current.startMinute, 1);
  assert.equal(begun.run.current.endMinute, 10);
  assert.deepEqual(begun.run.current.stepTo, target);
  assert.equal(begun.events.at(-1).kind, "activityStarted");
  assert.equal(begun.events.at(-1).minute, 1);
  assert.deepEqual(begun.events.at(-1).activity.action, WANDER);
  assert.deepEqual(begun.events.at(-1).stepTo, target);
  const at9 = steps(begun.run, 8, WANDERING);
  assert.deepEqual(
    at9.run.character.at,
    entrance,
    "the character stays until the step ends",
  );
  assert.deepEqual(at9.run.current.stepTo, target);
  const at10 = stepMinute(at9.run, map, EXPLORING);
  assert.deepEqual(at10.run.character.at, target);
  assert.deepEqual(
    at10.events
      .slice(0, 2)
      .map(({ kind, minute, activity, from, to }) => [
        kind,
        minute,
        activity?.action,
        from,
        to,
      ]),
    [
      ["activityFinished", 10, WANDER, undefined, undefined],
      ["moved", 10, undefined, entrance, target],
    ],
  );
  assert.deepEqual(at10.run.current.activity.action, EXPLORE);
  assert.equal(at10.run.current.stepTo, null);
});

test("Idź targets the nearest revealed tile with stock and gives the first step", () => {
  const run = start().run;
  const far = offsetToAxial(3, 3);
  const prepared = mapTiles(run, (tile) => ({
    ...tile,
    revealed: true,
    stock: sameHex(tile.at, far) ? { [stick]: 3 } : {},
  }));
  assert.equal(actionFeasible(prepared, map, walkTo(stick)), true);
  const expected = nearestTile(
    prepared.tiles,
    entrance,
    (tile) => tile.revealed && (tile.stock[stick] ?? 0) > 0,
  );
  assert.ok(sameHex(expected.tile.at, far));
  assert.ok(expected.minutes > map.stepMinutes);
  const next = stepMinute(
    freeNextMinute(prepared),
    map,
    programFromRules(rule(ALWAYS, walkTo(stick))),
  ).run;
  assert.deepEqual(next.current.stepTo, expected.next);
  assert.equal(hexDistance(next.current.stepTo, entrance), 1);
  assert.equal(
    next.current.endMinute - next.current.startMinute,
    map.stepMinutes,
  );
  assert.equal(next.wanderRandom, prepared.wanderRandom, "Idź draws nothing");
});

test("Idź is not feasible with no known tile in stock", () => {
  const run = start().run;
  const other = neighbours(run.tiles, entrance)[0].at;
  const withStock = (revealed, count) =>
    mapTiles(run, (tile) => ({
      ...tile,
      revealed: sameHex(tile.at, other) ? revealed : true,
      stock: sameHex(tile.at, other) ? { [stick]: count } : {},
    }));
  assert.equal(
    actionFeasible(withStock(false, 3), map, walkTo(stick)),
    false,
    "unrevealed",
  );
  assert.equal(
    actionFeasible(withStock(true, 0), map, walkTo(stick)),
    false,
    "used up",
  );
  assert.equal(actionFeasible(withStock(true, 1), map, walkTo(stick)), true);
});

test("Idź is not feasible standing on the target", () => {
  const run = mapTiles(start().run, (tile) => ({
    ...tile,
    revealed: true,
    stock: sameHex(tile.at, entrance) ? { [stick]: 3 } : {},
  }));
  assert.equal(actionFeasible(run, map, walkTo(stick)), false);
});

test("walking by program reaches the stock step by step and stays there", () => {
  const run = start().run;
  const far = offsetToAxial(3, 3);
  const prepared = mapTiles(run, (tile) => ({
    ...tile,
    revealed: true,
    stock: sameHex(tile.at, far) ? { [stick]: 3 } : {},
  }));
  const walking = programFromRules(rule(ALWAYS, walkTo(stick)));
  const { run: end, events } = steps(freeNextMinute(prepared), 40, walking);
  assert.deepEqual(end.character.at, far);
  const moves = events.filter((event) => event.kind === "moved");
  assert.equal(moves.length, hexDistance(entrance, far));
  for (const move of moves) assert.equal(hexDistance(move.from, move.to), 1);
});

test("no step ends the run by itself: steps keep coming for four hours", () => {
  const end = steps(
    start(4, programFromRules(rule(ALWAYS, EXPLORE), rule(ALWAYS, WANDER))).run,
    240,
    WANDERING,
  ).run;
  assert.equal(end.minute, 240);
  assert.ok(end.current.endMinute > end.minute);
});

test("the same run and program give the same steps", () => {
  const mixed = programFromRules(
    rule(ALWAYS, EXPLORE),
    rule(ALWAYS, walkTo(stick)),
    rule(ALWAYS, WANDER),
  );
  assert.deepEqual(
    steps(start(11, mixed).run, 240, mixed),
    steps(start(11, mixed).run, 240, mixed),
  );
});

test("newMapRun and stepMinute do not change their inputs", () => {
  const mixed = programFromRules(
    rule(ALWAYS, EXPLORE),
    rule(ALWAYS, walkTo(stick)),
    rule(ALWAYS, WANDER),
  );
  const mapBefore = JSON.stringify(map);
  const programBefore = JSON.stringify(mixed);
  let run = start(2, mixed).run;
  for (let i = 0; i < 200; i += 1) {
    const before = JSON.stringify(run);
    const next = stepMinute(run, map, mixed).run;
    assert.equal(JSON.stringify(run), before, `minute ${run.minute}`);
    run = next;
  }
  assert.equal(JSON.stringify(map), mapBefore);
  assert.equal(JSON.stringify(mixed), programBefore);
});
