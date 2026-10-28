import { newTraits } from "./character.js";
import { ARCHETYPES, CREATED_ARCHETYPE } from "./data/archetypes.js";
import {
  discover,
  newUnderstanding,
  programInRepertoire,
  repertoireOf,
  withFirstChillRule,
} from "./understanding.js";
import { BALANCE, INITIAL_SEED } from "./data/balance.js";
import { ITEMS } from "./data/items.js";
import { MAPS, type MapDef } from "./data/maps.js";
import { conditionNumber, onStep } from "./program.js";
import { mixSeed } from "./random.js";
import {
  minuteBeforePick,
  newMapRun,
  pickActivity,
  type GameEvent,
} from "./run.js";
import type {
  Action,
  Character,
  CharacterId,
  Condition,
  GameState,
  ItemId,
  MapId,
  MapRun,
  Pace,
  Program,
  ProgramRule,
  ResourceId,
  Traits,
  Understanding,
} from "./types.js";

export type { GameEvent };

/** What every state-changing function of the game returns. */
export type GameResult = { state: GameState; events: GameEvent[] };

const MS_PER_SECOND = 1000;

function mapOf(mapId: MapId): MapDef {
  return MAPS[mapId];
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

/** The resources a program may name: the run's map's, or without a run those of any map. */
function allowedResources(run: MapRun | null): ReadonlySet<string> {
  const maps: MapDef[] = run ? [mapOf(run.mapId)] : Object.values(MAPS);
  return new Set(
    maps.flatMap((map) => map.resources.map((resource) => resource.id)),
  );
}

function checkResource(
  value: unknown,
  allowed: ReadonlySet<string>,
): ResourceId {
  if (typeof value !== "string" || !allowed.has(value)) {
    throw new Error(
      `program: resource ${String(value)} is not a resource of the map`,
    );
  }
  return value as ResourceId;
}

/** An item of the data, bound to no map. */
function checkItem(value: unknown): ItemId {
  if (typeof value !== "string" || !Object.hasOwn(ITEMS, value)) {
    throw new Error(
      `program: item ${String(value)} is not an item of the data`,
    );
  }
  return value as ItemId;
}

/**
 * How far a number may lie from its step's grid and still be taken, as a part of the step: binary
 * rounding, never a number the player could type.
 */
const STEP_TOLERANCE = 1e-9;

/**
 * The number of a condition of `kind`: a finite number from the kind's minimum to its maximum, on
 * its step counted from the minimum, held as the decimal of that step.
 */
function checkNumber(kind: Condition["kind"], value: unknown): number {
  const number = conditionNumber(kind);
  if (!number)
    throw new Error(`program: condition kind ${kind} takes no number`);
  const { min, max, step } = number;
  if (
    typeof value !== "number" ||
    !Number.isFinite(value) ||
    value < min ||
    value > max
  ) {
    throw new Error(
      `program: ${String(value)} is not a number from ${min} to ${max}`,
    );
  }
  const held = onStep(value, number);
  if (Math.abs(value - held) > step * STEP_TOLERANCE) {
    throw new Error(
      `program: ${String(value)} does not lie on the step ${step} from ${min}`,
    );
  }
  return held;
}

function checkCondition(
  value: unknown,
  allowed: ReadonlySet<string>,
): Condition {
  if (!isObject(value)) throw new Error("program: a rule has no condition");
  switch (value.kind) {
    case "always":
      return { kind: "always" };
    case "hereBelow": {
      const number = checkNumber("hereBelow", value.value);
      return {
        kind: "hereBelow",
        resource: checkResource(value.resource, allowed),
        value: number,
      };
    }
    case "itemBelow": {
      const number = checkNumber("itemBelow", value.value);
      return { kind: "itemBelow", item: checkItem(value.item), value: number };
    }
    // The body's conditions and those on the campfire name nothing: the simulation reads the
    // character's body, and the campfire on its tile or the nearest one.
    case "temperatureBelow":
    case "satietyBelow":
    case "campfireLeftBelow":
      return { kind: value.kind, value: checkNumber(value.kind, value.value) };
    case "awayFromCampfire":
      return { kind: "awayFromCampfire" };
    default:
      throw new Error(
        `program: condition kind ${String(value.kind)} is not on the closed list`,
      );
  }
}

function checkAction(value: unknown, allowed: ReadonlySet<string>): Action {
  if (!isObject(value)) throw new Error("program: a rule has no action");
  switch (value.kind) {
    case "explore":
      return { kind: "explore" };
    case "wander":
      return { kind: "wander" };
    case "walkTo":
      return {
        kind: "walkTo",
        resource: checkResource(value.resource, allowed),
      };
    case "gather":
      return {
        kind: "gather",
        resource: checkResource(value.resource, allowed),
      };
    // The actions on the campfire and the backpack name nothing: the simulation picks the
    // campfire on the character's tile, or the nearest one, and the pieces they use.
    case "walkToCampfire":
      return { kind: "walkToCampfire" };
    case "craftCampfire":
      return { kind: "craftCampfire" };
    case "lightCampfire":
      return { kind: "lightCampfire" };
    case "lightItem":
      return { kind: "lightItem" };
    case "feedCampfire":
      return { kind: "feedCampfire" };
    case "eat":
      return { kind: "eat" };
    default:
      throw new Error(
        `program: action kind ${String(value.kind)} is not on the closed list`,
      );
  }
}

/** A positive safe integer, so a stored identity remains exact. */
function checkIdentity(value: unknown): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 1)
    throw new Error("program: an identity is not a positive safe integer");
  return value;
}

