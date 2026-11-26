// The player's acts on a character's gear: putting a piece on from the chest, taking a piece off into
// it, the refusals of each, the acts at the camp, in an earning loop and beside a manual map run of
// the same character and of another, and the pick of a slot the screen Postać shows. The expectations
// come from D-452 (the gear goes with the character), D-453 (when the player may change it, and the
// earning loop's next map run), D-287 (the manual map run refuses the act), D-456 (what fits a slot),
// D-460 (the slots the player changed) and D-463 (the count of the gear changes) in
// foundations/decisions.md; every number is written out here.
import assert from "node:assert/strict";
import { test } from "node:test";
import {
  createCharacter,
  newGame,
  send,
  setPaused,
} from "../../dist/browser/sim/game.js";
import {
  gearPick,
  putOnPiece,
  takeOffPiece,
} from "../../dist/browser/sim/gear.js";
import { startLoop } from "../../dist/browser/sim/loop.js";
import { withEdgeSolved, newKnowingGame } from "./understanding-fixture.mjs";

const REAL_MS = 1760000000000;
const ANNA = 1;
const BOB = 2;

/** A game with two characters, Anna (1) and Bob (2), and a chest holding the given pieces. */
function twoCharacters(pieces) {
  let state = newKnowingGame();
  state = createCharacter(state, "Anna").state;
  state = createCharacter(state, "Bob").state;
  const held = {
    ...state,
    team: { ...state.team, chest: { pieces: { ...pieces } } },
  };
  return withEdgeSolved(held);
}

/** The state with Anna in an earning loop of Skraj lasu. */
function withLoopOfAnna(state) {
  return startLoop(state, { mapId: "forestEdge", characterId: ANNA }, REAL_MS)
    .state;
}

/** The state with a manual map run of Anna going, the chest as it stood. */
function withManualRunOfAnna(state) {
  return send(state, { mapId: "forest", characterId: ANNA }, REAL_MS).state;
}

function character(state, id) {
  return state.team.characters.find((listed) => listed.id === id);
}

test("putting a stick on at the camp moves it from the chest to the main hand and counts one gear change", () => {
  // decision: D-452 "A character's gear belongs to the character and stays at it between map runs, but for a death that D-190 says takes it; the player puts a piece of an item on from the chest on the screen Postać, and a piece taken off returns to the chest."
  // decision: D-463 "The game state counts at each character, from 0, the gear changes the player makes on the screen Postać (D-461): each putting on, exchanging and taking off of a piece counts one"
  // decision: D-453 "The player changes a character's gear on the screen Postać outside an unfinished manual map run of that character, one that has ended counting as a map run until „Restart” or „Zakończ”, at a character in an earning loop too."
  const state = twoCharacters({ stick: 2 });
  const result = putOnPiece(state, ANNA, "mainHand", "stick");
  assert.equal(result.refusal, null);
  assert.deepEqual(result.events, []);
  assert.deepEqual(result.state.team.chest.pieces, { stick: 1 });
  assert.equal(character(result.state, ANNA).gear.mainHand, "stick");
  assert.equal(character(result.state, ANNA).gearChanges, 1);
  assert.deepEqual(character(result.state, ANNA).changedSlots, []);
});

test("the last stick put on leaves the chest with no key for it", () => {
  const result = putOnPiece(
    twoCharacters({ stick: 1 }),
    ANNA,
    "mainHand",
    "stick",
  );
  assert.equal(result.refusal, null);
  assert.deepEqual(result.state.team.chest.pieces, {});
});

test("putting a stick on a main hand that holds one returns the held piece to the chest", () => {
  const first = putOnPiece(
    twoCharacters({ stick: 2 }),
    ANNA,
    "mainHand",
    "stick",
  ).state;
  const second = putOnPiece(first, ANNA, "mainHand", "stick");
  assert.equal(second.refusal, null);
  assert.deepEqual(second.state.team.chest.pieces, { stick: 1 });
  assert.equal(character(second.state, ANNA).gear.mainHand, "stick");
  assert.equal(character(second.state, ANNA).gearChanges, 2);
});

test("a put on refused where the chest lacks the item leaves the state as it was", () => {
  const state = twoCharacters({ berry: 1 });
  const before = structuredClone(state);
  const result = putOnPiece(state, ANNA, "mainHand", "stick");
  assert.equal(result.refusal, "notInChest");
  assert.deepEqual(result.state, before);
  assert.deepEqual(state, before);
});

test("a put on refused where the item does not fit the slot, the stick in a pocket", () => {
  const state = twoCharacters({ stick: 1 });
  const result = putOnPiece(state, ANNA, "pocket1", "stick");
  assert.equal(result.refusal, "wrongPlace");
  assert.deepEqual(result.state, state);
});

