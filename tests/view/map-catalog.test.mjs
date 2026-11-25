// The catalog of the screen Mapy (D-325, D-331, D-134, D-149) on jsdom through
// tests/view/page-document.mjs (D-264): the views, the search, the folding of the solved maps, the
// empty places, the sentence of nothing found, the picked row and the links of the rows. The lines the
// catalog draws are tested apart in catalog-lines.test.mjs; this file holds what the component adds:
// the state it keeps, what it draws from the lines, and what a click or a typed text changes. The
// expected values are written out by hand from the data of Las and its four maps. Real focus and
// rendering are the browser check's (D-88).
import { assert, inAct, press, typeInto, withPage } from "./page-document.mjs";
import { test } from "node:test";
import { createElement } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { MapCatalog } from "../../dist/browser/view/map-catalog.js";

const EDGE = ["forestEdge"];
const FOUR = ["forestEdge", "forest", "forestDeep", "forestPack"];

const all = (root, selector) => [...root.querySelectorAll(selector)];
const texts = (root, selector) =>
  all(root, selector).map((node) => node.textContent);
const names = (root) => texts(root, ".maps-catalog-name");
const tab = (root, label) =>
  all(root, ".maps-catalog-views button").find(
    (button) => button.textContent === label,
  );
const fold = (root) => root.querySelector(".maps-catalog-fold button");
const field = (root) => root.querySelector(".input-field input");

/** Mounts the catalog in the page's body; `draw` draws it again with other props, `unmount` takes it down. */
async function mount({ root }, props) {
  const host = root.ownerDocument.createElement("div");
  root.append(host);
  const reactRoot = createRoot(host);
  const draw = (next) =>
    inAct(() =>
      flushSync(() =>
        reactRoot.render(
          createElement(MapCatalog, { recordOf: () => null, ...next }),
        ),
      ),
    );
  await draw(props);
  return {
    draw,
    unmount: () => inAct(() => reactRoot.unmount()),
  };
}

// Catches a catalog that opens on another view, or tabs that do not say which one is picked (D-325).
test("the catalog opens on „Dokąd” among three tabs, with the search above them and the counter of the view under them", async () => {
  // decision: D-325 "The catalog groups the maps by their region, each region with a header and a counter of its solved maps over all its maps in the game's data, those not yet opened included, and offers a search that finds the open maps by a fragment of the name of the map or of a resource, and three views of one list, „Dokąd”, „Co daje” and „Postęp”, in the last of which a map not yet opened stands as an empty place with no name"
  await withPage(async (page) => {
    await mount(page, { solvedMaps: FOUR, selected: null });
    const catalog = page.root.querySelector(".maps-catalog");
    assert.deepEqual(
      [...catalog.children].map((child) => child.className.split(" ")[0]),
      [
        "input-field",
        "maps-catalog-views",
        "maps-catalog-counter",
        "maps-catalog-region",
      ],
      "the search, the tabs, the counter, then the regions",
    );
    assert.deepEqual(texts(page.root, ".maps-catalog-views button"), [
      "Dokąd",
      "Co daje",
      "Postęp",
    ]);
    assert.deepEqual(
      all(page.root, ".maps-catalog-views button").map((button) =>
        button.getAttribute("aria-pressed"),
      ),
      ["true", "false", "false"],
      "„Dokąd” is the one picked",
    );
    assert.equal(
      page.root.querySelector(".maps-catalog-views").classList.contains("tabs"),
      true,
      "the tabs stand in the container of the class tabs",
    );
    assert.equal(field(page.root).value, "", "the search opens empty");
    assert.equal(
      field(page.root).getAttribute("aria-label"),
      "Szukaj mapy albo zasobu",
    );
    assert.deepEqual(texts(page.root, ".maps-catalog-counter"), [
      "5 poznanych · 4 rozwiązane",
    ]);
    assert.deepEqual(texts(page.root, ".maps-catalog-region-header"), [
      "Las · 4 z 5",
    ]);
  });
});

