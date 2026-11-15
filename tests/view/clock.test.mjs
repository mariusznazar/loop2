// The clock of a game in the page: a game that leaves the page stops with it (D-97), and one
// reading of the browser's clock reaches the simulation and the store (D-221, D-242).
import assert from "node:assert/strict";
import { mock, test } from "node:test";
import {
  advanceMinutes,
  createCharacter,
  mapRunEnded,
  newGame,
  passRealTime,
  send,
  withSaveTime,
} from "../../dist/browser/sim/game.js";
import {
  advanceLoopRun,
  catchUp,
  passLoops,
  startLoop,
} from "../../dist/browser/sim/loop.js";
import { createProgram } from "../../dist/browser/sim/programs.js";
import { startClock } from "../../dist/browser/view/clock.js";
import {
  newKnowingGame,
  withEdgeSolved,
} from "../sim/understanding-fixture.mjs";

/**
 * Runs `body` under Node's mocked timers, with the intervals still registered counted: the timer
 * API is the platform's, so the count tells whether a cleared clock left one behind.
 */
function withTimers(body) {
  mock.timers.enable({ apis: ["setInterval"] });
  const mockedSet = globalThis.setInterval;
  const mockedClear = globalThis.clearInterval;
  const live = new Set();
  globalThis.setInterval = (...args) => {
    const id = mockedSet(...args);
    live.add(id);
    return id;
  };
  globalThis.clearInterval = (id) => {
    live.delete(id);
    mockedClear(id);
  };
  try {
    body(live);
  } finally {
    globalThis.setInterval = mockedSet;
    globalThis.clearInterval = mockedClear;
    mock.timers.reset();
  }
}

/** A game holder that counts what the clock passes to it. */
function countingStore() {
  // A game with one character, so a send of it to a map is one the simulation takes.
  const state = createCharacter(newGame(), "Ala").state;
  const store = {
    applied: 0,
    get: () => state,
    apply() {
      store.applied += 1;
    },
  };
  return store;
}

test("a running clock passes time to its game on every 200 ms tick", () => {
  withTimers((live) => {
    const store = countingStore();
    startClock(store);
    assert.equal(live.size, 1);
    mock.timers.tick(1000);
    assert.equal(store.applied, 5);
  });
});

test("a disposed clock leaves no interval registered and passes no further time, however long", () => {
  withTimers((live) => {
    const store = countingStore();
    const clock = startClock(store);
    mock.timers.tick(200);
    assert.equal(store.applied, 1);
    clock.dispose();
    assert.equal(live.size, 0);
    mock.timers.tick(60_000);
    assert.equal(store.applied, 1);
  });
});

test("flush and send of a disposed clock no longer reach the game", () => {
  withTimers(() => {
    const store = countingStore();
    const clock = startClock(store);
    clock.dispose();
    clock.flush();
    assert.equal(store.applied, 0);
    // The first character a new game creates takes the id 1.
    clock.send({ mapId: "forest", characterId: 1 });
    assert.equal(store.applied, 0);
  });
});

test("games started and disposed one after another leave only the last clock running", () => {
  withTimers((live) => {
    const stores = [countingStore(), countingStore(), countingStore()];
    let clock = null;
    for (const store of stores) {
      clock?.dispose();
      clock = startClock(store);
    }
    assert.equal(live.size, 1);
    mock.timers.tick(1000);
    assert.deepEqual(
      stores.map((store) => store.applied),
      [0, 0, 5],
    );
  });
});

test("the clock's send carries the program number to the simulation's send", () => {
  withTimers(() => {
    const withCharacter = createCharacter(
      withEdgeSolved(newGame()),
      "Ala",
    ).state;
    const state = createProgram(withCharacter).state;
    const second = state.programs[1];
    let applied = null;
    const store = {
      get: () => state,
      apply(result) {
        applied = result.state;
      },
    };
    const clock = startClock(store);
    clock.send({ mapId: "forest", characterId: 1, programId: second.id });
    assert.equal(applied.run.copy.programId, second.id);
    clock.send({ mapId: "forest", characterId: 1 });
    assert.equal(applied.run.copy.programId, state.programs[0].id);
    clock.dispose();
  });
});

