// The screen of a map run in React (D-311, D-281, D-282, D-19, D-122, D-313) on jsdom through
// tests/view/page-document.mjs (D-264): the header over three areas — the world, the program with
// the band of a discovery above the program panel, and third the area under the drawing with the
// tabs „Kronika” and „Teren” and the chronicle or the table of revealed tiles (D-346) — drawn from
// the map run the screen is given, and the one hovered tile the screen holds for the drawing, its
// line and the table. A rule panel opens in the program, under its row. The
// screen is built here as the game view builds it, with a program panel of its own, a real state of
// the screen Przejście that the screen and the panel read the question and the window from, and controls
// that make the real simulation calls. Real events, focus and the look are checked in the browser
// (D-88). Every comparison is of plain data or of a handful of words (D-268).
import { assert, fire, inAct, press, withPage } from "./page-document.mjs";
import { test } from "node:test";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import {
  advanceMinutes,
  createCharacter,
  end,
  newGame,
  restart,
  send,
  setPace,
  setPaused,
  setProgram,
} from "../../dist/browser/sim/game.js";
import { createProgram } from "../../dist/browser/sim/programs.js";
import { programFromRules } from "../sim/program-fixture.mjs";
import {
  newKnowingGame,
  withEdgeSolved,
} from "../sim/understanding-fixture.mjs";
import { createChronicle } from "../../dist/browser/view/chronicle.js";
import { createProgramPanel } from "../../dist/browser/view/program-panel.js";
import { createRunScreen } from "../../dist/browser/view/run-screen.js";
import { createRunScreenState } from "../../dist/browser/view/run-screen-state.js";

const SENT = { mapId: "forest", characterId: 1 };
const REAL_MS = 1760000000000;
const ALWAYS_EXPLORE = {
  condition: { kind: "always" },
  action: { kind: "explore" },
};
const ALWAYS_WANDER = {
  condition: { kind: "always" },
  action: { kind: "wander" },
};

const all = (root) => [root, ...root.querySelectorAll("*")];
const byClass = (root, name) =>
  all(root).filter((element) => element.classList.contains(name));

/** Whether an element and every ancestor up to the page's body are shown. */
function shown(element) {
  for (let node = element; node; node = node.parentElement) {
    if (node.hidden) return false;
    if (node === element.ownerDocument.body) return true;
  }
  return false;
}

function buttonNamed(root, text) {
  return all(root).find(
    (element) => element.localName === "button" && element.textContent === text,
  );
}

function buttonLabelled(root, label) {
  return all(root).find(
    (element) =>
      element.localName === "button" &&
      element.getAttribute("aria-label") === label,
  );
}

/**
 * The screen as the game view builds it: a program panel of the screen of a map run and the
 * controls of the header, each a real simulation call whose result the screen is given with the
 * map run it holds, and the state of the screen Przejście over the game of the case, which the
 * screen and the panel read the question and the window from. `acts` records what was asked.
 */
async function wiredScreen({ root }, start) {
  const game = {
    acts: [],
    state: start,
    chronicle: createChronicle(start),
    apply(result) {
      game.chronicle.record(result, game.state);
      game.state = result.state;
      if (game.state.run !== null)
        game.screen.update(game.state, game.state.run, result.events);
    },
  };
  game.screenState = createRunScreenState({
    game: { get: () => game.state, halted: () => false },
    reducedMotion: () => false,
  });
  const unused = (name) => () => game.acts.push(name);
  const controls = {
    togglePause() {
      game.acts.push("togglePause");
      game.apply(setPaused(game.state, !game.state.paused));
    },
    setPace(pace) {
      game.acts.push("setPace");
      game.apply(setPace(game.state, pace));
    },
    restart() {
      game.acts.push("restart");
      game.apply(restart(game.state));
    },
    end() {
      game.acts.push("end");
      game.apply(end(game.state));
    },
    saveAndEnd: unused("saveAndEnd"),
    discardAndEnd: unused("discardAndEnd"),
    back: unused("back"),
    // The state of the screen keeps whether the window stands, and the screen reads it.
    openWindow() {
      game.acts.push("openWindow");
      game.screenState.openWindow();
    },
    closeWindow() {
      game.acts.push("closeWindow");
      game.screenState.closeWindow();
    },
    openMap(mapId) {
      game.acts.push(`openMap ${mapId}`);
    },
  };
  game.panel = createProgramPanel(
    {
      editCopy(program) {
        game.acts.push("editCopy");
        game.apply(setProgram(game.state, program));
      },
      editProgram: unused("editProgram"),
      createProgram: unused("createProgram"),
      renameProgram: unused("renameProgram"),
      deleteProgram: unused("deleteProgram"),
      saveCopy: unused("saveCopy"),
      saveCopyAsNew: unused("saveCopyAsNew"),
      discardCopy: unused("discardCopy"),
      switchProgram: unused("switchProgram"),
    },
    "run",
    undefined,
    { state: game.screenState, answers: controls },
  );
  // Inside act: the screen draws its first render as it is built.
  game.screen = await inAct(() =>
    createRunScreen(game.panel, controls, game.chronicle, game.screenState),
  );
  root.append(game.screen.element);
  await inAct(() => game.screen.update(game.state, game.state.run, []));
  return game;
}

/** The three areas under the header, in the order they stand; the case fails where there are not three. */
function areasOf(screen) {
  const areas = [...screen.querySelectorAll(".screen-area")].filter(
    (area) => area.parentElement?.closest(".screen-area") === null,
  );
  assert.equal(areas.length, 3, "three areas under the header");
  return areas;
}

/** The text of the first element of the class `name` under `root`, or undefined where none stands. */
const textOf = (root, name) => byClass(root, name)[0]?.textContent;

/** Ala's map run of Las under the copy of program 1, paused, with a second program on the list. */
const twoPrograms = () =>
  createProgram(createCharacter(withEdgeSolved(newGame()), "Ala").state).state;
