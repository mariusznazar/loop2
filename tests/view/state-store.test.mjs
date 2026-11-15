// The store of the game state (D-04, D-207, D-323, D-247). These tests run the store on jsdom
// through tests/view/page-document.mjs (D-264, D-268), because its saver builds a warning element and
// listens to the page's visibility, with Node's mocked timers, a date that stands still and a
// browser clock the case moves by hand. They prove what the store takes, when it reads the clock and
// when it saves, never what a screen draws (D-88).
import { assert, withPage } from "./page-document.mjs";
import { mock, test } from "node:test";
import {
  advanceMinutes,
  createCharacter,
  mapRunEnded,
  newGame,
  send,
  setPace,
  setPaused,
  withSaveTime,
} from "../../dist/browser/sim/game.js";
import { advanceLoopRun, startLoop } from "../../dist/browser/sim/loop.js";
import { createStateStore } from "../../dist/browser/view/state-store.js";
import { withEdgeSolved } from "../sim/understanding-fixture.mjs";

/** The real date the page's clock reads. */
const CLOCK_MS = 1_760_000_000_000;

/** Gives the page's continuations their turns. */
async function turns() {
  for (let round = 0; round < 8; round += 1) await Promise.resolve();
}

/** A game whose map run passes: Ala sent to Las at the real date 0, at game minute 0. */
const passing = () =>
  send(
    createCharacter(withEdgeSolved(newGame()), "Ala").state,
    { mapId: "forest", characterId: 1 },
    0,
  ).state;

/** A game with Ala, in no map run, with Las open to send her to. */
const idle = () => createCharacter(withEdgeSolved(newGame()), "Ala").state;

/**
 * The state of `start`'s map run one game minute before it ends in a death or a completion, the
 * pauses of discoveries lifted on the way.
 */
function oneMinuteBeforeTheEnd(start) {
  let before = setPaused(start, false).state;
  for (let round = 0; round < 100_000; round += 1) {
    const next = advanceMinutes(setPaused(before, false).state, 1).state;
    if (mapRunEnded(next.run)) {
      assert.ok(
        !mapRunEnded(before.run),
        "precondition: the run had not ended",
      );
      return setPaused(before, false).state;
    }
    before = next;
  }
  return assert.fail("precondition: the map run ends");
}

/**
 * Ala and Bela, each in an earning loop in Las one game minute from the end of her first map run:
 * a game built from a save of the two catches up a minute, which ends both runs.
 */
function loopingPair() {
  const made = {
    ...createCharacter(createCharacter(newGame(), "Ala").state, "Bela").state,
    solvedMaps: ["forest"],
  };
  let state = made;
  for (const characterId of [1, 2]) {
    const started = startLoop(state, { mapId: "forest", characterId }, 5);
    const whole = advanceLoopRun(started.state, characterId, 100_000);
    assert.ok(
      mapRunEnded(whole.state.loops[characterId].run),
      "precondition: the run of the loop ends",
    );
    state = advanceLoopRun(started.state, characterId, whole.passed - 1).state;
  }
  return state;
}

/**
 * Runs `body` with a store built on `state`, the case's callbacks counted, Node's mocked timers, a
 * date that stands at `CLOCK_MS` and a browser clock `body` moves with `pass`. The save requests the
 * store sends are kept in `sent`, each answered at once. `delays` lists the intervals the game
 * registered, in the order it registered them.
 */
