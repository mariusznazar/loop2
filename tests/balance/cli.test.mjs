import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import { ACTIONS } from "../../dist/browser/sim/data/actions.js";
import { CONDITIONS } from "../../dist/browser/sim/data/conditions.js";
import { ITEMS } from "../../dist/browser/sim/data/items.js";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import { RESOURCES } from "../../dist/browser/sim/data/resources.js";
import {
  parseArgs,
  parsePairs,
  parseSeeds,
  runCommand,
} from "../../balance/cli.mjs";
import { describeProgram, describePrograms } from "../../balance/describe.mjs";
import {
  buildSkills,
  runOnce,
  seedRange,
  sweep,
} from "../../balance/engine.mjs";
import { loopSweep } from "../../balance/loop.mjs";
import { applyOverlay } from "../../balance/overlay.mjs";
import {
  measureProgression,
  renderProgression,
} from "../../balance/progression.mjs";
import {
  REFERENCE_PROGRAMS,
  always,
  forestBest,
  forestLoopWithStock,
  gather,
  hereBelow,
  itemBelow,
  lightFire,
  program,
  temperatureBelow,
  walkTo,
} from "../sim/reference-programs.mjs";

// The command line of the balance instrument: the reading of what a person types (seeds, pairs,
// flags), the description of a program in the words the game shows the player, and each command's
// wiring to the engine, the loop, the trace and the campaign, in memory. The npm command that
// builds the game and starts the process is checked once by hand, not here (a process in a test
// would put the build into the gate).

function overlayFile(name) {
  return fileURLToPath(
    new URL(`../../balance/overlays/${name}`, import.meta.url),
  );
}

const SWEEP_FLAGS = ["--map", "forest", "--program", "forestBest"];

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

test("seeds are read as a range, a list, one number, or a list that holds ranges, and nothing else", () => {
  assert.deepEqual(parseSeeds("1-5"), [1, 2, 3, 4, 5]);
  assert.deepEqual(parseSeeds("3,7,12"), [3, 7, 12]);
  assert.deepEqual(parseSeeds("40"), [40]);
  assert.deepEqual(parseSeeds("1-3,9"), [1, 2, 3, 9]);
  assert.deepEqual(parseSeeds("7-7"), [7]);
  for (const bad of ["", "5-1", "a", "1-", "-3", "1.5", "1,,2", "1-2-3", " "])
    assert.throws(() => parseSeeds(bad), /seeds/, `"${bad}"`);
});

test("pairs are read as names with numbers, and a pair without a name, a number or a sign of equality is refused", () => {
  assert.deepEqual(parsePairs("stick=8,berry=7"), { stick: 8, berry: 7 });
  assert.deepEqual(parsePairs("keenEye=3"), { keenEye: 3 });
  assert.deepEqual(parsePairs("practice=0.5"), { practice: 0.5 });
  assert.deepEqual(parsePairs(""), {});
  assert.deepEqual(parsePairs(undefined), {});
  for (const bad of [
    "stick",
    "stick=",
    "stick=x",
    "stick=-1",
    "=3",
    "stick=1,stick=2",
    "stick=Infinity",
    "stick=1,",
  ])
    assert.throws(() => parsePairs(bad), /pair/, `"${bad}"`);
});

test("the flags of a sweep are read into numbers and tables, with the overlay files of a repeated flag and of a list in one flag in order", () => {
  const { command, options } = parseArgs([
    "sweep",
    ...SWEEP_FLAGS,
    "--seeds",
    "1-500",
    "--chest",
    "stick=8,berry=7",
    "--practice",
    "smallItemGathering=80",
    "--ranks",
    "keenEye=3",
    "--overlay",
    "a.json,b.json",
    "--overlay",
    "c.json",
    "--cap",
    "4000",
    "--out",
    "result.json",
  ]);
  assert.equal(command, "sweep");
  assert.equal(options.map, "forest");
  assert.equal(options.program, "forestBest");
  assert.deepEqual(options.seeds, seedRange(1, 500));
  assert.equal(options.seedsText, "1-500");
  assert.deepEqual(options.chest, { stick: 8, berry: 7 });
  assert.deepEqual(options.practice, { smallItemGathering: 80 });
  assert.deepEqual(options.ranks, { keenEye: 3 });
  assert.deepEqual(options.overlays, ["a.json", "b.json", "c.json"]);
  assert.equal(options.cap, 4000);
  assert.equal(options.out, "result.json");
});

