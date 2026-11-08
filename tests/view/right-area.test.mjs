// The right area of the screen of a map run in React (task kronika-z-filtrami, To do 6, 8 and 9;
// D-311, D-343, D-344, D-346, D-147, D-276, D-130; spec D5, D6, D7, D9) on jsdom through
// tests/view/page-document.mjs (D-264): the tabs „Kronika” and „Teren”, under „Kronika” the seven
// filter buttons and the list of the chronicle, newest first, each row the game minute alone in a
// column and the entry's text in the role of its kind, the paragraph of the last encounter at its
// place, the sentence of an empty list and the window the list draws and grows on a scroll; under
// „Teren” the table of revealed tiles. The chronicle is built and fed here as the game view feeds it,
// with events written out by hand where the case is about words, so each case states the words it
// expects (D-73). Real events, the look and scrolling are checked in the browser (D-88). Every
// comparison is of plain data or of a handful of words (D-268).
import { assert, inAct, withPage } from "./page-document.mjs";
import { test } from "node:test";
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import {
  createCharacter,
  end,
  newGame,
  restart,
  send,
} from "../../dist/browser/sim/game.js";
import { createChronicle } from "../../dist/browser/view/chronicle.js";
import { RightArea } from "../../dist/browser/view/right-area.js";

const SENT = { mapId: "forest", characterId: 1 };
const REAL_MS = 1760000000003;
const FILTERS = [
  "Wszystko",
  "Odkrycia",
  "Czynności",
  "Walka",
  "Moje zmiany",
  "Passa",
  "Świat",
];
const WOLF_BEFORE = {
  creatureId: "wolf",
  attackMinute: 212,
  resolveMinute: 215,
  result: null,
};
const WOLF_BEFORE_TEXT =
  "Napada wilk (24/24). Wilk: Zdrowie poniżej 8 → Odskocz; Zawsze → Uderz.";
const WOLF_AFTER = {
  ...WOLF_BEFORE,
  result: {
    characterHealth: 93,
    creatureHealth: 18,
    outcome: "creatureDefeated",
    ruleStarts: { 1: 1 },
    exchanges: [
      {
        creatureAction: { kind: "strike", damage: 7, characterHealth: 93 },
        characterAction: {
          ruleId: 1,
          action: { kind: "strikeWithStick" },
          damage: 6,
          creatureHealth: 18,
          characterHealth: 93,
        },
      },
    ],
  },
};
const WOLF_AFTER_TEXT = `${WOLF_BEFORE_TEXT} Wilk gryzie: −7 · Mag uderza patykiem: wilk 18/24 · Wilk pokonany.`;

const all = (root) => [root, ...root.querySelectorAll("*")];
const byClass = (root, name) =>
  all(root).filter((element) => element.classList.contains(name));
const buttonNamed = (root, text) =>
  all(root).find(
    (element) => element.localName === "button" && element.textContent === text,
  );

function fire(target, type) {
  const { Event } = globalThis.window;
  target.dispatchEvent(new Event(type, { bubbles: true, cancelable: true }));
}

function press(target) {
  assert.ok(target, "what the case presses stands");
  return inAct(() => fire(target, "click"));
}

/** A new game with one character, not yet sent, and the game after the send. */
const readyGame = () => createCharacter(newGame(), "Ala").state;
const sentGame = () => send(readyGame(), SENT, REAL_MS).state;

/** A chronicle built from a game with no map run, the send of its character recorded. */
function sentChronicle() {
  const before = readyGame();
  const chronicle = createChronicle(before);
  const sent = send(before, SENT, REAL_MS);
  chronicle.record(sent, before);
  return { chronicle, state: sent.state };
}

const started = (minute, action) => ({
  kind: "activityStarted",
  minute,
  activity: { kind: "rule", ruleId: 1, action },
  stepTo: null,
});

/** Records events on `state` inside act, as the game view records a reading of the clock. */
function record(chronicle, state, events) {
  return inAct(() => chronicle.record({ state, events }, state));
}

/**
 * Draws the right area of `state` over `chronicle` in a root of its own; `show(state)` draws it
 * again with a new props object, as the screen does at each reading of the clock.
 */
