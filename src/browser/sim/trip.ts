import { newBackpack } from "./character.js";
import { BALANCE } from "./data/balance.js";
import type { MapDef } from "./data/maps.js";
import type {
  Backpack,
  Chest,
  GameMapRun,
  ItemId,
  TripEntry,
  TripPlan,
} from "./types.js";

/** Pieces held across item kinds; absent entries hold none. */
export function pieceCount(pieces: Partial<Record<ItemId, number>>): number {
  return Object.values(pieces).reduce((sum, count) => sum + count, 0);
}

/** One shared budget, spent in list order, including a partial row. Sources stay untouched. */
export function clipTrip(
  plan: readonly TripEntry[],
  source: Partial<Record<ItemId, number>>,
  budget: number,
): TripEntry[] {
  let room = Math.max(0, budget);
  const result: TripEntry[] = [];
  for (const { item, count } of plan) {
    const taken = Math.min(count, source[item] ?? 0, room);
    if (taken > 0) {
      result.push({ item, count: taken });
      room -= taken;
    }
  }
  return result;
}

/** Equipment leaves the chest before the first action is chosen. */
export function takeTrip(
  plan: TripPlan,
  chest: Chest,
  capacity: number,
  map: MapDef,
): {
  chest: Chest;
  backpack: Backpack;
} {
  const taken = clipTrip(
    plan.take,
    chest.pieces,
    Math.min(capacity, map.carryIn ?? Infinity),
  );
  const pieces = { ...chest.pieces };
  const backpack = newBackpack();
  for (const { item, count } of taken) {
    pieces[item] = (pieces[item] ?? 0) - count;
    backpack[item] = count;
  }
  return { chest: { pieces }, backpack };
}

/**
 * The take list as a run of a solved map takes it (D-189): each entry cut by the carrying capacity
 * and the map's entry cap in list order, the list's own counts standing in for the stock. Pure.
 */
export function clippedTake(
  plan: TripPlan,
  capacity: number,
  map: MapDef,
): TripEntry[] {
  return clipTrip(
    plan.take,
    Object.fromEntries(plan.take.map(({ item, count }) => [item, count])),
    Math.min(capacity, map.carryIn ?? Infinity),
  );
}

/**
 * Equipment of a marked run (a manual map run of a solved map): the take list taken from nowhere,
 * the list's own counts standing in for the stock, clipped only by the carrying capacity and the
 * map's entry cap. The chest is not an argument, so nothing leaves it.
 */
export function takeFromNowhere(
  plan: TripPlan,
  capacity: number,
  map: MapDef,
): Backpack {
  const backpack = newBackpack();
  for (const { item, count } of clippedTake(plan, capacity, map))
    backpack[item] = count;
  return backpack;
}

/**
 * The same clipped snapshot drives both the live preview and the eventual deposit. A marked run
 * deposits nothing, so its list is empty.
 */
export function tripLoot(
  run: Pick<GameMapRun, "bringPlan" | "character" | "solvedMapRun">,
  chest: Chest,
  map: MapDef,
): TripEntry[] {
  if (run.solvedMapRun) return [];
  return clipTrip(
    run.bringPlan,
    run.character.backpack,
    Math.min(
      run.character.traits.carryingCapacity,
      map.carryOut ?? Infinity,
      BALANCE.chestCapacity - pieceCount(chest.pieces),
    ),
  );
}

/** A map-specific warning ignores stock: the map, rather than the backpack, cuts this plan. */
export function tripEntryCut(
  plan: TripPlan,
  capacity: number,
  map: MapDef,
): boolean {
  return (
    map.carryIn !== undefined &&
    map.carryIn <
      Math.min(
        capacity,
        plan.take.reduce((sum, entry) => sum + entry.count, 0),
      )
  );
}
