// The rule list and the rule panel of the program editor (task edytor-programu, To do 1–10; D-93,
// D-270, D-288 to D-306) on jsdom through tests/view/page-document.mjs (D-264). jsdom shows which
// elements the list and the panel build, what they hand the page and which element holds the focus;
// the real drag, the real focus ring and the look are the browser check's (D-88), so a drag case here
// sends the events a drag sends.
import { assert, inAct, typeInto, withPage } from "./page-document.mjs";
import { test } from "node:test";
import { createElement } from "react";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import {
  createCharacter,
  newGame,
  passRealTime,
  send,
  setPace,
} from "../../dist/browser/sim/game.js";
import {
  fullUnderstanding,
  newKnowingGame,
} from "../sim/understanding-fixture.mjs";
import { createRuleList } from "../../dist/browser/view/rule-list.js";
import { createRulePanel } from "../../dist/browser/view/rule-panel.js";

const rule = (id, condition, action) => ({ id, condition, action });
const EXPLORE = { kind: "explore" };
const ALWAYS = { kind: "always" };

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

async function mount({ root }, program, extra = {}) {
  const calls = [];
  const options = {
    onCommit: (next, move) => calls.push(["commit", next, move]),
    onOpen: (target) => calls.push(["open", target]),
    onFoldedChange: (folded) => calls.push(["folded", folded]),
    props: {
      state: newKnowingGame(),
      program,
      counts: null,
      folded: [],
      open: null,
      ...extra,
    },
  };
  let list = null;
  await inAct(() => {
    list = createRuleList(options);
    root.append(list.element);
  });
  return { list, calls, props: options.props };
}

function press(target) {
  assert.ok(target, "what the case presses stands");
  const { Event } = target.ownerDocument.defaultView;
  return inAct(() =>
    target.dispatchEvent(
      new Event("click", { bubbles: true, cancelable: true }),
    ),
  );
}

/** Sends a drag event of the browser's kind, with the data transfer a drag carries. */
function drag(target, type, init = {}) {
  const { Event } = target.ownerDocument.defaultView;
  const { dataTransfer, ...rest } = init;
  const event = new Event(type, { bubbles: true, cancelable: true });
  Object.defineProperty(event, "dataTransfer", {
    value: {
      effectAllowed: "none",
      dropEffect: "none",
      setData() {},
      getData: () => "",
      ...dataTransfer,
    },
  });
  for (const [name, value] of Object.entries(rest)) {
    Object.defineProperty(event, name, { value });
  }
  return inAct(() => target.dispatchEvent(event));
}

const rowOf = (root, id) => root.querySelector(`[data-rule="${id}"]`);
const buttonIn = (element, text) =>
  [...element.querySelectorAll("button")].find(
    (button) => button.textContent === text,
  );
const dropLines = (root) => [...root.querySelectorAll(".drop-line")];
const idsOf = (program) =>
  program.groups.map((group) => group.rules.map((each) => each.id));

/** Three groups: „Pierwsza” (rules 1 and 2), „Druga” (rule 3) and „Trzecia”, which holds none. */
function threeGroups() {
  const program = twoGroups();
  program.groups.push({
    id: 3,
    name: "Trzecia",
    condition: ALWAYS,
    rules: [],
  });
  program.nextGroupId = 4;
  return program;
}

const sectionOf = (root, id) => root.querySelector(`[data-group="${id}"]`);
const headerOf = (root, id) =>
  sectionOf(root, id).querySelector(".rule-list-header");
const textIn = (element, selector) =>
  element.querySelector(selector)?.textContent;
const allButtons = (root) =>
  [...root.querySelectorAll("button")].map((button) => button.textContent);
const buttonNamed = (root, text) =>
  [...root.querySelectorAll("button")].find(
    (button) => button.textContent === text,
  );

/** A game in a map run whose Understanding holds everything. */
function runningGame() {
  return send(
    createCharacter(newKnowingGame(), "Ala").state,
    { mapId: Object.keys(MAPS)[0], characterId: 1 },
    1760000000000,
  ).state;
}

/** Gives an element a box, as a browser lays it out and jsdom does not. */
function giveBox(element, top, height) {
  Object.defineProperty(element, "getBoundingClientRect", {
    value: () => ({ top, height }),
  });
}

/** Draws the list again with the program an edit handed over, as the page does. */
function showAgain(list, props, program, more = {}) {
  return inAct(() => list.update({ ...props, program, ...more }));
}

// --- the heading, the headers and the rows -------------------------------------------------------

test("the list stands under the heading „sprawdzane od góry”", async () => {
  await withPage(async (page) => {
    await mount(page, twoGroups());
    assert.equal(textIn(page.root, ".rule-list-heading"), "sprawdzane od góry");
  });
});

test("a header shows its number, name, condition and number of rules, and a row its number, sentence and time", async () => {
  await withPage(async (page) => {
    const program = twoGroups();
    program.groups[0].condition = {
      kind: "satietyBelow",
      value: 30,
    };
    program.groups[0].rules[1] = rule(
      2,
      { kind: "itemBelow", item: "stick", value: 8 },
      { kind: "gather", resource: "stick" },
    );
    await mount(page, program);
    const header = headerOf(page.root, 1);
    assert.equal(textIn(header, ".rule-list-number"), "1");
    assert.equal(textIn(header, ".rule-list-name"), "Pierwsza");
    assert.equal(textIn(header, ".rule-list-condition"), "Sytość poniżej 30");
    assert.equal(textIn(header, ".rule-list-size"), "2 reguły");
    assert.equal(textIn(headerOf(page.root, 2), ".rule-list-size"), "1 reguła");
    const row = rowOf(page.root, 2);
    assert.equal(textIn(row, ".rule-number"), "1.2");
    assert.equal(textIn(row, ".rule-condition"), "Zapas poniżej 8 · Patyk");
    assert.equal(textIn(row, ".rule-action"), "Zbierz — Patyk");
    assert.equal(textIn(row, ".rule-time"), "10 min");
    assert.equal(textIn(rowOf(page.root, 3), ".rule-number"), "2.1");
  });
});

test("the plural of the number of rules follows Polish: 0 and 5 reguł, 1 reguła, 2 to 4 reguły, 12 reguł, 22 reguły", async () => {
  await withPage(async (page) => {
    const program = threeGroups();
    const many = (count) =>
      Array.from({ length: count }, (_, at) => rule(100 + at, ALWAYS, EXPLORE));
    program.groups[0].rules = many(5);
    program.groups[1].rules = many(12).map((each) => ({
      ...each,
      id: each.id + 100,
    }));
    program.groups.push({
      id: 4,
      name: "Czwarta",
      condition: ALWAYS,
      rules: many(22).map((each) => ({ ...each, id: each.id + 300 })),
    });
    await mount(page, program);
    const sizes = [1, 2, 3, 4].map((id) =>
      textIn(headerOf(page.root, id), ".rule-list-size"),
    );
    assert.deepEqual(sizes, ["5 reguł", "12 reguł", "0 reguł", "22 reguły"]);
  });
});

test("the action's icon stands in a mask whose file is the action's own, and the sentence has the arrow between condition and action", async () => {
  await withPage(async (page) => {
    await mount(page, twoGroups());
    const row = rowOf(page.root, 1);
    const icon = row.querySelector(".rule-action .action-icon");
    assert.ok(icon, "the action has its icon");
    assert.equal(
      icon.style.getPropertyValue("--icon"),
      'url("/icons/binoculars.svg")',
    );
    assert.equal(textIn(row, ".rule-arrow"), "→");
  });
});

test("the time of one execution: minutes, „tura” in combat, nothing for a move outside a map run and the map's step in one", async () => {
  await withPage(async (page) => {
    const program = twoGroups();
    program.groups[0].rules = [
      rule(1, ALWAYS, { kind: "kick" }),
      rule(2, ALWAYS, { kind: "wander" }),
    ];
    await mount(page, program);
    assert.equal(textIn(rowOf(page.root, 1), ".rule-time"), "tura");
    assert.equal(rowOf(page.root, 2).querySelector(".rule-time"), null);
    assert.equal(textIn(rowOf(page.root, 3), ".rule-time"), "20 min");
  });
  await withPage(async (page) => {
    const program = twoGroups();
    program.groups[0].rules = [rule(1, ALWAYS, { kind: "wander" })];
    await mount(page, program, { state: runningGame() });
    // The step of the first map is 5 minutes (tests/view/program-editor.test.mjs).
    assert.equal(textIn(rowOf(page.root, 1), ".rule-time"), "5 min");
  });
});

test("counts stand where the page gives them: a rule's „Wykonano n×” and a group's sum, and none where counts are null", async () => {
  await withPage(async (page) => {
    await mount(page, twoGroups(), { counts: { 1: 3, 2: 0, 3: 18 } });
    assert.equal(textIn(rowOf(page.root, 1), ".rule-count"), "Wykonano 3×");
    assert.equal(textIn(rowOf(page.root, 2), ".rule-count"), "Wykonano 0×");
    assert.equal(
      textIn(headerOf(page.root, 1), ".rule-list-count"),
      "Wykonano 3×",
    );
    assert.equal(
      textIn(headerOf(page.root, 2), ".rule-list-count"),
      "Wykonano 18×",
    );
  });
  await withPage(async (page) => {
    await mount(page, twoGroups());
    assert.equal(page.root.querySelector(".rule-count"), null);
    assert.equal(page.root.querySelector(".rule-list-count"), null);
  });
});

