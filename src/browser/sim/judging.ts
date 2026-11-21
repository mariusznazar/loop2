import { newBackpack } from "./character.js";
import { BALANCE } from "./data/balance.js";
import { MAPS } from "./data/maps.js";
import { canSendMap, programOf } from "./game.js";
import { programById } from "./programs.js";
import { mapRunEnded, newMapRun, stepMinute } from "./run.js";
import { sendTake } from "./trip.js";
import type {
  CharacterId,
  GameState,
  Judging,
  MapId,
  MapRun,
  ProgramId,
  SeedResult,
} from "./types.js";

/** How the map run of a judging ended, `undecided` where it neither solved the map nor ended in a death. */
function resultOf(run: MapRun): SeedResult {
  if (run.death) {
    return { kind: "death", cause: run.death.cause, minute: run.death.minute };
  }
  return run.completion ? { kind: "solved" } : { kind: "undecided" };
}

/**
 * Judges the program numbered `ids.programId` for the team's character `ids.characterId` on the map
 * `ids.mapId` (D-439): a map run of that map from each of the data's twelve seeds, in their order, each
 * passed game minute by game minute to its end or to the data's cap, the minute of the cap itself
 * counting, as the balance instrument stops a run. Each map run is an earning loop's: the program
 * reduced to the character's repertoire as the Understanding stands (D-249), the character's skills and
 * traits as they stand, and the take list cut by the chest, the carrying capacity and the map's entry
 * cap, the same for all twelve. It is no map run of the character: nothing leaves the chest, nothing is
 * paid, no death is settled, nothing is discovered and no rule is written, and no seed is drawn. The
 * character may be in an earning loop or in the manual map run; neither is touched. Throws an Error
 * on a map the data lacks or the player may not enter yet, a character the team lacks and a program
 * not on the list, as `send` does. Inputs stay unchanged.
 */
export function judgeOnSeeds(
  state: GameState,
  ids: { mapId: MapId; characterId: CharacterId; programId: ProgramId },
): Judging {
  const { mapId, characterId, programId } = ids;
  if (typeof mapId !== "string" || !Object.hasOwn(MAPS, mapId))
    throw new Error(`judgeOnSeeds: no map ${String(mapId)}`);
  if (!canSendMap(state.solvedMaps, mapId))
    throw new Error(`judgeOnSeeds: map ${mapId} is not available`);
  const character = state.team.characters.find(
    (listed) => listed.id === characterId,
  );
  if (!character)
    throw new Error(
      `judgeOnSeeds: no character ${String(characterId)} in the team`,
    );
  const chosen = programById(state.programs, programId);
  if (!chosen)
    throw new Error(
      `judgeOnSeeds: no program ${String(programId)} on the list`,
    );
  const map = MAPS[mapId];
  const equipment = sendTake(
    chosen.program.tripPlan,
    state.team.chest,
    character.traits.carryingCapacity,
    map,
  );
  const backpack = newBackpack();
  for (const { item, count } of equipment) backpack[item] = count;
  const program = programOf(
    state,
    chosen.program,
    character.id,
    character.skills,
  );
  const results = BALANCE.judgingSeeds.map((seed): SeedResult => {
    let run = newMapRun(
      map,
      seed,
      program,
      { mapId, characterId: character.id },
      { ...character.traits },
      character.skills,
      backpack,
    ).run;
    while (!mapRunEnded(run) && run.minute < BALANCE.judgingCapMinutes)
      run = stepMinute(run, map, program).run;
    return resultOf(run);
  });
  return { results, equipment };
}
