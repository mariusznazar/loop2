// What the page does with the judgings the browser remembers (D-441, D-04, D-206, D-402, D-209): the
// moment of the clock that each new game of the page is made at, the one reach of the browser's storage,
// the cache that the game view opens for the game it is built with and the mark beside the list
// „Program:” that the screen Mapy draws from it. The page is run through `startApp` on jsdom through
// tests/view/page-document.mjs (D-264) with a client whose answers the case gives; the storage is the
// window's own, which the cases seed and read through the cache module, never by its stored form. The
// cache's own refusals are the cache test's (tests/view/judging-cache.test.mjs). Real events and the
// look are the browser check's (D-88).
import { assert, inAct, press, settle, withPage } from "./page-document.mjs";
import { mock, test } from "node:test";
import {
  createCharacter,
  newGame,
  withSaveTime,
} from "../../dist/browser/sim/game.js";
import { judgeAndRecord } from "../../dist/browser/sim/judging.js";
import {
  SAVED_GAME_VERSION,
  savedGame,
} from "../../dist/browser/sim/saved-game.js";
import { openJudgingCache } from "../../dist/browser/view/judging-cache.js";

/** The real date the page's clock reads. */
const CLOCK_MS = 1_760_000_000_000;
/** The moment a game of the cases was made at, other than the clock's. */
const MADE = 777;
/** The sentence of an error that no code of the game handled. */
const FAILURE_SENTENCE = "Coś w grze się zepsuło — odśwież stronę.";
const IDS = { characterId: 1, programId: 1, mapId: "forest" };
const ALA = { id: "a1", email: "ala@example.test", emailConfirmed: true };
const PRIVILEGED = { ...ALA, previousSaveAllowed: true };
const OTHER_ACCOUNT = "a2";

/** A stand-in for `performance` that a case moves by hand (the page's React measures through it). */
const handClock = (now) => ({
  now,
  measure: () => undefined,
  clearMeasures: () => undefined,
});

/** Runs `body` on a window of its own with Node's mocked timers and the real date at `CLOCK_MS`. */
async function onPage(body) {
  await withPage(async () => {
    mock.timers.enable({ apis: ["setInterval", "setTimeout"] });
    const date = mock.method(Date, "now", () => CLOCK_MS);
    const saved = Object.getOwnPropertyDescriptor(globalThis, "performance");
    Object.defineProperty(globalThis, "performance", {
      configurable: true,
      value: handClock(() => 0),
    });
    try {
      await body();
    } finally {
      Object.defineProperty(globalThis, "performance", saved);
      mock.timers.reset();
      date.mock.restore();
    }
  });
}

const pageDocument = () => globalThis.document;
const storageOf = () => globalThis.window.localStorage;
const all = (root) => [root, ...root.querySelectorAll("*")];
const buttonNamed = (text) =>
  all(pageDocument().body).find(
    (element) => element.localName === "button" && element.textContent === text,
  );
/** Whether an element and every ancestor up to the page's body are shown. */
function shown(element) {
  for (let node = element; node; node = node.parentElement) {
    if (node.hidden) return false;
    if (node === pageDocument().body) return true;
  }
  return false;
}
/** What stands beside the list „Program:” of the first character, or null where nothing does. */
const markOf = () =>
  pageDocument().body.querySelector(".maps-who-program .maps-who-mark")
    ?.textContent ?? null;

