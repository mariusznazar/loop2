// „Wytwórz” and „Opatrz” carried out, each with an item as its target: how long each lasts, what it
// takes and gives at its end, what an attack and the combat do to it, the words of its refusals, the
// price read from its target and what it reveals. Expectations come from D-71 (an action takes
// effect at its end), D-142 and D-145 (an attack takes nothing from either verb; „Opatrz” heals
// whatever took health, never above full health, and is no combat verb), D-380 and D-309 (the
// reasons), D-363 and D-443 (the price and the targets follow the items' rows), D-121 and D-128
// (what reveals each) and D-193 (no practice) in foundations/decisions.md. The numbers of the
// bandage's row are read from the data (D-82); every other number is written out here.
import assert from "node:assert/strict";
import { test } from "node:test";
import { backpackCap } from "../../dist/browser/sim/character.js";
import { ACTIONS } from "../../dist/browser/sim/data/actions.js";
import { BALANCE } from "../../dist/browser/sim/data/balance.js";
import { ITEMS } from "../../dist/browser/sim/data/items.js";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import {
  BRANCHES,
  MINIMUM_ACTION_MINUTES,
} from "../../dist/browser/sim/data/skills.js";
import {
  advanceMinutes,
  createCharacter,
  newGame,
  send,
} from "../../dist/browser/sim/game.js";
import { sameHex } from "../../dist/browser/sim/hex.js";
import {
  actionPrice,
  actionRefusal,
  chooseActivity,
  judgeProgram,
} from "../../dist/browser/sim/program.js";
import { nextRandom } from "../../dist/browser/sim/random.js";
import { newMapRun, stepMinute } from "../../dist/browser/sim/run.js";
import { programFromRules } from "./program-fixture.mjs";
import { withEdgeSolved } from "./understanding-fixture.mjs";

const forest = MAPS.forest;
const deep = MAPS.forestDeep;
// The first character a new game creates takes the id 1.
const characterId = 1;
const ALWAYS = { kind: "always" };
const WANDER = { kind: "wander" };
const KICK = { kind: "kick" };
const CRAFT = { kind: "craft", item: "bandage" };
const TEND = { kind: "tend", item: "bandage" };
const RECIPE = ITEMS.bandage.recipe;
const HEALING = ITEMS.bandage.healing.health;
const IDLE = programFromRules();
const rule = (condition, action) => ({ condition, action });

/** The recipe's pieces as a backpack's pieces, each item once. */
const RECIPE_PIECES = Object.fromEntries(
  RECIPE.uses.map(({ item, count }) => [item, count]),
);

const body = (health, temperature = 37, satiety = 100) => ({
  temperature,
  satiety,
  health,
});

/** A map run of `map` at minute 0, its backpack holding `pieces` and nothing else, its body `body`. */
function runWith(pieces, bodyNow, map = forest, mapId = "forest", program) {
  const { run } = newMapRun(map, 3, program ?? IDLE, { mapId, characterId });
  const empty = Object.fromEntries(
    Object.keys(run.character.backpack).map((id) => [id, 0]),
  );
  return {
    ...run,
    body: bodyNow,
    character: { ...run.character, backpack: { ...empty, ...pieces } },
  };
}

/** The run with `action` as its current activity, ending `minutes` game minutes from now. */
function carrying(run, action, minutes = 1) {
  return {
    ...run,
    current: {
      activity: { kind: "rule", ruleId: 1, action },
      startMinute: run.minute - 4,
      endMinute: run.minute + minutes,
      stepTo: null,
    },
  };
}

/** The run after `minutes` game minutes, each one step. */
function after(run, minutes, program = IDLE, map = forest) {
  let current = run;
  for (let i = 0; i < minutes; i += 1)
    current = stepMinute(current, map, program).run;
  return current;
}

/** A number written with at most two decimals, as the hand arithmetic gives it. */
const rounded = (value) => Number(value.toFixed(2));

/** Runs `body` with the rows laid on the built data of `table`, and takes them off again after it. */
function withRows(table, rows, body) {
  for (const id of Object.keys(rows))
    assert.ok(
      !Object.hasOwn(table, id),
      `precondition: ${id} is no row of the data`,
    );
  Object.assign(table, rows);
  try {
    return body();
  } finally {
    for (const id of Object.keys(rows)) delete table[id];
  }
}

