// A character's resurrection and when it is ready. The expectations come from the task
// rozliczenie-przejsc, To do 8 and 12 (question W1), which bind the tests of loop: a new character's
// resurrection is ready from the start (loop `sim.test.ts:2002`), and a moment equal to the moment of
// readiness counts as ready (loop `death.test.ts:77`-`81`).
import assert from "node:assert/strict";
import { test } from "node:test";
import {
  createCharacter,
  newGame,
  resurrectionReady,
} from "../../dist/public/sim/game.js";

/** A character of the team with the moment of its resurrection's readiness set by hand. */
function readyAt(resurrectionReadyAtMs) {
  const { characters } = createCharacter(newGame(), "Ala").state.team;
  return { ...characters[0], resurrectionReadyAtMs };
}

// invariant: resurrection-renewal
test("a resurrection is not ready before its moment, is ready at it and stays ready after it", () => {
  const character = readyAt(1_760_000_000_000);
  assert.equal(resurrectionReady(character, 1_759_999_999_999), false);
  assert.equal(resurrectionReady(character, 1_760_000_000_000), true);
  assert.equal(resurrectionReady(character, 1_760_000_000_001), true);
});

// invariant: resurrection-renewal
test("a moment of readiness below zero is ready at every moment from zero on", () => {
  const character = readyAt(-5);
  assert.equal(resurrectionReady(character, 0), true);
  assert.equal(resurrectionReady(character, -5), true);
  assert.equal(resurrectionReady(character, -6), false);
});

test("a new character's resurrection is ready from the start, at the first moment there is", () => {
  const { characters } = createCharacter(newGame(), "Ala").state.team;
  assert.equal(characters[0].resurrectionReadyAtMs, 0);
  assert.equal(resurrectionReady(characters[0], 0), true);
  assert.equal(resurrectionReady(characters[0], 1_760_000_000_000), true);
});

test("a new character is of generation 1, and a created second one too", () => {
  const first = createCharacter(newGame(), "Ala").state;
  const both = createCharacter(first, "Ola").state;
  assert.deepEqual(
    both.team.characters.map((character) => character.generation),
    [1, 1],
  );
});
