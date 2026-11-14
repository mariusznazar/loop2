// The list of programs on the screen Programy (D-165, D-166, D-167, D-169) on jsdom through tests/view/page-document.mjs (D-264): which elements
// the list builds, which program it marks, what its acts hand the page and which name the name rule
// refuses. Real focus order and rendering are the browser check's (D-88), so a focus case here holds
// only what jsdom shows.
import { assert, inAct, typeInto, withPage } from "./page-document.mjs";
import { test } from "node:test";
import { newGame } from "../../dist/browser/sim/game.js";
import { createProgramList } from "../../dist/browser/view/program-list.js";

// --- the page ------------------------------------------------------------------------------

const PROGRAM = newGame().programs[0].program;

/** The player's programs: „Program” with number 1 and „Las nocą” with number 3, a gap between. */
const TWO = [
  { id: 1, name: "Program", program: PROGRAM },
  { id: 3, name: "Las nocą", program: PROGRAM },
];
const ONE = [{ id: 1, name: "Program", program: PROGRAM }];

/** The pull of the previous save as the page gives it: no button and no line. */
const NO_PULL = { control: "away", line: null };

const propsOf = (programs, chosenId = 3, pull = NO_PULL) => ({
  programs,
  chosenId,
  pull,
});

/** Builds the list in the page's body; `calls` counts what the list handed the page. */
async function mount({ root }, props) {
  const calls = [];
  let list = null;
  await inAct(() => {
    list = createProgramList({
      onPull: () => {
        calls.push(["pull"]);
      },
      onCreate: () => {
        calls.push(["create"]);
      },
      onRename: (programId, name) => {
        calls.push(["rename", programId, name]);
      },
      onDelete: (programId) => {
        calls.push(["delete", programId]);
      },
      props,
    });
    root.append(list.element);
  });
  return { list, calls };
}

/** Clicks inside act; React's work on an event shows only through act. */
function press(target) {
  assert.ok(target, "what the case presses stands");
  const { Event } = target.ownerDocument.defaultView;
  return inAct(() =>
    target.dispatchEvent(
      new Event("click", { bubbles: true, cancelable: true }),
    ),
  );
}

const buttonNamed = (root, text) =>
  [...root.querySelectorAll("button")].find(
    (button) => button.textContent === text,
  );
const links = (root) => [...root.querySelectorAll(".program-list-item")];
const nameField = (root) => root.querySelector(".input-field input");

// --- the list ------------------------------------------------------------------------------

test("each program is a link to its own number's address, in the list's order", async () => {
  await withPage(async (page) => {
    await mount(page, propsOf(TWO));
    assert.deepEqual(
      links(page.root).map((link) => [
        link.textContent,
        link.getAttribute("href"),
      ]),
      [
        ["Program", "#/programy/1"],
        ["Las nocą", "#/programy/3"],
      ],
    );
  });
});

test("only the chosen program is marked with aria-current, and none is marked without one", async () => {
  await withPage(async (page) => {
    const { list } = await mount(page, propsOf(TWO, 3));
    assert.deepEqual(
      links(page.root).map((link) => link.getAttribute("aria-current")),
      [null, "page"],
    );
    await inAct(() => list.update(propsOf(TWO, null)));
    assert.deepEqual(
      links(page.root).map((link) => link.getAttribute("aria-current")),
      [null, null],
    );
  });
});

test("Usuń is inactive while the list holds one program and active beside two (D-167)", async () => {
  await withPage(async (page) => {
    await mount(page, propsOf(ONE, 1));
    const remove = buttonNamed(page.root, "Usuń");
    assert.ok(remove, "Usuń stands beside the one program");
    assert.equal(remove.disabled, true);
  });
  await withPage(async (page) => {
    await mount(page, propsOf(TWO, 3));
    const remove = buttonNamed(page.root, "Usuń");
    assert.ok(remove, "Usuń stands beside two programs");
    assert.equal(remove.disabled, false);
    assert.equal(remove.className, "button destructive");
  });
});

test("Usuń hands the chosen program's number to the page, and Nowy program hands it the act", async () => {
  await withPage(async (page) => {
    const { calls } = await mount(page, propsOf(TWO, 3));
    await press(buttonNamed(page.root, "Usuń"));
    await press(buttonNamed(page.root, "Nowy program"));
    assert.deepEqual(calls, [["delete", 3], ["create"]]);
  });
});

