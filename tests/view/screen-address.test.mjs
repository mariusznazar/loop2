// The screen addresses (D-281): reading a fragment into a screen, the nearest existing screen,
// the address a screen writes, the item of the menu bar that marks it (D-277, D-280) and the
// „Wróć do przejścia” entry (D-280). The states below are explicit: a game of the new kind, with
// the team, the programs and the map run set in the test.
import assert from "node:assert/strict";
import { test } from "node:test";
import {
  markedMenuItem,
  readScreenAddress,
  resolveScreen,
  returnToRunEntry,
  screenAddress,
} from "../../dist/browser/view/screen-address.js";
import { createCharacter, newGame, send } from "../../dist/browser/sim/game.js";
import { withEdgeSolved } from "../sim/understanding-fixture.mjs";

const HEADQUARTERS = { kind: "headquarters" };
const PROGRAMS = { kind: "programs" };
const MAPS_SCREEN = { kind: "maps" };
const ACCOUNTS = { kind: "accounts" };

/** A game whose team holds the characters 1 and 2, whose programs are 1 and 3, and no map run. */
function explicitGame() {
  return {
    ...newGame(),
    team: {
      characters: [
        { id: 1, name: "Ala" },
        { id: 2, name: "Bartek" },
      ],
      chest: { pieces: {} },
    },
    programs: [
      { id: 1, name: "Program", program: {} },
      { id: 3, name: "Las nocą", program: {} },
    ],
    run: null,
  };
}

/** The explicit game with a map run of the forest for character 2, sent for real. */
function withRunOfCharacterTwo(minute, death = null) {
  const sentRun = send(
    createCharacter(withEdgeSolved(newGame()), "Ala").state,
    { mapId: "forest", characterId: 1 },
    1760000000000,
  ).state.run;
  return {
    ...explicitGame(),
    run: {
      ...sentRun,
      character: { ...sentRun.character, id: 2 },
      minute,
      death,
    },
  };
}

// The fragments of the crafted table: each reads as no screen, and none of them throws.
const NO_SCREEN_FRAGMENTS = [
  ["a character number with a letter", "#/postac/x"],
  ["a character number with a minus sign", "#/postac/-1"],
  ["a character number of zero", "#/postac/0"],
  ["a character number with a leading zero", "#/postac/01"],
  ["a character number with a fraction", "#/postac/1.5"],
  ["a character number in exponent form", "#/postac/1e3"],
  ["a program number with a minus sign", "#/programy/-1"],
  ["a program address with no number", "#/programy/"],
  ["a map run address with a fragment after it", "#/postac/1/przejscie/x"],
  ["a double slash", "#//"],
  ["a fragment of 10 000 characters", "#/postac/" + "1".repeat(10000)],
  ["the fragment of an emailed confirmation", "#confirm-email=abc"],
  ["the fragment of a password-reset link", "#reset-password=abc"],
  [
    "an emailed fragment after a character address",
    "#/postac/1#confirm-email=x",
  ],
  ["a percent-encoded number", "#/postac/%31"],
  ["an upper-case address", "#/POSTAC/1"],
  ["a map address with no map", "#/mapy/"],
  [
    "a map address with a hyphen in place of the identifier",
    "#/mapy/forest-deep",
  ],
  ["a map address with a Polish name of the map", "#/mapy/las-glebiej"],
  ["a map address with a capital letter", "#/mapy/Forest"],
  ["a map address with a percent-encoded identifier", "#/mapy/%66orest"],
  ["a map address with a fragment after the identifier", "#/mapy/forest/x"],
  ["a map address with a hash after the identifier", "#/mapy/forest#x"],
  ["a map address naming a prototype property", "#/mapy/__proto__"],
  ["a map address naming an inherited property", "#/mapy/constructor"],
  ["an upper-case map address", "#/MAPY"],
  ["a map address with a trailing slash", "#/mapy/forest/"],
  ["a hash alone", "#"],
  ["the empty fragment", ""],
];

for (const [name, fragment] of NO_SCREEN_FRAGMENTS) {
  test(`a fragment with ${name} reads as no screen`, () => {
    // decision: D-281 "An address names a screen in the fragment after `#`"
    // decision: D-281 "The fragments of emailed links (D-156, D-224) stand apart from these, and after them the page opens Siedziba"
    // decision: D-332 "In `#/mapy/{map}`, {map} is the identifier of the map in the game's data as it stands"
    assert.equal(readScreenAddress(fragment), null);
  });
}

