/**
 * The pure rules of the trip plan's two lists, which the trip plan in React (`trip-plan.tsx`) reads,
 * the rule of a position's count among them, which it gives the shared number field.
 */
import type { ItemId, TripEntry } from "../sim/types.js";

/**
 * A safe integer from 1 up (D-181); below that bound no gameplay maximum: reality clips the
 * requested count at the map's boundaries.
 */
export function tripCount(text: string): number | null {
  const count = Number(text);
  return text.trim() !== "" && Number.isSafeInteger(count) && count >= 1
    ? count
    : null;
}

/**
 * The number field's rule for a position's count (D-181): a count of `tripCount` is committed every
 * time it is typed, also when it equals the count held, so the screen can clear its message; text that
 * is no such count is rejected.
 */
export function readTripCount(
  text: string,
): { value: number; commit: boolean } | null {
  const count = tripCount(text);
  return count === null ? null : { value: count, commit: true };
}

/** Items already on this list are offered solely in their own row. */
export function tripChoices(
  items: readonly ItemId[],
  list: readonly TripEntry[],
  own?: ItemId,
): ItemId[] {
  return items.filter(
    (item) => item === own || !list.some((entry) => entry.item === item),
  );
}
