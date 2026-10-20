import { ARCHETYPES } from "./data/archetypes.js";
import { BALANCE, INITIAL_SEED } from "./data/balance.js";
import { CONDITIONS } from "./data/conditions.js";
import { MAPS, type MapDef } from "./data/maps.js";
import { mixSeed } from "./random.js";
import { newMapRun, stepMinute, type GameEvent } from "./run.js";
import type {
  Action,
  ArchetypeId,
  Condition,
  GameState,
  MapId,
  MapRun,
  Program,
  ProgramRule,
  ResourceId,
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

function checkCondition(
  value: unknown,
  allowed: ReadonlySet<string>,
): Condition {
  if (!isObject(value)) throw new Error("program: a rule has no condition");
  switch (value.kind) {
    case "always":
      return { kind: "always" };
    case "hereBelow": {
      const { min, max } = CONDITIONS.hereBelow;
      const number = value.value;
      if (
        typeof number !== "number" ||
        !Number.isInteger(number) ||
        number < min ||
        number > max
      ) {
        throw new Error(
          `program: ${String(number)} is not a whole number from ${min} to ${max}`,
        );
      }
      return {
        kind: "hereBelow",
        resource: checkResource(value.resource, allowed),
        value: number,
      };
    }
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
    default:
      throw new Error(
        `program: action kind ${String(value.kind)} is not on the closed list`,
      );
  }
}

/** A copy of the program built from the closed list; throws on anything outside it. */
function checkProgram(value: unknown, run: MapRun | null): Program {
  if (!isObject(value) || !Array.isArray(value.rules))
    throw new Error("program: no list of rules");
  const allowed = allowedResources(run);
  const rules = value.rules.map((rule: unknown): ProgramRule => {
    if (!isObject(rule))
      throw new Error(
        "program: a rule is not a pair of a condition and an action",
      );
    return {
      condition: checkCondition(rule.condition, allowed),
      action: checkAction(rule.action, allowed),
    };
  });
  return { rules };
}

function requireRun(state: GameState, name: string): MapRun {
  if (!state.run) throw new Error(`${name}: there is no map run`);
  return state.run;
}

/** A new map run at minute 0 with the current program; events mapRunStarted, activityStarted. */
function startRun(
  state: GameState,
  mapId: MapId,
  archetypeId: ArchetypeId,
  seed: number,
): GameResult {
  const started = newMapRun(mapOf(mapId), seed, state.program, {
    mapId,
    archetypeId,
  });
  return {
    state: { ...state, run: started.run, paused: false, realMsCarry: 0 },
    events: [{ kind: "mapRunStarted", seed }, ...started.events],
  };
}

/** The game as it stands before anything is done: no program rules, no map run. */
export function newGame(): GameState {
  return {
    program: { rules: [] },
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
  return {
    state: { ...state, program: checkProgram(program, state.run) },
    events: [],
  };
}

/** Sends a character to a map: a new map run at minute 0, seeded from the last seed and real time. */
export function send(
  state: GameState,
  ids: { mapId: MapId; archetypeId: ArchetypeId },
  realMs: number,
): GameResult {
  if (state.run) throw new Error("send: a map run is in progress");
  const { mapId, archetypeId } = ids;
  if (typeof mapId !== "string" || !Object.hasOwn(MAPS, mapId))
    throw new Error(`send: no map ${String(mapId)}`);
  if (
    typeof archetypeId !== "string" ||
    !Object.hasOwn(ARCHETYPES, archetypeId)
  ) {
    throw new Error(`send: no archetype ${String(archetypeId)}`);
  }
  const seed = mixSeed(state.lastSeed, realMs);
  return startRun({ ...state, lastSeed: seed }, mapId, archetypeId, seed);
}

/** Ends the map run in progress and starts a new one of the same map, character and seed. */
export function restart(state: GameState): GameResult {
  const run = requireRun(state, "restart");
  const started = startRun(
    state,
    run.mapId,
    run.character.archetypeId,
    run.seed,
  );
  return {
    state: started.state,
    events: [{ kind: "mapRunEnded" }, ...started.events],
  };
}

/** Ends the map run in progress; the program and the last seed stay. */
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
 * The only way real time enters the simulation. Ignored without a map run, while paused, or when
 * realMs is not a finite number above zero; otherwise every whole scaled second becomes a game
 * minute and the rest carries over to the next call.
 */
export function passRealTime(state: GameState, realMs: number): GameResult {
  if (
    !state.run ||
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
  return advanceMinutes(carried, minutes);
}

/** A span of game minutes: the minute step repeated, with the current program; also while paused. */
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
  if (!state.run || minutes === 0) return { state, events: [] };
  const map = mapOf(state.run.mapId);
  const events: GameEvent[] = [];
  let run = state.run;
  for (let minute = 0; minute < minutes; minute += 1) {
    const stepped = stepMinute(run, map, state.program);
    run = stepped.run;
    events.push(...stepped.events);
  }
  return { state: { ...state, run }, events };
}
