// The team's one resurrection and when its uses return, and how a death and a first completion of a map
// are settled, once, on the browser's clock. The expectations come from D-190 (what a death takes,
// the resurrection shared by the team, its three uses returning one at a time, the death of a character
// with no practice, the return at a first solving), D-219 (whose clock counts the return), D-220 (a new
// game's resurrection is full from the start), D-221 (when a death is settled), D-386 (which moments the
// game state holds) and the invariants `resurrection-renewal` (a moment equal to the moment of a return
// counts as returned) and `death-settled-once`.
import assert from "node:assert/strict";
import { test } from "node:test";
import {
  advanceMinutes,
  createCharacter,
  end,
  newGame,
  passRealTime,
  restart,
  resurrectionAt,
  resurrectionHasUse,
  send,
  setPace,
  setProgram,
  settleDeath,
  withSaveTime,
} from "../../dist/browser/sim/game.js";
import { loadSavedGame, savedGame } from "../../dist/browser/sim/saved-game.js";
import { branchRank, buyBranch } from "../../dist/browser/sim/skills.js";
import { programFromRules } from "./program-fixture.mjs";
import { newKnowingGame, withEdgeSolved } from "./understanding-fixture.mjs";

/** A real moment of the browser's clock, in ms. */
const T0 = 1_760_000_000_000;
/** The return of one use of the resurrection, 240 real minutes (D-190: four hours to start), in ms: 240 × 60 000. */
const RENEWAL_MS = 14_400_000;
/** The character sent, the first a game creates, to Las. */
const SENT = { mapId: "forest", characterId: 1 };
/** Far more game minutes than a character lives on a program that neither eats nor warms itself. */
const LONGER_THAN_A_LIFE = 1000;
const ALWAYS = { kind: "always" };

/** Ala, with „Obchód” bought out of the practice below, and Ola behind her in the team. */
function team() {
  let state = createCharacter(withEdgeSolved(newKnowingGame()), "Ala").state;
  state = createCharacter(state, "Ola").state;
  const [ala, ola] = state.team.characters;
  const skills = {
    ...ala.skills,
    smallItemGathering: { practice: 160, ranks: {} },
    eating: { practice: 20, ranks: {} },
  };
  state = {
    ...state,
    team: {
      characters: [{ ...ala, skills }, ola],
      chest: { pieces: { stick: 5, berry: 2 } },
      resurrectionUsesSpent: 0,
      resurrectionNextReturnAtMs: null,
    },
  };
  return buyBranch(state, 1, "patrol").state;
}

/** `state` with the team's resurrection holding `spent` used uses, the next one returning at `nextMs`. */
function withResurrection(state, spent, nextMs) {
  return {
    ...state,
    team: {
      ...state.team,
      resurrectionUsesSpent: spent,
      resurrectionNextReturnAtMs: nextMs,
    },
  };
}

/** `state` with the team's resurrection used up, its one use returning at the real moment `returnMs`. */
const usedUp = (state, returnMs) => withResurrection(state, 3, returnMs);

/** Ala sent from `state` and moved on until she dies; the death stands unsettled. */
function died(state, realMs = T0) {
  const fallen = advanceMinutes(
    send(state, SENT, realMs).state,
    LONGER_THAN_A_LIFE,
  );
  assert.ok(fallen.state.run.death, "precondition: the character died");
  return fallen.state;
}

const ala = (state) => state.team.characters[0];

/** A team whose resurrection is used up, its one use returning at `returnMs`, set by hand. */
function usedUpTeam(returnMs) {
  return usedUp(createCharacter(newGame(), "Ala").state, returnMs).team;
}

// invariant: resurrection-renewal
test("a resurrection is not ready before its moment, is ready at it and stays ready after it", () => {
  const character = usedUpTeam(1_760_000_000_000);
  assert.equal(resurrectionHasUse(character, 1_759_999_999_999), false);
  assert.equal(resurrectionHasUse(character, 1_760_000_000_000), true);
  assert.equal(resurrectionHasUse(character, 1_760_000_000_001), true);
});

// invariant: resurrection-renewal
test("a spent use whose moment of return lies below zero has returned at every moment from zero on", () => {
  const character = usedUpTeam(-5);
  assert.equal(resurrectionHasUse(character, 0), true);
  assert.equal(resurrectionHasUse(character, -5), true);
  assert.equal(resurrectionHasUse(character, -6), false);
});

