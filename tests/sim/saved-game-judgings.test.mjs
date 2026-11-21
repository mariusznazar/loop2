// The remembered judgings in the saved game state (D-440): what a save writes of them and what the
// strict load admits and refuses (D-206, D-213, D-165, D-56). The expectations come from D-440 (what is
// remembered: the kind of each of the twelve results and the equipment, no cause and no minute), from
// D-213 (a crafted document of the current version is refused whole as `shape`, and no value a document
// can hold makes the load throw), from D-165 and D-56 (a record names a program of the list and a
// character of the team) and from D-386 (the load admits every game state the game's own functions make,
// so equipment the chest no longer holds loads). The expected states and documents are written out here.
import assert from "node:assert/strict";
import { test } from "node:test";
import {
  createCharacter,
  newGame,
  withSaveTime,
} from "../../dist/browser/sim/game.js";
import {
  deleteProgram,
  createProgram,
} from "../../dist/browser/sim/programs.js";
import { loadSavedGame, savedGame } from "../../dist/browser/sim/saved-game.js";
import { newKnowingGame } from "./understanding-fixture.mjs";

const NOW = 1760000000000;

/** Twelve results of the three kinds, written out by hand. */
const MIXED = [
  "solved",
  "death",
  "undecided",
  "solved",
  "solved",
  "death",
  "solved",
  "undecided",
  "solved",
  "solved",
  "solved",
  "solved",
];
const SOLVED_ALL = MIXED.map(() => "solved");
const entry = (item, count) => ({ item, count });

/**
 * A knowing game with Ala (1) and Ola (2), the programs 1 and 2 on the list, Skraj lasu and Las solved,
 * and judgings remembered for four triples: Ala's program 1 on Skraj lasu and on Las, Ala's program 2 on
 * Las and Ola's program 1 on Las.
 */
function remembering() {
  let state = createCharacter(newKnowingGame(), "Ala").state;
  state = createCharacter(state, "Ola").state;
  state = createProgram(state).state;
  return {
    ...state,
    solvedMaps: ["forestEdge", "forest"],
    judgings: {
      1: {
        1: {
          forestEdge: { results: [...SOLVED_ALL], equipment: [] },
          forest: {
            results: [...MIXED],
            equipment: [entry("berry", 10), entry("stick", 2)],
          },
        },
        2: {
          forest: { results: [...SOLVED_ALL], equipment: [entry("berry", 4)] },
        },
      },
      2: {
        1: { forest: { results: [...MIXED], equipment: [entry("stick", 1)] } },
      },
    },
  };
}

/** The saved document of `state`, as JSON text carries it to the server and back. */
function documentOf(state) {
  return JSON.parse(JSON.stringify(savedGame(withSaveTime(state, NOW))));
}

const STATE = remembering();
const DOCUMENT = documentOf(STATE);

/** A copy of the document of `remembering()` with `change` applied to its game's judgings record. */
function changed(change, document = DOCUMENT) {
  const copy = structuredClone(document);
  change(copy.game.judgings, copy);
  return copy;
}

function assertRefused(name, document) {
  let result;
  assert.doesNotThrow(() => {
    result = loadSavedGame(document);
  }, `${name}: the load threw`);
  assert.deepEqual(result, { ok: false, reason: "shape" }, name);
}

/** What the load gives for `judgings` held in place of the document's: its state's judgings, or null. */
function loadedJudgings(judgings) {
  const result = loadSavedGame(
    changed((_held, document) => {
      document.game.judgings = judgings;
    }),
  );
  return result.ok ? result.state.judgings : null;
}

// invariant: save-version
// Fault: a field the save writes and the load does not read (or reads loosely) loses the remembered
// judgings at the first reload, or the game writes a save its own load discards (D-386).
test("a game state with remembered judgings goes through the save and the load whole", () => {
  // decision: D-440 "The saved game state holds the last judging of each character, program and map: the twelve results of its seeds — solved, a death or undecided — and the equipment it took from what the chest held, while the cause and the game minute of a line stand only in the result shown after the judging (D-329)"
  assert.equal(
    Object.keys(DOCUMENT.game.judgings).length,
    2,
    "precondition: the document holds the judgings of two characters",
  );
  assert.deepEqual(loadSavedGame(DOCUMENT), {
    ok: true,
    state: withSaveTime(STATE, NOW),
  });
});

