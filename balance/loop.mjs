// The earning loop of the balance instrument: the game's own `startLoop` and `catchUp` run the earning
// loop of one character for given real hours on a list of seeds, with the loop clock of the instrument
// (a fixed real moment). It reads at each checkpoint what the game holds, and gives the balance of the
// loop per map run: the pieces its map runs take from the chest, the pieces they put into it and the
// share of map runs ended in death. It copies no number of the game.

import { BALANCE } from "../dist/browser/sim/data/balance.js";
import { SKILLS } from "../dist/browser/sim/data/skills.js";
import {
  catchUp,
  startLoop,
  waitingPractice,
} from "../dist/browser/sim/loop.js";
import { paidPractice, skillProgress } from "../dist/browser/sim/skills.js";
import { pieceCount } from "../dist/browser/sim/trip.js";
import {
  makeState,
  meanNumber,
  meanOf,
  prerequisitesOf,
  quantile,
} from "./engine.mjs";

/** The real moment the loop clock starts from: any safe integer would do. */
export const LOOP_START_MS = 1760000000000;
const MS_PER_HOUR = 60 * 60 * 1000;
export const MS_PER_MINUTE = 60 * 1000;
const MS_PER_LOOP_MINUTE = BALANCE.loopMinuteRealSeconds * 1000;

/** `numerator / denominator` in percent, one decimal, or null for no denominator. */
function percent(numerator, denominator) {
  return denominator === 0
    ? null
    : Math.round((numerator / denominator) * 1000) / 10;
}

/** The points of the levels above 1 summed over all trees: what a character has earned so far. */
export function earnedPoints(skills) {
  return Object.keys(SKILLS).reduce(
    (sum, id) => sum + skillProgress(skills, id).level - 1,
    0,
  );
}

/**
 * The state the earning loop starts from: one character with the program, skills, chest and the maps
 * that open `mapId` solved, the loop started on `mapId` at the loop clock's start with the seed given.
 * With `resurrectionReady` false every use of the team's resurrection is spent at the start, and the
 * clock of the returns starts at the loop's start, so the uses return as in the game from there.
 */
function startState({
  mapId,
  program,
  seed,
  skills,
  chest = {},
  resurrectionReady = true,
}) {
  let state = makeState({
    program,
    skills,
    chest,
    solvedMaps: [...prerequisitesOf(mapId), mapId],
  });
  if (!resurrectionReady) {
    state = {
      ...state,
      team: {
        ...state.team,
        resurrectionUsesSpent: BALANCE.resurrectionUses,
        resurrectionNextReturnAtMs:
          LOOP_START_MS +
          BALANCE.resurrectionRenewalRealMinutes * MS_PER_MINUTE,
      },
    };
  }
  const [character] = state.team.characters;
  const started = startLoop(
    { ...state, lastSeed: seed },
    { mapId, characterId: character.id },
    LOOP_START_MS,
  );
  if (!started.state.loops[character.id])
    throw new Error(`loop: the game refused to start the loop on ${mapId}`);
  return { ...started.state, saveTimeMs: LOOP_START_MS };
}

/** What the state shows of the loop of the team's first character at `hours` real hours. */
function readingOf(state, hours) {
  const [character] = state.team.characters;
  const loop = state.loops[character.id];
  const pending = loop ? waitingPractice(loop) : {};
  return {
    hours,
    alive: Boolean(loop),
    completed: loop?.completed ?? null,
    runNumber: loop?.runNumber ?? null,
    chest: { ...state.team.chest.pieces },
    chestPieces: pieceCount(state.team.chest.pieces),
    loopPractice: loop ? { ...loop.practice } : {},
    pendingPractice: pending,
    pointsIfStopped: loop
      ? earnedPoints(paidPractice(character.skills, pending))
      : 0,
    generation: character.generation,
    resurrectionUsed: state.awayReport.some((line) => line.resurrectionUsed),
  };
}

/**
 * One earning loop on `seed` for the real hours of `checkpoints`, each read through the game's
 * `catchUp` from the one before. Gives the `readings` in the order of the checkpoints, and the final
 * state for the caller that wants more of it.
 */
export function loopOnce(options) {
  const { seed, checkpoints = [8, 24], ...start } = options;
  let state = startState({ ...start, seed });
  const readings = [];
  for (const hours of checkpoints) {
    const passed = catchUp(state, LOOP_START_MS + hours * MS_PER_HOUR);
    state = { ...passed.state, saveTimeMs: passed.clockMs };
    readings.push(readingOf(state, hours));
  }
  return { seed, readings, finalState: state };
}

