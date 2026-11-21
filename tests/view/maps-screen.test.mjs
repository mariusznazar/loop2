// The screen Mapy (D-325 to D-331, D-134, D-149, D-170, D-188, D-217, D-243, D-244, D-274,
// D-282, D-287, D-326, D-439, D-440) on jsdom through tests/view/page-document.mjs (D-264): the list
// of open maps, the area on the right with no map named and with one, the card of a map from the
// data, the section „Kto idzie” with each character's lines and buttons, what the buttons hand the
// page, and the judging of a program: its button, its result and the mark beside the list „Program:”.
// Real focus order and rendering are the browser check's (D-88), so a focus case here holds only
// what jsdom shows.
import { assert, fire, inAct, press, withPage } from "./page-document.mjs";
import { gameStylesheetText } from "./game-stylesheets.mjs";
import { test } from "node:test";
import { createElement } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import {
  advanceMinutes,
  createCharacter,
  newGame,
  send,
  setPaused,
} from "../../dist/browser/sim/game.js";
import { createProgram } from "../../dist/browser/sim/programs.js";
import { createMapsEntry } from "../../dist/browser/view/maps-entry.js";
import { createMapsScreen } from "../../dist/browser/view/maps-screen.js";
import { withEdgeSolved } from "../sim/understanding-fixture.mjs";

// --- the page ------------------------------------------------------------------------------

const NOW = 1_800_000_000_000;
const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const WARNING = " — śmierć zabierze wprawę i wykupione stopnie";
const RUN_SENTENCE =
  "Przejście na mapie Las jest niezakończone. Wróć do niego i je zakończ, żeby wysłać postać.";

/** A new game whose team holds the named characters, numbered from 1 in the order given. */
function newTeamOf(...names) {
  let state = newGame();
  for (const name of names) state = createCharacter(state, name).state;
  return state;
}

/** The same game with the first map, Skraj lasu, solved, which opens Las. */
function teamOf(...names) {
  return withEdgeSolved(newTeamOf(...names));
}

/** The state with Las solved, the one map that opens Las — głębiej. */
const solved = (state) => ({ ...state, solvedMaps: ["forestEdge", "forest"] });

/** The state with the trip plan of the program at `index` of the list replaced. */
function withPlan(state, tripPlan, index = 0) {
  return {
    ...state,
    programs: state.programs.map((saved, at) =>
      at === index
        ? { ...saved, program: { ...saved.program, tripPlan } }
        : saved,
    ),
  };
}

/** The state with the pieces the chest holds replaced. */
const withChest = (state, pieces) => ({
  ...state,
  team: { ...state.team, chest: { ...state.team.chest, pieces } },
});

/**
 * `state` with the team's resurrection spent by `usesSpent` uses, the next of them returning at the
 * real moment `nextReturnAtMs` (null where none is spent).
 */
const withUses = (state, usesSpent, nextReturnAtMs) => ({
  ...state,
  team: {
    ...state.team,
    resurrectionUsesSpent: usesSpent,
    resurrectionNextReturnAtMs: nextReturnAtMs,
  },
});

const LOOP = {
  runNumber: 3,
  completed: 2,
  run: { mapId: "forest", minute: 212 },
};

const propsOf = (state, mapId = null, nowMs = NOW) => ({ state, nowMs, mapId });

/**
 * Builds the screen in the page's body. `calls` lists what the screen handed the page; `reaction`
 * names a function per control that runs after the call is recorded, as the page's answer does.
 */
async function mount({ root }, props, reaction = {}) {
  const calls = [];
  let screen = null;
  const controls = Object.fromEntries(
    ["pick", "enter", "startLoop", "stop", "judge"].map((name) => [
      name,
      (...values) => {
        calls.push([name, ...values]);
        return reaction[name]?.(screen, ...values);
      },
    ]),
  );
  await inAct(() => {
    screen = createMapsScreen({ controls, props });
    root.append(screen.element);
  });
  return { screen, calls };
}

const all = (root, selector) => [...root.querySelectorAll(selector)];
const text = (root, selector) => root.querySelector(selector)?.textContent;
const texts = (root, selector) =>
  all(root, selector).map((node) => node.textContent);
const buttonLabelled = (root, label) =>
  all(root, "button").find(
    (button) => button.getAttribute("aria-label") === label,
  );
/** The classes an element has, the first of each child's, in the order the children stand. */
const kinds = (element) =>
  [...element.children].map((child) => child.className.split(" ")[0]);
/** The part of the card under the name given, such as „Teren”. */
const part = (root, name) =>
  all(root, ".maps-card-part").find(
    (candidate) =>
      candidate.querySelector(".maps-card-part-name").textContent === name,
  );
const members = (root) => all(root, ".maps-who-member");

/** A game where a manual map run of character 1 on Las waits in a pause. */
function waitingRun(state) {
  return setPaused(
    send(state, { mapId: "forest", characterId: 1 }, 1).state,
    true,
  ).state;
}

/** A game where the manual map run of character 1 on Las has ended in death and waits for „Zakończ”. */
function endedRun(state) {
  let ended = send(state, { mapId: "forest", characterId: 1 }, 1).state;
  for (let round = 0; round < 10 && ended.run.death === null; round += 1) {
    if (ended.paused) ended = setPaused(ended, false).state;
    ended = advanceMinutes(ended, 300).state;
  }
  assert.ok(
    ended.run.death !== null,
    "precondition: the map run ended in death",
  );
  return ended;
}

// --- the list and the right area -----------------------------------------------------------

// D-331, D-149: nothing is picked under #/mapy, and a map whose opener is unsolved is not listed:
// a new game lists Skraj lasu alone.
test("with no map named the list holds the open maps alone and the right area says to pick from it", async () => {
  // decision: D-325 "The screen Mapy holds on the left the list of the maps open to the player"
  // decision: D-331 "Under `#/mapy`, before the player picks a map, „Wybierz mapę z listy.” stands on the right"
  // decision: D-397 "A new game opens the map Skraj lasu, and solving it opens Las"
  // decision: D-388 "Las is a grid of 4 × 4 tiles"
  // decision: D-149 "A map whose opening map is still unsolved is absent from the screen Mapy, and from the opening map’s first completion it stands there with its card for every character"
  // decision: D-134 "From the first completion of a map by any of the player's characters, the list and the card on the screen Mapy show that map as „rozwiązana”"
  await withPage(async (page) => {
    const { screen } = await mount(page, propsOf(newTeamOf("Ala")));
    assert.deepEqual(texts(page.root, ".maps-list-item"), ["Skraj lasu"]);
    assert.equal(
      text(page.root, ".maps-card-area"),
      "Wybierz mapę z listy.",
      "the right area holds the sentence and nothing else",
    );
    assert.ok(
      page.root.querySelector(".maps-card-empty"),
      "the sentence stands in its own element",
    );
    assert.equal(page.root.querySelector(".maps-card"), null);
    assert.equal(page.root.querySelector(".maps-who"), null);
    assert.equal(
      page.root.querySelector("[aria-current]"),
      null,
      "no row is marked",
    );
    await inAct(() => screen.update(propsOf(teamOf("Ala"))));
    assert.deepEqual(texts(page.root, ".maps-list-item"), [
      "Skraj lasurozwiązana",
      "Las",
    ]);
    await inAct(() => screen.update(propsOf(solved(teamOf("Ala")))));
    assert.deepEqual(texts(page.root, ".maps-list-item"), [
      "Skraj lasurozwiązana",
      "Lasrozwiązana",
      "Las — głębiej",
    ]);
  });
});

// D-134, D-331, D-282: a row is a link to the map's address from the data, the solved mark stands
// after the name, and the row of the map named is the one marked.
test("a row is a link to the map's address, a solved map says so after its name and the map named is the marked row", async () => {
  // decision: D-281 "An address names a screen in the fragment after `#`"
  // decision: D-331 "A row of the list is a link to `#/mapy/{map}` with the name of the map"
  // decision: D-332 "In `#/mapy/{map}`, {map} is the identifier of the map in the game's data as it stands"
  // decision: D-134 "From the first completion of a map by any of the player's characters, the list and the card on the screen Mapy show that map as „rozwiązana”"
  await withPage(async (page) => {
    const { screen } = await mount(
      page,
      propsOf(solved(teamOf("Ala")), "forestDeep"),
    );
    const rows = all(page.root, ".maps-list-item");
    assert.deepEqual(
      rows.map((row) => row.getAttribute("href")),
      ["#/mapy/forestEdge", "#/mapy/forest", "#/mapy/forestDeep"],
    );
    assert.deepEqual(
      rows.map((row) => row.querySelector(".maps-list-solved")?.textContent),
      ["rozwiązana", "rozwiązana", undefined],
      "a solved map has the mark and an unsolved map has none",
    );
    assert.equal(rows[0].getAttribute("aria-current"), null);
    assert.equal(rows[1].getAttribute("aria-current"), null);
    assert.equal(rows[2].getAttribute("aria-current"), "page");
    assert.equal(all(page.root, "[aria-current]").length, 1);
    assert.equal(
      page.root.querySelector(".maps-card-empty"),
      null,
      "with a map named the sentence is gone",
    );
    await inAct(() => screen.update(propsOf(solved(teamOf("Ala")), "forest")));
    assert.equal(
      all(page.root, ".maps-list-item")[1].getAttribute("aria-current"),
      "page",
    );
  });
});

// A map off the list is no map the screen draws a card for, since sending to it is refused (D-149).
test("a map named whose opener is unsolved draws no card", async () => {
  // decision: D-397 "A new game opens the map Skraj lasu, and solving it opens Las"
  // decision: D-388 "Las is a grid of 4 × 4 tiles"
  // decision: D-149 "A map whose opening map is still unsolved is absent from the screen Mapy, and from the opening map’s first completion it stands there with its card for every character"
  await withPage(async (page) => {
    const { screen } = await mount(page, propsOf(teamOf("Ala"), "forestDeep"));
    assert.equal(page.root.querySelector(".maps-card"), null);
    assert.equal(text(page.root, ".maps-card-empty"), "Wybierz mapę z listy.");
    await inAct(() => screen.update(propsOf(newTeamOf("Ala"), "forest")));
    assert.equal(page.root.querySelector(".maps-card"), null);
    assert.equal(text(page.root, ".maps-card-empty"), "Wybierz mapę z listy.");
  });
});

// --- the card ------------------------------------------------------------------------------

// D-327: the card of Skraj lasu, the map a new game opens on, with sticks and berries alone: no
// opener, no „Czyha”, no „Odbiera”.
test("the card of Skraj lasu holds its heading, what it asks, its terrain and its sticks and berries alone", async () => {
  // decision: D-325 "The screen Mapy holds on the left the list of the maps open to the player"
  // decision: D-327 "The card of a map follows the card of the predecessor game"
  // decision: D-327 "It departs from the card of the predecessor game in four things only"
  // decision: D-328 "The card of a map shows all that the map's data holds, whatever the player has discovered, and the Understanding does not change by it"
  // decision: D-133 "The card of each open map shows the sentence of its solving condition from the map's data"
  await withPage(async (page) => {
    await mount(page, propsOf(newTeamOf("Ala"), "forestEdge"));
    assert.equal(text(page.root, ".maps-card-name"), "Skraj lasu");
    assert.equal(page.root.querySelector(".maps-card-solved"), null);
    assert.equal(page.root.querySelector(".maps-card-opened-by"), null);
    assert.deepEqual(texts(page.root, ".maps-card-part-name"), [
      "Żąda",
      "Teren",
      "Leży tu",
    ]);
    assert.deepEqual(texts(part(page.root, "Żąda"), "p"), [
      "Skraj lasu — 480 minut bez utraty zdrowia od zimna i głodu i bez zmiany programu",
    ]);
    assert.deepEqual(texts(part(page.root, "Teren"), "li"), [
      "siatka 4 × 4",
      "wejście stałe",
      "krok 5 min",
      "bez ognia 83 min — otoczenie 25 °C",
    ]);
    assert.deepEqual(texts(part(page.root, "Leży tu"), "li"), [
      "patyk — ≈ 16 z 16 kafelków, po 12, +1 co 30 min",
      "jagoda — ≈ 16 z 16 kafelków, po 8, +1 co 40 min",
    ]);
  });
});

