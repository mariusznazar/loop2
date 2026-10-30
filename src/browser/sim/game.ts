import { newTraits } from "./character.js";
import { newSkills, paidPractice } from "./skills.js";
import { takeTrip, tripLoot } from "./trip.js";
import { ARCHETYPES, CREATED_ARCHETYPE } from "./data/archetypes.js";
import {
  discover,
  newUnderstanding,
  programInRepertoire,
  repertoireOf,
  withFirstChillRule,
} from "./understanding.js";
import { BALANCE, INITIAL_SEED } from "./data/balance.js";
import { MAPS, type MapDef } from "./data/maps.js";
import {
  checkProgram,
  emptyProgram,
  FIRST_PROGRAM_NAME,
  programById,
  reconcileCounts,
  rowProgram,
  teamProgram,
  withCopyProgram,
  withProgramContent,
  zeroCounts,
} from "./programs.js";
import { mixSeed } from "./random.js";
import {
  mapRunEnded,
  finishMinute,
  minuteBeforePick,
  newMapRun,
  type GameEvent,
} from "./run.js";
import type {
  Character,
  CharacterId,
  GameMapRun,
  GameState,
  MapId,
  MapRun,
  Pace,
  Program,
  ProgramCopy,
  ProgramId,
  Traits,
  Understanding,
} from "./types.js";

export { mapRunEnded };
export type { GameEvent };

/** What every state-changing function of the game returns. */
export type GameResult = { state: GameState; events: GameEvent[] };

const MS_PER_SECOND = 1000;

function mapOf(mapId: MapId): MapDef {
  return MAPS[mapId];
}

/** Whether a map's prerequisite maps are all in this game's solved-map record. */
export function canSendMap(
  solvedMaps: readonly MapId[],
  mapId: MapId,
): boolean {
  const prerequisite = mapOf(mapId).opensAfter;
  return (
    prerequisite === undefined || solvedMaps.includes(prerequisite as MapId)
  );
}

function requireRun(state: GameState, name: string): GameMapRun {
  if (!state.run) throw new Error(`${name}: there is no map run`);
  return state.run;
}

/** Consume starts once; waits and finishes have no firing to count. Inputs stay unchanged. */
function countStarts(
  counts: GameState["ruleCounts"],
  events: readonly GameEvent[],
): GameState["ruleCounts"] {
  if (counts === null) return null;
  let next = counts;
  for (const event of events) {
    const id =
      event.kind === "combatExchange"
        ? event.exchange.characterAction?.ruleId
        : event.kind === "activityStarted" && event.activity.kind === "rule"
          ? event.activity.ruleId
          : undefined;
    if (id === undefined) continue;
    if (!Object.hasOwn(next, id)) continue;
    if (next === counts) next = { ...counts };
    next[id] += 1;
  }
  return next;
}

/**
 * The copy `program` as the character `characterId` can carry it out: reduced to the repertoire of
 * its archetype over the game's Understanding. A rule outside it is passed over and stays in the
 * copy; a character the team does not list takes the archetype of created characters.
 */
function programOf(
  state: GameState,
  program: Program,
  characterId: CharacterId,
): Program {
  const character = state.team.characters.find(
    (listed) => listed.id === characterId,
  );
  const archetype = ARCHETYPES[character?.archetypeId ?? CREATED_ARCHETYPE];
  return programInRepertoire(
    program,
    repertoireOf(
      state.understanding,
      archetype.predispositions,
      state.run?.character.skills ?? character?.skills,
    ),
  );
}

/**
 * A new map run at minute 0 carrying out `copy`, every count of the copy's rules starting from
 * zero; events mapRunStarted, activityStarted.
 */
function startRun(
  state: GameState,
  mapId: MapId,
  characterId: CharacterId,
  seed: number,
  traits: Traits,
  copy: ProgramCopy,
): GameResult {
  const equipment = takeTrip(
    copy.program.tripPlan,
    state.team.chest,
    traits.carryingCapacity,
    mapOf(mapId),
  );
  const started = newMapRun(
    mapOf(mapId),
    seed,
    programOf(state, copy.program, characterId),
    { mapId, characterId },
    traits,
    state.run?.character.skills ??
      state.team.characters.find((character) => character.id === characterId)!
        .skills,
    equipment.backpack,
  );
  return {
    state: {
      ...state,
      ruleCounts: countStarts(zeroCounts(copy.program), started.events),
      countsProgram: null,
      team: { ...state.team, chest: equipment.chest },
      run: {
        ...started.run,
        copy,
        bringPlan: copy.program.tripPlan.bring.map((entry) => ({ ...entry })),
        deposited: null,
      },
      paused: false,
      discovery: null,
      realMsCarry: 0,
    },
    events: [{ kind: "mapRunStarted", seed }, ...started.events],
  };
}

