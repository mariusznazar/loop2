import assert from "node:assert/strict";
import test from "node:test";
import {
  createCharacter,
  newGame,
  send,
  restart,
  end,
  setProgram,
  advanceMinutes,
} from "../../dist/public/sim/game.js";
import {
  emptyProgram,
  editProgram,
  discardCopyChanges,
  copyHasUnsavedChanges,
  createProgram,
  switchProgram,
  checkProgram,
  saveCopyIntoProgram,
  saveCopyAsNewProgram,
  programHasChangesCopyLacks,
} from "../../dist/public/sim/programs.js";
import { programFromRules } from "./program-fixture.mjs";
import { fullUnderstanding } from "./understanding-fixture.mjs";
import { MAPS } from "../../dist/public/sim/data/maps.js";
import { buyBranch } from "../../dist/public/sim/skills.js";
import {
  clipTrip,
  takeFromNowhere,
  takeTrip,
  tripLoot,
  tripEntryCut,
} from "../../dist/public/sim/trip.js";

const entry = (item, count) => ({ item, count });

function freeze(value) {
  if (value && typeof value === "object") {
    for (const child of Object.values(value)) freeze(child);
    Object.freeze(value);
  }
  return value;
}
function equipped() {
  let state = createCharacter(newGame(), "Tester").state;
  state = {
    ...state,
    team: {
      ...state.team,
      chest: { pieces: { stick: 10, berry: 10, moss: 2 } },
    },
  };
  const program = {
    ...emptyProgram(),
    tripPlan: {
      take: [entry("stick", 8), entry("berry", 9)],
      bring: [entry("berry", 9), entry("stick", 8)],
    },
  };
  return editProgram(state, 1, program).state;
}
function sent(state = equipped()) {
  return send(state, { mapId: "forest", characterId: 1 }, 23).state;
}

