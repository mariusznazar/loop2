import { ACTION_GROUPS, ACTIONS, type ActionDef } from "../sim/data/actions.js";
import {
  CONDITION_SECTIONS,
  CONDITIONS,
  type ConditionDef,
} from "../sim/data/conditions.js";
import { ITEMS } from "../sim/data/items.js";
import { MAPS } from "../sim/data/maps.js";
import { RESOURCES } from "../sim/data/resources.js";
import {
  conditionNumber,
  onStep,
  type ConditionNumber,
} from "../sim/program.js";
import { actionMinutes } from "../sim/skills.js";
import {
  BRANCH_NOT_BOUGHT,
  editorRepertoire,
  knownRepertoire,
} from "../sim/understanding.js";
import type {
  Action,
  Condition,
  GameState,
  GroupId,
  ItemId,
  Program,
  ProgramRule,
  ResourceId,
  RuleGroup,
} from "../sim/types.js";
import { sendMaps } from "./map-lines.js";

type ConditionKind = Condition["kind"];
type ActionKind = Action["kind"];

/** Append an empty group; its number is never reused after deletion or rename. */
export function addGroup(program: Program): Program {
  return {
    ...program,
    nextGroupId: program.nextGroupId + 1,
    groups: [
      ...program.groups,
      {
        id: program.nextGroupId,
        name: `Grupa ${program.nextGroupId}`,
        condition: { kind: "always" },
        rules: [],
      },
    ],
  };
}

export function renameGroup(
  program: Program,
  id: GroupId,
  name: string,
): Program | null {
  const group = program.groups.find((each) => each.id === id);
  if (!group || group.name === name) return null;
  return {
    ...program,
    groups: program.groups.map((each) =>
      each.id === id ? { ...each, name } : each,
    ),
  };
}

export function removeGroup(program: Program, id: GroupId): Program | null {
  if (!program.groups.some((group) => group.id === id)) return null;
  return {
    ...program,
    groups: program.groups.filter((group) => group.id !== id),
  };
}

/** Resolve the destination after removal: a rule target means before it, a group means append. */
export function dropRule(
  program: Program,
  ruleId: number,
  groupId: GroupId,
  beforeId?: number,
): Program | null {
  const source = program.groups.find((group) =>
    group.rules.some((rule) => rule.id === ruleId),
  );
  const target = program.groups.find((group) => group.id === groupId);
  if (
    !source ||
    !target ||
    beforeId === ruleId ||
    (beforeId !== undefined &&
      !target.rules.some((rule) => rule.id === beforeId))
  )
    return null;
  const rule = source.rules.find((each) => each.id === ruleId)!;
  const removed = replaceRules(
    program,
    source.id,
    source.rules.filter((each) => each.id !== ruleId),
  );
  const rules = [
    ...removed.groups.find((group) => group.id === groupId)!.rules,
  ];
  const at =
    beforeId === undefined
      ? rules.length
      : rules.findIndex((each) => each.id === beforeId);
  rules.splice(at, 0, rule);
  return replaceRules(removed, groupId, rules);
}
/**
 * An action that names a resource of the map: „Idź” and „Zbierz”. Every other action names
 * nothing — „Idź — ognisko” and the actions on the campfire and the backpack among them, whose
 * campfire and pieces the simulation picks — so the editor offers it without a target.
 */
type ResourceAction = Extract<Action, { resource: ResourceId }>;

const RESOURCE_ACTION_KINDS: readonly ActionKind[] = [
  "walkTo",
  "gather",
  "patrol",
];

function takesResource(kind: ActionKind): kind is ResourceAction["kind"] {
  return RESOURCE_ACTION_KINDS.includes(kind);
}

function namesResource(action: Action): action is ResourceAction {
  return takesResource(action.kind);
}

/** The control that recovers focus after a group or rule is added, moved or removed. */
export type FocusTarget =
  | {
      groupId: GroupId;
      row: number;
      control: "condition" | "up" | "down" | "remove";
    }
  | { groupId: GroupId; control: "add" }
  | {
      groupId: GroupId;
      control: "group-name" | "group-up" | "group-down" | "group-remove";
    }
  | { control: "add-group" };

