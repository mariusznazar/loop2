/**
 * The pure rules of the trip plan's two lists, which the trip plan in React (`trip-plan.tsx`) and the
 * number field (`controls/react-number-field.tsx`) read.
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
