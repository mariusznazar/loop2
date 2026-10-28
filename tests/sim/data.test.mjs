import assert from "node:assert/strict";
import { test } from "node:test";
import { MAPS } from "../../dist/public/sim/data/maps.js";
import { RESOURCES } from "../../dist/public/sim/data/resources.js";
import { ACTIONS } from "../../dist/public/sim/data/actions.js";
import { CONDITIONS } from "../../dist/public/sim/data/conditions.js";
import { ARCHETYPES } from "../../dist/public/sim/data/archetypes.js";
import { BALANCE, INITIAL_SEED } from "../../dist/public/sim/data/balance.js";
import { ITEMS } from "../../dist/public/sim/data/items.js";
import { CAMPFIRE } from "../../dist/public/sim/data/campfire.js";
import { SKILLS } from "../../dist/public/sim/data/skills.js";
import { TRAITS } from "../../dist/public/sim/data/traits.js";
import { programFromRules, programWithRules } from "./program-fixture.mjs";

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
    revealedBy: { kind: "chilled" },
  });
  assert.deepEqual(ACTIONS.wander, {
    label: "Wędruj",
    status: "Wędruje",
    minutes: null,
    revealedBy: { kind: "chilled" },
  });
  assert.deepEqual(ACTIONS.walkTo, {
    label: "Idź",
    status: "Idzie po",
    minutes: null,
    revealedBy: { kind: "explored" },
  });
});

test("conditions carry labels and the value range of hereBelow", () => {
  assert.equal(CONDITIONS.always.label, "Zawsze");
  assert.deepEqual(CONDITIONS.hereBelow, {
    label: "Tu leży mniej niż",
    revealedBy: { kind: "explored" },
    unit: "szt.",
    defaultValue: 1,
    min: 0,
    max: 50,
    step: 1,
  });
});

test("Las has an ambient temperature of 25 degrees in its map data", () => {
  assert.equal(MAPS.forest.ambientTemperature, 25);
  for (const [id, map] of Object.entries(MAPS)) {
    assert.equal(typeof map.ambientTemperature, "number", id);
  }
});

test("the body starts at its caps and the rates and thresholds are the task's", () => {
  assert.deepEqual(BALANCE.body, {
    startTemperature: 37.0,
    startSatiety: 100,
    startHealth: 100,
    coolingPerDegreeBelow: 0.002,
    satietyLossPerMinute: 0.6,
    chilledBelow: 35.0,
    starvingBelow: 30,
    healthLossChilled: 0.35,
    healthLossStarving: 0.35,
    healthRegain: 0.05,
  });
  assert.equal(BALANCE.gatherChance, 0.7);
});

test("the cooling in Las is 0.024 degrees a minute, as the task works it out", () => {
  const { startTemperature, coolingPerDegreeBelow } = BALANCE.body;
  const perMinute =
    (startTemperature - MAPS.forest.ambientTemperature) * coolingPerDegreeBelow;
  assert.ok(Math.abs(perMinute - 0.024) < 1e-9, String(perMinute));
});

test("a new character's traits hold carrying capacity 15, apart from the archetype", () => {
  assert.deepEqual(TRAITS, { carryingCapacity: 15 });
  for (const archetype of Object.values(ARCHETYPES)) {
    assert.ok(!("carryingCapacity" in archetype));
  }
});

test("the items are the four resources of Las, with their uses", () => {
  assert.deepEqual(Object.keys(ITEMS), ["stick", "berry", "moss", "fiber"]);
  assert.deepEqual(ITEMS.stick, {
    name: "patyk",
    revealedBy: { kind: "tileHolds", item: "stick" },
    fuel: { burnMinutes: 20 },
    lightable: { burnMinutes: 3, warmth: 0.15 },
  });
  assert.deepEqual(ITEMS.berry, {
    name: "jagoda",
    revealedBy: { kind: "tileHolds", item: "berry" },
    food: { satiety: 25 },
  });
  assert.deepEqual(ITEMS.moss, {
    name: "mech",
    revealedBy: { kind: "tileHolds", item: "moss" },
  });
  assert.deepEqual(ITEMS.fiber, {
    name: "włókno",
    revealedBy: { kind: "tileHolds", item: "fiber" },
  });
});

