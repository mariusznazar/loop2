import { newTraits } from "./character.js";
import { CREATED_ARCHETYPE } from "./data/archetypes.js";
import { newUnderstanding } from "./understanding.js";
import { BALANCE, INITIAL_SEED } from "./data/balance.js";
import { ITEMS } from "./data/items.js";
import { MAPS, type MapDef } from "./data/maps.js";
import { conditionNumber, onStep } from "./program.js";
import { mixSeed } from "./random.js";
import { newMapRun, stepMinute, type GameEvent } from "./run.js";
import type {
  Action,
  Character,
  CharacterId,
  Condition,
  GameState,
  ItemId,
  MapId,
  MapRun,
  Program,
  ProgramRule,
  ResourceId,
  Traits,
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
    state.program,
    { mapId, characterId },
    traits,
  );
  return {
    state: {
      ...state,
      ruleCounts: countStarts(zeros, started.events),
      run: started.run,
      paused: false,
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
    realMsCarry: 0,
  };
}

/**
 * Replaces the program. Allowed with or without a map run; the running activity is left as it
 * is, and the program takes effect when the character next picks a program rule.
 */
export function setProgram(state: GameState, program: Program): GameResult {
  const checked = checkProgram(program, state.run);
  return {
    state: {
      ...state,
      program: checked,
      ruleCounts: reconcileCounts(state, checked),
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
    state: { ...state, run: null, paused: false, realMsCarry: 0 },
    events: [{ kind: "mapRunEnded" }],
  };
}

/** Pauses or resumes the map run in progress; without one, nothing changes. */
export function setPaused(state: GameState, paused: boolean): GameResult {
  if (!state.run) return { state, events: [] };
  return { state: { ...state, paused }, events: [] };
}

/**
 * The only way real time enters the simulation. Ignored without a map run, with one ended in
 * death, while paused, or when realMs is not a finite number above zero; otherwise every whole
 * scaled second becomes a game minute and the rest carries over to the next call. Where the
 * character dies, time stops there and nothing carries over.
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
  const total = state.realMsCarry + realMs * BALANCE.gameMinutesPerRealSecond;
  const minutes = Math.floor(total / MS_PER_SECOND);
  const carried = { ...state, realMsCarry: total - minutes * MS_PER_SECOND };
  const result = advanceMinutes(carried, minutes);
  if (!result.state.run?.death) return result;
  return { state: { ...result.state, realMsCarry: 0 }, events: result.events };
}

/**
 * A span of game minutes: the minute step repeated, with the current program; also while paused.
 * A span that reaches the character's death stops there; a map run ended in death changes nothing.
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
  let run = state.run;
  for (let minute = 0; minute < minutes; minute += 1) {
    const stepped = stepMinute(run, map, state.program);
    run = stepped.run;
    events.push(...stepped.events);
    if (run.death) break;
  }
  return {
    state: { ...state, run, ruleCounts: countStarts(state.ruleCounts, events) },
    events,
  };
}
