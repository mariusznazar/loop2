import { ITEMS } from "./data/items.js";
import { MAPS, type MapDef } from "./data/maps.js";
import type { GameResult } from "./game.js";
import { conditionNumber, onStep } from "./program.js";
import { mapRunEnded } from "./run.js";
import type {
  Action,
  CharacterId,
  Condition,
  GameMapRun,
  GameState,
  ItemId,
  MapRun,
  Program,
  ProgramId,
  ProgramNameCheck,
  ProgramRule,
  ResourceId,
  SavedProgram,
} from "./types.js";

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

/** The resources a program may name: the run's map's, or without a run those of any map. */
function allowedResources(run: MapRun | null): ReadonlySet<string> {
  const maps: MapDef[] = run ? [MAPS[run.mapId]] : Object.values(MAPS);
  return new Set(
    maps.flatMap((map) => map.resources.map((resource) => resource.id)),
  );
}

function checkResource(
  value: unknown,
  allowed: ReadonlySet<string>,
): ResourceId {
  if (typeof value !== "string" || !allowed.has(value)) {
    throw new Error(
      `program: resource ${String(value)} is not a resource of the map`,
    );
  }
  return value as ResourceId;
}

/** An item of the data, bound to no map. */
function checkItem(value: unknown): ItemId {
  if (typeof value !== "string" || !Object.hasOwn(ITEMS, value)) {
    throw new Error(
      `program: item ${String(value)} is not an item of the data`,
    );
  }
  return value as ItemId;
}

/**
 * How far a number may lie from its step's grid and still be taken, as a part of the step: binary
 * rounding, never a number the player could type.
 */
const STEP_TOLERANCE = 1e-9;

/**
 * The number of a condition of `kind`: a finite number from the kind's minimum to its maximum, on
 * its step counted from the minimum, held as the decimal of that step.
 */
function checkNumber(kind: Condition["kind"], value: unknown): number {
  const number = conditionNumber(kind);
  if (!number)
    throw new Error(`program: condition kind ${kind} takes no number`);
  const { min, max, step } = number;
  if (
    typeof value !== "number" ||
    !Number.isFinite(value) ||
    value < min ||
    value > max
  ) {
    throw new Error(
      `program: ${String(value)} is not a number from ${min} to ${max}`,
    );
  }
  const held = onStep(value, number);
  if (Math.abs(value - held) > step * STEP_TOLERANCE) {
    throw new Error(
      `program: ${String(value)} does not lie on the step ${step} from ${min}`,
    );
  }
  return held;
}

function checkCondition(
  value: unknown,
  allowed: ReadonlySet<string>,
): Condition {
  if (!isObject(value)) throw new Error("program: a rule has no condition");
  switch (value.kind) {
    case "always":
      return { kind: "always" };
    case "hereBelow": {
      const number = checkNumber("hereBelow", value.value);
      return {
        kind: "hereBelow",
        resource: checkResource(value.resource, allowed),
        value: number,
      };
    }
    case "itemBelow": {
      const number = checkNumber("itemBelow", value.value);
      return { kind: "itemBelow", item: checkItem(value.item), value: number };
    }
    // The body's conditions and those on the campfire name nothing: the simulation reads the
    // character's body, and the campfire on its tile or the nearest one.
    case "temperatureBelow":
    case "satietyBelow":
    case "campfireLeftBelow":
    case "healthBelow":
    case "opponentHealthBelow":
      return { kind: value.kind, value: checkNumber(value.kind, value.value) };
    case "awayFromCampfire":
      return { kind: "awayFromCampfire" };
    default:
      throw new Error(
        `program: condition kind ${String(value.kind)} is not on the closed list`,
      );
  }
}

function checkAction(value: unknown, allowed: ReadonlySet<string>): Action {
  if (!isObject(value)) throw new Error("program: a rule has no action");
  switch (value.kind) {
    case "explore":
      return { kind: "explore" };
    case "wander":
      return { kind: "wander" };
    case "walkTo":
      return {
        kind: "walkTo",
        resource: checkResource(value.resource, allowed),
      };
    case "gather":
      return {
        kind: "gather",
        resource: checkResource(value.resource, allowed),
      };
    // The actions on the campfire and the backpack name nothing: the simulation picks the
    // campfire on the character's tile, or the nearest one, and the pieces they use.
    case "walkToCampfire":
      return { kind: "walkToCampfire" };
    case "craftCampfire":
      return { kind: "craftCampfire" };
    case "lightCampfire":
      return { kind: "lightCampfire" };
    case "lightItem":
      return { kind: "lightItem" };
    case "feedCampfire":
      return { kind: "feedCampfire" };
    case "eat":
      return { kind: "eat" };
    case "strikeWithStick":
      return { kind: "strikeWithStick" };
    case "kick":
      return { kind: "kick" };
    case "dodge":
      return { kind: "dodge" };
    default:
      throw new Error(
        `program: action kind ${String(value.kind)} is not on the closed list`,
      );
  }
}

