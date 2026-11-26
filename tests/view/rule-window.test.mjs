// The window of a rule and of a rule group in the program editor (D-288, D-296, D-303, D-306, D-311,
// D-44) on jsdom through tests/view/page-document.mjs (D-264): the program panel built and wired as
// the game view wires it, each control a real simulation call. jsdom lays nothing out, so a case that
// needs where the window and the rows stand gives their boxes itself; the look of both layouts and a
// real tap are the browser check's (D-88).
import { assert, inAct, press, typeInto, withPage } from "./page-document.mjs";
import { test } from "node:test";
import {
  createCharacter,
  send,
  setProgram,
} from "../../dist/browser/sim/game.js";
import { editProgram } from "../../dist/browser/sim/programs.js";
import { createProgramPanel } from "../../dist/browser/view/program-panel.js";
import { gameStylesheetText } from "./game-stylesheets.mjs";
import {
  newKnowingGame,
  withEdgeSolved,
} from "../sim/understanding-fixture.mjs";

const ALWAYS = { kind: "always" };
const EXPLORE = { kind: "explore" };
const rule = (id, condition, action) => ({ id, condition, action });
// The first character a new game creates takes the id 1; the forest is the first map sent to.
const SENT = { mapId: "forest", characterId: 1 };
const REAL_MS = 1760000000000;

/** Two groups: „Pierwsza” with rule 1, „Zapas poniżej 8 szt. · Patyk → Eksploruj”, and rule 2; „Druga” with rule 3. */
function twoGroups() {
  return {
    groups: [
      {
        id: 1,
        name: "Pierwsza",
        condition: ALWAYS,
        rules: [
          rule(1, { kind: "itemBelow", item: "stick", value: 8 }, EXPLORE),
          rule(2, ALWAYS, EXPLORE),
        ],
      },
      {
        id: 2,
        name: "Druga",
        condition: ALWAYS,
        rules: [rule(3, ALWAYS, EXPLORE)],
      },
    ],
    tripPlan: { take: [], bring: [] },
    nextGroupId: 3,
    nextRuleId: 4,
  };
}

/** A game whose program 1 is `program`, with the character Ala in the team. */
function gameWith(program = twoGroups()) {
  const programmed = setProgram(
    withEdgeSolved(newKnowingGame()),
    program,
  ).state;
  return createCharacter(programmed, "Ala").state;
}

/** A reading of the state of the screen Przejście whose question the case puts by `ask`. */
function questionReading() {
  let snapshot = { question: null, windowShown: false };
  const listeners = new Set();
  return {
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    snapshot: () => snapshot,
    ask() {
      snapshot = {
        question: { resume: false, opens: null },
        windowShown: false,
      };
      for (const listener of [...listeners]) listener();
    },
  };
}

/**
 * The panel of `mode` built in the page and wired as the game view wires it: an edit of the copy is
 * `setProgram`, an edit of a saved program `editProgram`, each result drawn at once. `hints` keeps,
 * for each edit of the copy, the hint of a move it carried.
 */
async function wiredPanel({ root }, start, mode, question = null) {
  const game = { state: start, hints: [], panel: null };
  const apply = (result) => {
    game.state = result.state;
    game.panel.update(game.state, result.events);
  };
  const controls = {
    editCopy(program, move) {
      game.hints.push(move);
      apply(setProgram(game.state, program));
    },
    editProgram(programId, program) {
      apply(editProgram(game.state, programId, program));
    },
  };
  game.panel = createProgramPanel(
    controls,
    mode,
    undefined,
    question === null
      ? null
      : {
          state: question,
          answers: { saveAndEnd() {}, discardAndEnd() {}, back() {} },
        },
  );
  game.root = game.panel.element;
  root.append(game.panel.element);
  await inAct(() => game.panel.update(game.state, []));
  return game;
}

const rowOf = (root, id) => root.querySelector(`[data-rule="${id}"]`);
const headerOf = (root, id) =>
  root.querySelector(`[data-group="${id}"] .rule-list-header`);
