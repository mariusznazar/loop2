// „Ucisk — {rzecz}”, the action of combat that the bought branch „Ucisk” of „Opatrywanie małych ran”
// opens: its row of the data, its targets, its price, its refusals out of combat and in a combat turn,
// its turns in an encounter with the pocket it takes its bandage from, the character's branch, and a
// turn of it read from a saved game state. The wolf's numbers are those of D-144 (24 health, a bite of
// 7, „Zdrowie poniżej 8 → Odskocz; Zawsze → Uderz”), a strike with a stick deals 6 (D-144), a bandage
// gives back 25 and 5 more a rank of „Mocniejszy zwój” (D-145, D-379), and full health is 100. Every
// health, gear and backpack expected is written out here.
import assert from "node:assert/strict";
import { test } from "node:test";
import { itemTargets } from "../../dist/browser/sim/action-targets.js";
import { resolveCombat } from "../../dist/browser/sim/combat.js";
import { ACTIONS } from "../../dist/browser/sim/data/actions.js";
import { ITEMS } from "../../dist/browser/sim/data/items.js";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import { BRANCHES } from "../../dist/browser/sim/data/skills.js";
import {
  advanceMinutes,
  createCharacter,
  ruleSigns,
  send,
  setProgram,
  withSaveTime,
} from "../../dist/browser/sim/game.js";
import {
  actionPrice,
  actionRefusal,
  chooseActivity,
  combatPiece,
  judgeProgram,
} from "../../dist/browser/sim/program.js";
import { checkProgram } from "../../dist/browser/sim/programs.js";
import { newMapRun } from "../../dist/browser/sim/run.js";
import { loadSavedGame, savedGame } from "../../dist/browser/sim/saved-game.js";
import {
  branchActionAvailable,
  skillsGrowing,
} from "../../dist/browser/sim/skills.js";
import { programFromRules } from "./program-fixture.mjs";
import { newKnowingGame, withEdgeSolved } from "./understanding-fixture.mjs";

const mapId = "forest";
const map = MAPS[mapId];
const T0 = 1_760_000_000_000;
const ALWAYS = { kind: "always" };
const PRESSURE = { kind: "pressure", item: "bandage" };
const STRIKE = { kind: "strikeWithStick" };
const KICK = { kind: "kick" };
const below = (value) => ({ kind: "healthBelow", value });
const rule = (condition, action) => ({ condition, action });

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
/** The skills of a mage that bought „Ucisk”: 60 practice of the tree give the 3 points it costs. */
const BOUGHT = { tending: { practice: 60, ranks: { pressure: 1 } } };

/** A map run of Las at its start at `health`, with `skills`, the pieces of `backpack` and `gear`. */
function fighter({ health = 100, skills = BOUGHT, backpack = {}, gear = {} }) {
  const { run } = newMapRun(
    map,
    1,
    programFromRules(),
    { mapId, characterId: 1 },
    undefined,
    skills,
    { ...NO_PIECES, ...backpack },
    { ...EMPTY_GEAR, ...gear },
  );
  return { ...run, body: { ...run.body, health } };
}

/** Runs `body` with the rows laid on the built data of `table`, and takes them off again after it. */
function withRows(table, rows, body) {
  for (const id of Object.keys(rows))
    assert.ok(
      !Object.hasOwn(table, id),
      `precondition: ${id} is no row of the data`,
    );
  Object.assign(table, rows);
  try {
    return body();
  } finally {
    for (const id of Object.keys(rows)) delete table[id];
  }
}

/** An item laid in a test beside the bandage: a second thing the data give a healing. */
const SPLINT = {
  name: "szyna",
  plural: { few: "szyny", many: "szyn" },
  icon: "first-aid-kit",
  iconTitle: "First aid kit icon",
  revealedBy: { kind: "gathered", item: "moss" },
  healing: { health: 10 },
};

test("„Ucisk” stands in „Żywność i walka” after „Odskocz” and before „Załóż”, with the icon of „Opatrz” and a turn for its time", () => {
  // decision: D-290 "The pick of the rule panel sets the actions in five named groups"
  assert.ok(Object.hasOwn(ACTIONS, "pressure"), "the data hold „Ucisk”");
  assert.deepEqual(
    Object.keys(ACTIONS).filter((id) => ACTIONS[id].group === "foodAndCombat"),
    ["eat", "tend", "strikeWithStick", "kick", "dodge", "pressure", "equip"],
  );
  const pressure = ACTIONS.pressure;
  assert.equal(pressure.label, "Ucisk");
  assert.equal(pressure.status, "Uciska ranę");
  assert.equal(pressure.icon, ACTIONS.tend.icon);
  assert.equal(pressure.iconTitle, ACTIONS.tend.iconTitle);
  assert.equal(pressure.minutes, null);
  assert.ok(pressure.combat !== undefined, "an action of combat");
  assert.deepEqual(pressure.revealedBy, {
    kind: "treeDiscovered",
    skill: "tending",
  });
});

