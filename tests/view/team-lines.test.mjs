// The team lines' pure functions, tested without a browser. Importing the module must not touch
// the DOM.
import assert from "node:assert/strict";
import { test } from "node:test";
import { createCharacter, newGame } from "../../dist/browser/sim/game.js";
import { rowProgram } from "../../dist/browser/sim/programs.js";
import {
  chestLines,
  generationLabel,
  loopLine,
  programPositions,
  resurrectionLine,
  runWaitingParts,
  stoppedLoopLine,
} from "../../dist/browser/view/team-lines.js";

test("importing the team lines touches no DOM: Node has no document and the import succeeded", () => {
  assert.equal(typeof globalThis.document, "undefined");
  assert.equal(typeof chestLines, "function");
});

test("an empty chest shows no line, so the headquarters marks it empty", () => {
  assert.deepEqual(chestLines({ pieces: {} }), []);
  assert.deepEqual(chestLines({ pieces: { stick: 0 } }), []);
});

test("a chest holding pieces shows a line per resource held, in the order of the resources' data", () => {
  assert.deepEqual(chestLines({ pieces: { moss: 2, stick: 5, berry: 0 } }), [
    "patyk: 5",
    "mech: 2",
  ]);
});

test("the row of a character that has not gone shows the first program of the list", () => {
  const state = createCharacter(newGame(), "Ala").state;
  const id = state.team.characters[0].id;
  const positions = programPositions(state.programs, rowProgram(state, id));
  assert.equal(positions.value, String(state.programs[0].id));
  assert.equal(positions.options[0][1], state.programs[0].name);
});

const PROGRAMS = [
  { id: 1, name: "Program", program: { rules: [] } },
  { id: 4, name: "Las nocą", program: { rules: [] } },
  { id: 7, name: "program", program: { rules: [] } },
];

test("the positions of a row's list are the programs' names in list order, valued by their numbers", () => {
  assert.deepEqual(programPositions(PROGRAMS, PROGRAMS[0]).options, [
    ["1", "Program"],
    ["4", "Las nocą"],
    ["7", "program"],
  ]);
});

test("the list shows the program given, whichever place it has on the list", () => {
  assert.equal(programPositions(PROGRAMS, PROGRAMS[1]).value, "4");
  assert.equal(programPositions(PROGRAMS, PROGRAMS[2]).value, "7");
});

// D-217. A real moment of the browser's clock, in ms, and the lengths the cases use.
const NOW = 1_760_000_000_000;
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
// D-217: the sentence after the count at zero uses, in `danger` alone.
const DANGER = " — śmierć zabierze wprawę i wykupione stopnie";

/**
 * A team whose resurrection holds `spent` uses not yet returned, the next of them returning at the
 * real moment `nextMs` (null with no use spent).
 */
const teamWithUses = (spent, nextMs) => ({
  characters: [],
  chest: { pieces: {} },
  resurrectionUsesSpent: spent,
  resurrectionNextReturnAtMs: nextMs,
});

/** The resurrection line of a team with `spent` uses not yet returned, read at the moment `NOW`. */
const lineAt = (spent, nextMs) =>
  resurrectionLine(teamWithUses(spent, nextMs), NOW);

test("a full stock reads its count from the data, with no time and out of danger", () => {
  // decision: D-217 "The card and the screen of a character, and that character in the section „Kto idzie” of the card of a map, show, from its creation, „Wskrzeszenie drużyny: użycia {u} z {c}” in `text-secondary` while the stock of uses is full"
  assert.deepEqual(lineAt(0, null), {
    text: "Wskrzeszenie drużyny: użycia 3 z 3",
    danger: false,
  });
});

test("a new game's team holds its full stock with no moment, and its line is the full stock", () => {
  // decision: D-217 "The card and the screen of a character, and that character in the section „Kto idzie” of the card of a map, show, from its creation, „Wskrzeszenie drużyny: użycia {u} z {c}” in `text-secondary` while the stock of uses is full"
  assert.deepEqual(resurrectionLine(newGame().team, NOW), {
    text: "Wskrzeszenie drużyny: użycia 3 z 3",
    danger: false,
  });
});

