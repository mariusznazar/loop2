// The header of the screen of a map run in React (task ekran-przejscia, To do 1 and 8; D-311, D-130,
// D-132, D-133, D-62, D-188, D-44, D-46) on jsdom through tests/view/page-document.mjs (D-264): the
// character's name and the map's name before the whole status row in its order, the pace buttons,
// the ends of a map run, the warning of a cut trip plan and the focus of a pace button across
// updates. Real events, focus rings and the look are checked in the browser (D-88), so a focus case
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
const statusOf = (container) => container.querySelector(".run-header-status");
const click = (element) =>
  inAct(() => {
    element.click();
  });

test("the header reads the character's name and the map's name before the whole status row, in its order", async () => {
  await withPage(async ({ document }) => {
    const { container } = await draw(document, sent());
    const header = container.querySelector(".run-header");
    assert.ok(header, "the header stands");
    assert.deepEqual(
      [...header.children].map((child) => child.textContent),
      [
        "Ala",
        "Las",
        "Minuta 0 · Eksploruje · Passa 0/480",
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

test("the status text keeps the wording of the status row, „ (pauza)” at its end while paused, and „Wznów” takes the place of „Pauza”", async () => {
  await withPage(async ({ document }) => {
    const running = advanceMinutes(sent(), 3).state;
    const { container, show } = await draw(document, running);
    assert.equal(
      statusOf(container).textContent,
      "Minuta 3 · Eksploruje · Passa 3/480",
    );
    assert.equal(buttons(container)[0].textContent, "Pauza");
    await show(setPaused(running, true).state);
    assert.equal(
      statusOf(container).textContent,
      "Minuta 3 · Eksploruje · Passa 3/480 (pauza)",
    );
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

test("after a death the header reads the minute and the cause, „Pauza” and the paces are gone, and „Restart” and „Zakończ” stay", async () => {
  await withPage(async ({ document }) => {
    const running = sent();
    const { container, show } = await draw(document, running);
    assert.equal(buttonNamed(container, "Pauza") !== undefined, true);
    await show(dead(running, 312, "cold"));
    assert.equal(statusOf(container).textContent, "Minuta 312 · Mag zamarzł");
    assert.deepEqual(labels(container), ["Restart", "Zakończ"]);
  });
});

test("the status text is positive after a completion and only then; the paces and „Pauza” go, „Restart” and „Zakończ” stay", async () => {
  await withPage(async ({ document }) => {
    const running = sent();
    const { container, show } = await draw(document, running);
    const positive = () => statusOf(container).classList.contains("positive");
    assert.equal(positive(), false);
    await show(completed(running, 480));
    assert.equal(
      statusOf(container).textContent,
      "Minuta 480 · Las rozwiązany",
    );
    assert.equal(positive(), true);
    assert.deepEqual(labels(container), ["Restart", "Zakończ"]);
    await show(running);
    assert.equal(positive(), false);
    assert.equal(buttonNamed(container, "Pauza") !== undefined, true);
    await show(dead(running, 312, "cold"));
    assert.equal(positive(), false);
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

// D-46: the clock of the map run is set in Geist Mono. jsdom does not resolve a custom property, so
// the case reads which token the rule of the status text lands on, through the real stylesheet.
test("the status text stands in the mono face of the stylesheet, as the clock does", async () => {
  await withPage(async ({ document, window }) => {
    const style = document.createElement("style");
    style.textContent = readFileSync(
      new URL("../../src/browser/styles.css", import.meta.url),
      "utf8",
    );
    document.head.append(style);
    const { container } = await draw(document, sent());
    assert.equal(
      window.getComputedStyle(statusOf(container)).fontFamily,
      "var(--font-family-mono)",
    );
  });
});
