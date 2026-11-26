// The marker of a creature's blow over the health cell of the body row (D-450), read from the events
// of one simulation call: one marker for a combat with the sum of the creature's blows and its name
// from the game's data, where the sum is at least 2, a killing blow included, at the paces 1×, 2× and
// 4× and at no other. Every case writes out the events it feeds; no first draw, reload or load gives
// an event, so none gives a marker.
import assert from "node:assert/strict";
import { test } from "node:test";
import { blowMarker } from "../../dist/browser/view/body-blow.js";

/** One exchange of a combat in which the creature strikes for `damage` and leaves the character at `left`. */
const strike = (minute, damage, left = 50, characterAction = null) => ({
  kind: "combatExchange",
  minute,
  exchange: {
    creatureAction: { kind: "strike", damage, characterHealth: left },
    characterAction,
  },
});

/** One exchange in which the creature dodges and takes no part in the sum. */
const dodge = (minute) => ({
  kind: "combatExchange",
  minute,
  exchange: { creatureAction: { kind: "dodge" }, characterAction: null },
});

const ended = (minute, outcome = "creatureDefeated") => ({
  kind: "combatEnded",
  minute,
  outcome,
});

const attacked = (minute, creature) => ({ kind: "attacked", minute, creature });

const WOLF = { creatureId: "wolf" };
const BEAR = { creatureId: "bear" };

/** A combat of a wolf whose three blows took 7 each, resolved in game minute 40. */
const WOLF_COMBAT = [
  strike(40, 7, 93),
  strike(40, 7, 86),
  strike(40, 7, 79),
  ended(40),
];

test("a combat of a wolf whose three blows took 7 each gives one marker „−21 · wilk”, at 1×, 2× and 4×", () => {
  // decision: D-450 "At a creature's blow the health cell shakes and shows the fading „−{n} · {stworzenie}”, read from the events the simulation returned (D-04) and never at a first draw of the screen, after a reload or after a load: one marker for a combat, {n} being the sum of the creature's blows in it"
  // decision: D-450 "The marker shows at the paces 1×, 2× and 4×"
  // decision: D-04 "For the blow marker of the health cell of the body row (D-450) the browser view also draws from the events the simulation returned, as it does for the scene"
  // D-450 gives „−21 · wilk” for this very combat; the name is the wolf's in the data.
  for (const pace of [1, 2, 4]) {
    assert.deepEqual(blowMarker(WOLF_COMBAT, WOLF, pace), {
      text: "−21 · wilk",
      minute: 40,
    });
  }
});

test("the marker shows at no other pace than 1×, 2× and 4×: a blow at 8× or 16× gives none", () => {
  // decision: D-450 "The marker shows at the paces 1×, 2× and 4× and at no other"
  // decision: D-450 "The marker shows at the paces 1×, 2× and 4× and at no other, as the scene shows no text of its effects at 8× and 16× (D-317), and a blow at 8× or 16× is dropped, not kept for a slower pace"
  assert.equal(blowMarker(WOLF_COMBAT, WOLF, 8), null);
  assert.equal(blowMarker(WOLF_COMBAT, WOLF, 16), null);
});

test("the sum of the blows must be at least 2: 1 gives no marker, 2 gives „−2 · wilk”, a dodging creature none", () => {
  // decision: D-450 "At a creature's blow the health cell shakes and shows the fading „−{n} · {stworzenie}”, read from the events the simulation returned (D-04) and never at a first draw of the screen, after a reload or after a load: one marker for a combat, {n} being the sum of the creature's blows in it, where that sum is at least 2"
  assert.equal(blowMarker([strike(40, 1), ended(40)], WOLF, 1), null);
  assert.equal(
    blowMarker([strike(40, 1), strike(40, 0), ended(40)], WOLF, 1),
    null,
  );
  assert.deepEqual(blowMarker([strike(40, 2), ended(40)], WOLF, 1), {
    text: "−2 · wilk",
    minute: 40,
  });
  assert.equal(blowMarker([dodge(40), dodge(40), ended(40)], WOLF, 1), null);
});