test("a put on refused for a slot the gear does not have", () => {
  const result = putOnPiece(twoCharacters({ stick: 1 }), ANNA, "tail", "stick");
  assert.equal(result.refusal, "noSlot");
});

test("a put on refused for a character the team does not have", () => {
  const result = putOnPiece(
    twoCharacters({ stick: 1 }),
    99,
    "mainHand",
    "stick",
  );
  assert.equal(result.refusal, "noCharacter");
});

test("taking the stick off the main hand at the camp returns it to the chest and counts one gear change", () => {
  // decision: D-452 "A character's gear belongs to the character and stays at it between map runs, but for a death that D-190 says takes it; the player puts a piece of an item on from the chest on the screen Postać, and a piece taken off returns to the chest."
  // decision: D-463 "The game state counts at each character, from 0, the gear changes the player makes on the screen Postać (D-461): each putting on, exchanging and taking off of a piece counts one"
  const worn = putOnPiece(
    twoCharacters({ stick: 1 }),
    ANNA,
    "mainHand",
    "stick",
  ).state;
  const result = takeOffPiece(worn, ANNA, "mainHand");
  assert.equal(result.refusal, null);
  assert.deepEqual(result.state.team.chest.pieces, { stick: 1 });
  assert.equal(character(result.state, ANNA).gear.mainHand, null);
  assert.equal(character(result.state, ANNA).gearChanges, 2);
});

test("taking a piece off an empty slot is refused", () => {
  const state = twoCharacters({ stick: 1 });
  const result = takeOffPiece(state, ANNA, "mainHand");
  assert.equal(result.refusal, "emptySlot");
  assert.deepEqual(result.state, state);
});

test("taking a piece off is refused where the chest has no room, with the reason skrzynka pełna", () => {
  const worn = putOnPiece(
    twoCharacters({ stick: 1 }),
    ANNA,
    "mainHand",
    "stick",
  ).state;
  // The chest cap is 60 pieces; with 60 berries in it there is no room for the stick taken off.
  const full = {
    ...worn,
    team: { ...worn.team, chest: { pieces: { berry: 60 } } },
  };
  const result = takeOffPiece(full, ANNA, "mainHand");
  assert.equal(result.refusal, "chestFull");
  assert.equal(character(result.state, ANNA).gear.mainHand, "stick");
  assert.equal(result.state.team.chest.pieces.berry, 60);
});

test("the gear acts of a character refused beside its manual map run, going or paused", () => {
  const going = withManualRunOfAnna(twoCharacters({ stick: 2 }));
  assert.equal(
    putOnPiece(going, ANNA, "mainHand", "stick").refusal,
    "manualRun",
  );
  assert.equal(takeOffPiece(going, ANNA, "mainHand").refusal, "manualRun");
  const paused = setPaused(going, true).state;
  assert.equal(
    putOnPiece(paused, ANNA, "mainHand", "stick").refusal,
    "manualRun",
  );
  assert.equal(takeOffPiece(paused, ANNA, "mainHand").refusal, "manualRun");
});

test("the gear acts of another character go on beside the manual map run of Anna", () => {
  const going = withManualRunOfAnna(twoCharacters({ stick: 2 }));
  const put = putOnPiece(going, BOB, "mainHand", "stick");
  assert.equal(put.refusal, null);
  assert.equal(character(put.state, BOB).gear.mainHand, "stick");
  assert.equal(character(put.state, BOB).gearChanges, 1);
  const taken = takeOffPiece(put.state, BOB, "mainHand");
  assert.equal(taken.refusal, null);
  assert.deepEqual(taken.state.team.chest.pieces, { stick: 2 });
});

test("a put on in an earning loop leaves the chest at once and marks its slot as changed", () => {
  // decision: D-460 "While that map run goes on, a piece the player puts on at the character leaves the chest at once and returns to it at once where the player takes it off, and the piece that map run holds in a slot the player has not yet changed goes into no chest, and needs no room in it, until this merge."
  const looped = withLoopOfAnna(twoCharacters({ stick: 2 }));
  const result = putOnPiece(looped, BOB, "mainHand", "stick");
  assert.equal(result.refusal, null);
  assert.deepEqual(result.state.team.chest.pieces, { stick: 1 });
  assert.equal(character(result.state, BOB).gear.mainHand, "stick");
  assert.deepEqual(character(result.state, BOB).changedSlots, []);
  const annaLooped = putOnPiece(looped, ANNA, "mainHand", "stick");
  assert.equal(annaLooped.refusal, null);
  assert.deepEqual(annaLooped.state.team.chest.pieces, { stick: 1 });
  assert.deepEqual(character(annaLooped.state, ANNA).changedSlots, [
    "mainHand",
  ]);
  assert.equal(character(annaLooped.state, ANNA).gearChanges, 1);
});

