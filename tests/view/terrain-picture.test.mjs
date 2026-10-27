import assert from "node:assert/strict";
import { test } from "node:test";
import { MAPS } from "../../dist/public/sim/data/maps.js";
import { RESOURCES } from "../../dist/public/sim/data/resources.js";
import {
  advanceMinutes,
  createCharacter,
  newGame,
  send,
  setProgram,
} from "../../dist/public/sim/game.js";
import { terrainPicture } from "../../dist/public/view/terrain-picture.js";
import { programFromRules } from "../sim/program-fixture.mjs";
import { newKnowingGame } from "../sim/understanding-fixture.mjs";

const SENT = {
  mapId: Object.keys(MAPS)[0],
  // The first character a new game creates takes the id 1.
  characterId: 1,
};
const ALWAYS = { kind: "always" };

function sent(rules = [{ condition: ALWAYS, action: { kind: "explore" } }]) {
  const program = setProgram(
    newKnowingGame(),
    programFromRules(...rules),
  ).state;
  return send(createCharacter(program, "Ala").state, SENT, 1760000000000).state;
}

test("a game without a map run has an empty picture", () => {
  const picture = terrainPicture(newGame());
  assert.deepEqual(picture.tiles, []);
});

test("all tiles are drawn from minute 0, unrevealed ones without icons", () => {
  const state = sent();
  const picture = terrainPicture(state);
  const map = MAPS[SENT.mapId];
  assert.equal(picture.tiles.length, map.width * map.height);
  assert.equal(state.run.minute, 0);
  for (const tile of picture.tiles) {
    const source = state.run.tiles.find(
      (t) => t.col === tile.col && t.row === tile.row,
    );
    assert.equal(tile.revealed, source.revealed);
    if (!tile.revealed) assert.deepEqual(tile.icons, []);
  }
  assert.ok(picture.tiles.some((t) => !t.revealed));
  assert.ok(picture.width > 0 && picture.height > 0);
});

test("regular hexagons meet their neighbours along sides without gaps or overlap", () => {
  // D-24 and accepted task przewodnik_testow_loop2.md, Q7b1: shape and adjacency,
  // independent of rotation, translation, vertex order and the product's geometry helpers.
  const state = sent();
  const tiles = [
    { col: 0, row: 0, at: { q: 0, r: 0 } },
    { col: 1, row: 0, at: { q: 1, r: 0 } },
    { col: 0, row: 1, at: { q: 0, r: 1 } },
  ].map((tile) => ({ ...tile, revealed: false, stock: {}, stepMinutes: 5 }));
  const picture = terrainPicture(
    { ...state, run: { ...state.run, tiles } },
    10,
  );
  const polygons = picture.tiles.map((tile) =>
    tile.points.split(" ").map((pair) => pair.split(",").map(Number)),
  );
  const distance = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  const close = (actual, expected) =>
    assert.ok(Math.abs(actual - expected) < 1e-9, `${actual} != ${expected}`);
  const centres = polygons.map((points) => [
    points.reduce((sum, point) => sum + point[0], 0) / points.length,
    points.reduce((sum, point) => sum + point[1], 0) / points.length,
  ]);
  assert.equal(polygons.length, 3);
  for (const [index, points] of polygons.entries()) {
    assert.equal(points.length, 6);
    assert.equal(new Set(points.map((point) => point.join(","))).size, 6);
    for (let vertex = 0; vertex < 6; vertex += 1) {
      // A regular hexagon's side equals its circumradius; both are 10 here.
      close(distance(points[vertex], centres[index]), 10);
      close(distance(points[vertex], points[(vertex + 1) % 6]), 10);
    }
  }
  // These three axial tiles are pairwise neighbours, covering all three side directions.
  for (const [a, b] of [
    [0, 1],
    [0, 2],
    [1, 2],
  ]) {
    const shared = polygons[a].filter((point) =>
      polygons[b].some((other) => distance(point, other) < 1e-9),
    );
    assert.equal(shared.length, 2, `neighbours ${a}, ${b} must share a side`);
    close(distance(shared[0], shared[1]), 10);
    // Two apothems: 2 * sqrt(10^2 - 5^2) = 10 * sqrt(3).
    close(distance(centres[a], centres[b]), 10 * Math.sqrt(3));
    const side = (point) =>
      (shared[1][0] - shared[0][0]) * (point[1] - shared[0][1]) -
      (shared[1][1] - shared[0][1]) * (point[0] - shared[0][0]);
    assert.ok(
      side(centres[a]) * side(centres[b]) < 0,
      "interiors must not overlap",
    );
  }
});

test("every polygon lies inside the picture", () => {
  const picture = terrainPicture(sent());
  for (const tile of picture.tiles) {
    for (const pair of tile.points.split(" ")) {
      const [x, y] = pair.split(",").map(Number);
      const eps = 1e-9;
      assert.ok(
        x >= -eps &&
          x <= picture.width + eps &&
          y >= -eps &&
          y <= picture.height + eps,
      );
    }
  }
});

