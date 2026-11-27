// The reference programs: programs of the closed lists of conditions and actions that the tests of
// the simulation and the balance instrument run to see how a map is solved (D-427). Each is a
// `Program` of the game (src/browser/sim/types.ts), written in the short notation below, under an
// English identifier; REFERENCE_PROGRAMS holds them all by that identifier. A program is written
// here and nowhere else, and each carries the trip plan it is run with: what it takes from the
// chest and what it brings out. The group names are the game's own words, as the player sees them.

export const always = { kind: "always" };
export const temperatureBelow = (value) => ({
  kind: "temperatureBelow",
  value,
});
export const satietyBelow = (value) => ({ kind: "satietyBelow", value });
export const energyBelow = (value) => ({ kind: "natureEnergyBelow", value });
export const healthBelow = (value) => ({ kind: "healthBelow", value });
export const opponentBelow = (value) => ({
  kind: "opponentHealthBelow",
  value,
});
export const itemBelow = (item, value) => ({ kind: "itemBelow", item, value });
export const hereBelow = (resource, value) => ({
  kind: "hereBelow",
  resource,
  value,
});
export const fireLeftBelow = (value) => ({
  kind: "campfireLeftBelow",
  value,
});
export const awayFromFire = { kind: "awayFromCampfire" };

export const explore = { kind: "explore" };
export const wander = { kind: "wander" };
export const walkTo = (resource) => ({ kind: "walkTo", resource });
export const walkToFire = { kind: "walkToCampfire" };
export const gather = (resource) => ({ kind: "gather", resource });
export const patrol = (resource) => ({ kind: "patrol", resource });
export const craftFire = { kind: "craftCampfire" };
export const lightFire = { kind: "lightCampfire" };
export const lightItem = { kind: "lightItem" };
export const feedFire = { kind: "feedCampfire" };
export const eat = { kind: "eat" };
export const strike = { kind: "strikeWithStick" };
export const kick = { kind: "kick" };
export const dodge = { kind: "dodge" };
export const tend = (item) => ({ kind: "tend", item });
export const pressure = (item) => ({ kind: "pressure", item });

/**
 * A program of the game from its notation. A rule is `[condition, action]`; a group is
 * `{ name, when, rules }`, its condition `always` where `when` is left out; `take` and `bring`
 * are lists of `[item, count]` of the trip plan. Groups and rules are numbered in order.
 */
export function program({ take = [], bring = [], groups }) {
  let ruleId = 1;
  const built = groups.map((group, index) => ({
    id: index + 1,
    name: group.name,
    condition: group.when ?? always,
    rules: group.rules.map(([condition, action]) => ({
      id: ruleId++,
      condition,
      action,
    })),
  }));
  return {
    tripPlan: {
      take: take.map(([item, count]) => ({ item, count })),
      bring: bring.map(([item, count]) => ({ item, count })),
    },
    groups: built,
    nextGroupId: built.length + 1,
    nextRuleId: ruleId,
  };
}

/** What a trip brings out: up to fifteen pieces of each kind a map holds. */
const ALL_OUT = [
  ["stick", 15],
  ["berry", 15],
  ["moss", 15],
  ["fiber", 15],
];

const STICKS_AND_BERRIES_OUT = [
  ["stick", 15],
  ["berry", 15],
];

/**
 * The program the acceptance test of Las ran before it ran the best program: 17 rules in one
 * group that keep the mage alive on a seed but do not solve Las, kept as a reference point.
 */
export const forestOldAcceptance = program({
  groups: [
    {
      name: "Program",
      rules: [
        [satietyBelow(35), eat],
        [temperatureBelow(36), lightFire],
        [temperatureBelow(36.5), feedFire],
        [temperatureBelow(35.2), walkToFire],
        [fireLeftBelow(1), craftFire],
        [itemBelow("berry", 1), gather("berry")],
        [itemBelow("berry", 1), walkTo("berry")],
        [hereBelow("berry", 1), explore],
        [itemBelow("berry", 1), wander],
        [itemBelow("stick", 8), gather("stick")],
        [itemBelow("stick", 8), walkTo("stick")],
        [temperatureBelow(36), lightItem],
        [always, explore],
        [awayFromFire, walkToFire],
        [always, gather("stick")],
        [always, gather("berry")],
        [always, wander],
      ],
    },
  ],
});

/**
 * Naive: the first thought of a new player. It explores, eats at the editor's default of 50 %,
 * lights and builds a campfire at 36.5 degrees, and gathers sticks up to 8 and berries always. It
 * never leaves the entrance tile, so it fails wherever the entrance holds little.
 */