test("a part of the stock reads the uses left and the time to the next return, in text-secondary and out of danger", () => {
  // decision: D-217 "The card and the screen of a character, and that character in the section „Kto idzie” of the card of a map, show, from its creation, „Wskrzeszenie drużyny: użycia {u} z {c}” in `text-secondary` while the stock of uses is full, „Wskrzeszenie drużyny: użycia {u} z {c}, następne za {g} godz. {m} min czasu realnego” in `text-secondary` while the stock is not full and a use is left"
  assert.deepEqual(lineAt(2, NOW + 3 * HOUR + 10 * MINUTE), {
    text: "Wskrzeszenie drużyny: użycia 1 z 3, następne za 3 godz. 10 min czasu realnego",
    danger: false,
  });
});

test("no use left reads 0 of the count, the time to the next return and the warning, in danger", () => {
  // decision: D-217 "The card and the screen of a character, and that character in the section „Kto idzie” of the card of a map, show, from its creation, „Wskrzeszenie drużyny: użycia {u} z {c}” in `text-secondary` while the stock of uses is full, „Wskrzeszenie drużyny: użycia {u} z {c}, następne za {g} godz. {m} min czasu realnego” in `text-secondary` while the stock is not full and a use is left, and „Wskrzeszenie drużyny: użycia 0 z {c}, następne za {g} godz. {m} min czasu realnego — śmierć zabierze wprawę i wykupione stopnie” in `danger` at zero uses"
  assert.deepEqual(lineAt(3, NOW + 3 * HOUR + 10 * MINUTE), {
    text: `Wskrzeszenie drużyny: użycia 0 z 3, następne za 3 godz. 10 min czasu realnego${DANGER}`,
    danger: true,
  });
});

// The three examples of D-217, written out: the minutes go up to a whole minute before the split, so a
// time shown is never shorter than the real one.
test("7 h 59 min 30 s reads 8 godz. 0 min, 59 min 30 s reads 1 godz. 0 min, and exactly 59 min reads 59 min", () => {
  // decision: D-217 "The card and the screen of a character, and that character in the section „Kto idzie” of the card of a map, show, from its creation, „Wskrzeszenie drużyny: użycia {u} z {c}” in `text-secondary` while the stock of uses is full, „Wskrzeszenie drużyny: użycia {u} z {c}, następne za {g} godz. {m} min czasu realnego” in `text-secondary` while the stock is not full and a use is left, and „Wskrzeszenie drużyny: użycia 0 z {c}, następne za {g} godz. {m} min czasu realnego — śmierć zabierze wprawę i wykupione stopnie” in `danger` at zero uses, the count {c} coming from the balance data and the time reading „następne za {m} min czasu realnego” below one hour"
  // decision: D-217 "The minutes are rounded up to a whole minute before the split into hours and minutes"
  assert.equal(
    lineAt(1, NOW + 7 * HOUR + 59 * MINUTE + 30 * SECOND).text,
    "Wskrzeszenie drużyny: użycia 2 z 3, następne za 8 godz. 0 min czasu realnego",
  );
  assert.equal(
    lineAt(1, NOW + 59 * MINUTE + 30 * SECOND).text,
    "Wskrzeszenie drużyny: użycia 2 z 3, następne za 1 godz. 0 min czasu realnego",
  );
  assert.equal(
    lineAt(1, NOW + 59 * MINUTE).text,
    "Wskrzeszenie drużyny: użycia 2 z 3, następne za 59 min czasu realnego",
  );
});

