import { newTraits } from "./character.js";
import { hasNoPractice, newSkills, paidPractice } from "./skills.js";
import { takeTrip, tripLoot } from "./trip.js";
import { ARCHETYPES, CREATED_ARCHETYPE } from "./data/archetypes.js";
import {
  discover,
  editorRepertoire,
  holdsRuleWith,
  knownRepertoire,
  newUnderstanding,
  programInRepertoire,
  repertoireOf,
  withFirstChillRule,
} from "./understanding.js";
import { CREATURES } from "./data/creatures.js";
import { judgeProgram, type ProgramJudgement } from "./program.js";
import { judgingsAfterDeath } from "./judging-record.js";
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
  withProgramSaved,
  zeroCounts,
} from "./programs.js";
import { mixSeed } from "./random.js";
import { nextRecord, recordOf, startRecord } from "./run-record.js";
import {
  mapRunEnded,
  finishMinute,
  minuteBeforePick,
  newMapRun,
  type GameEvent,
} from "./run.js";
import type {
  Action,
  Character,
  CharacterId,
  CharacterSkills,
  CreatureId,
  DeathCause,
  DeathSettlement,
  GameMapRun,
  GameState,
  MapId,
  MapRun,
  Pace,
  Program,
  ProgramCopy,
  Practice,
  ProgramId,
  RuleId,
  Team,
  Traits,
  Understanding,
} from "./types.js";

export { mapRunEnded };
export type { GameEvent };

/** What every state-changing function of the game returns. */
export type GameResult = { state: GameState; events: GameEvent[] };

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60 * MS_PER_SECOND;

function mapOf(mapId: MapId): MapDef {
  return MAPS[mapId];
}

/** The real span in which one spent use of the resurrection returns, read from the data of the game where it is used. */
function renewalMs(): number {
  return BALANCE.resurrectionRenewalRealMinutes * MS_PER_MINUTE;
}

/** The part of the team that holds its resurrection's uses. */
type Uses = Pick<Team, "resurrectionUsesSpent" | "resurrectionNextReturnAtMs">;

/** The uses spent and the moment the next returns, as they stand at one real moment. */
type UsesAt = { spent: number; nextReturnMs: number | null };

/** The real moment `spanMs` after `momentMs`; one that is no safe integer is a RangeError (D-386). */
function momentAfter(momentMs: number, spanMs: number): number {
  const moment = momentMs + spanMs;
  if (!Number.isSafeInteger(moment)) {
    throw new RangeError(`${String(moment)} is not a safe integer moment`);
  }
  return moment;
}

/**
 * The uses the team holds as spent at the real moment `nowMs`: each use whose moment has come, that
 * moment included, is returned, the next one after the renewal from the moment of the one before it,
 * and the clock stops once none is spent.
 */
function usesAt(team: Uses, nowMs: number): UsesAt {
  const spent = team.resurrectionUsesSpent;
  const next = team.resurrectionNextReturnAtMs;
  if (next === null || next > nowMs) return { spent, nextReturnMs: next };
  const renewal = renewalMs();
  const back = Math.min(spent, 1 + Math.floor((nowMs - next) / renewal));
  const left = spent - back;
  return {
    spent: left,
    nextReturnMs: left === 0 ? null : momentAfter(next, back * renewal),
  };
}

/**
 * Whether the team's resurrection, the one all its characters share, has at least one use left at the
 * real moment `nowMs`: the uses whose moment has come count as returned, that moment included. It
 * does not say the stock is full: the settlement kind `resurrectionReady` of a completion names a
 * stock found full, while this holds for a stock with a use spent as well.
 */
export function resurrectionHasUse(team: Uses, nowMs: number): boolean {
  return usesAt(team, nowMs).spent < BALANCE.resurrectionUses;
}

/** The team's resurrection at a real moment: the uses left, and the moment the next missing one returns. */
export type ResurrectionStock = {
  usesLeft: number;
  nextReturnMs: number | null;
};

/**
 * The team's resurrection at the real moment `nowMs`: the uses left, and the moment the next missing
 * use returns, `null` where none is missing. Pure.
 */