const windowOf = (root) => root.querySelector(".rule-panel");
const headingOf = (root) =>
  windowOf(root)?.querySelector(".rule-panel-heading")?.textContent ?? null;
const buttonNamed = (root, text) =>
  [...root.querySelectorAll("button")].find(
    (button) => button.textContent === text,
  );
const barButton = (root, text) =>
  buttonNamed(windowOf(root).querySelector(".rule-panel-bar"), text);
const idsOf = (program) =>
  program.groups.map((group) => group.rules.map((each) => each.id));
const openRow = (root, id) =>
  press(rowOf(root, id).querySelector(".rule-condition"));

/** Sends a key to `target` inside act, as the keyboard does. */
function key(target, name) {
  const { KeyboardEvent } = target.ownerDocument.defaultView;
  return inAct(() =>
    target.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: name,
        bubbles: true,
        cancelable: true,
      }),
    ),
  );
}

/**
 * Gives the elements of the page the boxes a browser would lay out: each the first box of `boxes`
 * whose selector it matches, `[top, bottom]`, and every other element a box at zero, as jsdom gives.
 */
function layOut(window, boxes) {
  window.Element.prototype.getBoundingClientRect = function box() {
    const found = boxes.find(([selector]) => this.matches(selector));
    const [top, bottom] = found === undefined ? [0, 0] : found[1];
    return { top, bottom, left: 0, right: 0, width: 0, height: bottom - top };
  };
}

// Breaks: a heading without the name of the group, one that reads the text typed before it is saved,
// a name part „„””  for a group with no name, the sentence missing from the window of a group or
// standing in the window of a rule.
test("the window of a rule reads „Reguła {n.m} w grupie „{nazwa}””, that of a group „Grupa {n} „{nazwa}”” with the sentence of its condition, the saved name alone and none for a group with no name", async () => {
  // decision: D-288 "A rule's row reads as a sentence and the window of the rule changes it, as the window of a rule group changes the group"
  // decision: D-296 "A click on the header of a rule group opens the window of the group with the group's name and condition."
  await withPage(async (page) => {
    const game = await wiredPanel(page, gameWith(), "programs");
    await openRow(game.root, 2);
    assert.equal(headingOf(game.root), "Reguła 1.2 w grupie „Pierwsza”");
    assert.equal(
      windowOf(game.root).querySelector(".rule-panel-explain"),
      null,
    );

    await press(headerOf(game.root, 2));
    assert.equal(headingOf(game.root), "Grupa 2 „Druga”");
    const fields = [
      ...windowOf(game.root).querySelectorAll(".rule-panel-field"),
    ];
    const sentence = windowOf(game.root).querySelector(".rule-panel-explain");
    assert.equal(
      sentence?.textContent,
      "Gdy warunek grupy nie jest spełniony, program pomija wszystkie jej reguły.",
    );
    assert.equal(
      fields.at(-1).nextElementSibling,
      sentence,
      "the sentence stands right under the group's condition",
    );

    const name = windowOf(game.root).querySelector(
      'input[aria-label="Nazwa grupy"]',
    );
    await inAct(() => name.focus());
    await typeInto(name, "Ogień");
    assert.equal(headingOf(game.root), "Grupa 2 „Druga”", "not saved yet");
    await key(name, "Enter");
    assert.equal(headingOf(game.root), "Grupa 2 „Ogień”");

    const again = windowOf(game.root).querySelector(
      'input[aria-label="Nazwa grupy"]',
    );
    await inAct(() => again.focus());
    await typeInto(again, "   ");
    await key(again, "Enter");
    assert.equal(game.state.programs[0].program.groups[1].name, "   ");
    assert.equal(headingOf(game.root), "Grupa 2");
    await openRow(game.root, 3);
    assert.equal(headingOf(game.root), "Reguła 2.1");
  });
});

