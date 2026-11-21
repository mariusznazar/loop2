// The targets of the two verbs that take an item, „Wytwórz” and „Opatrz”: which items they take, how
// the program check refuses any other value, and how the repertoire holds an action with such a
// target. Expectations come from D-443 (the targets a verb takes follow from the properties of the
// items in the game's data), D-126 (a rule whose target lies outside the repertoire is passed over),
// D-120 and D-193 (an action no character skill grows is open to every character and adds no
// practice) and D-289 (a thing on no map is no target of the actions that go to a thing of a map) in
// foundations/decisions.md; every expected value is written out here.
import assert from "node:assert/strict";
import { test } from "node:test";
import {
  itemTargets,
  takesItem,
} from "../../dist/browser/sim/action-targets.js";
import { ITEMS } from "../../dist/browser/sim/data/items.js";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import {
  createCharacter,
  newGame,
  send,
  setProgram,
} from "../../dist/browser/sim/game.js";
import { ProgramCheckError } from "../../dist/browser/sim/programs.js";
import { practiced } from "../../dist/browser/sim/skills.js";
import {
  actionInRepertoire,
  outsideReason,
  programInRepertoire,
  repertoireOf,
  ruleInRepertoire,
} from "../../dist/browser/sim/understanding.js";
import { programFromRules, programRules } from "./program-fixture.mjs";
import { fullUnderstanding, withEdgeSolved } from "./understanding-fixture.mjs";

const VERBS = ["craft", "tend"];
const ALWAYS = { kind: "always" };
const EXPLORE = { kind: "explore" };
const rule = (condition, action) => ({ condition, action });

/** The words and the revealing event every row laid on the data in these tests holds. */
const WORDS = {
  plural: { few: "x", many: "y" },
  icon: "first-aid-kit",
  iconTitle: "First aid kit icon",
  revealedBy: { kind: "gathered", item: "moss" },
};
const RECIPE = { uses: [{ item: "moss", count: 1 }], minutes: 5 };
/** A second item with a recipe and a healing property: one the data of the game never hold. */
const SPLINT = {
  ...WORDS,
  name: "szyna",
  recipe: RECIPE,
  healing: { health: 10 },
};
/** An item with a recipe and no healing property, and one with a healing property and no recipe. */
const BOARD = { ...WORDS, name: "deska", recipe: RECIPE };
const SALVE = { ...WORDS, name: "maść", healing: { health: 10 } };

/** Runs `body` with the rows laid on the built `ITEMS`, and takes them off again after it. */
function withItems(rows, body) {
  for (const id of Object.keys(rows))
    assert.ok(
      !Object.hasOwn(ITEMS, id),
      `precondition: ${id} is no item of the data`,
    );
  Object.assign(ITEMS, rows);
  try {
    return body();
  } finally {
    for (const id of Object.keys(rows)) delete ITEMS[id];
  }
}

/** A game state with a character, outside a map run. */
function outside() {
  return createCharacter(withEdgeSolved(newGame()), "Ala").state;
}

/** The same game with the character sent to Las, so that a map run holds the program. */
function inRun() {
  return send(
    { ...outside(), understanding: fullUnderstanding() },
    { mapId: "forest", characterId: 1 },
    1760000000000,
  ).state;
}

const WHERES = [
  ["outside a map run", outside],
  ["during a map run", inRun],
];

/** The program `setProgram` holds after taking `program` in. */
function held(state, program) {
  const after = setProgram(state, program).state;
  return after.run ? after.run.copy.program : after.programs[0].program;
}

/** Whether a refusal's message must name the value: a text with something in it or a number. */
const namedInRefusal = (value) =>
  (typeof value === "string" && value !== "") || typeof value === "number";

test("the targets follow the data: the bandage is a target of both verbs and moss of neither", () => {
  // decision: D-443 "An action is a verb with a target, and the targets a verb takes follow from the properties of the items in the game's data"
  for (const verb of VERBS) {
    assert.equal(takesItem(verb), true, verb);
    const targets = itemTargets(verb);
    assert.ok(targets.includes("bandage"), `${verb} takes the bandage`);
    for (const resource of ["moss", "stick", "berry", "fiber"])
      assert.ok(!targets.includes(resource), `${verb} takes no ${resource}`);
  }
});

test("a kind that takes no item has no target", () => {
  // decision: D-443 "An action made before this rule keeps a kind of its own until a change rewrites it."
  for (const kind of [
    "explore",
    "walkTo",
    "gather",
    "patrol",
    "craftCampfire",
    "eat",
    "kick",
  ]) {
    assert.equal(takesItem(kind), false, kind);
    assert.deepEqual(itemTargets(kind), [], kind);
  }
});

