// The tiles of the eight slots of the gear in the section „Wyposażenie” of the screen Postać (D-454,
// D-461, D-462, D-287) on jsdom through tests/view/page-document.mjs (D-264): which tiles the screen
// builds and where, what each shows of the gear the game keeps at the character in the camp, in an
// earning loop and beside a manual map run, which sentence stands under the heading, and which tile is
// chosen. The pick under a chosen tile is the next slice's. Where a tile stands on the page and how it
// looks is the browser check's (D-88): the order of the tiles in the document is what the cases read,
// and a colour case reads which token a rule of the real stylesheet lands on.
import { assert, inAct, press, withPage } from "./page-document.mjs";
import { gameStylesheetText } from "./game-stylesheets.mjs";
import { test } from "node:test";
import {
  advanceMinutes,
  createCharacter,
  newGame,
  send,
  setPaused,
} from "../../dist/browser/sim/game.js";
import { startLoop } from "../../dist/browser/sim/loop.js";
import { takeOffPiece } from "../../dist/browser/sim/gear.js";
import { createCharacterScreen } from "../../dist/browser/view/character-screen.js";
import { withEdgeSolved } from "../sim/understanding-fixture.mjs";

const NOW = 1_800_000_000_000;
const ID = 1;
const OTHER = 2;

const NOTHING = {
  mainHand: null,
  secondHand: null,
  head: null,
  torso: null,
  legs: null,
  pocket1: null,
  pocket2: null,
  pocket3: null,
};
const STICK_AT_HAND = { ...NOTHING, mainHand: "stick" };
const SENTENCE_LOOP =
  "Postać jest w pętli. Zmiana działa od następnego przejścia.";
const SENTENCE_RUN =
  "Przejście na mapie Las jest niezakończone. Wyposażenie zmienisz po jego zakończeniu.";

/** The new game's state with its one character, the character's fields given over it. */
function stateWith(character = {}) {
  const base = createCharacter(withEdgeSolved(newGame()), "Ala").state;
  return {
    ...base,
    team: {
      ...base.team,
      characters: [{ ...base.team.characters[0], ...character }],
    },
  };
}

/** Two characters, the second made after the first, each with its gear given. */
function twoWith(firstGear, secondGear) {
  const one = stateWith({ gear: firstGear });
  const two = createCharacter(one, "Ola").state;
  return {
    ...two,
    team: {
      ...two.team,
      characters: two.team.characters.map((character) =>
        character.id === OTHER ? { ...character, gear: secondGear } : character,
      ),
    },
  };
}

/** The state of the manual map run of Las, which the character `characterId` of `state` has just sent to. */
const inRun = (state, characterId = ID) =>
  send(state, { mapId: "forest", characterId }, 1).state;

/** The map run, after a death in game minute 243, as it waits for „Restart” or „Zakończ”. */
const diedIn = (state) => ({
  ...state,
  run: { ...state.run, minute: 244, death: { minute: 243, cause: "cold" } },
});

/** The map run, after its completion in game minute 480. */
const completedIn = (state) => ({
  ...state,
  run: { ...state.run, minute: 480, completion: { minute: 480 } },
});

const propsOf = (state, characterId = ID, nowMs = NOW) => ({
  state,
  nowMs,
  characterId,
});

/** Builds the screen in the page's body. */
async function mount({ root }, props) {
  let screen = null;
  await inAct(() => {
    screen = createCharacterScreen({
      onBuy: () => {},
      onStop: () => {},
      props,
    });
    root.append(screen.element);
  });
  return screen;
}

const all = (root, selector) => [...root.querySelectorAll(selector)];

/** The tiles of the slots in the order the section holds them: the left column, the right one, the pockets. */
const tilesOf = (root) => ({
  left: all(root, ".character-gear-left .button.tile"),
  right: all(root, ".character-gear-right .button.tile"),
  pockets: all(root, ".character-gear-pockets .button.tile"),
});
const everyTile = (root) => all(root, ".character-screen-gear .button.tile");

/** What a tile shows: the file of its icon, or the pale name of its slot, and its name for a reader. */
function faceOf(tile) {
  const icon = tile.querySelector(".icon-mask");
  return {
    shown:
      icon === null ? tile.textContent : icon.style.getPropertyValue("--icon"),
    name: tile.getAttribute("aria-label"),
    text: tile.textContent,
  };
}
const shown = (root) => everyTile(root).map((tile) => faceOf(tile).shown);

