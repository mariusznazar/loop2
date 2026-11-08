// The header of the screen of a map run in React (task ekran-przejscia, To do 1 and 8; task
// teraz-i-potem, To do 3; D-311, D-130, D-132, D-133, D-122, D-62, D-188, D-44, D-46) on jsdom
// through tests/view/page-document.mjs (D-264): the character's name and the map's name before the
// clock, „Pauza” and the rest in their order with no action of the character, the pace buttons, the
// ends of a map run with the clock at the minute of the end, the warning of a cut trip plan and the
// focus of a pace button across updates. Real events, focus rings and the look are checked in the browser (D-88), so a focus case
// here holds only what jsdom shows. Every comparison is of plain data or of a handful of words
// (D-268).
import { assert, inAct, withPage } from "./page-document.mjs";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import {
  advanceMinutes,
  createCharacter,
  newGame,
  send,
  setPace,
  setPaused,
  setProgram,
} from "../../dist/browser/sim/game.js";
import { RunHeader } from "../../dist/browser/view/run-header.js";
import { programFromRules } from "../sim/program-fixture.mjs";
import { newKnowingGame } from "../sim/understanding-fixture.mjs";

const SENT = {
  mapId: "forest",
  // The first character a new game creates takes the id 1.
  characterId: 1,
};
const EXPLORE = [
  { condition: { kind: "always" }, action: { kind: "explore" } },
];

/** A game with a map run of the character „Ala” started under the given program rules. */
function sent(rules = EXPLORE) {
  const program = setProgram(
    newKnowingGame(),
    programFromRules(...rules),
  ).state;
  return send(createCharacter(program, "Ala").state, SENT, 1760000000000).state;
}

/** The same game with its map run ended in a completion at the given minute. */
function completed(state, minute) {
  return {
    ...state,
    run: { ...state.run, minute, completion: { minute } },
  };
}

/** The same game with its map run ended in death of the given cause at the given minute. */
function dead(state, minute, cause) {
  return {
    ...state,
    run: { ...state.run, minute, death: { minute, cause } },
  };
}

/** The controls of the status row, each noting in `asked` what it was asked for. */
function controlsNoting(asked) {
  return {
    togglePause: () => asked.push(["togglePause"]),
    setPace: (pace) => asked.push(["setPace", pace]),
    restart: () => asked.push(["restart"]),
    end: () => asked.push(["end"]),
  };
}

/**
 * Draws the header in a root of its own; `show(state)` draws it anew from another state, as the
 * screen does at each tick, and `asked` collects what the buttons asked for.
 */
async function draw(document, state) {
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);
  const asked = [];
  const controls = controlsNoting(asked);
  const show = (next) =>
    inAct(() =>
      root.render(createElement(RunHeader, { state: next, controls })),
    );
  await show(state);
  return { container, asked, show };
}

const buttons = (container) => [...container.querySelectorAll("button")];
const labels = (container) => buttons(container).map((b) => b.textContent);
const buttonNamed = (container, name) =>
  buttons(container).find((b) => b.textContent === name);
const paceButtons = (container) =>
  buttons(container).filter((b) => /^\d+×$/.test(b.textContent));
const clockOf = (container) => container.querySelector(".run-header-clock");
const click = (element) =>
  inAct(() => {
    element.click();
  });

// D-311, task teraz-i-potem To do 3. Catches the character's action or the streak left in the
// header, and the clock standing anywhere but after the map's name.
test("the header reads the character's name, the map's name, the clock, „Pauza”, the paces, „Restart” and „Zakończ”, in that order, with no action of the character", async () => {
  await withPage(async ({ document }) => {
    const { container } = await draw(document, sent());
    const header = container.querySelector(".run-header");
    assert.ok(header, "the header stands");
    assert.deepEqual(
      [...header.children].map((child) => child.textContent),
      [
        "Ala",
        "Las",
        "Minuta 0",
        "Pauza",
        "1×",
        "2×",
        "4×",
        "8×",
        "16×",
        "Restart",
        "Zakończ",
      ],
    );
  });
});

test("the name is the one of the team member whose map run it is", async () => {
  await withPage(async ({ document }) => {
    const program = setProgram(
      newKnowingGame(),
      programFromRules(...EXPLORE),
    ).state;
    const team = createCharacter(
      createCharacter(program, "Ala").state,
      "Basia",
    ).state;
    const second = send(team, { ...SENT, characterId: 2 }, 1760000000000).state;
    const { container } = await draw(document, second);
    assert.equal(
      container.querySelector(".run-header-name").textContent,
      "Basia",
    );
  });
});

