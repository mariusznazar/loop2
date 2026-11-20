// The player's one team: creating its characters, its chest and sending its characters, and the uses
// of its one resurrection. The expectations of the uses come from D-190 (the uses, the one clock they
// return on, the first solving that returns one), D-220 (a new game starts with every use), D-240
// (the order of the catch-up), D-386 (the moments the game state holds and the load admits) and the
// invariant `resurrection-renewal`.
import assert from "node:assert/strict";
import { test } from "node:test";
import { BALANCE } from "../../dist/browser/sim/data/balance.js";
import { programFromRules } from "./program-fixture.mjs";
import {
  advanceMinutes,
  characterName,
  createCharacter,
  end,
  newGame,
  restart,
  resurrectionAt,
  resurrectionHasUse,
  send,
  setProgram,
  settleCompletion,
  settleDeath,
  teamAfterDeath,
  withSaveTime,
} from "../../dist/browser/sim/game.js";
import { loadSavedGame, savedGame } from "../../dist/browser/sim/saved-game.js";
import { newKnowingGame, withEdgeSolved } from "./understanding-fixture.mjs";

const mapId = "forest";
const REAL_MS = 1760000000000;
const LATER_MS = 1760000123456;
const ZERO_SKILLS = {
  exploration: { practice: 0, ranks: {} },
  smallItemGathering: { practice: 0, ranks: {} },
  campfireCrafting: { practice: 0, ranks: {} },
  eating: { practice: 0, ranks: {} },
  flameSpell: { practice: 0, ranks: {} },
  oneHandedCombat: { practice: 0, ranks: {} },
  kicking: { practice: 0, ranks: {} },
  dodging: { practice: 0, ranks: {} },
};
const EXPLORING = programFromRules({
  condition: { kind: "always" },
  action: { kind: "explore" },
});

/** The given game with characters created under the given names, in that order. */
function createdIn(game, names) {
  let state = setProgram(game, EXPLORING).state;
  for (const name of names) state = createCharacter(state, name).state;
  return state;
}

/** A new game with characters created under the given names, in that order. */
function created(...names) {
  return createdIn(withEdgeSolved(newGame()), names);
}

/** The same, from a game that knows everything: for a game that is sent and then passes time. */
function createdKnowing(...names) {
  return createdIn(withEdgeSolved(newKnowingGame()), names);
}

// Generation 1 and no resurrection of its own: the team's is shared (D-220).
test("a created character joins the end of the team's list as an elemental mage, in the order of creation", () => {
  // decision: D-192 "A character is described by traits, character skills and the predispositions of its archetype"
  // decision: D-192 "A number that acts in one action only belongs to the tree of that action's character skill, never to a trait"
  // decision: D-50 "Each character belongs to exactly one team and uses its chest, and a character has no chest of its own"
  // decision: D-54 "The characters of the team stand on its list in the order they were created"
  // decision: D-56 "Each character carries a number the game gives it when the character is created, 1 for the first character of a game and one more than the number the game state gave last for each later one, so the numbers of two characters of one game differ"
  // decision: D-220 "A new character has generation number 1 and brings no resurrection of its own; a new game has the account's resurrection with its full number of uses."
  const state = created("Ala", "Ola", "Ela");
  assert.deepEqual(state.team.characters, [
    {
      id: 1,
      name: "Ala",
      archetypeId: "elementalMage",
      traits: { carryingCapacity: 15 },
      skills: ZERO_SKILLS,
      generation: 1,
    },
    {
      id: 2,
      name: "Ola",
      archetypeId: "elementalMage",
      traits: { carryingCapacity: 15 },
      skills: ZERO_SKILLS,
      generation: 1,
    },
    {
      id: 3,
      name: "Ela",
      archetypeId: "elementalMage",
      traits: { carryingCapacity: 15 },
      skills: ZERO_SKILLS,
      generation: 1,
    },
  ]);
  assert.equal(state.nextCharacterId, 4);
  assert.equal(state.team.resurrectionUsesSpent, 0);
  assert.equal(state.team.resurrectionNextReturnAtMs, null);
});

test("two characters may share a name and stay two characters", () => {
  // decision: D-52 "A character has a name, which the player types when creating it; a name that is empty, also once the white space at its start and end is trimmed, creates no character, and two characters may bear the same name"
  // decision: D-56 "Each character carries a number the game gives it when the character is created, 1 for the first character of a game and one more than the number the game state gave last for each later one, so the numbers of two characters of one game differ"
  const state = created("Ala", "Ala");
  assert.deepEqual(
    state.team.characters.map((character) => [character.id, character.name]),
    [
      [1, "Ala"],
      [2, "Ala"],
    ],
  );
});

test("the name loses the white space at its start and end, and keeps the white space inside", () => {
  // decision: D-52 "A character has a name, which the player types when creating it; a name that is empty, also once the white space at its start and end is trimmed, creates no character, and two characters may bear the same name"
  const state = created("  Ala ", "\tOla\n", " Ala Ma Kota ");
  assert.deepEqual(
    state.team.characters.map((character) => character.name),
    ["Ala", "Ola", "Ala Ma Kota"],
  );
  assert.equal(characterName("  Ala "), "Ala");
  assert.equal(characterName("Ala Ma Kota"), "Ala Ma Kota");
});