test("a piece put on and taken off in an earning loop returns to the chest at once, the slot marked once", () => {
  // decision: D-460 "While that map run goes on, a piece the player puts on at the character leaves the chest at once and returns to it at once where the player takes it off, and the piece that map run holds in a slot the player has not yet changed goes into no chest, and needs no room in it, until this merge."
  const looped = withLoopOfAnna(twoCharacters({ stick: 1 }));
  const put = putOnPiece(looped, ANNA, "mainHand", "stick").state;
  const taken = takeOffPiece(put, ANNA, "mainHand");
  assert.equal(taken.refusal, null);
  assert.deepEqual(taken.state.team.chest.pieces, { stick: 1 });
  assert.equal(character(taken.state, ANNA).gear.mainHand, null);
  assert.deepEqual(character(taken.state, ANNA).changedSlots, ["mainHand"]);
  assert.equal(character(taken.state, ANNA).gearChanges, 2);
});

test("the return to the same item in an earning loop marks the slot as changed by the player", () => {
  const looped = withLoopOfAnna(twoCharacters({ stick: 1 }));
  const put = putOnPiece(looped, ANNA, "mainHand", "stick").state;
  const back = takeOffPiece(put, ANNA, "mainHand").state;
  const again = putOnPiece(back, ANNA, "mainHand", "stick");
  assert.equal(again.refusal, null);
  assert.deepEqual(character(again.state, ANNA).changedSlots, ["mainHand"]);
});

test("the map run going on in an earning loop keeps the gear it started with", () => {
  const looped = withLoopOfAnna(twoCharacters({ stick: 2 }));
  const runGear = structuredClone(looped.loops[ANNA].run.character.gear);
  const result = putOnPiece(looped, ANNA, "mainHand", "stick");
  assert.deepEqual(result.state.loops[ANNA].run.character.gear, runGear);
  assert.equal(result.state.loops[ANNA].run, looped.loops[ANNA].run);
});

/** The state with the chest of its team holding `pieces`. */
function withChest(state, pieces) {
  return {
    ...state,
    team: { ...state.team, chest: { pieces: { ...pieces } } },
  };
}

/** Anna with a stick put on at the camp, then in an earning loop, the chest then holding `pieces`. */
function loopHoldingStick(pieces) {
  const worn = putOnPiece(
    twoCharacters({ stick: 1 }),
    ANNA,
    "mainHand",
    "stick",
  ).state;
  return withChest(withLoopOfAnna(worn), pieces);
}

test("taking off in an earning loop the piece the map run going on holds puts nothing into the chest at once, and needs no room in it", () => {
  // decision: D-460 "While that map run goes on, a piece the player puts on at the character leaves the chest at once and returns to it at once where the player takes it off, and the piece that map run holds in a slot the player has not yet changed goes into no chest, and needs no room in it, until this merge."
  // decision: D-461 "Where the slot holds a piece that the map run going on of an earning loop holds, that piece goes to the chest by the merge at the end of that map run (D-460), not by this choice."
  // decision: D-453 "At a character in an earning loop the change acts from its next map run, while the map run going on keeps the gear it started with."
  for (const [label, pieces] of [
    ["an empty chest", {}],
    ["a full chest of 60 berries", { berry: 60 }],
  ]) {
    const looped = loopHoldingStick(pieces);
    assert.equal(
      looped.loops[ANNA].run.character.gear.mainHand,
      "stick",
      `${label}: precondition`,
    );
    const taken = takeOffPiece(looped, ANNA, "mainHand");
    assert.equal(taken.refusal, null, label);
    assert.deepEqual(taken.state.team.chest.pieces, pieces, label);
    assert.equal(character(taken.state, ANNA).gear.mainHand, null, label);
    assert.deepEqual(character(taken.state, ANNA).changedSlots, ["mainHand"]);
    assert.equal(character(taken.state, ANNA).gearChanges, 2, label);
    assert.equal(gearPick(looped, ANNA, "mainHand").takeOff, null, label);
  }
});

