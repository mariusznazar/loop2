// The judging cache of the browser view (D-441), at its trust boundary: the one module that reads and
// writes the judgings the browser remembers, in values that anyone with the browser can write. The
// storage is a stand-in the case gives: one backed by a map, one that refuses its writes, one whose every
// call throws, and none. The keys and values written by hand below are the stored form of version 1 of
// the cache; a later change of that form raises its version, so these literals are the contract with
// what a browser already holds.
import assert from "node:assert/strict";
import { test } from "node:test";
import { createCharacter, newGame } from "../../dist/browser/sim/game.js";
import {
  lastingStorageOf,
  openJudgingCache,
} from "../../dist/browser/view/judging-cache.js";

const ACCOUNT = "acct-1";
const MADE = 1000;
const LAS = { characterId: 1, programId: 1, mapId: "forest" };
const LAS_KEY = "loop2-judging-1|acct-1|1000|1|1|forest";

/** `value` frozen all the way down: a write into any of it throws. */
function frozen(value) {
  if (value && typeof value === "object") {
    for (const child of Object.values(value)) frozen(child);
    Object.freeze(value);
  }
  return value;
}

/**
 * The loaded game the cache is opened with: Ala (character 1) at `generation`, and the first program
 * (program 1) at content revision `revision`.
 */
function loaded({ revision = 0, generation = 1 } = {}) {
  const made = createCharacter(newGame(MADE), "Ala").state;
  return frozen({
    ...made,
    team: {
      ...made.team,
      characters: made.team.characters.map((character) => ({
        ...character,
        generation,
      })),
    },
    programs: made.programs.map((saved) => ({
      ...saved,
      contentRevision: revision,
    })),
  });
}

/** A record of a judging that solved `solved` seeds and died on the rest, for revision 0 and generation 1. */
function record(solved = 12, extra = {}) {
  return {
    results: [
      ...Array(solved).fill("solved"),
      ...Array(12 - solved).fill("death"),
    ],
    equipment: [],
    contentRevision: 0,
    generation: 1,
    ...extra,
  };
}

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

const full = () => new DOMException("the quota is full", "QuotaExceededError");

/** A map-backed storage whose writes throw while `refusing.on` holds. */
function refusingStorage(initial = {}) {
  const storage = mapStorage(initial);
  const refusing = { on: true };
  return {
    ...storage,
    get length() {
      return storage.length;
    },
    refusing,
    setItem(key, value) {
      if (refusing.on) throw full();
      storage.setItem(key, value);
    },
  };
}

/** A storage whose every call, and the reading of its length, throws. */
function brokenStorage() {
  const refuse = () => {
    throw new DOMException("the storage is refused", "SecurityError");
  };
  return {
    get length() {
      return refuse();
    },
    key: refuse,
    getItem: refuse,
    setItem: refuse,
    removeItem: refuse,
  };
}

function open(storage, over = {}) {
  return openJudgingCache({
    accountId: ACCOUNT,
    madeAtMs: MADE,
    state: loaded(),
    afterRefusedSave: false,
    storage,
    ...over,
  });
}

/** The stored value of a record that solved 11 of 12 seeds, took 4 berries, at revision 0 and generation 1. */
const VALID = {
  results: "sssssssssssd",
  equipment: [["berry", 4]],
  revision: 0,
  generation: 1,
};
const VALID_RECORD = {
  results: [...Array(11).fill("solved"), "death"],
  equipment: [{ item: "berry", count: 4 }],
  contentRevision: 0,
  generation: 1,
};

// ---------------------------------------------------------------------------------------------------
// What is remembered, and where

