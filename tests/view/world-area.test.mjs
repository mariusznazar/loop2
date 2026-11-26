// The world area of the screen of a map run in React (D-311, D-19, D-70, D-147, D-185, D-186,
// D-201, D-215, D-216, D-272, D-314) on jsdom through
// tests/view/page-document.mjs (D-264): the scene, the rows, the body row with the backpack, the lines
// between the backpack and the drawing, the drawing
// and the line of a tile under it, and the table of revealed tiles that stands in another area
// and shares the hovered tile with the drawing. Real events and the look are checked in the
// browser (D-88), so a hover case here holds only what jsdom shows. Every comparison is of plain
// data or of a handful of words (D-268).
import { assert, inAct, withPage } from "./page-document.mjs";
import { gameStylesheetText } from "./game-stylesheets.mjs";
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
import { BALANCE } from "../../dist/browser/sim/data/balance.js";
import { TileTable } from "../../dist/browser/view/tile-table.js";
import { WorldArea } from "../../dist/browser/view/world-area.js";
import { programFromRules } from "../sim/program-fixture.mjs";
import {
  newKnowingGame,
  withEdgeSolved,
} from "../sim/understanding-fixture.mjs";

// The game's stylesheets as the page links them (D-421), read as one text.
const STYLES = gameStylesheetText();
const SENT = { mapId: "forest", characterId: 1 };
const ALWAYS = { kind: "always" };

/** The map's resource ids in the map's order: r[0] … r[3]. */
const r = MAPS.forest.resources.map((resource) => resource.id);

const entry = (item, count) => ({ item, count });
const PLAN = { take: [entry("stick", 5)], bring: [entry("stick", 3)] };