test("the list shows no ⊘, no „N reguł nie zadziała” and no amber „0×”", async () => {
  await withPage(async (page) => {
    await mount(page, twoGroups(), { counts: { 1: 0, 2: 0, 3: 0 } });
    const text = page.root.textContent;
    assert.doesNotMatch(text, /⊘/);
    assert.doesNotMatch(text, /nie zadziała/);
    assert.equal(page.root.querySelector(".warning"), null);
  });
});

test("an empty group says „Pusta grupa — przepuszcza dalej.” and a group with rules does not", async () => {
  await withPage(async (page) => {
    await mount(page, threeGroups());
    assert.equal(
      textIn(sectionOf(page.root, 3), ".rule-list-empty"),
      "Pusta grupa — przepuszcza dalej.",
    );
    assert.equal(
      sectionOf(page.root, 1).querySelector(".rule-list-empty"),
      null,
    );
  });
});

test("the open row and the open header stand marked, the others not", async () => {
  await withPage(async (page) => {
    await mount(page, twoGroups(), { open: { groupId: 1, ruleId: 2 } });
    const marked = [...page.root.querySelectorAll(".open")].map((each) =>
      each.getAttribute("data-rule"),
    );
    assert.deepEqual(marked, ["2"]);
    assert.equal(rowOf(page.root, 2).getAttribute("aria-current"), "true");
  });
  await withPage(async (page) => {
    await mount(page, twoGroups(), { open: { groupId: 2, ruleId: null } });
    assert.ok(headerOf(page.root, 2).classList.contains("open"));
    assert.equal(page.root.querySelectorAll(".open").length, 1);
  });
});

// --- opening the panel ---------------------------------------------------------------------------

test("a click on a row asks to open that rule, on a header that group, and a click on a button in the row asks nothing", async () => {
  await withPage(async (page) => {
    const { calls } = await mount(page, twoGroups());
    await press(rowOf(page.root, 2).querySelector(".rule-condition"));
    await press(headerOf(page.root, 2).querySelector(".rule-list-name"));
    await press(buttonIn(rowOf(page.root, 1), "↓"));
    assert.deepEqual(
      calls.filter((call) => call[0] === "open"),
      [
        ["open", { groupId: 1, ruleId: 2 }],
        ["open", { groupId: 2, ruleId: null }],
      ],
    );
  });
});

test("Enter and Space on a row or a header ask to open it, and other keys do not", async () => {
  await withPage(async (page) => {
    const { calls } = await mount(page, twoGroups());
    const key = (target, name) => {
      const { Event } = target.ownerDocument.defaultView;
      const event = new Event("keydown", { bubbles: true, cancelable: true });
      Object.defineProperty(event, "key", { value: name });
      return inAct(() => target.dispatchEvent(event));
    };
    await key(rowOf(page.root, 1), "Enter");
    await key(headerOf(page.root, 1), " ");
    await key(rowOf(page.root, 1), "a");
    await key(buttonIn(rowOf(page.root, 1), "↓"), "Enter");
    assert.deepEqual(calls, [
      ["open", { groupId: 1, ruleId: 1 }],
      ["open", { groupId: 1, ruleId: null }],
    ]);
  });
});

// --- the buttons of a row and of a group ---------------------------------------------------------

test("a row has „↑”, „↓” and the destructive „Usuń”, and a header has no arrows", async () => {
  await withPage(async (page) => {
    await mount(page, twoGroups());
    const row = rowOf(page.root, 1);
    assert.deepEqual(
      [...row.querySelectorAll("button")].map((button) => button.textContent),
      ["↑", "↓", "Usuń"],
    );
    assert.ok(buttonIn(row, "Usuń").classList.contains("destructive"));
    const header = headerOf(page.root, 1);
    assert.equal(buttonIn(header, "↑"), undefined);
    assert.equal(buttonIn(header, "↓"), undefined);
    assert.ok(buttonIn(header, "✕").classList.contains("destructive"));
  });
});

test("the arrows are off only at the ends of the program: „↑” on the first rule and „↓” on the last", async () => {
  await withPage(async (page) => {
    await mount(page, twoGroups());
    const off = (id) =>
      ["↑", "↓"].map((text) => buttonIn(rowOf(page.root, id), text).disabled);
    assert.deepEqual(off(1), [true, false]);
    // The last rule of the first group and the first of the second stand on the border of groups.
    assert.deepEqual(off(2), [false, false]);
    assert.deepEqual(off(3), [false, true]);
  });
});

test("„↑” on the first rule of a group moves it to the end of the previous group", async () => {
  await withPage(async (page) => {
    const { calls } = await mount(page, twoGroups());
    await press(buttonIn(rowOf(page.root, 3), "↑"));
    assert.deepEqual(idsOf(calls[0][1]), [[1, 2, 3], []]);
  });
});

test("a „↓” inside a group swaps the rule with its neighbour", async () => {
  await withPage(async (page) => {
    const { calls } = await mount(page, twoGroups());
    await press(buttonIn(rowOf(page.root, 1), "↓"));
    assert.deepEqual(idsOf(calls[0][1]), [[2, 1], [3]]);
  });
});

// Task kronika-z-filtrami, To do 5; spec D4. The chronicle names the rule or group the player moved
// from the hint the list hands over with the edit, since a swap of two neighbours leaves the copies
// unable to tell which one moved. Catches a move site that hands no hint, one that names the
// neighbour instead of the rule moved, and a hint that names the wrong kind.
test("„↑” and „↓” hand the identity of the rule moved as the hint of the edit, across a group border too", async () => {
  await withPage(async (page) => {
    const { calls } = await mount(page, twoGroups());
    await press(buttonIn(rowOf(page.root, 1), "↓"));
    assert.deepEqual(idsOf(calls[0][1]), [[2, 1], [3]]);
    assert.deepEqual(calls[0][2], { kind: "rule", ruleId: 1 });
    await press(buttonIn(rowOf(page.root, 3), "↑"));
    assert.deepEqual(idsOf(calls[1][1]), [[1, 2, 3], []]);
    assert.deepEqual(calls[1][2], { kind: "rule", ruleId: 3 });
  });
});

test("the drop of a rule hands the identity of the rule dragged as the hint, and the drop of a group that of the group", async () => {
  await withPage(async (page) => {
    const { calls } = await mount(page, threeGroups());
    await drag(rowOf(page.root, 2).querySelector(".drag-handle"), "dragstart");
    await drag(rowOf(page.root, 3), "drop");
    assert.deepEqual(idsOf(calls[0][1]), [[1], [2, 3], []]);
    assert.deepEqual(calls[0][2], { kind: "rule", ruleId: 2 });
    await drag(
      headerOf(page.root, 2).querySelector(".drag-handle"),
      "dragstart",
    );
    await drag(sectionOf(page.root, 1), "drop");
    assert.deepEqual(
      calls[1][1].groups.map((group) => group.id),
      [2, 1, 3],
    );
    assert.deepEqual(calls[1][2], { kind: "group", groupId: 2 });
  });
});

test("an edit that moves nothing hands no hint: „Usuń”, „✕”, „+ reguła” and „+ dodaj grupę”", async () => {
  await withPage(async (page) => {
    const { calls } = await mount(page, twoGroups());
    await press(buttonIn(rowOf(page.root, 2), "Usuń"));
    await press(buttonIn(headerOf(page.root, 2), "✕"));
    await press(buttonNamed(page.root, "+ reguła"));
    await press(buttonNamed(page.root, "+ dodaj grupę"));
    const commits = calls.filter((call) => call[0] === "commit");
    assert.equal(commits.length, 4);
    for (const commit of commits) assert.equal(commit[2], undefined);
  });
});

test("„Usuń” of a rule and „✕” of a group delete at once, with no question", async () => {
  await withPage(async (page) => {
    const { calls } = await mount(page, twoGroups());
    await press(buttonIn(rowOf(page.root, 2), "Usuń"));
    await press(buttonIn(headerOf(page.root, 2), "✕"));
    assert.equal(calls.length, 2);
    assert.deepEqual(idsOf(calls[0][1]), [[1], [3]]);
    assert.deepEqual(
      calls[1][1].groups.map((group) => group.id),
      [1],
    );
  });
});

test("„+ reguła” adds „Zawsze → Eksploruj” at the end of its group and asks to open its panel", async () => {
  await withPage(async (page) => {
    const { calls } = await mount(page, twoGroups());
    await press(buttonIn(sectionOf(page.root, 1), "+ reguła"));
    assert.equal(calls[0][0], "commit");
    assert.deepEqual(idsOf(calls[0][1]), [[1, 2, 4], [3]]);
    assert.deepEqual(calls[0][1].groups[0].rules[2], {
      id: 4,
      condition: { kind: "always" },
      action: { kind: "explore" },
    });
    assert.deepEqual(calls[1], ["open", { groupId: 1, ruleId: 4 }]);
  });
});