/** A real moment of the browser's clock, in ms. */
const T0 = 1_760_000_000_000;
/** The renewal of a resurrection, 480 real minutes (D-190), in ms: 480 × 60 000. */
const RENEWAL_MS = 28_800_000;
const SENT = { mapId: "forest", characterId: 1 };

/**
 * Runs `body` with both clocks in the case's hands, under the mocked intervals. The date gives T0
 * and then a second later at each reading, so two readings never pass for one; `body` moves the
 * elapsed time by `pass` and counts the readings of the date by `readings`. The first reading goes
 * to the start of the clock under test.
 */
function withBothClocks(body) {
  const saved = Object.getOwnPropertyDescriptor(globalThis, "performance");
  let elapsed = 0;
  let reading = T0 - 1000;
  const date = mock.method(Date, "now", () => (reading += 1000));
  Object.defineProperty(globalThis, "performance", {
    configurable: true,
    value: { now: () => elapsed },
  });
  try {
    withTimers((live) =>
      body({
        live,
        pass: (ms) => (elapsed += ms),
        // Moves the date the next reading gives on (or back, for a negative `ms`).
        jump: (ms) => (reading += ms),
        readings: () => date.mock.callCount(),
      }),
    );
  } finally {
    date.mock.restore();
    Object.defineProperty(globalThis, "performance", saved);
  }
}

/** A game holder that keeps what the clock hands it, each result in its turn. */
function holdingStore(state) {
  const store = {
    state,
    results: [],
    get: () => store.state,
    apply(result) {
      store.results.push(result);
      store.state = result.state;
    },
  };
  return store;
}

/** `state` with the character `id` holding one practice in each skill: a character with practice (D-190). */
function practised(state, id) {
  return {
    ...state,
    team: {
      ...state.team,
      characters: state.team.characters.map((character) =>
        character.id === id
          ? {
              ...character,
              skills: Object.fromEntries(
                Object.entries(character.skills).map(([skill, held]) => [
                  skill,
                  { ...held, practice: held.practice + 1 },
                ]),
              ),
            }
          : character,
      ),
    },
  };
}

/**
 * Ala, who has practice, on an empty program in Las, one game minute from dying of cold, the team's
 * resurrection ready from `readyAtMs` on, `practice` false for an Ala with none.
 */
function lastMinute(readyAtMs = 0, practice = true) {
  const made = createCharacter(withEdgeSolved(newKnowingGame()), "Ala").state;
  const ready = {
    ...made,
    team: { ...made.team, resurrectionReadyAtMs: readyAtMs },
  };
  let state = send(practice ? practised(ready, 1) : ready, SENT, 1).state;
  for (let next = state; !next.run.death;) {
    state = next;
    next = advanceMinutes(state, 1).state;
  }
  return state;
}

test("a flush reads the date once, whether the tick or a caller asks for it", () => {
  withBothClocks(({ readings }) => {
    const clock = startClock(
      holdingStore(createCharacter(newGame(), "Ala").state),
    );
    const start = readings();
    clock.flush();
    assert.equal(readings(), start + 1);
    mock.timers.tick(200);
    assert.equal(readings(), start + 2);
    clock.dispose();
    clock.flush();
    assert.equal(readings(), start + 2, "a disposed clock reads nothing");
  });
});

test("a send takes the one reading of its flush", () => {
  withBothClocks(({ readings }) => {
    const state = createCharacter(withEdgeSolved(newGame()), "Ala").state;
    const store = holdingStore(state);
    const clock = startClock(store);
    const start = readings();
    clock.send(SENT);
    assert.equal(readings(), start + 1, "the send makes one reading");
    // The date gives T0 to the start and T0 + 1000 to the next reading, the send's flush.
    assert.equal(
      store.state.run.seed,
      send(state, SENT, T0 + 1000).state.run.seed,
    );
    clock.dispose();
  });
});

