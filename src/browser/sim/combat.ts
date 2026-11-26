import { ACTIONS, type ActionDef } from "./data/actions.js";
import { BALANCE } from "./data/balance.js";
import { CREATURES, type CreatureAction } from "./data/creatures.js";
import { WIELDING_SLOT } from "./data/gear.js";
import {
  chooseCombatRule,
  combatItem,
  combatPiece,
  conditionHolds,
  type RunView,
} from "./program.js";
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
  RunCharacter,
} from "./types.js";

function chooseCreatureAction(
  run: RunView,
  creatureId: CreatureId,
  health: number,
  opponentHealth: number,
): CreatureAction {
  const creature = CREATURES[creatureId];
  const context = { health, opponentHealth };
  const selected = creature.rules.find((rule) =>
    conditionHolds(run, rule.condition, context),
  );
  if (!selected)
    throw new Error(`combat: ${creatureId} has no applicable rule`);
  return selected.action;
}

/**
 * The character before an action of `kind`: where the action uses an item and the main hand is empty,
 * with one piece of it taken from the backpack into the hand (D-457), and whether it was; otherwise
 * the very character. The piece in the hand stays there after the action (D-145).
 */
function wielding(
  character: RunCharacter,
  kind: CombatCharacterAction["action"]["kind"],
): { character: RunCharacter; refill: boolean } {
  const item = combatItem(kind);
  if (item === null || combatPiece(character, item) !== "refill")
    return { character, refill: false };
  return {
    character: {
      ...character,
      backpack: { ...character.backpack, [item]: character.backpack[item] - 1 },
      gear: { ...character.gear, [WIELDING_SLOT]: item },
    },
    refill: true,
  };
}

/**
 * Resolves one encounter without changing the run, program or creature data. The turns read the
 * character's gear and backpack as the turns before left them, and the result gives both after the
 * fight.
 */
export function resolveCombat(
  run: MapRun,
  creatureId: CreatureId,
  program: Program,
): CombatResult {
  const creature = CREATURES[creatureId];
  let characterHealth: number = run.body.health;
  let creatureHealth: number = creature.health;
  let pendingReduction = 0;
  let practice: Practice = {};
  let character: RunCharacter = run.character;
  const exchanges: CombatExchange[] = [];
  const ruleStarts: Record<number, number> = {};

  for (
    let turn = 0;
    turn < BALANCE.combatTurns && characterHealth > 0 && creatureHealth > 0;
    turn += 1
  ) {
    const view: RunView = { ...run, character };
    const enemyAction = chooseCreatureAction(
      view,
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
      view,
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
    const action = { ...rule.action } as CombatCharacterAction["action"];
    const armed = wielding(character, action.kind);
    character = armed.character;

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
      action,
      refill: armed.refill,
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
    gear: { ...character.gear },
    backpack: { ...character.backpack },
  };
}
