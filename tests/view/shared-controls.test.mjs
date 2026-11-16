// The shared controls in their React form (D-44, D-265): each control the screens use is a
// React component whose element carries the tag, classes and attributes the look in styles.css
// and the screens rely on, and answers a click, a typed value or a choice as the screen's handler
// expects. Every expected value is written out below. The harness stands first, and every
// comparison is of plain data: Node's assert on a rendered element can take the machine's memory
// (D-264, D-268).
import { assert, inAct, press, typeInto, withPage } from "./page-document.mjs";
import { test } from "node:test";
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { ReactButton } from "../../dist/browser/view/controls/react-button.js";
import {
  ReactFormNote,
  ReactFormWarning,
  ReactPasswordField,
  ReactTextField,
} from "../../dist/browser/view/controls/react-text-field.js";
import { ReactPickCell } from "../../dist/browser/view/controls/react-pick-cell.js";
import { ReactSelectList } from "../../dist/browser/view/controls/react-select-list.js";
import { ReactNumberField } from "../../dist/browser/view/controls/react-number-field.js";
import { readNumberField } from "../../dist/browser/view/program-editor.js";
import { readTripCount } from "../../dist/browser/view/trip-editor.js";

// --- drawing a control -------------------------------------------------------------------------

/** Draws `element` under the page's body in a React root, in act. */
async function drawn(document, element) {
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);
  await inAct(() => root.render(element));
  return { container, root };
}

/** The one element a drawing holds. */
function drawnElement({ container }) {
  assert.equal(container.children.length, 1, "one element is drawn");
  return container.firstElementChild;
}

/**
 * Every attribute of `element` as plain data, so a case names the attributes it expects and no
 * more. An input's `value` attribute is left out: React writes it, it is no part of the look, and
 * a case reads the value shown as `input.value`.
 */
function attributesOf(element) {
  return Object.fromEntries(
    [...element.attributes]
      .filter(({ name }) => !(name === "value" && element.nodeName === "INPUT"))
      .map(({ name, value }) => [name, value]),
  );
}

// --- the button --------------------------------------------------------------------------------

const BUTTON_TEXT = "Zaloguj";

test("a plain button is a button of the type button with the class button, and shows its text", async () => {
  // decision: D-265 "Each shared control in `src/browser/view/controls/` has one form, a React component"
  await withPage(async ({ document }) => {
    const button = drawnElement(
      await drawn(document, createElement(ReactButton, { text: BUTTON_TEXT })),
    );
    assert.equal(button.nodeName, "BUTTON");
    assert.deepEqual(attributesOf(button), { type: "button", class: "button" });
    assert.equal(button.textContent, BUTTON_TEXT);
  });
});

test("a button with an accessible name carries it as aria-label and keeps its visible text", async () => {
  await withPage(async ({ document }) => {
    const button = drawnElement(
      await drawn(
        document,
        createElement(ReactButton, { text: "×", label: "Zamknij" }),
      ),
    );
    assert.deepEqual(attributesOf(button), {
      type: "button",
      class: "button",
      "aria-label": "Zamknij",
    });
    assert.equal(button.textContent, "×");
  });
});

test("a submit button is of the type submit, and a button given no submit is never", async () => {
  await withPage(async ({ document }) => {
    const submit = drawnElement(
      await drawn(
        document,
        createElement(ReactButton, { text: BUTTON_TEXT, submit: true }),
      ),
    );
    assert.deepEqual(attributesOf(submit), { type: "submit", class: "button" });
    const other = drawnElement(
      await drawn(
        document,
        createElement(ReactButton, { text: BUTTON_TEXT, submit: false }),
      ),
    );
    assert.equal(other.getAttribute("type"), "button");
  });
});

// The kinds of the shared button. Each class is written out, since a form that left it out would
// show a plain button; none of these kinds says anything of selection, so none has aria-pressed.
const KIND_CASES = [
  {
    name: "a destructive button",
    kind: "destructive",
    text: "Usuń",
    expectedClass: "button destructive",
  },
  {
    name: "a button in positive",
    kind: "positive",
    text: "Odbierz",
    expectedClass: "button positive",
  },
  {
    name: "a main button outside a form",
    // decision: D-274 "„Wejdź” at each character in the section „Kto idzie” of the card of a map has the same main look though it sends no form"
    kind: "main",
    text: "Wejdź",
    expectedClass: "button main",
  },
  {
    name: "a secondary action",
    // decision: D-275 "An action that opens or leaves a state of a form and stands under that form — „Nie pamiętam hasła”, „Wróć do logowania” and „Anuluj” of the login card — is a secondary action"
    kind: "secondary",
    text: "Nie pamiętam hasła",
    expectedClass: "button secondary",
  },
];

