import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { MAPS } from "../../dist/public/sim/data/maps.js";
import { ARCHETYPES } from "../../dist/public/sim/data/archetypes.js";
import {
  advanceMinutes,
  newGame,
  send,
  setProgram,
} from "../../dist/public/sim/game.js";
import { createTerrainPanel } from "../../dist/public/view/terrain-panel.js";

// Only the SVG/table DOM operations used by the renderer; no layout engine.
class Element {
  constructor(tag) {
    this.tag = tag;
    this.children = [];
    this.attributes = new Map();
    this.dataset = {};
    this.listeners = new Map();
    this.className = "";
    this.textContent = "";
    this.classList = {
      contains: (name) => this.className.split(" ").includes(name),
      add: (name) => this.classList.toggle(name, true),
      toggle: (name, on) => {
        const names = new Set(this.className.split(" ").filter(Boolean));
        if (on) names.add(name);
        else names.delete(name);
        this.className = [...names].join(" ");
      },
    };
  }
  setAttribute(name, value) {
    if (name === "class") this.className = String(value);
    else this.attributes.set(name, String(value));
  }
  getAttribute(name) {
    if (name === "data-tile")
      return this.attributes.get(name) ?? this.dataset.tile ?? null;
    return this.attributes.get(name) ?? null;
  }
  append(...children) {
    this.children.push(...children);
    for (const child of children)
      if (typeof child !== "string") child.parentNode = this;
  }
  replaceChildren(...children) {
    this.children = [];
    this.append(...children);
  }
  querySelectorAll(selector) {
    assert.equal(selector, "[data-tile]");
    return descendants(this).filter(
      (node) => node.getAttribute("data-tile") !== null,
    );
  }
  closest(selector) {
    assert.ok(["[data-tile]", "tbody tr[data-tile]"].includes(selector));
    for (let node = this; node; node = node.parentNode) {
      if (
        node.getAttribute("data-tile") !== null &&
        (selector === "[data-tile]" ||
          (node.tag === "tr" && node.parentNode.tag === "tbody"))
      )
        return node;
    }
    return null;
  }
  addEventListener(type, listener) {
    assert.equal(this.listeners.has(type), false);
    this.listeners.set(type, listener);
  }
  emit(type, target = this) {
    this.listeners.get(type)?.({ target });
  }
}

const descendants = (element) =>
  element.children.flatMap((child) =>
    typeof child === "string" ? [] : [child, ...descendants(child)],
  );
const hasClass = (name) => (node) => node.classList.contains(name);
const textOf = (node) =>
  typeof node === "string"
    ? node
    : node.textContent + node.children.map(textOf).join("");

function panelFor(t, state) {
  const saved = [
    globalThis.document,
    globalThis.Element,
    globalThis.HTMLElement,
  ];
  globalThis.Element = globalThis.HTMLElement = Element;
  globalThis.document = {
    createElement: (tag) => new Element(tag),
    createElementNS: (_namespace, tag) => new Element(tag),
  };
  t.after(() => {
    [globalThis.document, globalThis.Element, globalThis.HTMLElement] = saved;
  });
  const panel = createTerrainPanel();
  panel.update(state);
  return {
    panel,
    drawing: panel.element.children[0],
    list: panel.element.children[1],
  };
}

function walking() {
  const prepared = setProgram(newGame(), {
    rules: [{ condition: { kind: "always" }, action: { kind: "wander" } }],
  }).state;
  let state = send(
    prepared,
    {
      mapId: Object.keys(MAPS)[0],
      archetypeId: Object.keys(ARCHETYPES)[0],
    },
    1760000000000,
  ).state;
  for (let minute = 0; minute < 80 && !state.run.current.stepTo; minute += 1)
    state = advanceMinutes(state, 1).state;
  assert.ok(state.run.current.stepTo);
  return {
    ...state,
    run: {
      ...state.run,
      tiles: state.run.tiles.map((tile) => ({ ...tile, revealed: true })),
    },
  };
}

