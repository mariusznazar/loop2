import { ACTIONS } from "./data/actions.js";
import { ARCHETYPES, type ArchetypeId } from "./data/archetypes.js";
import { BALANCE } from "./data/balance.js";
import { CAMPFIRE } from "./data/campfire.js";
import { CONDITIONS } from "./data/conditions.js";
import { CREATURES } from "./data/creatures.js";
import { ITEMS } from "./data/items.js";
import { MAPS, type MapDef } from "./data/maps.js";
import { RESOURCES } from "./data/resources.js";
import {
  BRANCHES,
  SKILLS,
  type BranchId,
  type SkillId,
} from "./data/skills.js";
import { characterName } from "./game.js";
import { hexDistance, offsetToAxial, sameHex } from "./hex.js";
import { checkProgram, ProgramCheckError } from "./programs.js";
import { mapRunEnded } from "./run.js";
import { skillProgress } from "./skills.js";
import { pieceCount } from "./trip.js";
import type {
  Action,
  Activity,
  ActiveCombat,
  AwayReportLine,
  Backpack,
  Body,
  BurningItem,
  Campfire,
  CampfireId,
  Character,
  CharacterId,
  CharacterSkills,
  Chest,
  CombatCharacterAction,
  CombatCreatureAction,
  CombatExchange,
  CombatOutcome,
  CombatResult,
  Completion,
  CurrentActivity,
  Death,
  DeathCause,
  DeathSettlement,
  EarningLoop,
  GameMapRun,
  GameState,
  Hex,
  ItemId,
  LastCombat,
  LoopStop,
  MapId,
  MapRun,
  Pace,
  Practice,
  Program,
  ProgramCopy,
  ProgramId,
  ResourceId,
  RuleId,
  RunCharacter,
  SavedProgram,
  Team,
  Tile,
  Traits,
  TripEntry,
  Understanding,
} from "./types.js";

/**
 * The version of the shape of the saved game state. Raise it with every change of the shape: of
 * `GameState` or a type it reaches, and of the items of the data, which `Backpack` enumerates.
 */
export const SAVED_GAME_VERSION = 3;

/** The document the game saves: the version of its shape beside the game state. */
export type SavedGame = { version: number; game: GameState };

/**
 * Why a saved game state does not load: another version of the shape, a character of an archetype
 * the data lacks, or anything else the game state's types, closed lists and data do not admit.
 */
export type SavedGameRefusal = "version" | "archetype" | "shape";

/** The game state a saved document gives, or the reason it gives none. */
export type LoadedGame =
  { ok: true; state: GameState } | { ok: false; reason: SavedGameRefusal };

/** The saved document of a game state: the current version and a copy of the state, shared nowhere. */
export function savedGame(state: GameState): SavedGame {
  // The game state is plain JSON data, so its JSON text copies all of it.
  return {
    version: SAVED_GAME_VERSION,
    game: JSON.parse(JSON.stringify(state)) as GameState,
  };
}

/** What stops the reading of a document it does not admit; every other error is a fault of the code. */
class Refused extends Error {}

/** Stops the reading of a document it does not admit; the load catches it and refuses. */
function refuse(): never {
  throw new Refused("saved game: not admitted");
}

/** An object made by an object literal or JSON.parse: neither a list nor of another prototype. */
function plainObject(value: unknown): object {
  if (typeof value !== "object" || value === null || Array.isArray(value))
    refuse();
  const prototype: unknown = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) refuse();
  return value;
}

/** The value of an own data key; an inherited key, an accessor or no key is not admitted. */
function own(object: object, key: string): unknown {
  const descriptor = Object.getOwnPropertyDescriptor(object, key);
  if (!descriptor || !("value" in descriptor)) refuse();
  return descriptor.value as unknown;
}

/** The values of a plain object whose own keys are exactly `keys`, `__proto__` included. */
function fields<K extends string>(
  value: unknown,
  keys: readonly K[],
): Record<K, unknown> {
  const object = plainObject(value);
  const names = Reflect.ownKeys(object);
  if (names.length !== keys.length || !keys.every((key) => names.includes(key)))
    refuse();
  const read = {} as Record<K, unknown>;
  for (const key of keys) read[key] = own(object, key);
  return read;
}

/** The items of a list with no hole and no key besides its indexes and its length. */
function list(value: unknown): unknown[] {
  if (!Array.isArray(value) || Object.getPrototypeOf(value) !== Array.prototype)
    refuse();
  const items: readonly unknown[] = value;
  if (Reflect.ownKeys(items).length !== items.length + 1) refuse();
  return Array.from({ length: items.length }, (_, index) =>
    own(items, String(index)),
  );
}

/** The own keys of a plain object with their values, each key a text. */
function entries(value: unknown): [string, unknown][] {
  const object = plainObject(value);
  return Reflect.ownKeys(object).map((key) => {
    if (typeof key !== "string") refuse();
    return [key, own(object, key)];
  });
}

function text(value: unknown): string {
  if (typeof value !== "string") refuse();
  return value;
}

function flag(value: unknown): boolean {
  if (typeof value !== "boolean") refuse();
  return value;
}

/** A finite number, from `min` up. */
function finite(value: unknown, min = -Infinity): number {
  if (typeof value !== "number" || !Number.isFinite(value) || value < min)
    refuse();
  return value;
}

