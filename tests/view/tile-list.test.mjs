// The list of revealed tiles beside the terrain drawing (spec section 5, choices C4 and C5).
import assert from "node:assert/strict";
import { test } from "node:test";
import { ARCHETYPES } from "../../dist/public/sim/data/archetypes.js";
import { MAPS } from "../../dist/public/sim/data/maps.js";
import {
  advanceMinutes,
  newGame,
  send,
  setProgram,
} from "../../dist/public/sim/game.js";
import { tileList } from "../../dist/public/view/tile-list.js";

const SENT = {
  mapId: Object.keys(MAPS)[0],
  archetypeId: Object.keys(ARCHETYPES)[0],
};
const ALWAYS = { kind: "always" };
const EXPLORE = [{ condition: ALWAYS, action: { kind: "explore" } }];

function sent(rules = EXPLORE) {
  const program = setProgram(newGame(), { rules }).state;
  return send(program, SENT, 1760000000000).state;
}

/** The map's resource ids in the map's order: r[0] … r[3]. */
const r = MAPS[SENT.mapId].resources.map((resource) => resource.id);

/** A sent game whose map run holds the given tiles instead of its drawn ones. */
function withTiles(tiles) {
  const state = sent();
  return { ...state, run: { ...state.run, tiles } };
}

function tile(col, row, revealed, stock) {
  return {
    col,
    row,
    at: { q: col - Math.floor(row / 2), r: row },
    revealed,
    stepMinutes: 5,
    stock,
  };
}

test("a game without a map run has no columns and no rows", () => {
  assert.deepEqual(tileList(newGame()), { columns: [], rows: [] });
});

test("the columns are the map's resources in the map's order, with names and icons from data", () => {
  const list = tileList(sent());
  assert.deepEqual(list.columns, [
    { resource: r[0], name: "patyk", href: "/icons/wood-stick.svg" },
    { resource: r[1], name: "jagoda", href: "/icons/berry-bush.svg" },
    { resource: r[2], name: "mech", href: "/icons/fern.svg" },
    { resource: r[3], name: "włókno", href: "/icons/flax.svg" },
  ]);
});

test("rows stand only for revealed tiles, in tile-list order, labelled (col, row)", () => {
  const state = withTiles([
    tile(0, 0, false, { [r[0]]: 12 }),
    tile(1, 0, true, { [r[0]]: 12, [r[2]]: 6 }),
    tile(2, 0, false, {}),
    tile(0, 1, true, {}),
    tile(1, 1, true, { [r[1]]: 0, [r[3]]: 6 }),
  ]);
  const list = tileList(state);
  assert.deepEqual(
    list.rows.map((row) => row.label),
    ["(1, 0)", "(0, 1)", "(1, 1)"],
  );
  assert.deepEqual(
    list.rows.map((row) => [row.col, row.row]),
    [
      [1, 0],
      [0, 1],
      [1, 1],
    ],
  );
});

test("each row gives the stock of every resource of the map, „—” where the tile lacks it, 0 when used up", () => {
  const state = withTiles([
    tile(1, 0, true, { [r[0]]: 12, [r[2]]: 6 }),
    tile(0, 1, true, {}),
    tile(1, 1, true, { [r[1]]: 0, [r[3]]: 6 }),
  ]);
  assert.deepEqual(
    tileList(state).rows.map((row) => row.cells),
    [
      ["12", "—", "6", "—"],
      ["—", "—", "—", "—"],
      ["—", "0", "—", "6"],
    ],
  );
});

test("a fresh map run lists nothing; exploring the entrance lists that tile with its stock", () => {
  const start = sent();
  assert.deepEqual(tileList(start).rows, []);
  const explored = advanceMinutes(start, 20).state;
  const entrance = MAPS[SENT.mapId].entrance;
  const source = explored.run.tiles.find(
    (t) => t.col === entrance.col && t.row === entrance.row,
  );
  assert.equal(source.revealed, true);
  const rows = tileList(explored).rows;
  assert.equal(rows.length, 1);
  assert.equal(rows[0].label, "(1, 1)");
  assert.deepEqual(
    rows[0].cells,
    r.map((id) =>
      Object.hasOwn(source.stock, id) ? String(source.stock[id]) : "—",
    ),
  );
});

// The campfire and a burning stick in the row of their tile (task, To do 15; spec Decision 5;
// D-63). The program below, on a backpack of 9 sticks, explores the entrance (20 minutes, to
// minute 20), crafts a campfire there (20 minutes and 6 sticks, to minute 40), lights it (5
// minutes and 2 sticks, to minute 45; it burns 60 minutes, to minute 105) and lights a stick (5
// minutes and the last stick, to minute 50; it burns 3 minutes, to minute 53).
const FIRE_PROGRAM = [
  { condition: ALWAYS, action: { kind: "craftCampfire" } },
  { condition: ALWAYS, action: { kind: "lightCampfire" } },
  { condition: ALWAYS, action: { kind: "lightItem" } },
  { condition: ALWAYS, action: { kind: "explore" } },
];

