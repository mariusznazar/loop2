// The map check of the balance instrument: for each map an overlay adds and each reference program,
// the share solved on seeds 1-500, the median game minutes of the solved map runs, the failures by
// cause, and the balance of the earning loop over 24 real hours on seeds 1-100, the loop starting
// with the full number of uses of the resurrection. The table is Markdown and holds no condition,
// action or rule of any program (D-428); it names a program by a neutral label, because an
// identifier can state the rules of its program in other words, and the key from label to
// identifier is what the `programs` command prints. A program's chest is the one its take list
// asks, so a program is measured with what it brings.

import { MAPS } from "../dist/browser/sim/data/maps.js";
import { seedRange, sweep } from "./engine.mjs";
import { loopBalance } from "./loop.mjs";

/** The seeds of the sweep of each row: the table's measure of how often a program solves a map. */
export const CHECK_SWEEP_SEEDS = seedRange(1, 500);
/** The seeds of the earning loop of each row. */
export const CHECK_LOOP_SEEDS = seedRange(1, 100);
/** The real hours the earning loop of each row runs. */
export const CHECK_LOOP_HOURS = 24;
/** The seeds and hours the headers of the table name, so a reader knows what the figures stand on. */
export const CHECK_BASIS = {
  sweep: `seeds ${CHECK_SWEEP_SEEDS[0]}-${CHECK_SWEEP_SEEDS.at(-1)}`,
  loop: `${CHECK_LOOP_HOURS} real hours, seeds ${CHECK_LOOP_SEEDS[0]}-${CHECK_LOOP_SEEDS.at(-1)}`,
};

/** The chest a program's take list asks: each item of the list with the count the list gives it. */
export function chestOf(program) {
  return Object.fromEntries(
    program.tripPlan.take.map(({ item, count }) => [item, count]),
  );
}

/**
 * The row of one map and one program, which the row names by its neutral label: the sweep's figures
 * and the earning loop's balance, from the game's own simulation run through the engine. The chest
 * is the program's take list; the skills are the ones given, a new character's where none are, and
 * the gear is the one given to the sweep's character, empty where none is.
 */
export function measureRow({
  mapId,
  programLabel,
  program,
  skills,
  gear = {},
  sweepSeeds = CHECK_SWEEP_SEEDS,
  loopSeeds = CHECK_LOOP_SEEDS,
  hours = CHECK_LOOP_HOURS,
}) {
  const chest = chestOf(program);
  const { summary } = sweep({
    mapId,
    program,
    seeds: sweepSeeds,
    skills,
    gear,
    chest,
  });
  const balance = loopBalance({
    mapId,
    program,
    seeds: loopSeeds,
    hours,
    skills,
    chest,
    resurrectionReady: true,
  }).summary;
  return {
    mapId,
    mapName: MAPS[mapId].name,
    programLabel,
    runs: summary.runs,
    solvedShare: summary.solvedShare,
    solveMedian: summary.solveMinute?.median ?? null,
    deaths: summary.deaths,
    capped: summary.capped,
    takenPerMapRun: balance.takenPerMapRun,
    putPerMapRun: balance.putPerMapRun,
    deathShare: balance.deathShare,
  };
}

/** How many of the table's last columns belong to the earning loop: pieces taken, pieces put in, deaths. */
export const LOOP_COLUMN_COUNT = 3;

/** The column names of the table, with the seeds and hours of the figures in the headers. */
function headerOf(basis) {
  return [
    "Map",
    "Program",
    `Solved (${basis.sweep})`,
    "Median game minutes of solved runs",
    "Deaths by cause",
    "Runs at the cap",
    `Pieces taken per map run (${basis.loop})`,
    `Pieces put in per map run (${basis.loop})`,
    `Map runs ended in death (${basis.loop})`,
  ];
}

/** A number as the table shows it, or a dash where the figure has no value. */
function plain(value) {
  return value === null ? "—" : String(value);
}

/** A share in percent as the table shows it, or a dash where the share has no value. */
function share(value) {
  return value === null ? "—" : `${value} %`;
}

/** The deaths by cause, `cold 141, wolf 3`, or `none` where no run died. */
function causesOf(deaths) {
  const text = Object.entries(deaths)
    .map(([cause, { n }]) => `${cause} ${n}`)
    .join(", ");
  return text === "" ? "none" : text;
}

/** A row as the table's cells, in the order of the header. */
function cellsOf(row) {
  return [
    row.mapName,
    row.programLabel,
    share(row.solvedShare),
    plain(row.solveMedian),
    causesOf(row.deaths),
    plain(row.capped),
    plain(row.takenPerMapRun),
    plain(row.putPerMapRun),
    share(row.deathShare),
  ];
}

/** A line of the table: the cells with a pipe in them escaped, between the pipes. */
function lineOf(cells) {
  return `| ${cells.map((cell) => String(cell).replaceAll("|", "\\|")).join(" | ")} |`;
}

/** The Markdown table of the rows, one line per row in the order given, ending with a line break. */
export function renderTable(rows, basis = CHECK_BASIS) {
  const header = headerOf(basis);
  const separator = header.map(() => "---");
  const lines = [
    lineOf(header),
    lineOf(separator),
    ...rows.map((row) => lineOf(cellsOf(row))),
  ];
  return `${lines.join("\n")}\n`;
}
