import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { installDOM } from "./dom-support.mjs";

const moduleURL = new URL(
  "../../dist/public/view/controls/index.js",
  import.meta.url,
);
let controls;
try {
  controls = await import(moduleURL);
} catch (error) {
  if (error.code !== "ERR_MODULE_NOT_FOUND") throw error;
}

test("six public factories remain registered under their semantic names", () => {
  assert.ok(controls, "shared native control factories must exist");
  assert.deepEqual(Object.keys(controls.controlFactories), [
    "button",
    "destructive-button",
    "selected-button",
    "select",
    "number-field",
    "text-field",
  ]);
  for (const [key, name] of [
    ["button", "createButton"],
    ["destructive-button", "createDestructiveButton"],
    ["selected-button", "createSelectedButton"],
    ["select", "createSelect"],
    ["number-field", "createNumberField"],
    ["text-field", "createTextField"],
  ]) {
    assert.equal(typeof controls[name], "function", name);
    assert.equal(controls.controlFactories[key], controls[name]);
  }
});

for (const [name, variant, pressed] of [
  ["createButton", "button", null],
  ["createDestructiveButton", "destructive-button", null],
  ["createSelectedButton", "selected-button", "true"],
]) {
  test(`${name} creates a native non-submit button and preserves callbacks and node access`, (t) => {
    assert.ok(controls, "shared native control factories must exist");
    const document = installDOM(t);
    let clicks = 0;
    const button = controls[name]({
      text: "Action",
      label: "Accessible action",
      onClick: () => clicks++,
    });
    assert.equal(button.tagName, "BUTTON");
    assert.equal(button.type, "button");
    assert.equal(button.textContent, "Action");
    assert.equal(button.getAttribute("aria-label"), "Accessible action");
    assert.equal(button.className, `control ${variant}`);
    assert.equal(button.getAttribute("aria-pressed"), pressed);
    button.focus();
    button.textContent = "Updated";
    button.click();
    assert.equal(clicks, 1);
    assert.equal(document.activeElement, button);
    button.disabled = true;
    button.click();
    assert.equal(clicks, 1);
    button.disabled = false;
    button.click();
    assert.equal(clicks, 2);
    const disabled = controls[name]({ text: "Unavailable", disabled: true });
    assert.equal(disabled.disabled, true);
  });
}

test("selected group buttons expose both selected and unselected states through native attributes", (t) => {
  assert.ok(controls, "shared native control factories must exist");
  installDOM(t);
  const button = controls.createSelectedButton({
    text: "Choice",
    selected: false,
  });
  assert.equal(button.getAttribute("aria-pressed"), "false");
  button.setAttribute("aria-pressed", "true");
  assert.equal(button.getAttribute("aria-pressed"), "true");
});

for (const [name, tag, type] of [
  ["createSelect", "SELECT", null],
  ["createNumberField", "INPUT", "number"],
  ["createTextField", "INPUT", "text"],
]) {
  test(`${name} exposes a stable native value and forwards changes without game validation`, (t) => {
    assert.ok(controls, "shared native control factories must exist");
    const document = installDOM(t);
    const changes = [];
    const field = controls[name]({
      label: "Value",
      value: "2",
      options: [
        { value: "2", label: "Two" },
        { value: "7", label: "Seven" },
      ],
      onChange: (value) => changes.push(value),
    });
    assert.equal(field.control.tagName, tag);
    if (type) assert.equal(field.control.type, type);
    assert.equal(field.control.getAttribute("aria-label"), "Value");
    assert.equal(field.control.value, "2");
    assert.equal(field.control.disabled, false);
    assert.equal(field.element.children[0], field.control);
    field.control.focus();
    field.control.value = "7";
    field.control.dispatchEvent({ type: "change" });
    assert.deepEqual(changes, ["7"]);
    assert.equal(field.control.value, "7");
    assert.equal(document.activeElement, field.control);
    assert.equal(field.error.hidden, true);
    const disabled = controls[name]({ label: "Unavailable", disabled: true });
    assert.equal(disabled.control.disabled, true);
  });

  test(`${name} associates its visible warning and removes only that association on clear`, (t) => {
    assert.ok(controls, "shared native control factories must exist");
    installDOM(t);
    const field = controls[name]({ label: "Value" });
    const other = controls[name]({ label: "Other value" });
    field.control.setAttribute("aria-describedby", "help");
    field.setError("Invalid entry");
    assert.equal(field.control.getAttribute("aria-invalid"), "true");
    assert.equal(field.error.textContent, "Invalid entry");
    assert.equal(field.error.hidden, false);
    assert.equal(field.error.className, "control-error");
    assert.equal(field.element.children[1], field.error);
    assert.ok(field.error.id);
    assert.equal(
      field.control.getAttribute("aria-describedby"),
      `help ${field.error.id}`,
    );
    other.setError("Other error");
    assert.notEqual(field.error.id, other.error.id);
    field.setError("Still invalid");
    assert.equal(
      field.control.getAttribute("aria-describedby"),
      `help ${field.error.id}`,
    );
    field.setError(null);
    assert.equal(field.control.getAttribute("aria-invalid"), null);
    assert.equal(field.control.getAttribute("aria-describedby"), "help");
    assert.equal(field.error.hidden, true);
    assert.equal(field.error.textContent, "");
    other.setError("");
    assert.equal(other.control.getAttribute("aria-describedby"), null);
    assert.equal(other.error.hidden, true);
    field.setError(" ");
    assert.equal(field.control.getAttribute("aria-invalid"), null);
  });
}