test("a remembered judging is stored as one value under one key of the account, the game and the triple, and read again by a cache opened anew on the same storage", () => {
  // decision: D-441 "The browser keeps the judging each character, program and map last had (D-440) in its lasting storage (`localStorage`), one value under a key of its own for each such triple, the key naming the version of the stored form, the signed-in account by its identifier, the game by the moment it was made (D-04), the character, the program and the map, and the value holding the kind of each of the twelve results, the equipment the judging took, and the content revision of the program (D-442) and the generation number of the character in the game state the judging read."
  const storage = mapStorage();
  const cache = open(storage);
  // The take list in the order of the berries first; the stored list stands in the order of the data's items.
  cache.remember(LAS, {
    results: [
      "solved",
      "death",
      "undecided",
      "solved",
      "solved",
      "solved",
      "solved",
      "solved",
      "solved",
      "solved",
      "solved",
      "solved",
    ],
    equipment: [
      { item: "berry", count: 4 },
      { item: "stick", count: 2 },
    ],
    contentRevision: 3,
    generation: 2,
  });
  assert.deepEqual([...storage.held.keys()], [LAS_KEY]);
  assert.deepEqual(JSON.parse(storage.held.get(LAS_KEY)), {
    results: "sdusssssssss",
    equipment: [
      ["stick", 2],
      ["berry", 4],
    ],
    revision: 3,
    generation: 2,
  });
  const reload = open(storage, {
    state: loaded({ revision: 3, generation: 2 }),
  });
  assert.deepEqual(reload.read(LAS), {
    results: ["solved", "death", "undecided", ...Array(9).fill("solved")],
    equipment: [
      { item: "stick", count: 2 },
      { item: "berry", count: 4 },
    ],
    contentRevision: 3,
    generation: 2,
  });
});

test("a value written by hand in the stored form is read, and the edges of each number are admitted", () => {
  // decision: D-441 "The browser keeps the judging each character, program and map last had (D-440) in its lasting storage (`localStorage`), one value under a key of its own for each such triple, the key naming the version of the stored form, the signed-in account by its identifier, the game by the moment it was made (D-04), the character, the program and the map, and the value holding the kind of each of the twelve results, the equipment the judging took, and the content revision of the program (D-442) and the generation number of the character in the game state the judging read."
  const top = Number.MAX_SAFE_INTEGER;
  const edges = JSON.stringify({
    results: "uuuuuuuuuuuu",
    equipment: [
      ["moss", 1],
      ["fiber", top],
    ],
    revision: 0,
    generation: 1,
  });
  const biggest = JSON.stringify({
    ...VALID,
    equipment: [],
    revision: top,
    generation: top,
  });
  const cache = open(
    mapStorage({
      [LAS_KEY]: JSON.stringify(VALID),
      "loop2-judging-1|acct-1|1000|1|1|forestEdge": edges,
      "loop2-judging-1|acct-1|1000|1|1|forestDeep": biggest,
    }),
    { state: loaded({ revision: top, generation: top }) },
  );
  assert.deepEqual(cache.read(LAS), VALID_RECORD);
  assert.deepEqual(cache.read({ ...LAS, mapId: "forestEdge" }), {
    results: Array(12).fill("undecided"),
    equipment: [
      { item: "moss", count: 1 },
      { item: "fiber", count: top },
    ],
    contentRevision: 0,
    generation: 1,
  });
  assert.deepEqual(cache.read({ ...LAS, mapId: "forestDeep" }), {
    results: [...Array(11).fill("solved"), "death"],
    equipment: [],
    contentRevision: top,
    generation: top,
  });
});

test("a triple nothing is remembered for reads as none, as on another device", () => {
  // decision: D-441 "Another device, or a browser whose data were cleared, shows no remembered judging until a judging is made there."
  const cache = open(mapStorage());
  assert.equal(cache.read(LAS), null);
  cache.remember(LAS, record());
  assert.equal(cache.read({ ...LAS, mapId: "forestEdge" }), null);
  assert.equal(cache.read({ ...LAS, programId: 2 }), null);
  assert.equal(cache.read({ ...LAS, characterId: 2 }), null);
});

test("a later judging of the triple replaces the earlier one, and a judging of another triple leaves it", () => {
  const storage = mapStorage();
  const cache = open(storage);
  cache.remember(LAS, record(12));
  cache.remember({ ...LAS, mapId: "forestEdge" }, record(5));
  cache.remember(LAS, record(3));
  assert.deepEqual(cache.read(LAS), record(3));
  assert.deepEqual(cache.read({ ...LAS, mapId: "forestEdge" }), record(5));
  assert.equal(storage.held.size, 2);
});

