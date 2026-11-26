// The screen Postać (D-445, D-446, D-447, D-199, D-200, D-217, D-244, D-245, D-287) on jsdom through
// tests/view/page-document.mjs (D-264): which elements the screen builds, what it shows of the game
// state and of the moment, what its purchase and stop hand to the page, and which buttons refuse.
// Real focus order, rendering and motion are the browser check's (D-88), so a focus case here holds
// only what jsdom shows, and a colour case reads which token a rule of the real stylesheet lands on.
import { assert, inAct, press, withPage } from "./page-document.mjs";
import { gameStylesheetText } from "./game-stylesheets.mjs";
import { test } from "node:test";
import {
  ARCHETYPES,
  CREATED_ARCHETYPE,
} from "../../dist/browser/sim/data/archetypes.js";
import {
  advanceMinutes,
  createCharacter,
  newGame,
  send,
  setPaused,
} from "../../dist/browser/sim/game.js";
import { buyBranch } from "../../dist/browser/sim/skills.js";
import { CHARACTER_FIGURE } from "../../dist/browser/sim/data/scene.js";
import { campDrawing } from "../../dist/browser/view/camp-picture.js";
import { createCharacterScreen } from "../../dist/browser/view/character-screen.js";
import { withEdgeSolved } from "../sim/understanding-fixture.mjs";

// --- the page ------------------------------------------------------------------------------

const NOW = 1_800_000_000_000;
const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const WARNING = " — śmierć zabierze wprawę i wykupione stopnie";
const ID = 1;

/** The new game's state with its one character, the character's fields given over it. */
function stateWith(character = {}, patch = {}) {
  const base = createCharacter(withEdgeSolved(newGame()), "Ala").state;
  return {
    ...base,
    team: {
      ...base.team,
      characters: [{ ...base.team.characters[0], ...character }],
    },
    ...patch,
  };
}

/**
 * The new game's team with `spent` uses of its one resurrection not yet returned, the next of them
 * returning at the real moment `nextMs`.
 */
function teamWithUses(spent, nextMs) {
  const { team } = stateWith();
  return {
    ...team,
    resurrectionUsesSpent: spent,
    resurrectionNextReturnAtMs: nextMs,
  };
}

/** A state where the player knows the tree of exploration, with 100 practice in it. */
function knowingExploration(extra = {}) {
  return stateWith(
    {
      skills: {
        exploration: { practice: 100, ranks: {} },
        smallItemGathering: { practice: 160, ranks: {} },
      },
      ...extra,
    },
    {},
  );
}

const withTrees = (state, trees) => ({
  ...state,
  understanding: { ...state.understanding, trees },
});

const propsOf = (state, nowMs = NOW) => ({ state, nowMs, characterId: ID });

/** Builds the screen in the page's body; `calls` counts what the screen handed the page. */
async function mount({ root }, props) {
  const calls = [];
  let screen = null;
  await inAct(() => {
    screen = createCharacterScreen({
      onBuy: (branch) => {
        calls.push(["buy", branch]);
      },
      onStop: () => {
        calls.push(["stop"]);
      },
      props,
    });
    root.append(screen.element);
  });
  return { screen, calls };
}

const all = (root, selector) => [...root.querySelectorAll(selector)];
const buttonLabelled = (root, label) =>
  all(root, "button").find(
    (button) => button.getAttribute("aria-label") === label,
  );
const text = (root, selector) => root.querySelector(selector)?.textContent;
const LOOP = {
  runNumber: 3,
  completed: 2,
  run: { mapId: "forest", minute: 212 },
};

/** Opens the tree whose fold the screen labels with the tree's name, by a click on that fold. */
const openTree = (root, name) => press(buttonLabelled(root, name));

/**
 * A property of an element as the game's stylesheets, laid on its page, give it: jsdom resolves the
 * cascade and leaves a custom property unresolved, so the value is the token a rule lands on.
 */
function computed(element, property) {
  const { document, getComputedStyle } = element.ownerDocument.defaultView;
  if (!document.querySelector("style[data-test-styles]")) {
    const style = document.createElement("style");
    style.setAttribute("data-test-styles", "");
    style.textContent = gameStylesheetText();
    document.head.append(style);
  }
  return getComputedStyle(element).getPropertyValue(property);
}

// --- the screen -----------------------------------------------------------------------------