test("the targets of „Ucisk” are the items the data give a healing: the bandage, and a second such item laid in the data", () => {
  // decision: D-443 "An action is a verb with a target, and the targets a verb takes follow from the properties of the items in the game's data."
  assert.deepEqual(itemTargets("pressure"), ["bandage"]);
  withRows(ITEMS, { splint: SPLINT }, () => {
    assert.deepEqual(itemTargets("pressure"), ["bandage", "splint"]);
  });
});

test("the program check takes „Ucisk” with a target of healing and refuses it with another item or with none", () => {
  // decision: D-443 "An action is a verb with a target, and the targets a verb takes follow from the properties of the items in the game's data."
  const taken = checkProgram(programFromRules(rule(ALWAYS, PRESSURE)), null);
  assert.deepEqual(taken.groups[0].rules[0].action, PRESSURE);
  for (const action of [
    { kind: "pressure", item: "stick" },
    { kind: "pressure", item: "moss" },
    { kind: "pressure" },
    { kind: "pressure", item: "nothing" },
  ])
    assert.throws(
      () => checkProgram(programFromRules(rule(ALWAYS, action)), null),
      JSON.stringify(action),
    );
});

test("the branch „Ucisk” of „Opatrywanie małych ran” costs 3 points and opens the action to the character that bought it alone", () => {
  // decision: D-379 "Each rank of a branch of „Opatrywanie małych ran” gives the effect below, and the ranks of a branch cost the points listed, in order: „Mocniejszy zwój” +5 health from a bandage, prices 1 · 1 · 2; „Wprawna dłoń” −2 minutes of „Opatrz”, prices 1 · 1 · 2; „Szybkie gojenie” +0.05 health regained by itself in a game minute, prices 2 · 3; „Ucisk”, price 3."
  // decision: D-120 "An archetype opens character skills, not actions: an action is open to a character when the character skill that its pair of verb and target grows is among the predispositions of the character's archetype and, for an action opened by a branch, the character has bought that branch."
  assert.deepEqual(BRANCHES.pressure, {
    skill: "tending",
    name: "Ucisk",
    description:
      "Opatrzenie w trakcie starcia, za turę zamiast za dziesięć minut.",
    costs: [3],
    effect: { kind: "action", action: "pressure" },
  });
  assert.equal(branchActionAvailable({}, "pressure"), false);
  assert.equal(
    branchActionAvailable(
      { tending: { practice: 60, ranks: { strongerRoll: 1 } } },
      "pressure",
    ),
    false,
  );
  assert.equal(branchActionAvailable(BOUGHT, "pressure"), true);
});

test("„Ucisk” grows „Opatrywanie małych ran” with the bandage and with every other target of healing", () => {
  // decision: D-150 "„Ucisk — {rzecz}” grows „Opatrywanie małych ran”"
  assert.deepEqual(skillsGrowing("pressure", "bandage"), ["tending"]);
  withRows(ITEMS, { splint: SPLINT }, () => {
    assert.deepEqual(skillsGrowing("pressure", "splint"), ["tending"]);
  });
});

test("„Ucisk” costs one piece of its target, and the bare verb, with no target, nothing", () => {
  // decision: D-363 "„Ucisk” with an item as the target is such an action too, its cell showing no price and its target and the action chosen showing it, such as „Ucisk — Opatrunek (1 opatrunek)”."
  assert.deepEqual(actionPrice("pressure", {}, "bandage"), {
    pieces: [{ item: "bandage", count: 1 }],
    natureEnergy: 0,
  });
  assert.deepEqual(actionPrice("pressure", {}), {
    pieces: [],
    natureEnergy: 0,
  });
});

