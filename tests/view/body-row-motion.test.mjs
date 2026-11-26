// The motion of the body row of the screen of a map run (D-337, D-450, D-42, D-04) in React, on jsdom
// through tests/view/page-document.mjs (D-264): the pulse of the alarm below a threshold, which goes on
// while game time stands, and the shake and the fading text of a creature's blow over the health cell,
// which stand where they reached while it stands. The row is drawn alone, by the component
// BodyRowCells, with the game's stylesheets in the document. jsdom runs no animation and reads no rule
// inside an `@media` of a feature, so the motion is read from the stylesheet's own rules, rule by rule,
// outside any `@media` of a feature and inside the block of each setting for motion, and from the
// marks the component puts on the row; the motion itself is checked in the browser (D-87, D-88).
// Every comparison is of plain data or of a handful of words (D-268).
import { assert, inAct, withPage } from "./page-document.mjs";
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

/** A map run of the character „Ala” on Las under the given trip plan, a chest of ten sticks. */
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

/** A game whose character is healthy, on a map run with the given body, nature energy 50. */
const bodied = (body) =>
  withRun(sent(), {
    body: { temperature: 37, satiety: 80, health: 90, ...body },
    natureEnergy: 50,
  });

/**
 * Draws the body row of the map run in `state` in a root of its own, under the game's stylesheets
 * (D-421), with the events, the pace and the standing of `extra`; `show(state, extra)` draws it anew.
 */
async function draw(document, state, extra = {}) {
  const style = document.createElement("style");
  style.textContent = gameStylesheetText();
  document.head.append(style);
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);
  const show = (next, more = {}) =>
    inAct(() =>
      root.render(
        createElement(BodyRowCells, { run: next.run, ...STILL, ...more }),
      ),
    );
  await show(state, extra);
  return { container, show };
}

/** The four cells of the row, in their order on the screen. */
const cellsOf = (container) => [
  ...container.querySelectorAll(".body-cells .body-cell-pair > *"),
];

const [TEMPERATURE, SATIETY, HEALTH] = [0, 1, 2];

// --- the stylesheet as a setting for motion reads it -----------------------------------------

const REDUCED = "(prefers-reduced-motion: reduce)";
const NO_PREFERENCE = "(prefers-reduced-motion: no-preference)";

/**
 * The rules of the game's stylesheet that hold for a setting for motion, in the order the cascade reads
 * them: those outside any `@media` of a feature, and those inside the block of that setting. A rule
 * stands later in the sheet than one it overrides at the same specificity, as the sheet is written, so
 * the last that declares a property gives its value.
 */
function rulesUnder(document, setting) {
  const held = [];
  for (const rule of document.styleSheets[0].cssRules) {
    if (rule.selectorText !== undefined) held.push(rule);
    else if (rule.media !== undefined && rule.media.mediaText === setting)
      held.push(...rule.cssRules);
  }
  return held;
}

/** The value of `property` the stylesheet gives `element` under `setting`, or "" where no rule gives one. */
function under(element, setting, property) {
  let value = "";
  for (const rule of rulesUnder(element.ownerDocument, setting)) {
    if (rule.selectorText === undefined || !element.matches(rule.selectorText))
      continue;
    const declared = rule.style.getPropertyValue(property);
    if (declared !== "") value = declared;
  }
  return value;
}

/** The animation `element` runs under `setting`: its name, or "" where it runs none. */
const animationUnder = (element, setting) => {
  const name = under(element, setting, "animation-name");
  return name === "none" ? "" : name;
};

/** The keyframes of the sheet by name: each keyframe's offset with the declarations of the properties named. */
function keyframesOf(document, name, properties) {
  for (const rule of document.styleSheets[0].cssRules) {
    if (rule.name !== name) continue;
    return Object.fromEntries(
      [...rule.cssRules].map((frame) => [
        frame.keyText,
        Object.fromEntries(
          properties.map((property) => [
            property,
            frame.style.getPropertyValue(property),
          ]),
        ),
      ]),
    );
  }
  return null;
}