/** Each identity occurs once and precedes its next-identity counter. */
function uniqueIdentity(
  value: unknown,
  next: number,
  seen: Set<number>,
): number {
  const id = checkIdentity(value);
  if (id >= next || seen.has(id))
    throw new Error(
      "program: an identity is duplicated or reaches its next counter",
    );
  seen.add(id);
  return id;
}

/** A copy of the program built from the closed list; throws on anything outside it. */
function checkProgram(value: unknown, run: MapRun | null): Program {
  if (!isObject(value) || !Array.isArray(value.groups))
    throw new Error("program: no list of groups");
  const nextGroupId = checkIdentity(value.nextGroupId);
  const nextRuleId = checkIdentity(value.nextRuleId);
  const allowed = allowedResources(run);
  const groupIds = new Set<number>();
  const ruleIds = new Set<number>();
  const groups = value.groups.map((group: unknown) => {
    if (
      !isObject(group) ||
      typeof group.name !== "string" ||
      !Array.isArray(group.rules) ||
      Object.hasOwn(group, "groups")
    )
      throw new Error(
        "program: a group must hold a name and a list of rules at one level",
      );
    const id = uniqueIdentity(group.id, nextGroupId, groupIds);
    const condition = checkCondition(group.condition, allowed);
    const rules = group.rules.map((rule: unknown): ProgramRule => {
      if (!isObject(rule))
        throw new Error(
          "program: a rule is not a pair of a condition and an action",
        );
      return {
        id: uniqueIdentity(rule.id, nextRuleId, ruleIds),
        condition: checkCondition(rule.condition, allowed),
        action: checkAction(rule.action, allowed),
      };
    });
    return { id, name: group.name, condition, rules };
  });
  return { groups, nextGroupId, nextRuleId };
}

function requireRun(state: GameState, name: string): MapRun {
  if (!state.run) throw new Error(`${name}: there is no map run`);
  return state.run;
}

/** Counts follow rule identity and canonical validated content, never group or position. */
function reconcileCounts(
  state: GameState,
  program: Program,
): GameState["ruleCounts"] {
  if (state.ruleCounts === null) return null;
  const previous = new Map(
    state.program.groups.flatMap((group) =>
      group.rules.map((rule) => [rule.id, rule] as const),
    ),
  );
  return Object.fromEntries(
    program.groups.flatMap((group) =>
      group.rules.map((rule) => {
        const old = previous.get(rule.id);
        const unchanged =
          old &&
          JSON.stringify([old.condition, old.action]) ===
            JSON.stringify([rule.condition, rule.action]);
        return [rule.id, unchanged ? (state.ruleCounts?.[rule.id] ?? 0) : 0];
      }),
    ),
  );
}

