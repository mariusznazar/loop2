import assert from "node:assert/strict";
import { test } from "node:test";
import { MAPS } from "../../dist/public/sim/data/maps.js";
import { bodyMinute } from "../../dist/public/sim/body.js";
import { programFromRules } from "./program-fixture.mjs";
import { newKnowingGame } from "./understanding-fixture.mjs";
import {
  advanceMinutes,
  createCharacter,
  end,
  passRealTime,
  restart,
  send,
  setProgram,
} from "../../dist/public/sim/game.js";

// Every expected number below is worked out by hand from the task's numbers: on Las the body
// cools by 0.002 × (37 − 25) = 0.024 °C a minute, satiety falls by 0.6 a minute, health falls by
// 0.35 for chilled (below 35.0 °C) and 0.35 for starving (below 30), and rises by 0.05 otherwise.

const [mapId, forest] = Object.entries(MAPS)[0];
// The first character a new game creates takes the id 1.
const characterId = 1;
const SENT = { mapId, characterId };
const REAL_MS = 1760000000000;

const ALWAYS = { kind: "always" };
const rule = (action) => ({ condition: ALWAYS, action });
const [stick] = forest.resources.map((resource) => resource.id);
/** A program of today's closed list: explore, walk to sticks, otherwise wander. */
const MIXED = programFromRules(
  rule({ kind: "explore" }),
  rule({ kind: "walkTo", resource: stick }),
  rule({ kind: "wander" }),
);
const EXPLORING = programFromRules(rule({ kind: "explore" }));

/** A game sent to Las with the program; the run stands at minute 0. */
function sent(program = MIXED) {
  return send(
    createCharacter(setProgram(newKnowingGame(), program).state, "Ala").state,
    SENT,
    REAL_MS,
  ).state;
}

/** A game sent to Las whose body is replaced at minute 0 (explore runs until minute 20). */
function withBody(body) {
  const state = sent(EXPLORING);
  return { ...state, run: { ...state.run, body } };
}

const body = (temperature, satiety, health) => ({
  temperature,
  satiety,
  health,
});

test("Las is the map these numbers are worked out for", () => {
  assert.equal(forest.name, "Las");
  assert.equal(forest.ambientTemperature, 25);
});

test("a map run starts at 37.0 °C, satiety 100, health 100, alive", () => {
  const { run } = sent();
  assert.equal(run.minute, 0);
  assert.deepEqual(run.body, body(37, 100, 100));
  assert.equal(run.death, null);
});

test("on Las the body at named minutes is the one worked out by hand", () => {
  const expected = [
    [1, body(36.976, 99.4, 100)],
    [83, body(35.008, 50.2, 100)],
    [84, body(34.984, 49.6, 99.65)],
    [116, body(34.216, 30.4, 88.45)],
    [117, body(34.192, 29.8, 87.75)],
    [167, body(32.992, 0, 52.75)],
    [242, body(31.192, 0, 0.25)],
  ];
  let state = sent();
  for (const [minute, value] of expected) {
    state = advanceMinutes(state, minute - state.run.minute).state;
    assert.equal(state.run.minute, minute);
    assert.deepEqual(state.run.body, value, `minute ${minute}`);
    assert.equal(state.run.death, null, `minute ${minute}`);
  }
});

test("on Las a program of today's closed list is alive in minute 242 and dies of cold in minute 243", () => {
  const at242 = advanceMinutes(sent(), 242).state;
  assert.equal(at242.run.death, null);
  assert.ok(
    at242.run.current.endMinute > 243,
    "an action is in progress across minute 243",
  );
  const { state, events } = advanceMinutes(at242, 30);
  assert.equal(state.run.minute, 243, "the span stops at death");
  assert.deepEqual(state.run.body, body(31.168, 0, 0));
  assert.deepEqual(state.run.death, { minute: 243, cause: "cold" });
  assert.deepEqual(events, [
    { kind: "characterDied", minute: 243, cause: "cold" },
  ]);
  assert.deepEqual(
    state.run.current,
    at242.run.current,
    "the action in progress stays as it stood",
  );
  assert.deepEqual(state.run.tiles, at242.run.tiles);
  assert.deepEqual(state.run.character, at242.run.character);
  assert.equal(state.run.wanderRandom, at242.run.wanderRandom);
});