const pausedRun = () =>
  setPaused(send(twoPrograms(), { ...SENT, programId: 1 }, 0).state, true)
    .state;

/** The game stopped at the first chill, game minute 84, where the game wrote its rule. */
function firstChill() {
  const sent = send(
    createCharacter(withEdgeSolved(newGame()), "Ala").state,
    SENT,
    REAL_MS,
  );
  const state = advanceMinutes(sent.state, 100).state;
  assert.equal(state.run.minute, 84, "precondition: the first chill");
  assert.deepEqual(
    state.discovery?.actions,
    ["wander"],
    "precondition: the first chill holds its discovery",
  );
  return state;
}

/** The map's resource ids in the map's order. */
const r = MAPS.forest.resources.map((resource) => resource.id);

function tile(col, row, revealed, stock) {
  return {
    col,
    row,
    at: { q: col - Math.floor(row / 2), r: row },
    revealed,
    stepMinutes: 5,
    stock,
  };
}

/** A paused map run holding three revealed tiles; the character stands on (1, 1). */
function withTiles() {
  const state = pausedRun();
  return {
    ...state,
    run: {
      ...state.run,
      tiles: [
        tile(1, 0, true, { [r[0]]: 12, [r[2]]: 6 }),
        tile(0, 1, true, {}),
        tile(1, 1, true, { [r[1]]: 0, [r[3]]: 6 }),
      ],
    },
  };
}

// D-311, D-282. Catches the header standing inside an area, two areas drawn as
// one block, the areas out of the order world, program, tabs, a part standing in another area: the
// drawing beside the program, the program panel or the table in the world, and a host for the rule
// panel standing in the screen, which the panel opening in the program no longer has.
test("the header stands above three areas of their own in the order world, program and tabs, holding the world, the program panel and the tabs with the chronicle, and no host for the rule panel", async () => {
  // decision: D-282 "Each column of a screen is an area of its own"
  // decision: D-311 "The screen of a map run has two columns under one header"
  // decision: D-311 "The header holds the character's name, the map's name, the clock"
  // decision: D-338 "The player filters it by these kinds in the area with the tabs under the world"
  await withPage(async (page) => {
    const { screen } = await wiredScreen(page, pausedRun());
    const element = screen.element;
    assert.deepEqual(
      [...element.children].map((child) =>
        child.classList.contains("run-header"),
      ),
      [true, false],
      "the header first, the areas after it",
    );
    const areas = areasOf(element);
    assert.ok(
      areas.every((area) => area.parentElement === areas[0].parentElement),
      "side by side, children of one grid",
    );
    assert.equal(
      byClass(element.children[0], "screen-area").length,
      0,
      "no area inside the header",
    );
    const holding = (name) =>
      areas.map((area) => byClass(area, name).length > 0);
    assert.deepEqual(holding("world-area"), [true, false, false]);
    assert.deepEqual(holding("terrain-drawing"), [true, false, false]);
    assert.deepEqual(holding("program-panel"), [false, true, false]);
    assert.deepEqual(holding("tabs"), [false, false, true]);
    assert.deepEqual(holding("chronicle"), [false, false, true]);
    assert.deepEqual(holding("tile-list"), [false, false, false]);
    // D-311: the clock stands in the header (class `run-header-clock`), in no area.
    assert.deepEqual(holding("run-header-clock"), [false, false, false]);
    assert.equal(
      byClass(element, "run-rule-host").length,
      0,
      "the rule panel has no host of its own",
    );
  });
});

// D-122. Catches the band standing in the world area, under the program panel, or
// outside the program's area.
test("at a discovery the band stands in the program's area, above the program panel", async () => {
  // decision: D-122 "A band in the role `discovery` above the program"
  await withPage(async (page) => {
    const { screen } = await wiredScreen(page, firstChill());
    const [world, program, tabs] = areasOf(screen.element);
    assert.equal(byClass(world, "discovery-band").length, 0);
    assert.equal(byClass(tabs, "discovery-band").length, 0);
    const band = byClass(program, "discovery-band")[0];
    const panel = byClass(program, "program-panel")[0];
    assert.ok(band && panel, "the program's area holds the band and the panel");
    assert.ok(
      band.compareDocumentPosition(panel) & band.DOCUMENT_POSITION_FOLLOWING,
      "the band above the panel",
    );
    assert.equal(panel.contains(band), false, "the band is not the panel's");
  });
});

// D-173. Catches the question standing before the state of the screen holds it, in the world or the
// area under the drawing, above the band of a discovery, outside the program panel or not directly
// above the heading of the copy, or kept after the state takes it away.
test("the question stands in the program panel, directly above the heading of the copy and under the band of a discovery, only while the state of the screen holds it", async () => {
  // decision: D-407 "The game state lives in a store outside React and the state of the screen Przejście, which is the question „Zapisać, odrzucić, wrócić?” and the end-of-run window, in a module of its own outside React"
  // decision: D-173 "„Zakończ” and „Otwarte: {mapa} →”, a button of the end-of-run window (D-368), with no unsaved changes of the copy end the map run at once, and with unsaved changes — „Zakończ” at any moment of a map run — they ask „Zapisać, odrzucić, wrócić?” in a band of the program panel just above the heading of the copy"
  await withPage(async (page) => {
    const game = await wiredScreen(page, firstChill());
    const { screen, screenState } = game;
    const [world, program, tabs] = areasOf(screen.element);
    assert.equal(byClass(screen.element, "end-question").length, 0);
    await inAct(() => screenState.ask(null));
    assert.equal(byClass(world, "end-question").length, 0);
    assert.equal(byClass(tabs, "end-question").length, 0);
    assert.deepEqual(
      [...program.children].map((child) => child.className),
      ["discovery-band", "run-program-place"],
      "the band of a discovery, then the program panel",
    );
    const panel = byClass(program, "program-panel")[0];
    const question = byClass(panel, "end-question")[0];
    assert.ok(question, "the question stands in the panel");
    assert.ok(
      question.nextElementSibling.classList.contains("copy-section"),
      "directly above the heading of the copy",
    );
    await inAct(() => screenState.ask(null));
    await inAct(() => screen.update(game.state, game.state.run, []));
    assert.equal(byClass(program, "end-question").length, 1, "shown once");
    await inAct(() => screenState.closeQuestion());
    assert.equal(byClass(screen.element, "end-question").length, 0);
  });
});

