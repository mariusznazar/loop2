import type { ResourceId } from "./resources.js";
import type { CreatureId } from "./creatures.js";

export type MapResourceDef = {
  id: ResourceId;
  /** Chance that a tile holds the resource. */
  density: number;
  /** Stock of a tile that holds the resource. */
  stock: number;
  /** Game minutes to renew one piece on a tile; left out, the resource does not renew. */
  renewMinutes?: number;
};

/**
 * What a map run must meet to solve the map: every requirement the object holds. Each is named by
 * its kind.
 */
export type SolvingDef = {
  /** Successive game minutes of the streak, a whole number above zero. */
  streak?: number;
  /** Attacks defeated in this map run, a whole number above zero. */
  defeatedAttacks?: number;
};

export type MapAttackerDef = {
  id: CreatureId;
  /** Chance of an attack in each eligible game minute. */
  chancePerMinute: number;
  /** Full protected minutes from run start or the previous encounter's end. */
  cooldownMinutes: number;
};

export type MapDef = {
  name: string;
  /** Optional whole-piece budgets at entry and completion, including zero. */
  carryIn?: number;
  carryOut?: number;
  width: number;
  height: number;
  /** A fixed entrance, or null to draw one tile from the whole map. */
  entrance: { col: number; row: number } | null;
  /** Degrees Celsius; a body cools the further this lies below its starting temperature. */
  ambientTemperature: number;
  /** Game minutes to enter a tile. */
  stepMinutes: number;
  /** Order is part of the layout contract: reordering changes every seed's layout. */
  resources: MapResourceDef[];
  /** Creatures that may attack during a run of this map. */
  attackers?: MapAttackerDef[];
  /** The solving condition of the map. */
  solving: SolvingDef;
  /** The condition as a sentence without the map's name; the headquarters shows it after the name. */
  solvingText: string;
  /** The whole text the status row shows after a completion, agreeing with the name. */
  completionText: string;
  /** The map that must be solved before this one can be sent to. */
  opensAfter?: string;
};

export const MAPS = {
  forest: {
    name: "Las",
    width: 4,
    height: 4,
    entrance: { col: 1, row: 1 },
    ambientTemperature: 25,
    stepMinutes: 5,
    resources: [
      { id: "stick", density: 0.7, stock: 12, renewMinutes: 30 },
      { id: "berry", density: 0.5, stock: 8, renewMinutes: 40 },
      { id: "moss", density: 0.4, stock: 6, renewMinutes: 60 },
      { id: "fiber", density: 0.4, stock: 6, renewMinutes: 60 },
    ],
    solving: { streak: 480 },
    solvingText:
      "480 minut bez utraty zdrowia od zimna i głodu i bez zmiany programu",
    completionText: "Las rozwiązany",
  },
  forestDeep: {
    name: "Las — głębiej",
    width: 5,
    height: 5,
    entrance: null,
    ambientTemperature: 7,
    stepMinutes: 5,
    resources: [
      { id: "stick", density: 0.7, stock: 12, renewMinutes: 30 },
      { id: "berry", density: 0.5, stock: 8, renewMinutes: 40 },
      { id: "moss", density: 0.4, stock: 6, renewMinutes: 60 },
      { id: "fiber", density: 0.4, stock: 6, renewMinutes: 60 },
    ],
    attackers: [{ id: "wolf", chancePerMinute: 0.01, cooldownMinutes: 180 }],
    solving: { streak: 540, defeatedAttacks: 2 },
    solvingText:
      "540 minut bez utraty zdrowia od zimna i głodu i bez zmiany programu oraz dwie pokonane napaści wilka",
    completionText: "Las — głębiej rozwiązany",
    opensAfter: "forest",
  },
} as const satisfies Record<string, MapDef>;

export type MapId = keyof typeof MAPS;
