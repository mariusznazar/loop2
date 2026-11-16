// The program panel in React (D-36, D-166 to D-174, D-180, D-264, D-282, D-288, D-295, D-302) on jsdom through tests/view/page-document.mjs. It proves which
// elements the panel draws, which program it shows and what each control hands the game; real events,
// focus rings and the look are checked in the browser (D-88). Every comparison is of plain data
// (D-268).
import { assert, inAct, typeInto, withPage } from "./page-document.mjs";
import { test } from "node:test";
import {
  advanceMinutes,
  createCharacter,
  end,
  newGame,
  passRealTime,
  restart,
  send,
  setPace,
  setPaused,
  setProgram,
} from "../../dist/browser/sim/game.js";
import {
  createProgram,
  deleteProgram,
  discardCopyChanges,
  editProgram,
  renameProgram,
  saveCopyAsNewProgram,
  saveCopyIntoProgram,
  switchProgram,
} from "../../dist/browser/sim/programs.js";
import { SKILLS } from "../../dist/browser/sim/data/skills.js";
import { buyBranch } from "../../dist/browser/sim/skills.js";
import {
  createFolding,
  createProgramPanel,
} from "../../dist/browser/view/program-panel.js";
import { programFromRules } from "../sim/program-fixture.mjs";
import {
  newKnowingGame,
  withEdgeSolved,
} from "../sim/understanding-fixture.mjs";

const ALWAYS_EXPLORE = {
  condition: { kind: "always" },
  action: { kind: "explore" },
};
const ALWAYS_WANDER = {
  condition: { kind: "always" },
  action: { kind: "wander" },
};
// The first character a new game creates takes the id 1; the forest is the first map sent to.
const SENT = { mapId: "forest", characterId: 1 };
const REAL_MS = 1760000000000;

/** The controls of the panel as the game view wires them: each a real simulation call. */
function controlsOver(game) {
  const { acts, apply } = game;
  return {
    editCopy(program, ...extra) {
      acts.push(["editCopy"]);
      game.hints.push(extra[0]);
      apply(setProgram(game.state, program));
    },
    editProgram(programId, program, ...extra) {
      acts.push(["editProgram", programId]);
      game.hints.push(extra[0]);
      apply(editProgram(game.state, programId, program));
    },
    createProgram() {
      acts.push(["createProgram"]);
      apply(createProgram(game.state));
    },
    renameProgram(programId, name) {
      acts.push(["renameProgram", programId, name]);
      apply(renameProgram(game.state, programId, name));
    },
    deleteProgram(programId) {
      acts.push(["deleteProgram", programId]);
      apply(deleteProgram(game.state, programId));
    },
    saveCopy() {
      acts.push(["saveCopy"]);
      apply(saveCopyIntoProgram(game.state));
    },
    saveCopyAsNew(name) {
      acts.push(["saveCopyAsNew", name]);
      apply(saveCopyAsNewProgram(game.state, name));
    },
    discardCopy() {
      acts.push(["discardCopy"]);
      apply(discardCopyChanges(game.state));
    },
    switchProgram(programId) {
      acts.push(["switchProgram", programId]);
      apply(switchProgram(game.state, programId));
    },
  };
}

/**
 * The panel of `mode` (the screen of a map run or Programy) built in the page and wired as the game
 * view wires it: each control a real simulation call whose result replaces the state and updates the
 * panel with its events. `acts` records the calls. `apply` is for the controls, which run inside an
 * act; `change` is for a case that moves the game on, and runs its update in an act of its own.
 */
async function wiredPanel({ root }, start = newGame(), mode = "run", folding) {
  const game = {
    acts: [],
    // For each edit, the argument the panel passed after the program: the hint of a move, if any.
    hints: [],
    state: start,
    panel: null,
    apply(result) {
      game.state = result.state;
      game.panel.update(game.state, result.events);
    },
    change: (result) => inAct(() => game.apply(result)),
  };
  game.panel = createProgramPanel(controlsOver(game), mode, folding);
  game.root = game.panel.element;
  root.append(game.panel.element);
  await inAct(() => game.panel.update(game.state, []));
  return game;
}

/** A game whose program 1 holds „Zawsze → Eksploruj”, with the character Ala in the team. */
function gameWithRule() {
  const programmed = setProgram(
    withEdgeSolved(newKnowingGame()),
    programFromRules(ALWAYS_EXPLORE),
  ).state;
  return createCharacter(programmed, "Ala").state;
}

/** Clicks inside act, as a browser clicks it. */
function click(target) {
  assert.ok(target, "what the case clicks stands");
  return inAct(() => {
    target.click();
  });
}

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

const buttonNamed = (root, text) =>
  [...root.querySelectorAll("button")].find(
    (button) => button.textContent === text,
  );
/** A button of the actions row of the list „Program:”, which a rule's own „Usuń” never is. */
const actionButton = (root, text) =>
  buttonNamed(root.querySelector(".program-actions") ?? root, text);
const programList = (root) =>
  root.querySelector('select[aria-label="Program:"]');
const positions = (select) =>
  [...select.options].map((option) => option.textContent);
const classed = (root, name) => [...root.querySelectorAll(`.${name}`)];
const rowOf = (root, id) => root.querySelector(`[data-rule="${id}"]`);
const headerOf = (root, id) =>
  root.querySelector(`[data-group="${id}"] .rule-list-header`);

/** Picks `value` on the list „Program:”, as a player does. */
function pick(root, value) {
  const list = programList(root);
  assert.ok(list, "the list „Program:” stands");
  const { Event } = list.ownerDocument.defaultView;
  const { set } = Object.getOwnPropertyDescriptor(
    Object.getPrototypeOf(list),
    "value",
  );
  return inAct(() => {
    set.call(list, value);
    list.dispatchEvent(new Event("change", { bubbles: true }));
  });
}

/** The elements of `root` in document order. */
const inOrder = (root) => [root, ...root.querySelectorAll("*")];

const nameInput = (root) =>
  root.querySelector('input[aria-label="Nazwa programu"]');
/** The name field's row is open: the field stands. */
const nameOpen = (root) => nameInput(root) !== null;

/** The message under the name field, or null while it shows none. */
function nameMessage(root) {
  const message = nameInput(root)
    .closest(".input-field")
    .querySelector(".input-field-message");
  return message.hidden ? null : message.textContent;
}

const typeName = (root, text) => typeInto(nameInput(root), text);
const nameSave = (root) =>
  buttonNamed(root.querySelector(".program-name"), "Zapisz");

/** The count texts beside the editor's rules. */
const counts = (root) =>
  classed(root, "rule-count").map((count) => count.textContent);

const groupCount = (program) => program.groups.length;

// --- the trip plan: Programy holds it between the name and the rules, a map run's screen none -------
// D-180. Catches the section missing
// from Programy, standing under the rules or above the name, and standing on the screen of a map run.
test("Programy holds the trip plan between the program's name and its rules; the screen of a map run holds none", async () => {
  // decision: D-180 "The screen Programy shows a section „Plan wyprawy” folded to a line of icons between the program's name and its rules, with the lists „Zabierz” and „Wynieś”"
  // decision: D-307 "Where both lists of the trip plan are empty, its folded line on Programy reads „Plan wyprawy: pusty”"
  await withPage(async (page) => {
    const game = await wiredPanel(page, gameWithRule(), "programs");
    const order = inOrder(game.root);
    const at = (selector) =>
      order.findIndex((element) => element.matches(selector));
    assert.ok(at(".program-title") >= 0, "the program's name stands");
    assert.equal(
      game.root.querySelector(".program-title").textContent,
      "Program",
    );
    assert.ok(at(".trip-plan") >= 0, "the trip plan stands");
    assert.ok(at(".rule-list") >= 0, "the rules stand");
    assert.ok(
      at(".program-title") < at(".trip-plan"),
      "the plan is under the name",
    );
    assert.ok(
      at(".trip-plan") < at(".rule-list"),
      "the plan is above the rules",
    );
    assert.equal(
      game.root.querySelector(".trip-plan-line button").textContent,
      "Plan wyprawy: pusty",
    );
  });
  await withPage(async (page) => {
    const game = await wiredPanel(page, gameWithRule(), "run");
    assert.equal(
      classed(game.root, "trip-plan").length,
      0,
      "no plan on Przejście",
    );
    assert.ok(classed(game.root, "rule-list").length > 0, "the rules stand");
    await game.change(send(game.state, SENT, REAL_MS));
    assert.equal(
      classed(game.root, "trip-plan").length,
      0,
      "no plan beside the copy of a map run",
    );
  });
});

// D-180: the trip plan of the saved program shown, also while a map run waits,
// is an edit of that program. Catches an edit of the plan reaching the copy or another program, and a
// section carried from one program to the next with its folding.
test("an edit of the trip plan on Programy goes to the program shown, and another program's section stands folded", async () => {
  // decision: D-179 "The trip plan is a field of the program"
  // decision: D-180 "The screen Programy shows a section „Plan wyprawy” folded to a line of icons between the program's name and its rules, with the lists „Zabierz” and „Wynieś”"
  // decision: D-182 "The program of a new game and a newly created program have both trip lists empty"
  // decision: D-307 "Where both lists of the trip plan are empty, its folded line on Programy reads „Plan wyprawy: pusty”"
  await withPage(async (page) => {
    const game = await wiredPanel(
      page,
      createProgram(
        send(createProgram(gameWithRule()).state, SENT, REAL_MS).state,
      ).state,
      "programs",
    );
    await click(game.root.querySelector(".trip-plan-line button"));
    await click(
      game.root.querySelector('[aria-label="Zabierz: dodaj przedmiot"]'),
    );
    assert.deepEqual(game.acts.at(-1), ["editProgram", 1]);
    assert.equal(game.state.programs[0].program.tripPlan.take.length, 1);
    assert.equal(game.state.programs[1].program.tripPlan.take.length, 0);
    assert.equal(game.state.run.copy.program.tripPlan.take.length, 0);
    assert.equal(
      game.root
        .querySelector(".trip-plan-line button")
        .getAttribute("aria-expanded"),
      "true",
      "the section stays open after its own edit",
    );

    await inAct(() => game.panel.showProgram(2));
    assert.equal(
      game.root
        .querySelector(".trip-plan-line button")
        .getAttribute("aria-expanded"),
      "false",
      "another program's section stands folded",
    );
    assert.equal(
      game.root.querySelector(".trip-plan-line button").textContent,
      "Plan wyprawy: pusty",
    );
  });
});