test("a flag not given leaves its table empty, the resurrection ready and nothing to write", () => {
  const { options } = parseArgs(["sweep", ...SWEEP_FLAGS]);
  assert.deepEqual(options.chest, {});
  assert.deepEqual(options.practice, {});
  assert.deepEqual(options.ranks, {});
  assert.deepEqual(options.overlays, []);
  assert.equal(options.resurrection, true);
  assert.equal(options.cap, undefined);
  assert.equal(options.out, undefined);
});

test("the hours and the flag that spends the resurrection of a loop are read, the flag needing no value", () => {
  const { command, options } = parseArgs([
    "loop",
    ...SWEEP_FLAGS,
    "--hours",
    "8,24,72",
    "--no-resurrection",
    "--seeds",
    "1-10",
  ]);
  assert.equal(command, "loop");
  assert.deepEqual(options.hours, [8, 24, 72]);
  assert.equal(options.resurrection, false);
  assert.deepEqual(options.seeds, seedRange(1, 10));
  assert.throws(
    () => parseArgs(["loop", ...SWEEP_FLAGS, "--hours", "8,x"]),
    /hours/,
  );
  assert.throws(
    () => parseArgs(["loop", ...SWEEP_FLAGS, "--hours", "0"]),
    /hours/,
  );
});

test("a command line that names no known command, flag or value is refused with a sentence", () => {
  const refused = [
    [[], /command/],
    [["bogus"], /command/],
    [["sweep", "--bogus", "1"], /--bogus/],
    // a flag of another command
    [["trace", ...SWEEP_FLAGS, "--hours", "8"], /--hours/],
    [["sweep", ...SWEEP_FLAGS, "--no-resurrection"], /--no-resurrection/],
    // a flag with no value, at the end and before another flag
    [["sweep", "--map"], /--map/],
    [["sweep", "--map", "--program", "forestBest"], /--map/],
    // a flag a second time that is not the overlay
    [["sweep", "--map", "forest", "--map", "forest"], /--map/],
    // a word that is no flag
    [["sweep", "forest"], /forest/],
    [["sweep", ...SWEEP_FLAGS, "--cap", "x"], /--cap/],
    [["sweep", ...SWEEP_FLAGS, "--cap", "0"], /--cap/],
    [["sweep", ...SWEEP_FLAGS, "--seeds", "5-1"], /seeds/],
    [["sweep", ...SWEEP_FLAGS, "--chest", "stick"], /pair/],
  ];
  for (const [argv, pattern] of refused)
    assert.throws(() => parseArgs(argv), pattern, argv.join(" "));
});

test("help is a command that needs no flags", () => {
  assert.equal(parseArgs(["--help"]).command, "help");
  assert.equal(parseArgs(["help"]).command, "help");
});

// A small program written out in the test; its description is worked out below from the labels and
// names of the game's data, which a person sees in the game.
const SMALL = program({
  take: [["stick", 8]],
  bring: [
    ["berry", 3],
    ["stick", 2],
  ],
  groups: [
    {
      name: "Ciepło",
      when: temperatureBelow(36.4),
      rules: [[always, lightFire]],
    },
    {
      name: "Zapasy",
      rules: [
        [itemBelow("stick", 8), gather("stick")],
        [hereBelow("berry", 1), walkTo("berry")],
      ],
    },
  ],
});

