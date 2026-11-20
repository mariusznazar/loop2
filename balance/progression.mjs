// The progression measurement of the balance instrument: whether each map of the game can be solved
// with what the maps before it gave, and no earning loop (D-438). For each map it builds the state the
// map is measured from through the game's own functions, and measures every reference program from it
// on the seeds of the measurement, the map counting by its best program, which is the program that
// solves the largest share of the seeds. The state is the practice that the first solvings of the maps
// before it pay, each by the best program of that map (the median of its solved map runs, summed along
// the chain of maps that open the map); the ranks of the branches the measured program needs, bought
// from that practice with the game's `buyBranch` as far as its points reach; and the stock of the
// program's take list, brought out by manual runs of the solved maps before it with the game's `send`
// and `advanceMinutes`, so that the chest takes and keeps by the rules of the game, counted. Each map
// run of the measurement itself is stepped by the engine, so it ends as it ends in the game (invariant
// instrument-game-agreement). The result is data, and its table names no program by more than a
// label (D-428); the file is written by `balance/cli.mjs` alone.

import { BALANCE } from "../dist/browser/sim/data/balance.js";
import { BRANCHES, SKILLS } from "../dist/browser/sim/data/skills.js";
import { MAPS } from "../dist/browser/sim/data/maps.js";
import { advanceMinutes, end, send } from "../dist/browser/sim/game.js";
import { buyBranch } from "../dist/browser/sim/skills.js";
import { REFERENCE_PROGRAMS } from "../tests/sim/reference-programs.mjs";
import { renderTable } from "./check-map.mjs";
import { programLabels } from "./describe.mjs";
import {
  DEFAULT_CAP_MINUTES,
  buildSkills,
  makeState,
  prerequisitesOf,
  quantile,
  seedRange,
  sweep,
} from "./engine.mjs";
import { LOOP_START_MS } from "./loop.mjs";

/** The seeds each program is measured on, which the table's figures stand on. */
export const PROGRESSION_SEEDS = seedRange(1, 500);
/** The manual runs of solved maps after which the stock of a take list is given up as not gathered. */
export const MAX_STOCK_RUNS = 100;
/** The share of the seeds, in percent, from which a map counts as solvable by its best program. */
export const SOLVABLE_SHARE = 20;
/** The columns the map check's table ends with that belong to the earning loop, which this table lacks. */
const LOOP_COLUMN_COUNT = 3;

/**
 * The branches a program needs: those whose effect opens an action the program's rules use. A
 * program that uses such an action does nothing with it before the character has bought the branch.
 */
export function neededBranches(program) {
  const used = new Set(
    program.groups.flatMap((group) =>
      group.rules.map((rule) => rule.action.kind),
    ),
  );
  return Object.entries(BRANCHES)
    .filter(
      ([, branch]) =>
        branch.effect.kind === "action" && used.has(branch.effect.action),
    )
    .map(([branchId]) => branchId);
}

/**
 * The skills of a character with `practice` ({ skillId: n }) who has bought, with the game's
 * `buyBranch`, every rank of each branch `program` needs that the points of the practice reach, and
 * no other.
 */
export function skillsFor(program, practice) {
  let state = makeState({ skills: buildSkills({ practice }) });
  const [character] = state.team.characters;
  for (const branchId of neededBranches(program)) {
    for (;;) {
      const bought = buyBranch(state, character.id, branchId).state;
      if (bought === state) break;
      state = bought;
    }
  }
  return state.team.characters[0].skills;
}

/** The pieces of the take list the chest holds, each item counted up to the count the list gives. */
function coveredPieces(chest, take) {
  return take.reduce(
    (sum, { item, count }) => sum + Math.min(count, chest[item] ?? 0),
    0,
  );
}

/** One manual map run of the solved map, from start to its end or to the cap, through the game's functions. */
function manualRun(state, mapId, characterId) {
  const sent = send(state, { mapId, characterId }, LOOP_START_MS).state;
  return end(advanceMinutes(sent, DEFAULT_CAP_MINUTES).state).state;
}

/**
 * Manual runs of one solved map by one program, one after another from an empty chest, until the chest
 * holds the take list or `maxRuns` runs are made. The run of the n-th seed comes from the n-th seed of
 * the measurement; a run pays no practice, since its map is solved, and its death is left unsettled,
 * for it only costs the run.
 */
