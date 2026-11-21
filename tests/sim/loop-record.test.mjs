// The loop record of an earning loop (D-241): the map runs completed in a row with no death between
// them since the start of the earning loop, and the largest such number. The expectations come from
// D-241 (the two numbers, what sets the first back to zero, and that the open game and the catch-up deal
// with an end alike), from D-190 (the deaths that leave an earning loop going, and the one that stops
// it), and for the save from D-213 and D-206 (a crafted document is refused whole as `shape`, and no
// value a document can hold makes the load throw) and D-386 (the load admits what the game makes). The
// expected numbers are written out by hand from those sentences.
import assert from "node:assert/strict";
import { test } from "node:test";
import { createCharacter, withSaveTime } from "../../dist/browser/sim/game.js";
import {
  advanceLoopRun,
  catchUp,
  endLoopRun,
  passLoops,
  startLoop,
  stopLoop,
  takeLoopPractice,
} from "../../dist/browser/sim/loop.js";
import { loadSavedGame, savedGame } from "../../dist/browser/sim/saved-game.js";
import { newKnowingGame } from "./understanding-fixture.mjs";

const T0 = 1_760_000_000_000;
/** One real minute in ms: 60 s × 1000 (D-239). */
const MIN = 60_000;
const FOREST = { mapId: "forest", characterId: 1 };
const FOREST_OLA = { mapId: "forest", characterId: 2 };
const HEALTHY = { temperature: 37, satiety: 100, health: 100 };
/** One game minute from a death of cold: chilled, with health the next minute takes away. */
const DYING = { temperature: 30, satiety: 100, health: 0.1 };
const EXPLORE = { kind: "explore" };

/** `skills` with one practice in each skill: what a character needs to have practice at all (D-190). */
function practised(skills) {
  return Object.fromEntries(
    Object.entries(skills).map(([id, skill]) => [
      id,
      { ...skill, practice: 1 },
    ]),
  );
}

/**
 * A knowing game with Ala (1) and Ola (2), each with a practice of 1 in each skill when `withPractice`,
 * Las solved, the first program the empty one and all three uses of the team's resurrection left.
 */
function game(withPractice = true) {
  let state = createCharacter(newKnowingGame(), "Ala").state;
  state = createCharacter(state, "Ola").state;
  return {
    ...state,
    solvedMaps: ["forestEdge", "forest"],
    team: {
      ...state.team,
      characters: state.team.characters.map((character) => ({
        ...character,
        skills: withPractice ? practised(character.skills) : character.skills,
      })),
    },
  };
}

/** The game started in an earning loop of Ala on Las. */
function looping(withPractice = true) {
  return startLoop(game(withPractice), FOREST, T0).state;
}

/** `state` with the map run of the earning loop of the character `id` changed by `change`. */
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

/** The map run of Ala's earning loop one game minute from a completion. */
function oneShort(state) {
  const run = state.loops[1].run;
  return changingRun(state, 1, {
    body: { ...HEALTHY },
    streak: 479,
    current: {
      activity: { kind: "rule", ruleId: 1, action: EXPLORE },
      startMinute: run.minute,
      endMinute: run.minute + 1,
      stepTo: null,
    },
  });
}

/** The map run of Ala's earning loop one game minute from a death of cold. */
function dyingNext(state) {
  return changingRun(state, 1, { body: { ...DYING } });
}

/**
 * The three ways the game deals with the end of an earning loop's map run (D-241): the open game taking
 * the end of a map run it passed one minute of, the open game's passing of real time, and the catch-up
 * after a load. Each takes a state whose map run is one minute from its end and gives the state after
 * that minute and its end.
 */
const DRIVERS = {
  "the end taken in the open game": (prepared) =>
    endLoopRun(advanceLoopRun(prepared, 1, 1).state, 1, T0).state,
  "the passing of real time in the open game": (prepared) =>
    passLoops(prepared, T0, T0 + MIN).state,
  "the catch-up after a load": (prepared) =>
    catchUp(withSaveTime(prepared, T0), T0 + MIN).state,
};

