// The operations on a manual map run's copy: the two measures of its record, the saves, the
// discard and the switch. Expectations come from D-93, D-131, D-136, D-164, D-171 and D-174 in
// foundations/decisions.md. Every expected value is written out here.
import assert from "node:assert/strict";
import { test } from "node:test";
import {
  advanceMinutes,
  createCharacter,
  newGame,
  send,
  setPaused,
  setProgram,
} from "../../dist/browser/sim/game.js";
import {
  copyHasUnsavedChanges,
  deleteProgram,
  discardCopyChanges,
  editProgram,
  programHasChangesCopyLacks,
  saveCopyAsNewProgram,
  saveCopyIntoProgram,
  switchProgram,
} from "../../dist/browser/sim/programs.js";
import { programFromRules } from "./program-fixture.mjs";
import { newKnowingGame, withEdgeSolved } from "./understanding-fixture.mjs";

const MAP_ID = "forest";
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
  const made = createCharacter(withEdgeSolved(newKnowingGame()), "Ala").state;
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
    createCharacter(withEdgeSolved(newGame()), "Ala").state,
    { mapId: MAP_ID, characterId: 1, programId: 1 },
    REAL_MS,
  ).state;
  return advanceMinutes(sent, 100).state;
}

test("„Zapisz w programie” after an edit of the copy gives the program the copy's content and leaves the streak", () => {
  // decision: D-164 "A change made during a map run goes into the copy and reaches the program only when the player saves it there or as a new program, or is dropped when the player discards it or switches the character to another program"
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
  // decision: D-171 "While the copy's program is on the player's list and the copy differs from it as the copy was taken from it or last saved into it, the line „Niezapisane zmiany w kopii.” stands under the heading in the role `warning` and „Zapisz w programie”, „Zapisz jako nowy program” and „Porzuć zmiany” are active, and while it is the same, the line is gone and the three buttons are inactive"
  // decision: D-172 "While the program the copy belongs to holds changes made since the copy was taken from it or last saved into it, a line in the role `warning` beside the save buttons reads „Program {name} ma zmiany, których nie ma w tej kopii.” where the copy holds no unsaved changes and „Program {name} ma zmiany, których nie ma w tej kopii — zapis w programie je zastąpi.” where it holds some; „Zapisz w programie” then saves at once, in one click, and after the save the line is gone"
  const sent = sentWith(EXPLORING);
  assert.equal(copyHasUnsavedChanges(sent), false);
  assert.equal(programHasChangesCopyLacks(sent), false);
  assert.equal(copyHasUnsavedChanges(newGame()), false);
  assert.equal(programHasChangesCopyLacks(newGame()), false);
});

test("an edit of the copy makes it unsaved, and an edit put back makes it equal again", () => {
  // decision: D-171 "While the copy's program is on the player's list and the copy differs from it as the copy was taken from it or last saved into it, the line „Niezapisane zmiany w kopii.” stands under the heading in the role `warning` and „Zapisz w programie”, „Zapisz jako nowy program” and „Porzuć zmiany” are active, and while it is the same, the line is gone and the three buttons are inactive"
  const edited = setProgram(sentWith(EXPLORING), EXPLORING_THEN_WANDERING);
  assert.equal(copyHasUnsavedChanges(edited.state), true);
  assert.equal(programHasChangesCopyLacks(edited.state), false);
  const back = setProgram(edited.state, EXPLORING).state;
  assert.equal(copyHasUnsavedChanges(back), false);
});

test("a rule added and then deleted still counts as an unsaved change, the identity counter having moved", () => {
  // decision: D-171 "While the copy's program is on the player's list and the copy differs from it as the copy was taken from it or last saved into it, the line „Niezapisane zmiany w kopii.” stands under the heading in the role `warning` and „Zapisz w programie”, „Zapisz jako nowy program” and „Porzuć zmiany” are active, and while it is the same, the line is gone and the three buttons are inactive"
  const added = setProgram(sentWith(EXPLORING), EXPLORING_THEN_WANDERING);
  const deleted = setProgram(added.state, { ...EXPLORING, nextRuleId: 3 });
  assert.deepEqual(deleted.state.run.copy.program.groups, EXPLORING.groups);
  assert.equal(copyHasUnsavedChanges(deleted.state), true);
});