/** A safe integer, such as a coordinate, from `min` up. */
function integer(value: unknown, min = -Infinity): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < min)
    refuse();
  return value;
}

/** A count or a game minute: a safe integer from 0 up. */
function count(value: unknown): number {
  return integer(value, 0);
}

/** An identity: a safe integer from 1 up. */
function identity(value: unknown): number {
  return integer(value, 1);
}

/** The state of a generator or a seed: an unsigned 32-bit integer. */
function uint32(value: unknown): number {
  const number = count(value);
  if (number > 0xffffffff) refuse();
  return number;
}

/** An identity written as an object's key, in its one canonical form. */
function identityKey(key: string): number {
  const number = Number(key);
  if (String(number) !== key) refuse();
  return identity(number);
}

/** A key of a closed list of the data or of a type: an own key of `closed`. */
function oneOf<K extends string>(
  value: unknown,
  closed: Readonly<Record<K, unknown>>,
): K {
  if (typeof value !== "string" || !Object.hasOwn(closed, value)) refuse();
  return value as K;
}

/** A list of keys of `closed`, each once. */
function uniqueOf<K extends string>(
  value: unknown,
  closed: Readonly<Record<K, unknown>>,
): K[] {
  const keys = list(value).map((item) => oneOf(item, closed));
  if (new Set(keys).size !== keys.length) refuse();
  return keys;
}

/** A name as the game gives one: no white space around it, not empty. */
function givenName(value: unknown): string {
  const named = text(value);
  if (characterName(named) !== named) refuse();
  return named;
}

/** The value has exactly the keys and the values of `canonical`, at every depth. */
function matches(value: unknown, canonical: unknown): void {
  if (typeof canonical !== "object" || canonical === null) {
    if (value !== canonical) refuse();
  } else if (Array.isArray(canonical)) {
    const items = list(value);
    if (items.length !== canonical.length) refuse();
    items.forEach((item, index) => matches(item, canonical[index]));
  } else {
    const keys = Object.keys(canonical);
    const read = fields(value, keys);
    const expected = canonical as Record<string, unknown>;
    for (const key of keys) matches(read[key], expected[key]);
  }
}

/**
 * A program the existing program check admits as it stands: its closed lists, its numbers on their
 * steps, its identities and its trip counts, safe integers from 1 up (D-181), with no key besides
 * those the check builds.
 */
function program(value: unknown): Program {
  try {
    const checked = checkProgram(value, null);
    matches(value, checked);
    return checked;
  } catch (error) {
    if (error instanceof ProgramCheckError) refuse();
    throw error;
  }
}

/** An action of the closed list, read by the program check as an action of a program rule. */
function action(value: unknown): Action {
  const always = { kind: "always" };
  const [group] = program({
    groups: [
      {
        id: 1,
        name: "",
        condition: always,
        rules: [{ id: 1, condition: always, action: value }],
      },
    ],
    nextGroupId: 2,
    nextRuleId: 2,
    tripPlan: { take: [], bring: [] },
  }).groups;
  return group.rules[0].action;
}

/** A trip list: items of the data, each at most once, each count a safe integer from 1 up (D-181). */
function tripList(value: unknown): TripEntry[] {
  const seen = new Set<ItemId>();
  return list(value).map((entry): TripEntry => {
    const read = fields(entry, ["item", "count"]);
    const item = oneOf(read.item, ITEMS);
    if (seen.has(item)) refuse();
    seen.add(item);
    return { item, count: identity(read.count) };
  });
}

const PACES: readonly number[] = BALANCE.paces;

const DEATH_CAUSES: Record<DeathCause, true> = {
  cold: true,
  hunger: true,
  combat: true,
};

const COMBAT_OUTCOMES: Record<CombatOutcome, true> = {
  creatureDefeated: true,
  characterDied: true,
  creatureDeparted: true,
};

type CombatActionKind = CombatCharacterAction["action"]["kind"];

const COMBAT_ACTIONS: Record<CombatActionKind, true> = {
  strikeWithStick: true,
  kick: true,
  dodge: true,
};

function isCombatAction(
  value: Action,
): value is CombatCharacterAction["action"] {
  return Object.hasOwn(COMBAT_ACTIONS, value.kind);
}

/** The actions that move the character to a neighbouring tile, so their activity holds its target. */
const MOVES: Partial<Record<Action["kind"], true>> = {
  wander: true,
  walkTo: true,
  walkToCampfire: true,
};

/** What the Understanding records as items: the items of the data and the campfire. */
const DISCOVERABLE_ITEMS: Record<ItemId | CampfireId, unknown> = {
  ...ITEMS,
  [CAMPFIRE.id]: CAMPFIRE,
};

const ITEM_IDS = Object.keys(ITEMS) as ItemId[];

function understanding(value: unknown): Understanding {
  const read = fields(value, [
    "trees",
    "actions",
    "conditions",
    "items",
    "creatures",
  ]);
  return {
    trees: uniqueOf(read.trees, SKILLS),
    actions: uniqueOf(read.actions, ACTIONS),
    conditions: uniqueOf(read.conditions, CONDITIONS),
    items: uniqueOf(read.items, DISCOVERABLE_ITEMS),
    creatures: uniqueOf(read.creatures, CREATURES),
  };
}