test("„+ reguła” is disabled while the Understanding holds no action", async () => {
  await withPage(async (page) => {
    const empty = {
      ...newGame(),
      understanding: { ...fullUnderstanding(), actions: [] },
    };
    const { calls } = await mount(page, twoGroups(), { state: empty });
    const add = buttonIn(sectionOf(page.root, 1), "+ reguła");
    assert.equal(add.disabled, true);
    await press(add);
    assert.deepEqual(calls, []);
  });
  await withPage(async (page) => {
    await mount(page, twoGroups());
    assert.equal(buttonIn(sectionOf(page.root, 1), "+ reguła").disabled, false);
  });
});

test("„+ dodaj grupę” appends an empty group with the next number", async () => {
  await withPage(async (page) => {
    const { calls } = await mount(page, twoGroups());
    await press(buttonNamed(page.root, "+ dodaj grupę"));
    assert.deepEqual(
      calls[0][1].groups.map((group) => [group.id, group.rules.length]),
      [
        [1, 2],
        [2, 1],
        [3, 0],
      ],
    );
    assert.equal(calls[0][1].nextGroupId, 4);
  });
});

test("the buttons of an old „Dodaj regułę”, „Dodaj grupę” and the arrows of a group are gone", async () => {
  await withPage(async (page) => {
    await mount(page, twoGroups());
    const names = allButtons(page.root);
    assert.ok(!names.includes("Dodaj regułę"));
    assert.ok(!names.includes("Dodaj grupę"));
    assert.equal(page.root.querySelector('[aria-label="Grupa w górę"]'), null);
  });
});

test("groups do not move by the keyboard: arrow keys on a header commit nothing", async () => {
  await withPage(async (page) => {
    const { calls } = await mount(page, twoGroups());
    const { Event } = page.window;
    for (const name of ["ArrowUp", "ArrowDown"]) {
      const event = new Event("keydown", { bubbles: true, cancelable: true });
      Object.defineProperty(event, "key", { value: name });
      await inAct(() => headerOf(page.root, 2).dispatchEvent(event));
    }
    assert.deepEqual(calls, []);
  });
});

// --- folding -------------------------------------------------------------------------------------

test("a folded group shows its header alone, with name, condition and number of rules", async () => {
  await withPage(async (page) => {
    await mount(page, twoGroups(), { folded: [1] });
    const section = sectionOf(page.root, 1);
    assert.equal(section.querySelector(".rule-list-row"), null);
    assert.equal(buttonIn(section, "+ reguła"), undefined);
    assert.equal(textIn(section, ".rule-list-name"), "Pierwsza");
    assert.equal(textIn(section, ".rule-list-size"), "2 reguły");
    assert.ok(rowOf(page.root, 3), "the group not folded keeps its rows");
  });
});

test("the fold button asks for the group folded or unfolded and the list changes only when the page says so", async () => {
  await withPage(async (page) => {
    const { list, calls, props } = await mount(page, twoGroups());
    await press(buttonIn(headerOf(page.root, 2), "▾"));
    assert.deepEqual(calls, [["folded", [2]]]);
    assert.ok(rowOf(page.root, 3), "the list holds no memory of its own");
    await showAgain(list, props, props.program, { folded: [2] });
    assert.equal(rowOf(page.root, 3), null);
    await press(buttonIn(headerOf(page.root, 2), "▸"));
    assert.deepEqual(calls[1], ["folded", []]);
  });
});

test("„zwiń wszystkie” and „rozwiń wszystkie” stand only beside more than one group, every group unfolded at the start", async () => {
  await withPage(async (page) => {
    const { calls } = await mount(page, twoGroups());
    assert.ok(rowOf(page.root, 1) && rowOf(page.root, 3));
    await press(buttonNamed(page.root, "zwiń wszystkie"));
    assert.deepEqual(calls, [["folded", [1, 2]]]);
  });
  await withPage(async (page) => {
    const { calls } = await mount(page, twoGroups(), { folded: [1, 2] });
    assert.equal(buttonNamed(page.root, "zwiń wszystkie"), undefined);
    await press(buttonNamed(page.root, "rozwiń wszystkie"));
    assert.deepEqual(calls, [["folded", []]]);
  });
  await withPage(async (page) => {
    const one = twoGroups();
    one.groups.pop();
    await mount(page, one);
    const names = allButtons(page.root);
    assert.ok(!names.includes("zwiń wszystkie"));
    assert.ok(!names.includes("rozwiń wszystkie"));
  });
});

// --- the drag and the drop line ------------------------------------------------------------------

test("only the handle is draggable, never the row or the header", async () => {
  await withPage(async (page) => {
    await mount(page, twoGroups());
    assert.equal(rowOf(page.root, 1).draggable, false);
    assert.equal(headerOf(page.root, 1).draggable, false);
    assert.equal(
      rowOf(page.root, 1).querySelector(".drag-handle").draggable,
      true,
    );
    assert.equal(
      headerOf(page.root, 1).querySelector(".drag-handle").draggable,
      true,
    );
  });
});

test("the drop line stands once, with „tu wyląduje”, at the place a rule dragged over a row of another group would land", async () => {
  await withPage(async (page) => {
    await mount(page, twoGroups());
    await drag(rowOf(page.root, 1).querySelector(".drag-handle"), "dragstart");
    await drag(rowOf(page.root, 3), "dragover");
    const lines = dropLines(page.root);
    assert.equal(lines.length, 1);
    assert.equal(lines[0].textContent, "tu wyląduje");
    // Before the rule it is dragged over, inside that rule's group.
    assert.equal(lines[0].nextElementSibling, rowOf(page.root, 3));
    assert.equal(lines[0].closest("section"), sectionOf(page.root, 2));
  });
});

test("a rule dropped between groups lands before the rule it was dropped on and the line leaves", async () => {
  await withPage(async (page) => {
    const { calls } = await mount(page, twoGroups());
    await drag(rowOf(page.root, 1).querySelector(".drag-handle"), "dragstart");
    await drag(rowOf(page.root, 3), "dragover");
    await drag(rowOf(page.root, 3), "drop");
    assert.equal(dropLines(page.root).length, 0);
    assert.equal(calls.length, 1);
    assert.deepEqual(idsOf(calls[0][1]), [[2], [1, 3]]);
  });
});

test("the lower half of a row puts the rule after it, and a drop on the empty rest of a group puts it at the end", async () => {
  await withPage(async (page) => {
    const { calls } = await mount(page, twoGroups());
    const handle = rowOf(page.root, 3).querySelector(".drag-handle");
    giveBox(rowOf(page.root, 1), 0, 100);
    await drag(handle, "dragstart");
    await drag(rowOf(page.root, 1), "dragover", { clientY: 80 });
    assert.equal(
      dropLines(page.root)[0].nextElementSibling,
      rowOf(page.root, 2),
    );
    await drag(rowOf(page.root, 1), "drop", { clientY: 80 });
    assert.deepEqual(idsOf(calls[0][1]), [[1, 3, 2], []]);
    await drag(handle, "dragstart");
    await drag(headerOf(page.root, 1), "drop");
    assert.deepEqual(idsOf(calls[1][1]), [[1, 2, 3], []]);
  });
});

test("a rule dropped on a folded group lands at its end, the line stands under the header and the group stays folded", async () => {
  await withPage(async (page) => {
    const { calls } = await mount(page, twoGroups(), { folded: [2] });
    await drag(rowOf(page.root, 1).querySelector(".drag-handle"), "dragstart");
    await drag(headerOf(page.root, 2), "dragover");
    const lines = dropLines(page.root);
    assert.equal(lines.length, 1);
    assert.equal(lines[0].previousElementSibling, headerOf(page.root, 2));
    await drag(headerOf(page.root, 2), "drop");
    assert.equal(dropLines(page.root).length, 0);
    assert.deepEqual(idsOf(calls[0][1]), [[2], [3, 1]]);
    assert.equal(calls.filter((call) => call[0] === "folded").length, 0);
  });
});

test("a rule dragged over its own place shows no line and a drop there changes nothing", async () => {
  await withPage(async (page) => {
    const { calls } = await mount(page, twoGroups());
    await drag(rowOf(page.root, 2).querySelector(".drag-handle"), "dragstart");
    await drag(rowOf(page.root, 2), "dragover");
    assert.equal(dropLines(page.root).length, 0);
    await drag(rowOf(page.root, 2), "drop");
    assert.deepEqual(calls, []);
  });
});

