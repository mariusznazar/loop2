// Probe: the paragraph of an encounter with a turn of „Ucisk” at a health with a fraction.
// Runs the reference program forestBandages on Las — wataha with the branch bought and a bandage
// in a pocket, through the game's own step function, and writes each paragraph of an encounter that
// holds a turn of „Ucisk” to a UTF-8 file.
import { writeFileSync } from "node:fs";
import { mapRunEnded, stepMinute } from "./dist/browser/sim/run.js";
import { combatText } from "./dist/browser/view/combat-line.js";
import {
  buildSkills,
  makeState,
  prerequisitesOf,
  startOf,
} from "./balance/engine.mjs";
import { forestBandages } from "./tests/sim/reference-programs.mjs";

const out = [];
for (let seed = 1; seed <= 40 && out.length < 6; seed += 1) {
  const skills = buildSkills({ ranks: { pressure: 1 } });
  const state = makeState({
    program: forestBandages,
    skills,
    gear: { pocket1: "bandage" },
    chest: { bandage: 4, stick: 8, berry: 7 },
    solvedMaps: prerequisitesOf("forestPack"),
  });
  const started = startOf(state, "forestPack", seed, skills);
  let run = started.run;
  while (!mapRunEnded(run) && run.minute < 4000) {
    const before = run;
    run = stepMinute(run, started.map, started.reduced).run;
    if (before.activeCombat && !run.activeCombat && run.lastCombat?.result) {
      const pressed = run.lastCombat.result.exchanges.some(
        ({ characterAction }) => characterAction?.action.kind === "pressure",
      );
      if (pressed)
        out.push(`seed ${seed} minute ${run.minute}: ${combatText(run.lastCombat)}`);
    }
  }
}
writeFileSync(process.argv[2], out.join("\n") + "\n", "utf8");
console.log(out.length);