// Catches a row that lacks one of its parts: the circle, the name, the facts, the icon of the creature.
test("a row holds the state circle, the name, the facts in their roles and the icon of the creature that attacks", async () => {
  // decision: D-331 "A row of the list is a link to `#/mapy/{map}` with the name of the map, the state circle of the map at its left, filled at a solved map and empty at an open one, and the short demand of the map"
  // decision: D-325 "A map whose data name a creature for the record shows the number of D-440 in its row."
  await withPage(async (page) => {
    await mount(page, { solvedMaps: FOUR, selected: null });
    const [lair] = all(page.root, ".maps-list-item");
    assert.equal(
      lair.querySelector(".maps-catalog-name").textContent,
      "Las — matecznik",
    );
    assert.equal(lair.querySelector(".maps-catalog-state").textContent, "○");
    assert.equal(
      lair.querySelector(".maps-catalog-facts").textContent,
      "10 h · 1 do pokonania · ⊘ wnosisz 0 · bez ognia 33 min",
      "the demand first, then what the map takes, then the terrain",
    );
    assert.deepEqual(
      texts(lair, ".maps-card-warning"),
      ["⊘ wnosisz 0"],
      "what the map takes stands in the element of the role warning",
    );
    assert.deepEqual(
      texts(lair, ".maps-catalog-fact"),
      ["10 h", "1 do pokonania", "⊘ wnosisz 0", "bez ognia 33 min"],
      "each fact is an element of its own, the separators outside, so a narrow row breaks between facts and never inside one",
    );
    assert.equal(
      lair.querySelector(".maps-catalog-state").classList.contains("solved"),
      false,
      "the circle of an open map is not marked solved",
    );
    assert.deepEqual(
      all(lair, ".icon-mask").map((icon) =>
        icon.style.getPropertyValue("--icon"),
      ),
      ['url("/icons/bear-head.svg")'],
      "the icon its data names, drawn as a mask",
    );
    assert.equal(lair.querySelector("img"), null, "no icon is a picture");
  });
});

// Catches a solved map that stands among the open ones, a fold that does not fold, and a fold that
// does not unfold (D-325). The folded row names how many maps it holds.
test("the solved maps of a region stand folded under one row, which unfolds them and folds them again", async () => {
  // decision: D-325 "The catalog groups the maps by their region, each region with a header and a counter of its solved maps over all its maps in the game's data, those not yet opened included, and offers a search that finds the open maps by a fragment of the name of the map or of a resource, and three views of one list, „Dokąd”, „Co daje” and „Postęp”, in the last of which a map not yet opened stands as an empty place with no name"
  await withPage(async (page) => {
    await mount(page, { solvedMaps: EDGE, selected: null });
    assert.deepEqual(names(page.root), ["Las"], "the open map alone");
    assert.equal(fold(page.root).textContent, "▸ 1 rozwiązana");
    assert.equal(fold(page.root).getAttribute("aria-expanded"), "false");
    await press(fold(page.root));
    assert.equal(fold(page.root).textContent, "▾ 1 rozwiązana");
    assert.equal(fold(page.root).getAttribute("aria-expanded"), "true");
    assert.deepEqual(names(page.root), ["Las", "Skraj lasu"]);
    await press(fold(page.root));
    assert.deepEqual(names(page.root), ["Las"], "folded again");
    assert.equal(fold(page.root).getAttribute("aria-expanded"), "false");
  });
});

// Catches a region that has nothing solved but shows a fold anyway, and a fold of one region that moves another.
test("a region with no solved map has no fold row", async () => {
  // decision: D-325 "The catalog groups the maps by their region, each region with a header and a counter of its solved maps over all its maps in the game's data, those not yet opened included, and offers a search that finds the open maps by a fragment of the name of the map or of a resource, and three views of one list, „Dokąd”, „Co daje” and „Postęp”, in the last of which a map not yet opened stands as an empty place with no name"
  await withPage(async (page) => {
    await mount(page, { solvedMaps: [], selected: null });
    assert.deepEqual(names(page.root), ["Skraj lasu"]);
    assert.equal(fold(page.root), null);
    assert.deepEqual(texts(page.root, ".maps-catalog-region-header"), [
      "Las · 0 z 5",
    ]);
  });
});

