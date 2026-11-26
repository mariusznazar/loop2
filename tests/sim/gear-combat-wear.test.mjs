// The action „Załóż — {rzecz}” in combat: it takes one turn of the character, in which the wolf acts as
// in any turn, and changes the gear and the backpack of that turn as it does outside combat; the
// combat pick takes it with the refusals of its own, the condition „Puste” sees the gear as the turn
// before left it, and the signs of its rule are neither „trwa walka” nor „tylko w walce”. The
// expectations come from D-140 (its turn), D-144, D-458 (what it does), D-459 (the condition), D-380
// (the reasons) and D-309 (the signs) in foundations/decisions.md; every gear, backpack and health
// expected is written out here, and the wolf's numbers are those of D-144: a strike of 7 each turn.
import assert from "node:assert/strict";
import { test } from "node:test";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import { resolveCombat } from "../../dist/browser/sim/combat.js";
import {
  createCharacter,
  ruleSigns,
  send,
  setProgram,
} from "../../dist/browser/sim/game.js";
import { judgeProgram } from "../../dist/browser/sim/program.js";
import { newMapRun, stepMinute } from "../../dist/browser/sim/run.js";
import { programFromRules } from "./program-fixture.mjs";
import { newKnowingGame, withEdgeSolved } from "./understanding-fixture.mjs";

const mapId = "forest";
const map = MAPS[mapId];
const ALWAYS = { kind: "always" };
const EMPTY_HAND = { kind: "emptyPlace", place: "mainHand" };
const EMPTY_POCKET = { kind: "emptyPlace", place: "pocket" };
const EQUIP_STICK = { kind: "equip", item: "stick" };
const EQUIP_BANDAGE = { kind: "equip", item: "bandage" };
const STRIKE = { kind: "strikeWithStick" };
const KICK = { kind: "kick" };
const T0 = 1_760_000_000_000;

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
const NO_PIECES = { stick: 0, berry: 0, moss: 0, fiber: 0, bandage: 0 };

/** A map run at its start whose character carries `pieces` in its backpack and holds `gear`. */
function carrying(program, pieces, gear = EMPTY_GEAR, health = undefined) {
  const { run } = newMapRun(
    map,
    1,
    program,
    { mapId, characterId: 1 },
    undefined,
    {},
    { ...NO_PIECES, ...pieces },
    gear,
  );
  return health === undefined ? run : { ...run, body: { ...run.body, health } };
}

/** The action each exchange of a result holds for the character: its kind and target, or null. */
function acts(result) {
  return result.exchanges.map(
    (exchange) =>
      exchange.characterAction &&
      `${exchange.characterAction.action.kind}${
        exchange.characterAction.action.item
          ? ` ${exchange.characterAction.action.item}`
          : ""
      }`,
  );
}

const FIGHT = { combat: { health: 100, opponentHealth: 24 } };

test("„Załóż — patyk” in a combat turn puts the stick into the hand in that turn, and the wolf strikes in it as in any turn", () => {
  // decision: D-140 "„Załóż” can be carried out in combat and out of it, and like every action it takes the one rule that a free minute or a turn of combat starts: in combat one turn of the character, in which the wolf acts as in any turn, and out of combat 1 minute."
  // decision: D-144 "In combat the character can use „Załóż — {rzecz}” (D-458) as well, which takes one of its turns."
  // decision: D-458 "The action „Załóż — {rzecz}”, one for all slots, takes one piece of its item from the backpack into the slot the item fits, into the first empty pocket for an item of a pocket, and puts the piece that slot held, if any, into the backpack, so that the count of the backpack's pieces never rises."
  const program = programFromRules({ condition: ALWAYS, action: EQUIP_STICK });
  const run = carrying(program, { stick: 2 });
  const runBefore = structuredClone(run);
  const programBefore = structuredClone(program);
  const result = resolveCombat(run, "wolf", program);

  assert.deepEqual(result.exchanges[0], {
    creatureAction: { kind: "strike", damage: 7, characterHealth: 93 },
    characterAction: {
      ruleId: 1,
      action: EQUIP_STICK,
      refill: false,
      damage: 0,
      creatureHealth: 24,
      characterHealth: 93,
    },
  });
  // The next turns find the stick on: the rule is passed over, the wolf strikes all the same.
  assert.deepEqual(result.exchanges[1], {
    creatureAction: { kind: "strike", damage: 7, characterHealth: 86 },
    characterAction: null,
  });
  assert.deepEqual(result.gear, { ...EMPTY_GEAR, mainHand: "stick" });
  assert.deepEqual(result.backpack, { ...NO_PIECES, stick: 1 });
  assert.deepEqual(result.practice, {});
  assert.deepEqual(result.ruleStarts, { 1: 1 });
  assert.deepEqual(run, runBefore);
  assert.deepEqual(program, programBefore);
});

