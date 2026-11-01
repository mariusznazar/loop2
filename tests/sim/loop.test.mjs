// The life of an earning loop in the simulation: it starts, passes game minutes, takes each end of
// a map run at once and stops. The expectations come from the task petla-zarobkowa (To do 1 and 3 to
// 9 and 15, answers Q4, Q5, Q9, Q10, Q13 and Q16, the settlements of rows 2 to 9, 16 and 17) and
// from the spec (sections 1, 3, 4, 5 and 15), which bind the tests of loop at commit cdc7c0d where
// they cover a case: `src/sim/sim.test.ts:1464`-`1730`, `src/sim/chest.test.ts:350`-`374`,
// `src/sim/loop.test.ts:157`-`170` and `src/sim/policy.test.ts:587`. Where an expectation is a
// relation (a loop's map run equals the manual one) no value comes from today's run.
import assert from "node:assert/strict";
import { test } from "node:test";
import {
  advanceMinutes,
  characterAfterDeath,
  createCharacter,
  end,
  newGame,
  programOf,
  send,
  setProgram,
  withSaveTime,
} from "../../dist/public/sim/game.js";
import {
  advanceLoopRun,
  endLoopRun,
  startLoop,
  stopLoop,
} from "../../dist/public/sim/loop.js";
import { deleteProgram, editProgram } from "../../dist/public/sim/programs.js";
import { mixSeed, nextSeed } from "../../dist/public/sim/random.js";
import { loadSavedGame, savedGame } from "../../dist/public/sim/saved-game.js";
import { branchRank, buyBranch } from "../../dist/public/sim/skills.js";
import { programFromRules } from "./program-fixture.mjs";
import { newKnowingGame } from "./understanding-fixture.mjs";

/** A real moment of the browser's clock, in ms. */
const T0 = 1_760_000_000_000;
/** The renewal of a resurrection, 480 real minutes in ms: 480 × 60 000. */
const RENEWAL_MS = 28_800_000;
/**
 * The send at this real moment takes the seed 1946377216 from a new game, on which the empty
 * program dies in game minute 243, of cold (`tests/sim/acceptance.test.mjs`, worked out by hand
 * there), so `startLoop` at this moment seeds the first map run the same.
 */
const COLD_REAL_MS = 1_760_000_800_000;
const COLD_SEED = 1_946_377_216;
const COLD_DEATH_MINUTE = 243;
const FOREST = { mapId: "forest", characterId: 1 };
const ALWAYS = { kind: "always" };
const EXPLORE = { kind: "explore" };
const HEALTHY = { temperature: 37, satiety: 100, health: 100 };
/** One game minute from a death of cold: chilled, with health the next minute takes away. */
const DYING = { temperature: 30, satiety: 100, health: 0.1 };

const entry = (item, count) => ({ item, count });
const rule = (condition, action) => ({ condition, action });
const below = (kind, value) => ({ kind, value });
const itemBelow = (item, value) => ({ kind: "itemBelow", item, value });
const gather = (resource) => ({ kind: "gather", resource });
const walkTo = (resource) => ({ kind: "walkTo", resource });

const EMPTY = programFromRules();
/** A program that lives through the first 480 game minutes of Las on the seed above. */
const SURVIVING = programFromRules(
  rule(below("satietyBelow", 35), { kind: "eat" }),
  rule(below("temperatureBelow", 36), { kind: "lightCampfire" }),
  rule(below("temperatureBelow", 36.5), { kind: "feedCampfire" }),
  rule(below("temperatureBelow", 35.2), { kind: "walkToCampfire" }),
  rule(below("campfireLeftBelow", 1), { kind: "craftCampfire" }),
  rule(itemBelow("berry", 1), gather("berry")),
  rule(itemBelow("berry", 1), walkTo("berry")),
  rule({ kind: "hereBelow", resource: "berry", value: 1 }, EXPLORE),
  rule(itemBelow("berry", 1), { kind: "wander" }),
  rule(itemBelow("stick", 8), gather("stick")),
  rule(itemBelow("stick", 8), walkTo("stick")),
  rule(below("temperatureBelow", 36), { kind: "lightItem" }),
  rule(ALWAYS, EXPLORE),
  rule({ kind: "awayFromCampfire" }, { kind: "walkToCampfire" }),
  rule(ALWAYS, gather("stick")),
  rule(ALWAYS, gather("berry")),
  rule(ALWAYS, { kind: "wander" }),
);

/** `program` with the trip plan given. */
function withTrip(program, take, bring) {
  return { ...program, tripPlan: { take, bring } };
}

/**
 * A knowing game with Ala (1) and Ola (2) in the team, Las solved, the first program holding
 * `program` and the chest holding `chest`.
 */