test("a second item with a recipe and a healing property becomes a target of both verbs with no change of code, and never stands in the game's data", () => {
  // decision: D-443 "An action is a verb with a target, and the targets a verb takes follow from the properties of the items in the game's data"
  const before = Object.keys(ITEMS);
  assert.ok(
    !before.includes("splint"),
    "precondition: the data hold no splint",
  );
  const bandageOnly = {
    craft: itemTargets("craft"),
    tend: itemTargets("tend"),
  };
  withItems({ splint: SPLINT }, () => {
    for (const verb of VERBS) {
      assert.deepEqual(
        itemTargets(verb),
        [...bandageOnly[verb], "splint"],
        `${verb}: the item joins the targets in the data's order`,
      );
      assert.ok(!itemTargets(verb).includes("moss"), `${verb} takes no moss`);
    }
    for (const [where, state] of WHERES) {
      for (const verb of VERBS) {
        const action = { kind: verb, item: "splint" };
        assert.deepEqual(
          programRules(held(state(), programFromRules(rule(ALWAYS, action))))[0]
            .action,
          action,
          `${verb} on the new item is taken in ${where}`,
        );
      }
    }
    const understanding = fullUnderstanding();
    const repertoire = repertoireOf(
      { ...understanding, items: [...understanding.items, "splint"] },
      [],
    );
    for (const verb of VERBS)
      assert.equal(
        actionInRepertoire(repertoire, { kind: verb, item: "splint" }),
        true,
        `${verb} on the new item lies in a repertoire that holds the item`,
      );
  });
  assert.deepEqual(Object.keys(ITEMS), before, "the data are as they were");
  for (const verb of VERBS)
    assert.deepEqual(itemTargets(verb), bandageOnly[verb], verb);
  for (const [where, state] of WHERES) {
    for (const verb of VERBS)
      assert.throws(
        () =>
          setProgram(
            state(),
            programFromRules(rule(ALWAYS, { kind: verb, item: "splint" })),
          ),
        ProgramCheckError,
        `${verb} on the item that is gone is refused ${where}`,
      );
  }
});

test("an item with a recipe alone is a target of „Wytwórz” only, and one with a healing property alone of „Opatrz” only", () => {
  // decision: D-443 "An action is a verb with a target, and the targets a verb takes follow from the properties of the items in the game's data"
  withItems({ board: BOARD, salve: SALVE }, () => {
    assert.ok(itemTargets("craft").includes("board"));
    assert.ok(!itemTargets("craft").includes("salve"));
    assert.ok(itemTargets("tend").includes("salve"));
    assert.ok(!itemTargets("tend").includes("board"));
    for (const [where, state] of WHERES) {
      for (const [verb, item] of [
        ["craft", "salve"],
        ["tend", "board"],
      ])
        assert.throws(
          () =>
            setProgram(
              state(),
              programFromRules(rule(ALWAYS, { kind: verb, item })),
            ),
          ProgramCheckError,
          `${verb} on ${item} is refused ${where}`,
        );
    }
  });
});

test("the check takes either verb with the bandage and builds the action from its kind and its item alone", () => {
  // decision: D-443 "An action is a verb with a target, and the targets a verb takes follow from the properties of the items in the game's data"
  for (const [where, state] of WHERES) {
    for (const verb of VERBS) {
      const offered = rule(ALWAYS, {
        kind: verb,
        item: "bandage",
        at: { q: 1, r: 1 },
        count: 3,
      });
      assert.deepEqual(
        programRules(held(state(), programFromRules(offered)))[0].action,
        { kind: verb, item: "bandage" },
        `${verb} ${where}`,
      );
    }
  }
});

test("the check refuses either verb with a target the data do not give it, and names the value", () => {
  // decision: D-443 "An action is a verb with a target, and the targets a verb takes follow from the properties of the items in the game's data"
  const refused = [
    "moss",
    "stick",
    "berry",
    "fiber",
    "unobtainium",
    "Bandage",
    "bandage ",
    "",
    "toString",
    "constructor",
    "__proto__",
    "hasOwnProperty",
    "0",
    0,
    1,
    null,
    true,
    ["bandage"],
    { toString: 1, valueOf: 1 },
    undefined,
  ];
  for (const [where, state] of WHERES) {
    const game = state();
    for (const verb of VERBS) {
      for (const item of refused) {
        const action =
          item === undefined ? { kind: verb } : { kind: verb, item };
        assert.throws(
          () => setProgram(game, programFromRules(rule(ALWAYS, action))),
          (error) =>
            error instanceof ProgramCheckError &&
            (!namedInRefusal(item) || error.message.includes(String(item))),
          `${verb} with ${JSON.stringify(item)} ${where}`,
        );
      }
    }
  }
});

