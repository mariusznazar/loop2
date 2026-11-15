// The header of the screen of a map run in React (D-311, D-130, D-132, D-133, D-122, D-62, D-188,
// D-44, D-46) on jsdom through tests/view/page-document.mjs (D-264): the character's name and the map's name before the
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
import {
  newKnowingGame,
  withEdgeSolved,
} from "../sim/understanding-fixture.mjs";

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
    withEdgeSolved(newKnowingGame()),
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
    openWindow: () => asked.push(["openWindow"]),
  };
}

/**
 * Draws the header in a root of its own; `show(state)` draws it anew from another state, as the
 * screen does at each tick, and `asked` collects what the buttons asked for.
 */
async function draw(document, state, windowOpen = false) {
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);
  const asked = [];
  const controls = controlsNoting(asked);
  const show = (next, open = windowOpen) =>
    inAct(() =>
      root.render(
        createElement(RunHeader, { state: next, controls, windowOpen: open }),
      ),
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

// D-311, D-133. Catches the character's action left in the header, the
// clock standing anywhere but after the map's name and the bar of the solving condition standing
// anywhere but right after the clock.
test("the header reads the character's name, the map's name, the clock, the bar of the solving condition, „Pauza”, the paces, „Restart” and „Zakończ”, in that order, with no action of the character", async () => {
  // decision: D-21 "A map run the player starts passes at one game minute per real second times the pace the player picks of 1×, 2×, 4×, 8× and 16×, and the player can pause and resume it"
  // decision: D-130 "The player picks the pace with five buttons „1×”, „2×”, „4×”, „8×” and „16×” beside „Pauza” in the header of the screen of a map run"
  // decision: D-133 "During a map run the header shows a bar with numbers for the requirements present in the map's solving condition: „Passa {streak}/{required}” for a streak and „Pokonane napaści {count}/{required}” for beaten attacks, in that order when both are present"
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
        "Passa 0/480",
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
      withEdgeSolved(newKnowingGame()),
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
  // decision: D-21 "A map run the player starts passes at one game minute per real second times the pace the player picks of 1×, 2×, 4×, 8× and 16×, and the player can pause and resume it"
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
  // decision: D-21 "A map run the player starts passes at one game minute per real second times the pace the player picks of 1×, 2×, 4×, 8× and 16×, and the player can pause and resume it"
  await withPage(async ({ document }) => {
    const { container, asked } = await draw(document, sent());
    await click(buttonNamed(container, "Pauza"));
    await click(buttonNamed(container, "Restart"));
    await click(buttonNamed(container, "Zakończ"));
    assert.deepEqual(asked, [["togglePause"], ["restart"], ["end"]]);
  });
});

test("„Restart” and „Zakończ” are destructive buttons and the paces and „Pauza” are not (D-44)", async () => {
  // decision: D-44 "The screens of the browser view build every button, select list, number field, text field and cell of a pick from the eight shared controls of `src/browser/view/controls/` — the button, the destructive button, the button selected in its group, the secondary action (D-275), the select list, the number field, the text field and the pick cell — and the buttons „Zakończ”, „Usuń”, „Restart”, „Porzuć zmiany”, „Przełącz postać na ten program”, „Zatrzymaj” and „Zacznij od zera” (D-402), and „Odrzuć” of the question „Zapisać, odrzucić, wrócić?” (D-173), are destructive buttons"
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
  // decision: D-21 "A map run the player starts passes at one game minute per real second times the pace the player picks of 1×, 2×, 4×, 8× and 16×, and the player can pause and resume it"
  // decision: D-130 "The player picks the pace with five buttons „1×”, „2×”, „4×”, „8×” and „16×” beside „Pauza” in the header of the screen of a map run, and the button of the pace in force is a button selected in its group"
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
  // decision: D-21 "A map run the player starts passes at one game minute per real second times the pace the player picks of 1×, 2×, 4×, 8× and 16×, and the player can pause and resume it"
  // decision: D-130 "The player picks the pace with five buttons „1×”, „2×”, „4×”, „8×” and „16×” beside „Pauza” in the header of the screen of a map run"
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
test("after a death the clock stands at the minute of the death with no cause and no „ (pauza)”, „Pauza” and the paces are gone, and „Koniec przejścia”, „Restart” and „Zakończ” stand", async () => {
  // decision: D-62 "After a character's death the screen stays on the state of the game minute of death and time stands still for that map run, the end-of-run window D-368 gives opens of itself over the screen, its header included and the menu bar not, and the player has „Restart”, which starts the map run again with the same seed from game minute zero, and „Zakończ”, which returns to the screen D-53 gives, in the window and, with the window closed, in the header"
  // decision: D-62 "After a character's death the pace buttons are gone together with „Pauza”"
  await withPage(async ({ document }) => {
    const running = sent();
    const { container, show } = await draw(document, running);
    assert.equal(buttonNamed(container, "Pauza") !== undefined, true);
    await show(dead(running, 312, "cold"));
    assert.equal(clockOf(container).textContent, "Minuta 312");
    assert.deepEqual(labels(container), [
      "Koniec przejścia",
      "Restart",
      "Zakończ",
    ]);
    await show(dead(setPaused(running, true).state, 312, "cold"));
    assert.equal(clockOf(container).textContent, "Minuta 312");
  });
});

// D-132: the completion text is „Teraz”'s. Catches the completion text left in the header and a
// „ (pauza)” after the end.
test("after a completion the clock stands at the minute of the completion with no completion text and no „ (pauza)”; the paces and „Pauza” go, „Koniec przejścia”, „Restart” and „Zakończ” stand", async () => {
  // decision: D-132 "After a completion the screen stays on the state of the game minute of the completion and time stands still for that map run, and „Teraz” reads the map's completion text, in Las „Las rozwiązany” and in Las — głębiej „Las — głębiej rozwiązany”, in the role `positive`, the clock in the header standing at that game minute, such as „Minuta 480”"
  // decision: D-132 "„Pauza” and the pace buttons are gone, and the player has „Restart” and „Zakończ” as after a character's death"
  await withPage(async ({ document }) => {
    const running = sent();
    const { container, show } = await draw(document, running);
    await show(completed(running, 480));
    assert.equal(clockOf(container).textContent, "Minuta 480");
    assert.deepEqual(labels(container), [
      "Koniec przejścia",
      "Restart",
      "Zakończ",
    ]);
    await show(completed(setPaused(running, true).state, 480));
    assert.equal(clockOf(container).textContent, "Minuta 480");
    await show(running);
    assert.equal(buttonNamed(container, "Pauza") !== undefined, true);
  });
});

// D-311, D-173. Catches a „Koniec przejścia” standing while the map run goes on or is
// paused, one standing while the window stands over the header, one missing after either end with
// the window closed, one after „Restart” and one asking for anything but the window.
test("„Koniec przejścia” stands before „Restart” only in an ended map run with the window closed, and asks to open the window", async () => {
  // decision: D-173 "„Zapisz” saves the copy as „Zapisz w programie” does, replacing the changes its program holds that the copy lacks, or, where its program was deleted, as a new program under the first free name with no name field, and ends the map run; „Odrzuć” ends it with no save; „Wróć” closes the question and leaves the map run as it was"
  await withPage(async ({ document }) => {
    const running = sent();
    const { container, asked, show } = await draw(document, running);
    assert.equal(buttonNamed(container, "Koniec przejścia"), undefined);
    await show(setPaused(running, true).state);
    assert.equal(buttonNamed(container, "Koniec przejścia"), undefined);
    for (const ended of [dead(running, 312, "cold"), completed(running, 480)]) {
      await show(ended, false);
      assert.deepEqual(labels(container), [
        "Koniec przejścia",
        "Restart",
        "Zakończ",
      ]);
      await show(ended, true);
      assert.equal(
        buttonNamed(container, "Koniec przejścia"),
        undefined,
        "none while the window stands",
      );
    }
    await show(dead(running, 312, "cold"), false);
    await click(buttonNamed(container, "Koniec przejścia"));
    assert.deepEqual(asked, [["openWindow"]]);
    await show(running, false);
    assert.equal(
      buttonNamed(container, "Koniec przejścia"),
      undefined,
      "none after „Restart” started a map run again",
    );
  });
});

// D-311, D-368: the window covers the header. Catches a header drawn visibly under the window, and a header
// hidden while the window is closed or while the map run goes on.
test("the header is hidden while the window stands over an ended map run, and shown otherwise", async () => {
  // decision: D-132 "After a completion the screen stays on the state of the game minute of the completion and time stands still for that map run, and „Teraz” reads the map's completion text, in Las „Las rozwiązany” and in Las — głębiej „Las — głębiej rozwiązany”, in the role `positive`, the clock in the header standing at that game minute, such as „Minuta 480”, and the end-of-run window (D-368) opens of itself over the screen, its header included and the menu bar not, under the same completion text as its title, in the role `positive`"
  await withPage(async ({ document }) => {
    const running = sent();
    const { container, show } = await draw(document, running);
    const header = () => container.querySelector(".run-header");
    assert.equal(header().hidden, false);
    await show(running, true);
    assert.equal(
      header().hidden,
      false,
      "a map run that goes on has no window to hide the header",
    );
    const died = dead(running, 312, "cold");
    await show(died, true);
    assert.equal(header().hidden, true, "hidden under the window");
    await show(died, false);
    assert.equal(header().hidden, false, "shown with the window closed");
    const done = completed(running, 480);
    await show(done, true);
    assert.equal(header().hidden, true);
  });
});

test("the warning of a cut trip plan follows the current copy's take list", async () => {
  // decision: D-18 "The game's content — game maps, items, creatures, character skills and their numbers — stands in data files"
  // decision: D-179 "The backpack is the cap on both sides, a map may add a stricter cap of its own down to zero, and a trip plan over the map's cap does not keep the character from entering the map: it goes in cut, and the player is told so beforehand"
  // decision: D-188 "The same line stands on the screen of a map run beside „Restart” for the current copy and map; when carrying capacity itself clips the plan and the map does not, this line is absent"
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
  // decision: D-46 "The game loads fonts only from those files, never from another server, and sets the chronicle and the clock of the map run in Geist Mono"
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

/** The same game with its map run's counts and map replaced, as a map run of that map at them. */
function counted(state, mapId, counts) {
  return { ...state, run: { ...state.run, mapId, ...counts } };
}

const requirementsOf = (container) => [
  ...container.querySelectorAll(".run-header-requirement"),
];
const fillOf = (requirement) =>
  requirement.querySelector(".run-header-requirement-fill");
const trackOf = (requirement) =>
  requirement.querySelector(".run-header-requirement-bar");
const textOf = (requirement) =>
  requirement.querySelector(".run-header-requirement-text");

// D-133: the bar stands right after the clock, before „Pauza”. Catches a bar at the end
// of the header, before the clock or after the buttons.
test("the bar of the solving condition stands right after the clock, with its numbers and its bar", async () => {
  // decision: D-133 "During a map run the header shows a bar with numbers for the requirements present in the map's solving condition: „Passa {streak}/{required}” for a streak and „Pokonane napaści {count}/{required}” for beaten attacks, in that order when both are present"
  await withPage(async ({ document }) => {
    const running = counted(sent(), "forest", { streak: 120 });
    const { container } = await draw(document, running);
    const header = container.querySelector(".run-header");
    const children = [...header.children];
    const clock = clockOf(container);
    const next = children[children.indexOf(clock) + 1];
    assert.equal(next.textContent, "Passa 120/480");
    const [requirement, ...rest] = requirementsOf(container);
    assert.equal(rest.length, 0);
    assert.equal(next.contains(requirement), true);
    assert.equal(textOf(requirement).textContent, "Passa 120/480");
    assert.ok(trackOf(requirement), "its bar stands beside the numbers");
    assert.ok(
      trackOf(requirement).contains(fillOf(requirement)),
      "the fill stands in its track",
    );
  });
});

// D-133: the parts of Las — głębiej, in their order. Catches the beaten attacks before the passa.
test("on Las — głębiej the passa stands before the beaten attacks, each with its own bar", async () => {
  // decision: D-133 "During a map run the header shows a bar with numbers for the requirements present in the map's solving condition: „Passa {streak}/{required}” for a streak and „Pokonane napaści {count}/{required}” for beaten attacks, in that order when both are present"
  await withPage(async ({ document }) => {
    const state = counted(sent(), "forestDeep", {
      streak: 120,
      defeatedAttacks: 1,
    });
    const { container } = await draw(document, state);
    const parts = requirementsOf(container);
    assert.deepEqual(
      parts.map((part) => textOf(part).textContent),
      ["Passa 120/540", "Pokonane napaści 1/2"],
    );
    assert.deepEqual(
      parts.map((part) => trackOf(part) !== null),
      [true, true],
    );
  });
});

// D-133: Las asks for a passa alone. Catches a bar for a requirement the map's data lacks.
test("Las has no part for beaten attacks, as it asks for none", async () => {
  // decision: D-133 "During a map run the header shows a bar with numbers for the requirements present in the map's solving condition: „Passa {streak}/{required}” for a streak and „Pokonane napaści {count}/{required}” for beaten attacks, in that order when both are present"
  await withPage(async ({ document }) => {
    const { container } = await draw(document, sent());
    assert.equal(requirementsOf(container).length, 1);
    assert.equal(container.textContent.includes("Pokonane napaści"), false);
  });
});

// D-40, D-133: the fill is as long as the share of the count in the number required, never
// more than whole. Catches a fill drawn from the wrong share, a percentage and one above whole.
test("the fill of each bar is as long as the share of its count, never more than whole", async () => {
  await withPage(async ({ document }) => {
    const state = counted(sent(), "forestDeep", {
      streak: 120,
      defeatedAttacks: 1,
    });
    const { container, show } = await draw(document, state);
    const shares = () =>
      requirementsOf(container).map((part) =>
        fillOf(part).style.getPropertyValue("--share"),
      );
    assert.deepEqual(shares(), ["0.2222222222222222", "0.5"]);
    await show(
      counted(state, "forestDeep", { streak: 600, defeatedAttacks: 2 }),
    );
    assert.deepEqual(shares(), ["1", "1"]);
    await show(counted(state, "forestDeep", { streak: 0, defeatedAttacks: 0 }));
    assert.deepEqual(shares(), ["0", "0"]);
  });
});

// D-40, D-39, D-133: the roles of the bar through the real stylesheet. A requirement
// not met has its track in `highlight`, its fill and its words in `text`; once met, its fill, its
// name and its numbers are in `positive`, and the requirement beside it, unmet, stays as it was.
// Catches a fill always green, a met requirement that turns only its fill and a track in another role.
test("a requirement not met has its fill in text on a track in highlight, a met one its fill, name and numbers in positive", async () => {
  // decision: D-40 "The bar of a requirement of the solving condition in the header has its track in `highlight` and, while the requirement is not met, its fill in `text`, though it is no text"
  // decision: D-39 "`positive` also stands as the fill of the bar of a met requirement of the solving condition in the header, on a track in `highlight`, with a contrast ratio of at least 3:1 against what it stands on"
  // decision: D-133 "A requirement that is met shows its name, its numbers and the fill of its bar in the role `positive`"
  await withPage(async ({ document, window }) => {
    addStylesheet(document);
    const state = counted(sent(), "forestDeep", {
      streak: 120,
      defeatedAttacks: 2,
    });
    const { container } = await draw(document, state);
    const [streak, attacks] = requirementsOf(container);
    const style = (element) => window.getComputedStyle(element);
    assert.equal(style(trackOf(streak)).backgroundColor, "var(--highlight)");
    assert.equal(style(trackOf(attacks)).backgroundColor, "var(--highlight)");
    assert.equal(style(fillOf(streak)).backgroundColor, "var(--text)");
    assert.equal(style(textOf(streak)).color, "var(--text)");
    assert.equal(style(fillOf(attacks)).backgroundColor, "var(--positive)");
    assert.equal(style(textOf(attacks)).color, "var(--positive)");
    assert.equal(streak.classList.contains("positive"), false);
    assert.equal(attacks.classList.contains("positive"), true);
  });
});

// D-133, D-135: the bar stands after the end, at the stopped minute, with the current
// streak. Catches the bar gone after a death and the longest streak shown.
test("after a death of cold the bar stands and reads „Passa 0/480”", async () => {
  // decision: D-133 "A requirement that is met shows its name, its numbers and the fill of its bar in the role `positive`, and the bar stands on the screen after the end of the map run too, on the state of its stopped game minute and with the streak as it stands then, such as „Passa 0/480” after a death of cold"
  await withPage(async ({ document }) => {
    const running = counted(sent(), "forest", { streak: 120 });
    const { container, show } = await draw(document, running);
    assert.equal(
      textOf(requirementsOf(container)[0]).textContent,
      "Passa 120/480",
    );
    await show(dead(counted(running, "forest", { streak: 0 }), 312, "cold"));
    assert.equal(clockOf(container).textContent, "Minuta 312");
    assert.deepEqual(
      requirementsOf(container).map((part) => textOf(part).textContent),
      ["Passa 0/480"],
    );
    assert.equal(
      fillOf(requirementsOf(container)[0]).style.getPropertyValue("--share"),
      "0",
    );
    assert.deepEqual(labels(container), [
      "Koniec przejścia",
      "Restart",
      "Zakończ",
    ]);
  });
});

test("after a completion the bar stands, met, at the minute of the completion", async () => {
  // decision: D-39 "`positive` also stands as the fill of the bar of a met requirement of the solving condition in the header, on a track in `highlight`, with a contrast ratio of at least 3:1 against what it stands on"
  // decision: D-133 "A requirement that is met shows its name, its numbers and the fill of its bar in the role `positive`, and the bar stands on the screen after the end of the map run too, on the state of its stopped game minute and with the streak as it stands then, such as „Passa 0/480” after a death of cold"
  await withPage(async ({ document }) => {
    const done = completed(counted(sent(), "forest", { streak: 480 }), 480);
    const { container } = await draw(document, done);
    const [part] = requirementsOf(container);
    assert.equal(textOf(part).textContent, "Passa 480/480");
    assert.equal(part.classList.contains("positive"), true);
  });
});

// D-46: only the chronicle and the clock stand in Geist Mono, so the name and numbers of the bar of
// the solving condition do not; tabular figures keep them from jittering in Geist too. Catches the
// mono face set on the bar's words.
test("the words of the bar of the solving condition are not in the mono face of the clock, and keep tabular figures", async () => {
  // decision: D-46 "The game loads fonts only from those files, never from another server, and sets the chronicle and the clock of the map run in Geist Mono and every other text in Geist"
  await withPage(async ({ document, window }) => {
    addStylesheet(document);
    const { container } = await draw(document, sent());
    const style = window.getComputedStyle(
      requirementsOf(container)[0].querySelector(
        ".run-header-requirement-text",
      ),
    );
    assert.notEqual(style.fontFamily, "var(--font-family-mono)");
    assert.equal(style.fontVariantNumeric, "tabular-nums");
  });
});
