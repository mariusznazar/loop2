// The progression measurement of the balance instrument: whether each map of the game can be solved
// with what the maps before it gave, and no earning loop (D-438). For each map it builds the state the
// map is measured from through the game's own functions, and measures every reference program from it
// on the seeds of the measurement, the map counting by its best program, which is the program that
// solves the largest share of the seeds. The state is the practice that the first solvings of the maps
// before it pay, each by the best program of that map (the median of its solved map runs, summed along
// the chain of maps that open the map), added to the practice the caller gives the character before
// them, none by default; the ranks of the branches the measured program needs, bought from that
// practice with the game's `buyBranch` as far as its points reach; and the stock of the program's take
// list, brought out by manual runs of the solved maps before it, each run with the best program of
// the map it is made on, with the game's `send` and `advanceMinutes`, so that the chest
// takes and keeps by the rules of the game, counted. The character that brings out the stock and the
// one measured buy ranks from the same practice, so its points are spent twice. Each map run of the
// measurement itself is stepped by the engine, so it ends as it ends in the game (invariant
// instrument-game-agreement). The result is data, and its table names no program by more than a
// label (D-428); the file is written by `balance/cli.mjs` alone. A map that another map opens is also
// measured with the character built for that opener, the practice and the stock of the maps before
// the opener, so that the map and its opener are compared with one character on both (D-448); the
// measurement of the map from its own chain of openers stays as it is.

