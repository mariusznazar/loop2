import assert from "node:assert/strict";
import { test } from "node:test";
import { ACTIONS } from "../../dist/browser/sim/data/actions.js";
import { BALANCE } from "../../dist/browser/sim/data/balance.js";
import { CONDITIONS } from "../../dist/browser/sim/data/conditions.js";
import { ITEMS } from "../../dist/browser/sim/data/items.js";
import { RESOURCES } from "../../dist/browser/sim/data/resources.js";
import { BRANCHES, SKILLS } from "../../dist/browser/sim/data/skills.js";
import { buildSkills, seedRange, sweep } from "../../balance/engine.mjs";
import {
  MAX_STOCK_RUNS,
  PROGRESSION_SEEDS,
  SOLVABLE_SEEDS,
  measureProgression,
  neededBranches,
  renderProgression,
  skillsFor,
  stockFor,
} from "../../balance/progression.mjs";
import {
  REFERENCE_PROGRAMS,
  forestBest,
  forestDeepSettledPatrol,
  forestLoopWithStock,
  forestSettledPatrol,
} from "../sim/reference-programs.mjs";

// The progression measurement of the balance instrument: the state each map is measured from, built
// through the game's own functions from what the maps before it gave, and the table of its result.
// Each measurement runs on a few seeds and a few programs, where the real one takes minutes.

const SEEDS = seedRange(1, 8);
const FEW = ["forestBest", "forestLoopWithStock", "emptyProgram"];

/** The median of the numbers as a person counts it, a middle pair taken as its rounded mean. */
function medianOf(numbers) {
  const sorted = [...numbers].sort((a, b) => a - b);
  const middle = sorted.length / 2;
  return Number.isInteger(middle)
    ? Math.round((sorted[middle - 1] + sorted[middle]) / 2)
    : sorted[Math.floor(middle)];
}

/** The cells of each line of a Markdown table, the separator line left out. */
function cellsOf(table) {
  return table
    .split("\n")
    .filter((line) => line.startsWith("|") && !/^\|\s*-/.test(line))
    .map((line) =>
      line
        .slice(1, -1)
        .split(" | ")
        .map((cell) => cell.trim()),
    );
}

test("the measurement's seeds are 1 to 500, and a map counts as solvable from one of them", () => {
  assert.equal(PROGRESSION_SEEDS.length, 500);
  assert.equal(PROGRESSION_SEEDS[0], 1);
  assert.equal(PROGRESSION_SEEDS.at(-1), 500);
  assert.equal(SOLVABLE_SEEDS, 1);
});

test("a program needs the branch that opens an action it uses, and no other", () => {
  assert.deepEqual(neededBranches(forestSettledPatrol), ["patrol"]);
  assert.deepEqual(neededBranches(forestBest), []);
});

test("the ranks of the branches a program needs are bought as far as the practice's points reach, and no rank of any other branch", () => {
  // Three levels of gathering are 160 practice and the branch costs three points.
  const reached = skillsFor(forestSettledPatrol, { smallItemGathering: 160 });
  assert.equal(reached.smallItemGathering.ranks.patrol, 1);
  assert.equal(reached.smallItemGathering.practice, 160);
  const short = skillsFor(forestSettledPatrol, { smallItemGathering: 159 });
  assert.equal(short.smallItemGathering.ranks.patrol ?? 0, 0);
  const other = skillsFor(forestBest, { smallItemGathering: 160 });
  for (const skill of Object.values(other))
    assert.deepEqual(
      skill.ranks,
      {},
      "a program that needs no branch buys none",
    );
  assert.equal(other.smallItemGathering.practice, 160);
});

test("the stock of a take list is brought out by manual runs of a solved map, counted, and stays inside the chest", () => {
  const take = [
    { item: "stick", count: 8 },
    { item: "berry", count: 7 },
  ];
  const candidates = [{ mapId: "forestEdge", program: forestBest }];
  const stock = stockFor({ take, candidates, practice: {} });
  assert.equal(stock.complete, true);
  assert.ok(stock.runs >= 1, "a chest of a new account holds none of it");
  assert.ok(stock.runs < MAX_STOCK_RUNS);
  assert.equal(stock.mapId, "forestEdge");
  assert.ok(stock.chest.stick >= 8 && stock.chest.berry >= 7);
  const pieces = Object.values(stock.chest).reduce((sum, n) => sum + n, 0);
  assert.ok(pieces <= BALANCE.chestCapacity);
  assert.deepEqual(stockFor({ take, candidates, practice: {} }), stock);
});

