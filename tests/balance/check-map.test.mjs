import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import { ACTIONS } from "../../dist/browser/sim/data/actions.js";
import { CONDITIONS } from "../../dist/browser/sim/data/conditions.js";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import { chestOf, measureRow, renderTable } from "../../balance/check-map.mjs";
import { runCommand } from "../../balance/cli.mjs";
import { buildSkills, seedRange, sweep } from "../../balance/engine.mjs";
import { loopBalance } from "../../balance/loop.mjs";
import { applyOverlay, readOverlay } from "../../balance/overlay.mjs";
import { forestBest, forestLoopWithStock } from "../sim/reference-programs.mjs";

// The map check of the balance instrument: one table with a row per map and program, its columns
// and its figures. The table holds no text of a program's rules, and each row is the measurement of
// its map and program, checked on a few seeds where a full run would take minutes.

const BASIS = { sweep: "seeds 1-500", loop: "24 real hours, seeds 1-100" };

function overlayFile(name) {
  return fileURLToPath(
    new URL(`../../balance/overlays/${name}`, import.meta.url),
  );
}

/** Made-up results of two rows, with each figure a literal, so the table is checked on its own. */
const MADE_UP_ROWS = [
  {
    mapId: "wasteland",
    mapName: "Pustkowie",
    programId: "demoAlpha",
    runs: 500,
    solvedShare: 71.8,
    solveMedian: 754,
    deaths: {
      cold: { n: 141, minute: null },
      wolf: { n: 3, minute: null },
    },
    capped: 2,
    takenPerMapRun: 1.25,
    putPerMapRun: 0.5,
    deathShare: 12.5,
  },
  {
    mapId: "deadZone",
    mapName: "Martwa strefa",
    programId: "demoBeta",
    runs: 500,
    solvedShare: 0,
    solveMedian: null,
    deaths: {},
    capped: 0,
    takenPerMapRun: null,
    putPerMapRun: null,
    deathShare: null,
  },
];

/** The cells of each line of a Markdown table, the separator line left out. */
function cellsOf(table) {
  return table
    .trim()
    .split("\n")
    .filter((line) => !/^\|\s*-/.test(line))
    .map((line) =>
      line
        .slice(1, -1)
        .split(" | ")
        .map((cell) => cell.trim()),
    );
}

test("the table has one column for each figure of the check and one row per map and program, the map by its name in the game's data", () => {
  const [header, first, second] = cellsOf(renderTable(MADE_UP_ROWS, BASIS));
  assert.equal(header.length, 9);
  const names = [
    "Map",
    "Program",
    "Solved",
    "Median game minutes",
    "Deaths by cause",
    "Runs at the cap",
    "taken",
    "put in",
    "ended in death",
  ];
  names.forEach((name, column) =>
    assert.ok(
      header[column].includes(name),
      `column ${column}: ${header[column]}`,
    ),
  );
  assert.deepEqual(first, [
    "Pustkowie",
    "demoAlpha",
    "71.8 %",
    "754",
    "cold 141, wolf 3",
    "2",
    "1.25",
    "0.5",
    "12.5 %",
  ]);
  assert.deepEqual(second, [
    "Martwa strefa",
    "demoBeta",
    "0 %",
    "—",
    "none",
    "0",
    "—",
    "—",
    "—",
  ]);
});

test("the table holds no text of a program's rules: no condition, action or group name of the program appears in it", () => {
  const row = measureRow({
    mapId: "forest",
    programId: "forestBest",
    program: forestBest,
    skills: buildSkills(),
    sweepSeeds: seedRange(1, 3),
    loopSeeds: seedRange(1, 2),
    hours: 1,
  });
  const table = renderTable([row], BASIS);
  assert.ok(
    table.includes("forestBest"),
    "the row of the program is in the table",
  );
  const words = [];
  for (const group of forestBest.groups) {
    words.push(group.name);
    if (group.condition) words.push(CONDITIONS[group.condition.kind].label);
    for (const { condition, action } of group.rules) {
      words.push(CONDITIONS[condition.kind].label);
      words.push(ACTIONS[action.kind].label);
    }
  }
  for (const word of words.filter((text) => text.length >= 5))
    assert.ok(!table.includes(word), `the table holds "${word}"`);
});