// Catches a merge losing the skill snapshot, equipment, or either completion payment.
test("a bought branch acts on entry equipment and completion pays practice and loot once", () => {
  let state = equipped();
  state = {
    ...state,
    understanding: fullUnderstanding(),
    team: {
      ...state.team,
      characters: state.team.characters.map((character) => ({
        ...character,
        skills: {
          ...character.skills,
          eating: { practice: 15, ranks: {} },
        },
      })),
    },
  };
  state = buyBranch(state, 1, "quickMeal").state;
  state = editProgram(state, 1, {
    ...programFromRules({
      condition: { kind: "always" },
      action: { kind: "eat" },
    }),
    tripPlan: { take: [entry("berry", 3)], bring: [entry("berry", 3)] },
  }).state;
  const started = sent(state);
  assert.equal(started.run.current.endMinute, 4);
  assert.equal(started.run.character.backpack.berry, 3);
  assert.equal(started.team.chest.pieces.berry, 7);
  const completed = advanceMinutes(
    {
      ...started,
      run: { ...started.run, streak: 476 },
    },
    4,
  ).state;
  assert.ok(completed.run.completion);
  assert.deepEqual(completed.run.practice, { eating: 1 });
  assert.equal(completed.team.characters[0].skills.eating.practice, 16);
  assert.equal(completed.run.character.skills.eating.practice, 15);
  assert.deepEqual(completed.run.deposited, [entry("berry", 2)]);
  assert.equal(completed.team.chest.pieces.berry, 9);
  assert.deepEqual(advanceMinutes(completed, 10).state, completed);
  // The completion solved the map, so the restart is a manual run of a solved map (To do 3, 5): it
  // takes its three berries from nowhere and leaves the chest at 9, not 6.
  const restarted = restart(completed).state;
  assert.deepEqual(restarted.run.practice, {});
  assert.equal(restarted.run.character.skills.eating.practice, 15);
  assert.equal(restarted.team.characters[0].skills.eating.practice, 16);
  assert.equal(restarted.run.current.endMinute, 4);
  assert.equal(restarted.run.character.backpack.berry, 3);
  assert.equal(restarted.team.chest.pieces.berry, 9);
  assert.deepEqual(restarted.run.bringPlan, [entry("berry", 3)]);
});
// Each expected clipping is hand-counted from To do 4–6 of plan_wyprawy_loop2.md.
test("entry spends one budget in order, shortages leave room and partial rows fit", () => {
  // invariant: trip-transfer
  assert.deepEqual(
    clipTrip(
      [entry("moss", 10), entry("stick", 10), entry("berry", 10)],
      { moss: 2, stick: 10, berry: 10 },
      7,
    ),
    [entry("moss", 2), entry("stick", 5)],
  );
  const state = sent();
  assert.deepEqual(state.run.character.backpack, {
    stick: 8,
    berry: 7,
    moss: 0,
    fiber: 0,
  });
  assert.deepEqual(state.team.chest.pieces, { stick: 2, berry: 3, moss: 2 });
  assert.equal(state.run.minute, 0);
});
test("editing or discarding only a trip plan preserves solving progress and rule counts", () => {
  // invariant: trip-plan-progress
  let state = sent();
  state = setProgram(state, {
    ...programFromRules({
      condition: { kind: "always" },
      action: { kind: "explore" },
    }),
    tripPlan: state.run.copy.program.tripPlan,
  }).state;
  state = saveCopyIntoProgram(state).state;
  state = {
    ...state,
    run: { ...state.run, streak: 123, defeatedAttacks: 2 },
    ruleCounts: { 1: 4 },
  };
  const changed = setProgram(state, {
    ...state.run.copy.program,
    tripPlan: { take: [], bring: [entry("moss", 4)] },
  }).state;
  assert.equal(changed.run.streak, 123);
  assert.equal(changed.run.defeatedAttacks, 2);
  assert.deepEqual(changed.ruleCounts, { 1: 4 });
  assert.equal(copyHasUnsavedChanges(changed), true);
  assert.deepEqual(changed.run.bringPlan, [
    entry("berry", 9),
    entry("stick", 8),
  ]);
  const discarded = discardCopyChanges(changed).state;
  assert.equal(discarded.run.streak, 123);
  assert.equal(discarded.run.defeatedAttacks, 2);
  assert.deepEqual(discarded.ruleCounts, { 1: 4 });
  assert.equal(copyHasUnsavedChanges(discarded), false);
});
test("completion deposits the frozen list once, and end never deposits again", () => {
  // invariant: trip-transfer
  let state = sent();
  state = { ...state, run: { ...state.run, streak: 479 } };
  state = setProgram(state, {
    ...state.run.copy.program,
    tripPlan: { take: [], bring: [entry("moss", 2)] },
  }).state;
  const finished = advanceMinutes(state, 1).state;
  assert.ok(finished.run.completion);
  assert.deepEqual(finished.run.deposited, [
    entry("berry", 7),
    entry("stick", 8),
  ]);
  assert.deepEqual(finished.team.chest.pieces, {
    stick: 10,
    berry: 10,
    moss: 2,
  });
  assert.deepEqual(
    advanceMinutes(finished, 10).state.team.chest,
    finished.team.chest,
  );
  assert.deepEqual(end(finished).state.team.chest, finished.team.chest);
});

// Catches skipping a map cap, charging a shortage against the shared budget, or mutating stock.
test("entry caps, including zero, affect equipment independently of exit caps", () => {
  const plan = { take: [entry("moss", 9), entry("berry", 9)], bring: [] };
  const chest = { pieces: { berry: 20 } };
  const before = structuredClone(chest);
  assert.deepEqual(
    takeTrip(plan, chest, 15, { ...MAPS.forest, carryIn: 4, carryOut: 0 }),
    {
      chest: { pieces: { berry: 16 } },
      backpack: { stick: 0, berry: 4, moss: 0, fiber: 0 },
    },
  );
  assert.equal(
    takeTrip(plan, chest, 15, { ...MAPS.forest, carryIn: 0 }).backpack.berry,
    0,
  );
  assert.equal(takeTrip(plan, chest, 3, MAPS.forest).backpack.berry, 3);
  assert.deepEqual(chest, before);
});

