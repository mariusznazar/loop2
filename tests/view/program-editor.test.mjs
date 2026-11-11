// The pure rules of the program editor (spec section 5, program panel; choice C12), tested without a
// browser. Importing the module must not touch the DOM. The DOM editor that drew them is gone (task
// edytor-programu, slice 13): the rule list, the rule panel and the program panel draw them now, and
// their cases stand in rule-editor.test.mjs and program-panel.test.mjs.
import assert from "node:assert/strict";
import { test } from "node:test";
import { ACTION_GROUPS, ACTIONS } from "../../dist/browser/sim/data/actions.js";
import {
  CONDITION_SECTIONS,
  CONDITIONS,
} from "../../dist/browser/sim/data/conditions.js";
import { ITEMS } from "../../dist/browser/sim/data/items.js";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import { RESOURCES } from "../../dist/browser/sim/data/resources.js";
import {
  createCharacter,
  newGame,
  send,
  setProgram,
} from "../../dist/browser/sim/game.js";
import {
  addGroup,
  renameGroup,
  removeGroup,
  dropRule,
  actionPick,
  actionPriceText,
  actionSentence,
  actionTargetPick,
  actionTime,
  addRule,
  conditionFields,
  conditionPick,
  conditionSentence,
  conditionTargetPick,
  countedName,
  countText,
  dropGroup,
  fieldAfter,
  focusAfter,
  groupNumber,
  groupSummary,
  moveRule,
  offeredActionKinds,
  offeredItems,
  offeredResources,
  PICK_REASONS,
  readNumberField,
  removeRule,
  ruleArrows,
  ruleFields,
  ruleNumber,
  ruleSentence,
  withActionKind,
  withActionResource,
  withConditionItem,
  withConditionKind,
  withConditionResource,
  withConditionValue,
} from "../../dist/browser/view/program-editor.js";
import { newKnowingGame } from "../sim/understanding-fixture.mjs";

const SENT = {
  mapId: Object.keys(MAPS)[0],
  // The first character a new game creates takes the id 1.
  characterId: 1,
};
const LAS = ["stick", "berry", "moss", "fiber"];
const ALWAYS_EXPLORE = {
  id: 1,
  condition: { kind: "always" },
  action: { kind: "explore" },
};
const BELOW_WANDER = {
  id: 2,
  condition: { kind: "hereBelow", resource: "berry", value: 4 },
  action: { kind: "wander" },
};
const ALWAYS_WALK = {
  id: 3,
  condition: { kind: "always" },
  action: { kind: "walkTo", resource: "moss" },
};
const THREE = {
  groups: [
    {
      id: 1,
      name: "Program",
      condition: { kind: "always" },
      rules: [ALWAYS_EXPLORE, BELOW_WANDER, ALWAYS_WALK],
    },
  ],
  tripPlan: { take: [], bring: [] },
  nextGroupId: 2,
  nextRuleId: 4,
};
/** The actions on the campfire and the backpack, which name nothing. */
const CAMPFIRE_AND_BACKPACK = [
  "craftCampfire",
  "lightCampfire",
  "lightItem",
  "feedCampfire",
  "eat",
];

/** The numbers the conditions take, written out from the spec's table (Decision 3). */
const HERE_BELOW = { defaultValue: 1, min: 0, max: 50, step: 1 };
const TEMPERATURE = { defaultValue: 36.5, min: 30, max: 37, step: 0.1 };
const ITEMS_LISTED = Object.keys(ITEMS);

/** A deep copy, to show that an edit leaves its input as it was. */
const copy = (value) => JSON.parse(JSON.stringify(value));

/** The program a game state holds: the copy during a map run, else the only program of the list (task, To do 1 and 7). */
function heldProgram(state) {
  return state.run === null
    ? state.programs[0].program
    : state.run.copy.program;
}

// Task grupy-regul-i-liczniki, To do 3–4 (Mariusz, 2026-10-24); D-90 and D-93.
// Catches reused numbers, lost groups, insertion before removal and counts tied to position.
test("groups append with monotonic numbers through rename and deletion, including the last group", () => {
  const initial = newGame().programs[0].program;
  const added = addGroup(initial);
  assert.equal(added.groups.length, 2);
  assert.deepEqual(added.groups[1], {
    id: 2,
    name: "Grupa 2",
    condition: { kind: "always" },
    rules: [],
  });
  const renamed = renameGroup(added, 2, "Plan");
  assert.equal(renamed.groups[1].name, "Plan");
  assert.deepEqual(renamed.groups[0], initial.groups[0]);
  const populated = addRule(renamed, 2);
  assert.deepEqual(populated.groups[1].rules, [ALWAYS_EXPLORE]);
  const removed = removeGroup(populated, 2);
  assert.deepEqual(removed.groups, initial.groups);
  const empty = removeGroup(removed, 1);
  assert.deepEqual(empty.groups, []);
  const again = addGroup(empty);
  assert.equal(again.groups[0].name, "Grupa 3");
  assert.equal(again.groups[0].id, 3);
  assert.equal(again.nextRuleId, 2);
  for (const candidate of [added, renamed, populated, removed, empty, again]) {
    assert.deepEqual(
      heldProgram(setProgram(newGame(), candidate).state),
      candidate,
    );
  }
  assert.deepEqual(initial, newGame().programs[0].program);
});

test("group conditions offer the same kinds and editable fields while preserving rules and counts", () => {
  const state = {
    ...setProgram(newGame(), THREE).state,
    ruleCounts: { 1: 7, 2: 3, 3: 1 },
    countsProgram: 1,
  };
  for (const [kind, expected] of [
    ["hereBelow", { kind: "hereBelow", resource: "stick", value: 1 }],
    ["temperatureBelow", { kind: "temperatureBelow", value: 36.5 }],
    ["satietyBelow", { kind: "satietyBelow", value: 50 }],
    // Task plomyk, To do 5: „Energia natury poniżej” starts at 30.
    ["natureEnergyBelow", { kind: "natureEnergyBelow", value: 30 }],
    ["itemBelow", { kind: "itemBelow", item: "stick", value: 8 }],
    ["campfireLeftBelow", { kind: "campfireLeftBelow", value: 20 }],
    ["healthBelow", { kind: "healthBelow", value: 50 }],
    ["opponentHealthBelow", { kind: "opponentHealthBelow", value: 10 }],
    ["awayFromCampfire", { kind: "awayFromCampfire" }],
  ]) {
    const changed = withConditionKind(THREE, 1, null, kind, LAS, ITEMS_LISTED);
    assert.ok(changed, kind);
    assert.deepEqual(changed.groups[0].condition, expected);
    assert.deepEqual(changed.groups[0].rules, THREE.groups[0].rules);
    assert.deepEqual(setProgram(state, changed).state.ruleCounts, {
      1: 7,
      2: 3,
      3: 1,
    });
    assert.deepEqual(
      withConditionKind(changed, 1, null, "always", LAS, ITEMS_LISTED).groups[0]
        .condition,
      { kind: "always" },
    );
  }
  const resource = withConditionKind(
    THREE,
    1,
    null,
    "hereBelow",
    LAS,
    ITEMS_LISTED,
  );
  assert.deepEqual(
    withConditionResource(resource, 1, null, "moss").groups[0].condition,
    { kind: "hereBelow", resource: "moss", value: 1 },
  );
  assert.deepEqual(
    withConditionValue(resource, 1, null, 9).groups[0].condition,
    { kind: "hereBelow", resource: "stick", value: 9 },
  );
  const item = withConditionKind(
    THREE,
    1,
    null,
    "itemBelow",
    LAS,
    ITEMS_LISTED,
  );
  assert.deepEqual(
    withConditionItem(item, 1, null, "berry").groups[0].condition,
    { kind: "itemBelow", item: "berry", value: 8 },
  );
  assert.equal(
    withConditionKind(THREE, 1, null, "always", LAS, ITEMS_LISTED),
    null,
  );
  assert.equal(withConditionValue(THREE, 1, null, 9), null);
});

