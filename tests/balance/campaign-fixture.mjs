// The context of one campaign return for the tests of `comeBack`: the campaign's character with
// practice on the earning loop of the empty program at Skraj lasu, a program that does nothing, so that
// every map run of the loop ends in the same death.

import { advanceLoopRun, startLoop } from "../../dist/browser/sim/loop.js";
import { makeState } from "../../balance/engine.mjs";
import { LOOP_START_MS } from "../../balance/loop.mjs";
import { emptyProgram } from "../sim/reference-programs.mjs";

const FIRST_MAP = "forestEdge";

/**
 * The campaign's one character on the loop of the empty program at Skraj lasu from the loop's start:
 * the mage has practice, so a death is covered by a use while one is left, and the program does
 * nothing, so every map run of the loop ends in a death.
 */
export function emptyLoopContext() {
  return loopContextOf(emptyProgram, 1);
}

/**
 * The context of `emptyLoopContext` with the loop of `program` at Skraj lasu, its first map run
 * started on `seed`: where the program completes some map runs and dies in others, one return holds
 * both.
 */
export function loopContextOf(program, seed) {
  const [skills] = makeState().team.characters.map(
    (character) => character.skills,
  );
  const state = makeState({
    program,
    skills: { ...skills, eating: { practice: 20, ranks: {} } },
    solvedMaps: [FIRST_MAP],
  });
  const [character] = state.team.characters;
  const started = startLoop(
    { ...state, lastSeed: seed },
    { mapId: FIRST_MAP, characterId: character.id },
    LOOP_START_MS,
  ).state;
  return {
    player: { days: 0, attempts: [] },
    state: { ...started, saveTimeMs: LOOP_START_MS },
    characterId: character.id,
    clock: { ms: LOOP_START_MS },
    horizonMs: LOOP_START_MS + 2 * 24 * 60 * 60 * 1000,
    nextDayMark: 1,
    log: {
      resurrectionsUsed: 0,
      loopCompletions: 0,
      progressLost: 0,
      daily: [],
    },
  };
}

/** The game minutes the map run of the empty loop lasts before the mage dies, read from the game. */
export function minutesOfAnEmptyRun() {
  const { state, characterId } = emptyLoopContext();
  return advanceLoopRun(state, characterId, 100000).passed;
}
