// The pick under a chosen tile of the section „Wyposażenie” of the screen Postać (D-461, D-453, D-409):
// what the pick shows for a slot — the items of the chest that fit it with their icons, names and pieces,
// „Zdejmij” without an icon, the heading „{miejsce}: {rzecz}” or „{miejsce}: nic”, the sentence of a chest
// with nothing that fits, a cell greyed with its reason — what a cell does and how the pick closes, where
// the focus goes when it closes, and the entry that runs the two acts through the store's act that counts
// the time first. Which items fit and which refusal the pick shows is the simulation's own (`gearPick`);
// the cases here read what the screen makes of it. Where the pick stands on the page and how it looks is
// the browser check's (D-88).
import { assert, inAct, press, withPage } from "./page-document.mjs";
import { gameStylesheetText } from "./game-stylesheets.mjs";
import { test } from "node:test";
import { createCharacter, newGame, send } from "../../dist/browser/sim/game.js";
import { createCharacterEntry } from "../../dist/browser/view/character-entry.js";
import { createCharacterScreen } from "../../dist/browser/view/character-screen.js";
import { withEdgeSolved } from "../sim/understanding-fixture.mjs";

const NOW = 1_800_000_000_000;
const ID = 1;

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

/** The new game's state with its one character, whose gear and whose chest are given. */
function stateWith({ gear = NOTHING, pieces = {} } = {}) {
  const base = createCharacter(withEdgeSolved(newGame()), "Ala").state;
  return {
    ...base,
    team: {
      ...base.team,
      chest: { pieces: { ...pieces } },
      characters: [{ ...base.team.characters[0], gear }],
    },
  };
}

const propsOf = (state, nowMs = NOW) => ({ state, nowMs, characterId: ID });

/** Builds the screen in the page's body; the acts it is given record what the screen sends out. */
async function mount({ root }, props) {
  const sent = [];
  let screen = null;
  await inAct(() => {
    screen = createCharacterScreen({
      onBuy: () => {},
      onStop: () => {},
      onPutOn: (slot, item) => sent.push(["putOn", slot, item]),
      onTakeOff: (slot) => sent.push(["takeOff", slot]),
      props,
    });
    root.append(screen.element);
  });
  return { screen, sent };
}

const all = (root, selector) => [...root.querySelectorAll(selector)];
const everyTile = (root) => all(root, ".character-screen-gear .button.tile");
const TILE_AT = {
  head: 0,
  torso: 1,
  legs: 2,
  mainHand: 3,
  secondHand: 4,
  pocket1: 5,
  pocket2: 6,
  pocket3: 7,
};
const tile = (root, slot) => everyTile(root)[TILE_AT[slot]];

const pickOf = (root) => root.querySelector(".character-gear-pick");
const headingOf = (root) =>
  pickOf(root)?.querySelector(".character-gear-pick-heading")?.textContent;
const cellsOf = (root) => all(root, ".character-gear-pick .pick-cell");

/** What a pick cell shows: its name, the file of its icon where it has one, and its reason where it is greyed. */
function cellFace(cell) {
  return {
    name: cell.querySelector(".pick-cell-name").textContent,
    icon:
      cell.querySelector(".icon-mask")?.style.getPropertyValue("--icon") ??
      null,
    reason: cell.querySelector(".pick-cell-reason")?.textContent ?? null,
    greyed: cell.getAttribute("aria-disabled") === "true",
  };
}
const facesOf = (root) => cellsOf(root).map(cellFace);
const iconOf = (file) => `url("/icons/${file}.svg")`;
const sentenceOf = (root) =>
  pickOf(root)?.querySelector(".character-gear-pick-empty")?.textContent;

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