test("a program is described in the labels and names of the data: its conditions with their numbers, its actions with their resources, its trip plan", () => {
  const text = describeProgram("small", SMALL);
  const lines = text.split("\n").map((line) => line.trim());
  const rules = lines.filter((line) => /^\d+\. /.test(line));
  assert.deepEqual(rules, [
    `1. ${CONDITIONS.always.label} → ${ACTIONS.lightCampfire.label}`,
    `2. ${CONDITIONS.itemBelow.label} 8 × ${ITEMS.stick.name} → ${ACTIONS.gather.label} — ${RESOURCES.stick.name}`,
    `3. ${CONDITIONS.hereBelow.label} 1 × ${RESOURCES.berry.name} → ${ACTIONS.walkTo.label} — ${RESOURCES.berry.name}`,
  ]);
  const groups = lines.filter((line) => line.startsWith("- "));
  assert.equal(groups.length, 2);
  assert.ok(groups[0].includes("Ciepło"), groups[0]);
  assert.ok(
    groups[0].includes(
      `${CONDITIONS.temperatureBelow.label} 36.4 ${CONDITIONS.temperatureBelow.unit}`,
    ),
    groups[0],
  );
  assert.ok(groups[1].includes("Zapasy"), groups[1]);
  assert.ok(groups[1].includes(CONDITIONS.always.label), groups[1]);
  const head = lines[0];
  assert.ok(head.includes("small"), head);
  assert.ok(head.includes(`8 × ${ITEMS.stick.name}`), head);
  assert.ok(
    head.includes(`3 × ${ITEMS.berry.name}, 2 × ${ITEMS.stick.name}`),
    head,
  );
});

test("no description of a reference program holds an identifier of the data in place of the word the game shows, and each rule has its line", () => {
  const identifiers = [
    ...Object.keys(CONDITIONS),
    ...Object.keys(ACTIONS),
    ...Object.keys(ITEMS),
    ...Object.keys(RESOURCES),
  ];
  for (const [id, one] of Object.entries(REFERENCE_PROGRAMS)) {
    const text = describeProgram(id, one);
    for (const word of identifiers)
      assert.ok(
        !new RegExp(`\\b${word}\\b`).test(text.replace(`**${id}**`, "")),
        `${id}: ${word}`,
      );
    const ruleCount = one.groups.reduce(
      (sum, group) => sum + group.rules.length,
      0,
    );
    const ruleLines = text
      .split("\n")
      .filter((line) => /^\s+\d+\. /.test(line));
    assert.equal(ruleLines.length, ruleCount, id);
  }
});

test("a condition or an action the data does not hold is refused with a sentence, not described as a gap", () => {
  const broken = program({
    groups: [{ name: "x", rules: [[always, { kind: "teleport" }]] }],
  });
  assert.throws(() => describeProgram("broken", broken), /teleport/);
});

// A program written out in the test whose rules carry out both verbs with an item as their target.
const BOTH_VERBS = program({
  groups: [
    {
      name: "Opatrunek",
      rules: [
        [itemBelow("bandage", 1), { kind: "craft", item: "bandage" }],
        [always, { kind: "tend", item: "bandage" }],
      ],
    },
  ],
});

test("an action with an item as its target is described as the game words it, with the item's name from the data and no identifier of the data", () => {
  const text = describeProgram("verbs", BOTH_VERBS);
  const rules = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^\d+\. /.test(line));
  assert.deepEqual(rules, [
    `1. ${CONDITIONS.itemBelow.label} 1 × ${ITEMS.bandage.name} → Wytwórz — Opatrunek`,
    `2. ${CONDITIONS.always.label} → Opatrz — Opatrunek`,
  ]);
  for (const word of ["craft", "tend", "bandage"])
    assert.ok(!new RegExp(`\\b${word}\\b`).test(text), word);
});

test("an action whose item the data lack is refused with a sentence that names the item, for each verb, not described without it", () => {
  for (const kind of ["craft", "tend"]) {
    const broken = program({
      groups: [{ name: "x", rules: [[always, { kind, item: "splint" }]] }],
    });
    assert.throws(() => describeProgram("broken", broken), /splint/, kind);
  }
});

