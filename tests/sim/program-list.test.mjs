// The operations on the player's program list. Expectations come from D-164, D-165, D-168, D-169
// and D-170 in foundations/decisions.md. Every expected value is written out here.
import assert from "node:assert/strict";
import { test } from "node:test";
import {
  advanceMinutes,
  createCharacter,
  end,
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
  programName,
  renameProgram,
  suggestedProgramName,
} from "../../dist/browser/sim/programs.js";
import { loadSavedGame, savedGame } from "../../dist/browser/sim/saved-game.js";
import { programFromRules } from "./program-fixture.mjs";
import { newKnowingGame } from "./understanding-fixture.mjs";

const MAP_ID = "forest";
const REAL_MS = 1760000000000;
const ALWAYS = { kind: "always" };
const rule = (condition, action) => ({ condition, action });
const EXPLORING = programFromRules(rule(ALWAYS, { kind: "explore" }));
const WANDERING = programFromRules(rule(ALWAYS, { kind: "wander" }));
const EMPTY = {
  groups: [{ id: 1, name: "Program", condition: ALWAYS, rules: [] }],
  tripPlan: { take: [], bring: [] },
  nextGroupId: 2,
  nextRuleId: 1,
};

const listed = (...names) =>
  names.map((name, index) => ({ id: index + 1, name, program: EMPTY }));

/** A knowing game with Ala (1) and Bartek (2) and the programs 1, 3 and 4 — 2 stands for a deleted one. */
function team(extra = {}) {
  const made = createCharacter(
    createCharacter(newKnowingGame(), "Ala").state,
    "Bartek",
  ).state;
  return {
    ...made,
    programs: [
      { id: 1, name: "Program", program: EXPLORING },
      { id: 3, name: "Las", program: WANDERING },
      { id: 4, name: "Noc", program: EMPTY },
    ],
    nextProgramId: 5,
    ...extra,
  };
}

function deepFreeze(value) {
  if (value !== null && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const inner of Object.values(value)) deepFreeze(inner);
  }
  return value;
}

/** Ala, character 1, sent with program 3 of `team()`. */
function sentWithThird() {
  return send(team(), { mapId: MAP_ID, characterId: 1, programId: 3 }, REAL_MS)
    .state;
}

test("a second created program is named „Program 2” and takes the number 2", () => {
  const { state } = createProgram(newGame());
  assert.deepEqual(
    state.programs.map(({ id, name }) => [id, name]),
    [
      [1, "Program"],
      [2, "Program 2"],
    ],
  );
});

test("a created program holds the empty group „Program” under „Zawsze”, at the end, and takes the next number", () => {
  const { state, events } = createProgram(team());
  assert.deepEqual(state.programs.at(-1), {
    id: 5,
    name: "Program 2",
    program: EMPTY,
  });
  assert.deepEqual(
    state.programs.slice(0, 3).map(({ id }) => id),
    [1, 3, 4],
  );
  assert.equal(state.nextProgramId, 6);
  assert.deepEqual(events, []);
});

test("a number is not given again after a deletion", () => {
  const two = createProgram(newGame()).state;
  const again = createProgram(deleteProgram(two, 2).state).state;
  assert.deepEqual(
    again.programs.map(({ id, name }) => [id, name]),
    [
      [1, "Program"],
      [3, "Program 2"],
    ],
  );
});

test("the suggested name is „Program n” for the smallest n from 2 that no name takes, letter case ignored", () => {
  assert.equal(suggestedProgramName(listed("Program")), "Program 2");
  assert.equal(
    suggestedProgramName(listed("Program", "Program 2")),
    "Program 3",
  );
  assert.equal(
    suggestedProgramName(listed("Program", "Program 3")),
    "Program 2",
  );
  assert.equal(suggestedProgramName(listed("Program 1", "Las")), "Program 2");
  assert.equal(
    suggestedProgramName(listed("Program", "PROGRAM 2", "program 3")),
    "Program 4",
  );
});

test("a typed name is trimmed, and refused as empty or as taken regardless of letter case", () => {
  const programs = listed("Program", "Łąka");
  assert.deepEqual(programName(programs, "  Las \t"), {
    ok: true,
    name: "Las",
  });
  assert.deepEqual(programName(programs, ""), { ok: false, reason: "empty" });
  assert.deepEqual(programName(programs, " \t\n "), {
    ok: false,
    reason: "empty",
  });
  assert.deepEqual(programName(programs, " program "), {
    ok: false,
    reason: "taken",
  });
  assert.deepEqual(programName(programs, "ŁĄKA"), {
    ok: false,
    reason: "taken",
  });
  assert.deepEqual(programName(programs, "Program 2"), {
    ok: true,
    name: "Program 2",
  });
});

