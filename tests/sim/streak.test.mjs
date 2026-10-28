import assert from "node:assert/strict";
import { test } from "node:test";
import { MAPS } from "../../dist/public/sim/data/maps.js";
import { programFromRules } from "./program-fixture.mjs";
import { newKnowingGame } from "./understanding-fixture.mjs";
import {
  advanceMinutes,
  createCharacter,
  restart,
  send,
  setProgram,
} from "../../dist/public/sim/game.js";

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

test("a streak below 480 grows past it where nothing ends the map run yet", () => {
  const state = withRun({ body: body(37, 100, 100), streak: 479 });
  assert.equal(advanceMinutes(state, 1).state.run.streak, 480);
  assert.equal(advanceMinutes(state, 2).state.run.streak, 481);
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
