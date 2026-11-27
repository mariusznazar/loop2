// The line of the gear under the backpack line on the screen of a map run (D-311, D-455): a pure function
// of the character's gear, naming the main hand first and the pockets after it, with the words of the data.
// The expected values are written out here, not read back from the data.
import assert from "node:assert/strict";
import { test } from "node:test";
import { gearLine } from "../../dist/browser/view/gear-lines.js";

const EMPTY = {
  mainHand: null,
  secondHand: null,
  head: null,
  torso: null,
  legs: null,
  pocket1: null,
  pocket2: null,
  pocket3: null,
};

test("a character holding nothing reads „Wyposażenie: nic”", () => {
  assert.equal(gearLine(EMPTY), "Wyposażenie: nic");
});

test("a stick in the main hand reads „Wyposażenie: patyk w ręku”", () => {
  assert.equal(
    gearLine({ ...EMPTY, mainHand: "stick" }),
    "Wyposażenie: patyk w ręku",
  );
});

test("two bandages in the pockets read „Wyposażenie: 2 × opatrunek pod ręką”", () => {
  assert.equal(
    gearLine({ ...EMPTY, pocket1: "bandage", pocket2: "bandage" }),
    "Wyposażenie: 2 × opatrunek pod ręką",
  );
});

test("one bandage in a pocket reads without a count, as the stick does in the hand", () => {
  assert.equal(
    gearLine({ ...EMPTY, pocket3: "bandage" }),
    "Wyposażenie: opatrunek pod ręką",
  );
});

test("three bandages in the pockets read „3 × opatrunek pod ręką”", () => {
  assert.equal(
    gearLine({
      ...EMPTY,
      pocket1: "bandage",
      pocket2: "bandage",
      pocket3: "bandage",
    }),
    "Wyposażenie: 3 × opatrunek pod ręką",
  );
});

test("the main hand comes first, then the pockets, whatever the order of the slots", () => {
  assert.equal(
    gearLine({
      ...EMPTY,
      pocket2: "bandage",
      mainHand: "stick",
      pocket1: "bandage",
    }),
    "Wyposażenie: patyk w ręku, 2 × opatrunek pod ręką",
  );
});

test("a pocket with a gap between two bandages still counts both", () => {
  assert.equal(
    gearLine({ ...EMPTY, pocket1: "bandage", pocket3: "bandage" }),
    "Wyposażenie: 2 × opatrunek pod ręką",
  );
});

test("the function changes the gear it is given", () => {
  const gear = { ...EMPTY, mainHand: "stick", pocket1: "bandage" };
  const before = structuredClone(gear);
  gearLine(gear);
  assert.deepEqual(gear, before);
});
