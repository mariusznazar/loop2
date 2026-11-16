import assert from "node:assert/strict";
import { test } from "node:test";
import { CREATURES } from "../../dist/browser/sim/data/creatures.js";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import { resolveCombat } from "../../dist/browser/sim/combat.js";
import { newMapRun } from "../../dist/browser/sim/run.js";
import { programFromRules } from "./program-fixture.mjs";

const mapId = "forest";
const map = MAPS[mapId];

function encounter(action, backpack = {}) {
  const program = programFromRules({
    condition: { kind: "always" },
    action: { kind: action },
  });
  const run = newMapRun(map, 1, program, { mapId, characterId: 1 }).run;
  return {
    run: {
      ...run,
      character: {
        ...run.character,
        backpack: { ...run.character.backpack, ...backpack },
      },
    },
    program,
  };
}

function runWithProgram(program, backpack = {}) {
  const run = newMapRun(map, 1, program, { mapId, characterId: 1 }).run;
  return {
    ...run,
    character: {
      ...run.character,
      backpack: { ...run.character.backpack, ...backpack },
    },
  };
}

test("four stick strikes defeat the wolf after three bites, leaving 79 health", () => {
  // decision: D-140 "Combat goes in turns, the sides exchanging one action each, and the side that attacked strikes first; the needs stand still during combat, and the whole combat costs a fixed number of game minutes"
  // decision: D-140 "A creature acts by pairs of condition and action kept in its data, of the same form as program rules, and an attack interrupts the action under way, which is lost"
  // decision: D-144 "The character uses „Uderz — patyk”, which requires a stick in the backpack and deals a base 6 damage increased by its bought branch ranks, „Kopnij”, which deals a base 3 damage increased by its bought branch ranks and needs neither an item nor a target, and „Odskocz”, which sets one pending reduction of a base 5 damage increased by its bought branch ranks for the next damaging enemy strike"
  // decision: D-144 "The wolf has 24 health and a strike of 7 damage, follows „Zdrowie poniżej 8 → Odskocz; Zawsze → Uderz”, and its dodge gives up its action with no protection"
  // decision: D-145 "A stick stays in the backpack after a strike"
  // decision: D-146 "The encounter ends immediately when either side reaches zero health: a creature at zero makes a beaten attack, and a character at zero dies of combat in the minute of the turns, before it can answer a lethal strike"
  // decision: D-151 "A side chooses its rule immediately before its action, with the creature using its ordered data pairs and the character using the ordered groups and repertoire of its program"
  const { run, program } = encounter("strikeWithStick", { stick: 1 });
  const runBefore = structuredClone(run);
  const programBefore = structuredClone(program);
  const mapBefore = structuredClone(map);
  const result = resolveCombat(run, "wolf", program);

  assert.equal(result.creatureHealth, 0);
  assert.equal(result.characterHealth, 79);
  assert.equal(result.outcome, "creatureDefeated");
  assert.equal(result.exchanges.length, 4);
  assert.equal(result.exchanges[3].creatureAction.kind, "dodge");
  assert.equal(result.ruleStarts[1], 4);
  assert.equal(run.body.health, 100);
  assert.equal(run.character.backpack.stick, 1);
  assert.deepEqual(run, runBefore);
  assert.deepEqual(program, programBefore);
  assert.deepEqual(map, mapBefore);
  assert.equal(CREATURES.wolf.health, 24);
});

