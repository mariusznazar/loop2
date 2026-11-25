// Probe (working copy, not committed): per seed of a map, the result and the most health a fight took from the creature.
import { createCharacter, programOf } from "../../dist/browser/sim/game.js";
import { editProgram } from "../../dist/browser/sim/programs.js";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import { CREATURES } from "../../dist/browser/sim/data/creatures.js";
import { BALANCE } from "../../dist/browser/sim/data/balance.js";
import { mapRunEnded, newMapRun, stepMinute } from "../../dist/browser/sim/run.js";
import { takeTrip } from "../../dist/browser/sim/trip.js";
import { newKnowingGame } from "../../tests/sim/understanding-fixture.mjs";
import { REFERENCE_PROGRAMS } from "../../tests/sim/reference-programs.mjs";

function game(program) {
  let state = createCharacter(newKnowingGame(), "Ala").state;
  state = createCharacter(state, "Ola").state;
  state = editProgram(state, 1, program).state;
  return { ...state, solvedMaps: ["forestEdge", "forest"], team: { ...state.team, chest: { pieces: {} } } };
}

const names = process.argv.slice(2);
const mapId = process.env.MAP ?? "forestDeep";
for (const name of names) {
  const state = game(REFERENCE_PROGRAMS[name]);
  const saved = state.programs.find((listed) => listed.id === 1);
  const character = state.team.characters[0];
  const map = MAPS[mapId];
  const program = programOf(state, saved.program, character.id, character.skills);
  const equipment = takeTrip(saved.program.tripPlan, state.team.chest, character.traits.carryingCapacity, map);
  const line = [];
  for (const seed of BALANCE.judgingSeeds) {
    let run = newMapRun(map, seed, program, { mapId, characterId: character.id }, { ...character.traits }, character.skills, equipment.backpack).run;
    let most = 0;
    let fights = [];
    while (!mapRunEnded(run) && run.minute < BALANCE.judgingCapMinutes) {
      const before = run.lastCombat;
      run = stepMinute(run, map, program).run;
      if (run.lastCombat !== before && run.lastCombat) fights.push(`${run.lastCombat.result ? run.lastCombat.result.outcome + ":" + (CREATURES[run.lastCombat.creatureId].health - run.lastCombat.result.creatureHealth) : "open"}`);
      if (run.lastCombat?.result) most = Math.max(most, CREATURES[run.lastCombat.creatureId].health - run.lastCombat.result.creatureHealth);
    }
    const kind = run.death ? `death:${run.death.cause}@${run.death.minute}` : run.completion ? "solved" : "undecided";
    line.push(`${seed} ${kind} most=${most} fights=[${fights.join(" ")}]`);
  }
  console.log(`== ${name} on ${mapId}`);
  console.log(line.join("\n"));
}
