// Prints, for every map of the game on seeds 1-8 and every reference program, the practice each
// opener was measured with and the ranks each program buys from it, to see whether any opener's
// practice buys a rank that the comparison of D-448 would use.
import { seedRange } from "../../balance/engine.mjs";
import { measureProgression, skillsFor } from "../../balance/progression.mjs";
import { REFERENCE_PROGRAMS } from "../../tests/sim/reference-programs.mjs";

const { maps } = measureProgression({ seeds: seedRange(1, 8) });
const byId = new Map(maps.map((map) => [map.mapId, map]));
for (const map of maps) {
  const opener = map.opener ? byId.get(map.opener) : null;
  const ranks = opener
    ? Object.keys(REFERENCE_PROGRAMS)
        .map((id) => {
          const skills = skillsFor(REFERENCE_PROGRAMS[id], opener.practiceIn);
          const bought = Object.values(skills).flatMap((skill) =>
            Object.entries(skill.ranks).filter(([, rank]) => rank > 0),
          );
          return bought.length ? `${id}:${JSON.stringify(bought)}` : null;
        })
        .filter(Boolean)
    : [];
  console.log(
    map.mapId,
    "best",
    map.bestProgramId,
    "practiceIn",
    JSON.stringify(map.practiceIn),
    "opener",
    map.opener,
    "openerPracticeIn",
    opener ? JSON.stringify(opener.practiceIn) : "-",
    "ranksFromOpener",
    ranks.length ? ranks.join(" ") : "none",
    "withOpener",
    map.withOpenerShare,
  );
}
