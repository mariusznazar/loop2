// The record of the most health a map's creature lost in one fight, in the judging cache of the browser
// view (D-440, D-441), at its trust boundary: the one module that reads and writes it, in values that
// anyone with the browser can write. The storage is a stand-in the case gives: one backed by a map, one
// that refuses its writes, one whose every call throws, and none. The keys and values written by hand
// below are the stored form of version 1 of the record's own family of keys; a later change of that form
// raises its version, so these literals are the contract with what a browser already holds.
import assert from "node:assert/strict";
import { test } from "node:test";
import { createCharacter, newGame } from "../../dist/browser/sim/game.js";
import { openJudgingCache } from "../../dist/browser/view/judging-cache.js";

const ACCOUNT = "acct-1";
const MADE = 1000;
const MAP = "forestLair";
const KEY = "loop2-judging-record-1|acct-1|1000|forestLair";
// The numbers of the creature of the map as the data give them (the bear of Las — matecznik: 120 and 20).
const BEAR = { health: 120, strikeDamage: 20 };
const JUDGING_IDS = { characterId: 1, programId: 1, mapId: MAP };
const JUDGING_KEY = "loop2-judging-3|acct-1|1000|1|1|forestLair";
const FINGERPRINT = "0123456789abcdef";
const JUDGING_VALUE = JSON.stringify({
  results: "sssssssssssd",
  equipment: [["berry", 4]],
  revision: 0,
  fingerprint: FINGERPRINT,
  generation: 1,
  gearChanges: 0,
});

/** The stored value of a record, in the form of version 1, whatever its fields. */
const stored = (damage, health = 120, strikeDamage = 20) =>
  JSON.stringify({ damage, health, strikeDamage });

/** `value` frozen all the way down: a write into any of it throws. */
function frozen(value) {
  if (value && typeof value === "object") {
    for (const child of Object.values(value)) frozen(child);
    Object.freeze(value);
  }
  return value;
}

