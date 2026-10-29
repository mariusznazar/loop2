import assert from "node:assert/strict";
import { test } from "node:test";
import { ITEMS } from "../../dist/public/sim/data/items.js";
import { MAPS } from "../../dist/public/sim/data/maps.js";
import {
  neighbours,
  offsetToAxial,
  sameHex,
} from "../../dist/public/sim/hex.js";
import {
  createCharacter,
  newGame,
  send,
  setProgram,
} from "../../dist/public/sim/game.js";
import { conditionHolds } from "../../dist/public/sim/program.js";
import { newMapRun } from "../../dist/public/sim/run.js";
import { programFromRules, programRules } from "./program-fixture.mjs";

// The conditions on the body, the backpack and the campfire (task, To do 12–13; spec Decision 3;
// D-26, D-57). Every number below is written out by hand from the spec's table: „Temperatura
// poniżej” takes 30.0 to 37.0 °C in steps of 0.1, „Sytość poniżej” 0 to 100 %, „Zapas poniżej”
// 0 to 50 pieces, „Zostało mniej niż — ognisko” 0 to 120 minutes and „Tu leży mniej niż” 0 to 50
// pieces, each of these four in steps of 1; „Z dala od — ognisko” takes no number.

const [mapId, forest] = Object.entries(MAPS)[0];
// The first character a new game creates takes the id 1.
const characterId = 1;
const [resource] = forest.resources.map((each) => each.id);
const [firstItem, secondItem] = Object.keys(ITEMS);
const entrance = offsetToAxial(forest.entrance.col, forest.entrance.row);
const SENT = { mapId, characterId };
const REAL_MS = 1760000000000;

const ALWAYS = { kind: "always" };
const EXPLORE = { kind: "explore" };
const rule = (condition, action) => ({ condition, action });
const temperatureBelow = (value) => ({ kind: "temperatureBelow", value });
const satietyBelow = (value) => ({ kind: "satietyBelow", value });
const natureEnergyBelow = (value) => ({ kind: "natureEnergyBelow", value });
const itemBelow = (item, value) => ({ kind: "itemBelow", item, value });
const campfireLeftBelow = (value) => ({ kind: "campfireLeftBelow", value });
const healthBelow = (value) => ({ kind: "healthBelow", value });
const opponentHealthBelow = (value) => ({ kind: "opponentHealthBelow", value });
const AWAY = { kind: "awayFromCampfire" };
const hereBelow = (value) => ({ kind: "hereBelow", resource, value });

/** A map run of Las at minute 0 with no program rules, with the given fields replaced. */
function handMade(fields = {}) {
  const { run } = newMapRun(forest, 3, programFromRules(), {
    mapId,
    characterId,
  });
  return { ...run, ...fields };
}

const withBody = (temperature, satiety) =>
  handMade({ body: { temperature, satiety, health: 100 } });

/** A run whose backpack holds the given pieces and nothing else. */
function carrying(pieces) {
  const run = handMade();
  const empty = Object.fromEntries(
    Object.keys(run.character.backpack).map((id) => [id, 0]),
  );
  return {
    ...run,
    character: { ...run.character, backpack: { ...empty, ...pieces } },
  };
}

const holds = (run, condition) => conditionHolds(run, forest, condition);

test("health conditions compare the acting side and its opponent in health points", () => {
  const woundedWolf = { health: 6, opponentHealth: 100 };
  assert.equal(
    conditionHolds(handMade(), forest, healthBelow(8), woundedWolf),
    true,
  );
  assert.equal(
    conditionHolds(handMade(), forest, healthBelow(6), woundedWolf),
    false,
    "the threshold is strict",
  );
  assert.equal(
    conditionHolds(handMade(), forest, opponentHealthBelow(101), woundedWolf),
    true,
  );
  assert.equal(
    conditionHolds(handMade(), forest, opponentHealthBelow(100), woundedWolf),
    false,
    "the opponent threshold is strict",
  );
  assert.equal(holds(withBody(37, 100), healthBelow(101)), true);
  assert.equal(holds(handMade(), opponentHealthBelow(101)), false);
});

test("„Temperatura poniżej N °C” holds below N and not at N, also for tenths", () => {
  assert.equal(holds(withBody(34.999999, 100), temperatureBelow(35)), true);
  assert.equal(holds(withBody(35, 100), temperatureBelow(35)), false);
  assert.equal(holds(withBody(36.59, 100), temperatureBelow(36.6)), true);
  assert.equal(holds(withBody(36.6, 100), temperatureBelow(36.6)), false);
  assert.equal(holds(withBody(36.61, 100), temperatureBelow(36.6)), false);
});