test("an edit of the program the copy came from makes the program hold changes the copy lacks, and an edit put back does not", () => {
  // decision: D-172 "While the program the copy belongs to holds changes made since the copy was taken from it or last saved into it, a line in the role `warning` beside the save buttons reads „Program {name} ma zmiany, których nie ma w tej kopii.” where the copy holds no unsaved changes and „Program {name} ma zmiany, których nie ma w tej kopii — zapis w programie je zastąpi.” where it holds some; „Zapisz w programie” then saves at once, in one click, and after the save the line is gone"
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
  // decision: D-168 "„Zapisz w programie” and „Porzuć zmiany” are then gone, and the copy counts as holding unsaved changes: the line „Niezapisane zmiany w kopii.” stands and „Zapisz jako nowy program” is active until the copy is saved as a new program"
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
  // decision: D-93 "The count starts from zero at the start of each manual map run, a map run restart included, at a switch of the character to another program, and when the program rule's condition or action changes; it survives reordering the rule, moving it to another rule group, changing its group's condition or name, and a save of the copy"
  // decision: D-171 "While the copy's program is on the player's list and the copy differs from it as the copy was taken from it or last saved into it, the line „Niezapisane zmiany w kopii.” stands under the heading in the role `warning` and „Zapisz w programie”, „Zapisz jako nowy program” and „Porzuć zmiany” are active, and while it is the same, the line is gone and the three buttons are inactive"
  // decision: D-172 "While the program the copy belongs to holds changes made since the copy was taken from it or last saved into it, a line in the role `warning` beside the save buttons reads „Program {name} ma zmiany, których nie ma w tej kopii.” where the copy holds no unsaved changes and „Program {name} ma zmiany, których nie ma w tej kopii — zapis w programie je zastąpi.” where it holds some; „Zapisz w programie” then saves at once, in one click, and after the save the line is gone"
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
  // decision: D-164 "A change made during a map run goes into the copy and reaches the program only when the player saves it there or as a new program, or is dropped when the player discards it or switches the character to another program"
  // decision: D-172 "While the program the copy belongs to holds changes made since the copy was taken from it or last saved into it, a line in the role `warning` beside the save buttons reads „Program {name} ma zmiany, których nie ma w tej kopii.” where the copy holds no unsaved changes and „Program {name} ma zmiany, których nie ma w tej kopii — zapis w programie je zastąpi.” where it holds some; „Zapisz w programie” then saves at once, in one click, and after the save the line is gone"
  const before = editProgram(editedAndRunning(), 1, WANDERING).state;
  assert.equal(programHasChangesCopyLacks(before), true);
  const { state } = saveCopyIntoProgram(before);
  assert.deepEqual(state.programs[0].program, EXPLORING_THEN_WANDERING);
  assert.equal(programHasChangesCopyLacks(state), false);
});

test("„Zapisz w programie” is allowed after death and keeps the streak of the ended map run", () => {
  // decision: D-173 "On the screens after a character's death and after a completion, editing the copy, „Zapisz w programie”, „Zapisz jako nowy program” and „Porzuć zmiany” act as during the map run until the player picks „Restart” or ends the map run with „Zakończ” or „Otwarte: {mapa} →”"
  const { state } = saveCopyIntoProgram(died(editedAndRunning()));
  assert.deepEqual(state.programs[0].program, EXPLORING_THEN_WANDERING);
  assert.equal(state.run.streak, 7);
});