/**
 * The game as it stands before anything is done: program 1, „Program”, with the empty rule group
 * „Program” under „Zawsze” and the next program number 2, a team with no character and an empty
 * chest, no map run.
 */
export function newGame(): GameState {
  return {
    programs: [{ id: 1, name: FIRST_PROGRAM_NAME, program: emptyProgram() }],
    nextProgramId: 2,
    pickedPrograms: {},
    lastUsedPrograms: {},
    lastEnteredProgram: null,
    understanding: newUnderstanding(),
    ruleCounts: null,
    countsProgram: null,
    team: { characters: [], chest: { pieces: {} } },
    nextCharacterId: 1,
    run: null,
    lastSeed: INITIAL_SEED,
    paused: false,
    solvedMaps: [],
    pace: 1,
    discovery: null,
    realMsCarry: 0,
  };
}

/**
 * Within a map run, replaces the copy the map run carries out, checked against the run's map; the
 * copy's program and base stay. The running activity is left as it is, and the copy takes effect
 * when the character next picks a program rule. Where the copy checked differs from the copy before
 * it — groups and rules in order with their identities, conditions and actions, and the identity
 * counters — the streak and defeated-attack count of a map run not ended, in death or a completion,
 * become 0, paused or not; a copy handed back as it stands leaves both.
 *
 * Without a map run, replaces the content of the program a character with no pick and no program
 * used last goes with, `teamProgram`, checked against the resources of every map; the counts are
 * reconciled where they stand beside that program.
 */
export function setProgram(state: GameState, program: Program): GameResult {
  const run = state.run;
  if (run) {
    return {
      state: withCopyProgram(state, run, checkProgram(program, run)),
      events: [],
    };
  }
  const edited = teamProgram(state);
  const checked = checkProgram(program, null);
  return {
    state: {
      ...state,
      programs: withProgramContent(state.programs, edited.id, checked),
      ...(state.countsProgram === edited.id && {
        ruleCounts: reconcileCounts(state.ruleCounts, edited.program, checked),
      }),
    },
    events: [],
  };
}

/**
 * The name a character created from `text` takes: the text without white space at its start and
 * end, or null where nothing is left, a name that creates no character.
 */
export function characterName(text: string): string | null {
  const name = text.trim();
  return name === "" ? null : name;
}

/**
 * Creates a character named `name`, trimmed as `characterName` gives it, in the archetype of created
 * characters and with the traits of a new character, at the end of the team's list; throws on a
 * name that is empty once trimmed.
 */
export function createCharacter(state: GameState, name: string): GameResult {
  const trimmed = typeof name === "string" ? characterName(name) : null;
  if (trimmed === null) throw new Error("createCharacter: the name is empty");
  const character: Character = {
    id: state.nextCharacterId,
    name: trimmed,
    archetypeId: CREATED_ARCHETYPE,
    traits: newTraits(),
    skills: newSkills(ARCHETYPES[CREATED_ARCHETYPE].predispositions),
  };
  return {
    state: {
      ...state,
      team: {
        ...state.team,
        characters: [...state.team.characters, character],
      },
      nextCharacterId: state.nextCharacterId + 1,
    },
    events: [],
  };
}

/**
 * Sends a character of the team to a map with the program numbered `programId`, or without one with
 * its headquarters row's program, `rowProgram`: a new map run at minute 0, seeded from the last
 * seed and real time, its character carrying its own copy of the traits of the team's character
 * sent, carrying out a copy of that program whose base is the program's content. That program
 * becomes the character's program used last and the one a character last entered a map with, and
 * the character's pick is cleared. Throws while a map run is in progress, so one map run goes on at
 * a time, and on a program number not on the list.
 */
