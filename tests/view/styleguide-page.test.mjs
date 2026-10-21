import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { before, test } from "node:test";
import { installDOM } from "./dom-support.mjs";

const root = new URL("../../", import.meta.url);
const tokens = JSON.parse(
  readFileSync(new URL("src/browser/view/design-tokens.json", root), "utf8"),
);
let page;
let factories;
let entry;
let catalog;
before(async () => {
  const compilation = spawnSync(
    process.execPath,
    [
      "node_modules/typescript-compiler/bin/tsc",
      "-p",
      "tsconfig.styleguide.json",
    ],
    { cwd: root, encoding: "utf8" },
  );
  assert.equal(compilation.status, 0, compilation.stdout + compilation.stderr);
  page = await import("../../.runs/styleguide/public/tools/styleguide/page.js");
  factories =
    await import("../../.runs/styleguide/public/src/browser/view/controls/index.js");
  entry =
    await import("../../.runs/styleguide/public/tools/styleguide/main.js");
  catalog =
    await import("../../.runs/styleguide/public/src/browser/sim/data/resources.js");
});

function construct(t, data = tokens) {
  const document = installDOM(t);
  // This records namespace identity, not SVG layout or browser painting.
  document.createElementNS = (namespace, tag) => {
    const element = document.createElement(tag);
    element.namespaceURI = namespace;
    return element;
  };
  return { document, element: page.createStyleguidePage(data) };
}

function all(element, predicate) {
  return [
    ...(predicate(element) ? [element] : []),
    ...element.children.flatMap((child) => all(child, predicate)),
  ];
}
function attr(element, name) {
  return element.getAttribute(name);
}
function hasClass(element, name) {
  return (element.getAttribute("class") ?? element.className)
    .split(/\s+/)
    .includes(name);
}
function text(element) {
  return element.textContent + element.children.map(text).join(" ");
}
function native(cell) {
  return all(cell, (element) =>
    ["BUTTON", "SELECT", "INPUT"].includes(element.tagName),
  );
}
const controls = {
  button: ["BUTTON", "createButton"],
  "destructive-button": ["BUTTON", "createDestructiveButton"],
  "selected-button": ["BUTTON", "createSelectedButton"],
  select: ["SELECT", "createSelect"],
  "number-field": ["INPUT", "createNumberField"],
  "text-field": ["INPUT", "createTextField"],
};
const states = [
  "default",
  "hover",
  "focus",
  "disabled",
  "error",
  "empty",
  "loading",
];

// Catches a missing factory/row, blank rendered cells and metadata-only coverage.
test("every shared factory constructs all applicable native state cells", (t) => {
  const { element, document } = construct(t);
  assert.deepEqual(
    Object.keys(factories.controlFactories).sort(),
    Object.keys(controls).sort(),
  );
  const cells = all(element, (node) => attr(node, "data-control") !== null);
  assert.equal(cells.length, 42);
  for (const [name, [tag, exported]] of Object.entries(controls)) {
    assert.equal(factories.controlFactories[name], factories[exported]);
    const row = cells.filter((cell) => attr(cell, "data-control") === name);
    assert.deepEqual(
      row.map((cell) => attr(cell, "data-state")),
      states,
    );
    for (const cell of row) {
      const state = attr(cell, "data-state");
      const inapplicable =
        state === "loading" ||
        (tag === "BUTTON" && ["empty", "error"].includes(state));
      assert.equal(
        attr(cell, "data-applicability"),
        inapplicable ? "inapplicable" : "rendered",
      );
      if (inapplicable) {
        assert.equal(native(cell).length, 0);
        const reasons = all(cell, (node) => hasClass(node, "state-reason"));
        assert.equal(reasons.length, 1);
        assert.ok(text(reasons[0]).trim().length > 20);
        continue;
      }
      const [control] = native(cell);
      assert.equal(native(cell).length, 1);
      assert.equal(control.tagName, tag);
      assert.ok(hasClass(control, "control"));
      assert.equal(control.disabled, state === "disabled");
      if (name === "selected-button")
        assert.equal(attr(control, "aria-pressed"), "true");
      if (name === "number-field") assert.equal(control.type, "number");
      if (name === "text-field") assert.equal(control.type, "text");
      if (state === "error") {
        assert.equal(attr(control, "aria-invalid"), "true");
        const [error] = all(cell, (node) => hasClass(node, "control-error"));
        assert.equal(error.hidden, false);
        assert.ok(text(error).trim());
        assert.equal(attr(control, "aria-describedby"), error.id);
      } else assert.equal(attr(control, "aria-invalid"), null);
      if (state === "empty") {
        assert.equal(control.value, "");
        if (tag === "SELECT") assert.equal(control.options.length, 0);
        else assert.ok(control.placeholder.trim());
      } else if (tag !== "BUTTON") {
        assert.ok(control.value);
        if (tag === "SELECT") assert.ok(control.options.length);
      }
      if (["hover", "focus"].includes(state)) {
        assert.ok(hasClass(control, `preview-${state}`));
        assert.match(text(cell), /Demonstracja/);
      }
    }
  }
  assert.equal(document.activeElement, null);
});

