// Probes of the opening of the judging cache at the head 51015538 (review w2f). Output is ASCII.
import { writeFileSync } from "node:fs";
import { openJudgingCache, lastingStorageOf } from "./wt/dist/browser/view/judging-cache.js";
import { newGame, createCharacter } from "./wt/dist/browser/sim/game.js";

const out = [];
const log = (line) => out.push(line);

function mapStorage(entries = {}) {
  const held = new Map(Object.entries(entries));
  return {
    held,
    get length() { return held.size; },
    key: (i) => [...held.keys()][i] ?? null,
    getItem: (k) => (held.has(k) ? held.get(k) : null),
    setItem: (k, v) => held.set(k, String(v)),
    removeItem: (k) => held.delete(k),
  };
}

const VALID = { results: "ssssssssssss", equipment: [], revision: 0, generation: 1 };
const val = (revision = 0, generation = 1) => JSON.stringify({ ...VALID, revision, generation });

// A game made at 1000 with characters 1 and 3 (2 left), programs 1 and 4 (2, 3 deleted), next 5 and 5.
let state = newGame(1000);
state = createCharacter(state, "Ala").state;
state = createCharacter(state, "Ola").state;
state = createCharacter(state, "Ela").state;
state = {
  ...state,
  team: { ...state.team, characters: state.team.characters.filter((c) => c.id !== 2) },
  programs: [state.programs[0], { ...state.programs[0], id: 4, name: "Czwarty", contentRevision: 2 }],
  nextProgramId: 5,
  nextCharacterId: 5,
};

const P = "loop2-judging-1|acct-1|1000|";
const big = "9".repeat(200000);
const entries = {
  [`${P}1|1|forest`]: val(0, 1), // own, kept
  [`${P}3|4|forest`]: val(2, 1), // own, kept
  [`${P}2|4|forest`]: val(1, 1), // character once given, gone; program held, rev below: kept
  [`${P}3|2|forest`]: val(0, 1), // program once given, gone: kept
  [`${P}4|1|forest`]: val(0, 1), // character 4 once given (next 5), not held: kept
  [`${P}5|1|forest`]: val(0, 1), // character never given: removed
  [`${P}1|5|forest`]: val(0, 1), // program never given: removed
  [`${P}1|${big}|forest`]: val(0, 1), // removed, no throw
  [`${P}0|1|forest`]: val(0, 1), // 0 is below: kept (no character 0)
  [`${P}1|1|forest|x`]: val(0, 1), // 4 parts: kept
  [`${P}1|1`]: val(0, 1), // 2 parts: kept
  [`${P}١|1|forest`]: val(0, 1), // arabic-indic digit: kept
  [`${P}5|1|bad`]: "{\"results\":1}", // never-given number, no value of the cache: kept
  [`${P}5|1|proto`]: "{\"__proto__\":{\"x\":1}}", // kept
  [`${P}5|1|long`]: "x".repeat(5000), // kept
  [`${P}__proto__|1|forest`]: val(0, 1), // kept
  [`${P}1|constructor|forest`]: val(0, 1), // kept
  [`${P}%35|1|forest`]: val(0, 1), // escaped digit 5: no canonical decimal, kept
  ["loop2-judging-1|acct-2|1000|9|9|forest"]: val(0, 1), // other account: kept
  ["loop2-judging-1|acct-1|1001|1|1|forest"]: val(0, 1), // other game: removed
  ["loop2-judging-2|acct-1|1000|9|9|forest"]: val(0, 1), // other version: kept
};
const storage = mapStorage(entries);
let threw = null;
let cache = null;
try {
  cache = openJudgingCache({ accountId: "acct-1", state, afterRefusedSave: false, storage });
} catch (error) {
  threw = String(error);
}
log(`opening threw: ${threw}`);
const kept = new Set(storage.held.keys());
for (const key of Object.keys(entries)) {
  const shown = key.length > 80 ? `${key.slice(0, 60)}...(${key.length})` : key;
  log(`${kept.has(key) ? "KEPT   " : "REMOVED"} ${JSON.stringify(shown)}`);
}
log(`read own 1|1: ${JSON.stringify(cache.read({ characterId: 1, programId: 1, mapId: "forest" }))}`);
log(`read own 3|4: ${JSON.stringify(cache.read({ characterId: 3, programId: 4, mapId: "forest" }))}`);

// A state whose next numbers are at the safe-integer edge.
const edge = { ...state, nextCharacterId: Number.MAX_SAFE_INTEGER, nextProgramId: Number.MAX_SAFE_INTEGER };
const s2 = mapStorage({
  [`${P}9007199254740990|1|forest`]: val(0, 1),
  [`${P}9007199254740991|1|forest`]: val(0, 1),
  [`${P}1|9007199254740992|forest`]: val(0, 1),
});
openJudgingCache({ accountId: "acct-1", state: edge, afterRefusedSave: false, storage: s2 });
log(`edge kept: ${JSON.stringify([...s2.held.keys()].map((k) => k.slice(P.length)))}`);

// A storage whose getItem throws, and one that answers a non-string.
const throwing = { ...mapStorage({ [`${P}5|1|forest`]: val() }), getItem() { throw new Error("x"); } };
try { openJudgingCache({ accountId: "acct-1", state, afterRefusedSave: false, storage: throwing }); log("getItem throws: no throw out"); } catch (e) { log(`getItem throws: THREW ${e}`); }
const odd = { ...mapStorage({ [`${P}5|1|forest`]: val() }), getItem: () => ({}) };
try { openJudgingCache({ accountId: "acct-1", state, afterRefusedSave: false, storage: odd }); log(`getItem object: no throw, kept ${odd.held.size}`); } catch (e) { log(`getItem object: THREW ${e}`); }

// lastingStorageOf
const ls = new Map();
log(`lastingStorageOf({}): ${String(lastingStorageOf({}))}`);
log(`lastingStorageOf(getter throws): ${String(lastingStorageOf({ get localStorage() { throw new Error("blocked"); } }))}`);
log(`lastingStorageOf(given) same: ${lastingStorageOf({ localStorage: ls }) === ls}`);

writeFileSync(new URL("./probe-output.txt", import.meta.url), out.join("\n") + "\n", "utf8");
console.log("done", out.length);
