// The rule „Dodaj regułę z tym” adds (task ekran-przejscia, To do 7, questions 5 and 10; D-313, with
// D-124 and D-131). The pure function that builds it from a game state holding a map run and a held
// discovery, tested without a page: the rules, the group and the field the panel opens on are written
// out here, not read from the editor's functions.
import assert from "node:assert/strict";
import { test } from "node:test";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import {
  advanceMinutes,
  createCharacter,
  newGame,
  send,
  setProgram,
} from "../../dist/browser/sim/game.js";
import { discoveryRule } from "../../dist/browser/view/discovery-rule.js";
import { programWithRules } from "../sim/program-fixture.mjs";

const SENT = {
  mapId: Object.keys(MAPS)[0],
  // The first character a new game creates takes the id 1.
  characterId: 1,
};
const ALWAYS = { kind: "always" };
const EXPLORE = { kind: "explore" };
const rule = (id, condition, action) => ({ id, condition, action });

/** What a discovery holds when it holds only what the call names. */
const discovered = (found = {}) => ({
  actions: [],
  conditions: [],
  items: [],
  creatures: [],
  trees: [],
  ...found,
});

/** An Understanding of the start of a game plus what the call names, written out. */
const knowing = (found = {}) => ({
  ...discovered(found),
  conditions: ["always", ...(found.conditions ?? [])],
});

/**
 * A game with a map run carrying out `program`, whose Understanding and held discovery are the
 * given ones; the program stands in the copy as it was sent.
 */
function running(program, understanding, discovery) {
  const programmed = setProgram(newGame(), program).state;
  const sent = send(
    createCharacter(programmed, "Ala").state,
    SENT,
    1760000000000,
  ).state;
  return { ...sent, understanding, discovery };
}

/** The usual copy: the group „Program” with the rule the game writes at the first chill. */
const ONE_RULE = () =>
  programWithRules([{ condition: ALWAYS, action: EXPLORE }]);

test("the discovery „Odkryto: Zbierz, Patyk.” adds „Zawsze → Zbierz — patyk” at the end of the first group and opens the panel on the action", () => {
  const state = running(
    ONE_RULE(),
    knowing({
      actions: ["explore", "wander", "walkTo", "gather"],
      items: ["stick"],
    }),
    discovered({ actions: ["gather"], items: ["stick"] }),
  );
  const result = discoveryRule(state);
  assert.deepEqual(result.program.groups[0].rules, [
    rule(1, ALWAYS, EXPLORE),
    rule(2, ALWAYS, { kind: "gather", resource: "stick" }),
  ]);
  assert.equal(result.program.nextRuleId, 3);
  assert.deepEqual(result.open, { groupId: 1, ruleId: 2, field: "action" });
});

test("the target of the action is the first item of the same discovery the pick offers, not the first the grid offers", () => {
  // The grid offers stick first; the discovery names moss, so the rule gathers moss.
  const state = running(
    ONE_RULE(),
    knowing({
      actions: ["explore", "wander", "walkTo", "gather"],
      items: ["stick", "berry", "moss"],
    }),
    discovered({ actions: ["gather"], items: ["moss"] }),
  );
  const result = discoveryRule(state);
  assert.deepEqual(result.program.groups[0].rules[1], {
    id: 2,
    condition: ALWAYS,
    action: { kind: "gather", resource: "moss" },
  });
  assert.equal(result.open.field, "action");
});

test("of several items of the discovery that name a resource, the first in the order the discovery holds is the target", () => {
  const state = running(
    ONE_RULE(),
    knowing({
      actions: ["explore", "gather"],
      items: ["stick", "berry", "moss"],
    }),
    discovered({ actions: ["gather"], items: ["moss", "berry"] }),
  );
  assert.deepEqual(discoveryRule(state).program.groups[0].rules[1].action, {
    kind: "gather",
    resource: "moss",
  });
});

test("an action that takes a target with no matching item in the discovery takes the first target the grid offers", () => {
  // The discovery names only the campfire, which no rule can name; the grid offers berry first.
  const state = running(
    ONE_RULE(),
    knowing({
      actions: ["explore", "walkTo"],
      items: ["berry", "moss", "campfire"],
    }),
    discovered({ actions: ["walkTo"], items: ["campfire"] }),
  );
  const result = discoveryRule(state);
  assert.deepEqual(result.program.groups[0].rules[1], {
    id: 2,
    condition: ALWAYS,
    action: { kind: "walkTo", resource: "berry" },
  });
  assert.equal(result.open.field, "action");
});

