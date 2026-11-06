// The world area of the screen of a map run in React (task ekran-przejscia, To do 4, 5 and 6; D-311,
// D-19, D-70, D-147, D-185, D-186, D-201, D-215, D-216, D-272, D-314) on jsdom through
// tests/view/page-document.mjs (D-264): the scene, the last-encounter paragraph, the lines of the
// end, the body row with the backpack, the lines between the backpack and the drawing, the drawing
// and the line of a tile under it, and the table of revealed tiles that stands in another area
// and shares the hovered tile with the drawing. Real events and the look are checked in the
// browser (D-88), so a hover case here holds only what jsdom shows. Every comparison is of plain
// data or of a handful of words (D-268).
import { assert, inAct, withPage } from "./page-document.mjs";
import { test } from "node:test";
import { Fragment, createElement, useState } from "react";
import { createRoot } from "react-dom/client";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
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
import { emptyProgram } from "../../dist/browser/sim/programs.js";
import { TileTable } from "../../dist/browser/view/tile-table.js";
import {
  SCENE_SCALE,
  WorldArea,
  sceneSize,
} from "../../dist/browser/view/world-area.js";
import { programFromRules } from "../sim/program-fixture.mjs";
import { newKnowingGame } from "../sim/understanding-fixture.mjs";

const SENT = { mapId: "forest", characterId: 1 };
const ALWAYS = { kind: "always" };

/** The map's resource ids in the map's order: r[0] … r[3]. */
const r = MAPS.forest.resources.map((resource) => resource.id);

const entry = (item, count) => ({ item, count });
const PLAN = { take: [entry("stick", 5)], bring: [entry("stick", 3)] };

/** A map run of the character „Ala” on Las under the given trip plan, a chest of ten sticks. */
function sent(tripPlan = PLAN) {
  let state = createCharacter(newGame(), "Ala").state;
  state = {
    ...state,
    team: { ...state.team, chest: { pieces: { stick: 10 } } },
  };
  state = setProgram(state, { ...emptyProgram(), tripPlan }).state;
  return send(state, SENT, 1760000000000).state;
}

/** The same, on a map solved before the map run started. */
function solvedSent() {
  return send(
    { ...sent(), run: null, solvedMaps: ["forest"] },
    SENT,
    1760000000000,
  ).state;
}

/** The map run played on to its completion, as the screen of a completed map run reads it. */
const completed = (state) =>
  advanceMinutes(
    { ...state, run: { ...state.run, minute: 479, streak: 479 } },
    1,
  ).state;

/** The map run played on to the character's death and settled; the resurrection is ready at `readyAtMs`. */
function died(state, readyAtMs) {
  const characters = state.team.characters.map((character) => ({
    ...character,
    resurrectionReadyAtMs: readyAtMs,
  }));
  let dying = { ...state, team: { ...state.team, characters } };
  for (let round = 0; round < 50 && !mapRunEnded(dying.run); round += 1)
    dying = advanceMinutes(setPaused(dying, false).state, 5000).state;
  assert.ok(dying.run.death, "precondition: the run ended in a death");
  return settleDeath(dying, 1_000).state;
}

/** The same game with the given fields of its map run replaced. */
const withRun = (state, fields) => ({
  ...state,
  run: { ...state.run, ...fields },
});

const WOLF = {
  creatureId: "wolf",
  attackMinute: 10,
  resolveMinute: 15,
  result: null,
};
const WOLF_TEXT =
  "Napada wilk (24/24). Wilk: Zdrowie poniżej 8 → Odskocz; Zawsze → Uderz.";

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

/**
 * A map run holding these tiles instead of its drawn ones. The character stands on the tile (1, 1),
 * where the map run of Las starts it; the tile (0, 0) is not revealed, though it holds a stock.
 */
const TILES = [
  tile(0, 0, false, { [r[0]]: 12 }),
  tile(1, 0, true, { [r[0]]: 12, [r[2]]: 6 }),
  tile(0, 1, true, {}),
  tile(1, 1, true, { [r[1]]: 0, [r[3]]: 6 }),
];
const withTiles = (state = sent()) => withRun(state, { tiles: TILES });

