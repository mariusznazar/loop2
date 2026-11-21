// What the browser remembers of a judging of a program, and what stands of it beside the list „Program:”
// (D-441, D-440, D-442): the record of a judging, the mark read from a record against the game state at hand,
// and when a record stands no more. The expectations come from D-441 (what a record holds and where it
// stands), D-440 (the mark and the note on the stock), D-442 (the content revision), D-190 (which deaths
// take a character's practice and ranks, whose generation number grows), D-123 (the rule the game writes at
// the first chill is a rule written into the listed program) and the invariant `simulation-inputs`. The data
// are written out by hand. The fingerprint of a content is checked against the relation D-442 gives, which
// the code of the fingerprint does not compute: a save raises the content revision of its program exactly where
// the content changed.
import assert from "node:assert/strict";
import { test } from "node:test";
import {
  advanceMinutes,
  createCharacter,
  newGame,
  send,
  settleDeath,
  withSaveTime,
} from "../../dist/browser/sim/game.js";
import {
  contentFingerprint,
  isContentFingerprint,
  markOfRecord,
  recordOfJudging,
} from "../../dist/browser/sim/judging-record.js";
import {
  advanceLoopRun,
  catchUp,
  endLoopRun,
  startLoop,
} from "../../dist/browser/sim/loop.js";
import {
  createProgram,
  deleteProgram,
  editProgram,
  renameProgram,
  saveCopyIntoProgram,
} from "../../dist/browser/sim/programs.js";
import { loadSavedGame, savedGame } from "../../dist/browser/sim/saved-game.js";
import { buyBranch } from "../../dist/browser/sim/skills.js";
import { programFromRules } from "./program-fixture.mjs";
import { newKnowingGame, withEdgeSolved } from "./understanding-fixture.mjs";

/** A real moment of the browser's clock, in ms. */
const T0 = 1_760_000_000_000;
/** One real minute in ms. */
const MIN = 60_000;
/**
 * The start at this real moment seeds a map run on which the empty program dies in game minute 243, of cold
 * (`tests/sim/catch-up.test.mjs`, `tests/sim/acceptance.test.mjs`).
 */
const S = 1_760_000_800_000;
/** One game minute from a death of cold: chilled, with health the next minute takes away. */
const DYING = { temperature: 30, satiety: 100, health: 0.1 };

const entry = (item, count) => ({ item, count });
const rule = (kind) => ({
  condition: { kind: "always" },
  action: { kind },
});
const ids = (characterId, programId, mapId) => ({
  characterId,
  programId,
  mapId,
});

/** `value` frozen all the way down: a write into any of it throws. */
function frozen(value) {
  if (value && typeof value === "object") {
    for (const child of Object.values(value)) frozen(child);
    Object.freeze(value);
  }
  return value;
}

/**
 * Whether `error` is the judging's own refusal, a plain `Error`, rather than a `TypeError` of code that
 * read past a missing map, character or program.
 */
const ownRefusal = (error) => error.constructor === Error;

/** The kinds of a judging that solved `solved` of the twelve seeds and died on the rest. */
const kindsOf = (solved) => [
  ...Array(solved).fill("solved"),
  ...Array(12 - solved).fill("death"),
];

/**
 * A knowing game with Ala (1) and Ola (2) in the team, two programs, Skraj lasu solved and the first
 * program holding `program`.
 */
function game(program = programFromRules()) {
  let state = createCharacter(newKnowingGame(), "Ala").state;
  state = createCharacter(state, "Ola").state;
  state = createProgram(state).state;
  state = editProgram(state, 1, program).state;
  return { ...state, solvedMaps: ["forestEdge"] };
}

/** `state` with the character `id` changed by `change`. */
function changing(state, id, change) {
  return {
    ...state,
    team: {
      ...state.team,
      characters: state.team.characters.map((character) =>
        character.id === id ? { ...character, ...change } : character,
      ),
    },
  };
}

/** `state` with one practice in each skill of the character `id`: the practice a death with no use left takes. */
function practised(state, id = 1) {
  const [character] = state.team.characters.filter(
    (listed) => listed.id === id,
  );
  return changing(state, id, {
    skills: Object.fromEntries(
      Object.entries(character.skills).map(([skill, held]) => [
        skill,
        { ...held, practice: held.practice + 1 },
      ]),
    ),
  });
}

/** `state` with all three uses of the resurrection spent, the next returning far after every moment below. */
const usedUp = (state) => ({
  ...state,
  team: {
    ...state.team,
    resurrectionUsesSpent: 3,
    resurrectionNextReturnAtMs: S + 10 ** 9,
  },
});