// D-327: the card of Las, an unsolved Las with neither „Czyha” nor „Odbiera”, which Skraj lasu opens.
test("the card of Las holds its heading, what it asks, its terrain and what lies there, and no part Las lacks", async () => {
  // decision: D-43 "None is `0`, a percentage, a size in `fr`, `vw` or `vh`, a keyword such as `transparent`, `currentColor`, `inherit` or `none`, a screen-width threshold of an `@media` rule, the geometry of the terrain drawing or of the scene computed in TypeScript, the frames and positions of a sprite, the `width` and `height` attributes of an image, a layout dimension — a width or height with its minimum and maximum, or the sizes of the columns of a layout grid — or the content of an icon file in `assets/icons/`, which is drawn as a mask and takes its colour from the text beside it or, where no text stands beside it — in the badge over the mage's head, on the plaque of the icon flying to the mage and in the drawing of the map — from `text-strong`"
  // decision: D-325 "The screen Mapy holds on the left the list of the maps open to the player"
  // decision: D-327 "The card of a map follows the card of the predecessor game"
  // decision: D-327 "It departs from the card of the predecessor game in four things only"
  // decision: D-328 "The card of a map shows all that the map's data holds, whatever the player has discovered, and the Understanding does not change by it"
  // decision: D-133 "The card of each open map shows the sentence of its solving condition from the map's data"
  await withPage(async (page) => {
    await mount(page, propsOf(teamOf("Ala"), "forest"));
    assert.equal(text(page.root, ".maps-card-name"), "Las");
    assert.equal(page.root.querySelector(".maps-card-solved"), null);
    assert.equal(
      text(page.root, ".maps-card-opened-by"),
      "odsłania ją Skraj lasu",
    );
    assert.deepEqual(texts(page.root, ".maps-card-part-name"), [
      "Żąda",
      "Teren",
      "Leży tu",
    ]);
    assert.deepEqual(texts(part(page.root, "Żąda"), "p"), [
      "Las — 480 minut bez utraty zdrowia od zimna i głodu i bez zmiany programu",
    ]);
    assert.deepEqual(texts(part(page.root, "Teren"), "li"), [
      "siatka 4 × 4",
      "wejście stałe",
      "krok 5 min",
      "bez ognia 83 min — otoczenie 25 °C",
    ]);
    const lying = part(page.root, "Leży tu");
    assert.deepEqual(texts(lying, "li"), [
      "patyk — ≈ 11 z 16 kafelków, po 12, +1 co 30 min",
      "jagoda — ≈ 8 z 16 kafelków, po 8, +1 co 40 min",
      "mech — ≈ 6 z 16 kafelków, po 6, +1 co 60 min",
      "włókno — ≈ 6 z 16 kafelków, po 6, +1 co 60 min",
    ]);
    // Each resource has the icon its data names, drawn as the mask of the file at the icons'
    // address, in the colour of the text beside it, and as no picture of the file.
    assert.deepEqual(
      all(lying, ".icon-mask").map((icon) =>
        icon.style.getPropertyValue("--icon"),
      ),
      [
        'url("/icons/wood-stick.svg")',
        'url("/icons/berry-bush.svg")',
        'url("/icons/fern.svg")',
        'url("/icons/flax.svg")',
      ],
    );
    assert.equal(lying.querySelector("img"), null, "no icon is a picture");
  });
});

// D-327, D-328: a solved Las shows the mark, and Las — głębiej shows its opener, the wolf and the
// one total number, to a player whose Understanding holds no wolf.
test("the card of Las — głębiej names its opener, shows the wolf and the mean gap, and the Understanding stays as it was", async () => {
  // decision: D-325 "The screen Mapy holds on the left the list of the maps open to the player"
  // decision: D-327 "The card of a map follows the card of the predecessor game"
  // decision: D-327 "It departs from the card of the predecessor game in four things only"
  // decision: D-328 "The card of a map shows all that the map's data holds, whatever the player has discovered, and the Understanding does not change by it"
  // decision: D-134 "From the first completion of a map by any of the player's characters, the list and the card on the screen Mapy show that map as „rozwiązana”"
  // decision: D-149 "A map whose opening map is still unsolved is absent from the screen Mapy, and from the opening map’s first completion it stands there with its card for every character"
  await withPage(async (page) => {
    const state = solved(teamOf("Ala"));
    const understanding = JSON.stringify(state.understanding);
    const { screen } = await mount(page, propsOf(state, "forest"));
    assert.equal(text(page.root, ".maps-card-solved"), "rozwiązana");
    // The marks follow the name joined by „ · ” (D-327), as the old Loop joins them.
    assert.equal(
      text(page.root, ".maps-card-heading"),
      "Las · rozwiązana · odsłania ją Skraj lasu",
    );
    await inAct(() => screen.update(propsOf(state, "forestDeep")));
    assert.equal(text(page.root, ".maps-card-name"), "Las — głębiej");
    assert.equal(
      text(page.root, ".maps-card-heading"),
      "Las — głębiej · odsłania ją Las",
    );
    assert.equal(text(page.root, ".maps-card-opened-by"), "odsłania ją Las");
    assert.equal(page.root.querySelector(".maps-card-solved"), null);
    assert.deepEqual(texts(page.root, ".maps-card-part-name"), [
      "Żąda",
      "Teren",
      "Leży tu",
      "Czyha",
    ]);
    assert.deepEqual(texts(part(page.root, "Teren"), "li"), [
      "siatka 5 × 5",
      "wejście losowe",
      "krok 5 min",
      "bez ognia 33 min — otoczenie 7 °C",
    ]);
    assert.equal(
      texts(part(page.root, "Leży tu"), "li")[0],
      "patyk — ≈ 18 z 25 kafelków, po 12, +1 co 30 min",
    );
    const lurking = part(page.root, "Czyha");
    assert.equal(
      text(lurking, ".maps-card-attacker-head"),
      "wilk · 24 zdrowia · cios 7",
    );
    assert.equal(
      text(lurking, ".maps-card-attacker-odds"),
      "1 % szansy na minutę, 180 min spokoju od wejścia i po każdej walce — średnio co ≈ 280 min",
    );
    // The creature stands with the icon its data names, drawn as a mask like a resource's icon.
    assert.deepEqual(
      all(lurking, ".icon-mask").map((icon) =>
        icon.style.getPropertyValue("--icon"),
      ),
      ['url("/icons/wolf-head.svg")'],
    );
    assert.equal(lurking.querySelector("img"), null, "no icon is a picture");
    assert.equal(
      JSON.stringify(state.understanding),
      understanding,
      "drawing the card writes nothing into the Understanding",
    );
  });
});

// D-327: the parts that no map of the data reaches today still stand in their roles when a map
// reaches them. The case changes the data of the two maps for its length and restores them.
test("a step other than the usual one, a resource that does not renew and the entry and exit caps stand in their roles", async () => {
  // decision: D-325 "The screen Mapy holds on the left the list of the maps open to the player"
  // decision: D-327 "The card of a map follows the card of the predecessor game"
  // decision: D-328 "The card of a map shows all that the map's data holds, whatever the player has discovered, and the Understanding does not change by it"
  const copies = Object.entries(MAPS).map(([id, map]) => [
    id,
    structuredClone(map),
  ]);
  try {
    MAPS.forestDeep.stepMinutes = 10;
    delete MAPS.forest.resources[0].renewMinutes;
    MAPS.forest.carryIn = 5;
    MAPS.forest.carryOut = 3;
    await withPage(async (page) => {
      const { screen } = await mount(
        page,
        propsOf(solved(teamOf("Ala")), "forest"),
      );
      const renewal = all(part(page.root, "Leży tu"), "li")[0];
      assert.equal(
        renewal.textContent,
        "patyk — ≈ 11 z 16 kafelków, po 12, nie odnawia się",
      );
      assert.equal(
        renewal.querySelector(".maps-card-warning").textContent,
        "nie odnawia się",
        "the words that say it does not renew stand in the element of the role warning",
      );
      assert.equal(
        all(part(page.root, "Leży tu"), "li")[1].querySelector(
          ".maps-card-warning",
        ),
        null,
        "a resource that renews has no such element",
      );
      assert.deepEqual(
        texts(part(page.root, "Odbiera"), ".maps-card-warning"),
        ["wnosisz najwyżej 5", "wynosisz najwyżej 3"],
      );
      await inAct(() =>
        screen.update(propsOf(solved(teamOf("Ala")), "forestDeep")),
      );
      const step = all(part(page.root, "Teren"), "li")[2];
      assert.equal(step.textContent, "krok 10 min — drożej niż zwykle");
      assert.equal(
        step.querySelector(".maps-card-note").textContent,
        " — drożej niż zwykle",
      );
      assert.equal(
        part(page.root, "Odbiera"),
        undefined,
        "a map with no cap has no part „Odbiera”",
      );
    });
  } finally {
    for (const [id, copy] of copies) {
      for (const key of Object.keys(MAPS[id])) delete MAPS[id][key];
      Object.assign(MAPS[id], copy);
    }
  }
});

// --- „Kto idzie” -----------------------------------------------------------------------------

// D-329: the sentence of an empty team stands under the heading.
test("a team with no character reads the sentence under the heading of „Kto idzie”", async () => {
  // decision: D-329 "A team with no character has in the section the sentence"
  // decision: D-51 "A new game starts with an empty team, and the player creates the first character in the headquarters before sending any character to a game map"
  await withPage(async (page) => {
    await mount(page, propsOf(withEdgeSolved(newGame()), "forest"));
    assert.equal(text(page.root, ".maps-who-heading"), "Kto idzie");
    assert.equal(
      text(page.root, ".maps-who-empty"),
      "Drużyna nie ma jeszcze postaci. Załóż ją w Siedzibie.",
    );
    assert.deepEqual(members(page.root), []);
  });
});

// D-54, D-329, D-217, D-170: the characters stand in the order of their creation, and each one's
// lines stand from the top in the order D-329 gives.
test("the characters stand in the order of their creation, each with its lines from the top", async () => {
  // decision: D-325 "The screen Mapy holds on the left the list of the maps open to the player"
  // decision: D-329 "At each character in the section „Kto idzie” stand, from the top, the name as a link to the screen Postać"
  // decision: D-170 "The player picks the program a character enters a map with on the select list beside the label „Program:”, whose options are the names of the player's programs, at that character in the section „Kto idzie” of the card of a map"
  // decision: D-180 "The card of a map shows what of the plan enters"
  // decision: D-54 "The characters of the team stand on its list in the order they were created"
  // decision: D-217 "The card and the screen of a character, and that character in the section „Kto idzie” of the card of a map, show, from its creation, „Wskrzeszenie drużyny: użycia {u} z {c}” in `text-secondary` while the stock of uses is full, „Wskrzeszenie drużyny: użycia {u} z {c}, następne za {g} godz. {m} min czasu realnego” in `text-secondary` while the stock is not full and a use is left, and „Wskrzeszenie drużyny: użycia 0 z {c}, następne za {g} godz. {m} min czasu realnego — śmierć zabierze wprawę i wykupione stopnie” in `danger` at zero uses, the count {c} coming from the balance data and the time reading „następne za {m} min czasu realnego” below one hour."
  // decision: D-243 "The player starts an earning loop with „Puść w pętlę”, which stands at each character in the section „Kto idzie” of the card of each solved map, beside „Wejdź”"
  await withPage(async (page) => {
    const state = solved(
      withChest(
        withPlan(teamOf("Ala", "Bob"), {
          take: [
            { item: "stick", count: 6 },
            { item: "berry", count: 4 },
          ],
          bring: [{ item: "stick", count: 1 }],
        }),
        { stick: 10, berry: 10 },
      ),
    );
    await mount(page, propsOf(state, "forest"));
    assert.deepEqual(texts(page.root, ".maps-who-name"), ["Ala", "Bob"]);
    assert.deepEqual(
      all(page.root, ".maps-who-name").map((link) => link.getAttribute("href")),
      ["#/postac/1", "#/postac/2"],
    );
    const [ala] = members(page.root);
    assert.deepEqual(kinds(ala), [
      "maps-who-name",
      "maps-who-resurrection",
      "maps-who-program",
      "maps-who-enters",
      "maps-who-actions",
    ]);
    assert.equal(
      text(ala, ".maps-who-resurrection"),
      "Wskrzeszenie drużyny: użycia 3 z 3",
    );
    assert.equal(
      ala.querySelector(".maps-who-resurrection").classList.contains("danger"),
      false,
    );
    assert.equal(text(ala, ".maps-who-program-label"), "Program:");
    assert.equal(text(ala, ".maps-who-enters"), "Wejdzie: patyk 6, jagoda 4");
    // The button of a judging stands in the row of the buttons, between „Wejdź” and „Puść w pętlę”
    // (D-329); the case held the two sending buttons alone before it.
    assert.deepEqual(kinds(ala.querySelector(".maps-who-actions")), [
      "maps-who-enter",
      "maps-who-judge",
      "maps-who-loop-start",
    ]);
  });
});

