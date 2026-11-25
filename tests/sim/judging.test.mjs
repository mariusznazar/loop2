// The judging of a program on the twelve fixed seeds of a map (D-439): what it reads of the game, what it
// leaves untouched, the seeds and the cap, and how each seed ends. The expectations come from D-439 and
// D-22 (the seeds), D-179 and D-189 (what the equipment is cut by), D-249 (nothing is discovered), D-04
// (no argument is changed) and from relations the code does not compute: the judging of a seed is the map
// run of that seed passed minute by minute with the engine's own steps, and an empty program of Las dies of
// cold in game minute 243 on every seed (`tests/sim/acceptance.test.mjs`, worked out by hand there).
import assert from "node:assert/strict";
import { test } from "node:test";
import {
  createCharacter,
  newGame,
  programOf,
  send,
} from "../../dist/browser/sim/game.js";
import { BALANCE } from "../../dist/browser/sim/data/balance.js";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import {
  judgeAndRecord,
  judgeOnSeeds,
} from "../../dist/browser/sim/judging.js";
import { contentFingerprint } from "../../dist/browser/sim/judging-record.js";
import { startLoop } from "../../dist/browser/sim/loop.js";
import {
  createProgram,
  deleteProgram,
  editProgram,
} from "../../dist/browser/sim/programs.js";
import {
  mapRunEnded,
  newMapRun,
  stepMinute,
} from "../../dist/browser/sim/run.js";
import { takeTrip } from "../../dist/browser/sim/trip.js";
import { programFromRules } from "./program-fixture.mjs";
import { REFERENCE_PROGRAMS } from "./reference-programs.mjs";
import { newKnowingGame } from "./understanding-fixture.mjs";

const SEEDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const EMPTY = programFromRules();
/** The program of the list the judgings below are asked for. */
const LISTED = 1;
const entry = (item, count) => ({ item, count });
const condition = (kind, value) => ({ kind, value });
/** Eats whenever satiety is below 90 and takes up to ten berries from the chest. */
const EATER = {
  ...programFromRules({
    condition: condition("satietyBelow", 90),
    action: { kind: "eat" },
  }),
  tripPlan: { take: [entry("berry", 10)], bring: [] },
};

/** `value` frozen all the way down: a write into any of it throws. */
function frozen(value) {
  if (value && typeof value === "object") {
    for (const child of Object.values(value)) frozen(child);
    Object.freeze(value);
  }
  return value;
}

/**
 * Whether `error` is the judging's own refusal, a plain `Error`, rather than a `TypeError` of code that
 * read past a missing map, character or program.
 */
const ownRefusal = (error) => error.constructor === Error;

/**
 * A knowing game with Ala (1) and Ola (2) in the team, Skraj lasu solved and Las open but not solved,
 * the first program holding `program` and the chest holding `chest`.
 */
function game(program = EMPTY, chest = {}) {
  let state = createCharacter(newKnowingGame(), "Ala").state;
  state = createCharacter(state, "Ola").state;
  state = editProgram(state, LISTED, program).state;
  return {
    ...state,
    solvedMaps: ["forestEdge"],
    team: { ...state.team, chest: { pieces: chest } },
  };
}

/** `state` with the character `id` changed by `change`. */
function changing(state, id, change) {
  return {
    ...state,
    team: {
      ...state.team,
      characters: state.team.characters.map((character) =>
        character.id === id ? { ...character, ...change } : character,
      ),
    },
  };
}

const asked = (mapId, characterId = 1) => ({
  mapId,
  characterId,
  programId: LISTED,
});

/**
 * The map run of `seed` of the character of `state` with the program of the list, passed minute by minute
 * with the engine's steps to its end or to `cap`: the equipment is what an earning loop's map run takes
 * (`takeTrip`), the program is reduced to the character's repertoire, the skills and traits are the
 * character's.
 */
