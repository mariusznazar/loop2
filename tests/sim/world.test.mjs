import assert from "node:assert/strict";
import { test } from "node:test";
import { ARCHETYPES } from "../../dist/public/sim/data/archetypes.js";
import { CAMPFIRE } from "../../dist/public/sim/data/campfire.js";
import { ITEMS } from "../../dist/public/sim/data/items.js";
import { MAPS } from "../../dist/public/sim/data/maps.js";
import {
  neighbours,
  offsetToAxial,
  tileAt,
} from "../../dist/public/sim/hex.js";
import { newMapRun, stepMinute } from "../../dist/public/sim/run.js";

// Every expected number below is worked out by hand from the task's numbers: on Las the body
// cools by 0.002 × (37 − 25) = 0.024 °C a minute; a burning campfire warms the character on its
// tile by 0.5 °C a minute and a burning stick by 0.15 °C; the body stops at 37.0 °C. Sticks renew
// one piece every 30 minutes and berries every 40, up to a stock of 12 sticks and 8 berries.

const [mapId, forest] = Object.entries(MAPS)[0];
const archetypeId = Object.keys(ARCHETYPES)[0];
const entrance = offsetToAxial(forest.entrance.col, forest.entrance.row);
const [stick, berry] = forest.resources.map((resource) => resource.id);
const lightable = Object.keys(ITEMS).find((id) => ITEMS[id].lightable);

/** A program with no rules: the character waits on its tile every minute. */
const IDLE = { rules: [] };

const body = (temperature, satiety, health) => ({
  temperature,
  satiety,
  health,
});

/** A map run of Las at minute 0, with the given fields replaced. */
function handMade(fields = {}) {
  const { run } = newMapRun(forest, 3, IDLE, { mapId, archetypeId });
  return { ...run, ...fields };
}

/** The run after `minutes` game minutes, each one step. */
function after(run, minutes) {
  let current = run;
  for (let i = 0; i < minutes; i += 1)
    current = stepMinute(current, forest, IDLE).run;
  return current;
}

const neighbour = () => neighbours(handMade().tiles, entrance)[0].at;

test("Las and its campfire and stick are the ones these numbers are worked out for", () => {
  assert.equal(forest.ambientTemperature, 25);
  assert.equal(CAMPFIRE.warmth, 0.5);
  assert.equal(CAMPFIRE.burnMinutes, 60);
  assert.equal(lightable, stick, "the stick is what can be lit");
  assert.deepEqual(ITEMS[lightable].lightable, {
    burnMinutes: 3,
    warmth: 0.15,
  });
  assert.deepEqual(
    forest.resources
      .slice(0, 2)
      .map(({ id, stock, renewMinutes }) => [id, stock, renewMinutes]),
    [
      [stick, 12, 30],
      [berry, 8, 40],
    ],
  );
});

test("a map run starts with no campfires and nothing burning", () => {
  const run = handMade();
  assert.deepEqual(run.campfires, []);
  assert.deepEqual(run.burningItems, []);
});

test("a campfire with 60 minutes on the character's tile warms in exactly 60 minutes, then is extinguished and stays", () => {
  const start = handMade({
    body: body(5, 100, 100),
    campfires: [{ at: entrance, minutesLeft: 60 }],
  });
  const at1 = after(start, 1);
  assert.equal(at1.body.temperature, 5.476);
  assert.deepEqual(at1.campfires, [{ at: entrance, minutesLeft: 59 }]);

  const at59 = after(at1, 58);
  assert.equal(at59.body.temperature, 33.084);
  assert.deepEqual(at59.campfires, [{ at: entrance, minutesLeft: 1 }]);

  const at60 = after(at59, 1);
  assert.equal(at60.body.temperature, 33.56, "minute 60 is warmed");
  assert.deepEqual(
    at60.campfires,
    [{ at: entrance, minutesLeft: 0 }],
    "extinguished, still on its tile",
  );

  const at61 = after(at60, 1);
  assert.equal(at61.body.temperature, 33.536, "minute 61 only cools");
  assert.deepEqual(at61.campfires, [{ at: entrance, minutesLeft: 0 }]);
});

test("a character at a burning campfire stays at 37.0 °C", () => {
  let run = handMade({ campfires: [{ at: entrance, minutesLeft: 60 }] });
  for (let minute = 1; minute <= 60; minute += 1) {
    run = after(run, 1);
    assert.equal(run.body.temperature, 37, `minute ${minute}`);
  }
  assert.equal(after(run, 1).body.temperature, 36.976);
});