test("death falls during an action in progress, which gives no activityFinished", () => {
  // Explore runs from minute 0 to 20; the body dies in minute 1.
  const start = withBody(body(34, 50, 0.7));
  assert.equal(start.run.current.endMinute, 20);
  const { state, events } = advanceMinutes(start, 1);
  assert.equal(state.run.minute, 1);
  assert.deepEqual(state.run.body, body(33.976, 49.4, 0.35));
  assert.equal(state.run.death, null, "0.7 − 0.35 leaves 0.35");
  assert.deepEqual(events, []);
  const died = advanceMinutes(state, 30);
  assert.equal(died.state.run.minute, 2);
  assert.deepEqual(died.state.run.body, body(33.952, 48.8, 0));
  assert.deepEqual(died.state.run.death, { minute: 2, cause: "cold" });
  assert.deepEqual(died.events, [
    { kind: "characterDied", minute: 2, cause: "cold" },
  ]);
  assert.deepEqual(died.state.run.current, start.run.current);
});

test("a map run that is warm but hungry dies of hunger", () => {
  const { state, events } = advanceMinutes(withBody(body(37, 10, 0.35)), 5);
  assert.equal(state.run.minute, 1);
  assert.deepEqual(state.run.body, body(36.976, 9.4, 0));
  assert.deepEqual(state.run.death, { minute: 1, cause: "hunger" });
  assert.deepEqual(events, [
    { kind: "characterDied", minute: 1, cause: "hunger" },
  ]);
});

test("a map run both chilled and starving loses both and dies of cold", () => {
  const { state } = advanceMinutes(withBody(body(30, 10, 1)), 5);
  assert.equal(state.run.minute, 2);
  assert.deepEqual(state.run.body, body(29.952, 8.8, 0));
  assert.deepEqual(state.run.death, { minute: 2, cause: "cold" });
});

test("health rises by 0.05 where neither chilled nor starving, not above 100", () => {
  let state = withBody(body(37, 100, 99.9));
  state = advanceMinutes(state, 1).state;
  assert.equal(state.run.body.health, 99.95);
  state = advanceMinutes(state, 1).state;
  assert.equal(state.run.body.health, 100);
  state = advanceMinutes(state, 1).state;
  assert.equal(state.run.body.health, 100);
});

test("satiety does not fall below 0", () => {
  const { state } = advanceMinutes(withBody(body(37, 0.4, 100)), 2);
  assert.deepEqual(state.run.body, body(36.952, 0, 99.3));
});

test("the warmth on the tile warms the body, capped at 37.0 °C on the sum", () => {
  // Nothing burns yet, so the body module is given the warmth directly.
  const cases = [
    [body(37, 100, 100), 0.5, body(37, 99.4, 100)],
    [body(36.9, 100, 100), 0.5, body(37, 99.4, 100)],
    [body(36, 100, 100), 0.15, body(36.126, 99.4, 100)],
    [body(36.98, 100, 100), 0.03, body(36.986, 99.4, 100)],
  ];
  for (const [before, warmth, after] of cases) {
    const result = bodyMinute(before, warmth, forest);
    assert.deepEqual(result.body, after, `${before.temperature} + ${warmth}`);
    assert.equal(result.death, null);
  }
});

test("a value the decimal arithmetic puts exactly on a threshold does not cross it", () => {
  // 35.24 − 10 × 0.024 is 35.0 exactly: not chilled; binary arithmetic gives 34.99999999999998.
  let state = advanceMinutes(withBody(body(35.24, 100, 50)), 10).state;
  assert.deepEqual(state.run.body, body(35, 94, 50.5));
  state = advanceMinutes(state, 1).state;
  assert.deepEqual(state.run.body, body(34.976, 93.4, 50.15));
  // 33 − 5 × 0.6 is 30 exactly: not starving; binary arithmetic gives 29.999999999999993.
  state = advanceMinutes(withBody(body(37, 33, 50)), 5).state;
  assert.deepEqual(state.run.body, body(36.88, 30, 50.25));
  state = advanceMinutes(state, 1).state;
  assert.deepEqual(state.run.body, body(36.856, 29.4, 49.9));
});