test("a new game's resurrection is full from the start, at the first moment there is, and a created character brings none of its own", () => {
  // decision: D-220 "A new character has generation number 1 and brings no resurrection of its own; a new game has the account's resurrection with its full number of uses"
  const { team } = createCharacter(newGame(), "Ala").state;
  assert.equal(team.resurrectionUsesSpent, 0);
  assert.equal(team.resurrectionNextReturnAtMs, null);
  assert.equal(resurrectionHasUse(team, 0), true);
  assert.equal(resurrectionHasUse(team, 1_760_000_000_000), true);
  assert.equal(
    Object.hasOwn(team.characters[0], "resurrectionUsesSpent"),
    false,
  );
});

// D-190, D-220: a character created while the resurrection is used up does not bring a ready one.
test("a character created while the team's resurrection is used up does not make it ready", () => {
  // decision: D-190 "The account has one resurrection, shared by all its characters, held as numbers of the account, no item of any backpack, equipment or chest: a number of uses and the span of real time after which one used use returns, both set in the balance data, 3 uses and 4 hours to start."
  // decision: D-220 "A new character has generation number 1 and brings no resurrection of its own; a new game has the account's resurrection with its full number of uses"
  const used = usedUp(team(), T0 + 1);
  const added = createCharacter(used, "Ula").state;
  assert.equal(added.team.resurrectionUsesSpent, 3);
  assert.equal(added.team.resurrectionNextReturnAtMs, T0 + 1);
  assert.equal(resurrectionHasUse(added.team, T0), false);
});

test("a new character is of generation 1, and a created second one too", () => {
  // decision: D-220 "A new character has generation number 1 and brings no resurrection of its own; a new game has the account's resurrection with its full number of uses"
  const first = createCharacter(newGame(), "Ala").state;
  const both = createCharacter(first, "Ola").state;
  assert.deepEqual(
    both.team.characters.map((character) => character.generation),
    [1, 1],
  );
});

// invariant: resurrection-renewal
// D-190: the skills and the generation stay, the one use is spent and its return set 4 hours on.
test("a death with a use left uses one up: one more is out and the next back 4 hours after the death, and practice, ranks and generation stay", () => {
  // decision: D-190 "A character's death takes what it carried and pays nothing of its map run; when the resurrection has no use left, it also takes all the character's practice"
  // decision: D-190 "The death of a character with practice uses up one use while any is left, and a death of a character with practice with none left stops its earning loop"
  // decision: D-190 "The used uses return one at a time on one clock: a death that uses up a use of a full stock starts the clock"
  const state = died(team());
  const before = ala(state);
  const settled = settleDeath(state, T0).state;
  assert.equal(settled.team.resurrectionUsesSpent, 1);
  assert.equal(settled.team.resurrectionNextReturnAtMs, T0 + RENEWAL_MS);
  assert.deepEqual(ala(settled).skills, before.skills);
  assert.equal(branchRank(ala(settled).skills, "patrol"), 1);
  assert.equal(ala(settled).generation, 1);
  assert.deepEqual(settled.run.deathSettlement, {
    kind: "resurrectionUsed",
    usesSpent: 1,
  });
});

// invariant: resurrection-renewal
// D-190: the moment stays, the generation grows, the skills go.
test("a death with no use left takes all practice and ranks, the generation grows by one and the moment stays", () => {
  // decision: D-190 "A character's death takes what it carried and pays nothing of its map run; when the resurrection has no use left, it also takes all the character's practice"
  const state = died(usedUp(team(), T0 + 1));
  const before = ala(state);
  const settled = settleDeath(state, T0).state;
  const skills = ala(settled).skills;
  assert.equal(settled.team.resurrectionUsesSpent, 3);
  assert.equal(settled.team.resurrectionNextReturnAtMs, T0 + 1);
  assert.equal(ala(settled).generation, 2);
  assert.equal(skills.smallItemGathering.practice, 0);
  assert.equal(skills.eating.practice, 0);
  assert.equal(branchRank(skills, "patrol"), 0);
  // Every skill of the archetype stands, at nothing: the new character's skills, not fewer of them.
  assert.deepEqual(
    Object.keys(skills).sort(),
    Object.keys(before.skills).sort(),
  );
  assert.deepEqual(settled.run.deathSettlement, {
    kind: "progressLost",
    generation: 2,
  });
});

