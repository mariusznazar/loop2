// The shared controls in their two forms (D-44, D-265): each control the card
// uses is drawn by its DOM function and by its React component, and the two must be the
// same element tree. The look lives in styles.css and reads these classes and attributes,
// so a difference between the forms is a difference on the screen. The harness stands
// first, and every comparison is of plain data: Node's assert on two rendered elements can
// take the machine's memory (D-264, D-268).
import { assert, inAct, typeInto, withPage } from "./page-document.mjs";
import { test } from "node:test";
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import {
  createButton,
  setButtonExpanded,
  setButtonSelected,
  setButtonWaiting,
} from "../../dist/browser/view/controls/button.js";
import {
  createFormNote,
  createFormWarning,
  createPasswordField,
  createTextField,
} from "../../dist/browser/view/controls/text-field.js";
import { ReactButton } from "../../dist/browser/view/controls/react-button.js";
import {
  ReactFormNote,
  ReactFormWarning,
  ReactPasswordField,
  ReactTextField,
} from "../../dist/browser/view/controls/react-text-field.js";
import {
  createPickCell,
  setPickCellChosen,
} from "../../dist/browser/view/controls/pick-cell.js";
import { ReactPickCell } from "../../dist/browser/view/controls/react-pick-cell.js";
import { createSelectList } from "../../dist/browser/view/controls/select-list.js";
import { createNumberField } from "../../dist/browser/view/controls/number-field.js";
import { ReactSelectList } from "../../dist/browser/view/controls/react-select-list.js";
import { ReactNumberField } from "../../dist/browser/view/controls/react-number-field.js";

// --- the element tree as plain data ------------------------------------------------------------

/** What an element looks like, as the style reads it: its tag and its classes. */
function target(element) {
  return `${element.nodeName.toLowerCase()}.${element.getAttribute("class") ?? ""}`;
}

/**
 * The attribute values that name another element (`id`, `for`, `aria-describedby`) are
 * replaced by what the element they point at is, since the forms number their ids apart.
 * A name that points at nothing keeps its text, so a dangling pointer differs.
 */
function pointing(value, targets) {
  return value
    .split(" ")
    .map((id) => (targets.has(id) ? `->${targets.get(id)}` : `dangling ${id}`))
    .join(" ");
}

/** The input's `value` attribute is left out: React writes it and it is no part of the look. */
function snapshot(element, targets) {
  const attributes = [...element.attributes]
    .filter(({ name }) => !(name === "value" && element.nodeName === "INPUT"))
    .map(({ name, value }) => {
      if (name === "id") return [name, `<${target(element)}>`];
      if (name === "for" || name === "aria-describedby") {
        return [name, pointing(value, targets)];
      }
      return [name, value];
    })
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
  const children = [...element.childNodes].flatMap((child) => {
    if (child.nodeType === 3) {
      return child.data === "" ? [] : [{ text: child.data }];
    }
    return child.nodeType === 1 ? [snapshot(child, targets)] : [];
  });
  return { tag: element.nodeName.toLowerCase(), attributes, children };
}

function tree(element) {
  const targets = new Map();
  for (const node of [element, ...element.querySelectorAll("[id]")]) {
    if (node.id) targets.set(node.id, target(node));
  }
  return snapshot(element, targets);
}

// --- drawing the two forms ---------------------------------------------------------------------

/** Draws `element` under the page's body in a React root, in act. */
async function drawn(document, element) {
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);
  await inAct(() => root.render(element));
  return { container, root };
}

/** The tree of the first element a React `element` draws. */
function drawnTree({ container }) {
  assert.equal(container.children.length, 1, "one element is drawn");
  return tree(container.firstElementChild);
}

/** Puts a DOM-made `element` into the page and returns its tree. */
function domTree(document, element) {
  document.body.append(element);
  return tree(element);
}

// --- the button --------------------------------------------------------------------------------

const BUTTON_TEXT = "Zaloguj";

test("a plain button is the same element in both forms", async () => {
  await withPage(async ({ document }) => {
    const drawing = await drawn(
      document,
      createElement(ReactButton, { text: BUTTON_TEXT }),
    );
    assert.deepEqual(
      drawnTree(drawing),
      domTree(document, createButton(BUTTON_TEXT)),
    );
  });
});

test("a button with an accessible name carries it as aria-label", async () => {
  await withPage(async ({ document }) => {
    const drawing = await drawn(
      document,
      createElement(ReactButton, { text: "×", label: "Zamknij" }),
    );
    assert.deepEqual(
      drawnTree(drawing),
      domTree(document, createButton("×", { label: "Zamknij" })),
    );
  });
});