export const forestNaive = program({
  groups: [
    {
      name: "Program",
      rules: [
        [always, explore],
        [satietyBelow(50), eat],
        [temperatureBelow(36.5), lightFire],
        [always, craftFire],
        [itemBelow("stick", 8), gather("stick")],
        [always, gather("berry")],
      ],
    },
  ],
});

/**
 * Decent: a player after a few deaths. One group of twelve rules with round numbers: it eats,
 * looks for a berry when hungry, walks back to the campfire when cold, and keeps eight sticks and
 * three berries.
 */
export const forestDecent = program({
  bring: ALL_OUT,
  groups: [
    {
      name: "Program",
      rules: [
        [satietyBelow(50), eat],
        [satietyBelow(50), gather("berry")],
        [satietyBelow(50), walkTo("berry")],
        [temperatureBelow(36), lightFire],
        [temperatureBelow(35.5), walkToFire],
        [fireLeftBelow(1), craftFire],
        [itemBelow("stick", 8), gather("stick")],
        [itemBelow("stick", 8), walkTo("stick")],
        [itemBelow("berry", 3), gather("berry")],
        [itemBelow("berry", 3), walkTo("berry")],
        [always, explore],
        [always, wander],
      ],
    },
  ],
});

const FIGHT = {
  name: "Walka",
  rules: [
    [always, strike],
    [always, kick],
  ],
};

/**
 * The group of combat of a program that carries bandages: below 50 health it presses a bandage on
 * the wound before the strike, which takes one turn and gives back 25 health, while a bite of the
 * wolf takes 7. The rule uses the action that the branch „Ucisk” opens.
 */
const FIGHT_WITH_BANDAGES = {
  name: "Walka",
  rules: [[healthBelow(50), pressure("bandage")], ...FIGHT.rules],
};

/**
 * The group of a program that carries bandages outside a fight: below 70 health it dresses with
 * one, the 25 it heals never going past full health.
 */
const DRESSING = {
  name: "Opatrunek",
  rules: [[healthBelow(70), tend("bandage")]],
};

/**
 * The groups of the roaming program: it builds its campfire where it stands and walks on for the
 * rest. Eats below 75 % satiety, looks for berries below 65 %, explores and wanders below 60 %,
 * lights the campfire below 36 degrees and keeps sticks and berries in stock.
 */
function roamingGroups({ fight }) {
  return [
    { name: "Jedzenie", rules: [[satietyBelow(75), eat]] },
    ...(fight ? [FIGHT] : []),
    {
      name: "Głód",
      when: satietyBelow(65),
      rules: [
        [itemBelow("berry", 1), gather("berry")],
        [itemBelow("berry", 1), walkTo("berry")],
      ],
    },
    {
      name: "Szukaj jedzenia",
      when: satietyBelow(60),
      rules: [
        [itemBelow("berry", 1), explore],
        [itemBelow("berry", 1), wander],
      ],
    },
    {
      name: "Zimno",
      when: temperatureBelow(36),
      rules: [
        [always, lightFire],
        [itemBelow("stick", 2), gather("stick")],
        [itemBelow("stick", 2), walkTo("stick")],
        [always, walkToFire],
        [always, craftFire],
        [itemBelow("stick", 6), gather("stick")],
        [itemBelow("stick", 6), walkTo("stick")],
      ],
    },
    {
      name: "Zapasy",
      rules: [
        [itemBelow("stick", 2), gather("stick")],
        [itemBelow("berry", 2), gather("berry")],
        [itemBelow("stick", 8), gather("stick")],
        [itemBelow("berry", 4), gather("berry")],
        [itemBelow("stick", 2), walkTo("stick")],
        [itemBelow("berry", 2), walkTo("berry")],
        [always, explore],
        [itemBelow("stick", 2), wander],
        [itemBelow("berry", 2), wander],
      ],
    },
  ];
}

/**
 * The groups of the settling program: it looks for a tile that holds both sticks and berries,
 * builds the campfire there and never leaves it. The group "Miejsce na ognisko" holds only while
 * the character stands away from a campfire: it walks back to a campfire if one stands somewhere,
 * else explores the tile, walks on where a resource is missing, and builds where both lie. The
 * thresholds are open: the stock of sticks and berries it gathers up to, and the temperature
 * below which it lights.
 */
