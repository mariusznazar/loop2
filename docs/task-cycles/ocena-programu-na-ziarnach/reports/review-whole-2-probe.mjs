// Probe of the three trust boundaries of correction 1 at the head c43c8ad7, against the built game in
// the review worktree. Prints one ASCII line per check and a final count of failures.
const ROOT = "./head/dist/browser";
const { newGame, createCharacter, withSaveTime } = await import(`${ROOT}/sim/game.js`);
const { savedGame, loadSavedGame } = await import(`${ROOT}/sim/saved-game.js`);
const { readPreviousPrograms } = await import(`${ROOT}/sim/previous-programs.js`);
const { appendPrograms, editProgram } = await import(`${ROOT}/sim/programs.js`);
const { openJudgingCache, lastingStorageOf } = await import(`${ROOT}/view/judging-cache.js`);
const { markOfRecord } = await import(`${ROOT}/sim/judging-record.js`);

let failures = 0;
function check(name, ok) {
  if (!ok) failures += 1;
  console.log(`${ok ? "ok  " : "FAIL"} ${name}`);
}
function noThrow(name, fn) {
  try {
    return fn();
  } catch (error) {
    check(`${name} threw ${error?.name}`, false);
    return undefined;
  }
}
const clone = (value) => JSON.parse(JSON.stringify(value));

// ---- A. the load of a saved game state (save-version) ----
let state = createCharacter(newGame(123456), "Ala").state;
const base = savedGame(withSaveTime(state, 1000));
check("A0 a game's own save loads", loadSavedGame(clone(base)).ok === true);
check("A0 the moment survives", loadSavedGame(clone(base)).state?.madeAtMs === 123456);

const revisions = {
  "-1": -1, "1.5": 1.5, "text 0": "0", null: null, NaN: NaN, Infinity: Infinity,
  "2^53": 2 ** 53, "object": {}, "list": [0], "true": true,
};
for (const [name, value] of Object.entries(revisions)) {
  const doc = clone(base);
  doc.game.programs[0].contentRevision = value;
  const result = noThrow(`A1 revision ${name}`, () => loadSavedGame(doc));
  check(`A1 revision ${name} refused as shape`, result?.ok === false && result.reason === "shape");
}
{
  const doc = clone(base);
  delete doc.game.programs[0].contentRevision;
  const result = loadSavedGame(doc);
  check("A1 revision missing refused as shape", result.ok === false && result.reason === "shape");
}
{
  const doc = clone(base);
  doc.game.programs[0].contentRevision = Number.MAX_SAFE_INTEGER;
  check("A1 revision max safe admitted", loadSavedGame(doc).ok === true);
}
const moments = {
  "-1": [-1, true], "0": [0, true], "min safe": [Number.MIN_SAFE_INTEGER, true],
  "max safe": [Number.MAX_SAFE_INTEGER, true], "2^53": [2 ** 53, false], "1.5": [1.5, false],
  "text": ["123", false], "null": [null, false], "NaN": [NaN, false], "-0": [-0, true],
};
for (const [name, [value, admitted]] of Object.entries(moments)) {
  const doc = clone(base);
  doc.game.madeAtMs = value;
  const result = noThrow(`A2 moment ${name}`, () => loadSavedGame(doc));
  check(`A2 moment ${name} ${admitted ? "admitted" : "refused"}`, result?.ok === admitted);
}
{
  const doc = clone(base);
  delete doc.game.madeAtMs;
  check("A2 moment missing refused", loadSavedGame(doc).ok === false);
}
for (const [name, value] of Object.entries({ empty: {}, null: null, list: [], filled: { 1: { 1: { forest: { results: Array(12).fill("solved"), equipment: [] } } } } })) {
  const doc = clone(base);
  doc.game.judgings = value;
  const result = noThrow(`A3 judgings ${name}`, () => loadSavedGame(doc));
  check(`A3 judgings ${name} refused as shape`, result?.ok === false && result.reason === "shape");
}
{
  const doc = JSON.parse(JSON.stringify(base).replace('"programs":[{', '"programs":[{"__proto__":{"x":1},'));
  const result = noThrow("A4 __proto__ in an item", () => loadSavedGame(doc));
  check("A4 __proto__ in an item refused", result?.ok === false);
}
{
  const doc = clone(base);
  doc.version = 8;
  check("A5 version 8 refused as version", loadSavedGame(doc).reason === "version");
}
{
  const doc = clone(base);
  doc.game.programs[0].contentRevision = "x".repeat(5_000_000);
  const result = noThrow("A6 huge revision text", () => loadSavedGame(doc));
  check("A6 huge revision text refused", result?.ok === false);
}

