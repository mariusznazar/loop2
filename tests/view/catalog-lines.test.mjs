// The catalog's pure functions, tested without a browser. Importing the module must not touch the DOM.
// The expected values are written out by hand from the data of Las and its four maps and from the
// rules they follow; a made-up case changes one field of a map that keeps its identifier.
import assert from "node:assert/strict";
import { test } from "node:test";
import { MAPS, REGIONS } from "../../dist/browser/sim/data/maps.js";
import {
  CATALOG_VIEWS,
  catalogLines,
  catalogLinesOf,
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
    foldedInSearch: [],
    selected: null,
    recordOf: () => null,
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
  assert.equal(result.counter, "1 poznana · 0 rozwiązanych");
  assert.deepEqual(result.regions, [
    { region: "Las", header: "Las · 0 z 5", rows: [edgeRow], solved: null },
  ]);
  assert.equal(result.none, null);
});

// D-325, D-331: solved maps fold under one row that counts them, the open unsolved maps stay on top. With
// no search the fold opens where the player unfolded the region; with a search typed it stands open, and
// the player can fold the matches as well. A picked solved map under a folded row stands above that row,
// so that its row with the bar is seen, and the fold still works. Catches a solved map left on top, a fold
// that counts the wrong maps, a fold that never opens, a fold held open by a pick or a search, which the
// player then cannot fold, and a picked row hidden under a folded row, or drawn twice.
test("a solved map folds under one row that counts it, the player folds and unfolds it with or without a search, and a picked solved map stands above the folded row", () => {
  // decision: D-325 "The catalog groups the maps by their region, each region with a header and a counter of its solved maps over all its maps in the game's data"
  // decision: D-331 "The picked row stays seen: where the solved maps of its region stand folded, it stands above the row that folds them, which the player folds and unfolds at any time, a search typed included."
  const solvedEdge = { ...edgeRow, solved: true };
  const pickedEdge = { ...solvedEdge, selected: true };
  const pickedForest = { ...forestRow, selected: true };
  const region = (overrides) =>
    catalogLines(input({ solvedMaps: ["forestEdge"], ...overrides }))
      .regions[0];
  const closed = region({});
  assert.equal(closed.header, "Las · 1 z 5");
  assert.deepEqual(closed.rows, [forestRow]);
  assert.deepEqual(closed.solved, {
    text: "1 rozwiązana",
    expanded: false,
    rows: [solvedEdge],
  });
  assert.deepEqual(
    region({ unfolded: ["Las"] }).solved.expanded,
    true,
    "a region the player unfolded stands open",
  );
  const pickedFolded = region({ selected: "forestEdge" });
  assert.deepEqual(
    pickedFolded.rows,
    [forestRow, pickedEdge],
    "the picked solved map stands above the folded row",
  );
  assert.equal(
    pickedFolded.solved.expanded,
    false,
    "and the pick unfolds nothing",
  );
  const pickedUnfolded = region({ selected: "forestEdge", unfolded: ["Las"] });
  assert.deepEqual(
    pickedUnfolded.rows,
    [forestRow],
    "unfolded, the picked map stands among the solved ones, once",
  );
  assert.deepEqual(pickedUnfolded.solved.rows, [pickedEdge]);
  assert.equal(pickedUnfolded.solved.expanded, true);
  const pickedOpen = region({ selected: "forest" });
  assert.deepEqual(pickedOpen.rows, [pickedForest]);
  assert.equal(pickedOpen.solved.expanded, false);
  assert.equal(
    region({ query: "las" }).solved.expanded,
    true,
    "a search shows the solved maps that match",
  );
  assert.equal(
    region({ query: "las", foldedInSearch: ["Las"] }).solved.expanded,
    false,
    "the player folds the matches of a search",
  );
  assert.deepEqual(
    region({ query: "las", foldedInSearch: ["Las"], selected: "forestEdge" })
      .rows,
    [forestRow, pickedEdge],
    "the picked match stands above the folded row of the search",
  );
  assert.equal(
    region({ query: "", foldedInSearch: ["Las"] }).solved.expanded,
    false,
    "the folding of a search does not reach the list without one",
  );
  assert.equal(
    region({ query: "las", unfolded: [] }).solved.expanded,
    true,
    "and the folding without a search does not reach the search",
  );
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
  const result = catalogLinesOf(data, REGIONS, input({ solvedMaps: [] }));
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
  const result = catalogLinesOf(data, REGIONS, input({ view: "coDaje" }));
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
  assert.equal(result.counter, "0 rozwiązanych z 1 poznanej");
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
  const result = catalogLinesOf(
    MAPS,
    ["Las", "Inne"],
    input({ view: "postep", solvedMaps: ["forestEdge"], selected: "forest" }),
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

// D-325, D-440: the record stands among the facts of the row of the map whose data name a creature for
// it, last, as „{creature}: {n} z(e) {health}” in the role text, and nowhere before it exists. Catches a
// record in another place of the facts, one with no role of its own, and one drawn as „0” where none
// stands.
test("the record stands last among the facts of the row of the map that names a creature for it, with the creature's name and health from the data", () => {
  // decision: D-325 "A map whose data name a creature for the record shows the number of D-440 in its row."
  const open = input({
    solvedMaps: ["forestEdge", "forest", "forestDeep", "forestPack"],
  });
  const lairOf = (result) => result.regions[0].rows[0];
  const withRecord = lairOf(catalogLines({ ...open, recordOf: () => 24 }));
  assert.deepEqual(withRecord.facts, [
    ...lairRow.facts,
    { text: "niedźwiedź: 24 ze 120", warning: false, role: "text" },
  ]);
  assert.deepEqual(
    lairOf(catalogLines({ ...open, recordOf: () => 0 })).facts.at(-1),
    { text: "niedźwiedź: 0 ze 120", warning: false, role: "text" },
    "a record of 0 after a judging that took nothing stands",
  );
  assert.deepEqual(
    lairOf(catalogLines(open)).facts,
    lairRow.facts,
    "no record, no fact and no „0”",
  );
  // A made-up creature for the record gives its own name and health, whatever the bear's are.
  const wolfData = {
    ...MAPS,
    forestLair: { ...MAPS.forestLair, recordCreature: "wolf" },
  };
  assert.equal(
    lairOf(
      catalogLinesOf(wolfData, REGIONS, { ...open, recordOf: () => 7 }),
    ).facts.at(-1).text,
    "wilk: 7 z 24",
  );
});

// D-325, D-440: the catalog asks for the record of a map only where its data name a creature for it, so
// no other row can show a number the cache holds under another map. Catches a row that shows a record
// for every map, and a lair whose data name no creature that shows one all the same.
test("the record is asked for only the map whose data name a creature for it, and a map that names none shows none", () => {
  // decision: D-325 "A map whose data name a creature for the record shows the number of D-440 in its row."
  const open = input({
    solvedMaps: ["forestEdge", "forest", "forestDeep", "forestPack"],
  });
  const asked = [];
  const everywhere = (mapId) => {
    asked.push(mapId);
    return 24;
  };
  const result = catalogLines({ ...open, recordOf: everywhere });
  const rows = [...result.regions[0].rows, ...result.regions[0].solved.rows];
  assert.deepEqual(asked, ["forestLair"]);
  assert.deepEqual(
    rows.filter((row) => row.facts.some((fact) => fact.role === "text")),
    [rows[0]],
  );
  const none = {
    ...MAPS,
    forestLair: { ...MAPS.forestLair, recordCreature: undefined },
  };
  const unnamed = catalogLinesOf(none, REGIONS, {
    ...open,
    recordOf: () => 24,
  });
  assert.deepEqual(unnamed.regions[0].rows[0].facts, lairRow.facts);
});

// D-325: the counters decline by their number, as the counters of the screen Wiedza do (D-416): the open
// maps are „1 poznana”, „2 poznane”, „5 poznanych”, and after „z” the genitive, „z 1 poznanej”. The five
// maps give one to five open maps; the rule for 12 and 22 is the shared one, tested in counted-name.test.mjs.
// Catches a „1 poznanych” and a „z 1 poznanych”.
test("the counters of „Dokąd” and „Postęp” decline the open maps and the solved ones by their number", () => {
  // decision: D-416 "The counters of the screen decline by the number, as in loop: „1 poznana rzecz”, „3 poznane rzeczy”"
  const cases = [
    [[], "1 poznana · 0 rozwiązanych", "0 rozwiązanych z 1 poznanej"],
    [["forestEdge"], "2 poznane · 1 rozwiązana", "1 rozwiązana z 2 poznanych"],
    [
      ["forestEdge", "forest"],
      "3 poznane · 2 rozwiązane",
      "2 rozwiązane z 3 poznanych",
    ],
    [
      ["forestEdge", "forest", "forestDeep"],
      "4 poznane · 3 rozwiązane",
      "3 rozwiązane z 4 poznanych",
    ],
    [
      ["forestEdge", "forest", "forestDeep", "forestPack"],
      "5 poznanych · 4 rozwiązane",
      "4 rozwiązane z 5 poznanych",
    ],
  ];
  for (const [solvedMaps, dokad, postep] of cases) {
    assert.equal(catalogLines(input({ solvedMaps })).counter, dokad);
    assert.equal(
      catalogLines(input({ solvedMaps, view: "postep" })).counter,
      postep,
    );
  }
});