test("what the cache gives shares nothing with what it was given or gave", () => {
  const cache = open(mapStorage());
  const given = record(7, { equipment: [{ item: "stick", count: 2 }] });
  cache.remember(LAS, given);
  given.results[0] = "death";
  given.equipment[0].count = 99;
  const first = cache.read(LAS);
  assert.deepEqual(
    first,
    record(7, { equipment: [{ item: "stick", count: 2 }] }),
  );
  first.results[1] = "undecided";
  first.equipment.length = 0;
  assert.deepEqual(
    cache.read(LAS),
    record(7, { equipment: [{ item: "stick", count: 2 }] }),
  );
});

// ---------------------------------------------------------------------------------------------------
// Another account, another game, another version

test("a judging of another account, of another game of the account or under a key of another version of the form is never read", () => {
  // invariant: judging-cache-reading
  // decision: D-441 "A value of another form, one whose results do not number the seeds of a judging in the game's data, or one under a key of another version of the stored form shows nothing, as where nothing is remembered, and a key of another version is neither read, written nor removed."
  const value = JSON.stringify(VALID);
  const storage = mapStorage({
    "loop2-judging-1|acct-2|1000|1|1|forest": value,
    "loop2-judging-1|acct-1|2000|1|1|forest": value,
    "loop2-judging-2|acct-1|1000|1|1|forest": value,
    "loop2-judging-0|acct-1|1000|1|1|forest": value,
    "loop2-judging-10|acct-1|1000|1|1|forest": value,
    "judging|acct-1|1000|1|1|forest": value,
  });
  const cache = open(storage);
  assert.equal(cache.read(LAS), null);
  cache.remember(LAS, record(4));
  assert.deepEqual(cache.read(LAS), record(4));
  // Nothing of another version was written to, and nothing else was read in its place.
  assert.equal(
    storage.held.get("loop2-judging-2|acct-1|1000|1|1|forest"),
    value,
  );
  assert.equal(
    storage.held.get("loop2-judging-0|acct-1|1000|1|1|forest"),
    value,
  );
  assert.equal(
    storage.held.get("loop2-judging-10|acct-1|1000|1|1|forest"),
    value,
  );
  assert.equal(storage.held.get("judging|acct-1|1000|1|1|forest"), value);
});

test("an account whose identifier holds the separator of a key shares no judging with another account", () => {
  // invariant: judging-cache-reading
  // decision: D-441 "The browser keeps the judging each character, program and map last had (D-440) in its lasting storage (`localStorage`), one value under a key of its own for each such triple, the key naming the version of the stored form, the signed-in account by its identifier, the game by the moment it was made (D-04), the character, the program and the map, and the value holding the kind of each of the twelve results, the equipment the judging took, and the content revision of the program (D-442) and the generation number of the character in the game state the judging read."
  const storage = mapStorage();
  const plain = open(storage, { accountId: "a" });
  const odd = open(storage, { accountId: "a|1000" });
  const percent = open(storage, { accountId: "a%7C1000" });
  odd.remember(LAS, record(1));
  percent.remember(LAS, record(2));
  assert.equal(plain.read(LAS), null);
  assert.deepEqual(odd.read(LAS), record(1));
  assert.deepEqual(percent.read(LAS), record(2));
  // Opened anew for another game, "a|1000" tidies its own values and no other account's.
  open(storage, { accountId: "a" });
  open(storage, { accountId: "a|1000", madeAtMs: 5 });
  assert.equal(open(storage, { accountId: "a|1000" }).read(LAS), null);
  assert.deepEqual(
    open(storage, { accountId: "a%7C1000" }).read(LAS),
    record(2),
  );
});

// ---------------------------------------------------------------------------------------------------
// A value anyone can write

