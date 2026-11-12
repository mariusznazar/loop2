// The numbers the card of a map shows (D-327, D-333 and D-142 in foundations/decisions.md). Each
// expected value is written out here with the arithmetic that gives it from the temperatures,
// densities, cooldowns and chances of D-388 and D-142, never from the functions under test.
import assert from "node:assert/strict";
import { test } from "node:test";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import {
  expectedTiles,
  meanAttackGap,
  minutesWithoutFire,
  usualStep,
} from "../../dist/browser/sim/map-card.js";

const { forest, forestDeep } = MAPS;
const [stick, berry, moss, fiber] = forest.resources;
const wolf = forestDeep.attackers[0];

test("Las, at 25 °C with no warmth, keeps the body at or above the chill threshold for 83 game minutes", () => {
  // Start 37.0 °C, chilled below 35.0 °C; cooling 0.002 °C a minute per degree below 37 °C, so
  // 0.002 × 12 = 0.024 °C a minute. (37 − 35) / 0.024 = 83.3…: the 83rd minute ends at 35.008 °C,
  // the 84th at 34.984 °C.
  assert.equal(minutesWithoutFire(forest), 83);
});

test("Las — głębiej, at 7 °C with no warmth, keeps the body at or above the chill threshold for 33 game minutes", () => {
  // Cooling 0.002 × 30 = 0.06 °C a minute. (37 − 35) / 0.06 = 33.3…: the 33rd minute ends at
  // 35.02 °C, the 34th at 34.96 °C.
  assert.equal(minutesWithoutFire(forestDeep), 33);
});

test("a body that reaches exactly the chill threshold at minute 1000 is still at or above it there", () => {
  // Cooling 0.002 × 1 = 0.002 °C a minute: (37 − 35) / 0.002 = 1000 minutes end at exactly 35.0 °C,
  // which is not below the threshold; minute 1001 ends at 34.998 °C.
  assert.equal(minutesWithoutFire({ ...forest, ambientTemperature: 36 }), 1000);
});

test("a map at or above the body's starting temperature does not cool the body below the threshold, so no minutes are given", () => {
  // No cooling at 37 °C or warmer: the body never reaches 35 °C.
  assert.equal(minutesWithoutFire({ ...forest, ambientTemperature: 37 }), null);
  assert.equal(minutesWithoutFire({ ...forest, ambientTemperature: 40 }), null);
});

test("Las gives patyk 11 of 16 tiles, from density 0.7 on 4 × 4 = 16 tiles, rounded to the nearest whole", () => {
  // 0.7 × 16 = 11.2 → 11.
  assert.deepEqual(expectedTiles(forest, stick), { holding: 11, tiles: 16 });
});

test("Las gives jagoda 8, mech 6 and włókno 6 of 16 tiles, from densities 0.5, 0.4 and 0.4", () => {
  // 0.5 × 16 = 8; 0.4 × 16 = 6.4 → 6; 0.4 × 16 = 6.4 → 6.
  assert.deepEqual(expectedTiles(forest, berry), { holding: 8, tiles: 16 });
  assert.deepEqual(expectedTiles(forest, moss), { holding: 6, tiles: 16 });
  assert.deepEqual(expectedTiles(forest, fiber), { holding: 6, tiles: 16 });
});

test("Las — głębiej gives patyk 18 of 25 tiles, from density 0.7 on 5 × 5 = 25 tiles", () => {
  // 0.7 × 25 = 17.5, which the card shows as 18 (D-333: rounded to the nearest whole).
  assert.deepEqual(expectedTiles(forestDeep, forestDeep.resources[0]), {
    holding: 18,
    tiles: 25,
  });
});

test("the wolf's mean gap between attacks is its cooldown 180 plus 1 / 0.01 = 100, so 280 game minutes", () => {
  // D-142: the first eligible minute is 181, and a chance of 0.01 a minute gives 100 minutes on
  // average after it: 180 + 100 = 280.
  assert.equal(meanAttackGap(wolf), 280);
});

test("the mean gap is rounded to whole minutes: 1 / 0.3 = 3.33… adds 3 to a cooldown of 0", () => {
  assert.equal(
    meanAttackGap({ id: "wolf", chancePerMinute: 0.3, cooldownMinutes: 0 }),
    3,
  );
});

test("the usual step of the data's maps is 5 minutes, as Las and Las — głębiej both give", () => {
  assert.equal(usualStep(Object.values(MAPS)), 5);
});

test("the usual step is the step most maps give, and on a tie the one that comes first in the data", () => {
  // Two maps give 3 and one gives 5: 3 is the usual step.
  assert.equal(
    usualStep([{ stepMinutes: 5 }, { stepMinutes: 3 }, { stepMinutes: 3 }]),
    3,
  );
  // One map gives 7 and one gives 5: a tie, and 7 comes first.
  assert.equal(usualStep([{ stepMinutes: 7 }, { stepMinutes: 5 }]), 7);
  // Two maps give 5 and two give 7, the 5s first in the data: a tie again, and 5 comes first.
  assert.equal(
    usualStep([
      { stepMinutes: 5 },
      { stepMinutes: 7 },
      { stepMinutes: 7 },
      { stepMinutes: 5 },
    ]),
    5,
  );
});
