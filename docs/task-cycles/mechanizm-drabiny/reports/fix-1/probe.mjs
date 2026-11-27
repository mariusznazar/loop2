import { buildSkills, seedRange, sweep } from "../../balance/engine.mjs";
import { measureProgression, skillsFor } from "../../balance/progression.mjs";
import { REFERENCE_PROGRAMS } from "../../tests/sim/reference-programs.mjs";

const SEEDS = seedRange(1, 8);
const programIds = process.argv.slice(3);
const target = process.argv[2];
const t0 = performance.now();
const { maps } = measureProgression({ mapIds: [target], seeds: SEEDS, programIds });
const t1 = performance.now();
const map = maps[0];
console.log("ms", Math.round(t1 - t0));
console.log("opener", map.opener, "openerBest", map.openerBestShare, "withOpener", map.withOpenerShare, "own", map.bestShare, "harder", map.harder);
const res = measureProgression({ mapIds: [map.opener], seeds: SEEDS, programIds });
const op = res.maps[0];
console.log("opener practiceIn", JSON.stringify(op.practiceIn));
for (const id of programIds) {
  const program = REFERENCE_PROGRAMS[id];
  const orow = res.rows.find((r) => r.programId === id);
  const real = sweep({ mapId: target, program, seeds: SEEDS, skills: skillsFor(program, op.practiceIn), chest: orow.stock.chest }).summary.solvedShare;
  const noPractice = sweep({ mapId: target, program, seeds: SEEDS, skills: skillsFor(program, {}), chest: orow.stock.chest }).summary.solvedShare;
  const noStock = sweep({ mapId: target, program, seeds: SEEDS, skills: skillsFor(program, op.practiceIn), chest: {} }).summary.solvedShare;
  const fresh = sweep({ mapId: target, program, seeds: SEEDS, skills: buildSkills(), chest: {} }).summary.solvedShare;
  console.log(id, "real", real, "noPractice", noPractice, "noStock", noStock, "fresh", fresh, "stock", JSON.stringify(orow.stock.chest), orow.stock.complete);
}