test("the campfire holds its name, costs, burning minutes, warmth and icon", () => {
  assert.deepEqual(CAMPFIRE, {
    id: "campfire",
    name: "ognisko",
    revealedBy: { kind: "gathered", item: "stick" },
    craft: { item: "stick", count: 6 },
    light: { item: "stick", count: 2 },
    burnMinutes: 60,
    warmth: 0.5,
    icon: "campfire",
    iconTitle: "Campfire icon",
  });
});

test("every item and every item of the campfire names an item of the data", () => {
  for (const [id, item] of Object.entries(ITEMS)) {
    assert.ok(id in RESOURCES, `item ${id} is a resource of the data`);
    assert.equal(item.name, RESOURCES[id].name, id);
  }
  for (const resource of MAPS.forest.resources) assert.ok(resource.id in ITEMS);
  assert.ok(CAMPFIRE.craft.item in ITEMS);
  assert.ok(CAMPFIRE.light.item in ITEMS);
});

test("the archetype and the pace are in data", () => {
  assert.equal(ARCHETYPES.elementalMage.name, "Mag żywiołów");
  assert.equal(BALANCE.gameMinutesPerRealSecond, 1);
  // The paces of the task "rozwiazanie-lasu", Question 3 (Mariusz, 2026-10-25).
  assert.deepEqual(BALANCE.paces, [1, 2, 4, 8, 16]);
  assert.equal(BALANCE.waitMinutes, 1);
  assert.equal(INITIAL_SEED, 1);
});

// The expectations below come from the task document odkrywanie_loop2.md of the vault (D-82).

test("the character skills grow the pairs of verb and target of the task, and the walks stand in none", () => {
  // odkrywanie_loop2.md:29 — To do 3: five skills and what each grows.
  assert.deepEqual(
    Object.values(SKILLS).map((skill) => [skill.name, skill.actions]),
    [
      ["Eksploracja", ["explore"]],
      ["Zbieranie małych przedmiotów", ["gather"]],
      ["Wytwarzanie ogniska", ["craftCampfire", "feedCampfire"]],
      ["Jedzenie", ["eat"]],
      ["Rzucanie czaru Płomyk", ["lightCampfire", "lightItem"]],
    ],
  );
  const grown = Object.values(SKILLS).flatMap((skill) => skill.actions);
  assert.equal(new Set(grown).size, grown.length, "an action in two skills");
  const free = Object.keys(ACTIONS).filter((id) => !grown.includes(id));
  assert.deepEqual(free, ["wander", "walkTo", "walkToCampfire"]);
});

test("the elemental mage has all five skills as predispositions", () => {
  // odkrywanie_loop2.md:29 — To do 3: "Mag żywiołów ma w predyspozycjach wszystkie pięć umiejętności".
  assert.deepEqual(
    [...ARCHETYPES.elementalMage.predispositions].sort(),
    Object.keys(SKILLS).sort(),
  );
  assert.equal(Object.keys(SKILLS).length, 5);
});

/** The rows of the table of To do 2, by the revealing event: what each reveals. */
const ROWS = [
  {
    // odkrywanie_loop2.md:21
    event: { kind: "chilled" },
    actions: ["explore", "wander"],
    conditions: ["temperatureBelow"],
    items: [],
  },
  {
    // odkrywanie_loop2.md:22 and :28 — an item enters with the revealed tile that holds it
    event: { kind: "explored" },
    actions: ["walkTo", "gather"],
    conditions: ["hereBelow", "itemBelow"],
    items: [],
  },
  {
    // odkrywanie_loop2.md:23
    event: { kind: "gathered", item: "stick" },
    actions: ["craftCampfire", "lightCampfire", "lightItem"],
    conditions: [],
    items: [],
    campfire: true,
  },
  {
    // odkrywanie_loop2.md:24
    event: { kind: "campfireCrafted" },
    actions: ["walkToCampfire"],
    conditions: ["campfireLeftBelow", "awayFromCampfire"],
    items: [],
  },
  {
    // odkrywanie_loop2.md:25
    event: { kind: "lit" },
    actions: ["feedCampfire"],
    conditions: [],
    items: [],
  },
  {
    // odkrywanie_loop2.md:26
    event: { kind: "gathered", item: "berry" },
    actions: ["eat"],
    conditions: ["satietyBelow"],
    items: [],
  },
  ...["stick", "berry", "moss", "fiber"].map((item) => ({
    // odkrywanie_loop2.md:22 and :28 — each item with the revealed tile that holds it
    event: { kind: "tileHolds", item },
    actions: [],
    conditions: [],
    items: [item],
  })),
];

