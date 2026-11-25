// The catalog's pure functions, tested without a browser. Importing the module must not touch the DOM.
// The expected values are written out by hand from the data of Las and its four maps and from the
// rules they follow; a made-up case changes one field of a map that keeps its identifier.
import assert from "node:assert/strict";
import { test } from "node:test";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import {
  CATALOG_VIEWS,
  catalogLines,
} from "../../dist/browser/view/catalog-lines.js";

const plain = (text) => ({ text, warning: false });
const warn = (text) => ({ text, warning: true });

// The rows of Las — the open maps' facts as the data gives them: the minutes without fire come from
// the ambient temperature (25 °C on Skraj lasu and Las, 7 °C on the four others, which gives 33).
const edgeRow = {
  id: "forestEdge",
  name: "Skraj lasu",
  solved: false,
  selected: false,
  icons: [],
  facts: [plain("8 h"), plain("bez ognia 83 min")],
};
const forestRow = {
  id: "forest",
  name: "Las",
  solved: false,
  selected: false,
  icons: [],
  facts: [plain("8 h"), plain("bez ognia 83 min")],
};
const lairRow = {
  id: "forestLair",
  name: "Las — matecznik",
  solved: false,
  selected: false,
  icons: ["bear-head"],
  facts: [
    plain("10 h"),
    plain("1 do pokonania"),
    warn("⊘ wnosisz 0"),
    plain("bez ognia 33 min"),
  ],
};

function input(overrides) {
  return {
    solvedMaps: [],
    query: "",
    view: "dokad",
    unfolded: [],
    selected: null,
    ...overrides,
  };
}

test("importing the catalog touches no DOM, and the three views come in the order of the screen", () => {
  assert.equal(typeof globalThis.document, "undefined");
  assert.deepEqual(
    CATALOG_VIEWS.map((view) => view.label),
    ["Dokąd", "Co daje", "Postęp"],
  );
});

// D-325: the header of a region counts its solved maps over all its maps in the data, those not yet
// opened included: „Las · 0 z 5” with none solved, and the map not yet opened does not stand on the
// list. Catches a counter that counts only the open maps, or the list that shows a closed map.
test("the region's counter counts all five maps of the data, and only the open map stands on the list", () => {
  // decision: D-325 "The catalog groups the maps by their region, each region with a header and a counter of its solved maps over all its maps in the game's data"
  const result = catalogLines(input({ solvedMaps: [] }));
  assert.equal(result.view, "dokad");
  assert.equal(result.counter, "1 poznanych · 0 rozwiązanych");
  assert.deepEqual(result.regions, [
    { header: "Las · 0 z 5", rows: [edgeRow], solved: null },
  ]);
  assert.equal(result.none, null);
});

// D-325: solved maps fold under one row that counts them, the open unsolved maps stay on top. The
// fold opens for the region of the picked map, for a search and for a region the player unfolded.
// Catches a solved map left on top, a fold that counts the wrong maps, and a fold that never opens.
test("a solved map folds under one row that counts it, and the fold opens for the picked map, a search or an unfold", () => {
  // decision: D-325 "The catalog groups the maps by their region, each region with a header and a counter of its solved maps over all its maps in the game's data"
  const solvedEdge = { ...edgeRow, solved: true };
  const folded = (expanded, overrides) =>
    catalogLines(input({ solvedMaps: ["forestEdge"], ...overrides })).regions[0]
      .solved.expanded === expanded;
  const closed = catalogLines(input({ solvedMaps: ["forestEdge"] }));
  assert.equal(closed.regions[0].header, "Las · 1 z 5");
  assert.deepEqual(closed.regions[0].rows, [forestRow]);
  assert.deepEqual(closed.regions[0].solved, {
    text: "1 rozwiązana",
    expanded: false,
    rows: [solvedEdge],
  });
  assert.equal(folded(true, { selected: "forestEdge" }), true);
  assert.equal(folded(true, { unfolded: ["Las"] }), true);
  assert.equal(folded(true, { query: "las" }), true);
  assert.equal(folded(false, { unfolded: [] }), true);
});