test("a new game remembers no judging, and its save loads with none", () => {
  // decision: D-440 "The saved game state holds the last judging of each character, program and map"
  assert.deepEqual(newGame().judgings, {});
  const loaded = loadSavedGame(documentOf({ ...newGame(), saveTimeMs: NOW }));
  assert.equal(loaded.ok, true);
  assert.deepEqual(loaded.state.judgings, {});
});

test("a load builds the judgings from new values, and a save shares none with the state", () => {
  // decision: D-213 "Saved-game code turns a game state into the saved document of the current version of its shape, and an unknown value — a saved game state downloaded from the server or the unsaved game state kept in the page's memory (D-211) — into a game state or a refusal naming why, inside the simulation, no value a document can hold making it throw, and changing nothing passed to it"
  const document = structuredClone(DOCUMENT);
  const before = structuredClone(document);
  const loaded = loadSavedGame(document);
  assert.equal(loaded.ok, true, "precondition: the document loads");
  assert.deepEqual(document, before, "the load changed the document");
  document.game.judgings[1][1].forest.results[0] = "death";
  document.game.judgings[1][1].forest.equipment[0].count = 99;
  assert.equal(loaded.state.judgings[1][1].forest.results[0], "solved");
  assert.equal(loaded.state.judgings[1][1].forest.equipment[0].count, 10);
  const saved = savedGame(withSaveTime(STATE, NOW));
  saved.game.judgings[1][1].forest.results[0] = "death";
  assert.equal(STATE.judgings[1][1].forest.results[0], "solved");
});

// invariant: save-version
// The load admits what the game's own functions make (D-386): a level with no judging left as an empty
// record, a judging whose equipment the chest no longer holds or the character no longer carries, and
// a judging on a map the player has not solved or opened; none of these is compared with the data.
test("what the game can make loads: empty levels, equipment beyond the chest and a map not yet open", () => {
  // decision: D-386 "The load of a saved game state admits every game state the game's own functions make"
  assert.deepEqual(loadedJudgings({}), {});
  assert.deepEqual(loadedJudgings({ 1: {} }), { 1: {} });
  assert.deepEqual(loadedJudgings({ 1: { 1: {} } }), { 1: { 1: {} } });
  const big = { results: [...SOLVED_ALL], equipment: [entry("berry", 1000)] };
  assert.deepEqual(loadedJudgings({ 1: { 1: { forest: big } } }), {
    1: { 1: { forest: big } },
  });
  const deep = { results: [...MIXED], equipment: [] };
  assert.deepEqual(loadedJudgings({ 2: { 2: { forestDeep: deep } } }), {
    2: { 2: { forestDeep: deep } },
  });
});

// invariant: save-version
// A record that names a character, a program or a map the game did not give, or the data lacks, would
// leave the game a judging it can neither show nor erase (D-56, D-165).
test("a judging naming a character the team lacks, a program the list lacks or a map the data lacks is refused as shape", () => {
  // decision: D-165 "A judging the game remembers for a character, a program and a map (D-440) names its program by that number too."
  const judging = { results: [...MIXED], equipment: [] };
  for (const key of [
    "3",
    "9",
    "0",
    "-1",
    "01",
    "1.5",
    "1e0",
    " 1",
    "",
    "__proto__",
    "x",
  ]) {
    assertRefused(
      `character ${JSON.stringify(key)}`,
      changed((_held, document) => {
        document.game.judgings = JSON.parse(
          `{${JSON.stringify(key)}:{"1":{"forest":${JSON.stringify(judging)}}}}`,
        );
      }),
    );
    assertRefused(
      `program ${JSON.stringify(key)}`,
      changed((_held, document) => {
        document.game.judgings = JSON.parse(
          `{"1":{${JSON.stringify(key)}:{"forest":${JSON.stringify(judging)}}}}`,
        );
      }),
    );
  }
  for (const key of [
    "nowhere",
    "Forest",
    "",
    "__proto__",
    "constructor",
    "toString",
    "hasOwnProperty",
    "1",
  ]) {
    assertRefused(
      `map ${JSON.stringify(key)}`,
      changed((_held, document) => {
        document.game.judgings = JSON.parse(
          `{"1":{"1":{${JSON.stringify(key)}:${JSON.stringify(judging)}}}}`,
        );
      }),
    );
  }
});

