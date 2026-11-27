import assert from "node:assert/strict";
import { test } from "node:test";
import {
  advanceMinutes,
  createCharacter,
  send,
  setProgram,
} from "../../dist/browser/sim/game.js";
import { ITEMS } from "../../dist/browser/sim/data/items.js";
import { mapRunEnded, stepMinute } from "../../dist/browser/sim/run.js";
import {
  buildSkills,
  makeState,
  prerequisitesOf,
  runOnce,
  startOf,
} from "../../balance/engine.mjs";
import {
  always,
  explore,
  forestBandages,
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
 * and the solved maps given, the entries of `skills` laid over the skills of a new character and
 * the entries of `gear` laid over its empty gear.
 */
function readyGame({ program, chest, solvedMaps, skills = {}, gear = {} }) {
  let state = newKnowingGame();
  state = setProgram({ ...state, solvedMaps }, program).state;
  state = createCharacter(state, "Ala").state;
  const [character] = state.team.characters;
  return {
    ...state,
    team: {
      ...state.team,
      characters: [
        {
          ...character,
          skills: { ...character.skills, ...skills },
          gear: { ...character.gear, ...gear },
        },
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
function agrees({
  mapId,
  program,
  chest,
  solvedMaps,
  skills,
  skillSpec,
  gear,
}) {
  const ready = readyGame({ program, chest, solvedMaps, skills, gear });
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
      ...(gear && { gear }),
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
test("on Las — głębiej with its best program, its chest and a stick in the main hand the instrument ends each seed as the game does", () => {
  const minutes = agrees({
    mapId: "forestDeep",
    program: forestDeepBest,
    chest: { stick: 8, berry: 7 },
    solvedMaps: ["forestEdge", "forest"],
    gear: { mainHand: "stick" },
  });
  assert.ok(minutes.size > 1);
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

// The program that brings bandages from the chest and dresses with them, on Las — wataha with the
// branch „Ucisk” bought and a bandage in the first pocket. The chest holds more than the cap of 15
// pieces lets in, so the take list's order decides which piece stays behind.
const PACK_MAPS = ["forestEdge", "forest", "forestDeep"];
const BANDAGE_CHEST = { bandage: 4, stick: 8, berry: 7 };
const PRESSURE_RANK = { tending: { practice: 0, ranks: { pressure: 1 } } };

/** How many turns of combat the program spent on „Ucisk” in one map run, stepped by the game's own function. */
function pressureTurns(seed) {
  const skills = buildSkills({ ranks: { pressure: 1 } });
  const state = makeState({
    program: forestBandages,
    skills,
    gear: { pocket1: "bandage" },
    chest: BANDAGE_CHEST,
    solvedMaps: prerequisitesOf("forestPack"),
  });
  const started = startOf(state, "forestPack", seed, skills);
  let run = started.run;
  let turns = 0;
  while (!mapRunEnded(run) && run.minute < CAP_MINUTES) {
    const before = run;
    run = stepMinute(run, started.map, started.reduced).run;
    if (before.activeCombat && !run.activeCombat && run.lastCombat?.result)
      turns += run.lastCombat.result.exchanges.filter(
        ({ characterAction }) => characterAction?.action.kind === "pressure",
      ).length;
  }
  return turns;
}

test("precondition: the program of bandages takes the bandages first, so the berries are the pieces that give way to the cap of 15", () => {
  const ready = readyGame({
    program: forestBandages,
    chest: BANDAGE_CHEST,
    solvedMaps: PACK_MAPS,
  });
  const sent = send(ready, { mapId: "forestPack", characterId: 1 }, 1).state;
  // The game lists what entered in the order of its items, not of the take list: read the counts.
  assert.deepEqual(
    Object.fromEntries(
      sent.run.enteredWith.map(({ item, count }) => [item, count]),
    ),
    { bandage: 4, stick: 8, berry: 3 },
  );
});

test("precondition: the program of bandages dresses outside a fight and presses in one on Las — wataha, with the branch bought and a bandage in a pocket", () => {
  let pressed = 0;
  for (let seed = 1; seed <= 10; seed += 1) {
    const result = runOnce({
      mapId: "forestPack",
      program: forestBandages,
      seed,
      capMinutes: CAP_MINUTES,
      chest: BANDAGE_CHEST,
      skills: buildSkills({ ranks: { pressure: 1 } }),
      gear: { pocket1: "bandage" },
    });
    assert.ok(result.minutesBy.tend > 0, `seed ${seed} dressed`);
    if (pressureTurns(seed) > 0) pressed += 1;
  }
  assert.ok(pressed > 0, "some seed pressed in a fight");
});

// invariant: instrument-game-agreement
test("on Las — wataha with the program of bandages, its chest, the branch „Ucisk” bought and a bandage in a pocket the instrument ends each seed as the game does", () => {
  const minutes = agrees({
    mapId: "forestPack",
    program: forestBandages,
    chest: BANDAGE_CHEST,
    solvedMaps: PACK_MAPS,
    skills: PRESSURE_RANK,
    skillSpec: { ranks: { pressure: 1 } },
    gear: { pocket1: "bandage" },
  });
  assert.ok(minutes.size > 1);
});