// --- the rule panel under its row or header ------------------------------------------------------
// D-282, D-288. Catches the panel standing anywhere but under its row or header, at the end of the
// list or nowhere, a row that holds its own panel, a header that opens no panel, the focus left
// outside the panel on opening, and a closed panel that takes no focus back to the row.
for (const mode of ["programs", "run"]) {
  test(`the rule panel opens from a row and from a header under it (${mode}), takes the focus, and „✕” and Escape give it back to the row`, async () => {
    // decision: D-288 "One program editor stands on Programy and on the screen of a map run"
    // decision: D-288 "A rule's row reads as a sentence and a rule panel changes it, opening in place on the list under the row of the rule or the header of the rule group it changes, on both screens, and taking no column of its own"
    // decision: D-306 "A click on a program rule's row opens the rule panel on the condition, and its fields follow as condition, number, target of the condition, action and target of the action, the number field and a field of a target standing only where the condition or the action has one; each pick changes the rule at once and moves to the next field, a pick of the value already picked included, and Enter or leaving the field confirms the number"
    // decision: D-306 "After the last field the panel stays open, and „✕”, Escape or opening another rule closes it"
    // decision: D-296 "A click on the header of a rule group opens the rule panel with the group's name"
    await withPage(async (page) => {
      const game = await wiredPanel(page, gameWithRule(), mode);
      assert.equal(classed(game.root, "rule-panel").length, 0, "closed");
      await click(rowOf(game.root, 1).querySelector(".rule-condition"));
      assert.equal(classed(game.root, "rule-panel").length, 1);
      assert.ok(
        rowOf(game.root, 1).nextElementSibling.contains(
          game.root.querySelector(".rule-panel"),
        ),
        "the panel stands right under the row it changes",
      );
      assert.equal(
        rowOf(game.root, 1).contains(game.root.querySelector(".rule-panel")),
        false,
        "and is no part of the row",
      );
      assert.equal(
        game.root.querySelectorAll(".program-editor-layout, .with-panel")
          .length,
        0,
        "no layout gives the panel a column of its own",
      );
      assert.equal(
        game.root.querySelector(".rule-panel-heading").textContent,
        "Reguła 1.1",
      );
      assert.equal(rowOf(game.root, 1).getAttribute("aria-current"), "true");
      assert.ok(
        game.root
          .querySelector(".rule-panel")
          .contains(page.document.activeElement),
        "the focus went into the panel",
      );

      await click(headerOf(game.root, 1));
      assert.equal(
        game.root.querySelector(".rule-panel-heading").textContent,
        "Grupa 1",
      );
      assert.ok(
        game.root.querySelector('input[aria-label="Nazwa grupy"]'),
        "the header's panel holds the group's name",
      );
      assert.equal(classed(game.root, "rule-panel").length, 1);
      assert.ok(
        headerOf(game.root, 1).nextElementSibling.contains(
          game.root.querySelector(".rule-panel"),
        ),
        "the panel stands right under the header it changes",
      );
      assert.equal(rowOf(game.root, 1).getAttribute("aria-current"), null);

      await click(buttonNamed(game.root.querySelector(".rule-panel"), "✕"));
      assert.equal(classed(game.root, "rule-panel").length, 0, "closed by ✕");
      assert.equal(
        page.document.activeElement,
        headerOf(game.root, 1),
        "the focus went to the header",
      );

      await click(rowOf(game.root, 1).querySelector(".rule-condition"));
      await key(game.root.querySelector(".rule-panel button"), "Escape");
      assert.equal(classed(game.root, "rule-panel").length, 0, "closed by Esc");
      assert.equal(page.document.activeElement, rowOf(game.root, 1));
    });
  });
}

// D-288. A rule open in a group that is then folded has no
// row drawn. Catches the panel vanishing with the row, and one left at the end of the list.
test("a rule open in a group that gets folded keeps its panel under that group's header, and under its row again once unfolded", async () => {
  // decision: D-350 "A rule panel open on a rule whose rule group is folded stands directly under the header of that group, where the row of the rule is not drawn"
  // decision: D-350 "Folding or unfolding that group, or every group at once, closes no panel and changes no field of it, and the panel stands under the row again when the group unfolds"
  await withPage(async (page) => {
    const game = await wiredPanel(page, gameWithRule(), "programs");
    await click(rowOf(game.root, 1).querySelector(".rule-condition"));
    await click(game.root.querySelector('button[aria-label="Zwiń grupę"]'));
    assert.equal(rowOf(game.root, 1), null, "the row is not drawn");
    assert.equal(classed(game.root, "rule-panel").length, 1, "still open");
    assert.ok(
      headerOf(game.root, 1).nextElementSibling.contains(
        game.root.querySelector(".rule-panel"),
      ),
      "the panel stands right under the header",
    );
    await click(game.root.querySelector('button[aria-label="Rozwiń grupę"]'));
    assert.ok(
      rowOf(game.root, 1).nextElementSibling.contains(
        game.root.querySelector(".rule-panel"),
      ),
      "and right under the row once the group is unfolded",
    );
  });
});

// D-350, D-313. The panel under the header of a folded group gives the focus back to that header on
// „✕” and Escape, since the row of its rule is not drawn. Catches the focus left on the page.
for (const close of ["✕", "Escape"]) {
  test(`${close} on a panel under a folded group's header gives the focus to that header`, async () => {
    // decision: D-350 "A rule panel open on a rule whose rule group is folded stands directly under the header of that group, where the row of the rule is not drawn"
    // decision: D-306 "After the last field the panel stays open, and „✕”, Escape or opening another rule closes it"
    await withPage(async (page) => {
      const game = await wiredPanel(page, gameWithRule(), "programs");
      await click(rowOf(game.root, 1).querySelector(".rule-condition"));
      await click(game.root.querySelector('button[aria-label="Zwiń grupę"]'));
      assert.equal(
        rowOf(game.root, 1),
        null,
        "precondition: the row is not drawn",
      );
      assert.equal(
        classed(game.root, "rule-panel").length,
        1,
        "precondition: still open",
      );
      const panel = game.root.querySelector(".rule-panel");
      if (close === "✕") await click(buttonNamed(panel, "✕"));
      else await key(panel, "Escape");
      assert.equal(
        classed(game.root, "rule-panel").length,
        0,
        `closed by ${close}`,
      );
      assert.equal(
        page.document.activeElement,
        headerOf(game.root, 1),
        "the focus went to the header of the folded group",
      );
    });
  });
}

// D-124: a rule added by „+ reguła” opens its panel. Catches the new rule standing with no
// panel, as the old editor left it.
test("„+ reguła” adds the rule and opens its panel on the condition", async () => {
  // decision: D-124 "„+ reguła” adds a program rule at the end of its rule group and opens its rule panel on the condition"
  await withPage(async (page) => {
    const game = await wiredPanel(page, gameWithRule(), "programs");
    await click(buttonNamed(game.root, "+ reguła"));
    assert.deepEqual(game.acts.at(-1), ["editProgram", 1]);
    assert.equal(game.state.programs[0].program.groups[0].rules.length, 2);
    assert.equal(
      game.root.querySelector(".rule-panel-heading").textContent,
      "Reguła 1.2",
    );
  });
});

// The open rule belongs to the program shown and the game's minutes pass behind it. Catches a panel
// that follows a pick of another program to a rule that is not there, and one that a minute closes.
test("the open rule stays through the game's minutes and goes when the program shown changes", async () => {
  await withPage(async (page) => {
    const game = await wiredPanel(page, gameWithRule(), "run");
    await game.change(send(game.state, SENT, REAL_MS));
    await click(rowOf(game.root, 1).querySelector(".rule-condition"));
    await game.change(advanceMinutes(game.state, 3));
    assert.equal(classed(game.root, "rule-panel").length, 1, "still open");
    await pick(game.root, "1");
    assert.equal(classed(game.root, "rule-panel").length, 0, "another program");
    await pick(game.root, "copy");
    assert.equal(
      classed(game.root, "rule-panel").length,
      0,
      "not carried back",
    );
  });
});

// D-302. Catches the sentence missing from the panel of the copy, standing in the
// panel of a saved program or on Programy, and a word of the counter in it.
test("the rule panel of the copy says „Zmiana zeruje passę tego przejścia.”; that of a saved program and of Programy does not", async () => {
  // decision: D-302 "The rule panel of the copy a map run carries out reads „Zmiana zeruje passę tego przejścia.”, and it says nothing of the firing counts"
  await withPage(async (page) => {
    const game = await wiredPanel(page, gameWithRule(), "run");
    await game.change(send(game.state, SENT, REAL_MS));
    await click(rowOf(game.root, 1).querySelector(".rule-condition"));
    const note = () =>
      game.root.querySelector(".rule-panel-note")?.textContent ?? null;
    assert.equal(note(), "Zmiana zeruje passę tego przejścia.");
    await pick(game.root, "1");
    await click(rowOf(game.root, 1).querySelector(".rule-condition"));
    assert.equal(note(), null, "a saved program's panel says nothing");
  });
  await withPage(async (page) => {
    const game = await wiredPanel(
      page,
      send(gameWithRule(), SENT, REAL_MS).state,
      "programs",
    );
    await click(rowOf(game.root, 1).querySelector(".rule-condition"));
    assert.equal(game.root.querySelector(".rule-panel-note"), null);
  });
});

// --- the folding of rule groups: one memory of the page ------------------------------------------
// D-295. Catches a fold on one screen that the other does not show, a fold of the copy that
// folds the saved program, a memory that outlives its page, and a fold that hides a group of another
// program.
test("a group folded on one screen stays folded on the other for the same program, the copy's folding is its own, and a new memory forgets", async () => {
  // decision: D-407 "The game state lives in a store outside React and the state of the screen Przejście, which is the question „Zapisać, odrzucić, wrócić?” and the end-of-run window, in a module of its own outside React; memory several screens share is a memory of the page, given to the factories of the screens and read through `useSyncExternalStore`"
  // decision: D-294 "Which rule groups are folded lasts in the page's memory while the player moves between screens and goes with a reload of the page, after which every rule group stands unfolded"
  await withPage(async (page) => {
    const folding = createFolding();
    const programs = await wiredPanel(
      page,
      gameWithRule(),
      "programs",
      folding,
    );
    const run = await wiredPanel(page, programs.state, "run", folding);
    const rulesOf = (game) => classed(game.root, "rule-list-rules").length;
    assert.equal(rulesOf(programs), 1, "unfolded at the start");
    await click(programs.root.querySelector('button[aria-label="Zwiń grupę"]'));
    assert.equal(rulesOf(programs), 0, "folded on Programy");
    await pick(run.root, "1");
    assert.equal(rulesOf(run), 0, "folded on Przejście for the same program");
    assert.equal(
      run.root
        .querySelector('button[aria-label="Rozwiń grupę"]')
        .getAttribute("aria-expanded"),
      "false",
    );

    await run.change(send(run.state, SENT, REAL_MS));
    assert.equal(programList(run.root).value, "copy");
    assert.equal(rulesOf(run), 1, "the copy has a folding of its own");
    await click(run.root.querySelector('button[aria-label="Zwiń grupę"]'));
    assert.equal(rulesOf(run), 0, "the copy is folded");
    await pick(run.root, "1");
    assert.equal(rulesOf(run), 0, "the saved program stays folded");

    await click(
      programs.root.querySelector('button[aria-label="Rozwiń grupę"]'),
    );
    assert.equal(rulesOf(programs), 1, "unfolded on Programy");
    await pick(run.root, "1");
    assert.equal(rulesOf(run), 1, "and on Przejście");
  });
  await withPage(async (page) => {
    const game = await wiredPanel(page, gameWithRule(), "programs");
    assert.equal(
      classed(game.root, "rule-list-rules").length,
      1,
      "a panel with a memory of its own starts unfolded",
    );
  });
});

// The memory is the page's: a fold made while the other panel is hidden still reaches it when it
// draws next. Catches a panel that reads the memory only at its own updates.
test("a fold made on one panel redraws the other at once, with no update of its own", async () => {
  // decision: D-407 "The game state lives in a store outside React and the state of the screen Przejście, which is the question „Zapisać, odrzucić, wrócić?” and the end-of-run window, in a module of its own outside React; memory several screens share is a memory of the page, given to the factories of the screens and read through `useSyncExternalStore`"
  // decision: D-294 "Which rule groups are folded lasts in the page's memory while the player moves between screens"
  await withPage(async (page) => {
    const folding = createFolding();
    const programs = await wiredPanel(
      page,
      gameWithRule(),
      "programs",
      folding,
    );
    const run = await wiredPanel(page, programs.state, "run", folding);
    await pick(run.root, "1");
    await click(programs.root.querySelector('button[aria-label="Zwiń grupę"]'));
    assert.equal(classed(run.root, "rule-list-rules").length, 0);
  });
});

/** How many rule groups stand unfolded: each of them has the button that folds it, „Zwiń grupę”. */
const unfoldedGroups = (root) =>
  root.querySelectorAll('button[aria-label="Zwiń grupę"]').length;