test("a name empty once trimmed creates no character", () => {
  // decision: D-52 "A character has a name, which the player types when creating it; a name that is empty, also once the white space at its start and end is trimmed, creates no character, and two characters may bear the same name"
  const state = created("Ala");
  for (const name of ["", " ", "   ", "\t\n "]) {
    assert.equal(characterName(name), null, JSON.stringify(name));
    assert.throws(
      () => createCharacter(state, name),
      Error,
      JSON.stringify(name),
    );
  }
  assert.throws(() => createCharacter(state, undefined), Error);
  assert.equal(state.team.characters.length, 1);
});

test("the team's chest is empty in a new game and stays empty through creating, sending and ending", () => {
  assert.deepEqual(newGame().team.chest, { pieces: {} });
  let state = send(
    createdKnowing("Ala"),
    { mapId, characterId: 1 },
    REAL_MS,
  ).state;
  state = advanceMinutes(state, 120).state;
  state = end(state).state;
  assert.deepEqual(state.team.chest, { pieces: {} });
});

test("the send sends the chosen character of the team, and a restart keeps it", () => {
  // decision: D-56 "A map run names the team's character it carries by that number"
  const state = createdKnowing("Ala", "Ola", "Ela");
  const sent = send(state, { mapId, characterId: 2 }, REAL_MS).state;
  assert.equal(sent.run.character.id, 2);
  assert.deepEqual(sent.team, state.team);
  const restarted = restart(advanceMinutes(sent, 30).state).state;
  assert.equal(restarted.run.character.id, 2);
  const again = send(end(restarted).state, { mapId, characterId: 3 }, LATER_MS);
  assert.equal(again.state.run.character.id, 3);
});

test("while one character's map run goes on, no other character of the team is sent", () => {
  const state = created("Ala", "Ola");
  const sent = send(state, { mapId, characterId: 1 }, REAL_MS).state;
  assert.throws(
    () => send(sent, { mapId, characterId: 2 }, LATER_MS),
    Error,
    "a second character sent during a map run",
  );
  const ended = end(sent).state;
  assert.equal(
    send(ended, { mapId, characterId: 2 }, LATER_MS).state.run.character.id,
    2,
  );
});

/** A real moment of the browser's clock, in ms. */
const T0 = 1_760_000_000_000;
/** The renewal of one use of the resurrection, 240 real minutes (D-190: four hours to start), in ms. */
const RENEWAL_MS = 14_400_000;
/** The uses of a full stock (D-190: 3 to start). */
const USES = 3;
/** Far more game minutes than a character lives with no program to feed it. */
const LONGER_THAN_A_LIFE = 1000;

/** A new game with Ala, who has practice, and Ola, who has none, in that order; Las can be sent to. */
function practised() {
  let state = withEdgeSolved(newKnowingGame());
  state = createCharacter(state, "Ala").state;
  state = createCharacter(state, "Ola").state;
  const [ala, ola] = state.team.characters;
  const skills = { ...ala.skills, eating: { practice: 20, ranks: {} } };
  return {
    ...state,
    team: { ...state.team, characters: [{ ...ala, skills }, ola] },
  };
}

/** The same with Ola too having practice. */
function bothPractised() {
  const state = practised();
  const [ala, ola] = state.team.characters;
  const skills = { ...ola.skills, eating: { practice: 5, ranks: {} } };
  return {
    ...state,
    team: { ...state.team, characters: [ala, { ...ola, skills }] },
  };
}

/** `state` with the team's resurrection having `spent` uses spent and the next one returning at `nextMs`. */
function withUses(state, spent, nextMs) {
  return {
    ...state,
    team: {
      ...state.team,
      resurrectionUsesSpent: spent,
      resurrectionNextReturnAtMs: nextMs,
    },
  };
}

/** What the death of the team's character `index` at the real moment `nowMs` does to the team. */
const dies = (team, index, nowMs) =>
  teamAfterDeath(team, team.characters[index], {}, nowMs);

/** The uses of the team's resurrection at a moment, as a pair: the uses left and the moment of the next return. */
function stock(team, nowMs) {
  const { usesLeft, nextReturnMs } = resurrectionAt(team, nowMs);
  return [usesLeft, nextReturnMs];
}

/** Ala (the first of `state`'s characters) sent to Las and moved on until she dies; the death stands unsettled. */
function fell(state) {
  const fallen = advanceMinutes(
    send(state, { mapId, characterId: 1 }, T0).state,
    LONGER_THAN_A_LIFE,
  ).state;
  assert.ok(fallen.run.death, "precondition: the character died");
  return fallen;
}

/**
 * The first solving of Las by Ala, as the game leaves it at the minute it completes: Las among the
 * solved maps, the run standing completed with nothing deposited and its settlement open.
 */
function solvedFirst(state) {
  const going = send(state, { mapId, characterId: 1 }, T0).state;
  assert.equal(going.run.solvedMapRun, false, "precondition: not a solved map");
  return {
    ...going,
    solvedMaps: [...going.solvedMaps, mapId],
    run: { ...going.run, completion: { minute: 0 }, deposited: [] },
  };
}