test("„Sytość poniżej N %” holds below N and not at N", () => {
  assert.equal(holds(withBody(37, 29.999999), satietyBelow(30)), true);
  assert.equal(holds(withBody(37, 30), satietyBelow(30)), false);
  assert.equal(holds(withBody(37, 0), satietyBelow(0)), false);
  assert.equal(holds(withBody(37, 100), satietyBelow(100)), false);
  assert.equal(holds(withBody(37, 99.4), satietyBelow(100)), true);
});

test("„Energia natury poniżej N” reads the mage's nature energy, holding below N and not at N", () => {
  // Task plomyk, To do 5 (plomyk_loop2.md:22). The body is full: the energy alone decides.
  const energy = (natureEnergy) => handMade({ natureEnergy });
  assert.equal(holds(energy(29.5), natureEnergyBelow(30)), true);
  assert.equal(holds(energy(30), natureEnergyBelow(30)), false);
  assert.equal(holds(energy(0), natureEnergyBelow(0)), false);
  assert.equal(holds(energy(0), natureEnergyBelow(1)), true);
  assert.equal(holds(energy(100), natureEnergyBelow(100)), false);
});

test("„Zapas poniżej N szt.” counts only the named item of the backpack", () => {
  assert.equal(
    holds(carrying({ [firstItem]: 2 }), itemBelow(firstItem, 3)),
    true,
  );
  assert.equal(
    holds(carrying({ [firstItem]: 3 }), itemBelow(firstItem, 3)),
    false,
  );
  assert.equal(
    holds(carrying({ [secondItem]: 9 }), itemBelow(firstItem, 1)),
    true,
    "pieces of another item do not count",
  );
  assert.equal(
    holds(carrying({ [firstItem]: 9 }), itemBelow(secondItem, 1)),
    true,
  );
  assert.equal(holds(carrying({}), itemBelow(firstItem, 0)), false);
});

test("„Zostało mniej niż N min — ognisko” reads 0 where there is no campfire", () => {
  assert.equal(holds(handMade(), campfireLeftBelow(1)), true);
  assert.equal(holds(handMade(), campfireLeftBelow(0)), false);
});

test("„Zostało mniej niż N min — ognisko” reads the minutes left to a campfire on the character's tile", () => {
  const here = (minutesLeft) =>
    handMade({ campfires: [{ at: entrance, minutesLeft }] });
  assert.equal(holds(here(20), campfireLeftBelow(20)), false);
  assert.equal(holds(here(20), campfireLeftBelow(21)), true);
  assert.equal(holds(here(0), campfireLeftBelow(1)), true, "extinguished");
  assert.equal(holds(here(0), campfireLeftBelow(0)), false);
});

test("„Zostało mniej niż N min — ognisko” reads the nearest campfire, extinguished or not, not a farther one", () => {
  // Every tile costs 10 minutes to enter, so the neighbour is the nearer of the two.
  const run = handMade();
  const tiles = run.tiles.map((tile) => ({ ...tile, stepMinutes: 10 }));
  const [near] = neighbours(tiles, entrance);
  const far = tiles.find(
    (tile) =>
      !sameHex(tile.at, entrance) &&
      !neighbours(tiles, entrance).some((n) => sameHex(n.at, tile.at)),
  );
  const fires = (nearMinutes, farMinutes) =>
    handMade({
      tiles,
      campfires: [
        { at: far.at, minutesLeft: farMinutes },
        { at: near.at, minutesLeft: nearMinutes },
      ],
    });
  assert.equal(holds(fires(5, 100), campfireLeftBelow(6)), true);
  assert.equal(holds(fires(5, 100), campfireLeftBelow(5)), false);
  assert.equal(
    holds(fires(0, 100), campfireLeftBelow(1)),
    true,
    "the nearest is extinguished, a farther one burns",
  );
  assert.equal(holds(fires(100, 0), campfireLeftBelow(100)), false);
});

test("„Zostało mniej niż N min — ognisko” counts nearness in game minutes of walking, not in tiles", () => {
  // Every tile costs 10 minutes to enter but the neighbour `slow`, which costs 100: a tile two
  // tiles away through another neighbour is 20 minutes away, `slow` 100.
  const run = handMade();
  const [slow, other] = neighbours(run.tiles, entrance);
  const twoAway = neighbours(run.tiles, other.at).find(
    (tile) =>
      !sameHex(tile.at, entrance) &&
      !neighbours(run.tiles, entrance).some((n) => sameHex(n.at, tile.at)),
  );
  const tiles = run.tiles.map((tile) => ({
    ...tile,
    stepMinutes: sameHex(tile.at, slow.at) ? 100 : 10,
  }));
  const fires = handMade({
    tiles,
    campfires: [
      { at: slow.at, minutesLeft: 5 },
      { at: twoAway.at, minutesLeft: 60 },
    ],
  });
  assert.equal(holds(fires, campfireLeftBelow(60)), false);
  assert.equal(holds(fires, campfireLeftBelow(61)), true);
});

