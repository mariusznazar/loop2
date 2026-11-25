// The map lines' pure functions, tested without a browser. Importing the module must not touch
// the DOM.
import assert from "node:assert/strict";
import { test } from "node:test";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import {
  attackerLines,
  cardHeading,
  capLines,
  demandRows,
  resourceLines,
  sendMaps,
  solvingSentence,
  terrainRows,
} from "../../dist/browser/view/map-lines.js";

// The made-up cases below change one field of Las or Las — głębiej, so each case names the field.
const { forestEdge, forest, forestDeep, forestLair } = MAPS;

/** A row of a table of the card, with no note and no icon unless given. */
const row = (label, value, note = null, icons = []) => ({
  label,
  value,
  note,
  icons,
});

test("importing the map lines touches no DOM: Node has no document and the import succeeded", () => {
  assert.equal(typeof globalThis.document, "undefined");
  assert.equal(typeof sendMaps, "function");
});

test("the condition sentence is the solving text of the map's data alone, since the heading above it names the map", () => {
  // decision: D-133 "The card of each open map shows the sentence of its solving condition from the map's data"
  assert.equal(
    solvingSentence("forest"),
    "480 minut bez utraty zdrowia od zimna i głodu i bez zmiany programu",
  );
});

test("the list of maps hides maps until their prerequisites are solved; the editor keeps its full map list", () => {
  // decision: D-397 "A new game opens the map Skraj lasu, and solving it opens Las"
  // decision: D-388 "Las is a grid of 4 × 4 tiles"
  assert.deepEqual(sendMaps(), [
    "forestEdge",
    "forest",
    "forestDeep",
    "forestPack",
    "forestLair",
  ]);
  assert.deepEqual(sendMaps([]), ["forestEdge"]);
  assert.deepEqual(sendMaps(["forestEdge"]), ["forestEdge", "forest"]);
  assert.deepEqual(sendMaps(["forestEdge", "forest"]), [
    "forestEdge",
    "forest",
    "forestDeep",
  ]);
  assert.deepEqual(sendMaps(["forestEdge", "forest", "forestDeep"]), [
    "forestEdge",
    "forest",
    "forestDeep",
    "forestPack",
  ]);
  assert.deepEqual(
    sendMaps(["forestEdge", "forest", "forestDeep", "forestPack"]),
    ["forestEdge", "forest", "forestDeep", "forestPack", "forestLair"],
  );
});

// D-327: the heading names the map, gives the tag of its state — „rozwiązana” once it is solved,
// „otwarta” before — and says „odsłania ją” with the opener's name from the data at a map another map
// opens. Catches a heading that drops the tag or the opener, a tag the wrong way round, or the opener's
// name taken from the wrong map.
test("the heading names the map, with the tag of its state and the opener's name from the data", () => {
  // decision: D-327 "The card of a map follows the card of the predecessor game"
  const open = { text: "otwarta", solved: false };
  const done = { text: "rozwiązana", solved: true };
  assert.deepEqual(cardHeading(forestEdge, false), {
    name: "Skraj lasu",
    state: open,
    openedBy: null,
  });
  assert.deepEqual(cardHeading(forest, false), {
    name: "Las",
    state: open,
    openedBy: "odsłania ją Skraj lasu",
  });
  assert.deepEqual(cardHeading(forest, true), {
    name: "Las",
    state: done,
    openedBy: "odsłania ją Skraj lasu",
  });
  assert.deepEqual(cardHeading(forestDeep, true), {
    name: "Las — głębiej",
    state: done,
    openedBy: "odsłania ją Las",
  });
});

// D-327: „Żąda” is a table of what the solving condition asks: the streak in whole hours (480 minutes
// are 8 h, 540 are 9 h, and 90 stay 90 min), and the attacks to beat with the icon of the creature
// that attacks. Catches a streak in the wrong unit, a row for a requirement the condition lacks, and
// the attacks without the creature's icon.
test("the table „Żąda” gives the streak in whole hours and the attacks to beat with the creature's icon", () => {
  // decision: D-327 "The card of a map follows the card of the predecessor game"
  assert.deepEqual(demandRows(forest), [row("passa", "8 h")]);
  assert.deepEqual(demandRows(forestDeep), [
    row("passa", "9 h"),
    row("do pokonania", "2", null, ["wolf-head"]),
  ]);
  assert.deepEqual(demandRows(forestLair), [
    row("passa", "10 h"),
    row("do pokonania", "1", null, ["bear-head"]),
  ]);
  assert.deepEqual(demandRows({ ...forest, solving: { streak: 90 } }), [
    row("passa", "90 min"),
  ]);
});