for (const { name, kind, text, expectedClass } of KIND_CASES) {
  test(`${name} is a button of the type button with the class ${expectedClass}, and says nothing of selection`, async () => {
    // decision: D-265 "Each shared control in `src/browser/view/controls/` has one form, a React component"
    await withPage(async ({ document }) => {
      const button = drawnElement(
        await drawn(document, createElement(ReactButton, { text, kind })),
      );
      assert.deepEqual(attributesOf(button), {
        type: "button",
        class: expectedClass,
      });
      assert.equal(button.textContent, text);
    });
  });
}

test("a button selected in its group carries the class selected and aria-pressed true, and one not selected aria-pressed false", async () => {
  await withPage(async ({ document }) => {
    const selected = drawnElement(
      await drawn(
        document,
        createElement(ReactButton, { text: "Zaloguj się", selected: true }),
      ),
    );
    assert.deepEqual(attributesOf(selected), {
      type: "button",
      class: "button selected",
      "aria-pressed": "true",
    });
    const notSelected = drawnElement(
      await drawn(
        document,
        createElement(ReactButton, { text: "Załóż konto", selected: false }),
      ),
    );
    assert.deepEqual(attributesOf(notSelected), {
      type: "button",
      class: "button",
      "aria-pressed": "false",
    });
  });
});

test("a tab selected in its group is a button with the classes tab and selected and aria-pressed true", async () => {
  // decision: D-276 "A tab keeps the HTML element, `aria-pressed` and keyboard of the button selected in its group"
  await withPage(async ({ document }) => {
    const button = drawnElement(
      await drawn(
        document,
        createElement(ReactButton, {
          text: "Zaloguj się",
          kind: "tab",
          selected: true,
        }),
      ),
    );
    assert.equal(button.nodeName, "BUTTON");
    assert.deepEqual(attributesOf(button), {
      type: "button",
      class: "button tab selected",
      "aria-pressed": "true",
    });
  });
});

test("a tab not selected in its group has the class tab alone and aria-pressed false", async () => {
  // decision: D-276 "A tab keeps the HTML element, `aria-pressed` and keyboard of the button selected in its group"
  await withPage(async ({ document }) => {
    const button = drawnElement(
      await drawn(
        document,
        createElement(ReactButton, {
          text: "Załóż konto",
          kind: "tab",
          selected: false,
        }),
      ),
    );
    assert.deepEqual(attributesOf(button), {
      type: "button",
      class: "button tab",
      "aria-pressed": "false",
    });
  });
});

test("a click on a tab reaches the screen's handler, and the screen's selection is what aria-pressed shows", async () => {
  // decision: D-276 "A tab keeps the HTML element, `aria-pressed` and keyboard of the button selected in its group"
  await withPage(async ({ document }) => {
    let chosen = "login";
    const render = () =>
      createElement(
        "div",
        null,
        createElement(ReactButton, {
          text: "Zaloguj się",
          kind: "tab",
          selected: chosen === "login",
          onClick: () => {
            chosen = "login";
          },
        }),
        createElement(ReactButton, {
          text: "Załóż konto",
          kind: "tab",
          selected: chosen === "register",
          onClick: () => {
            chosen = "register";
          },
        }),
      );
    const drawing = await drawn(document, render());
    const [login, register] = drawing.container.querySelectorAll("button");
    assert.equal(login.getAttribute("aria-pressed"), "true");
    assert.equal(register.getAttribute("aria-pressed"), "false");
    await press(register);
    await inAct(() => drawing.root.render(render()));
    assert.equal(login.getAttribute("aria-pressed"), "false");
    assert.equal(register.getAttribute("aria-pressed"), "true");
  });
});

test("a button given aria-expanded carries it as given, and one given none carries none", async () => {
  await withPage(async ({ document }) => {
    const opened = drawnElement(
      await drawn(
        document,
        createElement(ReactButton, { text: "Konto", expanded: true }),
      ),
    );
    assert.deepEqual(attributesOf(opened), {
      type: "button",
      class: "button",
      "aria-expanded": "true",
    });
    const closed = drawnElement(
      await drawn(
        document,
        createElement(ReactButton, { text: "Konto", expanded: false }),
      ),
    );
    assert.deepEqual(attributesOf(closed), {
      type: "button",
      class: "button",
      "aria-expanded": "false",
    });
    const unsaid = drawnElement(
      await drawn(document, createElement(ReactButton, { text: "Konto" })),
    );
    assert.deepEqual(attributesOf(unsaid), { type: "button", class: "button" });
  });
});

test("a submit button that waits shows its waiting text, is disabled and busy, and is whole again when it stops", async () => {
  // decision: D-44 "A control awaiting a server response is disabled"
  await withPage(async ({ document }) => {
    const props = { text: BUTTON_TEXT, submit: true };
    const drawing = await drawn(
      document,
      createElement(ReactButton, { ...props, waitingText: "Logowanie…" }),
    );
    const button = drawnElement(drawing);
    assert.deepEqual(attributesOf(button), {
      type: "submit",
      class: "button",
      disabled: "",
      "aria-busy": "true",
    });
    assert.equal(button.textContent, "Logowanie…");

    await inAct(() =>
      drawing.root.render(
        createElement(ReactButton, { ...props, waitingText: null }),
      ),
    );
    assert.deepEqual(attributesOf(button), { type: "submit", class: "button" });
    assert.equal(button.textContent, BUTTON_TEXT);
  });
});

