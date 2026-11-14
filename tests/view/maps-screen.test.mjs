// The screen Mapy (D-325 to D-331, D-134, D-149, D-170, D-188, D-217, D-243, D-244, D-251, D-274,
// D-282, D-287, D-326) on jsdom through tests/view/page-document.mjs (D-264): the list of open
// maps, the area on the right with no map named and with one, the card of a map from the data, the
// section „Kto idzie” with each character's lines and buttons, and what the buttons hand the page.
// Real focus order and rendering are the browser check's (D-88), so a focus case here holds only
// what jsdom shows.
import { assert, fire, inAct, press, withPage } from "./page-document.mjs";
import { test } from "node:test";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import {
  advanceMinutes,
  createCharacter,
  newGame,
  send,
  setPaused,
} from "../../dist/browser/sim/game.js";
import { createProgram } from "../../dist/browser/sim/programs.js";
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

const withCharacter = (state, index, fields) => ({
  ...state,
  team: {
    ...state.team,
    characters: state.team.characters.map((character, at) =>
      at === index ? { ...character, ...fields } : character,
    ),
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
    ["pick", "enter", "startLoop", "stop"].map((name) => [
      name,
      (...values) => {
        calls.push([name, ...values]);
        reaction[name]?.(screen, ...values);
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
    assert.equal(
      lurking.querySelector("img, .icon-mask"),
      null,
      "the creature stands with no icon",
    );
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
    assert.equal(text(ala, ".maps-who-resurrection"), "Wskrzeszenie gotowe");
    assert.equal(
      ala.querySelector(".maps-who-resurrection").classList.contains("danger"),
      false,
    );
    assert.equal(text(ala, ".maps-who-program-label"), "Program:");
    assert.equal(text(ala, ".maps-who-enters"), "Wejdzie: patyk 6, jagoda 4");
    assert.deepEqual(kinds(ala.querySelector(".maps-who-actions")), [
      "maps-who-enter",
      "maps-who-loop-start",
    ]);
  });
});

// D-217: the resurrection line of a character not ready reads the time left, in danger.
test("a resurrection not ready reads the time left in danger and turns ready with the clock", async () => {
  await withPage(async (page) => {
    const readyAt = NOW + 8 * HOUR;
    const state = withCharacter(teamOf("Ala", "Bob"), 0, {
      resurrectionReadyAtMs: readyAt,
    });
    const { screen } = await mount(page, propsOf(state, "forest"));
    const lines = () => all(page.root, ".maps-who-resurrection");
    assert.equal(
      lines()[0].textContent,
      `Wskrzeszenie za 8 godz. 0 min czasu realnego${WARNING}`,
    );
    assert.ok(lines()[0].classList.contains("danger"));
    assert.equal(lines()[1].textContent, "Wskrzeszenie gotowe");
    assert.equal(lines()[1].classList.contains("danger"), false);
    await inAct(() => screen.update(propsOf(state, "forest", readyAt)));
    assert.equal(lines()[0].textContent, "Wskrzeszenie gotowe");
    assert.equal(lines()[0].classList.contains("danger"), false);
  });
});

// D-170: the list shows the program of the row, in the list's order, and a change hands the page
// the character and the program picked.
test("the list „Program:” shows the program of the row in the order of the player's list and a change hands the page the pick", async () => {
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

// D-180, D-329: „Wejdzie: …” stands always; it is what the send takes, cut by the chest at a map not
// yet solved and from nowhere at a solved one.
test("„Wejdzie: …” is what a send takes: from the chest at an unsolved map, from nowhere at a solved one, and „nic” where it takes none", async () => {
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
      screen.update(propsOf(solved(withChest(bare, {})), "forest")),
    );
    assert.equal(
      entering(),
      "Wejdzie: patyk 6, jagoda 4",
      "a solved map takes from nowhere",
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
// at a solved map; both act with the program the row shows.
test("„Wejdź” is the main button at each map, „Puść w pętlę” the plain one at a solved map alone, and both hand the page the row's program", async () => {
  await withPage(async (page) => {
    const unsolved = teamOf("Ala");
    const { screen, calls } = await mount(page, propsOf(unsolved, "forest"));
    const enter = buttonLabelled(page.root, "Wejdź: Ala, mapa Las");
    assert.equal(enter.textContent, "Wejdź");
    assert.ok(enter.classList.contains("main"), "the main look");
    assert.equal(enter.getAttribute("type"), "button", "it submits no form");
    assert.equal(
      buttonLabelled(page.root, "Puść w pętlę: Ala, mapa Las"),
      undefined,
      "a map not yet solved has no loop",
    );
    await press(enter);
    const programId = unsolved.programs[0].id;
    assert.deepEqual(calls, [["enter", 1, "forest", programId]]);
    await inAct(() => screen.update(propsOf(solved(unsolved), "forest")));
    const loop = buttonLabelled(page.root, "Puść w pętlę: Ala, mapa Las");
    assert.equal(loop.textContent, "Puść w pętlę");
    assert.equal(loop.className, "button", "the plain button");
    await press(loop);
    assert.deepEqual(calls[1], ["startLoop", 1, "forest", programId]);
    assert.equal(calls.length, 2);
  });
});

// D-326: an empty list „Wynieś” says so beside „Puść w pętlę” in warning, and the button acts.
test("an empty list „Wynieś” puts „Pętla nic nie zarobi do skrzynki” beside „Puść w pętlę”, which still acts", async () => {
  await withPage(async (page) => {
    const empty = solved(teamOf("Ala"));
    const { screen, calls } = await mount(page, propsOf(empty, "forest"));
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
    assert.equal(calls.length, 1);
    await inAct(() =>
      screen.update(
        propsOf(
          withPlan(empty, { take: [], bring: [{ item: "stick", count: 1 }] }),
          "forest",
        ),
      ),
    );
    assert.equal(page.root.querySelector(".maps-who-empty-loop"), null);
    // At a map not yet solved there is no loop, so there is no mark either.
    await inAct(() => screen.update(propsOf(teamOf("Ala"), "forest")));
    assert.equal(page.root.querySelector(".maps-who-empty-loop"), null);
  });
});

// D-251: the rehearsal mark stands under „Wejdź” at a solved map when the clipped take exceeds the chest.
test("a rehearsal the loop cannot repeat is marked under „Wejdź” at a solved map alone", async () => {
  await withPage(async (page) => {
    const plan = { take: [{ item: "stick", count: 3 }], bring: [] };
    const state = withChest(withPlan(teamOf("Ala"), plan), { stick: 2 });
    const { screen } = await mount(page, propsOf(solved(state), "forest"));
    const mark = page.root.querySelector(".rehearsal-mark");
    assert.equal(
      mark.textContent,
      "Próba weźmie zapas, którego nie ma w skrzynce — pętla zarobkowa go nie dostanie.",
    );
    const enter = buttonLabelled(page.root, "Wejdź: Ala, mapa Las");
    assert.equal(mark.parentElement, enter.parentElement);
    assert.deepEqual(kinds(mark.parentElement), ["button", "rehearsal-mark"]);
    await inAct(() => screen.update(propsOf(state, "forest")));
    assert.equal(
      page.root.querySelector(".rehearsal-mark"),
      null,
      "at a map not yet solved the mark is not drawn",
    );
    await inAct(() =>
      screen.update(propsOf(solved(withChest(state, { stick: 3 })), "forest")),
    );
    assert.equal(
      page.root.querySelector(".rehearsal-mark"),
      null,
      "a chest that holds the take list leaves no mark",
    );
  });
});

// D-243, D-244: a character in an earning loop shows its line with „Zatrzymaj”, which acts, and
// both sending buttons stand inactive; the line of a stopped loop does not stand here (D-245).
test("a character in an earning loop shows its line and „Zatrzymaj”, its sending buttons stand inactive, and no stopped-loop line stands", async () => {
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
    // Bob is not in a loop: his buttons act and no loop line stands at him.
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
        "the loop of the run's character is inactive",
      );
      assert.equal(
        buttonLabelled(page.root, "Puść w pętlę: Bob, mapa Las").disabled,
        false,
        "another character can still start its loop",
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

// --- focus and the screen's life -----------------------------------------------------------

// The button that was pressed turns inactive or leaves, so the focus goes to its neighbour.
test("after „Puść w pętlę” the focus goes to that character's „Zatrzymaj”, and after „Zatrzymaj” to its „Wejdź”", async () => {
  await withPage(async (page) => {
    const idle = solved(teamOf("Ala", "Bob"));
    const looping = { ...idle, loops: { 1: LOOP } };
    const { document } = page;
    const { screen } = await mount(page, propsOf(idle, "forest"), {
      startLoop: (shown) => shown.update(propsOf(looping, "forest")),
      stop: (shown) => shown.update(propsOf(idle, "forest")),
    });
    const loop = buttonLabelled(page.root, "Puść w pętlę: Ala, mapa Las");
    loop.focus();
    assert.equal(document.activeElement, loop);
    await press(loop);
    const stop = buttonLabelled(page.root, "Zatrzymaj: Ala");
    assert.ok(stop, "„Zatrzymaj” stands once the loop runs");
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
