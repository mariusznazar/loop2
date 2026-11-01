import { BALANCE } from "./data/balance.js";
import { MAPS } from "./data/maps.js";
import type { SkillId } from "./data/skills.js";
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
  AwayReportLine,
  Character,
  CharacterId,
  Chest,
  EarningLoop,
  GameState,
  ItemId,
  MapId,
  MapRun,
  Practice,
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
 * A map run of an earning loop at minute 0 (D-241, D-249): the program of the loop reduced to the
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
 * Stops the earning loop of a character at once (D-245): the practice the loop gathered and that of
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

/** What `passLoops` and `catchUp` return: the usual result and the new value of the loop clock. */
export type LoopPass = GameResult & { clockMs: number };

const MS_PER_LOOP_MINUTE = BALANCE.loopMinuteRealSeconds * 1000;

function assertMoment(name: string, momentMs: number): void {
  if (!Number.isSafeInteger(momentMs)) {
    throw new RangeError(
      `${name}: ${String(momentMs)} is not a safe integer moment`,
    );
  }
}

/**
 * The whole game minutes of an earning loop from the loop clock `fromMs` to the reading `nowMs`, and
 * the clock's new value, `fromMs` plus those minutes; the rest shorter than a minute waits. A reading
 * before `fromMs` gives no minutes and the reading as the clock's value: it runs from now and takes
 * nothing. The k-th minute after `fromMs` has the real moment `fromMs` plus k minutes. A moment that
 * is no safe integer is a RangeError.
 */
export function loopSpan(
  fromMs: number,
  nowMs: number,
): { minutes: number; clockMs: number } {
  assertMoment("loopSpan", fromMs);
  assertMoment("loopSpan", nowMs);
  if (nowMs < fromMs) return { minutes: 0, clockMs: nowMs };
  const minutes = Math.floor((nowMs - fromMs) / MS_PER_LOOP_MINUTE);
  return { minutes, clockMs: fromMs + minutes * MS_PER_LOOP_MINUTE };
}

/** How the end of a loop's map run was dealt with. */
type EndKind = "none" | "completion" | "covered" | "stopped";

/** Takes the end of the character's loop run at `momentMs`, if there is one, and says which it was. */
function takeEnd(
  state: GameState,
  characterId: CharacterId,
  momentMs: number,
): GameResult & { kind: EndKind } {
  const found = loopOf(state, characterId);
  if (!found || !mapRunEnded(found.loop.run))
    return { state, events: [], kind: "none" };
  const taken = endLoopRun(state, characterId, momentMs);
  const kind: EndKind = !Object.hasOwn(taken.state.loops, characterId)
    ? "stopped"
    : found.loop.run.death
      ? "covered"
      : "completion";
  return { ...taken, kind };
}

/** The generation of the team's character `characterId`. */
function generationOf(state: GameState, characterId: CharacterId): number {
  return state.team.characters.find((listed) => listed.id === characterId)!
    .generation;
}

const emptyLine = (characterId: CharacterId): AwayReportLine => ({
  characterId,
  minutes: 0,
  chest: {},
  practice: {},
  resurrectionUsed: false,
  stop: null,
});

/**
 * The report with the open line of `characterId` (a new one where none is open, appended) replaced
 * by what `update` makes of it.
 */
function withLine(
  report: AwayReportLine[],
  characterId: CharacterId,
  update: (line: AwayReportLine) => AwayReportLine,
): AwayReportLine[] {
  const at = report.findIndex(
    (line) => line.characterId === characterId && line.stop === null,
  );
  if (at < 0) return [...report, update(emptyLine(characterId))];
  return report.map((line, index) => (index === at ? update(line) : line));
}

/** The sum of two signed changes of the chest, an item whose sum is 0 left out. */
function addedChange(
  left: AwayReportLine["chest"],
  right: AwayReportLine["chest"],
): AwayReportLine["chest"] {
  const sum: AwayReportLine["chest"] = { ...left };
  for (const item of Object.keys(right) as ItemId[]) {
    const pieces = (sum[item] ?? 0) + right[item]!;
    if (pieces === 0) delete sum[item];
    else sum[item] = pieces;
  }
  return sum;
}

/** What `after` holds more or fewer of each item than `before`, signed, no zero kept. */
function chestChange(before: Chest, after: Chest): AwayReportLine["chest"] {
  const change: AwayReportLine["chest"] = {};
  const items = new Set([
    ...Object.keys(before.pieces),
    ...Object.keys(after.pieces),
  ]) as Set<ItemId>;
  for (const item of items) {
    const pieces = (after.pieces[item] ?? 0) - (before.pieces[item] ?? 0);
    if (pieces !== 0) change[item] = pieces;
  }
  return change;
}

