import assert from "node:assert/strict";
import { test } from "node:test";
import {
  advanceMinutes,
  createCharacter,
  end,
  newGame,
  passRealTime,
  restart,
  send,
  setPace,
  setProgram,
  settleDeath,
} from "../../dist/public/sim/game.js";
import {
  createProgram,
  deleteProgram,
  editProgram,
  emptyProgram,
  pickProgram,
} from "../../dist/public/sim/programs.js";
import {
  loadSavedGame,
  SAVED_GAME_VERSION,
  savedGame,
} from "../../dist/public/sim/saved-game.js";
import { buyBranch } from "../../dist/public/sim/skills.js";
import { programFromRules } from "./program-fixture.mjs";
import { newKnowingGame } from "./understanding-fixture.mjs";

// The saved document of version 1 of the shape stays below as it was, written out by hand; the
// game refuses it as another version. The document of the current version, version 2, is that one
// with the mark `solvedMapRun` added to its map run (spec, decisions 1 and 9); its map run is on
// forestDeep, which `solvedMaps` lacks, so the mark is false. The document fills every optional
// branch of the game state the spec lists: a map run with a campfire, a burning item, a combat
// record, a copy whose program was deleted, a discovery held and counts beside the copy's rules;
// and those of trip plans and character skills: trip lists in programs, the copy changed from its
// frozen bring plan, a chest, known trees, practice of the map run and of its combat, and ranks
// bought. `HEADQUARTERS` below holds the counts beside a program of the list, which a game state
// holds only outside a map run. Its map run is written paused, so the load's pause changes nothing
// in it. A change of the game state's shape makes the load refuse this document; it is rewritten
// only together with a raised version, or while no saved game state of the current version exists
// anywhere. The characters of the current version's documents also hold `generation` and
// `resurrectionReadyAtMs` (spec, decision 9), and their map runs `deathSettlement`, null on the map
// run below, which goes on (spec, decisions 5 and 9); both are written into version 2 under that
// exception: version 2 is on no server yet, so no saved game state of it exists. The document of
// version 1 keeps its characters and its map run without them.

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
  tripPlan: { take: [], bring: [] },
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
        {
          id: 3,
          condition: { kind: "itemBelow", item: "berry", value: 12 },
          action: { kind: "patrol", resource: "berry" },
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
  nextRuleId: 4,
  tripPlan: {
    take: [{ item: "berry", count: 2 }],
    bring: [{ item: "stick", count: 12 }],
  },
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
  tripPlan: {
    take: [{ item: "stick", count: 4 }],
    bring: [
      { item: "berry", count: 5 },
      { item: "stick", count: 20 },
    ],
  },
};

/**
 * The copy: its base with one rule the player added during the map run, and moss added to its bring
 * list, which comes out only from the next map run (D-179).
 */
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
  tripPlan: {
    take: [{ item: "stick", count: 4 }],
    bring: [
      { item: "berry", count: 5 },
      { item: "stick", count: 20 },
      { item: "moss", count: 3 },
    ],
  },
};

/**
 * Ala's character skills: a skill of each predisposition of her archetype, practice gathered and
 * ranks bought within the points the reached thresholds give — Eksploracja 50 reaches 15 and 45,
 * two points, both spent on Wprawny krok; Zbieranie 85 reaches 30 and 80, one of two spent on
 * Wprawne oko; Płomyk 6 reaches 2 and 6, one of two spent on Szybka ręka.
 */
const ALA_SKILLS = {
  exploration: { practice: 50, ranks: { practicedStep: 2 } },
  smallItemGathering: { practice: 85, ranks: { keenEye: 1 } },
  campfireCrafting: { practice: 12, ranks: {} },
  eating: { practice: 0, ranks: {} },
  flameSpell: { practice: 6, ranks: { quickHand: 1 } },
  oneHandedCombat: { practice: 31, ranks: {} },
  kicking: { practice: 0, ranks: {} },
  dodging: { practice: 0, ranks: {} },
};

/** The character skills of a new character: each predisposition, no practice and no rank. */
const NEW_SKILLS = {
  exploration: { practice: 0, ranks: {} },
  smallItemGathering: { practice: 0, ranks: {} },
  campfireCrafting: { practice: 0, ranks: {} },
  eating: { practice: 0, ranks: {} },
  flameSpell: { practice: 0, ranks: {} },
  oneHandedCombat: { practice: 0, ranks: {} },
  kicking: { practice: 0, ranks: {} },
  dodging: { practice: 0, ranks: {} },
};

