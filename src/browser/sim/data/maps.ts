import type { ResourceId } from "./resources.js";
import type { CreatureId } from "./creatures.js";

/**
 * The regions of the maps, in the order the catalog shows them. A map names its region in its data,
 * so a typo is a type error and a region the list lacks cannot be named.
 */
export const REGIONS = ["Las"] as const;

export type RegionName = (typeof REGIONS)[number];

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
  /** The region whose group the map stands in, in the catalog of maps. */
  region: RegionName;
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
  /** The condition as a sentence without the map's name; the card of the map shows it in its part „Żąda” (D-133). */
  solvingText: string;
  /**
   * The one short sentence of what the map demands, written by hand as the predecessor game writes it, with
   * the hours and the attacks to beat of the map's solving condition; the card shows it under its heading
   * (D-327).
   */
  goalText: string;
  /** The whole text „Teraz” shows after a completion, agreeing with the name. */
  completionText: string;
  /** The map that must be solved before this one can be sent to. */
  opensAfter?: string;
  /** The creature whose health the record of the damage shows for the map; left out, the map shows no such record. */
  recordCreature?: CreatureId;
};

export const MAPS = {
  forestEdge: {
    name: "Skraj lasu",
    region: "Las",
    width: 4,
    height: 4,
    entrance: { col: 1, row: 1 },
    ambientTemperature: 25,
    stepMinutes: 5,
    resources: [
      { id: "stick", density: 1, stock: 12, renewMinutes: 30 },
      { id: "berry", density: 1, stock: 8, renewMinutes: 40 },
    ],
    solving: { streak: 480 },
    solvingText:
      "480 minut bez utraty zdrowia od zimna i głodu i bez zmiany programu",
    goalText: "Osiem godzin bez jednej zmiany programu.",
    completionText: "Skraj lasu rozwiązany",
  },
  forest: {
    name: "Las",
    region: "Las",
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
    goalText: "Osiem godzin bez jednej zmiany programu.",
    completionText: "Las rozwiązany",
    opensAfter: "forestEdge",
  },
  forestDeep: {
    name: "Las — głębiej",
    region: "Las",
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
    goalText: "Dziewięć godzin bez zmiany programu i dwa pokonane wilki.",
    completionText: "Las — głębiej rozwiązany",
    opensAfter: "forest",
  },
  forestPack: {
    name: "Las — wataha",
    region: "Las",
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
    attackers: [{ id: "wolf", chancePerMinute: 0.015, cooldownMinutes: 90 }],
    solving: { streak: 540, defeatedAttacks: 6 },
    solvingText:
      "540 minut bez utraty zdrowia od zimna i głodu i bez zmiany programu oraz sześć pokonanych napaści wilka",
    goalText: "Dziewięć godzin bez zmiany programu i sześć pokonanych wilków.",
    completionText: "Las — wataha rozwiązany",
    opensAfter: "forestDeep",
  },
  forestLair: {
    name: "Las — matecznik",
    region: "Las",
    carryIn: 0,
    width: 6,
    height: 6,
    entrance: null,
    ambientTemperature: 7,
    stepMinutes: 5,
    resources: [
      { id: "stick", density: 0.5, stock: 12, renewMinutes: 30 },
      { id: "berry", density: 0.4, stock: 8, renewMinutes: 40 },
      { id: "moss", density: 0.3, stock: 6, renewMinutes: 60 },
      { id: "fiber", density: 0.3, stock: 6, renewMinutes: 60 },
    ],
    attackers: [{ id: "bear", chancePerMinute: 0.01, cooldownMinutes: 180 }],
    solving: { streak: 600, defeatedAttacks: 1 },
    solvingText:
      "600 minut bez utraty zdrowia od zimna i głodu i bez zmiany programu oraz jedna pokonana napaść niedźwiedzia",
    goalText:
      "Dziesięć godzin bez zmiany programu i jeden pokonany niedźwiedź.",
    completionText: "Las — matecznik rozwiązany",
    opensAfter: "forestPack",
    recordCreature: "bear",
  },
} as const satisfies Record<string, MapDef>;

export type MapId = keyof typeof MAPS;
