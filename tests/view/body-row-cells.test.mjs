// The body row of the screen of a map run (D-337, D-178, D-125, D-39, D-40, D-44) in React, on jsdom
// through tests/view/page-document.mjs (D-264): each value in a cell of its own, its name at the left and
// its number at the right, a bar or the scale of temperature under them and the note under the bar,
// the thresholds that stand a number in danger, the frame of the temperature cell, and the backpack's
// line under the cells. The row is drawn alone, by the component BodyRowCells of its own file, with
// the game's stylesheets in the document, and the cases read its cells. jsdom resolves the cascade
// and not a custom property, so a colour reads as the token its rule lands on; the layouts, the
// motion and the look are checked in the browser (D-87, D-88). Every comparison is of plain data or of
// a handful of words (D-268).
import { assert, inAct, withPage } from "./page-document.mjs";
import { gameStylesheetText } from "./game-stylesheets.mjs";
import { test } from "node:test";
import { createElement } from "react";
import { createRoot } from "react-dom/client";
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
import { BodyRowCells } from "../../dist/browser/view/body-row-cells.js";
import { withEdgeSolved } from "../sim/understanding-fixture.mjs";

const SENT = { mapId: "forest", characterId: 1 };

/** What the world area gives the row besides the run, at a reading with no blow: no events, 1×, going. */
const STILL = { events: [], pace: 1, standing: "going" };
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

/** The four cells of the row, in their order on the screen. */
const cellsOf = (container) => [
  ...container.querySelectorAll(".body-cells .body-cell-pair > *"),
];

/** The text of the part `selector` of each cell, or null where the cell has none. */
const partsOf = (container, selector) =>
  cellsOf(container).map(
    (cell) => cell.querySelector(selector)?.textContent ?? null,
  );

/** The colour each cell's number stands in, as the token its rule lands on. */
const numberColours = (container, window) =>
  cellsOf(container).map((cell) => {
    const number = cell.querySelector(".value-cell-number");
    return number === null ? null : window.getComputedStyle(number).color;
  });

/**
 * The colour the game's rules last declare for the frame of `cell`, or null where no rule declares one
 * beside the frame of the plain button, read from the rules themselves: jsdom drops a `var()` that
 * stands in a shorthand from its computed style, so the frame of the plain button, a shorthand with
 * `control-border`, and a colour set over it show nowhere else. The rules stand in the order the
 * cascade reads them, and of those that match a cell the later has the greater specificity, so the
 * last is the winner; a block of `@media` holds no selector and is left out, as jsdom leaves it out.
 */
function declaredFrame(cell) {
  let last = null;
  for (const rule of cell.ownerDocument.styleSheets[0].cssRules) {
    if (rule.selectorText === undefined || !cell.matches(rule.selectorText))
      continue;
    const colour = rule.style.getPropertyValue("border-color");
    if (colour !== "") last = colour;
  }
  return last;
}

/** The notes of the row: the text of a cell's note and whether it stands in `danger`, or null. */
const notesOf = (container) =>
  cellsOf(container).map((cell) => {
    const note = cell.querySelector(".value-cell-note");
    if (note === null) return null;
    const colour = note.ownerDocument.defaultView.getComputedStyle(note).color;
    return [note.textContent, colour === "var(--danger)"];
  });