function settlingGroups({
  fight,
  berries,
  sticks = 8,
  coldAt = 36.4,
  bandages = false,
}) {
  return [
    { name: "Jedzenie", rules: [[satietyBelow(75), eat]] },
    ...(fight ? [bandages ? FIGHT_WITH_BANDAGES : FIGHT] : []),
    ...(bandages ? [DRESSING] : []),
    {
      name: "Głód",
      when: satietyBelow(50),
      rules: [[itemBelow("berry", 1), gather("berry")]],
    },
    {
      name: "Miejsce na ognisko",
      when: awayFromFire,
      rules: [
        [always, walkToFire],
        [always, explore],
        [hereBelow("berry", 1), wander],
        [hereBelow("stick", 1), wander],
        [always, craftFire],
      ],
    },
    {
      name: "Zimno",
      when: temperatureBelow(coldAt),
      rules: [
        [always, lightFire],
        [itemBelow("stick", 2), gather("stick")],
      ],
    },
    {
      name: "Zapasy",
      rules: [
        [itemBelow("berry", 2), gather("berry")],
        [itemBelow("stick", sticks), gather("stick")],
        [itemBelow("berry", berries), gather("berry")],
      ],
    },
  ];
}

/**
 * The best program found for Las with an empty backpack: the roaming program, 21 rules in 5
 * groups, with nothing taken from the chest. It lights its campfire with the spell of a mage, so
 * it pays nature energy for it.
 */
export const forestBest = program({
  bring: ALL_OUT,
  groups: roamingGroups({ fight: false }),
});

/** The settling program on Las with an empty backpack: worse there than the roaming one. */
export const forestSettled = program({
  bring: ALL_OUT,
  groups: settlingGroups({ fight: false, berries: 4 }),
});

/**
 * The settling program as a program of the earning loop on Las: it takes eight sticks from the
 * chest, so the campfire burns before the first chill, lights below 35.6 degrees and gathers up to
 * eleven sticks, which leaves more to bring out of a solved map run.
 */
export const forestLoopWithStock = program({
  take: [["stick", 8]],
  bring: ALL_OUT,
  groups: settlingGroups({
    fight: false,
    berries: 4,
    sticks: 11,
    coldAt: 35.6,
  }),
});

/**
 * The first version of the loop program: as many sticks brought out as taken, the rest in
 * berries.
 */
export const forestLoopWithStockV1 = program({
  take: [["stick", 8]],
  bring: ALL_OUT,
  groups: settlingGroups({ fight: false, berries: 7 }),
});

/** Naive on Las - głębiej: the decent program of Las with a strike added, nothing taken along. */
export const forestDeepNaive = program({
  bring: ALL_OUT,
  groups: [
    {
      name: "Program",
      rules: [
        [always, strike],
        [satietyBelow(50), eat],
        [satietyBelow(50), gather("berry")],
        [satietyBelow(50), walkTo("berry")],
        [temperatureBelow(36), lightFire],
        [temperatureBelow(35.5), walkToFire],
        [fireLeftBelow(1), craftFire],
        [itemBelow("stick", 8), gather("stick")],
        [itemBelow("stick", 8), walkTo("stick")],
        [itemBelow("berry", 3), gather("berry")],
        [itemBelow("berry", 3), walkTo("berry")],
        [always, explore],
        [always, wander],
      ],
    },
  ],
});

/**
 * Decent on Las - głębiej: the roaming program with the group "Walka", and twelve sticks and
 * three berries taken from the chest.
 */
export const forestDeepDecent = program({
  take: [
    ["stick", 12],
    ["berry", 3],
  ],
  bring: ALL_OUT,
  groups: roamingGroups({ fight: true }),
});

/**
 * The best program found for Las - głębiej: the settling program with the group "Walka", eight
 * sticks and seven berries taken from the chest.
 */
export const forestDeepBest = program({
  take: [
    ["stick", 8],
    ["berry", 7],
  ],
  bring: ALL_OUT,
  groups: settlingGroups({ fight: true, berries: 4 }),
});

/** The same rules with nothing taken from the chest: what the best program is worth without it. */
export const forestDeepBestNoStock = program({
  bring: ALL_OUT,
  groups: settlingGroups({ fight: true, berries: 4 }),
});

/**
 * The groups of the settling program written for the branch "Obchód", where one round takes up to
 * twelve pieces without a draw in 40 minutes: the gathering of the settling program becomes
 * patrols. A character needs the branch to run it.
 */
