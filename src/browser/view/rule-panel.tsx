/**
 * The rule panel of the program editor in React (D-288, D-289, D-290, D-293, D-296, D-299, D-300,
 * D-302, D-306; task edytor-programu, To do 3 to 5 and 8). It stands beside the rule list and changes
 * one program rule, or one rule group: for a rule its fields condition, number, target of the
 * condition, action and target of the action, each standing only where the rule has it; for a group
 * its name and its condition with the condition's number and target. One field at a time shows its
 * pick, a grid of pick cells in the groups and sections of the data, the others their value, so the
 * pick comes in steps (D-282). Each pick hands the page a whole new program through `onCommit`, never
 * the game state, and moves to the next field; a pick of the value held commits nothing and moves on
 * too. In a grid the arrow keys move among the cells, a greyed one included so that its reason can be
 * read, Enter picks and does nothing on a greyed cell, and only one cell of the grid is in the order
 * of Tab, so Tab leaves the grid. „✕” and Escape ask the page to close the panel through `onClose`;
 * opening another rule is the page's, by `open`. The page holds the panel behind `createRulePanel`, as
 * it holds the rule list, calling it from an event handler or the continuation of an answer, never
 * from render or an effect. Nothing runs when the module is imported.
 */
import { useLayoutEffect, useRef, useState } from "react";
import type { FocusEvent, KeyboardEvent } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { ACTIONS } from "../sim/data/actions.js";
import { conditionNumber } from "../sim/program.js";
import type {
  Action,
  Condition,
  GameState,
  GroupId,
  ItemId,
  Program,
  ResourceId,
} from "../sim/types.js";
import { ReactButton } from "./controls/react-button.js";
import { ReactNumberField } from "./controls/react-number-field.js";
import { ReactPickCell } from "./controls/react-pick-cell.js";
import { ReactTextField } from "./controls/react-text-field.js";
import {
  actionPick,
  actionTargetPick,
  actionTime,
  conditionFields,
  conditionPick,
  conditionTargetPick,
  fieldAfter,
  groupNumber,
  offeredItems,
  offeredResources,
  renameGroup,
  ruleFields,
  ruleNumber,
  withActionKind,
  withActionResource,
  withConditionItem,
  withConditionKind,
  withConditionResource,
  withConditionValue,
  type PickCell,
  type PickSection,
  type RuleField,
} from "./program-editor.js";

/** What the panel shows: a rule, or with a null rule a rule group, opened on `field`, the condition when left out. */
export type RulePanelOpen = {
  groupId: GroupId;
  ruleId: number | null;
  field?: RuleField;
};

/** What the page gives the panel; every call of `update` gives it whole. */
export type RulePanelProps = {
  /** The game state, for what the Understanding holds, the map run and the time of an action. */
  state: GameState;
  /** The program shown: the saved program or the copy. */
  program: Program;
  /** The rule or group the panel is open on; null where it is closed, and then it draws nothing. */
  open: RulePanelOpen | null;
  /** The program shown is the copy a map run carries out, whose change sets the streak to zero. */
  copy: boolean;
};

export type RulePanelOptions = {
  /** Called with the whole new program after each change. */
  onCommit: (program: Program) => void;
  /** Called when the player asks to close the panel, by „✕” or Escape. */
  onClose: () => void;
  props: RulePanelProps;
};

export type RulePanel = {
  /** The panel with its place, for the page to put in. */
  element: HTMLElement;
  /** Draws the panel anew from what the page gives. */
  update(props: RulePanelProps): void;
  /** Unmounts the panel and takes it out of the page. */
  dispose(): void;
};

/** The words of each field above its value or its pick, as the task names the fields. */
const FIELD_LABELS: Record<RuleField, string> = {
  condition: "Warunek",
  number: "Liczba",
  conditionTarget: "Cel warunku",
  action: "Czynność",
  actionTarget: "Cel czynności",
};

