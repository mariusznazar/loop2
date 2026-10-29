import assert from "node:assert/strict";
import { test } from "node:test";
import {
  advanceMinutes,
  createCharacter,
  end,
  newGame,
  passRealTime,
  send,
  setPace,
  setProgram,
} from "../../dist/public/sim/game.js";
import {
  createProgram,
  deleteProgram,
  pickProgram,
} from "../../dist/public/sim/programs.js";
import {
  loadSavedGame,
  SAVED_GAME_VERSION,
  savedGame,
} from "../../dist/public/sim/saved-game.js";
import { programFromRules } from "./program-fixture.mjs";
import { newKnowingGame } from "./understanding-fixture.mjs";

// The saved document of the current version of the shape, written out by hand (spec, decision 2).
// It fills every optional branch of the game state the spec lists: a map run with a campfire, a
// burning item, a combat record, a copy whose program was deleted, a discovery held and counts
// beside the copy's rules; `HEADQUARTERS` below holds the counts beside a program of the list,
// which a game state holds only outside a map run. Its map run is written paused, so the load's
// pause changes nothing in it. A change of the game state's shape makes the load refuse this
// document; it is rewritten only together with a raised version.

/** A tile of Las — głębiej, whose game minutes to enter a tile are 5; `q` written out by hand. */
function tile(col, row, q, revealed, stock) {
  return { col, row, at: { q, r: row }, revealed, stepMinutes: 5, stock };
}

const PROGRAM_1 = {
  groups: [
    {
      id: 1,
      name: "Program",
      condition: { kind: "always" },
      rules: [
        { id: 1, condition: { kind: "always" }, action: { kind: "explore" } },
      ],
    },
  ],
  nextGroupId: 2,
  nextRuleId: 2,
};

const PROGRAM_3 = {
  groups: [
    {
      id: 1,
      name: "Program",
      condition: { kind: "always" },
      rules: [
        {
          id: 1,
          condition: { kind: "hereBelow", resource: "berry", value: 1 },
          action: { kind: "walkTo", resource: "berry" },
        },
      ],
    },
    {
      id: 2,
      name: "Noc",
      condition: { kind: "temperatureBelow", value: 35.5 },
      rules: [
        {
          id: 2,
          condition: { kind: "awayFromCampfire" },
          action: { kind: "walkToCampfire" },
        },
      ],
    },
  ],
  nextGroupId: 3,
  nextRuleId: 3,
};

/** The content of program 2 as the copy was taken from it; program 2 is deleted since. */
const COPY_BASE = {
  groups: [
    {
      id: 1,
      name: "Program",
      condition: { kind: "always" },
      rules: [
        { id: 1, condition: { kind: "always" }, action: { kind: "explore" } },
        {
          id: 2,
          condition: { kind: "itemBelow", item: "stick", value: 8 },
          action: { kind: "gather", resource: "stick" },
        },
        {
          id: 3,
          condition: { kind: "opponentHealthBelow", value: 30 },
          action: { kind: "strikeWithStick" },
        },
      ],
    },
  ],
  nextGroupId: 2,
  nextRuleId: 4,
};

/** The copy: its base with one rule the player added during the map run. */
const COPY_PROGRAM = {
  groups: [
    {
      ...COPY_BASE.groups[0],
      rules: [
        ...COPY_BASE.groups[0].rules,
        {
          id: 4,
          condition: { kind: "temperatureBelow", value: 36.5 },
          action: { kind: "lightItem" },
        },
      ],
    },
  ],
  nextGroupId: 2,
  nextRuleId: 5,
};

