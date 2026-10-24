import type { ResourceId } from "./resources.js";

export type MapResourceDef = {
  id: ResourceId;
  /** Chance that a tile holds the resource. */
  density: number;
  /** Stock of a tile that holds the resource. */
  stock: number;
  renewMinutes: number;
};

export type MapDef = {
  name: string;
  width: number;
  height: number;
  entrance: { col: number; row: number };
  /** Degrees Celsius; a body cools the further this lies below its starting temperature. */
  ambientTemperature: number;
  /** Game minutes to enter a tile. */
  stepMinutes: number;
  /** Order is part of the layout contract: reordering changes every seed's layout. */
  resources: MapResourceDef[];
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
  },
} as const satisfies Record<string, MapDef>;

export type MapId = keyof typeof MAPS;
