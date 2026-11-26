// The count of the player's gear changes that a remembered judging holds (D-463), in the judging cache
// of the browser view (D-441), at its trust boundary: the value of a judging holds the count of its
// character in the game state the judging read, the judging stands only while that count equals the one
// the game state at hand gives its character, the opening removes the values whose count stands above
// that of their character in the loaded game, and the entry of Mapy gives the cache the state it read
// and the state at hand. The storage is a stand-in backed by a map; the screen of the entry is built on
// jsdom through tests/view/page-document.mjs (D-264), over the real simulation. The values written by
// hand are the stored form of version 3 of the cache. The crafted counts — missing, of another type,
// negative, fractional, beyond the safe integers — are cases of tests/view/judging-cache.test.mjs.
import { assert, inAct, press, withPage } from "./page-document.mjs";
import { test } from "node:test";
import { createCharacter, newGame } from "../../dist/browser/sim/game.js";
import { putOnPiece, takeOffPiece } from "../../dist/browser/sim/gear.js";
import { editProgram } from "../../dist/browser/sim/programs.js";
import { openJudgingCache } from "../../dist/browser/view/judging-cache.js";
import { createMapsEntry } from "../../dist/browser/view/maps-entry.js";
import { REFERENCE_PROGRAMS } from "../sim/reference-programs.mjs";
import { newKnowingGame } from "../sim/understanding-fixture.mjs";

const ACCOUNT = "acct-1";
const MADE = 1000;
const ALA = { characterId: 1, programId: 1, mapId: "forest" };
const ALA_KEY = "loop2-judging-3|acct-1|1000|1|1|forest";
const FINGERPRINT = "0123456789abcdef";

/**
 * The loaded game made at `madeAtMs` with Ala (character 1) and Bob (character 2), who have made
 * `ala` and `bob` gear changes, and the first program (program 1); the numbers the game gives next are 3
 * and 2.
 */
function game({ ala = 0, bob = 0, madeAtMs = MADE } = {}) {
  const first = createCharacter(newGame(madeAtMs), "Ala").state;
  const made = createCharacter(first, "Bob").state;
  const counts = new Map([
    [1, ala],
    [2, bob],
  ]);
  return {
    ...made,
    team: {
      ...made.team,
      characters: made.team.characters.map((character) => ({
        ...character,
        gearChanges: counts.get(character.id),
      })),
    },
  };
}

/** A record of a judging that solved `solved` seeds and died on the rest. */
function record(solved = 12) {
  return {
    results: [
      ...Array(solved).fill("solved"),
      ...Array(12 - solved).fill("death"),
    ],
    equipment: [],
    contentRevision: 0,
    contentFingerprint: FINGERPRINT,
    generation: 1,
  };
}

/** The stored value of a judging at `gearChanges` and the character's generation 1 and content revision 0. */
const valueAt = (gearChanges) =>
  JSON.stringify({
    results: "ssssssssssss",
    equipment: [],
    revision: 0,
    fingerprint: FINGERPRINT,
    generation: 1,
    gearChanges,
  });

/** A storage backed by a map, holding `initial`; `held` is the map. */
function mapStorage(initial = {}) {
  const held = new Map(Object.entries(initial));
  return {
    held,
    get length() {
      return held.size;
    },
    key: (index) => [...held.keys()][index] ?? null,
    getItem: (key) => (held.has(key) ? held.get(key) : null),
    setItem: (key, value) => void held.set(key, String(value)),
    removeItem: (key) => void held.delete(key),
  };
}

/** A storage that refuses every write, and holds what it held. */
function refusingStorage(initial = {}) {
  return {
    ...mapStorage(initial),
    setItem() {
      throw new DOMException("the quota is full", "QuotaExceededError");
    },
  };
}

/**
 * Opens the cache on `storage` with `state` as the loaded game. A read or a write the case gives no game
 * state takes the loaded game, as at a page whose game state at hand is the one it opened the cache with.
 */
function open(storage, state = game(), over = {}) {
  const cache = openJudgingCache({
    accountId: ACCOUNT,
    state,
    afterRefusedSave: false,
    storage,
    ...over,
  });
  return {
    ...cache,
    read: (ids, at = state) => cache.read(ids, at),
    remember: (ids, given, at = state) => cache.remember(ids, given, at),
  };
}

const keysOf = (storage) => [...storage.held.keys()].sort();

// ---------------------------------------------------------------------------------------------------
// What is stored, and when it stands