test("each turn starts one rule: „Puste” sees the gear and the backpack as the turn before left them, and the program does not pass to the next rule in the turn of „Załóż”", () => {
  // decision: D-140 "„Załóż” can be carried out in combat and out of it, and like every action it takes the one rule that a free minute or a turn of combat starts: in combat one turn of the character, in which the wolf acts as in any turn, and out of combat 1 minute."
  // decision: D-459 "The condition „Puste — {miejsce}” holds when the place it names holds nothing; „Puste — Kieszeń” holds when at least one pocket is empty."
  // decision: D-23 "A character acts only by its program: in each free game minute and immediately before its action in each combat turn it carries out the first program rule whose condition holds and whose action of the character can be carried out then"
  const program = programFromRules(
    { condition: EMPTY_HAND, action: EQUIP_STICK },
    { condition: EMPTY_POCKET, action: EQUIP_BANDAGE },
    { condition: ALWAYS, action: KICK },
  );
  const result = resolveCombat(
    carrying(program, { stick: 1, bandage: 3 }),
    "wolf",
    program,
  );

  // Turn 1 fills the hand, turns 2 to 4 the three pockets, one each; from turn 5 nothing is empty.
  assert.deepEqual(acts(result).slice(0, 6), [
    "equip stick",
    "equip bandage",
    "equip bandage",
    "equip bandage",
    "kick",
    "kick",
  ]);
  assert.deepEqual(
    result.exchanges
      .slice(0, 4)
      .map((exchange) => exchange.characterAction.ruleId),
    [1, 2, 2, 2],
  );
  assert.equal(result.exchanges[4].characterAction.ruleId, 3);
  assert.deepEqual(result.gear, {
    ...EMPTY_GEAR,
    mainHand: "stick",
    pocket1: "bandage",
    pocket2: "bandage",
    pocket3: "bandage",
  });
  assert.deepEqual(result.backpack, NO_PIECES);
});

test("a stick put on in a turn is the stick the strike of the next turn takes, and the strike takes none from the backpack", () => {
  // decision: D-144 "In combat the character can use „Załóż — {rzecz}” (D-458) as well, which takes one of its turns."
  // decision: D-145 "A stick stays in the main hand after a strike, with its condition unchanged."
  const program = programFromRules(
    { condition: EMPTY_HAND, action: EQUIP_STICK },
    { condition: ALWAYS, action: STRIKE },
  );
  const result = resolveCombat(
    carrying(program, { stick: 2 }),
    "wolf",
    program,
  );

  assert.deepEqual(acts(result).slice(0, 3), [
    "equip stick",
    "strikeWithStick",
    "strikeWithStick",
  ]);
  assert.ok(
    result.exchanges.every(
      (exchange) => exchange.characterAction?.refill !== true,
    ),
    "the stick was put on, so the strike refills nothing",
  );
  assert.equal(result.exchanges[1].characterAction.damage, 6);
  assert.deepEqual(result.gear, { ...EMPTY_GEAR, mainHand: "stick" });
  assert.deepEqual(result.backpack, { ...NO_PIECES, stick: 1 });
});

test("a character the wolf kills before its action puts nothing on", () => {
  // decision: D-140 "„Załóż” can be carried out in combat and out of it, and like every action it takes the one rule that a free minute or a turn of combat starts: in combat one turn of the character, in which the wolf acts as in any turn, and out of combat 1 minute."
  const program = programFromRules({ condition: ALWAYS, action: EQUIP_STICK });
  const result = resolveCombat(
    carrying(program, { stick: 1 }, EMPTY_GEAR, 7),
    "wolf",
    program,
  );

  assert.equal(result.outcome, "characterDied");
  assert.deepEqual(result.exchanges, [
    {
      creatureAction: { kind: "strike", damage: 7, characterHealth: 0 },
      characterAction: null,
    },
  ]);
  assert.deepEqual(result.gear, EMPTY_GEAR);
  assert.deepEqual(result.backpack, { ...NO_PIECES, stick: 1 });
});