test("putting a piece on in an earning loop over the piece the map run going on holds takes one from the chest and puts the held one into none", () => {
  // decision: D-460 "While that map run goes on, a piece the player puts on at the character leaves the chest at once and returns to it at once where the player takes it off, and the piece that map run holds in a slot the player has not yet changed goes into no chest, and needs no room in it, until this merge."
  // decision: D-461 "Where the slot holds a piece that the map run going on of an earning loop holds, that piece goes to the chest by the merge at the end of that map run (D-460), not by this choice."
  // decision: D-453 "At a character in an earning loop the change acts from its next map run, while the map run going on keeps the gear it started with."
  const looped = loopHoldingStick({ stick: 2 });
  const put = putOnPiece(looped, ANNA, "mainHand", "stick");
  assert.equal(put.refusal, null);
  assert.deepEqual(put.state.team.chest.pieces, { stick: 1 });
  assert.equal(character(put.state, ANNA).gear.mainHand, "stick");
  assert.deepEqual(character(put.state, ANNA).changedSlots, ["mainHand"]);
  // The piece now in the slot is the player's own, so exchanging it returns it to the chest at once.
  const again = putOnPiece(put.state, ANNA, "mainHand", "stick");
  assert.deepEqual(again.state.team.chest.pieces, { stick: 1 });
});

test("a piece the player put on in an earning loop needs room in the chest to come off, and the pick says skrzynka pełna", () => {
  const looped = withLoopOfAnna(twoCharacters({ stick: 1, berry: 59 }));
  const put = putOnPiece(looped, ANNA, "mainHand", "stick").state;
  const full = withChest(put, { berry: 60 });
  assert.equal(takeOffPiece(full, ANNA, "mainHand").refusal, "chestFull");
  assert.equal(gearPick(full, ANNA, "mainHand").takeOff, "chestFull");
  const room = withChest(put, { berry: 59 });
  const taken = takeOffPiece(room, ANNA, "mainHand");
  assert.deepEqual(taken.state.team.chest.pieces, { berry: 59, stick: 1 });
});

test("Bob's earning loop beside a manual map run of Anna: Bob's act goes on, Anna's is refused", () => {
  const looped = startLoop(
    twoCharacters({ stick: 2 }),
    { mapId: "forestEdge", characterId: BOB },
    REAL_MS,
  ).state;
  const going = withManualRunOfAnna(looped);
  const bob = putOnPiece(going, BOB, "mainHand", "stick");
  assert.equal(bob.refusal, null);
  assert.deepEqual(bob.state.team.chest.pieces, { stick: 1 });
  assert.deepEqual(character(bob.state, BOB).changedSlots, ["mainHand"]);
  assert.equal(
    putOnPiece(going, ANNA, "mainHand", "stick").refusal,
    "manualRun",
  );
});

test("the act of the character of a manual map run is refused and leaves the whole state as it was", () => {
  const going = withManualRunOfAnna(twoCharacters({ stick: 2 }));
  const before = structuredClone(going);
  const result = takeOffPiece(going, ANNA, "mainHand");
  assert.equal(result.refusal, "manualRun");
  assert.deepEqual(going, before);
});

test("the pick of an empty main hand offers the sticks of the chest, and Zdejmij refuses with emptySlot", () => {
  const pick = gearPick(
    twoCharacters({ stick: 2, berry: 3 }),
    ANNA,
    "mainHand",
  );
  assert.deepEqual(pick, {
    options: [{ item: "stick", count: 2 }],
    takeOff: "emptySlot",
  });
});

test("the pick of a held main hand lets Zdejmij act, and offers the stick too", () => {
  const worn = putOnPiece(
    twoCharacters({ stick: 2 }),
    ANNA,
    "mainHand",
    "stick",
  ).state;
  const pick = gearPick(worn, ANNA, "mainHand");
  assert.deepEqual(pick, {
    options: [{ item: "stick", count: 1 }],
    takeOff: null,
  });
});

test("the pick of a slot refuses Zdejmij with chestFull where the chest has no room", () => {
  const worn = putOnPiece(
    twoCharacters({ stick: 1, berry: 59 }),
    ANNA,
    "mainHand",
    "stick",
  ).state;
  const full = {
    ...worn,
    team: { ...worn.team, chest: { pieces: { berry: 60 } } },
  };
  assert.equal(gearPick(full, ANNA, "mainHand").takeOff, "chestFull");
});

test("the pick beside a manual map run of the character refuses Zdejmij with manualRun", () => {
  const going = withManualRunOfAnna(twoCharacters({ stick: 1 }));
  assert.equal(gearPick(going, ANNA, "mainHand").takeOff, "manualRun");
});

test("the pick of an unknown character or slot is null", () => {
  assert.equal(gearPick(twoCharacters({}), 99, "mainHand"), null);
  assert.equal(gearPick(twoCharacters({}), ANNA, "tail"), null);
});

test("a created character starts with an empty gear and no gear change counted", () => {
  const state = createCharacter(newGame(), "Anna").state;
  assert.equal(character(state, ANNA).gearChanges, 0);
  assert.equal(character(state, ANNA).gear.mainHand, null);
});
