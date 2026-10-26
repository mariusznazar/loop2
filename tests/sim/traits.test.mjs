import assert from "node:assert/strict";
import { test } from "node:test";
import {
  backpackCap,
  backpackCount,
  newBackpack,
  newTraits,
} from "../../dist/public/sim/character.js";
import { ITEMS } from "../../dist/public/sim/data/items.js";
import { MAPS } from "../../dist/public/sim/data/maps.js";
import { TRAITS } from "../../dist/public/sim/data/traits.js";
import {
  createCharacter,
  newGame,
  restart,
  send,
} from "../../dist/public/sim/game.js";
import { newMapRun } from "../../dist/public/sim/run.js";
import { programFromRules } from "./program-fixture.mjs";

// The numbers below are written out by hand: a new character carries carrying capacity 15 (D-64),
// and the backpack's cap counts the pieces of all items together.

const [mapId, forest] = Object.entries(MAPS)[0];
// The first character a new game creates takes the id 1.
const characterId = 1;
const SENT = { mapId, characterId };
const REAL_MS = 1760000000000;
const NO_RULES = programFromRules();

/** The backpack with every item at 0. */
function emptyBackpack() {
  return Object.fromEntries(Object.keys(ITEMS).map((id) => [id, 0]));
}

function sent() {
  return send(createCharacter(newGame(), "Ala").state, SENT, REAL_MS).state;
}

test("a sent map run's character carries carrying capacity 15 and an empty backpack with cap 15", () => {
  const { character } = sent().run;
  assert.deepEqual(character.traits, { carryingCapacity: 15 });
  assert.deepEqual(character.backpack, emptyBackpack());
  assert.equal(backpackCount(character.backpack), 0);
  assert.equal(backpackCap(character), 15);
});

test("every item of the data has a place in a new backpack", () => {
  assert.ok(Object.keys(ITEMS).length >= 4);
  assert.deepEqual(
    Object.keys(newBackpack()).sort(),
    Object.keys(ITEMS).sort(),
  );
});

test("the traits of a character are its own copy, not the data's object", () => {
  const { character } = sent().run;
  assert.notEqual(character.traits, TRAITS);
  assert.notEqual(newTraits(), newTraits());
  assert.deepEqual(newTraits(), { carryingCapacity: 15 });
  assert.equal(TRAITS.carryingCapacity, 15);
});

test("two sent map runs do not share a backpack", () => {
  const first = sent().run.character.backpack;
  const second = sent().run.character.backpack;
  assert.notEqual(first, second);
});

test("a restart keeps the traits of a character that carries other traits", () => {
  const game = sent();
  const other = {
    ...game,
    run: {
      ...game.run,
      character: { ...game.run.character, traits: { carryingCapacity: 4 } },
    },
  };
  const restarted = restart(other).state.run.character;
  assert.deepEqual(restarted.traits, { carryingCapacity: 4 });
  assert.equal(backpackCap(restarted), 4);
});

test("a restart gives the new map run an empty backpack", () => {
  const game = sent();
  const [first] = Object.keys(ITEMS);
  const filled = {
    ...game,
    run: {
      ...game.run,
      character: {
        ...game.run.character,
        backpack: { ...game.run.character.backpack, [first]: 6 },
      },
    },
  };
  const restarted = restart(filled).state.run.character;
  assert.deepEqual(restarted.backpack, emptyBackpack());
});

test("the count of a hand-made backpack is the pieces of all items together", () => {
  const backpack = { ...emptyBackpack(), stick: 5, berry: 10 };
  assert.equal(backpackCount(backpack), 15);
  assert.equal(backpackCount({ ...emptyBackpack(), moss: 2, fiber: 5 }), 7);
  assert.equal(backpackCount(emptyBackpack()), 0);
});

test("the cap of a hand-made character is its carrying capacity", () => {
  assert.equal(backpackCap({ traits: { carryingCapacity: 9 } }), 9);
  assert.equal(backpackCap({ traits: { carryingCapacity: 0 } }), 0);
});

test("newMapRun takes the traits it is given, and a new character's without them", () => {
  const given = newMapRun(forest, 1, NO_RULES, SENT, {
    carryingCapacity: 3,
  }).run;
  assert.deepEqual(given.character.traits, { carryingCapacity: 3 });
  const absent = newMapRun(forest, 1, NO_RULES, SENT).run;
  assert.deepEqual(absent.character.traits, { carryingCapacity: 15 });
  assert.deepEqual(absent.character.backpack, emptyBackpack());
});

test("a created character carries carrying capacity 15 in the team", () => {
  const { characters } = createCharacter(newGame(), "Ala").state.team;
  assert.deepEqual(characters[0].traits, { carryingCapacity: 15 });
  const second = createCharacter(createCharacter(newGame(), "Ala").state, "Ola")
    .state.team.characters;
  assert.notEqual(second[0].traits, second[1].traits);
  assert.notEqual(second[0].traits, TRAITS);
});

/** A game whose team's only character carries carrying capacity 4. */
function withCarrier() {
  const game = createCharacter(newGame(), "Ala").state;
  const [character] = game.team.characters;
  return {
    ...game,
    team: {
      ...game.team,
      characters: [{ ...character, traits: { carryingCapacity: 4 } }],
    },
  };
}

test("the map run of a sent character carries that character's traits, also where they differ from a new character's", () => {
  const run = send(withCarrier(), SENT, REAL_MS).state.run;
  assert.equal(run.character.id, characterId);
  assert.deepEqual(run.character.traits, { carryingCapacity: 4 });
  assert.equal(backpackCap(run.character), 4);
});

test("the map run holds its own copy of the traits, so changing the team's traits leaves it alone", () => {
  const game = withCarrier();
  const run = send(game, SENT, REAL_MS).state.run;
  assert.notEqual(run.character.traits, game.team.characters[0].traits);
  const changed = {
    ...game,
    team: {
      ...game.team,
      characters: [
        { ...game.team.characters[0], traits: { carryingCapacity: 9 } },
      ],
    },
    run,
  };
  const restarted = restart(changed).state.run.character;
  assert.deepEqual(restarted.traits, { carryingCapacity: 4 });
  assert.equal(restarted.id, characterId);
});

test("the sending leaves the team's character as it was", () => {
  const game = withCarrier();
  const after = send(game, SENT, REAL_MS).state;
  assert.deepEqual(after.team, game.team);
});
