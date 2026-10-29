import type { ArchetypeId } from "./data/archetypes.js";
import type { BALANCE } from "./data/balance.js";
import type { CAMPFIRE } from "./data/campfire.js";
import type { ItemId } from "./data/items.js";
import type { MapId } from "./data/maps.js";
import type { ResourceId } from "./data/resources.js";
import type { Traits } from "./data/traits.js";

export type { ArchetypeId, ItemId, MapId, ResourceId, Traits };

/** A multiplier of the game minutes per real second that the player picks, from the data. */
export type Pace = (typeof BALANCE.paces)[number];

/** Axial hex coordinates. */
export type Hex = { q: number; r: number };

/** A condition of a program rule or group; `value` is the number it compares with, on its kind's step. */
export type Condition =
  | { kind: "always" }
  | { kind: "hereBelow"; resource: ResourceId; value: number }
  | { kind: "temperatureBelow"; value: number }
  | { kind: "satietyBelow"; value: number }
  | { kind: "itemBelow"; item: ItemId; value: number }
  | { kind: "campfireLeftBelow"; value: number }
  | { kind: "healthBelow"; value: number }
  | { kind: "opponentHealthBelow"; value: number }
  | { kind: "awayFromCampfire" };

/** Health values for the side whose rule is being checked and its opponent, when present. */
export type ConditionContext = {
  health: number;
  opponentHealth?: number;
};

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

/** Stable within a program, including after a rule moves to another group. */
export type RuleId = number;
export type GroupId = number;

export type ProgramRule = { id: RuleId; condition: Condition; action: Action };

export type RuleGroup = {
  id: GroupId;
  name: string;
  condition: Condition;
  rules: ProgramRule[];
};

export type Program = {
  groups: RuleGroup[];
  /** Identities allocated to the next group and rule, never derived from their positions. */
  nextGroupId: GroupId;
  nextRuleId: RuleId;
};

/** What the Understanding records of the campfire: it is discoverable, yet no item of the backpack. */
export type CampfireId = typeof CAMPFIRE.id;

/**
 * What the player has discovered, by data identifiers: actions and conditions by their kinds, and
 * items, the campfire included, by their ids. One for the whole game and every character. Also the
 * shape of a repertoire, the subset of it that a character can use.
 */
export type Understanding = {
  actions: Action["kind"][];
  conditions: Condition["kind"][];
  items: (ItemId | CampfireId)[];
};

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
  { kind: "rule"; ruleId: RuleId; action: Action } | { kind: "wait" };

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

/**
 * The character of a map run: the team's character it is, by its id, where it stands, its own copy
 * of the character's traits for the map run and what it carries.
 */
export type RunCharacter = {
  id: CharacterId;
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

/** The end of a map run in a completion: the map's solving condition met. */
export type Completion = { minute: number };

export type MapRun = {
  mapId: MapId;
  /** uint32 */
  seed: number;
  /** Game minutes since the start; 0 at start. */
  minute: number;
  /** Row-major: row 0 col 0, row 0 col 1, ... */
  tiles: Tile[];
  character: RunCharacter;
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
  /**
   * The successive game minutes, up to the latest, in which the character lost no health to cold or
   * hunger; 0 at start, and 0 in the game minute of death.
   */
  streak: number;
  /** Set once the character dies; then no game minute passes. */
  death: Death | null;
  /** Set once the map run meets the solving condition of its map; then no game minute passes. */
  completion: Completion | null;
};

/** Tells the characters of the team apart; two characters may share a name. */
export type CharacterId = number;

/** A character of the player's team; its traits are made when it is created and saved with it. */
export type Character = {
  id: CharacterId;
  name: string;
  archetypeId: ArchetypeId;
  traits: Traits;
};

/** The team's chest: pieces held, by resource; a key absent holds none. */
export type Chest = { pieces: Partial<Record<ResourceId, number>> };

/** The player's one team: its characters in the order they were created, and its chest. */
export type Team = { characters: Character[]; chest: Chest };

export type GameState = {
  program: Program;
  /** What the player has discovered; never changed by creating, sending, restarting, ending or death. */
  understanding: Understanding;
  /** Starts per rule in the current or last map run; null before the first run. */
  ruleCounts: Record<RuleId, number> | null;
  team: Team;
  /** The id the next created character takes. */
  nextCharacterId: CharacterId;
  /** null = the headquarters. */
  run: MapRun | null;
  /** Seed of the latest send; INITIAL_SEED at start. */
  lastSeed: number;
  paused: boolean;
  /**
   * The maps solved in this game, by identifier, in the order of their first completion, each
   * once; `[]` in a new game. Only the game minute of a completion adds to it, and nothing removes.
   */
  solvedMaps: MapId[];
  /**
   * The pace the player picked, 1 in a new game; only `setPace` changes it, so it stays through
   * pausing, restarting, ending and sending.
   */
  pace: Pace;
  /**
   * What the last game minute of a discovery revealed, set together with the pause that minute
   * leaves, and null once the player moves on (resume, restart, end, send); null in a new game.
   */
  discovery: Understanding | null;
  /** Scaled real ms (at the pace in force when passed) not yet a game minute, 0 <= x < 1000. */
  realMsCarry: number;
};