/** „Zmiana zeruje passę tego przejścia.”: the panel of the copy says it, and nothing of the counts (D-302). */
const COPY_NOTE = "Zmiana zeruje passę tego przejścia.";

/**
 * Cells to a line in a field's grid: the conditions in two columns (D-290), every other pick in four.
 * `styles.css` draws the same numbers, the class `two-columns` naming the first.
 */
function columnsOf(field: RuleField): number {
  return field === "condition" ? 2 : 4;
}

/**
 * The cell an arrow key moves to from the cell at `at`, the cells counted through all sections of a
 * grid whose sections hold `lengths` cells and set `columns` to a line. Left and right step through
 * the cells in their order; up and down go to the line above or below, also into the next or the
 * previous section, keeping the column where that line has it. At an edge the cell stays.
 */
function cellAfterKey(
  lengths: readonly number[],
  columns: number,
  at: number,
  key: string,
): number {
  const total = lengths.reduce((sum, length) => sum + length, 0);
  if (key === "ArrowLeft") return Math.max(0, at - 1);
  if (key === "ArrowRight") return Math.min(total - 1, at + 1);
  let section = 0;
  let start = 0;
  while (at >= start + lengths[section]) {
    start += lengths[section];
    section += 1;
  }
  const offset = at - start;
  const line = Math.floor(offset / columns);
  const column = offset % columns;
  if (key === "ArrowDown") {
    if ((line + 1) * columns < lengths[section])
      return (
        start + Math.min((line + 1) * columns + column, lengths[section] - 1)
      );
    if (section + 1 >= lengths.length) return at;
    return (
      start + lengths[section] + Math.min(column, lengths[section + 1] - 1)
    );
  }
  if (key === "ArrowUp") {
    if (line > 0) return start + (line - 1) * columns + column;
    if (section === 0) return at;
    const length = lengths[section - 1];
    const last = Math.floor((length - 1) / columns) * columns;
    return start - length + Math.min(last + column, length - 1);
  }
  return at;
}

/** A pick of one field in sections, whatever the field: a target's pick is one section with no name. */
type FieldPick = PickSection<string>[];

/** The pick of `field` for a holder of `condition` and, for a rule, `action`; null where the field stands not. */
function pickOf(
  state: GameState,
  field: RuleField,
  condition: Condition,
  action: Action | null,
): FieldPick | null {
  switch (field) {
    case "condition":
      return conditionPick(state, condition);
    case "action":
      return action === null ? null : actionPick(state, action);
    case "conditionTarget":
      return asSection(conditionTargetPick(state, condition));
    case "actionTarget":
      return action === null
        ? null
        : asSection(actionTargetPick(state, action));
    case "number":
      return null;
  }
}

function asSection(cells: PickCell<ItemId>[] | null): FieldPick | null {
  return cells === null ? null : [{ name: null, cells }];
}

/** The value a field shows while its pick is closed: the name of the cell chosen. */
function chosenLabel(pick: FieldPick | null): string {
  for (const section of pick ?? [])
    for (const cell of section.cells) if (cell.chosen) return cell.label;
  return "";
}

/** The cells of a grid, in the order of its sections, as the panel draws them. */
function cellsOf(grid: HTMLElement | null): HTMLElement[] {
  return grid === null
    ? []
    : [...grid.querySelectorAll<HTMLElement>(".pick-cell")];
}

type RulePanelViewProps = Omit<RulePanelOptions, "props"> & RulePanelProps;