// Catches a view that is lost when the player looks at another, and a view that is kept after the screen is gone (D-325, To do 5).
test("the unfolded region survives a change of view and ends with the component", async () => {
  // decision: D-325 "The catalog groups the maps by their region, each region with a header and a counter of its solved maps over all its maps in the game's data, those not yet opened included, and offers a search that finds the open maps by a fragment of the name of the map or of a resource, and three views of one list, „Dokąd”, „Co daje” and „Postęp”, in the last of which a map not yet opened stands as an empty place with no name"
  // decision: D-325 "The view picked, the text typed and the regions unfolded in the catalog end with the screen"
  await withPage(async (page) => {
    const first = await mount(page, { solvedMaps: EDGE, selected: null });
    await press(fold(page.root));
    await press(tab(page.root, "Postęp"));
    assert.equal(fold(page.root), null, "no fold row in Postęp");
    await press(tab(page.root, "Dokąd"));
    assert.deepEqual(names(page.root), ["Las", "Skraj lasu"]);
    await typeInto(field(page.root), "las");
    await press(tab(page.root, "Postęp"));
    await first.unmount();
    assert.equal(page.root.querySelector(".maps-catalog"), null);
    // A catalog built anew is the screen entered anew: the first view, no text, every group folded.
    await mount(page, { solvedMaps: EDGE, selected: null });
    assert.equal(
      tab(page.root, "Dokąd").getAttribute("aria-pressed"),
      "true",
      "„Dokąd” is picked again",
    );
    assert.equal(field(page.root).value, "");
    assert.deepEqual(names(page.root), ["Las"], "the group is folded again");
  });
});

// Catches the empty places that carry a name, that are not counted, or that stay while a text is typed.
test("in „Postęp” each map not yet opened is an empty place with no name, and a typed text takes them away", async () => {
  // decision: D-149 "Before that the catalog shows no name and no row of the map: an empty place with no name stands for it in the view „Postęp”, and it counts in the counter of its region (D-325)."
  await withPage(async (page) => {
    await mount(page, { solvedMaps: EDGE, selected: null });
    await press(tab(page.root, "Postęp"));
    assert.equal(tab(page.root, "Postęp").getAttribute("aria-pressed"), "true");
    assert.equal(tab(page.root, "Dokąd").getAttribute("aria-pressed"), "false");
    assert.deepEqual(texts(page.root, ".maps-catalog-counter"), [
      "1 rozwiązana z 2 poznanych",
    ]);
    assert.deepEqual(
      texts(page.root, ".maps-catalog-region-header"),
      ["Las · 1 z 5"],
      "the counter counts the maps not yet opened too",
    );
    assert.deepEqual(names(page.root), ["Skraj lasu", "Las"]);
    const places = all(page.root, ".maps-catalog-empty-place");
    assert.equal(places.length, 3, "three maps of the region are not opened");
    assert.deepEqual(
      places.map((place) => place.textContent),
      ["", "", ""],
      "an empty place has no name and no text",
    );
    assert.deepEqual(
      places.map((place) => place.getAttribute("aria-hidden")),
      ["true", "true", "true"],
    );
    assert.equal(places[0].querySelector("a"), null, "and no link");
    await typeInto(field(page.root), "las");
    assert.equal(all(page.root, ".maps-catalog-empty-place").length, 0);
  });
});