test("outside combat „Ucisk” is refused with „tylko w walce”, a bandage in a pocket and in the backpack, and the pick passes over it", () => {
  // decision: D-309 "Outside those minutes a combat rule whose condition holds is amber with the reason „tylko w walce”."
  // decision: D-140 "Combat verbs can be carried out only in combat, and only they can be carried out in it, but for „Załóż” (D-458)."
  const run = fighter({
    health: 40,
    backpack: { bandage: 1 },
    gear: { pocket1: "bandage" },
  });
  assert.equal(actionRefusal(run, PRESSURE), "tylko w walce");
  const program = programFromRules(
    rule(ALWAYS, PRESSURE),
    rule(ALWAYS, { kind: "explore" }),
  );
  assert.equal(chooseActivity(run, program).ruleId, 2);
});

test("in a combat turn „Ucisk” reads the health of the turn: „zdrowie pełne” before „brakuje 1 × opatrunek”, and a bandage in a pocket or in the backpack is enough", () => {
  // decision: D-380 "„Ucisk — {rzecz}” is refused with the same words and in the same order as „Opatrz — {rzecz}”, „zdrowie pełne” before „brakuje {ile} × {rzecz}”, the lack counted in the pockets together with the backpack that refills a pocket."
  // decision: D-144 "In one combat turn it gives back what „Opatrz” gives back with the same item, the bought ranks of „Mocniejszy zwój” included, never above full health, and at full health it is not carried out."
  const program = programFromRules(rule(ALWAYS, PRESSURE), rule(ALWAYS, KICK));
  const cases = [
    [
      "full at the turn, hurt before the fight",
      40,
      100,
      {},
      { pocket1: "bandage" },
      "blocked",
      "zdrowie pełne",
    ],
    [
      "hurt at the turn, full before the fight",
      100,
      40,
      {},
      { pocket1: "bandage" },
      "go",
      null,
    ],
    [
      "hurt, a bandage in the third pocket",
      100,
      40,
      {},
      { pocket3: "bandage" },
      "go",
      null,
    ],
    [
      "hurt, empty pockets and a bandage in the backpack",
      100,
      40,
      { bandage: 1 },
      {},
      "go",
      null,
    ],
    [
      "hurt, no bandage anywhere",
      100,
      40,
      {},
      {},
      "blocked",
      "brakuje 1 × opatrunek",
    ],
    ["full, no bandage anywhere", 100, 100, {}, {}, "blocked", "zdrowie pełne"],
  ];
  for (const [
    name,
    bodyHealth,
    turnHealth,
    backpack,
    gear,
    bar,
    reason,
  ] of cases) {
    const run = fighter({ health: bodyHealth, backpack, gear });
    const judged = judgeProgram(run, program, {
      combat: { health: turnHealth, opponentHealth: 24 },
    });
    assert.deepEqual(judged.rules[1], { bar, reason }, name);
    assert.equal(judged.winner?.id, bar === "go" ? 1 : 2, name);
  }
});

test("the piece of „Ucisk” comes from the first pocket holding its item, else through the first empty pocket from the backpack, and that of a strike from the main hand alone", () => {
  // decision: D-144 "„Ucisk — {rzecz}” uses up one piece of its item from a pocket of the belt, an empty pocket taking a piece from the backpack (D-457), while „Opatrz” outside combat takes its piece from the backpack."
  // decision: D-456 "„Uderz — patyk” takes its stick from the main hand and from no other slot."
  const at = (gear, backpack = {}) => ({
    gear: { ...EMPTY_GEAR, ...gear },
    backpack: { ...NO_PIECES, ...backpack },
  });
  const cases = [
    [
      PRESSURE,
      at({ pocket2: "bandage", pocket3: "bandage" }, { bandage: 1 }),
      { slot: "pocket2", refill: false },
    ],
    [
      PRESSURE,
      at({ pocket1: "bandage" }, { bandage: 1 }),
      { slot: "pocket1", refill: false },
    ],
    [PRESSURE, at({}, { bandage: 1 }), { slot: "pocket1", refill: true }],
    [PRESSURE, at({}), null],
    [
      STRIKE,
      at({ mainHand: "stick" }, { stick: 1 }),
      { slot: "mainHand", refill: false },
    ],
    [STRIKE, at({}, { stick: 1 }), { slot: "mainHand", refill: true }],
    [STRIKE, at({ pocket1: "stick" }), null],
  ];
  for (const [action, character, piece] of cases)
    assert.deepEqual(
      combatPiece(character, action),
      piece,
      JSON.stringify([action, character.gear]),
    );
});

