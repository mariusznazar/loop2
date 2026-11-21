// The content revision of each program of the player's list and the moment the game was made.
// Expectations come from D-442, D-04 and D-386 in foundations/decisions.md. Every expected value is
// written out here: the revisions start from a number the case sets (3), so a rise by one cannot be
// told from a reset to 0 or to 1.
import assert from "node:assert/strict";
import { test } from "node:test";
import {
  advanceMinutes,
  createCharacter,
  newGame,
  send,
  setProgram,
  withSaveTime,
} from "../../dist/browser/sim/game.js";
import {
  appendPrograms,
  createProgram,
  deleteProgram,
  editProgram,
  pickProgram,
  renameProgram,
  saveCopyAsNewProgram,
  saveCopyIntoProgram,
} from "../../dist/browser/sim/programs.js";
import { readPreviousPrograms } from "../../dist/browser/sim/previous-programs.js";
import { loadSavedGame, savedGame } from "../../dist/browser/sim/saved-game.js";
import { newKnowingGame, withEdgeSolved } from "./understanding-fixture.mjs";

const MAP_ID = "forest";
const REAL_MS = 1760000000000;
const ALWAYS = { kind: "always" };
const HEALTH_BELOW_8 = { kind: "healthBelow", value: 8 };
const rule = (id, condition, action) => ({ id, condition, action });

// Two groups of one and two rules and a trip plan of one item taken: every part a swap or a change
// of content can touch.
const BASE = {
  tripPlan: { take: [{ item: "stick", count: 2 }], bring: [] },
  groups: [
    {
      id: 1,
      name: "Najpierw",
      condition: HEALTH_BELOW_8,
      rules: [
        rule(1, ALWAYS, { kind: "explore" }),
        rule(2, ALWAYS, { kind: "wander" }),
      ],
    },
    {
      id: 2,
      name: "Potem",
      condition: ALWAYS,
      rules: [rule(3, ALWAYS, { kind: "eat" })],
    },
  ],
  nextGroupId: 3,
  nextRuleId: 4,
};

/** `BASE` with one part replaced; every variant differs from it in rules, groups' order or trip plan. */
const CHANGES = {
  "a rule's action changed": {
    ...BASE,
    groups: [
      {
        ...BASE.groups[0],
        rules: [rule(1, ALWAYS, { kind: "wander" }), BASE.groups[0].rules[1]],
      },
      BASE.groups[1],
    ],
  },
  "a rule added": {
    ...BASE,
    groups: [
      {
        ...BASE.groups[0],
        rules: [...BASE.groups[0].rules, rule(4, ALWAYS, { kind: "kick" })],
      },
      BASE.groups[1],
    ],
    nextRuleId: 5,
  },
  "a rule removed": {
    ...BASE,
    groups: [
      { ...BASE.groups[0], rules: [BASE.groups[0].rules[0]] },
      BASE.groups[1],
    ],
  },
  "two rules swapped": {
    ...BASE,
    groups: [
      { ...BASE.groups[0], rules: [...BASE.groups[0].rules].reverse() },
      BASE.groups[1],
    ],
  },
  "two groups swapped": { ...BASE, groups: [...BASE.groups].reverse() },
  "a group's condition changed": {
    ...BASE,
    groups: [
      { ...BASE.groups[0], condition: { kind: "healthBelow", value: 94 } },
      BASE.groups[1],
    ],
  },
  "the take list changed": {
    ...BASE,
    tripPlan: { take: [{ item: "stick", count: 3 }], bring: [] },
  },
  "the bring list changed": {
    ...BASE,
    tripPlan: {
      take: BASE.tripPlan.take,
      bring: [{ item: "stick", count: 1 }],
    },
  },
};

/** A difference in the two identity counters alone: no rule, group order or trip plan is touched. */
const COUNTERS_ALONE = { ...BASE, nextGroupId: 9, nextRuleId: 12 };

/** A knowing game with Ala (1) and the program 1, „Program”, holding `BASE` at content revision 3. */
function seeded(extra = {}) {
  const made = createCharacter(withEdgeSolved(newKnowingGame()), "Ala").state;
  return {
    ...made,
    programs: [{ id: 1, name: "Program", program: BASE, contentRevision: 3 }],
    ...extra,
  };
}

/** `seeded()` with Ala sent to Las with program 1, so a copy of it is carried out. */
function sent(extra = {}) {
  return send(
    seeded(extra),
    { mapId: MAP_ID, characterId: 1, programId: 1 },
    REAL_MS,
  ).state;
}

/** The three ways content is saved into the listed program 1, each from a state of `seeded()`. */
const SAVES = {
  editProgram: (program) => editProgram(seeded(), 1, program).state,
  setProgram: (program) => setProgram(seeded(), program).state,
  saveCopyIntoProgram: (program) =>
    saveCopyIntoProgram(setProgram(sent(), program).state).state,
};

