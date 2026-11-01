// The time of earning loops: the open game passing them minute by minute, the catch-up after a load
// passing the minutes away one character at a time, and the report the catch-up writes. The
// expectations come from the task petla-zarobkowa (To do 2 and 11 to 16, answers P1, Q6, Q7 and Q19,
// the settlements of rows 10 to 12, 14, 15 and 22 to 26) and from the spec (sections 2, 4, 6, 7, 8,
// 11, 14 and 15), which bind the tests of loop at commit cdc7c0d where they cover a case:
// `src/sim/loop.test.ts:44`, `:79`, `:91`-`92`, `:134`, `src/sim/sim.test.ts:1732`, `:1773`,
// `:1811`, `:1848`, `:2015`-`2028`, `src/sim/chest.test.ts:535`. The departures are named: no upper
// bound of the catch-up (Q7), one button for the whole report (Q21), no minutes in a line of a loop
// that stopped in the open game (Q19). Where an expectation is a relation (the catch-up against the
// open game) no value comes from today's run; the rest are written out by hand from the sentences
// of the invariants.
import assert from "node:assert/strict";
import { test } from "node:test";
import {
  createCharacter,
  newGame,
  send,
  advanceMinutes,
  setProgram,
  withSaveTime,
} from "../../dist/public/sim/game.js";
import {
  catchUp,
  closeAwayReport,
  loopSpan,
  passLoops,
  startLoop,
} from "../../dist/public/sim/loop.js";
import { loadSavedGame, savedGame } from "../../dist/public/sim/saved-game.js";
import { programFromRules } from "./program-fixture.mjs";
import { newKnowingGame } from "./understanding-fixture.mjs";

/** One real minute in ms: 60 s × 1000. */
const MIN = 60_000;
/** The renewal of a resurrection, 480 real minutes in ms: 480 × 60 000. */
const RENEWAL_MS = 28_800_000;
/**
 * The start at this real moment seeds a map run on which the empty program dies in game minute 243,
 * of cold (`tests/sim/acceptance.test.mjs`, `tests/invariants/test_minute_span_split.py`).
 */
const S = 1_760_000_800_000;
const COLD_DEATH_MINUTE = 243;
const FOREST = { mapId: "forest", characterId: 1 };
const HEALTHY = { temperature: 37, satiety: 100, health: 100 };
/** One game minute from a death of cold: chilled, with health the next minute takes away. */
const DYING = { temperature: 30, satiety: 100, health: 0.1 };
const EXPLORE = { kind: "explore" };

const entry = (item, count) => ({ item, count });
const EMPTY = programFromRules();

/** `program` with the trip plan given. */
function withTrip(program, take, bring) {
  return { ...program, tripPlan: { take, bring } };
}

/**
 * A knowing game with Ala (1) and Ola (2) in the team, Las solved, the first program the empty one
 * and the chest holding `chest`.
 */
function game(chest = {}) {
  let state = setProgram(newKnowingGame(), EMPTY).state;
  state = createCharacter(state, "Ala").state;
  state = createCharacter(state, "Ola").state;
  return {
    ...state,
    solvedMaps: ["forest"],
    team: { ...state.team, chest: { pieces: chest } },
  };
}

