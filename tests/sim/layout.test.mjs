import assert from "node:assert/strict";
import { test } from "node:test";
import { MAPS } from "../../dist/public/sim/data/maps.js";
import { offsetToAxial, sameHex } from "../../dist/public/sim/hex.js";
import { drawLayout } from "../../dist/public/sim/layout.js";
import {
  mixSeed,
  nextRandom,
  streamState,
} from "../../dist/public/sim/random.js";

const map = Object.values(MAPS)[0];
const resourceIds = map.resources.map((resource) => resource.id);

test("tiles are row-major, unrevealed, with the map step cost", () => {
  const { tiles } = drawLayout(map, 1);
  assert.equal(tiles.length, map.width * map.height);
  tiles.forEach((tile, index) => {
    assert.equal(tile.col, index % map.width);
    assert.equal(tile.row, Math.floor(index / map.width));
    assert.deepEqual(tile.at, offsetToAxial(tile.col, tile.row));
    assert.equal(tile.revealed, false);
    assert.equal(tile.stepMinutes, map.stepMinutes);
  });
});

test("only the map resources appear, each with its full stock", () => {
  for (let seed = 1; seed <= 20; seed += 1) {
    for (const tile of drawLayout(map, seed).tiles) {
      for (const [id, stock] of Object.entries(tile.stock)) {
        const def = map.resources.find((resource) => resource.id === id);
        assert.ok(def, `unknown resource ${id}`);
        assert.equal(stock, def.stock);
      }
    }
  }
});

test("the entrance is the fixed one and lies on the map", () => {
  for (const seed of [1, 2, 3]) {
    const { tiles, entrance } = drawLayout(map, seed);
    assert.deepEqual(
      entrance,
      offsetToAxial(map.entrance.col, map.entrance.row),
    );
    assert.ok(tiles.some((tile) => sameHex(tile.at, entrance)));
  }
});

test("the same seed gives the same tiles, another seed other tiles", () => {
  assert.deepEqual(drawLayout(map, 7), drawLayout(map, 7));
  assert.notDeepEqual(drawLayout(map, 1).tiles, drawLayout(map, 2).tiles);
});

test("every resource with positive density lies on at least one tile, seeds 1-20", () => {
  for (let seed = 1; seed <= 20; seed += 1) {
    const { tiles } = drawLayout(map, seed);
    for (const id of resourceIds) {
      assert.ok(
        tiles.some((tile) => id in tile.stock),
        `seed ${seed}: ${id} missing`,
      );
    }
  }
});

test("the minimum guarantee places a resource nobody drew", () => {
  const rare = {
    ...map,
    resources: map.resources.map((resource) => ({
      ...resource,
      density: 0.0001,
    })),
  };
  for (let seed = 1; seed <= 20; seed += 1) {
    const { tiles } = drawLayout(rare, seed);
    for (const id of resourceIds) {
      assert.ok(
        tiles.some((tile) => id in tile.stock),
        `seed ${seed}: ${id} missing`,
      );
    }
  }
});

test("a resource of zero density is never placed", () => {
  const none = {
    ...map,
    resources: map.resources.map((resource) => ({ ...resource, density: 0 })),
  };
  assert.ok(
    drawLayout(none, 3).tiles.every(
      (tile) => Object.keys(tile.stock).length === 0,
    ),
  );
});

test("drawLayout does not change the map", () => {
  const before = JSON.stringify(map);
  drawLayout(map, 4);
  assert.equal(JSON.stringify(map), before);
});

// Fixed expected values (D-22: the generator, the seed mixing and the draw order are a contract).
// Written out once from the code; a change to any of the three fails here.
test("golden values: the layout stream of seed 1, mixSeed(1, 1000) and the stocks of Las for seed 1", () => {
  let state = streamState(1, "layout");
  const values = [];
  for (let i = 0; i < 3; i += 1) {
    const step = nextRandom(state);
    values.push(step.value);
    state = step.state;
  }
  assert.deepEqual(
    values,
    [0.044911144534125924, 0.7811651250813156, 0.3564910045824945],
  );

  assert.equal(mixSeed(1, 1000), 2244977679);

  const stick = { stick: 12 };
  const berry = { berry: 8 };
  const moss = { moss: 6 };
  const fiber = { fiber: 6 };
  assert.deepEqual(
    drawLayout(MAPS.forest, 1).tiles.map((tile) => tile.stock),
    [
      { ...stick, ...moss },
      { ...stick, ...berry, ...fiber },
      {},
      { ...stick, ...berry },
      { ...berry },
      { ...stick },
      { ...stick, ...berry, ...moss },
      { ...stick },
      { ...stick, ...berry, ...fiber },
      { ...stick, ...fiber },
      { ...stick, ...berry, ...moss },
      { ...stick },
      { ...stick, ...fiber },
      { ...stick, ...berry, ...moss },
      { ...stick },
      { ...stick, ...moss },
    ],
  );
});