// ---- B. the reader of a previous save (previous-save-programs-reader) ----
const program = base.game.programs[0].program;
function previous(version, item) {
  return { version, game: { programs: [item] } };
}
for (let version = 1; version <= 9; version += 1) {
  const three = { id: 1, name: "P", program: clone(program) };
  const four = { ...three, contentRevision: 7 };
  const readThree = noThrow(`B1 v${version} three keys`, () => readPreviousPrograms(previous(version, three)));
  const readFour = noThrow(`B1 v${version} four keys`, () => readPreviousPrograms(previous(version, four)));
  const wantFour = version >= 9;
  check(`B1 v${version} three keys ${wantFour ? "skipped" : "read"}`, readThree?.ok && readThree.items[0].kind === (wantFour ? "skipped" : "read"));
  check(`B1 v${version} four keys ${wantFour ? "read" : "skipped"}`, readFour?.ok && readFour.items[0].kind === (wantFour ? "read" : "skipped"));
}
for (const [name, value] of Object.entries({ huge: "x".repeat(5_000_000), object: { a: [1, 2] }, null: null, negative: -5, nested: JSON.parse("[".repeat(5000) + "]".repeat(5000)) })) {
  const item = { id: 1, name: "P", program: clone(program), contentRevision: value };
  const result = noThrow(`B2 revision ${name}`, () => readPreviousPrograms(previous(9, item)));
  const read = result?.ok && result.items[0];
  check(`B2 revision ${name} neither read nor checked, item read with no revision`, read?.kind === "read" && !Object.hasOwn(read, "contentRevision"));
}
{
  const result = readPreviousPrograms(previous(9, { id: 1, name: "P", program: clone(program), contentRevision: 7 }));
  const pulled = appendPrograms(state, [result.items[0]]);
  check("B3 an item of revision 7 pulled at revision 0", pulled.programs.at(-1).contentRevision === 0);
}
check("B4 version 10 unreadable", readPreviousPrograms(previous(10, { id: 1, name: "P", program: clone(program), contentRevision: 0 })).ok === false);
check("B4 version '9' as text unreadable", readPreviousPrograms(previous("9", { id: 1, name: "P", program: clone(program), contentRevision: 0 })).ok === false);
{
  const item = JSON.parse(`{"id":1,"name":"P","program":${JSON.stringify(program)},"__proto__":0}`);
  const result = noThrow("B5 __proto__ as the fourth key", () => readPreviousPrograms(previous(9, item)));
  check("B5 __proto__ as the fourth key skipped", result?.ok && result.items[0].kind === "skipped");
}

