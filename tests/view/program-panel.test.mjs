// The program panel's states (spec decision 7; task programy-gracza, To do 2–4 and 10), on a
// hand-made document model. Real events, focus and drawing are checked in the browser (D-88).
import assert from "node:assert/strict";
import { test } from "node:test";
import {
  advanceMinutes,
  createCharacter,
  end,
  newGame,
  restart,
  send,
  setProgram,
} from "../../dist/public/sim/game.js";
import {
  createProgram,
  deleteProgram,
  discardCopyChanges,
  editProgram,
  renameProgram,
  saveCopyAsNewProgram,
  saveCopyIntoProgram,
  switchProgram,
} from "../../dist/public/sim/programs.js";
import { createProgramPanel } from "../../dist/public/view/program-panel.js";
import { programFromRules } from "../sim/program-fixture.mjs";
import { newKnowingGame } from "../sim/understanding-fixture.mjs";

/** An element of the model: only what the panel, the editor and the shared controls use. */
function modelElement(document, tag) {
  return {
    tag,
    children: [],
    value: "",
    textContent: "",
    hidden: false,
    disabled: false,
    className: "",
    classes: new Set(),
    get classList() {
      const classes = this.classes;
      return {
        add: (name) => classes.add(name),
        toggle: (name, on) => (on ? classes.add(name) : classes.delete(name)),
        contains: (name) => classes.has(name),
      };
    },
    attributes: {},
    listeners: {},
    setAttribute(name, value) {
      this.attributes[name] = value;
    },
    removeAttribute(name) {
      delete this.attributes[name];
    },
    addEventListener(type, listener) {
      (this.listeners[type] ??= []).push(listener);
    },
    focus() {
      if (document.activeElement !== this) this.valueAtFocus = this.value;
      document.activeElement = this;
    },
    // As in the browser, a field that loses focus with text changed since it gained focus fires
    // `change`; a field removed from the page while focused loses focus the same way.
    blur() {
      if (document.activeElement !== this) return;
      document.activeElement = null;
      if (this.value !== this.valueAtFocus) fire(this, "change");
    },
    contains(other) {
      return (
        this === other || this.children.some((child) => child.contains?.(other))
      );
    },
    append(...items) {
      this.children.push(...items);
    },
    replaceChildren(...items) {
      const removed = this.children.filter((child) => !items.includes(child));
      const active = document.activeElement;
      this.children = items;
      if (active && removed.some((child) => child.contains?.(active)))
        active.blur();
    },
    get options() {
      return this.children;
    },
  };
}

/** Runs `body` with the model installed as the page's document, restoring the globals after. */
function withPanelDocument(body) {
  const savedDocument = globalThis.document;
  const savedOption = globalThis.Option;
  const document = {
    activeElement: null,
    createElement(tag) {
      return modelElement(document, tag);
    },
  };
  globalThis.document = document;
  globalThis.Option = class {
    constructor(text, value) {
      this.textContent = text;
      this.value = value;
      this.children = [];
    }
  };
  try {
    body(document);
  } finally {
    if (savedDocument === undefined) delete globalThis.document;
    else globalThis.document = savedDocument;
    if (savedOption === undefined) delete globalThis.Option;
    else globalThis.Option = savedOption;
  }
}

function descendants(element) {
  return [element, ...element.children.flatMap(descendants)];
}

const buttonNamed = (panel, text) =>
  descendants(panel.element).find(
    (element) => element.tag === "button" && element.textContent === text,
  );

const programList = (panel) =>
  descendants(panel.element).find(
    (element) =>
      element.tag === "select" &&
      element.attributes["aria-label"] === "Program:",
  );

/** The positions of a select list as the player reads them. */
const positions = (select) =>
  select.children.map((option) => option.textContent);

const ALWAYS_EXPLORE = {
  condition: { kind: "always" },
  action: { kind: "explore" },
};
// The first character a new game creates takes the id 1; the forest is the first map sent to.
const SENT = { mapId: "forest", characterId: 1 };
const REAL_MS = 1760000000000;

/**
 * The panel wired as the game view wires it: each control a real simulation call whose result
 * replaces the state and updates the panel with its events. `acts` records the calls.
 */
