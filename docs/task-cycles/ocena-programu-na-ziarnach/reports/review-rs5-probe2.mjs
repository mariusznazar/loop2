// Reviewer's probe: random sequences of completions and covered deaths through the three drivers,
// against an oracle written from D-241 (in a row = completions since the last death; record = the
// largest such number), and each state's own save loading back into it.
import { isDeepStrictEqual } from "node:util";
import { createCharacter, withSaveTime } from "./wt/dist/browser/sim/game.js";
import { advanceLoopRun, catchUp, endLoopRun, passLoops, startLoop } from "./wt/dist/browser/sim/loop.js";
import { loadSavedGame, savedGame } from "./wt/dist/browser/sim/saved-game.js";
import { newKnowingGame } from "./wt/tests/sim/understanding-fixture.mjs";

const T0 = 1_760_000_000_000;
const MIN = 60_000;
const practised = (skills) => Object.fromEntries(Object.entries(skills).map(([id, s]) => [id, { ...s, practice: 1 }]));
let g = createCharacter(newKnowingGame(), "Ala").state;
g = { ...g, solvedMaps: ["forestEdge", "forest"], team: { ...g.team, characters: g.team.characters.map((c) => ({ ...c, skills: practised(c.skills) })) } };
const start = startLoop(g, { mapId: "forest", characterId: 1 }, T0).state;
const changingRun = (s, change) => ({ ...s, loops: { ...s.loops, 1: { ...s.loops[1], run: { ...s.loops[1].run, ...change } } } });
const oneShort = (s) => changingRun(s, { body: { temperature: 37, satiety: 100, health: 100 }, streak: 479, current: { activity: { kind: "rule", ruleId: 1, action: { kind: "explore" } }, startMinute: s.loops[1].run.minute, endMinute: s.loops[1].run.minute + 1, stepTo: null } });
const dying = (s) => changingRun({ ...s, team: { ...s.team, resurrectionUsesSpent: 0, resurrectionNextReturnAtMs: null } }, { body: { temperature: 30, satiety: 100, health: 0.1 } });
const drivers = {
  end: (p) => endLoopRun(advanceLoopRun(p, 1, 1).state, 1, T0).state,
  pass: (p) => passLoops(p, T0, T0 + MIN).state,
  catchUp: (p) => catchUp(withSaveTime(p, T0), T0 + MIN).state,
};
let seed = 12345;
const rnd = () => ((seed = (seed * 1103515245 + 12345) % 2 ** 31) / 2 ** 31);
let bad = 0;
let steps = 0;
for (let trial = 0; trial < 40; trial += 1) {
  const seq = Array.from({ length: 12 }, () => (rnd() < 0.7 ? "C" : "D"));
  for (const [name, drive] of Object.entries(drivers)) {
    let s = start;
    let row = 0;
    let rec = 0;
    let done = 0;
    for (const k of seq) {
      s = drive(k === "C" ? oneShort(s) : dying(s));
      steps += 1;
      if (k === "C") { row += 1; done += 1; rec = Math.max(rec, row); } else row = 0;
      const l = s.loops[1];
      if (!l || l.inARow !== row || l.loopRecord !== rec || l.completed !== done) {
        bad += 1;
        console.log(`BAD ${name} ${seq.join("")} got ${l && [l.inARow, l.loopRecord, l.completed]} want ${[row, rec, done]}`);
        break;
      }
      const stamped = withSaveTime(s, T0);
      const r = loadSavedGame(JSON.parse(JSON.stringify(savedGame(stamped))));
      if (!r.ok || !isDeepStrictEqual(r.state, stamped)) { bad += 1; console.log(`BAD load ${name}`); break; }
    }
  }
}
console.log(`steps ${steps} bad ${bad}`);