function patrolGroups() {
  return [
    { name: "Jedzenie", rules: [[satietyBelow(75), eat]] },
    FIGHT,
    {
      name: "Miejsce na ognisko",
      when: awayFromFire,
      rules: [
        [always, walkToFire],
        [always, explore],
        [hereBelow("berry", 1), wander],
        [hereBelow("stick", 1), wander],
        [always, craftFire],
        [itemBelow("stick", 6), patrol("stick")],
      ],
    },
    {
      name: "Zimno",
      when: temperatureBelow(36.4),
      rules: [
        [always, lightFire],
        [itemBelow("stick", 2), patrol("stick")],
      ],
    },
    {
      name: "Zapasy",
      rules: [
        [itemBelow("berry", 2), patrol("berry")],
        [itemBelow("stick", 2), patrol("stick")],
      ],
    },
  ];
}

/** The patrol program on Las with an empty backpack. */
export const forestSettledPatrol = program({
  bring: ALL_OUT,
  groups: patrolGroups(),
});

/** The patrol program on Las - głębiej, with eight sticks and seven berries taken along. */
export const forestDeepSettledPatrol = program({
  take: [
    ["stick", 8],
    ["berry", 7],
  ],
  bring: ALL_OUT,
  groups: patrolGroups(),
});

/** A measuring program, not a player's: explores, gathers sticks, builds and lights, nothing else. */
export const measureFireOnly = program({
  groups: [
    {
      name: "Program",
      rules: [
        [always, lightFire],
        [always, craftFire],
        [always, explore],
        [always, gather("stick")],
      ],
    },
  ],
});

/** The same measuring program with eight sticks taken from the chest. */
export const measureFireOnlyWithSticks = program({
  take: [["stick", 8]],
  groups: [
    {
      name: "Program",
      rules: [
        [always, lightFire],
        [always, craftFire],
        [always, explore],
        [always, gather("stick")],
      ],
    },
  ],
});

/** The empty program: the character only waits. */
export const emptyProgram = program({
  groups: [{ name: "Program", rules: [] }],
});

/**
 * The settling program with five numbers open, as one of a family of threshold variants: when it
 * eats, below what satiety it looks for a berry, below what temperature it lights, and how many
 * sticks and berries it gathers up to. It takes eight sticks from the chest where `take` is set.
 */
function settledVariant({ eatAt, hungryAt, coldAt, sticks, berries, take }) {
  return program({
    take: take ? [["stick", 8]] : [],
    bring: STICKS_AND_BERRIES_OUT,
    groups: [
      { name: "Jedzenie", rules: [[satietyBelow(eatAt), eat]] },
      {
        name: "Głód",
        when: satietyBelow(hungryAt),
        rules: [[itemBelow("berry", 1), gather("berry")]],
      },
      {
        name: "Miejsce na ognisko",
        when: awayFromFire,
        rules: [
          [always, walkToFire],
          [always, explore],
          [hereBelow("berry", 1), wander],
          [hereBelow("stick", 1), wander],
          [always, craftFire],
        ],
      },
      {
        name: "Zimno",
        when: temperatureBelow(coldAt),
        rules: [
          [always, lightFire],
          [itemBelow("stick", 2), gather("stick")],
        ],
      },
      {
        name: "Zapasy",
        rules: [
          [itemBelow("berry", 2), gather("berry")],
          [itemBelow("stick", sticks), gather("stick")],
          [itemBelow("berry", berries), gather("berry")],
        ],
      },
    ],
  });
}

/** One variant of that family, as a sample of its shape. */
export const forestSettledVariantExample = settledVariant({
  eatAt: 60,
  hungryAt: 50,
  coldAt: 36,
  sticks: 8,
  berries: 5,
  take: true,
});

/**
 * A working program for Las: the settling loop program with eight sticks taken along, which
 * gathers moss and fiber once its needs are met. Its numbers are how many of each it gathers up
 * to; `campAtMoss` builds the campfire only on a tile with moss.
 */
function workingProgram({ sticks, berries, moss, fiber, campAtMoss }) {
  return program({
    take: [["stick", 8]],
    bring: ALL_OUT,
    groups: [
      { name: "Jedzenie", rules: [[satietyBelow(75), eat]] },
      {
        name: "Głód",
        when: satietyBelow(50),
        rules: [[itemBelow("berry", 1), gather("berry")]],
      },
      {
        name: "Miejsce na ognisko",
        when: awayFromFire,
        rules: [
          [always, walkToFire],
          [always, explore],
          [hereBelow("berry", 1), wander],
          [hereBelow("stick", 1), wander],
          ...(campAtMoss ? [[hereBelow("moss", 1), wander]] : []),
          [always, craftFire],
        ],
      },
      {
        name: "Zimno",
        when: temperatureBelow(35.6),
        rules: [
          [always, lightFire],
          [itemBelow("stick", 2), gather("stick")],
        ],
      },
      {
        name: "Zapasy",
        rules: [
          [itemBelow("berry", 2), gather("berry")],
          [itemBelow("stick", sticks), gather("stick")],
          [itemBelow("berry", berries), gather("berry")],
          [itemBelow("moss", moss), gather("moss")],
          [itemBelow("fiber", fiber), gather("fiber")],
        ],
      },
    ],
  });
}

