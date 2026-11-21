// Review probe (not committed): hostile saved documents of version 9 against the load at the head.
import { writeFileSync } from "node:fs";
import { createCharacter, withSaveTime } from "./dist/browser/sim/game.js";
import { createProgram } from "./dist/browser/sim/programs.js";
import { judgeAndRemember } from "./dist/browser/sim/judging.js";
import { startLoop } from "./dist/browser/sim/loop.js";
import { loadSavedGame, savedGame } from "./dist/browser/sim/saved-game.js";
import {
  newKnowingGame,
  withEdgeSolved,
} from "./tests/sim/understanding-fixture.mjs";

const NOW = 1760000000000;
let state = withEdgeSolved(newKnowingGame());
state = createCharacter(state, "Ola").state;
state = createCharacter(state, "Ula").state;
state = createProgram(state).state;
const ids = state.team.characters.map((c) => c.id);
const programs = state.programs.map((p) => p.id);
for (const characterId of ids)
  for (const programId of programs)
    for (const mapId of ["forestEdge", "forest"])
      state = judgeAndRemember(state, { mapId, characterId, programId }).state;
state = startLoop(
  state,
  { mapId: "forestEdge", characterId: ids[0], programId: programs[0] },
  NOW,
).state;
const base = JSON.parse(JSON.stringify(savedGame(withSaveTime(state, NOW))));
const out = [];
const log = (line) => out.push(line);
const first = loadSavedGame(JSON.parse(JSON.stringify(base)));
log(`own save: ${first.ok}`);
const c = String(ids[0]);
const p = String(programs[0]);
const cases = {
  "judgings missing": (d) => delete d.game.judgings,
  "judgings null": (d) => (d.game.judgings = null),
  "judgings array": (d) => (d.game.judgings = []),
  "character 99": (d) => (d.game.judgings["99"] = {}),
  "character key 01": (d) => (d.game.judgings["01"] = {}),
  "character key -1": (d) => (d.game.judgings["-1"] = {}),
  "character __proto__": (d) =>
    (d.game.judgings = JSON.parse(`{"__proto__":{}}`)),
  "program 99": (d) => (d.game.judgings[c]["99"] = {}),
  "program 1.5": (d) => (d.game.judgings[c]["1.5"] = {}),
  "program __proto__ key": (d) =>
    (d.game.judgings[c] = JSON.parse(`{"__proto__":{}}`)),
  "map unknown": (d) =>
    (d.game.judgings[c][p].nowhere = d.game.judgings[c][p].forest),
  "map constructor": (d) =>
    (d.game.judgings[c][p].constructor = d.game.judgings[c][p].forest),
  "map __proto__": (d) => {
    const j = d.game.judgings[c][p].forest;
    d.game.judgings[c][p] = JSON.parse(
      `{"__proto__":${JSON.stringify(j)}}`,
    );
  },
  "11 results": (d) => d.game.judgings[c][p].forest.results.pop(),
  "13 results": (d) => d.game.judgings[c][p].forest.results.push("solved"),
  "result object with cause": (d) =>
    (d.game.judgings[c][p].forest.results[0] = {
      kind: "death",
      cause: "cold",
      minute: 3,
    }),
  "result unknown kind": (d) =>
    (d.game.judgings[c][p].forest.results[0] = "won"),
  "result toString": (d) =>
    (d.game.judgings[c][p].forest.results[0] = "toString"),
  "result number": (d) => (d.game.judgings[c][p].forest.results[0] = 1),
  "results string": (d) =>
    (d.game.judgings[c][p].forest.results = "ssssssssssss"),
  "foreign key in judging": (d) => (d.game.judgings[c][p].forest.extra = 1),
  "equipment missing": (d) => delete d.game.judgings[c][p].forest.equipment,
  "equipment unknown item": (d) =>
    (d.game.judgings[c][p].forest.equipment = [{ item: "gold", count: 1 }]),
  "equipment count 0": (d) =>
    (d.game.judgings[c][p].forest.equipment = [{ item: "stick", count: 0 }]),
  "equipment count -1": (d) =>
    (d.game.judgings[c][p].forest.equipment = [{ item: "stick", count: -1 }]),
  "equipment count 1.5": (d) =>
    (d.game.judgings[c][p].forest.equipment = [
      { item: "stick", count: 1.5 },
    ]),
  "equipment count 2^53": (d) =>
    (d.game.judgings[c][p].forest.equipment = [
      { item: "stick", count: 2 ** 53 },
    ]),
  "equipment count string": (d) =>
    (d.game.judgings[c][p].forest.equipment = [
      { item: "stick", count: "3" },
    ]),
  "equipment item twice": (d) =>
    (d.game.judgings[c][p].forest.equipment = [
      { item: "stick", count: 1 },
      { item: "stick", count: 2 },
    ]),
  "equipment huge safe count (loads?)": (d) =>
    (d.game.judgings[c][p].forest.equipment = [
      { item: "stick", count: 9007199254740991 },
    ]),
  "loop inARow above record": (d) => {
    d.game.loops[c].inARow = 2;
    d.game.loops[c].loopRecord = 1;
  },
  "loop record negative": (d) => (d.game.loops[c].loopRecord = -1),
  "loop record 1.5": (d) => (d.game.loops[c].loopRecord = 1.5),
  "loop record string": (d) => (d.game.loops[c].loopRecord = "1"),
  "loop record 1e308": (d) => (d.game.loops[c].loopRecord = 1e308),
  "loop record missing": (d) => delete d.game.loops[c].loopRecord,
  "loop foreign key": (d) => (d.game.loops[c].record = 0),
  "loop record above completed (loads?)": (d) => {
    d.game.loops[c].loopRecord = 999;
    d.game.loops[c].inARow = 999;
  },
};
for (const [name, change] of Object.entries(cases)) {
  const document = JSON.parse(JSON.stringify(base));
  change(document);
  const before = JSON.stringify(document);
  let result;
  try {
    const loaded = loadSavedGame(document);
    result = loaded.ok ? "loaded" : `refused ${loaded.reason}`;
  } catch (error) {
    result = `THREW ${error?.name}`;
  }
  const unchanged = JSON.stringify(document) === before;
  log(`${name}: ${result}${unchanged ? "" : " DOCUMENT CHANGED"}`);
}
writeFileSync(process.argv[2], out.join("\n") + "\n", "utf8");
console.log(`cases ${Object.keys(cases).length}`);