/** An edit that changes the rows: „Dodaj regułę”, „Usuń”, „↑”, „↓”. */
export type StructuralEdit = "add" | "remove" | "up" | "down";

/**
 * The action kinds the action selects offer, in the data's order: those of the repertoire, less
 * „Idź” and „Zbierz” while no resource is offered for them to name. Pure.
 */
export function offeredActionKinds(state: GameState): ActionKind[] {
  const { actions } = editorRepertoire(state);
  const named = offeredResources(state).length > 0;
  return (Object.keys(ACTIONS) as ActionKind[]).filter(
    (kind) => actions.includes(kind) && (named || !takesResource(kind)),
  );
}

/**
 * The items „Zapas poniżej” offers, in the data's order: the repertoire's items of the backpack,
 * bound to no map, since an item can reach the backpack from elsewhere than the map's tiles. The
 * campfire is no item of the backpack. Pure.
 */
export function offeredItems(state: GameState): ItemId[] {
  const { items } = editorRepertoire(state);
  return (Object.keys(ITEMS) as ItemId[]).filter((id) => items.includes(id));
}

/**
 * The resources the resource selects offer, in the map's order: those of the run's map during a map
 * run, otherwise of the first map of the list of maps (`sendMaps`), that the repertoire holds as
 * items. Pure.
 */
export function offeredResources(state: GameState): ResourceId[] {
  const mapId = state.run ? state.run.mapId : sendMaps()[0];
  if (mapId === undefined) return [];
  const { items } = editorRepertoire(state);
  return MAPS[mapId].resources
    .map((resource) => resource.id)
    .filter((id) => items.includes(id));
}

/**
 * The number field's commit rule, by the number the rule's condition kind takes: text holding no
 * finite number keeps the previous value and commits nothing; otherwise the number is rounded to
 * the kind's step, clamped to its range and kept as the decimal the program check keeps, and
 * committed when it differs from the previous value. `value` is what the field shows.
 */
export function readNumberField(
  text: string,
  previous: number,
  number: ConditionNumber,
): { value: number; commit: boolean } {
  const parsed = text.trim() === "" ? Number.NaN : Number(text);
  if (!Number.isFinite(parsed)) return { value: previous, commit: false };
  const value = Math.min(
    number.max,
    Math.max(number.min, onStep(parsed, number)),
  );
  return { value, commit: value !== previous };
}

/** The program with only the named group's rules replaced. */
function replaceRules(
  program: Program,
  groupId: GroupId,
  rules: ProgramRule[],
): Program {
  return {
    ...program,
    groups: program.groups.map((group) =>
      group.id === groupId ? { ...group, rules } : group,
    ),
  };
}

/** The program with one rule replaced; the input and rule identity are kept. */
function replaceRule(
  program: Program,
  groupId: GroupId,
  index: number,
  rule: ProgramRule,
): Program {
  const group = program.groups.find((each) => each.id === groupId)!;
  return replaceRules(
    program,
    groupId,
    group.rules.map((each, at) => (at === index ? rule : each)),
  );
}

/** „Dodaj regułę”: append „Zawsze → Eksploruj” to the named group with a fresh identity. */
export function addRule(program: Program, groupId: GroupId): Program | null {
  const group = program.groups.find((each) => each.id === groupId);
  if (!group) return null;
  return {
    ...replaceRules(program, groupId, [
      ...group.rules,
      {
        id: program.nextRuleId,
        condition: { kind: "always" },
        action: { kind: "explore" },
      },
    ]),
    nextRuleId: program.nextRuleId + 1,
  };
}

/** „Usuń”: remove only the rule at `index` in the named group. */
export function removeRule(
  program: Program,
  groupId: GroupId,
  index: number,
): Program | null {
  const group = program.groups.find((each) => each.id === groupId);
  if (!group?.rules[index]) return null;
  return replaceRules(
    program,
    groupId,
    group.rules.filter((_, at) => at !== index),
  );
}