// D-294 (To do 7). A new copy made by a send has every rule group unfolded: the folds of the copy
// before it do not pass to it. Catches the copy's folding kept under its one key across a send.
test("a send after the copy's group was folded shows the new copy with every group unfolded", async () => {
  // decision: D-294 "Each new copy, made at a send and at a switch of the character to another program, has every rule group unfolded, the foldings of the copy before it passing to it no more"
  await withPage(async (page) => {
    const game = await wiredPanel(page, gameWithRule(), "run", createFolding());
    await game.change(send(game.state, SENT, REAL_MS));
    await click(game.root.querySelector('button[aria-label="Zwiń grupę"]'));
    assert.equal(
      unfoldedGroups(game.root),
      0,
      "precondition: the copy's group is folded",
    );
    await game.change(end(game.state));
    await game.change(send(game.state, SENT, REAL_MS));
    assert.equal(
      unfoldedGroups(game.root),
      1,
      "the new copy's group is unfolded",
    );
  });
});

// D-294 (To do 7). A switch of the character to another program makes a new copy, which has every rule
// group unfolded too. Catches the copy's folding kept across a switch.
test("a switch of the character after the copy's group was folded shows the new copy with every group unfolded", async () => {
  // decision: D-294 "Each new copy, made at a send and at a switch of the character to another program, has every rule group unfolded, the foldings of the copy before it passing to it no more"
  // decision: D-174 "During a map run ... its click switches the character to that program at once, and the panel shows „Kopia w przejściu” again"
  await withPage(async (page) => {
    const game = await wiredPanel(
      page,
      createProgram(gameWithRule()).state,
      "run",
      createFolding(),
    );
    await game.change(send(game.state, SENT, REAL_MS));
    await click(game.root.querySelector('button[aria-label="Zwiń grupę"]'));
    assert.equal(
      unfoldedGroups(game.root),
      0,
      "precondition: the copy's group is folded",
    );
    await pick(game.root, "2");
    await click(buttonNamed(game.root, SWITCH));
    assert.deepEqual(game.acts.at(-1), ["switchProgram", 2]);
    assert.equal(programList(game.root).value, "copy");
    assert.equal(
      unfoldedGroups(game.root),
      1,
      "the new copy's group is unfolded",
    );
  });
});

// D-164, D-294. A restart carries on the copy of its map run, so the folds of that copy stay. Catches a
// memory of the copy cleared at every start of a map run, the restart included.
test("a restart keeps the folds of the copy it carries on", async () => {
  // decision: D-164 "a map run restart carries on the copy of the map run it replaces as it is, its unsaved changes included"
  // decision: D-294 "Which rule groups are folded lasts in the page's memory while the player moves between screens"
  await withPage(async (page) => {
    const game = await wiredPanel(page, gameWithRule(), "run", createFolding());
    await game.change(send(game.state, SENT, REAL_MS));
    await click(game.root.querySelector('button[aria-label="Zwiń grupę"]'));
    assert.equal(
      unfoldedGroups(game.root),
      0,
      "precondition: the copy's group is folded",
    );
    await game.change(restart(game.state));
    assert.equal(unfoldedGroups(game.root), 0, "the copy's group stays folded");
  });
});

// --- the panel's states, carried over from the hand-made model -----------------------------------

// D-166, D-167. Catches a list missing its program or the last
// program left deletable.
test("a new game's panel lists „Program”, shows it, and „Usuń” is disabled", async () => {
  // decision: D-167 "The list of programs offers „Nowy program”, „Zmień nazwę” and „Usuń” and, to an account with the previous-save privilege while its previous save exists, „Wciągnij programy z poprzedniego zapisu” (D-401), and a new program holds one empty rule group named „Program”, whose condition is „Zawsze”"
  // decision: D-167 "A program left alone on the list stays there, „Usuń” leaving it in place"
  // decision: D-169 "The program of a new game is named „Program”, and a new program „Program 2”, „Program 3” and on, by the first free number"
  await withPage(async (page) => {
    const game = await wiredPanel(page);
    const list = programList(game.root);
    assert.ok(list, "the panel holds the select list „Program:”");
    assert.deepEqual(positions(list), ["Program"]);
    assert.equal(list.value, "1");
    assert.equal(actionButton(game.root, "Usuń").disabled, true);
    assert.ok(actionButton(game.root, "Zmień nazwę"));
    assert.ok(actionButton(game.root, "Nowy program"));
    assert.equal(nameOpen(game.root), false);
  });
});

// D-167, D-169: „Nowy program” shows the new program. Catches the panel staying on
// the old program and an editor edit landing in a program other than the one shown.
test("„Nowy program” shows „Program 2”, makes „Usuń” active, and the editor edits program 2", async () => {
  // decision: D-167 "The list of programs offers „Nowy program”, „Zmień nazwę” and „Usuń” and, to an account with the previous-save privilege while its previous save exists, „Wciągnij programy z poprzedniego zapisu” (D-401), and a new program holds one empty rule group named „Program”, whose condition is „Zawsze”"
  // decision: D-169 "The program of a new game is named „Program”, and a new program „Program 2”, „Program 3” and on, by the first free number"
  await withPage(async (page) => {
    const game = await wiredPanel(page);
    await click(actionButton(game.root, "Nowy program"));
    const list = programList(game.root);
    assert.deepEqual(positions(list), ["Program", "Program 2"]);
    assert.equal(list.value, "2");
    assert.equal(actionButton(game.root, "Usuń").disabled, false);

    await click(buttonNamed(game.root, "+ dodaj grupę"));
    assert.deepEqual(game.acts.at(-1), ["editProgram", 2]);
    assert.equal(groupCount(game.state.programs[1].program), 2);
    assert.equal(groupCount(game.state.programs[0].program), 1);
  });
});

// D-169, the name field. Catches a missing or wrong message, a
// program's own name in another letter case refused, and a refused name saved.
test("„Zmień nazwę” fills the field with the name, warns of an empty or taken name, and saves a trimmed one", async () => {
  // decision: D-169 "A program's name is the typed text trimmed of the white space at its start and end, and it is not empty; the game takes no name another program bears, comparing names regardless of letter case, and sets no limit to a name's length"
  await withPage(async (page) => {
    const game = await wiredPanel(page);
    await click(actionButton(game.root, "Nowy program"));
    await click(actionButton(game.root, "Zmień nazwę"));
    assert.equal(nameOpen(game.root), true);
    assert.equal(nameInput(game.root).value, "Program 2");
    assert.equal(page.document.activeElement, nameInput(game.root));
    assert.equal(nameMessage(game.root), null);

    await typeName(game.root, "   ");
    assert.equal(nameMessage(game.root), "Wpisz nazwę programu.");
    await click(nameSave(game.root));
    assert.equal(nameOpen(game.root), true);

    await typeName(game.root, "program");
    assert.equal(nameMessage(game.root), "Program o tej nazwie już istnieje.");
    await click(nameSave(game.root));
    assert.equal(nameOpen(game.root), true);
    assert.ok(!game.acts.some(([act]) => act === "renameProgram"));

    await typeName(game.root, "PROGRAM 2");
    assert.equal(nameMessage(game.root), null);

    await typeName(game.root, " Las nocą ");
    await click(nameSave(game.root));
    assert.equal(nameOpen(game.root), false);
    const list = programList(game.root);
    assert.deepEqual(positions(list), ["Program", "Las nocą"]);
    assert.equal(list.value, "2");
    assert.equal(
      page.document.activeElement,
      actionButton(game.root, "Zmień nazwę"),
      "the focus goes back to „Zmień nazwę”",
    );
  });
});

// The name field leaves without saving at the same action again, or when another program is shown.
// Catches a field that saves or stays open.
test("the name field leaves without saving at „Zmień nazwę” again and at another program shown", async () => {
  await withPage(async (page) => {
    const game = await wiredPanel(page);
    await click(actionButton(game.root, "Nowy program"));
    await click(actionButton(game.root, "Zmień nazwę"));
    await typeName(game.root, "Las");
    await click(actionButton(game.root, "Zmień nazwę"));
    assert.equal(nameOpen(game.root), false);

    await click(actionButton(game.root, "Zmień nazwę"));
    assert.equal(nameInput(game.root).value, "Program 2");
    await typeName(game.root, "Las");
    await pick(game.root, "1");
    assert.equal(nameOpen(game.root), false);
    assert.ok(!game.acts.some(([act]) => act === "renameProgram"));
    assert.deepEqual(
      game.state.programs.map((saved) => saved.name),
      ["Program", "Program 2"],
    );
    await pick(game.root, "2");
    assert.equal(nameOpen(game.root), false, "not carried back to program 2");
  });
});

// D-384: „Usuń” of the shown program shows the first of the list; D-167: a program left alone stays.
// Catches the panel left on a deleted program and the last program deleted.
test("„Usuń” of the shown program shows the first program of the list, and is disabled with one left", async () => {
  // decision: D-384 "Where the program the program panel shows is gone from the player's list, or the number asked for names no program, the panel shows the first program of the list"
  // decision: D-167 "A program left alone on the list stays there, „Usuń” leaving it in place"
  await withPage(async (page) => {
    const game = await wiredPanel(page);
    await click(actionButton(game.root, "Nowy program"));
    await click(actionButton(game.root, "Nowy program"));
    await pick(game.root, "1");
    await click(actionButton(game.root, "Usuń"));
    const list = programList(game.root);
    assert.deepEqual(positions(list), ["Program 2", "Program 3"]);
    assert.equal(list.value, "2");

    await click(actionButton(game.root, "Usuń"));
    assert.deepEqual(positions(list), ["Program 3"]);
    assert.equal(list.value, "3");
    assert.equal(actionButton(game.root, "Usuń").disabled, true);
    assert.equal(
      page.document.activeElement,
      list,
      "the disabled „Usuń” leaves the focus on the list",
    );
    await click(actionButton(game.root, "Usuń"));
    assert.equal(game.state.programs.length, 1);
    assert.equal(
      game.acts.filter(([act]) => act === "deleteProgram").length,
      2,
    );
  });
});

// D-166, D-93. Catches the copy missing from the top of
// the list, rename or delete offered for the copy, counts beside a saved program during a map run,
// a pick changing the game state, and an edit reaching the wrong program.
test("during a map run the copy stands first and is shown with counts; a saved program picked shows none and takes its own edits", async () => {
  // decision: D-166 "On the screen of a map run the program panel shows the copy, and its select list holds „Kopia w przejściu” at its top and the player's saved programs below it"
  // decision: D-93 "On Programy and on the screen of a map run the list of rules stands under the heading „sprawdzane od góry”, and during a manual map run every program rule of the copy the map run carries out shows how many times it fired in that map run, written as „Wykonano {n}×”"
  // decision: D-174 "During a map run, picking a saved program on the program panel's list opens it for editing, and while the panel shows a saved program other than the program the copy belongs to, the button „Przełącz postać na ten program” stands under the list; its click switches the character to that program at once, and the panel shows „Kopia w przejściu” again"
  // decision: D-164 "A program can be edited at any time, and its saved change takes effect at the next manual map entry other than a map run restart, at the next switch to it during a manual map run or at the next start of an earning loop"
  await withPage(async (page) => {
    const game = await wiredPanel(page, gameWithRule());
    await game.change(send(game.state, SENT, REAL_MS));
    const list = programList(game.root);
    assert.deepEqual(positions(list), ["Kopia w przejściu", "Program"]);
    assert.equal(list.value, "copy");
    assert.equal(actionButton(game.root, "Zmień nazwę"), undefined);
    assert.equal(actionButton(game.root, "Usuń"), undefined);
    assert.ok(actionButton(game.root, "Nowy program"));
    // The one rule fired once as the map run started.
    assert.deepEqual(counts(game.root), ["Wykonano 1×"]);

    const before = game.state;
    await pick(game.root, "1");
    assert.equal(game.state, before, "picking changes no game state");
    assert.ok(actionButton(game.root, "Zmień nazwę"));
    assert.ok(actionButton(game.root, "Usuń"));
    assert.deepEqual(counts(game.root), []);

    const copy = game.state.run.copy.program;
    await click(buttonNamed(game.root, "+ dodaj grupę"));
    assert.deepEqual(game.acts.at(-1), ["editProgram", 1]);
    assert.equal(game.state.run.copy.program, copy);
    assert.equal(groupCount(game.state.programs[0].program), 2);

    await pick(game.root, "copy");
    await click(buttonNamed(game.root, "+ dodaj grupę"));
    assert.deepEqual(game.acts.at(-1), ["editCopy"]);
    assert.equal(groupCount(game.state.run.copy.program), 2);
  });
});

