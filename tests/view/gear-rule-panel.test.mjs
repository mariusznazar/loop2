// The rule panel of the program editor for the gear (D-290, D-459, D-458): the condition „Puste”
// picks its place, the action „Załóż” picks its item with no price, on jsdom through
// tests/view/page-document.mjs (D-264). The look of the cells and the focus ring are the browser
// check's (D-88); here the cells, their names, their marks and the keys that move among them are read.
import { assert, inAct, press, withPage } from "./page-document.mjs";
import { test } from "node:test";
import { createElement } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { newKnowingGame } from "../sim/understanding-fixture.mjs";
import { RulePanelView } from "../../dist/browser/view/rule-panel.js";

const rule = (id, condition, action) => ({ id, condition, action });
const ALWAYS = { kind: "always" };
const EXPLORE = { kind: "explore" };

/** Two groups: „Pierwsza” with two rules and „Druga” with one. */
function twoGroups() {
  return {
    groups: [
      {
        id: 1,
        name: "Pierwsza",
        condition: ALWAYS,
        rules: [rule(1, ALWAYS, EXPLORE), rule(2, ALWAYS, EXPLORE)],
      },
      {
        id: 2,
        name: "Druga",
        condition: ALWAYS,
        rules: [rule(3, ALWAYS, EXPLORE)],
      },
    ],
    tripPlan: { take: [], bring: [] },
    nextGroupId: 3,
    nextRuleId: 4,
  };
}

/** One rule, as the group „Pierwsza” of `twoGroups` holds it in the place of rule 1. */
function withFirstRule(condition, action) {
  const program = twoGroups();
  program.groups[0].rules[0] = rule(1, condition, action);
  return program;
}

/** Draws the rule panel in a root of its own on the page, as the page draws it. */
function drawnIn(page, handlers, props) {
  const element = page.ownerDocument.createElement("div");
  const root = createRoot(element);
  const update = (next) =>
    flushSync(() =>
      root.render(createElement(RulePanelView, { ...next, ...handlers })),
    );
  update(props);
  return { element, update };
}

async function mountPanel({ root }, program, open, extra = {}) {
  const calls = [];
  const props = {
    state: newKnowingGame(),
    program,
    open,
    copy: false,
    ...extra,
  };
  let panel = null;
  await inAct(() => {
    panel = drawnIn(
      root,
      {
        onCommit: (next) => calls.push(["commit", next]),
        onClose: () => calls.push(["close"]),
      },
      { ...props, open: null },
    );
    root.append(panel.element);
  });
  await inAct(() => panel.update(props));
  return { panel, calls, props };
}

const panelOf = (root) => root.querySelector(".rule-panel");
const cellsIn = (element) => [...element.querySelectorAll(".pick-cell")];
/** The name a cell shows, without the reason drawn inside it. */
const nameOf = (cell) => {
  const copy = cell.cloneNode(true);
  copy.querySelectorAll(".pick-cell-reason").forEach((node) => node.remove());
  return copy.textContent;
};
const cellNamed = (element, name) =>
  cellsIn(element).find((cell) => nameOf(cell) === name);
const reasonOf = (cell) =>
  cell.querySelector(".pick-cell-reason")?.textContent ?? null;
/** The pick of the field whose label is `label`: its grid of cells, the group the keys move in. */
const pickOfField = (panel, label) =>
  panel.querySelector(`.rule-panel-pick[aria-label="${label}"]`);
/** The time a cell shows beside it, or null. */
const timeOf = (cell) =>
  cell.parentElement.querySelector(".rule-panel-time")?.textContent ?? null;

function key(target, name) {
  assert.ok(target, "what the case presses a key on stands");
  const { Event } = target.ownerDocument.defaultView;
  const event = new Event("keydown", { bubbles: true, cancelable: true });
  Object.defineProperty(event, "key", { value: name });
  return inAct(() => target.dispatchEvent(event));
}

