// The end-of-run window in React (task koniec-przejscia, To do 1, 2, 4 to 9; D-368, D-132, D-133,
// D-135, D-185, D-216, D-122, D-147, D-188, D-313, D-44, D-39) on jsdom through
// tests/view/page-document.mjs (D-264): the title after a death and after a completion in its
// role, the sections only where they have content and in their order, the paragraph of the last
// encounter once and in a section of its own, the shared buttons in their order with „Otwarte: …”
// only after a completion that opens a map, what each control is asked for, Escape and the focus
// when the window appears, and nothing drawn without an ended map run. The scrolling, the stay of
// the buttons at the bottom and the look are checked in the browser (D-88), which jsdom cannot show.
// Every comparison is of plain data or of a handful of words (D-268); every text is written out
// from the task and the decisions, not computed by the code under test (D-73).
import { assert, inAct, withPage } from "./page-document.mjs";
import { test } from "node:test";
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import {
  createCharacter,
  send,
  setProgram,
} from "../../dist/browser/sim/game.js";
import { MINUTE_KINDS } from "../../dist/browser/sim/run-record.js";
import { EndWindow } from "../../dist/browser/view/end-window.js";
import { programFromRules } from "../sim/program-fixture.mjs";
import { newKnowingGame } from "../sim/understanding-fixture.mjs";

const REAL_MS = 1760000000000;
const ALWAYS = { kind: "always" };
const rule = (action) => ({ condition: ALWAYS, action });

/** A game with a map run of the map given, sent under the rules given. */
function sent(rules, mapId = "forest") {
  const program = setProgram(
    newKnowingGame(),
    programFromRules(...rules),
  ).state;
  return send(
    createCharacter(program, "Ala").state,
    { mapId, characterId: 1 },
    REAL_MS,
  ).state;
}

const RUNNING = sent([]);

/** The same game with the fields of its map run given, such as a death or a completion. */
function withRun(state, fields) {
  return { ...state, run: { ...state.run, ...fields } };
}

/** Every kind of the closed list at 0 game minutes, with the counts given for some kinds. */
function minutes(counts) {
  return Object.fromEntries(
    MINUTE_KINDS.map((kind) => [kind, counts[kind] ?? 0]),
  );
}

/** A map run of Ala that ended in a death by cold at game minute 312, its resurrection used. */
const DIED = withRun(RUNNING, {
  minute: 312,
  death: { minute: 312, cause: "cold" },
  deathSettlement: { kind: "resurrectionUsed" },
  longestStreak: 116,
});

/** A map run of Ala that ended in the completion of Las at game minute 480. */
const SOLVED = withRun(RUNNING, {
  minute: 480,
  streak: 480,
  longestStreak: 480,
  completion: { minute: 480 },
  deposited: [{ item: "stick", count: 3 }],
});

/** Five tiles revealed of the sixteen, so that the trip rows have a known count. */
const FIVE_REVEALED = RUNNING.run.tiles.map((tile, index) => ({
  ...tile,
  revealed: index < 5,
}));

const WOLF = {
  creatureId: "wolf",
  attackMinute: 300,
  resolveMinute: 305,
  result: null,
};
const WOLF_PARAGRAPH =
  "Napada wilk (24/24). Wilk: Zdrowie poniżej 8 → Odskocz; Zawsze → Uderz.";

const LAST_MINUTES = [
  { kind: "action", minute: 309, text: "Zbierz — Patyk", role: "text" },
  { kind: "world", minute: 310, text: "Ognisko wygasło", role: "text" },
  { kind: "streak", minute: 311, text: "Passa utracona", role: "danger" },
  { kind: "world", minute: 312, text: "Mag zamarzł", role: "text" },
];

const DISCOVERED = {
  trees: [],
  actions: ["explore"],
  conditions: [],
  items: [],
  creatures: [],
};

/** The controls of the window, each noting in `asked` what it was asked for. */
function controlsNoting(asked) {
  return {
    close: () => asked.push(["close"]),
    restart: () => asked.push(["restart"]),
    end: () => asked.push(["end"]),
    openMap: (mapId) => asked.push(["openMap", mapId]),
    addRule: () => asked.push(["addRule"]),
  };
}