/** The numbers an earning loop holds, as a list: in a row, the record, the map runs completed. */
const counts = (state) => [
  state.loops[1].inARow,
  state.loops[1].loopRecord,
  state.loops[1].completed,
];

/**
 * The earning loop of `start` taken through the ends `kinds` names, "C" a completion and "D" a death
 * with practice and a use of the resurrection left, by `drive`; the numbers after each end.
 */
function through(start, kinds, drive) {
  const seen = [];
  let state = start;
  for (const kind of kinds) {
    state = drive(kind === "C" ? oneShort(state) : dyingNext(state));
    seen.push(counts(state));
  }
  return seen;
}

// A new earning loop counts nothing.
test("an earning loop starts with no map run completed in a row and a loop record of 0", () => {
  // decision: D-241 "Each earning loop also holds, from its start, the number of its map runs completed in a row with no death between them, which a death that does not stop the earning loop sets back to zero, and the largest such number, its loop record"
  const loop = looping().loops[1];
  assert.equal(loop.inARow, 0);
  assert.equal(loop.loopRecord, 0);
});

for (const [name, drive] of Object.entries(DRIVERS)) {
  test(`${name}: three completions, a death a use of the resurrection covers and two completions hold 2 in a row and a loop record of 3`, () => {
    // decision: D-241 "Each earning loop also holds, from its start, the number of its map runs completed in a row with no death between them, which a death that does not stop the earning loop sets back to zero, and the largest such number, its loop record"
    // decision: D-190 "The death of a character with practice uses up one use while any is left, and a death of a character with practice with none left stops its earning loop"
    assert.deepEqual(
      through(looping(), ["C", "C", "C", "D", "C", "C"], drive),
      [
        [1, 1, 1],
        [2, 2, 2],
        [3, 3, 3],
        [0, 3, 3],
        [1, 3, 4],
        [2, 3, 5],
      ],
    );
  });

  test(`${name}: a run in a row that passes the record raises it, one that only reaches it leaves it, and a death in between starts the run anew`, () => {
    // decision: D-241 "Each earning loop also holds, from its start, the number of its map runs completed in a row with no death between them, which a death that does not stop the earning loop sets back to zero, and the largest such number, its loop record"
    assert.deepEqual(
      through(looping(), ["C", "C", "D", "C", "C", "C"], drive),
      [
        [1, 1, 1],
        [2, 2, 2],
        [0, 2, 2],
        [1, 2, 3],
        [2, 2, 4],
        [3, 3, 5],
      ],
    );
  });

  test(`${name}: a death of a character with no practice starts the run anew too, and the earning loop goes on`, () => {
    // decision: D-190 "A character's death takes what it carried and pays nothing of its map run; when the resurrection has no use left, it also takes all the character's practice, the practice gathered at its earning loop included, and every rank of branch it bought, and the character's generation number grows by one, its archetype unchanged, except that the death of a character with no practice yet — none in any skill, no rank of branch bought and none gathered at its earning loop — takes nothing besides what it carried, leaves the generation number as it was, uses up no use of the resurrection, whether one is left or not, and does not stop its earning loop"
    // decision: D-241 "Each earning loop also holds, from its start, the number of its map runs completed in a row with no death between them, which a death that does not stop the earning loop sets back to zero, and the largest such number, its loop record"
    const start = looping(false);
    const first = drive(oneShort(start));
    const second = drive(oneShort(first));
    assert.deepEqual(counts(second), [2, 2, 2], "precondition: two in a row");
    // The completions gathered practice at the earning loop, which counts as the character's (D-190).
    const bare = {
      ...second,
      loops: { 1: { ...second.loops[1], practice: {} } },
    };
    const dead = drive(dyingNext(bare));
    assert.ok(dead.loops[1], "the earning loop goes on");
    assert.equal(
      dead.team.resurrectionUsesSpent,
      0,
      "precondition: no use was spent, so the character had no practice",
    );
    assert.deepEqual(counts(dead), [0, 2, 2]);
  });
}

