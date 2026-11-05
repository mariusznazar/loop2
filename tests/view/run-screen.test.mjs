// The screen of a map run in React (task ekran-przejscia, To do 2, 3, 5, 7 and 8; D-311, D-281,
// D-282, D-19, D-122, D-313) on jsdom through tests/view/page-document.mjs (D-264): the header over
// three areas — the world, the program with the band of a discovery above the program panel, and on
// the right the table of revealed tiles or the rule panel — drawn from the map run the screen is
// given, and the one hovered tile the screen holds for the drawing, its line and the table. The
// screen is built here as the game view builds it, with a program panel of its own and controls
// that make the real simulation calls. Real events, focus and the look are checked in the browser
// (D-88). Every comparison is of plain data or of a handful of words (D-268).
import { assert, inAct, withPage } from "./page-document.mjs";
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
import { createProgramPanel } from "../../dist/browser/view/program-panel.js";
import { createRunScreen } from "../../dist/browser/view/run-screen.js";

const SENT = { mapId: "forest", characterId: 1 };
const REAL_MS = 1760000000000;
const ALWAYS_EXPLORE = {
  condition: { kind: "always" },
  action: { kind: "explore" },
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

function fire(window, target, type, init = {}) {
  const Kind = type === "pointerout" ? window.MouseEvent : window.Event;
  target.dispatchEvent(
    new Kind(type, { bubbles: true, cancelable: true, ...init }),
  );
}

/** Clicks `target` inside act, as a browser clicks it. */
function press(window, target) {
  assert.ok(target, "what the case presses stands");
  return inAct(() => fire(window, target, "click"));
}

/**
 * The screen as the game view builds it: a program panel of the screen of a map run and the
 * controls of the header, each a real simulation call whose result the screen is given with the
 * map run it holds. `acts` records what was asked.
 */
async function wiredScreen({ root }, start) {
  const game = {
    acts: [],
    state: start,
    apply(result) {
      game.state = result.state;
      if (game.state.run !== null)
        game.screen.update(game.state, game.state.run, result.events);
    },
  };
  const unused = (name) => () => game.acts.push(name);
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
  );
  // Inside act: the screen draws its first render as it is built.
  game.screen = await inAct(() =>
    createRunScreen(game.panel, {
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
    }),
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
  createProgram(createCharacter(newGame(), "Ala").state).state;
const pausedRun = () =>
  setPaused(send(twoPrograms(), { ...SENT, programId: 1 }, 0).state, true)
    .state;

/** The game stopped at the first chill, game minute 84, where the game wrote its rule. */
function firstChill() {
  const sent = send(createCharacter(newGame(), "Ala").state, SENT, REAL_MS);
  const state = advanceMinutes(sent.state, 100).state;
  assert.equal(state.run.minute, 84, "precondition: the first chill");
  assert.deepEqual(
    state.discovery?.actions,
    ["explore", "wander"],
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

// D-311, D-282, task items 1 and 2. Catches the header standing inside an area, two areas drawn as
// one block, the areas out of the order world, program, right, and a part standing in another
// area: the drawing beside the program, the program panel or the table in the world.
test("the header stands above three areas of their own in the order world, program and right, holding the world, the program panel and the table of revealed tiles", async () => {
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
    assert.deepEqual(holding("tile-list"), [false, false, true]);
    assert.deepEqual(holding("run-header-status"), [false, false, false]);
  });
});

// D-122, task item 7. Catches the band standing in the world area, under the program panel, or
// outside the program's area.
test("at a discovery the band stands in the program's area, above the program panel", async () => {
  await withPage(async (page) => {
    const { screen } = await wiredScreen(page, firstChill());
    const [world, program, right] = areasOf(screen.element);
    assert.equal(byClass(world, "discovery-band").length, 0);
    assert.equal(byClass(right, "discovery-band").length, 0);
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

// To do 8, D-281, D-166, the review of the whole change of task ekrany-i-menu (B2), moved here from
// tests/view/account-screen.test.mjs with the screen it tests. Catches the screen, its program
// panel with the copy included, drawing the map run of the game state beside the one it was given.
test("the screen draws the map run it was given, the copy of that map run in its program panel, not the game state's", async () => {
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
    assert.match(
      textOf(element, "run-header-status"),
      /^Minuta 7 /,
      "the header reads the given map run",
    );
  });
});

// Task item 3, D-311, D-282, task edytor-programu, To do 3 and question 3; moved here from
// tests/view/account-screen.test.mjs, where it read the terrain panel. Catches the rule panel
// standing under the rows or in the world area instead of in the right area in the place of the
// table, the table standing beside an open panel, the drawing leaving with the table, and the
// table not coming back at „✕”.
test("an open rule panel stands in the right area in the place of the table of revealed tiles, the drawing stays in the world area, and the table comes back at „✕”", async () => {
  await withPage(async (page) => {
    const { screen } = await wiredScreen(page, pausedRun());
    const element = screen.element;
    const [world, program, right] = areasOf(element);
    const drawing = () => byClass(world, "terrain-drawing")[0];
    const table = () => byClass(right, "tile-list").find(shown);
    assert.ok(table(), "the table stands while no rule is open");
    assert.equal(byClass(element, "rule-panel").length, 0);

    await press(page.window, byClass(program, "rule-list-header").find(shown));
    const panels = byClass(element, "rule-panel");
    assert.equal(panels.length, 1, "the panel is open");
    assert.ok(right.contains(panels[0]), "in the right area");
    assert.ok(shown(panels[0]));
    assert.equal(table(), undefined, "the table gives the panel its place");
    assert.ok(drawing() && shown(drawing()), "the drawing stays");
    assert.equal(
      byClass(program, "rule-panel").length,
      0,
      "not under the rows",
    );

    await press(page.window, buttonLabelled(right, "Zamknij panel"));
    assert.equal(byClass(element, "rule-panel").length, 0);
    assert.ok(table(), "the table is back");
    assert.ok(shown(drawing()));
  });
});

// Task item 7, D-313, D-131. Catches „Dodaj regułę z tym” not reaching the panel, the rule added
// to a saved program or to a group of its own, the panel opened outside the right area or on the
// condition, the table left beside it, and the streak left as it stood.
test("at the first chill „Dodaj regułę z tym” adds „Zawsze → Eksploruj” at the end of the copy's group, opens its panel in the right area on the action, and the streak goes to zero", async () => {
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
    const [, program, right] = areasOf(game.screen.element);
    await press(page.window, buttonNamed(program, "Dodaj regułę z tym"));

    assert.deepEqual(game.acts, ["editCopy"]);
    const group = game.state.run.copy.program.groups[0];
    assert.equal(game.state.run.copy.program.groups.length, 1, "no new group");
    assert.deepEqual(
      group.rules.map(({ condition, action }) => ({ condition, action })),
      [ALWAYS_EXPLORE, ALWAYS_EXPLORE],
    );
    assert.equal(game.state.run.streak, 0);
    const panel = byClass(right, "rule-panel")[0];
    assert.ok(panel && shown(panel), "the panel stands in the right area");
    assert.equal(
      panel.querySelector(".rule-panel-heading")?.textContent,
      "Reguła 1.2",
    );
    assert.equal(byClass(right, "tile-list").length, 0, "in the table's place");
    const focused = page.document.activeElement;
    assert.ok(panel.contains(focused), "the focus is in the panel");
    assert.equal(
      focused.closest('[role="group"]')?.getAttribute("aria-label"),
      "Czynność",
      "the panel is open on the action",
    );
  });
});

// D-122, task item 7. Catches the band's „Wznów” doing anything other than the header's one
// resumption, and the band standing after it.
test("„Wznów” of the band goes on as the header's „Wznów” does, and the band goes", async () => {
  await withPage(async (page) => {
    const game = await wiredScreen(page, firstChill());
    const [, program] = areasOf(game.screen.element);
    await press(
      page.window,
      buttonNamed(byClass(program, "discovery-band")[0], "Wznów"),
    );
    assert.deepEqual(game.acts, ["togglePause"]);
    assert.equal(game.state.paused, false);
    assert.equal(byClass(game.screen.element, "discovery-band").length, 0);
  });
});

// D-19, task item 5. Catches the hovered tile kept by the drawing alone, so that the table in
// another area marks no row, its line shows no numbers, and a hovered row marks no tile.
test("a hovered tile of the drawing marks its row in the table of the right area and the line gives its numbers; a hovered row marks its tile", async () => {
  await withPage(async (page) => {
    const { screen } = await wiredScreen(page, withTiles());
    const [world, , right] = areasOf(screen.element);
    const markedRows = () =>
      [...right.querySelectorAll("tbody tr.hovered")].map((row) =>
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
    await inAct(() => fire(page.window, polygon, "pointerover"));
    assert.deepEqual(markedRows(), ["1,0"], "its row in the right area");
    assert.deepEqual(markedTiles(), ["1,0"]);
    assert.equal(line(), "(1, 0): patyk 12 · jagoda — · mech 6 · włókno —");

    const cell = right.querySelector('tbody tr[data-tile="0,1"] td');
    await inAct(() => fire(page.window, cell, "pointerover"));
    assert.deepEqual(markedTiles(), ["0,1"], "a row marks its tile");
    assert.deepEqual(markedRows(), ["0,1"]);
  });
});