// D-122: „ (pauza)” after the clock at every pause. Catches a clock that does not follow the pause or
// keeps the action of the character.
test("the clock reads the game minute, „ (pauza)” after it while paused, and „Wznów” takes the place of „Pauza”", async () => {
  await withPage(async ({ document }) => {
    const running = advanceMinutes(sent(), 3).state;
    const { container, show } = await draw(document, running);
    assert.equal(clockOf(container).textContent, "Minuta 3");
    assert.equal(buttons(container)[0].textContent, "Pauza");
    await show(setPaused(running, true).state);
    assert.equal(clockOf(container).textContent, "Minuta 3 (pauza)");
    assert.equal(buttons(container)[0].textContent, "Wznów");
  });
});

test("the buttons ask for what they say: the pause, the restart and the end", async () => {
  await withPage(async ({ document }) => {
    const { container, asked } = await draw(document, sent());
    await click(buttonNamed(container, "Pauza"));
    await click(buttonNamed(container, "Restart"));
    await click(buttonNamed(container, "Zakończ"));
    assert.deepEqual(asked, [["togglePause"], ["restart"], ["end"]]);
  });
});

test("„Restart” and „Zakończ” are destructive buttons and the paces and „Pauza” are not (D-44)", async () => {
  await withPage(async ({ document }) => {
    const { container } = await draw(document, sent());
    for (const name of ["Restart", "Zakończ"]) {
      assert.ok(
        buttonNamed(container, name).classList.contains("destructive"),
        `${name} is destructive`,
      );
    }
    for (const button of [
      buttonNamed(container, "Pauza"),
      ...paceButtons(container),
    ]) {
      assert.equal(button.classList.contains("destructive"), false);
    }
  });
});

test("the header shows five pace buttons, 1× to 16×, with the one of the state's pace selected", async () => {
  await withPage(async ({ document }) => {
    const running = sent();
    const { container, show } = await draw(document, running);
    const pressed = () =>
      paceButtons(container).map((button) =>
        button.getAttribute("aria-pressed"),
      );
    assert.deepEqual(
      paceButtons(container).map((button) => button.textContent),
      ["1×", "2×", "4×", "8×", "16×"],
    );
    assert.deepEqual(pressed(), ["true", "false", "false", "false", "false"]);
    await show(setPace(running, 8).state);
    assert.deepEqual(pressed(), ["false", "false", "false", "true", "false"]);
    assert.equal(
      paceButtons(container)[3].classList.contains("selected"),
      true,
      "the pace in force has the look of the button selected in its group",
    );
  });
});

test("a click on a pace button asks for that pace; the buttons stay while paused and go with death", async () => {
  await withPage(async ({ document }) => {
    const running = sent();
    const { container, asked, show } = await draw(document, running);
    await click(paceButtons(container)[4]);
    await click(paceButtons(container)[1]);
    assert.deepEqual(asked, [
      ["setPace", 16],
      ["setPace", 2],
    ]);
    await show(setPaused(running, true).state);
    assert.equal(paceButtons(container).length, 5);
    await show(dead(running, 312, "cold"));
    assert.equal(paceButtons(container).length, 0);
  });
});

// D-62, D-334: the cause of the death is not the header's. Catches the cause left in the header and
// a „ (pauza)” after the end.
test("after a death the clock stands at the minute of the death with no cause and no „ (pauza)”, „Pauza” and the paces are gone, and „Restart” and „Zakończ” stay", async () => {
  await withPage(async ({ document }) => {
    const running = sent();
    const { container, show } = await draw(document, running);
    assert.equal(buttonNamed(container, "Pauza") !== undefined, true);
    await show(dead(running, 312, "cold"));
    assert.equal(clockOf(container).textContent, "Minuta 312");
    assert.deepEqual(labels(container), ["Restart", "Zakończ"]);
    await show(dead(setPaused(running, true).state, 312, "cold"));
    assert.equal(clockOf(container).textContent, "Minuta 312");
  });
});

