import assert from "node:assert/strict";
import { test } from "node:test";
import { ACTIONS } from "../../dist/browser/sim/data/actions.js";
import { CONDITIONS } from "../../dist/browser/sim/data/conditions.js";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import { emptyProgram, forestBest } from "./reference-programs.mjs";
import {
  fullUnderstanding,
  newKnowingGame,
  withEdgeSolved,
} from "./understanding-fixture.mjs";
import {
  advanceMinutes,
  createCharacter,
  newGame,
  send,
  setProgram,
} from "../../dist/browser/sim/game.js";

// D-378: on Las a program drawn from the closed lists solves the map on a seed named here, and the
// empty program dies there. The program is the best program of Las of the reference programs. The
// send with the real time SOLVING_REAL_MS, which takes the seed SOLVING_SEED, is one on which it
// solves the map; the moment was found by trying moments. The empty program's death in minute 243,
// of cold, is worked out by hand from the numbers of D-387 and D-388: on Las, at 25 °C, the body
// cools by 0.024 °C a minute, so it is chilled from minute 84 (37 − 0.024 × 84 = 34.984), and
// starving from minute 117 (100 − 0.6 × 117 = 29.8); health, full at 100, falls by 0.35 a minute
// from 84 to 116 (33 minutes, 11.55) and by 0.7 from 117 on, so 88.45 − 0.7 × 126 = 0.25 at minute
// 242 and below zero in minute 243, while chilled.
//
// With „Zapal” the spell Płomyk of D-63, paid with 10 nature energy besides its sticks (D-177), the
// program lights its campfire on the same seed and pays for its lightings with nature energy.

const mapId = "forest";
const forest = MAPS[mapId];
// The first character a new game creates takes the id 1.
const characterId = 1;
const SENT = { mapId, characterId };

const SOLVING_REAL_MS = 1760000800000;
const SOLVING_SEED = 1946377216;
/** The streak that solves Las (D-136), in game minutes. */
const STREAK_MINUTES = 480;
/**
 * A streak that a loss of health breaks starts again, so a map run ends in a completion or a death
 * long after minute 480. A map run still open after this many game minutes counts as not solved.
 */
const CAP_MINUTES = 5000;

const BEST_OF_LAS = forestBest;

/**
 * The game sent to Las with the program on the named seed, advanced a game minute at a time until
 * its map run ends in a completion or a death, or stands at the cap. Gives the state it ended in,
 * the events of the whole map run and the lowest nature energy the character reached.
 */
function played(program) {
  const ready = createCharacter(
    setProgram(withEdgeSolved(newKnowingGame()), program).state,
    "Ala",
  ).state;
  let state = send(ready, SENT, SOLVING_REAL_MS).state;
  const events = [];
  let lowestEnergy = state.run.natureEnergy;
  while (
    state.run.completion === null &&
    state.run.death === null &&
    state.run.minute < CAP_MINUTES
  ) {
    const next = advanceMinutes(state, 1);
    state = next.state;
    events.push(...next.events);
    lowestEnergy = Math.min(lowestEnergy, state.run.natureEnergy);
  }
  return { state, events, lowestEnergy };
}

/** The kinds of the actions of the character that ended in the events. */
function finishedKinds(events) {
  return new Set(
    events
      .filter(
        (e) => e.kind === "activityFinished" && e.activity.kind === "rule",
      )
      .map((e) => e.activity.action.kind),
  );
}

/** The kinds of the conditions of the groups and rules of the program. */
function conditionKinds(program) {
  return program.groups.flatMap((group) => [
    group.condition.kind,
    ...group.rules.map((rule) => rule.condition.kind),
  ]);
}

/** The kinds of the actions of the rules of the program. */
function actionKinds(program) {
  return program.groups.flatMap((group) =>
    group.rules.map((rule) => rule.action.kind),
  );
}

test("precondition: the knowing game these tests start from holds every action and condition of the closed lists", () => {
  const { understanding } = newKnowingGame();
  assert.deepEqual(
    Object.keys(ACTIONS).filter((a) => !understanding.actions.includes(a)),
    [],
  );
  assert.deepEqual(
    Object.keys(CONDITIONS).filter(
      (c) => !understanding.conditions.includes(c),
    ),
    [],
  );
  assert.deepEqual(understanding, fullUnderstanding());
});

test("the map is Las and the send takes the seed named here", () => {
  // decision: D-378 "On Las a program built of the closed lists of conditions and actions solves the map, paying nature energy for its lightings, on at least one seed that a test of the simulation names"
  assert.equal(forest.name, "Las");
  const sent = send(
    createCharacter(withEdgeSolved(newGame()), "Ala").state,
    SENT,
    SOLVING_REAL_MS,
  ).state;
  assert.equal(sent.run.seed, SOLVING_SEED);
});

test("every condition and action of the program is a kind the data list", () => {
  // decision: D-378 "On Las a program built of the closed lists of conditions and actions solves the map, paying nature energy for its lightings, on at least one seed that a test of the simulation names"
  const conditions = conditionKinds(BEST_OF_LAS);
  const actions = actionKinds(BEST_OF_LAS);
  assert.ok(conditions.length > 0 && actions.length > 0);
  assert.deepEqual(
    conditions.filter((kind) => !Object.hasOwn(CONDITIONS, kind)),
    [],
  );
  assert.deepEqual(
    actions.filter((kind) => !Object.hasOwn(ACTIONS, kind)),
    [],
  );
});

test("on Las the program solves the map on the named seed, lighting with „Zapal” and paying nature energy for it", () => {
  // decision: D-378 "On Las a program built of the closed lists of conditions and actions solves the map, paying nature energy for its lightings, on at least one seed that a test of the simulation names"
  const { state, events, lowestEnergy } = played(BEST_OF_LAS);
  assert.notEqual(state.run.completion, null);
  assert.ok(state.run.completion.minute >= STREAK_MINUTES);
  assert.equal(state.run.death, null);
  assert.ok(!events.some((e) => e.kind === "characterDied"));
  // It lives by gathering, eating, building and lighting a campfire.
  const kinds = finishedKinds(events);
  for (const kind of ["gather", "eat", "craftCampfire", "lightCampfire"]) {
    assert.ok(kinds.has(kind), `the program never ends a ${kind}`);
  }
  // The price of Płomyk is in effect: its lightings spent nature energy.
  assert.ok(
    lowestEnergy < 100,
    `nature energy never fell below ${lowestEnergy}`,
  );
});

test("on the same seed the empty program dies in game minute 243, of cold", () => {
  // decision: D-60 "Outside combat, a character loses health in each game minute in which it is chilled — its body temperature below the threshold of chill — and loses it again, apart, in each game minute in which it is starving — its satiety below the threshold of hunger"
  // decision: D-61 "A character dies in the game minute in which its health reaches zero, also during the character's action in progress, and the map run then ends in death with its cause"
  // decision: D-61 "For a death of cold or hunger, the cause is cold where the character's body is chilled in that game minute, and hunger otherwise"
  // decision: D-387 "These numbers are requirements of the game, held in its data (D-18), that tests of the simulation may expect"
  // decision: D-378 "On Las a program built of the closed lists of conditions and actions solves the map, paying nature energy for its lightings, on at least one seed that a test of the simulation names, and the empty program dies there"
  const { state, events } = played(emptyProgram);
  assert.deepEqual(state.run.death, { minute: 243, cause: "cold" });
  assert.equal(state.run.minute, 243);
  assert.deepEqual(
    events.filter((e) => e.kind === "characterDied"),
    [{ kind: "characterDied", minute: 243, cause: "cold" }],
  );
});
