import { ACTIONS } from "../sim/data/actions.js";
import { CONDITIONS } from "../sim/data/conditions.js";
import { CREATURES } from "../sim/data/creatures.js";
import { ITEMS } from "../sim/data/items.js";
import { RESOURCES } from "../sim/data/resources.js";
import type { Condition, LastCombat } from "../sim/types.js";

function capitalized(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function conditionText(condition: Condition): string {
  const label = CONDITIONS[condition.kind].label;
  if (!("value" in condition)) return label;
  if (condition.kind === "hereBelow")
    return `${label} ${condition.value} ${RESOURCES[condition.resource].name}`;
  if (condition.kind === "itemBelow")
    return `${label} ${condition.value} ${ITEMS[condition.item].name}`;
  return `${label} ${condition.value}`;
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
      if (character.action.kind === "dodge") {
        actions.push("Mag odskakuje");
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

export type CombatLine = {
  element: HTMLParagraphElement;
  update(combat: LastCombat | null): void;
};

/** Creates the wrapped encounter paragraph; null removes it from the visible flow. */
export function createCombatLine(): CombatLine {
  const element = document.createElement("p");
  element.className = "combat-line";
  element.hidden = true;
  return {
    element,
    update(combat): void {
      const text = combat ? combatText(combat) : "";
      element.hidden = text === "";
      if (element.textContent !== text) element.textContent = text;
    },
  };
}