// Catches a refill that puts into an empty pocket a piece of an item the data fit to no pocket, which
// would let „Ucisk” heal with a piece taken straight from the backpack. No item of the data but the
// bandage heals, so a second healing item is laid in the data, once fitting no place and once a pocket.
test("„Ucisk” of a healing item that fits no pocket takes no piece from the backpack and is refused „brakuje 1 × {rzecz}”; one that fits a pocket refills the first empty pocket", () => {
  // decision: D-456 "An item whose data name no place fits no slot."
  // decision: D-457 "That action then takes a fitting piece from the backpack into the slot itself and acts at once, with no time besides its own."
  const splinted = { kind: "pressure", item: "splint" };
  const program = programFromRules(
    rule(below(50), splinted),
    rule(ALWAYS, KICK),
  );
  const backpack = { ...NO_PIECES, splint: 1 };
  withRows(ITEMS, { splint: SPLINT }, () => {
    assert.equal(combatPiece({ gear: EMPTY_GEAR, backpack }, splinted), null);
    const run = fighter({ health: 40, backpack: { splint: 1 } });
    assert.deepEqual(
      judgeProgram(run, program, {
        combat: { health: 40, opponentHealth: 24 },
      }).rules[1],
      { bar: "blocked", reason: "brakuje 1 × szyna" },
    );
    const result = resolveCombat(run, "wolf", program);
    assert.equal(result.exchanges[0].characterAction.action.kind, "kick");
    assert.equal(
      result.exchanges.some(
        (exchange) => exchange.characterAction?.action.kind === "pressure",
      ),
      false,
    );
    assert.deepEqual(result.backpack, backpack);
    assert.deepEqual(result.gear, EMPTY_GEAR);
  });
  withRows(ITEMS, { splint: { ...SPLINT, fits: "pocket" } }, () => {
    assert.deepEqual(
      combatPiece(
        { gear: { ...EMPTY_GEAR, pocket1: "bandage" }, backpack },
        splinted,
      ),
      { slot: "pocket2", refill: true },
    );
  });
});

test("„Ucisk” uses up the bandage of the first pocket holding one, and with none in a pocket takes one from the backpack through the first empty pocket in the same turn", () => {
  // decision: D-144 "„Ucisk — {rzecz}” uses up one piece of its item from a pocket of the belt, an empty pocket taking a piece from the backpack (D-457), while „Opatrz” outside combat takes its piece from the backpack."
  // decision: D-457 "That action then takes a fitting piece from the backpack into the slot itself and acts at once, with no time besides its own."
  // decision: D-193 "An action ending in effect adds one practice to the character skill its pair of verb and target grows, in the game minute of that effect"
  const program = programFromRules(
    rule(below(40), PRESSURE),
    rule(ALWAYS, STRIKE),
  );
  const run = fighter({
    health: 40,
    backpack: { bandage: 2 },
    gear: { mainHand: "stick", pocket2: "bandage" },
  });
  const runBefore = structuredClone(run);
  const result = resolveCombat(run, "wolf", program);

  // Bites of 7: 40 → 33, a bandage of the second pocket → 58; 51, 44 with two strikes, the wolf at 12;
  // 37, a bandage from the backpack → 62; 55 and a strike, the wolf at 6; it dodges, the last strike.
  assert.equal(result.outcome, "creatureDefeated");
  assert.equal(result.exchanges.length, 6);
  assert.deepEqual(result.exchanges[0].characterAction, {
    ruleId: 1,
    action: PRESSURE,
    refill: false,
    damage: 0,
    creatureHealth: 24,
    characterHealth: 58,
  });
  assert.deepEqual(result.exchanges[3].characterAction, {
    ruleId: 1,
    action: PRESSURE,
    refill: true,
    damage: 0,
    creatureHealth: 12,
    characterHealth: 62,
  });
  assert.equal(result.characterHealth, 55);
  assert.deepEqual(result.gear, { ...EMPTY_GEAR, mainHand: "stick" });
  assert.deepEqual(result.backpack, { ...NO_PIECES, bandage: 1 });
  assert.deepEqual(result.practice, { tending: 2, oneHandedCombat: 4 });
  assert.deepEqual(run, runBefore);
});