// D-190, D-216: the settlement holds the number this death gave, not always the second.
test("the settlement of a later death with no use left holds the number that death gave", () => {
  // decision: D-190 "A character's death takes what it carried and pays nothing of its map run; when the resurrection has no use left, it also takes all the character's practice"
  const state = died(usedUp(team(), T0 + 1));
  const [first, ...others] = state.team.characters;
  const fourth = {
    ...state,
    team: {
      ...state.team,
      characters: [{ ...first, generation: 4 }, ...others],
    },
  };
  const settled = settleDeath(fourth, T0).state;
  assert.equal(ala(settled).generation, 5);
  assert.deepEqual(settled.run.deathSettlement, {
    kind: "progressLost",
    generation: 5,
  });
});

// D-190: the character stays the same character.
test("a death that takes everything leaves the name, the archetype, the place in the team and the character behind it", () => {
  // decision: D-190 "A character's death takes what it carried and pays nothing of its map run; when the resurrection has no use left, it also takes all the character's practice"
  const state = died(usedUp(team(), T0 + 1));
  const before = state.team.characters;
  const after = settleDeath(state, T0).state.team.characters;
  assert.deepEqual(
    after.map((character) => character.name),
    ["Ala", "Ola"],
  );
  assert.equal(after[0].id, before[0].id);
  assert.equal(after[0].archetypeId, before[0].archetypeId);
  assert.deepEqual(after[0].traits, before[0].traits);
  assert.deepEqual(after[1], before[1]);
});

// invariant: resurrection-renewal
test("a death at the very moment a use returns uses it, and a death a millisecond before takes everything", () => {
  const at = settleDeath(died(usedUp(team(), T0)), T0).state;
  assert.equal(at.run.deathSettlement.kind, "resurrectionUsed");
  const before = settleDeath(died(usedUp(team(), T0)), T0 - 1).state;
  assert.equal(before.run.deathSettlement.kind, "progressLost");
});

// invariant: resurrection-renewal
// D-219: the moment follows the clock, so the pace plays no part.
test("the return does not depend on the pace of the map run", () => {
  // decision: D-219 "The browser's clock counts the renewal of a resurrection, so the renewal runs in real time at every pace of a map run and while the game is closed"
  const fast = died(setPace(team(), 16).state);
  assert.equal(
    settleDeath(fast, T0).state.team.resurrectionNextReturnAtMs,
    T0 + RENEWAL_MS,
  );
});

// invariant: resurrection-renewal
// D-219: the return runs while the game is closed, as the state holds a moment, not a countdown.
test("a used use is back at its moment after a save and a load, and the next death goes by it", () => {
  // decision: D-219 "The browser's clock counts the renewal of a resurrection, so the renewal runs in real time at every pace of a map run and while the game is closed"
  // decision: D-386 "The load of a saved game state admits every game state the game's own functions make, so the game never writes a saved game state that its own load discards"
  // The three uses are spent by three deaths the game settles, the first at T0 and the next two 100
  // and 200 real minutes after it, so the clock runs from the first death.
  let stocked = team();
  for (const minutes of [0, 100, 200]) {
    const at = T0 + minutes * 60_000;
    stocked = end(settleDeath(died(stocked, at), at).state).state;
  }
  assert.equal(
    stocked.team.resurrectionUsesSpent,
    3,
    "precondition: the stock is used up",
  );
  assert.equal(
    stocked.team.resurrectionNextReturnAtMs,
    T0 + RENEWAL_MS,
    "precondition: the clock runs from the first death",
  );
  // D-248: a saved document carries the moment of its save, so the state is stamped first.
  const loaded = loadSavedGame(
    savedGame(withSaveTime(stocked, T0 + 200 * 60_000)),
  );
  assert.equal(loaded.ok, true);
  const back = loaded.state;
  assert.deepEqual(resurrectionAt(back.team, T0 + RENEWAL_MS - 1), {
    usesLeft: 0,
    nextReturnMs: T0 + RENEWAL_MS,
  });
  assert.deepEqual(resurrectionAt(back.team, T0 + RENEWAL_MS), {
    usesLeft: 1,
    nextReturnMs: T0 + 2 * RENEWAL_MS,
  });

  const early = settleDeath(died(back), T0 + RENEWAL_MS - 1).state;
  assert.equal(early.run.deathSettlement.kind, "progressLost");
  assert.equal(early.team.resurrectionNextReturnAtMs, T0 + RENEWAL_MS);

  const renewed = settleDeath(died(back), T0 + RENEWAL_MS).state;
  assert.equal(renewed.run.deathSettlement.kind, "resurrectionUsed");
  assert.equal(renewed.team.resurrectionUsesSpent, 3);
  assert.equal(renewed.team.resurrectionNextReturnAtMs, T0 + 2 * RENEWAL_MS);
});