function twoGroups(names, rules = [rule("explore")]) {
  const groups = names.map((name, index) => ({
    id: index + 1,
    name,
    condition: { kind: "always" },
    rules: index === 0 ? rules.map((one, at) => ({ ...one, id: at + 1 })) : [],
  }));
  return {
    groups,
    tripPlan: { take: [], bring: [] },
    nextGroupId: 3,
    nextRuleId: rules.length + 1,
  };
}

/** Ala sent to Las from `state` and moved on until she dies; the death stands unsettled. */
function died(state) {
  const fallen = advanceMinutes(
    send(state, { mapId: "forest", characterId: 1 }, T0).state,
    1000,
  ).state;
  assert.ok(fallen.run.death, "precondition: the character died");
  return fallen;
}

/** `state` with the map run of the earning loop of Ala one game minute from a death of cold, passed to it and ended. */
function loopDied(state, nowMs = T0) {
  const started = startLoop(
    state,
    { mapId: "forest", characterId: 1 },
    S,
  ).state;
  const loop = started.loops[1];
  const dying = {
    ...started,
    loops: {
      ...started.loops,
      1: { ...loop, run: { ...loop.run, body: { ...DYING } } },
    },
  };
  const passed = advanceLoopRun(dying, 1, 1).state;
  assert.ok(passed.loops[1].run.death, "precondition: the character died");
  return endLoopRun(passed, 1, nowMs).state;
}

// ---------------------------------------------------------------------------------------------------
// The record of a judging and the mark read from it against the game state at hand (D-440, D-441, D-442)

/**
 * A record of a judging that solved `solved` seeds and took `equipment`, made for the first program of
 * `state` as it stands and for a character at generation 1, which is the generation of Ala and of Ola in
 * `game()` before any death.
 */
const recordAt = (state, solved, equipment = []) => ({
  results: kindsOf(solved),
  equipment,
  contentRevision: state.programs[0].contentRevision,
  contentFingerprint: contentFingerprint(state.programs[0].program),
  generation: 1,
});

/** The mark of `record` for the character, program and map given, against `state`. */
const markOf = (state, record, characterId = 1, programId = 1) =>
  markOfRecord(state, ids(characterId, programId, "forest"), record);

/** The mark of a record that solved `solved` seeds and has all its stock. */
const standing = (solved) => ({
  solved,
  allSolved: solved === 12,
  stockShort: false,
  badge: solved === 12,
});

/** A game with Ala and Ola at generation 1 and two programs. */
const plainGame = () => game();

test("the record of a judging holds the kind of each of the twelve results, the equipment, the content revision and the fingerprint of the content of its program, and the generation number of the game state the judging read", () => {
  // decision: D-441 "The browser keeps the judging each character, program and map last had (D-440) in its lasting storage (`localStorage`), one value under a key of its own for each such triple, the key naming the version of the stored form, the signed-in account by its identifier, the game by the moment it was made (D-04), the character, the program and the map, and the value holding the kind of each of the twelve results, the equipment the judging took, and the content revision of the program (D-442) and the generation number of the character in the game state the judging read."
  // decision: D-441 "The value holds besides a fingerprint of the content of the program it judged, a short text that is the same for two contents the content revision counts as no change (D-442) and another for every change it counts, but for a chance of a collision of at most one in 2^52."
  const judging = {
    results: [
      { kind: "solved" },
      { kind: "death", cause: "cold", minute: 243 },
      { kind: "undecided" },
      { kind: "death", cause: "combat", minute: 17 },
      { kind: "solved" },
      { kind: "death", cause: "hunger", minute: 900 },
      { kind: "undecided" },
      { kind: "solved" },
      { kind: "death", cause: "cold", minute: 1 },
      { kind: "undecided" },
      { kind: "solved" },
      { kind: "death", cause: "cold", minute: 4000 },
    ],
    equipment: [entry("berry", 4), entry("stick", 2)],
  };
  // Program 2 is made at revision 0 and saved twice with content that differs each time: revision 2.
  // Ola's generation is set to 3 by hand.
  let state = changing(plainGame(), 2, { generation: 3 });
  state = editProgram(state, 2, twoGroups(["Jeden", "Dwa"])).state;
  state = editProgram(state, 2, twoGroups(["Inna", "Dwa"])).state;
  assert.equal(state.programs[1].contentRevision, 2, "precondition");
  const record = recordOfJudging(
    frozen(state),
    ids(2, 2, "forest"),
    frozen(structuredClone(judging)),
  );
  assert.deepEqual(record, {
    results: [
      "solved",
      "death",
      "undecided",
      "death",
      "solved",
      "death",
      "undecided",
      "solved",
      "death",
      "undecided",
      "solved",
      "death",
    ],
    equipment: [entry("berry", 4), entry("stick", 2)],
    contentRevision: 2,
    contentFingerprint: contentFingerprint(state.programs[1].program),
    generation: 3,
  });
  // The fingerprint is that of the triple's program, program 2, and not of program 1, whose content differs.
  assert.notEqual(
    record.contentFingerprint,
    contentFingerprint(state.programs[0].program),
  );
  // The record shares nothing with the judging it was made from.
  const shared = recordOfJudging(state, ids(2, 2, "forest"), judging);
  judging.equipment[0].count = 99;
  assert.deepEqual(shared.equipment, [entry("berry", 4), entry("stick", 2)]);
});

