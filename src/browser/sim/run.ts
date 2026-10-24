import { bodyMinute, startingBody } from "./body.js";
import {
  backpackCap,
  backpackCount,
  newBackpack,
  newTraits,
} from "./character.js";
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
  ItemId,
  MapId,
  MapRun,
  Program,
  ResourceId,
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
      case "gather":
        minutes = ACTIONS.gather.minutes;
        break;
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

/** What the end of a gathering changes. */
type Gathering = Pick<MapRun, "tiles" | "character" | "gatherRandom">;

/**
 * The end of a gathering of `resource`, step 5 of D-64: one draw from the gathering generator. A
 * hit, with the data's chance, moves one piece from the character's tile into the backpack as the
 * item of that resource — where the tile still holds a piece and the backpack has room, so never
 * more than lies on the tile —; a miss changes neither (D-59). A tile gathered to 0 pieces keeps
 * the key of its resource.
 */
function finishGathering(state: Gathering, resource: ResourceId): Gathering {
  const draw = nextRandom(state.gatherRandom);
  const { character } = state;
  const here = tileAt(state.tiles, character.at);
  const pieces = here?.revealed ? (here.stock[resource] ?? 0) : 0;
  const hit = draw.value < BALANCE.gatherChance;
  if (
    !hit ||
    pieces <= 0 ||
    backpackCount(character.backpack) >= backpackCap(character)
  )
    return { ...state, gatherRandom: draw.state };
  // The item of a resource is the item of the same identifier (items.ts).
  const item: ItemId = resource;
  return {
    tiles: state.tiles.map((tile) =>
      tile === here
        ? { ...tile, stock: { ...tile.stock, [resource]: pieces - 1 } }
        : tile,
    ),
    character: {
      ...character,
      backpack: { ...character.backpack, [item]: character.backpack[item] + 1 },
    },
    gatherRandom: draw.state,
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
    gatherRandom: streamState(seed, "gather"),
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
  let gatherRandom = run.gatherRandom;

  if (finished.activity.kind === "rule") {
    const action = finished.activity.action;
    if (action.kind === "gather") {
      const gathered = finishGathering(
        { tiles, character, gatherRandom },
        action.resource,
      );
      ({ tiles, character, gatherRandom } = gathered);
    } else if (action.kind === "explore") {
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
    gatherRandom,
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
