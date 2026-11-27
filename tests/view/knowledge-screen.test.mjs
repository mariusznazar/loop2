// The screen Wiedza (D-416, D-281, D-282) on jsdom through tests/view/page-document.mjs (D-264): which
// elements the screen builds, what it shows of the Understanding and of the data, which trees stand
// folded and open, and that it shows no level and offers no buying. Real keys, focus and the layout of
// the two areas are the browser check's (D-88); the fold at the start of a tree's row is a native
// button, which a browser presses with Enter and Space.
import { assert, inAct, press, withPage } from "./page-document.mjs";
import { test } from "node:test";
import { createCharacter, newGame } from "../../dist/browser/sim/game.js";
import { createKnowledgeScreen } from "../../dist/browser/view/knowledge-screen.js";
import { withEdgeSolved } from "../sim/understanding-fixture.mjs";

/** The new game's state with the Understanding the case gives, every list empty but the ones named. */
function stateKnowing(lists = {}) {
  return {
    ...newGame(),
    understanding: {
      trees: [],
      actions: [],
      conditions: ["always"],
      items: [],
      creatures: [],
      ...lists,
    },
  };
}

/** Builds the screen in the page's body and gives it with the state it was built on. */
async function mount({ root }, state) {
  let screen = null;
  await inAct(() => {
    screen = createKnowledgeScreen({ props: { state } });
    root.append(screen.element);
  });
  return screen;
}

const all = (root, selector) => [...root.querySelectorAll(selector)];
const texts = (root, selector) =>
  all(root, selector).map((node) => node.textContent);
const iconsOf = (root) =>
  all(root, ".icon-mask").map((icon) => icon.style.getPropertyValue("--icon"));
/** The folds of the trees, the buttons at the start of their rows that fold and open them. */
const rowsOf = (root) => all(root, ".knowledge-tree-row > button");
/** The row of the tree named `name`, the whole row the player clicks. */
const rowNamed = (root, name) =>
  all(root, ".knowledge-tree-row").find(
    (row) => row.querySelector(".knowledge-tree-name").textContent === name,
  );
/** Each open branch as its parts read: its first line, its prices, its description, its steps. */
const branchesOf = (root) =>
  all(root, ".knowledge-branch").map((branch) => ({
    head: branch.querySelector(".knowledge-branch-head").textContent,
    costs: branch.querySelector(".knowledge-branch-costs").textContent,
    description: branch.querySelector(".knowledge-branch-description")
      .textContent,
    steps: texts(branch, ".knowledge-step"),
  }));

// Catches an area that says something of nothing known, a right area standing before a tree is known,
// and a screen without its heading.
test("a game that knows no thing shows the heading and the heading of the left area with its counter alone", async () => {
  // decision: D-416 "Its left area is as in the predecessor game, loop"
  // decision: D-416 "Its right area has the heading „Umiejętności” with the counter „{n} drzew”, the trees the player knows in the order of the data"
  await withPage(async (page) => {
    await mount(page, stateKnowing());
    assert.deepEqual(texts(page.root, ".knowledge-heading"), ["Wiedza"]);
    assert.deepEqual(texts(page.root, ".knowledge-area-name"), ["Zrozumienie"]);
    assert.deepEqual(texts(page.root, ".knowledge-area-count"), [
      "0 poznanych rzeczy",
    ]);
    assert.equal(all(page.root, ".knowledge-group").length, 0, "no group");
    assert.equal(all(page.root, "p").length, 0, "no sentence of an empty area");
    assert.equal(
      all(page.root, ".knowledge-skills").length,
      0,
      "no right area",
    );
    assert.equal(all(page.root, ".screen-area").length, 1, "one area");
  });
});

// Catches things in the order of the data and not of the discovery, the campfire set apart from the
// items, a condition among the things, an icon that is not the data's and a group heading with no count.
test("the left area lists the discovered actions, items and creatures in three groups, each in the order of discovery, with the icon and the name from the data", async () => {
  // decision: D-416 "Its left area is as in the predecessor game, loop"
  // decision: D-416 "The counter „{n} poznanych rzeczy” counts the actions, items and creatures together, with no condition and no tree"
  // decision: D-416 "Each thing of the Understanding on the screen stands with its icon from the game's data and its name, and a creature has its icon in the data"
  // decision: D-291 "Each action has one icon, which stands for it in a program rule's row, in its cell of the pick, over the mage's head, in the rows „Teraz” and „Potem” under the scene and beside the action on the screen Wiedza"
  await withPage(async (page) => {
    await mount(
      page,
      stateKnowing({
        actions: ["wander", "explore"],
        conditions: ["always", "temperatureBelow"],
        items: ["campfire", "stick"],
        creatures: ["wolf"],
      }),
    );
    assert.deepEqual(texts(page.root, ".knowledge-area-count"), [
      "5 poznanych rzeczy",
    ]);
    assert.deepEqual(texts(page.root, ".knowledge-group-name"), [
      "Czynności · 2",
      "Przedmioty · 2",
      "Stworzenia · 1",
    ]);
    assert.deepEqual(texts(page.root, ".knowledge-thing-name"), [
      "Wędruj",
      "Eksploruj",
      "ognisko",
      "patyk",
      "wilk",
    ]);
    assert.deepEqual(iconsOf(page.root), [
      'url("/icons/hiking.svg")',
      'url("/icons/binoculars.svg")',
      'url("/icons/campfire.svg")',
      'url("/icons/wood-stick.svg")',
      'url("/icons/wolf-head.svg")',
    ]);
    assert.equal(all(page.root, "img").length, 0, "no icon is a picture");
    assert.equal(
      all(page.root, ".knowledge-skills").length,
      0,
      "no tree known",
    );
  });
});