/** The loaded game the cache is opened with, made at `madeAtMs`: Ala (character 1) and the first program (program 1). */
function loaded({ generation = 1, revision = 0, madeAtMs = MADE } = {}) {
  const made = createCharacter(newGame(madeAtMs), "Ala").state;
  return frozen({
    ...made,
    nextCharacterId: 2,
    nextProgramId: 2,
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

/** A storage backed by a map, holding `initial`; `held` is the map and `writes` counts the writes. */
function mapStorage(initial = {}) {
  const held = new Map(Object.entries(initial));
  const counts = { writes: 0 };
  return {
    held,
    counts,
    get length() {
      return held.size;
    },
    key: (index) => [...held.keys()][index] ?? null,
    getItem: (key) => (held.has(key) ? held.get(key) : null),
    setItem: (key, value) => {
      counts.writes += 1;
      held.set(key, String(value));
    },
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

/**
 * Opens the cache on `storage`; `madeAtMs` is the moment of the game state it is opened with. A read or a
 * write of a judging the case gives no game state takes that one, as at a page whose game state at hand is
 * the one it opened the cache with.
 */
function open(storage, { madeAtMs = MADE, state, ...over } = {}) {
  const opened = state ?? loaded({ madeAtMs });
  const cache = openJudgingCache({
    accountId: ACCOUNT,
    state: opened,
    afterRefusedSave: false,
    storage,
    ...over,
  });
  return {
    ...cache,
    read: (ids, at = opened) => cache.read(ids, at),
    remember: (ids, given, at = opened) => cache.remember(ids, given, at),
  };
}

/** The keys a storage holds, sorted. */
const keysOfStorage = (storage) => [...storage.held.keys()].sort();

// ---------------------------------------------------------------------------------------------------
// What is remembered, and where

test("an offered number is stored as one value of its own, under a key of its own version, with the creature's numbers, and read again by a cache opened anew", () => {
  // decision: D-441 "Beside the judgings the browser keeps the record of D-440 in its lasting storage, one value under a key of its own with its own version for each account, game and map, holding the number and the creature's numbers it was made at."
  const storage = mapStorage();
  open(storage).offerRecord(MAP, BEAR, 24);
  assert.deepEqual([...storage.held.keys()], [KEY]);
  // The value holds the number and the two numbers of the creature, and nothing else: no email address, no name.
  assert.deepEqual(JSON.parse(storage.held.get(KEY)), {
    damage: 24,
    health: 120,
    strikeDamage: 20,
  });
  assert.equal(open(storage).readRecord(MAP, BEAR), 24);
});

test("a value written by hand in the stored form is read, and the edges of the number are admitted", () => {
  // decision: D-441 "Beside the judgings the browser keeps the record of D-440 in its lasting storage, one value under a key of its own with its own version for each account, game and map, holding the number and the creature's numbers it was made at."
  const top = Number.MAX_SAFE_INTEGER;
  const cache = open(
    mapStorage({
      [KEY]: stored(0),
      "loop2-judging-record-1|acct-1|1000|least": stored(0, 1, 0),
      "loop2-judging-record-1|acct-1|1000|whole": stored(top, top, top),
    }),
  );
  assert.equal(cache.readRecord(MAP, BEAR), 0);
  assert.equal(cache.readRecord("least", { health: 1, strikeDamage: 0 }), 0);
  assert.equal(
    cache.readRecord("whole", { health: top, strikeDamage: top }),
    top,
  );
});

test("nothing is read where no judging offered a number, as on another device, and a first judging that took nothing makes the record 0", () => {
  // decision: D-440 "The record stays through a change of the program and the death of a character, a judging that took more raises it, it stands in the row of the map in the catalog and on its card from the first judging on that map and never before it, and after a change of the numbers of that creature the record made at its former numbers shows nothing (D-441)."
  const storage = mapStorage();
  const cache = open(storage);
  assert.equal(cache.readRecord(MAP, BEAR), null);
  cache.offerRecord("forestDeep", BEAR, 7);
  assert.equal(cache.readRecord(MAP, BEAR), null, "another map's offer");
  cache.offerRecord(MAP, BEAR, 0);
  assert.equal(cache.readRecord(MAP, BEAR), 0);
  assert.equal(open(storage).readRecord(MAP, BEAR), 0);
});

test("a number offered below or at the record leaves it and writes nothing, and one above raises it", () => {
  // decision: D-440 "The record stays through a change of the program and the death of a character, a judging that took more raises it, it stands in the row of the map in the catalog and on its card from the first judging on that map and never before it, and after a change of the numbers of that creature the record made at its former numbers shows nothing (D-441)."
  const storage = mapStorage();
  const cache = open(storage);
  cache.offerRecord(MAP, BEAR, 24);
  const writes = storage.counts.writes;
  cache.offerRecord(MAP, BEAR, 10);
  cache.offerRecord(MAP, BEAR, 24);
  cache.offerRecord(MAP, BEAR, 0);
  assert.equal(storage.counts.writes, writes);
  assert.equal(storage.held.get(KEY), stored(24));
  assert.equal(cache.readRecord(MAP, BEAR), 24);
  cache.offerRecord(MAP, BEAR, 30);
  assert.equal(cache.readRecord(MAP, BEAR), 30);
  assert.equal(open(storage).readRecord(MAP, BEAR), 30);
});

test("a record made at other numbers of the creature shows nothing, and the next offer replaces it, though lower", () => {
  // decision: D-440 "The record stays through a change of the program and the death of a character, a judging that took more raises it, it stands in the row of the map in the catalog and on its card from the first judging on that map and never before it, and after a change of the numbers of that creature the record made at its former numbers shows nothing (D-441)."
  const storage = mapStorage({
    [KEY]: stored(90, 150, 20),
  });
  const cache = open(storage);
  assert.equal(cache.readRecord(MAP, BEAR), null, "another health");
  assert.equal(
    cache.readRecord(MAP, { health: 150, strikeDamage: 20 }),
    90,
    "the numbers it was made at",
  );
  cache.offerRecord(MAP, BEAR, 10);
  assert.equal(storage.held.get(KEY), stored(10));
  assert.equal(cache.readRecord(MAP, BEAR), 10);
  assert.equal(
    cache.readRecord(MAP, { health: 150, strikeDamage: 20 }),
    null,
    "the old numbers show nothing now",
  );
  // Only the blow changes.
  const blow = open(mapStorage({ [KEY]: stored(24, 120, 25) }));
  assert.equal(blow.readRecord(MAP, BEAR), null);
  blow.offerRecord(MAP, BEAR, 3);
  assert.equal(blow.readRecord(MAP, BEAR), 3);
});

test("the record stays where the judgings of its map go: a judging remembered above the loaded game is removed at the opening, the record is not, and nothing a judging does touches it", () => {
  // decision: D-440 "The record stays through a change of the program and the death of a character, a judging that took more raises it, it stands in the row of the map in the catalog and on its card from the first judging on that map and never before it, and after a change of the numbers of that creature the record made at its former numbers shows nothing (D-441)."
  const storage = mapStorage({
    [KEY]: stored(24),
    // A judging of a character at generation 2 and a program at revision 3, above the loaded game's 1 and 0.
    [JUDGING_KEY]: JSON.stringify({
      results: "sssssssssssd",
      equipment: [],
      revision: 3,
      fingerprint: FINGERPRINT,
      generation: 2,
      gearChanges: 0,
    }),
  });
  const cache = open(storage, {
    state: loaded({ generation: 1, revision: 0 }),
  });
  assert.equal(storage.held.has(JUDGING_KEY), false, "the judging went");
  assert.equal(cache.readRecord(MAP, BEAR), 24, "the record stayed");
  // A judging remembered and replaced, on any triple of the map, leaves the record as it was.
  const judging = {
    results: Array(12).fill("solved"),
    equipment: [],
    contentRevision: 0,
    contentFingerprint: FINGERPRINT,
    generation: 1,
  };
  cache.remember(JUDGING_IDS, judging);
  cache.remember(JUDGING_IDS, { ...judging, results: Array(12).fill("death") });
  cache.remember({ ...JUDGING_IDS, programId: 2 }, judging);
  assert.equal(cache.readRecord(MAP, BEAR), 24);
  assert.equal(storage.held.get(KEY), stored(24));
  // A cache opened anew for the game as a changed program and a dead character leave it, at other
  // content revision and generation number, still shows it.
  assert.equal(
    open(storage, { state: loaded({ generation: 5, revision: 7 }) }).readRecord(
      MAP,
      BEAR,
    ),
    24,
  );
});

test("the judgings and the record share a storage and read nothing of each other", () => {
  const storage = mapStorage();
  const cache = open(storage);
  cache.remember(JUDGING_IDS, {
    results: Array(12).fill("solved"),
    equipment: [],
    contentRevision: 0,
    contentFingerprint: FINGERPRINT,
    generation: 1,
  });
  assert.equal(cache.readRecord(MAP, BEAR), null);
  cache.offerRecord(MAP, BEAR, 12);
  assert.deepEqual(keysOfStorage(storage), [JUDGING_KEY, KEY].sort());
  assert.equal(cache.read(JUDGING_IDS).results.length, 12);
  // A value of the one family under the key of the other reads as none in each.
  const crossed = open(
    mapStorage({ [JUDGING_KEY]: stored(5), [KEY]: JUDGING_VALUE }),
  );
  assert.equal(crossed.read(JUDGING_IDS), null);
  assert.equal(crossed.readRecord(MAP, BEAR), null);
});

test("two caches on one storage, as two tabs of one game, see each other's record, and the lower offer of a tab never lowers it", () => {
  // decision: D-440 "The record stays through a change of the program and the death of a character, a judging that took more raises it, it stands in the row of the map in the catalog and on its card from the first judging on that map and never before it, and after a change of the numbers of that creature the record made at its former numbers shows nothing (D-441)."
  const storage = mapStorage();
  const first = open(storage);
  const second = open(storage);
  first.offerRecord(MAP, BEAR, 24);
  assert.equal(second.readRecord(MAP, BEAR), 24);
  second.offerRecord(MAP, BEAR, 10);
  assert.equal(first.readRecord(MAP, BEAR), 24);
  assert.equal(storage.held.get(KEY), stored(24));
  second.offerRecord(MAP, BEAR, 40);
  assert.equal(first.readRecord(MAP, BEAR), 40);
});

// ---------------------------------------------------------------------------------------------------
// Another account, another game, another version

test("a record of another account, of another game of the account or under a key of another version is never read, written or removed", () => {
  // invariant: judging-cache-reading
  // decision: D-441 "It is read only in that form and version and, on opening and at a refusing storage, treated as the judgings are."
  const value = stored(50);
  const others = {
    "loop2-judging-record-1|acct-2|1000|forestLair": value,
    "loop2-judging-record-1|acct-1|2000|forestLair": value,
    "loop2-judging-record-2|acct-1|1000|forestLair": value,
    "loop2-judging-record-0|acct-1|1000|forestLair": value,
    "loop2-judging-record-10|acct-1|1000|forestLair": value,
    "loop2-judging-record|acct-1|1000|forestLair": value,
    "loop2-record-1|acct-1|1000|forestLair": value,
  };
  for (const over of [{}, { afterRefusedSave: true }, { madeAtMs: 5 }]) {
    const storage = mapStorage(others);
    const cache = open(storage, over);
    assert.equal(cache.readRecord(MAP, BEAR), null);
    cache.offerRecord(MAP, BEAR, 4);
    assert.equal(cache.readRecord(MAP, BEAR), 4, JSON.stringify(over));
    for (const key of [
      "loop2-judging-record-2|acct-1|1000|forestLair",
      "loop2-judging-record-0|acct-1|1000|forestLair",
      "loop2-judging-record-10|acct-1|1000|forestLair",
      "loop2-judging-record|acct-1|1000|forestLair",
      "loop2-record-1|acct-1|1000|forestLair",
      "loop2-judging-record-1|acct-2|1000|forestLair",
    ])
      assert.equal(
        storage.held.get(key),
        value,
        `${key} ${JSON.stringify(over)}`,
      );
  }
});

test("an account whose identifier holds the separator of a key shares no record with another account", () => {
  // invariant: judging-cache-reading
  // decision: D-441 "Beside the judgings the browser keeps the record of D-440 in its lasting storage, one value under a key of its own with its own version for each account, game and map, holding the number and the creature's numbers it was made at."
  const storage = mapStorage();
  const odd = open(storage, { accountId: "a|999" });
  const percent = open(storage, { accountId: "a%7C999" });
  odd.offerRecord(MAP, BEAR, 11);
  percent.offerRecord(MAP, BEAR, 22);
  assert.equal(odd.readRecord(MAP, BEAR), 11);
  assert.equal(percent.readRecord(MAP, BEAR), 22);
  // Where the separator stood bare, the key of "a|999" would read as the account "a" under the moment
  // 999, another game than its own, and the opening for "a" would remove it.
  const plain = open(storage, { accountId: "a" });
  assert.equal(plain.readRecord(MAP, BEAR), null);
  assert.equal(open(storage, { accountId: "a|999" }).readRecord(MAP, BEAR), 11);
  open(storage, { accountId: "a|999", madeAtMs: 5 });
  assert.equal(
    open(storage, { accountId: "a|999" }).readRecord(MAP, BEAR),
    null,
  );
  assert.equal(
    open(storage, { accountId: "a%7C999" }).readRecord(MAP, BEAR),
    22,
  );
});

// ---------------------------------------------------------------------------------------------------
// A value anyone can write

const BAD_VALUES = [
  ["an empty text", ""],
  ["a text that is no JSON", "{damage:"],
  ["a cut value", stored(24).slice(0, -1)],
  ["null", "null"],
  ["a number", "24"],
  ["a text", '"24"'],
  ["a list", "[]"],
  ["a list of the three values", "[24,120,20]"],
  ["an empty object", "{}"],
  ...["damage", "health", "strikeDamage"].map((field) => [
    `a value without ${field}`,
    JSON.stringify(
      Object.fromEntries(
        Object.entries({ damage: 24, health: 120, strikeDamage: 20 }).filter(
          ([name]) => name !== field,
        ),
      ),
    ),
  ]),
  [
    "a value with one more field",
    JSON.stringify({ damage: 24, health: 120, strikeDamage: 20, name: "Ala" }),
  ],
  [
    "a value with a field called __proto__ besides the three",
    stored(24).replace("{", '{"__proto__":{"damage":1},'),
  ],
  [
    "a value with a field called constructor besides the three",
    stored(24).replace("{", '{"constructor":{"name":"x"},'),
  ],
  [
    "a value whose three fields are named by a prototype",
    '{"__proto__":{"damage":24,"health":120,"strikeDamage":20}}',
  ],
  ["a damage below 0", stored(-1)],
  ["a damage with a fraction", stored(0.5)],
  ["a damage that is a text", '{"damage":"24","health":120,"strikeDamage":20}'],
  ["a damage that is null", '{"damage":null,"health":120,"strikeDamage":20}'],
  ["a damage that is a list", '{"damage":[24],"health":120,"strikeDamage":20}'],
  [
    "a damage past the safe integers",
    '{"damage":9007199254740992,"health":9007199254740993,"strikeDamage":20}',
  ],
  [
    "a damage too large for a number",
    '{"damage":1e400,"health":120,"strikeDamage":20}',
  ],
  ["a damage above the creature's whole health", stored(121)],
  ["a health of 0", stored(0, 0)],
  ["a health below 0", stored(0, -120)],
  ["a health with a fraction", stored(24, 120.5)],
  ["a health that is a text", '{"damage":24,"health":"120","strikeDamage":20}'],
  [
    "a health past the safe integers",
    '{"damage":24,"health":9007199254740992,"strikeDamage":20}',
  ],
  ["a blow below 0", stored(24, 120, -1)],
  ["a blow with a fraction", stored(24, 120, 20.5)],
  ["a blow that is a text", '{"damage":24,"health":120,"strikeDamage":"20"}'],
  ["a blow that is null", '{"damage":24,"health":120,"strikeDamage":null}'],
  [
    "a blow past the safe integers",
    '{"damage":24,"health":120,"strikeDamage":9007199254740992}',
  ],
  [
    "a valid value padded past the bound a value may have",
    stored(24) + " ".repeat(1_000_000),
  ],
  ["a valid value with a long text before it", " ".repeat(5_000) + stored(24)],
];

test("a value of the stored form is read as the number it holds, the control of the cases that follow", () => {
  // invariant: judging-cache-reading
  // decision: D-441 "It is read only in that form and version and, on opening and at a refusing storage, treated as the judgings are."
  const cache = open(mapStorage({ [KEY]: stored(24) }));
  assert.equal(cache.readRecord(MAP, BEAR), 24);
});

for (const [name, value] of BAD_VALUES) {
  test(`a stored value that is ${name} reads as none, throws nothing and stays where it is`, () => {
    // invariant: judging-cache-reading
    // decision: D-441 "It is read only in that form and version and, on opening and at a refusing storage, treated as the judgings are."
    const storage = mapStorage({ [KEY]: value });
    const cache = open(storage);
    assert.equal(cache.readRecord(MAP, BEAR), null);
    assert.equal(storage.held.get(KEY), value);
  });
}

test("a storage that answers a reading with no text reads as none", () => {
  // invariant: judging-cache-reading
  // decision: D-441 "It is read only in that form and version and, on opening and at a refusing storage, treated as the judgings are."
  for (const answer of [undefined, 7, {}, ["x"], true]) {
    const storage = { ...mapStorage(), getItem: () => answer };
    assert.equal(open(storage).readRecord(MAP, BEAR), null);
  }
});

test("a bad value under the key is replaced by the next offer, and a record of the stored form is never lowered by one that is bad", () => {
  // invariant: judging-cache-reading
  // decision: D-441 "It is read only in that form and version and, on opening and at a refusing storage, treated as the judgings are."
  const storage = mapStorage({ [KEY]: stored(121) });
  const cache = open(storage);
  cache.offerRecord(MAP, BEAR, 3);
  assert.equal(storage.held.get(KEY), stored(3));
  assert.equal(cache.readRecord(MAP, BEAR), 3);
});

// A number or a creature the page offers that is no number the game can give is neither stored nor read.
const BAD_OFFERS = [
  ["a damage below 0", BEAR, -1],
  ["a damage with a fraction", BEAR, 0.5],
  ["a damage that is NaN", BEAR, Number.NaN],
  ["a damage that is infinite", BEAR, Number.POSITIVE_INFINITY],
  ["a damage past the safe integers", BEAR, 2 ** 53],
  ["a damage above the creature's whole health", BEAR, 121],
  ["a health of 0", { health: 0, strikeDamage: 20 }, 0],
  ["a health that is NaN", { health: Number.NaN, strikeDamage: 20 }, 0],
  ["a health with a fraction", { health: 120.5, strikeDamage: 20 }, 1],
  ["a blow below 0", { health: 120, strikeDamage: -1 }, 1],
  ["a blow that is NaN", { health: 120, strikeDamage: Number.NaN }, 1],
  ["a blow that is no number", { health: 120, strikeDamage: "20" }, 1],
];

for (const [name, creature, damage] of BAD_OFFERS) {
  test(`an offer of ${name} stores nothing and throws nothing`, () => {
    // invariant: judging-cache-reading
    // decision: D-441 "Beside the judgings the browser keeps the record of D-440 in its lasting storage, one value under a key of its own with its own version for each account, game and map, holding the number and the creature's numbers it was made at."
    const storage = mapStorage();
    const cache = open(storage);
    cache.offerRecord(MAP, creature, damage);
    assert.equal(storage.held.size, 0);
    assert.equal(cache.readRecord(MAP, BEAR), null);
    assert.equal(cache.readRecord(MAP, creature), null);
  });
}

// ---------------------------------------------------------------------------------------------------
// The storage refuses

test("a write the storage refuses leaves the record for the open page, leaves the stored record where it is, and throws nothing", () => {
  // invariant: judging-cache-reading
  // decision: D-441 "A record the storage refuses stays for the open page, and the stored one is left, since the record never falls."
  // decision: D-441 "Where the browser refuses its lasting storage, or refuses to write a value, the judging stands for the open page alone, the stored value of its triple being removed where the browser allows it, and no exception of the storage reaches the screen or the handling of an error no code of the game handled (D-323)."
  const storage = refusingStorage({ [KEY]: stored(24) });
  const cache = open(storage);
  cache.offerRecord(MAP, BEAR, 30);
  assert.equal(cache.readRecord(MAP, BEAR), 30);
  // The stored record is a record that was made, and a reload shows it; the page's number is lost with the page.
  assert.equal(storage.held.get(KEY), stored(24));
  assert.equal(open(storage).readRecord(MAP, BEAR), 24);
  // An offer below what the page holds changes nothing, though the storage holds less.
  cache.offerRecord(MAP, BEAR, 26);
  assert.equal(cache.readRecord(MAP, BEAR), 30);
});

test("a write the storage refuses and a removal it refuses too still leave the record for the open page", () => {
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
  cache.offerRecord(MAP, BEAR, 9);
  assert.equal(cache.readRecord(MAP, BEAR), 9);
});

test("a write that succeeds after a refused one takes the record out of the page's memory, so the storage answers again, and a higher number of another tab stands over the page's", () => {
  // invariant: judging-cache-reading
  // decision: D-441 "Where the browser refuses its lasting storage, or refuses to write a value, the judging stands for the open page alone, the stored value of its triple being removed where the browser allows it, and no exception of the storage reaches the screen or the handling of an error no code of the game handled (D-323)."
  const storage = refusingStorage();
  const cache = open(storage);
  cache.offerRecord(MAP, BEAR, 8);
  cache.offerRecord("forestDeep", BEAR, 3);
  // Another tab writes a higher number: the record never falls to the page's own.
  storage.held.set(KEY, stored(50));
  assert.equal(cache.readRecord(MAP, BEAR), 50);
  storage.refusing.on = false;
  cache.offerRecord(MAP, BEAR, 60);
  assert.equal(storage.held.get(KEY), stored(60));
  // Another tab raises it above and then lowers the value by hand: the page reads the storage, not its memory.
  storage.held.set(KEY, stored(70));
  assert.equal(cache.readRecord(MAP, BEAR), 70);
  // The record whose write was never made stands in the page's memory still.
  assert.equal(cache.readRecord("forestDeep", BEAR), 3);
});

test("a storage whose every call throws opens, takes and gives a record for the open page, and throws nothing", () => {
  // invariant: judging-cache-reading
  // decision: D-441 "Where the browser refuses its lasting storage, or refuses to write a value, the judging stands for the open page alone, the stored value of its triple being removed where the browser allows it, and no exception of the storage reaches the screen or the handling of an error no code of the game handled (D-323)."
  const storage = brokenStorage();
  const cache = open(storage);
  assert.equal(cache.readRecord(MAP, BEAR), null);
  cache.offerRecord(MAP, BEAR, 6);
  assert.equal(cache.readRecord(MAP, BEAR), 6);
  cache.offerRecord(MAP, BEAR, 2);
  assert.equal(cache.readRecord(MAP, BEAR), 6);
  assert.equal(
    open(storage, { afterRefusedSave: true }).readRecord(MAP, BEAR),
    null,
  );
  assert.equal(open(storage, { madeAtMs: 7 }).readRecord(MAP, BEAR), null);
});

test("no storage at all keeps a record for the open page alone", () => {
  // invariant: judging-cache-reading
  // decision: D-441 "Where the browser refuses its lasting storage, or refuses to write a value, the judging stands for the open page alone, the stored value of its triple being removed where the browser allows it, and no exception of the storage reaches the screen or the handling of an error no code of the game handled (D-323)."
  const cache = open(null);
  assert.equal(cache.readRecord(MAP, BEAR), null);
  cache.offerRecord(MAP, BEAR, 10);
  cache.offerRecord(MAP, BEAR, 4);
  assert.equal(cache.readRecord(MAP, BEAR), 10);
  // Held for the creature's numbers it was made at: other numbers read none.
  assert.equal(cache.readRecord(MAP, { health: 121, strikeDamage: 20 }), null);
  assert.equal(open(null).readRecord(MAP, BEAR), null);
});

// ---------------------------------------------------------------------------------------------------
// What the opening removes

test("opening a game removes the records of the same account under the moment of another game, and leaves other accounts', other versions' and the judgings'", () => {
  // invariant: judging-cache-reading
  // decision: D-441 "When the page opens the remembered judgings of a game, it removes the values of the same account under the moment of another game and those of this game whose content revision or generation number stands above that of its program or character in the loaded game or whose program number or character number is not below the number the loaded game gives to its next program or character, and, where it builds the game after the server refused its save for another browser's (D-209), every value of this game, leaving the values of other accounts."
  const value = stored(50);
  const storage = mapStorage({
    [KEY]: value,
    "loop2-judging-record-1|acct-1|1000|forestDeep": value,
    "loop2-judging-record-1|acct-1|999|forestLair": value,
    "loop2-judging-record-1|acct-1|2000|forestLair": value,
    "loop2-judging-record-1|acct-1|-5|forestLair": value,
    "loop2-judging-record-1|acct-1|10000|forestLair": value,
    "loop2-judging-record-1|acct-1|100|forestLair": value,
    "loop2-judging-record-1|acct-2|999|forestLair": value,
    "loop2-judging-record-1|acct-2|1000|forestLair": value,
    "loop2-judging-record-2|acct-1|999|forestLair": value,
    [JUDGING_KEY]: JUDGING_VALUE,
    "loop2-judging-3|acct-1|999|1|1|forestLair": JUDGING_VALUE,
    "unrelated key": "x",
  });
  open(storage);
  assert.deepEqual(
    keysOfStorage(storage),
    [
      KEY,
      "loop2-judging-record-1|acct-1|1000|forestDeep",
      "loop2-judging-record-1|acct-2|1000|forestLair",
      "loop2-judging-record-1|acct-2|999|forestLair",
      "loop2-judging-record-2|acct-1|999|forestLair",
      JUDGING_KEY,
      // The judging of another game goes by the opening's rule for judgings, not by the record's.
      "unrelated key",
    ].sort(),
  );
});

test("a game built after a refused save has every record of this game removed too, and other accounts' and other versions' left", () => {
  // invariant: judging-cache-reading
  // decision: D-441 "When the page opens the remembered judgings of a game, it removes the values of the same account under the moment of another game and those of this game whose content revision or generation number stands above that of its program or character in the loaded game or whose program number or character number is not below the number the loaded game gives to its next program or character, and, where it builds the game after the server refused its save for another browser's (D-209), every value of this game, leaving the values of other accounts."
  const value = stored(50);
  const storage = mapStorage({
    [KEY]: value,
    "loop2-judging-record-1|acct-1|1000|forestDeep": "not a value of the cache",
    "loop2-judging-record-1|acct-1|999|forestLair": value,
    "loop2-judging-record-1|acct-2|1000|forestLair": value,
    "loop2-judging-record-2|acct-1|1000|forestLair": value,
  });
  const cache = open(storage, { afterRefusedSave: true });
  assert.equal(cache.readRecord(MAP, BEAR), null);
  assert.deepEqual(keysOfStorage(storage), [
    "loop2-judging-record-1|acct-2|1000|forestLair",
    "loop2-judging-record-2|acct-1|1000|forestLair",
  ]);
  // A record made after the opening is kept as in any game.
  cache.offerRecord(MAP, BEAR, 5);
  assert.equal(cache.readRecord(MAP, BEAR), 5);
  assert.equal(open(storage).readRecord(MAP, BEAR), 5);
});

test("opening with a storage that refuses to list its keys or to remove a value throws nothing and still reads", () => {
  // invariant: judging-cache-reading
  // decision: D-441 "When the page opens the remembered judgings of a game, it removes the values of the same account under the moment of another game and those of this game whose content revision or generation number stands above that of its program or character in the loaded game or whose program number or character number is not below the number the loaded game gives to its next program or character, and, where it builds the game after the server refused its save for another browser's (D-209), every value of this game, leaving the values of other accounts."
  const noList = {
    ...mapStorage({ [KEY]: stored(24) }),
    key: () => {
      throw new DOMException("no", "SecurityError");
    },
  };
  assert.equal(
    open(noList, { afterRefusedSave: true }).readRecord(MAP, BEAR),
    24,
  );
  const noRemoval = {
    ...mapStorage({
      [KEY]: stored(24),
      "loop2-judging-record-1|acct-1|999|forestLair": stored(24),
    }),
    removeItem: () => {
      throw new DOMException("no", "SecurityError");
    },
  };
  assert.equal(open(noRemoval).readRecord(MAP, BEAR), 24);
});

test("opening leaves the game state it was given as it was", () => {
  const state = loaded({ revision: 1, generation: 1 });
  const before = structuredClone(state);
  open(mapStorage({ [KEY]: stored(24) }), { state });
  assert.deepEqual(state, before);
});
