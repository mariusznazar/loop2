import assert from "node:assert/strict";
import { test } from "node:test";
import { MAPS } from "../../dist/public/sim/data/maps.js";
import {
  advanceMinutes,
  createCharacter,
  newGame,
  passRealTime,
  send,
  setPaused,
  setProgram,
} from "../../dist/public/sim/game.js";
import { programFromRules } from "./program-fixture.mjs";

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
  const game = createCharacter(setProgram(newGame(), program).state, "Ala");
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