test("a submit button is the same element in both forms", async () => {
  await withPage(async ({ document }) => {
    const drawing = await drawn(
      document,
      createElement(ReactButton, { text: BUTTON_TEXT, submit: true }),
    );
    const expected = tree(createButton(BUTTON_TEXT, { submit: true }));
    assert.deepEqual(drawnTree(drawing), expected);
    assert.equal(
      drawing.container.firstElementChild.getAttribute("type"),
      "submit",
    );
  });
});

test("a button selected in its group is the same element in both forms", async () => {
  await withPage(async ({ document }) => {
    const drawing = await drawn(
      document,
      createElement(ReactButton, { text: "Zaloguj się", selected: true }),
    );
    assert.deepEqual(
      drawnTree(drawing),
      domTree(document, createButton("Zaloguj się", { kind: "selected" })),
    );
  });
});

test("a button not selected in its group is the same element in both forms", async () => {
  await withPage(async ({ document }) => {
    const drawing = await drawn(
      document,
      createElement(ReactButton, { text: "Załóż konto", selected: false }),
    );
    const expected = createButton("Załóż konto");
    setButtonSelected(expected, false);
    assert.deepEqual(drawnTree(drawing), domTree(document, expected));
  });
});

// The secondary action (D-275): a further kind of the
// button, a plain `<button>` with the class `secondary`. The class is written out in each case,
// since two forms that both leave it out would agree and show a plain button.
test("a secondary action is the same element in both forms", async () => {
  await withPage(async ({ document }) => {
    const drawing = await drawn(
      document,
      createElement(ReactButton, {
        text: "Nie pamiętam hasła",
        kind: "secondary",
      }),
    );
    const { firstElementChild: button } = drawing.container;
    assert.equal(button.getAttribute("class"), "button secondary");
    assert.equal(button.getAttribute("type"), "button");
    assert.equal(button.hasAttribute("aria-pressed"), false);
    assert.deepEqual(
      drawnTree(drawing),
      domTree(
        document,
        createButton("Nie pamiętam hasła", { kind: "secondary" }),
      ),
    );
  });
});

test("a secondary action locked with its text is the same element in both forms", async () => {
  await withPage(async ({ document }) => {
    const drawing = await drawn(
      document,
      createElement(ReactButton, {
        text: "Wróć do logowania",
        kind: "secondary",
        disabled: true,
      }),
    );
    const { firstElementChild: button } = drawing.container;
    assert.equal(button.getAttribute("class"), "button secondary");
    assert.equal(button.disabled, true);
    const expected = createButton("Wróć do logowania", { kind: "secondary" });
    expected.disabled = true;
    assert.deepEqual(drawnTree(drawing), domTree(document, expected));
  });
});

// The destructive button (D-44): „Usuń”, „Zatrzymaj” and the rest draw the class `destructive`
// beside `button`, in both forms.
test("a destructive button is the same element in both forms", async () => {
  await withPage(async ({ document }) => {
    const drawing = await drawn(
      document,
      createElement(ReactButton, { text: "Usuń", kind: "destructive" }),
    );
    const { firstElementChild: button } = drawing.container;
    assert.equal(button.getAttribute("class"), "button destructive");
    assert.equal(button.getAttribute("type"), "button");
    assert.deepEqual(
      drawnTree(drawing),
      domTree(document, createButton("Usuń", { kind: "destructive" })),
    );
  });
});

test("a destructive button with an accessible name is the same element in both forms", async () => {
  await withPage(async ({ document }) => {
    const drawing = await drawn(
      document,
      createElement(ReactButton, {
        text: "Usuń",
        kind: "destructive",
        label: "Usuń regułę programu",
      }),
    );
    const expected = createButton("Usuń", {
      kind: "destructive",
      label: "Usuń regułę programu",
    });
    assert.deepEqual(drawnTree(drawing), domTree(document, expected));
    assert.equal(
      drawing.container.firstElementChild.getAttribute("aria-label"),
      "Usuń regułę programu",
    );
  });
});

// The kind `main` (D-274): the main look of a button that sends no form, such as „Wejdź” at a
// character in the card of a map. It is a button of the type `button`, never `submit`, with the
// class `main`, which styles.css draws as it draws a form's submit button.
test("a main button outside a form is the same element in both forms, of the type button with the class main", async () => {
  await withPage(async ({ document }) => {
    const drawing = await drawn(
      document,
      createElement(ReactButton, { text: "Wejdź", kind: "main" }),
    );
    const { firstElementChild: drawnButton } = drawing.container;
    assert.equal(drawnButton.getAttribute("type"), "button");
    assert.equal(drawnButton.getAttribute("class"), "button main");
    const expected = createButton("Wejdź", { kind: "main" });
    assert.equal(expected.getAttribute("type"), "button");
    assert.equal(expected.getAttribute("class"), "button main");
    assert.deepEqual(drawnTree(drawing), domTree(document, expected));
  });
});