// Catches a group with no thing that stands with a count of nothing.
test("a group with no thing stands nowhere, and the others stand", async () => {
  // decision: D-416 "Its left area is as in the predecessor game, loop"
  await withPage(async (page) => {
    await mount(page, stateKnowing({ items: ["berry"] }));
    assert.deepEqual(texts(page.root, ".knowledge-group-name"), [
      "Przedmioty · 1",
    ]);
    assert.deepEqual(texts(page.root, ".knowledge-area-count"), [
      "1 poznana rzecz",
    ]);
  });
});

// Catches trees in the order of discovery, a tree the player does not know, a tree that stands open at
// the start and branches that stand before the click.
test("the right area lists the known trees in the order of the data, each folded with its number of branches", async () => {
  // decision: D-416 "Its right area has the heading „Umiejętności” with the counter „{n} drzew”, the trees the player knows in the order of the data"
  await withPage(async (page) => {
    await mount(
      page,
      stateKnowing({ trees: ["kicking", "smallItemGathering", "exploration"] }),
    );
    assert.deepEqual(
      texts(page.root, ".knowledge-skills .knowledge-area-name"),
      ["Umiejętności"],
    );
    assert.deepEqual(
      texts(page.root, ".knowledge-skills .knowledge-area-count"),
      ["3 drzewa"],
    );
    assert.deepEqual(
      all(page.root, ".knowledge-tree-row").map((row) => [
        row.querySelector(".knowledge-tree-name").textContent,
        row.querySelector(".knowledge-tree-branches").textContent,
      ]),
      [
        ["Eksploracja", "3 gałęzie"],
        ["Zbieranie małych przedmiotów", "3 gałęzie"],
        ["Kopanie", "1 gałąź"],
      ],
    );
    assert.deepEqual(
      rowsOf(page.root).map((fold) => [
        fold.textContent,
        fold.getAttribute("aria-label"),
        fold.getAttribute("aria-expanded"),
        fold.tagName,
        fold.getAttribute("type"),
      ]),
      [
        ["▸", "Eksploracja", "false", "BUTTON", "button"],
        ["▸", "Zbieranie małych przedmiotów", "false", "BUTTON", "button"],
        ["▸", "Kopanie", "false", "BUTTON", "button"],
      ],
    );
    assert.equal(all(page.root, ".knowledge-branch").length, 0, "all folded");
    assert.equal(all(page.root, ".screen-area").length, 2, "two areas");
  });
});