function wiredPanel(start = newGame()) {
  const acts = [];
  let state = start;
  let panel = null;
  const apply = (result) => {
    state = result.state;
    panel.update(state, result.events);
  };
  panel = createProgramPanel({
    editCopy(program) {
      acts.push(["editCopy"]);
      apply(setProgram(state, program));
    },
    editProgram(programId, program) {
      acts.push(["editProgram", programId]);
      apply(editProgram(state, programId, program));
    },
    createProgram() {
      acts.push(["createProgram"]);
      apply(createProgram(state));
    },
    renameProgram(programId, name) {
      acts.push(["renameProgram", programId, name]);
      apply(renameProgram(state, programId, name));
    },
    deleteProgram(programId) {
      acts.push(["deleteProgram", programId]);
      apply(deleteProgram(state, programId));
    },
    saveCopy() {
      acts.push(["saveCopy"]);
      apply(saveCopyIntoProgram(state));
    },
    saveCopyAsNew(name) {
      acts.push(["saveCopyAsNew", name]);
      apply(saveCopyAsNewProgram(state, name));
    },
    discardCopy() {
      acts.push(["discardCopy"]);
      apply(discardCopyChanges(state));
    },
    switchProgram(programId) {
      acts.push(["switchProgram", programId]);
      apply(switchProgram(state, programId));
    },
  });
  panel.update(state, []);
  return {
    panel,
    acts,
    apply,
    get state() {
      return state;
    },
  };
}

/** A game whose program 1 holds „Zawsze → Eksploruj”, with the character Ala in the team. */
function gameWithRule() {
  const programmed = setProgram(
    newKnowingGame(),
    programFromRules(ALWAYS_EXPLORE),
  ).state;
  return createCharacter(programmed, "Ala").state;
}

const fire = (element, type) =>
  (element.listeners[type] ?? []).forEach((listener) => listener());
const click = (button) => fire(button, "click");

function pick(panel, value) {
  const list = programList(panel);
  list.value = value;
  fire(list, "change");
}

const nameInput = (panel) =>
  descendants(panel.element).find(
    (element) =>
      element.tag === "input" &&
      element.attributes["aria-label"] === "Nazwa programu",
  );

/** The name field's row is open: the row holding the field is not hidden. */
const nameOpen = (panel) =>
  !descendants(panel.element).find(
    (element) => element.className === "program-name",
  ).hidden;

/** The message under the name field, or null while it shows none. */
function nameMessage(panel) {
  const field = descendants(panel.element).find(
    (element) =>
      element.className === "input-field" &&
      element.children.includes(nameInput(panel)),
  );
  const message = field.children.find(
    (element) => element.className === "input-field-message",
  );
  return message.hidden ? null : message.textContent;
}

function typeName(panel, text) {
  const input = nameInput(panel);
  input.value = text;
  fire(input, "input");
}

/** The count texts beside the editor's rules, null for a count hidden. */
const counts = (panel) =>
  descendants(panel.element)
    .filter((element) => element.className === "rule-count")
    .map((count) => (count.hidden ? null : count.textContent));

const groupCount = (program) => program.groups.length;

// Task programy-gracza, To do 2–3; D-154, D-155. Catches a list missing its program or the last
// program left deletable.
test("a new game's panel lists „Program”, shows it, and „Usuń” is disabled", () => {
  withPanelDocument(() => {
    const { panel } = wiredPanel();
    const list = programList(panel);
    assert.ok(list, "the panel holds the select list „Program:”");
    assert.deepEqual(positions(list), ["Program"]);
    assert.equal(list.value, "1");
    assert.equal(buttonNamed(panel, "Usuń").disabled, true);
    assert.equal(buttonNamed(panel, "Usuń").hidden, false);
    assert.equal(buttonNamed(panel, "Zmień nazwę").hidden, false);
    assert.equal(buttonNamed(panel, "Nowy program").hidden, false);
    assert.equal(nameOpen(panel), false);
  });
});

