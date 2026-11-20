// Reviewer's probe of slice 7: hostile documents of version 8 against the team's uses and a death's
// uses left, beyond those the test file and the earlier probe hold.
// Run: node probe.mjs <worktree root with a build> <output file>
import { pathToFileURL } from "node:url";
import { writeFileSync } from "node:fs";

const root = process.argv[2];
const game = await import(pathToFileURL(`${root}/dist/browser/sim/game.js`).href);
const saved = await import(pathToFileURL(`${root}/dist/browser/sim/saved-game.js`).href);
const fixture = await import(pathToFileURL(`${root}/tests/sim/understanding-fixture.mjs`).href);
const { createCharacter, send, withSaveTime, settleDeath, advanceMinutes } = game;
const { loadSavedGame, savedGame } = saved;

const T = 1_760_000_000_000;
const lines = [];
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const SHAPE = { ok: false, reason: "shape" };
const attempt = (document) => {
  try {
    return loadSavedGame(document);
  } catch (error) {
    return { threw: String(error) };
  }
};
const expect = (name, document, admit) => {
  const result = attempt(document);
  const ok = admit ? result.ok === true : eq(result, SHAPE);
  lines.push(`${ok ? "OK " : "BAD"} ${admit ? "admitted" : "refused"}: ${name} -> ${JSON.stringify(result).slice(0, 60)}`);
};

let base = fixture.withEdgeSolved(fixture.newKnowingGame());
base = createCharacter(base, "A").state;
const [a] = base.team.characters;
const practised = { ...a, skills: { ...a.skills, eating: { practice: 3, ranks: {} } } };
const state = (spent, next) => ({
  ...base,
  team: { ...base.team, characters: [practised], resurrectionUsesSpent: spent, resurrectionNextReturnAtMs: next },
});
const doc = savedGame(withSaveTime(state(2, T), T));
expect("baseline, two spent", structuredClone(doc), true);

const teamCase = (name, change, admit = false) => {
  const copy = structuredClone(doc);
  change(copy.game.team);
  expect(`team ${name}`, copy, admit);
};
teamCase("spent -0 with no moment", (t) => { t.resurrectionUsesSpent = -0; t.resurrectionNextReturnAtMs = null; }, true);
teamCase("spent -0 with a moment", (t) => { t.resurrectionUsesSpent = -0; });
teamCase("moment -0 with two spent", (t) => { t.resurrectionNextReturnAtMs = -0; }, true);
teamCase("spent '3' as text", (t) => { t.resurrectionUsesSpent = "3"; });
teamCase("spent 3.0000000000000004", (t) => { t.resurrectionUsesSpent = 3.0000000000000004; });
teamCase("spent 2.9999999999999996", (t) => { t.resurrectionUsesSpent = 2.9999999999999996; });
teamCase("spent Number.MAX_SAFE_INTEGER", (t) => { t.resurrectionUsesSpent = Number.MAX_SAFE_INTEGER; });
teamCase("spent Number.MIN_SAFE_INTEGER", (t) => { t.resurrectionUsesSpent = Number.MIN_SAFE_INTEGER; });
teamCase("spent undefined", (t) => { t.resurrectionUsesSpent = undefined; });
teamCase("spent new Number(2)", (t) => { t.resurrectionUsesSpent = new Number(2); });
teamCase("moment new Number(T)", (t) => { t.resurrectionNextReturnAtMs = new Number(T); });
teamCase("moment BigInt", (t) => { t.resurrectionNextReturnAtMs = BigInt(T); });
teamCase("moment [T]", (t) => { t.resurrectionNextReturnAtMs = [T]; });
teamCase("moment {}", (t) => { t.resurrectionNextReturnAtMs = {}; });
teamCase("moment true", (t) => { t.resurrectionNextReturnAtMs = true; });
teamCase("moment 'null' as text", (t) => { t.resurrectionNextReturnAtMs = "null"; });
teamCase("moment missing, spent 0", (t) => { t.resurrectionUsesSpent = 0; delete t.resurrectionNextReturnAtMs; });
teamCase("moment undefined, spent 0", (t) => { t.resurrectionUsesSpent = 0; t.resurrectionNextReturnAtMs = undefined; });
teamCase("moment as an inherited key", (t) => { delete t.resurrectionNextReturnAtMs; Object.setPrototypeOf(t, { resurrectionNextReturnAtMs: T }); });
teamCase("spent as a getter", (t) => { delete t.resurrectionUsesSpent; Object.defineProperty(t, "resurrectionUsesSpent", { get: () => 2, enumerable: true }); });
teamCase("a symbol key added", (t) => { t[Symbol("x")] = 1; });
teamCase("own __proto__ key added", (t) => { Object.defineProperty(t, "__proto__", { value: {}, enumerable: true, writable: true, configurable: true }); });
teamCase("old key with value null beside", (t) => { t.resurrectionReadyAtMs = null; });
teamCase("keys reordered", (t) => {
  const { resurrectionUsesSpent: s, resurrectionNextReturnAtMs: n, characters, chest } = t;
  for (const k of Object.keys(t)) delete t[k];
  Object.assign(t, { resurrectionNextReturnAtMs: n, chest, resurrectionUsesSpent: s, characters });
}, true);
teamCase("team as a list", (t) => { Object.setPrototypeOf(t, Array.prototype); });
teamCase("spent 3, moment MAX_SAFE", (t) => { t.resurrectionUsesSpent = 3; t.resurrectionNextReturnAtMs = Number.MAX_SAFE_INTEGER; }, true);
teamCase("spent 1, moment MIN_SAFE", (t) => { t.resurrectionUsesSpent = 1; t.resurrectionNextReturnAtMs = Number.MIN_SAFE_INTEGER; }, true);