// Breaks: the window as a block in the flow of the list, which moves the rows under it down; a
// backdrop or a modal mark, which would cut the rows above and below it off; the bar of the phone
// layout drawn in the computer layout; the window framed in `divider` with no shadow, on `panel` as
// the column it lies on, so that it reads as a continuation of that column.
test("the window is a dialog named by its heading, not modal, laid over the rows from directly under its row in a frame of its role with a shadow, and the computer layout draws no bar", async () => {
  // decision: D-288 "It is as tall as its content and stands directly under the row of the rule or the header of the rule group that opened it, lying over the rows below it"
  // decision: D-288 "In the computer layout „↑”, „↓” and „Usuń” of a rule stand in its row and „↑” and „↓” of a rule group in its header, and the window holds none of them."
  // decision: D-40 "`window-frame` means that this block is a window lying over the screen beneath it"
  await withPage(async (page) => {
    const style = page.document.createElement("style");
    style.textContent = gameStylesheetText();
    page.document.head.append(style);
    const game = await wiredPanel(page, gameWith(), "programs");
    await openRow(game.root, 1);
    const shown = windowOf(game.root);
    assert.equal(shown.getAttribute("role"), "dialog");
    const heading = page.document.getElementById(
      shown.getAttribute("aria-labelledby"),
    );
    assert.equal(heading?.textContent, "Reguła 1.1 w grupie „Pierwsza”");
    assert.equal(shown.getAttribute("aria-modal"), null);
    assert.ok(
      rowOf(game.root, 1).nextElementSibling.contains(shown),
      "the window stands right under its row",
    );
    const view = page.window;
    assert.equal(view.getComputedStyle(shown).position, "absolute");
    // jsdom drops a `var()` standing in a shorthand from the computed style, so the frame is read
    // from the last rule of the stylesheet that matches the window and declares its colour.
    const frame = [...style.sheet.cssRules]
      .filter(
        (each) =>
          each.selectorText !== undefined &&
          shown.matches(each.selectorText) &&
          each.style.getPropertyValue("border-color") !== "",
      )
      .at(-1)
      ?.style.getPropertyValue("border-color");
    assert.equal(frame, "var(--window-frame)", "the window framed in its role");
    assert.equal(
      view.getComputedStyle(shown).boxShadow,
      "var(--window-shadow)",
      "a shadow under the window",
    );
    assert.equal(
      view.getComputedStyle(shown.querySelector(".rule-panel-bar")).display,
      "none",
    );
    assert.ok(
      buttonNamed(rowOf(game.root, 1), "Usuń"),
      "„Usuń” stays in the row",
    );
  });
});

// Breaks: a row under the window that the keyboard or the mouse still reaches; a row above the window
// or below its lower edge taken out of reach; reach not given back when the window closes; a window
// reaching below the end of the list over what stands after it.
test("the rows the window lies over are out of reach while it stands, those above it and below its lower edge are not, and the list grows to hold a window that reaches past its end", async () => {
  // decision: D-288 "It is as tall as its content and stands directly under the row of the rule or the header of the rule group that opened it, lying over the rows below it; the rows above the window and below its lower edge stay in sight and are tapped and clicked as before, and the rows it lies over are out of the reach of the keyboard and the mouse while it stands."
  for (const [windowBottom, covered, minHeight] of [
    [300, ["group 1 actions", "header 2", "row 3"], ""],
    [600, ["group 1 actions", "header 2", "row 3", "list actions"], "600px"],
  ]) {
    await withPage(async (page) => {
      const parts = {
        "header 1": '[data-group="1"] > .rule-list-header',
        "row 1": '[data-rule="1"]',
        "row 2": '[data-rule="2"]',
        "group 1 actions": '[data-group="1"] > .rule-list-actions',
        "header 2": '[data-group="2"] > .rule-list-header',
        "row 3": '[data-rule="3"]',
        "list actions": ".rule-list > .rule-list-actions",
      };
      layOut(page.window, [
        [".rule-panel", [120, windowBottom]],
        [".rule-list", [0, 440]],
        [parts["header 1"], [0, 40]],
        [parts["row 1"], [40, 80]],
        [parts["row 2"], [80, 120]],
        [parts["group 1 actions"], [120, 150]],
        [parts["header 2"], [160, 200]],
        [parts["row 3"], [200, 240]],
        [parts["list actions"], [400, 440]],
      ]);
      const game = await wiredPanel(page, gameWith(), "programs");
      const inert = () =>
        Object.entries(parts)
          .filter(([, selector]) =>
            game.root.querySelector(selector).hasAttribute("inert"),
          )
          .map(([name]) => name);
      await openRow(game.root, 2);
      assert.deepEqual(inert(), covered);
      const list = game.root.querySelector(".rule-list");
      assert.equal(list.style.minHeight, minHeight);
      await press(buttonNamed(windowOf(game.root), "✕"));
      assert.equal(windowOf(game.root), null, "closed");
      assert.deepEqual(inert(), [], "every row in reach again");
      assert.equal(list.style.minHeight, "");
    });
  }
});