// Catches a pick that lists items that do not fit the slot, one the chest lacks, one that shows no piece
// count or no icon, a „Zdejmij” with an icon or one at an empty slot, and a heading that is not the place
// and the piece.
test("a touch of the tile of a held slot opens the pick of the chest's items that fit it, each with its icon, name and pieces, and „Zdejmij” without an icon, under the heading of the place and its piece", async () => {
  // decision: D-461 "The player changes the gear by touching the tile of a slot, which opens under it a pick in the cells of the pick of an action in the program editor: the items of the chest that fit the slot, each with its icon, its name and the number of its pieces in the chest, and „Zdejmij” where the slot holds something."
  await withPage(async (page) => {
    const state = stateWith({
      gear: { ...NOTHING, mainHand: "stick" },
      pieces: { stick: 2, bandage: 3, berry: 4 },
    });
    await mount(page, propsOf(state));
    assert.equal(pickOf(page.root), null, "no pick before a tile is chosen");
    await press(tile(page.root, "mainHand"));
    assert.equal(headingOf(page.root), "Ręka główna: patyk");
    assert.deepEqual(facesOf(page.root), [
      {
        name: "2 × patyk",
        icon: iconOf("wood-stick"),
        reason: null,
        greyed: false,
      },
      { name: "Zdejmij", icon: null, reason: null, greyed: false },
    ]);
    assert.equal(
      sentenceOf(page.root),
      undefined,
      "no sentence of an empty chest",
    );

    // A pocket holds nothing: its pick lists the bandages the chest holds, and no „Zdejmij”.
    await press(tile(page.root, "pocket2"));
    assert.equal(headingOf(page.root), "Kieszeń: nic");
    assert.deepEqual(facesOf(page.root), [
      {
        name: "3 × opatrunek",
        icon: iconOf("first-aid-kit"),
        reason: null,
        greyed: false,
      },
    ]);
  });
});

// Catches a heading that names the pocket by its number or a place with the piece of another slot, and a
// pick that stays out of the document where the slot holds nothing and the chest nothing that fits.
test("the heading of a pick says „{miejsce}: {rzecz}” for a held slot and „{miejsce}: nic” for an empty one, the pockets by the one name of their place", async () => {
  await withPage(async (page) => {
    const state = stateWith({
      gear: { ...NOTHING, pocket1: "bandage", pocket3: "bandage" },
    });
    await mount(page, propsOf(state));
    const headings = [];
    for (const slot of ["pocket1", "pocket2", "pocket3", "head", "mainHand"]) {
      await press(tile(page.root, slot));
      headings.push(headingOf(page.root));
    }
    assert.deepEqual(headings, [
      "Kieszeń: opatrunek",
      "Kieszeń: nic",
      "Kieszeń: opatrunek",
      "Głowa: nic",
      "Ręka główna: nic",
    ]);
  });
});

// Catches a pick that shows nothing where the chest holds nothing that fits, one that drops „Zdejmij” with
// the sentence, and one that shows „Zdejmij” at a slot that holds nothing.
test("where the chest holds nothing that fits the slot the pick says so in one sentence, beside „Zdejmij” at a held slot and alone at an empty one", async () => {
  // decision: D-461 "The player changes the gear by touching the tile of a slot, which opens under it a pick in the cells of the pick of an action in the program editor: the items of the chest that fit the slot, each with its icon, its name and the number of its pieces in the chest, and „Zdejmij” where the slot holds something."
  await withPage(async (page) => {
    // The chest holds only items that fit no slot of the places shown here: a bandage fits the pockets alone.
    const state = stateWith({
      gear: { ...NOTHING, mainHand: "stick" },
      pieces: { bandage: 1 },
    });
    await mount(page, propsOf(state));
    await press(tile(page.root, "mainHand"));
    assert.equal(sentenceOf(page.root), "W skrzynce nie ma nic, co tu pasuje.");
    assert.deepEqual(
      facesOf(page.root).map((face) => face.name),
      ["Zdejmij"],
    );
    await press(tile(page.root, "head"));
    assert.equal(headingOf(page.root), "Głowa: nic");
    assert.equal(sentenceOf(page.root), "W skrzynce nie ma nic, co tu pasuje.");
    assert.deepEqual(facesOf(page.root), []);
  });
});