const DOCUMENT = {
  version: 1,
  game: {
    programs: [
      { id: 1, name: "Program", program: PROGRAM_1 },
      { id: 3, name: "Las nocą", program: PROGRAM_3 },
    ],
    nextProgramId: 4,
    pickedPrograms: { 2: 3 },
    // Program 2 is deleted; the records naming it find no program (D-165).
    lastUsedPrograms: { 1: 2 },
    lastEnteredProgram: 2,
    understanding: {
      actions: [
        "explore",
        "wander",
        "walkTo",
        "gather",
        "craftCampfire",
        "lightCampfire",
        "lightItem",
        "strikeWithStick",
        "kick",
        "dodge",
        "feedCampfire",
      ],
      conditions: [
        "always",
        "temperatureBelow",
        "hereBelow",
        "itemBelow",
        "satietyBelow",
        "healthBelow",
        "opponentHealthBelow",
        "natureEnergyBelow",
      ],
      items: ["stick", "berry", "campfire", "moss"],
      creatures: ["wolf"],
    },
    ruleCounts: { 1: 3, 2: 9, 3: 4, 4: 0 },
    countsProgram: null,
    team: {
      characters: [
        {
          id: 1,
          name: "Ala",
          archetypeId: "elementalMage",
          traits: { carryingCapacity: 15 },
        },
        {
          id: 2,
          name: "Ola",
          archetypeId: "elementalMage",
          traits: { carryingCapacity: 15 },
        },
      ],
      chest: { pieces: { stick: 2 } },
    },
    nextCharacterId: 3,
    run: {
      mapId: "forestDeep",
      seed: 204219582,
      minute: 212,
      tiles: [
        tile(0, 0, 0, false, { stick: 12 }),
        tile(1, 0, 1, true, { stick: 12, berry: 8 }),
        tile(2, 0, 2, false, {}),
        tile(3, 0, 3, false, { moss: 6 }),
        tile(4, 0, 4, false, { stick: 12, fiber: 6 }),
        tile(0, 1, 0, true, { berry: 3 }),
        tile(1, 1, 1, true, { stick: 0, moss: 6 }),
        tile(2, 1, 2, true, { stick: 11 }),
        tile(3, 1, 3, false, { berry: 8 }),
        tile(4, 1, 4, false, {}),
        tile(0, 2, -1, false, { fiber: 6 }),
        tile(1, 2, 0, true, {}),
        tile(2, 2, 1, false, { stick: 12 }),
        tile(3, 2, 2, false, { stick: 12, berry: 8 }),
        tile(4, 2, 3, false, {}),
        tile(0, 3, -1, false, { stick: 12 }),
        tile(1, 3, 0, false, { berry: 8, moss: 6 }),
        tile(2, 3, 1, false, {}),
        tile(3, 3, 2, false, { stick: 12 }),
        tile(4, 3, 3, false, { fiber: 6 }),
        tile(0, 4, -2, false, {}),
        tile(1, 4, -1, false, { stick: 12 }),
        tile(2, 4, 0, false, { berry: 8 }),
        tile(3, 4, 1, false, {}),
        tile(4, 4, 2, false, { stick: 12, moss: 6 }),
      ],
      character: {
        id: 1,
        at: { q: 1, r: 1 },
        traits: { carryingCapacity: 15 },
        backpack: { stick: 4, berry: 2, moss: 1, fiber: 0 },
      },
      body: { temperature: 36.4, satiety: 71.2, health: 65.85 },
      natureEnergy: 80.5,
      campfires: [{ at: { q: 1, r: 1 }, minutesLeft: 41 }],
      burningItems: [{ item: "stick", at: { q: 1, r: 1 }, minutesLeft: 2 }],
      current: {
        activity: {
          kind: "rule",
          ruleId: 2,
          action: { kind: "gather", resource: "stick" },
        },
        startMinute: 210,
        endMinute: 220,
        stepTo: null,
      },
      activeCombat: null,
      lastCombat: {
        creatureId: "wolf",
        attackMinute: 190,
        resolveMinute: 195,
        result: {
          characterHealth: 65,
          creatureHealth: 0,
          outcome: "creatureDefeated",
          exchanges: [
            {
              creatureAction: {
                kind: "strike",
                damage: 7,
                characterHealth: 86,
              },
              characterAction: {
                ruleId: 3,
                action: { kind: "strikeWithStick" },
                damage: 6,
                creatureHealth: 18,
                characterHealth: 86,
              },
            },
            {
              creatureAction: {
                kind: "strike",
                damage: 7,
                characterHealth: 79,
              },
              characterAction: null,
            },
            {
              creatureAction: {
                kind: "strike",
                damage: 7,
                characterHealth: 72,
              },
              characterAction: {
                ruleId: 3,
                action: { kind: "strikeWithStick" },
                damage: 6,
                creatureHealth: 12,
                characterHealth: 72,
              },
            },
            {
              creatureAction: {
                kind: "strike",
                damage: 7,
                characterHealth: 65,
              },
              characterAction: {
                ruleId: 3,
                action: { kind: "strikeWithStick" },
                damage: 6,
                creatureHealth: 6,
                characterHealth: 65,
              },
            },
            {
              creatureAction: { kind: "dodge" },
              characterAction: {
                ruleId: 3,
                action: { kind: "strikeWithStick" },
                damage: 6,
                creatureHealth: 0,
                characterHealth: 65,
              },
            },
          ],
          ruleStarts: { 3: 4 },
        },
      },
      attackRandom: 2654435769,
      attackCooldownStart: 195,
      wanderRandom: 1013904223,
      gatherRandom: 3141592653,
      // The rule the player added at game minute 196 set the streak and the defeated attacks to 0.
      streak: 16,
      defeatedAttacks: 0,
      death: null,
      completion: null,
      copy: {
        program: COPY_PROGRAM,
        programId: null,
        deletedName: "Program 2",
        base: COPY_BASE,
      },
    },
    lastSeed: 204219582,
    paused: true,
    solvedMaps: ["forest"],
    pace: 8,
    discovery: {
      actions: ["feedCampfire"],
      conditions: ["natureEnergyBelow"],
      items: [],
      creatures: [],
    },
    realMsCarry: 437.5,
  },
};

