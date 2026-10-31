import { MAPS } from "./data/maps.js";
import {
  characterAfterDeath,
  programOf,
  type GameEvent,
  type GameResult,
} from "./game.js";
import { programById, rowProgram } from "./programs.js";
import { mixSeed, nextSeed } from "./random.js";
import { mapRunEnded, newMapRun, stepMinute } from "./run.js";
import { paidPractice, sumPractice } from "./skills.js";
import { takeTrip, tripLoot } from "./trip.js";
import type {
  Character,
  CharacterId,
  Chest,
  EarningLoop,
  GameState,
  MapId,
  MapRun,
  Program,
  ProgramId,
} from "./types.js";

/** What `advanceLoopRun` returns: the usual result and how many game minutes passed. */
export type LoopAdvance = GameResult & { passed: number };

/** The earning loop of a character the team lists, or undefined. */
function loopOf(
  state: GameState,
  characterId: CharacterId,
): { loop: EarningLoop; character: Character } | undefined {
  if (!Object.hasOwn(state.loops, characterId)) return undefined;
  const loop = state.loops[characterId];
  const character = state.team.characters.find(
    (listed) => listed.id === characterId,
  );
  return loop && character ? { loop, character } : undefined;
}

/** The state with the earning loop of `characterId` replaced, or dropped where `loop` is null. */
function withLoop(
  state: GameState,
  characterId: CharacterId,
  loop: EarningLoop | null,
): GameState {
  const loops = { ...state.loops };
  if (loop) loops[characterId] = loop;
  else delete loops[characterId];
  return { ...state, loops };
}

/**
 * A map run of an earning loop at minute 0 (D-224, D-232): the program of the loop reduced to the
 * repertoire of the run's skills, the skills and traits those of the team's `character` now, and the
 * equipment the take list takes from the chest as it stands, whether the map is solved or not. The
 * map run is not marked, and nothing is discovered, counted or reported by it.
 */
function beginRun(
  state: GameState,
  program: Program,
  mapId: MapId,
  character: Character,
  seed: number,
  chest: Chest,
): { run: MapRun; chest: Chest } {
  const map = MAPS[mapId];
  const traits = { ...character.traits };
  const equipment = takeTrip(
    program.tripPlan,
    chest,
    traits.carryingCapacity,
    map,
  );
  const started = newMapRun(
    map,
    seed,
    programOf(state, program, character.id, character.skills),
    { mapId, characterId: character.id },
    traits,
    character.skills,
    equipment.backpack,
  );
  return { run: started.run, chest: equipment.chest };
}

/**
 * Puts the character `ids.characterId` into an earning loop on a solved map `ids.mapId`: the first
 * map run, seeded from the last seed and `realMs` as a send is, which becomes the last seed. The
 * loop carries the content of the program numbered `ids.programId`, or of the character's row where
 * none is given, and nothing else of it. That program becomes the character's program used last and
 * the one with which a character last entered a map, the character's pick is cleared and its entry
 * of `stoppedLoops` goes. The rule counts and the program they stand beside stay as they were, and
 * no event leaves. A map unknown or not solved, a character the team does not list, one in a loop
 * or in the manual map run, and a program not on the list are refused with the very state.
 */
export function startLoop(
  state: GameState,
  ids: { mapId: MapId; characterId: CharacterId; programId?: ProgramId },
  realMs: number,
): GameResult {
  const { mapId, characterId, programId } = ids;
  const refused: GameResult = { state, events: [] };
  if (
    typeof mapId !== "string" ||
    !Object.hasOwn(MAPS, mapId) ||
    !(state.solvedMaps as readonly string[]).includes(mapId)
  )
    return refused;
  const character = state.team.characters.find(
    (listed) => listed.id === characterId,
  );
  if (
    !character ||
    Object.hasOwn(state.loops, characterId) ||
    state.run?.character.id === characterId
  )
    return refused;
  const chosen =
    programId === undefined
      ? rowProgram(state, characterId)
      : programById(state.programs, programId);
  if (!chosen) return refused;
  const seed = mixSeed(state.lastSeed, realMs);
  const started = beginRun(
    state,
    chosen.program,
    mapId,
    character,
    seed,
    state.team.chest,
  );
  const pickedPrograms = { ...state.pickedPrograms };
  delete pickedPrograms[characterId];
  const stoppedLoops = { ...state.stoppedLoops };
  delete stoppedLoops[characterId];
  return {
    state: withLoop(
      {
        ...state,
        lastSeed: seed,
        pickedPrograms,
        lastUsedPrograms: {
          ...state.lastUsedPrograms,
          [characterId]: chosen.id,
        },
        lastEnteredProgram: chosen.id,
        stoppedLoops,
        team: { ...state.team, chest: started.chest },
      },
      characterId,
      {
        program: chosen.program,
        run: started.run,
        runNumber: 1,
        completed: 0,
        practice: {},
      },
    ),
    events: [],
  };
}

/**
 * Stops the earning loop of a character at once (D-228): the practice the loop gathered and that of
 * the map run going on are paid into the character's skills, the loop is dropped, and the sum paid
 * is written into `stoppedLoops`, `{}` where the loop gathered none. The items the map run carries
 * are lost and its loot does not reach the chest. A map run that ended in death pays nothing. With
 * no loop of that character, returns the very state.
 */