test("the check refuses a verb with a target in a rule among valid rules and leaves the program the game held", () => {
  // decision: D-443 "An action is a verb with a target, and the targets a verb takes follow from the properties of the items in the game's data"
  for (const [where, state] of WHERES) {
    const game = state();
    const before = held(game, programFromRules(rule(ALWAYS, EXPLORE)));
    const bad = programFromRules(
      rule(ALWAYS, EXPLORE),
      rule(ALWAYS, { kind: "tend", item: "moss" }),
      rule(ALWAYS, EXPLORE),
    );
    assert.throws(() => setProgram(game, bad), ProgramCheckError, where);
    assert.deepEqual(
      held(game, programFromRules(rule(ALWAYS, EXPLORE))),
      before,
      where,
    );
  }
});

test("the bandage is never accepted as the resource of „Idź”, „Zbierz”, „Obchód” or „Tu leży mniej niż”, in a map run or outside one", () => {
  // decision: D-289 "A thing that lies on no map, such as the bandage, is no target of „Idź”, „Zbierz”, „Obchód” or „Tu leży mniej niż”, in a map run or outside one."
  for (const map of Object.values(MAPS))
    assert.ok(
      !map.resources.some((resource) => resource.id === "bandage"),
      "precondition: no map lays the bandage",
    );
  const bandage = (kind) => ({ kind, resource: "bandage" });
  const offers = {
    Idź: programFromRules(rule(ALWAYS, bandage("walkTo"))),
    Zbierz: programFromRules(rule(ALWAYS, bandage("gather"))),
    Obchód: programFromRules(rule(ALWAYS, bandage("patrol"))),
    "Tu leży mniej niż on a rule": programFromRules(
      rule({ ...bandage("hereBelow"), value: 3 }, EXPLORE),
    ),
    "Tu leży mniej niż on a group": {
      ...programFromRules(),
      groups: [
        {
          id: 1,
          name: "Grupa",
          condition: { ...bandage("hereBelow"), value: 3 },
          rules: [],
        },
      ],
    },
  };
  for (const [where, state] of WHERES) {
    const game = state();
    for (const [label, program] of Object.entries(offers))
      assert.throws(
        () => setProgram(game, program),
        ProgramCheckError,
        `${label} ${where}`,
      );
    // The control: the same place of the item names the bandage, so the refusal is no blanket one.
    const stock = programFromRules(
      rule({ kind: "itemBelow", item: "bandage", value: 3 }, EXPLORE),
    );
    assert.deepEqual(held(game, stock), stock, `Zapas poniżej ${where}`);
  }
});

/** A repertoire of a character with every skill, of an Understanding that holds `items` and every action. */
function repertoireWith(items) {
  return repertoireOf({ ...fullUnderstanding(), items }, [
    "exploration",
    "smallItemGathering",
    "campfireCrafting",
    "eating",
    "flameSpell",
  ]);
}

test("an action with an item target lies in the repertoire where its kind and its item lie there", () => {
  // decision: D-126 "The simulation passes over a program rule whose condition, action or the target of either lies outside the character's repertoire to the next program rule, as over a program rule whose action cannot be carried out in that game minute, and the program rule stays in the program."
  const items = fullUnderstanding().items;
  const known = repertoireWith(items);
  const withoutBandage = repertoireWith(items.filter((id) => id !== "bandage"));
  const withoutVerbs = {
    ...known,
    actions: known.actions.filter((kind) => !VERBS.includes(kind)),
  };
  for (const verb of VERBS) {
    const action = { kind: verb, item: "bandage" };
    assert.equal(actionInRepertoire(known, action), true, `${verb} known`);
    assert.equal(
      actionInRepertoire(withoutBandage, action),
      false,
      `${verb}, its item unknown`,
    );
    assert.equal(
      actionInRepertoire(withoutVerbs, action),
      false,
      `${verb}, its kind unknown`,
    );
    assert.equal(
      ruleInRepertoire(withoutBandage, { id: 1, condition: ALWAYS, action }),
      false,
    );
  }
});