function passed(state, ids, seed, cap = 4000) {
  const map = MAPS[ids.mapId];
  const character = state.team.characters.find(
    (listed) => listed.id === ids.characterId,
  );
  const saved = state.programs.find((listed) => listed.id === ids.programId);
  const program = programOf(
    state,
    saved.program,
    character.id,
    character.skills,
  );
  const equipment = takeTrip(
    saved.program.tripPlan,
    state.team.chest,
    character.traits.carryingCapacity,
    map,
  );
  let run = newMapRun(
    map,
    seed,
    program,
    { mapId: ids.mapId, characterId: character.id },
    { ...character.traits },
    character.skills,
    equipment.backpack,
  ).run;
  while (!mapRunEnded(run) && run.minute < cap)
    run = stepMinute(run, map, program).run;
  return run;
}

/** The line a judging gives for the map run `run`. */
function lineOf(run) {
  if (run.death)
    return { kind: "death", cause: run.death.cause, minute: run.death.minute };
  return run.completion ? { kind: "solved" } : { kind: "undecided" };
}

const referenceResults = (state, ids) =>
  SEEDS.map((seed) => lineOf(passed(state, ids, seed)));

/** Runs `body` with the cap of the game's data set to `minutes`, and puts the data back. */
function withCap(minutes, body) {
  const kept = BALANCE.judgingCapMinutes;
  BALANCE.judgingCapMinutes = minutes;
  try {
    return body();
  } finally {
    BALANCE.judgingCapMinutes = kept;
  }
}

const dead = (cause, minute) => ({ kind: "death", cause, minute });

test("the game's data holds the cap of 4000 game minutes and the twelve seeds 1 to 12 beside each other", () => {
  // decision: D-439 "The game runs a program on twelve fixed seeds of a map, the same seeds each time, and shows the result seed by seed: solved, a death with its cause and game minute, or undecided where the program has neither solved the map nor died within a cap of game minutes set in the game's data, 4000 to start"
  // decision: D-22 "A judging of a program (D-439) runs on the twelve fixed seeds of a judging, the same on every map"
  assert.equal(BALANCE.judgingCapMinutes, 4000);
  assert.deepEqual(BALANCE.judgingSeeds, SEEDS);
});

test("an empty program on Las is twelve deaths of cold in game minute 243, in twelve lines, and takes nothing", () => {
  // decision: D-439 "The game runs a program on twelve fixed seeds of a map, the same seeds each time, and shows the result seed by seed: solved, a death with its cause and game minute, or undecided"
  const judging = judgeOnSeeds(game(), asked("forest"));
  assert.equal(judging.results.length, 12);
  assert.deepEqual(
    judging.results,
    SEEDS.map(() => dead("cold", 243)),
  );
  assert.deepEqual(judging.equipment, []);
});

test("each seed's line is the map run of that seed, in the order 1 to 12, whether it is solved or a death of cold, of hunger or of a fight", () => {
  // decision: D-439 "The game runs a program on twelve fixed seeds of a map, the same seeds each time, and shows the result seed by seed"
  // decision: D-22 "A judging of a program (D-439) runs on the twelve fixed seeds of a judging, the same on every map and at each judging, and takes no new seed, each of its twelve runs drawing from its own seed as a map run does."
  const cases = [
    ["forestNaive", "forestEdge", ["solved", "hunger"]],
    ["forestBest", "forest", ["solved", "cold"]],
    ["emptyProgram", "forestDeep", ["combat", "cold"]],
  ];
  for (const [name, mapId, seen] of cases) {
    const state = {
      ...game(REFERENCE_PROGRAMS[name]),
      solvedMaps: ["forestEdge", "forest"],
    };
    const expected = referenceResults(state, asked(mapId));
    const kinds = new Set(
      expected.map((result) => result.cause ?? result.kind),
    );
    for (const kind of seen)
      assert.ok(kinds.has(kind), `${name} on ${mapId} shows no ${kind}`);
    assert.deepEqual(
      judgeOnSeeds(state, asked(mapId)).results,
      expected,
      `${name} on ${mapId}`,
    );
  }
});