test("a completion in the map run that follows a death counts from 1, whatever the record stands at", () => {
  // decision: D-241 "Each earning loop also holds, from its start, the number of its map runs completed in a row with no death between them, which a death that does not stop the earning loop sets back to zero, and the largest such number, its loop record"
  const started = looping();
  const held = {
    ...started,
    loops: {
      ...started.loops,
      1: {
        ...started.loops[1],
        runNumber: 41,
        completed: 40,
        inARow: 7,
        loopRecord: 40,
      },
    },
  };
  const died = endLoopRun(
    advanceLoopRun(dyingNext(held), 1, 1).state,
    1,
    T0,
  ).state;
  assert.deepEqual(counts(died), [0, 40, 40]);
  const completed = endLoopRun(
    advanceLoopRun(oneShort(died), 1, 1).state,
    1,
    T0,
  ).state;
  assert.deepEqual(counts(completed), [1, 40, 41]);
});

test("a death that stops the earning loop takes its counts with it, and the next earning loop of the character starts from 0 and 0", () => {
  // decision: D-190 "The death of a character with practice uses up one use while any is left, and a death of a character with practice with none left stops its earning loop"
  // decision: D-241 "Each earning loop also holds, from its start, the number of its map runs completed in a row with no death between them, which a death that does not stop the earning loop sets back to zero, and the largest such number, its loop record"
  let state = looping();
  state = endLoopRun(advanceLoopRun(oneShort(state), 1, 1).state, 1, T0).state;
  state = endLoopRun(advanceLoopRun(oneShort(state), 1, 1).state, 1, T0).state;
  assert.deepEqual(counts(state), [2, 2, 2], "precondition: two in a row");
  state = {
    ...state,
    team: {
      ...state.team,
      resurrectionUsesSpent: 3,
      resurrectionNextReturnAtMs: T0 + 1,
    },
  };
  const stopped = endLoopRun(
    advanceLoopRun(dyingNext(state), 1, 1).state,
    1,
    T0,
  ).state;
  assert.deepEqual(stopped.loops, {}, "precondition: the earning loop stopped");
  const again = startLoop(stopped, FOREST, T0 + MIN).state.loops[1];
  assert.equal(again.inARow, 0);
  assert.equal(again.loopRecord, 0);
});

test("a stop of the earning loop by the player ends the counting: the next earning loop of the character starts from 0 and 0", () => {
  // decision: D-241 "Each earning loop also holds, from its start, the number of its map runs completed in a row with no death between them, which a death that does not stop the earning loop sets back to zero, and the largest such number, its loop record"
  let state = looping();
  state = endLoopRun(advanceLoopRun(oneShort(state), 1, 1).state, 1, T0).state;
  assert.deepEqual(counts(state), [1, 1, 1], "precondition: one completed");
  const stopped = stopLoop(state, 1).state;
  assert.equal(stopped.loops[1], undefined);
  const again = startLoop(stopped, FOREST, T0 + MIN).state.loops[1];
  assert.equal(again.inARow, 0);
  assert.equal(again.loopRecord, 0);
});

test("passing minutes of a map run that does not end, and taking the practice with „Odbierz”, leave both numbers as they were", () => {
  // decision: D-241 "Each earning loop also holds, from its start, the number of its map runs completed in a row with no death between them, which a death that does not stop the earning loop sets back to zero, and the largest such number, its loop record"
  const completed = endLoopRun(
    advanceLoopRun(oneShort(looping()), 1, 1).state,
    1,
    T0,
  ).state;
  assert.deepEqual(counts(completed), [1, 1, 1], "precondition");
  const passed = advanceLoopRun(completed, 1, 30).state;
  assert.deepEqual(counts(passed), [1, 1, 1]);
  const taken = takeLoopPractice(passed, 1).state;
  assert.deepEqual(counts(taken), [1, 1, 1]);
});