// D-325, D-327: the facts of a row in the old game's order — the demand in whole hours, what the map
// takes with its „⊘” on the first only, the terrain. Catches a demand in the wrong unit, a „⊘” on each
// line, a zero cap dropped as unset, and the step given where it is the usual one.
test("the facts of a row keep the old order: the demand, what the map takes with the mark on the first, the terrain", () => {
  // decision: D-325 "The catalog groups the maps by their region, each region with a header and a counter of its solved maps over all its maps in the game's data"
  // decision: D-327 "The card of a map follows the card of the predecessor game"
  const result = catalogLines(
    input({ solvedMaps: ["forestEdge", "forest", "forestDeep", "forestPack"] }),
  );
  assert.deepEqual(result.regions[0].rows, [lairRow]);
  assert.deepEqual(
    result.regions[0].solved.rows.map((row) => row.facts),
    [
      [plain("8 h"), plain("bez ognia 83 min")],
      [plain("8 h"), plain("bez ognia 83 min")],
      [plain("9 h"), plain("2 do pokonania"), plain("bez ognia 33 min")],
      [plain("9 h"), plain("6 do pokonania"), plain("bez ognia 33 min")],
    ],
  );
  assert.deepEqual(result.regions[0].solved.rows[2].icons, ["wolf-head"]);
});

// D-325: the demand reads whole hours, and in minutes where the streak is not a whole number of
// hours; a step other than the usual one (the step most maps give, D-333) is named, with the rest of
// the terrain. Made-up numbers on Skraj lasu. Catches a rounded streak and a step named on every map.
test("a streak that is no whole number of hours reads in minutes, and a step that differs from the usual one is named", () => {
  // decision: D-333 "The usual step is the step most maps' data give, the first of the data's order on a tie"
  const data = {
    ...MAPS,
    forestEdge: { ...MAPS.forestEdge, solving: { streak: 90 }, stepMinutes: 9 },
  };
  const result = catalogLines(input({ solvedMaps: [] }), data);
  assert.deepEqual(result.regions[0].rows[0].facts, [
    plain("90 min"),
    plain("bez ognia 83 min"),
    plain("krok 9 min"),
  ]);
});

// D-325, D-327: a resource that does not renew reads „nie wraca” as a warning, in place of the
// renewal; the tiles that hold it are the density times the tiles, rounded. Catches a „+1 co” given
// to such a resource, and a count that is floored.
test("„Co daje” gives the tiles that hold a resource, its stock, and „nie wraca” as a warning where it does not renew", () => {
  // decision: D-325 "The catalog groups the maps by their region, each region with a header and a counter of its solved maps over all its maps in the game's data"
  const data = {
    ...MAPS,
    forestEdge: {
      ...MAPS.forestEdge,
      resources: [{ id: "stick", density: 0.7, stock: 12 }],
    },
  };
  const result = catalogLines(input({ view: "coDaje" }), data);
  assert.deepEqual(result.groups, [
    {
      resource: "stick",
      name: "patyk",
      icon: "wood-stick",
      count: "1 mapa",
      rows: [
        {
          id: "forestEdge",
          name: "Skraj lasu",
          solved: false,
          selected: false,
          spread: "≈ 11 z 16 · po 12",
          renewal: { text: "nie wraca", warning: true },
        },
      ],
    },
  ]);
});

// D-325: the groups of „Co daje” go by the fewest open maps first, and within a group the solved maps
// come first; the counter counts the resources in reach. Solved Skraj lasu, open Las: moss and fiber
// (one map each) come before stick and berry (two each). Catches a sort by the most maps, a group
// with its open map above the solved one, and a count of the wrong resources.
test("„Co daje” lists the resource the fewest open maps give first, the solved map first within a group", () => {
  // decision: D-325 "The catalog groups the maps by their region, each region with a header and a counter of its solved maps over all its maps in the game's data"
  const result = catalogLines(
    input({ view: "coDaje", solvedMaps: ["forestEdge"] }),
  );
  assert.equal(result.counter, "4 zasoby w zasięgu");
  assert.deepEqual(
    result.groups.map((group) => [group.name, group.icon, group.count]),
    [
      ["mech", "fern", "1 mapa"],
      ["włókno", "flax", "1 mapa"],
      ["patyk", "wood-stick", "2 mapy"],
      ["jagoda", "berry-bush", "2 mapy"],
    ],
  );
  assert.deepEqual(result.groups[0].rows, [
    {
      id: "forest",
      name: "Las",
      solved: false,
      selected: false,
      spread: "≈ 6 z 16 · po 6",
      renewal: { text: "+1 co 60 min", warning: false },
    },
  ]);
  assert.deepEqual(
    result.groups[2].rows.map((row) => [row.id, row.solved, row.spread]),
    [
      ["forestEdge", true, "≈ 16 z 16 · po 12"],
      ["forest", false, "≈ 11 z 16 · po 12"],
    ],
  );
});