// invariant: resurrection-renewal
// D-221: one result on each reading, so the store never holds a death unsettled.
test("a flush in which the character dies hands the store one result: the events of the passing of time with the death settled at that reading", () => {
  // decision: D-219 "The browser's clock counts the renewal of a resurrection, so the renewal runs in real time at every pace of a map run and while the game is closed"
  // decision: D-221 "Whoever passes game time gives the result to that function at once, with a moment of the browser's clock, so the game state the browser view holds, draws and saves holds a settled death"
  withBothClocks(({ pass }) => {
    const state = lastMinute();
    const store = holdingStore(state);
    const clock = startClock(store);
    pass(1000);
    clock.flush();
    assert.equal(store.results.length, 1);
    const [{ state: handed, events }] = store.results;
    const passed = passRealTime(state, 1000);
    assert.ok(
      passed.events.some((event) => event.kind === "characterDied"),
      "precondition: this second ends in the death",
    );
    assert.deepEqual(events, passed.events);
    assert.deepEqual(handed.run.deathSettlement, { kind: "resurrectionUsed" });
    assert.equal(handed.team.resurrectionReadyAtMs, T0 + 1000 + RENEWAL_MS);
    clock.dispose();
  });
});

// invariant: resurrection-renewal
// The moment of the reading decides: a resurrection ready from it on is ready, one a millisecond
// later is not, whatever moment the clock read when it started.
test("a death is settled against the reading of its flush, not an earlier one", () => {
  // decision: D-221 "Whoever passes game time gives the result to that function at once, with a moment of the browser's clock, so the game state the browser view holds, draws and saves holds a settled death"
  withBothClocks(({ pass }) => {
    for (const [offset, kind] of [
      [0, "resurrectionUsed"],
      [1, "progressLost"],
    ]) {
      // A second a reading: this one, the clock's start, then its flush.
      const flushMoment = Date.now() + 2000;
      const store = holdingStore(lastMinute(flushMoment + offset));
      const clock = startClock(store);
      pass(1000);
      clock.flush();
      assert.equal(store.state.run.deathSettlement.kind, kind);
      clock.dispose();
    }
  });
});

// D-190, D-221: a death of a character with no practice is settled at the reading too, and leaves the
// resurrection as it was.
test("a flush in which a character with no practice dies settles the death as none to pay for: the resurrection stays as it was", () => {
  // decision: D-190 "A character's death takes what it carried and pays nothing of its map run; when no resurrection is ready, it also takes all the character's practice, the practice gathered at its earning loop included, and every rank of branch it bought, and the character's generation number grows by one, its archetype unchanged, except that the death of a character with no practice yet — none in any skill, no rank of branch bought and none gathered at its earning loop — takes nothing besides what it carried, leaves the generation number as it was, uses up no resurrection, ready or not, and does not stop its earning loop"
  // decision: D-221 "Whoever passes game time gives the result to that function at once, with a moment of the browser's clock, so the game state the browser view holds, draws and saves holds a settled death"
  withBothClocks(({ pass }) => {
    for (const readyAtMs of [0, T0 + 10 * RENEWAL_MS]) {
      const state = lastMinute(readyAtMs, false);
      const store = holdingStore(state);
      const clock = startClock(store);
      pass(1000);
      clock.flush();
      assert.deepEqual(store.state.run.deathSettlement, { kind: "noPractice" });
      assert.equal(store.state.team.resurrectionReadyAtMs, readyAtMs);
      assert.equal(store.state.team.characters[0].generation, 1);
      clock.dispose();
    }
  });
});

/** Ala sent to Las, which her team has not solved, one game minute short of solving it, the team's resurrection ready from `readyAtMs` on. */
function oneMinuteFromSolving(readyAtMs) {
  const made = createCharacter(withEdgeSolved(newKnowingGame()), "Ala").state;
  const sent = send(
    { ...made, team: { ...made.team, resurrectionReadyAtMs: readyAtMs } },
    SENT,
    1,
  ).state;
  return {
    ...sent,
    run: {
      ...sent.run,
      body: { temperature: 37, satiety: 100, health: 100 },
      streak: 479,
      current: {
        activity: {
          kind: "rule",
          ruleId: 1,
          action: { kind: "explore" },
        },
        startMinute: sent.run.minute,
        endMinute: sent.run.minute + 1,
        stepTo: null,
      },
    },
  };
}