function stockOnMap({ take, candidate, practice, maxRuns }) {
  const skills = skillsFor(candidate.program, practice);
  let state = makeState({
    program: candidate.program,
    skills,
    solvedMaps: [...prerequisitesOf(candidate.mapId), candidate.mapId],
  });
  const characterId = state.team.characters[0].id;
  let runs = 0;
  while (coveredPieces(state.team.chest.pieces, take) < total(take)) {
    if (runs >= maxRuns) break;
    runs += 1;
    state = manualRun(
      { ...state, lastSeed: runs },
      candidate.mapId,
      characterId,
    );
  }
  const chest = { ...state.team.chest.pieces };
  return {
    runs,
    complete: coveredPieces(chest, take) === total(take),
    chest,
    mapId: candidate.mapId,
  };
}

/** The pieces a take list asks in all. */
function total(take) {
  return take.reduce((sum, { count }) => sum + count, 0);
}

/** Whether the attempt `a` is the better stock: a complete one, then fewer runs, or else more of the list. */
function betterStock(a, b, take) {
  if (a.complete !== b.complete) return a.complete;
  if (a.complete) return a.runs < b.runs;
  return coveredPieces(a.chest, take) > coveredPieces(b.chest, take);
}

/**
 * The stock a take list is brought out with by manual runs of the solved maps among `candidates`
 * (`{ mapId, program }`, each map solved and each program its best), with the character's `practice`:
 * the attempt on one map that holds the whole list in the fewest runs, the earliest of equals, or,
 * where none does, the one that comes nearest. Gives `{ runs, complete, chest, mapId }`. A list that is
 * empty needs no run; one that is more than the chest holds, or that no map gives, is not complete.
 */
export function stockFor({
  take,
  candidates,
  practice,
  maxRuns = MAX_STOCK_RUNS,
}) {
  const none = { runs: 0, complete: false, chest: {}, mapId: null };
  if (take.length === 0) return { ...none, complete: true };
  if (total(take) > BALANCE.chestCapacity) return none;
  const attempts = candidates.map((candidate) =>
    stockOnMap({ take, candidate, practice, maxRuns }),
  );
  if (attempts.length === 0) return none;
  return attempts.reduce((best, attempt) =>
    betterStock(attempt, best, take) ? attempt : best,
  );
}

/** The practice a first solving pays: the median of each skill over the solved results, the skills with none left out. */
function medianPractice(solved) {
  const median = {};
  for (const id of Object.keys(SKILLS)) {
    const sorted = solved
      .map((result) => result.practice[id] ?? 0)
      .sort((a, b) => a - b);
    const value = Math.round(quantile(sorted, 0.5) ?? 0);
    if (value > 0) median[id] = value;
  }
  return median;
}

/** The practices summed skill by skill. */
function sumPractice(practices) {
  const sum = {};
  for (const practice of practices)
    for (const [id, value] of Object.entries(practice))
      sum[id] = (sum[id] ?? 0) + value;
  return sum;
}

/** The best of the rows: the largest share solved, then the fewer median minutes, then the earlier. */
function bestOf(rows) {
  const minutes = (row) => row.solveMedian ?? Infinity;
  return rows.reduce((best, row) =>
    row.solvedShare > best.solvedShare ||
    (row.solvedShare === best.solvedShare && minutes(row) < minutes(best))
      ? row
      : best,
  );
}

/** One reference program measured on one map from its own ranks and its own stock, with the results of the seeds. */
function measureProgram({
  mapId,
  programId,
  practiceIn,
  candidates,
  seeds,
  labels,
}) {
  const program = REFERENCE_PROGRAMS[programId];
  const skills = skillsFor(program, practiceIn);
  const stock = stockFor({
    take: program.tripPlan.take,
    candidates,
    practice: practiceIn,
  });
  const { summary, results } = sweep({
    mapId,
    program,
    seeds,
    skills,
    chest: stock.chest,
  });
  const row = {
    mapId,
    mapName: MAPS[mapId].name,
    programId,
    programLabel: labels[programId],
    runs: summary.runs,
    solvedShare: summary.solvedShare,
    solveMedian: summary.solveMinute?.median ?? null,
    deaths: summary.deaths,
    capped: summary.capped,
    stock,
  };
  return { row, results };
}

