// The reader of the programs of a previous save: a document of an older version, handed over as an
// unknown, gives its programs one by one through the program check of the editor. Expectations come
// from D-395, D-206 and D-213 in foundations/decisions.md, and from the invariant
// previous-save-programs-reader and save-version in foundations/invariants.md; every expected value
// is written out here.
import assert from "node:assert/strict";
import { test } from "node:test";
import { readPreviousPrograms } from "../../dist/browser/sim/previous-programs.js";

const ALWAYS = { kind: "always" };

/** A program of versions 3 to 5: one rule group under „Zawsze” with a trip plan. */
const EXPLORE = {
  groups: [
    {
      id: 1,
      name: "Program",
      condition: ALWAYS,
      rules: [{ id: 1, condition: ALWAYS, action: { kind: "explore" } }],
    },
  ],
  nextGroupId: 2,
  nextRuleId: 2,
  tripPlan: { take: [], bring: [] },
};

/** A program of versions 1 and 2, which has no trip plan: the check refuses it. */
const OLD_EXPLORE = {
  groups: EXPLORE.groups,
  nextGroupId: 2,
  nextRuleId: 2,
};

/** A program with a trip plan, two groups and conditions and actions of several kinds. */
const LAS = {
  groups: [
    {
      id: 1,
      name: "Program",
      condition: ALWAYS,
      rules: [
        {
          id: 1,
          condition: { kind: "hereBelow", resource: "berry", value: 1 },
          action: { kind: "walkTo", resource: "berry" },
        },
      ],
    },
    {
      id: 2,
      name: "Noc",
      condition: { kind: "temperatureBelow", value: 35.5 },
      rules: [
        {
          id: 2,
          condition: { kind: "itemBelow", item: "berry", value: 12 },
          action: { kind: "walkToCampfire" },
        },
      ],
    },
  ],
  nextGroupId: 3,
  nextRuleId: 3,
  tripPlan: {
    take: [{ item: "berry", count: 2 }],
    bring: [{ item: "stick", count: 12 }],
  },
};

/** The document of the current version, written out with every kind of program it can hold. */
const DOCUMENT = {
  version: 5,
  game: {
    programs: [
      { id: 1, name: "Program", program: EXPLORE },
      { id: 3, name: "Las nocą", program: LAS },
    ],
    nextProgramId: 4,
    pickedPrograms: { 2: 3 },
    lastUsedPrograms: { 1: 1 },
    lastEnteredProgram: 3,
  },
};

/** Each place under `value`: the path of keys that leads to it. */
function placesIn(value, path = []) {
  if (typeof value !== "object" || value === null) return [];
  return Object.keys(value).flatMap((key) => [
    [...path, key],
    ...placesIn(value[key], [...path, key]),
  ]);
}

/** A copy of `document` with `edit` applied to the object holding the place `path` ends at. */
function editedAt(document, path, edit) {
  const copy = structuredClone(document);
  let holder = copy;
  for (const key of path.slice(0, -1)) holder = holder[key];
  edit(holder, path.at(-1));
  return copy;
}

/** Values a JSON document can hold in place of any other, among them objects that refuse to become text. */
const HOSTILE_VALUES = [
  null,
  true,
  0,
  -1,
  1.5,
  2 ** 53,
  "",
  "x",
  [],
  [null],
  {},
  { toString: 1, valueOf: 1 },
  { kind: { toString: 1, valueOf: 1 } },
  JSON.parse('{"__proto__":null}'),
  JSON.parse('{"__proto__":{"kind":"always"}}'),
];

function deepFreeze(value) {
  if (value !== null && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const inner of Object.values(value)) deepFreeze(inner);
  }
  return value;
}