test("native drop targets place a rule before the target after removal, or append to a group", () => {
  const input = {
    ...THREE,
    groups: [
      ...THREE.groups,
      { id: 8, name: "Empty", condition: { kind: "always" }, rules: [] },
    ],
    tripPlan: { take: [], bring: [] },
    nextGroupId: 9,
  };
  const snapshot = copy(input);
  for (const [label, id, groupId, beforeId, expected] of [
    ["downward", 1, 1, 3, [[2, 1, 3], []]],
    ["upward", 3, 1, 1, [[3, 1, 2], []]],
    ["append same group", 1, 1, undefined, [[2, 3, 1], []]],
    ["empty group", 2, 8, undefined, [[1, 3], [2]]],
  ]) {
    const moved = dropRule(input, id, groupId, beforeId);
    assert.ok(moved, label);
    assert.deepEqual(
      moved.groups.map((group) => group.rules.map((rule) => rule.id)),
      expected,
      label,
    );
    const state = {
      ...setProgram(newGame(), input).state,
      ruleCounts: { 1: 7, 2: 3, 3: 1 },
      countsProgram: 1,
    };
    const checked = setProgram(state, moved).state;
    assert.deepEqual(checked.ruleCounts, { 1: 7, 2: 3, 3: 1 });
    assert.deepEqual(heldProgram(checked), moved);
  }
  const transferred = dropRule(input, 2, 8);
  const back = dropRule(transferred, 2, 1, 3);
  assert.deepEqual(
    back.groups.map((group) => group.rules.map((rule) => rule.id)),
    [[1, 2, 3], []],
  );
  for (const args of [
    [1, 1, 1],
    [99, 1],
    [1, 99],
    [1, 1, 99],
    [1, 8, 2],
  ]) {
    assert.equal(dropRule(input, ...args), null, JSON.stringify(args));
  }
  assert.deepEqual(input, snapshot);
});

test("importing the editor touches no DOM: Node has no document and the import succeeded", () => {
  assert.equal(typeof globalThis.document, "undefined");
  assert.equal(typeof addRule, "function");
});

test("the number field: empty or not a number keeps the previous value and commits nothing", () => {
  for (const text of [
    "",
    "   ",
    "abc",
    "12abc",
    "Infinity",
    "-Infinity",
    "NaN",
  ]) {
    assert.deepEqual(
      readNumberField(text, 7, HERE_BELOW),
      { value: 7, commit: false },
      JSON.stringify(text),
    );
  }
});

test("the number field: a number is rounded to a whole number and committed when it differs", () => {
  assert.deepEqual(readNumberField("12", 1, HERE_BELOW), {
    value: 12,
    commit: true,
  });
  assert.deepEqual(readNumberField(" 12 ", 1, HERE_BELOW), {
    value: 12,
    commit: true,
  });
  assert.deepEqual(readNumberField("12.4", 1, HERE_BELOW), {
    value: 12,
    commit: true,
  });
  assert.deepEqual(readNumberField("12.5", 1, HERE_BELOW), {
    value: 13,
    commit: true,
  });
  assert.deepEqual(readNumberField("0", 1, HERE_BELOW), {
    value: 0,
    commit: true,
  });
});

test("the number field: a number is clamped to the data's range 0–50", () => {
  assert.equal(CONDITIONS.hereBelow.min, 0);
  assert.equal(CONDITIONS.hereBelow.max, 50);
  assert.deepEqual(readNumberField("51", 1, HERE_BELOW), {
    value: 50,
    commit: true,
  });
  assert.deepEqual(readNumberField("999", 1, HERE_BELOW), {
    value: 50,
    commit: true,
  });
  assert.deepEqual(readNumberField("-3", 1, HERE_BELOW), {
    value: 0,
    commit: true,
  });
  assert.deepEqual(readNumberField("-0.4", 1, HERE_BELOW), {
    value: 0,
    commit: true,
  });
  assert.ok(
    Object.is(readNumberField("-0.4", 1, HERE_BELOW).value, 0),
    "a rounded -0 is written back as 0",
  );
});

test("the number field: the same value after rounding or clamping is written back but not committed", () => {
  assert.deepEqual(readNumberField("12", 12, HERE_BELOW), {
    value: 12,
    commit: false,
  });
  assert.deepEqual(readNumberField("11.6", 12, HERE_BELOW), {
    value: 12,
    commit: false,
  });
  assert.deepEqual(readNumberField("80", 50, HERE_BELOW), {
    value: 50,
    commit: false,
  });
});

test("the number field: a temperature is rounded to the step of 0.1 and kept as the decimal the check keeps", () => {
  assert.deepEqual(readNumberField("36.57", 36.5, TEMPERATURE), {
    value: 36.6,
    commit: true,
  });
  assert.deepEqual(readNumberField("36.62", 36.5, TEMPERATURE), {
    value: 36.6,
    commit: true,
  });
  assert.deepEqual(readNumberField("35", 36.5, TEMPERATURE), {
    value: 35,
    commit: true,
  });
  assert.deepEqual(readNumberField("36.5", 36.5, TEMPERATURE), {
    value: 36.5,
    commit: false,
  });
  assert.deepEqual(readNumberField("36.53", 36.5, TEMPERATURE), {
    value: 36.5,
    commit: false,
  });
  const tenths = readNumberField("30.3", 36.5, TEMPERATURE).value;
  assert.equal(String(tenths), "30.3", "never 30.299999999999997");
});

test("the number field: a temperature is clamped to 30.0–37.0", () => {
  assert.deepEqual(readNumberField("29", 36.5, TEMPERATURE), {
    value: 30,
    commit: true,
  });
  assert.deepEqual(readNumberField("40", 36.5, TEMPERATURE), {
    value: 37,
    commit: true,
  });
  assert.deepEqual(readNumberField("-5", 30, TEMPERATURE), {
    value: 30,
    commit: false,
  });
});

test("„Dodaj regułę” appends a fresh „Zawsze → Eksploruj” to the named group", () => {
  assert.deepEqual(addRule(newGame().programs[0].program, 1).groups[0].rules, [
    ALWAYS_EXPLORE,
  ]);
  const before = copy(THREE);
  const added = addRule(THREE, 1);
  assert.deepEqual(added.groups[0].rules, [
    ALWAYS_EXPLORE,
    BELOW_WANDER,
    ALWAYS_WALK,
    { ...ALWAYS_EXPLORE, id: 4 },
  ]);
  assert.equal(added.nextRuleId, 5);
  assert.deepEqual(THREE, before);
});

test("„Usuń” removes the rule at its position without reassigning identities", () => {
  assert.deepEqual(removeRule(THREE, 1, 1).groups[0].rules, [
    ALWAYS_EXPLORE,
    ALWAYS_WALK,
  ]);
  assert.deepEqual(removeRule(THREE, 1, 2).groups[0].rules, [
    ALWAYS_EXPLORE,
    BELOW_WANDER,
  ]);
  const single = {
    ...THREE,
    groups: [{ ...THREE.groups[0], rules: [ALWAYS_WALK] }],
  };
  assert.deepEqual(removeRule(single, 1, 0).groups[0].rules, []);
  assert.equal(removeRule(single, 1, 0).nextRuleId, 4);
});

test("„↑” and „↓” swap a rule with its neighbour; past either end nothing is committed", () => {
  const before = copy(THREE);
  assert.deepEqual(moveRule(THREE, 1, 1, -1).groups[0].rules, [
    BELOW_WANDER,
    ALWAYS_EXPLORE,
    ALWAYS_WALK,
  ]);
  assert.deepEqual(moveRule(THREE, 1, 1, 1).groups[0].rules, [
    ALWAYS_EXPLORE,
    ALWAYS_WALK,
    BELOW_WANDER,
  ]);
  assert.equal(moveRule(THREE, 1, 0, -1), null);
  assert.equal(moveRule(THREE, 1, 2, 1), null);
  assert.deepEqual(THREE, before);
});

