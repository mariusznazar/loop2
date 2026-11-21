import { BALANCE } from "./data/balance.js";
import type {
  CharacterId,
  Chest,
  DeathSettlement,
  Judging,
  MapId,
  Program,
  ProgramId,
  RememberedJudging,
  RememberedJudgings,
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
 * A judging as the game state remembers it (D-440): the kind of each result, the cause and the game
 * minute of a death left out, and the equipment as the judging took it.
 */
export function rememberedOf(judging: Judging): RememberedJudging {
  return {
    results: judging.results.map((result) => result.kind),
    equipment: judging.equipment.map(({ item, count }) => ({ item, count })),
  };
}

/** The judgings with `judging` remembered for the triple `ids` in place of the one remembered there; the rest stays. */
export function withRememberedJudging(
  judgings: RememberedJudgings,
  ids: JudgingIds,
  judging: Judging,
): RememberedJudgings {
  const { characterId, programId, mapId } = ids;
  return {
    ...judgings,
    [characterId]: {
      ...judgings[characterId],
      [programId]: {
        ...judgings[characterId]?.[programId],
        [mapId]: rememberedOf(judging),
      },
    },
  };
}

/** The mark of the judging remembered for the triple `ids` against the chest as it stands, or null where none is remembered. */
export function judgingMark(
  judgings: RememberedJudgings,
  ids: JudgingIds,
  chest: Chest,
): JudgingMark | null {
  const held = judgings[ids.characterId]?.[ids.programId]?.[ids.mapId];
  if (!held) return null;
  const solved = held.results.filter((kind) => kind === "solved").length;
  const allSolved = solved === BALANCE.judgingSeeds.length;
  const stockShort = held.equipment.some(
    ({ item, count }) => (chest.pieces[item] ?? 0) < count,
  );
  return { solved, allSolved, stockShort, badge: allSolved && !stockShort };
}

/** The judgings without those remembered for the program `programId`, on every character and map. */
export function judgingsWithoutProgram(
  judgings: RememberedJudgings,
  programId: ProgramId,
): RememberedJudgings {
  const kept: RememberedJudgings = {};
  for (const [characterId, byProgram] of Object.entries(judgings)) {
    const rest = Object.entries(byProgram ?? {}).filter(
      ([program]) => program !== String(programId),
    );
    if (rest.length > 0) kept[Number(characterId)] = Object.fromEntries(rest);
  }
  return kept;
}

/** The judgings without those remembered for the character `characterId`, on every program and map. */
export function judgingsWithoutCharacter(
  judgings: RememberedJudgings,
  characterId: CharacterId,
): RememberedJudgings {
  return Object.fromEntries(
    Object.entries(judgings).filter(
      ([character]) => character !== String(characterId),
    ),
  );
}

/**
 * The judgings after the program numbered `programId` was saved with the content `after` over the content
 * `before` (D-440): without that program's where its rules, its rule groups in their order or its trip plan
 * come out different, the very value it got otherwise. The identity counters of the program are no
 * content: they decide no behaviour, and a rename is no save of content.
 */
export function judgingsAfterSave(
  judgings: RememberedJudgings,
  programId: ProgramId,
  before: Program,
  after: Program,
): RememberedJudgings {
  // A difference in the order of keys only reads as a change: the safe side, with one judging lost.
  const content = (program: Program): string =>
    JSON.stringify([program.groups, program.tripPlan]);
  return content(before) === content(after)
    ? judgings
    : judgingsWithoutProgram(judgings, programId);
}

/**
 * The judgings after the death of the character `characterId` was settled as `settlement` (D-440): without
 * the character's where the death took its practice and ranks because no use of the resurrection was left,
 * the very value it got otherwise.
 */
export function judgingsAfterDeath(
  judgings: RememberedJudgings,
  characterId: CharacterId,
  settlement: DeathSettlement,
): RememberedJudgings {
  return settlement.kind === "progressLost"
    ? judgingsWithoutCharacter(judgings, characterId)
    : judgings;
}