/** A positive safe integer, so a stored identity remains exact. */
function checkIdentity(value: unknown): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 1)
    throw new Error("program: an identity is not a positive safe integer");
  return value;
}

/** Each identity occurs once and precedes its next-identity counter. */
function uniqueIdentity(
  value: unknown,
  next: number,
  seen: Set<number>,
): number {
  const id = checkIdentity(value);
  if (id >= next || seen.has(id))
    throw new Error(
      "program: an identity is duplicated or reaches its next counter",
    );
  seen.add(id);
  return id;
}

/** A copy of the program built from the closed list; throws on anything outside it. */
export function checkProgram(value: unknown, run: MapRun | null): Program {
  if (!isObject(value) || !Array.isArray(value.groups))
    throw new Error("program: no list of groups");
  const nextGroupId = checkIdentity(value.nextGroupId);
  const nextRuleId = checkIdentity(value.nextRuleId);
  const allowed = allowedResources(run);
  const groupIds = new Set<number>();
  const ruleIds = new Set<number>();
  const groups = value.groups.map((group: unknown) => {
    if (
      !isObject(group) ||
      typeof group.name !== "string" ||
      !Array.isArray(group.rules) ||
      Object.hasOwn(group, "groups")
    )
      throw new Error(
        "program: a group must hold a name and a list of rules at one level",
      );
    const id = uniqueIdentity(group.id, nextGroupId, groupIds);
    const condition = checkCondition(group.condition, allowed);
    const rules = group.rules.map((rule: unknown): ProgramRule => {
      if (!isObject(rule))
        throw new Error(
          "program: a rule is not a pair of a condition and an action",
        );
      return {
        id: uniqueIdentity(rule.id, nextRuleId, ruleIds),
        condition: checkCondition(rule.condition, allowed),
        action: checkAction(rule.action, allowed),
      };
    });
    return { id, name: group.name, condition, rules };
  });
  return { groups, nextGroupId, nextRuleId };
}

/**
 * The counts of the rules of `previous` carried over to the rules of `program`: counts follow rule
 * identity and canonical validated content, never group or position.
 */
export function reconcileCounts(
  counts: GameState["ruleCounts"],
  previous: Program,
  program: Program,
): GameState["ruleCounts"] {
  if (counts === null) return null;
  const before = new Map(
    previous.groups.flatMap((group) =>
      group.rules.map((rule) => [rule.id, rule] as const),
    ),
  );
  return Object.fromEntries(
    program.groups.flatMap((group) =>
      group.rules.map((rule) => {
        const old = before.get(rule.id);
        const unchanged =
          old &&
          JSON.stringify([old.condition, old.action]) ===
            JSON.stringify([rule.condition, rule.action]);
        return [rule.id, unchanged ? (counts[rule.id] ?? 0) : 0];
      }),
    ),
  );
}

/** Deep equality of plain data: the same keys with equal values, arrays in order. */
export function sameData(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (!isObject(a) || !isObject(b) || Array.isArray(a) !== Array.isArray(b))
    return false;
  const keys = Object.keys(a);
  return (
    keys.length === Object.keys(b).length &&
    keys.every((key) => Object.hasOwn(b, key) && sameData(a[key], b[key]))
  );
}

/** The name of the program a new game holds. */
export const FIRST_PROGRAM_NAME = "Program";

/** The content of a new program: the empty rule group „Program” under „Zawsze” (D-91). */
export function emptyProgram(): Program {
  return {
    groups: [
      { id: 1, name: "Program", condition: { kind: "always" }, rules: [] },
    ],
    nextGroupId: 2,
    nextRuleId: 1,
  };
}