const BAD_VALUES = [
  ["an empty text", ""],
  ["a text that is no JSON", "{results:"],
  ["a cut value", JSON.stringify(VALID).slice(0, -1)],
  ["null", "null"],
  ["a number", "12"],
  ["a text", '"sssssssssssd"'],
  ["a list", "[]"],
  ["a list of the four values", '["sssssssssssd",[],0,1]'],
  ["an empty object", "{}"],
  ...["results", "equipment", "revision", "generation"].map((field) => [
    `a value without ${field}`,
    JSON.stringify(
      Object.fromEntries(
        Object.entries(VALID).filter(([name]) => name !== field),
      ),
    ),
  ]),
  ["a value with one more field", JSON.stringify({ ...VALID, name: "Ala" })],
  [
    "a value with a field called __proto__ besides the four",
    JSON.stringify(VALID).replace(
      "{",
      '{"__proto__":{"results":"ssssssssssss"},',
    ),
  ],
  [
    "a value with a field called constructor besides the four",
    JSON.stringify(VALID).replace("{", '{"constructor":{"name":"x"},'),
  ],
  [
    "a value whose revision is a field called __proto__",
    '{"results":"sssssssssssd","equipment":[],"__proto__":0,"generation":1}',
  ],
  [
    "a value whose four fields are named by a prototype",
    '{"__proto__":{"results":"sssssssssssd","equipment":[],"revision":0,"generation":1}}',
  ],
  ["eleven results", JSON.stringify({ ...VALID, results: "sssssssssss" })],
  ["thirteen results", JSON.stringify({ ...VALID, results: "sssssssssssds" })],
  ["no results", JSON.stringify({ ...VALID, results: "" })],
  ["an unknown letter", JSON.stringify({ ...VALID, results: "sssssssssssx" })],
  ["a capital letter", JSON.stringify({ ...VALID, results: "sssssssssssD" })],
  [
    "a kind word in place of a letter",
    JSON.stringify({ ...VALID, results: "sssssssssssdeath" }),
  ],
  [
    "results as a list of kinds",
    JSON.stringify({
      ...VALID,
      results: [...Array(11).fill("solved"), "death"],
    }),
  ],
  ["results as a number", JSON.stringify({ ...VALID, results: 111111111111 })],
  ["equipment that is no list", JSON.stringify({ ...VALID, equipment: {} })],
  ["equipment as a text", JSON.stringify({ ...VALID, equipment: "berry" })],
  [
    "a pair of three",
    JSON.stringify({ ...VALID, equipment: [["berry", 4, 1]] }),
  ],
  ["a pair of one", JSON.stringify({ ...VALID, equipment: [["berry"]] })],
  [
    "a pair that is an object",
    JSON.stringify({ ...VALID, equipment: [{ item: "berry", count: 4 }] }),
  ],
  [
    "an item the data lack",
    JSON.stringify({ ...VALID, equipment: [["sword", 1]] }),
  ],
  [
    "an item called __proto__",
    JSON.stringify({ ...VALID, equipment: [["__proto__", 1]] }),
  ],
  [
    "an item called constructor",
    JSON.stringify({ ...VALID, equipment: [["constructor", 1]] }),
  ],
  [
    "an item called toString",
    JSON.stringify({ ...VALID, equipment: [["toString", 1]] }),
  ],
  [
    "an item that is no text",
    JSON.stringify({ ...VALID, equipment: [[7, 1]] }),
  ],
  [
    "an item named twice",
    JSON.stringify({
      ...VALID,
      equipment: [
        ["berry", 1],
        ["stick", 2],
        ["berry", 3],
      ],
    }),
  ],
  ["a count of 0", JSON.stringify({ ...VALID, equipment: [["berry", 0]] })],
  [
    "a negative count",
    JSON.stringify({ ...VALID, equipment: [["berry", -1]] }),
  ],
  [
    "a count with a fraction",
    JSON.stringify({ ...VALID, equipment: [["berry", 1.5]] }),
  ],
  [
    "a count that is a text",
    JSON.stringify({ ...VALID, equipment: [["berry", "4"]] }),
  ],
  [
    "a count that is null",
    JSON.stringify({ ...VALID, equipment: [["berry", null]] }),
  ],
  [
    "a count past the safe integers",
    JSON.stringify(VALID).replace("4]", "9007199254740992]"),
  ],
  [
    "a count too large for a number",
    JSON.stringify(VALID).replace("4]", "1e400]"),
  ],
  ["a revision below 0", JSON.stringify({ ...VALID, revision: -1 })],
  ["a revision with a fraction", JSON.stringify({ ...VALID, revision: 0.5 })],
  ["a revision that is a text", JSON.stringify({ ...VALID, revision: "0" })],
  ["a revision that is null", JSON.stringify({ ...VALID, revision: null })],
  [
    "a revision past the safe integers",
    JSON.stringify(VALID).replace(
      '"revision":0',
      '"revision":9007199254740992',
    ),
  ],
  ["a generation of 0", JSON.stringify({ ...VALID, generation: 0 })],
  ["a negative generation", JSON.stringify({ ...VALID, generation: -2 })],
  [
    "a generation with a fraction",
    JSON.stringify({ ...VALID, generation: 1.5 }),
  ],
  [
    "a generation that is a text",
    JSON.stringify({ ...VALID, generation: "1" }),
  ],
  [
    "a generation past the safe integers",
    JSON.stringify(VALID).replace(
      '"generation":1',
      '"generation":9007199254740993',
    ),
  ],
  [
    "a valid value padded past the bound a value may have",
    JSON.stringify(VALID) + " ".repeat(1_000_000),
  ],
  [
    "a valid value with a long text before it",
    " ".repeat(5_000) + JSON.stringify(VALID),
  ],
];