/** The elements of a drawn row that pulse where a value is in alarm: the fills, the marker and its zone. */
const pulsing = (container) => [
  ...container.querySelectorAll(
    ".value-cell-fill, .body-scale-marker, .body-scale-zone.holds-marker",
  ),
];

/** The elements of a row, by what they are, whose animation names a case reads under a setting. */
const namesUnder = (elements, setting) =>
  elements.map((element) => animationUnder(element, setting));

// --- the events of a combat --------------------------------------------------------------------

/** One exchange of a combat in which the creature strikes for `damage` and leaves the character at `left`. */
const strike = (minute, damage, left) => ({
  kind: "combatExchange",
  minute,
  exchange: {
    creatureAction: { kind: "strike", damage, characterHealth: left },
    characterAction: null,
  },
});

const ended = (minute, outcome = "creatureDefeated") => ({
  kind: "combatEnded",
  minute,
  outcome,
});

const attacked = (minute, creature) => ({ kind: "attacked", minute, creature });

/** A new array of the events of a combat of a wolf whose three blows took 7 each (D-450: „−21 · wilk”). */
const wolfCombat = () => [
  attacked(40, "wolf"),
  strike(40, 7, 93),
  strike(40, 7, 86),
  strike(40, 7, 79),
  ended(40),
];

/** A new array of the events of a combat of a wolf whose two blows took 5 each, „−10 · wilk”. */
const smallerCombat = () => [
  attacked(41, "wolf"),
  strike(41, 5, 74),
  strike(41, 5, 69),
  ended(41),
];

/** The fading texts over the health cell and over the other cells of the row. */
const blowTexts = (container) => [
  ...cellsOf(container)[HEALTH].querySelectorAll(".body-blow-text"),
];
const blowTextsAnywhere = (container) => [
  ...container.querySelectorAll(".body-blow-text"),
];

/** The mark of the health cell that tells its shake to start, or null where it has none. */
const shakeMark = (container) =>
  cellsOf(container)[HEALTH].getAttribute("data-blow");

// --- the pulse ---------------------------------------------------------------------------------

// Catches a fill below its threshold that does not pulse, one that pulses above it or at nature energy,
// which has no alarm, a pulse under the system's setting for reduced motion, and a pulse that is not
// from full opacity to the dim opacity of the token and back, smoothly and with no end, in 1.1 s.
test("the fills of satiety and health below their thresholds pulse from full to the dim opacity and back in 1.1 s, smoothly and with no end, and under reduced motion nothing pulses", async () => {
  // decision: D-337 "Below its threshold — temperature below 35 °C and satiety below 30, as the game's data give them, and health below 35, a threshold of the look alone that the game does not know — the number of a value stands in red and its fill pulses in its own colour, on the scale the marker together with the zone it stands in, still under the system's setting for reduced motion"
  // decision: D-42 "The alarm's pulse of a fill, from full opacity to 40 % and back in 1.1 s, smoothly and with no end"
  await withPage(async ({ document }) => {
    const { container, show } = await draw(
      document,
      bodied({ satiety: 12, health: 30 }),
    );
    const fills = [SATIETY, HEALTH].map((index) =>
      cellsOf(container)[index].querySelector(".value-cell-fill"),
    );
    for (const fill of fills) {
      const name = animationUnder(fill, NO_PREFERENCE);
      assert.ok(name !== "", "a fill below its threshold pulses");
      assert.equal(under(fill, NO_PREFERENCE, "animation-duration"), "1.1s");
      assert.equal(
        under(fill, NO_PREFERENCE, "animation-iteration-count"),
        "infinite",
      );
      assert.doesNotMatch(
        under(fill, NO_PREFERENCE, "animation-timing-function"),
        /step/,
        "smoothly, not in steps",
      );
      assert.deepEqual(keyframesOf(document, name, ["opacity"]), {
        "50%": { opacity: "var(--alarm-pulse-dim-opacity)" },
      });
      assert.equal(
        animationUnder(fill, REDUCED),
        "",
        "under reduced motion nothing pulses",
      );
    }

    // The same cells above their thresholds, and nature energy at 0, which has no alarm, stand still.
    await show(bodied({ satiety: 30, health: 35, temperature: 35 }));
    assert.deepEqual(
      namesUnder(pulsing(container), NO_PREFERENCE),
      pulsing(container).map(() => ""),
    );
    await show(withRun(bodied({}), { natureEnergy: 0 }));
    assert.deepEqual(
      namesUnder(pulsing(container), NO_PREFERENCE),
      pulsing(container).map(() => ""),
    );
  });
});

