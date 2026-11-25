// The game's rule for declining a name by its count in Polish (D-363), tested without a browser. The
// price of an action in the program editor and the counters of the screen Wiedza take their forms from it.
import assert from "node:assert/strict";
import { test } from "node:test";
import { NATURE_ENERGY_NAME } from "../../dist/browser/sim/data/actions.js";
import {
  countedName,
  withPreposition,
} from "../../dist/browser/view/counted-name.js";

test("a name takes the form of its count in Polish: 1 the singular, 2 to 4 and 22 to 24 the few, 0, 5 to 21, 25 and 112 the many", () => {
  // decision: D-363 "The pieces an action uses up and the nature energy it takes stand with the names of the things in the form their count takes and the energy by its full name"
  const forms = { one: "patyk", few: "patyki", many: "patyków" };
  const expected = [
    [0, "patyków"],
    [1, "patyk"],
    [2, "patyki"],
    [4, "patyki"],
    [5, "patyków"],
    [12, "patyków"],
    [14, "patyków"],
    [21, "patyków"],
    [22, "patyki"],
    [24, "patyki"],
    [25, "patyków"],
    [112, "patyków"],
    [122, "patyki"],
  ];
  for (const [count, form] of expected)
    assert.equal(countedName(count, forms), form, String(count));
});

test("the nature energy takes the form of its count in a price: 1 energia natury, 2 energie natury, 10 energii natury", () => {
  // decision: D-363 "The pieces an action uses up and the nature energy it takes stand with the names of the things in the form their count takes and the energy by its full name"
  assert.equal(countedName(1, NATURE_ENERGY_NAME), "energia natury");
  assert.equal(countedName(2, NATURE_ENERGY_NAME), "energie natury");
  assert.equal(countedName(10, NATURE_ENERGY_NAME), "energii natury");
});

// Catches a „z” that stays „z” before a number whose first spoken word begins with „sze” or „st” („ze
// sześciu”, „ze stu”), one that turns to „ze” before a number spoken from „siedem-” („z siedmiu”, „z
// siedemdziesięciu”, „z siedemnastu”) or before every number, and a hundred, thousand or teen read by the
// wrong word.
test("„z” before a count becomes „ze” where the first spoken word of the number begins with „sze” or „st” or is zero, and stays „z” otherwise", () => {
  const expected = [
    [0, "ze"],
    [1, "z"],
    [2, "z"],
    [6, "ze"],
    [7, "z"],
    [8, "z"],
    [12, "z"],
    [16, "ze"],
    [17, "z"],
    [24, "z"],
    [50, "z"],
    [60, "ze"],
    [69, "ze"],
    [70, "z"],
    [79, "z"],
    [100, "ze"],
    [120, "ze"],
    [199, "ze"],
    [200, "z"],
    [600, "ze"],
    [699, "ze"],
    [700, "z"],
    [799, "z"],
    [1000, "z"],
    [1500, "z"],
    [6000, "ze"],
    [7000, "z"],
    [16000, "ze"],
    [17000, "z"],
    [100000, "ze"],
    [1000000, "z"],
    [6000000, "ze"],
    [7000000, "z"],
  ];
  for (const [count, preposition] of expected)
    assert.equal(withPreposition(count), preposition, String(count));
});
