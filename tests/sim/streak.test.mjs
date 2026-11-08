import assert from "node:assert/strict";
import { test } from "node:test";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import { programFromRules } from "./program-fixture.mjs";
import { newKnowingGame } from "./understanding-fixture.mjs";
import {
  advanceMinutes,
  createCharacter,
  restart,
  send,
  setProgram,
} from "../../dist/browser/sim/game.js";

// The streak counts the game minutes in which the character loses no health to cold or hunger.
// On Las the body cools by 0.002 × (37 − 25) = 0.024 °C a minute and stays at or above 35.0 °C
// through minute 83 (35.008), so minutes 1 to 83 lose nothing and minute 84 is the first chilled
// one; satiety falls by 0.6 a minute from 100 and stays at or above 30 through minute 116.

const [mapId] = Object.entries(MAPS)[0];
const SENT = { mapId, characterId: 1 };
const REAL_MS = 1760000000000;
const EXPLORING = programFromRules({
  condition: { kind: "always" },
  action: { kind: "explore" },
});

/** A game sent to Las; the run stands at minute 0 with the streak at 0. */
function sent() {
  return send(
    createCharacter(setProgram(newKnowingGame(), EXPLORING).state, "Ala").state,
    SENT,
    REAL_MS,
  ).state;
}

const body = (temperature, satiety, health) => ({
  temperature,
  satiety,
  health,
});

/** The sent game with its body and streak replaced. */
function withRun(fields) {
  const state = sent();
  return { ...state, run: { ...state.run, ...fields } };
}

test("a map run starts with a streak of 0, by send and by restart", () => {
  const state = sent();
  assert.equal(state.run.streak, 0);
  const later = advanceMinutes(state, 10).state;
  assert.equal(later.run.streak, 10);
  assert.equal(restart(later).state.run.streak, 0);
});

test("ten game minutes with no loss to cold or hunger give a streak of 10", () => {
  const { state } = advanceMinutes(sent(), 10);
  assert.equal(state.run.minute, 10);
  assert.equal(state.run.streak, 10);
});

test("a game minute of loss to cold sets the streak to 0, and it stays 0 while the loss goes on", () => {
  const at83 = advanceMinutes(sent(), 83).state;
  assert.equal(at83.run.streak, 83);
  const at84 = advanceMinutes(at83, 1).state;
  assert.equal(at84.run.streak, 0, "minute 84 is chilled: 34.984 °C");
  assert.equal(advanceMinutes(at84, 5).state.run.streak, 0);
});

test("a game minute of loss to hunger sets the streak to 0", () => {
  // Satiety 30.4 falls to 29.8 below 30: starving; the temperature 36.9 stays above 35.
  const state = withRun({ body: body(36.9, 30.4, 100), streak: 7 });
  const { state: after } = advanceMinutes(state, 1);
  assert.equal(after.run.body.health, 99.65);
  assert.equal(after.run.streak, 0);
});

test("the streak grows again after a minute of loss once the body no longer loses", () => {
  const chilled = withRun({ body: body(34.99, 100, 100), streak: 7 });
  const lost = advanceMinutes(chilled, 1).state;
  assert.equal(lost.run.streak, 0);
  const warm = { ...lost, run: { ...lost.run, body: body(37, 100, 90) } };
  assert.equal(advanceMinutes(warm, 3).state.run.streak, 3);
});

test("a minute that leaves the character neither chilled nor starving grows the streak by one, health below the start included", () => {
  const state = withRun({ body: body(37, 100, 20), streak: 41 });
  const { state: after } = advanceMinutes(state, 1);
  assert.equal(after.run.body.health, 20.05, "health regains 0.05");
  assert.equal(after.run.streak, 42);
});

test("a streak of 479 grows to 480 in the next minute, where the map run completes and passes no minute after it", () => {
  // Changed by the task "rozwiazanie-lasu": a streak at the solving number of Las (480) now ends
  // the map run in a completion, so it no longer grows past 480.
  const state = withRun({ body: body(37, 100, 100), streak: 479 });
  assert.equal(advanceMinutes(state, 1).state.run.streak, 480);
  const two = advanceMinutes(state, 2).state;
  assert.equal(two.run.streak, 480);
  assert.equal(two.run.minute, 1);
});

test("a map run ended in death holds a streak of 0", () => {
  // Explore runs to minute 20; the body dies in minute 2, after a streak of 5 at minute 0.
  const state = withRun({ body: body(34, 50, 0.7), streak: 5 });
  const died = advanceMinutes(state, 30).state;
  assert.equal(died.run.minute, 2);
  assert.deepEqual(died.run.death, { minute: 2, cause: "cold" });
  assert.equal(died.run.streak, 0);
});

test("a map run split into calls of one minute holds the same streak as one call", () => {
  let split = sent();
  for (let i = 0; i < 100; i += 1) split = advanceMinutes(split, 1).state;
  const whole = advanceMinutes(sent(), 100).state;
  assert.equal(whole.run.streak, 0, "minute 84 zeroed it, 85 to 100 lose");
  assert.deepEqual(split.run, whole.run);
});

