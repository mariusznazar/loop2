import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import { ACTIONS } from "../../dist/browser/sim/data/actions.js";
import { BALANCE } from "../../dist/browser/sim/data/balance.js";
import { CAMPFIRE } from "../../dist/browser/sim/data/campfire.js";
import { CREATURES } from "../../dist/browser/sim/data/creatures.js";
import { ITEMS } from "../../dist/browser/sim/data/items.js";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import { BRANCHES, SKILLS } from "../../dist/browser/sim/data/skills.js";
import { TRAITS } from "../../dist/browser/sim/data/traits.js";
import { describeProgram } from "../../balance/describe.mjs";
import { applyOverlay, readOverlay } from "../../balance/overlay.mjs";
import { trace } from "../../balance/trace.mjs";
import {
  prerequisitesOf,
  runOnce,
  seedRange,
  sweep,
} from "../../balance/engine.mjs";
import {
  always,
  explore,
  forestBest,
  healthBelow,
  itemBelow,
  program,
} from "../sim/reference-programs.mjs";

// The data an overlay may change, each as the game holds it: the tables the instrument lays an
// overlay on. They are the objects the game's own modules read, so a change here is a change of
// the game's data for the time of the measurement.
const TABLES = {
  MAPS,
  BALANCE,
  ITEMS,
  CAMPFIRE,
  CREATURES,
  SKILLS,
  BRANCHES,
  ACTIONS,
  TRAITS,
};

const OVERLAY_FILES = {
  forestPack: "../../balance/overlays/forest-pack.json",
  wasteland: "../../balance/overlays/wasteland.json",
  deadZone: "../../balance/overlays/dead-zone.json",
};

function overlayFile(relative) {
  return fileURLToPath(new URL(relative, import.meta.url));
}

function copyOfTables() {
  return Object.fromEntries(
    Object.entries(TABLES).map(([name, table]) => [
      name,
      structuredClone(table),
    ]),
  );
}

test("a changed number of a map reaches the map runs of the engine, and the restore brings the game's own run back", () => {
  const baseline = runOnce({ mapId: "forest", program: forestBest, seed: 1 });
  assert.equal(baseline.outcome, "solved");

  // Stays on the map far colder than the game's own air; the body must chill and die sooner.
  const restore = applyOverlay({
    MAPS: { forest: { ambientTemperature: -20 } },
  });
  let chilled;
  try {
    chilled = runOnce({ mapId: "forest", program: forestBest, seed: 1 });
  } finally {
    restore();
  }
  assert.equal(chilled.outcome, "death");
  assert.equal(chilled.cause, "cold");
  assert.ok(chilled.minute < baseline.minute);

  const again = runOnce({ mapId: "forest", program: forestBest, seed: 1 });
  assert.deepEqual(again, baseline);
});

test("a map the overlay adds can be swept, after the map it opens after", () => {
  const restore = applyOverlay(
    readOverlay(overlayFile(OVERLAY_FILES.forestPack)),
  );
  try {
    assert.deepEqual(prerequisitesOf("forestPack"), [
      "forestEdge",
      "forest",
      "forestDeep",
    ]);
    const { summary } = sweep({
      mapId: "forestPack",
      program: forestBest,
      seeds: seedRange(1, 5),
    });
    assert.equal(summary.runs, 5);
    const deaths = Object.values(summary.deaths).reduce(
      (sum, d) => sum + d.n,
      0,
    );
    assert.equal(summary.solved + deaths + summary.capped, summary.runs);
  } finally {
    restore();
  }
  assert.equal(Object.hasOwn(MAPS, "forestPack"), false);
});

test("the restore leaves every table deep-equal to what it was, and removes a map the overlay added", () => {
  const before = copyOfTables();
  const restore = applyOverlay({
    MAPS: {
      forest: { ambientTemperature: 3, resources: [] },
      forestPack: structuredClone(MAPS.forestDeep),
    },
    BALANCE: { gatherChance: 0.5 },
  });
  assert.equal(MAPS.forest.ambientTemperature, 3);
  assert.equal(Object.hasOwn(MAPS, "forestPack"), true);

  restore();

  for (const [name, table] of Object.entries(TABLES)) {
    assert.deepEqual(table, before[name], `table ${name} after the restore`);
  }
  assert.equal(Object.hasOwn(MAPS, "forestPack"), false);
});

test("an overlay naming a table the instrument does not change is refused, and nothing of it is laid", () => {
  const forestBefore = structuredClone(MAPS.forest);
  assert.throws(() => applyOverlay({ CONDITIONS: {} }));
  assert.throws(() => applyOverlay({ RESOURCES: {} }));
  assert.throws(() =>
    applyOverlay({
      MAPS: { forest: { ambientTemperature: 1 } },
      RESOURCES: {},
    }),
  );
  assert.deepEqual(MAPS.forest, forestBefore);
});