// Catches a count that is not stored, one stored for another character, and one taken from the state the
// cache was opened with where the judging read another.
test("a judging is stored with the count of its character in the game state it read, and with 0 for a character that state lacks", () => {
  // decision: D-463 "The value of a remembered judging holds the count of its character in the game state the judging read (D-441), and the judging stands beside the list „Program:” only while that count equals the count the game state gives its character, so that a change of the gear made by the player erases every judging remembered for that character, on every map (D-440)."
  const storage = mapStorage();
  const cache = open(storage, game({ ala: 0, bob: 0 }));
  cache.remember(ALA, record(), game({ ala: 3, bob: 9 }));
  assert.equal(JSON.parse(storage.held.get(ALA_KEY)).gearChanges, 3);
  cache.remember(
    { ...ALA, characterId: 2 },
    record(),
    game({ ala: 3, bob: 9 }),
  );
  assert.equal(
    JSON.parse(storage.held.get("loop2-judging-3|acct-1|1000|2|1|forest"))
      .gearChanges,
    9,
  );
  cache.remember({ ...ALA, characterId: 7 }, record(), game());
  assert.equal(
    JSON.parse(storage.held.get("loop2-judging-3|acct-1|1000|7|1|forest"))
      .gearChanges,
    0,
  );
});

// Catches a judging that stands after a change of the gear, one that stands for a count below as well as
// above the stored one, and a read that removes the value.
test("a judging stands only while the character's count in the state at hand equals the stored one, and the value stays in the storage", () => {
  // decision: D-463 "The value of a remembered judging holds the count of its character in the game state the judging read (D-441), and the judging stands beside the list „Program:” only while that count equals the count the game state gives its character, so that a change of the gear made by the player erases every judging remembered for that character, on every map (D-440)."
  const storage = mapStorage();
  const cache = open(storage);
  cache.remember(ALA, record(7), game({ ala: 2 }));
  assert.deepEqual(cache.read(ALA, game({ ala: 2 })), record(7));
  assert.equal(cache.read(ALA, game({ ala: 3 })), null, "one change after");
  assert.equal(cache.read(ALA, game({ ala: 1 })), null, "below the stored");
  assert.equal(cache.read(ALA, game({ ala: 0 })), null);
  assert.equal(JSON.parse(storage.held.get(ALA_KEY)).gearChanges, 2);
  assert.deepEqual(
    cache.read(ALA, game({ ala: 2 })),
    record(7),
    "it stands again at its own count, since a read removes nothing",
  );
});

// Catches an erasure of the judgings of one map alone, and one that reaches another character.
test("a change of the gear of a character takes its judgings on every map and no other character's", () => {
  // decision: D-463 "The value of a remembered judging holds the count of its character in the game state the judging read (D-441), and the judging stands beside the list „Program:” only while that count equals the count the game state gives its character, so that a change of the gear made by the player erases every judging remembered for that character, on every map (D-440)."
  const storage = mapStorage();
  const cache = open(storage);
  const triples = [
    [1, 1, "forest"],
    [1, 1, "forestEdge"],
    [1, 2, "forest"],
    [2, 1, "forest"],
    [2, 1, "forestEdge"],
  ].map(([characterId, programId, mapId]) => ({
    characterId,
    programId,
    mapId,
  }));
  for (const ids of triples) cache.remember(ids, record(3), game());
  const changed = game({ ala: 1 });
  assert.deepEqual(
    triples.map((ids) => cache.read(ids, changed) !== null),
    [false, false, false, true, true],
  );
});

test("a cache opened anew on the same storage reads a judging at the same count, and none at another", () => {
  // decision: D-463 "The value of a remembered judging holds the count of its character in the game state the judging read (D-441), and the judging stands beside the list „Program:” only while that count equals the count the game state gives its character, so that a change of the gear made by the player erases every judging remembered for that character, on every map (D-440)."
  const storage = mapStorage();
  open(storage, game({ ala: 5 })).remember(ALA, record(9));
  assert.deepEqual(open(storage, game({ ala: 5 })).read(ALA), record(9));
  assert.equal(open(storage, game({ ala: 6 })).read(ALA), null);
  assert.equal(
    keysOf(storage).length,
    1,
    "a count above is removed, below kept",
  );
});

test("a judging of a character the state at hand does not hold reads as none", () => {
  const cache = open(mapStorage());
  cache.remember({ ...ALA, characterId: 7 }, record(), game());
  assert.equal(cache.read({ ...ALA, characterId: 7 }, game()), null);
});

