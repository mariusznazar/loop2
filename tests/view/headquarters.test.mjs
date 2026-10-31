// The headquarters' pure parts, tested without a browser. Importing the module must not touch
// the DOM.
import assert from "node:assert/strict";
import { test } from "node:test";
import { createCharacter, newGame } from "../../dist/public/sim/game.js";
import { rowProgram } from "../../dist/public/sim/programs.js";
import {
  chestLines,
  generationLabel,
  loopLine,
  mapLabel,
  programPositions,
  resurrectionLine,
  sendMaps,
  solvingSentence,
  stoppedLoopLine,
} from "../../dist/public/view/headquarters.js";

test("importing the headquarters touches no DOM: Node has no document and the import succeeded", () => {
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

test("a map's label is „Mapa: {name}”, with „ · rozwiązana” once solved, the name from the data", () => {
  assert.equal(mapLabel("forest", false), "Mapa: Las");
  assert.equal(mapLabel("forest", true), "Mapa: Las · rozwiązana");
});

test("the condition sentence is the map's name, a dash and the solving text of its data", () => {
  assert.equal(
    solvingSentence("forest"),
    "Las — 480 minut bez utraty zdrowia od zimna i głodu i bez zmiany programu",
  );
});

test("the headquarters hides maps until their prerequisites are solved; the editor keeps its full map list", () => {
  assert.deepEqual(sendMaps(), ["forest", "forestDeep"]);
  assert.deepEqual(sendMaps([]), ["forest"]);
  assert.deepEqual(sendMaps(["forest"]), ["forest", "forestDeep"]);
});

const PROGRAMS = [
  { id: 1, name: "Program", program: { rules: [] } },
  { id: 4, name: "Las nocą", program: { rules: [] } },
  { id: 7, name: "program", program: { rules: [] } },
];

test("the row of a character that has not gone shows the first program of the list", () => {
  const state = createCharacter(newGame(), "Ala").state;
  const id = state.team.characters[0].id;
  const positions = programPositions(state.programs, rowProgram(state, id));
  assert.equal(positions.value, String(state.programs[0].id));
  assert.equal(positions.options[0][1], state.programs[0].name);
});

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

// To do 19, Q12. A real moment of the browser's clock, in ms, and the lengths the cases use.
const NOW = 1_760_000_000_000;
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const WARNING = " — śmierć zabierze wprawę i wykupione stopnie";

/** The line of a character whose resurrection is ready `left` ms after `NOW`. */
const lineWhenLeft = (left, now = NOW) =>
  resurrectionLine({ resurrectionReadyAtMs: now + left }, now);

// Q12's three examples, written out: the minutes go up to a whole minute before the split, so a
// time shown is never shorter than the real one.
test("7 h 59 min 30 s reads 8 godz. 0 min, 59 min 30 s reads 1 godz. 0 min, and exactly 59 min reads 59 min", () => {
  assert.deepEqual(lineWhenLeft(7 * HOUR + 59 * MINUTE + 30 * SECOND), {
    text: `Wskrzeszenie za 8 godz. 0 min${WARNING}`,
    danger: true,
  });
  assert.deepEqual(lineWhenLeft(59 * MINUTE + 30 * SECOND), {
    text: `Wskrzeszenie za 1 godz. 0 min${WARNING}`,
    danger: true,
  });
  assert.deepEqual(lineWhenLeft(59 * MINUTE), {
    text: `Wskrzeszenie za 59 min${WARNING}`,
    danger: true,
  });
});

test("hours and minutes split after the rounding up: 60 min is 1 godz. 0 min, 61 min is 1 godz. 1 min, 2 h 1 s is 2 godz. 1 min", () => {
  assert.equal(
    lineWhenLeft(60 * MINUTE).text,
    `Wskrzeszenie za 1 godz. 0 min${WARNING}`,
  );
  assert.equal(
    lineWhenLeft(61 * MINUTE).text,
    `Wskrzeszenie za 1 godz. 1 min${WARNING}`,
  );
  assert.equal(
    lineWhenLeft(2 * HOUR + SECOND).text,
    `Wskrzeszenie za 2 godz. 1 min${WARNING}`,
  );
});

test("below an hour only minutes stand, and 1 ms or 30 s left still reads one whole minute, never 0 min", () => {
  assert.equal(lineWhenLeft(1).text, `Wskrzeszenie za 1 min${WARNING}`);
  assert.equal(
    lineWhenLeft(30 * SECOND).text,
    `Wskrzeszenie za 1 min${WARNING}`,
  );
  assert.equal(
    lineWhenLeft(MINUTE + 1).text,
    `Wskrzeszenie za 2 min${WARNING}`,
  );
});

// invariant: resurrection-renewal
// The same boundary as the simulation's: ready from the moment of readiness on, that moment included.
test("the line turns ready at the moment of readiness itself and not a millisecond before, and a ready line is not danger", () => {
  assert.deepEqual(lineWhenLeft(0), {
    text: "Wskrzeszenie gotowe",
    danger: false,
  });
  assert.deepEqual(lineWhenLeft(-5 * HOUR), {
    text: "Wskrzeszenie gotowe",
    danger: false,
  });
  assert.equal(lineWhenLeft(1).danger, true);
});

test("a character of a new game, whose moment is 0, reads ready at any real moment", () => {
  assert.equal(
    resurrectionLine({ resurrectionReadyAtMs: 0 }, NOW).text,
    "Wskrzeszenie gotowe",
  );
});

test("a clock set back lengthens the time left: the moment an hour earlier reads 9 godz. 0 min for 8 hours of renewal", () => {
  const readyAtMs = NOW + 8 * HOUR;
  assert.equal(
    resurrectionLine({ resurrectionReadyAtMs: readyAtMs }, NOW - HOUR).text,
    `Wskrzeszenie za 9 godz. 0 min${WARNING}`,
  );
});

test("the label of a generation is „pokolenie {n}” from 2 up and nothing at 1", () => {
  assert.equal(generationLabel(1), null);
  assert.equal(generationLabel(2), "pokolenie 2");
  assert.equal(generationLabel(13), "pokolenie 13");
});

// D-227, To do 9. Catches a number of the line read from the wrong place (the run's number for the
// minute, the completed runs for the run's number) and a map name written into the view.
test("the line of a character in a loop names the map, the run, its minute and the runs completed", () => {
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

// D-228, To do 8, Q18. Catches a stop that gathered nothing reading „wprawa: nic”, a skill with
// zero practice listed, and an order other than the skills' data.
test("the line after a stop lists the practice gathered in the skills' order, and is the bare words where none was", () => {
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