// invariant: resurrection-renewal
// D-190, D-221: the first completion of a map is settled at the reading of the flush that completes it.
test("a flush in which the map run solves its map for the first time settles the renewal at that reading, once", () => {
  withBothClocks(({ pass }) => {
    const store = holdingStore(oneMinuteFromSolving(T0 + 10 * RENEWAL_MS));
    const clock = startClock(store);
    pass(1000);
    clock.flush();
    assert.equal(store.results.length, 1);
    assert.ok(
      store.state.run.completion,
      "precondition: the map run completed",
    );
    assert.deepEqual(store.state.run.completionSettlement, {
      kind: "resurrectionRenewed",
    });
    // The date gives T0 to the start and a second more to this reading.
    assert.equal(store.state.team.resurrectionReadyAtMs, T0 + 1000);
    const settled = store.state;
    pass(200);
    clock.flush();
    assert.equal(store.state, settled, "a later reading changes nothing");
    clock.dispose();
  });
});

test("a flush in which the map run solves its map finds a ready resurrection ready and says so", () => {
  // decision: D-190 "The account has one resurrection, shared by all its characters: the death of a character with practice uses it up while it is ready, a death of a character with practice with none ready stops its earning loop, and it is renewed after a span of real time set in the balance data, eight hours to start, or at once by the first completion of a map the account has not solved yet, once for each map, a ready resurrection staying ready"
  withBothClocks(({ pass }) => {
    const store = holdingStore(oneMinuteFromSolving(0));
    const clock = startClock(store);
    pass(1000);
    clock.flush();
    assert.deepEqual(store.state.run.completionSettlement, {
      kind: "resurrectionReady",
    });
    assert.equal(store.state.team.resurrectionReadyAtMs, 0);
    clock.dispose();
  });
});

// D-221: a retained death goes through the same step of the clock, unsettled or settled.
test("a death standing on the screen is settled once, at the first reading", () => {
  // decision: D-221 "Whoever passes game time gives the result to that function at once, with a moment of the browser's clock, so the game state the browser view holds, draws and saves holds a settled death"
  withBothClocks(({ pass }) => {
    const dead = advanceMinutes(lastMinute(), 1).state;
    assert.equal(dead.run.deathSettlement, null, "precondition: unsettled");
    const store = holdingStore(dead);
    const clock = startClock(store);
    pass(200);
    clock.flush();
    const settled = store.state;
    assert.equal(settled.run.deathSettlement.kind, "resurrectionUsed");
    pass(200);
    clock.flush();
    assert.equal(store.state, settled, "a later reading changes nothing");
    clock.dispose();
  });
});

// D-207: the saver finds a change by the state's identity, so real time outside a map run may
// make no new state.
test("a flush of an unchanged game hands the store the very state it holds, with no events", () => {
  withBothClocks(({ pass }) => {
    const state = createCharacter(newGame(), "Ala").state;
    const store = holdingStore(state);
    const clock = startClock(store);
    pass(5000);
    clock.flush();
    assert.equal(store.results[0].state, state);
    assert.deepEqual(store.results[0].events, []);
    clock.dispose();
  });
});

test("the clock gives the moment of its latest reading: the start's until the first flush, then each flush's", () => {
  withBothClocks(({ pass }) => {
    const clock = startClock(
      holdingStore(createCharacter(newGame(), "Ala").state),
    );
    // The date gives T0 to the start and a second more to each later reading.
    assert.equal(clock.moment(), T0);
    pass(200);
    clock.flush();
    assert.equal(clock.moment(), T0 + 1000);
    mock.timers.tick(200);
    assert.equal(clock.moment(), T0 + 2000);
    clock.dispose();
  });
});

test("a send makes a reading, so the moment is the one the send took", () => {
  withBothClocks(() => {
    const clock = startClock(
      holdingStore(createCharacter(withEdgeSolved(newGame()), "Ala").state),
    );
    clock.send(SENT);
    assert.equal(clock.moment(), T0 + 1000);
    clock.dispose();
  });
});

test("a call follows each flush, after the store has the reading's result, and none follows dispose", () => {
  withBothClocks(() => {
    const order = [];
    const store = holdingStore(createCharacter(newGame(), "Ala").state);
    const apply = store.apply;
    store.apply = (result) => {
      order.push("apply");
      apply(result);
    };
    const clock = startClock(store, () => order.push("reading"));
    assert.deepEqual(order, [], "the start makes no call");
    clock.flush();
    assert.deepEqual(order, ["apply", "reading"]);
    mock.timers.tick(200);
    assert.deepEqual(order, ["apply", "reading", "apply", "reading"]);
    clock.dispose();
    clock.flush();
    mock.timers.tick(1000);
    assert.equal(order.length, 4, "a disposed clock calls nothing");
  });
});