const WORDS = {
  plural: { few: "x", many: "y" },
  icon: "first-aid-kit",
  iconTitle: "First aid kit icon",
};
/** A second item with a recipe of two pieces in a given order and a healing property. */
const SPLINT = {
  ...WORDS,
  name: "szyna",
  revealedBy: { kind: "gathered", item: "moss" },
  recipe: {
    uses: [
      { item: "stick", count: 3 },
      { item: "moss", count: 1 },
    ],
    minutes: 7,
  },
  healing: { health: 10 },
};

test("„Wytwórz” lasts the minutes of its target's recipe and „Opatrz” the minutes of its row, and nothing leaves the backpack at the start", () => {
  // decision: D-142 "„Wytwórz” and „Opatrz” take what they use out of the backpack when they end, together with their effect, so an attack that interrupts either takes nothing."
  const cases = [
    [CRAFT, { ...RECIPE_PIECES, bandage: 0 }, body(100), RECIPE.minutes],
    [TEND, { bandage: 1 }, body(50), ACTIONS.tend.minutes],
  ];
  for (const [action, pieces, bodyNow, minutes] of cases) {
    const start = runWith(pieces, bodyNow);
    const begun = stepMinute(
      start,
      forest,
      programFromRules(rule(ALWAYS, action)),
    ).run;
    assert.deepEqual(begun.current.activity.action, action, action.kind);
    assert.equal(begun.current.startMinute, 1, action.kind);
    assert.equal(begun.current.endMinute, 1 + minutes, action.kind);
    assert.equal(begun.current.stepTo, null, action.kind);
    assert.deepEqual(
      begun.character.backpack,
      start.character.backpack,
      action.kind,
    );
  }
});

test("a bought duration branch shortens both verbs as it does every action, down to the floor of one game minute", () => {
  // decision: D-374 "An action shortened by bought branches lasts at least one game minute."
  const branches = {
    testShorter: {
      skill: "campfireCrafting",
      name: "x",
      description: "x",
      costs: [1],
      effect: { kind: "duration", actions: ["craft", "tend"], amount: 1 },
    },
    testShortest: {
      skill: "eating",
      name: "x",
      description: "x",
      costs: [1],
      effect: { kind: "duration", actions: ["craft", "tend"], amount: 1000 },
    },
  };
  assert.ok(RECIPE.minutes > 1 + MINIMUM_ACTION_MINUTES, "precondition");
  assert.ok(ACTIONS.tend.minutes > 1 + MINIMUM_ACTION_MINUTES, "precondition");
  withRows(BRANCHES, branches, () => {
    const cases = [
      ["testShorter", 1],
      ["testShortest", 1000],
    ];
    for (const [branch, amount] of cases) {
      const skill = BRANCHES[branch].skill;
      const skills = { [skill]: { practice: 0, ranks: { [branch]: 1 } } };
      for (const [action, pieces, bodyNow, full] of [
        [CRAFT, RECIPE_PIECES, body(100), RECIPE.minutes],
        [TEND, { bandage: 1 }, body(50), ACTIONS.tend.minutes],
      ]) {
        const start = runWith(pieces, bodyNow);
        const run = {
          ...start,
          character: { ...start.character, skills },
        };
        const begun = stepMinute(
          run,
          forest,
          programFromRules(rule(ALWAYS, action)),
        ).run;
        const minutes = begun.current.endMinute - begun.current.startMinute;
        assert.equal(
          minutes,
          amount === 1 ? full - 1 : MINIMUM_ACTION_MINUTES,
          `${action.kind} with ${branch}`,
        );
      }
    }
  });
});

test("„Wytwórz” takes the recipe's pieces and gives one piece of its target at its end, together, and nothing before it", () => {
  // decision: D-142 "„Wytwórz” and „Opatrz” take what they use out of the backpack when they end, together with their effect, so an attack that interrupts either takes nothing."
  // decision: D-71 "Outside combat a game minute takes effect in this order: the character's body cools by the map's ambient temperature and warms by what burns on its tile, satiety falls, the nature energy of a well-fed mage comes back, up to its cap, health changes for cold and hunger or recovers, and the streak follows D-136; health at zero ends the map run in death at that point, otherwise burning loses a minute, tiles renew, the ending action takes effect"
  const run = runWith(
    { ...RECIPE_PIECES, moss: RECIPE_PIECES.moss + 1 },
    body(100),
  );
  const going = after(carrying(run, CRAFT, 2), 1);
  assert.deepEqual(going.character.backpack, run.character.backpack, "midway");
  const done = after(carrying(run, CRAFT), 1);
  assert.deepEqual(done.character.backpack, {
    ...run.character.backpack,
    moss: 1,
    bandage: 1,
  });
  assert.deepEqual(done.practice, {}, "neither verb adds practice");
});