// Catches a scale on which only the marker pulses, or the zone alone, or a zone other than the one the
// marker stands in, a pulse that stays after the temperature has risen to the threshold, a pulse at the
// frame of the temperature cell, and a pulse under reduced motion.
test("below its threshold the marker of the scale pulses together with the zone it stands in and no other, the frame of the temperature cell never pulses", async () => {
  // decision: D-337 "Below its threshold — temperature below 35 °C and satiety below 30, as the game's data give them, and health below 35, a threshold of the look alone that the game does not know — the number of a value stands in red and its fill pulses in its own colour, on the scale the marker together with the zone it stands in"
  // decision: D-337 "The frame of the button of the temperature cell says what acts on the character: amber while something burns on the character's tile, also once the temperature stands at 37.0 °C, bluish while nothing warms the character and its map is colder than its body, and the plain frame of the button on a map that does not cool it, with no pulse"
  await withPage(async ({ document }) => {
    const { container, show } = await draw(
      document,
      bodied({ temperature: 33 }),
    );
    const marker = container.querySelector(".body-scale-marker");
    const zones = [...container.querySelectorAll(".body-scale-zone")];
    const names = [marker, ...zones].map((element) =>
      animationUnder(element, NO_PREFERENCE),
    );
    assert.ok(names[0] !== "", "the marker pulses");
    assert.deepEqual(
      names.map((name) => name !== ""),
      [true, true, false, false],
      "the marker and the chill zone, in which it stands, and no other zone",
    );
    assert.equal(
      names[1],
      names[0],
      "the same pulse, so the two move together",
    );
    assert.equal(
      under(marker, NO_PREFERENCE, "animation-duration"),
      under(zones[0], NO_PREFERENCE, "animation-duration"),
    );
    for (const element of [marker, ...zones])
      assert.equal(animationUnder(element, REDUCED), "");
    const frame = cellsOf(container)[TEMPERATURE];
    for (const setting of [NO_PREFERENCE, REDUCED])
      assert.equal(
        animationUnder(frame, setting),
        "",
        "the frame never pulses",
      );

    await show(bodied({ temperature: 35 }));
    assert.deepEqual(
      namesUnder(
        [...container.querySelectorAll(".body-scale-marker, .body-scale-zone")],
        NO_PREFERENCE,
      ),
      ["", "", "", ""],
    );
  });
});

