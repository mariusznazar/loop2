import { BALANCE } from "./data/balance.js";
import { MAPS } from "./data/maps.js";
import {
  programOf,
  teamAfterDeath,
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
 * A map run of an earning loop at minute 0 (D-241, D-249): the program of the earning loop reduced to the
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
 * earning loop carries the content of the program numbered `ids.programId`, or of the character's row where
 * none is given, and nothing else of it. That program becomes the character's program used last and
 * the one with which a character last entered a map, the character's pick is cleared and its entry
 * of `stoppedLoops` goes. The rule counts and the program they stand beside stay as they were, and
 * no event leaves. A map unknown or not solved, a character the team does not list, one in an earning loop
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
        inARow: 0,
        loopRecord: 0,
        practice: {},
      },
    ),
    events: [],
  };
}

/**
 * The practice waiting at an earning loop (D-189): what the earning loop gathered from completions and
 * what the map run going on has gathered, both since the player last took it with „Odbierz”. A
 * map run that ended in death pays nothing. This is exactly what `takeLoopPractice` and `stopLoop`
 * pay.
 */
export function waitingPractice(loop: EarningLoop): Practice {
  return sumPractice(
    loop.practice,
    loop.run.death === null ? loop.run.practice : {},
  );
}

/**
 * Stops the earning loop of a character at once (D-245): the practice waiting at the earning loop is paid
 * into the character's skills, the earning loop is dropped, and the sum paid is written into
 * `stoppedLoops`, `{}` where none waited. The items the map run carries are lost and its loot does
 * not reach the chest. With no earning loop of that character, returns the very state.
 */
export function stopLoop(
  state: GameState,
  characterId: CharacterId,
): GameResult {
  const found = loopOf(state, characterId);
  if (!found) return { state, events: [] };
  const { loop, character } = found;
  const paid = waitingPractice(loop);
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
 * Takes the practice waiting at the earning loop of a character with „Odbierz” (D-189): all of
 * it, the map run going on included, is paid into the character's skills and the practice the
 * earning loop and that map run hold is emptied, so no later completion or stop pays it again. The map
 * run, the backpack, the earning loop and the chest stay as they were. With no earning loop of that character,
 * or no practice waiting, returns the very state.
 */
export function takeLoopPractice(
  state: GameState,
  characterId: CharacterId,
): GameResult {
  const found = loopOf(state, characterId);
  if (!found) return { state, events: [] };
  const { loop, character } = found;
  const paid = waitingPractice(loop);
  if (Object.keys(paid).length === 0) return { state, events: [] };
  const taken: Character = {
    ...character,
    skills: paidPractice(character.skills, paid),
  };
  return {
    state: withLoop(withCharacter(state, character, taken), characterId, {
      ...loop,
      run: loop.run.death === null ? { ...loop.run, practice: {} } : loop.run,
      practice: {},
    }),
    events: [],
  };
}

/**
 * Passes up to `minutes` game minutes of the map run of a character's earning loop and stops at its
 * end, the minute of the end included; `passed` is the minutes taken. Only game time passes: the
 * program is reduced to the repertoire of the run's skills as the Understanding stands now, nothing
 * is discovered, and an end is left as the minute found it, for `endLoopRun` to take (D-221). With
 * no earning loop, a map run already ended or no minutes, returns the very state and 0 passed. Throws a
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

/** How the end of an earning loop's map run was dealt with. */
type EndKind = "none" | "completion" | "covered" | "noPractice" | "stopped";

/** What `endLoopRun` does, and how the end was dealt with, `kind`. */
function takeEnd(
  state: GameState,
  characterId: CharacterId,
  nowMs: number,
): GameResult & { kind: EndKind } {
  const found = loopOf(state, characterId);
  if (!found || !mapRunEnded(found.loop.run))
    return { state, events: [], kind: "none" };
  if (!Number.isSafeInteger(nowMs)) {
    throw new RangeError(
      `endLoopRun: ${String(nowMs)} is not a safe integer moment`,
    );
  }
  const { loop } = found;
  const run = loop.run;
  const events: GameEvent[] = [{ kind: "loopRunEnded", characterId }];
  let kind: EndKind = "completion";
  let team = state.team;
  let chest = team.chest;
  let practice = loop.practice;
  let completed = loop.completed;
  let inARow = loop.inARow;
  let loopRecord = loop.loopRecord;
  if (run.death) {
    // The practice gathered at the earning loop is what the death takes with the rest (D-190); the run that
    // died pays nothing, so it is no part of it.
    const settled = teamAfterDeath(
      team,
      found.character,
      waitingPractice(loop),
      nowMs,
    );
    team = settled.team;
    if (settled.settlement.kind === "progressLost") {
      return {
        state: withLoop({ ...state, team }, characterId, null),
        events,
        kind: "stopped",
      };
    }
    kind = settled.settlement.kind === "noPractice" ? "noPractice" : "covered";
    // A death that leaves the earning loop going starts the run of map runs with no death anew.
    inARow = 0;
  } else {
    const pieces = { ...chest.pieces };
    for (const { item, count } of tripLoot(
      {
        bringPlan: loop.program.tripPlan.bring,
        character: run.character,
      },
      chest,
      MAPS[run.mapId],
    ))
      pieces[item] = (pieces[item] ?? 0) + count;
    chest = { pieces };
    practice = sumPractice(practice, run.practice);
    completed += 1;
    inARow += 1;
    loopRecord = Math.max(loopRecord, inARow);
  }
  const settledState: GameState = { ...state, team: { ...team, chest } };
  const next = beginRun(
    settledState,
    loop.program,
    run.mapId,
    found.character,
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
        inARow,
        loopRecord,
        practice,
      },
    ),
    events,
    kind,
  };
}