async function onStore(state, body, { revision = 0 } = {}) {
  await withPage(async () => {
    mock.timers.enable({ apis: ["setInterval", "setTimeout"] });
    const date = mock.method(Date, "now", () => CLOCK_MS);
    const savedPerformance = Object.getOwnPropertyDescriptor(
      globalThis,
      "performance",
    );
    let elapsed = 0;
    Object.defineProperty(globalThis, "performance", {
      configurable: true,
      value: { now: () => elapsed },
    });
    const mockedSet = globalThis.setInterval;
    const mockedClear = globalThis.clearInterval;
    const live = new Map();
    const delays = [];
    globalThis.setInterval = (callback, delay, ...rest) => {
      const id = mockedSet(callback, delay, ...rest);
      live.set(id, delay);
      delays.push(delay);
      return id;
    };
    globalThis.clearInterval = (id) => {
      live.delete(id);
      mockedClear(id);
    };
    const sent = [];
    const taken = [];
    const readings = { count: 0 };
    const store = createStateStore({
      state,
      revision,
      client: {
        saveGame(submission) {
          sent.push(submission);
          return Promise.resolve({ kind: "saved", revision: sent.length });
        },
      },
      onConflict: () => undefined,
      onOutdated: () => undefined,
      onSignedOut: () => undefined,
      onTaken: (one) => taken.push(one),
      onReading: () => (readings.count += 1),
    });
    try {
      await body({
        store,
        sent,
        taken,
        readings,
        intervals: live,
        delays,
        dateReads: () => date.mock.callCount(),
        pass: (ms) => (elapsed += ms),
      });
    } finally {
      store.dispose();
      globalThis.setInterval = mockedSet;
      globalThis.clearInterval = mockedClear;
      mock.timers.reset();
      date.mock.restore();
      Object.defineProperty(globalThis, "performance", savedPerformance);
    }
  });
}

// decision: D-409 "An act of the player that depends on the passing of time goes through the store of the game state, which reads the clock and passes the time elapsed to the simulation before the act runs"
// Catches an act that runs before the clock is read, so its result is computed from a stale state.
test("an act's body runs after one reading of the clock that passed the real time elapsed", async () => {
  await onStore(passing(), async ({ store, taken, readings, pass }) => {
    assert.equal(store.get().run.minute, 0, "precondition: minute 0");
    pass(1000);
    let seen = null;
    store.act(() => {
      seen = store.get().run.minute;
    });
    // 1000 ms of real time are one game minute at pace 1× (D-21).
    assert.equal(seen, 1);
    assert.equal(readings.count, 1);
    assert.equal(taken.length, 1, "the reading's result was taken");
    assert.equal(taken[0].before.run.minute, 0);
    assert.equal(taken[0].result.state.run.minute, 1);
  });
});

// decision: D-409 "A new character and the purchase of a branch rank do not catch up time"
// Catches a new character or a bought branch rank that catches up time, which D-04 gives to no act
// of them: the clock would pass the minutes and change the state under them.
test("an act without catch-up reads no clock and passes no time", async () => {
  await onStore(passing(), async ({ store, taken, readings, pass }) => {
    pass(1000);
    let seen = null;
    store.actWithoutCatchUp(() => {
      seen = store.get().run.minute;
    });
    assert.equal(seen, 0);
    assert.equal(readings.count, 0);
    assert.equal(taken.length, 0);
    assert.equal(store.get().run.minute, 0);
  });
});

// Catches a moment of saving missing after an act, a second one for an act that changed nothing,
// and a save request counted twice for one act.
test("an act that changes the state sends one save, and one that changes nothing sends none", async () => {
  // decision: D-207 "The game saves the game state on the server by itself right after each change of it the player makes — an edit of a program or of the copy, an act on the list of programs, creating a character"
  await onStore(newGame(), async ({ store, sent }) => {
    store.act((take) => take(createCharacter(store.get(), "Ala")));
    await turns();
    assert.equal(sent.length, 1);
    assert.equal(store.get().team.characters.length, 1);
    store.act((take) => take({ state: store.get(), events: [] }));
    store.actWithoutCatchUp((take) => take({ state: store.get(), events: [] }));
    await turns();
    assert.equal(sent.length, 1);
    store.actWithoutCatchUp((take) =>
      take(createCharacter(store.get(), "Bela")),
    );
    await turns();
    assert.equal(sent.length, 2);
  });
});