async function draw(document, chronicle, state, extra = {}) {
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);
  const hovers = [];
  const show = (next) =>
    inAct(() =>
      root.render(
        createElement(RightArea, {
          state: next,
          chronicle,
          hovered: extra.hovered ?? null,
          onHover: (key) => hovers.push(key),
        }),
      ),
    );
  await show(state);
  return { container, show, hovers };
}

const rowsOf = (container) =>
  byClass(container, "chronicle-row").map((row) => ({
    minute: row.querySelector(".chronicle-minute")?.textContent,
    text: row.querySelector(".chronicle-text")?.textContent,
    textClass: row.querySelector(".chronicle-text")?.className,
    minuteClass: row.querySelector(".chronicle-minute")?.className,
  }));
const textsOf = (container) => rowsOf(container).map((row) => row.text);
const emptyOf = (container) => byClass(container, "chronicle-empty")[0];
const pressedIn = (container) =>
  byClass(container, "chronicle-filters")[0]
    ? [...byClass(container, "chronicle-filters")[0].children]
        .filter((button) => button.getAttribute("aria-pressed") === "true")
        .map((button) => button.textContent)
    : null;

// D-311, D-346, task item 8. Catches the tabs missing or in another order, „Teren” picked at the
// start, both contents standing at once, a pick the memory is not told, and a pick that does not
// bring the other content.
test("the right area holds the tabs Kronika and Teren with Kronika picked first, and a click on a tab tells the chronicle and shows its content alone", async () => {
  await withPage(async ({ document }) => {
    const { chronicle, state } = sentChronicle();
    const { container } = await draw(document, chronicle, state);
    const tabs = byClass(container, "tabs")[0];
    assert.deepEqual(
      [...tabs.children].map((tab) => [
        tab.textContent,
        tab.className,
        tab.getAttribute("aria-pressed"),
      ]),
      [
        ["Kronika", "button tab selected", "true"],
        ["Teren", "button tab", "false"],
      ],
    );
    assert.equal(byClass(container, "chronicle").length, 1);
    assert.equal(byClass(container, "tile-list").length, 0);

    await press(buttonNamed(tabs, "Teren"));
    assert.equal(chronicle.snapshot().tab, "terrain");
    assert.equal(byClass(container, "chronicle").length, 0);
    assert.equal(byClass(container, "tile-list").length, 1);
    assert.deepEqual(
      [...tabs.children].map((tab) => tab.getAttribute("aria-pressed")),
      ["false", "true"],
    );

    await press(buttonNamed(tabs, "Kronika"));
    assert.equal(chronicle.snapshot().tab, "chronicle");
    assert.equal(byClass(container, "chronicle").length, 1);
    assert.equal(byClass(container, "tile-list").length, 0);
  });
});

// D-346. Catches the tab picked outside the right area (a click on the memory made elsewhere) not
// reaching the screen, which reads the memory.
test("a tab picked in the memory outside the screen is the tab the area shows", async () => {
  await withPage(async ({ document }) => {
    const { chronicle, state } = sentChronicle();
    const { container } = await draw(document, chronicle, state);
    await inAct(() => chronicle.pickTab("terrain"));
    assert.equal(byClass(container, "tile-list").length, 1);
    assert.equal(byClass(container, "chronicle").length, 0);
  });
});

// D-311, D-346 (its cost). Catches the table kept under „Kronika”, the hover link standing without
// the table, and a hovered tile left marked after the tab it was hovered under went.
test("the link between a hovered tile and its row of the table stands only while Teren is picked", async () => {
  await withPage(async ({ document }) => {
    const { chronicle, state } = sentChronicle();
    // The tile (1, 1) revealed, so the table holds its row.
    const revealed = {
      col: 1,
      row: 1,
      at: { q: 1, r: 1 },
      revealed: true,
      stepMinutes: 5,
      stock: {},
    };
    const { container, hovers } = await draw(
      document,
      chronicle,
      { ...state, run: { ...state.run, tiles: [revealed] } },
      { hovered: "1,1" },
    );
    assert.equal(byClass(container, "tile-list").length, 0);
    assert.equal(byClass(container, "hovered").length, 0);

    await press(buttonNamed(container, "Teren"));
    assert.deepEqual(
      hovers,
      [null],
      "a tab picked clears the hover of the tile",
    );
    const marked = byClass(container, "hovered");
    assert.equal(marked.length, 1, "one row marked");
    assert.equal(marked[0].getAttribute("data-tile"), "1,1");
  });
});