/**
 * „↑” or „↓” on the rule at `index` of the named group: a swap with its neighbour in the group, and
 * at the group's edge the move across it — „↓” on the last rule to the start of the next group, „↑”
 * on the first to the end of the previous one (D-297). Null only where there is no group to move
 * to: „↑” on the program's first rule and „↓” on its last.
 */
export function moveRule(
  program: Program,
  groupId: GroupId,
  index: number,
  offset: -1 | 1,
): Program | null {
  const at = program.groups.findIndex((each) => each.id === groupId);
  const group = program.groups[at];
  if (!group || index < 0 || index >= group.rules.length) return null;
  const other = index + offset;
  if (other >= 0 && other < group.rules.length) {
    const rules = [...group.rules];
    [rules[index], rules[other]] = [rules[other], rules[index]];
    return replaceRules(program, groupId, rules);
  }
  const neighbour = program.groups[at + offset];
  if (!neighbour) return null;
  const rule = group.rules[index];
  return replaceRules(
    replaceRules(
      program,
      groupId,
      group.rules.filter((_, each) => each !== index),
    ),
    neighbour.id,
    offset === 1 ? [rule, ...neighbour.rules] : [...neighbour.rules, rule],
  );
}

/** Whether „↑” and „↓” of the rule at `index` of the named group act: off only at the program's ends. */
export function ruleArrows(
  program: Program,
  groupId: GroupId,
  index: number,
): { up: boolean; down: boolean } {
  return {
    up: moveRule(program, groupId, index, -1) !== null,
    down: moveRule(program, groupId, index, 1) !== null,
  };
}

/**
 * A rule group dropped before another group, or at the end where `beforeId` is left out. Null where
 * a group is unknown, dropped before itself, or where the order does not change.
 */
export function dropGroup(
  program: Program,
  id: GroupId,
  beforeId?: GroupId,
): Program | null {
  const moved = program.groups.find((group) => group.id === id);
  if (
    !moved ||
    beforeId === id ||
    (beforeId !== undefined &&
      !program.groups.some((group) => group.id === beforeId))
  )
    return null;
  const rest = program.groups.filter((group) => group.id !== id);
  const at =
    beforeId === undefined
      ? rest.length
      : rest.findIndex((group) => group.id === beforeId);
  const groups = [...rest.slice(0, at), moved, ...rest.slice(at)];
  return groups.every((group, each) => group === program.groups[each])
    ? null
    : { ...program, groups };
}

/**
 * A new condition of `kind`: a kind that takes a number starts with the data's default, one that
 * names a resource with the first of `resources`, „Zapas poniżej” with the first of `items`. Null
 * where there is nothing to name.
 */
function newCondition(
  kind: ConditionKind,
  resources: readonly ResourceId[],
  items: readonly ItemId[],
): Condition | null {
  if (kind === "always" || kind === "awayFromCampfire") return { kind };
  const value = conditionNumber(kind)?.defaultValue;
  if (value === undefined) return null;
  switch (kind) {
    case "hereBelow": {
      const resource = resources[0];
      return resource === undefined ? null : { kind, resource, value };
    }
    case "itemBelow": {
      const item = items[0];
      return item === undefined ? null : { kind, item, value };
    }
    case "temperatureBelow":
    case "satietyBelow":
    case "natureEnergyBelow":
    case "campfireLeftBelow":
    case "healthBelow":
    case "opponentHealthBelow":
      return { kind, value };
  }
}

/** A null row addresses the group's own condition, using the same controls as a rule. */
function conditionAt(
  program: Program,
  groupId: GroupId,
  index: number | null,
): Condition | undefined {
  const group = program.groups.find((each) => each.id === groupId);
  return index === null ? group?.condition : group?.rules[index]?.condition;
}

