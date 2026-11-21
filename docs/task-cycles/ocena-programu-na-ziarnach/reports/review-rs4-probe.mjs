// Reviewer's probes of the strict load of remembered judgings (slice 4), run against the head's build.
import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";

const root = process.argv[2];
const load = async (path) => import(pathToFileURL(`${root}/${path}`).href);
const { createCharacter, newGame, withSaveTime } = await load("dist/browser/sim/game.js");
const { createProgram, deleteProgram } = await load("dist/browser/sim/programs.js");
const { loadSavedGame, savedGame } = await load("dist/browser/sim/saved-game.js");
const { MAPS } = await load("dist/browser/sim/data/maps.js").catch(() => ({ MAPS: null }));

const NOW = 1760000000000;
const S12 = Array(12).fill("solved");
let state = createCharacter(newGame(), "Ala").state;
state = createCharacter(state, "Ola").state;
state = createProgram(state).state;
const base = {
  ...state,
  judgings: {
    1: { 1: { forest: { results: [...S12], equipment: [{ item: "berry", count: 4 }] } } },
    2: { 2: { forestEdge: { results: ["death", ...S12.slice(1)], equipment: [] } } },
  },
};
const text = JSON.stringify(savedGame(withSaveTime(base, NOW)));
const DOC = JSON.parse(text);
const out = [];
function check(name, document, expectOk) {
  let result;
  try {
    result = loadSavedGame(document);
  } catch (error) {
    out.push(`THROW ${name}: ${error?.name}`);
    return;
  }
  const ok = result.ok;
  const good = expectOk ? ok : !ok && result.reason === "shape";
  out.push(`${good ? "ok  " : "BAD "} ${name} -> ${JSON.stringify(ok ? "loaded" : result.reason)}`);
}
const at = (mutate) => {
  const copy = structuredClone(DOC);
  mutate(copy.game.judgings, copy);
  return copy;
};
const fromText = (replaceFrom, replaceTo) => JSON.parse(text.replace(replaceFrom, replaceTo));

