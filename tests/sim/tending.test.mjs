// The tree „Opatrywanie małych ran”: its pairs of verb and target, its predisposition of the mage,
// its practice from each pair, its entry into the Understanding with „Wytwórz”, and the numerical
// branches that shorten „Opatrz” or raise what a bandage gives back. Expectations come from D-193
// (one practice per action that ends in effect), D-195 (a tree enters with the first pair it grows),
// D-120 (an archetype opens character skills through the pairs), D-374 (the floor of one minute) and
// D-379 (the thresholds, effects and prices of the tree), in foundations/decisions.md. The numbers of
// the bandage's row are read from the data (D-82); every other number is written out here.
import assert from "node:assert/strict";
import { test } from "node:test";
import { ARCHETYPES } from "../../dist/browser/sim/data/archetypes.js";
import { ACTIONS } from "../../dist/browser/sim/data/actions.js";
import { ITEMS } from "../../dist/browser/sim/data/items.js";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import {
  BRANCHES,
  MINIMUM_ACTION_MINUTES,
  SKILLS,
} from "../../dist/browser/sim/data/skills.js";
import {
  advanceMinutes,
  createCharacter,
  newGame,
  send,
} from "../../dist/browser/sim/game.js";
import { sameHex } from "../../dist/browser/sim/hex.js";
import { nextRandom } from "../../dist/browser/sim/random.js";
import { newMapRun, stepMinute } from "../../dist/browser/sim/run.js";
import { skillBonus } from "../../dist/browser/sim/skills.js";
import { BALANCE } from "../../dist/browser/sim/data/balance.js";
import { programFromRules } from "./program-fixture.mjs";
import { withEdgeSolved } from "./understanding-fixture.mjs";

const forest = MAPS.forest;
// The first character a new game creates takes the id 1.
const characterId = 1;
const REAL_MS = 1760000000003;
const ALWAYS = { kind: "always" };
const CRAFT = { kind: "craft", item: "bandage" };
const TEND = { kind: "tend", item: "bandage" };
const RECIPE = ITEMS.bandage.recipe;
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

/** A map run of the forest at minute 0, its backpack holding `pieces` and nothing else. */
function runWith(pieces, bodyNow, skills) {
  const { run } = newMapRun(forest, 3, IDLE, { mapId: "forest", characterId });
  const empty = Object.fromEntries(
    Object.keys(run.character.backpack).map((id) => [id, 0]),
  );
  return {
    ...run,
    body: bodyNow,
    character: {
      ...run.character,
      backpack: { ...empty, ...pieces },
      ...(skills ? { skills } : {}),
    },
  };
}

/** The run with `action` as its current activity, ending one game minute from now. */
function carrying(run, action) {
  return {
    ...run,
    current: {
      activity: { kind: "rule", ruleId: 1, action },
      startMinute: run.minute,
      endMinute: run.minute + 1,
      stepTo: null,
    },
  };
}

/** The run after one game minute of the forest, with the program given. */
function afterOne(run) {
  return stepMinute(run, forest, IDLE).run;
}

test("the tree is the last character skill, grows the pairs of „Wytwórz” and „Opatrz” with the bandage and of „Ucisk” with every target, and holds its thresholds and name", () => {
  // decision: D-379 "The nine character skills give a level and a point at each of these amounts of practice: „Zbieranie małych przedmiotów” at 30, 80, 160, 280 and 450; „Wytwarzanie ogniska” at 20, 55, 110 and 190; „Rzucanie czaru Płomyk” at 2, 6 and 14; „Eksploracja” at 15, 45, 100 and 200; „Walka bronią jednoręczną” at 15, 40, 100 and 300; „Kopanie” at 10 and 30; „Unik przed ciosem” at 4 and 15; „Jedzenie” at 15, 40 and 80; „Opatrywanie małych ran” at 10, 28, 60 and 110"
  // decision: D-193 "An action ending in effect adds one practice to the character skill its pair of verb and target grows"
  // decision: D-150 "„Ucisk — {rzecz}” grows „Opatrywanie małych ran”"
  assert.equal(Object.keys(SKILLS).at(-1), "tending");
  assert.equal(SKILLS.tending.name, "Opatrywanie małych ran");
  assert.deepEqual(SKILLS.tending.grownBy, [
    { action: "craft", item: "bandage" },
    { action: "tend", item: "bandage" },
    { action: "pressure" },
  ]);
  assert.deepEqual(SKILLS.tending.thresholds, [10, 28, 60, 110]);
  assert.equal("revealedBy" in SKILLS.tending, false);
});

