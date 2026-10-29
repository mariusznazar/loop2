import assert from "node:assert/strict";
import { test } from "node:test";
import { CREATURES } from "../../dist/public/sim/data/creatures.js";
import { MAPS } from "../../dist/public/sim/data/maps.js";
import { resolveCombat } from "../../dist/public/sim/combat.js";
import { newMapRun } from "../../dist/public/sim/run.js";
import { programFromRules } from "./program-fixture.mjs";

const [mapId, map] = Object.entries(MAPS)[0];

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
  const { run, program } = encounter("strikeWithStick", { stick: 1 });
  const runBefore = structuredClone(run);
  const programBefore = structuredClone(program);
  const mapBefore = structuredClone(map);
  const result = resolveCombat(run, map, "wolf", program);

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
  const { run, program } = encounter("kick");
  const result = resolveCombat(run, map, "wolf", program);

  assert.equal(result.creatureHealth, 0);
  assert.equal(result.characterHealth, 58);
  assert.equal(result.outcome, "creatureDefeated");
  assert.equal(result.exchanges.length, 8);
});

test("no feasible combat rule loses each action and the fifteenth bite kills", () => {
  const program = programFromRules();
  const run = runWithProgram(program);
  const result = resolveCombat(run, map, "wolf", program);

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
  const { run, program } = encounter("kick");
  const woundedRun = { ...run, body: { ...run.body, health: 7 } };
  const result = resolveCombat(woundedRun, map, "wolf", program);

  assert.equal(result.outcome, "characterDied");
  assert.equal(result.characterHealth, 0);
  assert.equal(result.exchanges.length, 1);
  assert.equal(result.exchanges[0].characterAction, null);
  assert.deepEqual(result.ruleStarts, {});
});

test("forty dodges use one refreshed reduction and leave the wolf at 15 health", () => {
  const { run, program } = encounter("dodge");
  const result = resolveCombat(run, map, "wolf", program);

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
  const program = programFromRules(
    { condition: { kind: "always" }, action: { kind: "strikeWithStick" } },
    { condition: { kind: "always" }, action: { kind: "kick" } },
  );
  const result = resolveCombat(runWithProgram(program), map, "wolf", program);

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
  const program = programFromRules({
    condition: { kind: "always" },
    action: { kind: "explore" },
  });
  const result = resolveCombat(runWithProgram(program), map, "wolf", program);

  assert.equal(result.exchanges[0].characterAction, null);
  assert.deepEqual(result.ruleStarts, {});
});

test("character health conditions are checked after the creature's strike", () => {
  const program = programFromRules({
    condition: { kind: "healthBelow", value: 94 },
    action: { kind: "kick" },
  });
  const result = resolveCombat(runWithProgram(program), map, "wolf", program);

  assert.equal(result.exchanges[0].creatureAction.characterHealth, 93);
  assert.equal(result.exchanges[0].characterAction.action.kind, "kick");
  assert.equal(result.ruleStarts[1], 8);
});

test("combat checks group conditions in order against post-strike health", () => {
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
  const result = resolveCombat(runWithProgram(program), map, "wolf", program);

  assert.equal(result.exchanges[0].characterAction.ruleId, 11);
  assert.equal(result.ruleStarts[11], 8);
  assert.equal(result.ruleStarts[22], undefined);
});