// A button of a card that waits is locked with its text kept (D-44): the screen gives `disabled`,
// the look of the kind stays, and the button does not claim to be busy.
const LOCKED_CASES = [
  {
    name: "a plain button",
    props: { text: "Nie pamiętam hasła" },
    expected: { type: "button", class: "button" },
  },
  {
    name: "a button selected in its group",
    props: { text: "Zaloguj się", selected: true },
    expected: {
      type: "button",
      class: "button selected",
      "aria-pressed": "true",
    },
  },
  {
    name: "a secondary action",
    props: { text: "Wróć do logowania", kind: "secondary" },
    expected: { type: "button", class: "button secondary" },
  },
  {
    name: "a main button",
    props: { text: "Wejdź", kind: "main" },
    expected: { type: "button", class: "button main" },
  },
  {
    name: "a tab selected in its group",
    props: { text: "Zaloguj się", kind: "tab", selected: true },
    expected: {
      type: "button",
      class: "button tab selected",
      "aria-pressed": "true",
    },
  },
  {
    name: "a tab not selected in its group",
    props: { text: "Załóż konto", kind: "tab", selected: false },
    expected: {
      type: "button",
      class: "button tab",
      "aria-pressed": "false",
    },
  },
];

for (const { name, props, expected } of LOCKED_CASES) {
  test(`${name} locked while the screen waits is disabled with its text kept and is not busy`, async () => {
    // decision: D-44 "A control awaiting a server response is disabled"
    await withPage(async ({ document }) => {
      const button = drawnElement(
        await drawn(
          document,
          createElement(ReactButton, { ...props, disabled: true }),
        ),
      );
      assert.deepEqual(attributesOf(button), { ...expected, disabled: "" });
      assert.equal(button.textContent, props.text);
    });
  });
}

// Breaks: a button that ignores `onClick` leaves `clicks` empty after the first click; one that
// stays enabled while it waits or is locked makes the click after it reach the handler.
test("a click on the button reaches the screen's handler, and a waiting or a locked button gives none", async () => {
  // decision: D-265 "Each shared control in `src/browser/view/controls/` has one form, a React component"
  await withPage(async ({ document }) => {
    const clicks = [];
    const onClick = () => clicks.push("click");
    const drawing = await drawn(
      document,
      createElement(ReactButton, { text: BUTTON_TEXT, onClick }),
    );
    const button = drawnElement(drawing);
    await press(button);
    assert.deepEqual(clicks, ["click"]);

    await inAct(() =>
      drawing.root.render(
        createElement(ReactButton, {
          text: BUTTON_TEXT,
          onClick,
          waitingText: "Logowanie…",
        }),
      ),
    );
    await press(button);
    assert.deepEqual(clicks, ["click"], "a waiting button is not clicked");

    await inAct(() =>
      drawing.root.render(
        createElement(ReactButton, {
          text: BUTTON_TEXT,
          onClick,
          disabled: true,
        }),
      ),
    );
    await press(button);
    assert.deepEqual(clicks, ["click"], "a locked button is not clicked");
  });
});

// --- the text field and the password field -----------------------------------------------------

test("a text field with a hidden label names its input by aria-label and draws no label element", async () => {
  // decision: D-265 "Each shared control in `src/browser/view/controls/` has one form, a React component"
  await withPage(async ({ document }) => {
    const drawing = await drawn(
      document,
      createElement(ReactTextField, { label: "Adres e-mail" }),
    );
    const input = drawing.container.querySelector("input");
    assert.equal(input.getAttribute("type"), "text");
    assert.equal(input.getAttribute("aria-label"), "Adres e-mail");
    assert.equal(input.hasAttribute("id"), false);
    assert.equal(drawing.container.querySelector("label"), null);
    assert.equal(
      drawing.container.firstElementChild.getAttribute("class"),
      "input-field",
    );
  });
});

test("a text field with a visible label, a hint and an autocomplete token joins the label to its input", async () => {
  await withPage(async ({ document }) => {
    const drawing = await drawn(
      document,
      createElement(ReactTextField, {
        label: "Adres e-mail",
        visibleLabel: true,
        hint: "np. ala@example.com",
        autocomplete: "email",
      }),
    );
    const input = drawing.container.querySelector("input");
    const label = drawing.container.querySelector("label");
    assert.equal(label.textContent, "Adres e-mail");
    assert.equal(label.getAttribute("class"), "input-field-label");
    assert.ok(input.id !== "", "the input has an id for the label to point at");
    assert.equal(label.htmlFor, input.id);
    assert.equal(input.hasAttribute("aria-label"), false);
    assert.equal(input.getAttribute("placeholder"), "np. ala@example.com");
    assert.equal(input.getAttribute("autocomplete"), "email");
  });
});

