import { bodyMinute, startingBody } from "./body.js";
import { newBackpack, newTraits } from "./character.js";
import { ACTIONS } from "./data/actions.js";
import { BALANCE } from "./data/balance.js";
import type { MapDef } from "./data/maps.js";
import { neighbours, sameHex, tileAt } from "./hex.js";
import { drawLayout } from "./layout.js";
import { chooseActivity, walkTarget } from "./program.js";
import { nextRandom, streamState } from "./random.js";
import { warmthAt, worldMinute } from "./world.js";
import type {
  Activity,
  ArchetypeId,
  CurrentActivity,
  DeathCause,
  Hex,
  MapId,
  MapRun,
  Program,
  Traits,
} from "./types.js";

/** What happened in the simulation, minute-stamped, in order of occurrence. */
export type GameEvent =
  | { kind: "mapRunStarted"; seed: number }
  | { kind: "mapRunEnded" }
  | {
      kind: "activityStarted";
      minute: number;
      activity: Activity;
      stepTo: Hex | null;
    }
  | { kind: "activityFinished"; minute: number; activity: Activity }
  | { kind: "tileRevealed"; minute: number; at: Hex }
  | { kind: "moved"; minute: number; from: Hex; to: Hex }
  | { kind: "characterDied"; minute: number; cause: DeathCause };

/**
 * Chooses the next activity at the run's minute with the given program and starts it.
 * Only a started Wędruj draws, once, from the wander generator.
 */
function startActivity(
  run: Omit<MapRun, "current">,
  map: MapDef,
  program: Program,
): { current: CurrentActivity; wanderRandom: number; event: GameEvent } {
  const activity = chooseActivity(run, map, program);
  let wanderRandom = run.wanderRandom;
  let stepTo: Hex | null = null;
  let minutes: number = BALANCE.waitMinutes;

  if (activity.kind === "rule") {
    const action = activity.action;
    switch (action.kind) {
      case "explore":
        minutes = ACTIONS.explore.minutes;
        break;
      case "wander": {
        const around = neighbours(run.tiles, run.character.at);
        const unrevealed = around.filter((tile) => !tile.revealed);
        const candidates = unrevealed.length > 0 ? unrevealed : around;
        const draw = nextRandom(run.wanderRandom);
        wanderRandom = draw.state;
        const target = candidates[Math.floor(draw.value * candidates.length)];
        stepTo = { ...target.at };
        minutes = target.stepMinutes;
        break;
      }
      case "walkTo": {
        const next = walkTarget(run, action.resource)!.next;
        stepTo = { ...next };
        minutes = tileAt(run.tiles, next)!.stepMinutes;
        break;
      }
    }
  }

  const current: CurrentActivity = {
    activity,
    startMinute: run.minute,
    endMinute: run.minute + minutes,
    stepTo,
  };
  return {
    current,
    wanderRandom,
    event: {
      kind: "activityStarted",
      minute: run.minute,
      activity,
      stepTo: stepTo && { ...stepTo },
    },
  };
}

/**
 * A new map run at minute 0: the layout drawn from the seed, the first activity chosen. The
 * character carries the given traits, or those of a new character, and an empty backpack.
 */
export function newMapRun(
  map: MapDef,
  seed: number,
  program: Program,
  ids: { mapId: MapId; archetypeId: ArchetypeId },
  traits: Traits = newTraits(),
): { run: MapRun; events: GameEvent[] } {
  const { tiles, entrance } = drawLayout(map, seed);
  const base = {
    mapId: ids.mapId,
    seed,
    minute: 0,
    tiles,
    character: {
      archetypeId: ids.archetypeId,
      at: entrance,
      traits: { ...traits },
      backpack: newBackpack(),
    },
    body: startingBody(),
    campfires: [],
    burningItems: [],
    wanderRandom: streamState(seed, "wander"),
    death: null,
  };
  const started = startActivity(base, map, program);
  return {
    run: {
      ...base,
      current: started.current,
      wanderRandom: started.wanderRandom,
    },
    events: [started.event],
  };
}

/**
 * One game minute, in the order of D-64. First the body, warmed by what burns on its tile; where
 * the character dies, the step stops there: what burns and the tiles stay as they stood, the
 * current activity too, giving no finish, and no program rule is picked. Otherwise what burns
 * loses a minute and the tiles renew their stock; then, when the current activity ends in this
 * minute, its finish applies and the next activity is chosen in the same minute with the program
 * given now. A map run ended in death passes no minute. Inputs are not changed.
 */
export function stepMinute(
  run: MapRun,
  map: MapDef,
  program: Program,
): { run: MapRun; events: GameEvent[] } {
  if (run.death) return { run, events: [] };
  const minute = run.minute + 1;
  const lived = bodyMinute(run.body, warmthAt(run, run.character.at), map);
  if (lived.death) {
    const cause = lived.death;
    return {
      run: { ...run, minute, body: lived.body, death: { minute, cause } },
      events: [{ kind: "characterDied", minute, cause }],
    };
  }
  const body = lived.body;
  const world = worldMinute(run, map, minute);
  // `<` rather than `!==`: an activity of 0 minutes from faulty data finishes in the next minute
  // instead of never; for every duration of 1 minute or more the two are the same.
  if (minute < run.current.endMinute)
    return { run: { ...run, minute, body, ...world }, events: [] };

  const finished = run.current;
  const events: GameEvent[] = [
    { kind: "activityFinished", minute, activity: finished.activity },
  ];
  let tiles = world.tiles;
  let character = run.character;

  if (finished.activity.kind === "rule") {
    const action = finished.activity.action;
    if (action.kind === "explore") {
      const at = run.character.at;
      tiles = world.tiles.map((tile) =>
        sameHex(tile.at, at) ? { ...tile, revealed: true } : tile,
      );
      events.push({ kind: "tileRevealed", minute, at: { ...at } });
    } else if (finished.stepTo) {
      const to = finished.stepTo;
      character = { ...run.character, at: { ...to } };
      events.push({
        kind: "moved",
        minute,
        from: { ...run.character.at },
        to: { ...to },
      });
    }
  }

  const base = {
    mapId: run.mapId,
    seed: run.seed,
    minute,
    tiles,
    character,
    body,
    campfires: world.campfires,
    burningItems: world.burningItems,
    wanderRandom: run.wanderRandom,
    death: null,
  };
  const started = startActivity(base, map, program);
  events.push(started.event);
  return {
    run: {
      ...base,
      current: started.current,
      wanderRandom: started.wanderRandom,
    },
    events,
  };
}