export function stopLoop(
  state: GameState,
  characterId: CharacterId,
): GameResult {
  const found = loopOf(state, characterId);
  if (!found) return { state, events: [] };
  const { loop, character } = found;
  const paid = sumPractice(
    loop.practice,
    loop.run.death === null ? loop.run.practice : {},
  );
  const stopped: Character = {
    ...character,
    skills: paidPractice(character.skills, paid),
  };
  return {
    state: withLoop(
      {
        ...withCharacter(state, character, stopped),
        stoppedLoops: { ...state.stoppedLoops, [characterId]: paid },
      },
      characterId,
      null,
    ),
    events: [],
  };
}

/**
 * Passes up to `minutes` game minutes of the map run of a character's earning loop and stops at its
 * end, the minute of the end included; `passed` is the minutes taken. Only game time passes: the
 * program is reduced to the repertoire of the run's skills as the Understanding stands now, nothing
 * is discovered, and an end is left as the minute found it, for `endLoopRun` to take (D-221). With
 * no loop, a map run already ended or no minutes, returns the very state and 0 passed. Throws a
 * RangeError on a `minutes` that is no whole number from 0 up.
 */
export function advanceLoopRun(
  state: GameState,
  characterId: CharacterId,
  minutes: number,
): LoopAdvance {
  if (
    typeof minutes !== "number" ||
    !Number.isInteger(minutes) ||
    minutes < 0
  ) {
    throw new RangeError(
      `advanceLoopRun: ${String(minutes)} is not a whole number of minutes from 0 up`,
    );
  }
  const found = loopOf(state, characterId);
  if (!found || mapRunEnded(found.loop.run) || minutes === 0)
    return { state, events: [], passed: 0 };
  const { loop } = found;
  const map = MAPS[loop.run.mapId];
  const program = programOf(
    state,
    loop.program,
    characterId,
    loop.run.character.skills,
  );
  let run = loop.run;
  let passed = 0;
  while (passed < minutes && !mapRunEnded(run)) {
    run = stepMinute(run, map, program).run;
    passed += 1;
  }
  return {
    state: withLoop(state, characterId, { ...loop, run }),
    events: [],
    passed,
  };
}

/**
 * Takes the end a character's loop run reached, at the real moment `nowMs`, and starts the next map
 * run at game minute 0 in the same step, with the seed `nextSeed` draws from the ended run's seed.
 * A completion deposits the loot of the frozen bring list into the chest, adds the run's practice
 * to the loop's, and counts it. A death is settled at `nowMs` as a manual one is: with a
 * resurrection ready it is used up, the run pays nothing, the loop keeps what it gathered and goes
 * on; without one the character loses its practice and ranks and the loop is dropped with what it
 * gathered. The carried items go with the run and the chest stays as it stood. One `loopRunEnded`
 * event follows for the end. With no loop or a map run that goes on, returns the very state without
 * reading `nowMs`; otherwise a `nowMs` that is no safe integer is a RangeError.
 */
export function endLoopRun(
  state: GameState,
  characterId: CharacterId,
  nowMs: number,
): GameResult {
  const found = loopOf(state, characterId);
  if (!found || !mapRunEnded(found.loop.run)) return { state, events: [] };
  if (!Number.isSafeInteger(nowMs)) {
    throw new RangeError(
      `endLoopRun: ${String(nowMs)} is not a safe integer moment`,
    );
  }
  const { loop } = found;
  const run = loop.run;
  const events: GameEvent[] = [{ kind: "loopRunEnded", characterId }];
  let character = found.character;
  let chest = state.team.chest;
  let practice = loop.practice;
  let completed = loop.completed;
  if (run.death) {
    const settled = characterAfterDeath(character, nowMs);
    character = settled.character;
    if (!settled.resurrectionUsed) {
      return {
        state: withLoop(
          withCharacter(state, found.character, character),
          characterId,
          null,
        ),
        events,
      };
    }
  } else {
    const pieces = { ...chest.pieces };
    for (const { item, count } of tripLoot(
      {
        bringPlan: loop.program.tripPlan.bring,
        character: run.character,
        solvedMapRun: false,
      },
      chest,
      MAPS[run.mapId],
    ))
      pieces[item] = (pieces[item] ?? 0) + count;
    chest = { pieces };
    practice = sumPractice(practice, run.practice);
    completed += 1;
  }
  const settledState = withCharacter(
    { ...state, team: { ...state.team, chest } },
    found.character,
    character,
  );
  const next = beginRun(
    settledState,
    loop.program,
    run.mapId,
    character,
    nextSeed(run.seed),
    chest,
  );
  return {
    state: withLoop(
      { ...settledState, team: { ...settledState.team, chest: next.chest } },
      characterId,
      {
        program: loop.program,
        run: next.run,
        runNumber: loop.runNumber + 1,
        completed,
        practice,
      },
    ),
    events,
  };
}

/** The state with the team's character `before` replaced by `after`. */
function withCharacter(
  state: GameState,
  before: Character,
  after: Character,
): GameState {
  return {
    ...state,
    team: {
      ...state.team,
      characters: state.team.characters.map((listed) =>
        listed === before ? after : listed,
      ),
    },
  };
}
