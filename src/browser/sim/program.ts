import { backpackCap, backpackCount } from "./character.js";
import { CAMPFIRE } from "./data/campfire.js";
import { ITEMS } from "./data/items.js";
import { nearestTile, neighbours, sameHex, tileAt } from "./hex.js";
import type { MapDef } from "./data/maps.js";
import type {
  Action,
  Activity,
  Backpack,
  Campfire,
  Condition,
  Hex,
  ItemId,
  MapRun,
  Program,
  ResourceId,
  Tile,
} from "./types.js";

/** The part of a map run the program reads: never the generator, never the current activity. */
export type RunView = Pick<MapRun, "tiles" | "character" | "campfires">;

/** What an item can be used for, as items.ts marks it. */
export type ItemUse = "fuel" | "food" | "lightable";

/**
 * The item a use takes its piece from: the first item of the data, in the data's order, that the
 * data marks for that use and of which the backpack holds a piece; null where there is none. The
 * simulation chooses the piece, never the program.
 */
export function itemFor(backpack: Backpack, use: ItemUse): ItemId | null {
  const ids = Object.keys(ITEMS) as ItemId[];
  return (
    ids.find((id) => backpack[id] > 0 && ITEMS[id][use] !== undefined) ?? null
  );
}

/** Whether the backpack holds `count` pieces of `item`. */
function holds(
  backpack: Backpack,
  need: { item: ItemId; count: number },
): boolean {
  return backpack[need.item] >= need.count;
}

/** The campfire on the character's tile, burning or not; a tile holds at most one. */
function campfireHere(run: RunView): Campfire | undefined {
  return run.campfires.find((campfire) =>
    sameHex(campfire.at, run.character.at),
  );
}

function revealedHere(run: RunView): boolean {
  return tileAt(run.tiles, run.character.at)?.revealed === true;
}

/** The stock of a resource on the character's tile; an unrevealed tile counts as empty. */
function stockHere(run: RunView, resource: ResourceId): number {
  const here = tileAt(run.tiles, run.character.at);
  if (!here || !here.revealed) return 0;
  return here.stock[resource] ?? 0;
}

/** Whether a condition of a program rule holds now. */
export function conditionHolds(
  run: RunView,
  _map: MapDef,
  condition: Condition,
): boolean {
  switch (condition.kind) {
    case "always":
      return true;
    case "hereBelow":
      return stockHere(run, condition.resource) < condition.value;
  }
}

/** The tile a walk to a resource heads for: the nearest revealed tile holding some of it. */
export function walkTarget(
  run: RunView,
  resource: ResourceId,
): { tile: Tile; minutes: number; next: Hex } | null {
  return nearestTile(
    run.tiles,
    run.character.at,
    (tile) => tile.revealed && (tile.stock[resource] ?? 0) > 0,
  );
}

/**
 * The tile a walk to a campfire heads for: the nearest by minutes of walking holding a campfire,
 * burning or not. Every campfire of the map run is known: the character made each one.
 */
export function campfireTarget(
  run: RunView,
): { tile: Tile; minutes: number; next: Hex } | null {
  return nearestTile(run.tiles, run.character.at, (tile) =>
    run.campfires.some((campfire) => sameHex(campfire.at, tile.at)),
  );
}

/** Whether an action can start now. Never draws: the wander generator is left as it is. */
export function actionFeasible(
  run: RunView,
  _map: MapDef,
  action: Action,
): boolean {
  switch (action.kind) {
    case "explore": {
      const here = tileAt(run.tiles, run.character.at);
      return here !== undefined && !here.revealed;
    }
    case "wander":
      return neighbours(run.tiles, run.character.at).length > 0;
    case "walkTo": {
      const target = walkTarget(run, action.resource);
      return target !== null && target.minutes > 0;
    }
    case "walkToCampfire": {
      const target = campfireTarget(run);
      return target !== null && target.minutes > 0;
    }
    case "gather":
      return (
        stockHere(run, action.resource) > 0 &&
        backpackCount(run.character.backpack) < backpackCap(run.character)
      );
    case "craftCampfire":
      return (
        revealedHere(run) &&
        campfireHere(run) === undefined &&
        holds(run.character.backpack, CAMPFIRE.craft)
      );
    case "lightCampfire":
      return (
        campfireHere(run)?.minutesLeft === 0 &&
        holds(run.character.backpack, CAMPFIRE.light)
      );
    case "lightItem":
      return (
        revealedHere(run) &&
        itemFor(run.character.backpack, "lightable") !== null
      );
    case "feedCampfire":
      return (
        (campfireHere(run)?.minutesLeft ?? 0) > 0 &&
        itemFor(run.character.backpack, "fuel") !== null
      );
    case "eat":
      return itemFor(run.character.backpack, "food") !== null;
  }
}

/** The first program rule whose condition holds and whose action is feasible; else a wait. */
export function chooseActivity(
  run: RunView,
  map: MapDef,
  program: Program,
): Activity {
  for (let ruleIndex = 0; ruleIndex < program.rules.length; ruleIndex += 1) {
    const rule = program.rules[ruleIndex];
    if (
      conditionHolds(run, map, rule.condition) &&
      actionFeasible(run, map, rule.action)
    ) {
      return { kind: "rule", ruleIndex, action: { ...rule.action } };
    }
  }
  return { kind: "wait" };
}