// D-327: the grid, the entrance, the step and the minutes without fire with the temperature as their
// note. Catches a grid with its sides swapped, the entrance word the wrong way round, a note on the step
// the data gives, and wrong minutes without fire.
test("the table „Teren” gives the grid, the entrance, the step and the minutes without fire", () => {
  // decision: D-327 "The card of a map follows the card of the predecessor game"
  assert.deepEqual(terrainRows(forest), [
    row("siatka", "4 × 4"),
    row("wejście", "stałe"),
    row("krok", "5 min"),
    row("bez ognia", "83 min", " — otoczenie 25 °C"),
  ]);
  assert.deepEqual(terrainRows(forestDeep), [
    row("siatka", "5 × 5"),
    row("wejście", "losowe"),
    row("krok", "5 min"),
    row("bez ognia", "33 min", " — otoczenie 7 °C"),
  ]);
});

// D-327: a step above the usual one (5 minutes, the step most maps of the data give) costs more, one
// below it costs less, and the note stands apart from the value, as the renewal of a resource does. At
// 37 °C the body never cools below the chill threshold, so the minutes without fire are left out.
// Catches a note on the usual step, a note with the wrong direction, a note left in the value instead of
// standing apart, and a minutes row for a map that does not cool the body.
test("a step above the usual costs more, one below costs less, the note standing apart, and a map that does not cool leaves the minutes out", () => {
  // decision: D-18 "The game's content — game maps, items, creatures, character skills and their numbers — stands in data files"
  // decision: D-327 "The card of a map follows the card of the predecessor game"
  // decision: D-333 "The minutes without fire are the game minutes that a body"
  // decision: D-58 "A character's body cools in each game minute outside combat by more, the further the game map's ambient temperature lies below the body's starting temperature"
  assert.deepEqual(
    terrainRows({ ...forest, stepMinutes: 9 })[2],
    row("krok", "9 min", " — drożej niż zwykle"),
  );
  assert.deepEqual(
    terrainRows({ ...forest, stepMinutes: 2 })[2],
    row("krok", "2 min", " — taniej niż zwykle"),
  );
  assert.deepEqual(terrainRows({ ...forest, ambientTemperature: 37 }), [
    row("siatka", "4 × 4"),
    row("wejście", "stałe"),
    row("krok", "5 min"),
  ]);
});

// D-327: each resource with its name, the tiles that hold it (density times the tiles, rounded to the
// nearest whole: 0.7 × 16 = 11.2, 0.4 × 16 = 6.4, 0.7 × 25 = 17.5, and 1 × 16 = 16 on every tile), its
// stock and its renewal.
// Catches a floored count, a renewal given the wrong minutes, and a resource whose line is missing.
test("each resource gives its name, the tiles that hold it, its stock and its renewal", () => {
  // decision: D-18 "The game's content — game maps, items, creatures, character skills and their numbers — stands in data files"
  // decision: D-327 "The card of a map follows the card of the predecessor game"
  // decision: D-333 "The minutes without fire are the game minutes that a body"
  const renews = (minutes) => ({
    text: `+1 co ${minutes} min`,
    warning: false,
  });
  assert.deepEqual(resourceLines(forest), [
    {
      id: "stick",
      name: "patyk",
      spread: "≈ 11 z 16 kafelków · po 12",
      renewal: renews(30),
    },
    {
      id: "berry",
      name: "jagoda",
      spread: "≈ 8 z 16 kafelków · po 8",
      renewal: renews(40),
    },
    {
      id: "moss",
      name: "mech",
      spread: "≈ 6 z 16 kafelków · po 6",
      renewal: renews(60),
    },
    {
      id: "fiber",
      name: "włókno",
      spread: "≈ 6 z 16 kafelków · po 6",
      renewal: renews(60),
    },
  ]);
  assert.deepEqual(resourceLines(forestEdge), [
    {
      id: "stick",
      name: "patyk",
      spread: "≈ 16 z 16 kafelków · po 12",
      renewal: renews(30),
    },
    {
      id: "berry",
      name: "jagoda",
      spread: "≈ 16 z 16 kafelków · po 8",
      renewal: renews(40),
    },
  ]);
  assert.deepEqual(resourceLines(forestDeep)[0], {
    id: "stick",
    name: "patyk",
    spread: "≈ 18 z 25 kafelków · po 12",
    renewal: renews(30),
  });
  assert.deepEqual(resourceLines({ ...forest, resources: [] }), []);
});