test("hover links each movement outline to its row while retaining a separate inset tile outline", (t) => {
  const { drawing, list } = panelFor(t, walking());
  const tiles = drawing.children.filter(hasClass("tile"));
  const outlines = drawing.children.filter(hasClass("outline"));
  assert.equal(outlines.length, 2);
  assert.deepEqual(outlines.map((node) => node.className).sort(), [
    "outline character",
    "outline step-target",
  ]);
  assert.ok(
    drawing.children.indexOf(outlines[0]) >
      drawing.children.indexOf(tiles.at(-1)),
  );
  for (const outline of outlines) {
    const tile = tiles.find(
      (node) =>
        node.children[0].getAttribute("points") ===
        outline.getAttribute("points"),
    );
    const body = tile.children[0];
    const key = tile.getAttribute("data-tile");
    const row = descendants(list).find(
      (node) => node.tag === "tr" && node.getAttribute("data-tile") === key,
    );
    const link = tile.children.find(hasClass("link-outline"));
    assert.ok(
      link,
      "the hovered tile needs an outline independent of the movement outline",
    );
    assert.notEqual(link.getAttribute("points"), body.getAttribute("points"));
    const point = (node) =>
      node
        .getAttribute("points")
        .split(" ")
        .map((pair) => pair.split(",").map(Number));
    const outer = point(body);
    const inner = point(link);
    assert.equal(inner.length, outer.length);
    inner.forEach(([x, y], index) =>
      assert.ok(
        Math.hypot(x - outer[index][0], y - outer[index][1]) >= 4 - 1e-9,
      ),
    );
    const before = [...body.attributes];
    drawing.emit(
      "pointerover",
      tile.children.find((node) => node.tag === "image") ?? body,
    );
    assert.ok(tile.classList.contains("hovered"));
    assert.ok(row.classList.contains("hovered"));
    assert.deepEqual([...body.attributes], before);
    drawing.emit("pointerleave");
    assert.equal(tile.classList.contains("hovered"), false);
    list.emit("pointerover", row.children[0]);
    assert.ok(tile.classList.contains("hovered"));
    assert.ok(row.classList.contains("hovered"));
    list.emit("pointerleave");
    assert.equal(row.classList.contains("hovered"), false);
  }
  assert.deepEqual([...drawing.listeners.keys()].sort(), [
    "pointerleave",
    "pointerover",
  ]);
});

test("redraw preserves the hovered key and unchanged runs preserve the rendered nodes", (t) => {
  const state = walking();
  const { panel, drawing, list } = panelFor(t, state);
  const tile = drawing.children.find(hasClass("revealed"));
  drawing.emit("pointerover", tile.children[0]);
  panel.update({ ...state });
  assert.equal(drawing.children[0], tile);
  panel.update({ ...state, run: { ...state.run } });
  const marked = panel.element
    .querySelectorAll("[data-tile]")
    .filter(hasClass("hovered"));
  assert.equal(marked.length, 2);
  assert.ok(
    marked.every(
      (node) =>
        node.getAttribute("data-tile") === tile.getAttribute("data-tile"),
    ),
  );
  list.emit("pointerover", list.children[0].children[0].children[0]);
  assert.equal(
    panel.element.querySelectorAll("[data-tile]").filter(hasClass("hovered"))
      .length,
    0,
  );
  panel.update(newGame());
  assert.equal(drawing.children.length, 0);
});

test("a hidden tile keeps its body and empty icons when hovered without a list row", (t) => {
  const state = walking();
  const hidden = {
    ...state,
    run: {
      ...state.run,
      tiles: state.run.tiles.map((tile, index) =>
        index === 0 ? { ...tile, revealed: false } : tile,
      ),
    },
  };
  const { drawing, list } = panelFor(t, hidden);
  const tile = drawing.children[0];
  assert.equal(tile.classList.contains("revealed"), false);
  assert.equal(tile.children.filter((node) => node.tag === "image").length, 0);
  const points = tile.children[0].getAttribute("points");
  drawing.emit("pointerover", tile.children[0]);
  assert.ok(tile.classList.contains("hovered"));
  assert.equal(tile.children[0].getAttribute("points"), points);
  assert.equal(descendants(list).filter(hasClass("hovered")).length, 0);
  drawing.emit("pointerleave");
  assert.equal(tile.classList.contains("hovered"), false);
});