// Versions 1 and 2 have programs with no trip plan; versions 3 to 5 have the trip plan.
test("a document of each version from 1 to 5 gives its programs in order, a program without a trip plan skipped and named", () => {
  const documents = {
    1: {
      version: 1,
      game: {
        programs: [
          { id: 1, name: "Program", program: OLD_EXPLORE },
          { id: 2, name: "Las", program: EXPLORE },
        ],
      },
    },
    2: {
      version: 2,
      game: {
        programs: [
          { id: 1, name: "Dom", program: OLD_EXPLORE },
          { id: 2, name: "Las", program: EXPLORE },
        ],
      },
    },
    3: {
      version: 3,
      game: {
        programs: [
          { id: 1, name: "Program", program: EXPLORE },
          { id: 2, name: "Las nocą", program: LAS },
        ],
      },
    },
    4: {
      version: 4,
      game: {
        programs: [{ id: 2, name: "Las nocą", program: LAS }],
      },
    },
    5: {
      version: 5,
      game: {
        programs: [
          { id: 1, name: "Program", program: EXPLORE },
          { id: 2, name: "Las nocą", program: LAS },
        ],
      },
    },
  };
  assert.deepEqual(readPreviousPrograms(documents[1]), {
    ok: true,
    items: [
      { kind: "skipped", name: "Program" },
      { kind: "read", name: "Las", program: EXPLORE },
    ],
  });
  assert.deepEqual(readPreviousPrograms(documents[2]), {
    ok: true,
    items: [
      { kind: "skipped", name: "Dom" },
      { kind: "read", name: "Las", program: EXPLORE },
    ],
  });
  assert.deepEqual(readPreviousPrograms(documents[3]), {
    ok: true,
    items: [
      { kind: "read", name: "Program", program: EXPLORE },
      { kind: "read", name: "Las nocą", program: LAS },
    ],
  });
  assert.deepEqual(readPreviousPrograms(documents[4]), {
    ok: true,
    items: [{ kind: "read", name: "Las nocą", program: LAS }],
  });
  assert.deepEqual(readPreviousPrograms(documents[5]), {
    ok: true,
    items: [
      { kind: "read", name: "Program", program: EXPLORE },
      { kind: "read", name: "Las nocą", program: LAS },
    ],
  });
});

// invariant: previous-save-programs-reader
test("an item with a key besides id, name and program is skipped and named, and the others go on", () => {
  const document = {
    version: 5,
    game: {
      programs: [
        { id: 1, name: "Las", program: EXPLORE, extra: true },
        { id: 2, name: "Dom", program: EXPLORE },
      ],
    },
  };
  assert.deepEqual(readPreviousPrograms(document), {
    ok: true,
    items: [
      { kind: "skipped", name: "Las" },
      { kind: "read", name: "Dom", program: EXPLORE },
    ],
  });
});

// invariant: previous-save-programs-reader
test("an item with three keys of which one is not id, name or program is skipped and named", () => {
  const document = {
    version: 5,
    game: {
      programs: [
        { ident: 1, name: "Las", program: EXPLORE },
        { id: 2, name: "Noc", programme: EXPLORE },
        { id: 3, name: "Dom", program: EXPLORE },
      ],
    },
  };
  assert.deepEqual(readPreviousPrograms(document), {
    ok: true,
    items: [
      { kind: "skipped", name: "Las" },
      { kind: "skipped", name: "Noc" },
      { kind: "read", name: "Dom", program: EXPLORE },
    ],
  });
});

// invariant: previous-save-programs-reader
test("an item missing a key is skipped: named when its name is text, by its place when it is not", () => {
  const document = {
    version: 5,
    game: {
      programs: [
        { id: 1, name: "Las", program: EXPLORE },
        { id: 2, program: EXPLORE },
        { id: 3, name: "Noc" },
        { name: "Dom", program: EXPLORE },
        { id: 5, name: "Kot", program: EXPLORE },
      ],
    },
  };
  assert.deepEqual(readPreviousPrograms(document), {
    ok: true,
    items: [
      { kind: "read", name: "Las", program: EXPLORE },
      { kind: "skipped", place: 2 },
      { kind: "skipped", name: "Noc" },
      { kind: "skipped", name: "Dom" },
      { kind: "read", name: "Kot", program: EXPLORE },
    ],
  });
});

// invariant: previous-save-programs-reader
test("an item whose name is spaces or is no text is skipped and named by its place on the list", () => {
  const document = {
    version: 5,
    game: {
      programs: [
        { id: 1, name: "   ", program: EXPLORE },
        { id: 2, name: 5, program: EXPLORE },
        { id: 3, name: null, program: EXPLORE },
        { id: 4, name: ["Las"], program: EXPLORE },
        { id: 5, name: "Dom", program: EXPLORE },
      ],
    },
  };
  assert.deepEqual(readPreviousPrograms(document), {
    ok: true,
    items: [
      { kind: "skipped", place: 1 },
      { kind: "skipped", place: 2 },
      { kind: "skipped", place: 3 },
      { kind: "skipped", place: 4 },
      { kind: "read", name: "Dom", program: EXPLORE },
    ],
  });
});

