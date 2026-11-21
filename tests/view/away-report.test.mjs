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

const entriesOf = (awayReport, waiting = {}) =>
  reportEntries({ team: team(), awayReport, loops: loopsOf(waiting) });

test("importing the report touches no DOM: Node has no document and the import succeeded", () => {
  assert.equal(typeof globalThis.document, "undefined");
  assert.equal(typeof reportEntries, "function");
});

test("the two titles and the sentence of a full chest are the wordings of D-246", () => {
  // decision: D-246 "After being away the player reads a report in the section „Gdy cię nie było” of Siedziba, above „Drużyna”, one line for each character that had an earning loop, a later earning loop of a character whose earning loop a death stopped opening a line of its own, and one button „Zamknij” closes the whole section: first the earning loops a death stopped, in `danger`, „{imię}: pętla stanęła po {m} min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie"
  // decision: D-246 "After being away the player reads a report in the section „Gdy cię nie było” of Siedziba, above „Drużyna”, one line for each character that had an earning loop, a later earning loop of a character whose earning loop a death stopped opening a line of its own, and one button „Zamknij” closes the whole section: first the earning loops a death stopped, in `danger`, „{imię}: pętla stanęła po {m} min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie {n}.”, then the others, in `text`, „{imię}: {m} min · skrzynka: {przedmiot} +{n}, {przedmiot} −{n} · wprawa do odebrania: {umiejętność} +{n}”, with „Odbierz” in `positive` where practice waits, with what is empty left out, with „ · wskrzeszenie zużyte” where a resurrection covered a death, under them „Skrzynka jest pełna.” in `warning` where the chest is full, {m} in both lines being the game minutes the catch-up passed"
  // decision: D-246 "An earning loop a death stops in the open game enters the same section as „{imię}: pętla stanęła — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie {n}.”, the title reading „Pętle, które stanęły” where the section holds no line of a return, and a player returning to a manual map run reads the report on reaching Siedziba"
  assert.equal(AWAY_TITLE, "Gdy cię nie było");
  assert.equal(STOPPED_TITLE, "Pętle, które stanęły");
  assert.equal(CHEST_FULL_TEXT, "Skrzynka jest pełna.");
});

