// Review probe of slice 6: crafted documents of version 9 against loadSavedGame.
// Run from the root of the review worktree after a build: node ../probe.mjs
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const load = (path) => import(pathToFileURL(resolve(path)).href);
const { createCharacter, withSaveTime } = await load("dist/browser/sim/game.js");
const { createProgram } = await load("dist/browser/sim/programs.js");
const { loadSavedGame, savedGame, SAVED_GAME_VERSION } = await load(
  "dist/browser/sim/saved-game.js",
);
const { judgeAndRemember } = await load("dist/browser/sim/judging.js");
const { startLoop } = await load("dist/browser/sim/loop.js");
const { newKnowingGame, withEdgeSolved } = await load(
  "tests/sim/understanding-fixture.mjs",
);

let state = withEdgeSolved(newKnowingGame());
state = createCharacter(state, "Ala").state;
state = createCharacter(state, "Ola").state;
state = createProgram(state).state;
const chars = state.team.characters.map((c) => c.id);
const progs = state.programs.map((p) => p.id);
state = judgeAndRemember(state, {
  mapId: "forestEdge",
  characterId: chars[0],
  programId: progs[0],
}).state;
state = judgeAndRemember(state, {
  mapId: "forest",
  characterId: chars[1],
  programId: progs[1],
}).state;
state = startLoop(
  state,
  { mapId: "forestEdge", characterId: chars[0], programId: progs[0] },
  0,
).state;
state = {
  ...state,
  loops: {
    ...state.loops,
    [chars[0]]: { ...state.loops[chars[0]], inARow: 1, loopRecord: 2 },
  },
};
const base = JSON.parse(JSON.stringify(savedGame(withSaveTime(state, 1760000000000))));
console.log(`version ${SAVED_GAME_VERSION}, document version ${base.version}`);
console.log(`chars ${chars}, programs ${progs}, loops ${Object.keys(base.game.loops)}`);
console.log(`judgings ${JSON.stringify(Object.keys(base.game.judgings))}`);
const sound = loadSavedGame(structuredClone(base));
console.log(`the game's own document loads: ${sound.ok}`);
if (!sound.ok) process.exit(1);
// The game's own save, with a revision as the server hands it back.
console.log(
  `as the server hands it back: ${loadSavedGame({ ...structuredClone(base), revision: 4 }).ok}`,
);