/**
 * Draws the window in a root of its own; `show(state, lastMinutes)` draws it anew, as the screen does
 * at a change, and `asked` collects what the controls were asked for.
 */
async function draw(document, state, lastMinutes = []) {
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);
  const asked = [];
  const controls = controlsNoting(asked);
  const show = (next, entries = lastMinutes) =>
    inAct(() =>
      root.render(
        createElement(EndWindow, {
          state: next,
          lastMinutes: entries,
          controls,
        }),
      ),
    );
  await show(state);
  return { container, asked, show };
}

const windowOf = (container) => container.querySelector(".end-window");
const bodyOf = (container) => container.querySelector(".end-window-body");
const buttonsOf = (container) => container.querySelector(".end-window-buttons");
const labels = (parent) =>
  [...parent.querySelectorAll("button")].map((b) => b.textContent);
const buttonNamed = (container, name) => {
  const found = [...container.querySelectorAll("button")].find(
    (button) => button.textContent === name,
  );
  assert.ok(found, `the button ${name} stands`);
  return found;
};
const click = (element) =>
  inAct(() => {
    element.click();
  });
/** What each section of the middle part opens with: its name, or the words of a section with none. */
const sectionHeads = (container) =>
  [...container.querySelectorAll(".end-window-section")].map(
    (section) =>
      section.querySelector(".end-window-section-name")?.textContent ??
      `(no name) ${section.textContent}`,
  );

// Catches a title in the wrong words or role, a dialog that no title names, and a top that lacks the
// label „Koniec przejścia” or the „✕” named „Zamknij okno” (D-132, D-334, task To do 4).
test("the window is a dialog named by its title, with the label „Koniec przejścia” above it and „✕” after it; the title is the cause after a death and the map's sentence in positive after a completion", async () => {
  await withPage(async ({ document }) => {
    const { container, show } = await draw(document, DIED);
    const root = windowOf(container);
    assert.equal(root.tagName, "SECTION");
    assert.equal(root.getAttribute("role"), "dialog");
    const title = container.querySelector(".end-window-title");
    assert.equal(title.textContent, "Mag zamarzł");
    assert.equal(
      title.classList.contains("positive"),
      false,
      "a death's title keeps the heading role",
    );
    assert.equal(
      root.getAttribute("aria-labelledby"),
      title.getAttribute("id"),
      "the title names the dialog",
    );
    const top = container.querySelector(".end-window-top");
    assert.deepEqual(
      [...top.children].map((child) => child.textContent),
      ["Koniec przejścia", "Mag zamarzł", "✕"],
    );
    assert.equal(
      buttonNamed(container, "✕").getAttribute("aria-label"),
      "Zamknij okno",
    );
    await show(SOLVED);
    const solved = container.querySelector(".end-window-title");
    assert.equal(solved.textContent, "Las rozwiązany");
    assert.equal(solved.classList.contains("positive"), true);
    assert.equal(
      windowOf(container).getAttribute("aria-labelledby"),
      solved.getAttribute("id"),
    );
    assert.equal(
      windowOf(container).getAttribute("aria-modal"),
      null,
      "the window traps nothing: the menu bar above it stays reachable",
    );
  });
});

// Catches a state that draws the window before the map run ends, or without a map run at all (task
// To do 1).
test("nothing is drawn for a state without an ended map run", async () => {
  await withPage(async ({ document }) => {
    const running = await draw(document, RUNNING);
    assert.equal(running.container.children.length, 0, "a running map run");
    const none = await draw(document, { ...RUNNING, run: null });
    assert.equal(none.container.children.length, 0, "no map run");
    await running.show(DIED);
    assert.ok(windowOf(running.container), "the window stands once it ended");
    await running.show(RUNNING);
    assert.equal(running.container.children.length, 0, "and goes with it");
  });
});