test("the record of a judging is refused for a character the team lacks and for a program the list lacks", () => {
  // decision: D-441 "A remembered judging stands beside the list „Program:” only while its character is on the team at its generation number and its program is on the player's list at its content revision."
  const judging = { results: [], equipment: [] };
  const state = frozen(plainGame());
  for (const asked of [ids(99, 1, "forest"), ids(1, 99, "forest")])
    assert.throws(
      () => recordOfJudging(state, asked, judging),
      ownRefusal,
      JSON.stringify(asked),
    );
});

test("the mark is none where no record is given, and a record of the state at hand gives the count, the all twelve and the badge as before", () => {
  // decision: D-440 "Beside the list „Program:” of a character in „Kto idzie” stands the judging remembered for that character, the program the list shows and the map of the card: the badge „szczelny: 12 z 12” in `positive` where it solved all twelve seeds, and „{n} z 12” in `text` otherwise."
  const state = frozen(plainGame());
  assert.equal(markOf(state, null), null);
  assert.equal(markOf(state, undefined), null);
  assert.deepEqual(markOf(state, recordAt(state, 12)), standing(12));
  assert.deepEqual(markOf(state, recordAt(state, 11)), standing(11));
  assert.deepEqual(markOf(state, recordAt(state, 0)), standing(0));
  // Undecided seeds and deaths are alike unsolved.
  const mixed = {
    ...recordAt(state, 0),
    results: [
      ...Array(7).fill("solved"),
      ...Array(3).fill("undecided"),
      ...Array(2).fill("death"),
    ],
  };
  assert.equal(markOf(state, mixed).solved, 7);
  assert.equal(markOf(state, mixed).allSolved, false);
});

test("a record stands only where its character is on the team, its program is on the list and its results number the twelve seeds", () => {
  // decision: D-441 "A remembered judging stands beside the list „Program:” only while its character is on the team at its generation number and its program is on the player's list at its content revision."
  const state = frozen(plainGame());
  const record = recordAt(state, 12);
  assert.deepEqual(markOf(state, record), standing(12), "precondition");
  assert.equal(
    markOf(state, record, 99, 1),
    null,
    "a character the team lacks",
  );
  assert.equal(markOf(state, record, 1, 99), null, "a program the list lacks");
  const deleted = deleteProgram(state, 2).state;
  assert.deepEqual(markOf(deleted, record, 1, 1), standing(12));
  assert.equal(
    markOf(deleted, recordAt(state, 12), 1, 2),
    null,
    "program 2 deleted",
  );
  const first = deleteProgram(state, 1).state;
  assert.equal(markOf(first, record), null, "program 1 deleted");
  // A number of results other than the twelve seeds shows nothing, whichever way it differs.
  for (const count of [0, 1, 11, 13, 24])
    assert.equal(
      markOf(state, { ...record, results: Array(count).fill("solved") }),
      null,
      `${count} results`,
    );
});

test("a record whose program was saved with other content stands no more, a change back to the content judged included, and a rename leaves it", () => {
  // decision: D-440 "A judging so erased never stands again, since such a save raises the program's content revision (D-442) and such a death the character's generation number"
  // decision: D-442 "A rename, a save after which none of the three differs, though the counters that number new rules and groups may have changed, and every other act leave the content revision as it is, so it never goes down."
  const state = plainGame();
  const judged = state.programs[0].program;
  const record = recordAt(state, 12);
  assert.deepEqual(markOf(state, record), standing(12), "precondition");
  const other = editProgram(
    frozen(state),
    1,
    programFromRules(rule("wander")),
  ).state;
  assert.equal(markOf(other, record), null, "a rule changed");
  // A -> B -> A: the content is the judged one again, the record still stands no more.
  const back = editProgram(other, 1, judged).state;
  assert.deepEqual(back.programs[0].program, judged, "precondition");
  assert.equal(markOf(back, record), null, "changed back to what was judged");
  // The trip plan and the order of the groups count as content.
  const withTake = editProgram(state, 1, {
    ...judged,
    tripPlan: { take: [entry("berry", 2)], bring: [] },
  }).state;
  assert.equal(markOf(withTake, record), null, "a take list");
  const groups = editProgram(state, 1, twoGroups(["Jeden", "Dwa"])).state;
  const record2 = recordAt(groups, 12);
  assert.deepEqual(markOf(groups, record2), standing(12), "precondition");
  const swapped = editProgram(groups, 1, {
    ...groups.programs[0].program,
    groups: [...groups.programs[0].program.groups].reverse(),
  }).state;
  assert.equal(markOf(swapped, record2), null, "groups in another order");
  // A save that changes no content and a rename keep it; so does an edit of another program.
  assert.deepEqual(
    markOf(editProgram(state, 1, structuredClone(judged)).state, record),
    standing(12),
    "a save of the same content",
  );
  assert.deepEqual(
    markOf(renameProgram(state, 1, "Inna nazwa").state, record),
    standing(12),
    "a rename",
  );
  assert.deepEqual(
    markOf(editProgram(state, 2, twoGroups(["Trzy"])).state, record),
    standing(12),
    "an edit of program 2",
  );
  // A record of a revision above the program's, such as one of a save that never reached the server, shows nothing too.
  assert.equal(
    markOf(state, { ...record, contentRevision: record.contentRevision + 1 }),
    null,
    "a revision above",
  );
});