test("a first action that needs a target nobody can pick yet gives way to the next action of the discovery", () => {
  // No item is held, so „Idź” has nothing to name and its cell stands greyed in the panel.
  const state = running(
    ONE_RULE(),
    knowing({ actions: ["explore", "walkTo", "wander"] }),
    discovered({ actions: ["walkTo", "wander"] }),
  );
  const result = discoveryRule(state);
  assert.deepEqual(result.program.groups[0].rules[1], {
    id: 2,
    condition: ALWAYS,
    action: { kind: "wander" },
  });
  assert.equal(result.open.field, "action");
});

test("the first chill adds „Zawsze → Eksploruj” at the end of the group „Program” and opens the panel on the action", () => {
  // The real first chill of a new game: the discovery holds „Eksploruj”, „Wędruj” and „Temperatura
  // poniżej”, and the copy already holds the rule the game wrote.
  let state = createCharacter(newGame(), "Ala").state;
  state = send(state, SENT, 1760000000003).state;
  const chilled = advanceMinutes(state, 100).state;
  assert.deepEqual(chilled.discovery.actions, ["explore", "wander"]);
  assert.deepEqual(chilled.discovery.conditions, ["temperatureBelow"]);
  const before = chilled.run.copy.program.groups[0].rules;
  assert.equal(before.length, 1);
  const result = discoveryRule(chilled);
  assert.equal(result.program.groups[0].name, "Program");
  assert.deepEqual(result.program.groups[0].rules, [
    ...before,
    rule(before[0].id + 1, ALWAYS, EXPLORE),
  ]);
  assert.deepEqual(result.open, {
    groupId: result.program.groups[0].id,
    ruleId: before[0].id + 1,
    field: "action",
  });
});

test("a discovery of conditions alone adds „{first condition} → Eksploruj” with the number a pick of that condition gives, and opens the panel on the condition", () => {
  const state = running(
    ONE_RULE(),
    knowing({ actions: ["explore"], conditions: ["temperatureBelow"] }),
    discovered({ conditions: ["temperatureBelow"] }),
  );
  const result = discoveryRule(state);
  assert.deepEqual(result.program.groups[0].rules[1], {
    id: 2,
    condition: { kind: "temperatureBelow", value: 36.5 },
    action: EXPLORE,
  });
  assert.deepEqual(result.open, { groupId: 1, ruleId: 2, field: "condition" });
});

test("the first condition is the first the discovery holds", () => {
  const state = running(
    ONE_RULE(),
    knowing({
      actions: ["explore"],
      conditions: ["healthBelow", "temperatureBelow"],
    }),
    discovered({ conditions: ["healthBelow", "temperatureBelow"] }),
  );
  assert.deepEqual(discoveryRule(state).program.groups[0].rules[1].condition, {
    kind: "healthBelow",
    value: 50,
  });
});

test("a condition that names a target takes the target a pick of that condition gives", () => {
  // „Zapas poniżej” names an item of the backpack, „Tu leży mniej niż” a resource of the map.
  const understanding = knowing({
    actions: ["explore"],
    conditions: ["itemBelow", "hereBelow"],
    items: ["berry", "moss"],
  });
  const itemRule = discoveryRule(
    running(
      ONE_RULE(),
      understanding,
      discovered({ conditions: ["itemBelow"] }),
    ),
  );
  assert.deepEqual(itemRule.program.groups[0].rules[1], {
    id: 2,
    condition: { kind: "itemBelow", item: "berry", value: 8 },
    action: EXPLORE,
  });
  assert.equal(itemRule.open.field, "condition");
  const hereRule = discoveryRule(
    running(
      ONE_RULE(),
      understanding,
      discovered({ conditions: ["hereBelow"] }),
    ),
  );
  assert.deepEqual(hereRule.program.groups[0].rules[1], {
    id: 2,
    condition: { kind: "hereBelow", resource: "berry", value: 1 },
    action: EXPLORE,
  });
  assert.equal(hereRule.open.field, "condition");
});

test("a condition that needs a target nobody can pick yet gives way to the next condition of the discovery", () => {
  const state = running(
    ONE_RULE(),
    knowing({
      actions: ["explore"],
      conditions: ["hereBelow", "satietyBelow"],
    }),
    discovered({ conditions: ["hereBelow", "satietyBelow"] }),
  );
  assert.deepEqual(discoveryRule(state).program.groups[0].rules[1].condition, {
    kind: "satietyBelow",
    value: 50,
  });
});

