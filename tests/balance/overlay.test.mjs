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
import { applyOverlay, readOverlay } from "../../balance/overlay.mjs";
import {
  prerequisitesOf,
  runOnce,
  seedRange,
  sweep,
} from "../../balance/engine.mjs";
import { forestBest } from "../sim/reference-programs.mjs";

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