test("switching the condition to „Tu leży mniej niż” takes the map's first resource and the data's default N", () => {
  assert.deepEqual(
    withConditionKind(THREE, 1, 0, "hereBelow", LAS, ITEMS_LISTED).groups[0]
      .rules[0],
    {
      id: 1,
      condition: { kind: "hereBelow", resource: "stick", value: 1 },
      action: { kind: "explore" },
    },
  );
  assert.deepEqual(
    withConditionKind(THREE, 1, 0, "hereBelow", ["moss", "stick"]).groups[0]
      .rules[0].condition,
    { kind: "hereBelow", resource: "moss", value: 1 },
  );
});

test("switching the condition to a new kind puts in the kind's default number, and the first item for „Zapas poniżej”", () => {
  const switched = (kind) =>
    withConditionKind(THREE, 1, 0, kind, LAS, ITEMS_LISTED).groups[0].rules[0]
      .condition;
  assert.deepEqual(switched("temperatureBelow"), {
    kind: "temperatureBelow",
    value: 36.5,
  });
  assert.deepEqual(switched("satietyBelow"), {
    kind: "satietyBelow",
    value: 50,
  });
  assert.deepEqual(switched("itemBelow"), {
    kind: "itemBelow",
    item: ITEMS_LISTED[0],
    value: 8,
  });
  assert.deepEqual(switched("campfireLeftBelow"), {
    kind: "campfireLeftBelow",
    value: 20,
  });
  assert.deepEqual(switched("awayFromCampfire"), { kind: "awayFromCampfire" });
  assert.deepEqual(
    withConditionKind(THREE, 1, 0, "itemBelow", [], ITEMS_LISTED).groups[0]
      .rules[0].condition.kind,
    "itemBelow",
    "„Zapas poniżej” is bound to no map",
  );
  assert.deepEqual(
    withConditionKind(
      {
        ...THREE,
        groups: [
          {
            ...THREE.groups[0],
            rules: [
              { ...ALWAYS_EXPLORE, condition: switched("temperatureBelow") },
            ],
          },
        ],
      },
      1,
      0,
      "satietyBelow",
      LAS,
      ITEMS_LISTED,
    ).groups[0].rules[0].condition,
    { kind: "satietyBelow", value: 50 },
    "switching from one number kind to another puts in the new kind's default",
  );
});

test("„Zapas poniżej” offers every item of the data, and its item and number can be chosen", () => {
  let program = withConditionKind(THREE, 1, 1, "itemBelow", LAS, ITEMS_LISTED);
  for (const item of ITEMS_LISTED.slice(1)) {
    program = withConditionItem(program, 1, 1, item);
    assert.equal(program.groups[0].rules[1].condition.item, item);
  }
  const last = ITEMS_LISTED[ITEMS_LISTED.length - 1];
  assert.equal(withConditionItem(program, 1, 1, last), null);
  assert.equal(
    withConditionItem(THREE, 1, 1, last),
    null,
    "not „Zapas poniżej”",
  );
  assert.deepEqual(
    withConditionValue(program, 1, 1, 3).groups[0].rules[1].condition,
    {
      kind: "itemBelow",
      item: last,
      value: 3,
    },
  );
});

test("the number of the body's and the campfire's conditions can be chosen; „Z dala od” takes none", () => {
  const withKind = (kind) =>
    withConditionKind(THREE, 1, 0, kind, LAS, ITEMS_LISTED);
  assert.deepEqual(
    withConditionValue(withKind("temperatureBelow"), 1, 0, 35.2).groups[0]
      .rules[0].condition,
    { kind: "temperatureBelow", value: 35.2 },
  );
  assert.deepEqual(
    withConditionValue(withKind("campfireLeftBelow"), 1, 0, 5).groups[0]
      .rules[0].condition,
    { kind: "campfireLeftBelow", value: 5 },
  );
  assert.equal(withConditionValue(withKind("satietyBelow"), 1, 0, 50), null);
  assert.equal(withConditionValue(withKind("awayFromCampfire"), 1, 0, 5), null);
  assert.equal(withConditionValue(THREE, 1, 0, 5), null, "„Zawsze”");
});

test("switching the condition to „Zawsze” drops its resource and number; the same kind commits nothing", () => {
  assert.deepEqual(
    withConditionKind(THREE, 1, 1, "always", LAS, ITEMS_LISTED).groups[0]
      .rules[1],
    {
      id: 2,
      condition: { kind: "always" },
      action: { kind: "wander" },
    },
  );
  assert.equal(
    withConditionKind(THREE, 1, 1, "hereBelow", LAS, ITEMS_LISTED),
    null,
  );
  assert.equal(
    withConditionKind(THREE, 1, 0, "always", LAS, ITEMS_LISTED),
    null,
  );
});

test("switching the action to „Idź” takes the map's first resource; other kinds carry none", () => {
  assert.deepEqual(
    withActionKind(THREE, 1, 0, "walkTo", LAS).groups[0].rules[0],
    {
      id: 1,
      condition: { kind: "always" },
      action: { kind: "walkTo", resource: "stick" },
    },
  );
  assert.deepEqual(
    withActionKind(THREE, 1, 2, "wander", LAS).groups[0].rules[2].action,
    {
      kind: "wander",
    },
  );
  assert.deepEqual(
    withActionKind(THREE, 1, 2, "explore", LAS).groups[0].rules[2].action,
    {
      kind: "explore",
    },
  );
  assert.equal(withActionKind(THREE, 1, 2, "walkTo", LAS), null);
  assert.equal(withActionKind(THREE, 1, 0, "explore", LAS), null);
});

test("switching the action to „Zbierz” takes the map's first resource, and its resource can be chosen", () => {
  const gathering = withActionKind(THREE, 1, 0, "gather", LAS);
  assert.deepEqual(gathering.groups[0].rules[0], {
    id: 1,
    condition: { kind: "always" },
    action: { kind: "gather", resource: "stick" },
  });
  assert.deepEqual(
    withActionKind(THREE, 1, 2, "gather", ["berry", "stick"]).groups[0].rules[2]
      .action,
    { kind: "gather", resource: "berry" },
  );
  assert.deepEqual(
    withActionResource(gathering, 1, 0, "fiber").groups[0].rules[0].action,
    {
      kind: "gather",
      resource: "fiber",
    },
  );
  assert.equal(withActionResource(gathering, 1, 0, "stick"), null);
  assert.equal(withActionKind(gathering, 1, 0, "gather", LAS), null);
  assert.deepEqual(
    withActionKind(gathering, 1, 0, "wander", LAS).groups[0].rules[0].action,
    {
      kind: "wander",
    },
  );
  assert.equal(withActionKind(THREE, 1, 0, "gather", []), null);
});

test("„Idź — ognisko” and the actions on the campfire and the backpack are offered without a target", () => {
  for (const kind of ["walkToCampfire", ...CAMPFIRE_AND_BACKPACK]) {
    const switched = withActionKind(THREE, 1, 2, kind, LAS);
    assert.deepEqual(switched.groups[0].rules[2], {
      id: 3,
      condition: { kind: "always" },
      action: { kind },
    });
    assert.equal(withActionResource(switched, 1, 2, "stick"), null, kind);
    assert.equal(withActionKind(switched, 1, 2, kind, LAS), null, kind);
    assert.deepEqual(
      withActionKind(THREE, 1, 0, kind, []).groups[0].rules[0].action,
      { kind },
      `${kind} needs no resource of the map`,
    );
  }
});

test("choosing a resource or a number changes only that rule; the same choice commits nothing", () => {
  const before = copy(THREE);
  assert.deepEqual(
    withConditionResource(THREE, 1, 1, "fiber").groups[0].rules,
    [
      ALWAYS_EXPLORE,
      {
        ...BELOW_WANDER,
        condition: { kind: "hereBelow", resource: "fiber", value: 4 },
      },
      ALWAYS_WALK,
    ],
  );
  assert.deepEqual(
    withConditionValue(THREE, 1, 1, 12).groups[0].rules[1].condition,
    {
      kind: "hereBelow",
      resource: "berry",
      value: 12,
    },
  );
  assert.deepEqual(
    withActionResource(THREE, 1, 2, "stick").groups[0].rules[2].action,
    {
      kind: "walkTo",
      resource: "stick",
    },
  );
  assert.equal(withConditionResource(THREE, 1, 1, "berry"), null);
  assert.equal(withConditionValue(THREE, 1, 1, 4), null);
  assert.equal(withActionResource(THREE, 1, 2, "moss"), null);
  assert.deepEqual(THREE, before);
});