/** The four working programs, named by the sticks, berries, moss and fiber they gather up to. */
export const forestWorkingS6B3M3F3 = workingProgram({
  sticks: 6,
  berries: 3,
  moss: 3,
  fiber: 3,
});
export const forestWorkingS5B3M6F0 = workingProgram({
  sticks: 5,
  berries: 3,
  moss: 6,
  fiber: 0,
});
export const forestWorkingS5B3M6F0CampAtMoss = workingProgram({
  sticks: 5,
  berries: 3,
  moss: 6,
  fiber: 0,
  campAtMoss: true,
});
export const forestWorkingS4B2M4F4 = workingProgram({
  sticks: 4,
  berries: 2,
  moss: 4,
  fiber: 4,
});

/**
 * For a map of cold and attackers where a mage has no campfire to rely on: eleven rules, no
 * campfire, no spell, nothing taken along. It eats below 60 %, fights, and keeps sticks and
 * berries in stock.
 */
export const deadZoneNoFire = program({
  groups: [
    { name: "Jedzenie", rules: [[satietyBelow(60), eat]] },
    FIGHT,
    {
      name: "Zapasy",
      rules: [
        [always, explore],
        [itemBelow("stick", 2), gather("stick")],
        [itemBelow("berry", 4), gather("berry")],
        [itemBelow("stick", 2), walkTo("stick")],
        [itemBelow("berry", 4), walkTo("berry")],
        [itemBelow("stick", 2), wander],
        [itemBelow("berry", 4), wander],
      ],
    },
  ],
});

/**
 * For a map where a mage with the branch "Czysty płomień" lives on its nature energy: it takes
 * six sticks and four berries, builds one campfire on a tile with berries and relights it with
 * nature energy alone.
 */
export const wastelandCleanFlame = program({
  take: [
    ["stick", 6],
    ["berry", 4],
  ],
  groups: [
    { name: "Jedzenie", rules: [[satietyBelow(75), eat]] },
    {
      name: "Miejsce na ognisko",
      when: awayFromFire,
      rules: [
        [always, walkToFire],
        [always, explore],
        [hereBelow("berry", 1), wander],
        [always, craftFire],
      ],
    },
    {
      name: "Zimno",
      when: temperatureBelow(36.4),
      rules: [[always, lightFire]],
    },
    { name: "Zapasy", rules: [[itemBelow("berry", 6), gather("berry")]] },
  ],
});

/**
 * The best program found for Las - głębiej, written to bring bandages from the chest: the same
 * settling program with the group "Walka", that presses a bandage on the wound before the strike
 * below 50 health, and the group "Opatrunek", that dresses with one outside a fight below 70 health.
 * The list of what it takes holds the bandages first, then eight sticks and seven berries; the
 * backpack takes 15 pieces spent in the order of the list, so the berries give way to the bandages
 * and three of them come. It depends on the branch „Ucisk”: a character without it does nothing with
 * the rule of combat, and a bandage in a pocket of the gear is used up by that rule before one of the
 * backpack.
 */
export const forestBandages = program({
  take: [
    ["bandage", 4],
    ["stick", 8],
    ["berry", 7],
  ],
  bring: ALL_OUT,
  groups: settlingGroups({ fight: true, berries: 4, bandages: true }),
});

/** Every reference program by its identifier. */
export const REFERENCE_PROGRAMS = {
  forestOldAcceptance,
  forestNaive,
  forestDecent,
  forestBest,
  forestSettled,
  forestLoopWithStock,
  forestLoopWithStockV1,
  forestDeepNaive,
  forestDeepDecent,
  forestDeepBest,
  forestDeepBestNoStock,
  forestSettledPatrol,
  forestDeepSettledPatrol,
  measureFireOnly,
  measureFireOnlyWithSticks,
  emptyProgram,
  forestWorkingS6B3M3F3,
  forestWorkingS5B3M6F0,
  forestWorkingS5B3M6F0CampAtMoss,
  forestWorkingS4B2M4F4,
  deadZoneNoFire,
  wastelandCleanFlame,
  forestSettledVariantExample,
  forestBandages,
};