function declarations(css, selector) {
  const blocks = [
    ...css.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/([^{}]+)\{([^{}]*)\}/g),
  ].filter((match) =>
    match[1]
      .split(",")
      .map((item) => item.trim())
      .includes(selector),
  );
  assert.ok(blocks.length, `missing CSS selector ${selector}`);
  return Object.assign(
    {},
    ...blocks.map((block) =>
      Object.fromEntries(
        block[2]
          .trim()
          .split(";")
          .filter(Boolean)
          .map((item) => {
            const colon = item.indexOf(":");
            return [item.slice(0, colon).trim(), item.slice(colon + 1).trim()];
          }),
      ),
    ),
  );
}

// Catches previews drifting from real states and disabled text losing to variants.
test("demonstration declarations agree with real hover/focus and disabled precedence", () => {
  const real = readFileSync(
    new URL("src/browser/view/styles.css", root),
    "utf8",
  );
  const preview = readFileSync(
    new URL("tools/styleguide/styles.css", root),
    "utf8",
  );
  assert.deepEqual(
    declarations(preview, ".control.preview-hover:enabled"),
    declarations(real, ".control:enabled:hover"),
  );
  assert.deepEqual(
    declarations(preview, ".control.preview-focus"),
    declarations(real, ":focus-visible"),
  );
  const disabled = declarations(real, ".control:disabled");
  assert.equal(disabled.color, "var(--text-disabled)");
  assert.equal(
    declarations(real, ".destructive-button:disabled").color,
    disabled.color,
  );
  assert.equal(
    declarations(real, '.selected-button[aria-pressed="true"]:disabled').color,
    disabled.color,
  );
  assert.equal(
    declarations(real, ".control::placeholder").color,
    "var(--text-label)",
  );
  assert.equal(
    declarations(real, ".control:disabled::placeholder").color,
    disabled.color,
  );
});

// Catches a role omitted from the page and token data replaced with hardcoded data.
test("all token roles have semantic samples and source/value labels", (t) => {
  const data = structuredClone(tokens);
  data.roles.text.source = "Supplied test provenance";
  const { element } = construct(t, data);
  const roles = all(element, (node) => attr(node, "data-role") !== null);
  assert.equal(roles.length, 23);
  assert.deepEqual(
    roles.map((node) => attr(node, "data-role")).sort(),
    Object.keys(tokens.roles).sort(),
  );
  for (const role of roles) {
    const name = attr(role, "data-role");
    assert.ok(text(role).includes(String(data.roles[name].value)));
    assert.ok(text(role).includes(data.roles[name].source));
    assert.ok(all(role, (node) => hasClass(node, "role-example")).length);
  }
});