test("a run that solves the map or dies in the very minute of the cap counts, and one still going there is undecided", () => {
  // decision: D-439 "The game runs a program on twelve fixed seeds of a map, the same seeds each time, and shows the result seed by seed: solved, a death with its cause and game minute, or undecided where the program has neither solved the map nor died within a cap of game minutes set in the game's data, 4000 to start"
  // The empty program dies of cold in game minute 243 on every seed.
  const empty = game();
  assert.deepEqual(
    withCap(243, () => judgeOnSeeds(empty, asked("forest"))).results,
    SEEDS.map(() => dead("cold", 243)),
  );
  assert.deepEqual(
    withCap(242, () => judgeOnSeeds(empty, asked("forest"))).results,
    SEEDS.map(() => ({ kind: "undecided" })),
  );
  // A program that solves Las on some seeds and dies on others: each seed is solved from the game minute
  // its map run solves the map in, and undecided before it.
  const best = {
    ...game(REFERENCE_PROGRAMS.forestBest),
    solvedMaps: ["forestEdge", "forest"],
  };
  const ids = asked("forest");
  const solvedAt = SEEDS.map(
    (seed) => passed(best, ids, seed).completion?.minute,
  );
  const first = Math.min(...solvedAt.filter((minute) => minute !== undefined));
  assert.ok(Number.isFinite(first), "the case needs seeds that solve Las");
  const atEdge = withCap(first, () => judgeOnSeeds(best, ids)).results;
  const before = withCap(first - 1, () => judgeOnSeeds(best, ids)).results;
  solvedAt.forEach((minute, index) => {
    const solves = minute !== undefined && minute <= first;
    assert.equal(atEdge[index].kind === "solved", solves, `seed ${index + 1}`);
    assert.notEqual(before[index].kind, "solved", `seed ${index + 1}`);
  });
  assert.ok(atEdge.some((result) => result.kind === "solved"));
});

test("a map run that neither solves the map nor dies by the cap is undecided, and is no death and no solving", () => {
  // decision: D-439 "The game runs a program on twelve fixed seeds of a map, the same seeds each time, and shows the result seed by seed: solved, a death with its cause and game minute, or undecided where the program has neither solved the map nor died within a cap of game minutes set in the game's data, 4000 to start"
  const results = withCap(100, () =>
    judgeOnSeeds(game(), asked("forest")),
  ).results;
  assert.deepEqual(
    results,
    SEEDS.map(() => ({ kind: "undecided" })),
  );
});

test("the same judging twice gives the same twelve lines, whatever the last seed and the map run of the game are", () => {
  // decision: D-22 "A judging of a program (D-439) runs on the twelve fixed seeds of a judging, the same on every map and at each judging, and takes no new seed, each of its twelve runs drawing from its own seed as a map run does"
  const plain = game(REFERENCE_PROGRAMS.forestDecent);
  const first = judgeOnSeeds(plain, asked("forestEdge"));
  assert.deepEqual(judgeOnSeeds(plain, asked("forestEdge")), first);
  const sent = send(
    { ...plain, lastSeed: 987654321 },
    { mapId: "forestEdge", characterId: 2 },
    1_760_000_000_000,
  ).state;
  assert.deepEqual(judgeOnSeeds(sent, asked("forestEdge")), first);
});