test("hours and minutes split after the rounding up: 60 min is 1 godz. 0 min, 61 min is 1 godz. 1 min, 2 h 1 s is 2 godz. 1 min", () => {
  // decision: D-217 "The minutes are rounded up to a whole minute before the split into hours and minutes"
  assert.equal(
    lineAt(1, NOW + 60 * MINUTE).text,
    "Wskrzeszenie drużyny: użycia 2 z 3, następne za 1 godz. 0 min czasu realnego",
  );
  assert.equal(
    lineAt(1, NOW + 61 * MINUTE).text,
    "Wskrzeszenie drużyny: użycia 2 z 3, następne za 1 godz. 1 min czasu realnego",
  );
  assert.equal(
    lineAt(1, NOW + 2 * HOUR + SECOND).text,
    "Wskrzeszenie drużyny: użycia 2 z 3, następne za 2 godz. 1 min czasu realnego",
  );
});

test("below an hour only minutes stand, and 1 ms or 30 s left still reads one whole minute, never 0 min", () => {
  // decision: D-217 "The minutes are rounded up to a whole minute before the split into hours and minutes"
  // decision: D-217 "The card and the screen of a character, and that character in the section „Kto idzie” of the card of a map, show, from its creation, „Wskrzeszenie drużyny: użycia {u} z {c}” in `text-secondary` while the stock of uses is full, „Wskrzeszenie drużyny: użycia {u} z {c}, następne za {g} godz. {m} min czasu realnego” in `text-secondary` while the stock is not full and a use is left, and „Wskrzeszenie drużyny: użycia 0 z {c}, następne za {g} godz. {m} min czasu realnego — śmierć zabierze wprawę i wykupione stopnie” in `danger` at zero uses, the count {c} coming from the balance data and the time reading „następne za {m} min czasu realnego” below one hour"
  assert.equal(
    lineAt(1, NOW + 1).text,
    "Wskrzeszenie drużyny: użycia 2 z 3, następne za 1 min czasu realnego",
  );
  assert.equal(
    lineAt(1, NOW + 30 * SECOND).text,
    "Wskrzeszenie drużyny: użycia 2 z 3, następne za 1 min czasu realnego",
  );
  assert.equal(
    lineAt(1, NOW + MINUTE + 1).text,
    "Wskrzeszenie drużyny: użycia 2 z 3, następne za 2 min czasu realnego",
  );
});

// invariant: resurrection-renewal
// The same boundary as the simulation's: a use returns from the moment of its return on, that moment
// included, so the stock reads full at that moment and one use less spent by the next return.
test("a use returns at its moment itself and not a millisecond before, and the next one is a renewal later", () => {
  // decision: D-219 "The browser's clock counts the renewal of a resurrection, so the renewal runs in real time at every pace of a map run and while the game is closed"
  assert.deepEqual(lineAt(1, NOW), {
    text: "Wskrzeszenie drużyny: użycia 3 z 3",
    danger: false,
  });
  assert.equal(
    lineAt(1, NOW + 1).text,
    "Wskrzeszenie drużyny: użycia 2 z 3, następne za 1 min czasu realnego",
  );
  assert.deepEqual(lineAt(3, NOW), {
    text: "Wskrzeszenie drużyny: użycia 1 z 3, następne za 4 godz. 0 min czasu realnego",
    danger: false,
  });
});

test("a clock set back lengthens the time left: a moment an hour before the reading reads 9 godz. 0 min for a next use due 8 hours after it", () => {
  // decision: D-217 "The minutes are rounded up to a whole minute before the split into hours and minutes"
  assert.equal(
    resurrectionLine(teamWithUses(1, NOW + 8 * HOUR), NOW - HOUR).text,
    "Wskrzeszenie drużyny: użycia 2 z 3, następne za 9 godz. 0 min czasu realnego",
  );
});

test("the label of a generation is „pokolenie {n}” from 2 up and nothing at 1", () => {
  // decision: D-218 "The headquarters and the screen Postać show „pokolenie {n}” beside a character's name from generation number 2 up, in `text-secondary`"
  assert.equal(generationLabel(1), null);
  assert.equal(generationLabel(2), "pokolenie 2");
  assert.equal(generationLabel(13), "pokolenie 13");
});

