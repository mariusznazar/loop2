// Review probe (not committed): the load's check of an earning loop's counts at the trust boundary.
// Argument 1: the worktree root whose dist/ and tests/ are used; argument 2: the output file.
import { writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const root = process.argv[2];
const outPath = process.argv[3];
const at = (path) => pathToFileURL(`${root}/${path}`).href;
const { createCharacter, withSaveTime } = await import(at("dist/browser/sim/game.js"));
const { editProgram } = await import(at("dist/browser/sim/programs.js"));
const { startLoop, catchUp } = await import(at("dist/browser/sim/loop.js"));
const { loadSavedGame, savedGame } = await import(at("dist/browser/sim/saved-game.js"));
const { REFERENCE_PROGRAMS } = await import(at("tests/sim/reference-programs.mjs"));
const { newKnowingGame } = await import(at("tests/sim/understanding-fixture.mjs"));

const T0 = 1_760_000_000_000;
const MIN = 60_000;
const out = [];
const log = (line) => out.push(line);

// Game-made states: a loop on each program and map, caught up over growing spans, saved and loaded.
let made = 0;
let madeRefused = 0;
const seenCounts = new Set();
for (const name of Object.keys(REFERENCE_PROGRAMS)) {
  for (const mapId of ["forestEdge", "forest"]) {
    let state = createCharacter(newKnowingGame(), "Ala").state;
    state = editProgram(state, 1, REFERENCE_PROGRAMS[name]).state;
    state = { ...state, solvedMaps: ["forestEdge", "forest"] };
    let started;
    try {
      started = startLoop(state, { mapId, characterId: 1, programId: 1 }, T0).state;
    } catch (error) {
      log(`skip ${name} ${mapId}: ${error.message}`);
      continue;
    }
    for (const hours of [0, 1, 3, 8, 24, 72]) {
      const after = catchUp(withSaveTime(started, T0), T0 + hours * 60 * MIN).state;
      const loop = after.loops[1];
      if (loop === undefined) continue;
      seenCounts.add(`${loop.inARow}/${loop.loopRecord}/${loop.completed}`);
      const doc = JSON.parse(JSON.stringify(savedGame(withSaveTime(after, T0 + hours * 60 * MIN))));
      const loaded = loadSavedGame(doc);
      made += 1;
      if (!loaded.ok) {
        madeRefused += 1;
        log(`REFUSED game-made ${name} ${mapId} ${hours}h: ${JSON.stringify(loaded)} counts ${loop.inARow}/${loop.loopRecord}/${loop.completed}`);
      }
    }
  }
}
log(`game-made documents: ${made}, refused: ${madeRefused}`);
log(`counts seen (inARow/loopRecord/completed): ${[...seenCounts].join(" ")}`);

// Crafted documents: one game-made document with a loop, its counts changed.
let state = createCharacter(newKnowingGame(), "Ala").state;
state = editProgram(state, 1, REFERENCE_PROGRAMS.forestDecent ?? Object.values(REFERENCE_PROGRAMS)[0]).state;
state = { ...state, solvedMaps: ["forestEdge", "forest"] };
state = startLoop(state, { mapId: "forestEdge", characterId: 1, programId: 1 }, T0).state;
state = catchUp(withSaveTime(state, T0), T0 + 8 * 60 * MIN).state;
const base = JSON.parse(JSON.stringify(savedGame(withSaveTime(state, T0 + 8 * 60 * MIN))));
const l = base.game.loops["1"];
log(`base loop: runNumber ${l.runNumber} completed ${l.completed} inARow ${l.inARow} loopRecord ${l.loopRecord}; loads ${loadSavedGame(JSON.parse(JSON.stringify(base))).ok}`);
const crafted = [
  ["record = completed + 1", { loopRecord: l.completed + 1, inARow: 0 }],
  ["record and inARow = completed + 1", { loopRecord: l.completed + 1, inARow: l.completed + 1 }],
  ["record huge, completed same", { loopRecord: 1e15, inARow: 1e15 }],
  ["record 2^53-1", { loopRecord: Number.MAX_SAFE_INTEGER, inARow: 0 }],
  ["completed 0 runNumber 1 record 1", { runNumber: 1, completed: 0, loopRecord: 1, inARow: 0 }],
  ["completed 0 runNumber 1 record 0 inARow 1", { runNumber: 1, completed: 0, loopRecord: 0, inARow: 1 }],
  ["record -0 completed 0", { runNumber: 1, completed: 0, loopRecord: -0, inARow: 0 }],
  ["record NaN-like string", { loopRecord: "1" }],
  ["record null", { loopRecord: null }],
  ["record 1.5", { loopRecord: 1.5 }],
  ["record Infinity via 1e400", "INF"],
  ["record = completed (admitted)", { loopRecord: l.completed, inARow: l.completed }],
  ["all zero runNumber 1 (admitted)", { runNumber: 1, completed: 0, loopRecord: 0, inARow: 0 }],
  ["completed large, record large below (admitted)", { runNumber: 1000, completed: 999, loopRecord: 999, inARow: 5 }],
];
for (const [what, change] of crafted) {
  let text;
  if (change === "INF") {
    text = JSON.stringify(base).replace(`"loopRecord":${l.loopRecord}`, '"loopRecord":1e400');
  } else {
    const doc = JSON.parse(JSON.stringify(base));
    Object.assign(doc.game.loops["1"], change);
    text = JSON.stringify(doc);
  }
  let result;
  try {
    const parsed = JSON.parse(text);
    const before = JSON.stringify(parsed);
    const loaded = loadSavedGame(parsed);
    const unchanged = JSON.stringify(parsed) === before;
    result = `${loaded.ok ? "ok" : `refused ${loaded.reason ?? JSON.stringify(loaded)}`}${unchanged ? "" : " (INPUT CHANGED)"}`;
  } catch (error) {
    result = `THREW ${error.constructor.name}: ${error.message}`;
  }
  log(`crafted ${what}: ${result}`);
}
writeFileSync(outPath, `${out.join("\n")}\n`);
console.log(`done ${out.length} lines`);
