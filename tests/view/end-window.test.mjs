// The end-of-run window in React (D-368, D-370, D-132, D-133,
// D-135, D-185, D-216, D-122, D-147, D-188, D-313, D-44, D-39) on jsdom through
// tests/view/page-document.mjs (D-264): the title after a death and after a completion in its
// role, the sections only where they have content and in their order, the paragraph of the last
// encounter once and in a section of its own, the shared buttons in their order with „Otwarte: …”
// only after a completion that opens a map, what each control is asked for, Escape and the focus
// when the window appears, and nothing drawn without an ended map run. The scrolling, the stay of
// the buttons at the bottom and the look are checked in the browser (D-88), which jsdom cannot show.
// Every comparison is of plain data or of a handful of words (D-268); every text is written out
// from the decisions, not computed by the code under test (D-73).
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
import {
  newKnowingGame,
  withEdgeSolved,
} from "../sim/understanding-fixture.mjs";

const REAL_MS = 1760000000000;
const ALWAYS = { kind: "always" };
const rule = (action) => ({ condition: ALWAYS, action });

/** A game with a map run of the map given, sent under the rules given. */
function sent(rules, mapId = "forest") {
  const program = setProgram(
    withEdgeSolved(newKnowingGame()),
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
  deathSettlement: { kind: "resurrectionUsed", usesSpent: 1 },
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
  "Napada wilk (24/24). Wilk: Zdrowie poniżej 8 pkt → Odskocz; Zawsze → Uderz.";

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
// label „Koniec przejścia” or the „✕” named „Zamknij okno” (D-368, D-132, D-334).
test("the window is a dialog named by its title, with the label „Koniec przejścia” above it and „✕” after it; the title is the cause after a death and the map's sentence in positive after a completion", async () => {
  // decision: D-132 "After a completion the screen stays on the state of the game minute of the completion and time stands still for that map run, and „Teraz” reads the map's completion text, in Las „Las rozwiązany” and in Las — głębiej „Las — głębiej rozwiązany”, in the role `positive`, the clock in the header standing at that game minute, such as „Minuta 480”, and the end-of-run window (D-368) opens of itself over the screen, its header included and the menu bar not, under the same completion text as its title, in the role `positive`"
  // decision: D-368 "When a manual map run ends in a character's death or a completion, the end-of-run window opens of itself over the screen of the map run"
  // decision: D-370 "The window takes the focus when it opens"
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

// Catches a state that draws the window before the map run ends, or without a map run at all (D-368).
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
  // decision: D-122 "Where the map run ends in a completion or a character's death in the game minute of a discovery, the end-of-run window (D-368) takes the place of the pause and names that discovery in its part about what happened, with the text of the band in the role `discovery` and with „Dodaj regułę z tym”, until „Restart” or „Zakończ”, and the band does not stand"
  // decision: D-135 "A manual map run keeps the longest streak it reached, and the end-of-run window (D-368) shows it against the map's condition, as „najdłuższa passa {longest}/{required}” with its bar in the form of the bar of the solving condition in the header (D-133)"
  // decision: D-216 "After a character's death, in the section of the end-of-run window (D-368) saying what it cost, until „Restart” or „Zakończ” and after a load too, a line stands: „Zużyte jedno użycie wskrzeszenia drużyny: wprawa z tego przejścia przepada, wcześniejsza i wykupione stopnie zostają. Po tej śmierci zostały użycia {u} z {c}; zużyte wracają po kolei, jedno {r} czasu realnego, a jedno od razu przy pierwszym rozwiązaniu nowej mapy.”"
  // decision: D-311 "After a character's death or a completion that window (D-368) stands in place of this screen"
  // decision: D-368 "When a manual map run ends in a character's death or a completion, the end-of-run window opens of itself over the screen of the map run"
  // decision: D-313 "The same button stands in the end-of-run window"
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
      "Zużyte jedno użycie wskrzeszenia drużyny: wprawa z tego przejścia przepada, wcześniejsza i wykupione stopnie zostają. Po tej śmierci zostały użycia 2 z 3; zużyte wracają po kolei, jedno co 4 godziny czasu realnego, a jedno od razu przy pierwszym rozwiązaniu nowej mapy.",
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
  // decision: D-135 "A manual map run keeps the longest streak it reached, and the end-of-run window (D-368) shows it against the map's condition, as „najdłuższa passa {longest}/{required}” with its bar in the form of the bar of the solving condition in the header (D-133)"
  // decision: D-185 "After completion the line „Do skrzynki: {item} {count}, ….” or „Do skrzynki nic nie trafiło.” in `text-secondary` stands in the section of the end-of-run window (D-368) saying what the end gave, until „Restart” or „Zakończ”"
  // decision: D-216 "After a character's death, in the section of the end-of-run window (D-368) saying what it cost, until „Restart” or „Zakończ” and after a load too, a line stands: „Zużyte jedno użycie wskrzeszenia drużyny: wprawa z tego przejścia przepada, wcześniejsza i wykupione stopnie zostają. Po tej śmierci zostały użycia {u} z {c}; zużyte wracają po kolei, jedno {r} czasu realnego, a jedno od razu przy pierwszym rozwiązaniu nowej mapy.”"
  // decision: D-313 "Where the copy holds no rule group, the button is disabled"
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
      "Wskrzeszenie drużyny nie miało żadnego użycia: postać straciła całą wprawę i wykupione stopnie. Teraz to pokolenie 3.",
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

// Catches a death of a character with no practice shown as a resurrection used or a loss, and the
// renewal line of a first completion missing, in the wrong role, before the deposit line, or standing
// where the stock of uses was found full (D-216, D-185, D-190, D-39).
test("the window shows the line of a death with no practice, and the renewal line after the deposit line of a first completion that renewed", async () => {
  // decision: D-185 "After completion the line „Do skrzynki: {item} {count}, ….” or „Do skrzynki nic nie trafiło.” in `text-secondary` stands in the section of the end-of-run window (D-368) saying what the end gave, until „Restart” or „Zakończ”"
  // decision: D-216 "After a character's death, in the section of the end-of-run window (D-368) saying what it cost, until „Restart” or „Zakończ” and after a load too, a line stands: „Zużyte jedno użycie wskrzeszenia drużyny: wprawa z tego przejścia przepada, wcześniejsza i wykupione stopnie zostają. Po tej śmierci zostały użycia {u} z {c}; zużyte wracają po kolei, jedno {r} czasu realnego, a jedno od razu przy pierwszym rozwiązaniu nowej mapy.”"
  // decision: D-216 "After the first completion of a map that returned a use of the resurrection, in the section saying what the end gave, below the line of D-185, until „Restart” or „Zakończ” and after a load too, the line „Wróciło jedno użycie wskrzeszenia drużyny: pierwsze rozwiązanie tej mapy.” stands in `text-secondary`; a completion that finds the stock of uses full shows none."
  await withPage(async ({ document }) => {
    const bare = withRun(DIED, { deathSettlement: { kind: "noPractice" } });
    const { container, show } = await draw(document, bare);
    const cost = container.querySelector(".end-window-cost");
    assert.equal(
      cost.textContent,
      "Postać nie miała jeszcze wprawy, więc śmierć nie zabrała drużynie żadnego użycia wskrzeszenia.",
    );
    assert.equal(cost.classList.contains("danger"), false);
    assert.equal(container.querySelectorAll(".end-window-cost").length, 1);

    const renewed = withRun(SOLVED, {
      completionSettlement: { kind: "resurrectionRenewed" },
    });
    await show(renewed);
    const lines = [...container.querySelectorAll(".end-window-cost")];
    assert.deepEqual(
      lines.map((line) => line.textContent),
      [
        "Do skrzynki: patyk 3.",
        "Wróciło jedno użycie wskrzeszenia drużyny: pierwsze rozwiązanie tej mapy.",
      ],
    );
    assert.equal(lines[1].classList.contains("danger"), false);

    for (const completionSettlement of [{ kind: "resurrectionReady" }, null]) {
      await show(withRun(SOLVED, { completionSettlement }));
      assert.deepEqual(
        [...container.querySelectorAll(".end-window-cost")].map(
          (line) => line.textContent,
        ),
        ["Do skrzynki: patyk 3."],
      );
    }
  });
});

// Catches a section that stands with no content, a section out of its order, a name in another role
// and the paragraph of the last encounter standing among the last minutes (D-368).
test("after a death the sections of „why” stand in order: the last minutes, the paragraph of the last encounter, the rules that never fired, the time, the trip", async () => {
  // decision: D-147 "At the end of the map run the same paragraph stands in the end-of-run window (D-368), in a section of its own outside „Ostatnie minuty”, and after a load of the saved game state too"
  // decision: D-368 "Each section of why stands only where it has content"
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
      deathSettlement: { kind: "resurrectionUsed", usesSpent: 1 },
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
// no attack (D-147, D-368).
test("the paragraph of the last encounter stands once, in its own section, and never in the last minutes; without an attack there is none", async () => {
  // decision: D-147 "At the end of the map run the same paragraph stands in the end-of-run window (D-368), in a section of its own outside „Ostatnie minuty”, and after a load of the saved game state too"
  // decision: D-368 "Each section of why stands only where it has content"
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
// where every rule fired, no bar where no minute was counted (D-368: each section only where it has
// content). The trip rows always have content.
test("a section stands only where it has content", async () => {
  // decision: D-368 "Each section of why stands only where it has content"
  await withPage(async ({ document }) => {
    const { container, show } = await draw(document, SOLVED);
    assert.deepEqual(sectionHeads(container), ["Wyprawa i teren"]);
    await show({ ...SOLVED, ruleCounts: {}, discovery: null }, []);
    assert.deepEqual(sectionHeads(container), ["Wyprawa i teren"]);
    const program = setProgram(
      withEdgeSolved(newKnowingGame()),
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
  // decision: D-368 "Each section of why stands only where it has content"
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
// it opens (D-368, D-44, D-132, D-188).
test("the buttons stand after the scrolling part, outside it: „Restart” and „Zakończ” as shared destructive buttons, and „Otwarte: …” plain, only after a completion that opens a map", async () => {
  // decision: D-44 "The screens of the browser view build every button, select list, number field, text field and cell of a pick from the shared controls of `src/browser/view/controls/` — the button in its kinds (the plain button, the destructive button, the button selected in its group, the secondary action (D-275), the tab (D-276), the main look outside a form (D-274) and the button in `positive`), the select list, the number field, the text field and the pick cell — and the buttons „Zakończ”, „Usuń”, „Restart”, „Porzuć zmiany”, „Przełącz postać na ten program”, „Zatrzymaj” and „Zacznij od zera” (D-402), and „Odrzuć” of the question „Zapisać, odrzucić, wrócić?” (D-173), are destructive buttons"
  // decision: D-132 "„Pauza” and the pace buttons are gone, and the player has „Restart” and „Zakończ” as after a character's death, and, after a completion of a map that opens another, „Otwarte: {mapa} →” in the window, the way to the map it opened (D-53, D-173)"
  // decision: D-368 "The window scrolls in itself while its buttons"
  // decision: D-370 "While the end-of-run window (D-368) stands, the header and the three areas of the screen of a map run are not shown"
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
  // decision: D-18 "The game's content — game maps, items, creatures, character skills and their numbers — stands in data files"
  // decision: D-179 "The backpack is the cap on both sides, a map may add a stricter cap of its own down to zero, and a trip plan over the map's cap does not keep the character from entering the map: it goes in cut, and the player is told so beforehand"
  // decision: D-188 "The same line stands on the screen of a map run beside „Restart” for the current copy and map; when carrying capacity itself clips the plan and the map does not, this line is absent"
  // decision: D-368 "The window scrolls in itself while its buttons"
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
// not name its map (D-368, D-313).
test("„✕”, „Restart”, „Zakończ”, „Otwarte: …” and „Dodaj regułę z tym” ask for their own control and nothing else", async () => {
  // decision: D-132 "„Pauza” and the pace buttons are gone, and the player has „Restart” and „Zakończ” as after a character's death, and, after a completion of a map that opens another, „Otwarte: {mapa} →” in the window, the way to the map it opened (D-53, D-173)"
  // decision: D-368 "The window scrolls in itself while its buttons"
  // decision: D-313 "The same button stands in the end-of-run window"
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
// „Konto” and the rule panel (D-370, D-285).
test("Escape pressed inside the window asks to close it through the control; another key and Escape outside it do not", async () => {
  // decision: D-368 "The window scrolls in itself while its buttons"
  // decision: D-370 "The window takes the focus when it opens"
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
// draw while the player works inside it, and one that traps the focus (D-370: the menu bar above it
// must stay reachable).
test("when the window appears the focus moves to it, and a later draw leaves the focus where the player put it", async () => {
  // decision: D-370 "The window takes the focus when it opens"
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