function game(program = EMPTY, chest = {}) {
  let state = setProgram(newKnowingGame(), program).state;
  state = createCharacter(state, "Ala").state;
  state = createCharacter(state, "Ola").state;
  return {
    ...state,
    solvedMaps: ["forest"],
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

/** `state` with the map run of the loop of character `id` changed by `change`. */
function changingRun(state, id, change) {
  const loop = state.loops[id];
  return {
    ...state,
    loops: {
      ...state.loops,
      [id]: { ...loop, run: { ...loop.run, ...change } },
    },
  };
}

/** The game started in a loop of Ala on Las at `realMs`. */
function looping(program = EMPTY, chest = {}, realMs = T0) {
  return startLoop(game(program, chest), FOREST, realMs).state;
}

/** The explore activity of a map run, ending in the next game minute. */
function endingNext(run) {
  return {
    activity: { kind: "rule", ruleId: 1, action: EXPLORE },
    startMinute: run.minute,
    endMinute: run.minute + 1,
    stepTo: null,
  };
}

/**
 * The loop of Ala one game minute from a completion: healthy, the streak at 479 of the 480 that
 * solve Las, an exploration ending in the next minute (as `tests/sim/completion.test.mjs` does),
 * carrying `backpack` and having gathered `practice` in the map run.
 */
function oneShort(state, backpack = {}, practice = {}) {
  const run = state.loops[1].run;
  return changingRun(state, 1, {
    body: { ...HEALTHY },
    streak: 479,
    current: endingNext(run),
    character: {
      ...run.character,
      backpack: { ...run.character.backpack, ...backpack },
    },
    practice,
  });
}

/** The loop of Ala one game minute from a death of cold. */
function dyingNext(state) {
  return changingRun(state, 1, { body: { ...DYING } });
}

/** The loop of `state` with the loop's gathered practice set. */
function holding(state, practice) {
  return {
    ...state,
    loops: { ...state.loops, 1: { ...state.loops[1], practice } },
  };
}

/** One game minute passed in Ala's loop and its end taken at `nowMs`. */
function passedAndEnded(state, nowMs = T0) {
  return endLoopRun(advanceLoopRun(state, 1, 1).state, 1, nowMs);
}

/** The ids of the fields a `GameMapRun` adds to a `MapRun`. */
const MANUAL_ONLY = [
  "copy",
  "bringPlan",
  "deposited",
  "solvedMapRun",
  "deathSettlement",
];

/** The plain map run of a manual map run. */
function plainRun(manual) {
  return Object.fromEntries(
    Object.entries(manual).filter(([key]) => !MANUAL_ONLY.includes(key)),
  );
}

const ala = (state) => state.team.characters[0];

test("the first map run of a loop goes on the program of its row, from the seed a send takes, and the loop holds the content of the program and nothing of its copy", () => {
  const state = game(withTrip(EMPTY, [], []));
  const result = startLoop(state, FOREST, T0);
  const loop = result.state.loops[1];
  const sent = send(state, FOREST, T0).state;
  assert.deepEqual(loop.program, state.programs[0].program);
  assert.deepEqual(Object.keys(loop).sort(), [
    "completed",
    "practice",
    "program",
    "run",
    "runNumber",
  ]);
  assert.equal(loop.runNumber, 1);
  assert.equal(loop.completed, 0);
  assert.deepEqual(loop.practice, {});
  assert.equal(loop.run.minute, 0);
  assert.equal(loop.run.mapId, "forest");
  assert.equal(loop.run.character.id, 1);
  // Q10: the first seed is what a send of the same state at the same moment takes, and it is kept.
  assert.equal(loop.run.seed, sent.run.seed);
  assert.equal(loop.run.seed, mixSeed(state.lastSeed, T0));
  assert.equal(result.state.lastSeed, loop.run.seed);
  // The map run is the one a manual send starts: the same layout, body, skills and first activity.
  assert.deepEqual(loop.run, plainRun(sent.run));
  assert.deepEqual(result.events, []);
});

test("starting a loop makes its program the one used last and last entered, clears the pick, drops the stopped line and leaves the counts, the manual map run and other characters as they were", () => {
  const program = programFromRules(rule(ALWAYS, EXPLORE));
  let state = game(program);
  // A manual map run of Ola ended by „Zakończ” leaves counts beside the first program.
  state = end(send(state, { mapId: "forest", characterId: 2 }, T0).state).state;
  state = {
    ...state,
    pickedPrograms: { 1: 1, 2: 1 },
    stoppedLoops: { 1: { exploration: 2 }, 2: { eating: 1 } },
  };
  assert.notEqual(state.ruleCounts, null, "precondition: counts stand");
  const result = startLoop(state, { ...FOREST, programId: 1 }, T0);
  const after = result.state;
  assert.equal(after.lastUsedPrograms[1], 1);
  assert.equal(after.lastEnteredProgram, 1);
  assert.deepEqual(after.pickedPrograms, { 2: 1 });
  assert.deepEqual(after.stoppedLoops, { 2: { eating: 1 } });
  assert.deepEqual(after.ruleCounts, state.ruleCounts);
  assert.equal(after.countsProgram, state.countsProgram);
  assert.equal(after.run, null);
  assert.deepEqual(after.team.characters, state.team.characters);
  assert.deepEqual(result.events, []);
});

test("a loop starts beside a manual map run of another character, which it leaves as it stands", () => {
  const sent = send(game(), { mapId: "forest", characterId: 2 }, T0).state;
  const result = startLoop(sent, FOREST, T0);
  assert.notEqual(result.state, sent);
  assert.equal(result.state.run, sent.run);
  assert.equal(result.state.paused, sent.paused);
  assert.deepEqual(Object.keys(result.state.loops), ["1"]);
});

test("without a program number a loop takes the program of the character's row: the pick, else the one used last", () => {
  let state = game();
  state = editProgram(
    state,
    1,
    programFromRules(rule(ALWAYS, { kind: "wander" })),
  ).state;
  // A second program the row shows when it is picked.
  state = {
    ...state,
    programs: [
      ...state.programs,
      {
        id: 2,
        name: "Drugi",
        program: programFromRules(rule(ALWAYS, EXPLORE)),
      },
    ],
    nextProgramId: 3,
  };
  const picked = { ...state, pickedPrograms: { 1: 2 } };
  const byPick = startLoop(picked, FOREST, T0).state;
  assert.deepEqual(byPick.loops[1].program, state.programs[1].program);
  assert.equal(byPick.lastUsedPrograms[1], 2);
  const byLast = startLoop(
    { ...state, lastUsedPrograms: { 1: 2 } },
    FOREST,
    T0,
  ).state;
  assert.deepEqual(byLast.loops[1].program, state.programs[1].program);
  const byDefault = startLoop(state, FOREST, T0).state;
  assert.deepEqual(byDefault.loops[1].program, state.programs[0].program);
});

test("a start the map, the character or the program does not allow returns the very state", () => {
  const state = game();
  const refused = [
    ["a map the data lacks", state, { ...FOREST, mapId: "nowhere" }],
    ["a map not solved", state, { ...FOREST, mapId: "forestDeep" }],
    [
      "a map not solved, though it opens after a solved one",
      { ...state, solvedMaps: [] },
      FOREST,
    ],
    ["a character not in the team", state, { ...FOREST, characterId: 99 }],
    ["a program not on the list", state, { ...FOREST, programId: 99 }],
    [
      "a character already in a loop",
      startLoop(state, FOREST, T0).state,
      FOREST,
    ],
    [
      "a character in the manual map run",
      send(state, FOREST, T0).state,
      FOREST,
    ],
  ];
  // The control: the same game allows a start that none of the refusals names.
  assert.notEqual(startLoop(state, FOREST, T0).state, state);
  for (const [name, from, ids] of refused) {
    const result = startLoop(from, ids, T0);
    assert.equal(result.state, from, `${name}: the very state`);
    assert.deepEqual(result.events, [], `${name}: no event`);
  }
});

// invariant: trip-transfer
// To do 5; loop `chest.test.ts:350`-`358`: a map run of a loop takes from the chest on a solved map,
// and what the chest lacks does not come, the loop going on cut (D-179).
test("the first map run of a loop takes its take list from the chest although the map is solved, as far as the chest holds", () => {
  const state = game(
    withTrip(EMPTY, [entry("stick", 4), entry("berry", 6)], []),
    {
      stick: 6,
      berry: 4,
    },
  );
  const run = startLoop(state, FOREST, T0).state;
  assert.deepEqual(run.team.chest.pieces, { stick: 2, berry: 0 });
  const backpack = run.loops[1].run.character.backpack;
  assert.equal(backpack.stick, 4);
  assert.equal(backpack.berry, 4, "cut to the four the chest held");
});

test("a loop's map run is the map run of a manual send over the same game minutes, whatever the program", () => {
  for (const program of [EMPTY, SURVIVING]) {
    const state = game(program);
    const sent = send(state, FOREST, COLD_REAL_MS).state;
    let loop = startLoop(state, FOREST, COLD_REAL_MS).state;
    assert.equal(loop.loops[1].run.seed, COLD_SEED, "precondition: the seed");
    let manual = sent;
    for (const span of [1, 29, 110]) {
      loop = advanceLoopRun(loop, 1, span).state;
      manual = advanceMinutes(manual, span).state;
      assert.deepEqual(loop.loops[1].run, plainRun(manual.run));
    }
  }
});

// invariant: map-run-repeatability
// Task, Q10: the first seed is the only one a loop takes from real time, so two starts from one state
// at one moment pass the same map runs through their ends.
test("two loops from one state at one moment go the same map runs, ends and seeds included", () => {
  const route = () => {
    let state = looping(EMPTY, {}, COLD_REAL_MS);
    const seen = [];
    for (let end = 0; end < 3; end += 1) {
      state = advanceLoopRun(state, 1, 5000).state;
      state = endLoopRun(state, 1, T0 + end).state;
      seen.push(state);
    }
    return seen;
  };
  const first = route();
  assert.deepEqual(route(), first);
  // The route passed an end: a death, covered, and the loop's next map run with another seed.
  assert.equal(first[0].loops[1].runNumber, 2);
  assert.notEqual(first[0].loops[1].run.seed, COLD_SEED);
});

// invariant: loop-run-knowledge
// To do 15, Q9; loop: none (the departure). A manual map run of the same game discovers the first
// chill, which the precondition shows; the loop's map run takes the same minutes and discovers
// nothing.
test("a loop's map run through the first chill leaves the Understanding, the programs and the counts as it found them, and its copy empty", () => {
  let state = setProgram(newGame(), EMPTY).state;
  state = {
    ...createCharacter(state, "Ala").state,
    solvedMaps: ["forest"],
  };
  const manual = advanceMinutes(send(state, FOREST, COLD_REAL_MS).state, 100);
  assert.ok(
    manual.events.some((event) => event.kind === "discovered"),
    "precondition: a manual map run discovers within these minutes",
  );
  assert.notDeepEqual(manual.state.understanding, state.understanding);
  const started = startLoop(state, FOREST, COLD_REAL_MS).state;
  const passed = advanceLoopRun(started, 1, 100);
  assert.equal(passed.passed, 100);
  assert.deepEqual(passed.state.understanding, state.understanding);
  assert.deepEqual(passed.state.programs, state.programs);
  assert.equal(passed.state.ruleCounts, state.ruleCounts);
  assert.equal(passed.state.countsProgram, state.countsProgram);
  assert.deepEqual(passed.state.loops[1].program, state.programs[0].program);
  assert.deepEqual(passed.state.loops[1].program.groups[0].rules, []);
  assert.equal(passed.state.discovery, null);
  assert.equal(passed.state.paused, false);
  assert.deepEqual(passed.events, []);
});

// invariant: loop-run-knowledge
test("a loop's map run through a death and its next map run still leaves the Understanding and the programs as they were", () => {
  let state = setProgram(newGame(), EMPTY).state;
  state = {
    ...createCharacter(state, "Ala").state,
    solvedMaps: ["forest"],
  };
  state = startLoop(state, FOREST, COLD_REAL_MS).state;
  const before = {
    understanding: state.understanding,
    programs: state.programs,
  };
  state = advanceLoopRun(state, 1, 1000).state;
  state = endLoopRun(state, 1, T0).state;
  state = advanceLoopRun(state, 1, 150).state;
  assert.equal(state.loops[1].runNumber, 2);
  assert.deepEqual(state.understanding, before.understanding);
  assert.deepEqual(state.programs, before.programs);
});

// To do 4 and spec 3: the repertoire is computed on each call that passes minutes, so what a manual
// map run discovers meanwhile widens a loop's repertoire (D-119, D-249).
test("an action a manual map run discovers meanwhile enters the loop's next pick, and not before", () => {
  let state = setProgram(
    newGame(),
    programFromRules(rule(ALWAYS, EXPLORE)),
  ).state;
  state = {
    ...createCharacter(state, "Ala").state,
    solvedMaps: ["forest"],
  };
  state = startLoop(state, FOREST, T0).state;
  assert.deepEqual(
    state.loops[1].run.current.activity,
    { kind: "wait" },
    "precondition: the action is outside the repertoire, so the rule is passed over",
  );
  const unchanged = advanceLoopRun(state, 1, 1).state;
  assert.deepEqual(unchanged.loops[1].run.current.activity, { kind: "wait" });
  const widened = {
    ...state,
    understanding: {
      ...state.understanding,
      actions: [...state.understanding.actions, "explore"],
    },
  };
  const after = advanceLoopRun(widened, 1, 1).state;
  assert.deepEqual(after.loops[1].run.current.activity, {
    kind: "rule",
    ruleId: 1,
    action: EXPLORE,
  });
});

// invariant: saved-program-edit
// To do 3; loop `loop.test.ts:157`-`170`, `policy.test.ts:587`: the copy is taken at the start and
// nothing the player does to the program reaches it, the next map runs of the loop included.
test("editing or deleting the program after the start leaves the loop on the content it took, in every later map run", () => {
  let state = game(programFromRules(rule(ALWAYS, EXPLORE)));
  state = {
    ...state,
    programs: [
      ...state.programs,
      { id: 2, name: "Drugi", program: programFromRules() },
    ],
    nextProgramId: 3,
  };
  state = startLoop(state, FOREST, T0).state;
  const taken = state.loops[1].program;
  const edited = editProgram(
    state,
    1,
    programFromRules(rule(ALWAYS, { kind: "wander" })),
  ).state;
  assert.deepEqual(edited.loops[1].program, taken);
  const deleted = deleteProgram(edited, 1).state;
  assert.deepEqual(deleted.loops[1].program, taken);
  // The next map run is picked from the content taken, not from the edited program or none.
  const ended = passedAndEnded(oneShort(deleted)).state;
  assert.deepEqual(ended.loops[1].program, taken);
  assert.deepEqual(ended.loops[1].run.current.activity, {
    kind: "rule",
    ruleId: 1,
    action: EXPLORE,
  });
});

// To do 9, Q4: a rank bought during the loop acts from the next map run; the one going on keeps the
// skills of its start.
test("a rank bought during a loop reaches the next map run and not the one going on", () => {
  let state = looping(EMPTY);
  state = changing(state, 1, {
    skills: {
      ...ala(state).skills,
      smallItemGathering: { practice: 160, ranks: {} },
    },
  });
  // The map run going on started with the skills before this practice.
  const bought = buyBranch(state, 1, "patrol").state;
  assert.equal(branchRank(ala(bought).skills, "patrol"), 1);
  assert.equal(branchRank(bought.loops[1].run.character.skills, "patrol"), 0);
  const next = passedAndEnded(oneShort(bought)).state;
  assert.equal(branchRank(next.loops[1].run.character.skills, "patrol"), 1);
  assert.equal(next.loops[1].run.minute, 0);
});

// Spec 3: the repertoire is computed from the run's own skills, not from the manual map run's.
test("a loop picks its rules by the skills of its own character, whatever the manual map run beside it has bought", () => {
  const patrolling = programFromRules(
    rule(ALWAYS, { kind: "patrol", resource: "berry" }),
  );
  /** Ala looping, her entrance tile revealed with berries, the rank bought or not; Ola in the manual map run. */
  const picking = (ranked, olaRanked) => {
    let state = game(patrolling);
    const rich = {
      smallItemGathering: { practice: 160, ranks: {} },
    };
    for (const [id, has] of [
      [1, ranked],
      [2, olaRanked],
    ]) {
      if (has) {
        state = changing(state, id, {
          skills: { ...state.team.characters[id - 1].skills, ...rich },
        });
        state = buyBranch(state, id, "patrol").state;
      }
    }
    state = send(state, { mapId: "forest", characterId: 2 }, T0).state;
    state = startLoop(state, FOREST, T0 + 1).state;
    const run = state.loops[1].run;
    const tiles = run.tiles.map((tile) =>
      tile.at.q === run.character.at.q && tile.at.r === run.character.at.r
        ? { ...tile, revealed: true, stock: { berry: 5 } }
        : tile,
    );
    state = changingRun(state, 1, { tiles });
    return advanceLoopRun(state, 1, 1).state.loops[1].run.current.activity;
  };
  assert.equal(picking(true, false).action?.kind, "patrol");
  assert.deepEqual(picking(false, true), { kind: "wait" });
  assert.deepEqual(picking(false, false), { kind: "wait" });
});

test("a map run of a loop is passed minute by minute as in one go, and stops at its end with the minute of the end counted", () => {
  const state = looping(EMPTY, {}, COLD_REAL_MS);
  const oneGo = advanceLoopRun(state, 1, 5000);
  assert.equal(oneGo.passed, COLD_DEATH_MINUTE);
  assert.deepEqual(oneGo.state.loops[1].run.death, {
    minute: COLD_DEATH_MINUTE,
    cause: "cold",
  });
  assert.equal(oneGo.state.loops[1].run.minute, COLD_DEATH_MINUTE);
  const split = advanceLoopRun(advanceLoopRun(state, 1, 100).state, 1, 5000);
  assert.equal(split.passed, COLD_DEATH_MINUTE - 100);
  assert.deepEqual(split.state, oneGo.state);
  // Fewer minutes than the map run lasts: exactly those.
  const part = advanceLoopRun(state, 1, 60);
  assert.equal(part.passed, 60);
  assert.equal(part.state.loops[1].run.minute, 60);
  assert.deepEqual(part.events, []);
});

// invariant: death-settled-once
// D-221: the function that passes game time leaves the end as it found it and takes no moment.
test("passing the minutes of a death leaves it unsettled: the character, the chest and the loop stand as they did", () => {
  const state = looping(EMPTY, { stick: 3 }, COLD_REAL_MS);
  const after = advanceLoopRun(state, 1, 5000).state;
  assert.deepEqual(after.team, state.team);
  assert.equal(after.loops[1].runNumber, 1);
  assert.equal(after.loops[1].completed, 0);
  assert.deepEqual(after.loops[1].practice, state.loops[1].practice);
  assert.equal(after.lastSeed, state.lastSeed);
});

test("passing the minute of a completion deposits nothing, pays nothing and counts nothing, and a further pass changes nothing", () => {
  const state = oneShort(
    looping(withTrip(EMPTY, [], [entry("stick", 2)]), {}),
    { stick: 3 },
    { smallItemGathering: 9 },
  );
  const done = advanceLoopRun(state, 1, 5);
  assert.equal(done.passed, 1);
  assert.deepEqual(done.state.loops[1].run.completion, { minute: 1 });
  assert.deepEqual(done.state.team, state.team);
  assert.equal(done.state.loops[1].completed, 0);
  assert.deepEqual(done.state.solvedMaps, ["forest"]);
  const again = advanceLoopRun(done.state, 1, 5);
  assert.equal(again.state, done.state);
  assert.equal(again.passed, 0);
});

test("passing no minutes, or minutes of a character with no loop, returns the very state", () => {
  const state = looping();
  assert.equal(
    advanceLoopRun(state, 1, 1).passed,
    1,
    "the control: a minute passes",
  );
  assert.equal(advanceLoopRun(state, 1, 0).state, state);
  assert.equal(advanceLoopRun(state, 1, 0).passed, 0);
  assert.equal(advanceLoopRun(state, 2, 10).state, state);
  assert.equal(advanceLoopRun(state, 2, 10).passed, 0);
  assert.equal(advanceLoopRun(state, 99, 10).state, state);
});

test("minutes that are no whole number from 0 up are a RangeError", () => {
  const state = looping();
  for (const minutes of [-1, 1.5, NaN, Infinity, "3", undefined, null]) {
    assert.throws(() => advanceLoopRun(state, 1, minutes), RangeError);
  }
});

// invariant: trip-transfer
// invariant: trip-run-end
// To do 4 and 6, spec 4, D-179: loot goes to the chest at completion by the frozen bring list, the
// next map run takes from the chest as it then stands, on the same copy and at game minute 0.
test("a completion deposits the bring list's clipped loot, counts the map run, adds its practice to the loop and starts the next map run in the same step", () => {
  const program = withTrip(
    EMPTY,
    [entry("stick", 3)],
    [entry("stick", 2), entry("berry", 5)],
  );
  const started = looping(program, { stick: 5 });
  assert.deepEqual(started.team.chest.pieces, { stick: 2 });
  const ready = holding(
    oneShort(started, { berry: 2 }, { smallItemGathering: 9 }),
    { smallItemGathering: 40 },
  );
  const skillsBefore = ala(ready).skills;
  const passed = advanceLoopRun(ready, 1, 1).state;
  const result = endLoopRun(passed, 1, T0);
  const after = result.state;
  const loop = after.loops[1];
  assert.deepEqual(result.events, [{ kind: "loopRunEnded", characterId: 1 }]);
  // Bring: 2 of the 3 sticks the backpack holds, then 2 of the 5 berries it holds (it holds 2).
  // The chest was {stick 2}: it holds {stick 4, berry 2}; the next map run takes 3 sticks of it.
  assert.deepEqual(after.team.chest.pieces, { stick: 1, berry: 2 });
  assert.equal(loop.run.character.backpack.stick, 3);
  assert.equal(loop.run.character.backpack.berry, 0);
  assert.equal(loop.completed, 1);
  assert.equal(loop.runNumber, 2);
  // 40 gathered by the loop, then the map run's 9 and the one exploration of its last minute.
  assert.deepEqual(loop.practice, { smallItemGathering: 49, exploration: 1 });
  assert.equal(loop.run.minute, 0);
  assert.equal(loop.run.completion, null);
  assert.equal(loop.run.seed, nextSeed(passed.loops[1].run.seed));
  assert.deepEqual(loop.program, program);
  // Practice stays with the loop; the map is solved already and the first seed stays the last seed.
  assert.deepEqual(ala(after).skills, skillsBefore);
  assert.deepEqual(after.solvedMaps, ["forest"]);
  assert.equal(after.lastSeed, ready.lastSeed);
});

// invariant: trip-transfer
test("a completion deposits no more than the chest has room for", () => {
  const program = withTrip(EMPTY, [], [entry("stick", 2), entry("berry", 5)]);
  const ready = oneShort(looping(program, { moss: 59 }), {
    stick: 3,
    berry: 2,
  });
  const after = passedAndEnded(ready).state;
  assert.deepEqual(after.team.chest.pieces, { moss: 59, stick: 1 });
});

test("the seeds of the successive map runs of a loop follow the draw of the fifth generator, and the last seed is not touched after the start", () => {
  let state = looping(EMPTY, {}, COLD_REAL_MS);
  const start = state.lastSeed;
  let seed = state.loops[1].run.seed;
  for (let run = 2; run <= 4; run += 1) {
    state = oneShort(state);
    state = passedAndEnded(state, T0 + run).state;
    seed = nextSeed(seed);
    assert.equal(state.loops[1].run.seed, seed);
    assert.equal(state.loops[1].runNumber, run);
  }
  assert.equal(state.lastSeed, start);
});

// invariant: trip-run-end
// invariant: death-settled-once
// To do 6 and 7, Q16, D-190: a ready resurrection does not save the map run; it is used up, the map
// run pays nothing, what the loop gathered stays and the next map run starts at once.
test("a death with a resurrection ready is settled at the moment given: used up, nothing paid, the carried items gone, the loop going on at its next map run", () => {
  const ready = holding(
    changingRun(
      dyingNext(
        looping(withTrip(EMPTY, [entry("berry", 2)], [entry("berry", 2)]), {
          berry: 4,
        }),
      ),
      1,
      { practice: { smallItemGathering: 9 } },
    ),
    { smallItemGathering: 40, eating: 3 },
  );
  assert.deepEqual(ready.team.chest.pieces, { berry: 2 });
  const passed = advanceLoopRun(ready, 1, 1).state;
  assert.ok(passed.loops[1].run.death, "precondition: the character died");
  const skillsBefore = ala(passed).skills;
  const result = endLoopRun(passed, 1, T0);
  const after = result.state;
  const loop = after.loops[1];
  assert.deepEqual(result.events, [{ kind: "loopRunEnded", characterId: 1 }]);
  assert.equal(ala(after).resurrectionReadyAtMs, T0 + RENEWAL_MS);
  assert.equal(ala(after).generation, 1);
  assert.deepEqual(ala(after).skills, skillsBefore);
  assert.deepEqual(loop.practice, { smallItemGathering: 40, eating: 3 });
  assert.equal(loop.completed, 0);
  assert.equal(loop.runNumber, 2);
  assert.equal(loop.run.minute, 0);
  assert.equal(loop.run.death, null);
  assert.equal(loop.run.seed, nextSeed(passed.loops[1].run.seed));
  // Nothing came back: the berries of the dead map run are gone and the next one took the last two.
  assert.deepEqual(after.team.chest.pieces, { berry: 0 });
  assert.equal(loop.run.character.backpack.berry, 2);
  assert.deepEqual(after.solvedMaps, ["forest"]);
});

// invariant: death-settled-once
// To do 7, Q13, D-190: without a resurrection the character loses its practice and ranks and the
// loop stops with what it gathered.
test("a death with no resurrection ready takes the character's skills, raises the generation, drops the loop with its practice and leaves the chest and the moment of readiness", () => {
  let state = looping(withTrip(EMPTY, [entry("berry", 2)], []), { berry: 4 });
  state = changing(state, 1, {
    resurrectionReadyAtMs: T0 + 1,
    skills: {
      ...ala(state).skills,
      smallItemGathering: { practice: 160, ranks: {} },
    },
  });
  state = bought(state);
  state = holding(dyingNext(state), { smallItemGathering: 40 });
  const passed = advanceLoopRun(state, 1, 1).state;
  const result = endLoopRun(passed, 1, T0);
  const after = result.state;
  assert.deepEqual(result.events, [{ kind: "loopRunEnded", characterId: 1 }]);
  assert.deepEqual(after.loops, {});
  assert.equal(ala(after).generation, 2);
  assert.equal(ala(after).resurrectionReadyAtMs, T0 + 1);
  assert.equal(ala(after).skills.smallItemGathering.practice, 0);
  assert.equal(branchRank(ala(after).skills, "patrol"), 0);
  assert.deepEqual(
    after.team.chest.pieces,
    { berry: 2 },
    "the carried berries are not back",
  );
  assert.deepEqual(after.stoppedLoops, {});
  assert.deepEqual(after.awayReport, []);
  assert.equal(after.lastSeed, state.lastSeed);
});

/** Ala with the patrol branch bought, out of the practice her skills hold. */
function bought(state) {
  return buyBranch(state, 1, "patrol").state;
}

test("a death at the very moment of readiness uses the resurrection, and a millisecond before it takes everything", () => {
  const dead = (readyAt) =>
    advanceLoopRun(
      dyingNext(changing(looping(), 1, { resurrectionReadyAtMs: readyAt })),
      1,
      1,
    ).state;
  const at = endLoopRun(dead(T0), 1, T0).state;
  assert.equal(at.loops[1].runNumber, 2);
  assert.equal(ala(at).generation, 1);
  const before = endLoopRun(dead(T0 + 1), 1, T0).state;
  assert.deepEqual(before.loops, {});
  assert.equal(ala(before).generation, 2);
});

// invariant: death-settled-once
// Spec 4: the end is consumed in the call that met it; no state leaves with a loop's run ended.
test("a death is settled once: the state the end leaves holds no end, a further end changes nothing, and a load of it settles nothing", () => {
  const passed = advanceLoopRun(dyingNext(looping()), 1, 1).state;
  const settled = endLoopRun(passed, 1, T0);
  assert.equal(settled.state.loops[1].run.death, null);
  const again = endLoopRun(settled.state, 1, T0 + 5);
  assert.equal(again.state, settled.state);
  assert.deepEqual(again.events, []);
  const loaded = loadSavedGame(savedGame(withSaveTime(settled.state, T0)));
  assert.equal(loaded.ok, true);
  assert.deepEqual(loaded.state, withSaveTime(settled.state, T0));
  // The state before the end holds a death unsettled, and a load refuses it whole.
  const refused = loadSavedGame(savedGame(withSaveTime(passed, T0)));
  assert.deepEqual(refused, { ok: false, reason: "shape" });
});

test("taking an end reads the moment only when there is an end to settle, and the moment must be a safe integer", () => {
  const running = looping();
  assert.equal(endLoopRun(running, 1, NaN).state, running);
  assert.equal(endLoopRun(running, 2, NaN).state, running);
  const dead = advanceLoopRun(dyingNext(running), 1, 1).state;
  for (const moment of [NaN, Infinity, 1.5, "1", undefined, 2 ** 53]) {
    assert.throws(() => endLoopRun(dead, 1, moment), RangeError);
  }
  const completed = advanceLoopRun(oneShort(running), 1, 1).state;
  assert.throws(() => endLoopRun(completed, 1, NaN), RangeError);
});

// invariant: trip-run-end
// To do 8, Q5, D-245, D-183; loop `sim.test.ts:1630`-`1665`: the practice of the loop and of the map
// run going on are paid, the loot of that map run stays out.
test("stopping a loop pays the loop's practice and the map run's into the skills, records the sum, drops the loop and deposits nothing", () => {
  const program = withTrip(EMPTY, [], [entry("stick", 3)]);
  let state = holding(looping(program, { berry: 1 }), {
    smallItemGathering: 40,
    exploration: 2,
  });
  state = changingRun(state, 1, {
    practice: { smallItemGathering: 5, eating: 1 },
    character: {
      ...state.loops[1].run.character,
      backpack: { ...state.loops[1].run.character.backpack, stick: 3 },
    },
  });
  const before = ala(state).skills;
  const result = stopLoop(state, 1);
  const after = result.state;
  assert.deepEqual(result.events, []);
  assert.deepEqual(after.loops, {});
  assert.deepEqual(after.stoppedLoops, {
    1: { smallItemGathering: 45, exploration: 2, eating: 1 },
  });
  const skills = ala(after).skills;
  assert.equal(
    skills.smallItemGathering.practice,
    before.smallItemGathering.practice + 45,
  );
  assert.equal(skills.exploration.practice, before.exploration.practice + 2);
  assert.equal(skills.eating.practice, before.eating.practice + 1);
  assert.deepEqual(after.team.chest, state.team.chest);
  assert.equal(after.lastSeed, state.lastSeed);
});

test("stopping a loop that gathered nothing writes an empty sum, and stopping a loop of one character leaves another's", () => {
  const state = startLoop(
    looping(),
    { mapId: "forest", characterId: 2 },
    T0 + 1,
  ).state;
  const stopped = stopLoop(state, 1).state;
  assert.deepEqual(stopped.stoppedLoops, { 1: {} });
  assert.deepEqual(Object.keys(stopped.loops), ["2"]);
  assert.equal(stopped.loops[2], state.loops[2]);
  assert.deepEqual(ala(stopped).skills, ala(state).skills);
});

test("stopping a loop whose map run ended in death pays only the loop's own practice, and a character with no loop leaves the very state", () => {
  const state = holding(
    changingRun(dyingNext(looping()), 1, { practice: { eating: 7 } }),
    { smallItemGathering: 40 },
  );
  const dead = advanceLoopRun(state, 1, 1).state;
  const stopped = stopLoop(dead, 1).state;
  assert.deepEqual(stopped.stoppedLoops, { 1: { smallItemGathering: 40 } });
  assert.equal(
    ala(stopped).skills.eating.practice,
    ala(dead).skills.eating.practice,
  );
  assert.equal(stopLoop(stopped, 1).state, stopped);
  assert.equal(stopLoop(stopped, 2).state, stopped);
});

test("a send throws for a character in a loop, and clears the stopped line of the character it sends and no other", () => {
  const state = looping();
  assert.throws(() => send(state, FOREST, T0));
  // Ola is not in a loop: her send goes, and Ala's loop stays.
  const sent = send(state, { mapId: "forest", characterId: 2 }, T0).state;
  assert.deepEqual(Object.keys(sent.loops), ["1"]);
  const lines = {
    ...game(),
    stoppedLoops: { 1: { exploration: 1 }, 2: { eating: 2 } },
  };
  assert.deepEqual(send(lines, FOREST, T0).state.stoppedLoops, {
    2: { eating: 2 },
  });
});

// Spec 4, 15 and the plan's *Goal*: a state the simulation makes with a loop loads back at every
// minute of a map run, the stopped state included. This slice does not change the trust boundary,
// so a refusal here is a structural mismatch.
test("every state a loop makes over a whole map run, an end and the next map run loads back, with the save time it was stamped with", () => {
  let state = looping(SURVIVING, { stick: 4, berry: 2 }, COLD_REAL_MS);
  let loaded = 0;
  assert.ok(state.loops[1], "precondition: the loop stands");
  for (let minute = 0; minute < 520; minute += 1) {
    const stamped = withSaveTime(state, T0 + minute);
    const result = loadSavedGame(
      JSON.parse(JSON.stringify(savedGame(stamped))),
    );
    assert.equal(result.ok, true, `minute ${String(minute)}`);
    assert.deepEqual(result.state, stamped);
    loaded += 1;
    state = advanceLoopRun(state, 1, 1).state;
  }
  assert.equal(loaded, 520);
});

test("the states of a loop through a death, its settling and the next map run, and of a stopped loop, load back", () => {
  let state = looping(EMPTY, { stick: 4 }, COLD_REAL_MS);
  assert.ok(state.loops[1], "precondition: the loop stands");
  const check = (name, given) => {
    assert.ok(Object.keys(given.loops).length > 0 || name === "after the stop");
    const stamped = withSaveTime(given, T0);
    const result = loadSavedGame(
      JSON.parse(JSON.stringify(savedGame(stamped))),
    );
    assert.equal(result.ok, true, name);
    assert.deepEqual(result.state, stamped, name);
  };
  for (let minute = 0; minute < COLD_DEATH_MINUTE - 1; minute += 1) {
    state = advanceLoopRun(state, 1, 1).state;
    if (minute % 20 === 0) check(`minute ${String(minute)}`, state);
  }
  state = advanceLoopRun(state, 1, 5).state;
  state = endLoopRun(state, 1, T0).state;
  check("after the covered death", state);
  state = advanceLoopRun(state, 1, 40).state;
  check("in the next map run", state);
  check("after the stop", stopLoop(state, 1).state);
  const second = startLoop(
    state,
    { mapId: "forest", characterId: 2 },
    T0,
  ).state;
  check("two loops", second);
  check("one stopped, one going", stopLoop(second, 1).state);
});

test("a loop beside a manual map run of another character loads back", () => {
  const sent = send(game(), { mapId: "forest", characterId: 2 }, T0).state;
  const state = advanceMinutes(
    advanceLoopRun(startLoop(sent, FOREST, T0 + 1).state, 1, 30).state,
    30,
  ).state;
  const result = loadSavedGame(
    JSON.parse(JSON.stringify(savedGame(withSaveTime(state, T0)))),
  );
  assert.equal(result.ok, true);
  assert.deepEqual(Object.keys(result.state.loops), ["1"]);
  assert.equal(result.state.run.character.id, 2);
});

/** Freezes a value and everything it holds, so a write to it throws in strict code. */
function deepFreeze(value) {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const inner of Object.values(value)) deepFreeze(inner);
  }
  return value;
}

