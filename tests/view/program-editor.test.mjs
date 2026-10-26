// The program editor's commit rules (spec section 5, program panel; choice C12): pure functions,
// tested without a browser. Importing the module must not touch the DOM.
import assert from "node:assert/strict";
import { test } from "node:test";
import { ACTIONS } from "../../dist/public/sim/data/actions.js";
import { CONDITIONS } from "../../dist/public/sim/data/conditions.js";
import { ITEMS } from "../../dist/public/sim/data/items.js";
import { MAPS } from "../../dist/public/sim/data/maps.js";
import {
  advanceMinutes,
  createCharacter,
  end,
  newGame,
  send,
  setProgram,
} from "../../dist/public/sim/game.js";
import {
  addGroup,
  renameGroup,
  removeGroup,
  moveGroup,
  dropRule,
  addRule,
  createProgramEditor,
  focusAfter,
  moveRule,
  offeredResources,
  readNumberField,
  removeRule,
  showFieldRange,
  withActionKind,
  withActionResource,
  withConditionItem,
  withConditionKind,
  withConditionResource,
  withConditionValue,
} from "../../dist/public/view/program-editor.js";

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

// Task grupy-regul-i-liczniki, To do 3–4 (Mariusz, 2026-10-24); D-90 and D-93.
// Catches reused numbers, lost groups, insertion before removal and counts tied to position.
test("groups append with monotonic numbers through rename and deletion, including the last group", () => {
  const initial = newGame().program;
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
    assert.deepEqual(setProgram(newGame(), candidate).state.program, candidate);
  }
  assert.deepEqual(initial, newGame().program);
});

test("group arrows move the whole group and leave the edges unchanged", () => {
  const input = addGroup(THREE);
  const snapshot = copy(input);
  const moved = moveGroup(input, 1, 1);
  assert.ok(moved);
  assert.deepEqual(
    moved.groups.map((group) => group.id),
    [2, 1],
  );
  assert.deepEqual(moved.groups[1].rules, THREE.groups[0].rules);
  assert.deepEqual(moveGroup(moved, 1, -1), input);
  assert.equal(moveGroup(input, 1, -1), null);
  assert.equal(moveGroup(input, 2, 1), null);
  assert.equal(moveGroup(input, 99, 1), null);
  assert.deepEqual(input, snapshot);
});

test("group conditions offer the same kinds and editable fields while preserving rules and counts", () => {
  const state = {
    ...setProgram(newGame(), THREE).state,
    ruleCounts: { 1: 7, 2: 3, 3: 1 },
  };
  for (const [kind, expected] of [
    ["hereBelow", { kind: "hereBelow", resource: "stick", value: 1 }],
    ["temperatureBelow", { kind: "temperatureBelow", value: 36.5 }],
    ["satietyBelow", { kind: "satietyBelow", value: 50 }],
    ["itemBelow", { kind: "itemBelow", item: "stick", value: 8 }],
    ["campfireLeftBelow", { kind: "campfireLeftBelow", value: 20 }],
    ["awayFromCampfire", { kind: "awayFromCampfire" }],
  ]) {
    const changed = withConditionKind(THREE, 1, null, kind, LAS);
    assert.ok(changed, kind);
    assert.deepEqual(changed.groups[0].condition, expected);
    assert.deepEqual(changed.groups[0].rules, THREE.groups[0].rules);
    assert.deepEqual(setProgram(state, changed).state.ruleCounts, {
      1: 7,
      2: 3,
      3: 1,
    });
    assert.deepEqual(
      withConditionKind(changed, 1, null, "always", LAS).groups[0].condition,
      { kind: "always" },
    );
  }
  const resource = withConditionKind(THREE, 1, null, "hereBelow", LAS);
  assert.deepEqual(
    withConditionResource(resource, 1, null, "moss").groups[0].condition,
    { kind: "hereBelow", resource: "moss", value: 1 },
  );
  assert.deepEqual(
    withConditionValue(resource, 1, null, 9).groups[0].condition,
    { kind: "hereBelow", resource: "stick", value: 9 },
  );
  const item = withConditionKind(THREE, 1, null, "itemBelow", LAS);
  assert.deepEqual(
    withConditionItem(item, 1, null, "berry").groups[0].condition,
    { kind: "itemBelow", item: "berry", value: 8 },
  );
  assert.equal(withConditionKind(THREE, 1, null, "always", LAS), null);
  assert.equal(withConditionValue(THREE, 1, null, 9), null);
});

