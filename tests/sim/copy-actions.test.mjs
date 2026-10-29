// The operations on a manual map run's copy: the two measures of its record, the saves, the
// discard and the switch. Expectations come from the task "programy-gracza", the vault file
// `programy_gracza_loop2.md` (To do 6 to 12), and from D-93, D-131, D-136, D-164, D-171 and D-174
// in foundations/decisions.md. Every expected value is written out here.
import assert from "node:assert/strict";
import { test } from "node:test";
import { MAPS } from "../../dist/public/sim/data/maps.js";
import {
  advanceMinutes,
  createCharacter,
  newGame,
  send,
  setPaused,
  setProgram,
} from "../../dist/public/sim/game.js";
import {
  copyHasUnsavedChanges,
  deleteProgram,
  discardCopyChanges,
  editProgram,
  programHasChangesCopyLacks,
  saveCopyAsNewProgram,
  saveCopyIntoProgram,
  switchProgram,
} from "../../dist/public/sim/programs.js";
import { programFromRules } from "./program-fixture.mjs";
import { newKnowingGame } from "./understanding-fixture.mjs";

const MAP_ID = Object.keys(MAPS)[0];
const REAL_MS = 1760000000000;
const ALWAYS = { kind: "always" };
const rule = (condition, action) => ({ condition, action });
const EXPLORING = programFromRules(rule(ALWAYS, { kind: "explore" }));
const WANDERING = programFromRules(rule(ALWAYS, { kind: "wander" }));
// Rule 1 explores for 20 game minutes, which covers the 10 the scenarios pass; rule 2 is never reached.
const EXPLORING_THEN_WANDERING = programFromRules(
  rule(ALWAYS, { kind: "explore" }),
  rule(ALWAYS, { kind: "wander" }),
);
const DEATH = { minute: 10, cause: "cold" };

/** A knowing game with Ala (1) and the program 1 holding `program`. */
function ready(program) {
  const made = createCharacter(newKnowingGame(), "Ala").state;
  return editProgram(made, 1, program).state;
}

/** Ala sent with program 1 holding `program`, nothing edited. */
function sentWith(program) {
  return send(
    ready(program),
    { mapId: MAP_ID, characterId: 1, programId: 1 },
    REAL_MS,
  ).state;
}

/** Ala sent with program 1 holding EXPLORING, her copy edited to EXPLORING_THEN_WANDERING, 10 minutes on. */
function editedAndRunning() {
  const edited = setProgram(sentWith(EXPLORING), EXPLORING_THEN_WANDERING);
  return advanceMinutes(edited.state, 10).state;
}

/** The state with the programs 3 (wandering) and 4 (exploring) beside program 1; 2 stands for a deleted one. */
function withOthers(state) {
  return {
    ...state,
    programs: [
      state.programs[0],
      { id: 3, name: "Wędrówka", program: WANDERING },
      { id: 4, name: "Las", program: EXPLORING },
    ],
    nextProgramId: 5,
  };
}

/** The same map run ended in death with a streak of 7, as an ended map run holds one. */
function died(state) {
  return { ...state, run: { ...state.run, death: DEATH, streak: 7 } };
}

function deepFreeze(value) {
  if (value !== null && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const inner of Object.values(value)) deepFreeze(inner);
  }
  return value;
}

/** A map run paused at its first discovery, the first chill, from a program holding the empty group. */
function pausedAtDiscovery() {
  const sent = send(
    createCharacter(newGame(), "Ala").state,
    { mapId: MAP_ID, characterId: 1, programId: 1 },
    REAL_MS,
  ).state;
  return advanceMinutes(sent, 100).state;
}

test("„Zapisz w programie” after an edit of the copy gives the program the copy's content and leaves the streak", () => {
  const before = editedAndRunning();
  assert.equal(before.run.streak, 10, "precondition: a streak of 10");
  assert.deepEqual(before.programs[0].program, EXPLORING);
  const { state, events } = saveCopyIntoProgram(before);
  assert.deepEqual(state.programs[0].program, EXPLORING_THEN_WANDERING);
  assert.deepEqual(state.run.copy.base, EXPLORING_THEN_WANDERING);
  assert.deepEqual(state.run.copy.program, EXPLORING_THEN_WANDERING);
  assert.equal(state.run.streak, 10);
  assert.deepEqual(events, []);
});

test("a copy just taken has no unsaved changes and its program no changes the copy lacks; without a map run both are false", () => {
  const sent = sentWith(EXPLORING);
  assert.equal(copyHasUnsavedChanges(sent), false);
  assert.equal(programHasChangesCopyLacks(sent), false);
  assert.equal(copyHasUnsavedChanges(newGame()), false);
  assert.equal(programHasChangesCopyLacks(newGame()), false);
});