// D-281, D-166. Catches the screen, its program
// panel with the copy included, drawing the map run of the game state beside the one it was given.
test("the screen draws the map run it was given, the copy of that map run in its program panel, not the game state's", async () => {
  // decision: D-281 "The screen of a map run takes its map run as a parameter and reads no map run of the game state by itself"
  // decision: D-166 "On the screen of a map run the program panel shows the copy, and its select list holds „Kopia w przejściu” at its top and the player's saved programs below it"
  // decision: D-171 "During a map run the program panel shows the copy under the heading „Kopia: {program name}”"
  await withPage(async (page) => {
    // The game state holds Ala's map run on the copy of „Program” at game minute 0; the screen is
    // given her map run on the copy of „Program 2” at game minute 7, as a second map run would be.
    const state = pausedRun();
    const given = advanceMinutes(
      send(twoPrograms(), { ...SENT, programId: 2 }, 0).state,
      7,
    ).state.run;
    assert.equal(state.run.copy.programId, 1, "precondition: the state's copy");
    assert.equal(state.run.minute, 0, "precondition: the state's minute");
    assert.equal(given.copy.programId, 2, "precondition: the given copy");
    assert.equal(given.minute, 7, "precondition: the given minute");

    const { screen } = await wiredScreen(page, state);
    await inAct(() => screen.update(state, given, []));
    const element = screen.element;
    assert.equal(
      textOf(element, "copy-heading"),
      "Kopia: Program 2",
      "the panel shows the copy of the map run the screen was given",
    );
    const list = all(element).find(
      (found) =>
        found.localName === "select" &&
        found.getAttribute("aria-label") === "Program:",
    );
    assert.equal(list.value, "copy");
    // D-311, D-122: the clock of the header, class `run-header-clock`, reads the given map run's
    // minute, and „ (pauza)” after it since the game state is paused.
    assert.equal(
      textOf(element, "run-header-clock"),
      "Minuta 7 (pauza)",
      "the header reads the given map run",
    );
  });
});

// D-311, D-282, D-288, D-346. Catches the
// rule panel standing in the area under the drawing or in the world instead of in the program under
// the header it changes, the tabs and their content leaving while it is open, the drawing leaving
// with them, and „✕” changing the tab picked, whichever it was.
test("an open rule panel stands in the program under its header, the tabs and their content and the drawing stay where they were, and „✕” leaves the tab picked as it was", async () => {
  // decision: D-311 "The screen of a map run has two columns under one header"
  // decision: D-346 "The tab „Kronika” or „Teren” the player picks"
  // decision: D-288 "A rule's row reads as a sentence and a rule panel changes it, opening in place on the list under the row of the rule or the header of the rule group it changes, on both screens, and taking no column of its own"
  await withPage(async (page) => {
    const { screen } = await wiredScreen(page, pausedRun());
    const element = screen.element;
    const [world, program, area] = areasOf(element);
    const drawing = () => byClass(world, "terrain-drawing")[0];
    const tabs = () => byClass(area, "tabs").find(shown);
    const table = () => byClass(area, "tile-list").find(shown);
    const chronicle = () => byClass(area, "chronicle").find(shown);
    assert.ok(tabs() && chronicle(), "the tabs and the chronicle stand");
    assert.equal(table(), undefined, "Kronika is picked first");
    assert.equal(byClass(element, "rule-panel").length, 0);

    for (const picked of ["Kronika", "Teren"]) {
      await press(buttonNamed(tabs(), picked));
      const header = byClass(program, "rule-list-header").find(shown);
      await press(header);
      const panels = byClass(element, "rule-panel");
      assert.equal(panels.length, 1, `${picked}: the panel is open`);
      assert.ok(
        byClass(program, "program-panel")[0].contains(panels[0]),
        "in the program panel",
      );
      assert.ok(
        header.nextElementSibling.contains(panels[0]),
        "right under the header it changes",
      );
      assert.ok(shown(panels[0]));
      assert.equal(area.contains(panels[0]), false, "not in the tabs' area");
      assert.ok(tabs(), `${picked}: the tabs stand beside the open panel`);
      assert.equal(
        buttonNamed(tabs(), picked).getAttribute("aria-pressed"),
        "true",
        `${picked}: the tab picked is the one picked`,
      );
      assert.equal(
        Boolean(table()),
        picked === "Teren",
        `${picked}: its content stands`,
      );
      assert.equal(Boolean(chronicle()), picked === "Kronika");
      assert.ok(drawing() && shown(drawing()), "the drawing stays");

      await press(buttonLabelled(program, "Zamknij panel"));
      assert.equal(byClass(element, "rule-panel").length, 0);
      assert.ok(tabs(), `${picked}: the tabs stand`);
      assert.equal(
        buttonNamed(tabs(), picked).getAttribute("aria-pressed"),
        "true",
        `${picked}: „✕” changed no tab`,
      );
      assert.equal(
        Boolean(table()),
        picked === "Teren",
        `${picked}: its content stands`,
      );
      assert.equal(Boolean(chronicle()), picked === "Kronika");
      assert.ok(shown(drawing()));
    }
  });
});

