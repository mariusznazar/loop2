// The game saver (task zapis-stanu-na-serwerze, To do 7, 8 and 10; spec sections 6 and 8; D-207,
// D-208, D-209, D-210, D-211, D-97). These tests run the saver with a client the test answers,
// Node's mocked timers and a hand-made document model: they prove when it sends, what it sends and
// what it shows and reports for each outcome, never real events or rendering (D-88). Each document
// holds the clock's moment as its save time (task petla-zarobkowa, To do 10 and row 13; D-231).
import assert from "node:assert/strict";
import { mock, test } from "node:test";
import {
  createCharacter,
  newGame,
  passRealTime,
  send,
  setPace,
  setPaused,
  withSaveTime,
} from "../../dist/public/sim/game.js";
import { loadSavedGame, savedGame } from "../../dist/public/sim/saved-game.js";
import { createGameSaver } from "../../dist/public/view/game-saver.js";

// --- a document model with just what the saver builds and listens to -----------------------

class FakeElement {
  constructor(tag) {
    this.tag = tag;
    this.attributes = new Map();
    this.className = "";
    this.hidden = false;
    this.textContent = "";
  }

  setAttribute(name, value) {
    this.attributes.set(name, String(value));
  }
}

const fakeDocument = {
  visibilityState: "visible",
  listeners: new Map(),
  createElement: (tag) => new FakeElement(tag),
  addEventListener(type, listener) {
    if (!this.listeners.has(type)) this.listeners.set(type, new Set());
    this.listeners.get(type).add(listener);
  },
  removeEventListener(type, listener) {
    this.listeners.get(type)?.delete(listener);
  },
  /** The page becomes hidden or visible again, as a browser tells it. */
  turn(state) {
    this.visibilityState = state;
    for (const listener of this.listeners.get("visibilitychange") ?? [])
      listener({ type: "visibilitychange" });
  },
};

async function settle() {
  for (let round = 0; round < 10; round += 1) await Promise.resolve();
}

/**
 * Runs `body` on the hand-made document under Node's mocked timers, with the timers still
 * registered counted, so a disposed saver can be seen to leave none behind.
 */
async function onPage(body) {
  const saved = globalThis.document;
  globalThis.document = fakeDocument;
  fakeDocument.visibilityState = "visible";
  fakeDocument.listeners = new Map();
  mock.timers.enable({ apis: ["setInterval", "setTimeout"] });
  const real = {
    setInterval: globalThis.setInterval,
    clearInterval: globalThis.clearInterval,
    setTimeout: globalThis.setTimeout,
    clearTimeout: globalThis.clearTimeout,
  };
  const live = new Set();
  globalThis.setInterval = (...args) => {
    const id = real.setInterval(...args);
    live.add(id);
    return id;
  };
  globalThis.clearInterval = (id) => {
    live.delete(id);
    real.clearInterval(id);
  };
  globalThis.setTimeout = (callback, ...rest) => {
    const id = real.setTimeout(
      () => {
        live.delete(id);
        callback();
      },
      ...rest,
    );
    live.add(id);
    return id;
  };
  globalThis.clearTimeout = (id) => {
    live.delete(id);
    real.clearTimeout(id);
  };
  try {
    await body(live);
  } finally {
    Object.assign(globalThis, real);
    mock.timers.reset();
    globalThis.document = saved;
  }
}

/** A client whose saves the test answers when it chooses, in the order they were sent. */
function heldClient() {
  const sent = [];
  const waiting = [];
  return {
    client: {
      saveGame(submission) {
        sent.push(submission);
        return new Promise((resolve) => waiting.push(resolve));
      },
    },
    sent,
    waiting,
    async answer(outcome) {
      assert.ok(waiting.length > 0, "no save is waiting");
      waiting.shift()(outcome);
      await settle();
    },
  };
}

/** The real date the page's clock reads, unless a case moves it on. */
const CLOCK_MS = 1_760_000_000_000;

/**
 * The page's one game state: `read` passes real time first and takes the real date as the clock's
 * moment, as the page's clock does at each reading.
 */
