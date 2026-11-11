import { CAMPFIRE } from "../sim/data/campfire.js";
import { MAPS } from "../sim/data/maps.js";
import { RESOURCES } from "../sim/data/resources.js";
import type { ResourceId } from "../sim/data/resources.js";
import { hexCenter, hexCorners, sameHex } from "../sim/hex.js";
import type { GameState } from "../sim/types.js";

/** Where an icon is drawn. */
export type PictureIconPlace = {
  /** URL of the icon file. */
  href: string;
  /** Top-left corner and side of the square the icon is drawn in. */
  x: number;
  y: number;
  size: number;
};

export type PictureIcon = PictureIconPlace & {
  resource: ResourceId;
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
  /**
   * The icon of the campfire standing on the tile, or null: its own icon while the campfire burns
   * and the extinguished campfire's while it has no minutes left, never lit included, and never
   * its minutes (D-19, D-70); it is never dimmed (D-41).
   */
  campfire: PictureIconPlace | null;
  outline: "character" | "stepTarget" | null;
};

export type TerrainPicture = {
  width: number;
  height: number;
  /** Shift added to hex coordinates so the whole drawing starts at 0,0. */
  offsetX: number;
  offsetY: number;
  tiles: PictureTile[];
};

/** The tile radius the game draws with by default; the kitchen-sink page uses it too. */
export const TILE_SIZE = 24;

/** The side of the square the icons of a tile share, as a multiple of the tile's size. */
export const ICON_SQUARE = 1.4;

/**
 * Places `count` icons on a tile centred at cx, cy: two a row, centred, in a square of side
 * `box`; an icon's side is half the box, or a third of it where the icons take three rows.
 */
export function iconPlaces(
  count: number,
  cx: number,
  cy: number,
  box: number,
): { x: number; y: number; size: number }[] {
  const rows = Math.ceil(count / 2);
  const size = box / Math.max(2, rows);
  return Array.from({ length: count }, (_, i) => {
    const inRow = Math.min(2, count - Math.floor(i / 2) * 2);
    return {
      x: cx + (i % 2) * size - (inRow * size) / 2,
      y: cy + Math.floor(i / 2) * size - (rows * size) / 2,
      size,
    };
  });
}

/**
 * The terrain of the map run as plain data for drawing; pure, no DOM, no number of stock or of a
 * campfire's minutes. A burning stick is not drawn: it stands only in the list of revealed tiles.
 */
export function terrainPicture(
  state: GameState,
  size = TILE_SIZE,
): TerrainPicture {
  const run = state.run;
  if (!run) return { width: 0, height: 0, offsetX: 0, offsetY: 0, tiles: [] };

  const corners = hexCorners(size);
  const centres = run.tiles.map((tile) => hexCenter(tile.at, size));
  const xs = centres.flatMap((c) => corners.map((k) => c.x + k.x));
  const ys = centres.flatMap((c) => corners.map((k) => c.y + k.y));
  const offsetX = -Math.min(...xs);
  const offsetY = -Math.min(...ys);

  // Icons follow the order of the resources in the run's map data, as the tile list does.
  const resourceOrder: ResourceId[] = MAPS[run.mapId].resources.map(
    ({ id }) => id,
  );
  // The square the icons of a tile share, see `ICON_SQUARE`.
  const iconBox = size * ICON_SQUARE;
  const tiles = run.tiles.map((tile, index): PictureTile => {
    const centre = centres[index];
    const cx = centre.x + offsetX;
    const cy = centre.y + offsetY;
    const points = corners.map((k) => `${cx + k.x},${cy + k.y}`).join(" ");
    const present = tile.revealed
      ? resourceOrder.filter((id) => Object.hasOwn(tile.stock, id))
      : [];
    // A campfire stands only on a revealed tile (D-72); its icon follows the resources' icons.
    const campfireHere = tile.revealed
      ? run.campfires.find((c) => sameHex(c.at, tile.at))
      : undefined;
    const places = iconPlaces(
      present.length + (campfireHere === undefined ? 0 : 1),
      cx,
      cy,
      iconBox,
    );
    const icons = present.map((resource, i): PictureIcon => ({
      resource,
      href: `/icons/${RESOURCES[resource].icon}.svg`,
      ...places[i],
      dimmed: tile.stock[resource] === 0,
    }));
    const campfire =
      campfireHere === undefined
        ? null
        : {
            href: `/icons/${
              campfireHere.minutesLeft > 0
                ? CAMPFIRE.icon
                : CAMPFIRE.extinguished.icon
            }.svg`,
            ...places[present.length],
          };
    const outline = sameHex(tile.at, run.character.at)
      ? "character"
      : run.current?.stepTo && sameHex(tile.at, run.current.stepTo)
        ? "stepTarget"
        : null;
    return {
      col: tile.col,
      row: tile.row,
      points,
      revealed: tile.revealed,
      icons,
      campfire,
      outline,
    };
  });

  return {
    width: Math.max(...xs) + offsetX,
    height: Math.max(...ys) + offsetY,
    offsetX,
    offsetY,
    tiles,
  };
}