// D-343, D-130. Catches a filter missing or renamed, the buttons in another order, Wszystko not
// picked first, two buttons picked at once, the filters drawn as tabs, and a pick not told to the
// memory.
test("the filter row holds the seven buttons with Wszystko picked first, one picked at a time, in the look of the pace buttons", async () => {
  await withPage(async ({ document }) => {
    const { chronicle, state } = sentChronicle();
    const { container } = await draw(document, chronicle, state);
    const row = byClass(container, "chronicle-filters")[0];
    assert.deepEqual(
      [...row.children].map((button) => button.textContent),
      FILTERS,
    );
    assert.deepEqual(pressedIn(container), ["Wszystko"]);
    assert.ok(
      [...row.children].every((button) => !button.classList.contains("tab")),
      "no filter is a tab",
    );
    assert.equal(
      buttonNamed(row, "Wszystko").className,
      "button selected",
      "the selected look of the pace buttons",
    );

    await press(buttonNamed(row, "Passa"));
    assert.deepEqual(pressedIn(container), ["Passa"]);
    assert.equal(chronicle.snapshot().filter, "streak");
    await press(buttonNamed(row, "Świat"));
    assert.deepEqual(pressedIn(container), ["Świat"]);
    assert.equal(chronicle.snapshot().filter, "world");
    await press(buttonNamed(row, "Wszystko"));
    assert.deepEqual(pressedIn(container), ["Wszystko"]);
    assert.equal(chronicle.snapshot().filter, "all");
  });
});

// D-343, D-344, D-338, task items 9 and 7. Catches the oldest entry on top, the minute with a word
// beside it or in the colour of the text, the minute not in a column of its own, an entry in the
// role of another kind, the filter showing another kind's entries, and the row of a filter not
// following the entries recorded under it.
test("the list holds the entries newest first, each the minute alone beside the text in the role of its kind, and a filter shows its kind alone", async () => {
  await withPage(async ({ document }) => {
    const { chronicle, state } = sentChronicle();
    const { container } = await draw(document, chronicle, state);
    await record(chronicle, state, [
      started(10, { kind: "gather", resource: "stick" }),
      { kind: "campfireExtinguished", minute: 12, at: { q: 1, r: 1 } },
      { kind: "streakLost", minute: 391, streak: 391, cause: "cold" },
      { kind: "mapRunCompleted", minute: 480 },
    ]);
    const wait = {
      minute: "0",
      text: "Czeka — żadna reguła nie pasuje",
      textClass: "chronicle-text",
      minuteClass: "chronicle-minute",
    };
    assert.deepEqual(rowsOf(container), [
      {
        minute: "480",
        text: "Las rozwiązany",
        textClass: "chronicle-text positive",
        minuteClass: "chronicle-minute",
      },
      {
        minute: "391",
        text: "Passa 391 przerwana: zdrowie spadło od zimna",
        textClass: "chronicle-text danger",
        minuteClass: "chronicle-minute",
      },
      {
        minute: "12",
        text: "Ognisko wygasło",
        textClass: "chronicle-text",
        minuteClass: "chronicle-minute",
      },
      {
        minute: "10",
        text: "Zbierz — Patyk",
        textClass: "chronicle-text",
        minuteClass: "chronicle-minute",
      },
      wait,
    ]);

    await press(buttonNamed(container, "Passa"));
    assert.deepEqual(textsOf(container), [
      "Passa 391 przerwana: zdrowie spadło od zimna",
    ]);
    await press(buttonNamed(container, "Świat"));
    assert.deepEqual(textsOf(container), ["Las rozwiązany", "Ognisko wygasło"]);
    await press(buttonNamed(container, "Czynności"));
    assert.deepEqual(textsOf(container), [
      "Zbierz — Patyk",
      "Czeka — żadna reguła nie pasuje",
    ]);
    await record(chronicle, state, [started(20, { kind: "explore" })]);
    assert.deepEqual(textsOf(container), [
      "Eksploruj",
      "Zbierz — Patyk",
      "Czeka — żadna reguła nie pasuje",
    ]);
  });
});