test("an empty select has no invented options while supplied choices retain labels and values", (t) => {
  assert.ok(controls, "shared native control factories must exist");
  installDOM(t);
  const empty = controls.createSelect({ label: "Choice" });
  assert.equal(empty.control.children.length, 0);
  assert.equal(empty.control.value, "");
  const field = controls.createSelect({
    label: "Choice",
    options: [
      { value: "a", label: "First" },
      { value: "b", label: "Second" },
    ],
  });
  assert.deepEqual(
    field.control.children.map((option) => [
      option.tagName,
      option.value,
      option.textContent,
    ]),
    [
      ["OPTION", "a", "First"],
      ["OPTION", "b", "Second"],
    ],
  );
});

test("clearing an error preserves help added by a caller during editing and keeps focus", (t) => {
  assert.ok(controls, "shared native control factories must exist");
  const document = installDOM(t);
  const field = controls.createNumberField({ label: "Value" });
  field.control.focus();
  field.setError("Invalid entry");
  field.control.setAttribute(
    "aria-describedby",
    `range ${field.error.id} explanation`,
  );
  field.setError(null);
  assert.equal(
    field.control.getAttribute("aria-describedby"),
    "range explanation",
  );
  assert.equal(field.control.getAttribute("aria-invalid"), null);
  assert.equal(document.activeElement, field.control);
  assert.equal(field.error.hidden, true);
});

for (const name of ["createNumberField", "createTextField"]) {
  test(`${name} starts empty with a useful placeholder and accepts a caller placeholder`, (t) => {
    assert.ok(controls, "shared native control factories must exist");
    installDOM(t);
    const field = controls[name]({ label: "Value" });
    assert.equal(field.control.value, "");
    assert.equal(field.control.placeholder, "Value");
    const custom = controls[name]({
      label: "Value",
      placeholder: "Enter value",
    });
    assert.equal(custom.control.placeholder, "Enter value");
  });
}

const css = await readFile(
  new URL("../../src/browser/view/styles.css", import.meta.url),
  "utf8",
);
function declarations(selector) {
  const rules = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)];
  const match = rules.find(([, selectors]) =>
    selectors.trim().split(/,\s*/).includes(selector),
  );
  assert.ok(match, `missing style for ${selector}`);
  return Object.fromEntries(
    match[2]
      .trim()
      .split(";")
      .filter((line) => line.trim())
      .map((line) => {
        const colon = line.indexOf(":");
        return [line.slice(0, colon).trim(), line.slice(colon + 1).trim()];
      }),
  );
}

test("controls retain transparent defaults and use semantic selected, destructive and warning styles", () => {
  assert.equal(declarations("button").background, "transparent");
  assert.equal(declarations("button").color, "var(--text)");
  assert.equal(declarations(".destructive-button").color, "var(--danger)");
  assert.equal(
    declarations('.selected-button[aria-pressed="true"]').color,
    "var(--text-strong)",
  );
  assert.equal(
    declarations('.selected-button[aria-pressed="true"]')["border-color"],
    "var(--selected)",
  );
  assert.equal(
    declarations('.control[aria-invalid="true"]')["border-color"],
    "var(--warning)",
  );
  assert.equal(declarations(".control-error").color, "var(--warning)");
  assert.equal(
    declarations(".control::placeholder").color,
    "var(--text-label)",
  );
  assert.equal(declarations(".control::placeholder").opacity, "inherit");
});

test("hover preserves the frame and disabled styles take precedence over both button variants", () => {
  const hover = declarations(".control:enabled:hover");
  assert.deepEqual(hover, { background: "var(--highlight)" });
  for (const selector of [
    ".control:disabled",
    ".destructive-button:disabled",
    '.selected-button[aria-pressed="true"]:disabled',
  ]) {
    assert.equal(declarations(selector).color, "var(--text-disabled)");
  }
});

test("shared focus remains universal and separate from selected borders", () => {
  assert.deepEqual(declarations(":focus-visible"), {
    outline: "var(--focus-width) solid var(--focus)",
    "outline-offset": "var(--focus-offset)",
  });
});