function gameOf(state) {
  const game = {
    state,
    realMsPerRead: 0,
    dateMs: CLOCK_MS,
    momentMs: CLOCK_MS - 1,
    read() {
      game.momentMs = game.dateMs;
      const result = passRealTime(game.state, game.realMsPerRead);
      // The page keeps a result only when it differs (store.apply).
      if (result.state !== game.state) game.state = result.state;
      return game.state;
    },
    act(result) {
      game.state = result.state;
    },
  };
  return game;
}

/** The callbacks of the page, counted. */
function pageCalls() {
  const calls = { conflict: 0, outdated: 0, signedOut: 0 };
  return {
    calls,
    onConflict: () => (calls.conflict += 1),
    onOutdated: () => (calls.outdated += 1),
    onSignedOut: () => (calls.signedOut += 1),
  };
}

function saverOf(held, game, revision = 3, extra = {}) {
  const page = pageCalls();
  const saver = createGameSaver({
    client: held.client,
    read: () => game.read(),
    moment: () => game.momentMs,
    state: game.state,
    revision,
    onConflict: page.onConflict,
    onOutdated: page.onOutdated,
    onSignedOut: page.onSignedOut,
    ...extra,
  });
  return { saver, calls: page.calls };
}

/**
 * What a save of `state` sends, written out from the document of the saved game state, stamped with
 * the clock's moment: To do 10 with D-206 and row 13, every document holds it.
 */
function submissionOf(state, basedOn) {
  const { version, game } = savedGame(state);
  return { version, basedOn, game: { ...game, saveTimeMs: CLOCK_MS } };
}

const withCharacter = () => createCharacter(newGame(), "Ala").state;
/** A game whose map run passes: sent at the real date 0, unpaused. */
const passing = () =>
  send(withCharacter(), { mapId: "forest", characterId: 1 }, 0).state;

const SAVED = (revision) => ({ kind: "saved", revision });
const FAILED = {
  kind: "failed",
  failure: {
    kind: "unreachable",
    reason: "network",
    message: "Brak połączenia z serwerem. Spróbuj ponownie.",
  },
};
const RETRYING = "Nie udało się zapisać postępu. Gra spróbuje ponownie.";

// --- one request at a time -------------------------------------------------------------------

test("a moment during a request in flight sends once more, after the answer, with the state of that time", async () => {
  await onPage(async () => {
    const held = heldClient();
    const game = gameOf(withCharacter());
    const { saver } = saverOf(held, game);
    const first = game.state;
    saver.moment();
    assert.equal(held.sent.length, 1);

    game.act(setPace(game.state, 4));
    saver.moment();
    game.act(setPace(game.state, 8));
    saver.moment();
    await settle();
    assert.equal(
      held.sent.length,
      1,
      "nothing more goes while one is in flight",
    );

    const latest = game.state;
    await held.answer(SAVED(4));
    assert.equal(held.sent.length, 2, "the moments meanwhile send once");
    assert.deepEqual(held.sent[0], submissionOf(first, 3));
    assert.deepEqual(held.sent[1], submissionOf(latest, 4));
    saver.dispose();
  });
});

// --- the outcomes ----------------------------------------------------------------------------

const TOO_LARGE =
  "Nie udało się zapisać postępu: stan gry jest za duży. Usuń niepotrzebne programy.";
const CONFLICT =
  "Gra została zapisana w innej przeglądarce. Wczytano ten zapis.";
const OUTDATED = "Gra została zaktualizowana. Odśwież stronę.";
const LOGOUT_FAILED =
  "Nie udało się zapisać postępu. Spróbuj wylogować się ponownie.";

/** The header sentence the saver stands for, or null while its line is hidden. */
function sentenceOf(saver) {
  return saver.element.hidden ? null : saver.element.textContent;
}

test("a save that succeeds keeps its revision for the next save and takes away the sentence that stood from a conflict", async () => {
  await onPage(async () => {
    const held = heldClient();
    const game = gameOf(withCharacter());
    const { saver } = saverOf(held, game, 3, { afterConflict: true });
    assert.equal(sentenceOf(saver), CONFLICT);
    saver.moment();
    await held.answer(SAVED(4));
    assert.equal(sentenceOf(saver), null);
    assert.equal(saver.revision(), 4);
    saver.moment();
    assert.equal(held.sent[1].basedOn, 4);
    saver.dispose();
  });
});