function traits(value: unknown): Traits {
  const read = fields(value, ["carryingCapacity"]);
  return { carryingCapacity: count(read.carryingCapacity) };
}

/** Pieces by resource, a key absent holding none. */
function pieces(value: unknown): Partial<Record<ResourceId, number>> {
  const held: Partial<Record<ResourceId, number>> = {};
  for (const [key, amount] of entries(value))
    held[oneOf(key, RESOURCES)] = count(amount);
  return held;
}

/** The chest: pieces by item, a key absent holding none, all together within its capacity. */
function chest(value: unknown): Chest {
  const read = fields(value, ["pieces"]);
  const held: Partial<Record<ItemId, number>> = {};
  for (const [key, amount] of entries(read.pieces))
    held[oneOf(key, ITEMS)] = count(amount);
  if (pieceCount(held) > BALANCE.chestCapacity) refuse();
  return { pieces: held };
}

/** Practice by character skill, each skill named holding some, as the effects add it (D-193). */
function practice(value: unknown): Practice {
  const held: Practice = {};
  for (const [key, amount] of entries(value))
    held[oneOf(key, SKILLS)] = identity(amount);
  return held;
}

/**
 * A character's skills (D-191): only skills its archetype predisposes it to, each its practice and
 * the ranks bought of branches of its own tree, each rank from 1 up to the branch's prices, bought
 * only in a tree the Understanding holds, and no more points spent than the practice's levels gave.
 */
function characterSkills(
  value: unknown,
  archetypeId: ArchetypeId,
  trees: readonly SkillId[],
): CharacterSkills {
  const predispositions: readonly SkillId[] =
    ARCHETYPES[archetypeId].predispositions;
  const skills: CharacterSkills = {};
  for (const [key, entry] of entries(value)) {
    const id = oneOf(key, SKILLS);
    if (!predispositions.includes(id)) refuse();
    const read = fields(entry, ["practice", "ranks"]);
    const ranks: Partial<Record<BranchId, number>> = {};
    for (const [branchKey, rank] of entries(read.ranks)) {
      const branch = oneOf(branchKey, BRANCHES);
      const bought = identity(rank);
      if (
        BRANCHES[branch].skill !== id ||
        bought > BRANCHES[branch].costs.length ||
        !trees.includes(id)
      )
        refuse();
      ranks[branch] = bought;
    }
    skills[id] = { practice: count(read.practice), ranks };
  }
  for (const id of Object.keys(skills) as SkillId[])
    if (skillProgress(skills, id).points < 0) refuse();
  return skills;
}

/** Counts by rule identity. */
function ruleCounts(value: unknown): Record<RuleId, number> {
  const counts: Record<RuleId, number> = {};
  for (const [key, ruleCount] of entries(value))
    counts[identityKey(key)] = count(ruleCount);
  return counts;
}

function hex(value: unknown): Hex {
  const read = fields(value, ["q", "r"]);
  return { q: integer(read.q), r: integer(read.r) };
}

/**
 * What the game state names a program or a character by, and what it holds of them: the
 * characters of the team, already read, by their numbers, and the skill trees the Understanding
 * holds.
 */
type Records = {
  nextProgramId: ProgramId;
  listed: ReadonlySet<ProgramId>;
  characters: ReadonlyMap<CharacterId, Character>;
  trees: readonly SkillId[];
  /** The maps solved, read before the map run: the mark of a run and its completion rest on them. */
  solved: readonly MapId[];
};

/** A program number the game gave, the number of a deleted program included (D-165). */
function givenProgram(value: unknown, records: Records): ProgramId {
  const id = identity(value);
  if (id >= records.nextProgramId) refuse();
  return id;
}

function listedProgram(value: unknown, records: Records): ProgramId {
  const id = identity(value);
  if (!records.listed.has(id)) refuse();
  return id;
}

/** Programs by the character of the team they stand for. */
function programsByCharacter(
  value: unknown,
  records: Records,
): Partial<Record<CharacterId, ProgramId>> {
  const byCharacter: Partial<Record<CharacterId, ProgramId>> = {};
  for (const [key, id] of entries(value)) {
    const character = identityKey(key);
    if (!records.characters.has(character)) refuse();
    byCharacter[character] = givenProgram(id, records);
  }
  return byCharacter;
}

/** The player's list of programs: never empty, numbers and names each once, letter case aside. */
function programList(value: unknown, nextProgramId: ProgramId): SavedProgram[] {
  const ids = new Set<ProgramId>();
  const names = new Set<string>();
  const programs = list(value).map((item): SavedProgram => {
    const read = fields(item, ["id", "name", "program"]);
    const id = identity(read.id);
    const named = givenName(read.name);
    const folded = named.toLowerCase();
    if (id >= nextProgramId || ids.has(id) || names.has(folded)) refuse();
    ids.add(id);
    names.add(folded);
    return { id, name: named, program: program(read.program) };
  });
  if (programs.length === 0) refuse();
  return programs;
}