test("the line is gone after a cancelled drag and after a drag that leaves the list, and stays while the drag moves inside it", async () => {
  await withPage(async (page) => {
    await mount(page, twoGroups());
    const handle = rowOf(page.root, 1).querySelector(".drag-handle");
    // A cancelled drag ends on the source with the effect none.
    await drag(handle, "dragstart");
    await drag(rowOf(page.root, 3), "dragover");
    assert.equal(dropLines(page.root).length, 1);
    await drag(handle, "dragend", { dataTransfer: { dropEffect: "none" } });
    assert.equal(dropLines(page.root).length, 0);
    // Leaving the list for the page around it.
    await drag(handle, "dragstart");
    await drag(rowOf(page.root, 3), "dragover");
    await drag(rowOf(page.root, 3), "dragleave", {
      relatedTarget: page.document.body,
    });
    assert.equal(dropLines(page.root).length, 0);
    // Moving from one row to another inside the list keeps it.
    await drag(rowOf(page.root, 3), "dragover");
    await drag(rowOf(page.root, 3), "dragleave", {
      relatedTarget: rowOf(page.root, 2),
    });
    assert.equal(dropLines(page.root).length, 1);
  });
});

test("a drag that ends where the list does not see it still takes the line away", async () => {
  await withPage(async (page) => {
    const { list, props } = await mount(page, twoGroups());
    await drag(rowOf(page.root, 1).querySelector(".drag-handle"), "dragstart");
    await drag(rowOf(page.root, 3), "dragover");
    // The source row left the page with an edit, so its dragend reaches no element of the list.
    const smaller = twoGroups();
    smaller.groups[0].rules = [smaller.groups[0].rules[1]];
    await showAgain(list, props, smaller);
    await drag(page.document.body, "dragend");
    assert.equal(dropLines(page.root).length, 0);
  });
});

test("a drag that is none of the list's — a file or a text — makes no line and is not accepted", async () => {
  await withPage(async (page) => {
    await mount(page, twoGroups());
    const accepted = await drag(rowOf(page.root, 3), "dragover");
    assert.equal(accepted, true);
    assert.equal(dropLines(page.root).length, 0);
  });
});

test("a group dragged by its handle shows the line between groups, and a drop puts it there", async () => {
  await withPage(async (page) => {
    const { calls } = await mount(page, threeGroups());
    await drag(
      headerOf(page.root, 2).querySelector(".drag-handle"),
      "dragstart",
    );
    await drag(sectionOf(page.root, 1), "dragover");
    const lines = dropLines(page.root);
    assert.equal(lines.length, 1);
    assert.equal(lines[0].textContent, "tu wyląduje");
    assert.equal(
      lines[0].parentElement.nextElementSibling,
      sectionOf(page.root, 1),
    );
    await drag(sectionOf(page.root, 1), "drop");
    assert.equal(dropLines(page.root).length, 0);
    assert.deepEqual(
      calls[0][1].groups.map((group) => group.id),
      [2, 1, 3],
    );
  });
});

test("a group dragged to the lower half of the last group lands at the end, and over its own place shows no line", async () => {
  await withPage(async (page) => {
    const { calls } = await mount(page, threeGroups());
    const handle = headerOf(page.root, 1).querySelector(".drag-handle");
    giveBox(sectionOf(page.root, 3), 0, 100);
    await drag(handle, "dragstart");
    await drag(sectionOf(page.root, 3), "dragover", { clientY: 90 });
    const lines = dropLines(page.root);
    assert.equal(lines.length, 1);
    assert.equal(
      lines[0].parentElement.previousElementSibling,
      sectionOf(page.root, 3),
    );
    await drag(sectionOf(page.root, 3), "drop", { clientY: 90 });
    assert.deepEqual(
      calls[0][1].groups.map((group) => group.id),
      [2, 3, 1],
    );
    await drag(handle, "dragstart");
    await drag(sectionOf(page.root, 1), "dragover");
    assert.equal(dropLines(page.root).length, 0);
  });
});

test("a group dragged over one of its rows is placed among the groups, never among rules", async () => {
  await withPage(async (page) => {
    await mount(page, threeGroups());
    await drag(
      headerOf(page.root, 1).querySelector(".drag-handle"),
      "dragstart",
    );
    await drag(rowOf(page.root, 3), "dragover");
    const lines = dropLines(page.root);
    // Before „Druga”, the group of that row, which is „Pierwsza”'s own place: nothing changes.
    assert.equal(lines.length, 0);
    giveBox(sectionOf(page.root, 2), 0, 100);
    await drag(rowOf(page.root, 3), "dragover", { clientY: 90 });
    assert.equal(dropLines(page.root).length, 1);
    assert.equal(dropLines(page.root)[0].closest("ol"), null);
  });
});

test("a group dragged by its handle can be dropped on a folded group too, before or after it", async () => {
  await withPage(async (page) => {
    const { calls } = await mount(page, threeGroups(), { folded: [2] });
    await drag(
      headerOf(page.root, 3).querySelector(".drag-handle"),
      "dragstart",
    );
    await drag(sectionOf(page.root, 2), "drop");
    assert.deepEqual(
      calls[0][1].groups.map((group) => group.id),
      [1, 3, 2],
    );
  });
});

// --- the focus after an edit ---------------------------------------------------------------------

test("after „↓” across a group border the focus stands on the moved rule's „↓” in its new group", async () => {
  await withPage(async (page) => {
    const { list, calls, props } = await mount(page, twoGroups());
    const down = buttonIn(rowOf(page.root, 2), "↓");
    await inAct(() => down.focus());
    await press(down);
    await showAgain(list, props, calls[0][1]);
    assert.equal(
      page.document.activeElement,
      buttonIn(rowOf(page.root, 2), "↓"),
    );
    assert.equal(
      rowOf(page.root, 2).closest("section"),
      sectionOf(page.root, 2),
    );
  });
});

test("after „↑” across a group border the focus stands on the moved rule's „↑” in its new group", async () => {
  await withPage(async (page) => {
    const { list, calls, props } = await mount(page, twoGroups());
    await press(buttonIn(rowOf(page.root, 3), "↑"));
    await showAgain(list, props, calls[0][1]);
    assert.equal(
      page.document.activeElement,
      buttonIn(rowOf(page.root, 3), "↑"),
    );
    assert.equal(
      rowOf(page.root, 3).closest("section"),
      sectionOf(page.root, 1),
    );
  });
});

test("a rule that reaches an end of the program, where its own arrow is off, takes the focus on the other arrow", async () => {
  await withPage(async (page) => {
    const { list, calls, props } = await mount(page, twoGroups());
    await press(buttonIn(rowOf(page.root, 2), "↑"));
    await showAgain(list, props, calls[0][1]);
    assert.equal(
      page.document.activeElement,
      buttonIn(rowOf(page.root, 2), "↓"),
    );
  });
});

test("a rule moved into a folded group leaves the focus on that group's header", async () => {
  await withPage(async (page) => {
    const { list, calls, props } = await mount(page, twoGroups(), {
      folded: [2],
    });
    await press(buttonIn(rowOf(page.root, 2), "↓"));
    await showAgain(list, props, calls[0][1], { folded: [2] });
    assert.equal(rowOf(page.root, 2), null);
    assert.equal(page.document.activeElement, headerOf(page.root, 2));
  });
});

test("after „Usuń” the focus goes to the „Usuń” of the rule now in its place, and to „+ reguła” where none is left", async () => {
  await withPage(async (page) => {
    const { list, calls, props } = await mount(page, twoGroups());
    await press(buttonIn(rowOf(page.root, 1), "Usuń"));
    await showAgain(list, props, calls[0][1]);
    assert.equal(
      page.document.activeElement,
      buttonIn(rowOf(page.root, 2), "Usuń"),
    );
    await press(buttonIn(rowOf(page.root, 3), "Usuń"));
    await showAgain(list, props, calls[1][1]);
    assert.equal(
      page.document.activeElement,
      buttonIn(sectionOf(page.root, 2), "+ reguła"),
    );
  });
});

test("after a rule is added the focus goes to its row, and after a group is added to its header", async () => {
  await withPage(async (page) => {
    const { list, calls, props } = await mount(page, twoGroups());
    await press(buttonIn(sectionOf(page.root, 1), "+ reguła"));
    await showAgain(list, props, calls[0][1]);
    assert.equal(page.document.activeElement, rowOf(page.root, 4));
    await press(buttonNamed(page.root, "+ dodaj grupę"));
    await showAgain(list, props, calls[2][1]);
    assert.equal(page.document.activeElement, headerOf(page.root, 3));
  });
});

test("after „✕” the focus goes to the „✕” of the group now in its place, and to „+ dodaj grupę” after the last", async () => {
  await withPage(async (page) => {
    const { list, calls, props } = await mount(page, twoGroups());
    await press(buttonIn(headerOf(page.root, 1), "✕"));
    await showAgain(list, props, calls[0][1]);
    assert.equal(
      page.document.activeElement,
      buttonIn(headerOf(page.root, 2), "✕"),
    );
    await press(buttonIn(headerOf(page.root, 2), "✕"));
    await showAgain(list, props, calls[1][1]);
    assert.equal(
      page.document.activeElement,
      buttonNamed(page.root, "+ dodaj grupę"),
    );
  });
});