test("a new game's resurrection has every use and its clock is not running", () => {
  // decision: D-220 "A new character has generation number 1 and brings no resurrection of its own; a new game has the account's resurrection with its full number of uses."
  const team = newGame().team;
  assert.equal(team.resurrectionUsesSpent, 0);
  assert.equal(team.resurrectionNextReturnAtMs, null);
  assert.deepEqual(stock(team, T0), [USES, null]);
  assert.equal(resurrectionHasUse(team, T0), true);
  assert.deepEqual(
    stock(createCharacter(newGame(), "Ala").state.team, T0),
    [USES, null],
    "a created character brings no use of its own",
  );
});

// invariant: resurrection-renewal
test("the death of a character with practice spends one use, the death of a full stock starting the clock at its moment", () => {
  // decision: D-190 "The used uses return one at a time on one clock: a death that uses up a use of a full stock starts the clock, a death while the clock runs leaves it as it runs, a use returns after the span from the moment the clock started and each next one after the span from the return of the one before it, and the clock stops when the stock is full."
  const settled = settleDeath(fell(practised()), T0).state;
  assert.equal(settled.team.resurrectionUsesSpent, 1);
  assert.equal(settled.team.resurrectionNextReturnAtMs, T0 + RENEWAL_MS);
  assert.deepEqual(settled.run.deathSettlement, {
    kind: "resurrectionUsed",
    usesSpent: 1,
  });
  // What the death left of the character: nothing taken while a use was left.
  assert.deepEqual(settled.team.characters, practised().team.characters);
});

// invariant: resurrection-renewal
test("a death while the clock runs spends a use and leaves the moment of the next return as it runs", () => {
  // decision: D-190 "The used uses return one at a time on one clock: a death that uses up a use of a full stock starts the clock, a death while the clock runs leaves it as it runs, a use returns after the span from the moment the clock started and each next one after the span from the return of the one before it, and the clock stops when the stock is full."
  const first = dies(practised().team, 0, T0);
  const second = dies(first.team, 0, T0 + 1_000);
  assert.equal(second.team.resurrectionUsesSpent, 2);
  assert.equal(second.team.resurrectionNextReturnAtMs, T0 + RENEWAL_MS);
  assert.deepEqual(second.settlement, {
    kind: "resurrectionUsed",
    usesSpent: 2,
  });
  const third = dies(second.team, 0, T0 + 2_000);
  assert.equal(third.team.resurrectionUsesSpent, 3);
  assert.equal(third.team.resurrectionNextReturnAtMs, T0 + RENEWAL_MS);
  assert.deepEqual(third.settlement, {
    kind: "resurrectionUsed",
    usesSpent: 3,
  });
});

// invariant: resurrection-renewal
test("a death with no use left takes all practice and ranks as before, and leaves the uses and their moment as they stood", () => {
  // decision: D-190 "A character's death takes what it carried and pays nothing of its map run; when the resurrection has no use left, it also takes all the character's practice, the practice gathered at its earning loop included, and every rank of branch it bought, and the character's generation number grows by one, its archetype unchanged, except that the death of a character with no practice yet — none in any skill, no rank of branch bought and none gathered at its earning loop — takes nothing besides what it carried, leaves the generation number as it was, uses up no use of the resurrection, whether one is left or not, and does not stop its earning loop."
  const out = withUses(practised(), USES, T0 + RENEWAL_MS).team;
  const lost = dies(out, 0, T0 + RENEWAL_MS - 1);
  assert.deepEqual(lost.settlement, { kind: "progressLost", generation: 2 });
  assert.equal(lost.team.resurrectionUsesSpent, USES);
  assert.equal(lost.team.resurrectionNextReturnAtMs, T0 + RENEWAL_MS);
  assert.equal(lost.team.characters[0].generation, 2);
  assert.equal(lost.team.characters[0].skills.eating.practice, 0);
  assert.deepEqual(lost.team.characters[1], out.characters[1]);
});

// invariant: resurrection-renewal
test("the death of a character with no practice spends no use, at a full stock and at a part one, and changes nothing", () => {
  // decision: D-190 "A character's death takes what it carried and pays nothing of its map run; when the resurrection has no use left, it also takes all the character's practice, the practice gathered at its earning loop included, and every rank of branch it bought, and the character's generation number grows by one, its archetype unchanged, except that the death of a character with no practice yet — none in any skill, no rank of branch bought and none gathered at its earning loop — takes nothing besides what it carried, leaves the generation number as it was, uses up no use of the resurrection, whether one is left or not, and does not stop its earning loop."
  for (const [spent, next] of [
    [0, null],
    [2, T0 + RENEWAL_MS],
    [USES, T0 + RENEWAL_MS],
  ]) {
    const { team } = withUses(practised(), spent, next);
    const result = dies(team, 1, T0);
    assert.equal(result.team, team, `${spent} spent`);
    assert.deepEqual(
      result.settlement,
      { kind: "noPractice" },
      `${spent} spent`,
    );
  }
  // The same through a death in a map run: Ola in Las, with Ala's practice beside her in the team.
  const olaFell = advanceMinutes(
    send(practised(), { mapId, characterId: 2 }, T0).state,
    LONGER_THAN_A_LIFE,
  ).state;
  assert.ok(olaFell.run.death, "precondition: the character died");
  const settled = settleDeath(olaFell, T0).state;
  assert.deepEqual(settled.run.deathSettlement, { kind: "noPractice" });
  assert.equal(settled.team.resurrectionUsesSpent, 0);
  assert.equal(settled.team.resurrectionNextReturnAtMs, null);
});

