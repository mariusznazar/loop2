// What the browser remembers of a judging of a program, and what stands of it beside the list „Program:”
// (D-441, D-440, D-442): the record of a judging, the mark read from a record against the game state at hand,
// and when a record stands no more. The expectations come from D-441 (what a record holds and where it
// stands), D-440 (the mark and the note on the stock), D-442 (the content revision), D-190 (which deaths
// take a character's practice and ranks, whose generation number grows), D-123 (the rule the game writes at
// the first chill is a rule written into the listed program) and the invariant `simulation-inputs`. The data
// are written out by hand.
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

test("the record of a judging holds the kind of each of the twelve results, the equipment, and the content revision and the generation number of the game state the judging read", () => {
  // decision: D-441 "The browser keeps the judging each character, program and map last had (D-440) in its lasting storage (`localStorage`), one value under a key of its own for each such triple, the key naming the version of the stored form, the signed-in account by its identifier, the game by the moment it was made (D-04), the character, the program and the map, and the value holding the kind of each of the twelve results, the equipment the judging took, and the content revision of the program (D-442) and the generation number of the character in the game state the judging read."
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
    generation: 3,
  });
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
