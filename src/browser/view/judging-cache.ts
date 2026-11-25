import { BALANCE } from "../sim/data/balance.js";
import { ITEMS } from "../sim/data/items.js";
import type { ItemId } from "../sim/data/items.js";
import { isContentFingerprint } from "../sim/judging-record.js";
import type { JudgingIds, JudgingRecord } from "../sim/judging-record.js";
import type { GameState, SeedResult, TripEntry } from "../sim/types.js";

/**
 * The part of the browser's `Storage` the cache uses. The page gives it `window.localStorage` (or
 * none); the cache reaches no window itself, and every call to it is guarded, since a browser may
 * refuse any of them.
 */
export interface JudgingStorage {
  readonly length: number;
  key(index: number): string | null;
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

/**
 * What the page gives to open the cache of one game (D-441): the account by the identifier the
 * server names, never the email address, the game state the page loaded or made, whose moment the
 * game was made at names the game, whether the page built the game after the server refused its save
 * for another browser's (D-209), and the lasting storage or none.
 */
export type JudgingCacheOpening = {
  accountId: string;
  state: GameState;
  afterRefusedSave: boolean;
  storage: JudgingStorage | null;
};

/**
 * The judgings of one game of one account that the browser remembers, and beside them the record of the
 * most health the creature of a map lost in one fight of any judging (D-441, D-440).
 */
export type JudgingCache = {
  /** The record stored for the triple, or null where none is stored or the stored value is not one the cache wrote. */
  read(ids: JudgingIds): JudgingRecord | null;
  /** Stores the record for the triple; where the storage refuses it, the open page still reads it. */
  remember(ids: JudgingIds, record: JudgingRecord): void;
  /**
   * The record of the map, or null where none is stored, the stored value is not one the cache wrote, or
   * the record was made at other numbers of the creature than those given: it shows nothing then.
   */
  readRecord(mapId: string, creature: RecordCreature): number | null;
  /**
   * Offers the most health a judging took from the creature of the map in one fight. The record takes it
   * only where it is higher than the record read for these creature numbers, or where none is read; a
   * number the game cannot give (no whole number from 0 to the creature's health) is not taken. Where the
   * storage refuses the write, the open page still reads it.
   */
  offerRecord(mapId: string, creature: RecordCreature, damage: number): void;
};

/**
 * The numbers of a creature a record is bound to (D-441): its health and its blow, as the game's data
 * give them. A creature of the data (`CreatureDef`) is one.
 */
export type RecordCreature = {
  readonly health: number;
  readonly strikeDamage: number;
};

// The stored form is version 2; the key names it. A key of another version never matches the prefix,
// since the prefix ends with the separator right after the version.
const KEY_PREFIX = "loop2-judging-2|";
const SEPARATOR = "|";
// A valid value holds twelve letters, a short list of the data's items, a fingerprint and two numbers,
// well under this; a longer one is no value of the cache's and is not parsed.
const MAX_VALUE_LENGTH = 1024;
const FIELDS = [
  "results",
  "equipment",
  "revision",
  "fingerprint",
  "generation",
] as const;
// The record is a second family of keys with a version of its own (D-441): the version stands in the key,
// right before the separator, so a key of another version or of the judgings never matches the prefix.
const RECORD_KEY_PREFIX = "loop2-judging-record-1|";
const RECORD_FIELDS = ["damage", "health", "strikeDamage"] as const;

const LETTER_OF: Record<SeedResult["kind"], string> = {
  solved: "s",
  death: "d",
  undecided: "u",
};
const KIND_OF_LETTER = new Map(
  (Object.keys(LETTER_OF) as SeedResult["kind"][]).map((kind) => [
    LETTER_OF[kind],
    kind,
  ]),
);
const ITEM_ORDER = Object.keys(ITEMS) as ItemId[];

/**
 * A part of a key with no separator in it: the escape sign and the separator are written as escapes,
 * so no two different parts give the same text and each part is one part. It throws on no text.
 */
function part(text: string | number): string {
  return String(text).replace(/[%|]/g, (sign) =>
    sign === "%" ? "%25" : "%7C",
  );
}

function gamePrefix(accountId: string, madeAtMs: number): string {
  return `${KEY_PREFIX}${part(accountId)}${SEPARATOR}${part(madeAtMs)}${SEPARATOR}`;
}

function keyOf(
  accountId: string,
  madeAtMs: number,
  { characterId, programId, mapId }: JudgingIds,
): string {
  return `${gamePrefix(accountId, madeAtMs)}${part(characterId)}${SEPARATOR}${part(programId)}${SEPARATOR}${part(mapId)}`;
}

function isCount(value: unknown, min: number): value is number {
  return (
    typeof value === "number" && Number.isSafeInteger(value) && value >= min
  );
}

function hasOnlyFields(value: object, fields: readonly string[]): boolean {
  return (
    Object.getOwnPropertyNames(value).length === fields.length &&
    fields.every((field) => Object.hasOwn(value, field))
  );
}

function readResults(text: unknown): SeedResult["kind"][] | null {
  if (typeof text !== "string" || text.length !== BALANCE.judgingSeeds.length)
    return null;
  const kinds: SeedResult["kind"][] = [];
  for (const letter of text) {
    const kind = KIND_OF_LETTER.get(letter);
    if (kind === undefined) return null;
    kinds.push(kind);
  }
  return kinds;
}

function readEquipment(list: unknown): TripEntry[] | null {
  if (!Array.isArray(list)) return null;
  const entries: TripEntry[] = [];
  const named = new Set<string>();
  for (const pair of list as unknown[]) {
    if (!Array.isArray(pair) || pair.length !== 2) return null;
    const [item, count] = pair as [unknown, unknown];
    if (
      typeof item !== "string" ||
      !Object.hasOwn(ITEMS, item) ||
      named.has(item) ||
      !isCount(count, 1)
    )
      return null;
    named.add(item);
    entries.push({ item: item as ItemId, count });
  }
  return entries;
}

/**
 * The record a stored value holds, or null where the value is not the form the cache writes: too long,
 * no JSON, not an object of exactly the five fields, results that are not one known letter for each seed
 * of a judging, an item the data lack or named twice, a count that is no safe integer from 1, a content
 * revision that is none from 0, a fingerprint that is no text of the form the simulation gives or a
 * generation that is none from 1. Everything it returns is built here; nothing the parse made is handed
 * on.
 */
function readValue(value: unknown): JudgingRecord | null {
  if (typeof value !== "string" || value.length > MAX_VALUE_LENGTH) return null;
  let parsed: unknown;
  try {
    parsed = JSON.parse(value);
  } catch {
    return null;
  }
  if (
    typeof parsed !== "object" ||
    parsed === null ||
    Array.isArray(parsed) ||
    !hasOnlyFields(parsed, FIELDS)
  )
    return null;
  const held = parsed as Record<(typeof FIELDS)[number], unknown>;
  const results = readResults(held.results);
  const equipment = readEquipment(held.equipment);
  if (
    results === null ||
    equipment === null ||
    !isCount(held.revision, 0) ||
    !isContentFingerprint(held.fingerprint) ||
    !isCount(held.generation, 1)
  )
    return null;
  return {
    results,
    equipment,
    contentRevision: held.revision,
    contentFingerprint: held.fingerprint,
    generation: held.generation,
  };
}

/** The stored value of a record: the equipment in the order of the data's items, the results one letter each. */
function writeValue(record: JudgingRecord): string {
  const equipment = [...record.equipment]
    .sort((a, b) => ITEM_ORDER.indexOf(a.item) - ITEM_ORDER.indexOf(b.item))
    .map(({ item, count }) => [item, count]);
  return JSON.stringify({
    results: record.results.map((kind) => LETTER_OF[kind]).join(""),
    equipment,
    revision: record.contentRevision,
    fingerprint: record.contentFingerprint,
    generation: record.generation,
  });
}

function copyOf(record: JudgingRecord): JudgingRecord {
  return {
    results: [...record.results],
    equipment: record.equipment.map(({ item, count }) => ({ item, count })),
    contentRevision: record.contentRevision,
    contentFingerprint: record.contentFingerprint,
    generation: record.generation,
  };
}

/** What a record holds: the number and the two numbers of the creature it was made at (D-441). */
type StoredRecord = { damage: number; health: number; strikeDamage: number };

function recordGamePrefix(accountId: string, madeAtMs: number): string {
  return `${RECORD_KEY_PREFIX}${part(accountId)}${SEPARATOR}${part(madeAtMs)}${SEPARATOR}`;
}

function recordKeyOf(
  accountId: string,
  madeAtMs: number,
  mapId: string,
): string {
  return `${recordGamePrefix(accountId, madeAtMs)}${part(mapId)}`;
}

/** Whether the creature's numbers are ones the game's data can give: a health from 1 and a blow from 0. */
function isCreatureNumbers(creature: RecordCreature): boolean {
  return isCount(creature.health, 1) && isCount(creature.strikeDamage, 0);
}

/**
 * The record a stored value holds, or null where the value is not the form the cache writes: too long, no
 * JSON, not an object of exactly the three fields, a number that is no safe integer from 0, a health that
 * is none from 1, a blow that is none from 0, or a number above the creature's whole health, which no
 * fight can take. Everything it returns is built here; nothing the parse made is handed on.
 */
function readRecordValue(value: unknown): StoredRecord | null {
  if (typeof value !== "string" || value.length > MAX_VALUE_LENGTH) return null;
  let parsed: unknown;
  try {
    parsed = JSON.parse(value);
  } catch {
    return null;
  }
  if (
    typeof parsed !== "object" ||
    parsed === null ||
    Array.isArray(parsed) ||
    !hasOnlyFields(parsed, RECORD_FIELDS)
  )
    return null;
  const { damage, health, strikeDamage } = parsed as Record<
    (typeof RECORD_FIELDS)[number],
    unknown
  >;
  // The parse has already turned a number written by hand as `-0` or `2.4e1` into the number it denotes,
  // 0 or 24, which is read as that number, as the reading of the judgings does: the value is the player's
  // own, and a hand-written one that denotes a number the game can give harms nothing.
  if (
    !isCount(damage, 0) ||
    !isCount(health, 1) ||
    !isCount(strikeDamage, 0) ||
    damage > health
  )
    return null;
  return { damage, health, strikeDamage };
}

function writeRecordValue({
  damage,
  health,
  strikeDamage,
}: StoredRecord): string {
  return JSON.stringify({ damage, health, strikeDamage });
}

/** Whether the record was made at the creature's numbers given. */
function isMadeAt(
  record: StoredRecord | null | undefined,
  creature: RecordCreature,
): record is StoredRecord {
  return (
    record !== null &&
    record !== undefined &&
    record.health === creature.health &&
    record.strikeDamage === creature.strikeDamage
  );
}

/** The keys of the storage, or none where the storage refuses to list them. */
function keysOf(storage: JudgingStorage): string[] {
  try {
    const keys: string[] = [];
    for (let index = 0; index < storage.length; index += 1) {
      const key = storage.key(index);
      if (key !== null) keys.push(key);
    }
    return keys;
  } catch {
    return [];
  }
}

function removeFrom(storage: JudgingStorage, key: string): void {
  try {
    storage.removeItem(key);
  } catch {
    // A value that stays is read only under its own key and form; nothing else can come of it.
  }
}

/** Whether the storage took the value. */
function writeTo(storage: JudgingStorage, key: string, value: string): boolean {
  try {
    storage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function readFrom(storage: JudgingStorage, key: string): string | null {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

/**
 * Whether the text is a whole number written as the cache writes one that the loaded game has not yet
 * given: from `next` up. A canonical decimal is compared as text, by its length and then its digits, so
 * a number past the safe integers needs no parse; any other text is no number of the cache's.
 */
function isNotBelow(text: string | undefined, next: number): boolean {
  if (text === undefined || !/^(?:0|[1-9][0-9]*)$/.test(text)) return false;
  const limit = String(next);
  return (
    text.length > limit.length ||
    (text.length === limit.length && text >= limit)
  );
}

/**
 * Whether the opening removes the stored value of a triple of this game as one that can only come from a
 * save that never reached the server (D-441). It removes a triple whose program number or character
 * number the loaded game has not yet given; where the loaded game holds the triple's character, one whose
 * generation stands above that character's; and where it holds the triple's program, one whose content
 * revision stands above that program's. Each of the last two checks reads only what the loaded game
 * holds, so a triple whose program the loaded game no longer holds is still removed by its character's
 * generation, and only a triple neither of whose character and program the loaded game holds, both once
 * given, is left by them. A key or value of no form of the cache's is left alone.
 */
function isAboveLoaded(
  state: GameState,
  triple: string,
  value: string | null,
): boolean {
  const ids = triple.split(SEPARATOR);
  const record = readValue(value);
  if (ids.length !== 3 || record === null) return false;
  if (
    isNotBelow(ids[0], state.nextCharacterId) ||
    isNotBelow(ids[1], state.nextProgramId)
  )
    return true;
  const character = state.team.characters.find(({ id }) => part(id) === ids[0]);
  const saved = state.programs.find(({ id }) => part(id) === ids[1]);
  return (
    (character !== undefined && record.generation > character.generation) ||
    (saved !== undefined && record.contentRevision > saved.contentRevision)
  );
}

/**
 * Removes, best effort, what the opening of the cache removes (D-441): the values of the account under
 * the moment of another game, and of this game those that can only come from a save that never reached
 * the server, or all of them where the page built the game after the server refused its save. Values of
 * other accounts and keys of another version of the stored form are left.
 */
function tidyJudgings(
  storage: JudgingStorage,
  keys: readonly string[],
  opening: JudgingCacheOpening,
): void {
  const accountPrefix = `${KEY_PREFIX}${part(opening.accountId)}${SEPARATOR}`;
  const gameOwn = gamePrefix(opening.accountId, opening.state.madeAtMs);
  for (const key of keys) {
    if (!key.startsWith(accountPrefix)) continue;
    if (
      !key.startsWith(gameOwn) ||
      opening.afterRefusedSave ||
      isAboveLoaded(
        opening.state,
        key.slice(gameOwn.length),
        readFrom(storage, key),
      )
    )
      removeFrom(storage, key);
  }
}

/**
 * Removes, best effort, the records of the account under the moment of another game and, where the page
 * built the game after the server refused its save, those of this game too (D-441), as the judgings are.
 * A record holds no program and no character, so nothing else of the loaded game removes one. Records of
 * other accounts and keys of another version of the record's form are left.
 */
function tidyRecords(
  storage: JudgingStorage,
  keys: readonly string[],
  opening: JudgingCacheOpening,
): void {
  const accountPrefix = `${RECORD_KEY_PREFIX}${part(opening.accountId)}${SEPARATOR}`;
  const gameOwn = recordGamePrefix(opening.accountId, opening.state.madeAtMs);
  for (const key of keys)
    if (
      key.startsWith(accountPrefix) &&
      (!key.startsWith(gameOwn) || opening.afterRefusedSave)
    )
      removeFrom(storage, key);
}

function tidyStorage(
  storage: JudgingStorage,
  opening: JudgingCacheOpening,
): void {
  const keys = keysOf(storage);
  tidyJudgings(storage, keys, opening);
  tidyRecords(storage, keys, opening);
}

/**
 * Opens the cache of one game of one account (D-441): one stored value for each character, program and
 * map, and one for the record of each map. Where the storage is none or refuses a write, the record stays
 * for the open page alone and the stored value of its triple is removed where the browser allows it, so no
 * older stored judging stands against the newer one; the stored record of the map is not removed, since a
 * lower record that was made stands against no higher one and the record never falls. No exception of the
 * storage leaves the cache, and nothing here reaches a window.
 */
export function openJudgingCache(opening: JudgingCacheOpening): JudgingCache {
  const { accountId, storage } = opening;
  const { madeAtMs } = opening.state;
  // Only the records whose write the storage refused; a write that succeeds takes its triple out.
  const memory = new Map<string, JudgingRecord>();
  // The same for the records of the maps, whose write the storage refused.
  const recordMemory = new Map<string, StoredRecord>();
  if (storage !== null) tidyStorage(storage, opening);
  /**
   * The highest number of the record under `key` made at the creature's numbers given, from the storage
   * and from the page's memory of a refused write alike, or null where neither holds one.
   */
  function currentRecord(key: string, creature: RecordCreature): number | null {
    const stored =
      storage === null ? null : readRecordValue(readFrom(storage, key));
    let highest: number | null = null;
    for (const held of [stored, recordMemory.get(key)])
      if (
        isMadeAt(held, creature) &&
        (highest === null || held.damage > highest)
      )
        highest = held.damage;
    return highest;
  }
  return {
    read(ids) {
      const key = keyOf(accountId, madeAtMs, ids);
      const held = memory.get(key);
      if (held !== undefined) return copyOf(held);
      return storage === null ? null : readValue(readFrom(storage, key));
    },
    remember(ids, record) {
      const key = keyOf(accountId, madeAtMs, ids);
      if (storage !== null && writeTo(storage, key, writeValue(record))) {
        memory.delete(key);
        return;
      }
      memory.set(key, copyOf(record));
      if (storage !== null) removeFrom(storage, key);
    },
    readRecord(mapId, creature) {
      return currentRecord(recordKeyOf(accountId, madeAtMs, mapId), creature);
    },
    offerRecord(mapId, creature, damage) {
      const { health, strikeDamage } = creature;
      if (
        !isCreatureNumbers(creature) ||
        !isCount(damage, 0) ||
        damage > health
      )
        return;
      const key = recordKeyOf(accountId, madeAtMs, mapId);
      const current = currentRecord(key, creature);
      if (current !== null && current >= damage) return;
      const record = { damage, health, strikeDamage };
      if (storage !== null && writeTo(storage, key, writeRecordValue(record))) {
        recordMemory.delete(key);
        return;
      }
      recordMemory.set(key, record);
    },
  };
}

/**
 * The lasting storage of a page given its window, or none where the window has none or the browser
 * refuses it: reaching `localStorage` throws in a browser that blocks storage, which the cache must
 * not let out.
 */
export function lastingStorageOf(page: {
  readonly localStorage?: JudgingStorage | null;
}): JudgingStorage | null {
  try {
    return page.localStorage ?? null;
  } catch {
    return null;
  }
}
