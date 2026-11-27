// The entry of a character skill tree into the Understanding by the pair of verb and target it
// grows (D-195): a pair whose item is held or new together with its verb, one of the two new in the
// minute. With the data of the game the first gathered moss brings the bandage and „Wytwórz” in one
// minute (D-121), so a tree never enters by its item alone; a skill and an item laid in the data
// show each side of the rule. The minute is given to `discover` as the runs before and after it
// and the events of the minute, with the fields the revealing events read.
import assert from "node:assert/strict";
import { test } from "node:test";
import { ITEMS } from "../../dist/browser/sim/data/items.js";
import { SKILLS } from "../../dist/browser/sim/data/skills.js";
import { discover } from "../../dist/browser/sim/understanding.js";

/** A map run of the fields the revealing events read, at `temperature` with `backpack` held. */
function run(temperature, backpack) {
  return {
    body: { temperature },
    character: { backpack },
    campfires: [],
    tiles: [],
    practice: {},
    death: undefined,
  };
}

/** The minute of a gathering that brings one moss into an empty backpack. */
const MOSS_MINUTE = {
  before: run(36, { moss: 0 }),
  after: run(36, { moss: 1 }),
  events: [
    {
      kind: "activityFinished",
      minute: 1,
      activity: { kind: "rule", action: { kind: "gather", resource: "moss" } },
    },
  ],
};

/** The minute in which the body falls below the threshold of chill, with no action finished. */
const CHILL_MINUTE = {
  before: run(36, {}),
  after: run(34, {}),
  events: [],
};

const NOTHING = { conditions: [], creatures: [], trees: [] };

/** An item laid in the data that no minute of these tests reveals, and a skill that grows „Wytwórz” with it. */
const SPLINT = {
  name: "szyna",
  plural: { few: "szyny", many: "szyn" },
  icon: "first-aid-kit",
  iconTitle: "First aid kit icon",
  revealedBy: { kind: "chilled" },
};
const PROBE = {
  name: "Probe",
  grownBy: [{ action: "craft", item: "splint" }],
  thresholds: [1],
};

/** Runs `body` with the rows laid on the built data and takes them off again after it. */
function withLaidRows(body) {
  assert.ok(!Object.hasOwn(ITEMS, "splint"), "precondition: no item splint");
  assert.ok(!Object.hasOwn(SKILLS, "probe"), "precondition: no skill probe");
  ITEMS.splint = SPLINT;
  SKILLS.probe = PROBE;
  try {
    return body();
  } finally {
    delete ITEMS.splint;
    delete SKILLS.probe;
  }
}

test("a tree enters with its pair when the verb is held and the item is new in the minute", () => {
  // decision: D-195 "A character skill tree with all its branches enters the Understanding in the game minute in which the player discovers the first action grown by that skill, together with any action a branch of that tree opens, and a tree whose first action the Understanding holds from the start enters with the first finished action of that skill"
  const { before, after, events } = MOSS_MINUTE;
  const revealed = discover(
    { ...NOTHING, actions: ["craft"], items: [] },
    before,
    after,
    events,
  );
  assert.deepEqual(revealed.revealed.items, ["bandage"]);
  assert.deepEqual(revealed.revealed.trees, ["tending"]);
});

test("a tree does not enter by an item new in the minute while the verb of its pair is not held", () => {
  // decision: D-195 "A character skill tree with all its branches enters the Understanding in the game minute in which the player discovers the first action grown by that skill, together with any action a branch of that tree opens, and a tree whose first action the Understanding holds from the start enters with the first finished action of that skill"
  withLaidRows(() => {
    const { before, after, events } = CHILL_MINUTE;
    const result = discover(
      { ...NOTHING, actions: [], items: [] },
      before,
      after,
      events,
    );
    assert.deepEqual(result.revealed.items, ["splint"]);
    assert.deepEqual(result?.revealed.trees ?? [], []);
  });
});

test("a tree does not enter by a verb new in the minute while the item of its pair is neither held nor new", () => {
  // decision: D-195 "A character skill tree with all its branches enters the Understanding in the game minute in which the player discovers the first action grown by that skill, together with any action a branch of that tree opens, and a tree whose first action the Understanding holds from the start enters with the first finished action of that skill"
  withLaidRows(() => {
    const { before, after, events } = MOSS_MINUTE;
    const result = discover(
      { ...NOTHING, actions: [], items: [] },
      before,
      after,
      events,
    );
    assert.ok(
      result.revealed.actions.includes("craft"),
      "precondition: craft is new",
    );
    assert.deepEqual(result.revealed.trees, ["tending"]);
  });
});

test("a tree whose pair holds both its verb and its item, neither new in the minute, does not enter", () => {
  // decision: D-195 "A character skill tree with all its branches enters the Understanding in the game minute in which the player discovers the first action grown by that skill, together with any action a branch of that tree opens, and a tree whose first action the Understanding holds from the start enters with the first finished action of that skill"
  withLaidRows(() => {
    const { before, after, events } = CHILL_MINUTE;
    const result = discover(
      { ...NOTHING, actions: ["craft"], items: ["splint"] },
      before,
      after,
      events,
    );
    assert.deepEqual(result?.revealed.trees ?? [], []);
  });
});