test("exit spends chest room and map capacity in snapshot order, with partial rows", () => {
  const run = sent().run;
  assert.deepEqual(tripLoot(run, { pieces: { moss: 55 } }, MAPS.forest), [
    entry("berry", 5),
  ]);
  assert.deepEqual(
    tripLoot(run, { pieces: {} }, { ...MAPS.forest, carryOut: 9, carryIn: 0 }),
    [entry("berry", 7), entry("stick", 2)],
  );
  assert.deepEqual(tripLoot(run, { pieces: { moss: 60 } }, MAPS.forest), []);
  assert.deepEqual(
    tripLoot(run, { pieces: {} }, { ...MAPS.forest, carryOut: 0 }),
    [],
  );
  const small = {
    ...run,
    character: {
      ...run.character,
      traits: { ...run.character.traits, carryingCapacity: 2 },
    },
  };
  assert.deepEqual(tripLoot(small, { pieces: {} }, MAPS.forest), [
    entry("berry", 2),
  ]);
  assert.deepEqual(
    tripLoot(
      { ...run, bringPlan: [entry("fiber", 20), entry("stick", 10)] },
      { pieces: {} },
      MAPS.forest,
    ),
    [entry("stick", 8)],
  );
});

test("warnings compare desired pieces and carrying capacity to the map, ignoring stock", () => {
  const plan = equipped().programs[0].program.tripPlan;
  assert.equal(tripEntryCut(plan, 15, MAPS.forest), false);
  assert.equal(tripEntryCut(plan, 15, { ...MAPS.forest, carryIn: 15 }), false);
  assert.equal(tripEntryCut(plan, 15, { ...MAPS.forest, carryIn: 14 }), true);
  assert.equal(
    tripEntryCut({ take: [], bring: [] }, 15, { ...MAPS.forest, carryIn: 0 }),
    false,
  );
  assert.equal(
    tripEntryCut({ take: [entry("stick", 4)], bring: [] }, 15, {
      ...MAPS.forest,
      carryIn: 4,
    }),
    false,
  );
});

test("restart uses the unsaved copy and current stock; unfinished end and death return nothing", () => {
  // invariant: trip-run-end
  let state = sent();
  const chestAfterEntry = structuredClone(state.team.chest);
  assert.deepEqual(end(state).state.team.chest, chestAfterEntry);
  const dying = {
    ...state,
    run: { ...state.run, body: { temperature: 34, satiety: 50, health: 0.1 } },
  };
  const dead = advanceMinutes(dying, 1).state;
  assert.ok(dead.run.death);
  assert.deepEqual(dead.team.chest, chestAfterEntry);
  assert.equal(dead.run.deposited, null);
  assert.deepEqual(dead.run.character.backpack, state.run.character.backpack);
  state = setProgram(state, {
    ...state.run.copy.program,
    tripPlan: { take: [entry("berry", 8)], bring: [entry("stick", 4)] },
  }).state;
  const restarted = restart(state).state;
  assert.deepEqual(restarted.run.character.backpack, {
    stick: 0,
    berry: 3,
    moss: 0,
    fiber: 0,
  });
  assert.deepEqual(restarted.team.chest.pieces, {
    stick: 2,
    berry: 0,
    moss: 2,
  });
  assert.deepEqual(restarted.run.bringPlan, [entry("stick", 4)]);
  assert.equal(copyHasUnsavedChanges(restarted), true);
  assert.equal(restarted.run.seed, state.run.seed);
});

