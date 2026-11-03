import { MAPS } from "../sim/data/maps.js";
import type { CharacterId, GameState, ProgramId } from "../sim/types.js";

/** A screen the address names, or the screen an address leads to (D-281). */
export type Screen =
  | { readonly kind: "headquarters" }
  | { readonly kind: "character"; readonly characterId: CharacterId }
  | { readonly kind: "programs" }
  | { readonly kind: "program"; readonly programId: ProgramId }
  | { readonly kind: "run"; readonly characterId: CharacterId };

/** The items of the menu bar that a screen can mark (D-280, D-277). */
export type MenuItem = "headquarters" | "programs";

/** The menu bar's entry back to the map run, with the address it leads to (D-280). */
export type ReturnEntry = { readonly text: string; readonly address: string };

const CHARACTER = /^#\/postac\/([1-9][0-9]*)$/;
const CHARACTER_RUN = /^#\/postac\/([1-9][0-9]*)\/przejscie$/;
const PROGRAM = /^#\/programy\/([1-9][0-9]*)$/;

/** The number a decimal digit string names, or null where it names no safe whole number. */
function number(digits: string): number | null {
  const value = Number(digits);
  return Number.isSafeInteger(value) ? value : null;
}

/**
 * The screen the fragment of the page's address names, or null where it names none. The fragment
 * is read as `location.hash` gives it, `#` included, and never decoded: an encoded or upper-case
 * address names no screen. Emailed-link fragments name no screen, since the page handles them
 * first (D-156, D-224, D-225). Pure.
 */
export function readScreenAddress(hash: string): Screen | null {
  if (hash === "#/") return { kind: "headquarters" };
  if (hash === "#/programy") return { kind: "programs" };
  const run = CHARACTER_RUN.exec(hash);
  if (run) {
    const characterId = number(run[1]);
    return characterId === null ? null : { kind: "run", characterId };
  }
  const character = CHARACTER.exec(hash);
  if (character) {
    const characterId = number(character[1]);
    return characterId === null ? null : { kind: "character", characterId };
  }
  const program = PROGRAM.exec(hash);
  if (program) {
    const programId = number(program[1]);
    return programId === null ? null : { kind: "program", programId };
  }
  return null;
}

function hasCharacter(state: GameState, characterId: CharacterId): boolean {
  return state.team.characters.some(
    (character) => character.id === characterId,
  );
}

/**
 * The existing screen nearest the named one (D-281): a map run screen with no map run of its
 * character gives that character's screen; a character screen or a map run screen of a number no
 * character carries gives Siedziba; a program screen of a number no program carries gives Programy;
 * no named screen gives Siedziba. Pure.
 */
export function resolveScreen(named: Screen | null, state: GameState): Screen {
  if (named === null) return { kind: "headquarters" };
  switch (named.kind) {
    case "headquarters":
    case "programs":
      return named;
    case "character":
      return hasCharacter(state, named.characterId)
        ? named
        : { kind: "headquarters" };
    case "run":
      if (state.run?.character.id === named.characterId) return named;
      return hasCharacter(state, named.characterId)
        ? { kind: "character", characterId: named.characterId }
        : { kind: "headquarters" };
    case "program":
      return state.programs.some((program) => program.id === named.programId)
        ? named
        : { kind: "programs" };
  }
}

/** The fragment of the page's address that names a screen (D-281). Pure. */
export function screenAddress(screen: Screen): string {
  switch (screen.kind) {
    case "headquarters":
      return "#/";
    case "character":
      return `#/postac/${screen.characterId}`;
    case "programs":
      return "#/programy";
    case "program":
      return `#/programy/${screen.programId}`;
    case "run":
      return `#/postac/${screen.characterId}/przejscie`;
  }
}

/**
 * The item of the menu bar that marks a screen (D-277, D-280): Siedziba on Siedziba and on the
 * character's screen, Programy on the programs screen and on a program's, and none on a map run's
 * screen. Pure.
 */
export function markedMenuItem(screen: Screen): MenuItem | null {
  switch (screen.kind) {
    case "headquarters":
    case "character":
      return "headquarters";
    case "programs":
    case "program":
      return "programs";
    case "run":
      return null;
  }
}

/**
 * The menu bar's „Wróć do przejścia · {mapa} · minuta {m}” for a game state holding a manual map
 * run, going on or ended and waiting for „Restart” or „Zakończ” (D-280), with the address of its
 * screen; null where the game state holds no map run. The minute is the one the status row writes,
 * and the map's name comes from the data. Pure.
 */
export function returnToRunEntry(state: GameState): ReturnEntry | null {
  const run = state.run;
  if (run === null) return null;
  const minute = run.death?.minute ?? run.completion?.minute ?? run.minute;
  return {
    text: `Wróć do przejścia · ${MAPS[run.mapId].name} · minuta ${minute}`,
    address: screenAddress({ kind: "run", characterId: run.character.id }),
  };
}
