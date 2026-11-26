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
  settleCompletion,
  settleDeath,
  withSaveTime,
} from "../../dist/browser/sim/game.js";
import {
  createProgram,
  deleteProgram,
  editProgram,
  emptyProgram,
  pickProgram,
} from "../../dist/browser/sim/programs.js";
import {
  loadSavedGame,
  SAVED_GAME_VERSION,
  savedGame,
} from "../../dist/browser/sim/saved-game.js";
import { buyBranch } from "../../dist/browser/sim/skills.js";
import { programFromRules } from "./program-fixture.mjs";
import { newKnowingGame, withEdgeSolved } from "./understanding-fixture.mjs";

// The saved documents of versions 1 and 2 of the shape stay below as they were, written out by
// hand; the game refuses each as another version. The document of version 2 is that of version 1
// with the mark `solvedMapRun` added to its map run; its map run is on forestDeep, which
// `solvedMaps` lacks, so the mark is false. Its characters also hold `generation` and
// `resurrectionReadyAtMs` and its map run `deathSettlement`, null on that map run, which goes on;
// the document of version 1 keeps its characters and its map run without them.
//
// The document of version 3 is that of version 2 with the four keys of the earning loops added and
// a third character for them (D-206, D-241, D-245, D-246 and D-248); the game refuses it as
// another version since version 4.
//
// The document of version 4 is that of version 3 with the three fields of the record of a manual
// map run added to its map run: the longest streak, the game minutes by what the character was
// doing, and what the character entered with (D-206, D-135 and D-368); the game refuses it as
// another version since version 5.
//
// The document of version 5 is that of version 4 with the practice taken out of the lines of the
// report, which the game reads from the earning loops instead (D-206, D-246 and D-189); the game
// refuses it as another version since version 6, which keeps its shape and was raised because a new
// game opens on another map, Skraj lasu, so that a game state of version 5 describes a game whose
// first map the game no longer starts on (D-206).
//
// The document of version 6 is that of version 5 with Skraj lasu among the solved maps, where Las
// is, since Skraj lasu opens Las (D-149); the game refuses it as another version since version 7.
//
// The document of version 7 is that of version 6 with the one resurrection of the team: its moment of
// readiness stands in the team and no longer in each character, and the map run holds
// `completionSettlement`, null on that map run, which goes on (D-190, D-206); the game refuses it as
// another version since version 8.
//
// The document of version 8 is that of version 7 with the team's resurrection held as the uses spent,
// two of the data's three, and the real moment the next one returns: the keys `resurrectionUsesSpent`
// and `resurrectionNextReturnAtMs` replace `resurrectionReadyAtMs` (D-190); the game refuses it as
// another version since version 9.
//
// The document of version 9 is that of version 8 with the two counts of each earning loop,
// `inARow` and `loopRecord` (D-241, D-206), the content revision of each program, `contentRevision`
// beside its number, name and content (D-442), and the real moment the game was made, `madeAtMs`
// (D-04, D-386). It holds no judging: the browser remembers the judgings in its own storage and the
// game state is whole without them (D-441). It holds the four items the data had then, and no
// minute counted to „Wytwórz” or „Opatrz”; the game refuses it as another version since version 10.
//
// The document of version 10 is that of version 9 with the bandage, the item that no map holds, and
// the two ordinary actions „Wytwórz” and „Opatrz” (D-443, D-206): the backpacks hold the bandage
// beside the four items, the keys of `minutesByAction` hold `craft` and `tend`, and programs, a copy
// and its base, an earning loop's program and the activities hold rules of both verbs with the
// bandage as their target. Its characters and the characters of its map runs hold no gear; the game
// refuses it as another version since version 11.
//
// The document of the current version, version 11, is that of version 10 with the gear of each
// character (D-451, D-452, D-456, D-460, D-463, D-206): each character of the team holds its gear, the
// slots the player changed since the start of the map run going on of its earning loop and the count
// of its gear changes, and the character of each map run holds the gear of that map run. The result
// of an encounter holds the gear and the backpack its turns left, and each action of the character in
// it the mark of a refill, which says whether the action took its piece from the backpack into the
// empty main hand first (D-144, D-457). An action of a turn may also be „Załóż”, which takes a turn of
// its own in a fight as it takes its minutes outside one (D-140, D-458), and the record of a manual map
// run counts the minutes of that action as a kind of their own, `equip`. This document was rewritten
// with the result's gear, backpack and mark, the turn of „Załóż” and its kind of minutes without
// raising the version, since no saved game state of version 11 exists anywhere yet: the change that
// brought version 11 has reached no server. It fills
// every optional branch of the game state, the new ones among them: a character holding a stick in
// its main hand and a bandage in a pocket, a character of an earning loop with a changed slot, a
// character with an empty gear, map runs whose gear differs from their character's, and a combat
// record whose first strike took a stick into the hand, whose later ones did not, and one of whose
// turns put a bandage on. It also
// fills the others: the chest, the Understanding, the report's chest and the trip lists naming the
// bandage, programs of content revision 0 and above, an earning loop whose two counts stand above 0
// with the run below the longest, a map run with a campfire, a burning item, a combat record, a copy
// whose program was deleted, a discovery held and counts beside the copy's rules; trip lists in
// programs, the copy changed from its frozen bring plan, known trees, practice of the map run and of
// its combat, and ranks bought; an earning loop with an activity going on; a stopped earning loop that
// gathered practice; and report lines open, stopped away and stopped in the open game.
// `HEADQUARTERS` below holds the counts beside a program of the list, which a game state holds only
// outside a map run, and an earning loop in a combat going on, with no manual map run. Its map run is
// written paused, so the load's pause changes nothing in it. A change of the game state's shape makes
// the load refuse this document; it is rewritten only together with a raised version, or while no
// saved game state of the current version exists anywhere.

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
 * The document of version 2: version 1 with the mark of its map run (forestDeep, unsolved) and its
 * characters' generation and moment of readiness (Ala has lived a death with no resurrection ready,
 * so generation 2, and used her resurrection at a real moment of 2025).
 */
const DOCUMENT_V2 = {
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

/**
 * The map run of an earning loop of the character `id`, on Las, which `solvedMaps` holds: in game
 * minute 42 of its fourth run, exploring. It holds exactly the keys of a `MapRun`.
 */
function loopRun(id) {
  return {
    practice: { exploration: 2 },
    mapId: "forest",
    seed: 77,
    minute: 42,
    tiles: [
      tile(0, 0, 0, false, { stick: 12 }),
      tile(1, 0, 1, true, { berry: 8 }),
      tile(2, 0, 2, false, {}),
      tile(3, 0, 3, false, { moss: 6 }),
      tile(0, 1, 0, true, {}),
      tile(1, 1, 1, true, { stick: 3 }),
      tile(2, 1, 2, true, { fiber: 6 }),
      tile(3, 1, 3, false, {}),
      tile(0, 2, -1, false, { stick: 12 }),
      tile(1, 2, 0, true, {}),
      tile(2, 2, 1, false, { berry: 8 }),
      tile(3, 2, 2, false, {}),
      tile(0, 3, -1, false, {}),
      tile(1, 3, 0, false, { moss: 6 }),
      tile(2, 3, 1, false, {}),
      tile(3, 3, 2, false, { stick: 12 }),
    ],
    character: {
      skills: NEW_SKILLS,
      id,
      at: { q: 1, r: 1 },
      traits: { carryingCapacity: 15 },
      backpack: { stick: 3, berry: 0, moss: 0, fiber: 0 },
    },
    body: { temperature: 36.6, satiety: 90.5, health: 100 },
    natureEnergy: 100,
    campfires: [],
    burningItems: [],
    current: {
      activity: { kind: "rule", ruleId: 1, action: { kind: "explore" } },
      startMinute: 40,
      endMinute: 45,
      stepTo: null,
    },
    activeCombat: null,
    lastCombat: null,
    attackRandom: 11,
    attackCooldownStart: 0,
    wanderRandom: 22,
    gatherRandom: 33,
    streak: 42,
    defeatedAttacks: 0,
    death: null,
    completion: null,
  };
}

/** An earning loop in its fourth run, three completed, with the content of program 3. */
const loopOf = (id) => ({
  program: PROGRAM_3,
  run: loopRun(id),
  runNumber: 4,
  completed: 3,
  practice: { exploration: 12, smallItemGathering: 30 },
});

/**
 * The document of version 3: version 2 with Ewa, who stopped an earning loop at generation 3, Ola's earning
 * loop, Ewa's stopped earning loop, a report of each kind of line and the moment of the save. Its map run has
 * no record; the game refuses the document as another version.
 */
const DOCUMENT_V3 = {
  version: 3,
  game: {
    ...DOCUMENT_V2.game,
    team: {
      ...DOCUMENT_V2.game.team,
      characters: [
        ...DOCUMENT_V2.game.team.characters,
        {
          id: 3,
          name: "Ewa",
          archetypeId: "elementalMage",
          traits: { carryingCapacity: 15 },
          skills: NEW_SKILLS,
          generation: 3,
          resurrectionReadyAtMs: 0,
        },
      ],
    },
    nextCharacterId: 4,
    loops: { 2: loopOf(2) },
    stoppedLoops: { 3: { exploration: 9, smallItemGathering: 1 } },
    awayReport: [
      {
        characterId: 3,
        minutes: 57,
        chest: {},
        practice: {},
        resurrectionUsed: false,
        stop: { generation: 3, away: true },
      },
      {
        characterId: 1,
        minutes: 0,
        chest: {},
        practice: {},
        resurrectionUsed: false,
        stop: { generation: 2, away: false },
      },
      {
        characterId: 2,
        minutes: 120,
        chest: { stick: 7, berry: -2 },
        practice: { exploration: 14 },
        resurrectionUsed: true,
        stop: null,
      },
    ],
    saveTimeMs: 1760000000000,
  },
};

/**
 * The record of the map run of the document of version 4, written out by hand: 212 game minutes of which 5 are
 * the fight the map run's last combat tells of (game minutes 191 to 195, attacked at 190), the
 * longest streak of 40 above the streak going on (16) and below the game minute, and the sticks the
 * character took from the chest at the start (the backpack holds 4 sticks, 2 berries and 1 moss
 * now; the comments of the document give the 6 sticks the chest held before the map run took 4).
 */
const RUN_RECORD_V4 = {
  longestStreak: 40,
  minutesByAction: {
    explore: 40,
    wander: 30,
    walkTo: 20,
    walkToCampfire: 10,
    gather: 70,
    patrol: 0,
    craftCampfire: 20,
    lightCampfire: 5,
    lightItem: 0,
    feedCampfire: 5,
    eat: 5,
    wait: 2,
    combat: 5,
  },
  enteredWith: [{ item: "stick", count: 4 }],
};

/** The document of version 4: version 3 with the record in its map run; the game refuses it as another version. */
const DOCUMENT_V4 = {
  version: 4,
  game: {
    ...DOCUMENT_V3.game,
    run: { ...DOCUMENT_V3.game.run, ...RUN_RECORD_V4 },
  },
};

/** The document of version 5: version 4 with no practice in the lines of its report; the game refuses it as another version. */
const DOCUMENT_V5 = {
  version: 5,
  game: {
    ...DOCUMENT_V4.game,
    awayReport: DOCUMENT_V4.game.awayReport.map((line) =>
      Object.fromEntries(
        Object.entries(line).filter(([key]) => key !== "practice"),
      ),
    ),
  },
};

/** The document of version 6: version 5 with Skraj lasu solved before the Las it opens; the game refuses it as another version. */
const DOCUMENT_V6 = {
  version: 6,
  game: { ...DOCUMENT_V5.game, solvedMaps: ["forestEdge", "forest"] },
};

/**
 * The document of version 7: version 6 with the one resurrection of the team, its moment of readiness
 * moved from each character to the team (Ala's used one of 2025, the moment the document of version 2
 * gave her), and the mark `completionSettlement` in the map run, null on that map run, which goes on.
 */
const DOCUMENT_V7 = {
  version: 7,
  game: {
    ...DOCUMENT_V6.game,
    team: {
      ...DOCUMENT_V6.game.team,
      characters: DOCUMENT_V6.game.team.characters.map((character) =>
        Object.fromEntries(
          Object.entries(character).filter(
            ([key]) => key !== "resurrectionReadyAtMs",
          ),
        ),
      ),
      resurrectionReadyAtMs: 1760000028800000,
    },
    run: { ...DOCUMENT_V6.game.run, completionSettlement: null },
  },
};

/**
 * The document of version 8: version 7 with the team's resurrection held as two uses spent of the
 * data's three and the moment the next one returns, which is the moment of Ala's used resurrection of
 * 2025 that version 7 gave. It holds no judging and no count of an earning loop; the game refuses it
 * as another version.
 */
const DOCUMENT_V8 = {
  version: 8,
  game: {
    ...DOCUMENT_V7.game,
    team: {
      characters: DOCUMENT_V7.game.team.characters,
      chest: DOCUMENT_V7.game.team.chest,
      resurrectionUsesSpent: 2,
      resurrectionNextReturnAtMs: 1760000028800000,
    },
  },
};

/** `loop` with the two counts of version 9: the map runs completed in a row, and the loop record. */
const countedLoop = (loop, inARow, loopRecord) => ({
  ...loop,
  inARow,
  loopRecord,
});

/**
 * The document of version 9: version 8 with the two counts of Ola's earning loop, 2 map runs
 * completed in a row below its loop record of 3, the three runs it completed, the content revision
 * of each program (0 for the program made with the game, 4 for the one saved four times with other
 * content) and the real moment the game was made, before the save. It holds no judging: the browser
 * remembers the judgings in its own storage, and the game state is whole without them (D-441). Its
 * backpacks hold the four items of the data then and its record counts no minute to „Wytwórz” or
 * „Opatrz”; the game refuses it as another version since version 10.
 */
const DOCUMENT_V9 = {
  version: 9,
  game: {
    ...DOCUMENT_V8.game,
    programs: [
      { id: 1, name: "Program", program: PROGRAM_1, contentRevision: 0 },
      { id: 3, name: "Las nocą", program: PROGRAM_3, contentRevision: 4 },
    ],
    loops: { 2: countedLoop(loopOf(2), 2, 3) },
    madeAtMs: 1759900000000,
  },
};

/** `rules` of the first group of `program`, then the rules added to its end and the next rule number. */
function withRules(program, added, nextRuleId) {
  const [group, ...others] = program.groups;
  return {
    ...program,
    groups: [{ ...group, rules: [...group.rules, ...added] }, ...others],
    nextRuleId,
  };
}

/** The rule making a bandage, taken when fewer than 2 are held, and the rule tending with one, below 40 health. */
const craftRule = (id) => ({
  id,
  condition: { kind: "itemBelow", item: "bandage", value: 2 },
  action: { kind: "craft", item: "bandage" },
});
const tendRule = (id) => ({
  id,
  condition: { kind: "healthBelow", value: 40 },
  action: { kind: "tend", item: "bandage" },
});

/**
 * Program 3 with the two verbs: „Wytwórz” (rule 4) and „Opatrz” (rule 5) added to the end of its first
 * group, and the bandage on its take list, after the berries.
 */
const PROGRAM_10 = {
  ...withRules(PROGRAM_3, [craftRule(4), tendRule(5)], 6),
  tripPlan: {
    take: [
      { item: "berry", count: 2 },
      { item: "bandage", count: 1 },
    ],
    bring: [{ item: "stick", count: 12 }],
  },
};

/** The base of the copy with the two verbs, the rules 4 and 5 after its three. */
const COPY_BASE_10 = withRules(COPY_BASE, [craftRule(4), tendRule(5)], 6);

/** The copy: the base with its two verbs and the rule 6 the player added, lighting an item. */
const COPY_PROGRAM_10 = withRules(
  COPY_BASE_10,
  [{ ...COPY_PROGRAM.groups[0].rules[3], id: 6 }],
  7,
);

/** An activity going on, at the game minute 40 of a run, ten game minutes long, of the rule `ruleId` doing `action`. */
const activityOf = (ruleId, action) => ({
  activity: { kind: "rule", ruleId, action },
  startMinute: 40,
  endMinute: 50,
  stepTo: null,
});

/** The map run of an earning loop of version 10: its backpack holds no bandage, and it is tending one. */
function loopRun10(id) {
  const run = loopRun(id);
  return {
    ...run,
    character: {
      ...run.character,
      backpack: { ...run.character.backpack, bandage: 0 },
    },
    current: activityOf(5, { kind: "tend", item: "bandage" }),
  };
}

/** An earning loop of version 10: in its fourth run, three completed, with the content of program 10. */
const loopOf10 = (id) => ({
  ...loopOf(id),
  program: PROGRAM_10,
  run: loopRun10(id),
});

/**
 * The record of the map run of the document of the current version, written out by hand: 212 game
 * minutes of which 5 are the fight the map run's last combat tells of, 10 the making of a bandage, 5
 * the tending with one and 4 the putting of pieces on the gear, the longest streak of 40 above the streak going on (16) and below the game
 * minute, and the sticks the character took from the chest at the start.
 */
const RUN_RECORD = {
  longestStreak: 40,
  minutesByAction: {
    explore: 40,
    wander: 30,
    walkTo: 20,
    walkToCampfire: 6,
    gather: 55,
    patrol: 0,
    craftCampfire: 20,
    lightCampfire: 5,
    lightItem: 0,
    feedCampfire: 5,
    eat: 5,
    tend: 5,
    equip: 4,
    craft: 10,
    wait: 2,
    combat: 5,
  },
  enteredWith: [{ item: "stick", count: 4 }],
};

/**
 * The document of version 10: version 9 with the bandage. The backpack of the map run holds one and
 * the chest one, Ola's earning loop is tending one with its backpack at none, the programs, the copy
 * and its base and the earning loop's program hold rules of „Wytwórz” and „Opatrz” with the bandage
 * as their target, the map run is making a bandage, the record counts game minutes to both verbs,
 * the Understanding holds both actions and the bandage, and the open line of the report holds two
 * bandages in its chest. The counts stand beside the rules of the copy, six of them. No character
 * holds a gear; the game refuses it as another version since version 11.
 */
const DOCUMENT_V10 = {
  version: 10,
  game: {
    ...DOCUMENT_V9.game,
    programs: [
      DOCUMENT_V9.game.programs[0],
      { ...DOCUMENT_V9.game.programs[1], program: PROGRAM_10 },
    ],
    understanding: {
      ...DOCUMENT_V9.game.understanding,
      actions: [...DOCUMENT_V9.game.understanding.actions, "tend", "craft"],
      items: [...DOCUMENT_V9.game.understanding.items, "bandage"],
    },
    ruleCounts: { 1: 3, 2: 9, 3: 4, 4: 0, 5: 0, 6: 0 },
    team: {
      ...DOCUMENT_V9.game.team,
      chest: { pieces: { stick: 2, berry: 0, bandage: 1 } },
    },
    run: {
      ...DOCUMENT_V9.game.run,
      ...RUN_RECORD,
      character: {
        ...DOCUMENT_V9.game.run.character,
        backpack: { stick: 4, berry: 2, moss: 1, fiber: 0, bandage: 1 },
      },
      current: {
        ...activityOf(4, { kind: "craft", item: "bandage" }),
        startMinute: 210,
        endMinute: 220,
      },
      copy: {
        ...DOCUMENT_V9.game.run.copy,
        program: COPY_PROGRAM_10,
        base: COPY_BASE_10,
      },
    },
    loops: { 2: countedLoop(loopOf10(2), 2, 3) },
    awayReport: DOCUMENT_V9.game.awayReport.map((line) =>
      line.characterId === 2
        ? { ...line, chest: { ...line.chest, bandage: 2 } }
        : line,
    ),
  },
};

/** The empty gear: each of the eight slots of the data, in its order, holding none (D-456). */
const EMPTY_GEAR = {
  mainHand: null,
  secondHand: null,
  head: null,
  torso: null,
  legs: null,
  pocket1: null,
  pocket2: null,
  pocket3: null,
};

/** `character` of the team with the three fields of the gear of version 11. */
const geared = (character, gear, changedSlots, gearChanges) => ({
  ...character,
  gear,
  changedSlots,
  gearChanges,
});

/** `run` with its character holding `gear`, the gear of that map run. */
const runGeared = (run, gear) => ({
  ...run,
  character: { ...run.character, gear },
});

/**
 * The last combat of the map run of the current version: that of version 10, whose first strike took
 * a stick from the backpack into the empty main hand and whose three later strikes took none, with a
 * turn of „Załóż” putting a bandage on in the second turn, and the gear and the backpack the turns left:
 * the stick in the hand, the bandages in two pockets, and six pieces in the backpack, within the
 * carrying capacity of 15.
 */
const COMBAT_V10 = DOCUMENT_V10.game.run.lastCombat;
// The turn of „Załóż”: the character puts a bandage on in the turn in which version 10 had no action
// of the character. It deals nothing, so the wolf's health stays at 18 and the character's at 79. The
// number of its rule, 7, is read as a number and compared with no rule of the copy.
const EQUIP_TURN = {
  ruleId: 7,
  action: { kind: "equip", item: "bandage" },
  refill: false,
  damage: 0,
  creatureHealth: 18,
  characterHealth: 79,
};
const LAST_COMBAT = {
  ...COMBAT_V10,
  result: {
    ...COMBAT_V10.result,
    ruleStarts: { ...COMBAT_V10.result.ruleStarts, 7: 1 },
    exchanges: COMBAT_V10.result.exchanges.map((exchange, index) => ({
      ...exchange,
      characterAction:
        index === 1
          ? EQUIP_TURN
          : exchange.characterAction && {
              ...exchange.characterAction,
              refill: index === 0,
            },
    })),
    gear: {
      ...EMPTY_GEAR,
      mainHand: "stick",
      pocket1: "bandage",
      pocket2: "bandage",
    },
    backpack: { stick: 3, berry: 2, moss: 1, fiber: 0, bandage: 0 },
  },
};

/**
 * The document of the current version, version 11: version 10 with the gear. Ala, the character of
 * the manual map run, holds a stick in her main hand and a bandage in her second pocket, put on in
 * three changes, and her map run holds a bandage in her first pocket too; Ola, in an earning loop,
 * holds a stick for her next map run in the main hand she changed, her one change, while the map run
 * going on holds nothing; Ewa holds an empty gear and has made no change. The last combat of the map
 * run is `LAST_COMBAT`.
 */
const [ALA_V10, OLA_V10, EWA_V10] = DOCUMENT_V10.game.team.characters;
const DOCUMENT = {
  version: 11,
  game: {
    ...DOCUMENT_V10.game,
    understanding: {
      ...DOCUMENT_V10.game.understanding,
      actions: [...DOCUMENT_V10.game.understanding.actions, "equip"],
      conditions: [...DOCUMENT_V10.game.understanding.conditions, "emptyPlace"],
    },
    team: {
      ...DOCUMENT_V10.game.team,
      characters: [
        geared(
          ALA_V10,
          { ...EMPTY_GEAR, mainHand: "stick", pocket2: "bandage" },
          [],
          3,
        ),
        geared(OLA_V10, { ...EMPTY_GEAR, mainHand: "stick" }, ["mainHand"], 1),
        geared(EWA_V10, EMPTY_GEAR, [], 0),
      ],
    },
    run: {
      ...runGeared(DOCUMENT_V10.game.run, {
        ...EMPTY_GEAR,
        mainHand: "stick",
        pocket1: "bandage",
        pocket2: "bandage",
      }),
      lastCombat: LAST_COMBAT,
    },
    loops: {
      2: {
        ...DOCUMENT_V10.game.loops[2],
        run: runGeared(DOCUMENT_V10.game.loops[2].run, EMPTY_GEAR),
      },
    },
  },
};

/**
 * A document of the current version with no manual map run, its counts beside program 1, Ala in an
 * earning loop whose map run is in a combat going on, and the team's resurrection with no use spent and
 * no moment of the next return. The earning loop's run in a row equals its record.
 * Its one program is of content revision 1, and its game was made at the moment 0 the new game takes where
 * the page gives none. Ala took the stick off her main hand and put a bandage into her first pocket for
 * her next map run, two changes, while the map run going on keeps the stick it started with.
 */
const HEADQUARTERS = {
  version: 11,
  game: {
    programs: [
      { id: 1, name: "Program", program: PROGRAM_1, contentRevision: 1 },
    ],
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
          gear: { ...EMPTY_GEAR, pocket1: "bandage" },
          changedSlots: ["pocket1", "mainHand"],
          gearChanges: 2,
        },
      ],
      chest: { pieces: {} },
      resurrectionUsesSpent: 0,
      resurrectionNextReturnAtMs: null,
    },
    nextCharacterId: 2,
    run: null,
    lastSeed: 99,
    paused: false,
    solvedMaps: ["forestEdge", "forest"],
    pace: 1,
    discovery: null,
    realMsCarry: 0,
    loops: {
      1: {
        ...countedLoop(loopOf10(1), 3, 3),
        run: {
          ...runGeared(loopRun10(1), { ...EMPTY_GEAR, mainHand: "stick" }),
          current: null,
          activeCombat: {
            creatureId: "wolf",
            attackMinute: 41,
            resolveMinute: 46,
          },
        },
      },
    },
    stoppedLoops: {},
    awayReport: [],
    saveTimeMs: 1760000000000,
    madeAtMs: 0,
  },
};