// D-343, D-338, task item 2. Catches a discovery not in the role `discovery`, and a change of the
// player not in `player-change`.
test("a discovery stands in the role discovery and a change of the player in player-change", async () => {
  await withPage(async ({ document }) => {
    const { chronicle, state } = sentChronicle();
    const { container } = await draw(document, chronicle, state);
    await record(chronicle, state, [
      {
        kind: "discovered",
        minute: 84,
        trees: [],
        actions: ["explore"],
        conditions: [],
        items: [],
        creatures: [],
      },
    ]);
    await inAct(() =>
      chronicle.record({ state, events: [] }, state, { kind: "discard" }),
    );
    const roles = rowsOf(container).map((row) => row.textClass);
    assert.deepEqual(roles.slice(0, 2), [
      "chronicle-text player-change",
      "chronicle-text discovery",
    ]);
  });
});

// D-343, task item 9. Catches an empty chronicle or an empty filter drawn as nothing, the sentence
// kept after an entry arrives, and the sentence in the wrong words.
test("an empty chronicle and a filter that shows nothing say „Nic tu jeszcze nie ma.”, and the sentence goes where an entry comes", async () => {
  await withPage(async ({ document }) => {
    const empty = createChronicle(readyGame());
    const { container } = await draw(document, empty, sentGame());
    assert.equal(emptyOf(container).textContent, "Nic tu jeszcze nie ma.");
    assert.equal(rowsOf(container).length, 0);

    const { chronicle, state } = sentChronicle();
    const full = await draw(document, chronicle, state);
    assert.equal(emptyOf(full.container), undefined, "the wait stands");
    await press(buttonNamed(full.container, "Walka"));
    assert.equal(
      emptyOf(full.container).textContent,
      "Nic tu jeszcze nie ma.",
      "Walka before any attack",
    );
    await press(buttonNamed(full.container, "Passa"));
    assert.equal(emptyOf(full.container).textContent, "Nic tu jeszcze nie ma.");
    await record(chronicle, state, [
      { kind: "streakLost", minute: 5, streak: 5, cause: "hunger" },
    ]);
    assert.equal(emptyOf(full.container), undefined);
    assert.equal(rowsOf(full.container).length, 1);
  });
});

// D-147, D-339, spec D6. Catches the paragraph missing from its place among the entries, standing
// at the end, its minute not the attack's, the paragraph kept when the state holds no record of an
// encounter, and the paragraph not growing when the turns are resolved.
test("the paragraph of the last encounter stands at its minute among the entries, under Walka alone, and grows when the turns are resolved", async () => {
  await withPage(async ({ document }) => {
    const { chronicle, state } = sentChronicle();
    const fighting = {
      ...state,
      run: { ...state.run, lastCombat: WOLF_BEFORE },
    };
    const { container, show } = await draw(document, chronicle, state);
    assert.deepEqual(textsOf(container), ["Czeka — żadna reguła nie pasuje"]);

    await record(chronicle, state, [started(200, { kind: "explore" })]);
    await record(chronicle, fighting, [
      { kind: "attacked", minute: 212, creature: "wolf" },
    ]);
    await record(chronicle, fighting, [started(230, { kind: "eat" })]);
    await show(fighting);
    assert.deepEqual(
      rowsOf(container).map((row) => [row.minute, row.text, row.textClass]),
      [
        ["230", "Zjedz — jagoda", "chronicle-text"],
        ["212", WOLF_BEFORE_TEXT, "chronicle-text"],
        ["200", "Eksploruj", "chronicle-text"],
        ["0", "Czeka — żadna reguła nie pasuje", "chronicle-text"],
      ],
    );

    await press(buttonNamed(container, "Walka"));
    assert.deepEqual(
      rowsOf(container).map((row) => [row.minute, row.text]),
      [["212", WOLF_BEFORE_TEXT]],
    );

    const resolved = {
      ...state,
      run: { ...state.run, lastCombat: WOLF_AFTER },
    };
    await show(resolved);
    assert.deepEqual(textsOf(container), [WOLF_AFTER_TEXT]);

    await show(state);
    assert.equal(
      emptyOf(container).textContent,
      "Nic tu jeszcze nie ma.",
      "a state with no record of an encounter draws no paragraph",
    );
  });
});

