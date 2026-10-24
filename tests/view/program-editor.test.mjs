// The program editor's commit rules (spec section 5, program panel; choice C12): pure functions,
// tested without a browser. Importing the module must not touch the DOM.
import assert from "node:assert/strict";
import { test } from "node:test";
import { ACTIONS } from "../../dist/public/sim/data/actions.js";
import { CONDITIONS } from "../../dist/public/sim/data/conditions.js";
import { ITEMS } from "../../dist/public/sim/data/items.js";
import { MAPS } from "../../dist/public/sim/data/maps.js";
import {
  createCharacter,
  newGame,
  send,
  setProgram,
} from "../../dist/public/sim/game.js";
import {
  addRule,
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
  condition: { kind: "always" },
  action: { kind: "explore" },
};
const BELOW_WANDER = {
  condition: { kind: "hereBelow", resource: "berry", value: 4 },
  action: { kind: "wander" },
};
const ALWAYS_WALK = {
  condition: { kind: "always" },
  action: { kind: "walkTo", resource: "moss" },
};
const THREE = { rules: [ALWAYS_EXPLORE, BELOW_WANDER, ALWAYS_WALK] };
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

test("„Dodaj regułę” appends „Zawsze → Eksploruj”", () => {
  assert.deepEqual(addRule({ rules: [] }), { rules: [ALWAYS_EXPLORE] });
  const before = copy(THREE);
  assert.deepEqual(addRule(THREE), {
    rules: [ALWAYS_EXPLORE, BELOW_WANDER, ALWAYS_WALK, ALWAYS_EXPLORE],
  });
  assert.deepEqual(THREE, before);
});

test("„Usuń” removes the rule at its position", () => {
  assert.deepEqual(removeRule(THREE, 1), {
    rules: [ALWAYS_EXPLORE, ALWAYS_WALK],
  });
  assert.deepEqual(removeRule(THREE, 2), {
    rules: [ALWAYS_EXPLORE, BELOW_WANDER],
  });
  assert.deepEqual(removeRule({ rules: [ALWAYS_WALK] }, 0), { rules: [] });
});

test("„↑” and „↓” swap a rule with its neighbour; past either end nothing is committed", () => {
  const before = copy(THREE);
  assert.deepEqual(moveRule(THREE, 1, -1), {
    rules: [BELOW_WANDER, ALWAYS_EXPLORE, ALWAYS_WALK],
  });
  assert.deepEqual(moveRule(THREE, 1, 1), {
    rules: [ALWAYS_EXPLORE, ALWAYS_WALK, BELOW_WANDER],
  });
  assert.equal(moveRule(THREE, 0, -1), null);
  assert.equal(moveRule(THREE, 2, 1), null);
  assert.deepEqual(THREE, before);
});

test("switching the condition to „Tu leży mniej niż” takes the map's first resource and the data's default N", () => {
  assert.deepEqual(withConditionKind(THREE, 0, "hereBelow", LAS).rules[0], {
    condition: { kind: "hereBelow", resource: "stick", value: 1 },
    action: { kind: "explore" },
  });
  assert.deepEqual(
    withConditionKind(THREE, 0, "hereBelow", ["moss", "stick"]).rules[0]
      .condition,
    { kind: "hereBelow", resource: "moss", value: 1 },
  );
});

test("switching the condition to a new kind puts in the kind's default number, and the first item for „Zapas poniżej”", () => {
  const switched = (kind) =>
    withConditionKind(THREE, 0, kind, LAS).rules[0].condition;
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
    withConditionKind(THREE, 0, "itemBelow", []).rules[0].condition.kind,
    "itemBelow",
    "„Zapas poniżej” is bound to no map",
  );
  assert.deepEqual(
    withConditionKind(
      {
        rules: [{ ...ALWAYS_EXPLORE, condition: switched("temperatureBelow") }],
      },
      0,
      "satietyBelow",
      LAS,
    ).rules[0].condition,
    { kind: "satietyBelow", value: 50 },
    "switching from one number kind to another puts in the new kind's default",
  );
});

test("„Zapas poniżej” offers every item of the data, and its item and number can be chosen", () => {
  let program = withConditionKind(THREE, 1, "itemBelow", LAS);
  for (const item of ITEMS_LISTED.slice(1)) {
    program = withConditionItem(program, 1, item);
    assert.equal(program.rules[1].condition.item, item);
  }
  const last = ITEMS_LISTED[ITEMS_LISTED.length - 1];
  assert.equal(withConditionItem(program, 1, last), null);
  assert.equal(withConditionItem(THREE, 1, last), null, "not „Zapas poniżej”");
  assert.deepEqual(withConditionValue(program, 1, 3).rules[1].condition, {
    kind: "itemBelow",
    item: last,
    value: 3,
  });
});

test("the number of the body's and the campfire's conditions can be chosen; „Z dala od” takes none", () => {
  const withKind = (kind) => withConditionKind(THREE, 0, kind, LAS);
  assert.deepEqual(
    withConditionValue(withKind("temperatureBelow"), 0, 35.2).rules[0]
      .condition,
    { kind: "temperatureBelow", value: 35.2 },
  );
  assert.deepEqual(
    withConditionValue(withKind("campfireLeftBelow"), 0, 5).rules[0].condition,
    { kind: "campfireLeftBelow", value: 5 },
  );
  assert.equal(withConditionValue(withKind("satietyBelow"), 0, 50), null);
  assert.equal(withConditionValue(withKind("awayFromCampfire"), 0, 5), null);
  assert.equal(withConditionValue(THREE, 0, 5), null, "„Zawsze”");
});