test("a revealed tile carries one icon per resource present, dimmed only at stock zero", () => {
  const state = sent();
  const run = {
    ...state.run,
    tiles: state.run.tiles.map((t) => ({ ...t, revealed: true })),
  };
  const revealed = run.tiles;
  assert.ok(revealed.some((t) => Object.keys(t.stock).length > 1));
  const target = revealed.find((t) => Object.keys(t.stock).length > 0);
  const tileKey = Object.keys(target.stock);
  const zeroed = tileKey[0];
  const patched = {
    ...state,
    run: {
      ...run,
      tiles: run.tiles.map((t) =>
        t === target ? { ...t, stock: { ...t.stock, [zeroed]: 0 } } : t,
      ),
    },
  };
  const picture = terrainPicture(patched);
  for (const drawn of picture.tiles) {
    const source = patched.run.tiles.find(
      (t) => t.col === drawn.col && t.row === drawn.row,
    );
    const present = Object.keys(source.stock);
    assert.equal(drawn.icons.length, drawn.revealed ? present.length : 0);
    assert.deepEqual(
      drawn.icons.map((i) => i.resource).sort(),
      drawn.revealed ? [...present].sort() : [],
    );
    for (const icon of drawn.icons) {
      assert.equal(icon.href, `/icons/${RESOURCES[icon.resource].icon}.svg`);
      assert.equal(icon.dimmed, source.stock[icon.resource] === 0);
      assert.ok(
        Number.isFinite(icon.x) && Number.isFinite(icon.y) && icon.size > 0,
      );
    }
    const positions = new Set(drawn.icons.map((i) => `${i.x},${i.y}`));
    assert.equal(positions.size, drawn.icons.length);
  }
  const drawnTarget = picture.tiles.find(
    (t) => t.col === target.col && t.row === target.row,
  );
  assert.equal(
    drawnTarget.icons.find((i) => i.resource === zeroed).dimmed,
    true,
  );
});

test("the picture holds no stock numbers", () => {
  const picture = terrainPicture(advanceMinutes(sent(), 200).state);
  const text = JSON.stringify(picture);
  for (const tile of picture.tiles)
    for (const icon of tile.icons) assert.equal("stock" in icon, false);
  assert.equal(text.includes("stock"), false);
});

test("the character tile has the character outline", () => {
  const state = advanceMinutes(sent(), 200).state;
  const picture = terrainPicture(state);
  const at = state.run.character.at;
  const marked = picture.tiles.filter((t) => t.outline === "character");
  assert.equal(marked.length, 1);
  const source = state.run.tiles.find(
    (t) => t.col === marked[0].col && t.row === marked[0].row,
  );
  assert.deepEqual(source.at, at);
});

test("the step target is outlined only while a move runs", () => {
  const walking = [{ condition: ALWAYS, action: { kind: "wander" } }];
  let state = sent(walking);
  let seenMove = false;
  for (let i = 0; i < 80; i += 1) {
    state = advanceMinutes(state, 1).state;
    const targets = terrainPicture(state).tiles.filter(
      (t) => t.outline === "stepTarget",
    );
    if (state.run.current.stepTo) {
      seenMove = true;
      assert.equal(targets.length, 1);
      const source = state.run.tiles.find(
        (t) => t.col === targets[0].col && t.row === targets[0].row,
      );
      assert.deepEqual(source.at, state.run.current.stepTo);
      assert.equal(
        terrainPicture(state).tiles.filter((t) => t.outline === "character")
          .length,
        1,
      );
    } else {
      assert.equal(targets.length, 0);
    }
  }
  assert.ok(seenMove);
});

// The campfire on the drawing (task, To do 15; D-19, D-41, D-70). The program below, on a backpack
// of 9 sticks, explores the entrance (20 minutes, to minute 20), crafts a campfire there (20
// minutes and 6 sticks, to minute 40), lights it (5 minutes and 2 sticks, to minute 45; it burns
// 60 minutes, to minute 105) and lights a stick (5 minutes and the last stick, to minute 50; it
// burns 3 minutes, to minute 53).
const FIRE_PROGRAM = [
  { condition: ALWAYS, action: { kind: "craftCampfire" } },
  { condition: ALWAYS, action: { kind: "lightCampfire" } },
  { condition: ALWAYS, action: { kind: "lightItem" } },
  { condition: ALWAYS, action: { kind: "explore" } },
];
const [STICK] = MAPS[SENT.mapId].resources.map(({ id }) => id);