// Catches a number in `danger` that is not below its threshold, or one below it that is not, the
// threshold of health at 35 left out or reached by nature energy, and a backpack that loses its line.
// The thresholds are 35 °C, 30 % and 35 (D-337); the nature energy is never in `danger` (D-178).
test("only the number below its threshold stands in danger, health below 35 included, and the backpack reads its pieces of the cap", async () => {
  // decision: D-64 "The backpack's cap counts the pieces of all items together"
  // decision: D-178 "The body row ends with „Energia natury {n}”, the mage's nature energy cut down to a whole number, from game minute zero, in the role `text` at every value of the energy, zero included"
  // decision: D-125 "The body row, the backpack, the list of revealed tiles and the drawing of the game map show what the game state holds, whatever the Understanding holds: the body row shows satiety before the condition „Sytość poniżej” is discovered"
  // decision: D-337 "The body row holds each of its values in a cell of its own"
  // decision: D-337 "Below its threshold — temperature below 35 °C and satiety below 30, as the game's data give them, and health below 35, a threshold of the look alone that the game does not know — the number of a value stands in red"
  // decision: D-39 "`danger` also stands as the number of a value of the body row below its threshold, health below 35 included"
  await withPage(async ({ document, window }) => {
    const base = sent();
    const character = {
      ...base.run.character,
      traits: { ...base.run.character.traits, carryingCapacity: 15 },
      backpack: { ...base.run.character.backpack, stick: 5, berry: 2 },
    };
    const cold = withRun(base, {
      body: { temperature: 34.99, satiety: 82, health: 35 },
      natureEnergy: 90,
      character,
    });
    const { container, show } = await draw(document, cold);
    assert.deepEqual(partsOf(container, ".value-cell-name"), [
      "Temperatura",
      "Sytość",
      "Zdrowie",
      "Energia natury",
    ]);
    assert.deepEqual(partsOf(container, ".value-cell-number"), [
      "34,9 °C",
      "82 %",
      "35",
      "90",
    ]);
    const DANGER = "var(--danger)";
    const TEXT = "var(--text)";
    assert.deepEqual(numberColours(container, window), [
      DANGER,
      TEXT,
      TEXT,
      TEXT,
    ]);
    assert.equal(
      container.querySelector(".backpack-text").textContent,
      "Plecak 7/15: patyk 5, jagoda 2",
    );
    // D-337: each value stands in a cell of its own, and no separator stands between the cells.
    assert.equal(cellsOf(container).length, 4);
    assert.equal(
      container.querySelector(".body-cells").textContent.includes(" · "),
      false,
    );

    // Satiety below 30 and health below 35, a whole number: 34.9 is written „34”.
    await show(
      withRun(base, {
        body: { temperature: 36.2, satiety: 12, health: 34.9 },
        natureEnergy: 0,
        character: {
          ...character,
          backpack: { ...character.backpack, stick: 0, berry: 0 },
        },
      }),
    );
    assert.deepEqual(partsOf(container, ".value-cell-number"), [
      "36,2 °C",
      "12 %",
      "34",
      "0",
    ]);
    assert.deepEqual(numberColours(container, window), [
      TEXT,
      DANGER,
      DANGER,
      TEXT,
    ]);
    assert.equal(
      container.querySelector(".backpack-text").textContent,
      "Plecak 0/15",
    );
  });
});

// Catches a cell whose name and number run together or stand in another order, a bar over the
// numbers or under the note, a scale in place of a bar or the other way round, a bar under the
// backpack, a cell of temperature, satiety or nature energy that is no button, and a health cell that
// is one. The place of the frame the health cell holds is a case of tests/view/shared-controls.test.mjs.
test("each cell holds its name and number on one line, the bar or the scale under them and the note under the bar; three are buttons and health is none", async () => {
  // decision: D-337 "Each of the four values — temperature, satiety, health and nature energy — stands in its cell as in loop: its name at the left and its number at the right on one line, a bar under them and its note under the bar, while the backpack stays a line with no bar"
  // decision: D-337 "The cells of temperature, satiety and nature energy are buttons"
  // decision: D-44 "Besides the kinds above, the button has the kind of the button of a cell of the body row, of which the cells of temperature, satiety and nature energy are built (D-337)"
  // decision: D-178 "Its cell stands as the other cells of the body row do (D-337): the name „Energia natury” at its left and the number at its right, under them a white bar"
  await withPage(async ({ document }) => {
    const { container } = await draw(document, sent());
    const cells = cellsOf(container);
    assert.deepEqual(
      cells.map((cell) => cell.tagName),
      ["BUTTON", "BUTTON", "DIV", "BUTTON"],
    );
    assert.deepEqual(
      cells.map((cell) =>
        [...cell.children].map((part) => part.getAttribute("class")),
      ),
      [
        ["value-cell-head", "value-cell-scale", "value-cell-note"],
        ["value-cell-head", "value-cell-bar", "value-cell-note"],
        ["value-cell-head", "value-cell-bar"],
        ["value-cell-head", "value-cell-bar"],
      ],
    );
    assert.deepEqual(
      cells.map((cell) =>
        [...cell.querySelector(".value-cell-head").children].map((part) =>
          part.getAttribute("class"),
        ),
      ),
      Array(4).fill(["value-cell-name", "value-cell-number"]),
    );
    // The backpack is a line with no bar.
    const backpack = container.querySelector(".backpack-text");
    assert.equal(backpack.tagName, "P");
    assert.equal(backpack.children.length, 0);
  });
});

