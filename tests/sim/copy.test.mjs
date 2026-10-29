// The copy a manual map run carries out and the player's programs in the game state. Expectations
// come from the task "programy-gracza", the vault file `programy_gracza_loop2.md` (D-82), its To do
// 1, 5, 6, 7, 10 and 11, and from D-93, D-123, D-152, D-153 and D-158 in foundations/decisions.md.
import assert from "node:assert/strict";
import { test } from "node:test";
import { MAPS } from "../../dist/public/sim/data/maps.js";
import {
  advanceMinutes,
  createCharacter,
  end,
  newGame,
  restart,
  send,
  setProgram,
} from "../../dist/public/sim/game.js";
import { programFromRules } from "./program-fixture.mjs";
import { newKnowingGame } from "./understanding-fixture.mjs";

const MAP_ID = Object.keys(MAPS)[0];
const REAL_MS = 1760000000000;
const ALWAYS = { kind: "always" };
const rule = (condition, action) => ({ condition, action });
const EXPLORE_ALWAYS = rule(ALWAYS, { kind: "explore" });
const EXPLORING = programFromRules(rule(ALWAYS, { kind: "explore" }));
const WANDER_FIRST = programFromRules(
  rule(ALWAYS, { kind: "wander" }),
  rule(ALWAYS, { kind: "explore" }),
);
// The program of a new game and of „Nowy program”: the empty rule group „Program” under „Zawsze”
// (D-91; To do 1).
const EMPTY = {
  groups: [{ id: 1, name: "Program", condition: ALWAYS, rules: [] }],
  nextGroupId: 2,
  nextRuleId: 1,
};

/** A knowing game whose program 1 holds `program`, with Ala, character 1, sent to the first map. */
function sent(program = EXPLORING) {
  const ready = createCharacter(
    setProgram(newKnowingGame(), program).state,
    "Ala",
  ).state;
  return send(ready, { mapId: MAP_ID, characterId: 1 }, REAL_MS).state;
}

/**
 * A game of Ala, character 1, and Bartek, character 2, holding the programs 1 and 3 — program 2
 * stands for one deleted — and the records `records`.
 */
function twoPrograms(records = {}, game = newKnowingGame()) {
  const team = createCharacter(createCharacter(game, "Ala").state, "Bartek");
  return {
    ...team.state,
    programs: [
      { id: 1, name: "Program", program: EXPLORING },
      { id: 3, name: "Las", program: WANDER_FIRST },
    ],
    nextProgramId: 4,
    ...records,
  };
}

test("a new game holds program 1, „Program”, with the empty rule group „Program” under „Zawsze”, the next program number 2 and no record of a program", () => {
  const state = newGame();
  assert.deepEqual(state.programs, [
    { id: 1, name: "Program", program: EMPTY },
  ]);
  assert.equal(state.nextProgramId, 2);
  assert.deepEqual(state.pickedPrograms, {});
  assert.deepEqual(state.lastUsedPrograms, {});
  assert.equal(state.lastEnteredProgram, null);
  assert.equal(state.countsProgram, null);
});

// To do 7: an edit during a map run goes into the copy; the program it was taken from stays.
test("an edit during a map run leaves program 1 as it was while the map run carries out the edited copy", () => {
  // Exploration lasts 20 minutes from minute 0, so the next rule is picked at minute 20.
  let state = advanceMinutes(sent(), 5).state;
  state = setProgram(state, WANDER_FIRST).state;
  assert.deepEqual(state.programs[0].program, EXPLORING);
  assert.deepEqual(state.run.copy, {
    program: WANDER_FIRST,
    programId: 1,
    deletedName: null,
    base: EXPLORING,
  });
  const at20 = advanceMinutes(state, 15).state;
  assert.equal(at20.run.minute, 20);
  assert.deepEqual(at20.run.current.activity.action, { kind: "wander" });
  assert.deepEqual(at20.programs[0].program, EXPLORING);
  const ended = end(at20).state;
  assert.deepEqual(ended.programs[0].program, EXPLORING);
});