// invariant: resurrection-renewal
test("the uses return one at a time, each the renewal after the clock started or after the use before it, a moment equal to a use's moment counting as returned", () => {
  // decision: D-190 "The used uses return one at a time on one clock: a death that uses up a use of a full stock starts the clock, a death while the clock runs leaves it as it runs, a use returns after the span from the moment the clock started and each next one after the span from the return of the one before it, and the clock stops when the stock is full."
  let { team } = withUses(bothPractised(), 0, null);
  team = dies(team, 0, T0).team;
  team = dies(team, 1, T0 + 1).team;
  team = dies(team, 0, T0 + 2).team;
  assert.equal(team.resurrectionUsesSpent, USES);
  const R = RENEWAL_MS;
  for (const [at, expected] of [
    [T0, [0, T0 + R]],
    [T0 + R - 1, [0, T0 + R]],
    [T0 + R, [1, T0 + 2 * R]],
    [T0 + 2 * R - 1, [1, T0 + 2 * R]],
    [T0 + 2 * R, [2, T0 + 3 * R]],
    // A reading late in a span counts from the moment of the use before it, not from the reading.
    [T0 + 2 * R + 5_000, [2, T0 + 3 * R]],
    [T0 + 3 * R - 1, [2, T0 + 3 * R]],
    [T0 + 3 * R, [USES, null]],
    [T0 + 10 * R, [USES, null]],
  ]) {
    assert.deepEqual(stock(team, at), expected, `at T0 + ${at - T0}`);
    assert.equal(
      resurrectionHasUse(team, at),
      expected[0] > 0,
      `at T0 + ${at - T0}`,
    );
  }
});

// invariant: resurrection-renewal
test("the renewal is read from the data of the game when it is used: a renewal set after the module was loaded starts the clock of a death and times every return", () => {
  // decision: D-190 "The used uses return one at a time on one clock: a death that uses up a use of a full stock starts the clock, a death while the clock runs leaves it as it runs, a use returns after the span from the moment the clock started and each next one after the span from the return of the one before it, and the clock stops when the stock is full."
  const renewalMinutes = BALANCE.resurrectionRenewalRealMinutes;
  const R = 3_600_000; // the overlaid renewal, 60 real minutes
  try {
    BALANCE.resurrectionRenewalRealMinutes = 60;
    let { team } = withUses(bothPractised(), 0, null);
    team = dies(team, 0, T0).team;
    assert.equal(
      team.resurrectionNextReturnAtMs,
      T0 + R,
      "the clock of a death",
    );
    team = dies(team, 1, T0 + 1).team;
    team = dies(team, 0, T0 + 2).team;
    for (const [at, expected] of [
      [T0 + R - 1, [0, T0 + R]],
      [T0 + R, [1, T0 + 2 * R]],
      [T0 + 2 * R, [2, T0 + 3 * R]],
      [T0 + 3 * R, [USES, null]],
    ]) {
      assert.deepEqual(stock(team, at), expected, `at T0 + ${at - T0}`);
    }
  } finally {
    BALANCE.resurrectionRenewalRealMinutes = renewalMinutes;
  }
});

// invariant: resurrection-renewal
test("the uses that returned up to the moment of a death, that moment included, count before the death is settled", () => {
  const R = RENEWAL_MS;
  const spentOne = withUses(practised(), 1, T0 + R).team;
  // A moment before the return: the use is still missing and the death spends another, the clock as it runs.
  const early = dies(spentOne, 0, T0 + R - 1);
  assert.equal(early.team.resurrectionUsesSpent, 2);
  assert.equal(early.team.resurrectionNextReturnAtMs, T0 + R);
  assert.deepEqual(early.settlement, {
    kind: "resurrectionUsed",
    usesSpent: 2,
  });
  // The very moment: the use is back, the stock is full, so this death starts the clock anew.
  const at = dies(spentOne, 0, T0 + R);
  assert.equal(at.team.resurrectionUsesSpent, 1);
  assert.equal(at.team.resurrectionNextReturnAtMs, T0 + 2 * R);
  assert.deepEqual(at.settlement, { kind: "resurrectionUsed", usesSpent: 1 });
  // Two uses back at the moment of the death: it spends one, the clock of the third as it runs.
  const spentAll = withUses(practised(), USES, T0 + R).team;
  const two = dies(spentAll, 0, T0 + 2 * R);
  assert.equal(two.team.resurrectionUsesSpent, 2);
  assert.equal(two.team.resurrectionNextReturnAtMs, T0 + 3 * R);
  assert.deepEqual(two.settlement, { kind: "resurrectionUsed", usesSpent: 2 });
  // With every use spent a use that returns at the moment of the death is there to spend: nothing is taken.
  const last = dies(spentAll, 0, T0 + R);
  assert.deepEqual(last.settlement, { kind: "resurrectionUsed", usesSpent: 3 });
  assert.equal(last.team.resurrectionUsesSpent, USES);
  assert.equal(last.team.resurrectionNextReturnAtMs, T0 + 2 * R);
  assert.equal(last.team.characters[0].generation, 1);
});

