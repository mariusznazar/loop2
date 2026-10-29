import {
  bodyMinute,
  eatenBody,
  paidNatureEnergy,
  regainedNatureEnergy,
  startingBody,
  startingNatureEnergy,
} from "./body.js";
import { resolveCombat } from "./combat.js";
import {
  backpackCap,
  backpackCount,
  newBackpack,
  newTraits,
} from "./character.js";
import { ACTIONS } from "./data/actions.js";
import { BALANCE } from "./data/balance.js";
import { CAMPFIRE } from "./data/campfire.js";
import { ITEMS } from "./data/items.js";
import type { MapDef } from "./data/maps.js";
import { neighbours, sameHex, tileAt } from "./hex.js";
import { drawLayout } from "./layout.js";
import {
  campfireTarget,
  chooseActivity,
  itemFor,
  natureEnergyCost,
  walkTarget,
} from "./program.js";
import { nextRandom, streamState } from "./random.js";
import { warmthAt, worldMinute } from "./world.js";
import type {
  Action,
  Activity,
  Backpack,
  CharacterId,
  CombatExchange,
  CombatOutcome,
  CreatureId,
  CurrentActivity,
  DeathCause,
  Hex,
  ItemId,
  MapId,
  MapRun,
  Program,
  ResourceId,
  Traits,
  Understanding,
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
  | { kind: "characterDied"; minute: number; cause: DeathCause }
  | { kind: "mapRunCompleted"; minute: number }
  | { kind: "attacked"; minute: number; creature: CreatureId }
  | { kind: "combatExchange"; minute: number; exchange: CombatExchange }
  | { kind: "combatEnded"; minute: number; outcome: CombatOutcome }
  /** What a game minute revealed to the player, each list in the order of its data. */
  | ({ kind: "discovered"; minute: number } & Understanding);

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
      case "walkTo":
      case "walkToCampfire": {
        const target =
          action.kind === "walkTo"
            ? walkTarget(run, action.resource)
            : campfireTarget(run);
        const next = target!.next;
        stepTo = { ...next };
        minutes = tileAt(run.tiles, next)!.stepMinutes;
        break;
      }
      case "gather":
      case "craftCampfire":
      case "lightCampfire":
      case "lightItem":
      case "feedCampfire":
      case "eat":
        minutes = ACTIONS[action.kind].minutes;
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
 * The end of a gathering of `resource`, step 5 of D-71: one draw from the gathering generator. A
 * hit, with the data's chance, moves one piece from the character's tile into the backpack as the
 * item of that resource — where the tile still holds a piece and the backpack has room, so never
 * more than lies on the tile —; a miss changes neither (D-66). A tile gathered to 0 pieces keeps
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

/** The backpack with `count` pieces of `item` taken out. */
function without(backpack: Backpack, item: ItemId, count: number): Backpack {
  return { ...backpack, [item]: backpack[item] - count };
}

/** What the end of an action of the character on the campfire or the backpack changes. */
type Landing = Pick<
  MapRun,
  "character" | "body" | "natureEnergy" | "campfires" | "burningItems"
>;

/**
 * The end of crafting, lighting, feeding or eating, step 5 of D-71: its effect takes hold and the
 * pieces it uses leave the backpack, together. The pieces are those the data marks for the use,
 * chosen by `itemFor`. Crafting puts an unlit campfire on the character's tile; lighting gives the
 * campfire there its minutes of burning; lighting an item puts one piece of it burning on the
 * tile; feeding adds the fuel's minutes to the campfire there, whatever its minutes left, 0
 * included (D-69, D-71); eating adds the food's satiety, not above the starting satiety (D-59).
 * Where what the action needs is no longer there, nothing changes.
 */
function landUse(state: Landing, action: Action): Landing {
  const { character } = state;
  const at = character.at;
  const here = state.campfires.find((campfire) => sameHex(campfire.at, at));
  const backpack = character.backpack;
  const using = (item: ItemId, count: number) => ({
    ...character,
    backpack: without(backpack, item, count),
  });
  switch (action.kind) {
    case "craftCampfire": {
      const { item, count } = CAMPFIRE.craft;
      if (here || backpack[item] < count) return state;
      return {
        ...state,
        character: using(item, count),
        campfires: [...state.campfires, { at: { ...at }, minutesLeft: 0 }],
      };
    }
    case "lightCampfire": {
      const { item, count } = CAMPFIRE.light;
      if (!here || here.minutesLeft > 0 || backpack[item] < count) return state;
      return {
        ...state,
        character: using(item, count),
        campfires: state.campfires.map((campfire) =>
          campfire === here
            ? { ...campfire, minutesLeft: CAMPFIRE.burnMinutes }
            : campfire,
        ),
      };
    }
    case "lightItem": {
      const item = itemFor(backpack, "lightable");
      const lightable = item && ITEMS[item].lightable;
      if (!item || !lightable) return state;
      return {
        ...state,
        character: using(item, 1),
        burningItems: [
          ...state.burningItems,
          { item, at: { ...at }, minutesLeft: lightable.burnMinutes },
        ],
      };
    }
    case "feedCampfire": {
      const item = itemFor(backpack, "fuel");
      const fuel = item && ITEMS[item].fuel;
      if (!here || !item || !fuel) return state;
      return {
        ...state,
        character: using(item, 1),
        campfires: state.campfires.map((campfire) =>
          campfire === here
            ? {
                ...campfire,
                minutesLeft: campfire.minutesLeft + fuel.burnMinutes,
              }
            : campfire,
        ),
      };
    }
    case "eat": {
      const item = itemFor(backpack, "food");
      const food = item && ITEMS[item].food;
      if (!item || !food) return state;
      return {
        ...state,
        character: using(item, 1),
        body: eatenBody(state.body, food.satiety),
      };
    }
    default:
      return state;
  }
}

/**
 * The end of an action on the campfire or the backpack, as `landUse` gives it, with a spell's price
 * in nature energy taken together with its pieces where its effect takes hold. Where the energy no
 * longer reaches the price, or the effect does not take hold, nothing changes and nothing is paid.
 */
function finishUse(state: Landing, action: Action): Landing {
  const cost = natureEnergyCost(action);
  if (state.natureEnergy < cost) return state;
  const landed = landUse(state, action);
  if (landed === state || cost === 0) return landed;
  return {
    ...landed,
    natureEnergy: paidNatureEnergy(landed.natureEnergy, cost),
  };
}

/**
 * A new map run at minute 0: the layout drawn from the seed, the first activity chosen. The
 * character carries the given traits, or those of a new character, and the entry equipment.
 */
export function newMapRun(
  map: MapDef,
  seed: number,
  program: Program,
  ids: { mapId: MapId; characterId: CharacterId },
  traits: Traits = newTraits(),
  backpack: Backpack = newBackpack(),
): { run: MapRun; events: GameEvent[] } {
  const { tiles, entrance } = drawLayout(map, seed);
  const base = {
    mapId: ids.mapId,
    seed,
    minute: 0,
    tiles,
    character: {
      id: ids.characterId,
      at: entrance,
      traits: { ...traits },
      backpack: { ...backpack },
    },
    body: startingBody(),
    natureEnergy: startingNatureEnergy(),
    campfires: [],
    burningItems: [],
    wanderRandom: streamState(seed, "wander"),
    gatherRandom: streamState(seed, "gather"),
    attackRandom: streamState(seed, "attack"),
    attackCooldownStart: 0,
    activeCombat: null,
    lastCombat: null,
    streak: 0,
    defeatedAttacks: 0,
    death: null,
    completion: null,
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
 * The body/world/action phase of a minute, not a complete minute. Where `picks` is true an
 * ordinary activity ended; `finishMinute` still checks combat, completion and attacks before
 * deciding whether to start another one. Discovery can update the program between these phases.
 */
export type MinuteBeforePick = {
  run: MapRun;
  events: GameEvent[];
  picks: boolean;
};

/** Whether the map run has ended: the character died or the map run completed. */
export function mapRunEnded(run: MapRun): boolean {
  return run.death !== null || run.completion !== null;
}

/**
 * Whether the map run meets every solving requirement the map data defines.
 */
export function meetsSolving(run: MapRun, map: MapDef): boolean {
  const requirements = map.solving;
  return (
    (requirements.streak === undefined || run.streak >= requirements.streak) &&
    (requirements.defeatedAttacks === undefined ||
      run.defeatedAttacks >= requirements.defeatedAttacks)
  );
}

/** The streak after a game minute's body step: one more where no health was lost, otherwise 0. */
function streakAfter(streak: number, lostHealth: boolean): number {
  return lostHealth ? 0 : streak + 1;
}

/**
 * One game minute, in the order of D-71, up to the pick. First the body, warmed by what burns on
 * its tile, and the nature energy regained after satiety has fallen; where the character dies, the
 * step stops there: what burns and the tiles stay as they
 * stood, the current activity too, giving no finish, and no program rule is picked. Otherwise what
 * burns loses a minute and the tiles renew their stock; then, when the current activity ends in
 * this minute, its finish applies. Combat minutes skip the body, the nature energy included, and
 * the ordinary action, advancing only the world and streak here. `finishMinute` must follow to resolve combat, completion,
 * attacks and the ordinary pick. A map run that has ended passes no minute. Inputs stay unchanged.
 */
export function minuteBeforePick(run: MapRun, map: MapDef): MinuteBeforePick {
  if (mapRunEnded(run)) return { run, events: [], picks: false };
  const minute = run.minute + 1;
  if (run.activeCombat) {
    return {
      run: {
        ...run,
        minute,
        streak: run.streak + 1,
        ...worldMinute(run, map, minute),
      },
      events: [],
      picks: false,
    };
  }
  const lived = bodyMinute(run.body, warmthAt(run, run.character.at), map);
  // Nature energy comes back in the body's step, right after satiety falls (D-71).
  const natureEnergy = regainedNatureEnergy(
    run.natureEnergy,
    lived.body.satiety,
  );
  if (lived.death) {
    const cause = lived.death;
    return {
      run: {
        ...run,
        minute,
        body: lived.body,
        natureEnergy,
        streak: streakAfter(run.streak, lived.lostHealth),
        death: { minute, cause },
      },
      events: [{ kind: "characterDied", minute, cause }],
      picks: false,
    };
  }
  const body = lived.body;
  const streak = streakAfter(run.streak, lived.lostHealth);
  const world = worldMinute(run, map, minute);
  // `<` rather than `!==`: an activity of 0 minutes from faulty data finishes in the next minute
  // instead of never; for every duration of 1 minute or more the two are the same.
  if (!run.current || minute < run.current.endMinute)
    return {
      run: { ...run, minute, body, natureEnergy, streak, ...world },
      events: [],
      picks: false,
    };

  const finished = run.current;
  const events: GameEvent[] = [
    { kind: "activityFinished", minute, activity: finished.activity },
  ];
  let tiles = world.tiles;
  let character = run.character;
  let gatherRandom = run.gatherRandom;
  let landed: Landing = {
    character,
    body,
    natureEnergy,
    campfires: world.campfires,
    burningItems: world.burningItems,
  };

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
    } else {
      landed = finishUse(landed, action);
      character = landed.character;
    }
  }

  return {
    run: {
      ...run,
      minute,
      tiles,
      character,
      body: landed.body,
      natureEnergy: landed.natureEnergy,
      campfires: landed.campfires,
      burningItems: landed.burningItems,
      gatherRandom,
      streak,
    },
    events,
    picks: true,
  };
}

/**
 * The pick of D-71's last step: the next activity chosen in the run's minute with the program
 * given now, and the run holding it. Used after completion and attacks have been ruled out.
 * Inputs are not changed.
 */
export function pickActivity(
  run: MapRun,
  map: MapDef,
  program: Program,
): { run: MapRun; events: GameEvent[] } {
  const started = startActivity(run, map, program);
  return {
    run: {
      ...run,
      current: started.current,
      wanderRandom: started.wanderRandom,
    },
    events: [started.event],
  };
}

/**
 * One complete run minute, including combat, completion, attacks and the ordinary pick. The
 * supplied program is already filtered to the character's repertoire; game-level discovery
 * belongs to `advanceMinutes`. A map run that has ended passes no minute. Inputs stay unchanged.
 */
export function stepMinute(
  run: MapRun,
  map: MapDef,
  program: Program,
): { run: MapRun; events: GameEvent[] } {
  const stepped = minuteBeforePick(run, map);
  if (mapRunEnded(run)) return { run, events: [] };
  const finished = finishMinute(stepped, map, program);
  return {
    run: finished.run,
    events: [...stepped.events, ...finished.events],
  };
}

/**
 * Finishes an already advanced minute: combat turns, death, completion, attack and ordinary pick.
 * The caller supplies its current repertoire-filtered program after ordinary discoveries.
 * Returned events contain only this phase, not the input phase's events. Inputs stay unchanged.
 */
export function finishMinute(
  stepped: MinuteBeforePick,
  map: MapDef,
  program: Program,
): { run: MapRun; events: GameEvent[] } {
  let run = stepped.run;
  if (mapRunEnded(run)) return { run, events: [] };
  const events: GameEvent[] = [];
  const combat = run.activeCombat;
  let picks = stepped.picks;
  if (combat && run.minute >= combat.resolveMinute) {
    const result = resolveCombat(run, map, combat.creatureId, program);
    run = {
      ...run,
      body: { ...run.body, health: result.characterHealth },
      activeCombat: null,
      lastCombat: { ...combat, result },
      attackCooldownStart: run.minute,
      defeatedAttacks:
        run.defeatedAttacks + (result.outcome === "creatureDefeated" ? 1 : 0),
    };
    events.push(
      ...result.exchanges.map((exchange): GameEvent => ({
        kind: "combatExchange",
        minute: run.minute,
        exchange,
      })),
    );
    events.push({
      kind: "combatEnded",
      minute: run.minute,
      outcome: result.outcome,
    });
    if (result.outcome === "characterDied") {
      run = { ...run, death: { minute: run.minute, cause: "combat" } };
      events.push({
        kind: "characterDied",
        minute: run.minute,
        cause: "combat",
      });
      return { run, events };
    }
    picks = true;
  }
  if (meetsSolving(run, map)) {
    run = {
      ...run,
      completion: { minute: run.minute },
      activeCombat: null,
      ...(combat && { attackCooldownStart: run.minute }),
    };
    events.push({ kind: "mapRunCompleted", minute: run.minute });
    return { run, events };
  }
  // Even the final combat minute cannot draw another attack.
  if (!combat) {
    const attacker = map.attackers?.[0];
    if (
      attacker &&
      run.minute - run.attackCooldownStart > attacker.cooldownMinutes
    ) {
      const draw = nextRandom(run.attackRandom);
      run = { ...run, attackRandom: draw.state };
      if (draw.value < attacker.chancePerMinute) {
        const activeCombat = {
          creatureId: attacker.id,
          attackMinute: run.minute,
          resolveMinute: run.minute + BALANCE.combatMinutes,
        };
        run = {
          ...run,
          current: null,
          activeCombat,
          lastCombat: { ...activeCombat, result: null },
        };
        events.push({
          kind: "attacked",
          minute: run.minute,
          creature: attacker.id,
        });
        return { run, events };
      }
    }
  }
  if (picks) {
    const picked = pickActivity(run, map, program);
    return { run: picked.run, events: [...events, ...picked.events] };
  }
  return { run, events };
}