check("the game's own save", DOC, true);
{
  const r = loadSavedGame(DOC);
  assert.deepEqual(r.state.judgings, base.judgings);
}
// Duplicate keys in the text: JSON.parse keeps the last; the result must still be admitted or refused as a whole.
check("duplicate character key, later one valid", fromText('"judgings":{', '"judgings":{"1":5,'), true);
check("duplicate map key, later one valid", fromText('"forest":{', '"forest":7,"forest":{'), true);
check("__proto__ key at character level", fromText('"judgings":{', '"judgings":{"__proto__":{},'), false);
check("__proto__ key at program level", fromText('"judgings":{"1":{', '"judgings":{"1":{"__proto__":{},'), false);
check("__proto__ key at map level", fromText('"1":{"forest":', '"1":{"__proto__":{"results":[],"equipment":[]},"forest":'), false);
check("__proto__ key inside a judging with twelve results", fromText('"equipment":[{"item":"berry","count":4}]', '"equipment":[{"item":"berry","count":4}],"__proto__":{}'), false);
check("constructor key at map level", fromText('"1":{"forest":', '"1":{"constructor":{"results":[],"equipment":[]},"forest":'), false);
check("constructor key at character level", fromText('"judgings":{', '"judgings":{"constructor":{},'), false);
check("character 2 judging of program 1 listed", at((j) => { j[2][1] = { forest: { results: [...S12], equipment: [] } }; }), true);
check("program key 1e0", fromText('"judgings":{"1":{"1"', '"judgings":{"1":{"1e0"'), false);
check("character key 1.0", fromText('"judgings":{"1"', '"judgings":{"1.0"'), false);
check("character key +1", fromText('"judgings":{"1"', '"judgings":{"+1"'), false);
check("character key 9007199254740993", fromText('"judgings":{"1"', '"judgings":{"9007199254740993"'), false);
check("count 1e300", at((j) => { j[1][1].forest.equipment[0].count = 1e300; }), false);
check("count -0 (as text -0)", fromText('"count":4', '"count":-0'), false);
check("count 4.0 (text)", fromText('"count":4', '"count":4.0'), true);
check("count 9007199254740991", at((j) => { j[1][1].forest.equipment[0].count = 9007199254740991; }), true);
check("count 9007199254740992", at((j) => { j[1][1].forest.equipment[0].count = 9007199254740992; }), false);
check("count huge exponent 1e999 -> Infinity", fromText('"count":4', '"count":1e999'), false);
check("results 12 with __proto__ string", at((j) => { j[1][1].forest.results[3] = "__proto__"; }), false);
check("results 12 with hasOwnProperty", at((j) => { j[1][1].forest.results[3] = "hasOwnProperty"; }), false);
check("results 12 with 'solved ' trailing space", at((j) => { j[1][1].forest.results[3] = "solved "; }), false);
check("results as 12-character string", at((j) => { j[1][1].forest.results = "ssssssssssss"; }), false);
check("results 11 + undefined -> null in JSON", fromText('"results":["death",', '"results":[null,'), false);
check("equipment empty", at((j) => { j[1][1].forest.equipment = []; }), true);
check("equipment many items of the data", at((j) => { j[1][1].forest.equipment = [{ item: "berry", count: 1 }, { item: "stick", count: 2 }]; }), true);
check("equipment item __proto__", at((j) => { j[1][1].forest.equipment = [{ item: "__proto__", count: 1 }]; }), false);
check("equipment entry keys in another order", at((j) => { j[1][1].forest.equipment = [{ count: 1, item: "berry" }]; }), true);
check("judging keys in another order", at((j) => { j[1][1].forest = { equipment: [], results: [...S12] }; }), true);
check("judging of a program deleted (2) for Ola", (() => {
  const s = { ...deleteProgram(base, 2).state, judgings: base.judgings };
  return JSON.parse(JSON.stringify(savedGame(withSaveTime(s, NOW))));
})(), false);
check("a character number at the next id", at((j, d) => { j[d.game.nextCharacterId] = {}; }), false);
check("a program number at nextProgramId", at((j, d) => { j[1][d.game.nextProgramId] = {}; }), false);
check("record holds array at program level with key 0", at((j) => { j[1] = [ {} ]; }), false);
check("empty array as map level", at((j) => { j[1][1] = []; }), false);
check("judgings key missing (old v8 document)", at((_j, d) => { delete d.game.judgings; }), false);
// A null-prototype object built in memory (as JSON.parse never makes, but a page-memory document might).
check("null-prototype levels (in memory)", at((j, d) => {
  const lvl = Object.assign(Object.create(null), { 1: Object.assign(Object.create(null), { forest: { results: [...S12], equipment: [] } }) });
  d.game.judgings = Object.assign(Object.create(null), { 1: lvl });
}), true);
// A getter (not JSON, but a value in page memory): must not throw.
check("getter at map level (in memory)", at((j) => { Object.defineProperty(j[1][1], "forest", { get() { throw new Error("boom"); }, enumerable: true }); }), false);
check("Proxy as the record (in memory)", at((j, d) => { d.game.judgings = new Proxy({}, { ownKeys() { throw new Error("boom"); } }); }), false);

// The input is left as it was.
{
  const before = JSON.stringify(DOC);
  loadSavedGame(DOC);
  assert.equal(JSON.stringify(DOC), before);
}

// Size: bytes of one remembered judging in the saved text, with an empty and a two-item take list.
const one = JSON.stringify({ forest: { results: [...S12], equipment: [] } }).length;
const oneMixed = JSON.stringify({ forestDeep: { results: ["undecided", "death", ...Array(10).fill("undecided")], equipment: [{ item: "berry", count: 10 }, { item: "stick", count: 2 }] } }).length;
out.push(`size: one judging with empty equipment ${one} bytes; worst-ish ${oneMixed} bytes; base save ${text.length} bytes`);
out.push(`maps in data: ${MAPS ? Object.keys(MAPS).length : "unknown"}`);
console.log(out.join("\n"));
