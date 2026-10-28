import assert from "node:assert/strict";
import { test } from "node:test";
import { MAPS } from "../../dist/public/sim/data/maps.js";
import {
  advanceMinutes,
  createCharacter,
  newGame,
  passRealTime,
  send,
  setPace,
  setPaused,
  setProgram,
} from "../../dist/public/sim/game.js";
import { programFromRules } from "./program-fixture.mjs";
import { newKnowingGame } from "./understanding-fixture.mjs";

const mapId = Object.keys(MAPS)[0];
// The first character a new game creates takes the id 1.
const SENT = { mapId, characterId: 1 };
const REAL_MS = 1760000000000;

const EXPLORING = programFromRules({
  condition: { kind: "always" },
  action: { kind: "explore" },
});

/** A game sent to the first map with a program that explores; the run stands at minute 0. */
function sent(program = EXPLORING) {
  const game = createCharacter(
    setProgram(newKnowingGame(), program).state,
    "Ala",
  );
  return send(game.state, SENT, REAL_MS).state;
}

/** Feeds the real-time inputs one after another; returns the last state and all events. */
function feed(state, inputs) {
  const events = [];
  for (const realMs of inputs) {
    const result = passRealTime(state, realMs);
    state = result.state;
    events.push(...result.events);
  }
  return { state, events };
}

test("1000 ms of real time moves the run on by one game minute", () => {
  const { state } = passRealTime(sent(), 1000);
  assert.equal(state.run.minute, 1);
  assert.equal(state.realMsCarry, 0);
});

test("parts of a second carry over from one call to the next", () => {
  let state = passRealTime(sent(), 400).state;
  assert.equal(state.run.minute, 0);
  assert.equal(state.realMsCarry, 400);
  state = passRealTime(state, 599).state;
  assert.equal(state.run.minute, 0);
  assert.equal(state.realMsCarry, 999);
  state = passRealTime(state, 1).state;
  assert.equal(state.run.minute, 1);
  assert.equal(state.realMsCarry, 0);
  state = passRealTime(state, 2500).state;
  assert.equal(state.run.minute, 3);
  assert.equal(state.realMsCarry, 500);
});

test("real time passed while paused changes nothing, carry included", () => {
  const before = passRealTime(sent(), 300).state;
  const paused = setPaused(before, true).state;
  assert.equal(paused.paused, true);
  const result = passRealTime(paused, 5000);
  assert.deepEqual(result.state, paused);
  assert.deepEqual(result.events, []);
});

test("after a resume time goes on from where the pause held it", () => {
  let state = passRealTime(sent(), 2300).state;
  state = setPaused(state, true).state;
  state = passRealTime(state, 10000).state;
  state = setPaused(state, false).state;
  assert.equal(state.paused, false);
  assert.equal(state.run.minute, 2);
  state = passRealTime(state, 700).state;
  assert.equal(state.run.minute, 3);
  assert.equal(state.realMsCarry, 0);
});

test("one long real time (a hidden tab) advances that many minutes at once, with no cap", () => {
  const { state } = passRealTime(sent(), 240000);
  assert.equal(state.run.minute, 240);
});

test("1000 ms in one call and 1000 calls of 1 ms give the same state and events", () => {
  const once = feed(sent(), [1000]);
  const many = feed(sent(), Array(1000).fill(1));
  assert.deepEqual(many.state, once.state);
  assert.deepEqual(many.events, once.events);
});

test("real time is ignored when it is not a finite number above zero", () => {
  const state = sent();
  for (const realMs of [
    0,
    -1000,
    Number.NaN,
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
    "1000",
    undefined,
  ]) {
    const result = passRealTime(state, realMs);
    assert.deepEqual(result.state, state, `realMs ${String(realMs)}`);
    assert.deepEqual(result.events, [], `realMs ${String(realMs)}`);
  }
});

test("real time without a map run is ignored", () => {
  const state = newGame();
  const result = passRealTime(state, 5000);
  assert.deepEqual(result.state, state);
  assert.deepEqual(result.events, []);
});

test("passing real time gives the events of the minutes it covers, in order", () => {
  const { state, events } = passRealTime(sent(), 20000);
  assert.equal(state.run.minute, 20);
  assert.deepEqual(
    events.map((event) => event.kind),
    ["activityFinished", "tileRevealed", "activityStarted"],
  );
  assert.ok(events.every((event) => event.minute === 20));
});