const DOCUMENT_V1 = {
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
      trees: [
        "exploration",
        "smallItemGathering",
        "campfireCrafting",
        "flameSpell",
        "oneHandedCombat",
        "kicking",
        "dodging",
      ],
      actions: [
        "explore",
        "wander",
        "walkTo",
        "gather",
        "patrol",
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
          skills: ALA_SKILLS,
        },
        {
          id: 2,
          name: "Ola",
          archetypeId: "elementalMage",
          traits: { carryingCapacity: 15 },
          skills: NEW_SKILLS,
        },
      ],
      // The chest held 6 sticks before the map run took 4; a key at 0 stays (D-179).
      chest: { pieces: { stick: 2, berry: 0 } },
    },
    nextCharacterId: 3,
    run: {
      // Exploration, gathering and the four strikes of the combat below that hit.
      practice: { exploration: 3, smallItemGathering: 5, oneHandedCombat: 4 },
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
        // The snapshot of Ala's skills at the map run's start (D-200).
        skills: ALA_SKILLS,
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
          practice: { oneHandedCombat: 4 },
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
      // The bring list of the copy's base, frozen at the map run's start (D-179).
      bringPlan: [
        { item: "berry", count: 5 },
        { item: "stick", count: 20 },
      ],
      deposited: null,
    },
    lastSeed: 204219582,
    paused: true,
    solvedMaps: ["forest"],
    pace: 8,
    discovery: {
      trees: [],
      actions: ["feedCampfire"],
      conditions: ["natureEnergyBelow"],
      items: [],
      creatures: [],
    },
    realMsCarry: 437.5,
  },
};

/**
 * The document of the current version: version 1 with the mark of its map run (forestDeep,
 * unsolved) and its characters' generation and moment of resurrection (Ala has lived a death with
 * no resurrection ready, so generation 2, and used her resurrection at a real moment of 2025).
 */
const DOCUMENT = {
  version: 2,
  game: {
    ...DOCUMENT_V1.game,
    team: {
      ...DOCUMENT_V1.game.team,
      characters: [
        {
          ...DOCUMENT_V1.game.team.characters[0],
          generation: 2,
          resurrectionReadyAtMs: 1760000028800000,
        },
        {
          ...DOCUMENT_V1.game.team.characters[1],
          generation: 1,
          resurrectionReadyAtMs: 0,
        },
      ],
    },
    run: {
      ...DOCUMENT_V1.game.run,
      solvedMapRun: false,
      deathSettlement: null,
    },
  },
};

