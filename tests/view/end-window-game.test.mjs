// The end-of-run window in the game view (task koniec-przejscia, To do 1, 2, 8 and 9, and task
// trzy-chwile-gdy-czas-stoi, To do 7; D-368, D-311, D-62, D-132, D-173, D-122, D-313, D-212, D-53,
// D-323, D-324, D-322) on jsdom through
// tests/view/page-document.mjs (D-264): the game view is built as the page builds it, as in
// tests/view/end-question.test.mjs, and the window is driven through the buttons the player presses
// and the addresses the page follows. What the cases hold is when the window opens and closes, what
// each of its buttons does, where the question „Zapisać, odrzucić, wrócić?” leads when a button of
// the window asked it, and that the window is a memory of the page, in no game state and no saved
// document. Real events, focus, the keyboard, the look and the menu bar above the window are
// checked in the browser (D-88), which jsdom cannot show. Every comparison is of plain data or of
// a handful of words (D-268).
import { assert, inAct, withPage } from "./page-document.mjs";
import { mock, test } from "node:test";
import {
  advanceMinutes,
  createCharacter,
  mapRunEnded,
  newGame,
  send,
  setPaused,
  setProgram,
  settleDeath,
} from "../../dist/browser/sim/game.js";
import { createProgram } from "../../dist/browser/sim/programs.js";
import { loadSavedGame } from "../../dist/browser/sim/saved-game.js";
import { programFromRules } from "../sim/program-fixture.mjs";
import { newKnowingGame } from "../sim/understanding-fixture.mjs";

// --- the page on jsdom --------------------------------------------------------------------------

/** The real date the page's clock reads. */
const CLOCK_MS = 1_760_000_000_000;
const RUN_ADDRESS = "#/postac/1/przejscie";

/** A stand-in for `performance` that a case moves by hand (the page's React measures through it). */
const handClock = (now) => ({
  now,
  measure: () => undefined,
  clearMeasures: () => undefined,
});

/**
 * Runs `body` on a window of its own with Node's mocked timers, the real date at `CLOCK_MS` and a
 * clock of real milliseconds the case moves with `pass(ms)`: the next reading of the game's clock,
 * which `reading()` makes, sees them.
 */
async function onPage(body) {
  await withPage(async ({ root }) => {
    mock.timers.enable({ apis: ["setInterval", "setTimeout"] });
    const date = mock.method(Date, "now", () => CLOCK_MS);
    const saved = Object.getOwnPropertyDescriptor(globalThis, "performance");
    let now = 0;
    Object.defineProperty(globalThis, "performance", {
      configurable: true,
      value: handClock(() => now),
    });
    try {
      await body({
        root,
        pass: (ms) => {
          now += ms;
        },
        reading: () => inAct(() => mock.timers.tick(200)),
      });
    } finally {
      Object.defineProperty(globalThis, "performance", saved);
      mock.timers.reset();
      date.mock.restore();
    }
  });
}

const all = (root) => [root, ...root.querySelectorAll("*")];
const byClass = (root, name) =>
  all(root).filter((element) => element.classList.contains(name));
const pageDocument = () => globalThis.document;

/** Whether an element and every ancestor up to the page's body are shown. */
function shown(element) {
  for (let node = element; node; node = node.parentElement) {
    if (node.hidden) return false;
    if (node === pageDocument().body) return true;
  }
  return false;
}

const buttonIn = (root, text) =>
  all(root).find(
    (element) => element.localName === "button" && element.textContent === text,
  );

function fire(target, type) {
  const { Event } = globalThis.window;
  target.dispatchEvent(new Event(type, { bubbles: true, cancelable: true }));
}

/** Clicks `target` inside act. */
function press(target) {
  assert.ok(target, "what the case presses stands");
  return inAct(() => fire(target, "click"));
}

/** Presses Escape on `target` inside act. */
function escape(target) {
  const { KeyboardEvent } = globalThis.window;
  return inAct(() => {
    target.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
    );
  });
}

