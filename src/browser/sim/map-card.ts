import { minutesUntilChilled, startingBody } from "./body.js";
import type { MapAttackerDef, MapDef, MapResourceDef } from "./data/maps.js";

/**
 * The game minutes a body stays at or above the chill threshold with no warmth, from its starting
 * temperature on the map's ambient temperature; null where the body does not cool below the
 * threshold at all (D-327). The cooling is counted once, by `minutesUntilChilled` (D-333).
 */
export function minutesWithoutFire(map: MapDef): number | null {
  return minutesUntilChilled(startingBody(), map);
}

/**
 * The tiles expected to hold a resource: its density times the map's tiles, rounded to the nearest
 * whole, with the number of tiles (D-327).
 */
export function expectedTiles(
  map: MapDef,
  resource: MapResourceDef,
): { holding: number; tiles: number } {
  const tiles = map.width * map.height;
  return { holding: Math.round(resource.density * tiles), tiles };
}

/**
 * The mean game minutes between attacks, the cooldown plus the reciprocal of the chance per minute,
 * rounded to whole minutes (D-142, D-327).
 */
export function meanAttackGap(attacker: MapAttackerDef): number {
  return Math.round(attacker.cooldownMinutes + 1 / attacker.chancePerMinute);
}

/**
 * The usual step: the step most of the given maps give, the first of their order on a tie
 * (D-327).
 */
export function usualStep(
  maps: readonly Pick<MapDef, "stepMinutes">[],
): number {
  const counts = new Map<number, number>();
  for (const { stepMinutes } of maps)
    counts.set(stepMinutes, (counts.get(stepMinutes) ?? 0) + 1);
  let best = maps[0].stepMinutes;
  for (const { stepMinutes } of maps)
    if ((counts.get(stepMinutes) ?? 0) > (counts.get(best) ?? 0))
      best = stepMinutes;
  return best;
}
