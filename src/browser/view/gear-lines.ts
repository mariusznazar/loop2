// The line of the gear under the backpack line on the screen of a map run (D-311, D-455): the main
// hand first, then the pockets, each piece named with the words of its place and of its item.
import { GEAR_PLACES, GEAR_SLOTS, type GearSlot } from "../sim/data/gear.js";
import { ITEMS, type ItemId } from "../sim/data/items.js";
import type { Gear } from "../sim/types.js";

/**
 * The line of the gear of a character: „Wyposażenie: ” and the main hand's piece with the words of its
 * place (for instance „patyk w ręku”), then each item the pockets hold with its count, in the order the
 * pockets first hold it (for instance „2 × opatrunek pod ręką”, the count left out for one piece); „nic”
 * where the character holds nothing. Pure: it reads the gear and changes nothing.
 */
export function gearLine(gear: Gear): string {
  const parts: string[] = [];
  if (gear.mainHand !== null)
    parts.push(`${ITEMS[gear.mainHand].name} ${GEAR_PLACES.mainHand.line}`);
  const pockets = new Map<ItemId, number>();
  for (const slot of Object.keys(GEAR_SLOTS) as GearSlot[]) {
    const item = gear[slot];
    if (GEAR_SLOTS[slot] !== "pocket" || item === null) continue;
    pockets.set(item, (pockets.get(item) ?? 0) + 1);
  }
  for (const [item, count] of pockets) {
    const piece = count === 1 ? "" : `${count} × `;
    parts.push(`${piece}${ITEMS[item].name} ${GEAR_PLACES.pocket.line}`);
  }
  return parts.length === 0
    ? "Wyposażenie: nic"
    : `Wyposażenie: ${parts.join(", ")}`;
}