// Catches a line of facts without the archetype's icon, an icon not taken from the archetype's data,
// facts out of the order the decision gives, a generation shown at 1, and the facts standing beside
// the figure or under the frame of what the character does instead of above it.
test("the screen names the character at the top of the left area, above the frame of what the character does, gives the generation from 2 up only, the archetype's icon from its data and the archetype's name, and the resurrection line under them", async () => {
  // decision: D-446 "At the top of the left area of the screen Postać, above the frame of what the character does (D-447), stand the character's name as the heading of the screen, under it one line with „pokolenie {n}” from generation number 2 up (D-218), the icon of the character's archetype and the archetype's name, and under that line the line of the resurrection (D-217)"
  // decision: D-446 "The icon of an archetype is an icon of game-icons.net (D-27) whose file the archetype's data names, and it stands before the archetype's name, drawn as a mask in the colour of that name"
  // decision: D-218 "The headquarters and the screen Postać show „pokolenie {n}” beside a character's name from generation number 2 up, in `text-secondary`"
  await withPage(async (page) => {
    const { screen } = await mount(page, propsOf(stateWith()));
    const area = page.root.querySelector(".character-identity");
    assert.deepEqual(
      [...area.children].map((child) => child.className),
      ["character-facts", "character-screen-status", "character-screen-gear"],
      "the facts first, above the frame of what the character does, and the figure's section after it",
    );
    assert.equal(
      area.querySelector(".character-facts .character-figure"),
      null,
      "the figure does not stand beside the name",
    );
    assert.equal(text(page.root, ".character-screen-name"), "Ala");
    const archetype = page.root.querySelector(".character-screen-archetype");
    assert.equal(archetype.textContent, ARCHETYPES[CREATED_ARCHETYPE].name);
    const icon = archetype.firstElementChild;
    assert.ok(icon.classList.contains("icon-mask"), "the icon is a mask");
    assert.equal(icon.getAttribute("aria-hidden"), "true");
    assert.equal(
      icon.style.getPropertyValue("--icon"),
      `url("/icons/${ARCHETYPES[CREATED_ARCHETYPE].icon}.svg")`,
    );
    const facts = page.root.querySelector(".character-facts");
    assert.deepEqual(
      [...facts.children].map((child) => child.className),
      [
        "character-screen-name",
        "character-screen-facts",
        "character-screen-resurrection",
      ],
    );
    assert.equal(page.root.querySelector(".character-screen-generation"), null);
    await inAct(() => screen.update(propsOf(stateWith({ generation: 2 }))));
    assert.equal(
      text(page.root, ".character-screen-generation"),
      "pokolenie 2",
    );
  });
});

// The readiness boundary is the simulation's; the wording is D-217.
// invariant: resurrection-renewal
test("the resurrection line reads the uses and the time to the next return, in danger at zero uses, and moves with each reading of the clock", async () => {
  // decision: D-217 "The card and the screen of a character, and that character in the section „Kto idzie” of the card of a map, show, from its creation, „Wskrzeszenie drużyny: użycia {u} z {c}” in `text-secondary` while the stock of uses is full, „Wskrzeszenie drużyny: użycia {u} z {c}, następne za {g} godz. {m} min czasu realnego” in `text-secondary` while the stock is not full and a use is left, and „Wskrzeszenie drużyny: użycia 0 z {c}, następne za {g} godz. {m} min czasu realnego — śmierć zabierze wprawę i wykupione stopnie” in `danger` at zero uses"
  await withPage(async (page) => {
    const nextAt = NOW + 8 * HOUR;
    const state = stateWith({}, { team: teamWithUses(3, nextAt) });
    const { screen } = await mount(page, propsOf(state));
    const line = () =>
      page.root.querySelector(".character-screen-resurrection");
    assert.equal(
      line().textContent,
      `Wskrzeszenie drużyny: użycia 0 z 3, następne za 8 godz. 0 min czasu realnego${WARNING}`,
    );
    assert.ok(line().classList.contains("danger"), "zero uses reads in danger");
    await inAct(() => screen.update(propsOf(state, nextAt - 30 * MINUTE)));
    assert.equal(
      line().textContent,
      `Wskrzeszenie drużyny: użycia 0 z 3, następne za 30 min czasu realnego${WARNING}`,
    );
    assert.ok(line().classList.contains("danger"));
    await inAct(() => screen.update(propsOf(state, nextAt)));
    assert.equal(
      line().textContent,
      "Wskrzeszenie drużyny: użycia 1 z 3, następne za 4 godz. 0 min czasu realnego",
    );
    assert.equal(line().classList.contains("danger"), false);
  });
});

