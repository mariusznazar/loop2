// The screen Wiedza (D-416, D-281, D-282) on jsdom through tests/view/page-document.mjs (D-264): which
// elements the screen builds, what it shows of the Understanding and of the data, which trees stand
// folded and open, and that it shows no level and offers no buying. Real keys, focus and the layout of
// the two areas are the browser check's (D-88); the tree's row is a native button, which a browser
// opens with Enter and Space.
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
/** The rows of the trees, the buttons that fold and open them. */
const rowsOf = (root) => all(root, ".knowledge-tree > button");

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
      rowsOf(page.root).map((row) => [
        row.textContent,
        row.getAttribute("aria-expanded"),
        row.tagName,
        row.getAttribute("type"),
      ]),
      [
        ["▸ Eksploracja · 3 gałęzie", "false", "BUTTON", "button"],
        [
          "▸ Zbieranie małych przedmiotów · 3 gałęzie",
          "false",
          "BUTTON",
          "button",
        ],
        ["▸ Kopanie · 1 gałąź", "false", "BUTTON", "button"],
      ],
    );
    assert.equal(all(page.root, ".knowledge-branch").length, 0, "all folded");
    assert.equal(all(page.root, ".screen-area").length, 2, "two areas");
  });
});

// Catches a click that opens the wrong tree or closes the others, a branch that lacks its steps, its
// description or its prices, and a tree that does not fold again.
test("a click opens a tree to its branches with their steps, descriptions and the price of every step, and a second click folds it", async () => {
  // decision: D-416 "Its right area has the heading „Umiejętności” with the counter „{n} drzew”, the trees the player knows in the order of the data"
  await withPage(async (page) => {
    await mount(
      page,
      stateKnowing({ trees: ["exploration", "smallItemGathering"] }),
    );
    const [exploration, gathering] = rowsOf(page.root);
    await press(gathering);
    assert.equal(gathering.getAttribute("aria-expanded"), "true");
    assert.equal(exploration.getAttribute("aria-expanded"), "false");
    assert.equal(
      gathering.textContent,
      "▾ Zbieranie małych przedmiotów · 3 gałęzie",
    );
    assert.deepEqual(
      all(page.root, ".knowledge-branch").map((branch) =>
        [...branch.children].map((part) => part.textContent),
      ),
      [
        [
          "Wprawne oko",
          "3 stopnie",
          "Większa szansa zebrania przedmiotu",
          "1 · 1 · 1 pkt",
        ],
        [
          "Pełna garść",
          "1 stopień",
          "Więcej sztuk przy udanym zbieraniu",
          "3 pkt",
        ],
        [
          "Obchód",
          "1 stopień",
          "Zbiera do 12 sztuk bez losowania przez 40 minut",
          "3 pkt",
        ],
      ],
    );
    await press(exploration);
    assert.equal(all(page.root, ".knowledge-branch").length, 6, "both open");
    await press(gathering);
    assert.equal(gathering.getAttribute("aria-expanded"), "false");
    assert.deepEqual(
      all(page.root, ".knowledge-branch-name").map((name) => name.textContent),
      ["Wprawny krok", "Długi krok", "Zwiad"],
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
// control other than the rows of the trees; and a draw that writes anything into the game state.
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
    assert.equal(all(page.root, "button").length, 2, "only the rows of trees");
    assert.ok(
      all(page.root, "button").every((button) =>
        button.hasAttribute("aria-expanded"),
      ),
      "each button folds a tree",
    );
    assert.equal(JSON.stringify(state), before, "the state is as it was");
  });
});