test("a program's own name in another letter case does not block its rename; the name has no length limit", () => {
  const programs = listed("Program", "Las");
  assert.deepEqual(programName(programs, "LAS", 2), { ok: true, name: "LAS" });
  assert.deepEqual(programName(programs, "LAS", 1), {
    ok: false,
    reason: "taken",
  });
  const long = "x".repeat(5000);
  assert.deepEqual(programName(programs, long), { ok: true, name: long });
});

test("a rename keeps the place, the number and the content, and stores the trimmed name", () => {
  const { state } = renameProgram(team(), 3, "  LAS  ");
  assert.deepEqual(
    state.programs.map(({ id, name }) => [id, name]),
    [
      [1, "Program"],
      [3, "LAS"],
      [4, "Noc"],
    ],
  );
  assert.deepEqual(state.programs[1].program, WANDERING);
});

test("a rename throws on an empty name, a taken name and a program not on the list", () => {
  assert.throws(() => renameProgram(team(), 3, "   "), /empty/);
  assert.throws(() => renameProgram(team(), 3, "noc"), /taken/);
  assert.throws(() => renameProgram(team(), 2, "Nowa"), /no program 2/);
});

test("a deletion removes the program, and is refused for the last one and for a program not on the list", () => {
  const { state } = deleteProgram(team(), 3);
  assert.deepEqual(
    state.programs.map(({ id }) => id),
    [1, 4],
  );
  assert.equal(state.nextProgramId, 5);
  assert.throws(() => deleteProgram(team(), 2), /no program 2/);
  assert.throws(() => deleteProgram(newGame(), 1), /last program/);
  const one = deleteProgram(deleteProgram(team(), 3).state, 4).state;
  assert.throws(() => deleteProgram(one, 1), /last program/);
});

test("deleting the copy's program leaves the copy on its content, its number none and its name kept", () => {
  const running = sentWithThird();
  const { state } = deleteProgram(running, 3);
  assert.equal(state.run.copy.programId, null);
  assert.equal(state.run.copy.deletedName, "Las");
  assert.deepEqual(state.run.copy.program, WANDERING);
  assert.deepEqual(state.run.copy.base, WANDERING);
  assert.deepEqual(
    { ...state.run, copy: null },
    { ...running.run, copy: null },
  );
});

test("deleting another program leaves the copy record as it is", () => {
  const running = sentWithThird();
  assert.deepEqual(deleteProgram(running, 4).state.run.copy, running.run.copy);
  assert.deepEqual(deleteProgram(running, 1).state.run.copy, running.run.copy);
});

test("deleting the program the counts stand beside clears the counts; deleting another leaves them", () => {
  const ended = {
    ...end(sentWithThird()).state,
    ruleCounts: { 1: 4 },
    countsProgram: 3,
  };
  const cleared = deleteProgram(ended, 3).state;
  assert.equal(cleared.ruleCounts, null);
  assert.equal(cleared.countsProgram, null);
  const kept = deleteProgram(ended, 4).state;
  assert.deepEqual(kept.ruleCounts, { 1: 4 });
  assert.equal(kept.countsProgram, 3);
});

test("a deletion during a map run leaves the counts of the copy", () => {
  const running = { ...sentWithThird(), ruleCounts: { 1: 4 } };
  const { state } = deleteProgram(running, 3);
  assert.deepEqual(state.ruleCounts, { 1: 4 });
  assert.equal(state.countsProgram, null);
});

test("Zakończ after the deletion of the copy's program clears the counts", () => {
  const running = advanceMinutes(sentWithThird(), 5).state;
  assert.notEqual(running.ruleCounts, null);
  const ended = end(deleteProgram(running, 3).state).state;
  assert.equal(ended.ruleCounts, null);
  assert.equal(ended.countsProgram, null);
  assert.equal(ended.run, null);
});

test("an edit replaces the content of the program numbered, the others stay", () => {
  const { state } = editProgram(team(), 3, EXPLORING);
  assert.deepEqual(state.programs[1], {
    id: 3,
    name: "Las",
    program: EXPLORING,
  });
  assert.deepEqual(state.programs[0].program, EXPLORING);
  assert.deepEqual(state.programs[2].program, EMPTY);
});

test("an edit is checked against the resources of the maps and throws on a program not on the list", () => {
  const gathering = programFromRules(
    rule(ALWAYS, { kind: "gather", resource: "stick" }),
  );
  assert.deepEqual(
    editProgram(team(), 4, gathering).state.programs[2].program,
    gathering,
  );
  const unknown = programFromRules(
    rule(ALWAYS, { kind: "gather", resource: "gold" }),
  );
  assert.throws(() => editProgram(team(), 4, unknown), /not a resource/);
  assert.throws(() => editProgram(team(), 2, EXPLORING), /no program 2/);
});