const [c1, c2] = chars.map(String);
const [p1, p2] = progs.map(String);
const loop = (d) => d.game.loops[c1];
const jud = (d) => d.game.judgings[c1][p1].forestEdge;
const nested = (depth) => {
  let v = "solved";
  for (let i = 0; i < depth; i += 1) v = [v];
  return v;
};
const cases = {
  "inARow text": (d) => (loop(d).inARow = "1"),
  "inARow 1.5": (d) => (loop(d).inARow = 1.5),
  "inARow -1": (d) => (loop(d).inARow = -1),
  "inARow -0": (d) => (loop(d).inARow = -0),
  "inARow NaN": (d) => (loop(d).inARow = NaN),
  "inARow Infinity": (d) => (loop(d).inARow = Infinity),
  "inARow true": (d) => (loop(d).inARow = true),
  "inARow []": (d) => (loop(d).inARow = []),
  "inARow {}": (d) => (loop(d).inARow = {}),
  "inARow 1e308 and record 1e308": (d) => {
    loop(d).inARow = 1e308;
    loop(d).loopRecord = 1e308;
  },
  "inARow 2**53 and record 2**53": (d) => {
    loop(d).inARow = 2 ** 53;
    loop(d).loopRecord = 2 ** 53;
  },
  "inARow above record": (d) => (loop(d).inARow = 3),
  "record BigInt": (d) => (loop(d).loopRecord = 2n),
  "record Number object": (d) => (loop(d).loopRecord = new Number(2)),
  "inARow missing": (d) => delete loop(d).inARow,
  "loopRecord missing": (d) => delete loop(d).loopRecord,
  "foreign key on loop": (d) => (loop(d).inARowMax = 2),
  "inARow inherited only": (d) => {
    const l = loop(d);
    const proto = { inARow: 1 };
    delete l.inARow;
    d.game.loops[c1] = Object.assign(Object.create(proto), l);
  },
  "judgings __proto__ at character": (d) =>
    (d.game.judgings = JSON.parse(`{"__proto__":${JSON.stringify(d.game.judgings[c1])}}`)),
  "judgings __proto__ at program": (d) =>
    (d.game.judgings[c1] = JSON.parse(`{"__proto__":${JSON.stringify(d.game.judgings[c1][p1])}}`)),
  "judgings __proto__ at map": (d) =>
    (d.game.judgings[c1][p1] = JSON.parse(`{"__proto__":${JSON.stringify(jud(d))}}`)),
  "map key constructor": (d) => (d.game.judgings[c1][p1].constructor = jud(d)),
  "map key toString": (d) => (d.game.judgings[c1][p1].toString = jud(d)),
  "program key toString": (d) =>
    (d.game.judgings[c1].toString = d.game.judgings[c1][p1]),
  "character key 1.0": (d) => (d.game.judgings[`${c1}.0`] = d.game.judgings[c1]),
  "character key ' 1'": (d) => (d.game.judgings[` ${c1}`] = d.game.judgings[c1]),
  "character key -1": (d) => (d.game.judgings["-1"] = d.game.judgings[c1]),
  "character key 0": (d) => (d.game.judgings["0"] = d.game.judgings[c1]),
  "character key 1e0": (d) => (d.game.judgings["1e0"] = d.game.judgings[c1]),
  "character key 99": (d) => (d.game.judgings["99"] = d.game.judgings[c1]),
  "program key 99": (d) => (d.game.judgings[c1]["99"] = d.game.judgings[c1][p1]),
  "program key nextProgramId": (d) =>
    (d.game.judgings[c1][String(d.game.nextProgramId)] = d.game.judgings[c1][p1]),
  "program key 0": (d) => (d.game.judgings[c1]["0"] = d.game.judgings[c1][p1]),
  "program key 01": (d) => (d.game.judgings[c1][`0${p1}`] = d.game.judgings[c1][p1]),
  "map key desert": (d) => (d.game.judgings[c1][p1].desert = jud(d)),
  "map key FORESTEDGE": (d) => (d.game.judgings[c1][p1].FORESTEDGE = jud(d)),
  "results 0": (d) => (jud(d).results = []),
  "results 11": (d) => jud(d).results.pop(),
  "results 13": (d) => jud(d).results.push("solved"),
  "results 1000": (d) => (jud(d).results = Array(1000).fill("solved")),
  "results sparse 12": (d) => {
    const r = Array(12);
    for (let i = 0; i < 11; i += 1) r[i] = "solved";
    jud(d).results = r;
  },
  "results object length 12": (d) =>
    (jud(d).results = Object.fromEntries(Array.from({ length: 12 }, (_, i) => [i, "solved"]).concat(a note of the author))),
  "results string": (d) => (jud(d).results = "solvedsolved"),
  "results null": (d) => (jud(d).results = null),
  "result SOLVED": (d) => (jud(d).results[0] = "SOLVED"),
  "result null": (d) => (jud(d).results[0] = null),
  "result undefined": (d) => (jud(d).results[0] = undefined),
  "result __proto__": (d) => (jud(d).results[0] = "__proto__"),
  "result hasOwnProperty": (d) => (jud(d).results[0] = "hasOwnProperty"),
  "result nested deep": (d) => (jud(d).results[0] = nested(100000)),
  "results with extra own prop": (d) => (jud(d).results.extra = 1),
  "equipment null": (d) => (jud(d).equipment = null),
  "equipment entry without count": (d) => (jud(d).equipment = [{ item: "stick" }]),
  "equipment item __proto__": (d) => (jud(d).equipment = [{ item: "__proto__", count: 1 }]),
  "equipment item constructor": (d) => (jud(d).equipment = [{ item: "constructor", count: 1 }]),
  "equipment count -1": (d) => (jud(d).equipment = [{ item: "stick", count: -1 }]),
  "equipment count 1e21": (d) => (jud(d).equipment = [{ item: "stick", count: 1e21 }]),
  "equipment count NaN": (d) => (jud(d).equipment = [{ item: "stick", count: NaN }]),
  "equipment entry array": (d) => (jud(d).equipment = a note of the author),
  "equipment entry null": (d) => (jud(d).equipment = [null]),
  "equipment huge list": (d) =>
    (jud(d).equipment = Array.from({ length: 100000 }, () => ({ item: "stick", count: 1 }))),
  "judging with prototype key results": (d) => {
    const j = jud(d);
    const results = j.results;
    delete j.results;
    d.game.judgings[c1][p1].forestEdge = Object.assign(Object.create({ results }), j);
  },
  "judgings a Map": (d) => (d.game.judgings = new Map()),
  "judgings a class instance": (d) => (d.game.judgings = new (class {})()),
  "judgings a string": (d) => (d.game.judgings = "x"),
  "judgings level of a number": (d) => (d.game.judgings[c1] = 5),
  "judgings map level a list": (d) => (d.game.judgings[c1][p1] = []),
  "judgings missing": (d) => delete d.game.judgings,
  "judgings of a deleted char via key of c2 removed from team": (d) => {
    d.game.team.characters = d.game.team.characters.filter((c) => String(c.id) !== c2);
  },
};

let bad = 0;
for (const [name, change] of Object.entries(cases)) {
  const document = structuredClone(base);
  change(document);
  const before = (() => {
    try {
      return JSON.stringify(document);
    } catch {
      return null;
    }
  })();
  let result;
  try {
    result = loadSavedGame(document);
  } catch (error) {
    console.log(`THROW ${name}: ${error?.constructor?.name}`);
    bad += 1;
    continue;
  }
  const after = (() => {
    try {
      return JSON.stringify(document);
    } catch {
      return null;
    }
  })();
  const changedInput = before !== after;
  const line = result.ok ? "LOADED" : result.reason;
  if (result.ok || result.reason !== "shape" || changedInput) bad += 1;
  console.log(`${line}${changedInput ? " (input changed)" : ""}  ${name}`);
}

// Results share nothing with the document.
const doc = structuredClone(base);
const got = loadSavedGame(doc);
doc.game.judgings[c1][p1].forestEdge.results[0] = "death";
doc.game.judgings[c1][p1].forestEdge.equipment.push({ item: "moss", count: 1 });
doc.game.loops[c1].inARow = 0;
const shared =
  got.state.judgings[chars[0]][progs[0]].forestEdge.results[0] !==
    base.game.judgings[c1][p1].forestEdge.results[0] ||
  got.state.judgings[chars[0]][progs[0]].forestEdge.equipment.length !==
    base.game.judgings[c1][p1].forestEdge.equipment.length ||
  got.state.loops[chars[0]].inARow !== 1;
console.log(`result shares something with the document: ${shared}`);
console.log(`equipment of the remembered judging: ${JSON.stringify(base.game.judgings[c1][p1].forestEdge.equipment)}`);
console.log(`unexpected outcomes: ${bad}`);