// invariant: resurrection-renewal
test("the first solving of a map returns one use while the stock is not full, the clock running on, and stops the clock when the stock fills", () => {
  // decision: D-190 "The first completion of a map the account has not solved yet returns one use at once while the stock is not full, once for each map, the clock running on as it was, and a full stock stays full."
  const R = RENEWAL_MS;
  const afterOne = settleCompletion(
    solvedFirst(withUses(practised(), 2, T0 + R)),
    T0 + 5_000,
  ).state;
  assert.equal(afterOne.team.resurrectionUsesSpent, 1);
  assert.equal(afterOne.team.resurrectionNextReturnAtMs, T0 + R);
  assert.deepEqual(afterOne.run.completionSettlement, {
    kind: "resurrectionRenewed",
  });
  const filled = settleCompletion(
    solvedFirst(withUses(practised(), 1, T0 + R)),
    T0 + 5_000,
  ).state;
  assert.equal(filled.team.resurrectionUsesSpent, 0);
  assert.equal(filled.team.resurrectionNextReturnAtMs, null);
  assert.deepEqual(filled.run.completionSettlement, {
    kind: "resurrectionRenewed",
  });
});

// invariant: resurrection-renewal
test("a first solving that finds the stock full leaves it as it is, and one that follows uses that returned up to its moment", () => {
  const R = RENEWAL_MS;
  const full = solvedFirst(practised());
  const found = settleCompletion(full, T0).state;
  assert.equal(found.team, full.team);
  assert.deepEqual(found.run.completionSettlement, {
    kind: "resurrectionReady",
  });
  // The one use spent is back at this very moment, so the stock is full and nothing is returned.
  const back = settleCompletion(
    solvedFirst(withUses(practised(), 1, T0 + R)),
    T0 + R,
  ).state;
  assert.deepEqual(stock(back.team, T0 + R), [USES, null]);
  assert.deepEqual(back.run.completionSettlement, {
    kind: "resurrectionReady",
  });
  // One moment before it the use is still missing and the solving returns it.
  const before = settleCompletion(
    solvedFirst(withUses(practised(), 1, T0 + R)),
    T0 + R - 1,
  ).state;
  assert.deepEqual(before.run.completionSettlement, {
    kind: "resurrectionRenewed",
  });
  assert.deepEqual(stock(before.team, T0 + R - 1), [USES, null]);
});

// invariant: resurrection-renewal
test("a solving of a map the account had solved returns no use", () => {
  // decision: D-190 "The first completion of a map the account has not solved yet returns one use at once while the stock is not full, once for each map, the clock running on as it was, and a full stock stays full."
  const state = withUses(practised(), 2, T0 + RENEWAL_MS);
  const running = send(
    { ...state, solvedMaps: ["forestEdge", mapId] },
    { mapId, characterId: 1 },
    T0,
  ).state;
  assert.equal(running.run.solvedMapRun, true, "precondition: a solved map");
  const completed = {
    ...running,
    run: { ...running.run, completion: { minute: 0 } },
  };
  const result = settleCompletion(completed, T0 + 5_000);
  assert.equal(result.state, completed);
});

// invariant: resurrection-renewal
// D-240: the catch-up settles in the order of the list, and the second death finds what the first left.
test("a death settled later, at an earlier real moment, never moves back a clock an earlier-settled death started", () => {
  // decision: D-240 "Characters meet only at the borders of map runs and at the account's resurrection: an item reaches the chest when a map run completes, and the next map run takes what it finds there; when the chest has room for one character's loot only, the character earlier on the list takes it; the death of each character finds the uses of the resurrection and the clock of their return as the characters earlier on the list left them, so with one use left for two deaths the character earlier on the list takes it, even when it died later in real time, and a clock that a death settled earlier on the list started does not move back."
  const team = bothPractised().team;
  const ala = dies(team, 0, T0 + 5_000);
  assert.equal(ala.team.resurrectionNextReturnAtMs, T0 + 5_000 + RENEWAL_MS);
  const ola = dies(ala.team, 1, T0);
  assert.equal(ola.team.resurrectionUsesSpent, 2);
  assert.equal(ola.team.resurrectionNextReturnAtMs, T0 + 5_000 + RENEWAL_MS);
  assert.deepEqual(ola.settlement, { kind: "resurrectionUsed", usesSpent: 2 });
  // With one use left for two deaths the character settled first takes it, though it died later in real time.
  const lastOne = withUses(bothPractised(), 2, T0 + RENEWAL_MS).team;
  const first = dies(lastOne, 0, T0 + 5_000);
  const second = dies(first.team, 1, T0);
  assert.equal(first.settlement.kind, "resurrectionUsed");
  assert.deepEqual(second.settlement, { kind: "progressLost", generation: 2 });
  assert.equal(second.team.characters[0].generation, 1);
});