// An unchanged game still gets the call: the view redraws the passing of real time on it.
test("a flush that changes nothing in the game is still followed by the call", () => {
  withBothClocks(() => {
    let calls = 0;
    const clock = startClock(
      holdingStore(createCharacter(newGame(), "Ala").state),
      () => (calls += 1),
    );
    mock.timers.tick(1000);
    assert.equal(calls, 5);
    clock.dispose();
  });
});

// --- the earning loops (D-242, D-247) ----------------------------------------------------------

/** One real minute of an earning loop, in ms (the balance's 60 real seconds of a game minute). */
const LOOP_MINUTE_MS = 60_000;

/** Ala (1) and Ola (2) with Las solved: Ola can go into a loop, Ala into the manual map run. */
function twoCharacters() {
  const made = createCharacter(
    createCharacter(newKnowingGame(), "Ala").state,
    "Ola",
  ).state;
  return { ...made, solvedMaps: ["forestEdge", "forest"] };
}

/** `state` with the loop of character `id` one game minute short of the end of its map run. */
function oneMinuteShort(state, id) {
  const whole = advanceLoopRun(state, id, 100_000);
  assert.ok(
    mapRunEnded(whole.state.loops[id].run),
    "precondition: the loop's map run ends",
  );
  return advanceLoopRun(state, id, whole.passed - 1).state;
}

/** Ola looping on the empty program in Las, one game minute short of the death of her first run. */
function loopingOla(state = twoCharacters()) {
  return oneMinuteShort(
    startLoop(state, { mapId: "forest", characterId: 2 }, 5).state,
    2,
  );
}

// D-221, D-242. Catches loops passed before the manual run, and a reading that hands
// the store the manual run's result and the loops' as two, so a moment of saving would come twice.
test("a reading passes the manual run, then the loops, and hands the store one result with their events together", () => {
  // decision: D-190 "A character's death takes what it carried and pays nothing of its map run; when no resurrection is ready, it also takes all the character's practice, the practice gathered at its earning loop included, and every rank of branch it bought, and the character's generation number grows by one, its archetype unchanged, except that the death of a character with no practice yet — none in any skill, no rank of branch bought and none gathered at its earning loop — takes nothing besides what it carried, leaves the generation number as it was, uses up no resurrection, ready or not, and does not stop its earning loop"
  // decision: D-221 "Whoever passes game time gives the result to that function at once, with a moment of the browser's clock, so the game state the browser view holds, draws and saves holds a settled death"
  // decision: D-239 "Each map run of an earning loop is a map run of its own, followed at once by the next as long as the earning loop goes on"
  // decision: D-241 "In every game state the browser view holds or a saved game state admits, the map run of an earning loop is going on: the function that reaches its end deals with that end at once"
  withBothClocks(({ pass, jump }) => {
    // Ola has no practice: her death in the loop takes nothing and her loop goes on.
    let state = send(loopingOla(practised(twoCharacters(), 1)), SENT, 1).state;
    for (;;) {
      const next = advanceMinutes(state, 1).state;
      if (next.run.death) break;
      state = next;
    }
    const store = holdingStore(state);
    const clock = startClock(store);
    pass(1000);
    jump(LOOP_MINUTE_MS - 1000);
    clock.flush();
    assert.equal(store.results.length, 1);
    const [{ state: handed, events }] = store.results;
    const manual = passRealTime(state, 1000).events;
    assert.ok(
      manual.some((event) => event.kind === "characterDied"),
      "precondition: this second ends the manual run in a death",
    );
    assert.deepEqual(events, [
      ...manual,
      { kind: "loopRunEnded", characterId: 2 },
    ]);
    assert.notEqual(
      handed.run.deathSettlement,
      null,
      "the manual death is settled",
    );
    assert.equal(handed.loops[2].runNumber, 2, "the loop took its end");
    clock.dispose();
  });
});