test("the address of Siedziba reads as the headquarters", () => {
  // decision: D-281 "An address names a screen in the fragment after `#`"
  assert.deepEqual(readScreenAddress("#/"), HEADQUARTERS);
});

test("the address of Programy reads as the programs screen", () => {
  // decision: D-281 "An address names a screen in the fragment after `#`"
  assert.deepEqual(readScreenAddress("#/programy"), PROGRAMS);
});

test("the address of a character reads as its screen, with the number as a decimal", () => {
  // decision: D-281 "An address names a screen in the fragment after `#`"
  assert.deepEqual(readScreenAddress("#/postac/12"), {
    kind: "character",
    characterId: 12,
  });
});

test("the address of a map run reads as its screen, by the number of its character", () => {
  // decision: D-281 "An address names a screen in the fragment after `#`"
  assert.deepEqual(readScreenAddress("#/postac/2/przejscie"), {
    kind: "run",
    characterId: 2,
  });
});

test("the address of a program reads as its screen, by the number of the program", () => {
  // decision: D-281 "An address names a screen in the fragment after `#`"
  assert.deepEqual(readScreenAddress("#/programy/3"), {
    kind: "program",
    programId: 3,
  });
});

test("the address of the maps reads as the maps screen", () => {
  // decision: D-281 "An address names a screen in the fragment after `#`"
  assert.deepEqual(readScreenAddress("#/mapy"), MAPS_SCREEN);
});

test("the address of a map reads as its screen, by the identifier of the map in the data", () => {
  // decision: D-281 "An address names a screen in the fragment after `#`"
  // decision: D-332 "In `#/mapy/{map}`, {map} is the identifier of the map in the game's data as it stands"
  assert.deepEqual(readScreenAddress("#/mapy/forest"), {
    kind: "map",
    mapId: "forest",
  });
  assert.deepEqual(readScreenAddress("#/mapy/forestDeep"), {
    kind: "map",
    mapId: "forestDeep",
  });
});

test("every screen writes the address that reads back to it", () => {
  // decision: D-281 "An address names a screen in the fragment after `#`"
  // decision: D-332 "In `#/mapy/{map}`, {map} is the identifier of the map in the game's data as it stands"
  for (const [screen, address] of [
    [HEADQUARTERS, "#/"],
    [{ kind: "character", characterId: 7 }, "#/postac/7"],
    [PROGRAMS, "#/programy"],
    [{ kind: "program", programId: 4 }, "#/programy/4"],
    [{ kind: "run", characterId: 2 }, "#/postac/2/przejscie"],
    [MAPS_SCREEN, "#/mapy"],
    [{ kind: "map", mapId: "forest" }, "#/mapy/forest"],
    [{ kind: "map", mapId: "forestDeep" }, "#/mapy/forestDeep"],
    [ACCOUNTS, "#/konta"],
  ]) {
    assert.equal(screenAddress(screen), address);
    assert.deepEqual(readScreenAddress(address), screen);
  }
});

test("a map run screen with no map run of its character gives the character's screen", () => {
  // decision: D-281 "An address names a screen in the fragment after `#`"
  assert.deepEqual(
    resolveScreen({ kind: "run", characterId: 1 }, explicitGame(), false),
    { kind: "character", characterId: 1 },
  );
});

test("a map run screen of a character with a map run stays the map run screen", () => {
  // decision: D-281 "An address names a screen in the fragment after `#`"
  assert.deepEqual(
    resolveScreen(
      { kind: "run", characterId: 2 },
      withRunOfCharacterTwo(212),
      false,
    ),
    { kind: "run", characterId: 2 },
  );
});

test("a map run screen of a character with no map run, but with another's, gives the character's screen", () => {
  // decision: D-281 "An address names a screen in the fragment after `#`"
  assert.deepEqual(
    resolveScreen(
      { kind: "run", characterId: 1 },
      withRunOfCharacterTwo(212),
      false,
    ),
    { kind: "character", characterId: 1 },
  );
});

test("a map run screen of a number no character carries gives Siedziba", () => {
  // decision: D-281 "An address names a screen in the fragment after `#`"
  assert.deepEqual(
    resolveScreen(
      { kind: "run", characterId: 9 },
      withRunOfCharacterTwo(212),
      false,
    ),
    HEADQUARTERS,
  );
});