// D-313, D-131. Catches „Dodaj regułę z tym”
// not reaching the panel, the rule added to a saved program or to a group of its own, the panel
// opened outside the program, not under the new rule's row, or on the condition, the tabs taken away
// by it, and the streak left as it stood.
test("at the first chill „Dodaj regułę z tym” adds „Zawsze → Wędruj” at the end of the copy's group, opens its panel in the program under the new rule on the action, the tabs stand, and the streak goes to zero", async () => {
  // decision: D-123 "The game writes one such rule, „Zawsze → Eksploruj”, at the first chill"
  // decision: D-311 "The screen of a map run has two columns under one header"
  // decision: D-313 "„Dodaj regułę z tym” in the band of a discovery adds a program rule at the end of the copy's first rule group"
  await withPage(async (page) => {
    const chilled = firstChill();
    assert.deepEqual(
      chilled.run.copy.program.groups[0].rules.map(({ condition, action }) => ({
        condition,
        action,
      })),
      [ALWAYS_EXPLORE],
      "precondition: the copy holds the rule the game wrote",
    );
    // The cold of the first chill has already set the real streak to zero, so a streak set by hand
    // shows that the button itself zeroes it (D-131).
    const game = await wiredScreen(page, {
      ...chilled,
      run: { ...chilled.run, streak: 40 },
    });
    const [, program, area] = areasOf(game.screen.element);
    await press(buttonNamed(program, "Dodaj regułę z tym"));

    assert.deepEqual(game.acts, ["editCopy"]);
    const group = game.state.run.copy.program.groups[0];
    assert.equal(game.state.run.copy.program.groups.length, 1, "no new group");
    assert.deepEqual(
      group.rules.map(({ condition, action }) => ({ condition, action })),
      [ALWAYS_EXPLORE, ALWAYS_WANDER],
    );
    assert.equal(game.state.run.streak, 0);
    const panel = byClass(program, "rule-panel")[0];
    assert.ok(panel && shown(panel), "the panel stands in the program");
    assert.equal(
      panel.querySelector(".rule-panel-heading")?.textContent,
      "Reguła 1.2",
    );
    assert.ok(
      program
        .querySelector('[data-rule="2"]')
        .nextElementSibling.contains(panel),
      "right under the row of the new rule",
    );
    assert.equal(
      byClass(area, "rule-panel").length,
      0,
      "not in the tabs' area",
    );
    assert.ok(byClass(area, "tabs").find(shown), "the tabs stand beside it");
    const focused = page.document.activeElement;
    assert.ok(panel.contains(focused), "the focus is in the panel");
    assert.equal(
      focused.closest('[role="group"]')?.getAttribute("aria-label"),
      "Czynność",
      "the panel is open on the action",
    );
  });
});

// D-122. Catches the band's „Wznów” doing anything other than the header's one
// resumption, and the band standing after it.
test("„Wznów” of the band goes on as the header's „Wznów” does, and the band goes", async () => {
  // decision: D-122 "When something is discovered in a map run the player starts, the map run stops in the same pause as after „Pauza”: the clock in the header reads „Minuta {game minute} (pauza)”, and the player goes on with „Wznów”"
  // decision: D-122 "A band in the role `discovery` above the program names what was discovered and the program rule the game wrote, the discoveries of one game minute in one band, with „Dodaj regułę z tym” and „Wznów”, whose „Wznów” goes on as the „Wznów” of the header does, and it stands until the player goes on"
  await withPage(async (page) => {
    const game = await wiredScreen(page, firstChill());
    const [, program] = areasOf(game.screen.element);
    await press(buttonNamed(byClass(program, "discovery-band")[0], "Wznów"));
    assert.deepEqual(game.acts, ["togglePause"]);
    assert.equal(game.state.paused, false);
    assert.equal(byClass(game.screen.element, "discovery-band").length, 0);
  });
});

// D-19, D-346. Catches the hovered tile kept by the drawing
// alone, so that the table in another area marks no row, its line shows no numbers, and a hovered row marks no tile.
test("a hovered tile of the drawing marks its row in the table of the area under the drawing and the line gives its numbers; a hovered row marks its tile", async () => {
  // decision: D-19 "The drawing of the game map is a picture, not a control: its only interaction is hovering, which links a tile with its row in the list of revealed tiles, and the numbers of stock stand in that list and in the line under the drawing, which shows the hovered tile or else the character's tile"
  await withPage(async (page) => {
    const { screen } = await wiredScreen(page, withTiles());
    const [world, , area] = areasOf(screen.element);
    // The table stands under „Teren”; under „Kronika” there is no row to link.
    await press(buttonNamed(area, "Teren"));
    const markedRows = () =>
      [...area.querySelectorAll("tbody tr.hovered")].map((row) =>
        row.getAttribute("data-tile"),
      );
    const markedTiles = () =>
      [...world.querySelectorAll(".terrain-drawing g.hovered")].map((g) =>
        g.getAttribute("data-tile"),
      );
    const line = () => textOf(world, "tile-line");
    assert.deepEqual(markedRows(), []);
    assert.equal(line(), "(1, 1): patyk — · jagoda 0 · mech — · włókno 6");

    const polygon = world.querySelector(
      '.terrain-drawing [data-tile="1,0"] polygon',
    );
    await inAct(() => fire(polygon, "pointerover"));
    assert.deepEqual(markedRows(), ["1,0"], "its row in the table");
    assert.deepEqual(markedTiles(), ["1,0"]);
    assert.equal(line(), "(1, 0): patyk 12 · jagoda — · mech 6 · włókno —");

    const cell = area.querySelector('tbody tr[data-tile="0,1"] td');
    await inAct(() => fire(cell, "pointerover"));
    assert.deepEqual(markedTiles(), ["0,1"], "a row marks its tile");
    assert.deepEqual(markedRows(), ["0,1"]);
  });
});

// --- „Teraz” and „Potem” take the program to their rule (D-336) -------

const NEVER = { kind: "hereBelow", resource: r[0], value: 0 };

/** A program of these groups, each `{ id, rules }` of rules `{ id, condition, action }`. */
function programOf(...groups) {
  const rules = groups.flatMap((group) => group.rules);
  return {
    groups: groups.map((group) => ({
      id: group.id,
      name: `Grupa ${group.id}`,
      condition: { kind: "always" },
      rules: group.rules,
    })),
    tripPlan: { take: [], bring: [] },
    nextGroupId: groups.length + 1,
    nextRuleId: Math.max(...rules.map((rule) => rule.id)) + 1,
  };
}

