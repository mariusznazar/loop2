// The Understanding of the game and the repertoire computed from it. Expectations come from the
// task "odkrywanie" (To do 1, 3 and 4; Questions to settle 8 and 12), the vault file
// `odkrywanie_loop2.md` (D-82): To do 1 at line 14, To do 3 at line 20, To do 4 at line 21.
import assert from "node:assert/strict";
import { test } from "node:test";
import { MAPS } from "../../dist/public/sim/data/maps.js";
import {
  advanceMinutes,
  createCharacter,
  end,
  newGame,
  restart,
  send,
  setPaused,
  setProgram,
} from "../../dist/public/sim/game.js";
import {
  actionInRepertoire,
  conditionInRepertoire,
  editorRepertoire,
  newUnderstanding,
  programInRepertoire,
  repertoireOf,
  ruleInRepertoire,
} from "../../dist/public/sim/understanding.js";
import { programFromRules } from "./program-fixture.mjs";

const MAP_ID = Object.keys(MAPS)[0];
const REAL_MS = 1760000000000;

const ALL_SKILLS = [
  "exploration",
  "smallItemGathering",
  "campfireCrafting",
  "eating",
  "flameSpell",
];
const ALL_ACTIONS = [
  "explore",
  "wander",
  "walkTo",
  "walkToCampfire",
  "gather",
  "craftCampfire",
  "lightCampfire",
  "lightItem",
  "feedCampfire",
  "eat",
];
const ALL_CONDITIONS = [
  "always",
  "hereBelow",
  "temperatureBelow",
  "satietyBelow",
  "itemBelow",
  "campfireLeftBelow",
  "awayFromCampfire",
];
const ALL_ITEMS = ["stick", "berry", "moss", "fiber", "campfire"];
const FULL = {
  actions: ALL_ACTIONS,
  conditions: ALL_CONDITIONS,
  items: ALL_ITEMS,
};
// Skill -> the actions it grows, as To do 3 gives them.
const GROWN = {
  exploration: ["explore"],
  smallItemGathering: ["gather"],
  campfireCrafting: ["craftCampfire", "feedCampfire"],
  eating: ["eat"],
  flameSpell: ["lightCampfire", "lightItem"],
};
const OPEN_TO_ALL = ["wander", "walkTo", "walkToCampfire"];

test("a new game's Understanding holds the condition Zawsze alone", () => {
  assert.deepEqual(newUnderstanding(), {
    actions: [],
    conditions: ["always"],
    items: [],
  });
  assert.deepEqual(newGame().understanding, {
    actions: [],
    conditions: ["always"],
    items: [],
  });
});

test("two new Understandings share no array, so a change of one reaches no other", () => {
  const first = newUnderstanding();
  first.conditions.push("hereBelow");
  assert.deepEqual(newUnderstanding().conditions, ["always"]);
});

test("the mage, with all five skills, has the Understanding as its repertoire", () => {
  assert.deepEqual(repertoireOf(FULL, ALL_SKILLS), FULL);
});

test("the repertoire of the mage keeps the order of the Understanding", () => {
  const understanding = {
    actions: ["eat", "walkTo", "explore"],
    conditions: ["satietyBelow", "always"],
    items: ["campfire", "berry"],
  };
  assert.deepEqual(repertoireOf(understanding, ALL_SKILLS), understanding);
});

for (const skill of ALL_SKILLS) {
  test(`without the skill ${skill} the actions it grows leave the repertoire, the rest stays`, () => {
    const predispositions = ALL_SKILLS.filter((each) => each !== skill);
    const repertoire = repertoireOf(FULL, predispositions);
    assert.deepEqual(
      repertoire.actions,
      ALL_ACTIONS.filter((action) => !GROWN[skill].includes(action)),
    );
    assert.deepEqual(repertoire.conditions, ALL_CONDITIONS);
    assert.deepEqual(repertoire.items, ALL_ITEMS);
  });
}

test("with no predisposition only the actions no skill grows stay, and conditions and items stay", () => {
  const repertoire = repertoireOf(FULL, []);
  assert.deepEqual(repertoire.actions, OPEN_TO_ALL);
  assert.deepEqual(repertoire.conditions, ALL_CONDITIONS);
  assert.deepEqual(repertoire.items, ALL_ITEMS);
});