test("eight kicks defeat the wolf after six bites, leaving 58 health", () => {
  // decision: D-140 "Combat goes in turns, the sides exchanging one action each, and the side that attacked strikes first; the needs stand still during combat, and the whole combat costs a fixed number of game minutes"
  // decision: D-140 "A creature acts by pairs of condition and action kept in its data, of the same form as program rules, and an attack interrupts the action under way, which is lost"
  // decision: D-144 "The character uses „Uderz — patyk”, which requires a stick in the backpack and deals a base 6 damage increased by its bought branch ranks, „Kopnij”, which deals a base 3 damage increased by its bought branch ranks and needs neither an item nor a target, and „Odskocz”, which sets one pending reduction of a base 5 damage increased by its bought branch ranks for the next damaging enemy strike"
  // decision: D-144 "The wolf has 24 health and a strike of 7 damage, follows „Zdrowie poniżej 8 → Odskocz; Zawsze → Uderz”, and its dodge gives up its action with no protection"
  // decision: D-146 "The encounter ends immediately when either side reaches zero health: a creature at zero makes a beaten attack, and a character at zero dies of combat in the minute of the turns, before it can answer a lethal strike"
  const { run, program } = encounter("kick");
  const result = resolveCombat(run, "wolf", program);

  assert.equal(result.creatureHealth, 0);
  assert.equal(result.characterHealth, 58);
  assert.equal(result.outcome, "creatureDefeated");
  assert.equal(result.exchanges.length, 8);
});

test("no feasible combat rule loses each action and the fifteenth bite kills", () => {
  // decision: D-144 "The wolf has 24 health and a strike of 7 damage, follows „Zdrowie poniżej 8 → Odskocz; Zawsze → Uderz”, and its dodge gives up its action with no protection"
  // decision: D-146 "The encounter ends immediately when either side reaches zero health: a creature at zero makes a beaten attack, and a character at zero dies of combat in the minute of the turns, before it can answer a lethal strike"
  // decision: D-146 "A character that finds no feasible combat rule gives up its action of that turn; every resolved encounter starts the cooldown again, and combat wounds leave the streak as it stands"
  const program = programFromRules();
  const run = runWithProgram(program);
  const result = resolveCombat(run, "wolf", program);

  assert.equal(result.outcome, "characterDied");
  assert.equal(result.characterHealth, 0);
  assert.equal(result.creatureHealth, 24);
  assert.equal(result.exchanges.length, 15);
  assert.ok(
    result.exchanges.every((exchange) => exchange.characterAction === null),
  );
  assert.deepEqual(result.ruleStarts, {});
});

test("a lethal opening strike ends the exchange before the character can act", () => {
  // decision: D-140 "Combat goes in turns, the sides exchanging one action each, and the side that attacked strikes first; the needs stand still during combat, and the whole combat costs a fixed number of game minutes"
  // decision: D-146 "The encounter ends immediately when either side reaches zero health: a creature at zero makes a beaten attack, and a character at zero dies of combat in the minute of the turns, before it can answer a lethal strike"
  const { run, program } = encounter("kick");
  const woundedRun = { ...run, body: { ...run.body, health: 7 } };
  const result = resolveCombat(woundedRun, "wolf", program);

  assert.equal(result.outcome, "characterDied");
  assert.equal(result.characterHealth, 0);
  assert.equal(result.exchanges.length, 1);
  assert.equal(result.exchanges[0].characterAction, null);
  assert.deepEqual(result.ruleStarts, {});
});

test("forty dodges use one refreshed reduction and leave the wolf at 15 health", () => {
  // decision: D-140 "Combat goes in turns, the sides exchanging one action each, and the side that attacked strikes first; the needs stand still during combat, and the whole combat costs a fixed number of game minutes"
  // decision: D-144 "The character uses „Uderz — patyk”, which requires a stick in the backpack and deals a base 6 damage increased by its bought branch ranks, „Kopnij”, which deals a base 3 damage increased by its bought branch ranks and needs neither an item nor a target, and „Odskocz”, which sets one pending reduction of a base 5 damage increased by its bought branch ranks for the next damaging enemy strike"
  // decision: D-144 "Another dodge refreshes that reduction"
  // decision: D-144 "The wolf has 24 health and a strike of 7 damage, follows „Zdrowie poniżej 8 → Odskocz; Zawsze → Uderz”, and its dodge gives up its action with no protection"
  // decision: D-146 "The current data limits an encounter to 40 combat turns, each an exchange with at most one action of each side; if both survive that limit the creature leaves and the attack remains unbeaten"
  const { run, program } = encounter("dodge");
  const result = resolveCombat(run, "wolf", program);

  assert.equal(result.outcome, "creatureDeparted");
  assert.equal(result.creatureHealth, 24);
  assert.equal(result.characterHealth, 15);
  assert.equal(result.exchanges.length, 40);
  assert.equal(result.exchanges[0].creatureAction.damage, 7);
  assert.ok(
    result.exchanges
      .slice(1)
      .every((exchange) => exchange.creatureAction.damage === 2),
  );
});

