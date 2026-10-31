// The player's one team: creating its characters, its chest and sending its characters.
import assert from "node:assert/strict";
import { test } from "node:test";
import { MAPS } from "../../dist/public/sim/data/maps.js";
import { programFromRules } from "./program-fixture.mjs";
import {
  advanceMinutes,
  characterName,
  createCharacter,
  end,
  newGame,
  restart,
  send,
  setProgram,
} from "../../dist/public/sim/game.js";
import { newKnowingGame } from "./understanding-fixture.mjs";

const mapId = Object.keys(MAPS)[0];
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
  return createdIn(newGame(), names);
}

/** The same, from a game that knows everything: for a game that is sent and then passes time. */
function createdKnowing(...names) {
  return createdIn(newKnowingGame(), names);
}

// Generation 1 and a resurrection ready from the start: task rozliczenie-przejsc, To do 8.
test("a created character joins the end of the team's list as an elemental mage, in the order of creation", () => {
  const state = created("Ala", "Ola", "Ela");
  assert.deepEqual(state.team.characters, [
    {
      id: 1,
      name: "Ala",
      archetypeId: "elementalMage",
      traits: { carryingCapacity: 15 },
      skills: ZERO_SKILLS,
      generation: 1,
      resurrectionReadyAtMs: 0,
    },
    {
      id: 2,
      name: "Ola",
      archetypeId: "elementalMage",
      traits: { carryingCapacity: 15 },
      skills: ZERO_SKILLS,
      generation: 1,
      resurrectionReadyAtMs: 0,
    },
    {
      id: 3,
      name: "Ela",
      archetypeId: "elementalMage",
      traits: { carryingCapacity: 15 },
      skills: ZERO_SKILLS,
      generation: 1,
      resurrectionReadyAtMs: 0,
    },
  ]);
  assert.equal(state.nextCharacterId, 4);
});

test("two characters may share a name and stay two characters", () => {
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
  const state = created("  Ala ", "\tOla\n", " Ala Ma Kota ");
  assert.deepEqual(
    state.team.characters.map((character) => character.name),
    ["Ala", "Ola", "Ala Ma Kota"],
  );
  assert.equal(characterName("  Ala "), "Ala");
  assert.equal(characterName("Ala Ma Kota"), "Ala Ma Kota");
});

test("a name empty once trimmed creates no character", () => {
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