/** The address of the page with a history of its own, as the page's tests build it. */
function fakeAddress(hash) {
  const listeners = new Set();
  const address = {
    entries: [hash],
    index: 0,
    reloaded: 0,
    hash: () => address.entries[address.index],
    go(next) {
      address.entries.splice(address.index + 1);
      address.entries.push(next);
      address.index += 1;
    },
    replace(next) {
      address.entries[address.index] = next;
    },
    reload() {
      address.reloaded += 1;
    },
    onChange(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    follow(next) {
      address.go(next);
      for (const listener of listeners) listener();
    },
    /** The browser's back button: one entry back, and the listeners hear of it. */
    back() {
      address.index -= 1;
      for (const listener of listeners) listener();
    },
  };
  return address;
}

/** The game of `state` built in the page as a reload at `hash` builds it; saves are never answered. */
async function viewOf(state, hash = RUN_ADDRESS, entry = "address") {
  const { createGameView } =
    await import("../../dist/browser/view/game-view.js");
  const address = fakeAddress(hash);
  const view = await inAct(() =>
    createGameView({
      client: { saveGame: () => new Promise(() => undefined) },
      state,
      revision: 1,
      address,
      entry,
      onScreen: () => {},
      onConflict: () => {},
      onOutdated: () => {},
      onSignedOut: () => {},
    }),
  );
  pageDocument().body.append(view.element);
  return { view, address };
}

/** The game state the view holds now, read from the document it keeps. */
const heldState = (view) => inAct(() => view.keep().document.game);
const follow = (address, hash) => inAct(() => address.follow(hash));

const runScreenOf = (root) => byClass(root, "run-screen")[0];
const windowOf = (root) => byClass(runScreenOf(root), "end-window").find(shown);
/** The window that stands; the case fails where none does. */
function expectWindow(root) {
  const opened = windowOf(root);
  assert.ok(opened, "the window stands");
  return opened;
}
const windowButton = (root, text) => buttonIn(expectWindow(root), text);
const headerOf = (root) => byClass(runScreenOf(root), "run-header")[0];
const headerButton = (root, text) => buttonIn(headerOf(root), text);
const headerLabels = (root) =>
  [...headerOf(root).querySelectorAll("button")].map(
    (button) => button.textContent,
  );
const areasOf = (root) => [
  ...byClass(runScreenOf(root), "run-screen-areas")[0].children,
];
/** Whether the header and the three areas stand covered: each is `hidden`. */
const covered = (root) =>
  [headerOf(root), ...areasOf(root)].every((element) => element.hidden);
/** Whether none of the header and the three areas is `hidden`. */
const uncovered = (root) =>
  [headerOf(root), ...areasOf(root)].every((element) => !element.hidden);
const questionOf = (root) =>
  byClass(runScreenOf(root), "end-question").find(shown);
const answer = (root, text) => buttonIn(questionOf(root), text);
const chronicleRows = (root) =>
  byClass(byClass(runScreenOf(root), "run-tabs")[0], "chronicle-row").map(
    (row) => [
      row.querySelector(".chronicle-minute").textContent,
      row.querySelector(".chronicle-text").textContent,
    ],
  );
const minuteRows = (root) =>
  byClass(expectWindow(root), "end-window-minutes")
    .flatMap((list) => byClass(list, "chronicle-row"))
    .map((row) => [
      row.querySelector(".chronicle-minute").textContent,
      row.querySelector(".chronicle-text").textContent,
    ]);

function shownScreen(root) {
  const shows = (name) => {
    const element = byClass(root, name)[0];
    return element !== undefined && shown(element);
  };
  if (shows("character-screen")) return "character";
  if (shows("maps-screen")) return "maps";
  if (shows("run-screen")) return "run";
  if (shows("headquarters")) return "headquarters";
  if (shows("programs-screen")) return "programs";
  return null;
}

// --- the states ---------------------------------------------------------------------------------

const SENT = { mapId: "forest", characterId: 1, programId: 1 };
/** Ala with „Program” and „Program 2” on the list. */
const twoPrograms = () =>
  createProgram(createCharacter(newGame(), "Ala").state).state;
/** Ala's map run of the forest under program 1, going on, the copy the program as it stands. */
const going = () => send(twoPrograms(), SENT, 0).state;
/** The copy's group renamed „Zmieniony”: a change of the copy alone, so the copy holds unsaved changes. */
const renamed = (state) => {
  const program = structuredClone(state.run.copy.program);
  program.groups[0].name = "Zmieniony";
  return setProgram(state, program).state;
};
/** The map run of `start` ended in Ala's death, the pauses of discoveries lifted, the death settled. */
function dead(start) {
  let state = start;
  for (let round = 0; round < 50 && !mapRunEnded(state.run); round += 1)
    state = advanceMinutes(setPaused(state, false).state, 5000).state;
  assert.ok(state.run.death, "precondition: the map run ended in a death");
  return settleDeath(state, CLOCK_MS).state;
}
/** The map run of `state` ended in a completion in its game minute 480, its map solved. */
const completed = (state) => ({
  ...state,
  paused: false,
  solvedMaps: [...state.solvedMaps, state.run.mapId],
  run: { ...state.run, minute: 480, completion: { minute: 480 } },
});
/** The map run of the first discovery (minute 84 of a seed whose first chill is there), paused at it. */
const atDiscovery = () => {
  const start = send(twoPrograms(), SENT, 1760000003).state;
  const state = advanceMinutes(start, 100).state;
  assert.equal(state.run.minute, 84, "precondition: stopped at the discovery");
  assert.notEqual(state.discovery, null, "precondition: a discovery stands");
  return state;
};
/**
 * A healthy map run of an exploring character whose streak stands at 479 and whose exploration ends
 * in the next game minute, so one second of real time at 1× completes it (D-132).
 */
function oneShort() {
  const program = setProgram(
    newKnowingGame(),
    programFromRules({
      condition: { kind: "always" },
      action: { kind: "explore" },
    }),
  ).state;
  const state = send(createCharacter(program, "Ala").state, SENT, 0).state;
  const run = state.run;
  return {
    ...state,
    run: {
      ...run,
      body: { temperature: 37, satiety: 100, health: 100 },
      streak: 479,
      current: {
        activity: { kind: "rule", ruleId: 1, action: { kind: "explore" } },
        startMinute: run.minute,
        endMinute: run.minute + 1,
        stepTo: null,
      },
    },
  };
}

/**
 * Ala's map run of the forest in a game that knows every action, under a program with no rule: the
 * character waits, no discovery stops the map run, and the cold kills it as the clock passes.
 */
function freezing() {
  const program = setProgram(newKnowingGame(), programFromRules()).state;
  return send(createCharacter(program, "Ala").state, SENT, 0).state;
}

/**
 * Fires the end of an animation on an element, as a browser does when it has run out; React reads the
 * name its own style object prefixes, which on jsdom is `webkitAnimationEnd`, so the page gets both.
 */
function endAnimation(element) {
  const { Event } = globalThis.window;
  for (const name of ["animationend", "webkitAnimationEnd"])
    element.dispatchEvent(new Event(name, { bubbles: true }));
}

/** The element whose animation tells the scene that the effect of its moment has ended. */
const effectMaster = (root) =>
  byClass(runScreenOf(root), "scene-moment-master").find((element) =>
    element.hasAttribute("data-moment-key"),
  );

/**
 * The scene's effect of the end plays out, as a browser plays it: its last animation ends, the scene
 * tells the game view, which opens the window that waited for it (D-322).
 */
async function playTheEffect(root) {
  const master = effectMaster(root);
  assert.ok(master, "precondition: the scene has an effect that plays");
  await inAct(() => endAnimation(master));
}

/**
 * A running map run whose character dies by the clock: real time passes, the clock reads it, and the
 * scene's effect of the death is still playing, the window waiting for it.
 */
async function dieDuringTheEffect({ pass, reading }, start = freezing()) {
  const built = await viewOf(start);
  pass(400_000);
  await reading();
  assert.ok((await heldState(built.view)).run.death, "precondition: died");
  return built;
}

/** A running map run whose character dies by the clock, and whose effect has played: the window stands. */
async function dieOnTheScreen(page, start = freezing()) {
  const built = await dieDuringTheEffect(page, start);
  await playTheEffect(page.root);
  return built;
}

/** A map run of `oneShort` completed on the screen by the clock, its effect still playing. */
async function completeDuringTheEffect({ pass, reading }) {
  const built = await viewOf(oneShort());
  pass(2_000);
  await reading();
  assert.ok(
    (await heldState(built.view)).run.completion,
    "precondition: completed",
  );
  return built;
}

/** A map run of `oneShort` completed on the screen by the clock, its effect played: the window stands. */
async function completeOnTheScreen(page) {
  const built = await completeDuringTheEffect(page);
  await playTheEffect(page.root);
  return built;
}

/**
 * Runs `body` with the system's setting for reduced motion on or off, which jsdom does not hold: the
 * page's `matchMedia` answers the one query the game view asks.
 */
async function withReducedMotion(reduced, body) {
  const { window } = globalThis;
  const had = Object.getOwnPropertyDescriptor(window, "matchMedia");
  window.matchMedia = (query) => ({
    matches: reduced && query.includes("prefers-reduced-motion: reduce"),
    media: query,
  });
  try {
    await body();
  } finally {
    if (had) Object.defineProperty(window, "matchMedia", had);
    else delete window.matchMedia;
  }
}

// --- opening ------------------------------------------------------------------------------------

// D-368, D-62, task To do 1. Catches a window that opens only after „Koniec przejścia”, one that
// stands before the map run ends, one that leaves the header or an area of the screen visible
// under it, and the death's title missing.
test("the window opens at the game minute a character's death ends the map run while the player is on its screen, and covers the header and the three areas", async () => {
  await onPage(async (page) => {
    const { root } = page;
    const { view } = await viewOf(freezing());
    assert.equal(
      windowOf(root),
      undefined,
      "no window while the map run goes on",
    );
    assert.ok(uncovered(root), "nothing is covered while the map run goes on");
    page.pass(400_000);
    await page.reading();
    const state = await heldState(view);
    assert.ok(state.run.death, "precondition: the character died");
    await playTheEffect(root);
    const opened = windowOf(root);
    assert.ok(opened, "the window stands");
    assert.match(
      byClass(opened, "end-window-title")[0].textContent,
      /^Mag /,
      "its title names the death",
    );
    assert.ok(covered(root), "the header and the three areas are hidden");
    assert.equal(
      headerButton(root, "Koniec przejścia"),
      undefined,
      "no „Koniec przejścia” in the header while the window stands",
    );
    await inAct(() => view.dispose());
  });
});

// D-132, D-368, task To do 1 and 8. Catches a window that opens after a death alone, and one
// that stands with no way to the map the completion opened.
test("the window opens at a completion too, titled by the completion text, with the way to the map it opened", async () => {
  await onPage(async (page) => {
    const { root } = page;
    const { view } = await completeOnTheScreen(page);
    const opened = windowOf(root);
    assert.ok(opened, "the window stands");
    const title = byClass(opened, "end-window-title")[0];
    assert.equal(title.textContent, "Las rozwiązany");
    assert.ok(title.classList.contains("positive"));
    assert.ok(covered(root));
    for (const text of ["Restart", "Zakończ", "Otwarte: Las — głębiej →"])
      assert.ok(windowButton(root, text), `${text} stands in the window`);
    await inAct(() => view.dispose());
  });
});

// task trzy-chwile-gdy-czas-stoi, To do 7, D-311, D-322. Catches a window that opens at the game minute
// of the end and hides the scene before its effect can be seen, a window that never opens because it
// waits for an effect no one ends, and a window that opens before the effect ends.
test("at a death and at a completion the window waits for the scene's effect and stands once the scene tells it has ended", async () => {
  await onPage(async (page) => {
    const { root } = page;
    for (const [name, build, moment] of [
      ["a death", dieDuringTheEffect, "death"],
      ["a completion", completeDuringTheEffect, "completion"],
    ]) {
      const { view } = await build(page);
      const scene = byClass(runScreenOf(root), "scene")[0];
      assert.equal(scene.getAttribute("data-moment"), moment, name);
      assert.ok(
        scene.hasAttribute("data-moment-playing"),
        `${name}: the effect plays`,
      );
      assert.equal(windowOf(root), undefined, `${name}: no window yet`);
      assert.ok(uncovered(root), `${name}: the scene stands uncovered`);
      await playTheEffect(root);
      assert.ok(windowOf(root), `${name}: the window stands after the effect`);
      assert.ok(covered(root));
      assert.ok(
        !byClass(runScreenOf(root), "scene")[0].hasAttribute(
          "data-moment-playing",
        ),
        `${name}: the scene stands on its last image`,
      );
      await inAct(() => view.dispose());
      pageDocument().body.replaceChildren();
    }
  });
});

// task trzy-chwile-gdy-czas-stoi, To do 7 and 6, D-322. Catches a window that waits for an effect the
// scene does not play under the system's setting for reduced motion, where the last image stands at
// once and there is nothing to wait for.
test("under the system's setting for reduced motion the window opens at once at a death and at a completion", async () => {
  await onPage(async (page) => {
    const { root } = page;
    await withReducedMotion(true, async () => {
      const died = await dieDuringTheEffect(page);
      assert.ok(windowOf(root), "at a death");
      await inAct(() => died.view.dispose());
      pageDocument().body.replaceChildren();
      const done = await completeDuringTheEffect(page);
      assert.ok(windowOf(root), "at a completion");
      await inAct(() => done.view.dispose());
    });
  });
});

// task trzy-chwile-gdy-czas-stoi, To do 7, D-322. Catches a window the player cannot call while the
// effect plays, and a late end of the effect that opens a window the player has closed.
test("„Koniec przejścia” opens the window at once while it waits for the effect, and the effect's end later opens nothing the player closed", async () => {
  await onPage(async (page) => {
    const { root } = page;
    const { view } = await dieDuringTheEffect(page);
    assert.equal(windowOf(root), undefined, "precondition: the window waits");
    await press(headerButton(root, "Koniec przejścia"));
    assert.ok(windowOf(root), "the player's own opening does not wait");
    await press(windowButton(root, "✕"));
    assert.equal(windowOf(root), undefined);
    await inAct(() => endAnimation(effectMaster(root)));
    assert.equal(windowOf(root), undefined, "the late end opens nothing");
    await inAct(() => view.dispose());
  });
});

// task trzy-chwile-gdy-czas-stoi, To do 7, D-368, D-322. Catches a window that stays shut after the
// player left the screen while the effect played and came back, where the scene shows the last image
// at once and the window has nothing to wait for.
test("a return to the screen while the effect played opens the window at once", async () => {
  await onPage(async (page) => {
    const { root } = page;
    const { view, address } = await dieDuringTheEffect(page);
    assert.equal(windowOf(root), undefined, "precondition: the window waits");
    await follow(address, "#/");
    assert.equal(shownScreen(root), "headquarters");
    await follow(address, RUN_ADDRESS);
    assert.ok(windowOf(root), "the window opens at the return, no end awaited");
    await inAct(() => view.dispose());
  });
});

// task trzy-chwile-gdy-czas-stoi, To do 7, D-322. Catches a window that waits for ever when the scene
// is hidden while its effect runs, a browser then cancelling the animation and firing no end.
test("a scene hidden while its effect runs tells the game view, and the window stands", async () => {
  await onPage(async (page) => {
    const { root } = page;
    const { view } = await dieDuringTheEffect(page);
    const { Event } = globalThis.window;
    await inAct(() =>
      effectMaster(root).dispatchEvent(
        new Event("animationcancel", { bubbles: true }),
      ),
    );
    assert.ok(windowOf(root), "the window stands after the cancel");
    await inAct(() => view.dispose());
  });
});

// task To do 2 (the window opens at every entering of the screen of an ended map run). Catches a
// window that stays closed after the player closed it and left, and one that stays open under
// another screen's address.
test("the window opens again at every entering of the screen of an ended map run: after a link of the menu bar and back, and after the browser's back", async () => {
  await onPage(async (page) => {
    const { root } = page;
    const { view, address } = await dieOnTheScreen(page);
    await press(windowButton(root, "✕"));
    assert.equal(windowOf(root), undefined, "closed by „✕”");
    await follow(address, "#/");
    assert.equal(shownScreen(root), "headquarters");
    assert.equal(windowOf(root), undefined, "no window on Siedziba");
    await follow(address, RUN_ADDRESS);
    assert.equal(shownScreen(root), "run");
    assert.ok(windowOf(root), "the window opens again at the return");
    assert.ok(covered(root));

    await escape(expectWindow(root));
    assert.equal(windowOf(root), undefined);
    await follow(address, "#/programy");
    await inAct(() => address.back());
    assert.equal(shownScreen(root), "run");
    assert.ok(windowOf(root), "the window opens again at the browser's back");
    await inAct(() => view.dispose());
  });
});

// D-212, D-368, D-96, task To do 2. Catches a game built on an ended map run — at a reload at its
// address, after a sign-in, at another address of the page — with no window, and a window standing
// under the other screen.
test("a game built on an ended map run opens the window: at a reload at its address, after a sign-in, and at the entering from another address", async () => {
  await onPage(async ({ root }) => {
    const reload = await viewOf(dead(going()));
    assert.ok(windowOf(root), "a reload at the address of the map run");
    assert.ok(covered(root));
    await inAct(() => reload.view.dispose());
    pageDocument().body.replaceChildren();

    const signIn = await viewOf(dead(going()), "#/", "sign-in");
    assert.equal(shownScreen(root), "run", "the sign-in lands on the screen");
    assert.ok(windowOf(root), "after a sign-in");
    await inAct(() => signIn.view.dispose());
    pageDocument().body.replaceChildren();

    const elsewhere = await viewOf(dead(going()), "#/programy");
    assert.equal(shownScreen(root), "programs");
    assert.equal(windowOf(root), undefined, "no window under Programy");
    await follow(elsewhere.address, RUN_ADDRESS);
    assert.ok(windowOf(root), "the window opens at the entering");
    await inAct(() => elsewhere.view.dispose());
  });
});

// Binding answer 2 of slice 4 (the window takes the focus when it appears) and D-88. A game is built
// before the page places it, so a window open at the build cannot take the focus then; the first
// reading of the clock does it. Catches a window left with no focus after a reload, and one that
// takes the focus from a control the player has already moved to.
test("a window open at the build takes the keyboard focus at the first reading of the clock, unless the focus already stands on a control", async () => {
  await onPage(async ({ root, reading }) => {
    const writes = [];
    Object.defineProperty(pageDocument().documentElement, "scrollTop", {
      configurable: true,
      get: () => 0,
      set(value) {
        writes.push(value);
      },
    });
    const { view } = await viewOf(dead(going()));
    const opened = expectWindow(root);
    assert.ok(
      !opened.contains(pageDocument().activeElement),
      "precondition: nothing took the focus while the game was detached",
    );
    const before = writes.length;
    await reading();
    assert.ok(
      pageDocument().activeElement === opened,
      "the window has the focus after the first reading",
    );
    assert.deepEqual(
      writes.slice(before),
      [0],
      "the page goes to its top with the focus, past a scroll the browser restored",
    );
    await inAct(() => view.dispose());
  });
  await onPage(async ({ root, reading }) => {
    const { view } = await viewOf(dead(going()));
    const other = pageDocument().createElement("button");
    pageDocument().body.append(other);
    other.focus();
    await reading();
    assert.ok(
      pageDocument().activeElement === other,
      "a focus the player placed stays",
    );
    assert.ok(windowOf(root), "the window stands");
    await inAct(() => view.dispose());
  });
});

// D-212, D-368. Catches a window that comes back after a load with „Ostatnie minuty” the memory
// of the page no longer has, and one that lacks them where the chronicle holds the entries.
test("„Ostatnie minuty” are the last entries of the chronicle up to the entry of the death after a death on the screen, and stand nowhere after a completion or a load", async () => {
  await onPage(async (page) => {
    const { root } = page;
    const { view } = await dieOnTheScreen(page);
    const rows = minuteRows(root);
    assert.ok(rows.length >= 1 && rows.length <= 4, "at most four entries");
    const newest = chronicleRows(root)[0];
    assert.deepEqual(
      rows[rows.length - 1],
      newest,
      "the window ends with the entry of the death, which the chronicle holds newest",
    );
    await inAct(() => view.dispose());
    pageDocument().body.replaceChildren();
    const loaded = await viewOf(dead(going()));
    assert.equal(
      byClass(expectWindow(root), "end-window-minutes").length,
      0,
      "none after a load, the chronicle holding nothing",
    );
    await inAct(() => loaded.view.dispose());
    pageDocument().body.replaceChildren();
    const done = await completeOnTheScreen(page);
    assert.equal(
      byClass(expectWindow(root), "end-window-minutes").length,
      0,
      "none after a completion",
    );
    await inAct(() => done.view.dispose());
  });
});

// --- closing and opening again ------------------------------------------------------------------

// task To do 2, binding answer 2. Catches „✕” or Escape that leaves the window or the covering,
// a header without „Koniec przejścia” before „Restart”, a focus left behind, and a „Koniec
// przejścia” that does not open the window again.
test("„✕” and Escape close the window and uncover the screen, the header holds „Koniec przejścia” before „Restart” with the focus on it, and it opens the window again", async () => {
  await onPage(async (page) => {
    const { root } = page;
    const { view } = await dieOnTheScreen(page);
    for (const closing of [
      () => press(windowButton(root, "✕")),
      () => escape(expectWindow(root)),
    ]) {
      await closing();
      assert.equal(windowOf(root), undefined, "the window is gone");
      assert.ok(uncovered(root), "the screen is uncovered");
      assert.deepEqual(
        headerLabels(root),
        ["Koniec przejścia", "Restart", "Zakończ"],
        "the header holds the button before „Restart”",
      );
      assert.ok(
        pageDocument().activeElement === headerButton(root, "Koniec przejścia"),
        "the focus went to „Koniec przejścia”",
      );
      await press(headerButton(root, "Koniec przejścia"));
      assert.ok(windowOf(root), "„Koniec przejścia” opens the window again");
      assert.ok(covered(root));
      assert.equal(headerButton(root, "Koniec przejścia"), undefined);
    }
    await inAct(() => view.dispose());
  });
});

// task To do 2. Catches a „Koniec przejścia” drawn while the map run goes on or paused.
test("the header has no „Koniec przejścia” while the map run goes on or is paused", async () => {
  await onPage(async ({ root }) => {
    const { view } = await viewOf(going());
    assert.equal(headerButton(root, "Koniec przejścia"), undefined);
    await press(headerButton(root, "Pauza"));
    assert.equal(headerButton(root, "Koniec przejścia"), undefined);
    await inAct(() => view.dispose());
  });
});

// D-173, D-311. Catches the window standing with the question and the question closing the
// header's button with no effect.
test("„Koniec przejścia” pressed while the question stands closes the question and opens the window, so the two never stand together", async () => {
  await onPage(async ({ root }) => {
    const { view } = await viewOf(renamed(dead(going())));
    await press(windowButton(root, "Zakończ"));
    assert.ok(questionOf(root), "the question stands");
    await press(headerButton(root, "Koniec przejścia"));
    assert.equal(questionOf(root), undefined, "the question is gone");
    assert.ok(windowOf(root), "the window is open");
    assert.equal(
      (await heldState(view)).run.death !== null,
      true,
      "the map run is still ended",
    );
    await inAct(() => view.dispose());
  });
});

// --- „Restart” ----------------------------------------------------------------------------------

// D-62, D-132, task To do 2. Catches a „Restart” of the window that leaves the window or the
// ended map run, one that does not start the same seed from minute zero, and a focus lost.
test("„Restart” of the window closes it and starts the map run again from game minute zero on the same seed, with the header's „Restart” focused", async () => {
  await onPage(async (page) => {
    const { root } = page;
    const { view } = await dieOnTheScreen(page);
    const before = await heldState(view);
    await press(windowButton(root, "Restart"));
    const after = await heldState(view);
    assert.equal(after.run.death, null, "a new map run stands");
    assert.equal(after.run.minute, 0);
    assert.equal(after.run.seed, before.run.seed, "the same seed");
    assert.equal(windowOf(root), undefined, "the window is gone");
    assert.ok(uncovered(root));
    assert.ok(
      headerButton(root, "Pauza"),
      "the map run goes on from its screen",
    );
    assert.equal(headerButton(root, "Koniec przejścia"), undefined);
    assert.ok(
      pageDocument().activeElement === headerButton(root, "Restart"),
      "the focus stands where the header's own „Restart” leaves it",
    );
    await inAct(() => view.dispose());
  });
});

// task To do 2. Catches the header's „Restart” after a „✕” that leaves the window open for the
// next ended map run: the map run it starts is not ended, so no window stands.
test("„Restart” of the header after „✕” starts the map run again and no window stands", async () => {
  await onPage(async (page) => {
    const { root } = page;
    const { view } = await dieOnTheScreen(page);
    await press(windowButton(root, "✕"));
    await press(headerButton(root, "Restart"));
    assert.equal((await heldState(view)).run.death, null);
    assert.equal(windowOf(root), undefined);
    assert.ok(uncovered(root));
    await inAct(() => view.dispose());
  });
});

// --- „Zakończ” ----------------------------------------------------------------------------------

// D-62, D-53, D-173. Catches a „Zakończ” of the window that asks with no unsaved changes, one that
// leaves the map run, and one that leads anywhere but to Postać.
test("„Zakończ” of the window with no unsaved changes ends the map run at once and opens Postać", async () => {
  await onPage(async ({ root }) => {
    const { view, address } = await viewOf(dead(going()));
    await press(windowButton(root, "Zakończ"));
    assert.equal(questionOf(root), undefined);
    assert.equal((await heldState(view)).run, null);
    assert.equal(shownScreen(root), "character");
    assert.deepEqual(address.entries, [RUN_ADDRESS, "#/postac/1"]);
    await inAct(() => view.dispose());
  });
});

// D-173, task To do 8 and question 10. Catches the question standing in the window, the window
// standing over the question, a map run ended by the click, and a window that opens again by itself
// after „Wróć”.
test("„Zakończ” of the window with unsaved changes closes the window and asks in the panel of the copy; „Wróć” leaves the window closed and „Koniec przejścia” opens it", async () => {
  await onPage(async ({ root }) => {
    const { view, address } = await viewOf(renamed(dead(going())));
    await press(windowButton(root, "Zakończ"));
    assert.equal(windowOf(root), undefined, "the window closed");
    assert.ok(uncovered(root), "the screen is uncovered");
    const question = questionOf(root);
    assert.ok(question, "the question stands");
    assert.ok(
      byClass(runScreenOf(root), "program-panel")[0].contains(question),
      "in the panel of the copy",
    );
    assert.equal(byClass(question, "end-window").length, 0, "not in a window");
    assert.notEqual((await heldState(view)).run, null, "not ended yet");
    assert.deepEqual(address.entries, [RUN_ADDRESS]);

    await press(answer(root, "Wróć"));
    assert.equal(questionOf(root), undefined);
    assert.equal(windowOf(root), undefined, "the window stays closed");
    assert.deepEqual(
      headerLabels(root),
      ["Koniec przejścia", "Restart", "Zakończ"],
      "„Koniec przejścia” stands in the header",
    );
    assert.equal(shownScreen(root), "run");
    assert.deepEqual(address.entries, [RUN_ADDRESS], "„Wróć” leads nowhere");
    // Any later change of the game draws the screens again; the window must not come back with it.
    await press(buttonIn(runScreenOf(root), "Porzuć zmiany"));
    assert.equal(windowOf(root), undefined, "the window stays closed");
    await press(headerButton(root, "Koniec przejścia"));
    assert.ok(windowOf(root), "„Koniec przejścia” opens the window");
    await inAct(() => view.dispose());
  });
});

// D-173. Catches the answers of a question a button of the window asked leading to another screen
// than the screen Postać, and „Zapisz” not saving the copy.
test("the question asked by „Zakończ” of the window leads to Postać after „Zapisz” and after „Odrzuć”", async () => {
  for (const [name, expectSaved] of [
    ["Zapisz", true],
    ["Odrzuć", false],
  ]) {
    await onPage(async ({ root }) => {
      const { view, address } = await viewOf(renamed(dead(going())));
      await press(windowButton(root, "Zakończ"));
      await press(answer(root, name));
      const left = await heldState(view);
      assert.equal(left.run, null, `${name}: the map run ended`);
      assert.equal(
        left.programs[0].program.groups[0].name,
        expectSaved ? "Zmieniony" : "Program",
        `${name}: the program holds what the answer gives`,
      );
      assert.equal(shownScreen(root), "character", name);
      assert.deepEqual(address.entries, [RUN_ADDRESS, "#/postac/1"], name);
      await inAct(() => view.dispose());
    });
  }
});

// --- „Otwarte: {mapa} →” ------------------------------------------------------------------------

const MAP_ADDRESS = "#/mapy/forestDeep";

// D-53, D-173, task To do 8. Catches an „Otwarte” that leads to Postać, one that leaves the map run
// standing, and one that opens the screen Mapy without the card of the map it opened.
test("„Otwarte: Las — głębiej →” with no unsaved changes ends the map run and opens the screen Mapy at the card of the opened map in place of Postać", async () => {
  await onPage(async ({ root }) => {
    const { view, address } = await viewOf(completed(going()));
    await press(windowButton(root, "Otwarte: Las — głębiej →"));
    assert.equal(questionOf(root), undefined, "no question to ask");
    assert.equal((await heldState(view)).run, null, "the map run ended");
    assert.equal(shownScreen(root), "maps");
    assert.deepEqual(address.entries, [RUN_ADDRESS, MAP_ADDRESS]);
    assert.equal(
      byClass(root, "character-screen").length,
      0,
      "Postać did not open",
    );
    await inAct(() => view.dispose());
  });
});

// D-173, task To do 8 and question 10. Catches a question that forgets which button asked it and
// leads to Postać, a „Zapisz” that does not save, and a „Wróć” that ends the map run or leads on.
test("the question asked by „Otwarte: …” leads to the screen Mapy at the opened map after „Zapisz” and after „Odrzuć”, and „Wróć” leads nowhere", async () => {
  for (const [name, expectSaved] of [
    ["Zapisz", true],
    ["Odrzuć", false],
  ]) {
    await onPage(async ({ root }) => {
      const { view, address } = await viewOf(renamed(completed(going())));
      await press(windowButton(root, "Otwarte: Las — głębiej →"));
      assert.equal(windowOf(root), undefined, `${name}: the window closed`);
      assert.ok(questionOf(root), `${name}: the question stands`);
      assert.notEqual((await heldState(view)).run, null);
      await press(answer(root, name));
      const left = await heldState(view);
      assert.equal(left.run, null, `${name}: the map run ended`);
      assert.equal(
        left.programs[0].program.groups[0].name,
        expectSaved ? "Zmieniony" : "Program",
        name,
      );
      assert.equal(shownScreen(root), "maps", name);
      assert.deepEqual(address.entries, [RUN_ADDRESS, MAP_ADDRESS], name);
      await inAct(() => view.dispose());
    });
  }
  await onPage(async ({ root }) => {
    const { view, address } = await viewOf(renamed(completed(going())));
    await press(windowButton(root, "Otwarte: Las — głębiej →"));
    await press(answer(root, "Wróć"));
    assert.notEqual((await heldState(view)).run, null, "the map run stands");
    assert.equal(shownScreen(root), "run");
    assert.deepEqual(address.entries, [RUN_ADDRESS], "„Wróć” leads nowhere");
    assert.equal(windowOf(root), undefined, "the window stays closed");
    assert.ok(headerButton(root, "Koniec przejścia"));
    await inAct(() => view.dispose());
  });
});

// D-173. Catches the memory of the asking button staying after „Wróć”: a later „Zakończ” of the
// header must lead to Postać, not to the map the earlier „Otwarte” asked about.
test("after „Wróć” a later „Zakończ” leads to Postać, not to the map of the earlier „Otwarte”", async () => {
  await onPage(async ({ root }) => {
    const { view, address } = await viewOf(renamed(completed(going())));
    await press(windowButton(root, "Otwarte: Las — głębiej →"));
    await press(answer(root, "Wróć"));
    await press(headerButton(root, "Zakończ"));
    await press(answer(root, "Odrzuć"));
    assert.equal(shownScreen(root), "character");
    assert.deepEqual(address.entries, [RUN_ADDRESS, "#/postac/1"]);
    await inAct(() => view.dispose());
  });
});

// --- „Dodaj regułę z tym” -----------------------------------------------------------------------

// D-313, D-122, task To do 9. Catches a button that leaves the window over the rule panel, adds no
// rule, adds it somewhere but the end of the first group, or opens no panel.
test("„Dodaj regułę z tym” of the window closes it, adds the rule of the discovery at the end of the copy's first group and opens its panel", async () => {
  await onPage(async ({ root }) => {
    const ended = completed(atDiscovery());
    const { view } = await viewOf(ended);
    const before = ended.run.copy.program.groups[0].rules.length;
    assert.ok(
      byClass(expectWindow(root), "end-window-discovery")[0],
      "precondition: the window names the discovery",
    );
    assert.equal(
      byClass(runScreenOf(root), "rule-panel").length,
      0,
      "precondition: no rule panel",
    );
    await press(windowButton(root, "Dodaj regułę z tym"));
    assert.equal(windowOf(root), undefined, "the window is closed");
    assert.ok(uncovered(root));
    const rules = (await heldState(view)).run.copy.program.groups[0].rules;
    assert.equal(rules.length, before + 1, "one rule added at the end");
    const panels = byClass(runScreenOf(root), "rule-panel").filter(shown);
    assert.equal(panels.length, 1, "its panel stands open");
    await inAct(() => view.dispose());
  });
});

// --- the memory of the page ---------------------------------------------------------------------

// D-368, D-323, D-173. Catches the memory of the window written into the game state or the save,
// and a window that survives a load: a game built from the kept document opens it as a map run
// ended opens it, whatever the player did with it.
test("the window stands in no game state and no saved document: closing and opening it changes the document not at all, and a load opens it by the rule of an ended map run", async () => {
  await onPage(async (page) => {
    const { root } = page;
    const { view } = await dieOnTheScreen(page);
    const opened = JSON.stringify(await inAct(() => view.keep().document));
    await press(windowButton(root, "✕"));
    const closed = JSON.stringify(await inAct(() => view.keep().document));
    assert.equal(closed, opened, "closing changes the document not at all");
    assert.doesNotMatch(closed, /window|okno|Koniec przejścia/i);
    const { document } = await inAct(() => view.keep());
    await inAct(() => view.dispose());
    pageDocument().body.replaceChildren();
    const loaded = loadSavedGame(JSON.parse(JSON.stringify(document)));
    assert.equal(loaded.ok, true);
    const again = await viewOf(loaded.state);
    assert.ok(windowOf(root), "a load opens the window although it was closed");
    await inAct(() => again.view.dispose());
  });
});

// D-212, D-135, D-185, D-216, task To do 10. Catches a window that, after a reload of the screen of
// an ended map run, reads its streak line or its line of what the end gave or cost from anything but
// the loaded game state (the header's streak, a constant, the memory of the page). The expectations
// are written out: the streak of the death is set to 116 and that of the completion to 480, each
// above the streak the state holds when it ended; the lines are the sentences of To do 5 and 6 of
// the task and of D-185 for a bring plan that takes nothing.
test("a reload of the screen of an ended map run opens the window with its longest streak and the line of what the end gave or cost read from the loaded state, after a death and after a completion", async () => {
  /** The window's streak line and cost line after a reload of `document`. */
  async function lines(document, root) {
    const loaded = loadSavedGame(JSON.parse(JSON.stringify(document)));
    assert.equal(loaded.ok, true, "precondition: the document loads");
    const again = await viewOf(loaded.state);
    const opened = expectWindow(root);
    const read = {
      streak: byClass(opened, "run-header-requirement-text")[0]?.textContent,
      cost: byClass(opened, "end-window-cost")[0]?.textContent,
    };
    await inAct(() => again.view.dispose());
    pageDocument().body.replaceChildren();
    return read;
  }
  await onPage(async (page) => {
    const { root } = page;
    const died = await dieOnTheScreen(page);
    const diedDocument = structuredClone(
      (await inAct(() => died.view.keep())).document,
    );
    await inAct(() => died.view.dispose());
    pageDocument().body.replaceChildren();
    const { run } = diedDocument.game;
    assert.ok(run.minute >= 116, "precondition: the death is after 116");
    assert.ok(run.streak <= 116, "precondition: the streak is below 116");
    run.longestStreak = 116;
    assert.deepEqual(await lines(diedDocument, root), {
      streak: "najdłuższa passa 116/480",
      cost: "Wskrzeszenie zużyte: wprawa z tego przejścia przepada, wcześniejsza i wykupione stopnie zostają. Następne wskrzeszenie po 8 godzinach czasu realnego.",
    });

    const start = completed(going());
    const everyMinuteExploring = Object.fromEntries(
      Object.keys(start.run.minutesByAction).map((kind) => [kind, 0]),
    );
    everyMinuteExploring.explore = 480;
    const done = await viewOf({
      ...start,
      run: {
        ...start.run,
        longestStreak: 480,
        minutesByAction: everyMinuteExploring,
        deposited: [],
      },
    });
    const doneDocument = (await inAct(() => done.view.keep())).document;
    await inAct(() => done.view.dispose());
    pageDocument().body.replaceChildren();
    assert.deepEqual(await lines(doneDocument, root), {
      streak: "najdłuższa passa 480/480",
      cost: "Do skrzynki nic nie trafiło.",
    });
  });
});

// D-323. Catches a window that still opens and closes after an error nothing handled.
test("after halt() the window's buttons change nothing", async () => {
  await onPage(async (page) => {
    const { root } = page;
    const { view } = await dieOnTheScreen(page);
    await inAct(() => view.halt());
    await press(windowButton(root, "✕"));
    assert.ok(windowOf(root), "„✕” leaves the window");
    await inAct(() => view.dispose());
  });
});