test("a row of one map and one program with few seeds comes from the measurement of that map and program", () => {
  const skills = buildSkills();
  const sweepSeeds = seedRange(1, 4);
  const loopSeeds = seedRange(1, 2);
  const row = measureRow({
    mapId: "forest",
    programId: "forestBest",
    program: forestBest,
    skills,
    sweepSeeds,
    loopSeeds,
    hours: 2,
  });
  const { summary } = sweep({
    mapId: "forest",
    program: forestBest,
    seeds: sweepSeeds,
    skills,
    chest: { stick: 8, berry: 7 },
  });
  const balance = loopBalance({
    mapId: "forest",
    program: forestBest,
    seeds: loopSeeds,
    hours: 2,
    skills,
    chest: { stick: 8, berry: 7 },
    resurrectionReady: true,
  });
  assert.equal(row.mapName, MAPS.forest.name);
  assert.equal(row.programId, "forestBest");
  assert.equal(row.runs, 4);
  assert.equal(row.solvedShare, summary.solvedShare);
  assert.equal(row.solveMedian, summary.solveMinute?.median ?? null);
  assert.deepEqual(row.deaths, summary.deaths);
  assert.equal(row.capped, summary.capped);
  assert.equal(row.takenPerMapRun, balance.summary.takenPerMapRun);
  assert.equal(row.putPerMapRun, balance.summary.putPerMapRun);
  assert.equal(row.deathShare, balance.summary.deathShare);
  assert.equal(Math.round((row.runs * row.solvedShare) / 100), summary.solved);
});

test("the earning loop of a row starts with the resurrection ready, which changes its balance for this program and these seeds", () => {
  const skills = buildSkills({ practice: { smallItemGathering: 80 } });
  const loopSeeds = seedRange(1, 10);
  const loopOf = (resurrectionReady) =>
    loopBalance({
      mapId: "forest",
      program: forestLoopWithStock,
      seeds: loopSeeds,
      hours: 12,
      skills,
      chest: chestOf(forestLoopWithStock),
      resurrectionReady,
    }).summary;
  const ready = loopOf(true);
  const spent = loopOf(false);
  assert.notEqual(
    ready.deathShare,
    spent.deathShare,
    "precondition: the flag changes the balance",
  );
  const row = measureRow({
    mapId: "forest",
    programId: "forestLoopWithStock",
    program: forestLoopWithStock,
    skills,
    sweepSeeds: seedRange(1, 2),
    loopSeeds,
    hours: 12,
  });
  assert.equal(row.takenPerMapRun, ready.takenPerMapRun);
  assert.equal(row.putPerMapRun, ready.putPerMapRun);
  assert.equal(row.deathShare, ready.deathShare);
});

test("a map an overlay adds is measured under its name in the game's data, and the overlay is restored after the measurement", () => {
  const overlay = readOverlay(overlayFile("wasteland.json"));
  const restore = applyOverlay(overlay);
  try {
    const row = measureRow({
      mapId: "wasteland",
      programId: "forestBest",
      program: forestBest,
      skills: buildSkills(),
      sweepSeeds: seedRange(1, 2),
      loopSeeds: seedRange(1, 1),
      hours: 1,
    });
    assert.equal(row.mapName, "Pustkowie");
    assert.equal(row.runs, 2);
  } finally {
    restore();
  }
  assert.equal(MAPS.wasteland, undefined);
});

test("the check refuses no overlay, a map the overlays do not add and a program that is no reference program, before any measurement", () => {
  const wasteland = overlayFile("wasteland.json");
  const base = { practice: {}, ranks: {}, out: undefined };
  assert.throws(
    () => runCommand("check-map", { ...base, overlays: [] }),
    /--overlay/,
  );
  assert.throws(
    () =>
      runCommand("check-map", {
        ...base,
        overlays: [wasteland],
        maps: ["forest"],
      }),
    /forest/,
  );
  assert.throws(
    () =>
      runCommand("check-map", {
        ...base,
        overlays: [wasteland],
        programs: ["noSuchProgram"],
      }),
    /noSuchProgram/,
  );
  assert.equal(MAPS.wasteland, undefined);
});
