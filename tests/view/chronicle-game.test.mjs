// The chronicle in the game view (D-338, D-339, D-346, D-383, D-147, D-311) on jsdom through
// tests/view/page-document.mjs (D-264): the game view is built as the page builds it, and the map run's screen is driven through the buttons the
// player presses and the address the page follows. What the cases hold is that the chronicle and the
// tab and filter picked belong to the game view — they outlive a visit to Siedziba and „Restart”,
// and a send after „Zakończ” starts them anew — and that a game loaded with a record of an
// encounter shows the paragraph in the chronicle alone. The setup follows
// tests/view/end-question.test.mjs. Real events, the look and scrolling are checked in the browser
// (D-88). Every comparison is of plain data or of a handful of words (D-268).
import { assert, inAct, press, withPage } from "./page-document.mjs";
import { mock, test } from "node:test";
import {
  createCharacter,
  send,
  setProgram,
} from "../../dist/browser/sim/game.js";
import { newKnowingGame } from "../sim/understanding-fixture.mjs";
import { programFromRules } from "../sim/program-fixture.mjs";

// --- the page on jsdom --------------------------------------------------------------------------

const CLOCK_MS = 1_760_000_000_000;
const RUN_ADDRESS = "#/postac/1/przejscie";
const SENT = { mapId: "forest", characterId: 1, programId: 1 };

const handClock = (now) => ({
  now,
  measure: () => undefined,
  clearMeasures: () => undefined,
});

/**
 * Runs `body` on a window of its own with Node's mocked timers and a clock of real milliseconds the
 * case moves with `pass(ms)`; `reading()` makes the game's next reading of the clock.
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

const buttonIn = (root, text) =>
  all(root).find(
    (element) => element.localName === "button" && element.textContent === text,
  );

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
  };
  return address;
}

/** The game of `state` built in the page as a reload at `hash` builds it; saves are never answered. */
async function viewOf(state, hash = RUN_ADDRESS) {
  const { createGameView } =
    await import("../../dist/browser/view/game-view.js");
  const address = fakeAddress(hash);
  const view = await inAct(() =>
    createGameView({
      client: { saveGame: () => new Promise(() => undefined) },
      state,
      revision: 1,
      address,
      entry: "address",
      onScreen: () => {},
      onConflict: () => {},
      onOutdated: () => {},
      onSignedOut: () => {},
    }),
  );
  pageDocument().body.append(view.element);
  return { view, address };
}

const follow = (address, hash) => inAct(() => address.follow(hash));

const runScreenOf = (root) => byClass(root, "run-screen")[0];
const rowsOf = (root) =>
  byClass(runScreenOf(root), "chronicle-row").map((row) => [
    row.querySelector(".chronicle-minute").textContent,
    row.querySelector(".chronicle-text").textContent,
  ]);
const pressedIn = (container) =>
  [...container.querySelectorAll("button")]
    .filter((button) => button.getAttribute("aria-pressed") === "true")
    .map((button) => button.textContent);
const tabsPressed = (root) => pressedIn(byClass(runScreenOf(root), "tabs")[0]);
const filterPressed = (root) =>
  pressedIn(byClass(runScreenOf(root), "chronicle-filters")[0]);

// --- the states ---------------------------------------------------------------------------------

/** Ala's map run of Las under „Zawsze → Wędruj” in a game that knows every action, going on. */
function exploring() {
  const program = setProgram(
    newKnowingGame(),
    programFromRules({
      condition: { kind: "always" },
      action: { kind: "wander" },
    }),
  ).state;
  return send(createCharacter(program, "Ala").state, SENT, 0).state;
}

const WOLF = {
  creatureId: "wolf",
  attackMinute: 212,
  resolveMinute: 215,
  result: null,
};
const WOLF_TEXT =
  "Napada wilk (24/24). Wilk: Zdrowie poniżej 8 → Odskocz; Zawsze → Uderz.";

/** The map run after the game has run for a while, so its chronicle holds entries of its own. */
async function played({ pass, reading }, view) {
  pass(60_000);
  await reading();
  return view;
}