// Catches a bar filled from another value or against another cap, a fill not in the colour of its
// value, a fill that takes the red of the alarm below its threshold, and a track not in `highlight`.
// Satiety fills against 100, health against its starting 100 and nature energy against its cap of
// 100, from the game's data: 82 → 0.82, 40 → 0.4, 90 → 0.9, then 12 → 0.12, 30 → 0.3 and 0 → 0.
test("the bars of satiety, health and nature energy fill to the share of their value in the colour of the value, on a track in highlight, also below a threshold", async () => {
  // decision: D-337 "The bar of satiety is empty at 0 and full at 100, that of health full at the starting health and that of nature energy full at its cap, both from the game's data, each of them empty at 0"
  // decision: D-39 "`positive` also stands as the fill of the bar of health in the body row (D-337), on a track in `highlight`"
  // decision: D-40 "The bars of satiety, health and nature energy in the body row (D-337) have their track in `highlight`, as the bar of a requirement in the header has, and the fill of the bar of nature energy stands in `text-strong`, white, though it is no text"
  await withPage(async ({ document, window }) => {
    const base = sent();
    const fills = (container) =>
      cellsOf(container).map((cell) => {
        const fill = cell.querySelector(".value-cell-fill");
        return fill === null
          ? null
          : [
              fill.style.getPropertyValue("--share"),
              window.getComputedStyle(fill).backgroundColor,
            ];
      });
    const tracks = (container) =>
      cellsOf(container).map((cell) => {
        const track = cell.querySelector(".value-cell-bar");
        return track === null
          ? null
          : window.getComputedStyle(track).backgroundColor;
      });
    const { container, show } = await draw(
      document,
      withRun(base, {
        body: { temperature: 36.2, satiety: 82, health: 40 },
        natureEnergy: 90,
      }),
    );
    assert.deepEqual(fills(container), [
      null,
      ["0.82", "var(--satiety-fill)"],
      ["0.4", "var(--positive)"],
      ["0.9", "var(--text-strong)"],
    ]);
    assert.deepEqual(tracks(container), [
      null,
      "var(--highlight)",
      "var(--highlight)",
      "var(--highlight)",
    ]);

    await show(
      withRun(base, {
        body: { temperature: 36.2, satiety: 12, health: 30 },
        natureEnergy: 0,
      }),
    );
    assert.deepEqual(fills(container), [
      null,
      ["0.12", "var(--satiety-fill)"],
      ["0.3", "var(--positive)"],
      ["0", "var(--text-strong)"],
    ]);
  });
});

