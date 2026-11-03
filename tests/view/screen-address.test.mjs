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

const HEADQUARTERS = { kind: "headquarters" };
const PROGRAMS = { kind: "programs" };

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
    createCharacter(newGame(), "Ala").state,
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
  ["a hash alone", "#"],
  ["the empty fragment", ""],
];

for (const [name, fragment] of NO_SCREEN_FRAGMENTS) {
  test(`a fragment with ${name} reads as no screen`, () => {
    assert.equal(readScreenAddress(fragment), null);
  });
}

test("the address of Siedziba reads as the headquarters", () => {
  assert.deepEqual(readScreenAddress("#/"), HEADQUARTERS);
});

test("the address of Programy reads as the programs screen", () => {
  assert.deepEqual(readScreenAddress("#/programy"), PROGRAMS);
});

test("the address of a character reads as its screen, with the number as a decimal", () => {
  assert.deepEqual(readScreenAddress("#/postac/12"), {
    kind: "character",
    characterId: 12,
  });
});

test("the address of a map run reads as its screen, by the number of its character", () => {
  assert.deepEqual(readScreenAddress("#/postac/2/przejscie"), {
    kind: "run",
    characterId: 2,
  });
});

test("the address of a program reads as its screen, by the number of the program", () => {
  assert.deepEqual(readScreenAddress("#/programy/3"), {
    kind: "program",
    programId: 3,
  });
});

test("every screen writes the address that reads back to it", () => {
  for (const [screen, address] of [
    [HEADQUARTERS, "#/"],
    [{ kind: "character", characterId: 7 }, "#/postac/7"],
    [PROGRAMS, "#/programy"],
    [{ kind: "program", programId: 4 }, "#/programy/4"],
    [{ kind: "run", characterId: 2 }, "#/postac/2/przejscie"],
  ]) {
    assert.equal(screenAddress(screen), address);
    assert.deepEqual(readScreenAddress(address), screen);
  }
});

test("a map run screen with no map run of its character gives the character's screen", () => {
  assert.deepEqual(
    resolveScreen({ kind: "run", characterId: 1 }, explicitGame()),
    { kind: "character", characterId: 1 },
  );
});

test("a map run screen of a character with a map run stays the map run screen", () => {
  assert.deepEqual(
    resolveScreen({ kind: "run", characterId: 2 }, withRunOfCharacterTwo(212)),
    { kind: "run", characterId: 2 },
  );
});

test("a map run screen of a character with no map run, but with another's, gives the character's screen", () => {
  assert.deepEqual(
    resolveScreen({ kind: "run", characterId: 1 }, withRunOfCharacterTwo(212)),
    { kind: "character", characterId: 1 },
  );
});

test("a map run screen of a number no character carries gives Siedziba", () => {
  assert.deepEqual(
    resolveScreen({ kind: "run", characterId: 9 }, withRunOfCharacterTwo(212)),
    HEADQUARTERS,
  );
});

test("a character screen of a number no character carries gives Siedziba", () => {
  assert.deepEqual(
    resolveScreen({ kind: "character", characterId: 9 }, explicitGame()),
    HEADQUARTERS,
  );
});

test("a character screen of a character of the team stays", () => {
  assert.deepEqual(
    resolveScreen({ kind: "character", characterId: 2 }, explicitGame()),
    { kind: "character", characterId: 2 },
  );
});

test("a program screen of a number no program carries gives Programy", () => {
  assert.deepEqual(
    resolveScreen({ kind: "program", programId: 2 }, explicitGame()),
    PROGRAMS,
  );
});

test("a program screen of a program of the player stays", () => {
  assert.deepEqual(
    resolveScreen({ kind: "program", programId: 3 }, explicitGame()),
    { kind: "program", programId: 3 },
  );
});

test("no screen named gives Siedziba", () => {
  assert.deepEqual(resolveScreen(null, explicitGame()), HEADQUARTERS);
});

test("Siedziba and the screen of a character mark the headquarters item of the menu bar", () => {
  assert.equal(markedMenuItem(HEADQUARTERS), "headquarters");
  assert.equal(
    markedMenuItem({ kind: "character", characterId: 2 }),
    "headquarters",
  );
});

test("Programy and a program of Programy mark the programs item of the menu bar", () => {
  assert.equal(markedMenuItem(PROGRAMS), "programs");
  assert.equal(markedMenuItem({ kind: "program", programId: 3 }), "programs");
});

test("the screen of a map run marks no item of the menu bar", () => {
  assert.equal(markedMenuItem({ kind: "run", characterId: 2 }), null);
});

test("with no map run in the game state, the return entry is absent", () => {
  assert.equal(returnToRunEntry(explicitGame()), null);
});

test("a map run going on gives the return entry with its map's name, its minute and its address", () => {
  assert.deepEqual(returnToRunEntry(withRunOfCharacterTwo(212)), {
    text: "Wróć do przejścia · Las · minuta 212",
    address: "#/postac/2/przejscie",
  });
});

test("a map run ended in death and waiting for „Restart” or „Zakończ” keeps the return entry, with its minute still", () => {
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