/** The team: its characters, numbers each once and below the next one, and its chest. */
function team(
  value: unknown,
  nextCharacterId: CharacterId,
  trees: readonly SkillId[],
): Team {
  const read = fields(value, ["characters", "chest"]);
  const ids = new Set<CharacterId>();
  const characters = list(read.characters).map((item): Character => {
    const character = fields(item, [
      "id",
      "name",
      "archetypeId",
      "traits",
      "skills",
      "generation",
      "resurrectionReadyAtMs",
    ]);
    const id = identity(character.id);
    if (id >= nextCharacterId || ids.has(id)) refuse();
    ids.add(id);
    const archetypeId = oneOf(character.archetypeId, ARCHETYPES);
    return {
      id,
      name: givenName(character.name),
      archetypeId,
      traits: traits(character.traits),
      skills: characterSkills(character.skills, archetypeId, trees),
      generation: identity(character.generation),
      // Any safe integer: the moment is real time of a past death, and no clock is read here.
      resurrectionReadyAtMs: integer(character.resurrectionReadyAtMs),
    };
  });
  return { characters, chest: chest(read.chest) };
}

/** The tiles of a map run: row-major, as many as the map's layout has, each at its place. */
function tiles(value: unknown, map: MapDef): Tile[] {
  const items = list(value);
  if (items.length !== map.width * map.height) refuse();
  return items.map((item, index): Tile => {
    const read = fields(item, [
      "col",
      "row",
      "at",
      "revealed",
      "stepMinutes",
      "stock",
    ]);
    const col = index % map.width;
    const row = Math.floor(index / map.width);
    const at = hex(read.at);
    if (
      read.col !== col ||
      read.row !== row ||
      !sameHex(at, offsetToAxial(col, row))
    )
      refuse();
    return {
      col,
      row,
      at,
      revealed: flag(read.revealed),
      stepMinutes: count(read.stepMinutes),
      stock: pieces(read.stock),
    };
  });
}

function backpack(value: unknown): Backpack {
  const read = fields(value, ITEM_IDS);
  return Object.fromEntries(
    ITEM_IDS.map((item) => [item, count(read[item])]),
  ) as Backpack;
}

/** Nature energy from 0 up to the cap of the data (invariant nature-energy-range). */
function natureEnergy(value: unknown): number {
  const energy = finite(value, 0);
  if (energy > BALANCE.natureEnergy.max) refuse();
  return energy;
}

function body(value: unknown): Body {
  const read = fields(value, ["temperature", "satiety", "health"]);
  return {
    temperature: finite(read.temperature),
    satiety: finite(read.satiety, 0),
    health: finite(read.health, 0),
  };
}

const ACTIVITIES: { [K in Activity["kind"]]: (value: unknown) => Activity } = {
  wait: (value) => {
    fields(value, ["kind"]);
    return { kind: "wait" };
  },
  rule: (value) => {
    const read = fields(value, ["kind", "ruleId", "action"]);
    return {
      kind: "rule",
      ruleId: identity(read.ruleId),
      action: action(read.action),
    };
  },
};

function activity(value: unknown): Activity {
  return ACTIVITIES[oneOf(own(plainObject(value), "kind"), ACTIVITIES)](value);
}

/** Where the map run stands: its game minute, its tiles and its character's tile. */
type Place = { minute: number; onMap: (value: unknown) => Hex; at: Hex };

/** The activity going on: started by the map run's minute, a move heading for a neighbouring tile. */
function currentActivity(value: unknown, place: Place): CurrentActivity {
  const read = fields(value, [
    "activity",
    "startMinute",
    "endMinute",
    "stepTo",
  ]);
  const doing = activity(read.activity);
  const startMinute = count(read.startMinute);
  const endMinute = count(read.endMinute);
  if (startMinute > place.minute || endMinute <= startMinute) refuse();
  const stepTo = read.stepTo === null ? null : place.onMap(read.stepTo);
  const moves = doing.kind === "rule" && MOVES[doing.action.kind] === true;
  if (moves !== (stepTo !== null)) refuse();
  if (stepTo && hexDistance(stepTo, place.at) !== 1) refuse();
  return { activity: doing, startMinute, endMinute, stepTo };
}

/** An attack by its creature and game minutes, none after the map run's minute. */
function attack(read: Record<keyof ActiveCombat, unknown>, minute: number) {
  const attackMinute = count(read.attackMinute);
  const resolveMinute = count(read.resolveMinute);
  if (attackMinute > minute || resolveMinute < attackMinute) refuse();
  return {
    creatureId: oneOf(read.creatureId, CREATURES),
    attackMinute,
    resolveMinute,
  } satisfies ActiveCombat;
}

const COMBAT_KEYS = ["creatureId", "attackMinute", "resolveMinute"] as const;

const CREATURE_ACTIONS: {
  [K in CombatCreatureAction["kind"]]: (value: unknown) => CombatCreatureAction;
} = {
  strike: (value) => {
    const read = fields(value, ["kind", "damage", "characterHealth"]);
    return {
      kind: "strike",
      damage: finite(read.damage, 0),
      characterHealth: finite(read.characterHealth, 0),
    };
  },
  dodge: (value) => {
    fields(value, ["kind"]);
    return { kind: "dodge" };
  },
};