test("a running earning loop shows its line with „Zatrzymaj”, which acts through onStop; a stopped earning loop shows its line in its place", async () => {
  // decision: D-244 "A running earning loop shows on the card and the screen of its character, and at that character in the section „Kto idzie” of the card of a map, as one line in the role `text`, „Pętla: {mapa} · przejście {n} · minuta {m} · domknięte {k}”, with the button „Zatrzymaj”"
  // decision: D-245 "„Zatrzymaj” is a destructive button that acts at once on the click: the items carried in the map run going on are lost, its loot stays out of the chest, the practice D-189 gives enters the character skills, and the character returns to its ordinary state"
  // decision: D-245 "On the character's card and screen, until the next send or start of that character and after a load of the saved game state too, stands in the role `text-secondary` „Pętla zatrzymana · wprawa: {umiejętność} +{n}, …”, or „Pętla zatrzymana” where the earning loop gathered no practice"
  await withPage(async (page) => {
    // The line reads the map, the run number, the minute and the runs completed of the earning loop.
    const loop = {
      runNumber: 3,
      completed: 2,
      run: { mapId: "forest", minute: 212 },
    };
    const { screen, calls } = await mount(
      page,
      propsOf(stateWith({}, { loops: { [ID]: loop } })),
    );
    assert.equal(
      text(page.root, ".character-screen-loop-line"),
      "Pętla: Las · przejście 3 · minuta 212 · domknięte 2",
    );
    const stop = buttonLabelled(page.root, "Zatrzymaj: Ala");
    assert.ok(stop, "„Zatrzymaj” stands beside a running earning loop");
    await press(stop);
    assert.deepEqual(calls, [["stop"]]);
    await inAct(() =>
      screen.update(
        propsOf(stateWith({}, { stoppedLoops: { [ID]: { eating: 4 } } })),
      ),
    );
    assert.equal(page.root.querySelector(".character-screen-loop"), null);
    assert.equal(buttonLabelled(page.root, "Zatrzymaj: Ala"), undefined);
    assert.equal(
      text(page.root, ".character-screen-stopped"),
      "Pętla zatrzymana · wprawa: Jedzenie +4",
    );
  });
});

// Catches the focus left on the page once „Zatrzymaj” takes its button away: the keyboard would then
// start the screen again from its top (styleguide, "Focus does not fall to the page").
test("after „Zatrzymaj” the focus stands on the character's name once its earning loop has stopped", async () => {
  await withPage(async (page) => {
    const loop = {
      runNumber: 3,
      completed: 2,
      run: { mapId: "forest", minute: 212 },
    };
    let screen = null;
    await inAct(() => {
      screen = createCharacterScreen({
        onBuy: () => {},
        // The page stops the earning loop and gives the screen the state at once.
        onStop: () =>
          screen.update(
            propsOf(stateWith({}, { stoppedLoops: { [ID]: { eating: 4 } } })),
          ),
        props: propsOf(stateWith({}, { loops: { [ID]: loop } })),
      });
      page.root.append(screen.element);
    });
    const stop = buttonLabelled(page.root, "Zatrzymaj: Ala");
    stop.focus();
    await press(stop);
    assert.equal(
      globalThis.document.activeElement,
      page.root.querySelector(".character-screen-name"),
    );
  });
});

// Catches a focus moved although the page refused the stop and the button stays where it stood.
test("a stop the page refuses leaves the focus on „Zatrzymaj”", async () => {
  await withPage(async (page) => {
    const loop = {
      runNumber: 3,
      completed: 2,
      run: { mapId: "forest", minute: 212 },
    };
    await mount(page, propsOf(stateWith({}, { loops: { [ID]: loop } })));
    const stop = buttonLabelled(page.root, "Zatrzymaj: Ala");
    stop.focus();
    await press(stop);
    assert.equal(globalThis.document.activeElement, stop);
  });
});

test("the section „Umiejętności” is absent before a tree is known, then shows the known tree's row alone", async () => {
  // decision: D-199 "The screen Postać shows the section „Umiejętności” after a tree is known, and before the first known tree the section is absent"
  await withPage(async (page) => {
    const state = knowingExploration();
    const { screen } = await mount(page, propsOf(withTrees(state, [])));
    assert.equal(page.root.querySelector(".character-screen-skills"), null);
    await inAct(() =>
      screen.update(propsOf(withTrees(state, ["exploration"]))),
    );
    assert.ok(
      page.root.querySelector(".character-screen-skills"),
      "the section stands",
    );
    assert.equal(all(page.root, ".character-screen-tree").length, 1);
  });
});