// D-325: the search finds the open maps whose name or whose resource's name holds the text, ignoring
// case, trimmed, and folds no Polish letter: „glebiej” does not find „głębiej”, „GŁĘBIEJ” does. An empty
// text finds all. Catches a search that folds Polish letters, one that does not trim, and one that
// finds a closed map.
test("the search finds open maps by name or resource, ignoring case, trimmed, folding no Polish letter", () => {
  // decision: D-325 "The catalog groups the maps by their region, each region with a header and a counter of its solved maps over all its maps in the game's data"
  const solved = ["forestEdge", "forest"];
  const none = catalogLines(input({ solvedMaps: solved, query: "glebiej" }));
  assert.deepEqual(none.regions, []);
  assert.equal(none.none, "Nic nie pasuje do „glebiej”.");
  const found = catalogLines(
    input({ solvedMaps: solved, query: "  GŁĘBIEJ " }),
  );
  assert.equal(found.none, null);
  assert.deepEqual(
    found.regions[0].rows.map((row) => row.id),
    ["forestDeep"],
  );
  const all = catalogLines(input({ solvedMaps: [], query: "   " }));
  assert.deepEqual(all.regions[0].rows, [edgeRow]);
  assert.equal(all.none, null);
});

// D-325: the search finds a map by the name of its resource, and „Co daje” keeps only a group whose
// resource's name holds the text. Catches a group that lists maps whose name does not hold the text
// and whose resource name is another.
test("the search by a resource's name keeps that resource's group and no other", () => {
  // decision: D-325 "The catalog groups the maps by their region, each region with a header and a counter of its solved maps over all its maps in the game's data"
  const result = catalogLines(
    input({ view: "coDaje", solvedMaps: [], query: "jagoda" }),
  );
  assert.deepEqual(
    result.groups.map((group) => [group.name, group.rows.map((row) => row.id)]),
    [["jagoda", ["forestEdge"]]],
  );
  const none = catalogLines(input({ view: "coDaje", query: "xyz" }));
  assert.deepEqual(none.groups, []);
  assert.equal(none.none, "Nic nie pasuje do „xyz”.");
});

// D-325: „Postęp” gives per region the open maps and one empty place with no name for each map not
// yet opened, none while a search is typed. Catches empty places counted from the open maps, or shown
// during a search.
test("„Postęp” gives an empty place for each map not yet opened, and none while a search is typed", () => {
  // decision: D-325 "The catalog groups the maps by their region, each region with a header and a counter of its solved maps over all its maps in the game's data"
  // decision: D-149 "A map whose opening map is still unsolved is absent from the screen Mapy"
  const result = catalogLines(input({ view: "postep", solvedMaps: [] }));
  assert.equal(result.counter, "0 rozwiązanych z 1 poznanych");
  assert.deepEqual(result.regions, [
    { header: "Las · 0 z 5", rows: [edgeRow], empty: 4 },
  ]);
  const searched = catalogLines(
    input({ view: "postep", solvedMaps: [], query: "skraj" }),
  );
  assert.deepEqual(searched.regions, [
    { header: "Las · 0 z 5", rows: [edgeRow], empty: 0 },
  ]);
});

// D-325: a region with no map shown stands nowhere, and the picked map's row alone is marked as picked.
// Catches a region with nothing open drawn as a header, and the mark given to every row.
test("a region with no shown map stands nowhere, and only the picked row is marked", () => {
  // decision: D-325 "The catalog groups the maps by their region, each region with a header and a counter of its solved maps over all its maps in the game's data"
  const result = catalogLines(
    input({ view: "postep", solvedMaps: ["forestEdge"], selected: "forest" }),
    MAPS,
    ["Las", "Inne"],
  );
  assert.equal(result.regions.length, 1);
  assert.deepEqual(
    result.regions[0].rows.map((row) => [row.id, row.selected]),
    [
      ["forestEdge", false],
      ["forest", true],
    ],
  );
});