// D-244. Catches a number of the line read from the wrong place (the run's number for the
// minute, the completed runs for the run's number) and a map name written into the view.
test("the line of a character in an earning loop names the map, the run, its minute and the runs completed", () => {
  // decision: D-244 "A running earning loop shows on the card and the screen of its character, and at that character in the section „Kto idzie” of the card of a map, as one line in the role `text`, „Pętla: {mapa} · przejście {n} · minuta {m} · domknięte {k}”, with the button „Zatrzymaj”"
  assert.equal(
    loopLine({
      runNumber: 3,
      completed: 2,
      run: { mapId: "forest", minute: 212 },
    }),
    "Pętla: Las · przejście 3 · minuta 212 · domknięte 2",
  );
  assert.equal(
    loopLine({
      runNumber: 1,
      completed: 0,
      run: { mapId: "forestDeep", minute: 0 },
    }),
    "Pętla: Las — głębiej · przejście 1 · minuta 0 · domknięte 0",
  );
});

// D-245. Catches a stop that gathered nothing reading „wprawa: nic”, a skill with
// zero practice listed, and an order other than the skills' data.
test("the line after a stop lists the practice gathered in the skills' order, and is the bare words where none was", () => {
  // decision: D-245 "On the character's card and screen, until the next send or start of that character and after a load of the saved game state too, stands in the role `text-secondary` „Pętla zatrzymana · wprawa: {umiejętność} +{n}, …”, or „Pętla zatrzymana” where the earning loop gathered no practice"
  assert.equal(stoppedLoopLine({}), "Pętla zatrzymana");
  assert.equal(stoppedLoopLine({ eating: 0 }), "Pętla zatrzymana");
  assert.equal(
    stoppedLoopLine({ eating: 4 }),
    "Pętla zatrzymana · wprawa: Jedzenie +4",
  );
  assert.equal(
    stoppedLoopLine({ eating: 4, exploration: 12, kicking: 0 }),
    "Pętla zatrzymana · wprawa: Eksploracja +12, Jedzenie +4",
  );
});

// D-287. Catches a sentence that names the map by a typed name instead of the
// data's, that drops the second sentence every inactive send shows, and a map other than the run's.
test("the sentence beside an inactive send names the run's map from the data and tells the player to finish the run", () => {
  // decision: D-287 "Under the inactive buttons of each character in the section „Kto idzie” of the card of a map stands „Przejście na mapie {mapa} jest niezakończone"
  const sentence = (mapId) => {
    const { lead, link } = runWaitingParts(mapId);
    return lead + link;
  };
  assert.equal(
    sentence("forest"),
    "Przejście na mapie Las jest niezakończone. Wróć do niego i je zakończ, żeby wysłać postać.",
  );
  assert.equal(
    sentence("forestDeep"),
    "Przejście na mapie Las — głębiej jest niezakończone. Wróć do niego i je zakończ, żeby wysłać postać.",
  );
});

// D-287. Catches a screen that cuts the sentence at the wrong place, or the link text a second copy that
// a change of the wording of the sentence alone leaves behind: the screen takes the two parts from here.
test("the sentence beside an inactive send comes in two parts, the one that names the run's map and the one that leads back to it, and the parts make the sentence", () => {
  // decision: D-287 "Under the inactive buttons of each character in the section „Kto idzie” of the card of a map stands „Przejście na mapie {mapa} jest niezakończone"
  assert.deepEqual(runWaitingParts("forest"), {
    lead: "Przejście na mapie Las jest niezakończone. ",
    link: "Wróć do niego i je zakończ, żeby wysłać postać.",
  });
  assert.deepEqual(runWaitingParts("forestDeep"), {
    lead: "Przejście na mapie Las — głębiej jest niezakończone. ",
    link: "Wróć do niego i je zakończ, żeby wysłać postać.",
  });
});