test("unknown trees are hidden, purchases update existing buttons and refuse unaffordable and maximum ranks", async () => {
  // decision: D-199 "Below an open tree each branch gives its name, rank and maximum rank, description from data and a „Kup” button disabled when points are insufficient or all ranks are bought; a numerical branch also gives „teraz {wartość} → po kupnie {wartość} · cena {cena}”, while „Obchód”, „Czysty płomień” and „Zwiad” give the price and omit numerical before-and-after values"
  // decision: D-200 "The player buys a branch rank with „Kup” on the screen Postać outside a manual map run, one that has ended counting as a map run until „Restart” or „Zakończ”, at a character in an earning loop too, and the rank acts from that character's next map run, the next map run of that earning loop included, while the map run going on keeps the skills of its start"
  // decision: D-379 "Each rank of a branch gives the effect below, and the ranks of a branch cost the points listed, in order"
  await withPage(async (page) => {
    let state = withTrees(knowingExploration(), ["exploration"]);
    const { screen, calls } = await mount(page, propsOf(state));
    await openTree(page.root, "Eksploracja");
    const scout = buttonLabelled(page.root, "Kup: Zwiad");
    const step = buttonLabelled(page.root, "Kup: Wprawny krok");
    assert.equal(scout.disabled, false, "3 points buy Zwiad at 3");
    assert.equal(step.disabled, false, "3 points buy Wprawny krok at 1");
    await press(scout);
    assert.deepEqual(calls, [["buy", "scout"]]);
    state = buyBranch(state, ID, "scout").state;
    await inAct(() => screen.update(propsOf(state)));
    assert.equal(
      buttonLabelled(page.root, "Kup: Zwiad"),
      scout,
      "the same button stays",
    );
    assert.equal(scout.disabled, true, "a maximum rank refuses");
    assert.equal(
      step.disabled,
      true,
      "the points left, none, refuse Wprawny krok",
    );
    assert.equal(
      scout.parentElement.querySelector("span").textContent,
      "Zwiad 1/1 — Odkrywa również sąsiednie pola",
    );
  });
});

// D-287 and D-200: while a manual map run waits or has ended, „Kup” is inactive whatever the points,
// and the section says why in one sentence.
test("„Kup” is inactive with the sentence under the heading beside a waiting map run and beside an ended one", async () => {
  // decision: D-287 "While the game state holds a manual map run that waits in a pause, or that has ended and waits for „Restart” or „Zakończ”, Siedziba, the screen Postać and the screen Mapy keep active what the simulation allows, while „Wejdź”, „Puść w pętlę” at that map run's character and „Kup” stand inactive"
  // decision: D-287 "Under the inactive buttons of each character in the section „Kto idzie” of the card of a map stands „Przejście na mapie {mapa} jest niezakończone. Wróć do niego i je zakończ, żeby wysłać postać.”, and at the section „Umiejętności” „Przejście na mapie {mapa} jest niezakończone"
  // decision: D-200 "The player buys a branch rank with „Kup” on the screen Postać outside a manual map run, one that has ended counting as a map run until „Restart” or „Zakończ”, at a character in an earning loop too, and the rank acts from that character's next map run, the next map run of that earning loop included, while the map run going on keeps the skills of its start"
  await withPage(async (page) => {
    const started = send(
      withTrees(knowingExploration(), ["exploration"]),
      { mapId: "forest", characterId: ID },
      1,
    ).state;
    const waiting = setPaused(started, true).state;
    const { screen } = await mount(page, propsOf(waiting));
    await openTree(page.root, "Eksploracja");
    const note = () => text(page.root, ".character-screen-skills-note");
    assert.equal(
      note(),
      "Przejście na mapie Las jest niezakończone. Stopnie kupisz po jego zakończeniu.",
    );
    assert.equal(buttonLabelled(page.root, "Kup: Zwiad").disabled, true);
    // The run dies of cold in game minute 243 and waits for „Zakończ”; a discovery pauses it on the
    // way, so the case resumes it until the death.
    let ended = started;
    for (let round = 0; round < 10 && ended.run.death === null; round += 1) {
      if (ended.paused) ended = setPaused(ended, false).state;
      ended = advanceMinutes(ended, 300).state;
    }
    assert.ok(ended.run.death !== null, "the run has ended by death");
    await inAct(() => screen.update(propsOf(ended)));
    assert.equal(
      note(),
      "Przejście na mapie Las jest niezakończone. Stopnie kupisz po jego zakończeniu.",
    );
    assert.equal(buttonLabelled(page.root, "Kup: Zwiad").disabled, true);
  });
});