// Catches a pulse that the stop of the scene holds, as the player's pause, a discovery, a death or a
// completion would, and the shake and the text of a blow that a stop does not hold.
test("while game time stands the pulse goes on, and the shake and the text of a blow stand where they are", async () => {
  // decision: D-337 "The pulse goes on while game time stands — in the player's pause, at the moments of a discovery, a death and a completion, and on the screen after the end of a map run — though the motion of the scene then stands (D-322)"
  // decision: D-450 "While game time stands — in the player's pause, at the moments of a discovery, a death and a completion, and on the screen after the end of a map run — the shake and the text stand where they reached"
  await withPage(async ({ document, window }) => {
    const state = bodied({ satiety: 12, health: 30 });
    const playState = (element) =>
      window.getComputedStyle(element).getPropertyValue("animation-play-state");
    const { container, show } = await draw(document, state, {
      events: [],
      standing: "going",
    });
    const combat = wolfCombat();
    await show(state, { events: combat, standing: "going", pace: 1 });
    assert.equal(blowTexts(container).length, 1, "precondition: a blow shows");
    for (const standing of [
      "going",
      "paused",
      "discovery",
      "dead",
      "completed",
    ]) {
      await show(state, { events: combat, standing, pace: 1 });
      assert.equal(
        container.querySelector(".body-row").getAttribute("data-standing"),
        standing,
      );
      const held = standing !== "going";
      const motion = [blowTexts(container)[0], cellsOf(container)[HEALTH]];
      for (const element of motion)
        assert.equal(playState(element) === "paused", held, standing);
      for (const element of pulsing(container)) {
        assert.notEqual(playState(element), "paused", `${standing}: the pulse`);
        for (const setting of [NO_PREFERENCE, REDUCED])
          assert.notEqual(
            under(element, setting, "animation-play-state"),
            "paused",
          );
      }
    }
  });
});

// --- the blow ----------------------------------------------------------------------------------

// Catches a marker at the first draw of the screen, from the events it is first given, and one drawn
// again from the same events at a later reading, which a clock redraw does five times a second.
test("a blow among the events of the first draw gives no marker, and the same events drawn again give none", async () => {
  // decision: D-450 "At a creature's blow the health cell shakes and shows the fading „−{n} · {stworzenie}”, read from the events the simulation returned (D-04) and never at a first draw of the screen, after a reload or after a load"
  // decision: D-04 "For the blow marker of the health cell of the body row (D-450) the browser view also draws from the events the simulation returned, as it does for the scene"
  await withPage(async ({ document }) => {
    const state = bodied({ health: 60 });
    const events = wolfCombat();
    const { container, show } = await draw(document, state, {
      events,
      pace: 1,
    });
    assert.equal(blowTextsAnywhere(container).length, 0);
    assert.equal(shakeMark(container), null);
    await show(state, { events, pace: 1 });
    assert.equal(blowTextsAnywhere(container).length, 0);
    assert.equal(shakeMark(container), null);
  });
});

// Catches a marker that is not „−21 · wilk” for a combat of three blows of 7 at 1×, 2× and 4×, one that
// stands over another cell, none for a call that holds no blow, and a marker kept at 8× and 16×.
test("a combat of a wolf whose three blows took 7 each shows one „−21 · wilk” over the health cell at 1×, 2× and 4×, and a blow at 8× or 16× shows nothing", async () => {
  // decision: D-450 "At a creature's blow the health cell shakes and shows the fading „−{n} · {stworzenie}”, read from the events the simulation returned (D-04)"
  // decision: D-450 "The marker shows at the paces 1×, 2× and 4× and at no other, as the scene shows no text of its effects at 8× and 16× (D-317), and a blow at 8× or 16× is dropped, not kept for a slower pace"
  await withPage(async ({ document }) => {
    for (const pace of [1, 2, 4]) {
      const state = bodied({ health: 69 });
      const { container, show } = await draw(document, state, {
        events: [],
        pace,
      });
      await show(state, { events: [], pace });
      assert.equal(blowTextsAnywhere(container).length, 0, "no blow, no text");
      await show(state, { events: wolfCombat(), pace });
      assert.deepEqual(
        blowTexts(container).map((text) => text.textContent),
        ["−21 · wilk"],
        `at ${pace}×`,
      );
      assert.equal(
        blowTextsAnywhere(container).length,
        1,
        "over no other cell",
      );
    }
    for (const pace of [8, 16]) {
      const state = bodied({ health: 69 });
      const { container, show } = await draw(document, state, {
        events: [],
        pace,
      });
      await show(state, { events: wolfCombat(), pace });
      assert.equal(blowTextsAnywhere(container).length, 0, `at ${pace}×`);
      assert.equal(shakeMark(container), null, `no shake at ${pace}×`);
    }
  });
});

