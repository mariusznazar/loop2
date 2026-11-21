import assert from "node:assert/strict";
import { test } from "node:test";
import {
  advanceMinutes,
  createCharacter,
  send,
  setProgram,
} from "../../dist/browser/sim/game.js";
import { ITEMS } from "../../dist/browser/sim/data/items.js";
import { buildSkills, runOnce } from "../../balance/engine.mjs";
import {
  always,
  explore,
  forestBest,
  forestDeepBest,
  forestDeepDecent,
  forestLoopWithStock,
  forestSettledPatrol,
  gather,
  healthBelow,
  itemBelow,
  program,
  walkTo,
} from "../sim/reference-programs.mjs";
import { newKnowingGame } from "../sim/understanding-fixture.mjs";

// The instrument runs a map run through the functions the game steps one with, so a seed sent
// through the game and run through the instrument must give the same map run: the same end minute,
// outcome, cause and practice, and the same backpack and loot, which come from the equipment the
// take list draws from the chest. Each case sends 40 real moments, 104729 ms apart from
// FIRST_REAL_MS, through the game's `send` and `advanceMinutes` with an Understanding that holds
// everything, and runs the seed each send took through the instrument.

const FIRST_REAL_MS = 1760000000000;
const MOMENT_STEP_MS = 104729;
const SEEDS_PER_CASE = 40;
/** A map run still open after this many game minutes counts as stopped at the cap. */
const CAP_MINUTES = 4000;

/**
 * The game as a player holds it before a send: the character "Ala" with the program, the chest
 * and the solved maps given, and the entries of `skills` laid over the skills of a new character.
 */
function readyGame({ program, chest, solvedMaps, skills = {} }) {
  let state = newKnowingGame();
  state = setProgram({ ...state, solvedMaps }, program).state;
  state = createCharacter(state, "Ala").state;
  const [character] = state.team.characters;
  return {
    ...state,
    team: {
      ...state.team,
      characters: [
        { ...character, skills: { ...character.skills, ...skills } },
      ],
      chest: { pieces: { ...chest } },
    },
  };
}

/** What the game made of the map run sent at the real moment: how it ended and what it held. */
function throughTheGame(ready, mapId, momentMs) {
  const sent = send(ready, { mapId, characterId: 1 }, momentMs).state;
  const { run } = advanceMinutes(sent, CAP_MINUTES).state;
  return {
    seed: sent.run.seed,
    enteredWith: sent.run.enteredWith,
    ended: {
      outcome: run.completion ? "solved" : run.death ? "death" : "cap",
      minute: run.minute,
      cause: run.death?.cause ?? null,
      practice: run.practice,
      backpack: run.character.backpack,
      loot: Object.fromEntries(
        (run.deposited ?? []).map(({ item, count }) => [item, count]),
      ),
    },
  };
}

/** The same fields from the instrument's result. */
function endOf(result) {
  const { outcome, minute, cause, practice, backpack, loot } = result;
  return { outcome, minute, cause, practice, backpack, loot };
}

/**
 * Sends the case's seeds through both ways and checks each pair of map runs for equality; gives
 * the set of the minutes the map runs ended in. `skills` is the skills as the game holds them,
 * `skillSpec` the same as the instrument is told them.
 */
function agrees({ mapId, program, chest, solvedMaps, skills, skillSpec }) {
  const ready = readyGame({ program, chest, solvedMaps, skills });
  const minutes = new Set();
  for (let index = 0; index < SEEDS_PER_CASE; index += 1) {
    const game = throughTheGame(
      ready,
      mapId,
      FIRST_REAL_MS + index * MOMENT_STEP_MS,
    );
    const instrument = runOnce({
      mapId,
      program,
      seed: game.seed,
      chest,
      capMinutes: CAP_MINUTES,
      ...(skillSpec && { skills: buildSkills(skillSpec) }),
    });
    assert.deepEqual(endOf(instrument), game.ended, `seed ${game.seed}`);
    minutes.add(game.ended.minute);
  }
  return minutes;
}