const EXPLORE = { id: 1, ...ALWAYS_EXPLORE };
const WANDER = {
  id: 2,
  condition: ALWAYS_EXPLORE.condition,
  action: { kind: "wander" },
};
const THREE = {
  id: 3,
  condition: ALWAYS_EXPLORE.condition,
  action: { kind: "kick" },
};

/**
 * A paused map run of Ala under the copy of a program of two groups: „Teraz” names rule 1.1 (the
 * group 1 holds it), and while it stands, „Potem” names it too.
 */
function underway() {
  const program = programOf(
    { id: 1, rules: [EXPLORE] },
    { id: 2, rules: [WANDER, THREE] },
  );
  const game = setProgram(withEdgeSolved(newKnowingGame()), program).state;
  const sentRun = send(createCharacter(game, "Ala").state, SENT, REAL_MS).state;
  return setPaused(sentRun, true).state;
}

/** The same map run after the player made rule 1.1 never hold: „Potem” names rule 2.1 now, „Teraz” still 1.1. */
function diverged() {
  const state = underway();
  const program = programOf(
    { id: 1, rules: [{ ...EXPLORE, condition: NEVER }] },
    { id: 2, rules: [WANDER, THREE] },
  );
  return setProgram(state, program).state;
}

/** A recorder of what the screen scrolls: jsdom has no `scrollIntoView`, so the page gets one that notes it. */
function recordScrolls(window) {
  const scrolls = [];
  window.Element.prototype.scrollIntoView = function scrollIntoView(options) {
    scrolls.push({ element: this, options });
  };
  return scrolls;
}

const rowsOf = (screen) => ({
  now: byClass(screen.element, "now-row")[0],
  next: byClass(screen.element, "next-row")[0],
});

function key(window, target, name) {
  return inAct(() =>
    target.dispatchEvent(
      new window.KeyboardEvent("keydown", {
        key: name,
        bubbles: true,
        cancelable: true,
      }),
    ),
  );
}

/** The `data-rule` or, for a header, `data-group` of what a scroll was asked for, with its options. */
function scrolledTo(scroll) {
  const rule = scroll.element.getAttribute("data-rule");
  const group = scroll.element
    .closest("[data-group]")
    ?.getAttribute("data-group");
  return {
    ...(rule === null ? { header: group } : { rule }),
    options: scroll.options,
  };
}

// D-336. Catches rows that are no control (no tab stop), a click or Enter that does nothing, a row
// that scrolls the rule of the other row, and a scroll that puts the rule anywhere but the middle.
test("a click on Teraz and on Potem, and Enter and Space on them, scroll the row of their rule to the middle of the window", async () => {
  // decision: D-336 "A click on the row „Teraz” or „Potem”, with the mouse or from the keyboard, scrolls the program once"
  await withPage(async (page) => {
    const scrolls = recordScrolls(page.window);
    const { screen } = await wiredScreen(page, diverged());
    const { now, next } = rowsOf(screen);
    assert.equal(now.tabIndex, 0, "Teraz is reached by the keyboard");
    assert.equal(next.tabIndex, 0, "Potem is reached by the keyboard");
    assert.match(
      textOf(now, "now-right"),
      /^reguła 1\.1 /,
      "precondition: Teraz",
    );
    assert.equal(
      textOf(next, "now-right"),
      "reguła 2.1",
      "precondition: Potem",
    );
    assert.equal(scrolls.length, 0, "nothing scrolls by itself");

    await press(now);
    await press(next);
    await key(page.window, now, "Enter");
    await key(page.window, next, " ");
    const middle = { block: "center" };
    assert.deepEqual(scrolls.map(scrolledTo), [
      { rule: "1", options: middle },
      { rule: "2", options: middle },
      { rule: "1", options: middle },
      { rule: "2", options: middle },
    ]);
    assert.ok(
      scrolls.every((scroll) => scroll.element.localName === "li"),
      "the row of the rule is scrolled",
    );

    await key(page.window, now, "a");
    assert.equal(scrolls.length, 4, "another key asks for nothing");
  });
});

// D-336, D-295. Catches a rule of a folded group looked for as a row that is not drawn, and a header
// of another group.
test("for a rule of a folded group Teraz and Potem scroll the header of that group", async () => {
  // decision: D-336 "A click on the row „Teraz” or „Potem”, with the mouse or from the keyboard, scrolls the program once"
  await withPage(async (page) => {
    const scrolls = recordScrolls(page.window);
    const { screen } = await wiredScreen(page, diverged());
    const [, program] = areasOf(screen.element);
    const foldButtons = [
      ...program.querySelectorAll('button[aria-label="Zwiń grupę"]'),
    ];
    assert.equal(foldButtons.length, 2, "precondition: two groups");
    await press(foldButtons[1]);
    assert.equal(
      program.querySelector('[data-rule="2"]'),
      null,
      "precondition: the row of rule 2.1 is not drawn",
    );

    await press(rowsOf(screen).next);
    assert.equal(scrolls.length, 1);
    assert.deepEqual(scrolledTo(scrolls[0]), {
      header: "2",
      options: { block: "center" },
    });
    assert.ok(scrolls[0].element.classList.contains("rule-list-header"));

    await press(rowsOf(screen).now);
    assert.deepEqual(scrolledTo(scrolls[1]), {
      rule: "1",
      options: { block: "center" },
    });
  });
});

// D-336, D-267. Catches a program that follows the rule (a scroll made by an effect on every update)
// instead of a scroll once per click.
test("the program scrolls once per click and does not follow the rule when the game goes on", async () => {
  // decision: D-336 "A click on the row „Teraz” or „Potem”, with the mouse or from the keyboard, scrolls the program once"
  await withPage(async (page) => {
    const scrolls = recordScrolls(page.window);
    const game = await wiredScreen(page, diverged());
    await press(rowsOf(game.screen).now);
    assert.equal(scrolls.length, 1);
    const later = advanceMinutes(diverged(), 3).state;
    await inAct(() => game.screen.update(later, later.run, []));
    await inAct(() => game.screen.update(later, later.run, []));
    assert.equal(scrolls.length, 1, "no scroll without a click");
  });
});