/**
 * Takes the end a character's earning loop run reached, at the real moment `nowMs`, and starts the next map
 * run at game minute 0 in the same step, with the seed `nextSeed` draws from the ended run's seed.
 * A completion deposits the loot of the frozen bring list into the chest, adds the run's practice
 * to the earning loop's (what „Odbierz” took earlier is no longer in the run), and counts it, one more map
 * run in a row with no death, the loop record raised to it where it is the larger (D-241). A death is
 * settled at `nowMs` as a manual one is, by the uses of the team's resurrection (`teamAfterDeath`): the
 * practice gathered at the earning loop counts as the character's practice. A character with no practice
 * leaves the uses as they were, whether one is left or not, and the earning loop goes on; otherwise, with a
 * use left one is used up, the run pays nothing, the earning loop keeps what it gathered and goes on; with
 * none left the character loses its practice and ranks and the earning loop is dropped with what it
 * gathered; where the earning loop goes on, the run of map runs with no death starts anew at 0 and the
 * loop record stays. The carried items go with the run and the chest stays as it stood. One `loopRunEnded` event
 * follows for the end.
 * With no earning loop or a map run that goes on, returns the very state without reading `nowMs`; otherwise a
 * `nowMs` that is no safe integer is a RangeError.
 */
export function endLoopRun(
  state: GameState,
  characterId: CharacterId,
  nowMs: number,
): GameResult {
  const { state: ended, events } = takeEnd(state, characterId, nowMs);
  return { state: ended, events };
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

/** The generation of the team's character `characterId`. */
function generationOf(state: GameState, characterId: CharacterId): number {
  return state.team.characters.find((listed) => listed.id === characterId)!
    .generation;
}

const emptyLine = (characterId: CharacterId): AwayReportLine => ({
  characterId,
  minutes: 0,
  chest: {},
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

/** A line closed by the stop of its earning loop. */
function stoppedLine(
  line: AwayReportLine,
  generation: number,
  away: boolean,
): AwayReportLine {
  return { ...line, stop: { generation, away } };
}

/**
 * The open game's passing (D-242): the whole minutes from the loop clock `fromMs` to `nowMs`, one
 * after another, within each minute the characters with an earning loop in the team's order, each end dealt
 * with at the minute's own real moment (`fromMs` plus k minutes). An earning loop that stops writes its stop
 * into the report; a covered death and a completion write nothing. With no earning loop in the state the
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
 * reads neither the manual map run nor the pause, and an earning loop that stops does not stop the others.
 * The uses of the team's resurrection and the clock of their return go by the same order: the death of
 * each character finds them as the characters earlier on the list left them, even when they died later
 * in real time (D-240).
 * Each character's turn is written into the report: its minutes, its own change of the chest, and
 * a covered death or a stop; the practice its earning loop gathered is read from the earning loop (D-246). With
 * no earning loop, no whole minute or no save time, the very state is returned.
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
    const generation = generationOf(current, id);
    current = {
      ...current,
      awayReport: withLine(current.awayReport, id, (line) => {
        const grown: AwayReportLine = {
          ...line,
          minutes: line.minutes + passed,
          chest: addedChange(line.chest, change),
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
