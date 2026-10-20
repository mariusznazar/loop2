// Program commit rules and native-control behavior, using a recording DOM without layout.
// Importing the module must not touch the DOM.
import assert from "node:assert/strict";
import { test } from "node:test";
import { ACTIONS } from "../../dist/public/sim/data/actions.js";
import { ARCHETYPES } from "../../dist/public/sim/data/archetypes.js";
import { CONDITIONS } from "../../dist/public/sim/data/conditions.js";
import { MAPS } from "../../dist/public/sim/data/maps.js";
import { RESOURCES } from "../../dist/public/sim/data/resources.js";
import {
  advanceMinutes,
  newGame,
  send,
  setProgram,
} from "../../dist/public/sim/game.js";
import {
  addRule,
  createProgramEditor,
  focusAfter,
  moveRule,
  offeredResources,
  readNumberField,
  removeRule,
  withActionKind,
  withActionResource,
  withConditionKind,
  withConditionResource,
  withConditionValue,
} from "../../dist/public/view/program-editor.js";
import { installDOM } from "./dom-support.mjs";

const SENT = {
  mapId: Object.keys(MAPS)[0],
  archetypeId: Object.keys(ARCHETYPES)[0],
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
      readNumberField(text, 7),
      { value: 7, commit: false },
      JSON.stringify(text),
    );
  }
});

test("the number field: a number is rounded to a whole number and committed when it differs", () => {
  assert.deepEqual(readNumberField("12", 1), { value: 12, commit: true });
  assert.deepEqual(readNumberField(" 12 ", 1), { value: 12, commit: true });
  assert.deepEqual(readNumberField("12.4", 1), { value: 12, commit: true });
  assert.deepEqual(readNumberField("12.5", 1), { value: 13, commit: true });
  assert.deepEqual(readNumberField("0", 1), { value: 0, commit: true });
});

test("the number field: a number is clamped to the data's range 0–50", () => {
  assert.equal(CONDITIONS.hereBelow.min, 0);
  assert.equal(CONDITIONS.hereBelow.max, 50);
  assert.deepEqual(readNumberField("51", 1), { value: 50, commit: true });
  assert.deepEqual(readNumberField("999", 1), { value: 50, commit: true });
  assert.deepEqual(readNumberField("-3", 1), { value: 0, commit: true });
  assert.deepEqual(readNumberField("-0.4", 1), { value: 0, commit: true });
  assert.ok(
    Object.is(readNumberField("-0.4", 1).value, 0),
    "a rounded -0 is written back as 0",
  );
});