for (const [name, value] of BAD_VALUES) {
  test(`a stored value that is ${name} reads as none, throws nothing and stays where it is`, () => {
    // invariant: judging-cache-reading
    // decision: D-441 "A value of another form, one whose results do not number the seeds of a judging in the game's data, or one under a key of another version of the stored form shows nothing, as where nothing is remembered, and a key of another version is neither read, written nor removed."
    const storage = mapStorage({ [LAS_KEY]: value });
    const cache = open(storage);
    assert.equal(cache.read(LAS), null);
    assert.equal(storage.held.get(LAS_KEY), value);
  });
}

test("a storage that answers a reading with no text reads as none", () => {
  // invariant: judging-cache-reading
  // decision: D-441 "A value of another form, one whose results do not number the seeds of a judging in the game's data, or one under a key of another version of the stored form shows nothing, as where nothing is remembered, and a key of another version is neither read, written nor removed."
  for (const answer of [undefined, 7, {}, ["x"], true]) {
    const storage = { ...mapStorage(), getItem: () => answer };
    assert.equal(open(storage).read(LAS), null);
  }
});

test("a value that holds every field of the form builds a record of its own: nothing the parse made is handed on", () => {
  // invariant: judging-cache-reading
  // decision: D-441 "A value of another form, one whose results do not number the seeds of a judging in the game's data, or one under a key of another version of the stored form shows nothing, as where nothing is remembered, and a key of another version is neither read, written nor removed."
  const given = open(mapStorage({ [LAS_KEY]: JSON.stringify(VALID) })).read(
    LAS,
  );
  assert.deepEqual(Object.keys(given).sort(), [
    "contentRevision",
    "equipment",
    "generation",
    "results",
  ]);
  assert.equal(Object.getPrototypeOf(given), Object.prototype);
  assert.deepEqual(Object.keys(given.equipment[0]).sort(), ["count", "item"]);
  assert.equal(Object.getPrototypeOf(given.equipment[0]), Object.prototype);
});

// ---------------------------------------------------------------------------------------------------
// The storage refuses

test("a write the storage refuses leaves the judging for the open page, removes the stored value of its triple, and throws nothing", () => {
  // invariant: judging-cache-reading
  // decision: D-441 "Where the browser refuses its lasting storage, or refuses to write a value, the judging stands for the open page alone, the stored value of its triple being removed where the browser allows it, and no exception of the storage reaches the screen or the handling of an error no code of the game handled (D-323)."
  const older = JSON.stringify({ ...VALID, results: "dddddddddddd" });
  const other = "loop2-judging-1|acct-1|1000|1|1|forestEdge";
  const storage = refusingStorage({ [LAS_KEY]: older, [other]: older });
  const cache = open(storage);
  cache.remember(LAS, record(12));
  assert.deepEqual(cache.read(LAS), record(12));
  assert.equal(
    storage.held.has(LAS_KEY),
    false,
    "no older value stands against it",
  );
  assert.equal(storage.held.get(other), older, "another triple's value stays");
  // A reload loses it: the storage holds nothing for the triple.
  assert.equal(open(storage).read(LAS), null);
});

