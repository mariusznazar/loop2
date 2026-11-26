// The gear of a character in the game state: the slots of the data and the items that fit them, the
// gear of a new character, the gear a manual map run starts with, and the gear standing apart from the
// backpack. The expectations come from D-456 (the eight slots, their places and what fits them), D-452
// and D-187 (the gear belongs to the character and goes into a map run whole, whatever the map's entry
// cap, outside the trip plan and the chest), D-463 (the count of the player's gear changes, from 0) and
// D-455 (the gear is no backpack) in foundations/decisions.md; every number is written out here.
import assert from "node:assert/strict";
import { test } from "node:test";
import { newBackpack } from "../../dist/browser/sim/character.js";
import { GEAR_PLACES, GEAR_SLOTS } from "../../dist/browser/sim/data/gear.js";
import { ITEMS } from "../../dist/browser/sim/data/items.js";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import { createCharacter, send } from "../../dist/browser/sim/game.js";
import { minuteBeforePick, newMapRun } from "../../dist/browser/sim/run.js";
import { programFromRules } from "./program-fixture.mjs";
import { newKnowingGame } from "./understanding-fixture.mjs";

const REAL_MS = 1760000000000;
const ALWAYS = { kind: "always" };
const EXPLORING = programFromRules({
  condition: ALWAYS,
  action: { kind: "explore" },
});

/** The empty gear: every slot of the data, in its order, holding none. */
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

/** A gear with a stick in the main hand and a bandage in each of the first two pockets. */
const HELD_GEAR = {
  ...EMPTY_GEAR,
  mainHand: "stick",
  pocket1: "bandage",
  pocket2: "bandage",
};

test("the gear has eight slots in their order, each of one place, the three pockets of the place „Kieszeń”", () => {
  // decision: D-456 "The gear has eight slots, each holding one piece: „Ręka główna”, „Druga ręka”, „Głowa”, „Tułów”, „Nogi” and three pockets of the belt, each slot being of one place, the three pockets of the place „Kieszeń”."
  assert.deepEqual(
    Object.entries(GEAR_SLOTS).map(([slot, place]) => [
      slot,
      GEAR_PLACES[place].name,
    ]),
    [
      ["mainHand", "Ręka główna"],
      ["secondHand", "Druga ręka"],
      ["head", "Głowa"],
      ["torso", "Tułów"],
      ["legs", "Nogi"],
      ["pocket1", "Kieszeń"],
      ["pocket2", "Kieszeń"],
      ["pocket3", "Kieszeń"],
    ],
  );
});

test("the line of gear names the main hand „w ręku” and the pockets „pod ręką”", () => {
  assert.equal(GEAR_PLACES.mainHand.line, "w ręku");
  assert.equal(GEAR_PLACES.pocket.line, "pod ręką");
});

test("the stick fits the main hand and the bandage each pocket, and nothing fits the other slots", () => {
  // decision: D-456 "An item whose data name no place fits no slot."
  // decision: D-456 "The data of each item name the place it fits: the stick fits the main hand and the bandage a pocket."
  const fitting = Object.entries(GEAR_SLOTS).flatMap(([slot, place]) =>
    Object.entries(ITEMS)
      .filter(([, row]) => row.fits === place)
      .map(([item]) => [item, slot]),
  );
  assert.deepEqual(fitting, [
    ["stick", "mainHand"],
    ["bandage", "pocket1"],
    ["bandage", "pocket2"],
    ["bandage", "pocket3"],
  ]);
});

test("a new character has an empty gear, no changed slot and no gear change counted", () => {
  // decision: D-463 "The game state counts at each character, from 0, the gear changes the player makes on the screen Postać (D-461): each putting on, exchanging and taking off of a piece counts one"
  const state = createCharacter(newKnowingGame(), "Ala").state;
  const [ala] = state.team.characters;
  assert.deepEqual(ala.gear, EMPTY_GEAR);
  assert.deepEqual(ala.changedSlots, []);
  assert.equal(ala.gearChanges, 0);
});

/**
 * Ala, created in a game that knows everything and has solved the maps before Las — matecznik, with
 * `gear` set at her and `chest` as the team's chest; the program of the game takes `take`.
 */