function characterAction(value: unknown): CombatCharacterAction {
  const read = fields(value, [
    "ruleId",
    "action",
    "damage",
    "creatureHealth",
    "characterHealth",
  ]);
  const acted = action(read.action);
  if (!isCombatAction(acted)) refuse();
  return {
    ruleId: identity(read.ruleId),
    action: acted,
    damage: finite(read.damage, 0),
    creatureHealth: finite(read.creatureHealth, 0),
    characterHealth: finite(read.characterHealth, 0),
  };
}

function exchange(value: unknown): CombatExchange {
  const read = fields(value, ["creatureAction", "characterAction"]);
  const creature = read.creatureAction;
  return {
    creatureAction:
      CREATURE_ACTIONS[
        oneOf(own(plainObject(creature), "kind"), CREATURE_ACTIONS)
      ](creature),
    characterAction:
      read.characterAction === null
        ? null
        : characterAction(read.characterAction),
  };
}

function combatResult(value: unknown): CombatResult {
  const read = fields(value, [
    "practice",
    "characterHealth",
    "creatureHealth",
    "outcome",
    "exchanges",
    "ruleStarts",
  ]);
  return {
    practice: practice(read.practice),
    characterHealth: finite(read.characterHealth, 0),
    creatureHealth: finite(read.creatureHealth, 0),
    outcome: oneOf(read.outcome, COMBAT_OUTCOMES),
    exchanges: list(read.exchanges).map(exchange),
    ruleStarts: ruleCounts(read.ruleStarts),
  };
}

function lastCombat(value: unknown, minute: number): LastCombat {
  const read = fields(value, [...COMBAT_KEYS, "result"]);
  return {
    ...attack(read, minute),
    result: read.result === null ? null : combatResult(read.result),
  };
}

/** The end of a map run, in its game minute: no game minute passes after it. */
function death(value: unknown, minute: number): Death {
  const read = fields(value, ["minute", "cause"]);
  if (read.minute !== minute) refuse();
  return { minute, cause: oneOf(read.cause, DEATH_CAUSES) };
}

function completion(value: unknown, minute: number): Completion {
  const read = fields(value, ["minute"]);
  if (read.minute !== minute) refuse();
  return { minute };
}

/** The copy: its program on the list, or none with the name the deleted program had (D-168). */
function copy(value: unknown, records: Records): ProgramCopy {
  const read = fields(value, ["program", "programId", "deletedName", "base"]);
  const content = program(read.program);
  const base = program(read.base);
  if (read.programId === null)
    return {
      program: content,
      programId: null,
      deletedName: givenName(read.deletedName),
      base,
    };
  if (read.deletedName !== null) refuse();
  return {
    program: content,
    programId: listedProgram(read.programId, records),
    deletedName: null,
    base,
  };
}

/**
 * What completion put in the chest: none before a completion, and at one the frozen bring plan's
 * entries in its order, each at most the count it plans (D-179, D-189); at the completion of a
 * marked run an empty list, since such a run deposits nothing.
 */
function deposited(
  value: unknown,
  bringPlan: readonly TripEntry[],
  completed: boolean,
  marked: boolean,
): TripEntry[] | null {
  if (value === null) {
    if (completed) refuse();
    return null;
  }
  if (!completed) refuse();
  const put = tripList(value);
  if (marked && put.length > 0) refuse();
  let from = 0;
  for (const entry of put) {
    const at = bringPlan.findIndex(
      (planned, index) => index >= from && planned.item === entry.item,
    );
    if (at < 0 || entry.count > bringPlan[at].count) refuse();
    from = at + 1;
  }
  return put;
}

/**
 * The generation a death that took everything gave: a number from 2 up, as such a death leaves, and
 * later deaths only raise it, so at most the character's current one.
 */
function lostGeneration(value: unknown, currentGeneration: number): number {
  const generation = integer(value, 2);
  if (generation > currentGeneration) refuse();
  return generation;
}

const SETTLEMENTS: {
  [K in DeathSettlement["kind"]]: (
    value: unknown,
    currentGeneration: number,
  ) => DeathSettlement;
} = {
  resurrectionUsed: (value) => {
    fields(value, ["kind"]);
    return { kind: "resurrectionUsed" };
  },
  progressLost: (value, currentGeneration) => {
    const read = fields(value, ["kind", "generation"]);
    return {
      kind: "progressLost",
      generation: lostGeneration(read.generation, currentGeneration),
    };
  },
};

/**
 * How a death was settled: none without a death, and at a death one of the closed list, so a death
 * unsettled does not load; a number of a death that took everything up to the current generation of
 * the map run's character.
 */
function deathSettlement(
  value: unknown,
  died: boolean,
  currentGeneration: number,
): DeathSettlement | null {
  if (value === null) {
    if (died) refuse();
    return null;
  }
  if (!died) refuse();
  return SETTLEMENTS[oneOf(own(plainObject(value), "kind"), SETTLEMENTS)](
    value,
    currentGeneration,
  );
}

/** The keys of a `MapRun`, exactly those of the map run of an earning loop. */
const MAP_RUN_KEYS = [
  "practice",
  "mapId",
  "seed",
  "minute",
  "tiles",
  "character",
  "body",
  "natureEnergy",
  "campfires",
  "burningItems",
  "current",
  "activeCombat",
  "lastCombat",
  "attackRandom",
  "attackCooldownStart",
  "wanderRandom",
  "gatherRandom",
  "streak",
  "defeatedAttacks",
  "death",
  "completion",
] as const;