/** The program of the list numbered `id`, or undefined where none is, such as after a deletion. */
export function programById(
  programs: readonly SavedProgram[],
  id: ProgramId | null | undefined,
): SavedProgram | undefined {
  return id === null || id === undefined
    ? undefined
    : programs.find((saved) => saved.id === id);
}

/**
 * The program a character with no pick and no program used last goes with (D-170): the program
 * with which a character last entered a map while it is on the list, or else the first of the list.
 */
export function teamProgram(state: GameState): SavedProgram {
  return (
    programById(state.programs, state.lastEnteredProgram) ?? state.programs[0]
  );
}

/**
 * The program of a character's headquarters row (D-170): the first still on the list of the
 * program picked on that row, the character's program used last, the program with which a
 * character last entered a map and the first program of the list.
 */
export function rowProgram(
  state: GameState,
  characterId: CharacterId,
): SavedProgram {
  return (
    programById(state.programs, state.pickedPrograms[characterId]) ??
    programById(state.programs, state.lastUsedPrograms[characterId]) ??
    teamProgram(state)
  );
}

/** The list with the content of the program numbered `id` replaced; the others stay. */
export function withProgramContent(
  programs: readonly SavedProgram[],
  id: ProgramId,
  program: Program,
): SavedProgram[] {
  return programs.map((saved) =>
    saved.id === id ? { ...saved, program } : saved,
  );
}

/**
 * The name a program takes from typed text (D-169): the text without white space at its start and
 * end. It is refused as `empty` where nothing is left, and as `taken` where the name of a program
 * other than `ownId` equals it regardless of letter case; a program's own name in another letter
 * case does not block its rename. The length is not limited.
 */
export function programName(
  programs: readonly SavedProgram[],
  text: string,
  ownId?: ProgramId,
): ProgramNameCheck {
  const name = typeof text === "string" ? text.trim() : "";
  if (name === "") return { ok: false, reason: "empty" };
  const folded = name.toLowerCase();
  const taken = programs.some(
    (saved) => saved.id !== ownId && saved.name.toLowerCase() === folded,
  );
  return taken ? { ok: false, reason: "taken" } : { ok: true, name };
}

/** „Program n” for the smallest n from 2 that no program's name takes, letter case ignored. */
export function suggestedProgramName(
  programs: readonly SavedProgram[],
): string {
  const taken = new Set(programs.map((saved) => saved.name.toLowerCase()));
  let n = 2;
  while (taken.has(`program ${n}`)) n += 1;
  return `Program ${n}`;
}

function requireProgram(
  state: GameState,
  programId: ProgramId,
  operation: string,
): SavedProgram {
  const saved = programById(state.programs, programId);
  if (!saved)
    throw new Error(
      `${operation}: no program ${String(programId)} on the list`,
    );
  return saved;
}

/**
 * Creates a program with the suggested name, the next program number and one empty rule group
 * „Program” under „Zawsze”, at the end of the list. The caller finds its number as the last
 * program of the new list, or as the previous `nextProgramId`.
 */
export function createProgram(state: GameState): GameResult {
  return {
    state: {
      ...state,
      programs: [
        ...state.programs,
        {
          id: state.nextProgramId,
          name: suggestedProgramName(state.programs),
          program: emptyProgram(),
        },
      ],
      nextProgramId: state.nextProgramId + 1,
    },
    events: [],
  };
}

/**
 * Renames the program numbered `programId` to the name `programName` gives for `text`, keeping its
 * place; throws on a program not on the list and on a refused name.
 */
export function renameProgram(
  state: GameState,
  programId: ProgramId,
  text: string,
): GameResult {
  requireProgram(state, programId, "renameProgram");
  const checked = programName(state.programs, text, programId);
  if (!checked.ok)
    throw new Error(`renameProgram: the name is refused as ${checked.reason}`);
  return {
    state: {
      ...state,
      programs: state.programs.map((saved) =>
        saved.id === programId ? { ...saved, name: checked.name } : saved,
      ),
    },
    events: [],
  };
}

/**
 * Deletes the program numbered `programId`; throws on a program not on the list and while the list
 * holds one program. Where the map run's copy belongs to it, the copy's number becomes none and the
 * copy keeps the name the program had; where the counts stand beside it after „Zakończ”, they are
 * cleared. Records that name it find no program from then on.
 */