// To do 3–4; spec decision 7, „Nowy program” shows the new program. Catches the panel staying on
// the old program and an editor edit landing in a program other than the one shown.
test("„Nowy program” shows „Program 2”, makes „Usuń” active, and the editor edits program 2", () => {
  withPanelDocument(() => {
    const game = wiredPanel();
    click(buttonNamed(game.panel, "Nowy program"));
    const list = programList(game.panel);
    assert.deepEqual(positions(list), ["Program", "Program 2"]);
    assert.equal(list.value, "2");
    assert.equal(buttonNamed(game.panel, "Usuń").disabled, false);

    click(buttonNamed(game.panel, "Dodaj grupę"));
    assert.deepEqual(game.acts.at(-1), ["editProgram", 2]);
    assert.equal(groupCount(game.state.programs[1].program), 2);
    assert.equal(groupCount(game.state.programs[0].program), 1);
  });
});

// To do 4; D-157 and spec decision 7, the name field. Catches a missing or wrong message, a
// program's own name in another letter case refused, and a refused name saved.
test("„Zmień nazwę” fills the field with the name, warns of an empty or taken name, and saves a trimmed one", () => {
  withPanelDocument((document) => {
    const game = wiredPanel();
    click(buttonNamed(game.panel, "Nowy program"));
    click(buttonNamed(game.panel, "Zmień nazwę"));
    assert.equal(nameOpen(game.panel), true);
    assert.equal(nameInput(game.panel).value, "Program 2");
    assert.equal(document.activeElement, nameInput(game.panel));
    assert.equal(nameMessage(game.panel), null);

    typeName(game.panel, "   ");
    assert.equal(nameMessage(game.panel), "Wpisz nazwę programu.");
    click(buttonNamed(game.panel, "Zapisz"));
    assert.equal(nameOpen(game.panel), true);

    typeName(game.panel, "program");
    assert.equal(nameMessage(game.panel), "Program o tej nazwie już istnieje.");
    click(buttonNamed(game.panel, "Zapisz"));
    assert.equal(nameOpen(game.panel), true);
    assert.ok(!game.acts.some(([act]) => act === "renameProgram"));

    typeName(game.panel, "PROGRAM 2");
    assert.equal(nameMessage(game.panel), null);

    typeName(game.panel, " Las nocą ");
    click(buttonNamed(game.panel, "Zapisz"));
    assert.equal(nameOpen(game.panel), false);
    const list = programList(game.panel);
    assert.deepEqual(positions(list), ["Program", "Las nocą"]);
    assert.equal(list.value, "2");
  });
});

// To do 4; spec decision 7, how the name field leaves without saving (left to the maker: the same
// action again, or another program shown). Catches a field that saves or stays open.
test("the name field leaves without saving at „Zmień nazwę” again and at another program shown", () => {
  withPanelDocument(() => {
    const game = wiredPanel();
    click(buttonNamed(game.panel, "Nowy program"));
    click(buttonNamed(game.panel, "Zmień nazwę"));
    typeName(game.panel, "Las");
    click(buttonNamed(game.panel, "Zmień nazwę"));
    assert.equal(nameOpen(game.panel), false);

    click(buttonNamed(game.panel, "Zmień nazwę"));
    assert.equal(nameInput(game.panel).value, "Program 2");
    typeName(game.panel, "Las");
    pick(game.panel, "1");
    assert.equal(nameOpen(game.panel), false);
    assert.ok(!game.acts.some(([act]) => act === "renameProgram"));
    assert.deepEqual(
      game.state.programs.map((saved) => saved.name),
      ["Program", "Program 2"],
    );
  });
});

// To do 3; D-155 and spec decision 7, „Usuń” of the shown program shows the first of the list.
// Catches the panel left on a deleted program and the last program deleted.
test("„Usuń” of the shown program shows the first program of the list, and is disabled with one left", () => {
  withPanelDocument(() => {
    const game = wiredPanel();
    click(buttonNamed(game.panel, "Nowy program"));
    click(buttonNamed(game.panel, "Nowy program"));
    pick(game.panel, "1");
    click(buttonNamed(game.panel, "Usuń"));
    const list = programList(game.panel);
    assert.deepEqual(positions(list), ["Program 2", "Program 3"]);
    assert.equal(list.value, "2");

    click(buttonNamed(game.panel, "Usuń"));
    assert.deepEqual(positions(list), ["Program 3"]);
    assert.equal(list.value, "3");
    assert.equal(buttonNamed(game.panel, "Usuń").disabled, true);
    click(buttonNamed(game.panel, "Usuń"));
    assert.equal(game.state.programs.length, 1);
    assert.equal(
      game.acts.filter(([act]) => act === "deleteProgram").length,
      2,
    );
  });
});