// D-327: a resource that does not renew says „nie odnawia się” apart, in warning, in place of the
// renewal. Catches a „+1 co” given to such a resource, and the words left in the text instead of
// standing apart.
test("a resource that does not renew says so apart, in warning, in place of its renewal", () => {
  // decision: D-18 "The game's content — game maps, items, creatures, character skills and their numbers — stands in data files"
  // decision: D-327 "The card of a map follows the card of the predecessor game"
  const map = {
    ...forest,
    resources: [{ id: "moss", density: 0.4, stock: 6 }],
  };
  assert.deepEqual(resourceLines(map), [
    {
      id: "moss",
      name: "mech",
      spread: "≈ 6 z 16 kafelków · po 6",
      renewal: { text: "nie odnawia się", warning: true },
    },
  ]);
});

// D-327, D-142: the wolf's name, health and blow; its chance per minute, its cooldown and its mean
// gap: 180 + 1 / 0.01 = 280 minutes. Catches a wrong creature field, a cooldown or gap left out,
// and a mean gap that counts the chance alone.
test("an attacker gives its icon, name, health and blow, and its chance, quiet time and mean gap", () => {
  // decision: D-327 "The card of a map follows the card of the predecessor game"
  // decision: D-327 "It departs from the card of the predecessor game in four things only"
  // decision: D-333 "The minutes without fire are the game minutes that a body"
  assert.deepEqual(attackerLines(forestDeep), [
    {
      icon: "wolf-head",
      head: "wilk · 24 zdrowia · cios 7",
      odds: "1 % szansy na minutę, 180 min spokoju od wejścia i po każdej walce — średnio co ≈ 280 min",
    },
  ]);
  assert.deepEqual(attackerLines(forest), []);
});

// D-327: the chance in Polish notation with at most one decimal (1.5 % with a comma, 0.0123 becomes
// 1,2 %); the mean gap rounds to whole minutes: 180 + 1 / 0.015 = 246.67 gives 247, and
// 180 + 1 / 0.0123 = 261.30 gives 261. Catches a point for the comma, a second decimal, and a gap
// left unrounded.
test("the chance is written with a decimal comma and at most one decimal, and the mean gap rounds", () => {
  // decision: D-18 "The game's content — game maps, items, creatures, character skills and their numbers — stands in data files"
  // decision: D-333 "The minutes without fire are the game minutes that a body"
  const wolfAt = (chancePerMinute) => ({
    ...forestDeep,
    attackers: [{ id: "wolf", chancePerMinute, cooldownMinutes: 180 }],
  });
  assert.equal(
    attackerLines(wolfAt(0.015))[0].odds,
    "1,5 % szansy na minutę, 180 min spokoju od wejścia i po każdej walce — średnio co ≈ 247 min",
  );
  assert.equal(
    attackerLines(wolfAt(0.0123))[0].odds,
    "1,2 % szansy na minutę, 180 min spokoju od wejścia i po każdej walce — średnio co ≈ 261 min",
  );
});

// D-327: both caps stand apart, each in warning; a zero cap counts as a cap, and a map with no cap
// gives no line. Catches a zero cap dropped as if unset, a cap line without its warning role, and a
// map without caps getting a line.
test("the entry and exit caps stand apart, each in warning; a zero cap counts; no cap gives no line", () => {
  // decision: D-18 "The game's content — game maps, items, creatures, character skills and their numbers — stands in data files"
  // decision: D-327 "The card of a map follows the card of the predecessor game"
  // decision: D-327 "It departs from the card of the predecessor game in four things only"
  assert.deepEqual(capLines(forest), []);
  assert.deepEqual(capLines({ ...forest, carryIn: 0, carryOut: 12 }), [
    { text: "wnosisz najwyżej 0", warning: true },
    { text: "wynosisz najwyżej 12", warning: true },
  ]);
  assert.deepEqual(capLines({ ...forest, carryOut: 7 }), [
    { text: "wynosisz najwyżej 7", warning: true },
  ]);
});
