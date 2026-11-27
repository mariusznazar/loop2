import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import { ACTIONS } from "../../dist/browser/sim/data/actions.js";
import { CONDITIONS } from "../../dist/browser/sim/data/conditions.js";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import { chestOf, measureRow, renderTable } from "../../balance/check-map.mjs";
import { runCommand } from "../../balance/cli.mjs";
import {
  buildGear,
  buildSkills,
  seedRange,
  sweep,
} from "../../balance/engine.mjs";
import { loopBalance } from "../../balance/loop.mjs";
import { applyOverlay, readOverlay } from "../../balance/overlay.mjs";
import {
  forestBest,
  forestDeepBest,
  forestLoopWithStock,
  REFERENCE_PROGRAMS,
} from "../sim/reference-programs.mjs";

// The map check of the balance instrument: one table with a row per map and program, its columns
// and its figures. The table holds no text of a program's rules, and each row is the measurement of
// its map and program, checked on a few seeds where a full run would take minutes.

/**
 * Runs `work` with a renewal of one use longer than any run, so no spent use returns in it and the
 * spent start differs from the full start for a death with practice; the overlay is restored after.
 */
function withNoReturn(work) {
  const restore = applyOverlay({
    BALANCE: { resurrectionRenewalRealMinutes: 1e9 },
  });
  try {
    return work();
  } finally {
    restore();
  }
}

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
    programLabel: "P1",
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
    programLabel: "P2",
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

// decision: D-428 "For each game map an overlay adds and each reference program, the map check of the balance instrument prints the share of map runs solved on the seeds 1 to 500, the median game minutes of the solved map runs, the failures by cause and the balance of the earning loop"
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
    "P1",
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
    "P2",
    "0 %",
    "—",
    "none",
    "0",
    "—",
    "—",
    "—",
  ]);
});

// decision: D-428 "The table holds no condition, action or rule of any program"
test("the table holds no text of a program's rules: no identifier of a reference program, and no condition, action or group name of the program appears in it", () => {
  const row = measureRow({
    mapId: "forest",
    programLabel: "P4",
    program: forestBest,
    skills: buildSkills(),
    sweepSeeds: seedRange(1, 3),
    loopSeeds: seedRange(1, 2),
    hours: 1,
  });
  const table = renderTable([row], BASIS);
  assert.ok(
    cellsOf(table)[1].includes("P4"),
    "the row of the program is in the table under its label",
  );
  for (const id of Object.keys(REFERENCE_PROGRAMS))
    assert.ok(!table.includes(id), `the table holds the identifier ${id}`);
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
  // forestDeepBest takes eight sticks and seven berries from the chest, so a row that loses the chest
  // of its sweep or of its loop measures another program than the one the table names.
  const chest = { stick: 8, berry: 7 };
  const row = measureRow({
    mapId: "forestDeep",
    programLabel: "P10",
    program: forestDeepBest,
    skills,
    sweepSeeds,
    loopSeeds,
    hours: 2,
  });
  const { summary } = sweep({
    mapId: "forestDeep",
    program: forestDeepBest,
    seeds: sweepSeeds,
    skills,
    chest,
  });
  const balance = loopBalance({
    mapId: "forestDeep",
    program: forestDeepBest,
    seeds: loopSeeds,
    hours: 2,
    skills,
    chest,
    resurrectionReady: true,
  });
  assert.deepEqual(chestOf(forestDeepBest), chest);
  assert.equal(row.mapName, MAPS.forestDeep.name);
  assert.equal(row.programLabel, "P10");
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

// decision: D-428 "The earning loop of the map check and the command of the loop start with the full number of uses of the resurrection"
test("the earning loop of a row starts with the full number of uses of the resurrection, which changes its balance for this program and these seeds", () => {
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
  const ready = withNoReturn(() => loopOf(true));
  const spent = withNoReturn(() => loopOf(false));
  assert.notEqual(
    ready.deathShare,
    spent.deathShare,
    "precondition: the flag changes the balance",
  );
  const row = withNoReturn(() =>
    measureRow({
      mapId: "forest",
      programLabel: "P6",
      program: forestLoopWithStock,
      skills,
      sweepSeeds: seedRange(1, 2),
      loopSeeds,
      hours: 12,
    }),
  );
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
      programLabel: "P4",
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

// decision: D-428 "It names each program by a label, `P1`, `P2` and so on, the program's place in the whole list of reference programs that the command `programs` prints, and never by the program's identifier"
test("the check names each program by its number in the whole list of reference programs, whatever rows the flags narrow to, and prints no identifier", () => {
  const options = {
    practice: {},
    ranks: {},
    out: undefined,
    overlays: [overlayFile("wasteland.json")],
    programs: ["forestDeepBest"],
  };
  const { printed } = runCommand("check-map", options);
  const [, row] = cellsOf(printed);
  assert.equal(row[0], "Pustkowie");
  assert.equal(row[1], "P10");
  for (const id of Object.keys(REFERENCE_PROGRAMS))
    assert.ok(!printed.includes(id), `the table holds the identifier ${id}`);
});

test("the earning loop of a row starts with the gear given to the check, so its loop columns are those of a loop started with that gear", () => {
  // On Las - głębiej the best program fights the wolves, so a stick in the main hand from the start
  // changes how its earning loop goes; the loop columns of a row with the stick are then those of a
  // loop started with it, and not those of a loop started with an empty hand.
  const skills = buildSkills({ practice: { smallItemGathering: 80 } });
  const loopSeeds = seedRange(1, 4);
  const loopOf = (gear) =>
    loopBalance({
      mapId: "forestDeep",
      program: forestDeepBest,
      seeds: loopSeeds,
      hours: 12,
      skills,
      gear,
      chest: chestOf(forestDeepBest),
      resurrectionReady: true,
    }).summary;
  const columns = ({ takenPerMapRun, putPerMapRun, deathShare }) => ({
    takenPerMapRun,
    putPerMapRun,
    deathShare,
  });
  const gear = buildGear({ mainHand: "stick" });
  const withStick = columns(loopOf(gear));
  assert.notDeepEqual(
    withStick,
    columns(loopOf({})),
    "precondition: the stick in the main hand changes this loop's columns",
  );
  const row = measureRow({
    mapId: "forestDeep",
    programLabel: "P10",
    program: forestDeepBest,
    skills,
    gear,
    sweepSeeds: seedRange(1, 2),
    loopSeeds,
    hours: 12,
  });
  assert.deepEqual(columns(row), withStick);
});