test("a main button locked with its text is the same element in both forms", async () => {
  await withPage(async ({ document }) => {
    const drawing = await drawn(
      document,
      createElement(ReactButton, {
        text: "Wejdź",
        kind: "main",
        disabled: true,
      }),
    );
    const expected = createButton("Wejdź", { kind: "main" });
    expected.disabled = true;
    assert.equal(drawing.container.firstElementChild.disabled, true);
    assert.deepEqual(drawnTree(drawing), domTree(document, expected));
  });
});

// The open state (D-44): a button that opens and closes the block below it, the menu „Konto”
// first, carries `aria-expanded` with the value given; left out, it carries none, and the state
// has no look of its own, so the class stays `button` in both cases.
test("a button with aria-expanded true is the same element in both forms", async () => {
  await withPage(async ({ document }) => {
    const drawing = await drawn(
      document,
      createElement(ReactButton, { text: "Konto", expanded: true }),
    );
    const { firstElementChild: button } = drawing.container;
    assert.equal(button.getAttribute("aria-expanded"), "true");
    assert.equal(button.getAttribute("class"), "button");
    assert.deepEqual(
      drawnTree(drawing),
      domTree(document, createButton("Konto", { expanded: true })),
    );
  });
});

test("a button with aria-expanded false is the same element in both forms", async () => {
  await withPage(async ({ document }) => {
    const drawing = await drawn(
      document,
      createElement(ReactButton, { text: "Konto", expanded: false }),
    );
    const { firstElementChild: button } = drawing.container;
    assert.equal(button.getAttribute("aria-expanded"), "false");
    assert.equal(button.getAttribute("class"), "button");
    assert.deepEqual(
      drawnTree(drawing),
      domTree(document, createButton("Konto", { expanded: false })),
    );
  });
});

test("a button given no expanded state carries no aria-expanded in either form", async () => {
  await withPage(async ({ document }) => {
    const drawing = await drawn(
      document,
      createElement(ReactButton, { text: "Konto" }),
    );
    assert.equal(
      drawing.container.firstElementChild.hasAttribute("aria-expanded"),
      false,
    );
    const expected = createButton("Konto");
    assert.equal(expected.hasAttribute("aria-expanded"), false);
    assert.deepEqual(drawnTree(drawing), domTree(document, expected));
  });
});

test("a button whose open state is set on the DOM form is the same element as the React form", async () => {
  await withPage(async ({ document }) => {
    const drawing = await drawn(
      document,
      createElement(ReactButton, { text: "Konto", expanded: true }),
    );
    const expected = createButton("Konto");
    setButtonExpanded(expected, true);
    assert.deepEqual(drawnTree(drawing), domTree(document, expected));
  });
});

// The tab (pytania 2 and 2c): the button selected in its group, kept as the same element with
// `aria-pressed`, with the class `tab` beside `selected`.
test("a tab selected in its group is the same element in both forms", async () => {
  await withPage(async ({ document }) => {
    const drawing = await drawn(
      document,
      createElement(ReactButton, {
        text: "Zaloguj się",
        kind: "tab",
        selected: true,
      }),
    );
    const { firstElementChild: button } = drawing.container;
    assert.equal(button.getAttribute("class"), "button tab selected");
    assert.equal(button.getAttribute("aria-pressed"), "true");
    const expected = createButton("Zaloguj się", { kind: "tab" });
    setButtonSelected(expected, true);
    assert.deepEqual(drawnTree(drawing), domTree(document, expected));
  });
});

test("a tab not selected in its group is the same element in both forms", async () => {
  await withPage(async ({ document }) => {
    const drawing = await drawn(
      document,
      createElement(ReactButton, {
        text: "Załóż konto",
        kind: "tab",
        selected: false,
      }),
    );
    const { firstElementChild: button } = drawing.container;
    assert.equal(button.getAttribute("class"), "button tab");
    assert.equal(button.getAttribute("aria-pressed"), "false");
    const expected = createButton("Załóż konto", { kind: "tab" });
    setButtonSelected(expected, false);
    assert.deepEqual(drawnTree(drawing), domTree(document, expected));
  });
});

