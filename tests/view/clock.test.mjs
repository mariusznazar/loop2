// The clock of a game in the page: a game that leaves the page stops with it (spec section 7,
// "Extend clock with stop/dispose so repeated login does not accumulate timers or keep hidden
// games running").
import assert from "node:assert/strict";
import { mock, test } from "node:test";
import { MAPS } from "../../dist/public/sim/data/maps.js";
import { createCharacter, newGame } from "../../dist/public/sim/game.js";
import { createProgram } from "../../dist/public/sim/programs.js";
import { startClock } from "../../dist/public/view/clock.js";

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
    clock.send({ mapId: Object.keys(MAPS)[0], characterId: 1 });
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
    const withCharacter = createCharacter(newGame(), "Ala").state;
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