test("a failed save shows that the game retries, and the retries follow after 5, 10 and 20 s and then every 30 s, each with the state of its time", async () => {
  await onPage(async () => {
    const held = heldClient();
    const game = gameOf(withCharacter());
    const { saver } = saverOf(held, game);
    saver.moment();
    await held.answer(FAILED);
    assert.equal(sentenceOf(saver), RETRYING);

    // Real milliseconds after each failure, written out from D-208: 5, 10, 20, 30 and 30 s. The
    // state changes only in the last millisecond, so the 30-second check finds nothing to send.
    const waits = [5_000, 10_000, 20_000, 30_000, 30_000];
    for (const [index, wait] of waits.entries()) {
      mock.timers.tick(wait - 1);
      assert.equal(held.sent.length, index + 1, `no retry before ${wait} ms`);
      game.act(setPace(game.state, index % 2 === 0 ? 2 : 4));
      mock.timers.tick(1);
      assert.equal(held.sent.length, index + 2, `a retry at ${wait} ms`);
      // To do 10 with D-206; row 13: each retry's document is stamped too.
      assert.deepEqual(held.sent.at(-1).game, submissionOf(game.state, 0).game);
      await held.answer(FAILED);
      assert.equal(sentenceOf(saver), RETRYING);
    }
    saver.dispose();
  });
});

test("a moment while a retry waits sends at once, and its failure waits for the next step of the rhythm", async () => {
  await onPage(async () => {
    const held = heldClient();
    const game = gameOf(withCharacter());
    const { saver } = saverOf(held, game);
    saver.moment();
    await held.answer(FAILED);
    mock.timers.tick(2_000);
    game.act(setPace(game.state, 2));
    saver.moment();
    assert.equal(held.sent.length, 2);
    await held.answer(FAILED);
    // The second failure in a row waits 10 s, and the retry the moment replaced does not come.
    mock.timers.tick(9_999);
    assert.equal(held.sent.length, 2);
    mock.timers.tick(1);
    assert.equal(held.sent.length, 3);
    await held.answer(SAVED(4));
    assert.equal(sentenceOf(saver), null);
    // A success ends the run of failures: the next failure waits 5 s again.
    saver.moment();
    await held.answer(FAILED);
    mock.timers.tick(4_999);
    assert.equal(held.sent.length, 4);
    mock.timers.tick(1);
    assert.equal(held.sent.length, 5);
    saver.dispose();
  });
});

test("a moment during a request that then fails sends once more at once after the answer, not after the retry's wait", async () => {
  await onPage(async () => {
    const held = heldClient();
    const game = gameOf(withCharacter());
    const { saver } = saverOf(held, game);
    saver.moment();
    game.act(setPace(game.state, 2));
    saver.moment();
    await held.answer(FAILED);
    assert.equal(held.sent.length, 2);
    assert.deepEqual(held.sent[1], submissionOf(game.state, 3));
    assert.equal(sentenceOf(saver), RETRYING);
    saver.dispose();
  });
});

test("a save refused as too large shows its sentence and is not retried; a moment, or a check that finds a changed state, tries again", async () => {
  await onPage(async () => {
    const held = heldClient();
    const game = gameOf(withCharacter());
    const { saver } = saverOf(held, game);
    saver.moment();
    await held.answer({ kind: "too-large" });
    assert.equal(sentenceOf(saver), TOO_LARGE);
    mock.timers.tick(120_000);
    fakeDocument.turn("hidden");
    assert.equal(held.sent.length, 1, "no retry, and nothing changed");

    fakeDocument.turn("visible");
    game.act(setPace(game.state, 2));
    fakeDocument.turn("hidden");
    assert.equal(held.sent.length, 2, "the hiding check finds the change");
    await held.answer({ kind: "too-large" });
    saver.moment();
    assert.equal(held.sent.length, 3, "a moment sends with nothing changed");
    await held.answer(SAVED(4));
    assert.equal(sentenceOf(saver), null);
    saver.dispose();
  });
});