/** A game whose program 1 holds two rules „Zawsze → Eksploruj”, with the character Ala in the team. */
function gameWithTwoRules() {
  const programmed = setProgram(
    withEdgeSolved(newKnowingGame()),
    programFromRules(ALWAYS_EXPLORE, ALWAYS_EXPLORE),
  ).state;
  return createCharacter(programmed, "Ala").state;
}

/** Sends a drag event of the browser's kind, with the data transfer a drag carries. */
function drag(target, type) {
  const { Event } = target.ownerDocument.defaultView;
  const event = new Event(type, { bubbles: true, cancelable: true });
  Object.defineProperty(event, "dataTransfer", {
    value: { effectAllowed: "none", dropEffect: "none", setData() {} },
  });
  return inAct(() => target.dispatchEvent(event));
}

// D-348. The hint of a move, which rule or group the player moved,
// travels from the list through the panel's edit to `editCopy`, since the copies before and after a
// swap cannot tell it. Catches a panel that drops the hint on the way, one that names a neighbour,
// a hint attached to an edit that moves nothing, and one that reaches the edit of a saved program.
test("„↓” on a rule of the copy and the drop of a rule or a group reach editCopy with the hint of the move", async () => {
  // decision: D-348 "The browser view describes an act of the player on the copy"
  await withPage(async (page) => {
    const game = await wiredPanel(
      page,
      send(gameWithTwoRules(), SENT, REAL_MS).state,
    );
    await click(buttonNamed(rowOf(game.root, 1), "↓"));
    assert.deepEqual(game.acts.at(-1), ["editCopy"]);
    assert.deepEqual(game.hints.at(-1), { kind: "rule", ruleId: 1 });

    // Rule 1 stands second now; dragged onto the upper half of the first row it goes first again.
    await drag(rowOf(game.root, 1).querySelector(".drag-handle"), "dragstart");
    await drag(rowOf(game.root, 2), "drop");
    assert.deepEqual(game.acts.at(-1), ["editCopy"]);
    assert.deepEqual(game.hints.at(-1), { kind: "rule", ruleId: 1 });

    // A second group, added by the button, is no move; dragged before the first it is one.
    await click(buttonNamed(game.root, "+ dodaj grupę"));
    assert.equal(game.hints.at(-1), undefined);
    await drag(
      headerOf(game.root, 2).querySelector(".drag-handle"),
      "dragstart",
    );
    await drag(game.root.querySelector('[data-group="1"]'), "drop");
    assert.deepEqual(game.acts.at(-1), ["editCopy"]);
    assert.deepEqual(game.hints.at(-1), { kind: "group", groupId: 2 });
    assert.deepEqual(
      game.state.run.copy.program.groups.map((group) => group.id),
      [2, 1],
    );
  });
});

test("an edit of a saved program, a move included, carries no hint", async () => {
  await withPage(async (page) => {
    const game = await wiredPanel(page, gameWithTwoRules());
    assert.equal(programList(game.root).value, "1");
    await click(buttonNamed(rowOf(game.root, 1), "↓"));
    assert.deepEqual(game.acts.at(-1), ["editProgram", 1]);
    assert.equal(game.hints.at(-1), undefined);
    // The program is moved: rule 1 stands second.
    assert.deepEqual(
      game.state.programs[0].program.groups[0].rules.map((rule) => rule.id),
      [2, 1],
    );
    await drag(rowOf(game.root, 1).querySelector(".drag-handle"), "dragstart");
    await drag(rowOf(game.root, 2), "drop");
    assert.deepEqual(game.acts.at(-1), ["editProgram", 1]);
    assert.equal(game.hints.at(-1), undefined);
  });
});

// D-212, a loaded map run's copy open to editing. Catches a
// game built on a state with a map run showing a saved program instead of the copy.
test("a panel whose first state holds a map run shows the copy, as after a load", async () => {
  // decision: D-166 "On the screen of a map run the program panel shows the copy, and its select list holds „Kopia w przejściu” at its top and the player's saved programs below it"
  await withPage(async (page) => {
    const game = await wiredPanel(
      page,
      send(gameWithRule(), SENT, REAL_MS).state,
    );
    assert.equal(programList(game.root).value, "copy");
    await click(buttonNamed(game.root, "+ dodaj grupę"));
    assert.deepEqual(game.acts.at(-1), ["editCopy"]);
  });
});

// D-93, D-173, which program the panel shows. Catches „Restart”
// leaving a saved program shown, the copy lost after a death, and „Zakończ” showing another
// program, dropping the counts or putting them beside another program.
test("„Restart” and a death show the copy with counts; „Zakończ” shows the copy's program with them", async () => {
  // decision: D-93 "Before the game's first manual map run the rules show no counts; after a manual map run ends in death or in a completion its counts remain beside the copy's rules, and after „Zakończ” beside the rules of the program the copy belongs to"
  // decision: D-166 "On the screen of a map run the program panel shows the copy, and its select list holds „Kopia w przejściu” at its top and the player's saved programs below it"
  // decision: D-173 "„Zapisz” saves the copy as „Zapisz w programie” does, replacing the changes its program holds that the copy lacks, or, where its program was deleted, as a new program under the first free name with no name field, and ends the map run; „Odrzuć” ends it with no save; „Wróć” closes the question and leaves the map run as it was"
  await withPage(async (page) => {
    const game = await wiredPanel(page, gameWithRule());
    await game.change(send(game.state, SENT, REAL_MS));
    await click(actionButton(game.root, "Nowy program"));
    assert.equal(programList(game.root).value, "2");
    // Program 2 gets „Zawsze → Eksploruj” under the same rule identity as the copy's rule.
    await click(buttonNamed(game.root, "+ reguła"));
    assert.deepEqual(game.acts.at(-1), ["editProgram", 2]);
    await game.change(restart(game.state));
    assert.equal(programList(game.root).value, "copy");

    // A death by hand: the screen after it, not how the character dies, is under test.
    const died = {
      ...game.state,
      run: { ...game.state.run, death: { minute: 3, cause: "cold" } },
    };
    await game.change({ state: died, events: [] });
    assert.equal(programList(game.root).value, "copy");
    assert.equal(positions(programList(game.root))[0], "Kopia w przejściu");
    assert.deepEqual(counts(game.root), ["Wykonano 1×"]);

    await pick(game.root, "2");
    await game.change(end(game.state));
    const list = programList(game.root);
    assert.deepEqual(positions(list), ["Program", "Program 2"]);
    assert.equal(list.value, "1");
    assert.deepEqual(counts(game.root), ["Wykonano 1×"]);
    // The counts stand beside the copy's program only.
    await pick(game.root, "2");
    assert.deepEqual(counts(game.root), []);
  });
});

// D-168, D-173. Catches „Zakończ” after the copy's program was
// deleted showing a program that is gone, or a count beside the first program.
test("„Zakończ” after the copy's program was deleted shows the first program of the list, without counts", async () => {
  // decision: D-384 "Where the program the program panel shows is gone from the player's list, or the number asked for names no program, the panel shows the first program of the list"
  // decision: D-93 "Before the game's first manual map run the rules show no counts; after a manual map run ends in death or in a completion its counts remain beside the copy's rules, and after „Zakończ” beside the rules of the program the copy belongs to"
  // decision: D-168 "Deleting the program the copy of the map run belongs to leaves the map run going on with the copy, whose heading keeps the name the program had"
  await withPage(async (page) => {
    // Program 2 holds a rule of the same identity and content as the copy's, so a count kept
    // after the copy's program is gone would show beside it.
    const start = editProgram(
      createProgram(gameWithRule()).state,
      2,
      programFromRules(ALWAYS_EXPLORE),
    ).state;
    const game = await wiredPanel(page, start);
    await game.change(send(game.state, { ...SENT, programId: 1 }, REAL_MS));
    await pick(game.root, "1");
    await click(actionButton(game.root, "Usuń"));
    assert.equal(programList(game.root).value, "2");
    assert.deepEqual(positions(programList(game.root)), [
      "Kopia w przejściu",
      "Program 2",
    ]);
    await game.change(end(game.state));
    assert.deepEqual(positions(programList(game.root)), ["Program 2"]);
    assert.equal(programList(game.root).value, "2");
    assert.deepEqual(counts(game.root), []);
  });
});

/** The group-name field of the rule panel, opened from the header of group 1. */
async function openGroupName(root) {
  await click(headerOf(root, 1));
  return root.querySelector('input[aria-label="Nazwa grupy"]');
}

/** Focuses `input` and types `text` into it, as a player does. */
async function typeInFocused(input, text) {
  await inAct(() => input.focus());
  await typeInto(input, text);
}

// The controls are updated in place. Catches time passing rewriting the
// name field or an editor field the player is typing into, or moving focus.
test("time passing keeps what is typed in the name field and in an editor field, and the focus", async () => {
  await withPage(async (page) => {
    const game = await wiredPanel(page, gameWithRule());
    await game.change(send(game.state, SENT, REAL_MS));
    const groupName = await openGroupName(game.root);
    await typeInFocused(groupName, "Niezatwierdzona");
    await game.change(advanceMinutes(game.state, 3));
    assert.equal(
      game.root.querySelector('input[aria-label="Nazwa grupy"]'),
      groupName,
      "the same field",
    );
    assert.equal(groupName.value, "Niezatwierdzona");
    assert.equal(page.document.activeElement, groupName);

    await pick(game.root, "1");
    await click(actionButton(game.root, "Zmień nazwę"));
    await typeName(game.root, "Las");
    await game.change(advanceMinutes(game.state, 3));
    assert.equal(nameOpen(game.root), true);
    assert.equal(nameInput(game.root).value, "Las");
    assert.equal(page.document.activeElement, nameInput(game.root));
  });
});

/** Ala's map run with a copy whose rule reads „Zapas poniżej 8 · Patyk → Eksploruj”. */
function runWithNumber() {
  const program = programFromRules({
    condition: { kind: "itemBelow", item: "stick", value: 8 },
    action: { kind: "explore" },
  });
  const state = createCharacter(
    setProgram(withEdgeSolved(newKnowingGame()), program).state,
    "Ala",
  ).state;
  return send(state, SENT, REAL_MS).state;
}

// D-03: the screen of a map run changes up to five times a second beside fields in which the player
// types. Catches a number typed into the panel of the copy that the redraws of the screen rewrite or
// take the focus from.
test("a number typed into the panel on the screen of a map run at 16× keeps its text, its cursor field and the focus over three seconds of redraws", async () => {
  await withPage(async (page) => {
    const game = await wiredPanel(page, runWithNumber());
    await game.change(setPace(game.state, 16));
    await click(rowOf(game.root, 1).querySelector(".rule-condition"));
    const number = game.root.querySelector('input[aria-label="Liczba"]');
    assert.ok(number, "the panel holds the number");
    await inAct(() => number.focus());
    await typeInto(number, "12");
    const minutes = game.state.run.minute;
    // Three seconds at five frames a second.
    for (let frame = 0; frame < 15; frame += 1)
      await game.change(passRealTime(game.state, 200));
    assert.ok(
      game.state.run.minute > minutes,
      "precondition: the game went on",
    );
    assert.equal(
      game.root.querySelector('input[aria-label="Liczba"]'),
      number,
      "the same field",
    );
    assert.equal(number.value, "12");
    assert.equal(page.document.activeElement, number);
    assert.ok(!game.acts.some(([act]) => act === "editCopy"), "nothing yet");
    await key(number, "Enter");
    assert.deepEqual(game.state.run.copy.program.groups[0].rules[0].condition, {
      kind: "itemBelow",
      item: "stick",
      value: 12,
    });
  });
});