test("a judging of a program that was deleted from the list is refused as shape, though its number was given", () => {
  // decision: D-165 "Each program of the player carries a number the game gives it when the program is created, one more than the number the game state gave last, so the numbers of two programs of one game differ, a deleted program's number included"
  const deleted = {
    ...deleteProgram(STATE, 2).state,
    judgings: STATE.judgings,
  };
  assert.equal(
    deleted.judgings[1][2] !== undefined,
    true,
    "precondition: the judgings still name the program 2",
  );
  assertRefused("program 2 deleted", documentOf(deleted));
  const erased = {
    ...deleted,
    judgings: { 1: { 1: STATE.judgings[1][1] }, 2: STATE.judgings[2] },
  };
  assert.equal(
    loadSavedGame(documentOf(erased)).ok,
    true,
    "control: the same game with the judgings of program 2 gone loads",
  );
  assertRefused(
    "the number the game gave next",
    changed((held) => {
      held[1][3] = held[1][2];
      delete held[1][2];
    }),
  );
});

// invariant: save-version
// Twelve results, one for each of the data's twelve seeds, each of a kind the decision names and no more
// than the kind: the cause and the minute of a death stand only in the result shown after the judging.
test("a judging with other than twelve results, or a result of another kind, is refused as shape", () => {
  // decision: D-440 "The saved game state holds the last judging of each character, program and map: the twelve results of its seeds — solved, a death or undecided — and the equipment it took from what the chest held, while the cause and the game minute of a line stand only in the result shown after the judging (D-329)"
  const at = (held, change) => change(held[1][1].forest);
  const sparse = [...SOLVED_ALL];
  delete sparse[5];
  const extra = [...SOLVED_ALL];
  extra.note = "x";
  for (const [name, results] of Object.entries({
    "no result": [],
    "eleven results": SOLVED_ALL.slice(0, 11),
    "thirteen results": [...SOLVED_ALL, "solved"],
    "twenty-four results": [...SOLVED_ALL, ...SOLVED_ALL],
    "a list with a hole": sparse,
    "a list with a key besides its places": extra,
    "an object in place of the list": { ...SOLVED_ALL },
    "a text in place of the list": "solvedsolved",
    "null in place of the list": null,
    "an unknown kind": [...SOLVED_ALL.slice(1), "dead"],
    "a kind in another letter case": [...SOLVED_ALL.slice(1), "Solved"],
    "a number": [...SOLVED_ALL.slice(1), 1],
    null: [...SOLVED_ALL.slice(1), null],
    "the object of a solved result": [
      ...SOLVED_ALL.slice(1),
      { kind: "solved" },
    ],
    "the object of a death with its cause and minute": [
      ...SOLVED_ALL.slice(1),
      { kind: "death", cause: "cold", minute: 243 },
    ],
    "a kind inherited from the prototype": [
      ...SOLVED_ALL.slice(1),
      "constructor",
    ],
  }))
    assertRefused(
      name,
      changed((held) =>
        at(held, (judging) => {
          judging.results = results;
        }),
      ),
    );
});

