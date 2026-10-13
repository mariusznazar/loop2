import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  hexCenter,
  hexCorners,
  hexDistance,
  nearestTile,
  neighbours,
  offsetToAxial,
  sameHex,
  tileAt,
  tileLabel,
} from '../../dist/public/sim/hex.js';

const SIZE = 24;
const WIDTH = Math.sqrt(3) * SIZE;

/** Row-major rectangle of tiles with one step cost; stock marks the tiles that qualify. */
function grid(width, height, stepMinutes = 5) {
  const tiles = [];
  for (let row = 0; row < height; row += 1) {
    for (let col = 0; col < width; col += 1) {
      tiles.push({ col, row, at: offsetToAxial(col, row), revealed: false, stepMinutes, stock: {} });
    }
  }
  return tiles;
}
const is = at => tile => sameHex(tile.at, at);
const close = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} != ${b}`);

test('offset coordinates convert to axial with odd rows shifted right', () => {
  assert.deepEqual(offsetToAxial(0, 0), { q: 0, r: 0 });
  assert.deepEqual(offsetToAxial(1, 1), { q: 1, r: 1 });
  assert.deepEqual(offsetToAxial(0, 2), { q: -1, r: 2 });
});

test('sameHex and tileAt compare axial coordinates', () => {
  const tiles = grid(3, 3);
  assert.equal(sameHex({ q: 1, r: 2 }, { q: 1, r: 2 }), true);
  assert.equal(sameHex({ q: 1, r: 2 }, { q: 2, r: 1 }), false);
  assert.equal(tileAt(tiles, offsetToAxial(2, 1)), tiles[5]);
  assert.equal(tileAt(tiles, { q: 9, r: 9 }), undefined);
});

test('a tile inside the grid has six neighbours, the corner (0,0) has two, in tile-list order', () => {
  const tiles = grid(4, 4);
  const inner = neighbours(tiles, offsetToAxial(1, 1));
  assert.equal(inner.length, 6);
  assert.deepEqual(inner.map(t => [t.col, t.row]), [[1, 0], [2, 0], [0, 1], [2, 1], [1, 2], [2, 2]]);
  const corner = neighbours(tiles, offsetToAxial(0, 0));
  assert.deepEqual(corner.map(t => [t.col, t.row]), [[1, 0], [0, 1]]);
});

test('hex distance counts steps', () => {
  assert.equal(hexDistance({ q: 0, r: 0 }, { q: 0, r: 0 }), 0);
  assert.equal(hexDistance({ q: 0, r: 0 }, { q: 1, r: 0 }), 1);
  assert.equal(hexDistance({ q: 0, r: 0 }, { q: 1, r: 1 }), 2);
  assert.equal(hexDistance(offsetToAxial(0, 0), offsetToAxial(3, 3)), 5);
});

test('centres: origin at zero, next in row one tile width right, next row 1.5 radii lower', () => {
  const origin = hexCenter({ q: 0, r: 0 }, SIZE);
  close(origin.x, 0);
  close(origin.y, 0);
  const right = hexCenter(offsetToAxial(1, 0), SIZE);
  close(right.x, WIDTH);
  close(right.y, 0);
  const below = hexCenter(offsetToAxial(0, 1), SIZE);
  close(below.x, WIDTH / 2);
  close(below.y, 1.5 * SIZE);
  const two = hexCenter(offsetToAxial(0, 2), SIZE);
  close(two.x, 0);
  close(two.y, 3 * SIZE);
});

test('six corners at the radius, the first straight above the centre, clockwise', () => {
  const corners = hexCorners(SIZE);
  assert.equal(corners.length, 6);
  for (const c of corners) close(Math.hypot(c.x, c.y), SIZE);
  close(corners[0].x, 0);
  close(corners[0].y, -SIZE);
  close(corners[1].x, SIZE * Math.cos(-Math.PI / 6));
  close(corners[1].y, SIZE * Math.sin(-Math.PI / 6));
});

test('tile label is (col, row) in offset coordinates', () => {
  assert.equal(tileLabel({ col: 2, row: 3 }), '(2, 3)');
});

test('nearestTile: the start tile qualifies at 0 minutes and is its own first step', () => {
  const tiles = grid(4, 1);
  const found = nearestTile(tiles, { q: 0, r: 0 }, () => true);
  assert.equal(found.tile, tiles[0]);
  assert.equal(found.minutes, 0);
  assert.deepEqual(found.next, { q: 0, r: 0 });
});

test('nearestTile: walks the shortest route and gives the first step', () => {
  const tiles = grid(4, 1);
  const found = nearestTile(tiles, { q: 0, r: 0 }, is({ q: 3, r: 0 }));
  assert.equal(found.minutes, 15);
  assert.deepEqual(found.next, { q: 1, r: 0 });
});

test('nearestTile: null when nothing qualifies', () => {
  assert.equal(nearestTile(grid(3, 3), { q: 0, r: 0 }, () => false), null);
});

test('nearestTile: equally near tiles are decided by tile-list order', () => {
  const tiles = grid(4, 4);
  const from = offsetToAxial(1, 1);
  // (1,0) and (2,1) are both one step away; (1,0) comes first in the list.
  const found = nearestTile(tiles, from, t => (t.col === 1 && t.row === 0) || (t.col === 2 && t.row === 1));
  assert.deepEqual([found.tile.col, found.tile.row], [1, 0]);
  assert.equal(found.minutes, 5);
});

test('nearestTile: the first step is the first neighbour in list order on a cheapest path', () => {
  const tiles = grid(4, 4);
  const from = offsetToAxial(0, 0);
  // (1,1) is two steps away via (1,0) or via (0,1): the earlier neighbour wins.
  const found = nearestTile(tiles, from, t => t.col === 1 && t.row === 1);
  assert.equal(found.minutes, 10);
  assert.deepEqual(found.next, offsetToAxial(1, 0));
});

test('nearestTile: a cheaper detour is preferred over a costly tile', () => {
  const tiles = grid(3, 2);
  tiles[1].stepMinutes = 20; // (1,0)
  const found = nearestTile(tiles, offsetToAxial(0, 0), is(offsetToAxial(2, 0)));
  assert.equal(found.minutes, 15);
  assert.deepEqual(found.next, offsetToAxial(0, 1));
});