/** A document of the current version at the headquarters, its counts beside program 1. */
const HEADQUARTERS = {
  version: 1,
  game: {
    programs: [{ id: 1, name: "Program", program: PROGRAM_1 }],
    nextProgramId: 2,
    pickedPrograms: {},
    lastUsedPrograms: { 1: 1 },
    lastEnteredProgram: 1,
    understanding: {
      actions: ["explore", "wander"],
      conditions: ["always", "temperatureBelow"],
      items: [],
      creatures: [],
    },
    ruleCounts: { 1: 12 },
    countsProgram: 1,
    team: {
      characters: [
        {
          id: 1,
          name: "Ala",
          archetypeId: "elementalMage",
          traits: { carryingCapacity: 15 },
        },
      ],
      chest: { pieces: {} },
    },
    nextCharacterId: 2,
    run: null,
    lastSeed: 99,
    paused: false,
    solvedMaps: [],
    pace: 1,
    discovery: null,
    realMsCarry: 0,
  },
};

test("a document of the current version loads into the state it describes", () => {
  assert.deepEqual(loadSavedGame(structuredClone(DOCUMENT)), {
    ok: true,
    state: DOCUMENT.game,
  });
  assert.deepEqual(loadSavedGame(structuredClone(HEADQUARTERS)), {
    ok: true,
    state: HEADQUARTERS.game,
  });
});

test("the current version is the one the document of the current version is written with", () => {
  assert.equal(SAVED_GAME_VERSION, DOCUMENT.version);
});

/** A copy of `document` with `change` made to it. */
function changed(change, document = DOCUMENT) {
  const copy = structuredClone(document);
  change(copy);
  return copy;
}

/** A value nested `depth` arrays deep. */
function nested(depth) {
  let value = 1;
  for (let level = 0; level < depth; level += 1) value = [value];
  return value;
}

/** Freezes a value and everything it holds, so a write to it throws in strict code. */
function deepFreeze(value) {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const inner of Object.values(value)) deepFreeze(inner);
  }
  return value;
}

function assertRefused(name, document, reason) {
  let result;
  assert.doesNotThrow(() => {
    result = loadSavedGame(document);
  }, `${name}: the load threw`);
  assert.deepEqual(result, { ok: false, reason }, name);
}

test("a map run that goes on comes back paused, at its game minute, pace and carried real time", () => {
  const going = changed((document) => {
    document.game.paused = false;
    document.game.discovery = null;
  });
  const loaded = loadSavedGame(going);
  assert.equal(loaded.ok, true);
  assert.equal(loaded.state.paused, true);
  assert.equal(loaded.state.run.minute, 212);
  assert.equal(loaded.state.pace, 8);
  assert.equal(loaded.state.realMsCarry, 437.5);
  assert.deepEqual(loaded.state, { ...going.game, paused: true });
});

test("a map run that ended comes back as it ended", () => {
  const died = changed((document) => {
    document.game.paused = false;
    document.game.discovery = null;
    document.game.realMsCarry = 0;
    document.game.run.death = { minute: 212, cause: "cold" };
  });
  assert.deepEqual(loadSavedGame(died), { ok: true, state: died.game });
  const completed = changed((document) => {
    document.game.paused = false;
    document.game.realMsCarry = 0;
    document.game.run.completion = { minute: 212 };
  });
  assert.deepEqual(loadSavedGame(completed), {
    ok: true,
    state: completed.game,
  });
});

