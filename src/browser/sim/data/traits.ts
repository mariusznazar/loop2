export type Traits = {
  /** Pieces of all items together the backpack holds. */
  carryingCapacity: number;
};

/** Traits of a new character; the same for every one, apart from its archetype. */
export const TRAITS = {
  carryingCapacity: 15,
} as const satisfies Traits;