/** Calls `call` on frozen inputs and checks that they still equal a copy taken before the call. */
function assertPure(name, call, ...inputs) {
  const before = JSON.parse(JSON.stringify(inputs));
  for (const input of inputs) deepFreeze(input);
  try {
    call();
  } catch (error) {
    assert.ok(
      !(
        error instanceof TypeError &&
        /read only|frozen|not extensible/.test(error.message)
      ),
      `${name} wrote to a frozen input: ${error.message}`,
    );
  }
  assert.deepEqual(JSON.parse(JSON.stringify(inputs)), before, name);
}

// invariant: simulation-inputs
// The pool of `tests/invariants/test_simulation_inputs.py` holds no state with a loop, so the
// functions of the slice are given such states here, frozen.
test("no function of the loop changes a value passed to it, a loop, a death and a completion included", () => {
  const program = withTrip(EMPTY, [entry("stick", 2)], [entry("stick", 2)]);
  const fresh = game(program, { stick: 5 });
  const started = startLoop(fresh, FOREST, COLD_REAL_MS).state;
  const midway = advanceLoopRun(started, 1, 50).state;
  const completed = advanceLoopRun(
    oneShort(started, { stick: 3 }, { eating: 1 }),
    1,
    1,
  ).state;
  const dead = advanceLoopRun(dyingNext(started), 1, 1).state;
  const uncovered = changing(dead, 1, { resurrectionReadyAtMs: T0 + 1 });
  const states = { fresh, started, midway, completed, dead, uncovered };
  for (const [name, state] of Object.entries(states)) {
    for (const [label, call] of [
      [
        "startLoop",
        (given) => startLoop(given, { ...FOREST, characterId: 2 }, T0),
      ],
      ["stopLoop", (given) => stopLoop(given, 1)],
      ["advanceLoopRun", (given) => advanceLoopRun(given, 1, 30)],
      ["endLoopRun", (given) => endLoopRun(given, 1, T0)],
      ["send", (given) => send(given, FOREST, T0)],
    ]) {
      const given = structuredClone(state);
      assertPure(`${label} on ${name}`, () => call(given), given);
    }
  }
  const character = structuredClone(fresh.team.characters[0]);
  assertPure(
    "characterAfterDeath",
    () => characterAfterDeath(character, T0),
    character,
  );
  const knowing = structuredClone(started);
  assertPure(
    "programOf",
    () =>
      programOf(
        knowing,
        knowing.loops[1].program,
        1,
        knowing.loops[1].run.character.skills,
      ),
    knowing,
  );
});

// invariant: death-settled-once
// invariant: resurrection-renewal
test("what a death does to a character is one rule for a manual map run and a loop", () => {
  for (const readyAt of [0, T0, T0 + 1]) {
    const state = changing(game(), 1, { resurrectionReadyAtMs: readyAt });
    const died = ala(state);
    const viaFunction = characterAfterDeath(died, T0);
    assert.equal(viaFunction.resurrectionUsed, readyAt <= T0);
    const loopDead = advanceLoopRun(
      dyingNext(startLoop(state, FOREST, T0).state),
      1,
      1,
    ).state;
    const viaLoop = endLoopRun(loopDead, 1, T0).state;
    assert.deepEqual(ala(viaLoop), viaFunction.character);
  }
});