test("a purchase leaves focus on its button, which stays buyable after it", async () => {
  // decision: D-200 "The player buys a branch rank with „Kup” on the screen Postać outside a manual map run, one that has ended counting as a map run until „Restart” or „Zakończ”, at a character in an earning loop too, and the rank acts from that character's next map run, the next map run of that earning loop included, while the map run going on keeps the skills of its start"
  // decision: D-379 "Each rank of a branch gives the effect below, and the ranks of a branch cost the points listed, in order"
  await withPage(async (page) => {
    let state = withTrees(knowingExploration(), ["exploration"]);
    const { screen, calls } = await mount(page, propsOf(state));
    await openTree(page.root, "Eksploracja");
    const step = buttonLabelled(page.root, "Kup: Wprawny krok");
    step.focus();
    assert.equal(globalThis.document.activeElement, step);
    await press(step);
    assert.deepEqual(calls, [["buy", "practicedStep"]]);
    state = buyBranch(state, ID, "practicedStep").state;
    await inAct(() => screen.update(propsOf(state)));
    assert.equal(
      step.disabled,
      false,
      "2 points left still buy the next rank at 1",
    );
    assert.equal(globalThis.document.activeElement, step);
  });
});

// --- the left area: the figure and the frame of what the character does ----------------------

// Catches a figure drawn from another sheet or at another scale than twice the character's in the
// picture band (the band draws a pixel of its pictures at 2 px, so the figure's pixel is 4 px), a
// figure still at the top of the area beside the name, a figure gone while the character is away from
// the camp, and a figure that takes the keyboard or holds text.
test("the figure stands in the section „Wyposażenie” under the frame of what the character does, drawn from the character's sheet in the picture band at twice its size, in the camp, in a map run and in an earning loop, a picture with no control and no text", async () => {
  // decision: D-445 "In the section „Wyposażenie” of the left area of the screen Postać, in the middle of the tiles of the slots of the gear (D-461), stands the figure of the character: the same picture as that character in the picture band of Siedziba (D-389), at twice its size, moving in the frames of its idle sheet at the scene's fixed beat with no loop of drawing and standing still under the system's setting for reduced motion"
  // decision: D-445 "It stands whatever the character does — in the camp, in a manual map run going, paused or ended, and in an earning loop — always in the same pose, with no clearing under it, on the flat background of its area"
  // decision: D-445 "It is a picture, not a control, taking no click and no key, hidden from readers of the screen, with no text on it or over it"
  // decision: D-272 "A picture of the game stands behind the login card, in a band at the top of Siedziba, as the scene and as the figure of a character at the top of the screen Postać, which stands with no clearing under it, on the flat background of its area, and text stands on a solid background, never on a picture"
  // decision: D-271 "The pictures in the picture band at the top of Siedziba, its clearing, fire, chest and characters, and the figure of a character on the screen Postać, are sprites of the pack Pixel Crawler kept there in the same way, the figure being the mage in the frames of its idle sheet, the picture a character of the band stands in, and the chest is one still picture whatever it holds"
  await withPage(async (page) => {
    const camp = stateWith();
    // The picture band draws the character, which is at the camp, from this sheet.
    const sheet = campDrawing(camp).members[0].idle;
    const { screen } = await mount(page, propsOf(camp));
    const figure = () => page.root.querySelector(".character-figure");
    const check = () => {
      const gear = page.root.querySelector(".character-screen-gear");
      assert.equal(gear.tagName, "SECTION");
      assert.equal(gear.querySelector("h3").textContent, "Wyposażenie");
      assert.ok(
        gear.contains(figure()),
        "the figure stands in the section „Wyposażenie”",
      );
      assert.equal(
        page.root.querySelectorAll(".character-figure").length,
        1,
        "and nowhere else",
      );
      assert.equal(
        figure().querySelector("img").getAttribute("src"),
        sheet.href,
      );
      // The band draws a pixel of its pictures at 2 px; the figure at twice that, 4 px.
      const sprite = figure().querySelector(".character-figure-sprite");
      assert.equal(sprite.style.width, `${sheet.width * 4}px`);
      assert.equal(sprite.style.height, `${sheet.height * 4}px`);
      assert.equal(figure().style.width, `${CHARACTER_FIGURE.width * 4}px`);
      assert.equal(figure().style.height, `${CHARACTER_FIGURE.height * 4}px`);
      assert.equal(
        sprite.style.left,
        `${((CHARACTER_FIGURE.width - sheet.width) / 2) * 4}px`,
        "the sheet stands centred across the box",
      );
      assert.equal(sprite.style.bottom, "0px");
      assert.equal(figure().getAttribute("aria-hidden"), "true");
      assert.equal(figure().textContent, "");
      assert.equal(
        figure().querySelectorAll("button, a, input, select, [tabindex]")
          .length,
        0,
      );
    };
    check();
    const started = send(camp, { mapId: "forest", characterId: ID }, 1).state;
    await inAct(() => screen.update(propsOf(started)));
    check();
    const dead = {
      ...started,
      run: { ...started.run, death: { minute: 243, cause: "cold" } },
    };
    await inAct(() => screen.update(propsOf(dead)));
    check();
    await inAct(() =>
      screen.update(propsOf(stateWith({}, { loops: { [ID]: LOOP } }))),
    );
    check();
  });
});

