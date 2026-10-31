// The report on earning loops, its pure texts (task petla-zarobkowa, To do 16; spec section 11;
// D-229), tested without a browser. The expected wordings are written out from To do 16, not
// computed from the module. Importing the module must not touch the DOM.
import assert from "node:assert/strict";
import { test } from "node:test";
import { createCharacter, newGame } from "../../dist/public/sim/game.js";
import {
  AWAY_TITLE,
  CHEST_FULL_TEXT,
  STOPPED_TITLE,
  reportChestFull,
  reportEntries,
  reportTitle,
} from "../../dist/public/view/away-report.js";

/** A team of Ala (1), Ola (2) and Ela (3), in the order they were created. */
function team() {
  let state = newGame();
  for (const name of ["Ala", "Ola", "Ela"])
    state = createCharacter(state, name).state;
  return state.team;
}

const line = (characterId, rest = {}) => ({
  characterId,
  minutes: 0,
  chest: {},
  practice: {},
  resurrectionUsed: false,
  stop: null,
  ...rest,
});
const away = (rest) => line(1, { minutes: 5, ...rest });
const stoppedAway = (characterId, minutes, generation) =>
  line(characterId, { minutes, stop: { generation, away: true } });
const stoppedOpen = (characterId, generation) =>
  line(characterId, { stop: { generation, away: false } });

const entriesOf = (awayReport) => reportEntries({ team: team(), awayReport });

test("importing the report touches no DOM: Node has no document and the import succeeded", () => {
  assert.equal(typeof globalThis.document, "undefined");
  assert.equal(typeof reportEntries, "function");
});

test("the two titles and the sentence of a full chest are the wordings of To do 16", () => {
  assert.equal(AWAY_TITLE, "Gdy cię nie było");
  assert.equal(STOPPED_TITLE, "Pętle, które stanęły");
  assert.equal(CHEST_FULL_TEXT, "Skrzynka jest pełna.");
});

// Catches the title chosen by the presence of a stop instead of by where the stop happened (Q19).
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
    },
  ]);
});

test("a loop that stopped in the open game reads without minutes, in danger", () => {
  assert.deepEqual(entriesOf([stoppedOpen(3, 2)]), [
    {
      text: "Ela: pętla stanęła — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie 2.",
      danger: true,
    },
  ]);
});

// Catches the minutes shown for a line that stopped live after an earlier return (Q19).
test("a line that holds minutes of an earlier return and stopped in the open game reads without minutes", () => {
  const [entry] = entriesOf([
    line(1, { minutes: 9, stop: { generation: 2, away: false } }),
  ]);
  assert.equal(
    entry.text,
    "Ala: pętla stanęła — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie 2.",
  );
});

test("another line reads minutes, then the chest's signed changes, then the practice, in text", () => {
  assert.deepEqual(
    entriesOf([
      away({
        chest: { stick: 3, moss: -2 },
        practice: { eating: 4, exploration: 12 },
      }),
    ]),
    [
      {
        text: "Ala: 5 min · skrzynka: patyk +3, mech −2 · wprawa: Eksploracja +12, Jedzenie +4",
        danger: false,
      },
    ],
  );
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
    entriesOf([away({ practice: { eating: 1 } })])[0].text,
    "Ala: 5 min · wprawa: Jedzenie +1",
  );
  assert.equal(
    entriesOf([away({ chest: { stick: -1 } })])[0].text,
    "Ala: 5 min · skrzynka: patyk −1",
  );
  assert.equal(entriesOf([away()])[0].text, "Ala: 5 min");
});

test("a resurrection used in the catch-up adds „ · wskrzeszenie zużyte” at the end, also on a bare line", () => {
  assert.equal(
    entriesOf([
      away({
        chest: { stick: 3 },
        practice: { eating: 2 },
        resurrectionUsed: true,
      }),
    ])[0].text,
    "Ala: 5 min · skrzynka: patyk +3 · wprawa: Jedzenie +2 · wskrzeszenie zużyte",
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