// Breaks: the list watched for a change of its size, which the window itself makes as it grows the
// list to hold it; or the boxes laid inside the watch's own callback, where the height it sets may take
// the page's scrollbar away and widen the window in the same frame. Either way Chromium reports an
// error of a loop, which the game takes for a failure („Coś w grze się zepsuło”). Also breaks: a change
// of the window's size never laid, and a watch left behind when the window goes.
test("the window watches its own size alone, lays a change of it in the next frame and not in the watch's callback, and stops watching when it closes", async () => {
  await withPage(async (page) => {
    const watched = [];
    let stopped = 0;
    let changed = null;
    const frames = [];
    page.window.ResizeObserver = class {
      constructor(callback) {
        changed = callback;
      }
      observe(element) {
        watched.push(element);
      }
      disconnect() {
        stopped += 1;
      }
    };
    page.window.requestAnimationFrame = (callback) => frames.push(callback);
    page.window.cancelAnimationFrame = () => {};
    const windowBox = [120, 150];
    layOut(page.window, [
      [".rule-panel", windowBox],
      [".rule-list", [0, 440]],
      ['[data-rule="3"]', [200, 240]],
    ]);
    const game = await wiredPanel(page, gameWith(), "programs");
    await openRow(game.root, 2);
    assert.ok(watched.length > 0, "precondition: the window watches");
    assert.ok(
      watched.every((element) => element === windowOf(game.root)),
      "only the window is watched",
    );
    const row3 = () => rowOf(game.root, 3).hasAttribute("inert");
    assert.equal(row3(), false, "precondition: row 3 below the window");

    windowBox[1] = 300;
    await inAct(() => changed([]));
    assert.equal(row3(), false, "nothing laid in the watch's callback");
    assert.equal(frames.length, 1, "one frame asked for");
    await inAct(() => frames.shift()());
    assert.equal(row3(), true, "laid in the next frame");

    await press(buttonNamed(windowOf(game.root), "✕"));
    assert.ok(stopped >= watched.length, "every watch stopped");
  });
});