// D-217, D-190: the team's resurrection at zero uses reads the time to the next use in danger at every
// character, and once a use returns it reads the uses left in text-secondary with the next return.
test("a resurrection at zero uses reads the time to the next use in danger at each character, and a returned use turns it to text-secondary", async () => {
  // decision: D-329 "At each character in the section „Kto idzie” stand, from the top, the name as a link to the screen Postać"
  // decision: D-217 "The card and the screen of a character, and that character in the section „Kto idzie” of the card of a map, show, from its creation, „Wskrzeszenie drużyny: użycia {u} z {c}” in `text-secondary` while the stock of uses is full, „Wskrzeszenie drużyny: użycia {u} z {c}, następne za {g} godz. {m} min czasu realnego” in `text-secondary` while the stock is not full and a use is left, and „Wskrzeszenie drużyny: użycia 0 z {c}, następne za {g} godz. {m} min czasu realnego — śmierć zabierze wprawę i wykupione stopnie” in `danger` at zero uses, the count {c} coming from the balance data and the time reading „następne za {m} min czasu realnego” below one hour."
  await withPage(async (page) => {
    // All three uses spent; the first returns in 8 hours, each next one 4 hours after the one before.
    const state = withUses(teamOf("Ala", "Bob"), 3, NOW + 8 * HOUR);
    const { screen } = await mount(page, propsOf(state, "forest"));
    const lines = () => all(page.root, ".maps-who-resurrection");
    assert.equal(
      lines()[0].textContent,
      `Wskrzeszenie drużyny: użycia 0 z 3, następne za 8 godz. 0 min czasu realnego${WARNING}`,
    );
    assert.ok(lines()[0].classList.contains("danger"));
    assert.equal(lines()[1].textContent, lines()[0].textContent);
    assert.ok(lines()[1].classList.contains("danger"));
    // At 9 hours one use has returned, so the next returns 12 hours from the start: 3 hours on.
    await inAct(() => screen.update(propsOf(state, "forest", NOW + 9 * HOUR)));
    for (const line of lines()) {
      assert.equal(
        line.textContent,
        "Wskrzeszenie drużyny: użycia 1 z 3, następne za 3 godz. 0 min czasu realnego",
      );
      assert.equal(line.classList.contains("danger"), false);
    }
  });
});

// D-170: the list shows the program of the row, in the list's order, and a change hands the page
// the character and the program picked.
test("the list „Program:” shows the program of the row in the order of the player's list and a change hands the page the pick", async () => {
  // decision: D-329 "At each character in the section „Kto idzie” stand, from the top, the name as a link to the screen Postać"
  // decision: D-170 "The player picks the program a character enters a map with on the select list beside the label „Program:”, whose options are the names of the player's programs, at that character in the section „Kto idzie” of the card of a map"
  // decision: D-170 "The list shows the first program still on the player's list of these: the program picked for that character before it is sent, which stays with the character until it is sent; the program that character used last, the program it was switched to during a map run included; the program with which any character last entered a map; the first program of the player's list"
  await withPage(async (page) => {
    const state = createProgram(teamOf("Ala", "Bob")).state;
    const [first, second] = state.programs;
    // Bob's row shows the second program because it was picked for him.
    const picked = { ...state, pickedPrograms: { 2: second.id } };
    const { calls } = await mount(page, propsOf(picked, "forest"));
    const lists = all(page.root, "select");
    assert.deepEqual(
      lists.map((list) => list.getAttribute("aria-label")),
      ["Program: Ala", "Program: Bob"],
    );
    assert.deepEqual(
      [...lists[0].options].map((option) => option.textContent),
      [first.name, second.name],
    );
    assert.equal(lists[0].value, String(first.id));
    assert.equal(lists[1].value, String(second.id));
    await inAct(() => {
      lists[0].value = String(second.id);
      fire(lists[0], "change");
    });
    assert.deepEqual(calls, [["pick", 1, second.id]]);
  });
});

// D-180, D-329, D-189: „Wejdzie: …” stands always; it is what the send takes, cut by the chest at every
// map, a solved one included.
test("„Wejdzie: …” is what a send takes from the chest, at an unsolved map and at a solved one alike, and „nic” where it takes none", async () => {
  // decision: D-329 "At each character in the section „Kto idzie” stand, from the top, the name as a link to the screen Postać"
  // decision: D-180 "The card of a map shows what of the plan enters"
  // decision: D-189 "A manual map run of a map already solved takes its equipment from the chest and brings its loot out to it as every other map run does (D-179), and pays no practice."
  await withPage(async (page) => {
    const plan = {
      take: [
        { item: "stick", count: 6 },
        { item: "berry", count: 4 },
      ],
      bring: [],
    };
    const bare = withPlan(teamOf("Ala"), plan);
    const entering = () => text(page.root, ".maps-who-enters");
    const { screen } = await mount(
      page,
      propsOf(withChest(bare, { stick: 2 }), "forest"),
    );
    assert.equal(entering(), "Wejdzie: patyk 2", "the chest holds two sticks");
    await inAct(() => screen.update(propsOf(withChest(bare, {}), "forest")));
    assert.equal(entering(), "Wejdzie: nic", "an empty chest gives nothing");
    await inAct(() =>
      screen.update(propsOf(solved(withChest(bare, { stick: 2 })), "forest")),
    );
    assert.equal(
      entering(),
      "Wejdzie: patyk 2",
      "a solved map takes from the chest, as every map does",
    );
    await inAct(() =>
      screen.update(
        propsOf(withPlan(teamOf("Ala"), { take: [], bring: [] }), "forest"),
      ),
    );
    assert.equal(
      entering(),
      "Wejdzie: nic",
      "an empty take list gives nothing",
    );
  });
});

// D-188: no map of the data cuts a plan today, so the case gives Las an entry cap for its length.
test("a map that cuts the plan shows the clipped-plan line and what enters cut", async () => {
  // decision: D-329 "At each character in the section „Kto idzie” stand, from the top, the name as a link to the screen Postać"
  // decision: D-179 "The backpack is the cap on both sides, a map may add a stricter cap of its own down to zero, and a trip plan over the map's cap does not keep the character from entering the map: it goes in cut, and the player is told so beforehand"
  // decision: D-180 "The card of a map shows what of the plan enters"
  // decision: D-188 "On the card of a map, at a character, „Plan wyprawy wejdzie przycięty: mapa wpuszcza najwyżej {n} sztuk.” in `warning` stands when its entry cap is below the smaller of the take list's requested total in that character's chosen program and the character's carrying capacity"
  const copy = structuredClone(MAPS.forest);
  try {
    MAPS.forest.carryIn = 5;
    await withPage(async (page) => {
      const state = withChest(
        withPlan(teamOf("Ala"), {
          take: [
            { item: "stick", count: 6 },
            { item: "berry", count: 4 },
          ],
          bring: [],
        }),
        { stick: 10, berry: 10 },
      );
      const { screen } = await mount(page, propsOf(state, "forest"));
      const member = members(page.root)[0];
      assert.equal(
        text(member, ".trip-warning"),
        "Plan wyprawy wejdzie przycięty: mapa wpuszcza najwyżej 5 sztuk.",
      );
      assert.equal(text(member, ".maps-who-enters"), "Wejdzie: patyk 5");
      assert.deepEqual(kinds(member), [
        "maps-who-name",
        "maps-who-resurrection",
        "maps-who-program",
        "maps-who-enters",
        "trip-warning",
        "maps-who-actions",
      ]);
      await inAct(() =>
        screen.update(
          propsOf(withPlan(state, { take: [], bring: [] }), "forest"),
        ),
      );
      assert.equal(
        members(page.root)[0].querySelector(".trip-warning"),
        null,
        "a plan that fits stands with no line",
      );
    });
  } finally {
    for (const key of Object.keys(MAPS.forest)) delete MAPS.forest[key];
    Object.assign(MAPS.forest, copy);
  }
});

// D-243, D-274: „Wejdź” in the main look at each map, „Puść w pętlę” the plain button and only
// at a solved map; both act with the program the row shows. „Puść w pętlę” judges the program first
// (D-243), so the page is asked to judge before it is asked to start the earning loop.
test("„Wejdź” is the main button at each map, „Puść w pętlę” the plain one at a solved map alone, and both hand the page the row's program", async () => {
  // decision: D-274 "„Wejdź” at each character in the section „Kto idzie” of the card of a map has the same main look though it sends no form, while „Puść w pętlę” beside it keeps the plain button"
  // decision: D-53 "The player sends a character to a game map from the card of the map on the screen Mapy, and „Zakończ” returns to the screen Postać of that character"
  // decision: D-243 "The player starts an earning loop with „Puść w pętlę”, which stands at each character in the section „Kto idzie” of the card of each solved map, beside „Wejdź”, and takes the program of that character's list „Program:”"
  await withPage(async (page) => {
    const unsolved = teamOf("Ala");
    const { screen, calls } = await mount(page, propsOf(unsolved, "forest"), {
      judge: () => judgedOf(),
    });
    const enter = buttonLabelled(page.root, "Wejdź: Ala, mapa Las");
    assert.equal(enter.textContent, "Wejdź");
    assert.ok(enter.classList.contains("main"), "the main look");
    assert.equal(enter.getAttribute("type"), "button", "it submits no form");
    assert.equal(
      buttonLabelled(page.root, "Puść w pętlę: Ala, mapa Las"),
      undefined,
      "a map not yet solved has no earning loop",
    );
    await press(enter);
    const programId = unsolved.programs[0].id;
    assert.deepEqual(calls, [["enter", 1, "forest", programId]]);
    await inAct(() => screen.update(propsOf(solved(unsolved), "forest")));
    const loop = buttonLabelled(page.root, "Puść w pętlę: Ala, mapa Las");
    assert.equal(loop.textContent, "Puść w pętlę");
    assert.equal(loop.className, "button", "the plain button");
    await press(loop);
    await until(() => calls.length === 3);
    assert.deepEqual(calls.slice(1), [
      ["judge", 1, "forest", programId],
      ["startLoop", 1, "forest", programId],
    ]);
  });
});

// D-326: an empty list „Wynieś” says so beside „Puść w pętlę” in warning, and the button acts.
test("an empty list „Wynieś” puts „Pętla nic nie zarobi do skrzynki” beside „Puść w pętlę”, which still acts", async () => {
  // decision: D-326 "Where the bring list of the program picked is empty"
  // decision: D-329 "At each character in the section „Kto idzie” stand, from the top, the name as a link to the screen Postać"
  await withPage(async (page) => {
    const empty = solved(teamOf("Ala"));
    const { screen, calls } = await mount(page, propsOf(empty, "forest"), {
      judge: () => judgedOf(),
    });
    const mark = page.root.querySelector(".maps-who-empty-loop");
    assert.equal(mark.textContent, "Pętla nic nie zarobi do skrzynki");
    const loop = buttonLabelled(page.root, "Puść w pętlę: Ala, mapa Las");
    assert.equal(
      mark.parentElement,
      loop.parentElement,
      "the mark stands beside the button",
    );
    assert.equal(loop.disabled, false);
    await press(loop);
    await until(() => calls.length === 2);
    assert.deepEqual(
      calls.map(([name]) => name),
      ["judge", "startLoop"],
      "the button acts, after its judging",
    );
    await inAct(() =>
      screen.update(
        propsOf(
          withPlan(empty, { take: [], bring: [{ item: "stick", count: 1 }] }),
          "forest",
        ),
      ),
    );
    assert.equal(page.root.querySelector(".maps-who-empty-loop"), null);
    // At a map not yet solved there is no earning loop, so there is no mark either.
    await inAct(() => screen.update(propsOf(teamOf("Ala"), "forest")));
    assert.equal(page.root.querySelector(".maps-who-empty-loop"), null);
  });
});