/** The keys of a `GameMapRun`: those of a `MapRun` and the record of its copy. */
const GAME_MAP_RUN_KEYS = [
  ...MAP_RUN_KEYS,
  "copy",
  "bringPlan",
  "deposited",
  "solvedMapRun",
  "deathSettlement",
] as const;

/**
 * A `MapRun`, with what the simulation follows in it: its character in the team, with skills its
 * archetype allows, every place on its tiles, one campfire a tile, an attack going on only with no
 * activity and before an end, an activity going on until it ends, and an end in its own game minute.
 */
function plainMapRun(
  read: Record<(typeof MAP_RUN_KEYS)[number], unknown>,
  records: Records,
): MapRun {
  const mapId = oneOf(read.mapId, MAPS);
  const minute = count(read.minute);
  const layout = tiles(read.tiles, MAPS[mapId]);
  const onMap = (at: unknown): Hex => {
    const place = hex(at);
    if (!layout.some((tile) => sameHex(tile.at, place))) refuse();
    return place;
  };

  const carried = fields(read.character, [
    "skills",
    "id",
    "at",
    "traits",
    "backpack",
  ]);
  const id = identity(carried.id);
  const owner = records.characters.get(id);
  if (owner === undefined) refuse();
  const character: RunCharacter = {
    skills: characterSkills(carried.skills, owner.archetypeId, records.trees),
    id,
    at: onMap(carried.at),
    traits: traits(carried.traits),
    backpack: backpack(carried.backpack),
  };

  const campfires = list(read.campfires).map((item): Campfire => {
    const fire = fields(item, ["at", "minutesLeft"]);
    return { at: onMap(fire.at), minutesLeft: count(fire.minutesLeft) };
  });
  if (
    campfires.some((fire, index) =>
      campfires.slice(0, index).some((other) => sameHex(other.at, fire.at)),
    )
  )
    refuse();
  const burningItems = list(read.burningItems).map((item): BurningItem => {
    const burning = fields(item, ["item", "at", "minutesLeft"]);
    return {
      item: oneOf(burning.item, ITEMS),
      at: onMap(burning.at),
      minutesLeft: identity(burning.minutesLeft),
    };
  });

  const place: Place = { minute, onMap, at: character.at };
  const current =
    read.current === null ? null : currentActivity(read.current, place);
  const activeCombat =
    read.activeCombat === null
      ? null
      : attack(fields(read.activeCombat, COMBAT_KEYS), minute);
  const ended: Pick<MapRun, "death" | "completion"> = {
    death: read.death === null ? null : death(read.death, minute),
    completion:
      read.completion === null ? null : completion(read.completion, minute),
  };
  if (ended.death && ended.completion) refuse();
  const goesOn = !ended.death && !ended.completion;
  if (activeCombat ? current !== null || !goesOn : goesOn && current === null)
    refuse();

  const attackCooldownStart = count(read.attackCooldownStart);
  const streak = count(read.streak);
  if (attackCooldownStart > minute || streak > minute) refuse();

  return {
    practice: practice(read.practice),
    mapId,
    seed: uint32(read.seed),
    minute,
    tiles: layout,
    character,
    body: body(read.body),
    natureEnergy: natureEnergy(read.natureEnergy),
    campfires,
    burningItems,
    current,
    activeCombat,
    lastCombat:
      read.lastCombat === null ? null : lastCombat(read.lastCombat, minute),
    attackRandom: uint32(read.attackRandom),
    attackCooldownStart,
    wanderRandom: uint32(read.wanderRandom),
    gatherRandom: uint32(read.gatherRandom),
    streak,
    defeatedAttacks: count(read.defeatedAttacks),
    ...ended,
  };
}

/**
 * The manual map run: a `MapRun`, and a deposit only at a completion, out of the frozen bring plan.
 * Its mark says whether the map was solved when it started: a run that has not completed holds the
 * mark exactly when the solved maps hold its map, which one manual map run at a time keeps true
 * (D-55); a run that completed has its map among the solved maps, whatever its mark. A death is
 * settled, so no load settles one.
 */
function mapRun(value: unknown, records: Records): GameMapRun {
  const read = fields(value, GAME_MAP_RUN_KEYS);
  const run = plainMapRun(read, records);
  const bringPlan = tripList(read.bringPlan);
  const solvedMapRun = flag(read.solvedMapRun);
  const mapSolved = records.solved.includes(run.mapId);
  if (run.completion ? !mapSolved : solvedMapRun !== mapSolved) refuse();
  return {
    ...run,
    copy: copy(read.copy, records),
    bringPlan,
    deposited: deposited(
      read.deposited,
      bringPlan,
      run.completion !== null,
      solvedMapRun,
    ),
    solvedMapRun,
    deathSettlement: deathSettlement(
      read.deathSettlement,
      run.death !== null,
      records.characters.get(run.character.id)!.generation,
    ),
  };
}

/**
 * A key of a record by character (D-56): in its canonical form, naming a character of the team that
 * is not among `taken`, the characters the record may not name.
 */