/** `value` with the keys of every object in it written in the opposite order: the same data, made another way. */
function keysReversed(value) {
  if (Array.isArray(value)) return value.map(keysReversed);
  if (value && typeof value === "object")
    return Object.fromEntries(
      Object.entries(value)
        .reverse()
        .map(([key, held]) => [key, keysReversed(held)]),
    );
  return value;
}

const ALWAYS = { kind: "always" };
const content = (groups, tripPlan, counters = {}) => ({
  tripPlan,
  groups,
  nextGroupId: 3,
  nextRuleId: 4,
  ...counters,
});
const grouped = (id, name, condition, rules) => ({
  id,
  name,
  condition,
  rules,
});
const ruled = (id, condition, kind) => ({ id, condition, action: { kind } });
const PLAN = { take: [entry("stick", 2), entry("berry", 1)], bring: [] };
const FIRST = grouped(1, "Najpierw", { kind: "healthBelow", value: 8 }, [
  ruled(1, ALWAYS, "explore"),
  ruled(2, ALWAYS, "wander"),
]);
const SECOND = grouped(2, "Potem", ALWAYS, [ruled(3, ALWAYS, "eat")]);
/** The content every change below is made from: two groups of two rules and one, and a trip plan of two takes. */
const FINGERPRINTED = content([FIRST, SECOND], PLAN);

/** What a save of each content into the program that holds `FINGERPRINTED` does to its content revision (D-442). */
const SAVES = [
  [
    "a rule's action changed",
    content(
      [{ ...FIRST, rules: [ruled(1, ALWAYS, "kick"), FIRST.rules[1]] }, SECOND],
      PLAN,
    ),
    true,
  ],
  [
    "a rule's condition changed",
    content(
      [
        {
          ...FIRST,
          rules: [
            ruled(1, { kind: "healthBelow", value: 50 }, "explore"),
            FIRST.rules[1],
          ],
        },
        SECOND,
      ],
      PLAN,
    ),
    true,
  ],
  [
    "a rule added",
    content(
      [{ ...FIRST, rules: [...FIRST.rules, ruled(4, ALWAYS, "kick")] }, SECOND],
      PLAN,
      { nextRuleId: 5 },
    ),
    true,
  ],
  [
    "a rule removed",
    content([{ ...FIRST, rules: [FIRST.rules[0]] }, SECOND], PLAN),
    true,
  ],
  [
    "two rules swapped",
    content(
      [{ ...FIRST, rules: [FIRST.rules[1], FIRST.rules[0]] }, SECOND],
      PLAN,
    ),
    true,
  ],
  [
    "a rule moved to another group",
    content(
      [
        { ...FIRST, rules: [FIRST.rules[0]] },
        { ...SECOND, rules: [FIRST.rules[1], ...SECOND.rules] },
      ],
      PLAN,
    ),
    true,
  ],
  [
    "the identity of a rule changed",
    content(
      [
        { ...FIRST, rules: [ruled(9, ALWAYS, "explore"), FIRST.rules[1]] },
        SECOND,
      ],
      PLAN,
      { nextRuleId: 10 },
    ),
    true,
  ],
  ["two groups swapped", content([SECOND, FIRST], PLAN), true],
  [
    "a group's condition changed",
    content(
      [{ ...FIRST, condition: { kind: "healthBelow", value: 94 } }, SECOND],
      PLAN,
    ),
    true,
  ],
  [
    "a group renamed",
    content([{ ...FIRST, name: "Inaczej" }, SECOND], PLAN),
    true,
  ],
  [
    "the take list changed",
    content([FIRST, SECOND], {
      ...PLAN,
      take: [entry("stick", 3), entry("berry", 1)],
    }),
    true,
  ],
  [
    "the take list in another order",
    content([FIRST, SECOND], { ...PLAN, take: [...PLAN.take].reverse() }),
    true,
  ],
  [
    "the bring list changed",
    content([FIRST, SECOND], { ...PLAN, bring: [entry("stick", 1)] }),
    true,
  ],
  ["the content saved again", structuredClone(FINGERPRINTED), false],
  [
    "the content with the identity counters alone changed",
    content([FIRST, SECOND], PLAN, { nextGroupId: 9, nextRuleId: 12 }),
    false,
  ],
];