// D-336. Catches a wait, a fight, a death, a completion and a Potem without a winner
// being a tab stop or scrolling, and an action whose rule the copy no longer holds scrolling to nothing.
test("a row that names no rule is no control: the keyboard does not reach it and it scrolls nothing", async () => {
  // decision: D-336 "A click on the row „Teraz” or „Potem”, with the mouse or from the keyboard, scrolls the program once"
  await withPage(async (page) => {
    const scrolls = recordScrolls(page.window);
    const waitingState = setProgram(
      underway(),
      programOf({ id: 1, rules: [{ ...EXPLORE, condition: NEVER }] }),
    ).state;
    const waiting = {
      ...waitingState,
      run: { ...waitingState.run, current: null },
    };
    const fighting = {
      ...underway(),
      run: {
        ...underway().run,
        current: null,
        activeCombat: { creatureId: "wolf", attackMinute: 0, resolveMinute: 5 },
      },
    };
    const dead = {
      ...underway(),
      run: { ...underway().run, death: { minute: 5, cause: "cold" } },
    };
    // The action of rule 1 goes on after the player removed the rule from the copy.
    const dropped = setProgram(
      underway(),
      programOf({ id: 1, rules: [WANDER] }),
    ).state;
    const cases = [
      ["the wait", waiting, ["now", "next"], "Czeka — żadna reguła nie pasuje"],
      ["the fight", fighting, ["now"], "Walczy z wilkiem"],
      ["the death", dead, ["now"], "Mag zamarzł"],
      ["an action whose rule the copy lacks", dropped, ["now"], "Eksploruj"],
    ];
    for (const [name, state, rows, says] of cases) {
      const { screen } = await wiredScreen(page, state);
      assert.equal(
        textOf(rowsOf(screen).now, "now-text"),
        says,
        `precondition: ${name}`,
      );
      for (const row of rows) {
        const element = rowsOf(screen)[row];
        assert.equal(element.tabIndex, -1, `${name}: ${row} is no tab stop`);
        assert.equal(element.hasAttribute("tabindex"), false, name);
        await press(element);
        await key(page.window, element, "Enter");
        await key(page.window, element, " ");
      }
      screen.element.remove();
    }
    assert.equal(scrolls.length, 0, "nothing was asked to scroll");
  });
});

// D-336, D-166. Catches a scroll in the program panel while it shows a saved program, whose rows
// carry the same numbers as the copy's.
test("while the program panel shows a saved program a click on Teraz scrolls nothing", async () => {
  // decision: D-336 "While the program panel shows a saved program in place of the copy"
  await withPage(async (page) => {
    const scrolls = recordScrolls(page.window);
    const game = await wiredScreen(page, diverged());
    await inAct(() => game.panel.showProgram(1));
    assert.ok(
      byClass(game.screen.element, "rule-list-row").length > 0,
      "precondition: the saved program's rows are drawn",
    );
    assert.equal(
      byClass(game.screen.element, "copy-heading").length,
      0,
      "precondition: the copy is not shown",
    );
    await press(rowsOf(game.screen).now);
    await key(page.window, rowsOf(game.screen).next, "Enter");
    assert.equal(scrolls.length, 0);
  });
});

// --- the end-of-run window over the screen ------------------------------------------------------

/** The map run of `state` ended in a completion in its game minute 480, its map solved. */
const completedRun = (state) => ({
  ...state,
  paused: false,
  solvedMaps: [...state.solvedMaps, state.run.mapId],
  run: { ...state.run, minute: 480, completion: { minute: 480 } },
});

/** Ala's map run of Las, no rule in her program, ended in the death by cold the simulation gives. */
function freezingRun() {
  const program = setProgram(
    withEdgeSolved(newKnowingGame()),
    programFromRules(),
  ).state;
  return send(createCharacter(program, "Ala").state, SENT, 0).state;
}

const windowIn = (screen) => byClass(screen.element, "end-window")[0];
/** The window that stands; the case fails where none does. */
function expectWindowIn(screen) {
  const opened = windowIn(screen);
  assert.ok(opened, "the window stands");
  return opened;
}
const headerIn = (screen) => byClass(screen.element, "run-header")[0];
/** Whether the header and each of the three areas are `hidden` (true) or none is (false). */
function coveredState(screen) {
  const states = [headerIn(screen), ...areasOf(screen.element)].map(
    (element) => element.hidden,
  );
  if (states.every((hidden) => hidden)) return true;
  if (states.every((hidden) => !hidden)) return false;
  assert.fail(`the header and the areas differ in being hidden: ${states}`);
}

// D-311, D-368, D-370. Catches a window drawn while the state of the screen does not show it or
// over a map run that goes on, a header or an area left visible under the window, and a screen
// that stays covered after the state takes the window away.
test("while the state of the screen shows the window, the screen of an ended map run draws it and hides the header and the three areas; once it does not, the screen shows them again", async () => {
  // decision: D-407 "The game state lives in a store outside React and the state of the screen Przejście, which is the question „Zapisać, odrzucić, wrócić?” and the end-of-run window, in a module of its own outside React"
  // decision: D-311 "After a character's death or a completion that window (D-368) stands in place of this screen"
  // decision: D-368 "When a manual map run ends in a character's death or a completion, the end-of-run window opens of itself over the screen of the map run"
  // decision: D-370 "While the end-of-run window (D-368) stands, the header and the three areas of the screen of a map run are not shown"
  await withPage(async (page) => {
    const game = await wiredScreen(page, completedRun(pausedRun()));
    assert.equal(
      windowIn(game.screen),
      undefined,
      "not drawn until the state shows it",
    );
    assert.equal(coveredState(game.screen), false);
    await inAct(() => game.screenState.entered());
    assert.ok(windowIn(game.screen), "the window stands");
    assert.equal(coveredState(game.screen), true, "the screen is covered");
    await inAct(() => game.screenState.closeWindow());
    assert.equal(windowIn(game.screen), undefined);
    assert.equal(coveredState(game.screen), false, "the screen is shown");

    const running = await wiredScreen(page, pausedRun());
    await inAct(() => running.screenState.entered());
    assert.equal(windowIn(running.screen), undefined, "no window, no end");
    assert.equal(coveredState(running.screen), false, "nothing is covered");
  });
});