const LINE_OF_1_0 = "(1, 0): patyk 12 · jagoda — · mech 6 · włókno —";
const LINE_OF_1_1 = "(1, 1): patyk — · jagoda 0 · mech — · włókno 6";

/**
 * The world area and the table of revealed tiles side by side holding one hovered key, as the screen
 * holds it for its two areas.
 */
function Screen({ state }) {
  const [hovered, setHovered] = useState(null);
  const shared = { state, hovered, onHover: setHovered };
  return createElement(
    Fragment,
    null,
    createElement(
      "div",
      { className: "world" },
      createElement(WorldArea, shared),
    ),
    createElement(
      "div",
      { className: "right" },
      createElement(TileTable, shared),
    ),
  );
}

/** Draws the world area and the table in a root of its own; `show(state)` draws them anew. */
async function draw(document, state) {
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);
  const show = (next) =>
    inAct(() => root.render(createElement(Screen, { state: next })));
  await show(state);
  return { container, show };
}

const worldOf = (container) => container.querySelector(".world-area");
const partsOf = (container) =>
  [...worldOf(container).children].map((part) => [
    part.className,
    part.textContent,
  ]);
const classesOf = (container) => partsOf(container).map(([name]) => name);
const dispatch = (window, element, type, init = {}) =>
  inAct(() => {
    const Kind = type === "pointerout" ? window.MouseEvent : window.Event;
    element.dispatchEvent(new Kind(type, { bubbles: true, ...init }));
  });
const lineOf = (container) => container.querySelector(".tile-line").textContent;
const tileOf = (container, key) =>
  container.querySelector(`.terrain-drawing [data-tile="${key}"]`);
const rowOf = (container, key) =>
  container.querySelector(`.tile-list tbody tr[data-tile="${key}"]`);

// Catches a scene that is not the first part, or a part out of the order of task item 4.
test("the world area stands from the top: the scene, the encounter, the lines of the end, the body row, the lines between the backpack and the drawing, the drawing, the line of a tile", async () => {
  await withPage(async ({ document }) => {
    // Going on, on a solved map: the solved line, the practice and the preview of the bring plan.
    const going = withRun(solvedSent(), {
      lastCombat: WOLF,
      practice: { exploration: 12 },
    });
    const { container, show } = await draw(document, going);
    assert.deepEqual(classesOf(container), [
      "scene",
      "combat-line",
      "body-row",
      "trip-result",
      "run-practice",
      "trip-result",
      "world-drawing",
      "tile-line",
    ]);
    const parts = partsOf(container);
    assert.equal(parts[1][1], WOLF_TEXT);
    assert.equal(
      parts[3][1],
      "Mapa jest już rozwiązana: to przejście nic nie płaci i nic nie bierze ze skrzynki.",
    );
    assert.equal(parts[4][1], "Wprawa w tym przejściu: Eksploracja +12");
    assert.equal(parts[5][1], "Wyniesie: nic");

    // Completed: the deposit stands under the encounter, above the body row; the preview is gone.
    await show(withRun(completed(solvedSent()), { lastCombat: WOLF }));
    assert.deepEqual(classesOf(container), [
      "scene",
      "combat-line",
      "trip-result",
      "body-row",
      "trip-result",
      "world-drawing",
      "tile-line",
    ]);
    const ended = partsOf(container);
    assert.equal(ended[2][1], "Do skrzynki nic nie trafiło.");
    assert.equal(
      ended[4][1],
      "Mapa jest już rozwiązana: to przejście nic nie płaci i nic nie bierze ze skrzynki.",
    );

    // Dead, the resurrection not ready: the settlement under the encounter, in `danger`.
    await show(withRun(died(sent(), 9_000_000), { lastCombat: WOLF }));
    const [scene, combat, settlement, body] = partsOf(container);
    assert.deepEqual(
      [scene[0], combat[0], settlement[0], body[0]],
      ["scene", "combat-line", "trip-result danger", "body-row"],
    );
    assert.equal(
      settlement[1],
      "Wskrzeszenie nie było gotowe: postać straciła całą wprawę i wykupione stopnie. Teraz to pokolenie 2.",
    );
  });
});

