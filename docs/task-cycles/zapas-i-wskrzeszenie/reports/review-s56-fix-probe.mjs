// Reviewer's probe: the rules of the team's resurrection and hostile documents at the load.
// Run from a worktree root after its build: node <this file> <worktree root>
import { pathToFileURL } from "node:url";
import { writeFileSync } from "node:fs";

const root = process.argv[2];
const game = await import(pathToFileURL(`${root}/dist/browser/sim/game.js`).href);
const saved = await import(pathToFileURL(`${root}/dist/browser/sim/saved-game.js`).href);
const fixture = await import(pathToFileURL(`${root}/tests/sim/understanding-fixture.mjs`).href);
const { newGame, createCharacter, teamAfterDeath, settleCompletion, resurrectionAt, resurrectionReady, send, withSaveTime, settleDeath, advanceMinutes } = game;
const { loadSavedGame, savedGame } = saved;

const R = 240 * 60_000;
const T = 1_760_000_000_000;
const lines = [];
const check = (name, ok, detail = "") => lines.push(`${ok ? "OK  " : "BAD "} ${name} ${detail}`);
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);

let base = fixture.withEdgeSolved(fixture.newKnowingGame());
base = createCharacter(base, "A").state;
base = createCharacter(base, "B").state;
const [a, b] = base.team.characters;
const practisedA = { ...a, skills: { ...a.skills, eating: { practice: 3, ranks: {} } } };
const practisedB = { ...b, skills: { ...b.skills, eating: { practice: 3, ranks: {} } } };
const team0 = { ...base.team, characters: [practisedA, practisedB] };
const withUses = (team, spent, next) => ({ ...team, resurrectionUsesSpent: spent, resurrectionNextReturnAtMs: next });
const st = (team, now) => { const s = resurrectionAt(team, now); return [s.usesLeft, s.nextReturnMs]; };

// 1. Full stock, death starts the clock.
let r = teamAfterDeath(team0, practisedA, {}, T);
check("full stock death starts clock", r.team.resurrectionUsesSpent === 1 && r.team.resurrectionNextReturnAtMs === T + R && r.settlement.usesLeft === 2);
// 2. Clock running: leaves it.
let r2 = teamAfterDeath(r.team, practisedB, {}, T + 7);
check("death with clock running keeps moment", r2.team.resurrectionNextReturnAtMs === T + R && r2.settlement.usesLeft === 1);
// 3. Use returns exactly at its moment.
check("return at moment counts", eq(st(withUses(team0, 1, T), T), [3, null]) && eq(st(withUses(team0, 1, T), T - 1), [2, T]));
// 4. Several returns after long absence.
const all = withUses(team0, 3, T);
check("3 back at T+2R", eq(st(all, T + 2 * R), [3, null]));
check("2 back at T+2R-1", eq(st(all, T + 2 * R - 1), [2, T + 2 * R]));
check("1 back at T, 2 back at T+R", eq(st(all, T), [1, T + R]) && eq(st(all, T + R), [2, T + 2 * R]));
check("far future full", eq(st(all, T + 1000 * R), [3, null]));
// 5. Death after returns, clock as it runs from the normalized moment.
let r5 = teamAfterDeath(all, practisedA, {}, T + R + 3);
check("death after two returns", r5.team.resurrectionUsesSpent === 2 && r5.team.resurrectionNextReturnAtMs === T + 2 * R && r5.settlement.usesLeft === 1);
let r5b = teamAfterDeath(all, practisedA, {}, T + 3);
check("death after one return", r5b.team.resurrectionUsesSpent === 3 && r5b.team.resurrectionNextReturnAtMs === T + R && r5b.settlement.usesLeft === 0);
// 6. Zero left takes everything.
let r6 = teamAfterDeath(all, practisedA, {}, T - 1);
check("zero left takes all", r6.settlement.kind === "progressLost" && r6.team.resurrectionUsesSpent === 3 && r6.team.resurrectionNextReturnAtMs === T && r6.team.characters[0].generation === 2);
// 7. No practice spends none.
let r7 = teamAfterDeath(all, b, {}, T - 1);
check("no practice spends none", r7.team === all && r7.settlement.kind === "noPractice");
let r7b = teamAfterDeath(team0, b, {}, T);
check("no practice full stock", r7b.team === team0);

