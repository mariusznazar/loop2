import { newBackpack } from "./character.js";
import { BALANCE } from "./data/balance.js";
import { MAPS } from "./data/maps.js";
import { canSendMap, programOf, type GameResult } from "./game.js";
import {
  recordOfJudging,
  withRememberedJudging,
  type JudgingRecord,
} from "./judging-record.js";
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

/**
 * The act of a judging (D-440): the judging `judgeOnSeeds` gives for `ids`, with the twelve results as
 * they are, cause and game minute included, and the game state in which it replaces the judging
 * remembered for its character, program and map, in the kinds and the equipment the game state holds
 * (`rememberedOf`). Nothing else of the game state changes, for a judging is no send (D-170, D-243) and no
 * map run of the character (D-439): not the clock, the last seed, the chest, a character, the pick of the
 * list „Program:”, the program used last, a map run or an earning loop. It passes no game time and takes no
 * real moment; the store that runs it counts the time first (D-409). Throws as `judgeOnSeeds` does.
 */
export function judgeAndRemember(
  state: GameState,
  ids: { mapId: MapId; characterId: CharacterId; programId: ProgramId },
): GameResult & { judging: Judging } {
  const judging = judgeOnSeeds(state, ids);
  return {
    state: {
      ...state,
      judgings: withRememberedJudging(state.judgings, ids, judging),
    },
    events: [],
    judging,
  };
}

/**
 * The act of a judging for the browser's memory (D-441, D-440): the judging `judgeOnSeeds` gives for `ids`,
 * with twelve results as they are, cause and game minute included, and its record, both made from the one
 * game state it read. The game state is left the very state it got: a judging is no send (D-170, D-243) and
 * no map run of the character (D-439), and nothing of it enters the game state (D-441). It passes no game
 * time and takes no real moment; the store that runs it counts the time first (D-409). Throws as
 * `judgeOnSeeds` does.
 */
export function judgeAndRecord(
  state: GameState,
  ids: { mapId: MapId; characterId: CharacterId; programId: ProgramId },
): GameResult & { judging: Judging; record: JudgingRecord } {
  const judging = judgeOnSeeds(state, ids);
  return {
    state,
    events: [],
    judging,
    record: recordOfJudging(state, ids, judging),
  };
}