// invariant: resurrection-renewal
test("a game state these rules make loads back from its saved document as it was", () => {
  // decision: D-386 "The load of a saved game state admits every game state the game's own functions make, so the game never writes a saved game state that its own load discards."
  const R = RENEWAL_MS;
  const stamped = (state) => withSaveTime(state, T0 + 1);
  const reloaded = (state, name) => {
    const loaded = loadSavedGame(savedGame(stamped(state)));
    assert.equal(loaded.ok, true, name);
    assert.deepEqual(loaded.state, stamped(state), name);
    return loaded.state;
  };
  const cases = {
    "a new game": newGame(),
    "a death that spent the first use": settleDeath(fell(practised()), T0)
      .state,
    "a death that spent the last use": settleDeath(
      fell(withUses(practised(), 2, T0 + R)),
      T0,
    ).state,
    "a death with none left": settleDeath(
      fell(withUses(practised(), USES, T0 + R)),
      T0,
    ).state,
    "a first solving that returned a use": settleCompletion(
      solvedFirst(withUses(practised(), 2, T0 + R)),
      T0,
    ).state,
    "a first solving that filled the stock": settleCompletion(
      solvedFirst(withUses(practised(), 1, T0 + R)),
      T0,
    ).state,
    "a moment below zero": settleDeath(fell(practised()), -5_000).state,
    "a death after the run ended": end(
      settleDeath(fell(withUses(practised(), 1, T0 + R)), T0).state,
    ).state,
  };
  for (const [name, state] of Object.entries(cases)) {
    const back = reloaded(state, name);
    assert.deepEqual(
      stock(back.team, T0 + R / 2),
      stock(state.team, T0 + R / 2),
      name,
    );
  }
  assert.equal(
    loadSavedGame(savedGame(stamped(cases["a death that spent the first use"])))
      .state.run.deathSettlement.usesSpent,
    1,
  );
});

// invariant: resurrection-renewal
// D-386: a moment the load would refuse never enters the game state.
test("a death whose clock would stand at a moment that is no safe integer is a RangeError, and one whose clock stands at the largest safe integer is not", () => {
  // decision: D-386 "The load of a saved game state admits every game state the game's own functions make, so the game never writes a saved game state that its own load discards."
  const state = fell(practised());
  assert.throws(
    () => settleDeath(state, Number.MAX_SAFE_INTEGER - RENEWAL_MS + 1),
    RangeError,
  );
  assert.throws(
    () => dies(practised().team, 0, Number.MAX_SAFE_INTEGER),
    RangeError,
  );
  const settled = settleDeath(
    state,
    Number.MAX_SAFE_INTEGER - RENEWAL_MS,
  ).state;
  assert.equal(
    settled.team.resurrectionNextReturnAtMs,
    Number.MAX_SAFE_INTEGER,
  );
  const loaded = loadSavedGame(savedGame(withSaveTime(settled, T0)));
  assert.equal(loaded.ok, true);
  assert.deepEqual(loaded.state.team, settled.team);
});

// A crafted document of the current version: the load refuses the team's uses it does not admit.
test("a crafted team of the resurrection is refused whole as shape", () => {
  const settled = settleDeath(fell(practised()), T0).state;
  const document = savedGame(withSaveTime(settled, T0));
  const withTeam = (change) => {
    const copy = structuredClone(document);
    change(copy.game.team);
    return copy;
  };
  const withSettlement = (change) => {
    const copy = structuredClone(document);
    change(copy.game.run.deathSettlement);
    return copy;
  };
  const refused = {
    "uses spent above the data's count": withTeam((team) => {
      team.resurrectionUsesSpent = USES + 1;
    }),
    "a negative count": withTeam((team) => {
      team.resurrectionUsesSpent = -1;
    }),
    "a fractional count": withTeam((team) => {
      team.resurrectionUsesSpent = 1.5;
    }),
    "a count that is no number": withTeam((team) => {
      team.resurrectionUsesSpent = "1";
    }),
    "a count that is not finite": withTeam((team) => {
      team.resurrectionUsesSpent = Infinity;
    }),
    "a moment standing with no use spent": withTeam((team) => {
      team.resurrectionUsesSpent = 0;
    }),
    "a moment missing with a use spent": withTeam((team) => {
      team.resurrectionNextReturnAtMs = null;
    }),
    "a moment that is no safe integer": withTeam((team) => {
      team.resurrectionNextReturnAtMs = 2 ** 53;
    }),
    "a moment that is no whole number": withTeam((team) => {
      team.resurrectionNextReturnAtMs = T0 + 0.5;
    }),
    "a moment that is a text": withTeam((team) => {
      team.resurrectionNextReturnAtMs = String(T0);
    }),
    "the old key beside the new ones": withTeam((team) => {
      team.resurrectionReadyAtMs = T0;
    }),
    "the old key instead of the new ones": withTeam((team) => {
      delete team.resurrectionUsesSpent;
      delete team.resurrectionNextReturnAtMs;
      team.resurrectionReadyAtMs = T0;
    }),
    // The death that spent a use holds the uses spent after it, a whole number from 1 up to the data's count.
    "uses spent in the settlement above the data's count": withSettlement(
      (settlement) => {
        settlement.usesSpent = USES + 1;
      },
    ),
    "uses spent in the settlement far above the data's count": withSettlement(
      (settlement) => {
        settlement.usesSpent = 2 ** 53 - 1;
      },
    ),
    "uses spent in the settlement of none, a death that spent a use leaving one spent at least":
      withSettlement((settlement) => {
        settlement.usesSpent = 0;
      }),
    "uses spent in the settlement below zero": withSettlement((settlement) => {
      settlement.usesSpent = -1;
    }),
    "uses spent in the settlement that is no whole number": withSettlement(
      (settlement) => {
        settlement.usesSpent = 0.5;
      },
    ),
    "uses spent in the settlement that is not finite": withSettlement(
      (settlement) => {
        settlement.usesSpent = Infinity;
      },
    ),
    "uses spent in the settlement that is a text": withSettlement(
      (settlement) => {
        settlement.usesSpent = "1";
      },
    ),
    "uses spent in the settlement of none at all": withSettlement(
      (settlement) => {
        settlement.usesSpent = null;
      },
    ),
    "uses spent in the settlement missing": withSettlement((settlement) => {
      delete settlement.usesSpent;
    }),
    "the old key of the uses left beside the uses spent": withSettlement(
      (settlement) => {
        settlement.usesLeft = 2;
      },
    ),
    "the old key of the uses left instead of the uses spent": withSettlement(
      (settlement) => {
        delete settlement.usesSpent;
        settlement.usesLeft = 2;
      },
    ),
  };
  assert.equal(
    loadSavedGame(document).ok,
    true,
    "precondition: a document the game made",
  );
  for (const [name, crafted] of Object.entries(refused)) {
    assert.deepEqual(
      loadSavedGame(crafted),
      { ok: false, reason: "shape" },
      name,
    );
  }
});