test("a map run moving the character to a neighbouring tile loads with the move", () => {
  const moving = changed((document) => {
    document.game.run.current = {
      activity: { kind: "rule", ruleId: 1, action: { kind: "wander" } },
      startMinute: 210,
      endMinute: 215,
      stepTo: { q: 2, r: 1 },
    };
  });
  assert.deepEqual(loadSavedGame(moving), { ok: true, state: moving.game });
});

test("the load changes nothing passed to it, and the state it gives shares nothing with it", () => {
  const before = structuredClone(DOCUMENT);
  const frozen = deepFreeze(structuredClone(DOCUMENT));
  assert.equal(loadSavedGame(frozen).ok, true);
  assert.deepEqual(frozen, before);
  const refused = changed((document) => (document.game.pace = 3));
  const refusedBefore = structuredClone(refused);
  assertRefused("a refused frozen document", deepFreeze(refused), "shape");
  assert.deepEqual(refused, refusedBefore);
  const passed = structuredClone(DOCUMENT);
  const { state } = loadSavedGame(passed);
  passed.game.run.tiles[0].stock.stick = 1;
  passed.game.programs[0].program.groups[0].rules.pop();
  passed.game.team.characters[0].traits.carryingCapacity = 3;
  passed.game.run.copy.base.groups[0].rules[1].condition.value = 2;
  assert.deepEqual(state, DOCUMENT.game);
});

// invariant: save-version
test("a document of another version is refused as version, whatever its game holds", () => {
  for (const version of [0, 2, -1]) {
    assertRefused(
      `version ${version}`,
      { ...structuredClone(DOCUMENT), version },
      "version",
    );
  }
  assertRefused(
    "version 2 of another shape",
    { version: 2, game: "Las" },
    "version",
  );
  assertRefused(
    "version 2 with an archetype absent from the data",
    changed((document) => {
      document.version = 2;
      document.game.team.characters[1].archetypeId = "fireMage";
    }),
    "version",
  );
});

// invariant: save-version
test("a document whose character's archetype the data lacks is refused as archetype", () => {
  for (const archetypeId of ["fireMage", "toString", "__proto__"]) {
    assertRefused(
      archetypeId,
      changed((document) => {
        document.game.team.characters[1].archetypeId = archetypeId;
      }),
      "archetype",
    );
  }
  assertRefused(
    "an absent archetype beside another fault of shape",
    changed((document) => {
      document.game.team.characters[0].archetypeId = "fireMage";
      document.game.pace = 3;
    }),
    "archetype",
  );
});

// invariant: save-version
test("a value that is no object with a whole version is refused as shape", () => {
  const { game } = structuredClone(DOCUMENT);
  const cases = {
    null: null,
    undefined: undefined,
    "a number": 1,
    "a text": JSON.stringify(DOCUMENT),
    "a list": [1, game],
    "no version": { game },
    "a version as text": { version: "1", game },
    "a fractional version": { version: 1.5, game },
    "a version not a number": { version: NaN, game },
    "a version beyond the safe integers": { version: 1e300, game },
  };
  for (const [name, document] of Object.entries(cases))
    assertRefused(name, document, "shape");
});

/** An own data key named `__proto__`, as JSON.parse makes it, not the prototype. */
function defineProto(object, value) {
  Object.defineProperty(object, "__proto__", {
    value,
    enumerable: true,
    writable: true,
    configurable: true,
  });
}