// Catches a section „Wyposażenie” that waits for something to stand — a known tree, a piece held — and a
// heading in another role than the one of „Umiejętności”.
test("the section „Wyposażenie” stands from the creation of the character, before any tree is known, with its heading in text-label like „Umiejętności”", async () => {
  await withPage(async (page) => {
    const bare = withTrees(stateWith(), []);
    const { screen } = await mount(page, propsOf(bare));
    const heading = () => page.root.querySelector(".character-screen-gear h3");
    assert.equal(heading().textContent, "Wyposażenie");
    assert.equal(page.root.querySelector(".character-screen-skills"), null);
    assert.equal(computed(heading(), "color"), "var(--text-label)");
    await inAct(() => screen.update(propsOf(knowingTwo())));
    const skills = page.root.querySelector(".character-screen-skills h3");
    assert.equal(
      computed(heading(), "color"),
      computed(skills, "color"),
      "the same role as the heading of „Umiejętności”",
    );
    assert.equal(heading().textContent, "Wyposażenie");
  });
});

// Catches a frame that stands only for an earning loop, as before, a character taken for the map run's
// though another character makes it, a map run's line without its end, a minute other than the clock's
// of its end, and a frame that offers buttons beside „Zatrzymaj”.
test("the frame of what the character does stands always, with no heading: in the camp, in a map run going, paused or ended, in an earning loop and after its stop", async () => {
  // decision: D-447 "Under the facts of a character (D-446) stands, always and with no heading, a frame whose first line says in the role `text` what the character does: „W obozie” where the character is neither the character of a manual map run nor in an earning loop; „Przejście: {mapa} · minuta {m}” while its manual map run goes on or waits in a pause, that line followed by „ · postać zginęła” or „ · mapa rozwiązana” once the map run has ended and waits for „Restart” or „Zakończ”, {m} being the minute the clock in the header of that map run writes; and the line of its earning loop with „Zatrzymaj” (D-244) while it is in one"
  // decision: D-447 "After a stop of its earning loop the frame reads „W obozie” with the line of the stop under it (D-245)"
  // decision: D-447 "The frame shows no current action of the character and holds no button but „Zatrzymaj”"
  await withPage(async (page) => {
    const camp = stateWith();
    const { screen } = await mount(page, propsOf(camp));
    const frame = () => page.root.querySelector(".character-screen-status");
    const lines = () =>
      [...frame().children].map((child) => [
        child.className,
        child.textContent,
      ]);
    const buttons = () =>
      [...frame().querySelectorAll("button")].map(
        (button) => button.textContent,
      );
    const show = (state) => inAct(() => screen.update(propsOf(state)));

    assert.deepEqual(lines(), [["character-screen-state", "W obozie"]]);
    assert.equal(frame().querySelector("h2, h3, h4"), null, "no heading");
    assert.deepEqual(buttons(), []);

    // Another character's map run leaves this one in the camp.
    const two = createCharacter(camp, "Ola").state;
    const theOther = send(two, { mapId: "forest", characterId: 2 }, 1).state;
    await show(theOther);
    assert.deepEqual(lines(), [["character-screen-state", "W obozie"]]);

    const started = send(camp, { mapId: "forest", characterId: ID }, 1).state;
    await show(started);
    assert.deepEqual(lines(), [
      ["character-screen-state", "Przejście: Las · minuta 0"],
    ]);
    await show({
      ...started,
      paused: true,
      run: { ...started.run, minute: 37 },
    });
    assert.deepEqual(lines(), [
      ["character-screen-state", "Przejście: Las · minuta 37"],
    ]);
    await show({
      ...started,
      run: {
        ...started.run,
        minute: 244,
        death: { minute: 243, cause: "cold" },
      },
    });
    assert.deepEqual(lines(), [
      [
        "character-screen-state",
        "Przejście: Las · minuta 243 · postać zginęła",
      ],
    ]);
    await show({
      ...started,
      run: { ...started.run, minute: 480, completion: { minute: 480 } },
    });
    assert.deepEqual(lines(), [
      [
        "character-screen-state",
        "Przejście: Las · minuta 480 · mapa rozwiązana",
      ],
    ]);
    assert.deepEqual(buttons(), []);

    await show(stateWith({}, { loops: { [ID]: LOOP } }));
    assert.deepEqual(lines(), [
      [
        "character-screen-loop",
        "Pętla: Las · przejście 3 · minuta 212 · domknięte 2Zatrzymaj",
      ],
    ]);
    assert.deepEqual(buttons(), ["Zatrzymaj"]);

    await show(stateWith({}, { stoppedLoops: { [ID]: { eating: 4 } } }));
    assert.deepEqual(lines(), [
      ["character-screen-state", "W obozie"],
      ["character-screen-stopped", "Pętla zatrzymana · wprawa: Jedzenie +4"],
    ]);
  });
});