function replaceCondition(
  program: Program,
  groupId: GroupId,
  index: number | null,
  condition: Condition,
): Program {
  const group = program.groups.find((each) => each.id === groupId)!;
  return index === null
    ? {
        ...program,
        groups: program.groups.map((each) =>
          each.id === groupId ? { ...each, condition } : each,
        ),
      }
    : replaceRule(program, groupId, index, {
        ...group.rules[index],
        condition,
      });
}

/**
 * The condition switched to `kind` (null index selects the group), with the data's default number;
 * a condition that names a resource takes the first of `resources`, „Zapas poniżej” the first of
 * `items`. Null when the kind is already chosen or there is nothing to name.
 */
export function withConditionKind(
  program: Program,
  groupId: GroupId,
  index: number | null,
  kind: ConditionKind,
  resources: readonly ResourceId[],
  items: readonly ItemId[],
): Program | null {
  const previous = conditionAt(program, groupId, index);
  if (!previous || previous.kind === kind) return null;
  const condition = newCondition(kind, resources, items);
  if (!condition) return null;
  return replaceCondition(program, groupId, index, condition);
}

/**
 * The rule's action switched to `kind`; an action that names a resource — „Idź”, „Zbierz” — takes
 * the first of `resources`. Null when the kind is already chosen.
 */
export function withActionKind(
  program: Program,
  groupId: GroupId,
  index: number,
  kind: ActionKind,
  resources: readonly ResourceId[],
): Program | null {
  const rule = program.groups.find((group) => group.id === groupId)?.rules[
    index
  ];
  if (!rule || rule.action.kind === kind) return null;
  if (!takesResource(kind))
    return replaceRule(program, groupId, index, { ...rule, action: { kind } });
  const resource = resources[0];
  if (resource === undefined) return null;
  return replaceRule(program, groupId, index, {
    ...rule,
    action: { kind, resource },
  });
}

/** The condition's resource; a null index selects the group. Null result when unchanged or absent. */
export function withConditionResource(
  program: Program,
  groupId: GroupId,
  index: number | null,
  resource: ResourceId,
): Program | null {
  const previous = conditionAt(program, groupId, index);
  if (
    !previous ||
    previous.kind !== "hereBelow" ||
    previous.resource === resource
  )
    return null;
  return replaceCondition(program, groupId, index, { ...previous, resource });
}

/** The condition's item; a null index selects the group. Null result when unchanged or absent. */
export function withConditionItem(
  program: Program,
  groupId: GroupId,
  index: number | null,
  item: ItemId,
): Program | null {
  const previous = conditionAt(program, groupId, index);
  if (!previous || previous.kind !== "itemBelow" || previous.item === item)
    return null;
  return replaceCondition(program, groupId, index, { ...previous, item });
}

/** The condition's number; a null index selects the group. Null result when unchanged or absent. */
export function withConditionValue(
  program: Program,
  groupId: GroupId,
  index: number | null,
  value: number,
): Program | null {
  const previous = conditionAt(program, groupId, index);
  if (!previous || !("value" in previous) || previous.value === value)
    return null;
  return replaceCondition(program, groupId, index, { ...previous, value });
}

/** The resource of the rule's action; null when unchanged or the action names none. */
export function withActionResource(
  program: Program,
  groupId: GroupId,
  index: number,
  resource: ResourceId,
): Program | null {
  const rule = program.groups.find((group) => group.id === groupId)?.rules[
    index
  ];
  if (!rule || !namesResource(rule.action) || rule.action.resource === resource)
    return null;
  return replaceRule(program, groupId, index, {
    ...rule,
    action: { ...rule.action, resource },
  });
}

/**
 * Where focus goes after a structural edit of the rule at `index`, given the rule count after it:
 * „↑”/„↓” — the same button in the moved rule's new row; „Usuń” — the „Usuń” of the row now at that
 * position, or „Dodaj regułę” when there is none; „Dodaj regułę” — the new row's condition select.
 */