// Catches a settlement of a used resurrection drawn in `danger`, or a deposit drawn at death.
test("the line of a death that used a resurrection is not in danger, and a death shows no deposit and no preview", async () => {
  await withPage(async ({ document }) => {
    const { container } = await draw(document, died(sent(), 0));
    const lines = partsOf(container).filter(([name]) =>
      name.startsWith("trip-result"),
    );
    assert.deepEqual(lines, [
      [
        "trip-result",
        "Wskrzeszenie zużyte: wprawa i wykupione stopnie zostają.",
      ],
    ]);
  });
});

// Catches a scene of a size the constant does not give, a text on the picture or a source other than
// the file of the forest. The sizes are the two the task puts to the human (question 1).
test("the scene is the picture of the forest at the size of the scale, with no text inside or over it", async () => {
  assert.deepEqual(sceneSize(1), { width: 336, height: 152 });
  assert.deepEqual(sceneSize(2), { width: 672, height: 304 });
  assert.ok(SCENE_SCALE === 1 || SCENE_SCALE === 2, "the scale is one of two");
  await withPage(async ({ document }) => {
    const { container } = await draw(document, sent());
    const world = worldOf(container);
    const scene = world.firstElementChild;
    assert.equal(scene.nodeName, "IMG");
    assert.equal(scene.getAttribute("src"), "/sprites/forest-scene.png");
    assert.equal(
      scene.getAttribute("width"),
      String(sceneSize(SCENE_SCALE).width),
    );
    assert.equal(
      scene.getAttribute("height"),
      String(sceneSize(SCENE_SCALE).height),
    );
    assert.equal(
      scene.getAttribute("alt"),
      "",
      "a decoration, read as nothing",
    );
    // Nothing inside it, and nothing wrapped round it that could carry text over it (D-272).
    assert.equal(scene.childNodes.length, 0);
    assert.equal(scene.parentElement, world);
  });
});

// Catches a value in `danger` that is not below its threshold, or one below it that is not. The
// thresholds are 35 °C and 30 % (spec Decision 3); the nature energy is never in `danger`.
test("only the value below its threshold stands in danger, and the backpack reads its pieces of the cap", async () => {
  await withPage(async ({ document }) => {
    const base = sent();
    const character = {
      ...base.run.character,
      traits: { ...base.run.character.traits, carryingCapacity: 15 },
      backpack: { ...base.run.character.backpack, stick: 5, berry: 2 },
    };
    const cold = withRun(base, {
      body: { temperature: 34.99, satiety: 82, health: 40 },
      natureEnergy: 90,
      character,
    });
    const { container, show } = await draw(document, cold);
    const values = () => [...container.querySelectorAll(".body-value")];
    const marks = () => values().map((v) => v.classList.contains("danger"));
    assert.deepEqual(
      values().map((v) => v.textContent),
      ["Temperatura 34,9 °C", "Sytość 82 %", "Zdrowie 40", "Energia natury 90"],
    );
    assert.deepEqual(marks(), [true, false, false, false]);
    assert.equal(
      container.querySelector(".backpack-text").textContent,
      "Plecak 7/15: patyk 5, jagoda 2",
    );
    assert.equal(
      container.querySelector(".body-text").textContent,
      "Temperatura 34,9 °C · Sytość 82 % · Zdrowie 40 · Energia natury 90",
    );

    await show(
      withRun(base, {
        body: { temperature: 36.2, satiety: 12, health: 40 },
        natureEnergy: 0,
        character: {
          ...character,
          backpack: { ...character.backpack, stick: 0, berry: 0 },
        },
      }),
    );
    assert.deepEqual(marks(), [false, true, false, false]);
    assert.equal(values()[3].textContent, "Energia natury 0");
    assert.equal(
      container.querySelector(".backpack-text").textContent,
      "Plecak 0/15",
    );
  });
});