/** A document of the current version at the headquarters, its counts beside program 1. */
const HEADQUARTERS = {
  version: 2,
  game: {
    programs: [{ id: 1, name: "Program", program: PROGRAM_1 }],
    nextProgramId: 2,
    pickedPrograms: {},
    lastUsedPrograms: { 1: 1 },
    lastEnteredProgram: 1,
    understanding: {
      trees: [],
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
          skills: NEW_SKILLS,
          generation: 1,
          resurrectionReadyAtMs: 0,
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

// The `save` the server hands back: exactly `version`, `revision` and `game` (spec, decision 1).
test("the server's save of the current version loads into the game it holds, its revision left out", () => {
  const save = {
    version: 2,
    revision: 3,
    game: structuredClone(DOCUMENT.game),
  };
  assert.deepEqual(loadSavedGame(save), { ok: true, state: DOCUMENT.game });
  assert.deepEqual(loadSavedGame({ ...save, version: 3 }), {
    ok: false,
    reason: "version",
  });
});

/** A copy of `document` with `change` made to it. */
function changed(change, document = DOCUMENT) {
  const copy = structuredClone(document);
  change(copy);
  return copy;
}

/** The solved maps a document needs for its map run to have completed: Las and its own map. */
function solvingItsMap(document) {
  document.game.solvedMaps = ["forest", "forestDeep"];
}

/**
 * The document's map run ended in a death in its game minute, settled as `settlement` gives; the
 * game no longer holds what only a map run going on holds.
 */
function dead(document, settlement = { kind: "resurrectionUsed" }) {
  document.game.paused = false;
  document.game.discovery = null;
  document.game.realMsCarry = 0;
  document.game.run.death = { minute: 212, cause: "cold" };
  document.game.run.deathSettlement = settlement;
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
  // Each kind of settlement of decision 5; Ala's generation is 2 in the document.
  const died = changed((document) => dead(document));
  assert.deepEqual(loadSavedGame(died), { ok: true, state: died.game });
  const lost = changed((document) =>
    dead(document, { kind: "progressLost", generation: 2 }),
  );
  assert.deepEqual(loadSavedGame(lost), { ok: true, state: lost.game });
  // Decision 5: the number of that death stays, however far the character has gone on since.
  const earlier = changed((document) => {
    dead(document, { kind: "progressLost", generation: 2 });
    document.game.team.characters[0].generation = 5;
  });
  assert.deepEqual(loadSavedGame(earlier), { ok: true, state: earlier.game });
  const completed = changed((document) => {
    document.game.paused = false;
    document.game.realMsCarry = 0;
    solvingItsMap(document);
    document.game.run.completion = { minute: 212 };
    // Out of the frozen bring list, in its order, each at most its count (D-179).
    document.game.run.deposited = [
      { item: "berry", count: 2 },
      { item: "stick", count: 4 },
    ];
  });
  assert.deepEqual(loadSavedGame(completed), {
    ok: true,
    state: completed.game,
  });
});

// invariant: solved-map-manual-run
test("a map run of a solved map comes back marked, and its completion with the empty deposit", () => {
  const marked = changed((document) => {
    solvingItsMap(document);
    document.game.run.solvedMapRun = true;
  });
  assert.deepEqual(loadSavedGame(marked), {
    ok: true,
    state: { ...marked.game, paused: true },
  });
  const completed = changed((document) => {
    solvingItsMap(document);
    document.game.paused = false;
    document.game.realMsCarry = 0;
    document.game.run.solvedMapRun = true;
    document.game.run.completion = { minute: 212 };
    document.game.run.deposited = [];
  });
  assert.deepEqual(loadSavedGame(completed), {
    ok: true,
    state: completed.game,
  });
  // A run begun before its map was solved and completed after it: unmarked, solved since.
  const first = changed((document) => {
    solvingItsMap(document);
    document.game.paused = false;
    document.game.realMsCarry = 0;
    document.game.run.completion = { minute: 212 };
    document.game.run.deposited = [];
  });
  assert.deepEqual(loadSavedGame(first), { ok: true, state: first.game });
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
test("a moment of resurrection below zero loads, as it is a safe integer of any sign", () => {
  const before = changed((document) => {
    document.game.team.characters[0].resurrectionReadyAtMs = -1500;
  });
  const loaded = loadSavedGame(before);
  assert.equal(loaded.ok, true);
  assert.equal(loaded.state.team.characters[0].resurrectionReadyAtMs, -1500);
});

// invariant: save-version
test("a document of another version is refused as version, whatever its game holds", () => {
  for (const version of [0, 3, -1]) {
    assertRefused(
      `version ${version}`,
      { ...structuredClone(DOCUMENT), version },
      "version",
    );
  }
  assertRefused(
    "version 3 of another shape",
    { version: 3, game: "Las" },
    "version",
  );
  assertRefused(
    "version 3 with an archetype absent from the data",
    changed((document) => {
      document.version = 3;
      document.game.team.characters[1].archetypeId = "fireMage";
    }),
    "version",
  );
});

// invariant: save-version
test("the document of version 1 is refused as version, whatever its game holds", () => {
  assert.equal(DOCUMENT_V1.version, 1);
  assertRefused(
    "the document of version 1",
    structuredClone(DOCUMENT_V1),
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
  "a key beside the version, the revision and the game": (document) => {
    document.revision = 3;
    document.savedAtMs = 1760000000000;
  },
  "a revision of 0": (document) => (document.revision = 0),
  "a revision below 0": (document) => (document.revision = -1),
  "a fractional revision": (document) => (document.revision = 2.5),
  "a revision as text": (document) => (document.revision = "3"),
  "a revision of none": (document) => (document.revision = null),
  "a revision beyond the safe integers": (document) =>
    (document.revision = 2 ** 53),
  "a wait holding a rule's number": (document) =>
    (document.game.run.current.activity = { kind: "wait", ruleId: 2 }),
  "a key added to the game": (document) => (document.game.gold = 100),
  "a key added to the map run": (document) => (document.game.run.speed = 2),
  "a key added to a character": (document) =>
    (document.game.team.characters[0].level = 9),
  // Decision 9: the generation is an identity from 1 up, the moment a safe integer of any sign.
  "a character without its generation": (document) =>
    delete document.game.team.characters[0].generation,
  "a character without its moment of resurrection": (document) =>
    delete document.game.team.characters[1].resurrectionReadyAtMs,
  "a generation of 0": (document) =>
    (document.game.team.characters[0].generation = 0),
  "a generation below 0": (document) =>
    (document.game.team.characters[0].generation = -1),
  "a fractional generation": (document) =>
    (document.game.team.characters[0].generation = 1.5),
  "a generation as text": (document) =>
    (document.game.team.characters[0].generation = "2"),
  "a generation of none": (document) =>
    (document.game.team.characters[0].generation = null),
  "a generation beyond the safe integers": (document) =>
    (document.game.team.characters[0].generation = 2 ** 53),
  "a moment of resurrection fractional": (document) =>
    (document.game.team.characters[0].resurrectionReadyAtMs = 1.5),
  "a moment of resurrection as text": (document) =>
    (document.game.team.characters[0].resurrectionReadyAtMs = "0"),
  "a moment of resurrection of none": (document) =>
    (document.game.team.characters[0].resurrectionReadyAtMs = null),
  "a moment of resurrection not a number": (document) =>
    (document.game.team.characters[0].resurrectionReadyAtMs = NaN),
  "a moment of resurrection infinite": (document) =>
    (document.game.team.characters[0].resurrectionReadyAtMs = Infinity),
  "a moment of resurrection beyond the safe integers": (document) =>
    (document.game.team.characters[0].resurrectionReadyAtMs = 2 ** 53),
  "a moment of resurrection below the safe integers": (document) =>
    (document.game.team.characters[0].resurrectionReadyAtMs = -(2 ** 53)),
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
    dead(document);
    document.game.run.death.cause = "drowned";
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
    dead(document);
    document.game.run.death.minute = 100;
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
  // Trip plans and the transfers of a map run (D-179, D-181).
  "a program without its trip plan": (document) =>
    delete document.game.programs[0].program.tripPlan,
  "a trip plan without its bring list": (document) =>
    delete document.game.run.copy.base.tripPlan.bring,
  "a key added to a trip plan's entry": (document) =>
    (document.game.programs[1].program.tripPlan.take[0].note = "x"),
  "an item twice on a trip list": (document) =>
    document.game.run.copy.program.tripPlan.bring.push({
      item: "berry",
      count: 1,
    }),
  "an item absent from the data on a trip list": (document) =>
    (document.game.programs[1].program.tripPlan.bring[0].item = "sword"),
  "a trip count of 0": (document) =>
    (document.game.programs[1].program.tripPlan.take[0].count = 0),
  "a fractional trip count": (document) =>
    (document.game.programs[1].program.tripPlan.take[0].count = 2.5),
  "a trip count beyond the safe integers": (document) =>
    (document.game.run.copy.program.tripPlan.take[0].count = 2 ** 53),
  "a trip count as text": (document) =>
    (document.game.programs[1].program.tripPlan.take[0].count = "2"),
  "the map run without its frozen bring plan": (document) =>
    delete document.game.run.bringPlan,
  "the map run without its deposit": (document) =>
    delete document.game.run.deposited,
  "an item twice on the frozen bring plan": (document) =>
    document.game.run.bringPlan.push({ item: "stick", count: 1 }),
  "a frozen bring count beyond the safe integers": (document) =>
    (document.game.run.bringPlan[0].count = 2 ** 53),
  "a deposit before a completion": (document) =>
    (document.game.run.deposited = []),
  "a completion without its deposit": (document) => {
    solvingItsMap(document);
    document.game.paused = false;
    document.game.realMsCarry = 0;
    document.game.run.completion = { minute: 212 };
  },
  "a deposit of an item the frozen bring plan lacks": (document) => {
    solvingItsMap(document);
    document.game.paused = false;
    document.game.realMsCarry = 0;
    document.game.run.completion = { minute: 212 };
    document.game.run.deposited = [{ item: "moss", count: 1 }];
  },
  "a deposit above its planned count": (document) => {
    solvingItsMap(document);
    document.game.paused = false;
    document.game.realMsCarry = 0;
    document.game.run.completion = { minute: 212 };
    document.game.run.deposited = [{ item: "stick", count: 21 }];
  },
  "a deposit out of the frozen bring plan's order": (document) => {
    solvingItsMap(document);
    document.game.paused = false;
    document.game.realMsCarry = 0;
    document.game.run.completion = { minute: 212 };
    document.game.run.deposited = [
      { item: "stick", count: 4 },
      { item: "berry", count: 2 },
    ];
  },
  "a deposit of 0 pieces": (document) => {
    solvingItsMap(document);
    document.game.paused = false;
    document.game.realMsCarry = 0;
    document.game.run.completion = { minute: 212 };
    document.game.run.deposited = [{ item: "berry", count: 0 }];
  },
  // The mark of the map run and the solved maps (decision 9; D-55, D-189).
  "the map run without its mark": (document) =>
    delete document.game.run.solvedMapRun,
  "a mark as text": (document) => (document.game.run.solvedMapRun = "false"),
  "a mark of 0": (document) => (document.game.run.solvedMapRun = 0),
  "a mark of none": (document) => (document.game.run.solvedMapRun = null),
  "a mark set on a map run whose map is not solved": (document) =>
    (document.game.run.solvedMapRun = true),
  "a mark unset on a map run whose map is solved, no completion": (
    document,
  ) => {
    solvingItsMap(document);
    document.game.run.solvedMapRun = false;
  },
  "a completion of a map absent from the solved maps": (document) => {
    document.game.paused = false;
    document.game.realMsCarry = 0;
    document.game.run.completion = { minute: 212 };
    document.game.run.deposited = [];
  },
  "a deposit at the completion of a marked run": (document) => {
    solvingItsMap(document);
    document.game.paused = false;
    document.game.realMsCarry = 0;
    document.game.run.solvedMapRun = true;
    document.game.run.completion = { minute: 212 };
    document.game.run.deposited = [{ item: "berry", count: 2 }];
  },
  "a marked completion without its deposit": (document) => {
    solvingItsMap(document);
    document.game.paused = false;
    document.game.realMsCarry = 0;
    document.game.run.solvedMapRun = true;
    document.game.run.completion = { minute: 212 };
  },
  // The settlement of a death (decision 9): null exactly when the map run has no death, a closed
  // list of kinds, each with exactly its keys, and a generation from 2 up to the current one of the
  // map run's character. Ala's is 2 in the document.
  "the map run without its death settlement": (document) =>
    delete document.game.run.deathSettlement,
  "a death unsettled": (document) => dead(document, null),
  "a settlement on a map run going on": (document) =>
    (document.game.run.deathSettlement = { kind: "resurrectionUsed" }),
  "a settlement of everything lost on a map run going on": (document) =>
    (document.game.run.deathSettlement = {
      kind: "progressLost",
      generation: 2,
    }),
  "a settlement at a completion": (document) => {
    solvingItsMap(document);
    document.game.paused = false;
    document.game.realMsCarry = 0;
    document.game.run.completion = { minute: 212 };
    document.game.run.deposited = [];
    document.game.run.deathSettlement = { kind: "resurrectionUsed" };
  },
  "a settlement of a kind off its list": (document) =>
    dead(document, { kind: "revived" }),
  "a settlement of a kind every object inherits": (document) =>
    dead(document, { kind: "toString" }),
  "a settlement of the kind __proto__": (document) =>
    dead(document, { kind: "__proto__" }),
  "a settlement of a kind in other letter case": (document) =>
    dead(document, { kind: "ResurrectionUsed" }),
  "a settlement without its kind": (document) => dead(document, {}),
  "a settlement holding the kind as a number": (document) =>
    dead(document, { kind: 1 }),
  "a settlement as text": (document) => dead(document, "resurrectionUsed"),
  "a settlement as a number": (document) => dead(document, 1),
  "a settlement of false": (document) => dead(document, false),
  "a settlement as a list": (document) => dead(document, ["resurrectionUsed"]),
  "a settlement with its kind inherited": (document) =>
    dead(document, Object.create({ kind: "resurrectionUsed" })),
  "a settlement with an own __proto__": (document) =>
    dead(
      document,
      JSON.parse('{"kind":"resurrectionUsed","__proto__":{"generation":2}}'),
    ),
  "a resurrection used holding a generation": (document) =>
    dead(document, { kind: "resurrectionUsed", generation: 2 }),
  "a resurrection used with a key added": (document) =>
    dead(document, { kind: "resurrectionUsed", note: "x" }),
  "everything lost without its generation": (document) =>
    dead(document, { kind: "progressLost" }),
  "everything lost with a key added": (document) =>
    dead(document, { kind: "progressLost", generation: 2, note: "x" }),
  "everything lost at generation 1": (document) =>
    dead(document, { kind: "progressLost", generation: 1 }),
  "everything lost at generation 0": (document) =>
    dead(document, { kind: "progressLost", generation: 0 }),
  "everything lost at a generation below 0": (document) =>
    dead(document, { kind: "progressLost", generation: -2 }),
  "everything lost at a fractional generation": (document) => {
    dead(document, { kind: "progressLost", generation: 2.5 });
    document.game.team.characters[0].generation = 3;
  },
  "everything lost at a generation as text": (document) =>
    dead(document, { kind: "progressLost", generation: "2" }),
  "everything lost at a generation of none": (document) =>
    dead(document, { kind: "progressLost", generation: null }),
  "everything lost at a generation not a number": (document) =>
    dead(document, { kind: "progressLost", generation: NaN }),
  "everything lost at a generation beyond the safe integers": (document) => {
    dead(document, { kind: "progressLost", generation: 2 ** 53 });
    document.game.team.characters[0].generation = Number.MAX_SAFE_INTEGER;
  },
  "everything lost above the character's current generation": (document) =>
    dead(document, { kind: "progressLost", generation: 3 }),
  "everything lost at a generation only another character reached": (
    document,
  ) => {
    dead(document, { kind: "progressLost", generation: 3 });
    document.game.team.characters[1].generation = 5;
  },
  // The chest, by item and within its capacity.
  "a chest above its capacity": (document) =>
    (document.game.team.chest.pieces = { stick: 40, berry: 21 }),
  "an item absent from the data in the chest": (document) =>
    (document.game.team.chest.pieces.sword = 1),
  "a count of the chest below 0": (document) =>
    (document.game.team.chest.pieces.berry = -1),
  "a chest with an own __proto__": (document) =>
    (document.game.team.chest.pieces = JSON.parse(
      '{"stick":2,"__proto__":{"berry":8}}',
    )),
  // Skill trees, character skills and practice (D-191, D-193, D-195, D-200).
  "the Understanding without its trees": (document) =>
    delete document.game.understanding.trees,
  "a tree absent from the data": (document) =>
    document.game.understanding.trees.push("swimming"),
  "a tree named twice": (document) =>
    document.game.understanding.trees.push("exploration"),
  "a tree absent from the data in the discovery": (document) =>
    document.game.discovery.trees.push("swimming"),
  "a character without its skills": (document) =>
    delete document.game.team.characters[0].skills,
  "a skill absent from the data": (document) =>
    (document.game.team.characters[1].skills.swimming = {
      practice: 0,
      ranks: {},
    }),
  "a key added to a character's skill": (document) =>
    (document.game.team.characters[0].skills.exploration.level = 3),
  "a skill without its ranks": (document) =>
    delete document.game.team.characters[1].skills.kicking.ranks,
  "practice below 0": (document) =>
    (document.game.team.characters[1].skills.kicking.practice = -1),
  "fractional practice": (document) =>
    (document.game.team.characters[1].skills.kicking.practice = 1.5),
  "practice beyond the safe integers": (document) =>
    (document.game.team.characters[1].skills.kicking.practice = 2 ** 53),
  "a branch absent from the data": (document) =>
    (document.game.team.characters[0].skills.exploration.ranks.flight = 1),
  "a rank of a branch of another tree": (document) =>
    (document.game.team.characters[0].skills.exploration.ranks.keenEye = 1),
  "a rank of 0": (document) =>
    (document.game.team.characters[0].skills.exploration.ranks.longStep = 0),
  "a fractional rank": (document) =>
    (document.game.team.characters[0].skills.exploration.ranks.practicedStep = 1.5),
  // 450 practice reaches all five thresholds, five points; „Pełna garść” has one price of 3.
  "a rank above the branch's prices": (document) =>
    (document.game.team.characters[1].skills.smallItemGathering = {
      practice: 450,
      ranks: { fullHand: 2 },
    }),
  // Eksploracja 50 gives two points; a third rank of Wprawny krok costs a third.
  "ranks bought beyond the points": (document) =>
    (document.game.team.characters[0].skills.exploration.ranks.practicedStep = 3),
  // Jedzenie 15 gives one point, enough for Szybki posiłek, yet its tree is not known.
  "a rank bought in a tree the Understanding lacks": (document) =>
    (document.game.team.characters[1].skills.eating = {
      practice: 15,
      ranks: { quickMeal: 1 },
    }),
  "ranks with an own __proto__": (document) =>
    (document.game.team.characters[0].skills.exploration.ranks = JSON.parse(
      '{"practicedStep":2,"__proto__":{"scout":1}}',
    )),
  "the map run's character without its skills": (document) =>
    delete document.game.run.character.skills,
  "the map run's character with ranks beyond its points": (document) =>
    (document.game.run.character.skills = {
      ...document.game.run.character.skills,
      flameSpell: { practice: 6, ranks: { quickHand: 1, cleanFlame: 1 } },
    }),
  "the map run without its practice": (document) =>
    delete document.game.run.practice,
  "the map run's practice of a skill absent from the data": (document) =>
    (document.game.run.practice.swimming = 1),
  "the map run's practice at 0": (document) =>
    (document.game.run.practice.kicking = 0),
  "the map run's practice fractional": (document) =>
    (document.game.run.practice.exploration = 2.5),
  "the map run's practice by the key __proto__": (document) =>
    (document.game.run.practice = JSON.parse('{"__proto__":1}')),
  "a combat record without its practice": (document) =>
    delete document.game.run.lastCombat.result.practice,
  "a combat record's practice of a skill absent from the data": (document) =>
    (document.game.run.lastCombat.result.practice = { swimming: 1 }),
  "a patrol of a resource absent from the data": (document) =>
    (document.game.programs[1].program.groups[0].rules[1].action.resource =
      "gold"),
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

/** The death in combat of `deeper`, its character's resurrection not ready at `REAL_MS`. */
function deathUnready() {
  const state = deeper((run) => run.death !== null);
  return {
    ...state,
    team: {
      ...state.team,
      characters: state.team.characters.map((character) => ({
        ...character,
        resurrectionReadyAtMs: REAL_MS + 1,
      })),
    },
  };
}

/** A program that explores, walks to berries where none lie here and wanders. */
const WALKING = programFromRules(
  { condition: ALWAYS, action: { kind: "explore" } },
  {
    condition: { kind: "hereBelow", resource: "berry", value: 1 },
    action: { kind: "walkTo", resource: "berry" },
  },
  { condition: ALWAYS, action: { kind: "wander" } },
);

/** A program that builds a campfire from gathered sticks, wanders off and walks back to it. */
const RETURNING = programFromRules(
  { condition: ALWAYS, action: { kind: "walkToCampfire" } },
  { condition: ALWAYS, action: { kind: "craftCampfire" } },
  { condition: ALWAYS, action: { kind: "explore" } },
  {
    condition: { kind: "itemBelow", item: "stick", value: 6 },
    action: { kind: "gather", resource: "stick" },
  },
  { condition: ALWAYS, action: { kind: "wander" } },
);

/** The kind of what the map run's character is doing: a wait, or the action of its rule. */
function doing(run) {
  const activity = run.current?.activity;
  return activity?.kind === "rule" ? activity.action.kind : activity?.kind;
}

/**
 * The first character sent to Las with `program`, a new game's empty „Program” where none is
 * given, moved on minute by minute until it is doing `kind`.
 */
function sentDoing(kind, program) {
  let state = newKnowingGame();
  if (program) state = setProgram(state, program).state;
  state = createCharacter(state, "Ala").state;
  state = send(state, { mapId: "forest", characterId: 1 }, REAL_MS).state;
  for (let minute = 0; minute < 400 && doing(state.run) !== kind; minute += 1)
    state = advanceMinutes(state, 1).state;
  return state;
}

/** Ala, created in a game whose Understanding holds everything, with `skills` set among hers. */
function skilled(skills) {
  const state = createCharacter(newKnowingGame(), "Ala").state;
  return {
    ...state,
    team: {
      ...state.team,
      characters: state.team.characters.map((character) => ({
        ...character,
        skills: { ...character.skills, ...skills },
      })),
    },
  };
}

const BERRY_3 = { item: "berry", count: 3 };

/**
 * Ala sent to Las after buying „Szybki posiłek”, with a trip plan that takes 3 berries out of a
 * chest of 10 sticks, 10 berries and 2 moss and brings back berries and sticks.
 */
function equipped(solved = false) {
  let state = skilled({ eating: { practice: 15, ranks: {} } });
  state = {
    ...state,
    team: {
      ...state.team,
      chest: { pieces: { stick: 10, berry: 10, moss: 2 } },
    },
  };
  state = buyBranch(state, 1, "quickMeal").state;
  state = setProgram(state, {
    ...programFromRules({ condition: ALWAYS, action: { kind: "eat" } }),
    tripPlan: {
      take: [BERRY_3],
      bring: [BERRY_3, { item: "stick", count: 2 }],
    },
  }).state;
  if (solved) state = { ...state, solvedMaps: ["forest"] };
  return send(state, { mapId: "forest", characterId: 1 }, REAL_MS).state;
}

/**
 * The equipped map run completed: moved on to game minute 476 as if it had passed with no loss —
 * its streak, its activity and its attack cooldown with it, 4 game minutes short of Las's solving
 * streak of 480 — and those 4 minutes passed eating.
 */
function completed(solved = false) {
  const { run, ...started } = equipped(solved);
  const later = (minute) => minute + 476;
  return advanceMinutes(
    {
      ...started,
      run: {
        ...run,
        minute: later(run.minute),
        streak: 476,
        attackCooldownStart: later(run.attackCooldownStart),
        current: {
          ...run.current,
          startMinute: later(run.current.startMinute),
          endMinute: later(run.current.endMinute),
        },
      },
    },
    4,
  ).state;
}

/** Ala, with „Obchód” bought, sent to Las and moved on until she patrols for sticks. */
function patrolling() {
  let state = buyBranch(
    skilled({ smallItemGathering: { practice: 160, ranks: {} } }),
    1,
    "patrol",
  ).state;
  state = setProgram(
    state,
    programFromRules(
      { condition: ALWAYS, action: { kind: "explore" } },
      { condition: ALWAYS, action: { kind: "patrol", resource: "stick" } },
      { condition: ALWAYS, action: { kind: "wander" } },
    ),
  ).state;
  state = send(state, { mapId: "forest", characterId: 1 }, REAL_MS).state;
  for (
    let minute = 0;
    minute < 400 && doing(state.run) !== "patrol";
    minute += 1
  )
    state = advanceMinutes(state, 1).state;
  return state;
}

test("a game state the simulation made loads back from its saved document", () => {
  const ended = end(played()).state;
  const done = completed();
  const doneMarked = completed(true);
  const lost = settleDeath(deathUnready(), REAL_MS).state;
  const states = {
    "a new game": { state: newGame(), goesOn: false },
    "a wait under the empty „Program”": {
      state: sentDoing("wait"),
      goesOn: true,
    },
    "a walk to a resource": {
      state: sentDoing("walkTo", WALKING),
      goesOn: true,
    },
    "a walk to a campfire": {
      state: sentDoing("walkToCampfire", RETURNING),
      goesOn: true,
    },
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
      state: settleDeath(
        deeper((run) => run.death !== null),
        REAL_MS,
      ).state,
      goesOn: false,
    },
    "a death that took everything": {
      state: lost,
      goesOn: false,
    },
    "the headquarters after that death and „Zakończ”": {
      state: end(lost).state,
      goesOn: false,
    },
    "the restart after that death": {
      state: restart(lost).state,
      goesOn: true,
    },
    "a map run with its equipment and a bought rank": {
      state: equipped(),
      goesOn: true,
    },
    "a completion that deposited and paid its practice": {
      state: done,
      goesOn: false,
    },
    "the headquarters after that completion and „Zakończ”": {
      state: end(done).state,
      goesOn: false,
    },
    "a patrol going on": { state: patrolling(), goesOn: true },
    "a map run of a solved map, its mark set": {
      state: equipped(true),
      goesOn: true,
    },
    "the completion of a marked run, its deposit empty": {
      state: doneMarked,
      goesOn: false,
    },
    "the restart after the completion that solved the map": {
      state: restart(done).state,
      goesOn: true,
    },
  };
  // Preconditions: each state holds what its name says.
  assert.equal(
    doing(states["a wait under the empty „Program”"].state.run),
    "wait",
  );
  for (const [name, kind] of [
    ["a walk to a resource", "walkTo"],
    ["a walk to a campfire", "walkToCampfire"],
  ]) {
    const { run } = states[name].state;
    assert.equal(doing(run), kind);
    assert.notEqual(run.current.stepTo, null);
    assert.equal(run.death, null);
  }
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
  assert.deepEqual(states["a death in combat"].state.run.deathSettlement, {
    kind: "resurrectionUsed",
  });
  assert.deepEqual(lost.run.deathSettlement, {
    kind: "progressLost",
    generation: 2,
  });
  const started =
    states["a map run with its equipment and a bought rank"].state;
  assert.equal(started.run.character.backpack.berry, 3);
  assert.equal(started.team.chest.pieces.berry, 7);
  assert.equal(started.run.character.skills.eating.ranks.quickMeal, 1);
  assert.deepEqual(started.run.bringPlan, [
    BERRY_3,
    { item: "stick", count: 2 },
  ]);
  assert.notEqual(done.run.completion, null);
  assert.notEqual(done.run.deposited.length, 0);
  assert.notEqual(done.run.practice.eating ?? 0, 0);
  assert.equal(
    done.team.characters[0].skills.eating.practice,
    15 + done.run.practice.eating,
  );
  assert.equal(doing(states["a patrol going on"].state.run), "patrol");
  // Preconditions of the marked states: the mark follows the map's state at the run's start.
  assert.equal(started.run.solvedMapRun, false);
  assert.equal(done.run.solvedMapRun, false);
  assert.deepEqual(done.solvedMaps, ["forest"]);
  assert.equal(
    states["a map run of a solved map, its mark set"].state.run.solvedMapRun,
    true,
  );
  assert.notEqual(doneMarked.run.completion, null);
  assert.equal(doneMarked.run.solvedMapRun, true);
  assert.deepEqual(doneMarked.run.deposited, []);
  assert.equal(
    states["the restart after the completion that solved the map"].state.run
      .solvedMapRun,
    true,
  );
  for (const [name, { state, goesOn }] of Object.entries(states)) {
    assert.deepEqual(
      loadSavedGame(savedGame(state)),
      { ok: true, state: goesOn ? { ...state, paused: true } : state },
      name,
    );
  }
});

// Catches a trip count the game takes from the player that makes the load refuse the whole save.
test("the largest trip count the game accepts loads back, and one beyond the safe integers the game refuses", () => {
  const withCount = (count) =>
    editProgram(newGame(), 1, {
      ...emptyProgram(),
      tripPlan: { take: [{ item: "stick", count }], bring: [] },
    }).state;
  const largest = withCount(Number.MAX_SAFE_INTEGER);
  assert.deepEqual(
    loadSavedGame(JSON.parse(JSON.stringify(savedGame(largest)))),
    { ok: true, state: largest },
  );
  for (const count of [2 ** 53, Number("99999999999999999999")])
    assert.throws(() => withCount(count), `${count}`);
});