test("the combat pick takes „Załóż” with the refusals of its reasons, none of them „trwa walka”", () => {
  // decision: D-380 "„Załóż — {rzecz}” short of the thing in the backpack reads „brakuje 1 × {rzecz}”, where the slot it fits already holds the thing „już założone: {rzecz}”, and for an item of a pocket with every pocket taken „kieszenie pełne” in place of „już założone”, each reason about the state of things standing before „brakuje …”."
  // decision: D-140 "„Załóż” can be carried out in combat and out of it, and like every action it takes the one rule that a free minute or a turn of combat starts: in combat one turn of the character, in which the wolf acts as in any turn, and out of combat 1 minute."
  const program = programFromRules(
    { condition: ALWAYS, action: EQUIP_STICK },
    { condition: ALWAYS, action: EQUIP_BANDAGE },
  );
  const cases = [
    ["a stick in the backpack", { stick: 1 }, EMPTY_GEAR, ["go", null]],
    ["no stick anywhere", {}, EMPTY_GEAR, ["blocked", "brakuje 1 × patyk"]],
    [
      "a stick in a pocket and none in the backpack",
      {},
      { ...EMPTY_GEAR, pocket1: "stick" },
      ["blocked", "brakuje 1 × patyk"],
    ],
    [
      "a stick in the hand and another in the backpack",
      { stick: 1 },
      { ...EMPTY_GEAR, mainHand: "stick" },
      ["blocked", "już założone: patyk"],
    ],
    [
      "a stick in the hand and none in the backpack",
      {},
      { ...EMPTY_GEAR, mainHand: "stick" },
      ["blocked", "już założone: patyk"],
    ],
  ];
  for (const [name, pieces, gear, [bar, reason]] of cases) {
    const run = carrying(program, pieces, gear);
    assert.deepEqual(
      judgeProgram(run, program, FIGHT).rules[1],
      { bar, reason },
      name,
    );
  }

  const full = {
    ...EMPTY_GEAR,
    pocket1: "bandage",
    pocket2: "bandage",
    pocket3: "bandage",
  };
  assert.deepEqual(
    judgeProgram(carrying(program, { bandage: 1 }, full), program, FIGHT)
      .rules[2],
    { bar: "blocked", reason: "kieszenie pełne" },
    "a bandage in the backpack and every pocket taken",
  );
  assert.deepEqual(
    judgeProgram(carrying(program, {}, full), program, FIGHT).rules[2],
    { bar: "blocked", reason: "kieszenie pełne" },
    "the reason on the state of the pockets stands before the lack in the backpack",
  );
  assert.deepEqual(
    judgeProgram(
      carrying(program, {}, { ...EMPTY_GEAR, pocket2: "bandage" }),
      program,
      FIGHT,
    ).rules[2],
    { bar: "blocked", reason: "brakuje 1 × opatrunek" },
    "a free pocket and no bandage in the backpack",
  );
});

test("a rule the combat pick passes over for its refusal gives way to the next rule in the same turn", () => {
  // decision: D-23 "A character acts only by its program: in each free game minute and immediately before its action in each combat turn it carries out the first program rule whose condition holds and whose action of the character can be carried out then"
  const program = programFromRules(
    { condition: ALWAYS, action: EQUIP_STICK },
    { condition: ALWAYS, action: KICK },
  );
  const result = resolveCombat(
    carrying(program, {}, { ...EMPTY_GEAR, mainHand: "stick" }),
    "wolf",
    program,
  );

  assert.equal(result.exchanges[0].characterAction.action.kind, "kick");
  assert.equal(result.exchanges[0].characterAction.damage, 3);
  assert.deepEqual(result.gear, { ...EMPTY_GEAR, mainHand: "stick" });
});

test("the map run takes the gear and the backpack the turns of „Załóż” left, when the turns resolve", () => {
  // decision: D-144 "In combat the character can use „Załóż — {rzecz}” (D-458) as well, which takes one of its turns."
  const program = programFromRules(
    { condition: EMPTY_POCKET, action: EQUIP_BANDAGE },
    { condition: ALWAYS, action: KICK },
  );
  const attack = { creatureId: "wolf", attackMinute: 0, resolveMinute: 1 };
  const fighting = {
    ...carrying(program, { bandage: 2, stick: 1 }),
    current: null,
    activeCombat: attack,
    lastCombat: { ...attack, result: null },
  };
  const before = structuredClone(fighting);
  const resolved = stepMinute(fighting, map, program).run;

  assert.equal(
    resolved.lastCombat.result.exchanges[0].characterAction.action.kind,
    "equip",
  );
  assert.deepEqual(resolved.character.gear, {
    ...EMPTY_GEAR,
    pocket1: "bandage",
    pocket2: "bandage",
  });
  assert.deepEqual(resolved.character.backpack, { ...NO_PIECES, stick: 1 });
  assert.deepEqual(fighting, before);
});