// Catches a paragraph kept after the record is gone, or one that does not appear with it.
test("the encounter paragraph is absent without a record and present when one appears", async () => {
  await withPage(async ({ document }) => {
    const { container, show } = await draw(document, sent());
    const paragraph = () => container.querySelector(".combat-line");
    assert.equal(paragraph(), null);
    await show(withRun(sent(), { lastCombat: WOLF }));
    assert.equal(paragraph().textContent, WOLF_TEXT);
    await show(withRun(sent(), { lastCombat: null }));
    assert.equal(paragraph(), null);
  });
});

// Catches a world area that draws something for a game with no map run.
test("without a map run the world area and the table draw nothing", async () => {
  await withPage(async ({ document }) => {
    const { container } = await draw(document, newGame());
    assert.equal(container.querySelector(".world-area"), null);
    assert.equal(container.querySelector(".tile-list"), null);
  });
});

// Catches a drawing that hides a revealed tile's icons, dims one whose stock is not 0, or draws a
// number. Dimmed icons are those of the stock 0 (D-41).
test("the drawing has a tile per tile of the map run, the icons of the resources a revealed tile holds dimmed at a stock of 0, and no text", async () => {
  await withPage(async ({ document }) => {
    const { container } = await draw(document, withTiles());
    const drawing = container.querySelector(".terrain-drawing");
    assert.deepEqual(
      [...drawing.querySelectorAll("[data-tile]")].map((g) => [
        g.getAttribute("data-tile"),
        g.getAttribute("class"),
      ]),
      [
        ["0,0", "tile"],
        ["1,0", "tile revealed"],
        ["0,1", "tile revealed"],
        ["1,1", "tile revealed"],
      ],
    );
    const icons = (key) =>
      [...tileOf(container, key).querySelectorAll("image")].map((icon) => [
        icon.getAttribute("href"),
        icon.getAttribute("class"),
      ]);
    assert.deepEqual(icons("0,0"), [], "a tile not revealed has no icon");
    assert.deepEqual(icons("1,0"), [
      ["/icons/wood-stick.svg", "icon"],
      ["/icons/fern.svg", "icon"],
    ]);
    assert.deepEqual(icons("1,1"), [
      ["/icons/berry-bush.svg", "icon dimmed"],
      ["/icons/flax.svg", "icon"],
    ]);
    assert.equal(drawing.textContent, "");
    assert.equal(drawing.querySelector("title, desc, text"), null);
  });
});

// Catches an outline missing, or the step's target drawn like the character's own (D-41).
test("the character's tile and the step's target carry an outline each, the target apart by its class", async () => {
  await withPage(async ({ document }) => {
    const program = setProgram(
      newKnowingGame(),
      programFromRules({ condition: ALWAYS, action: { kind: "wander" } }),
    ).state;
    const started = send(
      createCharacter(program, "Ala").state,
      SENT,
      1760000000000,
    ).state;
    const state = advanceMinutes(started, 1).state;
    const target = state.run.tiles.find((t) => {
      const to = state.run.current?.stepTo;
      return (
        to !== undefined && to !== null && t.at.q === to.q && t.at.r === to.r
      );
    });
    assert.ok(target, "precondition: the map run is on a step");
    const own = state.run.tiles.find(
      (t) =>
        t.at.q === state.run.character.at.q &&
        t.at.r === state.run.character.at.r,
    );
    const { container } = await draw(document, state);
    const outlines = [
      ...container.querySelectorAll(".terrain-drawing polygon.outline"),
    ];
    assert.deepEqual(
      outlines.map((outline) => outline.getAttribute("class")).sort(),
      ["outline character", "outline step-target"],
    );
    const pointsOf = (key) =>
      tileOf(container, key).querySelector("polygon").getAttribute("points");
    const byClass = (name) =>
      outlines
        .find((outline) => outline.classList.contains(name))
        .getAttribute("points");
    assert.equal(byClass("character"), pointsOf(`${own.col},${own.row}`));
    assert.equal(
      byClass("step-target"),
      pointsOf(`${target.col},${target.row}`),
    );
  });
});