test("an edit of the copy makes it unsaved, and an edit put back makes it equal again", () => {
  const edited = setProgram(sentWith(EXPLORING), EXPLORING_THEN_WANDERING);
  assert.equal(copyHasUnsavedChanges(edited.state), true);
  assert.equal(programHasChangesCopyLacks(edited.state), false);
  const back = setProgram(edited.state, EXPLORING).state;
  assert.equal(copyHasUnsavedChanges(back), false);
});

test("a rule added and then deleted still counts as an unsaved change, the identity counter having moved", () => {
  const added = setProgram(sentWith(EXPLORING), EXPLORING_THEN_WANDERING);
  const deleted = setProgram(added.state, { ...EXPLORING, nextRuleId: 3 });
  assert.deepEqual(deleted.state.run.copy.program.groups, EXPLORING.groups);
  assert.equal(copyHasUnsavedChanges(deleted.state), true);
});

test("an edit of the program the copy came from makes the program hold changes the copy lacks, and an edit put back does not", () => {
  const sent = withOthers(sentWith(EXPLORING));
  const edited = editProgram(sent, 1, WANDERING).state;
  assert.equal(programHasChangesCopyLacks(edited), true);
  assert.equal(copyHasUnsavedChanges(edited), false);
  const back = editProgram(edited, 1, EXPLORING).state;
  assert.equal(programHasChangesCopyLacks(back), false);
  const other = editProgram(sent, 3, EXPLORING_THEN_WANDERING).state;
  assert.equal(programHasChangesCopyLacks(other), false);
});

test("a copy whose program is deleted has unsaved changes and its program no changes the copy lacks", () => {
  const sent = send(
    withOthers(ready(EXPLORING)),
    { mapId: MAP_ID, characterId: 1, programId: 3 },
    REAL_MS,
  ).state;
  const gone = deleteProgram(sent, 3).state;
  assert.equal(gone.run.copy.programId, null);
  assert.equal(copyHasUnsavedChanges(gone), true);
  assert.equal(programHasChangesCopyLacks(gone), false);
});

test("„Zapisz w programie” leaves the copy, the streak, the beaten attacks and the counts, and the other programs", () => {
  const before = withOthers(editedAndRunning());
  assert.deepEqual(before.ruleCounts, { 1: 1, 2: 0 }, "precondition: counts");
  const { state } = saveCopyIntoProgram(before);
  assert.equal(state.run.streak, before.run.streak);
  assert.equal(state.run.defeatedAttacks, before.run.defeatedAttacks);
  assert.deepEqual(state.ruleCounts, { 1: 1, 2: 0 });
  assert.deepEqual(state.run.copy.program, before.run.copy.program);
  assert.equal(state.run.copy.programId, 1);
  assert.deepEqual(state.programs.slice(1), before.programs.slice(1));
  assert.equal(copyHasUnsavedChanges(state), false);
  assert.equal(programHasChangesCopyLacks(state), false);
});

test("„Zapisz w programie” replaces changes the copy lacks at once, without a confirmation", () => {
  const before = editProgram(editedAndRunning(), 1, WANDERING).state;
  assert.equal(programHasChangesCopyLacks(before), true);
  const { state } = saveCopyIntoProgram(before);
  assert.deepEqual(state.programs[0].program, EXPLORING_THEN_WANDERING);
  assert.equal(programHasChangesCopyLacks(state), false);
});

test("„Zapisz w programie” is allowed after death and keeps the streak of the ended map run", () => {
  const { state } = saveCopyIntoProgram(died(editedAndRunning()));
  assert.deepEqual(state.programs[0].program, EXPLORING_THEN_WANDERING);
  assert.equal(state.run.streak, 7);
});

test("„Zapisz w programie” is refused without a map run, without unsaved changes and with the program gone", () => {
  assert.throws(() => saveCopyIntoProgram(newGame()), /no map run/);
  assert.throws(
    () => saveCopyIntoProgram(sentWith(EXPLORING)),
    /no unsaved changes/,
  );
  const edited = setProgram(
    withOthers(sentWith(EXPLORING)),
    EXPLORING_THEN_WANDERING,
  ).state;
  const gone = deleteProgram(edited, 1).state;
  assert.equal(gone.run.copy.programId, null);
  assert.throws(() => saveCopyIntoProgram(gone), /gone/);
});