// To do 2, 7 and 9; D-154, D-93 and spec decisions 6–7. Catches the copy missing from the top of
// the list, rename or delete offered for the copy, counts beside a saved program during a map run,
// a pick changing the game state, and an edit reaching the wrong program.
test("during a map run the copy stands first and is shown with counts; a saved program picked shows none and takes its own edits", () => {
  withPanelDocument(() => {
    const game = wiredPanel(gameWithRule());
    game.apply(send(game.state, SENT, REAL_MS));
    const list = programList(game.panel);
    assert.deepEqual(positions(list), ["Kopia w przejściu", "Program"]);
    assert.equal(list.value, "copy");
    assert.equal(buttonNamed(game.panel, "Zmień nazwę").hidden, true);
    assert.equal(buttonNamed(game.panel, "Usuń").hidden, true);
    assert.equal(buttonNamed(game.panel, "Nowy program").hidden, false);
    // The one rule fired once as the map run started.
    assert.deepEqual(counts(game.panel), ["1×"]);

    const before = game.state;
    pick(game.panel, "1");
    assert.equal(game.state, before, "picking changes no game state");
    assert.equal(buttonNamed(game.panel, "Zmień nazwę").hidden, false);
    assert.equal(buttonNamed(game.panel, "Usuń").hidden, false);
    assert.deepEqual(counts(game.panel), [null]);

    const copy = game.state.run.copy.program;
    click(buttonNamed(game.panel, "Dodaj grupę"));
    assert.deepEqual(game.acts.at(-1), ["editProgram", 1]);
    assert.equal(game.state.run.copy.program, copy);
    assert.equal(groupCount(game.state.programs[0].program), 2);

    pick(game.panel, "copy");
    click(buttonNamed(game.panel, "Dodaj grupę"));
    assert.deepEqual(game.acts.at(-1), ["editCopy"]);
    assert.equal(groupCount(game.state.run.copy.program), 2);
  });
});

// To do 10; D-93, D-161 and spec decision 7, which program the panel shows. Catches „Restart”
// leaving a saved program shown, the copy lost after a death, and „Zakończ” showing another
// program, dropping the counts or putting them beside another program.
test("„Restart” and a death show the copy with counts; „Zakończ” shows the copy's program with them", () => {
  withPanelDocument(() => {
    const game = wiredPanel(gameWithRule());
    game.apply(send(game.state, SENT, REAL_MS));
    click(buttonNamed(game.panel, "Nowy program"));
    assert.equal(programList(game.panel).value, "2");
    // Program 2 gets „Zawsze → Eksploruj” under the same rule identity as the copy's rule.
    click(buttonNamed(game.panel, "Dodaj regułę"));
    assert.deepEqual(game.acts.at(-1), ["editProgram", 2]);
    game.apply(restart(game.state));
    assert.equal(programList(game.panel).value, "copy");

    // A death by hand: the screen after it, not how the character dies, is under test.
    const died = {
      ...game.state,
      run: { ...game.state.run, death: { minute: 3, cause: "cold" } },
    };
    game.apply({ state: died, events: [] });
    assert.equal(programList(game.panel).value, "copy");
    assert.equal(positions(programList(game.panel))[0], "Kopia w przejściu");
    assert.deepEqual(counts(game.panel), ["1×"]);

    pick(game.panel, "2");
    game.apply(end(game.state));
    const list = programList(game.panel);
    assert.deepEqual(positions(list), ["Program", "Program 2"]);
    assert.equal(list.value, "1");
    assert.deepEqual(counts(game.panel), ["1×"]);
    // The counts stand beside the copy's program only.
    pick(game.panel, "2");
    assert.deepEqual(counts(game.panel), [null]);
  });
});