test("each revealing event reveals exactly the actions, conditions and items of its row", () => {
  for (const row of ROWS) {
    const label = JSON.stringify(row.event);
    const is = (def) => JSON.stringify(def.revealedBy) === label;
    assert.deepEqual(
      Object.keys(ACTIONS).filter((id) => is(ACTIONS[id])),
      row.actions,
      `actions of ${label}`,
    );
    assert.deepEqual(
      Object.keys(CONDITIONS).filter((id) => is(CONDITIONS[id])),
      row.conditions,
      `conditions of ${label}`,
    );
    assert.deepEqual(
      Object.keys(ITEMS).filter((id) => is(ITEMS[id])),
      row.items,
      `items of ${label}`,
    );
    assert.equal(is(CAMPFIRE), row.campfire === true, `campfire of ${label}`);
  }
});

test("every action and condition stands in exactly one row, and Zawsze in none", () => {
  // odkrywanie_loop2.md:17-26 — the table; odkrywanie_loop2.md:80 — "Zawsze" is known from the start.
  const revealing = (def) =>
    ROWS.filter(
      (row) => JSON.stringify(row.event) === JSON.stringify(def.revealedBy),
    );
  for (const [id, action] of Object.entries(ACTIONS)) {
    assert.equal(revealing(action).length, 1, `action ${id}`);
  }
  for (const [id, condition] of Object.entries(CONDITIONS)) {
    if (id === "always") continue;
    assert.equal(revealing(condition).length, 1, `condition ${id}`);
  }
  assert.ok(!("revealedBy" in CONDITIONS.always));
  const tableActions = ROWS.flatMap((row) => row.actions);
  const tableConditions = ROWS.flatMap((row) => row.conditions);
  assert.deepEqual([...tableActions].sort(), Object.keys(ACTIONS).sort());
  assert.deepEqual(
    [...tableConditions].sort(),
    Object.keys(CONDITIONS)
      .filter((id) => id !== "always")
      .sort(),
  );
});

test("the campfire is revealed by the first gathered stick and has an identifier outside the items", () => {
  // odkrywanie_loop2.md:23 — "pierwszy zebrany patyk" reveals the campfire.
  assert.deepEqual(CAMPFIRE.revealedBy, { kind: "gathered", item: "stick" });
  assert.equal(CAMPFIRE.id, "campfire");
  assert.ok(!(CAMPFIRE.id in ITEMS));
  assert.deepEqual(Object.keys(ITEMS), ["stick", "berry", "moss", "fiber"]);
});

// Validation of ids and programs against the data (spec 4.5): the ids come from the data files.
const [firstMapId, firstMap] = Object.entries(MAPS)[0];
// The first character a new game creates takes the id 1.
const SENT = { mapId: firstMapId, characterId: 1 };
const REAL_MS = 1760000000000;
const ALWAYS = { kind: "always" };
const EXPLORE = { kind: "explore" };
const rule = (condition, action) => ({ condition, action });
const below = (resource, value) => ({ kind: "hereBelow", resource, value });
const walkTo = (resource) => ({ kind: "walkTo", resource });

test("setProgram accepts every resource of the map data list, in conditions and in walks", async () => {
  const { createCharacter, newGame, send, setProgram } =
    await import("../../dist/public/sim/game.js");
  const rules = firstMap.resources.flatMap(({ id }) => [
    rule(below(id, 3), EXPLORE),
    rule(ALWAYS, walkTo(id)),
  ]);
  const program = programFromRules(...rules);
  assert.deepEqual(setProgram(newGame(), program).state.program, program);
  const running = send(
    createCharacter(newGame(), "Ala").state,
    SENT,
    REAL_MS,
  ).state;
  assert.deepEqual(setProgram(running, program).state.program, program);
});