// --- the right area: the rows of the trees ---------------------------------------------------

/** A state knowing the trees of exploration and gathering, the character in an earning loop where given. */
const knowingTwo = (patch = {}) =>
  withTrees(stateWith(knowingExploration().team.characters[0], patch), [
    "exploration",
    "smallItemGathering",
  ]);

// Catches trees open when the screen is built, a click on the row that opens no tree or every tree,
// a fold that does not say whether its tree stands open, and the open trees kept by a new screen.
test("the trees stand folded when the screen is built; a click on a tree's row opens it to its branches, a click on its fold folds it, and a new screen starts folded", async () => {
  // decision: D-199 "The trees stand folded, a click on the row of a tree or the keyboard opens it, and each entering of the screen starts with the trees folded"
  await withPage(async (page) => {
    const { screen } = await mount(page, propsOf(knowingTwo()));
    const branches = () =>
      all(page.root, ".character-screen-branch").map(
        (branch) => branch.querySelector("span").textContent.split(" ")[0],
      );
    const fold = (name) => buttonLabelled(page.root, name);
    assert.deepEqual(branches(), []);
    assert.equal(fold("Eksploracja").getAttribute("aria-expanded"), "false");
    assert.equal(fold("Eksploracja").textContent, "▸");

    const row = all(page.root, ".character-tree-row").find(
      (each) =>
        each.querySelector(".character-tree-name").textContent ===
        "Eksploracja",
    );
    await press(row.querySelector(".character-tree-level"));
    assert.deepEqual(branches(), ["Wprawny", "Długi", "Zwiad"]);
    assert.equal(fold("Eksploracja").getAttribute("aria-expanded"), "true");
    assert.equal(fold("Eksploracja").textContent, "▾");
    assert.equal(
      fold("Zbieranie małych przedmiotów").getAttribute("aria-expanded"),
      "false",
    );

    await press(fold("Eksploracja"));
    assert.deepEqual(branches(), []);
    assert.equal(fold("Eksploracja").getAttribute("aria-expanded"), "false");

    await press(fold("Eksploracja"));
    assert.deepEqual(branches(), ["Wprawny", "Długi", "Zwiad"]);
    await inAct(() => screen.dispose());
    await mount(page, propsOf(knowingTwo()));
    assert.deepEqual(
      branches(),
      [],
      "a new screen starts with its trees folded",
    );
  });
});