// Catches a count the page keeps for a refused write that is not compared.
test("a judging kept for the open page after a refused write is read against the count too", () => {
  // decision: D-463 "The value of a remembered judging holds the count of its character in the game state the judging read (D-441), and the judging stands beside the list „Program:” only while that count equals the count the game state gives its character, so that a change of the gear made by the player erases every judging remembered for that character, on every map (D-440)."
  const cache = open(refusingStorage());
  cache.remember(ALA, record(6), game({ ala: 2 }));
  assert.deepEqual(cache.read(ALA, game({ ala: 2 })), record(6));
  assert.equal(cache.read(ALA, game({ ala: 3 })), null);
  const none = open(null);
  none.remember(ALA, record(6), game({ ala: 2 }));
  assert.equal(none.read(ALA, game({ ala: 3 })), null);
});

// ---------------------------------------------------------------------------------------------------
// The version of the stored form

// Catches a value of version 2, which holds no count, that is read, overwritten or removed.
test("a value under a key of version 2 is neither read, written nor removed, at an opening of any kind", () => {
  // invariant: judging-cache-reading
  // decision: D-463 "The count is a part of the stored form of a judging, whose version rises with it, so a value stored without it shows nothing; when the page opens the remembered judgings of a game it removes also the values of this game whose count stands above that of their character in the loaded game, as it does for the generation number (D-441)."
  const version2 = JSON.stringify({
    results: "ssssssssssss",
    equipment: [],
    revision: 0,
    fingerprint: FINGERPRINT,
    generation: 1,
  });
  const old = {
    "loop2-judging-2|acct-1|1000|1|1|forest": version2,
    "loop2-judging-2|acct-1|999|1|1|forest": version2,
    "loop2-judging-2|acct-1|1000|9|9|forest": version2,
  };
  for (const over of [{}, { afterRefusedSave: true }]) {
    const storage = mapStorage(old);
    const cache = open(storage, game(), over);
    assert.equal(cache.read(ALA), null, JSON.stringify(over));
    cache.remember(ALA, record(3));
    assert.deepEqual(cache.read(ALA), record(3));
    for (const [key, value] of Object.entries(old))
      assert.equal(storage.held.get(key), value, key);
  }
  // A value of version 2 put under the key of version 3 holds no count and shows nothing.
  const storage = mapStorage({ [ALA_KEY]: version2 });
  assert.equal(open(storage).read(ALA), null);
  assert.equal(storage.held.get(ALA_KEY), version2);
});

// ---------------------------------------------------------------------------------------------------
// What the opening removes

// Catches an opening that ignores the count, one that removes a value at the loaded count, and one that
// removes a value below it.
test("the opening removes the values of this game whose count stands above that of their character in the loaded game, and keeps one equal or below", () => {
  // decision: D-463 "The count is a part of the stored form of a judging, whose version rises with it, so a value stored without it shows nothing; when the page opens the remembered judgings of a game it removes also the values of this game whose count stands above that of their character in the loaded game, as it does for the generation number (D-441)."
  const at = (ids) => `loop2-judging-3|acct-1|1000|${ids}|forest`;
  const storage = mapStorage({
    [at("1|1")]: valueAt(2),
    [at("1|2")]: valueAt(3),
    [at("1|3")]: valueAt(1),
    [at("1|4")]: valueAt(0),
    [at("2|1")]: valueAt(5),
    [at("2|2")]: valueAt(6),
  });
  open(storage, { ...game({ ala: 2, bob: 5 }), nextProgramId: 5 });
  assert.deepEqual(
    keysOf(storage),
    [at("1|1"), at("1|3"), at("1|4"), at("2|1")].sort(),
  );
});

test("the opening removes a value above the count of its character where the game no longer holds its program, and another account's value above it stays", () => {
  // decision: D-463 "The count is a part of the stored form of a judging, whose version rises with it, so a value stored without it shows nothing; when the page opens the remembered judgings of a game it removes also the values of this game whose count stands above that of their character in the loaded game, as it does for the generation number (D-441)."
  const storage = mapStorage({
    "loop2-judging-3|acct-1|1000|1|9|forest": valueAt(1),
    "loop2-judging-3|acct-1|1000|1|8|forest": valueAt(0),
    "loop2-judging-3|acct-2|1000|1|1|forest": valueAt(9),
  });
  open(storage, { ...game(), nextProgramId: 11 });
  assert.deepEqual(
    keysOf(storage),
    [
      "loop2-judging-3|acct-1|1000|1|8|forest",
      "loop2-judging-3|acct-2|1000|1|1|forest",
    ].sort(),
  );
});