// invariant: previous-save-programs-reader
test("the name read is trimmed of the white space at its start and end", () => {
  const document = {
    version: 5,
    game: {
      programs: [
        { id: 1, name: "  Las nocą \t", program: EXPLORE },
        { id: 2, name: " Dom ", program: { groups: [] } },
      ],
    },
  };
  assert.deepEqual(readPreviousPrograms(document), {
    ok: true,
    items: [
      { kind: "read", name: "Las nocą", program: EXPLORE },
      { kind: "skipped", name: "Dom" },
    ],
  });
});

// invariant: previous-save-programs-reader
test("a program naming an action, a resource or an item the data lacks is skipped; refusing one refuses no other", () => {
  const withAction = {
    ...EXPLORE,
    groups: [
      {
        id: 1,
        name: "Program",
        condition: ALWAYS,
        rules: [{ id: 1, condition: ALWAYS, action: { kind: "fly" } }],
      },
    ],
  };
  const withItem = {
    ...LAS,
    tripPlan: { take: [{ item: "unobtainium", count: 1 }], bring: [] },
  };
  const withResource = {
    ...EXPLORE,
    groups: [
      {
        id: 1,
        name: "Program",
        condition: ALWAYS,
        rules: [
          {
            id: 1,
            condition: ALWAYS,
            action: { kind: "walkTo", resource: "no-such-resource" },
          },
        ],
      },
    ],
  };
  const document = {
    version: 5,
    game: {
      programs: [
        { id: 1, name: "Akcja", program: withAction },
        { id: 2, name: "Przedmiot", program: withItem },
        { id: 3, name: "Zasób", program: withResource },
        { id: 4, name: "Las", program: LAS },
      ],
    },
  };
  assert.deepEqual(readPreviousPrograms(document), {
    ok: true,
    items: [
      { kind: "skipped", name: "Akcja" },
      { kind: "skipped", name: "Przedmiot" },
      { kind: "skipped", name: "Zasób" },
      { kind: "read", name: "Las", program: LAS },
    ],
  });
});

// invariant: save-version
test("a document of another version or with no whole version is unreadable", () => {
  const programs = [{ id: 1, name: "Las", program: EXPLORE }];
  for (const version of [6, 0, 1.5, -1, "5", 2 ** 53, null, undefined]) {
    assert.deepEqual(
      readPreviousPrograms({ version, game: { programs } }),
      { ok: false },
      `version ${String(version)}`,
    );
  }
  const noVersion = { game: { programs } };
  assert.deepEqual(
    readPreviousPrograms(noVersion),
    { ok: false },
    "no version",
  );
});

// invariant: save-version
test("a value that is no document, or has no game, no program list or a list with a hole, is unreadable", () => {
  const programs = [{ id: 1, name: "Las", program: EXPLORE }];
  const holed = [{ id: 1, name: "Las", program: EXPLORE }];
  holed.length = 2;
  const unreadable = [
    null,
    "Las",
    [{ version: 5, game: { programs } }],
    { version: 5 },
    { version: 5, game: null },
    { version: 5, game: [] },
    { version: 5, game: "Las" },
    { version: 5, game: {} },
    { version: 5, game: { programs: null } },
    { version: 5, game: { programs: { 0: programs[0] } } },
    { version: 5, game: { programs: "Las" } },
    { version: 5, game: { programs: holed } },
  ];
  for (const document of unreadable) {
    assert.deepEqual(
      readPreviousPrograms(document),
      { ok: false },
      JSON.stringify(document),
    );
  }
});

// invariant: previous-save-programs-reader
test("an empty list of programs is read as a readable document with no item", () => {
  assert.deepEqual(
    readPreviousPrograms({ version: 5, game: { programs: [] } }),
    {
      ok: true,
      items: [],
    },
  );
});

// invariant: previous-save-programs-reader
test("the id of an item is neither used nor checked", () => {
  for (const id of [0, -1, "x", null, 999, 2 ** 60, { toString: 1 }]) {
    const document = {
      version: 5,
      game: { programs: [{ id, name: "Las", program: EXPLORE }] },
    };
    assert.deepEqual(
      readPreviousPrograms(document),
      {
        ok: true,
        items: [{ kind: "read", name: "Las", program: EXPLORE }],
      },
      `id ${JSON.stringify(id)}`,
    );
  }
});