// ---- C. the judging cache (judging-cache-reading) ----
function mapStorage(entries = {}) {
  const map = new Map(Object.entries(entries));
  return {
    map,
    get length() { return map.size; },
    key: (index) => [...map.keys()][index] ?? null,
    getItem: (key) => (map.has(key) ? map.get(key) : null),
    setItem: (key, value) => void map.set(key, String(value)),
    removeItem: (key) => void map.delete(key),
  };
}
const ACCOUNT = "8c1f2b3a-0000-4000-8000-000000000001";
const OTHER = "8c1f2b3a-0000-4000-8000-000000000002";
const MOMENT = state.madeAtMs;
const KEY = (account, moment, triple = "1|1|forest") => `loop2-judging-1|${account}|${moment}|${triple}`;
const GOOD = JSON.stringify({ results: "ssssssssssss", equipment: a note of the author, revision: 0, generation: 1 });
const ids = { characterId: 1, programId: 1, mapId: "forest" };
{
  const storage = mapStorage({ [KEY(ACCOUNT, MOMENT)]: GOOD });
  const cache = openJudgingCache({ accountId: ACCOUNT, madeAtMs: MOMENT, state, afterRefusedSave: false, storage });
  const record = cache.read(ids);
  check("C0 a good value reads", record?.results.length === 12 && record.generation === 1);
  check("C0 its mark stands", markOfRecord(state, ids, record)?.solved === 12);
  record.results[0] = "death";
  check("C0 the read record shares nothing with the cache", cache.read(ids).results[0] === "solved");
}
const crafted = {
  empty: "", notJson: "{", nul: "null", number: "5", text: '"x"', list: "[]",
  missingField: JSON.stringify({ results: "ssssssssssss", equipment: [], revision: 0 }),
  extraField: JSON.stringify({ results: "ssssssssssss", equipment: [], revision: 0, generation: 1, x: 1 }),
  proto: `{"results":"ssssssssssss","equipment":[],"revision":0,"generation":1,"__proto__":{"x":1}}`,
  protoOnly: `{"results":"ssssssssssss","equipment":[],"revision":0,"__proto__":1}`,
  elevenResults: JSON.stringify({ results: "sssssssssss", equipment: [], revision: 0, generation: 1 }),
  badLetter: JSON.stringify({ results: "sssssssssssx", equipment: [], revision: 0, generation: 1 }),
  surrogates: JSON.stringify({ results: "ssssssssss😀", equipment: [], revision: 0, generation: 1 }),
  itemProto: JSON.stringify({ results: "ssssssssssss", equipment: a note of the author, revision: 0, generation: 1 }),
  itemToString: JSON.stringify({ results: "ssssssssssss", equipment: a note of the author, revision: 0, generation: 1 }),
  itemTwice: JSON.stringify({ results: "ssssssssssss", equipment: [["stick", 1], ["stick", 2]], revision: 0, generation: 1 }),
  countZero: JSON.stringify({ results: "ssssssssssss", equipment: a note of the author, revision: 0, generation: 1 }),
  countHuge: JSON.stringify({ results: "ssssssssssss", equipment: a note of the author, revision: 0, generation: 1 }),
  pairOfThree: JSON.stringify({ results: "ssssssssssss", equipment: a note of the author, revision: 0, generation: 1 }),
  revisionText: JSON.stringify({ results: "ssssssssssss", equipment: [], revision: "0", generation: 1 }),
  generationZero: JSON.stringify({ results: "ssssssssssss", equipment: [], revision: 0, generation: 0 }),
  generationFloat: JSON.stringify({ results: "ssssssssssss", equipment: [], revision: 0, generation: 1.5 }),
  huge: GOOD.slice(0, -1) + `,"pad":"${"x".repeat(10_000_000)}"}`,
  deep: "[".repeat(100000) + "]".repeat(100000),
};
for (const [name, value] of Object.entries(crafted)) {
  const storage = mapStorage({ [KEY(ACCOUNT, MOMENT)]: value });
  const started = Date.now();
  const result = noThrow(`C1 ${name}`, () => {
    const cache = openJudgingCache({ accountId: ACCOUNT, madeAtMs: MOMENT, state, afterRefusedSave: false, storage });
    return { record: cache.read(ids) };
  });
  check(`C1 ${name} reads as none, stays, under 500 ms`, result?.record === null && storage.map.get(KEY(ACCOUNT, MOMENT)) === value && Date.now() - started < 500);
}
{
  const storage = mapStorage({
    [KEY(OTHER, MOMENT)]: GOOD,
    [KEY(ACCOUNT, MOMENT + 1)]: GOOD,
    [`loop2-judging-2|${ACCOUNT}|${MOMENT}|1|1|forest`]: GOOD,
    [`${KEY(ACCOUNT, MOMENT)}|extra`]: GOOD,
  });
  const cache = openJudgingCache({ accountId: ACCOUNT, madeAtMs: MOMENT, state, afterRefusedSave: false, storage });
  check("C2 another account, game or version never read", cache.read(ids) === null);
  check("C2 another account's value left", storage.map.has(KEY(OTHER, MOMENT)));
  check("C2 another game of the account removed", !storage.map.has(KEY(ACCOUNT, MOMENT + 1)));
  check("C2 another version left", storage.map.has(`loop2-judging-2|${ACCOUNT}|${MOMENT}|1|1|forest`));
  check("C2 a key of this game with a fourth part left alone", storage.map.has(`${KEY(ACCOUNT, MOMENT)}|extra`));
}
{
  const throwing = {
    get length() { throw new Error("no"); },
    key() { throw new Error("no"); },
    getItem() { throw new Error("no"); },
    setItem() { throw new Error("no"); },
    removeItem() { throw new Error("no"); },
  };
  const result = noThrow("C3 a storage whose every call throws", () => {
    const cache = openJudgingCache({ accountId: ACCOUNT, madeAtMs: MOMENT, state, afterRefusedSave: true, storage: throwing });
    cache.remember(ids, { results: Array(12).fill("solved"), equipment: [], contentRevision: 0, generation: 1 });
    return cache.read(ids);
  });
  check("C3 a storage whose every call throws keeps the judging for the open page", result?.results.length === 12);
}
{
  const window = { get localStorage() { throw new DOMException("blocked", "SecurityError"); } };
  check("C4 a window refusing its storage gives none", noThrow("C4", () => lastingStorageOf(window)) === null);
  const absent = noThrow("C4b", () => lastingStorageOf({}));
  check("C4b a window with no localStorage gives null (M4 of rc15)", absent === null);
}
{
  // A value above the loaded game's own content revision or generation is dropped at the opening.
  const storage = mapStorage({
    [KEY(ACCOUNT, MOMENT)]: JSON.stringify({ results: "ssssssssssss", equipment: [], revision: 1, generation: 1 }),
    [KEY(ACCOUNT, MOMENT, "1|9|forest")]: JSON.stringify({ results: "ssssssssssss", equipment: [], revision: 0, generation: 1 }),
  });
  openJudgingCache({ accountId: ACCOUNT, madeAtMs: MOMENT, state, afterRefusedSave: false, storage });
  check("C5 a value above the loaded revision removed", !storage.map.has(KEY(ACCOUNT, MOMENT)));
  check("C5 a value of a program number the loaded game never gave kept (rc15 M1)", storage.map.has(KEY(ACCOUNT, MOMENT, "1|9|forest")));
}
{
  // A→B→A on the content: the mark of the first content does not come back.
  const record = { results: Array(12).fill("solved"), equipment: [], contentRevision: 0, generation: 1 };
  const changed = editProgram(state, 1, { ...program, tripPlan: { take: [{ item: "stick", count: 1 }], bring: [] } }).state;
  const back = editProgram(changed, 1, program).state;
  check("C6 A->B->A shows no mark", markOfRecord(back, ids, record) === null && back.programs[0].contentRevision === 2);
}

console.log(`failures ${failures}`);
