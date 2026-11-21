// The copy a manual map run carries out and the player's programs in the game state. Expectations
// come from D-91, D-93, D-123, D-164, D-165 and D-170 in foundations/decisions.md.
import assert from "node:assert/strict";
import { test } from "node:test";
import {
  advanceMinutes,
  createCharacter,
  end,
  newGame,
  restart,
  send,
  setProgram,
} from "../../dist/browser/sim/game.js";
import { programFromRules } from "./program-fixture.mjs";
import { newKnowingGame, withEdgeSolved } from "./understanding-fixture.mjs";

const MAP_ID = "forest";
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
// (D-91).
const EMPTY = {
  groups: [{ id: 1, name: "Program", condition: ALWAYS, rules: [] }],
  tripPlan: { take: [], bring: [] },
  nextGroupId: 2,
  nextRuleId: 1,
};

/** A knowing game whose program 1 holds `program`, with Ala, character 1, sent to Las. */
function sent(program = EXPLORING) {
  const ready = createCharacter(
    setProgram(withEdgeSolved(newKnowingGame()), program).state,
    "Ala",
  ).state;
  return send(ready, { mapId: MAP_ID, characterId: 1 }, REAL_MS).state;
}

/**
 * A game of Ala, character 1, and Bartek, character 2, holding the programs 1 and 3 — program 2
 * stands for one deleted — and the records `records`.
 */
function twoPrograms(records = {}, game = withEdgeSolved(newKnowingGame())) {
  const team = createCharacter(createCharacter(game, "Ala").state, "Bartek");
  return {
    ...team.state,
    programs: [
      { id: 1, name: "Program", program: EXPLORING, contentRevision: 0 },
      { id: 3, name: "Las", program: WANDER_FIRST, contentRevision: 0 },
    ],
    nextProgramId: 4,
    ...records,
  };
}

test("a new game holds program 1, „Program”, with the empty rule group „Program” under „Zawsze”, the next program number 2 and no record of a program", () => {
  // decision: D-169 "The program of a new game is named „Program”, and a new program „Program 2”, „Program 3” and on, by the first free number"
  // decision: D-165 "Each program of the player carries a number the game gives it when the program is created, one more than the number the game state gave last"
  const state = newGame();
  assert.deepEqual(state.programs, [
    { id: 1, name: "Program", program: EMPTY, contentRevision: 0 },
  ]);
  assert.equal(state.nextProgramId, 2);
  assert.deepEqual(state.pickedPrograms, {});
  assert.deepEqual(state.lastUsedPrograms, {});
  assert.equal(state.lastEnteredProgram, null);
  assert.equal(state.countsProgram, null);
});

