import { ACTIONS } from "../sim/data/actions.js";
import { CONDITIONS } from "../sim/data/conditions.js";
import { MAPS } from "../sim/data/maps.js";
import { RESOURCES } from "../sim/data/resources.js";
import type {
  Action,
  Condition,
  GameState,
  Program,
  ProgramRule,
  ResourceId,
} from "../sim/types.js";
import { createButton } from "./controls/button.js";
import { createNumberField } from "./controls/number-field.js";
import {
  createSelectList,
  setSelectOptions,
  type SelectOption,
} from "./controls/select-list.js";
import type { Field } from "./controls/text-field.js";
import { sendTargets } from "./send-panel.js";

type ConditionKind = Condition["kind"];
type ActionKind = Action["kind"];
/** An action that names a resource of the map: „Idź” and „Zbierz”. */
type ResourceAction = Extract<Action, { resource: ResourceId }>;

const RESOURCE_ACTION_KINDS: readonly ActionKind[] = ["walkTo", "gather"];

function takesResource(kind: ActionKind): kind is ResourceAction["kind"] {
  return RESOURCE_ACTION_KINDS.includes(kind);
}

function namesResource(action: Action): action is ResourceAction {
  return takesResource(action.kind);
}

/** A control of a rule's row, or the button „Dodaj regułę”, that gets focus after a structural edit. */
export type FocusTarget =
  | { row: number; control: "condition" | "up" | "down" | "remove" }
  | { control: "add" };

/** An edit that changes the rows: „Dodaj regułę”, „Usuń”, „↑”, „↓”. */
export type StructuralEdit = "add" | "remove" | "up" | "down";

const NUMBER = CONDITIONS.hereBelow;

/**
 * The resources the resource selects offer, in the map's order: the run's map's during a map run,
 * otherwise the map shown in the send panel. Pure.
 */
export function offeredResources(state: GameState): ResourceId[] {
  const mapId = state.run ? state.run.mapId : sendTargets()[0]?.mapId;
  if (mapId === undefined) return [];
  return MAPS[mapId].resources.map((resource) => resource.id);
}

/**
 * The number field's commit rule: text holding no finite number keeps the previous value and
 * commits nothing; otherwise the number is rounded to a whole number and clamped to the data's
 * range, and committed when it differs from the previous value. `value` is what the field shows.
 */
export function readNumberField(
  text: string,
  previous: number,
): { value: number; commit: boolean } {
  const parsed = text.trim() === "" ? Number.NaN : Number(text);
  if (!Number.isFinite(parsed)) return { value: previous, commit: false };
  // `+ 0` turns a rounded -0 into 0.
  const value =
    Math.min(NUMBER.max, Math.max(NUMBER.min, Math.round(parsed))) + 0;
  return { value, commit: value !== previous };
}

/** The program with one rule replaced; the input is not changed. */
function replaceRule(
  program: Program,
  index: number,
  rule: ProgramRule,
): Program {
  return {
    rules: program.rules.map((each, at) => (at === index ? rule : each)),
  };
}

/** „Dodaj regułę”: the program with „Zawsze → Eksploruj” appended. */
export function addRule(program: Program): Program {
  return {
    rules: [
      ...program.rules,
      { condition: { kind: "always" }, action: { kind: "explore" } },
    ],
  };
}

/** „Usuń”: the program without the rule at `index`. */
export function removeRule(program: Program, index: number): Program {
  return { rules: program.rules.filter((_, at) => at !== index) };
}

/** „↑” (offset -1) or „↓” (offset 1): the rule swapped with its neighbour; null past either end. */
export function moveRule(
  program: Program,
  index: number,
  offset: -1 | 1,
): Program | null {
  const other = index + offset;
  if (
    index < 0 ||
    other < 0 ||
    index >= program.rules.length ||
    other >= program.rules.length
  )
    return null;
  const rules = [...program.rules];
  [rules[index], rules[other]] = [rules[other], rules[index]];
  return { rules };
}

/**
 * The rule's condition switched to `kind`; a condition that names a resource takes the first of
 * `resources` and the data's default number. Null when the kind is already chosen.
 */
