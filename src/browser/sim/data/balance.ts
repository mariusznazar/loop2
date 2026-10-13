export const BALANCE = {
  gameMinutesPerRealSecond: 1,
  /** Minutes the character waits when no rule applies. */
  waitMinutes: 1,
} as const;

/** Seed of the first send; later sends derive theirs from the previous one. */
export const INITIAL_SEED = 1;