function characterKey(
  key: string,
  records: Records,
  taken: readonly CharacterId[],
): CharacterId {
  const character = identityKey(key);
  if (!records.characters.has(character) || taken.includes(character)) refuse();
  return character;
}

/**
 * The earning loop of `characterId`: its program by the program check, and a `MapRun` that is that
 * character's, goes on (D-241) and stands on a map among the solved maps, since no loop's map run
 * adds to them. Completions stand below the number of the map run going on.
 */
function earningLoop(
  value: unknown,
  characterId: CharacterId,
  records: Records,
): EarningLoop {
  const read = fields(value, [
    "program",
    "run",
    "runNumber",
    "completed",
    "practice",
  ]);
  const run = plainMapRun(fields(read.run, MAP_RUN_KEYS), records);
  if (
    run.character.id !== characterId ||
    mapRunEnded(run) ||
    !records.solved.includes(run.mapId)
  )
    refuse();
  const runNumber = identity(read.runNumber);
  const completed = count(read.completed);
  if (completed >= runNumber) refuse();
  return {
    program: program(read.program),
    run,
    runNumber,
    completed,
    practice: practice(read.practice),
  };
}

/** The earning loops by character, none of them the character of the manual map run. */
function earningLoops(
  value: unknown,
  records: Records,
  manual: readonly CharacterId[],
): GameState["loops"] {
  const loops: GameState["loops"] = {};
  for (const [key, loop] of entries(value)) {
    const character = characterKey(key, records, manual);
    loops[character] = earningLoop(loop, character, records);
  }
  return loops;
}

/** What each stopped loop paid, by character; such a character has no loop and no manual map run. */
function stoppedLoops(
  value: unknown,
  records: Records,
  busy: readonly CharacterId[],
): GameState["stoppedLoops"] {
  const stopped: GameState["stoppedLoops"] = {};
  for (const [key, paid] of entries(value))
    stopped[characterKey(key, records, busy)] = practice(paid);
  return stopped;
}

/** A character's change of the chest: items of the data, each a non-zero safe integer. */
function chestChange(value: unknown): AwayReportLine["chest"] {
  const change: AwayReportLine["chest"] = {};
  for (const [key, amount] of entries(value)) {
    const item = oneOf(key, ITEMS);
    const pieces = integer(amount);
    if (pieces === 0) refuse();
    change[item] = pieces;
  }
  return change;
}

function loopStop(value: unknown, currentGeneration: number): LoopStop | null {
  if (value === null) return null;
  const read = fields(value, ["generation", "away"]);
  return {
    generation: lostGeneration(read.generation, currentGeneration),
    away: flag(read.away),
  };
}

/**
 * A line of the report: of a character of the team, a line that is open or stopped in a catch-up
 * holding a minute at least, as only a stop in the open game goes without one.
 */
function reportLine(value: unknown, records: Records): AwayReportLine {
  const read = fields(value, [
    "characterId",
    "minutes",
    "chest",
    "practice",
    "resurrectionUsed",
    "stop",
  ]);
  const characterId = identity(read.characterId);
  const character = records.characters.get(characterId);
  if (character === undefined) refuse();
  const minutes = count(read.minutes);
  const stop = loopStop(read.stop, character.generation);
  if (minutes === 0 && (stop === null || stop.away)) refuse();
  return {
    characterId,
    minutes,
    chest: chestChange(read.chest),
    practice: practice(read.practice),
    resurrectionUsed: flag(read.resurrectionUsed),
    stop,
  };
}

/** The report: its lines, at most one of them open for a character. */
function awayReport(value: unknown, records: Records): AwayReportLine[] {
  const lines = list(value).map((line) => reportLine(line, records));
  const open = lines
    .filter((line) => line.stop === null)
    .map((line) => line.characterId);
  if (new Set(open).size !== open.length) refuse();
  return lines;
}

const GAME_KEYS = [
  "programs",
  "nextProgramId",
  "pickedPrograms",
  "lastUsedPrograms",
  "lastEnteredProgram",
  "understanding",
  "ruleCounts",
  "countsProgram",
  "team",
  "nextCharacterId",
  "run",
  "lastSeed",
  "paused",
  "solvedMaps",
  "pace",
  "discovery",
  "realMsCarry",
  "loops",
  "stoppedLoops",
  "awayReport",
  "saveTimeMs",
] as const;

/**
 * The game state of a document, every key read and checked. The counts stand beside the rules of
 * the copy during a map run and beside the rules of the program they name after „Zakończ”, and are
 * none otherwise; without a map run nothing is paused, held as a discovery or carried. The save time
 * is a safe integer of any sign, as a moment of readiness is: every document is stamped, and a device
 * clock set before 1970 is the player's own, so a save the game wrote is never refused for it.
 */
