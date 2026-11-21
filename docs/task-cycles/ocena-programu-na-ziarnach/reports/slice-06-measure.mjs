// Measures the length of the saved game state when a judging is remembered for every triple of
// character, program and map, against the limit of the server's save route (64 KiB, D-104, D-207).
// Run from the root of the worktree after `npm run build` or any `npm test -- <file>`:
//   node .runs/executor-6/measure.mjs
// The length is that the route measures: the bytes of the JSON text of the game, not of the version.
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const load = (path) => import(pathToFileURL(resolve(path)).href);
const { createCharacter, newGame, withSaveTime } = await load(
  "dist/browser/sim/game.js",
);
const { createProgram, editProgram } = await load(
  "dist/browser/sim/programs.js",
);
const { loadSavedGame, savedGame } = await load(
  "dist/browser/sim/saved-game.js",
);
const { MAPS } = await load("dist/browser/sim/data/maps.js");
const { BALANCE } = await load("dist/browser/sim/data/balance.js");
const { newKnowingGame } = await load("tests/sim/understanding-fixture.mjs");
const { programFromRules } = await load("tests/sim/program-fixture.mjs");

const LIMIT = 64 * 1024;
const NOW = 1760000000000;
const SEEDS = BALANCE.judgingSeeds.length;
const REAL_MAPS = Object.keys(MAPS);

/** The bytes of the game of a state's saved document, as the save route counts them. */
function bytesOf(state) {
  const document = savedGame(withSaveTime(state, NOW));
  return Buffer.byteLength(JSON.stringify(document.game), "utf8");
}

/** A program of `rules` rules that all explore: a program of an ordinary size, not the empty one. */
function programOf(rules) {
  return programFromRules(
    ...Array.from({ length: rules }, () => ({
      condition: { kind: "always" },
      action: { kind: "explore" },
    })),
  );
}

/** A knowing game with `characters` characters and `programs` programs of `rules` rules each. */
function base(characters, programs, rules) {
  let state = newKnowingGame();
  for (let index = 0; index < characters; index += 1)
    state = createCharacter(state, `Postac${index + 1}`).state;
  for (let index = 1; index < programs; index += 1)
    state = createProgram(state).state;
  if (rules > 0)
    for (const saved of state.programs)
      state = editProgram(state, saved.id, programOf(rules)).state;
  return { ...state, solvedMaps: REAL_MAPS };
}

/** Twelve results of one kind, or of the three kinds mixed. */
const RESULTS = {
  "mixed kinds": Array.from({ length: SEEDS }, (_, index) =>
    ["solved", "death", "undecided"][index % 3],
  ),
  "all undecided, the longest word": Array.from(
    { length: SEEDS },
    () => "undecided",
  ),
};

/** Two entries, as a take list of a program usually has, and all four items of the data with two digits. */
const EQUIPMENT = {
  "a take list of 2 items": [
    { item: "stick", count: 4 },
    { item: "berry", count: 2 },
  ],
  "a take list of all 4 items with 2-digit counts": [
    { item: "stick", count: 15 },
    { item: "berry", count: 15 },
    { item: "moss", count: 15 },
    { item: "fiber", count: 15 },
  ],
};

/** `state` with a judging of `results` and `equipment` for every character, program and map key given. */
function judged(state, mapKeys, results, equipment) {
  const judgings = {};
  for (const character of state.team.characters) {
    judgings[character.id] = {};
    for (const saved of state.programs) {
      judgings[character.id][saved.id] = {};
      for (const map of mapKeys)
        judgings[character.id][saved.id][map] = {
          results: [...results],
          equipment: equipment.map((entry) => ({ ...entry })),
        };
    }
  }
  return { ...state, judgings };
}

/** Synthetic map keys as long as the longest real one, so that the length of the key counts as it will. */
function syntheticMaps(count) {
  const width = Math.max(...REAL_MAPS.map((key) => key.length));
  return Array.from(
    { length: count },
    (_, index) => `map${String(index).padStart(width - 3, "0")}`,
  );
}

const lines = [];
const say = (text) => lines.push(text);
say(`data: ${REAL_MAPS.length} maps (${REAL_MAPS.join(", ")}), ${SEEDS} seeds per judging`);
say(`limit: ${LIMIT} bytes`);

// 1. The bytes of one remembered judging, inside the record: the same state with one more judging.
{
  const state = base(1, 1, 0);
  const empty = bytesOf(state);
  for (const [resultsName, results] of Object.entries(RESULTS))
    for (const [equipmentName, equipment] of Object.entries(EQUIPMENT)) {
      const one = judged(state, [REAL_MAPS[1]], results, equipment);
      const bytes = bytesOf(one) - empty;
      say(
        `one judging (${resultsName}; ${equipmentName}) inside its character, program and map keys: ${bytes} bytes`,
      );
    }
}

// 2. Totals for 5 characters and 20 programs: on the 3 maps of the data (loaded back), and on 10 maps
//    (measured with synthetic keys of the longest key's length, which the load would refuse).
for (const [programName, rules] of [
  ["20 empty programs", 0],
  ["20 programs of 10 rules", 10],
]) {
  const state = base(5, 20, rules);
  const without = bytesOf(state);
  say(`${programName}, 5 characters, no judging remembered: ${without} bytes`);
  for (const [resultsName, results] of Object.entries(RESULTS))
    for (const [equipmentName, equipment] of Object.entries(EQUIPMENT)) {
      for (const [mapsName, keys, loadable] of [
        [`${REAL_MAPS.length} maps`, REAL_MAPS, true],
        ["10 maps (synthetic keys)", syntheticMaps(10), false],
      ]) {
        const full = judged(state, keys, results, equipment);
        const total = bytesOf(full);
        let loaded = "not loaded: the load takes only the data's maps";
        if (loadable) {
          const document = JSON.parse(
            JSON.stringify(savedGame(withSaveTime(full, NOW))),
          );
          loaded = loadSavedGame(document).ok
            ? "loads back"
            : "REFUSED by the load";
        }
        const triples = 5 * 20 * keys.length;
        say(
          `${programName}, ${mapsName}, ${triples} judgings (${resultsName}; ${equipmentName}): ${total} bytes = ${((100 * total) / LIMIT).toFixed(1)}% of the limit, judgings ${total - without} bytes (${loaded})`,
        );
      }
    }
}

// 3. How many judgings fit before the limit: the room left by the state without judgings, divided by
//    the bytes one judging adds inside a record that already holds its character and program keys.
for (const [programName, rules] of [
  ["20 empty programs", 0],
  ["20 programs of 10 rules", 10],
]) {
  const state = base(5, 20, rules);
  const without = bytesOf(state);
  for (const [resultsName, results] of Object.entries(RESULTS))
    for (const [equipmentName, equipment] of Object.entries(EQUIPMENT)) {
      const full = judged(state, REAL_MAPS, results, equipment);
      const each = (bytesOf(full) - without) / (5 * 20 * REAL_MAPS.length);
      say(
        `room: ${programName}, 5 characters (${resultsName}; ${equipmentName}): ${each.toFixed(1)} bytes a judging, ${Math.floor((LIMIT - without) / each)} judgings fit of ${5 * 20 * REAL_MAPS.length}`,
      );
    }
}

console.log(lines.join("\n"));