// D-339. Catches a chronicle built from a loaded state drawn with anything but the paragraph alone.
test("a chronicle built from a loaded state draws the paragraph alone", async () => {
  await withPage(async ({ document }) => {
    const loaded = {
      ...sentGame(),
      paused: true,
      run: { ...sentGame().run, minute: 300, lastCombat: WOLF_BEFORE },
    };
    const { container } = await draw(document, createChronicle(loaded), loaded);
    assert.deepEqual(
      rowsOf(container).map((row) => [row.minute, row.text]),
      [["212", WOLF_BEFORE_TEXT]],
    );
  });
});

/** Gives the list the geometry a browser would: jsdom lays nothing out. */
function scrollTo(list, { top, height, client }) {
  Object.defineProperty(list, "scrollTop", { value: top, configurable: true });
  Object.defineProperty(list, "scrollHeight", {
    value: height,
    configurable: true,
  });
  Object.defineProperty(list, "clientHeight", {
    value: client,
    configurable: true,
  });
  return inAct(() => fire(list, "scroll"));
}

// D-343, spec D7. Catches every entry drawn at once (the draw growing with the chronicle), a list
// that cannot reach its older entries, a window that grows on a scroll far from its end, and a
// window that does not start anew with a filter picked.
test("the list draws a bounded window of the newest entries, grows it on a scroll near its end until every entry is reachable, and starts it anew with a filter", async () => {
  await withPage(async ({ document }) => {
    const { chronicle, state } = sentChronicle();
    const { container } = await draw(document, chronicle, state);
    const TOTAL = 400;
    const events = [];
    for (let minute = 1; minute <= TOTAL; minute += 1)
      events.push(
        started(
          minute,
          minute % 2 === 0
            ? { kind: "explore" }
            : { kind: "gather", resource: "stick" },
        ),
      );
    await record(chronicle, state, events);
    // The wait of the send and the 400 starts: 401 entries.
    const drawnAtFirst = rowsOf(container).length;
    assert.ok(drawnAtFirst > 0 && drawnAtFirst < TOTAL, "a bounded window");
    assert.equal(rowsOf(container)[0].minute, String(TOTAL), "the newest");

    const list = byClass(container, "chronicle-list")[0];
    await scrollTo(list, { top: 0, height: 5000, client: 300 });
    assert.equal(rowsOf(container).length, drawnAtFirst, "far from the end");
    await scrollTo(list, { top: 4700, height: 5000, client: 300 });
    const grown = rowsOf(container).length;
    assert.ok(grown > drawnAtFirst, "grown near the end");
    assert.equal(rowsOf(container)[0].minute, String(TOTAL));

    for (let round = 0; round < 50; round += 1)
      await scrollTo(list, { top: 4700, height: 5000, client: 300 });
    assert.equal(
      rowsOf(container).length,
      TOTAL + 1,
      "every entry reachable, the oldest the wait of the send",
    );
    assert.equal(rowsOf(container).at(-1).minute, "0");

    await press(buttonNamed(container, "Czynności"));
    assert.equal(
      rowsOf(container).length,
      drawnAtFirst,
      "a filter picked starts the window anew",
    );
  });
});