function deepFreeze(value) {
  if (value !== null && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const inner of Object.values(value)) deepFreeze(inner);
  }
  return value;
}

test("a new game holds its first program at content revision 0, and a created program, an appended one and a copy saved as a new program are made at 0", () => {
  // decision: D-442 "Each program of the player's list carries a content revision, a whole number kept with its number, its name and its content: 0 when the program is made"
  assert.equal(newGame().programs[0].contentRevision, 0);
  // Program 1 stands at 3 and stays there while the others are made.
  const created = createProgram(seeded()).state;
  assert.deepEqual(
    created.programs.map(({ id, contentRevision }) => [id, contentRevision]),
    [
      [1, 3],
      [2, 0],
    ],
  );
  const appended = appendPrograms(seeded(), [
    { name: "A", program: BASE },
    { name: "B", program: CHANGES["a rule added"] },
  ]);
  assert.deepEqual(
    appended.programs.map(({ id, contentRevision }) => [id, contentRevision]),
    [
      [1, 3],
      [2, 0],
      [3, 0],
    ],
  );
  const edited = setProgram(sent(), CHANGES["two groups swapped"]).state;
  const asNew = saveCopyAsNewProgram(edited, "Nowy").state;
  assert.deepEqual(
    asNew.programs.map(({ id, contentRevision }) => [id, contentRevision]),
    [
      [1, 3],
      [2, 0],
    ],
  );
});

test("a program pulled from a previous save whose item held the content revision 7 is made at 0: what the reader gives, appended, starts at 0 and keeps the program", () => {
  // decision: D-442 "Each program of the player's list carries a content revision, a whole number kept with its number, its name and its content: 0 when the program is made — the first program of a new game, a program created, a copy saved as a new program and a program pulled from a previous save (D-401) — and one higher at each save into the program after which its rules, its rule groups with their order or its trip plan differ from what they were"
  const document = {
    version: 9,
    game: {
      programs: [{ id: 5, name: "Stara", program: BASE, contentRevision: 7 }],
    },
  };
  const read = readPreviousPrograms(document);
  assert.equal(read.ok, true, "precondition: the document is readable");
  assert.deepEqual(
    read.items.map(({ kind }) => kind),
    ["read"],
    "precondition: the item is read",
  );
  const pulled = appendPrograms(
    seeded(),
    read.items.map(({ name, program }) => ({ name, program })),
  );
  assert.deepEqual(pulled.programs.at(-1), {
    id: 2,
    name: "Stara",
    program: BASE,
    contentRevision: 0,
  });
  assert.deepEqual(
    pulled.programs.map(({ id, contentRevision }) => [id, contentRevision]),
    [
      [1, 3],
      [2, 0],
    ],
  );
});

for (const [change, program] of Object.entries(CHANGES)) {
  for (const [save, run] of Object.entries(SAVES)) {
    test(`${change} and saved by ${save} raises the content revision by one and changes nothing else of the saved program`, () => {
      // decision: D-442 "Each program of the player's list carries a content revision, a whole number kept with its number, its name and its content: 0 when the program is made — the first program of a new game, a program created, a copy saved as a new program and a program pulled from a previous save (D-401) — and one higher at each save into the program after which its rules, its rule groups with their order or its trip plan differ from what they were"
      const saved = run(program).programs[0];
      assert.deepEqual(saved, {
        id: 1,
        name: "Program",
        program,
        contentRevision: 4,
      });
    });
  }
}

test("the first chill writes the rule of D-123 into the program of the copy and raises its content revision by one, and no other program's", () => {
  // decision: D-442 "Each program of the player's list carries a content revision, a whole number kept with its number, its name and its content: 0 when the program is made — the first program of a new game, a program created, a copy saved as a new program and a program pulled from a previous save (D-401) — and one higher at each save into the program after which its rules, its rule groups with their order or its trip plan differ from what they were, the rule the game writes at the first chill (D-123) included"
  const empty = {
    groups: [{ id: 1, name: "Program", condition: ALWAYS, rules: [] }],
    tripPlan: { take: [], bring: [] },
    nextGroupId: 2,
    nextRuleId: 1,
  };
  // A game that does not yet know „Wędruj”, so that the chill at minute 84 is a discovery.
  const state = {
    ...createCharacter(withEdgeSolved(newGame()), "Ala").state,
    programs: [
      { id: 1, name: "Program", program: empty, contentRevision: 5 },
      { id: 3, name: "Las", program: empty, contentRevision: 2 },
    ],
    nextProgramId: 4,
  };
  const running = send(
    state,
    { mapId: MAP_ID, characterId: 1, programId: 3 },
    REAL_MS,
  ).state;
  const chilled = advanceMinutes(running, 84).state;
  assert.equal(chilled.run.minute, 84);
  assert.deepEqual(
    chilled.programs.map(({ id, contentRevision }) => [id, contentRevision]),
    [
      [1, 5],
      [3, 3],
    ],
  );
  assert.equal(chilled.programs[1].program.groups[0].rules.length, 1);
});