// --- the pull of the previous save (D-395, D-167) ---------------------------------------------

const PULL_TEXT = "Wciągnij programy z poprzedniego zapisu";
const pullButton = (root) => buttonNamed(root, PULL_TEXT);
const sentences = (root) => [
  ...root.querySelectorAll(
    ".program-actions .form-note, .program-actions .form-warning",
  ),
];

// Catches the button standing where the page gives none (an account without the privilege, or with
// no previous save), and a line standing only with a button.
test("with the pull away the list has no pull button and no line", async () => {
  await withPage(async (page) => {
    await mount(page, propsOf(TWO, 3, { control: "away", line: null }));
    assert.equal(pullButton(page.root), undefined);
    assert.equal(sentences(page.root).length, 0);
  });
});

// Catches the button drawn destructive, main or disabled at rest, and a press that hands the page
// nothing or a second act.
test("at rest the pull is a plain enabled button, among the list's acts, and a press hands the page the pull", async () => {
  await withPage(async (page) => {
    const { calls } = await mount(
      page,
      propsOf(TWO, 3, { control: "rest", line: null }),
    );
    const button = pullButton(page.root);
    assert.ok(button, "the pull stands at rest");
    assert.equal(button.className, "button");
    assert.equal(button.disabled, false);
    assert.equal(button.getAttribute("aria-busy"), null);
    assert.equal(button.parentElement.className, "program-actions");
    assert.deepEqual(
      [...button.parentElement.querySelectorAll("button")].map(
        (each) => each.textContent,
      ),
      ["Nowy program", "Zmień nazwę", "Usuń", PULL_TEXT],
    );
    await press(button);
    assert.deepEqual(calls, [["pull"]]);
  });
});

// Catches a waiting button that stays pressable, keeps its resting text or hands the page a second pull.
test("while the pull waits the button reads „Wciąganie…”, is disabled and busy, and a press hands nothing", async () => {
  await withPage(async (page) => {
    const { calls } = await mount(
      page,
      propsOf(TWO, 3, { control: "waiting", line: null }),
    );
    const button = [...page.root.querySelectorAll("button")].find(
      (each) => each.textContent === "Wciąganie…",
    );
    assert.ok(button, "the waiting button stands");
    assert.equal(button.disabled, true);
    assert.equal(button.getAttribute("aria-busy"), "true");
    assert.equal(pullButton(page.root), undefined);
    await press(button);
    assert.deepEqual(calls, []);
  });
});

// Catches a result drawn in `warning`, or a failure drawn as a result (D-39): the roles of the two
// kinds of line, which the shared sentences carry in their classes.
test("a result line stands next to the control as a note and a failure as a warning, each with its text", async () => {
  await withPage(async (page) => {
    const { list } = await mount(
      page,
      propsOf(TWO, 3, {
        control: "rest",
        line: { role: "text", text: "Wciągnięto 2 programy." },
      }),
    );
    const [note] = sentences(page.root);
    assert.equal(note.className, "form-note");
    assert.equal(note.textContent, "Wciągnięto 2 programy.");
    assert.equal(note.previousElementSibling, pullButton(page.root));
    await inAct(() =>
      list.update(
        propsOf(TWO, 3, {
          control: "rest",
          line: { role: "warning", text: "Nie udało się." },
        }),
      ),
    );
    const [warning] = sentences(page.root);
    assert.equal(sentences(page.root).length, 1);
    assert.equal(warning.className, "form-warning");
    assert.equal(warning.getAttribute("role"), "alert");
    assert.equal(warning.textContent, "Nie udało się.");
  });
});

// Catches a line that needs the button: a sentence of „no previous save” stands where the button went.
test("a line stands also where the control is away", async () => {
  await withPage(async (page) => {
    await mount(
      page,
      propsOf(TWO, 3, {
        control: "away",
        line: { role: "text", text: "Nie ma już poprzedniego zapisu." },
      }),
    );
    assert.equal(pullButton(page.root), undefined);
    assert.equal(sentences(page.root).length, 1);
  });
});

// Catches a text of the document drawn as markup: the line is a text node (D-395).
test("a line's text is shown as text, never as markup", async () => {
  await withPage(async (page) => {
    const hostile = '<img src="x"><b>Las</b>';
    await mount(
      page,
      propsOf(TWO, 3, {
        control: "rest",
        line: { role: "text", text: hostile },
      }),
    );
    assert.equal(page.root.querySelector(".program-actions img"), null);
    assert.equal(page.root.querySelector(".program-actions b"), null);
    assert.equal(sentences(page.root)[0].textContent, hostile);
  });
});