test("saved plan edits stay out of the copy; saves and overwrite detection include both lists", () => {
  let state = sent();
  const original = structuredClone(state.run.copy.program);
  state = editProgram(state, 1, {
    ...original,
    tripPlan: { take: [], bring: [] },
  }).state;
  assert.deepEqual(state.run.copy.program, original);
  assert.equal(programHasChangesCopyLacks(state), true);
  state = setProgram(state, {
    ...original,
    tripPlan: { take: [entry("moss", 2)], bring: [] },
  }).state;
  const saved = saveCopyIntoProgram(state).state;
  assert.deepEqual(saved.programs[0].program.tripPlan, {
    take: [entry("moss", 2)],
    bring: [],
  });
  assert.equal(copyHasUnsavedChanges(saved), false);
  assert.equal(programHasChangesCopyLacks(saved), false);
  const asNew = saveCopyAsNewProgram(state, "Wyjście").state;
  assert.deepEqual(
    asNew.programs.at(-1).program.tripPlan,
    state.run.copy.program.tripPlan,
  );
});

test("switching programs retains the entry snapshot, including on solved-map runs", () => {
  // invariant: trip-transfer
  let state = equipped();
  state = { ...state, solvedMaps: ["forest"] };
  state = createProgram(state).state;
  state = send(
    state,
    { mapId: "forest", characterId: 1, programId: 1 },
    23,
  ).state;
  // A run of a solved map takes from nowhere (To do 5): the chest keeps its ten sticks.
  assert.equal(state.team.chest.pieces.stick, 10);
  assert.equal(state.run.character.backpack.stick, 8);
  const switched = switchProgram(state, 2).state;
  assert.deepEqual(switched.run.copy.program.tripPlan, { take: [], bring: [] });
  assert.deepEqual(switched.run.bringPlan, [
    entry("berry", 9),
    entry("stick", 8),
  ]);
  const finished = advanceMinutes(
    { ...switched, run: { ...switched.run, streak: 479 } },
    1,
  ).state;
  assert.ok(finished.run.completion);
  // The marked run deposits nothing (To do 2), so the chest is as it was.
  assert.deepEqual(finished.run.deposited, []);
  assert.equal(finished.team.chest.pieces.stick, 10);
});

test("unlisted and clipped contents of a completed backpack cannot fund a subsequent run that takes from the chest", () => {
  // invariant: trip-run-end
  let state = equipped();
  const original = state.programs[0].program;
  state = editProgram(state, 1, {
    ...original,
    tripPlan: { ...original.tripPlan, bring: [entry("stick", 2)] },
  }).state;
  state = sent(state);
  const finished = advanceMinutes(
    { ...state, run: { ...state.run, streak: 479 } },
    1,
  ).state;
  assert.deepEqual(finished.team.chest.pieces, { stick: 4, berry: 3, moss: 2 });
  // The restart follows the completion that solved forest, so it takes from nowhere (To do 3, 5).
  // A later run that takes from the chest starts on the still unsolved forestDeep: its backpack
  // holds the chest's four sticks and three berries, none of the leftovers of the completed run.
  const next = send(
    end(finished).state,
    { mapId: "forestDeep", characterId: 1 },
    23,
  ).state;
  assert.equal(next.run.solvedMapRun, false);
  assert.deepEqual(next.run.character.backpack, {
    stick: 4,
    berry: 3,
    moss: 0,
    fiber: 0,
  });
  assert.deepEqual(next.team.chest.pieces, { stick: 0, berry: 0, moss: 2 });
});