test("a count lowered from 3 to 1 after the save refuses a game with two uses spent and none with one, an open end-of-run window after a first death included", () => {
  // decision: D-386 "A saved game state holds the uses of the account's resurrection as the count spent and not yet returned at the moment of the save, with the moment the next one returns, and the settlement of a death that spent a use holds the uses spent after that death."
  // decision: D-386 "Lowering the number of uses in the balance data makes the load refuse a saved game state only where more uses are spent than the new number, in the team or in the settlement of a death, so a saved game state with an end-of-run window open after a death stays loadable."
  // decision: D-190 "The used uses return one at a time on one clock: a death that uses up a use of a full stock starts the clock, a death while the clock runs leaves it as it runs, a use returns after the span from the moment the clock started and each next one after the span from the return of the one before it, and the clock stops when the stock is full."
  const first = settleDeath(fell(practised()), T0).state;
  assert.equal(first.team.resurrectionUsesSpent, 1, "precondition: one spent");
  assert.deepEqual(
    first.run.deathSettlement,
    { kind: "resurrectionUsed", usesSpent: 1 },
    "precondition: the window stands open after the first death",
  );
  const firstDocument = savedGame(withSaveTime(first, T0));
  const second = settleDeath(fell(end(first).state), T0 + 1_000).state;
  assert.equal(second.team.resurrectionUsesSpent, 2, "precondition: two spent");
  assert.equal(second.run.deathSettlement.usesSpent, 2);
  const secondDocument = savedGame(withSaveTime(second, T0 + 1_000));
  const uses = BALANCE.resurrectionUses;
  try {
    BALANCE.resurrectionUses = 1;
    assert.deepEqual(loadSavedGame(firstDocument), {
      ok: true,
      state: withSaveTime(first, T0),
    });
    assert.deepEqual(loadSavedGame(secondDocument), {
      ok: false,
      reason: "shape",
    });
    BALANCE.resurrectionUses = 2;
    assert.equal(loadSavedGame(secondDocument).ok, true);
  } finally {
    BALANCE.resurrectionUses = uses;
  }
});

const HOUR_MS = 3_600_000;

/** Ala dead twice, at T0 and T0 + 1 s, from a full stock: two uses spent, the first returning at T0 + 4 h, the window closed. */
function twiceFallen() {
  const first = settleDeath(fell(practised()), T0).state;
  const second = settleDeath(fell(end(first).state), T0 + 1_000).state;
  const state = end(second).state;
  assert.equal(state.team.resurrectionUsesSpent, 2, "precondition: two spent");
  assert.equal(state.team.resurrectionNextReturnAtMs, T0 + 4 * HOUR_MS);
  return state;
}

// A saved document holds the uses as the game reckons them at the moment of the save: a use whose
// moment has come by then is not stored as spent, so a count lowered in the data later refuses only a
// save that has more uses spent at its own moment than the new count.
test("a save made after every spent use has returned stores none spent, so a count lowered to 1 loads it", () => {
  // decision: D-386 "A saved game state holds the uses of the account's resurrection as the count spent and not yet returned at the moment of the save, with the moment the next one returns, and the settlement of a death that spent a use holds the uses spent after that death."
  // decision: D-386 "Lowering the number of uses in the balance data makes the load refuse a saved game state only where more uses are spent than the new number, in the team or in the settlement of a death, so a saved game state with an end-of-run window open after a death stays loadable."
  const state = twiceFallen();
  const document = savedGame(withSaveTime(state, T0 + 13 * HOUR_MS));
  assert.equal(document.game.team.resurrectionUsesSpent, 0);
  assert.equal(document.game.team.resurrectionNextReturnAtMs, null);
  const uses = BALANCE.resurrectionUses;
  try {
    for (const count of [3, 2, 1]) {
      BALANCE.resurrectionUses = count;
      const loaded = loadSavedGame(document);
      assert.equal(loaded.ok, true, `count lowered to ${count}`);
      assert.deepEqual(stock(loaded.state.team, T0 + 13 * HOUR_MS), [
        count,
        null,
      ]);
    }
  } finally {
    BALANCE.resurrectionUses = uses;
  }
});