test("a password field is an input of the type password, with the autocomplete token it is given", async () => {
  await withPage(async ({ document }) => {
    const drawing = await drawn(
      document,
      createElement(ReactPasswordField, {
        label: "Hasło",
        visibleLabel: true,
        autocomplete: "new-password",
      }),
    );
    const input = drawing.container.querySelector("input");
    assert.equal(input.getAttribute("type"), "password");
    assert.equal(input.getAttribute("autocomplete"), "new-password");
  });
});

test("an address field asks for the keyboard of an address and for no spell check", async () => {
  await withPage(async ({ document }) => {
    const drawing = await drawn(
      document,
      createElement(ReactTextField, {
        label: "Adres e-mail",
        inputMode: "email",
        spellCheck: false,
      }),
    );
    const input = drawing.container.querySelector("input");
    assert.equal(input.getAttribute("inputmode"), "email");
    assert.equal(input.getAttribute("spellcheck"), "false");
  });
});

test("a field locked while it waits for the server is disabled", async () => {
  // decision: D-44 "A control awaiting a server response is disabled"
  await withPage(async ({ document }) => {
    const drawing = await drawn(
      document,
      createElement(ReactPasswordField, {
        label: "Hasło",
        visibleLabel: true,
        disabled: true,
      }),
    );
    assert.equal(drawing.container.querySelector("input").disabled, true);
  });
});

// Breaks: a field whose input does not point at its message by `aria-describedby`, or whose
// message stays hidden or is not the text the screen gave, fails here.
test("the error message of a field is the one its input points at, and the field is in the error state", async () => {
  await withPage(async ({ document }) => {
    const drawing = await drawn(
      document,
      createElement(ReactTextField, {
        label: "Adres e-mail",
        visibleLabel: true,
        error: "Podaj adres e-mail.",
      }),
    );
    assert.equal(
      drawing.container.firstElementChild.getAttribute("class"),
      "input-field error",
    );
    const input = drawing.container.querySelector("input");
    assert.equal(input.getAttribute("aria-invalid"), "true");
    const message = document.getElementById(
      input.getAttribute("aria-describedby"),
    );
    assert.equal(message.textContent, "Podaj adres e-mail.");
    assert.equal(message.getAttribute("class"), "input-field-message");
    assert.equal(message.hidden, false);
    assert.equal(drawing.container.querySelector("label").htmlFor, input.id);
  });
});

test("a field that leaves the error state by a new render shows no error, points at no message and hides it", async () => {
  await withPage(async ({ document }) => {
    const props = { label: "Adres e-mail", visibleLabel: true };
    const drawing = await drawn(
      document,
      createElement(ReactTextField, { ...props, error: "Podaj adres e-mail." }),
    );
    await inAct(() =>
      drawing.root.render(
        createElement(ReactTextField, { ...props, error: null }),
      ),
    );
    const input = drawing.container.querySelector("input");
    assert.equal(
      drawing.container.firstElementChild.getAttribute("class"),
      "input-field",
    );
    assert.equal(input.hasAttribute("aria-invalid"), false);
    assert.equal(input.hasAttribute("aria-describedby"), false);
    const message = drawing.container.querySelector(".input-field-message");
    assert.equal(message.hidden, true);
    assert.equal(message.textContent, "");
  });
});

// Breaks: an uncontrolled field shows "alan" here, and a handler that is not called leaves `seen`
// empty.
test("a typed value reaches the screen's handler and stays in a controlled field", async () => {
  // decision: D-265 "Each shared control in `src/browser/view/controls/` has one form, a React component"
  await withPage(async ({ document }) => {
    const seen = [];
    const drawing = await drawn(
      document,
      createElement(ReactTextField, {
        label: "Adres e-mail",
        value: "ala",
        onChange: (event) => seen.push(event.target.value),
      }),
    );
    const input = drawing.container.querySelector("input");
    await typeInto(input, "alan");
    assert.deepEqual(seen, ["alan"]);
    assert.equal(
      input.value,
      "ala",
      "the field shows the value the screen holds",
    );
  });
});

// --- the sentence under a form -----------------------------------------------------------------

const SENTENCE = "Nie udało się zalogować. Spróbuj ponownie.";

test("the form warning is an alert paragraph with the class form-warning, shown with its sentence and hidden without", async () => {
  // decision: D-44 "A form's server refusal and loss of connection appear as one sentence below the form in `warning`"
  await withPage(async ({ document }) => {
    const shown = drawnElement(
      await drawn(
        document,
        createElement(ReactFormWarning, { sentence: SENTENCE }),
      ),
    );
    assert.equal(shown.nodeName, "P");
    assert.equal(shown.getAttribute("class"), "form-warning");
    assert.equal(shown.getAttribute("role"), "alert");
    assert.equal(shown.textContent, SENTENCE);
    assert.equal(shown.hidden, false);

    const hidden = drawnElement(
      await drawn(
        document,
        createElement(ReactFormWarning, { sentence: null }),
      ),
    );
    assert.equal(hidden.hidden, true);
    assert.equal(hidden.textContent, "");
  });
});