// Catches a marker that is drawn anew at every redraw of the same call, one that a later call with no
// blow removes before its fading has ended, a second blow that adds a second text, and a shake that a
// second blow does not start anew.
test("a marker stays one element while the screen is drawn again, and a new blow replaces it and starts the shake anew", async () => {
  // decision: D-450 "At a creature's blow the health cell shakes and shows the fading „−{n} · {stworzenie}”, read from the events the simulation returned (D-04) and never at a first draw of the screen, after a reload or after a load: one marker for a combat, {n} being the sum of the creature's blows in it, where that sum is at least 2, a killing blow included before the end-of-run window opens, and a new blow replacing the marker of the one before"
  await withPage(async ({ document }) => {
    const state = bodied({ health: 69 });
    const { container, show } = await draw(document, state, {
      events: [],
      pace: 1,
    });
    const combat = wolfCombat();
    await show(state, { events: combat, pace: 1 });
    const [first] = blowTexts(container);
    const firstMark = shakeMark(container);
    assert.ok(firstMark !== null, "the cell is marked for its shake");

    await show(state, { events: combat, pace: 1 });
    await show(state, { events: [], pace: 1 });
    assert.equal(
      blowTexts(container)[0],
      first,
      "the same element, so it fades on",
    );
    assert.equal(
      shakeMark(container),
      firstMark,
      "the shake goes on, not anew",
    );

    await show(withRun(state, { body: { ...state.run.body, health: 59 } }), {
      events: smallerCombat(),
      pace: 1,
    });
    assert.deepEqual(
      blowTextsAnywhere(container).map((text) => text.textContent),
      ["−10 · wilk"],
    );
    assert.notEqual(
      blowTexts(container)[0],
      first,
      "a new element, which fades anew",
    );
    assert.notEqual(
      shakeMark(container),
      firstMark,
      "a new mark, which shakes anew",
    );
  });
});

// Catches a marker that stays when its fading has ended or the browser cancelled it because the screen
// was hidden, which a screen shown again would play from its start, and, standing, show frozen.
test("the marker is gone when its animation has ended or the browser has cancelled it", async () => {
  // decision: D-450 "At a creature's blow the health cell shakes and shows the fading „−{n} · {stworzenie}”"
  await withPage(async ({ document, window }) => {
    // A browser fires `animationend`; React reads the name it finds the page's style object able to
    // prefix, which on jsdom is `webkitAnimationEnd`, so the page gets both (as tests/view/scene.test.mjs).
    const ways = {
      animationend: ["animationend", "webkitAnimationEnd"],
      animationcancel: ["animationcancel"],
    };
    for (const [kind, names] of Object.entries(ways)) {
      const state = bodied({ health: 69 });
      const { container, show } = await draw(document, state, {
        events: [],
        pace: 1,
      });
      await show(state, { events: wolfCombat(), pace: 1 });
      const [text] = blowTexts(container);
      await inAct(() => {
        for (const name of names)
          text.dispatchEvent(new window.Event(name, { bubbles: true }));
      });
      assert.equal(blowTextsAnywhere(container).length, 0, kind);
      assert.equal(shakeMark(container), null, `${kind}: no shake`);
    }
  });
});