// invariant: save-version
// Fault: a hostile value at some place of a document makes the reading throw a
// message-quoting error, and the page shows the player a failure for a
// document that should only be skipped. The expected result comes from D-213
// and D-395: the reader refuses or skips and never throws.
test("no value a document can hold, at any place of it, throws out of the reading, and the document is left as it was", () => {
  const places = placesIn(DOCUMENT);
  assert.ok(places.length > 40, "precondition: the sweep reaches the programs");
  for (const path of places) {
    const label = path.join(".");
    for (const hostile of HOSTILE_VALUES) {
      const document = editedAt(DOCUMENT, path, (holder, key) => {
        holder[key] = structuredClone(hostile);
      });
      const before = structuredClone(document);
      assert.doesNotThrow(() => readPreviousPrograms(document), label);
      assert.deepEqual(document, before, label);
    }
    const removed = editedAt(DOCUMENT, path, (holder, key) => {
      delete holder[key];
    });
    assert.doesNotThrow(
      () => readPreviousPrograms(removed),
      `${label} removed`,
    );
  }
});

// invariant: previous-save-programs-reader
// Fault: the reading accepts any value that is an object for a document, a game or an item, so
// a Map or a class instance of the right keys passes. The expected result comes from D-395: a
// value that does not look like what the game wrote gives a refusal or a skip and no guess. An
// object with no prototype looks like a literal, so it is read.
test("a document, a game or an item that is undefined, a Map or a class instance is not a plain object, and one with no prototype is", () => {
  class Holder {
    constructor(fields) {
      Object.assign(this, fields);
    }
  }
  const bare = (fields) => Object.assign(Object.create(null), fields);
  const item = { id: 1, name: "Las", program: EXPLORE };
  const game = { programs: [item] };
  const read = [{ kind: "read", name: "Las", program: EXPLORE }];
  for (const [label, document] of [
    ["undefined", undefined],
    [
      "a Map",
      new Map([
        ["version", 5],
        ["game", game],
      ]),
    ],
    ["a class instance", new Holder({ version: 5, game })],
  ]) {
    assert.deepEqual(
      readPreviousPrograms(document),
      { ok: false },
      `${label} as the document`,
    );
  }
  for (const [label, held] of [
    ["undefined", undefined],
    ["a Map", new Map([["programs", [item]]])],
    ["a class instance", new Holder({ programs: [item] })],
  ]) {
    assert.deepEqual(
      readPreviousPrograms({ version: 5, game: held }),
      { ok: false },
      `${label} as the game`,
    );
  }
  for (const [label, held] of [
    ["undefined", undefined],
    ["a Map", new Map(Object.entries(item))],
    ["a class instance", new Holder(item)],
  ]) {
    assert.deepEqual(
      readPreviousPrograms({ version: 5, game: { programs: [held] } }),
      { ok: true, items: [{ kind: "skipped", place: 1 }] },
      `${label} as the item`,
    );
  }
  assert.deepEqual(
    readPreviousPrograms(
      bare({ version: 5, game: bare({ programs: [bare(item)] }) }),
    ),
    { ok: true, items: read },
    "no prototype at all three places",
  );
});

// invariant: previous-save-programs-reader
// Fault: the reading recurses on, or copies as text, a value of the document, so a very deep
// value or a very long list ends in a RangeError and the page shows the player a failure. The
// expected result comes from D-213 and D-395: the reader refuses or skips and never throws.
test("a very deep value at a place of the document and a very long list of items are read without error", () => {
  const deep = () => {
    let value = [];
    for (let level = 0; level < 30_000; level += 1) value = [value];
    return value;
  };
  const program = (changes) => ({ ...EXPLORE, ...changes });
  const document = {
    version: 5,
    game: {
      programs: [
        { id: deep(), name: "Id", program: EXPLORE },
        { id: 2, name: deep(), program: EXPLORE },
        { id: 3, name: "Program", program: deep() },
        { id: 4, name: "Klucz", program: EXPLORE, extra: deep() },
        {
          id: 5,
          name: "Warunek",
          program: program({
            groups: [{ ...EXPLORE.groups[0], condition: deep() }],
          }),
        },
        {
          id: 6,
          name: "Plan",
          program: program({ tripPlan: { take: deep(), bring: [] } }),
        },
      ],
      note: deep(),
    },
  };
  assert.deepEqual(readPreviousPrograms(document), {
    ok: true,
    items: [
      { kind: "read", name: "Id", program: EXPLORE },
      { kind: "skipped", place: 2 },
      { kind: "skipped", name: "Program" },
      { kind: "skipped", name: "Klucz" },
      { kind: "skipped", name: "Warunek" },
      { kind: "skipped", name: "Plan" },
    ],
  });
  assert.doesNotThrow(
    () => readPreviousPrograms({ version: deep(), game: document.game }),
    "a deep version",
  );
  const count = 200_000;
  const long = readPreviousPrograms({
    version: 5,
    game: { programs: new Array(count).fill(null) },
  });
  assert.equal(long.ok, true);
  assert.equal(long.items.length, count);
  assert.deepEqual(long.items.at(-1), { kind: "skipped", place: count });
});