test("the number field: the same value after rounding or clamping is written back but not committed", () => {
  assert.deepEqual(readNumberField("12", 12), { value: 12, commit: false });
  assert.deepEqual(readNumberField("11.6", 12), { value: 12, commit: false });
  assert.deepEqual(readNumberField("80", 50), { value: 50, commit: false });
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
  const running = send(game, SENT, 1760000000000).state;
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
  assert.deepEqual(conditionKinds, ["always", "hereBelow"]);
  assert.deepEqual(actionKinds, ["explore", "wander", "walkTo"]);

  // Every pair of kinds, every resource in every slot, and the number at its ends and outside them.
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
        if (actionKind === "walkTo")
          keep(withActionResource(program, last, resource));
      }
      if (conditionKind === "hereBelow") {
        for (const text of ["0", "50", "-5", "77", "3.7", "x"]) {
          const field = readNumberField(
            text,
            program.rules[last].condition.value,
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
  const during = send(newGame(), SENT, 1760000000000).state;
  for (const candidate of built) {
    for (const state of [before, during]) {
      const result = setProgram(state, candidate);
      assert.deepEqual(result.state.program, candidate);
    }
  }
});

function descendants(element, predicate) {
  return element.children.flatMap((child) => [
    ...(predicate(child) ? [child] : []),
    ...descendants(child, predicate),
  ]);
}

function editorFixture(t, program = THREE) {
  const document = installDOM(t);
  const calls = [];
  let state = setProgram(newGame(), copy(program)).state;
  const editor = createProgramEditor((next) => {
    calls.push(next);
    state = setProgram(state, next).state;
    editor.update(state);
  });
  editor.update(state);
  const rows = () => editor.element.children[1].children;
  const field = (row, label) =>
    descendants(
      rows()[row],
      (node) => node.getAttribute("aria-label") === label,
    )[0];
  const button = (row, text) =>
    descendants(
      rows()[row],
      (node) => node.tagName === "BUTTON" && node.textContent === text,
    )[0];
  return { document, calls, editor, rows, field, button, state: () => state };
}

test("editor uses shared native controls while retaining closed choices and conditional field visibility", (t) => {
  const fixture = editorFixture(t);
  const controls = descendants(fixture.editor.element, (node) =>
    ["BUTTON", "INPUT", "SELECT"].includes(node.tagName),
  );
  assert.ok(controls.length > 0);
  for (const control of controls)
    assert.ok(control.className.split(" ").includes("control"));
  const condition = fixture.field(1, "Warunek");
  assert.equal(condition.tagName, "SELECT");
  assert.deepEqual(
    condition.options.map((option) => option.value),
    ["always", "hereBelow"],
  );
  assert.equal(condition.value, "hereBelow");
  const action = fixture.field(2, "Akcja");
  assert.deepEqual(
    action.options.map((option) => option.value),
    ["explore", "wander", "walkTo"],
  );
  assert.equal(action.value, "walkTo");
  for (const [row, label, hidden] of [
    [0, "Liczba", true],
    [0, "Zasób warunku", true],
    [1, "Liczba", false],
    [1, "Zasób warunku", false],
    [0, "Zasób akcji", true],
    [2, "Zasób akcji", false],
  ]) {
    const control = fixture.field(row, label);
    assert.equal(control.parentNode.tagName, "SPAN");
    assert.equal(control.parentNode.hidden, hidden, label);
  }
  const number = fixture.field(1, "Liczba");
  assert.equal(number.type, "number");
  assert.equal(number.min, "0");
  assert.equal(number.max, "50");
  assert.equal(number.step, "1");
  for (const row of [0, 1, 2]) {
    const remove = fixture.button(row, "Usuń");
    assert.equal(remove.type, "button");
    assert.ok(remove.className.split(" ").includes("destructive-button"));
  }
});

test("resource fields preserve data order, labels and selected values across nonstructural edits", (t) => {
  const fixture = editorFixture(t);
  const condition = fixture.field(1, "Zasób warunku");
  const action = fixture.field(2, "Zasób akcji");
  const expected = MAPS[SENT.mapId].resources.map(({ id }) => [
    id,
    RESOURCES[id].name,
  ]);
  for (const control of [condition, action])
    assert.deepEqual(
      control.options.map((option) => [option.value, option.textContent]),
      expected,
    );
  assert.equal(condition.value, "berry");
  assert.equal(action.value, "moss");
  condition.focus();
  condition.value = "fiber";
  condition.dispatchEvent({ type: "change" });
  assert.equal(fixture.calls.length, 1);
  assert.deepEqual(fixture.calls[0].rules[1].condition, {
    kind: "hereBelow",
    resource: "fiber",
    value: 4,
  });
  assert.equal(fixture.field(1, "Zasób warunku"), condition);
  assert.equal(fixture.document.activeElement, condition);
  action.value = "stick";
  action.dispatchEvent({ type: "change" });
  assert.equal(fixture.calls.length, 2);
  assert.deepEqual(fixture.calls[1].rules[2].action, {
    kind: "walkTo",
    resource: "stick",
  });
  action.dispatchEvent({ type: "change" });
  condition.dispatchEvent({ type: "change" });
  assert.equal(fixture.calls.length, 2);
});

test("resource fields retain a selected resource missing from the offered map choices", (t) => {
  const fixture = editorFixture(t);
  const map = MAPS[SENT.mapId];
  const previousResources = map.resources;
  t.after(() => {
    map.resources = previousResources;
  });
  map.resources = previousResources.filter(
    ({ id }) => id !== "berry" && id !== "moss",
  );
  fixture.editor.update(fixture.state());
  const condition = fixture.field(1, "Zasób warunku");
  const action = fixture.field(2, "Zasób akcji");
  assert.deepEqual(
    condition.options.map((option) => option.value),
    ["stick", "fiber", "berry"],
  );
  assert.deepEqual(
    action.options.map((option) => option.value),
    ["stick", "fiber", "moss"],
  );
  assert.equal(condition.value, "berry");
  assert.equal(action.value, "moss");
  condition.focus();
  fixture.editor.update(fixture.state());
  assert.equal(fixture.field(1, "Zasób warunku"), condition);
  assert.equal(fixture.document.activeElement, condition);
  assert.equal(fixture.calls.length, 0);
});

test("native number changes normalize the displayed value and commit exactly once only when it changes", (t) => {
  const fixture = editorFixture(t);
  const number = fixture.field(1, "Liczba");
  for (const [text, displayed, count] of [
    ["", "4", 0],
    ["Infinity", "4", 0],
    ["NaN", "4", 0],
    ["4.4", "4", 0],
    ["12.5", "13", 1],
    ["13", "13", 1],
    ["99", "50", 2],
    ["80", "50", 2],
    ["-3", "0", 3],
    ["-0.4", "0", 3],
  ]) {
    number.focus();
    number.value = text;
    number.dispatchEvent({ type: "change" });
    assert.equal(number.value, displayed, text);
    assert.equal(fixture.calls.length, count, text);
    assert.equal(fixture.field(1, "Liczba"), number);
    assert.equal(fixture.document.activeElement, number);
  }
  assert.deepEqual(
    fixture.calls.map((program) => program.rules[1].condition.value),
    [13, 50, 0],
  );
});

test("weakest requirement: every editable native node survives ticks and nonstructural kind changes", (t) => {
  const fixture = editorFixture(t);
  for (const [row, label] of [
    [1, "Warunek"],
    [1, "Liczba"],
    [1, "Zasób warunku"],
    [2, "Akcja"],
    [2, "Zasób akcji"],
  ]) {
    const control = fixture.field(row, label);
    control.focus();
    const running = send(fixture.state(), SENT, 1760000000000).state;
    fixture.editor.update(running);
    fixture.editor.update(advanceMinutes(running, 1).state);
    assert.equal(fixture.field(row, label), control);
    assert.equal(fixture.document.activeElement, control);
  }
  const condition = fixture.field(1, "Warunek");
  const number = fixture.field(1, "Liczba");
  condition.focus();
  condition.value = "always";
  condition.dispatchEvent({ type: "change" });
  assert.equal(fixture.calls.length, 1);
  assert.deepEqual(fixture.calls[0].rules[1].condition, { kind: "always" });
  assert.equal(fixture.field(1, "Warunek"), condition);
  assert.equal(fixture.document.activeElement, condition);
  assert.equal(fixture.field(1, "Liczba"), number);
  assert.equal(number.parentNode.hidden, true);
  condition.value = "hereBelow";
  condition.dispatchEvent({ type: "change" });
  assert.equal(fixture.calls.length, 2);
  assert.equal(number.parentNode.hidden, false);
  assert.deepEqual(fixture.calls[1].rules[1].condition, {
    kind: "hereBelow",
    resource: "stick",
    value: 1,
  });
  const action = fixture.field(2, "Akcja");
  action.focus();
  action.value = "wander";
  action.dispatchEvent({ type: "change" });
  assert.equal(fixture.calls.length, 3);
  assert.deepEqual(fixture.calls[2].rules[2].action, { kind: "wander" });
  assert.equal(fixture.field(2, "Akcja"), action);
  assert.equal(fixture.document.activeElement, action);
  assert.equal(fixture.field(2, "Zasób akcji").parentNode.hidden, true);
  action.value = "walkTo";
  action.dispatchEvent({ type: "change" });
  assert.equal(fixture.calls.length, 4);
  assert.deepEqual(fixture.calls[3].rules[2].action, {
    kind: "walkTo",
    resource: "stick",
  });
  assert.equal(fixture.field(2, "Akcja"), action);
  assert.equal(fixture.document.activeElement, action);
  assert.equal(fixture.field(2, "Zasób akcji").parentNode.hidden, false);
});

test("structural actions restore focus to their documented native target and commit once", (t) => {
  const fixture = editorFixture(t);
  fixture.button(0, "↑").click();
  fixture.button(2, "↓").click();
  const remove = fixture.button(0, "Usuń");
  remove.disabled = true;
  remove.click();
  remove.disabled = false;
  assert.equal(fixture.calls.length, 0);
  const oldCondition = fixture.field(0, "Warunek");
  oldCondition.focus();
  fixture.button(0, "↓").click();
  assert.equal(fixture.calls.length, 1);
  assert.equal(fixture.document.activeElement, fixture.button(1, "↓"));
  assert.notEqual(fixture.field(0, "Warunek"), oldCondition);
  fixture.button(1, "↑").click();
  assert.equal(fixture.calls.length, 2);
  assert.equal(fixture.document.activeElement, fixture.button(0, "↑"));
  assert.deepEqual(fixture.state().program, THREE);
  fixture.button(1, "Usuń").click();
  assert.equal(fixture.calls.length, 3);
  assert.equal(fixture.document.activeElement, fixture.button(1, "Usuń"));
  fixture.button(1, "Usuń").click();
  assert.equal(fixture.calls.length, 4);
  const add = fixture.editor.element.children[2];
  assert.equal(fixture.document.activeElement, add);
  fixture.button(0, "Usuń").click();
  assert.equal(fixture.calls.length, 5);
  assert.equal(fixture.document.activeElement, add);
  assert.equal(fixture.rows().length, 0);
  add.click();
  assert.equal(fixture.calls.length, 6);
  assert.deepEqual(fixture.state().program, { rules: [ALWAYS_EXPLORE] });
  assert.equal(fixture.document.activeElement, fixture.field(0, "Warunek"));
});

test("recording DOM tracks parents and clears focus on actual subtree removal", (t) => {
  const document = installDOM(t);
  const root = document.createElement("div");
  const container = document.createElement("span");
  const input = document.createElement("input");
  root.append(container);
  container.append(input);
  input.focus();
  assert.equal(document.activeElement, input);
  root.append(document.createElement("p"));
  assert.equal(document.activeElement, input);
  root.replaceChildren(document.createElement("p"));
  assert.equal(document.activeElement, null);
  assert.equal(container.parentNode, null);
  assert.equal(input.parentNode, container);
});

test("recording DOM restores preexisting document and Option globals after installation", (t) => {
  const previousDocument = globalThis.document;
  const previousOption = globalThis.Option;
  t.after(() => {
    if (previousDocument === undefined) delete globalThis.document;
    else globalThis.document = previousDocument;
    if (previousOption === undefined) delete globalThis.Option;
    else globalThis.Option = previousOption;
  });
  const sentinelDocument = {};
  const sentinelOption = function () {};
  globalThis.document = sentinelDocument;
  globalThis.Option = sentinelOption;
  let restore;
  const document = installDOM({
    after: (callback) => {
      restore = callback;
    },
  });
  assert.equal(globalThis.document, document);
  const option = new globalThis.Option("Label", "value");
  const select = document.createElement("select");
  select.add(option);
  assert.equal(select.options[0], option);
  assert.equal(select.value, "value");
  assert.equal(option.textContent, "Label");
  assert.equal(option.parentNode, select);
  restore();
  assert.equal(globalThis.document, sentinelDocument);
  assert.equal(globalThis.Option, sentinelOption);
});
