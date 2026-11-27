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

/** What a rung's row gives of a resource of its opener: the identifier and only the numbers that differ. */
export type RungResourceRow = Partial<Omit<MapResourceDef, "id">> &
  Pick<MapResourceDef, "id">;

/** What a rung's row gives of an attacker of its opener: the identifier and only the numbers that differ. */
export type RungAttackerRow = Partial<Omit<MapAttackerDef, "id">> &
  Pick<MapAttackerDef, "id">;

/**
 * The row of a rung (D-464): a map that differs from the map that opens it by its numbers alone. The
 * row names the map that opens it and gives only the numbers that differ; the rest of the map is the
 * opener's. No row names the rung (D-465), its region, or the creature of its record: they follow
 * from the opener, and the creatures themselves are never changed.
 */
export type RungRow = {
  /** The map that opens the rung, which stands before the row in the data. */
  opensAfter: string;
  carryIn?: number;
  carryOut?: number;
  width?: number;
  height?: number;
  entrance?: MapDef["entrance"];
  ambientTemperature?: number;
  stepMinutes?: number;
  /** Matched to the opener's resources by identifier; a resource the row leaves out stays as it is. */
  resources?: RungResourceRow[];
  /** Matched to the opener's attackers by identifier; an attacker the row leaves out stays as it is. */
  attackers?: RungAttackerRow[];
  /** Only the kinds of solving condition the opener has; a kind the row leaves out stays as it is. */
  solving?: SolvingDef;
  solvingText: string;
  goalText: string;
  completionText: string;
  name?: never;
  region?: never;
  recordCreature?: never;
};

/** A row of the maps' data: a whole map, or the row of a rung. */
export type MapRow = MapDef | RungRow;

function isRung(row: MapRow): row is RungRow {
  return !("name" in row);
}

/** The values of an object that are not undefined, so that a row's omission never overwrites a number. */
function defined<T extends object>(values: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(values).filter(([, value]) => value !== undefined),
  ) as Partial<T>;
}

/** The opener's entries in their order, each with the numbers its row's entry of the same identifier gives. */
function matchedById<T extends { id: string }>(
  openers: readonly T[],
  rows: readonly (Partial<T> & Pick<T, "id">)[],
  kind: string,
  rung: string,
): T[] {
  const ids = new Set(openers.map((entry) => entry.id));
  const seen = new Set<string>();
  for (const { id } of rows) {
    if (!ids.has(id))
      throw new Error(
        `${rung} gives the ${kind} ${id}, which its opener lacks`,
      );
    if (seen.has(id)) throw new Error(`${rung} gives the ${kind} ${id} twice`);
    seen.add(id);
  }
  return openers.map((entry) => ({
    ...entry,
    ...defined(rows.find(({ id }) => id === entry.id) ?? {}),
  }));
}

/** The solving condition of the opener with the numbers its row gives, of kinds the opener has. */
function solvingOf(
  opener: SolvingDef,
  row: SolvingDef,
  rung: string,
): SolvingDef {
  for (const kind of Object.keys(row))
    if (!Object.hasOwn(opener, kind))
      throw new Error(
        `${rung} gives the kind of solving condition ${kind}, which its opener lacks`,
      );
  return { ...opener, ...defined(row) };
}

/**
 * The whole map of a rung from its row and the map that opens it (D-464): the numbers the row gives,
 * the resources, the attackers and the solving condition matched to the opener's by identifier and by
 * kind, the sentences the row writes, the given name, and everything else the opener's. A row that
 * would add a resource, an attacker or a kind of solving condition the opener lacks is refused.
 */