// Weakest point: no live map currently sets these caps, so test the real lifecycle with test data.
test("zero map entry cap still allows gathering, and completion clips that minute's gathered loot", () => {
  // invariant: trip-transfer
  const original = MAPS.forest;
  MAPS.forest = { ...original, carryIn: 0, carryOut: 1 };
  try {
    let state = equipped();
    state = { ...state, understanding: fullUnderstanding() };
    state = sent(state);
    assert.equal(state.run.character.backpack.stick, 0);
    assert.equal(state.team.chest.pieces.stick, 10);
    const at = state.run.character.at;
    state = {
      ...state,
      run: {
        ...state.run,
        character: {
          ...state.run.character,
          backpack: { ...state.run.character.backpack, stick: 2 },
        },
        gatherRandom: 1,
        tiles: state.run.tiles.map((tile) =>
          tile.at.q === at.q && tile.at.r === at.r
            ? { ...tile, revealed: true, stock: { ...tile.stock, stick: 10 } }
            : tile,
        ),
        current: {
          activity: {
            kind: "rule",
            ruleId: 1,
            action: { kind: "gather", resource: "stick" },
          },
          startMinute: 0,
          endMinute: 1,
          stepTo: null,
        },
        streak: 479,
      },
    };
    const result = advanceMinutes(state, 1).state;
    assert.ok(result.run.completion);
    assert.equal(
      result.run.character.backpack.stick,
      3,
      "gathering uses carrying capacity, not either map cap",
    );
    assert.deepEqual(result.run.deposited, [entry("stick", 1)]);
    assert.equal(result.team.chest.pieces.stick, 11);
  } finally {
    MAPS.forest = original;
  }
});

// Catches rejecting the initial count supplied by the editor's Add item operation.
test("editing a program accepts one piece on each trip list", () => {
  const state = newGame();
  const program = {
    ...state.programs[0].program,
    tripPlan: { take: [entry("stick", 1)], bring: [entry("stick", 1)] },
  };
  assert.doesNotThrow(() => {
    const edited = editProgram(state, state.programs[0].id, program).state;
    assert.deepEqual(edited.programs[0].program.tripPlan, {
      take: [entry("stick", 1)],
      bring: [entry("stick", 1)],
    });
  });
});

test("program validation rejects duplicate items and bad counts, permits independent lists and large counts", () => {
  const program = emptyProgram();
  assert.deepEqual(program.tripPlan, { take: [], bring: [] });
  assert.deepEqual(
    createProgram(newGame()).state.programs.at(-1).program.tripPlan,
    program.tripPlan,
  );
  // 2 ** 53 and 1e20 are integers beyond the safe integers, which a saved game cannot hold (D-181).
  for (const count of [0, -1, 0.5, NaN, Infinity, "2", null, 2 ** 53, 1e20]) {
    assert.throws(() =>
      checkProgram(
        { ...program, tripPlan: { take: [entry("stick", count)], bring: [] } },
        null,
      ),
    );
  }
  for (const take of [
    [entry("stick", 1), entry("stick", 2)],
    [entry("campfire", 1)],
    [entry("unknown", 1)],
    null,
  ]) {
    assert.throws(() =>
      checkProgram({ ...program, tripPlan: { take, bring: [] } }, null),
    );
  }
  const valid = {
    ...program,
    tripPlan: { take: [entry("stick", 1e12)], bring: [entry("stick", 3)] },
  };
  assert.deepEqual(checkProgram(valid, null), valid);
  const largest = {
    ...program,
    tripPlan: { take: [entry("stick", Number.MAX_SAFE_INTEGER)], bring: [] },
  };
  assert.deepEqual(checkProgram(largest, null), largest);
  assert.notEqual(
    checkProgram(valid, null).tripPlan.take[0],
    valid.tripPlan.take[0],
  );
});

