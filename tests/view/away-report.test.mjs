// The report on earning loops, its pure texts (D-246), tested without a browser. The expected
// wordings are written out from D-246, not computed from the module. Importing the module must not
// touch the DOM.
import assert from "node:assert/strict";
import { test } from "node:test";
import { createCharacter, newGame } from "../../dist/browser/sim/game.js";
import { startLoop } from "../../dist/browser/sim/loop.js";
import {
  AWAY_TITLE,
  CHEST_FULL_TEXT,
  STOPPED_TITLE,
  reportChestFull,
  reportEntries,
  reportTitle,
} from "../../dist/browser/view/away-report.js";

/** A game of Ala (1), Ola (2) and Ela (3), in the order they were created, Las solved. */
function game() {
  let state = newGame();
  for (const name of ["Ala", "Ola", "Ela"])
    state = createCharacter(state, name).state;
  return { ...state, solvedMaps: ["forest"] };
}

/** A team of Ala (1), Ola (2) and Ela (3), in the order they were created. */
const team = () => game().team;

/**
 * The earning loops of the characters named in `waiting`, each on Las, holding the practice
 * gathered from completions `{ loop }` and the practice of the map run going on `{ run }`.
 */
function loopsOf(waiting) {
  let state = game();
  for (const id of Object.keys(waiting))
    state = startLoop(
      state,
      { mapId: "forest", characterId: Number(id) },
      1,
    ).state;
  const loops = {};
  for (const [id, { loop = {}, run = {} }] of Object.entries(waiting))
    loops[id] = {
      ...state.loops[id],
      practice: loop,
      run: { ...state.loops[id].run, practice: run },
    };
  return loops;
}

const line = (characterId, rest = {}) => ({
  characterId,
  minutes: 0,
  chest: {},
  resurrectionUsed: false,
  stop: null,
  ...rest,
});
const away = (rest) => line(1, { minutes: 5, ...rest });
const stoppedAway = (characterId, minutes, generation) =>
  line(characterId, { minutes, stop: { generation, away: true } });
const stoppedOpen = (characterId, generation) =>
  line(characterId, { stop: { generation, away: false } });

const entriesOf = (awayReport, waiting = {}) =>
  reportEntries({ team: team(), awayReport, loops: loopsOf(waiting) });

test("importing the report touches no DOM: Node has no document and the import succeeded", () => {
  assert.equal(typeof globalThis.document, "undefined");
  assert.equal(typeof reportEntries, "function");
});

test("the two titles and the sentence of a full chest are the wordings of D-246", () => {
  assert.equal(AWAY_TITLE, "Gdy cię nie było");
  assert.equal(STOPPED_TITLE, "Pętle, które stanęły");
  assert.equal(CHEST_FULL_TEXT, "Skrzynka jest pełna.");
});

// Catches the title chosen by the presence of a stop instead of by where the stop happened (D-246).
test("the title is „Pętle, które stanęły” only while every line is a stop in the open game", () => {
  assert.equal(reportTitle([stoppedOpen(1, 2)]), "Pętle, które stanęły");
  assert.equal(
    reportTitle([stoppedOpen(1, 2), stoppedOpen(2, 3)]),
    "Pętle, które stanęły",
  );
  assert.equal(reportTitle([away()]), "Gdy cię nie było");
  assert.equal(reportTitle([stoppedAway(1, 3, 2)]), "Gdy cię nie było");
  assert.equal(
    reportTitle([stoppedOpen(1, 2), away({ characterId: 2 })]),
    "Gdy cię nie było",
  );
});

test("a loop that stopped in a catch-up reads „po {m} min” in danger, the name and the generation from the data", () => {
  assert.deepEqual(entriesOf([stoppedAway(2, 7, 4)]), [
    {
      text: "Ola: pętla stanęła po 7 min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie 4.",
      danger: true,
      takeFor: null,
    },
  ]);
});

test("a loop that stopped in the open game reads without minutes, in danger", () => {
  assert.deepEqual(entriesOf([stoppedOpen(3, 2)]), [
    {
      text: "Ela: pętla stanęła — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie 2.",
      danger: true,
      takeFor: null,
    },
  ]);
});

// Catches the minutes shown for a line that stopped live after an earlier return (D-246).
test("a line that holds minutes of an earlier return and stopped in the open game reads without minutes", () => {
  const [entry] = entriesOf([
    line(1, { minutes: 9, stop: { generation: 2, away: false } }),
  ]);
  assert.equal(
    entry.text,
    "Ala: pętla stanęła — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie 2.",
  );
});

test("another line reads minutes, then the chest's signed changes, then the practice waiting, in text, and names the character whose „Odbierz” stands beside it", () => {
  assert.deepEqual(
    entriesOf([away({ chest: { stick: 3, moss: -2 } })], {
      1: { loop: { eating: 4, exploration: 12 } },
    }),
    [
      {
        text: "Ala: 5 min · skrzynka: patyk +3, mech −2 · wprawa do odebrania: Eksploracja +12, Jedzenie +4",
        danger: false,
        takeFor: 1,
      },
    ],
  );
});