test("the resource lists offer the shown map's resources before sending and the run's map's during a run, in order", () => {
  const game = newKnowingGame();
  assert.deepEqual(offeredResources(game), LAS);
  const running = send(
    createCharacter(game, "Ala").state,
    SENT,
    1760000000000,
  ).state;
  assert.deepEqual(offeredResources(running), LAS);
});

// Task odkrywanie_loop2, To do 4 and 7 (vault, accepted 2026-10-26); D-124. Hand-written
// Understandings: a new game holds the condition "Zawsze" alone; the first chill adds "Eksploruj",
// "Wędruj" and "Temperatura poniżej" (written out here, not read from the data).
const AFTER_FIRST_CHILL = {
  actions: ["explore", "wander"],
  conditions: ["always", "temperatureBelow"],
  items: [],
  trees: [],
  creatures: [],
};
const gameKnowing = (understanding) => ({ ...newGame(), understanding });

test("the offer is the repertoire: a new game offers no action, no resource and no item, the first chill adds two actions", () => {
  const fresh = newGame();
  assert.deepEqual(offeredActionKinds(fresh), []);
  assert.deepEqual(offeredResources(fresh), []);
  assert.deepEqual(offeredItems(fresh), []);
  const chilled = gameKnowing(AFTER_FIRST_CHILL);
  assert.deepEqual(offeredActionKinds(chilled), ["explore", "wander"]);
});

test("target lists follow the Understanding's items: resources of the shown map in the map's order, backpack items in the data's order, the campfire in neither", () => {
  const state = gameKnowing({
    actions: [],
    conditions: ["always"],
    items: ["moss", "campfire", "stick"],
    trees: [],
    creatures: [],
  });
  assert.deepEqual(offeredResources(state), ["stick", "moss"]);
  assert.deepEqual(offeredItems(state), ["stick", "moss"]);
  const onlyCampfire = gameKnowing({
    actions: [],
    conditions: ["always"],
    items: ["campfire"],
    trees: [],
    creatures: [],
  });
  assert.deepEqual(offeredResources(onlyCampfire), []);
  assert.deepEqual(offeredItems(onlyCampfire), []);
});

test("an Understanding that holds everything gives lists of every action and condition of the data", () => {
  const everything = newKnowingGame();
  assert.deepEqual(
    offeredActionKinds(everything),
    Object.keys(ACTIONS).filter((kind) => kind !== "patrol"),
  );
});

test("a condition switching to „Zapas poniżej” takes the first of the offered items; with none offered nothing is committed", () => {
  assert.deepEqual(
    withConditionKind(THREE, 1, 0, "itemBelow", LAS, ["moss", "fiber"])
      .groups[0].rules[0].condition,
    { kind: "itemBelow", item: "moss", value: 8 },
  );
  assert.equal(withConditionKind(THREE, 1, 0, "itemBelow", LAS, []), null);
  assert.deepEqual(
    withConditionKind(THREE, 1, 0, "temperatureBelow", [], []).groups[0]
      .rules[0].condition,
    { kind: "temperatureBelow", value: 36.5 },
  );
});

// Review finding I-1: an action that names a resource is no choice while no resource is offered,
// since the edit would commit nothing.
const NO_TARGETS = {
  actions: ["explore", "wander", "walkTo", "gather"],
  conditions: ["always", "hereBelow", "itemBelow"],
  items: [],
  trees: [],
  creatures: [],
};

test("actions that name a resource are not offered while the Understanding holds no resource for them", () => {
  const state = gameKnowing(NO_TARGETS);
  assert.deepEqual(offeredActionKinds(state), ["explore", "wander"]);
  const resourceOnly = gameKnowing({ ...NO_TARGETS, items: ["moss"] });
  assert.deepEqual(offeredActionKinds(resourceOnly), [
    "explore",
    "wander",
    "walkTo",
    "gather",
  ]);
});

test("focus after a structural edit: same button in the moved rule's row, next „Usuń” or „Dodaj regułę”, new condition", () => {
  assert.deepEqual(focusAfter("up", 23, 2, 3), {
    groupId: 23,
    row: 1,
    control: "up",
  });
  assert.deepEqual(focusAfter("down", 23, 0, 3), {
    groupId: 23,
    row: 1,
    control: "down",
  });
  assert.deepEqual(focusAfter("remove", 23, 1, 2), {
    groupId: 23,
    row: 1,
    control: "remove",
  });
  assert.deepEqual(focusAfter("remove", 23, 2, 2), {
    groupId: 23,
    control: "add",
  });
  assert.deepEqual(focusAfter("remove", 23, 0, 0), {
    groupId: 23,
    control: "add",
  });
  assert.deepEqual(focusAfter("add", 23, 3, 4), {
    groupId: 23,
    row: 3,
    control: "condition",
  });
});

test("every program the editor builds passes setProgram, before sending and during a run", () => {
  const resources = offeredResources(newKnowingGame());
  const conditionKinds = Object.keys(CONDITIONS);
  const actionKinds = Object.keys(ACTIONS);
  assert.deepEqual(conditionKinds, [
    "always",
    "hereBelow",
    "temperatureBelow",
    "satietyBelow",
    "natureEnergyBelow",
    "itemBelow",
    "campfireLeftBelow",
    "healthBelow",
    "opponentHealthBelow",
    "awayFromCampfire",
  ]);
  assert.deepEqual(actionKinds, [
    "explore",
    "wander",
    "walkTo",
    "walkToCampfire",
    "gather",
    "patrol",
    ...CAMPFIRE_AND_BACKPACK,
    "strikeWithStick",
    "kick",
    "dodge",
  ]);

  // Every pair of kinds, every resource and item in every slot, and the number at its ends, off its
  // step and outside them.
  let program = newGame().programs[0].program;
  const built = [];
  const keep = (next) => {
    if (next) {
      program = next;
      built.push(next);
    }
  };
  for (const conditionKind of conditionKinds) {
    for (const actionKind of actionKinds) {
      keep(addRule(program, 1));
      const last = program.groups[0].rules.length - 1;
      keep(
        withConditionKind(
          program,
          1,
          last,
          conditionKind,
          resources,
          ITEMS_LISTED,
        ),
      );
      keep(withActionKind(program, 1, last, actionKind, resources));
      for (const resource of resources) {
        if (conditionKind === "hereBelow")
          keep(withConditionResource(program, 1, last, resource));
        if (
          actionKind === "walkTo" ||
          actionKind === "gather" ||
          actionKind === "patrol"
        )
          keep(withActionResource(program, 1, last, resource));
      }
      if (conditionKind === "itemBelow") {
        for (const item of ITEMS_LISTED)
          keep(withConditionItem(program, 1, last, item));
      }
      const def = CONDITIONS[conditionKind];
      if (def.step !== undefined) {
        for (const text of [
          String(def.min),
          String(def.max),
          String(def.min - 5),
          String(def.max + 27),
          String(def.min + def.step * 3.7),
          String(def.min + def.step * 6),
          "x",
        ]) {
          const field = readNumberField(
            text,
            program.groups[0].rules[last].condition.value,
            def,
          );
          if (field.commit)
            keep(withConditionValue(program, 1, last, field.value));
        }
      }
    }
  }
  keep(moveRule(program, 1, 0, 1));
  keep(moveRule(program, 1, program.groups[0].rules.length - 1, -1));
  keep(removeRule(program, 1, 2));
  keep(removeRule(program, 1, 0));
  assert.ok(built.length > 30, `only ${built.length} programs built`);

  const before = newGame();
  const during = send(
    createCharacter(newGame(), "Ala").state,
    SENT,
    1760000000000,
  ).state;
  for (const candidate of built) {
    for (const state of [before, during]) {
      const result = setProgram(state, candidate);
      assert.deepEqual(heldProgram(result.state), candidate);
    }
  }
});

