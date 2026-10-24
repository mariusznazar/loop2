export const BALANCE = {
  gameMinutesPerRealSecond: 1,
  /** Minutes the character waits when no rule applies. */
  waitMinutes: 1,
  /** Chance that a gathering succeeds. */
  gatherChance: 0.7,
  body: {
    /** Starting values, which are also the caps: warming and eating stop here. */
    startTemperature: 37.0,
    startSatiety: 100,
    startHealth: 100,
    /** Degrees Celsius lost a minute for each degree the ambient temperature lies below the start. */
    coolingPerDegreeBelow: 0.002,
    satietyLossPerMinute: 0.6,
    /** Chilled below this temperature; starving below this satiety. */
    chilledBelow: 35.0,
    starvingBelow: 30,
    healthLossChilled: 0.35,
    healthLossStarving: 0.35,
    /** Regained a minute in which the character is neither chilled nor starving. */
    healthRegain: 0.05,
  },
} as const;

/** Seed of the first send; later sends derive theirs from the previous one. */
export const INITIAL_SEED = 1;
