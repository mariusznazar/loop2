export const BALANCE = {
  /** Pieces of all items together in the team's chest. */
  chestCapacity: 60,
  /** Game minutes that pass in one real second at the pace 1. */
  gameMinutesPerRealSecond: 1,
  /**
   * Real seconds of one game minute of an earning loop. The speed control (`paces`) does not reach
   * it: an earning loop goes with the world's time. Given in seconds so that every real moment of
   * the loop clock is a whole number of milliseconds.
   */
  loopMinuteRealSeconds: 60,
  /** The paces the player picks from; the game starts at the first. */
  paces: [1, 2, 4, 8, 16],
  /** Minutes the character waits when no rule applies. */
  waitMinutes: 1,
  /** Maximum exchanges resolved in one encounter. */
  combatTurns: 40,
  /** Whole game minutes after an attack before all its turns resolve. */
  combatMinutes: 5,
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
  /**
   * Real minutes after a death that used the resurrection up until it is ready again. Counted by the
   * real clock, not the game's: a game minute can be made to pass at will (loop `balance.ts:125`).
   */
  resurrectionRenewalRealMinutes: 480,
  /** The mage's nature energy, with which spells are paid. */
  natureEnergy: {
    /** The cap, which is also the energy every map run starts with. */
    max: 100,
    /** Regained a game minute outside combat in which the character is well fed. */
    regain: 0.5,
    /** Well fed at this satiety or above, read after the game minute's fall. */
    wellFedFrom: 60,
  },
} as const;

/** Seed of the first send; later sends derive theirs from the previous one. */
export const INITIAL_SEED = 1;