// Catches the covered header and areas leaving the tree, which would drop what they hold: the
// program panel's element, the hovered tile and the tabs picked stand through the window.
test("what the window covers stays in the tree and keeps its state: the tab picked and the program panel stand through the window", async () => {
  // decision: D-370 "While the end-of-run window (D-368) stands, the header and the three areas of the screen of a map run are not shown"
  // decision: D-346 "The tab „Kronika” or „Teren” the player picks"
  await withPage(async (page) => {
    const game = await wiredScreen(page, completedRun(pausedRun()));
    const [, program, tabs] = areasOf(game.screen.element);
    await press(buttonNamed(tabs, "Teren"));
    const panel = byClass(program, "program-panel")[0];
    await inAct(() => game.screenState.entered());
    assert.ok(panel.isConnected, "the panel's element stays in the screen");
    assert.ok(program.contains(panel));
    await inAct(() => game.screenState.closeWindow());
    assert.ok(
      byClass(areasOf(game.screen.element)[2], "tabs")
        .flatMap((tabsRow) => [...tabsRow.querySelectorAll("button")])
        .some(
          (button) =>
            button.textContent === "Teren" &&
            button.getAttribute("aria-pressed") === "true",
        ),
      "„Teren” is still the tab picked",
    );
  });
});

// D-368, D-370. Catches „✕” that does not ask the game view to close the window,
// and a focus left on nothing: it goes to „Koniec przejścia” in the header, which the closing shows.
test("„✕” asks the game view to close the window and the focus goes to „Koniec przejścia” in the header; „Koniec przejścia” asks to open it", async () => {
  // decision: D-407 "The game state lives in a store outside React and the state of the screen Przejście, which is the question „Zapisać, odrzucić, wrócić?” and the end-of-run window, in a module of its own outside React"
  // decision: D-311 "After a character's death or a completion that window (D-368) stands in place of this screen"
  // decision: D-368 "The window scrolls in itself while its buttons"
  // decision: D-370 "The window takes the focus when it opens"
  await withPage(async (page) => {
    const game = await wiredScreen(page, completedRun(pausedRun()));
    await inAct(() => game.screenState.entered());
    await press(buttonLabelled(expectWindowIn(game.screen), "Zamknij okno"));
    assert.deepEqual(game.acts, ["closeWindow"]);
    assert.equal(windowIn(game.screen), undefined);
    const opener = buttonNamed(headerIn(game.screen), "Koniec przejścia");
    assert.ok(opener && shown(opener), "the header holds the button");
    assert.ok(page.document.activeElement === opener, "focus is on it");
    await press(opener);
    assert.deepEqual(game.acts, ["closeWindow", "openWindow"]);
    assert.ok(windowIn(game.screen), "the window stands again");
  });
});

// D-368. Catches window buttons wired to the header's act, to another map, or to none.
test("the buttons of the window ask for „Restart”, „Zakończ” and the opening of the map they name", async () => {
  // decision: D-368 "The window scrolls in itself while its buttons"
  await withPage(async (page) => {
    const game = await wiredScreen(page, completedRun(pausedRun()));
    await inAct(() => game.screenState.entered());
    await press(buttonNamed(expectWindowIn(game.screen), "Zakończ"));
    await press(
      buttonNamed(expectWindowIn(game.screen), "Otwarte: Las — głębiej →"),
    );
    assert.deepEqual(game.acts, ["end", "openMap forestDeep"]);
    // The stand-in `end` of this test ends the map run in the game state, so the window is gone;
    // the buttons that stand in a window of a map run whose end the player has not asked for are
    // drawn again for „Restart”.
    const again = await wiredScreen(page, completedRun(pausedRun()));
    await inAct(() => again.screenState.entered());
    await press(buttonNamed(expectWindowIn(again.screen), "Restart"));
    assert.deepEqual(again.acts, ["restart"]);
  });
});

// D-313. Catches the window left standing over the rule panel „Dodaj regułę z tym”
// opens, and the rule added before the window closes, which would give the panel no room to focus.
test("„Dodaj regułę z tym” of the window closes the window and then does what the panel's button does: the rule is added and its panel stands open", async () => {
  // decision: D-313 "The same button stands in the end-of-run window"
  await withPage(async (page) => {
    const chilled = firstChill();
    const game = await wiredScreen(page, completedRun(chilled));
    await inAct(() => game.screenState.entered());
    const discovery = byClass(
      expectWindowIn(game.screen),
      "end-window-discovery",
    )[0];
    assert.ok(discovery, "precondition: the window names the discovery");
    await press(buttonNamed(discovery, "Dodaj regułę z tym"));
    assert.deepEqual(game.acts, ["closeWindow", "editCopy"], "in this order");
    assert.equal(windowIn(game.screen), undefined);
    assert.equal(coveredState(game.screen), false);
    const [, program] = areasOf(game.screen.element);
    assert.equal(
      game.state.run.copy.program.groups[0].rules.length,
      2,
      "one rule added",
    );
    const panel = byClass(program, "rule-panel")[0];
    assert.ok(panel && shown(panel), "its panel stands open in the program");
    assert.ok(
      panel.contains(page.document.activeElement),
      "the focus is in the panel, not on the header",
    );
  });
});