test("a tab locked with its text, selected or not, is the same element in both forms", async () => {
  await withPage(async ({ document }) => {
    for (const selected of [true, false]) {
      const drawing = await drawn(
        document,
        createElement(ReactButton, {
          text: "Zaloguj się",
          kind: "tab",
          selected,
          disabled: true,
        }),
      );
      const { firstElementChild: button } = drawing.container;
      assert.equal(
        button.getAttribute("class"),
        selected ? "button tab selected" : "button tab",
      );
      assert.equal(button.disabled, true);
      const expected = createButton("Zaloguj się", { kind: "tab" });
      setButtonSelected(expected, selected);
      expected.disabled = true;
      assert.deepEqual(drawnTree(drawing), domTree(document, expected));
    }
  });
});

test("a waiting submit button is the same element in both forms", async () => {
  await withPage(async ({ document }) => {
    const drawing = await drawn(
      document,
      createElement(ReactButton, {
        text: BUTTON_TEXT,
        submit: true,
        waitingText: "Logowanie…",
      }),
    );
    const expected = createButton(BUTTON_TEXT, { submit: true });
    setButtonWaiting(expected, "Logowanie…");
    assert.deepEqual(drawnTree(drawing), domTree(document, expected));
    const { firstElementChild: button } = drawing.container;
    assert.equal(button.disabled, true);
    assert.equal(button.getAttribute("aria-busy"), "true");
  });
});

// A button of a card that waits is locked, its text kept: the DOM screen sets `disabled` on it.
test("a button locked with its text is the same element in both forms", async () => {
  await withPage(async ({ document }) => {
    const drawing = await drawn(
      document,
      createElement(ReactButton, {
        text: "Nie pamiętam hasła",
        disabled: true,
      }),
    );
    const expected = createButton("Nie pamiętam hasła");
    expected.disabled = true;
    assert.deepEqual(drawnTree(drawing), domTree(document, expected));
  });
});

test("a button of a group locked with its text is the same element in both forms", async () => {
  await withPage(async ({ document }) => {
    const drawing = await drawn(
      document,
      createElement(ReactButton, {
        text: "Zaloguj się",
        selected: true,
        disabled: true,
      }),
    );
    const expected = createButton("Zaloguj się", { kind: "selected" });
    expected.disabled = true;
    assert.deepEqual(drawnTree(drawing), domTree(document, expected));
  });
});

test("a button that stopped waiting is the same element as one that never waited", async () => {
  await withPage(async ({ document }) => {
    const drawing = await drawn(
      document,
      createElement(ReactButton, {
        text: BUTTON_TEXT,
        submit: true,
        waitingText: "Logowanie…",
      }),
    );
    await inAct(() =>
      drawing.root.render(
        createElement(ReactButton, {
          text: BUTTON_TEXT,
          submit: true,
          waitingText: null,
        }),
      ),
    );
    const expected = createButton(BUTTON_TEXT, { submit: true });
    setButtonWaiting(expected, "Logowanie…");
    setButtonWaiting(expected, null);
    assert.deepEqual(drawnTree(drawing), domTree(document, expected));
  });
});

test("a click on the button reaches the screen's handler, and a waiting button gives none", async () => {
  await withPage(async ({ document, window }) => {
    const clicks = [];
    const onClick = () => clicks.push("click");
    const drawing = await drawn(
      document,
      createElement(ReactButton, { text: BUTTON_TEXT, onClick }),
    );
    const { firstElementChild: button } = drawing.container;
    await inAct(() =>
      button.dispatchEvent(new window.Event("click", { bubbles: true })),
    );
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
    await inAct(() => button.click());
    assert.deepEqual(clicks, ["click"], "a disabled button is not clicked");
  });
});

// --- the text field and the password field -----------------------------------------------------

