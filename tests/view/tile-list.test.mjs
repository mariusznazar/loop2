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