// 8. First solving: build a completed first-solving run.
function solved(state) {
  const going = send(state, { mapId: "forest", characterId: 1 }, T).state;
  return { ...going, solvedMaps: [...going.solvedMaps, "forest"], run: { ...going.run, completion: { minute: 0 }, deposited: [] } };
}
const stateWith = (spent, next) => ({ ...base, team: withUses(team0, spent, next) });
// 8a. not full, clock running on
let c1 = settleCompletion(solved(stateWith(3, T + R)), T + 5).state;
check("first solving 3->2 keeps clock", c1.team.resurrectionUsesSpent === 2 && c1.team.resurrectionNextReturnAtMs === T + R && c1.run.completionSettlement.kind === "resurrectionRenewed");
// 8b. returns counted first, then one returned, clock normalized.
let c2 = settleCompletion(solved(stateWith(3, T)), T + 1).state;
check("first solving after a return: spent 1, clock at T+R", c2.team.resurrectionUsesSpent === 1 && c2.team.resurrectionNextReturnAtMs === T + R, JSON.stringify([c2.team.resurrectionUsesSpent, c2.team.resurrectionNextReturnAtMs]));
check("first solving after a return: stock now [2, T+R]", eq(st(c2.team, T + 1), [2, T + R]), JSON.stringify(st(c2.team, T + 1)));
// 8c. fills the stock
let c3 = settleCompletion(solved(stateWith(1, T + R)), T).state;
check("first solving fills stock stops clock", c3.team.resurrectionUsesSpent === 0 && c3.team.resurrectionNextReturnAtMs === null);
// 8d. full stock: nothing
const fullState = solved(stateWith(0, null));
let c4 = settleCompletion(fullState, T).state;
check("first solving at full stock", c4.team === fullState.team && c4.run.completionSettlement.kind === "resurrectionReady");

// 9. resurrectionReady
check("ready with 1 left", resurrectionReady(withUses(team0, 2, T), T - 1) === true);
check("not ready with 0 left", resurrectionReady(withUses(team0, 3, T), T - 1) === false);

// 10. Hostile documents.
const docState = withSaveTime(stateWith(2, T + R), T);
const doc = savedGame(docState);
check("baseline doc loads", loadSavedGame(doc).ok === true);
const variants = {
  "spent 4": (t) => { t.resurrectionUsesSpent = 4; },
  "spent -1": (t) => { t.resurrectionUsesSpent = -1; },
  "spent NaN": (t) => { t.resurrectionUsesSpent = NaN; },
  "spent -Infinity": (t) => { t.resurrectionUsesSpent = -Infinity; },
  "spent null": (t) => { t.resurrectionUsesSpent = null; },
  "spent true": (t) => { t.resurrectionUsesSpent = true; },
  "spent []": (t) => { t.resurrectionUsesSpent = []; },
  "spent {}": (t) => { t.resurrectionUsesSpent = {}; },
  "spent 2^53": (t) => { t.resurrectionUsesSpent = 2 ** 53; },
  "spent BigInt": (t) => { t.resurrectionUsesSpent = 2n; },
  "spent Number obj": (t) => { t.resurrectionUsesSpent = new Number(2); },
  "next NaN": (t) => { t.resurrectionNextReturnAtMs = NaN; },
  "next undefined": (t) => { t.resurrectionNextReturnAtMs = undefined; },
  "next -2^53": (t) => { t.resurrectionNextReturnAtMs = -(2 ** 53); },
  "next 1.5": (t) => { t.resurrectionNextReturnAtMs = 1.5; },
  "next false": (t) => { t.resurrectionNextReturnAtMs = false; },
  "spent 0 next stands": (t) => { t.resurrectionUsesSpent = 0; },
  "spent 1 next null": (t) => { t.resurrectionUsesSpent = 1; t.resurrectionNextReturnAtMs = null; },
  "old key added": (t) => { t.resurrectionReadyAtMs = 0; },
  "next missing": (t) => { delete t.resurrectionNextReturnAtMs; },
  "spent missing": (t) => { delete t.resurrectionUsesSpent; },
  "spent getter": (t) => { delete t.resurrectionUsesSpent; Object.defineProperty(t, "resurrectionUsesSpent", { get: () => 1, enumerable: true }); },
};
for (const [name, change] of Object.entries(variants)) {
  const copy = structuredClone(doc);
  change(copy.game.team);
  let res;
  try { res = loadSavedGame(copy); } catch (e) { res = { threw: String(e) }; }
  check(`refused: ${name}`, eq(res, { ok: false, reason: "shape" }), JSON.stringify(res).slice(0, 80));
}
const accepted = {
  "spent 3 with any moment": (t) => { t.resurrectionUsesSpent = 3; },
  "next negative": (t) => { t.resurrectionNextReturnAtMs = -5; },
  "next max safe": (t) => { t.resurrectionNextReturnAtMs = Number.MAX_SAFE_INTEGER; },
  "next -max safe": (t) => { t.resurrectionNextReturnAtMs = -Number.MAX_SAFE_INTEGER; },
};
for (const [name, change] of Object.entries(accepted)) {
  const copy = structuredClone(doc);
  change(copy.game.team);
  const res = loadSavedGame(copy);
  check(`accepted: ${name}`, res.ok === true);
  if (res.ok) {
    let thrown = null;
    try { resurrectionAt(res.state.team, T); resurrectionAt(res.state.team, Date.UTC(2100, 0, 1)); } catch (e) { thrown = String(e); }
    check(`view reading does not throw: ${name}`, thrown === null, thrown ?? "");
  }
}
// old version-7 document refused as version
const v7 = structuredClone(doc); v7.version = 7;
check("version 7 refused as version", eq(loadSavedGame(v7), { ok: false, reason: "version" }));