function game(value: unknown): GameState {
  const read = fields(value, GAME_KEYS);
  const known = understanding(read.understanding);
  if (!known.conditions.includes("always")) refuse();
  const nextProgramId = identity(read.nextProgramId);
  const programs = programList(read.programs, nextProgramId);
  const nextCharacterId = identity(read.nextCharacterId);
  const theTeam = team(read.team, nextCharacterId, known.trees);
  const solvedMaps = uniqueOf(read.solvedMaps, MAPS);
  const records: Records = {
    solved: solvedMaps,
    nextProgramId,
    listed: new Set(programs.map((saved) => saved.id)),
    characters: new Map(
      theTeam.characters.map((character) => [character.id, character]),
    ),
    trees: known.trees,
  };
  const run = read.run === null ? null : mapRun(read.run, records);

  const counts = read.ruleCounts === null ? null : ruleCounts(read.ruleCounts);
  const countsProgram =
    read.countsProgram === null
      ? null
      : listedProgram(read.countsProgram, records);
  if (run && countsProgram !== null) refuse();
  const counted =
    run?.copy.program ??
    programs.find((saved) => saved.id === countsProgram)?.program;
  if ((counts === null) !== (counted === undefined)) refuse();
  if (counts && counted) {
    const ruleIds = counted.groups.flatMap((group) =>
      group.rules.map((rule) => String(rule.id)),
    );
    const keys = Object.keys(counts);
    if (
      keys.length !== ruleIds.length ||
      !ruleIds.every((id) => keys.includes(id))
    )
      refuse();
  }

  const discovery =
    read.discovery === null ? null : understanding(read.discovery);
  const paused = flag(read.paused);
  const realMsCarry = finite(read.realMsCarry, 0);
  if (realMsCarry >= 1000) refuse();
  if (!run && (paused || discovery !== null || realMsCarry !== 0)) refuse();
  if (!PACES.includes(read.pace as number)) refuse();

  const manual = run ? [run.character.id] : [];
  const loops = earningLoops(read.loops, records, manual);
  const looping = Object.keys(loops).map(Number);

  return {
    programs,
    nextProgramId,
    pickedPrograms: programsByCharacter(read.pickedPrograms, records),
    lastUsedPrograms: programsByCharacter(read.lastUsedPrograms, records),
    lastEnteredProgram:
      read.lastEnteredProgram === null
        ? null
        : givenProgram(read.lastEnteredProgram, records),
    understanding: known,
    ruleCounts: counts,
    countsProgram,
    team: theTeam,
    nextCharacterId,
    run,
    lastSeed: uint32(read.lastSeed),
    // A map run that goes on comes back paused, and one that ended as it ended (D-212).
    paused: run !== null && !mapRunEnded(run) ? true : paused,
    solvedMaps,
    pace: read.pace as Pace,
    discovery,
    realMsCarry,
    loops,
    stoppedLoops: stoppedLoops(read.stoppedLoops, records, [
      ...manual,
      ...looping,
    ]),
    awayReport: awayReport(read.awayReport, records),
    saveTimeMs: integer(read.saveTimeMs),
  };
}

/** The version of a plain object's own `version` that is a safe integer, else null. */
function versionOf(value: unknown): number | null {
  try {
    const version = own(plainObject(value), "version");
    return typeof version === "number" && Number.isSafeInteger(version)
      ? version
      : null;
  } catch (error) {
    if (error instanceof Refused) return null;
    throw error;
  }
}

/** Whether the team's list of characters is readable and names an archetype the data lacks. */
function namesAbsentArchetype(value: unknown): boolean {
  try {
    const saved = plainObject(value);
    const theTeam = own(plainObject(own(saved, "game")), "team");
    return list(own(plainObject(theTeam), "characters")).some((character) => {
      const archetypeId =
        typeof character === "object" && character !== null
          ? (Object.getOwnPropertyDescriptor(character, "archetypeId")
              ?.value as unknown)
          : undefined;
      return (
        typeof archetypeId === "string" &&
        !Object.hasOwn(ARCHETYPES, archetypeId)
      );
    });
  } catch (error) {
    if (error instanceof Refused) return false;
    throw error;
  }
}

/**
 * The keys of a saved document: the version and the game, and, in the `save` the server hands
 * back, the revision it gave the save, a positive safe integer the game state does not hold.
 */
function savedDocument(value: unknown): Record<"version" | "game", unknown> {
  const keys = Reflect.ownKeys(plainObject(value));
  if (!keys.includes("revision")) return fields(value, ["version", "game"]);
  const read = fields(value, ["version", "revision", "game"]);
  identity(read.revision);
  return read;
}

/**
 * The game state of a saved document, the `save` the server hands back with its revision or a
 * document kept in page memory, or the reason it gives none, in this order: no object with a whole `version` is `shape`;
 * another version than the current one is `version`; a readable team naming an archetype the data
 * lacks is `archetype`; anything else the game state's types, closed lists and data do not admit
 * is `shape`. A map run that goes on comes back paused at its game minute, pace and carried real
 * time, and one that ended as it ended; no real time enters the load. No value a document can hold
 * makes it throw; an error of this code is no refusal and leaves it as the error it is (D-213). It
 * changes nothing passed to it and shares nothing with it.
 */
export function loadSavedGame(value: unknown): LoadedGame {
  const version = versionOf(value);
  if (version === null) return { ok: false, reason: "shape" };
  if (version !== SAVED_GAME_VERSION) return { ok: false, reason: "version" };
  if (namesAbsentArchetype(value)) return { ok: false, reason: "archetype" };
  try {
    return { ok: true, state: game(savedDocument(value).game) };
  } catch (error) {
    if (error instanceof Refused) return { ok: false, reason: "shape" };
    throw error;
  }
}