test("the numbers of one character's earning loop are its own: another character's loop stays at 0 and 0 through them", () => {
  // decision: D-241 "The game state holds its earning loops beside the one manual map run, by character number, so a character has at most one, each with the content of the program taken at its start, its map run going on, the number of that map run, the count of its completions and the practice gathered from those completions since the player last took the practice waiting with „Odbierz”"
  const both = startLoop(looping(), FOREST_OLA, T0).state;
  const after = endLoopRun(
    advanceLoopRun(oneShort(both), 1, 1).state,
    1,
    T0,
  ).state;
  assert.deepEqual(counts(after), [1, 1, 1]);
  assert.equal(after.loops[2].inARow, 0);
  assert.equal(after.loops[2].loopRecord, 0);
});

// ---------------------------------------------------------------------------------------------------
// The save

/** `loop` with the numbers of its map runs and its two counts set. */
function counted(loop, runNumber, completed, inARow, loopRecord) {
  return { ...loop, runNumber, completed, inARow, loopRecord };
}

/** A game with the earning loops of Ala (2 in a row, a record of 5) and Ola (0 and 0). */
function recording() {
  const both = startLoop(looping(), FOREST_OLA, T0).state;
  return {
    ...both,
    loops: {
      1: counted(both.loops[1], 6, 5, 2, 5),
      2: both.loops[2],
    },
  };
}

/** The saved document of `state`, as JSON text carries it to the server and back. */
function documentOf(state) {
  return JSON.parse(JSON.stringify(savedGame(withSaveTime(state, T0))));
}

const STATE = recording();
const DOCUMENT = documentOf(STATE);

/** A copy of the document with `change` applied to the earning loop of Ala in it. */
function changed(change) {
  const copy = structuredClone(DOCUMENT);
  change(copy.game.loops[1], copy.game.loops);
  return copy;
}

function assertRefused(name, document) {
  let result;
  assert.doesNotThrow(() => {
    result = loadSavedGame(document);
  }, `${name}: the load threw`);
  assert.deepEqual(result, { ok: false, reason: "shape" }, name);
}

// invariant: save-version
// Fault: a field the save writes and the load does not read (or reads loosely) loses the numbers at the
// first reload, or the game writes a save its own load discards (D-386).
test("an earning loop's two numbers go through the save and the load whole, each loop its own", () => {
  // decision: D-386 "The load of a saved game state admits every game state the game's own functions make"
  assert.deepEqual(DOCUMENT.game.loops[1].inARow, 2);
  assert.deepEqual(DOCUMENT.game.loops[1].loopRecord, 5);
  assert.deepEqual(DOCUMENT.game.loops[2].inARow, 0);
  assert.deepEqual(DOCUMENT.game.loops[2].loopRecord, 0);
  assert.deepEqual(loadSavedGame(DOCUMENT), {
    ok: true,
    state: withSaveTime(STATE, T0),
  });
});

test("the states an earning loop makes through completions and a covered death load back with their numbers", () => {
  // decision: D-386 "The load of a saved game state admits every game state the game's own functions make"
  let state = looping();
  for (const kind of ["C", "C", "D", "C"]) {
    state = DRIVERS["the end taken in the open game"](
      kind === "C" ? oneShort(state) : dyingNext(state),
    );
    const stamped = withSaveTime(state, T0);
    const result = loadSavedGame(documentOf(stamped));
    assert.equal(result.ok, true, kind);
    assert.deepEqual(result.state, stamped, kind);
  }
  assert.deepEqual(counts(state), [1, 2, 3], "precondition: the numbers moved");
});