/** Crafted documents of the current version, each refused whole as shape. */
const CRAFTED = {
  // Keys exactly: none missing.
  "the game missing": (document) => delete document.game,
  "the pace missing": (document) => delete document.game.pace,
  "the streak missing": (document) => delete document.game.run.streak,
  "a tile's stock missing": (document) =>
    delete document.game.run.tiles[3].stock,
  "a rule's action missing": (document) =>
    delete document.game.run.copy.program.groups[0].rules[1].action,
  // Keys exactly: none added.
  "a key beside the version and the game": (document) =>
    (document.savedAtMs = 1760000000000),
  "a key added to the game": (document) => (document.game.gold = 100),
  "a key added to the map run": (document) => (document.game.run.speed = 2),
  "a key added to a character": (document) =>
    (document.game.team.characters[0].level = 9),
  "a key added to a rule of a program": (document) =>
    (document.game.programs[0].program.groups[0].rules[0].note = "x"),
  "a key added to a condition of the copy": (document) =>
    (document.game.run.copy.program.groups[0].rules[1].condition.extra = 1),
  "a key added to a tile": (document) =>
    (document.game.run.tiles[0].height = 2),
  "a key added to a list": (document) =>
    (document.game.solvedMaps.extra = "forestDeep"),
  // Own keys only, `__proto__` included, as JSON.parse gives it.
  "the document with an own __proto__": (document) => defineProto(document, {}),
  "the pace given as an own __proto__ holding it": (document) => {
    delete document.game.pace;
    defineProto(document.game, { pace: 8 });
  },
  "a tile's stock with an own __proto__": (document) =>
    (document.game.run.tiles[1].stock = JSON.parse(
      '{"stick":12,"__proto__":{"berry":8}}',
    )),
  "a pick by the key __proto__": (document) =>
    (document.game.pickedPrograms = JSON.parse('{"__proto__":3}')),
  "the counts with an own __proto__": (document) =>
    (document.game.ruleCounts = JSON.parse(
      '{"1":3,"2":9,"3":4,"4":0,"__proto__":{"5":1}}',
    )),
  "a condition of a program with an own __proto__": (document) =>
    (document.game.programs[0].program.groups[0].condition = JSON.parse(
      '{"kind":"always","__proto__":{"kind":"satietyBelow"}}',
    )),
  "the pace inherited, not own": (document) => {
    delete document.game.pace;
    Object.setPrototypeOf(document.game, { pace: 8 });
  },
  "the map run of another prototype": (document) =>
    Object.setPrototypeOf(document.game.run, Array.prototype),
  // Numbers finite, and safe integers for identities, counts and minutes.
  "the carried real time infinite": (document) =>
    (document.game.realMsCarry = Infinity),
  "the carried real time a whole second": (document) =>
    (document.game.realMsCarry = 1000),
  "the health not a number": (document) =>
    (document.game.run.body.health = NaN),
  "the nature energy minus infinity": (document) =>
    (document.game.run.natureEnergy = -Infinity),
  "the nature energy above its cap": (document) =>
    (document.game.run.natureEnergy = 100.5),
  "the next program number unsafe": (document) =>
    (document.game.nextProgramId = 2 ** 53),
  "the game minute huge": (document) => (document.game.run.minute = 1e300),
  "the game minute fractional": (document) =>
    (document.game.run.minute = 212.5),
  "the seed beyond 32 bits": (document) => (document.game.run.seed = 2 ** 32),
  "a generator state below 0": (document) =>
    (document.game.run.attackRandom = -1),
  "a count of the backpack below 0": (document) =>
    (document.game.run.character.backpack.stick = -1),
  "a count of the counts as text": (document) =>
    (document.game.ruleCounts[2] = "9"),
  "a number of a condition off its step": (document) =>
    (document.game.run.copy.base.groups[0].rules[1].condition.value = 8.5),
  // Values on their closed lists.
  "a pace off the data's paces": (document) => (document.game.pace = 3),
  "a cause of death off its list": (document) => {
    document.game.paused = false;
    document.game.discovery = null;
    document.game.run.death = { minute: 212, cause: "drowned" };
  },
  "an outcome of combat off its list": (document) =>
    (document.game.run.lastCombat.result.outcome = "fled"),
  "a condition kind off the list": (document) =>
    (document.game.programs[1].program.groups[1].condition = {
      kind: "nightFalls",
    }),
  "an action kind off the list": (document) =>
    (document.game.run.copy.program.groups[0].rules[0].action = {
      kind: "teleport",
    }),
  "an activity kind off its list": (document) =>
    (document.game.run.current.activity = { kind: "sleep" }),
  "a creature's action off its list": (document) =>
    (document.game.run.lastCombat.result.exchanges[4].creatureAction = {
      kind: "howl",
    }),
  "a non-combat action in a combat record": (document) =>
    (document.game.run.lastCombat.result.exchanges[0].characterAction.action = {
      kind: "explore",
    }),
  "the pause as text": (document) => (document.game.paused = "true"),
  // Identifiers present in the data.
  "a map absent from the data": (document) =>
    (document.game.run.mapId = "desert"),
  "a solved map absent from the data": (document) =>
    (document.game.solvedMaps = ["forest", "desert"]),
  "a resource absent from the data": (document) =>
    (document.game.run.tiles[2].stock = { gold: 3 }),
  "an item absent from the backpack's items": (document) => {
    delete document.game.run.character.backpack.fiber;
    document.game.run.character.backpack.sword = 0;
  },
  "an item absent from the data in the Understanding": (document) =>
    document.game.understanding.items.push("sword"),
  "an item named twice in the Understanding": (document) =>
    document.game.understanding.items.push("stick"),
  "the Understanding without „Zawsze”": (document) =>
    document.game.understanding.conditions.shift(),
  "a creature absent from the data": (document) =>
    (document.game.run.lastCombat.creatureId = "bear"),
  "the campfire burning as an item": (document) =>
    (document.game.run.burningItems[0].item = "campfire"),
  "a resource of a program absent from the data": (document) =>
    (document.game.programs[1].program.groups[0].rules[0].action.resource =
      "gold"),
  // References the simulation follows.
  "the map run's character not in the team": (document) =>
    (document.game.run.character.id = 9),
  "two characters of one number": (document) =>
    (document.game.team.characters[1].id = 1),
  "a character's number reaching the next one": (document) =>
    (document.game.nextCharacterId = 2),
  "two programs of one number": (document) =>
    (document.game.programs[1].id = 1),
  "a program's number reaching the next one": (document) =>
    (document.game.nextProgramId = 3),
  "two programs of one name, letter case aside": (document) =>
    (document.game.programs[1].name = "PROGRAM"),
  "no program on the list": (document) => (document.game.programs = []),
  "the copy's program not on the list": (document) => {
    document.game.run.copy.programId = 2;
    document.game.run.copy.deletedName = null;
  },
  "the copy of a deleted program without its name": (document) =>
    (document.game.run.copy.deletedName = null),
  "the copy of a listed program with a deleted name": (document) =>
    (document.game.run.copy.programId = 3),
  "a pick for a character not in the team": (document) =>
    (document.game.pickedPrograms = { 9: 3 }),
  "a pick of a program number never given": (document) =>
    (document.game.pickedPrograms = { 2: 4 }),
  "a pick by a key that is no number": (document) =>
    (document.game.pickedPrograms = { Ola: 3 }),
  "counts beside a program during a map run": (document) =>
    (document.game.countsProgram = 1),
  "counts lacking a rule of the copy": (document) =>
    delete document.game.ruleCounts[4],
  "counts of a rule the copy lacks": (document) =>
    (document.game.ruleCounts[7] = 0),
  "the character off the map's tiles": (document) =>
    (document.game.run.character.at = { q: 9, r: 9 }),
  "a campfire off the map's tiles": (document) =>
    (document.game.run.campfires[0].at = { q: -5, r: 0 }),
  "two campfires on one tile": (document) =>
    document.game.run.campfires.push({ at: { q: 1, r: 1 }, minutesLeft: 0 }),
  "a move to a tile no neighbour of the character's": (document) =>
    (document.game.run.current = {
      activity: { kind: "rule", ruleId: 1, action: { kind: "wander" } },
      startMinute: 210,
      endMinute: 215,
      stepTo: { q: 3, r: 1 },
    }),
  "a tile at other coordinates than its place": (document) =>
    (document.game.run.tiles[6].at = { q: 2, r: 1 }),
  "a death in another game minute than the map run's": (document) => {
    document.game.paused = false;
    document.game.discovery = null;
    document.game.run.death = { minute: 100, cause: "cold" };
  },
  "a combat going on without the activity cleared": (document) =>
    (document.game.run.activeCombat = {
      creatureId: "wolf",
      attackMinute: 211,
      resolveMinute: 216,
    }),
  "a discovery held without a map run": (document) => {
    document.game.run = null;
    document.game.paused = false;
    document.game.realMsCarry = 0;
    document.game.ruleCounts = null;
  },
  // The tile count of the map's layout.
  "a tile fewer than the map's layout": (document) =>
    document.game.run.tiles.pop(),
  "a tile more than the map's layout": (document) =>
    document.game.run.tiles.push(tile(0, 5, -2, false, {})),
  "the tiles of Las on Las — głębiej": (document) =>
    (document.game.run.tiles = document.game.run.tiles.slice(0, 16)),
  // Deep nesting where a value stands.
  "the pace nested deep": (document) => (document.game.pace = nested(100000)),
  "a tile's stock nested deep": (document) =>
    (document.game.run.tiles[0].stock = { stick: nested(100000) }),
  "the groups of a program nested deep": (document) =>
    (document.game.programs[0].program.groups = nested(100000)),
};