// Breaks: an arrow of the window that moves nothing, closes the window, leaves it at the old place,
// gives no hint of the move to the chronicle, or drops the focus when the window moves with its rule.
test("„↑” and „↓” of the window of a rule move it one place, across the border of a group too, with the hint of the move, the window going with it and the focus staying on an arrow", async () => {
  // decision: D-288 "In the phone layout the row of a rule and the header of a rule group hold no arrow and no deletion: „↑”, „↓” and „Usuń” of a rule stand in the window of the rule"
  // decision: D-306 "After the last field the window stays open, and „✕”, Escape or opening another rule closes it, as does deleting the rule, and closing it confirms a number typed as leaving the field does; moving the rule to another group, by an arrow of its row or of its window or by the handle, closes nothing, and the window stays open on the same field and goes with the rule to its new group."
  await withPage(async (page) => {
    const game = await wiredPanel(
      page,
      send(gameWith(), SENT, REAL_MS).state,
      "run",
    );
    await openRow(game.root, 2);
    await press(
      windowOf(game.root).querySelector('button[aria-label^="Czynność:"]'),
    );
    const actionPick = () =>
      windowOf(game.root).querySelector(
        '[role="group"][aria-label="Czynność"]',
      );
    assert.ok(actionPick(), "precondition: the window stands on the action");
    await press(barButton(game.root, "↓"));
    assert.deepEqual(idsOf(game.state.run.copy.program), [[1], [2, 3]]);
    assert.ok(actionPick(), "the window stays on the same field");
    assert.deepEqual(game.hints, [{ kind: "rule", ruleId: 2 }]);
    assert.equal(headingOf(game.root), "Reguła 2.1 w grupie „Druga”");
    assert.ok(
      rowOf(game.root, 2).nextElementSibling.contains(windowOf(game.root)),
      "the window stands under the rule's new row",
    );
    assert.equal(page.document.activeElement, barButton(game.root, "↓"));

    await press(barButton(game.root, "↑"));
    await press(barButton(game.root, "↑"));
    assert.deepEqual(idsOf(game.state.run.copy.program), [[2, 1], [3]]);
    assert.equal(barButton(game.root, "↑").disabled, true, "precondition");
    assert.equal(
      page.document.activeElement,
      barButton(game.root, "↓"),
      "the arrow off now gives the focus to the other",
    );
  });
});

// Breaks: an arrow of the window of a group that moves a rule or nothing, or closes the window.
test("„↑” and „↓” of the window of a group move the group one place and the window stays on it", async () => {
  // decision: D-288 "Rules move by a handle with a line showing where they land, by arrows, and between groups, and whole rule groups move by a handle with such a line and by „↑” and „↓”, one place at a time as the arrows of a rule do, in every layout"
  await withPage(async (page) => {
    const game = await wiredPanel(page, gameWith(), "programs");
    await press(headerOf(game.root, 1));
    await press(barButton(game.root, "↓"));
    const program = game.state.programs[0].program;
    assert.deepEqual(
      program.groups.map((group) => group.id),
      [2, 1],
    );
    assert.deepEqual(idsOf(program), [[3], [1, 2]]);
    assert.equal(headingOf(game.root), "Grupa 2 „Pierwsza”");
    assert.equal(page.document.activeElement, barButton(game.root, "↑"));
  });
});

// Breaks: a deletion from the window that asks first, leaves the window open on nothing, or drops
// the focus on the page.
test("„Usuń” of the window deletes its rule at once and closes it, the focus going to the row now in its place, else to the row before it, else to the header of its group", async () => {
  // decision: D-303 "A program rule and a rule group are deleted at once, at the click, with no question."
  // decision: D-44 "The screens of the browser view build every button, select list, number field, text field and cell of a pick from the shared controls of `src/browser/view/controls/`"
  await withPage(async (page) => {
    const game = await wiredPanel(page, gameWith(), "programs");
    await openRow(game.root, 1);
    const remove = barButton(game.root, "Usuń");
    assert.ok(remove.classList.contains("destructive"));
    await press(remove);
    assert.deepEqual(idsOf(game.state.programs[0].program), [[2], [3]]);
    assert.equal(windowOf(game.root), null, "the window closed");
    assert.equal(page.document.activeElement, rowOf(game.root, 2));

    await openRow(game.root, 2);
    await press(barButton(game.root, "Usuń"));
    assert.deepEqual(idsOf(game.state.programs[0].program), [[], [3]]);
    assert.equal(page.document.activeElement, headerOf(game.root, 1));
  });
  await withPage(async (page) => {
    const program = twoGroups();
    program.groups[0].rules.push(rule(4, ALWAYS, EXPLORE));
    program.nextRuleId = 5;
    const game = await wiredPanel(page, gameWith(program), "programs");
    await openRow(game.root, 4);
    await press(barButton(game.root, "Usuń"));
    assert.equal(page.document.activeElement, rowOf(game.root, 2));
  });
});