// 11. Settlement variants on a dead run.
let dead = advanceMinutes(send(stateWith(0, null), { mapId: "forest", characterId: 1 }, T).state, 1000).state;
dead = settleDeath(dead, T).state;
const deadDoc = savedGame(withSaveTime(dead, T));
check("dead doc loads", loadSavedGame(deadDoc).ok === true, JSON.stringify(dead.run.deathSettlement));
for (const [name, v, admit] of [["usesLeft 3 (equal)", 3, true], ["usesLeft 2", 2, true], ["usesLeft 0", 0, true], ["usesLeft 4 (above)", 4, false], ["usesLeft 2^53", 2 ** 53, false], ["usesLeft -1", -1, false], ["usesLeft 0.5", 0.5, false], ["usesLeft 2.5", 2.5, false], ["usesLeft NaN", NaN, false], ["usesLeft Infinity", Infinity, false], ["usesLeft -Infinity", -Infinity, false], ["usesLeft null", null, false], ["usesLeft true", true, false], ["usesLeft '1'", "1", false], ["usesLeft []", [], false], ["usesLeft BigInt", 1n, false]]) {
  const copy = structuredClone(deadDoc);
  copy.game.run.deathSettlement.usesLeft = v;
  let res;
  try { res = loadSavedGame(copy); } catch (e) { res = { threw: String(e) }; }
  const ok = admit ? res.ok === true && res.state.run.deathSettlement.usesLeft === v : eq(res, { ok: false, reason: "shape" });
  check(`settlement ${name} ${admit ? "admitted" : "refused"}`, ok, JSON.stringify(res).slice(0, 40));
}
const extraKey = structuredClone(deadDoc); extraKey.game.run.deathSettlement.extra = 1;
check("settlement with an extra key refused", eq(loadSavedGame(extraKey), { ok: false, reason: "shape" }));
const noKey = structuredClone(deadDoc); noKey.game.run.deathSettlement = { kind: "resurrectionUsed" };
check("settlement without usesLeft refused", eq(loadSavedGame(noKey), { ok: false, reason: "shape" }));

writeFileSync(`${process.argv[3]}`, lines.join("\n") + "\n", "utf8");
console.log(`done ${lines.filter((l) => l.startsWith("BAD")).length} bad of ${lines.length}`);
