// The screen Postać (D-199, D-200, D-217, D-244, D-245, D-287) on jsdom through
// tests/view/page-document.mjs (D-264): which elements the screen builds, what it shows of the game
// state and of the moment, what its purchase and stop hand to the page, and which buttons refuse.
// Real focus order and rendering are the browser check's (D-88), so a focus case here holds only
// what jsdom shows.
import { assert, inAct, press, withPage } from "./page-document.mjs";
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

/** The new game's team with its one resurrection ready from the real moment `readyAtMs`. */
function teamReadyAt(readyAtMs) {
  const { team } = stateWith();
  return { ...team, resurrectionReadyAtMs: readyAtMs };
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

// --- the screen -----------------------------------------------------------------------------

test("the screen names the character and its archetype, and gives the generation from 2 up only", async () => {
  await withPage(async (page) => {
    const { screen } = await mount(page, propsOf(stateWith()));
    assert.equal(text(page.root, ".character-screen-name"), "Ala");
    assert.equal(
      text(page.root, ".character-screen-archetype"),
      ARCHETYPES[CREATED_ARCHETYPE].name,
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
test("the resurrection line reads the time left in danger, shows the minutes below an hour, turns ready at the moment and moves with each reading of the clock", async () => {
  // decision: D-217 "The card and the screen of a character, and that character in the section „Kto idzie” of the card of a map, show, from its creation, „Wskrzeszenie drużyny gotowe” in `text-secondary`, and while the resurrection is not ready „Wskrzeszenie drużyny za {g} godz. {m} min czasu realnego — śmierć zabierze wprawę i wykupione stopnie” in `danger`, the time reading „za {m} min czasu realnego” below one hour"
  await withPage(async (page) => {
    const readyAt = NOW + 8 * HOUR;
    const state = stateWith({}, { team: teamReadyAt(readyAt) });
    const { screen } = await mount(page, propsOf(state));
    const line = () =>
      page.root.querySelector(".character-screen-resurrection");
    assert.equal(
      line().textContent,
      `Wskrzeszenie drużyny za 8 godz. 0 min czasu realnego${WARNING}`,
    );
    assert.ok(line().classList.contains("danger"), "not ready reads in danger");
    await inAct(() => screen.update(propsOf(state, readyAt - 30 * MINUTE)));
    assert.equal(
      line().textContent,
      `Wskrzeszenie drużyny za 30 min czasu realnego${WARNING}`,
    );
    assert.ok(line().classList.contains("danger"));
    await inAct(() => screen.update(propsOf(state, readyAt)));
    assert.equal(line().textContent, "Wskrzeszenie drużyny gotowe");
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
  // decision: D-199 "The screen Postać shows „Umiejętności” after a tree is known, with a row for each known tree giving „{umiejętność} — poziom {p} · wprawa {w}/{próg} · punkty {k}”, or „{umiejętność} — poziom {p} (najwyższy) · wprawa {w} · punkty {k}” after its last threshold; before the first known tree the section is absent"
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
  // decision: D-199 "Below it each branch gives its name, rank and maximum rank, description from data and a „Kup” button disabled when points are insufficient or all ranks are bought; a numerical branch also gives „teraz {wartość} → po kupnie {wartość} · cena {cena}”, while „Obchód”, „Czysty płomień” and „Zwiad” give the price and omit numerical before-and-after values"
  // decision: D-200 "The player buys a branch rank with „Kup” on the screen Postać outside a manual map run, one that has ended counting as a map run until „Restart” or „Zakończ”, at a character in an earning loop too, and the rank acts from that character's next map run, the next map run of that earning loop included, while the map run going on keeps the skills of its start"
  // decision: D-379 "Each rank of a branch gives the effect below, and the ranks of a branch cost the points listed, in order"
  await withPage(async (page) => {
    let state = withTrees(knowingExploration(), ["exploration"]);
    const { screen, calls } = await mount(page, propsOf(state));
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
  // decision: D-287 "Wróć do niego i je zakończ, żeby wysłać postać.”, and at the section „Umiejętności” „Przejście na mapie {mapa} jest niezakończone"
  // decision: D-200 "The player buys a branch rank with „Kup” on the screen Postać outside a manual map run, one that has ended counting as a map run until „Restart” or „Zakończ”, at a character in an earning loop too, and the rank acts from that character's next map run, the next map run of that earning loop included, while the map run going on keeps the skills of its start"
  await withPage(async (page) => {
    const started = send(
      withTrees(knowingExploration(), ["exploration"]),
      { mapId: "forest", characterId: ID },
      1,
    ).state;
    const waiting = setPaused(started, true).state;
    const { screen } = await mount(page, propsOf(waiting));
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
