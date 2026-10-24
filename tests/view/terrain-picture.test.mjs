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
import { hexCenter, hexCorners } from "../../dist/public/sim/hex.js";
import { terrainPicture } from "../../dist/public/view/terrain-picture.js";

const SENT = {
  mapId: Object.keys(MAPS)[0],
  // The first character a new game creates takes the id 1.
  characterId: 1,
};
const ALWAYS = { kind: "always" };

function sent(rules = [{ condition: ALWAYS, action: { kind: "explore" } }]) {
  const program = setProgram(newGame(), { rules }).state;
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

test("polygon points come from the hex centre and corners at the given size", () => {
  const state = sent();
  const size = 10;
  const picture = terrainPicture(state, size);
  const first = picture.tiles[0];
  const source = state.run.tiles[0];
  const centre = hexCenter(source.at, size);
  const points = hexCorners(size).map(
    (c) =>
      `${c.x + centre.x + picture.offsetX},${c.y + centre.y + picture.offsetY}`,
  );
  assert.equal(first.points, points.join(" "));
  assert.notEqual(terrainPicture(state, 24).tiles[0].points, first.points);
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
