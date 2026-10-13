import { MAPS } from '../sim/data/maps.js';
import { RESOURCES } from '../sim/data/resources.js';
import type { ResourceId } from '../sim/data/resources.js';
import { hexCenter, hexCorners, sameHex } from '../sim/hex.js';
import type { GameState } from '../sim/types.js';

export type PictureIcon = {
  resource: ResourceId;
  /** URL of the icon file. */
  href: string;
  /** Top-left corner and side of the square the icon is drawn in. */
  x: number;
  y: number;
  size: number;
  /** The tile's stock of the resource is 0. */
  dimmed: boolean;
};

export type PictureTile = {
  col: number;
  row: number;
  /** SVG polygon points. */
  points: string;
  revealed: boolean;
  icons: PictureIcon[];
  outline: 'character' | 'stepTarget' | null;
};

export type TerrainPicture = {
  width: number;
  height: number;
  /** Shift added to hex coordinates so the whole drawing starts at 0,0. */
  offsetX: number;
  offsetY: number;
  tiles: PictureTile[];
};

/** The terrain of the map run as plain data for drawing; pure, no DOM, no stock numbers. */
export function terrainPicture(state: GameState, size = 24): TerrainPicture {
  const run = state.run;
  if (!run) return { width: 0, height: 0, offsetX: 0, offsetY: 0, tiles: [] };

  const corners = hexCorners(size);
  const centres = run.tiles.map(tile => hexCenter(tile.at, size));
  const xs = centres.flatMap(c => corners.map(k => c.x + k.x));
  const ys = centres.flatMap(c => corners.map(k => c.y + k.y));
  const offsetX = -Math.min(...xs);
  const offsetY = -Math.min(...ys);

  // Icons follow the order of the resources in the run's map data, as the tile list does.
  const resourceOrder: ResourceId[] = MAPS[run.mapId].resources.map(({ id }) => id);
  const iconSize = size * 0.7;
  const tiles = run.tiles.map((tile, index): PictureTile => {
    const centre = centres[index]!;
    const cx = centre.x + offsetX;
    const cy = centre.y + offsetY;
    const points = corners.map(k => `${cx + k.x},${cy + k.y}`).join(' ');
    const present = resourceOrder.filter(id => Object.hasOwn(tile.stock, id));
    // Two icons per row, centred on the tile.
    const icons = tile.revealed
      ? present.map((resource, i): PictureIcon => {
          const inRow = Math.min(2, present.length - Math.floor(i / 2) * 2);
          const rows = Math.ceil(present.length / 2);
          const x = cx + (i % 2) * iconSize - (inRow * iconSize) / 2;
          const y = cy + Math.floor(i / 2) * iconSize - (rows * iconSize) / 2;
          return {
            resource,
            href: `/icons/${RESOURCES[resource].icon}.svg`,
            x,
            y,
            size: iconSize,
            dimmed: tile.stock[resource] === 0,
          };
        })
      : [];
    const outline = sameHex(tile.at, run.character.at)
      ? 'character'
      : run.current.stepTo && sameHex(tile.at, run.current.stepTo)
        ? 'stepTarget'
        : null;
    return { col: tile.col, row: tile.row, points, revealed: tile.revealed, icons, outline };
  });

  return { width: Math.max(...xs) + offsetX, height: Math.max(...ys) + offsetY, offsetX, offsetY, tiles };
}