export function focusAfter(
  edit: StructuralEdit,
  groupId: GroupId,
  index: number,
  ruleCount: number,
): FocusTarget {
  switch (edit) {
    case "up":
      return { groupId, row: index - 1, control: "up" };
    case "down":
      return { groupId, row: index + 1, control: "down" };
    case "remove":
      return index < ruleCount
        ? { groupId, row: index, control: "remove" }
        : { groupId, control: "add" };
    case "add":
      return { groupId, row: index, control: "condition" };
  }
}

/** Why a cell of the rule panel's pick stands greyed (D-289); each is one sentence for the player. */
export const PICK_REASONS = {
  branchNotBought: BRANCH_NOT_BOUGHT,
  branchWithoutRun: "wybierzesz w przejściu postaci, która ją kupiła",
  noTarget: "nie znasz jeszcze celu",
  notOnMap: "nie ma go na tej mapie",
} as const;

/**
 * One cell of a field's pick. `greyed` cells cannot be picked; `reason` says why, and is null only on
 * a cell that may be picked and on a held value no reason of `PICK_REASONS` fits — the editor makes
 * none up. A held value outside the pick is `chosen` and `greyed`.
 */
export type PickCell<Value> = {
  value: Value;
  label: string;
  chosen: boolean;
  greyed: boolean;
  reason: string | null;
};

/** The cells of one group of actions, or one section of conditions (`name` null: a section bears none). */
export type PickSection<Value> = {
  name: string | null;
  cells: PickCell<Value>[];
};

/** The fields of the rule panel, in the order the player moves through them (D-306). */
export type RuleField =
  "condition" | "number" | "conditionTarget" | "action" | "actionTarget";

/**
 * The actions the Understanding holds that the archetype of the character the editor is shown
 * through teaches, bought or not: the knowledge, of which `editorRepertoire` is the part the
 * character may carry out.
 */
function knownActions(state: GameState): readonly ActionKind[] {
  return knownRepertoire(state).actions;
}

/** The resources the Understanding holds, in the data's order, each with whether the map of the map run holds it. */
function knownResources(
  state: GameState,
): { id: ResourceId; onMap: boolean }[] {
  const { items } = editorRepertoire(state);
  const map = state.run ? MAPS[state.run.mapId] : undefined;
  return (Object.keys(RESOURCES) as ResourceId[])
    .filter((id) => items.includes(id))
    .map((id) => ({
      id,
      onMap: !map || map.resources.some((resource) => resource.id === id),
    }));
}

/** A resource or an item named in the player's words: its name from the data, capitalised. */
function targetName(name: string): string {
  return name.charAt(0).toLocaleUpperCase("pl") + name.slice(1);
}

/** A section of one group's cells, in a plan that parts what the data sets apart. */
function sectionsOf<Value>(
  names: readonly (string | null)[],
  cells: readonly { at: number; cell: PickCell<Value> }[],
): PickSection<Value>[] {
  return names
    .map((name, at) => ({
      name,
      cells: cells.filter((each) => each.at === at).map((each) => each.cell),
    }))
    .filter((section) => section.cells.length > 0);
}

/**
 * The pick of the condition field, in the sections of the data: the conditions the Understanding
 * holds, and the held condition's kind where the Understanding does not hold it. „Tu leży mniej niż”
 * and „Zapas poniżej” with no target to name stand greyed, „nie znasz jeszcze celu”. Pure.
 */
export function conditionPick(
  state: GameState,
  held: Condition,
): PickSection<ConditionKind>[] {
  const known = editorRepertoire(state).conditions;
  const named = {
    hereBelow: knownResources(state).some((resource) => resource.onMap),
    itemBelow: offeredItems(state).length > 0,
  };
  const cells = (Object.keys(CONDITIONS) as ConditionKind[])
    .filter((kind) => known.includes(kind) || kind === held.kind)
    .map((kind) => {
      const def: ConditionDef = CONDITIONS[kind];
      const reason =
        (kind === "hereBelow" || kind === "itemBelow") && !named[kind]
          ? PICK_REASONS.noTarget
          : null;
      return {
        at: CONDITION_SECTIONS.indexOf(def.section),
        place: def.place,
        cell: {
          value: kind,
          label: def.label,
          chosen: kind === held.kind,
          greyed: reason !== null || !known.includes(kind),
          reason,
        },
      };
    })
    .sort((a, b) => a.place - b.place);
  return sectionsOf(
    CONDITION_SECTIONS.map(() => null),
    cells,
  );
}

