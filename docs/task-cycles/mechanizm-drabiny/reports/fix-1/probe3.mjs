import { seedRange } from "../../balance/engine.mjs";
import { measureProgression } from "../../balance/progression.mjs";
import { REFERENCE_PROGRAMS } from "../../tests/sim/reference-programs.mjs";
const map = process.argv[2];
const a = Number(process.argv[3]), b = Number(process.argv[4]);
const t0 = performance.now();
const { maps } = measureProgression({ mapIds: ["forestEdge","forest","forestDeep","forestDeep2","forestDeep3", map], seeds: seedRange(a, b), programIds: Object.keys(REFERENCE_PROGRAMS) });
console.log("ms", Math.round(performance.now() - t0));
for (const m of maps) console.log(m.mapId, "best", m.bestProgramId, m.bestShare, "in.sig", m.practiceIn.smallItemGathering, "paid.sig", m.practicePaid.smallItemGathering, "withOpener", m.withOpenerShare);