test("„Wytwórz” needs no revealed tile and no room: with the backpack full it still ends with its piece", () => {
  // decision: D-142 "„Wytwórz” and „Opatrz” take what they use out of the backpack when they end, together with their effect, so an attack that interrupts either takes nothing."
  const cap = backpackCap(runWith({}, body(100)).character);
  const used = Object.values(RECIPE_PIECES).reduce((sum, n) => sum + n, 0);
  const full = runWith({ ...RECIPE_PIECES, berry: cap - used }, body(100));
  const unrevealed = {
    ...full,
    tiles: full.tiles.map((tile) =>
      sameHex(tile.at, full.character.at) ? { ...tile, revealed: false } : tile,
    ),
  };
  assert.equal(actionRefusal(unrevealed, CRAFT), null);
  const done = after(carrying(unrevealed, CRAFT), 1);
  assert.equal(done.character.backpack.bandage, 1);
  assert.equal(done.character.backpack.moss, 0);
});

test("„Wytwórz” where the backpack no longer holds the recipe's pieces at its end changes nothing and takes nothing", () => {
  // decision: D-142 "„Wytwórz” and „Opatrz” take what they use out of the backpack when they end, together with their effect, so an attack that interrupts either takes nothing."
  const short = runWith({ moss: RECIPE_PIECES.moss - 1 }, body(100));
  const done = after(carrying(short, CRAFT), 1);
  assert.deepEqual(done.character.backpack, short.character.backpack);
  assert.deepEqual(done.practice, {});
});

test("„Opatrz” takes one piece and gives the target's healing at its end, together, and nothing before it", () => {
  // decision: D-145 "„Opatrz — {rzecz}” uses up one piece of the thing, an item the data give a healing, and gives back that healing to health whatever took it — cold, hunger or a blow of combat — never above full health."
  const run = runWith({ bandage: 2, moss: 1 }, body(50));
  const going = after(carrying(run, TEND, 2), 1);
  assert.deepEqual(going.character.backpack, run.character.backpack, "midway");
  const done = after(carrying(run, TEND), 1);
  assert.deepEqual(done.character.backpack, {
    ...run.character.backpack,
    bandage: 1,
  });
  // The minute's own step first gives back 0.05, the character being neither chilled nor starving.
  assert.equal(done.body.health, rounded(50 + 0.05 + HEALING));
  assert.deepEqual(done.practice, {}, "neither verb adds practice");
});

test("„Opatrz” gives back no more than full health", () => {
  // decision: D-145 "„Opatrz — {rzecz}” uses up one piece of the thing, an item the data give a healing, and gives back that healing to health whatever took it — cold, hunger or a blow of combat — never above full health."
  assert.ok(HEALING > 1, "precondition: a healing above the one point left");
  const done = after(carrying(runWith({ bandage: 1 }, body(99)), TEND), 1);
  assert.equal(done.body.health, BALANCE.body.startHealth);
  assert.equal(done.character.backpack.bandage, 0);
});

test("„Opatrz” heals health lost to cold and to hunger alike", () => {
  // decision: D-145 "„Opatrz — {rzecz}” uses up one piece of the thing, an item the data give a healing, and gives back that healing to health whatever took it — cold, hunger or a blow of combat — never above full health."
  // decision: D-60 "Outside combat, a character loses health in each game minute in which it is chilled"
  const cases = [
    ["cold", body(60, 30, 100)],
    ["hunger", body(60, 37, 20)],
  ];
  for (const [cause, bodyNow] of cases) {
    const done = after(carrying(runWith({ bandage: 1 }, bodyNow), TEND), 1);
    // The step of the minute takes 0.35 for being chilled or for starving, then the bandage heals.
    assert.equal(done.body.health, rounded(60 - 0.35 + HEALING), cause);
    assert.equal(done.character.backpack.bandage, 0, cause);
  }
});