test("an empty take list needs no run, and one the chest cannot hold or the maps do not give is not complete", () => {
  const practice = {};
  const candidates = [{ mapId: "forestEdge", program: forestBest }];
  assert.deepEqual(stockFor({ take: [], candidates, practice }), {
    runs: 0,
    complete: true,
    chest: {},
    mapId: null,
  });
  const tooMany = stockFor({
    take: [{ item: "stick", count: 61 }],
    candidates,
    practice,
  });
  assert.equal(tooMany.complete, false);
  assert.equal(tooMany.runs, 0);
  // Skraj lasu has no moss, so no run of it brings any out.
  const absent = stockFor({
    take: [{ item: "moss", count: 5 }],
    candidates,
    practice,
    maxRuns: 4,
  });
  assert.equal(absent.complete, false);
  assert.equal(absent.runs, 4);
  const none = stockFor({
    take: [{ item: "stick", count: 8 }],
    candidates: [],
    practice,
  });
  assert.equal(none.complete, false);
  assert.equal(none.runs, 0);
});

test("a map is measured with the median practice of the first solvings of the maps before it, each by that map's best program", () => {
  const { maps } = measureProgression({
    mapIds: ["forest"],
    seeds: SEEDS,
    programIds: ["forestBest", "emptyProgram"],
  });
  assert.equal(maps.length, 1);
  const [forest] = maps;
  assert.equal(forest.mapId, "forest");
  // forestBest solves Skraj lasu and an empty program does not, so the first solving is forestBest's.
  const { results } = sweep({
    mapId: "forestEdge",
    program: forestBest,
    seeds: SEEDS,
    skills: buildSkills(),
    chest: {},
  });
  const solved = results.filter((result) => result.outcome === "solved");
  assert.ok(solved.length > 0, "precondition: some seed is solved");
  const expected = {};
  for (const id of Object.keys(SKILLS)) {
    const median = medianOf(solved.map((result) => result.practice[id] ?? 0));
    if (median > 0) expected[id] = median;
  }
  assert.deepEqual(forest.practiceIn, expected);
});

test("the practice of a later map is the sum of the first solvings of the maps before it, the farthest first", () => {
  const { maps } = measureProgression({
    mapIds: ["forest", "forestDeep"],
    seeds: SEEDS,
    programIds: ["forestBest", "forestDeepBest"],
  });
  const [forest, deep] = maps;
  assert.deepEqual(Object.keys(forest.practiceIn).length > 0, true);
  const ids = new Set([
    ...Object.keys(forest.practiceIn),
    ...Object.keys(forest.practicePaid),
    ...Object.keys(deep.practiceIn),
  ]);
  for (const id of ids)
    assert.equal(
      deep.practiceIn[id] ?? 0,
      (forest.practiceIn[id] ?? 0) + (forest.practicePaid[id] ?? 0),
      id,
    );
});

test("a map counts by its best program, and a row is its program measured from its own ranks and stock", () => {
  const { rows, maps } = measureProgression({
    mapIds: ["forestEdge", "forest"],
    seeds: SEEDS,
    programIds: FEW,
  });
  const edge = maps.find((map) => map.mapId === "forestEdge");
  assert.equal(edge.bestProgramId, "forestBest");
  assert.equal(edge.bestLabel, "P4");
  assert.equal(edge.solvable, true);
  assert.equal(edge.manualRuns, 0);
  const edgeRow = rows.find(
    (row) =>
      row.mapId === "forestEdge" && row.programId === "forestLoopWithStock",
  );
  // No map is solved before Skraj lasu, so a program that takes from the chest goes in with none of it.
  assert.equal(edgeRow.stock.complete, false);
  assert.equal(edgeRow.stock.runs, 0);

  const forest = maps.find((map) => map.mapId === "forest");
  const row = rows.find(
    (each) =>
      each.mapId === "forest" && each.programId === "forestLoopWithStock",
  );
  assert.equal(row.programLabel, "P6");
  assert.equal(row.mapName, "Las");
  assert.equal(row.runs, SEEDS.length);
  assert.equal(row.stock.complete, true);
  assert.ok(row.stock.runs >= 1);
  const { summary } = sweep({
    mapId: "forest",
    program: forestLoopWithStock,
    seeds: SEEDS,
    skills: skillsFor(forestLoopWithStock, forest.practiceIn),
    chest: row.stock.chest,
  });
  assert.equal(row.solvedShare, summary.solvedShare);
  assert.equal(row.solveMedian, summary.solveMinute?.median ?? null);
  assert.deepEqual(row.deaths, summary.deaths);
  assert.equal(row.capped, summary.capped);
  const best = rows
    .filter((each) => each.mapId === "forest")
    .reduce((top, each) => (each.solvedShare > top.solvedShare ? each : top));
  assert.equal(forest.bestShare, best.solvedShare);
});

test("a map no program solves is not solvable, whatever it is measured with", () => {
  const { maps } = measureProgression({
    mapIds: ["forestEdge"],
    seeds: SEEDS,
    programIds: ["emptyProgram"],
  });
  assert.equal(maps[0].bestShare, 0);
  assert.equal(maps[0].solvable, false);
});