const FIELD_CASES = [
  {
    name: "a text field with a hidden label",
    react: () => ({ type: "text", label: "Adres e-mail" }),
    dom: () => createTextField({ label: "Adres e-mail" }),
  },
  {
    name: "a text field with a visible label, a hint and an autocomplete token",
    react: () => ({
      type: "text",
      label: "Adres e-mail",
      visibleLabel: true,
      hint: "np. ala@example.com",
      autocomplete: "email",
    }),
    dom: () =>
      createTextField({
        label: "Adres e-mail",
        visibleLabel: true,
        hint: "np. ala@example.com",
        autocomplete: "email",
      }),
  },
  {
    name: "a password field with a visible label",
    react: () => ({
      type: "password",
      label: "Hasło",
      visibleLabel: true,
      autocomplete: "new-password",
    }),
    dom: () =>
      createPasswordField({
        label: "Hasło",
        visibleLabel: true,
        autocomplete: "new-password",
      }),
  },
  {
    name: "a text field in the error state",
    react: () => ({
      type: "text",
      label: "Adres e-mail",
      visibleLabel: true,
      error: "Podaj adres e-mail.",
    }),
    dom: () => {
      const field = createTextField({
        label: "Adres e-mail",
        visibleLabel: true,
      });
      field.setError("Podaj adres e-mail.");
      return field;
    },
  },
  {
    name: "a password field in the error state with a hidden label",
    react: () => ({
      type: "password",
      label: "Hasło",
      error: "Hasło jest za krótkie.",
    }),
    dom: () => {
      const field = createPasswordField({ label: "Hasło" });
      field.setError("Hasło jest za krótkie.");
      return field;
    },
  },
  {
    name: "a field that left the error state",
    react: () => ({ type: "text", label: "Adres e-mail", error: null }),
    dom: () => {
      const field = createTextField({ label: "Adres e-mail" });
      field.setError("Podaj adres e-mail.");
      field.setError(null);
      return field;
    },
  },
  {
    name: "a field locked while it waits for the server",
    react: () => ({
      type: "password",
      label: "Hasło",
      visibleLabel: true,
      disabled: true,
    }),
    dom: () => {
      const field = createPasswordField({ label: "Hasło", visibleLabel: true });
      field.input.disabled = true;
      return field;
    },
  },
  {
    // jsdom does not reflect the property `spellcheck`, which the DOM screen sets, to the attribute.
    name: "an address field with the keyboard of an address and no spell check",
    react: () => ({
      type: "text",
      label: "Adres e-mail",
      visibleLabel: true,
      inputMode: "email",
      spellCheck: false,
    }),
    dom: () => {
      const field = createTextField({
        label: "Adres e-mail",
        visibleLabel: true,
      });
      field.input.setAttribute("inputmode", "email");
      field.input.setAttribute("spellcheck", "false");
      return field;
    },
  },
];

for (const { name, react, dom } of FIELD_CASES) {
  test(`${name} is the same element tree in both forms`, async () => {
    await withPage(async ({ document }) => {
      const { type, ...props } = react();
      const component =
        type === "password" ? ReactPasswordField : ReactTextField;
      const drawing = await drawn(document, createElement(component, props));
      assert.deepEqual(drawnTree(drawing), domTree(document, dom().element));
    });
  });
}

test("a field that leaves the error state by a new render is the same element tree as the DOM form", async () => {
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
    const field = createTextField(props);
    field.setError("Podaj adres e-mail.");
    field.setError(null);
    assert.deepEqual(drawnTree(drawing), domTree(document, field.element));
  });
});

test("the error message of a field is the one its input points at, in both forms", async () => {
  await withPage(async ({ document }) => {
    const drawing = await drawn(
      document,
      createElement(ReactTextField, {
        label: "Adres e-mail",
        visibleLabel: true,
        error: "Podaj adres e-mail.",
      }),
    );
    const input = drawing.container.querySelector("input");
    const message = document.getElementById(
      input.getAttribute("aria-describedby"),
    );
    assert.equal(message.textContent, "Podaj adres e-mail.");
    const label = drawing.container.querySelector("label");
    assert.equal(label.htmlFor, input.id);
  });
});

