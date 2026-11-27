import { MAPS } from "../../dist/browser/sim/data/maps.js";
import { newMapRun, stepMinute } from "../../dist/browser/sim/run.js";
import { programFromRules } from "../../tests/sim/program-fixture.mjs";
import { createChronicle } from "../../dist/browser/view/chronicle.js";
const map = MAPS.forestDeep;
const program = programFromRules({ condition: { kind: "always" }, action: { kind: "strikeWithStick" } });
const EMPTY = { mainHand: null, secondHand: null, head: null, torso: null, legs: null, pocket1: null, pocket2: null, pocket3: null };
const NO = { stick: 3, berry: 0, moss: 0, fiber: 0, bandage: 0 };
for (let seed = 1; seed < 200; seed += 1) {
  let run = newMapRun(map, seed, program, { mapId: "forestDeep", characterId: 1 }, undefined, {}, NO, EMPTY).run;
  const all = [];
  for (let i = 0; i < 2000 && !run.completion && !run.death; i += 1) {
    const r = stepMinute(run, map, program);
    run = r.run;
    all.push(...r.events);
    if (all.some((e) => e.kind === "combatEnded")) break;
  }
  if (seed < 4) console.log(seed, run.minute, run.death, all.filter(e=>e.kind==="attacked").length);
  const refills = all.filter((e) => e.kind === "combatExchange" && e.exchange.characterAction?.refill);
  if (refills.length) {
    const chronicle = createChronicle({ run: null });
    chronicle.record({ state: { run }, events: all }, { run: null });
    console.log(seed, JSON.stringify(chronicle.window("all", 10).rows.map((r) => r.kind === "paragraph" ? { p: r.minute } : r.entry)));
    break;
  }
}