test("the descriptions of all reference programs make one text, one description after another", () => {
  const text = describePrograms(REFERENCE_PROGRAMS);
  Object.keys(REFERENCE_PROGRAMS).forEach((id, index) =>
    assert.ok(text.includes(`**P${index + 1} ${id}**`), id),
  );
});

function options(extra) {
  return { ...parseArgs(["sweep", ...SWEEP_FLAGS]).options, ...extra };
}

test("a sweep command gives the summary the engine gives for the same flags, and each flag reaches the engine", () => {
  const seeds = seedRange(1, 12);
  const direct = (flags) =>
    sweep({ mapId: "forest", program: forestLoopWithStock, seeds, ...flags })
      .summary;
  const stocked = direct({ chest: { stick: 8 } });
  assert.notDeepEqual(
    stocked,
    direct({}),
    "precondition: the chest changes this program's results",
  );
  const printed = (extra) =>
    JSON.parse(
      runCommand(
        "sweep",
        options({
          program: "forestLoopWithStock",
          seeds,
          seedsText: "1-12",
          ...extra,
        }),
      ).printed,
    );
  assert.deepEqual(printed({ chest: { stick: 8 } }).summary, stocked);
  assert.deepEqual(printed({}).summary, direct({}));
  const skills = buildSkills({
    practice: { smallItemGathering: 80 },
    ranks: { keenEye: 3 },
  });
  assert.notDeepEqual(
    direct({ skills }),
    direct({}),
    "precondition: the skills change this program's results",
  );
  assert.deepEqual(
    printed({
      practice: { smallItemGathering: 80 },
      ranks: { keenEye: 3 },
    }).summary,
    direct({ skills }),
  );
  const capped = printed({ cap: 30 });
  assert.deepEqual(capped.summary, direct({ capMinutes: 30 }));
  assert.equal(capped.header.cap, 30);
  assert.equal(capped.header.map, "forest");
  assert.equal(capped.header.program, "forestLoopWithStock");
  assert.equal(capped.header.seeds, "1-12");
});

// decision: D-429 "The instrument prints each result, or writes it to the file that a flag of its command names, and writes no file into the repository of its own accord"
test("a sweep prints its result and writes no file, and with --out it writes the whole result, with the rows of the seeds, to that file alone", () => {
  const given = options({
    seeds: seedRange(1, 3),
    seedsText: "1-3",
  });
  const plain = runCommand("sweep", given);
  assert.deepEqual(plain.files, []);
  assert.equal(JSON.parse(plain.printed).summary.runs, 3);
  const target = path.join("somewhere", "result.json");
  const written = runCommand("sweep", { ...given, out: target });
  assert.equal(written.printed, "");
  assert.equal(written.files.length, 1);
  assert.equal(written.files[0].path, target);
  const content = JSON.parse(written.files[0].content);
  assert.deepEqual(content.summary, JSON.parse(plain.printed).summary);
  assert.deepEqual(
    content.results.map((row) => row.seed),
    [1, 2, 3],
  );
});

test("an overlay is laid for the command and restored after it, also when the command fails", () => {
  const before = structuredClone(MAPS);
  assert.ok(!Object.hasOwn(MAPS, "wasteland"), "precondition: no such map");
  const given = options({
    map: "wasteland",
    seeds: seedRange(1, 3),
    seedsText: "1-3",
    overlays: [overlayFile("wasteland.json")],
  });
  const result = JSON.parse(runCommand("sweep", given).printed);
  assert.equal(result.summary.runs, 3);
  assert.deepEqual(result.header.overlays, [overlayFile("wasteland.json")]);
  assert.deepEqual(MAPS, before);
  assert.throws(
    () => runCommand("sweep", { ...given, map: "nowhere" }),
    /nowhere/,
  );
  assert.deepEqual(MAPS, before);
  assert.throws(
    () => runCommand("sweep", { ...given, program: "noSuchProgram" }),
    /noSuchProgram/,
  );
  assert.deepEqual(MAPS, before);
});