// jsdom keeps focus on a disabled button until the page's observer moves it; the list puts it back
// on the control the player started from once the answer has come (styleguide, States of shared
// controls). Real focus order is the browser check's (D-88).
test("after the wait the focus returns to the pull button", async () => {
  await withPage(async (page) => {
    const { list } = await mount(
      page,
      propsOf(TWO, 3, { control: "rest", line: null }),
    );
    await press(pullButton(page.root));
    pullButton(page.root).focus();
    await inAct(() =>
      list.update(propsOf(TWO, 3, { control: "waiting", line: null })),
    );
    await inAct(() =>
      list.update(propsOf(TWO, 3, { control: "rest", line: null })),
    );
    assert.equal(page.document.activeElement, pullButton(page.root));
  });
});

// --- the name field ------------------------------------------------------------------------

test("Zmień nazwę opens the field with the chosen program's name, and a second press closes it", async () => {
  await withPage(async (page) => {
    const { calls } = await mount(page, propsOf(TWO, 3));
    assert.equal(nameField(page.root), null);
    await press(buttonNamed(page.root, "Zmień nazwę"));
    assert.equal(nameField(page.root).value, "Las nocą");
    assert.equal(page.document.activeElement, nameField(page.root));
    await press(buttonNamed(page.root, "Zmień nazwę"));
    assert.equal(nameField(page.root), null);
    assert.deepEqual(calls, []);
  });
});

test("Zapisz hands a name the name rule takes to the page and closes the field", async () => {
  await withPage(async (page) => {
    const { calls } = await mount(page, propsOf(TWO, 3));
    await press(buttonNamed(page.root, "Zmień nazwę"));
    await typeInto(nameField(page.root), "Las zimą");
    await press(buttonNamed(page.root, "Zapisz"));
    assert.deepEqual(calls, [["rename", 3, "Las zimą"]]);
    assert.equal(nameField(page.root), null);
  });
});

test("a chosen program keeps its own name, letter case changed, without a refusal", async () => {
  await withPage(async (page) => {
    const { calls } = await mount(page, propsOf(TWO, 3));
    await press(buttonNamed(page.root, "Zmień nazwę"));
    await typeInto(nameField(page.root), "las nocą");
    assert.equal(
      page.root.querySelector(".input-field-message").textContent,
      "",
    );
    await press(buttonNamed(page.root, "Zapisz"));
    assert.deepEqual(calls, [["rename", 3, "las nocą"]]);
  });
});

test("a name another program bears is refused in the field, and Zapisz hands nothing on", async () => {
  await withPage(async (page) => {
    const { calls } = await mount(page, propsOf(TWO, 3));
    await press(buttonNamed(page.root, "Zmień nazwę"));
    await typeInto(nameField(page.root), "program");
    assert.equal(
      page.root.querySelector(".input-field-message").textContent,
      "Program o tej nazwie już istnieje.",
    );
    assert.equal(nameField(page.root).getAttribute("aria-invalid"), "true");
    await press(buttonNamed(page.root, "Zapisz"));
    assert.deepEqual(calls, []);
    assert.notEqual(nameField(page.root), null);
  });
});

test("an empty name is refused in the field with its own message", async () => {
  await withPage(async (page) => {
    const { calls } = await mount(page, propsOf(TWO, 3));
    await press(buttonNamed(page.root, "Zmień nazwę"));
    await typeInto(nameField(page.root), "   ");
    assert.equal(
      page.root.querySelector(".input-field-message").textContent,
      "Wpisz nazwę programu.",
    );
    await press(buttonNamed(page.root, "Zapisz"));
    assert.deepEqual(calls, []);
  });
});

test("the name field leaves when another program is chosen, and nothing is handed on", async () => {
  await withPage(async (page) => {
    const { list, calls } = await mount(page, propsOf(TWO, 3));
    await press(buttonNamed(page.root, "Zmień nazwę"));
    await typeInto(nameField(page.root), "Inna");
    await inAct(() => list.update(propsOf(TWO, 1)));
    assert.equal(nameField(page.root), null);
    assert.deepEqual(calls, []);
  });
});