// Catches a middle part in another order than what happened, what it cost, why; a streak drawn as
// anything but the bar of the header's requirement; a discovery that keeps „Wznów”; a sentence in
// the wrong role (D-135, D-185, D-216, D-122, D-39).
test("the scrolling part opens with the longest streak as the bar of the header's requirement, then the discovery with „Dodaj regułę z tym” and no „Wznów”, then the cost line", async () => {
  await withPage(async ({ document }) => {
    const state = { ...DIED, discovery: DISCOVERED };
    const { container } = await draw(document, state);
    const body = bodyOf(container);
    const streak = body.querySelector(".run-header-requirement");
    assert.equal(
      streak.querySelector(".run-header-requirement-text").textContent,
      "najdłuższa passa 116/480",
    );
    assert.equal(streak.classList.contains("positive"), false);
    assert.equal(
      streak
        .querySelector(".run-header-requirement-fill")
        .style.getPropertyValue("--share"),
      String(116 / 480),
    );
    const discovery = body.querySelector(".end-window-discovery");
    assert.equal(
      discovery.querySelector(".end-window-discovery-text").textContent,
      "Odkryto: Eksploruj.",
    );
    assert.deepEqual(labels(discovery), ["Dodaj regułę z tym"]);
    const cost = body.querySelector(".end-window-cost");
    assert.equal(
      cost.textContent,
      "Wskrzeszenie zużyte: wprawa z tego przejścia przepada, wcześniejsza i wykupione stopnie zostają. Następne wskrzeszenie po 8 godzinach czasu realnego.",
    );
    assert.equal(cost.classList.contains("danger"), false);
    const order = [streak, discovery, cost].map((element) =>
      [...body.querySelectorAll("*")].indexOf(element),
    );
    assert.deepEqual(
      order,
      [...order].sort((a, b) => a - b),
      "streak, discovery, cost, in this order",
    );
    assert.equal(
      body.querySelectorAll(".discovery-band").length,
      0,
      "the window draws no band of the screen",
    );
  });
});

test("a streak that meets the map's condition is drawn in positive, a cost that is a loss in danger, and a discovery whose rule cannot be built has its button disabled", async () => {
  await withPage(async ({ document }) => {
    const { container, show } = await draw(document, SOLVED);
    assert.equal(
      container
        .querySelector(".run-header-requirement")
        .classList.contains("positive"),
      true,
    );
    assert.equal(
      container.querySelector(".end-window-cost").textContent,
      "Do skrzynki: patyk 3.",
    );
    assert.equal(
      container.querySelector(".end-window-discovery"),
      null,
      "no discovery, no band",
    );
    const lost = withRun(DIED, {
      deathSettlement: { kind: "progressLost", generation: 3 },
    });
    await show(lost);
    const cost = container.querySelector(".end-window-cost");
    assert.equal(
      cost.textContent,
      "Wskrzeszenie nie było gotowe: postać straciła całą wprawę i wykupione stopnie. Teraz to pokolenie 3.",
    );
    assert.equal(cost.classList.contains("danger"), true);
    const noGroups = {
      ...lost,
      discovery: DISCOVERED,
      run: {
        ...lost.run,
        copy: {
          ...lost.run.copy,
          program: { ...lost.run.copy.program, groups: [] },
        },
      },
    };
    await show(noGroups);
    assert.equal(buttonNamed(container, "Dodaj regułę z tym").disabled, true);
    await show({ ...lost, discovery: DISCOVERED });
    assert.equal(buttonNamed(container, "Dodaj regułę z tym").disabled, false);
  });
});