/** Consume starts once; waits and finishes have no firing to count. Inputs stay unchanged. */
function countStarts(
  counts: GameState["ruleCounts"],
  events: readonly GameEvent[],
): GameState["ruleCounts"] {
  if (counts === null) return null;
  let next = counts;
  for (const event of events) {
    if (event.kind !== "activityStarted" || event.activity.kind !== "rule")
      continue;
    const id = event.activity.ruleId;
    if (!Object.hasOwn(next, id)) continue;
    if (next === counts) next = { ...counts };
    next[id] += 1;
  }
  return next;
}

/**
 * The program as the character `characterId` can carry it out: reduced to the repertoire of its
 * archetype over the game's Understanding. A rule outside it is passed over and stays in
 * `state.program`; a character the team does not list takes the archetype of created characters.
 */
function programOf(state: GameState, characterId: CharacterId): Program {
  const character = state.team.characters.find(
    (listed) => listed.id === characterId,
  );
  const archetype = ARCHETYPES[character?.archetypeId ?? CREATED_ARCHETYPE];
  return programInRepertoire(
    state.program,
    repertoireOf(state.understanding, archetype.predispositions),
  );
}

/** A new map run at minute 0 with the current program; events mapRunStarted, activityStarted. */
function startRun(
  state: GameState,
  mapId: MapId,
  characterId: CharacterId,
  seed: number,
  traits: Traits,
): GameResult {
  const zeros = Object.fromEntries(
    state.program.groups.flatMap((group) =>
      group.rules.map((rule) => [rule.id, 0]),
    ),
  );
  const started = newMapRun(
    mapOf(mapId),
    seed,
    programOf(state, characterId),
    { mapId, characterId },
    traits,
  );
  return {
    state: {
      ...state,
      ruleCounts: countStarts(zeros, started.events),
      run: started.run,
      paused: false,
      discovery: null,
      realMsCarry: 0,
    },
    events: [{ kind: "mapRunStarted", seed }, ...started.events],
  };
}

/** The game as it stands before anything is done: no program rules, a team with no character
 * and an empty chest, no map run. */
export function newGame(): GameState {
  return {
    program: {
      groups: [
        { id: 1, name: "Program", condition: { kind: "always" }, rules: [] },
      ],
      nextGroupId: 2,
      nextRuleId: 1,
    },
    understanding: newUnderstanding(),
    ruleCounts: null,
    team: { characters: [], chest: { pieces: {} } },
    nextCharacterId: 1,
    run: null,
    lastSeed: INITIAL_SEED,
    paused: false,
    pace: 1,
    discovery: null,
    realMsCarry: 0,
  };
}

/** Deep equality of plain data: the same keys with equal values, arrays in order. */
function sameData(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (!isObject(a) || !isObject(b) || Array.isArray(a) !== Array.isArray(b))
    return false;
  const keys = Object.keys(a);
  return (
    keys.length === Object.keys(b).length &&
    keys.every((key) => Object.hasOwn(b, key) && sameData(a[key], b[key]))
  );
}

/**
 * Replaces the program. Allowed with or without a map run; the running activity is left as it
 * is, and the program takes effect when the character next picks a program rule. Where the
 * program checked differs from the one the state holds — groups and rules in order with their
 * identities, conditions and actions, and the identity counters — the streak of a map run not
 * ended in death becomes 0, paused or not; a program handed back as it stands leaves it.
 */