export function composeRung(
  opener: MapDef,
  row: RungRow,
  name: string,
): MapDef {
  return {
    ...opener,
    ...defined({
      carryIn: row.carryIn,
      carryOut: row.carryOut,
      width: row.width,
      height: row.height,
      entrance: row.entrance,
      ambientTemperature: row.ambientTemperature,
      stepMinutes: row.stepMinutes,
    }),
    name,
    resources: matchedById(
      opener.resources,
      row.resources ?? [],
      "resource",
      name,
    ),
    ...(row.attackers === undefined && opener.attackers === undefined
      ? {}
      : {
          attackers: matchedById(
            opener.attackers ?? [],
            row.attackers ?? [],
            "attacker",
            name,
          ),
        }),
    solving: solvingOf(opener.solving, row.solving ?? {}, name),
    solvingText: row.solvingText,
    goalText: row.goalText,
    completionText: row.completionText,
    opensAfter: row.opensAfter,
  };
}

const NUMERALS: readonly (readonly [number, string])[] = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

function romanNumeral(place: number): string {
  let rest = place;
  let numeral = "";
  for (const [value, letters] of NUMERALS)
    while (rest >= value) {
      numeral += letters;
      rest -= value;
    }
  return numeral;
}

/**
 * The maps of the data from their rows, in the rows' order (D-466). A row that is a whole map stands
 * as it is; a rung's row is composed with the map that opens it, which must stand before it in the
 * rows, and is named after the first map of its line of rungs that is no rung with the Roman numeral
 * of its place in the line, the first rung taking II (D-465).
 */
export function composeMaps<T extends Record<string, MapRow>>(
  rows: T,
): { [Id in keyof T]: MapDef } {
  const composed = new Map<
    string,
    { map: MapDef; head: string; place: number }
  >();
  for (const [id, row] of Object.entries(rows)) {
    if (!isRung(row)) {
      composed.set(id, { map: row, head: row.name, place: 1 });
      continue;
    }
    const opener = composed.get(row.opensAfter);
    if (opener === undefined)
      throw new Error(
        `the rung ${id} names ${row.opensAfter} as its opener, which does not stand before it in the data`,
      );
    const place = opener.place + 1;
    const name = `${opener.head} ${romanNumeral(place)}`;
    composed.set(id, {
      map: composeRung(opener.map, row, name),
      head: opener.head,
      place,
    });
  }
  return Object.fromEntries(
    [...composed].map(([id, { map }]) => [id, map]),
  ) as { [Id in keyof T]: MapDef };
}

const ROWS = {
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
  forestDeep2: {
    opensAfter: "forestDeep",
    attackers: [{ id: "wolf", chancePerMinute: 0.01, cooldownMinutes: 150 }],
    solving: { streak: 600, defeatedAttacks: 3 },
    solvingText:
      "600 minut bez utraty zdrowia od zimna i głodu i bez zmiany programu oraz trzy pokonane napaści wilka",
    goalText: "Dziesięć godzin bez zmiany programu i trzy pokonane wilki.",
    completionText: "Las — głębiej II rozwiązany",
  },
  forestDeep3: {
    opensAfter: "forestDeep2",
    attackers: [{ id: "wolf", chancePerMinute: 0.012, cooldownMinutes: 120 }],
    solving: { streak: 660, defeatedAttacks: 4 },
    solvingText:
      "660 minut bez utraty zdrowia od zimna i głodu i bez zmiany programu oraz cztery pokonane napaści wilka",
    goalText: "Jedenaście godzin bez zmiany programu i cztery pokonane wilki.",
    completionText: "Las — głębiej III rozwiązany",
  },
  forestDeep4: {
    opensAfter: "forestDeep3",
    attackers: [{ id: "wolf", chancePerMinute: 0.014, cooldownMinutes: 100 }],
    solving: { streak: 720, defeatedAttacks: 5 },
    solvingText:
      "720 minut bez utraty zdrowia od zimna i głodu i bez zmiany programu oraz pięć pokonanych napaści wilka",
    goalText: "Dwanaście godzin bez zmiany programu i pięć pokonanych wilków.",
    completionText: "Las — głębiej IV rozwiązany",
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
} as const satisfies Record<string, MapRow>;

/**
 * The maps of the game in the order of the data (D-466): each map that is no rung as a whole row, each
 * rung composed from its row and the map that opens it (D-464), named by the game (D-465).
 */
export const MAPS = composeMaps(ROWS);

export type MapId = keyof typeof MAPS;