/** The address of the page with a history of its own, as the page's tests build it. */
function fakeAddress(hash) {
  const listeners = new Set();
  const address = {
    entries: [hash],
    index: 0,
    hash: () => address.entries[address.index],
    go(next) {
      address.entries.splice(address.index + 1);
      address.entries.push(next);
      address.index += 1;
    },
    replace(next) {
      address.entries[address.index] = next;
    },
    reload() {},
    onChange(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    follow(next) {
      address.go(next);
      for (const listener of listeners) listener();
    },
  };
  return address;
}

/** Ala on the team of a game made at `madeAtMs`, with Las solved, so that the screen Mapy can judge. */
const gameMadeAt = (madeAtMs) => ({
  ...createCharacter(newGame(madeAtMs), "Ala").state,
  solvedMaps: ["forestEdge", "forest"],
});

/** The server's answer holding the save of `state` at `revision`. */
const saveOf = (state, revision) => ({
  ok: true,
  value: {
    ...JSON.parse(
      JSON.stringify(savedGame(withSaveTime(state, CLOCK_MS - 60_000))),
    ),
    revision,
  },
});

/**
 * The page started through `startApp` with a client that holds every call until the case answers it,
 * signed in as `account` and given the answer `load` to its load of the saved game state. `named` is the
 * calls of a name still waiting.
 */
async function startedPage({ account = ALA, hash, load }) {
  const { startApp } = await import("../../dist/browser/view/app.js");
  const calls = [];
  const hold =
    (name) =>
    (...args) =>
      new Promise((resolve) => calls.push({ name, args, resolve }));
  const client = {
    currentAccount: hold("currentAccount"),
    loadSavedGame: hold("loadSavedGame"),
    loadPreviousSavedGame: hold("loadPreviousSavedGame"),
    resetSavedGame: hold("resetSavedGame"),
    saveGame: hold("saveGame"),
    logout: hold("logout"),
    reportBrowserFailure: () => Promise.resolve({ ok: true, value: null }),
  };
  const address = fakeAddress(hash);
  const page = {
    address,
    named: (name) => calls.filter((entry) => entry.name === name),
    async answer(name, result) {
      const index = calls.findIndex((entry) => entry.name === name);
      assert.notEqual(index, -1, `no ${name} call is waiting`);
      const [entry] = calls.splice(index, 1);
      entry.resolve(result);
      await settle();
    },
  };
  await inAct(() => startApp(pageDocument().body, client, address));
  await settle();
  await page.answer("currentAccount", { ok: true, value: account });
  await page.answer("loadSavedGame", load);
  return page;
}

/** The page as a browser opens it again: the old page leaves the document, the storage stays. */
function reload() {
  pageDocument().body.replaceChildren();
}

/** A cache of the game of `accountId` made at `madeAtMs` on the window's own storage. */
function cacheOf(accountId, madeAtMs, { afterRefusedSave = false } = {}) {
  return openJudgingCache({
    accountId,
    state: gameMadeAt(madeAtMs),
    afterRefusedSave,
    storage: storageOf(),
  });
}

/** Stores the judging of Ala on Las, program 1, as the game of `accountId` made at `madeAtMs` holds it. */
function seed(accountId, madeAtMs) {
  cacheOf(accountId, madeAtMs).remember(
    IDS,
    judgeAndRecord(gameMadeAt(madeAtMs), IDS).record,
  );
}

/** Presses „Oceń na 12 ziarnach” and lets the judging run until the mark stands. */
async function judgeFirst() {
  await press(buttonNamed("Oceń na 12 ziarnach"));
  for (let round = 0; round < 50 && markOf() === null; round += 1)
    await inAct(async () => mock.timers.tick(100));
}

/** The moment the game of the first save the page sends was made at; an act of Programy makes the save. */
async function momentOfFirstSave(page) {
  if (page.named("saveGame").length === 0)
    await press(buttonNamed("Nowy program"));
  const [first] = page.named("saveGame");
  assert.ok(first, "the page sent a save");
  return first.args[0].game.madeAtMs;
}

const NO_SAVE = { ok: true, value: null };
const NO_PREVIOUS = { ok: true, value: null };

// Catches a path of the page that makes a new game with no moment, so that the game's key is the same for
// every game of the account, a load that gives its game another moment than the save holds, and the
// judgings of an earlier game left in the storage under a game that replaces it.
test("a new game made by each path of the page carries the clock's moment and takes the account's judgings of earlier games out of the storage, and a loaded game keeps its own moment and its judgings", async () => {
  // decision: D-04 "The game state stores the moment of the browser's clock at which the page made the game, which the page passes to the function that makes a new game, every save and load keeps, and which tells one game of an account from another (D-441)."
  // decision: D-206 "The judgings the browser remembers (D-441) are no part of the saved game state: a discarded saved game state takes none of them along, and the game started anew shows none of those remembered for the game discarded."
  const documentOf = (state) => saveOf(state, 4).value;
  const refusals = {
    "a load refused as another version": () => ({
      ok: true,
      value: {
        ...documentOf(gameMadeAt(MADE)),
        version: SAVED_GAME_VERSION - 1,
      },
    }),
    "a load refused as an archetype the data lack": () => {
      const foreign = documentOf(gameMadeAt(MADE));
      foreign.game.team.characters[0].archetypeId = "nieznany";
      return { ok: true, value: foreign };
    },
    "a load refused as shape": () => ({
      ok: true,
      value: { ...documentOf(gameMadeAt(MADE)), game: "not a game" },
    }),
  };
  const variants = [
    {
      name: "an account with no saved game state",
      load: () => NO_SAVE,
      made: CLOCK_MS,
    },
    ...Object.entries(refusals).map(([name, load]) => ({
      name,
      load,
      made: CLOCK_MS,
    })),
    {
      name: "a loaded game",
      load: () => saveOf(gameMadeAt(MADE), 4),
      made: MADE,
    },
    {
      name: "a conflict reload that finds no save",
      load: () => saveOf(gameMadeAt(MADE), 4),
      made: CLOCK_MS,
      async before(page) {
        await press(buttonNamed("Nowy program"));
        await page.answer("saveGame", { kind: "conflict" });
        await page.answer("loadSavedGame", NO_SAVE);
      },
    },
    {
      name: "the reset of „Zacznij od zera”",
      load: () => saveOf(gameMadeAt(MADE), 4),
      account: PRIVILEGED,
      made: CLOCK_MS,
      async before(page) {
        await page.answer("loadPreviousSavedGame", NO_PREVIOUS);
        await press(buttonNamed("Zacznij od zera"));
        await press(buttonNamed("Tak, zacznij od zera"));
        await page.answer("resetSavedGame", { ok: true, value: null });
      },
    },
  ];
  for (const { name, load, account, made, before } of variants) {
    await onPage(async () => {
      seed(ALA.id, MADE);
      assert.ok(
        cacheOf(ALA.id, MADE).read(IDS) !== null,
        `${name}: precondition, the judging of the game made at ${MADE} is stored`,
      );
      const page = await startedPage({
        account,
        hash: "#/programy",
        load: load(),
      });
      await before?.(page);
      assert.equal(await momentOfFirstSave(page), made, name);
      assert.equal(
        cacheOf(ALA.id, MADE).read(IDS) !== null,
        made === MADE,
        `${name}: the judging of the game made at ${MADE} is ${made === MADE ? "kept" : "removed"}`,
      );
    });
  }
});

// Catches a page that holds no cache or opens it for another account or game than the one it builds, a
// screen that reads what the cache does not write, and a judging that does not outlast the page.
test("a judging made on the screen Mapy is remembered under the account and the moment of its game and shows again at a reload of the page, with no judging made", async () => {
  // decision: D-441 "The browser keeps the judging each character, program and map last had (D-440) in its lasting storage (`localStorage`), one value under a key of its own for each such triple, the key naming the version of the stored form, the signed-in account by its identifier, the game by the moment it was made (D-04), the character, the program and the map"
  await onPage(async () => {
    const save = saveOf(gameMadeAt(MADE), 4);
    await startedPage({ hash: "#/mapy/forest", load: save });
    assert.equal(markOf(), null, "precondition: nothing is remembered yet");

    await judgeFirst();
    const mark = markOf();
    assert.ok(mark !== null, "the judging gives a mark beside the list");
    assert.equal(
      cacheOf(OTHER_ACCOUNT, MADE).read(IDS),
      null,
      "no judging of another account",
    );
    const held = cacheOf(ALA.id, MADE).read(IDS);
    assert.ok(held !== null, "the judging of this account and game is stored");
    assert.equal(held.results.length, 12);

    reload();
    await startedPage({ hash: "#/mapy/forest", load: save });
    assert.equal(markOf(), mark, "the same mark, with no judging made");
  });
});

// Catches a mark shown for a judging of another account or of another game of the account, and a page
// that leaves another game's values of the account in the storage or touches another account's.
test("a judging stored under another account or another game's moment shows no mark, the account's judgings of other games are removed when the game is opened, and another account's are left", async () => {
  // decision: D-441 "When the page opens the remembered judgings of a game, it removes the values of the same account under the moment of another game and those of this game whose content revision or generation number stands above that of its program or character in the loaded game or whose program number or character number is not below the number the loaded game gives to its next program or character, and, where it builds the game after the server refused its save for another browser's (D-209), every value of this game, leaving the values of other accounts."
  await onPage(async () => {
    seed(ALA.id, MADE + 1);
    seed(OTHER_ACCOUNT, MADE);
    assert.ok(cacheOf(ALA.id, MADE + 1).read(IDS) !== null, "precondition");
    assert.ok(cacheOf(OTHER_ACCOUNT, MADE).read(IDS) !== null, "precondition");

    await startedPage({
      hash: "#/mapy/forest",
      load: saveOf(gameMadeAt(MADE), 4),
    });

    assert.equal(markOf(), null, "no mark for another account or game");
    assert.equal(
      cacheOf(OTHER_ACCOUNT, MADE).read(IDS) !== null,
      true,
      "the other account's judging is left",
    );
    assert.equal(
      cacheOf(ALA.id, MADE + 1).read(IDS),
      null,
      "the account's judging of the other game is removed",
    );
  });
});

// Catches a game built after a refused save that shows the mark its browser had cached for it, and one
// that leaves the value in the storage.
test("a game built after a save the server refused for another browser's shows no mark its browser had cached for it, and the value is removed", async () => {
  // decision: D-441 "When the page opens the remembered judgings of a game, it removes the values of the same account under the moment of another game and those of this game whose content revision or generation number stands above that of its program or character in the loaded game or whose program number or character number is not below the number the loaded game gives to its next program or character, and, where it builds the game after the server refused its save for another browser's (D-209), every value of this game, leaving the values of other accounts."
  await onPage(async () => {
    seed(ALA.id, MADE);
    const save = saveOf(gameMadeAt(MADE), 4);
    const page = await startedPage({ hash: "#/mapy/forest", load: save });
    assert.ok(markOf() !== null, "precondition: the cached judging shows");

    await inAct(() => page.address.follow("#/programy"));
    await press(buttonNamed("Nowy program"));
    await page.answer("saveGame", { kind: "conflict" });
    await page.answer("loadSavedGame", saveOf(gameMadeAt(MADE), 5));
    await inAct(() => page.address.follow("#/mapy/forest"));

    assert.equal(markOf(), null, "no mark after the refused save");
    assert.equal(cacheOf(ALA.id, MADE).read(IDS), null, "the value is gone");
  });
});

// Catches the judging of the game before „Zacznij od zera” standing in the storage of the game after it,
// whose characters and programs are numbered from 1 again.
test("„Zacznij od zera” leaves the account's judgings of the discarded game out of the storage", async () => {
  // decision: D-206 "The judgings the browser remembers (D-441) are no part of the saved game state: a discarded saved game state takes none of them along, and the game started anew shows none of those remembered for the game discarded."
  await onPage(async () => {
    const page = await startedPage({
      account: PRIVILEGED,
      hash: "#/mapy/forest",
      load: saveOf(gameMadeAt(MADE), 4),
    });
    await judgeFirst();
    assert.ok(cacheOf(ALA.id, MADE).read(IDS) !== null, "precondition");

    await inAct(() => page.address.follow("#/programy"));
    await page.answer("loadPreviousSavedGame", NO_PREVIOUS);
    await press(buttonNamed("Zacznij od zera"));
    await press(buttonNamed("Tak, zacznij od zera"));
    await page.answer("resetSavedGame", { ok: true, value: null });

    assert.equal(cacheOf(ALA.id, MADE).read(IDS), null);
  });
});

/** Gives the window the storage `make` returns, in place of its own, for the case's body. */
async function withStorage(make, body) {
  const original = Object.getOwnPropertyDescriptor(
    globalThis.window,
    "localStorage",
  );
  Object.defineProperty(globalThis.window, "localStorage", {
    configurable: true,
    get: make,
  });
  try {
    await body();
  } finally {
    if (original === undefined) delete globalThis.window.localStorage;
    else Object.defineProperty(globalThis.window, "localStorage", original);
  }
}

// Catches a page that lets a failing storage out, as an exception the game answers with its sentence of
// an error nothing handled or as a screen with no mark, instead of showing the judging for the open page.
test("a browser that refuses its storage, any call of it or a write shows the judging for the open page alone, with no sentence of a failure", async () => {
  // decision: D-441 "Where the browser refuses its lasting storage, or refuses to write a value, the judging stands for the open page alone, the stored value of its triple being removed where the browser allows it, and no exception of the storage reaches the screen or the handling of an error no code of the game handled (D-323)."
  const refuse = () => {
    throw new Error("the browser refuses");
  };
  const stores = {
    "the window refuses its storage": () => refuse(),
    "a storage that refuses every call": () => ({
      get length() {
        return refuse();
      },
      key: refuse,
      getItem: refuse,
      setItem: refuse,
      removeItem: refuse,
    }),
    "a storage that refuses a write": () => ({
      length: 0,
      key: () => null,
      getItem: () => null,
      setItem: refuse,
      removeItem: () => undefined,
    }),
  };
  for (const [name, make] of Object.entries(stores)) {
    await onPage(async () => {
      await withStorage(make, async () => {
        await startedPage({
          hash: "#/mapy/forest",
          load: saveOf(gameMadeAt(MADE), 4),
        });
        assert.equal(markOf(), null, `${name}: precondition`);
        await judgeFirst();
        assert.ok(markOf() !== null, `${name}: the open page shows the mark`);
        assert.equal(
          all(pageDocument().body).filter(
            (element) =>
              element.textContent === FAILURE_SENTENCE && shown(element),
          ).length,
          0,
          `${name}: no sentence of a failure is shown`,
        );
      });
    });
  }
});