test("the take list is cut by the chest, the carrying capacity and the map's entry, none of it leaves the chest, and all twelve runs start with the same", () => {
  // decision: D-439 "The character enters each of the twelve runs with the take list of the program cut by what lies in the chest, by the character's carrying capacity and by the map's entry cap, all twelve starting with the same equipment, and nothing leaves the chest."
  // decision: D-179 "Reality cuts the trip plan down and never up: what the chest lacks does not go into the backpack, what the backpack lacks does not come back, and where items compete for one budget — the backpack, the map's cap, the free room in the chest — as many go in from the top of the list as fit"
  const eaterWith = (chest) => game(EATER, chest);
  const none = judgeOnSeeds(eaterWith({}), asked("forest"));
  const four = judgeOnSeeds(eaterWith({ berry: 4 }), asked("forest"));
  const plenty = judgeOnSeeds(eaterWith({ berry: 50 }), asked("forest"));
  assert.deepEqual(none.equipment, []);
  // „jagoda 10” with 4 berries in the chest enters with 4; 50 in the chest, with the capacity 15 and the 10 asked, 10.
  assert.deepEqual(four.equipment, [entry("berry", 4)]);
  assert.deepEqual(plenty.equipment, [entry("berry", 10)]);
  // Each of the twelve runs has the berries: the more it enters with, the later it dies of cold, on every seed.
  for (const index of SEEDS.keys()) {
    assert.ok(none.results[index].minute < four.results[index].minute);
    assert.ok(four.results[index].minute < plenty.results[index].minute);
  }
  // The four of a chest of four are those a program taking four from a full chest enters with.
  const fourAsked = {
    ...EATER,
    tripPlan: { take: [entry("berry", 4)], bring: [] },
  };
  assert.deepEqual(
    judgeOnSeeds(game(fourAsked, { berry: 50 }), asked("forest")).results,
    four.results,
  );
  // The carrying capacity cuts the list too: a character who carries 2 enters with 2.
  const weak = changing(eaterWith({ berry: 50 }), 1, {
    traits: { carryingCapacity: 2 },
  });
  const twoAsked = {
    ...EATER,
    tripPlan: { take: [entry("berry", 2)], bring: [] },
  };
  assert.deepEqual(judgeOnSeeds(weak, asked("forest")).equipment, [
    entry("berry", 2),
  ]);
  assert.deepEqual(
    judgeOnSeeds(weak, asked("forest")).results,
    judgeOnSeeds(game(twoAsked, { berry: 50 }), asked("forest")).results,
  );
  // One budget in list order: moss 2 of the 2 held, then the 5 pieces that remain of 7 in sticks.
  const ordered = {
    ...EMPTY,
    tripPlan: {
      take: [entry("moss", 10), entry("stick", 10), entry("berry", 10)],
      bring: [],
    },
  };
  const seven = changing(game(ordered, { moss: 2, stick: 10, berry: 10 }), 1, {
    traits: { carryingCapacity: 7 },
  });
  assert.deepEqual(judgeOnSeeds(seven, asked("forest")).equipment, [
    entry("moss", 2),
    entry("stick", 5),
  ]);
});

test("nothing of the game is changed: the chest, the character's practice and ranks, the Understanding, the programs, a manual map run and an earning loop stand as they were", () => {
  // decision: D-439 "Such a judging is no map run of the character: it takes nothing from the chest, pays nothing and settles no death."
  // decision: D-439 "A judging discovers nothing: it runs with what the player has discovered, writes nothing into the Understanding and adds no rule to the program"
  // decision: D-249 "A map run of an earning loop discovers nothing: the Understanding and the program stay as they stand"
  // invariant: simulation-inputs
  const state = game(EATER, { berry: 4, stick: 3 });
  const looping = startLoop(
    changing(state, 1, {
      skills: Object.fromEntries(
        Object.entries(state.team.characters[0].skills).map(([id, held]) => [
          id,
          { ...held, practice: held.practice + 5 },
        ]),
      ),
    }),
    { mapId: "forestEdge", characterId: 2 },
    1_760_000_000_000,
  ).state;
  const running = send(
    looping,
    { mapId: "forestEdge", characterId: 1 },
    1_760_000_100_000,
  ).state;
  for (const held of [state, looping, running]) {
    const before = structuredClone(held);
    frozen(held);
    // A death of every one of the twelve runs settles nothing: the uses of the resurrection stay.
    judgeOnSeeds(held, asked("forestEdge", 1));
    judgeOnSeeds(held, asked("forestEdge", 2));
    assert.deepEqual(held, before);
  }
});

test("a character in an earning loop or in the manual map run is judged as one outside both", () => {
  // decision: D-439 "A program can be judged on every map open to the player, a map not yet solved included, and for a character in an earning loop or in a manual map run, and the judging changes nothing of either."
  const outside = game(REFERENCE_PROGRAMS.forestDecent);
  const looping = startLoop(
    outside,
    { mapId: "forestEdge", characterId: 1 },
    1_760_000_000_000,
  ).state;
  const running = send(
    outside,
    { mapId: "forestEdge", characterId: 1 },
    1_760_000_000_000,
  ).state;
  const expected = judgeOnSeeds(outside, asked("forestEdge", 1));
  assert.deepEqual(judgeOnSeeds(looping, asked("forestEdge", 1)), expected);
  assert.deepEqual(judgeOnSeeds(running, asked("forestEdge", 1)), expected);
});