test("the fingerprint of a content differs exactly where a save of it raises the content revision of its program", () => {
  // decision: D-442 "Each program of the player's list carries a content revision, a whole number kept with its number, its name and its content: 0 when the program is made — the first program of a new game, a program created, a copy saved as a new program and a program pulled from a previous save (D-401) — and one higher at each save into the program after which its rules, its rule groups with their order or its trip plan differ from what they were, the rule the game writes at the first chill (D-123) included."
  // decision: D-441 "The value holds besides a fingerprint of the content of the program it judged, a short text that is the same for two contents the content revision counts as no change (D-442) and another for every change it counts, but for a chance of a collision of at most one in 2^52."
  const state = editProgram(game(), 1, FINGERPRINTED).state;
  const before = state.programs[0];
  assert.equal(
    before.contentRevision,
    1,
    "precondition: the content was saved",
  );
  for (const [name, saved, raises] of SAVES) {
    const after = editProgram(state, 1, saved).state.programs[0];
    // The relation of D-442, read from the save: the revision rises where the content changed.
    assert.equal(
      after.contentRevision > before.contentRevision,
      raises,
      `precondition: ${name}`,
    );
    assert.equal(
      contentFingerprint(after.program) !== contentFingerprint(before.program),
      raises,
      name,
    );
  }
  // A copy saved into its program with the keys of its objects made in another order, which the editor's
  // save puts in order and the copy's save does not: the revision stays and so does the fingerprint.
  const running = send(
    state,
    { mapId: "forest", characterId: 1, programId: 1 },
    T0,
  ).state;
  for (const reordered of [
    keysReversed(FINGERPRINTED),
    keysReversed({ ...FINGERPRINTED, nextGroupId: 9, nextRuleId: 12 }),
  ]) {
    const copySaved = saveCopyIntoProgram({
      ...running,
      run: {
        ...running.run,
        copy: { ...running.run.copy, program: reordered, base: SAVES[3][1] },
      },
    }).state.programs[0];
    assert.notEqual(
      Object.keys(copySaved.program)[0],
      Object.keys(before.program)[0],
      "precondition: the keys stand in another order",
    );
    assert.equal(
      copySaved.contentRevision,
      before.contentRevision,
      "precondition: the revision is left as it was",
    );
    assert.equal(
      contentFingerprint(copySaved.program),
      contentFingerprint(before.program),
    );
  }
  // The rule the game writes at the first chill, the case that the save of the player does not make.
  const calm = advanceMinutes(
    send(
      createCharacter(withEdgeSolved(newGame()), "Ala").state,
      { mapId: "forest", characterId: 1 },
      T0,
    ).state,
    83,
  ).state;
  const chilled = advanceMinutes(calm, 1).state;
  assert.equal(
    chilled.programs[0].contentRevision,
    calm.programs[0].contentRevision + 1,
    "precondition: the first chill raised the revision",
  );
  assert.notEqual(
    contentFingerprint(chilled.programs[0].program),
    contentFingerprint(calm.programs[0].program),
  );
  // A change and the change back give the content judged again, whose fingerprint is the first one.
  const other = editProgram(state, 1, SAVES[0][1]).state;
  const back = editProgram(other, 1, structuredClone(FINGERPRINTED)).state;
  assert.equal(back.programs[0].contentRevision, 3, "precondition");
  assert.equal(
    contentFingerprint(back.programs[0].program),
    contentFingerprint(before.program),
  );
});