// Catches a „Zdejmij” that can act on a full chest, a greyed cell with no reason or with a reason of the
// screen's own words, and a greyed cell that sends the act all the same.
test("a „Zdejmij” that the chest cannot take is greyed with the simulation's reason „skrzynka pełna” and sends no act", async () => {
  // decision: D-461 "The player changes the gear by touching the tile of a slot, which opens under it a pick in the cells of the pick of an action in the program editor: the items of the chest that fit the slot, each with its icon, its name and the number of its pieces in the chest, and „Zdejmij” where the slot holds something."
  await withPage(async (page) => {
    // The chest is full at sixty pieces (the balance's chest capacity), so the stick has no room to go to.
    const state = stateWith({
      gear: { ...NOTHING, mainHand: "stick" },
      pieces: { berry: 60 },
    });
    const { sent } = await mount(page, propsOf(state));
    await press(tile(page.root, "mainHand"));
    assert.deepEqual(facesOf(page.root), [
      { name: "Zdejmij", icon: null, reason: "skrzynka pełna", greyed: true },
    ]);
    await press(cellsOf(page.root)[0]);
    assert.deepEqual(sent, [], "a greyed cell sends nothing");
    assert.equal(
      headingOf(page.root),
      "Ręka główna: patyk",
      "and the pick stays",
    );
  });
});

// Catches a cell that sends the wrong slot or the wrong item, a pick that stays open after an act, an act
// sent twice, and a „Zdejmij” that sends the item's act.
test("a cell of an item sends the act of putting it on that slot and a „Zdejmij” the act of taking it off, and each closes the pick", async () => {
  await withPage(async (page) => {
    const state = stateWith({
      gear: { ...NOTHING, pocket1: "bandage", mainHand: "stick" },
      pieces: { stick: 1, bandage: 2 },
    });
    const { sent } = await mount(page, propsOf(state));
    await press(tile(page.root, "pocket2"));
    await press(cellsOf(page.root)[0]);
    assert.deepEqual(sent, [["putOn", "pocket2", "bandage"]]);
    assert.equal(pickOf(page.root), null, "the act closes the pick");
    assert.equal(
      tile(page.root, "pocket2").getAttribute("aria-pressed"),
      "false",
      "and no tile stays chosen",
    );

    await press(tile(page.root, "mainHand"));
    const faces = facesOf(page.root).map((face) => face.name);
    assert.deepEqual(faces, ["1 × patyk", "Zdejmij"]);
    await press(cellsOf(page.root)[1]);
    assert.deepEqual(sent.at(-1), ["takeOff", "mainHand"]);
    assert.equal(sent.length, 2);
    assert.equal(pickOf(page.root), null);

    await press(tile(page.root, "mainHand"));
    await press(cellsOf(page.root)[0]);
    assert.deepEqual(sent.at(-1), ["putOn", "mainHand", "stick"]);
    assert.equal(sent.length, 3);
  });
});

// Catches a second touch that leaves the pick open, a touch of another tile that opens a second pick or
// leaves the first, and a pick that takes the chosen tile's place in a state of its own.
test("a second touch of the chosen tile closes the pick and a touch of another tile moves it there", async () => {
  // decision: D-461 "The player changes the gear by touching the tile of a slot, which opens under it a pick in the cells of the pick of an action in the program editor: the items of the chest that fit the slot, each with its icon, its name and the number of its pieces in the chest, and „Zdejmij” where the slot holds something."
  await withPage(async (page) => {
    const state = stateWith({
      gear: { ...NOTHING, mainHand: "stick" },
      pieces: { stick: 1, bandage: 1 },
    });
    const { sent } = await mount(page, propsOf(state));
    await press(tile(page.root, "mainHand"));
    assert.equal(all(page.root, ".character-gear-pick").length, 1);
    await press(tile(page.root, "pocket1"));
    assert.equal(
      all(page.root, ".character-gear-pick").length,
      1,
      "one pick at a time",
    );
    assert.equal(headingOf(page.root), "Kieszeń: nic");
    assert.equal(
      tile(page.root, "mainHand").getAttribute("aria-pressed"),
      "false",
    );
    await press(tile(page.root, "pocket1"));
    assert.equal(pickOf(page.root), null);
    assert.deepEqual(sent, [], "closing a pick sends no act");
  });
});