// Catches a drawing that answers a click (D-19), and one that is reached by the keyboard as a control.
test("the drawing is a picture: a click on a tile changes nothing, and nothing in it is a control", async () => {
  await withPage(async ({ document }) => {
    const { container } = await draw(document, withTiles());
    const drawing = container.querySelector(".terrain-drawing");
    const before = lineOf(container);
    await inAct(() => {
      tileOf(container, "1,0").dispatchEvent(
        new document.defaultView.MouseEvent("click", { bubbles: true }),
      );
    });
    assert.equal(lineOf(container), before);
    assert.equal(drawing.querySelector(".hovered, .link-highlight"), null);
    assert.equal(
      drawing.querySelector("button, a, [tabindex], [role], [onclick]"),
      null,
    );
  });
});

// Catches a hovered tile that does not mark its row, a line that shows no numbers, a row that does
// not mark its tile, and a line that does not come back to the character's tile (D-19).
test("a hovered tile marks its row and the line under the drawing shows its numbers; a hovered row marks its tile; with none hovered the line is the character's tile", async () => {
  await withPage(async ({ window, document }) => {
    const { container } = await draw(document, withTiles());
    const drawing = container.querySelector(".terrain-drawing");
    const marked = () => [
      ...[...drawing.querySelectorAll("g.hovered")].map((g) =>
        g.getAttribute("data-tile"),
      ),
      ...[...container.querySelectorAll("tr.hovered")].map((row) =>
        row.getAttribute("data-tile"),
      ),
    ];
    const highlight = () => drawing.querySelector("polygon.link-highlight");

    // With none hovered: the character's tile in the line, nothing marked, no line round a tile.
    assert.equal(lineOf(container), LINE_OF_1_1);
    assert.deepEqual(marked(), []);
    assert.equal(highlight(), null);

    // A tile of the drawing hovered: it and its row marked, the line giving its numbers, and the
    // line around it standing last in the drawing, above every tile and outline.
    await dispatch(
      window,
      tileOf(container, "1,0").querySelector("polygon"),
      "pointerover",
    );
    assert.deepEqual(marked(), ["1,0", "1,0"]);
    assert.equal(lineOf(container), LINE_OF_1_0);
    assert.equal(
      highlight().getAttribute("points"),
      tileOf(container, "1,0").querySelector("polygon").getAttribute("points"),
    );
    assert.equal(drawing.lastElementChild, highlight());
    assert.equal(
      drawing.textContent,
      "",
      "hovering writes no number on the drawing",
    );

    // The pointer over an icon of the tile hovers the tile, as over its polygon.
    await dispatch(
      window,
      tileOf(container, "1,1").querySelector("image"),
      "pointerover",
    );
    assert.deepEqual(marked(), ["1,1", "1,1"]);

    // The pointer leaving the drawing: back to the character's tile.
    await dispatch(window, drawing, "pointerout", { relatedTarget: null });
    assert.deepEqual(marked(), []);
    assert.equal(lineOf(container), LINE_OF_1_1);
    assert.equal(highlight(), null);

    // A row of the table hovered: the tile of the same key marked, and the line giving its numbers.
    await dispatch(
      window,
      rowOf(container, "0,1").querySelector("td"),
      "pointerover",
    );
    assert.deepEqual(marked(), ["0,1", "0,1"]);
    assert.equal(
      lineOf(container),
      "(0, 1): patyk — · jagoda — · mech — · włókno —",
    );

    // The pointer leaving the table, and the head of the table (no row), both hand it back.
    await dispatch(
      window,
      container.querySelector(".tile-list"),
      "pointerout",
      {
        relatedTarget: null,
      },
    );
    assert.deepEqual(marked(), []);
    await dispatch(
      window,
      rowOf(container, "1,0").querySelector("td"),
      "pointerover",
    );
    assert.deepEqual(marked(), ["1,0", "1,0"]);
    await dispatch(
      window,
      container.querySelector(".tile-list thead th"),
      "pointerover",
    );
    assert.deepEqual(marked(), []);
  });
});

