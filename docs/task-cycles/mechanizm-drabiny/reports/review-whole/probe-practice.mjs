// Probe: for each map with an opener, compare the skills and chest the best program of the map gets
// from the map's own chain and from the opener's character. Run from the root of the head worktree:
// node ../probe-practice.mjs <seedsTo>
import { measureProgression, skillsFor, stockFor } from "./head/balance/progression.mjs";
import { seedRange, prerequisitesOf } from "./head/balance/engine.mjs";
import { MAPS } from "./head/dist/browser/sim/data/maps.js";
import { REFERENCE_PROGRAMS } from "./head/tests/sim/reference-programs.mjs";
import { writeFileSync } from "node:fs";

const to = Number(process.argv[2] ?? 40);
const { maps } = measureProgression({ seeds: seedRange(1, to) });
const byId = new Map(maps.map((m) => [m.mapId, m]));
const lines = [];
for (const map of maps) {
  const opener = MAPS[map.mapId].opensAfter;
  if (opener === undefined) continue;
  const program = REFERENCE_PROGRAMS[map.bestProgramId];
  const ownSkills = skillsFor(program, map.practiceIn);
  const openerSkills = skillsFor(program, byId.get(opener).practiceIn);
  const cand = (ids) =>
    ids.map((id) => ({ mapId: id, program: REFERENCE_PROGRAMS[byId.get(id).bestProgramId] }));
  const ownStock = stockFor({ take: program.tripPlan.take, candidates: cand(prerequisitesOf(map.mapId)), practice: map.practiceIn });
  const openerStock = stockFor({ take: program.tripPlan.take, candidates: cand(prerequisitesOf(opener)), practice: byId.get(opener).practiceIn });
  lines.push(
    [
      map.mapId,
      `best=${map.bestLabel} own=${map.bestShare} withOpener=${map.withOpenerShare} openerBest=${map.openerBestShare}`,
      `sameSkills=${JSON.stringify(ownSkills) === JSON.stringify(openerSkills)}`,
      `sameChest=${JSON.stringify(ownStock.chest) === JSON.stringify(openerStock.chest)}`,
      `practiceOwn=${JSON.stringify(map.practiceIn)}`,
      `practiceOpener=${JSON.stringify(byId.get(opener).practiceIn)}`,
    ].join(" | "),
  );
}
writeFileSync(process.argv[3] ?? "../probe-practice.out.txt", lines.join("\n") + "\n");
console.log(lines.length);