test("a map is also measured with the character of the map that opens it, and is harder where its best share is the smaller", () => {
  const { maps } = measureProgression({
    mapIds: ["forest", "forestEdge"],
    seeds: SEEDS,
    programIds: FEW,
  });
  const forest = maps.find((map) => map.mapId === "forest");
  const edge = maps.find((map) => map.mapId === "forestEdge");
  assert.equal(forest.opener, "forestEdge");
  assert.equal(forest.openerBestShare, edge.bestShare);
  // Skraj lasu opens no map, so its character is a new one: no practice and no stock.
  const shares = FEW.map(
    (programId) =>
      sweep({
        mapId: "forest",
        program: REFERENCE_PROGRAMS[programId],
        seeds: SEEDS,
        skills: buildSkills(),
        chest: {},
      }).summary.solvedShare,
  );
  assert.equal(forest.withOpenerShare, Math.max(...shares));
  assert.equal(forest.harder, forest.withOpenerShare < edge.bestShare);
  assert.equal(edge.opener, null);
  assert.equal(edge.withOpenerShare, null);
  assert.equal(edge.harder, null);
});

// Catches the comparison measured without the practice the opener was measured with, and without the
// stock that the maps before the opener give. The practice enters a measured run only through the
// ranks of a branch that opens an action, and no opener of the game's maps holds the practice that buys
// one, so the character starts here with a made-up practice of gathering, 160: its three levels give
// the three points of the branch the patrol program needs.
// decision: D-448 "A map is harder than the map that opens it: measured with one character on both maps — the one the balance instrument's mode `progression` builds for the map that opens it, from what the maps before that one gave —"
test("a map whose opener stands after other maps is compared with the practice and the stock the opener was measured with, where that practice buys a rank", () => {
  const programIds = ["forestBest", "forestDeepSettledPatrol"];
  const { rows, maps } = measureProgression({
    mapIds: ["forest", "forestDeep"],
    seeds: SEEDS,
    programIds,
    practice: { smallItemGathering: 160 },
  });
  const forest = maps.find((map) => map.mapId === "forest");
  const deep = maps.find((map) => map.mapId === "forestDeep");
  assert.equal(deep.opener, "forest");
  assert.ok(
    skillsFor(forestDeepSettledPatrol, forest.practiceIn).smallItemGathering
      .ranks.patrol >= 1,
    "precondition: the practice Las was measured with buys a rank of the branch the patrol program needs",
  );
  // The opener's character: the practice Las was measured with and, for each program, the stock its
  // row of Las brought out by manual runs of Skraj lasu, the map before Las.
  const shareWith = (programId, practice, chest) =>
    sweep({
      mapId: "forestDeep",
      program: REFERENCE_PROGRAMS[programId],
      seeds: SEEDS,
      skills: skillsFor(REFERENCE_PROGRAMS[programId], practice),
      chest,
    }).summary.solvedShare;
  const openerStock = (programId) =>
    rows.find((row) => row.mapId === "forest" && row.programId === programId)
      .stock.chest;
  const noStock = () => ({});
  const bestShare = (practice, stockOf) =>
    Math.max(
      ...programIds.map((programId) =>
        shareWith(programId, practice, stockOf(programId)),
      ),
    );
  const expected = bestShare(forest.practiceIn, openerStock);
  assert.ok(
    expected > bestShare({}, openerStock),
    "precondition: the practice of the opener changes the best share",
  );
  assert.ok(
    expected > bestShare(forest.practiceIn, noStock),
    "precondition: the stock of the maps before the opener changes the best share",
  );
  assert.equal(deep.withOpenerShare, expected);
  assert.equal(deep.openerBestShare, forest.bestShare);
});

// decision: D-438 "In one measurement of the balance instrument in its mode `progression`, a map can be solved where its best reference program, played with the character built from what the maps before it gave, solves at least one of the seeds 1 to 500"
test("a map whose best program solves one seed of eight, a share far below a fifth, is solvable", () => {
  const { rows, maps } = measureProgression({
    mapIds: ["forest"],
    seeds: seedRange(9, 16),
    programIds: ["forestNaive"],
  });
  assert.equal(
    rows[0].solved,
    1,
    "precondition: one seed of the eight is solved",
  );
  assert.equal(maps[0].bestShare, 12.5);
  assert.equal(maps[0].solvable, true);
});

test("the same measurement gives the same result twice", () => {
  const options = { mapIds: ["forest"], seeds: SEEDS, programIds: FEW };
  assert.deepEqual(measureProgression(options), measureProgression(options));
});