test("an action is in the repertoire only where the Understanding holds it", () => {
  const understanding = {
    actions: ["wander", "gather"],
    conditions: [],
    items: [],
  };
  assert.deepEqual(repertoireOf(understanding, ALL_SKILLS).actions, [
    "wander",
    "gather",
  ]);
  assert.deepEqual(repertoireOf(understanding, ["exploration"]).actions, [
    "wander",
  ]);
});

test("computing a repertoire changes neither argument and shares no array with the Understanding", () => {
  const understanding = {
    actions: ["explore", "eat"],
    conditions: ["always"],
    items: ["stick"],
  };
  const predispositions = ["exploration"];
  const repertoire = repertoireOf(understanding, predispositions);
  assert.deepEqual(understanding, {
    actions: ["explore", "eat"],
    conditions: ["always"],
    items: ["stick"],
  });
  assert.deepEqual(predispositions, ["exploration"]);
  repertoire.conditions.push("hereBelow");
  repertoire.items.push("moss");
  assert.deepEqual(understanding.conditions, ["always"]);
  assert.deepEqual(understanding.items, ["stick"]);
});

const SMALL = {
  actions: ["explore", "walkTo", "gather", "wander", "eat"],
  conditions: ["always", "hereBelow", "itemBelow", "temperatureBelow"],
  items: ["stick", "campfire"],
};

function rule(id, condition, action) {
  return { id, condition, action };
}

test("a condition outside the repertoire puts its rule outside it", () => {
  const outside = rule(
    1,
    { kind: "satietyBelow", value: 50 },
    { kind: "explore" },
  );
  assert.equal(conditionInRepertoire(SMALL, outside.condition), false);
  assert.equal(ruleInRepertoire(SMALL, outside), false);
});

test("an action outside the repertoire puts its rule outside it", () => {
  const outside = rule(1, { kind: "always" }, { kind: "craftCampfire" });
  assert.equal(actionInRepertoire(SMALL, outside.action), false);
  assert.equal(ruleInRepertoire(SMALL, outside), false);
});

test("a rule whose condition, action and targets lie in the repertoire lies in it", () => {
  for (const inside of [
    rule(1, { kind: "always" }, { kind: "explore" }),
    rule(
      2,
      { kind: "hereBelow", resource: "stick", value: 1 },
      { kind: "walkTo", resource: "stick" },
    ),
    rule(
      3,
      { kind: "itemBelow", item: "stick", value: 8 },
      { kind: "gather", resource: "stick" },
    ),
    rule(4, { kind: "temperatureBelow", value: 36 }, { kind: "eat" }),
  ]) {
    assert.equal(ruleInRepertoire(SMALL, inside), true, `rule ${inside.id}`);
  }
});

test("a target outside the items of the repertoire puts the condition or the action outside it", () => {
  assert.equal(
    conditionInRepertoire(SMALL, {
      kind: "hereBelow",
      resource: "berry",
      value: 1,
    }),
    false,
  );
  assert.equal(
    conditionInRepertoire(SMALL, { kind: "itemBelow", item: "moss", value: 1 }),
    false,
  );
  assert.equal(
    actionInRepertoire(SMALL, { kind: "walkTo", resource: "berry" }),
    false,
  );
  assert.equal(
    actionInRepertoire(SMALL, { kind: "gather", resource: "fiber" }),
    false,
  );
});

test("targets follow the items of the Understanding: the same rule moves in as its item enters", () => {
  const berries = rule(
    1,
    { kind: "always" },
    { kind: "gather", resource: "berry" },
  );
  assert.equal(ruleInRepertoire(SMALL, berries), false);
  const grown = repertoireOf(
    { ...SMALL, items: [...SMALL.items, "berry"] },
    ALL_SKILLS,
  );
  assert.equal(ruleInRepertoire(grown, berries), true);
});

test("an action and a condition that name no target need no item", () => {
  const bare = { actions: ["explore"], conditions: ["always"], items: [] };
  assert.equal(actionInRepertoire(bare, { kind: "explore" }), true);
  assert.equal(conditionInRepertoire(bare, { kind: "always" }), true);
});