// D-07, D-219: a clock set back is the player's own; the moment is stored as the arithmetic gives it.
test("a moment below zero settles as any other", () => {
  // decision: D-386 "A moment of real time that the game state stores, the save time and the moment the next spent use of the account's resurrection returns, is a safe integer of milliseconds of any sign, which the load takes without comparing it with any clock; the function that stamps a save time, the function that settles a death and the function that settles the first completion of a map refuse a moment that is no safe integer with a RangeError, and the last two read no moment where there is nothing to settle"
  const settled = settleDeath(died(team(), -20_000), -5_000).state;
  assert.equal(settled.team.resurrectionUsesSpent, 1);
  assert.equal(settled.team.resurrectionNextReturnAtMs, RENEWAL_MS - 5_000);
  assert.equal(settled.run.deathSettlement.kind, "resurrectionUsed");
});

/** Las with `state`'s run marked as a run of a solved map. */
const onSolvedMap = (state) => ({
  ...state,
  solvedMaps: ["forestEdge", "forest"],
});

// D-61, D-190, D-194: a death pays nothing, and the map run stays ended in death.
test("a death ends the map run, pays nothing and takes what it carried, a use left or not, on a solved map too", () => {
  // decision: D-190 "A character's death takes what it carried and pays nothing of its map run; when the resurrection has no use left, it also takes all the character's practice"
  for (const [name, start, kind] of [
    ["a use left", team(), "resurrectionUsed"],
    ["no use left", usedUp(team(), T0 + 1), "progressLost"],
    ["a use left, solved map", onSolvedMap(team()), "resurrectionUsed"],
    [
      "no use left, solved map",
      onSolvedMap(usedUp(team(), T0 + 1)),
      "progressLost",
    ],
  ]) {
    const state = died(start);
    const settled = settleDeath(state, T0).state;
    assert.equal(settled.run.deathSettlement.kind, kind, name);
    assert.deepEqual(settled.run.death, state.run.death, name);
    assert.equal(settled.run.deposited, null, name);
    assert.deepEqual(settled.team.chest, state.team.chest, name);
    if (kind === "resurrectionUsed")
      assert.deepEqual(ala(settled).skills, ala(state).skills, name);
    // Nothing it carried comes back: the chest the screen Siedziba shows after the end stands as the death left it.
    assert.deepEqual(end(settled).state.team.chest, state.team.chest, name);
  }
});

/**
 * A program that explores, then walks its rounds with the branch action „Obchód” wherever sticks
 * lie, then wanders, as `tests/sim/saved-game.test.mjs` patrols.
 */
const PATROLLING = programFromRules(
  { condition: ALWAYS, action: { kind: "explore" } },
  { condition: ALWAYS, action: { kind: "patrol", resource: "stick" } },
  { condition: ALWAYS, action: { kind: "wander" } },
);

// D-190: the practice a map run gathered goes with it.
test("the practice a dying character gathered reaches no skill, a use left or not", () => {
  // decision: D-189 "A manual map run that first solves its map pays practice once per map for the player"
  // decision: D-190 "A character's death takes what it carried and pays nothing of its map run; when the resurrection has no use left, it also takes all the character's practice"
  const program = setProgram(team(), PATROLLING).state;
  const state = died(program);
  assert.ok(
    state.run.practice.exploration > 0,
    "precondition: the run gathered practice",
  );
  assert.deepEqual(
    ala(settleDeath(state, T0).state).skills,
    ala(program).skills,
  );
  const lost = settleDeath(died(usedUp(program, T0 + 1)), T0).state;
  assert.equal(ala(lost).skills.exploration.practice, 0);
});