test("each overlay file of the part adds its map, which opens after a map the game holds, and can be swept", () => {
  for (const [mapId, relative] of Object.entries(OVERLAY_FILES)) {
    const overlay = readOverlay(overlayFile(relative));
    assert.equal(typeof overlay.description, "string");
    assert.ok(overlay.description.length > 0);

    const restore = applyOverlay(overlay);
    try {
      const map = MAPS[mapId];
      assert.ok(map, `${mapId} is laid`);
      assert.ok(
        MAPS[map.opensAfter],
        `${mapId} opens after a map the game holds`,
      );
      const { summary } = sweep({
        mapId,
        program: forestBest,
        seeds: seedRange(1, 3),
      });
      assert.equal(summary.runs, 3);
    } finally {
      restore();
    }
    assert.equal(
      Object.hasOwn(MAPS, mapId),
      false,
      `${mapId} is restored away`,
    );
  }
});

// What an overlay file would hold to add a second item with a recipe and a healing property: nothing
// of the actions' rows, so the verbs' targets can only follow from the item's own row.
const SPLINT_OVERLAY = {
  description:
    "A splint: a recipe of a stick and a piece of moss, and a healing.",
  ITEMS: {
    splint: {
      name: "szyna",
      plural: { few: "szyny", many: "szyn" },
      icon: "first-aid-kit",
      iconTitle: "First aid kit icon",
      revealedBy: { kind: "gathered", item: "moss" },
      recipe: {
        uses: [
          { item: "stick", count: 1 },
          { item: "moss", count: 1 },
        ],
        minutes: 4,
      },
      healing: { health: 10 },
    },
  },
};

/** A program that takes a stick and a piece of moss, crafts a splint of them and dresses with it. */
const SPLINT_PROGRAM = program({
  take: [
    ["stick", 1],
    ["moss", 1],
  ],
  groups: [
    {
      name: "Opatrunek",
      rules: [
        [healthBelow(100), { kind: "tend", item: "splint" }],
        [itemBelow("splint", 1), { kind: "craft", item: "splint" }],
        [always, explore],
      ],
    },
  ],
});

/** A program naming the item `item` as the target of `kind`. */
function naming(kind, item) {
  return program({
    groups: [{ name: "x", rules: [[always, { kind, item }]] }],
  });
}

test("a second item with a recipe and a healing property laid by an overlay becomes a target of both verbs that the instrument describes and runs, moss of neither, and the restore removes it", () => {
  // decision: D-443 "An action is a verb with a target, and the targets a verb takes follow from the properties of the items in the game's data."
  assert.ok(
    !Object.hasOwn(ITEMS, "splint"),
    "precondition: no splint in the data",
  );
  const before = copyOfTables();
  const restore = applyOverlay(structuredClone(SPLINT_OVERLAY));
  try {
    const described = describeProgram("splint", SPLINT_PROGRAM)
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => /^\d+\. /.test(line))
      .map((line) => line.split(" → ")[1]);
    assert.deepEqual(described, [
      "Opatrz — Szyna",
      "Wytwórz — Szyna",
      "Eksploruj",
    ]);

    const options = {
      mapId: "forestDeep",
      program: SPLINT_PROGRAM,
      seed: 1,
      chest: { stick: 1, moss: 1 },
      capMinutes: 120,
    };
    const result = runOnce(options);
    assert.equal(result.minutesBy.craft, 4, "the recipe's minutes");
    assert.ok(result.minHealth < 100, "precondition: the health was hurt");
    assert.ok(result.minutesBy.tend > 0, "it dressed");
    assert.equal(result.backpack.splint, 0, "the splint was used up");
    const started = trace(options)
      .lines.filter((line) => line.includes(" start "))
      .map((line) => line.split(":: ")[1]);
    assert.ok(started.includes("start Wytwórz szyna"), started.join("|"));
    assert.ok(started.includes("start Opatrz szyna"), started.join("|"));

    for (const kind of ["craft", "tend"])
      assert.throws(
        () => runOnce({ ...options, program: naming(kind, "moss") }),
        /moss/,
        `moss as the target of ${kind}`,
      );
  } finally {
    restore();
  }

  assert.ok(!Object.hasOwn(ITEMS, "splint"), "the restore removes the item");
  for (const [name, table] of Object.entries(TABLES))
    assert.deepEqual(table, before[name], `table ${name} after the restore`);
  for (const kind of ["craft", "tend"]) {
    assert.throws(
      () => describeProgram("gone", naming(kind, "splint")),
      /splint/,
      `describing ${kind} of the removed item`,
    );
    assert.throws(
      () =>
        runOnce({
          mapId: "forestDeep",
          program: naming(kind, "splint"),
          seed: 1,
        }),
      /splint/,
      `running ${kind} of the removed item`,
    );
  }
});
