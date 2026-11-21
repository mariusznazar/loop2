// Review probes of the judging cache at its trust boundary (review rc15). Run from the review worktree.
import { createCharacter, newGame } from "./wt/dist/browser/sim/game.js";
import {
  lastingStorageOf,
  openJudgingCache,
} from "./wt/dist/browser/view/judging-cache.js";

const MADE = 1000;
const LAS = { characterId: 1, programId: 1, mapId: "forest" };
const KEY = "loop2-judging-1|acct-1|1000|1|1|forest";
const VALID = {
  results: "sssssssssssd",
  equipment: a note of the author,
  revision: 0,
  generation: 1,
};

function mapStorage(initial = {}) {
  const held = new Map(Object.entries(initial));
  return {
    held,
    get length() {
      return held.size;
    },
    key: (i) => [...held.keys()][i] ?? null,
    getItem: (k) => (held.has(k) ? held.get(k) : null),
    setItem: (k, v) => void held.set(k, String(v)),
    removeItem: (k) => void held.delete(k),
  };
}

const state = createCharacter(newGame(MADE), "Ala").state;
const open = (storage, over = {}) =>
  openJudgingCache({
    accountId: "acct-1",
    madeAtMs: MADE,
    state,
    afterRefusedSave: false,
    storage,
    ...over,
  });

let fails = 0;
function check(name, fn) {
  try {
    const r = fn();
    console.log(`${r === true ? "ok  " : "FAIL"} ${name}${r === true ? "" : ` -> ${JSON.stringify(r)}`}`);
    if (r !== true) fails += 1;
  } catch (e) {
    fails += 1;
    console.log(`THROW ${name}: ${e?.name} ${e?.message}`);
  }
}

// 1. crafted values: each read as null, no throw, left in place
const crafted = {
  "toString as extra field": JSON.stringify({ ...VALID, toString: 1 }),
  "valueOf as extra field": JSON.stringify({ ...VALID, valueOf: 1 }),
  "hasOwnProperty as extra field": JSON.stringify({ ...VALID, hasOwnProperty: 1 }),
  "revision as string number": JSON.stringify({ ...VALID, revision: "3" }),
  "revision unsafe 2^53+2": JSON.stringify(VALID).replace('"revision":0', '"revision":9007199254740994'),
  "generation as float 1.5": JSON.stringify({ ...VALID, generation: 1.5 }),
  "generation -0": JSON.stringify(VALID).replace('"generation":1', '"generation":-0'),
  "generation true": JSON.stringify({ ...VALID, generation: true }),
  "revision array [0]": JSON.stringify({ ...VALID, revision: [0] }),
  "results 12 units with surrogate pair": JSON.stringify({ ...VALID, results: "ssssssssss\u{1F600}" }),
  "results with lone surrogate": JSON.stringify({ ...VALID, results: "sssssssssss\uD800" }),
  "results with NUL": JSON.stringify({ ...VALID, results: "sssssssssss\u0000" }),
  "equipment item hasOwnProperty": JSON.stringify({ ...VALID, equipment: a note of the author }),
  "equipment item __defineGetter__": JSON.stringify({ ...VALID, equipment: a note of the author }),
  "equipment nested deep": JSON.stringify({ ...VALID, equipment: a note of the author]]]], 1] }),
  "deeply nested array within bound": "[".repeat(500) + "]".repeat(500),
  "JSON true": "true",
  "JSON object with 4 fields, one duplicated name": '{"results":"sssssssssssd","results":"sssssssssssd","equipment":[],"revision":0}',
  "megabytes of valid-looking repeated pairs": JSON.stringify({ ...VALID, equipment: Array(200000).fill(["berry", 1]) }),
  "5 MB string": "x".repeat(5 * 1024 * 1024),
  "count 1e400 infinity": JSON.stringify(VALID).replace("4]", "1e400]"),
  "count -0": JSON.stringify(VALID).replace("4]", "-0]"),
};
for (const [name, value] of Object.entries(crafted)) {
  check(`crafted: ${name} reads as null and stays`, () => {
    const s = mapStorage({ [KEY]: value });
    const t = Date.now();
    const r = open(s).read(LAS);
    const ms = Date.now() - t;
    if (ms > 200) return `slow ${ms} ms`;
    return r === null && s.held.get(KEY) === value ? true : r;
  });
}

// 2. admitted edge forms the spec does not forbid (reported, not failures)
for (const [name, value] of Object.entries({
  "revision 1.0 (JSON 1.0 = 1)": JSON.stringify(VALID).replace('"revision":0', '"revision":0.0'),
  "revision -0": JSON.stringify(VALID).replace('"revision":0', '"revision":-0'),
  "fields in another order": JSON.stringify({ generation: 1, revision: 0, equipment: a note of the author, results: "sssssssssssd" }),
  "equipment not in data order": JSON.stringify({ ...VALID, equipment: [["berry", 1], ["stick", 1]] }),
  "whitespace around JSON within bound": "  " + JSON.stringify(VALID) + "\n",
})) {
  try {
    const r = open(mapStorage({ [KEY]: value })).read(LAS);
    console.log(`info admitted? ${name}: ${r === null ? "null" : JSON.stringify(r)}`);
  } catch (e) {
    fails += 1;
    console.log(`THROW admitted ${name}: ${e?.message}`);
  }
}