test("a write the storage refuses and a removal it refuses too still leave the judging for the open page", () => {
  // invariant: judging-cache-reading
  // decision: D-441 "Where the browser refuses its lasting storage, or refuses to write a value, the judging stands for the open page alone, the stored value of its triple being removed where the browser allows it, and no exception of the storage reaches the screen or the handling of an error no code of the game handled (D-323)."
  const storage = {
    ...mapStorage(),
    setItem: () => {
      throw full();
    },
    removeItem: () => {
      throw full();
    },
  };
  const cache = open(storage);
  cache.remember(LAS, record(9));
  assert.deepEqual(cache.read(LAS), record(9));
});

test("a write that succeeds after a refused one takes the triple out of the page's memory, so the storage answers again", () => {
  // invariant: judging-cache-reading
  // decision: D-441 "Where the browser refuses its lasting storage, or refuses to write a value, the judging stands for the open page alone, the stored value of its triple being removed where the browser allows it, and no exception of the storage reaches the screen or the handling of an error no code of the game handled (D-323)."
  const storage = refusingStorage();
  const cache = open(storage);
  cache.remember(LAS, record(2));
  cache.remember({ ...LAS, mapId: "forestEdge" }, record(8));
  storage.refusing.on = false;
  cache.remember(LAS, record(12));
  assert.deepEqual(cache.read(LAS), record(12));
  // Another tab writes the triple: the page reads the storage, not an answer it kept.
  storage.held.set(LAS_KEY, JSON.stringify(VALID));
  assert.deepEqual(cache.read(LAS), VALID_RECORD);
  // The triple whose write was never made stands in the page's memory still.
  assert.deepEqual(cache.read({ ...LAS, mapId: "forestEdge" }), record(8));
});

test("a storage whose every call throws opens, takes and gives a judging for the open page, and throws nothing", () => {
  // invariant: judging-cache-reading
  // decision: D-441 "Where the browser refuses its lasting storage, or refuses to write a value, the judging stands for the open page alone, the stored value of its triple being removed where the browser allows it, and no exception of the storage reaches the screen or the handling of an error no code of the game handled (D-323)."
  const storage = brokenStorage();
  const cache = open(storage);
  assert.equal(cache.read(LAS), null);
  cache.remember(LAS, record(6));
  assert.deepEqual(cache.read(LAS), record(6));
  assert.equal(open(storage, { afterRefusedSave: true }).read(LAS), null);
  assert.equal(open(storage, { madeAtMs: 7 }).read(LAS), null);
});

test("no storage at all keeps a judging for the open page alone", () => {
  // invariant: judging-cache-reading
  // decision: D-441 "Where the browser refuses its lasting storage, or refuses to write a value, the judging stands for the open page alone, the stored value of its triple being removed where the browser allows it, and no exception of the storage reaches the screen or the handling of an error no code of the game handled (D-323)."
  const cache = open(null);
  assert.equal(cache.read(LAS), null);
  const given = record(10);
  cache.remember(LAS, given);
  given.results[0] = "death";
  cache.read(LAS).results[1] = "death";
  assert.deepEqual(cache.read(LAS), record(10));
  assert.equal(open(null).read(LAS), null);
});

test("a page whose window refuses its storage gives none, and one that gives it gives that storage", () => {
  // invariant: judging-cache-reading
  // decision: D-441 "Where the browser refuses its lasting storage, or refuses to write a value, the judging stands for the open page alone, the stored value of its triple being removed where the browser allows it, and no exception of the storage reaches the screen or the handling of an error no code of the game handled (D-323)."
  const storage = mapStorage();
  assert.equal(lastingStorageOf({ localStorage: storage }), storage);
  const refusing = {
    get localStorage() {
      throw new DOMException("blocked", "SecurityError");
    },
  };
  assert.equal(lastingStorageOf(refusing), null);
});

// ---------------------------------------------------------------------------------------------------
// Several tabs