/** The practice `after` holds beyond `before`, only the skills it grew in. */
function practiceGain(before: Practice, after: Practice): Practice {
  const gain: Practice = {};
  for (const skill of Object.keys(after) as SkillId[]) {
    const grown = after[skill]! - (before[skill] ?? 0);
    if (grown > 0) gain[skill] = grown;
  }
  return gain;
}

/** A line closed by the stop of its loop: no practice stays, the loop's being gone. */
function stoppedLine(
  line: AwayReportLine,
  generation: number,
  away: boolean,
): AwayReportLine {
  return { ...line, practice: {}, stop: { generation, away } };
}

/**
 * The open game's passing (D-242): the whole minutes from the loop clock `fromMs` to `nowMs`, one
 * after another, within each minute the characters with a loop in the team's order, each end dealt
 * with at the minute's own real moment (`fromMs` plus k minutes). A loop that stops writes its stop
 * into the report; a covered death and a completion write nothing. With no loop in the state the
 * clock is set to `nowMs`; with no whole minute the very state is returned and the clock stays.
 */
export function passLoops(
  state: GameState,
  fromMs: number,
  nowMs: number,
): LoopPass {
  const span = loopSpan(fromMs, nowMs);
  if (Object.keys(state.loops).length === 0)
    return { state, events: [], clockMs: nowMs };
  if (span.minutes === 0) return { state, events: [], clockMs: span.clockMs };
  let current = state;
  const events: GameEvent[] = [];
  for (let minute = 1; minute <= span.minutes; minute += 1) {
    const momentMs = fromMs + minute * MS_PER_LOOP_MINUTE;
    for (const { id } of state.team.characters) {
      if (!Object.hasOwn(current.loops, id)) continue;
      const taken = takeEnd(advanceLoopRun(current, id, 1).state, id, momentMs);
      current = taken.state;
      events.push(...taken.events);
      if (taken.kind === "stopped") {
        const generation = generationOf(current, id);
        current = {
          ...current,
          awayReport: withLine(current.awayReport, id, (line) =>
            stoppedLine(line, generation, false),
          ),
        };
      }
    }
  }
  return { state: current, events, clockMs: span.clockMs };
}

/**
 * The catch-up (D-240, D-247): the whole minutes from the save time to `nowMs`, one character at a
 * time in the team's order, each through the whole span and the chest as the one before left it. It
 * reads neither the manual map run nor the pause, and a loop that stops does not stop the others.
 * Each character's turn is written into the report: its minutes, its own change of the chest and
 * the practice its loop gained, and a covered death or a stop. With no loop, no whole minute or no
 * save time, the very state is returned.
 */
export function catchUp(state: GameState, nowMs: number): LoopPass {
  assertMoment("catchUp", nowMs);
  if (state.saveTimeMs === null || Object.keys(state.loops).length === 0)
    return { state, events: [], clockMs: nowMs };
  const fromMs = state.saveTimeMs;
  const span = loopSpan(fromMs, nowMs);
  if (span.minutes === 0) return { state, events: [], clockMs: span.clockMs };
  let current = state;
  const events: GameEvent[] = [];
  for (const { id } of state.team.characters) {
    const found = loopOf(current, id);
    if (!found) continue;
    const chestBefore = current.team.chest;
    const practiceBefore = found.loop.practice;
    let passed = 0;
    let covered = false;
    let stopped = false;
    while (passed < span.minutes && !stopped) {
      const advanced = advanceLoopRun(current, id, span.minutes - passed);
      if (advanced.passed === 0) break;
      passed += advanced.passed;
      const taken = takeEnd(
        advanced.state,
        id,
        fromMs + passed * MS_PER_LOOP_MINUTE,
      );
      current = taken.state;
      events.push(...taken.events);
      covered ||= taken.kind === "covered";
      stopped = taken.kind === "stopped";
    }
    const change = chestChange(chestBefore, current.team.chest);
    const gain = stopped
      ? {}
      : practiceGain(practiceBefore, current.loops[id]!.practice);
    const generation = generationOf(current, id);
    current = {
      ...current,
      awayReport: withLine(current.awayReport, id, (line) => {
        const grown: AwayReportLine = {
          ...line,
          minutes: line.minutes + passed,
          chest: addedChange(line.chest, change),
          practice: sumPractice(line.practice, gain),
          resurrectionUsed: line.resurrectionUsed || covered,
        };
        return stopped ? stoppedLine(grown, generation, true) : grown;
      }),
    };
  }
  return { state: current, events, clockMs: span.clockMs };
}

/** Closes the report: the whole section at once. An empty report is the very state. */
export function closeAwayReport(state: GameState): GameResult {
  if (state.awayReport.length === 0) return { state, events: [] };
  return { state: { ...state, awayReport: [] }, events: [] };
}