// To do 10 and 3; D-156 and spec decision 7. Catches „Zakończ” after the copy's program was
// deleted showing a program that is gone, or a count beside the first program.
test("„Zakończ” after the copy's program was deleted shows the first program of the list, without counts", () => {
  withPanelDocument(() => {
    // Program 2 holds a rule of the same identity and content as the copy's, so a count kept
    // after the copy's program is gone would show beside it.
    const start = editProgram(
      createProgram(gameWithRule()).state,
      2,
      programFromRules(ALWAYS_EXPLORE),
    ).state;
    const game = wiredPanel(start);
    game.apply(send(game.state, { ...SENT, programId: 1 }, REAL_MS));
    pick(game.panel, "1");
    click(buttonNamed(game.panel, "Usuń"));
    assert.equal(programList(game.panel).value, "2");
    assert.deepEqual(positions(programList(game.panel)), [
      "Kopia w przejściu",
      "Program 2",
    ]);
    game.apply(end(game.state));
    assert.deepEqual(positions(programList(game.panel)), ["Program 2"]);
    assert.equal(programList(game.panel).value, "2");
    assert.deepEqual(counts(game.panel), [null]);
  });
});

// D-36 and spec decision 7: the controls are updated in place. Catches time passing rewriting the
// name field or an editor field the player is typing into, or moving focus.
test("time passing keeps what is typed in the name field and in an editor field, and the focus", () => {
  withPanelDocument((document) => {
    const game = wiredPanel(gameWithRule());
    game.apply(send(game.state, SENT, REAL_MS));
    const groupName = descendants(game.panel.element).find(
      (element) =>
        element.tag === "input" &&
        element.attributes["aria-label"] === "Nazwa grupy",
    );
    groupName.value = "Niezatwierdzona";
    groupName.focus();
    game.apply(advanceMinutes(game.state, 3));
    assert.equal(groupName.value, "Niezatwierdzona");
    assert.equal(document.activeElement, groupName);

    pick(game.panel, "1");
    click(buttonNamed(game.panel, "Zmień nazwę"));
    typeName(game.panel, "Las");
    game.apply(advanceMinutes(game.state, 3));
    assert.equal(nameOpen(game.panel), true);
    assert.equal(nameInput(game.panel).value, "Las");
    assert.equal(document.activeElement, nameInput(game.panel));
  });
});

/** The elements of `element` the player sees: the walk skips what a hidden element holds. */
function seen(element) {
  return element.hidden ? [] : [element, ...element.children.flatMap(seen)];
}

/** The button with this text if the player sees it, else undefined. */
const visibleButton = (panel, text) =>
  seen(panel.element).find(
    (element) => element.tag === "button" && element.textContent === text,
  );

/** The texts of the panel's lines and heading of the copy that the player sees. */
const copyTexts = (panel) =>
  seen(panel.element)
    .filter(
      (element) =>
        element.className === "copy-line" ||
        element.className === "copy-heading",
    )
    .map((element) => element.textContent);

const SAVE_BUTTONS = [
  "Zapisz w programie",
  "Zapisz jako nowy program",
  "Porzuć zmiany",
];

// Task programy-gracza, To do 8; spec decision 7, „When the copy is shown”. Catches the line
// missing or standing without a change, and the three buttons active when the copy equals its
// program or inactive when it differs.
test("the copy shows its heading; an edit of the copy brings „Niezapisane zmiany w kopii.” and activates the three buttons", () => {
  withPanelDocument(() => {
    const game = wiredPanel(gameWithRule());
    game.apply(send(game.state, SENT, REAL_MS));
    assert.deepEqual(copyTexts(game.panel), ["Kopia: Program"]);
    for (const text of SAVE_BUTTONS)
      assert.equal(visibleButton(game.panel, text).disabled, true, text);

    click(buttonNamed(game.panel, "Dodaj grupę"));
    assert.deepEqual(copyTexts(game.panel), [
      "Kopia: Program",
      "Niezapisane zmiany w kopii.",
    ]);
    for (const text of SAVE_BUTTONS)
      assert.equal(visibleButton(game.panel, text).disabled, false, text);
  });
});