test("a map not solved yet can be judged, and the program asked for by its number is the one judged", () => {
  // decision: D-439 "A program can be judged on every map open to the player, a map not yet solved included"
  const state = game(REFERENCE_PROGRAMS.forestDecent);
  assert.ok(!state.solvedMaps.includes("forest"));
  assert.equal(judgeOnSeeds(state, asked("forest")).results.length, 12);
  assert.equal(
    judgeOnSeeds({ ...state, solvedMaps: [] }, asked("forestEdge")).results
      .length,
    12,
  );
  // The program numbered 2, created after the first, is judged when it is asked for, not the first.
  const second = editProgram(
    createProgram(state).state,
    2,
    REFERENCE_PROGRAMS.emptyProgram,
  ).state;
  assert.equal(second.programs[1].id, 2);
  assert.deepEqual(
    judgeOnSeeds(second, { mapId: "forest", characterId: 1, programId: 2 })
      .results,
    SEEDS.map(() => dead("cold", 243)),
  );
  assert.notDeepEqual(
    judgeOnSeeds(second, asked("forestEdge")).results,
    judgeOnSeeds(second, { mapId: "forestEdge", characterId: 1, programId: 2 })
      .results,
  );
});

test("a program the character cannot carry out yet is judged as the program it can: the Understanding is not extended", () => {
  // decision: D-439 "A judging discovers nothing: it runs with what the player has discovered, writes nothing into the Understanding and adds no rule to the program."
  // A new game knows only „Zbadaj” and „zawsze”: the best program of Las is the empty one for it.
  const fresh = {
    ...createCharacter(newGame(), "Ala").state,
    solvedMaps: ["forestEdge"],
  };
  const best = editProgram(fresh, LISTED, REFERENCE_PROGRAMS.forestBest).state;
  assert.deepEqual(fresh.understanding.items, []);
  const before = structuredClone(best);
  assert.deepEqual(
    judgeOnSeeds(frozen(best), asked("forest")).results,
    SEEDS.map(() => dead("cold", 243)),
  );
  assert.deepEqual(best, before);
});

test("the character's skills and traits as they stand act in the twelve runs", () => {
  // decision: D-439 "The character enters each of the twelve runs with the take list of the program cut by what lies in the chest"
  // Relation: each line is the map run of that seed with the skills a rank of the character gives, as a map run of an earning loop has them.
  const plain = game(REFERENCE_PROGRAMS.forestDecent);
  const skilled = changing(plain, 1, {
    skills: {
      ...plain.team.characters[0].skills,
      smallItemGathering: { practice: 0, ranks: { keenEye: 3, fullHand: 1 } },
    },
  });
  const ids = asked("forestEdge");
  const unskilled = judgeOnSeeds(plain, ids).results;
  const result = judgeOnSeeds(skilled, ids).results;
  assert.notDeepEqual(result, unskilled);
  assert.deepEqual(result, referenceResults(skilled, ids));
});

test("a map, a character or a program the game does not have, and a map that is not open, are refused", () => {
  // decision: D-439 "A program can be judged on every map open to the player"
  const state = frozen(game());
  const refused = [
    ["a map of no name", asked("nowhere")],
    ["a name of the prototype", asked("constructor")],
    ["a name of the prototype's own", asked("__proto__")],
    ["a number for a map", asked(1)],
    ["no map", asked(undefined)],
    ["a map that is not open", asked("forestDeep")],
    ["a character the team lacks", asked("forest", 99)],
    [
      "no character",
      { mapId: "forest", characterId: undefined, programId: LISTED },
    ],
    ["a program the list lacks", { ...asked("forest"), programId: 99 }],
    ["no program", { ...asked("forest"), programId: undefined }],
  ];
  for (const [what, ids] of refused)
    assert.throws(() => judgeOnSeeds(state, ids), ownRefusal, what);
  const deleted = deleteProgram(createProgram(game()).state, LISTED).state;
  assert.throws(
    () => judgeOnSeeds(deleted, asked("forest")),
    ownRefusal,
    "a program deleted",
  );
});