test("a program changed to another content and back is raised twice, and its content is the first again", () => {
  // decision: D-442 "Each program of the player's list carries a content revision, a whole number kept with its number, its name and its content: 0 when the program is made — the first program of a new game, a program created, a copy saved as a new program and a program pulled from a previous save (D-401) — and one higher at each save into the program after which its rules, its rule groups with their order or its trip plan differ from what they were"
  const there = editProgram(seeded(), 1, CHANGES["two rules swapped"]).state;
  const back = editProgram(there, 1, BASE).state;
  assert.equal(there.programs[0].contentRevision, 4);
  assert.equal(back.programs[0].contentRevision, 5);
  assert.deepEqual(back.programs[0].program, BASE);
});

test("a rename leaves the content revision as it is", () => {
  // decision: D-442 "A rename, a save after which none of the three differs"
  const renamed = renameProgram(seeded(), 1, "Nowa nazwa").state;
  assert.deepEqual(renamed.programs[0], {
    id: 1,
    name: "Nowa nazwa",
    program: BASE,
    contentRevision: 3,
  });
});

for (const [save, run] of [
  ["editProgram", (program) => editProgram(seeded(), 1, program).state],
  ["setProgram", (program) => setProgram(seeded(), program).state],
]) {
  test(`${save} with the content it holds, or with the identity counters alone changed, leaves the content revision as it is`, () => {
    // decision: D-442 "A rename, a save after which none of the three differs, though the counters that number new rules and groups may have changed"
    assert.equal(run(BASE).programs[0].contentRevision, 3);
    const counters = run(COUNTERS_ALONE).programs[0];
    assert.equal(counters.contentRevision, 3);
    // The counters did change: the case would prove nothing otherwise.
    assert.equal(counters.program.nextRuleId, 12);
  });
}

test("saving a copy whose content is the program's, or differs in the identity counters alone, leaves the content revision as it is, though the objects' keys were made in another order", () => {
  // decision: D-442 "The copy of a map run and the program of an earning loop hold content alone and carry no content revision, and a copy saved into its program raises that program's content revision only where the content differs"
  const reorder = (program) => ({
    nextRuleId: program.nextRuleId,
    nextGroupId: program.nextGroupId,
    groups: program.groups.map((group) => ({
      rules: group.rules.map((one) => ({
        action: one.action,
        condition: one.condition,
        id: one.id,
      })),
      condition: group.condition,
      name: group.name,
      id: group.id,
    })),
    tripPlan: {
      bring: program.tripPlan.bring,
      take: program.tripPlan.take.map(({ count, item }) => ({ count, item })),
    },
  });
  for (const copied of [reorder(BASE), reorder(COUNTERS_ALONE)]) {
    const running = sent();
    // The base differs from the copy, so the copy has unsaved changes, as saving it needs.
    const state = {
      ...running,
      run: {
        ...running.run,
        copy: {
          ...running.run.copy,
          program: copied,
          base: CHANGES["a rule removed"],
        },
      },
    };
    const saved = saveCopyIntoProgram(state).state;
    assert.equal(saved.programs[0].contentRevision, 3);
    assert.deepEqual(saved.programs[0].program, copied);
  }
});

test("a pick, a send and the deletion of another program leave the content revision as it is", () => {
  // decision: D-442 "A rename, a save after which none of the three differs, though the counters that number new rules and groups may have changed, and every other act leave the content revision as it is, so it never goes down"
  const two = {
    ...seeded(),
    programs: [
      { id: 1, name: "Program", program: BASE, contentRevision: 3 },
      { id: 2, name: "Las", program: BASE, contentRevision: 7 },
    ],
    nextProgramId: 3,
  };
  const revisions = (state) =>
    state.programs.map((saved) => saved.contentRevision);
  assert.deepEqual(revisions(pickProgram(two, 1, 2).state), [3, 7]);
  assert.deepEqual(
    revisions(
      send(two, { mapId: MAP_ID, characterId: 1, programId: 2 }, REAL_MS).state,
    ),
    [3, 7],
  );
  assert.deepEqual(revisions(deleteProgram(two, 2).state), [3]);
});

test("raising the content revision changes no value passed to it", () => {
  const frozen = deepFreeze(seeded());
  assert.equal(
    editProgram(frozen, 1, CHANGES["a rule removed"]).state.programs[0]
      .contentRevision,
    4,
  );
  assert.equal(frozen.programs[0].contentRevision, 3);
});

