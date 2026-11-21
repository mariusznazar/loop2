import { ACTIONS, type ActionDef } from "./data/actions.js";
import { ITEMS } from "./data/items.js";
import type { Action, ItemId } from "./types.js";

/** An action that names an item as its target. */
export type ItemAction = Extract<Action, { item: ItemId }>;

/**
 * Whether a kind of action takes an item as its target, as the data of the actions say: the row of
 * the kind names the property of the items' rows that gives it its targets. Read from the table at
 * each call.
 */
export function takesItem(kind: Action["kind"]): kind is ItemAction["kind"] {
  return (ACTIONS[kind] as ActionDef).itemTargets !== undefined;
}

/**
 * The items a kind of action takes as its target: the items of the data, in the data's order, whose
 * row holds the property the action's row names; none for a kind that takes no item. Read from the
 * tables at each call, never kept from the load, so a table the balance instrument lays over the
 * data is read too.
 */
export function itemTargets(kind: Action["kind"]): ItemId[] {
  const targets = (ACTIONS[kind] as ActionDef).itemTargets;
  if (targets === undefined) return [];
  return (Object.keys(ITEMS) as ItemId[]).filter(
    (id) => ITEMS[id][targets.property] !== undefined,
  );
}
