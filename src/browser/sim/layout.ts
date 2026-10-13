import { offsetToAxial } from './hex.js';
import { nextRandom, streamState } from './random.js';
import type { MapDef } from './data/maps.js';
import type { Hex, Tile } from './types.js';

/**
 * Draws the tiles of a map from a seed. The draw order is a contract (spec 4.4):
 * 1. tiles row-major; 2. per tile, per resource in the map's array order, one draw
 * (`u < density` puts the resource's full stock); 3. per resource in array order with
 * density > 0 that no tile has, one draw picks the tile; 4. the fixed entrance, no draw.
 */
export function drawLayout(map: MapDef, seed: number): { tiles: Tile[]; entrance: Hex } {
  let state = streamState(seed, 'layout');
  const draw = (): number => {
    const step = nextRandom(state);
    state = step.state;
    return step.value;
  };

  const tiles: Tile[] = [];
  for (let row = 0; row < map.height; row += 1) {
    for (let col = 0; col < map.width; col += 1) {
      tiles.push({
        col,
        row,
        at: offsetToAxial(col, row),
        revealed: false,
        stepMinutes: map.stepMinutes,
        stock: {},
      });
    }
  }

  for (const tile of tiles) {
    for (const resource of map.resources) {
      if (draw() < resource.density) tile.stock[resource.id] = resource.stock;
    }
  }

  for (const resource of map.resources) {
    if (resource.density > 0 && !tiles.some(tile => resource.id in tile.stock)) {
      tiles[Math.floor(draw() * tiles.length)]!.stock[resource.id] = resource.stock;
    }
  }

  return { tiles, entrance: offsetToAxial(map.entrance.col, map.entrance.row) };
}