// D-243, D-244: a character in an earning loop shows its line with „Zatrzymaj”, which acts, and
// both sending buttons stand inactive; the line of a stopped earning loop does not stand here (D-245).
test("a character in an earning loop shows its line and „Zatrzymaj”, its sending buttons stand inactive, and no stopped-loop line stands", async () => {
  // decision: D-44 "The screens of the browser view build every button, select list, number field, text field and cell of a pick from the shared controls of `src/browser/view/controls/` — the button in its kinds (the plain button, the destructive button, the button selected in its group, the secondary action (D-275), the tab (D-276), the main look outside a form (D-274) and the button in `positive`), the select list, the number field, the text field and the pick cell — and the buttons „Zakończ”, „Usuń”, „Restart”, „Porzuć zmiany”, „Przełącz postać na ten program”, „Zatrzymaj” and „Zacznij od zera” (D-402), and „Odrzuć” of the question „Zapisać, odrzucić, wrócić?” (D-173), are destructive buttons"
  // decision: D-329 "At each character in the section „Kto idzie” stand, from the top, the name as a link to the screen Postać"
  // decision: D-243 "At a character in an earning loop „Wejdź” and „Puść w pętlę” are inactive, and the player stops the earning loop first"
  // decision: D-244 "A running earning loop shows on the card and the screen of its character, and at that character in the section „Kto idzie” of the card of a map, as one line in the role `text`, „Pętla: {mapa} · przejście {n} · minuta {m} · domknięte {k}”, with the button „Zatrzymaj”"
  // decision: D-245 "„Zatrzymaj” is a destructive button that acts at once on the click: the items carried in the map run going on are lost, its loot stays out of the chest, the practice D-189 gives enters the character skills, and the character returns to its ordinary state"
  await withPage(async (page) => {
    const state = solved({
      ...teamOf("Ala", "Bob"),
      loops: { 1: LOOP },
      stoppedLoops: { 2: { eating: 4 } },
    });
    const { calls } = await mount(page, propsOf(state, "forest"));
    const [ala, bob] = members(page.root);
    assert.equal(
      text(ala, ".maps-who-loop-line"),
      "Pętla: Las · przejście 3 · minuta 212 · domknięte 2",
    );
    assert.deepEqual(kinds(ala), [
      "maps-who-name",
      "maps-who-resurrection",
      "maps-who-loop",
      "maps-who-program",
      "maps-who-enters",
      "maps-who-actions",
    ]);
    const stop = buttonLabelled(ala, "Zatrzymaj: Ala");
    assert.equal(stop.textContent, "Zatrzymaj");
    assert.ok(stop.classList.contains("destructive"));
    assert.equal(buttonLabelled(ala, "Wejdź: Ala, mapa Las").disabled, true);
    assert.equal(
      buttonLabelled(ala, "Puść w pętlę: Ala, mapa Las").disabled,
      true,
    );
    // Bob is not in an earning loop: his buttons act and no earning loop line stands at him.
    assert.equal(bob.querySelector(".maps-who-loop"), null);
    assert.equal(buttonLabelled(bob, "Wejdź: Bob, mapa Las").disabled, false);
    assert.equal(
      buttonLabelled(bob, "Puść w pętlę: Bob, mapa Las").disabled,
      false,
    );
    assert.doesNotMatch(page.root.textContent, /Pętla zatrzymana/);
    await press(stop);
    assert.deepEqual(calls, [["stop", 1]]);
  });
});

// D-287, D-55: while a manual map run waits or has ended, every „Wejdź” is inactive, „Puść w pętlę”
// is inactive at the run's character alone, and each character says why.
test("a manual map run going on, waiting and ended keeps „Wejdź” inactive and „Puść w pętlę” inactive at its character alone, with the sentence at each character", async () => {
  // decision: D-287 "While the game state holds a manual map run that waits in a pause, or that has ended and waits for „Restart” or „Zakończ”, Siedziba, the screen Postać and the screen Mapy keep active what the simulation allows, while „Wejdź”, „Puść w pętlę” at that map run's character and „Kup” stand inactive"
  // decision: D-287 "Under the inactive buttons of each character in the section „Kto idzie” of the card of a map stands „Przejście na mapie {mapa} jest niezakończone"
  // decision: D-55 "The game holds one manual map run at a time: while one character is in a manual map run, the game sends no other on a manual map run"
  await withPage(async (page) => {
    const base = solved(teamOf("Ala", "Bob"));
    const running = send(base, { mapId: "forest", characterId: 1 }, 1).state;
    const { screen } = await mount(page, propsOf(running, "forest"));
    for (const state of [running, waitingRun(base), endedRun(base)]) {
      await inAct(() => screen.update(propsOf(state, "forest")));
      for (const name of ["Ala", "Bob"]) {
        assert.equal(
          buttonLabelled(page.root, `Wejdź: ${name}, mapa Las`).disabled,
          true,
          `„Wejdź” of ${name} stands inactive`,
        );
      }
      assert.equal(
        buttonLabelled(page.root, "Puść w pętlę: Ala, mapa Las").disabled,
        true,
        "the earning loop of the run's character is inactive",
      );
      assert.equal(
        buttonLabelled(page.root, "Puść w pętlę: Bob, mapa Las").disabled,
        false,
        "another character can still start its earning loop",
      );
      assert.deepEqual(texts(page.root, ".maps-who-run-note"), [
        RUN_SENTENCE,
        RUN_SENTENCE,
      ]);
      // The sentence stands under the buttons of each character.
      for (const member of members(page.root))
        assert.equal(kinds(member).at(-1), "maps-who-run-note");
    }
    await inAct(() => screen.update(propsOf(base, "forest")));
    assert.equal(page.root.querySelector(".maps-who-run-note"), null);
    assert.equal(
      buttonLabelled(page.root, "Wejdź: Ala, mapa Las").disabled,
      false,
    );
  });
});

// --- the judging of a program --------------------------------------------------------------

const SOLVED = { kind: "solved" };
const UNDECIDED = { kind: "undecided" };
const death = (cause, minute) => ({ kind: "death", cause, minute });

/** A judging whose first results are `results`, the rest of the twelve solved. */
function judgedOf(...results) {
  return {
    results: [...results, ...Array(12 - results.length).fill(SOLVED)],
    equipment: [],
  };
}

/** The judging of three kinds: a death by cold, one by hunger, one by combat, an undecided seed and seven solved. */
const MIXED = judgedOf(
  death("cold", 37),
  death("hunger", 412),
  death("combat", 5),
  UNDECIDED,
);

/** The kinds of twelve results, `solvedCount` of them solved and the rest undecided. */
const kindsOf = (solvedCount) =>
  Array.from({ length: 12 }, (_, at) =>
    at < solvedCount ? "solved" : "undecided",
  );

/** `state` holding the remembered judging of the triple, as the game state keeps it. */
function withRemembered(state, [characterId, programId, mapId], held) {
  return {
    ...state,
    judgings: { [characterId]: { [programId]: { [mapId]: held } } },
  };
}

const judgeButton = (member) => member.querySelector(".maps-who-judge button");
const resultOf = (member) => member.querySelector(".judging-result");
const ROLES = ["positive", "danger", "warning"];
const roleOf = (element) =>
  ROLES.filter((role) => element.classList.contains(role)).join(" ");

/**
 * Lets the page's timers run, inside one act, until `done()` holds: the screen draws the waiting
 * button and gives the browser a frame to paint it before it judges, so the judging comes later.
 */
async function until(done) {
  await inAct(async () => {
    for (let round = 0; round < 400 && !done(); round += 1)
      await new Promise((resolve) => setTimeout(resolve, 5));
  });
  assert.ok(done(), "the awaited moment came");
}

// D-329, D-439, D-325: the button of a judging stands beside „Wejdź” at each character, on a map
// not yet solved and on a solved one, as the plain shared button.
test("„Oceń na 12 ziarnach” stands beside „Wejdź” at each character on a map not yet solved and on a solved one, as the plain shared button", async () => {
  // decision: D-325 "The screen Mapy holds on the left the list of the maps open to the player"
  // decision: D-329 "The button of a judging, „Oceń na 12 ziarnach”, judges the program of the character's list „Program:” on the map of the card (D-439)"
  // decision: D-439 "A program can be judged on every map open to the player, a map not yet solved included, and for a character in an earning loop or in a manual map run"
  // decision: D-274 "„Wejdź” at each character in the section „Kto idzie” of the card of a map has the same main look though it sends no form, while „Puść w pętlę” beside it keeps the plain button"
  await withPage(async (page) => {
    const open = teamOf("Ala", "Bob");
    const { screen } = await mount(page, propsOf(open, "forest"));
    for (const [state, kindsInRow] of [
      [open, ["maps-who-enter", "maps-who-judge"]],
      [
        solved(open),
        ["maps-who-enter", "maps-who-judge", "maps-who-loop-start"],
      ],
    ]) {
      await inAct(() => screen.update(propsOf(state, "forest")));
      for (const member of members(page.root)) {
        const button = judgeButton(member);
        assert.equal(button.textContent, "Oceń na 12 ziarnach");
        assert.equal(button.className, "button", "the plain shared button");
        assert.equal(button.getAttribute("type"), "button");
        assert.equal(button.disabled, false);
        assert.equal(
          button.getAttribute("aria-label"),
          `Oceń na 12 ziarnach: ${text(member, ".maps-who-name")}, mapa Las`,
        );
        assert.deepEqual(
          kinds(member.querySelector(".maps-who-actions")),
          kindsInRow,
          "it stands in the row of the buttons, after „Wejdź”",
        );
      }
    }
  });
});

// D-439, D-287: a judging changes nothing in an earning loop or a manual map run, so the button
// stays active at a character in either, in every state of the map run.
test("the button of a judging stays active at a character in an earning loop and while a manual map run goes on, waits or has ended", async () => {
  // decision: D-439 "A program can be judged on every map open to the player, a map not yet solved included, and for a character in an earning loop or in a manual map run"
  // decision: D-287 "While the game state holds a manual map run that waits in a pause, or that has ended and waits for „Restart” or „Zakończ”, Siedziba, the screen Postać and the screen Mapy keep active what the simulation allows, while „Wejdź”, „Puść w pętlę” at that map run's character and „Kup” stand inactive"
  await withPage(async (page) => {
    const base = solved(teamOf("Ala", "Bob"));
    const looping = { ...base, loops: { 1: LOOP } };
    const running = send(base, { mapId: "forest", characterId: 1 }, 1).state;
    const { screen } = await mount(page, propsOf(looping, "forest"));
    for (const state of [looping, running, waitingRun(base), endedRun(base)]) {
      await inAct(() => screen.update(propsOf(state, "forest")));
      assert.deepEqual(
        members(page.root).map((member) => judgeButton(member).disabled),
        [false, false],
      );
    }
    assert.equal(
      buttonLabelled(page.root, "Wejdź: Ala, mapa Las").disabled,
      true,
      "precondition: the map run still keeps „Wejdź” inactive",
    );
  });
});