test("a load admits a run in a row equal to the record, and both at 0, the record up to the map runs completed", () => {
  // decision: D-213 "Saved-game code turns a game state into the saved document of the current version of its shape, and an unknown value — a saved game state downloaded from the server or the unsaved game state kept in the page's memory (D-211) — into a game state or a refusal naming why, inside the simulation, no value a document can hold making it throw, and changing nothing passed to it"
  assert.equal(DOCUMENT.game.loops[1].completed, 5, "precondition");
  for (const [inARow, loopRecord] of [
    [5, 5],
    [0, 0],
    [0, 5],
  ]) {
    const result = loadSavedGame(
      changed((loop) => {
        loop.inARow = inARow;
        loop.loopRecord = loopRecord;
      }),
    );
    assert.equal(
      result.ok,
      true,
      `${String(inARow)} and ${String(loopRecord)}`,
    );
    assert.equal(result.state.loops[1].inARow, inARow);
    assert.equal(result.state.loops[1].loopRecord, loopRecord);
  }
});

// invariant: save-version
// The reading is strict: both keys present, none foreign, only own keys; the numbers whole from 0; the
// run in a row not above the record, since the record is the largest such run (D-241).
test("an earning loop without one of the two numbers, with a key besides them, or with the old shape is refused as shape", () => {
  // decision: D-213 "Saved-game code turns a game state into the saved document of the current version of its shape, and an unknown value — a saved game state downloaded from the server or the unsaved game state kept in the page's memory (D-211) — into a game state or a refusal naming why, inside the simulation, no value a document can hold making it throw, and changing nothing passed to it"
  const cases = {
    "no run in a row": (loop) => {
      delete loop.inARow;
    },
    "no loop record": (loop) => {
      delete loop.loopRecord;
    },
    "neither (the shape before the numbers)": (loop) => {
      delete loop.inARow;
      delete loop.loopRecord;
    },
    "a key of another name for the run in a row": (loop) => {
      loop.streak = loop.inARow;
      delete loop.inARow;
    },
    "a key of another name for the record": (loop) => {
      loop.record = loop.loopRecord;
      delete loop.loopRecord;
    },
    "a third number": (loop) => {
      loop.longest = 1;
    },
    "the numbers under one key": (loop) => {
      loop.loopRecord = { inARow: loop.inARow, loopRecord: loop.loopRecord };
      delete loop.inARow;
    },
  };
  for (const [name, change] of Object.entries(cases))
    assertRefused(name, changed(change));
  assertRefused(
    "a `__proto__` key beside the numbers",
    changed((_loop, loops) => {
      loops[1] = JSON.parse(
        `{"__proto__":{},${JSON.stringify(DOCUMENT.game.loops[1]).slice(1)}`,
      );
    }),
  );
});

// invariant: save-version
test("a run in a row above the loop record is refused as shape", () => {
  // decision: D-241 "Each earning loop also holds, from its start, the number of its map runs completed in a row with no death between them, which a death that does not stop the earning loop sets back to zero, and the largest such number, its loop record"
  for (const [inARow, loopRecord] of [
    [6, 5],
    [1, 0],
    [3, 2],
  ])
    assertRefused(
      `${String(inARow)} in a row, a record of ${String(loopRecord)}`,
      changed((loop) => {
        loop.inARow = inARow;
        loop.loopRecord = loopRecord;
      }),
    );
});

// invariant: save-version
// Fault: the load takes a loop record no earning loop can reach, and a forged number stands in the line of
// the report „Gdy cię nie było”. The record is a run of completions, so it is never above the completions
// counted from the same start (D-241); the document's earning loop of Ala has completed 5.
test("a loop record above the map runs completed is refused as shape", () => {
  // decision: D-241 "Each earning loop also holds, from its start, the number of its map runs completed in a row with no death between them, which a death that does not stop the earning loop sets back to zero, and the largest such number, its loop record"
  for (const [runNumber, completed, inARow, loopRecord] of [
    [6, 5, 2, 6],
    [6, 5, 999, 999],
    [1, 0, 1, 1],
  ])
    assertRefused(
      `${String(completed)} completed, ${String(inARow)} in a row, a record of ${String(loopRecord)}`,
      changed((loop) => {
        loop.runNumber = runNumber;
        loop.completed = completed;
        loop.inARow = inARow;
        loop.loopRecord = loopRecord;
      }),
    );
});

