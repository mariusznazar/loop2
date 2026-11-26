import { createCharacter, newGame } from "../../dist/browser/sim/game.js";
import { openJudgingCache } from "../../dist/browser/view/judging-cache.js";
const KEY = "loop2-judging-record-1|a|1000|m";
const state = createCharacter(newGame(1000), "Ala").state;
function run(value) {
  const held = new Map([ [KEY, value] ]);
  const storage = { get length() { return held.size; }, key: (i) => [...held.keys()][i] ?? null, getItem: (k) => held.get(k) ?? null, setItem: (k, v) => held.set(k, v), removeItem: (k) => held.delete(k) };
  const cache = openJudgingCache({ accountId: "a", state: { ...state, madeAtMs: 1000 }, afterRefusedSave: false, storage });
  const got = cache.readRecord("m", { health: 120, strikeDamage: 20 });
  return [Object.is(got, -0) ? "-0" : String(got), typeof got];
}
for (const v of ['{"damage":-0,"health":120,"strikeDamage":20}', '{"damage":2.4e1,"health":1.2e2,"strikeDamage":20}', '{"damage":1,"damage":24,"health":120,"strikeDamage":20}']) console.log(v, run(v).join(" "));
