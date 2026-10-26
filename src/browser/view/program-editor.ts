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

/**
 * The items „Zapas poniżej” offers, in the data's order: every item of the data, bound to no map,
 * since an item can reach the backpack from elsewhere than the map's tiles.
 */
const OFFERED_ITEMS = Object.keys(ITEMS) as ItemId[];

/** The range a row's number field is made with, before `showRule` sets that of the rule's kind. */
const UNSET_RANGE = { min: 0, max: 0, step: 1 };

/**
 * The resources the resource selects offer, in the map's order: the run's map's during a map run,
 * otherwise the first map the headquarters sends characters to. Pure.
 */
export function offeredResources(state: GameState): ResourceId[] {
  const mapId = state.run ? state.run.mapId : sendMaps()[0];
  if (mapId === undefined) return [];
  return MAPS[mapId].resources.map((resource) => resource.id);
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
 * names a resource with the first of `resources`, „Zapas poniżej” with the first item of the data.
 * Null where there is nothing to name.
 */
function newCondition(
  kind: ConditionKind,
  resources: readonly ResourceId[],
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
      const item = OFFERED_ITEMS[0];
      return item === undefined ? null : { kind, item, value };
    }
    case "temperatureBelow":
    case "satietyBelow":
    case "campfireLeftBelow":
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
 * The condition switched to `kind` (null index selects the group), with the data's default number; a condition that names
 * a resource takes the first of `resources`, „Zapas poniżej” the first item of the data. Null when
 * the kind is already chosen.
 */
export function withConditionKind(
  program: Program,
  groupId: GroupId,
  index: number | null,
  kind: ConditionKind,
  resources: readonly ResourceId[],
): Program | null {
  const previous = conditionAt(program, groupId, index);
  if (!previous || previous.kind === kind) return null;
  const condition = newCondition(kind, resources);
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
  /** Shows the given game state's program; call when the program or the run's map changes. */
  update(state: GameState): void;
  /** Refreshes counts alone; never writes a field value, rebuilds rows or changes focus. */
  updateCounts(counts: GameState["ruleCounts"]): void;
};

/** Fills a resource select with the offered resources, plus `value` when it is not among them. */
function fillResources(
  element: HTMLSelectElement,
  offered: readonly ResourceId[],
  value: ResourceId | null,
): void {
  const ids =
    value !== null && !offered.includes(value) ? [...offered, value] : offered;
  setSelectOptions(
    element,
    ids.map((id): SelectOption => [id, RESOURCES[id].name]),
  );
}

/** Shows `value` in a resource select, adding its option first when the select lacks one. */
function showResource(
  element: HTMLSelectElement,
  offered: readonly ResourceId[],
  value: ResourceId,
): void {
  if (![...element.options].some((option) => option.value === value))
    fillResources(element, offered, value);
  if (element.value !== value) element.value = value;
}

/**
 * Builds the program panel: heading „Program”, editable groups and their conditions, one row per
 * program rule — condition select, for a condition that takes a number a number field with the
 * range and step of its kind, for „Tu leży
 * mniej niż” a resource select, for „Zapas poniżej” an item select, „→”, action select, for „Idź”
 * and „Zbierz” a resource select, buttons „↑”, „↓”, „Usuń” — and the button „Dodaj regułę”. Groups
 * have their own arrows and destructive removal, with „Dodaj grupę” after the list. Native rule
 * drops insert before another rule or append to a group. Labels,
 * numbers, resources and items come from the data: the condition and action selects offer every
 * kind of the closed lists. Each edit commits a whole new program through `commit` on `change`; the
 * editor never writes the game state. Rows are rebuilt only after a structural edit, so the control
 * being edited keeps focus while the state changes.
 */
export function createProgramEditor(
  commit: (program: Program) => void,
): ProgramEditor {
  const element = document.createElement("div");
  element.className = "program-editor";
  const heading = document.createElement("h2");
  heading.textContent = "Program";
  const groupsElement = document.createElement("div");
  const addGroupButton = createButton("Dodaj grupę");
  element.append(heading, groupsElement, addGroupButton);

  const conditionOptions = Object.entries(CONDITIONS).map(
    ([kind, def]): SelectOption => [kind, def.label],
  );
  const actionOptions = Object.entries(ACTIONS).map(
    ([kind, def]): SelectOption => [kind, def.label],
  );
  const itemOptions = OFFERED_ITEMS.map((id): SelectOption => [
    id,
    ITEMS[id].name,
  ]);

  let program: Program = { groups: [], nextGroupId: 1, nextRuleId: 1 };
  let offered: ResourceId[] = [];
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
    for (const row of rows) fillResources(row.actionResource, offered, null);
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
        conditionOptions,
      ),
      value: createNumberField({
        label: index === null ? "Liczba warunku grupy" : "Liczba",
        ...UNSET_RANGE,
      }),
      conditionResource: createSelectList(
        index === null ? "Zasób warunku grupy" : "Zasób warunku",
      ),
      conditionItem: createSelectList(
        index === null ? "Przedmiot warunku grupy" : "Przedmiot warunku",
        itemOptions,
      ),
    };
    fillResources(row.conditionResource, offered, null);
    row.condition.addEventListener("change", () => {
      edit(
        withConditionKind(
          program,
          groupId,
          index,
          row.condition.value as ConditionKind,
          offered,
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
      action: createSelectList("Akcja", actionOptions),
      actionResource: createSelectList("Zasób akcji"),
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
          offered,
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
    if (row.condition.value !== condition.kind)
      row.condition.value = condition.kind;
    row.value.element.hidden = !("value" in condition);
    if ("value" in condition) {
      showFieldRange(row.value.input, condition.kind);
      const text = String(condition.value);
      if (row.value.input.value !== text) row.value.input.value = text;
    }
    row.conditionResource.hidden = condition.kind !== "hereBelow";
    if (condition.kind === "hereBelow")
      showResource(row.conditionResource, offered, condition.resource);
    row.conditionItem.hidden = condition.kind !== "itemBelow";
    if (
      condition.kind === "itemBelow" &&
      row.conditionItem.value !== condition.item
    )
      row.conditionItem.value = condition.item;
  }

  function showRule(row: RowView, rule: ProgramRule): void {
    showCondition(row, rule.condition);
    const action = rule.action;
    if (row.action.value !== action.kind) row.action.value = action.kind;
    row.actionResource.hidden = !namesResource(action);
    if (namesResource(action))
      showResource(row.actionResource, offered, action.resource);
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
    update(state: GameState): void {
      const nextOffered = offeredResources(state);
      if (nextOffered.join() !== offered.join()) rebuild = true;
      offered = nextOffered;
      program = state.program;
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
      });
      updateCounts(state.ruleCounts);
      if (pendingFocus) {
        const target = pendingFocus;
        pendingFocus = null;
        focusTarget(target);
      }
    },
  };
}