// D-152, D-158: a send takes a copy of the program passed and records it for the character.
test("a send with a program number carries out a copy of that program, whose base is its content, makes it the character's program used last and the one entered with last, and clears the character's pick", () => {
  const state = twoPrograms({ pickedPrograms: { 1: 1, 2: 1 } });
  const { run, ...records } = send(
    state,
    { mapId: MAP_ID, characterId: 1, programId: 3 },
    REAL_MS,
  ).state;
  assert.deepEqual(run.copy, {
    program: WANDER_FIRST,
    programId: 3,
    deletedName: null,
    base: WANDER_FIRST,
  });
  assert.deepEqual(run.current.activity.action, { kind: "wander" });
  assert.deepEqual(records.pickedPrograms, { 2: 1 });
  assert.deepEqual(records.lastUsedPrograms, { 1: 3 });
  assert.equal(records.lastEnteredProgram, 3);
  assert.deepEqual(records.programs, state.programs);
  assert.deepEqual(records.ruleCounts, { 1: 1, 2: 0 });
});

test("a send refuses a program number not on the list, a deleted program's included, and changes nothing", () => {
  const state = twoPrograms();
  const before = structuredClone(state);
  for (const programId of [2, 4, 0, null, "1"]) {
    assert.throws(
      () => send(state, { mapId: MAP_ID, characterId: 1, programId }, REAL_MS),
      Error,
      `program ${String(programId)}`,
    );
  }
  assert.deepEqual(state, before);
});

// D-158; To do 5: the program a headquarters row stands on, which a send without a number takes.
test("a send without a program number takes the first still on the list of the row's pick, the character's program used last, the program entered with last and the first program", () => {
  const variants = [
    ["no record", {}, 1],
    ["entered with last", { lastEnteredProgram: 3 }, 3],
    ["entered with last, deleted", { lastEnteredProgram: 2 }, 1],
    [
      "used last before entered with last",
      { lastUsedPrograms: { 1: 3 }, lastEnteredProgram: 1 },
      3,
    ],
    [
      "used last, deleted",
      { lastUsedPrograms: { 1: 2 }, lastEnteredProgram: 3 },
      3,
    ],
    [
      "another character's program used last",
      { lastUsedPrograms: { 2: 3 }, lastEnteredProgram: 1 },
      1,
    ],
    [
      "the pick before used last",
      { pickedPrograms: { 1: 1 }, lastUsedPrograms: { 1: 3 } },
      1,
    ],
    [
      "the pick, deleted",
      { pickedPrograms: { 1: 2 }, lastUsedPrograms: { 1: 3 } },
      3,
    ],
    ["another character's pick", { pickedPrograms: { 2: 3 } }, 1],
  ];
  for (const [label, records, expected] of variants) {
    const result = send(
      twoPrograms(records),
      { mapId: MAP_ID, characterId: 1 },
      REAL_MS,
    ).state;
    assert.equal(result.run.copy.programId, expected, label);
    assert.equal(result.lastEnteredProgram, expected, label);
  }
});

// To do 6: „Restart” goes on with the copy of the map run it replaces, unsaved changes included.
test("Restart carries on the copy of the map run it replaces, its unsaved change included, with every count from zero and the programs as they were", () => {
  const edited = setProgram(
    advanceMinutes(sent(), 5).state,
    WANDER_FIRST,
  ).state;
  const restarted = restart(edited).state;
  assert.deepEqual(restarted.run.copy, edited.run.copy);
  assert.equal(restarted.run.minute, 0);
  assert.deepEqual(restarted.run.current.activity.action, { kind: "wander" });
  // Rule 1, „Zawsze → Wędruj”, fires at minute 0; rule 2 has not fired.
  assert.deepEqual(restarted.ruleCounts, { 1: 1, 2: 0 });
  assert.deepEqual(restarted.programs, edited.programs);
});

// To do 10, D-93: after „Zakończ” the counts stand beside the copy's program.
test("Zakończ keeps a count beside a rule of the copy's program whose condition and action are the copy's, and 0 beside one whose content differs", () => {
  const explorer = programFromRules(
    rule(ALWAYS, { kind: "explore" }),
    rule(ALWAYS, { kind: "wander" }),
  );
  const edit = structuredClone(explorer);
  edit.groups[0].rules[1].action = { kind: "explore" };
  edit.groups[0].rules.push({ id: 3, ...rule(ALWAYS, { kind: "wander" }) });
  edit.nextRuleId = 4;
  const editedRun = setProgram(sent(explorer), edit).state;
  // A run's history is an explicit input to the reconciliation, not computed by the code under test.
  const state = { ...editedRun, ruleCounts: { 1: 4, 2: 2, 3: 5 } };
  const ended = end(state).state;
  assert.deepEqual(ended.ruleCounts, { 1: 4, 2: 0 });
  assert.equal(ended.countsProgram, 1);
  assert.deepEqual(ended.programs[0].program, explorer);
});

