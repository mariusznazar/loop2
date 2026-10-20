import assert from "node:assert/strict";
import { test } from "node:test";
import { MAPS } from "../../dist/public/sim/data/maps.js";
import { RESOURCES } from "../../dist/public/sim/data/resources.js";
import { ACTIONS } from "../../dist/public/sim/data/actions.js";
import { CONDITIONS } from "../../dist/public/sim/data/conditions.js";
import { ARCHETYPES } from "../../dist/public/sim/data/archetypes.js";
import { BALANCE, INITIAL_SEED } from "../../dist/public/sim/data/balance.js";

test("the map Las has the size, entrance, step and resources of the task", () => {
  const forest = MAPS.forest;
  assert.equal(forest.name, "Las");
  assert.equal(forest.width, 4);
  assert.equal(forest.height, 4);
  assert.deepEqual(forest.entrance, { col: 1, row: 1 });
  assert.equal(forest.stepMinutes, 5);
  assert.deepEqual(forest.resources, [
    { id: "stick", density: 0.7, stock: 12, renewMinutes: 30 },
    { id: "berry", density: 0.5, stock: 8, renewMinutes: 40 },
    { id: "moss", density: 0.4, stock: 6, renewMinutes: 60 },
    { id: "fiber", density: 0.4, stock: 6, renewMinutes: 60 },
  ]);
});

test("every resource of the map is defined in the resource data, with name and icon", () => {
  assert.deepEqual(Object.keys(RESOURCES), ["stick", "berry", "moss", "fiber"]);
  assert.deepEqual(
    Object.values(RESOURCES).map((r) => [r.name, r.icon]),
    [
      ["patyk", "wood-stick"],
      ["jagoda", "berry-bush"],
      ["mech", "fern"],
      ["włókno", "flax"],
    ],
  );
  for (const entry of MAPS.forest.resources) assert.ok(entry.id in RESOURCES);
});

test("each resource's data gives its icon's title as the icon's page on game-icons.net gives it", () => {
  // The headings of the icons' pages, as the environment facts game-icons-*-title quote them.
  assert.deepEqual(
    Object.values(RESOURCES).map((r) => [r.icon, r.iconTitle]),
    [
      ["wood-stick", "Wood stick icon"],
      ["berry-bush", "Berry bush icon"],
      ["fern", "Fern icon"],
      ["flax", "Flax icon"],
    ],
  );
});

test("actions carry their labels, status texts and the fixed explore duration", () => {
  assert.deepEqual(ACTIONS.explore, {
    label: "Eksploruj",
    status: "Eksploruje",
    minutes: 20,
  });
  assert.deepEqual(ACTIONS.wander, {
    label: "Wędruj",
    status: "Wędruje",
    minutes: null,
  });
  assert.deepEqual(ACTIONS.walkTo, {
    label: "Idź",
    status: "Idzie po",
    minutes: null,
  });
});

test("conditions carry labels and the value range of hereBelow", () => {
  assert.equal(CONDITIONS.always.label, "Zawsze");
  assert.deepEqual(CONDITIONS.hereBelow, {
    label: "Tu leży mniej niż",
    unit: "szt.",
    defaultValue: 1,
    min: 0,
    max: 50,
    step: 1,
  });
});

test("the archetype and the pace are in data", () => {
  assert.equal(ARCHETYPES.elementalMage.name, "Mag żywiołów");
  assert.equal(BALANCE.gameMinutesPerRealSecond, 1);
  assert.equal(BALANCE.waitMinutes, 1);
  assert.equal(INITIAL_SEED, 1);
});

// Validation of ids and programs against the data (spec 4.5): the ids come from the data files.
const [firstMapId, firstMap] = Object.entries(MAPS)[0];
const firstArchetypeId = Object.keys(ARCHETYPES)[0];
const SENT = { mapId: firstMapId, archetypeId: firstArchetypeId };
const REAL_MS = 1760000000000;
const ALWAYS = { kind: "always" };
const EXPLORE = { kind: "explore" };
const rule = (condition, action) => ({ condition, action });
const below = (resource, value) => ({ kind: "hereBelow", resource, value });
const walkTo = (resource) => ({ kind: "walkTo", resource });

test("setProgram accepts every resource of the map data list, in conditions and in walks", async () => {
  const { newGame, send, setProgram } =
    await import("../../dist/public/sim/game.js");
  const rules = firstMap.resources.flatMap(({ id }) => [
    rule(below(id, 3), EXPLORE),
    rule(ALWAYS, walkTo(id)),
  ]);
  const program = { rules };
  assert.deepEqual(setProgram(newGame(), program).state.program, program);
  const running = send(newGame(), SENT, REAL_MS).state;
  assert.deepEqual(setProgram(running, program).state.program, program);
});