test("„Opatrz” where health came back to full by its end leaves the bandage in the backpack and ends with no effect", () => {
  // decision: D-145 "It is not carried out in combat and cannot be carried out at full health, and where health is full when it ends, the piece stays in the backpack and the action ends with no effect."
  const run = runWith({ bandage: 1 }, body(99.95));
  assert.equal(actionRefusal(run, TEND), null, "it could start at 99.95");
  const done = stepMinute(carrying(run, TEND), forest, IDLE);
  assert.equal(done.run.body.health, 100, "health came back to full");
  assert.equal(done.run.character.backpack.bandage, 1);
  assert.ok(done.events.some((event) => event.kind === "activityFinished"));
  assert.deepEqual(done.run.practice, {});
});

test("„Wytwórz” and „Opatrz” of an item the data give a recipe or a healing carry out as the bandage does, whatever the item", () => {
  // decision: D-443 "An action is a verb with a target, and the targets a verb takes follow from the properties of the items in the game's data."
  withRows(ITEMS, { splint: SPLINT }, () => {
    const run = runWith({ stick: 4, moss: 1, splint: 1 }, body(50));
    const made = { kind: "craft", item: "splint" };
    const begun = stepMinute(
      run,
      forest,
      programFromRules(rule(ALWAYS, made)),
    ).run;
    assert.equal(begun.current.endMinute - begun.current.startMinute, 7);
    const crafted = after(carrying(run, made), 1);
    assert.deepEqual(crafted.character.backpack, {
      ...run.character.backpack,
      stick: 1,
      moss: 0,
      splint: 2,
    });
    const tended = after(carrying(run, { kind: "tend", item: "splint" }), 1);
    assert.equal(tended.character.backpack.splint, 0);
    assert.equal(tended.body.health, rounded(50 + 0.05 + 10));
  });
});

// A wolf attack on Las — głębiej, the map that holds one.
const wolf = deep.attackers[0];

/** A state of the attack generator whose next draw is below the wolf's chance of an attack. */
function drawingAnAttack() {
  for (let state = 1; ; state += 1)
    if (nextRandom(state).value < wolf.chancePerMinute) return state;
}

/** A run on Las — głębiej at minute 180, the last protected minute, with the attack to come. */
function beforeTheAttack(pieces, bodyNow, action, endMinute) {
  const run = runWith(pieces, bodyNow, deep, "forestDeep");
  return {
    ...carrying({ ...run, minute: 180 }, action, endMinute - 180),
    attackRandom: drawingAnAttack(),
  };
}

test("an attack before the end of „Wytwórz” leaves the pieces in the backpack and makes no piece", () => {
  // decision: D-142 "„Wytwórz” and „Opatrz” take what they use out of the backpack when they end, together with their effect, so an attack that interrupts either takes nothing."
  const run = beforeTheAttack({ ...RECIPE_PIECES }, body(100), CRAFT, 190);
  const hit = stepMinute(run, deep, IDLE);
  assert.ok(hit.events.some((event) => event.kind === "attacked"));
  assert.equal(hit.run.current, null);
  assert.deepEqual(hit.run.character.backpack, run.character.backpack);
});

test("an attack before the end of „Opatrz” leaves the bandage in the backpack and gives back nothing", () => {
  // decision: D-142 "„Wytwórz” and „Opatrz” take what they use out of the backpack when they end, together with their effect, so an attack that interrupts either takes nothing."
  const run = beforeTheAttack({ bandage: 1 }, body(50), TEND, 190);
  const hit = stepMinute(run, deep, IDLE);
  assert.ok(hit.events.some((event) => event.kind === "attacked"));
  assert.deepEqual(hit.run.character.backpack, run.character.backpack);
  assert.equal(hit.run.body.health, 50.05, "only the minute's own regaining");
});

test("an attack in the minute in which „Opatrz” ends comes after its effect: the bandage is gone and its health given back", () => {
  // decision: D-142 "„Wytwórz” and „Opatrz” take what they use out of the backpack when they end, together with their effect, so an attack that interrupts either takes nothing."
  const run = beforeTheAttack({ bandage: 1 }, body(50), TEND, 181);
  const hit = stepMinute(run, deep, IDLE);
  assert.ok(hit.events.some((event) => event.kind === "attacked"));
  assert.equal(hit.run.character.backpack.bandage, 0);
  assert.equal(hit.run.body.health, rounded(50 + 0.05 + HEALING));
});