// Catches a chronicle that misses a result, or hears one twice, or hears the state it already holds.
test("onTaken hears each result that replaced the state once, with the state before it and the copy act", async () => {
  await onStore(newGame(), async ({ store, taken }) => {
    const before = store.get();
    const result = createCharacter(before, "Ala");
    store.act((take) => take(result, { kind: "save" }));
    assert.equal(taken.length, 1);
    assert.equal(taken[0].result, result);
    assert.equal(taken[0].before, before);
    assert.deepEqual(taken[0].copyAct, { kind: "save" });
    assert.equal(taken[0].endedRun, false);
    assert.equal(store.get(), result.state);
    store.act((take) => take({ state: store.get(), events: [] }));
    assert.equal(taken.length, 1, "the state held is not taken again");
  });
});

// Catches a refusal of the same state that still calls the screens, and a second state kept beside
// the one the acts read.
test("a result that holds the very state the store holds is ignored, and an act's later take reads the state the earlier one gave", async () => {
  await onStore(newGame(), async ({ store, taken }) => {
    store.actWithoutCatchUp((take) => {
      take(createCharacter(store.get(), "Ala"));
      take(createCharacter(store.get(), "Bela"));
    });
    assert.equal(store.get().team.characters.length, 2);
    assert.equal(taken.length, 2);
  });
});

// Catches a map run that ends at a reading and is not saved at once (D-207).
test("a reading that ends a manual map run is one moment of saving, and a reading that changes the state without ending it is none", async () => {
  // decision: D-207 "The game saves the game state on the server by itself right after each change of it the player makes — an edit of a program or of the copy, an act on the list of programs, creating a character, sending one, „Puść w pętlę”, „Zatrzymaj”, „Odbierz”, buying a branch rank, „Restart”, „Zakończ”, „Zamknij” of the report, a pause and a pace — right after a manual map run ends in a completion or in the character's death"
  await onStore(
    oneMinuteBeforeTheEnd(passing()),
    async ({ store, sent, taken, pass }) => {
      pass(1000);
      store.act(() => undefined);
      await turns();
      assert.equal(taken.length, 1);
      assert.equal(taken[0].endedRun, true);
      assert.ok(mapRunEnded(store.get().run), "precondition: the run ended");
      assert.equal(sent.length, 1);
    },
  );
  await onStore(passing(), async ({ store, sent, taken, pass }) => {
    pass(1000);
    store.act(() => undefined);
    await turns();
    assert.equal(taken.length, 1, "the reading changed the state");
    assert.equal(taken[0].endedRun, false);
    assert.equal(sent.length, 0, "a game minute alone is no moment of saving");
  });
});

// Catches one save for each loop's map run that a result ended, where D-207 gives one for the result.
test("a catch-up whose result ended the map runs of two earning loops is one moment of saving", async () => {
  // decision: D-207 "The game saves the game state on the server by itself right after each change of it the player makes — an edit of a program or of the copy, an act on the list of programs, creating a character, sending one, „Puść w pętlę”, „Zatrzymaj”, „Odbierz”, buying a branch rank, „Restart”, „Zakończ”, „Zamknij” of the report, a pause and a pace — right after a manual map run ends in a completion or in the character's death, right after a reading of the clock or a catch-up whose result ended map runs of earning loops, with one save for that result"
  const state = withSaveTime(loopingPair(), CLOCK_MS - 60_000);
  await onStore(state, async ({ store, sent, taken }) => {
    store.catchUp();
    await turns();
    assert.equal(taken.length, 1);
    assert.equal(
      taken[0].result.events.filter((event) => event.kind === "loopRunEnded")
        .length,
      2,
      "precondition: two map runs of loops ended",
    );
    assert.equal(sent.length, 1);
  });
});