export function deleteProgram(
  state: GameState,
  programId: ProgramId,
): GameResult {
  const deleted = requireProgram(state, programId, "deleteProgram");
  if (state.programs.length === 1)
    throw new Error("deleteProgram: the last program of the list stays");
  const run = state.run;
  const copyLosesProgram = run !== null && run.copy.programId === programId;
  const countsLoseProgram = state.countsProgram === programId;
  return {
    state: {
      ...state,
      programs: state.programs.filter((saved) => saved.id !== programId),
      ...(run &&
        copyLosesProgram && {
          run: {
            ...run,
            copy: { ...run.copy, programId: null, deletedName: deleted.name },
          },
        }),
      ...(countsLoseProgram && { ruleCounts: null, countsProgram: null }),
    },
    events: [],
  };
}

/**
 * Replaces the content of the program numbered `programId`, checked against the resources of every
 * map; throws on a program not on the list and on a program outside the closed lists. Where the
 * counts stand beside that program after „Zakończ”, they are reconciled with the new content. It
 * never changes the map run, its copy, its streak, its beaten attacks or its counts during one.
 */
export function editProgram(
  state: GameState,
  programId: ProgramId,
  program: Program,
): GameResult {
  const edited = requireProgram(state, programId, "editProgram");
  const checked = checkProgram(program, null);
  return {
    state: {
      ...state,
      programs: withProgramContent(state.programs, programId, checked),
      ...(state.countsProgram === programId && {
        ruleCounts: reconcileCounts(state.ruleCounts, edited.program, checked),
      }),
    },
    events: [],
  };
}

/**
 * Picks the program of a character's headquarters row, kept until that character is sent; throws
 * on a character not in the team and on a program not on the list.
 */
export function pickProgram(
  state: GameState,
  characterId: CharacterId,
  programId: ProgramId,
): GameResult {
  if (!state.team.characters.some((listed) => listed.id === characterId))
    throw new Error(
      `pickProgram: no character ${String(characterId)} in the team`,
    );
  requireProgram(state, programId, "pickProgram");
  return {
    state: {
      ...state,
      pickedPrograms: { ...state.pickedPrograms, [characterId]: programId },
    },
    events: [],
  };
}

/** The counts of a copy that has not yet fired: every rule of `program` at zero. */
export function zeroCounts(program: Program): GameState["ruleCounts"] {
  return Object.fromEntries(
    program.groups.flatMap((group) => group.rules.map((rule) => [rule.id, 0])),
  );
}

/**
 * The state with the map run's copy replaced by `program`, already checked: the counts are
 * reconciled with it and, where it differs from the copy before it — groups and rules in order with
 * their identities, conditions and actions, and the identity counters — the streak and the beaten
 * attacks of a map run not ended become 0, paused or not. The copy's program number and base stay.
 */
export function withCopyProgram(
  state: GameState,
  run: GameMapRun,
  program: Program,
): GameState {
  const zeroed = !mapRunEnded(run) && !sameData(run.copy.program, program);
  return {
    ...state,
    ruleCounts: reconcileCounts(state.ruleCounts, run.copy.program, program),
    run: {
      ...run,
      copy: { ...run.copy, program },
      ...(zeroed && { streak: 0, defeatedAttacks: 0 }),
    },
  };
}

/**
 * The measure „the copy has unsaved changes”: the map run's copy differs from its base, compared
 * as `setProgram` compares programs (the identity counters included), or its program is gone from
 * the list. False without a map run.
 */
export function copyHasUnsavedChanges(state: GameState): boolean {
  const run = state.run;
  if (!run) return false;
  return (
    !sameData(run.copy.program, run.copy.base) ||
    programById(state.programs, run.copy.programId) === undefined
  );
}

/**
 * The measure „the copy's program has changes the copy lacks”: the copy's program is on the list
 * and its content differs from the copy's base, compared as `setProgram` compares programs. False
 * without a map run and where the program is gone.
 */
export function programHasChangesCopyLacks(state: GameState): boolean {
  const run = state.run;
  if (!run) return false;
  const owner = programById(state.programs, run.copy.programId);
  return owner !== undefined && !sameData(owner.program, run.copy.base);
}

function requireMapRun(state: GameState, operation: string): GameMapRun {
  if (!state.run) throw new Error(`${operation}: there is no map run`);
  return state.run;
}