// Catches a row that only its fold opens, a click that opens the wrong tree or closes the others, a
// fold that does not say the tree stands open, a branch that lacks its number of steps, its
// description or its prices, a branch with a number but no line of its steps, a line of steps for a
// branch whose data give no number, and a tree that does not fold again.
test("a click anywhere on a tree's row opens it to its branches with their steps, descriptions, prices and the line of their steps, and a click on its fold folds it", async () => {
  // decision: D-416 "Its right area has the heading „Umiejętności” with the counter „{n} drzew”, the trees the player knows in the order of the data, each a folded row across the width of the area with its name and „{n} gałęzi”, which a click anywhere on the row opens and folds again"
  // decision: D-416 "An open tree shows each branch with its name, „{n} stopni”, its description from the data and the prices of all its steps in turn, and under the description"
  // decision: D-416 "A branch whose data give no number"
  await withPage(async (page) => {
    await mount(
      page,
      stateKnowing({ trees: ["exploration", "smallItemGathering"] }),
    );
    const [exploration, gathering] = rowsOf(page.root);
    await press(
      rowNamed(page.root, "Zbieranie małych przedmiotów").querySelector(
        ".knowledge-tree-branches",
      ),
    );
    assert.equal(gathering.getAttribute("aria-expanded"), "true");
    assert.equal(gathering.textContent, "▾");
    assert.equal(exploration.getAttribute("aria-expanded"), "false");
    assert.deepEqual(branchesOf(page.root), [
      {
        head: "Wprawne oko · 3 stopnie",
        costs: "1 · 1 · 1 pkt",
        description: "Większa szansa zebrania przedmiotu",
        steps: [
          "bez gałęzi 70 %",
          "I 75 % · 1 pkt",
          "II 80 % · 1 pkt",
          "III 85 % · 1 pkt",
        ],
      },
      {
        head: "Pełna garść · 1 stopień",
        costs: "3 pkt",
        description: "Więcej sztuk przy udanym zbieraniu",
        steps: ["bez gałęzi 1 szt.", "I 2 szt. · 3 pkt"],
      },
      {
        head: "Obchód · 1 stopień",
        costs: "3 pkt",
        description: "Zbiera do 12 sztuk bez losowania przez 40 minut",
        steps: [],
      },
    ]);
    await press(rowNamed(page.root, "Eksploracja"));
    assert.equal(all(page.root, ".knowledge-branch").length, 6, "both open");
    await press(gathering);
    assert.equal(gathering.getAttribute("aria-expanded"), "false");
    assert.deepEqual(branchesOf(page.root), [
      {
        head: "Wprawny krok · 3 stopnie",
        costs: "1 · 1 · 1 pkt",
        description: "Krótsza eksploracja",
        steps: [
          "bez gałęzi 20 min",
          "I 17 min · 1 pkt",
          "II 14 min · 1 pkt",
          "III 11 min · 1 pkt",
        ],
      },
      {
        head: "Długi krok · 3 stopnie",
        costs: "1 · 1 · 2 pkt",
        description: "Krótsze przejście między polami",
        steps: [
          "bez gałęzi 5 min",
          "I 3 min · 1 pkt",
          "II 1 min · 1 pkt",
          "III 1 min · 2 pkt",
        ],
      },
      {
        head: "Zwiad · 1 stopień",
        costs: "3 pkt",
        description: "Odkrywa również sąsiednie pola",
        steps: [],
      },
    ]);
    assert.equal(
      all(page.root, ".knowledge-branch .knowledge-steps").length,
      2,
      "no line of steps under Zwiad",
    );
  });
});

// Catches a screen that folds its trees at each draw of the game, which would close a tree the player is
// reading each time the game's state changes, and a screen built again that keeps the trees open.
test("an open tree stays open when the game state is drawn again, and a screen built anew starts with every tree folded", async () => {
  // decision: D-416 "Its right area has the heading „Umiejętności” with the counter „{n} drzew”, the trees the player knows in the order of the data"
  await withPage(async (page) => {
    const state = stateKnowing({ trees: ["exploration"] });
    const screen = await mount(page, state);
    await press(rowsOf(page.root)[0]);
    assert.equal(rowsOf(page.root)[0].getAttribute("aria-expanded"), "true");
    await inAct(() =>
      screen.update({
        state: stateKnowing({
          trees: ["exploration", "kicking"],
          items: ["stick"],
        }),
      }),
    );
    assert.equal(rowsOf(page.root).length, 2, "the new tree stands");
    assert.equal(rowsOf(page.root)[0].getAttribute("aria-expanded"), "true");
    assert.equal(rowsOf(page.root)[1].getAttribute("aria-expanded"), "false");
    assert.deepEqual(texts(page.root, ".knowledge-area-count"), [
      "1 poznana rzecz",
      "2 drzewa",
    ]);
    await inAct(() => screen.dispose());
    assert.equal(all(page.root, ".knowledge-screen").length, 0, "taken down");
    await mount(page, state);
    assert.equal(rowsOf(page.root)[0].getAttribute("aria-expanded"), "false");
    assert.equal(all(page.root, ".knowledge-branch").length, 0);
  });
});

// Catches a level, practice, points, a rank bought or a button of buying drawn on the screen, and a
// control other than the folds of the trees; and a draw that writes anything into the game state.
test("the screen shows no level, practice, points or buying, and changes nothing in the game state", async () => {
  // decision: D-416 "The screen Wiedza shows the actions, items and creatures in the Understanding and the skill trees to read, with no levels and no buying"
  await withPage(async (page) => {
    const base = createCharacter(withEdgeSolved(newGame()), "Ala").state;
    const [character] = base.team.characters;
    const state = {
      ...base,
      team: {
        ...base.team,
        characters: [
          {
            ...character,
            skills: {
              exploration: { practice: 100, ranks: { practicedStep: 1 } },
              smallItemGathering: { practice: 160, ranks: { keenEye: 2 } },
            },
          },
        ],
      },
      understanding: {
        ...base.understanding,
        trees: ["exploration", "smallItemGathering"],
      },
    };
    const before = JSON.stringify(state);
    await mount(page, state);
    for (const row of rowsOf(page.root)) await press(row);
    const shown = page.root.textContent;
    for (const word of ["poziom", "wprawa", "punkty", "Kup", "→", "kupion"])
      assert.ok(!shown.includes(word), `no "${word}" on the screen`);
    assert.equal(all(page.root, "button").length, 2, "only the folds of trees");
    assert.ok(
      all(page.root, "button").every((button) =>
        button.hasAttribute("aria-expanded"),
      ),
      "each button folds a tree",
    );
    assert.equal(JSON.stringify(state), before, "the state is as it was");
  });
});