// Catches a row that is a sentence again, a bar whose share is not the practice against the threshold,
// points shown at zero, and a mark of the waiting practice that leaves out the map run going on or
// stands at a character in no earning loop.
test("a tree's row stands in its columns, with „+{n} pkt czeka w pętli” after the name where the practice waiting in the earning loop, its map run going on included, gives new points", async () => {
  // decision: D-199 "Each known tree stands as a row in columns: its name, „poziom {p}”, a bar of its practice up to its next threshold with „{wprawa} / {próg}”, or after its last threshold a full bar with „najwyższy”, and „{k} pkt” only where it has points to spend; right after the name, in the role `text`, stands „+{n} pkt czeka w pętli” where the practice waiting in the character's earning loop, the practice „Odbierz” would pay at that moment, gives the tree {n} new points to spend"
  await withPage(async (page) => {
    // 100 practice of Eksploracja: the thresholds 15, 45 and 100 reached, level 4, three points, and
    // 100 of the 200 the next threshold asks. 60 waits from the completions of the earning loop and 50
    // from its map run going on: 210 passes 200, one new point; 60 alone, 160, passes none.
    const loopWith = (runPractice) => ({
      ...LOOP,
      practice: { exploration: 60 },
      run: { ...LOOP.run, death: null, practice: runPractice },
    });
    const { screen } = await mount(
      page,
      propsOf(knowingTwo({ loops: { [ID]: loopWith({ exploration: 50 }) } })),
    );
    const row = () => page.root.querySelector(".character-tree-row");
    const cells = () =>
      [...row().children].slice(1).map((cell) => cell.textContent);
    assert.deepEqual(cells(), [
      "Eksploracja+1 pkt czeka w pętli",
      "poziom 4",
      "",
      "100 / 200",
      "3 pkt",
    ]);
    assert.equal(
      row()
        .querySelector(".character-tree-fill")
        .style.getPropertyValue("--share"),
      "0.5",
    );
    await inAct(() =>
      screen.update(
        propsOf(knowingTwo({ loops: { [ID]: loopWith({ exploration: 0 }) } })),
      ),
    );
    assert.equal(row().querySelector(".character-tree-waiting"), null);
    await inAct(() => screen.update(propsOf(knowingTwo())));
    assert.equal(row().querySelector(".character-tree-waiting"), null);
    // Gathering, at 160 of its thresholds 30, 80 and 160, has three points and 160 of 280.
    const gathering = page.root.querySelectorAll(".character-tree-row")[1];
    assert.deepEqual(
      [...gathering.children].slice(1).map((cell) => cell.textContent),
      ["Zbieranie małych przedmiotów", "poziom 4", "", "160 / 280", "3 pkt"],
    );
  });
});

// Catches a bar in green, a track in `highlight`, which can hardly be seen on the panel of the area,
// points that are not the light text of names, and a mark of the waiting practice in green.
test("the bar of a tree has its track in text-disabled and its fill in text, its points stand in text-strong and the mark of the waiting practice in text", async () => {
  // decision: D-40 "The bar of the practice of a tree on the screen Postać has a darker track and a light fill with no green, as the bar of a requirement that is not met has, its track in `text-disabled`, at a contrast ratio of at least 2:1 against `panel` (D-42), and its fill in `text`, though neither is text, and the points of that tree to spend stand beside it in `text-strong`"
  // decision: D-199 "Each known tree stands as a row in columns: its name, „poziom {p}”, a bar of its practice up to its next threshold with „{wprawa} / {próg}”, or after its last threshold a full bar with „najwyższy”, and „{k} pkt” only where it has points to spend; right after the name, in the role `text`, stands „+{n} pkt czeka w pętli”"
  await withPage(async (page) => {
    const loop = {
      ...LOOP,
      practice: { exploration: 120 },
      run: { ...LOOP.run, death: null, practice: {} },
    };
    await mount(page, propsOf(knowingTwo({ loops: { [ID]: loop } })));
    const row = page.root.querySelector(".character-tree-row");
    const of = (selector) => row.querySelector(selector);
    assert.equal(
      computed(of(".character-tree-bar"), "background-color"),
      "var(--text-disabled)",
    );
    assert.equal(
      computed(of(".character-tree-fill"), "background-color"),
      "var(--text)",
    );
    assert.equal(
      computed(of(".character-tree-points"), "color"),
      "var(--text-strong)",
    );
    assert.equal(
      computed(of(".character-tree-waiting"), "color"),
      "var(--text)",
    );
  });
});

// Catches the screen drawn as one column again, and the right area standing before a tree is known.
test("the screen stands as two areas of their own, the character's on the left and „Umiejętności” on the right, the right one absent before a tree is known", async () => {
  // decision: D-282 "Each column of a screen is an area of its own that a narrower layout can rearrange"
  // decision: D-199 "The screen Postać shows the section „Umiejętności” after a tree is known, and before the first known tree the section is absent"
  await withPage(async (page) => {
    const { screen } = await mount(page, propsOf(withTrees(stateWith(), [])));
    const areas = () =>
      [...page.root.querySelector(".screen.character-areas").children].map(
        (area) => area.className,
      );
    assert.deepEqual(areas(), ["screen-area character-identity"]);
    await inAct(() => screen.update(propsOf(knowingTwo())));
    assert.deepEqual(areas(), [
      "screen-area character-identity",
      "screen-area character-screen-skills",
    ]);
  });
});