test("the reduced program keeps identities and order and drops exactly the rules and groups outside the repertoire", () => {
  const program = {
    groups: [
      {
        id: 7,
        name: "Pierwsza",
        condition: { kind: "always" },
        rules: [
          rule(11, { kind: "always" }, { kind: "explore" }),
          rule(12, { kind: "always" }, { kind: "craftCampfire" }),
          rule(
            13,
            { kind: "hereBelow", resource: "stick", value: 2 },
            { kind: "gather", resource: "stick" },
          ),
          rule(14, { kind: "satietyBelow", value: 40 }, { kind: "eat" }),
          rule(15, { kind: "always" }, { kind: "walkTo", resource: "moss" }),
        ],
      },
      {
        id: 8,
        name: "Druga",
        condition: { kind: "satietyBelow", value: 30 },
        rules: [rule(21, { kind: "always" }, { kind: "explore" })],
      },
      {
        id: 9,
        name: "Trzecia",
        condition: { kind: "temperatureBelow", value: 36 },
        rules: [],
      },
    ],
    nextGroupId: 10,
    nextRuleId: 22,
  };
  const before = structuredClone(program);
  assert.deepEqual(programInRepertoire(program, SMALL), {
    groups: [
      {
        id: 7,
        name: "Pierwsza",
        condition: { kind: "always" },
        rules: [
          rule(11, { kind: "always" }, { kind: "explore" }),
          rule(
            13,
            { kind: "hereBelow", resource: "stick", value: 2 },
            { kind: "gather", resource: "stick" },
          ),
        ],
      },
      {
        id: 9,
        name: "Trzecia",
        condition: { kind: "temperatureBelow", value: 36 },
        rules: [],
      },
    ],
    nextGroupId: 10,
    nextRuleId: 22,
  });
  assert.deepEqual(program, before);
});

test("a program wholly inside the repertoire is reduced to an equal one", () => {
  const program = programFromRules({
    condition: { kind: "always" },
    action: { kind: "explore" },
  });
  assert.deepEqual(programInRepertoire(program, SMALL), program);
});

function sent() {
  let state = setProgram(
    newGame(),
    programFromRules({
      condition: { kind: "always" },
      action: { kind: "wander" },
    }),
  ).state;
  state = createCharacter(state, "Ala").state;
  return send(state, { mapId: MAP_ID, characterId: 1 }, REAL_MS).state;
}

test("the editor shows the repertoire of the mage through the Understanding, in the headquarters and in a map run", () => {
  const understanding = {
    actions: ["explore", "wander", "eat"],
    conditions: ["always"],
    items: ["stick"],
  };
  const hq = { ...createCharacter(newGame(), "Ala").state, understanding };
  assert.deepEqual(editorRepertoire(hq), understanding);
  assert.deepEqual(editorRepertoire(newGame()).actions, []);
  const running = { ...sent(), understanding };
  assert.deepEqual(editorRepertoire(running), understanding);
});

test("a map run of a character the team does not list falls back to the archetype of created characters", () => {
  const state = sent();
  const stray = {
    ...state,
    team: { ...state.team, characters: [] },
    understanding: FULL,
  };
  assert.deepEqual(editorRepertoire(stray), FULL);
});

test("creating, sending, restarting, pausing, changing the program and ending leave the Understanding as it is", () => {
  const understanding = {
    actions: ["explore", "walkTo"],
    conditions: ["always", "hereBelow"],
    items: ["stick", "campfire"],
  };
  const expected = structuredClone(understanding);
  let state = { ...newGame(), understanding };
  const steps = [
    (s) => createCharacter(s, "Ala"),
    (s) =>
      setProgram(
        s,
        programFromRules({
          condition: { kind: "always" },
          action: { kind: "wander" },
        }),
      ),
    (s) => send(s, { mapId: MAP_ID, characterId: 1 }, REAL_MS),
    (s) => setPaused(s, true),
    (s) => setPaused(s, false),
    (s) => restart(s),
    (s) => end(s),
  ];
  for (const [index, step] of steps.entries()) {
    state = step(state).state;
    assert.deepEqual(state.understanding, expected, `after step ${index}`);
  }
});

test("a character's death leaves the Understanding as it is", () => {
  const understanding = {
    actions: ["wander"],
    conditions: ["always"],
    items: [],
  };
  const state = advanceMinutes({ ...sent(), understanding }, 3000).state;
  assert.ok(state.run.death, "the character died");
  assert.deepEqual(state.understanding, {
    actions: ["wander"],
    conditions: ["always"],
    items: [],
  });
});