// D-190: the programs, the chest, the Understanding and the solved maps survive every death.
test("the programs, the chest, the Understanding and the solved maps survive every death", () => {
  // decision: D-119 "The Understanding belongs to the player"
  // decision: D-190 "The programs, the chest, the Understanding and the solved maps survive every death; the map run kept on the screen stays as it was, and a „Restart” after a death with no use of the resurrection left starts from the character as that death left it"
  for (const start of [team(), usedUp(team(), T0 + 1)]) {
    const state = died(onSolvedMap(start));
    const settled = settleDeath(state, T0).state;
    assert.deepEqual(settled.programs, state.programs);
    assert.deepEqual(settled.team.chest, state.team.chest);
    assert.deepEqual(settled.understanding, state.understanding);
    assert.deepEqual(settled.solvedMaps, state.solvedMaps);
  }
});

// invariant: death-settled-once
// A later settling, however late, is the same state.
test("a death settled is not settled again, however late", () => {
  for (const start of [team(), usedUp(team(), T0 + 1)]) {
    const once = settleDeath(died(start), T0).state;
    for (const later of [T0, T0 + 1, T0 + RENEWAL_MS + 1]) {
      const again = settleDeath(once, later);
      assert.equal(again.state, once);
      assert.deepEqual(again.events, []);
    }
  }
});

// invariant: death-settled-once
// A load on the screen after a death settles nothing.
test("a settled death saved and loaded on its screen is left as it stood by a later settling", () => {
  // decision: D-386 "The load of a saved game state admits every game state the game's own functions make, so the game never writes a saved game state that its own load discards"
  for (const start of [team(), usedUp(team(), T0 + 1)]) {
    const settled = settleDeath(died(start), T0).state;
    // D-248: a saved document carries the moment of its save, so the state is stamped first.
    const loaded = loadSavedGame(savedGame(withSaveTime(settled, T0)));
    assert.equal(loaded.ok, true);
    assert.deepEqual(loaded.state, { ...settled, saveTimeMs: T0 });
    assert.equal(
      settleDeath(loaded.state, T0 + 2 * RENEWAL_MS).state,
      loaded.state,
    );
  }
});

// D-386: where there is nothing to settle the moment is not even looked at.
test("with nothing to settle the very state comes back, whatever the moment", () => {
  // decision: D-386 "A moment of real time that the game state stores, the save time and the moment the next spent use of the account's resurrection returns, is a safe integer of milliseconds of any sign, which the load takes without comparing it with any clock; the function that stamps a save time, the function that settles a death and the function that settles the first completion of a map refuse a moment that is no safe integer with a RangeError, and the last two read no moment where there is nothing to settle"
  const going = send(team(), SENT, T0).state;
  const completed = {
    ...going,
    run: { ...going.run, completion: { minute: 0 } },
  };
  for (const [name, state] of [
    ["a new game", newGame()],
    ["no map run", team()],
    ["a map run going on", going],
    ["a completion", completed],
  ]) {
    for (const nowMs of [T0, Number.NaN, 1.5, undefined]) {
      const result = settleDeath(state, nowMs);
      assert.equal(result.state, state, name);
      assert.deepEqual(result.events, [], name);
    }
  }
});

// D-386: a moment the load would refuse never enters the game state.
test("a moment that is no safe integer is refused at a death to settle", () => {
  // decision: D-386 "A moment of real time that the game state stores, the save time and the moment the next spent use of the account's resurrection returns, is a safe integer of milliseconds of any sign, which the load takes without comparing it with any clock; the function that stamps a save time, the function that settles a death and the function that settles the first completion of a map refuse a moment that is no safe integer with a RangeError, and the last two read no moment where there is nothing to settle"
  const state = died(team());
  for (const nowMs of [
    Number.NaN,
    Infinity,
    1.5,
    2 ** 53,
    -(2 ** 53),
    "1760000000000",
    undefined,
    null,
  ])
    assert.throws(() => settleDeath(state, nowMs), RangeError, `${nowMs}`);
});

