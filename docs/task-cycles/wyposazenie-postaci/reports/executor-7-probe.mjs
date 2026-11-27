// Probe of the own-work check: the first wolf attack reveals "equip" through the data's revelation.
import { discover, newUnderstanding } from "../../dist/browser/sim/understanding.js";
import { newMapRun } from "../../dist/browser/sim/run.js";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
const { run } = newMapRun(MAPS.forestDeep, 3, { groups: [], tripPlan: { take: [], bring: [] }, nextGroupId: 1, nextRuleId: 1 }, { mapId: "forestDeep", characterId: 1 });
const found = discover(newUnderstanding(), run, run, [{ kind: "attacked", minute: 181, creature: "wolf" }]);
console.log(JSON.stringify(found.revealed));
const second = discover(found.understanding, run, run, [{ kind: "attacked", minute: 400, creature: "wolf" }]);
console.log(second === null ? "second attack reveals nothing" : "second reveals " + JSON.stringify(second.revealed));
