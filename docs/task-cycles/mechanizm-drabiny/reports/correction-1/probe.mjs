// Probe: which programs and which start practice make the comparison of Las — głębiej with Las depend
// on both the opener's practice and the stock of the maps before it. Run from the worktree root:
// node .runs/correction-1/probe.mjs <output file>
import { writeFileSync } from "node:fs";
import { seedRange, sweep } from "../../balance/engine.mjs";
import { measureProgression, skillsFor } from "../../balance/progression.mjs";
import { REFERENCE_PROGRAMS } from "../../tests/sim/reference-programs.mjs";

const SEEDS = seedRange(1, 8);
const lines = [];
for (const [programIds, practice] of [
  [["forestBest", "forestDeepSettledPatrol"], { smallItemGathering: 160 }],
  [["forestBest", "forestDeepSettledPatrol"], {}],
  [["forestDeepSettledPatrol"], { smallItemGathering: 160 }],
]) {
  const { rows, maps } = measureProgression({
    mapIds: ["forest", "forestDeep"],
    seeds: SEEDS,
    programIds,
    practice,
  });
  const forest = maps.find((m) => m.mapId === "forest");
  const deep = maps.find((m) => m.mapId === "forestDeep");
  lines.push(`programs ${programIds.join(",")} practice ${JSON.stringify(practice)}`);
  lines.push(`  forest practiceIn ${JSON.stringify(forest.practiceIn)} best ${forest.bestProgramId} ${forest.bestShare}`);
  lines.push(`  deep practiceIn ${JSON.stringify(deep.practiceIn)} best ${deep.bestProgramId} ${deep.bestShare}`);
  lines.push(`  deep withOpenerShare ${deep.withOpenerShare} openerBestShare ${deep.openerBestShare} harder ${deep.harder}`);
  for (const programId of programIds) {
    const stock = rows.find((r) => r.mapId === "forest" && r.programId === programId).stock.chest;
    const share = (practiceIn, chest) =>
      sweep({
        mapId: "forestDeep",
        program: REFERENCE_PROGRAMS[programId],
        seeds: SEEDS,
        skills: skillsFor(REFERENCE_PROGRAMS[programId], practiceIn),
        chest,
      }).summary.solvedShare;
    lines.push(
      `  ${programId} stock ${JSON.stringify(stock)} both ${share(forest.practiceIn, stock)} noPractice ${share({}, stock)} noStock ${share(forest.practiceIn, {})} neither ${share({}, {})}`,
    );
  }
}
writeFileSync(process.argv[2], `${lines.join("\n")}\n`, "utf8");
