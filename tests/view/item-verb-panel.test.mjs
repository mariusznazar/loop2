// The rule panel and the rule list with „Wytwórz” and „Opatrz” (D-443, D-293, D-306, D-363) on jsdom
// through tests/view/page-document.mjs (D-264): the closed action field with its target, its price and
// its time, the times at the cells of the pick of a target, a pick of a target changing the rule, and
// the row of the rule. The editor's functions have their cases in program-editor.test.mjs; here the
// panel and the list draw them. The real focus ring and the look are the browser check's (D-88).
import { assert, inAct, press, withPage } from "./page-document.mjs";
import { test } from "node:test";
import { createElement } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { ACTIONS } from "../../dist/browser/sim/data/actions.js";
import { ITEMS } from "../../dist/browser/sim/data/items.js";
import { createCharacter, send } from "../../dist/browser/sim/game.js";
import {
  newKnowingGame,
  withEdgeSolved,
} from "../sim/understanding-fixture.mjs";
import { RuleListView } from "../../dist/browser/view/rule-list.js";
import { RulePanelView } from "../../dist/browser/view/rule-panel.js";

const ALWAYS = { kind: "always" };
const CRAFT_BANDAGE = { kind: "craft", item: "bandage" };
const TEND_BANDAGE = { kind: "tend", item: "bandage" };

// The recipe's pieces and minutes and the minutes of „Opatrz” stand only in the game's data (D-82), so
// the texts below are built from it, the price by shape: each piece's count and a form of its name.
const RECIPE = ITEMS.bandage.recipe;
const MAKING_PRICE = RECIPE.uses
  .map(({ item, count }) => {
    const { name, plural } = ITEMS[item];
    return `${count} (?:${name}|${plural.few}|${plural.many})`;
  })
  .join(", ");
/** The closed action field of „Wytwórz — Opatrunek” with its price. */
const CRAFT_FIELD = new RegExp(`^Wytwórz — Opatrunek \\(${MAKING_PRICE}\\)$`);
/** The cell of the bandage in the pick of the target of „Wytwórz”, with its price. */
const CRAFT_CELL = new RegExp(`^Opatrunek \\(${MAKING_PRICE}\\)$`);
const MAKING_TIME = `${RECIPE.minutes} min`;
const TEND_TIME = `${ACTIONS.tend.minutes} min`;

/** One group of three rules holding `actions`, the first rule with the id 1. */
function programOf(...actions) {
  return {
    groups: [
      {
        id: 1,
        name: "Pierwsza",
        condition: ALWAYS,
        rules: actions.map((action, at) => ({
          id: at + 1,
          condition: ALWAYS,
          action,
        })),
      },
    ],
    tripPlan: { take: [], bring: [] },
    nextGroupId: 2,
    nextRuleId: actions.length + 1,
  };
}

/** A game in a map run whose Understanding holds everything. */
function runningGame() {
  return send(
    createCharacter(withEdgeSolved(newKnowingGame()), "Ala").state,
    { mapId: "forest", characterId: 1 },
    1760000000000,
  ).state;
}

/**
 * Runs `check` with a second item laid over the built `ITEMS`, whose row holds a recipe of 15 minutes
 * and a healing property, and takes it away after, whatever `check` does: no data of the game holds it.
 */
async function withSplint(check) {
  ITEMS.splint = {
    name: "szyna",
    plural: { few: "szyny", many: "szyn" },
    icon: "first-aid-kit",
    iconTitle: "First aid kit icon",
    revealedBy: { kind: "gathered", item: "stick" },
    recipe: { uses: [{ item: "stick", count: 3 }], minutes: 15 },
    healing: { health: 10 },
  };
  try {
    await check();
  } finally {
    delete ITEMS.splint;
  }
}

/** Draws `component` in a root of its own on `page`; `update(props)` draws it again at once. */
function drawnIn(page, component, handlers, props) {
  const element = page.ownerDocument.createElement("div");
  const root = createRoot(element);
  const update = (next) =>
    flushSync(() =>
      root.render(createElement(component, { ...next, ...handlers })),
    );
  update(props);
  return { element, update };
}