// Catches a section that stands with no content, a section out of its order, a name in another role
// and the paragraph of the last encounter standing among the last minutes (D-368, task To do 7).
test("after a death the sections of „why” stand in order: the last minutes, the paragraph of the last encounter, the rules that never fired, the time, the trip", async () => {
  await withPage(async ({ document }) => {
    const state = {
      ...sent([
        rule({ kind: "explore" }),
        rule({ kind: "wander" }),
        rule({ kind: "explore" }),
      ]),
      ruleCounts: { 1: 3 },
    };
    const died = withRun(state, {
      minute: 312,
      death: { minute: 312, cause: "cold" },
      deathSettlement: { kind: "resurrectionUsed" },
      lastCombat: WOLF,
      tiles: FIVE_REVEALED,
      enteredWith: [{ item: "stick", count: 3 }],
      minutesByAction: minutes({ gather: 30, wait: 15, walkTo: 5 }),
    });
    const { container } = await draw(document, died, LAST_MINUTES);
    assert.deepEqual(sectionHeads(container), [
      "Ostatnie minuty",
      `(no name) ${WOLF_PARAGRAPH}`,
      "Nie zadziałały ani razu",
      "Na co poszedł czas",
      "Wyprawa i teren",
    ]);
    const names = container.querySelectorAll(".end-window-section-name");
    assert.equal(names.length, 4);
    // The rows of „Ostatnie minuty”: the minute alone and the text in the role of its kind, as the
    // chronicle draws them, in the order the screen gave them.
    const rows = [...container.querySelectorAll(".chronicle-row")].map(
      (row) => [
        row.querySelector(".chronicle-minute").textContent,
        row.querySelector(".chronicle-text").textContent,
        row.querySelector(".chronicle-text").classList.contains("danger"),
      ],
    );
    assert.deepEqual(rows, [
      ["309", "Zbierz — Patyk", false],
      ["310", "Ognisko wygasło", false],
      ["311", "Passa utracona", true],
      ["312", "Mag zamarzł", false],
    ]);
    // The rules that never fired: rule 1 fired three times, rules 2 and 3 never.
    const unfired = [...container.querySelectorAll(".end-window-rule")].map(
      (row) => row.textContent,
    );
    assert.deepEqual(unfired, ["1.2Zawsze → Wędruj", "1.3Zawsze → Eksploruj"]);
    // The time: 30, 15 and 5 of 50 minutes are 60 %, 30 % and 10 %, the largest piece first.
    const pieces = container.querySelectorAll(".end-window-time-piece");
    assert.equal(pieces.length, 3);
    const legend = [...container.querySelectorAll(".end-window-time-item")].map(
      (item) => [
        item.querySelector(".end-window-time-name").textContent,
        item.querySelector(".end-window-time-percent").textContent,
      ],
    );
    assert.deepEqual(legend, [
      ["Zbierz", "60%"],
      ["Czeka", "30%"],
      ["W drodze", "10%"],
    ]);
    // The trip and the terrain.
    const trip = [...container.querySelectorAll(".end-window-trip-row")].map(
      (row) => row.textContent,
    );
    assert.deepEqual(trip, [
      "weszła z patyk 3",
      "odsłonięto 5 z 16 kafelków",
      "w drodze 5 min",
    ]);
  });
});

// Catches the paragraph standing twice, among the last minutes too, or shown for a map run that had
// no attack (D-147, task To do 7 and question 8).
test("the paragraph of the last encounter stands once, in its own section, and never in the last minutes; without an attack there is none", async () => {
  await withPage(async ({ document }) => {
    const fought = withRun(DIED, { lastCombat: WOLF });
    const { container, show } = await draw(document, fought, LAST_MINUTES);
    const sections = [...container.querySelectorAll(".end-window-section")];
    const holding = sections.filter((section) =>
      section.textContent.includes(WOLF_PARAGRAPH),
    );
    assert.equal(holding.length, 1, "one section holds the paragraph");
    assert.equal(
      holding[0].querySelector(".end-window-section-name"),
      null,
      "and it is no section with a name of the last minutes",
    );
    assert.equal(
      container.textContent.split(WOLF_PARAGRAPH).length - 1,
      1,
      "the words stand once in the whole window",
    );
    const lastMinutes = sections.find(
      (section) =>
        section.querySelector(".end-window-section-name")?.textContent ===
        "Ostatnie minuty",
    );
    assert.equal(
      lastMinutes.textContent.includes("Napada"),
      false,
      "the last minutes carry no entry of the attack",
    );
    await show(DIED, LAST_MINUTES);
    assert.equal(
      container.textContent.includes("Napada"),
      false,
      "no attack, no paragraph",
    );
  });
});