// Breaks: a deletion of the group that keeps its rules, asks first, is no destructive button or
// reads „✕” like the button that closes the window, or drops the focus on the page.
test("„Usuń z regułami” of the window of a group deletes it with its rules at once, the focus going to the header now in its place, else to „+ dodaj grupę”", async () => {
  // decision: D-296 "In the computer layout the group's „✕” stands in its header, and in the phone layout the button that deletes the group stands in the window of the group and reads „Usuń z regułami”."
  // decision: D-44 "„Usuń z regułami”, which deletes a rule group with its rules from the window of the group in the phone layout (D-296), is a destructive button as well."
  // decision: D-303 "A program rule and a rule group are deleted at once, at the click, with no question."
  await withPage(async (page) => {
    const game = await wiredPanel(page, gameWith(), "programs");
    await press(headerOf(game.root, 1));
    const remove = barButton(game.root, "Usuń z regułami");
    assert.ok(remove.classList.contains("destructive"));
    assert.equal(barButton(game.root, "✕"), undefined, "no „✕” in the bar");
    await press(remove);
    assert.deepEqual(idsOf(game.state.programs[0].program), [[3]]);
    assert.equal(windowOf(game.root), null, "the window closed");
    assert.equal(page.document.activeElement, headerOf(game.root, 2));

    await press(headerOf(game.root, 2));
    await press(barButton(game.root, "Usuń z regułami"));
    assert.deepEqual(game.state.programs[0].program.groups, []);
    assert.equal(
      page.document.activeElement,
      buttonNamed(game.root, "+ dodaj grupę"),
    );
  });
});

// Breaks: Escape that closes the window and drops the number typed into it, the rule keeping the
// number it held.
test("Escape in the number field of the window confirms the number typed, closes the window and gives the focus to the row", async () => {
  // decision: D-306 "After the last field the window stays open, and „✕”, Escape or opening another rule closes it, as does deleting the rule, and closing it confirms a number typed as leaving the field does"
  await withPage(async (page) => {
    const game = await wiredPanel(page, gameWith(), "programs");
    await openRow(game.root, 1);
    const number = windowOf(game.root).querySelector('input[type="number"]');
    await inAct(() => number.focus());
    await typeInto(number, "5");
    await key(number, "Escape");
    assert.equal(
      game.state.programs[0].program.groups[0].rules[0].condition.value,
      5,
    );
    assert.equal(windowOf(game.root), null, "closed");
    assert.equal(page.document.activeElement, rowOf(game.root, 1));
  });
});

// Breaks: a window left open while the question stands, or one that the standing question keeps
// closed when the player opens a rule again.
test("the question „Zapisać, odrzucić, wrócić?” closes the window as it appears, and a rule opened while it stands opens its window", async () => {
  // decision: D-311 "The window of a rule or a rule group belongs to the area of the program: it is not seen while the end-of-run window stands and stands again as it was once that window closes, and it closes when the question „Zapisać, odrzucić, wrócić?” of D-173 appears, so that the question is seen and takes the focus."
  await withPage(async (page) => {
    const reading = questionReading();
    const game = await wiredPanel(
      page,
      send(gameWith(), SENT, REAL_MS).state,
      "run",
      reading,
    );
    await openRow(game.root, 1);
    assert.ok(windowOf(game.root), "precondition: the window stands");
    await inAct(() => reading.ask());
    assert.ok(game.root.querySelector(".end-question"), "the question stands");
    assert.equal(windowOf(game.root), null, "the window closed");
    await openRow(game.root, 3);
    assert.equal(headingOf(game.root), "Reguła 2.1 w grupie „Druga”");
  });
});