/** The panel placed on the page closed and then opened on `open`, with what it hands the page in `calls`. */
async function mountPanel({ root }, program, open, state = newKnowingGame()) {
  const calls = [];
  const props = { state, program, open, copy: false };
  let panel = null;
  await inAct(() => {
    panel = drawnIn(
      root,
      RulePanelView,
      {
        onCommit: (next) => calls.push(next),
        onClose: () => {},
      },
      { ...props, open: null },
    );
    root.append(panel.element);
  });
  await inAct(() => panel.update(props));
  return { calls };
}

/** The rule list and the panel side by side, wired as the page wires them. */
async function mountEditor({ root }, program, state = newKnowingGame()) {
  const page = { program, open: null, commits: [] };
  let list = null;
  let panel = null;
  const redraw = () => {
    list.update({
      state,
      program: page.program,
      counts: null,
      folded: [],
      open: page.open,
    });
    panel.update({
      state,
      program: page.program,
      open: page.open,
      copy: false,
    });
  };
  const onCommit = (next) => {
    page.commits.push(next);
    page.program = next;
    redraw();
  };
  const onOpen = (target) => {
    page.open = target;
    redraw();
  };
  await inAct(() => {
    list = drawnIn(
      root,
      RuleListView,
      { onCommit, onOpen, onFoldedChange: () => {} },
      { state, program, counts: null, folded: [], open: null },
    );
    panel = drawnIn(
      root,
      RulePanelView,
      { onCommit, onClose: () => {} },
      { state, program, open: null, copy: false },
    );
    root.append(list.element, panel.element);
  });
  return page;
}

const panelOf = (root) => root.querySelector(".rule-panel");
const rowOf = (root, id) => root.querySelector(`[data-rule="${id}"]`);
const cellsIn = (element) => [...element.querySelectorAll(".pick-cell")];
/** The name a cell shows, without the reason drawn inside it. */
const nameOf = (cell) =>
  cell.querySelector(".pick-cell-name")?.textContent ?? "";
/** The cell whose name is `name`: a text or, for a name with numbers of the data in it, a shape. */
const cellNamed = (element, name) =>
  cellsIn(element).find((cell) =>
    name instanceof RegExp ? name.test(nameOf(cell)) : nameOf(cell) === name,
  );
const timeAt = (cell) =>
  cell.parentElement.querySelector(".rule-panel-time")?.textContent ?? null;
const textIn = (element, selector) =>
  element.querySelector(selector)?.textContent ?? null;

/** The row of the field labelled `label` in the panel. */
const fieldOf = (panel, label) =>
  [...panel.querySelectorAll(".rule-panel-field")].find(
    (each) => textIn(each, ".rule-panel-label") === label,
  );

// Catches the field reading only the cell of the verb („Wytwórz”, with no target and no price), the
// price taken from the bare verb (none) and not from its target, or no time beside a verb whose time
// its target gives.
test("the closed action field of „Wytwórz” and „Opatrz” shows the verb, its target and its price, with the time of one carrying out beside it", async () => {
  // decision: D-363 "The rule panel shows beside an action what it costs, read from the game's data, in brackets after the action's name"
  // decision: D-363 "An action whose price its target gives, „Wytwórz” and „Opatrz” with an item as the target, shows no price at its cell of the pick of actions"
  // decision: D-293 "Beside a program rule's action, in its row and in the rule panel, stands the time one carrying out of the action takes"
  for (const state of [newKnowingGame(), runningGame()]) {
    for (const [action, value, time] of [
      [CRAFT_BANDAGE, CRAFT_FIELD, MAKING_TIME],
      [TEND_BANDAGE, /^Opatrz — Opatrunek \(1 opatrunek\)$/, TEND_TIME],
    ]) {
      await withPage(async (page) => {
        await mountPanel(
          page,
          programOf(action),
          { groupId: 1, ruleId: 1, field: "condition" },
          state,
        );
        const field = fieldOf(panelOf(page.root), "Czynność");
        assert.match(textIn(field, ".rule-panel-value button"), value);
        assert.equal(textIn(field, ".rule-panel-time"), time);
      });
    }
  }
});