test("after a drop the focus goes to the dropped rule's row, and to a folded group's header when the rule is out of sight", async () => {
  await withPage(async (page) => {
    const { list, calls, props } = await mount(page, twoGroups());
    await drag(rowOf(page.root, 1).querySelector(".drag-handle"), "dragstart");
    await drag(rowOf(page.root, 3), "drop");
    await showAgain(list, props, calls[0][1]);
    assert.equal(page.document.activeElement, rowOf(page.root, 1));
  });
  await withPage(async (page) => {
    const { list, calls, props } = await mount(page, twoGroups(), {
      folded: [2],
    });
    await drag(rowOf(page.root, 1).querySelector(".drag-handle"), "dragstart");
    await drag(headerOf(page.root, 2), "drop");
    await showAgain(list, props, calls[0][1], { folded: [2] });
    assert.equal(page.document.activeElement, headerOf(page.root, 2));
  });
});

// --- the rule panel ------------------------------------------------------------------------------

/**
 * A rule panel placed on the page closed and then opened on `open`, as the page opens it on a click,
 * with what it hands the page kept in `calls`.
 */
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
    panel = createRulePanel({
      onCommit: (next) => calls.push(["commit", next]),
      onClose: () => calls.push(["close"]),
      props: { ...props, open: null },
    });
    root.append(panel.element);
  });
  await inAct(() => panel.update(props));
  return { panel, calls, props };
}

/**
 * The rule list and the rule panel side by side, wired as the page wires them: a click on a row opens
 * the panel on that rule, and each edit of either becomes the program both draw next.
 */
