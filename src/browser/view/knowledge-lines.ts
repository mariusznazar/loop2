/**
 * The words and the lists of the screen Wiedza (D-416): the things of the Understanding in their
 * three groups, the counters, and the skill trees the player knows with their branches, the prices of
 * each rank and the line of the steps of a branch whose data give a number, all drawn from the data
 * and from what the Understanding holds. Nothing here draws or
 * changes anything; each function is pure and nothing runs when the module is imported.
 */
import { ACTIONS } from "../sim/data/actions.js";
import { CAMPFIRE } from "../sim/data/campfire.js";
import { CREATURES } from "../sim/data/creatures.js";
import { ITEMS } from "../sim/data/items.js";
import {
  BRANCHES,
  SKILLS,
  type BranchDef,
  type BranchId,
  type SkillId,
} from "../sim/data/skills.js";
import type { Understanding } from "../sim/types.js";
import { rankValue } from "./character-skills.js";
import { countedName } from "./counted-name.js";

/** One thing of the Understanding: what keys it in its list, its icon file and its name from the data. */
export type KnownThing = { key: string; icon: string; name: string };

/** A group of the left area: its heading with the number of its things, and the things. */
export type KnownGroup = { heading: string; things: KnownThing[] };

/** One step of a branch in its line of steps: „I”, „75 %”, „1 pkt”. */
export type KnownStep = { numeral: string; value: string; price: string };

/**
 * The line of steps of a branch whose data give a number (D-416): the value with no step bought,
 * „70 %”, and each step in turn with the value it gives and its price.
 */
export type KnownSteps = { without: string; steps: KnownStep[] };

/** One branch of a known tree, as the screen reads it. */
export type KnownBranch = {
  id: BranchId;
  name: string;
  /** „1 stopień”, „3 stopnie”, „5 stopni”. */
  steps: string;
  description: string;
  /** The price of each rank in turn, as „1 · 1 · 1 pkt”. */
  costs: string;
  /** The line of its steps, or null for a branch whose data give no number. */
  values: KnownSteps | null;
};

/** One known skill tree, as the screen reads it. */
export type KnownTree = {
  id: SkillId;
  name: string;
  /** „1 gałąź”, „3 gałęzie”, „5 gałęzi”. */
  branches: string;
  branchList: KnownBranch[];
};

/** The count with its noun in the form the count takes (D-416): „1 drzewo”, „3 drzewa”, „8 drzew”. */
function counted(
  count: number,
  one: string,
  few: string,
  many: string,
): string {
  return `${count} ${countedName(count, { one, few, many })}`;
}

/** „1 poznana rzecz”, „3 poznane rzeczy”, „13 poznanych rzeczy”. */
export function thingsCounter(count: number): string {
  return counted(count, "poznana rzecz", "poznane rzeczy", "poznanych rzeczy");
}

/** „1 drzewo”, „3 drzewa”, „8 drzew”. */
export function treesCounter(count: number): string {
  return counted(count, "drzewo", "drzewa", "drzew");
}

/** „1 gałąź”, „3 gałęzie”, „5 gałęzi”. */
export function branchesCounter(count: number): string {
  return counted(count, "gałąź", "gałęzie", "gałęzi");
}

/** „1 stopień”, „3 stopnie”, „5 stopni”. */
export function stepsCounter(count: number): string {
  return counted(count, "stopień", "stopnie", "stopni");
}

/**
 * The groups of the left area, each in the order of discovery, which is the order of the lists of
 * the Understanding, so the newest thing stands last; a group with no thing is left out. The
 * campfire stands among the items, as the Understanding records it. Names and icons come from the
 * data. Pure.
 */
export function knownGroups(understanding: Understanding): KnownGroup[] {
  const actions = understanding.actions.map((kind) => ({
    key: kind,
    icon: ACTIONS[kind].icon,
    name: ACTIONS[kind].label,
  }));
  const items = understanding.items.map((id) =>
    id === CAMPFIRE.id
      ? { key: id, icon: CAMPFIRE.icon, name: CAMPFIRE.name }
      : { key: id, icon: ITEMS[id].icon, name: ITEMS[id].name },
  );
  const creatures = understanding.creatures.map((id) => ({
    key: id,
    icon: CREATURES[id].icon,
    name: CREATURES[id].name,
  }));
  return [
    { heading: "Czynności", things: actions },
    { heading: "Przedmioty", things: items },
    { heading: "Stworzenia", things: creatures },
  ]
    .filter((group) => group.things.length > 0)
    .map((group) => ({
      heading: `${group.heading} · ${group.things.length}`,
      things: group.things,
    }));
}

/** The number of things the left area holds: actions, items and creatures together, no condition and no tree. Pure. */
export function knownThingCount(understanding: Understanding): number {
  return (
    understanding.actions.length +
    understanding.items.length +
    understanding.creatures.length
  );
}

/** The Roman numeral of a step, counted from 1: „I”, „II”, „III”, „IV”. Pure. */
function numeral(count: number): string {
  const marks: [string, number][] = [
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1],
  ];
  let rest = count;
  let text = "";
  for (const [mark, worth] of marks)
    while (rest >= worth) {
      text += mark;
      rest -= worth;
    }
  return text;
}

/**
 * The line of steps of a branch, from the same numbers of its data from which the screen Postać
 * writes „teraz → po kupnie” (D-199, D-416): the value with no step bought, then each step with the
 * value it gives and its price; null for a branch whose data give no number. Pure.
 */
function stepValues(branch: BranchDef): KnownSteps | null {
  const { preview, costs } = branch;
  if (preview === undefined) return null;
  return {
    without: rankValue(preview, 0),
    steps: costs.map((price, index) => ({
      numeral: numeral(index + 1),
      value: rankValue(preview, index + 1),
      price: `${price} pkt`,
    })),
  };
}

/**
 * The skill trees the Understanding holds, in the order of the data, which is the order of the
 * screen Postać; each with its branches in the order of the data, their names, descriptions and
 * prices from it. Pure.
 */
export function knownTrees(understanding: Understanding): KnownTree[] {
  return (Object.keys(SKILLS) as SkillId[])
    .filter((id) => understanding.trees.includes(id))
    .map((id) => {
      const branchList = (Object.keys(BRANCHES) as BranchId[])
        .filter((branch) => BRANCHES[branch].skill === id)
        .map((branch): KnownBranch => {
          const def: BranchDef = BRANCHES[branch];
          const { name, description, costs } = def;
          return {
            id: branch,
            name,
            steps: stepsCounter(costs.length),
            description,
            costs: `${costs.join(" · ")} pkt`,
            values: stepValues(def),
          };
        });
      return {
        id,
        name: SKILLS[id].name,
        branches: branchesCounter(branchList.length),
        branchList,
      };
    });
}
