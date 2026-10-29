import assert from "node:assert/strict";
import { test } from "node:test";
import { MAPS } from "../../dist/public/sim/data/maps.js";
import { offsetToAxial, sameHex, tileAt } from "../../dist/public/sim/hex.js";
import {
  createCharacter,
  newGame,
  restart,
  send,
  setProgram,
} from "../../dist/public/sim/game.js";
import { actionFeasible } from "../../dist/public/sim/program.js";
import { streamState } from "../../dist/public/sim/random.js";
import { newMapRun, stepMinute } from "../../dist/public/sim/run.js";
import { programFromRules, ruleActivity } from "./program-fixture.mjs";

// „Zbierz — <zasób mapy>” (task, To do 5; D-25, D-64 to D-66, D-71). The numbers below are written
// out by hand: a gathering lasts 10 game minutes and succeeds in 7 tries of 10, the backpack holds
// 15 pieces of all items together. The gathering's one draw is worked out here apart from the
// simulation: one mulberry32 step over the map run's gathering state, written out below from the
// published algorithm, and the gathering hits where the value lies below 0.7.

const [mapId, forest] = Object.entries(MAPS)[0];
// The first character a new game creates takes the id 1.
const characterId = 1;
const [stick, berry, moss] = forest.resources.map((resource) => resource.id);
const entrance = offsetToAxial(forest.entrance.col, forest.entrance.row);

const ALWAYS = { kind: "always" };
const WANDER = { kind: "wander" };
const gather = (resource) => ({ kind: "gather", resource });
const rule = (condition, action) => ({ condition, action });
const IDLE = programFromRules();

/** One mulberry32 step over a uint32 state, written out apart from `random.ts`. */
function mulberry32(state) {
  const next = (state + 0x6d2b79f5) >>> 0;
  let t = next;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return { value: ((t ^ (t >>> 14)) >>> 0) / 4294967296, state: next };
}

/** A map run of Las at minute 0 with no program rules, with the given fields replaced. */
function handMade(fields = {}) {
  const { run } = newMapRun(forest, 3, IDLE, { mapId, characterId });
  return { ...run, ...fields };
}

/** The run with the character's tile changed by `change(tile)` (a copy). */
function withHere(run, change) {
  return {
    ...run,
    tiles: run.tiles.map((tile) =>
      sameHex(tile.at, run.character.at)
        ? change({ ...tile, stock: { ...tile.stock } })
        : tile,
    ),
  };
}

/** A backpack holding `pieces` of `item` and nothing else. */
function backpackOf(run, item, pieces) {
  const backpack = Object.fromEntries(
    Object.keys(run.character.backpack).map((id) => [id, 0]),
  );
  return { ...backpack, [item]: pieces };
}

function carrying(run, backpack) {
  return { ...run, character: { ...run.character, backpack } };
}

/** The run with a gathering of `resource` as its current activity, ending in the next minute. */
function gatheringEndingNext(run, resource) {
  return {
    ...run,
    current: {
      activity: ruleActivity(gather(resource)),
      startMinute: run.minute - 9,
      endMinute: run.minute + 1,
      stepTo: null,
    },
  };
}

const hereOf = (run) => tileAt(run.tiles, run.character.at);

/** A revealed entrance holding 5 sticks and nothing else, an empty backpack. */
function onSticks(pieces = 5) {
  return withHere(handMade(), (tile) => ({
    ...tile,
    revealed: true,
    stock: { [stick]: pieces },
  }));
}

/** Gathering states whose one draw hits (value below 0.7) and misses, worked out here. */
function statesBy(hit) {
  const found = [];
  for (let state = 0; found.length < 3; state += 1) {
    if (mulberry32(state).value < 0.7 === hit) found.push(state);
  }
  return found;
}

test("„Zbierz” is feasible on a revealed tile holding the resource, with room in the backpack", () => {
  const run = onSticks();
  assert.equal(actionFeasible(run, forest, gather(stick)), true);
  const almostFull = carrying(run, backpackOf(run, berry, 14));
  assert.equal(actionFeasible(almostFull, forest, gather(stick)), true);
});

test("„Zbierz” is not feasible on a tile not revealed", () => {
  const run = withHere(onSticks(), (tile) => ({ ...tile, revealed: false }));
  assert.equal(actionFeasible(run, forest, gather(stick)), false);
});

test("„Zbierz” is not feasible on a tile without the resource or with 0 of it", () => {
  const without = onSticks();
  assert.equal(actionFeasible(without, forest, gather(berry)), false);
  const none = onSticks(0);
  assert.deepEqual(hereOf(none).stock, { [stick]: 0 });
  assert.equal(actionFeasible(none, forest, gather(stick)), false);
});