/** The summary of one checkpoint over the readings of all seeds, the stopped loops counted apart. */
function summarizeCheckpoint(hours, readings) {
  const alive = readings.filter((reading) => reading.alive);
  const chestSorted = readings
    .map((reading) => reading.chestPieces)
    .sort((a, b) => a - b);
  return {
    hours,
    loops: readings.length,
    stoppedShare: percent(readings.length - alive.length, readings.length),
    resurrectionUsedShare: percent(
      readings.filter((reading) => reading.resurrectionUsed).length,
      readings.length,
    ),
    completedMeanAlive: meanNumber(alive, (reading) => reading.completed),
    completedZeroShareAlive: percent(
      alive.filter((reading) => reading.completed === 0).length,
      alive.length,
    ),
    completedMeanAll: meanNumber(readings, (reading) => reading.completed ?? 0),
    chestMeanAll: meanNumber(readings, (reading) => reading.chestPieces),
    chestMeanAlive: meanNumber(alive, (reading) => reading.chestPieces),
    chestMedianAll: quantile(chestSorted, 0.5),
    chestByItemAll: meanOf(readings, (reading) => reading.chest),
    pointsIfStoppedMeanAlive: meanNumber(
      alive,
      (reading) => reading.pointsIfStopped,
    ),
    pendingPracticeAlive: meanOf(alive, (reading) => reading.pendingPractice),
  };
}

/**
 * `loopOnce` over a list of seeds, with the summary per checkpoint: how many loops stopped, how many
 * used the resurrection, the completions, the chest and the points each would pay if stopped there.
 */
export function loopSweep(options) {
  const { seeds, checkpoints = [8, 24], ...rest } = options;
  const runs = seeds.map((seed) => loopOnce({ ...rest, seed, checkpoints }));
  return {
    perCheckpoint: checkpoints.map((hours, index) =>
      summarizeCheckpoint(
        hours,
        runs.map((run) => run.readings[index]),
      ),
    ),
    runs: runs.map(({ seed, readings }) => ({ seed, readings })),
  };
}

/**
 * The balance of one seed's earning loop over `hours` real hours, counted minute by minute of the loop
 * clock through the game's `catchUp`. The first map run takes its pieces from the chest at the start;
 * each later one takes its own at the end of the one before. A map run that ends in a completion puts
 * its loot into the chest, and that loot is the change of the chest plus what the next map run took.
 * A death, covered or not, puts nothing; a loop that stops is a death, and takes nothing more.
 */
function balanceOnce({ hours, ...start }) {
  const minutes = Math.floor((hours * MS_PER_HOUR) / MS_PER_LOOP_MINUTE);
  let state = startState(start);
  const [character] = state.team.characters;
  const given = pieceCount(start.chest ?? {});
  let taken = given - pieceCount(state.team.chest.pieces);
  let put = 0;
  let mapRuns = 1;
  let ended = 0;
  let deaths = 0;
  let completed = 0;
  for (let minute = 1; minute <= minutes; minute += 1) {
    const before = state;
    const passed = catchUp(state, LOOP_START_MS + minute * MS_PER_LOOP_MINUTE);
    state = { ...passed.state, saveTimeMs: passed.clockMs };
    if (!passed.events.some((event) => event.kind === "loopRunEnded")) continue;
    ended += 1;
    const loop = state.loops[character.id];
    const finished =
      loop !== undefined &&
      loop.completed > before.loops[character.id].completed;
    if (finished) completed += 1;
    else deaths += 1;
    const startedNext = loop ? pieceCount(loop.run.character.backpack) : 0;
    if (loop) mapRuns += 1;
    taken += startedNext;
    put +=
      pieceCount(state.team.chest.pieces) -
      pieceCount(before.team.chest.pieces) +
      startedNext;
  }
  return {
    seed: start.seed,
    mapRuns,
    ended,
    deaths,
    completed,
    taken,
    put,
    chestPieces: pieceCount(state.team.chest.pieces),
  };
}

/** `numerator / denominator` with two decimals, or null for no denominator. */
function perMapRun(numerator, denominator) {
  return denominator === 0
    ? null
    : Math.round((numerator / denominator) * 100) / 100;
}

/** The balance per map run over all seeds: pieces taken and put per map run begun, the share of deaths. */
function summarizeBalance(perSeed) {
  const sum = (key) => perSeed.reduce((total, row) => total + row[key], 0);
  const mapRuns = sum("mapRuns");
  return {
    seeds: perSeed.length,
    mapRuns,
    ended: sum("ended"),
    takenPerMapRun: perMapRun(sum("taken"), mapRuns),
    putPerMapRun: perMapRun(sum("put"), mapRuns),
    deathShare: percent(sum("deaths"), sum("ended")),
  };
}

/**
 * The balance of an earning loop per map run for the map check: over `hours` real hours on each seed,
 * the pieces its map runs take from the chest, the pieces they put into it and the share of map runs
 * ended in death. `perSeed` gives the counts per seed; `summary` the figures per map run.
 */
export function loopBalance(options) {
  const { seeds, hours = 24, ...start } = options;
  const perSeed = seeds.map((seed) => balanceOnce({ ...start, seed, hours }));
  return { summary: summarizeBalance(perSeed), perSeed };
}