test("a new game holds the moment it is made with, 0 where none is given, and any whole number is held as it is", () => {
  // decision: D-04 "The game state stores the moment of the browser's clock at which the page made the game, which the page passes to the function that makes a new game"
  assert.equal(newGame(1760000000123).madeAtMs, 1760000000123);
  assert.equal(newGame(-5).madeAtMs, -5);
  assert.equal(newGame(0).madeAtMs, 0);
  assert.equal(newGame().madeAtMs, 0);
});

test("a new game refuses with a RangeError a moment that is no safe integer, which its own load would refuse", () => {
  // decision: D-386 "The moment the game was made (D-04) is a moment the game state stores too, which the load takes as a safe integer of milliseconds of any sign without comparing it with any clock, and the load takes the content revision of each program (D-442) as any safe integer from 0, comparing it with nothing, and the function that makes a new game refuses a moment that is no safe integer with a RangeError"
  for (const moment of [
    1.5,
    Number.NaN,
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
    2 ** 53,
    -(2 ** 53),
    "5",
    null,
  ]) {
    assert.throws(() => newGame(moment), RangeError, String(moment));
  }
  assert.equal(newGame(Number.MAX_SAFE_INTEGER).madeAtMs, 9007199254740991);
  assert.equal(newGame(-Number.MAX_SAFE_INTEGER).madeAtMs, -9007199254740991);
});

test("a saved game writes the moment of the game and each program's content revision, and loads back whole", () => {
  // decision: D-386 "The moment the game was made (D-04) is a moment the game state stores too, which the load takes as a safe integer of milliseconds of any sign without comparing it with any clock"
  const state = withSaveTime(seeded({ madeAtMs: 1760000000123 }), REAL_MS);
  const document = savedGame(state);
  assert.equal(document.game.madeAtMs, 1760000000123);
  assert.equal(document.game.programs[0].contentRevision, 3);
  const loaded = loadSavedGame(document);
  assert.equal(loaded.ok, true);
  assert.deepEqual(loaded.state, state);
});

test("the load takes the moment of the game as any safe integer and refuses it missing or as no safe integer", () => {
  // decision: D-386 "The moment the game was made (D-04) is a moment the game state stores too, which the load takes as a safe integer of milliseconds of any sign without comparing it with any clock"
  const document = savedGame(withSaveTime(seeded(), REAL_MS));
  const withMoment = (madeAtMs) => ({
    ...document,
    game: { ...document.game, madeAtMs },
  });
  for (const moment of [0, -5, 1760000000123, Number.MAX_SAFE_INTEGER]) {
    const loaded = loadSavedGame(withMoment(moment));
    assert.equal(loaded.ok, true, String(moment));
    assert.equal(loaded.state.madeAtMs, moment);
  }
  for (const moment of [1.5, 2 ** 53, "1760000000123", null, undefined]) {
    assert.deepEqual(
      loadSavedGame(withMoment(moment)),
      { ok: false, reason: "shape" },
      String(moment),
    );
  }
  const without = Object.fromEntries(
    Object.entries(document.game).filter(([key]) => key !== "madeAtMs"),
  );
  assert.equal(Object.hasOwn(without, "madeAtMs"), false);
  assert.deepEqual(loadSavedGame({ ...document, game: without }), {
    ok: false,
    reason: "shape",
  });
});

test("the load takes a program's content revision as a safe integer from 0 and refuses it missing, below 0, fractional, beyond the safe integers or no number", () => {
  // decision: D-386 "The moment the game was made (D-04) is a moment the game state stores too, which the load takes as a safe integer of milliseconds of any sign without comparing it with any clock, and the load takes the content revision of each program (D-442) as any safe integer from 0, comparing it with nothing"
  const document = savedGame(withSaveTime(seeded(), REAL_MS));
  const withRevision = (contentRevision) => ({
    ...document,
    game: {
      ...document.game,
      programs: [{ ...document.game.programs[0], contentRevision }],
    },
  });
  for (const revision of [0, 1, 3, Number.MAX_SAFE_INTEGER]) {
    const loaded = loadSavedGame(withRevision(revision));
    assert.equal(loaded.ok, true, String(revision));
    assert.equal(loaded.state.programs[0].contentRevision, revision);
  }
  for (const revision of [-1, 1.5, 2 ** 53, "3", null, undefined]) {
    assert.deepEqual(
      loadSavedGame(withRevision(revision)),
      { ok: false, reason: "shape" },
      String(revision),
    );
  }
  const bare = Object.fromEntries(
    Object.entries(document.game.programs[0]).filter(
      ([key]) => key !== "contentRevision",
    ),
  );
  assert.equal(Object.hasOwn(bare, "contentRevision"), false);
  assert.deepEqual(
    loadSavedGame({
      ...document,
      game: { ...document.game, programs: [bare] },
    }),
    { ok: false, reason: "shape" },
  );
});
