// The explanation a click on a cell of the body row opens (D-450, D-337, D-407) in React, on jsdom
// through tests/view/page-document.mjs (D-264): the cells of temperature, satiety and nature energy are
// buttons; a click opens the explanation of its value right under the four cells and above the
// backpack, a second click closes it, a click on another of those cells switches to its explanation,
// and at most one stands open. The health cell is no button and opens nothing. The helpers below are
// copies of those at the head of tests/view/body-row-cells.test.mjs, so that this file stands alone.
// The layouts and the look of the open cell are checked in the browser (D-87, D-88).
import { assert, inAct, press, withPage } from "./page-document.mjs";
import { gameStylesheetText } from "./game-stylesheets.mjs";
import { test } from "node:test";
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import {
  createCharacter,
  newGame,
  send,
  setProgram,
} from "../../dist/browser/sim/game.js";
import { emptyProgram } from "../../dist/browser/sim/programs.js";
import { BodyRowCells } from "../../dist/browser/view/body-row-cells.js";
import { withEdgeSolved } from "../sim/understanding-fixture.mjs";

const SENT = { mapId: "forest", characterId: 1 };

/** What the world area gives the row besides the run, at a reading with no blow: no events, 1×, going. */
const STILL = { events: [], pace: 1, standing: "going" };
const entry = (item, count) => ({ item, count });
const PLAN = { take: [entry("stick", 5)], bring: [entry("stick", 3)] };

/** A map run of the character „Ala” on Las under the trip plan, a chest of ten sticks. */
function sent(tripPlan = PLAN) {
  let state = createCharacter(withEdgeSolved(newGame()), "Ala").state;
  state = {
    ...state,
    team: { ...state.team, chest: { pieces: { stick: 10 } } },
  };
  state = setProgram(state, { ...emptyProgram(), tripPlan }).state;
  return send(state, SENT, 1760000000000).state;
}

/** The same game with the given fields of its map run replaced. */
const withRun = (state, fields) => ({
  ...state,
  run: { ...state.run, ...fields },
});

/**
 * Draws the body row of the map run in `state` in a root of its own, under the game's stylesheets
 * (D-421); `show(state)` draws it anew.
 */
async function draw(document, state) {
  const style = document.createElement("style");
  style.textContent = gameStylesheetText();
  document.head.append(style);
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);
  const show = (next) =>
    inAct(() =>
      root.render(createElement(BodyRowCells, { run: next.run, ...STILL })),
    );
  await show(state);
  return { container, show };
}

/** The four cells of the row, in their order on the screen: a button, or for health a block. */
const cellsOf = (container) => [
  ...container.querySelectorAll(".body-cells .body-cell-pair > *"),
];

/** The explanation that stands open under the cells, or null where none does. */
const explanationOf = (container) =>
  container.querySelector(".body-explanation");

// The words of each explanation, written out from the game's data (balance.ts: satiety falls 0.6 % a
// minute, starvation under 30 % costs 0.35 health a minute, chill under 35 °C the same; nature energy
// returns 0.5 a minute from 60 % of satiety up to 100). The forest's ambient temperature is 25 °C, so
// temperature falls 0.002 × (37 − 25) = 0.024 °C a minute, and a campfire warms 0.5 °C a minute up to
// the start, 37 °C.
const SATIETY_EXPLANATION =
  "Poniżej 30 % postać głoduje — traci 0,35 zdrowia na minutę, a passa się zeruje. Sytość spada o 0,6 % na minutę, tak samo na każdej mapie.";
const TEMPERATURE_EXPLANATION =
  "Poniżej 35 °C postać marznie — traci 0,35 zdrowia na minutę, a passa się zeruje. Otoczenie 25 °C: temperatura spada tu o 0,024 °C na minutę, a ognisko podnosi ją o 0,5 °C na minutę, najwyżej do 37 °C.";
const ENERGY_EXPLANATION =
  "Czary kosztują energię natury; pusta energia nie odbiera zdrowia, zamyka tylko czary. Energia wraca o 0,5 na minutę, ale tylko przy sytości od 60 %, najwyżej do 100.";

test("a click on the satiety cell opens its explanation under the four cells, and a second click closes it", async () => {
  // decision: D-450 "A click on the cell of temperature, satiety or nature energy (D-337) opens, right under the four"
  // decision: D-311 "The world holds, from the top, the scene, „Teraz” and „Potem”, the body row with a bar under each of its values and the minutes each need lasts, the explanation of a value right under its cells while the player has one open (D-450), the backpack and the lines below them"
  // Breaks: the cell is no button, or its click opens nothing, or the explanation stands under the backpack.
  await withPage(async ({ document }) => {
    const { container } = await draw(document, sent());
    const satiety = cellsOf(container)[1];
    assert.equal(
      explanationOf(container),
      null,
      "precondition: nothing stands open at the first draw",
    );
    assert.equal(satiety.getAttribute("aria-expanded"), "false");

    await press(satiety);
    const open = explanationOf(container);
    assert.equal(open.textContent, SATIETY_EXPLANATION);
    assert.equal(
      open.previousElementSibling,
      container.querySelector(".body-cells"),
    );
    assert.equal(
      open.nextElementSibling,
      container.querySelector(".backpack-text"),
    );
    assert.equal(satiety.getAttribute("aria-expanded"), "true");
    // The open cell names its explanation, which has an id of its own on the page.
    assert.ok(open.id !== "", "the explanation has an id");
    assert.equal(document.querySelectorAll(`[id="${open.id}"]`).length, 1);
    assert.equal(satiety.getAttribute("aria-controls"), open.id);

    await press(satiety);
    assert.equal(explanationOf(container), null);
    assert.equal(satiety.getAttribute("aria-expanded"), "false");
    assert.equal(satiety.hasAttribute("aria-controls"), false);
  });
});

