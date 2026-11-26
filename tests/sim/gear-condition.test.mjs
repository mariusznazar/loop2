// The condition „Puste — {miejsce}” of a program rule: it holds where the place it names holds nothing,
// it names a place only by its kind, its targets are the places some item of the data fits, and the
// program check refuses any other place. The expectations come from D-459 (what the condition asks),
// D-443 (the targets follow from the items' data), D-456 (the places of the gear and the three pockets),
// D-126 and D-290 (a rule outside the repertoire and the place of the condition in the pick) in
// foundations/decisions.md; every gear and every expected value is written out here.
import assert from "node:assert/strict";
import { test } from "node:test";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import { setProgram } from "../../dist/browser/sim/game.js";
import {
  conditionHolds,
  judgeProgram,
} from "../../dist/browser/sim/program.js";
import { newMapRun } from "../../dist/browser/sim/run.js";
import { ProgramCheckError } from "../../dist/browser/sim/programs.js";
import { programFromRules } from "./program-fixture.mjs";
import { newKnowingGame } from "./understanding-fixture.mjs";

const mapId = "forest";
const characterId = 1;
const EXPLORE = { kind: "explore" };
const rule = (condition, action) => ({ condition, action });
const emptyPlace = (place) => ({ kind: "emptyPlace", place });

/** Every slot of the gear, all empty: the gear of a character with nothing on. */
const NO_GEAR = {
  mainHand: null,
  secondHand: null,
  head: null,
  torso: null,
  legs: null,
  pocket1: null,
  pocket2: null,
  pocket3: null,
};

/** A map run of Las at minute 0 with no program rules and the given gear, the rest as a new run has it. */
function wearing(gear, backpack = {}) {
  const { run } = newMapRun(MAPS[mapId], 3, programFromRules(), {
    mapId,
    characterId,
  });
  return {
    ...run,
    character: {
      ...run.character,
      gear: { ...NO_GEAR, ...gear },
      backpack: { ...run.character.backpack, ...backpack },
    },
  };
}

test("the condition on the main hand holds with the hand empty and fails with a stick in it", () => {
  // decision: D-459 "The condition „Puste — {miejsce}” holds when the place it names holds nothing; „Puste — Kieszeń” holds when at least one pocket is empty."
  assert.equal(conditionHolds(wearing({}), emptyPlace("mainHand")), true);
  assert.equal(
    conditionHolds(wearing({ mainHand: "stick" }), emptyPlace("mainHand")),
    false,
  );
  // A piece in a pocket leaves the main hand empty: the condition asks about the place it names alone.
  assert.equal(
    conditionHolds(wearing({ pocket1: "bandage" }), emptyPlace("mainHand")),
    true,
  );
});

test("the condition on the pocket holds while one of its three pockets is empty and fails only with all three full", () => {
  // decision: D-459 "The condition „Puste — {miejsce}” holds when the place it names holds nothing; „Puste — Kieszeń” holds when at least one pocket is empty."
  assert.equal(conditionHolds(wearing({}), emptyPlace("pocket")), true);
  assert.equal(
    conditionHolds(
      wearing({ pocket1: "bandage", pocket3: "bandage" }),
      emptyPlace("pocket"),
    ),
    true,
  );
  assert.equal(
    conditionHolds(
      wearing({ pocket1: "bandage", pocket2: "bandage", pocket3: "bandage" }),
      emptyPlace("pocket"),
    ),
    false,
  );
});

test("the check takes a condition on the main hand and on the pocket, and refuses a place no item fits or a pocket named by its number", () => {
  // decision: D-459 "A program names a place of the gear only by its kind, never by the number or the position of a pocket, and the targets of the condition are the places some item of the data fits, a place gaining its target when the first item starts to fit it."
  const game = newKnowingGame();
  for (const place of ["mainHand", "pocket"]) {
    assert.doesNotThrow(() =>
      setProgram(game, programFromRules(rule(emptyPlace(place), EXPLORE))),
    );
  }
  for (const place of [
    "secondHand",
    "head",
    "torso",
    "legs",
    "pocket1",
    "pocket2",
    "Kieszeń",
    "",
    undefined,
  ]) {
    assert.throws(
      () =>
        setProgram(game, programFromRules(rule(emptyPlace(place), EXPLORE))),
      ProgramCheckError,
      `place ${JSON.stringify(place)}`,
    );
  }
});

test("in combat the condition reads the gear the turns before left, so a stick the hand holds leaves the strike's rule unmet", () => {
  // decision: D-459 "The condition „Puste — {miejsce}” holds when the place it names holds nothing; „Puste — Kieszeń” holds when at least one pocket is empty."
  // decision: D-443 "An action is a verb with a target, and the targets a verb takes follow from the properties of the items in the game's data."
  const program = programFromRules(
    rule(emptyPlace("mainHand"), { kind: "strikeWithStick" }),
  );
  const combat = { health: 100, opponentHealth: 100 };
  // The hand is empty and the backpack holds a stick: the strike takes one into the hand, so it goes.
  const empty = judgeProgram(wearing({}, { stick: 1 }), program, { combat });
  assert.equal(empty.rules[1].bar, "go");
  // The hand holds the stick the turn before left it there: the condition does not hold.
  const held = judgeProgram(
    wearing({ mainHand: "stick" }, { stick: 1 }),
    program,
    { combat },
  );
  assert.equal(held.rules[1].bar, "unmet");
});
