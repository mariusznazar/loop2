import { CAMPFIRE } from "./data/campfire.js";
import { ITEMS } from "./data/items.js";
import type { MapDef } from "./data/maps.js";
import { sameHex } from "./hex.js";
import type { BurningItem, Campfire, Hex, Tile } from "./types.js";

/** What of the map run changes as the world passes a game minute. */
export type World = {
  campfires: Campfire[];
  burningItems: BurningItem[];
  tiles: Tile[];
};

/**
 * The warmth a minute on the tile `at`: each campfire burning there and each item burning there,
 * as they stand at the end of the previous minute.
 */
export function warmthAt(
  world: Pick<World, "campfires" | "burningItems">,
  at: Hex,
): number {
  let warmth = 0;
  for (const campfire of world.campfires) {
    if (campfire.minutesLeft > 0 && sameHex(campfire.at, at))
      warmth += CAMPFIRE.warmth;
  }
  for (const burning of world.burningItems) {
    if (burning.minutesLeft > 0 && sameHex(burning.at, at))
      warmth += ITEMS[burning.item].lightable?.warmth ?? 0;
  }
  return warmth;
}

/**
 * The world in game minute `minute`, steps 3–4 of D-64. What burns loses a minute: a campfire at
 * 0 minutes is extinguished and stays on its tile, an item at 0 minutes is gone. Then, for each
 * resource of the map whose renewal time `minute` is a whole multiple of, every tile holding that
 * resource below the map's stock per tile gains one piece; a tile at 0 pieces keeps its resource.
 */
export function worldMinute(world: World, map: MapDef, minute: number): World {
  const campfires = world.campfires.map((campfire) =>
    campfire.minutesLeft > 0
      ? { ...campfire, minutesLeft: campfire.minutesLeft - 1 }
      : campfire,
  );
  const burningItems = world.burningItems
    .map((burning) => ({ ...burning, minutesLeft: burning.minutesLeft - 1 }))
    .filter((burning) => burning.minutesLeft > 0);

  const renewing = map.resources.filter(
    (resource) => minute % resource.renewMinutes === 0,
  );
  const tiles =
    renewing.length === 0
      ? world.tiles
      : world.tiles.map((tile) => {
          let stock = tile.stock;
          for (const resource of renewing) {
            const pieces = stock[resource.id];
            if (pieces !== undefined && pieces < resource.stock)
              stock = { ...stock, [resource.id]: pieces + 1 };
          }
          return stock === tile.stock ? tile : { ...tile, stock };
        });

  return { campfires, burningItems, tiles };
}
