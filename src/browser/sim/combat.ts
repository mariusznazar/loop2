import { ACTIONS, type ActionDef } from "./data/actions.js";
import { BALANCE } from "./data/balance.js";
import { CREATURES, type CreatureAction } from "./data/creatures.js";
import type { MapDef } from "./data/maps.js";
import { conditionHolds, chooseCombatRule } from "./program.js";
import { practiced, skillBonus } from "./skills.js";
import type {
  CombatCharacterAction,
  CombatCreatureAction,
  CombatExchange,
  CombatResult,
  CreatureId,
  MapRun,
  Program,
  Practice,
} from "./types.js";

function chooseCreatureAction(
  run: MapRun,
  map: MapDef,
  creatureId: CreatureId,
  health: number,
  opponentHealth: number,
): CreatureAction {
  const creature = CREATURES[creatureId];
  const context = { health, opponentHealth };
  const selected = creature.rules.find((rule) =>
    conditionHolds(run, map, rule.condition, context),
  );
  if (!selected)
    throw new Error(`combat: ${creatureId} has no applicable rule`);
  return selected.action;
}

/** Resolves one encounter without changing the run, program, map or creature data. */
export function resolveCombat(
  run: MapRun,
  map: MapDef,
  creatureId: CreatureId,
  program: Program,
): CombatResult {
  const creature = CREATURES[creatureId];
  let characterHealth: number = run.body.health;
  let creatureHealth: number = creature.health;
  let pendingReduction = 0;
  let practice: Practice = {};
  const exchanges: CombatExchange[] = [];
  const ruleStarts: Record<number, number> = {};

  for (
    let turn = 0;
    turn < BALANCE.combatTurns && characterHealth > 0 && creatureHealth > 0;
    turn += 1
  ) {
    const enemyAction = chooseCreatureAction(
      run,
      map,
      creatureId,
      creatureHealth,
      characterHealth,
    );
    let creatureRecord: CombatCreatureAction;
    if (enemyAction.kind === "strike") {
      const damage = Math.max(0, creature.strikeDamage - pendingReduction);
      if (damage < creature.strikeDamage)
        practice = practiced(practice, "dodge");
      pendingReduction = 0;
      characterHealth = Math.max(0, characterHealth - damage);
      creatureRecord = { kind: "strike", damage, characterHealth };
    } else {
      creatureRecord = { kind: "dodge" };
    }

    if (characterHealth === 0) {
      exchanges.push({ creatureAction: creatureRecord, characterAction: null });
      break;
    }

    const rule = chooseCombatRule(
      run,
      map,
      program,
      characterHealth,
      creatureHealth,
    );
    if (!rule) {
      exchanges.push({ creatureAction: creatureRecord, characterAction: null });
      continue;
    }

    ruleStarts[rule.id] = (ruleStarts[rule.id] ?? 0) + 1;
    const effect = (ACTIONS[rule.action.kind] as ActionDef).combat;
    if (!effect)
      throw new Error("combat: selected action has no combat effect");

    let damage = 0;
    if ("damage" in effect) {
      damage =
        effect.damage +
        skillBonus(run.character.skills, "damage", rule.action.kind);
      if (damage > 0) practice = practiced(practice, rule.action.kind);
      creatureHealth = Math.max(0, creatureHealth - damage);
    } else {
      pendingReduction =
        effect.reducesNextDamageBy +
        skillBonus(run.character.skills, "reduction");
    }
    const characterAction: CombatCharacterAction = {
      ruleId: rule.id,
      action: { ...rule.action } as CombatCharacterAction["action"],
      damage,
      creatureHealth,
      characterHealth,
    };
    exchanges.push({ creatureAction: creatureRecord, characterAction });
  }

  const outcome =
    characterHealth === 0
      ? "characterDied"
      : creatureHealth === 0
        ? "creatureDefeated"
        : "creatureDeparted";
  return {
    characterHealth,
    creatureHealth,
    outcome,
    exchanges,
    ruleStarts,
    practice,
  };
}