// Catches a pick that stays as it was drawn while the chest changes under it, and a pick that is kept
// open across the start of a manual map run of its character, whose tiles are locked.
test("the pick follows the state the screen is drawn from: a chest that changes changes its cells, and a manual map run that starts takes it away", async () => {
  await withPage(async (page) => {
    const state = stateWith({
      gear: { ...NOTHING, mainHand: "stick" },
      pieces: { stick: 1 },
    });
    const { screen } = await mount(page, propsOf(state));
    await press(tile(page.root, "mainHand"));
    assert.deepEqual(
      facesOf(page.root).map((face) => face.name),
      ["1 × patyk", "Zdejmij"],
    );
    const more = {
      ...state,
      team: { ...state.team, chest: { pieces: { stick: 5, bandage: 1 } } },
    };
    await inAct(() => screen.update(propsOf(more, NOW + 60_000)));
    assert.deepEqual(
      facesOf(page.root).map((face) => face.name),
      ["5 × patyk", "Zdejmij"],
      "the pieces of the new chest, and the pick still open",
    );
    const none = {
      ...state,
      team: { ...state.team, chest: { pieces: {} } },
    };
    await inAct(() => screen.update(propsOf(none)));
    assert.equal(sentenceOf(page.root), "W skrzynce nie ma nic, co tu pasuje.");

    const running = send(state, { mapId: "forest", characterId: ID }, 1).state;
    await inAct(() => screen.update(propsOf(running)));
    assert.equal(pickOf(page.root), null, "the locked tiles hold no pick");
  });
});

// Catches the focus falling to the page when the cell that was pressed leaves with its pick, and a closing
// that leaves it on a cell that is gone.
test("the focus stays at the tile of the slot when a pick closes, by an act or by a second touch", async () => {
  await withPage(async (page) => {
    const state = stateWith({
      gear: { ...NOTHING, mainHand: "stick" },
      pieces: { stick: 1, bandage: 1 },
    });
    await mount(page, propsOf(state));
    const { document } = page;
    await press(tile(page.root, "pocket1"));
    await inAct(() => cellsOf(page.root)[0].focus());
    assert.ok(cellsOf(page.root)[0].contains(document.activeElement));
    await press(cellsOf(page.root)[0]);
    assert.equal(pickOf(page.root), null);
    assert.equal(
      document.activeElement,
      tile(page.root, "pocket1"),
      "the act closes the pick and gives the focus to the tile of its slot",
    );

    await press(tile(page.root, "mainHand"));
    await inAct(() => cellsOf(page.root)[1].focus());
    await press(cellsOf(page.root)[1]);
    assert.equal(document.activeElement, tile(page.root, "mainHand"));

    await press(tile(page.root, "head"));
    await inAct(() => tile(page.root, "head").focus());
    await press(tile(page.root, "head"));
    assert.equal(pickOf(page.root), null);
    assert.equal(document.activeElement, tile(page.root, "head"));
  });
});

// Catches the heading in a role that is not the name to look at first, and the sentence of an empty
// pick in a role other than an explanation.
test("the heading of a pick stands in text-strong and the sentence of an empty pick in text-secondary", async () => {
  await withPage(async (page) => {
    await mount(
      page,
      propsOf(stateWith({ gear: { ...NOTHING, mainHand: "stick" } })),
    );
    await press(tile(page.root, "mainHand"));
    const heading = page.root.querySelector(".character-gear-pick-heading");
    assert.equal(computed(heading, "color"), "var(--text-strong)");
    const sentence = page.root.querySelector(".character-gear-pick-empty");
    assert.equal(computed(sentence, "color"), "var(--text-secondary)");
  });
});

/**
 * A stand-in of the state store: `act` runs its body with a `take` that replaces the state and records
 * the call, and the redraw the page's registry makes after a result is made by `after`. The reading of the
 * clock that comes first in `act` is `reading`, which changes nothing unless a case sets it.
 */
function standInStore(initial) {
  const log = [];
  let state = initial;
  const store = {
    log,
    after: () => {},
    reading: (held) => held,
    get: () => state,
    moment: () => NOW,
    act(body) {
      log.push("act");
      state = store.reading(state);
      body((result) => {
        state = result.state;
      });
      store.after();
    },
    actWithoutCatchUp(body) {
      log.push("actWithoutCatchUp");
      body((result) => {
        state = result.state;
      });
      store.after();
    },
  };
  return store;
}