// D-306: on Enter the panel moves the focus to a cell of the next pick during the key's own event,
// and a browser then delivers the same Enter to that cell and picks it, so a field the player must
// see is skipped. jsdom does not deliver that second press, so the case holds the cause: the keydown
// of Enter is consumed. Catches the number's Enter left to the browser.
test("Enter in the number field is consumed, so the press cannot reach the cell the focus moves to", async () => {
  // decision: D-306 "A click on a program rule's row opens the rule panel on the condition, and its fields follow as condition, number, target of the condition, action and target of the action, the number field and a field of a target standing only where the condition or the action has one; each pick changes the rule at once and moves to the next field, a pick of the value already picked included, and Enter or leaving the field confirms the number"
  await withPage(async (page) => {
    const game = await wiredPanel(page, runWithNumber());
    await click(rowOf(game.root, 1).querySelector(".rule-condition"));
    const number = game.root.querySelector('input[aria-label="Liczba"]');
    await inAct(() => number.focus());
    const { KeyboardEvent } = page.window;
    let delivered = null;
    await inAct(() => {
      delivered = number.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "Enter",
          bubbles: true,
          cancelable: true,
        }),
      );
    });
    assert.equal(delivered, false, "the key press is consumed");
    assert.ok(
      game.root
        .querySelector(".rule-panel")
        .contains(page.document.activeElement),
      "the panel moved on",
    );
  });
});

// --- „Dodaj regułę z tym”: the panel adds the discovered rule --------------------------------------
// D-313, D-124, D-131, D-166, D-306. Which rule a
// discovery writes is the case of tests/view/discovery-rule.test.mjs; these cases hold what the panel
// does with it: the act it hands the game, the program it shows and where the rule panel opens.

/**
 * A new game whose first map run reached its first chill: the game pauses on the discovery
 * „Wędruj” and „Temperatura poniżej”, and the copy's group „Program” holds the rule the game wrote,
 * „Zawsze → Eksploruj”.
 */
function firstChill() {
  const sent = send(
    createCharacter(withEdgeSolved(newGame()), "Ala").state,
    SENT,
    REAL_MS,
  );
  return advanceMinutes(sent.state, 100).state;
}

/** The rules of a group, without their numbers. */
const rulesOfGroup = (group) =>
  group.rules.map(({ condition, action }) => ({ condition, action }));

// Catches the call handing the game no edit or an edit of a saved program, the rule panel left closed,
// opened anywhere but under the new rule's row, opened on the condition after the button filled the
// action, the focus left outside the field, and the streak left as it stood.
test("at the first chill „Dodaj regułę z tym” adds „Zawsze → Wędruj” at the end of the copy's group „Program”, opens it under the new row on the action with the focus there, and the streak goes to zero", async () => {
  // decision: D-123 "The game writes one such rule, „Zawsze → Eksploruj”, at the first chill"
  // decision: D-313 "„Dodaj regułę z tym” in the band of a discovery adds a program rule at the end of the copy's first rule group"
  await withPage(async (page) => {
    const chilled = firstChill();
    assert.deepEqual(
      chilled.discovery?.actions,
      ["wander"],
      "precondition: the first chill holds its discovery",
    );
    assert.deepEqual(
      rulesOfGroup(chilled.run.copy.program.groups[0]),
      [ALWAYS_EXPLORE],
      "precondition: the copy holds the rule the game wrote",
    );
    // The cold of the first chill has already set the real streak to zero, so a streak set by hand
    // shows that the call itself zeroes it (D-131).
    const game = await wiredPanel(page, {
      ...chilled,
      run: { ...chilled.run, streak: 40 },
    });
    await inAct(() => game.panel.addDiscoveredRule());

    assert.deepEqual(game.acts, [["editCopy"]]);
    const group = game.state.run.copy.program.groups[0];
    assert.equal(group.name, "Program");
    assert.deepEqual(rulesOfGroup(group), [ALWAYS_EXPLORE, ALWAYS_WANDER]);
    assert.equal(game.state.run.streak, 0);
    assert.equal(
      game.root.querySelector(".rule-panel-heading")?.textContent,
      "Reguła 1.2",
    );
    assert.ok(
      rowOf(game.root, group.rules[1].id).nextElementSibling.contains(
        game.root.querySelector(".rule-panel"),
      ),
      "the panel stands right under the new rule's row",
    );
    assert.equal(
      rowOf(game.root, group.rules[1].id).getAttribute("aria-current"),
      "true",
    );
    const focused = page.document.activeElement;
    assert.ok(
      game.root.querySelector(".rule-panel").contains(focused),
      "the focus is in the panel",
    );
    assert.equal(
      focused.closest('[role="group"]')?.getAttribute("aria-label"),
      "Czynność",
      "the focus is in the action's pick",
    );
    assert.equal(focused.textContent, "Wędruj");
  });
});

// D-166, D-313: the rule goes to the copy, which the list „Program:” then shows; D-306: „✕” closes
// the panel the call opened, as any. Catches a saved program left shown, or edited, when the call adds
// the rule, and a request to open that opens again at every draw.
test("with a saved program shown on the list „Program:”, „Dodaj regułę z tym” shows the copy and opens the new rule there, once", async () => {
  // decision: D-313 "„Dodaj regułę z tym” in the band of a discovery adds a program rule at the end of the copy's first rule group"
  // decision: D-306 "After the last field the panel stays open, and „✕”, Escape or opening another rule closes it"
  await withPage(async (page) => {
    const game = await wiredPanel(page, firstChill());
    await pick(game.root, "1");
    assert.equal(programList(game.root).value, "1", "precondition");
    const saved = game.state.programs[0].program;
    await inAct(() => game.panel.addDiscoveredRule());

    assert.deepEqual(game.acts, [["editCopy"]]);
    assert.equal(game.state.programs[0].program, saved, "no saved edit");
    assert.equal(game.state.run.copy.program.groups[0].rules.length, 2);
    assert.equal(programList(game.root).value, "copy");
    assert.equal(
      game.root.querySelector(".rule-panel-heading")?.textContent,
      "Reguła 1.2",
    );
    assert.ok(
      game.root
        .querySelector(".rule-panel")
        .contains(page.document.activeElement),
      "the focus went into the panel",
    );

    await click(buttonNamed(game.root.querySelector(".rule-panel"), "✕"));
    assert.equal(classed(game.root, "rule-panel").length, 0, "closed by ✕");
    assert.equal(
      page.document.activeElement,
      rowOf(game.root, game.state.run.copy.program.groups[0].rules[1].id),
      "the focus went to the new rule's row",
    );
    await game.change({ state: game.state, events: [] });
    assert.equal(classed(game.root, "rule-panel").length, 0, "stays closed");
  });
});

// A field of the editor commits its text when it loses the focus, and the screen may call while a
// field of the copy's rule panel still holds it. Catches the typed text lost when the panel moves to
// the new rule, and the rule built on the copy without the text.
test("text typed into the copy's editor and not yet committed lands in the copy before „Dodaj regułę z tym” adds its rule", async () => {
  await withPage(async (page) => {
    const game = await wiredPanel(page, firstChill());
    const groupName = await openGroupName(game.root);
    await typeInFocused(groupName, "Las nocą");
    await inAct(() => game.panel.addDiscoveredRule());
    const group = game.state.run.copy.program.groups[0];
    assert.equal(group.name, "Las nocą");
    assert.deepEqual(rulesOfGroup(group), [ALWAYS_EXPLORE, ALWAYS_WANDER]);
    assert.equal(
      game.root.querySelector(".rule-panel-heading")?.textContent,
      "Reguła 1.2",
    );
  });
});

// Catches a call that adds a rule, opens a panel or shows the copy where the game holds no
// discovery, and one that acts in the panel of Programy, which shows a saved program (D-166).
test("with no discovery held, and on Programy, „Dodaj regułę z tym” changes nothing and opens nothing", async () => {
  await withPage(async (page) => {
    const game = await wiredPanel(
      page,
      send(gameWithRule(), SENT, REAL_MS).state,
    );
    assert.equal(game.state.discovery, null, "precondition: no discovery");
    await pick(game.root, "1");
    const before = game.state;
    await inAct(() => game.panel.addDiscoveredRule());
    assert.deepEqual(game.acts, []);
    assert.equal(game.state, before);
    assert.equal(programList(game.root).value, "1", "the program shown stays");
    assert.equal(classed(game.root, "rule-panel").length, 0);
  });
  await withPage(async (page) => {
    const game = await wiredPanel(page, firstChill(), "programs");
    assert.ok(game.state.discovery, "precondition: a discovery is held");
    const before = game.state;
    await inAct(() => game.panel.addDiscoveredRule());
    assert.deepEqual(game.acts, []);
    assert.equal(game.state, before);
    assert.equal(classed(game.root, "rule-panel").length, 0);
  });
});

/** The texts of the panel's lines and heading of the copy. */
const copyTexts = (root) =>
  [...root.querySelectorAll(".copy-heading, .copy-line")].map(
    (element) => element.textContent,
  );

const SAVE_BUTTONS = [
  "Zapisz w programie",
  "Zapisz jako nowy program",
  "Porzuć zmiany",
];

/** The button of the copy's section named `text`, if the panel draws it. */
const copyButton = (root, text) =>
  buttonNamed(root.querySelector(".copy-section") ?? root, text);

// D-171. Catches the line
// missing or standing without a change, and the three buttons active when the copy equals its
// program or inactive when it differs.
test("the copy shows its heading; an edit of the copy brings „Niezapisane zmiany w kopii.” and activates the three buttons", async () => {
  // decision: D-171 "During a map run the program panel shows the copy under the heading „Kopia: {program name}”"
  // decision: D-171 "While the copy's program is on the player's list and the copy differs from it as the copy was taken from it or last saved into it, the line „Niezapisane zmiany w kopii.” stands under the heading in the role `warning` and „Zapisz w programie”, „Zapisz jako nowy program” and „Porzuć zmiany” are active, and while it is the same, the line is gone and the three buttons are inactive"
  await withPage(async (page) => {
    const game = await wiredPanel(page, gameWithRule());
    await game.change(send(game.state, SENT, REAL_MS));
    assert.deepEqual(copyTexts(game.root), ["Kopia: Program"]);
    for (const text of SAVE_BUTTONS)
      assert.equal(copyButton(game.root, text).disabled, true, text);

    await click(buttonNamed(game.root, "+ dodaj grupę"));
    assert.deepEqual(copyTexts(game.root), [
      "Kopia: Program",
      "Niezapisane zmiany w kopii.",
    ]);
    for (const text of SAVE_BUTTONS)
      assert.equal(copyButton(game.root, text).disabled, false, text);
  });
});

// Text typed into an editor field and not
// yet committed, while the panel shows another program without focus moving, must land in the
// program it was typed into. Catches the removed focused field committing into the newly shown
// program.
test("uncommitted text in the copy's editor lands in the copy when the program shown changes without moving focus", async () => {
  await withPage(async (page) => {
    const game = await wiredPanel(page, gameWithRule());
    await click(actionButton(game.root, "Nowy program"));
    await game.change(send(game.state, SENT, REAL_MS));
    const groupName = await openGroupName(game.root);
    await typeInFocused(groupName, "Wpisane w kopii");
    await pick(game.root, "2");
    assert.equal(page.document.activeElement, page.document.body);
    assert.equal(game.state.run.copy.program.groups[0].name, "Wpisane w kopii");
    assert.equal(game.state.programs[1].program.groups[0].name, "Program");
    assert.equal(game.state.programs[0].program.groups[0].name, "Program");
  });
});

/** A map run with the copy edited: one group added, so the copy differs from its program. */
async function editedCopyGame(page) {
  const game = await wiredPanel(page, gameWithRule());
  await game.change(send(game.state, SENT, REAL_MS));
  await click(buttonNamed(game.root, "+ dodaj grupę"));
  return game;
}