test("the reason of a rule whose item target lies outside the repertoire names the item by its row", () => {
  // decision: D-310 "The reason names the thing refused as the game writes it, in lower case and without a dot before the name, such as „tu nie leży mech”, „brakuje 4 × patyk”, „brak opału: patyk” and „brak energii natury: 7 z 10”, and the reason of a rule outside the repertoire is „gałąź niewykupiona”, as of a greyed cell of the rule panel, or „jeszcze nieodkryte: {name}”."
  const items = fullUnderstanding().items;
  const withoutBandage = repertoireWith(items.filter((id) => id !== "bandage"));
  for (const verb of VERBS)
    assert.equal(
      outsideReason(withoutBandage, withoutBandage, {
        id: 1,
        condition: ALWAYS,
        action: { kind: verb, item: "bandage" },
      }),
      "jeszcze nieodkryte: opatrunek",
      verb,
    );
  withItems({ splint: SPLINT }, () => {
    const known = repertoireWith(items);
    for (const verb of VERBS)
      assert.equal(
        outsideReason(known, known, {
          id: 1,
          condition: ALWAYS,
          action: { kind: verb, item: "splint" },
        }),
        "jeszcze nieodkryte: szyna",
        `${verb}: the name stands in the row of the item`,
      );
  });
});

test("neither verb is grown by a character skill: both are open to every character and add no practice", () => {
  // decision: D-120 "An action that no character skill grows, such as a move onto a neighbouring tile, is open to every character, and an archetype never filters items."
  const understanding = fullUnderstanding();
  const none = repertoireOf(understanding, []);
  for (const verb of VERBS) {
    assert.ok(
      none.actions.includes(verb),
      `${verb} is open with no predisposition`,
    );
    assert.equal(
      actionInRepertoire(none, { kind: verb, item: "bandage" }),
      true,
      verb,
    );
    assert.deepEqual(
      practiced({ exploration: 4 }, verb),
      { exploration: 4 },
      `${verb} adds no practice`,
    );
  }
});

/** The pieces of one making of the bandage, as the data hold them (D-82): the chest and the trip plan carry them. */
const BANDAGE_USES = ITEMS.bandage.recipe.uses;
const BANDAGE_PIECES = Object.fromEntries(
  BANDAGE_USES.map(({ item, count }) => [item, count]),
);

/** A game sent to Las with the pieces of one making of the bandage in the backpack and `rules` as the program. */
function sentWithMoss(understanding, ...rules) {
  const created = createCharacter(
    { ...withEdgeSolved(newGame()), understanding },
    "Ala",
  ).state;
  const state = {
    ...created,
    team: { ...created.team, chest: { pieces: { ...BANDAGE_PIECES } } },
  };
  const program = {
    ...programFromRules(...rules),
    tripPlan: { take: BANDAGE_USES.map((use) => ({ ...use })), bring: [] },
  };
  return send(
    setProgram(state, program).state,
    { mapId: "forest", characterId: 1 },
    1760000000000,
  ).state;
}

test("a rule whose item target lies outside the repertoire is passed over, and the program keeps it", () => {
  // decision: D-126 "The simulation passes over a program rule whose condition, action or the target of either lies outside the character's repertoire to the next program rule, as over a program rule whose action cannot be carried out in that game minute, and the program rule stays in the program."
  const craft = rule(ALWAYS, { kind: "craft", item: "bandage" });
  const full = fullUnderstanding();
  const known = sentWithMoss(full, craft, rule(ALWAYS, EXPLORE));
  assert.deepEqual(
    Object.fromEntries(
      Object.keys(BANDAGE_PIECES).map((item) => [
        item,
        known.run.character.backpack[item],
      ]),
    ),
    BANDAGE_PIECES,
    "precondition: the pieces are carried",
  );
  assert.equal(
    known.run.current.activity.ruleId,
    1,
    "the item known: the character carries out the first rule",
  );
  const passed = sentWithMoss(
    { ...full, items: full.items.filter((id) => id !== "bandage") },
    craft,
    rule(ALWAYS, EXPLORE),
  );
  assert.equal(passed.run.current.activity.ruleId, 2);
  assert.deepEqual(passed.run.copy.program, {
    ...programFromRules(craft, rule(ALWAYS, EXPLORE)),
    tripPlan: { take: BANDAGE_USES, bring: [] },
  });
  assert.deepEqual(passed.ruleCounts, { 1: 0, 2: 1 });
  const reduced = programInRepertoire(
    passed.run.copy.program,
    repertoireWith(full.items.filter((id) => id !== "bandage")),
  );
  assert.deepEqual(
    programRules(reduced).map((each) => each.id),
    [2],
  );
});
