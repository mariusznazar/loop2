import assert from "node:assert/strict";
import { SKILLS } from "../../dist/browser/sim/data/skills.js";
import { practiced } from "../../dist/browser/sim/skills.js";
import { repertoireOf, discover } from "../../dist/browser/sim/understanding.js";
import { ITEMS } from "../../dist/browser/sim/data/items.js";
ITEMS.pestle = { ...ITEMS.bandage };
SKILLS.probe = { name: "Probe", grownBy: [{ action: "craft", item: "bandage" }, { action: "tend", item: "bandage" }], thresholds: [1] };
assert.deepEqual(practiced({}, "craft", "bandage"), { probe: 1 });
assert.deepEqual(practiced({}, "craft", "pestle"), {});
assert.deepEqual(practiced({}, "craft"), {});
assert.deepEqual(practiced({}, "tend", "bandage"), { probe: 1 });
const u = { actions: ["craft", "tend", "explore"], conditions: [], items: ["bandage"], creatures: [], trees: [] };
const without = repertoireOf(u, ["exploration"]);
// craft stays (pair craft+pestle is grown by no skill), tend has pairs bandage and pestle, pestle also free -> stays
assert.deepEqual([...without.actions].sort(), ["craft", "explore", "tend"]);
delete ITEMS.pestle;
const w2 = repertoireOf(u, ["exploration"]);
assert.deepEqual([...w2.actions].sort(), ["explore"]);
assert.deepEqual([...repertoireOf(u, ["exploration", "probe"]).actions].sort(), ["craft", "explore", "tend"]);
console.log("probe ok");
const mk = (bp) => ({ body: { temperature: 20 }, character: { backpack: bp }, campfires: [], tiles: [], practice: {}, death: undefined });
const ev = (action) => [{ kind: "activityFinished", minute: 1, activity: { kind: "rule", action } }];
const base = { conditions: [], creatures: [] };
const before = mk({ bandage: 0 }), after = mk({ bandage: 1 });
// verb held, item new: item "bandage" revealed by the crafted event? check what is revealed
const r1 = discover({ ...base, actions: ["craft"], items: [], trees: [] }, before, after, ev({ kind: "craft", item: "bandage" }));
console.log("item new:", JSON.stringify(r1 && r1.revealed));
const r2 = discover({ ...base, actions: ["craft"], items: ["bandage"], trees: [] }, before, after, ev({ kind: "craft", item: "bandage" }));
console.log("both held, none new:", JSON.stringify(r2 && r2.revealed));