// invariant: save-version
test("a crafted document of the current version is refused whole as shape", () => {
  for (const [name, change] of Object.entries(CRAFTED))
    assertRefused(name, changed(change), "shape");
});

test("the saved document of a state is the current version beside a copy of the state, shared nowhere", () => {
  const state = structuredClone(DOCUMENT.game);
  const document = savedGame(deepFreeze(state));
  assert.deepEqual(document, DOCUMENT);
  document.game.run.tiles[0].stock.stick = 1;
  document.game.programs[0].program.groups[0].rules.pop();
  document.game.understanding.items.pop();
  assert.deepEqual(state, DOCUMENT.game);
});

// Game states the simulation makes, saved and loaded: the load admits what the game plays.
const ALWAYS = { kind: "always" };
const FIGHTING = programFromRules(
  { condition: ALWAYS, action: { kind: "kick" } },
  { condition: ALWAYS, action: { kind: "explore" } },
  { condition: ALWAYS, action: { kind: "gather", resource: "stick" } },
  { condition: ALWAYS, action: { kind: "wander" } },
);
// On this real time the wolf attacks in Las — głębiej and the kicking mage dies in that combat.
const REAL_MS = 1760000000008;

/** Two characters and two programs; the first character in Las at 4×, 155 game minutes in. */
function played() {
  let state = setProgram(newKnowingGame(), FIGHTING).state;
  state = createCharacter(state, "Ala").state;
  state = createCharacter(state, " Ola ").state;
  state = createProgram(state).state;
  state = setPace(state, 4).state;
  state = send(state, { mapId: "forest", characterId: 1 }, REAL_MS).state;
  state = advanceMinutes(state, 150).state;
  // 1300 ms at 4× is 5 game minutes and 200 ms carried.
  return passRealTime(state, 1300).state;
}