export function withConditionKind(
  program: Program,
  index: number,
  kind: ConditionKind,
  resources: readonly ResourceId[],
): Program | null {
  const rule = program.rules[index];
  if (!rule || rule.condition.kind === kind) return null;
  if (kind === "always")
    return replaceRule(program, index, { ...rule, condition: { kind } });
  const resource = resources[0];
  if (resource === undefined) return null;
  return replaceRule(program, index, {
    ...rule,
    condition: { kind, resource, value: NUMBER.defaultValue },
  });
}

/**
 * The rule's action switched to `kind`; an action that names a resource — „Idź”, „Zbierz” — takes
 * the first of `resources`. Null when the kind is already chosen.
 */
export function withActionKind(
  program: Program,
  index: number,
  kind: ActionKind,
  resources: readonly ResourceId[],
): Program | null {
  const rule = program.rules[index];
  if (!rule || rule.action.kind === kind) return null;
  if (!takesResource(kind))
    return replaceRule(program, index, { ...rule, action: { kind } });
  const resource = resources[0];
  if (resource === undefined) return null;
  return replaceRule(program, index, { ...rule, action: { kind, resource } });
}

/** The resource of the rule's condition; null when unchanged or the condition names none. */
export function withConditionResource(
  program: Program,
  index: number,
  resource: ResourceId,
): Program | null {
  const rule = program.rules[index];
  if (
    !rule ||
    rule.condition.kind !== "hereBelow" ||
    rule.condition.resource === resource
  )
    return null;
  return replaceRule(program, index, {
    ...rule,
    condition: { ...rule.condition, resource },
  });
}

/** The number of the rule's condition; null when unchanged or the condition takes none. */
export function withConditionValue(
  program: Program,
  index: number,
  value: number,
): Program | null {
  const rule = program.rules[index];
  if (
    !rule ||
    rule.condition.kind !== "hereBelow" ||
    rule.condition.value === value
  )
    return null;
  return replaceRule(program, index, {
    ...rule,
    condition: { ...rule.condition, value },
  });
}