test("a document of the current version loads into the state it describes", () => {
  // decision: D-206 "A saved game state carries the version number of its shape, and the game loads whole only a saved game state whose version is the game's current one"
  // decision: D-213 "Saved-game code turns a game state into the saved document of the current version of its shape, and an unknown value — a saved game state downloaded from the server or the unsaved game state kept in the page's memory (D-211) — into a game state or a refusal naming why, inside the simulation, no value a document can hold making it throw, and changing nothing passed to it"
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

// The `save` the server hands back: exactly `version`, `revision` and `game` (D-204).
test("the server's save of the current version loads into the game it holds, its revision left out", () => {
  // decision: D-206 "A saved game state carries the version number of its shape, and the game loads whole only a saved game state whose version is the game's current one"
  // decision: D-213 "Saved-game code turns a game state into the saved document of the current version of its shape, and an unknown value — a saved game state downloaded from the server or the unsaved game state kept in the page's memory (D-211) — into a game state or a refusal naming why, inside the simulation, no value a document can hold making it throw, and changing nothing passed to it"
  const save = {
    version: 11,
    revision: 3,
    game: structuredClone(DOCUMENT.game),
  };
  assert.deepEqual(loadSavedGame(save), { ok: true, state: DOCUMENT.game });
  // D-206: 11 is the current version since the raise, so 10 is another one.
  assert.deepEqual(loadSavedGame({ ...save, version: 10 }), {
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

/** The solved maps a document needs for its map run to have completed: the maps before it and its own. */
function solvingItsMap(document) {
  document.game.solvedMaps = ["forestEdge", "forest", "forestDeep"];
}

/**
 * The document's map run ended in a death in its game minute, settled as `settlement` gives; by
 * default the death spent the third of the data's three uses, the document holding two spent before
 * it, so three are spent after it and none is left (D-190). The game no longer holds what only a map
 * run going on holds.
 */
function dead(
  document,
  settlement = { kind: "resurrectionUsed", usesSpent: 3 },
) {
  document.game.paused = false;
  document.game.discovery = null;
  document.game.realMsCarry = 0;
  document.game.run.death = { minute: 212, cause: "cold" };
  document.game.run.deathSettlement = settlement;
}

/**
 * The document's map run completed its map, unsolved when the run started, in its game minute, with
 * the empty deposit; the game no longer holds what only a map run going on holds.
 */
function firstCompletion(document) {
  solvingItsMap(document);
  document.game.paused = false;
  document.game.realMsCarry = 0;
  document.game.run.completion = { minute: 212 };
  document.game.run.deposited = [];
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
  // decision: D-212 "A manual map run of a loaded saved game state that goes on comes back at the game minute of the save, paused, with the pace of the save, and the player resumes it with „Wznów”"
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
  // decision: D-212 "A manual map run of a loaded saved game state that goes on comes back at the game minute of the save, paused, with the pace of the save, and the player resumes it with „Wznów”; one that ended in a completion or in the character's death comes back with its screen after its end, with „Restart”, „Zakończ” and the copy open to editing as D-62, D-132 and D-173 give, and with the end-of-run window (D-368) open again, holding all it held but „Ostatnie minuty”, which stand only where the chronicle holds the entries (D-339)"
  // Each kind of settlement of a death (D-190, D-216); Ala's generation is 2 in the document.
  const died = changed((document) => dead(document));
  assert.deepEqual(loadSavedGame(died), { ok: true, state: died.game });
  const lost = changed((document) =>
    dead(document, { kind: "progressLost", generation: 2 }),
  );
  assert.deepEqual(loadSavedGame(lost), { ok: true, state: lost.game });
  // D-216: the number of that death stays, however far the character has gone on since.
  const earlier = changed((document) => {
    dead(document, { kind: "progressLost", generation: 2 });
    document.game.team.characters[0].generation = 5;
  });
  assert.deepEqual(loadSavedGame(earlier), { ok: true, state: earlier.game });
  // D-190: the death of a character with no practice leaves everything as it was.
  const bare = changed((document) => dead(document, { kind: "noPractice" }));
  assert.deepEqual(loadSavedGame(bare), { ok: true, state: bare.game });
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
  // D-190: the first completion of a map is settled, or not yet, and then the clock's next reading settles it.
  for (const completionSettlement of [
    null,
    { kind: "resurrectionRenewed" },
    { kind: "resurrectionReady" },
  ]) {
    const settled = changed((document) => {
      firstCompletion(document);
      document.game.run.completionSettlement = completionSettlement;
    });
    assert.deepEqual(
      loadSavedGame(settled),
      { ok: true, state: settled.game },
      `${completionSettlement?.kind}`,
    );
  }
});

// invariant: solved-map-manual-run
test("a map run of a solved map comes back marked, and its completion with the empty deposit", () => {
  // decision: D-214 "A manual map run is a manual run of a solved map by the state of its map when that map run starts, and it stays one to its end, on the screen after its end and after a load"
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
  // decision: D-213 "Saved-game code turns a game state into the saved document of the current version of its shape, and an unknown value — a saved game state downloaded from the server or the unsaved game state kept in the page's memory (D-211) — into a game state or a refusal naming why, inside the simulation, no value a document can hold making it throw, and changing nothing passed to it"
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
  passed.game.run.minutesByAction.explore = 1;
  passed.game.run.enteredWith[0].count = 1;
  passed.game.run.enteredWith.pop();
  passed.game.team.characters[0].gear.mainHand = null;
  passed.game.team.characters[1].changedSlots.push("head");
  passed.game.run.character.gear.pocket1 = null;
  passed.game.loops[2].run.character.gear.mainHand = "stick";
  assert.deepEqual(state, DOCUMENT.game);
});

// invariant: save-version
test("the team's moment of the next return below zero loads, as it is a safe integer of any sign", () => {
  // decision: D-386 "A moment of real time that the game state stores, the save time and the moment the next spent use of the account's resurrection returns, is a safe integer of milliseconds of any sign, which the load takes without comparing it with any clock; the function that stamps a save time, the function that settles a death and the function that settles the first completion of a map refuse a moment that is no safe integer with a RangeError, and the last two read no moment where there is nothing to settle"
  const before = changed((document) => {
    document.game.team.resurrectionNextReturnAtMs = -1500;
  });
  const loaded = loadSavedGame(before);
  assert.equal(loaded.ok, true);
  assert.equal(loaded.state.team.resurrectionNextReturnAtMs, -1500);
});

// invariant: save-version
test("a document of another version is refused as version, whatever its game holds", () => {
  // decision: D-213 "Saved-game code turns a game state into the saved document of the current version of its shape, and an unknown value — a saved game state downloaded from the server or the unsaved game state kept in the page's memory (D-211) — into a game state or a refusal naming why, inside the simulation, no value a document can hold making it throw, and changing nothing passed to it"
  // D-206: 11 is the current version since the raise, so 10 and 12 stand in for another one.
  for (const version of [0, 8, 9, 10, 12, -1]) {
    assertRefused(
      `version ${version}`,
      { ...structuredClone(DOCUMENT), version },
      "version",
    );
  }
  assertRefused(
    "version 12 of another shape",
    { version: 12, game: "Las" },
    "version",
  );
  assertRefused(
    "version 12 with an archetype absent from the data",
    changed((document) => {
      document.version = 12;
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
test("the document of version 2 is refused as version, whatever its game holds", () => {
  assert.equal(DOCUMENT_V2.version, 2);
  assertRefused(
    "the document of version 2",
    structuredClone(DOCUMENT_V2),
    "version",
  );
});

// invariant: save-version
// D-206: a save of the version before the raise is discarded whole, whatever it holds,
// the player's programs included, though its game state is sound but for the record it lacks.
test("the document of version 3 is refused as version, whatever its game holds", () => {
  assert.equal(DOCUMENT_V3.version, 3);
  assertRefused(
    "the document of version 3",
    structuredClone(DOCUMENT_V3),
    "version",
  );
  assertRefused(
    "the document of version 3 with the record of version 4 in its map run",
    { ...structuredClone(DOCUMENT), version: 3 },
    "version",
  );
});

// invariant: save-version
// D-206: a save of the version before the raise is discarded whole, whatever it holds, though its
// game state is sound but for the practice its report lines still hold.
test("the document of version 4 is refused as version, whatever its game holds", () => {
  assert.equal(DOCUMENT_V4.version, 4);
  assertRefused(
    "the document of version 4",
    structuredClone(DOCUMENT_V4),
    "version",
  );
});

// invariant: save-version
// D-206: a save of the version before the raise is discarded whole, whatever it holds, though its
// game state has the shape of the current version: it describes a game that began on Las, not on
// Skraj lasu, and the game does not load it, whether Las is among its solved maps or not.
test("the document of version 5 is refused as version, whatever its game holds", () => {
  assert.equal(DOCUMENT_V5.version, 5);
  assertRefused(
    "the document of version 5",
    structuredClone(DOCUMENT_V5),
    "version",
  );
  assertRefused(
    "the document of version 5 with the maps of the current version solved",
    { ...structuredClone(DOCUMENT), version: 5 },
    "version",
  );
});

// invariant: save-version
// D-206: a save of the version before the raise is discarded whole, whatever it holds, though its
// game state has the shape of the current version but for the resurrection its characters hold one
// each, and the mark of the completion its map run lacks.
test("the document of version 6 is refused as version, whatever its game holds", () => {
  assert.equal(DOCUMENT_V6.version, 6);
  assertRefused(
    "the document of version 6",
    structuredClone(DOCUMENT_V6),
    "version",
  );
  assertRefused(
    "the document of version 6 with the team of the current version",
    { ...structuredClone(DOCUMENT), version: 6 },
    "version",
  );
});

// invariant: save-version
// D-206: the document of version 7 is discarded whole, whatever it holds, though its game state has
// the shape of the version before the team's uses: its team holds the moment of readiness the
// version before gave, and version 8 is the one after it.
test("the document of version 7 is refused as version, whatever its game holds", () => {
  assert.equal(DOCUMENT_V7.version, 7);
  assertRefused(
    "the document of version 7",
    structuredClone(DOCUMENT_V7),
    "version",
  );
  assertRefused(
    "the document of version 7 with the team of the current version",
    { ...structuredClone(DOCUMENT), version: 7 },
    "version",
  );
});

// invariant: save-version
// D-206: the document of version 8 is discarded whole, whatever it holds, though its game state is
// sound but for the two counts of an earning loop, the content revision of each program and the
// moment of the game it lacks; version 9 is the one after it, raised once for the changes of the
// shape (D-241, D-442, D-04). The same game under the current version is no document of it, as it
// lacks the new keys, and is refused as shape.
test("the document of version 8 is refused as version, whatever its game holds", () => {
  // decision: D-206 "A saved game state carries the version number of its shape, and the game loads whole only a saved game state whose version is the game's current one"
  assert.equal(DOCUMENT_V8.version, 8);
  assertRefused(
    "the document of version 8",
    structuredClone(DOCUMENT_V8),
    "version",
  );
  assertRefused(
    "the document of version 8 with the counts of the current version",
    { ...structuredClone(DOCUMENT), version: 8 },
    "version",
  );
  assertRefused(
    "the game of version 8 held under the current version",
    { ...structuredClone(DOCUMENT_V8), version: SAVED_GAME_VERSION },
    "shape",
  );
});

// invariant: save-version
// D-206: the document of version 9 is discarded whole, whatever it holds, though its game state is
// sound but for the bandage its backpacks lack and the two kinds its game minutes by action lack, which
// the bandage and the actions „Wytwórz” and „Opatrz” add (D-443); version 10 is the one after it. The
// same game under the current version is no document of it, and is refused as shape.
test("the document of version 9 is refused as version, whatever its game holds", () => {
  // decision: D-206 "A saved game state carries the version number of its shape, and the game loads whole only a saved game state whose version is the game's current one"
  assert.equal(DOCUMENT_V9.version, 9);
  assertRefused(
    "the document of version 9",
    structuredClone(DOCUMENT_V9),
    "version",
  );
  assertRefused(
    "the document of version 9 with the bandage of the current version",
    { ...structuredClone(DOCUMENT), version: 9 },
    "version",
  );
  assertRefused(
    "the game of version 9 held under the current version",
    { ...structuredClone(DOCUMENT_V9), version: SAVED_GAME_VERSION },
    "shape",
  );
});

// invariant: save-version
// D-206: the document of version 10 is discarded whole, whatever it holds, though its game state is
// sound but for the gear its characters and its map runs' characters lack (D-451, D-452, D-463); the
// current version is the one after it. The same game under the current version is no document of it,
// and is refused as shape.
test("the document of version 10 is refused as version, whatever its game holds", () => {
  // decision: D-206 "A saved game state carries the version number of its shape, and the game loads whole only a saved game state whose version is the game's current one"
  assert.equal(DOCUMENT_V10.version, 10);
  assert.equal(SAVED_GAME_VERSION, DOCUMENT_V10.version + 1);
  assertRefused(
    "the document of version 10",
    structuredClone(DOCUMENT_V10),
    "version",
  );
  assertRefused(
    "the document of version 10 with the gear of the current version",
    { ...structuredClone(DOCUMENT), version: 10 },
    "version",
  );
  assertRefused(
    "the game of version 10 held under the current version",
    { ...structuredClone(DOCUMENT_V10), version: SAVED_GAME_VERSION },
    "shape",
  );
});

// invariant: save-version
test("the team's uses spent load at their edges: none with no moment, and all of the data's three with one", () => {
  // decision: D-190 "The account has one resurrection, shared by all its characters, held as numbers of the account, no item of any backpack, equipment or chest: a number of uses and the span of real time after which one used use returns, both set in the balance data, 3 uses and 4 hours to start."
  const none = changed((document) => {
    document.game.team.resurrectionUsesSpent = 0;
    document.game.team.resurrectionNextReturnAtMs = null;
  });
  assert.deepEqual(loadSavedGame(none), { ok: true, state: none.game });
  const all = changed((document) => {
    document.game.team.resurrectionUsesSpent = 3;
    document.game.team.resurrectionNextReturnAtMs = 1760000028800000;
  });
  assert.deepEqual(loadSavedGame(all), { ok: true, state: all.game });
});

// invariant: save-version
test("a death that spent a use keeps the uses spent after it, from one up to the data's count, and each loads", () => {
  // decision: D-190 "The death of a character with practice uses up one use while any is left, and a death of a character with practice with none left stops its earning loop."
  for (const usesSpent of [1, 2, 3]) {
    const loaded = changed((document) =>
      dead(document, { kind: "resurrectionUsed", usesSpent }),
    );
    assert.deepEqual(
      loadSavedGame(loaded),
      { ok: true, state: loaded.game },
      `uses spent ${usesSpent}`,
    );
  }
});

// invariant: save-version
test("a document whose character's archetype the data lacks is refused as archetype", () => {
  // decision: D-206 "A saved game state whose character names an archetype missing from the data is also discarded whole"
  // decision: D-213 "Saved-game code turns a game state into the saved document of the current version of its shape, and an unknown value — a saved game state downloaded from the server or the unsaved game state kept in the page's memory (D-211) — into a game state or a refusal naming why, inside the simulation, no value a document can hold making it throw, and changing nothing passed to it"
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
  // decision: D-213 "Saved-game code turns a game state into the saved document of the current version of its shape, and an unknown value — a saved game state downloaded from the server or the unsaved game state kept in the page's memory (D-211) — into a game state or a refusal naming why, inside the simulation, no value a document can hold making it throw, and changing nothing passed to it"
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

/** Ola's earning loop in a document. */
const olaLoop = (document) => document.game.loops[2];

/** Ola's earning loop under the key `key` alone, with its character's number as the key names it. */
function loopUnder(document, key, number) {
  const loop = olaLoop(document);
  loop.run.character.id = number;
  document.game.loops = JSON.parse(`{"${key}":${JSON.stringify(loop)}}`);
}

/** Ola's line of the report, which is open. */
const openLine = (document) => document.game.awayReport[2];

/** Ewa's line of the report, which stopped away, and whose generation is 3 in the document. */
const stoppedLine = (document) => document.game.awayReport[0];

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
  // The generation is an identity from 1 up (D-190, D-220), the moment a safe integer of any sign
  // (D-386).
  "a character without its generation": (document) =>
    delete document.game.team.characters[0].generation,
  // The one resurrection is the team's: a character that still holds its own moment is of the
  // shape of the version before, and the team keeps exactly its uses spent and its moment of the next
  // return, not the one moment of version 7.
  "a character still holding a moment of readiness": (document) =>
    (document.game.team.characters[1].resurrectionReadyAtMs = 0),
  "the team with the moment of version 7 beside the new keys": (document) =>
    (document.game.team.resurrectionReadyAtMs = 1760000028800000),
  "the team with the moment of version 7 instead of the new keys": (
    document,
  ) => {
    delete document.game.team.resurrectionUsesSpent;
    delete document.game.team.resurrectionNextReturnAtMs;
    document.game.team.resurrectionReadyAtMs = 1760000028800000;
  },
  "a team without its uses spent": (document) =>
    delete document.game.team.resurrectionUsesSpent,
  "a team without its moment of the next return": (document) =>
    delete document.game.team.resurrectionNextReturnAtMs,
  "a key added to the team": (document) => (document.game.team.reserve = 1),
  // The uses spent are a whole count from 0 up to the data's count of three (D-190).
  "uses spent fractional": (document) =>
    (document.game.team.resurrectionUsesSpent = 1.5),
  "uses spent below 0": (document) =>
    (document.game.team.resurrectionUsesSpent = -1),
  "uses spent as text": (document) =>
    (document.game.team.resurrectionUsesSpent = "2"),
  "uses spent of none": (document) =>
    (document.game.team.resurrectionUsesSpent = null),
  "uses spent not a number": (document) =>
    (document.game.team.resurrectionUsesSpent = NaN),
  "uses spent infinite": (document) =>
    (document.game.team.resurrectionUsesSpent = Infinity),
  "uses spent above the data's count": (document) =>
    (document.game.team.resurrectionUsesSpent = 4),
  "uses spent beyond the safe integers": (document) =>
    (document.game.team.resurrectionUsesSpent = 2 ** 53),
  // The moment of the next return stands exactly while some use is spent, and is a safe integer of
  // any sign (D-386).
  "a moment of the next return with none spent": (document) => {
    document.game.team.resurrectionUsesSpent = 0;
  },
  "a moment of the next return of 0 with none spent": (document) => {
    document.game.team.resurrectionUsesSpent = 0;
    document.game.team.resurrectionNextReturnAtMs = 0;
  },
  "a moment of the next return missing with some spent": (document) =>
    (document.game.team.resurrectionNextReturnAtMs = null),
  "a moment of the next return fractional": (document) =>
    (document.game.team.resurrectionNextReturnAtMs = 1.5),
  "a moment of the next return as text": (document) =>
    (document.game.team.resurrectionNextReturnAtMs = "1760000028800000"),
  "a moment of the next return not a number": (document) =>
    (document.game.team.resurrectionNextReturnAtMs = NaN),
  "a moment of the next return infinite": (document) =>
    (document.game.team.resurrectionNextReturnAtMs = Infinity),
  "a moment of the next return beyond the safe integers": (document) =>
    (document.game.team.resurrectionNextReturnAtMs = 2 ** 53),
  "a moment of the next return below the safe integers": (document) =>
    (document.game.team.resurrectionNextReturnAtMs = -(2 ** 53)),
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
  // D-118: a new game's Understanding holds „Eksploruj”, so a saved one that lacks it is refused,
  // whatever else it holds and however the lack is written.
  "the Understanding without „Eksploruj”": (document) =>
    (document.game.understanding.actions =
      document.game.understanding.actions.filter((kind) => kind !== "explore")),
  "the Understanding with no action at all": (document) =>
    (document.game.understanding.actions = []),
  "the Understanding with „Eksploruj” named twice": (document) =>
    document.game.understanding.actions.push("explore"),
  "the Understanding with „Eksploruj” in place of a number": (document) =>
    (document.game.understanding.actions = [0]),
  "the Understanding whose actions are no list": (document) =>
    (document.game.understanding.actions = "explore"),
  "the Understanding with its actions missing": (document) =>
    delete document.game.understanding.actions,
  "the Understanding with „Eksploruj” and without „Zawsze”": (document) =>
    (document.game.understanding.conditions =
      document.game.understanding.conditions.filter(
        (kind) => kind !== "always",
      )),
  "the Understanding with a key beside its lists": (document) =>
    (document.game.understanding.skills = []),
  "a creature absent from the data": (document) =>
    (document.game.run.lastCombat.creatureId = "dragon"),
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
  // The mark of the map run and the solved maps (D-55, D-189).
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
  "a marked completion without its deposit": (document) => {
    solvingItsMap(document);
    document.game.paused = false;
    document.game.realMsCarry = 0;
    document.game.run.solvedMapRun = true;
    document.game.run.completion = { minute: 212 };
  },
  // The settlement of a death (D-221, D-190): null exactly when the map run has no death, a closed
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
  // The death that spent a use keeps the uses spent after it: exactly the key `usesSpent`, a whole count
  // from 1 up to the data's count of three (D-190); the count of the data is the one of the load, so a
  // count lowered later refuses only a document with more spent than the new count.
  "a resurrection used without its uses spent": (document) =>
    dead(document, { kind: "resurrectionUsed" }),
  "a resurrection used with its uses spent above the data's count": (
    document,
  ) => dead(document, { kind: "resurrectionUsed", usesSpent: 4 }),
  "a resurrection used with its uses spent far above the data's count": (
    document,
  ) => dead(document, { kind: "resurrectionUsed", usesSpent: 10 }),
  "a resurrection used with none spent": (document) =>
    dead(document, { kind: "resurrectionUsed", usesSpent: 0 }),
  "a resurrection used with its uses spent below 0": (document) =>
    dead(document, { kind: "resurrectionUsed", usesSpent: -1 }),
  "a resurrection used with its uses spent fractional": (document) =>
    dead(document, { kind: "resurrectionUsed", usesSpent: 1.5 }),
  "a resurrection used with its uses spent as text": (document) =>
    dead(document, { kind: "resurrectionUsed", usesSpent: "2" }),
  "a resurrection used with its uses spent of none": (document) =>
    dead(document, { kind: "resurrectionUsed", usesSpent: null }),
  "a resurrection used with its uses spent not finite": (document) =>
    dead(document, { kind: "resurrectionUsed", usesSpent: Infinity }),
  "a resurrection used with its uses spent beyond the safe integers": (
    document,
  ) => dead(document, { kind: "resurrectionUsed", usesSpent: 2 ** 53 }),
  "a resurrection used with the old key of the uses left": (document) =>
    dead(document, { kind: "resurrectionUsed", usesLeft: 2 }),
  "a resurrection used with the old key beside the uses spent": (document) =>
    dead(document, { kind: "resurrectionUsed", usesSpent: 1, usesLeft: 2 }),
  "a resurrection used with its uses spent on a map run going on": (document) =>
    (document.game.run.deathSettlement = {
      kind: "resurrectionUsed",
      usesSpent: 2,
    }),
  "no practice holding a generation": (document) =>
    dead(document, { kind: "noPractice", generation: 1 }),
  "no practice with a key added": (document) =>
    dead(document, { kind: "noPractice", note: "x" }),
  "no practice on a map run going on": (document) =>
    (document.game.run.deathSettlement = { kind: "noPractice" }),
  "no practice at a completion": (document) => {
    solvingItsMap(document);
    document.game.paused = false;
    document.game.realMsCarry = 0;
    document.game.run.completion = { minute: 212 };
    document.game.run.deposited = [];
    document.game.run.deathSettlement = { kind: "noPractice" };
  },
  "no practice in the other letter case": (document) =>
    dead(document, { kind: "NoPractice" }),
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
  // The settlement of a first completion (D-190, D-221): its key present, null unless the map run
  // completed a map not solved when it started, then null or one of a closed list of kinds, each
  // with exactly its key.
  "the map run without its completion settlement": (document) =>
    delete document.game.run.completionSettlement,
  "a completion settlement on a map run going on": (document) =>
    (document.game.run.completionSettlement = { kind: "resurrectionReady" }),
  "a completion settlement on a death": (document) => {
    dead(document);
    document.game.run.completionSettlement = { kind: "resurrectionRenewed" };
  },
  "a completion settlement on a completion of a solved map": (document) => {
    firstCompletion(document);
    document.game.run.solvedMapRun = true;
    document.game.run.completionSettlement = { kind: "resurrectionRenewed" };
  },
  "a completion settlement of a kind off its list": (document) => {
    firstCompletion(document);
    document.game.run.completionSettlement = { kind: "revived" };
  },
  "a completion settlement of a kind every object inherits": (document) => {
    firstCompletion(document);
    document.game.run.completionSettlement = { kind: "toString" };
  },
  "a completion settlement of the kind __proto__": (document) => {
    firstCompletion(document);
    document.game.run.completionSettlement = { kind: "__proto__" };
  },
  "a completion settlement without its kind": (document) => {
    firstCompletion(document);
    document.game.run.completionSettlement = {};
  },
  "a completion settlement with a key added": (document) => {
    firstCompletion(document);
    document.game.run.completionSettlement = {
      kind: "resurrectionRenewed",
      at: 1,
    };
  },
  "a completion settlement as text": (document) => {
    firstCompletion(document);
    document.game.run.completionSettlement = "resurrectionRenewed";
  },
  "a completion settlement of false": (document) => {
    firstCompletion(document);
    document.game.run.completionSettlement = false;
  },
  "an earning loop's map run with a completion settlement": (document) =>
    (olaLoop(document).run.completionSettlement = null),
  // The record of the map run (D-368): exactly its three keys, a
  // longest streak from the streak going on (16) to the game minute (212), a count of game minutes
  // for each kind of the closed list and none for another, summing to the game minute, and a list
  // of the items the character entered with as a trip list is read.
  "the map run without its longest streak": (document) =>
    delete document.game.run.longestStreak,
  "the map run without its game minutes by action": (document) =>
    delete document.game.run.minutesByAction,
  "the map run without what it entered with": (document) =>
    delete document.game.run.enteredWith,
  "a longest streak below the streak going on": (document) =>
    (document.game.run.longestStreak = 15),
  "a longest streak above the game minute": (document) =>
    (document.game.run.longestStreak = 213),
  "a longest streak below 0": (document) =>
    (document.game.run.longestStreak = -1),
  "a fractional longest streak": (document) =>
    (document.game.run.longestStreak = 40.5),
  "a longest streak as text": (document) =>
    (document.game.run.longestStreak = "40"),
  "a longest streak of none": (document) =>
    (document.game.run.longestStreak = null),
  "a longest streak not a number": (document) =>
    (document.game.run.longestStreak = NaN),
  "a longest streak beyond the safe integers": (document) =>
    (document.game.run.longestStreak = 2 ** 53),
  "game minutes by action of none": (document) =>
    (document.game.run.minutesByAction = null),
  "game minutes by action as a list": (document) =>
    (document.game.run.minutesByAction = []),
  "a kind missing from the game minutes by action": (document) => {
    delete document.game.run.minutesByAction.wait;
    document.game.run.minutesByAction.explore += 2;
  },
  "a kind outside the closed list": (document) =>
    (document.game.run.minutesByAction.sleep = 0),
  "a combat action among the kinds": (document) =>
    (document.game.run.minutesByAction.kick = 0),
  "another combat action among the kinds": (document) =>
    (document.game.run.minutesByAction.strikeWithStick = 0),
  "a kind every object inherits": (document) =>
    (document.game.run.minutesByAction.toString = 0),
  "a kind named __proto__": (document) =>
    defineProto(document.game.run.minutesByAction, {}),
  "a count of game minutes below 0": (document) => {
    document.game.run.minutesByAction.explore = -1;
    document.game.run.minutesByAction.wander = 71;
  },
  "a fractional count of game minutes": (document) => {
    document.game.run.minutesByAction.explore = 39.5;
    document.game.run.minutesByAction.wander = 30.5;
  },
  "a count of game minutes as text": (document) =>
    (document.game.run.minutesByAction.explore = "40"),
  "a count of game minutes of none": (document) =>
    (document.game.run.minutesByAction.explore = null),
  "a count of game minutes not a number": (document) =>
    (document.game.run.minutesByAction.explore = NaN),
  "a count of game minutes beyond the safe integers": (document) =>
    (document.game.run.minutesByAction.explore = 2 ** 53),
  "counts of game minutes summing to less than the game minute": (document) =>
    (document.game.run.minutesByAction.explore = 39),
  "counts of game minutes summing to more than the game minute": (document) =>
    (document.game.run.minutesByAction.explore = 41),
  "what it entered with of none": (document) =>
    (document.game.run.enteredWith = null),
  "what it entered with as an object": (document) =>
    (document.game.run.enteredWith = {}),
  "an item twice among what it entered with": (document) =>
    document.game.run.enteredWith.push({ item: "stick", count: 1 }),
  "an item absent from the data among what it entered with": (document) =>
    (document.game.run.enteredWith[0].item = "sword"),
  "an entry of what it entered with of count 0": (document) =>
    (document.game.run.enteredWith[0].count = 0),
  "an entry of what it entered with of a fractional count": (document) =>
    (document.game.run.enteredWith[0].count = 2.5),
  "an entry of what it entered with of a count as text": (document) =>
    (document.game.run.enteredWith[0].count = "4"),
  "an entry of what it entered with of a count beyond the safe integers": (
    document,
  ) => (document.game.run.enteredWith[0].count = 2 ** 53),
  "an entry of what it entered with without its count": (document) =>
    delete document.game.run.enteredWith[0].count,
  "an entry of what it entered with with a key added": (document) =>
    (document.game.run.enteredWith[0].note = "x"),
  "an entry of what it entered with of none": (document) =>
    (document.game.run.enteredWith[0] = null),
  "what it entered with with a hole": (document) =>
    (document.game.run.enteredWith[3] = { item: "berry", count: 1 }),
  "a key added to what it entered with": (document) =>
    (document.game.run.enteredWith.extra = 1),
  // The game writes the entries in the order of the data's items (stick, berry, moss, fiber, bandage) and
  // their counts sum to at most the character's carrying capacity (15 in this document).
  "what it entered with out of the order of the data's items": (document) =>
    (document.game.run.enteredWith = [
      { item: "berry", count: 1 },
      { item: "stick", count: 1 },
    ]),
  "what it entered with of a count above the carrying capacity": (document) =>
    (document.game.run.enteredWith[0].count = 16),
  "what it entered with of counts summing above the carrying capacity": (
    document,
  ) =>
    (document.game.run.enteredWith = [
      { item: "stick", count: 8 },
      { item: "berry", count: 8 },
    ]),
  // The activity going on is an ordinary action or a wait, so no minute counts to a combat action.
  "a combat action as the activity going on": (document) =>
    (document.game.run.current.activity = {
      kind: "rule",
      ruleId: 2,
      action: { kind: "kick" },
    }),
  // The earning loop's map run is a plain one: none of the record.
  "an earning loop's map run with a longest streak": (document) =>
    (olaLoop(document).run.longestStreak = 3),
  "an earning loop's map run with game minutes by action": (document) =>
    (olaLoop(document).run.minutesByAction = RUN_RECORD.minutesByAction),
  "an earning loop's map run with what it entered with": (document) =>
    (olaLoop(document).run.enteredWith = []),
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
  // The save time (D-248, D-386): a safe integer of any sign, so a document unstamped is refused.
  "the game without its save time": (document) =>
    delete document.game.saveTimeMs,
  "a save time of none": (document) => (document.game.saveTimeMs = null),
  "a fractional save time": (document) => (document.game.saveTimeMs = 0.5),
  "a save time as text": (document) =>
    (document.game.saveTimeMs = "1760000000000"),
  "a save time not a number": (document) => (document.game.saveTimeMs = NaN),
  "a save time infinite": (document) => (document.game.saveTimeMs = Infinity),
  "a save time beyond the safe integers": (document) =>
    (document.game.saveTimeMs = 2 ** 53),
  "a save time below the safe integers": (document) =>
    (document.game.saveTimeMs = -(2 ** 53)),
  // The moment the game was made (D-04, D-386): a safe integer of any sign, so a document without it, or
  // holding no safe integer, is refused.
  "the game without the moment it was made": (document) =>
    delete document.game.madeAtMs,
  "a moment of the game of none": (document) => (document.game.madeAtMs = null),
  "a fractional moment of the game": (document) =>
    (document.game.madeAtMs = 0.5),
  "a moment of the game as text": (document) =>
    (document.game.madeAtMs = "1759900000000"),
  "a moment of the game not a number": (document) =>
    (document.game.madeAtMs = NaN),
  "a moment of the game infinite": (document) =>
    (document.game.madeAtMs = Infinity),
  "a moment of the game beyond the safe integers": (document) =>
    (document.game.madeAtMs = 2 ** 53),
  "a moment of the game below the safe integers": (document) =>
    (document.game.madeAtMs = -(2 ** 53)),
  // The content revision of a program (D-442): beside its number, name and content, a safe integer from
  // 0; held in the content, in the copy of a map run or in the program of an earning loop, which hold
  // content alone, it is a key the program check does not know.
  "a program without its content revision": (document) =>
    delete document.game.programs[0].contentRevision,
  "a content revision below 0": (document) =>
    (document.game.programs[0].contentRevision = -1),
  "a fractional content revision": (document) =>
    (document.game.programs[1].contentRevision = 1.5),
  "a content revision as text": (document) =>
    (document.game.programs[1].contentRevision = "4"),
  "a content revision of none": (document) =>
    (document.game.programs[1].contentRevision = null),
  "a content revision not a number": (document) =>
    (document.game.programs[0].contentRevision = NaN),
  "a content revision infinite": (document) =>
    (document.game.programs[0].contentRevision = Infinity),
  "a content revision beyond the safe integers": (document) =>
    (document.game.programs[1].contentRevision = 2 ** 53),
  "a content revision held in the content of a program": (document) =>
    (document.game.programs[0].program.contentRevision = 0),
  "a content revision held in the copy of a map run": (document) =>
    (document.game.run.copy.program.contentRevision = 0),
  "a content revision held in the program of an earning loop": (document) =>
    (olaLoop(document).program.contentRevision = 0),
  // The earning loops (D-241): a key in canonical form naming a character of the team.
  "the game without its earning loops": (document) =>
    delete document.game.loops,
  "earning loops of none": (document) => (document.game.loops = null),
  "earning loops as a list": (document) => (document.game.loops = []),
  "an earning loop by a key with a leading zero": (document) =>
    loopUnder(document, "02", 2),
  "an earning loop by a key with a fraction": (document) =>
    loopUnder(document, "2.0", 2),
  "an earning loop by a key with white space": (document) =>
    loopUnder(document, " 2", 2),
  "an earning loop by a key that is no number": (document) =>
    loopUnder(document, "Ola", 2),
  "an earning loop by the key 0": (document) => loopUnder(document, "0", 0),
  "an earning loop by a key below 0": (document) =>
    loopUnder(document, "-2", -2),
  "an earning loop by the key __proto__": (document) =>
    loopUnder(document, "__proto__", 2),
  "an earning loop of a character not in the team": (document) =>
    loopUnder(document, "9", 9),
  "an earning loop of the character of the manual map run": (document) =>
    loopUnder(document, "1", 1),
  // Each key of an earning loop, present and alone.
  "an earning loop with a key added": (document) =>
    (olaLoop(document).pause = true),
  "an earning loop without its program": (document) =>
    delete olaLoop(document).program,
  "an earning loop without its map run": (document) =>
    delete olaLoop(document).run,
  "an earning loop without its run number": (document) =>
    delete olaLoop(document).runNumber,
  "an earning loop without its count of completions": (document) =>
    delete olaLoop(document).completed,
  "an earning loop without its practice": (document) =>
    delete olaLoop(document).practice,
  // Its program, by the program check.
  "an earning loop's program of none": (document) =>
    (olaLoop(document).program = null),
  "an earning loop's program without its trip plan": (document) =>
    delete olaLoop(document).program.tripPlan,
  "an earning loop's program with a key added to a rule": (document) =>
    (olaLoop(document).program.groups[0].rules[0].note = "x"),
  "an earning loop's program with a condition off the list": (document) =>
    (olaLoop(document).program.groups[1].condition = { kind: "nightFalls" }),
  "an earning loop's program with an item twice on a trip list": (document) =>
    olaLoop(document).program.tripPlan.take.push({ item: "berry", count: 1 }),
  "an earning loop's program nested deep": (document) =>
    (olaLoop(document).program.groups = nested(100000)),
  // Its map run: the checks of a map run, with exactly the keys of a `MapRun`.
  "an earning loop's map run of none": (document) =>
    (olaLoop(document).run = null),
  "an earning loop's map run with the copy of a manual one": (document) =>
    (olaLoop(document).run.copy = document.game.run.copy),
  "an earning loop's map run with a frozen bring plan": (document) =>
    (olaLoop(document).run.bringPlan = []),
  "an earning loop's map run with a deposit": (document) =>
    (olaLoop(document).run.deposited = null),
  "an earning loop's map run with a mark": (document) =>
    (olaLoop(document).run.solvedMapRun = false),
  "an earning loop's map run with a death settlement": (document) =>
    (olaLoop(document).run.deathSettlement = null),
  "an earning loop's map run with a key added": (document) =>
    (olaLoop(document).run.speed = 2),
  "an earning loop's map run without its streak": (document) =>
    delete olaLoop(document).run.streak,
  "an earning loop's map run on a map absent from the data": (document) =>
    (olaLoop(document).run.mapId = "desert"),
  "an earning loop's map run with a tile fewer than the map's layout": (
    document,
  ) => olaLoop(document).run.tiles.pop(),
  "an earning loop's character off the map's tiles": (document) =>
    (olaLoop(document).run.character.at = { q: 9, r: 9 }),
  "an earning loop's map run with its game minute fractional": (document) =>
    (olaLoop(document).run.minute = 42.5),
  "an earning loop's map run with its seed beyond 32 bits": (document) =>
    (olaLoop(document).run.seed = 2 ** 32),
  // The character of its map run: the key's, with skills its archetype allows.
  "an earning loop's character another of the team": (document) =>
    (olaLoop(document).run.character.id = 3),
  "an earning loop's character not in the team": (document) =>
    (olaLoop(document).run.character.id = 9),
  "an earning loop's character without its skills": (document) =>
    delete olaLoop(document).run.character.skills,
  "an earning loop's character with a skill absent from the data": (document) =>
    (olaLoop(document).run.character.skills = {
      ...olaLoop(document).run.character.skills,
      swimming: { practice: 0, ranks: {} },
    }),
  "an earning loop's character with ranks beyond its points": (document) =>
    (olaLoop(document).run.character.skills = {
      ...olaLoop(document).run.character.skills,
      flameSpell: { practice: 0, ranks: { quickHand: 1 } },
    }),
  // Its map run goes on: no end, and so an activity or a combat going on.
  "an earning loop's map run ended in a death": (document) =>
    (olaLoop(document).run.death = { minute: 42, cause: "cold" }),
  "an earning loop's map run ended in a completion": (document) =>
    (olaLoop(document).run.completion = { minute: 42 }),
  "an earning loop's map run with no activity and no combat": (document) =>
    (olaLoop(document).run.current = null),
  "an earning loop's map run with an activity beside a combat": (document) =>
    (olaLoop(document).run.activeCombat = {
      creatureId: "wolf",
      attackMinute: 41,
      resolveMinute: 46,
    }),
  // Its map among the solved maps; the manual map run on forestDeep, unmarked, stands on its own.
  "an earning loop on a map absent from the solved maps": (document) =>
    (document.game.solvedMaps = []),
  // The run number from 1, and completions a count below it.
  "a run number of 0, nothing completed": (document) => {
    olaLoop(document).runNumber = 0;
    olaLoop(document).completed = 0;
  },
  "a run number below 0": (document) => (olaLoop(document).runNumber = -4),
  "a fractional run number": (document) => (olaLoop(document).runNumber = 4.5),
  "a run number as text": (document) => (olaLoop(document).runNumber = "4"),
  "a run number of none": (document) => (olaLoop(document).runNumber = null),
  "a run number beyond the safe integers": (document) =>
    (olaLoop(document).runNumber = 2 ** 53),
  "completions below 0": (document) => (olaLoop(document).completed = -1),
  "fractional completions": (document) => (olaLoop(document).completed = 1.5),
  "completions as text": (document) => (olaLoop(document).completed = "3"),
  "completions equal to the run number": (document) =>
    (olaLoop(document).completed = 4),
  "completions above the run number": (document) =>
    (olaLoop(document).completed = 5),
  // The map runs completed in a row with no death and the loop record (D-241): both present, whole
  // numbers from 0, the run in a row not above the record.
  "an earning loop of the shape of version 8, with neither count": (
    document,
  ) => {
    delete olaLoop(document).inARow;
    delete olaLoop(document).loopRecord;
  },
  "an earning loop without its run in a row": (document) =>
    delete olaLoop(document).inARow,
  "an earning loop without its loop record": (document) =>
    delete olaLoop(document).loopRecord,
  "a run in a row above the loop record": (document) =>
    (olaLoop(document).inARow = 4),
  "a loop record below the run in a row": (document) =>
    (olaLoop(document).loopRecord = 1),
  "a run in a row below 0": (document) => {
    olaLoop(document).inARow = -1;
  },
  "a loop record below 0": (document) => {
    olaLoop(document).inARow = 0;
    olaLoop(document).loopRecord = -1;
  },
  "a fractional run in a row": (document) => (olaLoop(document).inARow = 1.5),
  "a fractional loop record": (document) =>
    (olaLoop(document).loopRecord = 3.5),
  "a run in a row as text": (document) => (olaLoop(document).inARow = "2"),
  "a loop record as text": (document) => (olaLoop(document).loopRecord = "3"),
  "a run in a row of none": (document) => (olaLoop(document).inARow = null),
  "a loop record of none": (document) => (olaLoop(document).loopRecord = null),
  "a loop record not a number": (document) =>
    (olaLoop(document).loopRecord = NaN),
  "a loop record infinite": (document) =>
    (olaLoop(document).loopRecord = Infinity),
  "a loop record beyond the safe integers": (document) =>
    (olaLoop(document).loopRecord = 2 ** 53),
  // Its practice, by `practice`.
  "an earning loop's practice of a skill absent from the data": (document) =>
    (olaLoop(document).practice.swimming = 1),
  "an earning loop's practice at 0": (document) =>
    (olaLoop(document).practice.kicking = 0),
  "an earning loop's practice fractional": (document) =>
    (olaLoop(document).practice.exploration = 2.5),
  // The practice waiting at an earning loop is what „Odbierz” pays, so no value that could pay more than the
  // earning loop gathered is admitted: a negative one, one beyond the safe integers, one as text.
  "an earning loop's practice below 0": (document) =>
    (olaLoop(document).practice.exploration = -1),
  "an earning loop's practice beyond the safe integers": (document) =>
    (olaLoop(document).practice.exploration = 2 ** 53),
  "an earning loop's practice as text": (document) =>
    (olaLoop(document).practice.exploration = "12"),
  "the practice of an earning loop's map run without it": (document) =>
    delete olaLoop(document).run.practice,
  "the practice of an earning loop's map run below 0": (document) =>
    (olaLoop(document).run.practice = { exploration: -3 }),
  "the practice of an earning loop's map run fractional": (document) =>
    (olaLoop(document).run.practice = { exploration: 1.5 }),
  "the practice of an earning loop's map run beyond the safe integers": (
    document,
  ) => (olaLoop(document).run.practice = { exploration: 2 ** 53 }),
  "the practice of an earning loop's map run of a skill absent from the data": (
    document,
  ) => (olaLoop(document).run.practice = { swimming: 1 }),
  "an earning loop's practice by the key __proto__": (document) =>
    (olaLoop(document).practice = JSON.parse('{"__proto__":1}')),
  // The stopped earning loops (D-245, D-241): a character of the team, with no earning loop and not the
  // character of the manual map run; a value by `practice`.
  "the game without its stopped earning loops": (document) =>
    delete document.game.stoppedLoops,
  "stopped earning loops of none": (document) =>
    (document.game.stoppedLoops = null),
  "stopped earning loops as a list": (document) =>
    (document.game.stoppedLoops = []),
  "a stopped earning loop by a key with a leading zero": (document) =>
    (document.game.stoppedLoops = { "03": {} }),
  "a stopped earning loop by the key 0": (document) =>
    (document.game.stoppedLoops = { 0: {} }),
  "a stopped earning loop by the key __proto__": (document) =>
    (document.game.stoppedLoops = JSON.parse('{"__proto__":{}}')),
  "a stopped earning loop of a character not in the team": (document) =>
    (document.game.stoppedLoops = { 9: {} }),
  "a stopped earning loop of a character with an earning loop": (document) =>
    (document.game.stoppedLoops = { 2: {} }),
  "a stopped earning loop of the character of the manual map run": (document) =>
    (document.game.stoppedLoops = { 1: {} }),
  "a stopped earning loop of none": (document) =>
    (document.game.stoppedLoops = { 3: null }),
  "a stopped earning loop as a number": (document) =>
    (document.game.stoppedLoops = { 3: 9 }),
  "a stopped earning loop's practice of a skill absent from the data": (
    document,
  ) => (document.game.stoppedLoops[3].swimming = 1),
  "a stopped earning loop's practice at 0": (document) =>
    (document.game.stoppedLoops[3].kicking = 0),
  "a stopped earning loop's practice fractional": (document) =>
    (document.game.stoppedLoops[3].exploration = 2.5),
  // The report (D-246): a list of lines with exactly their keys.
  "the game without its report": (document) => delete document.game.awayReport,
  "a report of none": (document) => (document.game.awayReport = null),
  "a report that is no list": (document) => (document.game.awayReport = {}),
  "a report with a hole": (document) => (document.game.awayReport[5] = null),
  "a line of none": (document) => (document.game.awayReport[1] = null),
  "a line with a key added": (document) => (openLine(document).note = "x"),
  "a line without its character": (document) =>
    delete openLine(document).characterId,
  "a line without its minutes": (document) => delete openLine(document).minutes,
  "a line without its chest": (document) => delete openLine(document).chest,
  // The practice waiting stands at the earning loop, so a line that still holds it is no line.
  "a line still holding its practice": (document) =>
    (openLine(document).practice = { exploration: 14 }),
  "a line still holding an empty practice": (document) =>
    (openLine(document).practice = {}),
  "a line without its flag of a resurrection used": (document) =>
    delete openLine(document).resurrectionUsed,
  "a line without its stop": (document) => delete openLine(document).stop,
  // Its character in the team.
  "a line of a character not in the team": (document) =>
    (openLine(document).characterId = 9),
  "a line of the character number 0": (document) =>
    (openLine(document).characterId = 0),
  "a line of a character as text": (document) =>
    (openLine(document).characterId = "2"),
  "a line of a character of none": (document) =>
    (openLine(document).characterId = null),
  // Its minutes a count.
  "a line's minutes below 0": (document) => (openLine(document).minutes = -1),
  "a line's minutes fractional": (document) =>
    (openLine(document).minutes = 1.5),
  "a line's minutes as text": (document) => (openLine(document).minutes = "9"),
  "a line's minutes of none": (document) => (openLine(document).minutes = null),
  // Its chest: items of the data, each a non-zero safe integer.
  "a line's chest of none": (document) => (openLine(document).chest = null),
  "a line's chest of an item absent from the data": (document) =>
    (openLine(document).chest.sword = 1),
  "a line's chest of a key every object inherits": (document) =>
    (openLine(document).chest = JSON.parse('{"toString":1}')),
  "a line's chest by the key __proto__": (document) =>
    (openLine(document).chest = JSON.parse('{"__proto__":1}')),
  "a line's chest holding a zero": (document) =>
    (openLine(document).chest.moss = 0),
  "a line's chest holding a negative zero": (document) =>
    (openLine(document).chest.moss = -0),
  "a line's chest fractional": (document) =>
    (openLine(document).chest.stick = 7.5),
  "a line's chest as text": (document) =>
    (openLine(document).chest.stick = "7"),
  "a line's chest beyond the safe integers": (document) =>
    (openLine(document).chest.stick = 2 ** 53),
  "a line's chest below the safe integers": (document) =>
    (openLine(document).chest.berry = -(2 ** 53)),
  // Its flag of a resurrection used.
  "a line's flag of a resurrection as text": (document) =>
    (openLine(document).resurrectionUsed = "true"),
  "a line's flag of a resurrection of 1": (document) =>
    (openLine(document).resurrectionUsed = 1),
  "a line's flag of a resurrection of none": (document) =>
    (openLine(document).resurrectionUsed = null),
  // Its stop: none, or a generation from 2 up to the character's current one with a flag.
  "a stop of false": (document) => (stoppedLine(document).stop = false),
  "a stop as text": (document) => (stoppedLine(document).stop = "away"),
  "a stop as a list": (document) => (stoppedLine(document).stop = [3, true]),
  "a stop with a key added": (document) =>
    (stoppedLine(document).stop.note = "x"),
  "a stop without its generation": (document) =>
    delete stoppedLine(document).stop.generation,
  "a stop without its flag": (document) =>
    delete stoppedLine(document).stop.away,
  "a stop's flag as text": (document) =>
    (stoppedLine(document).stop.away = "true"),
  "a stop's flag of none": (document) =>
    (stoppedLine(document).stop.away = null),
  "a stop at generation 1": (document) =>
    (stoppedLine(document).stop.generation = 1),
  "a stop at generation 0": (document) =>
    (stoppedLine(document).stop.generation = 0),
  "a stop at a fractional generation": (document) =>
    (stoppedLine(document).stop.generation = 2.5),
  "a stop at a generation as text": (document) =>
    (stoppedLine(document).stop.generation = "3"),
  "a stop at a generation of none": (document) =>
    (stoppedLine(document).stop.generation = null),
  "a stop above the character's current generation": (document) =>
    (stoppedLine(document).stop.generation = 4),
  "a stop at a generation only another character reached": (document) => {
    stoppedLine(document).characterId = 2;
  },
  // Its minutes against its stop, and one open line for a character.
  "an open line with no minute": (document) => (openLine(document).minutes = 0),
  "a line stopped away with no minute": (document) =>
    (stoppedLine(document).minutes = 0),
  "two open lines of one character": (document) =>
    document.game.awayReport.push({ ...openLine(document) }),
  // The judgings the browser remembers are no part of the game state (D-441): a document holding the
  // key, empty or filled, is of another shape.
  "an empty judgings key added to the game": (document) =>
    (document.game.judgings = {}),
  "a judgings key added to the game, filled as the browser stores a judging": (
    document,
  ) =>
    (document.game.judgings = {
      1: {
        1: {
          forest: {
            results: Array.from({ length: 12 }, () => "solved"),
            equipment: [{ item: "stick", count: 4 }],
          },
        },
      },
    }),
  // Deep nesting where a value stands.
  "the pace nested deep": (document) => (document.game.pace = nested(100000)),
  "a tile's stock nested deep": (document) =>
    (document.game.run.tiles[0].stock = { stick: nested(100000) }),
  "the groups of a program nested deep": (document) =>
    (document.game.programs[0].program.groups = nested(100000)),
};

// The bandage and the two verbs „Wytwórz” and „Opatrz” (D-443): a backpack holds exactly the data's
// items, the bandage among them; no tile holds a bandage, which is no resource; and the game minutes
// by action hold exactly the kinds of the data's ordinary actions, both verbs among them.
Object.assign(CRAFTED, {
  "the map run's backpack without the bandage": (document) =>
    delete document.game.run.character.backpack.bandage,
  "an earning loop's backpack without the bandage": (document) =>
    delete olaLoop(document).run.character.backpack.bandage,
  "the map run's backpack of version 9: the four items alone": (document) =>
    (document.game.run.character.backpack = {
      stick: 4,
      berry: 2,
      moss: 1,
      fiber: 0,
    }),
  "the map run's backpack with a bandage count below 0": (document) =>
    (document.game.run.character.backpack.bandage = -1),
  "the map run's backpack with a fractional bandage count": (document) =>
    (document.game.run.character.backpack.bandage = 0.5),
  "the map run's backpack with a bandage count as text": (document) =>
    (document.game.run.character.backpack.bandage = "1"),
  "the map run's backpack with a bandage count of none": (document) =>
    (document.game.run.character.backpack.bandage = null),
  "the map run's backpack with a bandage count beyond the safe integers": (
    document,
  ) => (document.game.run.character.backpack.bandage = 2 ** 53),
  "the map run's backpack with the bandage and an item the data lack": (
    document,
  ) => (document.game.run.character.backpack.sword = 0),
  "a tile whose stock names the bandage": (document) =>
    (document.game.run.tiles[2].stock = { bandage: 1 }),
  "a tile whose stock names the bandage beside a resource": (document) =>
    (document.game.run.tiles[1].stock = { stick: 12, berry: 8, bandage: 1 }),
  "a tile of an earning loop's map run whose stock names the bandage": (
    document,
  ) => (olaLoop(document).run.tiles[2].stock = { bandage: 1 }),
  "what it entered with holding the bandage before the sticks": (document) =>
    (document.game.run.enteredWith = [
      { item: "bandage", count: 1 },
      { item: "stick", count: 4 },
    ]),
  "the chest holding a bandage count below 0": (document) =>
    (document.game.team.chest.pieces.bandage = -1),
  "the chest holding a fractional bandage count": (document) =>
    (document.game.team.chest.pieces.bandage = 0.5),
  "the chest holding the bandage beyond its capacity": (document) =>
    (document.game.team.chest.pieces = { stick: 60, bandage: 1 }),
  "the game minutes by action without „Wytwórz”": (document) => {
    delete document.game.run.minutesByAction.craft;
    document.game.run.minutesByAction.gather += 10;
  },
  "the game minutes by action without „Opatrz”": (document) => {
    delete document.game.run.minutesByAction.tend;
    document.game.run.minutesByAction.gather += 5;
  },
  "the game minutes by action without „Załóż”": (document) => {
    delete document.game.run.minutesByAction.equip;
    document.game.run.minutesByAction.gather += 4;
  },
  "the game minutes by action with „Załóż” below 0": (document) => {
    document.game.run.minutesByAction.equip = -1;
    document.game.run.minutesByAction.gather = 60;
  },
  "the game minutes by action with „Załóż” fractional": (document) => {
    document.game.run.minutesByAction.equip = 3.5;
    document.game.run.minutesByAction.gather = 55.5;
  },
  "the game minutes by action with „Załóż” as text": (document) =>
    (document.game.run.minutesByAction.equip = "4"),
  "the game minutes by action with „Załóż” of none": (document) =>
    (document.game.run.minutesByAction.equip = null),
  "the game minutes by action summing to less with „Załóż” counted": (
    document,
  ) => (document.game.run.minutesByAction.equip = 3),
  "the game minutes by action of version 9: neither verb": (document) => {
    delete document.game.run.minutesByAction.craft;
    delete document.game.run.minutesByAction.tend;
    document.game.run.minutesByAction.gather += 15;
  },
  "the game minutes by action with „Wytwórz” below 0": (document) => {
    document.game.run.minutesByAction.craft = -1;
    document.game.run.minutesByAction.gather = 66;
  },
  "the game minutes by action with „Opatrz” fractional": (document) => {
    document.game.run.minutesByAction.tend = 4.5;
    document.game.run.minutesByAction.gather = 55.5;
  },
  "the game minutes by action with „Wytwórz” as text": (document) =>
    (document.game.run.minutesByAction.craft = "10"),
  "the game minutes by action with „Opatrz” of none": (document) =>
    (document.game.run.minutesByAction.tend = null),
  "the game minutes by action with „Wytwórz” beyond the safe integers": (
    document,
  ) => (document.game.run.minutesByAction.craft = 2 ** 53),
  "the game minutes by action summing to less with „Opatrz” counted": (
    document,
  ) => (document.game.run.minutesByAction.tend = 4),
});

/** Ala, the character of the manual map run, who holds a stick and a bandage. */
const ala = (document) => document.game.team.characters[0];
/** Ola, the character of the earning loop, whose main hand the player changed. */
const ola = (document) => document.game.team.characters[1];
/** Ewa, whose earning loop stopped, so she has none. */
const ewa = (document) => document.game.team.characters[2];

/**
 * The places a gear stands in a document: a character of the team, the character of the manual map
 * run and the character of an earning loop's map run.
 */
const GEAR_PLACES_OF = {
  "a character's gear": (document) => ala(document).gear,
  "the map run's gear": (document) => document.game.run.character.gear,
  "an earning loop's gear": (document) => olaLoop(document).run.character.gear,
  "a combat result's gear": (document) =>
    document.game.run.lastCombat.result.gear,
};

/** The result of the last combat of the manual map run. */
const fought = (document) => document.game.run.lastCombat.result;

/**
 * What no gear holds (D-456): a piece in a slot whose place it does not fit, an item the data lack, a
 * slot missing or one more, a value of another type in a slot.
 */
const NOT_A_GEAR = {
  "a stick in a pocket": (gear) => (gear.pocket3 = "stick"),
  "a bandage in the main hand": (gear) => (gear.mainHand = "bandage"),
  "a stick in the second hand": (gear) => (gear.secondHand = "stick"),
  "a bandage on the head": (gear) => (gear.head = "bandage"),
  "berries, which fit no slot, in the main hand": (gear) =>
    (gear.mainHand = "berry"),
  "moss, which fits no slot, in a pocket": (gear) => (gear.pocket3 = "moss"),
  "an item the data lack": (gear) => (gear.mainHand = "sword"),
  "the key every object inherits as an item": (gear) =>
    (gear.mainHand = "toString"),
  "an empty item": (gear) => (gear.mainHand = ""),
  "an item in capitals": (gear) => (gear.mainHand = "STICK"),
  "an item as a number": (gear) => (gear.mainHand = 1),
  "an item as a truth value": (gear) => (gear.mainHand = false),
  "an item as a list": (gear) => (gear.mainHand = ["stick"]),
  "an item as an object": (gear) => (gear.mainHand = { item: "stick" }),
  "a count of bandages in one pocket": (gear) => (gear.pocket3 = 3),
  "a slot missing": (gear) => delete gear.pocket3,
  "the main hand missing": (gear) => delete gear.mainHand,
  "a fourth pocket": (gear) => (gear.pocket4 = null),
  "a pocket of number 0": (gear) => (gear.pocket0 = null),
  "a slot the data lack": (gear) => (gear.belt = null),
  "a slot named by its place": (gear) => (gear.pocket = null),
  "an own __proto__ beside the slots": (gear) => defineProto(gear, null),
};

for (const [where, gearOf] of Object.entries(GEAR_PLACES_OF)) {
  for (const [what, change] of Object.entries(NOT_A_GEAR))
    CRAFTED[`${where} with ${what}`] = (document) => change(gearOf(document));
}

Object.assign(CRAFTED, {
  // A gear of another type than a slot-by-slot record.
  "a character's gear of none": (document) => (ala(document).gear = null),
  "a character's gear as a list of its slots": (document) =>
    (ala(document).gear = [
      "stick",
      null,
      null,
      null,
      null,
      null,
      "bandage",
      null,
    ]),
  "a character's gear as an item": (document) => (ala(document).gear = "stick"),
  "a character's gear as a count of pieces": (document) =>
    (ala(document).gear = { stick: 1, bandage: 1 }),
  "the map run's gear of none": (document) =>
    (document.game.run.character.gear = null),
  "the map run's gear as a list": (document) =>
    (document.game.run.character.gear = []),
  "an earning loop's gear as a text": (document) =>
    (olaLoop(document).run.character.gear = "mainHand"),
  // The keys of a character and of a map run's character, exactly.
  "a character without its gear": (document) => delete ala(document).gear,
  "a character without its changed slots": (document) =>
    delete ola(document).changedSlots,
  "a character without its count of gear changes": (document) =>
    delete ewa(document).gearChanges,
  "the map run's character without its gear": (document) =>
    delete document.game.run.character.gear,
  "an earning loop's character without its gear": (document) =>
    delete olaLoop(document).run.character.gear,
  "the map run's character holding changed slots": (document) =>
    (document.game.run.character.changedSlots = []),
  "the map run's character holding a count of gear changes": (document) =>
    (document.game.run.character.gearChanges = 0),
  // The changed slots: slots of the data, each once, and only at a character in an earning loop.
  "a changed slot at the character of the manual map run": (document) =>
    (ala(document).changedSlots = ["mainHand"]),
  "a changed slot at a character whose earning loop stopped": (document) =>
    (ewa(document).changedSlots = ["head"]),
  "a changed slot named twice": (document) =>
    (ola(document).changedSlots = ["mainHand", "mainHand"]),
  "a pocket changed twice": (document) =>
    (ola(document).changedSlots = ["pocket2", "mainHand", "pocket2"]),
  "a changed slot the data lack": (document) =>
    (ola(document).changedSlots = ["pocket4"]),
  "a changed slot named by its place": (document) =>
    (ola(document).changedSlots = ["pocket"]),
  "a changed slot named by its name": (document) =>
    (ola(document).changedSlots = ["Ręka główna"]),
  "a changed slot of none": (document) => (ola(document).changedSlots = [null]),
  "a changed slot as a number": (document) =>
    (ola(document).changedSlots = [0]),
  "the changed slots as a text": (document) =>
    (ola(document).changedSlots = "mainHand"),
  "the changed slots of none": (document) =>
    (ola(document).changedSlots = null),
  "the changed slots as an object": (document) =>
    (ola(document).changedSlots = { mainHand: true }),
  // The count of the player's gear changes: a safe integer from 0 (D-463).
  "a count of gear changes below 0": (document) =>
    (ala(document).gearChanges = -1),
  "a fractional count of gear changes": (document) =>
    (ala(document).gearChanges = 2.5),
  "a count of gear changes as text": (document) =>
    (ala(document).gearChanges = "3"),
  "a count of gear changes of none": (document) =>
    (ala(document).gearChanges = null),
  "a count of gear changes not a number": (document) =>
    (ala(document).gearChanges = NaN),
  "an infinite count of gear changes": (document) =>
    (ala(document).gearChanges = Infinity),
  "a count of gear changes beyond the safe integers": (document) =>
    (ala(document).gearChanges = 2 ** 53),
  // The gear and the backpack a combat result holds (D-457): a gear as any gear, a backpack of the
  // data's items within the carrying capacity of the map run's character, 15.
  "a combat result without its gear": (document) =>
    delete fought(document).gear,
  "a combat result without its backpack": (document) =>
    delete fought(document).backpack,
  "a combat result's gear of none": (document) =>
    (fought(document).gear = null),
  "a combat result whose backpack holds 16 pieces, over the carrying capacity":
    (document) =>
      (fought(document).backpack = {
        stick: 10,
        berry: 3,
        moss: 1,
        fiber: 1,
        bandage: 1,
      }),
  "a combat result whose backpack holds 16 sticks": (document) =>
    (fought(document).backpack.stick = 16),
  "a combat result's backpack with a count below 0": (document) =>
    (fought(document).backpack.moss = -1),
  "a combat result's backpack with a fractional count": (document) =>
    (fought(document).backpack.stick = 2.5),
  "a combat result's backpack without an item of the data": (document) =>
    delete fought(document).backpack.bandage,
  "a combat result's backpack with an item the data lack": (document) =>
    (fought(document).backpack.sword = 0),
  "a combat result's backpack as a list": (document) =>
    (fought(document).backpack = [3, 2, 1, 0, 0]),
  // The mark of a refill: a truth value at each action of the character, true only where the
  // action uses an item, as the strike its stick.
  "an action of a combat record without its refill mark": (document) =>
    delete fought(document).exchanges[0].characterAction.refill,
  "a refill mark as text": (document) =>
    (fought(document).exchanges[0].characterAction.refill = "true"),
  "a refill mark as a number": (document) =>
    (fought(document).exchanges[2].characterAction.refill = 0),
  "a refill mark of none": (document) =>
    (fought(document).exchanges[0].characterAction.refill = null),
  "a refill marked on a kick": (document) =>
    (fought(document).exchanges[2].characterAction = {
      ...fought(document).exchanges[2].characterAction,
      action: { kind: "kick" },
      refill: true,
    }),
  "a refill marked on a dodge": (document) =>
    (fought(document).exchanges[3].characterAction = {
      ...fought(document).exchanges[3].characterAction,
      action: { kind: "dodge" },
      refill: true,
    }),
  "a refill mark on an exchange with no action of the character": (document) =>
    (fought(document).exchanges[1].refill = true),
  // „Załóż” in a turn of a combat record: its item a stick or a bandage as in any program, no refill
  // and no damage, since it takes a piece from the backpack into a slot and deals nothing.
  "a turn of „Załóż” with a refill mark": (document) =>
    (fought(document).exchanges[1].characterAction.refill = true),
  "a turn of „Załóż” with damage": (document) =>
    (fought(document).exchanges[1].characterAction.damage = 6),
  "a turn of „Załóż” with a fractional damage": (document) =>
    (fought(document).exchanges[1].characterAction.damage = 0.5),
  "a turn of „Załóż” with no item": (document) =>
    (fought(document).exchanges[1].characterAction.action = {
      kind: "equip",
    }),
  "a turn of „Załóż” with an item the data lack": (document) =>
    (fought(document).exchanges[1].characterAction.action = {
      kind: "equip",
      item: "sword",
    }),
  "a turn of „Załóż” with an item that fits no place of the gear": (document) =>
    (fought(document).exchanges[1].characterAction.action = {
      kind: "equip",
      item: "moss",
    }),
  "a turn of „Załóż” with a field beyond its kind and item": (document) =>
    (fought(document).exchanges[1].characterAction.action = {
      kind: "equip",
      item: "bandage",
      resource: "moss",
    }),
  "an action no turn carries out in place of a turn of the character": (
    document,
  ) =>
    (fought(document).exchanges[1].characterAction.action = {
      kind: "wander",
    }),
});

/**
 * The places an action of „Wytwórz”, „Opatrz” or „Załóż” stands in a document: a rule of a program, of a copy,
 * of a base and of an earning loop's program, and the activity going on of the map run and of an
 * earning loop. Each sets the action `action` of `kind` where the document has one of that kind.
 */
const VERB_PLACES = {
  "a program": (document, kind, action) =>
    (document.game.programs[1].program.groups[0].rules[
      kind === "craft" ? 2 : 3
    ].action = action),
  "a copy": (document, kind, action) =>
    (document.game.run.copy.program.groups[0].rules[
      kind === "craft" ? 3 : 4
    ].action = action),
  "a base": (document, kind, action) =>
    (document.game.run.copy.base.groups[0].rules[
      kind === "craft" ? 3 : 4
    ].action = action),
  "an earning loop's program": (document, kind, action) =>
    (olaLoop(document).program.groups[0].rules[
      kind === "craft" ? 2 : 3
    ].action = action),
  "the activity going on": (document, _kind, action) =>
    (document.game.run.current.activity.action = action),
  "an earning loop's activity going on": (document, _kind, action) =>
    (olaLoop(document).run.current.activity.action = action),
};

const VERB_NAMES = {
  craft: "„Wytwórz”",
  tend: "„Opatrz”",
  equip: "„Załóż”",
};

/** The targets no verb takes: the items without its property, an identifier the data lack, a value no identifier. */
const NOT_TARGETS = {
  craft: ["moss", "stick", "fiber", "berry"],
  tend: ["moss", "stick", "fiber", "berry"],
  equip: ["moss", "fiber", "berry"],
};

/** What the data give an item that a verb takes as its target: the property its targets are the items of. */
const TARGET_PROPERTY = {
  craft: "recipe",
  tend: "healing",
  equip: "place of the gear",
};

const NOT_ITEMS = {
  "an identifier the data lack": "sword",
  "the key every object inherits": "toString",
  "the key constructor": "constructor",
  "an empty identifier": "",
  "the identifier in capitals": "BANDAGE",
  "the identifier with a space after it": "bandage ",
  "an item of none": null,
  "an item as a number": 1,
  "an item as a list": ["bandage"],
  "an item as an object": { id: "bandage" },
  "an item as a truth value": true,
};

for (const [place, set] of Object.entries(VERB_PLACES)) {
  for (const kind of ["craft", "tend", "equip"]) {
    const verb = VERB_NAMES[kind];
    const refused = {
      ...Object.fromEntries(
        NOT_TARGETS[kind].map((item) => [
          `${item}, which the data give no ${TARGET_PROPERTY[kind]}`,
          { kind, item },
        ]),
      ),
      ...Object.fromEntries(
        Object.entries(NOT_ITEMS).map(([name, item]) => [name, { kind, item }]),
      ),
      "no item": { kind },
      "a field beyond its kind and item": {
        kind,
        item: "bandage",
        resource: "moss",
      },
    };
    for (const [what, action] of Object.entries(refused))
      CRAFTED[`${verb} in ${place} with ${what}`] = (document) =>
        set(document, kind, action);
  }
}

// invariant: save-version
test("each place of an action holds „Wytwórz”, „Opatrz” and „Załóż” with the bandage, and loads", () => {
  // decision: D-443 "An action is a verb with a target, and the targets a verb takes follow from the properties of the items in the game's data."
  for (const [place, set] of Object.entries(VERB_PLACES)) {
    for (const kind of ["craft", "tend", "equip"]) {
      const document = changed((copy) =>
        set(copy, kind, { kind, item: "bandage" }),
      );
      assert.deepEqual(
        loadSavedGame(document),
        { ok: true, state: document.game },
        `${VERB_NAMES[kind]} in ${place}`,
      );
    }
  }
});

// invariant: save-version
test("a crafted document of the current version is refused whole as shape", () => {
  // decision: D-403 "The load refuses a saved game state whose Understanding does not hold the condition „Zawsze” and the action „Eksploruj”, as a saved game state of a shape the game does not admit"
  // decision: D-191 "A character skill has one practice counter and one curve, and what is saved of it is its practice and the ranks of branches bought, its level, free points and every effect being computed from these two"
  // decision: D-50 "The chest belongs to a team and has a cap on the total count of pieces, by the same rule of capacity as the backpack"
  // decision: D-56 "Each character carries a number the game gives it when the character is created, 1 for the first character of a game and one more than the number the game state gave last for each later one, so the numbers of two characters of one game differ"
  // decision: D-56 "A map run names the team's character it carries by that number"
  // decision: D-221 "A load refuses a saved game state that holds a death unsettled"
  // decision: D-213 "Saved-game code turns a game state into the saved document of the current version of its shape, and an unknown value — a saved game state downloaded from the server or the unsaved game state kept in the page's memory (D-211) — into a game state or a refusal naming why, inside the simulation, no value a document can hold making it throw, and changing nothing passed to it"
  // decision: D-239 "An earning loop goes only on a solved map, one game minute per real minute, and the speed control does not reach it, while a manual map run may be fast-forwarded"
  // decision: D-241 "The game state holds its earning loops beside the one manual map run, by character number, so a character has at most one, each with the content of the program taken at its start, its map run going on, the number of that map run, the count of its completions and the practice gathered from those completions since the player last took the practice waiting with „Odbierz”"
  // decision: D-241 "In every game state the browser view holds or a saved game state admits, the map run of an earning loop is going on: the function that reaches its end deals with that end at once"
  // decision: D-248 "The save time comes from the browser's clock and lies in the game state: a saved document carries the moment it was saved, written on its way to the document, and the game state the browser view holds stays the value it was"
  // decision: D-369 "A manual map run keeps, in the map run of the game state and so in the saved game state"
  // decision: D-369 "The record begins at the start of the map run and again at „Restart”"
  // decision: D-241 "Each earning loop also holds, from its start, the number of its map runs completed in a row with no death between them, which a death that does not stop the earning loop sets back to zero, and the largest such number, its loop record"
  // decision: D-441 "The saved game state holds no judging, and nothing of a remembered judging enters the game state, which is whole without it."
  // decision: D-386 "The moment the game was made (D-04) is a moment the game state stores too, which the load takes as a safe integer of milliseconds of any sign without comparing it with any clock, and the load takes the content revision of each program (D-442) as any safe integer from 0, comparing it with nothing"
  // decision: D-442 "Each program of the player's list carries a content revision, a whole number kept with its number, its name and its content"
  // decision: D-442 "The copy of a map run and the program of an earning loop hold content alone and carry no content revision"
  // decision: D-165 "Each program of the player carries a number the game gives it when the program is created, one more than the number the game state gave last, so the numbers of two programs of one game differ, a deleted program's number included"
  // decision: D-456 "The gear has eight slots, each holding one piece: „Ręka główna”, „Druga ręka”, „Głowa”, „Tułów”, „Nogi” and three pockets of the belt, each slot being of one place, the three pockets of the place „Kieszeń”."
  // decision: D-456 "The data of each item name the place it fits: the stick fits the main hand and the bandage a pocket."
  // decision: D-457 "That action then takes a fitting piece from the backpack into the slot itself and acts at once, with no time besides its own."
  for (const [name, change] of Object.entries(CRAFTED))
    assertRefused(name, changed(change), "shape");
});

// invariant: save-version
test("a document at the edges of what the gear admits loads", () => {
  // decision: D-386 "The load of a saved game state admits every game state the game's own functions make, so the game never writes a saved game state that its own load discards"
  // decision: D-456 "The data of each item name the place it fits: the stick fits the main hand and the bandage a pocket."
  const edges = {
    "a bandage in each of the three pockets": (document) =>
      Object.assign(ala(document).gear, {
        pocket1: "bandage",
        pocket2: "bandage",
        pocket3: "bandage",
      }),
    "the map run's gear empty beside its character's stick": (document) =>
      (document.game.run.character.gear = { ...EMPTY_GEAR }),
    "every slot changed at the character of the earning loop": (document) =>
      (ola(document).changedSlots = [
        "pocket3",
        "legs",
        "mainHand",
        "secondHand",
        "head",
        "torso",
        "pocket1",
        "pocket2",
      ]),
    "no slot changed at the character of the earning loop": (document) =>
      (ola(document).changedSlots = []),
    "the highest safe count of gear changes": (document) =>
      (ewa(document).gearChanges = Number.MAX_SAFE_INTEGER),
    "a count of gear changes of 0 beside a held gear": (document) =>
      (ala(document).gearChanges = 0),
    "a combat result whose backpack holds the whole carrying capacity": (
      document,
    ) =>
      (fought(document).backpack = {
        stick: 12,
        berry: 2,
        moss: 1,
        fiber: 0,
        bandage: 0,
      }),
    "a combat result with an empty gear and no refill": (document) => {
      fought(document).gear = { ...EMPTY_GEAR };
      fought(document).exchanges[0].characterAction.refill = false;
    },
  };
  for (const [name, change] of Object.entries(edges)) {
    const document = changed(change);
    assert.deepEqual(
      loadSavedGame(document),
      { ok: true, state: document.game },
      name,
    );
  }
});

// invariant: save-version
// D-368, D-212: the record comes back whole after a load, whichever way the map run stands.
test("the record loads back whole from a map run that goes on, one that died and one that completed", () => {
  // decision: D-135 "A manual map run keeps the longest streak it reached"
  // decision: D-212 "A manual map run of a loaded saved game state that goes on comes back at the game minute of the save, paused, with the pace of the save, and the player resumes it with „Wznów”; one that ended in a completion or in the character's death comes back with its screen after its end, with „Restart”, „Zakończ” and the copy open to editing as D-62, D-132 and D-173 give, and with the end-of-run window (D-368) open again, holding all it held but „Ostatnie minuty”, which stand only where the chronicle holds the entries (D-339)"
  // decision: D-369 "A manual map run keeps, in the map run of the game state and so in the saved game state"
  const going = changed((document) => {
    document.game.paused = false;
    document.game.discovery = null;
  });
  const died = changed((document) => dead(document));
  const completed = changed((document) => {
    document.game.paused = false;
    document.game.realMsCarry = 0;
    solvingItsMap(document);
    document.game.run.completion = { minute: 212 };
    document.game.run.deposited = [{ item: "berry", count: 2 }];
  });
  for (const [name, document] of Object.entries({ going, died, completed })) {
    const loaded = loadSavedGame(document);
    assert.equal(loaded.ok, true, name);
    const { run } = loaded.state;
    assert.equal(run.longestStreak, RUN_RECORD.longestStreak, name);
    assert.deepEqual(run.minutesByAction, RUN_RECORD.minutesByAction, name);
    assert.deepEqual(run.enteredWith, RUN_RECORD.enteredWith, name);
  }
});

// invariant: save-version
// Catches a condition set one step too strict, each edge being a value the game writes.
test("a record at the edges of what it admits loads", () => {
  // decision: D-369 "The record begins at the start of the map run and again at „Restart”"
  const onlyWaiting = Object.fromEntries(
    Object.keys(RUN_RECORD.minutesByAction).map((kind) => [kind, 0]),
  );
  const edges = {
    "a longest streak equal to the streak going on": (document) =>
      (document.game.run.longestStreak = 16),
    "a longest streak equal to the game minute": (document) =>
      (document.game.run.longestStreak = 212),
    "every game minute counted to one kind": (document) =>
      (document.game.run.minutesByAction = { ...onlyWaiting, wait: 212 }),
    "a map run that entered with nothing": (document) =>
      (document.game.run.enteredWith = []),
    "a map run that entered with the whole of its carrying capacity in two items":
      (document) =>
        (document.game.run.enteredWith = [
          { item: "stick", count: 8 },
          { item: "berry", count: 7 },
        ]),
    "a map run that entered with every item": (document) =>
      (document.game.run.enteredWith = [
        { item: "stick", count: 1 },
        { item: "berry", count: 1 },
        { item: "moss", count: 1 },
        { item: "fiber", count: 1 },
        { item: "bandage", count: 1 },
      ]),
  };
  for (const [name, change] of Object.entries(edges)) {
    const document = changed(change);
    assert.deepEqual(
      loadSavedGame(document),
      { ok: true, state: document.game },
      name,
    );
  }
});

// invariant: save-version
// The chest holds at most the balance data's chestCapacity (balance.ts: 60), and that count is
// allowed: a chest of exactly it loads, one piece beyond it is refused.
test("a chest holding exactly its capacity loads, and one piece beyond it is refused as shape", () => {
  // decision: D-50 "The chest belongs to a team and has a cap on the total count of pieces, by the same rule of capacity as the backpack"
  const full = changed((document) => {
    document.game.team.chest.pieces = { stick: 60 };
  });
  assert.deepEqual(loadSavedGame(full), { ok: true, state: full.game });
  assertRefused(
    "a chest one piece beyond its capacity",
    changed((document) => {
      document.game.team.chest.pieces = { stick: 60, berry: 1 };
    }),
    "shape",
  );
});

// A completion may deposit exactly what its frozen bring plan planned, each item at its count
// (D-179): berry 5 and stick 20 in the document.
test("a completion depositing exactly the planned counts loads", () => {
  const exact = changed((document) => {
    solvingItsMap(document);
    document.game.paused = false;
    document.game.realMsCarry = 0;
    document.game.run.completion = { minute: 212 };
    document.game.run.deposited = [
      { item: "berry", count: 5 },
      { item: "stick", count: 20 },
    ];
  });
  assert.deepEqual(loadSavedGame(exact), { ok: true, state: exact.game });
});

// A manual run of a solved map brings its loot out as every other map run does, so its completion
// deposits by the same rule: entries of the frozen bring plan in its order, each at most its planned
// count (D-179, D-189). Berry 5 and stick 20 in the document, as in the case above.
test("a completion of a marked run depositing its planned counts loads, and a deposit beyond them is refused as shape", () => {
  // decision: D-189 "A manual map run of a map already solved takes its equipment from the chest and brings its loot out to it as every other map run does (D-179), and pays no practice."
  // decision: D-179 "The trip plan is a field of the program, both its lists are bound at the start of a map run — the list of what comes out as a frozen snapshot — and at a completion only what that list names goes to the chest"
  const marked = (deposited) =>
    changed((document) => {
      solvingItsMap(document);
      document.game.paused = false;
      document.game.realMsCarry = 0;
      document.game.run.solvedMapRun = true;
      document.game.run.completion = { minute: 212 };
      document.game.run.deposited = deposited;
    });
  const exact = marked([
    { item: "berry", count: 5 },
    { item: "stick", count: 20 },
  ]);
  assert.deepEqual(loadSavedGame(exact), { ok: true, state: exact.game });
  assertRefused(
    "a marked deposit above its planned count",
    marked([{ item: "berry", count: 6 }]),
    "shape",
  );
  assertRefused(
    "a marked deposit of an item the frozen bring plan lacks",
    marked([{ item: "moss", count: 1 }]),
    "shape",
  );
  assertRefused(
    "a marked deposit out of the frozen bring plan's order",
    marked([
      { item: "stick", count: 4 },
      { item: "berry", count: 2 },
    ]),
    "shape",
  );
});

// invariant: save-version
// Two characters of one number, the rest of the document sound: the number alone refuses it.
test("two characters of one number are refused as shape, the rest of the document sound", () => {
  assert.deepEqual(loadSavedGame(structuredClone(HEADQUARTERS)), {
    ok: true,
    state: HEADQUARTERS.game,
  });
  assertRefused(
    "two characters of one number",
    changed((document) => {
      // A character with no earning loop of its own holds no changed slot.
      document.game.team.characters.push({
        ...structuredClone(document.game.team.characters[0]),
        name: "Ewa",
        changedSlots: [],
      });
    }, HEADQUARTERS),
    "shape",
  );
});

// invariant: save-version
// A character whose number is not below the character counter, the rest of the document sound: its
// number is 2 and the next character number is 2, and no record names character 2; with the next
// number 3 the same character loads.
test("a character whose number is the next character number is refused as shape, the rest of the document sound", () => {
  const withSecondCharacter = (nextCharacterId) =>
    changed((document) => {
      // A character with no earning loop of its own holds no changed slot.
      document.game.team.characters.push({
        ...structuredClone(document.game.team.characters[0]),
        id: 2,
        name: "Ewa",
        changedSlots: [],
      });
      document.game.nextCharacterId = nextCharacterId;
    }, HEADQUARTERS);
  // Precondition: with a next number above its own, the second character is sound.
  assert.equal(loadSavedGame(withSecondCharacter(3)).ok, true);
  assertRefused(
    "a character numbered as the next character number",
    withSecondCharacter(2),
    "shape",
  );
});

// invariant: save-version
// A program whose number is not below the program counter, the rest of the document sound: its
// number is 2 and the next program number is 2, and no record names program 2.
test("a program whose number is not below the next program number is refused as shape", () => {
  assertRefused(
    "a program numbered as the next program number",
    changed((document) => {
      document.game.programs.push({
        id: 2,
        name: "Other",
        program: structuredClone(PROGRAM_1),
        contentRevision: 0,
      });
    }, HEADQUARTERS),
    "shape",
  );
});

// invariant: save-version
// A map run ended in death keeps its mark: the map was solved when the run started, and the run
// stays so to its end and after a load (D-214; one manual map run at a time, D-55).
test("a map run ended in death whose mark disagrees with its map's being solved is refused as shape", () => {
  // decision: D-214 "A manual map run is a manual run of a solved map by the state of its map when that map run starts, and it stays one to its end, on the screen after its end and after a load"
  assertRefused(
    "a mark set on a death on an unsolved map",
    changed((document) => {
      dead(document);
      document.game.run.solvedMapRun = true;
    }),
    "shape",
  );
  assertRefused(
    "a mark unset on a death on a solved map",
    changed((document) => {
      dead(document);
      solvingItsMap(document);
      document.game.run.solvedMapRun = false;
    }),
    "shape",
  );
});

// invariant: save-version
// A rule group is a named set of rules (glossary: rule group), so its name is text.
test("a program whose rule group's name is no text is refused as shape", () => {
  for (const name of [7, null, ["Program"]]) {
    assertRefused(
      `a group named ${JSON.stringify(name)}`,
      changed((document) => {
        document.game.programs[0].program.groups[0].name = name;
      }, HEADQUARTERS),
      "shape",
    );
  }
});

// Values a JSON document can hold in place of any other, among them objects
// that refuse to become text, which a message quoting the value would trip on.
const HOSTILE_VALUES = [
  null,
  true,
  0,
  -1,
  1.5,
  2 ** 53,
  "",
  "x",
  [],
  [null],
  {},
  { toString: 1, valueOf: 1 },
  { kind: { toString: 1, valueOf: 1 } },
  JSON.parse('{"__proto__":null}'),
];

/** Each place under `value`: the path of keys that leads to it. */
function placesIn(value, path = []) {
  if (typeof value !== "object" || value === null) return [];
  return Object.keys(value).flatMap((key) => [
    [...path, key],
    ...placesIn(value[key], [...path, key]),
  ]);
}

/** A copy of `document` with `edit` applied to the object holding the place `path` ends at. */
function editedAt(document, path, edit) {
  const copy = structuredClone(document);
  let holder = copy;
  for (const key of path.slice(0, -1)) holder = holder[key];
  edit(holder, path.at(-1));
  return copy;
}

// invariant: save-version
// Fault: a document no JSON rule stops makes the reading throw something other
// than its own refusal, and the player gets „Spróbuj ponownie” for a damaged
// save for good instead of the refusal D-96 gives. The expected result comes
// from D-213: a crafted document is a refusal, so it never throws.
test("no value a document can hold, at any place of it, throws out of the load", () => {
  // decision: D-213 "Saved-game code turns a game state into the saved document of the current version of its shape, and an unknown value — a saved game state downloaded from the server or the unsaved game state kept in the page's memory (D-211) — into a game state or a refusal naming why, inside the simulation, no value a document can hold making it throw, and changing nothing passed to it"
  for (const document of [DOCUMENT, HEADQUARTERS, changed(dead)]) {
    const places = placesIn(document);
    assert.ok(places.length > 50, "precondition: the sweep reaches the game");
    for (const path of places) {
      const label = path.join(".");
      for (const hostile of HOSTILE_VALUES)
        loadWithoutThrowing(
          label,
          editedAt(document, path, (holder, key) => {
            holder[key] = structuredClone(hostile);
          }),
        );
      loadWithoutThrowing(
        `${label} removed`,
        editedAt(document, path, (holder, key) => {
          delete holder[key];
        }),
      );
    }
  }
});

function loadWithoutThrowing(name, document) {
  assert.doesNotThrow(() => loadSavedGame(document), name);
}

/**
 * A value that answers as `target` does, but for one fault of the code at the first read of `key`:
 * once, so that a reading which swallows it leaves a later reading to load the document.
 */
function faultyAt(target, key) {
  let met = false;
  return new Proxy(target, {
    getOwnPropertyDescriptor(object, name) {
      if (name === key && !met) {
        met = true;
        throw new TypeError("a fault of the code");
      }
      return Reflect.getOwnPropertyDescriptor(object, name);
    },
  });
}

/** A value whose read of `key` by property meets a fault of the code, as the program check reads. */
function faultyOnRead(target, key) {
  return new Proxy(target, {
    get(object, name, receiver) {
      if (name === key) throw new TypeError("a fault of the code");
      return Reflect.get(object, name, receiver);
    },
  });
}

// Faults: a catch of the reading that takes every error for a refusal, so that
// the page starts a new game over a whole save (D-213, D-96). A proxy is no
// document: only a value JSON cannot hold reaches a fault here, each at a
// different reading: the version, the archetypes, the rest of the game, and
// inside a program the check that reads it and the comparison that follows.
test("an error of the code in the load is no refusal: it leaves the load as the error it is", () => {
  // decision: D-213 "An error of its own code is no refusal: it leaves the load as a thrown error, which the browser view writes to the console without its text, and the saved game state on the server and the unsaved game state in the page's memory stay as they stand, while the player gets the sentence of D-96"
  const atVersion = faultyAt(structuredClone(DOCUMENT), "version");
  const atTeam = structuredClone(DOCUMENT);
  atTeam.game = faultyAt(atTeam.game, "team");
  const atChest = structuredClone(DOCUMENT);
  atChest.game.team = faultyAt(atChest.game.team, "chest");
  const atCheck = structuredClone(DOCUMENT);
  atCheck.game.programs[0].program = faultyOnRead(
    atCheck.game.programs[0].program,
    "groups",
  );
  const atComparison = structuredClone(DOCUMENT);
  atComparison.game.programs[0].program = faultyAt(
    atComparison.game.programs[0].program,
    "groups",
  );
  for (const [name, document] of Object.entries({
    "the version": atVersion,
    "the archetypes": atTeam,
    "the rest of the game": atChest,
    "the program check": atCheck,
    "the comparison with the program checked": atComparison,
  }))
    assert.throws(
      () => loadSavedGame(document),
      { name: "TypeError", message: "a fault of the code" },
      name,
    );
});

// D-386. Catches a condition set one step too strict, each edge being a value the game
// writes: a clock at zero or below it, an earning loop's first run, a stop with nothing gathered, a stop in
// the open game with no minutes, a second earning loop of a character whose first stopped, the moment the
// game was made at zero, below it and far ahead, and a program's content revision at 0 and at the top.
test("a document at the edges of what the earning loops, the report and the save time admit loads", () => {
  // decision: D-386 "The load of a saved game state admits every game state the game's own functions make, so the game never writes a saved game state that its own load discards"
  // decision: D-386 "A moment of real time that the game state stores, the save time and the moment the next spent use of the account's resurrection returns, is a safe integer of milliseconds of any sign, which the load takes without comparing it with any clock; the function that stamps a save time, the function that settles a death and the function that settles the first completion of a map refuse a moment that is no safe integer with a RangeError, and the last two read no moment where there is nothing to settle"
  // decision: D-386 "The moment the game was made (D-04) is a moment the game state stores too, which the load takes as a safe integer of milliseconds of any sign without comparing it with any clock, and the load takes the content revision of each program (D-442) as any safe integer from 0, comparing it with nothing"
  // decision: D-241 "Each earning loop also holds, from its start, the number of its map runs completed in a row with no death between them, which a death that does not stop the earning loop sets back to zero, and the largest such number, its loop record"
  const edges = {
    // The counts an earning loop starts with, one with the run in a row at its record, one below it.
    "an earning loop's counts both 0": (document) => {
      olaLoop(document).inARow = 0;
      olaLoop(document).loopRecord = 0;
    },
    "a run in a row equal to the loop record": (document) =>
      (olaLoop(document).inARow = 3),
    "a run in a row of 0 below a loop record": (document) =>
      (olaLoop(document).inARow = 0),
    "a save time of 0": (document) => (document.game.saveTimeMs = 0),
    // D-386: a safe integer of any sign, as the team's moment of the next return is read, so the case
    // is no crafted document.
    "a save time below 0": (document) => (document.game.saveTimeMs = -1),
    // The moment the game was made (D-04, D-386): any safe integer, as the save time is, and no clock
    // read: 0, below 0 and far ahead of the save time and of any present.
    "a game made at the moment 0": (document) => (document.game.madeAtMs = 0),
    "a game made at a moment below 0": (document) =>
      (document.game.madeAtMs = -1),
    "a game made at the lowest safe moment": (document) =>
      (document.game.madeAtMs = Number.MIN_SAFE_INTEGER),
    "a game made far ahead of its save": (document) =>
      (document.game.madeAtMs = document.game.saveTimeMs + 10 ** 12),
    "a game made at the highest safe moment": (document) =>
      (document.game.madeAtMs = Number.MAX_SAFE_INTEGER),
    // The content revision of a program (D-442): 0, the revision of a program just made, and as high as
    // a safe integer goes, compared with nothing.
    "programs both of content revision 0": (document) =>
      (document.game.programs[1].contentRevision = 0),
    "a program of the highest safe content revision": (document) =>
      (document.game.programs[1].contentRevision = Number.MAX_SAFE_INTEGER),
    // With no map run completed yet, no run of completions in a row stands either (D-241).
    "an earning loop in its first map run, nothing gathered": (document) => {
      olaLoop(document).runNumber = 1;
      olaLoop(document).completed = 0;
      olaLoop(document).inARow = 0;
      olaLoop(document).loopRecord = 0;
      olaLoop(document).practice = {};
    },
    "a stopped earning loop that gathered nothing": (document) =>
      (document.game.stoppedLoops[3] = {}),
    "an open line of one minute": (document) =>
      (openLine(document).minutes = 1),
    "a line stopped away after one minute": (document) =>
      (stoppedLine(document).minutes = 1),
    "a line stopped in the open game holding minutes of an earlier return": (
      document,
    ) => (document.game.awayReport[1].minutes = 45),
    "a stop at generation 2 of a character gone on to generation 3": (
      document,
    ) => (stoppedLine(document).stop.generation = 2),
    "a line of a stopped earning loop beside the open line of a later earning loop":
      (document) => {
        document.game.team.characters[1].generation = 2;
        document.game.awayReport.push({
          ...openLine(document),
          stop: { generation: 2, away: false },
        });
      },
    "open lines of two characters": (document) =>
      document.game.awayReport.push({ ...openLine(document), characterId: 3 }),
  };
  for (const [name, change] of Object.entries(edges)) {
    const document = changed(change);
    assert.deepEqual(
      loadSavedGame(document),
      { ok: true, state: document.game },
      name,
    );
  }
});

test("the load shares none of the earning loops, the stopped earning loops or the report with the document", () => {
  const passed = structuredClone(DOCUMENT);
  const { state } = loadSavedGame(passed);
  olaLoop(passed).run.tiles[0].stock.stick = 1;
  olaLoop(passed).program.groups[0].rules.pop();
  olaLoop(passed).practice.exploration = 1;
  passed.game.stoppedLoops[3].exploration = 1;
  openLine(passed).chest.stick = 1;
  stoppedLine(passed).stop.generation = 2;
  assert.deepEqual(state, DOCUMENT.game);
});

// D-241, D-246, D-248: a game from no save holds no earning loop, no stopped earning loop, no report and no
// save time.
test("a new game holds no earning loop, no stopped earning loop, no report and no save time", () => {
  // decision: D-248 "A game that came from no save holds none, and a game from a save holds the moment of that save"
  const state = newGame();
  assert.deepEqual(state.loops, {});
  assert.deepEqual(state.stoppedLoops, {});
  assert.deepEqual(state.awayReport, []);
  assert.equal(state.saveTimeMs, null);
});

// D-248: stamped only on the way to the document, so the state passed stays what it was.
test("a state with its save time is a copy holding the moment, the state passed left as it was", () => {
  // decision: D-248 "The save time comes from the browser's clock and lies in the game state: a saved document carries the moment it was saved, written on its way to the document, and the game state the browser view holds stays the value it was"
  const state = deepFreeze(newGame());
  const stamped = withSaveTime(state, 1760000000123);
  assert.notEqual(stamped, state);
  assert.equal(stamped.saveTimeMs, 1760000000123);
  assert.equal(state.saveTimeMs, null);
  assert.deepEqual(stamped, { ...state, saveTimeMs: 1760000000123 });
  assert.equal(withSaveTime(stamped, 0).saveTimeMs, 0);
});

// D-386: as in `settleDeath`, so a broken clock never reaches a document.
test("a moment that is no safe integer gives no save time", () => {
  // decision: D-386 "A moment of real time that the game state stores, the save time and the moment the next spent use of the account's resurrection returns, is a safe integer of milliseconds of any sign, which the load takes without comparing it with any clock; the function that stamps a save time, the function that settles a death and the function that settles the first completion of a map refuse a moment that is no safe integer with a RangeError, and the last two read no moment where there is nothing to settle"
  for (const moment of [NaN, Infinity, 1.5, 2 ** 53, "1760000000000", null]) {
    assert.throws(
      () => withSaveTime(newGame(), moment),
      RangeError,
      String(moment),
    );
  }
});

// D-386; D-07, D-248. Catches a save the game writes and then refuses: a device clock set
// before 1970 reads below zero, and the refusal would replace the player's progress with a new game.
test("a state stamped by a clock set before 1970 loads back from its saved document", () => {
  // decision: D-386 "The load of a saved game state admits every game state the game's own functions make, so the game never writes a saved game state that its own load discards"
  // decision: D-386 "A moment of real time that the game state stores, the save time and the moment the next spent use of the account's resurrection returns, is a safe integer of milliseconds of any sign, which the load takes without comparing it with any clock; the function that stamps a save time, the function that settles a death and the function that settles the first completion of a map refuse a moment that is no safe integer with a RangeError, and the last two read no moment where there is nothing to settle"
  // decision: D-248 "A game that came from no save holds none, and a game from a save holds the moment of that save"
  const state = newGame();
  for (const moment of [-1, -60_000, Number.MIN_SAFE_INTEGER]) {
    assert.deepEqual(
      loadSavedGame(
        JSON.parse(JSON.stringify(savedGame(withSaveTime(state, moment)))),
      ),
      { ok: true, state: { ...state, saveTimeMs: moment } },
      String(moment),
    );
  }
});

// D-248: the save time is stamped on the way to the document, so a state never stamped does not load.
test("the saved document of a state never stamped is refused as shape", () => {
  // decision: D-248 "The save time comes from the browser's clock and lies in the game state: a saved document carries the moment it was saved, written on its way to the document, and the game state the browser view holds stays the value it was"
  assertRefused("a new game unstamped", savedGame(newGame()), "shape");
});

test("the saved document of a state is the current version beside a copy of the state, shared nowhere", () => {
  // decision: D-206 "A saved game state carries the version number of its shape, and the game loads whole only a saved game state whose version is the game's current one"
  // decision: D-213 "Saved-game code turns a game state into the saved document of the current version of its shape, and an unknown value — a saved game state downloaded from the server or the unsaved game state kept in the page's memory (D-211) — into a game state or a refusal naming why, inside the simulation, no value a document can hold making it throw, and changing nothing passed to it"
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
// D-248: a saved document carries the moment of its save, so the state is stamped first.
const SAVE_MS = 1760000060000;

/** Two characters and two programs; the first character in Las at 4×, 155 game minutes in. */
function played() {
  let state = setProgram(withEdgeSolved(newKnowingGame()), FIGHTING).state;
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

/** `state` with every character of its team holding one practice in each skill: a character with practice. */
function withPractice(state) {
  return {
    ...state,
    team: {
      ...state.team,
      characters: state.team.characters.map((character) => ({
        ...character,
        skills: Object.fromEntries(
          Object.entries(character.skills).map(([id, skill]) => [
            id,
            { ...skill, practice: skill.practice + 1 },
          ]),
        ),
      })),
    },
  };
}

/** The death in combat of `deeper`, its character holding practice and the team's resurrection used up at `REAL_MS`. */
function deathUnready() {
  return usedUp(withPractice(deeper((run) => run.death !== null)));
}

/** `state` with the team's resurrection's three uses all spent, the first of them returning after `REAL_MS`. */
function usedUp(state) {
  return {
    ...state,
    team: {
      ...state.team,
      resurrectionUsesSpent: 3,
      resurrectionNextReturnAtMs: REAL_MS + 1,
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
  let state = withEdgeSolved(newKnowingGame());
  if (program) state = setProgram(state, program).state;
  state = createCharacter(state, "Ala").state;
  state = send(state, { mapId: "forest", characterId: 1 }, REAL_MS).state;
  for (let minute = 0; minute < 400 && doing(state.run) !== kind; minute += 1)
    state = advanceMinutes(state, 1).state;
  return state;
}

/** Ala, created in a game whose Understanding holds everything, with `skills` set among hers. */
function skilled(skills) {
  const state = createCharacter(withEdgeSolved(newKnowingGame()), "Ala").state;
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
  if (solved) state = { ...state, solvedMaps: ["forestEdge", "forest"] };
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
        // The record keeps pace: an unbroken streak of 476 and 476 game minutes spent eating.
        longestStreak: 476,
        minutesByAction: {
          ...run.minutesByAction,
          eat: run.minutesByAction.eat + 476,
        },
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

// A save stores the uses as they stand at its moment (D-386): the use due at REAL_MS + 1 has come back
// by SAVE_MS, a minute later, so it is stored as returned, the next one due four hours after it (240
// real minutes, 14 400 000 ms). Each pair is the uses spent and the moment of the next return.
const STORED_AT_THE_SAVE = {
  "a death that took everything": [2, REAL_MS + 1 + 14_400_000],
  "after that death and „Zakończ”, with no map run": [
    2,
    REAL_MS + 1 + 14_400_000,
  ],
  "the restart after that death": [2, REAL_MS + 1 + 14_400_000],
  "that completion, its renewal of the resurrection settled as it found it used up":
    [1, REAL_MS + 1 + 14_400_000],
};

/** The state `state`, named `name` among the states of the round trip, as a save at SAVE_MS holds it. */
function stampedAtTheSave(name, state) {
  const [spent, next] = STORED_AT_THE_SAVE[name] ?? [
    state.team.resurrectionUsesSpent,
    state.team.resurrectionNextReturnAtMs,
  ];
  return {
    ...state,
    team: {
      ...state.team,
      resurrectionUsesSpent: spent,
      resurrectionNextReturnAtMs: next,
    },
    saveTimeMs: SAVE_MS,
  };
}

test("a game state the simulation made loads back from its saved document", () => {
  // decision: D-212 "A manual map run of a loaded saved game state that goes on comes back at the game minute of the save, paused, with the pace of the save, and the player resumes it with „Wznów”"
  // decision: D-386 "The load of a saved game state admits every game state the game's own functions make, so the game never writes a saved game state that its own load discards"
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
    "after „Zakończ” with no map run, the counts beside a program": {
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
        withPractice(deeper((run) => run.death !== null)),
        REAL_MS,
      ).state,
      goesOn: false,
    },
    "a death of a character with no practice": {
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
    "after that death and „Zakończ”, with no map run": {
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
    "that completion, its renewal of the resurrection settled as it found it ready":
      {
        state: settleCompletion(done, REAL_MS).state,
        goesOn: false,
      },
    "that completion, its renewal of the resurrection settled as it found it used up":
      {
        state: settleCompletion(usedUp(done), REAL_MS).state,
        goesOn: false,
      },
    "after that completion and „Zakończ”, with no map run": {
      state: end(done).state,
      goesOn: false,
    },
    "a patrol going on": { state: patrolling(), goesOn: true },
    "a map run of a solved map, its mark set": {
      state: equipped(true),
      goesOn: true,
    },
    "the completion of a marked run, its deposit of the berries carried": {
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
    states["after „Zakończ” with no map run, the counts beside a program"].state
      .countsProgram,
    1,
  );
  assert.notEqual(states["an attack going on"].state.run.activeCombat, null);
  assert.equal(states["a death in combat"].state.run.death.cause, "combat");
  // D-190: the death spends the first of the three uses, one is spent after it.
  assert.deepEqual(states["a death in combat"].state.run.deathSettlement, {
    kind: "resurrectionUsed",
    usesSpent: 1,
  });
  assert.deepEqual(lost.run.deathSettlement, {
    kind: "progressLost",
    generation: 2,
  });
  assert.deepEqual(
    states["a death of a character with no practice"].state.run.deathSettlement,
    { kind: "noPractice" },
  );
  assert.deepEqual(
    states[
      "that completion, its renewal of the resurrection settled as it found it ready"
    ].state.run.completionSettlement,
    { kind: "resurrectionReady" },
  );
  assert.deepEqual(
    states[
      "that completion, its renewal of the resurrection settled as it found it used up"
    ].state.run.completionSettlement,
    { kind: "resurrectionRenewed" },
  );
  // A completion no clock reading has settled yet is a state the game's own functions make, and loads.
  assert.equal(done.run.completionSettlement, null);
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
  assert.deepEqual(done.solvedMaps, ["forestEdge", "forest"]);
  assert.equal(
    states["a map run of a solved map, its mark set"].state.run.solvedMapRun,
    true,
  );
  assert.notEqual(doneMarked.run.completion, null);
  assert.equal(doneMarked.run.solvedMapRun, true);
  // D-189: a marked run brings its loot out to the chest as any run does, its bring list clipped to
  // what the character still carries; only its practice is not paid. So the same run of a map not
  // solved, `done`, is the expectation of what the marked run carries and deposits.
  assert.deepEqual(
    doneMarked.run.character.backpack,
    done.run.character.backpack,
  );
  assert.deepEqual(doneMarked.run.deposited, done.run.deposited);
  assert.equal(
    states["the restart after the completion that solved the map"].state.run
      .solvedMapRun,
    true,
  );
  for (const [name, { state, goesOn }] of Object.entries(states)) {
    const stamped = stampedAtTheSave(name, state);
    assert.deepEqual(
      loadSavedGame(savedGame(withSaveTime(state, SAVE_MS))),
      { ok: true, state: goesOn ? { ...stamped, paused: true } : stamped },
      name,
    );
  }
});

// Catches a trip count the game takes from the player that makes the load refuse the whole save.
test("the largest trip count the game accepts loads back, and one beyond the safe integers the game refuses", () => {
  // decision: D-386 "The load of a saved game state admits every game state the game's own functions make, so the game never writes a saved game state that its own load discards"
  const withCount = (count) =>
    editProgram(newGame(), 1, {
      ...emptyProgram(),
      tripPlan: { take: [{ item: "stick", count }], bring: [] },
    }).state;
  const largest = withCount(Number.MAX_SAFE_INTEGER);
  assert.deepEqual(
    loadSavedGame(
      JSON.parse(JSON.stringify(savedGame(withSaveTime(largest, SAVE_MS)))),
    ),
    { ok: true, state: { ...largest, saveTimeMs: SAVE_MS } },
  );
  for (const count of [2 ** 53, Number("99999999999999999999")])
    assert.throws(() => withCount(count), `${count}`);
});