test("an attack in the minute in which „Wytwórz” ends comes after its effect: the piece is made", () => {
  // decision: D-142 "„Wytwórz” and „Opatrz” take what they use out of the backpack when they end, together with their effect, so an attack that interrupts either takes nothing."
  const run = beforeTheAttack({ ...RECIPE_PIECES }, body(100), CRAFT, 181);
  const hit = stepMinute(run, deep, IDLE);
  assert.ok(hit.events.some((event) => event.kind === "attacked"));
  assert.equal(hit.run.character.backpack.bandage, 1);
  assert.equal(hit.run.character.backpack.moss, 0);
});

test("in combat „Opatrz” and „Wytwórz” give „trwa walka”, and a minute of combat carries out neither", () => {
  // decision: D-145 "It is not carried out in combat and cannot be carried out at full health, and where health is full when it ends, the piece stays in the backpack and the action ends with no effect."
  // decision: D-309 "In the minutes of an attack, from the minute of the attack to the resolving of its turns, the signs of the copy show what the first combat turn would choose now, at the health of the mage and of the creature as they stand: the combat rule the turn would choose stands on the background `rule-winning`, no rule stands on `rule-running`, and an ordinary rule whose condition holds is amber with the reason „trwa walka”."
  const program = programFromRules(rule(ALWAYS, TEND), rule(ALWAYS, CRAFT));
  const run = runWith(
    { ...RECIPE_PIECES, bandage: 1 },
    body(50),
    deep,
    "forestDeep",
  );
  const judged = judgeProgram(run, program, {
    combat: { health: 50, opponentHealth: 24 },
  });
  assert.deepEqual(judged.rules[1], { bar: "blocked", reason: "trwa walka" });
  assert.deepEqual(judged.rules[2], { bar: "blocked", reason: "trwa walka" });
  assert.equal(judged.winner, null);
  const fighting = {
    ...run,
    minute: 181,
    current: null,
    activeCombat: { creatureId: "wolf", attackMinute: 181, resolveMinute: 186 },
  };
  const next = stepMinute(fighting, deep, program).run;
  assert.equal(next.current, null, "no ordinary pick in a minute of combat");
  assert.deepEqual(next.character.backpack, fighting.character.backpack);
});

test("„Opatrz” heals what a blow of combat took: the bandage is carried out after the fight and gives its health back", () => {
  // decision: D-145 "„Opatrz — {rzecz}” uses up one piece of the thing, an item the data give a healing, and gives back that healing to health whatever took it — cold, hunger or a blow of combat — never above full health."
  const program = programFromRules(rule(ALWAYS, KICK), rule(ALWAYS, TEND));
  const start = runWith({ bandage: 1 }, body(100), deep, "forestDeep", program);
  let run = {
    ...start,
    minute: 181,
    current: null,
    activeCombat: { creatureId: "wolf", attackMinute: 181, resolveMinute: 186 },
    lastCombat: {
      creatureId: "wolf",
      attackMinute: 181,
      resolveMinute: 186,
      result: null,
    },
  };
  for (let i = 0; i < 5; i += 1) run = stepMinute(run, deep, program).run;
  assert.equal(run.activeCombat, null, "the fight is over");
  assert.ok(run.body.health < 100, "precondition: the fight took health");
  assert.deepEqual(run.current.activity.action, TEND, "the bandage is next");
  assert.equal(run.character.backpack.bandage, 1, "nothing taken yet");
  const hurt = run.body.health;
  run = after(run, ACTIONS.tend.minutes, program, deep);
  const regained = BALANCE.body.healthRegain * ACTIONS.tend.minutes;
  assert.equal(
    run.body.health,
    Math.min(100, rounded(hurt + regained + HEALING)),
  );
  assert.equal(run.character.backpack.bandage, 0);
});