test("a stick strike without a stick is skipped in favor of the next combat rule", () => {
  // decision: D-92 "One firing of a program rule is the start of its action, so an action lasting many game minutes counts once, and in combat each turn in which the program rule starts a combat action adds one firing to that rule's count"
  // decision: D-144 "The character uses „Uderz — patyk”, which requires a stick in the backpack and deals a base 6 damage increased by its bought branch ranks, „Kopnij”, which deals a base 3 damage increased by its bought branch ranks and needs neither an item nor a target, and „Odskocz”, which sets one pending reduction of a base 5 damage increased by its bought branch ranks for the next damaging enemy strike"
  const program = programFromRules(
    { condition: { kind: "always" }, action: { kind: "strikeWithStick" } },
    { condition: { kind: "always" }, action: { kind: "kick" } },
  );
  const result = resolveCombat(runWithProgram(program), "wolf", program);

  assert.deepEqual(result.exchanges[0].characterAction, {
    ruleId: 2,
    action: { kind: "kick" },
    damage: 3,
    creatureHealth: 21,
    characterHealth: 93,
  });
  assert.deepEqual(result.ruleStarts, { 2: 8 });
});

test("ordinary actions cannot be carried out during combat", () => {
  // decision: D-140 "Combat verbs can be carried out only in combat, and only they can be carried out in it"
  const program = programFromRules({
    condition: { kind: "always" },
    action: { kind: "explore" },
  });
  const result = resolveCombat(runWithProgram(program), "wolf", program);

  assert.equal(result.exchanges[0].characterAction, null);
  assert.deepEqual(result.ruleStarts, {});
});

test("character health conditions are checked after the creature's strike", () => {
  // decision: D-20 "The program chooses again at the next free game minute, and before the character's action in each combat turn"
  // decision: D-92 "One firing of a program rule is the start of its action, so an action lasting many game minutes counts once, and in combat each turn in which the program rule starts a combat action adds one firing to that rule's count"
  // decision: D-151 "The condition „Zdrowie poniżej” compares the acting side’s current health points, and „Przeciwnik ma poniżej” compares its opponent’s current health points, with strict less-than comparison; both offer 0–100 in steps of 1, with defaults 50 and 10 respectively"
  // decision: D-151 "A side chooses its rule immediately before its action, with the creature using its ordered data pairs and the character using the ordered groups and repertoire of its program"
  const program = programFromRules({
    condition: { kind: "healthBelow", value: 94 },
    action: { kind: "kick" },
  });
  const result = resolveCombat(runWithProgram(program), "wolf", program);

  assert.equal(result.exchanges[0].creatureAction.characterHealth, 93);
  assert.equal(result.exchanges[0].characterAction.action.kind, "kick");
  assert.equal(result.ruleStarts[1], 8);
});