test("an edit reconciles the counts only where they stand beside the program edited", () => {
  const two = programFromRules(
    rule(ALWAYS, { kind: "explore" }),
    rule(ALWAYS, { kind: "wander" }),
  );
  const changed = structuredClone(two);
  changed.groups[0].rules[1].action = { kind: "explore" };
  const base = team({ ruleCounts: { 1: 4, 2: 2 }, countsProgram: 3 });
  const beside = {
    ...base,
    programs: [
      base.programs[0],
      { id: 3, name: "Las", program: two },
      base.programs[2],
    ],
  };
  assert.deepEqual(editProgram(beside, 3, changed).state.ruleCounts, {
    1: 4,
    2: 0,
  });
  assert.deepEqual(editProgram(beside, 4, EXPLORING).state.ruleCounts, {
    1: 4,
    2: 2,
  });
});

test("an edit of a saved program leaves the map run, its copy, its streak, its beaten attacks and its counts", () => {
  const running = advanceMinutes(sentWithThird(), 12).state;
  const counted = {
    ...running,
    ruleCounts: { 1: 7 },
    run: { ...running.run, streak: 9, defeatedAttacks: 2 },
  };
  for (const programId of [3, 1, 4]) {
    const { state } = editProgram(counted, programId, EXPLORING);
    assert.deepEqual(state.run, counted.run, `program ${String(programId)}`);
    assert.deepEqual(
      state.ruleCounts,
      { 1: 7 },
      `program ${String(programId)}`,
    );
  }
});

test("the list operations run in a map run and outside one alike", () => {
  for (const state of [team(), sentWithThird()]) {
    assert.equal(createProgram(state).state.programs.length, 4);
    assert.equal(
      renameProgram(state, 4, "Dzień").state.programs[2].name,
      "Dzień",
    );
    assert.equal(pickProgram(state, 2, 4).state.pickedPrograms[2], 4);
    assert.equal(deleteProgram(state, 4).state.programs.length, 2);
  }
});

test("the operations change nothing passed to them", () => {
  for (const state of [team(), sentWithThird()]) {
    const frozen = deepFreeze(structuredClone(state));
    createProgram(frozen);
    renameProgram(frozen, 3, "Inny");
    deleteProgram(frozen, 3);
    editProgram(frozen, 3, EXPLORING);
    pickProgram(frozen, 1, 4);
    assert.deepEqual(frozen, state);
  }
});

test("a pick names a character of the team and a program of the list", () => {
  const { state, events } = pickProgram(team(), 2, 3);
  assert.deepEqual(state.pickedPrograms, { 2: 3 });
  assert.deepEqual(events, []);
  assert.throws(() => pickProgram(team(), 3, 1), /no character 3/);
  assert.throws(() => pickProgram(team(), 1, 2), /no program 2/);
});

// The row's program (D-170): the pick, the program used last, the program entered with
// last, the first of the list, each passed over once its program is deleted. It is read as the
// program a send without a number sends with.
const sentProgramOf = (state, characterId) =>
  send(state, { mapId: MAP_ID, characterId }, REAL_MS).state.run.copy.programId;

test("a row's program is the pick, then the program used last, then the one entered with last, then the first", () => {
  const records = {
    pickedPrograms: { 1: 4 },
    lastUsedPrograms: { 1: 3 },
    lastEnteredProgram: 3,
  };
  assert.equal(sentProgramOf(team(records), 1), 4);
  assert.equal(sentProgramOf(team({ ...records, pickedPrograms: {} }), 1), 3);
  assert.equal(
    sentProgramOf(
      team({ ...records, pickedPrograms: {}, lastUsedPrograms: {} }),
      1,
    ),
    3,
  );
  assert.equal(sentProgramOf(team(), 1), 1);
});

test("a row's program passes over each record once its program is deleted", () => {
  const all = team({
    pickedPrograms: { 1: 4 },
    lastUsedPrograms: { 1: 3 },
    lastEnteredProgram: 1,
  });
  assert.equal(sentProgramOf(deleteProgram(all, 4).state, 1), 3);
  assert.equal(
    sentProgramOf(deleteProgram(deleteProgram(all, 4).state, 3).state, 1),
    1,
  );
  const enteredGone = team({ lastEnteredProgram: 3 });
  assert.equal(sentProgramOf(deleteProgram(enteredGone, 3).state, 2), 1);
  const usedGone = team({
    lastEnteredProgram: 4,
    lastUsedPrograms: { 1: 3 },
  });
  assert.equal(sentProgramOf(deleteProgram(usedGone, 3).state, 1), 4);
});

test("a pick is kept through the creation of another character and cleared by the send", () => {
  const picked = pickProgram(team(), 1, 4).state;
  const another = createCharacter(picked, "Celina").state;
  assert.deepEqual(another.pickedPrograms, { 1: 4 });
  const sent = send(another, { mapId: MAP_ID, characterId: 1 }, REAL_MS).state;
  assert.equal(sent.run.copy.programId, 4);
  assert.deepEqual(sent.pickedPrograms, {});
  assert.equal(sent.lastUsedPrograms[1], 4);
  assert.equal(sent.lastEnteredProgram, 4);
});