test("„Wytwórz” with fewer pieces than the recipe asks for is refused with the first piece the backpack lacks, in the recipe's order", () => {
  // decision: D-380 "„Wytwórz — {rzecz}” and „Opatrz — {rzecz}” short of a thing in the backpack, „brakuje {ile} × {rzecz}”, such as „brakuje 2 × mech” and „brakuje 1 × opatrunek”"
  const moss = RECIPE_PIECES.moss;
  assert.equal(
    actionRefusal(runWith({}, body(100)), CRAFT),
    `brakuje ${moss} × mech`,
  );
  assert.equal(
    actionRefusal(runWith({ moss: moss - 1 }, body(100)), CRAFT),
    "brakuje 1 × mech",
  );
  assert.equal(
    actionRefusal(runWith({ ...RECIPE_PIECES }, body(100)), CRAFT),
    null,
  );
  withRows(ITEMS, { splint: SPLINT }, () => {
    const made = { kind: "craft", item: "splint" };
    assert.equal(
      actionRefusal(runWith({ stick: 1 }, body(100)), made),
      "brakuje 2 × patyk",
    );
    assert.equal(
      actionRefusal(runWith({ stick: 3 }, body(100)), made),
      "brakuje 1 × mech",
    );
    assert.equal(
      actionRefusal(runWith({ stick: 3, moss: 1 }, body(100)), made),
      null,
    );
  });
});

test("„Opatrz” at full health is refused with „zdrowie pełne”, before the lack of a bandage; at 99.95 it is not refused for health", () => {
  // decision: D-380 "„Wytwórz — {rzecz}” and „Opatrz — {rzecz}” short of a thing in the backpack, „brakuje {ile} × {rzecz}”, such as „brakuje 2 × mech” and „brakuje 1 × opatrunek”; „Opatrz — {rzecz}” at full health, „zdrowie pełne”, which stands before „brakuje …” where both hold."
  const refusal = (health, pieces) =>
    actionRefusal(runWith(pieces, body(health)), TEND);
  assert.equal(refusal(100, { bandage: 1 }), "zdrowie pełne");
  assert.equal(refusal(100, {}), "zdrowie pełne", "before the lack");
  assert.equal(refusal(99.95, {}), "brakuje 1 × opatrunek");
  assert.equal(refusal(99.95, { bandage: 1 }), null);
  assert.equal(refusal(50, { bandage: 1 }), null);
});

test("a rule of „Opatrz” refused at full health is passed over for the next rule of the program", () => {
  // decision: D-380 "„Wytwórz — {rzecz}” and „Opatrz — {rzecz}” short of a thing in the backpack, „brakuje {ile} × {rzecz}”, such as „brakuje 2 × mech” and „brakuje 1 × opatrunek”; „Opatrz — {rzecz}” at full health, „zdrowie pełne”, which stands before „brakuje …” where both hold."
  const program = programFromRules(rule(ALWAYS, TEND), rule(ALWAYS, WANDER));
  const run = runWith({ bandage: 1 }, body(100));
  assert.equal(chooseActivity(run, program).ruleId, 2);
  assert.equal(chooseActivity({ ...run, body: body(50) }, program).ruleId, 1);
});

test("the price of an action with a target is read from the target: the recipe's pieces for „Wytwórz”, one piece for „Opatrz”, none for the bare verb", () => {
  // decision: D-363 "An action whose price its target gives, „Wytwórz” and „Opatrz” with an item as the target, shows no price at its cell of the pick of actions; the pick of its target shows at each target the price of the action with that target"
  // decision: D-443 "An action is a verb with a target, and the targets a verb takes follow from the properties of the items in the game's data."
  assert.deepEqual(actionPrice("craft", {}, "bandage"), {
    pieces: RECIPE.uses.map(({ item, count }) => ({ item, count })),
    natureEnergy: 0,
  });
  assert.deepEqual(actionPrice("tend", {}, "bandage"), {
    pieces: [{ item: "bandage", count: 1 }],
    natureEnergy: 0,
  });
  for (const kind of ["craft", "tend"])
    assert.deepEqual(actionPrice(kind, {}), { pieces: [], natureEnergy: 0 });
  withRows(ITEMS, { splint: SPLINT }, () => {
    assert.deepEqual(actionPrice("craft", {}, "splint").pieces, [
      { item: "stick", count: 3 },
      { item: "moss", count: 1 },
    ]);
    assert.deepEqual(actionPrice("tend", {}, "splint").pieces, [
      { item: "splint", count: 1 },
    ]);
  });
  assert.deepEqual(actionPrice("eat", {}, "bandage").pieces, [
    { item: "berry", count: 1 },
  ]);
});

