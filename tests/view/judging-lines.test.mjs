// The texts of the judging of a program in „Kto idzie” (D-329, D-439, D-440), tested without a
// browser: the heading of a result, the row of each seed, the mark beside the list „Program:”, and what
// „Puść w pętlę” reads of a judging (D-243): the seeds solved, the sentence over the second click and
// the comparison of two results.
// Importing the module must not touch the DOM.
import assert from "node:assert/strict";
import { test } from "node:test";
import { BALANCE } from "../../dist/browser/sim/data/balance.js";
import {
  JUDGE_BUTTON_TEXT,
  JUDGING_COSTS_NOTHING,
  JUDGING_WAITING_TEXT,
  LOOP_ANYWAY_TEXT,
  judgingHeading,
  markLine,
  sameLines,
  seedLines,
  solvedSeeds,
  unsolvedSentence,
} from "../../dist/browser/view/judging-lines.js";

const SOLVED = { kind: "solved" };
const UNDECIDED = { kind: "undecided" };
const death = (cause, minute) => ({ kind: "death", cause, minute });

/** A judging whose twelve results are `results`, padded with solved seeds to twelve. */
function judgingOf(...results) {
  const padded = [...results];
  while (padded.length < 12) padded.push(SOLVED);
  return { results: padded, equipment: [] };
}

test("importing the judging lines touches no DOM: Node has no document and the import succeeded", () => {
  assert.equal(typeof globalThis.document, "undefined");
  assert.equal(typeof judgingHeading, "function");
});

test("the button, its waiting text and the sentence under a result read as the decisions give them", () => {
  // decision: D-329 "The button of a judging, „Oceń na 12 ziarnach”, judges the program of the character's list „Program:” on the map of the card (D-439) and reads „Oceniam…” while the judging counts"
  assert.equal(JUDGE_BUTTON_TEXT, "Oceń na 12 ziarnach");
  assert.equal(JUDGING_WAITING_TEXT, "Oceniam…");
  assert.equal(
    JUDGING_COSTS_NOTHING,
    "Ocena nic nie kosztuje: nie bierze ze skrzynki, nic nie płaci, a śmierć w niej nie zabiera wprawy ani wskrzeszenia.",
  );
});

test("the heading counts the seeds solved of the twelve, and a seed left undecided or ended in a death is not one of them", () => {
  // decision: D-329 "Its result unfolds under the character as „Ocena na 12 ziarnach: {n} z 12 rozwiązanych”, twelve lines „Ziarno {i}: …” and „Ocena nic nie kosztuje: nie bierze ze skrzynki, nic nie płaci, a śmierć w niej nie zabiera wprawy ani wskrzeszenia.”, and stands until the player picks another program on that list, judges again or leaves the card."
  assert.equal(
    judgingHeading(judgingOf()),
    "Ocena na 12 ziarnach: 12 z 12 rozwiązanych",
  );
  assert.equal(
    judgingHeading(judgingOf(death("cold", 30), UNDECIDED)),
    "Ocena na 12 ziarnach: 10 z 12 rozwiązanych",
  );
  assert.equal(
    judgingHeading({
      results: Array.from({ length: 12 }, () => UNDECIDED),
      equipment: [],
    }),
    "Ocena na 12 ziarnach: 0 z 12 rozwiązanych",
  );
});

test("each seed has its row, numbered from 1 in the order of the results, in the words of its kind", () => {
  // decision: D-439 "The game runs a program on twelve fixed seeds of a map, the same seeds each time, and shows the result seed by seed: solved, a death with its cause and game minute, or undecided where the program has neither solved the map nor died within a cap of game minutes set in the game's data"
  const lines = seedLines(
    judgingOf(
      SOLVED,
      death("cold", 37),
      death("hunger", 412),
      death("combat", 5),
      UNDECIDED,
    ),
  );
  assert.equal(lines.length, 12);
  assert.deepEqual(
    lines.slice(0, 5).map((line) => line.text),
    [
      "Ziarno 1: rozwiązane",
      "Ziarno 2: mag zamarzł w 37. minucie",
      "Ziarno 3: mag umarł z głodu w 412. minucie",
      "Ziarno 4: mag zginął w walce w 5. minucie",
      `Ziarno 5: bez rozstrzygnięcia po ${BALANCE.judgingCapMinutes} minutach`,
    ],
  );
  assert.deepEqual(
    lines.slice(0, 5).map((line) => line.kind),
    ["solved", "death", "death", "death", "undecided"],
  );
  assert.equal(lines[11].text, "Ziarno 12: rozwiązane");
});

test("the cap of an undecided row is the cap of the game's data, declined by its count", () => {
  // decision: D-439 "The game runs a program on twelve fixed seeds of a map, the same seeds each time, and shows the result seed by seed: solved, a death with its cause and game minute, or undecided where the program has neither solved the map nor died within a cap of game minutes set in the game's data"
  const cap = BALANCE.judgingCapMinutes;
  try {
    for (const [minutes, words] of [
      [777, "po 777 minutach"],
      [1, "po 1 minucie"],
      [22, "po 22 minutach"],
    ]) {
      BALANCE.judgingCapMinutes = minutes;
      assert.equal(
        seedLines(judgingOf(UNDECIDED))[0].text,
        `Ziarno 1: bez rozstrzygnięcia ${words}`,
      );
    }
  } finally {
    BALANCE.judgingCapMinutes = cap;
  }
});