async function mountEditor({ root }, program, state = newKnowingGame()) {
  const page = { program, open: null, commits: [] };
  let list = null;
  let panel = null;
  const listProps = () => ({
    state,
    program: page.program,
    counts: null,
    folded: [],
    open: page.open,
  });
  const panelProps = () => ({
    state,
    program: page.program,
    open: page.open,
    copy: false,
  });
  const redraw = () => {
    list.update(listProps());
    panel.update(panelProps());
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
  const onClose = () => {
    page.open = null;
    redraw();
  };
  await inAct(() => {
    list = createRuleList({
      onCommit,
      onOpen,
      onFoldedChange: () => {},
      props: listProps(),
    });
    panel = createRulePanel({ onCommit, onClose, props: panelProps() });
    root.append(list.element, panel.element);
  });
  return page;
}

const panelOf = (root) => root.querySelector(".rule-panel");
const cellsIn = (element) => [...element.querySelectorAll(".pick-cell")];
/** The name a cell shows, without the reason drawn inside it. */
const nameOf = (cell) =>
  [...cell.childNodes]
    .filter((node) => node.nodeType === 3)
    .map((node) => node.textContent)
    .join("");
const cellNamed = (element, name) =>
  cellsIn(element).find((cell) => nameOf(cell) === name);
const labelsIn = (element) =>
  [...element.querySelectorAll(".rule-panel-label")].map(
    (label) => label.textContent,
  );
const reasonOf = (cell) =>
  cell.querySelector(".pick-cell-reason")?.textContent ?? null;
const numberIn = (element) => element.querySelector('input[type="number"]');

function key(target, name) {
  assert.ok(target, "what the case presses a key on stands");
  const { Event } = target.ownerDocument.defaultView;
  const event = new Event("keydown", { bubbles: true, cancelable: true });
  Object.defineProperty(event, "key", { value: name });
  return inAct(() => target.dispatchEvent(event));
}

/** The state with its Understanding narrowed to `parts`. */
function knowing(state, parts) {
  return { ...state, understanding: { ...state.understanding, ...parts } };
}

/** One rule, as the group „Pierwsza” of `twoGroups` holds it in the place of rule 1. */
function withFirstRule(condition, action) {
  const program = twoGroups();
  program.groups[0].rules[0] = rule(1, condition, action);
  return program;
}

const ZAPAS_8_PATYK = { kind: "itemBelow", item: "stick", value: 8 };
const ZBIERZ_PATYK = { kind: "gather", resource: "stick" };

test("the acceptance criterion: „Zapas poniżej 8 · Patyk → Zbierz — Patyk” is written from a click on its row in six actions, and the panel stays open", async () => {
  // Task edytor-programu, Acceptance criteria: the row, „Zapas poniżej”, 8 with Enter, „Patyk”,
  // „Zbierz”, „Patyk”.
  await withPage(async (page) => {
    const editor = await mountEditor(page, twoGroups());
    await press(rowOf(page.root, 2).querySelector(".rule-condition"));
    const panel = panelOf(page.root);
    assert.ok(panel, "the click on the row opens the panel");
    await press(cellNamed(panel, "Zapas poniżej"));
    const number = numberIn(panel);
    assert.equal(page.document.activeElement, number, "the pick moved on");
    await typeInto(number, "8");
    await key(number, "Enter");
    await press(cellNamed(panel, "Patyk"));
    await press(cellNamed(panel, "Zbierz"));
    await press(cellNamed(panel, "Patyk"));
    assert.equal(
      textIn(rowOf(page.root, 2), ".rule-condition"),
      "Zapas poniżej 8 · Patyk",
    );
    assert.equal(textIn(rowOf(page.root, 2), ".rule-action"), "Zbierz — Patyk");
    assert.ok(panelOf(page.root), "the panel stays open after the last field");
    // „Zapas poniżej” and „Zbierz” changed the rule; 8 and the two „Patyk” were the values the rule
    // already held, and a pick that changes nothing commits nothing (D-131).
    assert.equal(editor.commits.length, 2);
  });
});

test("a number typed in the panel keeps its text and the focus while the game at 16× redraws the panel, and Enter commits it", async () => {
  // Task edytor-programu, Acceptance criteria, and D-03: „a number field whose value the game clips
  // may lose its cursor”.
  await withPage(async (page) => {
    let state = setPace(runningGame(), 16).state;
    const { panel, calls, props } = await mountPanel(
      page,
      withFirstRule(ZAPAS_8_PATYK, EXPLORE),
      { groupId: 1, ruleId: 1, field: "number" },
      { state },
    );
    const number = numberIn(panelOf(page.root));
    assert.equal(page.document.activeElement, number, "the panel opens on it");
    await typeInto(number, "12");
    const minutes = state.run.minute;
    for (let frame = 0; frame < 5; frame += 1) {
      state = passRealTime(state, 200).state;
      await inAct(() => panel.update({ ...props, state }));
    }
    assert.ok(state.run.minute > minutes, "precondition: the game went on");
    assert.equal(numberIn(panelOf(page.root)), number, "the same field");
    assert.equal(number.value, "12");
    assert.equal(page.document.activeElement, number);
    assert.deepEqual(calls, []);
    await key(number, "Enter");
    assert.deepEqual(calls[0][1].groups[0].rules[0].condition, {
      kind: "itemBelow",
      item: "stick",
      value: 12,
    });
  });
});

// Task edytor-programu, slice 13: the case of the DOM editor about the range and step of its number
// field now stands on the number field of the panel. Catches a field drawn with another kind's range
// or step, so the browser would offer a temperature 0 to 100 or a count in tenths.
test("the number field of the panel takes the range and the step of the condition kind", async () => {
  for (const [condition, range] of [
    [
      { kind: "temperatureBelow", value: 36.5 },
      { min: "30", max: "37", step: "0.1" },
    ],
    [
      { kind: "hereBelow", resource: "stick", value: 1 },
      { min: "0", max: "50", step: "1" },
    ],
    [
      { kind: "satietyBelow", value: 50 },
      { min: "0", max: "100", step: "1" },
    ],
    [
      { kind: "natureEnergyBelow", value: 30 },
      { min: "0", max: "100", step: "1" },
    ],
    [
      { kind: "itemBelow", item: "stick", value: 8 },
      { min: "0", max: "50", step: "1" },
    ],
    [
      { kind: "campfireLeftBelow", value: 20 },
      { min: "0", max: "120", step: "1" },
    ],
    [
      { kind: "healthBelow", value: 50 },
      { min: "0", max: "100", step: "1" },
    ],
    [
      { kind: "opponentHealthBelow", value: 10 },
      { min: "0", max: "100", step: "1" },
    ],
  ]) {
    await withPage(async (page) => {
      await mountPanel(page, withFirstRule(condition, EXPLORE), {
        groupId: 1,
        ruleId: 1,
        field: "number",
      });
      const number = numberIn(panelOf(page.root));
      assert.deepEqual(
        { min: number.min, max: number.max, step: number.step },
        range,
        condition.kind,
      );
    });
  }
});

// Task edytor-programu, Acceptance criteria 3, found in the browser in slice 13: the number field took
// the focus with its digits unselected, so the 8 typed beside the 8 the rule held made 88 and the
// rule needed more than six actions. jsdom has no selection of a number field to read, so the case
// holds the call that makes it: the field is selected when the focus goes to it.
test("the number field is selected when the focus goes to it, so what is typed replaces the number held", async () => {
  await withPage(async (page) => {
    const selected = [];
    const { prototype } = page.window.HTMLInputElement;
    const original = prototype.select;
    prototype.select = function select() {
      selected.push(this);
      return original.call(this);
    };
    try {
      await mountPanel(page, withFirstRule(ZAPAS_8_PATYK, EXPLORE), {
        groupId: 1,
        ruleId: 1,
        field: "number",
      });
      const number = numberIn(panelOf(page.root));
      assert.equal(page.document.activeElement, number);
      assert.equal(selected.length, 1);
      assert.equal(selected[0], number);
    } finally {
      prototype.select = original;
    }
  });
});

test("the fields of a rule stand in the order condition, number, target of the condition, action, target of the action, each only where the rule has it", async () => {
  await withPage(async (page) => {
    await mountPanel(page, withFirstRule(ZAPAS_8_PATYK, ZBIERZ_PATYK), {
      groupId: 1,
      ruleId: 1,
    });
    assert.deepEqual(labelsIn(panelOf(page.root)), [
      "Warunek",
      "Liczba",
      "Cel warunku",
      "Czynność",
      "Cel czynności",
    ]);
  });
  await withPage(async (page) => {
    await mountPanel(page, twoGroups(), { groupId: 1, ruleId: 1 });
    assert.deepEqual(labelsIn(panelOf(page.root)), ["Warunek", "Czynność"]);
    assert.equal(numberIn(panelOf(page.root)), null);
  });
  await withPage(async (page) => {
    await mountPanel(
      page,
      withFirstRule({ kind: "temperatureBelow", value: 36 }, { kind: "kick" }),
      { groupId: 1, ruleId: 1 },
    );
    assert.deepEqual(labelsIn(panelOf(page.root)), [
      "Warunek",
      "Liczba",
      "Czynność",
    ]);
  });
});

test("the panel opens on the condition and its focus on the cell chosen there, or on the field its opener names", async () => {
  await withPage(async (page) => {
    await mountPanel(page, twoGroups(), { groupId: 1, ruleId: 1 });
    const panel = panelOf(page.root);
    assert.deepEqual(cellsIn(panel).map(nameOf).slice(0, 2), [
      "Zawsze",
      "Temperatura poniżej",
    ]);
    assert.equal(page.document.activeElement, cellNamed(panel, "Zawsze"));
    assert.equal(cellNamed(panel, "Eksploruj"), undefined);
  });
  await withPage(async (page) => {
    await mountPanel(page, twoGroups(), {
      groupId: 1,
      ruleId: 1,
      field: "action",
    });
    const panel = panelOf(page.root);
    assert.equal(cellNamed(panel, "Zawsze"), undefined);
    assert.equal(page.document.activeElement, cellNamed(panel, "Eksploruj"));
  });
});

test("each pick changes the rule at once with a whole new program and moves on, a pick of the value held too", async () => {
  await withPage(async (page) => {
    const { panel, calls, props } = await mountPanel(page, twoGroups(), {
      groupId: 1,
      ruleId: 2,
    });
    // „Zawsze” is held: nothing changes and the panel moves on to the action.
    await press(cellNamed(panelOf(page.root), "Zawsze"));
    assert.deepEqual(calls, []);
    assert.equal(
      page.document.activeElement,
      cellNamed(panelOf(page.root), "Eksploruj"),
    );
    await press(cellNamed(panelOf(page.root), "Kopnij"));
    assert.equal(calls.length, 1);
    const next = calls[0][1];
    assert.deepEqual(
      next.groups[0].rules[1],
      rule(2, ALWAYS, { kind: "kick" }),
    );
    assert.deepEqual(idsOf(next), [[1, 2], [3]]);
    // The action is the last field of this rule: the panel stays open on its pick.
    await inAct(() => panel.update({ ...props, program: next }));
    const kopnij = cellNamed(panelOf(page.root), "Kopnij");
    assert.equal(kopnij?.getAttribute("aria-pressed"), "true");
  });
});

test("in a grid the arrow keys move among the cells, two columns of conditions, a greyed cell reached and Enter on it doing nothing", async () => {
  await withPage(async (page) => {
    const state = knowing(newKnowingGame(), { items: [] });
    const { calls } = await mountPanel(
      page,
      twoGroups(),
      { groupId: 1, ruleId: 1 },
      { state },
    );
    const panel = panelOf(page.root);
    const at = () => nameOf(page.document.activeElement);
    // The sections: Zawsze; Temperatura, Sytość, Zdrowie, Energia natury; Zapas, Tu leży, Zostało
    // mniej niż — ognisko, Z dala od — ognisko; Przeciwnik ma poniżej (D-290), two to a line.
    await key(page.document.activeElement, "ArrowDown");
    assert.equal(at(), "Temperatura poniżej");
    await key(page.document.activeElement, "ArrowRight");
    assert.equal(at(), "Sytość poniżej");
    await key(page.document.activeElement, "ArrowDown");
    assert.equal(at(), "Energia natury poniżej");
    await key(page.document.activeElement, "ArrowDown");
    assert.equal(at(), "Tu leży mniej niż");
    assert.equal(
      reasonOf(page.document.activeElement),
      "nie znasz jeszcze celu",
    );
    await key(page.document.activeElement, "Enter");
    assert.deepEqual(calls, []);
    assert.equal(at(), "Tu leży mniej niż");
    // Only the cell the keyboard stands on is in the order of Tab, so Tab leaves the grid.
    const reachable = cellsIn(panel).filter((cell) => cell.tabIndex === 0);
    assert.deepEqual(reachable.map(nameOf), ["Tu leży mniej niż"]);
    await key(page.document.activeElement, "ArrowUp");
    assert.equal(at(), "Energia natury poniżej");
    await key(page.document.activeElement, "ArrowLeft");
    assert.equal(at(), "Zdrowie poniżej");
    await key(page.document.activeElement, "Enter");
    assert.equal(calls.length, 1);
    assert.equal(calls[0][1].groups[0].rules[0].condition.kind, "healthBelow");
  });
});

test("each reason stands beside its greyed cell: „gałąź niewykupiona”, „wybierzesz w przejściu…”, „nie znasz jeszcze celu”, „nie ma go na tej mapie”", async () => {
  // D-289; the four sentences are written out as the task gives them.
  const open = { groupId: 1, ruleId: 1, field: "action" };
  await withPage(async (page) => {
    await mountPanel(page, twoGroups(), open, { state: runningGame() });
    const panel = panelOf(page.root);
    assert.equal(reasonOf(cellNamed(panel, "Obchód")), "gałąź niewykupiona");
    assert.ok(cellNamed(panel, "Obchód").classList.contains("greyed"));
    assert.equal(reasonOf(cellNamed(panel, "Zbierz")), null);
  });
  await withPage(async (page) => {
    await mountPanel(page, twoGroups(), open);
    assert.equal(
      reasonOf(cellNamed(panelOf(page.root), "Obchód")),
      "wybierzesz w przejściu postaci, która ją kupiła",
    );
  });
  await withPage(async (page) => {
    const state = knowing(newKnowingGame(), { items: [] });
    const { calls } = await mountPanel(page, twoGroups(), open, { state });
    const zbierz = cellNamed(panelOf(page.root), "Zbierz");
    assert.equal(reasonOf(zbierz), "nie znasz jeszcze celu");
    await press(zbierz);
    assert.deepEqual(calls, [], "a greyed cell picks nothing");
  });
  await withPage(async (page) => {
    const mapId = Object.keys(MAPS)[0];
    const resources = MAPS[mapId].resources;
    MAPS[mapId].resources = resources.filter((each) => each.id !== "fiber");
    try {
      await mountPanel(
        page,
        withFirstRule(ALWAYS, ZBIERZ_PATYK),
        { groupId: 1, ruleId: 1, field: "actionTarget" },
        { state: runningGame() },
      );
      const panel = panelOf(page.root);
      assert.equal(
        reasonOf(cellNamed(panel, "Włókno")),
        "nie ma go na tej mapie",
      );
      assert.equal(reasonOf(cellNamed(panel, "Mech")), null);
    } finally {
      MAPS[mapId].resources = resources;
    }
  });
});

test("a value the rule holds outside the pick stands chosen and greyed, with no reason made up where none fits, and another pick changes it", async () => {
  await withPage(async (page) => {
    const state = knowing(newKnowingGame(), {
      actions: ["explore"],
      conditions: ["always"],
      items: ["stick"],
    });
    const { calls } = await mountPanel(
      page,
      withFirstRule(ALWAYS, { kind: "kick" }),
      { groupId: 1, ruleId: 1, field: "action" },
      { state },
    );
    const kopnij = cellNamed(panelOf(page.root), "Kopnij");
    assert.equal(kopnij.getAttribute("aria-pressed"), "true");
    assert.ok(kopnij.classList.contains("greyed"));
    assert.equal(reasonOf(kopnij), null);
    await press(kopnij);
    assert.deepEqual(calls, []);
    await press(cellNamed(panelOf(page.root), "Eksploruj"));
    assert.deepEqual(calls[0][1].groups[0].rules[0].action, EXPLORE);
  });
  await withPage(async (page) => {
    // „Obchód” held while the character of the map run has not bought its branch: its reason stands.
    await mountPanel(
      page,
      withFirstRule(ALWAYS, { kind: "patrol", resource: "stick" }),
      { groupId: 1, ruleId: 1, field: "action" },
      { state: runningGame() },
    );
    const obchod = cellNamed(panelOf(page.root), "Obchód");
    assert.equal(obchod.getAttribute("aria-pressed"), "true");
    assert.equal(reasonOf(obchod), "gałąź niewykupiona");
  });
});

test("the actions stand in the groups Ruch, Zbieranie, Ogień, Żywność i walka, each with its icon and the time of one execution beside it", async () => {
  await withPage(async (page) => {
    await mountPanel(page, twoGroups(), {
      groupId: 1,
      ruleId: 1,
      field: "action",
    });
    const panel = panelOf(page.root);
    const groups = [...panel.querySelectorAll(".rule-panel-section")].map(
      (section) => [
        textIn(section, ".rule-panel-section-name"),
        cellsIn(section).map(nameOf),
      ],
    );
    assert.deepEqual(groups, [
      ["Ruch", ["Eksploruj", "Wędruj", "Idź", "Idź — ognisko"]],
      ["Zbieranie", ["Zbierz", "Obchód"]],
      [
        "Ogień",
        [
          "Wytwórz — ognisko",
          "Zapal — ognisko",
          "Zapal — patyk",
          "Zasil — ognisko",
        ],
      ],
      [
        "Żywność i walka",
        ["Zjedz — jagoda", "Uderz — patyk", "Kopnij", "Odskocz"],
      ],
    ]);
    const timeOf = (name) =>
      cellNamed(panel, name).parentElement.querySelector(".rule-panel-time")
        ?.textContent ?? null;
    // The minutes of the data (src/browser/sim/data/actions.ts): „Zbierz” 10, „Obchód” 40.
    assert.equal(timeOf("Zbierz"), "10 min");
    assert.equal(timeOf("Obchód"), "40 min");
    assert.equal(timeOf("Kopnij"), "tura");
    assert.equal(timeOf("Wędruj"), null, "no map gives a move its step");
    assert.ok(cellNamed(panel, "Zbierz").querySelector(".action-icon"));
  });
});

test("the conditions stand in two columns in their sections, parted by a line, with no names; no search, no row „ostatnio” and no current value", async () => {
  await withPage(async (page) => {
    await mountPanel(page, twoGroups(), { groupId: 1, ruleId: 1 });
    const panel = panelOf(page.root);
    const sections = [...panel.querySelectorAll(".rule-panel-section")];
    assert.deepEqual(
      sections.map((section) => cellsIn(section).map(nameOf)),
      [
        ["Zawsze"],
        [
          "Temperatura poniżej",
          "Sytość poniżej",
          "Zdrowie poniżej",
          "Energia natury poniżej",
        ],
        [
          "Zapas poniżej",
          "Tu leży mniej niż",
          "Zostało mniej niż — ognisko",
          "Z dala od — ognisko",
        ],
        ["Przeciwnik ma poniżej"],
      ],
    );
    assert.equal(panel.querySelector(".rule-panel-section-name"), null);
    assert.ok(
      panel.querySelector(".rule-panel-pick.parted"),
      "parted by a line",
    );
    assert.ok(
      sections.every((section) =>
        section.querySelector(".rule-panel-cells.two-columns"),
      ),
    );
    assert.equal(panel.querySelector('input:not([type="number"])'), null);
    assert.doesNotMatch(panel.textContent, /ostatnio|teraz/);
  });
});

test("the panel of a group holds its name and its condition with its number and target, and no action", async () => {
  await withPage(async (page) => {
    const { panel, calls, props } = await mountPanel(page, twoGroups(), {
      groupId: 1,
      ruleId: null,
    });
    assert.deepEqual(labelsIn(panelOf(page.root)), ["Nazwa grupy", "Warunek"]);
    const name = panelOf(page.root).querySelector('input[type="text"]');
    assert.equal(name.value, "Pierwsza");
    assert.equal(cellNamed(panelOf(page.root), "Eksploruj"), undefined);
    await inAct(() => name.focus());
    await typeInto(name, "Ranek");
    await inAct(() => panel.update({ ...props, state: runningGame() }));
    assert.equal(name.value, "Ranek", "the name typed stays through a redraw");
    await key(name, "Enter");
    assert.equal(calls[0][1].groups[0].name, "Ranek");
    await press(cellNamed(panelOf(page.root), "Sytość poniżej"));
    const next = calls[1][1];
    assert.deepEqual(next.groups[0].condition.kind, "satietyBelow");
    assert.deepEqual(idsOf(next), [[1, 2], [3]]);
    await inAct(() => panel.update({ ...props, program: next }));
    assert.deepEqual(labelsIn(panelOf(page.root)), [
      "Nazwa grupy",
      "Warunek",
      "Liczba",
    ]);
    assert.equal(page.document.activeElement, numberIn(panelOf(page.root)));
  });
});

test("the panel of the copy says „Zmiana zeruje passę tego przejścia.”, with no word of the count, and that of a saved program says nothing", async () => {
  // D-302.
  await withPage(async (page) => {
    await mountPanel(
      page,
      twoGroups(),
      { groupId: 1, ruleId: 1 },
      { copy: true },
    );
    assert.equal(
      textIn(panelOf(page.root), ".rule-panel-note"),
      "Zmiana zeruje passę tego przejścia.",
    );
    assert.doesNotMatch(panelOf(page.root).textContent, /Wykonano|licz/);
  });
  await withPage(async (page) => {
    await mountPanel(page, twoGroups(), { groupId: 1, ruleId: 1 });
    assert.equal(panelOf(page.root).querySelector(".rule-panel-note"), null);
    assert.doesNotMatch(panelOf(page.root).textContent, /passę/);
  });
});

test("„✕” and Escape ask to close the panel, and with nothing open it draws nothing", async () => {
  await withPage(async (page) => {
    const { calls } = await mountPanel(page, twoGroups(), {
      groupId: 1,
      ruleId: 1,
    });
    await press(buttonNamed(panelOf(page.root), "✕"));
    await key(page.document.activeElement, "Escape");
    assert.deepEqual(calls, [["close"], ["close"]]);
  });
  await withPage(async (page) => {
    await mountPanel(page, twoGroups(), null);
    assert.equal(panelOf(page.root), null);
  });
});

test("opening another rule shows that rule on its condition", async () => {
  await withPage(async (page) => {
    const program = withFirstRule(ZAPAS_8_PATYK, ZBIERZ_PATYK);
    const { panel, props } = await mountPanel(page, program, {
      groupId: 1,
      ruleId: 1,
      field: "action",
    });
    await inAct(() =>
      panel.update({ ...props, open: { groupId: 2, ruleId: 3 } }),
    );
    const shown = panelOf(page.root);
    assert.deepEqual(labelsIn(shown), ["Warunek", "Czynność"]);
    assert.equal(page.document.activeElement, cellNamed(shown, "Zawsze"));
  });
});

// --- the rule panel under its row or header ------------------------------------------------------
// Task proporcje-sceny-i-programu, To do 1 and 3; D-288, D-311. A panel the page hands the list
// stands in the list, under the row or the header it changes, and is no part of that row.

/** A stand-in for the rule panel the page hands the list: a field to focus and a button to click. */
function probePanel() {
  return createElement(
    "div",
    { className: "probe-panel", tabIndex: 0 },
    createElement("button", null, "w panelu"),
  );
}
const probeIn = (root) => root.querySelector(".probe-panel");

// Catches the panel standing beside the list or at its end, and the panel inside the row's own item.
test("a list given a panel draws it right after the open row and never inside the row's item", async () => {
  await withPage(async (page) => {
    await mount(page, twoGroups(), {
      open: { groupId: 1, ruleId: 1 },
      panel: probePanel(),
    });
    const row = rowOf(page.root, 1);
    assert.equal(page.root.querySelectorAll(".probe-panel").length, 1);
    assert.ok(
      row.nextElementSibling.contains(probeIn(page.root)),
      "the panel stands right after the open row",
    );
    assert.equal(row.contains(probeIn(page.root)), false, "not in the row");
    assert.equal(
      row.nextElementSibling.nextElementSibling,
      rowOf(page.root, 2),
      "the next row follows the panel",
    );
  });
});

// Catches a header whose panel stands under its rules and a header of a group other than the open one.
test("a list given a panel draws it right after the open header, above the rules of that group", async () => {
  await withPage(async (page) => {
    await mount(page, twoGroups(), {
      open: { groupId: 2, ruleId: null },
      panel: probePanel(),
    });
    const header = headerOf(page.root, 2);
    assert.equal(page.root.querySelectorAll(".probe-panel").length, 1);
    assert.ok(
      header.nextElementSibling.contains(probeIn(page.root)),
      "the panel stands right after the open header",
    );
    assert.equal(header.contains(probeIn(page.root)), false);
    assert.ok(
      sectionOf(page.root, 2).contains(probeIn(page.root)),
      "in the group it changes",
    );
  });
});

// Catches a rule open in a folded group left with no panel because its row is not drawn.
test("the panel of a rule in a folded group stands right after that group's header", async () => {
  await withPage(async (page) => {
    await mount(page, twoGroups(), {
      folded: [1],
      open: { groupId: 1, ruleId: 2 },
      panel: probePanel(),
    });
    assert.equal(rowOf(page.root, 2), null, "the row is not drawn");
    assert.equal(page.root.querySelectorAll(".probe-panel").length, 1);
    assert.ok(
      headerOf(page.root, 1).nextElementSibling.contains(probeIn(page.root)),
      "the panel stands under the header of the folded group",
    );
  });
});

// Catches a panel drawn where none is open, a panel drawn with no panel handed over, and a panel
// that stays at the old place when another rule opens.
test("no panel is drawn without one handed over or with nothing open, and opening another rule moves it", async () => {
  await withPage(async (page) => {
    await mount(page, twoGroups(), { open: { groupId: 1, ruleId: 1 } });
    assert.equal(probeIn(page.root), null, "none handed over");
  });
  await withPage(async (page) => {
    await mount(page, twoGroups(), { panel: probePanel() });
    assert.equal(probeIn(page.root), null, "nothing open");
  });
  await withPage(async (page) => {
    const { list, props } = await mount(page, twoGroups(), {
      open: { groupId: 1, ruleId: 1 },
      panel: probePanel(),
    });
    await showAgain(list, props, props.program, {
      open: { groupId: 2, ruleId: 3 },
      panel: probePanel(),
    });
    assert.equal(page.root.querySelectorAll(".probe-panel").length, 1);
    assert.ok(
      rowOf(page.root, 3).nextElementSibling.contains(probeIn(page.root)),
      "the panel moved under rule 3",
    );
    await showAgain(list, props, props.program, {
      open: { groupId: 2, ruleId: null },
      panel: probePanel(),
    });
    assert.ok(
      headerOf(page.root, 2).nextElementSibling.contains(probeIn(page.root)),
      "and under the header of group 2",
    );
  });
});

// Catches a click, a key or a drag in the panel reaching the handlers of the row it changes: a click
// that asks to open the row again, a key that does, a drag that lands a rule.
test("a click, a key and a drag over the panel reach no handler of the row or the header", async () => {
  await withPage(async (page) => {
    const { calls } = await mount(page, twoGroups(), {
      open: { groupId: 1, ruleId: 1 },
      panel: probePanel(),
    });
    const probe = probeIn(page.root);
    const key = (target, name) => {
      const { Event } = target.ownerDocument.defaultView;
      const event = new Event("keydown", { bubbles: true, cancelable: true });
      Object.defineProperty(event, "key", { value: name });
      return inAct(() => target.dispatchEvent(event));
    };
    await press(probe);
    await press(probe.querySelector("button"));
    await key(probe, "Enter");
    await key(probe, " ");
    assert.deepEqual(calls, [], "nothing asked of the page");
  });
  await withPage(async (page) => {
    const { calls } = await mount(page, twoGroups(), {
      open: { groupId: 2, ruleId: null },
      panel: probePanel(),
    });
    await press(probeIn(page.root));
    assert.deepEqual(calls, []);
  });
  // A rule dragged over the panel under rule 3 is over no row: the line the row would draw, before
  // rule 3, does not appear.
  await withPage(async (page) => {
    await mount(page, twoGroups(), {
      open: { groupId: 2, ruleId: 3 },
      panel: probePanel(),
    });
    await drag(rowOf(page.root, 1).querySelector(".drag-handle"), "dragstart");
    await drag(probeIn(page.root), "dragover");
    const before = rowOf(page.root, 3).previousElementSibling;
    assert.ok(
      before === null || !before.classList.contains("drop-line"),
      "no line before the row the panel stands under",
    );
  });
});

// Task proporcje-sceny-i-programu, finding I-1 of the review; D-288. The one panel is drawn anew in
// a new place when the group of the open rule folds or the rule moves to another group; a panel built
// again there starts with no memory of its field and takes the focus as an opening does. Catches the
// panel mounted again at its new place: the element the page's panel drew is then another one.
test("the panel is the same element wherever the list puts it: after a fold, an unfold and a move of the open rule to another group", async () => {
  await withPage(async (page) => {
    const { list, props } = await mount(page, twoGroups(), {
      open: { groupId: 1, ruleId: 2 },
      panel: probePanel(),
    });
    const probe = probeIn(page.root);
    await showAgain(list, props, props.program, {
      open: { groupId: 1, ruleId: 2 },
      folded: [1],
      panel: probePanel(),
    });
    assert.equal(probeIn(page.root), probe, "folded");
    assert.ok(headerOf(page.root, 1).nextElementSibling.contains(probe));
    await showAgain(list, props, props.program, {
      open: { groupId: 1, ruleId: 2 },
      folded: [],
      panel: probePanel(),
    });
    assert.equal(probeIn(page.root), probe, "unfolded");
    assert.ok(rowOf(page.root, 2).nextElementSibling.contains(probe));
    // Rule 2 moves to the end of group 2 and the page names its new group.
    const moved = twoGroups();
    moved.groups[0].rules = [moved.groups[0].rules[0]];
    moved.groups[1].rules = [
      moved.groups[1].rules[0],
      rule(2, ALWAYS, EXPLORE),
    ];
    await showAgain(list, props, moved, {
      open: { groupId: 2, ruleId: 2 },
      panel: probePanel(),
    });
    assert.equal(probeIn(page.root), probe, "moved");
    assert.ok(rowOf(page.root, 2).nextElementSibling.contains(probe));
    assert.equal(page.root.querySelectorAll(".probe-panel").length, 1);
  });
});

// Catches a panel that goes after the first one it is shown in: the list must draw one panel only.
test("a panel closed and opened again is drawn once, at the place of the row opened", async () => {
  await withPage(async (page) => {
    const { list, props } = await mount(page, twoGroups(), {
      open: { groupId: 1, ruleId: 1 },
      panel: probePanel(),
    });
    await showAgain(list, props, props.program, { open: null, panel: null });
    assert.equal(probeIn(page.root), null, "closed");
    assert.equal(page.root.querySelectorAll(".rule-list-panel").length, 0);
    await showAgain(list, props, props.program, {
      open: { groupId: 2, ruleId: 3 },
      panel: probePanel(),
    });
    assert.equal(page.root.querySelectorAll(".probe-panel").length, 1);
    assert.ok(
      rowOf(page.root, 3).nextElementSibling.contains(probeIn(page.root)),
    );
  });
});

// Task proporcje-sceny-i-programu, finding M-6 of the review. The item that holds the panel stands in
// the ordered list of the group's rules; assistive technology would count it as one rule more.
// Catches the item left a list item of its own.
test("the item that holds the panel under a row is no list item to assistive technology", async () => {
  await withPage(async (page) => {
    await mount(page, twoGroups(), {
      open: { groupId: 1, ruleId: 1 },
      panel: probePanel(),
    });
    const slot = rowOf(page.root, 1).nextElementSibling;
    assert.ok(slot.contains(probeIn(page.root)));
    assert.equal(slot.getAttribute("role"), "presentation");
  });
});

// Task proporcje-sceny-i-programu, finding M-7 of the review. A rule dragged over the panel is over
// no row and no group's empty part: the panel takes no drop, and no line promises a landing the
// pointer is not at. Catches a line at the end of the group when the pointer is on the panel.
test("a rule or a group dragged over the panel shows no line, is not accepted there, and a drop on the panel changes nothing", async () => {
  await withPage(async (page) => {
    const { calls } = await mount(page, twoGroups(), {
      open: { groupId: 2, ruleId: 3 },
      panel: probePanel(),
    });
    await drag(rowOf(page.root, 1).querySelector(".drag-handle"), "dragstart");
    await drag(rowOf(page.root, 3), "dragover");
    assert.equal(dropLines(page.root).length, 1, "precondition: a line stands");
    const accepted = await drag(probeIn(page.root), "dragover");
    assert.equal(accepted, true, "dragover on the panel is not accepted");
    assert.equal(dropLines(page.root).length, 0, "the line is gone");
    await drag(probeIn(page.root), "drop");
    assert.deepEqual(calls, [], "a drop on the panel commits nothing");
  });
  await withPage(async (page) => {
    await mount(page, twoGroups(), {
      open: { groupId: 1, ruleId: 1 },
      panel: probePanel(),
    });
    giveBox(sectionOf(page.root, 2), 0, 100);
    await drag(
      headerOf(page.root, 1).querySelector(".drag-handle"),
      "dragstart",
    );
    await drag(headerOf(page.root, 2), "dragover", { clientY: 80 });
    assert.equal(dropLines(page.root).length, 1, "precondition: a line stands");
    const accepted = await drag(probeIn(page.root), "dragover");
    assert.equal(accepted, true);
    assert.equal(dropLines(page.root).length, 0);
  });
});