// Slice 6's observed problem (the report of that slice): text typed into an editor field and not
// yet committed, while the panel shows another program without focus moving, must land in the
// program it was typed into. Catches the removed focused field committing into the newly shown
// program.
test("uncommitted text in the copy's editor lands in the copy when the program shown changes without moving focus", () => {
  withPanelDocument((document) => {
    const game = wiredPanel(gameWithRule());
    click(buttonNamed(game.panel, "Nowy program"));
    game.apply(send(game.state, SENT, REAL_MS));
    // The copy holds a rule that program 2 lacks, so showing program 2 rebuilds the editor's groups.
    const groupName = descendants(game.panel.element).find(
      (element) =>
        element.tag === "input" &&
        element.attributes["aria-label"] === "Nazwa grupy",
    );
    groupName.focus();
    groupName.value = "Wpisane w kopii";
    pick(game.panel, "2");
    assert.equal(document.activeElement, null);
    assert.equal(game.state.run.copy.program.groups[0].name, "Wpisane w kopii");
    assert.equal(game.state.programs[1].program.groups[0].name, "Program");
    assert.equal(game.state.programs[0].program.groups[0].name, "Program");
  });
});

/** A map run with the copy edited: one group added, so the copy differs from its program. */
function editedCopyGame() {
  const game = wiredPanel(gameWithRule());
  game.apply(send(game.state, SENT, REAL_MS));
  click(buttonNamed(game.panel, "Dodaj grupę"));
  return game;
}

// To do 8; spec decision 7. Catches the save writing something other than the copy into the
// program, the line staying after the save, and the buttons staying active.
test("„Zapisz w programie” writes the copy into its program, and the line and the activity go", () => {
  withPanelDocument(() => {
    const game = editedCopyGame();
    const copy = game.state.run.copy.program;
    click(visibleButton(game.panel, "Zapisz w programie"));
    assert.deepEqual(game.acts.at(-1), ["saveCopy"]);
    assert.equal(game.state.programs[0].program, copy);
    assert.deepEqual(copyTexts(game.panel), ["Kopia: Program"]);
    for (const text of SAVE_BUTTONS)
      assert.equal(visibleButton(game.panel, text).disabled, true, text);
  });
});

// To do 9; D-160 and spec decision 7. Catches the line missing when the program changed and the
// copy has no changes, the line staying after the save, and a wrong program name in it.
test("the line of a changed program stands with and without unsaved changes, and goes after „Zapisz w programie”", () => {
  withPanelDocument(() => {
    const game = wiredPanel(gameWithRule());
    game.apply(send(game.state, SENT, REAL_MS));
    pick(game.panel, "1");
    click(buttonNamed(game.panel, "Zmień nazwę"));
    typeName(game.panel, "Las");
    click(buttonNamed(game.panel, "Zapisz"));
    // The program, not the copy, gets a group.
    click(buttonNamed(game.panel, "Dodaj grupę"));
    pick(game.panel, "copy");
    const lacks =
      "Program Las ma zmiany, których nie ma w tej kopii — zapis w programie je zastąpi.";
    assert.deepEqual(copyTexts(game.panel), ["Kopia: Las", lacks]);
    assert.equal(
      visibleButton(game.panel, "Zapisz w programie").disabled,
      true,
    );

    click(buttonNamed(game.panel, "Dodaj grupę"));
    assert.deepEqual(copyTexts(game.panel), [
      "Kopia: Las",
      "Niezapisane zmiany w kopii.",
      lacks,
    ]);
    click(visibleButton(game.panel, "Zapisz w programie"));
    assert.deepEqual(copyTexts(game.panel), ["Kopia: Las"]);
    assert.equal(groupCount(game.state.programs[0].program), 2);
  });
});