test("a map the game's data lacks and a program that is no reference program are refused before any measurement", () => {
  assert.throws(
    () => measureProgression({ mapIds: ["noSuchMap"], seeds: SEEDS }),
    /noSuchMap/,
  );
  assert.throws(
    () =>
      measureProgression({
        mapIds: ["forest"],
        seeds: SEEDS,
        programIds: ["noSuchProgram"],
      }),
    /noSuchProgram/,
  );
});

// decision: D-428 "The table holds no condition, action or rule of any program."
test("the table has one line per map and program with the figures of the map check but the earning loop's, and names no condition, action, rule, skill, branch or item", () => {
  const result = measureProgression({
    mapIds: ["forestEdge", "forest"],
    seeds: SEEDS,
    programIds: FEW,
  });
  const text = renderProgression(result);
  const [firstTable] = text.split("\n\n");
  const [header, ...lines] = cellsOf(firstTable);
  assert.equal(header.length, 6);
  const columns = [
    "Map",
    "Program",
    "Solved (seeds 1-8)",
    "Median game minutes of solved runs",
    "Deaths by cause",
    "Runs at the cap",
  ];
  assert.deepEqual(header, columns);
  assert.equal(lines.length, 6);
  assert.deepEqual(
    lines.map((cells) => cells.slice(0, 2)),
    [
      ["Skraj lasu", "P4"],
      ["Skraj lasu", "P6"],
      ["Skraj lasu", "P16"],
      ["Las", "P4"],
      ["Las", "P6"],
      ["Las", "P16"],
    ],
  );
  for (const cells of lines) assert.equal(cells.length, 6);
  for (const id of Object.keys(REFERENCE_PROGRAMS))
    assert.ok(!text.includes(id), `the text holds the identifier ${id}`);
  const words = [];
  for (const id of FEW) {
    for (const group of REFERENCE_PROGRAMS[id].groups) {
      words.push(group.name, CONDITIONS[group.condition.kind].label);
      for (const { condition, action } of group.rules)
        words.push(
          CONDITIONS[condition.kind].label,
          ACTIONS[action.kind].label,
        );
    }
  }
  for (const table of [ITEMS, RESOURCES, SKILLS, BRANCHES])
    for (const entry of Object.values(table)) words.push(entry.name);
  // "Program" is the table's own column, so a group named so is looked for below the header line.
  const body = text.slice(text.indexOf("\n"));
  for (const word of words.filter((each) => each.length >= 4))
    assert.ok(!body.includes(word), `the text holds "${word}"`);
});

test("one sentence under the table says with what each map was measured, the number of manual runs of the best program's stock among it", () => {
  const result = measureProgression({
    mapIds: ["forestEdge", "forest"],
    seeds: SEEDS,
    programIds: FEW,
  });
  const text = renderProgression(result);
  const [table, sentence, ...rest] = text.trimEnd().split("\n\n");
  assert.ok(table.startsWith("|"));
  assert.equal(rest.length, 1, "the second table follows the sentence");
  assert.ok(rest[0].startsWith("| Map | Best share"), rest[0]);
  assert.equal(sentence.split("\n").length, 1, "one line");
  const forest = result.maps.find((map) => map.mapId === "forest");
  const runs = forest.manualRuns;
  assert.ok(runs >= 1, "precondition: Las needs a manual run");
  assert.ok(sentence.includes(`Las: ${runs} manual run`), sentence);
  assert.ok(sentence.includes("Skraj lasu: no manual run"), sentence);
  assert.equal(sentence.match(/\./g).length, 1, "one sentence");
});

test("the second table has a row per map with its best share, whether it can be solved, its opener and the shares with the opener's character, and names no identifier", () => {
  const result = measureProgression({
    mapIds: ["forestEdge", "forest"],
    seeds: SEEDS,
    programIds: FEW,
  });
  const text = renderProgression(result);
  const [, , openers] = text.trimEnd().split("\n\n");
  const [header, ...lines] = cellsOf(openers);
  assert.deepEqual(header, [
    "Map",
    "Best share (seeds 1-8)",
    "Can be solved",
    "Opener",
    "Opener's best share",
    "Best share with the opener's character",
    "Harder than the opener",
  ]);
  const edge = result.maps.find((map) => map.mapId === "forestEdge");
  const forest = result.maps.find((map) => map.mapId === "forest");
  assert.deepEqual(lines, [
    [
      "Skraj lasu",
      `${edge.bestShare} %`,
      edge.solvable ? "yes" : "no",
      "—",
      "—",
      "—",
      "—",
    ],
    [
      "Las",
      `${forest.bestShare} %`,
      forest.solvable ? "yes" : "no",
      "Skraj lasu",
      `${edge.bestShare} %`,
      `${forest.withOpenerShare} %`,
      forest.harder ? "yes" : "no",
    ],
  ]);
  for (const id of FEW)
    assert.ok(!text.includes(id), `the text holds the identifier ${id}`);
});
