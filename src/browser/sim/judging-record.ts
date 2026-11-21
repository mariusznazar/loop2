import { BALANCE } from "./data/balance.js";
import type {
  CharacterId,
  Chest,
  GameState,
  Judging,
  MapId,
  Program,
  ProgramId,
  SeedResult,
  TripEntry,
} from "./types.js";

/** The triple a remembered judging is kept under (D-440): a character of the team, a program of the list and a map. */
export type JudgingIds = {
  characterId: CharacterId;
  programId: ProgramId;
  mapId: MapId;
};

/**
 * What the game shows of a remembered judging beside the list „Program:” (D-440): the seeds solved of
 * the twelve, whether it is all twelve, whether the chest holds less of an item than the judging took
 * (the note on the stock stands) and whether the badge stands, which it does for all twelve alone and
 * only while no item is short.
 */
export type JudgingMark = {
  solved: number;
  allSolved: boolean;
  stockShort: boolean;
  badge: boolean;
};

/**
 * A judging as the browser remembers it (D-441): the kind of each of the twelve results, in the order of the
 * data's seeds, the equipment the judging took, the content revision of the judged program (D-442) and the
 * fingerprint of its content, and the generation number of the judged character, the three in the game
 * state the judging read.
 */
export type JudgingRecord = {
  results: SeedResult["kind"][];
  equipment: TripEntry[];
  contentRevision: number;
  contentFingerprint: string;
  generation: number;
};

/** The canonical text of plain data: an object's keys in order, so the order they were made in counts for nothing. */
function canonicalText(value: unknown): string {
  if (Array.isArray(value))
    return `[${(value as unknown[]).map(canonicalText).join(",")}]`;
  if (typeof value === "object" && value !== null) {
    const held = value as Record<string, unknown>;
    return `{${Object.keys(held)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${canonicalText(held[key])}`)
      .join(",")}}`;
  }
  return typeof value === "string" ? JSON.stringify(value) : String(value);
}

/** One 32-bit hex word. */
const hexWord = (word: number): string =>
  (word >>> 0).toString(16).padStart(8, "0");

/**
 * The fingerprint of a program's content (D-441, D-442): sixteen lower-case hexadecimal digits, a hash of
 * 64 bits of the canonical text of its rule groups with their order, rules and identities and of its trip
 * plan. It is the same for two contents that the content revision counts as no change — the order an
 * object's keys were made in and the identity counters that number new groups and rules count for
 * nothing — and differs for every change it counts; two different contents meet in it with a chance of
 * about one in 2^62, the hash being no cryptographic one. It reads no clock and no random number.
 */
export function contentFingerprint(program: Program): string {
  const text = canonicalText([program.groups, program.tripPlan]);
  let first = 0xdeadbeef;
  let second = 0x41c6ce57;
  for (let at = 0; at < text.length; at += 1) {
    const unit = text.charCodeAt(at);
    first = Math.imul(first ^ unit, 2654435761);
    second = Math.imul(second ^ unit, 1597334677);
  }
  first =
    Math.imul(first ^ (first >>> 16), 2246822507) ^
    Math.imul(second ^ (second >>> 13), 3266489909);
  second =
    Math.imul(second ^ (second >>> 16), 2246822507) ^
    Math.imul(first ^ (first >>> 13), 3266489909);
  return `${hexWord(second)}${hexWord(first)}`;
}

/** Whether the value is a text of the form `contentFingerprint` gives. */
export function isContentFingerprint(value: unknown): value is string {
  return typeof value === "string" && /^[0-9a-f]{16}$/.test(value);
}

/**
 * What the browser remembers of `judging`, made for the triple `ids` from the game state `state` it read
 * (D-441): the kind of each result, the cause and the game minute of a death left out, the equipment as
 * the judging took it, the content revision of the triple's program with the fingerprint of its content
 * and the generation number of its character in `state`. Throws an Error on a character the team lacks and on a program not on the list,
 * as the judging does. Inputs stay unchanged and the record shares nothing with them.
 */
export function recordOfJudging(
  state: GameState,
  ids: JudgingIds,
  judging: Judging,
): JudgingRecord {
  const character = state.team.characters.find(
    (listed) => listed.id === ids.characterId,
  );
  if (!character)
    throw new Error(
      `recordOfJudging: no character ${String(ids.characterId)} in the team`,
    );
  const saved = state.programs.find((listed) => listed.id === ids.programId);
  if (!saved)
    throw new Error(
      `recordOfJudging: no program ${String(ids.programId)} on the list`,
    );
  return {
    results: judging.results.map((result) => result.kind),
    equipment: judging.equipment.map(({ item, count }) => ({ item, count })),
    contentRevision: saved.contentRevision,
    contentFingerprint: contentFingerprint(saved.program),
    generation: character.generation,
  };
}

/** The mark of a held judging against the chest as it stands: the count solved, and whether an item is short. */
function markOfHeld(
  held: Pick<JudgingRecord, "results" | "equipment">,
  chest: Chest,
): JudgingMark {
  const solved = held.results.filter((kind) => kind === "solved").length;
  const allSolved = solved === BALANCE.judgingSeeds.length;
  const stockShort = held.equipment.some(
    ({ item, count }) => (chest.pieces[item] ?? 0) < count,
  );
  return { solved, allSolved, stockShort, badge: allSolved && !stockShort };
}

/**
 * The mark beside the list „Program:” of the triple `ids` from `record`, read against the game state at
 * hand (D-441, D-440), or null where no record is given or the record does not stand: it stands only
 * while the character of the triple is on the team at the generation number the record holds, the
 * program of the triple is on the list at the content revision the record holds with a content of the
 * fingerprint the record holds, and the record's results number the data's seeds of a judging. Where
 * the chest holds less of an item than the record took the note on the stock stands and the badge goes
 * out; with more the mark stands as it was.
 */
export function markOfRecord(
  state: GameState,
  ids: JudgingIds,
  record: JudgingRecord | null | undefined,
): JudgingMark | null {
  if (!record) return null;
  const character = state.team.characters.find(
    (listed) => listed.id === ids.characterId,
  );
  const saved = state.programs.find((listed) => listed.id === ids.programId);
  if (
    !character ||
    !saved ||
    character.generation !== record.generation ||
    saved.contentRevision !== record.contentRevision ||
    record.results.length !== BALANCE.judgingSeeds.length ||
    contentFingerprint(saved.program) !== record.contentFingerprint
  )
    return null;
  return markOfHeld(record, state.team.chest);
}
