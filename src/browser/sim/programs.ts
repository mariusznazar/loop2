import type {
  CharacterId,
  GameState,
  Program,
  ProgramId,
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