test("„Zbierz” is not feasible with a full backpack of 15 pieces of any items", () => {
  const run = onSticks();
  const full = { ...backpackOf(run, berry, 10), [moss]: 5 };
  assert.equal(
    actionFeasible(carrying(run, full), forest, gather(stick)),
    false,
  );
  const overFull = backpackOf(run, stick, 16);
  assert.equal(
    actionFeasible(carrying(run, overFull), forest, gather(stick)),
    false,
  );
});

test("a gathering lasts 10 game minutes, takes nothing at its start and draws nothing then", () => {
  const run = onSticks();
  const begun = stepMinute(
    { ...run, current: { ...run.current, endMinute: 1 } },
    forest,
    programFromRules(rule(ALWAYS, gather(stick))),
  ).run;
  assert.deepEqual(begun.current.activity.action, gather(stick));
  assert.equal(begun.current.startMinute, 1);
  assert.equal(begun.current.endMinute, 11);
  assert.equal(begun.current.stepTo, null);
  assert.equal(begun.gatherRandom, run.gatherRandom);
  assert.equal(begun.wanderRandom, run.wanderRandom);
  assert.deepEqual(hereOf(begun).stock, { [stick]: 5 });
  assert.deepEqual(begun.character.backpack, run.character.backpack);
});

test("a map run starts its gathering generator from its seed, apart from the other streams", () => {
  for (const seed of [1, 3, 77]) {
    const { run } = newMapRun(forest, seed, IDLE, { mapId, characterId });
    assert.equal(run.gatherRandom, streamState(seed, "gather"), `seed ${seed}`);
    assert.notEqual(run.gatherRandom, streamState(seed, "wander"));
    assert.notEqual(run.gatherRandom, streamState(seed, "layout"));
  }
  assert.notEqual(streamState(1, "gather"), streamState(2, "gather"));
});

test("a hit moves one piece from the tile into the backpack, as the item of that resource", () => {
  for (const state of statesBy(true)) {
    const run = {
      ...gatheringEndingNext(onSticks(5), stick),
      gatherRandom: state,
    };
    const next = stepMinute(run, forest, IDLE).run;
    assert.equal(next.minute, 1);
    assert.deepEqual(hereOf(next).stock, { [stick]: 4 }, `state ${state}`);
    assert.deepEqual(next.character.backpack, backpackOf(run, stick, 1));
    assert.equal(next.gatherRandom, mulberry32(state).state, "one draw");
    assert.equal(next.wanderRandom, run.wanderRandom);
  }
});

test("a miss takes no piece and leaves the backpack as it was", () => {
  for (const state of statesBy(false)) {
    const start = carrying(onSticks(5), backpackOf(onSticks(5), berry, 2));
    const run = { ...gatheringEndingNext(start, stick), gatherRandom: state };
    const next = stepMinute(run, forest, IDLE).run;
    assert.deepEqual(hereOf(next).stock, { [stick]: 5 }, `state ${state}`);
    assert.deepEqual(next.character.backpack, start.character.backpack);
    assert.equal(next.gatherRandom, mulberry32(state).state, "one draw");
    assert.equal(next.wanderRandom, run.wanderRandom);
  }
});

test("a hit on a tile of several resources takes only the gathered one, for each resource of the map", () => {
  const [state] = statesBy(true);
  const resources = forest.resources.map((resource) => resource.id);
  assert.equal(resources.length, 4);
  const mixed = Object.fromEntries(resources.map((id) => [id, 3]));
  for (const resource of resources) {
    const start = withHere(handMade(), (tile) => ({
      ...tile,
      revealed: true,
      stock: { ...mixed },
    }));
    const run = {
      ...gatheringEndingNext(start, resource),
      gatherRandom: state,
    };
    const next = stepMinute(run, forest, IDLE).run;
    assert.deepEqual(hereOf(next).stock, { ...mixed, [resource]: 2 });
    assert.deepEqual(next.character.backpack, backpackOf(run, resource, 1));
  }
});

test("each gathering hits exactly where its draw lies below 0.7", () => {
  let hits = 0;
  for (let state = 1000; state < 1100; state += 1) {
    const run = {
      ...gatheringEndingNext(onSticks(5), stick),
      gatherRandom: state,
    };
    const next = stepMinute(run, forest, IDLE).run;
    const hit = mulberry32(state).value < 0.7;
    if (hit) hits += 1;
    assert.equal(next.character.backpack[stick], hit ? 1 : 0, `state ${state}`);
    assert.equal(hereOf(next).stock[stick], hit ? 4 : 5, `state ${state}`);
  }
  assert.ok(hits > 50 && hits < 90, `${hits} hits of 100`);
});

test("a tile gathered to 0 pieces keeps the key of its resource", () => {
  const [state] = statesBy(true);
  const run = {
    ...gatheringEndingNext(onSticks(1), stick),
    gatherRandom: state,
  };
  const next = stepMinute(run, forest, IDLE).run;
  assert.deepEqual(hereOf(next).stock, { [stick]: 0 });
  assert.ok(Object.hasOwn(hereOf(next).stock, stick));
  assert.equal(actionFeasible(next, forest, gather(stick)), false);
});

