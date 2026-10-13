import type { Hex, Tile } from './types.js';

/** Axial offsets of the six neighbours of a hex. */
const DIRECTIONS: readonly Hex[] = [
  { q: 1, r: 0 },
  { q: 1, r: -1 },
  { q: 0, r: -1 },
  { q: -1, r: 0 },
  { q: -1, r: 1 },
  { q: 0, r: 1 },
];

/** Offset coordinates (odd rows shifted right) to axial. */
export function offsetToAxial(col: number, row: number): Hex {
  return { q: col - Math.floor(row / 2), r: row };
}

export function sameHex(a: Hex, b: Hex): boolean {
  return a.q === b.q && a.r === b.r;
}

export function hexDistance(a: Hex, b: Hex): number {
  const dq = a.q - b.q;
  const dr = a.r - b.r;
  return (Math.abs(dq) + Math.abs(dr) + Math.abs(dq + dr)) / 2;
}

export function tileAt(tiles: readonly Tile[], at: Hex): Tile | undefined {
  return tiles.find(tile => sameHex(tile.at, at));
}

/** Tiles next to `at`, in tile-list order. */
export function neighbours(tiles: readonly Tile[], at: Hex): Tile[] {
  return tiles.filter(tile => hexDistance(tile.at, at) === 1);
}

/** Cheapest cost in minutes from `from` to every tile (by list index); entering a tile costs its stepMinutes. */
function costsFrom(tiles: readonly Tile[], from: Hex): number[] {
  const cost = tiles.map(() => Infinity);
  const done = tiles.map(() => false);
  const start = tiles.findIndex(tile => sameHex(tile.at, from));
  if (start < 0) return cost;
  cost[start] = 0;
  for (;;) {
    let current = -1;
    for (let i = 0; i < tiles.length; i += 1) {
      if (!done[i] && cost[i] < Infinity && (current < 0 || cost[i] < cost[current])) current = i;
    }
    if (current < 0) return cost;
    done[current] = true;
    for (let i = 0; i < tiles.length; i += 1) {
      if (!done[i] && hexDistance(tiles[i]!.at, tiles[current]!.at) === 1) {
        cost[i] = Math.min(cost[i]!, cost[current]! + tiles[i]!.stepMinutes);
      }
    }
  }
}

/**
 * The qualifying tile nearest to `from` by minutes of walking, with the first step towards it.
 * `from` itself qualifies at 0 minutes with `next = from`. Ties go to the earlier tile in the
 * list; `next` is the first neighbour of `from`, in list order, on a cheapest path.
 */
export function nearestTile(
  tiles: readonly Tile[],
  from: Hex,
  predicate: (tile: Tile) => boolean,
): { tile: Tile; minutes: number; next: Hex } | null {
  const cost = costsFrom(tiles, from);
  let best = -1;
  for (let i = 0; i < tiles.length; i += 1) {
    if (cost[i]! < Infinity && predicate(tiles[i]!) && (best < 0 || cost[i]! < cost[best]!)) best = i;
  }
  if (best < 0) return null;
  const tile = tiles[best]!;
  const minutes = cost[best]!;
  if (minutes === 0) return { tile, minutes, next: from };
  for (const step of neighbours(tiles, from)) {
    const rest = costsFrom(tiles, step.at)[best]!;
    if (step.stepMinutes + rest === minutes) return { tile, minutes, next: step.at };
  }
  return null;
}

/** Centre of a pointy-top hex of the given radius, from axial coordinates. */
export function hexCenter(at: Hex, size: number): { x: number; y: number } {
  return { x: size * Math.sqrt(3) * (at.q + at.r / 2), y: size * 1.5 * at.r };
}

/** Six corners around the origin, first straight above the centre, clockwise. */
export function hexCorners(size: number): { x: number; y: number }[] {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = -Math.PI / 2 + (i * Math.PI) / 3;
    return { x: size * Math.cos(angle), y: size * Math.sin(angle) };
  });
}

/** Label of a tile in the tile list: 0-based offset coordinates. */
export function tileLabel(tile: Pick<Tile, 'col' | 'row'>): string {
  return `(${tile.col}, ${tile.row})`;
}