// Catches a send or a loop start that is not a moment of saving. The clock's own flush before each is
// pinned by tests/view/clock.test.mjs.
test("a send and a start of a loop are each one moment of saving", async () => {
  // decision: D-207 "The game saves the game state on the server by itself right after each change of it the player makes — an edit of a program or of the copy, an act on the list of programs, creating a character, sending one, „Puść w pętlę”"
  await onStore(idle(), async ({ store, sent }) => {
    store.send({ mapId: "forest", characterId: 1 });
    await turns();
    assert.ok(store.get().run !== null, "the character was sent");
    assert.equal(sent.length, 1);
  });
  await onStore(
    { ...idle(), solvedMaps: ["forest"] },
    async ({ store, sent }) => {
      store.startLoop({ mapId: "forest", characterId: 1 });
      await turns();
      assert.ok(
        Object.hasOwn(store.get().loops, 1),
        "the character is in a loop",
      );
      assert.equal(sent.length, 1);
    },
  );
});

// Catches a moment of the clock that does not move with the reading, which the resurrection lines read.
test("the moment of the store is the date of the clock's latest reading", async () => {
  await onStore(newGame(), async ({ store, dateReads }) => {
    assert.equal(store.moment(), CLOCK_MS);
    const reads = dateReads();
    store.act(() => undefined);
    assert.equal(dateReads(), reads + 1, "a reading reads the date once");
    store.actWithoutCatchUp(() => undefined);
    assert.equal(dateReads(), reads + 1, "an act without catch-up reads none");
  });
});

// Catches a kept document made from a state the clock has not caught up, which D-211 forbids, and a
// revision the saver did not give.
test("keep reads the clock first and gives the state as a document with the saver's revision", async () => {
  await onStore(
    passing(),
    async ({ store, readings, pass }) => {
      pass(1000);
      const kept = store.keep();
      assert.equal(readings.count, 1);
      assert.equal(kept.revision, 7);
      assert.equal(
        kept.document.game.saveTimeMs,
        CLOCK_MS,
        "the document holds the clock's moment as its save time",
      );
      assert.equal(kept.document.game.run.minute, 1);
    },
    { revision: 7 },
  );
});

// The clock registers its timer before the saver registers its own, as the game has always started
// them; a saver started first would read a clock that does not exist yet.
test("the clock's interval is registered before the saver's, and dispose clears both", async () => {
  await onStore(newGame(), async ({ store, intervals, delays }) => {
    assert.deepEqual(delays, [200, 30_000]);
    assert.equal(intervals.size, 2);
    store.dispose();
    assert.equal(intervals.size, 0);
  });
});

// invariant: uncaught-failure-game-state
// Catches a store that takes a result after an error nothing handled, or reads the clock for a save
// afterwards, whose error would come back with every save (D-323).
test("after halt() no result is taken, no act changes the state, and keep makes no reading", async () => {
  // decision: D-323 "After an error that no code of the game handled, an exception or a rejected promise, the game state held in the page changes no more until the page is reloaded, and saving goes on as D-207, D-208 and D-97 give it, sending the last whole game state from before the error, which it reads without a new reading of the clock"
  await onStore(
    passing(),
    async ({ store, sent, taken, readings, intervals, pass }) => {
      store.halt();
      assert.equal(store.halted(), true);
      assert.equal(intervals.size, 1, "only the saver's interval is left");
      const held = store.get();
      pass(5000);
      store.act((take) => take(setPace(store.get(), 4)));
      store.actWithoutCatchUp((take) =>
        take(createCharacter(store.get(), "Bela")),
      );
      store.send({ mapId: "forest", characterId: 1 });
      await turns();
      assert.equal(store.get(), held, "the state is the one held at halt");
      assert.equal(taken.length, 0);
      assert.equal(sent.length, 0, "nothing changed, so nothing is saved");
      const kept = store.keep();
      assert.equal(readings.count, 0, "no reading was made");
      assert.deepEqual(
        kept.document.game.run.minute,
        0,
        "the document holds the state as it stood, no time passed",
      );
      store.halt();
      assert.equal(store.halted(), true, "a second halt changes nothing");
    },
  );
});
