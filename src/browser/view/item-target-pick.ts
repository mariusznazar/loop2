import {
  ACTIONS,
  NATURE_ENERGY_NAME,
  type ActionDef,
} from "../sim/data/actions.js";
import { ITEMS } from "../sim/data/items.js";
import {
  itemTargets,
  takesItem,
  type ItemAction,
} from "../sim/action-targets.js";
import { actionPrice, type ActionPrice } from "../sim/program.js";
import { actionMinutes } from "../sim/skills.js";
import { editorRepertoire } from "../sim/understanding.js";
import type { Action, GameState, ItemId } from "../sim/types.js";

import { countedName } from "./counted-name.js";
import type { PickCell } from "./program-editor.js";

/** A resource or an item named in the player's words: its name from the data, capitalised. */
export function targetName(name: string): string {
  return name.charAt(0).toLocaleUpperCase("pl") + name.slice(1);
}

/** Whether an action names an item as its target, as the data of its kind say („Wytwórz”, „Opatrz”). */
export function namesItem(action: Action): action is ItemAction {
  return takesItem(action.kind);
}

/**
 * A price as the player reads it, after an action's name (D-363): the pieces it uses up, then the
 * nature energy, each with its name in the form its count takes — „6 patyków”, „2 patyki, 10 energii
 * natury”. Null for a price that takes nothing.
 */
export function priceText(price: ActionPrice): string | null {
  const parts = price.pieces.map(({ item, count }) => {
    const { name, plural } = ITEMS[item];
    return `${count} ${countedName(count, { one: name, ...plural })}`;
  });
  if (price.natureEnergy > 0)
    parts.push(
      `${price.natureEnergy} ${countedName(price.natureEnergy, NATURE_ENERGY_NAME)}`,
    );
  return parts.length === 0 ? null : parts.join(", ");
}

/**
 * The items the Understanding holds that a kind of action takes as its target, in the data's order:
 * those whose row holds the property the kind's row names. Empty for a kind that takes none.
 */
export function knownTargets(state: GameState, kind: Action["kind"]): ItemId[] {
  const { items } = editorRepertoire(state);
  return itemTargets(kind).filter((id) => items.includes(id));
}

/**
 * The time one making of a target takes, as the pick shows it beside the target's cell: the minutes
 * of the property of the target's row that the action's row names, during a map run as the
 * simulation gives them for the character of the map run. Null for an action whose time is its
 * own, which stands beside the action itself.
 */
export function itemTargetTime(
  state: GameState,
  kind: Action["kind"],
  item: ItemId,
): string | null {
  const minutes = (ACTIONS[kind] as ActionDef).minutes;
  if (minutes === null || typeof minutes !== "object") return null;
  const base = ITEMS[item][minutes.fromTarget]?.minutes;
  if (base === undefined) return null;
  const run = state.run;
  return `${run ? actionMinutes(base, kind, run.character.skills) : base} min`;
}

/**
 * The pick of the target of an action that names an item: the targets the Understanding holds, in the
 * data's order, and the held target where it does not, greyed. Each cell is the item's name,
 * capitalised, with its price in brackets, as the action takes it. Pure.
 */
export function itemTargetPick(
  state: GameState,
  held: ItemAction,
): PickCell<ItemId>[] {
  const known = knownTargets(state, held.kind);
  const skills = state.run?.character.skills ?? {};
  return (Object.keys(ITEMS) as ItemId[])
    .filter((id) => id === held.item || known.includes(id))
    .map((id) => {
      const price = priceText(actionPrice(held.kind, skills, id));
      const name = targetName(ITEMS[id].name);
      return {
        value: id,
        label: price === null ? name : `${name} (${price})`,
        chosen: id === held.item,
        greyed: !known.includes(id),
        reason: null,
      };
    });
}