test("„Zapisz w programie” is refused without a map run, without unsaved changes and with the program gone", () => {
  // decision: D-168 "„Zapisz w programie” and „Porzuć zmiany” are then gone, and the copy counts as holding unsaved changes: the line „Niezapisane zmiany w kopii.” stands and „Zapisz jako nowy program” is active until the copy is saved as a new program"
  // decision: D-171 "While the copy's program is on the player's list and the copy differs from it as the copy was taken from it or last saved into it, the line „Niezapisane zmiany w kopii.” stands under the heading in the role `warning` and „Zapisz w programie”, „Zapisz jako nowy program” and „Porzuć zmiany” are active, and while it is the same, the line is gone and the three buttons are inactive"
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
  // decision: D-171 "„Zapisz jako nowy program” offers the first free name of a program, and after that save the copy belongs to the new program, which becomes the program the character used last"
  // decision: D-165 "Each program of the player carries a number the game gives it when the program is created, one more than the number the game state gave last"
  // decision: D-164 "A change made during a map run goes into the copy and reaches the program only when the player saves it there or as a new program, or is dropped when the player discards it or switches the character to another program"
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

// invariant: copy-save
test("„Zapisz jako nowy program” is no switch: the streak, the beaten attacks, the counts and the entered-with program stay", () => {
  // decision: D-93 "The count starts from zero at the start of each manual map run, a map run restart included, at a switch of the character to another program, and when the program rule's condition or action changes; it survives reordering the rule, moving it to another rule group, changing its group's condition or name, and a save of the copy"
  const before = withOthers(editedAndRunning());
  assert.equal(before.run.streak, 10, "precondition: a streak of 10");
  const { state } = saveCopyAsNewProgram(before, "Nocna");
  assert.equal(state.run.streak, 10);
  assert.equal(state.run.defeatedAttacks, before.run.defeatedAttacks);
  assert.deepEqual(state.ruleCounts, { 1: 1, 2: 0 });
  assert.equal(state.lastEnteredProgram, before.lastEnteredProgram);
});

test("„Zapisz jako nowy program” works where the program is gone and after death", () => {
  // decision: D-168 "„Zapisz w programie” and „Porzuć zmiany” are then gone, and the copy counts as holding unsaved changes: the line „Niezapisane zmiany w kopii.” stands and „Zapisz jako nowy program” is active until the copy is saved as a new program"
  // decision: D-173 "On the screens after a character's death and after a completion, editing the copy, „Zapisz w programie”, „Zapisz jako nowy program” and „Porzuć zmiany” act as during the map run until the player picks „Restart” or ends the map run with „Zakończ” or „Otwarte: {mapa} →”"
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
  // decision: D-169 "A program's name is the typed text trimmed of the white space at its start and end, and it is not empty; the game takes no name another program bears, comparing names regardless of letter case, and sets no limit to a name's length"
  // decision: D-171 "While the copy's program is on the player's list and the copy differs from it as the copy was taken from it or last saved into it, the line „Niezapisane zmiany w kopii.” stands under the heading in the role `warning` and „Zapisz w programie”, „Zapisz jako nowy program” and „Porzuć zmiany” are active, and while it is the same, the line is gone and the three buttons are inactive"
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
  // decision: D-131 "Of the edits of the copy a map run carries out, an edit after which the copy's rules or rule groups differ from those before it, the discard of the copy's unsaved changes included, sets the streak and the number of beaten attacks of the map run in progress to zero"
  // decision: D-164 "A change made during a map run goes into the copy and reaches the program only when the player saves it there or as a new program, or is dropped when the player discards it or switches the character to another program"
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
  // decision: D-93 "The count starts from zero at the start of each manual map run, a map run restart included, at a switch of the character to another program, and when the program rule's condition or action changes; it survives reordering the rule, moving it to another rule group, changing its group's condition or name, and a save of the copy"
  const wandering = setProgram(sentWith(EXPLORING), WANDERING).state;
  // The exploring in progress lasts 20 game minutes; after it the copy's rule wanders and fires.
  const running = advanceMinutes(wandering, 30).state;
  assert.ok(running.ruleCounts[1] > 0, "precondition: the rule has fired");
  const { state } = discardCopyChanges(running);
  assert.deepEqual(state.run.copy.program, EXPLORING);
  assert.deepEqual(state.ruleCounts, { 1: 0 });
});

test("„Porzuć zmiany” after death leaves the streak of the ended map run", () => {
  // decision: D-131 "Of the edits of the copy a map run carries out, an edit after which the copy's rules or rule groups differ from those before it, the discard of the copy's unsaved changes included, sets the streak and the number of beaten attacks of the map run in progress to zero"
  // decision: D-173 "On the screens after a character's death and after a completion, editing the copy, „Zapisz w programie”, „Zapisz jako nowy program” and „Porzuć zmiany” act as during the map run until the player picks „Restart” or ends the map run with „Zakończ” or „Otwarte: {mapa} →”"
  const { state } = discardCopyChanges(died(editedAndRunning()));
  assert.deepEqual(state.run.copy.program, EXPLORING);
  assert.equal(state.run.streak, 7);
  assert.deepEqual(state.ruleCounts, { 1: 1 });
});

test("„Porzuć zmiany” is refused without a map run, without unsaved changes and with the program gone", () => {
  // decision: D-168 "„Zapisz w programie” and „Porzuć zmiany” are then gone, and the copy counts as holding unsaved changes: the line „Niezapisane zmiany w kopii.” stands and „Zapisz jako nowy program” is active until the copy is saved as a new program"
  // decision: D-171 "While the copy's program is on the player's list and the copy differs from it as the copy was taken from it or last saved into it, the line „Niezapisane zmiany w kopii.” stands under the heading in the role `warning` and „Zapisz w programie”, „Zapisz jako nowy program” and „Porzuć zmiany” are active, and while it is the same, the line is gone and the three buttons are inactive"
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
  // decision: D-164 "Programs belong to the player, as one list shared by all characters; a character picks a program when it enters a map — by default the one it used last — and a manual map run or an earning loop carries out a copy taken at its start"
  // decision: D-164 "A change made during a map run goes into the copy and reaches the program only when the player saves it there or as a new program, or is dropped when the player discards it or switches the character to another program"
  // decision: D-164 "A program can be edited at any time, and its saved change takes effect at the next manual map entry other than a map run restart, at the next switch to it during a manual map run or at the next start of an earning loop"
  // decision: D-93 "The count starts from zero at the start of each manual map run, a map run restart included, at a switch of the character to another program, and when the program rule's condition or action changes; it survives reordering the rule, moving it to another rule group, changing its group's condition or name, and a save of the copy"
  // decision: D-170 "The list shows the first program still on the player's list of these: the program picked for that character before it is sent, which stays with the character until it is sent; the program that character used last, the program it was switched to during a map run included; the program with which any character last entered a map; the first program of the player's list"
  // decision: D-341 "A loss of the streak gives an entry of the chronicle only where a streak above zero falls to zero"
  // decision: D-348 "The chronicle learns what happened in a game minute from the events the simulation returns"
  // decision: D-348 "The browser view describes an act of the player on the copy"
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
  // D-341: a switch that sets a streak above zero to zero returns the loss of the streak, at the
  // map run's minute, as its one event.
  assert.deepEqual(events, [
    { kind: "streakLost", minute: 10, streak: 10, cause: "programSwitched" },
  ]);
});

test("a switch to a program of the same rules zeroes the streak as well", () => {
  const running = advanceMinutes(withOthers(sentWith(EXPLORING)), 10).state;
  assert.equal(running.run.streak, 10, "precondition: a streak of 10");
  const { state } = switchProgram(running, 4);
  assert.equal(state.run.streak, 0);
  assert.equal(state.run.copy.programId, 4);
});

test("a switch leaves the seed, the minute, the map, the body, the backpack and the action in progress, and the state around the map run", () => {
  // decision: D-164 "Programs belong to the player, as one list shared by all characters; a character picks a program when it enters a map — by default the one it used last — and a manual map run or an earning loop carries out a copy taken at its start"
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
  // decision: D-164 "Programs belong to the player, as one list shared by all characters; a character picks a program when it enters a map — by default the one it used last — and a manual map run or an earning loop carries out a copy taken at its start"
  const running = withOthers(editedAndRunning());
  assert.throws(() => switchProgram(newGame(), 1), /no map run/);
  assert.throws(() => switchProgram(died(running), 3), /ended/);
  assert.throws(() => switchProgram(running, 2), /no program 2/);
  assert.throws(() => switchProgram(running, 1), /already belongs/);
});

test("a switch is allowed where the copy's program is gone, to any program of the list", () => {
  // decision: D-174 "During a map run, picking a saved program on the program panel's list opens it for editing, and while the panel shows a saved program other than the program the copy belongs to, the button „Przełącz postać na ten program” stands under the list; its click switches the character to that program at once, and the panel shows „Kopia w przejściu” again"
  const gone = deleteProgram(withOthers(editedAndRunning()), 1).state;
  const { state } = switchProgram(gone, 4);
  assert.equal(state.run.copy.programId, 4);
  assert.equal(state.run.copy.deletedName, null);
});

test("the rule the first chill writes is neither an unsaved change nor a change the save announces", () => {
  // decision: D-123 "A program rule the game writes at a discovery goes into the first rule group of the copy the map run carries out and into the first rule group of the program the copy belongs to"
  // decision: D-123 "The game writes one such rule, „Zawsze → Eksploruj”, at the first chill"
  // decision: D-123 "The rule so written counts neither as an unsaved change of the copy nor as a change of the program that a save of the copy announces"
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

// The loss of the streak as an event (D-341, D-131): one
// `streakLost` where an act sets a streak above zero to zero, none where it leaves it or where it
// stood at zero. Every expected streak and minute is written out from the fixtures above.

const lossesIn = (events) =>
  events.filter((event) => event.kind === "streakLost");
const entry = (item, count) => ({ item, count });

test("an edit of the copy that changes its rules, at a streak above zero, returns one loss of the streak with the cause of the change", () => {
  // decision: D-341 "A loss of the streak gives an entry of the chronicle only where a streak above zero falls to zero"
  // decision: D-348 "The chronicle learns what happened in a game minute from the events the simulation returns"
  // decision: D-348 "The browser view describes an act of the player on the copy"
  const running = advanceMinutes(sentWith(EXPLORING), 10).state;
  assert.equal(running.run.streak, 10, "precondition: a streak of 10");
  const { state, events } = setProgram(running, EXPLORING_THEN_WANDERING);
  assert.equal(state.run.streak, 0);
  assert.deepEqual(events, [
    { kind: "streakLost", minute: 10, streak: 10, cause: "programChanged" },
  ]);
});

test("an edit of the copy that changes a rule group's name or a rule's action returns the loss too", () => {
  const running = advanceMinutes(sentWith(EXPLORING), 10).state;
  const renamed = {
    ...EXPLORING,
    groups: [{ ...EXPLORING.groups[0], name: "Inna" }],
  };
  assert.equal(lossesIn(setProgram(running, renamed).events).length, 1);
  assert.equal(lossesIn(setProgram(running, WANDERING).events).length, 1);
});

test("an edit of the copy at a streak of zero returns no loss", () => {
  // decision: D-341 "A loss of the streak gives an entry of the chronicle only where a streak above zero falls to zero"
  // decision: D-348 "The browser view describes an act of the player on the copy"
  const sent = sentWith(EXPLORING);
  assert.equal(sent.run.streak, 0, "precondition: a streak of 0");
  const { state, events } = setProgram(sent, EXPLORING_THEN_WANDERING);
  assert.equal(state.run.streak, 0);
  assert.deepEqual(events, []);
});

test("an edit of the copy that leaves its rules and rule groups, or changes only the trip plan, returns no loss", () => {
  // decision: D-131 "Of the edits of the copy a map run carries out, an edit after which the copy's rules or rule groups differ from those before it, the discard of the copy's unsaved changes included, sets the streak and the number of beaten attacks of the map run in progress to zero — adding, deleting or reordering a program rule, changing its condition or action, and changing a rule group — also while the map run is paused; an act of the program editor after which the copy is the same as before it, an edit or discard changing the trip plan alone, a save of the copy and an edit of a saved program leave the streak as it stands, together with the number of beaten attacks"
  // decision: D-341 "A loss of the streak gives an entry of the chronicle only where a streak above zero falls to zero"
  // decision: D-348 "The browser view describes an act of the player on the copy"
  const running = advanceMinutes(sentWith(EXPLORING), 10).state;
  const same = setProgram(running, EXPLORING);
  assert.equal(same.state.run.streak, 10);
  assert.deepEqual(same.events, []);
  const tripOnly = {
    ...EXPLORING,
    tripPlan: { take: [entry("moss", 5)], bring: [entry("stick", 4)] },
  };
  const trip = setProgram(running, tripOnly);
  assert.equal(trip.state.run.streak, 10);
  assert.deepEqual(trip.events, []);
});

test("an edit of the copy after the end of the map run returns no loss, the streak standing", () => {
  // decision: D-341 "A loss of the streak gives an entry of the chronicle only where a streak above zero falls to zero"
  // decision: D-348 "The browser view describes an act of the player on the copy"
  const { state, events } = setProgram(died(editedAndRunning()), EXPLORING);
  assert.equal(state.run.streak, 7);
  assert.deepEqual(events, []);
});

test("„Porzuć zmiany” at a streak above zero returns one loss of the streak, none at a streak of zero or after the end", () => {
  // decision: D-341 "A loss of the streak gives an entry of the chronicle only where a streak above zero falls to zero"
  // decision: D-348 "The chronicle learns what happened in a game minute from the events the simulation returns"
  // decision: D-348 "The browser view describes an act of the player on the copy"
  const before = editedAndRunning();
  assert.equal(before.run.streak, 10, "precondition: a streak of 10");
  const { events } = discardCopyChanges(before);
  assert.deepEqual(events, [
    { kind: "streakLost", minute: 10, streak: 10, cause: "programChanged" },
  ]);
  const atZero = setProgram(sentWith(EXPLORING), EXPLORING_THEN_WANDERING);
  assert.deepEqual(discardCopyChanges(atZero.state).events, []);
  assert.deepEqual(discardCopyChanges(died(before)).events, []);
});

test("a save of the copy, as it is or as a new program, and an edit of a saved program return no loss of the streak", () => {
  // decision: D-341 "A loss of the streak gives an entry of the chronicle only where a streak above zero falls to zero"
  // decision: D-348 "The browser view describes an act of the player on the copy"
  const before = withOthers(editedAndRunning());
  assert.deepEqual(saveCopyIntoProgram(before).events, []);
  assert.deepEqual(saveCopyAsNewProgram(before, "Nocna").events, []);
  assert.deepEqual(editProgram(before, 3, EXPLORING).events, []);
});

test("a switch at a streak of zero returns no loss of the streak", () => {
  // decision: D-341 "A loss of the streak gives an entry of the chronicle only where a streak above zero falls to zero"
  // decision: D-348 "The browser view describes an act of the player on the copy"
  const sent = withOthers(sentWith(EXPLORING));
  assert.equal(sent.run.streak, 0, "precondition: a streak of 0");
  assert.deepEqual(switchProgram(sent, 3).events, []);
});

test("a switch to a program of the same rules at a streak above zero returns the loss", () => {
  // decision: D-341 "A loss of the streak gives an entry of the chronicle only where a streak above zero falls to zero"
  // decision: D-348 "The chronicle learns what happened in a game minute from the events the simulation returns"
  // decision: D-348 "The browser view describes an act of the player on the copy"
  const running = advanceMinutes(withOthers(sentWith(EXPLORING)), 10).state;
  assert.deepEqual(switchProgram(running, 4).events, [
    { kind: "streakLost", minute: 10, streak: 10, cause: "programSwitched" },
  ]);
});