test("two caches on one storage, as two tabs of one game, read each other's judgings of other triples, and on one triple the last write stands", () => {
  // decision: D-441 "The browser keeps the judging each character, program and map last had (D-440) in its lasting storage (`localStorage`), one value under a key of its own for each such triple, the key naming the version of the stored form, the signed-in account by its identifier, the game by the moment it was made (D-04), the character, the program and the map, and the value holding the kind of each of the twelve results, the equipment the judging took, and the content revision of the program (D-442) and the generation number of the character in the game state the judging read."
  const storage = mapStorage();
  const first = open(storage);
  const second = open(storage);
  first.remember(LAS, record(12));
  second.remember({ ...LAS, mapId: "forestEdge" }, record(4));
  assert.deepEqual(second.read(LAS), record(12));
  assert.deepEqual(first.read({ ...LAS, mapId: "forestEdge" }), record(4));
  second.remember(LAS, record(1));
  assert.deepEqual(first.read(LAS), record(1));
  assert.deepEqual(second.read({ ...LAS, mapId: "forestEdge" }), record(4));
});

// ---------------------------------------------------------------------------------------------------
// What the opening removes

/** The keys a storage holds, sorted. */
const keysOfStorage = (storage) => [...storage.held.keys()].sort();

test("opening a game removes the values of the same account under the moment of another game, and leaves other accounts' and other versions'", () => {
  // invariant: judging-cache-reading
  // decision: D-441 "When the page opens the remembered judgings of a game, it removes the values of the same account under the moment of another game and those of this game whose content revision or generation number stands above that of its program or character in the loaded game, and, where it builds the game after the server refused its save for another browser's (D-209), every value of this game, leaving the values of other accounts."
  const value = JSON.stringify(VALID);
  const storage = mapStorage({
    [LAS_KEY]: value,
    "loop2-judging-1|acct-1|1000|2|3|forestEdge": value,
    "loop2-judging-1|acct-1|999|1|1|forest": value,
    "loop2-judging-1|acct-1|2000|1|1|forest": value,
    "loop2-judging-1|acct-1|-5|1|1|forest": value,
    "loop2-judging-1|acct-2|999|1|1|forest": value,
    "loop2-judging-1|acct-2|1000|1|1|forest": value,
    "loop2-judging-2|acct-1|999|1|1|forest": value,
    "unrelated key": "x",
  });
  open(storage);
  assert.deepEqual(
    keysOfStorage(storage),
    [
      LAS_KEY,
      "loop2-judging-1|acct-1|1000|2|3|forestEdge",
      "loop2-judging-1|acct-2|1000|1|1|forest",
      "loop2-judging-1|acct-2|999|1|1|forest",
      "loop2-judging-2|acct-1|999|1|1|forest",
      "unrelated key",
    ].sort(),
  );
});

test("a game built after a refused save has every value of this game removed too, and other accounts' left", () => {
  // invariant: judging-cache-reading
  // decision: D-441 "When the page opens the remembered judgings of a game, it removes the values of the same account under the moment of another game and those of this game whose content revision or generation number stands above that of its program or character in the loaded game, and, where it builds the game after the server refused its save for another browser's (D-209), every value of this game, leaving the values of other accounts."
  const value = JSON.stringify(VALID);
  const storage = mapStorage({
    [LAS_KEY]: value,
    "loop2-judging-1|acct-1|1000|2|3|forestEdge": "not a value of the cache",
    "loop2-judging-1|acct-1|999|1|1|forest": value,
    "loop2-judging-1|acct-2|1000|1|1|forest": value,
    "loop2-judging-2|acct-1|1000|1|1|forest": value,
  });
  const cache = open(storage, { afterRefusedSave: true });
  assert.equal(cache.read(LAS), null);
  assert.deepEqual(keysOfStorage(storage), [
    "loop2-judging-1|acct-2|1000|1|1|forest",
    "loop2-judging-2|acct-1|1000|1|1|forest",
  ]);
  // A judging made after the opening is remembered as in any game.
  cache.remember(LAS, record(5));
  assert.deepEqual(cache.read(LAS), record(5));
});

test("opening with a storage that refuses to list its keys or to remove a value throws nothing and still reads", () => {
  // invariant: judging-cache-reading
  // decision: D-441 "When the page opens the remembered judgings of a game, it removes the values of the same account under the moment of another game and those of this game whose content revision or generation number stands above that of its program or character in the loaded game, and, where it builds the game after the server refused its save for another browser's (D-209), every value of this game, leaving the values of other accounts."
  const noList = {
    ...mapStorage({ [LAS_KEY]: JSON.stringify(VALID) }),
    key: () => {
      throw new DOMException("no", "SecurityError");
    },
  };
  assert.deepEqual(
    open(noList, { afterRefusedSave: true }).read(LAS),
    VALID_RECORD,
  );
  const noRemoval = {
    ...mapStorage({
      [LAS_KEY]: JSON.stringify(VALID),
      "loop2-judging-1|acct-1|999|1|1|forest": JSON.stringify(VALID),
    }),
    removeItem: () => {
      throw new DOMException("no", "SecurityError");
    },
  };
  assert.deepEqual(open(noRemoval).read(LAS), VALID_RECORD);
});

