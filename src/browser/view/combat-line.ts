import { ACTIONS, type ActionDef } from "../sim/data/actions.js";
import { BALANCE } from "../sim/data/balance.js";
import { CONDITIONS, type ConditionDef } from "../sim/data/conditions.js";
import { CREATURES } from "../sim/data/creatures.js";
import { GEAR_PLACES, GEAR_SLOTS, WIELDING_SLOT } from "../sim/data/gear.js";
import { ITEMS } from "../sim/data/items.js";
import { RESOURCES } from "../sim/data/resources.js";
import type {
  CombatCharacterAction,
  Condition,
  LastCombat,
} from "../sim/types.js";

function capitalized(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * The words of the refill of an empty slot that a turn of combat takes its piece from (D-457): the
 * words of the place the action takes its piece from, the place of its item target for „Ucisk”, and
 * the main hand for a strike, which takes its stick from there (D-456). Used by the paragraph of an
 * encounter and by the chronicle alike, so they name the same place.
 */
export function refillWords(action: CombatCharacterAction["action"]): string {
  const def: ActionDef = ACTIONS[action.kind];
  const effect = def.combat;
  const place =
    effect !== undefined && "place" in effect
      ? effect.place
      : GEAR_SLOTS[WIELDING_SLOT];
  const row = GEAR_PLACES[place];
  if (!("refill" in row)) throw new Error(`the place ${place} has no refill`);
  return row.refill;
}

function conditionText(condition: Condition): string {
  const def: ConditionDef = CONDITIONS[condition.kind];
  if (!("value" in condition)) return def.label;
  const number = `${condition.value}${def.unit === undefined ? "" : ` ${def.unit}`}`;
  if (condition.kind === "hereBelow")
    return `${def.label} ${number} ${RESOURCES[condition.resource].name}`;
  if (condition.kind === "itemBelow")
    return `${def.label} ${number} ${ITEMS[condition.item].name}`;
  return `${def.label} ${number}`;
}

function creatureActionName(action: "strike" | "dodge"): string {
  return action === "strike" ? "Uderz" : ACTIONS.dodge.label;
}

function programText(creatureId: LastCombat["creatureId"]): string {
  const creature = CREATURES[creatureId];
  return creature.rules
    .map(
      (rule) =>
        `${conditionText(rule.condition)} → ${creatureActionName(rule.action.kind)}`,
    )
    .join("; ");
}

function actionText(combat: LastCombat): string[] {
  const result = combat.result;
  if (!result) return [];
  const creature = CREATURES[combat.creatureId];
  const lines = result.exchanges.flatMap((exchange) => {
    const actions: string[] = [];
    if (exchange.creatureAction.kind === "strike") {
      actions.push(
        `${capitalized(creature.name)} gryzie: −${exchange.creatureAction.damage}`,
      );
    } else {
      actions.push(`${capitalized(creature.name)} odskakuje`);
    }
    const character = exchange.characterAction;
    if (character) {
      // The refill of an empty slot is an element of its own, before the turn's action (D-457).
      if (character.refill)
        actions.push(`Mag ${refillWords(character.action)}`);
      if (character.action.kind === "dodge") {
        actions.push("Mag odskakuje");
      } else if (character.action.kind === "pressure") {
        // „Ucisk” gives the mage's own health after its turn, not the creature's (D-144, D-147).
        actions.push(
          `Mag ${ACTIONS.pressure.status.toLowerCase()}: zdrowie ${character.characterHealth}/${BALANCE.body.startHealth}`,
        );
      } else if (character.action.kind === "equip") {
        // „Załóż” has no creature health to show: it puts the piece on and takes the turn (D-458).
        actions.push(
          `Mag ${ACTIONS.equip.status.toLowerCase()} ${ITEMS[character.action.item].name}`,
        );
      } else {
        const action = ACTIONS[character.action.kind].status.toLowerCase();
        actions.push(
          `Mag ${action}: ${creature.name} ${character.creatureHealth}/${creature.health}`,
        );
      }
    }
    return actions;
  });
  const outcome =
    result.outcome === "creatureDefeated"
      ? `${capitalized(creature.name)} pokonany.`
      : result.outcome === "characterDied"
        ? "Mag zginął w walce."
        : `${capitalized(creature.name)} odszedł.`;
  return [...lines, outcome];
}

/** The last attack and its recorded result, formatted without rerunning the encounter. */
export function combatText(combat: LastCombat): string {
  const creature = CREATURES[combat.creatureId];
  const intro = `Napada ${creature.name} (${creature.health}/${creature.health}). ${capitalized(creature.name)}: ${programText(combat.creatureId)}.`;
  const actions = actionText(combat);
  return actions.length === 0 ? intro : `${intro} ${actions.join(" · ")}`;
}