/**
 * The pick of the action field, in the groups of the data: the actions the Understanding holds and
 * the archetype teaches, and the held action's kind where they do not hold it. A branch action
 * stands greyed — „gałąź niewykupiona” during a map run, „wybierzesz w przejściu postaci, która ją
 * kupiła” with none; „Idź”, „Zbierz” and „Obchód” with no target to name, „nie znasz jeszcze celu”.
 * The actions of combat stand picked outside combat too. Pure.
 */
export function actionPick(
  state: GameState,
  held: Action,
): PickSection<ActionKind>[] {
  const offered = editorRepertoire(state).actions;
  const known = knownActions(state);
  const named = knownResources(state).some((resource) => resource.onMap);
  const groups = Object.keys(ACTION_GROUPS);
  const cells = (Object.keys(ACTIONS) as ActionKind[])
    .filter((kind) => known.includes(kind) || kind === held.kind)
    .map((kind) => {
      const def: ActionDef = ACTIONS[kind];
      let reason: string | null = null;
      if (known.includes(kind) && !offered.includes(kind))
        reason = state.run
          ? PICK_REASONS.branchNotBought
          : PICK_REASONS.branchWithoutRun;
      else if (takesResource(kind) && !named) reason = PICK_REASONS.noTarget;
      return {
        at: groups.indexOf(def.group),
        cell: {
          value: kind,
          label: def.label,
          chosen: kind === held.kind,
          greyed: reason !== null || !known.includes(kind),
          reason,
        },
      };
    });
  return sectionsOf(
    Object.values(ACTION_GROUPS).map((group) => group.label),
    cells,
  );
}

/** The pick of a resource: every resource the Understanding holds, those the map of the map run lacks greyed. */
function resourcePick(state: GameState, held: ResourceId): PickCell<ItemId>[] {
  const known = knownResources(state);
  return (Object.keys(RESOURCES) as ResourceId[])
    .filter((id) => id === held || known.some((resource) => resource.id === id))
    .map((id) => {
      const found = known.find((resource) => resource.id === id);
      const reason = found && !found.onMap ? PICK_REASONS.notOnMap : null;
      return {
        value: id,
        label: targetName(RESOURCES[id].name),
        chosen: id === held,
        greyed: reason !== null || !found,
        reason,
      };
    });
}

/**
 * The pick of the condition's target: the resources for „Tu leży mniej niż”, the items of the
 * backpack for „Zapas poniżej”; null for a condition that names none. Pure.
 */
export function conditionTargetPick(
  state: GameState,
  held: Condition,
): PickCell<ItemId>[] | null {
  if (held.kind === "hereBelow") return resourcePick(state, held.resource);
  if (held.kind !== "itemBelow") return null;
  const known = offeredItems(state);
  return (Object.keys(ITEMS) as ItemId[])
    .filter((id) => id === held.item || known.includes(id))
    .map((id) => ({
      value: id,
      label: targetName(ITEMS[id].name),
      chosen: id === held.item,
      greyed: !known.includes(id),
      reason: null,
    }));
}

/** The pick of the action's target: the resources; null for an action that names none. Pure. */
export function actionTargetPick(
  state: GameState,
  held: Action,
): PickCell<ItemId>[] | null {
  return namesResource(held) ? resourcePick(state, held.resource) : null;
}

