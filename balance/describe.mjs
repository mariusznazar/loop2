// The description of a program in the words the game shows the player: the labels of its conditions
// and actions, the names of its resources and items, the numbers with their units, all taken from the
// game's data at the time of the call, so an overlay that renames or adds one is described as the
// game would show it. The structure words around them are the instrument's own and are English.
// A program of the game's shape (src/browser/sim/types.ts) comes in; Markdown text goes out.

import { ACTIONS } from "../dist/browser/sim/data/actions.js";
import { CONDITIONS } from "../dist/browser/sim/data/conditions.js";
import { ITEMS } from "../dist/browser/sim/data/items.js";
import { RESOURCES } from "../dist/browser/sim/data/resources.js";

/** The definition of a kind in a table of the data, or an error naming what the data lacks. */
function definitionOf(table, what, kind) {
  if (!Object.hasOwn(table, kind))
    throw new Error(`describe: the data holds no ${what} ${kind}`);
  return table[kind];
}

/** The name the game shows for an item or a resource of the data. */
function nameOf(table, what, id) {
  return definitionOf(table, what, id).name;
}

/**
 * The condition as the game words it: the label, then the number with its unit, or the number with
 * the item or the resource it counts, as the program editor shows it.
 */
function conditionText(condition) {
  const definition = definitionOf(CONDITIONS, "condition", condition.kind);
  const { label } = definition;
  if (condition.item !== undefined)
    return `${label} ${condition.value} × ${nameOf(ITEMS, "item", condition.item)}`;
  if (condition.resource !== undefined)
    return `${label} ${condition.value} × ${nameOf(RESOURCES, "resource", condition.resource)}`;
  if (condition.value === undefined) return label;
  return definition.unit
    ? `${label} ${condition.value} ${definition.unit}`
    : `${label} ${condition.value}`;
}

/** A name of the data with its first letter capital, as the game shows the target of an action. */
function capitalized(name) {
  return name.charAt(0).toLocaleUpperCase("pl") + name.slice(1);
}

/**
 * The action as the game words it: the label, and the resource or the item it names where it names
 * one; an item stands with its name capital, as the game shows an item target („Wytwórz —
 * Opatrunek”). An item the data lack is an error naming it.
 */
function actionText(action) {
  const { label } = definitionOf(ACTIONS, "action", action.kind);
  if (action.item !== undefined)
    return `${label} — ${capitalized(nameOf(ITEMS, "item", action.item))}`;
  return action.resource === undefined
    ? label
    : `${label} — ${nameOf(RESOURCES, "resource", action.resource)}`;
}

/** The entries of a trip plan list as `count × name`, or `nothing` for an empty list. */
function tripText(entries) {
  if (entries.length === 0) return "nothing";
  return entries
    .map(({ item, count }) => `${count} × ${nameOf(ITEMS, "item", item)}`)
    .join(", ");
}

/** `count word` with the plural `s` where the count is not 1. */
function counted(count, word) {
  return `${count} ${word}${count === 1 ? "" : "s"}`;
}

/**
 * One program as Markdown under the name it is known by: its size and trip plan, then each rule
 * group with its condition and its rules numbered through the whole program, in the order the game
 * runs them.
 */
export function describeProgram(name, program) {
  const ruleTotal = program.groups.reduce(
    (sum, group) => sum + group.rules.length,
    0,
  );
  const lines = [
    `**${name}** — ${counted(ruleTotal, "rule")} in ${counted(program.groups.length, "group")}. ` +
      `Take: ${tripText(program.tripPlan.take)}. Bring: ${tripText(program.tripPlan.bring)}.`,
    "",
  ];
  let number = 1;
  for (const group of program.groups) {
    lines.push(
      `- Group "${group.name}" — when: ${conditionText(group.condition)}`,
    );
    for (const rule of group.rules) {
      lines.push(
        `    ${number}. ${conditionText(rule.condition)} → ${actionText(rule.action)}`,
      );
      number += 1;
    }
  }
  return lines.join("\n");
}

/**
 * The neutral label of each program of `registry` (identifier to program): `P1` for the first, `P2`
 * for the second, in the order of the registry. The map check names a program by this label, because
 * an identifier can state the rules of its program in other words (D-428).
 */
export function programLabels(registry) {
  return Object.fromEntries(
    Object.keys(registry).map((id, index) => [id, `P${index + 1}`]),
  );
}

/**
 * Every program of `registry` (identifier to program) described, one after another, each headed by
 * its neutral label and its identifier, so the list is the key from a label of the table to a program.
 */
export function describePrograms(registry) {
  const labels = programLabels(registry);
  return (
    Object.entries(registry)
      .map(([id, program]) => describeProgram(`${labels[id]} ${id}`, program))
      .join("\n\n") + "\n"
  );
}