test("the mark of a judging that solved all twelve with the stock held is the badge „szczelny: 12 z 12” in positive and no note", () => {
  // decision: D-440 "Beside the list „Program:” of a character in „Kto idzie” stands the judging remembered for that character, the program the list shows and the map of the card: the badge „szczelny: 12 z 12” in `positive` where it solved all twelve seeds, and „{n} z 12” in `text` otherwise."
  assert.deepEqual(
    markLine({ solved: 12, allSolved: true, stockShort: false, badge: true }),
    { text: "szczelny: 12 z 12", role: "positive", note: null },
  );
});

test("the mark of a lower result is „{n} z 12” in text, with no note while the chest holds what the judging took", () => {
  // decision: D-440 "Beside the list „Program:” of a character in „Kto idzie” stands the judging remembered for that character, the program the list shows and the map of the card: the badge „szczelny: 12 z 12” in `positive` where it solved all twelve seeds, and „{n} z 12” in `text` otherwise."
  assert.deepEqual(
    markLine({ solved: 9, allSolved: false, stockShort: false, badge: false }),
    { text: "9 z 12", role: "text", note: null },
  );
  assert.deepEqual(
    markLine({ solved: 0, allSolved: false, stockShort: false, badge: false }),
    { text: "0 z 12", role: "text", note: null },
  );
});

test("where the chest holds less than the judging took the note stands, and twelve of twelve loses its badge and keeps its count", () => {
  // decision: D-440 "Where the chest holds less of an item than the judging took, the result stays with „oceniono z zapasem, którego dziś nie ma w skrzynce” beside it and the badge goes out, „12 z 12” standing in its place."
  const note = "oceniono z zapasem, którego dziś nie ma w skrzynce";
  assert.deepEqual(
    markLine({ solved: 12, allSolved: true, stockShort: true, badge: false }),
    { text: "12 z 12", role: "text", note },
  );
  assert.deepEqual(
    markLine({ solved: 9, allSolved: false, stockShort: true, badge: false }),
    { text: "9 z 12", role: "text", note },
  );
});

test("the seeds solved of a judging are counted, and a seed left undecided or ended in a death is not one of them", () => {
  // decision: D-439 "The game runs a program on twelve fixed seeds of a map, the same seeds each time, and shows the result seed by seed: solved, a death with its cause and game minute, or undecided where the program has neither solved the map nor died within a cap of game minutes set in the game's data"
  assert.equal(solvedSeeds(judgingOf()), 12);
  assert.equal(solvedSeeds(judgingOf(death("cold", 30), UNDECIDED)), 10);
  assert.equal(
    solvedSeeds({
      results: Array.from({ length: 12 }, () => UNDECIDED),
      equipment: [],
    }),
    0,
  );
});

test("the button after the first click that found a seed unsolved reads „Puść mimo to”, and the sentence over it counts the seeds the program does not solve", () => {
  // decision: D-243 "Otherwise the new result stands under the character in place of the one that stood there, „Na {k} z 12 ziaren program mapy nie rozwiązuje.” stands above the button in `warning`, the button reads „Puść mimo to”, and a second click starts the earning loop."
  assert.equal(LOOP_ANYWAY_TEXT, "Puść mimo to");
  assert.equal(
    unsolvedSentence(judgingOf(death("cold", 30), UNDECIDED)),
    "Na 2 z 12 ziaren program mapy nie rozwiązuje.",
  );
  assert.equal(
    unsolvedSentence(judgingOf(death("hunger", 5))),
    "Na 1 z 12 ziaren program mapy nie rozwiązuje.",
  );
  assert.equal(
    unsolvedSentence({
      results: Array.from({ length: 12 }, () => UNDECIDED),
      equipment: [],
    }),
    "Na 12 z 12 ziaren program mapy nie rozwiązuje.",
  );
});

test("two results are the same where each of the twelve seeds has the same row: the kind, the cause and the minute", () => {
  // decision: D-243 "The judging of „Puść w pętlę” takes what the earning loop would take from the chest at that moment, and the earning loop starts at once where it solves all twelve seeds, or where it gives each seed the same line as the result of the button of a judging (D-329) that stands under the character."
  const base = judgingOf(death("cold", 37), UNDECIDED);
  assert.equal(sameLines(base, judgingOf(death("cold", 37), UNDECIDED)), true);
  assert.equal(
    sameLines(base, judgingOf(death("cold", 38), UNDECIDED)),
    false,
    "a death a minute later is another row",
  );
  assert.equal(
    sameLines(base, judgingOf(death("hunger", 37), UNDECIDED)),
    false,
    "a death of another cause is another row",
  );
  assert.equal(
    sameLines(base, judgingOf(UNDECIDED, death("cold", 37))),
    false,
    "the same rows at other seeds are no same result",
  );
  assert.equal(sameLines(base, judgingOf(death("cold", 37))), false);
  assert.equal(
    sameLines(
      { results: [SOLVED], equipment: [] },
      { results: [SOLVED, SOLVED], equipment: [] },
    ),
    false,
    "a result of another length is another result",
  );
});

test("the equipment a judging took does not make two results differ, for the screen shows none of it", () => {
  // decision: D-243 "The judging of „Puść w pętlę” takes what the earning loop would take from the chest at that moment, and the earning loop starts at once where it solves all twelve seeds, or where it gives each seed the same line as the result of the button of a judging (D-329) that stands under the character."
  const withStick = {
    ...judgingOf(death("cold", 37)),
    equipment: [{ item: "stick", count: 2 }],
  };
  assert.equal(sameLines(withStick, judgingOf(death("cold", 37))), true);
});