// Catches a killing blow while game time stands that shows no marker, one that shows it moving, and a
// marker that does not go on when time goes on, or goes on as a new element that starts over.
test("a blow that comes while game time stands shows its marker held, and the same marker goes on when time goes on", async () => {
  // decision: D-450 "While game time stands — in the player's pause, at the moments of a discovery, a death and a completion, and on the screen after the end of a map run — the shake and the text stand where they reached, a marker that comes while it stands, as that of a killing blow does, standing at its first frame, and they go on when time goes on"
  await withPage(async ({ document, window }) => {
    const state = bodied({ health: 0 });
    const playState = (element) =>
      window.getComputedStyle(element).getPropertyValue("animation-play-state");
    const { container, show } = await draw(document, state, {
      events: [],
      pace: 1,
      standing: "going",
    });
    const killing = [
      attacked(40, "wolf"),
      strike(40, 7, 14),
      strike(40, 7, 7),
      strike(40, 7, 0),
      ended(40, "characterDied"),
      { kind: "characterDied", minute: 40, cause: "combat" },
    ];
    await show(state, { events: killing, pace: 1, standing: "dead" });
    const [text] = blowTexts(container);
    assert.equal(text.textContent, "−21 · wilk");
    assert.equal(playState(text), "paused", "held at its first frame");
    assert.equal(playState(cellsOf(container)[HEALTH]), "paused");

    await show(state, { events: killing, pace: 1, standing: "going" });
    assert.equal(blowTexts(container)[0], text, "the same element goes on");
    assert.notEqual(playState(text), "paused");
    assert.notEqual(playState(cellsOf(container)[HEALTH]), "paused");
  });
});

// Catches a health cell that shakes under reduced motion, a text that moves under it or never goes, and
// a shake that is not one shake of a third of a second, or a text that is not one fading of 1.3 s.
test("under reduced motion the cell does not shake and the text stands still and goes; otherwise the cell shakes once in 0.34 s and the text rises and fades once in 1.3 s", async () => {
  // decision: D-450 "While game time stands — in the player's pause, at the moments of a discovery, a death and a completion, and on the screen after the end of a map run — the shake and the text stand where they reached, a marker that comes while it stands, as that of a killing blow does, standing at its first frame, and they go on when time goes on; under the system's setting for reduced motion the cell does not shake and the text stands still and goes"
  // decision: D-42 "The alarm's pulse of a fill, from full opacity to 40 % and back in 1.1 s, smoothly and with no end, is exempt from that ratio in its dim phase, the full colour keeping it, and the pulse and the shake and the fading text of a blow in the health cell (D-450) are judged by 2.3.1"
  await withPage(async ({ document }) => {
    const state = bodied({ health: 69 });
    const { container, show } = await draw(document, state, {
      events: [],
      pace: 1,
    });
    await show(state, { events: wolfCombat(), pace: 1 });
    const [text] = blowTexts(container);
    const cell = cellsOf(container)[HEALTH];

    assert.equal(
      animationUnder(cell, REDUCED),
      "",
      "no shake under reduced motion",
    );
    const shake = animationUnder(cell, NO_PREFERENCE);
    assert.ok(shake !== "", "the cell shakes");
    assert.equal(under(cell, NO_PREFERENCE, "animation-duration"), "340ms");
    assert.notEqual(
      under(cell, NO_PREFERENCE, "animation-iteration-count"),
      "infinite",
    );

    const still = animationUnder(text, REDUCED);
    assert.ok(still !== "", "the text stands and goes under reduced motion");
    assert.equal(under(text, REDUCED, "animation-duration"), "1.3s");
    assert.equal(
      under(text, REDUCED, "animation-timing-function"),
      "step-end",
      "it stands where it is until its time is out",
    );
    const stillFrames = keyframesOf(document, still, ["opacity", "translate"]);
    assert.deepEqual(stillFrames, { "100%": { opacity: "0", translate: "" } });

    const rising = animationUnder(text, NO_PREFERENCE);
    assert.ok(rising !== "" && rising !== still, "the text moves otherwise");
    assert.equal(under(text, NO_PREFERENCE, "animation-duration"), "1.3s");
    assert.notEqual(
      under(text, NO_PREFERENCE, "animation-iteration-count"),
      "infinite",
    );
    const frames = keyframesOf(document, rising, ["opacity", "translate"]);
    assert.equal(frames["100%"].opacity, "0", "it fades out");
    assert.notEqual(frames["100%"].translate, "", "and rises");
  });
});