test("only the creature's strikes are summed: its dodges and the character's own damage are not", () => {
  // decision: D-450 "At a creature's blow the health cell shakes and shows the fading „−{n} · {stworzenie}”, read from the events the simulation returned (D-04) and never at a first draw of the screen, after a reload or after a load: one marker for a combat, {n} being the sum of the creature's blows in it"
  const characterAction = {
    ruleId: 1,
    action: { kind: "strikeWithStick" },
    damage: 6,
    creatureHealth: 18,
    characterHealth: 93,
  };
  const events = [
    strike(40, 7, 93, characterAction),
    dodge(40),
    strike(40, 7, 86, characterAction),
    ended(40),
  ];
  assert.deepEqual(blowMarker(events, WOLF, 1), {
    text: "−14 · wilk",
    minute: 40,
  });
});

test("a killing blow is in the sum, and the marker comes with the death of the same call", () => {
  // decision: D-450 "At a creature's blow the health cell shakes and shows the fading „−{n} · {stworzenie}”, read from the events the simulation returned (D-04) and never at a first draw of the screen, after a reload or after a load: one marker for a combat, {n} being the sum of the creature's blows in it, where that sum is at least 2, a killing blow included before the end-of-run window opens"
  // The wolf's last blow of 7 leaves the character at 0; the call also holds the death.
  const events = [
    strike(40, 7, 14),
    strike(40, 7, 7),
    strike(40, 7, 0),
    ended(40, "characterDied"),
    { kind: "characterDied", minute: 40, cause: "combat" },
  ];
  assert.deepEqual(blowMarker(events, WOLF, 1), {
    text: "−21 · wilk",
    minute: 40,
  });
});

test("a call that holds no blow gives no marker: no event, other events, and a combat of the call's start with no exchange", () => {
  // decision: D-450 "At a creature's blow the health cell shakes and shows the fading „−{n} · {stworzenie}”, read from the events the simulation returned (D-04) and never at a first draw of the screen, after a reload or after a load"
  assert.equal(blowMarker([], WOLF, 1), null);
  assert.equal(
    blowMarker(
      [
        { kind: "moved", minute: 3, from: { q: 0, r: 0 }, to: { q: 1, r: 0 } },
        attacked(3, "wolf"),
      ],
      WOLF,
      1,
    ),
    null,
  );
});

test("the creature is named from the data: the wolf's attack in the call, else the last combat of the run, a bear by its own name", () => {
  // decision: D-450 "At a creature's blow the health cell shakes and shows the fading „−{n} · {stworzenie}”"
  // The attack comes five minutes before the blows, so in a call of the blows alone the run's last
  // combat names the creature; an attack in the same call names it first.
  const blows = [strike(40, 20, 80), ended(40)];
  assert.equal(blowMarker(blows, BEAR, 1).text, "−20 · niedźwiedź");
  assert.equal(
    blowMarker([attacked(38, "wolf"), ...blows], BEAR, 1).text,
    "−20 · wilk",
  );
  assert.equal(blowMarker(blows, null, 1), null);
});

test("a call that holds two combats gives the marker of the last one with a sum of at least 2, which replaces the one before", () => {
  // decision: D-450 "At a creature's blow the health cell shakes and shows the fading „−{n} · {stworzenie}”, read from the events the simulation returned (D-04) and never at a first draw of the screen, after a reload or after a load: one marker for a combat, {n} being the sum of the creature's blows in it, where that sum is at least 2, a killing blow included before the end-of-run window opens, and a new blow replacing the marker of the one before"
  const first = [strike(40, 7, 93), ended(40)];
  const second = [strike(45, 20, 60), strike(45, 20, 40), ended(45)];
  assert.deepEqual(blowMarker([...first, ...second], WOLF, 1), {
    text: "−40 · wilk",
    minute: 45,
  });
  // A later combat whose creature dodged leaves the earlier marker standing.
  assert.deepEqual(blowMarker([...first, dodge(45), ended(45)], WOLF, 1), {
    text: "−7 · wilk",
    minute: 40,
  });
});