// A death of a character with practice, settled by the game, then its settlement crafted.
let dead = advanceMinutes(send(state(0, null), { mapId: "forest", characterId: 1 }, T).state, 1000).state;
dead = settleDeath(dead, T).state;
const deadDoc = savedGame(withSaveTime(dead, T));
expect(`the game's own death (${JSON.stringify(dead.run.deathSettlement)})`, structuredClone(deadDoc), true);
const settlementCase = (name, settlement, admit = false) => {
  const copy = structuredClone(deadDoc);
  copy.game.run.deathSettlement = settlement;
  expect(`settlement ${name}`, copy, admit);
};
settlementCase("usesLeft -0", { kind: "resurrectionUsed", usesLeft: -0 }, true);
settlementCase("usesLeft undefined", { kind: "resurrectionUsed", usesLeft: undefined });
settlementCase("usesLeft new Number(1)", { kind: "resurrectionUsed", usesLeft: new Number(1) });
settlementCase("usesLeft 3.0000000000000004", { kind: "resurrectionUsed", usesLeft: 3.0000000000000004 });
settlementCase("usesLeft Infinity", { kind: "resurrectionUsed", usesLeft: Infinity });
settlementCase("usesLeft MAX_SAFE", { kind: "resurrectionUsed", usesLeft: Number.MAX_SAFE_INTEGER });
settlementCase("usesLeft {}", { kind: "resurrectionUsed", usesLeft: {} });
settlementCase("usesLeft on noPractice", { kind: "noPractice", usesLeft: 2 });
settlementCase("usesLeft on progressLost", { kind: "progressLost", generation: 2, usesLeft: 0 });
settlementCase("kind missing, usesLeft 2", { usesLeft: 2 });
settlementCase("kind 'resurrectionUsed ' with a space", { kind: "resurrectionUsed ", usesLeft: 2 });
settlementCase("usesLeft as a getter", Object.defineProperty({ kind: "resurrectionUsed" }, "usesLeft", { get: () => 1, enumerable: true }));
settlementCase("usesLeft inherited", Object.assign(Object.create({ usesLeft: 1 }), { kind: "resurrectionUsed" }));
settlementCase("usesLeft 2 (the game wrote 2)", { kind: "resurrectionUsed", usesLeft: 2 }, true);

// The saved document of the game's own state round-trips through JSON and loads equal.
const fromJson = JSON.parse(JSON.stringify(deadDoc));
const loaded = attempt(fromJson);
let same = false; try { (await import("node:assert/strict")).deepEqual(loaded.state, { ...dead, saveTimeMs: T }); same = true; } catch (error) { lines.push(String(error.message).slice(0, 600)); }
lines.push(`${loaded.ok && same ? "OK " : "BAD"} the game state of its own death round-trips through JSON into the state, compared deeply`);

writeFileSync(process.argv[3], lines.join("\n") + "\n", "utf8");
console.log(`done ${lines.filter((line) => line.startsWith("BAD")).length} bad of ${lines.length}`);
