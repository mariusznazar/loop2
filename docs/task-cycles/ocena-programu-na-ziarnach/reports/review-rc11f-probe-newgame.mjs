// Review probe rc11f: what newGame does with each moment, and whether an admitted one saves and
// loads back. Run from .runs/review-rc11f: node probe-newgame.mjs
import { createCharacter, newGame, withSaveTime } from "./wt/dist/browser/sim/game.js";
import { loadSavedGame, savedGame } from "./wt/dist/browser/sim/saved-game.js";

const lines = [];
const show = (value) => (typeof value === "bigint" ? `${value}n` : Object.is(value, -0) ? "-0" : typeof value === "string" ? JSON.stringify(value) : String(value));

const cases = [
  ["(no argument)", undefined, true],
  ["0", 0, false],
  ["-0", -0, false],
  ["-5", -5, false],
  ["1760000000123", 1760000000123, false],
  ["MAX_SAFE_INTEGER", Number.MAX_SAFE_INTEGER, false],
  ["MIN_SAFE_INTEGER", Number.MIN_SAFE_INTEGER, false],
  ["1.5", 1.5, false],
  ["NaN", Number.NaN, false],
  ["Infinity", Number.POSITIVE_INFINITY, false],
  ["-Infinity", Number.NEGATIVE_INFINITY, false],
  ["2**53", 2 ** 53, false],
  ["-(2**53)", -(2 ** 53), false],
  ["1e21", 1e21, false],
  ['"5"', "5", false],
  ["null", null, false],
  ["true", true, false],
  ["{}", {}, false],
  ["[]", [], false],
  ["[5]", [5], false],
  ["5n", 5n, false],
  ["new Number(5)", new Number(5), false],
];

for (const [name, value, omit] of cases) {
  let state;
  try {
    state = omit ? newGame() : newGame(value);
  } catch (error) {
    lines.push(`newGame(${name}): threw ${error?.constructor?.name} "${error?.message}"`);
    continue;
  }
  const stored = state.madeAtMs;
  try {
    const saved = withSaveTime(createCharacter(state, "Ala").state, 1760000000999);
    const loaded = loadSavedGame(JSON.parse(JSON.stringify(savedGame(saved))));
    lines.push(
      `newGame(${name}): stored ${show(stored)}; save+load ${loaded.ok ? `ok, madeAtMs ${show(loaded.state.madeAtMs)}` : `refused ${loaded.reason}`}`,
    );
  } catch (error) {
    lines.push(`newGame(${name}): stored ${show(stored)}; save+load threw ${error?.constructor?.name}`);
  }
}

// Does the refusal leave nothing behind? newGame is pure; call twice and compare the default.
const a = newGame();
const b = newGame(0);
lines.push(`newGame() deepEqual newGame(0) by JSON: ${JSON.stringify(a) === JSON.stringify(b)}`);

console.log(lines.join("\n"));