/** The map run of FIRE_PROGRAM, its backpack holding 9 sticks, at each of the given minutes. */
function fireRun(...minutes) {
  const start = sent(FIRE_PROGRAM);
  let state = {
    ...start,
    run: {
      ...start.run,
      character: {
        ...start.run.character,
        backpack: { ...start.run.character.backpack, [r[0]]: 9 },
      },
    },
  };
  const states = [];
  for (const minute of minutes) {
    state = advanceMinutes(state, minute - state.run.minute).state;
    states.push(state);
  }
  return states;
}

test("a tile's row gives its campfire's state: burning with the minutes left, or extinguished", () => {
  const [before, burning, extinguished] = fireRun(30, 63, 110);
  const fire = (state) =>
    tileList(state).rows.map((row) => [row.label, row.fire]);
  assert.deepEqual(fire(before), [["(1, 1)", []]]);
  assert.deepEqual(fire(burning), [
    ["(1, 1)", ["ognisko — płonie, zostało 42 min"]],
  ]);
  assert.deepEqual(fire(extinguished), [["(1, 1)", ["ognisko — wygasłe"]]]);
});

test("a burning stick stands in its tile's row after the campfire, and only while it burns", () => {
  const states = fireRun(50, 52, 53);
  assert.deepEqual(
    states.map((state) => tileList(state).rows.map((row) => row.fire)),
    [
      [["ognisko — płonie, zostało 55 min", "patyk — płonie, zostało 3 min"]],
      [["ognisko — płonie, zostało 53 min", "patyk — płonie, zostało 1 min"]],
      [["ognisko — płonie, zostało 52 min"]],
    ],
  );
});

test("the campfire's state leaves the row's stock as it was", () => {
  const [burning] = fireRun(63);
  const entrance = burning.run.tiles.find((t) => t.col === 1 && t.row === 1);
  assert.deepEqual(
    tileList(burning).rows[0].cells,
    r.map((id) =>
      Object.hasOwn(entrance.stock, id) ? String(entrance.stock[id]) : "—",
    ),
  );
});

/** A stand-in for the DOM calls of the terrain panel: no browser in Node. */
function fakeDocument() {
  function element(tag) {
    const attributes = {};
    const node = {
      tag,
      attributes,
      children: [],
      parent: null,
      dataset: new Proxy(
        {},
        {
          get: (_t, key) => attributes[`data-${String(key)}`],
          set: (_t, key, value) => {
            attributes[`data-${String(key)}`] = String(value);
            return true;
          },
        },
      ),
      classList: {
        add: (...names) => {
          const set = new Set((attributes.class ?? "").split(" "));
          for (const name of names) set.add(name);
          attributes.class = [...set].filter(Boolean).join(" ");
        },
        toggle: (name, force) => {
          const set = new Set((attributes.class ?? "").split(" "));
          if (force) set.add(name);
          else set.delete(name);
          attributes.class = [...set].filter(Boolean).join(" ");
        },
      },
      set className(value) {
        attributes.class = value;
      },
      get textContent() {
        return node.children
          .map((child) =>
            typeof child === "string" ? child : child.textContent,
          )
          .join("");
      },
      set textContent(value) {
        node.replaceChildren(String(value));
      },
      setAttribute(name, value) {
        attributes[name] = String(value);
      },
      getAttribute(name) {
        return attributes[name] ?? null;
      },
      addEventListener() {},
      append(...items) {
        for (const item of items) {
          if (typeof item !== "string") {
            item.remove();
            item.parent = node;
          }
          node.children.push(item);
        }
      },
      replaceChildren(...items) {
        node.children = [];
        node.append(...items);
      },
      remove() {
        if (node.parent)
          node.parent.children = node.parent.children.filter((c) => c !== node);
        node.parent = null;
      },
      querySelectorAll(selector) {
        const name = /^\[([\w-]+)\]$/.exec(selector)[1];
        const found = [];
        const visit = (n) => {
          for (const child of n.children)
            if (typeof child !== "string") {
              if (name in child.attributes) found.push(child);
              visit(child);
            }
        };
        visit(node);
        return found;
      },
    };
    return node;
  }
  return {
    createElement: (tag) => element(tag),
    createElementNS: (_ns, tag) => element(tag),
  };
}

const descendants = (node) =>
  node.children
    .filter((child) => typeof child !== "string")
    .flatMap((child) => [child, ...descendants(child)]);

test("on the panel the campfire's icon stands in its tile and the state in the row of the same key", async () => {
  const { createTerrainPanel } =
    await import("../../dist/public/view/terrain-panel.js");
  const saved = globalThis.document;
  globalThis.document = fakeDocument();
  try {
    const panel = createTerrainPanel();
    for (const [state, text] of [
      [fireRun(63)[0], "ognisko — płonie, zostało 42 min"],
      [fireRun(110)[0], "ognisko — wygasłe"],
    ]) {
      panel.update(state);
      const all = descendants(panel.element);
      const icons = all.filter(
        (e) => e.attributes.href === "/icons/campfire.svg",
      );
      assert.equal(icons.length, 1);
      const [icon] = icons;
      assert.equal(icon.attributes.class, "icon");
      assert.equal(icon.parent.attributes["data-tile"], "1,1");
      const row = all.find(
        (e) => e.tag === "tr" && e.attributes["data-tile"] === "1,1",
      );
      assert.ok(row.textContent.includes(text), row.textContent);
    }
  } finally {
    globalThis.document = saved;
  }
});