// Catches an explanation laid over the backpack in place of moving it down: one taken out of the flow
// of the row by its rule — placed absolute or fixed, or floated — or a row that does not lay its parts
// one under another. What this case holds is the stylesheet's rule and the place in the document; it
// does not lay out the page, so the backpack's top moving down by the height of the explanation is
// measured in the browser (D-87, D-88).
test("an open explanation stands in the flow of the row, between the cells and the backpack, so it moves the backpack down", async () => {
  // decision: D-450 "A click on the cell of temperature, satiety or nature energy (D-337) opens, right under the four cells and above the backpack, the explanation of its value — its threshold, what happens to the character below it and how fast the value changes, with the numbers of the game's data — and moves down what stands under it"
  // Breaks: the explanation given `position: absolute`, `fixed` or a float, so that it lies over the backpack.
  await withPage(async ({ document, window }) => {
    const { container } = await draw(document, sent());
    await press(cellsOf(container)[1]);
    const open = explanationOf(container);
    const row = container.querySelector(".body-row");
    assert.equal(open.parentElement, row);
    assert.deepEqual(
      [...row.children].map((part) => part.getAttribute("class")),
      ["body-cells", "body-explanation", "backpack-text"],
    );
    const rowStyle = window.getComputedStyle(row);
    assert.deepEqual(
      [rowStyle.display, rowStyle.flexDirection],
      ["flex", "column"],
    );
    const style = window.getComputedStyle(open);
    assert.deepEqual(
      [style.display, style.position, style.float],
      ["block", "static", "none"],
    );
  });
});

test("a click on another cell switches the explanation, and at most one stands open", async () => {
  // decision: D-450 "A click on the cell of temperature, satiety or nature energy (D-337) opens, right under the four"
  // Breaks: two explanations stand open at once, or the click on another cell leaves the first open.
  await withPage(async ({ document }) => {
    const { container } = await draw(document, sent());
    const [temperature, satiety, , energy] = cellsOf(container);

    await press(temperature);
    assert.equal(explanationOf(container).textContent, TEMPERATURE_EXPLANATION);

    await press(energy);
    assert.equal(container.querySelectorAll(".body-explanation").length, 1);
    assert.equal(explanationOf(container).textContent, ENERGY_EXPLANATION);
    assert.equal(temperature.getAttribute("aria-expanded"), "false");
    assert.equal(satiety.getAttribute("aria-expanded"), "false");
    assert.equal(energy.getAttribute("aria-expanded"), "true");
    // Only the open cell names the explanation; the others name nothing that stands.
    assert.equal(
      energy.getAttribute("aria-controls"),
      explanationOf(container).id,
    );
    assert.equal(temperature.hasAttribute("aria-controls"), false);
    assert.equal(satiety.hasAttribute("aria-controls"), false);
  });
});

test("the health cell is no button and opens no explanation", async () => {
  // decision: D-337 "The cells of temperature, satiety and nature energy are buttons that open the explanation of their"
  // Breaks: health given a button or a click handler, so that a click opens an explanation for it.
  await withPage(async ({ document }) => {
    const { container } = await draw(document, sent());
    const health = cellsOf(container)[2];
    assert.equal(health.tagName, "DIV");
    assert.equal(health.querySelector("button"), null);

    await press(health);
    assert.equal(explanationOf(container), null);
  });
});

test("an open explanation stays open while the screen draws the game state anew", async () => {
  // decision: D-04 "For the blow marker of the health cell of the body row (D-450) the browser view also draws from the events the simulation returned, as it does for the scene, and which explanation of the body row stands open is the state of the own component of the screen of a map run (D-407)."
  // decision: D-407 "The game state lives in a store outside React and the state of the screen Przejście, which is the question „Zapisać, odrzucić, wrócić?” and the end-of-run window, in a module of its own outside React; memory several screens share is a memory of the page, given to the factories of the screens and read through `useSyncExternalStore`, and the state of one screen lives in the component of that screen."
  // Breaks: the open state kept outside the component, or reset by a new draw of the same run.
  await withPage(async ({ document }) => {
    const base = sent();
    const { container, show } = await draw(document, base);
    await press(cellsOf(container)[0]);

    await show(
      withRun(base, { body: { temperature: 36.2, satiety: 80, health: 90 } }),
    );
    assert.equal(explanationOf(container).textContent, TEMPERATURE_EXPLANATION);
    assert.equal(cellsOf(container)[0].getAttribute("aria-expanded"), "true");
  });
});