test("settling a death changes nothing passed to it", () => {
  for (const start of [team(), usedUp(team(), T0 + 1)]) {
    const state = died(start);
    const before = structuredClone(state);
    settleDeath(state, T0);
    assert.deepEqual(state, before);
  }
});

// D-221: the passing of game time leaves the settling to whoever knows real time.
test("game time settles no death: a death stands unsettled after advanceMinutes and passRealTime", () => {
  // decision: D-221 "A character's death is settled by a function of the simulation apart from the functions that pass game time, which leave the death unsettled and take no real moment"
  const sent = send(team(), SENT, T0).state;
  for (const state of [
    advanceMinutes(sent, LONGER_THAN_A_LIFE).state,
    passRealTime(sent, LONGER_THAN_A_LIFE * 1000).state,
  ]) {
    assert.ok(state.run.death, "precondition: the character died");
    assert.equal(state.run.deathSettlement, null);
    assert.deepEqual(ala(state), ala(sent));
  }
});

test("a map run starts with no settlement", () => {
  assert.equal(send(team(), SENT, T0).state.run.deathSettlement, null);
  const settled = settleDeath(died(team()), T0).state;
  assert.equal(restart(settled).state.run.deathSettlement, null);
});

/** The kinds of the program actions a map run starts as it goes on to its end. */
function actionsStarted(state) {
  return advanceMinutes(state, LONGER_THAN_A_LIFE)
    .events.filter(
      (event) =>
        event.kind === "activityStarted" && event.activity.kind === "rule",
    )
    .map((event) => event.activity.action.kind);
}

// D-200: the run on the screen keeps what it started with, whatever the death took.
test("a death that takes everything leaves the map run on the screen as it was", () => {
  // decision: D-200 "The player buys a branch rank with „Kup” on the screen Postać, at a character in an earning loop too, and the rank acts from that character's next map run, the next map run of that earning loop included, while the map run going on keeps the skills of its start"
  // decision: D-190 "The programs, the chest, the Understanding and the solved maps survive every death; the map run kept on the screen stays as it was, and a „Restart” after a death with no use of the resurrection left starts from the character as that death left it"
  const state = died(usedUp(team(), T0 + 1));
  const settled = settleDeath(state, T0).state;
  assert.deepEqual(settled.run.character.skills, state.run.character.skills);
  assert.equal(branchRank(settled.run.character.skills, "patrol"), 1);
  assert.deepEqual(settled.run.practice, state.run.practice);
});

// D-190: what a character can do follows it, and
// what the player knows stays. Catches a „Restart” giving the run back the ranks the death took.
test("„Restart” after a death that took everything starts from the team: a branch action drops out of the run and stays in the Understanding and the copy", () => {
  // decision: D-119 "A character's repertoire is computed from the Understanding through its archetype's predispositions and the branches the character has bought, and is never saved"
  // decision: D-190 "The programs, the chest, the Understanding and the solved maps survive every death; the map run kept on the screen stays as it was, and a „Restart” after a death with no use of the resurrection left starts from the character as that death left it"
  const program = setProgram(team(), PATROLLING).state;
  const start = send(program, SENT, T0).state;
  assert.ok(actionsStarted(start).includes("patrol"), "precondition");
  const settled = settleDeath(died(usedUp(program, T0 + 1)), T0).state;
  const restarted = restart(settled).state;
  assert.equal(restarted.run.seed, settled.run.seed);
  assert.equal(restarted.run.character.skills.smallItemGathering.practice, 0);
  assert.equal(branchRank(restarted.run.character.skills, "patrol"), 0);
  assert.ok(!actionsStarted(restarted).includes("patrol"));
  assert.ok(restarted.understanding.actions.includes("patrol"));
  assert.deepEqual(restarted.run.copy.program, settled.run.copy.program);
  assert.equal(
    restarted.run.copy.program.groups[0].rules[1].action.kind,
    "patrol",
  );
});