// invariant: save-version
// The equipment is a trip list as the game gives one: items of the data, each once, each count a safe
// integer from 1 (D-181); a count of the data's cap or of the chest is not compared (D-440).
test("a judging whose equipment holds an item the data lacks, an item twice or a count that is no safe integer from 1 is refused as shape", () => {
  // decision: D-440 "The saved game state holds the last judging of each character, program and map: the twelve results of its seeds — solved, a death or undecided — and the equipment it took from what the chest held, while the cause and the game minute of a line stand only in the result shown after the judging (D-329)"
  const berry = entry("berry", 3);
  for (const [name, equipment] of Object.entries({
    "an item the data lacks": [entry("pebble", 1)],
    "an item inherited from the prototype": [entry("constructor", 1)],
    "an item twice": [berry, berry],
    "an item twice with other counts": [entry("berry", 1), entry("berry", 2)],
    "count 0": [entry("berry", 0)],
    "count -1": [entry("berry", -1)],
    "a count with a fraction": [entry("berry", 1.5)],
    "a count above the safe integers": [entry("berry", 2 ** 53)],
    "a count of infinity": [entry("berry", Infinity)],
    "a count that is not a number": [entry("berry", NaN)],
    "a count as text": [entry("berry", "3")],
    "a count of null": [entry("berry", null)],
    "an entry without a count": [{ item: "berry" }],
    "an entry without an item": [{ count: 3 }],
    "an entry with a key besides item and count": [{ ...berry, minute: 1 }],
    "an entry that is null": [null],
    "an entry that is a list": [["berry", 3]],
    "an item that is no text": [entry(7, 3)],
    "an object in place of the list": { 0: berry },
    "null in place of the list": null,
  }))
    assertRefused(
      name,
      changed((held) => {
        held[1][1].forest.equipment = equipment;
      }),
    );
  assertRefused(
    "a list with a hole",
    changed((held) => {
      const sparse = [berry, entry("stick", 1)];
      delete sparse[0];
      held[1][1].forest.equipment = sparse;
    }),
  );
});

// invariant: save-version
// Strict reading: every key present, no foreign key, only own keys, at every level of the record.
test("a judging record, a level of the record or the record itself of another shape is refused as shape", () => {
  // decision: D-213 "Saved-game code turns a game state into the saved document of the current version of its shape, and an unknown value — a saved game state downloaded from the server or the unsaved game state kept in the page's memory (D-211) — into a game state or a refusal naming why, inside the simulation, no value a document can hold making it throw, and changing nothing passed to it"
  const judging = () => ({ results: [...SOLVED_ALL], equipment: [] });
  const cases = {
    "a judging without its results": (held) => {
      delete held[1][1].forest.results;
    },
    "a judging without its equipment": (held) => {
      delete held[1][1].forest.equipment;
    },
    "a judging with a key of its own besides the two": (held) => {
      held[1][1].forest.minute = 243;
    },
    "a judging with a cause": (held) => {
      held[1][1].forest.cause = "cold";
    },
    "a judging with a `__proto__` key": (held) => {
      held[1][1].forest = JSON.parse(
        `{"results":${JSON.stringify(SOLVED_ALL)},"equipment":[],"__proto__":{}}`,
      );
    },
    "a judging that is null": (held) => {
      held[1][1].forest = null;
    },
    "a judging that is a list": (held) => {
      held[1][1].forest = [judging()];
    },
    "a judging that is a text": (held) => {
      held[1][1].forest = "solved";
    },
    "a level of the program that is null": (held) => {
      held[1][1] = null;
    },
    "a level of the program that is a list": (held) => {
      held[1][1] = [judging()];
    },
    "a level of the character that is null": (held) => {
      held[1] = null;
    },
    "a level of the character that is a number": (held) => {
      held[1] = 1;
    },
    "a level of the character that is a list": (held) => {
      held[1] = [];
    },
  };
  for (const [name, change] of Object.entries(cases))
    assertRefused(name, changed(change));
  for (const [name, record] of Object.entries({
    null: null,
    "a list": [],
    "a list holding a record": [{}],
    "a number": 0,
    "a text": "{}",
    true: true,
    "a Map": new Map(),
    "an object of another prototype": Object.create({ 1: {} }),
    "an object with an inherited key only": Object.create({ 1: { 1: {} } }),
    "an object with a symbol key": { [Symbol("1")]: {} },
  }))
    assertRefused(
      `the record as ${name}`,
      changed((_held, document) => {
        document.game.judgings = record;
      }),
    );
  assertRefused(
    "the record missing from the game",
    changed((_held, document) => {
      delete document.game.judgings;
    }),
  );
  assertRefused(
    "a record that stands beside the game, not in it",
    changed((_held, document) => {
      document.judgings = document.game.judgings;
      delete document.game.judgings;
    }),
  );
  assertRefused(
    "a key `__proto__` at the top of the record",
    changed((_held, document) => {
      document.game.judgings = JSON.parse('{"__proto__":{}}');
    }),
  );
});