test("setProgram accepts the empty program, both actions without a resource and the ends of the range", async () => {
  const { newGame, setProgram } = await import("../../dist/public/sim/game.js");
  const [resource] = firstMap.resources.map(({ id }) => id);
  const { min, max } = CONDITIONS.hereBelow;
  for (const program of [
    programFromRules(),
    programFromRules(rule(ALWAYS, EXPLORE), rule(ALWAYS, { kind: "wander" })),
    programFromRules(
      rule(below(resource, min), EXPLORE),
      rule(below(resource, max), EXPLORE),
    ),
  ]) {
    assert.deepEqual(setProgram(newGame(), program).state.program, program);
  }
});

test("setProgram rejects a resource id outside the map data list", async () => {
  const { createCharacter, newGame, send, setProgram } =
    await import("../../dist/public/sim/game.js");
  const running = send(
    createCharacter(newGame(), "Ala").state,
    SENT,
    REAL_MS,
  ).state;
  for (const resource of ["granite", "toString", "", undefined]) {
    for (const state of [newGame(), running]) {
      assert.throws(
        () =>
          setProgram(state, programFromRules(rule(ALWAYS, walkTo(resource)))),
        Error,
        `walk to ${resource}`,
      );
      assert.throws(
        () =>
          setProgram(
            state,
            programFromRules(rule(below(resource, 1), EXPLORE)),
          ),
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
    programWithRules("none"),
    programFromRules(null),
    programFromRules({ condition: ALWAYS }),
    programFromRules(rule({ kind: "never" }, EXPLORE)),
    programFromRules(rule(ALWAYS, { kind: "gather" })),
    programFromRules(rule(below(resource, min - 1), EXPLORE)),
    programFromRules(rule(below(resource, max + 1), EXPLORE)),
    programFromRules(rule(below(resource, 1.5), EXPLORE)),
    programFromRules(rule(below(resource, "3"), EXPLORE)),
    programFromRules(rule(below(resource, Number.NaN), EXPLORE)),
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
  const state = setProgram(
    newGame(),
    programFromRules(rule(ALWAYS, EXPLORE)),
  ).state;
  assert.throws(() =>
    setProgram(state, programFromRules(rule(ALWAYS, walkTo("granite")))),
  );
  assert.deepEqual(state.program, programFromRules(rule(ALWAYS, EXPLORE)));
});

test("send rejects a map id not in the data and a character id not in the team", async () => {
  const { createCharacter, newGame, send } =
    await import("../../dist/public/sim/game.js");
  const game = createCharacter(newGame(), "Ala").state;
  for (const ids of [
    { mapId: "nowhere", characterId: 1 },
    { mapId: "toString", characterId: 1 },
    { mapId: undefined, characterId: 1 },
    { mapId: firstMapId, characterId: 2 },
    { mapId: firstMapId, characterId: 0 },
    { mapId: firstMapId, characterId: "1" },
    { mapId: firstMapId, characterId: undefined },
  ]) {
    assert.throws(() => send(game, ids, REAL_MS), Error, JSON.stringify(ids));
  }
  assert.throws(() => send(newGame(), SENT, REAL_MS), Error, "an empty team");
  assert.equal(send(game, SENT, REAL_MS).state.run.mapId, firstMapId);
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
  const program = programFromRules(rule(ALWAYS, { kind: "wander" }));
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

test("each map's solving condition holds a requirement, each a whole number above zero, and Las's is the task's", () => {
  for (const [id, map] of Object.entries(MAPS)) {
    const requirements = Object.entries(map.solving);
    assert.ok(requirements.length >= 1, `map ${id} solving`);
    for (const [kind, value] of requirements) {
      assert.ok(
        Number.isInteger(value) && value > 0,
        `map ${id} solving ${kind} = ${value}`,
      );
    }
  }
  assert.deepEqual(MAPS.forest.solving, { streak: 480 });
  assert.equal(
    MAPS.forest.solvingText,
    "480 minut bez utraty zdrowia od zimna i głodu i bez zmiany programu",
  );
  assert.equal(MAPS.forest.completionText, "Las rozwiązany");
});