/** The game with the loops of Ala and Ola started, Ola's first, and saved at `S`. */
function looping(chest = {}) {
  let state = startLoop(game(chest), { ...FOREST, characterId: 2 }, S).state;
  state = startLoop(state, FOREST, S).state;
  return withSaveTime(state, S);
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

/** `state` with the loop of the character `id` changed by `change`. */
function changingLoop(state, id, change) {
  return {
    ...state,
    loops: { ...state.loops, [id]: { ...state.loops[id], ...change } },
  };
}

/** `state` with the map run of the loop of the character `id` changed by `change`. */
function changingRun(state, id, change) {
  const loop = state.loops[id];
  return changingLoop(state, id, { run: { ...loop.run, ...change } });
}

/** The map run of the character `id` `minutes` game minutes from a completion, carrying `backpack`. */
function shortBy(state, id, minutes, backpack = {}, practice = {}) {
  const run = state.loops[id].run;
  return changingRun(state, id, {
    body: { ...HEALTHY },
    streak: 480 - minutes,
    current: {
      activity: { kind: "rule", ruleId: 1, action: EXPLORE },
      startMinute: run.minute,
      endMinute: run.minute + 1,
      stepTo: null,
    },
    character: {
      ...run.character,
      backpack: { ...run.character.backpack, ...backpack },
    },
    practice,
  });
}

/** The map run of the character `id` one game minute from a death of cold. */
function dyingNext(state, id) {
  return changingRun(state, id, { body: { ...DYING } });
}

/** The character `id` with a resurrection not ready until the real moment `readyAtMs`. */
function notReadyUntil(state, id, readyAtMs) {
  return changing(state, id, { resurrectionReadyAtMs: readyAtMs });
}

const withProgram = (state, id, program) =>
  changingLoop(state, id, { program });

const ala = (state) => state.team.characters[0];

/** The report a state holds, as lines keyed by the character, for a short expectation. */
const line = (characterId, over = {}) => ({
  characterId,
  minutes: 0,
  chest: {},
  practice: {},
  resurrectionUsed: false,
  stop: null,
  ...over,
});

/** A state loads back from its saved document, stamped with the moment given. */
function assertLoadsBack(state, label) {
  const stamped = withSaveTime(state, S);
  const loaded = loadSavedGame(JSON.parse(JSON.stringify(savedGame(stamped))));
  assert.equal(loaded.ok, true, `${label} loads back`);
  assert.deepEqual(loaded.state, stamped, label);
}

/** The open game over `minutes` whole minutes, one call to `passLoops` for each. */
function openGame(state, fromMs, minutes) {
  let current = state;
  let clock = fromMs;
  const events = [];
  for (let minute = 0; minute < minutes; minute += 1) {
    const passed = passLoops(current, clock, clock + MIN);
    current = passed.state;
    clock = passed.clockMs;
    events.push(...passed.events);
  }
  return { state: current, clockMs: clock, events };
}

// To do 11, 14, row 14, `catch-up-minutes`, loop `src/sim/sim.test.ts:2017`, `:2020`, `:2028`.
test("the span gives whole minutes and the clock's new value, the rest waiting, and a clock turned back gives none and the reading", () => {
  const from = 5_000_000;
  assert.deepEqual(loopSpan(from, from + 90_000), {
    minutes: 1,
    clockMs: from + MIN,
  });
  assert.deepEqual(loopSpan(from, from + MIN), {
    minutes: 1,
    clockMs: from + MIN,
  });
  assert.deepEqual(loopSpan(from, from + MIN - 1), {
    minutes: 0,
    clockMs: from,
  });
  assert.deepEqual(loopSpan(from, from), { minutes: 0, clockMs: from });
  assert.deepEqual(loopSpan(from, from + 7 * MIN + 59_999), {
    minutes: 7,
    clockMs: from + 7 * MIN,
  });
  // Turned back: nothing is taken and the clock runs from the reading.
  assert.deepEqual(loopSpan(from, from - 1), { minutes: 0, clockMs: from - 1 });
  assert.deepEqual(loopSpan(from, 0), { minutes: 0, clockMs: 0 });
  // A time of any sign is arithmetic; no upper bound (Q7): ten years of minutes.
  assert.deepEqual(loopSpan(-90_000, 0), { minutes: 1, clockMs: -30_000 });
  const tenYears = 10 * 365 * 24 * 60;
  assert.deepEqual(loopSpan(0, tenYears * MIN), {
    minutes: tenYears,
    clockMs: tenYears * MIN,
  });
});

test("a moment that is no safe integer is a RangeError in the span, the open game and the catch-up", () => {
  const state = looping();
  for (const bad of [NaN, Infinity, 1.5, "1", undefined, 2 ** 53]) {
    assert.throws(() => loopSpan(bad, 0), RangeError);
    assert.throws(() => loopSpan(0, bad), RangeError);
    assert.throws(() => passLoops(state, S, bad), RangeError);
    assert.throws(() => passLoops(state, bad, S), RangeError);
    assert.throws(() => catchUp(state, bad), RangeError);
  }
});

// invariant: catch-up-minutes
test("the catch-up passes a loop one game minute for each whole real minute from the save time, and the rest waits", () => {
  const state = looping();
  const at90 = catchUp(state, S + 90_000);
  assert.equal(at90.clockMs, S + MIN);
  assert.equal(at90.state.loops[1].run.minute, 1);
  assert.equal(at90.state.loops[2].run.minute, 1);
  const exact = catchUp(state, S + MIN);
  assert.equal(exact.clockMs, S + MIN);
  assert.equal(exact.state.loops[1].run.minute, 1);
  // Just under a minute: nothing passes, the very state, the rest waiting at the save time.
  const under = catchUp(state, S + MIN - 1);
  assert.equal(under.state, state);
  assert.deepEqual(under.events, []);
  assert.equal(under.clockMs, S);
  const zero = catchUp(state, S);
  assert.equal(zero.state, state);
  assert.equal(zero.clockMs, S);
  // The rest, read again later from the clock's value, completes a minute: nothing was lost.
  const later = passLoops(at90.state, at90.clockMs, S + 2 * MIN);
  assert.equal(later.state.loops[1].run.minute, 2);
});

// invariant: catch-up-minutes
test("a clock turned back before the save time passes nothing, takes nothing and starts the clock from the reading", () => {
  const state = looping({ stick: 4 });
  for (const now of [S - 1, S - 100 * MIN, 0, -5 * MIN]) {
    const result = catchUp(state, now);
    assert.equal(result.state, state);
    assert.deepEqual(result.events, []);
    assert.equal(result.clockMs, now);
    assert.deepEqual(result.state.team.chest.pieces, { stick: 4 });
    assert.equal(result.state.loops[1].run.minute, 0);
  }
  const open = passLoops(state, S, S - 1);
  assert.equal(open.state, state);
  assert.equal(open.clockMs, S - 1);
});

test("a negative save time catches up as arithmetic gives it", () => {
  const state = withSaveTime(looping(), -150_000);
  const result = catchUp(state, 0);
  assert.equal(result.clockMs, 2 * MIN - 150_000);
  assert.equal(result.state.loops[1].run.minute, 2);
});

test("with no loop, a save time of null or no whole minute the catch-up returns the very state and a clock set to the reading", () => {
  const fresh = withSaveTime(game(), S);
  const noLoop = catchUp(fresh, S + 50 * MIN);
  assert.equal(noLoop.state, fresh);
  assert.deepEqual(noLoop.events, []);
  assert.equal(noLoop.clockMs, S + 50 * MIN);
  const looped = looping();
  const never = { ...looped, saveTimeMs: null };
  const unsaved = catchUp(never, S + 50 * MIN);
  assert.equal(unsaved.state, never);
  assert.equal(unsaved.clockMs, S + 50 * MIN);
  const open = passLoops(fresh, S, S + 5 * MIN);
  assert.equal(open.state, fresh);
  assert.equal(
    open.clockMs,
    S + 5 * MIN,
    "no loop: a first loop gets a whole first minute",
  );
});

test("the open game passes no minute before a whole one: the very state, the clock where it stood", () => {
  const state = looping();
  const result = passLoops(state, S, S + MIN - 1);
  assert.equal(result.state, state);
  assert.deepEqual(result.events, []);
  assert.equal(result.clockMs, S);
});

// To do 2, row 20, P1: the catch-up reads neither the manual run nor the pause.
test("the catch-up and the open game read neither the manual map run nor the pause, and leave them as they stand", () => {
  const manual = send(game(), FOREST, S).state;
  // Ola has a loop beside Ala's manual map run, which sits paused one minute in.
  let state = startLoop(manual, { ...FOREST, characterId: 2 }, S).state;
  state = advanceMinutes(state, 1).state;
  state = { ...state, paused: true, pace: 16 };
  state = withSaveTime(state, S);
  const result = catchUp(state, S + 10 * MIN);
  assert.equal(result.state.loops[2].run.minute, 10);
  assert.equal(result.state.run, state.run);
  assert.equal(result.state.paused, true);
  assert.equal(result.state.pace, 16);
  assert.equal(result.state.discovery, state.discovery);
  assert.equal(result.state.realMsCarry, state.realMsCarry);
  const live = passLoops(state, S, S + 10 * MIN);
  assert.equal(live.state.loops[2].run.minute, 10);
  assert.equal(live.state.run, state.run);
  assert.equal(live.state.paused, true);
});

// invariant: catch-up-death-moment
// To do 14, loop `src/sim/sim.test.ts:1773`, `:1848`: a death in the k-th minute is settled at the
// moment k real minutes after the save time, never at the reading.
test("a death in game minute 243 of the catch-up is settled at the save time plus 243 minutes, whatever the reading", () => {
  const state = looping();
  const death = S + COLD_DEATH_MINUTE * MIN;
  // Covered: the resurrection is ready again the renewal after that moment.
  for (const now of [death, death + 57 * MIN + 31_000]) {
    const result = catchUp(state, now);
    assert.equal(ala(result.state).resurrectionReadyAtMs, death + RENEWAL_MS);
    assert.equal(ala(result.state).generation, 1);
  }
  // The next death, 243 minutes after the first and long before the renewal, takes the character,
  // and the moment of readiness stays where the first death put it.
  const late = catchUp(state, S + 1000 * MIN);
  assert.equal(ala(late.state).resurrectionReadyAtMs, death + RENEWAL_MS);
  assert.equal(ala(late.state).generation, 2);
  assert.equal(late.state.loops[1], undefined);
});

// invariant: catch-up-death-moment
test("a resurrection ready exactly at the moment of the death covers it, and a millisecond later does not", () => {
  const death = S + COLD_DEATH_MINUTE * MIN;
  const reading = S + 300 * MIN + 17_000;
  const covered = catchUp(notReadyUntil(looping(), 1, death), reading).state;
  assert.equal(ala(covered).generation, 1);
  assert.equal(ala(covered).resurrectionReadyAtMs, death + RENEWAL_MS);
  assert.ok(covered.loops[1]);
  const lost = catchUp(notReadyUntil(looping(), 1, death + 1), reading).state;
  assert.equal(ala(lost).generation, 2);
  assert.equal(ala(lost).resurrectionReadyAtMs, death + 1);
  assert.equal(lost.loops[1], undefined);
});

// invariant: catch-up-death-moment
test("the moment of a death is the same in one call and in calls split at any minute", () => {
  const state = looping();
  const death = S + COLD_DEATH_MINUTE * MIN;
  const split = openGame(state, S, 300).state;
  assert.equal(ala(split).resurrectionReadyAtMs, death + RENEWAL_MS);
  const whole = passLoops(state, S, S + 300 * MIN).state;
  assert.deepEqual(whole, split);
  const uneven = passLoops(
    passLoops(state, S, S + 100 * MIN + 1).state,
    S + 100 * MIN,
    S + 300 * MIN,
  ).state;
  assert.deepEqual(uneven, split);
});

/**
 * The open game minute by minute against the catch-up, over the same span: for the first character
 * the same character, loop and chest. The second character is given no reach on the chest, so the
 * whole of the team agrees too.
 */
function assertRelation(state, minutes, label) {
  const open = openGame(state, S, minutes);
  const caught = catchUp(state, S + minutes * MIN);
  assert.equal(open.clockMs, caught.clockMs, label);
  assert.deepEqual(ala(open.state), ala(caught.state), `${label}: character`);
  assert.deepEqual(
    open.state.loops[1],
    caught.state.loops[1],
    `${label}: loop`,
  );
  assert.deepEqual(
    open.state.team.chest,
    caught.state.team.chest,
    `${label}: chest`,
  );
  assert.deepEqual(open.state.team, caught.state.team, label);
  assert.deepEqual(open.state.loops, caught.state.loops, label);
}

// invariant: catch-up-state
// Spec section 7 and 16: a relation, so no value comes from today's run.
test("a character no other loop reaches ends the catch-up as the open game does, through a covered death and an uncovered one", () => {
  // Both die of cold in minute 243: the first death is covered, the second (243 minutes later,
  // before the renewal) takes the character and stops the loop.
  assertRelation(looping({ stick: 3 }), 600, "covered then uncovered");
  assert.equal(catchUp(looping(), S + 600 * MIN).state.loops[1], undefined);
  // Uncovered at the first death.
  const uncovered = notReadyUntil(looping(), 1, S + 400 * MIN);
  assertRelation(uncovered, 600, "uncovered");
  const stopped = catchUp(uncovered, S + 600 * MIN).state;
  assert.equal(ala(stopped).generation, 2);
  assert.equal(stopped.loops[1], undefined);
  // Through a completion, deposit into the chest and the take of the next map run.
  let completing = shortBy(looping({ moss: 50 }), 1, 1, { stick: 4 });
  completing = withProgram(
    completing,
    1,
    withTrip(EMPTY, [entry("moss", 5)], [entry("stick", 4)]),
  );
  assertRelation(completing, 600, "through a completion");
  const done = catchUp(completing, S + MIN).state;
  assert.equal(done.loops[1].completed, 1);
  assert.deepEqual(done.team.chest.pieces, { moss: 45, stick: 4 });
});

// invariant: loop-run-knowledge
// Row 17, To do 15: a loop passes through a span in which a manual map run would discover, and the
// Understanding and the programs stay.
test("a catch-up across the first chill leaves the Understanding and the programs as they were", () => {
  let state = setProgram(newGame(), EMPTY).state;
  state = {
    ...createCharacter(state, "Ala").state,
    solvedMaps: ["forest"],
  };
  const manual = advanceMinutes(send(state, FOREST, S).state, 100);
  assert.ok(
    manual.events.some((event) => event.kind === "discovered"),
    "precondition: a manual map run discovers within these minutes",
  );
  const started = withSaveTime(startLoop(state, FOREST, S).state, S);
  const result = catchUp(started, S + 100 * MIN);
  assert.equal(result.state.loops[1].run.minute, 100);
  assert.deepEqual(result.state.understanding, state.understanding);
  assert.deepEqual(result.state.programs, state.programs);
  assert.deepEqual(result.state.loops[1].program, state.programs[0].program);
  assert.equal(result.state.discovery, null);
  assert.deepEqual(result.events, []);
});

// invariant: minute-span-split
// invariant: map-run-repeatability
// Spec section 2 and 6: one minute step, the moments counted from the loop clock, the open game
// minute by minute, so every split of a span agrees, through the ends of map runs.
test("the open game over a span gives the same state and events in calls of any size", () => {
  let state = shortBy(looping({ moss: 50 }), 1, 1, { stick: 4 });
  state = withProgram(
    state,
    1,
    withTrip(EMPTY, [entry("moss", 5)], [entry("stick", 4)]),
  );
  const reference = openGame(state, S, 700);
  const whole = passLoops(state, S, S + 700 * MIN);
  assert.deepEqual(whole.state, reference.state);
  assert.deepEqual(whole.events, reference.events);
  assert.equal(whole.clockMs, S + 700 * MIN);
  for (const sizes of [
    [1, 699],
    [243, 457],
    [242, 1, 1, 456],
    [100, 100, 100, 100, 100, 100, 100],
    [350, 350],
  ]) {
    let current = state;
    let clock = S;
    const events = [];
    for (const size of sizes) {
      const passed = passLoops(current, clock, clock + size * MIN + 31_000);
      current = passed.state;
      clock = passed.clockMs;
      events.push(...passed.events);
    }
    assert.deepEqual(current, reference.state, sizes.join("+"));
    assert.deepEqual(events, reference.events, sizes.join("+"));
  }
  assert.ok(reference.events.length >= 4, "precondition: the span met ends");
  // Repeated from the same state: the same route.
  assert.deepEqual(openGame(state, S, 700), reference);
  assert.deepEqual(
    catchUp(state, S + 700 * MIN),
    catchUp(state, S + 700 * MIN),
  );
});

test("the open game passes minute by minute, the characters in the team's order, and gives one event for each end", () => {
  let state = looping();
  state = dyingNext(dyingNext(state, 1), 2);
  const result = passLoops(state, S, S + MIN);
  assert.deepEqual(result.events, [
    { kind: "loopRunEnded", characterId: 1 },
    { kind: "loopRunEnded", characterId: 2 },
  ]);
  // Ola ends in minute 1, Ala in minute 2: the minutes come first.
  let staggered = shortBy(looping(), 1, 2);
  staggered = shortBy(staggered, 2, 1);
  const order = passLoops(staggered, S, S + 2 * MIN);
  assert.deepEqual(order.events, [
    { kind: "loopRunEnded", characterId: 2 },
    { kind: "loopRunEnded", characterId: 1 },
  ]);
});

// invariant: trip-transfer
// To do 12, D-240: the open game alternates minute by minute and the catch-up goes one character at
// a time, so who gets the last room of the chest differs, each as the spec section 7 gives.
test("with room in the chest for one, the open game gives it to whoever completes first and the catch-up to the earlier character of the team", () => {
  let state = looping({ moss: 57 });
  state = shortBy(state, 1, 2, { stick: 5 });
  state = shortBy(state, 2, 1, { berry: 5 });
  state = withProgram(state, 1, withTrip(EMPTY, [], [entry("stick", 5)]));
  state = withProgram(state, 2, withTrip(EMPTY, [], [entry("berry", 5)]));
  const open = passLoops(state, S, S + 2 * MIN).state;
  assert.deepEqual(open.team.chest.pieces, { moss: 57, berry: 3 });
  const caught = catchUp(state, S + 2 * MIN).state;
  assert.deepEqual(caught.team.chest.pieces, { moss: 57, stick: 3 });
  // Ala's own change is hers; Ola's turn found the chest full.
  assert.deepEqual(caught.awayReport, [
    line(1, {
      minutes: 2,
      chest: { stick: 3 },
      practice: { exploration: 1 },
    }),
    line(2, { minutes: 2, practice: { exploration: 1 } }),
  ]);
  // The open game writes nothing for completions.
  assert.deepEqual(open.awayReport, []);
});

// invariant: trip-transfer
// invariant: trip-run-end
// To do 16, Q6, loop `src/sim/loop.test.ts:134`, `src/sim/chest.test.ts:535`: each character's own
// change of the chest and the practice its loop gathered from completions in this catch-up.
test("each character's line holds its own change of the chest and its own practice gain, with no zero kept", () => {
  let state = looping({ moss: 57 });
  state = shortBy(state, 1, 1, { stick: 5 }, { smallItemGathering: 9 });
  state = shortBy(state, 2, 1, {}, {});
  state = changingLoop(state, 1, { practice: { eating: 3 } });
  state = withProgram(state, 1, withTrip(EMPTY, [], [entry("stick", 5)]));
  state = withProgram(state, 2, withTrip(EMPTY, [entry("stick", 2)], []));
  const result = catchUp(state, S + MIN + 30_000);
  // Ala completes first and fills the chest to 60 with 3 sticks; Ola's completion deposits nothing
  // and its next map run takes 2 of the sticks.
  assert.deepEqual(result.state.team.chest.pieces, { moss: 57, stick: 1 });
  assert.deepEqual(result.state.awayReport, [
    line(1, {
      minutes: 1,
      chest: { stick: 3 },
      practice: { smallItemGathering: 9, exploration: 1 },
    }),
    line(2, { minutes: 1, chest: { stick: -2 }, practice: { exploration: 1 } }),
  ]);
  // The loop's earlier practice (eating 3) is not a gain of this catch-up.
  assert.deepEqual(result.state.loops[1].practice, {
    eating: 3,
    smallItemGathering: 9,
    exploration: 1,
  });
  assertLoadsBack(result.state, "a report of two continuing loops");
});

// invariant: trip-run-end
test("a covered death in the catch-up gives the loop its next map run with nothing back from the dead one, and marks the line", () => {
  // Ala's loop starts on a program that takes 2 sticks, so the chest holds 3 at the save.
  let taking = game({ stick: 5 });
  taking = setProgram(taking, withTrip(EMPTY, [entry("stick", 2)], [])).state;
  taking = withSaveTime(startLoop(taking, FOREST, S).state, S);
  assert.deepEqual(taking.team.chest.pieces, { stick: 3 });
  const result = catchUp(taking, S + 300 * MIN);
  // The first map run died in minute 243 (covered) with its 2 sticks; the next took 2 more.
  assert.deepEqual(result.state.team.chest.pieces, { stick: 1 });
  assert.equal(result.state.loops[1].runNumber, 2);
  assert.deepEqual(result.state.awayReport, [
    line(1, {
      minutes: 300,
      chest: { stick: -2 },
      resurrectionUsed: true,
    }),
  ]);
  assertLoadsBack(result.state, "a covered death in a catch-up");
});

// To do 12, loop `src/sim/loop.test.ts:79`; To do 16, rows 23 and 24, Q19, loop `:91`-`92`,
// `src/sim/sim.test.ts:1811`.
test("a loop that stops in the catch-up writes its line with the minutes it worked, no practice and the generation, and the others go on", () => {
  let state = notReadyUntil(looping(), 1, S + 10_000 * MIN);
  state = changingLoop(state, 1, { practice: { eating: 3 } });
  const result = catchUp(state, S + 300 * MIN);
  assert.equal(result.state.loops[1], undefined);
  assert.equal(ala(result.state).generation, 2);
  assert.equal(result.state.loops[2].run.minute, 300 - COLD_DEATH_MINUTE);
  assert.deepEqual(
    result.events.map((event) => event.characterId),
    [1, 2],
  );
  assert.deepEqual(result.state.awayReport, [
    line(1, {
      minutes: COLD_DEATH_MINUTE,
      stop: { generation: 2, away: true },
    }),
    line(2, { minutes: 300, resurrectionUsed: true }),
  ]);
  assert.deepEqual(result.state.stoppedLoops, {}, "death pays nothing");
  assertLoadsBack(result.state, "a loop stopped in a catch-up");
});

test("a loop that stops in the first minute of the catch-up opens the report at one minute", () => {
  const state = notReadyUntil(dyingNext(looping(), 1), 1, S + 99 * MIN);
  const result = catchUp(state, S + MIN);
  assert.deepEqual(result.state.awayReport, [
    line(1, { minutes: 1, stop: { generation: 2, away: true } }),
    line(2, { minutes: 1 }),
  ]);
  assertLoadsBack(result.state, "a stop in the first minute");
});

test("a catch-up with no whole minute writes no line", () => {
  const state = looping();
  assert.deepEqual(catchUp(state, S + MIN - 1).state.awayReport, []);
});

// To do 16, row 22: a further return before „Zamknij” adds to the report.
test("a further return adds to the line of a loop still going, and its chest changes add up with no zero kept", () => {
  let state = looping({ stick: 1 });
  state = withSaveTime(state, S);
  state = {
    ...state,
    awayReport: [
      line(2, {
        minutes: 4,
        chest: { stick: -2, berry: 1 },
        practice: { exploration: 1 },
        resurrectionUsed: true,
      }),
    ],
  };
  state = shortBy(state, 2, 1, { stick: 2 }, { eating: 1 });
  state = withProgram(state, 2, withTrip(EMPTY, [], [entry("stick", 2)]));
  const result = catchUp(state, S + MIN);
  // Ola completes: +2 sticks, which with the earlier −2 leaves none; the practice adds up.
  assert.deepEqual(result.state.awayReport, [
    line(2, {
      minutes: 5,
      chest: { berry: 1 },
      practice: { exploration: 2, eating: 1 },
      resurrectionUsed: true,
    }),
    line(1, { minutes: 1 }),
  ]);
  assertLoadsBack(result.state, "a report added to");
});

test("a later loop of a character whose line stopped opens a line of its own", () => {
  const stopped = line(2, {
    minutes: 40,
    stop: { generation: 2, away: true },
  });
  const state = {
    ...looping(),
    awayReport: [stopped],
  };
  const stoppedState = changing(state, 2, { generation: 2 });
  const result = catchUp(stoppedState, S + 3 * MIN);
  assert.deepEqual(result.state.awayReport, [
    stopped,
    line(1, { minutes: 3 }),
    line(2, { minutes: 3 }),
  ]);
  assertLoadsBack(result.state, "two lines of one character");
});

// To do 16, row 24, Q19: the open game writes a stop into the same report and no minutes of its own.
test("a loop that stops in the open game writes a line of 0 minutes, and a covered death or a completion writes nothing", () => {
  const stopping = notReadyUntil(dyingNext(looping(), 1), 1, S + 99 * MIN);
  const stopped = passLoops(stopping, S, S + MIN + 5);
  assert.equal(stopped.state.loops[1], undefined);
  assert.deepEqual(stopped.events, [{ kind: "loopRunEnded", characterId: 1 }]);
  assert.deepEqual(stopped.state.awayReport, [
    line(1, { stop: { generation: 2, away: false } }),
  ]);
  assertLoadsBack(stopped.state, "a stop in the open game");
  const covered = passLoops(dyingNext(looping(), 1), S, S + MIN);
  assert.deepEqual(covered.state.awayReport, []);
  assert.deepEqual(covered.events, [{ kind: "loopRunEnded", characterId: 1 }]);
  assert.equal(covered.state.loops[1].runNumber, 2);
  const completed = passLoops(shortBy(looping(), 1, 1), S, S + MIN);
  assert.deepEqual(completed.state.awayReport, []);
  assert.equal(completed.state.loops[1].completed, 1);
});

test("a loop that stops in the open game closes the line of an earlier return, which then reads without minutes and keeps no practice", () => {
  const earlier = line(1, {
    minutes: 10,
    chest: { stick: 2 },
    practice: { eating: 1 },
    resurrectionUsed: true,
  });
  const state = {
    ...notReadyUntil(dyingNext(looping(), 1), 1, S + 99 * MIN),
    awayReport: [earlier, line(2, { minutes: 3 })],
  };
  const result = passLoops(state, S, S + MIN);
  assert.deepEqual(result.state.awayReport, [
    {
      ...earlier,
      practice: {},
      stop: { generation: 2, away: false },
    },
    line(2, { minutes: 3 }),
  ]);
  assertLoadsBack(result.state, "a closed line of an earlier return");
});

test("a stop in the catch-up closes the line of an earlier return with the minutes added", () => {
  const earlier = line(1, { minutes: 10, practice: { eating: 1 } });
  const state = {
    ...notReadyUntil(looping(), 1, S + 9_999 * MIN),
    awayReport: [earlier],
  };
  const result = catchUp(state, S + 400 * MIN);
  assert.deepEqual(result.state.awayReport[0], {
    ...earlier,
    minutes: 10 + COLD_DEATH_MINUTE,
    practice: {},
    stop: { generation: 2, away: true },
  });
  assertLoadsBack(result.state, "a stop added to an earlier line");
});

// To do 16, Q21: one button closes the whole section.
test("closing the report empties it and nothing else, and an empty report is the very state", () => {
  const state = {
    ...looping(),
    awayReport: [line(1, { minutes: 2 }), line(2, { minutes: 5 })],
  };
  const closed = closeAwayReport(state);
  assert.deepEqual(closed.events, []);
  assert.deepEqual(closed.state.awayReport, []);
  assert.deepEqual({ ...closed.state, awayReport: state.awayReport }, state);
  assert.equal(closed.state.loops, state.loops);
  const again = closeAwayReport(closed.state);
  assert.equal(again.state, closed.state);
});

/** Freezes a value and everything it holds, so a write to it throws in strict code. */
function deepFreeze(value) {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const inner of Object.values(value)) deepFreeze(inner);
  }
  return value;
}