// Catches a scale whose zones stand in another order, another proportion or another colour, a marker
// at another place — 37.0 °C stands (37 − 30) / (41 − 30) = 7/11 of the way from the left end —, a
// marker that leaves the left end below 30 °C or the right one above 41, and a zone named as the
// marker's that is not the one the marker stands in.
test("temperature stands on a scale of three zones, 5 : 4 : 2, with the marker at the temperature now and the zone it stands in named", async () => {
  // decision: D-337 "Temperature stands on a linear scale from 30 °C at its left end to 41 °C at its right, whose track is three zones — chill from 30 to 35 °C, safe from 35 to 39 °C, with 37.0 °C inside it, and overheating from 39 to 41 °C, drawn though the game knows no overheating — and on which a short upright marker the height of the bar stands at the temperature now, at the left end below 30 °C"
  // decision: D-40 "On the scale of temperature the chill zone stands in the role `chill-zone`, which means that the body is chilled at that temperature, the safe zone in the role `safe-zone`"
  // decision: D-39 "`danger` also stands as the number of a value of the body row below its threshold, health below 35 included, and as the zone of overheating on the scale of temperature"
  await withPage(async ({ document, window }) => {
    const base = sent();
    const scaleOf = (container) =>
      cellsOf(container)[0].querySelector(".value-cell-scale");
    const { container, show } = await draw(document, base);
    assert.equal(
      cellsOf(container).filter((cell) => cell.querySelector(".body-scale"))
        .length,
      1,
      "only the temperature cell has a scale",
    );
    const zones = [...scaleOf(container).querySelectorAll(".body-scale-zone")];
    assert.deepEqual(
      zones.map((zone) => window.getComputedStyle(zone).backgroundColor),
      ["var(--chill-zone)", "var(--safe-zone)", "var(--danger)"],
    );
    const widths = zones.map((zone) =>
      Number(zone.style.getPropertyValue("--zone-share")),
    );
    const [chill, safe, overheating] = widths.map((width) => width / widths[2]);
    assert.ok(
      Math.abs(chill - 2.5) < 1e-9 && Math.abs(safe - 2) < 1e-9,
      `the zones stand as 5 : 4 : 2, not ${widths.join(" : ")}`,
    );
    assert.equal(overheating, 1);
    // The marker: a light core between two dark sides, so that it tells from a gap between two zones,
    // which shows the dark `panel`; a marker dark through looks like one more gap.
    // decision: D-40 "On the scale of temperature the chill zone stands in the role `chill-zone`, which means that the body is chilled at that temperature, the safe zone in the role `safe-zone`, a neutral grey, which means that the body is safe at that temperature, and the marker of the temperature now in the role `scale-marker`, dark, which means where the value stands on its scale, on both sides of a light core in `text-strong`"
    const marker = scaleOf(container).querySelector(".body-scale-marker");
    const markerStyle = window.getComputedStyle(marker);
    assert.deepEqual(
      [
        markerStyle.backgroundColor,
        markerStyle.borderLeftStyle,
        markerStyle.borderLeftColor,
        markerStyle.borderRightStyle,
        markerStyle.borderRightColor,
      ],
      [
        "var(--text-strong)",
        "solid",
        "var(--scale-marker)",
        "solid",
        "var(--scale-marker)",
      ],
    );

    /** The marker's place on the scale and the zone named as the one it stands in. */
    const reading = () => {
      const scale = scaleOf(container).querySelector(".body-scale");
      const held = [...scale.querySelectorAll(".body-scale-zone")]
        .map((zone, index) =>
          zone.classList.contains("holds-marker") ? index : -1,
        )
        .filter((index) => index >= 0);
      return [Number(scale.style.getPropertyValue("--share")), held];
    };
    const [share, held] = reading();
    assert.ok(Math.abs(share - 7 / 11) < 1e-9, `37,0 °C at ${share}`);
    assert.deepEqual(held, [1]);

    const at = async (temperature) =>
      show(
        withRun(base, {
          body: { temperature, satiety: 80, health: 80 },
        }),
      );
    await at(34.99);
    assert.deepEqual(reading()[1], [0]);
    await at(35);
    assert.deepEqual(reading()[1], [1]);
    await at(28.4);
    assert.deepEqual(reading(), [0, [0]]);
    await at(39.5);
    assert.deepEqual(reading()[1], [2]);
    await at(42);
    assert.deepEqual(reading(), [1, [2]]);
  });
});

// Catches a frame of the temperature cell that does not follow what acts on the character: amber at a
// fire on its tile, at 37,0 °C too, where the temperature cannot rise; bluish away from fire on Las,
// colder than the body; and a frame of another cell taking either colour.
test("the frame of the temperature cell is amber by a fire, also at 37,0 °C, and bluish away from fire on a map that cools the body", async () => {
  // decision: D-337 "The frame of the button of the temperature cell says what acts on the character: amber while something burns on the character's tile, also once the temperature stands at 37.0 °C, bluish while nothing warms the character and its map is colder than its body"
  // decision: D-39 "The frame of the button of the temperature cell takes the role `warming-frame`, amber, which means that something warms the character, while something burns on the character's tile, and the role `chill-zone` (D-40) while nothing warms the character and its map is colder than its body"
  await withPage(async ({ document }) => {
    const base = sent();
    assert.equal(base.run.body.temperature, 37, "precondition: 37,0 °C");
    // null: the plain frame of the button, in `control-border`, which no rule of the row changes.
    const frames = (container) =>
      cellsOf(container)
        .filter((cell) => cell.tagName === "BUTTON")
        .map(declaredFrame);
    const at = base.run.character.at;
    const { container, show } = await draw(
      document,
      withRun(base, { campfires: [{ at, minutesLeft: 40 }] }),
    );
    assert.deepEqual(frames(container), ["var(--warming-frame)", null, null]);
    // The fire gone, Las at 25 °C cools the body.
    await show(base);
    assert.deepEqual(frames(container), ["var(--chill-zone)", null, null]);
  });
});

