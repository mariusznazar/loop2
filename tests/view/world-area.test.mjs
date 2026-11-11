// The world area of the screen of a map run in React (task ekran-przejscia, To do 4, 5 and 6; D-311,
// D-19, D-70, D-147, D-185, D-186, D-201, D-215, D-216, D-272, D-314) on jsdom through
// tests/view/page-document.mjs (D-264): the scene, the lines of the
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
import { WorldArea } from "../../dist/browser/view/world-area.js";
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

// Catches a scene that is not the first part, „Teraz” and „Potem” anywhere but right under the scene
// (below the lines of the end, where they would move as those grow), a paragraph of the last encounter
// standing in the world area, which the chronicle holds since task kronika-z-filtrami, To do 6, or a
// part out of the order of task item 4 and of task teraz-i-potem, To do 2 (D-311).
test("the world area stands from the top: the scene, Teraz, Potem, the lines of the end, the body row, the lines between the backpack and the drawing, the drawing, the line of a tile, and no paragraph of the last encounter", async () => {
  await withPage(async ({ document }) => {
    // Going on, on a solved map: the solved line, the practice and the preview of the bring plan.
    const going = withRun(solvedSent(), {
      lastCombat: WOLF,
      practice: { exploration: 12 },
    });
    const { container, show } = await draw(document, going);
    assert.deepEqual(classesOf(container), [
      "scene",
      "now-row",
      "next-row",
      "body-row",
      "trip-result",
      "run-practice",
      "trip-result",
      "world-drawing",
      "tile-line",
    ]);
    const parts = partsOf(container);
    assert.ok(
      parts.every(([, text]) => !text.includes(WOLF_TEXT)),
      "the paragraph of the last encounter stands nowhere in the world area",
    );
    assert.equal(
      parts[4][1],
      "Mapa jest już rozwiązana: to przejście nic nie płaci i nic nie bierze ze skrzynki.",
    );
    assert.equal(parts[5][1], "Wprawa w tym przejściu: Eksploracja +12");
    assert.equal(parts[6][1], "Wyniesie: nic");

    // Completed: the deposit stands under „Potem”, above the body row; the preview is gone.
    await show(withRun(completed(solvedSent()), { lastCombat: WOLF }));
    assert.deepEqual(classesOf(container), [
      "scene",
      "now-row",
      "next-row",
      "trip-result",
      "body-row",
      "trip-result",
      "world-drawing",
      "tile-line",
    ]);
    const ended = partsOf(container);
    assert.equal(ended[3][1], "Do skrzynki nic nie trafiło.");
    assert.equal(
      ended[5][1],
      "Mapa jest już rozwiązana: to przejście nic nie płaci i nic nie bierze ze skrzynki.",
    );

    // Dead, the resurrection not ready: the settlement under „Potem”, in `danger`.
    await show(withRun(died(sent(), 9_000_000), { lastCombat: WOLF }));
    const [scene, now, next, settlement, body] = partsOf(container);
    assert.deepEqual(
      [scene[0], now[0], next[0], settlement[0], body[0]],
      ["scene", "now-row", "next-row", "trip-result danger", "body-row"],
    );
    assert.equal(
      settlement[1],
      "Wskrzeszenie nie było gotowe: postać straciła całą wprawę i wykupione stopnie. Teraz to pokolenie 2.",
    );
  });
});

/** A map run of „Ala” on Las under a program of these rules, in a game that knows every action. */
function sentUnder(...rules) {
  const program = setProgram(
    newKnowingGame(),
    programFromRules(...rules),
  ).state;
  return send(createCharacter(program, "Ala").state, SENT, 1760000000000).state;
}

const rowsOf = (container) => ({
  now: container.querySelector(".world-area > .now-row"),
  next: container.querySelector(".world-area > .next-row"),
});
const textsOf = (row) => ({
  text: row.querySelector(".now-text").textContent,
  right: row.querySelector(".now-right")?.textContent ?? null,
  icon: row.querySelector(".icon-mask")?.style.getPropertyValue("--icon"),
});