test("five thousand contents that differ in a number, in the order of their rules or in a trip plan have each a fingerprint of its own", () => {
  // decision: D-441 "The value holds besides a fingerprint of the content of the program it judged, a short text that is the same for two contents the content revision counts as no change (D-442) and another for every change it counts, but for a chance of a collision of at most one in 2^52."
  // Each content below differs from every other in a number, in the order of rules that differ, or in a count of a trip plan.
  const contents = [];
  for (let value = 0; value < 4000; value += 1)
    contents.push(
      content(
        [
          grouped(1, "Program", ALWAYS, [
            {
              id: 1,
              condition: { kind: "healthBelow", value },
              action: { kind: "eat" },
            },
          ]),
        ],
        { take: [], bring: [] },
      ),
    );
  const kinds = ["explore", "wander", "eat", "kick", "dodge", "patrol"];
  const orders = (rest) =>
    rest.length <= 1
      ? [rest]
      : rest.flatMap((kind, at) =>
          orders([...rest.slice(0, at), ...rest.slice(at + 1)]).map((tail) => [
            kind,
            ...tail,
          ]),
        );
  for (const order of orders(kinds))
    contents.push(
      content(
        [
          grouped(
            1,
            "Program",
            ALWAYS,
            order.map((kind, at) => ruled(at + 1, ALWAYS, kind)),
          ),
        ],
        { take: [], bring: [] },
      ),
    );
  for (let count = 1; count <= 500; count += 1)
    contents.push(
      content([grouped(1, "Program", ALWAYS, [])], {
        take: [entry("stick", count)],
        bring: [],
      }),
    );
  assert.equal(
    contents.length,
    4000 + 720 + 500,
    "precondition: 5220 contents",
  );
  const fingerprints = new Set(contents.map((one) => contentFingerprint(one)));
  assert.equal(fingerprints.size, contents.length);
});

test("the fingerprint is sixteen lower-case hexadecimal digits, the same at each call, and leaves the content it was given as it was", () => {
  // decision: D-441 "The value holds besides a fingerprint of the content of the program it judged, a short text that is the same for two contents the content revision counts as no change (D-442) and another for every change it counts, but for a chance of a collision of at most one in 2^52."
  const given = frozen(structuredClone(FINGERPRINTED));
  const first = contentFingerprint(given);
  assert.match(first, /^[0-9a-f]{16}$/);
  assert.equal(contentFingerprint(given), first);
  assert.deepEqual(given, FINGERPRINTED);
  assert.equal(isContentFingerprint(first), true);
  assert.equal(isContentFingerprint("0123456789abcdef"), true);
  for (const refused of [
    "",
    "0123456789abcde",
    "0123456789abcdef0",
    "0123456789ABCDEF",
    "0123456789abcdeg",
    " 0123456789abcde",
    "0123456789abcde\n",
    "0123456789abcdef".repeat(1000),
    1234567890123456,
    null,
    undefined,
    ["0123456789abcdef"],
    { toString: () => "0123456789abcdef" },
  ])
    assert.equal(isContentFingerprint(refused), false, String(refused));
});

test("two contents whose group names, put together without their quotes, read as the same text have each a fingerprint of its own", () => {
  // decision: D-441 "The value holds besides a fingerprint of the content of the program it judged, a short text that is the same for two contents the content revision counts as no change (D-442) and another for every change it counts, but for a chance of a collision of at most one in 2^52."
  // One group whose name holds the end of a group and the start of the next, and the two groups it reads as
  // when the quotes of the names are left out: the same text of the groups, a different content.
  const asOne = content(
    [
      grouped(
        1,
        'x,"rules":[]},{"condition":{"kind":always},"id":2,"name":y',
        ALWAYS,
        [],
      ),
    ],
    { take: [], bring: [] },
  );
  const asTwo = content(
    [grouped(1, "x", ALWAYS, []), grouped(2, "y", ALWAYS, [])],
    { take: [], bring: [] },
  );
  assert.notEqual(contentFingerprint(asOne), contentFingerprint(asTwo));
});

test("the fingerprint of every content is its whole sixteen digits, one whose two words start with a zero included", () => {
  // decision: D-441 "The value holds besides a fingerprint of the content of the program it judged, a short text that is the same for two contents the content revision counts as no change (D-442) and another for every change it counts, but for a chance of a collision of at most one in 2^52."
  const fingerprints = [];
  for (let value = 0; value < 4000; value += 1)
    fingerprints.push(
      contentFingerprint(
        content(
          [
            grouped(1, "Program", ALWAYS, [
              ruled(1, { kind: "healthBelow", value }, "eat"),
            ]),
          ],
          { take: [], bring: [] },
        ),
      ),
    );
  // About one fingerprint in sixteen starts with a zero in each of its two words of eight digits.
  assert.ok(
    fingerprints.some((one) => one.startsWith("0")),
    "precondition: a fingerprint whose first word starts with a zero",
  );
  assert.ok(
    fingerprints.some((one) => one[8] === "0"),
    "precondition: a fingerprint whose second word starts with a zero",
  );
  for (const one of fingerprints) assert.match(one, /^[0-9a-f]{16}$/);
});