test("a discovery that holds an action and a condition writes the action, with the condition „Zawsze”", () => {
  const state = running(
    ONE_RULE(),
    knowing({
      actions: ["explore", "wander"],
      conditions: ["temperatureBelow"],
    }),
    discovered({ actions: ["wander"], conditions: ["temperatureBelow"] }),
  );
  const result = discoveryRule(state);
  assert.deepEqual(result.program.groups[0].rules[1], {
    id: 2,
    condition: ALWAYS,
    action: { kind: "wander" },
  });
  assert.equal(result.open.field, "action");
});

test("a discovery of an item, a creature or a tree alone does what „+ reguła” does: „Zawsze → Eksploruj”, the panel on the condition", () => {
  const understanding = knowing({
    actions: ["explore"],
    items: ["stick"],
    creatures: ["wolf"],
    trees: ["exploration"],
  });
  for (const found of [
    { items: ["stick"] },
    { creatures: ["wolf"] },
    { trees: ["exploration"] },
  ]) {
    const result = discoveryRule(
      running(ONE_RULE(), understanding, discovered(found)),
    );
    assert.deepEqual(
      result.program.groups[0].rules[1],
      rule(2, ALWAYS, EXPLORE),
      JSON.stringify(found),
    );
    assert.deepEqual(
      result.open,
      { groupId: 1, ruleId: 2, field: "condition" },
      JSON.stringify(found),
    );
  }
});

test("the rule stands last in the first group, takes the copy's next rule identity, and every other group and rule stays as it was", () => {
  const program = {
    groups: [
      {
        id: 5,
        name: "Pierwsza",
        condition: { kind: "temperatureBelow", value: 35 },
        rules: [
          rule(3, ALWAYS, EXPLORE),
          rule(9, { kind: "satietyBelow", value: 40 }, { kind: "wander" }),
        ],
      },
      {
        id: 2,
        name: "Druga",
        condition: ALWAYS,
        rules: [rule(4, ALWAYS, { kind: "wander" })],
      },
    ],
    tripPlan: { take: [], bring: [] },
    nextGroupId: 6,
    nextRuleId: 12,
  };
  const state = running(
    program,
    knowing({ actions: ["explore", "wander", "gather"], items: ["stick"] }),
    discovered({ actions: ["gather"], items: ["stick"] }),
  );
  const held = state.run.copy.program;
  const result = discoveryRule(state);
  const added = rule(12, ALWAYS, { kind: "gather", resource: "stick" });
  assert.deepEqual(result.program, {
    ...held,
    groups: [
      { ...held.groups[0], rules: [...held.groups[0].rules, added] },
      held.groups[1],
    ],
    nextRuleId: 13,
  });
  assert.equal(result.program.groups[0].rules.length, 3);
  assert.deepEqual(result.open, { groupId: 5, ruleId: 12, field: "action" });
});

test("the function changes nothing in the state it is given", () => {
  const state = running(
    ONE_RULE(),
    knowing({ actions: ["explore", "gather"], items: ["stick"] }),
    discovered({ actions: ["gather"], items: ["stick"] }),
  );
  const before = JSON.stringify(state);
  discoveryRule(state);
  assert.equal(JSON.stringify(state), before);
});

test("the program it gives is one the game takes whole, and handing it over sets the streak to zero", () => {
  const state = running(
    ONE_RULE(),
    knowing({ actions: ["explore", "gather"], items: ["stick"] }),
    discovered({ actions: ["gather"], items: ["stick"] }),
  );
  const streaking = { ...state, run: { ...state.run, streak: 120 } };
  const result = discoveryRule(streaking);
  const handed = setProgram(streaking, result.program).state;
  assert.deepEqual(handed.run.copy.program, result.program);
  assert.equal(handed.run.streak, 0);
});

test("where the copy holds no rule group, there is nothing to add to", () => {
  const state = running(
    { ...ONE_RULE(), groups: [] },
    knowing({ actions: ["explore"] }),
    discovered({ actions: ["explore"] }),
  );
  assert.deepEqual(state.run.copy.program.groups, []);
  assert.equal(discoveryRule(state), null);
});

test("where the game holds no discovery, there is nothing to add", () => {
  const state = running(ONE_RULE(), knowing({ actions: ["explore"] }), null);
  assert.equal(discoveryRule(state), null);
});

test("where the game holds no map run, there is nothing to add", () => {
  const state = {
    ...newGame(),
    understanding: knowing({ actions: ["explore"] }),
    discovery: discovered({ actions: ["explore"] }),
  };
  assert.equal(state.run, null);
  assert.equal(discoveryRule(state), null);
});