// D-171. Catches the save writing something other than the copy into the
// program, the line staying after the save, and the buttons staying active.
test("„Zapisz w programie” writes the copy into its program, and the line and the activity go", async () => {
  // decision: D-171 "While the copy's program is on the player's list and the copy differs from it as the copy was taken from it or last saved into it, the line „Niezapisane zmiany w kopii.” stands under the heading in the role `warning` and „Zapisz w programie”, „Zapisz jako nowy program” and „Porzuć zmiany” are active, and while it is the same, the line is gone and the three buttons are inactive"
  // decision: D-164 "A change made during a map run goes into the copy and reaches the program only when the player saves it there or as a new program, or is dropped when the player discards it or switches the character to another program"
  await withPage(async (page) => {
    const game = await editedCopyGame(page);
    const copy = game.state.run.copy.program;
    await click(copyButton(game.root, "Zapisz w programie"));
    assert.deepEqual(game.acts.at(-1), ["saveCopy"]);
    assert.equal(game.state.programs[0].program, copy);
    assert.deepEqual(copyTexts(game.root), ["Kopia: Program"]);
    for (const text of SAVE_BUTTONS)
      assert.equal(copyButton(game.root, text).disabled, true, text);
    assert.equal(page.document.activeElement, programList(game.root));
  });
});

// D-172. Catches the line missing when the program changed and the
// copy has no changes, the line staying after the save, and a wrong program name in it.
test("the line of a changed program stands with and without unsaved changes, and goes after „Zapisz w programie”", async () => {
  // decision: D-172 "While the program the copy belongs to holds changes made since the copy was taken from it or last saved into it, a line in the role `warning` beside the save buttons reads „Program {name} ma zmiany, których nie ma w tej kopii.” where the copy holds no unsaved changes and „Program {name} ma zmiany, których nie ma w tej kopii — zapis w programie je zastąpi.” where it holds some; „Zapisz w programie” then saves at once, in one click, and after the save the line is gone"
  // decision: D-164 "A change made during a map run goes into the copy and reaches the program only when the player saves it there or as a new program, or is dropped when the player discards it or switches the character to another program"
  await withPage(async (page) => {
    const game = await wiredPanel(page, gameWithRule());
    await game.change(send(game.state, SENT, REAL_MS));
    await pick(game.root, "1");
    await click(actionButton(game.root, "Zmień nazwę"));
    await typeName(game.root, "Las");
    await click(nameSave(game.root));
    // The program, not the copy, gets a group.
    await click(buttonNamed(game.root, "+ dodaj grupę"));
    await pick(game.root, "copy");
    // Without unsaved changes the line promises no save (D-172); with some it names the save.
    const lacksPlain = "Program Las ma zmiany, których nie ma w tej kopii.";
    const lacks =
      "Program Las ma zmiany, których nie ma w tej kopii — zapis w programie je zastąpi.";
    assert.deepEqual(copyTexts(game.root), ["Kopia: Las", lacksPlain]);
    assert.equal(copyButton(game.root, "Zapisz w programie").disabled, true);

    await click(buttonNamed(game.root, "+ dodaj grupę"));
    assert.deepEqual(copyTexts(game.root), [
      "Kopia: Las",
      "Niezapisane zmiany w kopii.",
      lacks,
    ]);
    await click(copyButton(game.root, "Zapisz w programie"));
    assert.deepEqual(copyTexts(game.root), ["Kopia: Las"]);
    assert.equal(groupCount(game.state.programs[0].program), 2);
  });
});

// D-172. Catches the full sentence, with its promise of a save, standing beside the inactive „Zapisz w
// programie” of a copy with no unsaved changes, and the short line missing there.
test("a copy with no unsaved changes whose program was changed reads the short line, with „Zapisz w programie” inactive", async () => {
  // decision: D-172 "While the program the copy belongs to holds changes made since the copy was taken from it or last saved into it, a line in the role `warning` beside the save buttons reads „Program {name} ma zmiany, których nie ma w tej kopii.” where the copy holds no unsaved changes and „Program {name} ma zmiany, których nie ma w tej kopii — zapis w programie je zastąpi.” where it holds some; „Zapisz w programie” then saves at once, in one click, and after the save the line is gone"
  await withPage(async (page) => {
    const game = await wiredPanel(page, gameWithRule());
    await game.change(send(game.state, SENT, REAL_MS));
    await pick(game.root, "1");
    await click(buttonNamed(game.root, "+ dodaj grupę"));
    await pick(game.root, "copy");
    assert.deepEqual(copyTexts(game.root), [
      "Kopia: Program",
      "Program Program ma zmiany, których nie ma w tej kopii.",
    ]);
    assert.equal(copyButton(game.root, "Zapisz w programie").disabled, true);
  });
});

// D-171, D-169. Catches an empty or wrong first value of the field, a
// refused name saved, and the panel leaving the copy or keeping the old program number.
test("„Zapisz jako nowy program” offers the first free name, refuses a taken one, and the copy then belongs to the new program", async () => {
  // decision: D-171 "„Zapisz jako nowy program” offers the first free name of a program, and after that save the copy belongs to the new program, which becomes the program the character used last"
  // decision: D-169 "A program's name is the typed text trimmed of the white space at its start and end, and it is not empty; the game takes no name another program bears, comparing names regardless of letter case, and sets no limit to a name's length"
  await withPage(async (page) => {
    const game = await editedCopyGame(page);
    await click(copyButton(game.root, "Zapisz jako nowy program"));
    assert.equal(nameOpen(game.root), true);
    assert.equal(nameInput(game.root).value, "Program 2");

    await typeName(game.root, "PROGRAM");
    assert.equal(nameMessage(game.root), "Program o tej nazwie już istnieje.");
    await click(nameSave(game.root));
    assert.ok(!game.acts.some(([act]) => act === "saveCopyAsNew"));
    assert.equal(nameOpen(game.root), true);

    await typeName(game.root, " Las ");
    await click(nameSave(game.root));
    assert.deepEqual(game.acts.at(-1), ["saveCopyAsNew", " Las "]);
    assert.equal(nameOpen(game.root), false);
    assert.equal(programList(game.root).value, "copy");
    assert.deepEqual(positions(programList(game.root)), [
      "Kopia w przejściu",
      "Program",
      "Las",
    ]);
    assert.deepEqual(copyTexts(game.root), ["Kopia: Las"]);
    assert.equal(game.state.run.copy.programId, 2);
    for (const text of SAVE_BUTTONS)
      assert.equal(copyButton(game.root, text).disabled, true, text);
  });
});

// D-171, D-169. Catches the suggestion ignoring the names taken, the field staying
// open after the copy lost its changes, and the same action not leaving the field.
test("„Zapisz jako nowy program” suggests „Program 3” beside „Program 2”, and its field leaves at the same action again", async () => {
  // decision: D-171 "„Zapisz jako nowy program” offers the first free name of a program, and after that save the copy belongs to the new program, which becomes the program the character used last"
  // decision: D-169 "The program of a new game is named „Program”, and a new program „Program 2”, „Program 3” and on, by the first free number"
  await withPage(async (page) => {
    const game = await wiredPanel(page, createProgram(gameWithRule()).state);
    await game.change(send(game.state, SENT, REAL_MS));
    await click(buttonNamed(game.root, "+ dodaj grupę"));
    await click(copyButton(game.root, "Zapisz jako nowy program"));
    assert.equal(nameInput(game.root).value, "Program 3");
    await click(copyButton(game.root, "Zapisz jako nowy program"));
    assert.equal(nameOpen(game.root), false);
    await click(copyButton(game.root, "Zapisz jako nowy program"));
    assert.equal(nameOpen(game.root), true);
    await click(copyButton(game.root, "Porzuć zmiany"));
    assert.equal(nameOpen(game.root), false, "no changes, nothing to save");
  });
});

// D-171. Catches the discard leaving the copy's edit, the line staying, and
// the discard not going to the simulation.
test("„Porzuć zmiany” restores the copy's program and the line goes", async () => {
  // decision: D-171 "While the copy's program is on the player's list and the copy differs from it as the copy was taken from it or last saved into it, the line „Niezapisane zmiany w kopii.” stands under the heading in the role `warning` and „Zapisz w programie”, „Zapisz jako nowy program” and „Porzuć zmiany” are active, and while it is the same, the line is gone and the three buttons are inactive"
  // decision: D-164 "A change made during a map run goes into the copy and reaches the program only when the player saves it there or as a new program, or is dropped when the player discards it or switches the character to another program"
  await withPage(async (page) => {
    const game = await editedCopyGame(page);
    await click(copyButton(game.root, "Porzuć zmiany"));
    assert.deepEqual(game.acts.at(-1), ["discardCopy"]);
    assert.equal(groupCount(game.state.run.copy.program), 1);
    assert.deepEqual(copyTexts(game.root), ["Kopia: Program"]);
    for (const text of SAVE_BUTTONS)
      assert.equal(copyButton(game.root, text).disabled, true, text);
  });
});

// D-168. Catches the heading losing the name of a deleted
// program, „Zapisz w programie” and „Porzuć zmiany” offered for a program that is gone, and
// „Zapisz jako nowy program” withdrawn.
test("a copy whose program was deleted keeps its heading, offers only „Zapisz jako nowy program”, and it is active", async () => {
  // decision: D-168 "Deleting the program the copy of the map run belongs to leaves the map run going on with the copy, whose heading keeps the name the program had"
  // decision: D-168 "„Zapisz w programie” and „Porzuć zmiany” are then gone, and the copy counts as holding unsaved changes: the line „Niezapisane zmiany w kopii.” stands and „Zapisz jako nowy program” is active until the copy is saved as a new program"
  // decision: D-171 "During a map run the program panel shows the copy under the heading „Kopia: {program name}”"
  await withPage(async (page) => {
    const game = await wiredPanel(page, createProgram(gameWithRule()).state);
    await game.change(send(game.state, SENT, REAL_MS));
    await pick(game.root, "1");
    await click(actionButton(game.root, "Usuń"));
    await pick(game.root, "copy");
    assert.deepEqual(copyTexts(game.root), [
      "Kopia: Program",
      "Niezapisane zmiany w kopii.",
    ]);
    assert.equal(copyButton(game.root, "Zapisz w programie"), undefined);
    assert.equal(copyButton(game.root, "Porzuć zmiany"), undefined);
    assert.equal(
      copyButton(game.root, "Zapisz jako nowy program").disabled,
      false,
    );
    await click(copyButton(game.root, "Zapisz jako nowy program"));
    assert.equal(nameInput(game.root).value, "Program 3");
    await click(nameSave(game.root));
    assert.deepEqual(copyTexts(game.root), ["Kopia: Program 3"]);
  });
});

const SWITCH = "Przełącz postać na ten program";

// D-174. Catches the button missing beside another program, shown
// beside the copy's own program or the copy, and a click that does not switch and show the copy.
test("„Przełącz postać na ten program” stands beside another saved program only, and a click switches and shows the copy", async () => {
  // decision: D-44 "The screens of the browser view build every button, select list, number field, text field and cell of a pick from the eight shared controls of `src/browser/view/controls/` — the button, the destructive button, the button selected in its group, the secondary action (D-275), the select list, the number field, the text field and the pick cell — and the buttons „Zakończ”, „Usuń”, „Restart”, „Porzuć zmiany”, „Przełącz postać na ten program”, „Zatrzymaj” and „Zacznij od zera” (D-402), and „Odrzuć” of the question „Zapisać, odrzucić, wrócić?” (D-173), are destructive buttons"
  // decision: D-174 "During a map run, picking a saved program on the program panel's list opens it for editing, and while the panel shows a saved program other than the program the copy belongs to, the button „Przełącz postać na ten program” stands under the list; its click switches the character to that program at once, and the panel shows „Kopia w przejściu” again"
  // decision: D-174 "Beside the program the copy belongs to, the button is gone"
  await withPage(async (page) => {
    const game = await wiredPanel(page, createProgram(gameWithRule()).state);
    await game.change(send(game.state, SENT, REAL_MS));
    assert.equal(buttonNamed(game.root, SWITCH), undefined, "copy shown");
    await pick(game.root, "1");
    assert.equal(buttonNamed(game.root, SWITCH), undefined, "own program");
    await pick(game.root, "2");
    assert.ok(buttonNamed(game.root, SWITCH));
    assert.ok(
      buttonNamed(game.root, SWITCH).classList.contains("destructive"),
      "a destructive button",
    );

    await click(buttonNamed(game.root, SWITCH));
    assert.deepEqual(game.acts.at(-1), ["switchProgram", 2]);
    assert.equal(game.state.run.copy.programId, 2);
    assert.equal(game.state.run.streak, 0);
    assert.deepEqual(counts(game.root), []);
    assert.equal(programList(game.root).value, "copy");
    assert.deepEqual(copyTexts(game.root), ["Kopia: Program 2"]);
    assert.equal(buttonNamed(game.root, SWITCH), undefined);
    assert.equal(page.document.activeElement, programList(game.root));
    await pick(game.root, "1");
    assert.ok(buttonNamed(game.root, SWITCH), "now beside the first program");
  });
});

