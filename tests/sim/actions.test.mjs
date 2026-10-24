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
import { nextRandom, streamState } from "../../dist/public/sim/random.js";
import { newMapRun, stepMinute } from "../../dist/public/sim/run.js";

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
const program = (...rules) => ({ rules });
const EXPLORING = program(rule(ALWAYS, EXPLORE));
const WANDERING = program(rule(ALWAYS, WANDER));

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
  assert.deepEqual(events, [
    {
      kind: "activityStarted",
      minute: 0,
      activity: { kind: "rule", ruleIndex: 0, action: EXPLORE },
      stepTo: null,
    },
  ]);
});

test("explore takes 20 minutes, reveals the tile and brings nothing", () => {
  assert.equal(ACTIONS.explore.minutes, 20);
  const { run } = start();
  assert.deepEqual(run.current, {
    activity: { kind: "rule", ruleIndex: 0, action: EXPLORE },
    startMinute: 0,
    endMinute: 20,
    stepTo: null,
  });
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
  assert.deepEqual(at20.events.slice(0, 2), [
    {
      kind: "activityFinished",
      minute: 20,
      activity: { kind: "rule", ruleIndex: 0, action: EXPLORE },
    },
    { kind: "tileRevealed", minute: 20, at: entrance },
  ]);
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
  assert.deepEqual(at20.run.current.activity, {
    kind: "rule",
    ruleIndex: 0,
    action: WANDER,
  });
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
  for (const seed of [1, 2, 3, 4, 5, 6, 7, 8]) {
    const run = start(seed).run;
    const around = neighbours(run.tiles, entrance);
    const hidden = around[seed % around.length].at;
    const prepared = mapTiles(run, (tile) => ({
      ...tile,
      revealed: !sameHex(tile.at, hidden),
    }));
    const next = stepMinute(freeNextMinute(prepared), map, WANDERING).run;
    assert.deepEqual(next.current.stepTo, hidden, `seed ${seed}`);
  }
});

test("Wędruj goes to some neighbour when all are revealed", () => {
  for (const seed of [1, 2, 3, 4, 5]) {
    const run = mapTiles(start(seed).run, (tile) => ({
      ...tile,
      revealed: true,
    }));
    const next = stepMinute(freeNextMinute(run), map, WANDERING).run;
    assert.equal(hexDistance(next.current.stepTo, entrance), 1, `seed ${seed}`);
    assert.ok(
      tileAt(run.tiles, next.current.stepTo),
      `seed ${seed}: target off the map`,
    );
  }
});

test("starting Wędruj draws once: candidates[floor(u × n)] in tile-list order", () => {
  const run = start(9).run;
  const candidates = neighbours(run.tiles, entrance).filter(
    (tile) => !tile.revealed,
  );
  const draw = nextRandom(run.wanderRandom);
  const next = stepMinute(freeNextMinute(run), map, WANDERING).run;
  assert.equal(next.wanderRandom, draw.state);
  assert.deepEqual(
    next.current.stepTo,
    candidates[Math.floor(draw.value * candidates.length)].at,
  );
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
  assert.deepEqual(begun.run.current, {
    activity: { kind: "rule", ruleIndex: 0, action: WANDER },
    startMinute: 1,
    endMinute: 10,
    stepTo: target,
  });
  assert.deepEqual(begun.events.at(-1), {
    kind: "activityStarted",
    minute: 1,
    activity: { kind: "rule", ruleIndex: 0, action: WANDER },
    stepTo: target,
  });
  const at9 = steps(begun.run, 8, WANDERING);
  assert.deepEqual(
    at9.run.character.at,
    entrance,
    "the character stays until the step ends",
  );
  assert.deepEqual(at9.run.current.stepTo, target);
  const at10 = stepMinute(at9.run, map, EXPLORING);
  assert.deepEqual(at10.run.character.at, target);
  assert.deepEqual(at10.events.slice(0, 2), [
    {
      kind: "activityFinished",
      minute: 10,
      activity: { kind: "rule", ruleIndex: 0, action: WANDER },
    },
    { kind: "moved", minute: 10, from: entrance, to: target },
  ]);
  assert.deepEqual(at10.run.current.activity, {
    kind: "rule",
    ruleIndex: 0,
    action: EXPLORE,
  });
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
    program(rule(ALWAYS, walkTo(stick))),
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
  const walking = program(rule(ALWAYS, walkTo(stick)));
  const { run: end, events } = steps(freeNextMinute(prepared), 40, walking);
  assert.deepEqual(end.character.at, far);
  const moves = events.filter((event) => event.kind === "moved");
  assert.equal(moves.length, hexDistance(entrance, far));
  for (const move of moves) assert.equal(hexDistance(move.from, move.to), 1);
});

test("the run never ends by itself: steps keep coming for hours", () => {
  const end = steps(
    start(4, program(rule(ALWAYS, EXPLORE), rule(ALWAYS, WANDER))).run,
    600,
    WANDERING,
  ).run;
  assert.equal(end.minute, 600);
  assert.ok(end.current.endMinute > end.minute);
});

test("the same run and program give the same steps", () => {
  const mixed = program(
    rule(ALWAYS, EXPLORE),
    rule(ALWAYS, walkTo(stick)),
    rule(ALWAYS, WANDER),
  );
  assert.deepEqual(
    steps(start(11, mixed).run, 300, mixed),
    steps(start(11, mixed).run, 300, mixed),
  );
});

test("newMapRun and stepMinute do not change their inputs", () => {
  const mixed = program(
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