/** One map measured from what the maps before it gave: its rows and its summary. `before` holds those maps' summaries, the farthest first. */
function measureMap({ mapId, before, programIds, seeds, labels }) {
  const practiceIn = sumPractice(before.map((map) => map.practicePaid));
  const candidates = before.map((map) => ({
    mapId: map.mapId,
    program: REFERENCE_PROGRAMS[map.bestProgramId],
  }));
  const measured = programIds.map((programId) =>
    measureProgram({ mapId, programId, practiceIn, candidates, seeds, labels }),
  );
  const rows = measured.map(({ row }) => row);
  const best = bestOf(rows);
  const bestResults = measured.find(({ row }) => row === best).results;
  const summary = {
    mapId,
    mapName: MAPS[mapId].name,
    bestProgramId: best.programId,
    bestLabel: best.programLabel,
    bestShare: best.solvedShare,
    solvable: best.solvedShare >= SOLVABLE_SHARE,
    manualRuns: best.stock.runs,
    stockComplete: best.stock.complete,
    practiceIn,
    practicePaid: medianPractice(
      bestResults.filter((result) => result.outcome === "solved"),
    ),
  };
  return { rows, summary };
}

/**
 * The progression measurement: for each map of `mapIds` (the game's maps, each with the maps that open
 * it measured first) every reference program of `programIds`, on `seeds`, from the state the maps
 * before it give. Gives the `rows` of the requested maps, a row per map and program, and the `maps`
 * with their best program, whether it solves a fifth of the seeds, the manual runs its stock took, and
 * the practice the map was measured with and its first solving pays. A map the game's data lacks, and
 * a program that is no reference program, are refused before any measurement.
 */
export function measureProgression({
  mapIds = Object.keys(MAPS),
  seeds = PROGRESSION_SEEDS,
  programIds = Object.keys(REFERENCE_PROGRAMS),
} = {}) {
  for (const mapId of mapIds)
    if (!Object.hasOwn(MAPS, mapId))
      throw new Error(`progression: no map ${mapId}`);
  for (const programId of programIds)
    if (!Object.hasOwn(REFERENCE_PROGRAMS, programId))
      throw new Error(`progression: no reference program ${programId}`);
  const labels = programLabels(REFERENCE_PROGRAMS);
  const measured = new Map();
  const measure = (mapId) => {
    if (!measured.has(mapId)) {
      const before = prerequisitesOf(mapId).map(measure);
      measured.set(
        mapId,
        measureMap({
          mapId,
          before: before.map(({ summary }) => summary),
          programIds,
          seeds,
          labels,
        }),
      );
    }
    return measured.get(mapId);
  };
  const wanted = mapIds.map(measure);
  return {
    seeds: [...seeds],
    rows: wanted.flatMap(({ rows }) => rows),
    maps: wanted.map(({ summary }) => summary),
  };
}

/** The seeds as the table's header names them: a range where they run on, else the list. */
function seedsText(seeds) {
  const runsOn = seeds.every(
    (seed, index) => index === 0 || seed === seeds[index - 1] + 1,
  );
  return runsOn && seeds.length > 1
    ? `${seeds[0]}-${seeds.at(-1)}`
    : seeds.join(",");
}

/** The map check's Markdown table with its last columns, those of the earning loop, cut off. */
function withoutLoopColumns(markdown) {
  return markdown
    .split("\n")
    .map((line) =>
      line.startsWith("| ")
        ? `| ${line.slice(2, -2).split(" | ").slice(0, -LOOP_COLUMN_COUNT).join(" | ")} |`
        : line,
    )
    .join("\n");
}

/** What a map's stock took, in words that name no item. */
function stockText(map) {
  const runs =
    map.manualRuns === 0
      ? "no manual run"
      : `${map.manualRuns} manual run${map.manualRuns === 1 ? "" : "s"}`;
  return map.stockComplete ? runs : `${runs}, the stock not gathered in full`;
}

/**
 * The result as text: the table of the map check without its earning loop columns, a row per map and
 * program, and under it one sentence that says what each map was measured with and the number of
 * manual runs its stock took. It names no condition, action, rule, skill, branch or item.
 */
export function renderProgression({ seeds, rows, maps }) {
  const basis = { sweep: `seeds ${seedsText(seeds)}`, loop: "" };
  const table = withoutLoopColumns(
    renderTable(
      rows.map((row) => ({
        ...row,
        takenPerMapRun: null,
        putPerMapRun: null,
        deathShare: null,
      })),
      basis,
    ),
  );
  const parts = maps.map((map) => `${map.mapName}: ${stockText(map)}`);
  return `${table}\nEach map was measured with the practice and ranks from the first solvings of the maps before it, each by that map's best program, and with the stock its program takes, brought out by manual runs of solved maps (${parts.join("; ")}).\n`;
}