test("„Puste” takes its place from a pick of the places some item fits, the held one chosen", async () => {
  // decision: D-459 "The condition „Puste — {miejsce}” holds when the place it names holds nothing; „Puste — Kieszeń” holds when at least one pocket is empty. A program names a place of the gear only by its kind, never by the number or the position of a pocket, and the targets of the condition are the places some item of the data fits, a place gaining its target when the first item starts to fit it."
  await withPage(async (page) => {
    await mountPanel(
      page,
      withFirstRule({ kind: "emptyPlace", place: "mainHand" }, EXPLORE),
      {
        groupId: 1,
        ruleId: 1,
        field: "conditionTarget",
      },
    );
    const pick = pickOfField(panelOf(page.root), "Cel warunku");
    assert.ok(pick, "the target of „Puste” is a pick of cells");
    const cells = cellsIn(pick);
    assert.deepEqual(cells.map(nameOf), ["Ręka główna", "Kieszeń"]);
    assert.equal(cells[0].getAttribute("aria-pressed"), "true");
    assert.equal(cells[1].getAttribute("aria-pressed"), "false");
    assert.equal(reasonOf(cells[1]), null);
  });
});

test("a pick of „Kieszeń” under „Puste” commits the place by its kind, and the arrow keys move between the two places", async () => {
  // decision: D-459 "A program names a place of the gear only by its kind, never by the number or the position of a pocket"
  // decision: D-288 "A rule's row reads as a sentence and the window of the rule changes it, as the window of a rule group changes the group, and where another entry names the rule panel, it is this window: in the window each pick moves on to the next field, conditions, actions and targets stand as cells in groups that the keyboard can reach, the conditions in two columns, and what the player may not pick stands greyed with its reason"
  await withPage(async (page) => {
    const { calls } = await mountPanel(
      page,
      withFirstRule({ kind: "emptyPlace", place: "mainHand" }, EXPLORE),
      { groupId: 1, ruleId: 1, field: "conditionTarget" },
    );
    const pick = pickOfField(panelOf(page.root), "Cel warunku");
    const cells = cellsIn(pick);
    assert.equal(
      page.document.activeElement,
      cells[0],
      "the focus stands on the held place",
    );
    await key(page.document.activeElement, "ArrowRight");
    assert.equal(page.document.activeElement, cells[1]);
    await key(page.document.activeElement, "Enter");
    assert.equal(calls.length, 1);
    const next = calls[0][1];
    assert.deepEqual(next.groups[0].rules[0].condition, {
      kind: "emptyPlace",
      place: "pocket",
    });
  });
});

test("„Załóż” takes its item from a pick of the items that fit a place, each with no price and no time", async () => {
  // decision: D-363 "The rule panel shows beside an action what it costs, read from the game's data, in brackets after the action's name, in the same text as the name, so that it takes the name's role and dims with a greyed cell — such as „Wytwórz — ognisko (6 patyków)” — at every cell of its pick, a greyed one included, save the cell of an action whose price its target gives, and at the action chosen in the panel, where the time of one execution stands; the row of a program rule shows no price."
  await withPage(async (page) => {
    await mountPanel(
      page,
      withFirstRule(ALWAYS, { kind: "equip", item: "stick" }),
      {
        groupId: 1,
        ruleId: 1,
        field: "actionTarget",
      },
    );
    const cells = cellsIn(pickOfField(panelOf(page.root), "Cel czynności"));
    assert.deepEqual(cells.map(nameOf), ["Patyk", "Opatrunek"]);
    assert.equal(cells[0].getAttribute("aria-pressed"), "true");
    assert.equal(cells[1].getAttribute("aria-pressed"), "false");
    for (const cell of cells) {
      assert.equal(reasonOf(cell), null);
      assert.equal(
        timeOf(cell),
        null,
        "the time of „Załóż” stands beside the action",
      );
    }
  });
});

test("the cell „Załóż” of the pick of actions has no price and stands with its time of 1 min", async () => {
  // decision: D-293 "Beside a program rule's action, in its row and in the rule panel, stands the time one carrying out of the action takes, such as „10 min”, „tura” for an action of combat, for a movement during a map run the time of a step on that map, and nothing for a movement outside a map run"
  await withPage(async (page) => {
    await mountPanel(page, withFirstRule(ALWAYS, EXPLORE), {
      groupId: 1,
      ruleId: 1,
      field: "action",
    });
    const cell = cellNamed(panelOf(page.root), "Załóż");
    assert.ok(cell, "„Załóż” stands in the pick with no price in its name");
    assert.equal(timeOf(cell), "1 min");
  });
});