test("„Z dala od — ognisko” holds where no campfire stands on the character's tile", () => {
  const [near] = neighbours(handMade().tiles, entrance);
  assert.equal(holds(handMade(), AWAY), true, "no campfire");
  assert.equal(
    holds(handMade({ campfires: [{ at: near.at, minutesLeft: 30 }] }), AWAY),
    true,
    "a campfire on a neighbouring tile",
  );
  for (const minutesLeft of [0, 30]) {
    assert.equal(
      holds(handMade({ campfires: [{ at: entrance, minutesLeft }] }), AWAY),
      false,
      `a campfire with ${minutesLeft} minutes on the character's tile`,
    );
  }
});

/** The program a game state holds: the copy during a map run, else the only program of the list (task, To do 1 and 7). */
function heldProgram(state) {
  return state.run === null
    ? state.programs[0].program
    : state.run.copy.program;
}

/** The program `setProgram` holds after taking `condition` in, on the sending screen and in a run. */
function held(condition) {
  const program = programFromRules(rule(condition, EXPLORE));
  const running = send(
    createCharacter(newGame(), "Ala").state,
    SENT,
    REAL_MS,
  ).state;
  return [newGame(), running].map(
    (state) =>
      programRules(heldProgram(setProgram(state, program).state))[0].condition,
  );
}

function refused(condition) {
  const running = send(
    createCharacter(newGame(), "Ala").state,
    SENT,
    REAL_MS,
  ).state;
  for (const state of [newGame(), running]) {
    assert.throws(
      () => setProgram(state, programFromRules(rule(condition, EXPLORE))),
      Error,
      JSON.stringify(condition),
    );
  }
}

test("the check takes a temperature with tenths and holds it as the decimal the player reads", () => {
  for (const [offered, kept] of [
    [36.6, 36.6],
    [30.0, 30],
    [37, 37],
    [36.5, 36.5],
    [36.60000000000001, 36.6],
    [30.000000000000004, 30],
  ]) {
    for (const condition of held(temperatureBelow(offered))) {
      assert.deepEqual(condition, temperatureBelow(kept), String(offered));
      assert.equal(String(condition.value), String(kept));
    }
  }
});

test("the check refuses a temperature off the step of 0.1 or outside 30.0–37.0", () => {
  for (const value of [36.55, 29.9, 37.1, 36.61, -1, 100]) {
    refused(temperatureBelow(value));
  }
});

test("the check takes the whole numbers of „Tu leży mniej niż” as before, and only those", () => {
  for (const value of [0, 1, 7, 50]) {
    for (const condition of held(hereBelow(value)))
      assert.deepEqual(condition, hereBelow(value));
  }
  for (const value of [1.5, 0.1, -1, 51]) refused(hereBelow(value));
});

test("the check takes each new kind's numbers from its minimum to its maximum on its step", () => {
  const ranges = [
    [satietyBelow, 0, 100],
    // Task plomyk, To do 5 (plomyk_loop2.md:22): from 0 to 100 by 1.
    [natureEnergyBelow, 0, 100],
    [healthBelow, 0, 100],
    [opponentHealthBelow, 0, 100],
    [(value) => itemBelow(firstItem, value), 0, 50],
    [campfireLeftBelow, 0, 120],
  ];
  for (const [make, min, max] of ranges) {
    for (const value of [min, max, min + 1, max - 1]) {
      for (const condition of held(make(value)))
        assert.deepEqual(condition, make(value));
    }
    for (const value of [min - 1, max + 1, min + 0.5, max - 0.1]) {
      refused(make(value));
    }
  }
});

test("the check refuses a number that is no finite number, for every kind that takes one", () => {
  const makers = [
    temperatureBelow,
    satietyBelow,
    natureEnergyBelow,
    healthBelow,
    opponentHealthBelow,
    (value) => itemBelow(firstItem, value),
    campfireLeftBelow,
    hereBelow,
  ];
  for (const make of makers) {
    for (const value of [
      Number.NaN,
      Infinity,
      -Infinity,
      "20",
      null,
      undefined,
    ])
      refused(make(value));
  }
});

test("„Zapas poniżej” takes every item of the data, and nothing else", () => {
  for (const item of Object.keys(ITEMS)) {
    for (const condition of held(itemBelow(item, 8)))
      assert.deepEqual(condition, itemBelow(item, 8));
  }
  for (const item of ["granite", "toString", "", 0, undefined]) {
    refused(itemBelow(item, 8));
  }
});

test("„Z dala od — ognisko” takes no number and no target", () => {
  for (const condition of held(AWAY)) assert.deepEqual(condition, AWAY);
  for (const condition of held({ ...AWAY, value: 3 }))
    assert.deepEqual(condition, AWAY);
  for (const condition of held(ALWAYS)) assert.deepEqual(condition, ALWAYS);
});
