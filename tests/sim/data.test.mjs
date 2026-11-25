import assert from "node:assert/strict";
import { test } from "node:test";
import { MAPS, REGIONS } from "../../dist/browser/sim/data/maps.js";
import { RESOURCES } from "../../dist/browser/sim/data/resources.js";
import { ACTIONS } from "../../dist/browser/sim/data/actions.js";
import { CONDITIONS } from "../../dist/browser/sim/data/conditions.js";
import { ARCHETYPES } from "../../dist/browser/sim/data/archetypes.js";
import { BALANCE, INITIAL_SEED } from "../../dist/browser/sim/data/balance.js";
import { ITEMS } from "../../dist/browser/sim/data/items.js";
import { CAMPFIRE } from "../../dist/browser/sim/data/campfire.js";
import { SKILLS } from "../../dist/browser/sim/data/skills.js";
import { CREATURES } from "../../dist/browser/sim/data/creatures.js";
import { TRAITS } from "../../dist/browser/sim/data/traits.js";
import { programFromRules, programWithRules } from "./program-fixture.mjs";
import { withEdgeSolved } from "./understanding-fixture.mjs";

test("the map Las has the size, entrance, step and resources of D-388", () => {
  // decision: D-388 "Las is a grid of 4 × 4 tiles"
  // decision: D-388 "The resources of both maps, each with its density, its stock per tile and the game minutes to renew one piece"
  // decision: D-388 "These numbers are requirements of the game, held in its data (D-18), that tests of the simulation may expect"
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

test("Skraj lasu has the map data of D-398, no opening map, and opens Las", () => {
  // decision: D-397 "A new game opens the map Skraj lasu, and solving it opens Las"
  // decision: D-398 "Skraj lasu is a grid of 4 × 4 tiles with its entrance fixed at column 1, row 1"
  // decision: D-398 "Its resources are sticks, with density 1, a stock of 12 per tile"
  // decision: D-398 "These numbers are requirements of the game, held in its data (D-18), that tests of the simulation may expect"
  // decision: D-58 "A character's body cools in each game minute outside combat by more, the further the game map's ambient temperature lies below the body's starting temperature, and the ambient temperature stands in the game map's data"
  // decision: D-136 "The condition that solves a map stands in the map's data — a streak, a number of attacks beaten, alone or together — and a map opens when the map its data names as its opener is solved"
  // decision: D-133 "The card of each open map shows the sentence of its solving condition from the map's data"
  assert.deepEqual(MAPS.forestEdge, {
    name: "Skraj lasu",
    region: "Las",
    width: 4,
    height: 4,
    entrance: { col: 1, row: 1 },
    ambientTemperature: 25,
    stepMinutes: 5,
    resources: [
      { id: "stick", density: 1, stock: 12, renewMinutes: 30 },
      { id: "berry", density: 1, stock: 8, renewMinutes: 40 },
    ],
    solving: { streak: 480 },
    solvingText:
      "480 minut bez utraty zdrowia od zimna i głodu i bez zmiany programu",
    goalText: "Osiem godzin bez jednej zmiany programu.",
    completionText: "Skraj lasu rozwiązany",
  });
  assert.equal(MAPS.forest.opensAfter, "forestEdge");
});

test("Las — głębiej has the map data, attacker, solving requirements and opening map of D-388", () => {
  // decision: D-388 "Las is a grid of 4 × 4 tiles"
  // decision: D-388 "The resources of both maps, each with its density, its stock per tile and the game minutes to renew one piece"
  // decision: D-388 "These numbers are requirements of the game, held in its data (D-18), that tests of the simulation may expect"
  // decision: D-58 "A character's body cools in each game minute outside combat by more, the further the game map's ambient temperature lies below the body's starting temperature, and the ambient temperature stands in the game map's data"
  // decision: D-136 "The condition that solves a map stands in the map's data — a streak, a number of attacks beaten, alone or together — and a map opens when the map its data names as its opener is solved"
  // decision: D-133 "The card of each open map shows the sentence of its solving condition from the map's data"
  // decision: D-142 "An attack uses the per-game-minute chance and cooldown in its map's data, with the cooldown counted from the start of the map run and from the end of each encounter; for Las — głębiej the chance is 0.01 and the cooldown protects the full 180 minutes after either point, so the first eligible minute is 181 or E+181 after an encounter ending in E"
  assert.deepEqual(MAPS.forestDeep, {
    name: "Las — głębiej",
    region: "Las",
    width: 5,
    height: 5,
    entrance: null,
    ambientTemperature: 7,
    stepMinutes: 5,
    resources: MAPS.forest.resources,
    attackers: [{ id: "wolf", chancePerMinute: 0.01, cooldownMinutes: 180 }],
    solving: { streak: 540, defeatedAttacks: 2 },
    solvingText:
      "540 minut bez utraty zdrowia od zimna i głodu i bez zmiany programu oraz dwie pokonane napaści wilka",
    goalText: "Dziewięć godzin bez zmiany programu i dwa pokonane wilki.",
    completionText: "Las — głębiej rozwiązany",
    opensAfter: "forest",
  });
});

test("each map's data name its region, and the region stands in the list of regions", () => {
  // decision: D-24 "The region a map belongs to stands in the map's data"
  const regionOf = Object.fromEntries(
    Object.entries(MAPS).map(([id, map]) => [id, map.region]),
  );
  assert.deepEqual(regionOf, {
    forestEdge: "Las",
    forest: "Las",
    forestDeep: "Las",
    forestPack: "Las",
    forestLair: "Las",
  });
  for (const region of Object.values(regionOf)) {
    assert.ok(REGIONS.includes(region), region);
  }
});

test("the maps stand in the order of the chain, each one opened by the one before it", () => {
  // decision: D-136 "The condition that solves a map stands in the map's data — a streak, a number of attacks beaten, alone or together — and a map opens when the map its data names as its opener is solved"
  const ids = Object.keys(MAPS);
  assert.deepEqual(ids, [
    "forestEdge",
    "forest",
    "forestDeep",
    "forestPack",
    "forestLair",
  ]);
  assert.equal(MAPS.forestEdge.opensAfter, undefined);
  for (let at = 1; at < ids.length; at += 1) {
    assert.equal(MAPS[ids[at]].opensAfter, ids[at - 1], ids[at]);
  }
});

test("Las — wataha is a map of wolf attacks that Las — głębiej opens and a streak with beaten attacks solves", () => {
  // decision: D-24 "A map is a grid of hexagonal tiles whose dimensions, entrance — fixed, or drawn by the map run —, cost of a move, attacking creatures with how often they attack, and resources stand in the map's data"
  // decision: D-136 "The condition that solves a map stands in the map's data — a streak, a number of attacks beaten, alone or together"
  const pack = MAPS.forestPack;
  assert.equal(pack.name, "Las — wataha");
  assert.equal(pack.opensAfter, "forestDeep");
  assert.deepEqual(
    pack.attackers.map((attacker) => attacker.id),
    ["wolf"],
  );
  assert.ok(pack.solving.streak > 0, "a streak");
  assert.ok(pack.solving.defeatedAttacks > 0, "attacks to beat");
  assert.equal(pack.completionText, "Las — wataha rozwiązany");
});

test("Las — matecznik is a map of the bear with an entry cap of 0, that Las — wataha opens, and its data name the bear for the record of damage", () => {
  // decision: D-24 "A map is a grid of hexagonal tiles whose dimensions, entrance — fixed, or drawn by the map run —, cost of a move, attacking creatures with how often they attack, and resources stand in the map's data"
  // decision: D-136 "The condition that solves a map stands in the map's data — a streak, a number of attacks beaten, alone or together"
  // decision: D-438 "Las — matecznik is excepted from that rule until the change that sets its numbers, its entry cap included"
  const lair = MAPS.forestLair;
  assert.equal(lair.name, "Las — matecznik");
  assert.equal(lair.opensAfter, "forestPack");
  assert.equal(lair.carryIn, 0);
  assert.deepEqual(
    lair.attackers.map((attacker) => attacker.id),
    ["bear"],
  );
  assert.ok(lair.solving.streak > 0, "a streak");
  assert.ok(lair.solving.defeatedAttacks > 0, "attacks to beat");
  assert.equal(lair.completionText, "Las — matecznik rozwiązany");
  assert.equal(lair.recordCreature, "bear");
});

test("a map that names a creature for the record of damage has that creature among its attackers", () => {
  const named = Object.entries(MAPS).filter(([, map]) => map.recordCreature);
  assert.ok(named.length > 0, "precondition: a map names one");
  for (const [id, map] of named) {
    assert.ok(
      map.attackers.some((attacker) => attacker.id === map.recordCreature),
      id,
    );
    assert.ok(map.recordCreature in CREATURES, id);
  }
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
  // decision: D-128 "What reveals each action, item, condition and creature of the game stands in the data files beside that action, item, condition or creature, as one of the kinds of revealing event the simulation handles, such as the first chill, the first gathered piece of an item or an attack naming its creature, and a condition or an action the Understanding holds from the start of a new game has none there"
  assert.deepEqual(ACTIONS.explore, {
    label: "Eksploruj",
    group: "move",
    status: "Eksploruje",
    minutes: 20,
    icon: "binoculars",
    iconTitle: "Binoculars icon",
  });
  assert.deepEqual(ACTIONS.wander, {
    label: "Wędruj",
    group: "move",
    status: "Wędruje",
    minutes: null,
    revealedBy: { kind: "chilled" },
    icon: "hiking",
    iconTitle: "Hiking icon",
  });
  assert.deepEqual(ACTIONS.walkTo, {
    label: "Idź",
    group: "move",
    status: "Idzie po",
    minutes: null,
    revealedBy: { kind: "explored" },
    icon: "direction-sign",
    iconTitle: "Direction sign icon",
  });
});

test("combat actions carry the accepted damage, item requirement and attack revelation", () => {
  // decision: D-128 "What reveals each action, item, condition and creature of the game stands in the data files beside that action, item, condition or creature, as one of the kinds of revealing event the simulation handles, such as the first chill, the first gathered piece of an item or an attack naming its creature"
  // decision: D-143 "The first wolf attack brings the wolf, „Uderz — patyk”, „Kopnij”, „Odskocz”, „Zdrowie poniżej” and „Przeciwnik ma poniżej” into the Understanding, with the game paused after the attack minute and before the first combat turn"
  // decision: D-144 "The character uses „Uderz — patyk”, which requires a stick in the backpack and deals a base 6 damage increased by its bought branch ranks, „Kopnij”, which deals a base 3 damage increased by its bought branch ranks and needs neither an item nor a target, and „Odskocz”, which sets one pending reduction of a base 5 damage increased by its bought branch ranks for the next damaging enemy strike"
  assert.deepEqual(ACTIONS.strikeWithStick, {
    label: "Uderz — patyk",
    group: "foodAndCombat",
    status: "Uderza patykiem",
    minutes: null,
    revealedBy: { kind: "attacked", creature: "wolf" },
    combat: { damage: 6, item: "stick" },
    icon: "deadly-strike",
    iconTitle: "Deadly strike icon",
  });
  assert.deepEqual(ACTIONS.kick, {
    label: "Kopnij",
    group: "foodAndCombat",
    status: "Kopie",
    minutes: null,
    revealedBy: { kind: "attacked", creature: "wolf" },
    combat: { damage: 3 },
    icon: "boot-kick",
    iconTitle: "Boot kick icon",
  });
  assert.deepEqual(ACTIONS.dodge, {
    label: "Odskocz",
    group: "foodAndCombat",
    status: "Odskakuje",
    minutes: null,
    revealedBy: { kind: "attacked", creature: "wolf" },
    combat: { reducesNextDamageBy: 5 },
    icon: "dodge",
    iconTitle: "Dodge icon",
  });
});

test("the wolf has its icon, 24 health, bites for 7 and keeps its ordered combat rules", () => {
  // decision: D-128 "What reveals each action, item, condition and creature of the game stands in the data files beside that action, item, condition or creature, as one of the kinds of revealing event the simulation handles, such as the first chill, the first gathered piece of an item or an attack naming its creature"
  // decision: D-140 "A creature acts by pairs of condition and action kept in its data, of the same form as program rules"
  // decision: D-143 "The first wolf attack brings the wolf, „Uderz — patyk”, „Kopnij”, „Odskocz”, „Zdrowie poniżej” and „Przeciwnik ma poniżej” into the Understanding, with the game paused after the attack minute and before the first combat turn"
  // decision: D-416 "Each thing of the Understanding on the screen stands with its icon from the game's data and its name, and a creature has its icon in the data"
  // decision: D-144 "The wolf has 24 health and a strike of 7 damage, follows „Zdrowie poniżej 8 → Odskocz; Zawsze → Uderz”, and its dodge gives up its action with no protection"
  assert.deepEqual(CREATURES.wolf, {
    name: "wilk",
    nameWith: "wilkiem",
    icon: "wolf-head",
    iconTitle: "Wolf head icon",
    revealedBy: { kind: "attacked", creature: "wolf" },
    health: 24,
    strikeDamage: 7,
    rules: [
      {
        condition: { kind: "healthBelow", value: 8 },
        action: { kind: "dodge" },
      },
      { condition: { kind: "always" }, action: { kind: "strike" } },
    ],
  });
});

test("the bear has its icon, 120 health, strikes for 20 and keeps one rule, a strike", () => {
  // decision: D-128 "What reveals each action, item, condition and creature of the game stands in the data files beside that action, item, condition or creature, as one of the kinds of revealing event the simulation handles, such as the first chill, the first gathered piece of an item or an attack naming its creature"
  // decision: D-140 "A creature acts by pairs of condition and action kept in its data, of the same form as program rules"
  // decision: D-416 "Each thing of the Understanding on the screen stands with its icon from the game's data and its name, and a creature has its icon in the data"
  assert.deepEqual(CREATURES.bear, {
    name: "niedźwiedź",
    nameWith: "niedźwiedziem",
    icon: "bear-head",
    iconTitle: "Bear head icon",
    revealedBy: { kind: "attacked", creature: "bear" },
    health: 120,
    strikeDamage: 20,
    rules: [{ condition: { kind: "always" }, action: { kind: "strike" } }],
  });
});

// D-290: the group of each action and the section and place of each condition in the pick of the
// rule panel, written out in the order the pick shows them.
test("each action names its group and each condition its section and place in the pick", () => {
  // decision: D-290 "The pick of the rule panel sets the actions in five named groups"
  // decision: D-290 "It sets the conditions in two columns, in sections with no names set apart by a line"
  assert.deepEqual(
    Object.entries(ACTIONS).map(([id, action]) => [id, action.group]),
    [
      ["explore", "move"],
      ["wander", "move"],
      ["walkTo", "move"],
      ["walkToCampfire", "move"],
      ["gather", "gather"],
      ["patrol", "gather"],
      ["craftCampfire", "fire"],
      ["lightCampfire", "fire"],
      ["lightItem", "fire"],
      ["feedCampfire", "fire"],
      ["eat", "foodAndCombat"],
      ["tend", "foodAndCombat"],
      ["strikeWithStick", "foodAndCombat"],
      ["kick", "foodAndCombat"],
      ["dodge", "foodAndCombat"],
      ["craft", "crafting"],
    ],
  );
  const written = {
    always: ["start", 1],
    temperatureBelow: ["body", 1],
    satietyBelow: ["body", 2],
    healthBelow: ["body", 3],
    natureEnergyBelow: ["body", 4],
    itemBelow: ["world", 1],
    hereBelow: ["world", 2],
    campfireLeftBelow: ["world", 3],
    awayFromCampfire: ["world", 4],
    opponentHealthBelow: ["opponent", 1],
  };
  assert.deepEqual(
    Object.fromEntries(
      Object.entries(CONDITIONS).map(([id, def]) => [
        id,
        [def.section, def.place],
      ]),
    ),
    written,
  );
});

test("conditions carry labels and the value range of hereBelow", () => {
  // decision: D-376 "A condition that takes a number accepts it from a minimum to a maximum, both included, on a step counted from the minimum, and holds while the value it reads is below the number and not at it"
  // decision: D-128 "What reveals each action, item, condition and creature of the game stands in the data files beside that action, item, condition or creature, as one of the kinds of revealing event the simulation handles, such as the first chill, the first gathered piece of an item or an attack naming its creature"
  assert.equal(CONDITIONS.always.label, "Zawsze");
  assert.deepEqual(CONDITIONS.hereBelow, {
    label: "Tu leży mniej niż",
    section: "world",
    place: 2,
    revealedBy: { kind: "explored" },
    unit: "szt.",
    defaultValue: 1,
    min: 0,
    max: 50,
    step: 1,
  });
});

test("each condition that takes a number carries its unit, and a condition that takes none carries no unit", () => {
  // decision: D-376 "A condition that takes a number accepts it from a minimum to a maximum, both included, on a step counted from the minimum, and holds while the value it reads is below the number and not at it"
  const numberFields = ["defaultValue", "min", "max", "step"];
  for (const [id, condition] of Object.entries(CONDITIONS)) {
    if (numberFields.some((field) => field in condition)) {
      for (const field of numberFields) {
        assert.ok(
          field in condition,
          `${id} takes a number but lacks ${field}`,
        );
      }
      assert.equal(
        typeof condition.unit,
        "string",
        `${id} takes a number without a unit`,
      );
      assert.notEqual(condition.unit, "", `${id} has an empty unit`);
    } else {
      assert.equal(
        "unit" in condition,
        false,
        `${id} has a unit but takes no number`,
      );
    }
  }
});

test("health conditions use the approved thresholds and are revealed by an attack", () => {
  // decision: D-376 "„Zdrowie poniżej” and „Przeciwnik ma poniżej” take the numbers D-151 gives"
  // decision: D-128 "What reveals each action, item, condition and creature of the game stands in the data files beside that action, item, condition or creature, as one of the kinds of revealing event the simulation handles, such as the first chill, the first gathered piece of an item or an attack naming its creature"
  // decision: D-143 "The first wolf attack brings the wolf, „Uderz — patyk”, „Kopnij”, „Odskocz”, „Zdrowie poniżej” and „Przeciwnik ma poniżej” into the Understanding, with the game paused after the attack minute and before the first combat turn"
  // decision: D-151 "The condition „Zdrowie poniżej” compares the acting side’s current health points, and „Przeciwnik ma poniżej” compares its opponent’s current health points, with strict less-than comparison; both offer 0–100 in steps of 1, with defaults 50 and 10 respectively"
  assert.deepEqual(CONDITIONS.healthBelow, {
    label: "Zdrowie poniżej",
    section: "body",
    place: 3,
    revealedBy: { kind: "attacked", creature: "wolf" },
    unit: "pkt",
    defaultValue: 50,
    min: 0,
    max: 100,
    step: 1,
  });
  assert.deepEqual(CONDITIONS.opponentHealthBelow, {
    label: "Przeciwnik ma poniżej",
    section: "opponent",
    place: 1,
    revealedBy: { kind: "attacked", creature: "wolf" },
    unit: "pkt",
    defaultValue: 10,
    min: 0,
    max: 100,
    step: 1,
  });
});

test("Las has an ambient temperature of 25 degrees in its map data", () => {
  // decision: D-388 "Las is a grid of 4 × 4 tiles"
  // decision: D-388 "These numbers are requirements of the game, held in its data (D-18), that tests of the simulation may expect"
  // decision: D-58 "A character's body cools in each game minute outside combat by more, the further the game map's ambient temperature lies below the body's starting temperature, and the ambient temperature stands in the game map's data"
  assert.equal(MAPS.forest.ambientTemperature, 25);
  for (const [id, map] of Object.entries(MAPS)) {
    assert.equal(typeof map.ambientTemperature, "number", id);
  }
});

test("the body starts at its caps, with the rates and thresholds of D-387", () => {
  // decision: D-387 "These numbers are requirements of the game, held in its data (D-18), that tests of the simulation may expect"
  // decision: D-387 "A gathering lasts 10 game minutes and succeeds with the chance 0.7"
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

test("the cooling in Las is 0.024 degrees a minute: 0.002 × (37 − 25)", () => {
  // decision: D-387 "These numbers are requirements of the game, held in its data (D-18), that tests of the simulation may expect"
  const { startTemperature, coolingPerDegreeBelow } = BALANCE.body;
  const perMinute =
    (startTemperature - MAPS.forest.ambientTemperature) * coolingPerDegreeBelow;
  assert.ok(Math.abs(perMinute - 0.024) < 1e-9, String(perMinute));
});

test("a new character's traits hold carrying capacity 15, apart from the archetype", () => {
  // decision: D-64 "Carrying capacity is 15 pieces"
  // decision: D-192 "A number that acts in one action only belongs to the tree of that action's character skill, never to a trait"
  assert.deepEqual(TRAITS, { carryingCapacity: 15 });
  for (const archetype of Object.values(ARCHETYPES)) {
    assert.ok(!("carryingCapacity" in archetype));
  }
});

// The minutes a stick adds as fuel and burns when lit, its warmth and the satiety of a berry are
// those of D-387.
test("the items are the four resources of Las and the bandage, with their words and their uses", () => {
  // decision: D-387 "Making a campfire lasts 20 game minutes and uses 6 sticks"
  // decision: D-443 "An action is a verb with a target, and the targets a verb takes follow from the properties of the items in the game's data"
  assert.deepEqual(Object.keys(ITEMS), [
    "stick",
    "berry",
    "moss",
    "fiber",
    "bandage",
  ]);
  assert.deepEqual(ITEMS.stick, {
    name: "patyk",
    plural: { few: "patyki", many: "patyków" },
    icon: "wood-stick",
    iconTitle: "Wood stick icon",
    revealedBy: { kind: "tileHolds", item: "stick" },
    fuel: { burnMinutes: 20 },
    lightable: { burnMinutes: 3, warmth: 0.15 },
  });
  assert.deepEqual(ITEMS.berry, {
    name: "jagoda",
    plural: { few: "jagody", many: "jagód" },
    icon: "berry-bush",
    iconTitle: "Berry bush icon",
    revealedBy: { kind: "tileHolds", item: "berry" },
    food: { satiety: 25 },
  });
  assert.deepEqual(ITEMS.moss, {
    name: "mech",
    plural: { few: "mchy", many: "mchów" },
    icon: "fern",
    iconTitle: "Fern icon",
    revealedBy: { kind: "tileHolds", item: "moss" },
  });
  assert.deepEqual(ITEMS.fiber, {
    name: "włókno",
    plural: { few: "włókna", many: "włókien" },
    icon: "flax",
    iconTitle: "Flax icon",
    revealedBy: { kind: "tileHolds", item: "fiber" },
  });
  // The bandage's numbers of its recipe and its healing are balance figures, read from its row by
  // shape here; the row holds them, and a change of the data alone changes them.
  const { recipe, healing, ...words } = ITEMS.bandage;
  assert.deepEqual(words, {
    name: "opatrunek",
    plural: { few: "opatrunki", many: "opatrunków" },
    icon: "first-aid-kit",
    iconTitle: "First aid kit icon",
    revealedBy: { kind: "gathered", item: "moss" },
  });
  assert.ok(recipe.uses.some((use) => use.item === "moss"));
  for (const use of recipe.uses)
    assert.ok(
      Number.isInteger(use.count) && use.count >= 1,
      `count ${use.count}`,
    );
  assert.ok(
    Number.isInteger(recipe.minutes) && recipe.minutes >= 1,
    `minutes ${recipe.minutes}`,
  );
  assert.ok(
    typeof healing.health === "number" && healing.health > 0,
    `health ${healing.health}`,
  );
});

test("the bandage is no resource and lies on no map", () => {
  // decision: D-443 "An action is a verb with a target, and the targets a verb takes follow from the properties of the items in the game's data"
  assert.equal("bandage" in RESOURCES, false);
  for (const [id, map] of Object.entries(MAPS))
    for (const entry of map.resources)
      assert.notEqual(entry.id, "bandage", `map ${id} lays the bandage`);
});

test("every recipe uses at least one piece of an item of the data, and every healing property is a positive number", () => {
  // decision: D-443 "An action is a verb with a target, and the targets a verb takes follow from the properties of the items in the game's data"
  for (const [id, item] of Object.entries(ITEMS)) {
    if (item.recipe !== undefined) {
      assert.ok(item.recipe.uses.length >= 1, `${id} recipe uses no piece`);
      for (const use of item.recipe.uses) {
        assert.ok(use.item in ITEMS, `${id} recipe uses ${use.item}`);
        assert.ok(
          Number.isInteger(use.count) && use.count >= 1,
          `${id} recipe count ${use.count}`,
        );
      }
      assert.ok(
        Number.isInteger(item.recipe.minutes) && item.recipe.minutes >= 1,
        `${id} recipe minutes ${item.recipe.minutes}`,
      );
    }
    if (item.healing !== undefined)
      assert.ok(
        typeof item.healing.health === "number" && item.healing.health > 0,
        `${id} healing ${item.healing.health}`,
      );
  }
});

// The sticks to craft and to light a campfire, its minutes of burning and its warmth are those of
// D-387.
test("the campfire holds its name, costs, burning minutes, warmth and icon", () => {
  // decision: D-387 "Making a campfire lasts 20 game minutes and uses 6 sticks"
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
    extinguished: {
      name: "ognisko wygasłe",
      icon: "wood-pile",
      iconTitle: "Wood Pile icon",
    },
  });
});

test("every item of a resource takes its words from the resource, and every item of the campfire names an item of the data", () => {
  // The bandage is the one item that no resource gives its words to (D-443, D-121).
  for (const [id, item] of Object.entries(ITEMS)) {
    if (id === "bandage") continue;
    assert.ok(id in RESOURCES, `item ${id} is a resource of the data`);
    for (const word of ["name", "plural", "icon", "iconTitle"])
      assert.deepEqual(item[word], RESOURCES[id][word], `${id} ${word}`);
  }
  for (const resource of MAPS.forest.resources) assert.ok(resource.id in ITEMS);
  assert.ok(CAMPFIRE.craft.item in ITEMS);
  assert.ok(CAMPFIRE.light.item in ITEMS);
});

// D-190: the resurrection has three uses, and one used use returns after four hours, 240 real
// minutes. Real minutes, not game minutes.
test("the resurrection holds 3 uses and one returns 240 real minutes after the clock started", () => {
  // decision: D-190 "The account has one resurrection, shared by all its characters, held as numbers of the account, no item of any backpack, equipment or chest: a number of uses and the span of real time after which one used use returns, both set in the balance data, 3 uses and 4 hours to start."
  assert.equal(BALANCE.resurrectionUses, 3);
  assert.equal(BALANCE.resurrectionRenewalRealMinutes, 240);
});

// D-18, D-239: one game minute of an earning loop is 60 real seconds, a whole number from 1 up so
// that every real moment of the loop clock stays a whole number of milliseconds; the speed control
// does not reach it.
test("an earning loop goes one game minute in 60 real seconds, a whole number of seconds", () => {
  // decision: D-239 "An earning loop goes only on a solved map, one game minute per real minute, and the speed control does not reach it, while a manual map run may be fast-forwarded"
  assert.ok(
    Number.isInteger(BALANCE.loopMinuteRealSeconds) &&
      BALANCE.loopMinuteRealSeconds >= 1,
  );
  assert.equal(BALANCE.loopMinuteRealSeconds, 60);
});

test("the archetype and the pace are in data", () => {
  // decision: D-21 "A map run the player starts passes at one game minute per real second times the pace the player picks of 1×, 2×, 4×, 8× and 16×"
  assert.equal(ARCHETYPES.elementalMage.name, "Mag żywiołów");
  assert.equal(BALANCE.gameMinutesPerRealSecond, 1);
  // D-21: the paces 1×, 2×, 4×, 8× and 16×.
  assert.deepEqual(BALANCE.paces, [1, 2, 4, 8, 16]);
  assert.equal(BALANCE.waitMinutes, 1);
  assert.equal(INITIAL_SEED, 1);
});

// The expectations below come from D-118, D-120, D-121 and D-195.

test("the character skills grow the listed pairs of verb and target, and the walks stand in none", () => {
  // decision: D-63 "A mage lights a campfire and a stick with the spell Płomyk: the actions „Zapal — ognisko” and „Zapal — patyk”"
  // decision: D-120 "An action that no character skill grows, such as a move onto a neighbouring tile"
  // decision: D-150 "„Uderz — patyk” grows „Walka bronią jednoręczną”, „Kopnij” grows „Kopanie”, and „Odskocz” grows „Unik przed ciosem”, all present among the elemental mage’s predispositions"
  // D-120: the character skills and the action pairs each one grows.
  assert.deepEqual(
    Object.values(SKILLS).map((skill) => [skill.name, skill.actions]),
    [
      ["Eksploracja", ["explore"]],
      ["Zbieranie małych przedmiotów", ["gather", "patrol"]],
      ["Wytwarzanie ogniska", ["craftCampfire", "feedCampfire"]],
      ["Jedzenie", ["eat"]],
      ["Rzucanie czaru Płomyk", ["lightCampfire", "lightItem"]],
      ["Walka bronią jednoręczną", ["strikeWithStick"]],
      ["Kopanie", ["kick"]],
      ["Unik przed ciosem", ["dodge"]],
    ],
  );
  const grown = Object.values(SKILLS).flatMap((skill) => skill.actions);
  assert.equal(new Set(grown).size, grown.length, "an action in two skills");
  const free = Object.keys(ACTIONS).filter((id) => !grown.includes(id));
  assert.deepEqual(free, [
    "wander",
    "walkTo",
    "walkToCampfire",
    "tend",
    "craft",
  ]);
});

test("the elemental mage has all listed skills as predispositions", () => {
  // decision: D-150 "„Uderz — patyk” grows „Walka bronią jednoręczną”, „Kopnij” grows „Kopanie”, and „Odskocz” grows „Unik przed ciosem”, all present among the elemental mage’s predispositions"
  // The created archetype admits every listed character skill.
  assert.deepEqual(
    [...ARCHETYPES.elementalMage.predispositions].sort(),
    Object.keys(SKILLS).sort(),
  );
  assert.equal(Object.keys(SKILLS).length, 8);
});

test("the tree of Eksploracja, whose first action is held from the start, is revealed by the first finished exploration, and no other tree has an event of its own", () => {
  // decision: D-195 "A character skill tree with all its branches enters the Understanding in the game minute in which the player discovers the first action grown by that skill, together with any action a branch of that tree opens, and a tree whose first action the Understanding holds from the start enters with the first finished action of that skill"
  // D-195: every other tree enters with the first action it grows.
  assert.deepEqual(SKILLS.exploration.revealedBy, { kind: "explored" });
  assert.deepEqual(
    Object.keys(SKILLS).filter((id) => "revealedBy" in SKILLS[id]),
    ["exploration"],
  );
});

/** The rows of D-121, by the revealing event: what each reveals. */
const ROWS = [
  {
    event: { kind: "chilled" },
    actions: ["wander"],
    conditions: ["temperatureBelow"],
    items: [],
  },
  {
    // An item enters with the revealed tile that holds it.
    event: { kind: "explored" },
    actions: ["walkTo", "gather"],
    conditions: ["hereBelow", "itemBelow"],
    items: [],
  },
  {
    event: { kind: "gathered", item: "stick" },
    actions: ["craftCampfire", "lightCampfire", "lightItem"],
    conditions: [],
    items: [],
    campfire: true,
  },
  {
    event: { kind: "campfireCrafted" },
    actions: ["walkToCampfire"],
    conditions: ["campfireLeftBelow", "awayFromCampfire"],
    items: [],
  },
  {
    event: { kind: "lit" },
    actions: ["feedCampfire"],
    conditions: ["natureEnergyBelow"],
    items: [],
  },
  {
    event: { kind: "gathered", item: "berry" },
    actions: ["eat"],
    conditions: ["satietyBelow"],
    items: [],
  },
  {
    // D-121: the first gathered moss brings the bandage and „Wytwórz”.
    event: { kind: "gathered", item: "moss" },
    actions: ["craft"],
    conditions: [],
    items: ["bandage"],
  },
  {
    // D-121: the first piece of the bandage crafted brings „Opatrz”.
    event: { kind: "crafted", item: "bandage" },
    actions: ["tend"],
    conditions: [],
    items: [],
  },
  {
    // The first creature attack reveals the combat health conditions.
    event: { kind: "attacked", creature: "wolf" },
    actions: ["strikeWithStick", "kick", "dodge"],
    conditions: ["healthBelow", "opponentHealthBelow"],
    items: [],
  },
  {
    // D-195: the action is discovered with its tree.
    event: { kind: "treeDiscovered", skill: "smallItemGathering" },
    actions: ["patrol"],
    conditions: [],
    items: [],
  },
  ...["stick", "berry", "moss", "fiber"].map((item) => ({
    // Each item with the revealed tile that holds it.
    event: { kind: "tileHolds", item },
    actions: [],
    conditions: [],
    items: [item],
  })),
];

test("each revealing event reveals exactly the actions, conditions and items of its row", () => {
  // decision: D-121 "The first game minute in which a character is chilled brings „Wędruj” and the condition „Temperatura poniżej”, and the first finished exploration brings „Idź”, „Zbierz”, the conditions „Tu leży mniej niż” and „Zapas poniżej” and the items lying on the tile it reveals"
  // decision: D-121 "The first gathered stick brings „Wytwórz — ognisko”, „Zapal — ognisko”, „Zapal — patyk” and the campfire, the first crafted campfire brings „Idź — ognisko” and the conditions „Zostało mniej niż — ognisko” and „Z dala od — ognisko”, the first finished „Zapal”, of a campfire or of a stick, brings „Zasil — ognisko” and the condition „Energia natury poniżej”, and the first gathered berry brings „Zjedz — jagoda” and the condition „Sytość poniżej”"
  // decision: D-128 "What reveals each action, item, condition and creature of the game stands in the data files beside that action, item, condition or creature, as one of the kinds of revealing event the simulation handles, such as the first chill, the first gathered piece of an item or an attack naming its creature"
  // decision: D-143 "The first wolf attack brings the wolf, „Uderz — patyk”, „Kopnij”, „Odskocz”, „Zdrowie poniżej” and „Przeciwnik ma poniżej” into the Understanding, with the game paused after the attack minute and before the first combat turn"
  // decision: D-195 "A character skill tree with all its branches enters the Understanding in the game minute in which the player discovers the first action grown by that skill, together with any action a branch of that tree opens, and a tree whose first action the Understanding holds from the start enters with the first finished action of that skill"
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

test("every action and condition stands in exactly one row, and Zawsze and Eksploruj in none", () => {
  // decision: D-118 "The condition „Zawsze” and the action „Eksploruj” are in the Understanding from the start of a new game; every other action, item, condition, creature and branch enters the Understanding only when discovered in play, each by the need, action, item or encounter that reveals it"
  // decision: D-128 "What reveals each action, item, condition and creature of the game stands in the data files beside that action, item, condition or creature, as one of the kinds of revealing event the simulation handles, such as the first chill, the first gathered piece of an item or an attack naming its creature, and a condition or an action the Understanding holds from the start of a new game has none there"
  // D-121 is the table; D-118: „Zawsze” and „Eksploruj” are known from the start.
  const revealing = (def) =>
    ROWS.filter(
      (row) => JSON.stringify(row.event) === JSON.stringify(def.revealedBy),
    );
  for (const [id, action] of Object.entries(ACTIONS)) {
    if (id === "explore") continue;
    assert.equal(revealing(action).length, 1, `action ${id}`);
  }
  for (const [id, condition] of Object.entries(CONDITIONS)) {
    if (id === "always") continue;
    assert.equal(revealing(condition).length, 1, `condition ${id}`);
  }
  assert.ok(!("revealedBy" in CONDITIONS.always));
  assert.ok(!("revealedBy" in ACTIONS.explore));
  const tableActions = ROWS.flatMap((row) => row.actions);
  const tableConditions = ROWS.flatMap((row) => row.conditions);
  assert.deepEqual(
    [...tableActions].sort(),
    Object.keys(ACTIONS)
      .filter((id) => id !== "explore")
      .sort(),
  );
  assert.deepEqual(
    [...tableConditions].sort(),
    Object.keys(CONDITIONS)
      .filter((id) => id !== "always")
      .sort(),
  );
});

test("the campfire is revealed by the first gathered stick and has an identifier outside the items", () => {
  // decision: D-121 "The first gathered stick brings „Wytwórz — ognisko”, „Zapal — ognisko”, „Zapal — patyk” and the campfire, the first crafted campfire brings „Idź — ognisko” and the conditions „Zostało mniej niż — ognisko” and „Z dala od — ognisko”, the first finished „Zapal”, of a campfire or of a stick, brings „Zasil — ognisko” and the condition „Energia natury poniżej”, and the first gathered berry brings „Zjedz — jagoda” and the condition „Sytość poniżej”"
  // decision: D-128 "What reveals each action, item, condition and creature of the game stands in the data files beside that action, item, condition or creature, as one of the kinds of revealing event the simulation handles, such as the first chill, the first gathered piece of an item or an attack naming its creature"
  // D-121: the first gathered stick reveals the campfire.
  assert.deepEqual(CAMPFIRE.revealedBy, { kind: "gathered", item: "stick" });
  assert.equal(CAMPFIRE.id, "campfire");
  assert.ok(!(CAMPFIRE.id in ITEMS));
  assert.deepEqual(Object.keys(ITEMS), [
    "stick",
    "berry",
    "moss",
    "fiber",
    "bandage",
  ]);
});

// Validation of ids and programs against the data: the ids come from the data files.
const forestId = "forest";
const forestMap = MAPS[forestId];
// The first character a new game creates takes the id 1.
const SENT = { mapId: forestId, characterId: 1 };
const REAL_MS = 1760000000000;
const ALWAYS = { kind: "always" };
const EXPLORE = { kind: "explore" };
const rule = (condition, action) => ({ condition, action });
const below = (resource, value) => ({ kind: "hereBelow", resource, value });
const walkTo = (resource) => ({ kind: "walkTo", resource });

/** The program a game state holds: the copy during a map run, else the only program of the list. */
function heldProgram(state) {
  return state.run === null
    ? state.programs[0].program
    : state.run.copy.program;
}

test("setProgram accepts every resource of the map data list, in conditions and in walks", async () => {
  const { createCharacter, newGame, send, setProgram } =
    await import("../../dist/browser/sim/game.js");
  const rules = forestMap.resources.flatMap(({ id }) => [
    rule(below(id, 3), EXPLORE),
    rule(ALWAYS, walkTo(id)),
  ]);
  const program = programFromRules(...rules);
  assert.deepEqual(heldProgram(setProgram(newGame(), program).state), program);
  const running = send(
    createCharacter(withEdgeSolved(newGame()), "Ala").state,
    SENT,
    REAL_MS,
  ).state;
  assert.deepEqual(heldProgram(setProgram(running, program).state), program);
});

test("setProgram accepts the empty program, both actions without a resource and the ends of the range", async () => {
  // decision: D-376 "A condition that takes a number accepts it from a minimum to a maximum, both included, on a step counted from the minimum, and holds while the value it reads is below the number and not at it"
  const { newGame, setProgram } =
    await import("../../dist/browser/sim/game.js");
  const [resource] = forestMap.resources.map(({ id }) => id);
  const { min, max } = CONDITIONS.hereBelow;
  for (const program of [
    programFromRules(),
    programFromRules(rule(ALWAYS, EXPLORE), rule(ALWAYS, { kind: "wander" })),
    programFromRules(
      rule(ALWAYS, { kind: "strikeWithStick" }),
      rule(ALWAYS, { kind: "kick" }),
      rule(ALWAYS, { kind: "dodge" }),
    ),
    programFromRules(
      rule(below(resource, min), EXPLORE),
      rule(below(resource, max), EXPLORE),
    ),
  ]) {
    assert.deepEqual(
      heldProgram(setProgram(newGame(), program).state),
      program,
    );
  }
});

test("setProgram rejects a resource id outside the map data list", async () => {
  const { createCharacter, newGame, send, setProgram } =
    await import("../../dist/browser/sim/game.js");
  const running = send(
    createCharacter(withEdgeSolved(newGame()), "Ala").state,
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
  // decision: D-376 "The program check refuses a number that is no finite number, lies outside the range or off the step"
  const { newGame, setProgram } =
    await import("../../dist/browser/sim/game.js");
  const [resource] = forestMap.resources.map(({ id }) => id);
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
  const { newGame, setProgram } =
    await import("../../dist/browser/sim/game.js");
  const state = setProgram(
    newGame(),
    programFromRules(rule(ALWAYS, EXPLORE)),
  ).state;
  assert.throws(() =>
    setProgram(state, programFromRules(rule(ALWAYS, walkTo("granite")))),
  );
  assert.deepEqual(heldProgram(state), programFromRules(rule(ALWAYS, EXPLORE)));
});

test("send rejects a map id not in the data and a character id not in the team", async () => {
  const { createCharacter, newGame, send } =
    await import("../../dist/browser/sim/game.js");
  const game = createCharacter(withEdgeSolved(newGame()), "Ala").state;
  for (const ids of [
    { mapId: "nowhere", characterId: 1 },
    { mapId: "toString", characterId: 1 },
    { mapId: undefined, characterId: 1 },
    { mapId: forestId, characterId: 2 },
    { mapId: forestId, characterId: 0 },
    { mapId: forestId, characterId: "1" },
    { mapId: forestId, characterId: undefined },
  ]) {
    assert.throws(() => send(game, ids, REAL_MS), Error, JSON.stringify(ids));
  }
  assert.throws(() => send(newGame(), SENT, REAL_MS), Error, "an empty team");
  assert.equal(send(game, SENT, REAL_MS).state.run.mapId, forestId);
});

// Every activity must last at least one game minute (D-18: a map can be added through data alone).
test("every map step and every fixed action duration is a whole number of minutes, at least 1", () => {
  const durations = [
    ...Object.entries(MAPS).map(([id, map]) => [
      `map ${id} stepMinutes`,
      map.stepMinutes,
    ]),
    ...Object.entries(ACTIONS)
      .filter(([, action]) => typeof action.minutes === "number")
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
  // decision: D-18 "The game's content — game maps, items, creatures, character skills and their numbers — stands in data files"
  const { newMapRun, stepMinute } =
    await import("../../dist/browser/sim/run.js");
  const map = { ...forestMap, stepMinutes: 0 };
  const program = programFromRules(rule(ALWAYS, { kind: "wander" }));
  const started = newMapRun(map, 1, program, SENT).run;
  assert.equal(started.current.endMinute, started.minute + 1);
  const step = stepMinute(started, map, program);
  assert.equal(step.run.minute, 1);
  assert.ok(
    step.events.some(
      (event) => event.kind === "activityFinished" && event.minute === 1,
    ),
    JSON.stringify(step.events),
  );
});

test("each map's solving condition holds a requirement, each a whole number above zero, and Las's is a streak of 480", () => {
  // decision: D-388 "Las is a grid of 4 × 4 tiles"
  // decision: D-388 "These numbers are requirements of the game, held in its data (D-18), that tests of the simulation may expect"
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