test("a gathering takes no more than lies on the tile, nor beyond the backpack's cap, at its end", () => {
  const [state] = statesBy(true);
  const empty = {
    ...gatheringEndingNext(onSticks(0), stick),
    gatherRandom: state,
  };
  const fromEmpty = stepMinute(empty, forest, IDLE).run;
  assert.deepEqual(hereOf(fromEmpty).stock, { [stick]: 0 });
  assert.equal(fromEmpty.character.backpack[stick], 0);

  const full = carrying(onSticks(5), backpackOf(onSticks(5), berry, 15));
  const intoFull = stepMinute(
    { ...gatheringEndingNext(full, stick), gatherRandom: state },
    forest,
    IDLE,
  ).run;
  assert.deepEqual(hereOf(intoFull).stock, { [stick]: 5 });
  assert.deepEqual(intoFull.character.backpack, full.character.backpack);
});

test("the wander stream gives the same draws with and without gathering", () => {
  // Every tile revealed with sticks; the backpack holds 12 berries, so gathering stops when it is
  // full and wandering follows. The wander stream's states, at each wander started, are compared.
  const prepared = (() => {
    const run = handMade();
    return carrying(
      {
        ...run,
        tiles: run.tiles.map((tile) => ({
          ...tile,
          revealed: true,
          stock: { [stick]: 12 },
        })),
        current: { ...run.current, endMinute: 1 },
      },
      backpackOf(run, berry, 12),
    );
  })();
  const wanderStates = (stepProgram) => {
    let run = prepared;
    const states = [];
    for (let minute = 0; minute < 200; minute += 1) {
      const before = run.wanderRandom;
      run = stepMinute(run, forest, stepProgram).run;
      if (run.wanderRandom !== before) states.push(run.wanderRandom);
    }
    return { run, states };
  };
  const gathering = wanderStates(
    programFromRules(rule(ALWAYS, gather(stick)), rule(ALWAYS, WANDER)),
  );
  const wandering = wanderStates(programFromRules(rule(ALWAYS, WANDER)));

  assert.equal(gathering.run.character.backpack[stick], 3, "it gathered");
  assert.notEqual(gathering.run.gatherRandom, prepared.gatherRandom);
  assert.equal(wandering.run.gatherRandom, prepared.gatherRandom);
  assert.ok(gathering.states.length > 10, `${gathering.states.length} wanders`);
  assert.deepEqual(
    gathering.states,
    wandering.states.slice(0, gathering.states.length),
  );
  let state = prepared.wanderRandom;
  for (const [index, seen] of gathering.states.entries()) {
    state = mulberry32(state).state;
    assert.equal(seen, state, `wander ${index}`);
  }
});

test("a map run restart starts the gathering generator anew from the seed", () => {
  const rules = [rule(ALWAYS, gather(stick))];
  const sent = send(
    createCharacter(
      setProgram(newGame(), programFromRules(...rules)).state,
      "Ala",
    ).state,
    { mapId, characterId },
    1760000000000,
  ).state;
  const seed = sent.run.seed;
  assert.equal(sent.run.gatherRandom, streamState(seed, "gather"));
  const drawn = { ...sent, run: { ...sent.run, gatherRandom: 12345 } };
  const again = restart(drawn).state;
  assert.equal(again.run.seed, seed);
  assert.equal(again.run.gatherRandom, streamState(seed, "gather"));
});

/** The program a game state holds: the copy during a map run, else the only program of the list (task, To do 1 and 7). */
function heldProgram(state) {
  return state.run === null
    ? state.programs[0].program
    : state.run.copy.program;
}

test("the program check takes „Zbierz” with a resource of the map and refuses it without one", () => {
  const takenProgram = programFromRules(rule(ALWAYS, gather(moss)));
  const taken = setProgram(newGame(), takenProgram);
  assert.deepEqual(heldProgram(taken.state), takenProgram);
  const during = send(
    createCharacter(newGame(), "Ala").state,
    { mapId, characterId },
    1760000000000,
  ).state;
  assert.deepEqual(
    heldProgram(
      setProgram(during, programFromRules(rule(ALWAYS, gather(berry)))).state,
    ),
    programFromRules(rule(ALWAYS, gather(berry))),
  );
  for (const bad of [{ kind: "gather" }, gather("acorn"), gather(7)]) {
    assert.throws(
      () => setProgram(newGame(), programFromRules(rule(ALWAYS, bad))),
      Error,
      JSON.stringify(bad),
    );
  }
});

test("the character stays on its tile while gathering", () => {
  const [state] = statesBy(true);
  const run = {
    ...gatheringEndingNext(onSticks(5), stick),
    gatherRandom: state,
  };
  const next = stepMinute(run, forest, IDLE).run;
  assert.deepEqual(next.character.at, entrance);
});