// Values a JSON document can hold in place of any other, among them objects that refuse to become text,
// which a message quoting the value would trip on.
const HOSTILE_VALUES = [
  null,
  true,
  0,
  -1,
  1.5,
  2 ** 53,
  "",
  "x",
  "solved",
  [],
  [null],
  {},
  { toString: 1, valueOf: 1 },
  { kind: { toString: 1, valueOf: 1 } },
  JSON.parse('{"__proto__":null}'),
  JSON.parse('{"__proto__":{"1":{}}}'),
];

/** Each place under `value`: the path of keys that leads to it. */
function placesIn(value, path = []) {
  if (typeof value !== "object" || value === null) return [];
  return Object.keys(value).flatMap((key) => [
    [...path, key],
    ...placesIn(value[key], [...path, key]),
  ]);
}

// invariant: save-version
// Fault: a hostile value at a place of the new record makes the reading throw something other than its
// own refusal, and the player gets „Spróbuj ponownie” for a damaged save for good instead of the refusal
// D-96 gives. The expected result comes from D-213: a crafted document is a refusal, so it never throws.
test("no value a document can hold, at any place of the judgings, throws out of the load", () => {
  // decision: D-213 "Saved-game code turns a game state into the saved document of the current version of its shape, and an unknown value — a saved game state downloaded from the server or the unsaved game state kept in the page's memory (D-211) — into a game state or a refusal naming why, inside the simulation, no value a document can hold making it throw, and changing nothing passed to it"
  const places = placesIn(DOCUMENT.game.judgings, ["game", "judgings"]);
  assert.ok(places.length > 30, "precondition: the sweep reaches the judgings");
  for (const path of places) {
    const label = path.join(".");
    for (const [index, hostile] of HOSTILE_VALUES.entries()) {
      const document = structuredClone(DOCUMENT);
      let holder = document;
      for (const key of path.slice(0, -1)) holder = holder[key];
      holder[path.at(-1)] = structuredClone(hostile);
      assert.doesNotThrow(
        () => loadSavedGame(document),
        `${label} as hostile value ${index}`,
      );
    }
    const removed = structuredClone(DOCUMENT);
    let holder = removed;
    for (const key of path.slice(0, -1)) holder = holder[key];
    delete holder[path.at(-1)];
    assert.doesNotThrow(() => loadSavedGame(removed), `${label} removed`);
  }
});

// invariant: save-version
// Every place of the record that holds a value the load checks refuses a value of another kind, so that
// a check dropped from one place is found: each leaf of the judgings is replaced by a value of no kind
// it may hold.
test("every leaf of a remembered judging refuses a value of another kind", () => {
  // decision: D-213 "Saved-game code turns a game state into the saved document of the current version of its shape, and an unknown value — a saved game state downloaded from the server or the unsaved game state kept in the page's memory (D-211) — into a game state or a refusal naming why, inside the simulation, no value a document can hold making it throw, and changing nothing passed to it"
  const leaves = placesIn(DOCUMENT.game.judgings).filter((path) => {
    let value = DOCUMENT.game.judgings;
    for (const key of path) value = value[key];
    return typeof value !== "object";
  });
  assert.ok(leaves.length > 40, "precondition: many leaves are reached");
  for (const path of leaves)
    for (const hostile of [null, true, {}, [], -1.5]) {
      const document = structuredClone(DOCUMENT);
      let holder = document.game.judgings;
      for (const key of path.slice(0, -1)) holder = holder[key];
      holder[path.at(-1)] = hostile;
      assertRefused(
        `${path.join(".")} as ${JSON.stringify(hostile)}`,
        document,
      );
    }
});