// D-329: the click draws the button disabled as „Oceniam…” first, and only then the page's call
// runs; the result then stands under that character alone.
test("a click draws the button disabled as „Oceniam…” before the page judges, and the result then stands under that character alone", async () => {
  // decision: D-329 "The button of a judging, „Oceń na 12 ziarnach”, judges the program of the character's list „Program:” on the map of the card (D-439) and reads „Oceniam…” while the judging counts"
  // decision: D-329 "Its result unfolds under the character as „Ocena na 12 ziarnach: {n} z 12 rozwiązanych”, twelve lines „Ziarno {i}: …” and „Ocena nic nie kosztuje: nie bierze ze skrzynki, nic nie płaci, a śmierć w niej nie zabiera wprawy ani wskrzeszenia.”, and stands until the player picks another program on that list, judges again or leaves the card."
  await withPage(async (page) => {
    const state = solved(teamOf("Ala", "Bob"));
    const { calls } = await mount(page, propsOf(state, "forest"), {
      judge: () => MIXED,
    });
    const [ala, bob] = members(page.root);
    await press(judgeButton(ala));
    const waiting = judgeButton(ala);
    assert.equal(waiting.textContent, "Oceniam…");
    assert.equal(waiting.disabled, true);
    assert.equal(waiting.getAttribute("aria-busy"), "true");
    assert.deepEqual(calls, [], "the screen is drawn before the page is asked");
    assert.equal(resultOf(ala), null);
    assert.equal(
      judgeButton(bob).textContent,
      "Oceń na 12 ziarnach",
      "another character's button waits for nothing",
    );
    assert.equal(judgeButton(bob).disabled, false);

    await until(() => calls.length > 0);
    assert.deepEqual(calls, [["judge", 1, "forest", state.programs[0].id]]);
    assert.equal(judgeButton(ala).textContent, "Oceń na 12 ziarnach");
    assert.equal(judgeButton(ala).disabled, false);
    assert.equal(resultOf(bob), null, "the result is not at another character");
    const result = resultOf(ala);
    assert.equal(
      kinds(ala).at(-1),
      "judging-result",
      "the result stands under the buttons",
    );
    assert.equal(
      text(result, ".judging-heading"),
      "Ocena na 12 ziarnach: 8 z 12 rozwiązanych",
    );
    const rows = all(result, ".judging-row");
    assert.deepEqual(
      rows.map((row) => row.textContent),
      [
        "Ziarno 1: mag zamarzł w 37. minucie",
        "Ziarno 2: mag umarł z głodu w 412. minucie",
        "Ziarno 3: mag zginął w walce w 5. minucie",
        `Ziarno 4: bez rozstrzygnięcia po 4000 minutach`,
        ...[5, 6, 7, 8, 9, 10, 11, 12].map((i) => `Ziarno ${i}: rozwiązane`),
      ],
    );
    assert.deepEqual(
      rows.map(roleOf),
      ["danger", "danger", "danger", "warning", ...Array(8).fill("positive")],
      "a death in danger, an undecided seed in warning, a solved one in positive",
    );
    assert.equal(
      text(result, ".judging-note"),
      "Ocena nic nie kosztuje: nie bierze ze skrzynki, nic nie płaci, a śmierć w niej nie zabiera wprawy ani wskrzeszenia.",
    );
    assert.deepEqual(kinds(result), [
      "judging-heading",
      "judging-rows",
      "judging-note",
    ]);
  });
});

// D-329: the result stands through the draws of the screen, and goes at a pick on the character's
// list, at a new judging's replacing it and where the player leaves the card.
test("a result stands through draws, goes where another program is picked at its character, is replaced by a new judging and goes where the player leaves the card", async () => {
  // decision: D-329 "Its result unfolds under the character as „Ocena na 12 ziarnach: {n} z 12 rozwiązanych”, twelve lines „Ziarno {i}: …” and „Ocena nic nie kosztuje: nie bierze ze skrzynki, nic nie płaci, a śmierć w niej nie zabiera wprawy ani wskrzeszenia.”, and stands until the player picks another program on that list, judges again or leaves the card."
  await withPage(async (page) => {
    const state = solved(createProgram(teamOf("Ala", "Bob")).state);
    const [first, second] = state.programs;
    const answers = [MIXED, judgedOf(), MIXED, MIXED];
    const { screen, calls } = await mount(page, propsOf(state, "forest"), {
      judge: () => answers.shift(),
      pick: (shown, characterId, programId) =>
        shown.update(
          propsOf(
            { ...state, pickedPrograms: { [characterId]: programId } },
            "forest",
          ),
        ),
    });
    const heading = (index) =>
      text(members(page.root)[index], ".judging-heading");
    const judged = () => calls.filter(([name]) => name === "judge").length;
    const judgeAt = async (index, count) => {
      await press(judgeButton(members(page.root)[index]));
      await until(() => judged() === count);
    };
    await judgeAt(0, 1);
    await judgeAt(1, 2);
    assert.equal(heading(0), "Ocena na 12 ziarnach: 8 z 12 rozwiązanych");
    assert.equal(heading(1), "Ocena na 12 ziarnach: 12 z 12 rozwiązanych");

    await inAct(() => screen.update(propsOf(state, "forest", NOW + HOUR)));
    assert.equal(
      heading(0),
      "Ocena na 12 ziarnach: 8 z 12 rozwiązanych",
      "a draw of the screen leaves the result",
    );

    // Bob's list shows another program: his result goes, Ala's stays.
    const bobsList = page.root.querySelector(
      'select[aria-label="Program: Bob"]',
    );
    await inAct(() => {
      bobsList.value = String(second.id);
      fire(bobsList, "change");
    });
    assert.equal(resultOf(members(page.root)[1]), null);
    assert.equal(heading(0), "Ocena na 12 ziarnach: 8 z 12 rozwiązanych");
    // Picked back, the old result does not come back: it was judged for a program the list left.
    await inAct(() => {
      bobsList.value = String(first.id);
      fire(bobsList, "change");
    });
    assert.equal(resultOf(members(page.root)[1]), null);

    // A new judging replaces the result that stands.
    await judgeAt(0, 3);
    assert.equal(
      all(page.root, ".judging-result").length,
      1,
      "one result stands at Ala, none at Bob",
    );
    assert.equal(heading(0), "Ocena na 12 ziarnach: 8 z 12 rozwiązanych");

    // Another map of the list is leaving the card; coming back finds no result.
    await inAct(() => screen.update(propsOf(state, "forestDeep")));
    assert.equal(page.root.querySelector(".judging-result"), null);
    await inAct(() => screen.update(propsOf(state, "forest")));
    assert.equal(page.root.querySelector(".judging-result"), null);
  });
});

// D-329: a result speaks of the program the list showed when it was judged; where the list shows
// another program, whatever the reason, the result does not stand.
test("a result stands only while the list shows the program it was judged for, whoever changed what the list shows", async () => {
  // decision: D-329 "Its result unfolds under the character as „Ocena na 12 ziarnach: {n} z 12 rozwiązanych”, twelve lines „Ziarno {i}: …” and „Ocena nic nie kosztuje: nie bierze ze skrzynki, nic nie płaci, a śmierć w niej nie zabiera wprawy ani wskrzeszenia.”, and stands until the player picks another program on that list, judges again or leaves the card."
  await withPage(async (page) => {
    const state = solved(createProgram(teamOf("Ala")).state);
    const [, second] = state.programs;
    const { screen, calls } = await mount(page, propsOf(state, "forest"), {
      judge: () => MIXED,
    });
    await press(judgeButton(members(page.root)[0]));
    await until(() => calls.length === 1);
    assert.ok(resultOf(members(page.root)[0]));
    await inAct(() =>
      screen.update(
        propsOf({ ...state, pickedPrograms: { 1: second.id } }, "forest"),
      ),
    );
    assert.equal(resultOf(members(page.root)[0]), null);
  });
});

// D-440: the mark beside the list „Program:” is the judging remembered for the program the list
// shows at that character on the map of the card.
test("beside the list „Program:” stands the badge for twelve of twelve and „{n} z 12” for less, for the program the list shows at that character on that map", async () => {
  // decision: D-440 "Beside the list „Program:” of a character in „Kto idzie” stands the judging remembered for that character, the program the list shows and the map of the card: the badge „szczelny: 12 z 12” in `positive` where it solved all twelve seeds, and „{n} z 12” in `text` otherwise."
  await withPage(async (page) => {
    const base = solved(createProgram(teamOf("Ala", "Bob")).state);
    const [first, second] = base.programs;
    const marks = () =>
      members(page.root).map((member) => {
        const mark = member.querySelector(".maps-who-program .maps-who-mark");
        return mark === null ? null : [mark.textContent, roleOf(mark)];
      });
    const state = withRemembered(base, [1, first.id, "forest"], {
      results: kindsOf(12),
      equipment: [],
    });
    const { screen } = await mount(page, propsOf(state, "forest"));
    assert.deepEqual(
      marks(),
      [["szczelny: 12 z 12", "positive"], null],
      "Ala's list shows the judged program, Bob's has no judging",
    );
    assert.equal(
      members(page.root)[0].querySelector(".maps-who-mark-note"),
      null,
    );

    const lower = withRemembered(base, [1, first.id, "forest"], {
      results: kindsOf(9),
      equipment: [],
    });
    await inAct(() => screen.update(propsOf(lower, "forest")));
    assert.deepEqual(marks(), [["9 z 12", ""], null], "„{n} z 12” in text");

    // The list shows another program: the mark of the program judged does not stand, and the other
    // program has none.
    await inAct(() =>
      screen.update(
        propsOf({ ...lower, pickedPrograms: { 1: second.id } }, "forest"),
      ),
    );
    assert.deepEqual(marks(), [null, null]);
    const both = {
      ...lower,
      pickedPrograms: { 1: second.id },
      judgings: {
        1: {
          [first.id]: { forest: { results: kindsOf(9), equipment: [] } },
          [second.id]: { forest: { results: kindsOf(12), equipment: [] } },
        },
      },
    };
    await inAct(() => screen.update(propsOf(both, "forest")));
    assert.deepEqual(marks(), [["szczelny: 12 z 12", "positive"], null]);

    // The judging was made on Las: no mark on another map, none on Siedziba's lists, which this
    // screen alone draws.
    await inAct(() => screen.update(propsOf(both, "forestDeep")));
    assert.deepEqual(marks(), [null, null]);
  });
});

// D-440: where the chest holds less than the judging took, the result stays with the note and the
// badge goes out; with more, the mark stands as it was.
test("where the chest holds less than the judging took the mark keeps its count with the note and loses its badge, and with more it stands as it was", async () => {
  // decision: D-440 "Where the chest holds less of an item than the judging took, the result stays with „oceniono z zapasem, którego dziś nie ma w skrzynce” beside it and the badge goes out, „12 z 12” standing in its place."
  await withPage(async (page) => {
    const base = solved(teamOf("Ala"));
    const held = {
      results: kindsOf(12),
      equipment: [{ item: "berry", count: 4 }],
    };
    const remembered = withRemembered(
      base,
      [1, base.programs[0].id, "forest"],
      held,
    );
    const mark = () => text(page.root, ".maps-who-program .maps-who-mark");
    const note = () =>
      page.root.querySelector(".maps-who-program .maps-who-mark-note");
    const { screen } = await mount(
      page,
      propsOf(withChest(remembered, { berry: 10 }), "forest"),
    );
    assert.equal(mark(), "szczelny: 12 z 12");
    assert.equal(note(), null);
    await inAct(() =>
      screen.update(propsOf(withChest(remembered, { berry: 4 }), "forest")),
    );
    assert.equal(
      mark(),
      "szczelny: 12 z 12",
      "the chest holds just what it took",
    );
    assert.equal(note(), null);
    await inAct(() =>
      screen.update(propsOf(withChest(remembered, { berry: 3 }), "forest")),
    );
    assert.equal(mark(), "12 z 12", "the badge goes out, the count stays");
    assert.equal(
      text(page.root, ".maps-who-mark-note"),
      "oceniono z zapasem, którego dziś nie ma w skrzynce",
    );
    assert.equal(
      roleOf(page.root.querySelector(".maps-who-mark-note")),
      "warning",
    );
    assert.equal(
      roleOf(page.root.querySelector(".maps-who-mark")),
      "",
      "the count is in text, the badge's role gone",
    );
    await inAct(() =>
      screen.update(propsOf(withChest(remembered, { berry: 9 }), "forest")),
    );
    assert.equal(mark(), "szczelny: 12 z 12");
    assert.equal(note(), null);
  });
});