test("a conflict and a missing session go to the page's callback, and the saver sends nothing more", async () => {
  for (const [kind, call] of [
    ["conflict", "conflict"],
    ["signed-out", "signedOut"],
  ]) {
    await onPage(async () => {
      const held = heldClient();
      const game = gameOf(passing());
      game.realMsPerRead = 1_000;
      const { saver, calls } = saverOf(held, game);
      saver.moment();
      saver.moment();
      await held.answer({ kind });
      assert.equal(calls[call], 1, kind);
      const all = Object.values(calls).reduce((sum, count) => sum + count);
      assert.equal(all, 1, `${kind}: no other callback`);
      saver.moment();
      mock.timers.tick(60_000);
      fakeDocument.turn("hidden");
      assert.equal(
        held.sent.length,
        1,
        `${kind}: nothing more, the moment meanwhile included`,
      );
      saver.dispose();
    });
  }
});

test("a save refused as outdated shows its sentence, tells the page, and nothing is sent any more", async () => {
  await onPage(async () => {
    const held = heldClient();
    const game = gameOf(passing());
    game.realMsPerRead = 1_000;
    const { saver, calls } = saverOf(held, game);
    saver.moment();
    await held.answer({ kind: "outdated" });
    assert.equal(sentenceOf(saver), OUTDATED);
    assert.equal(calls.outdated, 1);
    game.act(setPace(game.state, 2));
    saver.moment();
    mock.timers.tick(60_000);
    fakeDocument.turn("hidden");
    assert.equal(held.sent.length, 1);
    assert.equal(sentenceOf(saver), OUTDATED);
    saver.dispose();
  });
});

// --- the checks for changes ------------------------------------------------------------------

test("an untouched game sends nothing at the 30-second check or at hiding, and sends at the player's first act", async () => {
  // To do 10 with D-206; row 13: every document is stamped, and the load refuses one that is not.
  const loaded = loadSavedGame(savedGame(withSaveTime(passing(), CLOCK_MS)));
  // Precondition: a loaded map run comes back paused, so real time changes nothing in it.
  assert.ok(loaded.ok && loaded.state.paused);
  const cases = [
    ["a game with no map run", withCharacter(), (s) => setPace(s, 2)],
    ["a game built from a load", loaded.state, (s) => setPaused(s, false)],
  ];
  for (const [name, state, act] of cases) {
    await onPage(async () => {
      const held = heldClient();
      const game = gameOf(state);
      game.realMsPerRead = 1_000;
      const { saver } = saverOf(held, game);
      mock.timers.tick(90_000);
      fakeDocument.turn("hidden");
      assert.equal(held.sent.length, 0, name);

      game.act(act(game.state));
      saver.moment();
      assert.equal(held.sent.length, 1, name);
      assert.deepEqual(held.sent[0], submissionOf(game.state, 3), name);
      saver.dispose();
    });
  }
});

test("a passing map run is saved at the 30-second check and at hiding, and a hiding during a request in flight sends nothing more", async () => {
  await onPage(async () => {
    const held = heldClient();
    const game = gameOf(passing());
    game.realMsPerRead = 1_000;
    const { saver } = saverOf(held, game);
    mock.timers.tick(29_999);
    assert.equal(held.sent.length, 0);
    mock.timers.tick(1);
    assert.equal(held.sent.length, 1);
    assert.deepEqual(held.sent[0], submissionOf(game.state, 3));
    await held.answer(SAVED(4));

    fakeDocument.turn("hidden");
    assert.equal(held.sent.length, 2);
    assert.deepEqual(held.sent[1], submissionOf(game.state, 4));
    fakeDocument.turn("visible");
    fakeDocument.turn("hidden");
    assert.equal(held.sent.length, 2);
    saver.dispose();
  });
});

// --- the save time ---------------------------------------------------------------------------

/** The document a save sent, as the server hands it back. */
const documentOf = ({ version, game }) => ({ version, revision: 9, game });