test("a record made at a content revision stands beside the content it judged and not beside another content that reached the same revision after a change that was lost", () => {
  // decision: D-441 "A remembered judging stands there too only while the fingerprint of the content the program holds equals the one stored, so two different contents share a judging only through such a collision, and a value whose fingerprint is no text of the form of a fingerprint is a value of another form."
  const base = game();
  const judged = editProgram(base, 1, programFromRules(rule("explore"))).state;
  // The save that made another content was lost, and the same edit made again gave another content: the same count.
  const lost = editProgram(base, 1, programFromRules(rule("wander"))).state;
  assert.equal(
    judged.programs[0].contentRevision,
    lost.programs[0].contentRevision,
    "precondition: the two contents stand at one content revision",
  );
  const record = recordOfJudging(frozen(judged), ids(1, 1, "forest"), {
    results: kindsOf(12).map((kind) => ({ kind })),
    equipment: [],
  });
  assert.deepEqual(markOf(judged, record), standing(12));
  assert.equal(
    markOf(lost, record),
    null,
    "another content at the same revision",
  );
  // The same content saved by another path stands.
  const again = editProgram(
    base,
    1,
    structuredClone(programFromRules(rule("explore"))),
  ).state;
  assert.deepEqual(
    markOf(again, record),
    standing(12),
    "the same content again",
  );
  // A record whose fingerprint is not that of the content at hand shows nothing, whatever it is instead.
  for (const fingerprint of [
    "0000000000000000",
    contentFingerprint(lost.programs[0].program),
    "",
    undefined,
    null,
  ])
    assert.equal(
      markOf(judged, { ...record, contentFingerprint: fingerprint }),
      null,
      String(fingerprint),
    );
});

test("the rule the game writes at the first chill into the listed program takes the record of that program out of standing", () => {
  // decision: D-123 "A program rule the game writes at a discovery goes into the first rule group of the copy the map run carries out and into the first rule group of the program the copy belongs to"
  // decision: D-442 "Each program of the player's list carries a content revision, a whole number kept with its number, its name and its content: 0 when the program is made — the first program of a new game, a program created, a copy saved as a new program and a program pulled from a previous save (D-401) — and one higher at each save into the program after which its rules, its rule groups with their order or its trip plan differ from what they were, the rule the game writes at the first chill (D-123) included."
  // A new game holds one empty group; its first chill is game minute 84 (`tests/sim/discovery.test.mjs`).
  let state = withEdgeSolved(newGame());
  state = createCharacter(state, "Ala").state;
  state = send(state, { mapId: "forest", characterId: 1 }, T0).state;
  const record = recordAt(state, 12);
  const before = advanceMinutes(state, 83).state;
  assert.deepEqual(markOf(before, record), standing(12));
  const chilled = advanceMinutes(before, 1).state;
  assert.equal(chilled.programs[0].program.groups[0].rules.length, 1);
  assert.equal(markOf(chilled, record), null);
});

test("a record whose character died with its practice and ranks taken stands no more, in a manual map run, in an earning loop and in the catch-up, and another character's record stands", () => {
  // decision: D-190 "A character's death takes what it carried and pays nothing of its map run; when the resurrection has no use left, it also takes all the character's practice, the practice gathered at its earning loop included, and every rank of branch it bought, and the character's generation number grows by one"
  // decision: D-441 "A remembered judging stands beside the list „Program:” only while its character is on the team at its generation number and its program is on the player's list at its content revision."
  const base = usedUp(practised(plainGame()));
  const record = recordAt(base, 12);
  assert.deepEqual(markOf(base, record), standing(12), "precondition");
  const check = (lost, what) => {
    assert.equal(lost.team.characters[0].generation, 2, `${what}: Ala is at 2`);
    assert.equal(markOf(lost, record), null, what);
    assert.deepEqual(
      markOf(lost, recordAt(lost, 12), 2, 1),
      standing(12),
      `${what}: Ola's record stands`,
    );
  };
  const manual = settleDeath(died(base), T0).state;
  assert.equal(manual.run.deathSettlement.kind, "progressLost");
  check(manual, "a manual map run");
  const looped = loopDied({ ...base, solvedMaps: ["forestEdge", "forest"] });
  assert.equal(looped.loops[1], undefined, "the earning loop stopped");
  check(looped, "an earning loop");
  const reading = S + 300 * MIN + 17_000;
  const caught = catchUp(
    withSaveTime(
      startLoop(
        { ...base, solvedMaps: ["forestEdge", "forest"] },
        { mapId: "forest", characterId: 1 },
        S,
      ).state,
      S,
    ),
    reading,
  ).state;
  check(caught, "the catch-up");
});

