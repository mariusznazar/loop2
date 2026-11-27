// The program editor's cases of the gear (D-458, D-459, D-443, D-363): the condition „Puste” and its
// places, and the action „Załóż” with its targets, tested without a browser. The pick, the sentences
// and the time and price of „Załóż” are the editor's pure functions; the orders of the pick stand in
// program-editor.test.mjs.
import assert from "node:assert/strict";
import { test } from "node:test";
import { ITEMS } from "../../dist/browser/sim/data/items.js";
import { newGame } from "../../dist/browser/sim/game.js";
import {
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
  withActionKind,
  withConditionKind,
  withConditionPlace,
} from "../../dist/browser/view/program-editor.js";
import { newKnowingGame } from "../sim/understanding-fixture.mjs";

const RESOURCES_NONE = [];

/** A program of the new game with one more rule of group 1, and that rule's index in the group. */
function withNewRule() {
  const program = addRule(newGame().programs[0].program, 1);
  return { program, index: program.groups[0].rules.length - 1 };
}

/** The cells of a pick, by their value, as the editor's pick sections hold them. */
function cellsOf(sections) {
  return Object.fromEntries(
    sections.flatMap((section) =>
      section.cells.map((cell) => [cell.value, cell]),
    ),
  );
}

test("the condition „Puste” is offered once the Understanding holds it, and not before", () => {
  // decision: D-459 "The condition „Puste — {miejsce}” holds when the place it names holds nothing"
  const always = { kind: "always" };
  assert.equal(cellsOf(conditionPick(newGame(), always)).emptyPlace, undefined);
  const cell = cellsOf(conditionPick(newKnowingGame(), always)).emptyPlace;
  assert.equal(cell.label, "Puste");
  assert.equal(cell.greyed, false);
  assert.equal(cell.reason, null);
});

test("a new condition „Puste” starts with the first place an item fits, the main hand", () => {
  const { program, index } = withNewRule();
  const next = withConditionKind(
    program,
    1,
    index,
    "emptyPlace",
    RESOURCES_NONE,
    ["stick"],
  );
  assert.deepEqual(next.groups[0].rules[index].condition, {
    kind: "emptyPlace",
    place: "mainHand",
  });
});

test("the targets of „Puste” are the places some item fits, the main hand and the pocket", () => {
  // decision: D-459 "A program names a place of the gear only by its kind, never by the number or the position of a pocket"
  const picks = conditionTargetPick(newKnowingGame(), {
    kind: "emptyPlace",
    place: "pocket",
  });
  assert.deepEqual(
    picks.map((cell) => cell.label),
    ["Ręka główna", "Kieszeń"],
  );
  assert.deepEqual(
    picks.map((cell) => cell.chosen),
    [false, true],
  );
  assert.ok(picks.every((cell) => !cell.greyed && cell.reason === null));
  // Head is no target while no item of the data fits it.
  assert.ok(!picks.some((cell) => cell.label === "Głowa"));
});

test("the sentence of „Puste” names its place: „Puste — Ręka główna”, „Puste — Kieszeń”", () => {
  assert.equal(
    conditionSentence({ kind: "emptyPlace", place: "mainHand" }),
    "Puste — Ręka główna",
  );
  assert.equal(
    conditionSentence({ kind: "emptyPlace", place: "pocket" }),
    "Puste — Kieszeń",
  );
});

test("„Puste” has a target field, and the field order follows it", () => {
  assert.deepEqual(conditionFields({ kind: "emptyPlace", place: "pocket" }), [
    "condition",
    "conditionTarget",
  ]);
});

test("choosing another place changes only the place; the same place commits nothing", () => {
  const { program, index } = withNewRule();
  const set = withConditionKind(
    program,
    1,
    index,
    "emptyPlace",
    RESOURCES_NONE,
    ["stick"],
  );
  assert.deepEqual(
    withConditionPlace(set, 1, index, "pocket").groups[0].rules[index]
      .condition,
    { kind: "emptyPlace", place: "pocket" },
  );
  assert.equal(withConditionPlace(set, 1, index, "mainHand"), null);
  // A condition of another kind takes no place.
  assert.equal(withConditionPlace(program, 1, index, "pocket"), null);
});

test("the action „Załóż” takes the items whose row names a place, and no others", () => {
  // decision: D-443 "An action is a verb with a target, and the targets a verb takes follow from the properties of the items in the game's data"
  const picks = actionTargetPick(newKnowingGame(), {
    kind: "equip",
    item: "bandage",
  });
  assert.deepEqual(
    picks.map((cell) => cell.label),
    ["Patyk", "Opatrunek"],
  );
  assert.deepEqual(
    picks.map((cell) => cell.chosen),
    [false, true],
  );
  assert.equal(ITEMS.stick.fits, "mainHand");
  assert.equal(ITEMS.bandage.fits, "pocket");
});

test("„Załóż” sits at the end of „Żywność i walka”, after „Odskocz”", () => {
  const group = actionPick(newKnowingGame(), { kind: "explore" }).find(
    (section) => section.name === "Żywność i walka",
  );
  assert.deepEqual(
    group.cells.map((cell) => cell.label),
    [
      "Zjedz — jagoda (1 jagoda)",
      "Opatrz",
      "Uderz — patyk",
      "Kopnij",
      "Odskocz",
      "Ucisk",
      "Załóż",
    ],
  );
});

test("„Załóż” takes 1 min and no price; its sentence names the item it puts on", () => {
  const state = newKnowingGame();
  assert.equal(actionTime(state, "equip"), "1 min");
  assert.equal(actionPriceText(state, "equip", "stick"), null);
  assert.equal(
    actionSentence({ kind: "equip", item: "stick" }),
    "Załóż — Patyk",
  );
});

test("choosing „Załóż” takes its first target the Understanding holds, and the target changes the rule", () => {
  const { program, index } = withNewRule();
  assert.deepEqual(
    withActionKind(program, 1, index, "equip", RESOURCES_NONE, ["bandage"])
      .groups[0].rules[index].action,
    { kind: "equip", item: "bandage" },
  );
  assert.equal(
    withActionKind(program, 1, index, "equip", RESOURCES_NONE, []),
    null,
  );
});