test("„Ucisk” gives back what the bandage gives with the bought ranks of „Mocniejszy zwój”, never above full health", () => {
  // decision: D-144 "In one combat turn it gives back what „Opatrz” gives back with the same item, the bought ranks of „Mocniejszy zwój” included, never above full health, and at full health it is not carried out."
  // decision: D-145 "The health „Opatrz — {rzecz}” gives back is the healing the data give the thing, increased by the bought ranks of „Mocniejszy zwój”."
  const program = programFromRules(
    rule(below(95), PRESSURE),
    rule(ALWAYS, KICK),
  );
  const ranked = {
    tending: { practice: 110, ranks: { pressure: 1, strongerRoll: 2 } },
  };
  const stronger = resolveCombat(
    fighter({ health: 40, skills: ranked, gear: { pocket1: "bandage" } }),
    "wolf",
    program,
  );
  // 40 − 7 = 33, and 25 + 2 × 5 = 35 back.
  assert.equal(stronger.exchanges[0].characterAction.characterHealth, 68);
  // Full before the fight: 100 − 7 = 93, and 93 + 25 stops at 100.
  const capped = resolveCombat(
    fighter({ health: 100, gear: { pocket1: "bandage" } }),
    "wolf",
    program,
  );
  assert.equal(capped.exchanges[0].characterAction.action.kind, "pressure");
  assert.equal(capped.exchanges[0].characterAction.characterHealth, 100);
});

test("at full health in a turn „Ucisk” is passed over for the next rule and uses up nothing", () => {
  // decision: D-144 "In one combat turn it gives back what „Opatrz” gives back with the same item, the bought ranks of „Mocniejszy zwój” included, never above full health, and at full health it is not carried out."
  const program = programFromRules(
    rule({ kind: "opponentHealthBelow", value: 8 }, PRESSURE),
    rule(ALWAYS, STRIKE),
  );
  const result = resolveCombat(
    fighter({
      health: 100,
      backpack: { bandage: 1 },
      gear: { mainHand: "stick", pocket1: "bandage" },
    }),
    "wolf",
    program,
  );
  // 93, 86, 79 with three strikes, the wolf at 6; it dodges, the bandage gives 79 + 25, stopped at 100;
  // it dodges again, and at 100 the strike comes in place of „Ucisk”.
  assert.equal(result.exchanges.length, 5);
  assert.deepEqual(result.exchanges[3].characterAction, {
    ruleId: 1,
    action: PRESSURE,
    refill: false,
    damage: 0,
    creatureHealth: 6,
    characterHealth: 100,
  });
  assert.deepEqual(result.exchanges[4].characterAction, {
    ruleId: 2,
    action: STRIKE,
    refill: false,
    damage: 6,
    creatureHealth: 0,
    characterHealth: 100,
  });
  assert.deepEqual(result.gear, { ...EMPTY_GEAR, mainHand: "stick" });
  assert.deepEqual(result.backpack, { ...NO_PIECES, bandage: 1 });
});

/**
 * A game of a mage that knows everything, sent to Las with the program [Zdrowie poniżej 50 → Ucisk —
 * Opatrunek; Zawsze → Kopnij], bought `skills`, and at minute 0 of its map run attacked by the wolf at
 * 40 health, a bandage in its first pocket and one in its backpack; the turns resolve in minute 1.
 */
function attacked(skills) {
  const created = createCharacter(
    withEdgeSolved(newKnowingGame()),
    "Ala",
  ).state;
  const skilled = {
    ...created,
    team: {
      ...created.team,
      characters: created.team.characters.map((character) => ({
        ...character,
        skills: { ...character.skills, ...skills },
      })),
    },
  };
  const program = programFromRules(
    rule(below(50), PRESSURE),
    rule(ALWAYS, KICK),
  );
  const sent = send(
    setProgram(skilled, program).state,
    { mapId, characterId: 1 },
    T0,
  ).state;
  const attack = { creatureId: "wolf", attackMinute: 0, resolveMinute: 1 };
  return {
    ...sent,
    run: {
      ...sent.run,
      body: { ...sent.run.body, health: 40 },
      character: {
        ...sent.run.character,
        backpack: { ...sent.run.character.backpack, bandage: 1 },
        gear: { ...sent.run.character.gear, pocket1: "bandage" },
      },
      current: null,
      activeCombat: attack,
      lastCombat: { ...attack, result: null },
    },
  };
}

