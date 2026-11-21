// What the game remembers of a judging of a program, what stands of it beside the list „Program:”, what
// erases it, and the act of a judging that remembers (D-440, D-439). The expectations come from D-440
// (what is remembered, the mark, the note on the stock, what erases a judging), D-439 (a judging is no
// map run of the character and changes nothing of it), D-170 (the pick of the list „Program:” stays
// until a send), D-165 (a program is told by its number, so a deleted program's judgings name none), D-123
// (the rule the game writes at the first chill is a rule written into the listed program), D-190 (which
// deaths take a character's practice and ranks) and the invariant `simulation-inputs`. The data are
// written out by hand; a relation the code does not compute (an act of a judging gives what the judging
// gives) is stated as such.
import assert from "node:assert/strict";
import { test } from "node:test";
import {
  advanceMinutes,
  createCharacter,
  newGame,
  send,
  setProgram,
  settleDeath,
  withSaveTime,
} from "../../dist/browser/sim/game.js";
import {
  judgeAndRemember,
  judgeOnSeeds,
} from "../../dist/browser/sim/judging.js";
import {
  judgingMark,
  judgingsAfterDeath,
  judgingsAfterSave,
  judgingsWithoutCharacter,
  judgingsWithoutProgram,
  markOfRecord,
  recordOfJudging,
  rememberedOf,
  withRememberedJudging,
} from "../../dist/browser/sim/judging-record.js";
import {
  advanceLoopRun,
  catchUp,
  endLoopRun,
  startLoop,
} from "../../dist/browser/sim/loop.js";
import {
  createProgram,
  deleteProgram,
  editProgram,
  renameProgram,
  saveCopyAsNewProgram,
  saveCopyIntoProgram,
} from "../../dist/browser/sim/programs.js";
import { loadSavedGame, savedGame } from "../../dist/browser/sim/saved-game.js";
import { buyBranch } from "../../dist/browser/sim/skills.js";
import { programFromRules } from "./program-fixture.mjs";
import { newKnowingGame, withEdgeSolved } from "./understanding-fixture.mjs";

/** A real moment of the browser's clock, in ms. */
const T0 = 1_760_000_000_000;
/** One real minute in ms. */
const MIN = 60_000;
/**
 * The start at this real moment seeds a map run on which the empty program dies in game minute 243, of cold
 * (`tests/sim/catch-up.test.mjs`, `tests/sim/acceptance.test.mjs`).
 */
const S = 1_760_000_800_000;
const COLD_DEATH_MINUTE = 243;
/** One game minute from a death of cold: chilled, with health the next minute takes away. */
const DYING = { temperature: 30, satiety: 100, health: 0.1 };

const entry = (item, count) => ({ item, count });
const rule = (kind) => ({
  condition: { kind: "always" },
  action: { kind },
});
const ids = (characterId, programId, mapId) => ({
  characterId,
  programId,
  mapId,
});

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

/** The kinds of a judging that solved `solved` of the twelve seeds and died on the rest. */
const kindsOf = (solved) => [
  ...Array(solved).fill("solved"),
  ...Array(12 - solved).fill("death"),
];
/** A judging as the game state remembers it, that solved `solved` seeds, taken with `equipment`. */
const remembered = (solved, equipment = []) => ({
  results: kindsOf(solved),
  equipment,
});

const A = remembered(12, [entry("berry", 4)]);
const B = remembered(11);
const C = remembered(0);
const D = remembered(12, [entry("stick", 2)]);
const E = remembered(3);

/**
 * The judgings of a game with two characters and two programs: character 1 on program 1 has judged two
 * maps and on program 2 one; character 2 has one on program 1 and one on program 2.
 */
function judgings() {
  return {
    1: { 1: { forestEdge: A, forest: B }, 2: { forest: C } },
    2: { 1: { forest: D }, 2: { forestEdge: E } },
  };
}

const PROGRAM_ONE_GONE = {
  1: { 2: { forest: C } },
  2: { 2: { forestEdge: E } },
};

/**
 * A knowing game with Ala (1) and Ola (2) in the team, two programs, Skraj lasu solved, the first program
 * holding `program` and `held` standing as the remembered judgings.
 */
