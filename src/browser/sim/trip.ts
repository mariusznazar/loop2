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

/** The same clipped snapshot drives both the live preview and the eventual deposit. */
export function tripLoot(
  run: Pick<GameMapRun, "bringPlan" | "character">,
  chest: Chest,
  map: MapDef,
): TripEntry[] {
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