test("zero stock dims only its icon and numbers remain in list cells", (t) => {
  const state = walking();
  const target = state.run.tiles.find(
    (tile) => Object.keys(tile.stock).length > 1,
  );
  const resource = Object.keys(target.stock)[0];
  const patched = {
    ...state,
    run: {
      ...state.run,
      tiles: state.run.tiles.map((tile) =>
        tile === target
          ? { ...tile, stock: { ...tile.stock, [resource]: 0 } }
          : tile,
      ),
    },
  };
  const { drawing, list } = panelFor(t, patched);
  const group = drawing.children.find(
    (node) => node.getAttribute("data-tile") === `${target.col},${target.row}`,
  );
  assert.equal(group.children.filter(hasClass("dimmed")).length, 1);
  assert.ok(
    group.children
      .filter(hasClass("dimmed"))
      .every((node) => node.tag === "image"),
  );
  assert.equal(textOf(drawing), "");
  assert.ok(
    descendants(list).some(
      (node) => node.tag === "td" && node.textContent === "0",
    ),
  );
});

test("terrain style roles isolate tile fill, link lines, movement outlines and depleted icons", () => {
  const css = readFileSync(
    new URL("../../src/browser/view/styles.css", import.meta.url),
    "utf8",
  );
  const rules = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)];
  const declaration = (selector, property) => {
    const matching = rules.filter((match) =>
      match[1].trim().split(/,\s*/).includes(selector),
    );
    assert.ok(matching.length > 0, selector);
    return matching
      .flatMap((rule) => rule[2].split(";"))
      .map((item) => item.trim().split(/:\s*/))
      .findLast(([name]) => name === property)?.[1];
  };
  assert.equal(
    declaration(".terrain-drawing .tile-body", "fill"),
    "var(--tile-hidden)",
  );
  assert.equal(
    declaration(".terrain-drawing .tile.revealed .tile-body", "fill"),
    "var(--tile-revealed)",
  );
  assert.equal(
    declaration(".terrain-drawing .tile-body", "stroke"),
    "var(--tile-edge)",
  );
  assert.equal(
    declaration(".terrain-drawing .link-outline", "stroke"),
    "var(--link-highlight)",
  );
  assert.equal(
    declaration(".terrain-drawing .link-outline", "stroke-width"),
    "var(--link-width)",
  );
  assert.equal(
    declaration(".terrain-drawing .link-outline", "visibility"),
    "hidden",
  );
  assert.equal(
    declaration(".terrain-drawing .tile.hovered .link-outline", "visibility"),
    "visible",
  );
  for (const selector of [
    ".terrain-drawing .outline",
    ".terrain-drawing .link-outline",
  ]) {
    assert.equal(declaration(selector, "fill"), "none");
    assert.equal(declaration(selector, "pointer-events"), "none");
  }
  assert.equal(
    declaration(".terrain-drawing .outline.character", "stroke"),
    "var(--character)",
  );
  assert.equal(
    declaration(".terrain-drawing .outline.character", "stroke-width"),
    "var(--character-width)",
  );
  assert.equal(
    declaration(".terrain-drawing .outline.step-target", "stroke"),
    "var(--character)",
  );
  assert.equal(
    declaration(".terrain-drawing .outline.step-target", "stroke-width"),
    "var(--step-width)",
  );
  assert.equal(
    declaration(".terrain-drawing .outline.step-target", "stroke-dasharray"),
    "var(--step-dash)",
  );
  assert.equal(
    declaration(".terrain-drawing .icon.dimmed", "opacity"),
    "var(--depleted)",
  );
  assert.equal(
    declaration(".tile-list tbody th", "border-left"),
    "var(--link-width) solid transparent",
  );
  assert.equal(
    declaration(".tile-list tbody tr.hovered th", "border-left-color"),
    "var(--link-highlight)",
  );
  for (const rule of rules.filter((match) => match[1].includes("hovered")))
    assert.doesNotMatch(rule[2], /(?:fill|background)\s*:/);
});