test("switching the condition to „Zawsze” drops its resource and number; the same kind commits nothing", () => {
  assert.deepEqual(withConditionKind(THREE, 1, "always", LAS).rules[1], {
    condition: { kind: "always" },
    action: { kind: "wander" },
  });
  assert.equal(withConditionKind(THREE, 1, "hereBelow", LAS), null);
  assert.equal(withConditionKind(THREE, 0, "always", LAS), null);
});

test("switching the action to „Idź” takes the map's first resource; other kinds carry none", () => {
  assert.deepEqual(withActionKind(THREE, 0, "walkTo", LAS).rules[0], {
    condition: { kind: "always" },
    action: { kind: "walkTo", resource: "stick" },
  });
  assert.deepEqual(withActionKind(THREE, 2, "wander", LAS).rules[2].action, {
    kind: "wander",
  });
  assert.deepEqual(withActionKind(THREE, 2, "explore", LAS).rules[2].action, {
    kind: "explore",
  });
  assert.equal(withActionKind(THREE, 2, "walkTo", LAS), null);
  assert.equal(withActionKind(THREE, 0, "explore", LAS), null);
});

test("switching the action to „Zbierz” takes the map's first resource, and its resource can be chosen", () => {
  const gathering = withActionKind(THREE, 0, "gather", LAS);
  assert.deepEqual(gathering.rules[0], {
    condition: { kind: "always" },
    action: { kind: "gather", resource: "stick" },
  });
  assert.deepEqual(
    withActionKind(THREE, 2, "gather", ["berry", "stick"]).rules[2].action,
    { kind: "gather", resource: "berry" },
  );
  assert.deepEqual(withActionResource(gathering, 0, "fiber").rules[0].action, {
    kind: "gather",
    resource: "fiber",
  });
  assert.equal(withActionResource(gathering, 0, "stick"), null);
  assert.equal(withActionKind(gathering, 0, "gather", LAS), null);
  assert.deepEqual(
    withActionKind(gathering, 0, "wander", LAS).rules[0].action,
    {
      kind: "wander",
    },
  );
  assert.equal(withActionKind(THREE, 0, "gather", []), null);
});

test("„Idź — ognisko” and the actions on the campfire and the backpack are offered without a target", () => {
  for (const kind of ["walkToCampfire", ...CAMPFIRE_AND_BACKPACK]) {
    const switched = withActionKind(THREE, 2, kind, LAS);
    assert.deepEqual(switched.rules[2], {
      condition: { kind: "always" },
      action: { kind },
    });
    assert.equal(withActionResource(switched, 2, "stick"), null, kind);
    assert.equal(withActionKind(switched, 2, kind, LAS), null, kind);
    assert.deepEqual(
      withActionKind(THREE, 0, kind, []).rules[0].action,
      { kind },
      `${kind} needs no resource of the map`,
    );
  }
});

test("choosing a resource or a number changes only that rule; the same choice commits nothing", () => {
  const before = copy(THREE);
  assert.deepEqual(withConditionResource(THREE, 1, "fiber"), {
    rules: [
      ALWAYS_EXPLORE,
      {
        ...BELOW_WANDER,
        condition: { kind: "hereBelow", resource: "fiber", value: 4 },
      },
      ALWAYS_WALK,
    ],
  });
  assert.deepEqual(withConditionValue(THREE, 1, 12).rules[1].condition, {
    kind: "hereBelow",
    resource: "berry",
    value: 12,
  });
  assert.deepEqual(withActionResource(THREE, 2, "stick").rules[2].action, {
    kind: "walkTo",
    resource: "stick",
  });
  assert.equal(withConditionResource(THREE, 1, "berry"), null);
  assert.equal(withConditionValue(THREE, 1, 4), null);
  assert.equal(withActionResource(THREE, 2, "moss"), null);
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
  assert.deepEqual(focusAfter("up", 2, 3), { row: 1, control: "up" });
  assert.deepEqual(focusAfter("down", 0, 3), { row: 1, control: "down" });
  assert.deepEqual(focusAfter("remove", 1, 2), { row: 1, control: "remove" });
  assert.deepEqual(focusAfter("remove", 2, 2), { control: "add" });
  assert.deepEqual(focusAfter("remove", 0, 0), { control: "add" });
  assert.deepEqual(focusAfter("add", 3, 4), { row: 3, control: "condition" });
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
  let program = { rules: [] };
  const built = [];
  const keep = (next) => {
    if (next) {
      program = next;
      built.push(next);
    }
  };
  for (const conditionKind of conditionKinds) {
    for (const actionKind of actionKinds) {
      keep(addRule(program));
      const last = program.rules.length - 1;
      keep(withConditionKind(program, last, conditionKind, resources));
      keep(withActionKind(program, last, actionKind, resources));
      for (const resource of resources) {
        if (conditionKind === "hereBelow")
          keep(withConditionResource(program, last, resource));
        if (actionKind === "walkTo" || actionKind === "gather")
          keep(withActionResource(program, last, resource));
      }
      if (conditionKind === "itemBelow") {
        for (const item of ITEMS_LISTED)
          keep(withConditionItem(program, last, item));
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
            program.rules[last].condition.value,
            def,
          );
          if (field.commit)
            keep(withConditionValue(program, last, field.value));
        }
      }
    }
  }
  keep(moveRule(program, 0, 1));
  keep(moveRule(program, program.rules.length - 1, -1));
  keep(removeRule(program, 2));
  keep(removeRule(program, 0));
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
