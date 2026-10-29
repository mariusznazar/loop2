import { ACTIONS } from "./data/actions.js";
import { ARCHETYPES } from "./data/archetypes.js";
import { BALANCE } from "./data/balance.js";
import { CAMPFIRE } from "./data/campfire.js";
import { CONDITIONS } from "./data/conditions.js";
import { CREATURES } from "./data/creatures.js";
import { ITEMS } from "./data/items.js";
import { MAPS, type MapDef } from "./data/maps.js";
import { RESOURCES } from "./data/resources.js";
import { characterName } from "./game.js";
import { hexDistance, offsetToAxial, sameHex } from "./hex.js";
import { checkProgram } from "./programs.js";
import { mapRunEnded } from "./run.js";
import type {
  Action,
  Activity,
  ActiveCombat,
  Backpack,
  Body,
  BurningItem,
  Campfire,
  CampfireId,
  Character,
  CharacterId,
  CombatCharacterAction,
  CombatCreatureAction,
  CombatExchange,
  CombatOutcome,
  CombatResult,
  Completion,
  CurrentActivity,
  Death,
  DeathCause,
  GameMapRun,
  GameState,
  Hex,
  ItemId,
  LastCombat,
  Pace,
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
  Understanding,
} from "./types.js";

/**
 * The version of the shape of the saved game state. Raise it with every change of the shape: of
 * `GameState` or a type it reaches, and of the items of the data, which `Backpack` enumerates.
 */
export const SAVED_GAME_VERSION = 1;

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

/** Stops the reading of a document it does not admit; the load catches it and refuses. */
function refuse(): never {
  throw new Error("saved game: not admitted");
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
 * steps and its identities, with no key besides those the check builds.
 */
function program(value: unknown): Program {
  const checked = checkProgram(value, null);
  matches(value, checked);
  return checked;
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
  }).groups;
  return group.rules[0].action;
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
  const read = fields(value, ["actions", "conditions", "items", "creatures"]);
  return {
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
  for (const [key, pieceCount] of entries(value))
    held[oneOf(key, RESOURCES)] = count(pieceCount);
  return held;
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

/** What the game state names a program or a character by, and what it holds of them. */
type Records = {
  nextProgramId: ProgramId;
  listed: ReadonlySet<ProgramId>;
  characters: ReadonlySet<CharacterId>;
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
function team(value: unknown, nextCharacterId: CharacterId): Team {
  const read = fields(value, ["characters", "chest"]);
  const ids = new Set<CharacterId>();
  const characters = list(read.characters).map((item): Character => {
    const character = fields(item, ["id", "name", "archetypeId", "traits"]);
    const id = identity(character.id);
    if (id >= nextCharacterId || ids.has(id)) refuse();
    ids.add(id);
    return {
      id,
      name: givenName(character.name),
      archetypeId: oneOf(character.archetypeId, ARCHETYPES),
      traits: traits(character.traits),
    };
  });
  const chest = fields(read.chest, ["pieces"]);
  return { characters, chest: { pieces: pieces(chest.pieces) } };
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
    "characterHealth",
    "creatureHealth",
    "outcome",
    "exchanges",
    "ruleStarts",
  ]);
  return {
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

const RUN_KEYS = [
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
  "copy",
] as const;

/**
 * The map run, with what the simulation follows in it: its character in the team, every place on
 * its tiles, one campfire a tile, an attack going on only with no activity and before an end, an
 * activity going on until it ends, and an end in its own game minute.
 */
function mapRun(value: unknown, records: Records): GameMapRun {
  const read = fields(value, RUN_KEYS);
  const mapId = oneOf(read.mapId, MAPS);
  const minute = count(read.minute);
  const layout = tiles(read.tiles, MAPS[mapId]);
  const onMap = (at: unknown): Hex => {
    const place = hex(at);
    if (!layout.some((tile) => sameHex(tile.at, place))) refuse();
    return place;
  };

  const carried = fields(read.character, ["id", "at", "traits", "backpack"]);
  const character: RunCharacter = {
    id: identity(carried.id),
    at: onMap(carried.at),
    traits: traits(carried.traits),
    backpack: backpack(carried.backpack),
  };
  if (!records.characters.has(character.id)) refuse();

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
  const ended: Pick<GameMapRun, "death" | "completion"> = {
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
    copy: copy(read.copy, records),
  };
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
] as const;

/**
 * The game state of a document, every key read and checked. The counts stand beside the rules of
 * the copy during a map run and beside the rules of the program they name after „Zakończ”, and are
 * none otherwise; without a map run nothing is paused, held as a discovery or carried.
 */
function game(value: unknown): GameState {
  const read = fields(value, GAME_KEYS);
  const nextProgramId = identity(read.nextProgramId);
  const programs = programList(read.programs, nextProgramId);
  const nextCharacterId = identity(read.nextCharacterId);
  const theTeam = team(read.team, nextCharacterId);
  const records: Records = {
    nextProgramId,
    listed: new Set(programs.map((saved) => saved.id)),
    characters: new Set(theTeam.characters.map((character) => character.id)),
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

  const known = understanding(read.understanding);
  if (!known.conditions.includes("always")) refuse();
  const discovery =
    read.discovery === null ? null : understanding(read.discovery);
  const paused = flag(read.paused);
  const realMsCarry = finite(read.realMsCarry, 0);
  if (realMsCarry >= 1000) refuse();
  if (!run && (paused || discovery !== null || realMsCarry !== 0)) refuse();
  if (!PACES.includes(read.pace as number)) refuse();

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
    // A map run that goes on comes back paused, and one that ended as it ended (D-189).
    paused: run !== null && !mapRunEnded(run) ? true : paused,
    solvedMaps: uniqueOf(read.solvedMaps, MAPS),
    pace: read.pace as Pace,
    discovery,
    realMsCarry,
  };
}

/** The version of a plain object's own `version` that is a safe integer, else null. */
function versionOf(value: unknown): number | null {
  try {
    const version = own(plainObject(value), "version");
    return typeof version === "number" && Number.isSafeInteger(version)
      ? version
      : null;
  } catch {
    return null;
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
  } catch {
    return false;
  }
}

/**
 * The game state of a saved document, the `save` the server hands back or a document kept in page
 * memory, or the reason it gives none, in this order: no object with a whole `version` is `shape`;
 * another version than the current one is `version`; a readable team naming an archetype the data
 * lacks is `archetype`; anything else the game state's types, closed lists and data do not admit
 * is `shape`. A map run that goes on comes back paused at its game minute, pace and carried real
 * time, and one that ended as it ended; no real time enters the load. Never throws, changes nothing
 * passed to it and shares nothing with it.
 */
export function loadSavedGame(value: unknown): LoadedGame {
  const version = versionOf(value);
  if (version === null) return { ok: false, reason: "shape" };
  if (version !== SAVED_GAME_VERSION) return { ok: false, reason: "version" };
  if (namesAbsentArchetype(value)) return { ok: false, reason: "archetype" };
  try {
    return { ok: true, state: game(fields(value, ["version", "game"]).game) };
  } catch {
    return { ok: false, reason: "shape" };
  }
}