test("two overlays are both laid for one command, whichever comes first, and both restored after it", () => {
  const before = structuredClone(MAPS);
  const files = [overlayFile("wasteland.json"), overlayFile("dead-zone.json")];
  for (const overlays of [files, [...files].reverse()])
    for (const map of ["wasteland", "deadZone"]) {
      const given = options({
        map,
        seeds: seedRange(1, 2),
        seedsText: "1-2",
        overlays,
      });
      assert.equal(
        JSON.parse(runCommand("sweep", given).printed).summary.runs,
        2,
        map,
      );
      assert.deepEqual(MAPS, before);
    }
});

test("a chest naming an item the data lacks, a map it lacks or a program it lacks is refused before any map run", () => {
  assert.throws(
    () => runCommand("sweep", options({ chest: { gold: 1 } })),
    /gold/,
  );
  assert.throws(
    () => runCommand("sweep", options({ map: "nowhere" })),
    /nowhere/,
  );
  assert.throws(
    () => runCommand("sweep", options({ program: undefined })),
    /--program/,
  );
  assert.throws(
    () => runCommand("sweep", options({ map: undefined })),
    /--map/,
  );
});

test("a trace prints the lines of the engine's map run and ends in the outcome the engine gives for the seed", () => {
  const given = {
    ...parseArgs(["trace", ...SWEEP_FLAGS, "--seeds", "2"]).options,
  };
  const { printed, files } = runCommand("trace", given);
  assert.deepEqual(files, []);
  const engine = runOnce({ mapId: "forest", program: forestBest, seed: 2 });
  const lines = printed.trimEnd().split("\n");
  assert.ok(lines.length > 2);
  assert.ok(
    lines.at(-1).includes(engine.outcome),
    `${lines.at(-1)} against ${engine.outcome}`,
  );
  assert.ok(lines.at(-1).includes(String(engine.minute)), lines.at(-1));
  assert.throws(
    () =>
      runCommand("trace", {
        ...given,
        seeds: [1, 2],
      }),
    /one seed/,
  );
});

// decision: D-428 "The earning loop of the map check and the command of the loop start with the full number of uses of the resurrection, the switch `--no-resurrection` starts the loop with every use spent and the clock of the returns started at the start of the loop"
test("a loop command gives the readings the loop gives for the same flags, and --practice and --no-resurrection reach the loop", () => {
  const seeds = seedRange(1, 10);
  const given = parseArgs([
    "loop",
    "--map",
    "forest",
    "--program",
    "forestBest",
    "--hours",
    "8,24",
    "--practice",
    "smallItemGathering=80",
  ]).options;
  const run = (extra) =>
    JSON.parse(
      runCommand("loop", { ...given, seeds, seedsText: "1-10", ...extra })
        .printed,
    );
  // A character with practice is the one a death costs something, so the spent resurrection shows.
  const skills = buildSkills({ practice: { smallItemGathering: 80 } });
  const direct = (flags) =>
    loopSweep({
      mapId: "forest",
      program: forestBest,
      seeds,
      checkpoints: [8, 24],
      skills,
      ...flags,
    }).perCheckpoint;
  withNoReturn(() => {
    assert.notDeepEqual(
      direct({}),
      direct({ resurrectionReady: false }),
      "precondition: the resurrection changes this loop's readings",
    );
    assert.deepEqual(run({}).perCheckpoint, direct({}));
    assert.deepEqual(
      run({ resurrection: false }).perCheckpoint,
      direct({ resurrectionReady: false }),
    );
    assert.notDeepEqual(
      run({}).perCheckpoint,
      loopSweep({
        mapId: "forest",
        program: forestBest,
        seeds,
        checkpoints: [8, 24],
      }).perCheckpoint,
      "precondition: the practice changes this loop's readings",
    );
    assert.deepEqual(run({}).header.hours, [8, 24]);
  });
});