// D-132: the completion text is „Teraz”'s. Catches the completion text left in the header and a
// „ (pauza)” after the end.
test("after a completion the clock stands at the minute of the completion with no completion text and no „ (pauza)”; the paces and „Pauza” go, „Restart” and „Zakończ” stay", async () => {
  await withPage(async ({ document }) => {
    const running = sent();
    const { container, show } = await draw(document, running);
    await show(completed(running, 480));
    assert.equal(clockOf(container).textContent, "Minuta 480");
    assert.deepEqual(labels(container), ["Restart", "Zakończ"]);
    await show(completed(setPaused(running, true).state, 480));
    assert.equal(clockOf(container).textContent, "Minuta 480");
    await show(running);
    assert.equal(buttonNamed(container, "Pauza") !== undefined, true);
  });
});

test("the warning of a cut trip plan follows the current copy's take list", async () => {
  await withPage(async ({ document }) => {
    const map = MAPS.forest;
    MAPS.forest = { ...map, carryIn: 2 };
    try {
      const state = sent([]);
      const { container, show } = await draw(document, state);
      const warning = () => container.querySelector(".trip-warning");
      assert.equal(warning(), null);
      const changed = setProgram(state, {
        ...state.run.copy.program,
        tripPlan: { take: [{ item: "berry", count: 3 }], bring: [] },
      }).state;
      await show(changed);
      assert.equal(
        warning().textContent,
        "Plan wyprawy wejdzie przycięty: mapa wpuszcza najwyżej 2 sztuk.",
      );
      const header = container.querySelector(".run-header");
      const names = [...header.children].map((child) => child.textContent);
      assert.equal(
        names.indexOf(warning().textContent),
        names.indexOf("Restart") + 1,
        "the warning stands after „Restart”",
      );
      assert.equal(names.at(-1), "Zakończ", "and before „Zakończ”");
      await show(state);
      assert.equal(warning(), null);
    } finally {
      MAPS.forest = map;
    }
  });
});

test("a focused pace button keeps the focus across updates, also while the clock moves and the map run is paused", async () => {
  await withPage(async ({ document }) => {
    const running = sent();
    const { container, show } = await draw(document, running);
    const button = paceButtons(container)[2];
    button.focus();
    assert.equal(document.activeElement, button, "the button took the focus");
    await show(advanceMinutes(running, 5).state);
    assert.equal(document.activeElement, button, "after a tick");
    assert.equal(paceButtons(container)[2], button, "the same element stands");
    await show(setPaused(advanceMinutes(running, 5).state, true).state);
    assert.equal(document.activeElement, button, "after a pause");
    await show(setPace(running, 4).state);
    assert.equal(document.activeElement, button, "after the pace is picked");
  });
});

test("the header draws nothing while the game state holds no map run", async () => {
  await withPage(async ({ document }) => {
    const { container } = await draw(
      document,
      createCharacter(newGame(), "Ala").state,
    );
    assert.equal(container.querySelector(".run-header"), null);
  });
});

/** Puts the real stylesheet into the document; jsdom resolves the cascade, not a custom property. */
function addStylesheet(document) {
  const style = document.createElement("style");
  style.textContent = readFileSync(
    new URL("../../src/browser/styles.css", import.meta.url),
    "utf8",
  );
  document.head.append(style);
}

// D-46: the clock of the map run is set in Geist Mono with tabular figures. jsdom does not resolve a
// custom property, so the case reads which token the rule of the clock lands on, through the real
// stylesheet.
test("the clock stands in the mono face of the stylesheet, with tabular figures", async () => {
  await withPage(async ({ document, window }) => {
    addStylesheet(document);
    const { container } = await draw(document, sent());
    const style = window.getComputedStyle(clockOf(container));
    assert.equal(style.fontFamily, "var(--font-family-mono)");
    assert.equal(style.fontVariantNumeric, "tabular-nums");
  });
});

// D-311, D-132: the clock is in the role `text` after a death and after a completion, not in
// `positive` as the old status text was after a completion. Catches the clock green after a
// completion.
test("the clock is in the role text while running, after a death and after a completion", async () => {
  await withPage(async ({ document, window }) => {
    addStylesheet(document);
    const running = sent();
    const { container, show } = await draw(document, running);
    const colour = () => window.getComputedStyle(clockOf(container)).color;
    assert.equal(colour(), "var(--text)");
    await show(dead(running, 312, "cold"));
    assert.equal(colour(), "var(--text)");
    await show(completed(running, 480));
    assert.equal(colour(), "var(--text)");
    assert.equal(clockOf(container).classList.contains("positive"), false);
  });
});