// D-190, D-200: only a death that took everything reads the team.
test("„Restart” after a use spent, and of a map run going on, starts from the run it replaces", () => {
  // decision: D-190 "The death of a character with practice uses up one use while any is left, and a death of a character with practice with none left stops its earning loop"
  const program = setProgram(team(), PATROLLING).state;
  const settled = settleDeath(died(program), T0).state;
  const restarted = restart(settled).state;
  assert.equal(branchRank(restarted.run.character.skills, "patrol"), 1);
  assert.ok(actionsStarted(restarted).includes("patrol"));

  const going = send(program, SENT, T0).state;
  const skills = { ...ala(going).skills, eating: { practice: 0, ranks: {} } };
  const changedTeam = {
    ...going,
    team: {
      ...going.team,
      characters: [
        { ...ala(going), skills },
        ...going.team.characters.slice(1),
      ],
    },
  };
  assert.equal(
    restart(changedTeam).state.run.character.skills.eating.practice,
    20,
  );
});

// D-190: the character the team holds, not any first one.
test("„Restart” after a death that took everything reads the character that died", () => {
  // decision: D-190 "A character's death takes what it carried and pays nothing of its map run; when the resurrection has no use left, it also takes all the character's practice"
  // decision: D-190 "The programs, the chest, the Understanding and the solved maps survive every death; the map run kept on the screen stays as it was, and a „Restart” after a death with no use of the resurrection left starts from the character as that death left it"
  const start = usedUp(team(), T0 + 1);
  const [first, second] = start.team.characters;
  const secondSkilled = {
    ...second,
    skills: { ...second.skills, eating: { practice: 3, ranks: {} } },
  };
  const state = {
    ...start,
    team: { ...start.team, characters: [first, secondSkilled] },
  };
  const fell = advanceMinutes(
    send(state, { mapId: "forest", characterId: 2 }, T0).state,
    LONGER_THAN_A_LIFE,
  ).state;
  const settled = settleDeath(fell, T0).state;
  assert.equal(settled.team.characters[1].generation, 2);
  assert.equal(settled.team.characters[1].skills.eating.practice, 0);
  assert.equal(settled.team.characters[0].skills.eating.practice, 20);
  assert.equal(settled.team.characters[0].generation, 1);
  const restarted = restart(settled).state;
  assert.equal(restarted.run.character.id, 2);
  assert.equal(restarted.run.character.skills.eating.practice, 0);
});

/** The character `characterId` of `state` sent to Las and moved on until it dies; the death stands unsettled. */
function characterDied(state, characterId) {
  const fell = advanceMinutes(
    send(state, { mapId: "forest", characterId }, T0).state,
    LONGER_THAN_A_LIFE,
  ).state;
  assert.ok(fell.run.death, "precondition: the character died");
  return fell;
}

/** `state` with the character `characterId`'s skills replaced. */
function withSkills(state, characterId, skills) {
  return {
    ...state,
    team: {
      ...state.team,
      characters: state.team.characters.map((character) =>
        character.id === characterId ? { ...character, skills } : character,
      ),
    },
  };
}

// D-190: Ola has nothing a resurrection would guard; Ala has.
// invariant: resurrection-renewal
test("the death of a character with no practice leaves the character, the generation and the team's resurrection as they were, a use left or not", () => {
  // decision: D-190 "A character's death takes what it carried and pays nothing of its map run; when the resurrection has no use left, it also takes all the character's practice"
  for (const start of [team(), usedUp(team(), T0 + 1)]) {
    const state = characterDied(start, 2);
    const settled = settleDeath(state, T0).state;
    assert.deepEqual(settled.run.deathSettlement, { kind: "noPractice" });
    assert.equal(
      settled.team.resurrectionUsesSpent,
      state.team.resurrectionUsesSpent,
    );
    assert.equal(
      settled.team.resurrectionNextReturnAtMs,
      state.team.resurrectionNextReturnAtMs,
    );
    assert.deepEqual(settled.team.characters, state.team.characters);
    assert.equal(settled.team.characters[1].generation, 1);
    // Like any death it ends the map run, pays nothing and takes what the character carried.
    assert.ok(settled.run.death);
    assert.equal(settled.run.deposited, null);
    assert.deepEqual(settled.team.chest, state.team.chest);
  }
});