test("native drop targets place a rule before the target after removal, or append to a group", () => {
  const input = {
    ...THREE,
    groups: [
      ...THREE.groups,
      { id: 8, name: "Empty", condition: { kind: "always" }, rules: [] },
    ],
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
    };
    const checked = setProgram(state, moved).state;
    assert.deepEqual(checked.ruleCounts, { 1: 7, 2: 3, 3: 1 });
    assert.deepEqual(checked.program, moved);
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

/** Only the DOM operations used by the editor. Real events/focus are checked in the browser. */
function editorDocument() {
  return {
    createElement(tag) {
      return {
        tag,
        children: [],
        value: "",
        textContent: "",
        hidden: false,
        className: "",
        classList: { add() {} },
        setAttribute() {},
        addEventListener() {},
        focus() {},
        append(...items) {
          this.children.push(...items);
        },
        replaceChildren(...items) {
          this.children = items;
        },
        get options() {
          return this.children;
        },
      };
    },
  };
}

function descendants(element) {
  return [element, ...element.children.flatMap(descendants)];
}

test("count-only refresh changes count text without writing field values or replacing controls", () => {
  const savedDocument = globalThis.document;
  const savedOption = globalThis.Option;
  globalThis.document = editorDocument();
  globalThis.Option = class {
    constructor(text, value) {
      this.textContent = text;
      this.value = value;
      this.children = [];
    }
  };
  try {
    const program = structuredClone(THREE);
    program.groups[0].rules[1].condition = {
      kind: "itemBelow",
      item: "stick",
      value: 2,
    };
    const state = createCharacter(
      setProgram(newGame(), program).state,
      "Ala",
    ).state;
    const editor = createProgramEditor(() =>
      assert.fail("count update committed a program"),
    );
    editor.update(state);
    const elements = descendants(editor.element);
    const counts = elements.filter(
      (element) => element.className === "rule-count",
    );
    assert.equal(counts.length, 3);
    assert.ok(
      counts.every((count) => count.hidden && count.textContent === ""),
    );
    const fields = elements.filter((element) =>
      ["input", "select"].includes(element.tag),
    );
    const number = fields.filter((field) => field.type === "number")[2];
    number.value = "3e";
    const name = fields.find((field) => field.type === "text");
    name.value = "Uncommitted group name";
    const originalValues = fields.map((field) => field.value);
    for (const field of fields) {
      const value = field.value;
      Object.defineProperty(field, "value", {
        get: () => value,
        set: () => {
          assert.fail("count-only refresh wrote a field value");
        },
      });
    }
    for (const element of elements) {
      element.replaceChildren = () =>
        assert.fail("count-only refresh replaced children");
      element.focus = () => assert.fail("count-only refresh changed focus");
    }
    const running = send(state, SENT, 1760000000000).state;
    editor.updateCounts(running.ruleCounts);
    assert.deepEqual(
      counts.map((count) => count.textContent),
      ["1×", "0×", "0×"],
    );
    assert.ok(counts.every((count) => !count.hidden));
    const later = advanceMinutes(running, 20).state;
    editor.updateCounts(later.ruleCounts);
    assert.deepEqual(
      counts.map((count) => count.textContent),
      ["1×", "1×", "0×"],
    );
    editor.updateCounts(end(later).state.ruleCounts);
    assert.deepEqual(
      counts.map((count) => count.textContent),
      ["1×", "1×", "0×"],
    );
    assert.deepEqual(
      fields.map((field) => field.value),
      originalValues,
    );
    assert.deepEqual(descendants(editor.element), elements);
  } finally {
    if (savedDocument === undefined) delete globalThis.document;
    else globalThis.document = savedDocument;
    if (savedOption === undefined) delete globalThis.Option;
    else globalThis.Option = savedOption;
  }
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

test("the number field's range and step follow the condition kind; a kind with no number leaves them", () => {
  const input = { min: "", max: "", step: "" };
  showFieldRange(input, "temperatureBelow");
  assert.deepEqual(input, { min: "30", max: "37", step: "0.1" });
  showFieldRange(input, "hereBelow");
  assert.deepEqual(input, { min: "0", max: "50", step: "1" });
  showFieldRange(input, "satietyBelow");
  assert.deepEqual(input, { min: "0", max: "100", step: "1" });
  showFieldRange(input, "campfireLeftBelow");
  assert.deepEqual(input, { min: "0", max: "120", step: "1" });
  showFieldRange(input, "itemBelow");
  assert.deepEqual(input, { min: "0", max: "50", step: "1" });
  showFieldRange(input, "always");
  showFieldRange(input, "awayFromCampfire");
  assert.deepEqual(input, { min: "0", max: "50", step: "1" });
});

test("„Dodaj regułę” appends a fresh „Zawsze → Eksploruj” to the named group", () => {
  assert.deepEqual(addRule(newGame().program, 1).groups[0].rules, [
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
    withConditionKind(THREE, 1, 0, "hereBelow", LAS).groups[0].rules[0],
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
    withConditionKind(THREE, 1, 0, kind, LAS).groups[0].rules[0].condition;
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
    withConditionKind(THREE, 1, 0, "itemBelow", []).groups[0].rules[0].condition
      .kind,
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
    ).groups[0].rules[0].condition,
    { kind: "satietyBelow", value: 50 },
    "switching from one number kind to another puts in the new kind's default",
  );
});

test("„Zapas poniżej” offers every item of the data, and its item and number can be chosen", () => {
  let program = withConditionKind(THREE, 1, 1, "itemBelow", LAS);
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
  const withKind = (kind) => withConditionKind(THREE, 1, 0, kind, LAS);
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
    withConditionKind(THREE, 1, 1, "always", LAS).groups[0].rules[1],
    {
      id: 2,
      condition: { kind: "always" },
      action: { kind: "wander" },
    },
  );
  assert.equal(withConditionKind(THREE, 1, 1, "hereBelow", LAS), null);
  assert.equal(withConditionKind(THREE, 1, 0, "always", LAS), null);
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
  const game = newGame();
  assert.deepEqual(offeredResources(game), LAS);
  const running = send(
    createCharacter(game, "Ala").state,
    SENT,
    1760000000000,
  ).state;
  assert.deepEqual(offeredResources(running), LAS);
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
  const resources = offeredResources(newGame());
  const conditionKinds = Object.keys(CONDITIONS);
  const actionKinds = Object.keys(ACTIONS);
  assert.deepEqual(conditionKinds, [
    "always",
    "hereBelow",
    "temperatureBelow",
    "satietyBelow",
    "itemBelow",
    "campfireLeftBelow",
    "awayFromCampfire",
  ]);
  assert.deepEqual(actionKinds, [
    "explore",
    "wander",
    "walkTo",
    "walkToCampfire",
    "gather",
    ...CAMPFIRE_AND_BACKPACK,
  ]);

  // Every pair of kinds, every resource and item in every slot, and the number at its ends, off its
  // step and outside them.
  let program = newGame().program;
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
      keep(withConditionKind(program, 1, last, conditionKind, resources));
      keep(withActionKind(program, 1, last, actionKind, resources));
      for (const resource of resources) {
        if (conditionKind === "hereBelow")
          keep(withConditionResource(program, 1, last, resource));
        if (actionKind === "walkTo" || actionKind === "gather")
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
      assert.deepEqual(result.state.program, candidate);
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
  const input = { groups: [first, second], nextGroupId: 9, nextRuleId: 11 };
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
  assert.equal(moveRule(input, 8, 0, 1), null);
  assert.equal(moveRule(input, 3, 0, -1), null);
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
    assert.deepEqual(setProgram(newGame(), candidate).state.program, candidate);
  }
});