test("the first action already sees entry equipment and transfers preserve their input state", () => {
  let state = equipped();
  const program = {
    ...programFromRules(
      {
        condition: { kind: "itemBelow", item: "berry", value: 1 },
        action: { kind: "explore" },
      },
      { condition: { kind: "always" }, action: { kind: "eat" } },
    ),
    tripPlan: { take: [entry("berry", 15)], bring: [entry("berry", 15)] },
  };
  state = editProgram(
    { ...state, understanding: fullUnderstanding() },
    1,
    program,
  ).state;
  const before = structuredClone(state);
  freeze(state);
  const started = sent(state);
  assert.equal(started.run.current.activity.action.kind, "eat");
  assert.equal(started.run.character.backpack.berry, 10);
  assert.deepEqual(state, before);
  assert.notEqual(started.run.bringPlan, program.tripPlan.bring);
  assert.notEqual(started.run.bringPlan[0], program.tripPlan.bring[0]);
  const ready = { ...started, run: { ...started.run, streak: 479 } };
  const readyBefore = structuredClone(ready);
  const result = advanceMinutes(freeze(ready), 1).state;
  assert.deepEqual(ready, readyBefore);
  assert.deepEqual(result.run.deposited, [entry("berry", 10)]);
});

// Each expected value below is hand-counted from To do 1-5 and 14 of the task rozliczenie-przejsc;
// the loop test a case follows is named in the case.
function solvedForest(state = equipped()) {
  return { ...state, solvedMaps: ["forest"] };
}
function aboutToComplete(state) {
  return { ...state, run: { ...state.run, streak: 479 } };
}

test("a manual run of a solved map takes its take list from nowhere, cut by capacity, and leaves the chest as it is", () => {
  // invariant: solved-map-manual-run
  // loop src/sim/chest.test.ts:316-338: 'wnosi plan i zostawia skrzynkę nietkniętą', 'wnosi także
  // to, czego w skrzynce nie ma', 'dalej wiąże udźwig'.
  const capacity = equipped().team.characters[0].traits.carryingCapacity;
  const started = sent(solvedForest());
  assert.deepEqual(started.run.character.backpack, {
    stick: 8,
    berry: 7,
    moss: 0,
    fiber: 0,
  });
  assert.deepEqual(started.team.chest.pieces, {
    stick: 10,
    berry: 10,
    moss: 2,
  });
  const scarce = solvedForest();
  const absent = editProgram(
    { ...scarce, team: { ...scarce.team, chest: { pieces: { berry: 1 } } } },
    1,
    { ...emptyProgram(), tripPlan: { take: [entry("stick", 5)], bring: [] } },
  ).state;
  const fromNowhere = sent(absent);
  assert.equal(fromNowhere.run.character.backpack.stick, 5);
  assert.deepEqual(fromNowhere.team.chest.pieces, { berry: 1 });
  const greedy = editProgram(solvedForest(), 1, {
    ...emptyProgram(),
    tripPlan: { take: [entry("berry", 40)], bring: [] },
  }).state;
  assert.equal(sent(greedy).run.character.backpack.berry, capacity);
});

test("takeFromNowhere clips the take list by capacity and the entry cap of the map and reads nothing else", () => {
  // invariant: solved-map-manual-run
  // loop src/sim/chest.test.ts:316-338.
  const plan = { take: [entry("moss", 9), entry("berry", 9)], bring: [] };
  const before = structuredClone(plan);
  assert.deepEqual(
    takeFromNowhere(plan, 15, { ...MAPS.forest, carryIn: 4, carryOut: 0 }),
    { stick: 0, berry: 0, moss: 4, fiber: 0 },
  );
  assert.deepEqual(takeFromNowhere(plan, 12, MAPS.forest), {
    stick: 0,
    berry: 3,
    moss: 9,
    fiber: 0,
  });
  assert.equal(
    takeFromNowhere(plan, 15, { ...MAPS.forest, carryIn: 0 }).moss,
    0,
  );
  assert.deepEqual(plan, before);
});

test("a run records at its start whether its map was solved, and a restart after the solving completion records it anew", () => {
  // invariant: solved-map-manual-run
  // loop src/sim/chest.test.ts:358-367: 'start zapisuje w przejściu, czy jest próbą'.
  const unsolved = sent();
  assert.equal(unsolved.run.solvedMapRun, false);
  assert.equal(sent(solvedForest()).run.solvedMapRun, true);
  const completed = advanceMinutes(aboutToComplete(unsolved), 1).state;
  assert.ok(completed.run.completion);
  assert.deepEqual(completed.solvedMaps, ["forest"]);
  assert.equal(completed.run.solvedMapRun, false, "the mark holds to the end");
  const restarted = restart(completed).state;
  assert.equal(restarted.run.solvedMapRun, true);
  assert.deepEqual(restarted.team.chest, completed.team.chest);
});