test("the form note is a status paragraph with the class form-note, shown with its sentence and hidden without", async () => {
  await withPage(async ({ document }) => {
    const shown = drawnElement(
      await drawn(
        document,
        createElement(ReactFormNote, { sentence: SENTENCE }),
      ),
    );
    assert.equal(shown.nodeName, "P");
    assert.equal(shown.getAttribute("class"), "form-note");
    assert.equal(shown.getAttribute("role"), "status");
    assert.equal(shown.textContent, SENTENCE);
    assert.equal(shown.hidden, false);

    const hidden = drawnElement(
      await drawn(document, createElement(ReactFormNote, { sentence: null })),
    );
    assert.equal(hidden.hidden, true);
    assert.equal(hidden.textContent, "");
  });
});

test("a warning that was shown and then cleared is hidden and empty again", async () => {
  await withPage(async ({ document }) => {
    const drawing = await drawn(
      document,
      createElement(ReactFormWarning, { sentence: SENTENCE }),
    );
    await inAct(() =>
      drawing.root.render(createElement(ReactFormWarning, { sentence: null })),
    );
    const warning = drawnElement(drawing);
    assert.equal(warning.hidden, true);
    assert.equal(warning.textContent, "");
    assert.equal(warning.getAttribute("class"), "form-warning");
  });
});

// --- the pick cell -----------------------------------------------------------------------------

const PICK_TEXT = "Kopnij";
const PICK_ICON = "boot-kick";
const PICK_REASON = "nie znasz jeszcze celu";

test("a pick cell available is a button of its group, not pressed, with its name", async () => {
  // decision: D-265 "Each shared control in `src/browser/view/controls/` has one form, a React component"
  await withPage(async ({ document }) => {
    const cell = drawnElement(
      await drawn(document, createElement(ReactPickCell, { text: PICK_TEXT })),
    );
    assert.deepEqual(attributesOf(cell), {
      type: "button",
      class: "button pick-cell",
      "aria-pressed": "false",
    });
    assert.equal(cell.textContent, PICK_TEXT);
  });
});

test("a pick cell chosen carries the class selected and aria-pressed true", async () => {
  await withPage(async ({ document }) => {
    const cell = drawnElement(
      await drawn(
        document,
        createElement(ReactPickCell, { text: PICK_TEXT, chosen: true }),
      ),
    );
    assert.deepEqual(attributesOf(cell), {
      type: "button",
      class: "button pick-cell selected",
      "aria-pressed": "true",
    });
  });
});

test("a greyed pick cell is aria-disabled, not disabled, and shows its reason inside it", async () => {
  // decision: D-289 "The pick of the rule panel holds nothing undiscovered, and what is discovered but may not be picked stands greyed with its reason"
  await withPage(async ({ document }) => {
    const cell = drawnElement(
      await drawn(
        document,
        createElement(ReactPickCell, {
          text: PICK_TEXT,
          greyed: true,
          reason: PICK_REASON,
        }),
      ),
    );
    assert.deepEqual(attributesOf(cell), {
      type: "button",
      class: "button pick-cell greyed",
      "aria-pressed": "false",
      "aria-disabled": "true",
    });
    const reason = cell.querySelector(".pick-cell-reason");
    assert.equal(reason.textContent, PICK_REASON);
    assert.equal(cell.textContent, PICK_TEXT + PICK_REASON);
  });
});

test("a pick cell chosen and greyed carries both classes, and a greyed cell with no reason draws none", async () => {
  await withPage(async ({ document }) => {
    const both = drawnElement(
      await drawn(
        document,
        createElement(ReactPickCell, {
          text: PICK_TEXT,
          chosen: true,
          greyed: true,
          reason: PICK_REASON,
        }),
      ),
    );
    assert.equal(
      both.getAttribute("class"),
      "button pick-cell selected greyed",
    );
    assert.equal(both.getAttribute("aria-pressed"), "true");
    assert.equal(both.getAttribute("aria-disabled"), "true");

    const unreasoned = drawnElement(
      await drawn(
        document,
        createElement(ReactPickCell, { text: PICK_TEXT, greyed: true }),
      ),
    );
    assert.equal(unreasoned.querySelector(".pick-cell-reason"), null);
    assert.equal(unreasoned.textContent, PICK_TEXT);
  });
});

test("a pick cell with the icon of an action draws it as a hidden mask of that file, before its name", async () => {
  await withPage(async ({ document }) => {
    const cell = drawnElement(
      await drawn(
        document,
        createElement(ReactPickCell, { text: PICK_TEXT, icon: PICK_ICON }),
      ),
    );
    const icon = cell.querySelector(".icon-mask");
    assert.equal(icon.getAttribute("aria-hidden"), "true");
    assert.equal(
      icon.getAttribute("style").includes(`/icons/${PICK_ICON}.svg`),
      true,
      "the icon names the file of the action's icon",
    );
    assert.equal(cell.firstElementChild, icon);
    assert.equal(cell.textContent, PICK_TEXT);

    const bare = drawnElement(
      await drawn(document, createElement(ReactPickCell, { text: PICK_TEXT })),
    );
    assert.equal(bare.querySelector(".icon-mask"), null);
  });
});