test("a campaign command plays the player a description names, by its identifier in the instrument's own list", () => {
  const given = parseArgs([
    "campaign",
    "--player",
    "edge-daily-best",
    "--seeds",
    "1-2",
  ]).options;
  const result = JSON.parse(runCommand("campaign", given).printed);
  assert.equal(result.summary.campaigns, 2);
  assert.equal(result.header.player, "edge-daily-best");
  assert.throws(
    () => runCommand("campaign", { ...given, player: "nobody" }),
    /nobody/,
  );
  assert.throws(
    () => runCommand("campaign", { ...given, player: undefined }),
    /--player/,
  );
});

// decision: D-429 "The instrument prints each result, or writes it to the file that a flag of its command names, and writes no file into the repository of its own accord"
test("the programs command prints every reference program in the game's words, and with --out writes each as a file of the game's shape and all in words", () => {
  const plain = runCommand("programs", parseArgs(["programs"]).options);
  assert.deepEqual(plain.files, []);
  Object.keys(REFERENCE_PROGRAMS).forEach((id, index) =>
    assert.ok(plain.printed.includes(`**P${index + 1} ${id}**`), id),
  );
  const directory = path.join("somewhere", "programs");
  const written = runCommand(
    "programs",
    parseArgs(["programs", "--out", directory]).options,
  );
  assert.equal(written.printed, "");
  const byPath = Object.fromEntries(
    written.files.map((file) => [file.path, file.content]),
  );
  assert.equal(
    written.files.length,
    Object.keys(REFERENCE_PROGRAMS).length + 1,
  );
  for (const [id, one] of Object.entries(REFERENCE_PROGRAMS))
    assert.deepEqual(
      JSON.parse(byPath[path.join(directory, `${id}.json`)]),
      one,
    );
  assert.equal(byPath[path.join(directory, "programs.md")], plain.printed);
});

test("the progression command reads its own flags alone, and its seeds default to 1-500 in the measurement, not in the flags", () => {
  const { command, options } = parseArgs([
    "progression",
    "--seeds",
    "1-4",
    "--maps",
    "forest,forestDeep",
    "--programs",
    "forestBest,forestDeepBest",
    "--out",
    "table.md",
  ]);
  assert.equal(command, "progression");
  assert.deepEqual(options.seeds, [1, 2, 3, 4]);
  assert.deepEqual(options.maps, ["forest", "forestDeep"]);
  assert.deepEqual(options.programs, ["forestBest", "forestDeepBest"]);
  assert.equal(options.out, "table.md");
  assert.equal(parseArgs(["progression"]).options.seeds, undefined);
  for (const flag of ["--map", "--chest", "--overlay", "--hours"])
    assert.throws(
      () => parseArgs(["progression", flag, "forest"]),
      new RegExp(flag),
      flag,
    );
});

// decision: D-429 "The instrument prints each result, or writes it to the file that a flag of its command names, and writes no file into the repository of its own accord"
test("the progression command prints the measurement's table and sentence, and with --out hands them over as the one file to write", () => {
  const given = parseArgs([
    "progression",
    "--seeds",
    "1-6",
    "--maps",
    "forest",
    "--programs",
    "forestBest,emptyProgram",
  ]).options;
  const plain = runCommand("progression", given);
  assert.deepEqual(plain.files, []);
  const expected = renderProgression(
    measureProgression({
      mapIds: ["forest"],
      seeds: seedRange(1, 6),
      programIds: ["forestBest", "emptyProgram"],
    }),
  );
  assert.equal(plain.printed, expected);
  assert.ok(plain.printed.startsWith("| Map | Program |"));
  const target = path.join("somewhere", "progression.md");
  const written = runCommand("progression", { ...given, out: target });
  assert.equal(written.printed, "");
  assert.deepEqual(written.files, [{ path: target, content: expected }]);
});

test("the progression command refuses a map the game lacks and a program that is no reference program before any measurement", () => {
  const base = parseArgs(["progression"]).options;
  assert.throws(
    () => runCommand("progression", { ...base, maps: ["noSuchMap"] }),
    /--maps.*noSuchMap/,
  );
  assert.throws(
    () => runCommand("progression", { ...base, programs: ["noSuchProgram"] }),
    /--programs.*noSuchProgram/,
  );
});
