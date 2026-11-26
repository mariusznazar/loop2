// The body row of the screen of a map run (D-337, D-178, D-125) in React, on jsdom through
// tests/view/page-document.mjs (D-264): each value in a cell of its own, the notes under temperature
// and satiety, the thresholds that stand a value in danger, and the backpack's line under the cells.
// The row is drawn alone, by the component BodyRowCells of its own file, and the cases read its cells.
// Every comparison is of plain data or of a handful of words (D-268).
import { assert, inAct, withPage } from "./page-document.mjs";
import { test } from "node:test";
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import {
  advanceMinutes,
  createCharacter,
  mapRunEnded,
  newGame,
  send,
  setPaused,
  setProgram,
  settleDeath,
} from "../../dist/browser/sim/game.js";
import { emptyProgram } from "../../dist/browser/sim/programs.js";
import { BALANCE } from "../../dist/browser/sim/data/balance.js";
import { BodyRowCells } from "../../dist/browser/view/body-row-cells.js";
import { withEdgeSolved } from "../sim/understanding-fixture.mjs";

const SENT = { mapId: "forest", characterId: 1 };
const entry = (item, count) => ({ item, count });
const PLAN = { take: [entry("stick", 5)], bring: [entry("stick", 3)] };

/** A map run of the character „Ala” on Las under the given trip plan, a chest of ten sticks. */
function sent(tripPlan = PLAN, practice = true) {
  let state = createCharacter(withEdgeSolved(newGame()), "Ala").state;
  if (practice) {
    // One practice in each skill, so that a death goes by the team's resurrection (D-190): the death of
    // a character with no practice uses none, whatever `died` puts on the team.
    state = {
      ...state,
      team: {
        ...state.team,
        characters: state.team.characters.map((character) => ({
          ...character,
          skills: Object.fromEntries(
            Object.entries(character.skills).map(([id, skill]) => [
              id,
              { ...skill, practice: skill.practice + 1 },
            ]),
          ),
        })),
      },
    };
  }
  state = {
    ...state,
    team: { ...state.team, chest: { pieces: { stick: 10 } } },
  };
  state = setProgram(state, { ...emptyProgram(), tripPlan }).state;
  return send(state, SENT, 1760000000000).state;
}

/** The map run played on to its completion, as the screen of a completed map run reads it. */
const completed = (state) =>
  advanceMinutes(
    { ...state, run: { ...state.run, minute: 479, streak: 479 } },
    1,
  ).state;

/**
 * The state's run played on to the character's death and settled at the real moment 1_000, with
 * `usesSpent` uses of the team's resurrection spent before the death; a spent use returns at the
 * moment 9_000_000, after the settlement (D-190).
 */
function died(state, usesSpent) {
  let dying = {
    ...state,
    team: {
      ...state.team,
      resurrectionUsesSpent: usesSpent,
      resurrectionNextReturnAtMs: usesSpent > 0 ? 9_000_000 : null,
    },
  };
  for (let round = 0; round < 50 && !mapRunEnded(dying.run); round += 1)
    dying = advanceMinutes(setPaused(dying, false).state, 5000).state;
  assert.ok(dying.run.death, "precondition: the run ended in a death");
  return settleDeath(dying, 1_000).state;
}

/** The same game with the given fields of its map run replaced. */
const withRun = (state, fields) => ({
  ...state,
  run: { ...state.run, ...fields },
});

/** Draws the body row of the map run in `state` in a root of its own; `show(state)` draws it anew. */
async function draw(document, state) {
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);
  const show = (next) =>
    inAct(() => root.render(createElement(BodyRowCells, { run: next.run })));
  await show(state);
  return { container, show };
}