// To do 8; D-159 and spec decision 7. Catches an empty or wrong first value of the field, a
// refused name saved, and the panel leaving the copy or keeping the old program number.
test("„Zapisz jako nowy program” offers the first free name, refuses a taken one, and the copy then belongs to the new program", () => {
  withPanelDocument(() => {
    const game = editedCopyGame();
    click(visibleButton(game.panel, "Zapisz jako nowy program"));
    assert.equal(nameOpen(game.panel), true);
    assert.equal(nameInput(game.panel).value, "Program 2");

    typeName(game.panel, "PROGRAM");
    assert.equal(nameMessage(game.panel), "Program o tej nazwie już istnieje.");
    click(buttonNamed(game.panel, "Zapisz"));
    assert.ok(!game.acts.some(([act]) => act === "saveCopyAsNew"));
    assert.equal(nameOpen(game.panel), true);

    typeName(game.panel, " Las ");
    click(buttonNamed(game.panel, "Zapisz"));
    assert.deepEqual(game.acts.at(-1), ["saveCopyAsNew", " Las "]);
    assert.equal(nameOpen(game.panel), false);
    assert.equal(programList(game.panel).value, "copy");
    assert.deepEqual(positions(programList(game.panel)), [
      "Kopia w przejściu",
      "Program",
      "Las",
    ]);
    assert.deepEqual(copyTexts(game.panel), ["Kopia: Las"]);
    assert.equal(game.state.run.copy.programId, 2);
    for (const text of SAVE_BUTTONS)
      assert.equal(visibleButton(game.panel, text).disabled, true, text);
  });
});

// To do 8; spec decision 7. Catches the suggestion ignoring the names taken, the field staying
// open after the copy lost its changes, and the same action not leaving the field.
test("„Zapisz jako nowy program” suggests „Program 3” beside „Program 2”, and its field leaves at the same action again", () => {
  withPanelDocument(() => {
    const game = wiredPanel(createProgram(gameWithRule()).state);
    game.apply(send(game.state, SENT, REAL_MS));
    click(buttonNamed(game.panel, "Dodaj grupę"));
    click(visibleButton(game.panel, "Zapisz jako nowy program"));
    assert.equal(nameInput(game.panel).value, "Program 3");
    click(visibleButton(game.panel, "Zapisz jako nowy program"));
    assert.equal(nameOpen(game.panel), false);
    click(visibleButton(game.panel, "Zapisz jako nowy program"));
    assert.equal(nameOpen(game.panel), true);
    click(visibleButton(game.panel, "Porzuć zmiany"));
    assert.equal(nameOpen(game.panel), false, "no changes, nothing to save");
  });
});

// To do 8; spec decision 7. Catches the discard leaving the copy's edit, the line staying, and
// the discard not going to the simulation.
test("„Porzuć zmiany” restores the copy's program and the line goes", () => {
  withPanelDocument(() => {
    const game = editedCopyGame();
    click(visibleButton(game.panel, "Porzuć zmiany"));
    assert.deepEqual(game.acts.at(-1), ["discardCopy"]);
    assert.equal(groupCount(game.state.run.copy.program), 1);
    assert.deepEqual(copyTexts(game.panel), ["Kopia: Program"]);
    for (const text of SAVE_BUTTONS)
      assert.equal(visibleButton(game.panel, text).disabled, true, text);
  });
});

// To do 3 and 8; D-156 and spec decision 7. Catches the heading losing the name of a deleted
// program, „Zapisz w programie” and „Porzuć zmiany” offered for a program that is gone, and
// „Zapisz jako nowy program” withdrawn.
test("a copy whose program was deleted keeps its heading, offers only „Zapisz jako nowy program”, and it is active", () => {
  withPanelDocument(() => {
    const game = wiredPanel(createProgram(gameWithRule()).state);
    game.apply(send(game.state, SENT, REAL_MS));
    pick(game.panel, "1");
    click(buttonNamed(game.panel, "Usuń"));
    pick(game.panel, "copy");
    assert.deepEqual(copyTexts(game.panel), [
      "Kopia: Program",
      "Niezapisane zmiany w kopii.",
    ]);
    assert.equal(visibleButton(game.panel, "Zapisz w programie"), undefined);
    assert.equal(visibleButton(game.panel, "Porzuć zmiany"), undefined);
    assert.equal(
      visibleButton(game.panel, "Zapisz jako nowy program").disabled,
      false,
    );
    click(visibleButton(game.panel, "Zapisz jako nowy program"));
    assert.equal(nameInput(game.panel).value, "Program 3");
    click(buttonNamed(game.panel, "Zapisz"));
    assert.deepEqual(copyTexts(game.panel), ["Kopia: Program 3"]);
  });
});