function game(program = programFromRules(), held = judgings()) {
  let state = createCharacter(newKnowingGame(), "Ala").state;
  state = createCharacter(state, "Ola").state;
  state = createProgram(state).state;
  state = editProgram(state, 1, program).state;
  return { ...state, solvedMaps: ["forestEdge"], judgings: held };
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

/** `state` with one practice in each skill of the character `id`: the practice a death with no use left takes. */
function practised(state, id = 1) {
  const [character] = state.team.characters.filter(
    (listed) => listed.id === id,
  );
  return changing(state, id, {
    skills: Object.fromEntries(
      Object.entries(character.skills).map(([skill, held]) => [
        skill,
        { ...held, practice: held.practice + 1 },
      ]),
    ),
  });
}

/** `state` with all three uses of the resurrection spent, the next returning far after every moment below. */
const usedUp = (state) => ({
  ...state,
  team: {
    ...state.team,
    resurrectionUsesSpent: 3,
    resurrectionNextReturnAtMs: S + 10 ** 9,
  },
});

/** A state loads back from its saved document, stamped with the moment given. */
function assertLoadsBack(state, label) {
  const stamped = withSaveTime(state, S);
  const loaded = loadSavedGame(JSON.parse(JSON.stringify(savedGame(stamped))));
  assert.equal(loaded.ok, true, `${label} loads back`);
  assert.deepEqual(loaded.state, stamped, label);
}

// ---------------------------------------------------------------------------------------------------
// The remembered judging and its mark

test("a judging is remembered as the kind of each of the twelve results and the equipment it took, the cause and the game minute left out", () => {
  // decision: D-440 "The game remembers the last judging of each character, program and map in the browser that made it, as D-441 gives: the twelve results of its seeds — solved, a death or undecided — and the equipment it took from what the chest held, while the cause and the game minute of a line stand only in the result shown after the judging (D-329)."
  const judging = {
    results: [
      { kind: "solved" },
      { kind: "death", cause: "cold", minute: 243 },
      { kind: "undecided" },
      { kind: "death", cause: "combat", minute: 17 },
      { kind: "solved" },
      { kind: "death", cause: "hunger", minute: 900 },
      { kind: "undecided" },
      { kind: "solved" },
      { kind: "death", cause: "cold", minute: 1 },
      { kind: "undecided" },
      { kind: "solved" },
      { kind: "death", cause: "cold", minute: 4000 },
    ],
    equipment: [entry("berry", 4), entry("stick", 2)],
  };
  const taken = rememberedOf(frozen(judging));
  assert.deepEqual(taken, {
    results: [
      "solved",
      "death",
      "undecided",
      "death",
      "solved",
      "death",
      "undecided",
      "solved",
      "death",
      "undecided",
      "solved",
      "death",
    ],
    equipment: [entry("berry", 4), entry("stick", 2)],
  });
});

test("a judging replaces the one remembered for its character, program and map, and no other", () => {
  // decision: D-440 "A judging, the one „Puść w pętlę” runs included (D-243), replaces the judging remembered for its character, program and map."
  const judging = {
    results: Array(12).fill({ kind: "solved" }),
    equipment: [entry("berry", 1)],
  };
  const replaced = withRememberedJudging(
    frozen(judgings()),
    ids(1, 1, "forest"),
    judging,
  );
  assert.deepEqual(replaced, {
    1: {
      1: {
        forestEdge: A,
        forest: { results: kindsOf(12), equipment: [entry("berry", 1)] },
      },
      2: { forest: C },
    },
    2: { 1: { forest: D }, 2: { forestEdge: E } },
  });
  const added = withRememberedJudging(
    frozen(judgings()),
    ids(1, 2, "forestEdge"),
    judging,
  );
  assert.deepEqual(added[1][2], {
    forest: C,
    forestEdge: { results: kindsOf(12), equipment: [entry("berry", 1)] },
  });
  assert.deepEqual(withRememberedJudging({}, ids(2, 7, "forest"), judging), {
    2: { 7: { forest: rememberedOf(judging) } },
  });
});

test("the mark of a program at a character on a map is the count solved, whether all twelve, and the badge only for twelve with the stock still there", () => {
  // decision: D-440 "Beside the list „Program:” of a character in „Kto idzie” stands the judging remembered for that character, the program the list shows and the map of the card: the badge „szczelny: 12 z 12” in `positive` where it solved all twelve seeds, and „{n} z 12” in `text` otherwise."
  const chest = { pieces: { berry: 4 } };
  const mark = (solved) =>
    judgingMark(
      { 1: { 1: { forest: remembered(solved, [entry("berry", 4)]) } } },
      ids(1, 1, "forest"),
      chest,
    );
  assert.deepEqual(mark(12), {
    solved: 12,
    allSolved: true,
    stockShort: false,
    badge: true,
  });
  assert.deepEqual(mark(11), {
    solved: 11,
    allSolved: false,
    stockShort: false,
    badge: false,
  });
  assert.deepEqual(mark(0), {
    solved: 0,
    allSolved: false,
    stockShort: false,
    badge: false,
  });
  // Undecided seeds and deaths are alike unsolved.
  const mixed = {
    1: {
      1: {
        forest: {
          results: [
            ...Array(7).fill("solved"),
            ...Array(3).fill("undecided"),
            ...Array(2).fill("death"),
          ],
          equipment: [],
        },
      },
    },
  };
  assert.equal(judgingMark(mixed, ids(1, 1, "forest"), chest).solved, 7);
});

test("the mark is of the triple asked for: another character, program or map has none", () => {
  // decision: D-440 "Beside the list „Program:” of a character in „Kto idzie” stands the judging remembered for that character, the program the list shows and the map of the card: the badge „szczelny: 12 z 12” in `positive` where it solved all twelve seeds, and „{n} z 12” in `text` otherwise."
  const held = frozen({ 1: { 1: { forest: remembered(12) } } });
  const chest = { pieces: {} };
  assert.notEqual(judgingMark(held, ids(1, 1, "forest"), chest), null);
  assert.equal(judgingMark({}, ids(1, 1, "forest"), chest), null);
  assert.equal(judgingMark(held, ids(2, 1, "forest"), chest), null);
  assert.equal(judgingMark(held, ids(1, 2, "forest"), chest), null);
  assert.equal(judgingMark(held, ids(1, 1, "forestEdge"), chest), null);
});

test("where the chest holds less of an item than the judging took the badge goes out and the count stays, and where it holds more nothing changes", () => {
  // decision: D-440 "Where the chest holds less of an item than the judging took, the result stays with „oceniono z zapasem, którego dziś nie ma w skrzynce” beside it and the badge goes out, „12 z 12” standing in its place."
  const held = frozen({
    1: {
      1: {
        forest: remembered(12, [entry("berry", 4), entry("stick", 2)]),
        forestEdge: remembered(11, [entry("berry", 4)]),
      },
    },
  });
  const at = (mapId, pieces) => judgingMark(held, ids(1, 1, mapId), { pieces });
  // Exactly what the judging took, and more of each.
  for (const pieces of [
    { berry: 4, stick: 2 },
    { berry: 40, stick: 2 },
    { berry: 4, stick: 9, moss: 1 },
  ])
    assert.deepEqual(at("forest", pieces), {
      solved: 12,
      allSolved: true,
      stockShort: false,
      badge: true,
    });
  // One item below the count, whichever it is, an item the chest lacks altogether and an empty chest.
  for (const pieces of [
    { berry: 3, stick: 2 },
    { berry: 4, stick: 1 },
    { berry: 4 },
    { stick: 2 },
    {},
  ])
    assert.deepEqual(
      at("forest", pieces),
      { solved: 12, allSolved: true, stockShort: true, badge: false },
      JSON.stringify(pieces),
    );
  // The count and the note stand at a result below twelve too.
  assert.deepEqual(at("forestEdge", { berry: 3 }), {
    solved: 11,
    allSolved: false,
    stockShort: true,
    badge: false,
  });
  // A judging that took nothing is never short.
  const bare = { 1: { 1: { forest: remembered(12) } } };
  assert.equal(
    judgingMark(bare, ids(1, 1, "forest"), { pieces: {} }).badge,
    true,
  );
});

// ---------------------------------------------------------------------------------------------------
// What erases a remembered judging: the pure functions

test("the judgings of a program are removed from every character and map, those of the others stay and no empty level is left", () => {
  // decision: D-165 "Each program of the player carries a number the game gives it when the program is created, one more than the number the game state gave last, so the numbers of two programs of one game differ, a deleted program's number included."
  assert.deepEqual(
    judgingsWithoutProgram(frozen(judgings()), 1),
    PROGRAM_ONE_GONE,
  );
  assert.deepEqual(judgingsWithoutProgram(frozen(judgings()), 2), {
    1: { 1: { forestEdge: A, forest: B } },
    2: { 1: { forest: D } },
  });
  assert.deepEqual(judgingsWithoutProgram(frozen(judgings()), 9), judgings());
  assert.deepEqual(judgingsWithoutProgram({}, 1), {});
  assert.deepEqual(judgingsWithoutProgram({ 1: { 1: { forest: A } } }, 1), {});
});

test("the judgings of a character are removed on every map, those of the others stay", () => {
  // decision: D-440 "A change of the rules, the rule groups or the trip plan of a program erases the judgings remembered for it, and a death that takes a character's practice and bought ranks because no use of the resurrection is left (D-190) erases every judging remembered for that character, on every map."
  assert.deepEqual(judgingsWithoutCharacter(frozen(judgings()), 1), {
    2: { 1: { forest: D }, 2: { forestEdge: E } },
  });
  assert.deepEqual(judgingsWithoutCharacter(frozen(judgings()), 2), {
    1: { 1: { forestEdge: A, forest: B }, 2: { forest: C } },
  });
  assert.deepEqual(judgingsWithoutCharacter(frozen(judgings()), 9), judgings());
});

/** A program of two rule groups, `names` in that order, the first holding `rules`. */
function twoGroups(names, rules = [rule("explore")]) {
  const groups = names.map((name, index) => ({
    id: index + 1,
    name,
    condition: { kind: "always" },
    rules: index === 0 ? rules.map((one, at) => ({ ...one, id: at + 1 })) : [],
  }));
  return {
    groups,
    tripPlan: { take: [], bring: [] },
    nextGroupId: 3,
    nextRuleId: rules.length + 1,
  };
}

test("a save that makes the rules, the groups with their order or the trip plan different erases the judgings of the program, and one that makes nothing different erases none", () => {
  // decision: D-440 "A change of the rules, the rule groups or the trip plan of a program erases the judgings remembered for it, and a death that takes a character's practice and bought ranks because no use of the resurrection is left (D-190) erases every judging remembered for that character, on every map."
  const before = twoGroups(["Jeden", "Dwa"], [rule("explore"), rule("wander")]);
  const withTake = (take) => ({ ...before, tripPlan: { take, bring: [] } });
  const changed = [
    [
      "a rule's action",
      twoGroups(["Jeden", "Dwa"], [rule("explore"), rule("kick")]),
    ],
    ["a rule removed", twoGroups(["Jeden", "Dwa"], [rule("explore")])],
    [
      "the order of two rules",
      twoGroups(["Jeden", "Dwa"], [rule("wander"), rule("explore")]),
    ],
    [
      "a rule's condition",
      {
        ...before,
        groups: [
          {
            ...before.groups[0],
            rules: [
              {
                ...before.groups[0].rules[0],
                condition: { kind: "temperatureBelow", value: 30 },
              },
              before.groups[0].rules[1],
            ],
          },
          before.groups[1],
        ],
      },
    ],
    [
      "the order of two groups",
      { ...before, groups: [before.groups[1], before.groups[0]] },
    ],
    [
      "a group's condition",
      {
        ...before,
        groups: [
          {
            ...before.groups[0],
            condition: { kind: "satietyBelow", value: 5 },
          },
          before.groups[1],
        ],
      },
    ],
    [
      "a group's name",
      twoGroups(["Inna", "Dwa"], [rule("explore"), rule("wander")]),
    ],
    ["a group removed", { ...before, groups: [before.groups[0]] }],
    ["the take list", withTake([entry("berry", 3)])],
    [
      "the bring list",
      { ...before, tripPlan: { take: [], bring: [entry("stick", 1)] } },
    ],
  ];
  for (const [what, after] of changed)
    assert.deepEqual(
      judgingsAfterSave(frozen(judgings()), 1, frozen(before), frozen(after)),
      PROGRAM_ONE_GONE,
      what,
    );
  // The order of a take list is part of the plan: it cuts the list in that order.
  const two = withTake([entry("berry", 3), entry("stick", 1)]);
  const swapped = withTake([entry("stick", 1), entry("berry", 3)]);
  assert.deepEqual(
    judgingsAfterSave(judgings(), 1, two, swapped),
    PROGRAM_ONE_GONE,
  );
  // The same program, whole or a copy of it, erases nothing.
  for (const after of [before, structuredClone(before)])
    assert.deepEqual(
      judgingsAfterSave(frozen(judgings()), 1, before, after),
      judgings(),
    );
  // Only the judgings of the program saved go.
  assert.deepEqual(judgingsAfterSave(judgings(), 2, before, changed[0][1]), {
    1: { 1: { forestEdge: A, forest: B } },
    2: { 1: { forest: D } },
  });
});

test("a death erases the judgings of its character only where no use of the resurrection was left", () => {
  // decision: D-440 "A change of the rules, the rule groups or the trip plan of a program erases the judgings remembered for it, and a death that takes a character's practice and bought ranks because no use of the resurrection is left (D-190) erases every judging remembered for that character, on every map."
  assert.deepEqual(
    judgingsAfterDeath(frozen(judgings()), 1, {
      kind: "progressLost",
      generation: 2,
    }),
    { 2: { 1: { forest: D }, 2: { forestEdge: E } } },
  );
  for (const settlement of [
    { kind: "resurrectionUsed", usesSpent: 1 },
    { kind: "noPractice" },
  ])
    assert.deepEqual(
      judgingsAfterDeath(frozen(judgings()), 1, settlement),
      judgings(),
      settlement.kind,
    );
});

// ---------------------------------------------------------------------------------------------------
// What erases a remembered judging: where the simulation changes a program of the list

test("an edit of a program of the list that makes its rules, groups or trip plan different erases its judgings, wherever they were made, and an edit that changes nothing erases none", () => {
  // decision: D-440 "A change of the rules, the rule groups or the trip plan of a program erases the judgings remembered for it, and a death that takes a character's practice and bought ranks because no use of the resurrection is left (D-190) erases every judging remembered for that character, on every map."
  const state = game(twoGroups(["Jeden", "Dwa"]));
  const program = state.programs[0].program;
  for (const [what, edited] of [
    [
      "a rule added",
      twoGroups(["Jeden", "Dwa"], [rule("explore"), rule("wander")]),
    ],
    [
      "the groups in another order",
      { ...program, groups: [program.groups[1], program.groups[0]] },
    ],
    [
      "a take list",
      { ...program, tripPlan: { take: [entry("berry", 2)], bring: [] } },
    ],
  ]) {
    assert.deepEqual(
      editProgram(frozen(state), 1, edited).state.judgings,
      PROGRAM_ONE_GONE,
      what,
    );
  }
  // Editing the program to what it is, a rename and an edit of another program leave them.
  assert.deepEqual(editProgram(state, 1, program).state.judgings, judgings());
  assert.deepEqual(
    renameProgram(state, 1, "Inna nazwa").state.judgings,
    judgings(),
  );
  assert.deepEqual(editProgram(state, 2, twoGroups(["Trzy"])).state.judgings, {
    1: { 1: { forestEdge: A, forest: B } },
    2: { 1: { forest: D } },
  });
});

test("the program a character with no pick goes with, set by setProgram outside a map run, loses its judgings when its content changes", () => {
  // decision: D-440 "A change of the rules, the rule groups or the trip plan of a program erases the judgings remembered for it, and a death that takes a character's practice and bought ranks because no use of the resurrection is left (D-190) erases every judging remembered for that character, on every map."
  const state = game();
  const changed = setProgram(state, programFromRules(rule("wander"))).state;
  assert.equal(changed.programs[0].program.groups[0].rules.length, 1);
  assert.deepEqual(changed.judgings, PROGRAM_ONE_GONE);
  assert.deepEqual(
    setProgram(state, state.programs[0].program).state.judgings,
    judgings(),
  );
  // With the lastEnteredProgram the program setProgram writes into is program 2: its judgings go instead.
  const second = setProgram(
    { ...state, lastEnteredProgram: 2 },
    programFromRules(rule("wander")),
  ).state;
  assert.deepEqual(second.judgings, {
    1: { 1: { forestEdge: A, forest: B } },
    2: { 1: { forest: D } },
  });
});

test("the copy of a map run holds changes the judgings do not see until they are saved into the program, and a copy saved as a new program changes no judging", () => {
  // decision: D-440 "A change of the rules, the rule groups or the trip plan of a program erases the judgings remembered for it, and a death that takes a character's practice and bought ranks because no use of the resurrection is left (D-190) erases every judging remembered for that character, on every map."
  const running = send(
    game(),
    { mapId: "forestEdge", characterId: 1 },
    T0,
  ).state;
  const edited = setProgram(running, programFromRules(rule("wander"))).state;
  assert.deepEqual(edited.judgings, judgings());
  const asNew = saveCopyAsNewProgram(edited, "Wariant").state;
  assert.deepEqual(asNew.judgings, judgings());
  const saved = saveCopyIntoProgram(edited).state;
  assert.deepEqual(saved.programs[0].program, edited.run.copy.program);
  assert.deepEqual(saved.judgings, PROGRAM_ONE_GONE);
});

test("deleting a program removes its judgings, so the saved game loads back, and a rename removes none", () => {
  // decision: D-165 "Each program of the player carries a number the game gives it when the program is created, one more than the number the game state gave last, so the numbers of two programs of one game differ, a deleted program's number included."
  const state = game();
  const deleted = deleteProgram(frozen(state), 2).state;
  assert.deepEqual(deleted.judgings, {
    1: { 1: { forestEdge: A, forest: B } },
    2: { 1: { forest: D } },
  });
  assertLoadsBack(deleted, "after deleting a program");
  assertLoadsBack(renameProgram(state, 2, "Inna").state, "after a rename");
  assert.deepEqual(renameProgram(state, 2, "Inna").state.judgings, judgings());
  // The first program, deleted while a second stands.
  assert.deepEqual(deleteProgram(state, 1).state.judgings, PROGRAM_ONE_GONE);
});

test("the rule the game writes at the first chill into the listed program erases its judgings, and where the program already holds an exploring rule nothing is written and nothing erased", () => {
  // decision: D-123 "A program rule the game writes at a discovery goes into the first rule group of the copy the map run carries out and into the first rule group of the program the copy belongs to"
  // decision: D-440 "A change of the rules, the rule groups or the trip plan of a program erases the judgings remembered for it, and a death that takes a character's practice and bought ranks because no use of the resurrection is left (D-190) erases every judging remembered for that character, on every map."
  // A new game holds one empty group; its first chill is game minute 84 (`tests/sim/discovery.test.mjs`).
  const fresh = (program) => {
    let state = withEdgeSolved(newGame());
    state = createProgram(state).state;
    if (program) state = setProgram(state, program).state;
    state = createCharacter(state, "Ala").state;
    state = {
      ...state,
      judgings: { 1: { 1: { forestEdge: A }, 2: { forestEdge: B } } },
    };
    return send(state, { mapId: "forest", characterId: 1 }, T0).state;
  };
  const empty = fresh();
  const before = advanceMinutes(empty, 83).state;
  assert.deepEqual(before.judgings, empty.judgings);
  const chilled = advanceMinutes(before, 1).state;
  assert.equal(chilled.programs[0].program.groups[0].rules.length, 1);
  assert.deepEqual(chilled.judgings, { 1: { 2: { forestEdge: B } } });
  const exploring = fresh(programFromRules(rule("explore")));
  const rested = advanceMinutes(exploring, 84).state;
  assert.equal(rested.programs[0].program.groups[0].rules.length, 1);
  assert.deepEqual(rested.judgings, exploring.judgings);
});

// ---------------------------------------------------------------------------------------------------
// What erases a remembered judging: the deaths

/** Ala sent to Las from `state` and moved on until she dies; the death stands unsettled. */
function died(state) {
  const fallen = advanceMinutes(
    send(state, { mapId: "forest", characterId: 1 }, T0).state,
    1000,
  ).state;
  assert.ok(fallen.run.death, "precondition: the character died");
  return fallen;
}

/** `state` with the map run of the earning loop of Ala one game minute from a death of cold, passed to it and ended. */
function loopDied(state, nowMs = T0) {
  const started = startLoop(
    state,
    { mapId: "forest", characterId: 1 },
    S,
  ).state;
  const loop = started.loops[1];
  const dying = {
    ...started,
    loops: {
      ...started.loops,
      1: { ...loop, run: { ...loop.run, body: { ...DYING } } },
    },
  };
  const passed = advanceLoopRun(dying, 1, 1).state;
  assert.ok(passed.loops[1].run.death, "precondition: the character died");
  return endLoopRun(passed, 1, nowMs).state;
}

const GONE_FOR_ALA = { 2: { 1: { forest: D }, 2: { forestEdge: E } } };

test("a death in a manual map run that takes the practice and the ranks erases every judging of the character, on every map, and no other character's", () => {
  // decision: D-440 "A change of the rules, the rule groups or the trip plan of a program erases the judgings remembered for it, and a death that takes a character's practice and bought ranks because no use of the resurrection is left (D-190) erases every judging remembered for that character, on every map."
  const lost = settleDeath(died(usedUp(practised(game()))), T0).state;
  assert.equal(lost.run.deathSettlement.kind, "progressLost");
  assert.deepEqual(lost.judgings, GONE_FOR_ALA);
  assertLoadsBack(lost, "after the death that took the practice");
  // A second settling of that death leaves the game as it stood.
  assert.deepEqual(settleDeath(lost, T0 + 1).state, lost);
});

test("a death covered by a use of the resurrection, one of a character with no practice and the purchase of a rank erase no judging", () => {
  // decision: D-190 "The death of a character with practice uses up one use while any is left, and a death of a character with practice with none left stops its earning loop"
  // decision: D-440 "A change of the rules, the rule groups or the trip plan of a program erases the judgings remembered for it, and a death that takes a character's practice and bought ranks because no use of the resurrection is left (D-190) erases every judging remembered for that character, on every map."
  const covered = settleDeath(died(practised(game())), T0).state;
  assert.equal(covered.run.deathSettlement.kind, "resurrectionUsed");
  assert.deepEqual(covered.judgings, judgings());
  const bare = settleDeath(died(usedUp(game())), T0).state;
  assert.equal(bare.run.deathSettlement.kind, "noPractice");
  assert.deepEqual(bare.judgings, judgings());
  // „Obchód” bought out of 160 practice in gathering small items.
  const rich = changing(game(), 1, {
    skills: {
      ...game().team.characters[0].skills,
      smallItemGathering: { practice: 160, ranks: {} },
      eating: { practice: 20, ranks: {} },
    },
  });
  const bought = buyBranch(rich, 1, "patrol").state;
  assert.notDeepEqual(
    bought.team,
    rich.team,
    "precondition: a rank was bought",
  );
  assert.deepEqual(bought.judgings, judgings());
});

test("a death in an earning loop that takes the practice and the ranks erases every judging of the character, and one that leaves the earning loop going erases none", () => {
  // decision: D-190 "The death of a character with practice uses up one use while any is left, and a death of a character with practice with none left stops its earning loop"
  // decision: D-440 "A change of the rules, the rule groups or the trip plan of a program erases the judgings remembered for it, and a death that takes a character's practice and bought ranks because no use of the resurrection is left (D-190) erases every judging remembered for that character, on every map."
  const base = (state) => ({ ...state, solvedMaps: ["forestEdge", "forest"] });
  const lost = loopDied(usedUp(practised(base(game()))));
  assert.equal(lost.loops[1], undefined, "the earning loop stopped");
  assert.deepEqual(lost.judgings, GONE_FOR_ALA);
  assertLoadsBack(
    lost,
    "after the earning loop's death that took the practice",
  );
  const covered = loopDied(practised(base(game())));
  assert.ok(covered.loops[1], "the earning loop goes on");
  assert.equal(covered.team.resurrectionUsesSpent, 1);
  assert.deepEqual(covered.judgings, judgings());
  const bare = loopDied(usedUp(base(game())));
  assert.ok(bare.loops[1], "the earning loop goes on");
  assert.equal(bare.team.resurrectionUsesSpent, 3);
  assert.deepEqual(bare.judgings, judgings());
});

test("the same death in the catch-up erases the judgings as in the open game, and one covered erases none", () => {
  // decision: D-440 "A change of the rules, the rule groups or the trip plan of a program erases the judgings remembered for it, and a death that takes a character's practice and bought ranks because no use of the resurrection is left (D-190) erases every judging remembered for that character, on every map."
  const looping = (state) =>
    withSaveTime(
      startLoop(
        { ...state, solvedMaps: ["forestEdge", "forest"] },
        { mapId: "forest", characterId: 1 },
        S,
      ).state,
      S,
    );
  const reading = S + 300 * MIN + 17_000;
  assert.ok(COLD_DEATH_MINUTE < 300);
  const lost = catchUp(looping(usedUp(practised(game()))), reading).state;
  assert.equal(lost.loops[1], undefined, "the earning loop stopped");
  assert.equal(lost.team.characters[0].generation, 2);
  assert.deepEqual(lost.judgings, GONE_FOR_ALA);
  const covered = catchUp(looping(practised(game())), reading).state;
  assert.equal(covered.team.resurrectionUsesSpent, 1, "the use was spent");
  assert.ok(covered.loops[1]);
  assert.deepEqual(covered.judgings, judgings());
});

// ---------------------------------------------------------------------------------------------------
// The act of a judging

const LAS = { mapId: "forest", characterId: 1, programId: 1 };

test("the act of a judging gives the twelve lines of the judging and the game state remembering their kinds and the equipment, replacing the judging of its triple", () => {
  // decision: D-440 "A judging, the one „Puść w pętlę” runs included (D-243), replaces the judging remembered for its character, program and map."
  // Relation: the lines are those of the judging itself; an empty program dies of cold on all twelve seeds of Las.
  const state = game(programFromRules(), {});
  const done = judgeAndRemember(frozen(state), LAS);
  assert.deepEqual(done.judging, judgeOnSeeds(state, LAS));
  assert.equal(done.judging.results[0].cause, "cold");
  assert.deepEqual(done.events, []);
  assert.deepEqual(done.state.judgings, {
    1: { 1: { forest: { results: Array(12).fill("death"), equipment: [] } } },
  });
  assert.deepEqual(
    judgingMark(
      done.state.judgings,
      ids(1, 1, "forest"),
      done.state.team.chest,
    ),
    { solved: 0, allSolved: false, stockShort: false, badge: false },
  );
  // A second judging replaces the first and leaves every other triple: here the first judging was of a
  // program that solved eleven, the second of the empty one.
  const held = game(programFromRules(), judgings());
  const again = judgeAndRemember(held, LAS);
  assert.deepEqual(again.state.judgings, {
    1: {
      1: {
        forestEdge: A,
        forest: { results: Array(12).fill("death"), equipment: [] },
      },
      2: { forest: C },
    },
    2: { 1: { forest: D }, 2: { forestEdge: E } },
  });
  assertLoadsBack(again.state, "after a judging");
});

test("the act remembers the equipment the judging took, and judging again with another chest replaces it", () => {
  // decision: D-440 "The game remembers the last judging of each character, program and map in the browser that made it, as D-441 gives: the twelve results of its seeds — solved, a death or undecided — and the equipment it took from what the chest held, while the cause and the game minute of a line stand only in the result shown after the judging (D-329)."
  const eater = {
    ...programFromRules({
      condition: { kind: "satietyBelow", value: 90 },
      action: { kind: "eat" },
    }),
    tripPlan: { take: [entry("berry", 10)], bring: [] },
  };
  const withChest = (pieces) => ({
    ...game(eater, {}),
    team: { ...game(eater, {}).team, chest: { pieces } },
  });
  const four = judgeAndRemember(withChest({ berry: 4 }), LAS).state;
  assert.deepEqual(four.judgings[1][1].forest.equipment, [entry("berry", 4)]);
  // The chest is as it was: the judging takes nothing.
  assert.deepEqual(four.team.chest, { pieces: { berry: 4 } });
  const lost = { ...four, team: { ...four.team, chest: { pieces: {} } } };
  assert.equal(
    judgingMark(lost.judgings, ids(1, 1, "forest"), lost.team.chest).stockShort,
    true,
  );
  const many = judgeAndRemember(
    { ...four, team: { ...four.team, chest: { pieces: { berry: 50 } } } },
    LAS,
  ).state;
  assert.deepEqual(many.judgings[1][1].forest.equipment, [entry("berry", 10)]);
  assert.equal(
    judgingMark(many.judgings, ids(1, 1, "forest"), many.team.chest).stockShort,
    false,
  );
});

test("the act changes nothing of the game but the remembered judging of its triple: not the pick of the list „Program:”, the program used last, the last seed, the chest or a character, and not a map run or an earning loop going", () => {
  // decision: D-439 "Such a judging is no map run of the character: it takes nothing from the chest, pays nothing and settles no death."
  // decision: D-439 "A program can be judged on every map open to the player, a map not yet solved included, and for a character in an earning loop or in a manual map run, and the judging changes nothing of either."
  // decision: D-170 "The list shows the first program still on the player's list of these: the program picked for that character before it is sent, which stays with the character until it is sent; the program that character used last, the program it was switched to during a map run included; the program with which any character last entered a map; the first program of the player's list."
  // invariant: simulation-inputs
  const plain = {
    ...game(programFromRules(), {}),
    pickedPrograms: { 1: 2, 2: 1 },
    lastUsedPrograms: { 1: 2 },
    lastEnteredProgram: 2,
    lastSeed: 777,
  };
  const withChest = {
    ...plain,
    team: { ...plain.team, chest: { pieces: { berry: 3 } } },
  };
  const looping = startLoop(
    withChest,
    { mapId: "forestEdge", characterId: 2 },
    S,
  ).state;
  const running = send(
    looping,
    { mapId: "forestEdge", characterId: 1 },
    T0,
  ).state;
  for (const held of [withChest, looping, running]) {
    const before = structuredClone(held);
    for (const characterId of [1, 2]) {
      for (const programId of [1, 2]) {
        const done = judgeAndRemember(frozen(held), {
          mapId: "forest",
          characterId,
          programId,
        });
        assert.deepEqual(
          { ...done.state, judgings: {} },
          { ...before, judgings: {} },
        );
        assert.notDeepEqual(done.state.judgings, {});
      }
    }
    assert.deepEqual(held, before);
  }
});

test("the act refuses what the judging refuses, and a character of an earning loop or a map run in progress is judged", () => {
  // decision: D-439 "A program can be judged on every map open to the player, a map not yet solved included, and for a character in an earning loop or in a manual map run, and the judging changes nothing of either."
  const state = frozen(game(programFromRules(), {}));
  for (const asked of [
    { ...LAS, mapId: "nowhere" },
    { ...LAS, mapId: "forestDeep" },
    { ...LAS, characterId: 99 },
    { ...LAS, programId: 99 },
  ])
    assert.throws(() => judgeAndRemember(state, asked), ownRefusal);
  const looping = startLoop(
    state,
    { mapId: "forestEdge", characterId: 1 },
    S,
  ).state;
  assert.deepEqual(
    judgeAndRemember(looping, LAS).judging,
    judgeOnSeeds(state, LAS),
  );
});

// ---------------------------------------------------------------------------------------------------
// The record of a judging and the mark read from it against the game state at hand (D-440, D-441, D-442)

/**
 * A record of a judging that solved `solved` seeds and took `equipment`, made for the first program of
 * `state` as it stands and for a character at generation 1, which is the generation of Ala and of Ola in
 * `game()` before any death.
 */
const recordAt = (state, solved, equipment = []) => ({
  results: kindsOf(solved),
  equipment,
  contentRevision: state.programs[0].contentRevision,
  generation: 1,
});

/** The mark of `record` for the character, program and map given, against `state`. */
const markOf = (state, record, characterId = 1, programId = 1) =>
  markOfRecord(state, ids(characterId, programId, "forest"), record);

/** The mark of a record that solved `solved` seeds and has all its stock. */
const standing = (solved) => ({
  solved,
  allSolved: solved === 12,
  stockShort: false,
  badge: solved === 12,
});

/** A game with no judging remembered, Ala and Ola at generation 1 and two programs. */
const plainGame = () => game(programFromRules(), {});

test("the record of a judging holds the kind of each of the twelve results, the equipment, and the content revision and the generation number of the game state the judging read", () => {
  // decision: D-441 "The browser keeps the judging each character, program and map last had (D-440) in its lasting storage (`localStorage`), one value under a key of its own for each such triple, the key naming the version of the stored form, the signed-in account by its identifier, the game by the moment it was made (D-04), the character, the program and the map, and the value holding the kind of each of the twelve results, the equipment the judging took, and the content revision of the program (D-442) and the generation number of the character in the game state the judging read."
  const judging = {
    results: [
      { kind: "solved" },
      { kind: "death", cause: "cold", minute: 243 },
      { kind: "undecided" },
      { kind: "death", cause: "combat", minute: 17 },
      { kind: "solved" },
      { kind: "death", cause: "hunger", minute: 900 },
      { kind: "undecided" },
      { kind: "solved" },
      { kind: "death", cause: "cold", minute: 1 },
      { kind: "undecided" },
      { kind: "solved" },
      { kind: "death", cause: "cold", minute: 4000 },
    ],
    equipment: [entry("berry", 4), entry("stick", 2)],
  };
  // Program 2 is made at revision 0 and saved twice with content that differs each time: revision 2.
  // Ola's generation is set to 3 by hand.
  let state = changing(plainGame(), 2, { generation: 3 });
  state = editProgram(state, 2, twoGroups(["Jeden", "Dwa"])).state;
  state = editProgram(state, 2, twoGroups(["Inna", "Dwa"])).state;
  assert.equal(state.programs[1].contentRevision, 2, "precondition");
  const record = recordOfJudging(
    frozen(state),
    ids(2, 2, "forest"),
    frozen(structuredClone(judging)),
  );
  assert.deepEqual(record, {
    results: [
      "solved",
      "death",
      "undecided",
      "death",
      "solved",
      "death",
      "undecided",
      "solved",
      "death",
      "undecided",
      "solved",
      "death",
    ],
    equipment: [entry("berry", 4), entry("stick", 2)],
    contentRevision: 2,
    generation: 3,
  });
  // The record shares nothing with the judging it was made from.
  const shared = recordOfJudging(state, ids(2, 2, "forest"), judging);
  judging.equipment[0].count = 99;
  assert.deepEqual(shared.equipment, [entry("berry", 4), entry("stick", 2)]);
});

test("the record of a judging is refused for a character the team lacks and for a program the list lacks", () => {
  // decision: D-441 "A remembered judging stands beside the list „Program:” only while its character is on the team at its generation number and its program is on the player's list at its content revision."
  const judging = { results: [], equipment: [] };
  const state = frozen(plainGame());
  for (const asked of [ids(99, 1, "forest"), ids(1, 99, "forest")])
    assert.throws(
      () => recordOfJudging(state, asked, judging),
      ownRefusal,
      JSON.stringify(asked),
    );
});

test("the mark is none where no record is given, and a record of the state at hand gives the count, the all twelve and the badge as before", () => {
  // decision: D-440 "Beside the list „Program:” of a character in „Kto idzie” stands the judging remembered for that character, the program the list shows and the map of the card: the badge „szczelny: 12 z 12” in `positive` where it solved all twelve seeds, and „{n} z 12” in `text` otherwise."
  const state = frozen(plainGame());
  assert.equal(markOf(state, null), null);
  assert.equal(markOf(state, undefined), null);
  assert.deepEqual(markOf(state, recordAt(state, 12)), standing(12));
  assert.deepEqual(markOf(state, recordAt(state, 11)), standing(11));
  assert.deepEqual(markOf(state, recordAt(state, 0)), standing(0));
  // Undecided seeds and deaths are alike unsolved.
  const mixed = {
    ...recordAt(state, 0),
    results: [
      ...Array(7).fill("solved"),
      ...Array(3).fill("undecided"),
      ...Array(2).fill("death"),
    ],
  };
  assert.equal(markOf(state, mixed).solved, 7);
  assert.equal(markOf(state, mixed).allSolved, false);
});

test("a record stands only where its character is on the team, its program is on the list and its results number the twelve seeds", () => {
  // decision: D-441 "A remembered judging stands beside the list „Program:” only while its character is on the team at its generation number and its program is on the player's list at its content revision."
  const state = frozen(plainGame());
  const record = recordAt(state, 12);
  assert.deepEqual(markOf(state, record), standing(12), "precondition");
  assert.equal(
    markOf(state, record, 99, 1),
    null,
    "a character the team lacks",
  );
  assert.equal(markOf(state, record, 1, 99), null, "a program the list lacks");
  const deleted = deleteProgram(state, 2).state;
  assert.deepEqual(markOf(deleted, record, 1, 1), standing(12));
  assert.equal(
    markOf(deleted, recordAt(state, 12), 1, 2),
    null,
    "program 2 deleted",
  );
  const first = deleteProgram(state, 1).state;
  assert.equal(markOf(first, record), null, "program 1 deleted");
  // A number of results other than the twelve seeds shows nothing, whichever way it differs.
  for (const count of [0, 1, 11, 13, 24])
    assert.equal(
      markOf(state, { ...record, results: Array(count).fill("solved") }),
      null,
      `${count} results`,
    );
});

test("a record whose program was saved with other content stands no more, a change back to the content judged included, and a rename leaves it", () => {
  // decision: D-440 "A judging so erased never stands again, since such a save raises the program's content revision (D-442) and such a death the character's generation number"
  // decision: D-442 "A rename, a save after which none of the three differs, though the counters that number new rules and groups may have changed, and every other act leave the content revision as it is, so it never goes down."
  const state = plainGame();
  const judged = state.programs[0].program;
  const record = recordAt(state, 12);
  assert.deepEqual(markOf(state, record), standing(12), "precondition");
  const other = editProgram(
    frozen(state),
    1,
    programFromRules(rule("wander")),
  ).state;
  assert.equal(markOf(other, record), null, "a rule changed");
  // A -> B -> A: the content is the judged one again, the record still stands no more.
  const back = editProgram(other, 1, judged).state;
  assert.deepEqual(back.programs[0].program, judged, "precondition");
  assert.equal(markOf(back, record), null, "changed back to what was judged");
  // The trip plan and the order of the groups count as content.
  const withTake = editProgram(state, 1, {
    ...judged,
    tripPlan: { take: [entry("berry", 2)], bring: [] },
  }).state;
  assert.equal(markOf(withTake, record), null, "a take list");
  const groups = editProgram(state, 1, twoGroups(["Jeden", "Dwa"])).state;
  const record2 = recordAt(groups, 12);
  assert.deepEqual(markOf(groups, record2), standing(12), "precondition");
  const swapped = editProgram(groups, 1, {
    ...groups.programs[0].program,
    groups: [...groups.programs[0].program.groups].reverse(),
  }).state;
  assert.equal(markOf(swapped, record2), null, "groups in another order");
  // A save that changes no content and a rename keep it; so does an edit of another program.
  assert.deepEqual(
    markOf(editProgram(state, 1, structuredClone(judged)).state, record),
    standing(12),
    "a save of the same content",
  );
  assert.deepEqual(
    markOf(renameProgram(state, 1, "Inna nazwa").state, record),
    standing(12),
    "a rename",
  );
  assert.deepEqual(
    markOf(editProgram(state, 2, twoGroups(["Trzy"])).state, record),
    standing(12),
    "an edit of program 2",
  );
  // A record of a revision above the program's, such as one of a save that never reached the server, shows nothing too.
  assert.equal(
    markOf(state, { ...record, contentRevision: record.contentRevision + 1 }),
    null,
    "a revision above",
  );
});

test("the rule the game writes at the first chill into the listed program takes the record of that program out of standing", () => {
  // decision: D-123 "A program rule the game writes at a discovery goes into the first rule group of the copy the map run carries out and into the first rule group of the program the copy belongs to"
  // decision: D-442 "Each program of the player's list carries a content revision, a whole number kept with its number, its name and its content: 0 when the program is made — the first program of a new game, a program created, a copy saved as a new program and a program pulled from a previous save (D-401) — and one higher at each save into the program after which its rules, its rule groups with their order or its trip plan differ from what they were, the rule the game writes at the first chill (D-123) included."
  // A new game holds one empty group; its first chill is game minute 84 (`tests/sim/discovery.test.mjs`).
  let state = withEdgeSolved(newGame());
  state = createCharacter(state, "Ala").state;
  state = send(state, { mapId: "forest", characterId: 1 }, T0).state;
  const record = recordAt(state, 12);
  const before = advanceMinutes(state, 83).state;
  assert.deepEqual(markOf(before, record), standing(12));
  const chilled = advanceMinutes(before, 1).state;
  assert.equal(chilled.programs[0].program.groups[0].rules.length, 1);
  assert.equal(markOf(chilled, record), null);
});

test("a record whose character died with its practice and ranks taken stands no more, in a manual map run, in an earning loop and in the catch-up, and another character's record stands", () => {
  // decision: D-190 "A character's death takes what it carried and pays nothing of its map run; when the resurrection has no use left, it also takes all the character's practice, the practice gathered at its earning loop included, and every rank of branch it bought, and the character's generation number grows by one"
  // decision: D-441 "A remembered judging stands beside the list „Program:” only while its character is on the team at its generation number and its program is on the player's list at its content revision."
  const base = usedUp(practised(plainGame()));
  const record = recordAt(base, 12);
  assert.deepEqual(markOf(base, record), standing(12), "precondition");
  const check = (lost, what) => {
    assert.equal(lost.team.characters[0].generation, 2, `${what}: Ala is at 2`);
    assert.equal(markOf(lost, record), null, what);
    assert.deepEqual(
      markOf(lost, recordAt(lost, 12), 2, 1),
      standing(12),
      `${what}: Ola's record stands`,
    );
  };
  const manual = settleDeath(died(base), T0).state;
  assert.equal(manual.run.deathSettlement.kind, "progressLost");
  check(manual, "a manual map run");
  const looped = loopDied({ ...base, solvedMaps: ["forestEdge", "forest"] });
  assert.equal(looped.loops[1], undefined, "the earning loop stopped");
  check(looped, "an earning loop");
  const reading = S + 300 * MIN + 17_000;
  const caught = catchUp(
    withSaveTime(
      startLoop(
        { ...base, solvedMaps: ["forestEdge", "forest"] },
        { mapId: "forest", characterId: 1 },
        S,
      ).state,
      S,
    ),
    reading,
  ).state;
  check(caught, "the catch-up");
});

test("a record stands after a death a use of the resurrection covers, after one of a character with no practice and after the purchase of a rank", () => {
  // decision: D-190 "The death of a character with practice uses up one use while any is left, and a death of a character with practice with none left stops its earning loop"
  // decision: D-440 "A judging so erased never stands again, since such a save raises the program's content revision (D-442) and such a death the character's generation number"
  const stands = (state, record, what) =>
    assert.deepEqual(markOf(state, record), standing(12), what);
  const practisedGame = practised(plainGame());
  const covered = settleDeath(died(practisedGame), T0).state;
  assert.equal(covered.run.deathSettlement.kind, "resurrectionUsed");
  stands(covered, recordAt(practisedGame, 12), "a covered death");
  const bareGame = usedUp(plainGame());
  const bare = settleDeath(died(bareGame), T0).state;
  assert.equal(bare.run.deathSettlement.kind, "noPractice");
  stands(bare, recordAt(bareGame, 12), "a death with no practice");
  // The earning loop's death that the resurrection covers leaves the generation too.
  const base = (state) => ({ ...state, solvedMaps: ["forestEdge", "forest"] });
  const coveredLoop = loopDied(base(practisedGame));
  assert.equal(coveredLoop.team.resurrectionUsesSpent, 1);
  stands(coveredLoop, recordAt(practisedGame, 12), "a covered death of a loop");
  // „Obchód” bought out of 160 practice in gathering small items.
  const rich = changing(plainGame(), 1, {
    skills: {
      ...plainGame().team.characters[0].skills,
      smallItemGathering: { practice: 160, ranks: {} },
      eating: { practice: 20, ranks: {} },
    },
  });
  const bought = buyBranch(rich, 1, "patrol").state;
  assert.notDeepEqual(
    bought.team,
    rich.team,
    "precondition: a rank was bought",
  );
  stands(bought, recordAt(rich, 12), "a bought rank");
  // A record of a generation other than the character's, below or above, shows nothing.
  const lost = settleDeath(died(usedUp(practised(plainGame()))), T0).state;
  assert.equal(
    markOf(lost, { ...recordAt(lost, 12), generation: 3 }),
    null,
    "a generation above",
  );
  assert.deepEqual(
    markOf(lost, { ...recordAt(lost, 12), generation: 2 }),
    standing(12),
    "the generation the death gave",
  );
});

test("where the chest holds less of an item than the record took the badge goes out and the count stays, and where it holds more the mark stands as it was", () => {
  // decision: D-440 "Where the chest holds less of an item than the judging took, the result stays with „oceniono z zapasem, którego dziś nie ma w skrzynce” beside it and the badge goes out, „12 z 12” standing in its place."
  const state = plainGame();
  const withChest = (pieces) => ({
    ...state,
    team: { ...state.team, chest: { pieces } },
  });
  const taken = [entry("berry", 4), entry("stick", 2)];
  const at = (solved, pieces) =>
    markOf(frozen(withChest(pieces)), recordAt(state, solved, taken));
  // Exactly what the judging took, and more of each.
  for (const pieces of [
    { berry: 4, stick: 2 },
    { berry: 40, stick: 2 },
    { berry: 4, stick: 9, moss: 1 },
  ])
    assert.deepEqual(at(12, pieces), standing(12), JSON.stringify(pieces));
  // One item below the count, whichever it is, an item the chest lacks altogether and an empty chest.
  for (const pieces of [
    { berry: 3, stick: 2 },
    { berry: 4, stick: 1 },
    { berry: 4 },
    { stick: 2 },
    {},
  ])
    assert.deepEqual(
      at(12, pieces),
      { solved: 12, allSolved: true, stockShort: true, badge: false },
      JSON.stringify(pieces),
    );
  // The count and the note stand at a result below twelve too.
  assert.deepEqual(at(11, { berry: 3, stick: 2 }), {
    solved: 11,
    allSolved: false,
    stockShort: true,
    badge: false,
  });
  // A judging that took nothing is never short.
  assert.equal(markOf(withChest({}), recordAt(state, 12)).badge, true);
});