// Catches a section drawn for nothing: after a completion no last minutes, no rule that never fired
// where every rule fired, no bar where no minute was counted (task To do 7: each only where it has
// content). The trip rows always have content.
test("a section stands only where it has content", async () => {
  await withPage(async ({ document }) => {
    const { container, show } = await draw(document, SOLVED);
    assert.deepEqual(sectionHeads(container), ["Wyprawa i teren"]);
    await show({ ...SOLVED, ruleCounts: {}, discovery: null }, []);
    assert.deepEqual(sectionHeads(container), ["Wyprawa i teren"]);
    const program = setProgram(
      newKnowingGame(),
      programFromRules(rule({ kind: "explore" })),
    ).state;
    const ruled = withRun(
      send(
        createCharacter(program, "Ala").state,
        { mapId: "forest", characterId: 1 },
        REAL_MS,
      ).state,
      { minute: 480, completion: { minute: 480 }, deposited: [] },
    );
    await show({ ...ruled, ruleCounts: { 1: 2 } });
    assert.equal(
      container.querySelector(".end-window-rule"),
      null,
      "every rule fired",
    );
    assert.equal(
      sectionHeads(container).includes("Nie zadziałały ani razu"),
      false,
    );
    await show({ ...ruled, ruleCounts: { 1: 0 } });
    assert.equal(
      sectionHeads(container).includes("Nie zadziałały ani razu"),
      true,
      "a rule with a count of 0 is one that never fired",
    );
    assert.equal(
      sectionHeads(container).includes("Na co poszedł czas"),
      false,
      "no minute was counted, no bar",
    );
    await show(withRun(ruled, { minutesByAction: minutes({ gather: 3 }) }));
    assert.equal(sectionHeads(container).includes("Na co poszedł czas"), true);
  });
});

// Catches the last minutes shown after a completion, which D-368 gives only after a death, and none
// shown when the screen gave some after a death.
test("the last minutes come from the entries the screen gives and stand only with them", async () => {
  await withPage(async ({ document }) => {
    const { container, show } = await draw(document, DIED, []);
    assert.equal(
      sectionHeads(container).includes("Ostatnie minuty"),
      false,
      "none given, none drawn",
    );
    await show(DIED, LAST_MINUTES);
    assert.equal(sectionHeads(container)[0], "Ostatnie minuty");
    await show(SOLVED, LAST_MINUTES);
    assert.equal(
      sectionHeads(container).includes("Ostatnie minuty"),
      false,
      "after a completion there are none, whatever entries are given (D-368)",
    );
  });
});

// Catches buttons in the scrolling part, a button of the wrong kind or in the wrong order, a
// missing „Otwarte: …” after a completion of Las and one after a death or a completion of the map
// it opens (D-44, D-132, D-188, task To do 8).
test("the buttons stand after the scrolling part, outside it: „Restart” and „Zakończ” as shared destructive buttons, and „Otwarte: …” plain, only after a completion that opens a map", async () => {
  await withPage(async ({ document }) => {
    const { container, show } = await draw(
      document,
      { ...DIED, discovery: DISCOVERED },
      LAST_MINUTES,
    );
    const root = windowOf(container);
    assert.deepEqual(
      [...root.children].map((child) => child.className),
      ["end-window-top", "end-window-body", "end-window-buttons"],
      "a column: top, scrolling part, buttons",
    );
    assert.deepEqual(labels(buttonsOf(container)), ["Restart", "Zakończ"]);
    assert.equal(
      bodyOf(container).getAttribute("tabindex"),
      "0",
      "the keyboard reaches the scrolling part, which scrolls with no control in it too",
    );
    assert.deepEqual(
      labels(bodyOf(container)),
      ["Dodaj regułę z tym"],
      "the scrolling part holds no button of the way on",
    );
    const kinds = (name) => buttonNamed(container, name).className;
    assert.equal(kinds("Restart"), "button destructive");
    assert.equal(kinds("Zakończ"), "button destructive");
    await show(SOLVED);
    assert.deepEqual(labels(buttonsOf(container)), [
      "Restart",
      "Zakończ",
      "Otwarte: Las — głębiej →",
    ]);
    assert.equal(kinds("Otwarte: Las — głębiej →"), "button");
    const deep = withRun(SOLVED, { mapId: "forestDeep" });
    await show(deep);
    assert.deepEqual(labels(buttonsOf(container)), ["Restart", "Zakończ"]);
  });
});