// D-368, D-147. Catches the entries of „Ostatnie minuty” read from anywhere but the chronicle
// memory the screen was given, and a death whose window shows none.
test("the window's „Ostatnie minuty” are the entries of the chronicle memory the screen was given, up to the death", async () => {
  // decision: D-368 "Each section of why stands only where it has content"
  await withPage(async (page) => {
    const game = await wiredScreen(page, freezingRun());
    await inAct(() => game.apply(advanceMinutes(game.state, 5000)));
    assert.ok(game.state.run.death, "precondition: the character died");
    await inAct(() => game.screenState.entered());
    const minutes = byClass(
      expectWindowIn(game.screen),
      "end-window-minutes",
    )[0];
    const rows = byClass(minutes, "chronicle-row").map((row) => [
      row.querySelector(".chronicle-minute").textContent,
      row.querySelector(".chronicle-text").textContent,
    ]);
    const chronicle = byClass(
      areasOf(game.screen.element)[2],
      "chronicle-row",
    ).map((row) => [
      row.querySelector(".chronicle-minute").textContent,
      row.querySelector(".chronicle-text").textContent,
    ]);
    assert.ok(rows.length >= 1 && rows.length <= 4, "at most four");
    assert.deepEqual(
      rows,
      chronicle.slice(0, rows.length).reverse(),
      "the newest entries of the chronicle, oldest first",
    );
  });
});

// D-368, D-88. The window takes the focus as it appears, which in a browser scrolls the page to its
// edge, and the screen it covers may have been scrolled down: the page must go to its top at each
// appearance, and only then, or the menu bar stays out of sight above the window. Catches no scroll,
// a scroll at every draw while the window stands, and a scroll with no window drawn.
test("the page scrolls to its top when the window appears, and at no other draw", async () => {
  // decision: D-370 "While the end-of-run window (D-368) stands, the header and the three areas of the screen of a map run are not shown"
  await withPage(async (page) => {
    const writes = [];
    Object.defineProperty(page.document.documentElement, "scrollTop", {
      configurable: true,
      get: () => 0,
      set(value) {
        writes.push(value);
      },
    });
    const game = await wiredScreen(page, completedRun(pausedRun()));
    assert.deepEqual(writes, [], "none while no window is drawn");
    await inAct(() => game.screenState.entered());
    assert.deepEqual(writes, [0], "at the appearance");
    await inAct(() => game.screen.update(game.state, game.state.run, []));
    await inAct(() => game.screenState.entered());
    assert.deepEqual(writes, [0], "not at a draw while the window stands");
    await inAct(() => game.screenState.closeWindow());
    assert.deepEqual(writes, [0], "not at the closing");
    // Leaving the screen and entering it again opens the window of an ended map run again.
    await inAct(() => game.screenState.left());
    await inAct(() => game.screenState.entered());
    assert.deepEqual(writes, [0, 0], "at the next appearance");
    const running = await wiredScreen(page, pausedRun());
    await inAct(() => running.screenState.entered());
    assert.deepEqual(writes, [0, 0], "none where no end stands to draw it");
  });
});

/**
 * A running map run of Ala whose only rule is „Zawsze → Eksploruj”: the mage stands at the right
 * edge of the scene, 275 of its 336 pixels, and the exploring ends at game minute 20, when no rule
 * is left to pick and the mage walks to the clearing, 144.
 */
function exploringRun() {
  const game = setProgram(
    withEdgeSolved(newKnowingGame()),
    programFromRules(ALWAYS_EXPLORE),
  ).state;
  return send(createCharacter(game, "Ala").state, SENT, REAL_MS).state;
}

/**
 * Fires `animationcancel` on the mage's element, the sheets in it and the badge's carrier, as a
 * browser does for the animations of a screen that is hidden. jsdom runs no animation and cancels
 * none, so the case fires them.
 */
function cancelWalk(scene) {
  const { Event } = scene.ownerDocument.defaultView;
  const mage = scene.querySelector(".scene-mage");
  for (const element of [
    mage,
    ...mage.querySelectorAll(".scene-sheet"),
    scene.querySelector(".scene-badge-carrier"),
  ])
    element.dispatchEvent(new Event("animationcancel", { bubbles: true }));
}

/** How the mage and the badge's carrier stand: whether they walk, the left edge and the offset they walk from. */
const walkOf = (scene) =>
  [".scene-mage", ".scene-badge-carrier"].map((selector) => {
    const element = scene.querySelector(selector);
    return {
      walking: element.hasAttribute("data-walking"),
      left: element.style.left,
      from: element.style.getPropertyValue("--walk-start"),
    };
  });

// D-319, D-283. Catches a mage whose walk the player cut by leaving the screen, which a browser
// cancels the animations of while the screen is hidden, that walks it again from where it set out
// when the player comes back, because the walk's end was never told.
test("a walk the player cut by leaving the screen plays no second time on the return: the mage stands at the place of the walk", async () => {
  await withPage(async (page) => {
    const game = await wiredScreen(page, exploringRun());
    const scene = game.screen.element.querySelector(".scene");
    assert.equal(walkOf(scene)[0].walking, false, "precondition: it stands");
    assert.equal(walkOf(scene)[0].left, "81.8452%", "precondition: at 275");
    await inAct(() => game.apply(advanceMinutes(game.state, 20)));
    assert.deepEqual(
      walkOf(scene),
      [
        { walking: true, left: "42.8571%", from: "204.6875%" },
        { walking: true, left: "42.8571%", from: "204.6875%" },
      ],
      "precondition: the mage and its badge walk from 275 to 144",
    );

    // The walk is cut inside its 640 ms by leaving; the registry hides the screen's element, the
    // browser cancels every animation in it, and the player comes back.
    await inAct(() => {
      game.screen.element.hidden = true;
      cancelWalk(scene);
    });
    await inAct(() => {
      game.screen.element.hidden = false;
    });
    assert.deepEqual(
      walkOf(scene),
      [
        { walking: false, left: "42.8571%", from: "" },
        { walking: false, left: "42.8571%", from: "" },
      ],
      "the mage and its badge stand at the place of the walk, with no walk from where it set out",
    );
  });
});