const iconOf = (file) => `url("/icons/${file}.svg")`;
const EMPTY_NAMES = [
  "Głowa",
  "Tułów",
  "Nogi",
  "Ręka główna",
  "Druga ręka",
  "Kieszeń",
  "Kieszeń",
  "Kieszeń",
];

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

// Catches a slot left off the screen, a slot that nothing fits (the second hand, the head, the torso, the
// legs) standing only once an item for it exists, tiles standing in another order or on another side of
// the figure than the decisions give, and a pocket shown as one tile.
test("eight tiles stand around the figure from the creation of the character: head, torso and legs on its left, the main and the second hand on its right and three pockets under it, each with the pale name of its slot while it holds nothing", async () => {
  // decision: D-454 "The screen Postać shows every slot of the gear, a slot that no item of the game fits yet included: it stands there and is empty."
  await withPage(async (page) => {
    await mount(page, propsOf(stateWith()));
    const body = page.root.querySelector(".character-gear-body");
    assert.deepEqual(
      [...body.children].map((child) => child.className.split(" ")[0]),
      [
        "character-gear-left",
        "character-figure",
        "character-gear-right",
        "character-gear-pockets",
      ],
      "the left column, the figure, the right column, and the pockets under them",
    );
    const { left, right, pockets } = tilesOf(page.root);
    assert.deepEqual(
      left.map((tile) => tile.textContent),
      ["Głowa", "Tułów", "Nogi"],
    );
    assert.deepEqual(
      right.map((tile) => tile.textContent),
      ["Ręka główna", "Druga ręka"],
    );
    assert.deepEqual(
      pockets.map((tile) => tile.textContent),
      ["Kieszeń", "Kieszeń", "Kieszeń"],
    );
    assert.equal(everyTile(page.root).length, 8);
    for (const tile of everyTile(page.root)) {
      assert.equal(
        tile.querySelector(".icon-mask"),
        null,
        "no icon on a tile of an empty slot",
      );
      assert.equal(
        tile.getAttribute("aria-label"),
        null,
        "the pale name is the tile's own name",
      );
      assert.equal(tile.disabled, false);
      assert.equal(
        tile.querySelector(".tile-slot-name").textContent,
        tile.textContent,
      );
    }
    assert.equal(page.root.querySelector(".character-screen-skills"), null);
  });
});

// Catches an icon taken from anywhere but the item in the slot, a name or a count written on the tile, a
// tile that shows what another slot holds, a tile whose reader hears no name, and one whose reader hears
// the item alone, so that three bandages in three pockets are read as one and the same.
test("a tile of a slot that holds a piece shows the icon of its item alone, named for a reader „{miejsce}: {rzecz}”, the pockets by their numbers, and the other tiles keep their pale names", async () => {
  await withPage(async (page) => {
    const gear = {
      ...NOTHING,
      mainHand: "stick",
      pocket1: "bandage",
      pocket3: "bandage",
    };
    await mount(page, propsOf(stateWith({ gear })));
    assert.deepEqual(shown(page.root), [
      "Głowa",
      "Tułów",
      "Nogi",
      iconOf("wood-stick"),
      "Druga ręka",
      iconOf("first-aid-kit"),
      "Kieszeń",
      iconOf("first-aid-kit"),
    ]);
    const { right, pockets } = tilesOf(page.root);
    const stick = right[0];
    assert.equal(stick.getAttribute("aria-label"), "Ręka główna: patyk");
    assert.equal(stick.textContent, "", "no name and no count on the tile");
    assert.equal(
      stick.querySelector(".icon-mask").getAttribute("aria-hidden"),
      "true",
    );
    assert.equal(pockets[0].getAttribute("aria-label"), "Kieszeń 1: opatrunek");
    assert.equal(pockets[2].getAttribute("aria-label"), "Kieszeń 3: opatrunek");
    assert.equal(pockets[1].getAttribute("aria-label"), null);
    assert.equal(right[1].textContent, "Druga ręka");
  });
});