test("a record stands after a death a use of the resurrection covers, after one of a character with no practice and after the purchase of a rank", () => {
  // decision: D-190 "The death of a character with practice uses up one use while any is left, and a death of a character with practice with none left stops its earning loop"
  // decision: D-440 "A judging so erased never stands again, since such a save raises the program's content revision (D-442) and such a death the character's generation number"
  const stands = (state, record, what) =>
    assert.deepEqual(markOf(state, record), standing(12), what);
  const practisedGame = practised(plainGame());
  const covered = settleDeath(died(practisedGame), T0).state;
  assert.equal(covered.run.deathSettlement.kind, "resurrectionUsed");
  stands(covered, recordAt(practisedGame, 12), "a covered death");
  const bareGame = usedUp(plainGame());
  const bare = settleDeath(died(bareGame), T0).state;
  assert.equal(bare.run.deathSettlement.kind, "noPractice");
  stands(bare, recordAt(bareGame, 12), "a death with no practice");
  // The earning loop's death that the resurrection covers leaves the generation too.
  const base = (state) => ({ ...state, solvedMaps: ["forestEdge", "forest"] });
  const coveredLoop = loopDied(base(practisedGame));
  assert.equal(coveredLoop.team.resurrectionUsesSpent, 1);
  stands(coveredLoop, recordAt(practisedGame, 12), "a covered death of a loop");
  // „Obchód” bought out of 160 practice in gathering small items.
  const rich = changing(plainGame(), 1, {
    skills: {
      ...plainGame().team.characters[0].skills,
      smallItemGathering: { practice: 160, ranks: {} },
      eating: { practice: 20, ranks: {} },
    },
  });
  const bought = buyBranch(rich, 1, "patrol").state;
  assert.notDeepEqual(
    bought.team,
    rich.team,
    "precondition: a rank was bought",
  );
  stands(bought, recordAt(rich, 12), "a bought rank");
  // A record of a generation other than the character's, below or above, shows nothing.
  const lost = settleDeath(died(usedUp(practised(plainGame()))), T0).state;
  assert.equal(
    markOf(lost, { ...recordAt(lost, 12), generation: 3 }),
    null,
    "a generation above",
  );
  assert.deepEqual(
    markOf(lost, { ...recordAt(lost, 12), generation: 2 }),
    standing(12),
    "the generation the death gave",
  );
});

test("where the chest holds less of an item than the record took the badge goes out and the count stays, and where it holds more the mark stands as it was", () => {
  // decision: D-440 "Where the chest holds less of an item than the judging took, the result stays with „oceniono z zapasem, którego dziś nie ma w skrzynce” beside it and the badge goes out, „12 z 12” standing in its place."
  const state = plainGame();
  const withChest = (pieces) => ({
    ...state,
    team: { ...state.team, chest: { pieces } },
  });
  const taken = [entry("berry", 4), entry("stick", 2)];
  const at = (solved, pieces) =>
    markOf(frozen(withChest(pieces)), recordAt(state, solved, taken));
  // Exactly what the judging took, and more of each.
  for (const pieces of [
    { berry: 4, stick: 2 },
    { berry: 40, stick: 2 },
    { berry: 4, stick: 9, moss: 1 },
  ])
    assert.deepEqual(at(12, pieces), standing(12), JSON.stringify(pieces));
  // One item below the count, whichever it is, an item the chest lacks altogether and an empty chest.
  for (const pieces of [
    { berry: 3, stick: 2 },
    { berry: 4, stick: 1 },
    { berry: 4 },
    { stick: 2 },
    {},
  ])
    assert.deepEqual(
      at(12, pieces),
      { solved: 12, allSolved: true, stockShort: true, badge: false },
      JSON.stringify(pieces),
    );
  // The count and the note stand at a result below twelve too.
  assert.deepEqual(at(11, { berry: 3, stick: 2 }), {
    solved: 11,
    allSolved: false,
    stockShort: true,
    badge: false,
  });
  // A judging that took nothing is never short.
  assert.equal(markOf(withChest({}), recordAt(state, 12)).badge, true);
});

test("the saved game holds no judging: a game's own save loads back into the same state, and a document with a `judgings` key, however it is filled, is refused as shape and throws nothing", () => {
  // decision: D-213 "Saved-game code turns a game state into the saved document of the current version of its shape, and an unknown value — a saved game state downloaded from the server or the unsaved game state kept in the page's memory (D-211) — into a game state or a refusal naming why, inside the simulation, no value a document can hold making it throw, and changing nothing passed to it"
  const state = withSaveTime(plainGame(), S);
  const document = JSON.parse(JSON.stringify(savedGame(state)));
  assert.equal(Object.hasOwn(document.game, "judgings"), false);
  assert.deepEqual(loadSavedGame(structuredClone(document)), {
    ok: true,
    state,
  });
  const filled = {
    1: {
      1: {
        forest: {
          results: Array(12).fill("solved"),
          equipment: [entry("berry", 4)],
        },
      },
    },
  };
  for (const [what, judgings] of [
    ["an empty record", {}],
    ["a filled one", filled],
    ["null", null],
    ["a list", []],
    ["a number", 7],
    ["a hostile key", JSON.parse('{"__proto__": {"1": {}}}')],
  ]) {
    const crafted = structuredClone(document);
    crafted.game.judgings = judgings;
    assert.deepEqual(
      loadSavedGame(crafted),
      { ok: false, reason: "shape" },
      what,
    );
  }
});