test("precondition: a program that takes eight sticks starts the map run with them, an empty chest leaves the backpack empty", () => {
  const withSticks = readyGame({
    program: forestLoopWithStock,
    chest: { stick: 8 },
    solvedMaps: ["forestEdge"],
  });
  const sent = send(withSticks, { mapId: "forest", characterId: 1 }, 1).state;
  assert.deepEqual(sent.run.enteredWith, [{ item: "stick", count: 8 }]);
  const emptyChest = readyGame({
    program: forestLoopWithStock,
    chest: {},
    solvedMaps: ["forestEdge"],
  });
  const none = send(emptyChest, { mapId: "forest", characterId: 1 }, 1).state;
  assert.deepEqual(none.run.enteredWith, []);
});

// invariant: instrument-game-agreement
test("on Las with the best program and an empty chest the instrument ends each seed as the game does", () => {
  const minutes = agrees({
    mapId: "forest",
    program: forestBest,
    chest: {},
    solvedMaps: ["forestEdge"],
  });
  // The map runs compared differ in length: the case is not forty copies of one.
  assert.ok(minutes.size > 1);
});

// invariant: instrument-game-agreement
test("on Las with the loop program and eight sticks in the chest the instrument ends each seed as the game does", () => {
  agrees({
    mapId: "forest",
    program: forestLoopWithStock,
    chest: { stick: 8 },
    solvedMaps: ["forestEdge"],
  });
});

// invariant: instrument-game-agreement
test("on Las — głębiej with its best program and its chest the instrument ends each seed as the game does", () => {
  agrees({
    mapId: "forestDeep",
    program: forestDeepBest,
    chest: { stick: 8, berry: 7 },
    solvedMaps: ["forestEdge", "forest"],
  });
});

// invariant: instrument-game-agreement
test("on Las — głębiej with its decent program and its chest the instrument ends each seed as the game does", () => {
  agrees({
    mapId: "forestDeep",
    program: forestDeepDecent,
    chest: { stick: 12, berry: 3 },
    solvedMaps: ["forestEdge", "forest"],
  });
});

// invariant: instrument-game-agreement
test("with practice and a bought rank the instrument ends each seed as the game does", () => {
  // 160 practice in gathering reaches three thresholds, so three points; the rank of "Obchód" costs
  // three, and the patrol program carries its patrol out only where the rank is bought.
  const minutes = agrees({
    mapId: "forest",
    program: forestSettledPatrol,
    chest: {},
    solvedMaps: ["forestEdge"],
    skills: { smallItemGathering: { practice: 160, ranks: { patrol: 1 } } },
    skillSpec: { practice: { smallItemGathering: 160 }, ranks: { patrol: 1 } },
  });
  assert.ok(minutes.size > 1);
});

// A program written out here, which gathers moss, crafts the bandage of it and dresses with it as soon
// as the health is hurt: the two verbs with an item as their target, carried out in a map run. It
// gathers as many pieces of moss as one making of the bandage uses, which the data hold (D-82).
const MOSS_FOR_BANDAGE = ITEMS.bandage.recipe.uses.find(
  (use) => use.item === "moss",
).count;
const DRESSING = program({
  groups: [
    {
      name: "Opatrunek",
      rules: [
        [healthBelow(100), { kind: "tend", item: "bandage" }],
        [itemBelow("bandage", 1), { kind: "craft", item: "bandage" }],
      ],
    },
    {
      name: "Zapasy",
      rules: [
        [itemBelow("moss", MOSS_FOR_BANDAGE), gather("moss")],
        [itemBelow("moss", MOSS_FOR_BANDAGE), walkTo("moss")],
        [always, explore],
      ],
    },
  ],
});

test("precondition: the program that gathers moss, crafts the bandage and dresses with it carries out both verbs on Las — głębiej", () => {
  const result = runOnce({
    mapId: "forestDeep",
    program: DRESSING,
    seed: 1,
    capMinutes: CAP_MINUTES,
  });
  assert.ok(result.minutesBy.craft > 0, "it crafted");
  assert.ok(result.minutesBy.tend > 0, "it dressed");
});

// invariant: instrument-game-agreement
test("on Las — głębiej with a program that gathers moss, crafts the bandage and dresses with it the instrument ends each seed as the game does", () => {
  const minutes = agrees({
    mapId: "forestDeep",
    program: DRESSING,
    chest: {},
    solvedMaps: ["forestEdge", "forest"],
  });
  assert.ok(minutes.size > 1);
});
