// „Ucisk — {rzecz}” in the pick of the rule panel: its group and its place in it, its icon, its price
// at the cell and at its target, the chosen action's field, its time, its greyed reasons, and its amber
// sign outside the minutes of an attack. The view computes these from the data; the expected words are
// written out here, not read from the code under test.
import assert from "node:assert/strict";
import { test } from "node:test";
import { ACTIONS } from "../../dist/browser/sim/data/actions.js";
import {
  createCharacter,
  ruleSigns,
  send,
  setProgram,
} from "../../dist/browser/sim/game.js";
import {
  actionFieldValue,
  actionPick,
  actionPriceText,
  actionTargetPick,
  actionTime,
} from "../../dist/browser/view/program-editor.js";
import { programFromRules } from "../sim/program-fixture.mjs";
import {
  newKnowingGame,
  withEdgeSolved,
} from "../sim/understanding-fixture.mjs";

const SENT = { mapId: "forest", characterId: 1 };
const T0 = 1_760_000_000_000;
const EXPLORE = { kind: "explore" };
const ALWAYS = { kind: "always" };
const PRESSURE = { kind: "pressure", item: "bandage" };
const NOT_BOUGHT = "gałąź niewykupiona";
const NO_RUN = "wybierzesz w przejściu postaci, która ją kupiła";

/** Every cell of a pick, flat, by its value. */
function cellsOf(sections) {
  return Object.fromEntries(
    sections.flatMap((section) =>
      section.cells.map((cell) => [cell.value, cell]),
    ),
  );
}

/** A map run of the new character, which holds the Understanding of everything the data lists. */
function runningGame() {
  return send(
    createCharacter(withEdgeSolved(newKnowingGame()), "Ala").state,
    SENT,
    T0,
  ).state;
}

/** The map run's character with the branch „Ucisk” of „Opatrywanie małych ran” bought: 3 points of 60 practice. */
function withPressureBought(state) {
  return {
    ...state,
    run: {
      ...state.run,
      character: {
        ...state.run.character,
        skills: { tending: { practice: 60, ranks: { pressure: 1 } } },
      },
    },
  };
}

test("„Ucisk” stands in „Żywność i walka” after „Odskocz” and before „Załóż”, with the icon of „Opatrz”", () => {
  // decision: D-290 "The pick of the rule panel sets the actions in five named groups: … Żywność i walka — „Zjedz — jagoda”, „Opatrz”, „Uderz — patyk”, „Kopnij”, „Odskocz”, „Ucisk”, „Załóż”"
  const sections = actionPick(newKnowingGame(), EXPLORE);
  const food = sections.find((section) => section.name === "Żywność i walka");
  assert.ok(food, "the group „Żywność i walka” is in the pick");
  const labels = food.cells.map((cell) => cell.label);
  const at = labels.indexOf("Odskocz");
  assert.equal(labels[at + 1], "Ucisk");
  assert.equal(labels[at + 2], "Załóż");
  // The view draws the icon from the action's data; the pick's cell carries none (see the report).
  assert.equal(ACTIONS.pressure.icon, ACTIONS.tend.icon);
});

test("„Ucisk” has no price at its cell, and its cell is picked once the branch is bought", () => {
  // decision: D-363 "An action whose price its target gives, „Wytwórz” and „Opatrz” with an item as the target, shows no price at its cell of the pick of actions … „Ucisk” with an item as the target is such an action too, its cell showing no price"
  const bought = withPressureBought(runningGame());
  assert.equal(actionPriceText(bought, "pressure"), null);
  const cell = cellsOf(actionPick(bought, EXPLORE)).pressure;
  assert.deepEqual(
    [cell.label, cell.greyed, cell.reason],
    ["Ucisk", false, null],
  );
  assert.equal(cellsOf(actionPick(bought, PRESSURE)).pressure.chosen, true);
});

test("at its target, „Ucisk” shows the bandage with its price: „Opatrunek (1 opatrunek)”", () => {
  // decision: D-363 "the pick of its target shows at each target the price of the action with that target, in brackets after the target's name"
  const targets = actionTargetPick(withPressureBought(runningGame()), PRESSURE);
  const bandage = targets.find((cell) => cell.value === "bandage");
  assert.ok(bandage, "the bandage is a target of „Ucisk”");
  assert.deepEqual(
    [bandage.label, bandage.chosen, bandage.greyed],
    ["Opatrunek (1 opatrunek)", true, false],
  );
});

test("the chosen „Ucisk” shows its target and its price: „Ucisk — Opatrunek (1 opatrunek)”", () => {
  // decision: D-363 "„Ucisk” with an item as the target is such an action too … and the action chosen in the panel showing it, such as „Ucisk — Opatrunek (1 opatrunek)”"
  assert.equal(
    actionFieldValue(withPressureBought(runningGame()), PRESSURE),
    "Ucisk — Opatrunek (1 opatrunek)",
  );
});

test("the time of „Ucisk” is „tura”, in a map run and outside one", () => {
  // decision: D-293 "„tura” for an action of combat"
  assert.equal(
    actionTime(withPressureBought(runningGame()), "pressure"),
    "tura",
  );
  assert.equal(actionTime(newKnowingGame(), "pressure"), "tura");
});

test("„Ucisk” stands greyed „gałąź niewykupiona” in a map run of a character without the branch, and „wybierzesz w przejściu postaci, która ją kupiła” with no map run", () => {
  // decision: D-289 "a branch action the character of the map run has not bought, „gałąź niewykupiona”; such an action while the game holds no map run, „wybierzesz w przejściu postaci, która ją kupiła”"
  const during = cellsOf(actionPick(runningGame(), EXPLORE)).pressure;
  assert.deepEqual([during.greyed, during.reason], [true, NOT_BOUGHT]);
  const outside = cellsOf(actionPick(newKnowingGame(), EXPLORE)).pressure;
  assert.deepEqual([outside.greyed, outside.reason], [true, NO_RUN]);
});

test("outside the minutes of an attack a rule of „Ucisk” is amber with „tylko w walce”", () => {
  // decision: D-309 "Outside those minutes a combat rule whose condition holds is amber with the reason „tylko w walce”."
  const created = createCharacter(
    withEdgeSolved(newKnowingGame()),
    "Ala",
  ).state;
  const set = setProgram(
    created,
    programFromRules({ condition: ALWAYS, action: PRESSURE }),
  ).state;
  const started = send(set, SENT, T0).state;
  const signs = ruleSigns(withPressureBought(started));
  assert.deepEqual(signs.judgement.rules[1], {
    bar: "blocked",
    reason: "tylko w walce",
  });
});