function holding(gear, chest, take = []) {
  let state = {
    ...newKnowingGame(),
    solvedMaps: ["forestEdge", "forest", "forestDeep", "forestPack"],
  };
  state = createCharacter(state, "Ala").state;
  const program = {
    ...EXPLORING,
    tripPlan: { take, bring: [] },
  };
  return {
    ...state,
    programs: [{ ...state.programs[0], program }],
    team: {
      ...state.team,
      chest: { pieces: chest },
      characters: state.team.characters.map((character) => ({
        ...character,
        gear,
      })),
    },
  };
}

test("a manual map run enters a map whose entry cap is 0 with the character's gear whole, and the chest gives none of it", () => {
  // decision: D-187 "The caps clip no gear: the gear of the character goes into a map run and out of it whole and counts toward neither cap."
  const before = holding(HELD_GEAR, { stick: 3, bandage: 2 }, [
    { item: "stick", count: 2 },
  ]);
  assert.equal(MAPS.forestLair.carryIn, 0, "precondition: the entry cap is 0");
  const sent = send(
    before,
    { mapId: "forestLair", characterId: 1 },
    REAL_MS,
  ).state;
  assert.deepEqual(sent.run.character.gear, HELD_GEAR);
  assert.equal(sent.run.character.backpack.stick, 0);
  assert.equal(sent.run.character.backpack.bandage, 0);
  assert.deepEqual(sent.team.chest, { pieces: { stick: 3, bandage: 2 } });
  assert.deepEqual(sent.team.characters[0].gear, HELD_GEAR);
});

test("a manual map run takes its trip plan from the chest and its gear from the character, each apart", () => {
  // decision: D-451 "A character has gear apart from its backpack: what it wears, what it wields and what it has at hand."
  const before = holding(HELD_GEAR, { stick: 3, bandage: 2 }, [
    { item: "stick", count: 2 },
  ]);
  const sent = send(before, { mapId: "forest", characterId: 1 }, REAL_MS).state;
  assert.deepEqual(sent.run.character.gear, HELD_GEAR);
  assert.equal(sent.run.character.backpack.stick, 2);
  assert.deepEqual(sent.team.chest, { pieces: { stick: 1, bandage: 2 } });
});

test("a stick in the main hand takes no room of the backpack's cap", () => {
  // decision: D-455 "The gear is no backpack: a piece in the gear takes no room of the backpack's cap (D-64), is counted by no condition „Zapas poniżej” and by no line of the backpack on the screen of a map run, and is taken by none of the actions that take pieces from the backpack — „Zasil — ognisko”, „Zapal — patyk”, „Wytwórz — ognisko”, „Wytwórz”, „Zjedz — jagoda” and „Opatrz”."
  const before = holding({ ...EMPTY_GEAR, mainHand: "stick" }, { stick: 20 }, [
    { item: "stick", count: 15 },
  ]);
  const sent = send(before, { mapId: "forest", characterId: 1 }, REAL_MS).state;
  assert.equal(sent.run.character.backpack.stick, 15);
  assert.deepEqual(sent.team.chest, { pieces: { stick: 5 } });
});

test("„Zapas poniżej 1 szt. · Patyk” holds for a character whose only stick lies in its main hand", () => {
  // decision: D-455 "The gear is no backpack: a piece in the gear takes no room of the backpack's cap (D-64), is counted by no condition „Zapas poniżej” and by no line of the backpack on the screen of a map run, and is taken by none of the actions that take pieces from the backpack — „Zasil — ognisko”, „Zapal — patyk”, „Wytwórz — ognisko”, „Wytwórz”, „Zjedz — jagoda” and „Opatrz”."
  const program = programFromRules(
    {
      condition: { kind: "itemBelow", item: "stick", value: 1 },
      action: { kind: "explore" },
    },
    { condition: ALWAYS, action: { kind: "wander" } },
  );
  const pick = (gear, take) => {
    const before = holding(gear, { stick: 1 }, take);
    const state = {
      ...before,
      programs: [
        {
          ...before.programs[0],
          program: { ...program, tripPlan: { take, bring: [] } },
        },
      ],
    };
    return send(state, { mapId: "forest", characterId: 1 }, REAL_MS).state.run
      .current.activity.ruleId;
  };
  assert.equal(pick({ ...EMPTY_GEAR, mainHand: "stick" }, []), 1);
  // Precondition: a stick in the backpack is counted, so the rule does not hold.
  assert.equal(pick(EMPTY_GEAR, [{ item: "stick", count: 1 }]), 2);
});