test("a save made while some spent uses are back stores the ones still spent and the moment of the next, and a count lowered to the spent ones loads it", () => {
  // decision: D-386 "A saved game state holds the uses of the account's resurrection as the count spent and not yet returned at the moment of the save, with the moment the next one returns, and the settlement of a death that spent a use holds the uses spent after that death."
  const state = twiceFallen();
  const uses = BALANCE.resurrectionUses;
  // At T0 + 6 h the first use is back and the second returns at T0 + 8 h; at T0 + 4 h exactly the
  // first counts as back (D-190: a moment equal to the moment of the return counts).
  for (const at of [T0 + 6 * HOUR_MS, T0 + 4 * HOUR_MS]) {
    const document = savedGame(withSaveTime(state, at));
    assert.equal(document.game.team.resurrectionUsesSpent, 1, `save at ${at}`);
    assert.equal(
      document.game.team.resurrectionNextReturnAtMs,
      T0 + 8 * HOUR_MS,
    );
    try {
      BALANCE.resurrectionUses = 1;
      assert.equal(loadSavedGame(document).ok, true, `save at ${at}`);
    } finally {
      BALANCE.resurrectionUses = uses;
    }
  }
  // A save one millisecond before the first return holds both uses spent, which a count of 1 refuses.
  const early = savedGame(withSaveTime(state, T0 + 4 * HOUR_MS - 1));
  assert.equal(early.game.team.resurrectionUsesSpent, 2);
  try {
    BALANCE.resurrectionUses = 1;
    assert.deepEqual(loadSavedGame(early), { ok: false, reason: "shape" });
  } finally {
    BALANCE.resurrectionUses = uses;
  }
});

test("bringing the uses up to date at a save changes nothing the game reckons from the save moment on, and nothing in the state the view holds", () => {
  // decision: D-190 "The used uses return one at a time on one clock: a death that uses up a use of a full stock starts the clock, a death while the clock runs leaves it as it runs, a use returns after the span from the moment the clock started and each next one after the span from the return of the one before it, and the clock stops when the stock is full."
  const state = twiceFallen();
  const held = structuredClone(state);
  for (const saveAt of [
    T0 + 1_000,
    T0 + 4 * HOUR_MS - 1,
    T0 + 4 * HOUR_MS,
    T0 + 6 * HOUR_MS,
    T0 + 8 * HOUR_MS,
    T0 + 13 * HOUR_MS,
  ]) {
    const loaded = loadSavedGame(savedGame(withSaveTime(state, saveAt)));
    assert.equal(loaded.ok, true, `save at ${saveAt}`);
    for (const at of [
      saveAt,
      saveAt + 1,
      T0 + 8 * HOUR_MS - 1,
      T0 + 8 * HOUR_MS,
      T0 + 8 * HOUR_MS + 1,
      T0 + 12 * HOUR_MS,
      T0 + 20 * HOUR_MS,
    ].filter((moment) => moment >= saveAt)) {
      assert.deepEqual(
        stock(loaded.state.team, at),
        stock(state.team, at),
        `uses at ${at} after a save at ${saveAt}`,
      );
      assert.deepEqual(
        dies(loaded.state.team, 0, at),
        dies(state.team, 0, at),
        `a death at ${at} after a save at ${saveAt}`,
      );
    }
  }
  assert.deepEqual(state, held, "the state the view holds is the value it was");
  assert.equal(
    withSaveTime(state, T0 + 13 * HOUR_MS).team !== state.team,
    true,
  );
});

// A settlement whose uses spent equal the data's count loads, and one above it is refused, the count
// being the data's of the moment of the load.
test("a settlement whose uses spent equal the data's count loads, and one above it is refused", () => {
  // decision: D-386 "A saved game state holds the uses of the account's resurrection as the count spent and not yet returned at the moment of the save, with the moment the next one returns, and the settlement of a death that spent a use holds the uses spent after that death."
  const settled = settleDeath(fell(practised()), T0).state;
  const withUsesSpent = (usesSpent) => {
    const copy = structuredClone(savedGame(withSaveTime(settled, T0)));
    copy.game.run.deathSettlement.usesSpent = usesSpent;
    return copy;
  };
  const equal = loadSavedGame(withUsesSpent(USES));
  assert.equal(equal.ok, true);
  assert.deepEqual(equal.state.run.deathSettlement, {
    kind: "resurrectionUsed",
    usesSpent: USES,
  });
  assert.deepEqual(loadSavedGame(withUsesSpent(USES + 1)), {
    ok: false,
    reason: "shape",
  });
});