// Catches the order of the groups of „Co daje” (the resource the fewest maps give first) and a group
// that lists a map the text does not name (D-325).
test("„Co daje” groups the open maps by resource, the rarest first, with the icon, the name and the count of each", async () => {
  // decision: D-325 "The catalog groups the maps by their region, each region with a header and a counter of its solved maps over all its maps in the game's data, those not yet opened included, and offers a search that finds the open maps by a fragment of the name of the map or of a resource, and three views of one list, „Dokąd”, „Co daje” and „Postęp”, in the last of which a map not yet opened stands as an empty place with no name"
  await withPage(async (page) => {
    await mount(page, { solvedMaps: EDGE, selected: null });
    await press(tab(page.root, "Co daje"));
    assert.deepEqual(texts(page.root, ".maps-catalog-counter"), [
      "4 zasoby w zasięgu",
    ]);
    assert.deepEqual(texts(page.root, ".maps-catalog-group-name"), [
      "mech",
      "włókno",
      "patyk",
      "jagoda",
    ]);
    assert.deepEqual(texts(page.root, ".maps-catalog-group-count"), [
      "1 mapa",
      "1 mapa",
      "2 mapy",
      "2 mapy",
    ]);
    const [moss] = all(page.root, ".maps-catalog-region");
    assert.deepEqual(
      all(moss, ".icon-mask").map((icon) =>
        icon.style.getPropertyValue("--icon"),
      ),
      ['url("/icons/fern.svg")'],
      "the icon of the resource",
    );
    // A group of two maps lists the solved one first, with the circle at its left.
    const [, , stick] = all(page.root, ".maps-catalog-region");
    assert.deepEqual(texts(stick, ".maps-catalog-name"), ["Skraj lasu", "Las"]);
    assert.deepEqual(texts(stick, ".maps-catalog-state"), ["●", "○"]);
    assert.deepEqual(
      texts(stick, ".maps-catalog-state.solved"),
      ["●"],
      "only the filled circle is marked solved",
    );
    assert.deepEqual(
      texts(all(stick, ".maps-list-item")[0], ".maps-catalog-fact"),
      ["≈ 16 z 16 · po 12", "+1 co 30 min"],
      "the stock of the resource at the map and its renewal are two facts of the row",
    );
    await typeInto(field(page.root), "mech");
    assert.deepEqual(
      texts(page.root, ".maps-catalog-group-name"),
      ["mech"],
      "a text naming a resource keeps its group alone",
    );
    assert.deepEqual(names(page.root), ["Las"]);
  });
});

// Catches a search that is case-sensitive or untrimmed, that finds no map by its resource, or that
// leaves the solved maps folded so the hit is hidden (D-325).
test("a typed text finds the open maps by the name of the map or of a resource, ignoring case and the spaces around it, and unfolds the solved ones", async () => {
  // decision: D-325 "The catalog groups the maps by their region, each region with a header and a counter of its solved maps over all its maps in the game's data, those not yet opened included, and offers a search that finds the open maps by a fragment of the name of the map or of a resource, and three views of one list, „Dokąd”, „Co daje” and „Postęp”, in the last of which a map not yet opened stands as an empty place with no name"
  await withPage(async (page) => {
    await mount(page, { solvedMaps: FOUR, selected: null });
    assert.deepEqual(names(page.root), ["Las — matecznik"]);
    await typeInto(field(page.root), "  WATA ");
    assert.deepEqual(names(page.root), ["Las — wataha"]);
    assert.equal(
      field(page.root).value,
      "  WATA ",
      "the field keeps what was typed",
    );
    await typeInto(field(page.root), "las");
    assert.deepEqual(
      names(page.root),
      ["Las — matecznik", "Skraj lasu", "Las", "Las — głębiej", "Las — wataha"],
      "the open map first, then the solved ones, which the text unfolds",
    );
    assert.equal(fold(page.root).getAttribute("aria-expanded"), "true");
    assert.equal(
      fold(page.root).disabled,
      true,
      "a fold that cannot fold stands disabled",
    );
    await typeInto(field(page.root), "mech");
    assert.equal(
      names(page.root).includes("Las"),
      true,
      "a map is found by the name of a resource it holds",
    );
    assert.equal(
      names(page.root).includes("Skraj lasu"),
      false,
      "and a map that holds none of it is not",
    );
    await typeInto(field(page.root), "");
    assert.deepEqual(names(page.root), ["Las — matecznik"]);
    assert.equal(fold(page.root).disabled, false);
    assert.equal(fold(page.root).getAttribute("aria-expanded"), "false");
  });
});

