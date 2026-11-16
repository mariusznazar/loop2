// The words and the lists of the screen Wiedza (D-416): the counters in the form their number takes,
// the three groups of the Understanding in the order of discovery with the campfire among the items,
// and the known skill trees in the order of the data with their branches and the price of each rank.
// Every expected value is written out here from the data the cases name, not computed by the code.
import assert from "node:assert/strict";
import { test } from "node:test";
import {
  branchesCounter,
  knownGroups,
  knownThingCount,
  knownTrees,
  stepsCounter,
  thingsCounter,
  treesCounter,
} from "../../dist/browser/view/knowledge-lines.js";

/** An Understanding of the lists given, the others empty. */
const understanding = (lists = {}) => ({
  trees: [],
  actions: [],
  conditions: [],
  items: [],
  creatures: [],
  ...lists,
});

// Catches the form of a count taken by the last digit alone: 12 to 14 take the genitive plural, as
// 5 does, and 22 takes the plural of 2; 1 and 21 differ, since only 1 takes the singular.
test("a counter takes the singular after 1, the few form after 2 to 4 and 22 to 24, and the many form after the rest, 12 to 14 and 21 included", () => {
  // decision: D-416 "The counters of the screen decline by the number, as in loop"
  const cases = [
    [0, "0 poznanych rzeczy", "0 drzew", "0 gałęzi", "0 stopni"],
    [1, "1 poznana rzecz", "1 drzewo", "1 gałąź", "1 stopień"],
    [2, "2 poznane rzeczy", "2 drzewa", "2 gałęzie", "2 stopnie"],
    [3, "3 poznane rzeczy", "3 drzewa", "3 gałęzie", "3 stopnie"],
    [4, "4 poznane rzeczy", "4 drzewa", "4 gałęzie", "4 stopnie"],
    [5, "5 poznanych rzeczy", "5 drzew", "5 gałęzi", "5 stopni"],
    [8, "8 poznanych rzeczy", "8 drzew", "8 gałęzi", "8 stopni"],
    [12, "12 poznanych rzeczy", "12 drzew", "12 gałęzi", "12 stopni"],
    [13, "13 poznanych rzeczy", "13 drzew", "13 gałęzi", "13 stopni"],
    [14, "14 poznanych rzeczy", "14 drzew", "14 gałęzi", "14 stopni"],
    [21, "21 poznanych rzeczy", "21 drzew", "21 gałęzi", "21 stopni"],
    [22, "22 poznane rzeczy", "22 drzewa", "22 gałęzie", "22 stopnie"],
  ];
  for (const [count, things, trees, branches, steps] of cases) {
    assert.equal(thingsCounter(count), things, `things ${count}`);
    assert.equal(treesCounter(count), trees, `trees ${count}`);
    assert.equal(branchesCounter(count), branches, `branches ${count}`);
    assert.equal(stepsCounter(count), steps, `steps ${count}`);
  }
});

// Catches a group that stands in the order of the data and not of the discovery, the campfire left
// out of the items or set apart, a condition counted among the things, and a group with no thing.
test("the groups list the actions, items and creatures in the order of discovery, the campfire among the items, and leave a group with no thing out", () => {
  // decision: D-416 "Its left area is as in the predecessor game, loop"
  const held = understanding({
    actions: ["wander", "explore"],
    conditions: ["always"],
    items: ["campfire", "stick"],
    creatures: ["wolf"],
  });
  assert.deepEqual(knownGroups(held), [
    {
      heading: "Czynności · 2",
      things: [
        { key: "wander", icon: "hiking", name: "Wędruj" },
        { key: "explore", icon: "binoculars", name: "Eksploruj" },
      ],
    },
    {
      heading: "Przedmioty · 2",
      things: [
        { key: "campfire", icon: "campfire", name: "ognisko" },
        { key: "stick", icon: "wood-stick", name: "patyk" },
      ],
    },
    {
      heading: "Stworzenia · 1",
      things: [{ key: "wolf", icon: "wolf-head", name: "wilk" }],
    },
  ]);
  assert.deepEqual(
    knownGroups(understanding({ items: ["berry"] })).map(
      (group) => group.heading,
    ),
    ["Przedmioty · 1"],
  );
  assert.deepEqual(knownGroups(understanding({ conditions: ["always"] })), []);
  assert.deepEqual(knownGroups(understanding()), []);
});

// Catches a count of the things that adds the conditions or the trees, or leaves a list out.
test("the number of things counts the actions, items and creatures, with no condition and no tree", () => {
  // decision: D-416 "The counter „{n} poznanych rzeczy” counts the actions, items and creatures together, with no condition and no tree"
  assert.equal(knownThingCount(understanding()), 0);
  assert.equal(
    knownThingCount(
      understanding({
        trees: ["exploration", "kicking"],
        conditions: ["always", "temperatureBelow"],
        actions: ["explore", "wander", "walkTo"],
        items: ["campfire", "stick"],
        creatures: ["wolf"],
      }),
    ),
    6,
  );
});

// Catches trees in the order of discovery and not of the data, a tree the player does not know, and a
// branch of another tree; the prices of the ranks written in turn, a one-rank branch with one price.
test("the known trees stand in the order of the data, each with its branches, their ranks and the price of each rank", () => {
  // decision: D-416 "Its right area has the heading „Umiejętności” with the counter „{n} drzew”, the trees the player knows in the order of the data"
  const trees = knownTrees(
    understanding({ trees: ["kicking", "smallItemGathering", "exploration"] }),
  );
  assert.deepEqual(
    trees.map((tree) => [tree.name, tree.branches]),
    [
      ["Eksploracja", "3 gałęzie"],
      ["Zbieranie małych przedmiotów", "3 gałęzie"],
      ["Kopanie", "1 gałąź"],
    ],
  );
  assert.deepEqual(
    trees[1].branchList.map((branch) => [
      branch.name,
      branch.steps,
      branch.description,
      branch.costs,
    ]),
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
  assert.deepEqual(
    trees[0].branchList.map((branch) => [branch.name, branch.costs]),
    [
      ["Wprawny krok", "1 · 1 · 1 pkt"],
      ["Długi krok", "1 · 1 · 2 pkt"],
      ["Zwiad", "3 pkt"],
    ],
  );
  assert.deepEqual(knownTrees(understanding()), []);
});
