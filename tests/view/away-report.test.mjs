// The report on earning loops, its pure texts (D-246), tested without a browser: the lines of the
// card of a character and the sentence that counts the earning loops above „Drużyna”. The expected
// wordings are written out from D-246, not computed from the module. Importing the module must not
// touch the DOM.
import assert from "node:assert/strict";
import { test } from "node:test";
import { createCharacter, newGame } from "../../dist/browser/sim/game.js";
import { startLoop } from "../../dist/browser/sim/loop.js";
import {
  CHEST_FULL_TEXT,
  reportChestFull,
  reportLinesOf,
  reportSummary,
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
 * gathered from completions `{ loop }`, the practice of the map run going on `{ run }` and the loop
 * record `{ record }`, 0 where not given.
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
  for (const [id, { loop = {}, run = {}, record = 0 }] of Object.entries(
    waiting,
  ))
    loops[id] = {
      ...state.loops[id],
      practice: loop,
      run: { ...state.loops[id].run, practice: run },
      inARow: 0,
      loopRecord: record,
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

/** The lines in the card of `characterId`, the character of the first line where none is named. */
const entriesOf = (
  awayReport,
  waiting = {},
  characterId = awayReport[0]?.characterId ?? 1,
) => reportLinesOf({ awayReport, loops: loopsOf(waiting) }, characterId);

/** The sentence above „Drużyna” for the report `awayReport` of the team of Ala, Ola and Ela. */
const summaryOf = (awayReport) => reportSummary({ team: team(), awayReport });

test("importing the report touches no DOM: Node has no document and the import succeeded", () => {
  assert.equal(typeof globalThis.document, "undefined");
  assert.equal(typeof reportLinesOf, "function");
});

test("the sentence of a full chest is the wording of D-246", () => {
  // decision: D-246 "While the report holds a line, one row above „Drużyna” holds a sentence that counts its lines, each line of an earning loop a death stopped as a loop that stopped and every other line as a loop that went on, in `danger` where a loop stopped and in `positive` otherwise, then „Skrzynka jest pełna.” in `warning` where the chest is full, and one button „Zamknij” that closes the whole report."
  assert.equal(CHEST_FULL_TEXT, "Skrzynka jest pełna.");
});

test("an earning loop that stopped in a catch-up reads „po {m} min” in danger, with no name and the generation from the data", () => {
  // decision: D-246 "After being away the player reads a report on Siedziba, one line for each character that had an earning loop, a later earning loop of a character whose earning loop a death stopped opening a line of its own, each line standing in the card of its character in „Drużyna”, under a line, with no name before it, the line of an earning loop a death stopped before a later line of that character: an earning loop a death stopped in `danger`, „pętla stanęła po {m} min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie"
  // decision: D-246 "After being away the player reads a report on Siedziba, one line for each character that had an earning loop, a later earning loop of a character whose earning loop a death stopped opening a line of its own, each line standing in the card of its character in „Drużyna”, under a line, with no name before it, the line of an earning loop a death stopped before a later line of that character: an earning loop a death stopped in `danger`, „pętla stanęła po {m} min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie {n}.”"
  assert.deepEqual(entriesOf([stoppedAway(2, 7, 4)]), [
    {
      text: "pętla stanęła po 7 min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie 4.",
      danger: true,
      takeFor: null,
    },
  ]);
});

test("an earning loop that stopped in the open game reads without minutes, in danger", () => {
  // decision: D-246 "An earning loop a death stops in the open game enters the same report, as the one kind of line that is no line of a return, „pętla stanęła — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie"
  // decision: D-246 "An earning loop a death stops in the open game enters the same report, as the one kind of line that is no line of a return, „pętla stanęła — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie {n}.”"
  assert.deepEqual(entriesOf([stoppedOpen(3, 2)]), [
    {
      text: "pętla stanęła — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie 2.",
      danger: true,
      takeFor: null,
    },
  ]);
});

// Catches the minutes shown for a line that stopped live after an earlier return (D-246).
test("a line that holds minutes of an earlier return and stopped in the open game reads without minutes", () => {
  // decision: D-246 "An earning loop a death stops in the open game enters the same report, as the one kind of line that is no line of a return, „pętla stanęła — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie"
  // decision: D-246 "An earning loop a death stops in the open game enters the same report, as the one kind of line that is no line of a return, „pętla stanęła — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie {n}.”"
  const [entry] = entriesOf([
    line(1, { minutes: 9, stop: { generation: 2, away: false } }),
  ]);
  assert.equal(
    entry.text,
    "pętla stanęła — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie 2.",
  );
});

test("another line reads minutes, then the chest's signed changes, then the practice waiting, in text, and names the character whose „Odbierz” stands beside it", () => {
  // decision: D-246 "After being away the player reads a report on Siedziba, one line for each character that had an earning loop, a later earning loop of a character whose earning loop a death stopped opening a line of its own, each line standing in the card of its character in „Drużyna”, under a line, with no name before it, the line of an earning loop a death stopped before a later line of that character: an earning loop a death stopped in `danger`, „pętla stanęła po {m} min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie {n}.”, and the others in `text`, „{m} min · skrzynka: {przedmiot} +{n}, {przedmiot} −{n} · wprawa do odebrania: {umiejętność} +{n}”, with „Odbierz” in `positive` where practice waits, a button that opens no screen, with what is empty left out, with „ · wskrzeszenie zużyte” where a resurrection covered a death, {m} in both lines being the game minutes the catch-up passed"
  assert.deepEqual(
    entriesOf([away({ chest: { stick: 3, moss: -2 } })], {
      1: { loop: { eating: 4, exploration: 12 } },
    }),
    [
      {
        text: "5 min · skrzynka: patyk +3, mech −2 · wprawa do odebrania: Eksploracja +12, Jedzenie +4",
        danger: false,
        takeFor: 1,
      },
    ],
  );
});

// D-246, D-189: the practice waiting is all of it, the map run going on included, and it is read
// from the earning loop of the line's own character, not from the line.
test("the practice waiting adds the earning loop's and the map run's, and is read from the earning loop of the line's own character", () => {
  // decision: D-246 "After being away the player reads a report on Siedziba, one line for each character that had an earning loop, a later earning loop of a character whose earning loop a death stopped opening a line of its own, each line standing in the card of its character in „Drużyna”, under a line, with no name before it, the line of an earning loop a death stopped before a later line of that character: an earning loop a death stopped in `danger`, „pętla stanęła po {m} min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie {n}.”, and the others in `text`, „{m} min · skrzynka: {przedmiot} +{n}, {przedmiot} −{n} · wprawa do odebrania: {umiejętność} +{n}”, with „Odbierz” in `positive` where practice waits, a button that opens no screen, with what is empty left out, with „ · wskrzeszenie zużyte” where a resurrection covered a death, {m} in both lines being the game minutes the catch-up passed"
  // decision: D-246 "The practice waiting in a line is read from that character's earning loop whenever the report is drawn, so it always equals what „Odbierz” would pay at that moment, and after „Odbierz” it and the button are gone until the earning loop gathers more; the rest of the report lies in the game state, so it survives a reload, and a further return before „Zamknij” adds to it; the report shows from one whole game minute of the catch-up, and an earning loop a death stopped opens it at any number of game minutes"
  const report = [away({ minutes: 5 }), line(2, { minutes: 7 })];
  const waiting = {
    1: { loop: { eating: 4 }, run: { eating: 1, exploration: 2 } },
    2: { run: { exploration: 3 } },
  };
  assert.deepEqual(entriesOf(report, waiting, 1), [
    {
      text: "5 min · wprawa do odebrania: Eksploracja +2, Jedzenie +5",
      danger: false,
      takeFor: 1,
    },
  ]);
  assert.deepEqual(entriesOf(report, waiting, 2), [
    {
      text: "7 min · wprawa do odebrania: Eksploracja +3",
      danger: false,
      takeFor: 2,
    },
  ]);
});

// D-246: with what is empty left out, so a line with nothing waiting reads as before and has no
// „Odbierz”, a line with no earning loop too.
test("a line whose earning loop holds no practice, or that has no earning loop, reads without the practice and with no „Odbierz”", () => {
  // decision: D-246 "After being away the player reads a report on Siedziba, one line for each character that had an earning loop, a later earning loop of a character whose earning loop a death stopped opening a line of its own, each line standing in the card of its character in „Drużyna”, under a line, with no name before it, the line of an earning loop a death stopped before a later line of that character: an earning loop a death stopped in `danger`, „pętla stanęła po {m} min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie {n}.”, and the others in `text`, „{m} min · skrzynka: {przedmiot} +{n}, {przedmiot} −{n} · wprawa do odebrania: {umiejętność} +{n}”, with „Odbierz” in `positive` where practice waits, a button that opens no screen, with what is empty left out, with „ · wskrzeszenie zużyte” where a resurrection covered a death, {m} in both lines being the game minutes the catch-up passed"
  // decision: D-246 "The practice waiting in a line is read from that character's earning loop whenever the report is drawn, so it always equals what „Odbierz” would pay at that moment, and after „Odbierz” it and the button are gone until the earning loop gathers more; the rest of the report lies in the game state, so it survives a reload, and a further return before „Zamknij” adds to it; the report shows from one whole game minute of the catch-up, and an earning loop a death stopped opens it at any number of game minutes"
  for (const waiting of [{ 1: {} }, {}, { 2: { loop: { eating: 3 } } }]) {
    assert.deepEqual(entriesOf([away({ chest: { stick: 1 } })], waiting), [
      { text: "5 min · skrzynka: patyk +1", danger: false, takeFor: null },
    ]);
  }
});

// D-246: an earning loop a death stopped has no earning loop and its practice went with the death.
test("a line of an earning loop a death stopped names no practice and has no „Odbierz”, whatever another earning loop of the character holds", () => {
  // decision: D-246 "After being away the player reads a report on Siedziba, one line for each character that had an earning loop, a later earning loop of a character whose earning loop a death stopped opening a line of its own, each line standing in the card of its character in „Drużyna”, under a line, with no name before it, the line of an earning loop a death stopped before a later line of that character: an earning loop a death stopped in `danger`, „pętla stanęła po {m} min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie"
  // decision: D-246 "After being away the player reads a report on Siedziba, one line for each character that had an earning loop, a later earning loop of a character whose earning loop a death stopped opening a line of its own, each line standing in the card of its character in „Drużyna”, under a line, with no name before it, the line of an earning loop a death stopped before a later line of that character: an earning loop a death stopped in `danger`, „pętla stanęła po {m} min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie {n}.”, and the others in `text`, „{m} min · skrzynka: {przedmiot} +{n}, {przedmiot} −{n} · wprawa do odebrania: {umiejętność} +{n}”, with „Odbierz” in `positive` where practice waits, a button that opens no screen, with what is empty left out, with „ · wskrzeszenie zużyte” where a resurrection covered a death, {m} in both lines being the game minutes the catch-up passed"
  const [entry] = entriesOf([stoppedAway(1, 3, 2)], {
    1: { loop: { eating: 3 } },
  });
  assert.equal(entry.takeFor, null);
  assert.equal(entry.text.includes("wprawa"), false);
});

test("items follow the order of the items' data whatever the order of the line's keys", () => {
  // decision: D-246 "After being away the player reads a report on Siedziba, one line for each character that had an earning loop, a later earning loop of a character whose earning loop a death stopped opening a line of its own, each line standing in the card of its character in „Drużyna”, under a line, with no name before it, the line of an earning loop a death stopped before a later line of that character: an earning loop a death stopped in `danger`, „pętla stanęła po {m} min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie {n}.”, and the others in `text`, „{m} min · skrzynka: {przedmiot} +{n}, {przedmiot} −{n} · wprawa do odebrania: {umiejętność} +{n}”, with „Odbierz” in `positive` where practice waits, a button that opens no screen, with what is empty left out, with „ · wskrzeszenie zużyte” where a resurrection covered a death, {m} in both lines being the game minutes the catch-up passed"
  const [entry] = entriesOf([
    away({ chest: { fiber: 1, berry: -4, stick: 2 } }),
  ]);
  assert.equal(entry.text, "5 min · skrzynka: patyk +2, jagoda −4, włókno +1");
});

test("empty parts are left out: no chest, no practice, or neither", () => {
  // decision: D-246 "After being away the player reads a report on Siedziba, one line for each character that had an earning loop, a later earning loop of a character whose earning loop a death stopped opening a line of its own, each line standing in the card of its character in „Drużyna”, under a line, with no name before it, the line of an earning loop a death stopped before a later line of that character: an earning loop a death stopped in `danger`, „pętla stanęła po {m} min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie {n}.”, and the others in `text`, „{m} min · skrzynka: {przedmiot} +{n}, {przedmiot} −{n} · wprawa do odebrania: {umiejętność} +{n}”, with „Odbierz” in `positive` where practice waits, a button that opens no screen, with what is empty left out, with „ · wskrzeszenie zużyte” where a resurrection covered a death, {m} in both lines being the game minutes the catch-up passed"
  assert.equal(
    entriesOf([away()], { 1: { loop: { eating: 1 } } })[0].text,
    "5 min · wprawa do odebrania: Jedzenie +1",
  );
  assert.equal(
    entriesOf([away({ chest: { stick: -1 } })])[0].text,
    "5 min · skrzynka: patyk −1",
  );
  assert.equal(entriesOf([away()])[0].text, "5 min");
});

test("a resurrection used in the catch-up adds „ · wskrzeszenie zużyte” at the end, also on a bare line", () => {
  // decision: D-246 "After being away the player reads a report on Siedziba, one line for each character that had an earning loop, a later earning loop of a character whose earning loop a death stopped opening a line of its own, each line standing in the card of its character in „Drużyna”, under a line, with no name before it, the line of an earning loop a death stopped before a later line of that character: an earning loop a death stopped in `danger`, „pętla stanęła po {m} min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie {n}.”, and the others in `text`, „{m} min · skrzynka: {przedmiot} +{n}, {przedmiot} −{n} · wprawa do odebrania: {umiejętność} +{n}”, with „Odbierz” in `positive` where practice waits, a button that opens no screen, with what is empty left out, with „ · wskrzeszenie zużyte” where a resurrection covered a death, {m} in both lines being the game minutes the catch-up passed"
  assert.equal(
    entriesOf([away({ chest: { stick: 3 }, resurrectionUsed: true })], {
      1: { loop: { eating: 2 } },
    })[0].text,
    "5 min · skrzynka: patyk +3 · wprawa do odebrania: Jedzenie +2 · wskrzeszenie zużyte",
  );
  assert.equal(
    entriesOf([away({ resurrectionUsed: true })])[0].text,
    "5 min · wskrzeszenie zużyte",
  );
});

// Catches the loop record left out of a line that went on, put before the other parts, or drawn with
// a mark: it is the last words of the line, plain text, with the line's role and „Odbierz” unchanged.
test("a line of an earning loop that goes on ends with its loop record in plain text, after the other parts", () => {
  // decision: D-246 "At the end of the line of a character whose earning loop goes on stands the loop record of that earning loop (D-241) as plain text, with no mark and no comparison with anything, „ · najdłużej bez śmierci: {n} przejść z rzędu”, declined as „1 przejście”, „3 przejścia”, „5 przejść”."
  assert.deepEqual(
    entriesOf([away({ chest: { stick: 3 }, resurrectionUsed: true })], {
      1: { loop: { eating: 2 }, record: 3 },
    }),
    [
      {
        text: "5 min · skrzynka: patyk +3 · wprawa do odebrania: Jedzenie +2 · wskrzeszenie zużyte · najdłużej bez śmierci: 3 przejścia z rzędu",
        danger: false,
        takeFor: 1,
      },
    ],
  );
  assert.equal(
    entriesOf([away()], { 1: { record: 3 } })[0].text,
    "5 min · najdłużej bez śmierci: 3 przejścia z rzędu",
  );
});

// Catches the noun declined by a rule other than the three forms of D-246: 1 przejście, 2 to 4
// przejścia (not 12 to 14), every other count przejść.
test("the loop record declines „przejście” as 1 przejście, 3 przejścia, 5 przejść, with 12 to 14 and the tens as the rule of Polish gives", () => {
  // decision: D-246 "At the end of the line of a character whose earning loop goes on stands the loop record of that earning loop (D-241) as plain text, with no mark and no comparison with anything, „ · najdłużej bez śmierci: {n} przejść z rzędu”, declined as „1 przejście”, „3 przejścia”, „5 przejść”."
  const expected = [
    [1, "1 przejście"],
    [2, "2 przejścia"],
    [3, "3 przejścia"],
    [4, "4 przejścia"],
    [5, "5 przejść"],
    [11, "11 przejść"],
    [12, "12 przejść"],
    [14, "14 przejść"],
    [21, "21 przejść"],
    [22, "22 przejścia"],
    [25, "25 przejść"],
  ];
  for (const [record, noun] of expected)
    assert.equal(
      entriesOf([away()], { 1: { record } })[0].text,
      `5 min · najdłużej bez śmierci: ${noun} z rzędu`,
      `record ${record}`,
    );
});

// Catches a zero drawn as „0 przejść z rzędu”, and a line of a character with no earning loop given a
// number from nowhere.
test("a loop record of zero, and a line whose character has no earning loop, show no loop record", () => {
  // decision: D-246 "It is read from the earning loop whenever the report is drawn, as the practice waiting is, and stands nowhere where it is zero."
  assert.equal(entriesOf([away()], { 1: { record: 0 } })[0].text, "5 min");
  assert.equal(entriesOf([away()])[0].text, "5 min");
  assert.equal(entriesOf([away()], { 2: { record: 4 } })[0].text, "5 min");
});

// Catches the loop record of a stopped line, which has no earning loop, taken from a later earning
// loop of the same character.
test("a line of an earning loop a death stopped carries no loop record, whatever a later earning loop of the character holds", () => {
  // decision: D-246 "At the end of the line of a character whose earning loop goes on stands the loop record of that earning loop (D-241) as plain text, with no mark and no comparison with anything, „ · najdłużej bez śmierci: {n} przejść z rzędu”, declined as „1 przejście”, „3 przejścia”, „5 przejść”."
  for (const stopped of [stoppedAway(1, 3, 2), stoppedOpen(1, 2)])
    assert.equal(
      entriesOf([stopped], { 1: { record: 7 } })[0].text.includes("najdłużej"),
      false,
    );
});

// Catches the loop record kept in the report line instead of read from the earning loop at each
// drawing: the same line of the report reads the number the earning loop holds now.
test("the loop record is read from the earning loop of the line's own character at each drawing", () => {
  // decision: D-246 "It is read from the earning loop whenever the report is drawn, as the practice waiting is, and stands nowhere where it is zero."
  const report = [away(), line(2, { minutes: 7 })];
  const read = (waiting) =>
    [1, 2].map((id) => entriesOf(report, waiting, id)[0].text);
  assert.deepEqual(read({ 1: { record: 2 }, 2: { record: 9 } }), [
    "5 min · najdłużej bez śmierci: 2 przejścia z rzędu",
    "7 min · najdłużej bez śmierci: 9 przejść z rzędu",
  ]);
  assert.deepEqual(read({ 1: { record: 6 }, 2: { record: 0 } }), [
    "5 min · najdłużej bez śmierci: 6 przejść z rzędu",
    "7 min",
  ]);
});

// Catches a card that holds the lines of another character, and the lines of a card in the order of
// the report where a later line came first: in a card the line of an earning loop a death stopped
// stands before a later line of the same character (D-246).
test("a card holds its character's lines alone, the stopped ones first and then the later one, whatever order the report holds", () => {
  // decision: D-246 "After being away the player reads a report on Siedziba, one line for each character that had an earning loop, a later earning loop of a character whose earning loop a death stopped opening a line of its own, each line standing in the card of its character in „Drużyna”, under a line, with no name before it, the line of an earning loop a death stopped before a later line of that character: an earning loop a death stopped in `danger`, „pętla stanęła po {m} min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie"
  const report = [
    line(3, { minutes: 2 }),
    stoppedAway(3, 4, 2),
    line(1, { minutes: 6 }),
    stoppedOpen(2, 3),
  ];
  const cardOf = (id) =>
    entriesOf(report, {}, id).map(({ text, danger }) => [text, danger]);
  assert.deepEqual(cardOf(3), [
    [
      "pętla stanęła po 4 min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie 2.",
      true,
    ],
    ["2 min", false],
  ]);
  assert.deepEqual(cardOf(1), [["6 min", false]]);
  assert.deepEqual(cardOf(2), [
    [
      "pętla stanęła — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie 3.",
      true,
    ],
  ]);
});

test("an empty report gives no entry", () => {
  assert.deepEqual(entriesOf([]), []);
});

// Catches a full chest read from the wrong bound: 60 pieces is full, 59 is not, and the pieces of
// every item count.
test("the chest is full from the capacity of the balance on, counting all items", () => {
  // decision: D-246 "After being away the player reads a report on Siedziba, one line for each character that had an earning loop, a later earning loop of a character whose earning loop a death stopped opening a line of its own, each line standing in the card of its character in „Drużyna”, under a line, with no name before it, the line of an earning loop a death stopped before a later line of that character: an earning loop a death stopped in `danger`, „pętla stanęła po {m} min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie {n}.”, and the others in `text`, „{m} min · skrzynka: {przedmiot} +{n}, {przedmiot} −{n} · wprawa do odebrania: {umiejętność} +{n}”, with „Odbierz” in `positive` where practice waits, a button that opens no screen, with what is empty left out, with „ · wskrzeszenie zużyte” where a resurrection covered a death, {m} in both lines being the game minutes the catch-up passed"
  assert.equal(reportChestFull({ pieces: { stick: 59 } }), false);
  assert.equal(reportChestFull({ pieces: { stick: 60 } }), true);
  assert.equal(reportChestFull({ pieces: { stick: 30, moss: 30 } }), true);
  assert.equal(reportChestFull({ pieces: {} }), false);
});

// --- the sentence that counts the earning loops ------------------------------------------------

/** `count` lines of a return that went on, each of the three characters in turn. */
const wentOn = (count) =>
  Array.from({ length: count }, (_, at) => line((at % 3) + 1, { minutes: 5 }));
/** `count` lines of earning loops a death stopped in a catch-up, each of the three characters in turn. */
const stoppedInCatchUp = (count) =>
  Array.from({ length: count }, (_, at) => stoppedAway((at % 3) + 1, 4, 2));

// Catches a count not declined, or declined by another rule than Polish gives (1, 2 to 4 but not 12
// to 14, every other count), the part of loops that went on keeping the noun after a part of loops
// that stopped, a part of zero standing, and the role of the sentence other than `danger` where a
// loop stopped and `positive` otherwise (D-246).
test("the sentence counts the loops that stopped and those that went on, each declined, a part of zero left out, in danger where one stopped", () => {
  // decision: D-246 "While the report holds a line, one row above „Drużyna” holds a sentence that counts its lines, each line of an earning loop a death stopped as a loop that stopped and every other line as a loop that went on, in `danger` where a loop stopped and in `positive` otherwise, then „Skrzynka jest pełna.” in `warning` where the chest is full, and one button „Zamknij” that closes the whole report."
  // decision: D-246 "The sentence reads „Bez ciebie {s} pętla stanęła, {k} chodziła bez przeszkód.” with each count declined — „1 pętla stanęła”, „2 pętle stanęły”, „5 pętli stanęło”, then „1 chodziła”, „2 chodziły”, „5 chodziło” — and a part of zero left out, the part of the loops that went on then reading „{k} pętla chodziła bez przeszkód”, „2 pętle chodziły”, „5 pętli chodziło”"
  const cases = [
    [
      stoppedInCatchUp(1),
      wentOn(2),
      "Bez ciebie 1 pętla stanęła, 2 chodziły bez przeszkód.",
      true,
    ],
    [
      stoppedInCatchUp(2),
      wentOn(1),
      "Bez ciebie 2 pętle stanęły, 1 chodziła bez przeszkód.",
      true,
    ],
    [
      stoppedInCatchUp(5),
      wentOn(5),
      "Bez ciebie 5 pętli stanęło, 5 chodziło bez przeszkód.",
      true,
    ],
    [
      stoppedInCatchUp(12),
      wentOn(22),
      "Bez ciebie 12 pętli stanęło, 22 chodziły bez przeszkód.",
      true,
    ],
    [stoppedInCatchUp(2), [], "Bez ciebie 2 pętle stanęły.", true],
    [stoppedInCatchUp(1), [], "Bez ciebie 1 pętla stanęła.", true],
    [[], wentOn(1), "Bez ciebie 1 pętla chodziła bez przeszkód.", false],
    [[], wentOn(2), "Bez ciebie 2 pętle chodziły bez przeszkód.", false],
    [[], wentOn(5), "Bez ciebie 5 pętli chodziło bez przeszkód.", false],
    [[], wentOn(14), "Bez ciebie 14 pętli chodziło bez przeszkód.", false],
  ];
  for (const [stopped, went, text, danger] of cases)
    assert.deepEqual(summaryOf([...went, ...stopped]), { text, danger }, text);
});

// Catches „Bez ciebie” said to a player who sat at the game: a stop in the open game is no line of a
// return, so a report that holds one opens with the count, alone or beside lines of a return (D-246).
test("„Bez ciebie” opens the sentence only where every line is one of a return, and otherwise it opens with its first count", () => {
  // decision: D-246 "The sentence reads „Bez ciebie {s} pętla stanęła, {k} chodziła bez przeszkód.” with each count declined — „1 pętla stanęła”, „2 pętle stanęły”, „5 pętli stanęło”, then „1 chodziła”, „2 chodziły”, „5 chodziło” — and a part of zero left out, the part of the loops that went on then reading „{k} pętla chodziła bez przeszkód”, „2 pętle chodziły”, „5 pętli chodziło”; „Bez ciebie” opens it only where every line is a line of a return, and otherwise the sentence opens with its first count."
  // decision: D-246 "An earning loop a death stops in the open game enters the same report, as the one kind of line that is no line of a return"
  assert.deepEqual(summaryOf([stoppedOpen(2, 3)]), {
    text: "1 pętla stanęła.",
    danger: true,
  });
  assert.deepEqual(summaryOf([stoppedOpen(2, 3), stoppedOpen(3, 2)]), {
    text: "2 pętle stanęły.",
    danger: true,
  });
  assert.deepEqual(summaryOf([stoppedOpen(2, 3), ...wentOn(1)]), {
    text: "1 pętla stanęła, 1 chodziła bez przeszkód.",
    danger: true,
  });
  assert.deepEqual(
    summaryOf([stoppedOpen(2, 3), stoppedAway(1, 4, 2), ...wentOn(2)]),
    { text: "2 pętle stanęły, 2 chodziły bez przeszkód.", danger: true },
  );
  assert.deepEqual(summaryOf([stoppedAway(1, 4, 2), ...wentOn(2)]), {
    text: "Bez ciebie 1 pętla stanęła, 2 chodziły bez przeszkód.",
    danger: true,
  });
});

// Catches a sentence for a report with no line, and lines of a character the team does not hold counted
// though no card shows them.
test("a report with no line of the team's characters gives no sentence, and a line of a character the team does not hold is not counted", () => {
  // decision: D-246 "While the report holds a line, one row above „Drużyna” holds a sentence that counts its lines"
  assert.equal(summaryOf([]), null);
  assert.equal(summaryOf([line(9, { minutes: 5 })]), null);
  assert.deepEqual(summaryOf([line(9, { minutes: 5 }), ...wentOn(1)]), {
    text: "Bez ciebie 1 pętla chodziła bez przeszkód.",
    danger: false,
  });
});
