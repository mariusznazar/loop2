import { MAPS } from "../sim/data/maps.js";
import { canSendMap } from "../sim/game.js";
import type { MapId } from "../sim/types.js";

/** The maps a character can be sent to, in the data's order. Pure. */
export function sendMaps(solvedMaps?: readonly MapId[]): MapId[] {
  const maps = Object.keys(MAPS) as MapId[];
  return solvedMaps === undefined
    ? maps
    : maps.filter((mapId) => canSendMap(solvedMaps, mapId));
}

/** The map's solving condition as a sentence: „{name} — {solvingText}”, both from the map's data. Pure. */
export function solvingSentence(mapId: MapId): string {
  return `${MAPS[mapId].name} — ${MAPS[mapId].solvingText}`;
}