// Breaks: a greyed cell that calls `onPick` fills `picks` at the first click; one that is
// `disabled` in place of aria-disabled loses the attribute asserted here and drops out of the
// keyboard's reach, which D-289 keeps for reading its reason; a cell that gives no pick when
// available fails the last check.
test("a greyed pick cell gives no pick, an available one gives one", async () => {
  // decision: D-289 "The pick of the rule panel holds nothing undiscovered, and what is discovered but may not be picked stands greyed with its reason"
  await withPage(async ({ document }) => {
    const picks = [];
    const onPick = () => picks.push("pick");

    const greyed = drawnElement(
      await drawn(
        document,
        createElement(ReactPickCell, {
          text: PICK_TEXT,
          greyed: true,
          reason: PICK_REASON,
          onPick,
        }),
      ),
    );
    await press(greyed);
    assert.equal(greyed.getAttribute("aria-disabled"), "true");
    assert.equal(greyed.hasAttribute("disabled"), false);
    assert.deepEqual(picks, [], "a greyed cell gives no pick");

    const available = drawnElement(
      await drawn(
        document,
        createElement(ReactPickCell, { text: PICK_TEXT, onPick }),
      ),
    );
    await press(available);
    assert.deepEqual(picks, ["pick"], "an available cell gives a pick");
  });
});

// --- the select list ---------------------------------------------------------------------------

const SELECT_OPTIONS = [
  ["alfa", "Program Alfa"],
  ["beta", "Program Beta"],
];

test("a select list holds its positions in their order, shows the value it is given and is named by aria-label", async () => {
  // decision: D-265 "Each shared control in `src/browser/view/controls/` has one form, a React component"
  await withPage(async ({ document }) => {
    const drawing = await drawn(
      document,
      createElement(ReactSelectList, {
        label: "Program:",
        options: SELECT_OPTIONS,
        value: "beta",
        onChange: () => {},
      }),
    );
    const select = drawnElement(drawing);
    assert.equal(select.nodeName, "SELECT");
    assert.deepEqual(attributesOf(select), {
      class: "select-list",
      "aria-label": "Program:",
    });
    const options = [...select.querySelectorAll("option")].map((option) => [
      option.value,
      option.textContent,
    ]);
    assert.deepEqual(options, [
      ["alfa", "Program Alfa"],
      ["beta", "Program Beta"],
    ]);
    assert.equal(select.value, "beta");
  });
});

test("a select list with no positions holds no option", async () => {
  await withPage(async ({ document }) => {
    const select = drawnElement(
      await drawn(
        document,
        createElement(ReactSelectList, { label: "Program:", options: [] }),
      ),
    );
    assert.equal(select.querySelectorAll("option").length, 0);
    assert.equal(select.getAttribute("class"), "select-list");
  });
});

test("a disabled select list is disabled", async () => {
  await withPage(async ({ document }) => {
    const select = drawnElement(
      await drawn(
        document,
        createElement(ReactSelectList, {
          label: "Program:",
          options: SELECT_OPTIONS,
          value: "alfa",
          disabled: true,
          onChange: () => {},
        }),
      ),
    );
    assert.equal(select.disabled, true);
  });
});

// Breaks: a select that keeps its own value and ignores the screen's (uncontrolled) shows `beta`
// here, and a handler that is not called on the change fails the first assertion.
test("a choice in a select list reaches the screen's handler and a controlled list keeps the value the screen holds", async () => {
  // decision: D-265 "Each shared control in `src/browser/view/controls/` has one form, a React component"
  await withPage(async ({ document, window }) => {
    const seen = [];
    const drawing = await drawn(
      document,
      createElement(ReactSelectList, {
        label: "Program:",
        options: SELECT_OPTIONS,
        value: "alfa",
        onChange: (event) => seen.push(event.target.value),
      }),
    );
    const select = drawing.container.querySelector("select");
    await inAct(() => {
      select.value = "beta";
      select.dispatchEvent(new window.Event("change", { bubbles: true }));
    });
    assert.deepEqual(seen, ["beta"]);
    assert.equal(
      select.value,
      "alfa",
      "the list shows the value the screen holds",
    );
  });
});

// --- the number field --------------------------------------------------------------------------

// The range of a number field: the condition kind's number, which the commit rule reads too.
const RANGE = { defaultValue: 1, min: 0, max: 10, step: 1 };
// The rule the program editor gives the field: `readNumberField` over the range of the number.
const RANGE_RULE = (text, held) => readNumberField(text, held, RANGE);
// A trip count: a safe integer from 1 up (D-181).
const TRIP_RANGE = {
  defaultValue: 1,
  min: 1,
  max: Number.MAX_SAFE_INTEGER,
  step: 1,
};