/** Builds the entry of Postać for the character 1 in the page, redrawn after each act of the store. */
async function enter(page, store) {
  let instance = null;
  await inAct(() => {
    instance = createCharacterEntry({ store }).build(
      {
        current: () => ({ kind: "character", characterId: ID }),
        show() {},
        focusShown() {},
        focusIfLost() {},
      },
      { kind: "character", characterId: ID },
    );
    store.after = () => instance.drawResult([]);
    page.root.append(instance.element);
  });
  return instance;
}

// Catches an act that calls the simulation with the state it holds and no reading of the clock before it
// (D-409), an act that goes through the store's act without catch-up, a slot or an item that does not
// reach the simulation, and a result that is not taken into the store.
test("the entry runs the two acts through the store's act that counts the time first, putting the chosen piece on the chosen slot and taking a piece off into the chest", async () => {
  // decision: D-409 "An act of the player that depends on the passing of time goes through the store of the game state, which reads the clock and passes the time elapsed to the simulation before the act runs, so no act reads the clock itself before it calls the simulation."
  // decision: D-461 "Choosing an item moves one piece of it from the chest into the slot and the piece the slot held back into the chest, and „Zdejmij” moves the piece of the slot into the chest."
  await withPage(async (page) => {
    const state = stateWith({
      gear: { ...NOTHING, mainHand: "stick" },
      pieces: { bandage: 2 },
    });
    const store = standInStore(state);
    const instance = await enter(page, store);

    await press(tile(page.root, "pocket2"));
    await press(cellsOf(page.root)[0]);
    assert.deepEqual(
      store.log,
      ["act"],
      "one act of the store that counts the time",
    );
    const put = store.get().team;
    assert.equal(put.characters[0].gear.pocket2, "bandage");
    assert.equal(put.characters[0].gear.pocket1, null, "no other pocket");
    assert.deepEqual(
      put.chest.pieces,
      { bandage: 1 },
      "one piece left the chest",
    );
    assert.equal(
      pickOf(page.root),
      null,
      "the screen was drawn again, the pick closed",
    );
    assert.equal(
      tile(page.root, "pocket2").getAttribute("aria-label"),
      "opatrunek",
      "and the tile shows the piece",
    );

    await press(tile(page.root, "mainHand"));
    assert.deepEqual(
      facesOf(page.root).map((face) => face.name),
      ["Zdejmij"],
    );
    await press(cellsOf(page.root)[0]);
    assert.deepEqual(store.log, ["act", "act"]);
    const off = store.get().team;
    assert.equal(off.characters[0].gear.mainHand, null);
    assert.deepEqual(off.chest.pieces, { bandage: 1, stick: 1 });
    assert.equal(
      tile(page.root, "mainHand").textContent,
      "Ręka główna",
      "the tile of the emptied slot shows its pale name",
    );
    await inAct(() => instance.dispose());
  });
});

// Catches an act that reads the state before the store's reading of the clock, which the store's act
// hands to the body: the act must read the store's state inside its body.
test("the entry reads the state inside the body of the store's act, after its reading of the clock", async () => {
  // decision: D-409 "An act of the player that depends on the passing of time goes through the store of the game state, which reads the clock and passes the time elapsed to the simulation before the act runs, so no act reads the clock itself before it calls the simulation."
  await withPage(async (page) => {
    const state = stateWith({
      gear: { ...NOTHING, mainHand: "stick" },
      pieces: { bandage: 1 },
    });
    const store = standInStore(state);
    // The reading of the clock takes the stick out of the hand, as a death settled in the time caught up
    // would: an entry that read the state before the reading would give the simulation the stick still held.
    store.reading = (held) => ({
      ...held,
      team: {
        ...held.team,
        characters: [{ ...held.team.characters[0], gear: NOTHING }],
      },
    });
    await enter(page, store);
    await press(tile(page.root, "pocket1"));
    await press(cellsOf(page.root)[0]);
    const gear = store.get().team.characters[0].gear;
    assert.equal(gear.pocket1, "bandage");
    assert.equal(
      gear.mainHand,
      null,
      "what the reading of the clock left stands",
    );
  });
});