/** The first character sent to Las — głębiej, moved on minute by minute until `until` holds. */
function deeper(until) {
  let state = setProgram(
    { ...newKnowingGame(), solvedMaps: ["forest"] },
    FIGHTING,
  ).state;
  state = createCharacter(state, "Ala").state;
  state = send(state, { mapId: "forestDeep", characterId: 1 }, REAL_MS).state;
  for (let minute = 0; minute < 600 && !until(state.run); minute += 1)
    state = advanceMinutes(state, 1).state;
  return state;
}

test("a game state the simulation made loads back from its saved document", () => {
  const ended = end(played()).state;
  const states = {
    "a new game": { state: newGame(), goesOn: false },
    "a map run going on": { state: played(), goesOn: true },
    "a map run whose copy's program was deleted": {
      state: deleteProgram(played(), 1).state,
      goesOn: true,
    },
    "the headquarters after „Zakończ”, the counts beside a program": {
      state: ended,
      goesOn: false,
    },
    "a program picked on a row": {
      state: pickProgram(ended, 2, 2).state,
      goesOn: false,
    },
    "an attack going on": {
      state: deeper((run) => run.activeCombat !== null),
      goesOn: true,
    },
    "a death in combat": {
      state: deeper((run) => run.death !== null),
      goesOn: false,
    },
  };
  // Preconditions: each state holds what its name says.
  assert.equal(states["a map run going on"].state.realMsCarry, 200);
  assert.equal(
    states["a map run whose copy's program was deleted"].state.run.copy
      .programId,
    null,
  );
  assert.equal(
    states["the headquarters after „Zakończ”, the counts beside a program"]
      .state.countsProgram,
    1,
  );
  assert.notEqual(states["an attack going on"].state.run.activeCombat, null);
  assert.equal(states["a death in combat"].state.run.death.cause, "combat");
  for (const [name, { state, goesOn }] of Object.entries(states)) {
    assert.deepEqual(
      loadSavedGame(savedGame(state)),
      { ok: true, state: goesOn ? { ...state, paused: true } : state },
      name,
    );
  }
});