test("what a finished „Wytwórz” or „Opatrz” takes from the backpack is exactly the price of the action with its target", () => {
  // decision: D-142 "„Wytwórz” and „Opatrz” take what they use out of the backpack when they end, together with their effect, so an attack that interrupts either takes nothing."
  const crafted = after(
    carrying(runWith({ ...RECIPE_PIECES }, body(100)), CRAFT),
    1,
  );
  const priced = actionPrice("craft", {}, "bandage").pieces;
  for (const { item, count } of priced)
    assert.equal(crafted.character.backpack[item], 0, `${item} of ${count}`);
  const tended = after(carrying(runWith({ bandage: 3 }, body(50)), TEND), 1);
  assert.equal(
    tended.character.backpack.bandage,
    3 - actionPrice("tend", {}, "bandage").pieces[0].count,
  );
});

// What the two verbs reveal, in a game state with a character sent to Las (D-121, D-128).
const REAL_MS = 1760000000003;
const START = {
  actions: ["explore"],
  conditions: ["always"],
  items: [],
  trees: [],
  creatures: [],
};

function sentNew() {
  const state = createCharacter(withEdgeSolved(newGame()), "Ala").state;
  return send(state, { mapId: "forest", characterId }, REAL_MS).state;
}

/** A sent game whose Understanding is `understanding`, its map run changed by `patch(run)`. */
function prepared(understanding, patch) {
  const state = { ...sentNew(), understanding };
  return { ...state, run: { ...state.run, ...patch(state.run) } };
}

function endingNext(run, action) {
  return {
    activity: { kind: "rule", ruleId: 1, action },
    startMinute: run.minute,
    endMinute: run.minute + 1,
    stepTo: null,
  };
}

const discoveries = (events) =>
  events.filter((event) => event.kind === "discovered");

/** A state of the gathering generator whose next draw is a hit. */
function hittingGatherRandom() {
  for (let state = 1; ; state += 1)
    if (nextRandom(state).value < BALANCE.gatherChance) return state;
}

function withPieces(run, pieces) {
  return {
    ...run.character,
    backpack: { ...run.character.backpack, ...pieces },
  };
}

test("the first gathered moss reveals the bandage and „Wytwórz”, and „Opatrz” and the condition „Zdrowie poniżej” stay hidden", () => {
  // decision: D-121 "The first gathered stick brings „Wytwórz — ognisko”, „Zapal — ognisko”, „Zapal — patyk” and the campfire, the first crafted campfire brings „Idź — ognisko” and the conditions „Zostało mniej niż — ognisko” and „Z dala od — ognisko”, the first finished „Zapal”, of a campfire or of a stick, brings „Zasil — ognisko” and the condition „Energia natury poniżej”, and the first gathered berry brings „Zjedz — jagoda” and the condition „Sytość poniżej”, the first gathered moss brings the bandage and „Wytwórz”, and the first piece of the bandage crafted brings „Opatrz”."
  const state = prepared(START, (run) => ({
    tiles: run.tiles.map((tile) =>
      sameHex(tile.at, run.character.at)
        ? { ...tile, revealed: true, stock: { moss: 5 } }
        : tile,
    ),
    gatherRandom: hittingGatherRandom(),
    current: endingNext(run, { kind: "gather", resource: "moss" }),
  }));
  const result = advanceMinutes(state, 1);
  assert.deepEqual(discoveries(result.events), [
    {
      kind: "discovered",
      minute: 1,
      actions: ["craft"],
      conditions: [],
      items: ["bandage"],
      trees: [],
      creatures: [],
    },
  ]);
  assert.ok(!result.state.understanding.actions.includes("tend"));
});

test("the first „Wytwórz” that ends with its effect on the bandage reveals „Opatrz” in that minute and nothing before it", () => {
  // decision: D-121 "The first gathered stick brings „Wytwórz — ognisko”, „Zapal — ognisko”, „Zapal — patyk” and the campfire, the first crafted campfire brings „Idź — ognisko” and the conditions „Zostało mniej niż — ognisko” and „Z dala od — ognisko”, the first finished „Zapal”, of a campfire or of a stick, brings „Zasil — ognisko” and the condition „Energia natury poniżej”, and the first gathered berry brings „Zjedz — jagoda” and the condition „Sytość poniżej”, the first gathered moss brings the bandage and „Wytwórz”, and the first piece of the bandage crafted brings „Opatrz”."
  const knowing = {
    ...START,
    actions: ["explore", "craft"],
    items: ["bandage"],
  };
  const midway = prepared(knowing, (run) => ({
    character: withPieces(run, RECIPE_PIECES),
    current: { ...endingNext(run, CRAFT), endMinute: run.minute + 2 },
  }));
  assert.deepEqual(discoveries(advanceMinutes(midway, 1).events), []);
  const state = prepared(knowing, (run) => ({
    character: withPieces(run, RECIPE_PIECES),
    current: endingNext(run, CRAFT),
  }));
  const result = advanceMinutes(state, 1);
  assert.deepEqual(discoveries(result.events), [
    {
      kind: "discovered",
      minute: 1,
      actions: ["tend"],
      conditions: [],
      items: [],
      trees: [],
      creatures: [],
    },
  ]);
  assert.deepEqual(result.state.understanding.actions, [
    "explore",
    "craft",
    "tend",
  ]);
  assert.equal(result.state.run.character.backpack.bandage, 1);
});