// Catches the sentence of nothing found missing, standing with the text untrimmed, or left after the text is cleared.
test("a text that finds nothing gives the sentence naming it, in every view, and clearing it brings the list back", async () => {
  // decision: D-325 "The catalog groups the maps by their region, each region with a header and a counter of its solved maps over all its maps in the game's data, those not yet opened included, and offers a search that finds the open maps by a fragment of the name of the map or of a resource, and three views of one list, „Dokąd”, „Co daje” and „Postęp”, in the last of which a map not yet opened stands as an empty place with no name"
  await withPage(async (page) => {
    await mount(page, { solvedMaps: EDGE, selected: null });
    for (const label of ["Dokąd", "Postęp", "Co daje"]) {
      await press(tab(page.root, label));
      await typeInto(field(page.root), " xyz ");
      assert.deepEqual(
        texts(page.root, ".maps-catalog-none"),
        ["Nic nie pasuje do „xyz”."],
        label,
      );
      assert.equal(all(page.root, ".maps-list-item").length, 0, label);
      assert.equal(all(page.root, ".maps-catalog-region").length, 0, label);
      await typeInto(field(page.root), "");
      assert.equal(all(page.root, ".maps-catalog-none").length, 0, label);
      assert.notEqual(all(page.root, ".maps-list-item").length, 0, label);
    }
  });
});

// Catches a picked row that is not marked, two rows marked, and a mark that stays after the pick goes.
test("the row of the picked map is the one marked, in every view", async () => {
  // decision: D-331 "A row of the list is a link to `#/mapy/{map}` with the name of the map, the state circle of the map at its left, filled at a solved map and empty at an open one, and the short demand of the map, and the picked row looks as the picked program on the list of programs does"
  await withPage(async (page) => {
    const { draw } = await mount(page, {
      solvedMaps: EDGE,
      selected: "forest",
    });
    const marked = () =>
      all(page.root, "[aria-current]").map((row) => [
        row.getAttribute("aria-current"),
        row.getAttribute("href"),
      ]);
    assert.deepEqual(marked(), [["page", "#/mapy/forest"]]);
    await press(tab(page.root, "Postęp"));
    assert.deepEqual(marked(), [["page", "#/mapy/forest"]]);
    await press(tab(page.root, "Co daje"));
    assert.deepEqual(
      marked(),
      [
        ["page", "#/mapy/forest"],
        ["page", "#/mapy/forest"],
        ["page", "#/mapy/forest"],
        ["page", "#/mapy/forest"],
      ],
      "in „Co daje” the map stands once under each resource it holds",
    );
    await press(tab(page.root, "Dokąd"));
    await draw({ solvedMaps: EDGE, selected: null });
    assert.deepEqual(marked(), [], "no pick, no mark");
  });
});

// Catches a picked solved map whose neighbours stay folded, so its row is not seen, an open picked map that
// holds the fold open and disabled so the player cannot fold it, and a pick stored as the player's choice (D-331).
test("a picked solved map unfolds its group so that its row is seen, while a picked open map leaves the fold to the player, and no pick is stored", async () => {
  // decision: D-331 "A row of the list is a link to `#/mapy/{map}` with the name of the map, the state circle of the map at its left, filled at a solved map and empty at an open one, and the short demand of the map, and the picked row looks as the picked program on the list of programs does: its text in `text-strong` and a bar in `selected` at its left."
  await withPage(async (page) => {
    const { draw } = await mount(page, {
      solvedMaps: EDGE,
      selected: "forestEdge",
    });
    assert.deepEqual(
      names(page.root),
      ["Las", "Skraj lasu"],
      "the solved picked map is seen",
    );
    const picked = all(page.root, "[aria-current]");
    assert.deepEqual(
      picked.map((row) => row.querySelector(".maps-catalog-name").textContent),
      ["Skraj lasu"],
    );
    assert.equal(fold(page.root).getAttribute("aria-expanded"), "true");
    assert.equal(
      fold(page.root).disabled,
      true,
      "the fold that would hide the picked row stands disabled",
    );
    await draw({ solvedMaps: EDGE, selected: "forest" });
    assert.deepEqual(
      names(page.root),
      ["Las"],
      "a picked open map does not unfold the solved ones",
    );
    assert.equal(fold(page.root).disabled, false, "the fold works");
    await press(fold(page.root));
    assert.deepEqual(names(page.root), ["Las", "Skraj lasu"], "it unfolds");
    await press(fold(page.root));
    assert.deepEqual(names(page.root), ["Las"], "and folds again");
    await draw({ solvedMaps: EDGE, selected: "forestEdge" });
    assert.deepEqual(names(page.root), ["Las", "Skraj lasu"]);
    await draw({ solvedMaps: EDGE, selected: null });
    assert.deepEqual(names(page.root), ["Las"], "the unfolding was not stored");
    assert.equal(fold(page.root).disabled, false);
  });
});