// The styleguide's rule „The screen Mapy”: each part of the judging stands in the role it gives. jsdom
// does not resolve a custom property, so the case reads which token each rule lands on, through the
// real stylesheet.
test("the parts of the judging take the role of the styleguide from the stylesheet: heading text-strong, rows positive, danger and warning, sentence text-secondary, badge positive, count text, note warning", async () => {
  // decision: D-329 "Its result unfolds under the character as „Ocena na 12 ziarnach: {n} z 12 rozwiązanych”, twelve lines „Ziarno {i}: …” and „Ocena nic nie kosztuje: nie bierze ze skrzynki, nic nie płaci, a śmierć w niej nie zabiera wprawy ani wskrzeszenia.”, and stands until the player picks another program on that list, judges again or leaves the card."
  // decision: D-440 "Beside the list „Program:” of a character in „Kto idzie” stands the judging remembered for that character, the program the list shows and the map of the card: the badge „szczelny: 12 z 12” in `positive` where it solved all twelve seeds, and „{n} z 12” in `text` otherwise."
  const base = solved(teamOf("Ala"));
  const programId = base.programs[0].id;
  const remembered = (kinds, equipment = []) =>
    withRemembered(base, [1, programId, "forest"], {
      results: kinds,
      equipment,
    });
  /** Mounts the screen on a page that has the game's stylesheets and gives `colour(selector)`. */
  async function styled(page, state, reaction) {
    const style = page.document.createElement("style");
    style.textContent = gameStylesheetText();
    page.document.head.append(style);
    const mounted = await mount(page, propsOf(state, "forest"), reaction);
    const colour = (selector, from = page.root) =>
      page.window.getComputedStyle(from.querySelector(selector)).color;
    return { ...mounted, colour, ala: () => members(page.root)[0] };
  }
  await withPage(async (page) => {
    const { colour, ala, calls } = await styled(page, remembered(kindsOf(12)), {
      judge: () => MIXED,
    });
    assert.equal(colour(".maps-who-mark"), "var(--positive)", "the badge");
    await press(judgeButton(ala()));
    await until(() => calls.length === 1);
    const rows = all(ala(), ".judging-row");
    assert.equal(colour(".judging-heading", ala()), "var(--text-strong)");
    assert.deepEqual(
      [rows[0], rows[3], rows[4]].map(
        (row) => page.window.getComputedStyle(row).color,
      ),
      ["var(--danger)", "var(--warning)", "var(--positive)"],
      "a death, an undecided seed, a solved seed",
    );
    assert.equal(colour(".judging-note", ala()), "var(--text-secondary)");
  });
  await withPage(async (page) => {
    const { colour } = await styled(page, remembered(kindsOf(9)));
    assert.equal(colour(".maps-who-mark"), "var(--text)", "the count");
  });
  await withPage(async (page) => {
    const { colour } = await styled(
      page,
      withChest(remembered(kindsOf(12), [{ item: "berry", count: 4 }]), {}),
    );
    assert.equal(colour(".maps-who-mark"), "var(--text)", "no badge");
    assert.equal(
      colour(".maps-who-mark-note"),
      "var(--warning)",
      "the note on the stock is a warning of the card",
    );
  });
});

// D-329 (the styleguide's rule "Focus does not fall to the page"): the button that turns disabled
// at the click gets the focus back with the result, and a focus the player moved meanwhile stays.
test("the focus stays on the button of a judging through its waiting, and a focus that stood elsewhere at the click is not taken", async () => {
  await withPage(async (page) => {
    const state = solved(teamOf("Ala", "Bob"));
    const { document } = page;
    const { calls } = await mount(page, propsOf(state, "forest"), {
      judge: () => MIXED,
    });
    const [ala, bob] = members(page.root);
    judgeButton(ala).focus();
    assert.equal(document.activeElement, judgeButton(ala));
    await press(judgeButton(ala));
    await until(() => calls.length === 1);
    assert.equal(
      document.activeElement,
      judgeButton(members(page.root)[0]),
      "the focus is on the button again, not on the page",
    );

    const bobsList = bob.querySelector("select");
    bobsList.focus();
    await press(judgeButton(members(page.root)[0]));
    await until(() => calls.length === 2);
    assert.equal(
      document.activeElement,
      bobsList,
      "a focus the click did not leave on the button stays where it was",
    );
  });
});

// D-407: the result lives in the screen: a screen taken down while the judging waits asks the page
// for nothing, and fails nothing.
test("a screen taken down while its button waits never asks the page to judge", async () => {
  await withPage(async (page) => {
    const { screen, calls } = await mount(
      page,
      propsOf(solved(teamOf("Ala")), "forest"),
      { judge: () => MIXED },
    );
    await press(judgeButton(members(page.root)[0]));
    await inAct(() => screen.dispose());
    await inAct(async () => {
      await new Promise((resolve) => setTimeout(resolve, 80));
    });
    assert.deepEqual(calls, []);
  });
});

// D-409, D-170, D-439: the entry makes the judging an act of the store, which counts the time
// first, and the act replaces the judging remembered for the triple and changes nothing else.
test("the entry judges through the store's act, remembers the judging for the character, program and map, and changes nothing else of the game state", async () => {
  // decision: D-409 "An act of the player that depends on the passing of time goes through the store of the game state, which reads the clock and passes the time elapsed to the simulation before the act runs, so no act reads the clock itself before it calls the simulation."
  // decision: D-440 "A judging, the one „Puść w pętlę” runs included (D-243), replaces the judging remembered for its character, program and map."
  // decision: D-170 "The player picks the program a character enters a map with on the select list beside the label „Program:”, whose options are the names of the player's programs, at that character in the section „Kto idzie” of the card of a map."
  await withPage(async (page) => {
    const before = createProgram(teamOf("Ala")).state;
    let state = { ...before, pickedPrograms: { 1: before.programs[1].id } };
    const log = [];
    const store = {
      get: () => state,
      moment: () => NOW,
      act(body) {
        log.push("act");
        body((result) => {
          state = result.state;
        });
      },
      send: () => log.push("send"),
      startLoop: () => log.push("startLoop"),
    };
    const picked = state;
    let instance = null;
    await inAct(() => {
      instance = createMapsEntry({ store }).build(
        {
          current: () => ({ kind: "map", mapId: "forest" }),
          show() {},
          focusShown() {},
          focusIfLost() {},
        },
        { kind: "map", mapId: "forest" },
      );
      page.root.append(instance.element);
    });
    const ala = members(page.root)[0];
    await press(judgeButton(ala));
    await until(() => log.length > 0);

    assert.deepEqual(log, ["act"], "one act of the store, no send, no loop");
    const remembered = state.judgings[1][picked.programs[1].id].forest;
    assert.equal(remembered.results.length, 12);
    assert.deepEqual(
      { ...state, judgings: picked.judgings },
      picked,
      "nothing of the game state but the judgings changed: the pick, the program used last and the rest stay",
    );
    const shown = all(resultOf(members(page.root)[0]), ".judging-row").map(
      (row) =>
        ({ positive: "solved", danger: "death", warning: "undecided" })[
          roleOf(row)
        ],
    );
    assert.deepEqual(
      shown,
      remembered.results,
      "the result under the character is the judging the state remembers",
    );
    const solvedCount = shown.filter((kind) => kind === "solved").length;
    assert.equal(
      text(members(page.root)[0], ".judging-heading"),
      `Ocena na 12 ziarnach: ${solvedCount} z 12 rozwiązanych`,
    );
    assert.equal(
      text(members(page.root)[0], ".maps-who-program .maps-who-mark"),
      solvedCount === 12 ? "szczelny: 12 z 12" : `${solvedCount} z 12`,
      "the act drew the screen from the state it made, so the mark stands beside the list",
    );
    await inAct(() => instance.dispose());
  });
});

// --- „Puść w pętlę” judges first ----------------------------------------------------------

const loopButton = (member) =>
  member.querySelector(".maps-who-loop-start button");
const loopSentence = (member) =>
  member.querySelector(".maps-who-loop-unsolved");
const countOf = (calls, name) =>
  calls.filter(([called]) => called === name).length;
/** The label and text of the button as the player meets it: what it reads and the sentence over it. */
const loopStand = (member) => ({
  text: loopButton(member).textContent,
  sentence: loopSentence(member)?.textContent ?? null,
});
const ORDINARY = { text: "Puść w pętlę", sentence: null };
const SECOND_CLICK = {
  text: "Puść mimo to",
  sentence: "Na 4 z 12 ziaren program mapy nie rozwiązuje.",
};

// D-243: the click draws the button inactive with its own text before the page judges; where all twelve
// seeds are solved the earning loop starts at once, with no sentence and no second click.
test("„Puść w pętlę” judges the program the list shows on the map of the card with its text kept, and where all twelve seeds are solved starts the earning loop at once", async () => {
  // decision: D-243 "The player starts an earning loop with „Puść w pętlę”, which stands at each character in the section „Kto idzie” of the card of each solved map, beside „Wejdź”, and takes the program of that character's list „Program:”, which its click first judges anew (D-439)."
  // decision: D-243 "The judging of „Puść w pętlę” takes what the earning loop would take from the chest at that moment, and the earning loop starts at once where it solves all twelve seeds, or where it gives each seed the same line as the result of the button of a judging (D-329) that stands under the character."
  await withPage(async (page) => {
    const state = solved(teamOf("Ala", "Bob"));
    const { calls } = await mount(page, propsOf(state, "forest"), {
      judge: () => judgedOf(),
    });
    const [ala, bob] = members(page.root);
    await press(loopButton(ala));
    assert.deepEqual(
      loopStand(ala),
      ORDINARY,
      "the text stays while it counts",
    );
    assert.equal(
      loopButton(ala).disabled,
      true,
      "and no second click is taken",
    );
    assert.equal(
      judgeButton(ala).textContent,
      "Oceń na 12 ziarnach",
      "the button of a judging waits for nothing: the click is not its own",
    );
    assert.equal(loopButton(bob).disabled, false);
    assert.deepEqual(calls, [], "the screen is drawn before the page is asked");

    await until(() => calls.length === 2);
    const programId = state.programs[0].id;
    assert.deepEqual(calls, [
      ["judge", 1, "forest", programId],
      ["startLoop", 1, "forest", programId],
    ]);
    assert.equal(loopSentence(members(page.root)[0]), null);
    assert.equal(
      resultOf(members(page.root)[0]),
      null,
      "no result is shown where the earning loop starts at once",
    );
    assert.equal(loopButton(members(page.root)[0]).disabled, false);
  });
});

// D-243: with a seed unsolved the result stands under the character, the sentence over the button, the
// button reads „Puść mimo to”, and the second click starts the earning loop without judging again.
test("a seed unsolved shows the result under the character and the sentence over the button, the button reads „Puść mimo to”, and the second click starts the earning loop", async () => {
  // decision: D-243 "Otherwise the new result stands under the character in place of the one that stood there, „Na {k} z 12 ziaren program mapy nie rozwiązuje.” stands above the button in `warning`, the button reads „Puść mimo to”, and a second click starts the earning loop."
  // decision: D-326 "Where the bring list of the program picked is empty, „Pętla nic nie zarobi do skrzynki” stands in `warning` beside „Puść w pętlę”, and the button still acts."
  await withPage(async (page) => {
    const state = solved(teamOf("Ala", "Bob"));
    const looping = { ...state, loops: { 1: LOOP } };
    const { calls } = await mount(page, propsOf(state, "forest"), {
      judge: () => MIXED,
      startLoop: (shown) => shown.update(propsOf(looping, "forest")),
      stop: (shown) => shown.update(propsOf(state, "forest")),
    });
    await press(loopButton(members(page.root)[0]));
    await until(() => calls.length === 1);
    const [ala, bob] = members(page.root);
    assert.deepEqual(calls, [["judge", 1, "forest", state.programs[0].id]]);
    assert.equal(
      text(resultOf(ala), ".judging-heading"),
      "Ocena na 12 ziarnach: 8 z 12 rozwiązanych",
      "the result stands under the character",
    );
    assert.equal(kinds(ala).at(-1), "judging-result");
    assert.equal(resultOf(bob), null, "and at no other character");
    assert.deepEqual(loopStand(ala), SECOND_CLICK);
    assert.deepEqual(loopStand(bob), ORDINARY);

    const sentence = loopSentence(ala);
    const button = loopButton(ala);
    assert.equal(roleOf(sentence), "warning", "the sentence is in warning");
    assert.equal(button.className, "button", "the plain shared button");
    assert.equal(button.disabled, false);
    assert.equal(
      button.getAttribute("aria-label"),
      "Puść mimo to: Ala, mapa Las",
      "the name of the button says what it reads",
    );
    assert.equal(
      sentence.parentElement,
      button.closest(".maps-who-loop-start"),
      "the sentence stands in the place of the button",
    );
    assert.ok(
      sentence.compareDocumentPosition(button) &
        sentence.ownerDocument.defaultView.Node.DOCUMENT_POSITION_FOLLOWING,
      "above the button",
    );
    // D-326: the sentence of an empty list stands beside the button, which acts.
    const empty = ala.querySelector(".maps-who-empty-loop");
    assert.equal(empty.textContent, "Pętla nic nie zarobi do skrzynki");
    assert.equal(empty.parentElement, button.parentElement);

    await press(button);
    assert.deepEqual(calls.slice(1), [
      ["startLoop", 1, "forest", state.programs[0].id],
    ]);
    assert.equal(countOf(calls, "judge"), 1, "the second click judges no more");

    // The loop runs and the second click is spent: once it is stopped the button is „Puść w pętlę” again.
    assert.equal(loopButton(members(page.root)[0]).disabled, true);
    await press(buttonLabelled(page.root, "Zatrzymaj: Ala"));
    assert.deepEqual(loopStand(members(page.root)[0]), ORDINARY);
    assert.ok(
      resultOf(members(page.root)[0]),
      "the result stands until the player leaves the card",
    );
  });
});

