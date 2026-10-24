import type { ArchetypeId } from "./data/archetypes.js";
import type { ItemId } from "./data/items.js";
import type { MapId } from "./data/maps.js";
import type { ResourceId } from "./data/resources.js";
import type { Traits } from "./data/traits.js";

export type { ArchetypeId, ItemId, MapId, ResourceId, Traits };

/** Axial hex coordinates. */
export type Hex = { q: number; r: number };

/** A condition of a program rule; `value` is the number it compares with, on its kind's step. */
export type Condition =
  | { kind: "always" }
  | { kind: "hereBelow"; resource: ResourceId; value: number }
  | { kind: "temperatureBelow"; value: number }
  | { kind: "satietyBelow"; value: number }
  | { kind: "itemBelow"; item: ItemId; value: number }
  | { kind: "campfireLeftBelow"; value: number }
  | { kind: "awayFromCampfire" };

export type Action =
  | { kind: "explore" }
  | { kind: "wander" }
  | { kind: "walkTo"; resource: ResourceId }
  | { kind: "walkToCampfire" }
  | { kind: "gather"; resource: ResourceId }
  | { kind: "craftCampfire" }
  | { kind: "lightCampfire" }
  | { kind: "lightItem" }
  | { kind: "feedCampfire" }
  | { kind: "eat" };

export type ProgramRule = { condition: Condition; action: Action };

export type Program = { rules: ProgramRule[] };

export type Tile = {
  /** Both coordinate forms, fixed. */
  col: number;
  row: number;
  at: Hex;
  revealed: boolean;
  /** Cost of entering this tile, in game minutes. */
  stepMinutes: number;
  /** A key present means the tile has the resource. */
  stock: Partial<Record<ResourceId, number>>;
};

/** What the character is doing now. */
export type Activity =
  { kind: "rule"; ruleIndex: number; action: Action } | { kind: "wait" };

export type CurrentActivity = {
  activity: Activity;
  startMinute: number;
  /** Greater than startMinute. */
  endMinute: number;
  /** Target tile of a move, else null. */
  stepTo: Hex | null;
};

/** The character's body; each number rounded to six decimal places. */
export type Body = {
  /** Degrees Celsius. */
  temperature: number;
  /** Percent. */
  satiety: number;
  health: number;
};

/** Pieces held of each item; an item not held stands at 0. */
export type Backpack = Record<ItemId, number>;

/** The character of a map run: who it is, where it stands, what it is and what it carries. */
export type Character = {
  archetypeId: ArchetypeId;
  at: Hex;
  traits: Traits;
  backpack: Backpack;
};

/** A campfire standing on its tile; a tile holds at most one. */
export type Campfire = {
  at: Hex;
  /** Minutes of burning left; 0 means extinguished, standing on its tile unlit. */
  minutesLeft: number;
};

/** A lit piece of an item burning on its tile; gone once its minutes run out. */
export type BurningItem = {
  item: ItemId;
  at: Hex;
  /** Greater than 0. */
  minutesLeft: number;
};

export type DeathCause = "cold" | "hunger";

/** The end of a map run in the character's death. */
export type Death = { minute: number; cause: DeathCause };

export type MapRun = {
  mapId: MapId;
  /** uint32 */
  seed: number;
  /** Game minutes since the start; 0 at start. */
  minute: number;
  /** Row-major: row 0 col 0, row 0 col 1, ... */
  tiles: Tile[];
  character: Character;
  body: Body;
  /** None at start. */
  campfires: Campfire[];
  /** None at start. */
  burningItems: BurningItem[];
  /** Always set while the run exists; kept as it stood when the character dies. */
  current: CurrentActivity;
  /** Generator state of the wander stream. */
  wanderRandom: number;
  /** Generator state of the gathering stream. */
  gatherRandom: number;
  /** Set once the character dies; then no game minute passes. */
  death: Death | null;
};

export type GameState = {
  program: Program;
  /** null = sending screen. */
  run: MapRun | null;
  /** Seed of the latest send; INITIAL_SEED at start. */
  lastSeed: number;
  paused: boolean;
  /** Scaled real ms not yet turned into a game minute, 0 <= x < 1000. */
  realMsCarry: number;
};
