import { MAPS } from '../sim/data/maps.js';
import { RESOURCES } from '../sim/data/resources.js';
import type { ResourceId } from '../sim/data/resources.js';
import { tileLabel } from '../sim/hex.js';
import type { GameState } from '../sim/types.js';

/** Shown in a cell for a resource the tile does not have (choice C5). */
const ABSENT = '—';

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
};

export type TileList = { columns: TileListColumn[]; rows: TileListRow[] };

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
    .filter(tile => tile.revealed)
    .map((tile): TileListRow => ({
      col: tile.col,
      row: tile.row,
      label: tileLabel(tile),
      cells: columns.map(({ resource }) => {
        const stock = tile.stock[resource];
        return stock === undefined ? ABSENT : String(stock);
      }),
    }));
  return { columns, rows };
}

/** The key that ties a tile of the drawing to its row in the list: „col,row”. */
export function tileKey(tile: { col: number; row: number }): string {
  return `${tile.col},${tile.row}`;
}

export type TileListView = {
  element: HTMLTableElement;
  /** Replaces the shown list; rows carry `data-tile` with their tile's key. */
  draw(list: TileList): void;
};

/**
 * Builds the table of revealed tiles. `onHover` gets the key of the row under the pointer, or
 * null when the pointer is over no row; the listeners sit on the table, so they survive redraws.
 */
export function createTileListView(onHover: (key: string | null) => void): TileListView {
  const element = document.createElement('table');
  element.className = 'tile-list';
  const head = document.createElement('thead');
  const body = document.createElement('tbody');
  element.append(head, body);

  element.addEventListener('pointerover', event => {
    const row = event.target instanceof Element ? event.target.closest('tbody tr[data-tile]') : null;
    onHover(row instanceof HTMLElement ? (row.dataset.tile ?? null) : null);
  });
  element.addEventListener('pointerleave', () => onHover(null));

  return {
    element,
    draw(list: TileList): void {
      const headRow = document.createElement('tr');
      headRow.append(document.createElement('th'));
      for (const column of list.columns) {
        const cell = document.createElement('th');
        cell.scope = 'col';
        const icon = document.createElement('img');
        icon.src = column.href;
        icon.alt = '';
        icon.width = 16;
        icon.height = 16;
        cell.append(icon, ` ${column.name}`);
        headRow.append(cell);
      }
      head.replaceChildren(headRow);
      body.replaceChildren(
        ...list.rows.map(row => {
          const line = document.createElement('tr');
          line.dataset.tile = tileKey(row);
          const label = document.createElement('th');
          label.scope = 'row';
          label.textContent = row.label;
          line.append(label);
          for (const value of row.cells) {
            const cell = document.createElement('td');
            cell.textContent = value;
            line.append(cell);
          }
          return line;
        }),
      );
    },
  };
}