// Catches the sentence of the earning loop on a character that is in none, the sentence standing
// elsewhere than between the heading and the tiles, and, the break of D-462, tiles that show the gear of
// the map run going on instead of the gear set for the next one.
test("a character in an earning loop has the tiles of the gear set for its next map run, under the heading with its sentence above them, while the map run going on holds other gear", async () => {
  // decision: D-462 "At a character in an earning loop the tiles of the gear show the gear set for its next map run, with the sentence „Postać jest w pętli. Zmiana działa od następnego przejścia.” standing above them."
  await withPage(async (page) => {
    const camp = stateWith({ gear: STICK_AT_HAND });
    const screen = await mount(page, propsOf(camp));
    const sentence = () => page.root.querySelector(".character-gear-note");
    assert.equal(sentence(), null, "a character at the camp has no sentence");

    const looping = startLoop(
      camp,
      { mapId: "forestEdge", characterId: ID },
      1,
    ).state;
    assert.equal(
      looping.loops[ID].run.character.gear.mainHand,
      "stick",
      "precondition: the map run going on starts with the stick",
    );
    // The player takes the stick off for the next map run; the map run going on keeps it.
    const taken = takeOffPiece(looping, ID, "mainHand").state;
    assert.equal(taken.team.characters[0].gear.mainHand, null);
    assert.equal(
      taken.loops[ID].run.character.gear.mainHand,
      "stick",
      "precondition: the map run going on still holds the stick",
    );
    await inAct(() => screen.update(propsOf(taken)));
    assert.equal(sentence().textContent, SENTENCE_LOOP);
    const section = page.root.querySelector(".character-screen-gear");
    assert.deepEqual(
      [...section.children].map((child) => child.tagName),
      ["H3", "P", "DIV"],
      "the heading, the sentence, and then the tiles with the figure",
    );
    assert.equal(
      shown(page.root)[3],
      "Ręka główna",
      "the main hand's tile is empty, as the gear set for the next map run is",
    );
    assert.equal(
      all(page.root, ".icon-mask").filter((mask) => section.contains(mask))
        .length,
      0,
      "no tile shows the stick of the map run going on, and no second row of icons stands",
    );
    assert.equal(
      everyTile(page.root).every((tile) => !tile.disabled),
      true,
    );

    // A stop of the earning loop takes the sentence away.
    await inAct(() => screen.update(propsOf(camp)));
    assert.equal(sentence(), null);
  });
});

// Catches the tiles of a character beside its manual map run that can be chosen, the sentence missing in
// any of the three states of the map run, a map named from anywhere but the data, tiles that show the
// gear of the map run instead of the gear the character entered with, and a lock that falls on another
// character as well.
test("the tiles of the character of a manual map run, going, paused or ended, cannot be chosen and show the gear it entered with, with the sentence naming the map under the heading", async () => {
  // decision: D-287 "At the character of that map run the tiles of its gear cannot be selected, and under the heading „Wyposażenie” stands „Przejście na mapie {mapa} jest niezakończone. Wyposażenie zmienisz po jego zakończeniu.”, while the tiles of the gear of every other character stay selectable."
  await withPage(async (page) => {
    const camp = stateWith({ gear: STICK_AT_HAND });
    const going = inRun(camp);
    // The map run's own gear differs from the one the character entered with.
    const goingOn = {
      ...going,
      run: {
        ...going.run,
        character: { ...going.run.character, gear: NOTHING },
      },
    };
    assert.equal(goingOn.run.character.gear.mainHand, null);
    assert.equal(goingOn.team.characters[0].gear.mainHand, "stick");
    const screen = await mount(page, propsOf(camp));
    const sentence = () => page.root.querySelector(".character-gear-note");
    assert.equal(sentence(), null, "no sentence before the map run");
    assert.equal(
      everyTile(page.root).every((tile) => !tile.disabled),
      true,
    );

    let ended = going;
    for (let round = 0; round < 10 && ended.run.death === null; round += 1) {
      if (ended.paused) ended = setPaused(ended, false).state;
      ended = advanceMinutes(ended, 300).state;
    }
    assert.ok(ended.run.death !== null, "the real map run has ended by death");
    const states = [
      ["going", goingOn],
      ["paused", { ...goingOn, paused: true }],
      ["ended by death", diedIn(goingOn)],
      ["ended by completion", completedIn(goingOn)],
      ["ended, played to its end", ended],
    ];
    for (const [name, state] of states) {
      await inAct(() => screen.update(propsOf(state)));
      assert.equal(sentence()?.textContent, SENTENCE_RUN, name);
      assert.equal(
        everyTile(page.root).every((tile) => tile.disabled),
        true,
        `${name}: no tile can be chosen`,
      );
      assert.equal(
        shown(page.root)[3],
        iconOf("wood-stick"),
        `${name}: the tile of the main hand shows the stick the character entered with`,
      );
      const section = page.root.querySelector(".character-screen-gear");
      assert.deepEqual(
        [...section.children].map((child) => child.tagName),
        ["H3", "P", "DIV"],
        `${name}: the sentence stands under the heading`,
      );
    }
    // „Zakończ” has the map run go: the sentence and the lock with it.
    await inAct(() => screen.update(propsOf(camp)));
    assert.equal(sentence(), null);
    assert.equal(
      everyTile(page.root).every((tile) => !tile.disabled),
      true,
    );
  });
});