test("a pick on one row leaves the other rows' programs", () => {
  const picked = pickProgram(team({ lastUsedPrograms: { 2: 3 } }), 1, 4).state;
  assert.equal(sentProgramOf(picked, 2), 3);
});

test("an edit of the copy reaches only the copy while the list holds more programs", () => {
  const { state } = setProgram(sentWithThird(), EXPLORING);
  assert.deepEqual(state.run.copy.program, EXPLORING);
  assert.deepEqual(state.programs[1].program, WANDERING);
});

const pulled = (...names) =>
  names.map((name) => ({ name, program: WANDERING }));

test("pulled programs are appended at the end of the list in order, numbered from the next number, which rises by their count", () => {
  const state = appendPrograms(team(), [
    { name: "Dom", program: WANDERING },
    { name: "Las", program: EXPLORING },
  ]);
  assert.deepEqual(
    state.programs.map(({ id, name }) => [id, name]),
    [
      [1, "Program"],
      [3, "Las"],
      [4, "Noc"],
      [5, "Dom"],
      [6, "Las (2)"],
    ],
  );
  assert.deepEqual(state.programs[3].program, WANDERING);
  assert.deepEqual(state.programs[4].program, EXPLORING);
  assert.equal(state.nextProgramId, 7);
});

test("a pulled name taken on the list takes the next free number, and the next one Las (3) while Las (2) stands", () => {
  const state = appendPrograms(team(), pulled("Las", "Las"));
  assert.deepEqual(
    state.programs.slice(3).map(({ id, name }) => [id, name]),
    [
      [5, "Las (2)"],
      [6, "Las (3)"],
    ],
  );
  assert.equal(state.nextProgramId, 7);
});

test("a pulled name is numbered against the programs appended before it, and a name ending in (2) gets another (2)", () => {
  const state = appendPrograms(team(), pulled("Las", "Las", "Las (2)"));
  assert.deepEqual(
    state.programs.slice(3).map(({ name }) => name),
    ["Las (2)", "Las (3)", "Las (2) (2)"],
  );
});

test("a pulled name is taken regardless of letter case, and the number keeps the name's own letters", () => {
  const state = appendPrograms(team(), pulled("las", "NOC", "Noc (2)"));
  assert.deepEqual(
    state.programs.slice(3).map(({ name }) => name),
    ["las (2)", "NOC (2)", "Noc (2) (2)"],
  );
});

test("the counter rises by the count of the appended programs and nothing is appended for none", () => {
  const three = appendPrograms(team(), pulled("A", "B", "C"));
  assert.equal(three.nextProgramId, 8);
  assert.deepEqual(
    three.programs.slice(3).map(({ id }) => id),
    [5, 6, 7],
  );
  const none = team();
  assert.deepEqual(appendPrograms(none, []), none);
});

test("an append changes nothing of the game state but the programs and the counter", () => {
  const before = pickProgram(sentWithThird(), 2, 4).state;
  const after = appendPrograms(before, [{ name: "Las", program: EXPLORING }]);
  assert.deepEqual(after, {
    ...before,
    programs: [
      ...before.programs,
      { id: 5, name: "Las (2)", program: EXPLORING },
    ],
    nextProgramId: 6,
  });
});

// Fault: a pulled name the game's own load refuses (empty, untrimmed, taken in another
// letter case), which would discard the whole new game at its next load (D-206). The
// expectation comes from D-386: the game never writes a saved game state its own load
// discards.
test("the game state after an append is saved and loaded again whole, names taken in another letter case, with Polish letters, an emoji and 5000 characters among them", () => {
  const long = "x".repeat(5000);
  const state = appendPrograms(
    team(),
    pulled("Program", "program", "Program (2)", "PROGRAM 2", "Łąka 🌲", long),
  );
  assert.deepEqual(
    state.programs.slice(3).map(({ name }) => name),
    [
      "Program (2)",
      "program (3)",
      "Program (2) (2)",
      "PROGRAM 2",
      "Łąka 🌲",
      long,
    ],
  );
  const stamped = withSaveTime(state, REAL_MS);
  const written = JSON.parse(JSON.stringify(savedGame(stamped)));
  assert.deepEqual(loadSavedGame(written), { ok: true, state: stamped });
});

test("the append changes nothing passed to it", () => {
  const state = team();
  const frozen = deepFreeze(structuredClone(state));
  const read = deepFreeze([{ name: "Las", program: EXPLORING }]);
  appendPrograms(frozen, read);
  assert.deepEqual(frozen, state);
  assert.deepEqual(read, [{ name: "Las", program: EXPLORING }]);
});