// Catches a row that is no link, or a link to another address than the map's own (D-331, D-332), in every view.
test("every row, of every view, is a link to the address of its map", async () => {
  // decision: D-331 "A row of the list is a link to `#/mapy/{map}` with the name of the map"
  // decision: D-332 "In `#/mapy/{map}`, {map} is the identifier of the map in the game's data as it stands, such as `#/mapy/forestDeep`, and the address is built from the map's data."
  await withPage(async (page) => {
    await mount(page, { solvedMaps: FOUR, selected: "forestDeep" });
    const hrefs = () =>
      all(page.root, ".maps-list-item").map((row) => [
        row.tagName,
        row.getAttribute("href"),
      ]);
    assert.deepEqual(hrefs(), [
      ["A", "#/mapy/forestLair"],
      ["A", "#/mapy/forestEdge"],
      ["A", "#/mapy/forest"],
      ["A", "#/mapy/forestDeep"],
      ["A", "#/mapy/forestPack"],
    ]);
    await press(tab(page.root, "Postęp"));
    assert.deepEqual(
      hrefs().map(([, href]) => href),
      [
        "#/mapy/forestEdge",
        "#/mapy/forest",
        "#/mapy/forestDeep",
        "#/mapy/forestPack",
        "#/mapy/forestLair",
      ],
      "in the data's order",
    );
    await press(tab(page.root, "Co daje"));
    assert.ok(
      hrefs().every(
        ([tag, href]) => tag === "A" && /^#\/mapy\/[A-Za-z]+$/.test(href),
      ),
    );
    assert.ok(hrefs().length > 5, "a map stands under each resource it holds");
  });
});

// D-325, D-440: the row of the lair draws the record as a fact of its own in the role text, in „Dokąd”
// and „Postęp”, and the rows of „Co daje” draw none; a new record shows at the next draw. Catches a
// record drawn in the wrong view, outside the facts' element, or in no element of its own.
test("the record is drawn among the facts of the lair's row in „Dokąd” and „Postęp”, in an element of its own, and not in „Co daje”; a new number shows at the next draw", async () => {
  // decision: D-325 "A map whose data name a creature for the record shows the number of D-440 in its row."
  await withPage(async (page) => {
    let held = 24;
    const props = { solvedMaps: FOUR, selected: null };
    const { draw } = await mount(page, { ...props, recordOf: () => held });
    const records = () => texts(page.root, ".maps-catalog-record");
    const lair = () => all(page.root, ".maps-list-item")[0];
    assert.deepEqual(records(), ["niedźwiedź: 24 ze 120"]);
    assert.deepEqual(
      texts(lair(), ".maps-catalog-fact").at(-1),
      "niedźwiedź: 24 ze 120",
      "the last fact of the row, in the facts' element",
    );
    assert.equal(
      lair().querySelector(".maps-catalog-record").parentElement.parentElement
        .className,
      "maps-catalog-facts",
    );
    held = 30;
    await draw({ ...props, recordOf: () => held });
    assert.deepEqual(records(), ["niedźwiedź: 30 ze 120"]);
    await press(tab(page.root, "Postęp"));
    assert.deepEqual(records(), ["niedźwiedź: 30 ze 120"]);
    await press(tab(page.root, "Co daje"));
    assert.deepEqual(records(), [], "the rows of „Co daje” hold no record");
    held = null;
    await draw({ ...props, recordOf: () => held });
    await press(tab(page.root, "Dokąd"));
    assert.deepEqual(records(), []);
  });
});