/** A number field of the range `RANGE`, showing `value` and committing into `commits`. */
function rangeField(value, commits, extra = {}) {
  return createElement(ReactNumberField, {
    label: "Liczba",
    number: RANGE,
    rule: RANGE_RULE,
    value,
    onCommit: (committed) => commits.push(committed),
    ...extra,
  });
}

/** Presses Enter in `input`, as a browser sends the key to a focused field. */
function pressEnter(input) {
  return inAct(() =>
    input.dispatchEvent(
      new input.ownerDocument.defaultView.KeyboardEvent("keydown", {
        key: "Enter",
        bubbles: true,
      }),
    ),
  );
}

test("a number field is an input of the type number with the range and the step of its number, showing its value", async () => {
  // decision: D-265 "Each shared control in `src/browser/view/controls/` has one form, a React component"
  await withPage(async ({ document }) => {
    const drawing = await drawn(document, rangeField(3, []));
    assert.equal(
      drawing.container.firstElementChild.getAttribute("class"),
      "input-field",
    );
    const input = drawing.container.querySelector("input");
    assert.deepEqual(attributesOf(input), {
      type: "number",
      "aria-label": "Liczba",
      min: "0",
      max: "10",
      step: "1",
    });
    assert.equal(input.value, "3");
    const message = drawing.container.querySelector(".input-field-message");
    assert.equal(message.hidden, true);
  });
});

test("a number field in the error state shows its message, which the input points at", async () => {
  await withPage(async ({ document }) => {
    const drawing = await drawn(
      document,
      rangeField(3, [], { error: "Liczba jest poza zakresem." }),
    );
    assert.equal(
      drawing.container.firstElementChild.getAttribute("class"),
      "input-field error",
    );
    const input = drawing.container.querySelector("input");
    assert.equal(input.getAttribute("aria-invalid"), "true");
    const message = document.getElementById(
      input.getAttribute("aria-describedby"),
    );
    assert.equal(message.textContent, "Liczba jest poza zakresem.");
    assert.equal(message.hidden, false);
  });
});

test("a disabled number field is disabled", async () => {
  await withPage(async ({ document }) => {
    const drawing = await drawn(
      document,
      rangeField(3, [], { disabled: true }),
    );
    assert.equal(drawing.container.querySelector("input").disabled, true);
  });
});

// The acceptance criterion of the screen that redraws five times a second (D-03): the text typed
// into a number field, and its focus, stay while the screen renders other values. Breaks: a field
// that takes `value` on every render shows `3` or `4` here, not `7.5`, and one that commits on
// each keystroke makes `commits` longer than the one Enter gives. `7.5` is no whole value of the
// ten renders, so a field that shows the value in place of the text fails too.
test("a number field keeps the text typed into it through ten renders and commits it on Enter", async () => {
  await withPage(async ({ document }) => {
    const commits = [];
    const drawing = await drawn(document, rangeField(1, commits));
    const input = drawing.container.querySelector("input");
    await inAct(() => input.focus());
    await typeInto(input, "7.5");
    for (let round = 0; round < 10; round += 1) {
      await inAct(() => drawing.root.render(rangeField(round, commits)));
      assert.equal(input.value, "7.5", `render ${round} keeps the typed text`);
      assert.equal(input.ownerDocument.activeElement, input, "the focus stays");
    }
    assert.deepEqual(commits, [], "typing alone commits nothing");
    await pressEnter(input);
    // 7.5 rounds up to 8 on the step, and 8 differs from the last value shown, 9.
    assert.deepEqual(commits, [8]);
    assert.equal(input.value, "8", "the field shows the number it committed");
  });
});

test("a number field takes a new value from its props only while it has no focus", async () => {
  await withPage(async ({ document, window }) => {
    const commits = [];
    const drawing = await drawn(document, rangeField(1, commits));
    const input = drawing.container.querySelector("input");
    await inAct(() => drawing.root.render(rangeField(4, commits)));
    assert.equal(
      input.value,
      "4",
      "without the focus the field takes the value",
    );
    await inAct(() => input.focus());
    await typeInto(input, "7.5");
    await inAct(() => drawing.root.render(rangeField(9, commits)));
    assert.equal(input.value, "7.5", "with the focus the typed text stays");
    await inAct(() => input.blur());
    assert.deepEqual(
      commits,
      [8],
      "leaving the field commits the typed number",
    );
    await inAct(() => drawing.root.render(rangeField(8, commits)));
    assert.equal(input.value, "8", "after leaving, the field takes the value");
    assert.equal(window.document.activeElement, document.body);
  });
});

