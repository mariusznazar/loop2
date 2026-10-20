import assert from "node:assert/strict";
import { test } from "node:test";
import { ARCHETYPES } from "../../dist/public/sim/data/archetypes.js";
import { INITIAL_SEED } from "../../dist/public/sim/data/balance.js";
import { MAPS } from "../../dist/public/sim/data/maps.js";
import {
  advanceMinutes,
  end,
  newGame,
  passRealTime,
  restart,
  send,
  setPaused,
  setProgram,
} from "../../dist/public/sim/game.js";
import { mixSeed } from "../../dist/public/sim/random.js";

const mapId = Object.keys(MAPS)[0];
const archetypeId = Object.keys(ARCHETYPES)[0];
const SENT = { mapId, archetypeId };
const REAL_MS = 1760000000000;
const LATER_MS = 1760000123456;

const ALWAYS = { kind: "always" };
const rule = (condition, action) => ({ condition, action });
const EXPLORING = { rules: [rule(ALWAYS, { kind: "explore" })] };
const WANDER_FIRST = {
  rules: [rule(ALWAYS, { kind: "wander" }), rule(ALWAYS, { kind: "explore" })],
};

function sent(program = EXPLORING, realMs = REAL_MS) {
  return send(setProgram(newGame(), program).state, SENT, realMs);
}

test("a new game has an empty program, no map run, the initial seed and no pause", () => {
  assert.deepEqual(newGame(), {
    program: { rules: [] },
    run: null,
    lastSeed: INITIAL_SEED,
    paused: false,
    realMsCarry: 0,
  });
});

test("a send starts a map run at minute 0 with the seed mixed from the last seed and the real time", () => {
  const { state, events } = sent();
  const seed = mixSeed(INITIAL_SEED, REAL_MS);
  assert.equal(state.lastSeed, seed);
  assert.equal(state.run.seed, seed);
  assert.equal(state.run.minute, 0);
  assert.equal(state.run.mapId, mapId);
  assert.equal(state.run.character.archetypeId, archetypeId);
  assert.equal(state.paused, false);
  assert.equal(state.realMsCarry, 0);
  assert.deepEqual(state.program, EXPLORING);
  assert.deepEqual(events, [
    { kind: "mapRunStarted", seed },
    {
      kind: "activityStarted",
      minute: 0,
      activity: { kind: "rule", ruleIndex: 0, action: { kind: "explore" } },
      stepTo: null,
    },
  ]);
});

test("a send while a map run exists is refused", () => {
  const { state } = sent();
  assert.throws(() => send(state, SENT, LATER_MS), Error);
});

test("a program edit during a 20-minute exploration does not interrupt it and applies at minute 20", () => {
  let state = advanceMinutes(sent().state, 5).state;
  const exploring = state.run.current;
  state = setProgram(state, WANDER_FIRST).state;
  assert.deepEqual(
    state.run.current,
    exploring,
    "setProgram touched the running activity",
  );
  for (let minute = 6; minute < 20; minute += 1) {
    state = advanceMinutes(state, 1).state;
    assert.deepEqual(state.run.current, exploring, `minute ${minute}`);
  }
  const { state: at20, events } = advanceMinutes(state, 1);
  assert.equal(at20.run.minute, 20);
  assert.deepEqual(at20.run.current.activity, {
    kind: "rule",
    ruleIndex: 0,
    action: { kind: "wander" },
  });
  assert.equal(at20.run.current.startMinute, 20);
  assert.equal(events.at(-1).kind, "activityStarted");
});

test("Restart starts a new map run at minute 0 with the same seed and tiles and the current program", () => {
  const start = sent().state;
  let state = advanceMinutes(start, 45).state;
  state = setProgram(state, WANDER_FIRST).state;
  state = setPaused(state, true).state;
  state = passRealTime(setPaused(state, false).state, 400).state;
  state = setPaused(state, true).state;
  const { state: restarted, events } = restart(state);
  assert.equal(restarted.run.minute, 0);
  assert.equal(restarted.run.seed, start.run.seed);
  assert.deepEqual(restarted.run.tiles, start.run.tiles);
  assert.deepEqual(restarted.program, WANDER_FIRST);
  assert.deepEqual(restarted.run.current.activity, {
    kind: "rule",
    ruleIndex: 0,
    action: { kind: "wander" },
  });
  assert.equal(restarted.lastSeed, start.lastSeed);
  assert.equal(restarted.paused, false);
  assert.equal(restarted.realMsCarry, 0);
  assert.deepEqual(
    events.map((event) => event.kind),
    ["mapRunEnded", "mapRunStarted", "activityStarted"],
  );
  assert.deepEqual(events[1], { kind: "mapRunStarted", seed: start.run.seed });
});

test("Restart with the starting program gives back the sent map run", () => {
  const start = sent().state;
  const later = advanceMinutes(start, 60).state;
  assert.deepEqual(restart(later).state, start);
});

test("Zakończ ends the map run, keeps the program and the last seed", () => {
  let state = advanceMinutes(sent().state, 30).state;
  state = passRealTime(state, 600).state;
  state = setPaused(state, true).state;
  const { state: ended, events } = end(state);
  assert.deepEqual(ended, {
    program: EXPLORING,
    run: null,
    lastSeed: state.lastSeed,
    paused: false,
    realMsCarry: 0,
  });
  assert.deepEqual(events, [{ kind: "mapRunEnded" }]);
});

test("the next send after Zakończ takes a new seed from the later real time", () => {
  const first = sent().state;
  const ended = end(first).state;
  const { state: second, events } = send(ended, SENT, LATER_MS);
  const seed = mixSeed(first.lastSeed, LATER_MS);
  assert.notEqual(second.run.seed, first.run.seed);
  assert.equal(second.run.seed, seed);
  assert.equal(second.lastSeed, seed);
  assert.equal(second.run.minute, 0);
  assert.deepEqual(events[0], { kind: "mapRunStarted", seed });
});

test("Restart and Zakończ without a map run are refused", () => {
  const state = newGame();
  assert.throws(() => restart(state), Error);
  assert.throws(() => end(state), Error);
});