/** A map run of the character „Ala” on Las under the given trip plan, a chest of ten sticks. */
function sent(tripPlan = PLAN, practice = true) {
  let state = createCharacter(withEdgeSolved(newGame()), "Ala").state;
  if (practice) {
    // One practice in each skill, so that a death goes by the team's resurrection (D-190): the death of
    // a character with no practice uses none, whatever `died` puts on the team.
    state = {
      ...state,
      team: {
        ...state.team,
        characters: state.team.characters.map((character) => ({
          ...character,
          skills: Object.fromEntries(
            Object.entries(character.skills).map(([id, skill]) => [
              id,
              { ...skill, practice: skill.practice + 1 },
            ]),
          ),
        })),
      },
    };
  }
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
    { ...sent(), run: null, solvedMaps: ["forestEdge", "forest"] },
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

/**
 * The state's run played on to the character's death and settled at the real moment 1_000, with
 * `usesSpent` uses of the team's resurrection spent before the death; a spent use returns at the
 * moment 9_000_000, after the settlement (D-190).
 */
function died(state, usesSpent) {
  let dying = {
    ...state,
    team: {
      ...state.team,
      resurrectionUsesSpent: usesSpent,
      resurrectionNextReturnAtMs: usesSpent > 0 ? 9_000_000 : null,
    },
  };
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
  "Napada wilk (24/24). Wilk: Zdrowie poniżej 8 pkt → Odskocz; Zawsze → Uderz.";

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

// Catches a scene whose place is not the first part, „Teraz” and „Potem” anywhere but right under it,
// a paragraph of the last encounter standing in the world area, which the chronicle holds (D-147), a
// part out of the order D-311 gives, or a line of the deposit or of a death's settlement standing in
// the world area, which the window of the end holds (D-185, D-216, D-311).
test("the world area stands from the top: the scene, Teraz, Potem, the body row, the lines between the backpack and the drawing, the drawing, the line of a tile, and no line of the end and no paragraph of the last encounter", async () => {
  // decision: D-215 "On the screen of a manual run of a solved map, from game minute zero until „Restart” or „Zakończ”, below the body row and the backpack and above the line of the practice of the run (D-201), the line „Mapa jest już rozwiązana: to przejście nie płaci wprawy; zapas bierze ze skrzynki i wynosi do niej jak każde inne.” stands in `text-secondary`"
  // decision: D-147 "From an attack the map run keeps its last encounter's facts and shows a wrapping paragraph in `text` as an entry of the chronicle in the game minute of the attack, which adds the turns while the encounter lasts: before the turns it gives the creature's starting health and program formatted from its action pairs, and after them it gives each action and its outcome in order, followed by the encounter's result"
  // decision: D-186 "During a map run, below the backpack, „Wyniesie: {item} {count}, …” in `text-secondary` gives what completion in that game minute would put in the chest from the frozen bring list, clipped by the backpack, free chest room and the map's exit cap"
  // decision: D-186 "The line stands when the snapshot lists something or differs from the copy's bring list, reads „Wyniesie: nic” when that transfer is empty, and disappears after death and completion"
  // decision: D-201 "Below the body row the map-run view shows a line in the role `text`, „Wprawa w tym przejściu: {umiejętność} +{n} · …”, listing the skills with positive practice gathered in that run"
  // decision: D-201 "Zero-valued skills and the line at zero are absent, and the positive line remains after death and completion until „Restart” or „Zakończ”"
  // decision: D-201 "On a manual run of a solved map, which pays no practice (D-189), the line reads „Wprawa zebrana w tym przejściu, która nie wejdzie do umiejętności: {umiejętność} +{n} · …” in the role `text-secondary` instead"
  // decision: D-334 "Under the scene of the screen of a map run the row „Teraz”"
  // decision: D-335 "Under „Teraz” the row „Potem” holds the word „Potem”, the icon and the action of the program rule that wins now"
  // decision: D-311 "The world holds, from the top, the scene, „Teraz” and „Potem”, the body row"
  // decision: D-311 "After a character's death or a completion that window (D-368) stands in place of this screen"
  await withPage(async ({ document }) => {
    // Going on, on a solved map: the solved line, the practice and the preview of the bring plan.
    const going = withRun(solvedSent(), {
      lastCombat: WOLF,
      practice: { exploration: 12 },
    });
    const { container, show } = await draw(document, going);
    assert.deepEqual(classesOf(container), [
      "scene-place",
      "now-row",
      "next-row",
      "body-row",
      "trip-result",
      "run-practice unpaid",
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
      "Mapa jest już rozwiązana: to przejście nie płaci wprawy; zapas bierze ze skrzynki i wynosi do niej jak każde inne.",
    );
    // The run pays no practice (D-189), so its line says what the practice is and that it does not
    // enter the skills (D-201).
    assert.equal(
      parts[5][1],
      "Wprawa zebrana w tym przejściu, która nie wejdzie do umiejętności: Eksploracja +12",
    );
    // A run going on on a solved map shows the preview of what it brings out, as any map run does (D-186,
    // D-189): the three sticks the bring list asks for.
    assert.equal(parts[6][1], "Wyniesie: patyk 3");

    // Completed: no deposit line under „Potem” (D-185: the window holds it); the solved line stays,
    // and the preview is gone.
    await show(withRun(completed(solvedSent()), { lastCombat: WOLF }));
    assert.deepEqual(classesOf(container), [
      "scene-place",
      "now-row",
      "next-row",
      "body-row",
      "trip-result",
      "world-drawing",
      "tile-line",
    ]);
    const ended = partsOf(container);
    assert.equal(
      ended[4][1],
      "Mapa jest już rozwiązana: to przejście nie płaci wprawy; zapas bierze ze skrzynki i wynosi do niej jak każde inne.",
    );
    assert.ok(
      ended.every(([, text]) => !text.includes("Do skrzynki")),
      "the deposit stands nowhere in the world area",
    );

    // Dead, with no use of the resurrection left: no settlement line in the world area (D-216: the
    // window holds it, in its section about what the death cost); the practice of the run stays after
    // the death (D-201).
    const usedUp = died(sent(), BALANCE.resurrectionUses);
    assert.equal(usedUp.run.deathSettlement.kind, "progressLost");
    await show(withRun(usedUp, { lastCombat: WOLF }));
    assert.deepEqual(classesOf(container), [
      "scene-place",
      "now-row",
      "next-row",
      "body-row",
      "run-practice",
      "world-drawing",
      "tile-line",
    ]);
    assert.ok(
      partsOf(container).every(([, text]) => !/skrzeszeni/i.test(text)),
      "the settlement stands nowhere in the world area",
    );

    // Dead with no practice yet, a use of the resurrection left or none: the window's line of it
    // („Postać nie miała jeszcze wprawy, więc śmierć nie zabrała drużynie żadnego użycia wskrzeszenia.”)
    // stands nowhere in the world area either.
    for (const usesSpent of [0, BALANCE.resurrectionUses]) {
      const bare = died(sent(PLAN, false), usesSpent);
      assert.deepEqual(bare.run.deathSettlement, { kind: "noPractice" });
      await show(withRun(bare, { lastCombat: WOLF }));
      assert.ok(
        partsOf(container).every(
          ([, text]) => !/skrzeszeni|wprawy/i.test(text),
        ),
        "the line of a death with no practice stands nowhere in the world area",
      );
    }
  });
});

/** A map run of „Ala” on Las under a program of these rules, in a game that knows every action. */
function sentUnder(...rules) {
  const program = setProgram(
    withEdgeSolved(newKnowingGame()),
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
  // decision: D-334 "Under the scene of the screen of a map run the row „Teraz”"
  // decision: D-335 "Under „Teraz” the row „Potem” holds the word „Potem”, the icon and the action of the program rule that wins now"
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
      "scene-place",
      "now-row",
      "next-row",
    ]);
  });
});