// Catches the cell of „Wytwórz” in the pick of actions with a price or a time of its own, or the cell
// of „Opatrz” without its time.
test("in the pick of actions the cell „Wytwórz” shows no price and no time, and the cell „Opatrz” shows its time and no price", async () => {
  // decision: D-293 "The cell „Wytwórz” of the pick of actions shows no time, since the recipe of its target gives the time, and the cell „Opatrz” shows its own"
  // decision: D-363 "An action whose price its target gives, „Wytwórz” and „Opatrz” with an item as the target, shows no price at its cell of the pick of actions"
  await withPage(async (page) => {
    await mountPanel(page, programOf({ kind: "explore" }), {
      groupId: 1,
      ruleId: 1,
      field: "action",
    });
    const panel = panelOf(page.root);
    const craft = cellNamed(panel, "Wytwórz");
    const tend = cellNamed(panel, "Opatrz");
    assert.ok(craft, "the cell of „Wytwórz” has no price in its name");
    assert.ok(tend, "the cell of „Opatrz” has no price in its name");
    assert.equal(timeAt(craft), null);
    assert.equal(timeAt(tend), TEND_TIME);
  });
});

// Catches the time of the cell taken from the bare verb (none) or from the held target for every
// cell, a time beside the cells of „Opatrz”, whose minutes are its own, or beside those of a resource.
test("the cells of the pick of a target of „Wytwórz” show the time of each target beside it, and those of „Opatrz” and of a resource show none", async () => {
  // decision: D-293 "The cell „Wytwórz” of the pick of actions shows no time, since the recipe of its target gives the time, and the cell „Opatrz” shows its own"
  // decision: D-443 "An action is a verb with a target, and the targets a verb takes follow from the properties of the items in the game's data."
  await withSplint(async () => {
    await withPage(async (page) => {
      await mountPanel(page, programOf(CRAFT_BANDAGE), {
        groupId: 1,
        ruleId: 1,
        field: "actionTarget",
      });
      const panel = panelOf(page.root);
      const bandage = cellNamed(panel, CRAFT_CELL);
      const splint = cellNamed(panel, "Szyna (3 patyki)");
      assert.ok(bandage, "the cell of the bandage");
      assert.equal(timeAt(bandage), MAKING_TIME);
      assert.equal(timeAt(splint), "15 min");
    });
    await withPage(async (page) => {
      await mountPanel(page, programOf(TEND_BANDAGE), {
        groupId: 1,
        ruleId: 1,
        field: "actionTarget",
      });
      const panel = panelOf(page.root);
      assert.equal(timeAt(cellNamed(panel, "Opatrunek (1 opatrunek)")), null);
      assert.equal(timeAt(cellNamed(panel, "Szyna (1 szyna)")), null);
    });
  });
  await withPage(async (page) => {
    await mountPanel(page, programOf({ kind: "gather", resource: "stick" }), {
      groupId: 1,
      ruleId: 1,
      field: "actionTarget",
    });
    for (const cell of cellsIn(panelOf(page.root)))
      assert.equal(timeAt(cell), null, nameOf(cell));
  });
});

// Catches a pick of a target of an item verb handed to the function of a resource, which changes
// nothing for an item, the verb lost with the target, or a pick of the target held committing.
test("a pick in the field of the target of „Wytwórz” or „Opatrz” changes the rule's target and keeps its verb, and a pick of the held target changes nothing", async () => {
  // decision: D-306 "A click on a program rule's row opens the rule panel on the condition, and its fields follow as condition, number, target of the condition, action and target of the action, the number field and a field of a target standing only where the condition or the action has one; each pick changes the rule at once and moves to the next field, a pick of the value already picked included, and Enter or leaving the field confirms the number"
  // decision: D-443 "An action is a verb with a target, and the targets a verb takes follow from the properties of the items in the game's data."
  await withSplint(async () => {
    for (const [kind, held, other, otherCell] of [
      ["craft", CRAFT_CELL, "splint", "Szyna (3 patyki)"],
      ["tend", "Opatrunek (1 opatrunek)", "splint", "Szyna (1 szyna)"],
    ]) {
      await withPage(async (page) => {
        const { calls } = await mountPanel(
          page,
          programOf({ kind, item: "bandage" }),
          { groupId: 1, ruleId: 1, field: "actionTarget" },
        );
        await press(cellNamed(panelOf(page.root), held));
        assert.deepEqual(calls, [], `${kind}: the target held`);
        await press(cellNamed(panelOf(page.root), otherCell));
        assert.equal(calls.length, 1, kind);
        assert.deepEqual(
          calls[0].groups[0].rules[0].action,
          { kind, item: other },
          kind,
        );
      });
    }
  });
});