import { BALANCE } from "../dist/browser/sim/data/balance.js";
import { BRANCHES, SKILLS } from "../dist/browser/sim/data/skills.js";
import { MAPS } from "../dist/browser/sim/data/maps.js";
import { advanceMinutes, end, send } from "../dist/browser/sim/game.js";
import { buyBranch } from "../dist/browser/sim/skills.js";
import { REFERENCE_PROGRAMS } from "../tests/sim/reference-programs.mjs";
import {
  LOOP_COLUMN_COUNT,
  lineOf,
  plain,
  renderTable,
  share,
} from "./check-map.mjs";
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
/** The seeds of the measurement a map's best program solves, at the fewest, for the map to count as solvable (D-438). */
export const SOLVABLE_SEEDS = 1;

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
function stockOnMap({ take, candidate, practice, gear, maxRuns }) {
  const skills = skillsFor(candidate.program, practice);
  let state = makeState({
    program: candidate.program,
    skills,
    gear,
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
  gear = {},
  maxRuns = MAX_STOCK_RUNS,
}) {
  const none = { runs: 0, complete: false, chest: {}, mapId: null };
  if (take.length === 0) return { ...none, complete: true };
  if (total(take) > BALANCE.chestCapacity) return none;
  const attempts = candidates.map((candidate) =>
    stockOnMap({ take, candidate, practice, gear, maxRuns }),
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
  gear,
}) {
  const program = REFERENCE_PROGRAMS[programId];
  const skills = skillsFor(program, practiceIn);
  const stock = stockFor({
    take: program.tripPlan.take,
    candidates,
    practice: practiceIn,
    gear,
  });
  const { summary, results } = sweep({
    mapId,
    program,
    seeds,
    skills,
    gear,
    chest: stock.chest,
  });
  const row = {
    mapId,
    mapName: MAPS[mapId].name,
    programId,
    programLabel: labels[programId],
    runs: summary.runs,
    solved: summary.solved,
    solvedShare: summary.solvedShare,
    solveMedian: summary.solveMinute?.median ?? null,
    deaths: summary.deaths,
    capped: summary.capped,
    stock,
  };
  return { row, results };
}

/** The candidates a map is measured with: each of the maps before it, with its best program. `before` holds their summaries. */
function candidatesOf(before) {
  return before.map((map) => ({
    mapId: map.mapId,
    program: REFERENCE_PROGRAMS[map.bestProgramId],
  }));
}

/** Every program of `programIds` measured on one map from `practiceIn` and `candidates`: the rows, and the best of them with its results. */
function measureFrom({
  mapId,
  practiceIn,
  candidates,
  programIds,
  seeds,
  labels,
  gear,
}) {
  const measured = programIds.map((programId) =>
    measureProgram({
      mapId,
      programId,
      practiceIn,
      candidates,
      seeds,
      labels,
      gear,
    }),
  );
  const best = bestOf(measured.map(({ row }) => row));
  const bestResults = measured.find(({ row }) => row === best).results;
  return { rows: measured.map(({ row }) => row), best, bestResults };
}

/**
 * One map measured from what the maps before it gave: its rows and its summary. `before` holds those
 * maps' summaries, the farthest first, and `practice` the practice the character held before them.
 */
function measureMap({
  mapId,
  before,
  practice,
  programIds,
  seeds,
  labels,
  gear,
}) {
  const practiceIn = sumPractice([
    practice,
    ...before.map((map) => map.practicePaid),
  ]);
  const { rows, best, bestResults } = measureFrom({
    mapId,
    practiceIn,
    candidates: candidatesOf(before),
    programIds,
    seeds,
    labels,
    gear,
  });
  const summary = {
    mapId,
    mapName: MAPS[mapId].name,
    bestProgramId: best.programId,
    bestLabel: best.programLabel,
    bestShare: best.solvedShare,
    solvable: best.solved >= SOLVABLE_SEEDS,
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
 * The comparison of a map with the map that opens it (D-448): the opener, its best share, the best
 * share of the map measured with the character built for the opener, and whether the map is harder.
 * `measured` holds the maps measured so far, the opener and the maps before it among them. A map that
 * no map opens gives no comparison, so its fields are null.
 */
function withOpenerOf({ mapId, measured, programIds, seeds, labels, gear }) {
  const opener = MAPS[mapId].opensAfter;
  if (opener === undefined)
    return {
      opener: null,
      openerName: null,
      openerBestShare: null,
      withOpenerShare: null,
      harder: null,
    };
  const { summary: openerSummary } = measured.get(opener);
  const before = prerequisitesOf(opener).map((id) => measured.get(id).summary);
  const { best } = measureFrom({
    mapId,
    practiceIn: openerSummary.practiceIn,
    candidates: candidatesOf(before),
    programIds,
    seeds,
    labels,
    gear,
  });
  return {
    opener,
    openerName: MAPS[opener].name,
    openerBestShare: openerSummary.bestShare,
    withOpenerShare: best.solvedShare,
    harder: best.solvedShare < openerSummary.bestShare,
  };
}

/**
 * The progression measurement: for each map of `mapIds` (the game's maps, each with the maps that open
 * it measured first) every reference program of `programIds`, on `seeds`, from the state the maps
 * before it give, the character of each run, stock runs included, starting with the `gear` given and
 * holding the `practice` given ({ skillId: n }) before the maps before it pay theirs, none where it is
 * not given, as a character the game creates holds none. Gives the `rows` of the requested maps, a
 * row per map and program, and the `maps` with their best program, whether it solves one seed or
 * more, the manual runs its stock took, the practice the map was measured with and its first solving
 * pays, and its comparison with the map that opens it (D-448): that map's identifier as `opener` and
 * its name as `openerName`, its best share as `openerBestShare`, the best share of the map measured
 * with the opener's character as `withOpenerShare`, and `harder`, whether that share is the smaller,
 * each null where no map opens the map. A map the game's data lacks, and a program that is no
 * reference program, are refused before any measurement.
 */
export function measureProgression({
  mapIds = Object.keys(MAPS),
  seeds = PROGRESSION_SEEDS,
  programIds = Object.keys(REFERENCE_PROGRAMS),
  gear = {},
  practice = {},
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
      const own = measureMap({
        mapId,
        before: before.map(({ summary }) => summary),
        practice,
        programIds,
        seeds,
        labels,
        gear,
      });
      const comparison = withOpenerOf({
        mapId,
        measured,
        programIds,
        seeds,
        labels,
        gear,
      });
      measured.set(mapId, {
        rows: own.rows,
        summary: { ...own.summary, ...comparison },
      });
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

/** A yes or no as the table shows it, or a dash where the answer does not apply. */
function yesOrNo(value) {
  if (value === null) return "—";
  return value ? "yes" : "no";
}

/**
 * The table of the maps' comparison with their openers: a row per requested map, its best share, whether
 * it can be solved, its opener, the opener's best share, the map's best share with the opener's
 * character, and whether it is harder than its opener. A map that no map opens has dashes in the four
 * cells of the opener.
 */
function openerTable(maps, basis) {
  const header = [
    "Map",
    `Best share (${basis.sweep})`,
    "Can be solved",
    "Opener",
    "Opener's best share",
    "Best share with the opener's character",
    "Harder than the opener",
  ];
  const lines = [
    header,
    header.map(() => "---"),
    ...maps.map((map) => [
      map.mapName,
      share(map.bestShare),
      yesOrNo(map.solvable),
      plain(map.openerName),
      share(map.openerBestShare),
      share(map.withOpenerShare),
      yesOrNo(map.harder),
    ]),
  ];
  return `${lines.map(lineOf).join("\n")}\n`;
}

/**
 * The result as text: the table of the map check without its earning loop columns, a row per map and
 * program, and under it one sentence that says what each map was measured with and the number of
 * manual runs its stock took; then a table with a row per map, its opener and whether it is harder
 * (D-448). It names no condition, action, rule, skill, branch or item.
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
  const sentence = `Each map was measured with the practice and ranks from the first solvings of the maps before it, each by that map's best program, and with the stock its program takes, brought out by manual runs of solved maps (${parts.join("; ")}).\n`;
  return `${table}\n${sentence}\n${openerTable(maps, basis)}`;
}
