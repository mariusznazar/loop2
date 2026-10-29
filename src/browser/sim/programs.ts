import { checkProgram, reconcileCounts, type GameResult } from "./game.js";
import type {
  CharacterId,
  GameState,
  Program,
  ProgramId,
  ProgramNameCheck,
  SavedProgram,
} from "./types.js";

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
 * The program a character with no pick and no program used last goes with (D-158): the program
 * with which a character last entered a map while it is on the list, or else the first of the list.
 */
export function teamProgram(state: GameState): SavedProgram {
  return (
    programById(state.programs, state.lastEnteredProgram) ?? state.programs[0]
  );
}

/**
 * The program of a character's headquarters row (D-158): the first still on the list of the
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
 * The name a program takes from typed text (D-156): the text without white space at its start and
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