/** The resource of the rule's action; null when unchanged or the action names none. */
export function withActionResource(
  program: Program,
  index: number,
  resource: ResourceId,
): Program | null {
  const rule = program.rules[index];
  if (!rule || !namesResource(rule.action) || rule.action.resource === resource)
    return null;
  return replaceRule(program, index, {
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
  index: number,
  ruleCount: number,
): FocusTarget {
  switch (edit) {
    case "up":
      return { row: index - 1, control: "up" };
    case "down":
      return { row: index + 1, control: "down" };
    case "remove":
      return index < ruleCount
        ? { row: index, control: "remove" }
        : { control: "add" };
    case "add":
      return { row: index, control: "condition" };
  }
}

type RowView = {
  element: HTMLLIElement;
  condition: HTMLSelectElement;
  value: Field;
  conditionResource: HTMLSelectElement;
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
 * Builds the program panel: heading „Program”, one row per program rule — condition select, for
 * „Tu leży mniej niż” a number field and a resource select, „→”, action select, for „Idź” and
 * „Zbierz” a resource select, buttons „↑”, „↓”, „Usuń” — and the button „Dodaj regułę”. Labels and
 * resources come from the data. Each edit commits a whole new program through `commit` on `change`; the
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
  const list = document.createElement("ol");
  list.className = "rules";
  const addButton = createButton("Dodaj regułę");
  element.append(heading, list, addButton);

  const conditionOptions = Object.entries(CONDITIONS).map(
    ([kind, def]): SelectOption => [kind, def.label],
  );
  const actionOptions = Object.entries(ACTIONS).map(
    ([kind, def]): SelectOption => [kind, def.label],
  );

  let program: Program = { rules: [] };
  let offered: ResourceId[] = [];
  let rows: RowView[] = [];
  let rebuild = true;
  let pendingFocus: FocusTarget | null = null;

  /** Commits an edit's program; a structural edit asks for a rebuild and where focus goes after it. */
  function edit(
    next: Program | null,
    structural?: { edit: StructuralEdit; index: number },
  ): void {
    if (!next) return;
    if (structural) {
      rebuild = true;
      pendingFocus = focusAfter(
        structural.edit,
        structural.index,
        next.rules.length,
      );
    }
    commit(next);
  }

  addButton.addEventListener("click", () => {
    edit(addRule(program), { edit: "add", index: program.rules.length });
  });

  function createRow(index: number): RowView {
    const row: RowView = {
      element: document.createElement("li"),
      condition: createSelectList("Warunek", conditionOptions),
      value: createNumberField({
        label: "Liczba",
        min: NUMBER.min,
        max: NUMBER.max,
        step: NUMBER.step,
      }),
      conditionResource: createSelectList("Zasób warunku"),
      action: createSelectList("Akcja", actionOptions),
      actionResource: createSelectList("Zasób akcji"),
      up: createButton("↑", { label: "W górę" }),
      down: createButton("↓", { label: "W dół" }),
      // „Usuń” deletes the program rule: a destructive button (D-44).
      remove: createButton("Usuń", { kind: "destructive" }),
    };
    row.element.className = "rule";
    const arrow = document.createElement("span");
    arrow.textContent = "→";
    row.element.append(
      row.condition,
      row.value.element,
      row.conditionResource,
      arrow,
      row.action,
      row.actionResource,
      row.up,
      row.down,
      row.remove,
    );

    row.condition.addEventListener("change", () => {
      edit(
        withConditionKind(
          program,
          index,
          row.condition.value as ConditionKind,
          offered,
        ),
      );
    });
    row.value.input.addEventListener("change", () => {
      const condition = program.rules[index]?.condition;
      if (condition?.kind !== "hereBelow") return;
      const field = readNumberField(row.value.input.value, condition.value);
      row.value.input.value = String(field.value);
      if (field.commit) edit(withConditionValue(program, index, field.value));
    });
    row.conditionResource.addEventListener("change", () => {
      edit(
        withConditionResource(
          program,
          index,
          row.conditionResource.value as ResourceId,
        ),
      );
    });
    row.action.addEventListener("change", () => {
      edit(
        withActionKind(program, index, row.action.value as ActionKind, offered),
      );
    });
    row.actionResource.addEventListener("change", () => {
      edit(
        withActionResource(
          program,
          index,
          row.actionResource.value as ResourceId,
        ),
      );
    });
    row.up.addEventListener("click", () =>
      edit(moveRule(program, index, -1), { edit: "up", index }),
    );
    row.down.addEventListener("click", () =>
      edit(moveRule(program, index, 1), { edit: "down", index }),
    );
    row.remove.addEventListener("click", () =>
      edit(removeRule(program, index), { edit: "remove", index }),
    );
    return row;
  }

  /** Sets each control of a row to its rule, only where it differs, so a focused control keeps focus. */
  function showRule(row: RowView, rule: ProgramRule): void {
    const { condition, action } = rule;
    if (row.condition.value !== condition.kind)
      row.condition.value = condition.kind;
    const below = condition.kind === "hereBelow";
    row.value.element.hidden = !below;
    row.conditionResource.hidden = !below;
    if (below) {
      const text = String(condition.value);
      if (row.value.input.value !== text) row.value.input.value = text;
      showResource(row.conditionResource, offered, condition.resource);
    }
    if (row.action.value !== action.kind) row.action.value = action.kind;
    row.actionResource.hidden = !namesResource(action);
    if (namesResource(action))
      showResource(row.actionResource, offered, action.resource);
  }

  function focusTarget(target: FocusTarget): void {
    if (target.control === "add") {
      addButton.focus();
      return;
    }
    rows[target.row]?.[target.control].focus();
  }

  return {
    element,
    update(state: GameState): void {
      const nextOffered = offeredResources(state);
      if (nextOffered.join() !== offered.join()) rebuild = true;
      offered = nextOffered;
      program = state.program;
      if (rebuild || rows.length !== program.rules.length) {
        rows = program.rules.map((_, index) => createRow(index));
        for (const row of rows)
          fillResources(row.conditionResource, offered, null);
        for (const row of rows)
          fillResources(row.actionResource, offered, null);
        list.replaceChildren(...rows.map((row) => row.element));
        rebuild = false;
      }
      program.rules.forEach((rule, index) => showRule(rows[index], rule));
      if (pendingFocus) {
        const target = pendingFocus;
        pendingFocus = null;
        focusTarget(target);
      }
    },
  };
}