test("completing a manual run of a solved map pays no practice and deposits nothing, and the practice stays with the run", () => {
  // invariant: solved-map-manual-run
  // loop src/sim/chest.test.ts:407-419 and src/sim/skills.test.ts:454-468.
  const started = sent(solvedForest());
  const fixture = aboutToComplete({
    ...started,
    run: {
      ...started.run,
      practice: { smallItemGathering: 7 },
      character: {
        ...started.run.character,
        backpack: { ...started.run.character.backpack, moss: 3 },
      },
    },
  });
  const before = structuredClone(fixture);
  const completed = advanceMinutes(fixture, 1).state;
  assert.ok(completed.run.completion);
  assert.deepEqual(completed.run.deposited, []);
  assert.deepEqual(completed.team.chest, fixture.team.chest);
  assert.deepEqual(completed.team.characters, fixture.team.characters);
  assert.deepEqual(completed.run.practice, { smallItemGathering: 7 });
  assert.deepEqual(completed.solvedMaps, ["forest"]);
  assert.equal(completed.run.solvedMapRun, true);
  assert.deepEqual(fixture, before);
  assert.equal(advanceMinutes(completed, 10).state, completed);
});

test("a run started before another character solved the map still pays practice and deposits at its completion", () => {
  // invariant: solved-map-manual-run
  // loop src/sim/skills.test.ts:470-480.
  const started = sent();
  const fixture = aboutToComplete({
    ...started,
    solvedMaps: ["forest"],
    run: { ...started.run, practice: { smallItemGathering: 7 } },
  });
  const completed = advanceMinutes(fixture, 1).state;
  assert.ok(completed.run.completion);
  assert.deepEqual(completed.run.deposited, [
    entry("berry", 7),
    entry("stick", 8),
  ]);
  assert.deepEqual(completed.team.chest.pieces, {
    stick: 10,
    berry: 10,
    moss: 2,
  });
  assert.equal(
    completed.team.characters[0].skills.smallItemGathering.practice,
    fixture.team.characters[0].skills.smallItemGathering.practice + 7,
  );
});

test("the preview of a marked run is empty whatever its backpack and the chest hold", () => {
  // invariant: solved-map-manual-run
  // loop src/sim/chest.test.ts:407-419: the deposit of a trial is the empty list.
  const run = sent(solvedForest()).run;
  assert.deepEqual(tripLoot(run, { pieces: {} }, MAPS.forest), []);
  assert.deepEqual(
    tripLoot({ ...run, solvedMapRun: false }, { pieces: {} }, MAPS.forest),
    [entry("berry", 7), entry("stick", 8)],
  );
});

test("a death on a manual run of a solved map takes what the character carried and pays nothing", () => {
  // invariant: trip-run-end
  // To do 14, D-61, D-190, question Q1: a death costs as on any run and pays nothing.
  const started = sent(solvedForest());
  const dying = {
    ...started,
    run: {
      ...started.run,
      practice: { smallItemGathering: 7 },
      body: { temperature: 34, satiety: 50, health: 0.1 },
    },
  };
  const dead = advanceMinutes(dying, 1).state;
  assert.ok(dead.run.death);
  assert.equal(dead.run.deposited, null);
  assert.deepEqual(dead.team.chest, started.team.chest);
  assert.deepEqual(dead.team.characters, started.team.characters);
  assert.deepEqual(dead.solvedMaps, ["forest"]);
  assert.deepEqual(dead.run.character.backpack, started.run.character.backpack);
});