test("combat checks group conditions in order against post-strike health", () => {
  // decision: D-92 "One firing of a program rule is the start of its action, so an action lasting many game minutes counts once, and in combat each turn in which the program rule starts a combat action adds one firing to that rule's count"
  // decision: D-151 "The condition „Zdrowie poniżej” compares the acting side’s current health points, and „Przeciwnik ma poniżej” compares its opponent’s current health points, with strict less-than comparison; both offer 0–100 in steps of 1, with defaults 50 and 10 respectively"
  // decision: D-151 "A side chooses its rule immediately before its action, with the creature using its ordered data pairs and the character using the ordered groups and repertoire of its program"
  const always = { kind: "always" };
  const kick = { kind: "kick" };
  const program = {
    groups: [
      {
        id: 1,
        name: "Wounded",
        condition: { kind: "healthBelow", value: 94 },
        rules: [{ id: 11, condition: always, action: kick }],
      },
      {
        id: 2,
        name: "Fallback",
        condition: always,
        rules: [{ id: 22, condition: always, action: kick }],
      },
    ],
    nextGroupId: 3,
    nextRuleId: 23,
  };
  const result = resolveCombat(runWithProgram(program), "wolf", program);

  assert.equal(result.exchanges[0].characterAction.ruleId, 11);
  assert.equal(result.ruleStarts[11], 8);
  assert.equal(result.ruleStarts[22], undefined);
});

// Invariant program-rule-pick: a false group must be skipped, while a true
// earlier group wins. The first bite leaves 100 - 7 = 93 health.
// Sources: D-23, D-144.
test("combat skips a false first group and selects it when its condition holds", () => {
  // decision: D-151 "The condition „Zdrowie poniżej” compares the acting side’s current health points, and „Przeciwnik ma poniżej” compares its opponent’s current health points, with strict less-than comparison; both offer 0–100 in steps of 1, with defaults 50 and 10 respectively"
  // decision: D-151 "A side chooses its rule immediately before its action, with the creature using its ordered data pairs and the character using the ordered groups and repertoire of its program"
  for (const [threshold, expectedAction, expectedWolfHealth] of [
    [50, "kick", 21],
    [94, "dodge", 24],
  ]) {
    const program = {
      groups: [
        {
          id: 1,
          name: "Wounded",
          condition: { kind: "healthBelow", value: threshold },
          rules: [
            { id: 1, condition: { kind: "always" }, action: { kind: "dodge" } },
          ],
        },
        {
          id: 2,
          name: "Fallback",
          condition: { kind: "always" },
          rules: [
            { id: 2, condition: { kind: "always" }, action: { kind: "kick" } },
          ],
        },
      ],
      nextGroupId: 3,
      nextRuleId: 3,
    };
    const result = resolveCombat(runWithProgram(program), "wolf", program);
    const first = result.exchanges[0];
    assert.equal(first.creatureAction.characterHealth, 93);
    assert.equal(first.characterAction.action.kind, expectedAction);
    assert.equal(first.characterAction.creatureHealth, expectedWolfHealth);
  }
});

// Invariant program-rule-pick: a false rule passes to the next rule within the
// same group. The wolf still has 24 health before the character's first action.
// Sources: D-23, D-144.
test("combat skips a false first rule and selects it when its condition holds", () => {
  // decision: D-151 "The condition „Zdrowie poniżej” compares the acting side’s current health points, and „Przeciwnik ma poniżej” compares its opponent’s current health points, with strict less-than comparison; both offer 0–100 in steps of 1, with defaults 50 and 10 respectively"
  // decision: D-151 "A side chooses its rule immediately before its action, with the creature using its ordered data pairs and the character using the ordered groups and repertoire of its program"
  for (const [threshold, expectedAction, expectedWolfHealth] of [
    [10, "kick", 21],
    [25, "dodge", 24],
  ]) {
    const program = programFromRules(
      {
        condition: { kind: "opponentHealthBelow", value: threshold },
        action: { kind: "dodge" },
      },
      { condition: { kind: "always" }, action: { kind: "kick" } },
    );
    const result = resolveCombat(runWithProgram(program), "wolf", program);
    assert.equal(
      result.exchanges[0].characterAction.action.kind,
      expectedAction,
    );
    assert.equal(
      result.exchanges[0].characterAction.creatureHealth,
      expectedWolfHealth,
    );
  }
});