test("the opening throws nothing where a value above the count cannot be removed", () => {
  // invariant: judging-cache-reading
  const storage = {
    ...mapStorage({ [ALA_KEY]: valueAt(4) }),
    removeItem() {
      throw new DOMException("no", "SecurityError");
    },
  };
  assert.equal(open(storage).read(ALA), null);
});

// ---------------------------------------------------------------------------------------------------
// The entry of Mapy

const NOW = 1_800_000_000_000;
const OPEN_LAIR = ["forestEdge", "forest", "forestDeep", "forestPack"];

/** A store stand-in whose state the case replaces with `set`; `act` runs its body and keeps what is taken. */
function standInStore(initial) {
  let state = initial;
  const acts = [];
  return {
    acts,
    set: (next) => {
      state = next;
    },
    get: () => state,
    moment: () => NOW,
    halted: () => false,
    act(body) {
      acts.push("act");
      body((result) => {
        state = result.state;
      });
    },
    send: () => acts.push("send"),
    startLoop: () => acts.push("startLoop"),
  };
}

/** Ala with the empty program on the list, a stick in the chest, the four maps before the lair solved. */
function gameOfEntry() {
  let state = createCharacter(newKnowingGame(), "Ala").state;
  state = editProgram(state, 1, REFERENCE_PROGRAMS.emptyProgram).state;
  return {
    ...state,
    solvedMaps: OPEN_LAIR,
    team: { ...state.team, chest: { pieces: { stick: 1 } } },
  };
}

const markOfWho = (root) =>
  root.querySelector(".maps-who-program .maps-who-mark")?.textContent ?? null;

// Catches an entry that stores the judging with the count of the state the cache was opened with, one that
// reads the mark against that state, and one whose mark stands after the player took the stick off.
test("the entry stores a judging with the count of the state it read, and the mark of it goes out with a change of the gear the player makes and stands again at the next judging", async () => {
  // decision: D-463 "The value of a remembered judging holds the count of its character in the game state the judging read (D-441), and the judging stands beside the list „Program:” only while that count equals the count the game state gives its character, so that a change of the gear made by the player erases every judging remembered for that character, on every map (D-440)."
  await withPage(async (page) => {
    const opened = gameOfEntry();
    const storage = mapStorage();
    const cache = open(storage, { ...opened, madeAtMs: MADE });
    // The player put the stick on before the screen: the state at hand holds one change the opened one did not.
    const worn = putOnPiece(opened, 1, "mainHand", "stick").state;
    assert.equal(worn.team.characters[0].gearChanges, 1);
    const store = standInStore(worn);
    let instance = null;
    await inAct(() => {
      instance = createMapsEntry({ store, judgingCache: cache }).build(
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
    assert.equal(markOfWho(page.root), null, "no judging yet");
    const judge = async () => {
      const before = store.acts.length;
      await press(page.root.querySelector(".maps-who-judge button"));
      await inAct(async () => {
        for (let r = 0; r < 800 && store.acts.length === before; r += 1)
          await new Promise((resolve) => setTimeout(resolve, 5));
      });
      assert.ok(store.acts.length > before, "the judging was asked for");
    };
    await judge();
    assert.equal(
      JSON.parse(storage.held.get("loop2-judging-3|acct-1|1000|1|1|forest"))
        .gearChanges,
      1,
      "the count of the state the judging read, not of the state the cache was opened with",
    );
    assert.notEqual(markOfWho(page.root), null, "the mark stands");

    // The player takes the stick off: the count rises and the mark goes out.
    store.set(takeOffPiece(store.get(), 1, "mainHand").state);
    await inAct(() => instance.drawResult());
    assert.equal(markOfWho(page.root), null, "the mark goes out");
    assert.equal(
      JSON.parse(storage.held.get("loop2-judging-3|acct-1|1000|1|1|forest"))
        .gearChanges,
      1,
      "the stored value stays as it was",
    );
    await judge();
    assert.notEqual(markOfWho(page.root), null, "a new judging stands again");
    assert.equal(
      JSON.parse(storage.held.get("loop2-judging-3|acct-1|1000|1|1|forest"))
        .gearChanges,
      2,
    );
  });
});