test("without the bought branch a rule with „Ucisk” is passed over in the fight and reads „gałąź niewykupiona”; with it the rule acts and grows the tree", () => {
  // decision: D-126 "The simulation passes over a program rule whose condition, action or the target of either lies outside the character's repertoire to the next program rule"
  // decision: D-310 "The reason names the thing refused as the game writes it, in lower case and without a dot before the name, such as „tu nie leży mech”, „brakuje 4 × patyk”, „brak opału: patyk” and „brak energii natury: 7 z 10”, and the reason of a rule outside the repertoire is „gałąź niewykupiona”, as of a greyed cell of the rule panel, or „jeszcze nieodkryte: {name}”."
  // decision: D-150 "„Ucisk — {rzecz}” grows „Opatrywanie małych ran”"
  const unbought = attacked({ tending: { practice: 60, ranks: {} } });
  assert.deepEqual(ruleSigns(unbought).judgement.rules[1], {
    bar: "blocked",
    reason: "gałąź niewykupiona",
  });
  const passed = advanceMinutes(unbought, 1).state.run;
  assert.equal(
    passed.lastCombat.result.exchanges[0].characterAction.action.kind,
    "kick",
  );
  assert.equal(passed.character.gear.pocket1, "bandage");
  assert.equal(passed.practice.tending, undefined);

  const bought = attacked(BOUGHT);
  assert.deepEqual(ruleSigns(bought).judgement.rules[1], {
    bar: "go",
    reason: null,
  });
  const acted = advanceMinutes(bought, 1).state.run;
  assert.deepEqual(acted.lastCombat.result.exchanges[0].characterAction, {
    ruleId: 1,
    action: PRESSURE,
    refill: false,
    damage: 0,
    creatureHealth: 24,
    characterHealth: 58,
  });
  // „Ucisk” at 33 and at 44; at 48 no bandage is left, and the kick comes in its place.
  assert.equal(acted.practice.tending, 2);
});

/** The saved document, as the JSON text it becomes, of the game after the fight of `attacked`. */
function savedAfterTheFight() {
  const after = advanceMinutes(attacked(BOUGHT), 1).state;
  return JSON.parse(
    JSON.stringify(savedGame(withSaveTime(after, T0 + 60_000))),
  );
}

test("a saved game whose fight holds turns of „Ucisk”, one taking its bandage through a pocket from the backpack, loads with those turns as they were", () => {
  // decision: D-457 "That action then takes a fitting piece from the backpack into the slot itself and acts at once, with no time besides its own."
  const document = savedAfterTheFight();
  const turns = document.game.run.lastCombat.result.exchanges.map(
    (exchange) => exchange.characterAction,
  );
  // 40 → 33 and a bandage of the pocket → 58; 51 and a kick; 44 and a bandage from the backpack → 69.
  assert.deepEqual(turns[0], {
    ruleId: 1,
    action: PRESSURE,
    refill: false,
    damage: 0,
    creatureHealth: 24,
    characterHealth: 58,
  });
  assert.deepEqual(turns[2], {
    ruleId: 1,
    action: PRESSURE,
    refill: true,
    damage: 0,
    creatureHealth: 21,
    characterHealth: 69,
  });
  const loaded = loadSavedGame(document);
  assert.equal(loaded.ok, true);
  assert.deepEqual(
    loaded.state.run.lastCombat.result.exchanges,
    document.game.run.lastCombat.result.exchanges,
  );
});

test("a saved turn of „Ucisk” that deals damage or names an item with no healing, and „Ucisk” as an activity outside a fight, are refused as shape", () => {
  // decision: D-140 "Combat verbs can be carried out only in combat, and only they can be carried out in it, but for „Załóż” (D-458)."
  // decision: D-443 "An action is a verb with a target, and the targets a verb takes follow from the properties of the items in the game's data."
  const crafted = [
    [
      "a turn of „Ucisk” dealing 3",
      (game) => {
        game.run.lastCombat.result.exchanges[0].characterAction.damage = 3;
      },
    ],
    [
      "a turn of „Ucisk” on a stick",
      (game) => {
        game.run.lastCombat.result.exchanges[0].characterAction.action.item =
          "stick";
      },
    ],
    [
      "a turn of „Ucisk” with no target",
      (game) => {
        delete game.run.lastCombat.result.exchanges[0].characterAction.action
          .item;
      },
    ],
  ];
  const activity = (action) => (game) => {
    game.run.current = {
      activity: { kind: "rule", ruleId: 1, action },
      startMinute: game.run.minute,
      endMinute: game.run.minute + 1,
      stepTo: null,
    };
  };
  crafted.push(["„Ucisk” as the activity of a minute", activity(PRESSURE)]);
  for (const [name, change] of crafted) {
    const document = savedAfterTheFight();
    change(document.game);
    assert.deepEqual(
      loadSavedGame(document),
      { ok: false, reason: "shape" },
      name,
    );
  }
  // The control: „Opatrz” with the same bandage is an ordinary activity and loads.
  const document = savedAfterTheFight();
  activity({ kind: "tend", item: "bandage" })(document.game);
  assert.equal(loadSavedGame(document).ok, true);
});