/** The state after each of `minutes` calls of one minute each, index = calls made. */
function minuteByMinute(start, minutes) {
  const states = [start];
  const events = [];
  let state = start;
  for (let i = 0; i < minutes; i += 1) {
    const result = advanceMinutes(state, 1);
    state = result.state;
    states.push(state);
    events.push(...result.events);
  }
  return { states, events };
}

test("a span split into calls gives the same state and events at every minute up to and including death", () => {
  const reference = minuteByMinute(sent(), 260);
  assert.equal(reference.states[243].run.death?.minute, 243);
  assert.equal(reference.states[260].run.minute, 243);
  const splits = [
    [260],
    [243, 17],
    [242, 1, 17],
    [83, 1, 32, 1, 125, 18],
    [7, 50, 100, 70, 33],
  ];
  for (const split of splits) {
    let state = sent();
    let calls = 0;
    const events = [];
    for (const minutes of split) {
      const result = advanceMinutes(state, minutes);
      state = result.state;
      calls += minutes;
      events.push(...result.events);
      assert.deepEqual(
        state,
        reference.states[calls],
        `split ${split.join("+")} after ${calls} minutes`,
      );
    }
    assert.deepEqual(events, reference.events, `split ${split.join("+")}`);
  }
});

test("real time reaching death gives the same state however it is split", () => {
  const once = passRealTime(sent(), 243500).state;
  const split = passRealTime(passRealTime(sent(), 242500).state, 1500).state;
  assert.equal(once.run.death?.minute, 243);
  assert.deepEqual(split, once);
  const later = passRealTime(sent(), 300000).state;
  assert.deepEqual(later, once);
});

test("a map run ended in death passes no minute", () => {
  const dead = advanceMinutes(sent(), 300).state;
  assert.equal(dead.run.minute, 243);
  for (const minutes of [0, 1, 50]) {
    assert.deepEqual(advanceMinutes(dead, minutes), {
      state: dead,
      events: [],
    });
  }
  for (const realMs of [1, 1000, 60000]) {
    assert.deepEqual(passRealTime(dead, realMs), { state: dead, events: [] });
  }
});

test("restart and end take a map run ended in death as one in progress", () => {
  const dead = advanceMinutes(sent(), 300).state;
  const restarted = restart(dead);
  assert.deepEqual(restarted, restart(sent()));
  assert.equal(restarted.state.run.seed, dead.run.seed);
  assert.equal(restarted.state.run.minute, 0);
  assert.deepEqual(restarted.state.run.body, body(37, 100, 100));
  assert.equal(restarted.state.run.death, null);
  assert.equal(restarted.events[0].kind, "mapRunEnded");
  const ended = end(dead);
  assert.equal(ended.state.run, null);
  assert.deepEqual(ended.events, [{ kind: "mapRunEnded" }]);
  // „Zakończ” after death leads to the headquarters (D-53, D-62): no map run, the team as it was,
  // and the same character sent from there again.
  assert.deepEqual(ended.state.team, dead.team);
  const again = send(ended.state, SENT, REAL_MS + 1000).state;
  assert.equal(again.run.character.id, characterId);
  assert.equal(again.run.death, null);
});

test("the body step reports a loss only when the character is chilled or starving after it", () => {
  // Worked by hand: Las cools the body by 0.024 °C and satiety falls by 0.6 in a minute.
  const cases = [
    [body(37, 100, 100), false, "warm and fed"],
    [body(35.02, 100, 100), true, "35.02 − 0.024 = 34.996, below 35.0"],
    [body(35.1, 100, 100), false, "35.1 − 0.024 = 35.076, not below 35.0"],
    [body(37, 30.5, 100), true, "30.5 − 0.6 = 29.9, below 30"],
    [body(37, 31, 100), false, "31 − 0.6 = 30.4, not below 30"],
    [body(37, 100, 20), false, "wounded but neither chilled nor starving"],
    [body(34, 50, 0.2), true, "chilled to death in this minute"],
  ];
  for (const [before, lost, why] of cases) {
    assert.equal(bodyMinute(before, 0, forest).lostHealth, lost, why);
  }
});
