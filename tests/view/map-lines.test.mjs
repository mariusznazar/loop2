// The map lines' pure functions, tested without a browser. Importing the module must not touch
// the DOM.
import assert from "node:assert/strict";
import { test } from "node:test";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import {
  attackerLines,
  cardHeading,
  capLines,
  resourceLines,
  sendMaps,
  solvingSentence,
  terrainLines,
} from "../../dist/browser/view/map-lines.js";

// The made-up cases below change one field of Las or Las — głębiej, so each case names the field.
const { forest, forestDeep } = MAPS;

test("importing the map lines touches no DOM: Node has no document and the import succeeded", () => {
  assert.equal(typeof globalThis.document, "undefined");
  assert.equal(typeof sendMaps, "function");
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

// D-327: the heading names the map, says „rozwiązana” once it is solved, and says „odsłania ją”
// with the opener's name from the data at a map another map opens. Catches a heading that drops the
// solved mark or the opener, or takes the opener's name from the wrong map.
test("the heading names the map, with the solved mark and the opener's name from the data", () => {
  assert.deepEqual(cardHeading(forest, false), {
    name: "Las",
    solved: null,
    openedBy: null,
  });
  assert.deepEqual(cardHeading(forest, true), {
    name: "Las",
    solved: "rozwiązana",
    openedBy: null,
  });
  assert.deepEqual(cardHeading(forestDeep, false), {
    name: "Las — głębiej",
    solved: null,
    openedBy: "odsłania ją Las",
  });
  assert.deepEqual(cardHeading(forestDeep, true), {
    name: "Las — głębiej",
    solved: "rozwiązana",
    openedBy: "odsłania ją Las",
  });
});

// D-327: the grid, the entrance, the step and the minutes without fire with the temperature.
// Catches a grid with its sides swapped, the entrance word the wrong way round, a note on the step
// the data gives, and a minutes-without-fire line where the map does not cool the body.
test("the terrain lines give the grid, the entrance, the step and the minutes without fire", () => {
  assert.deepEqual(terrainLines(forest), [
    "siatka 4 × 4",
    "wejście stałe",
    "krok 5 min",
    "bez ognia 83 min — otoczenie 25 °C",
  ]);
  assert.deepEqual(terrainLines(forestDeep), [
    "siatka 5 × 5",
    "wejście losowe",
    "krok 5 min",
    "bez ognia 33 min — otoczenie 7 °C",
  ]);
});

// D-327: a step above the usual one (5 minutes, the step most maps of the data give) costs more, one
// below it costs less. At 37 °C the body never cools below the chill threshold, so the minutes
// without fire are left out. Catches a note on the usual step, a note with the wrong direction, and a
// minutes line for a map that does not cool the body.
test("a step above the usual costs more, one below costs less, and a map that does not cool leaves the minutes out", () => {
  assert.deepEqual(terrainLines({ ...forest, stepMinutes: 9 }), [
    "siatka 4 × 4",
    "wejście stałe",
    "krok 9 min — drożej niż zwykle",
    "bez ognia 83 min — otoczenie 25 °C",
  ]);
  assert.deepEqual(terrainLines({ ...forest, stepMinutes: 2 }), [
    "siatka 4 × 4",
    "wejście stałe",
    "krok 2 min — taniej niż zwykle",
    "bez ognia 83 min — otoczenie 25 °C",
  ]);
  assert.deepEqual(terrainLines({ ...forest, ambientTemperature: 37 }), [
    "siatka 4 × 4",
    "wejście stałe",
    "krok 5 min",
  ]);
});

// D-327: each resource with its name, the tiles that hold it (density times the tiles, rounded to the
// nearest whole: 0.7 × 16 = 11.2, 0.4 × 16 = 6.4, 0.7 × 25 = 17.5), its stock and its renewal.
// Catches a floored count, a renewal given the wrong minutes, and a resource whose line is missing.
test("each resource gives its name, the tiles that hold it, its stock and its renewal", () => {
  assert.deepEqual(resourceLines(forest), [
    {
      id: "stick",
      text: "patyk — ≈ 11 z 16 kafelków, po 12",
      renewal: { text: "+1 co 30 min", warning: false },
    },
    {
      id: "berry",
      text: "jagoda — ≈ 8 z 16 kafelków, po 8",
      renewal: { text: "+1 co 40 min", warning: false },
    },
    {
      id: "moss",
      text: "mech — ≈ 6 z 16 kafelków, po 6",
      renewal: { text: "+1 co 60 min", warning: false },
    },
    {
      id: "fiber",
      text: "włókno — ≈ 6 z 16 kafelków, po 6",
      renewal: { text: "+1 co 60 min", warning: false },
    },
  ]);
  assert.deepEqual(resourceLines(forestDeep)[0], {
    id: "stick",
    text: "patyk — ≈ 18 z 25 kafelków, po 12",
    renewal: { text: "+1 co 30 min", warning: false },
  });
  assert.deepEqual(resourceLines({ ...forest, resources: [] }), []);
});

// D-327: a resource that does not renew says „nie odnawia się” apart, in warning, in place of the
// renewal. Catches a „+1 co” given to such a resource, and the words left in the text instead of
// standing apart.
test("a resource that does not renew says so apart, in warning, in place of its renewal", () => {
  const map = {
    ...forest,
    resources: [{ id: "moss", density: 0.4, stock: 6 }],
  };
  assert.deepEqual(resourceLines(map), [
    {
      id: "moss",
      text: "mech — ≈ 6 z 16 kafelków, po 6",
      renewal: { text: "nie odnawia się", warning: true },
    },
  ]);
});

// D-327, D-142: the wolf's name, health and blow; its chance per minute, its cooldown and its mean
// gap: 180 + 1 / 0.01 = 280 minutes. Catches a wrong creature field, a cooldown or gap left out,
// and a mean gap that counts the chance alone.
test("an attacker gives its name, health and blow, and its chance, quiet time and mean gap", () => {
  assert.deepEqual(attackerLines(forestDeep), [
    {
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
  assert.deepEqual(capLines(forest), []);
  assert.deepEqual(capLines({ ...forest, carryIn: 0, carryOut: 12 }), [
    { text: "wnosisz najwyżej 0", warning: true },
    { text: "wynosisz najwyżej 12", warning: true },
  ]);
  assert.deepEqual(capLines({ ...forest, carryOut: 7 }), [
    { text: "wynosisz najwyżej 7", warning: true },
  ]);
});