// Spec section 9; D-231. Catches a document unstamped, which the load refuses, a moment read before
// the reading that sends, so older than the state it stamps, and a stamp written into the state held.
test("each document holds the moment of the reading made for it and loads, and the state held stays what it was", async () => {
  await onPage(async () => {
    const held = heldClient();
    const game = gameOf(withCharacter());
    const start = game.state;
    const { saver } = saverOf(held, game);

    game.dateMs = 1_760_000_000_500;
    saver.moment();
    await held.answer(SAVED(4));
    game.dateMs = 1_760_000_030_000;
    saver.moment();
    await held.answer(FAILED);
    game.dateMs = 1_760_000_035_000;
    mock.timers.tick(5_000);
    await held.answer(SAVED(5));
    game.dateMs = 1_760_000_040_000;
    const report = saver.saveBeforeLogout();
    await held.answer(SAVED(6));
    assert.deepEqual(await report, { kind: "saved" });

    assert.deepEqual(
      held.sent.map((sent) => sent.game.saveTimeMs),
      [
        1_760_000_000_500, 1_760_000_030_000, 1_760_000_035_000,
        1_760_000_040_000,
      ],
    );
    for (const sent of held.sent) {
      const loaded = loadSavedGame(documentOf(sent));
      assert.equal(loaded.ok, true);
      assert.equal(loaded.state.saveTimeMs, sent.game.saveTimeMs);
    }
    assert.equal(game.state, start, "the state held is not replaced");
    assert.equal(game.state.saveTimeMs, null);
    saver.dispose();
  });
});

// Spec section 9; D-207, D-231. Catches a stamped state taken for the one last sent, so that the
// comparison by identity finds a change at every check, and a tab that has only loaded sending.
test("a loaded paused game sends nothing, and a save of it changes nothing the 30-second check or the hidden page sees", async () => {
  const savedMs = CLOCK_MS - 60_000;
  const { state } = loadSavedGame(savedGame(withSaveTime(passing(), savedMs)));
  await onPage(async () => {
    const held = heldClient();
    const game = gameOf(state);
    game.realMsPerRead = 1_000;
    const { saver } = saverOf(held, game);
    mock.timers.tick(90_000);
    fakeDocument.turn("hidden");
    assert.equal(held.sent.length, 0, "nothing after the load");

    fakeDocument.turn("visible");
    saver.moment();
    assert.equal(held.sent[0].game.saveTimeMs, CLOCK_MS);
    await held.answer(SAVED(4));
    mock.timers.tick(90_000);
    fakeDocument.turn("hidden");
    assert.equal(held.sent.length, 1, "nothing more after its save");
    assert.equal(game.state, state);
    assert.equal(game.state.saveTimeMs, savedMs);
    saver.dispose();
  });
});

// --- before logout ---------------------------------------------------------------------------

test("before logout the saver waits for the request in flight, then sends the current state and reports it saved", async () => {
  await onPage(async () => {
    const held = heldClient();
    const game = gameOf(withCharacter());
    const { saver, calls } = saverOf(held, game);
    saver.moment();
    game.act(setPace(game.state, 2));
    let report = null;
    void saver.saveBeforeLogout().then((save) => (report = save));
    await settle();
    assert.equal(held.sent.length, 1);
    await held.answer(SAVED(4));
    assert.equal(held.sent.length, 2);
    assert.deepEqual(held.sent[1], submissionOf(game.state, 4));
    assert.equal(report, null, "no report before the logout's save answers");
    await held.answer(SAVED(5));
    assert.deepEqual(report, { kind: "saved" });
    assert.deepEqual(calls, { conflict: 0, outdated: 0, signedOut: 0 });
    saver.dispose();
  });
});

test("before logout a refusal is reported for logout to go on, without the page's callbacks, and a too-large one is not retried", async () => {
  for (const kind of ["conflict", "too-large", "outdated", "signed-out"]) {
    await onPage(async () => {
      const held = heldClient();
      const game = gameOf(withCharacter());
      const { saver, calls } = saverOf(held, game);
      const report = saver.saveBeforeLogout();
      assert.equal(held.sent.length, 1, kind);
      await held.answer({ kind });
      assert.deepEqual(await report, { kind }, kind);
      assert.deepEqual(calls, { conflict: 0, outdated: 0, signedOut: 0 }, kind);
      mock.timers.tick(120_000);
      assert.equal(held.sent.length, 1, kind);
      if (kind === "too-large") assert.equal(sentenceOf(saver), TOO_LARGE);
      saver.dispose();
    });
  }
});