// Catches the title chosen by the presence of a stop instead of by where the stop happened (D-246).
test("the title is „Pętle, które stanęły” only while every line is a stop in the open game", () => {
  // decision: D-246 "After being away the player reads a report in the section „Gdy cię nie było” of Siedziba, above „Drużyna”, one line for each character that had an earning loop, a later earning loop of a character whose earning loop a death stopped opening a line of its own, and one button „Zamknij” closes the whole section: first the earning loops a death stopped, in `danger`, „{imię}: pętla stanęła po {m} min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie"
  // decision: D-246 "An earning loop a death stops in the open game enters the same section as „{imię}: pętla stanęła — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie {n}.”, the title reading „Pętle, które stanęły” where the section holds no line of a return, and a player returning to a manual map run reads the report on reaching Siedziba"
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

test("an earning loop that stopped in a catch-up reads „po {m} min” in danger, the name and the generation from the data", () => {
  // decision: D-246 "After being away the player reads a report in the section „Gdy cię nie było” of Siedziba, above „Drużyna”, one line for each character that had an earning loop, a later earning loop of a character whose earning loop a death stopped opening a line of its own, and one button „Zamknij” closes the whole section: first the earning loops a death stopped, in `danger`, „{imię}: pętla stanęła po {m} min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie"
  // decision: D-246 "After being away the player reads a report in the section „Gdy cię nie było” of Siedziba, above „Drużyna”, one line for each character that had an earning loop, a later earning loop of a character whose earning loop a death stopped opening a line of its own, and one button „Zamknij” closes the whole section: first the earning loops a death stopped, in `danger`, „{imię}: pętla stanęła po {m} min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie {n}.”"
  assert.deepEqual(entriesOf([stoppedAway(2, 7, 4)]), [
    {
      text: "Ola: pętla stanęła po 7 min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie 4.",
      danger: true,
      takeFor: null,
    },
  ]);
});

test("an earning loop that stopped in the open game reads without minutes, in danger", () => {
  // decision: D-246 "An earning loop a death stops in the open game enters the same section as „{imię}: pętla stanęła — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie"
  // decision: D-246 "An earning loop a death stops in the open game enters the same section as „{imię}: pętla stanęła — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie {n}.”"
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
  // decision: D-246 "An earning loop a death stops in the open game enters the same section as „{imię}: pętla stanęła — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie"
  // decision: D-246 "An earning loop a death stops in the open game enters the same section as „{imię}: pętla stanęła — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie {n}.”"
  const [entry] = entriesOf([
    line(1, { minutes: 9, stop: { generation: 2, away: false } }),
  ]);
  assert.equal(
    entry.text,
    "Ala: pętla stanęła — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie 2.",
  );
});

test("another line reads minutes, then the chest's signed changes, then the practice waiting, in text, and names the character whose „Odbierz” stands beside it", () => {
  // decision: D-246 "After being away the player reads a report in the section „Gdy cię nie było” of Siedziba, above „Drużyna”, one line for each character that had an earning loop, a later earning loop of a character whose earning loop a death stopped opening a line of its own, and one button „Zamknij” closes the whole section: first the earning loops a death stopped, in `danger`, „{imię}: pętla stanęła po {m} min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie {n}.”, then the others, in `text`, „{imię}: {m} min · skrzynka: {przedmiot} +{n}, {przedmiot} −{n} · wprawa do odebrania: {umiejętność} +{n}”, with „Odbierz” in `positive` where practice waits, with what is empty left out, with „ · wskrzeszenie zużyte” where a resurrection covered a death, under them „Skrzynka jest pełna.” in `warning` where the chest is full, {m} in both lines being the game minutes the catch-up passed"
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
// from the earning loop of the line's own character, not from the line.
test("the practice waiting adds the earning loop's and the map run's, and is read from the earning loop of the line's own character", () => {
  // decision: D-246 "After being away the player reads a report in the section „Gdy cię nie było” of Siedziba, above „Drużyna”, one line for each character that had an earning loop, a later earning loop of a character whose earning loop a death stopped opening a line of its own, and one button „Zamknij” closes the whole section: first the earning loops a death stopped, in `danger`, „{imię}: pętla stanęła po {m} min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie {n}.”, then the others, in `text`, „{imię}: {m} min · skrzynka: {przedmiot} +{n}, {przedmiot} −{n} · wprawa do odebrania: {umiejętność} +{n}”, with „Odbierz” in `positive` where practice waits, with what is empty left out, with „ · wskrzeszenie zużyte” where a resurrection covered a death, under them „Skrzynka jest pełna.” in `warning` where the chest is full, {m} in both lines being the game minutes the catch-up passed"
  // decision: D-246 "The practice waiting in a line is read from that character's earning loop whenever the section is drawn, so it always equals what „Odbierz” would pay at that moment, and after „Odbierz” it and the button are gone until the earning loop gathers more; the rest of the report lies in the game state, so it survives a reload, and a further return before „Zamknij” adds to it; the section shows from one whole game minute of the catch-up, and an earning loop a death stopped opens it at any number of game minutes"
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
// „Odbierz”, a line with no earning loop too.
test("a line whose earning loop holds no practice, or that has no earning loop, reads without the practice and with no „Odbierz”", () => {
  // decision: D-246 "After being away the player reads a report in the section „Gdy cię nie było” of Siedziba, above „Drużyna”, one line for each character that had an earning loop, a later earning loop of a character whose earning loop a death stopped opening a line of its own, and one button „Zamknij” closes the whole section: first the earning loops a death stopped, in `danger`, „{imię}: pętla stanęła po {m} min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie {n}.”, then the others, in `text`, „{imię}: {m} min · skrzynka: {przedmiot} +{n}, {przedmiot} −{n} · wprawa do odebrania: {umiejętność} +{n}”, with „Odbierz” in `positive` where practice waits, with what is empty left out, with „ · wskrzeszenie zużyte” where a resurrection covered a death, under them „Skrzynka jest pełna.” in `warning` where the chest is full, {m} in both lines being the game minutes the catch-up passed"
  // decision: D-246 "The practice waiting in a line is read from that character's earning loop whenever the section is drawn, so it always equals what „Odbierz” would pay at that moment, and after „Odbierz” it and the button are gone until the earning loop gathers more; the rest of the report lies in the game state, so it survives a reload, and a further return before „Zamknij” adds to it; the section shows from one whole game minute of the catch-up, and an earning loop a death stopped opens it at any number of game minutes"
  for (const waiting of [{ 1: {} }, {}, { 2: { loop: { eating: 3 } } }]) {
    assert.deepEqual(entriesOf([away({ chest: { stick: 1 } })], waiting), [
      { text: "Ala: 5 min · skrzynka: patyk +1", danger: false, takeFor: null },
    ]);
  }
});

// D-246: an earning loop a death stopped has no earning loop and its practice went with the death.
test("a line of an earning loop a death stopped names no practice and has no „Odbierz”, whatever another earning loop of the character holds", () => {
  // decision: D-246 "After being away the player reads a report in the section „Gdy cię nie było” of Siedziba, above „Drużyna”, one line for each character that had an earning loop, a later earning loop of a character whose earning loop a death stopped opening a line of its own, and one button „Zamknij” closes the whole section: first the earning loops a death stopped, in `danger`, „{imię}: pętla stanęła po {m} min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie"
  // decision: D-246 "After being away the player reads a report in the section „Gdy cię nie było” of Siedziba, above „Drużyna”, one line for each character that had an earning loop, a later earning loop of a character whose earning loop a death stopped opening a line of its own, and one button „Zamknij” closes the whole section: first the earning loops a death stopped, in `danger`, „{imię}: pętla stanęła po {m} min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie {n}.”, then the others, in `text`, „{imię}: {m} min · skrzynka: {przedmiot} +{n}, {przedmiot} −{n} · wprawa do odebrania: {umiejętność} +{n}”, with „Odbierz” in `positive` where practice waits, with what is empty left out, with „ · wskrzeszenie zużyte” where a resurrection covered a death, under them „Skrzynka jest pełna.” in `warning` where the chest is full, {m} in both lines being the game minutes the catch-up passed"
  const [entry] = entriesOf([stoppedAway(1, 3, 2)], {
    1: { loop: { eating: 3 } },
  });
  assert.equal(entry.takeFor, null);
  assert.equal(entry.text.includes("wprawa"), false);
});

test("items follow the order of the items' data whatever the order of the line's keys", () => {
  // decision: D-246 "After being away the player reads a report in the section „Gdy cię nie było” of Siedziba, above „Drużyna”, one line for each character that had an earning loop, a later earning loop of a character whose earning loop a death stopped opening a line of its own, and one button „Zamknij” closes the whole section: first the earning loops a death stopped, in `danger`, „{imię}: pętla stanęła po {m} min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie {n}.”, then the others, in `text`, „{imię}: {m} min · skrzynka: {przedmiot} +{n}, {przedmiot} −{n} · wprawa do odebrania: {umiejętność} +{n}”, with „Odbierz” in `positive` where practice waits, with what is empty left out, with „ · wskrzeszenie zużyte” where a resurrection covered a death, under them „Skrzynka jest pełna.” in `warning` where the chest is full, {m} in both lines being the game minutes the catch-up passed"
  const [entry] = entriesOf([
    away({ chest: { fiber: 1, berry: -4, stick: 2 } }),
  ]);
  assert.equal(
    entry.text,
    "Ala: 5 min · skrzynka: patyk +2, jagoda −4, włókno +1",
  );
});

test("empty parts are left out: no chest, no practice, or neither", () => {
  // decision: D-246 "After being away the player reads a report in the section „Gdy cię nie było” of Siedziba, above „Drużyna”, one line for each character that had an earning loop, a later earning loop of a character whose earning loop a death stopped opening a line of its own, and one button „Zamknij” closes the whole section: first the earning loops a death stopped, in `danger`, „{imię}: pętla stanęła po {m} min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie {n}.”, then the others, in `text`, „{imię}: {m} min · skrzynka: {przedmiot} +{n}, {przedmiot} −{n} · wprawa do odebrania: {umiejętność} +{n}”, with „Odbierz” in `positive` where practice waits, with what is empty left out, with „ · wskrzeszenie zużyte” where a resurrection covered a death, under them „Skrzynka jest pełna.” in `warning` where the chest is full, {m} in both lines being the game minutes the catch-up passed"
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
  // decision: D-246 "After being away the player reads a report in the section „Gdy cię nie było” of Siedziba, above „Drużyna”, one line for each character that had an earning loop, a later earning loop of a character whose earning loop a death stopped opening a line of its own, and one button „Zamknij” closes the whole section: first the earning loops a death stopped, in `danger`, „{imię}: pętla stanęła po {m} min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie {n}.”, then the others, in `text`, „{imię}: {m} min · skrzynka: {przedmiot} +{n}, {przedmiot} −{n} · wprawa do odebrania: {umiejętność} +{n}”, with „Odbierz” in `positive` where practice waits, with what is empty left out, with „ · wskrzeszenie zużyte” where a resurrection covered a death, under them „Skrzynka jest pełna.” in `warning` where the chest is full, {m} in both lines being the game minutes the catch-up passed"
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
        text: "Ala: 5 min · skrzynka: patyk +3 · wprawa do odebrania: Jedzenie +2 · wskrzeszenie zużyte · najdłużej bez śmierci: 3 przejścia z rzędu",
        danger: false,
        takeFor: 1,
      },
    ],
  );
  assert.equal(
    entriesOf([away()], { 1: { record: 3 } })[0].text,
    "Ala: 5 min · najdłużej bez śmierci: 3 przejścia z rzędu",
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
      `Ala: 5 min · najdłużej bez śmierci: ${noun} z rzędu`,
      `record ${record}`,
    );
});

// Catches a zero drawn as „0 przejść z rzędu”, and a line of a character with no earning loop given a
// number from nowhere.
test("a loop record of zero, and a line whose character has no earning loop, show no loop record", () => {
  // decision: D-246 "It is read from the earning loop whenever the section is drawn, as the practice waiting is, and stands nowhere where it is zero."
  assert.equal(entriesOf([away()], { 1: { record: 0 } })[0].text, "Ala: 5 min");
  assert.equal(entriesOf([away()])[0].text, "Ala: 5 min");
  assert.equal(entriesOf([away()], { 2: { record: 4 } })[0].text, "Ala: 5 min");
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
  // decision: D-246 "It is read from the earning loop whenever the section is drawn, as the practice waiting is, and stands nowhere where it is zero."
  const report = [away(), line(2, { minutes: 7 })];
  const read = (waiting) => entriesOf(report, waiting).map(({ text }) => text);
  assert.deepEqual(read({ 1: { record: 2 }, 2: { record: 9 } }), [
    "Ala: 5 min · najdłużej bez śmierci: 2 przejścia z rzędu",
    "Ola: 7 min · najdłużej bez śmierci: 9 przejść z rzędu",
  ]);
  assert.deepEqual(read({ 1: { record: 6 }, 2: { record: 0 } }), [
    "Ala: 5 min · najdłużej bez śmierci: 6 przejść z rzędu",
    "Ola: 7 min",
  ]);
});

// Catches the order of the data (earning loops stopped last) or of the lines' arrival replacing the order
// the section promises: stopped lines first, then the others, each in the team's order.
test("stopped lines come first and the others after them, each group in the team's order", () => {
  // decision: D-246 "After being away the player reads a report in the section „Gdy cię nie było” of Siedziba, above „Drużyna”, one line for each character that had an earning loop, a later earning loop of a character whose earning loop a death stopped opening a line of its own, and one button „Zamknij” closes the whole section: first the earning loops a death stopped, in `danger`, „{imię}: pętla stanęła po {m} min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie"
  // decision: D-246 "After being away the player reads a report in the section „Gdy cię nie było” of Siedziba, above „Drużyna”, one line for each character that had an earning loop, a later earning loop of a character whose earning loop a death stopped opening a line of its own, and one button „Zamknij” closes the whole section: first the earning loops a death stopped, in `danger`, „{imię}: pętla stanęła po {m} min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie {n}.”, then the others, in `text`, „{imię}: {m} min · skrzynka: {przedmiot} +{n}, {przedmiot} −{n} · wprawa do odebrania: {umiejętność} +{n}”, with „Odbierz” in `positive` where practice waits, with what is empty left out, with „ · wskrzeszenie zużyte” where a resurrection covered a death, under them „Skrzynka jest pełna.” in `warning` where the chest is full, {m} in both lines being the game minutes the catch-up passed"
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
  // decision: D-246 "After being away the player reads a report in the section „Gdy cię nie było” of Siedziba, above „Drużyna”, one line for each character that had an earning loop, a later earning loop of a character whose earning loop a death stopped opening a line of its own, and one button „Zamknij” closes the whole section: first the earning loops a death stopped, in `danger`, „{imię}: pętla stanęła po {m} min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie"
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
  // decision: D-246 "After being away the player reads a report in the section „Gdy cię nie było” of Siedziba, above „Drużyna”, one line for each character that had an earning loop, a later earning loop of a character whose earning loop a death stopped opening a line of its own, and one button „Zamknij” closes the whole section: first the earning loops a death stopped, in `danger`, „{imię}: pętla stanęła po {m} min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie {n}.”, then the others, in `text`, „{imię}: {m} min · skrzynka: {przedmiot} +{n}, {przedmiot} −{n} · wprawa do odebrania: {umiejętność} +{n}”, with „Odbierz” in `positive` where practice waits, with what is empty left out, with „ · wskrzeszenie zużyte” where a resurrection covered a death, under them „Skrzynka jest pełna.” in `warning` where the chest is full, {m} in both lines being the game minutes the catch-up passed"
  assert.equal(reportChestFull({ pieces: { stick: 59 } }), false);
  assert.equal(reportChestFull({ pieces: { stick: 60 } }), true);
  assert.equal(reportChestFull({ pieces: { stick: 30, moss: 30 } }), true);
  assert.equal(reportChestFull({ pieces: {} }), false);
});
