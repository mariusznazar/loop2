// Reviewer's probes of the load of an earning loop's two counts at the head (slice 5).
import { createCharacter, withSaveTime } from "./wt/dist/browser/sim/game.js";
import {
  startLoop,
  catchUp,
  passLoops,
  advanceLoopRun,
  endLoopRun,
} from "./wt/dist/browser/sim/loop.js";
import { loadSavedGame, savedGame } from "./wt/dist/browser/sim/saved-game.js";
import { newKnowingGame } from "./wt/tests/sim/understanding-fixture.mjs";
import { writeFileSync } from "node:fs";
import { isDeepStrictEqual } from "node:util";

const T0 = 1_760_000_000_000;
const out = [];
let bad = 0;
const note = (ok, line) => {
  if (!ok) bad += 1;
  out.push(`${ok ? "ok  " : "BAD "} ${line}`);
};

let s = createCharacter(newKnowingGame(), "Ala").state;
s = createCharacter(s, "Ola").state;
s = { ...s, solvedMaps: ["forestEdge", "forest"] };
s = startLoop(s, { mapId: "forest", characterId: 1 }, T0).state;
s = startLoop(s, { mapId: "forest", characterId: 2 }, T0).state;
// Let the game itself run a long while: completions and deaths of its own making.
let cur = withSaveTime(s, T0);
const seen = new Set();
for (let hour = 1; hour <= 400; hour += 1) {
  const passed = passLoops(cur, T0 + (hour - 1) * 3_600_000, T0 + hour * 3_600_000).state;
  cur = withSaveTime(passed, T0 + hour * 3_600_000);
  const doc = JSON.parse(JSON.stringify(savedGame(cur)));
  const loaded = loadSavedGame(doc);
  const same = loaded.ok && isDeepStrictEqual(loaded.state, cur);
  if (!same) note(false, `own save of hour ${hour} did not load into the same state: ok=${loaded.ok}`);
  for (const [id, loop] of Object.entries(cur.loops))
    seen.add(`${id}:${loop.inARow}/${loop.loopRecord}/${loop.completed}`);
}
note(true, `open game 400 h: distinct counts seen ${seen.size}; last loops ${JSON.stringify(Object.fromEntries(Object.entries(cur.loops).map(([k, l]) => [k, [l.inARow, l.loopRecord, l.completed, l.runNumber]])))}`);
// The catch-up over the same span gives the same counts (catch-up-state, D-241 'alike').
const caught = catchUp(withSaveTime(s, T0), T0 + 400 * 3_600_000).state;
const counts = (st) => JSON.stringify(Object.fromEntries(Object.entries(st.loops).map(([k, l]) => [k, [l.inARow, l.loopRecord, l.completed]])));
note(true, `catch-up 400 h counts ${counts(caught)}; open game ${counts(cur)}`);
const caughtDoc = JSON.parse(JSON.stringify(savedGame(withSaveTime(caught, T0 + 400 * 3_600_000))));
note(loadSavedGame(caughtDoc).ok, "catch-up's own save loads");

// Crafted documents changed at one place.
const base = JSON.parse(JSON.stringify(savedGame(cur)));
const anyLoop = Object.keys(base.game.loops)[0];
const crafted = (name, change) => {
  const d = structuredClone(base);
  change(d.game.loops[anyLoop]);
  let r;
  try {
    r = loadSavedGame(d);
  } catch (e) {
    note(false, `${name}: THREW ${e && e.name}`);
    return;
  }
  note(r.ok === false && r.reason === "shape", `${name}: ${JSON.stringify(r).slice(0, 60)}`);
};
const values = [-1, -0.5, 0.5, 1.5, 2 ** 53, Number.MAX_SAFE_INTEGER + 1, 1e308, "2", true, null, [], {}, [2], -1e-9];
for (const key of ["inARow", "loopRecord"])
  for (const v of values) crafted(`${key}=${JSON.stringify(v)}`, (l) => { l[key] = v; });
crafted("inARow above record", (l) => { l.inARow = l.loopRecord + 1; });
crafted("record below inARow by setting record", (l) => { l.inARow = 3; l.loopRecord = 2; });
crafted("missing inARow", (l) => { delete l.inARow; });
crafted("missing loopRecord", (l) => { delete l.loopRecord; });
crafted("foreign key", (l) => { l.best = 1; });
crafted("accessor inARow", (l) => { const v = l.inARow; delete l.inARow; Object.defineProperty(l, "inARow", { get: () => v, enumerable: true }); });
crafted("inherited inARow", (l) => { const v = l.inARow; delete l.inARow; Object.setPrototypeOf(l, { inARow: v }); });
{
  const d = structuredClone(base);
  const text = JSON.stringify(d.game.loops[anyLoop]);
  d.game.loops[anyLoop] = JSON.parse(`{"__proto__":{"inARow":0},${text.slice(1)}`);
  let r; try { r = loadSavedGame(d); } catch (e) { r = `THREW ${e.name}`; }
  note(r.ok === false && r.reason === "shape", `own __proto__ key beside: ${JSON.stringify(r)}`);
}
{
  const d = structuredClone(base);
  const l = d.game.loops[anyLoop];
  const { inARow, ...rest } = l;
  d.game.loops[anyLoop] = JSON.parse(`{"__proto__":${JSON.stringify({ inARow })},${JSON.stringify(rest).slice(1)}`);
  let r; try { r = loadSavedGame(d); } catch (e) { r = `THREW ${e.name}`; }
  note(r.ok === false && r.reason === "shape", `inARow only under own __proto__ key: ${JSON.stringify(r)}`);
}
// Admitted though the game cannot make them (record above completions; -0).
const admitted = (name, change) => {
  const d = structuredClone(base);
  change(d.game.loops[anyLoop]);
  const r = loadSavedGame(d);
  out.push(`info ${name}: ${JSON.stringify(r).slice(0, 40)}`);
};
admitted("record above completed (completed 0, record 999, inARow 999, runNumber kept)", (l) => { l.loopRecord = 999; l.inARow = 999; });
admitted("inARow -0", (l) => { l.inARow = -0; });
out.push(`bad ${bad}`);
writeFileSync(new URL("./probe-out.txt", import.meta.url), out.join("\n") + "\n");
console.log(`bad ${bad} lines ${out.length}`);
