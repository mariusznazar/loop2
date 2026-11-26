// The strike with the gear of a character: „Uderz — patyk” takes its stick from the main hand, an
// empty hand takes one stick from the backpack at the strike, in the same turn, the stick stays in the
// hand, and the turns of an encounter read the gear and the backpack as the turns before left them,
// which the map run takes when the turns resolve. Every gear, backpack and health expected is written
// out here; the wolf's numbers are those of D-144.
import assert from "node:assert/strict";
import { test } from "node:test";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import { resolveCombat } from "../../dist/browser/sim/combat.js";
import {
  actionRefusal,
  conditionHolds,
  judgeProgram,
} from "../../dist/browser/sim/program.js";
import { newMapRun, stepMinute } from "../../dist/browser/sim/run.js";
import { programFromRules } from "./program-fixture.mjs";

const mapId = "forest";
const map = MAPS[mapId];
const ALWAYS = { kind: "always" };
const STRIKE = { kind: "strikeWithStick" };
const KICK = { kind: "kick" };

/** The gear of a new character: the eight slots of the data, each holding none. */
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
const STICK_IN_HAND = { ...EMPTY_GEAR, mainHand: "stick" };
const NO_PIECES = { stick: 0, berry: 0, moss: 0, fiber: 0, bandage: 0 };

/** A map run at its start whose character carries `sticks` sticks and holds `gear`. */
function carrying(program, sticks, gear) {
  return newMapRun(
    map,
    1,
    program,
    { mapId, characterId: 1 },
    undefined,
    {},
    { ...NO_PIECES, stick: sticks },
    gear,
  ).run;
}

/** The exchanges in which the character's action took its piece from the backpack first. */
function refills(result) {
  return result.exchanges.filter(
    (exchange) => exchange.characterAction?.refill === true,
  ).length;
}

test("a strike with a stick in the main hand takes that stick and leaves the backpack's sticks", () => {
  // decision: D-144 "The character uses „Uderz — patyk”, which requires a stick in the main hand of its gear"
  // decision: D-456 "„Uderz — patyk” takes its stick from the main hand and from no other slot."
  // decision: D-145 "A stick stays in the main hand after a strike, with its condition unchanged."
  // decision: D-451 "An action that uses a piece of a kind kept piece by piece uses the piece the gear holds."
  const program = programFromRules({ condition: ALWAYS, action: STRIKE });
  const run = carrying(program, 2, STICK_IN_HAND);
  const result = resolveCombat(run, "wolf", program);

  assert.equal(result.outcome, "creatureDefeated");
  assert.equal(result.exchanges.length, 4);
  assert.equal(result.characterHealth, 79);
  assert.equal(refills(result), 0);
  assert.deepEqual(result.gear, STICK_IN_HAND);
  assert.deepEqual(result.backpack, { ...NO_PIECES, stick: 2 });
});

test("a strike at an empty main hand takes one stick from the backpack into the hand and strikes in the same turn", () => {
  // decision: D-457 "An empty slot of the gear stays empty until a rule puts something on it or the character uses an action that takes a piece from that slot."
  // decision: D-457 "That action then takes a fitting piece from the backpack into the slot itself and acts at once, with no time besides its own."
  // decision: D-144 "The character uses „Uderz — patyk”, which requires a stick in the main hand of its gear, taken there from the backpack where the hand is empty (D-457)"
  // decision: D-145 "A stick stays in the main hand after a strike, with its condition unchanged."
  const program = programFromRules({ condition: ALWAYS, action: STRIKE });
  const run = carrying(program, 3, EMPTY_GEAR);
  const runBefore = structuredClone(run);
  const programBefore = structuredClone(program);
  const result = resolveCombat(run, "wolf", program);

  // The four strikes of a stick held from the start: 24 − 6 × 3 = 6, then the wolf at 6 dodges.
  assert.equal(result.outcome, "creatureDefeated");
  assert.equal(result.exchanges.length, 4);
  assert.equal(result.characterHealth, 79);
  assert.deepEqual(result.exchanges[0].characterAction, {
    ruleId: 1,
    action: STRIKE,
    refill: true,
    damage: 6,
    creatureHealth: 18,
    characterHealth: 93,
  });
  assert.equal(refills(result), 1);
  assert.deepEqual(result.gear, STICK_IN_HAND);
  assert.deepEqual(result.backpack, { ...NO_PIECES, stick: 2 });
  assert.deepEqual(run, runBefore);
  assert.deepEqual(program, programBefore);
});

test("with no stick in the main hand or the backpack the strike is passed over with „brakuje 1 × patyk”, and a stick in the hand alone is enough", () => {
  // decision: D-380 "„Uderz — patyk” is short of a thing only where its stick lies neither in the main hand nor in the backpack (D-457), „brakuje 1 × patyk”."
  // decision: D-456 "„Uderz — patyk” takes its stick from the main hand and from no other slot."
  const program = programFromRules(
    { condition: ALWAYS, action: STRIKE },
    { condition: ALWAYS, action: KICK },
  );
  const fight = { combat: { health: 100, opponentHealth: 24 } };
  const cases = [
    ["nothing anywhere", EMPTY_GEAR, 0, "blocked", "brakuje 1 × patyk"],
    [
      "a stick in the second hand",
      { ...EMPTY_GEAR, secondHand: "stick" },
      0,
      "blocked",
      "brakuje 1 × patyk",
    ],
    [
      "a stick in a pocket",
      { ...EMPTY_GEAR, pocket1: "stick" },
      0,
      "blocked",
      "brakuje 1 × patyk",
    ],
    [
      "a stick in the hand and none in the backpack",
      STICK_IN_HAND,
      0,
      "go",
      null,
    ],
    ["an empty hand and a stick in the backpack", EMPTY_GEAR, 1, "go", null],
  ];
  for (const [name, gear, sticks, bar, reason] of cases) {
    const run = carrying(program, sticks, gear);
    assert.deepEqual(
      judgeProgram(run, program, fight).rules[1],
      { bar, reason },
      name,
    );
    const first = resolveCombat(run, "wolf", program).exchanges[0];
    assert.equal(
      first.characterAction.action.kind,
      bar === "go" ? "strikeWithStick" : "kick",
      name,
    );
  }
});