// Catches a lock that falls on every character because one has a map run, and a sentence that the
// other character's screen shows too.
test("beside the manual map run of another character the tiles are open to choose and carry no sentence, while the map run's own character has them locked", async () => {
  // decision: D-287 "At the character of that map run the tiles of its gear cannot be selected, and under the heading „Wyposażenie” stands „Przejście na mapie {mapa} jest niezakończone. Wyposażenie zmienisz po jego zakończeniu.”, while the tiles of the gear of every other character stay selectable."
  await withPage(async (page) => {
    const state = inRun(twoWith(STICK_AT_HAND, NOTHING), OTHER);
    assert.equal(state.run.character.id, OTHER);
    const screen = await mount(page, propsOf(state, ID));
    const sentence = () => page.root.querySelector(".character-gear-note");
    assert.equal(sentence(), null);
    assert.equal(everyTile(page.root).length, 8);
    assert.equal(
      everyTile(page.root).every((tile) => !tile.disabled),
      true,
    );
    assert.equal(shown(page.root)[3], iconOf("wood-stick"));
    await press(tilesOf(page.root).right[0]);
    assert.equal(
      tilesOf(page.root).right[0].getAttribute("aria-pressed"),
      "true",
      "another character's tile can be chosen",
    );

    await inAct(() => screen.update(propsOf(state, OTHER)));
    assert.equal(sentence().textContent, SENTENCE_RUN);
    assert.equal(
      everyTile(page.root).every((tile) => tile.disabled),
      true,
    );
    assert.deepEqual(shown(page.root), EMPTY_NAMES);
  });
});

// Catches a tile that is never chosen, two chosen at once, a second touch that keeps the choice, a screen
// that starts with a tile chosen, a choice that a reading of the clock takes away, and a chosen tile that
// stays chosen under the lock of a map run that starts.
test("a touch chooses a tile, a touch of another moves the choice, a second touch of the chosen one takes it away; a new screen starts with none chosen and a map run that starts takes the choice away", async () => {
  await withPage(async (page) => {
    const state = stateWith({ gear: STICK_AT_HAND });
    const screen = await mount(page, propsOf(state));
    const pressed = () =>
      everyTile(page.root).map((tile) => tile.getAttribute("aria-pressed"));
    const NONE = Array(8).fill("false");
    const only = (index) =>
      NONE.map((value, at) => (at === index ? "true" : value));
    assert.deepEqual(pressed(), NONE, "every tile says it is not chosen");

    const tiles = () => everyTile(page.root);
    await press(tiles()[3]);
    assert.deepEqual(pressed(), only(3));
    await press(tiles()[6]);
    assert.deepEqual(pressed(), only(6), "the choice moves, never two at once");
    await inAct(() => screen.update(propsOf(state, ID, NOW + 60_000)));
    assert.deepEqual(pressed(), only(6), "a reading of the clock keeps it");
    assert.ok(tiles()[6].classList.contains("selected"));
    await press(tiles()[6]);
    assert.deepEqual(pressed(), NONE, "a second touch takes the choice away");

    await press(tiles()[0]);
    assert.deepEqual(pressed(), only(0));
    await inAct(() => screen.update(propsOf(inRun(state))));
    assert.deepEqual(pressed(), NONE, "a locked tile is not chosen");
    await inAct(() => screen.update(propsOf(state)));
    assert.deepEqual(
      pressed(),
      NONE,
      "and the lock's end does not bring it back",
    );

    await press(tiles()[7]);
    assert.deepEqual(pressed(), only(7));
    await inAct(() => screen.dispose());
    const another = await mount(page, propsOf(state));
    assert.ok(another);
    assert.deepEqual(
      pressed(),
      NONE,
      "a screen built anew starts with none chosen",
    );
  });
});

// Catches a sentence of the tiles in a role other than text-secondary (D-40: an explanation), such as
// the text of a warning.
test("the sentences of the tiles stand in text-secondary", async () => {
  await withPage(async (page) => {
    const camp = stateWith();
    const screen = await mount(page, propsOf(inRun(camp)));
    const note = () => page.root.querySelector(".character-gear-note");
    assert.equal(computed(note(), "color"), "var(--text-secondary)");
    await inAct(() =>
      screen.update(
        propsOf(
          startLoop(camp, { mapId: "forestEdge", characterId: ID }, 1).state,
        ),
      ),
    );
    assert.equal(note().textContent, SENTENCE_LOOP);
    assert.equal(computed(note(), "color"), "var(--text-secondary)");
  });
});