// D-90 and the task's group-bound arrows: edits target a group identity, never its position.
test("rule edits preserve other groups, group boundaries and identities", () => {
  const first = {
    id: 8,
    name: "First",
    condition: { kind: "always" },
    rules: [ALWAYS_EXPLORE],
  };
  const second = {
    id: 3,
    name: "Second",
    condition: { kind: "hereBelow", resource: "stick", value: 2 },
    rules: [BELOW_WANDER, ALWAYS_WALK],
  };
  const input = {
    tripPlan: { take: [], bring: [] },
    groups: [first, second],
    nextGroupId: 9,
    nextRuleId: 11,
  };
  const before = copy(input);
  const added = addRule(input, 3);
  assert.deepEqual(added.groups[0], first);
  assert.equal(added.groups[1].id, 3);
  assert.equal(added.groups[1].name, "Second");
  assert.deepEqual(added.groups[1].condition, second.condition);
  assert.deepEqual(added.groups[1].rules, [
    BELOW_WANDER,
    ALWAYS_WALK,
    { id: 11, condition: { kind: "always" }, action: { kind: "explore" } },
  ]);
  assert.equal(added.nextRuleId, 12);
  assert.equal(added.nextGroupId, 9);
  const moved = moveRule(input, 3, 0, 1);
  assert.deepEqual(moved.groups[0], first);
  assert.deepEqual(moved.groups[1].rules, [ALWAYS_WALK, BELOW_WANDER]);
  // D-297 (task edytor-programu, To do 7): „↓” on the last rule of a group goes to the start of the
  // next group, „↑” on the first to the end of the previous one; null only at the program's ends.
  const down = moveRule(input, 8, 0, 1);
  assert.deepEqual(down.groups[0].rules, []);
  assert.deepEqual(down.groups[1].rules, [
    ALWAYS_EXPLORE,
    BELOW_WANDER,
    ALWAYS_WALK,
  ]);
  const up = moveRule(input, 3, 0, -1);
  assert.deepEqual(up.groups[0].rules, [ALWAYS_EXPLORE, BELOW_WANDER]);
  assert.deepEqual(up.groups[1].rules, [ALWAYS_WALK]);
  assert.equal(moveRule(input, 8, 0, -1), null);
  assert.equal(moveRule(input, 3, 1, 1), null);
  const changed = withConditionValue(input, 3, 0, 9);
  assert.deepEqual(changed.groups[0], first);
  assert.equal(changed.groups[1].rules[0].id, 2);
  assert.equal(changed.groups[1].rules[0].condition.value, 9);
  assert.deepEqual(changed.groups[1].rules[1], ALWAYS_WALK);
  const removed = removeRule(input, 3, 0);
  assert.deepEqual(removed.groups[0], first);
  assert.deepEqual(removed.groups[1].rules, [ALWAYS_WALK]);
  assert.equal(
    addRule(removed, 3).groups[1].rules[1].id,
    11,
    "deletion does not reuse a rule identity",
  );
  assert.deepEqual(input, before);
  for (const candidate of [added, moved, changed, removed]) {
    assert.deepEqual(
      heldProgram(setProgram(newGame(), candidate).state),
      candidate,
    );
  }
});

// Task edytor-programu, To do 4–5, D-289 and D-290: what the pick of the rule panel offers.

const NOT_BOUGHT = "gałąź niewykupiona";
const NO_RUN = "wybierzesz w przejściu postaci, która ją kupiła";
const NO_TARGET = "nie znasz jeszcze celu";
const NOT_ON_MAP = "nie ma go na tej mapie";
const EXPLORE = { kind: "explore" };
const ALWAYS = { kind: "always" };

/** A game in a map run whose Understanding holds everything and whose character bought no branch. */
function runningGame() {
  return send(
    createCharacter(newKnowingGame(), "Ala").state,
    SENT,
    1760000000000,
  ).state;
}

/** The state with the character of the map run holding the given purchased branches. */
function withBought(state, ...branches) {
  const ranks = Object.fromEntries(branches.map((branch) => [branch, 1]));
  return {
    ...state,
    run: {
      ...state.run,
      character: {
        ...state.run.character,
        skills: {
          smallItemGathering: { practice: 0, ranks },
          campfireCrafting: { practice: 0, ranks },
        },
      },
    },
  };
}

/** The state with the character of the map run holding exactly the given ranks, `{ skill: { branch: rank } }`. */
function withRanks(state, ranksBySkill) {
  return {
    ...state,
    run: {
      ...state.run,
      character: {
        ...state.run.character,
        skills: Object.fromEntries(
          Object.entries(ranksBySkill).map(([skill, ranks]) => [
            skill,
            { practice: 0, ranks },
          ]),
        ),
      },
    },
  };
}

/** The state with its Understanding replaced by the given parts of it. */
function knowing(state, understanding) {
  return {
    ...state,
    understanding: { ...state.understanding, ...understanding },
  };
}

/** Every cell of a pick, flat, by its value. */
function cellsOf(sections) {
  return Object.fromEntries(
    sections.flatMap((section) =>
      section.cells.map((cell) => [cell.value, cell]),
    ),
  );
}

test("the actions of the pick stand in four named groups, in the order of the task, the combat ones picked outside combat", () => {
  const sections = actionPick(newKnowingGame(), EXPLORE);
  assert.deepEqual(
    sections.map((section) => [
      section.name,
      section.cells.map((cell) => cell.label),
    ]),
    [
      ["Ruch", ["Eksploruj", "Wędruj", "Idź", "Idź — ognisko"]],
      ["Zbieranie", ["Zbierz", "Obchód"]],
      [
        "Ogień",
        [
          "Wytwórz — ognisko (6 patyków)",
          "Zapal — ognisko (2 patyki, 10 energii natury)",
          "Zapal — patyk (1 patyk, 10 energii natury)",
          "Zasil — ognisko (1 patyk)",
        ],
      ],
      [
        "Żywność i walka",
        ["Zjedz — jagoda (1 jagoda)", "Uderz — patyk", "Kopnij", "Odskocz"],
      ],
    ],
  );
  const cells = cellsOf(sections);
  for (const kind of ["strikeWithStick", "kick", "dodge", "gather", "eat"])
    assert.equal(cells[kind].greyed, false, kind);
});

test("the conditions of the pick stand in four sections with no names, in the order of the task", () => {
  const sections = conditionPick(newKnowingGame(), ALWAYS);
  assert.deepEqual(
    sections.map((section) => [
      section.name,
      section.cells.map((cell) => cell.label),
    ]),
    [
      [null, ["Zawsze"]],
      [
        null,
        [
          "Temperatura poniżej",
          "Sytość poniżej",
          "Zdrowie poniżej",
          "Energia natury poniżej",
        ],
      ],
      [
        null,
        [
          "Zapas poniżej",
          "Tu leży mniej niż",
          "Zostało mniej niż — ognisko",
          "Z dala od — ognisko",
        ],
      ],
      [null, ["Przeciwnik ma poniżej"]],
    ],
  );
  assert.deepEqual(
    sections.map((section) => section.cells.some((cell) => cell.chosen)),
    [true, false, false, false],
  );
});

test("a section holds only what the Understanding holds: a new game's condition pick is „Zawsze” alone", () => {
  const sections = conditionPick(newGame(), ALWAYS);
  assert.deepEqual(
    sections.map((section) => section.cells.map((cell) => cell.label)),
    [["Zawsze"]],
  );
  // D-118: the action pick of a new game holds no action but the held one.
  assert.deepEqual(
    actionPick(newGame(), EXPLORE).flatMap((section) =>
      section.cells.map((cell) => cell.value),
    ),
    ["explore"],
  );
});