export function send(
  state: GameState,
  ids: { mapId: MapId; characterId: CharacterId; programId?: ProgramId },
  realMs: number,
): GameResult {
  if (state.run) throw new Error("send: a map run is in progress");
  const { mapId, characterId, programId } = ids;
  if (typeof mapId !== "string" || !Object.hasOwn(MAPS, mapId))
    throw new Error(`send: no map ${String(mapId)}`);
  if (!canSendMap(state.solvedMaps, mapId))
    throw new Error(`send: map ${mapId} is not available`);
  const sent = state.team.characters.find(
    (character) => character.id === characterId,
  );
  if (!sent)
    throw new Error(`send: no character ${String(characterId)} in the team`);
  const chosen =
    programId === undefined
      ? rowProgram(state, characterId)
      : programById(state.programs, programId);
  if (!chosen)
    throw new Error(`send: no program ${String(programId)} on the list`);
  const seed = mixSeed(state.lastSeed, realMs);
  const pickedPrograms = { ...state.pickedPrograms };
  delete pickedPrograms[characterId];
  return startRun(
    {
      ...state,
      lastSeed: seed,
      pickedPrograms,
      lastUsedPrograms: { ...state.lastUsedPrograms, [characterId]: chosen.id },
      lastEnteredProgram: chosen.id,
    },
    mapId,
    characterId,
    seed,
    { ...sent.traits },
    {
      program: chosen.program,
      programId: chosen.id,
      deletedName: null,
      base: chosen.program,
    },
  );
}

/**
 * Ends the map run in progress, or one ended in death or a completion, and starts a new one of the
 * same map, character, traits and seed, carrying out the copy record of the map run it replaces as
 * it is, unsaved changes included; every count starts from zero.
 */
export function restart(state: GameState): GameResult {
  const run = requireRun(state, "restart");
  const started = startRun(
    state,
    run.mapId,
    run.character.id,
    run.seed,
    run.character.traits,
    run.copy,
  );
  return {
    state: started.state,
    events: [{ kind: "mapRunEnded" }, ...started.events],
  };
}

/**
 * Ends the map run in progress, or one ended in death or a completion, and drops its copy; the
 * programs, the last seed and the solved maps stay. The counts are reconciled against the copy's
 * program, which they then stand beside: a rule of that program keeps the count of the copy's rule
 * of the same identity where the two have the same condition and action, and stands at 0 otherwise.
 * Where the copy's program is gone, the counts are cleared.
 */
export function end(state: GameState): GameResult {
  const run = requireRun(state, "end");
  const owner = programById(state.programs, run.copy.programId);
  return {
    state: {
      ...state,
      ruleCounts: owner
        ? reconcileCounts(state.ruleCounts, run.copy.program, owner.program)
        : null,
      countsProgram: owner ? owner.id : null,
      run: null,
      paused: false,
      discovery: null,
      realMsCarry: 0,
    },
    events: [{ kind: "mapRunEnded" }],
  };
}

/**
 * Pauses or resumes the map run in progress; without one, nothing changes. Resuming is the player
 * moving on, so what the last game minute of a discovery revealed is cleared with it.
 */
export function setPaused(state: GameState, paused: boolean): GameResult {
  if (!state.run) return { state, events: [] };
  return {
    state: { ...state, paused, ...(!paused && { discovery: null }) },
    events: [],
  };
}

/**
 * Sets the pace the player picked and nothing else: not the pause, the discovery held or the
 * carried real time, with or without a map run. Throws on a pace outside the data's list.
 */
export function setPace(state: GameState, pace: Pace): GameResult {
  if (!(BALANCE.paces as readonly unknown[]).includes(pace))
    throw new Error(`setPace: ${String(pace)} is not a pace of the data`);
  return { state: { ...state, pace }, events: [] };
}

/**
 * The only way real time enters the simulation. Ignored without a map run, with one ended in
 * death or a completion, while paused, or when realMs is not a finite number above zero; otherwise
 * every whole scaled second becomes a game minute, real time scaled by the pace in force, and the
 * rest carries over to the next call at the pace it was passed at. Where the character dies or the
 * map run completes, time stops there and nothing carries over; the same where the span ends at a
 * discovery, which leaves the game paused.
 */
export function passRealTime(state: GameState, realMs: number): GameResult {
  if (
    !state.run ||
    mapRunEnded(state.run) ||
    state.paused ||
    typeof realMs !== "number" ||
    !Number.isFinite(realMs) ||
    realMs <= 0
  ) {
    return { state, events: [] };
  }
  const total =
    state.realMsCarry + realMs * BALANCE.gameMinutesPerRealSecond * state.pace;
  const minutes = Math.floor(total / MS_PER_SECOND);
  const carried = { ...state, realMsCarry: total - minutes * MS_PER_SECOND };
  const result = advanceMinutes(carried, minutes);
  const stopped =
    result.state.run?.death ||
    result.state.run?.completion ||
    result.events.some((event) => event.kind === "discovered");
  if (!stopped) return result;
  return { state: { ...result.state, realMsCarry: 0 }, events: result.events };
}