test("setProgram accepts the empty program, both actions without a resource and the ends of the range", async () => {
  const { newGame, setProgram } = await import("../../dist/public/sim/game.js");
  const [resource] = firstMap.resources.map(({ id }) => id);
  const { min, max } = CONDITIONS.hereBelow;
  for (const program of [
    { rules: [] },
    { rules: [rule(ALWAYS, EXPLORE), rule(ALWAYS, { kind: "wander" })] },
    {
      rules: [
        rule(below(resource, min), EXPLORE),
        rule(below(resource, max), EXPLORE),
      ],
    },
  ]) {
    assert.deepEqual(setProgram(newGame(), program).state.program, program);
  }
});

test("setProgram rejects a resource id outside the map data list", async () => {
  const { newGame, send, setProgram } =
    await import("../../dist/public/sim/game.js");
  const running = send(newGame(), SENT, REAL_MS).state;
  for (const resource of ["granite", "toString", "", undefined]) {
    for (const state of [newGame(), running]) {
      assert.throws(
        () => setProgram(state, { rules: [rule(ALWAYS, walkTo(resource))] }),
        Error,
        `walk to ${resource}`,
      );
      assert.throws(
        () => setProgram(state, { rules: [rule(below(resource, 1), EXPLORE)] }),
        Error,
        `below ${resource}`,
      );
    }
  }
});

test("setProgram rejects kinds outside the closed list and values outside the data range", async () => {
  const { newGame, setProgram } = await import("../../dist/public/sim/game.js");
  const [resource] = firstMap.resources.map(({ id }) => id);
  const { min, max } = CONDITIONS.hereBelow;
  const invalid = [
    null,
    {},
    { rules: "none" },
    { rules: [null] },
    { rules: [{ condition: ALWAYS }] },
    { rules: [rule({ kind: "never" }, EXPLORE)] },
    { rules: [rule(ALWAYS, { kind: "gather" })] },
    { rules: [rule(below(resource, min - 1), EXPLORE)] },
    { rules: [rule(below(resource, max + 1), EXPLORE)] },
    { rules: [rule(below(resource, 1.5), EXPLORE)] },
    { rules: [rule(below(resource, "3"), EXPLORE)] },
    { rules: [rule(below(resource, Number.NaN), EXPLORE)] },
  ];
  for (const program of invalid) {
    assert.throws(
      () => setProgram(newGame(), program),
      Error,
      JSON.stringify(program),
    );
  }
});

test("a refused program leaves the game unchanged", async () => {
  const { newGame, setProgram } = await import("../../dist/public/sim/game.js");
  const state = setProgram(newGame(), { rules: [rule(ALWAYS, EXPLORE)] }).state;
  assert.throws(() =>
    setProgram(state, { rules: [rule(ALWAYS, walkTo("granite"))] }),
  );
  assert.deepEqual(state.program, { rules: [rule(ALWAYS, EXPLORE)] });
});

test("send rejects a map or an archetype id not in the data", async () => {
  const { newGame, send } = await import("../../dist/public/sim/game.js");
  for (const ids of [
    { mapId: "nowhere", archetypeId: firstArchetypeId },
    { mapId: "toString", archetypeId: firstArchetypeId },
    { mapId: firstMapId, archetypeId: "knight" },
    { mapId: firstMapId, archetypeId: "__proto__" },
    { mapId: undefined, archetypeId: firstArchetypeId },
  ]) {
    assert.throws(
      () => send(newGame(), ids, REAL_MS),
      Error,
      JSON.stringify(ids),
    );
  }
  assert.equal(send(newGame(), SENT, REAL_MS).state.run.mapId, firstMapId);
});

// Every activity must last at least one game minute (D-18: a map can be added through data alone).
test("every map step and every fixed action duration is a whole number of minutes, at least 1", () => {
  const durations = [
    ...Object.entries(MAPS).map(([id, map]) => [
      `map ${id} stepMinutes`,
      map.stepMinutes,
    ]),
    ...Object.entries(ACTIONS)
      .filter(([, action]) => action.minutes !== null)
      .map(([id, action]) => [`action ${id} minutes`, action.minutes]),
    ["BALANCE.waitMinutes", BALANCE.waitMinutes],
  ];
  assert.ok(durations.length > 2);
  for (const [what, minutes] of durations) {
    assert.ok(
      Number.isInteger(minutes) && minutes >= 1,
      `${what} = ${minutes}`,
    );
  }
});

test("an activity of 0 minutes from faulty data still finishes in the next minute", async () => {
  const { newMapRun, stepMinute } =
    await import("../../dist/public/sim/run.js");
  const map = { ...firstMap, stepMinutes: 0 };
  const program = { rules: [rule(ALWAYS, { kind: "wander" })] };
  const started = newMapRun(map, 1, program, SENT).run;
  assert.equal(started.current.endMinute, started.minute);
  const step = stepMinute(started, map, program);
  assert.equal(step.run.minute, 1);
  assert.ok(
    step.events.some(
      (event) => event.kind === "activityFinished" && event.minute === 1,
    ),
    JSON.stringify(step.events),
  );
});
