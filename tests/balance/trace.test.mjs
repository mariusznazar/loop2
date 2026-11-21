import assert from "node:assert/strict";
import { test } from "node:test";
import { ACTIONS } from "../../dist/browser/sim/data/actions.js";
import { ITEMS } from "../../dist/browser/sim/data/items.js";
import { RESOURCES } from "../../dist/browser/sim/data/resources.js";
import { runOnce } from "../../balance/engine.mjs";
import { trace } from "../../balance/trace.mjs";
import {
  always,
  emptyProgram,
  explore,
  forestBest,
  forestLoopWithStock,
  gather,
  healthBelow,
  itemBelow,
  program,
  walkTo,
} from "../sim/reference-programs.mjs";

// The trace mode of the instrument, checked against the engine on the same seed: the trace ends in
// the outcome the engine gives, a death it names is the death the engine gives, and the actions it
// names carry the labels and the resource names the data holds.

const LABELS = Object.values(ACTIONS).map((action) => action.label);
const RESOURCE_NAMES = Object.values(RESOURCES).map(
  (resource) => resource.name,
);

test("the trace of a map run ends in the outcome and the minute the engine gives for the same seed", () => {
  for (const seed of [1, 2, 3]) {
    const traced = trace({
      mapId: "forest",
      program: forestBest,
      seed,
    });
    const engine = runOnce({ mapId: "forest", program: forestBest, seed });
    assert.equal(traced.outcome, engine.outcome, `seed ${seed}`);
    assert.equal(traced.minute, engine.minute, `seed ${seed}`);
    assert.ok(traced.lines.length > 0, `seed ${seed}`);
  }
});

test("the trace of a map run that ends in a death names the death with the cause the engine gives", () => {
  const seed = 1;
  const engine = runOnce({ mapId: "forest", program: emptyProgram, seed });
  assert.equal(engine.outcome, "death");
  const traced = trace({ mapId: "forest", program: emptyProgram, seed });
  assert.equal(traced.outcome, "death");
  const deaths = traced.lines.filter((line) => line.includes("DEATH"));
  assert.equal(deaths.length, 1);
  assert.ok(deaths[0].includes(`DEATH ${engine.cause}`));
});

test("every started action of a trace is named by a label of the data, and a gathering names its resource by the data's name", () => {
  const traced = trace({
    mapId: "forest",
    program: forestLoopWithStock,
    seed: 2,
    chest: { stick: 8 },
  });
  const started = traced.lines.filter((line) => line.includes(" start "));
  assert.ok(started.length > 0);
  for (const line of started) {
    assert.ok(
      LABELS.some((label) => line.includes(label)),
      `no label of the data in: ${line}`,
    );
  }
  for (const line of started.filter((each) => each.includes("Zbierz"))) {
    assert.ok(
      RESOURCE_NAMES.some((name) => line.includes(name)),
      `no resource name of the data in: ${line}`,
    );
  }
});

test("a trace names the item of an action that starts with an item as its target by the name the data give it, as it names a resource, and ends as the engine does", () => {
  // Gathers the pieces of moss one making of the bandage uses (as the data hold them, D-82), crafts a
  // bandage of them and dresses with it once the health is hurt.
  const moss = ITEMS.bandage.recipe.uses.find(
    (use) => use.item === "moss",
  ).count;
  const dressing = program({
    groups: [
      {
        name: "Program",
        rules: [
          [healthBelow(100), { kind: "tend", item: "bandage" }],
          [itemBelow("bandage", 1), { kind: "craft", item: "bandage" }],
          [itemBelow("moss", moss), gather("moss")],
          [itemBelow("moss", moss), walkTo("moss")],
          [always, explore],
        ],
      },
    ],
  });
  const seed = 1;
  const traced = trace({ mapId: "forestDeep", program: dressing, seed });
  const engine = runOnce({ mapId: "forestDeep", program: dressing, seed });
  assert.equal(traced.outcome, engine.outcome);
  assert.equal(traced.minute, engine.minute);
  const started = traced.lines.filter((line) => line.includes(" start "));
  assert.ok(
    started.some((line) => line.endsWith(":: start Wytwórz opatrunek")),
    "no line of a started „Wytwórz” with its item",
  );
  assert.ok(
    started.some((line) => line.endsWith(":: start Opatrz opatrunek")),
    "no line of a started „Opatrz” with its item",
  );
  assert.ok(
    !started.some(
      (line) =>
        line.endsWith(":: start Wytwórz") || line.endsWith(":: start Opatrz"),
    ),
    "a started verb with no item",
  );
});