// Catches a value in `danger` that is not below its threshold, or one below it that is not. The
// thresholds are 35 °C and 30 % (D-337); the nature energy is never in `danger` (D-178).
test("only the value below its threshold stands in danger, and the backpack reads its pieces of the cap", async () => {
  // decision: D-64 "The backpack's cap counts the pieces of all items together"
  // decision: D-178 "The body row ends with „Energia natury {n}”, the mage's nature energy cut down to a whole number, from game minute zero, in the role `text` at every value of the energy, zero included"
  // decision: D-125 "The body row, the backpack, the list of revealed tiles and the drawing of the game map show what the game state holds, whatever the Understanding holds: the body row shows satiety before the condition „Sytość poniżej” is discovered, and the backpack, the list of revealed tiles and the drawing of the game map show every item they hold"
  // decision: D-337 "The body row holds each of its values in a cell of its own"
  await withPage(async ({ document }) => {
    const base = sent();
    const character = {
      ...base.run.character,
      traits: { ...base.run.character.traits, carryingCapacity: 15 },
      backpack: { ...base.run.character.backpack, stick: 5, berry: 2 },
    };
    const cold = withRun(base, {
      body: { temperature: 34.99, satiety: 82, health: 40 },
      natureEnergy: 90,
      character,
    });
    const { container, show } = await draw(document, cold);
    const values = () => [...container.querySelectorAll(".body-value")];
    const marks = () => values().map((v) => v.classList.contains("danger"));
    assert.deepEqual(
      values().map((v) => v.textContent),
      ["Temperatura 34,9 °C", "Sytość 82 %", "Zdrowie 40", "Energia natury 90"],
    );
    assert.deepEqual(marks(), [true, false, false, false]);
    assert.equal(
      container.querySelector(".backpack-text").textContent,
      "Plecak 7/15: patyk 5, jagoda 2",
    );
    // D-337: each value stands in a cell of its own, and no separator stands between the cells.
    const cells = [...container.querySelectorAll(".body-cell")];
    assert.equal(cells.length, 4);
    assert.ok(
      cells.every((cell) => cell.querySelector(".body-value") !== null),
      "every cell holds its value",
    );
    assert.equal(
      container.querySelector(".body-cells").textContent.includes(" · "),
      false,
    );

    await show(
      withRun(base, {
        body: { temperature: 36.2, satiety: 12, health: 40 },
        natureEnergy: 0,
        character: {
          ...character,
          backpack: { ...character.backpack, stick: 0, berry: 0 },
        },
      }),
    );
    assert.deepEqual(marks(), [false, true, false, false]);
    assert.equal(values()[3].textContent, "Energia natury 0");
    assert.equal(
      container.querySelector(".backpack-text").textContent,
      "Plecak 0/15",
    );
  });
});

/** The notes of the body row on the screen: the text of a cell's note and whether it stands in danger. */
const notesOf = (container) =>
  [...container.querySelectorAll(".body-cell")].map((cell) => {
    const note = cell.querySelector(".body-note");
    return note === null
      ? null
      : [note.textContent, note.classList.contains("danger")];
  });

// Catches a note in the same line as its value (D-337 rejects it), a note under health or nature
// energy, notes missing at game minute zero before anything is discovered (D-125), or minutes that
// differ from the game's: on Las from the starting body (37 °C, 100 %) the 83rd minute ends at
// 37 − 83 × 0.024 = 35.008 °C and the 116th at 100 − 116 × 0.6 = 30.4 %, worked out by hand as in
// tests/sim/body.test.mjs.
test("the body row stands in cells with the minutes of the needs under temperature and satiety from game minute zero, none under health and nature energy", async () => {
  // decision: D-178 "The body row ends with „Energia natury {n}”, the mage's nature energy cut down to a whole number, from game minute zero"
  // decision: D-125 "The body row, the backpack, the list of revealed tiles and the drawing of the game map show what the game state holds, whatever the Understanding holds: the body row shows satiety before the condition „Sytość poniżej” is discovered"
  // decision: D-337 "The body row holds each of its values in a cell of its own"
  // decision: D-337 "The note under temperature reads the first of these that holds"
  // decision: D-337 "{n} is the whole game minutes, rounded down, left until the character starts to be chilled or to starve"
  await withPage(async ({ document }) => {
    const started = sent();
    assert.equal(started.run.minute, 0, "precondition: game minute zero");
    const { container } = await draw(document, started);
    const cells = [...container.querySelectorAll(".body-cell")];
    assert.deepEqual(
      cells.map((cell) => cell.querySelector(".body-value").textContent),
      [
        "Temperatura 37,0 °C",
        "Sytość 100 %",
        "Zdrowie 100",
        "Energia natury 100",
      ],
    );
    assert.deepEqual(notesOf(container), [
      ["bez ognia 83 min", false],
      ["bez jedzenia 116 min", false],
      null,
      null,
    ]);
    // A note stands under its value in the same cell, not after it in the line of the value.
    assert.equal(
      cells[0].querySelector(".body-value").textContent.includes("min"),
      false,
    );
  });
});

