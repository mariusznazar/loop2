import { CAMPFIRE } from "../sim/data/campfire.js";
import { ITEMS } from "../sim/data/items.js";
import { MAPS } from "../sim/data/maps.js";
import { RESOURCES } from "../sim/data/resources.js";
import type { ResourceId } from "../sim/data/resources.js";
import { sameHex, tileLabel } from "../sim/hex.js";
import type { GameState, MapRun, Tile } from "../sim/types.js";

/** Shown in a cell for a resource the tile does not have (choice C5). */
const ABSENT = "—";
/** Between the texts of the campfire and the burning items of one row. */
const SEPARATOR = " · ";

export type TileListColumn = {
  resource: ResourceId;
  /** Name shown to the player, from the resources' data. */
  name: string;
  /** URL of the resource's icon file. */
  href: string;
};

export type TileListRow = {
  col: number;
  row: number;
  /** „(col, row)” (choice C4). */
  label: string;
  /** The tile's stock per column, „—” where the tile lacks the resource. */
  cells: string[];
  /**
   * The state of the tile's campfire, then of each item burning on it, in the map run's order:
   * „ognisko — płonie, zostało 42 min”, „ognisko — wygasłe”, „patyk — płonie, zostało 2 min”,
   * names from the data (task, To do 15; spec Decision 5). Empty where nothing stands there.
   */
  fire: string[];
};

export type TileList = { columns: TileListColumn[]; rows: TileListRow[] };

const burningText = (name: string, minutesLeft: number): string =>
  `${name} — płonie, zostało ${minutesLeft} min`;

/** The texts of the campfire and the burning items standing on `tile`. */
function fireOn(run: MapRun, tile: Tile): string[] {
  const campfires = run.campfires
    .filter((campfire) => sameHex(campfire.at, tile.at))
    .map((campfire) =>
      campfire.minutesLeft > 0
        ? burningText(CAMPFIRE.name, campfire.minutesLeft)
        : `${CAMPFIRE.name} — wygasłe`,
    );
  const items = run.burningItems
    .filter((burning) => sameHex(burning.at, tile.at))
    .map((burning) =>
      burningText(ITEMS[burning.item].name, burning.minutesLeft),
    );
  return [...campfires, ...items];
}

/**
 * The list of revealed tiles beside the terrain drawing: one column per resource of the map run's
 * map, in the map's order, and one row per revealed tile, in tile-list order. Pure, no DOM.
 */
export function tileList(state: GameState): TileList {
  const run = state.run;
  if (!run) return { columns: [], rows: [] };
  const columns = MAPS[run.mapId].resources.map(({ id }): TileListColumn => ({
    resource: id,
    name: RESOURCES[id].name,
    href: `/icons/${RESOURCES[id].icon}.svg`,
  }));
  const rows = run.tiles
    .filter((tile) => tile.revealed)
    .map((tile): TileListRow => ({
      col: tile.col,
      row: tile.row,
      label: tileLabel(tile),
      cells: columns.map(({ resource }) => {
        const stock = tile.stock[resource];
        return stock === undefined ? ABSENT : String(stock);
      }),
      fire: fireOn(run, tile),
    }));
  return { columns, rows };
}

/**
 * The line under the drawing of the game map (D-19, D-70): for the hovered tile, else the character's
 * tile, „(col, row): patyk 12 · jagoda — · …” with the stock of each resource of the map as the tile's
 * row of the table gives it. A tile not revealed gives its label alone, with nothing of its stock,
 * and the state of a campfire stands in the table alone. A key that names no tile of the map run
 * counts as none hovered. Null without a map run. Pure.
 */
export function tileLine(
  state: GameState,
  hovered: string | null,
): string | null {
  const run = state.run;
  if (!run) return null;
  const tile =
    run.tiles.find((candidate) => tileKey(candidate) === hovered) ??
    run.tiles.find((candidate) => sameHex(candidate.at, run.character.at));
  if (!tile) return null;
  const { columns, rows } = tileList(state);
  const row = rows.find((candidate) => tileKey(candidate) === tileKey(tile));
  if (!row) return tileLabel(tile);
  const stock = columns.map(
    (column, index) => `${column.name} ${row.cells[index]}`,
  );
  return `${row.label}: ${stock.join(SEPARATOR)}`;
}

/** The key that ties a tile of the drawing to its row in the list: „col,row”. */
export function tileKey(tile: { col: number; row: number }): string {
  return `${tile.col},${tile.row}`;
}