test("the elemental mage holds the tree as its last predisposition", () => {
  // decision: D-120 "An archetype opens character skills, not actions: an action is open to a character when the character skill that its pair of verb and target grows is among the predispositions of the character's archetype"
  // decision: D-379 "The nine character skills give a level and a point at each of these amounts of practice"
  assert.equal(ARCHETYPES.elementalMage.predispositions.at(-1), "tending");
  assert.ok(ARCHETYPES.elementalMage.predispositions.includes("tending"));
});

test("a making with the bandage and a tending with it each add one practice to the tree, and nothing else", () => {
  // decision: D-193 "An action ending in effect adds one practice to the character skill its pair of verb and target grows, in the game minute of that effect, even if the effect includes several pieces or tiles"
  const crafted = afterOne(
    carrying(runWith({ ...RECIPE_PIECES }, body(100)), CRAFT),
  );
  assert.equal(
    crafted.character.backpack.bandage,
    1,
    "precondition: the making ends in effect",
  );
  assert.deepEqual(crafted.practice, { tending: 1 });
  const tended = afterOne(carrying(runWith({ bandage: 1 }, body(50)), TEND));
  assert.equal(
    tended.body.health > 50,
    true,
    "precondition: the tending ends in effect",
  );
  assert.deepEqual(tended.practice, { tending: 1 });
});