// invariant: resurrection-renewal
// D-190, D-242: of two deaths the earlier in real time takes the team's one resurrection. A loop's end
// lies at its minute's moment, here a millisecond before the reading, and the manual run's death at the reading.
test("in a reading that ends a loop's map run in a death and the manual run in another, the loop's death, earlier than the reading, takes the resurrection", () => {
  // decision: D-190 "A character's death takes what it carried and pays nothing of its map run; when no resurrection is ready, it also takes all the character's practice, the practice gathered at its earning loop included, and every rank of branch it bought, and the character's generation number grows by one, its archetype unchanged, except that the death of a character with no practice yet — none in any skill, no rank of branch bought and none gathered at its earning loop — takes nothing besides what it carried, leaves the generation number as it was, uses up no resurrection, ready or not, and does not stop its earning loop"
  // decision: D-190 "The account has one resurrection, shared by all its characters: the death of a character with practice uses it up while it is ready, a death of a character with practice with none ready stops its earning loop, and it is renewed after a span of real time set in the balance data, eight hours to start, or at once by the first completion of a map the account has not solved yet, once for each map, a ready resurrection staying ready"
  withBothClocks(({ pass, jump }) => {
    const both = practised(practised(twoCharacters(), 1), 2);
    let state = send(loopingOla(both), SENT, 1).state;
    for (;;) {
      const next = advanceMinutes(state, 1).state;
      if (next.run.death) break;
      state = next;
    }
    const store = holdingStore(state);
    const clock = startClock(store);
    pass(1000);
    // The date gave T0 to the start; the loop's minute lies at T0 + 60 s, the reading a millisecond later.
    jump(LOOP_MINUTE_MS - 1000 + 1);
    clock.flush();
    const handed = store.state;
    assert.equal(
      handed.team.resurrectionReadyAtMs,
      T0 + LOOP_MINUTE_MS + RENEWAL_MS,
    );
    assert.equal(
      handed.team.characters[1].generation,
      1,
      "Ola's loop death used it",
    );
    assert.ok(handed.loops[2], "her loop goes on");
    assert.equal(
      handed.team.characters[0].generation,
      2,
      "Ala's death found it used",
    );
    assert.deepEqual(handed.run.deathSettlement, {
      kind: "progressLost",
      generation: 2,
    });
    clock.dispose();
  });
});

// D-242: the k-th minute has the real moment fromMs plus k minutes, so a death in the loop is
// settled at the minute's moment, never at the reading's.
test("a loop's end is settled at the minute's own moment, not at the reading's", () => {
  withBothClocks(({ jump }) => {
    const store = holdingStore(loopingOla(practised(twoCharacters(), 2)));
    const clock = startClock(store);
    // The date gave T0 to the start; this reading comes 61 s after it, one whole minute and a second.
    jump(LOOP_MINUTE_MS);
    clock.flush();
    assert.equal(
      store.state.team.resurrectionReadyAtMs,
      T0 + LOOP_MINUTE_MS + RENEWAL_MS,
    );
    clock.dispose();
  });
});

// D-242: the loop clock takes its new value before it hands the result to the store. Catches a
// value taken after the hand-over: the saver's moment of saving reads the clock again inside
// `apply`, and the same minute would be passed twice.
test("minutes of a loop are never passed twice when apply reads the clock again", () => {
  withBothClocks(({ jump }) => {
    const state = loopingOla();
    const store = holdingStore(state);
    let clock = null;
    let nested = false;
    const apply = store.apply;
    store.apply = (result) => {
      apply(result);
      // As a moment of saving does: a reading inside the hand-over of a reading.
      if (!nested) {
        nested = true;
        clock.flush();
      }
    };
    clock = startClock(store);
    jump(LOOP_MINUTE_MS - 1000);
    clock.flush();
    // The reading at T0 + 60 s passed the one minute; the nested one, a second later, none.
    assert.deepEqual(
      store.state,
      passLoops(state, T0, T0 + LOOP_MINUTE_MS).state,
    );
    assert.equal(store.state.loops[2].run.minute, 0);
    clock.dispose();
  });
});