// Catches repainting instead of independent outlines or putting stock on the SVG.
test("static terrain combines independent tile, link, movement and icon states", (t) => {
  const { element } = construct(t);
  const samples = all(element, (node) => attr(node, "data-terrain") !== null);
  const required = [
    "hidden",
    "hidden-link",
    "hidden-step",
    "hidden-step-link",
    "revealed",
    "revealed-link",
    "character",
    "character-link",
    "step",
    "step-link",
    "depleted",
    "depleted-link",
    "depleted-character",
    "depleted-character-link",
    "depleted-step",
    "depleted-step-link",
  ];
  assert.deepEqual(
    samples.map((node) => attr(node, "data-terrain")),
    required,
  );
  for (const sample of samples) {
    const name = attr(sample, "data-terrain");
    const [svg] = all(sample, (node) => node.tagName === "SVG");
    assert.equal(svg.namespaceURI, "http://www.w3.org/2000/svg");
    assert.equal(all(svg, (node) => node.tagName === "TEXT").length, 0);
    const [tile] = all(svg, (node) => hasClass(node, "tile"));
    assert.equal(hasClass(tile, "revealed"), !name.startsWith("hidden"));
    assert.equal(hasClass(tile, "hovered"), name.includes("link"));
    assert.equal(all(svg, (node) => hasClass(node, "link-outline")).length, 1);
    assert.equal(
      all(svg, (node) => hasClass(node, "character")).length,
      Number(name.includes("character")),
    );
    assert.equal(
      all(svg, (node) => hasClass(node, "step-target")).length,
      Number(name.includes("step")),
    );
    const icons = all(svg, (node) => node.tagName === "IMAGE");
    assert.equal(icons.length, name.startsWith("hidden") ? 0 : 1);
    for (const icon of icons) {
      assert.equal(hasClass(icon, "dimmed"), name.includes("depleted"));
      assert.match(attr(icon, "href"), /^\.\/icons\/[^/]+\.svg$/);
      assert.ok(
        Object.values(catalog.RESOURCES).some(
          (resource) => attr(icon, "href") === `./icons/${resource.icon}.svg`,
        ),
      );
    }
    if (name.includes("depleted")) {
      const [row] = all(sample, (node) => hasClass(node, "sample-stock"));
      assert.match(text(row), /0/);
      assert.equal(hasClass(row, "sample-linked-row"), name.includes("link"));
    }
    assert.equal(all(sample, (node) => node.listeners.size > 0).length, 0);
  }
  const css = readFileSync(
    new URL("src/browser/view/styles.css", root),
    "utf8",
  );
  assert.equal(
    declarations(css, ".terrain-drawing .outline.character")["stroke-width"],
    "var(--character-width)",
  );
  assert.equal(
    declarations(css, ".terrain-drawing .outline.step-target")["stroke-width"],
    "var(--step-width)",
  );
  assert.equal(
    declarations(css, ".terrain-drawing .outline.step-target")[
      "stroke-dasharray"
    ],
    "var(--step-dash)",
  );
  assert.equal(
    declarations(css, ".terrain-drawing .link-outline")["stroke-width"],
    "var(--link-width)",
  );
  assert.equal(
    declarations(css, ".terrain-drawing .icon.dimmed").opacity,
    "var(--depleted)",
  );
});

test("typography and spacing samples consume the supplied scale", (t) => {
  const { element } = construct(t);
  const samples = all(element, (node) => attr(node, "data-token") !== null);
  for (const name of Object.keys(tokens.tokens).filter(
    (name) => name.startsWith("space-") || name.startsWith("font-"),
  )) {
    const matching = samples.filter(
      (node) => attr(node, "data-token") === name,
    );
    assert.equal(matching.length, 1, name);
    assert.ok(text(matching[0]).includes(String(tokens.tokens[name].value)));
  }
});

// Catches attribution anchors falling back to user-agent colors on a dark page.
test("actual footer links inherit the text role through a loaded author rule", (t) => {
  const { element } = construct(t);
  const html = readFileSync(
    new URL("tools/styleguide/index.html", root),
    "utf8",
  );
  const stylePaths = new Map([
    ["./styles.css", "src/browser/view/styles.css"],
    ["./styleguide.css", "tools/styleguide/styles.css"],
  ]);
  const loaded = [
    ...html.matchAll(/<link\s+rel="stylesheet"\s+href="([^"]+)"/g),
  ]
    .map((match) => stylePaths.get(match[1]))
    .filter(Boolean)
    .map((path) => readFileSync(new URL(path, root), "utf8"));
  const [footer] = all(element, (node) => node.tagName === "FOOTER");
  assert.equal(footer.parentNode, element);
  assert.ok(hasClass(element, "styleguide"));
  const anchors = all(footer, (node) => node.tagName === "A");
  assert.equal(anchors.length, 2);
  for (const anchor of anchors) {
    assert.equal(anchor.parentNode, footer);
    assert.ok(anchor.href.startsWith("https://"));
  }
  const css = loaded.join("\n");
  assert.equal(declarations(css, "footer").color, "var(--text-secondary)");
  assert.equal(declarations(css, ".styleguide footer a").color, "inherit");
});

// Catches silent partial rendering when the standalone builder omits/corrupts data.
test("startup consumes inert supplied token data and reports malformed data visibly", (t) => {
  const { document } = construct(t);
  const root = document.createElement("main");
  const data = document.createElement("script");
  document.getElementById = (id) => (id === "styleguide-root" ? root : data);
  data.textContent = JSON.stringify(tokens);
  entry.startStyleguide(document);
  assert.equal(
    all(root, (node) => attr(node, "data-control") !== null).length,
    42,
  );
  for (const invalid of [
    null,
    "{",
    "{}",
    JSON.stringify({ ...tokens, roles: {} }),
    JSON.stringify({ ...tokens, tokens: {} }),
  ]) {
    document.getElementById = (id) =>
      id === "styleguide-root" ? root : invalid === null ? null : data;
    data.textContent = invalid;
    assert.throws(() => entry.startStyleguide(document), /token/i);
    assert.match(text(root), /Nie można/);
    assert.equal(all(root, (node) => attr(node, "role") === "alert").length, 1);
    assert.equal(native(root).length, 0);
  }
});