// Catches the warning of a cut trip plan missing from the window, standing away from „Restart” or
// following the saved program instead of the copy's take list (D-188).
test("the warning of a cut trip plan stands between „Restart” and „Zakończ”, from the copy's take list", async () => {
  await withPage(async ({ document }) => {
    const map = MAPS.forest;
    MAPS.forest = { ...map, carryIn: 2 };
    try {
      const { container, show } = await draw(document, DIED);
      assert.equal(container.querySelector(".trip-warning"), null);
      const cut = setProgram(DIED, {
        ...DIED.run.copy.program,
        tripPlan: { take: [{ item: "berry", count: 3 }], bring: [] },
      }).state;
      await show(cut);
      const warning = container.querySelector(".trip-warning");
      assert.equal(
        warning.textContent,
        "Plan wyprawy wejdzie przycięty: mapa wpuszcza najwyżej 2 sztuk.",
      );
      const names = [...buttonsOf(container).children].map(
        (child) => child.textContent,
      );
      assert.deepEqual(names, [
        "Restart",
        "Plan wyprawy wejdzie przycięty: mapa wpuszcza najwyżej 2 sztuk.",
        "Zakończ",
      ]);
      await show(DIED);
      assert.equal(container.querySelector(".trip-warning"), null);
    } finally {
      MAPS.forest = map;
    }
  });
});

// Catches a button that asks for the wrong act, for two, or for none, and „Otwarte: …” that does
// not name its map (task To do 2, 8, 9).
test("„✕”, „Restart”, „Zakończ”, „Otwarte: …” and „Dodaj regułę z tym” ask for their own control and nothing else", async () => {
  await withPage(async ({ document }) => {
    const { container, asked, show } = await draw(document, SOLVED);
    for (const [name, expected] of [
      ["✕", ["close"]],
      ["Restart", ["restart"]],
      ["Zakończ", ["end"]],
      ["Otwarte: Las — głębiej →", ["openMap", "forestDeep"]],
    ]) {
      asked.length = 0;
      await click(buttonNamed(container, name));
      assert.deepEqual(asked, [expected], name);
    }
    await show({ ...SOLVED, discovery: DISCOVERED });
    asked.length = 0;
    await click(buttonNamed(container, "Dodaj regułę z tym"));
    assert.deepEqual(asked, [["addRule"]]);
  });
});

// Catches Escape not closing the window from a control inside it, from the window itself, a key
// other than Escape closing it, and Escape read on the document, where it would meet the menu
// „Konto” and the rule panel (task To do 2; the rule panel does the same, D-285).
test("Escape pressed inside the window asks to close it through the control; another key and Escape outside it do not", async () => {
  await withPage(async ({ document, window }) => {
    const { container, asked } = await draw(document, DIED);
    const press = (target, key) =>
      inAct(() => {
        target.dispatchEvent(
          new window.KeyboardEvent("keydown", { key, bubbles: true }),
        );
      });
    await press(buttonNamed(container, "Restart"), "Escape");
    assert.deepEqual(asked, [["close"]], "from a button inside");
    asked.length = 0;
    await press(windowOf(container), "Escape");
    assert.deepEqual(asked, [["close"]], "from the window itself");
    asked.length = 0;
    await press(buttonNamed(container, "Zakończ"), "Enter");
    await press(buttonNamed(container, "Zakończ"), "Tab");
    assert.deepEqual(asked, [], "no other key closes it");
    await press(document.body, "Escape");
    assert.deepEqual(asked, [], "Escape outside the window is not its own");
  });
});

// Catches a window that opens with the focus left behind it, one that takes the focus back at every
// draw while the player works inside it, and one that traps the focus (task To do 1; the menu bar
// above it must stay reachable).
test("when the window appears the focus moves to it, and a later draw leaves the focus where the player put it", async () => {
  await withPage(async ({ document }) => {
    const before = document.createElement("button");
    before.textContent = "Wcześniej";
    document.body.append(before);
    before.focus();
    assert.equal(document.activeElement, before, "precondition");
    const { container, show } = await draw(document, RUNNING);
    assert.equal(
      document.activeElement,
      before,
      "nothing drawn, no focus taken",
    );
    await show(DIED);
    const root = windowOf(container);
    assert.equal(root.getAttribute("tabindex"), "-1");
    assert.equal(document.activeElement, root, "the focus is on the window");
    const restart = buttonNamed(container, "Restart");
    restart.focus();
    await show({ ...DIED, discovery: DISCOVERED }, LAST_MINUTES);
    assert.equal(
      document.activeElement,
      restart,
      "a later draw takes no focus back",
    );
    before.focus();
    assert.equal(
      document.activeElement,
      before,
      "the focus leaves the window freely",
    );
  });
});