test("the cap of 37.0 °C applies to the warmth of a campfire and a stick together", () => {
  const both = {
    campfires: [{ at: entrance, minutesLeft: 60 }],
    burningItems: [{ item: lightable, at: entrance, minutesLeft: 3 }],
  };
  assert.equal(
    after(handMade({ ...both, body: body(30, 100, 100) }), 1).body.temperature,
    30.626,
  );
  assert.equal(
    after(handMade({ ...both, body: body(36.8, 100, 100) }), 1).body
      .temperature,
    37,
  );
});

test("a stick lit with 3 minutes warms in 3 minutes and is gone", () => {
  const start = handMade({
    body: body(30, 100, 100),
    burningItems: [{ item: lightable, at: entrance, minutesLeft: 3 }],
  });
  const expected = [
    [30.126, [{ item: lightable, at: entrance, minutesLeft: 2 }]],
    [30.252, [{ item: lightable, at: entrance, minutesLeft: 1 }]],
    [30.378, []],
    [30.354, []],
  ];
  let run = start;
  for (const [index, [temperature, burning]] of expected.entries()) {
    run = after(run, 1);
    assert.equal(run.body.temperature, temperature, `minute ${index + 1}`);
    assert.deepEqual(run.burningItems, burning, `minute ${index + 1}`);
  }
});

test("a campfire and a stick on another tile do not warm, and burn down there", () => {
  const away = neighbour();
  const run = after(
    handMade({
      body: body(30, 100, 100),
      campfires: [{ at: away, minutesLeft: 60 }],
      burningItems: [{ item: lightable, at: away, minutesLeft: 3 }],
    }),
    1,
  );
  assert.equal(run.body.temperature, 29.976);
  assert.deepEqual(run.campfires, [{ at: away, minutesLeft: 59 }]);
  assert.deepEqual(run.burningItems, [
    { item: lightable, at: away, minutesLeft: 2 },
  ]);
});

/** Indices of four tiles: two with sticks and berries, one with sticks, one without sticks. */
function renewalTiles(run) {
  const withStick = run.tiles
    .map((tile, index) => [tile, index])
    .filter(([tile]) => stick in tile.stock)
    .map(([, index]) => index);
  const withBerry = run.tiles.findIndex((tile) => berry in tile.stock);
  const withoutStick = run.tiles.findIndex((tile) => !(stick in tile.stock));
  assert.ok(withStick.length >= 3, "three tiles with sticks");
  assert.ok(withBerry >= 0, "a tile with berries");
  assert.ok(withoutStick >= 0, "a tile without sticks");
  return { withStick, withBerry, withoutStick };
}

/** The run with the stock of `resource` on the tile at `index` set to `pieces`. */
function setStock(run, index, resource, pieces) {
  return {
    ...run,
    tiles: run.tiles.map((tile, i) =>
      i === index
        ? { ...tile, stock: { ...tile.stock, [resource]: pieces } }
        : tile,
    ),
  };
}

test("a tile below its stock of sticks gains one piece at minute 30 and none above its stock; a tile at 0 keeps its resource", () => {
  let start = handMade();
  const { withStick, withBerry, withoutStick } = renewalTiles(start);
  const [below, empty, full] = withStick;
  start = setStock(start, below, stick, 10);
  start = setStock(start, empty, stick, 0);
  start = setStock(start, withBerry, berry, 5);
  const sticks = (run) =>
    [below, empty, full].map((index) => run.tiles[index].stock[stick]);
  const berries = (run) => run.tiles[withBerry].stock[berry];

  const at29 = after(start, 29);
  assert.deepEqual(sticks(at29), [10, 0, 12]);
  assert.ok(stick in at29.tiles[empty].stock, "a tile at 0 keeps its sticks");

  const at30 = after(at29, 1);
  assert.deepEqual(sticks(at30), [11, 1, 12]);
  assert.equal(berries(at30), 5, "berries renew every 40 minutes, not 30");
  assert.equal(
    stick in at30.tiles[withoutStick].stock,
    false,
    "a tile without sticks gains none",
  );

  const at39 = after(at30, 9);
  assert.equal(berries(at39), 5);
  const at40 = after(at39, 1);
  assert.equal(berries(at40), 6);

  const at59 = after(at40, 19);
  assert.deepEqual(sticks(at59), [11, 1, 12]);
  const at60 = after(at59, 1);
  assert.deepEqual(sticks(at60), [12, 2, 12]);
  const at90 = after(at60, 30);
  assert.deepEqual(sticks(at90), [12, 3, 12], "none above its stock");
});