// Catches rows that name a rule other than the one under way and the one that wins, an icon of the
// wrong file, minutes that do not follow the game minute, a label of Potem other than its word, or a
// Teraz that grows a progress bar (D-334: none).
test("Teraz and Potem name the action under way with its rule and minutes and the rule that wins, and follow the game minute", async () => {
  await withPage(async ({ document }) => {
    const rules = [
      { condition: ALWAYS, action: { kind: "explore" } },
      { condition: ALWAYS, action: { kind: "wander" } },
    ];
    const started = sentUnder(...rules);
    const { container, show } = await draw(document, started);
    const { now, next } = rowsOf(container);
    assert.deepEqual(textsOf(now), {
      text: "Eksploruj",
      right: "reguła 1.1 · zostało 20 z 20 min",
      icon: 'url("/icons/binoculars.svg")',
    });
    assert.equal(next.querySelector(".next-label").textContent, "Potem");
    assert.deepEqual(textsOf(next), {
      text: "Eksploruj",
      right: "reguła 1.1",
      icon: 'url("/icons/binoculars.svg")',
    });
    assert.equal(
      now.querySelector("progress, [role='progressbar'], .bar"),
      null,
      "no progress bar in Teraz",
    );

    // Five game minutes on: the minutes left fall, the rows stay the same elements in the same place.
    await show(advanceMinutes(started, 5).state);
    assert.equal(rowsOf(container).now, now);
    assert.equal(textsOf(now).right, "reguła 1.1 · zostało 15 z 20 min");
    assert.deepEqual(classesOf(container).slice(0, 3), [
      "scene",
      "now-row",
      "next-row",
    ]);
  });
});

// Catches a wait that names a rule or minutes, or Potem that keeps the rule of a condition that does
// not hold; and the line of no winner in a role other than `warning` (D-335).
test("Teraz says the wait alone, and Potem with no winning rule says the character will stand in the role warning", async () => {
  await withPage(async ({ document }) => {
    const never = { kind: "hereBelow", resource: r[0], value: 0 };
    const { container } = await draw(
      document,
      sentUnder({ condition: never, action: { kind: "explore" } }),
    );
    const { now, next } = rowsOf(container);
    assert.deepEqual(textsOf(now), {
      text: "Czeka — żadna reguła nie pasuje",
      right: null,
      icon: undefined,
    });
    assert.deepEqual(textsOf(next), {
      text: "żadna reguła nie pasuje — postać stanie",
      right: null,
      icon: undefined,
    });
    assert.equal(next.querySelector(".now-text").className, "now-text warning");
    assert.equal(now.querySelector(".now-text").className, "now-text");
  });
});

// Catches the cause of a death in `danger` (D-334) or worded alike for two causes, a completion not in
// `positive` (task teraz-i-potem, question 9), and rows that vanish after the end (D-335, D-334).
test("after a death Teraz says its cause in the role text, after a completion the text of the map in positive, and Potem stays", async () => {
  await withPage(async ({ document }) => {
    const rules = [{ condition: ALWAYS, action: { kind: "explore" } }];
    const { container, show } = await draw(document, sentUnder(...rules));
    const causes = [
      ["cold", "Mag zamarzł"],
      ["hunger", "Mag umarł z głodu"],
      ["combat", "Mag zginął w walce"],
    ];
    for (const [cause, words] of causes) {
      const dead = withRun(sentUnder(...rules), {
        death: { minute: 5, cause },
      });
      await show(dead);
      const { now, next } = rowsOf(container);
      assert.equal(now.querySelector(".now-text").textContent, words);
      assert.equal(now.querySelector(".now-text").className, "now-text");
      assert.equal(now.querySelector(".icon-mask"), null);
      assert.equal(now.querySelector(".now-right"), null);
      assert.equal(next.querySelector(".next-label").textContent, "Potem");
    }

    await show(completed(solvedSent()));
    const { now, next } = rowsOf(container);
    assert.equal(now.querySelector(".now-text").textContent, "Las rozwiązany");
    assert.equal(now.querySelector(".now-text").className, "now-text positive");
    assert.equal(next.querySelector(".next-label").textContent, "Potem");
  });
});

