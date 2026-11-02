// The shared controls in their two forms (spec decision 2, D-44): each control the card
// uses is drawn by its DOM function and by its React component, and the two must be the
// same element tree. The look lives in styles.css and reads these classes and attributes,
// so a difference between the forms is a difference on the screen. The harness stands
// first, and every comparison is of plain data: Node's assert on two rendered elements can
// take the machine's memory (spec decisions 1, 9 and 11).
import { assert, inAct, typeInto, withPage } from "./page-document.mjs";
import { test } from "node:test";
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import {
  createButton,
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
      createElement(ReactButton, { text: "Nie pamiętam hasła", disabled: true }),
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
