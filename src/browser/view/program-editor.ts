import { ACTIONS } from "../sim/data/actions.js";
import { CONDITIONS } from "../sim/data/conditions.js";
import { ITEMS } from "../sim/data/items.js";
import { MAPS } from "../sim/data/maps.js";
import { RESOURCES } from "../sim/data/resources.js";
import {
  conditionNumber,
  onStep,
  type ConditionNumber,
} from "../sim/program.js";
import { editorRepertoire } from "../sim/understanding.js";
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
import { createButton } from "./controls/button.js";
import { createNumberField } from "./controls/number-field.js";
import {
  createSelectList,
  setSelectOptions,
  type SelectOption,
} from "./controls/select-list.js";
import { createTextField, type Field } from "./controls/text-field.js";
import { sendMaps } from "./headquarters.js";
import { createTripEditor } from "./trip-editor.js";

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

export function moveGroup(
  program: Program,
  id: GroupId,
  offset: -1 | 1,
): Program | null {
  const index = program.groups.findIndex((group) => group.id === id);
  const other = index + offset;
  if (index < 0 || other < 0 || other >= program.groups.length) return null;
  const groups = [...program.groups];
  [groups[index], groups[other]] = [groups[other], groups[index]];
  return { ...program, groups };
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

const RESOURCE_ACTION_KINDS: readonly ActionKind[] = ["walkTo", "gather"];

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

/** The range a row's number field is made with, before `showRule` sets that of the rule's kind. */
const UNSET_RANGE = { min: 0, max: 0, step: 1 };

/**
 * The condition kinds the condition selects offer, in the data's order: those of the repertoire the
 * program is shown through (Q-C1), less „Tu leży mniej niż” and „Zapas poniżej” while no resource or
 * item is offered for them to name — a choice the editor could not turn into a rule. Pure.
 */
export function offeredConditionKinds(state: GameState): ConditionKind[] {
  const { conditions } = editorRepertoire(state);
  const named = {
    hereBelow: offeredResources(state).length > 0,
    itemBelow: offeredItems(state).length > 0,
  };
  return (Object.keys(CONDITIONS) as ConditionKind[]).filter(
    (kind) =>
      conditions.includes(kind) &&
      (kind === "hereBelow" || kind === "itemBelow" ? named[kind] : true),
  );
}

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
 * run, otherwise of the first map the headquarters sends characters to, that the repertoire holds as
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

/**
 * Sets the number field's range and step to those of the condition kind's number, only where they
 * differ; a kind that takes no number leaves them as they are.
 */
export function showFieldRange(
  input: Pick<HTMLInputElement, "min" | "max" | "step">,
  kind: ConditionKind,
): void {
  const number = conditionNumber(kind);
  if (!number) return;
  const min = String(number.min);
  const max = String(number.max);
  const step = String(number.step);
  if (input.min !== min) input.min = min;
  if (input.max !== max) input.max = max;
  if (input.step !== step) input.step = step;
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

/** Swap with the neighbour in the same group; null past either end. */
export function moveRule(
  program: Program,
  groupId: GroupId,
  index: number,
  offset: -1 | 1,
): Program | null {
  const group = program.groups.find((each) => each.id === groupId);
  const other = index + offset;
  if (
    !group ||
    index < 0 ||
    other < 0 ||
    index >= group.rules.length ||
    other >= group.rules.length
  )
    return null;
  const rules = [...group.rules];
  [rules[index], rules[other]] = [rules[other], rules[index]];
  return replaceRules(program, groupId, rules);
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

type ConditionView = {
  condition: HTMLSelectElement;
  value: Field;
  conditionResource: HTMLSelectElement;
  conditionItem: HTMLSelectElement;
};

type RowView = ConditionView & {
  element: HTMLLIElement;
  count: HTMLSpanElement;
  action: HTMLSelectElement;
  actionResource: HTMLSelectElement;
  up: HTMLButtonElement;
  down: HTMLButtonElement;
  remove: HTMLButtonElement;
};

export type ProgramEditor = {
  element: HTMLElement;
  /**
   * Shows `program` with `counts` beside its rules, offering what the given game state's run's map
   * and Understanding give; call when the program shown, the run's map or the Understanding changes.
   */
  update(
    state: GameState,
    program: Program,
    counts: GameState["ruleCounts"],
    context?: string,
  ): void;
  /** Refreshes counts alone; never writes a field value, rebuilds rows or changes focus. */
  updateCounts(counts: GameState["ruleCounts"]): void;
};

/** The positions of a select list for `ids`, each with the text `text` gives it. */
function optionsOf<T extends string>(
  ids: readonly T[],
  text: (id: T) => string,
): SelectOption[] {
  return ids.map((id): SelectOption => [id, text(id)]);
}

/**
 * Shows `value` in a select list, adding its position after the offered ones first when the select
 * lacks one: a rule or group may hold a value the lists no longer offer.
 */
function showChoice<T extends string>(
  element: HTMLSelectElement,
  offered: readonly T[],
  value: T,
  text: (id: T) => string,
): void {
  if (![...element.options].some((option) => option.value === value))
    setSelectOptions(element, optionsOf([...offered, value], text));
  if (element.value !== value) element.value = value;
}

const conditionLabel = (kind: ConditionKind): string => CONDITIONS[kind].label;
const actionLabel = (kind: ActionKind): string => ACTIONS[kind].label;
const resourceName = (id: ResourceId): string => RESOURCES[id].name;
const itemName = (id: ItemId): string => ITEMS[id].name;

/** What the editor's lists offer, as `offered…` give it for one game state. */
type Offer = {
  conditions: ConditionKind[];
  actions: ActionKind[];
  resources: ResourceId[];
  items: ItemId[];
};

function offerOf(state: GameState): Offer {
  return {
    conditions: offeredConditionKinds(state),
    actions: offeredActionKinds(state),
    resources: offeredResources(state),
    items: offeredItems(state),
  };
}

/**
 * Builds the program editor under the program panel's list, which names the program shown, so the
 * editor carries no heading of its own: editable groups and their conditions, one row per
 * program rule — condition select, for a condition that takes a number a number field with the
 * range and step of its kind, for „Tu leży
 * mniej niż” a resource select, for „Zapas poniżej” an item select, „→”, action select, for „Idź”
 * and „Zbierz” a resource select, buttons „↑”, „↓”, „Usuń” — and the button „Dodaj regułę”. Groups
 * have their own arrows and destructive removal, with „Dodaj grupę” after the list. Native rule
 * drops insert before another rule or append to a group. Labels,
 * numbers, resources and items come from the data: the lists offer the repertoire of the program's
 * character (D-119) — its conditions, its actions and their targets — and a rule or group holding
 * a value outside them still shows it. „Dodaj regułę” is disabled while the repertoire holds no
 * action. Each edit commits a whole new program through `commit` on `change`; the
 * editor never writes the game state. Rows are rebuilt only after a structural edit, so the control
 * being edited keeps focus while the state changes.
 */
export function createProgramEditor(
  commit: (program: Program) => void,
): ProgramEditor {
  const element = document.createElement("div");
  element.className = "program-editor";
  const groupsElement = document.createElement("div");
  const addGroupButton = createButton("Dodaj grupę");
  const tripEditor = createTripEditor(commit);
  element.append(groupsElement, addGroupButton, tripEditor.element);

  let program: Program = {
    groups: [],
    nextGroupId: 1,
    nextRuleId: 1,
    tripPlan: { take: [], bring: [] },
  };
  let offer: Offer = { conditions: [], actions: [], resources: [], items: [] };
  let groups: {
    id: GroupId;
    element: HTMLElement;
    name: Field;
    condition: ConditionView;
    up: HTMLButtonElement;
    down: HTMLButtonElement;
    remove: HTMLButtonElement;
    add: HTMLButtonElement;
    rows: RowView[];
    ruleIds: number[];
  }[] = [];
  let draggedRuleId: number | null = null;
  const dragType = "application/x-loop-rule";
  let rebuild = true;
  let pendingFocus: FocusTarget | null = null;

  /** Commits an edit's program; a structural edit asks for a rebuild and where focus goes after it. */
  function edit(
    next: Program | null,
    structural?: { edit: StructuralEdit; groupId: GroupId; index: number },
  ): void {
    if (!next) return;
    if (structural) {
      rebuild = true;
      pendingFocus = focusAfter(
        structural.edit,
        structural.groupId,
        structural.index,
        next.groups.find((group) => group.id === structural.groupId)!.rules
          .length,
      );
    }
    commit(next);
  }

  function structuralEdit(next: Program | null, focus: FocusTarget): void {
    if (!next) return;
    rebuild = true;
    pendingFocus = focus;
    commit(next);
  }

  addGroupButton.addEventListener("click", () =>
    structuralEdit(addGroup(program), {
      groupId: program.nextGroupId,
      control: "group-name",
    }),
  );

  function dragOver(event: DragEvent): void {
    if (draggedRuleId === null || !event.dataTransfer) return;
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "move";
  }

  function drop(event: DragEvent, groupId: GroupId, beforeId?: number): void {
    event.stopPropagation();
    const id = draggedRuleId;
    draggedRuleId = null;
    if (id === null || event.dataTransfer?.getData(dragType) !== String(id))
      return;
    event.preventDefault();
    const next = dropRule(program, id, groupId, beforeId);
    if (!next) return;
    const row = next.groups
      .find((group) => group.id === groupId)!
      .rules.findIndex((rule) => rule.id === id);
    structuralEdit(next, { groupId, row, control: "condition" });
  }

  function createGroup(group: RuleGroup): (typeof groups)[number] {
    const section = document.createElement("section");
    section.className = "rule-group";
    const header = document.createElement("div");
    header.className = "rule-group-header";
    const name = createTextField({ label: "Nazwa grupy", hint: "Nazwa grupy" });
    const condition = createConditionControls(group.id, null);
    const up = createButton("↑", { label: "Grupa w górę" });
    const down = createButton("↓", { label: "Grupa w dół" });
    const remove = createButton("Usuń", {
      kind: "destructive",
      label: "Usuń grupę",
    });
    header.append(name.element, up, down, remove);
    const conditionRow = document.createElement("div");
    conditionRow.className = "group-condition";
    conditionRow.append(
      condition.condition,
      condition.value.element,
      condition.conditionResource,
      condition.conditionItem,
    );
    const list = document.createElement("ol");
    list.className = "rules";
    const add = createButton("Dodaj regułę");
    const rows = group.rules.map((_, index) => createRow(group.id, index));
    list.append(...rows.map((row) => row.element));
    section.append(header, conditionRow, list, add);
    name.input.addEventListener("change", () =>
      edit(renameGroup(program, group.id, name.input.value)),
    );
    up.addEventListener("click", () =>
      structuralEdit(moveGroup(program, group.id, -1), {
        groupId: group.id,
        control: "group-up",
      }),
    );
    down.addEventListener("click", () =>
      structuralEdit(moveGroup(program, group.id, 1), {
        groupId: group.id,
        control: "group-down",
      }),
    );
    remove.addEventListener("click", () => {
      const index = program.groups.findIndex((each) => each.id === group.id);
      const next = removeGroup(program, group.id);
      const following = next?.groups[index];
      structuralEdit(
        next,
        following
          ? { groupId: following.id, control: "group-remove" }
          : { control: "add-group" },
      );
    });
    section.addEventListener("dragover", dragOver);
    section.addEventListener("drop", (event) => drop(event, group.id));
    add.addEventListener("click", () => {
      const current = program.groups.find((each) => each.id === group.id);
      if (current)
        edit(addRule(program, group.id), {
          edit: "add",
          groupId: group.id,
          index: current.rules.length,
        });
    });
    return {
      id: group.id,
      element: section,
      name,
      condition,
      up,
      down,
      remove,
      add,
      rows,
      ruleIds: group.rules.map((rule) => rule.id),
    };
  }

  function createConditionControls(
    groupId: GroupId,
    index: number | null,
  ): ConditionView {
    const row: ConditionView = {
      condition: createSelectList(
        index === null ? "Warunek grupy" : "Warunek",
        optionsOf(offer.conditions, conditionLabel),
      ),
      value: createNumberField({
        label: index === null ? "Liczba warunku grupy" : "Liczba",
        ...UNSET_RANGE,
      }),
      conditionResource: createSelectList(
        index === null ? "Zasób warunku grupy" : "Zasób warunku",
        optionsOf(offer.resources, resourceName),
      ),
      conditionItem: createSelectList(
        index === null ? "Przedmiot warunku grupy" : "Przedmiot warunku",
        optionsOf(offer.items, itemName),
      ),
    };
    row.condition.addEventListener("change", () => {
      edit(
        withConditionKind(
          program,
          groupId,
          index,
          row.condition.value as ConditionKind,
          offer.resources,
          offer.items,
        ),
      );
    });
    row.value.input.addEventListener("change", () => {
      const condition = conditionAt(program, groupId, index);
      if (!condition || !("value" in condition)) return;
      const number = conditionNumber(condition.kind);
      if (!number) return;
      const field = readNumberField(
        row.value.input.value,
        condition.value,
        number,
      );
      row.value.input.value = String(field.value);
      if (field.commit)
        edit(withConditionValue(program, groupId, index, field.value));
    });
    row.conditionResource.addEventListener("change", () => {
      edit(
        withConditionResource(
          program,
          groupId,
          index,
          row.conditionResource.value as ResourceId,
        ),
      );
    });
    row.conditionItem.addEventListener("change", () => {
      edit(
        withConditionItem(
          program,
          groupId,
          index,
          row.conditionItem.value as ItemId,
        ),
      );
    });
    return row;
  }

  function createRow(groupId: GroupId, index: number): RowView {
    const row: RowView = {
      element: document.createElement("li"),
      count: document.createElement("span"),
      ...createConditionControls(groupId, index),
      action: createSelectList("Akcja", optionsOf(offer.actions, actionLabel)),
      actionResource: createSelectList(
        "Zasób akcji",
        optionsOf(offer.resources, resourceName),
      ),
      up: createButton("↑", { label: "W górę" }),
      down: createButton("↓", { label: "W dół" }),
      // „Usuń” deletes the program rule: a destructive button (D-44).
      remove: createButton("Usuń", { kind: "destructive" }),
    };
    row.element.className = "rule";
    row.element.draggable = true;
    row.element.title = "Przeciągnij regułę na inną regułę lub na grupę";
    row.element.addEventListener("dragstart", (event) => {
      if (
        event.target instanceof Element &&
        event.target.closest("input, select, button")
      ) {
        event.preventDefault();
        return;
      }
      const rule = program.groups.find((group) => group.id === groupId)?.rules[
        index
      ];
      if (!rule || !event.dataTransfer) return;
      draggedRuleId = rule.id;
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData(dragType, String(rule.id));
    });
    row.element.addEventListener("dragend", () => {
      draggedRuleId = null;
    });
    row.element.addEventListener("dragover", dragOver);
    row.element.addEventListener("drop", (event) => {
      const target = program.groups.find((group) => group.id === groupId)
        ?.rules[index];
      event.stopPropagation();
      if (target) drop(event, groupId, target.id);
    });
    row.count.className = "rule-count";
    const arrow = document.createElement("span");
    arrow.textContent = "→";
    row.element.append(
      row.condition,
      row.value.element,
      row.conditionResource,
      row.conditionItem,
      arrow,
      row.action,
      row.actionResource,
      row.count,
      row.up,
      row.down,
      row.remove,
    );

    row.action.addEventListener("change", () => {
      edit(
        withActionKind(
          program,
          groupId,
          index,
          row.action.value as ActionKind,
          offer.resources,
        ),
      );
    });
    row.actionResource.addEventListener("change", () => {
      edit(
        withActionResource(
          program,
          groupId,
          index,
          row.actionResource.value as ResourceId,
        ),
      );
    });
    row.up.addEventListener("click", () =>
      edit(moveRule(program, groupId, index, -1), {
        edit: "up",
        groupId,
        index,
      }),
    );
    row.down.addEventListener("click", () =>
      edit(moveRule(program, groupId, index, 1), {
        edit: "down",
        groupId,
        index,
      }),
    );
    row.remove.addEventListener("click", () =>
      edit(removeRule(program, groupId, index), {
        edit: "remove",
        groupId,
        index,
      }),
    );
    return row;
  }

  /** Sets each control of a row to its rule, only where it differs, so a focused control keeps focus. */
  function showCondition(row: ConditionView, condition: Condition): void {
    showChoice(row.condition, offer.conditions, condition.kind, conditionLabel);
    row.value.element.hidden = !("value" in condition);
    if ("value" in condition) {
      showFieldRange(row.value.input, condition.kind);
      const text = String(condition.value);
      if (row.value.input.value !== text) row.value.input.value = text;
    }
    row.conditionResource.hidden = condition.kind !== "hereBelow";
    if (condition.kind === "hereBelow")
      showChoice(
        row.conditionResource,
        offer.resources,
        condition.resource,
        resourceName,
      );
    row.conditionItem.hidden = condition.kind !== "itemBelow";
    if (condition.kind === "itemBelow")
      showChoice(row.conditionItem, offer.items, condition.item, itemName);
  }

  function showRule(row: RowView, rule: ProgramRule): void {
    showCondition(row, rule.condition);
    const action = rule.action;
    showChoice(row.action, offer.actions, action.kind, actionLabel);
    row.actionResource.hidden = !namesResource(action);
    if (namesResource(action))
      showChoice(
        row.actionResource,
        offer.resources,
        action.resource,
        resourceName,
      );
  }

  function focusTarget(target: FocusTarget): void {
    if (target.control === "add-group") {
      addGroupButton.focus();
      return;
    }
    const group = groups.find((each) => each.id === target.groupId);
    if (!group) return;
    if (target.control === "add") {
      group.add.focus();
      return;
    }
    if ("row" in target) {
      group.rows[target.row]?.[target.control].focus();
      return;
    }
    switch (target.control) {
      case "group-name":
        group.name.input.focus();
        break;
      case "group-up":
        group.up.focus();
        break;
      case "group-down":
        group.down.focus();
        break;
      case "group-remove":
        group.remove.focus();
        break;
    }
  }

  function updateCounts(counts: GameState["ruleCounts"]): void {
    for (const group of groups) {
      group.rows.forEach((row, index) => {
        const text =
          counts === null ? "" : `${counts[group.ruleIds[index]] ?? 0}×`;
        row.count.hidden = counts === null;
        if (row.count.textContent !== text) row.count.textContent = text;
      });
    }
  }

  return {
    element,
    updateCounts,
    update(
      state: GameState,
      shown: Program,
      counts: GameState["ruleCounts"],
      context = "program",
    ): void {
      const nextOffer = offerOf(state);
      if (JSON.stringify(nextOffer) !== JSON.stringify(offer)) rebuild = true;
      offer = nextOffer;
      program = shown;
      tripEditor.update(shown, offer.items, context);
      if (
        rebuild ||
        groups.length !== program.groups.length ||
        program.groups.some(
          (group, index) =>
            groups[index].id !== group.id ||
            groups[index].ruleIds.join() !==
              group.rules.map((rule) => rule.id).join(),
        )
      ) {
        groups = program.groups.map(createGroup);
        groupsElement.replaceChildren(...groups.map((group) => group.element));
        rebuild = false;
      }
      program.groups.forEach((group, index) => {
        const view = groups[index];
        if (view.name.input.value !== group.name)
          view.name.input.value = group.name;
        showCondition(view.condition, group.condition);
        group.rules.forEach((rule, at) => showRule(view.rows[at], rule));
        const addDisabled = offer.actions.length === 0;
        if (view.add.disabled !== addDisabled) view.add.disabled = addDisabled;
      });
      updateCounts(counts);
      if (pendingFocus) {
        const target = pendingFocus;
        pendingFocus = null;
        focusTarget(target);
      }
    },
  };
}
