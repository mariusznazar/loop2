import { GEAR_SLOTS, type GearSlot } from "./data/gear.js";
import { ITEMS, type ItemId } from "./data/items.js";
import { TRAITS } from "./data/traits.js";
import type { Backpack, Gear, RunCharacter, Traits } from "./types.js";

/** The traits of a new character, from the data; the one place traits are made. */
export function newTraits(): Traits {
  return { ...TRAITS };
}

/** An empty backpack: 0 pieces of every item. */
export function newBackpack(): Backpack {
  return Object.fromEntries(
    (Object.keys(ITEMS) as ItemId[]).map((id) => [id, 0]),
  ) as Backpack;
}

/** Pieces in the backpack, all items together. */
export function backpackCount(backpack: Backpack): number {
  return Object.values(backpack).reduce((sum, pieces) => sum + pieces, 0);
}

/** The backpack's cap: the character's carrying capacity. */
export function backpackCap(character: Pick<RunCharacter, "traits">): number {
  return character.traits.carryingCapacity;
}

/** The slots of the gear in the order of the data. */
export function gearSlots(): GearSlot[] {
  return Object.keys(GEAR_SLOTS) as GearSlot[];
}

/** The gear of a new character: every slot of the data holding none. */
export function newGear(): Gear {
  return Object.fromEntries(gearSlots().map((slot) => [slot, null])) as Gear;
}

/**
 * Whether `item` fits `slot`: the slot is one of the data and the place the item's row names is the
 * slot's place (D-456). An item whose row names no place fits no slot.
 */
export function fitsSlot(item: ItemId, slot: GearSlot): boolean {
  return (
    Object.hasOwn(GEAR_SLOTS, slot) && ITEMS[item].fits === GEAR_SLOTS[slot]
  );
}