test("a resource whose map data gives no time to renew does not renew, while the others renew", () => {
  // A hand-made map: Las with the sticks' time to renew left out of its data.
  const noStickRenewal = {
    ...forest,
    resources: forest.resources.map((resource) => {
      if (resource.id !== stick) return resource;
      const { id, density, stock } = resource;
      return { id, density, stock };
    }),
  };
  const step = (run, minutes) => {
    let current = run;
    for (let i = 0; i < minutes; i += 1)
      current = stepMinute(current, noStickRenewal, IDLE).run;
    return current;
  };
  let start = newMapRun(noStickRenewal, 3, IDLE, { mapId, archetypeId }).run;
  const { withStick, withBerry } = renewalTiles(start);
  const [below, empty] = withStick;
  start = setStock(start, below, stick, 10);
  start = setStock(start, empty, stick, 0);
  start = setStock(start, withBerry, berry, 5);

  for (const [minutes, berries] of [
    [1, 5],
    [30, 5],
    [40, 6],
    [120, 8],
  ]) {
    const run = step(start, minutes);
    assert.deepEqual(
      [run.tiles[below].stock[stick], run.tiles[empty].stock[stick]],
      [10, 0],
      `sticks at minute ${minutes}`,
    );
    assert.equal(
      run.tiles[withBerry].stock[berry],
      berries,
      `berries at minute ${minutes}`,
    );
  }
});

test("in the minute of death nothing burns down and no tile renews", () => {
  // Chilled at 30 °C, health falls by 0.35 a minute: 10.5 reaches 0 in minute 30.
  const { withStick } = renewalTiles(handMade());
  const away = neighbour();
  const start = setStock(
    handMade({
      body: body(30, 100, 10.5),
      campfires: [{ at: away, minutesLeft: 60 }],
      burningItems: [{ item: lightable, at: away, minutesLeft: 40 }],
    }),
    withStick[0],
    stick,
    10,
  );
  const at29 = after(start, 29);
  assert.equal(at29.death, null);
  assert.deepEqual(at29.campfires, [{ at: away, minutesLeft: 31 }]);
  assert.deepEqual(at29.burningItems, [
    { item: lightable, at: away, minutesLeft: 11 },
  ]);
  assert.equal(at29.tiles[withStick[0]].stock[stick], 10);

  const at30 = after(at29, 1);
  assert.deepEqual(at30.death, { minute: 30, cause: "cold" });
  assert.deepEqual(at30.campfires, at29.campfires);
  assert.deepEqual(at30.burningItems, at29.burningItems);
  assert.deepEqual(at30.tiles, at29.tiles);
});

test("an exploring that ends in a minute of renewal reveals its tile and keeps the renewal", () => {
  const { withStick } = renewalTiles(handMade());
  const start = setStock(
    handMade({
      current: {
        activity: { kind: "rule", ruleIndex: 0, action: { kind: "explore" } },
        startMinute: 0,
        endMinute: 30,
        stepTo: null,
      },
    }),
    withStick[0],
    stick,
    10,
  );
  const at30 = after(start, 30);
  assert.equal(tileAt(at30.tiles, entrance).revealed, true);
  assert.equal(at30.tiles[withStick[0]].stock[stick], 11);
});

/** The value frozen at every depth, so any write to it throws. */
function deepFreeze(value) {
  if (value && typeof value === "object") {
    for (const inner of Object.values(value)) deepFreeze(inner);
    Object.freeze(value);
  }
  return value;
}

test("the one-minute step changes no campfire, burning item or tile passed to it", () => {
  const { withStick } = renewalTiles(handMade());
  const run = setStock(
    handMade({
      minute: 29,
      campfires: [
        { at: entrance, minutesLeft: 5 },
        { at: neighbour(), minutesLeft: 0 },
      ],
      burningItems: [{ item: lightable, at: entrance, minutesLeft: 1 }],
      current: {
        activity: { kind: "wait" },
        startMinute: 29,
        endMinute: 31,
        stepTo: null,
      },
    }),
    withStick[0],
    stick,
    10,
  );
  const copy = structuredClone(run);
  const next = stepMinute(deepFreeze(run), forest, IDLE).run;
  assert.deepEqual(run, copy);
  assert.deepEqual(next.campfires, [
    { at: entrance, minutesLeft: 4 },
    { at: neighbour(), minutesLeft: 0 },
  ]);
  assert.deepEqual(next.burningItems, []);
  assert.equal(next.tiles[withStick[0]].stock[stick], 11);
});
