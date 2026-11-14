// The list of programs on the screen Programy (D-165, D-166, D-167, D-169) on jsdom through tests/view/page-document.mjs (D-264): which elements
// the list builds, which program it marks, what its acts hand the page and which name the name rule
// refuses. Real focus order and rendering are the browser check's (D-88), so a focus case here holds
// only what jsdom shows.
import { assert, inAct, press, typeInto, withPage } from "./page-document.mjs";
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
      onResetAsk: () => {
        calls.push(["reset-ask"]);
      },
      onResetConfirm: () => {
        calls.push(["reset-confirm"]);
      },
      onResetWithdraw: () => {
        calls.push(["reset-withdraw"]);
      },
      props,
    });
    root.append(list.element);
  });
  return { list, calls };
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

// --- the pull of the previous save (D-399, D-167) ---------------------------------------------

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

// Catches a text of the document drawn as markup: the line is a text node (D-399).
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

// --- the reset of the game (D-400, D-44) ----------------------------------------------------

const RESET_TEXT = "Zacznij od zera";
const RESET_CONFIRM_TEXT = "Tak, zacznij od zera";
const WITHDRAW_TEXT = "Wróć";
const RESET_AT_REST = { control: "rest", confirming: false, line: null };
const RESET_FAILED = "Nie udało się zacząć gry od zera. Gra zostaje bez zmian.";
const confirmation = (root) => root.querySelector(".program-reset-confirm");
const resetLine = (root) =>
  root.querySelector(".program-actions .form-warning");

// Catches the control drawn on an account the page gives no reset (no privilege, or no callback):
// the page then leaves `reset` out or null, and the list must draw nothing of the control.
test("without a reset state the list has no reset control and no confirmation (D-400)", async () => {
  for (const reset of [undefined, null]) {
    await withPage(async (page) => {
      await mount(page, { ...propsOf(TWO, 3), reset });
      assert.equal(buttonNamed(page.root, RESET_TEXT), undefined);
      assert.equal(confirmation(page.root), null);
    });
  }
});

// Catches a control that is not a destructive button (D-44: neutral at rest, `danger` under the
// pointer), one that sits in another place than beside the pull, and a press that does more than
// asking for the confirmation.
test("at rest the reset is an enabled destructive button beside the pull, and a press only asks for the confirmation", async () => {
  await withPage(async (page) => {
    const { calls } = await mount(page, {
      ...propsOf(TWO, 3),
      reset: RESET_AT_REST,
    });
    const button = buttonNamed(page.root, RESET_TEXT);
    assert.ok(button, "the reset control stands");
    assert.equal(button.className, "button destructive");
    assert.equal(button.disabled, false);
    assert.equal(button.parentElement.className, "program-actions");
    assert.deepEqual(
      [...button.parentElement.querySelectorAll("button")].map(
        (each) => each.textContent,
      ),
      ["Nowy program", "Zmień nazwę", "Usuń", RESET_TEXT],
    );
    assert.equal(confirmation(page.root), null);
    await press(button);
    assert.deepEqual(calls, [["reset-ask"]]);
  });
});

// Catches a confirmation that says nothing of the replacement of an earlier previous save, one whose
// two buttons are not the confirm (destructive) and the withdraw (plain), and a press of either
// that hands the page the wrong act or hands it twice.
test("opened, the confirmation names what the reset does, and its two answers hand the page one act each", async () => {
  await withPage(async (page) => {
    const { calls } = await mount(page, {
      ...propsOf(TWO, 3),
      reset: { control: "rest", confirming: true, line: null },
    });
    const block = confirmation(page.root);
    assert.ok(block, "the confirmation stands");
    const sentence = block.querySelector(".program-reset-text").textContent;
    assert.match(sentence, /poprzedniego zapisu/);
    assert.match(sentence, /zastąp/);
    assert.match(sentence, /zera/);
    const confirm = buttonNamed(page.root, RESET_CONFIRM_TEXT);
    const withdraw = buttonNamed(page.root, WITHDRAW_TEXT);
    assert.equal(confirm.className, "button destructive");
    assert.equal(withdraw.className, "button");
    await press(withdraw);
    await press(confirm);
    assert.deepEqual(calls, [["reset-withdraw"], ["reset-confirm"]]);
  });
});

// Catches a waiting control that stays pressable or asks again, and a confirmation that stays open
// while the page waits for the server.
test("while the reset waits the control is disabled, a press hands nothing, and no confirmation stands", async () => {
  await withPage(async (page) => {
    const { calls } = await mount(page, {
      ...propsOf(TWO, 3),
      reset: { control: "waiting", confirming: false, line: null },
    });
    const button = buttonNamed(page.root, RESET_TEXT);
    assert.ok(button, "the control stands while it waits");
    assert.equal(button.disabled, true);
    assert.equal(confirmation(page.root), null);
    await press(button);
    assert.deepEqual(calls, []);
  });
});

// Catches a failed reset drawn as a result or without its sentence, and a sentence that stands
// anywhere but beside the control it answers (D-39: a refusal in `warning`).
test("a failed reset stands beside its control as a warning with its text, and the control is at rest", async () => {
  await withPage(async (page) => {
    await mount(page, {
      ...propsOf(TWO, 3),
      reset: { control: "rest", confirming: false, line: RESET_FAILED },
    });
    const line = resetLine(page.root);
    assert.ok(line, "the sentence of the failure stands");
    assert.equal(line.getAttribute("role"), "alert");
    assert.equal(line.textContent, RESET_FAILED);
    assert.equal(
      line.previousElementSibling,
      buttonNamed(page.root, RESET_TEXT),
    );
    assert.equal(buttonNamed(page.root, RESET_TEXT).disabled, false);
  });
});

// jsdom keeps focus on a disabled button; the list puts it back on the reset control once the answer
// has come, and the confirmation takes the focus on withdraw when it opens (styleguide, States of
// shared controls). Real focus order is the browser check's (D-88).
test("the focus goes to withdraw when the confirmation opens, and back to the reset control after the wait", async () => {
  await withPage(async (page) => {
    const { list } = await mount(page, {
      ...propsOf(TWO, 3),
      reset: RESET_AT_REST,
    });
    await press(buttonNamed(page.root, RESET_TEXT));
    await inAct(() =>
      list.update({
        ...propsOf(TWO, 3),
        reset: { control: "rest", confirming: true, line: null },
      }),
    );
    assert.equal(
      page.document.activeElement,
      buttonNamed(page.root, WITHDRAW_TEXT),
    );
    await press(buttonNamed(page.root, RESET_CONFIRM_TEXT));
    await inAct(() =>
      list.update({
        ...propsOf(TWO, 3),
        reset: { control: "waiting", confirming: false, line: null },
      }),
    );
    await inAct(() =>
      list.update({
        ...propsOf(TWO, 3),
        reset: { control: "rest", confirming: false, line: RESET_FAILED },
      }),
    );
    assert.equal(
      page.document.activeElement,
      buttonNamed(page.root, RESET_TEXT),
    );
  });
});