test("„Zapisz jako nowy program” adds the copy's content at the end of the list under the next number, and the copy belongs to it", () => {
  const before = withOthers(editedAndRunning());
  const { state } = saveCopyAsNewProgram(before, "  Nocna  ");
  assert.deepEqual(state.programs.at(-1), {
    id: 5,
    name: "Nocna",
    program: EXPLORING_THEN_WANDERING,
  });
  assert.deepEqual(
    state.programs.slice(0, 3).map(({ id }) => id),
    [1, 3, 4],
  );
  assert.deepEqual(state.programs[0], before.programs[0]);
  assert.equal(state.nextProgramId, 6);
  assert.equal(state.run.copy.programId, 5);
  assert.equal(state.run.copy.deletedName, null);
  assert.deepEqual(state.run.copy.program, EXPLORING_THEN_WANDERING);
  assert.deepEqual(state.run.copy.base, EXPLORING_THEN_WANDERING);
  assert.equal(copyHasUnsavedChanges(state), false);
  assert.equal(state.lastUsedPrograms[1], 5);
});

test("„Zapisz jako nowy program” is no switch: the streak, the beaten attacks, the counts and the entered-with program stay", () => {
  const before = withOthers(editedAndRunning());
  assert.equal(before.run.streak, 10, "precondition: a streak of 10");
  const { state } = saveCopyAsNewProgram(before, "Nocna");
  assert.equal(state.run.streak, 10);
  assert.equal(state.run.defeatedAttacks, before.run.defeatedAttacks);
  assert.deepEqual(state.ruleCounts, { 1: 1, 2: 0 });
  assert.equal(state.lastEnteredProgram, before.lastEnteredProgram);
});

test("„Zapisz jako nowy program” works where the program is gone and after death", () => {
  const gone = deleteProgram(withOthers(editedAndRunning()), 1).state;
  assert.equal(gone.run.copy.deletedName, "Program");
  const saved = saveCopyAsNewProgram(gone, "Nowa").state;
  assert.equal(saved.run.copy.programId, 5);
  assert.equal(saved.run.copy.deletedName, null);
  const ended = saveCopyAsNewProgram(died(editedAndRunning()), "Nowa").state;
  assert.equal(ended.run.streak, 7);
  assert.equal(ended.programs.length, 2);
});

test("„Zapisz jako nowy program” is refused without a map run, without unsaved changes and on a name that is empty or taken", () => {
  assert.throws(() => saveCopyAsNewProgram(newGame(), "Nowa"), /no map run/);
  assert.throws(
    () => saveCopyAsNewProgram(sentWith(EXPLORING), "Nowa"),
    /no unsaved changes/,
  );
  const edited = setProgram(sentWith(EXPLORING), EXPLORING_THEN_WANDERING);
  assert.throws(() => saveCopyAsNewProgram(edited.state, "   "), /empty/);
  assert.throws(() => saveCopyAsNewProgram(edited.state, " PROGRAM "), /taken/);
});

test("„Porzuć zmiany” returns the copy to its base, reconciles the counts and zeroes the streak and the beaten attacks", () => {
  const before = editedAndRunning();
  assert.equal(before.run.streak, 10, "precondition: a streak of 10");
  const { state } = discardCopyChanges(before);
  assert.deepEqual(state.run.copy.program, EXPLORING);
  assert.deepEqual(state.run.copy.base, EXPLORING);
  assert.deepEqual(state.ruleCounts, { 1: 1 });
  assert.equal(state.run.streak, 0);
  assert.equal(state.run.defeatedAttacks, 0);
  assert.equal(copyHasUnsavedChanges(state), false);
  assert.deepEqual(state.programs, before.programs);
});

test("„Porzuć zmiany” starts again the count of a rule whose content the discard changes", () => {
  const wandering = setProgram(sentWith(EXPLORING), WANDERING).state;
  // The exploring in progress lasts 20 game minutes; after it the copy's rule wanders and fires.
  const running = advanceMinutes(wandering, 30).state;
  assert.ok(running.ruleCounts[1] > 0, "precondition: the rule has fired");
  const { state } = discardCopyChanges(running);
  assert.deepEqual(state.run.copy.program, EXPLORING);
  assert.deepEqual(state.ruleCounts, { 1: 0 });
});

test("„Porzuć zmiany” after death leaves the streak of the ended map run", () => {
  const { state } = discardCopyChanges(died(editedAndRunning()));
  assert.deepEqual(state.run.copy.program, EXPLORING);
  assert.equal(state.run.streak, 7);
  assert.deepEqual(state.ruleCounts, { 1: 1 });
});