// Catches a fight with an icon, a rule or minutes beside it (D-334, D-147), and a Potem that names no
// rule for the minutes of an attack when a combat rule would be chosen (D-335, D-309).
test("in the minutes of an attack Teraz says the fight alone and Potem names the combat rule the turn would choose", async () => {
  await withPage(async ({ document }) => {
    const state = withRun(
      sentUnder(
        { condition: ALWAYS, action: { kind: "explore" } },
        { condition: ALWAYS, action: { kind: "kick" } },
      ),
      {
        current: null,
        activeCombat: { creatureId: "wolf", attackMinute: 0, resolveMinute: 5 },
        lastCombat: { ...WOLF, attackMinute: 0, resolveMinute: 5 },
      },
    );
    const { container } = await draw(document, state);
    const { now, next } = rowsOf(container);
    assert.equal(
      now.querySelector(".now-text").textContent,
      "Walczy z wilkiem",
    );
    assert.equal(now.querySelector(".icon-mask"), null);
    assert.equal(now.querySelector(".now-right"), null);
    assert.deepEqual(textsOf(next), {
      text: "Kopnij",
      right: "reguła 1.2",
      icon: 'url("/icons/boot-kick.svg")',
    });
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

// Catches a second size of the scene (D-349) — one that follows the width of the window or the game
// state — a size other than 672 × 304 on the background, a text on the picture or a background other
// than the file of the forest. The scene is no longer one `img`: since the task scena-z-ludzikiem
// (To do 1 and 7) it is a frame that holds the forest as its background image and the props, the
// campfire, the mage and the badge over it (D-316, D-320), so the case reads the size and the source
// from the background and the absence of text from the whole frame. The one size is twice the
// picture of 336 × 152 (D-349, task proporcje-sceny-i-programu, To do 4).
test("the scene is the picture of the forest at the one size of D-349, with no text inside or over it", async () => {
  await withPage(async ({ window, document }) => {
    const { container, show } = await draw(document, sent());
    // The one size holds in a narrow window and in a wide one, and for another state of the game.
    for (const [width, state] of [
      [800, completed(sent())],
      [1920, sent()],
    ]) {
      Object.defineProperty(window, "innerWidth", {
        value: width,
        configurable: true,
      });
      await inAct(() => window.dispatchEvent(new window.Event("resize")));
      await show(state);
      const picture = worldOf(container).querySelector(".scene-background");
      assert.equal(picture.getAttribute("width"), "672", `in ${width} px`);
      assert.equal(picture.getAttribute("height"), "304", `in ${width} px`);
      assert.equal(
        worldOf(container).querySelector(".scene").getAttribute("style"),
        null,
        "the frame is sized by its picture alone",
      );
    }
    const world = worldOf(container);
    const scene = world.firstElementChild;
    assert.equal(scene.className, "scene");
    assert.equal(scene.parentElement, world);
    const background = scene.querySelector(".scene-background");
    assert.equal(background.nodeName, "IMG");
    assert.equal(background.getAttribute("src"), "/sprites/forest-scene.png");
    assert.equal(background.getAttribute("width"), "672");
    assert.equal(background.getAttribute("height"), "304");
    assert.equal(
      background.getAttribute("alt"),
      "",
      "a decoration, read as nothing",
    );
    assert.equal(
      scene.getAttribute("aria-hidden"),
      "true",
      "the whole frame is a decoration",
    );
    // No text in it or over it (D-272): the frame holds none, and none stands wrapped round it.
    assert.equal(scene.textContent, "");
    for (const image of scene.querySelectorAll("img")) {
      assert.equal(
        image.getAttribute("alt"),
        "",
        "every picture is a decoration",
      );
    }
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
    // The case that read the four values joined by „ · ” in one line changes with row 7 of the task
    // (D-337): each value stands in a cell of its own, and no separator stands between the cells.
    const cells = [...container.querySelectorAll(".body-cell")];
    assert.equal(cells.length, 4);
    assert.ok(
      cells.every((cell) => cell.querySelector(".body-value") !== null),
      "every cell holds its value",
    );
    assert.equal(
      container.querySelector(".body-cells").textContent.includes(" · "),
      false,
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

/** The notes of the body row on the screen: the text of a cell's note and whether it stands in danger. */
const notesOf = (container) =>
  [...container.querySelectorAll(".body-cell")].map((cell) => {
    const note = cell.querySelector(".body-note");
    return note === null
      ? null
      : [note.textContent, note.classList.contains("danger")];
  });

// Catches a note in the same line as its value (D-337 rejects it), a note under health or nature
// energy, notes missing at game minute zero before anything is discovered (D-125), or minutes that
// differ from the game's: on Las from the starting body (37 °C, 100 %) the 83rd minute ends at
// 37 − 83 × 0.024 = 35.008 °C and the 116th at 100 − 116 × 0.6 = 30.4 %, worked out by hand as in
// tests/sim/body.test.mjs.
test("the body row stands in cells with the minutes of the needs under temperature and satiety from game minute zero, none under health and nature energy", async () => {
  await withPage(async ({ document }) => {
    const started = sent();
    assert.equal(started.run.minute, 0, "precondition: game minute zero");
    const { container } = await draw(document, started);
    const cells = [...container.querySelectorAll(".body-cell")];
    assert.deepEqual(
      cells.map((cell) => cell.querySelector(".body-value").textContent),
      [
        "Temperatura 37,0 °C",
        "Sytość 100 %",
        "Zdrowie 100",
        "Energia natury 100",
      ],
    );
    assert.deepEqual(notesOf(container), [
      ["bez ognia 83 min", false],
      ["bez jedzenia 116 min", false],
      null,
      null,
    ]);
    // A note stands under its value in the same cell, not after it in the line of the value.
    assert.equal(
      cells[0].querySelector(".body-value").textContent.includes("min"),
      false,
    );
  });
});

// Catches „marznie” or „głoduje” not in danger, a note in danger above its threshold, and the minutes
// kept past the threshold. At 35,0 °C and 30 % the character is not yet chilled or starving.
test("a note under temperature and one under satiety read „marznie” and „głoduje” in danger below their thresholds and the minutes at them", async () => {
  await withPage(async ({ document }) => {
    const base = sent();
    const { container, show } = await draw(
      document,
      withRun(base, {
        body: { temperature: 34.99, satiety: 29.99, health: 50 },
      }),
    );
    assert.deepEqual(notesOf(container), [
      ["marznie", true],
      ["głoduje", true],
      null,
      null,
    ]);
    await show(
      withRun(base, { body: { temperature: 35, satiety: 30, health: 50 } }),
    );
    assert.deepEqual(notesOf(container), [
      ["bez ognia 0 min", false],
      ["bez jedzenia 0 min", false],
      null,
      null,
    ]);
  });
});

// Catches „bez ognia {n} min” beside a fire on the character's tile, and an unlit map shown as cooling.
test("by a fire the note under temperature reads „przy ogniu”, and the notes follow the game minute", async () => {
  await withPage(async ({ document }) => {
    const base = sent();
    const at = base.run.character.at;
    const { container, show } = await draw(
      document,
      withRun(base, { campfires: [{ at, minutesLeft: 40 }] }),
    );
    assert.deepEqual(notesOf(container)[0], ["przy ogniu", false]);
    assert.deepEqual(notesOf(container)[1], ["bez jedzenia 116 min", false]);
    // The fire gone, the same state again reads minutes.
    await show(base);
    assert.deepEqual(notesOf(container)[0], ["bez ognia 83 min", false]);
  });
});

// Catches notes dropped after the end of a map run (D-337): after a death the notes read the state at
// the stopped minute — „marznie” after a death of cold, „głoduje” after one of hunger — and after a
// completion the minutes of the body at game minute 480.
test("the notes stand after the end of a map run, on the state at the stopped minute", async () => {
  await withPage(async ({ document }) => {
    const base = sent();
    const { container, show } = await draw(
      document,
      withRun(base, {
        body: { temperature: 34.2, satiety: 60, health: 0 },
        death: { minute: 5, cause: "cold" },
      }),
    );
    assert.deepEqual(notesOf(container)[0], ["marznie", true]);
    assert.deepEqual(notesOf(container)[1], ["bez jedzenia 50 min", false]);

    await show(
      withRun(base, {
        body: { temperature: 36, satiety: 20, health: 0 },
        death: { minute: 5, cause: "hunger" },
      }),
    );
    assert.deepEqual(notesOf(container)[1], ["głoduje", true]);

    // The real thing: a map run played to a death on the default program and settled. It ends in
    // cold with the body below both thresholds, so both notes stand in danger.
    const dead = died(sent(), 9_000_000);
    assert.equal(dead.run.death.cause, "cold", "precondition: died of cold");
    assert.ok(dead.run.body.temperature < 35 && dead.run.body.satiety < 30);
    await show(dead);
    assert.deepEqual(notesOf(container), [
      ["marznie", true],
      ["głoduje", true],
      null,
      null,
    ]);

    // A completion: one game minute from 479 leaves 36.976 °C and 99.4 %; 82 more minutes keep the
    // body at or above 35.0 (82 × 0.024 = 1.968), 115 keep satiety at or above 30 (115 × 0.6 = 69).
    await show(completed(sent()));
    assert.deepEqual(notesOf(container), [
      ["bez ognia 82 min", false],
      ["bez jedzenia 115 min", false],
      null,
      null,
    ]);
  });
});

// Catches the paragraph of the last encounter drawn in the world area, at its old place under „Teraz”
// and „Potem” or anywhere else, while the map run holds a record of one (task kronika-z-filtrami,
// To do 6; D-311, D-147): it stands in the chronicle in the area with the tabs alone.
test("the world area draws no paragraph of the last encounter, with a record of one or without", async () => {
  await withPage(async ({ document }) => {
    const { container, show } = await draw(document, sent());
    const paragraph = () => container.querySelector(".combat-line");
    const wordsOfWorld = () => worldOf(container).textContent;
    assert.equal(paragraph(), null);
    await show(withRun(sent(), { lastCombat: WOLF }));
    assert.equal(paragraph(), null);
    assert.ok(!wordsOfWorld().includes("Napada wilk"));
    const resolved = withRun(sent(), {
      lastCombat: {
        ...WOLF,
        result: {
          characterHealth: 93,
          creatureHealth: 24,
          outcome: "creatureDeparted",
          ruleStarts: {},
          exchanges: [],
        },
      },
    });
    await show(resolved);
    assert.equal(paragraph(), null);
    assert.ok(!wordsOfWorld().includes("Wilk"));
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
    // Each icon is the mask of its file, which the stylesheet colours in `text-strong`.
    const icons = (key) =>
      [...tileOf(container, key).querySelectorAll("foreignObject")].map(
        (icon) => [
          icon.querySelector(".icon-mask").style.getPropertyValue("--icon"),
          icon.getAttribute("class"),
        ],
      );
    assert.deepEqual(icons("0,0"), [], "a tile not revealed has no icon");
    assert.deepEqual(icons("1,0"), [
      ['url("/icons/wood-stick.svg")', "icon"],
      ['url("/icons/fern.svg")', "icon"],
    ]);
    assert.deepEqual(icons("1,1"), [
      ['url("/icons/berry-bush.svg")', "icon dimmed"],
      ['url("/icons/flax.svg")', "icon"],
    ]);
    assert.equal(
      drawing.querySelector("image"),
      null,
      "no icon is drawn as a picture of its file, which holds its own colour",
    );
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
      tileOf(container, "1,1").querySelector(".icon-mask"),
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

// Catches a campfire whose icon stands on another tile than its state, one drawn with the icon of
// the other state, one that writes the words or minutes of its state on the drawing, and one whose
// state creeps into the line under the drawing.
test("the campfire's icon stands in its tile and its state in the row of the same key, and nowhere else", async () => {
  await withPage(async ({ window, document }) => {
    const { container, show } = await draw(document, fireRun(63));
    for (const [state, text, file] of [
      [fireRun(63), "ognisko — płonie, zostało 42 min", "campfire.svg"],
      [fireRun(110), "ognisko — wygasłe", "wood-pile.svg"],
    ]) {
      await show(state);
      // Whichever state the campfire is in, one campfire icon stands, and it is the state's own.
      const icons = [
        ...container.querySelectorAll(".terrain-drawing foreignObject"),
      ].filter((icon) =>
        ["campfire.svg", "wood-pile.svg"].some((name) =>
          icon
            .querySelector(".icon-mask")
            .style.getPropertyValue("--icon")
            .includes(name),
        ),
      );
      assert.equal(icons.length, 1);
      assert.equal(
        icons[0].querySelector(".icon-mask").style.getPropertyValue("--icon"),
        `url("/icons/${file}")`,
      );
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
    // Each heading's icon is the mask of its resource's file, in the colour of the heading, and is
    // no picture of the file (D-43).
    assert.deepEqual(
      [...table.querySelectorAll("thead th .icon-mask")].map((icon) =>
        icon.style.getPropertyValue("--icon"),
      ),
      [
        'url("/icons/wood-stick.svg")',
        'url("/icons/berry-bush.svg")',
        'url("/icons/fern.svg")',
        'url("/icons/flax.svg")',
      ],
    );
    assert.equal(table.querySelector("img"), null);
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