test("outside combat the strike stays refused with „tylko w walce”, a stick in the main hand or not", () => {
  // decision: D-140 "Combat verbs can be carried out only in combat, and only they can be carried out in it, but for „Załóż” (D-458)."
  for (const [gear, sticks] of [
    [STICK_IN_HAND, 0],
    [EMPTY_GEAR, 1],
  ]) {
    const run = carrying(programFromRules(), sticks, gear);
    assert.equal(actionRefusal(run, STRIKE), "tylko w walce");
  }
});

test("each turn reads the backpack and the gear as the turns before left them", () => {
  // decision: D-457 "That action then takes a fitting piece from the backpack into the slot itself and acts at once, with no time besides its own."
  // decision: D-23 "A character acts only by its program: in each free game minute and immediately before its action in each combat turn it carries out the first program rule whose condition holds and whose action of the character can be carried out then"
  // The first strike takes the one stick into the hand, so from the second turn „Zapas poniżej 1 szt.
  // · Patyk” holds and the kick above the strike wins.
  const program = programFromRules(
    {
      condition: { kind: "itemBelow", item: "stick", value: 1 },
      action: KICK,
    },
    { condition: ALWAYS, action: STRIKE },
  );
  const result = resolveCombat(
    carrying(program, 1, EMPTY_GEAR),
    "wolf",
    program,
  );
  const [first, second] = result.exchanges.map(
    (exchange) => exchange.characterAction,
  );

  assert.equal(first.ruleId, 2);
  assert.equal(first.refill, true);
  assert.equal(second.ruleId, 1);
  assert.equal(second.action.kind, "kick");
  assert.equal(refills(result), 1);
  assert.deepEqual(result.gear, STICK_IN_HAND);
  assert.deepEqual(result.backpack, NO_PIECES);
});

test("a strike that takes the last stick into the hand turns no later strike into a second take", () => {
  // decision: D-457 "That action then takes a fitting piece from the backpack into the slot itself and acts at once, with no time besides its own."
  // decision: D-145 "A stick stays in the main hand after a strike, with its condition unchanged."
  const program = programFromRules({ condition: ALWAYS, action: STRIKE });
  const result = resolveCombat(
    carrying(program, 1, EMPTY_GEAR),
    "wolf",
    program,
  );

  assert.equal(result.outcome, "creatureDefeated");
  assert.ok(
    result.exchanges.every(
      (exchange) => exchange.characterAction.action.kind === "strikeWithStick",
    ),
  );
  assert.equal(refills(result), 1);
  assert.equal(result.exchanges[0].characterAction.refill, true);
  assert.deepEqual(result.backpack, NO_PIECES);
});

test("the map run takes the gear and the backpack its fight left, and the stick in the hand serves no action of the backpack", () => {
  // decision: D-457 "That action then takes a fitting piece from the backpack into the slot itself and acts at once, with no time besides its own."
  // decision: D-455 "The gear is no backpack: a piece in the gear takes no room of the backpack's cap (D-64), is counted by no condition „Zapas poniżej” and by no line of the backpack on the screen of a map run, and is taken by none of the actions that take pieces from the backpack — „Zasil — ognisko”, „Zapal — patyk”, „Wytwórz — ognisko”, „Wytwórz”, „Zjedz — jagoda” and „Opatrz”."
  const program = programFromRules({ condition: ALWAYS, action: STRIKE });
  const attack = { creatureId: "wolf", attackMinute: 0, resolveMinute: 1 };
  const fighting = {
    ...carrying(program, 1, EMPTY_GEAR),
    current: null,
    activeCombat: attack,
    lastCombat: { ...attack, result: null },
  };
  const before = structuredClone(fighting);
  const resolved = stepMinute(fighting, map, program).run;

  assert.equal(resolved.lastCombat.result.outcome, "creatureDefeated");
  assert.deepEqual(resolved.character.gear, STICK_IN_HAND);
  assert.deepEqual(resolved.character.backpack, NO_PIECES);
  assert.deepEqual(fighting, before);

  const at = resolved.character.at;
  const byACampfire = {
    ...resolved,
    tiles: resolved.tiles.map((tile) =>
      tile.at.q === at.q && tile.at.r === at.r
        ? { ...tile, revealed: true }
        : tile,
    ),
    campfires: [{ at: { ...at }, minutesLeft: 10 }],
  };
  assert.equal(
    actionRefusal(byACampfire, { kind: "feedCampfire" }),
    "brak opału: patyk",
  );
  assert.equal(
    actionRefusal(byACampfire, { kind: "lightItem" }),
    "brakuje 1 × patyk",
  );
  assert.equal(
    conditionHolds(byACampfire, {
      kind: "itemBelow",
      item: "stick",
      value: 1,
    }),
    true,
  );
});