export function resurrectionAt(team: Uses, nowMs: number): ResurrectionStock {
  const { spent, nextReturnMs } = usesAt(team, nowMs);
  return { usesLeft: BALANCE.resurrectionUses - spent, nextReturnMs };
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
 * The copy `program` as the character `characterId` can carry it out with `skills`: reduced to the
 * repertoire of its archetype over the game's Understanding. A rule outside it is passed over and
 * stays in the copy; a character the team does not list takes the archetype of created characters.
 */
export function programOf(
  state: GameState,
  program: Program,
  characterId: CharacterId,
  skills: CharacterSkills | undefined,
): Program {
  const character = state.team.characters.find(
    (listed) => listed.id === characterId,
  );
  const archetype = ARCHETYPES[character?.archetypeId ?? CREATED_ARCHETYPE];
  return programInRepertoire(
    program,
    repertoireOf(state.understanding, archetype.predispositions, skills),
  );
}

/**
 * What the copy of the map run shows beside its rules: the judgement of every rule and rule group
 * and the rule whose action is being carried out.
 */
export type RuleSigns = {
  judgement: ProgramJudgement;
  /**
   * The rule whose action is being carried out, where it is not the rule that wins now; null where
   * no action is being carried out or it is the winner's.
   */
  running: RuleId | null;
};

/**
 * The signs of the copy of the map run as it stands now, from the function that picks the rule
 * (`judgeProgram`) over the whole copy, the repertoire checked before the condition. Outside combat
 * they are what the pick of this game minute would judge. In the minutes of an attack, from the
 * minute of the attack to the resolving of its turns, they are what the first turn would judge at the
 * health of the character and of the creature as they stand, so no action is being carried out.
 * After an end of the map run they are counted on the stopped minute: an action is being carried out
 * after a death of cold or hunger, the activity of that moment, and after a completion while it has
 * not ended; after a death in combat none is. Null without a map run. Inputs are not changed.
 */
export function ruleSigns(state: GameState): RuleSigns | null {
  const run = state.run;
  if (!run) return null;
  const combat = run.activeCombat
    ? {
        health: run.body.health,
        opponentHealth: CREATURES[run.activeCombat.creatureId].health,
      }
    : undefined;
  const judgement = judgeProgram(run, run.copy.program, {
    reach: {
      repertoire: editorRepertoire(state),
      known: knownRepertoire(state),
    },
    combat,
  });
  const current = run.current;
  const carried =
    current?.activity.kind === "rule" &&
    (run.death !== null || run.minute < current.endMinute)
      ? current.activity.ruleId
      : null;
  return {
    judgement,
    running: carried === judgement.winner?.id ? null : carried,
  };
}

/**
 * What „Teraz” names: an action under way with the rule it comes from, the game minutes left to it
 * and the game minutes in all; a wait; the creature fought in the minutes of an attack; the cause of
 * the character's death; the completion with the text of the map.
 */
export type NowLine =
  | {
      kind: "action";
      ruleId: RuleId;
      action: Action;
      minutesLeft: number;
      minutes: number;
    }
  | { kind: "wait" }
  | { kind: "combat"; creatureId: CreatureId }
  | { kind: "death"; cause: DeathCause }
  | { kind: "completion"; text: string };

/** What „Potem” names: the rule that wins in the judgement of `ruleSigns`, or none. */
export type NextLine =
  { kind: "rule"; ruleId: RuleId; action: Action } | { kind: "none" };

/** What the rows „Teraz” and „Potem” of the screen of a map run name. */
export type NowAndNext = { now: NowLine; next: NextLine };

/**
 * What the rows „Teraz” and „Potem” of the screen of a map run name, null without a map run. „Teraz”,
 * in this precedence: after a death its cause; after a completion the completion with the text of the
 * map; from the minute of an attack through the minute of its resolution, also where an ordinary
 * action starts in the latter, the creature fought; otherwise the action under way, as the pick that
 * started it left it in `current` (D-147). The game minutes left to an action run from the game minute
 * of the map run to its end, so a paused map run reads as a running one at the same minute, and its
 * minutes in all from its start to its end; a wait names no rule and no minutes. „Potem” is the winner
 * of the judgement `ruleSigns` gives for the same state, the combat rule the turn would choose in the
 * minutes of an attack and the rule that wins at the stopped minute after the end, or none; it is
 * taken from that one judgement, never from a second pick (D-308, D-309). Inputs are not changed.
 */
export function nowAndNext(state: GameState): NowAndNext | null {
  const run = state.run;
  const signs = ruleSigns(state);
  if (!run || !signs) return null;
  const winner = signs.judgement.winner;
  const next: NextLine = winner
    ? { kind: "rule", ruleId: winner.id, action: { ...winner.action } }
    : { kind: "none" };
  return { now: nowLine(run), next };
}

/** The row „Teraz” of a map run, as `nowAndNext` gives it. */
function nowLine(run: GameMapRun): NowLine {
  if (run.death) return { kind: "death", cause: run.death.cause };
  if (run.completion)
    return { kind: "completion", text: mapOf(run.mapId).completionText };
  const fought =
    run.activeCombat ??
    (run.lastCombat?.result && run.lastCombat.resolveMinute === run.minute
      ? run.lastCombat
      : null);
  if (fought) return { kind: "combat", creatureId: fought.creatureId };
  const current = run.current;
  if (current?.activity.kind !== "rule") return { kind: "wait" };
  return {
    kind: "action",
    ruleId: current.activity.ruleId,
    action: { ...current.activity.action },
    minutesLeft: Math.max(0, current.endMinute - run.minute),
    minutes: current.endMinute - current.startMinute,
  };
}

/**
 * A new map run at minute 0 carrying out `copy`, every count of the copy's rules starting from
 * zero; its equipment leaves the chest as it stands, as every start does (D-179, D-189), and the
 * state of the map at the start marks a run of a solved map, which pays no practice (D-214); events
 * mapRunStarted, activityStarted.
 */
function startRun(
  state: GameState,
  mapId: MapId,
  characterId: CharacterId,
  seed: number,
  traits: Traits,
  copy: ProgramCopy,
): GameResult {
  // The state of the map at this start settles whether the run pays practice (D-189, D-214).
  const solvedMapRun = state.solvedMaps.includes(mapId);
  const equipment = takeTrip(
    copy.program.tripPlan,
    state.team.chest,
    traits.carryingCapacity,
    mapOf(mapId),
  );
  const skills =
    state.run?.character.skills ??
    state.team.characters.find((character) => character.id === characterId)!
      .skills;
  const started = newMapRun(
    mapOf(mapId),
    seed,
    programOf(state, copy.program, characterId, skills),
    { mapId, characterId },
    traits,
    skills,
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
        ...startRecord(equipment.backpack),
        deposited: null,
        solvedMapRun,
        deathSettlement: null,
        completionSettlement: null,
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
 * „Program” under „Zawsze” and the next program number 2, a team with no character, an empty chest
 * and its resurrection with every use left, no map run.
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
    team: {
      characters: [],
      chest: { pieces: {} },
      resurrectionUsesSpent: 0,
      resurrectionNextReturnAtMs: null,
    },
    nextCharacterId: 1,
    run: null,
    lastSeed: INITIAL_SEED,
    paused: false,
    solvedMaps: [],
    pace: 1,
    discovery: null,
    realMsCarry: 0,
    loops: {},
    stoppedLoops: {},
    awayReport: [],
    judgings: {},
    saveTimeMs: null,
  };
}

/**
 * Within a map run, replaces the copy the map run carries out, checked against the run's map; the
 * copy's program and base stay. The running activity is left as it is, and the copy takes effect
 * when the character next picks a program rule. Where the copy checked differs from the copy before
 * it — groups and rules in order with their identities, conditions and actions, and the identity
 * counters — the streak and count of beaten attacks of a map run not ended, in death or a completion,
 * become 0, paused or not, a streak that stood above zero being returned as one event of its loss; a
 * copy handed back as it stands leaves both.
 *
 * Without a map run, replaces the content of the program a character with no pick and no program
 * used last goes with, `teamProgram`, checked against the resources of every map; the counts are
 * reconciled where they stand beside that program, and the judgings remembered for it are erased where
 * its rules, rule groups or trip plan come out different (D-440).
 */
export function setProgram(state: GameState, program: Program): GameResult {
  const run = state.run;
  if (run) {
    return withCopyProgram(state, run, checkProgram(program, run));
  }
  const edited = teamProgram(state);
  const checked = checkProgram(program, null);
  return {
    state: {
      ...state,
      ...withProgramSaved(state, edited.id, checked),
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
 * characters and with the traits of a new character, at the end of the team's list, bringing no
 * resurrection of its own (the team's is shared); throws on a name that is empty once trimmed.
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
    generation: 1,
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
 * the program `rowProgram` gives that character (D-170): the one picked for it in „Kto idzie” on the
 * card of a map, else the one it used last, else the one with which a character last entered a map,
 * else the first of the list. A new map run at minute 0, seeded from the last seed and real time,
 * its character carrying its own copy of the traits of the team's character
 * sent, carrying out a copy of that program whose base is the program's content. That program
 * becomes the character's program used last and the one a character last entered a map with, and
 * the character's pick is cleared and its entry of `stoppedLoops` goes. Throws while a map run is in
 * progress, so one map run goes on at a time, for a character in an earning loop, and on a program
 * number not on the list.
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
  if (Object.hasOwn(state.loops, characterId))
    throw new Error(
      `send: character ${String(characterId)} is in an earning loop`,
    );
  const chosen =
    programId === undefined
      ? rowProgram(state, characterId)
      : programById(state.programs, programId);
  if (!chosen)
    throw new Error(`send: no program ${String(programId)} on the list`);
  const seed = mixSeed(state.lastSeed, realMs);
  const pickedPrograms = { ...state.pickedPrograms };
  delete pickedPrograms[characterId];
  const stoppedLoops = { ...state.stoppedLoops };
  delete stoppedLoops[characterId];
  return startRun(
    {
      ...state,
      lastSeed: seed,
      pickedPrograms,
      stoppedLoops,
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
 * it is, unsaved changes included; every count starts from zero. The new map run takes the skills
 * of the one it replaces, its repertoire with them; after a death that took everything, the skills
 * the team's character was left with.
 */
export function restart(state: GameState): GameResult {
  const run = requireRun(state, "restart");
  const lost = run.deathSettlement?.kind === "progressLost";
  const started = startRun(
    // With no map run standing, the start reads the character's skills from the team.
    lost ? { ...state, run: null } : state,
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
 * What a death of the character `died` at the real moment `nowMs` does to the team, the one rule both
 * a manual map run and an earning loop settle by; `gathered` is the practice gathered at the
 * character's earning loop, `{}` where it has none. A character with no practice yet — none in any
 * skill, no rank bought, none in `gathered` — loses nothing the resurrection would have guarded, so
 * its death leaves the team as it is, the uses and their moment as they stood. Otherwise the uses that
 * returned up to `nowMs`, that moment included, count first. With one left it is spent and the
 * character stays as it is: a death with every use left starts the clock, the next use returning the
 * renewal after `nowMs`, and a death with the clock running leaves its moment as it runs, which a
 * death settled at an earlier real moment after another never moves back (D-240); the settlement
 * holds the uses spent after it. With none left the character loses all its practice and ranks and its
 * generation number grows by one, the uses and their moment unchanged. `nowMs` is taken as a safe
 * integer; the caller checks it. A safe `nowMs` that carries a moment of the clock beyond the safe
 * integers is still a RangeError (D-386).
 */
export function teamAfterDeath(
  team: Team,
  died: Character,
  gathered: Practice,
  nowMs: number,
): { team: Team; settlement: DeathSettlement } {
  if (hasNoPractice(died.skills, gathered))
    return { team, settlement: { kind: "noPractice" } };
  const { spent, nextReturnMs } = usesAt(team, nowMs);
  if (spent < BALANCE.resurrectionUses)
    return {
      team: {
        ...team,
        resurrectionUsesSpent: spent + 1,
        resurrectionNextReturnAtMs:
          nextReturnMs ?? momentAfter(nowMs, renewalMs()),
      },
      settlement: {
        kind: "resurrectionUsed",
        usesSpent: spent + 1,
      },
    };
  const generation = died.generation + 1;
  const lost: Character = {
    ...died,
    skills: newSkills(ARCHETYPES[died.archetypeId].predispositions),
    generation,
  };
  return {
    team: {
      ...team,
      characters: team.characters.map((character) =>
        character === died ? lost : character,
      ),
    },
    settlement: { kind: "progressLost", generation },
  };
}

/**
 * Settles the death of the map run at the real moment `nowMs`, once. Called by whoever knows real
 * time, never by the functions that pass game time. It settles as `teamAfterDeath` does, a manual map
 * run's character having no earning loop and so no practice gathered at one: a character with no
 * practice leaves the team and itself as they were; otherwise, with a use of the team's resurrection
 * left it is spent, and with none left the character loses all its practice and ranks and its
 * generation number grows by one. The map run holds how it went; its own
 * skills, the chest, the programs, the Understanding and the solved maps are out of reach, and the
 * mark of a solved map plays no part. With no map run, no death or a death settled, returns the very
 * state it got, without reading `nowMs`; otherwise a `nowMs` that is no safe integer, or whose
 * moment of the clock is beyond the safe integers, is a RangeError. A death that takes the practice and
 * the ranks erases every judging remembered for the character (D-440).
 */
export function settleDeath(state: GameState, nowMs: number): GameResult {
  const run = state.run;
  if (!run?.death || run.deathSettlement) return { state, events: [] };
  if (!Number.isSafeInteger(nowMs)) {
    throw new RangeError(
      `settleDeath: ${String(nowMs)} is not a safe integer moment`,
    );
  }
  const died = state.team.characters.find(
    (character) => character.id === run.character.id,
  )!;
  const settled = teamAfterDeath(state.team, died, {}, nowMs);
  return {
    state: {
      ...state,
      team: settled.team,
      judgings: judgingsAfterDeath(state.judgings, died.id, settled.settlement),
      run: { ...run, deathSettlement: settled.settlement },
    },
    events: [],
  };
}

/**
 * Settles the completion of the map run at the real moment `nowMs`, once, as `settleDeath` settles a
 * death: called by whoever knows real time, never by the functions that pass game time. A completion
 * of a map the account had not solved when the run started (the run is not marked, D-189) returns one
 * use of the team's resurrection where one is spent at `nowMs`, the uses that returned up to `nowMs`
 * counting first, the clock running on as it was and stopping when the stock is then full, and leaves
 * a full stock as it is; the run holds which it was. With no map run, no completion, a completion of a solved map or a
 * completion settled, returns the very state it got, without reading `nowMs`; otherwise a `nowMs`
 * that is no safe integer, or whose moment of the clock is beyond the safe integers, is a RangeError.
 */
export function settleCompletion(state: GameState, nowMs: number): GameResult {
  const run = state.run;
  if (!run?.completion || run.solvedMapRun || run.completionSettlement)
    return { state, events: [] };
  if (!Number.isSafeInteger(nowMs)) {
    throw new RangeError(
      `settleCompletion: ${String(nowMs)} is not a safe integer moment`,
    );
  }
  const { spent, nextReturnMs } = usesAt(state.team, nowMs);
  const renewed = spent > 0;
  return {
    state: {
      ...state,
      team: renewed
        ? {
            ...state.team,
            resurrectionUsesSpent: spent - 1,
            resurrectionNextReturnAtMs: spent === 1 ? null : nextReturnMs,
          }
        : state.team,
      run: {
        ...run,
        completionSettlement: {
          kind: renewed ? "resurrectionRenewed" : "resurrectionReady",
        },
      },
    },
    events: [],
  };
}

/**
 * A copy of the state holding the real moment `nowMs` as its save time (D-248), with the uses of the
 * team's resurrection brought up to date at that moment: each spent use whose moment has come, that
 * moment included, is stored as returned and the moment of the next recomputed, none stored when none
 * is spent (D-386). The document then holds the count the game reckons at the saved moment, not the
 * one the last settled death or first solving left, so a count lowered in the data later refuses only
 * a save with more uses spent at its own moment than the new count; from `nowMs` on the game reckons
 * the same uses from the copy as from the state (`resurrectionAt`), by the one clock of D-190. Whoever
 * saves applies it on the way to the saved document only, so the state the view holds stays the very
 * value it was and a comparison by identity sees no change in a save. A `nowMs` that is no safe
 * integer, or whose moment of the clock is beyond the safe integers, is a RangeError.
 */
export function withSaveTime(state: GameState, nowMs: number): GameState {
  if (!Number.isSafeInteger(nowMs)) {
    throw new RangeError(
      `withSaveTime: ${String(nowMs)} is not a safe integer moment`,
    );
  }
  const { spent, nextReturnMs } = usesAt(state.team, nowMs);
  const team =
    spent === state.team.resurrectionUsesSpent
      ? state.team
      : {
          ...state.team,
          resurrectionUsesSpent: spent,
          resurrectionNextReturnAtMs: nextReturnMs,
        };
  return { ...state, team, saveTimeMs: nowMs };
}

/**
 * Passes real time to the map run in progress. Ignored without a map run, with one ended in
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
 * at the first chill, where the copy holds no rule with the action "Eksploruj", the rule "Zawsze →
 * Eksploruj" enters the copy, its base and the copy's program while that program is on the list,
 * each by `withFirstChillRule` on its own content, and no other program, and the pick that ends the minute is made from the copy and the Understanding as they
 * then stand. A span that reaches
 * the character's death, or the whole minute of a discovery, stops there; a stop at a discovery
 * leaves the game paused, holding what the minute revealed. A map run that meets the solving
 * condition of its map in a minute completes there, once the minute's discovery has taken hold: the
 * rest of the minute has taken effect, the event `mapRunCompleted` follows the minute's other
 * events, no program rule is picked and the map is added to the solved maps; the completion deposits
 * the bring list clipped as every completion does, for every run (D-189), and pays practice only for
 * a run not marked `solvedMapRun`, and a death pays nothing; where the minute of a completion or of
 * a death is
 * also a discovery's, the game holds the discovery and is not paused (D-122). A map run that has ended
 * changes nothing. A death stays unsettled here: this function knows no real time, and whoever
 * passes it game time then calls `settleDeath`, as a saved document holding a death unsettled is
 * refused at the load; the renewal of the team's resurrection at the first completion of a map is
 * settled by `settleCompletion` in the same way.
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
  let record = recordOf(state.run);
  let copy = state.run.copy;
  let program = programOf(
    current,
    copy.program,
    run.character.id,
    run.character.skills,
  );
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
      if (found.chill && !holdsRuleWith(copy.program, "explore")) {
        const written = withFirstChillRule(copy.program);
        const owner = programById(current.programs, copy.programId);
        current = {
          ...current,
          ruleCounts: reconcileCounts(
            current.ruleCounts,
            copy.program,
            written,
          ),
          ...(owner &&
            withProgramSaved(
              current,
              owner.id,
              withFirstChillRule(owner.program),
            )),
        };
        copy = {
          ...copy,
          program: written,
          base: withFirstChillRule(copy.base),
        };
      }
      program = programOf(
        current,
        copy.program,
        run.character.id,
        run.character.skills,
      );
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
    record = nextRecord(record, run, finished.run);
    run = finished.run;
    completed = run.completion !== null;
    if (mapRunEnded(run) || revealed) break;
  }
  const endedRun = {
    ...run,
    ...record,
    copy,
    bringPlan: state.run.bringPlan,
    deposited: null,
    solvedMapRun: state.run.solvedMapRun,
    deathSettlement: null,
    completionSettlement: null,
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
      ...(revealed && { discovery: revealed, paused: !mapRunEnded(run) }),
      ...(completed &&
        !current.solvedMaps.includes(run.mapId) && {
          solvedMaps: [...current.solvedMaps, run.mapId],
        }),
      ...(completed &&
        !endedRun.solvedMapRun && {
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
