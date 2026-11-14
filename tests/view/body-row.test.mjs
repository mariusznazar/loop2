// The row of the body and the backpack under the scene: the temperature in tenths with a decimal
// comma (D-57), cut down, never rounded; a value below the threshold of chill or hunger in `danger`;
// the backpack's pieces of its cap (D-64). The row ends with „Energia natury {n}”, cut down to a
// whole number like satiety and health, never in `danger` (D-178). Under temperature and satiety
// stands a note of the minutes the need lasts (D-337); health and nature energy stand with none.
import assert from "node:assert/strict";
import { test } from "node:test";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import { createCharacter, newGame, send } from "../../dist/browser/sim/game.js";
import {
  backpackText,
  bodyCells,
  bodyValues,
  satietyNoteText,
  temperatureNoteText,
} from "../../dist/browser/view/body-row.js";
import { withEdgeSolved } from "../sim/understanding-fixture.mjs";

const LAS = MAPS.forest;

/** A map run of „Ala” on Las at game minute zero, her body and nature energy and fields replaced. */
function runOf(body, natureEnergy = 100, fields = {}) {
  const state = send(
    createCharacter(withEdgeSolved(newGame()), "Ala").state,
    { mapId: "forest", characterId: 1 },
    1760000000000,
  ).state;
  return { ...state.run, body, natureEnergy, ...fields };
}

/** The character of a map run with the given backpack and carrying capacity. */
function character(backpack, carryingCapacity = 15) {
  return {
    id: 1,
    at: { q: 0, r: 0 },
    traits: { carryingCapacity },
    backpack: { stick: 0, berry: 0, moss: 0, fiber: 0, ...backpack },
  };
}

// The values stand in cells of their own, each with its own note (D-337), so no line that joins the
// four values by „ · ” is checked.
test("the body row reads temperature, satiety, health and nature energy in cells, with the minutes under the first two, as D-178 gives for Las", () => {
  // D-178: „Temperatura 36,9 °C” with „bez ognia 79 min”, „Sytość 82 %” with „bez jedzenia 86 min”,
  // „Zdrowie 100” and „Energia natury 90”; the minutes are worked out by hand in tests/sim/body.test.mjs.
  const cells = bodyCells(
    runOf({ temperature: 36.9, satiety: 82, health: 100 }, 90),
    LAS,
  );
  assert.deepEqual(cells, [
    {
      text: "Temperatura 36,9 °C",
      danger: false,
      note: { text: "bez ognia 79 min", danger: false },
    },
    {
      text: "Sytość 82 %",
      danger: false,
      note: { text: "bez jedzenia 86 min", danger: false },
    },
    { text: "Zdrowie 100", danger: false, note: null },
    { text: "Energia natury 90", danger: false, note: null },
  ]);
});

test("nature energy is cut down to a whole number and never stands in danger, at zero too", () => {
  const body = { temperature: 36.5, satiety: 50, health: 50 };
  assert.deepEqual(bodyValues(body, 89.5)[3], {
    text: "Energia natury 89",
    danger: false,
  });
  assert.deepEqual(bodyValues(body, 0)[3], {
    text: "Energia natury 0",
    danger: false,
  });
  assert.deepEqual(bodyValues(body, 100)[3], {
    text: "Energia natury 100",
    danger: false,
  });
});

test("temperature is cut down to tenths, never rounded up", () => {
  assert.equal(
    bodyValues({ temperature: 36.976, satiety: 100, health: 100 })[0].text,
    "Temperatura 36,9 °C",
  );
  assert.equal(
    bodyValues({ temperature: 37.0, satiety: 100, health: 100 })[0].text,
    "Temperatura 37,0 °C",
  );
});

test("a chilled 34.99 °C shows as „34,9” in danger; 35.0 is not chilled", () => {
  const chilled = bodyValues({ temperature: 34.99, satiety: 100, health: 50 });
  assert.deepEqual(chilled[0], { text: "Temperatura 34,9 °C", danger: true });
  const warm = bodyValues({ temperature: 35.0, satiety: 100, health: 50 });
  assert.deepEqual(warm[0], { text: "Temperatura 35,0 °C", danger: false });
});

test("satiety and health are cut down to whole numbers", () => {
  const values = bodyValues({
    temperature: 36.5,
    satiety: 82.999999,
    health: 99.95,
  });
  assert.equal(values[1].text, "Sytość 82 %");
  assert.equal(values[2].text, "Zdrowie 99");
});

test("satiety below 30 stands in danger and 30 does not; health never does", () => {
  const starving = bodyValues({ temperature: 36.5, satiety: 29.4, health: 3 });
  assert.deepEqual(starving[1], { text: "Sytość 29 %", danger: true });
  assert.deepEqual(starving[2], { text: "Zdrowie 3", danger: false });
  assert.equal(starving[0].danger, false);
  const fed = bodyValues({ temperature: 36.5, satiety: 30, health: 3 });
  assert.deepEqual(fed[1], { text: "Sytość 30 %", danger: false });
});