/** The state of a manual map run of the forest, the program `rules`, and the character holding `gear` and `pieces`. */
function sentWith(rules, pieces, gear = EMPTY_GEAR) {
  const created = createCharacter(
    withEdgeSolved(newKnowingGame()),
    "Ala",
  ).state;
  const set = setProgram(created, programFromRules(...rules)).state;
  const started = send(set, { mapId, characterId: 1 }, T0).state;
  return {
    ...started,
    run: {
      ...started.run,
      character: {
        ...started.run.character,
        gear: { ...gear },
        backpack: { ...NO_PIECES, ...pieces },
      },
    },
  };
}

/** `state` in the minutes of an attack: the wolf attacked at game minute 181 and its turns resolve in 186. */
function attacked(state) {
  const activeCombat = {
    creatureId: "wolf",
    attackMinute: 181,
    resolveMinute: 186,
  };
  return {
    ...state,
    run: {
      ...state.run,
      minute: 181,
      current: null,
      activeCombat,
      lastCombat: { ...activeCombat, result: null },
    },
  };
}

test("in the minutes of an attack a rule of „Załóż” is no amber „trwa walka” and wins where the first turn would choose it", () => {
  // decision: D-309 "A rule with „Załóż”, which D-140 lets be carried out in combat, is amber with neither reason, in those minutes or outside them, and where the turn would choose it, its row stands on `rule-winning` as that of a combat rule does."
  // decision: D-309 "In the minutes of an attack, from the minute of the attack to the resolving of its turns, the signs of the copy show what the first combat turn would choose now, at the health of the mage and of the creature as they stand"
  const state = attacked(
    sentWith(
      [
        { condition: ALWAYS, action: { kind: "explore" } },
        { condition: ALWAYS, action: EQUIP_STICK },
        { condition: ALWAYS, action: KICK },
      ],
      { stick: 1 },
    ),
  );
  const signs = ruleSigns(state);

  assert.equal(signs.running, null);
  assert.deepEqual(signs.judgement.rules[1], {
    bar: "blocked",
    reason: "trwa walka",
  });
  assert.deepEqual(signs.judgement.rules[2], { bar: "go", reason: null });
  assert.equal(signs.judgement.winner.id, 2);
  assert.deepEqual(signs.judgement.rules[3], { bar: "go", reason: null });
});

test("in the minutes of an attack a rule of „Załóż” that cannot be carried out names its own reason, and the rule below it wins", () => {
  // decision: D-309 "A rule with „Załóż”, which D-140 lets be carried out in combat, is amber with neither reason, in those minutes or outside them, and where the turn would choose it, its row stands on `rule-winning` as that of a combat rule does."
  // decision: D-380 "„Załóż — {rzecz}” short of the thing in the backpack reads „brakuje 1 × {rzecz}”, where the slot it fits already holds the thing „już założone: {rzecz}”, and for an item of a pocket with every pocket taken „kieszenie pełne” in place of „już założone”, each reason about the state of things standing before „brakuje …”."
  const state = attacked(
    sentWith(
      [
        { condition: ALWAYS, action: EQUIP_STICK },
        { condition: ALWAYS, action: KICK },
      ],
      {},
    ),
  );
  const signs = ruleSigns(state);

  assert.deepEqual(signs.judgement.rules[1], {
    bar: "blocked",
    reason: "brakuje 1 × patyk",
  });
  assert.equal(signs.judgement.winner.id, 2);
});

test("outside the minutes of an attack a rule of „Załóż” is no amber „tylko w walce”: it is green where it can be carried out and names its own reason where it cannot", () => {
  // decision: D-309 "A rule with „Załóż”, which D-140 lets be carried out in combat, is amber with neither reason, in those minutes or outside them, and where the turn would choose it, its row stands on `rule-winning` as that of a combat rule does."
  // decision: D-309 "Outside those minutes a combat rule whose condition holds is amber with the reason „tylko w walce”."
  const rules = [
    { condition: ALWAYS, action: EQUIP_STICK },
    { condition: ALWAYS, action: KICK },
  ];
  const holds = ruleSigns(sentWith(rules, { stick: 1 })).judgement;
  assert.deepEqual(holds.rules[1], { bar: "go", reason: null });
  assert.equal(holds.winner.id, 1);
  assert.deepEqual(holds.rules[2], { bar: "blocked", reason: "tylko w walce" });

  const on = ruleSigns(
    sentWith(rules, { stick: 1 }, { ...EMPTY_GEAR, mainHand: "stick" }),
  ).judgement;
  assert.deepEqual(on.rules[1], {
    bar: "blocked",
    reason: "już założone: patyk",
  });
});