// Values a JSON document can hold in place of any other, among them objects that refuse to become text,
// which a message quoting the value would trip on.
const HOSTILE_VALUES = [
  null,
  true,
  -1,
  1.5,
  2 ** 53,
  Number.MAX_SAFE_INTEGER + 2,
  1e300,
  -Infinity,
  Infinity,
  NaN,
  "",
  "0",
  "1",
  "x",
  [],
  [0],
  {},
  { valueOf: 1, toString: 1 },
  JSON.parse('{"__proto__":null}'),
  JSON.parse('{"__proto__":{"1":{}}}'),
];

// invariant: save-version
test("a number of an earning loop that is no whole number from 0, in the run in a row or the record, is refused as shape", () => {
  // decision: D-213 "Saved-game code turns a game state into the saved document of the current version of its shape, and an unknown value — a saved game state downloaded from the server or the unsaved game state kept in the page's memory (D-211) — into a game state or a refusal naming why, inside the simulation, no value a document can hold making it throw, and changing nothing passed to it"
  for (const [index, hostile] of HOSTILE_VALUES.entries()) {
    assertRefused(
      `the run in a row as hostile value ${String(index)}`,
      changed((loop) => {
        loop.inARow = structuredClone(hostile);
      }),
    );
    assertRefused(
      `the record as hostile value ${String(index)}`,
      changed((loop) => {
        loop.loopRecord = structuredClone(hostile);
      }),
    );
  }
  assertRefused(
    "a record of 0 below a run in a row of 2",
    changed((loop) => {
      loop.loopRecord = 0;
    }),
  );
});

// invariant: save-version
// Fault: a hostile value at a place of the loop makes the reading throw something other than its own
// refusal, and the player gets „Spróbuj ponownie” for a damaged save for good instead of the refusal D-96
// gives. The expected result comes from D-213: a crafted document is a refusal, so it never throws.
test("no value a document can hold, in place of the numbers or of the whole earning loop, throws out of the load", () => {
  // decision: D-213 "Saved-game code turns a game state into the saved document of the current version of its shape, and an unknown value — a saved game state downloaded from the server or the unsaved game state kept in the page's memory (D-211) — into a game state or a refusal naming why, inside the simulation, no value a document can hold making it throw, and changing nothing passed to it"
  for (const [index, hostile] of HOSTILE_VALUES.entries()) {
    for (const key of ["inARow", "loopRecord"]) {
      const document = structuredClone(DOCUMENT);
      document.game.loops[1][key] = structuredClone(hostile);
      assert.doesNotThrow(
        () => loadSavedGame(document),
        `${key} as hostile value ${String(index)}`,
      );
    }
    const whole = structuredClone(DOCUMENT);
    whole.game.loops[1] = structuredClone(hostile);
    assert.doesNotThrow(
      () => loadSavedGame(whole),
      `the earning loop as hostile value ${String(index)}`,
    );
  }
});

test("the load does not change the document it reads, and the state it builds shares no number with it", () => {
  // decision: D-213 "Saved-game code turns a game state into the saved document of the current version of its shape, and an unknown value — a saved game state downloaded from the server or the unsaved game state kept in the page's memory (D-211) — into a game state or a refusal naming why, inside the simulation, no value a document can hold making it throw, and changing nothing passed to it"
  const document = structuredClone(DOCUMENT);
  const before = structuredClone(document);
  const loaded = loadSavedGame(document);
  assert.equal(loaded.ok, true, "precondition: the document loads");
  assert.deepEqual(document, before);
  document.game.loops[1].inARow = 0;
  document.game.loops[1].loopRecord = 99;
  assert.equal(loaded.state.loops[1].inARow, 2);
  assert.equal(loaded.state.loops[1].loopRecord, 5);
});