/** The map run of FIRE_PROGRAM, its backpack holding 9 sticks, at each of the given minutes. */
function fireRun(...minutes) {
  const start = sent(FIRE_PROGRAM);
  let state = {
    ...start,
    run: {
      ...start.run,
      character: {
        ...start.run.character,
        backpack: { ...start.run.character.backpack, [STICK]: 9 },
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

const ENTRANCE = MAPS[SENT.mapId].entrance;
const atEntrance = (picture) =>
  picture.tiles.find((t) => t.col === ENTRANCE.col && t.row === ENTRANCE.row);

test("the campfire's icon stands on its tile, burning and extinguished, and on no other tile", () => {
  const [before, burning, extinguished] = fireRun(30, 63, 110);
  assert.equal(before.run.campfires.length, 0);
  assert.deepEqual(
    burning.run.campfires.map((c) => c.minutesLeft),
    [42],
  );
  assert.deepEqual(
    extinguished.run.campfires.map((c) => c.minutesLeft),
    [0],
  );
  for (const tile of terrainPicture(before).tiles)
    assert.equal(tile.campfire, null);
  for (const state of [burning, extinguished]) {
    const picture = terrainPicture(state);
    const drawn = atEntrance(picture);
    assert.equal(drawn.campfire.href, "/icons/campfire.svg");
    assert.ok(drawn.campfire.size > 0);
    for (const tile of picture.tiles)
      if (tile !== drawn) assert.equal(tile.campfire, null);
  }
  // Extinguished, the campfire is still there: drawn as when it burns, never in `depleted`.
  assert.deepEqual(
    atEntrance(terrainPicture(extinguished)).campfire,
    atEntrance(terrainPicture(burning)).campfire,
  );
});

test("the drawing shows no number of the campfire or of a burning stick", () => {
  // Minute 51: campfire 54 minutes left, a stick 2; minute 52: 53 and 1; minute 53: 52, no stick.
  const states = fireRun(51, 52, 53);
  assert.deepEqual(
    states.map((s) => [
      s.run.campfires.map((c) => c.minutesLeft),
      s.run.burningItems.map((b) => b.minutesLeft),
    ]),
    [
      [[54], [2]],
      [[53], [1]],
      [[52], []],
    ],
  );
  const [first, ...rest] = states.map((s) => terrainPicture(s));
  for (const picture of rest) assert.deepEqual(picture, first);
  assert.ok(atEntrance(first).campfire);
});

test("the campfire's icon stands beside the resources' icons, none overlapping, within the tile", () => {
  const [burning] = fireRun(63);
  // The campfire's tile given every resource of the map, so the most icons a tile can hold.
  const all = Object.fromEntries(
    MAPS[SENT.mapId].resources.map(({ id }) => [id, 1]),
  );
  const state = {
    ...burning,
    run: {
      ...burning.run,
      tiles: burning.run.tiles.map((t) =>
        t.col === ENTRANCE.col && t.row === ENTRANCE.row
          ? { ...t, stock: all }
          : t,
      ),
    },
  };
  for (const size of [24, 10]) {
    const drawn = atEntrance(terrainPicture(state, size));
    assert.equal(drawn.icons.length, 4);
    assert.ok(drawn.campfire, `size ${size}: no campfire icon`);
    const squares = [...drawn.icons, drawn.campfire];
    const xs = drawn.points.split(" ").map((p) => Number(p.split(",")[0]));
    const ys = drawn.points.split(" ").map((p) => Number(p.split(",")[1]));
    const eps = 1e-9;
    for (const s of squares) {
      assert.ok(s.x >= Math.min(...xs) - eps, `size ${size}`);
      assert.ok(s.x + s.size <= Math.max(...xs) + eps, `size ${size}`);
      assert.ok(s.y >= Math.min(...ys) - eps, `size ${size}`);
      assert.ok(s.y + s.size <= Math.max(...ys) + eps, `size ${size}`);
    }
    for (let i = 0; i < squares.length; i += 1)
      for (let j = i + 1; j < squares.length; j += 1) {
        const [a, b] = [squares[i], squares[j]];
        const apart =
          a.x + a.size <= b.x + eps ||
          b.x + b.size <= a.x + eps ||
          a.y + a.size <= b.y + eps ||
          b.y + b.size <= a.y + eps;
        assert.ok(apart, `size ${size}: icons ${i} and ${j} overlap`);
      }
  }
});

test("a tile's icons follow the order of the resources in the run's map data", () => {
  const state = sent();
  const run = {
    ...state.run,
    tiles: state.run.tiles.map((t) => ({ ...t, revealed: true })),
  };
  const order = MAPS[run.mapId].resources;
  const saved = [...order];
  // Reversed in place for this test only, so the map's order differs from the resource data's order.
  order.reverse();
  try {
    const mapOrder = order.map(({ id }) => id);
    assert.notDeepEqual(
      mapOrder,
      Object.keys(RESOURCES).filter((id) => mapOrder.includes(id)),
    );
    const picture = terrainPicture({ ...state, run });
    const many = picture.tiles.filter((t) => t.icons.length > 1);
    assert.ok(many.length > 0);
    for (const tile of many) {
      const drawn = tile.icons.map((icon) => icon.resource);
      assert.deepEqual(
        drawn,
        mapOrder.filter((id) => drawn.includes(id)),
      );
    }
  } finally {
    order.splice(0, order.length, ...saved);
  }
});