test("the act of a judging gives the judging and its record, both from the state it read, and leaves the game state the very state it got", () => {
  // decision: D-440 "The game remembers the last judging of each character, program and map in the browser that made it, as D-441 gives: the twelve results of its seeds — solved, a death or undecided — and the equipment it took from what the chest held, while the cause and the game minute of a line stand only in the result shown after the judging (D-329)."
  // decision: D-439 "Such a judging is no map run of the character: it takes nothing from the chest, pays nothing and settles no death."
  // Relation: the judging is the one `judgeOnSeeds` gives; an empty program of Las dies of cold on all twelve seeds.
  const empty = game(EMPTY, { berry: 4 });
  const done = judgeAndRecord(frozen(empty), asked("forest"));
  assert.equal(done.state, empty);
  assert.deepEqual(done.events, []);
  assert.deepEqual(done.judging, judgeOnSeeds(empty, asked("forest")));
  assert.deepEqual(done.record, {
    results: SEEDS.map(() => "death"),
    equipment: [],
    contentRevision: empty.programs[0].contentRevision,
    contentFingerprint: contentFingerprint(empty.programs[0].program),
    generation: 1,
  });
  // A program that takes berries: the record holds the equipment the judging took, the kinds of its results
  // and the content revision of the program as it stood.
  const eating = game(EATER, { berry: 4 });
  const eats = judgeAndRecord(frozen(eating), asked("forest"));
  assert.equal(eats.state, eating);
  assert.deepEqual(eats.record, {
    results: eats.judging.results.map((result) => result.kind),
    equipment: [entry("berry", 4)],
    contentRevision: eating.programs[0].contentRevision,
    contentFingerprint: contentFingerprint(eating.programs[0].program),
    generation: 1,
  });
  assert.deepEqual(eats.judging.equipment, [entry("berry", 4)]);
  // Another character at another generation: the record holds its generation number.
  const second = changing(eating, 2, { generation: 5 });
  assert.equal(judgeAndRecord(second, asked("forest", 2)).record.generation, 5);
});

test("the act of a judging leaves the very state it got where an earning loop or a manual map run goes on, and refuses what the judging refuses", () => {
  // decision: D-439 "A program can be judged on every map open to the player, a map not yet solved included, and for a character in an earning loop or in a manual map run, and the judging changes nothing of either."
  const outside = game(REFERENCE_PROGRAMS.forestDecent);
  const looping = startLoop(
    outside,
    { mapId: "forestEdge", characterId: 1 },
    1_760_000_000_000,
  ).state;
  const running = send(
    outside,
    { mapId: "forestEdge", characterId: 1 },
    1_760_000_000_000,
  ).state;
  for (const held of [outside, looping, running]) {
    const done = judgeAndRecord(frozen(held), asked("forestEdge", 1));
    assert.equal(done.state, held);
    assert.deepEqual(done.judging, judgeOnSeeds(held, asked("forestEdge", 1)));
  }
  const state = frozen(game());
  for (const [what, ids] of [
    ["a map of no name", asked("nowhere")],
    ["a map that is not open", asked("forestDeep")],
    ["a character the team lacks", asked("forest", 99)],
    ["a program the list lacks", { ...asked("forest"), programId: 99 }],
  ])
    assert.throws(() => judgeAndRecord(state, ids), ownRefusal, what);
});

/** The wolf of Las — głębiej has 24 health (D-144). */
const WOLF_HEALTH = 24;
/** The game with the maps of Las — głębiej open, as the judgings below ask for them. */
const openDeep = (program) => ({
  ...game(program),
  solvedMaps: ["forestEdge", "forest"],
});
/** The damage the character dealt in one fight, summed over its exchanges: what a fight the wolf survives took. */
const dealtIn = (result) =>
  result.exchanges.reduce(
    (sum, exchange) => sum + (exchange.characterAction?.damage ?? 0),
    0,
  );

test("a judging gives the most health a fight took from the map's creature in each seed: a fight the character won gives the creature's whole health", () => {
  // decision: D-440 "On a map whose data name a creature for the record, the game remembers in the browser that made it the record of the most health of that creature that any judging took in one fight, a fight the character won giving the creature's whole health, a fight in which the character died counting as any other and a seed with no fight giving 0, and the largest of the twelve seeds of a judging counting."
  // decision: D-144 "The wolf has 24 health"
  const state = openDeep(REFERENCE_PROGRAMS.forestDeepDecent);
  const ids = asked("forestDeep");
  const judging = judgeOnSeeds(state, ids);
  const reference = SEEDS.map((seed) => passed(state, ids, seed));
  let won = 0;
  reference.forEach((run, index) => {
    if (run.lastCombat?.result?.outcome !== "creatureDefeated") return;
    won += 1;
    assert.equal(
      judging.creatureDamage[index],
      WOLF_HEALTH,
      `seed ${index + 1}`,
    );
  });
  assert.ok(won > 0, "the case needs seeds the character wins a fight on");
});