// invariant: simulation-inputs
// The pool of `tests/invariants/test_simulation_inputs.py` holds no state with a loop, so the
// functions of the slice are given such states here, frozen.
test("passLoops, catchUp and closeAwayReport write to nothing they are given, through a completion, a covered death and a stop", () => {
  const completing = withProgram(
    shortBy(looping({ moss: 50 }), 1, 1, { stick: 4 }),
    1,
    withTrip(EMPTY, [entry("moss", 5)], [entry("stick", 4)]),
  );
  const stopping = {
    ...notReadyUntil(looping(), 1, S + 9_999 * MIN),
    awayReport: [line(1, { minutes: 4, chest: { stick: 1 } })],
  };
  for (const [name, state] of Object.entries({
    completing,
    stopping,
    fresh: looping(),
  })) {
    const before = JSON.parse(JSON.stringify(state));
    deepFreeze(state);
    for (const [label, call] of [
      ["passLoops", () => passLoops(state, S, S + 700 * MIN)],
      ["catchUp", () => catchUp(state, S + 700 * MIN)],
      ["closeAwayReport", () => closeAwayReport(state)],
    ]) {
      assert.doesNotThrow(call, `${label} on ${name}`);
    }
    assert.deepEqual(JSON.parse(JSON.stringify(state)), before, name);
  }
});