// D-174. Catches the button standing beside the new program after
// „Zapisz jako nowy program”, and not beside the program the copy was taken from.
test("after „Zapisz jako nowy program” the switch button stands beside the first program and not beside the new one", async () => {
  // decision: D-174 "During a map run, picking a saved program on the program panel's list opens it for editing, and while the panel shows a saved program other than the program the copy belongs to, the button „Przełącz postać na ten program” stands under the list; its click switches the character to that program at once, and the panel shows „Kopia w przejściu” again"
  // decision: D-174 "Beside the program the copy belongs to, the button is gone"
  await withPage(async (page) => {
    const game = await editedCopyGame(page);
    await click(copyButton(game.root, "Zapisz jako nowy program"));
    await click(nameSave(game.root));
    await pick(game.root, "2");
    assert.equal(buttonNamed(game.root, SWITCH), undefined);
    await pick(game.root, "1");
    assert.ok(buttonNamed(game.root, SWITCH));
  });
});

// D-173, D-174. Catches the switch button standing on the screen after a death
// and the copy's buttons not working there.
test("on the screen after a death the copy's buttons work and there is no switch button", async () => {
  // decision: D-173 "On the screens after a character's death and after a completion, editing the copy, „Zapisz w programie”, „Zapisz jako nowy program” and „Porzuć zmiany” act as during the map run until the player picks „Restart” or ends the map run with „Zakończ” or „Otwarte: {mapa} →”"
  // decision: D-174 "During a map run, picking a saved program on the program panel's list opens it for editing, and while the panel shows a saved program other than the program the copy belongs to, the button „Przełącz postać na ten program” stands under the list; its click switches the character to that program at once, and the panel shows „Kopia w przejściu” again"
  await withPage(async (page) => {
    const game = await wiredPanel(page, createProgram(gameWithRule()).state);
    await game.change(send(game.state, SENT, REAL_MS));
    await click(buttonNamed(game.root, "+ dodaj grupę"));
    await game.change({
      state: {
        ...game.state,
        run: { ...game.state.run, death: { minute: 3, cause: "cold" } },
      },
      events: [],
    });
    await click(copyButton(game.root, "Zapisz w programie"));
    assert.deepEqual(game.acts.at(-1), ["saveCopy"]);
    assert.deepEqual(copyTexts(game.root), ["Kopia: Program"]);
    await pick(game.root, "2");
    assert.equal(buttonNamed(game.root, SWITCH), undefined);
  });
});

// D-173. Catches the copy's section staying after „Zakończ”, when a saved
// program is shown.
test("after „Zakończ” with unsaved changes the copy's section is gone", async () => {
  // decision: D-173 "„Zapisz” saves the copy as „Zapisz w programie” does, replacing the changes its program holds that the copy lacks, or, where its program was deleted, as a new program under the first free name with no name field, and ends the map run; „Odrzuć” ends it with no save; „Wróć” closes the question and leaves the map run as it was"
  await withPage(async (page) => {
    const game = await editedCopyGame(page);
    await game.change(end(game.state));
    assert.deepEqual(copyTexts(game.root), []);
    assert.equal(copyButton(game.root, "Zapisz w programie"), undefined);
  });
});

// --- the panel on Programy -----------------------------------------------------------------------
// D-166, D-196. The list of programs on the left is the list of the screen
// (tests/view/program-list.test.mjs); the panel beside it has the mode of its own.

const NOTE = "Zmiany tutaj nie dotykają przejścia na mapie Las.";

/** The sentences „Zmiany tutaj nie dotykają przejścia …” the player sees. */
const runNotes = (root) =>
  classed(root, "program-run-note").map((element) => element.textContent);

/** The parts of the panel of a map run's screen that the list of Programy and the address replace. */
const LIST_PARTS = [
  "program-list",
  "program-actions",
  "program-name",
  "program-switch",
  "copy-section",
];

/** The map run of the state, going on, paused, or ended in a death or a completion. */
const WAITING = [
  ["going on", (state) => state],
  ["paused", (state) => setPaused(state, true).state],
  [
    "ended in a death",
    (state) => ({
      ...state,
      run: { ...state.run, death: { minute: 3, cause: "cold" } },
    }),
  ],
  [
    "ended in a completion",
    (state) => ({ ...state, run: { ...state.run, completion: { minute: 3 } } }),
  ],
];

// Catches the panel of Programy showing the copy beside a map run (D-166), the list "Program:" and
// the copy's buttons still standing, the sentence missing, and an edit reaching the copy.
for (const [stage, shape] of WAITING) {
  test(`Programy beside a map run ${stage} shows the saved program, with the sentence above the editor and no list, copy or switch`, async () => {
    // decision: D-166 "That program is always a saved one, never the copy: while a manual map run goes on, or has ended and waits for „Restart” or „Zakończ”, „Zmiany tutaj nie dotykają przejścia na mapie {mapa}.” stands above the editor, and „Przełącz postać na ten program” stands on the screen of a map run alone"
    // decision: D-93 "On Programy and on the screen of a map run the list of rules stands under the heading „sprawdzane od góry”, and during a manual map run every program rule of the copy the map run carries out shows how many times it fired in that map run, written as „Wykonano {n}×”"
    await withPage(async (page) => {
      const started = send(gameWithRule(), SENT, REAL_MS).state;
      const game = await wiredPanel(page, shape(started), "programs");
      assert.deepEqual(runNotes(game.root), [NOTE]);
      const order = inOrder(game.root);
      assert.ok(
        order.findIndex((element) => element.matches(".program-run-note")) <
          order.findIndex((element) => element.matches(".program-editing")),
        "the sentence stands above the editor",
      );
      assert.equal(programList(game.root), null);
      assert.deepEqual(
        LIST_PARTS.flatMap((name) => classed(game.root, name)),
        [],
      );
      assert.equal(buttonNamed(game.root, "Nowy program"), undefined);
      assert.equal(buttonNamed(game.root, "Zmień nazwę"), undefined);
      assert.equal(buttonNamed(game.root, SWITCH), undefined);
      assert.deepEqual(copyTexts(game.root), []);
      assert.equal(
        game.root.querySelector(".program-title").textContent,
        "Program",
        "the saved program shown, never the copy",
      );
      // The counts stand beside the copy alone; a saved program shows none during a map run.
      assert.deepEqual(counts(game.root), []);

      const copy = game.state.run.copy.program;
      await click(buttonNamed(game.root, "+ dodaj grupę"));
      assert.deepEqual(game.acts.at(-1), ["editProgram", 1]);
      assert.equal(game.state.run.copy.program, copy, "the copy is not edited");
      assert.equal(groupCount(game.state.programs[0].program), 2);
    });
  });
}

// Catches the sentence standing with no map run to name, and standing on after „Zakończ”.
test("the sentence stands only while the game state holds a map run: not before a send, gone after „Zakończ”", async () => {
  // decision: D-166 "That program is always a saved one, never the copy: while a manual map run goes on, or has ended and waits for „Restart” or „Zakończ”, „Zmiany tutaj nie dotykają przejścia na mapie {mapa}.” stands above the editor, and „Przełącz postać na ten program” stands on the screen of a map run alone"
  await withPage(async (page) => {
    const game = await wiredPanel(page, gameWithRule(), "programs");
    assert.deepEqual(runNotes(game.root), []);
    await game.change(send(game.state, SENT, REAL_MS));
    assert.deepEqual(runNotes(game.root), [NOTE]);
    await game.change(end(game.state));
    assert.deepEqual(runNotes(game.root), []);
  });
});

// Catches the panel of a map run's screen losing the copy's section, or taking the sentence of
// Programy: the sentence belongs to the other screen, where the copy is not shown.
test("the panel of a map run's screen holds the sentence of Programy nowhere", async () => {
  // decision: D-166 "That program is always a saved one, never the copy: while a manual map run goes on, or has ended and waits for „Restart” or „Zakończ”, „Zmiany tutaj nie dotykają przejścia na mapie {mapa}.” stands above the editor, and „Przełącz postać na ten program” stands on the screen of a map run alone"
  // decision: D-174 "Beside the program the copy belongs to, the button is gone"
  await withPage(async (page) => {
    const game = await wiredPanel(page, gameWithRule());
    await game.change(send(game.state, SENT, REAL_MS));
    assert.deepEqual(runNotes(game.root), []);
    await pick(game.root, "1");
    assert.deepEqual(runNotes(game.root), []);
    assert.equal(buttonNamed(game.root, SWITCH), undefined);
    assert.equal(programList(game.root).value, "1");
  });
});

// Catches a program shown that is not the one asked for, a pick that changes the game state, an
// edit landing in another program, and a program gone from the list left shown.
test("showProgram shows the saved program asked for and takes its edits; one gone from the list gives way to the first", async () => {
  // decision: D-384 "Where the program the program panel shows is gone from the player's list, or the number asked for names no program, the panel shows the first program of the list"
  // decision: D-166 "The screen Programy holds on the left the list of the player's programs and on the right the program editor with the program picked there"
  await withPage(async (page) => {
    const game = await wiredPanel(
      page,
      createProgram(createProgram(gameWithRule()).state).state,
      "programs",
    );
    const before = game.state;
    await inAct(() => game.panel.showProgram(3));
    assert.equal(game.state, before, "showing changes no game state");
    assert.equal(
      game.root.querySelector(".program-title").textContent,
      "Program 3",
    );
    await click(buttonNamed(game.root, "+ dodaj grupę"));
    assert.deepEqual(game.acts.at(-1), ["editProgram", 3]);
    assert.equal(groupCount(game.state.programs[2].program), 2);
    assert.equal(groupCount(game.state.programs[0].program), 1);

    await game.change(deleteProgram(game.state, 3));
    await click(buttonNamed(game.root, "+ dodaj grupę"));
    assert.deepEqual(game.acts.at(-1), ["editProgram", 1]);

    await inAct(() => game.panel.showProgram(9));
    await click(buttonNamed(game.root, "+ dodaj grupę"));
    assert.deepEqual(game.acts.at(-1), ["editProgram", 1]);
  });
});

// The same, in the mode of Programy: text typed into an editor field and not
// yet committed must land in the program it was typed into when another is shown with focus left
// where it was; and showing the same program again, or time passing, must not take the focus.
test("uncommitted text lands in the program it was typed into when Programy shows another, and showing the same one keeps the field", async () => {
  await withPage(async (page) => {
    const game = await wiredPanel(
      page,
      createProgram(gameWithRule()).state,
      "programs",
    );
    const groupName = await openGroupName(game.root);
    await typeInFocused(groupName, "Wpisane w pierwszym");
    await inAct(() => game.panel.showProgram(1));
    await game.change(advanceMinutes(game.state, 3));
    assert.equal(page.document.activeElement, groupName);
    assert.equal(groupName.value, "Wpisane w pierwszym");

    await inAct(() => game.panel.showProgram(2));
    assert.equal(page.document.activeElement, page.document.body);
    assert.equal(
      game.state.programs[0].program.groups[0].name,
      "Wpisane w pierwszym",
    );
    assert.equal(game.state.programs[1].program.groups[0].name, "Program");
  });
});