// D-246, D-189: the practice waiting is all of it, the map run going on included, and it is read
// from the loop of the line's own character, not from the line.
test("the practice waiting adds the loop's and the map run's, and is read from the loop of the line's own character", () => {
  const entries = entriesOf([away({ minutes: 5 }), line(2, { minutes: 7 })], {
    1: { loop: { eating: 4 }, run: { eating: 1, exploration: 2 } },
    2: { run: { exploration: 3 } },
  });
  assert.deepEqual(
    entries.map(({ text }) => text),
    [
      "Ala: 5 min · wprawa do odebrania: Eksploracja +2, Jedzenie +5",
      "Ola: 7 min · wprawa do odebrania: Eksploracja +3",
    ],
  );
  assert.deepEqual(
    entries.map(({ takeFor }) => takeFor),
    [1, 2],
  );
});

// D-246: with what is empty left out, so a line with nothing waiting reads as before and has no
// „Odbierz”, a line with no loop too.
test("a line whose loop holds no practice, or that has no loop, reads without the practice and with no „Odbierz”", () => {
  for (const waiting of [{ 1: {} }, {}, { 2: { loop: { eating: 3 } } }]) {
    assert.deepEqual(entriesOf([away({ chest: { stick: 1 } })], waiting), [
      { text: "Ala: 5 min · skrzynka: patyk +1", danger: false, takeFor: null },
    ]);
  }
});

// D-246: a loop a death stopped has no loop and its practice went with the death.
test("a line of a loop a death stopped names no practice and has no „Odbierz”, whatever another loop of the character holds", () => {
  const [entry] = entriesOf([stoppedAway(1, 3, 2)], {
    1: { loop: { eating: 3 } },
  });
  assert.equal(entry.takeFor, null);
  assert.equal(entry.text.includes("wprawa"), false);
});

test("items follow the order of the items' data whatever the order of the line's keys", () => {
  const [entry] = entriesOf([
    away({ chest: { fiber: 1, berry: -4, stick: 2 } }),
  ]);
  assert.equal(
    entry.text,
    "Ala: 5 min · skrzynka: patyk +2, jagoda −4, włókno +1",
  );
});

test("empty parts are left out: no chest, no practice, or neither", () => {
  assert.equal(
    entriesOf([away()], { 1: { loop: { eating: 1 } } })[0].text,
    "Ala: 5 min · wprawa do odebrania: Jedzenie +1",
  );
  assert.equal(
    entriesOf([away({ chest: { stick: -1 } })])[0].text,
    "Ala: 5 min · skrzynka: patyk −1",
  );
  assert.equal(entriesOf([away()])[0].text, "Ala: 5 min");
});

test("a resurrection used in the catch-up adds „ · wskrzeszenie zużyte” at the end, also on a bare line", () => {
  assert.equal(
    entriesOf([away({ chest: { stick: 3 }, resurrectionUsed: true })], {
      1: { loop: { eating: 2 } },
    })[0].text,
    "Ala: 5 min · skrzynka: patyk +3 · wprawa do odebrania: Jedzenie +2 · wskrzeszenie zużyte",
  );
  assert.equal(
    entriesOf([away({ resurrectionUsed: true })])[0].text,
    "Ala: 5 min · wskrzeszenie zużyte",
  );
});

// Catches the order of the data (loops stopped last) or of the lines' arrival replacing the order
// the section promises: stopped lines first, then the others, each in the team's order.
test("stopped lines come first and the others after them, each group in the team's order", () => {
  const texts = entriesOf([
    line(3, { minutes: 2 }),
    stoppedAway(3, 4, 2),
    line(1, { minutes: 6 }),
    stoppedOpen(2, 3),
  ]).map(
    (entry) => entry.text.slice(0, entry.text.indexOf(":")) + entry.danger,
  );
  assert.deepEqual(texts, ["Olatrue", "Elatrue", "Alafalse", "Elafalse"]);
});

test("two lines of one character, a stopped one and a later one, both stand", () => {
  const entries = entriesOf([stoppedAway(1, 3, 2), line(1, { minutes: 2 })]);
  assert.deepEqual(
    entries.map((entry) => entry.danger),
    [true, false],
  );
});

test("an empty report gives no entry", () => {
  assert.deepEqual(entriesOf([]), []);
});

// Catches a full chest read from the wrong bound: 60 pieces is full, 59 is not, and the pieces of
// every item count.
test("the chest is full from the capacity of the balance on, counting all items", () => {
  assert.equal(reportChestFull({ pieces: { stick: 59 } }), false);
  assert.equal(reportChestFull({ pieces: { stick: 60 } }), true);
  assert.equal(reportChestFull({ pieces: { stick: 30, moss: 30 } }), true);
  assert.equal(reportChestFull({ pieces: {} }), false);
});