// D-343, spec D7. Catches a window grown in one map run staying as large in the next one, started by
// a send or by „Restart” (the list would draw rows the player has not scrolled to), and a window that
// starts anew whenever an entry arrives (the list would jump back while the player reads).
test("the grown window starts anew at a send and at „Restart”, and stays where an entry only arrives", async () => {
  await withPage(async ({ document }) => {
    const { chronicle, state } = sentChronicle();
    const { container } = await draw(document, chronicle, state);
    const manyStarts = (count) =>
      Array.from({ length: count }, (_, index) =>
        started(index + 1, { kind: "explore" }),
      );
    // The wait of the send and 400 starts: 401 entries in the map run.
    await record(chronicle, state, manyStarts(400));
    const drawnAtFirst = rowsOf(container).length;
    assert.ok(drawnAtFirst > 0 && drawnAtFirst < 400, "a bounded window");

    const growOnce = () =>
      scrollTo(byClass(container, "chronicle-list")[0], {
        top: 4700,
        height: 5000,
        client: 300,
      });
    await growOnce();
    const grown = rowsOf(container).length;
    assert.ok(grown > drawnAtFirst, "precondition: the window has grown");

    await record(chronicle, state, [started(401, { kind: "explore" })]);
    assert.equal(rowsOf(container).length, grown, "an entry arrives");
    assert.equal(rowsOf(container)[0].minute, "401");

    const restarted = restart(state);
    await inAct(() => chronicle.record(restarted, state));
    await record(chronicle, restarted.state, manyStarts(400));
    assert.equal(
      rowsOf(container).length,
      drawnAtFirst,
      "the new map run started by „Restart”",
    );

    await growOnce();
    assert.ok(rowsOf(container).length > drawnAtFirst, "grown again");
    const ended = end(restarted.state);
    await inAct(() => chronicle.record(ended, restarted.state));
    const sent = send(ended.state, SENT, REAL_MS + 1);
    await inAct(() => chronicle.record(sent, ended.state));
    await record(chronicle, sent.state, manyStarts(400));
    assert.equal(
      rowsOf(container).length,
      drawnAtFirst,
      "the new map run started by a send",
    );
  });
});

// Spec D6, D7. Catches the paragraph of the last encounter composed again whenever the list draws
// again (an entry recorded, a scroll), not only when the encounter changed. The encounter is a plain
// record whose read of the creature is counted.
test("the paragraph is composed once for an encounter however often the list draws again", async () => {
  await withPage(async ({ document }) => {
    const { chronicle, state } = sentChronicle();
    let reads = 0;
    const encounter = new Proxy(WOLF_BEFORE, {
      get(target, key) {
        if (key === "creatureId") reads += 1;
        return target[key];
      },
    });
    const fighting = { ...state, run: { ...state.run, lastCombat: encounter } };
    await record(chronicle, fighting, [
      { kind: "attacked", minute: 212, creature: "wolf" },
    ]);
    const { container } = await draw(document, chronicle, fighting);
    assert.ok(textsOf(container).includes(WOLF_BEFORE_TEXT), "precondition");
    const afterFirst = reads;
    assert.ok(afterFirst >= 1, "precondition: the encounter is read");

    await record(chronicle, fighting, [started(230, { kind: "eat" })]);
    await record(chronicle, fighting, [started(240, { kind: "explore" })]);
    assert.equal(rowsOf(container).length, 4, "the entries arrived");
    assert.equal(reads, afterFirst, "two entries recorded, none composed");
  });
});

// Spec D7. Catches the window read again at each reading of the clock, which redraws every row of a
// long chronicle five times a second.
test("a draw with nothing changed reads no window again, and a recorded entry reads it once", async () => {
  await withPage(async ({ document }) => {
    const { chronicle, state } = sentChronicle();
    let reads = 0;
    const counted = {
      ...chronicle,
      window(filter, size) {
        reads += 1;
        return chronicle.window(filter, size);
      },
    };
    const { show } = await draw(document, counted, state);
    const afterFirst = reads;
    assert.ok(afterFirst >= 1);
    await show({ ...state });
    await show({ ...state });
    assert.equal(reads, afterFirst, "draws with nothing changed");
    await record(chronicle, state, [started(5, { kind: "explore" })]);
    assert.equal(reads, afterFirst + 1, "one entry recorded, one read");
  });
});