// D-164: an edit during a map run goes into the copy; the program it was taken from stays.
test("an edit during a map run leaves program 1 as it was while the map run carries out the edited copy", () => {
  // decision: D-164 "Programs belong to the player, as one list shared by all characters; a character picks a program when it enters a map — by default the one it used last — and a manual map run or an earning loop carries out a copy taken at its start"
  // decision: D-164 "A change made during a map run goes into the copy and reaches the program only when the player saves it there or as a new program, or is dropped when the player discards it or switches the character to another program"
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

// D-164, D-170: a send takes a copy of the program passed and records it for the character.
test("a send with a program number carries out a copy of that program, whose base is its content, makes it the character's program used last and the one entered with last, and clears the character's pick", () => {
  // decision: D-164 "Programs belong to the player, as one list shared by all characters; a character picks a program when it enters a map — by default the one it used last — and a manual map run or an earning loop carries out a copy taken at its start"
  // decision: D-164 "A program can be edited at any time, and its saved change takes effect at the next manual map entry other than a map run restart, at the next switch to it during a manual map run or at the next start of an earning loop"
  // decision: D-165 "Each record of the game state that names a program — the program the copy of a map run belongs to, the program a character used last, the program picked for a character, the program with which a character last entered a map and the program the firing counts stand beside after „Zakończ” — names it by that number"
  // decision: D-170 "The list shows the first program still on the player's list of these: the program picked for that character before it is sent, which stays with the character until it is sent; the program that character used last, the program it was switched to during a map run included; the program with which any character last entered a map; the first program of the player's list"
  // decision: D-93 "The count starts from zero at the start of each manual map run, a map run restart included, at a switch of the character to another program, and when the program rule's condition or action changes; it survives reordering the rule, moving it to another rule group, changing its group's condition or name, and a save of the copy"
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

// D-170: the program a headquarters row stands on, which a send without a number takes.
test("a send without a program number takes the first still on the list of the row's pick, the character's program used last, the program entered with last and the first program", () => {
  // decision: D-170 "The list shows the first program still on the player's list of these: the program picked for that character before it is sent, which stays with the character until it is sent; the program that character used last, the program it was switched to during a map run included; the program with which any character last entered a map; the first program of the player's list"
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

// D-164: „Restart” goes on with the copy of the map run it replaces, unsaved changes included.
test("Restart carries on the copy of the map run it replaces, its unsaved change included, with every count from zero and the programs as they were", () => {
  // decision: D-164 "Programs belong to the player, as one list shared by all characters; a character picks a program when it enters a map — by default the one it used last — and a manual map run or an earning loop carries out a copy taken at its start"
  // decision: D-164 "A program can be edited at any time, and its saved change takes effect at the next manual map entry other than a map run restart, at the next switch to it during a manual map run or at the next start of an earning loop"
  // decision: D-93 "The count starts from zero at the start of each manual map run, a map run restart included, at a switch of the character to another program, and when the program rule's condition or action changes; it survives reordering the rule, moving it to another rule group, changing its group's condition or name, and a save of the copy"
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

// D-93: after „Zakończ” the counts stand beside the copy's program.
test("Zakończ keeps a count beside a rule of the copy's program whose condition and action are the copy's, and 0 beside one whose content differs", () => {
  // decision: D-93 "Before the game's first manual map run the rules show no counts; after a manual map run ends in death or in a completion its counts remain beside the copy's rules, and after „Zakończ” beside the rules of the program the copy belongs to"
  // decision: D-165 "Each record of the game state that names a program — the program the copy of a map run belongs to, the program a character used last, the program picked for a character, the program with which a character last entered a map and the program the firing counts stand beside after „Zakończ” — names it by that number"
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
  // decision: D-93 "Before the game's first manual map run the rules show no counts; after a manual map run ends in death or in a completion its counts remain beside the copy's rules, and after „Zakończ” beside the rules of the program the copy belongs to"
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

// D-123: the rule of the first chill (minute 84, see tests/sim/discovery.test.mjs).
test("the first chill writes „Zawsze → Eksploruj” into the copy, its base and the copy's program, and into no other program", () => {
  // decision: D-123 "A program rule the game writes at a discovery goes into the first rule group of the copy the map run carries out and into the first rule group of the program the copy belongs to, while that program is on the player's list, and where either holds no rule group, the game adds the rule group „Program” with the condition „Zawsze” and writes the rule into it; the other programs of the list stay as they were"
  // decision: D-123 "The game writes one such rule, „Zawsze → Eksploruj”, at the first chill"
  // decision: D-123 "The rule so written counts neither as an unsaved change of the copy nor as a change of the program that a save of the copy announces"
  const state = {
    ...twoPrograms({}, withEdgeSolved(newGame())),
    programs: [
      { id: 1, name: "Program", program: EMPTY, contentRevision: 0 },
      { id: 3, name: "Las", program: EMPTY, contentRevision: 0 },
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
    { id: 1, name: "Program", program: EMPTY, contentRevision: 0 },
    // The rule the first chill wrote changed its content: one rise, and none for the other program.
    { id: 3, name: "Las", program: written, contentRevision: 1 },
  ]);
});

test("the first chill writes the rule into the copy and its base alone where the copy's program is gone", () => {
  // decision: D-123 "A program rule the game writes at a discovery goes into the first rule group of the copy the map run carries out and into the first rule group of the program the copy belongs to, while that program is on the player's list"
  // decision: D-123 "The rule so written counts neither as an unsaved change of the copy nor as a change of the program that a save of the copy announces"
  const running = send(
    createCharacter(withEdgeSolved(newGame()), "Ala").state,
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

test("setProgram outside a map run edits the program entered with last, or else the first of the list, and reconciles counts only where they stand beside it", () => {
  // decision: D-93 "Before the game's first manual map run the rules show no counts; after a manual map run ends in death or in a completion its counts remain beside the copy's rules, and after „Zakończ” beside the rules of the program the copy belongs to"
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

// D-119 and D-126: the map run carries out the copy reduced to the character's repertoire; a rule
// outside it is passed over and stays in the copy.
test("a copy rule outside the character's repertoire is passed over and stays in the copy", () => {
  // A new game knows „Eksploruj” and not „Wędruj”, so „Zawsze → Wędruj” is outside the repertoire
  // until the first chill.
  const wandering = programFromRules(rule(ALWAYS, { kind: "wander" }));
  const ready = createCharacter(
    setProgram(withEdgeSolved(newGame()), wandering).state,
    "Ala",
  );
  const running = send(
    ready.state,
    { mapId: MAP_ID, characterId: 1 },
    REAL_MS,
  ).state;
  assert.deepEqual(running.run.current.activity, { kind: "wait" });
  assert.deepEqual(running.run.copy.program, wandering);
});