test("every action names a group and every condition a section of the data, with its own place in it", () => {
  for (const [kind, def] of Object.entries(ACTIONS))
    assert.ok(def.group in ACTION_GROUPS, `action ${kind}`);
  const places = new Set();
  for (const [kind, def] of Object.entries(CONDITIONS)) {
    assert.ok(CONDITION_SECTIONS.includes(def.section), `condition ${kind}`);
    const place = `${def.section}/${def.place}`;
    assert.ok(!places.has(place), `condition ${kind} shares ${place}`);
    places.add(place);
  }
});

test("a branch action known and not bought stands greyed: „gałąź niewykupiona” in a map run, „wybierzesz w przejściu…” with none", () => {
  const during = cellsOf(actionPick(runningGame(), EXPLORE));
  assert.equal(during.patrol.greyed, true);
  assert.equal(during.patrol.reason, NOT_BOUGHT);
  assert.equal(during.gather.greyed, false);
  assert.equal(during.gather.reason, null);
  const outside = cellsOf(actionPick(newKnowingGame(), EXPLORE));
  assert.equal(outside.patrol.greyed, true);
  assert.equal(outside.patrol.reason, NO_RUN);
  const bought = cellsOf(
    actionPick(withBought(runningGame(), "patrol"), EXPLORE),
  );
  assert.equal(bought.patrol.greyed, false);
  assert.equal(PICK_REASONS.branchNotBought, NOT_BOUGHT);
  assert.equal(PICK_REASONS.branchWithoutRun, NO_RUN);
});

test("„Idź”, „Zbierz”, „Obchód”, „Tu leży mniej niż” and „Zapas poniżej” with no target to name stand greyed: „nie znasz jeszcze celu”", () => {
  const bare = withBought(knowing(runningGame(), { items: [] }), "patrol");
  const actions = cellsOf(actionPick(bare, EXPLORE));
  for (const kind of ["walkTo", "gather", "patrol"]) {
    assert.equal(actions[kind].greyed, true, kind);
    assert.equal(actions[kind].reason, NO_TARGET, kind);
  }
  for (const kind of ["explore", "wander", "walkToCampfire", "eat", "kick"]) {
    assert.equal(actions[kind].greyed, false, kind);
  }
  const conditions = cellsOf(conditionPick(bare, ALWAYS));
  for (const kind of ["hereBelow", "itemBelow"]) {
    assert.equal(conditions[kind].greyed, true, kind);
    assert.equal(conditions[kind].reason, NO_TARGET, kind);
  }
  assert.equal(conditions.temperatureBelow.greyed, false);
  // Outside a map run the same: nothing known to point at.
  const outside = knowing(newKnowingGame(), { items: [] });
  assert.equal(cellsOf(actionPick(outside, EXPLORE)).gather.reason, NO_TARGET);
  // One known item is a target: both stand open again.
  const one = knowing(newKnowingGame(), { items: ["stick"] });
  assert.equal(cellsOf(actionPick(one, EXPLORE)).gather.greyed, false);
  assert.equal(cellsOf(conditionPick(one, ALWAYS)).itemBelow.greyed, false);
});

test("a known resource the map of the map run lacks stands greyed: „nie ma go na tej mapie”; with no map run every known resource may be picked", () => {
  const map = MAPS[SENT.mapId];
  const resources = map.resources;
  map.resources = resources.filter((resource) => resource.id !== "fiber");
  try {
    const during = runningGame();
    const gather = actionTargetPick(during, {
      kind: "gather",
      resource: "stick",
    });
    assert.deepEqual(
      gather.map((cell) => [cell.label, cell.greyed, cell.reason]),
      [
        ["Patyk", false, null],
        ["Jagoda", false, null],
        ["Mech", false, null],
        ["Włókno", true, NOT_ON_MAP],
      ],
    );
    const here = conditionTargetPick(during, {
      kind: "hereBelow",
      resource: "fiber",
      value: 1,
    });
    assert.deepEqual(
      here.map((cell) => [cell.label, cell.chosen, cell.greyed, cell.reason]),
      [
        ["Patyk", false, false, null],
        ["Jagoda", false, false, null],
        ["Mech", false, false, null],
        ["Włókno", true, true, NOT_ON_MAP],
      ],
    );
    // „Zapas poniżej” stays bound to no map: the backpack can be filled elsewhere.
    const stock = conditionTargetPick(during, {
      kind: "itemBelow",
      item: "stick",
      value: 8,
    });
    assert.deepEqual(
      stock.map((cell) => [cell.label, cell.greyed, cell.reason]),
      [
        ["Patyk", false, null],
        ["Jagoda", false, null],
        ["Mech", false, null],
        ["Włókno", false, null],
      ],
    );
    const outside = actionTargetPick(newKnowingGame(), {
      kind: "gather",
      resource: "stick",
    });
    assert.deepEqual(
      outside.map((cell) => [cell.label, cell.greyed]),
      [
        ["Patyk", false],
        ["Jagoda", false],
        ["Mech", false],
        ["Włókno", false],
      ],
    );
  } finally {
    map.resources = resources;
  }
});

test("a target is picked from the resources of the Understanding alone, and an action with no target has no target field", () => {
  const state = knowing(newKnowingGame(), { items: ["berry", "stick"] });
  assert.deepEqual(
    actionTargetPick(state, { kind: "gather", resource: "berry" }).map(
      (cell) => [cell.label, cell.chosen],
    ),
    [
      ["Patyk", false],
      ["Jagoda", true],
    ],
  );
  assert.equal(actionTargetPick(state, EXPLORE), null);
  assert.equal(actionTargetPick(state, { kind: "kick" }), null);
  assert.equal(conditionTargetPick(state, ALWAYS), null);
  assert.equal(
    conditionTargetPick(state, { kind: "healthBelow", value: 5 }),
    null,
  );
});

test("a value the rule holds outside the pick stands chosen and greyed: with its reason where one fits, with none where none does", () => {
  // Fits „nie ma go na tej mapie”: shown above. Fits „gałąź niewykupiona”: a held „Obchód”.
  const held = actionPick(runningGame(), { kind: "patrol", resource: "stick" });
  const patrol = cellsOf(held).patrol;
  assert.deepEqual(
    [patrol.chosen, patrol.greyed, patrol.reason],
    [true, true, NOT_BOUGHT],
  );
  // No reason fits what the Understanding does not hold: the cell is shown, picked and greyed, with
  // no reason made up (the slice's report names the case).
  const unknown = knowing(newKnowingGame(), {
    actions: ["explore"],
    conditions: ["always"],
    items: ["stick"],
  });
  const kick = cellsOf(actionPick(unknown, { kind: "kick" })).kick;
  assert.deepEqual([kick.chosen, kick.greyed, kick.reason], [true, true, null]);
  const group = actionPick(unknown, { kind: "kick" }).find((section) =>
    section.cells.some((cell) => cell.value === "kick"),
  );
  assert.equal(group.name, "Żywność i walka");
  const condition = cellsOf(
    conditionPick(unknown, { kind: "healthBelow", value: 5 }),
  ).healthBelow;
  assert.deepEqual(
    [condition.chosen, condition.greyed, condition.reason],
    [true, true, null],
  );
  const item = conditionTargetPick(unknown, {
    kind: "itemBelow",
    item: "berry",
    value: 8,
  }).find((cell) => cell.value === "berry");
  assert.deepEqual([item.chosen, item.greyed, item.reason], [true, true, null]);
  // What is not held stays out of the pick.
  assert.deepEqual(Object.keys(cellsOf(actionPick(unknown, EXPLORE))), [
    "explore",
  ]);
});

test("the offer follows the character of the map run: a bought branch opens its action in the pick", () => {
  const state = withBought(runningGame(), "patrol");
  assert.equal(cellsOf(actionPick(state, EXPLORE)).patrol.greyed, false);
  assert.equal(cellsOf(actionPick(runningGame(), EXPLORE)).patrol.greyed, true);
});

test("a „Obchód” with no target to name and its branch bought stands greyed „nie znasz jeszcze celu”", () => {
  const state = withBought(knowing(runningGame(), { items: [] }), "patrol");
  const patrol = cellsOf(actionPick(state, EXPLORE)).patrol;
  assert.deepEqual([patrol.greyed, patrol.reason], [true, NO_TARGET]);
});