test("„Porzuć zmiany” is refused without a map run, without unsaved changes and with the program gone", () => {
  assert.throws(() => discardCopyChanges(newGame()), /no map run/);
  assert.throws(
    () => discardCopyChanges(sentWith(EXPLORING)),
    /no unsaved changes/,
  );
  const edited = setProgram(
    withOthers(sentWith(EXPLORING)),
    EXPLORING_THEN_WANDERING,
  ).state;
  assert.throws(
    () => discardCopyChanges(deleteProgram(edited, 1).state),
    /gone/,
  );
});

test("a switch gives the map run a fresh copy of the other program, with the streak, the beaten attacks and the counts at zero", () => {
  const before = withOthers(editedAndRunning());
  assert.equal(before.run.streak, 10, "precondition: a streak of 10");
  const { state, events } = switchProgram(before, 3);
  assert.deepEqual(state.run.copy, {
    program: WANDERING,
    programId: 3,
    deletedName: null,
    base: WANDERING,
  });
  assert.equal(state.run.streak, 0);
  assert.equal(state.run.defeatedAttacks, 0);
  assert.deepEqual(state.ruleCounts, { 1: 0 });
  assert.equal(state.lastUsedPrograms[1], 3);
  assert.deepEqual(events, []);
});

test("a switch to a program of the same rules zeroes the streak as well", () => {
  const running = advanceMinutes(withOthers(sentWith(EXPLORING)), 10).state;
  assert.equal(running.run.streak, 10, "precondition: a streak of 10");
  const { state } = switchProgram(running, 4);
  assert.equal(state.run.streak, 0);
  assert.equal(state.run.copy.programId, 4);
});

test("a switch leaves the seed, the minute, the map, the body, the backpack and the action in progress, and the state around the map run", () => {
  const before = withOthers(editedAndRunning());
  const { state } = switchProgram(before, 3);
  const apart = (run) => ({
    ...run,
    copy: null,
    streak: null,
    defeatedAttacks: null,
  });
  assert.deepEqual(apart(state.run), apart(before.run));
  const around = (game) => ({
    ...game,
    run: null,
    ruleCounts: null,
    lastUsedPrograms: null,
  });
  assert.deepEqual(around(state), around(before));
});

test("a switch leaves the pause as it stands, a pause at a discovery included", () => {
  const found = withOthers(pausedAtDiscovery());
  assert.equal(found.paused, true, "precondition: paused at a discovery");
  assert.notEqual(found.discovery, null, "precondition: a discovery held");
  const switched = switchProgram(found, 3).state;
  assert.equal(switched.paused, true);
  assert.deepEqual(switched.discovery, found.discovery);
  const running = withOthers(editedAndRunning());
  assert.equal(switchProgram(running, 3).state.paused, false);
  const paused = setPaused(running, true).state;
  assert.equal(switchProgram(paused, 3).state.paused, true);
});

test("a switch is refused without a map run, after death, for a program not on the list and for the program of the copy", () => {
  const running = withOthers(editedAndRunning());
  assert.throws(() => switchProgram(newGame(), 1), /no map run/);
  assert.throws(() => switchProgram(died(running), 3), /ended/);
  assert.throws(() => switchProgram(running, 2), /no program 2/);
  assert.throws(() => switchProgram(running, 1), /already belongs/);
});

test("a switch is allowed where the copy's program is gone, to any program of the list", () => {
  const gone = deleteProgram(withOthers(editedAndRunning()), 1).state;
  const { state } = switchProgram(gone, 4);
  assert.equal(state.run.copy.programId, 4);
  assert.equal(state.run.copy.deletedName, null);
});

test("the rule the first chill writes is neither an unsaved change nor a change the save announces", () => {
  const found = pausedAtDiscovery();
  assert.deepEqual(found.programs[0].program.groups[0].rules, [
    { id: 1, condition: ALWAYS, action: { kind: "explore" } },
  ]);
  assert.deepEqual(found.run.copy.program, found.programs[0].program);
  assert.deepEqual(found.run.copy.base, found.programs[0].program);
  assert.equal(copyHasUnsavedChanges(found), false);
  assert.equal(programHasChangesCopyLacks(found), false);
});

test("no operation changes the state it is given", () => {
  const edited = deepFreeze(withOthers(editedAndRunning()));
  const ended = deepFreeze(died(withOthers(editedAndRunning())));
  assert.doesNotThrow(() => saveCopyIntoProgram(edited));
  assert.doesNotThrow(() => saveCopyAsNewProgram(edited, "Nocna"));
  assert.doesNotThrow(() => discardCopyChanges(edited));
  assert.doesNotThrow(() => switchProgram(edited, 3));
  assert.doesNotThrow(() => saveCopyIntoProgram(ended));
  assert.doesNotThrow(() => copyHasUnsavedChanges(edited));
  assert.doesNotThrow(() => programHasChangesCopyLacks(edited));
});