// D-346, D-339. Catches a chronicle that lives in the screen and so is lost when the
// player leaves for Siedziba and comes back, and a tab picked that returns to „Kronika”.
test("the chronicle and the tab picked are there after Przejście, Siedziba and Przejście again", async () => {
  await onPage(async (page) => {
    const { root } = page;
    const { view, address } = await viewOf(exploring());
    await played(page, view);
    const before = rowsOf(root);
    assert.ok(before.length > 0, "precondition: the map run has entries");
    assert.deepEqual(tabsPressed(root), ["Kronika"]);

    await follow(address, "#/");
    await follow(address, RUN_ADDRESS);
    assert.deepEqual(rowsOf(root), before, "the entries are still there");
    assert.deepEqual(tabsPressed(root), ["Kronika"]);

    await press(buttonIn(runScreenOf(root), "Teren"));
    await follow(address, "#/");
    await follow(address, RUN_ADDRESS);
    assert.deepEqual(tabsPressed(root), ["Teren"], "the tab picked stays");
    assert.equal(byClass(runScreenOf(root), "tile-list").length, 1);
    await press(buttonIn(runScreenOf(root), "Kronika"));
    assert.deepEqual(rowsOf(root), before);
    await inAct(() => view.dispose());
  });
});

// D-343, D-346, D-383. Catches „Restart” that keeps the entries of the map run before it, or that
// brings back „Kronika” or „Wszystko”.
test("„Restart” starts the chronicle anew and keeps the tab and the filter picked", async () => {
  await onPage(async (page) => {
    const { root } = page;
    const { view } = await viewOf(exploring());
    await played(page, view);
    const before = rowsOf(root);
    assert.ok(before.length > 1, "precondition: more than one entry");
    await press(buttonIn(runScreenOf(root), "Czynności"));
    await press(buttonIn(runScreenOf(root), "Teren"));

    await press(buttonIn(byClass(root, "run-header")[0], "Restart"));
    assert.deepEqual(tabsPressed(root), ["Teren"], "the tab kept");
    await press(buttonIn(runScreenOf(root), "Kronika"));
    assert.deepEqual(filterPressed(root), ["Czynności"], "the filter kept");
    const after = rowsOf(root);
    assert.ok(after.length < before.length, "the entries of the run before go");
    assert.ok(
      after.every(([minute]) => minute === "0"),
      "only what the new map run started at minute 0",
    );
    await inAct(() => view.dispose());
  });
});

// D-343, D-346, D-383. Catches the entries of an ended map run carried over to the next one, and
// the tab and the filter of the ended one kept after a send.
test("„Zakończ” clears the chronicle and a new send starts with Kronika and Wszystko picked", async () => {
  await onPage(async (page) => {
    const { root } = page;
    const { view, address } = await viewOf(exploring());
    await played(page, view);
    await press(buttonIn(runScreenOf(root), "Czynności"));
    await press(buttonIn(runScreenOf(root), "Teren"));

    await press(buttonIn(byClass(root, "run-header")[0], "Zakończ"));
    await follow(address, "#/mapy/forest");
    const enter = all(root).find(
      (element) =>
        element.getAttribute("aria-label") === "Wejdź: Ala, mapa Las",
    );
    await press(enter);
    assert.ok(
      byClass(root, "run-screen").some((screen) => !screen.hidden),
      "the new map run's screen shows",
    );
    assert.deepEqual(tabsPressed(root), ["Kronika"]);
    assert.deepEqual(filterPressed(root), ["Wszystko"]);
    const rows = rowsOf(root);
    assert.ok(
      rows.every(([minute]) => minute === "0"),
      "only the first activity of the new map run",
    );
    await inAct(() => view.dispose());
  });
});

// D-339, D-147. Catches the paragraph of the last encounter still standing in the world
// area, and a chronicle built from a loaded game that shows anything but the paragraph.
test("a game loaded with a record of an encounter shows the paragraph in the chronicle alone and none in the world area", async () => {
  await onPage(async ({ root }) => {
    const start = exploring();
    const loaded = {
      ...start,
      paused: true,
      run: { ...start.run, minute: 300, lastCombat: WOLF },
    };
    const { view } = await viewOf(loaded);
    assert.deepEqual(rowsOf(root), [["212", WOLF_TEXT]]);
    assert.equal(byClass(runScreenOf(root), "combat-line").length, 0);
    assert.equal(
      byClass(byClass(runScreenOf(root), "world-area")[0], "chronicle").length,
      0,
    );
    await inAct(() => view.dispose());
  });
});