test("an empty backpack reads „Plecak 0/15”", () => {
  assert.equal(backpackText(character({})), "Plecak 0/15");
});

test("a backpack holding items reads its count, its cap and each held item in the data's order", () => {
  assert.equal(
    backpackText(character({ berry: 2, stick: 5 })),
    "Plecak 7/15: patyk 5, jagoda 2",
  );
  assert.equal(
    backpackText(character({ fiber: 1, berry: 3 })),
    "Plecak 4/15: jagoda 3, włókno 1",
  );
});

test("the cap is the character's carrying capacity", () => {
  assert.equal(backpackText(character({ moss: 2 }, 20)), "Plecak 2/20: mech 2");
});

test("the words of the note under temperature, one for each state", () => {
  // D-337: „marznie” in red; otherwise „przy ogniu”, „nie stygnie” or „bez ognia {n} min”.
  assert.deepEqual(temperatureNoteText({ kind: "chilled" }), {
    text: "marznie",
    danger: true,
  });
  assert.deepEqual(temperatureNoteText({ kind: "fire" }), {
    text: "przy ogniu",
    danger: false,
  });
  assert.deepEqual(temperatureNoteText({ kind: "not-cooling" }), {
    text: "nie stygnie",
    danger: false,
  });
  assert.deepEqual(temperatureNoteText({ kind: "minutes", minutes: 79 }), {
    text: "bez ognia 79 min",
    danger: false,
  });
  assert.deepEqual(temperatureNoteText({ kind: "minutes", minutes: 0 }), {
    text: "bez ognia 0 min",
    danger: false,
  });
});

test("the words of the note under satiety, one for each state", () => {
  // D-337: „głoduje” in red; otherwise „bez jedzenia {n} min”.
  assert.deepEqual(satietyNoteText({ kind: "starving" }), {
    text: "głoduje",
    danger: true,
  });
  assert.deepEqual(satietyNoteText({ kind: "minutes", minutes: 86 }), {
    text: "bez jedzenia 86 min",
    danger: false,
  });
  assert.deepEqual(satietyNoteText({ kind: "minutes", minutes: 0 }), {
    text: "bez jedzenia 0 min",
    danger: false,
  });
});

test("each note at its threshold: 35,0 °C and 30 % still read minutes, 34,99 °C and 29,99 % read chilled and starving", () => {
  // Thresholds of the body: chilled below 35.0 °C, starving below 30 (D-337, D-39).
  const notesAt = (temperature, satiety) => {
    const [t, s] = bodyCells(runOf({ temperature, satiety, health: 50 }), LAS);
    return [t.note, s.note];
  };
  assert.deepEqual(notesAt(35, 30), [
    { text: "bez ognia 0 min", danger: false },
    { text: "bez jedzenia 0 min", danger: false },
  ]);
  assert.deepEqual(notesAt(34.99, 29.99), [
    { text: "marznie", danger: true },
    { text: "głoduje", danger: true },
  ]);
});

test("by a fire the note under temperature reads „przy ogniu” and the note under satiety keeps its minutes", () => {
  const run = runOf({ temperature: 36.5, satiety: 82, health: 100 });
  const at = run.character.at;
  const cells = bodyCells(
    { ...run, campfires: [{ at, minutesLeft: 40 }] },
    LAS,
  );
  assert.deepEqual(cells[0].note, { text: "przy ogniu", danger: false });
  assert.deepEqual(cells[1].note, {
    text: "bez jedzenia 86 min",
    danger: false,
  });
});

test("a chilled body by the fire still reads „marznie” in danger", () => {
  const run = runOf({ temperature: 34.5, satiety: 82, health: 100 });
  const at = run.character.at;
  const cells = bodyCells(
    { ...run, campfires: [{ at, minutesLeft: 40 }] },
    LAS,
  );
  assert.deepEqual(cells[0].note, { text: "marznie", danger: true });
});

test("on a map that does not cool the body the note under temperature reads „nie stygnie”", () => {
  const warm = { ...LAS, ambientTemperature: 37 };
  const cells = bodyCells(
    runOf({ temperature: 37, satiety: 82, health: 100 }),
    warm,
  );
  assert.deepEqual(cells[0].note, { text: "nie stygnie", danger: false });
});

test("health and nature energy stand with no note, at their lowest too", () => {
  const cells = bodyCells(
    runOf({ temperature: 34, satiety: 10, health: 1 }, 0),
    LAS,
  );
  assert.deepEqual(
    cells.map((cell) => cell.note !== null),
    [true, true, false, false],
  );
});

test("the cells keep the danger of their values: a value below its threshold in danger, the others not", () => {
  const cells = bodyCells(
    runOf({ temperature: 34.99, satiety: 82, health: 40 }, 90),
    LAS,
  );
  assert.deepEqual(
    cells.map((cell) => cell.danger),
    [true, false, false, false],
  );
});