/**
 * A span of game minutes: the minute of D-71 repeated, also while paused. A discovery takes hold
 * between the minute's last effect and the pick: what the minute revealed enters the Understanding,
 * at the first chill the rule "Zawsze → Eksploruj" enters the copy, its base and the copy's program
 * while that program is on the list, each by `withFirstChillRule` on its own content, and no other
 * program, and the pick that ends the minute is made from the copy and the Understanding as they
 * then stand. A span that reaches
 * the character's death, or the whole minute of a discovery, stops there; a stop at a discovery
 * leaves the game paused, holding what the minute revealed. A map run that meets the solving
 * condition of its map in a minute completes there, once the minute's discovery has taken hold: the
 * rest of the minute has taken effect, the event `mapRunCompleted` follows the minute's other
 * events, no program rule is picked and the map is added to the solved maps; where that minute is
 * also a discovery's, the game holds the discovery and is not paused. A map run that has ended
 * changes nothing.
 */
export function advanceMinutes(state: GameState, minutes: number): GameResult {
  if (
    typeof minutes !== "number" ||
    !Number.isInteger(minutes) ||
    minutes < 0
  ) {
    throw new RangeError(
      `advanceMinutes: ${String(minutes)} is not a whole number of minutes from 0 up`,
    );
  }
  if (!state.run || mapRunEnded(state.run) || minutes === 0)
    return { state, events: [] };
  const map = mapOf(state.run.mapId);
  const events: GameEvent[] = [];
  let current = state;
  let run: MapRun = state.run;
  let copy = state.run.copy;
  let program = programOf(current, copy.program, run.character.id);
  let revealed: Understanding | null = null;
  let completed = false;
  for (let minute = 0; minute < minutes; minute += 1) {
    const stepped = minuteBeforePick(run, map);
    events.push(...stepped.events);
    const beforeUnderstanding = current.understanding;
    const found = discover(
      current.understanding,
      run,
      stepped.run,
      stepped.events,
    );
    if (found) {
      current = { ...current, understanding: found.understanding };
      if (found.chill) {
        const written = withFirstChillRule(copy.program);
        const owner = programById(current.programs, copy.programId);
        current = {
          ...current,
          ruleCounts: reconcileCounts(
            current.ruleCounts,
            copy.program,
            written,
          ),
          ...(owner && {
            programs: withProgramContent(
              current.programs,
              owner.id,
              withFirstChillRule(owner.program),
            ),
          }),
        };
        copy = {
          ...copy,
          program: written,
          base: withFirstChillRule(copy.base),
        };
      }
      program = programOf(current, copy.program, run.character.id);
    }
    const finished = finishMinute(stepped, map, program);
    // Collect the entire minute once in catalog order, including its attack, after the
    // earlier discovery has already informed the program used by this final phase.
    const together = finished.events.some((event) => event.kind === "attacked")
      ? discover(beforeUnderstanding, run, finished.run, [
          ...stepped.events,
          ...finished.events,
        ])
      : found;
    const ending: GameEvent[] = finished.events.filter(
      (event) =>
        event.kind === "activityStarted" || event.kind === "mapRunCompleted",
    );
    events.push(...finished.events.filter((event) => !ending.includes(event)));
    if (together) {
      current = { ...current, understanding: together.understanding };
      revealed = together.revealed;
      events.push({
        kind: "discovered",
        minute: finished.run.minute,
        ...revealed,
      });
    }
    events.push(...ending);
    run = finished.run;
    completed = run.completion !== null;
    if (mapRunEnded(run) || revealed) break;
  }
  const endedRun = {
    ...run,
    copy,
    bringPlan: state.run.bringPlan,
    deposited: null,
  };
  const deposited = completed
    ? tripLoot(endedRun, current.team.chest, map)
    : null;
  if (deposited) {
    const pieces = { ...current.team.chest.pieces };
    for (const { item, count } of deposited)
      pieces[item] = (pieces[item] ?? 0) + count;
    current = { ...current, team: { ...current.team, chest: { pieces } } };
  }
  return {
    state: {
      ...current,
      ...(revealed && { discovery: revealed, paused: !completed }),
      ...(completed &&
        !current.solvedMaps.includes(run.mapId) && {
          solvedMaps: [...current.solvedMaps, run.mapId],
        }),
      ...(completed && {
        team: {
          ...current.team,
          characters: current.team.characters.map((character) =>
            character.id === run.character.id
              ? {
                  ...character,
                  skills: paidPractice(character.skills, run.practice),
                }
              : character,
          ),
        },
      }),
      run: { ...endedRun, deposited },
      ruleCounts: countStarts(current.ruleCounts, events),
    },
    events,
  };
}