/**
 * A map run of Las at game minute 0 whose character holds a stick in its main hand and `sticks` in
 * its backpack, on a tile with a campfire of 10 minutes left, carrying out `action` to its end in
 * game minute 1.
 */
function endingWithStickInHand(action, sticks) {
  const { run } = newMapRun(
    MAPS.forest,
    1,
    EXPLORING,
    { mapId: "forest", characterId: 1 },
    { carryingCapacity: 15 },
    {},
    { ...newBackpack(), stick: sticks },
    { ...EMPTY_GEAR, mainHand: "stick" },
  );
  return {
    ...run,
    campfires: [{ at: { ...run.character.at }, minutesLeft: 10 }],
    current: {
      activity: { kind: "rule", ruleId: 1, action },
      startMinute: 0,
      endMinute: 1,
      stepTo: null,
    },
  };
}

test("„Zasil — ognisko” burns no stick of the main hand", () => {
  // decision: D-455 "The gear is no backpack: a piece in the gear takes no room of the backpack's cap (D-64), is counted by no condition „Zapas poniżej” and by no line of the backpack on the screen of a map run, and is taken by none of the actions that take pieces from the backpack — „Zasil — ognisko”, „Zapal — patyk”, „Wytwórz — ognisko”, „Wytwórz”, „Zjedz — jagoda” and „Opatrz”."
  const feed = { kind: "feedCampfire" };
  const unfed = minuteBeforePick(
    endingWithStickInHand(feed, 0),
    MAPS.forest,
  ).run;
  assert.equal(unfed.campfires[0].minutesLeft, 9);
  assert.equal(unfed.character.gear.mainHand, "stick");
  // Precondition: a stick of the backpack feeds the campfire its 20 minutes.
  const fed = minuteBeforePick(endingWithStickInHand(feed, 1), MAPS.forest).run;
  assert.equal(fed.campfires[0].minutesLeft, 29);
  assert.equal(fed.character.backpack.stick, 0);
  assert.equal(fed.character.gear.mainHand, "stick");
});

test("„Zapal — patyk” lights no stick of the main hand", () => {
  // decision: D-455 "The gear is no backpack: a piece in the gear takes no room of the backpack's cap (D-64), is counted by no condition „Zapas poniżej” and by no line of the backpack on the screen of a map run, and is taken by none of the actions that take pieces from the backpack — „Zasil — ognisko”, „Zapal — patyk”, „Wytwórz — ognisko”, „Wytwórz”, „Zjedz — jagoda” and „Opatrz”."
  const light = { kind: "lightItem" };
  const unlit = minuteBeforePick(
    endingWithStickInHand(light, 0),
    MAPS.forest,
  ).run;
  assert.deepEqual(unlit.burningItems, []);
  assert.equal(unlit.character.gear.mainHand, "stick");
  // Precondition: a stick of the backpack is lit on the tile.
  const lit = minuteBeforePick(
    endingWithStickInHand(light, 1),
    MAPS.forest,
  ).run;
  assert.equal(lit.burningItems.length, 1);
  assert.equal(lit.character.backpack.stick, 0);
  assert.equal(lit.character.gear.mainHand, "stick");
});

test("a map run started with no gear given holds the empty gear", () => {
  const { run } = newMapRun(
    MAPS.forest,
    1,
    EXPLORING,
    { mapId: "forest", characterId: 1 },
    { carryingCapacity: 15 },
    {},
    newBackpack(),
  );
  assert.deepEqual(run.character.gear, EMPTY_GEAR);
});

test("the map run holds a copy of the gear it starts with, shared with nothing passed", () => {
  const gear = { ...HELD_GEAR };
  const { run } = newMapRun(
    MAPS.forest,
    1,
    EXPLORING,
    { mapId: "forest", characterId: 1 },
    { carryingCapacity: 15 },
    {},
    newBackpack(),
    gear,
  );
  gear.mainHand = null;
  assert.equal(run.character.gear.mainHand, "stick");
});