test("a typed value reaches the screen's handler and stays in a controlled field", async () => {
  await withPage(async ({ document }) => {
    const seen = [];
    const render = (value) =>
      createElement(ReactTextField, {
        label: "Adres e-mail",
        value,
        onChange: (event) => seen.push(event.target.value),
      });
    const drawing = await drawn(document, render("ala"));
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

test("the form warning is the same element in both forms, shown and hidden", async () => {
  await withPage(async ({ document }) => {
    const shown = await drawn(
      document,
      createElement(ReactFormWarning, { sentence: SENTENCE }),
    );
    const warning = createFormWarning();
    warning.set(SENTENCE);
    assert.deepEqual(drawnTree(shown), domTree(document, warning.element));

    const hidden = await drawn(
      document,
      createElement(ReactFormWarning, { sentence: null }),
    );
    assert.deepEqual(
      drawnTree(hidden),
      domTree(document, createFormWarning().element),
    );
  });
});

test("the form note is the same element in both forms, shown and hidden", async () => {
  await withPage(async ({ document }) => {
    const shown = await drawn(
      document,
      createElement(ReactFormNote, { sentence: SENTENCE }),
    );
    const note = createFormNote();
    note.set(SENTENCE);
    assert.deepEqual(drawnTree(shown), domTree(document, note.element));

    const hidden = await drawn(
      document,
      createElement(ReactFormNote, { sentence: null }),
    );
    assert.deepEqual(
      drawnTree(hidden),
      domTree(document, createFormNote().element),
    );
  });
});

test("a warning that was shown and then cleared is the same element as one never shown", async () => {
  await withPage(async ({ document }) => {
    const drawing = await drawn(
      document,
      createElement(ReactFormWarning, { sentence: SENTENCE }),
    );
    await inAct(() =>
      drawing.root.render(createElement(ReactFormWarning, { sentence: null })),
    );
    const warning = createFormWarning();
    warning.set(SENTENCE);
    warning.set(null);
    assert.deepEqual(drawnTree(drawing), domTree(document, warning.element));
  });
});

// --- the pick cell (D-265, D-288, D-289, D-291) -------------------------------------------------

const PICK_TEXT = "Kopnij";
const PICK_ICON = "boot-kick";
const PICK_REASON = "nie znasz jeszcze celu";

test("a pick cell available is the same element in both forms", async () => {
  await withPage(async ({ document }) => {
    const drawing = await drawn(
      document,
      createElement(ReactPickCell, { text: PICK_TEXT }),
    );
    assert.deepEqual(
      drawnTree(drawing),
      domTree(document, createPickCell({ text: PICK_TEXT })),
    );
  });
});

test("a pick cell chosen is the same element in both forms", async () => {
  await withPage(async ({ document }) => {
    const drawing = await drawn(
      document,
      createElement(ReactPickCell, { text: PICK_TEXT, chosen: true }),
    );
    assert.deepEqual(
      drawnTree(drawing),
      domTree(document, createPickCell({ text: PICK_TEXT, chosen: true })),
    );
  });
});

test("a greyed pick cell with its reason is the same element in both forms", async () => {
  await withPage(async ({ document }) => {
    const drawing = await drawn(
      document,
      createElement(ReactPickCell, {
        text: PICK_TEXT,
        greyed: true,
        reason: PICK_REASON,
      }),
    );
    assert.deepEqual(
      drawnTree(drawing),
      domTree(
        document,
        createPickCell({ text: PICK_TEXT, greyed: true, reason: PICK_REASON }),
      ),
    );
  });
});

test("a pick cell with its icon of an action is the same element in both forms", async () => {
  await withPage(async ({ document }) => {
    const drawing = await drawn(
      document,
      createElement(ReactPickCell, { text: PICK_TEXT, icon: PICK_ICON }),
    );
    const drawnIcon = drawing.container.querySelector(".icon-mask");
    assert.equal(
      drawnIcon.getAttribute("style").includes(`/icons/${PICK_ICON}.svg`),
      true,
      "the React form draws the file of the action's icon",
    );
    const domCell = createPickCell({ text: PICK_TEXT, icon: PICK_ICON });
    assert.equal(
      domCell
        .querySelector(".icon-mask")
        .getAttribute("style")
        .includes(`/icons/${PICK_ICON}.svg`),
      true,
      "the DOM form draws the file of the action's icon",
    );
    assert.deepEqual(drawnTree(drawing), domTree(document, domCell));
  });
});

test("a greyed pick cell with its icon and its reason is the same element in both forms", async () => {
  await withPage(async ({ document }) => {
    const drawing = await drawn(
      document,
      createElement(ReactPickCell, {
        text: PICK_TEXT,
        icon: PICK_ICON,
        chosen: true,
        greyed: true,
        reason: PICK_REASON,
      }),
    );
    assert.deepEqual(
      drawnTree(drawing),
      domTree(
        document,
        createPickCell({
          text: PICK_TEXT,
          icon: PICK_ICON,
          chosen: true,
          greyed: true,
          reason: PICK_REASON,
        }),
      ),
    );
  });
});

test("a pick cell chosen in place is the same element as one drawn chosen", async () => {
  await withPage(async ({ document }) => {
    const cell = createPickCell({ text: PICK_TEXT, icon: PICK_ICON });
    setPickCellChosen(cell, true);
    const actual = domTree(document, cell);
    const expected = domTree(
      document,
      createPickCell({ text: PICK_TEXT, icon: PICK_ICON, chosen: true }),
    );
    assert.deepEqual(actual, expected);
  });
});

test("a greyed pick cell is aria-disabled, not disabled, and a click on it reaches no handler in either form", async () => {
  await withPage(async ({ document, window }) => {
    const picks = [];
    const onPick = () => picks.push("pick");
    const click = (element) =>
      inAct(() =>
        element.dispatchEvent(new window.Event("click", { bubbles: true })),
      );

    const drawing = await drawn(
      document,
      createElement(ReactPickCell, {
        text: PICK_TEXT,
        greyed: true,
        reason: PICK_REASON,
        onPick,
      }),
    );
    const reactGreyed = drawing.container.firstElementChild;
    await click(reactGreyed);
    assert.equal(reactGreyed.getAttribute("aria-disabled"), "true");
    assert.equal(reactGreyed.hasAttribute("disabled"), false);
    assert.deepEqual(picks, [], "React: a greyed cell gives no pick");

    const domGreyed = createPickCell({
      text: PICK_TEXT,
      greyed: true,
      reason: PICK_REASON,
      onPick,
    });
    document.body.append(domGreyed);
    await click(domGreyed);
    assert.equal(domGreyed.getAttribute("aria-disabled"), "true");
    assert.equal(domGreyed.hasAttribute("disabled"), false);
    assert.deepEqual(picks, [], "DOM: a greyed cell gives no pick");

    const domAvailable = createPickCell({ text: PICK_TEXT, onPick });
    document.body.append(domAvailable);
    await click(domAvailable);
    assert.deepEqual(picks, ["pick"], "DOM: an available cell gives a pick");
  });
});

// --- the select list and the number field (D-44, D-265) -----------------------------------------

const SELECT_OPTIONS = [
  ["alfa", "Program Alfa"],
  ["beta", "Program Beta"],
];

// The range of a number field: the condition kind's number, which the commit rule reads too.
const RANGE = { defaultValue: 1, min: 0, max: 10, step: 1 };
// A trip count: a safe integer from 1 up (D-181).
const TRIP_RANGE = {
  defaultValue: 1,
  min: 1,
  max: Number.MAX_SAFE_INTEGER,
  step: 1,
};

test("a select list with positions is the same element tree in both forms", async () => {
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
    assert.equal(drawing.container.querySelector("select").value, "beta");
    const expected = createSelectList("Program:", SELECT_OPTIONS);
    expected.value = "beta";
    assert.deepEqual(drawnTree(drawing), domTree(document, expected));
  });
});

test("a select list with no positions is the same element tree in both forms", async () => {
  await withPage(async ({ document }) => {
    const drawing = await drawn(
      document,
      createElement(ReactSelectList, { label: "Program:", options: [] }),
    );
    assert.deepEqual(
      drawnTree(drawing),
      domTree(document, createSelectList("Program:")),
    );
  });
});

test("a disabled select list is the same element tree in both forms", async () => {
  await withPage(async ({ document }) => {
    const drawing = await drawn(
      document,
      createElement(ReactSelectList, {
        label: "Program:",
        options: SELECT_OPTIONS,
        value: "alfa",
        disabled: true,
        onChange: () => {},
      }),
    );
    assert.equal(drawing.container.querySelector("select").disabled, true);
    const expected = createSelectList("Program:", SELECT_OPTIONS);
    expected.disabled = true;
    assert.deepEqual(drawnTree(drawing), domTree(document, expected));
  });
});

// Breaks: a select that keeps its own value and ignores the screen's (uncontrolled) shows `beta`
// here, and a handler that is not called on the change fails the first assertion.
test("a choice in a select list reaches the screen's handler and a controlled list keeps the value the screen holds", async () => {
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

test("a number field is the same element tree in both forms", async () => {
  await withPage(async ({ document }) => {
    const drawing = await drawn(
      document,
      createElement(ReactNumberField, {
        label: "Liczba",
        number: RANGE,
        value: 3,
        onCommit: () => {},
      }),
    );
    const expected = createNumberField({
      label: "Liczba",
      min: 0,
      max: 10,
      step: 1,
    });
    expected.input.value = "3";
    assert.deepEqual(drawnTree(drawing), domTree(document, expected.element));
  });
});

test("a number field in the error state is the same element tree in both forms", async () => {
  await withPage(async ({ document }) => {
    const drawing = await drawn(
      document,
      createElement(ReactNumberField, {
        label: "Liczba",
        number: RANGE,
        value: 3,
        error: "Liczba jest poza zakresem.",
        onCommit: () => {},
      }),
    );
    const expected = createNumberField({
      label: "Liczba",
      min: 0,
      max: 10,
      step: 1,
    });
    expected.setError("Liczba jest poza zakresem.");
    assert.deepEqual(drawnTree(drawing), domTree(document, expected.element));
  });
});

test("a disabled number field is the same element tree in both forms", async () => {
  await withPage(async ({ document }) => {
    const drawing = await drawn(
      document,
      createElement(ReactNumberField, {
        label: "Liczba",
        number: RANGE,
        value: 3,
        disabled: true,
        onCommit: () => {},
      }),
    );
    const expected = createNumberField({
      label: "Liczba",
      min: 0,
      max: 10,
      step: 1,
    });
    expected.input.disabled = true;
    assert.deepEqual(drawnTree(drawing), domTree(document, expected.element));
  });
});

// The acceptance criterion of the screen that redraws five times a second (D-03): the text typed
// into a number field, and its focus, stay while the screen renders other values. Breaks: a field
// that takes `value` on every render shows `3` or `4` here, not `7.5`, and one that commits on
// each keystroke makes `commits` longer than the one Enter gives. `7.5` is no whole value of the
// ten renders, so a field that shows the value in place of the text fails too.
test("a number field keeps the text typed into it through ten renders and commits it on Enter", async () => {
  await withPage(async ({ document, window }) => {
    const commits = [];
    const render = (value) =>
      createElement(ReactNumberField, {
        label: "Liczba",
        number: RANGE,
        value,
        onCommit: (committed) => commits.push(committed),
      });
    const drawing = await drawn(document, render(1));
    const input = drawing.container.querySelector("input");
    await inAct(() => input.focus());
    await typeInto(input, "7.5");
    for (let round = 0; round < 10; round += 1) {
      await inAct(() => drawing.root.render(render(round)));
      assert.equal(input.value, "7.5", `render ${round} keeps the typed text`);
      assert.equal(input.ownerDocument.activeElement, input, "the focus stays");
    }
    assert.deepEqual(commits, [], "typing alone commits nothing");
    await inAct(() =>
      input.dispatchEvent(
        new window.KeyboardEvent("keydown", { key: "Enter", bubbles: true }),
      ),
    );
    // 7.5 rounds up to 8 on the step, and 8 differs from the last value shown, 9.
    assert.deepEqual(commits, [8]);
    assert.equal(input.value, "8", "the field shows the number it committed");
  });
});

test("a number field takes a new value from its props only while it has no focus", async () => {
  await withPage(async ({ document, window }) => {
    const commits = [];
    const render = (value) =>
      createElement(ReactNumberField, {
        label: "Liczba",
        number: RANGE,
        value,
        onCommit: (committed) => commits.push(committed),
      });
    const drawing = await drawn(document, render(1));
    const input = drawing.container.querySelector("input");
    await inAct(() => drawing.root.render(render(4)));
    assert.equal(
      input.value,
      "4",
      "without the focus the field takes the value",
    );
    await inAct(() => input.focus());
    await typeInto(input, "7.5");
    await inAct(() => drawing.root.render(render(9)));
    assert.equal(input.value, "7.5", "with the focus the typed text stays");
    await inAct(() => input.blur());
    assert.deepEqual(
      commits,
      [8],
      "leaving the field commits the typed number",
    );
    await inAct(() => drawing.root.render(render(8)));
    assert.equal(input.value, "8", "after leaving, the field takes the value");
    assert.equal(window.document.activeElement, document.body);
  });
});

test("a number field commits the clamped number when left after typing, and nothing when left untouched", async () => {
  await withPage(async ({ document }) => {
    const commits = [];
    const render = (value) =>
      createElement(ReactNumberField, {
        label: "Liczba",
        number: RANGE,
        value,
        onCommit: (committed) => commits.push(committed),
      });
    const drawing = await drawn(document, render(3));
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
  });
});

// The trip count rule (D-181) of the opt-in `rule="trip"`: text that is no whole count from 1 commits
// nothing, keeps the number shown and the draft in the field, and is reported through `onReject`, so
// the screen can show its message. Breaks: the range rule rounds "2.4" to 2 and clamps "0" to 1, so
// both commit here; a field that drops the draft on blur shows "3" in place of "0" and fails the
// draft check; a field that reports a count equal to the number shown as a rejection fails too.
test("a number field under the trip count rule commits nothing on text that is no whole count from 1, keeps its draft and reports it", async () => {
  await withPage(async ({ document, window }) => {
    const commits = [];
    let rejects = 0;
    const render = (value) =>
      createElement(ReactNumberField, {
        label: "Liczba",
        number: TRIP_RANGE,
        value,
        rule: "trip",
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
    await inAct(() =>
      input.dispatchEvent(
        new window.KeyboardEvent("keydown", { key: "Enter", bubbles: true }),
      ),
    );
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