test("the fields of a rule: the number only where the condition takes one, a target only where one is named", () => {
  const rule = (condition, action) => ({ id: 1, condition, action });
  assert.deepEqual(ruleFields(rule(ALWAYS, EXPLORE)), ["condition", "action"]);
  assert.deepEqual(
    ruleFields(
      rule(
        { kind: "itemBelow", item: "stick", value: 8 },
        { kind: "gather", resource: "stick" },
      ),
    ),
    ["condition", "number", "conditionTarget", "action", "actionTarget"],
  );
  assert.deepEqual(
    ruleFields(rule({ kind: "temperatureBelow", value: 36 }, { kind: "kick" })),
    ["condition", "number", "action"],
  );
  assert.deepEqual(
    ruleFields(
      rule({ kind: "awayFromCampfire" }, { kind: "walkTo", resource: "moss" }),
    ),
    ["condition", "action", "actionTarget"],
  );
  assert.deepEqual(
    ruleFields(
      rule(
        { kind: "hereBelow", resource: "moss", value: 1 },
        { kind: "wander" },
      ),
    ),
    ["condition", "number", "conditionTarget", "action"],
  );
  assert.deepEqual(conditionFields(ALWAYS), ["condition"]);
  assert.deepEqual(conditionFields({ kind: "campfireLeftBelow", value: 3 }), [
    "condition",
    "number",
  ]);
});

test("the field after a pick follows the order condition, number, target, action, target, and none follows the last", () => {
  const written = [
    "condition",
    "number",
    "conditionTarget",
    "action",
    "actionTarget",
  ];
  assert.equal(fieldAfter(written, "condition"), "number");
  assert.equal(fieldAfter(written, "number"), "conditionTarget");
  assert.equal(fieldAfter(written, "conditionTarget"), "action");
  assert.equal(fieldAfter(written, "action"), "actionTarget");
  assert.equal(fieldAfter(written, "actionTarget"), null);
  // After „Zawsze” is picked the rule has no number: the action comes next.
  assert.equal(fieldAfter(["condition", "action"], "condition"), "action");
  assert.equal(fieldAfter(["condition", "action"], "number"), null);
});

test("the time of one execution: minutes from the data, „tura” in combat, a movement's step in a map run and nothing outside one", () => {
  const outside = newKnowingGame();
  assert.equal(actionTime(outside, "explore"), "20 min");
  assert.equal(actionTime(outside, "gather"), "10 min");
  assert.equal(actionTime(outside, "patrol"), "40 min");
  assert.equal(actionTime(outside, "craftCampfire"), "20 min");
  assert.equal(actionTime(outside, "lightCampfire"), "5 min");
  for (const kind of ["kick", "dodge", "strikeWithStick"])
    assert.equal(actionTime(outside, kind), "tura", kind);
  for (const kind of ["wander", "walkTo", "walkToCampfire"])
    assert.equal(actionTime(outside, kind), null, kind);
  const during = runningGame();
  assert.equal(actionTime(during, "gather"), "10 min");
  assert.equal(actionTime(during, "kick"), "tura");
  // The step of the first map is 5 minutes.
  for (const kind of ["wander", "walkTo", "walkToCampfire"])
    assert.equal(actionTime(during, kind), "5 min", kind);
  // The branch „Zgrabna konstrukcja” takes 5 minutes off crafting a campfire: 20 − 5.
  const bought = withBought(during, "neatConstruction");
  assert.equal(actionTime(bought, "craftCampfire"), "15 min");
  assert.equal(actionTime(bought, "gather"), "10 min");
});

// The prices below are the task koszty-i-stan-ogniska, To do 1 to 4, written out by hand from the
// examples of its To do 2 and from the data of the game: crafting a campfire uses 6 sticks, lighting it
// 2 sticks and 10 nature energy, lighting a stick 1 stick and 10, feeding 1 stick, eating 1 berry.
test("the price of an action: the pieces it uses up, then nature energy, each name in the form its count takes", () => {
  const outside = newKnowingGame();
  assert.equal(actionPriceText(outside, "craftCampfire"), "6 patyków");
  assert.equal(
    actionPriceText(outside, "lightCampfire"),
    "2 patyki, 10 energii natury",
  );
  assert.equal(
    actionPriceText(outside, "lightItem"),
    "1 patyk, 10 energii natury",
  );
  assert.equal(actionPriceText(outside, "feedCampfire"), "1 patyk");
  assert.equal(actionPriceText(outside, "eat"), "1 jagoda");
});

test("an action that uses up nothing has no price: a strike leaves its stick in the backpack, and walking, gathering and combat take nothing", () => {
  const outside = newKnowingGame();
  for (const kind of [
    "explore",
    "wander",
    "walkTo",
    "walkToCampfire",
    "gather",
    "patrol",
    "strikeWithStick",
    "kick",
    "dodge",
  ])
    assert.equal(actionPriceText(outside, kind), null, kind);
});

test("the price follows the character of the map run: „Czysty płomień” lights a campfire for nature energy alone, and outside a map run the price is the data's", () => {
  const during = runningGame();
  assert.equal(
    actionPriceText(during, "lightCampfire"),
    "2 patyki, 10 energii natury",
    "a character that bought nothing",
  );
  const clean = withRanks(during, { flameSpell: { cleanFlame: 1 } });
  assert.equal(actionPriceText(clean, "lightCampfire"), "10 energii natury");
  assert.equal(
    actionPriceText(clean, "lightItem"),
    "1 patyk, 10 energii natury",
    "lighting a stick is no part of the branch",
  );
  assert.equal(actionPriceText(clean, "craftCampfire"), "6 patyków");
  assert.equal(
    actionPriceText(newKnowingGame(), "lightCampfire"),
    "2 patyki, 10 energii natury",
  );
});

test("a name takes the form of its count in Polish: 1 the singular, 2 to 4 and 22 to 24 the few, 0, 5 to 21, 25 and 112 the many", () => {
  const forms = { one: "patyk", few: "patyki", many: "patyków" };
  const expected = [
    [0, "patyków"],
    [1, "patyk"],
    [2, "patyki"],
    [4, "patyki"],
    [5, "patyków"],
    [12, "patyków"],
    [14, "patyków"],
    [21, "patyków"],
    [22, "patyki"],
    [24, "patyki"],
    [25, "patyków"],
    [112, "patyków"],
    [122, "patyki"],
  ];
  for (const [count, form] of expected)
    assert.equal(countedName(count, forms), form, String(count));
});

test("every resource of the data has the forms of its name that its count takes in a price", () => {
  const forms = {
    stick: ["patyk", "patyki", "patyków"],
    berry: ["jagoda", "jagody", "jagód"],
    moss: ["mech", "mchy", "mchów"],
    fiber: ["włókno", "włókna", "włókien"],
  };
  assert.deepEqual(Object.keys(RESOURCES), Object.keys(forms));
  for (const [id, [one, few, many]] of Object.entries(forms)) {
    assert.equal(RESOURCES[id].name, one, id);
    assert.deepEqual(RESOURCES[id].plural, { few, many }, id);
  }
});

test("a cell of the action pick carries its price in brackets after its name, a greyed cell too, and the sentence of a rule's row never does", () => {
  const cells = cellsOf(actionPick(newKnowingGame(), EXPLORE));
  assert.equal(cells.craftCampfire.label, "Wytwórz — ognisko (6 patyków)");
  assert.equal(cells.gather.label, "Zbierz");
  // A held action the Understanding does not hold stands chosen and greyed, with its price.
  const held = cellsOf(actionPick(newGame(), { kind: "craftCampfire" }));
  assert.equal(held.craftCampfire.greyed, true);
  assert.equal(held.craftCampfire.chosen, true);
  assert.equal(held.craftCampfire.label, "Wytwórz — ognisko (6 patyków)");
  assert.equal(actionSentence({ kind: "craftCampfire" }), "Wytwórz — ognisko");
  // In the map run of a character with „Czysty płomień” the cell follows its price.
  const clean = withRanks(runningGame(), { flameSpell: { cleanFlame: 1 } });
  assert.equal(
    cellsOf(actionPick(clean, { kind: "lightCampfire" })).lightCampfire.label,
    "Zapal — ognisko (10 energii natury)",
  );
});