/**
 * Saves the map run's copy into its program: the program's content and the copy's base become the
 * copy. The copy, the streak, the beaten attacks and the counts stay, and nothing asks for
 * confirmation where the program has changes the copy lacks. Allowed also in a map run ended in
 * death or a completion. Throws without a map run, without unsaved changes and with the copy's
 * program gone.
 */
export function saveCopyIntoProgram(state: GameState): GameResult {
  const run = requireMapRun(state, "saveCopyIntoProgram");
  const owner = programById(state.programs, run.copy.programId);
  if (!owner)
    throw new Error("saveCopyIntoProgram: the copy's program is gone");
  if (!copyHasUnsavedChanges(state))
    throw new Error("saveCopyIntoProgram: the copy has no unsaved changes");
  return {
    state: {
      ...state,
      programs: withProgramContent(state.programs, owner.id, run.copy.program),
      run: { ...run, copy: { ...run.copy, base: run.copy.program } },
    },
    events: [],
  };
}

/**
 * Saves the map run's copy as a new program named by `programName` for `text`, at the end of the
 * list with the next program number and the copy's content. The copy takes the new program's number
 * and its base becomes the copy; the character's program used last becomes the new program. The
 * copy's content, the streak, the beaten attacks and the counts stay, and this is no switch.
 * Allowed also in a map run ended in death or a completion and with the copy's program gone. Throws
 * without a map run, without unsaved changes and on a refused name.
 */
export function saveCopyAsNewProgram(
  state: GameState,
  text: string,
): GameResult {
  const run = requireMapRun(state, "saveCopyAsNewProgram");
  if (!copyHasUnsavedChanges(state))
    throw new Error("saveCopyAsNewProgram: the copy has no unsaved changes");
  const checked = programName(state.programs, text);
  if (!checked.ok)
    throw new Error(
      `saveCopyAsNewProgram: the name is refused as ${checked.reason}`,
    );
  const id = state.nextProgramId;
  return {
    state: {
      ...state,
      programs: [
        ...state.programs,
        { id, name: checked.name, program: run.copy.program },
      ],
      nextProgramId: id + 1,
      lastUsedPrograms: { ...state.lastUsedPrograms, [run.character.id]: id },
      run: {
        ...run,
        copy: {
          program: run.copy.program,
          programId: id,
          deletedName: null,
          base: run.copy.program,
        },
      },
    },
    events: [],
  };
}

/**
 * Discards the changes of the map run's copy: the copy becomes its base, as an edit of the copy
 * does — the counts are reconciled and the streak and the beaten attacks of a map run not ended
 * become 0 where the copy changes. Allowed also in a map run ended in death or a completion. Throws
 * without a map run, without unsaved changes and with the copy's program gone.
 */
export function discardCopyChanges(state: GameState): GameResult {
  const run = requireMapRun(state, "discardCopyChanges");
  if (programById(state.programs, run.copy.programId) === undefined)
    throw new Error("discardCopyChanges: the copy's program is gone");
  if (!copyHasUnsavedChanges(state))
    throw new Error("discardCopyChanges: the copy has no unsaved changes");
  return { state: withCopyProgram(state, run, run.copy.base), events: [] };
}

/**
 * Switches the character of the map run to the program numbered `programId`: the map run gets a
 * fresh copy record of that program, the streak and the beaten attacks become 0, every count of
 * the new copy's rules starts from zero and the character's program used last becomes it. The seed,
 * the minute, the map, the body, the backpack, the action in progress and the pause, a pause at a
 * discovery included, stay as they are. Throws without a map run, with a map run ended in death or
 * a completion, on a program not on the list and on the program the copy belongs to.
 */
export function switchProgram(
  state: GameState,
  programId: ProgramId,
): GameResult {
  const run = requireMapRun(state, "switchProgram");
  if (mapRunEnded(run)) throw new Error("switchProgram: the map run has ended");
  const chosen = requireProgram(state, programId, "switchProgram");
  if (run.copy.programId === programId)
    throw new Error("switchProgram: the copy already belongs to that program");
  return {
    state: {
      ...state,
      ruleCounts: zeroCounts(chosen.program),
      lastUsedPrograms: {
        ...state.lastUsedPrograms,
        [run.character.id]: chosen.id,
      },
      run: {
        ...run,
        copy: {
          program: chosen.program,
          programId: chosen.id,
          deletedName: null,
          base: chosen.program,
        },
        streak: 0,
        defeatedAttacks: 0,
      },
    },
    events: [],
  };
}