test("opening leaves the game state it was given as it was", () => {
  const state = loaded({ revision: 1, generation: 1 });
  const before = structuredClone(state);
  open(mapStorage({ [LAS_KEY]: JSON.stringify({ ...VALID, revision: 5 }) }), {
    state,
  });
  assert.deepEqual(state, before);
});

// ---------------------------------------------------------------------------------------------------
// A judging above the loaded game's own

/** The value of a judging at `revision` and `generation`. */
const valueAt = (revision, generation) =>
  JSON.stringify({ ...VALID, revision, generation });

test("a value above the loaded game's content revision, or above its generation number, is removed at the opening, and one equal or below is kept", () => {
  // decision: D-441 "When the page opens the remembered judgings of a game, it removes the values of the same account under the moment of another game and those of this game whose content revision or generation number stands above that of its program or character in the loaded game, and, where it builds the game after the server refused its save for another browser's (D-209), every value of this game, leaving the values of other accounts."
  const at = (map) => `loop2-judging-1|acct-1|1000|1|1|${map}`;
  const storage = mapStorage({
    [at("forest")]: valueAt(4, 2),
    [at("aboveRevision")]: valueAt(5, 2),
    [at("aboveGeneration")]: valueAt(4, 3),
    [at("aboveBoth")]: valueAt(9, 9),
    [at("equalRevisionBelowGeneration")]: valueAt(4, 1),
    [at("belowRevisionEqualGeneration")]: valueAt(0, 2),
    [at("below")]: valueAt(1, 1),
  });
  open(storage, { state: loaded({ revision: 4, generation: 2 }) });
  assert.deepEqual(
    keysOfStorage(storage),
    [
      at("belowRevisionEqualGeneration"),
      at("equalRevisionBelowGeneration"),
      at("forest"),
      at("below"),
    ].sort(),
  );
});

test("a value kept by the opening is given as it was stored, whatever it says of the loaded game: the check at the screen decides whether it stands", () => {
  // decision: D-441 "When the page opens the remembered judgings of a game, it removes the values of the same account under the moment of another game and those of this game whose content revision or generation number stands above that of its program or character in the loaded game, and, where it builds the game after the server refused its save for another browser's (D-209), every value of this game, leaving the values of other accounts."
  const storage = mapStorage({ [LAS_KEY]: valueAt(1, 1) });
  const cache = open(storage, {
    state: loaded({ revision: 6, generation: 4 }),
  });
  assert.equal(cache.read(LAS).contentRevision, 1);
  assert.equal(cache.read(LAS).generation, 1);
});

test("a value of a triple whose character or program the loaded game lacks, or one that is no value of the cache's, is not removed by the above check", () => {
  // decision: D-441 "When the page opens the remembered judgings of a game, it removes the values of the same account under the moment of another game and those of this game whose content revision or generation number stands above that of its program or character in the loaded game, and, where it builds the game after the server refused its save for another browser's (D-209), every value of this game, leaving the values of other accounts."
  const storage = mapStorage({
    "loop2-judging-1|acct-1|1000|9|1|forest": valueAt(0, 9),
    "loop2-judging-1|acct-1|1000|1|9|forest": valueAt(9, 1),
    "loop2-judging-1|acct-1|1000|1|1|broken": "not a value",
    "loop2-judging-1|acct-1|1000|1|forest": valueAt(9, 9),
    "loop2-judging-1|acct-1|1000|1|1|forest|more": valueAt(9, 9),
  });
  const before = keysOfStorage(storage);
  // The character 1 and program 1 stand at 0 and 1 in the loaded game; the keys above name others or are malformed.
  open(storage, { state: loaded({ revision: 0, generation: 1 }) });
  assert.deepEqual(keysOfStorage(storage), before);
});