test("a rule is numbered by its group and its place in it, a group by its place in the program", () => {
  assert.equal(groupNumber(0), "1");
  assert.equal(groupNumber(1), "2");
  assert.equal(ruleNumber(0, 0), "1.1");
  assert.equal(ruleNumber(1, 0), "2.1");
  assert.equal(ruleNumber(1, 2), "2.3");
});

test("a row reads as a sentence: the condition with its number and target, then the action with its target", () => {
  const rule = {
    id: 1,
    condition: { kind: "itemBelow", item: "stick", value: 8 },
    action: { kind: "gather", resource: "stick" },
  };
  assert.deepEqual(ruleSentence(rule), {
    condition: "Zapas poniżej 8 · Patyk",
    action: "Zbierz — Patyk",
  });
  assert.deepEqual(
    ruleSentence({ id: 2, condition: ALWAYS, action: EXPLORE }),
    {
      condition: "Zawsze",
      action: "Eksploruj",
    },
  );
  assert.equal(
    conditionSentence({ kind: "hereBelow", resource: "berry", value: 4 }),
    "Tu leży mniej niż 4 · Jagoda",
  );
  assert.equal(
    conditionSentence({ kind: "campfireLeftBelow", value: 20 }),
    "Zostało mniej niż — ognisko 20",
  );
  assert.equal(
    conditionSentence({ kind: "awayFromCampfire" }),
    "Z dala od — ognisko",
  );
  assert.equal(actionSentence({ kind: "kick" }), "Kopnij");
  assert.equal(
    actionSentence({ kind: "walkTo", resource: "moss" }),
    "Idź — Mech",
  );
});

test("a group's summary: its name, condition, number of rules and the sum of their counts where counts stand", () => {
  const group = {
    id: 2,
    name: "Ogień",
    condition: { kind: "temperatureBelow", value: 35 },
    rules: [ALWAYS_EXPLORE, BELOW_WANDER, ALWAYS_WALK],
  };
  assert.deepEqual(groupSummary(group, { 1: 3, 3: 18 }), {
    name: "Ogień",
    condition: "Temperatura poniżej 35",
    ruleCount: 3,
    executed: 21,
  });
  assert.equal(groupSummary(group, null).executed, null);
  assert.equal(groupSummary(group, {}).executed, 0);
  assert.equal(groupSummary({ ...group, rules: [] }, { 1: 3 }).executed, 0);
  assert.equal(countText(21), "Wykonano 21×");
  assert.equal(countText(0), "Wykonano 0×");
});

test("the arrows are off only on the program's first and last rule, a group's edge being no end", () => {
  const second = {
    id: 2,
    name: "Dwa",
    condition: ALWAYS,
    rules: [BELOW_WANDER, ALWAYS_WALK],
  };
  const first = {
    id: 1,
    name: "Jeden",
    condition: ALWAYS,
    rules: [ALWAYS_EXPLORE],
  };
  const program = { ...THREE, groups: [first, second], nextGroupId: 3 };
  assert.deepEqual(ruleArrows(program, 1, 0), { up: false, down: true });
  assert.deepEqual(ruleArrows(program, 2, 0), { up: true, down: true });
  assert.deepEqual(ruleArrows(program, 2, 1), { up: true, down: false });
  const single = { ...THREE, groups: [THREE.groups[0]] };
  assert.deepEqual(ruleArrows(single, 1, 1), { up: true, down: true });
  assert.deepEqual(ruleArrows(single, 1, 0), { up: false, down: true });
  assert.deepEqual(ruleArrows(single, 1, 2), { up: true, down: false });
});

test("„↓” on the last rule of a group makes it the first of the next, „↑” on the first the last of the previous; an empty group takes it too", () => {
  const rules = (program) =>
    program.groups.map((group) => group.rules.map((rule) => rule.id));
  const program = {
    ...THREE,
    groups: [
      {
        id: 1,
        name: "A",
        condition: ALWAYS,
        rules: [ALWAYS_EXPLORE, BELOW_WANDER],
      },
      { id: 2, name: "B", condition: ALWAYS, rules: [] },
      { id: 3, name: "C", condition: ALWAYS, rules: [ALWAYS_WALK] },
    ],
    nextGroupId: 4,
  };
  const before = copy(program);
  assert.deepEqual(rules(moveRule(program, 1, 1, 1)), [[1], [2], [3]]);
  assert.deepEqual(rules(moveRule(program, 3, 0, -1)), [[1, 2], [3], []]);
  // Numbers follow the order: rule 2 of group 1 (1.2) becomes the first of group 2 (2.1).
  assert.deepEqual(moveRule(program, 1, 1, 1).groups[1].rules, [BELOW_WANDER]);
  // Within a group it still swaps with its neighbour.
  assert.deepEqual(rules(moveRule(program, 1, 0, 1)), [[2, 1], [], [3]]);
  // Past the program's ends, and for an unknown group or place, nothing.
  assert.equal(moveRule(program, 1, 0, -1), null);
  assert.equal(moveRule(program, 3, 0, 1), null);
  assert.equal(moveRule(program, 9, 0, 1), null);
  assert.equal(moveRule(program, 1, 5, 1), null);
  assert.deepEqual(program, before);
  // Counts and identities ride on the rule's identity: the program setProgram checks keeps them.
  const state = {
    ...setProgram(newGame(), program).state,
    ruleCounts: { 1: 7, 2: 3, 3: 1 },
    countsProgram: 1,
  };
  const checked = setProgram(state, moveRule(program, 1, 1, 1)).state;
  assert.deepEqual(checked.ruleCounts, { 1: 7, 2: 3, 3: 1 });
});

test("a rule group is dropped before another group or at the end, and a drop that changes nothing commits nothing", () => {
  const group = (id) => ({ id, name: `G${id}`, condition: ALWAYS, rules: [] });
  const program = {
    ...THREE,
    groups: [group(1), group(2), group(3)],
    nextGroupId: 4,
  };
  const order = (result) => result.groups.map((each) => each.id);
  const before = copy(program);
  assert.deepEqual(order(dropGroup(program, 3, 1)), [3, 1, 2]);
  assert.deepEqual(order(dropGroup(program, 1, 3)), [2, 1, 3]);
  assert.deepEqual(order(dropGroup(program, 1)), [2, 3, 1]);
  assert.deepEqual(order(dropGroup(program, 3, 2)), [1, 3, 2]);
  assert.equal(dropGroup(program, 2, 2), null);
  assert.equal(dropGroup(program, 2, 3), null, "before its own next neighbour");
  assert.equal(dropGroup(program, 3), null, "at the end from the end");
  assert.equal(dropGroup(program, 9, 1), null);
  assert.equal(dropGroup(program, 1, 9), null);
  assert.deepEqual(program, before);
  // A group keeps its rules, condition, name and the program's counters.
  const moved = dropGroup(
    {
      ...program,
      groups: [{ ...group(1), rules: [ALWAYS_EXPLORE] }, group(2)],
    },
    1,
  );
  assert.deepEqual(moved.groups[1].rules, [ALWAYS_EXPLORE]);
  assert.equal(moved.nextGroupId, 4);
});

test("a rule dropped on a folded group, which shows no rule to go before, lands at the group's end", () => {
  const program = {
    ...THREE,
    groups: [
      { id: 1, name: "A", condition: ALWAYS, rules: [ALWAYS_EXPLORE] },
      {
        id: 2,
        name: "B",
        condition: ALWAYS,
        rules: [BELOW_WANDER, ALWAYS_WALK],
      },
    ],
    nextGroupId: 3,
  };
  const dropped = dropRule(program, 1, 2);
  assert.deepEqual(
    dropped.groups.map((group) => group.rules.map((rule) => rule.id)),
    [[], [2, 3, 1]],
  );
});