test("a character screen of a number no character carries gives Siedziba", () => {
  // decision: D-281 "An address names a screen in the fragment after `#`"
  assert.deepEqual(
    resolveScreen({ kind: "character", characterId: 9 }, explicitGame(), false),
    HEADQUARTERS,
  );
});

test("a character screen of a character of the team stays", () => {
  // decision: D-281 "An address names a screen in the fragment after `#`"
  assert.deepEqual(
    resolveScreen({ kind: "character", characterId: 2 }, explicitGame(), false),
    { kind: "character", characterId: 2 },
  );
});

test("a program screen of a number no program carries gives Programy", () => {
  // decision: D-281 "An address names a screen in the fragment after `#`"
  assert.deepEqual(
    resolveScreen({ kind: "program", programId: 2 }, explicitGame(), false),
    PROGRAMS,
  );
});

test("a program screen of a program of the player stays", () => {
  // decision: D-281 "An address names a screen in the fragment after `#`"
  assert.deepEqual(
    resolveScreen({ kind: "program", programId: 3 }, explicitGame(), false),
    { kind: "program", programId: 3 },
  );
});

test("no screen named gives Siedziba", () => {
  // decision: D-281 "An address names a screen in the fragment after `#`"
  assert.deepEqual(resolveScreen(null, explicitGame(), false), HEADQUARTERS);
});

test("the maps screen stays", () => {
  // decision: D-281 "An address names a screen in the fragment after `#`"
  assert.deepEqual(
    resolveScreen(MAPS_SCREEN, explicitGame(), false),
    MAPS_SCREEN,
  );
});

test("a map off the list of open maps gives Siedziba: a map whose opening map is not solved", () => {
  // decision: D-281 "An address names a screen in the fragment after `#`"
  for (const mapId of ["forest", "forestDeep"]) {
    assert.deepEqual(
      resolveScreen({ kind: "map", mapId }, explicitGame(), false),
      HEADQUARTERS,
      mapId,
    );
  }
});

test("a map with no opening map stays, although no map is solved", () => {
  // decision: D-281 "An address names a screen in the fragment after `#`"
  assert.deepEqual(
    resolveScreen({ kind: "map", mapId: "forestEdge" }, explicitGame(), false),
    { kind: "map", mapId: "forestEdge" },
  );
});

test("a map whose opening map is solved stays", () => {
  // decision: D-281 "An address names a screen in the fragment after `#`"
  const edge = { ...explicitGame(), solvedMaps: ["forestEdge"] };
  assert.deepEqual(
    resolveScreen({ kind: "map", mapId: "forest" }, edge, false),
    {
      kind: "map",
      mapId: "forest",
    },
  );
  const game = { ...explicitGame(), solvedMaps: ["forest"] };
  assert.deepEqual(
    resolveScreen({ kind: "map", mapId: "forestDeep" }, game, false),
    {
      kind: "map",
      mapId: "forestDeep",
    },
  );
});

// decision: D-281 "`#/konta` names the screen of the list of accounts (D-411) for an account with the owner role; for any other account it leads to no existing screen, falls under „any other” and opens Siedziba."
// Catches an address of the list that a reading loses, so the owner's page opens Siedziba instead.
test("the address of the list of accounts reads as its screen", () => {
  assert.deepEqual(readScreenAddress("#/konta"), ACCOUNTS);
});

// decision: D-281 "`#/konta` names the screen of the list of accounts (D-411) for an account with the owner role; for any other account it leads to no existing screen, falls under „any other” and opens Siedziba."
// Catches an owner's address resolved to Siedziba, as a reload of the list would then do, and a
// player's address resolved to the list, which the server would refuse anyway.
test("an owner's address of the list of accounts opens the list at a reload", () => {
  assert.deepEqual(
    resolveScreen(readScreenAddress("#/konta"), explicitGame(), true),
    ACCOUNTS,
  );
});

// decision: D-281 "`#/konta` names the screen of the list of accounts (D-411) for an account with the owner role; for any other account it leads to no existing screen, falls under „any other” and opens Siedziba."
// Catches a player's address of the list that opens the list, instead of Siedziba as any unknown
// address does.
test("a player's address of the list of accounts opens Siedziba", () => {
  assert.deepEqual(
    resolveScreen(readScreenAddress("#/konta"), explicitGame(), false),
    HEADQUARTERS,
  );
});