// D-242: a clock set back takes nothing and the loop clock runs from now.
test("a date turned back passes nothing and the loop clock then runs from the date read", () => {
  withBothClocks(({ jump }) => {
    const state = loopingOla();
    const store = holdingStore(state);
    const clock = startClock(store);
    jump(-5000);
    clock.flush();
    assert.equal(store.results[0].state, state, "nothing was taken");
    assert.deepEqual(store.results[0].events, []);
    // That reading was T0 - 4 s. The next, exactly one minute after it, passes one minute; had the
    // loop clock stayed at T0 it would have passed none.
    jump(LOOP_MINUTE_MS - 1000);
    clock.flush();
    assert.equal(store.results[1].events.length, 1);
    assert.equal(store.results[1].events[0].kind, "loopRunEnded");
    clock.dispose();
  });
});

// D-242: with no loop the clock is set to the reading, so a first loop gets a full minute.
test("a loop started by the clock gets a full first minute, and its first run is seeded by the reading it took", () => {
  // decision: D-239 "An earning loop goes only on a solved map, one game minute per real minute, and the speed control does not reach it, while a manual map run may be fast-forwarded"
  withBothClocks(({ jump }) => {
    const state = twoCharacters();
    const store = holdingStore(state);
    const clock = startClock(store);
    jump(120_000);
    clock.startLoop({ mapId: "forest", characterId: 2 });
    // The date gave T0 to the start and T0 + 121 s to the reading of the start of the loop.
    const expected = startLoop(
      state,
      { mapId: "forest", characterId: 2 },
      T0 + 121_000,
    ).state;
    assert.deepEqual(store.state, expected);
    const started = store.state;
    assert.equal(clock.moment(), T0 + 121_000);
    // The next reading is 59 s later: no minute. The one after it is 60 s later: one whole minute.
    jump(58_000);
    clock.flush();
    assert.equal(store.state, started, "59 s are no minute");
    clock.flush();
    assert.equal(store.state.loops[2].run.minute, 1);
    clock.dispose();
  });
});

test("a loop started or a catch-up asked of a disposed clock reaches nothing", () => {
  withBothClocks(() => {
    const store = holdingStore(twoCharacters());
    const clock = startClock(store);
    clock.dispose();
    clock.startLoop({ mapId: "forest", characterId: 2 });
    clock.catchUp();
    assert.equal(store.results.length, 0);
  });
});

/** `state` saved `savedMs` before the date the catch-up will read (T0 + 1 s). */
function savedBefore(state, savedMs) {
  return withSaveTime(state, T0 + 1000 - savedMs);
}

// D-247, D-242. Catches a catch-up that reads another moment than the one the clock keeps for the
// view, and one that loses the rest shorter than a minute.
test("the catch-up spans from the save time to the date it reads, which is the clock's moment, and the rest waits", () => {
  // decision: D-239 "An earning loop goes only on a solved map, one game minute per real minute, and the speed control does not reach it, while a manual map run may be fast-forwarded"
  withBothClocks(({ jump }) => {
    const state = savedBefore(loopingOla(), 150_000);
    const store = holdingStore(state);
    const clock = startClock(store);
    clock.catchUp();
    assert.equal(store.results.length, 1, "one result");
    assert.equal(clock.moment(), T0 + 1000);
    assert.deepEqual(store.state, catchUp(state, T0 + 1000).state);
    assert.equal(store.state.awayReport[0].minutes, 2, "150 s are two minutes");
    assert.equal(store.state.loops[2].run.minute, 1);
    // The 30 s left wait: the loop clock stands at the save time plus two minutes, T0 - 29 s, so
    // the next minute is complete at T0 + 31 s.
    jump(28_000);
    clock.flush();
    assert.equal(clock.moment(), T0 + 30_000);
    assert.equal(
      store.state.loops[2].run.minute,
      1,
      "T0 + 30 s: no minute yet",
    );
    clock.flush();
    assert.equal(
      store.state.loops[2].run.minute,
      2,
      "T0 + 31 s: the next minute",
    );
    clock.dispose();
  });
});

test("the catch-up of a game with no loop, or one never saved, leaves the very state", () => {
  withBothClocks(() => {
    for (const state of [savedBefore(twoCharacters(), 600_000), loopingOla()]) {
      const store = holdingStore(state);
      const clock = startClock(store);
      clock.catchUp();
      assert.equal(store.state, state);
      clock.dispose();
    }
  });
});