// D-243: only a result from the button of a judging counts as seen. A result a first click of
// „Puść w pętlę” left under the character, its second click pressed and the loop stopped, is no such result:
// the next click of „Puść w pętlę” whose judging gives the same twelve rows waits for „Puść mimo to”.
test("a result left under the character by an earlier „Puść w pętlę” is no result of the button of a judging: the same rows wait for the second click again", async () => {
  // decision: D-243 "The judging of „Puść w pętlę” takes what the earning loop would take from the chest at that moment, and the earning loop starts at once where it solves all twelve seeds, or where it gives each seed the same line as the result of the button of a judging (D-329) that stands under the character."
  // decision: D-243 "Otherwise the new result stands under the character in place of the one that stood there, „Na {k} z 12 ziaren program mapy nie rozwiązuje.” stands above the button in `warning`, the button reads „Puść mimo to”, and a second click starts the earning loop."
  await withPage(async (page) => {
    const idle = solved(teamOf("Ala"));
    const looping = { ...idle, loops: { 1: LOOP } };
    const { calls } = await mount(page, propsOf(idle, "forest"), {
      judge: () => MIXED,
      startLoop: (shown) => shown.update(propsOf(looping, "forest")),
      stop: (shown) => shown.update(propsOf(idle, "forest")),
    });
    const ala = () => members(page.root)[0];
    const names = () => calls.map(([name]) => name);

    await press(loopButton(ala()));
    await until(() => countOf(calls, "judge") === 1);
    assert.deepEqual(loopStand(ala()), SECOND_CLICK);
    await press(loopButton(ala()));
    await press(buttonLabelled(page.root, "Zatrzymaj: Ala"));
    assert.ok(resultOf(ala()), "the result of the first click still stands");
    assert.deepEqual(loopStand(ala()), ORDINARY);

    await press(loopButton(ala()));
    await until(() => countOf(calls, "judge") === 2);
    assert.deepEqual(
      names(),
      ["judge", "startLoop", "stop", "judge"],
      "the same rows start no earning loop: the result that stood came from „Puść w pętlę”",
    );
    assert.deepEqual(loopStand(ala()), SECOND_CLICK);

    await press(loopButton(ala()));
    assert.deepEqual(
      names().slice(4),
      ["startLoop"],
      "the second click starts it",
    );
  });
});

// D-243: the waiting second click goes with what makes the result go; the chest changing alone is no
// such thing, for the second click starts the loop on what the chest holds then.
test("the waiting second click goes where another program is picked, a new judging is made or the player leaves the card, and stays where the chest or the time changes alone", async () => {
  // decision: D-243 "Otherwise the new result stands under the character in place of the one that stood there, „Na {k} z 12 ziaren program mapy nie rozwiązuje.” stands above the button in `warning`, the button reads „Puść mimo to”, and a second click starts the earning loop."
  await withPage(async (page) => {
    const state = solved(createProgram(teamOf("Ala")).state);
    const [first, second] = state.programs;
    const answers = [];
    const { screen, calls } = await mount(page, propsOf(state, "forest"), {
      judge: () => answers.shift(),
      pick: (shown, characterId, programId) =>
        shown.update(
          propsOf(
            { ...state, pickedPrograms: { [characterId]: programId } },
            "forest",
          ),
        ),
    });
    const ala = () => members(page.root)[0];
    /** The first click with `answer` as the result of the judging, awaited until the page has judged. */
    const clickLoop = async (answer) => {
      answers.push(answer);
      const before = countOf(calls, "judge");
      await press(loopButton(ala()));
      await until(() => countOf(calls, "judge") === before + 1);
    };

    await clickLoop(MIXED);
    assert.deepEqual(loopStand(ala()), SECOND_CLICK);

    // The chest and the time change: the second click stays, with the result.
    await inAct(() =>
      screen.update(
        propsOf(withChest(state, { stick: 3 }), "forest", NOW + HOUR),
      ),
    );
    assert.deepEqual(loopStand(ala()), SECOND_CLICK);
    assert.ok(resultOf(ala()));

    // Another program picked on the list: the result and the second click go, and they stay gone.
    const list = page.root.querySelector('select[aria-label="Program: Ala"]');
    await inAct(() => {
      list.value = String(second.id);
      fire(list, "change");
    });
    assert.deepEqual(loopStand(ala()), ORDINARY);
    assert.equal(resultOf(ala()), null);
    await inAct(() => {
      list.value = String(first.id);
      fire(list, "change");
    });
    assert.deepEqual(
      loopStand(ala()),
      ORDINARY,
      "picked back it is not asked again",
    );

    // A new judging by the button of a judging replaces the result: no second click is left.
    await clickLoop(MIXED);
    assert.deepEqual(loopStand(ala()), SECOND_CLICK);
    answers.push(judgedOf());
    await press(judgeButton(ala()));
    await until(() => countOf(calls, "judge") === 3);
    assert.deepEqual(loopStand(ala()), ORDINARY);
    assert.equal(
      text(resultOf(ala()), ".judging-heading"),
      "Ocena na 12 ziarnach: 12 z 12 rozwiązanych",
    );
    assert.equal(countOf(calls, "startLoop"), 0, "no earning loop was started");

    // Leaving the card: coming back finds neither.
    await clickLoop(MIXED);
    assert.deepEqual(loopStand(ala()), SECOND_CLICK);
    await inAct(() => screen.update(propsOf(state, "forestDeep")));
    await inAct(() => screen.update(propsOf(state, "forest")));
    assert.deepEqual(loopStand(ala()), ORDINARY);
    assert.equal(resultOf(ala()), null);
  });
});

// D-243: a result with a failure that stands from the button of a judging does not count as
// seen: „Puść w pętlę” judges anew, starts at once on the same result and waits on a different one.
test("where a result with a failure already stands under the character, „Puść w pętlę” judges anew, starts at once on the same twelve rows and waits for the second click on a different result", async () => {
  // decision: D-243 "The judging of „Puść w pętlę” takes what the earning loop would take from the chest at that moment, and the earning loop starts at once where it solves all twelve seeds, or where it gives each seed the same line as the result of the button of a judging (D-329) that stands under the character."
  // decision: D-243 "Otherwise the new result stands under the character in place of the one that stood there, „Na {k} z 12 ziaren program mapy nie rozwiązuje.” stands above the button in `warning`, the button reads „Puść mimo to”, and a second click starts the earning loop."
  await withPage(async (page) => {
    const state = solved(teamOf("Ala", "Bob"));
    const answers = [];
    const { calls } = await mount(page, propsOf(state, "forest"), {
      judge: () => answers.shift(),
    });
    const at = (index) => members(page.root)[index];
    const judgeWith = async (button, answer, count) => {
      answers.push(answer);
      await press(button);
      await until(() => countOf(calls, "judge") === count);
    };
    const heading = (index) => text(at(index), ".judging-heading");

    // Bob's result stands from the button of a judging, Ala's from nowhere: a result at another
    // character is no result seen at this one.
    await judgeWith(judgeButton(at(1)), MIXED, 1);
    await judgeWith(loopButton(at(0)), MIXED, 2);
    assert.equal(countOf(calls, "startLoop"), 0, "Bob's result is not Ala's");
    assert.deepEqual(loopStand(at(0)), SECOND_CLICK);
    assert.equal(heading(0), "Ocena na 12 ziarnach: 8 z 12 rozwiązanych");

    // The button of a judging replaces Ala's result with one of its own, which asks for no second click.
    await judgeWith(judgeButton(at(0)), MIXED, 3);
    assert.deepEqual(loopStand(at(0)), ORDINARY, "the second click went");

    // The same twelve rows: the earning loop starts at once, and the result stays.
    await judgeWith(
      loopButton(at(0)),
      judgedOf(...MIXED.results.slice(0, 4)),
      4,
    );
    await until(() => countOf(calls, "startLoop") === 1);
    assert.deepEqual(calls.at(-2), [
      "judge",
      1,
      "forest",
      state.programs[0].id,
    ]);
    assert.deepEqual(calls.at(-1), [
      "startLoop",
      1,
      "forest",
      state.programs[0].id,
    ]);
    assert.deepEqual(loopStand(at(0)), ORDINARY);
    assert.equal(heading(0), "Ocena na 12 ziarnach: 8 z 12 rozwiązanych");

    // A different result (a death a minute later): it replaces the one that stands and waits.
    const other = judgedOf(
      death("cold", 38),
      death("hunger", 412),
      death("combat", 5),
      UNDECIDED,
    );
    await judgeWith(judgeButton(at(0)), MIXED, 5);
    await judgeWith(loopButton(at(0)), other, 6);
    assert.equal(countOf(calls, "startLoop"), 1, "no new start");
    assert.deepEqual(loopStand(at(0)), SECOND_CLICK);
    assert.equal(
      text(at(0), ".judging-row"),
      "Ziarno 1: mag zamarzł w 38. minucie",
      "the new result stands in place of the old",
    );
    assert.equal(all(page.root, ".judging-result").length, 2);

    // A different result where the old one failed and the new one solves all twelve: no failure, so no wait.
    await judgeWith(judgeButton(at(1)), MIXED, 7);
    await judgeWith(loopButton(at(1)), judgedOf(), 8);
    await until(() => countOf(calls, "startLoop") === 2);
    assert.equal(loopSentence(at(1)), null);
    assert.equal(
      resultOf(at(1)),
      null,
      "the result that stood is gone where the new judging solves all twelve seeds",
    );
  });
});

// D-243 (the styleguide's rule "Focus does not fall to the page"): the button that turns inactive while
// „Puść w pętlę” judges gets the focus back as „Puść mimo to”; a focus the player moved meanwhile stays.
test("the focus stays on „Puść w pętlę” through its judging and comes back to it as „Puść mimo to”, and a focus that stood elsewhere at the click is not taken", async () => {
  // decision: D-243 "Otherwise the new result stands under the character in place of the one that stood there, „Na {k} z 12 ziaren program mapy nie rozwiązuje.” stands above the button in `warning`, the button reads „Puść mimo to”, and a second click starts the earning loop."
  await withPage(async (page) => {
    const state = solved(teamOf("Ala", "Bob"));
    const { document } = page;
    const { calls } = await mount(page, propsOf(state, "forest"), {
      judge: () => MIXED,
    });
    const [ala, bob] = members(page.root);
    loopButton(ala).focus();
    await press(loopButton(ala));
    assert.equal(loopButton(ala).disabled, true);
    await until(() => calls.length === 1);
    assert.equal(
      document.activeElement,
      loopButton(members(page.root)[0]),
      "the focus is on the button again, which now reads „Puść mimo to”",
    );

    // Bob's click leaves the focus on his list: the judging that ends there does not take it.
    const bobsList = bob.querySelector("select");
    bobsList.focus();
    await press(loopButton(members(page.root)[1]));
    await until(() => calls.length === 2);
    assert.equal(document.activeElement, bobsList);
  });
});