test("Zakończ clears the counts where the copy's program is gone", () => {
  const running = sent();
  for (const programId of [null, 2]) {
    const state = {
      ...running,
      ruleCounts: { 1: 4 },
      run: {
        ...running.run,
        copy: { ...running.run.copy, programId, deletedName: "Program" },
      },
    };
    const ended = end(state).state;
    assert.equal(ended.ruleCounts, null, `program ${String(programId)}`);
    assert.equal(ended.countsProgram, null, `program ${String(programId)}`);
  }
});

// To do 11, D-123: the rule of the first chill (minute 84, see tests/sim/discovery.test.mjs).
test("the first chill writes „Zawsze → Eksploruj” into the copy, its base and the copy's program, and into no other program", () => {
  const state = {
    ...twoPrograms({}, newGame()),
    programs: [
      { id: 1, name: "Program", program: EMPTY },
      { id: 3, name: "Las", program: EMPTY },
    ],
  };
  const running = send(
    state,
    { mapId: MAP_ID, characterId: 1, programId: 3 },
    REAL_MS,
  ).state;
  const chilled = advanceMinutes(running, 84).state;
  assert.equal(chilled.run.minute, 84);
  const written = {
    ...EMPTY,
    groups: [{ ...EMPTY.groups[0], rules: [{ id: 1, ...EXPLORE_ALWAYS }] }],
    nextRuleId: 2,
  };
  assert.deepEqual(chilled.run.copy, {
    program: written,
    programId: 3,
    deletedName: null,
    base: written,
  });
  assert.deepEqual(chilled.programs, [
    { id: 1, name: "Program", program: EMPTY },
    { id: 3, name: "Las", program: written },
  ]);
});

test("the first chill writes the rule into the copy and its base alone where the copy's program is gone", () => {
  const running = send(
    createCharacter(newGame(), "Ala").state,
    { mapId: MAP_ID, characterId: 1 },
    REAL_MS,
  ).state;
  const orphaned = {
    ...running,
    run: {
      ...running.run,
      copy: { ...running.run.copy, programId: 2, deletedName: "Stary" },
    },
  };
  const chilled = advanceMinutes(orphaned, 84).state;
  assert.deepEqual(chilled.run.copy.program.groups[0].rules, [
    { id: 1, ...EXPLORE_ALWAYS },
  ]);
  assert.deepEqual(chilled.run.copy.base, chilled.run.copy.program);
  assert.deepEqual(chilled.programs, orphaned.programs);
});

// Plan, Choices: outside a map run `setProgram` edits the program a character with no pick and no
// program used last goes with.
test("setProgram outside a map run edits the program entered with last, or else the first of the list, and reconciles counts only where they stand beside it", () => {
  const entered = twoPrograms({ lastEnteredProgram: 3 });
  const third = setProgram(entered, EXPLORING).state;
  assert.deepEqual(
    third.programs.map((saved) => saved.program),
    [EXPLORING, EXPLORING],
  );
  const gone = setProgram(
    twoPrograms({ lastEnteredProgram: 2 }),
    WANDER_FIRST,
  ).state;
  assert.deepEqual(
    gone.programs.map((saved) => saved.program),
    [WANDER_FIRST, WANDER_FIRST],
  );
  // Counts beside program 1 stay when program 3 is edited, and follow an edit of program 3.
  const besideFirst = { ...entered, ruleCounts: { 1: 4 }, countsProgram: 1 };
  assert.deepEqual(setProgram(besideFirst, EXPLORING).state.ruleCounts, {
    1: 4,
  });
  const besideThird = {
    ...entered,
    ruleCounts: { 1: 4, 2: 2 },
    countsProgram: 3,
  };
  // Program 3 „Zawsze → Wędruj”, „Zawsze → Eksploruj” becomes „Zawsze → Eksploruj” alone.
  assert.deepEqual(setProgram(besideThird, EXPLORING).state.ruleCounts, {
    1: 0,
  });
});

// D-119 and spec constraint D-90: the map run carries out the copy reduced to the character's
// repertoire; a rule outside it is passed over and stays in the copy.
test("a copy rule outside the character's repertoire is passed over and stays in the copy", () => {
  // A new game knows no action, so „Zawsze → Eksploruj” is outside the repertoire until the first
  // chill.
  const ready = createCharacter(setProgram(newGame(), EXPLORING).state, "Ala");
  const running = send(
    ready.state,
    { mapId: MAP_ID, characterId: 1 },
    REAL_MS,
  ).state;
  assert.deepEqual(running.run.current.activity, { kind: "wait" });
  assert.deepEqual(running.run.copy.program, EXPLORING);
});
