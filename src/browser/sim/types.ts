import type { ArchetypeId } from "./data/archetypes.js";
import type { MapId } from "./data/maps.js";
import type { ResourceId } from "./data/resources.js";

export type { ArchetypeId, MapId, ResourceId };

/** Axial hex coordinates. */
export type Hex = { q: number; r: number };

export type Condition =
  | { kind: "always" }
  | { kind: "hereBelow"; resource: ResourceId; value: number };

export type Action =
  | { kind: "explore" }
  | { kind: "wander" }
  | { kind: "walkTo"; resource: ResourceId };

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

export type MapRun = {
  mapId: MapId;
  /** uint32 */
  seed: number;
  /** Game minutes since the start; 0 at start. */
  minute: number;
  /** Row-major: row 0 col 0, row 0 col 1, ... */
  tiles: Tile[];
  /** The team's character in the map run, by its id, and the tile it stands on. */
  character: { id: CharacterId; at: Hex };
  /** Always set while the run exists. */
  current: CurrentActivity;
  /** Generator state of the wander stream. */
  wanderRandom: number;
};

/** Tells the characters of the team apart; two characters may share a name. */
export type CharacterId = number;

/** A character of the player's team. */
export type Character = {
  id: CharacterId;
  name: string;
  archetypeId: ArchetypeId;
};

/** The team's chest: pieces held, by resource; a key absent holds none. */
export type Chest = { pieces: Partial<Record<ResourceId, number>> };

/** The player's one team: its characters in the order they were created, and its chest. */
export type Team = { characters: Character[]; chest: Chest };

export type GameState = {
  program: Program;
  team: Team;
  /** The id the next created character takes. */
  nextCharacterId: CharacterId;
  /** null = the headquarters. */
  run: MapRun | null;
  /** Seed of the latest send; INITIAL_SEED at start. */
  lastSeed: number;
  paused: boolean;
  /** Scaled real ms not yet turned into a game minute, 0 <= x < 1000. */
  realMsCarry: number;
};