test("a number field commits the clamped number when left after typing, and nothing when left untouched", async () => {
  await withPage(async ({ document }) => {
    const commits = [];
    const drawing = await drawn(document, rangeField(3, commits));
    const input = drawing.container.querySelector("input");
    await inAct(() => input.focus());
    await inAct(() => input.blur());
    assert.deepEqual(commits, [], "a field left untouched commits nothing");

    await inAct(() => input.focus());
    await typeInto(input, "42");
    await inAct(() => input.blur());
    assert.deepEqual(
      commits,
      [10],
      "a number above the range commits the range's end",
    );

    await inAct(() => input.focus());
    await typeInto(input, "-5");
    await inAct(() => input.blur());
    assert.deepEqual(
      commits,
      [10, 0],
      "a number below the range commits the range's start",
    );
  });
});

// Breaks: a field that clamps to its own range, whatever rule it is given, commits 10 here, not
// 1000; one that commits where the rule says `commit: false` fills `commits` on Enter.
test("a number field commits what the rule the screen gives it reads, and not by a range rule of its own", async () => {
  // decision: D-395 "A shared control in `src/browser/view/controls/` imports no module of a screen that uses it, and a rule that belongs to one screen, such as the rule of the numbers a field takes, the control receives from that screen"
  await withPage(async ({ document }) => {
    const commits = [];
    const rule = (text) =>
      text === "5"
        ? { value: 5, commit: false }
        : { value: Number(text) * 100, commit: true };
    const render = (value) =>
      createElement(ReactNumberField, {
        label: "Liczba",
        number: RANGE,
        rule,
        value,
        onCommit: (committed) => commits.push(committed),
      });
    const drawing = await drawn(document, render(1));
    const input = drawing.container.querySelector("input");
    await inAct(() => input.focus());
    await pressEnter(input);
    await inAct(() => input.blur());
    assert.deepEqual(
      commits,
      [],
      "a field left with no typing commits nothing, whatever its rule reads",
    );
    await inAct(() => input.focus());
    await typeInto(input, "7");
    await pressEnter(input);
    assert.deepEqual(commits, [700], "the number the rule reads is committed");
    assert.equal(input.value, "700", "the field shows the number it committed");

    await typeInto(input, "5");
    await pressEnter(input);
    assert.deepEqual(commits, [700], "a reading that commits nothing is none");
    assert.equal(input.value, "5", "the field shows the reading's value");
  });
});

// The trip count rule (D-181), which the trip plan gives the field as `readTripCount`: text that is no
// whole count from 1 commits nothing, keeps the number shown and the draft in the field, and is
// reported through `onReject`, so the screen can show its message. Breaks: the range rule rounds
// "2.4" to 2 and clamps "0" to 1, so
// both commit here; a field that drops the draft on blur shows "3" in place of "0" and fails the
// draft check; a field that reports a count equal to the number shown as a rejection fails too.
test("a number field under the trip count rule commits nothing on text that is no whole count from 1, keeps its draft and reports it", async () => {
  // decision: D-395 "A shared control in `src/browser/view/controls/` imports no module of a screen that uses it, and a rule that belongs to one screen, such as the rule of the numbers a field takes, the control receives from that screen"
  // decision: D-181 "A position's count is a safe integer from 1 up — at most 9007199254740991, the largest integer a saved game state holds exactly — and below that bound its upper range is left to reality's clipping of the plan; an invalid entry keeps the previous count in the position and stays visible in the field, whose frame and message „Wpisz liczbę całkowitą od 1.” below it take the role `warning` until the player enters a valid count"
  await withPage(async ({ document }) => {
    const commits = [];
    let rejects = 0;
    const render = (value) =>
      createElement(ReactNumberField, {
        label: "Liczba",
        number: TRIP_RANGE,
        value,
        rule: readTripCount,
        onCommit: (committed) => commits.push(committed),
        onReject: () => {
          rejects += 1;
        },
      });
    const drawing = await drawn(document, render(3));
    const input = drawing.container.querySelector("input");
    await inAct(() => input.focus());
    await typeInto(input, "0");
    await inAct(() => input.blur());
    assert.deepEqual(commits, [], "the zero commits nothing");
    assert.equal(rejects, 1, "the zero is reported once");
    assert.equal(input.value, "0", "the draft stays in the field");
    await inAct(() => input.focus());
    assert.equal(input.value, "0", "a new focus keeps the draft");
    await typeInto(input, "2.4");
    await pressEnter(input);
    assert.deepEqual(commits, [], "a fraction commits nothing on Enter");
    assert.equal(rejects, 2, "the fraction is reported on Enter");
    await inAct(() => input.blur());
    assert.equal(rejects, 2, "leaving the rejected draft reports it no more");
    await inAct(() => input.focus());
    await typeInto(input, "5");
    await inAct(() => input.blur());
    assert.deepEqual(commits, [5], "a whole count from 1 commits as typed");
    assert.equal(rejects, 2);
    await inAct(() => drawing.root.render(render(5)));
    assert.equal(input.value, "5", "after the commit the field shows it");
    await inAct(() => input.focus());
    // "5.0" is a valid count that differs in text from the 5 shown, so the field sees a change.
    await typeInto(input, "5.0");
    await inAct(() => input.blur());
    assert.deepEqual(
      commits,
      [5, 5],
      "a valid count equal to the number shown is still reported",
    );
  });
});