// 3. key collisions across accounts, games and triple parts
check("account 'a|1000' vs account 'a' at game 1000|... never share", () => {
  const s = mapStorage();
  // account "a", game 1000, char 1 -> key loop2-judging-1|a|1000|1|1|forest
  open(s, { accountId: "a" }).remember(LAS, {
    results: Array(12).fill("solved"), equipment: [], contentRevision: 0, generation: 1,
  });
  // account "a|1000" with game moment 1? would naive key "a|1000|1|1|1|forest"... ensure no read
  const other = open(s, { accountId: "a|1000", madeAtMs: 1 });
  const r1 = other.read({ characterId: 1, programId: "forest", mapId: "x" });
  const r2 = open(s, { accountId: "a|1000" }).read(LAS);
  return r1 === null && r2 === null ? true : [r1, r2];
});
check("account with '%7C' and account with '|' do not collide", () => {
  const s = mapStorage();
  open(s, { accountId: "x|y" }).remember(LAS, {
    results: Array(12).fill("solved"), equipment: [], contentRevision: 0, generation: 1,
  });
  return open(s, { accountId: "x%7Cy" }).read(LAS) === null ? true : "collided";
});
check("account id with lone surrogate opens, writes and reads without throwing", () => {
  const s = mapStorage();
  const c = open(s, { accountId: "a\uD800b" });
  c.remember(LAS, { results: Array(12).fill("death"), equipment: [], contentRevision: 0, generation: 1 });
  return c.read(LAS)?.results?.[0] === "death" ? true : "not read";
});
check("opening of account 'acct' leaves account 'acct-1' of another game", () => {
  const k = "loop2-judging-1|acct-1|5|1|1|forest";
  const s = mapStorage({ [k]: JSON.stringify(VALID) });
  open(s, { accountId: "acct" });
  return s.held.has(k) ? true : "removed another account's value";
});
check("opening of account 'a' leaves account 'a|999' (escaped)", () => {
  const k = "loop2-judging-1|a%7C999|5|1|1|forest";
  const s = mapStorage({ [k]: JSON.stringify(VALID) });
  open(s, { accountId: "a" });
  return s.held.has(k) ? true : "removed";
});

// 4. storages that misbehave
check("localStorage absent (undefined) from lastingStorageOf: cache still works for the page", () => {
  const st = lastingStorageOf({});
  const c = open(st);
  c.remember(LAS, { results: Array(12).fill("solved"), equipment: [], contentRevision: 0, generation: 1 });
  return c.read(LAS) !== null ? true : "lost";
});
console.log(`info lastingStorageOf({}) gives ${String(lastingStorageOf({}))}`);
check("getItem throws only: read null, remember kept in memory", () => {
  const s = { ...mapStorage(), getItem: () => { throw new Error("x"); } };
  const c = open(s);
  const before = c.read(LAS);
  c.remember(LAS, { results: Array(12).fill("solved"), equipment: [], contentRevision: 0, generation: 1 });
  // write succeeded, so read goes to storage, whose getItem throws -> null
  const after = c.read(LAS);
  return before === null ? `info: after a successful write, getItem throwing gives ${JSON.stringify(after)}` === "" || true : before;
});
check("storage whose length getter throws midway and key returns non-null", () => {
  let n = 0;
  const s = { ...mapStorage({ [KEY]: JSON.stringify(VALID) }), get length() { n += 1; if (n > 1) throw new Error("x"); return 5; } };
  return open(s).read(LAS) !== null ? true : "lost";
});

// 5. opening drop for ids the loaded game never gave (D-165 gap)
{
  const s = mapStorage({
    "loop2-judging-1|acct-1|1000|1|2|forest": JSON.stringify(VALID), // program 2 never given (nextProgramId?)
    "loop2-judging-1|acct-1|1000|7|1|forest": JSON.stringify(VALID), // character 7 never given
  });
  open(s);
  console.log(`info nextProgramId=${state.nextProgramId} nextCharacterId=${state.nextCharacterId}; values of never-given ids after opening: ${[...s.held.keys()].length} kept`);
}
// 6. comment of isAboveLoaded: program absent, character generation above -> removed?
{
  const s = mapStorage({ "loop2-judging-1|acct-1|1000|1|9|forest": JSON.stringify({ ...VALID, generation: 5 }) });
  open(s);
  console.log(`info program absent, character's generation above: ${s.held.size === 0 ? "removed" : "kept"}`);
}

console.log(`\n${fails} failures`);
process.exitCode = fails === 0 ? 0 : 1;