/** The rule panel of the rule or group `open` names; nothing where none is open or it is gone. */
export function RulePanelView({
  state,
  program,
  open,
  copy,
  onCommit,
  onClose,
}: RulePanelViewProps) {
  const groupIndex =
    open === null
      ? -1
      : program.groups.findIndex((each) => each.id === open.groupId);
  const group = groupIndex < 0 ? undefined : program.groups[groupIndex];
  const ruleIndex =
    open === null || open.ruleId === null || group === undefined
      ? -1
      : group.rules.findIndex((each) => each.id === open.ruleId);
  const rule = ruleIndex < 0 ? undefined : group?.rules[ruleIndex];
  // The rule's place in its group for the edits; null addresses the group's own condition.
  const index = open?.ruleId === null ? null : ruleIndex;
  const condition = rule?.condition ?? group?.condition;
  const action = rule?.action ?? null;
  const fields: RuleField[] =
    rule !== undefined
      ? ruleFields(rule)
      : condition !== undefined
        ? conditionFields(condition)
        : [];

  // The field whose pick stands open, set anew whenever the page opens another rule, group or field.
  const openKey =
    open === null
      ? ""
      : `${open.groupId}:${open.ruleId ?? "group"}:${open.field ?? "condition"}`;
  const requested: RuleField =
    open?.field !== undefined && fields.includes(open.field)
      ? open.field
      : "condition";
  // With it, the cell of the open grid the keyboard stands on; null until the keyboard moves there.
  const [shown, setShown] = useState<{
    key: string;
    active: RuleField;
    cursor: number | null;
  }>({ key: openKey, active: requested, cursor: null });
  const current =
    shown.key === openKey
      ? shown
      : { key: openKey, active: requested, cursor: null };
  if (shown !== current) setShown(current);
  const { active, cursor } = current;
  // The name typed into the group's name field while it has the focus; null while it has none.
  const [name, setName] = useState<string | null>(null);

  const grid = useRef<HTMLDivElement>(null);
  const numberInput = useRef<HTMLInputElement>(null);
  // The field the focus goes to once it stands drawn: the one opened, or the next after a pick.
  const pendingFocus = useRef<RuleField | null>(null);
  const focusedKey = useRef<string | null>(null);

  const pick = pickOf(state, active, condition ?? { kind: "always" }, action);
  const flat = pick?.flatMap((section) => section.cells) ?? [];
  const chosenAt = flat.findIndex((cell) => cell.chosen);
  const tabbable =
    cursor !== null && cursor < flat.length ? cursor : Math.max(0, chosenAt);

  // Only the cell the keyboard stands on is in the order of Tab, so Tab leaves the grid. The shared
  // pick cell sets no tab index, so this sets it on its element after every commit.
  useLayoutEffect(() => {
    cellsOf(grid.current).forEach((cell, at) => {
      const wanted = at === tabbable ? 0 : -1;
      if (cell.tabIndex !== wanted) cell.tabIndex = wanted;
    });
  });

  // The focus goes into the panel when it opens, and to the next field after a pick, once that field
  // stands: the page may draw the program a pick made a moment later.
  useLayoutEffect(() => {
    if (focusedKey.current !== openKey) {
      focusedKey.current = openKey;
      pendingFocus.current = openKey === "" ? null : requested;
    }
    const wanted = pendingFocus.current;
    if (wanted === null || wanted !== active) return;
    const target =
      wanted === "number"
        ? numberInput.current
        : (cellsOf(grid.current)[tabbable] ?? null);
    if (target === null) return;
    pendingFocus.current = null;
    target.focus();
  });

  if (open === null || group === undefined || condition === undefined)
    return null;
  if (open.ruleId !== null && rule === undefined) return null;
  const groupId = group.id;

  /** Opens `field`'s pick, or its number field, and sends the focus there. */
  function moveTo(field: RuleField): void {
    setShown({ key: openKey, active: field, cursor: null });
    pendingFocus.current = field;
  }

  function setCursor(at: number | null): void {
    setShown({ key: openKey, active, cursor: at });
  }

  /** The program after `value` is picked in `field`; null where it changes nothing. */
  function changed(field: RuleField, value: string): Program | null {
    switch (field) {
      case "condition":
        return withConditionKind(
          program,
          groupId,
          index,
          value as Condition["kind"],
          offeredResources(state),
          offeredItems(state),
        );
      case "conditionTarget":
        return condition?.kind === "hereBelow"
          ? withConditionResource(program, groupId, index, value as ResourceId)
          : withConditionItem(program, groupId, index, value as ItemId);
      case "action":
        return index === null
          ? null
          : withActionKind(
              program,
              groupId,
              index,
              value as Action["kind"],
              offeredResources(state),
            );
      case "actionTarget":
        return index === null
          ? null
          : withActionResource(program, groupId, index, value as ResourceId);
      case "number":
        return null;
    }
  }

  /** The fields of the rule or group in `next`, the program a change made. */
  function fieldsIn(next: Program): RuleField[] {
    const nextGroup = next.groups.find((each) => each.id === groupId);
    if (index === null)
      return nextGroup === undefined
        ? []
        : conditionFields(nextGroup.condition);
    const nextRule = nextGroup?.rules[index];
    return nextRule === undefined ? [] : ruleFields(nextRule);
  }

  /** A pick in `field`: the change goes to the page, and the panel moves to the next field. */
  function choose(field: RuleField, value: string): void {
    const next = changed(field, value);
    const following = fieldAfter(fieldsIn(next ?? program), field);
    // After the last field the panel stays on it, the keyboard on the cell now chosen.
    if (following === null) setCursor(null);
    else moveTo(following);
    if (next !== null) onCommit(next);
  }

  function commitNumber(value: number): void {
    const next = withConditionValue(program, groupId, index, value);
    if (next !== null) onCommit(next);
  }

  function commitName(): void {
    if (name === null) return;
    setName(null);
    const next = renameGroup(program, groupId, name);
    if (next !== null) onCommit(next);
  }

  function gridKey(event: KeyboardEvent<HTMLDivElement>): void {
    const cells = cellsOf(grid.current);
    const at = cells.indexOf(event.target as HTMLElement);
    if (at < 0 || pick === null) return;
    if (event.key === "Enter") {
      event.preventDefault();
      const cell = flat[at];
      if (cell !== undefined && !cell.greyed) choose(active, cell.value);
      return;
    }
    if (!event.key.startsWith("Arrow")) return;
    event.preventDefault();
    const to = cellAfterKey(
      pick.map((section) => section.cells.length),
      columnsOf(active),
      at,
      event.key,
    );
    setCursor(to);
    cells[to]?.focus();
  }

  function gridFocus(event: FocusEvent<HTMLDivElement>): void {
    const at = cellsOf(grid.current).indexOf(event.target);
    if (at >= 0 && at !== cursor) setCursor(at);
  }

  function renderGrid(field: RuleField, sections: FieldPick) {
    return (
      <div
        // The sections of the conditions bear no names, so a line parts them (D-290).
        className={
          field === "condition" ? "rule-panel-pick parted" : "rule-panel-pick"
        }
        role="group"
        aria-label={FIELD_LABELS[field]}
        ref={grid}
        onKeyDown={gridKey}
        onFocus={gridFocus}
      >
        {sections.map((section, at) => (
          <div className="rule-panel-section" key={section.name ?? at}>
            {section.name === null ? null : (
              <h4 className="rule-panel-section-name">{section.name}</h4>
            )}
            <div
              className={
                columnsOf(field) === 2
                  ? "rule-panel-cells two-columns"
                  : "rule-panel-cells"
              }
            >
              {section.cells.map((cell) => {
                const time =
                  field === "action"
                    ? actionTime(state, cell.value as Action["kind"])
                    : null;
                return (
                  <div className="rule-panel-cell" key={cell.value}>
                    <ReactPickCell
                      text={cell.label}
                      icon={
                        field === "action"
                          ? ACTIONS[cell.value as Action["kind"]].icon
                          : undefined
                      }
                      chosen={cell.chosen}
                      greyed={cell.greyed}
                      reason={cell.reason}
                      onPick={() => choose(field, cell.value)}
                    />
                    {time === null ? null : (
                      <span className="rule-panel-time">{time}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }

  function renderField(field: RuleField) {
    const label = FIELD_LABELS[field];
    if (field === "number") {
      const number = conditionNumber(condition?.kind ?? "always");
      if (number === null || condition === undefined || !("value" in condition))
        return null;
      return (
        <div className="rule-panel-field" key={field}>
          <span className="rule-panel-label">{label}</span>
          <span
            className="rule-panel-number"
            onFocus={() => {
              if (active !== "number") moveTo("number");
            }}
            onKeyDown={(event) => {
              // The field commits a changed number on Enter itself; the panel then moves on, also
              // where the number stays as it was. The key press is consumed here: the focus goes to
              // a cell of the next pick during this event, and a browser would otherwise deliver the
              // same Enter to that cell and pick it.
              if (event.key !== "Enter") return;
              event.preventDefault();
              const following = fieldAfter(fields, "number");
              if (following !== null) moveTo(following);
            }}
          >
            <ReactNumberField
              label={label}
              number={number}
              value={condition.value}
              onCommit={commitNumber}
              inputRef={numberInput}
            />
          </span>
        </div>
      );
    }
    const fieldPick = pickOf(
      state,
      field,
      condition ?? { kind: "always" },
      action,
    );
    if (fieldPick === null) return null;
    const time =
      field === "action" && action !== null
        ? actionTime(state, action.kind)
        : null;
    return (
      <div className="rule-panel-field" key={field}>
        <span className="rule-panel-label">{label}</span>
        {field === active ? (
          renderGrid(field, fieldPick)
        ) : (
          <span className="rule-panel-value">
            <ReactButton
              text={chosenLabel(fieldPick)}
              label={`${label}: ${chosenLabel(fieldPick)}`}
              onClick={() => moveTo(field)}
            />
            {time === null ? null : (
              <span className="rule-panel-time">{time}</span>
            )}
          </span>
        )}
      </div>
    );
  }

  const heading =
    index === null
      ? `Grupa ${groupNumber(groupIndex)}`
      : `Reguła ${ruleNumber(groupIndex, index)}`;

  return (
    <section
      className="rule-panel"
      aria-label={heading}
      onKeyDown={(event) => {
        if (event.key !== "Escape") return;
        event.preventDefault();
        onClose();
      }}
    >
      <div className="rule-panel-top">
        <h3 className="rule-panel-heading">{heading}</h3>
        <ReactButton text="✕" label="Zamknij panel" onClick={onClose} />
      </div>
      {copy ? <p className="rule-panel-note">{COPY_NOTE}</p> : null}
      {index === null ? (
        <div className="rule-panel-field">
          <span className="rule-panel-label">Nazwa grupy</span>
          <span
            className="rule-panel-name"
            onFocus={() => {
              if (name === null) setName(group.name);
            }}
            onBlur={commitName}
            onKeyDown={(event) => {
              if (event.key !== "Enter") return;
              event.preventDefault();
              commitName();
              moveTo("condition");
            }}
          >
            <ReactTextField
              label="Nazwa grupy"
              value={name ?? group.name}
              onChange={(event) => setName(event.target.value)}
            />
          </span>
        </div>
      ) : null}
      {fields.map(renderField)}
    </section>
  );
}

/**
 * Builds the panel in an element of its own, for the page to place. The render is synchronous, so the
 * panel stands in the element when this returns. Each panel is a new root: nothing it holds outlives
 * `dispose()`.
 */
export function createRulePanel(options: RulePanelOptions): RulePanel {
  const element = document.createElement("div");
  element.className = "rule-panel-host";
  const root = createRoot(element);
  let disposed = false;
  function draw(props: RulePanelProps): void {
    flushSync(() => {
      root.render(
        <RulePanelView
          {...props}
          onCommit={options.onCommit}
          onClose={options.onClose}
        />,
      );
    });
  }
  draw(options.props);
  return {
    element,
    update(props: RulePanelProps): void {
      if (!disposed) draw(props);
    },
    dispose(): void {
      disposed = true;
      root.unmount();
      element.remove();
    },
  };
}
