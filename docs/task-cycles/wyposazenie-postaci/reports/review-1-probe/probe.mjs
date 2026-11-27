// Probe of the strict reading of the gear at the trust boundary: each hostile input must be
// refused whole as shape and throw nothing; the sound base must load.
import { createCharacter, send } from "../../dist/browser/sim/game.js";
import { loadSavedGame, savedGame } from "../../dist/browser/sim/saved-game.js";
import { newKnowingGame } from "../../tests/sim/understanding-fixture.mjs";

const base = savedGame(createCharacter(newKnowingGame(), "Ala").state);
const sent = savedGame(
  send(
    createCharacter(newKnowingGame(), "Ala").state,
    { mapId: "forestEdge", characterId: 1 },
    1760000000000,
  ).state,
);

const cases = {
  "base loads": [base, (d) => d, true],
  "base with a run loads": [sent, (d) => d, true],
  "changed slot __proto__ (no loop)": [base, (d) => (d.game.team.characters[0].changedSlots = ["__proto__"]), false],
  "changed slot constructor": [base, (d) => (d.game.team.characters[0].changedSlots = ["constructor"]), false],
  "gear with a getter": [base, (d) => Object.defineProperty(d.game.team.characters[0].gear, "head", { get: () => null, enumerable: true }), false],
  "gear with a symbol key": [base, (d) => (d.game.team.characters[0].gear[Symbol("x")] = null), false],
  "gear of null prototype, sound": [base, (d) => (d.game.team.characters[0].gear = Object.assign(Object.create(null), d.game.team.characters[0].gear)), true],
  "gear as a Map": [base, (d) => (d.game.team.characters[0].gear = new Map()), false],
  "item undefined in a slot": [base, (d) => (d.game.team.characters[0].gear.legs = undefined), false],
  "item hasOwnProperty": [base, (d) => (d.game.team.characters[0].gear.mainHand = "hasOwnProperty"), false],
  "stick in pocket of the run": [sent, (d) => (d.game.run.character.gear.pocket2 = "stick"), false],
  "count as a bigint": [base, (d) => (d.game.team.characters[0].gearChanges = 1n), false],
  "count as -1e-9": [base, (d) => (d.game.team.characters[0].gearChanges = -1e-9), false],
  "changed slots with a hole": [base, (d) => (d.game.team.characters[0].changedSlots = [, "head"]), false],
  "run character with gear missing": [sent, (d) => delete d.game.run.character.gear, false],
};

const lines = [];
let failures = 0;
for (const [name, [doc, change, loads]] of Object.entries(cases)) {
  const document = structuredClone(doc);
  // A save stamps its moment, as the tests' withSaveTime does; a new game holds none yet.
  document.game.saveTimeMs = 0;
  try {
    change(document);
  } catch {
    // structuredClone cannot hold some values; the change is made on the clone itself
  }
  let result;
  try {
    result = loadSavedGame(document);
  } catch (error) {
    failures += 1;
    lines.push(`THROW ${name}: ${error && error.name}`);
    continue;
  }
  const ok = loads ? result.ok === true : result.ok === false && result.reason === "shape";
  if (!ok) failures += 1;
  lines.push(`${ok ? "ok" : "FAIL"} ${name}: ${JSON.stringify(result.ok ? "loaded" : result.reason)}`);
}
lines.push(`failures ${failures}`);
console.log(lines.join("\n"));