test("a making of another item, with a target the pair does not name, grows no practice of the tree", () => {
  // decision: D-193 "An action ending in effect adds one practice to the character skill its pair of verb and target grows"
  // decision: D-443 "An action is a verb with a target, and the targets a verb takes follow from the properties of the items in the game's data."
  const splint = {
    name: "szyna",
    plural: { few: "x", many: "y" },
    icon: "first-aid-kit",
    iconTitle: "First aid kit icon",
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
  withRows(ITEMS, { splint }, () => {
    const made = { kind: "craft", item: "splint" };
    const done = afterOne(
      carrying(runWith({ stick: 3, moss: 1 }, body(100)), made),
    );
    assert.equal(
      done.character.backpack.splint,
      1,
      "precondition: the making ends in effect",
    );
    assert.deepEqual(done.practice, {});
  });
});

test("the first gathered moss brings „Wytwórz” and the bandage, and the tree enters the Understanding in that minute with „Ucisk”, which a branch of it opens", () => {
  // decision: D-195 "A character skill tree with all its branches enters the Understanding in the game minute in which the player discovers the first action grown by that skill, together with any action a branch of that tree opens"
  // decision: D-121 "The first gathered stick brings „Wytwórz — ognisko”, „Zapal — ognisko”, „Zapal — patyk” and the campfire, the first crafted campfire brings „Idź — ognisko” and the conditions „Zostało mniej niż — ognisko” and „Z dala od — ognisko”, the first finished „Zapal”, of a campfire or of a stick, brings „Zasil — ognisko” and the condition „Energia natury poniżej”, and the first gathered berry brings „Zjedz — jagoda” and the condition „Sytość poniżej”, the first gathered moss brings the bandage and „Wytwórz”"
  const START = {
    actions: ["explore"],
    conditions: ["always"],
    items: [],
    trees: [],
    creatures: [],
  };
  const sent = (() => {
    const state = createCharacter(withEdgeSolved(newGame()), "Ala").state;
    return send(state, { mapId: "forest", characterId }, REAL_MS).state;
  })();
  const state = { ...sent, understanding: START };
  const prepared = {
    ...state,
    run: {
      ...state.run,
      tiles: state.run.tiles.map((tile) =>
        sameHex(tile.at, state.run.character.at)
          ? { ...tile, revealed: true, stock: { moss: 5 } }
          : tile,
      ),
      gatherRandom: hittingGatherRandom(),
      current: {
        activity: {
          kind: "rule",
          ruleId: 1,
          action: { kind: "gather", resource: "moss" },
        },
        startMinute: state.run.minute,
        endMinute: state.run.minute + 1,
        stepTo: null,
      },
    },
  };
  const result = advanceMinutes(prepared, 1);
  assert.deepEqual(result.state.understanding.items, ["bandage"]);
  // The actions in the order of the data: „Ucisk” stands before „Wytwórz” there.
  assert.deepEqual(result.state.understanding.actions, [
    "explore",
    "pressure",
    "craft",
  ]);
  assert.deepEqual(result.state.understanding.trees, ["tending"]);
});

/** A state of the gathering generator whose next draw is a hit. */
function hittingGatherRandom() {
  for (let state = 1; ; state += 1)
    if (nextRandom(state).value < BALANCE.gatherChance) return state;
}

test("a bought Wprawna dłoń shortens Opatrz by two minutes a rank, and leaves Wytwórz as it is", () => {
  // decision: D-374 "An action shortened by bought branches lasts at least one game minute."
  // decision: D-379 "Each rank of a branch of „Opatrywanie małych ran” gives the effect below, and the ranks of a branch cost the points listed, in order: „Mocniejszy zwój” +5 health from a bandage, prices 1 · 1 · 2; „Wprawna dłoń” −2 minutes of „Opatrz”, prices 1 · 1 · 2"
  assert.ok(ACTIONS.tend.minutes > 4 + MINIMUM_ACTION_MINUTES, "precondition");
  const skills = { tending: { practice: 0, ranks: { deftHand: 2 } } };
  const tending = stepMinute(
    runWith({ bandage: 1 }, body(50), skills),
    forest,
    programFromRules(rule(ALWAYS, TEND)),
  ).run;
  assert.equal(
    tending.current.endMinute - tending.current.startMinute,
    ACTIONS.tend.minutes - 4,
  );
  const making = stepMinute(
    runWith({ ...RECIPE_PIECES }, body(100), skills),
    forest,
    programFromRules(rule(ALWAYS, CRAFT)),
  ).run;
  assert.equal(
    making.current.endMinute - making.current.startMinute,
    RECIPE.minutes,
  );
});

test("the three numerical branches carry their costs, effects, previews and the words the screen shows", () => {
  // decision: D-379 "Each rank of a branch of „Opatrywanie małych ran” gives the effect below, and the ranks of a branch cost the points listed, in order: „Mocniejszy zwój” +5 health from a bandage, prices 1 · 1 · 2; „Wprawna dłoń” −2 minutes of „Opatrz”, prices 1 · 1 · 2; „Szybkie gojenie” +0.05 health regained by itself in a game minute, prices 2 · 3; „Ucisk”, price 3"
  assert.deepEqual(BRANCHES.strongerRoll, {
    skill: "tending",
    name: "Mocniejszy zwój",
    description: "Opatrunek leczy więcej.",
    costs: [1, 1, 2],
    effect: { kind: "healing", amount: 5 },
    preview: { base: 25, step: 5, unit: "zdrowia" },
  });
  assert.deepEqual(BRANCHES.deftHand, {
    skill: "tending",
    name: "Wprawna dłoń",
    description: "Opatrujesz szybciej.",
    costs: [1, 1, 2],
    effect: { kind: "duration", actions: ["tend"], amount: 2 },
    preview: { base: 10, step: -2, unit: "min", minimum: 1 },
  });
  assert.deepEqual(BRANCHES.quickHealing, {
    skill: "tending",
    name: "Szybkie gojenie",
    description: "Rany schodzą same szybciej — cecha, działa zawsze.",
    costs: [2, 3],
    effect: { kind: "healthRegain", amount: 0.05 },
    preview: { base: 0.05, step: 0.05, unit: "zdrowia na minutę" },
  });
});

test("the healing of a bandage and the health regained by itself grow by their branches' amounts per rank", () => {
  // decision: D-379 "Each rank of a branch of „Opatrywanie małych ran” gives the effect below, and the ranks of a branch cost the points listed, in order: „Mocniejszy zwój” +5 health from a bandage, prices 1 · 1 · 2; „Wprawna dłoń” −2 minutes of „Opatrz”, prices 1 · 1 · 2; „Szybkie gojenie” +0.05 health regained by itself in a game minute, prices 2 · 3"
  const skills = {
    tending: { practice: 0, ranks: { strongerRoll: 2, quickHealing: 1 } },
  };
  assert.equal(skillBonus(skills, "healing"), 10);
  assert.equal(skillBonus(skills, "healthRegain"), 0.05);
});
