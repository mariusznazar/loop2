import { tendedBody } from "./body.js";
import { ACTIONS, type ActionDef } from "./data/actions.js";
import { BALANCE } from "./data/balance.js";
import { CREATURES, type CreatureAction } from "./data/creatures.js";
import {
  chooseCombatRule,
  combatItem,
  combatPiece,
  conditionHolds,
  equipped,
  healsInCombat,
  type RunView,
} from "./program.js";
import { healingOf, practiced, skillBonus } from "./skills.js";
import type {
  Body,
  CharacterSkills,
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
 * The character before `action`: where the action uses an item and none of its slots holds it, with
 * one piece of it taken from the backpack into the first empty one of them (D-457), and whether it
 * was; otherwise the very character. The piece of a strike stays in the hand after it (D-145).
 */
function withPiece(
  character: RunCharacter,
  action: CombatCharacterAction["action"],
): { character: RunCharacter; refill: boolean } {
  const item = combatItem(action);
  const piece = combatPiece(character, action);
  if (item === null || piece === null || !piece.refill)
    return { character, refill: false };
  return {
    character: {
      ...character,
      backpack: { ...character.backpack, [item]: character.backpack[item] - 1 },
      gear: { ...character.gear, [piece.slot]: item },
    },
    refill: true,
  };
}

/**
 * A turn of an action that heals by its target, „Ucisk — {rzecz}” (D-144): the piece of the first slot
 * of its place that holds the item, or one taken there from the backpack in the same turn, used up,
 * and the health it gives back to `body`, the body at the health of the turn, as „Opatrz” gives it
 * with the same item and the character's skills, never above full health.
 */
function healed(
  character: RunCharacter,
  action: CombatCharacterAction["action"],
  body: Body,
  skills: CharacterSkills,
): { character: RunCharacter; refill: boolean; health: number } {
  const item = combatItem(action);
  const taken = withPiece(character, action);
  const piece = combatPiece(taken.character, action);
  if (item === null || piece === null)
    throw new Error("combat: selected healing has no piece to use");
  return {
    character: {
      ...taken.character,
      gear: { ...taken.character.gear, [piece.slot]: null },
    },
    refill: taken.refill,
    health: tendedBody(body, healingOf(skills, item)).health,
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
    const action = { ...rule.action } as CombatCharacterAction["action"];

    let damage = 0;
    let refill = false;
    if (action.kind === "equip") {
      // „Załóż” takes the turn and changes the gear and the backpack at once: no damage, no practice.
      const put = equipped(character, action.item);
      if (put === null)
        throw new Error("combat: selected equip cannot be carried out");
      character = { ...character, ...put };
    } else if (healsInCombat(action.kind)) {
      // „Ucisk” uses up its piece and gives back health: no damage, one practice of its tree.
      const turn = healed(
        character,
        action,
        { ...run.body, health: characterHealth },
        run.character.skills,
      );
      character = turn.character;
      refill = turn.refill;
      characterHealth = turn.health;
      practice = practiced(
        practice,
        action.kind,
        combatItem(action) ?? undefined,
      );
    } else {
      const effect = (ACTIONS[action.kind] as ActionDef).combat;
      if (!effect || "heals" in effect)
        throw new Error("combat: selected action has no combat effect");
      const armed = withPiece(character, action);
      character = armed.character;
      refill = armed.refill;
      if ("damage" in effect) {
        damage =
          effect.damage +
          skillBonus(run.character.skills, "damage", action.kind);
        if (damage > 0) practice = practiced(practice, action.kind);
        creatureHealth = Math.max(0, creatureHealth - damage);
      } else {
        pendingReduction =
          effect.reducesNextDamageBy +
          skillBonus(run.character.skills, "reduction");
      }
    }
    const characterAction: CombatCharacterAction = {
      ruleId: rule.id,
      action,
      refill,
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
