// The rule list of the program editor (task edytor-programu, To do 1, 2, 6–10; D-93, D-270, D-292, D-295,
// D-297) on jsdom through tests/view/page-document.mjs (D-264). jsdom shows which elements the list
// builds, what it hands the page and which element holds the focus; the real drag, the real focus ring
// and the look are the browser check's (D-88), so a drag case here sends the events a drag sends.
import { assert, inAct, withPage } from "./page-document.mjs";
import { test } from "node:test";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import { createCharacter, newGame, send } from "../../dist/browser/sim/game.js";
import {
  fullUnderstanding,
  newKnowingGame,
} from "../sim/understanding-fixture.mjs";
import { createRuleList } from "../../dist/browser/view/rule-list.js";

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
    onCommit: (next) => calls.push(["commit", next]),
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
