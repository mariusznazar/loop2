// The program panel in React (task edytor-programu, To do 1, 3, 6, 8, 11; D-36, D-166 to D-174, D-180,
// D-264, D-282, D-288, D-295, D-302) on jsdom through tests/view/page-document.mjs. It proves which
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
import { newKnowingGame } from "../sim/understanding-fixture.mjs";

const ALWAYS_EXPLORE = {
  condition: { kind: "always" },
  action: { kind: "explore" },
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
    newKnowingGame(),
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
// Task edytor-programu, To do 11; D-180, rows E14 and E36, question 11. Catches the section missing
// from Programy, standing under the rules or above the name, and standing on the screen of a map run.
test("Programy holds the trip plan between the program's name and its rules; the screen of a map run holds none", async () => {
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

// Row E14, D-180, question 11: the trip plan of the saved program shown, also while a map run waits,
// is an edit of that program. Catches an edit of the plan reaching the copy or another program, and a
// section carried from one program to the next with its folding.
test("an edit of the trip plan on Programy goes to the program shown, and another program's section stands folded", async () => {
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

// --- the rule panel beside the rows --------------------------------------------------------------
// To do 3 and 8, D-282, D-288. Catches the panel standing under the rows or nowhere, a header that
// opens no panel, the focus left outside the panel on opening, and a closed panel that takes no
// focus back to the row.
for (const mode of ["programs", "run"]) {
  test(`the rule panel opens from a row and from a header beside the rows (${mode}), takes the focus, and „✕” and Escape give it back to the row`, async () => {
    await withPage(async (page) => {
      const game = await wiredPanel(page, gameWithRule(), mode);
      assert.equal(classed(game.root, "rule-panel").length, 0, "closed");
      await click(rowOf(game.root, 1).querySelector(".rule-condition"));
      const layout = game.root.querySelector(".program-editor-layout");
      assert.ok(layout.classList.contains("with-panel"));
      assert.deepEqual(
        [...layout.children].map((child) => child.className),
        ["program-rules", "program-rule-panel"],
        "the panel stands beside the rows, at their right",
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

// To do 10, D-124: a rule added by „+ reguła” opens its panel. Catches the new rule standing with no
// panel, as the old editor left it.
test("„+ reguła” adds the rule and opens its panel on the condition", async () => {
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

// Row E31, D-302, To do 8. Catches the sentence missing from the panel of the copy, standing in the
// panel of a saved program or on Programy, and a word of the counter in it.
test("the rule panel of the copy says „Zmiana zeruje passę tego przejścia.”; that of a saved program and of Programy does not", async () => {
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
// Row E23, D-295. Catches a fold on one screen that the other does not show, a fold of the copy that
// folds the saved program, a memory that outlives its page, and a fold that hides a group of another
// program.
test("a group folded on one screen stays folded on the other for the same program, the copy's folding is its own, and a new memory forgets", async () => {
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

// --- the panel's states, carried over from the hand-made model -----------------------------------

// Task programy-gracza, To do 2–3; D-166, D-167. Catches a list missing its program or the last
// program left deletable.
test("a new game's panel lists „Program”, shows it, and „Usuń” is disabled", async () => {
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

// To do 3–4; spec decision 7, „Nowy program” shows the new program. Catches the panel staying on
// the old program and an editor edit landing in a program other than the one shown.
test("„Nowy program” shows „Program 2”, makes „Usuń” active, and the editor edits program 2", async () => {
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

// To do 4; D-169 and spec decision 7, the name field. Catches a missing or wrong message, a
// program's own name in another letter case refused, and a refused name saved.
test("„Zmień nazwę” fills the field with the name, warns of an empty or taken name, and saves a trimmed one", async () => {
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

// To do 4; spec decision 7, how the name field leaves without saving (left to the maker: the same
// action again, or another program shown). Catches a field that saves or stays open.
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

// To do 3; D-167 and spec decision 7, „Usuń” of the shown program shows the first of the list.
// Catches the panel left on a deleted program and the last program deleted.
test("„Usuń” of the shown program shows the first program of the list, and is disabled with one left", async () => {
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

// To do 2, 7 and 9; D-166, D-93 and spec decisions 6–7. Catches the copy missing from the top of
// the list, rename or delete offered for the copy, counts beside a saved program during a map run,
// a pick changing the game state, and an edit reaching the wrong program.
test("during a map run the copy stands first and is shown with counts; a saved program picked shows none and takes its own edits", async () => {
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
    newKnowingGame(),
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

// Task kronika-z-filtrami, To do 5; spec D4. The hint of a move, which rule or group the player moved,
// travels from the list through the panel's edit to `editCopy`, since the copies before and after a
// swap cannot tell it. Catches a panel that drops the hint on the way, one that names a neighbour,
// a hint attached to an edit that moves nothing, and one that reaches the edit of a saved program.
test("„↓” on a rule of the copy and the drop of a rule or a group reach editCopy with the hint of the move", async () => {
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

// Task zapis-stanu-na-serwerze, To do 6; D-212, a loaded map run's copy open to editing. Catches a
// game built on a state with a map run showing a saved program instead of the copy.
test("a panel whose first state holds a map run shows the copy, as after a load", async () => {
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

// To do 10; D-93, D-173 and spec decision 7, which program the panel shows. Catches „Restart”
// leaving a saved program shown, the copy lost after a death, and „Zakończ” showing another
// program, dropping the counts or putting them beside another program.
test("„Restart” and a death show the copy with counts; „Zakończ” shows the copy's program with them", async () => {
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

// To do 10 and 3; D-168 and spec decision 7. Catches „Zakończ” after the copy's program was
// deleted showing a program that is gone, or a count beside the first program.
test("„Zakończ” after the copy's program was deleted shows the first program of the list, without counts", async () => {
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

// D-36 and spec decision 7: the controls are updated in place. Catches time passing rewriting the
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
    setProgram(newKnowingGame(), program).state,
    "Ala",
  ).state;
  return send(state, SENT, REAL_MS).state;
}

// Task edytor-programu, Acceptance criteria 1; D-03: „the screen of a map run changes up to five times
// a second beside fields in which the player types”. Catches a number typed into the panel of the
// copy that the redraws of the screen rewrite or take the focus from.
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

// Task edytor-programu, Acceptance criteria 3, found in the browser: on Enter the panel moves the focus
// to a cell of the next pick during the key's own event, and a browser then delivers the same Enter to
// that cell and picks it, so a field the player must see is skipped. jsdom does not deliver that
// second press, so the case holds the cause: the keydown of Enter is consumed. Catches the number's
// Enter left to the browser.
test("Enter in the number field is consumed, so the press cannot reach the cell the focus moves to", async () => {
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

/** Gives the panel of `game` a host for its rule panel on the page, as a screen does; `told` keeps what it is told. */
async function withHost(page, game) {
  const host = page.document.createElement("div");
  page.root.append(host);
  const told = [];
  await inAct(() => game.panel.placeRulePanel(host, (open) => told.push(open)));
  return { host, told };
}

// Task edytor-programu, To do 3, question 3, slice 13. Catches the rule panel drawn beside the rows
// when the screen gave it a host, a screen not told that the panel opened or closed, and a panel
// left in the host after it closed.
test("a rule panel given a host stands in it and not beside the rows, and the screen is told when it opens and closes", async () => {
  await withPage(async (page) => {
    const game = await wiredPanel(page, runWithNumber());
    const { host, told } = await withHost(page, game);
    assert.deepEqual(told, [false], "nothing is open at the start");
    await click(rowOf(game.root, 1).querySelector(".rule-condition"));
    assert.deepEqual(told, [false, true]);
    assert.ok(
      host.querySelector(".rule-panel"),
      "the panel stands in the host",
    );
    assert.equal(
      game.root.querySelectorAll(".rule-panel").length,
      0,
      "none beside the rows",
    );
    assert.equal(game.root.querySelectorAll(".with-panel").length, 0);
    await click(buttonNamed(host, "✕"));
    assert.deepEqual(told, [false, true, false]);
    assert.equal(host.querySelector(".rule-panel"), null, "the host is empty");
    assert.equal(
      page.document.activeElement,
      rowOf(game.root, 1),
      "the focus goes back to the row",
    );
    await click(rowOf(game.root, 1).querySelector(".rule-condition"));
    await inAct(() => game.panel.dispose());
    assert.equal(told.at(-1), false, "a panel taken out says nothing is open");
  });
});

// Task edytor-programu, Acceptance criteria 1, slice 13: the number typed into the panel in the
// host, which stands outside the panel's own element, keeps its text and focus at 16×.
test("a number typed into the rule panel in its host keeps its text and the focus over three seconds of redraws at 16×", async () => {
  await withPage(async (page) => {
    const game = await wiredPanel(page, runWithNumber());
    const { host } = await withHost(page, game);
    await game.change(setPace(game.state, 16));
    await click(rowOf(game.root, 1).querySelector(".rule-condition"));
    const number = host.querySelector('input[aria-label="Liczba"]');
    assert.ok(number, "the panel in the host holds the number");
    await inAct(() => number.focus());
    await typeInto(number, "12");
    const minutes = game.state.run.minute;
    for (let frame = 0; frame < 15; frame += 1)
      await game.change(passRealTime(game.state, 200));
    assert.ok(game.state.run.minute > minutes, "the game went on");
    assert.equal(host.querySelector('input[aria-label="Liczba"]'), number);
    assert.equal(number.value, "12");
    assert.equal(page.document.activeElement, number);
    await key(number, "Enter");
    assert.deepEqual(game.state.run.copy.program.groups[0].rules[0].condition, {
      kind: "itemBelow",
      item: "stick",
      value: 12,
    });
  });
});

// --- „Dodaj regułę z tym”: the panel adds the discovered rule --------------------------------------
// Task ekran-przejscia, To do 7, questions 5 and 10; D-313, D-124, D-131, D-166, D-306. Which rule a
// discovery writes is the case of tests/view/discovery-rule.test.mjs; these cases hold what the panel
// does with it: the act it hands the game, the program it shows and where the rule panel opens.

/**
 * A new game whose first map run reached its first chill: the game pauses on the discovery
 * „Eksploruj”, „Wędruj” and „Temperatura poniżej”, and the copy's group „Program” holds the rule the
 * game wrote, „Zawsze → Eksploruj”.
 */
function firstChill() {
  const sent = send(createCharacter(newGame(), "Ala").state, SENT, REAL_MS);
  return advanceMinutes(sent.state, 100).state;
}

/** The rules of a group, without their numbers. */
const rulesOfGroup = (group) =>
  group.rules.map(({ condition, action }) => ({ condition, action }));

// Catches the call handing the game no edit or an edit of a saved program, the rule panel left closed,
// opened beside the rows though the screen gave it a host, opened on the condition after the button
// filled the action, the screen not told it opened, the focus left outside the field, and the streak
// left as it stood.
test("at the first chill „Dodaj regułę z tym” adds „Zawsze → Eksploruj” at the end of the copy's group „Program”, opens it in the host on the action with the focus there, and the streak goes to zero", async () => {
  await withPage(async (page) => {
    const chilled = firstChill();
    assert.deepEqual(
      chilled.discovery?.actions,
      ["explore", "wander"],
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
    const { host, told } = await withHost(page, game);
    await inAct(() => game.panel.addDiscoveredRule());

    assert.deepEqual(game.acts, [["editCopy"]]);
    const group = game.state.run.copy.program.groups[0];
    assert.equal(group.name, "Program");
    assert.deepEqual(rulesOfGroup(group), [ALWAYS_EXPLORE, ALWAYS_EXPLORE]);
    assert.equal(game.state.run.streak, 0);
    assert.deepEqual(
      told,
      [false, true],
      "the screen is told the panel opened",
    );
    assert.equal(
      host.querySelector(".rule-panel-heading")?.textContent,
      "Reguła 1.2",
    );
    assert.equal(classed(game.root, "rule-panel").length, 0, "none beside");
    assert.equal(
      rowOf(game.root, group.rules[1].id).getAttribute("aria-current"),
      "true",
    );
    const focused = page.document.activeElement;
    assert.ok(host.contains(focused), "the focus is in the panel in the host");
    assert.equal(
      focused.closest('[role="group"]')?.getAttribute("aria-label"),
      "Czynność",
      "the focus is in the action's pick",
    );
    assert.equal(focused.textContent, "Eksploruj");
  });
});

// D-166, D-313: the rule goes to the copy, which the list „Program:” then shows; D-306: „✕” closes
// the panel the call opened, as any. Catches a saved program left shown, or edited, when the call adds
// the rule, and a request to open that opens again at every draw.
test("with a saved program shown on the list „Program:”, „Dodaj regułę z tym” shows the copy and opens the new rule there, once", async () => {
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
    assert.deepEqual(rulesOfGroup(group), [ALWAYS_EXPLORE, ALWAYS_EXPLORE]);
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
    const { host, told } = await withHost(page, game);
    await pick(game.root, "1");
    const before = game.state;
    await inAct(() => game.panel.addDiscoveredRule());
    assert.deepEqual(game.acts, []);
    assert.equal(game.state, before);
    assert.equal(programList(game.root).value, "1", "the program shown stays");
    assert.equal(host.querySelector(".rule-panel"), null);
    assert.equal(classed(game.root, "rule-panel").length, 0);
    assert.deepEqual(told, [false]);
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

// Task programy-gracza, To do 8; spec decision 7, „When the copy is shown”. Catches the line
// missing or standing without a change, and the three buttons active when the copy equals its
// program or inactive when it differs.
test("the copy shows its heading; an edit of the copy brings „Niezapisane zmiany w kopii.” and activates the three buttons", async () => {
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

// Slice 6's observed problem (the report of that slice): text typed into an editor field and not
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

// To do 8; spec decision 7. Catches the save writing something other than the copy into the
// program, the line staying after the save, and the buttons staying active.
test("„Zapisz w programie” writes the copy into its program, and the line and the activity go", async () => {
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

// To do 9; D-172 and spec decision 7. Catches the line missing when the program changed and the
// copy has no changes, the line staying after the save, and a wrong program name in it.
test("the line of a changed program stands with and without unsaved changes, and goes after „Zapisz w programie”", async () => {
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
    const lacks =
      "Program Las ma zmiany, których nie ma w tej kopii — zapis w programie je zastąpi.";
    assert.deepEqual(copyTexts(game.root), ["Kopia: Las", lacks]);
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

// To do 8; D-171 and spec decision 7. Catches an empty or wrong first value of the field, a
// refused name saved, and the panel leaving the copy or keeping the old program number.
test("„Zapisz jako nowy program” offers the first free name, refuses a taken one, and the copy then belongs to the new program", async () => {
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

// To do 8; spec decision 7. Catches the suggestion ignoring the names taken, the field staying
// open after the copy lost its changes, and the same action not leaving the field.
test("„Zapisz jako nowy program” suggests „Program 3” beside „Program 2”, and its field leaves at the same action again", async () => {
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

// To do 8; spec decision 7. Catches the discard leaving the copy's edit, the line staying, and
// the discard not going to the simulation.
test("„Porzuć zmiany” restores the copy's program and the line goes", async () => {
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

// To do 3 and 8; D-168 and spec decision 7. Catches the heading losing the name of a deleted
// program, „Zapisz w programie” and „Porzuć zmiany” offered for a program that is gone, and
// „Zapisz jako nowy program” withdrawn.
test("a copy whose program was deleted keeps its heading, offers only „Zapisz jako nowy program”, and it is active", async () => {
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

// To do 12; D-174 and spec decision 7. Catches the button missing beside another program, shown
// beside the copy's own program or the copy, and a click that does not switch and show the copy.
test("„Przełącz postać na ten program” stands beside another saved program only, and a click switches and shows the copy", async () => {
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

// To do 12; D-174 and spec decision 7. Catches the button standing beside the new program after
// „Zapisz jako nowy program”, and not beside the program the copy was taken from.
test("after „Zapisz jako nowy program” the switch button stands beside the first program and not beside the new one", async () => {
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

// To do 10 and 12; spec decision 7. Catches the switch button standing on the screen after a death
// and the copy's buttons not working there.
test("on the screen after a death the copy's buttons work and there is no switch button", async () => {
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

// To do 10; spec decision 7. Catches the copy's section staying after „Zakończ”, when a saved
// program is shown.
test("after „Zakończ” with unsaved changes the copy's section is gone", async () => {
  await withPage(async (page) => {
    const game = await editedCopyGame(page);
    await game.change(end(game.state));
    assert.deepEqual(copyTexts(game.root), []);
    assert.equal(copyButton(game.root, "Zapisz w programie"), undefined);
  });
});

// --- the panel on Programy -----------------------------------------------------------------------
// Task ekrany-i-menu, To do 3 and 5, questions 5, 15 and 17, settlement row 11; D-166, D-196; task
// edytor-programu, row E5. The list of programs on the left is the list of the screen
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

// Slice 6's observed problem again, in the mode of Programy: text typed into an editor field and not
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

// Settlement row 11, questions 15 and 17; D-196. Catches the editor of Programy turning to the
// archetype's offer when the map run is paused or has ended and waits for „Restart” or „Zakończ”,
// the offer following the player's choice of a saved program instead of the map run's character,
// and a branch of a teammate who is not in the map run opening an action.
test("the offer of Programy follows the character of the map run held by the game state, an ended one included, and goes with „Zakończ”", async () => {
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

// D-36: the panel leaves nothing behind. Catches a root left mounted in the page after `dispose()`.
test("dispose() takes the panel out of the page", async () => {
  await withPage(async (page) => {
    const game = await wiredPanel(page, gameWithRule(), "programs");
    assert.equal(page.root.contains(game.root), true);
    await inAct(() => game.panel.dispose());
    assert.equal(page.root.contains(game.root), false);
  });
});