// To do 12; D-162 and spec decision 7. Catches the button missing beside another program, shown
// beside the copy's own program or the copy, and a click that does not switch and show the copy.
test("„Przełącz postać na ten program” stands beside another saved program only, and a click switches and shows the copy", () => {
  withPanelDocument(() => {
    const game = wiredPanel(createProgram(gameWithRule()).state);
    game.apply(send(game.state, SENT, REAL_MS));
    const SWITCH = "Przełącz postać na ten program";
    assert.equal(visibleButton(game.panel, SWITCH), undefined, "copy shown");
    pick(game.panel, "1");
    assert.equal(visibleButton(game.panel, SWITCH), undefined, "own program");
    pick(game.panel, "2");
    assert.ok(visibleButton(game.panel, SWITCH));
    assert.ok(
      visibleButton(game.panel, SWITCH).classes.has("destructive"),
      "a destructive button",
    );

    click(visibleButton(game.panel, SWITCH));
    assert.deepEqual(game.acts.at(-1), ["switchProgram", 2]);
    assert.equal(game.state.run.copy.programId, 2);
    assert.equal(game.state.run.streak, 0);
    assert.deepEqual(counts(game.panel), []);
    assert.equal(programList(game.panel).value, "copy");
    assert.deepEqual(copyTexts(game.panel), ["Kopia: Program 2"]);
    assert.equal(visibleButton(game.panel, SWITCH), undefined);
    pick(game.panel, "1");
    assert.ok(
      visibleButton(game.panel, SWITCH),
      "now beside the first program",
    );
  });
});

// To do 12; D-162 and spec decision 7. Catches the button standing beside the new program after
// „Zapisz jako nowy program”, and not beside the program the copy was taken from.
test("after „Zapisz jako nowy program” the switch button stands beside the first program and not beside the new one", () => {
  withPanelDocument(() => {
    const game = editedCopyGame();
    click(visibleButton(game.panel, "Zapisz jako nowy program"));
    click(buttonNamed(game.panel, "Zapisz"));
    pick(game.panel, "2");
    assert.equal(
      visibleButton(game.panel, "Przełącz postać na ten program"),
      undefined,
    );
    pick(game.panel, "1");
    assert.ok(visibleButton(game.panel, "Przełącz postać na ten program"));
  });
});

// To do 10 and 12; spec decision 7. Catches the switch button standing on the screen after a death
// and the copy's buttons not working there.
test("on the screen after a death the copy's buttons work and there is no switch button", () => {
  withPanelDocument(() => {
    const game = wiredPanel(createProgram(gameWithRule()).state);
    game.apply(send(game.state, SENT, REAL_MS));
    click(buttonNamed(game.panel, "Dodaj grupę"));
    game.apply({
      state: {
        ...game.state,
        run: { ...game.state.run, death: { minute: 3, cause: "cold" } },
      },
      events: [],
    });
    click(visibleButton(game.panel, "Zapisz w programie"));
    assert.deepEqual(game.acts.at(-1), ["saveCopy"]);
    assert.deepEqual(copyTexts(game.panel), ["Kopia: Program"]);
    pick(game.panel, "2");
    assert.equal(
      visibleButton(game.panel, "Przełącz postać na ten program"),
      undefined,
    );
  });
});

// To do 10; spec decision 7. Catches the copy's section staying after „Zakończ”, when a saved
// program is shown.
test("after „Zakończ” with unsaved changes the copy's section is gone", () => {
  withPanelDocument(() => {
    const game = editedCopyGame();
    game.apply(end(game.state));
    assert.deepEqual(copyTexts(game.panel), []);
    assert.equal(visibleButton(game.panel, "Zapisz w programie"), undefined);
  });
});