// D-190: any one of the three things is a practice the resurrection guards.
test("a character with practice in one skill, or one rank bought, has practice: its death goes by the resurrection", () => {
  // decision: D-190 "A character's death takes what it carried and pays nothing of its map run; when the resurrection has no use left, it also takes all the character's practice"
  // decision: D-190 "The death of a character with practice uses up one use while any is left, and a death of a character with practice with none left stops its earning loop"
  const [, ola] = team().team.characters;
  const skill = Object.keys(ola.skills)[0];
  const rank = { patrol: 1 };
  const one = {
    "one practice": { ...ola.skills, [skill]: { practice: 1, ranks: {} } },
    "one rank": { ...ola.skills, [skill]: { practice: 0, ranks: rank } },
  };
  for (const [name, skills] of Object.entries(one)) {
    const state = characterDied(withSkills(team(), 2, skills), 2);
    assert.equal(
      settleDeath(state, T0).state.run.deathSettlement.kind,
      "resurrectionUsed",
      name,
    );
    const lost = characterDied(
      withSkills(usedUp(team(), T0 + 1), 2, skills),
      2,
    );
    assert.equal(
      settleDeath(lost, T0).state.run.deathSettlement.kind,
      "progressLost",
      name,
    );
  }
});

// D-190: the resurrection is the team's, one for all its characters.
// invariant: resurrection-renewal
test("the death of any character with practice uses up one of the team's uses, and the next death of any other, with none left, takes everything", () => {
  // decision: D-190 "The account has one resurrection, shared by all its characters, held as numbers of the account, no item of any backpack, equipment or chest: a number of uses and the span of real time after which one used use returns, both set in the balance data, 3 uses and 4 hours to start."
  // decision: D-190 "The used uses return one at a time on one clock: a death that uses up a use of a full stock starts the clock, a death while the clock runs leaves it as it runs"
  for (const [first, second] of [
    [1, 2],
    [2, 1],
  ]) {
    const practised = withSkills(
      withResurrection(team(), 2, T0 + RENEWAL_MS),
      2,
      {
        ...team().team.characters[1].skills,
        eating: { practice: 5, ranks: {} },
      },
    );
    const used = settleDeath(characterDied(practised, first), T0).state;
    assert.equal(used.run.deathSettlement.kind, "resurrectionUsed");
    assert.equal(used.team.resurrectionUsesSpent, 3);
    assert.equal(used.team.resurrectionNextReturnAtMs, T0 + RENEWAL_MS);
    const next = settleDeath(
      characterDied(end(used).state, second),
      T0 + 1,
    ).state;
    assert.equal(
      next.run.deathSettlement.kind,
      "progressLost",
      `${first} then ${second}`,
    );
    assert.equal(
      next.team.characters.find((character) => character.id === second)
        .generation,
      2,
    );
    assert.equal(
      next.team.characters.find((character) => character.id === first)
        .generation,
      1,
    );
    assert.equal(next.team.resurrectionUsesSpent, 3);
    assert.equal(next.team.resurrectionNextReturnAtMs, T0 + RENEWAL_MS);
  }
});

// D-190: a death of a character with no practice does not wait for the resurrection, and does not stop the earning of the others.
test("the death of a character with no practice, settled after one that used a use, leaves the resurrection as it stood", () => {
  // decision: D-190 "A character's death takes what it carried and pays nothing of its map run; when the resurrection has no use left, it also takes all the character's practice"
  const used = settleDeath(characterDied(team(), 1), T0).state;
  const second = settleDeath(characterDied(end(used).state, 2), T0 + 1).state;
  assert.equal(second.run.deathSettlement.kind, "noPractice");
  assert.equal(second.team.resurrectionUsesSpent, 1);
  assert.equal(second.team.resurrectionNextReturnAtMs, T0 + RENEWAL_MS);
  assert.equal(second.team.characters[1].generation, 1);
});

// D-190, D-200: a death of a character with no practice takes nothing from the character, so „Restart” reads the run.
test("„Restart” after the death of a character with no practice starts from the run it replaces", () => {
  const settled = settleDeath(characterDied(team(), 2), T0).state;
  const restarted = restart(settled).state;
  assert.equal(restarted.run.character.id, 2);
  assert.equal(restarted.run.deathSettlement, null);
  assert.deepEqual(
    restarted.run.character.skills,
    settled.run.character.skills,
  );
});

test("a death of a character with no practice is settled once too, and the moment is looked at only for a death to settle", () => {
  const state = characterDied(team(), 2);
  const once = settleDeath(state, T0).state;
  assert.equal(settleDeath(once, T0 + RENEWAL_MS).state, once);
  assert.throws(() => settleDeath(state, Number.NaN), RangeError);
});