test("a fight in which the character died counts by the health the creature lost, and a seed whose fight took none gives 0", () => {
  // decision: D-440 "On a map whose data name a creature for the record, the game remembers in the browser that made it the record of the most health of that creature that any judging took in one fight, a fight the character won giving the creature's whole health, a fight in which the character died counting as any other and a seed with no fight giving 0, and the largest of the twelve seeds of a judging counting."
  const state = openDeep(REFERENCE_PROGRAMS.forestDeepDecent);
  const ids = asked("forestDeep");
  const judging = judgeOnSeeds(state, ids);
  const reference = SEEDS.map((seed) => passed(state, ids, seed));
  let died = 0;
  reference.forEach((run, index) => {
    // Seed 11 fights twice, wins the first and dies in the second; its most is the first fight's, see below.
    if (index === 10) return;
    if (run.lastCombat === null) {
      assert.equal(
        judging.creatureDamage[index],
        0,
        `seed ${index + 1}, no fight`,
      );
      return;
    }
    if (run.lastCombat.result.outcome !== "characterDied") return;
    died += 1;
    assert.equal(
      judging.creatureDamage[index],
      dealtIn(run.lastCombat.result),
      `seed ${index + 1}, a death in a fight`,
    );
  });
  assert.ok(died > 0, "the case needs seeds the character dies in a fight on");
});

test("a judging gives the largest of the twelve seeds' fights: a seed that wins one fight and dies in a later one gives the whole health of the first", () => {
  // decision: D-440 "On a map whose data name a creature for the record, the game remembers in the browser that made it the record of the most health of that creature that any judging took in one fight, a fight the character won giving the creature's whole health, a fight in which the character died counting as any other and a seed with no fight giving 0, and the largest of the twelve seeds of a judging counting."
  // decision: D-144 "The wolf has 24 health"
  const state = openDeep(REFERENCE_PROGRAMS.forestDeepDecent);
  const ids = asked("forestDeep");
  const judging = judgeOnSeeds(state, ids);
  // Seed 11 ends in a death in its second fight, which took 12 of the wolf's health.
  assert.equal(
    passed(state, ids, 11).lastCombat.result.outcome,
    "characterDied",
  );
  assert.equal(judging.creatureDamage[10], WOLF_HEALTH);
});

test("a fight the judging stops before its turns resolve gives 0 for its seed", () => {
  // decision: D-440 "On a map whose data name a creature for the record, the game remembers in the browser that made it the record of the most health of that creature that any judging took in one fight, a fight the character won giving the creature's whole health, a fight in which the character died counting as any other and a seed with no fight giving 0, and the largest of the twelve seeds of a judging counting."
  const state = openDeep(REFERENCE_PROGRAMS.forestDeepDecent);
  const ids = asked("forestDeep");
  // Seed 2 wins its only fight, which starts at the attack minute and resolves five minutes later.
  const attackMinute = passed(state, ids, 2).lastCombat.attackMinute;
  const cut = withCap(attackMinute + 2, () => judgeOnSeeds(state, ids));
  assert.equal(cut.results[1].kind, "undecided");
  assert.equal(cut.creatureDamage[1], 0);
});

test("a map with no creature gives 0 in every seed", () => {
  // decision: D-440 "On a map whose data name a creature for the record, the game remembers in the browser that made it the record of the most health of that creature that any judging took in one fight, a fight the character won giving the creature's whole health, a fight in which the character died counting as any other and a seed with no fight giving 0, and the largest of the twelve seeds of a judging counting."
  const judging = judgeOnSeeds(
    game(REFERENCE_PROGRAMS.forestBest),
    asked("forest"),
  );
  assert.deepEqual(
    judging.creatureDamage,
    SEEDS.map(() => 0),
  );
});