// Catches a wait that names a rule or minutes, or Potem that keeps the rule of a condition that does
// not hold; and the line of no winner in a role other than `warning` (D-335).
test("Teraz says the wait alone, and Potem with no winning rule says the character will stand in the role warning", async () => {
  // decision: D-334 "Under the scene of the screen of a map run the row „Teraz”"
  // decision: D-335 "Under „Teraz” the row „Potem” holds the word „Potem”, the icon and the action of the program rule that wins now"
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
// `positive` (D-132), and rows that vanish after the end (D-335, D-334).
test("after a death Teraz says its cause in the role text, after a completion the text of the map in positive, and Potem stays", async () => {
  // decision: D-132 "After a completion the screen stays on the state of the game minute of the completion and time stands still for that map run, and „Teraz” reads the map's completion text, in Las „Las rozwiązany” and in Las — głębiej „Las — głębiej rozwiązany”, in the role `positive`"
  // decision: D-147 "„Teraz” reads „Walczy z wilkiem” throughout the combat minutes, including the resolution minute even if the next ordinary action starts there, while death or completion takes precedence and combat death reads „Mag zginął w walce”"
  // decision: D-334 "In the minutes of an attack it holds „Walczy z wilkiem” alone"
  // decision: D-334 "After a character's death it reads the cause of the death in the role `text`"
  // decision: D-335 "The row says the state of the current game minute"
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
  // decision: D-147 "„Teraz” reads „Walczy z wilkiem” throughout the combat minutes, including the resolution minute even if the next ordinary action starts there, while death or completion takes precedence and combat death reads „Mag zginął w walce”"
  // decision: D-334 "In the minutes of an attack it holds „Walczy z wilkiem” alone"
  // decision: D-335 "Under „Teraz” the row „Potem” holds the word „Potem”, the icon and the action of the program rule that wins now"
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

// Catches the settlement of a death drawn in the world area, the line that the window of the end holds
// (D-216, its section about what the death cost), or a deposit drawn at death (D-185).
test("a death that used a resurrection shows no line of its settlement and no deposit and no preview in the world area", async () => {
  // decision: D-186 "The line stands when the snapshot lists something or differs from the copy's bring list, reads „Wyniesie: nic” when that transfer is empty, and disappears after death and completion"
  await withPage(async ({ document }) => {
    const used = died(sent(), 0);
    assert.equal(used.run.deathSettlement.kind, "resurrectionUsed");
    const { container } = await draw(document, used);
    const lines = partsOf(container).filter(([name]) =>
      name.startsWith("trip-result"),
    );
    assert.deepEqual(lines, []);
  });
});

// Catches a scene whose picture is not given 672 × 304 px (D-349) — a size other than that on the
// background, a frame sized by anything but its picture, a text on the picture or a background other
// than the file of the forest. The scene is not one `img`: it is a frame that holds the forest as its
// background image and the props, the campfire, the mage and the badge over it (D-316, D-320), so
// the case reads the size and the source from the background and the absence of text from the whole
// frame. 672 × 304 px is twice the picture of 336 × 152 (D-349). The smaller drawing of the phone
// layout is a rule of the stylesheet in its `@media` block, which jsdom does not apply, so the
// attributes stay 672 × 304 here.
test("the scene is the picture of the forest at 672 × 304 px, with no text inside or over it", async () => {
  // decision: D-349 "The scene has two sizes, one and two times its picture of 336 × 152 px: 672 × 304 px in the computer layout"
  // decision: D-272 "A picture of the game stands behind the login card"
  await withPage(async ({ window, document }) => {
    const { container, show } = await draw(document, sent());
    // The attributes give 672 × 304 px in a narrow window and in a wide one, and for another state of the game.
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
    // The scene stands alone in its place, the first part of the world area, which clips and centres
    // it and gives it no size: the frame keeps its picture's (D-349).
    const world = worldOf(container);
    const place = world.firstElementChild;
    assert.equal(place.className, "scene-place");
    assert.equal(place.children.length, 1);
    assert.equal(place.getAttribute("style"), null);
    const scene = place.firstElementChild;
    assert.equal(scene.className, "scene");
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

// Catches the paragraph of the last encounter drawn in the world area, at its old place under „Teraz”
// and „Potem” or anywhere else, while the map run holds a record of one (D-311, D-147): it stands
// in the chronicle in the area with the tabs alone.
test("the world area draws no paragraph of the last encounter, with a record of one or without", async () => {
  // decision: D-147 "From an attack the map run keeps its last encounter's facts and shows a wrapping paragraph in `text` as an entry of the chronicle in the game minute of the attack, which adds the turns while the encounter lasts: before the turns it gives the creature's starting health and program formatted from its action pairs, and after them it gives each action and its outcome in order, followed by the encounter's result"
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

/**
 * A property of an element as the game's stylesheets, laid on its page, give it, as `computed` of
 * `scene.test.mjs` does: the page is the test's own jsdom page, whose first import started the
 * memory limit.
 */
function computed(element, property) {
  const { document, getComputedStyle } = element.ownerDocument.defaultView;
  if (!document.querySelector("style[data-test-styles]")) {
    const style = document.createElement("style");
    style.setAttribute("data-test-styles", "");
    style.textContent = STYLES;
    document.head.append(style);
  }
  return getComputedStyle(element).getPropertyValue(property);
}

// Catches the line of practice of a run that pays none drawn in `text`, as a gain, and the line of a run
// that pays drawn in a role other than `text`.
test("the practice of a manual run of a solved map stands in text-secondary, and the practice of a run that pays in text", async () => {
  // decision: D-201 "Below the body row the map-run view shows a line in the role `text`, „Wprawa w tym przejściu: {umiejętność} +{n} · …”, listing the skills with positive practice gathered in that run"
  // decision: D-201 "On a manual run of a solved map, which pays no practice (D-189), the line reads „Wprawa zebrana w tym przejściu, która nie wejdzie do umiejętności: {umiejętność} +{n} · …” in the role `text-secondary` instead"
  await withPage(async ({ document }) => {
    const { container, show } = await draw(
      document,
      withRun(solvedSent(), { practice: { exploration: 12 } }),
    );
    const line = () => container.querySelector(".run-practice");
    assert.equal(computed(line(), "color"), "var(--text-secondary)");
    await show(withRun(sent(), { practice: { exploration: 12 } }));
    assert.equal(line().textContent, "Wprawa w tym przejściu: Eksploracja +12");
    assert.equal(computed(line(), "color"), "var(--text)");
  });
});

// Catches an icon of the drawing that does not stand in `text-strong` (D-40, D-43) — it would take
// the `text` of the panel around the drawing — and a stock of 0 that does not dim it by `depleted`
// (D-41). The values are those of the stylesheet's rules, read as the tokens they name.
test("the icons of the drawing take the colour text-strong, the icon of a stock of 0 dimmed by depleted", async () => {
  // decision: D-40 "The badge over the mage's head stands on `panel` and the track of its progress bar in `highlight`, and the icon in the badge stands in `text-strong`, though it is no text and no text stands beside it; so does the icon flying to the mage, on its plaque in `panel`, and so do the icons of the drawing of the map, on `tile-revealed`"
  // decision: D-41 "`link-highlight` means that this tile and this row of the list of revealed tiles are the same place, `depleted` that what was here is gone"
  // decision: D-43 "None is `0`, a percentage, a size in `fr`, `vw` or `vh`, a keyword such as `transparent`, `currentColor`, `inherit` or `none`, a screen-width threshold of an `@media` rule, the geometry of the terrain drawing or of the scene computed in TypeScript, the frames and positions of a sprite, the `width` and `height` attributes of an image, a layout dimension — a width or height with its minimum and maximum, or the sizes of the columns of a layout grid — or the content of an icon file in `assets/icons/`, which is drawn as a mask and takes its colour from the text beside it or, where no text stands beside it — in the badge over the mage's head, on the plaque of the icon flying to the mage and in the drawing of the map — from `text-strong`"
  await withPage(async ({ document }) => {
    const { container } = await draw(document, withTiles());
    const frames = [...container.querySelectorAll(".terrain-drawing .icon")];
    assert.ok(frames.length > 0, "the drawing holds icons");
    for (const frame of frames) {
      assert.equal(computed(frame, "color"), "var(--text-strong)");
      assert.equal(
        computed(frame.querySelector(".icon-mask"), "color"),
        "var(--text-strong)",
      );
    }
    const dimmed = frames.filter((frame) => frame.classList.contains("dimmed"));
    assert.equal(dimmed.length, 1, "one icon stands at a stock of 0");
    assert.equal(computed(dimmed[0], "opacity"), "var(--depleted)");
    for (const frame of frames.filter((each) => !dimmed.includes(each)))
      assert.notEqual(computed(frame, "opacity"), "var(--depleted)");
  });
});

// Catches a drawing that hides a revealed tile's icons, dims one whose stock is not 0, or draws a
// number. Dimmed icons are those of the stock 0 (D-41).
test("the drawing has a tile per tile of the map run, the icons of the resources a revealed tile holds dimmed at a stock of 0, and no text", async () => {
  // decision: D-41 "In the browser view `character` means that here is the character and here it is going, the target of its current move told from its place by shape, a thin dashed line in place of a thick solid one, never by colour; `tile-hidden` means a place not yet known, `tile-revealed` a place known, whose icons say what lies there"
  // decision: D-43 "None is `0`, a percentage, a size in `fr`, `vw` or `vh`, a keyword such as `transparent`, `currentColor`, `inherit` or `none`, a screen-width threshold of an `@media` rule, the geometry of the terrain drawing or of the scene computed in TypeScript, the frames and positions of a sprite, the `width` and `height` attributes of an image, a layout dimension — a width or height with its minimum and maximum, or the sizes of the columns of a layout grid — or the content of an icon file in `assets/icons/`, which is drawn as a mask and takes its colour from the text beside it or, where no text stands beside it — in the badge over the mage's head, on the plaque of the icon flying to the mage and in the drawing of the map — from `text-strong`"
  // decision: D-125 "The body row, the backpack, the list of revealed tiles and the drawing of the game map show what the game state holds, whatever the Understanding holds: the body row shows satiety before the condition „Sytość poniżej” is discovered, and the backpack, the list of revealed tiles and the drawing of the game map show every item they hold"
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
  // decision: D-41 "In the browser view `character` means that here is the character and here it is going"
  await withPage(async ({ document }) => {
    const program = setProgram(
      withEdgeSolved(newKnowingGame()),
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
  // decision: D-19 "The drawing of the game map is a picture, not a control: its only interactions are hovering a tile"
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
  // decision: D-41 "`link-highlight` means that this tile and this row of the list of revealed tiles are the same place"
  // decision: D-19 "The drawing of the game map is a picture, not a control: its only interactions are hovering a tile and tapping it, each of which marks the tile's row in the list of revealed tiles, and the numbers of stock stand in that list and in the line under the drawing, which shows the hovered or the tapped tile or else the character's tile"
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

// Catches a line of `link-highlight` drawn round a tile not revealed, which has no row in the table to
// be the same place as (D-41), and a line under the drawing that gives the stock of such a tile, which
// the player has not seen. The line round a revealed tile is the case above.
test("a hovered tile not revealed draws no line of link-highlight and marks no row, and the line under the drawing gives its label with nothing of its stock", async () => {
  // decision: D-41 "`link-highlight` means that this tile and this row of the list of revealed tiles are the same place"
  // decision: D-19 "The drawing of the game map is a picture, not a control: its only interactions are hovering a tile and tapping it, each of which marks the tile's row in the list of revealed tiles"
  await withPage(async ({ window, document }) => {
    const { container } = await draw(document, withTiles());
    const drawing = container.querySelector(".terrain-drawing");
    await dispatch(
      window,
      tileOf(container, "0,0").querySelector("polygon"),
      "pointerover",
    );
    assert.equal(
      drawing.querySelector("polygon.link-highlight"),
      null,
      "no line round a tile not revealed",
    );
    assert.equal(
      container.querySelector("tr.hovered"),
      null,
      "no row of the table marked",
    );
    assert.equal(
      rowOf(container, "0,0"),
      null,
      "no row for a tile not revealed",
    );
    assert.equal(lineOf(container), "(0, 0)");

    // From it to a revealed tile: the line stands round that tile and its row is marked.
    await dispatch(
      window,
      tileOf(container, "1,0").querySelector("polygon"),
      "pointerover",
    );
    assert.equal(
      drawing.querySelector("polygon.link-highlight").getAttribute("points"),
      tileOf(container, "1,0").querySelector("polygon").getAttribute("points"),
    );
    assert.equal(
      container.querySelector("tr.hovered").getAttribute("data-tile"),
      "1,0",
    );
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
    withEdgeSolved(newKnowingGame()),
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
  // decision: D-70 "A campfire shows on the drawing of the game map as an icon on its tile, one icon for a burning campfire and one for an extinguished one, and its minutes left stand in the tile's row of the list of revealed tiles"
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

// Catches a fire cell whose texts are one run of words, which a cell too wide for its area would break
// inside a name, or whose separator or order is lost (D-70, D-385). The breaking itself is the look,
// checked in the browser (D-88).
test("the fire cell of a tile with a campfire and a burning stick gives each text in a span of its own, joined by a dot", async () => {
  // decision: D-70 "A campfire shows on the drawing of the game map as an icon on its tile, one icon for a burning campfire and one for an extinguished one, and its minutes left stand in the tile's row of the list of revealed tiles"
  await withPage(async ({ document }) => {
    const at = TILES[1].at;
    const state = withRun(withTiles(), {
      campfires: [{ at, minutesLeft: 42 }],
      burningItems: [{ item: "stick", at, minutesLeft: 2 }],
    });
    const { container } = await draw(document, state);
    const cell = rowOf(container, "1,0").querySelector(".tile-fire");
    assert.deepEqual(
      [...cell.querySelectorAll(".tile-fire-text")].map(
        (span) => span.textContent,
      ),
      ["ognisko — płonie, zostało 42 min", "patyk — płonie, zostało 2 min"],
    );
    assert.equal(
      cell.textContent,
      "ognisko — płonie, zostało 42 min · patyk — płonie, zostało 2 min",
    );
    assert.equal(
      rowOf(container, "0,1").querySelector(".tile-fire").textContent,
      "",
      "a tile with nothing burning has an empty cell",
    );
  });
});

// Catches a table that loses a column, a heading or the campfire's cell.
test("the table has a column per resource of the map, a row per revealed tile with the stock, and the fire cell", async () => {
  // decision: D-43 "None is `0`, a percentage, a size in `fr`, `vw` or `vh`, a keyword such as `transparent`, `currentColor`, `inherit` or `none`, a screen-width threshold of an `@media` rule, the geometry of the terrain drawing or of the scene computed in TypeScript, the frames and positions of a sprite, the `width` and `height` attributes of an image, a layout dimension — a width or height with its minimum and maximum, or the sizes of the columns of a layout grid — or the content of an icon file in `assets/icons/`, which is drawn as a mask and takes its colour from the text beside it or, where no text stands beside it — in the badge over the mage's head, on the plaque of the icon flying to the mage and in the drawing of the map — from `text-strong`"
  // decision: D-19 "The drawing of the game map is a picture, not a control: its only interactions are hovering a tile and tapping it, each of which marks the tile's row in the list of revealed tiles, and the numbers of stock stand in that list"
  // decision: D-125 "The body row, the backpack, the list of revealed tiles and the drawing of the game map show what the game state holds, whatever the Understanding holds: the body row shows satiety before the condition „Sytość poniżej” is discovered, and the backpack, the list of revealed tiles and the drawing of the game map show every item they hold"
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