// Catches a line that gives the stock of a tile not revealed, which the player has not seen.
test("a hovered tile not revealed marks the tile alone, and the line gives its label with nothing of its stock", async () => {
  await withPage(async ({ window, document }) => {
    const { container } = await draw(document, withTiles());
    await dispatch(
      window,
      tileOf(container, "0,0").querySelector("polygon"),
      "pointerover",
    );
    assert.deepEqual(
      [...container.querySelectorAll("g.hovered")].map((g) =>
        g.getAttribute("data-tile"),
      ),
      ["0,0"],
    );
    assert.equal(
      rowOf(container, "0,0"),
      null,
      "no row for a tile not revealed",
    );
    assert.equal(lineOf(container), "(0, 0)");
  });
});

// The campfire's icon in its tile and its state in the row of the same key (D-70). The program
// below, on a backpack of 9 sticks, explores the entrance (to minute 20), crafts a campfire there
// (to minute 40) and lights it (to minute 45, burning 60 minutes, to minute 105).
const FIRE_PROGRAM = [
  { condition: ALWAYS, action: { kind: "craftCampfire" } },
  { condition: ALWAYS, action: { kind: "lightCampfire" } },
  { condition: ALWAYS, action: { kind: "explore" } },
];

/** The map run of FIRE_PROGRAM, its backpack holding 9 sticks, at the given minute. */
function fireRun(minute) {
  const program = setProgram(
    newKnowingGame(),
    programFromRules(...FIRE_PROGRAM),
  ).state;
  const start = send(
    createCharacter(program, "Ala").state,
    SENT,
    1760000000000,
  ).state;
  const stocked = withRun(start, {
    character: {
      ...start.run.character,
      backpack: { ...start.run.character.backpack, [r[0]]: 9 },
    },
  });
  return advanceMinutes(stocked, minute).state;
}

// Catches a campfire whose icon stands on another tile than its state, one that tells the state on
// the drawing, and one whose state creeps into the line under the drawing.
test("the campfire's icon stands in its tile and its state in the row of the same key, and nowhere else", async () => {
  await withPage(async ({ window, document }) => {
    const { container, show } = await draw(document, fireRun(63));
    for (const [state, text] of [
      [fireRun(63), "ognisko — płonie, zostało 42 min"],
      [fireRun(110), "ognisko — wygasłe"],
    ]) {
      await show(state);
      const icons = [
        ...container.querySelectorAll('image[href="/icons/campfire.svg"]'),
      ];
      assert.equal(icons.length, 1);
      assert.equal(icons[0].getAttribute("class"), "icon");
      assert.equal(icons[0].parentElement.getAttribute("data-tile"), "1,1");
      assert.ok(rowOf(container, "1,1").textContent.includes(text));
      assert.equal(container.querySelector(".terrain-drawing").textContent, "");
      await dispatch(
        window,
        tileOf(container, "1,1").querySelector("polygon"),
        "pointerover",
      );
      assert.equal(lineOf(container).includes("ognisko"), false);
      assert.equal(lineOf(container).includes("płonie"), false);
      assert.equal(lineOf(container).includes("wygasłe"), false);
      await dispatch(
        window,
        container.querySelector(".terrain-drawing"),
        "pointerout",
        {
          relatedTarget: null,
        },
      );
    }
  });
});

// Catches a table that loses a column, a heading or the campfire's cell.
test("the table has a column per resource of the map, a row per revealed tile with the stock, and the fire cell", async () => {
  await withPage(async ({ document }) => {
    const { container } = await draw(document, withTiles());
    const table = container.querySelector("table.tile-list");
    assert.deepEqual(
      [...table.querySelectorAll("thead th")].map((th) =>
        th.textContent.trim(),
      ),
      ["", "patyk", "jagoda", "mech", "włókno", ""],
    );
    assert.deepEqual(
      [...table.querySelectorAll("tbody tr")].map((row) =>
        [...row.children].map((cell) => cell.textContent),
      ),
      [
        ["(1, 0)", "12", "—", "6", "—", ""],
        ["(0, 1)", "—", "—", "—", "—", ""],
        ["(1, 1)", "—", "0", "—", "6", ""],
      ],
    );
    assert.deepEqual(
      [...table.querySelectorAll("tbody tr")].map((row) =>
        row.getAttribute("data-tile"),
      ),
      ["1,0", "0,1", "1,1"],
    );
  });
});