// Catches a note in the same line as its value (D-337 rejects it), a note under health or nature
// energy, notes missing at game minute zero before anything is discovered (D-125), or minutes that
// differ from the game's: on Las from the starting body (37 °C, 100 %) the 83rd minute ends at
// 37 − 83 × 0.024 = 35.008 °C and the 116th at 100 − 116 × 0.6 = 30.4 %, worked out by hand as in
// tests/sim/body.test.mjs.
test("the body row stands in cells with the minutes of the needs under temperature and satiety from game minute zero, none under health and nature energy", async () => {
  // decision: D-178 "The body row ends with „Energia natury {n}”, the mage's nature energy cut down to a whole number, from game minute zero"
  // decision: D-125 "The body row, the backpack, the list of revealed tiles and the drawing of the game map show what the game state holds, whatever the Understanding holds: the body row shows satiety before the condition „Sytość poniżej” is discovered"
  // decision: D-337 "The body row holds each of its values in a cell of its own"
  // decision: D-337 "The note under temperature reads the first of these that holds"
  // decision: D-337 "{n} is the whole game minutes, rounded down, left until the character starts to be chilled or to starve"
  await withPage(async ({ document }) => {
    const started = sent();
    assert.equal(started.run.minute, 0, "precondition: game minute zero");
    const { container } = await draw(document, started);
    assert.deepEqual(partsOf(container, ".value-cell-number"), [
      "37,0 °C",
      "100 %",
      "100",
      "100",
    ]);
    assert.deepEqual(notesOf(container), [
      ["bez ognia 83 min", false],
      ["bez jedzenia 116 min", false],
      null,
      null,
    ]);
    // A note stands under its value in the same cell, not after it in the line of the value.
    assert.equal(
      partsOf(container, ".value-cell-head")[0].includes("min"),
      false,
    );
  });
});

// Catches „marznie” or „głoduje” not in danger, a note in danger above its threshold, and the minutes
// kept past the threshold. At 35,0 °C and 30 % the character is not yet chilled or starving.
test("a note under temperature and one under satiety read „marznie” and „głoduje” in danger below their thresholds and the minutes at them", async () => {
  // decision: D-337 "The note under temperature reads the first of these that holds"
  // decision: D-337 "{n} is the whole game minutes, rounded down, left until the character starts to be chilled or to starve"
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
  // decision: D-337 "The note under temperature reads the first of these that holds"
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

// Catches notes, bars and the frame dropped after the end of a map run (D-337): after a death the
// notes read the state at the stopped minute — „marznie” after a death of cold, „głoduje” after one of
// hunger —, the frame stays bluish on Las and the health bar stands empty; after a completion the
// minutes of the body at game minute 480.
test("the notes, the bars and the frame stand after the end of a map run, on the state at the stopped minute", async () => {
  // decision: D-337 "{n} is the whole game minutes, rounded down, left until the character starts to be chilled or to starve"
  // decision: D-337 "The frame of the button of the temperature cell says what acts on the character: amber while something burns on the character's tile"
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
    const dead = died(sent(), BALANCE.resurrectionUses);
    assert.equal(dead.run.death.cause, "cold", "precondition: died of cold");
    assert.ok(dead.run.body.temperature < 35 && dead.run.body.satiety < 30);
    await show(dead);
    assert.deepEqual(notesOf(container), [
      ["marznie", true],
      ["głoduje", true],
      null,
      null,
    ]);
    const cells = cellsOf(container);
    assert.equal(declaredFrame(cells[0]), "var(--chill-zone)");
    assert.equal(
      cells[2]
        .querySelector(".value-cell-fill")
        ?.style.getPropertyValue("--share"),
      "0",
    );

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