// D-407: the wait lives in the screen: one taken down while „Puść w pętlę” judges asks the page for nothing.
test("a screen taken down while „Puść w pętlę” judges never asks the page to judge or to start the earning loop", async () => {
  // decision: D-243 "The judging of „Puść w pętlę” takes what the earning loop would take from the chest at that moment, and the earning loop starts at once where it solves all twelve seeds, or where it gives each seed the same line as the result of the button of a judging (D-329) that stands under the character."
  await withPage(async (page) => {
    const { screen, calls } = await mount(
      page,
      propsOf(solved(teamOf("Ala")), "forest"),
      { judge: () => judgedOf() },
    );
    await press(loopButton(members(page.root)[0]));
    await inAct(() => screen.dispose());
    await inAct(async () => {
      await new Promise((resolve) => setTimeout(resolve, 80));
    });
    assert.deepEqual(calls, []);
  });
});

// D-243, D-329: a click acts on the map of the card it was made on. The player who opens another map
// before the judging is made has left that card, as one who leaves the screen, so the click asks the page
// for nothing and the buttons of the new card wait for nothing.
test("a click whose judging is not yet made when another map of the list opens asks the page to judge nothing and starts no earning loop", async () => {
  // decision: D-243 "The player starts an earning loop with „Puść w pętlę”, which stands at each character in the section „Kto idzie” of the card of each solved map, beside „Wejdź”, and takes the program of that character's list „Program:”, which its click first judges anew (D-439)."
  await withPage(async (page) => {
    const state = solved(teamOf("Ala"));
    const { screen, calls } = await mount(page, propsOf(state, "forest"), {
      judge: () => judgedOf(),
    });
    const ala = members(page.root)[0];
    await press(loopButton(ala));
    await press(judgeButton(ala));
    await inAct(() => screen.update(propsOf(state, "forestEdge")));
    await inAct(async () => {
      await new Promise((resolve) => setTimeout(resolve, 80));
    });
    assert.deepEqual(calls, []);
    const onEdge = members(page.root)[0];
    assert.deepEqual(loopStand(onEdge), ORDINARY);
    assert.equal(loopButton(onEdge).disabled, false);
    assert.equal(judgeButton(onEdge).textContent, "Oceń na 12 ziarnach");
    assert.equal(judgeButton(onEdge).disabled, false);
  });
});

// The styleguide's rule „The screen Mapy”: the sentence over „Puść mimo to” is `warning` and the button
// the plain shared one. jsdom resolves no custom property, so the case reads the token the rule lands on.
test("the sentence over „Puść mimo to” takes the role warning from the stylesheet, and the button keeps the plain look", async () => {
  // decision: D-243 "Otherwise the new result stands under the character in place of the one that stood there, „Na {k} z 12 ziaren program mapy nie rozwiązuje.” stands above the button in `warning`, the button reads „Puść mimo to”, and a second click starts the earning loop."
  await withPage(async (page) => {
    const style = page.document.createElement("style");
    style.textContent = gameStylesheetText();
    page.document.head.append(style);
    const { calls } = await mount(
      page,
      propsOf(solved(teamOf("Ala")), "forest"),
      { judge: () => MIXED },
    );
    await press(loopButton(members(page.root)[0]));
    await until(() => calls.length === 1);
    const ala = members(page.root)[0];
    const colourOf = (element) => page.window.getComputedStyle(element).color;
    assert.equal(colourOf(loopSentence(ala)), "var(--warning)");
    assert.equal(
      colourOf(loopButton(ala)),
      colourOf(judgeButton(ala)),
      "as plain as the button of a judging beside it",
    );
  });
});

// D-243: the click acts on the state at its moment through the act of the store, as the button of a
// judging does; the second click is a start of the store and judges nothing.
test("the entry judges and remembers through one act of the store at the first click, starts the loop where the judging solves all twelve, and at the second click starts it with no judging", async () => {
  // decision: D-409 "An act of the player that depends on the passing of time goes through the store of the game state, which reads the clock and passes the time elapsed to the simulation before the act runs, so no act reads the clock itself before it calls the simulation."
  // decision: D-440 "A judging, the one „Puść w pętlę” runs included (D-243), replaces the judging remembered for its character, program and map."
  await withPage(async (page) => {
    let state = solved(teamOf("Ala"));
    const log = [];
    const store = {
      get: () => state,
      moment: () => NOW,
      act(body) {
        log.push("act");
        body((result) => {
          state = result.state;
        });
      },
      send: () => log.push("send"),
      startLoop: (ids) => log.push(["startLoop", ids]),
    };
    let instance = null;
    await inAct(() => {
      instance = createMapsEntry({ store }).build(
        {
          current: () => ({ kind: "map", mapId: "forest" }),
          show() {},
          focusShown() {},
          focusIfLost() {},
        },
        { kind: "map", mapId: "forest" },
      );
      page.root.append(instance.element);
    });
    const programId = state.programs[0].id;
    await press(loopButton(members(page.root)[0]));
    await until(() => log.length > 0);
    const remembered = state.judgings[1][programId].forest;
    const unsolvedSeeds = remembered.results.filter(
      (result) => result.kind !== "solved",
    ).length;
    assert.ok(
      unsolvedSeeds > 0,
      "precondition: the default program does not solve all twelve seeds of Las",
    );
    assert.deepEqual(
      log,
      ["act"],
      "one act judges and remembers, nothing starts",
    );
    assert.equal(remembered.results.length, 12);
    assert.equal(
      text(members(page.root)[0], ".maps-who-program .maps-who-mark"),
      `${12 - unsolvedSeeds} z 12`,
      "the judging is remembered beside the list",
    );
    assert.deepEqual(loopStand(members(page.root)[0]), {
      text: "Puść mimo to",
      sentence: `Na ${unsolvedSeeds} z 12 ziaren program mapy nie rozwiązuje.`,
    });

    await press(loopButton(members(page.root)[0]));
    assert.deepEqual(
      log,
      ["act", ["startLoop", { mapId: "forest", characterId: 1, programId }]],
      "the second click is a start of the store and no judging",
    );
    await inAct(() => instance.dispose());
  });
});

// --- focus and the screen's life -----------------------------------------------------------

// The button that was pressed turns inactive or leaves, so the focus goes to its neighbour. „Puść w
// pętlę” judges first (D-243), so the loop starts, and „Zatrzymaj” stands, after the judging.
test("after „Puść w pętlę” the focus goes to that character's „Zatrzymaj”, and after „Zatrzymaj” to its „Wejdź”", async () => {
  await withPage(async (page) => {
    const idle = solved(teamOf("Ala", "Bob"));
    const looping = { ...idle, loops: { 1: LOOP } };
    const { document } = page;
    const { screen } = await mount(page, propsOf(idle, "forest"), {
      judge: () => judgedOf(),
      startLoop: (shown) => shown.update(propsOf(looping, "forest")),
      stop: (shown) => shown.update(propsOf(idle, "forest")),
    });
    const loop = buttonLabelled(page.root, "Puść w pętlę: Ala, mapa Las");
    loop.focus();
    assert.equal(document.activeElement, loop);
    await press(loop);
    await until(
      () => buttonLabelled(page.root, "Zatrzymaj: Ala") !== undefined,
    );
    const stop = buttonLabelled(page.root, "Zatrzymaj: Ala");
    assert.ok(stop, "„Zatrzymaj” stands once the earning loop runs");
    assert.equal(document.activeElement, stop);
    await press(stop);
    assert.equal(
      document.activeElement,
      buttonLabelled(page.root, "Wejdź: Ala, mapa Las"),
    );
    // A later draw does not pull the focus back.
    const bobsList = page.root.querySelector(
      'select[aria-label="Program: Bob"]',
    );
    bobsList.focus();
    await inAct(() => screen.update(propsOf(idle, "forest", NOW + MINUTE)));
    assert.equal(document.activeElement, bobsList);
  });
});

// The styleguide's rule "Focus does not fall to the page" gives the focus back only where the pressed
// button held it: the earning loop the judging starts at once takes no focus that stood elsewhere at the
// click, as the judging that does not start takes none.
test("an earning loop that „Puść w pętlę” starts at once takes no focus that stood elsewhere at the click", async () => {
  await withPage(async (page) => {
    const idle = solved(teamOf("Ala", "Bob"));
    const looping = { ...idle, loops: { 1: LOOP } };
    const { document } = page;
    await mount(page, propsOf(idle, "forest"), {
      judge: () => judgedOf(),
      startLoop: (shown) => shown.update(propsOf(looping, "forest")),
    });
    const bobsList = page.root.querySelector(
      'select[aria-label="Program: Bob"]',
    );
    bobsList.focus();
    await press(buttonLabelled(page.root, "Puść w pętlę: Ala, mapa Las"));
    await until(
      () => buttonLabelled(page.root, "Zatrzymaj: Ala") !== undefined,
    );
    assert.equal(document.activeElement, bobsList);
  });
});

// D-243 (the styleguide's rule "Focus does not fall to the page"): the page's store redraws the other
// screens with `flushSync` while it starts the earning loop, and that flush takes the screen's own queued
// updates with it, so the second click must not leave an update queued before the loop is drawn.
test("the focus goes to „Zatrzymaj” after the second click, „Puść mimo to”, also where starting the earning loop redraws another screen on its way", async () => {
  // decision: D-243 "Otherwise the new result stands under the character in place of the one that stood there, „Na {k} z 12 ziaren program mapy nie rozwiązuje.” stands above the button in `warning`, the button reads „Puść mimo to”, and a second click starts the earning loop."
  await withPage(async (page) => {
    const idle = solved(teamOf("Ala", "Bob"));
    const looping = { ...idle, loops: { 1: LOOP } };
    const { document } = page;
    const host = document.createElement("div");
    page.root.append(host);
    const other = createRoot(host);
    const { calls } = await mount(page, propsOf(idle, "forest"), {
      judge: () => MIXED,
      startLoop: (shown) => {
        // What the store does on its way: it redraws another root synchronously, which flushes what
        // the maps screen has queued, before it draws the maps screen itself.
        flushSync(() => other.render(createElement("p", null, "redrawn")));
        shown.update(propsOf(looping, "forest"));
      },
    });
    const loop = buttonLabelled(page.root, "Puść w pętlę: Ala, mapa Las");
    loop.focus();
    await press(loop);
    await until(() => calls.length === 1);
    const second = buttonLabelled(page.root, "Puść mimo to: Ala, mapa Las");
    assert.ok(second, "precondition: the second click stands");
    second.focus();
    await press(second);
    assert.equal(countOf(calls, "startLoop"), 1);
    assert.equal(
      document.activeElement,
      buttonLabelled(page.root, "Zatrzymaj: Ala"),
      "the focus is on „Zatrzymaj”, not on the page",
    );
  });
});

// Another character's manual map run keeps „Wejdź” inactive after the stop, which no focus can reach.
test("after „Zatrzymaj” with „Wejdź” inactive the focus goes to the character's list „Program:”", async () => {
  await withPage(async (page) => {
    const base = solved(teamOf("Ala", "Bob"));
    const running = send(base, { mapId: "forest", characterId: 2 }, 1).state;
    const looping = { ...running, loops: { 1: LOOP } };
    const { document } = page;
    await mount(page, propsOf(looping, "forest"), {
      stop: (shown) => shown.update(propsOf(running, "forest")),
    });
    await press(buttonLabelled(page.root, "Zatrzymaj: Ala"));
    assert.equal(
      document.activeElement,
      page.root.querySelector('select[aria-label="Program: Ala"]'),
    );
  });
});

test("update draws the screen anew and keeps the controls, focus, and dispose takes the screen out of the page", async () => {
  await withPage(async (page) => {
    const state = solved(teamOf("Ala"));
    const { screen } = await mount(page, propsOf(state, "forest"));
    const list = page.root.querySelector("select");
    const enter = buttonLabelled(page.root, "Wejdź: Ala, mapa Las");
    await inAct(() => screen.update(propsOf(state, "forest", NOW + HOUR)));
    assert.equal(
      page.root.querySelector("select"),
      list,
      "the same list stays",
    );
    assert.equal(
      buttonLabelled(page.root, "Wejdź: Ala, mapa Las"),
      enter,
      "the same button stays",
    );
    await inAct(() => screen.focus());
    assert.equal(page.document.activeElement, screen.element);
    await inAct(() => screen.dispose());
    assert.equal(page.root.querySelector(".maps-who"), null);
    assert.equal(screen.element.isConnected, false);
    // An update after the disposal draws nothing and fails nothing.
    await inAct(() => screen.update(propsOf(state, "forest")));
    assert.equal(screen.element.querySelector(".maps-who"), null);
  });
});