// The loss of the streak is an event of the simulation (task kronika-z-filtrami, To do 4; D-341):
// one `streakLost` where a streak above zero falls to zero, with the game minute, the streak before
// the loss and the cause. The cause is cold where the body is chilled after the step, hunger where
// it is starving, both where it is both (thresholds: 35.0 °C and satiety 30, as above).

/** The events of the kind `streakLost` in `events`. */
const lossesIn = (events) =>
  events.filter((event) => event.kind === "streakLost");

test("a game minute of loss to cold at a streak above zero gives one event of the loss, with the streak and the cause", () => {
  // 34.99 − 0.024 is below 35.0: chilled in minute 1; satiety 100 − 0.6 is fed.
  const state = withRun({ body: body(34.99, 100, 100), streak: 7 });
  const { events } = advanceMinutes(state, 1);
  assert.deepEqual(lossesIn(events), [
    { kind: "streakLost", minute: 1, streak: 7, cause: "cold" },
  ]);
});

test("a game minute of loss to hunger at a streak above zero gives one event of the loss with the cause hunger", () => {
  // Satiety 30.4 falls to 29.8, below 30; the temperature 36.9 stays above 35.
  const state = withRun({ body: body(36.9, 30.4, 100), streak: 7 });
  const { events } = advanceMinutes(state, 1);
  assert.deepEqual(lossesIn(events), [
    { kind: "streakLost", minute: 1, streak: 7, cause: "hunger" },
  ]);
});

test("a game minute chilled and starving together gives one event of the loss with the cause cold and hunger", () => {
  const state = withRun({ body: body(34.99, 30.4, 100), streak: 7 });
  const { events } = advanceMinutes(state, 1);
  assert.deepEqual(lossesIn(events), [
    { kind: "streakLost", minute: 1, streak: 7, cause: "coldAndHunger" },
  ]);
});

test("the loss is reported in the game minute it happens, after a streak grown by the game minutes before it", () => {
  // Minute 84 is the first chilled minute of Las, after a streak of 83.
  const { events } = advanceMinutes(sent(), 100);
  assert.deepEqual(lossesIn(events), [
    { kind: "streakLost", minute: 84, streak: 83, cause: "cold" },
  ]);
});

test("a streak of zero gives no event of a loss, and the game minutes after a loss give none either", () => {
  const chilledAtZero = withRun({ body: body(34.99, 100, 100), streak: 0 });
  assert.deepEqual(lossesIn(advanceMinutes(chilledAtZero, 5).events), []);
  const lost = advanceMinutes(
    withRun({ body: body(34.99, 100, 100), streak: 7 }),
    5,
  );
  assert.equal(
    lossesIn(lost.events).length,
    1,
    "one loss in five chilled minutes",
  );
});

test("a game minute of an encounter reports no loss, the streak growing in it", () => {
  const fighting = withRun({
    body: body(34.99, 100, 100),
    streak: 7,
    current: null,
    activeCombat: { creatureId: "wolf", attackMinute: 0, resolveMinute: 5 },
  });
  const { state, events } = advanceMinutes(fighting, 1);
  assert.equal(state.run.streak, 8);
  assert.deepEqual(lossesIn(events), []);
});

test("a death of cold at a streak above zero reports the loss in its minute, before the death", () => {
  // Health 0.1 is gone in minute 1, a minute of chill: the streak of 5 falls in the minute of death.
  const state = withRun({ body: body(34, 50, 0.1), streak: 5 });
  const { events } = advanceMinutes(state, 1);
  const kinds = events.map((event) => event.kind);
  assert.deepEqual(lossesIn(events), [
    { kind: "streakLost", minute: 1, streak: 5, cause: "cold" },
  ]);
  assert.ok(
    kinds.indexOf("streakLost") < kinds.indexOf("characterDied"),
    "the loss comes before the death of that minute",
  );
  assert.deepEqual(
    events.find((event) => event.kind === "characterDied"),
    { kind: "characterDied", minute: 1, cause: "cold" },
  );
});

test("a death of hunger at a streak above zero reports the loss with the cause hunger, before the death", () => {
  const state = withRun({ body: body(37, 30.4, 0.1), streak: 9 });
  const { events } = advanceMinutes(state, 1);
  const kinds = events.map((event) => event.kind);
  assert.deepEqual(lossesIn(events), [
    { kind: "streakLost", minute: 1, streak: 9, cause: "hunger" },
  ]);
  assert.ok(kinds.indexOf("streakLost") < kinds.indexOf("characterDied"));
});

test("a death of cold at a streak of zero reports no loss", () => {
  const state = withRun({ body: body(34, 50, 0.1), streak: 0 });
  const { events } = advanceMinutes(state, 1);
  assert.deepEqual(lossesIn(events), []);
  assert.ok(events.some((event) => event.kind === "characterDied"));
});

test("a map run split into calls of one minute reports the same losses as one call", () => {
  const events = [];
  let split = withRun({ body: body(36.9, 31.2, 100), streak: 4 });
  const whole = advanceMinutes(split, 10);
  for (let i = 0; i < 10; i += 1) {
    const step = advanceMinutes(split, 1);
    events.push(...step.events);
    split = step.state;
  }
  assert.deepEqual(lossesIn(events), lossesIn(whole.events));
  assert.equal(lossesIn(events).length, 1);
});