// decision: D-280 "An account with the owner role (D-410) has one more screen, the list of accounts (D-411), of the same content width, which is no item of the bar"
// Catches a list that marks an item of the bar, which would make the bar differ between a player and
// an owner.
test("the list of accounts marks no item of the menu bar", () => {
  assert.equal(markedMenuItem(ACCOUNTS), null);
});

test("Siedziba and the screen of a character mark the headquarters item of the menu bar", () => {
  // decision: D-277 "The menu bar marks the place the player is at"
  // decision: D-280 "The name of a character on its card on Siedziba leads to the screen Postać of that character, on which the menu bar marks Siedziba, on the screen Mapy under each of its addresses the menu bar marks Mapy, and on the screen of a map run the menu bar marks no item"
  assert.equal(markedMenuItem(HEADQUARTERS), "headquarters");
  assert.equal(
    markedMenuItem({ kind: "character", characterId: 2 }),
    "headquarters",
  );
});

test("Programy and a program of Programy mark the programs item of the menu bar", () => {
  // decision: D-277 "The menu bar marks the place the player is at"
  assert.equal(markedMenuItem(PROGRAMS), "programs");
  assert.equal(markedMenuItem({ kind: "program", programId: 3 }), "programs");
});

test("the screen of a map run marks no item of the menu bar", () => {
  // decision: D-280 "The name of a character on its card on Siedziba leads to the screen Postać of that character, on which the menu bar marks Siedziba, on the screen Mapy under each of its addresses the menu bar marks Mapy, and on the screen of a map run the menu bar marks no item"
  assert.equal(markedMenuItem({ kind: "run", characterId: 2 }), null);
});

test("the maps screen and a map's screen mark the maps item of the menu bar", () => {
  // decision: D-277 "The menu bar marks the place the player is at"
  // decision: D-280 "The name of a character on its card on Siedziba leads to the screen Postać of that character, on which the menu bar marks Siedziba, on the screen Mapy under each of its addresses the menu bar marks Mapy, and on the screen of a map run the menu bar marks no item"
  assert.equal(markedMenuItem(MAPS_SCREEN), "maps");
  assert.equal(markedMenuItem({ kind: "map", mapId: "forest" }), "maps");
});

test("with no map run in the game state, the return entry is absent", () => {
  // decision: D-280 "The menu bar holds at its left the game's name, which stands alone on the waiting screens (D-262), and over the game the items Siedziba, Mapy and Programy, with no icons, and the menu „Konto” with the address and „Wyloguj”, and outside the screen of a manual map run that goes on, or that has ended and waits for „Restart” or „Zakończ”, it also holds „Wróć do przejścia · {mapa} · minuta {m}”, which leads to the screen of that map run, its minute being the map run's game minute as the clock in the header of that screen writes it"
  assert.equal(returnToRunEntry(explicitGame()), null);
});

test("a map run going on gives the return entry with its map's name, its minute and its address", () => {
  // decision: D-280 "The menu bar holds at its left the game's name, which stands alone on the waiting screens (D-262), and over the game the items Siedziba, Mapy and Programy, with no icons, and the menu „Konto” with the address and „Wyloguj”, and outside the screen of a manual map run that goes on, or that has ended and waits for „Restart” or „Zakończ”, it also holds „Wróć do przejścia · {mapa} · minuta {m}”, which leads to the screen of that map run, its minute being the map run's game minute as the clock in the header of that screen writes it"
  assert.deepEqual(returnToRunEntry(withRunOfCharacterTwo(212)), {
    text: "Wróć do przejścia · Las · minuta 212",
    address: "#/postac/2/przejscie",
  });
});

test("a map run ended in death and waiting for „Restart” or „Zakończ” keeps the return entry, with its minute still", () => {
  // decision: D-280 "The menu bar holds at its left the game's name, which stands alone on the waiting screens (D-262), and over the game the items Siedziba, Mapy and Programy, with no icons, and the menu „Konto” with the address and „Wyloguj”, and outside the screen of a manual map run that goes on, or that has ended and waits for „Restart” or „Zakończ”, it also holds „Wróć do przejścia · {mapa} · minuta {m}”, which leads to the screen of that map run, its minute being the map run's game minute as the clock in the header of that screen writes it"
  assert.deepEqual(
    returnToRunEntry(
      withRunOfCharacterTwo(212, { minute: 212, cause: "hunger" }),
    ),
    {
      text: "Wróć do przejścia · Las · minuta 212",
      address: "#/postac/2/przejscie",
    },
  );
});