// Catches a pick of the verb that does not move on to the field of its target, a target left out of
// the grid it opens, or a panel and a row that do not follow the program the pick made.
test("a pick of „Wytwórz” moves on to the field of its target, the bandage chosen with its price and time, and the row of the rule reads the verb and its target", async () => {
  // decision: D-306 "A click on a program rule's row opens the rule panel on the condition, and its fields follow as condition, number, target of the condition, action and target of the action, the number field and a field of a target standing only where the condition or the action has one; each pick changes the rule at once and moves to the next field, a pick of the value already picked included, and Enter or leaving the field confirms the number"
  // decision: D-306 "After the last field the panel stays open, and „✕”, Escape or opening another rule closes it"
  await withPage(async (page) => {
    const editor = await mountEditor(page, programOf({ kind: "explore" }));
    await press(rowOf(page.root, 1).querySelector(".rule-condition"));
    await press(cellNamed(panelOf(page.root), "Zawsze"));
    await press(cellNamed(panelOf(page.root), "Wytwórz"));
    assert.deepEqual(
      editor.commits[0].groups[0].rules[0].action,
      CRAFT_BANDAGE,
    );
    const panel = panelOf(page.root);
    const chosen = cellNamed(panel, CRAFT_CELL);
    assert.ok(chosen, "the cell of the bandage");
    assert.equal(chosen.getAttribute("aria-pressed"), "true");
    assert.equal(page.document.activeElement, chosen, "the pick moved on");
    assert.equal(timeAt(chosen), MAKING_TIME);
    await press(chosen);
    assert.equal(editor.commits.length, 1, "the target held commits nothing");
    assert.ok(panelOf(page.root), "the panel stays open after the last field");
    assert.match(
      textIn(
        fieldOf(panelOf(page.root), "Czynność"),
        ".rule-panel-value button",
      ),
      CRAFT_FIELD,
    );
    assert.equal(
      textIn(rowOf(page.root, 1), ".rule-action"),
      "Wytwórz — Opatrunek",
    );
  });
});

// Catches a price in the row of the rule, no time in the row of a verb whose time its target gives, or
// the words of the verb alone in the row.
test("the row of a rule with „Wytwórz” or „Opatrz” reads the verb and its target and the time, and no price", async () => {
  // decision: D-363 "The rule panel shows beside an action what it costs, read from the game's data, in brackets after the action's name"
  // decision: D-293 "Beside a program rule's action, in its row and in the rule panel, stands the time one carrying out of the action takes"
  await withSplint(async () => {
    await withPage(async (page) => {
      await mountEditor(
        page,
        programOf(CRAFT_BANDAGE, TEND_BANDAGE, {
          kind: "craft",
          item: "splint",
        }),
      );
      for (const [id, words, time] of [
        [1, "Wytwórz — Opatrunek", MAKING_TIME],
        [2, "Opatrz — Opatrunek", TEND_TIME],
        [3, "Wytwórz — Szyna", "15 min"],
      ]) {
        const row = rowOf(page.root, id);
        assert.equal(textIn(row, ".rule-action"), words, `rule ${id}`);
        assert.equal(textIn(row, ".rule-time"), time, `rule ${id}`);
        assert.doesNotMatch(
          row.textContent,
          /\(|mch|patyk|opatrunek\b/,
          `rule ${id}`,
        );
      }
    });
  });
});