export function setProgram(state: GameState, program: Program): GameResult {
  const checked = checkProgram(program, state.run);
  const zeroed =
    state.run && !state.run.death && !sameData(state.program, checked);
  return {
    state: {
      ...state,
      program: checked,
      ruleCounts: reconcileCounts(state, checked),
      ...(zeroed && state.run && { run: { ...state.run, streak: 0 } }),
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
 * Sends a character of the team to a map: a new map run at minute 0, seeded from the last seed and
 * real time, its character carrying its own copy of the traits of the team's character sent.
 * Throws while a map run is in progress, so one map run goes on at a time.
 */
export function send(
  state: GameState,
  ids: { mapId: MapId; characterId: CharacterId },
  realMs: number,
): GameResult {
  if (state.run) throw new Error("send: a map run is in progress");
  const { mapId, characterId } = ids;
  if (typeof mapId !== "string" || !Object.hasOwn(MAPS, mapId))
    throw new Error(`send: no map ${String(mapId)}`);
  const sent = state.team.characters.find(
    (character) => character.id === characterId,
  );
  if (!sent)
    throw new Error(`send: no character ${String(characterId)} in the team`);
  const seed = mixSeed(state.lastSeed, realMs);
  return startRun({ ...state, lastSeed: seed }, mapId, characterId, seed, {
    ...sent.traits,
  });
}

/**
 * Ends the map run in progress, or one ended in death, and starts a new one of the same map,
 * character, traits and seed.
 */
export function restart(state: GameState): GameResult {
  const run = requireRun(state, "restart");
  const started = startRun(
    state,
    run.mapId,
    run.character.id,
    run.seed,
    run.character.traits,
  );
  return {
    state: started.state,
    events: [{ kind: "mapRunEnded" }, ...started.events],
  };
}

/** Ends the map run in progress, or one ended in death; the program and the last seed stay. */
export function end(state: GameState): GameResult {
  requireRun(state, "end");
  return {
    state: {
      ...state,
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
 * death, while paused, or when realMs is not a finite number above zero; otherwise every whole
 * scaled second becomes a game minute, real time scaled by the pace in force, and the rest carries
 * over to the next call at the pace it was passed at. Where the
 * character dies, time stops there and nothing carries over; the same where the span ends at a
 * discovery, which leaves the game paused.
 */
export function passRealTime(state: GameState, realMs: number): GameResult {
  if (
    !state.run ||
    state.run.death ||
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
    result.events.some((event) => event.kind === "discovered");
  if (!stopped) return result;
  return { state: { ...result.state, realMsCarry: 0 }, events: result.events };
}

/**
 * A span of game minutes: the minute of D-71 repeated, also while paused. A discovery takes hold
 * between the minute's last effect and the pick: what the minute revealed enters the Understanding,
 * at the first chill the rule "Zawsze → Eksploruj" enters the program, and the pick that ends the
 * minute is made from the program and the Understanding as they then stand. A span that reaches
 * the character's death, or the whole minute of a discovery, stops there; a stop at a discovery
 * leaves the game paused, holding what the minute revealed. A map run ended in death changes
 * nothing.
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
  if (!state.run || state.run.death || minutes === 0)
    return { state, events: [] };
  const map = mapOf(state.run.mapId);
  const events: GameEvent[] = [];
  let current = state;
  let run = state.run;
  let program = programOf(current, run.character.id);
  let revealed: Understanding | null = null;
  for (let minute = 0; minute < minutes; minute += 1) {
    const stepped = minuteBeforePick(run, map);
    events.push(...stepped.events);
    const found = discover(
      current.understanding,
      run,
      stepped.run,
      stepped.events,
    );
    if (found) {
      const written = found.chill ? withFirstChillRule(current.program) : null;
      current = {
        ...current,
        understanding: found.understanding,
        ...(written && {
          program: written,
          ruleCounts: reconcileCounts(current, written),
        }),
      };
      program = programOf(current, run.character.id);
      revealed = found.revealed;
      events.push({
        kind: "discovered",
        minute: stepped.run.minute,
        ...found.revealed,
      });
    }
    run = stepped.run;
    if (stepped.picks) {
      const picked = pickActivity(run, map, program);
      run = picked.run;
      events.push(...picked.events);
    }
    if (run.death || revealed) break;
  }
  return {
    state: {
      ...current,
      ...(revealed && { paused: true, discovery: revealed }),
      run,
      ruleCounts: countStarts(current.ruleCounts, events),
    },
    events,
  };
}