test("advanceMinutes advances a span of game minutes, also while paused", () => {
  const paused = setPaused(sent(), true).state;
  const result = advanceMinutes(paused, 20);
  assert.equal(result.state.run.minute, 20);
  assert.equal(result.state.paused, true);
  assert.equal(result.state.realMsCarry, 0);
  assert.deepEqual(
    result.events.map((event) => event.kind),
    ["activityFinished", "tileRevealed", "activityStarted"],
  );
});

test("advanceMinutes of zero minutes changes nothing", () => {
  const state = sent();
  const result = advanceMinutes(state, 0);
  assert.deepEqual(result.state, state);
  assert.deepEqual(result.events, []);
});

test("advanceMinutes rejects a span that is not a whole number of minutes from zero up", () => {
  const state = sent();
  for (const minutes of [-1, 1.5, Number.NaN, Number.POSITIVE_INFINITY, "3"]) {
    assert.throws(
      () => advanceMinutes(state, minutes),
      RangeError,
      `minutes ${String(minutes)}`,
    );
  }
});

test("advanceMinutes and setPaused without a map run change nothing", () => {
  const state = newGame();
  assert.deepEqual(advanceMinutes(state, 10), { state, events: [] });
  assert.deepEqual(setPaused(state, true), { state, events: [] });
});

// The pace tests take their expectations from the task "rozwiazanie-lasu", To do 1 and Questions
// 2 and 3: a game minute for each whole 1/pace of a real second, so 62.5 ms at 16x.

test("at 16x each whole 62.5 ms of real time moves the run on by one game minute", () => {
  const fast = setPace(sent(), 16).state;
  let state = passRealTime(fast, 62).state;
  assert.equal(state.run.minute, 0);
  assert.equal(state.realMsCarry, 992);
  state = passRealTime(state, 0.5).state;
  assert.equal(state.run.minute, 1);
  assert.equal(state.realMsCarry, 0);
  state = passRealTime(state, 125).state;
  assert.equal(state.run.minute, 3);
  assert.equal(passRealTime(fast, 1000).state.run.minute, 16);
});

test("each pace of the data gives its multiple of a game minute per real second", () => {
  for (const [pace, minutes] of [
    [1, 1],
    [2, 2],
    [4, 4],
    [8, 8],
    [16, 16],
  ]) {
    const { state } = passRealTime(setPace(sent(), pace).state, 1000);
    assert.equal(state.run.minute, minutes, `pace ${pace}`);
    assert.equal(state.realMsCarry, 0, `pace ${pace}`);
  }
});

test("a change of pace leaves the carried real time, which counts at the pace it was passed at", () => {
  let state = passRealTime(sent(), 500).state;
  assert.equal(state.realMsCarry, 500);
  state = setPace(state, 16).state;
  assert.equal(state.realMsCarry, 500);
  state = passRealTime(state, 31.25).state;
  assert.equal(state.run.minute, 1);
  assert.equal(state.realMsCarry, 0);
  state = passRealTime(state, 31.25).state;
  state = setPace(state, 1).state;
  assert.equal(state.realMsCarry, 500);
  state = passRealTime(state, 499).state;
  assert.equal(state.run.minute, 1);
  state = passRealTime(state, 1).state;
  assert.equal(state.run.minute, 2);
  assert.equal(state.realMsCarry, 0);
});

test("real time passed before a change of pace counts at the old pace", () => {
  const before = passRealTime(sent(), 500).state;
  assert.equal(
    passRealTime(setPace(before, 16).state, 500).state.run.minute,
    8,
  );
  const old = passRealTime(setPace(sent(), 16).state, 500).state;
  assert.equal(old.run.minute, 8);
  assert.equal(passRealTime(setPace(old, 1).state, 500).state.run.minute, 8);
});

test("a pace chosen while paused changes only the pace, and the run stands until resumed", () => {
  const paused = setPaused(passRealTime(sent(), 300).state, true).state;
  const { state, events } = setPace(paused, 8);
  assert.deepEqual(state, { ...paused, pace: 8 });
  assert.deepEqual(events, []);
  const still = passRealTime(state, 5000).state;
  assert.deepEqual(still, state);
  const resumed = passRealTime(setPaused(state, false).state, 100).state;
  assert.equal(resumed.run.minute, 1);
  assert.equal(resumed.realMsCarry, 100);
});

test("1000 calls of 1 ms at 16x give the same state and events as one call of 1000 ms", () => {
  const fast = setPace(sent(), 16).state;
  const once = feed(fast, [1000]);
  const many = feed(fast, Array(1000).fill(1));
  assert.equal(once.state.run.minute, 16);
  assert.deepEqual(many.state, once.state);
  assert.deepEqual(many.events, once.events);
});