// invariant: save-version
test("a document frozen all the way down is read without error, which shows the reading writes nothing", () => {
  const frozen = deepFreeze(structuredClone(DOCUMENT));
  assert.deepEqual(readPreviousPrograms(frozen), {
    ok: true,
    items: [
      { kind: "read", name: "Program", program: EXPLORE },
      { kind: "read", name: "Las nocą", program: LAS },
    ],
  });
});

// invariant: previous-save-programs-reader
test("the result shares nothing with the document: a later change of the document leaves it as it was", () => {
  const document = structuredClone(DOCUMENT);
  const result = readPreviousPrograms(document);
  const snapshot = structuredClone(result);
  document.game.programs[1].program.groups[0].name = "zmieniony";
  document.game.programs[1].program.groups[0].rules[0].action.kind = "wander";
  document.game.programs[1].program.tripPlan.take[0].count = 99;
  document.game.programs[1].name = "zmieniona";
  assert.deepEqual(result, snapshot);
  assert.equal(result.items[1].program.groups[0].name, "Program");
});

// invariant: previous-save-programs-reader
test("nothing of the document beside its version, its game's programs and the items' name and program is read", () => {
  const reads = [];
  const named = (key) =>
    typeof key === "string" && !/^\d+$/.test(key) && key !== "length";
  const watched = (target, label) =>
    new Proxy(target, {
      get(object, key, receiver) {
        if (named(key)) reads.push(`${label}.${key}`);
        return Reflect.get(object, key, receiver);
      },
      getOwnPropertyDescriptor(object, key) {
        if (named(key)) reads.push(`${label}.${key}`);
        return Reflect.getOwnPropertyDescriptor(object, key);
      },
    });
  const items = [
    watched({ id: 1, name: "Las", program: EXPLORE, extra: 1 }, "item"),
    watched({ id: 2, name: "Dom", program: EXPLORE }, "item"),
  ];
  const game = watched({ programs: items, nextProgramId: 3 }, "game");
  const document = watched({ version: 5, game, note: "x" }, "document");
  readPreviousPrograms(document);
  const allowed = new Set([
    "document.version",
    "document.game",
    "game.programs",
    "item.name",
    "item.program",
  ]);
  assert.ok(reads.length > 0, "precondition: the reading reads the document");
  for (const read of reads) assert.ok(allowed.has(read), read);
});

// invariant: previous-save-programs-reader
// Fault: the reading catches every error as a refusal, so a fault of the code
// is shown as a damaged save. The expected result comes from D-213: only the
// reader's own refusal is a skip; every other error propagates.
test("an error that is no refusal of the check propagates out of the reading", () => {
  const faulty = new Proxy(structuredClone(DOCUMENT), {
    getOwnPropertyDescriptor(target, key) {
      if (key === "game") throw new TypeError("a fault of the code");
      return Reflect.getOwnPropertyDescriptor(target, key);
    },
  });
  assert.throws(() => readPreviousPrograms(faulty), TypeError);
});

// invariant: previous-save-programs-reader
// Fault: the reading catches the program check's own refusal and every other
// error as well, so a fault inside checkProgram is shown as a skipped program.
// The expected result comes from D-213 and D-395: only ProgramCheckError skips.
test("a fault inside the program check of an item propagates out of the reading", () => {
  const faultyProgram = new Proxy(structuredClone(EXPLORE), {
    get() {
      throw new TypeError("a fault of the code");
    },
  });
  const document = {
    version: 5,
    game: { programs: [{ id: 1, name: "Las", program: faultyProgram }] },
  };
  assert.throws(() => readPreviousPrograms(document), TypeError);
});