/** Ala, who bought „Obchód”, and Ola, who did not, with the forest known and program 1 holding a rule. */
function patrolBought() {
  const withOla = createCharacter(gameWithRule(), "Ola").state;
  const practised = {
    ...withOla,
    team: {
      ...withOla.team,
      characters: withOla.team.characters.map((character) => ({
        ...character,
        skills: Object.fromEntries(
          Object.keys(SKILLS).map((id) => [id, { practice: 1000, ranks: {} }]),
        ),
      })),
    },
  };
  return buyBranch(practised, 1, "patrol").state;
}

/** Whether the cell „Obchód” of the action pick stands, and may be picked; null where it stands not. */
function patrolOffered(root) {
  const cell = [...root.querySelectorAll(".pick-cell")].find((each) =>
    each.textContent.startsWith("Obchód"),
  );
  return cell === undefined
    ? null
    : cell.getAttribute("aria-disabled") === null;
}

// D-196. Catches the editor of Programy turning to the
// archetype's offer when the map run is paused or has ended and waits for „Restart” or „Zakończ”,
// the offer following the player's choice of a saved program instead of the map run's character,
// and a branch of a teammate who is not in the map run opening an action.
test("the offer of Programy follows the character of the map run held by the game state, an ended one included, and goes with „Zakończ”", async () => {
  // decision: D-196 "Outside a map run the program editor offers the repertoire computed from the Understanding through the archetype’s predispositions; bought branches contribute no actions to that editor's offer"
  // decision: D-196 "During a map run, a manual map run that waits in a pause and one that has ended and waits for „Restart” or „Zakończ” included, both the copy editor and the saved-program editor of Programy use the repertoire of the map run's character, including its bought branches"
  await withPage(async (page) => {
    const game = await wiredPanel(page, patrolBought(), "programs");
    await click(rowOf(game.root, 1).querySelector(".rule-condition"));
    await click(
      game.root.querySelector('button[aria-label="Czynność: Eksploruj"]'),
    );
    assert.equal(patrolOffered(game.root), false, "outside a run");

    await game.change(send(game.state, SENT, REAL_MS));
    assert.equal(patrolOffered(game.root), true, "Ala's run");
    await game.change(setPaused(game.state, true));
    assert.equal(patrolOffered(game.root), true, "paused");
    await game.change({
      state: {
        ...game.state,
        run: { ...game.state.run, death: { minute: 3, cause: "cold" } },
      },
      events: [],
    });
    assert.equal(patrolOffered(game.root), true, "after a death");
    await game.change(end(game.state));
    assert.equal(patrolOffered(game.root), false, "after „Zakończ”");

    await game.change(
      send(game.state, { mapId: "forest", characterId: 2 }, REAL_MS),
    );
    assert.equal(patrolOffered(game.root), false, "Ola's run");
  });
});

// The panel leaves nothing behind. Catches a root left mounted in the page after `dispose()`.
test("dispose() takes the panel out of the page", async () => {
  await withPage(async (page) => {
    const game = await wiredPanel(page, gameWithRule(), "programs");
    assert.equal(page.root.contains(game.root), true);
    await inAct(() => game.panel.dispose());
    assert.equal(page.root.contains(game.root), false);
  });
});

// --- the open rule panel across a fold and a move of its rule ------------------------------------
// D-288, D-295. The panel stands under its
// row, or under the header of a folded group; where it stands changes with a fold, and that is no
// opening: the focus stays where the player put it and the panel keeps the field the player moved to.
// A move of the open rule across a group border is the case of tests/view/rule-editor.test.mjs, since
// the page leaves the panel closed there.

/** A game whose program 1 holds two groups, rule 1 in the first and rule 2 in the second. */
function gameWithTwoGroups() {
  const program = programFromRules(ALWAYS_EXPLORE);
  program.groups.push({
    id: 2,
    name: "Druga",
    condition: { kind: "always" },
    rules: [{ id: 2, ...ALWAYS_EXPLORE }],
  });
  program.nextGroupId = 3;
  program.nextRuleId = 3;
  const programmed = setProgram(newKnowingGame(), program).state;
  return createCharacter(programmed, "Ala").state;
}

const foldButton = (root, groupId, label) =>
  root.querySelector(`[data-group="${groupId}"] button[aria-label="${label}"]`);
const openField = (root) =>
  root
    .querySelector(".rule-panel .rule-panel-pick")
    ?.getAttribute("aria-label");

// Catches the panel mounted anew at its new place after a fold: the focus goes into its grid and the
// field goes back to the condition.
test("folding and unfolding the group of the open rule leaves the focus on the fold button and the panel on its field", async () => {
  // decision: D-350 "A rule panel open on a rule whose rule group is folded stands directly under the header of that group, where the row of the rule is not drawn"
  // decision: D-350 "Folding or unfolding that group, or every group at once, closes no panel and changes no field of it, and the panel stands under the row again when the group unfolds"
  await withPage(async (page) => {
    const game = await wiredPanel(page, gameWithRule(), "programs");
    await click(rowOf(game.root, 1).querySelector(".rule-condition"));
    await click(
      game.root.querySelector('button[aria-label="Czynność: Eksploruj"]'),
    );
    assert.equal(openField(game.root), "Czynność", "precondition: the action");
    const panel = game.root.querySelector(".rule-panel");

    const fold = foldButton(game.root, 1, "Zwiń grupę");
    await inAct(() => fold.focus());
    await click(fold);
    assert.equal(
      rowOf(game.root, 1),
      null,
      "precondition: the group is folded",
    );
    assert.equal(page.document.activeElement, fold, "the focus stays");
    assert.equal(fold.getAttribute("aria-label"), "Rozwiń grupę");
    assert.equal(
      game.root.querySelector(".rule-panel"),
      panel,
      "the same panel",
    );
    assert.ok(
      headerOf(game.root, 1).nextElementSibling.contains(panel),
      "under the header",
    );
    assert.equal(openField(game.root), "Czynność");

    // Enter on the focused button unfolds the group, as a browser makes a click of it.
    await key(page.document.activeElement, "Enter");
    await click(page.document.activeElement);
    assert.ok(rowOf(game.root, 1), "the group is unfolded");
    assert.equal(page.document.activeElement, fold, "the focus stays");
    assert.equal(game.root.querySelector(".rule-panel"), panel);
    assert.ok(rowOf(game.root, 1).nextElementSibling.contains(panel));
    assert.equal(openField(game.root), "Czynność");
    assert.deepEqual(game.acts, [], "the program was not touched");
  });
});

// Catches the same remount by „zwiń wszystkie” and „rozwiń wszystkie”.
test("„zwiń wszystkie” and „rozwiń wszystkie” leave the focus on the button pressed and the panel on its field", async () => {
  // decision: D-350 "Folding or unfolding that group, or every group at once, closes no panel and changes no field of it, and the panel stands under the row again when the group unfolds"
  await withPage(async (page) => {
    const game = await wiredPanel(page, gameWithTwoGroups(), "programs");
    await click(rowOf(game.root, 1).querySelector(".rule-condition"));
    await click(
      game.root.querySelector('button[aria-label="Czynność: Eksploruj"]'),
    );
    const panel = game.root.querySelector(".rule-panel");
    for (const [text, expected] of [
      ["zwiń wszystkie", "rozwiń wszystkie"],
      ["rozwiń wszystkie", "zwiń wszystkie"],
    ]) {
      const button = buttonNamed(game.root, text);
      await inAct(() => button.focus());
      await click(button);
      assert.equal(button.textContent, expected);
      assert.equal(page.document.activeElement, button, `after „${text}”`);
      assert.equal(game.root.querySelector(".rule-panel"), panel);
      assert.equal(openField(game.root), "Czynność");
    }
  });
});

// The player opens a rule: that is an opening, so the focus goes into the panel, and so again for
// another rule in another group.
test("opening a rule, and then a rule of another group, takes the focus into the panel each time", async () => {
  // decision: D-288 "A rule's row reads as a sentence and a rule panel changes it, opening in place on the list under the row of the rule or the header of the rule group it changes, on both screens, and taking no column of its own"
  // decision: D-306 "A click on a program rule's row opens the rule panel on the condition, and its fields follow as condition, number, target of the condition, action and target of the action, the number field and a field of a target standing only where the condition or the action has one; each pick changes the rule at once and moves to the next field, a pick of the value already picked included, and Enter or leaving the field confirms the number"
  // decision: D-306 "After the last field the panel stays open, and „✕”, Escape or opening another rule closes it"
  await withPage(async (page) => {
    const game = await wiredPanel(page, gameWithTwoGroups(), "programs");
    await click(rowOf(game.root, 1).querySelector(".rule-condition"));
    const panel = game.root.querySelector(".rule-panel");
    assert.ok(panel.contains(page.document.activeElement), "into the panel");
    await click(rowOf(game.root, 2).querySelector(".rule-condition"));
    assert.ok(
      rowOf(game.root, 2).nextElementSibling.contains(
        game.root.querySelector(".rule-panel"),
      ),
      "the panel stands under rule 2",
    );
    assert.ok(
      game.root
        .querySelector(".rule-panel")
        .contains(page.document.activeElement),
      "into the panel again",
    );
    assert.equal(openField(game.root), "Warunek", "on the condition");
  });
});

// D-306, To do 15. A rule moved across a group border by „↓” or by its handle keeps the panel open
// under its new row on the field it had. Catches the panel closed at the border, or put back on the
// condition with the focus taken into the grid.
test("a rule moved across a group border by „↓” and by its handle keeps the panel open under its new row, on the same field", async () => {
  // decision: D-306 "moving the rule to another group, by an arrow or by the handle, closes nothing, and the panel stays open on the same field and goes with the rule to its new group"
  await withPage(async (page) => {
    const game = await wiredPanel(page, gameWithTwoGroups(), "programs");
    await click(rowOf(game.root, 1).querySelector(".rule-condition"));
    await click(
      game.root.querySelector('button[aria-label="Czynność: Eksploruj"]'),
    );
    assert.equal(openField(game.root), "Czynność", "precondition: the action");

    // Rule 1 is the last of group 1; „↓” moves it to the start of group 2.
    await click(buttonNamed(rowOf(game.root, 1), "↓"));
    assert.deepEqual(game.acts.at(-1), ["editProgram", 1]);
    assert.deepEqual(
      game.state.programs[0].program.groups.map((group) =>
        group.rules.map((rule) => rule.id),
      ),
      [[], [1, 2]],
      "precondition: rule 1 is first in group 2",
    );
    assert.ok(
      rowOf(game.root, 1).nextElementSibling.contains(
        game.root.querySelector(".rule-panel"),
      ),
      "the panel stands under rule 1's new row",
    );
    assert.equal(openField(game.root), "Czynność", "the same field after „↓”");
    assert.ok(
      rowOf(game.root, 1).contains(page.document.activeElement),
      "the focus stays on the moved rule's arrow",
    );

    // By the handle: dragged back over group 1, which is empty now, the rule lands in it.
    await drag(rowOf(game.root, 1).querySelector(".drag-handle"), "dragstart");
    await drag(game.root.querySelector('[data-group="1"]'), "dragover");
    await drag(game.root.querySelector('[data-group="1"]'), "drop");
    assert.deepEqual(
      game.state.programs[0].program.groups.map((group) =>
        group.rules.map((rule) => rule.id),
      ),
      [[1], [2]],
      "precondition: rule 1 dropped into group 1",
    );
    assert.ok(
      rowOf(game.root, 1).nextElementSibling.contains(
        game.root.querySelector(".rule-panel"),
      ),
      "the panel stands under rule 1's row after the drag",
    );
    assert.equal(
      openField(game.root),
      "Czynność",
      "the same field after the drag",
    );
  });
});