// Catches „marznie” or „głoduje” not in danger, a note in danger above its threshold, and the minutes
// kept past the threshold. At 35,0 °C and 30 % the character is not yet chilled or starving.
test("a note under temperature and one under satiety read „marznie” and „głoduje” in danger below their thresholds and the minutes at them", async () => {
  // decision: D-337 "The note under temperature reads the first of these that holds"
  // decision: D-337 "{n} is the whole game minutes, rounded down, left until the character starts to be chilled or to starve"
  await withPage(async ({ document }) => {
    const base = sent();
    const { container, show } = await draw(
      document,
      withRun(base, {
        body: { temperature: 34.99, satiety: 29.99, health: 50 },
      }),
    );
    assert.deepEqual(notesOf(container), [
      ["marznie", true],
      ["głoduje", true],
      null,
      null,
    ]);
    await show(
      withRun(base, { body: { temperature: 35, satiety: 30, health: 50 } }),
    );
    assert.deepEqual(notesOf(container), [
      ["bez ognia 0 min", false],
      ["bez jedzenia 0 min", false],
      null,
      null,
    ]);
  });
});

// Catches „bez ognia {n} min” beside a fire on the character's tile, and an unlit map shown as cooling.
test("by a fire the note under temperature reads „przy ogniu”, and the notes follow the game minute", async () => {
  // decision: D-337 "The note under temperature reads the first of these that holds"
  await withPage(async ({ document }) => {
    const base = sent();
    const at = base.run.character.at;
    const { container, show } = await draw(
      document,
      withRun(base, { campfires: [{ at, minutesLeft: 40 }] }),
    );
    assert.deepEqual(notesOf(container)[0], ["przy ogniu", false]);
    assert.deepEqual(notesOf(container)[1], ["bez jedzenia 116 min", false]);
    // The fire gone, the same state again reads minutes.
    await show(base);
    assert.deepEqual(notesOf(container)[0], ["bez ognia 83 min", false]);
  });
});

// Catches notes dropped after the end of a map run (D-337): after a death the notes read the state at
// the stopped minute — „marznie” after a death of cold, „głoduje” after one of hunger — and after a
// completion the minutes of the body at game minute 480.
test("the notes stand after the end of a map run, on the state at the stopped minute", async () => {
  // decision: D-337 "{n} is the whole game minutes, rounded down, left until the character starts to be chilled or to starve"
  await withPage(async ({ document }) => {
    const base = sent();
    const { container, show } = await draw(
      document,
      withRun(base, {
        body: { temperature: 34.2, satiety: 60, health: 0 },
        death: { minute: 5, cause: "cold" },
      }),
    );
    assert.deepEqual(notesOf(container)[0], ["marznie", true]);
    assert.deepEqual(notesOf(container)[1], ["bez jedzenia 50 min", false]);

    await show(
      withRun(base, {
        body: { temperature: 36, satiety: 20, health: 0 },
        death: { minute: 5, cause: "hunger" },
      }),
    );
    assert.deepEqual(notesOf(container)[1], ["głoduje", true]);

    // The real thing: a map run played to a death on the default program and settled. It ends in
    // cold with the body below both thresholds, so both notes stand in danger.
    const dead = died(sent(), BALANCE.resurrectionUses);
    assert.equal(dead.run.death.cause, "cold", "precondition: died of cold");
    assert.ok(dead.run.body.temperature < 35 && dead.run.body.satiety < 30);
    await show(dead);
    assert.deepEqual(notesOf(container), [
      ["marznie", true],
      ["głoduje", true],
      null,
      null,
    ]);

    // A completion: one game minute from 479 leaves 36.976 °C and 99.4 %; 82 more minutes keep the
    // body at or above 35.0 (82 × 0.024 = 1.968), 115 keep satiety at or above 30 (115 × 0.6 = 69).
    await show(completed(sent()));
    assert.deepEqual(notesOf(container), [
      ["bez ognia 82 min", false],
      ["bez jedzenia 115 min", false],
      null,
      null,
    ]);
  });
});