test("a „Wytwórz” that ends with no effect for want of its pieces reveals nothing, and a bandage crafted again reveals nothing new", () => {
  // decision: D-121 "The first gathered stick brings „Wytwórz — ognisko”, „Zapal — ognisko”, „Zapal — patyk” and the campfire, the first crafted campfire brings „Idź — ognisko” and the conditions „Zostało mniej niż — ognisko” and „Z dala od — ognisko”, the first finished „Zapal”, of a campfire or of a stick, brings „Zasil — ognisko” and the condition „Energia natury poniżej”, and the first gathered berry brings „Zjedz — jagoda” and the condition „Sytość poniżej”, the first gathered moss brings the bandage and „Wytwórz”, and the first piece of the bandage crafted brings „Opatrz”."
  const knowing = {
    ...START,
    actions: ["explore", "craft"],
    items: ["bandage"],
  };
  const empty = prepared(knowing, (run) => ({
    current: endingNext(run, CRAFT),
  }));
  assert.deepEqual(discoveries(advanceMinutes(empty, 1).events), []);
  const known = prepared(
    { ...knowing, actions: ["explore", "craft", "tend"] },
    (run) => ({
      character: withPieces(run, RECIPE_PIECES),
      current: endingNext(run, CRAFT),
    }),
  );
  assert.deepEqual(discoveries(advanceMinutes(known, 1).events), []);
});

test("the first crafted piece of any item reveals what its row names as revealed by it, by a change of data alone", () => {
  // decision: D-128 "An action, an item, a condition or a creature revealed by a kind of revealing event the simulation already handles is added, or what reveals it is changed, by a change of data alone."
  const charm = {
    ...WORDS,
    name: "amulet",
    revealedBy: { kind: "crafted", item: "splint" },
  };
  withRows(ITEMS, { splint: SPLINT, charm }, () => {
    const knowing = {
      ...START,
      actions: ["explore", "craft"],
      items: ["splint"],
    };
    const state = prepared(knowing, (run) => ({
      character: withPieces(run, { stick: 3, moss: 1 }),
      current: endingNext(run, { kind: "craft", item: "splint" }),
    }));
    const result = advanceMinutes(state, 1);
    assert.deepEqual(
      discoveries(result.events).map((event) => event.items),
      [["charm"]],
    );
  });
});

test("a „Wytwórz” ending in the minute of the character's death reveals nothing", () => {
  // decision: D-121 "The first gathered stick brings „Wytwórz — ognisko”, „Zapal — ognisko”, „Zapal — patyk” and the campfire, the first crafted campfire brings „Idź — ognisko” and the conditions „Zostało mniej niż — ognisko” and „Z dala od — ognisko”, the first finished „Zapal”, of a campfire or of a stick, brings „Zasil — ognisko” and the condition „Energia natury poniżej”, and the first gathered berry brings „Zjedz — jagoda” and the condition „Sytość poniżej”, the first gathered moss brings the bandage and „Wytwórz”, and the first piece of the bandage crafted brings „Opatrz”."
  const knowing = {
    ...START,
    actions: ["explore", "craft"],
    items: ["bandage"],
  };
  const state = prepared(knowing, (run) => ({
    character: withPieces(run, RECIPE_PIECES),
    body: body(0.1, 30, 0),
    current: endingNext(run, CRAFT),
  }));
  const result = advanceMinutes(state, 1);
  assert.ok(result.state.run.death, "the character died in the minute");
  assert.equal(result.state.run.character.backpack.bandage, 0);
  assert.ok(
    !discoveries(result.events).some((event) => event.actions.includes("tend")),
  );
});