/** The fields a condition stands in, in order: the number only where it takes one, a target only where it names one. */
export function conditionFields(
  condition: Condition,
): ("condition" | "number" | "conditionTarget")[] {
  return [
    "condition",
    ...(conditionNumber(condition.kind) ? (["number"] as const) : []),
    ...(condition.kind === "hereBelow" || condition.kind === "itemBelow"
      ? (["conditionTarget"] as const)
      : []),
  ];
}

/** The fields of the rule panel for a rule, in order (D-306). */
export function ruleFields(rule: ProgramRule): RuleField[] {
  return [
    ...conditionFields(rule.condition),
    "action",
    ...(namesResource(rule.action) ? (["actionTarget"] as const) : []),
  ];
}

/**
 * The field the panel moves to after a pick: the one following `current` in `fields`, which are those
 * of the rule or group as the pick left it; null after the last. A pick of the value already chosen
 * moves on too.
 */
export function fieldAfter<Field>(
  fields: readonly Field[],
  current: Field,
): Field | null {
  const at = fields.indexOf(current);
  return at < 0 ? null : (fields[at + 1] ?? null);
}

/**
 * The time one carrying out of an action takes, as the editor shows it: its minutes from the data,
 * during a map run as the simulation gives them for the character of the map run; „tura” for an
 * action of combat; for a movement the step of the map of the map run, and nothing outside one.
 */
export function actionTime(state: GameState, kind: ActionKind): string | null {
  const def: ActionDef = ACTIONS[kind];
  if (def.combat) return "tura";
  const run = state.run;
  const base = def.minutes ?? (run ? MAPS[run.mapId].stepMinutes : null);
  if (base === null) return null;
  const minutes = run ? actionMinutes(base, kind, run.character.skills) : base;
  return `${minutes} min`;
}

/** The number of the rule group at `groupIndex` of the program, counted from zero: „2” for the second. */
export function groupNumber(groupIndex: number): string {
  return String(groupIndex + 1);
}

/** The number of a rule: its group's and its own in the group, both counted from zero: „2.1”. */
export function ruleNumber(groupIndex: number, ruleIndex: number): string {
  return `${groupIndex + 1}.${ruleIndex + 1}`;
}

/** A condition as a part of a row's sentence: its name, its number and its target — „Zapas poniżej 8 · Patyk”. */
export function conditionSentence(condition: Condition): string {
  const head =
    "value" in condition
      ? `${CONDITIONS[condition.kind].label} ${condition.value}`
      : CONDITIONS[condition.kind].label;
  if (condition.kind === "hereBelow")
    return `${head} · ${targetName(RESOURCES[condition.resource].name)}`;
  if (condition.kind === "itemBelow")
    return `${head} · ${targetName(ITEMS[condition.item].name)}`;
  return head;
}

/** An action as a part of a row's sentence: its name and its target — „Zbierz — Patyk”. */
export function actionSentence(action: Action): string {
  const label = ACTIONS[action.kind].label;
  return namesResource(action)
    ? `${label} — ${targetName(RESOURCES[action.resource].name)}`
    : label;
}

/** The two parts of a rule's row, the condition then the action; the row reads „{condition} → {action}”. */
export function ruleSentence(rule: ProgramRule): {
  condition: string;
  action: string;
} {
  return {
    condition: conditionSentence(rule.condition),
    action: actionSentence(rule.action),
  };
}

/** „Wykonano {n}×”, the form of a count beside a rule and, summed, beside its rule group (D-93). */
export function countText(count: number): string {
  return `Wykonano ${count}×`;
}

/**
 * What a rule group's header says: its name, its condition, the number of its rules and, where
 * counts stand, the sum of its rules' counts, a rule with no entry counting zero; null where none do.
 */
export function groupSummary(
  group: RuleGroup,
  counts: GameState["ruleCounts"],
): {
  name: string;
  condition: string;
  ruleCount: number;
  executed: number | null;
} {
  return {
    name: group.name,
    condition: conditionSentence(group.condition),
    ruleCount: group.rules.length,
    executed:
      counts === null
        ? null
        : group.rules.reduce((sum, rule) => sum + (counts[rule.id] ?? 0), 0),
  };
}