test("a failed save before logout asks to log out again, and the retries go on under that sentence until one succeeds", async () => {
  await onPage(async () => {
    const held = heldClient();
    const game = gameOf(withCharacter());
    const { saver } = saverOf(held, game);
    const report = saver.saveBeforeLogout();
    await held.answer(FAILED);
    assert.deepEqual(await report, { kind: "failed" });
    assert.equal(sentenceOf(saver), LOGOUT_FAILED);
    mock.timers.tick(5_000);
    assert.equal(held.sent.length, 2);
    await held.answer(FAILED);
    assert.equal(sentenceOf(saver), LOGOUT_FAILED);
    mock.timers.tick(10_000);
    assert.equal(held.sent.length, 3);
    await held.answer(SAVED(4));
    assert.equal(sentenceOf(saver), null);
    // After that success a failure of an ordinary save says again that the game retries.
    saver.moment();
    await held.answer(FAILED);
    assert.equal(sentenceOf(saver), RETRYING);
    saver.dispose();
  });
});

// D-207's exception for the save before a logout that goes on: a moment asked for while that save
// is in flight is not sent after its answer. Catches a saver that sends that moment anyway, a save
// request going out beside the logout that ends the session.
test("a moment during the save before a logout that goes on is not sent after its answer", async () => {
  for (const outcome of [SAVED(4), { kind: "too-large" }]) {
    await onPage(async () => {
      const held = heldClient();
      const game = gameOf(withCharacter());
      const { saver } = saverOf(held, game);
      const report = saver.saveBeforeLogout();
      assert.equal(held.sent.length, 1, outcome.kind);
      game.act(setPace(game.state, 4));
      saver.moment();
      await held.answer(outcome);
      assert.deepEqual(await report, { kind: outcome.kind }, outcome.kind);
      assert.equal(
        held.sent.length,
        1,
        `${outcome.kind}: nothing more is sent`,
      );
      saver.dispose();
    });
  }
});

test("before logout a request in flight that fails is followed by the logout's own save, and only that one is reported", async () => {
  await onPage(async () => {
    const held = heldClient();
    const game = gameOf(withCharacter());
    const { saver } = saverOf(held, game);
    saver.moment();
    let report = null;
    void saver.saveBeforeLogout().then((save) => (report = save));
    await held.answer(FAILED);
    assert.equal(held.sent.length, 2, "the logout's save goes at once");
    assert.equal(report, null);
    await held.answer(SAVED(4));
    assert.deepEqual(report, { kind: "saved" });
    mock.timers.tick(5_000);
    assert.equal(held.sent.length, 2, "no retry of the failure before");
    saver.dispose();
  });
});

test("a saver stopped as outdated reports so before logout without sending anything", async () => {
  await onPage(async () => {
    const held = heldClient();
    const game = gameOf(withCharacter());
    const { saver } = saverOf(held, game);
    saver.moment();
    await held.answer({ kind: "outdated" });
    game.act(setPace(game.state, 2));
    assert.deepEqual(await saver.saveBeforeLogout(), { kind: "outdated" });
    assert.equal(held.sent.length, 1);
    saver.dispose();
  });
});

// --- dispose ---------------------------------------------------------------------------------

test("a disposed saver leaves no timer or listener, sends nothing, and ignores an answer that comes after", async () => {
  await onPage(async (live) => {
    const held = heldClient();
    const game = gameOf(withCharacter());
    const { saver, calls } = saverOf(held, game);
    saver.moment();
    await held.answer(FAILED);
    // Precondition: the 30-second check and the retry wait.
    assert.equal(live.size, 2);
    saver.moment();
    saver.dispose();
    assert.equal(live.size, 0);
    assert.equal(fakeDocument.listeners.get("visibilitychange").size, 0);
    await held.answer({ kind: "conflict" });
    assert.equal(calls.conflict, 0);
    assert.equal(sentenceOf(saver), RETRYING);
    saver.moment();
    mock.timers.tick(120_000);
    assert.equal(held.sent.length, 2);
    assert.deepEqual(await saver.saveBeforeLogout(), { kind: "failed" });
    assert.equal(held.sent.length, 2);
  });
});
